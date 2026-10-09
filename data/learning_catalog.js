/* Canonical, indexed learning assets. All coverage refers to this local catalogue. */
(function(){
  'use strict';
  const topics=[].concat(window.IGCSE_CONTENT||[],window.IGCSE_CS_CONTENT||[],window.IGCSE_ENGLISH_CONTENT||[],window.IGCSE_CS_DEEP_CONTENT||[],window.IGCSE_ENGLISH_DEEP_CONTENT||[],window.PHYSICS_0625_COURSE_MAP||[],window.IGCSE_FOUNDATION_CONTENT||[],window.IGCSE_EXPANSION_CONTENT||[]);
  const questions=[].concat(window.IGCSE_QUESTIONS||[],window.IGCSE_CS_QUESTIONS||[],window.IGCSE_ENGLISH_QUESTIONS||[],window.IGCSE_CS_DEEP_QUESTIONS||[],window.IGCSE_ENGLISH_DEEP_QUESTIONS||[],window.IGCSE_EXTENSION_QUESTIONS||[],window.IGCSE_DEPTH_QUESTIONS||[],window.IGCSE_FOUNDATION_QUESTIONS||[],window.IGCSE_EXPANSION_QUESTIONS||[]);
  const topicIndex=new Map(),questionIndex=new Map(),subjectTopics=new Map(),topicQuestions=new Map();
  const key=(subject,id)=>subject+'::'+id;
  topics.forEach(t=>{
    const k=key(t.subject,t.topicId);
    if(topicIndex.has(k))throw new Error('Duplicate topic: '+k);
    topicIndex.set(k,t);
    if(!subjectTopics.has(t.subject))subjectTopics.set(t.subject,[]);
    subjectTopics.get(t.subject).push(t);
  });
  questions.forEach(q=>{
    if(questionIndex.has(q.id))throw new Error('Duplicate question: '+q.id);
    questionIndex.set(q.id,q);
    const k=key(q.subject,q.topicId);
    if(!topicQuestions.has(k))topicQuestions.set(k,[]);
    topicQuestions.get(k).push(q);
  });
  window.IGCSE_CATALOG={topics,questions,subjects:Array.from(subjectTopics.keys()),
    topic:(subject,id)=>topicIndex.get(key(subject,id)),question:id=>questionIndex.get(id),
    topicsFor:subject=>subjectTopics.get(subject)||[],questionsFor:(subject,id)=>topicQuestions.get(key(subject,id))||[],
    audit(){return {orphanQuestions:questions.filter(q=>!topicIndex.has(key(q.subject,q.topicId))).map(q=>q.id),subjects:Array.from(subjectTopics.keys()).map(subject=>{
      const ts=subjectTopics.get(subject),empty=ts.filter(t=>!topicQuestions.has(key(subject,t.topicId)));
      return {subject,topics:ts.length,questions:questions.filter(q=>q.subject===subject).length,topicsWithQuestions:ts.length-empty.length,emptyTopics:empty.map(t=>t.topicId)};
    })};}
  };
})();
