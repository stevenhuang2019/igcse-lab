const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm');
function backup(){const window={userState:{},IGCSE_CATALOG:{subjects:['math','business']},addEventListener(){}};vm.runInNewContext(fs.readFileSync('data/learning_backup.js','utf8'),{window,TextEncoder,document:{readyState:'loading',addEventListener(){}}});return {w:window,api:window.IGCSE_BACKUP};}
const fixture=()=>({learnedTopics:['course_math_reverse'],questionStats:{q:{answered:2,correct:1}},globalStats:{totalAnswered:2,totalCorrect:1},dailyPlan:{today:{completed:['done'],tasks:[{id:'stale'}],pendingTask:{id:'stale'}}},mockExams:{records:[],activePractice:{id:'old'},activeQuestions:[{options:['<img>']}]},materialStudyLinks:[{id:'absent'}],learningPath:{runs:{math:{sessionId:'stale'}}}});
test('restore preserves answer evidence, clears transient sessions and previews without mutating current storage',()=>{
 const {w,api}=backup(),before=JSON.stringify(w.userState),p=api.parse(JSON.stringify(fixture()));
 assert.equal(JSON.stringify(w.userState),before);assert.equal(p.summary.answered,2);assert.equal(p.state.questionStats.q.correct,1);assert.equal(p.state.dailyPlan.today.completed[0],'done');assert.equal(p.state.dailyPlan.today.tasks,null);assert.equal(p.state.mockExams.activeQuestions,undefined);assert.equal(p.state.learningPath,undefined);assert.equal(p.state.materialStudyLinks,undefined);
});
test('restore rejects corrupted shapes, prototype keys and forged display counters',()=>{
 const {api}=backup();assert.throws(()=>api.parse('{}'));assert.throws(()=>api.parse('{"__proto__":{}}'));
 for(const mutate of [s=>s.globalStats.totalAnswered='html',s=>s.questionStats.q.correct=9,s=>s.level='<img>',s=>s.curriculum={yearGroup:99},s=>s.progress={subjects:[]},s=>s.activityByDay={today:{math:{answered:'bad'}}},s=>s.mockExams.records=[{id:'bad',questionIds:[],result:{total:2,correct:1,accuracy:'<img>'}}]]){const s=fixture();mutate(s);assert.throws(()=>api.parse(JSON.stringify(s)));}
 const text=JSON.stringify(fixture()).replace('"learnedTopics"','"constructor":{},"learnedTopics"');assert.throws(()=>api.parse(text));
});
test('restore is blocked during a live exam and failed writes do not replace the previous learner record',()=>{
 const {w,api}=backup(),p=api.parse(JSON.stringify(fixture())),data=new Map([['igcseUserState','original']]);const storage={getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,v),removeItem:k=>data.delete(k)};
 w.userState.mockExams={activePractice:{}};assert.throws(()=>api.apply(p,storage));assert.equal(data.get('igcseUserState'),'original');
 delete w.userState.mockExams.activePractice;assert.throws(()=>api.apply(p,{...storage,setItem(){throw Error('quota');}}));assert.equal(data.get('igcseUserState'),'original');
 api.apply(p,storage);assert.equal(data.get('igcseRecoverySnapshot'),'original');assert.equal(JSON.parse(data.get('igcseUserState')).questionStats.q.correct,1);
});
test('mock scoring separates objective checks from saved open answers and preparation, including numeric tolerance',()=>{
 const window={userState:{}};vm.runInNewContext(fs.readFileSync('data/mock_exam_engine.js','utf8'),{window});
 const qs=[{id:'n',type:'number',answer:'1.333333333',tolerance:0.00001,topicId:'numeric'},{id:'open',type:'essay',answer:'reference',topicId:'essay'},{id:'prep',type:'choice',options:['A','B'],answer:'A',assessmentMode:'preparation',topicId:'prep'},{id:'miss',type:'choice',options:['A','B'],answer:'B',topicId:'other'}];
 const r=window.IGCSE_MOCK_ENGINE.score({answers:{n:'1.333333',open:'my original response',prep:0},outcomes:{open:true,prep:true}},qs);
 assert.equal(r.correct,1);assert.equal(r.objectiveTotal,2);assert.equal(r.accuracy,50);assert.equal(r.openAnswered,1);assert.equal(r.preparationAnswered,1);assert.equal(r.unanswered,1);assert.equal(r.byTopic.essay,undefined);assert.equal(r.byTopic.prep,undefined);
 const only=window.IGCSE_MOCK_ENGINE.score({answers:{open:'written'}},[qs[1],qs[2]]);assert.equal(only.accuracy,null);assert.equal(only.correct,0);
});

test('six subjects have 12 original structured tasks with source editions and explicit unscored criteria',()=>{
 const window={};for(const f of ['igcse_curriculum_expansion.js','structured_tasks.js'])vm.runInNewContext(fs.readFileSync('data/'+f,'utf8'),{window});
 const qs=window.IGCSE_STRUCTURED_TASKS;assert.equal(qs.length,12);assert.equal(new Set(qs.map(q=>q.question)).size,12);assert.equal(new Set(qs.map(q=>q.subject)).size,6);assert.ok(qs.every(q=>q.type==='essay'&&q.marks===0&&q.rubric.length===3&&q.syllabusYear&&q.subject!=='dt'));
});
