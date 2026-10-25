const {test}=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs'),path=require('node:path');
function setup(){
 const listeners={},qs=Array.from({length:8},(_,i)=>({id:'q'+i,type:'choice'})).concat([{id:'essay',type:'essay'},{id:'prep',type:'choice',assessmentMode:'preparation'}]);
 const window={userState:{topicStats:{},questionStats:{}},IGCSE_CATALOG:{questionsFor:()=>qs},saveUserState(){},addEventListener:(e,f)=>{(listeners[e]||=[]).push(f);},dispatchEvent(){}};
 const context=vm.createContext({window,Date,CustomEvent:function(){}});
 const run=f=>vm.runInContext(fs.readFileSync(path.join(__dirname,'../data',f),'utf8'),context);run('mastery_engine.js');
 return {window,stats:window.getTopicMasteryStats('t','math'),run,emit:d=>(listeners['igcse-answer-recorded']||[]).forEach(f=>f({detail:d}))};
}
test('mastery excludes fabricated legacy defaults and normalises observed dimensions',()=>{
 const {window:w,stats:s}=setup();s.answered=10;s.correct=8;s.recentResults=[true,true,false,true,true];s.srsRetention=80;s.pastPaperAccuracy=0;
 const e=w.getTopicMasteryEvidence('t','math');assert.equal(e.score,80);assert.equal(e.knownWeight,50);
 assert.equal(e.dimensions.find(d=>d.id==='srs').score,null);assert.equal(e.dimensions.find(d=>d.id==='pastPaper').score,null);
 s.initialAssessment=50;s.srsReviews=2;s.srsRetention=60;s.pastPaperAttempts=1;s.pastPaperAccuracy=100;
 assert.equal(w.calculateMasteryV2('t','math'),76);assert.equal(w.getTopicMasteryEvidence('t','math').knownWeight,100);
});
test('high scores require objective sample evidence and cannot be established through preparation or self assessment',()=>{
 const {window:w,stats:s}=setup();s.answered=20;s.correct=20;s.recentResults=[true];
 w.userState.questionStats.essay={answered:10};w.userState.questionStats.prep={answered:10};
 let e=w.getTopicMasteryEvidence('t','math');assert.equal(e.score,100);assert.equal(e.established,false);assert.equal(e.selfAssessed,10);assert.equal(e.preparation,10);
 w.userState.questionStats.q0={answered:20};assert.equal(w.getTopicMasteryEvidence('t','math').established,false);
 for(let i=1;i<5;i++)w.userState.questionStats['q'+i]={answered:1};
 e=w.getTopicMasteryEvidence('t','math');assert.equal(e.established,true);assert.equal(e.objectiveUnique,5);
});
test('assessment and official/review dimensions become observed only through their actual events',()=>{
 const {window:w,stats:s}=setup();assert.equal(w.calculateMasteryV2('t','math'),0);
 w.recordMasteryEvent('t',true,{subject:'math',initialAssessment:true,assessmentScore:60});
 assert.equal(s.initialAssessment,60);assert.equal(w.calculateMasteryV2('t','math'),60);assert.equal(s.recentResults,undefined);
 w.recordMasteryEvent('t',true,{subject:'math',pastPaper:true,pastPaperType:'mock'});assert.equal(s.pastPaperAttempts,undefined);
 w.recordMasteryEvent('t',false,{subject:'math',pastPaper:true,pastPaperType:'official'});assert.equal(s.pastPaperAttempts,1);assert.equal(s.pastPaperAccuracy,0);
 w.recordMasteryEvent('t',true,{subject:'math',srs:true});assert.equal(s.srsRetention,100);assert.equal(s.srsReviews,1);
 w.recordMasteryEvent('t',false,{subject:'math',srs:true});assert.equal(s.srsRetention,60);
});

test('ordinary practice scheduling cannot overwrite measured SRS retention',()=>{
 const {window:w,stats:s,run,emit}=setup();run('srs_engine.js');
 s.answered=2;s.correct=1;s.srsReviews=2;s.srsRetention=60;
 emit({qid:'q0',topicId:'t',subject:'math',correct:true,srs:false});
 assert.equal(s.srsRetention,60);assert.equal(s.srsReviews,2);
 assert.ok(w.IGCSE_SRS.getCard('t','math','q0').lastReviewedAt);
});

test('hint-assisted success never establishes independent mastery or inflates SRS retention',()=>{
 const {window:w,stats:s,run,emit}=setup();run('srs_engine.js');s.answered=5;s.correct=5;s.recentResults=[true];
 for(let i=0;i<5;i++)w.userState.questionStats['q'+i]={answered:1,correct:1,assistedAnswered:1,assistedCorrect:1};
 const evidence=w.getTopicMasteryEvidence('t','math');assert.equal(evidence.objectiveAttempts,0);assert.equal(evidence.assisted,5);assert.equal(evidence.established,false);
 s.srsReviews=2;s.srsRetention=60;const card=w.IGCSE_SRS.getCard('t','math','q0');card.reviews=3;card.correct=2;card.interval=20;
 emit({qid:'q0',topicId:'t',subject:'math',correct:true,assisted:true,srs:true});
 assert.equal(s.srsRetention,60);assert.equal(s.srsReviews,2);assert.equal(card.correct,2);assert.equal(card.reviews,3);assert.equal(card.assistedReviews,1);assert.ok(new Date(card.dueAt)-Date.now()<86401000);
});
