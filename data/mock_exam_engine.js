/* IGCSE Personal Learning OS — Mock Exam Engine v1 */
(function(){
'use strict';
const state=()=>window.userState||(window.userState={});
const clamp=n=>Math.max(0,Math.min(100,Math.round(Number(n)||0)));
const now=()=>new Date().toISOString();
function ensure(){const s=state();s.mockExams=s.mockExams||{records:[]};s.mockExams.records=s.mockExams.records||[];return s.mockExams;}
function getQuestions(subject,paperIndex){
 const p=(window.MOCK_EXAMS||[]).filter(x=>x.subject===subject)[paperIndex||0];
 if(p&&Array.isArray(p.questions))return p.questions.map((q,i)=>({...q,id:q.id||subject+'_mock_'+(paperIndex||0)+'_'+i,subject,pastPaper:false,pastPaperType:'mock'}));
 const ids=(window.IGCSE_MOCKPAPERS&&window.IGCSE_MOCKPAPERS[subject]||{}).qids||[];
 return ids.map(id=>(window.questionData||[]).find(q=>q.id===id)).filter(Boolean).map(q=>({...q,pastPaper:false,pastPaperType:'mock'}));
}
function start(subject,paperIndex){
 const qs=getQuestions(subject,paperIndex), id='mock_'+Date.now();
 const session={id,subject,paperIndex:paperIndex||0,startedAt:now(),durationMinutes:Math.max(30,Math.ceil(qs.length*1.5)),questionIds:qs.map(q=>q.id),answers:{},submitted:false};
 const s=ensure();s.active=session;return session;
}
function score(session,qs){
 let correct=0,answered=0,total=qs.length,byTopic={},bySkill={};
 qs.forEach(q=>{
  const raw=(session.answers||{})[q.id]; const picked=q.options&&raw!==undefined?q.options[raw]:raw; const ok=Object.prototype.hasOwnProperty.call(session.outcomes||{},q.id)?session.outcomes[q.id]===true:raw!==undefined && String(picked)===String(q.answer);
  if(raw!==undefined||Object.prototype.hasOwnProperty.call(session.outcomes||{},q.id))answered++;
  if(ok)correct++;
  const t=q.topicId||q.chapter||'unmapped';byTopic[t]=byTopic[t]||{correct:0,total:0};byTopic[t].total++;if(ok)byTopic[t].correct++;
  const sk=q.skill||q.commandWord||'general';bySkill[sk]=bySkill[sk]||{correct:0,total:0};bySkill[sk].total++;if(ok)bySkill[sk].correct++;
 });
 return {correct,total,answered,unanswered:total-answered,accuracy:total?clamp(correct/total*100):0,byTopic,bySkill};
}
function finish(session,qs){
 const result=score(session,qs);session.submitted=true;session.finishedAt=now();session.result=result;
 const s=ensure();s.records.unshift({id:session.id,subject:session.subject,paperIndex:session.paperIndex,startedAt:session.startedAt,finishedAt:session.finishedAt,result,questionIds:session.questionIds});
 s.active=null;
 if(window.saveUserState)window.saveUserState(state());
 return result;
}
function report(record){
 if(!record)return null;
 const gaps=Object.entries(record.result.byTopic||{}).map(([topic,x])=>({topic,accuracy:clamp(x.correct/x.total*100),correct:x.correct,total:x.total})).sort((a,b)=>a.accuracy-b.accuracy);
 const skills=Object.entries(record.result.bySkill||{}).map(([skill,x])=>({skill,accuracy:clamp(x.correct/x.total*100)})).sort((a,b)=>a.accuracy-b.accuracy);
 return {accuracy:record.result.accuracy,correct:record.result.correct,total:record.result.total,unanswered:record.result.unanswered||0,weakTopics:gaps.slice(0,5),weakSkills:skills.slice(0,5),recommendation:record.result.accuracy>=85?'Maintain with SRS + official past papers':record.result.accuracy>=70?'Target weak topics and error types':record.result.accuracy>=50?'Repair fundamentals before another mock':'Return to learning content and rebuild weak knowledge points'};
}
function recordPracticeSession(session,qs){ const result=score(session,qs); const existing=ensure().records.find(r=>session.id&&r.id===session.id);if(existing)return existing; const rec={id:session.id||'practice_'+Date.now(),subject:session.subject||'mixed',paperIndex:0,mode:session.mode,startedAt:new Date(session.startedAt||Date.now()).toISOString(),finishedAt:new Date().toISOString(),result,questionIds:session.order||qs.map(q=>q.id),answers:{...(session.answers||{})},outcomes:{...(session.outcomes||{})}}; const s=ensure(); s.records.unshift(rec); if(window.saveUserState)window.saveUserState(state()); return rec; }
window.IGCSE_MOCK_ENGINE={ensure,getQuestions,start,score,finish,report,recordPracticeSession};
})();
/* Question selection and durable practice sessions shared by the mock UI. */
(function(){
 const engine=window.IGCSE_MOCK_ENGINE;
 engine.selectQuestions=function(subject,count=30){
  const pool=(window.questionData||[]).filter(q=>q.type==='choice'&&(subject==='mixed'||q.subject===subject));
  const groups=new Map();
  pool.forEach(q=>{const key=q.subject+'::'+q.topicId;if(!groups.has(key))groups.set(key,[]);groups.get(key).push(q);});
  const buckets=Array.from(groups.values()).map(items=>items.map(q=>({q,r:Math.random()})).sort((a,b)=>a.r-b.r).map(x=>x.q));
  for(let i=buckets.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[buckets[i],buckets[j]]=[buckets[j],buckets[i]];}
  const selected=[];
  while(selected.length<count&&buckets.some(a=>a.length))for(const a of buckets){if(a.length&&selected.length<count)selected.push(a.pop());}
  return selected;
 };
 engine.saveActive=function(session){
  const s=engine.ensure();s.activePractice=JSON.parse(JSON.stringify(session));
  s.activeQuestions=(session.order||[]).map(id=>findQuestion(id)).filter(Boolean);
  window.saveUserState(window.userState);
 };
 engine.clearActive=function(){const s=engine.ensure();delete s.activePractice;delete s.activeQuestions;window.saveUserState(window.userState);};
})();
