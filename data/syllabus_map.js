/* IGCSE LAB — normalized syllabus mapping layer
 * Maps Subject → Syllabus → Chapter → Topic → Knowledge Objective.
 * Content remains original; official wording can be added without changing the runtime contract.
 */
(function(){
  'use strict';
  const SUBJECT_META={
    math:{syllabus:'0580',year:'2025-2027',name:'Mathematics'},
    physics:{syllabus:'0625',year:'2026-2028',name:'Physics'},
    chemistry:{syllabus:'0620',year:'2026-2028',name:'Chemistry'},
    dt:{syllabus:'0445',year:'2024-2026',name:'Design & Technology',note:'2027 and 2028-2030 use separate syllabus versions',sourceUrl:'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-design-and-technology-0445/'},
    business:{syllabus:'0450',year:'2026',name:'Business Studies',note:'Replaced by Business 0264 from 2027; this legacy catalogue has not been fully remapped',sourceUrl:'https://www.cambridgeinternational.org/programmes-and-qualifications/view/cambridge-igcse-business-studies-0450/'},
    computer_science:{syllabus:'0478',year:'2026-2028',name:'Computer Science'},
    english:{syllabus:'0510/0511',year:'2027-2029',name:'English as a Second Language'}
  };
  function build(){
    const all=window.IGCSE_CATALOG?window.IGCSE_CATALOG.topics:[].concat(
      window.IGCSE_CONTENT||[],
      window.IGCSE_CS_CONTENT||[],
      window.IGCSE_ENGLISH_CONTENT||[],
      window.IGCSE_CS_DEEP_CONTENT||[],
      window.IGCSE_ENGLISH_DEEP_CONTENT||[]
    );
    const map={};
    all.forEach(x=>{
      const subject=x.subject;
      if(!subject||!x.topicId)return;
      const meta=SUBJECT_META[subject]||{syllabus:x.syllabus||'',year:x.syllabusYear||'',name:subject};
      map[subject]=map[subject]||{subject,syllabus:meta.syllabus,syllabusYear:meta.year,name:meta.name,note:meta.note||'',sourceUrl:meta.sourceUrl||'',alignmentStatus:'local-topic-mapping',chapters:{}};
      const chapter=String(x.chapter||'Unmapped');
      map[subject].chapters[chapter]=map[subject].chapters[chapter]||{chapter,topics:{}};
      map[subject].chapters[chapter].topics[x.topicId]={
        topicId:x.topicId,
        title:x.title||x.topicId,
        objectives:x.objectives||x.learningObjectives||[],
        examSkill:x.examSkill||null,
        commandWords:x.commandWords||[],
        source:'original-content',
        questionIds:window.IGCSE_CATALOG?window.IGCSE_CATALOG.questionsFor(subject,x.topicId).map(q=>q.id):[]
      };
    });
    window.IGCSE_SYLLABUS_MAP=map;
    return map;
  }
  function coverage(subject){
    const m=(window.IGCSE_SYLLABUS_MAP||build())[subject];
    if(!m)return {topics:0,chapters:0,covered:0,coverage:0};
    const topics=Object.values(m.chapters).flatMap(c=>Object.values(c.topics));
    const state=window.userState||window.__IGCSE_USER_STATE__||{};
    const covered=topics.filter(t=>(state.learnedTopics||[]).includes(t.topicId)).length;
    const withQuestions=topics.filter(t=>t.questionIds.length).length;
    return {topics:topics.length,chapters:Object.keys(m.chapters).length,covered,coverage:topics.length?Math.round(covered/topics.length*100):0,topicsWithQuestions:withQuestions,questionCoverage:topics.length?Math.round(withQuestions/topics.length*100):0,scope:'local-catalogue'};
  }
  window.getIGCSESyllabusMap=()=>window.IGCSE_SYLLABUS_MAP||build();
  window.getIGCSESyllabusCoverage=coverage;
  build();
})();
