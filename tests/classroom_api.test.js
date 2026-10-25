const test=require('node:test'),assert=require('node:assert/strict');
const {createPilot,hashPassword}=require('../server/private_pilot.cjs'),transport=require('../scripts/pilot_test_transport.cjs');
const origin='https://pilot.example',password='Fixture-password-2026',salt='33'.repeat(16),users=['admin','s1','s2'].map(id=>({id,salt,hash:hashPassword(password,salt),enabled:true,role:id==='admin'?'admin':'student'}));
test('classroom API requires authenticated roles, filters summaries and binds submitted statistics to the session',async()=>{
 const saved=[];const server=createPilot({origin,freeMode:true,usersJSON:JSON.stringify(users),classroomStore:{put:async(id,s)=>saved.push({user_id:id,summary:s}),list:async()=>saved},classroomWords:Array.from({length:10},(_,i)=>({en:'w'+i,zh:'义'+i,subject:'cet4'}))});await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port;
 const call=(id,cookie,route,body)=>transport(base+route,{method:body?'POST':'GET',headers:{Host:'pilot.example',Origin:origin,Cookie:cookie,'X-IGCSE-User':id,'Content-Type':'application/json'},body:body?JSON.stringify(body):undefined});
 const login=async id=>(await transport(base+'/auth/login',{method:'POST',headers:{Host:'pilot.example',Origin:origin,'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({username:id,password})})).headers.get('set-cookie').split(';')[0];
 try{const cookie=await login('s1'),admin=await login('admin');assert.equal((await call('s1',cookie,'/api/classroom/me')).status,200);assert.equal((await call('s1',cookie,'/api/classroom/admin')).status,403);assert.equal((await call('s2',cookie,'/api/classroom/me')).status,403);
 const summary={date:new Date().toLocaleDateString('en-CA',{timeZone:'Asia/Shanghai'}),answered:2,correct:1,words:1,games:0,topics:0,activeSeconds:20,totalAnswered:2,totalCorrect:1,totalWords:1,totalGames:0,totalTopics:0,subjects:{},user_id:'s2',draft:'private'};
 assert.equal((await call('s1',cookie,'/api/classroom/summary',summary)).status,200);assert.equal(saved[0].user_id,'s1');assert.ok(!('draft' in saved[0].summary));assert.equal((await call('admin',admin,'/api/classroom/admin')).status,200);
 const r=await call('s1',cookie,'/api/classroom/rooms',{bank:'cet4',size:5,seconds:10});assert.equal(r.status,200);const room=await r.json();assert.equal(room.host,'s1');
 }finally{server.closeAllConnections();await new Promise(r=>server.close(r));}
});
