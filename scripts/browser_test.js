/* Real Chromium regression flows. npm ci; npx playwright install chromium; npm run test:browser */
const {chromium}=require('playwright');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),results=path.join(root,'test-results');
fs.mkdirSync(results,{recursive:true});
const server=http.createServer((req,res)=>{
 const route=decodeURIComponent(new URL(req.url,'http://localhost').pathname),file=path.resolve(root,'.'+(route==='/'?'/index.html':route));
 if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
 try{res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':'text/html');res.end(fs.readFileSync(file));}catch{res.writeHead(404).end();}
});
(async()=>{
 let browser;
 try{
  await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port;
  browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{})});
  for(const width of [1280,768,390]){
   const context=await browser.newContext({viewport:{width,height:900}}),page=await context.newPage(),errors=[];
   page.on('pageerror',e=>errors.push(e.stack));page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)errors.push(r.status()+' '+r.url());});
   // Application flows must work even when optional external math resources are unavailable.
   await page.route('**/*',route=>route.request().url().startsWith(base)?route.continue():route.abort());
   const started=Date.now();await page.goto(base+'/#page-dashboard');await page.locator('#dbMock').waitFor();
   assert.equal(await page.locator('.page.active').count(),1);
   assert.equal(await page.locator('#dashboard-nav').getAttribute('aria-current'),'page');
   assert.equal(await page.evaluate(()=>userState===window.userState),true);
   for(const subject of ['math','physics','chemistry','dt','business','computer_science','english']){
    await page.locator('[data-db-subject="'+subject+'"]').click();
    assert.equal(await page.locator('.db-topics article').count(),await page.evaluate(s=>IGCSE_CATALOG.topicsFor(s).length,subject));
   }
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);assert.equal(overflow,false,'dashboard overflow '+width);
   await page.screenshot({path:path.join(results,'dashboard-'+width+'.png'),fullPage:true});
   await page.locator('[data-db-subject="math"]').click();
   const taskId=await page.locator('[data-task]').first().getAttribute('data-task');
   await page.locator('[data-task]').first().click();
   const qid=await page.evaluate(()=>practiceSession.order[0]);
   const type=await page.evaluate(()=>findQuestion(practiceSession.order[0]).type);
   if(type==='choice')await page.locator('#questionArea .opt-btn').first().click();
   else if(type==='number'){await page.locator('#numberInput').fill('9999');await page.locator('[data-act=number-check]').click();}
   else{await page.locator('#essayInput').fill('My practice answer');await page.locator('[data-act=essay-check]').click();await page.locator('[data-self=no]').click();}
   assert.ok(await page.evaluate(id=>IGCSE_DASHBOARD.day().completed.includes(id),taskId));
   await page.reload();await page.locator('#dashboard-nav').click();
   assert.equal(await page.evaluate(id=>userState.questionStats[id].answered,qid),1);
   assert.ok(await page.evaluate(id=>IGCSE_DASHBOARD.day().completed.includes(id),taskId));
   // Subject controls, chapters and all existing page renderers must execute without exceptions.
   for(const id of ['page-textbook','page-assessment','page-mistake','page-quickref','page-vocab','page-resources','page-homework','page-profile','page-chapters','motion-lab-page','page-home','page-dashboard']){
    const button=page.locator('#mainNav [data-page="'+id+'"]');
    if(await button.count()){await button.click();assert.equal(await page.locator('.page.active').count(),1,'single active '+id);}
   }
   await page.locator('#dbMock').click();
   await page.locator('[data-mock="physics"]').click();await page.locator('#confirmMock').click();
   const before=await page.evaluate(()=>({startedAt:practiceSession.startedAt,total:practiceSession.total}));assert.equal(before.total,30);
   const answer=await page.evaluate(()=>{const q=findQuestion(practiceSession.order[practiceSession.idx]);return q.options.indexOf(q.answer);});
   await page.locator('#questionArea .opt-btn').nth(answer).click();
   assert.match(await page.locator('.q-feedback').textContent(),/答案已记录/);
   assert.equal(await page.locator('#questionArea .correct').count(),0);
   await page.reload();await page.locator('#resumeMock').click();
   assert.equal(await page.evaluate(()=>practiceSession.startedAt),before.startedAt);
   assert.equal(await page.evaluate(()=>practiceSession.idx),1);
   await page.locator('#mockSubmitEarly').click();
   assert.match(await page.locator('#mockDetailedReport').textContent(),/29 题未答/);
   assert.equal(await page.evaluate(()=>userState.mockExams.records.length),1);
   await page.locator('#mockDetailedReport summary').click();
   assert.match(await page.locator('#mockDetailedReport').textContent(),/参考答案/);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,'mock overflow '+width);
   await page.screenshot({path:path.join(results,'mock-report-'+width+'.png'),fullPage:true});
   await page.locator('[data-report-topic]').first().click();assert.equal(await page.locator('#page-practice.active').count(),1);
   await page.locator('[data-page="page-practice"]').click();await page.locator('[data-view-report]').first().click();assert.equal(await page.locator('#mockDetailedReport').count(),1);
   // A resumed expired exam submits once with a full denominator, even after refresh.
   await page.locator('[data-page="page-practice"]').click();await page.locator('[data-mock="math"]').click();await page.locator('#confirmMock').click();
   await page.evaluate(()=>{practiceSession.startedAt=Date.now()-1900000;IGCSE_MOCK_ENGINE.saveActive(practiceSession);});
   await page.reload();await page.locator('#resumeMock').click();await page.locator('#mockDetailedReport').waitFor();
   assert.equal(await page.evaluate(()=>userState.mockExams.records.length),2);
   assert.equal(await page.evaluate(()=>userState.mockExams.records[0].result.unanswered),30);
   await page.reload();assert.equal(await page.evaluate(()=>userState.mockExams.records.length),2);
   // Direct routes and browser history include dynamically registered pages.
   await page.goto(base+'/#page-chapters');await page.locator('#ceBody').waitFor();
   assert.equal(await page.locator('#page-chapters.active').count(),1);
   await page.locator('#dashboard-nav').click();await page.goBack();assert.equal(await page.locator('#page-chapters.active').count(),1);
   if(width===1280){
    await page.evaluate(()=>{setCurrentSubjectSafe('computer_science');startSessionFromIds(['cs1d_q3'],'normal',{subject:'computer_science'});});
    await page.locator('#numberInput').fill('3840000');await page.locator('[data-act=number-check]').click();
    assert.equal(await page.evaluate(()=>userState.questionStats.cs1d_q3.lastCorrect),true);
    await page.locator('#dashboard-nav').click();await page.locator('#subjectSelect').selectOption('english');
    assert.equal(await page.locator('#page-dashboard.active').count(),1);
    assert.match(await page.locator('.db-hero').textContent(),/英语/);
   }
   assert.deepEqual(errors,[],'browser errors '+width);
   console.log('[ok] '+width+'px: dashboard, seven subjects, task completion, storage, navigation, mock resume/submit/timeout/report; '+(Date.now()-started)+'ms');
   await context.close();
  }
 }finally{if(browser)await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
