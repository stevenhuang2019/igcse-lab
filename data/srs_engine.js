/* IGCSE Personal Learning OS — SRS Engine v1
 * Lightweight SM-2-inspired scheduler. Stores review cards in userState.srs.cards.
 */
(function(){
  'use strict';
  const state=()=>window.userState||(window.userState={});
  const clamp=n=>Math.max(0,Math.min(100,Number(n)||0));
  const keyOf=(topicId,subject,qid)=>qid?'q::'+String(qid):(subject&&topicId?String(subject)+'::'+String(topicId):String(topicId||''));
  function ensure(){
    const s=state(); s.srs=s.srs||{cards:{},reviews:0}; s.srs.cards=s.srs.cards||{}; return s.srs;
  }
  function today(){return new Date().toISOString().slice(0,10);}
  function addDays(d,n){const x=new Date(d||Date.now());x.setDate(x.getDate()+n);return x.toISOString();}
  function getCard(topicId,subject,qid){
    const srs=ensure(),key=keyOf(topicId,subject,qid);
    srs.cards[key]=srs.cards[key]||{key,topicId,subject,qid:qid||'',box:1,interval:1,ease:2.5,dueAt:new Date().toISOString(),reviews:0,correct:0,wrong:0};
    return srs.cards[key];
  }
  function schedule(topicId,subject,correct,meta){
    if(!topicId)return null;
    const c=getCard(topicId,subject,meta&&meta.qid);
    if(meta?.assisted){c.assistedReviews=(c.assistedReviews||0)+1;c.dueAt=addDays(null,1);c.lastAssistedAt=new Date().toISOString();if(window.saveUserState)window.saveUserState(state());return c;}
    c.reviews++;
    if(correct){
      c.correct++;
      c.box=Math.min(5,(c.box||1)+1);
      c.ease=Math.min(3.0,Number(c.ease||2.5)+0.05);
      c.interval=Math.max(1,Math.round((c.interval||1)*c.ease));
    }else{
      c.wrong++;
      c.box=1;
      c.ease=Math.max(1.7,Number(c.ease||2.5)-0.2);
      c.interval=1;
    }
    c.lastReviewedAt=new Date().toISOString();
    c.dueAt=addDays(c.lastReviewedAt,c.interval);
    c.lastResult=!!correct;
    c.source=(meta&&meta.source)||c.source||'practice';
    c.retention=clamp(c.reviews?c.correct/c.reviews*100:0);
    ensure().reviews++;
    if(window.saveUserState)window.saveUserState(state());
    return c;
  }
  function dueCards(limit){
    const now=Date.now(),cards=Object.values(ensure().cards);
    return cards.filter(c=>!c.dueAt||new Date(c.dueAt).getTime()<=now).sort((a,b)=>new Date(a.dueAt||0)-new Date(b.dueAt||0)).slice(0,limit||20);
  }
  function upsertFromAnswer(d){
    if(!d||!d.topicId)return;
    const card=schedule(d.topicId,d.subject,!!d.correct,{source:d.pastPaper?'past-paper':(d.mode||'practice'),qid:d.qid,assisted:!!d.assisted});
    // Scheduling every answer is useful, but ordinary practice must not overwrite
    // the retention measured by actual SRS reviews in the mastery engine.
    return card;
  }
  function seedFromMistakes(limit){
    const s=state(), mistakes=Array.isArray(s.mistakes)?s.mistakes:[],out=[];
    for(const m of mistakes.slice(0,limit||20)){
      const qid=typeof m==='string'?m:m.qid, q=(window.questionData||[]).find(x=>x.id===qid);
      if(q){getCard(q.topicId,q.subject,q.id).source='mistake';out.push(getCard(q.topicId,q.subject,q.id));}
    }
    if(window.saveUserState)window.saveUserState(s);
    return out;
  }
  window.IGCSE_SRS={ensure,getCard,schedule,dueCards,seedFromMistakes,today};
  window.addEventListener('igcse-answer-recorded',e=>upsertFromAnswer(e.detail||{}));
  window.addEventListener('igcse-srs-seed',e=>seedFromMistakes((e.detail||{}).limit||20));
})();
