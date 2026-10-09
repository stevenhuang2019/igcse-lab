const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.join(__dirname,'..');
function load(){
 const window={},listeners={};window.addEventListener=(event,fn)=>{(listeners[event]||=[]).push(fn);};
 const document={readyState:'loading',addEventListener(){}};
 const ctx=vm.createContext({window,document,console,Date,CustomEvent:function(type,{detail}){this.type=type;this.detail=detail;}});
 const run=f=>{vm.runInContext(fs.readFileSync(path.join(root,'data',f),'utf8'),ctx,{filename:f});if(f==='syllabus_registry.js')run('curriculum_expansion_map.js');};
 for(const f of ['igcse_content.js','igcse_questions.js','igcse_questions_math.js','igcse_questions_physics.js','igcse_questions_chemistry.js','igcse_questions_dt.js','igcse_questions_business.js','igcse_cs_0478.js','igcse_questions_cs.js','igcse_english_esl.js','igcse_questions_english.js','igcse_english_deep.js','igcse_cs_deep.js','physics_0625_course_map.js','igcse_questions_extension.js','igcse_questions_depth.js','igcse_foundation.js','igcse_curriculum_expansion.js','igcse_skill_depth.js','structured_tasks.js','objective_coverage.js','learning_catalog.js'])run(f);
 window.userState={topicStats:{},questionStats:{},learnedTopics:[],dailyPlan:{},mistakes:[]};window.saveUserState=()=>{};
 return {window,run,listeners};
}
test('all seven subjects have valid uniquely identified questions mapped to real topics',()=>{
 const {window}=load(),catalog=window.IGCSE_CATALOG,audit=catalog.audit();
 assert.equal(catalog.subjects.length,7);assert.ok(catalog.questions.length>=1038);
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
 assert.equal(map.business.syllabusYear,'2027-2029');assert.match(map.business.note,/0264/);
});
test('dashboard counts individual question evidence and averages over unstarted topics',()=>{
 const {window,run,listeners}=load();window.questionData=window.IGCSE_CATALOG.questions;
 window.calculateMasteryV2=(id)=>id==='math_algebra_01'?60:0;
 run('learning_progress.js');run('learning_dashboard.js');
 const answer={detail:{qid:'math_q001',subject:'math',topicId:'math_algebra_01',correct:true}};
 listeners['igcse-answer-recorded'].forEach(fn=>fn(answer));
 let summary=window.IGCSE_DASHBOARD.summary('math');assert.equal(summary.practiced,1);assert.equal(summary.mastery,4);assert.equal(summary.accuracy,100);
 answer.detail.correct=false;listeners['igcse-answer-recorded'].forEach(fn=>fn(answer));
 summary=window.IGCSE_DASHBOARD.summary('math');assert.equal(summary.practiced,1);assert.equal(summary.accuracy,50);
 assert.equal(window.IGCSE_DASHBOARD.localDate(new Date(2026,9,9,0,5)),'2026-10-09');
 const day=window.IGCSE_DASHBOARD.day();assert.equal(day.tasks.length,5);assert.equal(new Set(day.tasks.map(t=>t.id)).size,5);
});
test('mock sampling spans topics, caps to available choices, and scoring records unanswered items',()=>{
 const {window,run}=load();window.questionData=window.IGCSE_CATALOG.questions;run('mock_exam_engine.js');
 const engine=window.IGCSE_MOCK_ENGINE,qs=engine.selectQuestions('physics',30);
 assert.equal(qs.length,30);assert.equal(new Set(qs.map(q=>q.id)).size,30);assert.ok(new Set(qs.map(q=>q.topicId)).size>=25);
 const english=engine.selectQuestions('english',30);assert.ok(english.length===30);
 const session={id:'fixed',subject:'physics',mode:'mock',order:qs.map(q=>q.id),outcomes:{[qs[0].id]:true}};
 const record=engine.recordPracticeSession(session,qs);assert.equal(record.result.unanswered,29);assert.equal(record.result.correct,1);
 engine.recordPracticeSession(session,qs);assert.equal(window.userState.mockExams.records.length,1);
});

