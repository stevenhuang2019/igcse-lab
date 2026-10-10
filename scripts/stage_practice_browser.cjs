const assert=require('node:assert/strict'),path=require('node:path');
module.exports=async(page,width,results)=>{
 const before=await page.evaluate(()=>JSON.stringify(userState));
 for(const [subject,topicId] of [['business','course_business_breakeven'],['math','course_math_bounds'],['physics','course_physics_moments'],['chemistry','course_chemistry_rates']]){
  await page.evaluate(({subject,topicId})=>{setCurrentSubjectSafe(subject);switchPage('page-textbook');openTopic(IGCSE_CATALOG.topic(subject,topicId));},{subject,topicId});
  await page.locator('[data-topic-view=example]').click();assert.equal(await page.locator('.staged-example').count(),3);assert.equal(await page.locator('.staged-example[open]').count(),1);
  await page.locator('.staged-example').last().locator(':scope > summary').click();assert.equal(await page.locator('.staged-example[open]').count(),1);assert.match(await page.locator('.staged-example').last().locator(':scope > p').textContent(),/\n/);
  if(subject==='business')await page.screenshot({path:path.join(results,'staged-example-'+width+'.png'),fullPage:true});
  await page.locator('[data-topic-view=practice]').click();assert.equal(await page.locator('[data-practice-level]').count(),3);
  for(const level of ['basic','application','integrated']){
   const expected=await page.evaluate(({subject,topicId,level})=>IGCSE_TOPIC_WORKSPACE.practiceFor(IGCSE_CATALOG.topic(subject,topicId),level).map(q=>q.id).sort(),{subject,topicId,level});
   await page.locator('[data-practice-level='+level+']').click();assert.deepEqual(await page.evaluate(()=>practiceSession.order.slice().sort()),expected);assert.equal(await page.evaluate(()=>practiceSession.subject),subject);assert.ok(await page.locator('.practice-level-label').isVisible());
   await page.locator('#returnStudyTopic').click();assert.equal(await page.locator('[data-topic-view=knowledge]').getAttribute('aria-pressed'),'true');await page.locator('[data-topic-view=practice]').click();
  }
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
 }
 // New question-specific hints retain the existing separation of assisted evidence.
 const qid='course_math_bounds_stage_1';await page.evaluate(qid=>{setCurrentSubjectSafe('math');delete userState.questionStats[qid];startSessionFromIds([qid],'normal',{subject:'math',topicId:'course_math_bounds'});},qid);
 await page.locator('[data-hint-button]').click();await page.locator('#numberInput').fill('3.55');await page.locator('[data-act=number-check]').click();assert.equal(await page.evaluate(qid=>userState.questionStats[qid].assistedAnswered,qid),1);assert.equal(await page.evaluate(qid=>userState.hintReviews[qid].status,qid),'pending');
 await page.evaluate(before=>{const original=JSON.parse(before);for(const key of Object.keys(userState))delete userState[key];Object.assign(userState,original);saveUserState(userState);},before);await page.reload();console.log('staged practice '+width);
};
