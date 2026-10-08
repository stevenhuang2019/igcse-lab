/* IGCSE Personal Learning OS — Mastery Engine v3
 * Namespaced topic mastery + explicit learning dimensions.
 */
(function(){
  'use strict';
  const state=()=>window.userState||(window.userState={});
  const clamp=n=>Math.max(0,Math.min(100,Math.round(Number(n)||0)));
  const keyOf=(topicId,subject)=>subject&&topicId?String(subject)+'::'+String(topicId):String(topicId||'');
  function getStats(topicId,subject){
    const st=state();
    st.topicStats=st.topicStats||{};
    const key=keyOf(topicId,subject);
    if(st.topicStats[key])return st.topicStats[key];
    // Backward compatibility with the original non-namespaced store.
    if(st.topicStats[topicId])return st.topicStats[topicId];
    st.topicStats[key]={answered:0,correct:0,wrong:0,attempts:0};
    return st.topicStats[key];
  }
  function calc(topicId,subject){
    if(!topicId)return 0;
    const st=getStats(topicId,subject);
    const answered=Number(st.answered||st.attempts||0);
    const correct=Number(st.correct||0);
    const accuracy=answered?correct/answered*100:0;
    const rr=Array.isArray(st.recentResults)?st.recentResults.slice(-5):[];
    const recent=rr.length?rr.reduce((a,x)=>a+(x?1:0),0)/rr.length*100:accuracy;
    const age=st.lastStudiedAt?Math.max(0,(Date.now()-new Date(st.lastStudiedAt).getTime())/86400000):999;
    const recency=st.lastStudiedAt?Math.max(0,100-age*5):0;
    const past=st.pastPaperAccuracy==null?accuracy:clamp(st.pastPaperAccuracy);
    const srs=st.srsRetention==null?(answered?80:0):clamp(st.srsRetention);
    const initial=st.initialAssessment==null?(answered?accuracy:0):clamp(st.initialAssessment);
    const mastery=answered?clamp(initial*.20+accuracy*.30+recent*.20+past*.20+srs*.10):0;
    st.practiceAccuracy=clamp(accuracy);
    st.recentAccuracy=clamp(recent);
    st.recencyScore=clamp(recency);
    st.pastPaperAccuracy=clamp(past);
    st.srsRetention=clamp(srs);
    st.attempts=Math.max(Number(st.attempts||0),answered);
    st.wrong=Math.max(Number(st.wrong||0),answered-correct);
    st.mastery=mastery;
    st.masteryBand=mastery>=85?'Mastered':mastery>=70?'Good':mastery>=50?'Learning':mastery>=30?'Weak':'Not Started';
    st.lastStudied=st.lastStudiedAt||st.lastStudied||null;
    return mastery;
  }
  function record(topicId,correct,meta){
    if(!topicId)return;
    const subject=meta&&meta.subject;
    const st=getStats(topicId,subject);
    st.lastStudiedAt=new Date().toISOString();
    st.recentResults=Array.isArray(st.recentResults)?st.recentResults:[];
    st.recentResults.push(!!correct);
    if(st.recentResults.length>10)st.recentResults.shift();
    if(meta&&meta.initialAssessment&&st.initialAssessment==null)st.initialAssessment=correct?100:0;
    if(meta&&meta.pastPaper){
      const n=Number(st.pastPaperAttempts||0)+1;
      st.pastPaperAccuracy=((Number(st.pastPaperAccuracy||0)*(n-1))+(correct?100:0))/n;
      st.pastPaperAttempts=n;
    }
    if(meta&&meta.srs){
      const old=st.srsRetention==null?0:Number(st.srsRetention);
      st.srsRetention=clamp(correct?(old*.6+40):(old*.6));
      st.srsReviews=Number(st.srsReviews||0)+1;
    }
    calc(topicId,subject);
    if(window.saveUserState)window.saveUserState(state());
    window.dispatchEvent(new CustomEvent('igcse-mastery-updated',{detail:{topicId,subject:subject||'',mastery:st.mastery}}));
  }
  function migrateLegacy(){
    const st=state(), ts=st.topicStats||{};
    Object.keys(ts).forEach(k=>{
      if(k.includes('::'))return;
      const x=ts[k];
      if(x&&x.subject){
        const nk=keyOf(k,x.subject);
        if(!ts[nk])ts[nk]=x;
      }
    });
  }
  window.masteryTopicKey=keyOf;
  window.getTopicMasteryStats=getStats;
  window.calculateMasteryV2=calc;
  window.recordMasteryEvent=record;
  migrateLegacy();
  window.addEventListener('igcse-answer-recorded',e=>{
    const d=e.detail||{};
    if(d.topicId)record(d.topicId,!!d.correct,d);
  });
  window.addEventListener('igcse-dashboard-refresh',()=>{
    Object.keys(state().topicStats||{}).forEach(k=>{
      const p=k.indexOf('::');
      calc(p>0?k.slice(p+2):k,p>0?k.slice(0,p):undefined);
    });
  });
})();