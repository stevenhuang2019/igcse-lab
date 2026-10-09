/* IGCSE LAB — Unified UserState schema v2
 * Keeps legacy fields readable while giving all engines one canonical state shape.
 */
(function(){
  'use strict';
  function ensureState(){
    const s=window.userState||window.__IGCSE_USER_STATE__||{};
    s.schemaVersion=Math.max(Number(s.schemaVersion||1),2);
    s.progress=s.progress||{subjects:{},topics:{},lastActiveAt:null};
    s.mastery=s.mastery||{};
    s.srs=s.srs||{cards:{},reviews:0};
    s.dailyPlan=s.dailyPlan||{};
    s.assessments=s.assessments||{records:[]};
    s.mockExams=s.mockExams||{records:[]};
    s.achievements=s.achievements||{unlocked:[]};
    s.errorDiagnosis=s.errorDiagnosis||{};
    s.topicStats=s.topicStats||{};
    s.questionStats=s.questionStats||{};
    s.mistakes=s.mistakes||[];
    s.learnedTopics=s.learnedTopics||[];
    s.assessmentRecords=s.assessmentRecords||[];
    s.englishMaster=s.englishMaster||{vocab:{},grammar:{},sentences:{},commandWords:{}};
    s.progress.lastActiveAt=s.progress.lastActiveAt||null;
    window.userState=s;
    window.__IGCSE_USER_STATE__=s;
    return s;
  }
  function save(){
    const s=ensureState();
    s.progress.lastActiveAt=new Date().toISOString();
    try{localStorage.setItem('igcseUserState',JSON.stringify(s));}catch(e){}
    window.__IGCSE_USER_STATE__=s;
    return s;
  }
  window.ensureIGCSEUserState=ensureState;
  window.saveIGCSEUserState=save;
  ensureState();
})();
