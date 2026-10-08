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
    dt:{syllabus:'0445',year:'2026-2028',name:'Design & Technology'},
    business:{syllabus:'0450',year:'2026-2028',name:'Business Studies'},
    computer_science:{syllabus:'0478',year:'2026-2028',name:'Computer Science'},
    english:{syllabus:'0510/0511',year:'2027-2029',name:'English as a Second Language'}
  };
  function build(){
    const all=[].concat(
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
      map[subject]=map[subject]||{subject,syllabus:meta.syllabus,syllabusYear:meta.year,name:meta.name,chapters:{}};
      const chapter=String(x.chapter||'Unmapped');
      map[subject].chapters[chapter]=map[subject].chapters[chapter]||{chapter,topics:{}};
      map[subject].chapters[chapter].topics[x.topicId]={
        topicId:x.topicId,
        title:x.title||x.topicId,
        objectives:x.objectives||x.learningObjectives||[],
        examSkill:x.examSkill||null,
        commandWords:x.commandWords||[],
        source:'original-content'
      };
    });
    window.IGCSE_SYLLABUS_MAP=map;
    return map;
  }
  function coverage(subject){
    const m=(window.IGCSE_SYLLABUS_MAP||build())[subject];
    if(!m)return {topics:0,chapters:0,covered:0,coverage:0};
    const topics=Object.values(m.chapters).flatMap(c=>Object.values(c.topics));
    const state=window.__IGCSE_USER_STATE__||{};
    const covered=topics.filter(t=>(state.learnedTopics||[]).includes(t.topicId)).length;
    return {topics:topics.length,chapters:Object.keys(m.chapters).length,covered,coverage:topics.length?Math.round(covered/topics.length*100):0};
  }
  window.getIGCSESyllabusMap=()=>window.IGCSE_SYLLABUS_MAP||build();
  window.getIGCSESyllabusCoverage=coverage;
  build();
})();
