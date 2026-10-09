const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
function load(){
 const window={userState:{learnedTopics:[],topicStats:{},questionStats:{},dailyPlan:{},mistakes:[]},addEventListener(){},dispatchEvent(){},saveUserState(){}};
 const context=vm.createContext({window,Date,console,document:{readyState:'loading',addEventListener(){}},CustomEvent:function(){}});
 const run=f=>vm.runInContext(fs.readFileSync('data/'+f,'utf8'),context);
 for(const f of ['igcse_content.js','igcse_questions.js','igcse_questions_math.js','igcse_questions_physics.js','igcse_questions_chemistry.js','igcse_questions_dt.js','igcse_questions_business.js','igcse_cs_0478.js','igcse_questions_cs.js','igcse_english_esl.js','igcse_questions_english.js','igcse_english_deep.js','igcse_cs_deep.js','physics_0625_course_map.js','igcse_questions_extension.js','igcse_questions_depth.js','igcse_foundation.js','igcse_curriculum_expansion.js','igcse_skill_depth.js','structured_tasks.js','objective_coverage.js','igcse_release_depth.js','learning_catalog.js','syllabus_registry.js','curriculum_expansion_map.js','syllabus_audit.js','curriculum_plan.js','mastery_engine.js','mock_exam_engine.js'])run(f);
 window.questionData=window.IGCSE_CATALOG.questions;return window;
}
test('priority audit preserves bounded scope, editions, source pages and explicit gaps',()=>{
 const w=load();let count=0;
 for(const subject of ['business','math','physics','chemistry','computer_science','english']){
  const a=w.getIGCSEObjectiveAudit(subject);assert.equal(a.fullInventoryReviewed,false);assert.equal(a.rows.length,4);count+=a.rows.length;
  for(const row of a.rows){assert.ok(row.page>0);assert.ok(row.remaining);assert.ok(w.IGCSE_CATALOG.topic(subject,row.topicId));for(const id of row.questionIds){const q=w.IGCSE_CATALOG.question(id);assert.equal(q.syllabus,a.code);assert.equal(q.syllabusYear,a.year);}}
 }
 assert.equal(count,24);assert.equal(w.getIGCSEObjectiveAudit('dt'),null);assert.equal(w.getIGCSEObjectiveAudit('math').rows.find(r=>r.id==='math_surds').status,'partial');
 assert.equal(w.getIGCSEObjectiveAudit('english').rows.find(r=>r.id==='english_listen').questionIds.length,0);
 w.IGCSE_CURRICULUM.setProfile('business',{qualification:'IGCSE',code:'0450',examYear:2026});assert.equal(w.getIGCSEObjectiveAudit('business'),null);assert.ok(w.IGCSE_MOCK_ENGINE.selectStructured('business').every(q=>q.syllabus!=='0264'));
 w.IGCSE_CURRICULUM.setProfile('math',{qualification:'AS',code:'9709',examYear:2028,foundation:false});assert.equal(w.IGCSE_MOCK_ENGINE.selectStructured('math').length,0);
 w.IGCSE_CURRICULUM.setProfile('math',{qualification:'IGCSE',code:'0580',examYear:2027});assert.ok(w.IGCSE_MOCK_ENGINE.selectStructured('math').some(q=>q.id==='objective_math_boundspeed')); 
});
test('original calculation checks and unscored responses retain meaningful evidence boundaries',()=>{
 const w=load(),q=id=>w.IGCSE_CATALOG.question('objective_'+id);assert.equal(w.IGCSE_OBJECTIVE_QUESTIONS.length,24);
 assert.ok(Math.abs(Number(q('math_boundarea').answer)-6.05*4.05)<1e-9);assert.ok(Math.abs(Number(q('math_boundspeed').answer)-9.95/2.05)<q('math_boundspeed').tolerance);
 assert.equal(Number(q('chemistry_titration').answer),(20/1000*0.1)/(25/1000));assert.equal(Number(q('physics_cableloss').answer),20**2*0.5);
 for(const t of w.IGCSE_OBJECTIVE_QUESTIONS){assert.equal(t.pastPaper,false);if(t.type==='choice')assert.equal(t.options.filter(o=>o===t.answer).length,1);if(t.type==='essay'){assert.equal(t.marks,0);assert.equal(t.rubric.length,3);}assert.notEqual(t.subject,'dt');}
 const writing=w.getIGCSEObjectiveAudit('english').rows.find(r=>r.ref==='W4');assert.equal(writing.objectiveCount,0);assert.equal(writing.status,'preparation');
});
test('matrix includes objective evidence without changing school progression or mastery',()=>{
 const w=load();w.IGCSE_CURRICULUM.matrix('math');const before=JSON.stringify(w.userState),m=w.IGCSE_CURRICULUM.matrix('math');assert.equal(m.priorityObjectiveAudit.rows.length,4);assert.equal(m.priorityObjectiveAudit.fullInventoryReviewed,false);assert.equal(JSON.stringify(w.userState),before);
});
