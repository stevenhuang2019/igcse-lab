/* Conservative evidence: only explicit question references with matching editions count. */
(function(){
 'use strict';
 function audit(subject){
  const registry=window.IGCSE_SYLLABUS_REGISTRY?.[subject],catalog=window.IGCSE_CATALOG;
  if(!registry||!catalog)return null;
  const qs=catalog.questions.filter(q=>q.subject===subject),refs=new Set(registry.sections.map(s=>s.ref));
  const editionMatches=q=>q.syllabus===registry.code&&q.syllabusYear===registry.year;
  const sections=registry.sections.map(s=>{
   const topics=s.topicIds.filter(id=>catalog.topic(subject,id));
   const questions=qs.filter(q=>editionMatches(q)&&q.syllabusRef===s.ref);
   const preparation=questions.filter(q=>q.assessmentMode==='preparation');
   const practice=questions.filter(q=>q.assessmentMode!=='preparation');
   const attempted=q=>Number(window.userState?.questionStats?.[q.id]?.answered)>0;
   return {...s,topicIds:topics,questionIds:questions.map(q=>q.id),practiceCount:practice.length,preparationCount:preparation.length,
    attemptedCount:practice.filter(attempted).length,preparationAttemptedCount:preparation.filter(attempted).length,
    status:practice.length?'sample-practice':preparation.length?'preparation-only':topics.length?'content-linked':'gap'};
  });
  return {...registry,sections,sectionCount:sections.length,sampled:sections.filter(s=>s.practiceCount).length,
   gaps:sections.filter(s=>s.status==='gap').map(s=>s.ref),
   unreferencedQuestions:qs.filter(q=>!q.syllabusRef).map(q=>q.id),
   invalidReferences:qs.filter(q=>q.syllabusRef&&(!editionMatches(q)||!refs.has(q.syllabusRef))).map(q=>q.id)};
 }
 window.getIGCSESyllabusAudit=audit;
})();
