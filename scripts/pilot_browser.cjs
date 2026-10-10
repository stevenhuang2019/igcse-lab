const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),assert=require('node:assert/strict');
const https=require('node:https'),{execFileSync}=require('node:child_process');
const {createPilot,hashPassword}=require('../server/private_pilot.cjs'),{initialiseQuota}=require('./pilot_users.cjs');
module.exports=async(browser,width,results)=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'igcse-pilot-browser-')),userFile=path.join(dir,'users.json'),usageFile=path.join(dir,'usage.json'),password='Fixture-password-2026';
 const users=['student1','student2'].map(id=>({id,salt:'22'.repeat(16),hash:hashPassword(password,'22'.repeat(16)),enabled:true}));fs.writeFileSync(userFile,JSON.stringify(users));initialiseQuota(usageFile);
 const cert=path.join(dir,'cert.pem'),key=path.join(dir,'key.pem');execFileSync('openssl',['req','-x509','-newkey','rsa:2048','-nodes','-keyout',key,'-out',cert,'-days','1','-subj','/CN=127.0.0.1'],{stdio:'ignore'});
 let pilot;const server=https.createServer({key:fs.readFileSync(key),cert:fs.readFileSync(cert)},(req,res)=>pilot.emit('request',req,res));await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='https://127.0.0.1:'+server.address().port;
 const freeMode=width===390;
 pilot=createPilot({origin,userFile,usageFile,aiEnabled:false,freeMode,usersJSON:JSON.stringify(users)});
 // The only ignored certificate is this ephemeral local test fixture; production still requires trusted HTTPS.
 const context=await browser.newContext({viewport:{width,height:900},ignoreHTTPSErrors:true}),page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));require('./legacy_navigation.cjs')(page);
 await context.route('**/*',route=>route.request().url().startsWith(origin+'/')?route.continue():route.abort());
 const login=async id=>{await page.goto(origin+'/login');await page.locator('[name=username]').fill(id);await page.locator('[name=password]').fill(password);await page.getByRole('button',{name:'登录学习平台'}).click();await page.locator('#dbMock').waitFor();};
 try{
  await page.goto(origin+'/');assert.match(page.url(),/\/login$/);await page.screenshot({path:path.join(results,'pilot-login-'+width+'.png'),fullPage:true});
  await login('student1');
  await page.evaluate(()=>startSessionFromIds(['objective_math_boundarea'],'normal',{subject:'math',noShuffle:true}));await page.locator('#numberInput').fill('24.5025');await page.locator('[data-act=number-check]').click();
  const cookies=await context.cookies();assert.ok(cookies.some(c=>c.name==='__Host-igcsePilot'&&c.secure&&c.httpOnly&&c.sameSite==='Strict'));
  await page.locator('#materials-nav').click();await page.locator('#subjectSelect').selectOption('math');await page.locator('#materialFile').setInputFiles({name:'student1.txt',mimeType:'text/plain',buffer:Buffer.from('Student one fractions notes.')});await page.locator('#materialSave').click();await page.waitForFunction(()=>!document.querySelector('#materialSave').disabled);assert.equal(await page.locator('[data-material]').count(),1);
  await page.locator('#writing-nav').click();await page.locator('#writingDraft').fill('Student one private draft.');
  await page.locator('#pilotLogout').click();await page.locator('[name=username]').waitFor();await login('student2');assert.equal(await page.evaluate(()=>userState.questionStats.objective_math_boundarea?.answered||0),0);
  await page.locator('#materials-nav').click();await page.locator('#subjectSelect').selectOption('math');assert.equal(await page.evaluate(async()=> (await IGCSE_MATERIALS.list('math')).length),0);assert.equal(await page.locator('[data-material]').count(),0);await page.locator('#writing-nav').click();assert.equal(await page.locator('#writingDraft').inputValue(),'');await page.locator('#writingDraft').fill('Student two separate draft.');
  await page.locator('#pilotLogout').click();await page.locator('[name=username]').waitFor();await login('student1');assert.equal(await page.evaluate(()=>userState.questionStats.objective_math_boundarea.correct),1);await page.locator('#writing-nav').click();assert.equal(await page.locator('#writingDraft').inputValue(),'Student one private draft.');
  await page.locator('#materials-nav').click();await page.locator('#subjectSelect').selectOption('math');assert.equal(await page.evaluate(async()=> (await IGCSE_MATERIALS.list('math')).length),1);await page.locator('[data-material]').waitFor();assert.equal(await page.locator('[data-material]').count(),1);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);await page.screenshot({path:path.join(results,'pilot-authorized-'+width+'.png'),fullPage:true});
  users[0].enabled=false;fs.writeFileSync(userFile,JSON.stringify(users));if(freeMode)pilot=createPilot({origin,freeMode:true,usersJSON:JSON.stringify(users),aiEnabled:false});assert.equal(await page.evaluate(async()=> (await fetch('/api/pilot/status')).status),401);await page.reload();await page.locator('[name=username]').waitFor();if(freeMode){await page.locator('[name=username]').fill('student1');await page.locator('[name=password]').fill(password);await page.getByRole('button',{name:'登录学习平台'}).click();await page.getByText('账号或密码不正确，或授权已撤销').waitFor();}assert.deepEqual(errors,[]);console.log('[ok] '+width+'px: invited login, secure cookie, materials/draft separation, logout and live revocation');
 }finally{await context.close();server.closeAllConnections();await new Promise(r=>server.close(r));fs.rmSync(dir,{recursive:true});}
};
