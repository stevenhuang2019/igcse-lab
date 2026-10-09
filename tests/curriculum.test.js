const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm');
function setup(){
 const topics=[{subject:'math',topicId:'a'},{subject:'math',topicId:'b'},{subject:'business',topicId:'c'}];
 const window={userState:{learnedTopics:['a'],topicStats:{a:{answered:9}},dailyPlan:{today:{tasks:[{id:'old'}],completed:['done'],pendingTask:{id:'old'}}}},saveUserState(){},dispatchEvent(){}};
 window.IGCSE_CATALOG={subjects:['math','business'],topics,topicsFor:s=>topics.filter(t=>t.subject===s),topic:(s,id)=>topics.find(t=>t.subject===s&&t.topicId===id)};
 window.IGCSE_SYLLABUS_REGISTRY={math:{code:'0580',year:'2025-2027'},business:{code:'0450',year:'2026'}};
 const ctx=vm.createContext({window,document:{readyState:'loading',addEventListener(){}},CustomEvent:function(){}});vm.runInContext(fs.readFileSync('data/curriculum_plan.js','utf8'),ctx);
 return {window,cp:window.IGCSE_CURRICULUM};
}
test('school pacing never infers taught status or mastery from reading; plans invalidate without erasing evidence',()=>{
 const {window:w,cp}=setup();assert.equal(cp.eligible('math','a'),true);
 cp.setProfile('math',{examYear:2027,code:'0580',qualification:'IGCSE'});
 assert.equal(cp.status('math','a'),'unstarted');assert.equal(cp.eligible('math','a'),false);
 cp.setTopic('math','b','current',1);cp.setTopic('math','a','taught',2);
 assert.equal(cp.ordered('math')[0].topicId,'b');assert.equal(cp.priority('math','b'),0);
 assert.equal(cp.practiceTopics('math','taught').length,2);
 assert.equal(w.userState.topicStats.a.answered,9);assert.equal(w.userState.dailyPlan.today.tasks,null);
 assert.deepEqual(w.userState.dailyPlan.today.completed,['done']);
});
test('exam editions and advanced stages require explicit foundation opt in and preserve school pacing',()=>{
 const {cp}=setup();cp.setProfile('business',{examYear:2027,code:'0264',qualification:'IGCSE'});cp.setTopic('business','c','current',1);
 assert.equal(cp.edition('business').matches,false);assert.equal(cp.eligible('business','c'),false);
 cp.setProfile('business',{examYear:2027,code:'0264',qualification:'IGCSE',foundation:true});assert.equal(cp.eligible('business','c'),true);
 cp.state().yearGroup=12;assert.equal(cp.eligible('math','a'),false);
 cp.setProfile('math',{examYear:2028,qualification:'AS',code:'9709'});cp.setTopic('math','a','current',1);
 assert.equal(cp.practiceTopics('math','all').length,0);assert.equal(cp.eligible('math','a'),false);
 cp.setProfile('math',{examYear:2028,qualification:'AS',code:'9709',foundation:true});assert.equal(cp.practiceTopics('math','taught').length,1);assert.equal(cp.practiceTopics('math','all').length,2);
 assert.equal(cp.eligible('math','b'),false);
});
test('profile and school data reject invalid references, ranks and examination years',()=>{
 const {cp}=setup();assert.throws(()=>cp.setProfile('math',{examYear:2027,code:'0264',qualification:'IGCSE'}));
 assert.throws(()=>cp.setProfile('math',{examYear:0,code:'0580',qualification:'IGCSE'}));
 cp.setProfile('math',{examYear:2027,code:'0580',qualification:'IGCSE'});
 assert.throws(()=>cp.setTopic('math','unknown','current',1));assert.throws(()=>cp.setTopic('math','a','fake',1));assert.throws(()=>cp.setTopic('math','a','current',-1));
});
