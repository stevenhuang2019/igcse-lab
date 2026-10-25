const assert=require('node:assert/strict'),path=require('node:path');
module.exports=async(page,width,results)=>{
 await page.evaluate(()=>{IGCSE_CURRICULUM.setProfile('math',{qualification:'IGCSE',code:'0580',examYear:2027});IGCSE_CURRICULUM.setTopic('math','course_math_fractions','current',1);IGCSE_CURRICULUM.setTopic('math','course_math_reverse','current',2);});
 await page.locator('#dashboard-nav').click();await page.locator('[data-dashboard-view="map"]').click();await page.locator('[data-map-subject="math"]').click();await page.locator('#dbPath').click();
 assert.equal(await page.locator('[data-path-topic]').count(),15);await page.locator('#page-path [data-browse-chapter]').selectOption('');assert.match(await page.locator('[data-path-topic="course_math_reverse"]').textContent(),/建议先补/);
 await page.locator('[data-path-topic="course_math_reverse"] [data-path-learn="course_math_fractions"]').click();assert.match(await page.locator('#topicTitle').textContent(),/分数/);
 await page.locator('#path-nav').click();await page.locator('#pathStart').click();
 const first=await page.evaluate(()=>practiceSession.order[0]);assert.equal(await page.evaluate(()=>practiceSession.order.length),8);
 await page.locator('#numberInput').fill('99');await page.locator('[data-act=number-check]').click();
 await page.locator('#path-nav').click();assert.match(await page.locator('#pathResult').textContent(),/已答 1\/8，正确 0/);
 await page.reload();await page.locator('#path-nav').click();assert.match(await page.locator('#pathResult').textContent(),/已答 1\/8/);await page.locator('#pathResume').click();
 assert.equal(await page.evaluate(()=>practiceSession.order.includes(IGCSE_LEARNING_PATH.run('math').qids[0])),false);
 for(let i=0;i<7;i++){
  const answer=await page.evaluate(()=>findQuestion(practiceSession.order[practiceSession.idx]).answer);await page.locator('#numberInput').fill(answer);await page.locator('[data-act=number-check]').click();
  if(i<6)await page.locator('[data-act=next-q]').click();
 }
 await page.locator('#path-nav').click();assert.match(await page.locator('#pathResult').textContent(),/已答 8\/8，正确 7.*完成/);
 assert.equal(await page.evaluate(()=>IGCSE_LEARNING_PATH.repairPriority('math','course_math_fractions')),-1);
 // Ordinary practice of the same item must not change this diagnostic's first response.
 await page.evaluate(id=>startSessionFromIds([id],'normal',{subject:'math'}),first);const answer=await page.evaluate(id=>findQuestion(id).answer,first);await page.locator('#numberInput').fill(answer);await page.locator('[data-act=number-check]').click();
 await page.locator('#path-nav').click();assert.match(await page.locator('#pathResult').textContent(),/正确 7/);
 await page.screenshot({path:path.join(results,'learning-path-'+width+'.png'),fullPage:true});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,'path overflow '+width);
 await page.evaluate(()=>IGCSE_CURRICULUM.setProfile('math',{qualification:'IGCSE',code:'0580',examYear:2028}));await page.locator('#path-nav').click();assert.match(await page.locator('#pathResult').textContent(),/档案已改变/);assert.equal(await page.locator('#pathStart').isDisabled(),false);
 // Manual foundation diagnostics remain available, and a live mock cannot be replaced by a diagnostic.
 await page.evaluate(()=>IGCSE_CURRICULUM.setProfile('math',{qualification:'AS',code:'9709',examYear:2028}));assert.equal(await page.evaluate(()=>IGCSE_LEARNING_PATH.pool('math').length),8);
 await page.evaluate(()=>IGCSE_CURRICULUM.setProfile('math',{qualification:'AS',code:'9709',examYear:2028,foundation:true}));assert.equal(await page.evaluate(()=>IGCSE_LEARNING_PATH.pool('math').length),8);
 await page.evaluate(()=>{const ids=IGCSE_MOCK_ENGINE.selectQuestions('math',3).map(q=>q.id);startSessionFromIds(ids,'mock',{subject:'math',timeLimitSec:1800});});const mockId=await page.evaluate(()=>userState.mockExams.activePractice.id);
 assert.equal(await page.evaluate(()=>IGCSE_LEARNING_PATH.start('math')),false);assert.equal(await page.evaluate(()=>userState.mockExams.activePractice.id),mockId);
 await page.locator('#mockSubmitEarly').click();
 await page.evaluate(()=>{IGCSE_CURRICULUM.setProfile('english',{qualification:'IGCSE',code:'0510',examYear:2028});IGCSE_CURRICULUM.setTopic('english','course_english_revision','current',1);});
 await page.locator('#dashboard-nav').click();await page.locator('[data-dashboard-view="map"]').click();await page.locator('[data-map-subject="english"]').click();await page.locator('#dbPath').click();assert.match(await page.locator('#pathDiagnostic').textContent(),/准备性/);await page.locator('#pathStart').click();
 for(let i=0;i<6;i++){const option=await page.evaluate(()=>{const q=findQuestion(practiceSession.order[practiceSession.idx]);return q.options.indexOf(q.answer);});await page.locator('.opt-btn').nth(option).click();if(i<5)await page.locator('[data-act=next-q]').click();}
 await page.locator('#path-nav').click();assert.match(await page.locator('#pathResult').textContent(),/已答 6\/6，正确 6/);assert.equal(await page.evaluate(()=>getTopicMasteryEvidence('course_english_revision','english').objectiveAttempts),0);
 // Deepened lesson prose is visible in the learner's course, not just metadata.
 await page.locator('#dashboard-nav').click();await page.locator('[data-dashboard-view="map"]').click();await page.locator('[data-map-subject="business"]').click();await page.locator('#dashboardMapChapter').selectOption('');await page.locator('[data-db-learn="course_business_ratios"]').first().click();assert.match(await page.locator('#topicBody').textContent(),/ROCE.*速动比率/s);
};
