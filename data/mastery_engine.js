/* Mastery v4: observed dimensions only, with explicit sample evidence. */
(function(){
 'use strict';
 const state=()=>window.userState||(window.userState={});
 const clamp=n=>Math.max(0,Math.min(100,Math.round(Number(n)||0)));
 const keyOf=(id,subject)=>subject&&id?subject+'::'+id:String(id||'');
 function getStats(id,subject){
  const s=state();s.topicStats=s.topicStats||{};
  return s.topicStats[keyOf(id,subject)]||s.topicStats[id]||(s.topicStats[keyOf(id,subject)]={answered:0,correct:0,wrong:0,attempts:0});
 }
 function evidence(id,subject){
  const st=getStats(id,subject),answered=Number(st.answered||st.attempts||0),correct=Number(st.correct||0);
  const recent=Array.isArray(st.recentResults)?st.recentResults.slice(-5):[];
  const dimensions=[
   {id:'initial',label:'起点评估',weight:20,score:st.initialAssessment==null?null:clamp(st.initialAssessment)},
   {id:'practice',label:'累计练习（含提示）',weight:30,score:answered?clamp(correct/answered*100):null},
   {id:'recent',label:'最近作答',weight:20,score:recent.length?clamp(recent.filter(Boolean).length/recent.length*100):null},
   {id:'pastPaper',label:'官方试题记录',weight:20,score:Number(st.pastPaperAttempts)>0?clamp(st.pastPaperAccuracy):null},
   {id:'srs',label:'间隔复习',weight:10,score:Number(st.srsReviews)>0?clamp(st.srsRetention):null}
  ];
  const observed=dimensions.filter(d=>d.score!==null),knownWeight=observed.reduce((n,d)=>n+d.weight,0);
  const score=knownWeight?clamp(observed.reduce((n,d)=>n+d.score*d.weight,0)/knownWeight):0;
  const qs=window.IGCSE_CATALOG?window.IGCSE_CATALOG.questionsFor(subject,id):[];
  const records=state().questionStats||{},objective=qs.filter(q=>q.type!=='essay'&&q.assessmentMode!=='preparation');
  const attempts=q=>Math.max(0,Number(records[q.id]?.answered)||0);
  const independent=q=>Math.max(0,attempts(q)-(Number(records[q.id]?.assistedAnswered)||0));
  const unique=objective.filter(q=>independent(q)>0).length,objectiveAttempts=objective.reduce((n,q)=>n+independent(q),0),assisted=qs.reduce((n,q)=>n+(Number(records[q.id]?.assistedAnswered)||0),0);
  const selfAssessed=qs.filter(q=>q.type==='essay').reduce((n,q)=>n+attempts(q),0);
  const preparation=qs.filter(q=>q.assessmentMode==='preparation').reduce((n,q)=>n+attempts(q),0);
  // A high score from one item remains visibly provisional. Small local pools are disclosed.
  const established=score>=85&&objective.length>0&&unique>=Math.min(5,objective.length)&&objectiveAttempts>=5;
  return {score,answered,dimensions,knownWeight,objectiveUnique:unique,objectiveAttempts,objectivePool:objective.length,assisted,selfAssessed,preparation,established,
   band:!observed.length?'尚未开始':established?'练习表现稳固':objectiveAttempts<5?'样本有限':'继续巩固'};
 }
 function calc(id,subject){
  if(!id)return 0;
  const st=getStats(id,subject),e=evidence(id,subject);
  st.practiceAccuracy=e.dimensions.find(d=>d.id==='practice').score;
  st.recentAccuracy=e.dimensions.find(d=>d.id==='recent').score;
  st.mastery=e.score;st.masteryBand=e.band;st.masteryModelVersion=4;
  st.attempts=Math.max(Number(st.attempts||0),e.answered);
  st.wrong=Math.max(Number(st.wrong||0),e.answered-Number(st.correct||0));
  st.lastStudied=st.lastStudiedAt||st.lastStudied||null;
  return e.score;
 }
 function record(id,correct,meta={}){
  if(!id)return;
  const st=getStats(id,meta.subject);st.lastStudiedAt=new Date().toISOString();
  if(meta.initialAssessment){st.initialAssessment=clamp(meta.assessmentScore??(correct?100:0));}
  else {
   st.recentResults=Array.isArray(st.recentResults)?st.recentResults:[];
   st.recentResults.push(!!correct);if(st.recentResults.length>10)st.recentResults.shift();
  }
  if(meta.pastPaper&&meta.pastPaperType==='official'){
   const n=Number(st.pastPaperAttempts||0)+1;
   st.pastPaperAccuracy=(Number(st.pastPaperAccuracy||0)*(n-1)+(correct?100:0))/n;st.pastPaperAttempts=n;
  }
  if(meta.srs&&!meta.assisted){
   st.srsRetention=Number(st.srsReviews)>0?clamp(Number(st.srsRetention)*.6+(correct?40:0)):(correct?100:0);
   st.srsReviews=Number(st.srsReviews||0)+1;
  }
  calc(id,meta.subject);
  if(window.saveUserState)window.saveUserState(state());
  window.dispatchEvent(new CustomEvent('igcse-mastery-updated',{detail:{topicId:id,subject:meta.subject||'',mastery:st.mastery}}));
 }
 const s=state();s.topicStats=s.topicStats||{};
 Object.entries(s.topicStats).forEach(([key,st])=>{if(!key.includes('::')&&st?.subject&&!s.topicStats[keyOf(key,st.subject)])s.topicStats[keyOf(key,st.subject)]=st;});
 window.masteryTopicKey=keyOf;window.getTopicMasteryStats=getStats;window.getTopicMasteryEvidence=evidence;window.calculateMasteryV2=calc;window.recordMasteryEvent=record;
 window.addEventListener('igcse-answer-recorded',e=>{const d=e.detail||{};if(d.topicId)record(d.topicId,!!d.correct,d);});
 window.addEventListener('igcse-dashboard-refresh',()=>{Object.keys(state().topicStats||{}).forEach(key=>{const i=key.indexOf('::');calc(i>0?key.slice(i+2):key,i>0?key.slice(0,i):undefined);});});
})();
