const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),os=require('node:os'),path=require('node:path');
const {createPilot,hashPassword,loadUsers}=require('../server/private_pilot.cjs'),{manage,initialiseQuota}=require('../scripts/pilot_users.cjs');
const transport=require('../scripts/pilot_test_transport.cjs');
const origin='https://pilot.example',password='Fixture-password-2026';
function fixture(){const dir=fs.mkdtempSync(path.join(os.tmpdir(),'igcse-pilot-')),userFile=path.join(dir,'users.json'),usageFile=path.join(dir,'usage.json');const salt='11'.repeat(16);fs.writeFileSync(userFile,JSON.stringify([{id:'student1',salt,hash:hashPassword(password,salt),enabled:true}]));initialiseQuota(usageFile);return {dir,userFile,usageFile};}
async function start(opts){const server=createPilot(opts);await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port;
 const request=(url,options={})=>transport(base+url,{redirect:'manual',...options,headers:{Host:'pilot.example',...options.headers}});
 const login=()=>request('/auth/login',{method:'POST',headers:{Origin:origin,'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({username:'student1',password})});
 return {server,request,login,close:async()=>{server.closeAllConnections();await new Promise(r=>server.close(r));}};}
const coachBody={genre:'email',mode:'grammar',task:'A weekend',draft:'Yesterday I go to the park.'};
const response={output:[{content:[{type:'output_text',text:JSON.stringify({summary:'检查时态',outline:[],hints:[],corrections:[]})}]}]};
test('unauthenticated visitors cannot read app assets or access AI endpoints; login uses secure cookies',async()=>{
 const f=fixture(),s=await start({...f,origin,topicsFor:()=>[]});try{
  for(const p of ['/','/index.html','/data/igcse_content.js','/vendor/pdf.mjs','/pilot/storage.js']){const r=await s.request(p);assert.equal(r.status,303);assert.equal(r.headers.get('location'),'/login');}
  assert.equal((await s.request('/api/ai/status')).status,401);assert.equal((await s.request('/login')).status,200);
  const login=await s.login();assert.equal(login.status,303);const cookie=login.headers.get('set-cookie');assert.match(cookie,/HttpOnly; Secure; SameSite=Strict/);assert.match(cookie,/^__Host-/);
  const page=await s.request('/',{headers:{Cookie:cookie.split(';')[0]}});assert.equal(page.status,200);assert.match(await page.text(),/data-user="student1"/);assert.equal(page.headers.get('cache-control'),'no-store');
 }finally{await s.close();fs.rmSync(f.dir,{recursive:true});}
});
test('cross-site login/logout, switched account headers and direct private file access are rejected',async()=>{
 const f=fixture(),s=await start({...f,origin,topicsFor:()=>[]});try{
  assert.equal((await s.request('/auth/login',{method:'POST',headers:{Origin:'https://evil.example'}})).status,403);
  const cookie=(await s.login()).headers.get('set-cookie').split(';')[0];
  assert.equal((await s.request('/auth/logout',{method:'POST',headers:{Cookie:cookie,Origin:'https://evil.example'}})).status,403);
  assert.equal((await s.request('/api/pilot/status',{headers:{Cookie:cookie,'X-IGCSE-User':'student2'}})).status,403);
  assert.equal((await s.request('/server/private_pilot.cjs',{headers:{Cookie:cookie}})).status,403);
  const users=loadUsers(f.userFile);users[0].enabled=false;fs.writeFileSync(f.userFile,JSON.stringify(users));assert.equal((await s.request('/api/ai/status',{headers:{Cookie:cookie,'X-IGCSE-User':'student1'}})).status,401);
 }finally{await s.close();fs.rmSync(f.dir,{recursive:true});}
});
test('AI quotas persist across service restarts and limit both users and total requests',async()=>{
 const f=fixture();let calls=0;const opts={...f,origin,key:'fixture-only',aiEnabled:true,userLimit:2,globalLimit:2,topicsFor:()=>[],fetcher:async()=>{calls++;return {ok:true,json:async()=>response};}};let s=await start(opts);
 try{
  let cookie=(await s.login()).headers.get('set-cookie').split(';')[0];const send=()=>s.request('/api/writing/coach',{method:'POST',headers:{Cookie:cookie,Origin:origin,'X-IGCSE-User':'student1','Content-Type':'application/json'},body:JSON.stringify(coachBody)});
  assert.equal((await send()).status,200);await s.close();s=await start(opts);cookie=(await s.login()).headers.get('set-cookie').split(';')[0];assert.equal((await send()).status,200);assert.equal((await send()).status,429);assert.equal(calls,2);
  assert.equal(JSON.parse(fs.readFileSync(f.usageFile)).total,2);
 }finally{await s.close();fs.rmSync(f.dir,{recursive:true});}
});
test('disabled AI, missing/corrupt quota stores, invalid origin and stale sessions fail closed',async()=>{
 const f=fixture();let time=Date.now(),calls=0;const opts={...f,origin,key:'fixture',aiEnabled:false,topicsFor:()=>[],now:()=>time,fetcher:async()=>{calls++;throw Error('should not call');}};const s=await start(opts);try{
  const cookie=(await s.login()).headers.get('set-cookie').split(';')[0],headers={Cookie:cookie,Origin:origin,'X-IGCSE-User':'student1','Content-Type':'application/json'};
  assert.equal((await (await s.request('/api/ai/status',{headers})).json()).configured,false);
  assert.equal((await s.request('/api/writing/coach',{method:'POST',headers,body:JSON.stringify(coachBody)})).status,503);assert.equal(calls,0);
  time+=9*3600000;assert.equal((await s.request('/api/pilot/status',{headers})).status,401);
  assert.throws(()=>createPilot({...opts,origin:'http://pilot.example'}));fs.writeFileSync(f.usageFile,'invalid');assert.throws(()=>createPilot(opts));fs.unlinkSync(f.usageFile);assert.throws(()=>createPilot(opts));
 }finally{await s.close();fs.rmSync(f.dir,{recursive:true});}
});
test('invitation helper stores only salted hashes in users and revokes rather than deleting learners',()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'igcse-invite-')),file=path.join(dir,'users.json');try{
  const invite=manage('add','student1',file),secret=fs.readFileSync(invite,'utf8').split('\n')[1].split('：')[1],users=loadUsers(file);assert.ok(!fs.readFileSync(file,'utf8').includes(secret));assert.equal(hashPassword(secret,users[0].salt),users[0].hash);assert.equal(fs.statSync(invite).mode&0o777,0o600);assert.throws(()=>manage('add','student1',file));manage('disable','student1',file);assert.equal(loadUsers(file)[0].enabled,false);
 }finally{fs.rmSync(dir,{recursive:true});}
});

