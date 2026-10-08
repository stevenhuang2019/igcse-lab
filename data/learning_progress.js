/* Record unique-question evidence once, shared by all learning surfaces. */
(function(){
  'use strict';
  window.addEventListener('igcse-answer-recorded',e=>{
    const d=e.detail||{},s=window.userState;
    if(!s||!d.qid)return;
    s.questionStats=s.questionStats||{};
    const q=s.questionStats[d.qid]=s.questionStats[d.qid]||{answered:0,correct:0,subject:d.subject,topicId:d.topicId};
    q.answered++;if(d.correct)q.correct++;
    q.lastAnsweredAt=new Date().toISOString();q.lastCorrect=!!d.correct;
    window.saveUserState(s);
  });
})();
