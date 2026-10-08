const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.join(__dirname,'..');
function load(){
 const window={},listeners={};window.addEventListener=(event,fn)=>{(listeners[event]||=[]).push(fn);};
 const document={readyState:'loading',addEventListener(){}};
 const ctx=vm.createContext({window,document,console,Date,CustomEvent:function(type,{detail}){this.type=type;this.detail=detail;}});
 const run=f=>vm.runInContext(fs.readFileSync(path.join(root,'data',f),'utf8'),ctx,{filename:f});
 for(const f of ['igcse_content.js','igcse_questions.js','igcse_questions_math.js','igcse_questions_physics.js','igcse_questions_chemistry.js','igcse_questions_dt.js','igcse_questions_business.js','igcse_cs_0478.js','igcse_questions_cs.js','igcse_english_esl.js','igcse_questions_english.js','igcse_english_deep.js','igcse_cs_deep.js','physics_0625_course_map.js','igcse_questions_extension.js','learning_catalog.js'])run(f);
 window.userState={topicStats:{},questionStats:{},learnedTopics:[],dailyPlan:{},mistakes:[]};window.saveUserState=()=>{};
 return {window,run,listeners};
}
test('all seven subjects have valid uniquely identified questions mapped to real topics',()=>{
 const {window}=load(),catalog=window.IGCSE_CATALOG,audit=catalog.audit();
 assert.equal(catalog.subjects.length,7);assert.ok(catalog.questions.length>=862);
 assert.equal(audit.orphanQuestions.length,0);
 for(const subject of audit.subjects){assert.equal(subject.emptyTopics.length,0,subject.subject);assert.ok(subject.questions>0);}
 for(const q of catalog.questions){
  assert.ok(q.question&&q.answer&&q.explain,q.id);
  assert.ok(['choice','essay','number'].includes(q.type),q.id);
  if(q.type==='choice'){assert.ok(q.options.includes(q.answer),q.id);assert.equal(new Set(q.options).size,q.options.length,q.id);}
 }
});
test('syllabus mapping includes physical course objectives and actual topic question links',()=>{
 const {window,run}=load();run('syllabus_map.js');
 const map=window.getIGCSESyllabusMap();
 const physics=Object.values(map.physics.chapters).flatMap(c=>Object.values(c.topics));
 assert.ok(physics.find(t=>t.topicId==='phy0625_6_2').objectives.length);
 assert.equal(physics.find(t=>t.topicId==='phy0625_6_2').questionIds.length,2);
 const coverage=window.getIGCSESyllabusCoverage('physics');
 assert.equal(coverage.questionCoverage,100);assert.equal(coverage.coverage,0);assert.equal(coverage.scope,'local-catalogue');
 assert.equal(map.business.syllabusYear,'2026');assert.match(map.business.note,/0264/);
});
test('dashboard counts individual question evidence and averages over unstarted topics',()=>{
 const {window,run,listeners}=load();window.questionData=window.IGCSE_CATALOG.questions;
 window.calculateMasteryV2=(id)=>id==='math_algebra_01'?60:0;
 run('learning_progress.js');run('learning_dashboard.js');
 const answer={detail:{qid:'math_q001',subject:'math',topicId:'math_algebra_01',correct:true}};
 listeners['igcse-answer-recorded'].forEach(fn=>fn(answer));
 let summary=window.IGCSE_DASHBOARD.summary('math');assert.equal(summary.practiced,1);assert.equal(summary.mastery,10);assert.equal(summary.accuracy,100);
 answer.detail.correct=false;listeners['igcse-answer-recorded'].forEach(fn=>fn(answer));
 summary=window.IGCSE_DASHBOARD.summary('math');assert.equal(summary.practiced,1);assert.equal(summary.accuracy,50);
 assert.equal(window.IGCSE_DASHBOARD.localDate(new Date(2026,9,9,0,5)),'2026-10-09');
 const day=window.IGCSE_DASHBOARD.day();assert.equal(day.tasks.length,5);assert.equal(new Set(day.tasks.map(t=>t.id)).size,5);
});
test('mock sampling spans topics, caps to available choices, and scoring records unanswered items',()=>{
 const {window,run}=load();window.questionData=window.IGCSE_CATALOG.questions;run('mock_exam_engine.js');
 const engine=window.IGCSE_MOCK_ENGINE,qs=engine.selectQuestions('physics',30);
 assert.equal(qs.length,30);assert.equal(new Set(qs.map(q=>q.id)).size,30);assert.ok(new Set(qs.map(q=>q.topicId)).size>=25);
 const english=engine.selectQuestions('english',30);assert.ok(english.length<=24&&english.length>0);
 const session={id:'fixed',subject:'physics',mode:'mock',order:qs.map(q=>q.id),outcomes:{[qs[0].id]:true}};
 const record=engine.recordPracticeSession(session,qs);assert.equal(record.result.unanswered,29);assert.equal(record.result.correct,1);
 engine.recordPracticeSession(session,qs);assert.equal(window.userState.mockExams.records.length,1);
});