test('login attempts are rate limited before repeated password verification',async()=>{
 const f=fixture(),s=await start({...f,origin,topicsFor:()=>[]});try{
  for(let i=0;i<6;i++)assert.equal((await s.request('/auth/login',{method:'POST',headers:{Origin:origin,'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({username:'student1',password:'Wrong-fixture-password'})})).status,401);
  assert.equal((await s.login()).status,429);
 }finally{await s.close();fs.rmSync(f.dir,{recursive:true});}
});

test('environment invitations work without disk, block disabled users and bound AI within each runtime',async()=>{
 const salt='33'.repeat(16),users=[{id:'student1',salt,hash:hashPassword(password,salt),enabled:true}];
 let calls=0;const opts={origin,freeMode:true,usersJSON:JSON.stringify(users),key:'fixture',aiEnabled:true,userLimit:1,globalLimit:1,topicsFor:()=>[],fetcher:async()=>{calls++;return {ok:true,json:async()=>response};}};
 let s=await start(opts);try{
  let cookie=(await s.login()).headers.get('set-cookie').split(';')[0];
  const headers=()=>({Cookie:cookie,Origin:origin,'X-IGCSE-User':'student1','Content-Type':'application/json'});
  const send=()=>s.request('/api/writing/coach',{method:'POST',headers:headers(),body:JSON.stringify(coachBody)});
  const status=await (await s.request('/api/pilot/status',{headers:headers()})).json();assert.equal(status.quota.persistent,false);assert.equal(status.aiEnabled,true);
  assert.equal((await send()).status,200);assert.equal((await send()).status,429);assert.equal(calls,1);
  await s.close();s=await start(opts);assert.equal((await s.request('/api/pilot/status',{headers:headers()})).status,401);cookie=(await s.login()).headers.get('set-cookie').split(';')[0];assert.equal((await send()).status,200);assert.equal(calls,2);
  await s.close();users[0].enabled=false;s=await start({...opts,usersJSON:JSON.stringify(users)});assert.equal((await s.login()).status,401);
  assert.throws(()=>createPilot({...opts,usersJSON:'invalid'}));assert.throws(()=>createPilot({...opts,usersJSON:'[]'}));
 }finally{await s.close();}
});
