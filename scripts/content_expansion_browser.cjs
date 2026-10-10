const assert=require('node:assert/strict'),path=require('node:path');
module.exports=async(page,width,results)=>{
 for(const [subject,key] of [['business','technology'],['math','reverse'],['physics','heat'],['chemistry','chromatography'],['computer_science','filetask'],['english','revision']]){
  const id='course_'+subject+'_'+key;
  const beforeSelf=await page.evaluate(({id,subject})=>getTopicMasteryEvidence(id,subject).selfAssessed,{id,subject});
  await page.locator('#dashboard-nav').click();await page.locator('[data-dashboard-view="map"]').click();await page.locator('[data-map-subject="'+subject+'"]').click();
  await page.locator('#dashboardMapChapter').selectOption('');
  await page.locator('[data-db-learn="'+id+'"]').first().click();assert.match(await page.locator('#topicBody').textContent(),/例题与推理/);
  assert.match(await page.locator('#topicBody').textContent(),/原创教学样例/);
  if(subject==='business')await page.screenshot({path:path.join(results,'business-0264-lesson-'+width+'.png'),fullPage:true});
  // Exercise the real UI with one fixed check, rather than assuming random ordering chooses the new asset.
  await page.evaluate(({id,subject})=>startSessionFromIds([id+'_check'],'normal',{subject,topicId:id}),{id,subject});
  const q=await page.evaluate(id=>{const q=findQuestion(id+'_check');return {type:q.type,answer:q.answer,option:q.options?.indexOf(q.answer)};},id);
  if(q.type==='number'){await page.locator('#numberInput').fill(q.answer);await page.locator('[data-act=number-check]').click();}
  else await page.locator('.opt-btn').nth(q.option).click();
  assert.match(await page.locator('.q-feedback').textContent(),/回答正确/);
  await page.evaluate(({id,subject})=>startSessionFromIds([id+'_task'],'normal',{subject,topicId:id}),{id,subject});
  await page.locator('#essayInput').fill('My response explains the example and checks the assumptions.');await page.locator('[data-act=essay-check]').click();
  assert.match(await page.locator('.q-feedback').textContent(),/非官方评分/);assert.equal(await page.locator('.q-feedback li').count(),3);
  await page.locator('[data-self=no]').click();
  const evidence=await page.evaluate(({id,subject})=>getTopicMasteryEvidence(id,subject),{id,subject});assert.equal(evidence.established,false);assert.equal(evidence.selfAssessed,beforeSelf+1);
  if(subject==='english')assert.equal(evidence.objectiveAttempts,0);
 }
 await page.locator('#dashboard-nav').click();await page.locator('[data-dashboard-view="map"]').click();await page.locator('[data-map-subject="business"]').click();assert.match(await page.locator('#dbSyllabusAudit').textContent(),/0264.*2027-2029/s);
 await page.locator('#dbSyllabusAudit summary').click();assert.equal(await page.locator('#dbSyllabusAudit article').count(),29);
 await page.locator('#dbCurriculum').click();if(!await page.locator('#curriculumCode').isVisible())await page.locator('#examProfileDetails > summary').click();await page.locator('#curriculumCode').selectOption('0450');await page.locator('#curriculumExamYear').fill('2026');await page.getByRole('button',{name:'保存学习安排',exact:true}).click();
 await page.locator('#dashboard-nav').click();assert.equal(await page.evaluate(()=>IGCSE_CURRICULUM.ordered('business').length),6);assert.match(await page.locator('#dbSyllabusAudit').textContent(),/0450.*2026/s);
 assert.ok(await page.evaluate(()=>IGCSE_MOCK_ENGINE.selectQuestions('business',30).every(q=>q.syllabus!=='0264')));
 await page.locator('#dbCurriculum').click();if(!await page.locator('#curriculumCode').isVisible())await page.locator('#examProfileDetails > summary').click();await page.locator('#curriculumCode').selectOption('0264');await page.locator('#curriculumExamYear').fill('2028');await page.getByRole('button',{name:'保存学习安排',exact:true}).click();
 await page.locator('#dashboard-nav').click();assert.equal(await page.evaluate(()=>IGCSE_CURRICULUM.ordered('business').length),29);assert.ok(await page.evaluate(()=>IGCSE_MOCK_ENGINE.selectQuestions('business',30).every(q=>q.syllabus==='0264')));
 assert.equal(await page.evaluate(()=>userState.questionStats.course_business_technology_check.answered),1);
 await page.locator('#dbSyllabusAudit summary').click();assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,'expanded content overflow '+width);
 await page.screenshot({path:path.join(results,'business-0264-dashboard-'+width+'.png'),fullPage:true});
};
