const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm');
function setup(){
 const window={userState:{learnedTopics:[],topicStats:{},questionStats:{},dailyPlan:{today:{completed:['kept'],tasks:[],pendingTask:{id:'old'}}},mistakes:[]},addEventListener(){},dispatchEvent(){},saveUserState(){},setCurrentSubjectSafe(){}};
 let session=0;const starts=[];window.startSessionFromIds=(ids,mode,opts)=>{starts.push({ids,mode,opts});return 'session-'+(++session);};
 const ctx=vm.createContext({window,console,Date,document:{readyState:'loading',addEventListener(){}},CustomEvent:function(){}});
 for(const f of ['igcse_content.js','igcse_questions.js','igcse_questions_math.js','igcse_questions_physics.js','igcse_questions_chemistry.js','igcse_questions_dt.js','igcse_questions_business.js','igcse_cs_0478.js','igcse_questions_cs.js','igcse_english_esl.js','igcse_questions_english.js','igcse_english_deep.js','igcse_cs_deep.js','physics_0625_course_map.js','igcse_questions_extension.js','igcse_questions_depth.js','igcse_foundation.js','igcse_curriculum_expansion.js','igcse_skill_depth.js','structured_tasks.js','objective_coverage.js','igcse_release_depth.js','igcse_gap_depth.js','igcse_stage_practice.js','learning_catalog.js','syllabus_registry.js','curriculum_expansion_map.js','syllabus_audit.js','curriculum_plan.js','mastery_engine.js','learning_path.js'])vm.runInContext(fs.readFileSync('data/'+f,'utf8'),ctx,{filename:f});
 return {w:window,cp:window.IGCSE_CURRICULUM,path:window.IGCSE_LEARNING_PATH,starts};
}
test('48 distinct staged tasks inherit reviewed editions and all prerequisite references form an acyclic graph',()=>{
 const {w}=setup(),qs=w.IGCSE_SKILL_DEPTH_QUESTIONS;
 assert.equal(qs.length,48);assert.equal(new Set(qs.map(q=>q.question)).size,48);assert.equal(new Set(qs.map(q=>q.id)).size,48);assert.ok(qs.every(q=>q.subject!=='dt'));
 const byId=new Map(w.IGCSE_CATALOG.topics.map(t=>[t.topicId,t]));
 function visit(t,stack=new Set()){assert.ok(!stack.has(t.topicId),'Prerequisite cycle');const next=new Set([...stack,t.topicId]);for(const id of t.prerequisites||[]){assert.ok(byId.has(id),id);visit(byId.get(id),next);}}
 for(const t of w.IGCSE_EXPANSION_CONTENT)visit(t);
 for(const q of qs){const t=byId.get(q.topicId);assert.equal(q.syllabus,t.syllabus);assert.equal(q.syllabusYear,t.syllabusYear);if(q.type==='choice'){assert.equal(new Set(q.options).size,4);assert.ok(q.options.includes(q.answer));}else assert.ok(Number.isFinite(Number(q.answer)));}
 assert.equal(w.IGCSE_CATALOG.questions.length,1322);
});
test('new multi-step calculations use independently checked results and writing preparation remains excluded',()=>{
 const {w}=setup(),q=(id,n)=>w.IGCSE_CATALOG.question('course_'+id+'_depth_'+n);
 assert.equal(Number(q('business_ratios',4).answer),(50000-20000)/25000);assert.equal(Number(q('business_cashflow',1).answer),4000+11000-17000);
 assert.ok(Math.abs(Number(q('math_reverse',2).answer)-99/(1.1*0.9))<1e-10);assert.equal(Number(q('math_bounds',1).answer),12.05/3.95);
 assert.equal(Number(q('physics_halflife',1).answer),(180-20)/4+20);assert.equal(Number(q('chemistry_moles',2).answer),0.2*250/1000);
 for(const q of w.IGCSE_SKILL_DEPTH_QUESTIONS.filter(q=>q.subject==='english')){assert.equal(q.assessmentMode,'preparation');w.userState.questionStats[q.id]={answered:10,correct:10};}
 assert.equal(w.getTopicMasteryEvidence('course_english_revision','english').objectiveAttempts,0);
});
test('diagnostics require fresh session evidence, preserve first responses and resume only unanswered tasks',()=>{
 const {w,path,starts}=setup();assert.equal(path.start('math'),true);const r=path.run('math'),qid=r.qids[0];
 path.record({subject:'math',sessionId:'unrelated',qid,correct:true});assert.equal(path.summary('math').answered,0);
 path.record({subject:'math',sessionId:r.sessionId,qid,correct:false});path.record({subject:'math',sessionId:r.sessionId,qid,correct:true});assert.equal(path.summary('math').correct,0);
 assert.equal(path.start('math',true),true);assert.equal(starts.at(-1).ids.length,7);assert.equal(starts.at(-1).ids.includes(qid),false);
 for(const id of r.qids.slice(1))path.record({subject:'math',sessionId:r.sessionId,qid:id,correct:true});
 assert.equal(path.summary('math').complete,true);assert.equal(path.summary('math').correct,7);assert.equal(path.repairPriority('math',w.IGCSE_CATALOG.question(qid).topicId),-1);
 assert.deepEqual(w.userState.dailyPlan.today.completed,['kept']);assert.equal(w.userState.dailyPlan.today.pendingTask,null);assert.equal(w.userState.dailyPlan.today.tasks,null);
 w.userState.mockExams={activePractice:{}};assert.equal(path.start('math'),false);assert.equal(path.summary('math').correct,7);
});
test('manual diagnostics ignore teaching status while retaining legacy Business edition selection',()=>{
 const {w,cp,path}=setup();cp.setProfile('math',{qualification:'IGCSE',code:'0580',examYear:2027});assert.equal(path.pool('math').length,8);
 cp.setTopic('math','course_math_reverse','current',1);assert.equal(path.pool('math').length,8);assert.equal(path.needs(w.IGCSE_CATALOG.topic('math','course_math_reverse')).length,1);
 path.start('math');cp.setProfile('math',{qualification:'IGCSE',code:'0580',examYear:2028});assert.equal(path.summary('math').invalidated,true);assert.equal(path.pool('math').length,8);
 cp.setProfile('math',{qualification:'AS',code:'9709',examYear:2028,foundation:false});assert.equal(path.pool('math').length,8);
 cp.setProfile('math',{qualification:'AS',code:'9709',examYear:2028,foundation:true});assert.equal(path.pool('math').length,8);
 cp.setProfile('business',{qualification:'IGCSE',code:'0450',examYear:2026});assert.equal(path.pool('business').length,0);
});
