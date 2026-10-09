const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
function load(){
 const window={userState:{learnedTopics:[],topicStats:{},questionStats:{},dailyPlan:{},mistakes:[]},addEventListener(){},dispatchEvent(){},saveUserState(){}};
 const context=vm.createContext({window,Date,console,document:{readyState:'loading',addEventListener(){}},CustomEvent:function(){}});
 const run=f=>vm.runInContext(fs.readFileSync('data/'+f,'utf8'),context);
 for(const f of ['igcse_content.js','igcse_questions.js','igcse_questions_math.js','igcse_questions_physics.js','igcse_questions_chemistry.js','igcse_questions_dt.js','igcse_questions_business.js','igcse_cs_0478.js','igcse_questions_cs.js','igcse_english_esl.js','igcse_questions_english.js','igcse_english_deep.js','igcse_cs_deep.js','physics_0625_course_map.js','igcse_questions_extension.js','igcse_questions_depth.js','igcse_foundation.js','igcse_curriculum_expansion.js','igcse_skill_depth.js','structured_tasks.js','objective_coverage.js','learning_catalog.js','syllabus_registry.js','curriculum_expansion_map.js','syllabus_audit.js','curriculum_plan.js','mastery_engine.js','mock_exam_engine.js'])run(f);
 window.questionData=window.IGCSE_CATALOG.questions;return window;
}
test('six-subject expansion provides distinct worked lessons, valid references and open tasks without changing DT',()=>{
 const w=load(),lessons=w.IGCSE_EXPANSION_CONTENT,questions=w.IGCSE_EXPANSION_QUESTIONS;
 assert.equal(lessons.length,55);assert.equal(questions.length,110);assert.equal(new Set(questions.map(q=>q.question)).size,110);
 assert.equal(lessons.some(t=>t.subject==='dt'),false);
 for(const t of lessons){assert.ok(t.knowledge.length>60,t.topicId);assert.ok(t.workedExample.length>30,t.topicId);assert.equal(t.checklist.length,3);assert.ok(t.objectiveRefs.length);assert.equal(t.reviewStatus,'sample-reviewed-not-exhaustive');const a=w.getIGCSESyllabusAudit(t.subject);assert.ok(a.sections.find(s=>s.ref===t.syllabusRef).topicIds.includes(t.topicId));const qs=w.IGCSE_CATALOG.questionsFor(t.subject,t.topicId);assert.ok(qs.length>=2);assert.ok(qs.some(q=>q.type==='essay'&&q.rubric.length===3&&q.marks===0));}
 assert.equal(w.IGCSE_CATALOG.questions.filter(q=>q.subject==='dt').length,102);
});
test('Business 0264 includes all 29 official outline entries while legacy 0450 is separately selectable',()=>{
 const w=load(),cp=w.IGCSE_CURRICULUM;
 const expected=['1.1','1.2','1.3','1.4','1.5','2.1','2.2','2.3','2.4','3.1','3.2','3.3','3.4','4.1','4.2','4.3','4.4','4.5','4.6','5.1','5.2','5.3','5.4','5.5','6.1','6.2','6.3','6.4','6.5'];
 const a=w.getIGCSESyllabusAudit('business');assert.equal(a.code,'0264');assert.deepEqual(Array.from(a.sections,s=>s.ref),expected);assert.equal(a.sampled,29);
 assert.equal(cp.ordered('business').length,29);assert.ok(w.IGCSE_MOCK_ENGINE.selectQuestions('business',30).every(q=>q.syllabus==='0264'));
 cp.setProfile('business',{qualification:'IGCSE',code:'0450',examYear:2026});assert.equal(cp.edition('business').matches,true);assert.equal(w.getIGCSESyllabusAudit('business').code,'0450');assert.equal(cp.ordered('business').length,6);assert.ok(w.IGCSE_MOCK_ENGINE.selectQuestions('business',30).every(q=>q.syllabus!=='0264'));
 cp.setProfile('business',{qualification:'IGCSE',code:'0264',examYear:2028});assert.equal(cp.edition('business').matches,true);assert.equal(cp.ordered('business').length,29);
});
test('writing preparation and open algorithm self-assessment cannot establish objective mastery',()=>{
 const w=load();for(const id of ['course_english_revision','course_english_emailtask','course_computer_science_filetask']){
  for(const q of w.IGCSE_CATALOG.questionsFor(id.includes('english')?'english':'computer_science',id).filter(q=>q.type==='essay'||q.assessmentMode==='preparation'))w.userState.questionStats[q.id]={answered:20,correct:20};
  const e=w.getTopicMasteryEvidence(id,id.includes('english')?'english':'computer_science');assert.equal(e.established,false);assert.equal(e.objectiveAttempts,0);
 }
 assert.equal(w.getIGCSESyllabusAudit('english').sections.find(s=>s.ref==='W3').status,'preparation-only');
});
test('worked numerical examples retain correct answer units and Core/Extended scope',()=>{
 const w=load(),q=id=>w.IGCSE_CATALOG.question('course_'+id+'_check');
 assert.equal(Number(q('math_reverse').answer),68/0.85);assert.equal(Number(q('physics_heat').answer),0.2*1000*5);assert.equal(Number(q('chemistry_chromatography').answer),2.4/8);
 assert.equal(q('math_reverse').tier,'Extended');assert.equal(q('chemistry_moles').tier,'Supplement');
 assert.equal(q('computer_science_trace').type,'number');assert.equal(q('english_revision').assessmentMode,'preparation');
});
