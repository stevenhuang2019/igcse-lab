'use strict';
const crypto=require('node:crypto');
const number=(v,max=10000000)=>Number.isInteger(v)&&v>=0&&v<=max;
function validateSummary(v){
 const fields=['answered','correct','words','games','topics','activeSeconds','totalAnswered','totalCorrect','totalWords','totalGames','totalTopics'];
 if(!v||!/^\d{4}-\d{2}-\d{2}$/.test(v.date)||!fields.every(k=>number(v[k]))||v.correct>v.answered||v.totalCorrect>v.totalAnswered||v.activeSeconds>86400)throw Error('Invalid statistics');
 const out={date:v.date};for(const k of fields)out[k]=v[k];out.subjects={};
 for(const [k,value] of Object.entries(v.subjects||{})){if(!['math','physics','chemistry','dt','business','computer_science','english'].includes(k)||!value||!number(value.answered)||!number(value.correct)||value.correct>value.answered)throw Error('Invalid statistics');out.subjects[k]={answered:value.answered,correct:value.correct};}return out;
}
function createCloudStore({url,key,fetcher=fetch}={}){
 if(!url||!key)return null;
 if(!/^https:\/\/[a-z0-9-]+\.supabase\.co$/.test(url))throw Error('Invalid Supabase URL');
 async function call(route,opts={}){const r=await fetcher(url+'/rest/v1/'+route,{...opts,headers:{apikey:key,Authorization:'Bearer '+key,'Content-Type':'application/json',...opts.headers},signal:AbortSignal.timeout(10000)});if(!r.ok)throw Error('Cloud statistics unavailable');return r;}
 return {async put(id,summary){await call('learning_daily?on_conflict=user_id,day',{method:'POST',headers:{Prefer:'resolution=merge-duplicates,return=minimal'},body:JSON.stringify({user_id:id,day:summary.date,summary,updated_at:new Date().toISOString()})});},async list(){return (await call('learning_daily?select=user_id,day,summary,updated_at&order=day.desc&limit=2000')).json();}};
}
function createRooms({words=[],now=Date.now,random=Math.random}={}){
 const rooms=new Map(),ttl=2*3600000;
 const mix=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
 function cleanup(){for(const [code,r] of rooms)if(now()-r.createdAt>ttl)rooms.delete(code);}
 function room(code){const r=rooms.get(String(code).toUpperCase());if(!r||now()-r.createdAt>ttl){cleanup();throw Error('Room expired or not found');}return r;}
 function member(id,r){const p=r.players.get(id);if(!p)throw Error('Not a room member');p.seenAt=now();return p;}
 function step(r){if(r.phase==='waiting'||r.phase==='finished')return;let count=0;while(now()>=r.until&&r.phase!=='finished'&&count++<105){if(r.phase==='countdown'){r.phase='question';r.until+=r.seconds*1000;r.openedAt=r.until-r.seconds*1000;}else if(r.phase==='question'){r.phase='reveal';r.until+=2500;}else{r.index++;if(r.index>=r.queue.length){r.phase='finished';break;}r.phase='question';r.until+=r.seconds*1000;r.openedAt=r.until-r.seconds*1000;}}}
 function view(id,code){const r=room(code);member(id,r);step(r);const q=r.queue[r.index],visible=['question','reveal'].includes(r.phase);return {code:r.code,host:r.host,bank:r.bank,phase:r.phase,serverNow:now(),until:r.until,index:r.index,total:r.queue.length,seconds:r.seconds,players:[...r.players.values()].map(p=>({id:p.id,score:p.score,online:now()-p.seenAt<15000,answered:q?Object.hasOwn(q.answers,p.id):false})).sort((a,b)=>b.score-a.score||a.id.localeCompare(b.id)),question:visible?{id:q.id,word:q.en,options:q.options,...(r.phase==='reveal'?{answer:q.zh,correctIndex:q.options.indexOf(q.zh)}:{})}:null};}
 return {
 create(id,{bank='all',chapter='',size=10,seconds=15}={}){cleanup();if(rooms.size>=20)throw Error('Rooms full');if([...rooms.values()].some(r=>r.host===id&&r.phase!=='finished'))throw Error('Host already has a room');if(!['all','math','physics','chemistry','dt','business','computer_science','english','cet4','cet6'].includes(bank))throw Error('Invalid bank');if(!Number.isInteger(size)||size<5||size>50||![10,15,20,30].includes(seconds)||typeof chapter!=='string'||chapter.length>150)throw Error('Invalid room settings');
 const unique=new Set(),pool=words.filter(v=>(bank==='all'||v.subject===bank)&&(!chapter||(v.chapters||[v.chapter]).includes(chapter))).filter(v=>{if(!v.en||!v.zh||unique.has(v.zh))return false;unique.add(v.zh);return true;});if(pool.length<4)throw Error('Bank needs at least four meanings');
 const code=crypto.randomBytes(4).toString('hex').slice(0,6).toUpperCase(),queue=mix(pool).slice(0,size).map(v=>({id:crypto.randomUUID(),en:v.en,zh:v.zh,options:mix([v.zh,...mix(pool.filter(w=>w.zh!==v.zh)).slice(0,3).map(w=>w.zh)]),answers:{}}));
 const r={code,host:id,bank,phase:'waiting',createdAt:now(),players:new Map([[id,{id,score:0,seenAt:now()}]]),queue,index:0,seconds,until:0};rooms.set(code,r);return view(id,code);
 },join(id,code){const r=room(code);if(!r.players.has(id)){if(r.phase!=='waiting')throw Error('Room already started');if(r.players.size>=6)throw Error('Room full');r.players.set(id,{id,score:0,seenAt:now()});}return view(id,code);},
 start(id,code){const r=room(code);member(id,r);if(id!==r.host)throw Error('Only host can start');if(r.phase!=='waiting')throw Error('Already started');if(r.players.size<2)throw Error('Need two players');r.phase='countdown';r.until=now()+3000;return view(id,code);},
 answer(id,code,{questionId,index}={}){const r=room(code),p=member(id,r);step(r);if(r.phase!=='question')throw Error('Answer window closed');const q=r.queue[r.index];if(q.id!==questionId)throw Error('Answer window closed');if(Object.hasOwn(q.answers,id))throw Error('Already answered');if(!Number.isInteger(index)||index<0||index>=q.options.length)throw Error('Invalid option');q.answers[id]=index;const correct=q.options[index]===q.zh;if(correct)p.score+=100+Math.max(0,Math.floor(50*(r.until-now())/(r.seconds*1000)));if([...r.players.keys()].every(k=>Object.hasOwn(q.answers,k))){r.phase='reveal';r.until=now()+2500;}return view(id,code);},
 leave(id,code){const r=room(code);member(id,r);if(id===r.host)rooms.delete(r.code);else r.players.delete(id);return {ok:true};},view
 };
}
module.exports={createRooms,validateSummary,createCloudStore};
let cachedWords;
function classroomWords(){if(cachedWords)return cachedWords;const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),w={};for(const file of ['vocab.js','cet_vocabulary.js'])vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../data',file),'utf8'),{window:w},{timeout:2000});return cachedWords=[...(w.SUBJECT_VOCAB||[]),...(w.IGCSE_CET_VOCAB||[])];}
module.exports.classroomWords=classroomWords;
