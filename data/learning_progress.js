/* Record unique-question evidence once, shared by all learning surfaces. */
(function(){
  'use strict';
  window.addEventListener('igcse-answer-recorded',e=>{
    const d=e.detail||{},s=window.userState;
    if(!s||!d.qid)return;
    s.questionStats=s.questionStats||{};
    const q=s.questionStats[d.qid]=s.questionStats[d.qid]||{answered:0,correct:0,subject:d.subject,topicId:d.topicId};
    q.answered++;if(d.correct)q.correct++;
    const now=new Date(),day=now.getFullYear()+'-'+String(now.getMonth()+1).padStart(2,'0')+'-'+String(now.getDate()).padStart(2,'0');
    s.activityByDay=s.activityByDay||{};s.activityByDay[day]=s.activityByDay[day]||{};
    const activity=s.activityByDay[day][d.subject]=s.activityByDay[day][d.subject]||{answered:0,correct:0};
    activity.answered++;if(d.correct)activity.correct++;
    q.lastAnsweredAt=now.toISOString();q.lastCorrect=!!d.correct;
    window.saveUserState(s);
  });
})();