test('source-linked audit distinguishes samples, preparation and gaps without crediting wrong editions',()=>{
 const {window,run}=load();run('syllabus_registry.js');run('syllabus_audit.js');
 const audit=window.getIGCSESyllabusAudit;
 for(const subject of window.IGCSE_CATALOG.subjects){
  const a=audit(subject);assert.ok(a.sections.length>0,subject);assert.match(a.sourceUrl,/^https:\/\/www.cambridgeinternational.org\/Images\//);
  for(const section of a.sections)for(const id of section.topicIds)assert.ok(window.IGCSE_CATALOG.topic(subject,id),id);
 }
 assert.equal(audit('unknown'),null);
 assert.equal(audit('math').sections.find(s=>s.ref==='7').status,'sample-practice');
 const cs=audit('computer_science');assert.equal(cs.sectionCount,24);assert.equal(cs.invalidReferences.length,0);
 assert.equal(cs.sections.find(s=>s.ref==='8.3').status,'sample-practice');
 assert.equal(cs.sampled,24);assert.equal(cs.sections.find(s=>s.ref==='5.2').questionIds.length,4);
 const phy=audit('physics');assert.equal(phy.invalidReferences.length,0);assert.ok(!phy.sections.some(s=>s.ref==='4.6'));
 assert.equal(phy.sections.find(s=>s.ref==='4.5.6').questionIds.length,4);
 assert.match(window.IGCSE_CATALOG.topic('physics','phy0625_4_6').title,/^4.5 /);
 const en=audit('english');assert.equal(en.sectionCount,16);
 assert.equal(en.sections.find(s=>s.ref==='L1').status,'preparation-only');
 assert.equal(en.sections.find(s=>s.ref==='S4').practiceCount,0);
 assert.equal(en.sections.find(s=>s.ref==='W3').status,'preparation-only');
 const q=window.IGCSE_CATALOG.questions.find(q=>q.id==='depth_cs_001');
 const before=cs.sections.find(s=>s.ref==='1.1').practiceCount;q.syllabusYear='2029-2031';
 assert.equal(audit('computer_science').sections.find(s=>s.ref==='1.1').practiceCount,before-1);
 assert.ok(audit('computer_science').invalidReferences.includes(q.id));
});
test('authored depth has meaningful unique prompts and balanced answer positions',()=>{
 const {window}=load(),qs=window.IGCSE_DEPTH_QUESTIONS;
 assert.equal(qs.length,134);assert.equal(new Set(qs.map(q=>q.question.trim().toLowerCase())).size,134);
 for(const subject of ['computer_science','english']){
  const added=qs.filter(q=>q.subject===subject),counts=[0,0,0,0];
  for(const q of added){assert.equal(q.source,'original');assert.equal(q.pastPaper,false);assert.ok(q.syllabusRef);counts[q.options.indexOf(q.answer)]++;}
  assert.ok(Math.max(...counts)-Math.min(...counts)<=1);
 }
 assert.equal(window.IGCSE_CATALOG.questions.filter(q=>q.subject==='computer_science').length,134);
 assert.equal(window.IGCSE_CATALOG.questions.filter(q=>q.subject==='english').length,86);
});

test('section progress counts unique answered samples separately from preparation',()=>{
 const {window,run}=load();run('syllabus_registry.js');run('syllabus_audit.js');
 const audit=window.getIGCSESyllabusAudit;
 window.userState.questionStats.gap_cs_005={answered:5,correct:3};
 const files=audit('computer_science').sections.find(s=>s.ref==='8.3');
 assert.equal(files.attemptedCount,1);assert.equal(files.practiceCount,10);
 window.userState.questionStats.depth_en_022={answered:1,correct:1};
 const listening=audit('english').sections.find(s=>s.ref==='L1');
 assert.equal(listening.preparationAttemptedCount,1);assert.equal(listening.attemptedCount,0);
 assert.equal(audit('physics').sampled,29);
 for(const subject of ['computer_science','physics'])assert.equal(audit(subject).invalidReferences.length,0);
});

test('foundation chapters have edition-linked samples and new lessons retain all legacy topics',()=>{
 const {window:w,run}=load();run('syllabus_registry.js');run('syllabus_audit.js');
 assert.equal(w.IGCSE_FOUNDATION_CONTENT.length,9);assert.equal(w.IGCSE_FOUNDATION_QUESTIONS.length,42);
 assert.equal(w.IGCSE_CATALOG.topics.length,152);assert.equal(w.IGCSE_CATALOG.questions.length,1232);
 assert.equal(new Set(w.IGCSE_FOUNDATION_QUESTIONS.map(q=>q.question)).size,42);
 for(const [subject,n] of [['math',9],['chemistry',12]]){
  const a=w.getIGCSESyllabusAudit(subject);assert.equal(a.sampled,n);
  for(const section of a.sections){const added=w.IGCSE_FOUNDATION_QUESTIONS.filter(q=>q.subject===subject&&q.syllabusRef===section.ref);assert.equal(added.length,2);for(const q of added){assert.equal(q.source,'original');assert.equal(q.alignmentLevel,'chapter-sample');assert.equal(q.pastPaper,false);}}
 }
 assert.ok(w.IGCSE_CATALOG.topic('math','math_algebra_01'));assert.ok(w.IGCSE_CATALOG.topic('chemistry','chem_bonding_01'));
});
