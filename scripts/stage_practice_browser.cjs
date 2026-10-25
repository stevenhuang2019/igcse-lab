const assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs');
module.exports=async(page,width,results)=>{
 const before=await page.evaluate(()=>JSON.stringify(userState));
 for(const [subject,topicId] of [['business','course_business_breakeven'],['math','course_math_bounds'],['physics','course_physics_moments'],['chemistry','course_chemistry_rates'],['computer_science','course_computer_science_trace'],['english','course_english_evidence'],['english','course_english_emailtask']]){
  await page.evaluate(({subject,topicId})=>{setCurrentSubjectSafe(subject);switchPage('page-textbook');openTopic(IGCSE_CATALOG.topic(subject,topicId));},{subject,topicId});
  await page.locator('[data-topic-view=example]').click();assert.equal(await page.locator('.staged-example').count(),3);assert.equal(await page.locator('.staged-example[open]').count(),1);
  await page.locator('.staged-example').last().locator(':scope > summary').click();assert.equal(await page.locator('.staged-example[open]').count(),1);assert.match(await page.locator('.staged-example').last().locator(':scope > p').textContent(),/\n/);
  if(subject==='computer_science'){const trace=page.locator('.staged-example[open] .guided-trace');assert.equal(await trace.locator('tbody tr').count(),1);const evidence=await page.evaluate(()=>JSON.stringify(userState.questionStats));const next=trace.locator('button').first();while(!await next.isDisabled())await next.click();assert.equal(await trace.locator('tbody tr').count(),7);assert.match(await trace.locator('[role=status]').textContent(),/12/);await trace.locator('button').last().click();assert.equal(await trace.locator('tbody tr').count(),1);assert.equal(await page.evaluate(()=>JSON.stringify(userState.questionStats)),evidence);await page.screenshot({path:path.join(results,'algorithm-trace-'+width+'.png'),fullPage:true});}
  if(subject==='english'&&topicId.endsWith('emailtask'))await page.screenshot({path:path.join(results,'email-study-'+width+'.png'),fullPage:true});
  if(subject==='business')await page.screenshot({path:path.join(results,'staged-example-'+width+'.png'),fullPage:true});
  await page.locator('[data-topic-view=practice]').click();assert.equal(await page.locator('[data-practice-level]').count(),3);
  for(const level of ['basic','application','integrated']){
   const expected=await page.evaluate(({subject,topicId,level})=>IGCSE_TOPIC_WORKSPACE.practiceFor(IGCSE_CATALOG.topic(subject,topicId),level).map(q=>q.id).sort(),{subject,topicId,level});
   await page.locator('[data-practice-level='+level+']').click();assert.deepEqual(await page.evaluate(()=>practiceSession.order.slice().sort()),expected);assert.equal(await page.evaluate(()=>practiceSession.subject),subject);assert.ok(await page.locator('.practice-level-label').isVisible());if(subject==='english'&&await page.locator('.question-stimulus').count())assert.ok(await page.locator('.question-stimulus').isVisible());
   await page.locator('#returnStudyTopic').click();assert.equal(await page.locator('[data-topic-view=knowledge]').getAttribute('aria-pressed'),'true');await page.locator('[data-topic-view=practice]').click();
  }
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
 }
 // A writing response survives navigation/reload and self-checking without objective evidence.
 const emailId='course_english_emailtask_stage_6',draft='Hi Sam, I enjoyed welcoming visitors at our repair cafe. Would you like to join me next Saturday?';
 await page.evaluate(emailId=>{setCurrentSubjectSafe('english');startSessionFromIds([emailId],'normal',{subject:'english',topicId:'course_english_emailtask'});},emailId);const evidenceBefore=await page.evaluate(()=>getTopicMasteryEvidence('course_english_emailtask','english').objectiveAttempts);await page.locator('#essayInput').fill(draft);
 await page.reload();await page.evaluate(emailId=>{setCurrentSubjectSafe('english');startSessionFromIds([emailId],'normal',{subject:'english',topicId:'course_english_emailtask'});},emailId);assert.equal(await page.locator('#essayInput').inputValue(),draft);
 const event=page.waitForEvent('download');await page.getByRole('button',{name:'下载本题回答',exact:true}).click();const responseFile=await event;assert.match(responseFile.suggestedFilename(),/igcse-response/);assert.ok(fs.readFileSync(await responseFile.path(),'utf8').includes(draft));
 await page.locator('[data-act=essay-check]').click();assert.match(await page.locator('.ms-block').textContent(),/Hi Sam/);await page.locator('[data-self=ok]').click();assert.equal(await page.evaluate(()=>getTopicMasteryEvidence('course_english_emailtask','english').objectiveAttempts),evidenceBefore);assert.equal(await page.evaluate(emailId=>practiceSession.answers[emailId],emailId),draft);
 // New question-specific hints retain the existing separation of assisted evidence.
 const qid='course_math_bounds_stage_1';await page.evaluate(qid=>{setCurrentSubjectSafe('math');delete userState.questionStats[qid];startSessionFromIds([qid],'normal',{subject:'math',topicId:'course_math_bounds'});},qid);
 await page.locator('[data-hint-button]').click();await page.locator('#numberInput').fill('3.55');await page.locator('[data-act=number-check]').click();assert.equal(await page.evaluate(qid=>userState.questionStats[qid].assistedAnswered,qid),1);assert.equal(await page.evaluate(qid=>userState.hintReviews[qid].status,qid),'pending');
 await page.evaluate(before=>{const original=JSON.parse(before);for(const key of Object.keys(userState))delete userState[key];Object.assign(userState,original);saveUserState(userState);},before);await page.reload();console.log('staged practice '+width);
};
