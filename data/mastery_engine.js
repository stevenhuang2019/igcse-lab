/* IGCSE Personal Learning OS — Mastery Engine v2 */
(function(){
  'use strict';
  const state=()=>window.userState||(window.userState={});
  const clamp=n=>Math.max(0,Math.min(100,Math.round(n)));
  function calc(topicId){
    const st=(state().topicStats||{})[topicId]||{};
    const answered=st.answered||0, accuracy=answered?st.correct/answered*100:0;
    const recent=Array.isArray(st.recentResults)&&st.recentResults.length?st.recentResults.slice(-5).reduce((a,x)=>a+(x?1:0),0)/Math.min(5,st.recentResults.length)*100:accuracy;
    const age=st.lastStudiedAt?Math.max(0,(Date.now()-new Date(st.lastStudiedAt).getTime())/86400000):999;
    const recency=st.lastStudiedAt?Math.max(0,100-age*5):0;
    const mistakes=(state().mistakes||[]).filter(m=>m.topicId===topicId);
    const srs=st.srsRetention==null?(mistakes.length?Math.max(0,100-mistakes.length*15):answered?80:0):st.srsRetention;
    const past=st.pastPaperAccuracy==null?accuracy:st.pastPaperAccuracy;
    const mastery=answered?clamp(accuracy*.30+recent*.20+recency*.10+past*.20+srs*.20):0;
    st.mastery=mastery; st.masteryBand=mastery>=85?'Mastered':mastery>=70?'Good':mastery>=50?'Learning':mastery>=30?'Weak':'Not Started';
    return mastery;
  }
  function record(topicId,correct,meta){
    if(!topicId)return;
    const st=(state().topicStats=state().topicStats||{})[topicId]||(state().topicStats[topicId]={answered:0,correct:0,lastWrongAt:null});
    st.lastStudiedAt=new Date().toISOString();
    st.recentResults=Array.isArray(st.recentResults)?st.recentResults:[];
    st.recentResults.push(!!correct); if(st.recentResults.length>10)st.recentResults.shift();
    if(meta&&meta.pastPaper)st.pastPaperAccuracy=meta.accuracy==null?(correct?100:0):meta.accuracy;
    if(correct&&meta&&meta.srs)st.srsRetention=clamp((st.srsRetention==null?0:st.srsRetention)*.7+30);
    if(!correct)st.srsRetention=clamp((st.srsRetention==null?0:st.srsRetention)*.7);
    calc(topicId);
    if(window.saveUserState)window.saveUserState(state());
    window.dispatchEvent(new CustomEvent('igcse-mastery-updated',{detail:{topicId,mastery:st.mastery}}));
  }
  window.calculateMasteryV2=calc;
  window.recordMasteryEvent=record;
  window.addEventListener('igcse-answer-recorded',e=>{const d=e.detail||{};if(d.topicId)record(d.topicId,!!d.correct,d);});
  window.addEventListener('igcse-dashboard-refresh',()=>{Object.keys(state().topicStats||{}).forEach(calc);});
})();
