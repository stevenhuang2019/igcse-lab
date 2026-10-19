const assert=require('node:assert/strict'),path=require('node:path');
module.exports=async(page,width,results)=>{
 page.setDefaultTimeout(15000);console.log('workspace',width,'dashboard');
 await page.locator('#dashboard-nav').click();
 assert.ok(await page.locator('#continueLearning').isVisible());
 assert.ok(await page.locator('#continueLearning').evaluate(e=>e.getBoundingClientRect().top<innerHeight),'continue action in first viewport');
 assert.ok(await page.locator('.ws-donut').getAttribute('aria-label'));
 assert.ok(await page.locator('.db-tasks > [data-task]').count()<=3);
 await page.locator('[data-dashboard-view="overview"]').click();await page.locator('[data-db-subject="physics"]').click();
 assert.equal(await page.locator('#page-textbook.active').count(),1,'subject overview opens learning');
 assert.equal(await page.locator('#subjectSelect').inputValue(),'physics');
 const count=await page.locator('[data-topic-id]').count();assert.ok(count>0);
 const chapter=await page.locator('#learningChapter option').nth(1).getAttribute('value');await page.locator('#learningChapter').selectOption(chapter);
 assert.ok(await page.locator('[data-topic-id]').count()<=count);
 const topic=await page.locator('[data-topic-id]').first().getAttribute('data-topic-id');await page.locator('[data-topic-id]').first().click();
 assert.equal(await page.locator('#topicList').isVisible(),false);
 assert.ok(await page.locator('#topicContent').isVisible());
 const xp=await page.evaluate(()=>userState.xp);await page.locator('#backTopicList').click();assert.equal(await page.locator('#learningChapter').inputValue(),chapter);await page.locator('[data-topic-id="'+topic+'"]').click();assert.equal(await page.evaluate(()=>userState.xp),xp,'rereading does not award XP');
 await page.locator('#startPracticeBtn').click();assert.ok(await page.evaluate(id=>practiceSession.order.every(q=>findQuestion(q).topicId===id),topic));
 await page.locator('[data-practice-tab="assessment"]').click();assert.ok(await page.locator('#assessmentArea').isVisible());
 await page.locator('[data-practice-tab="chapters"]').click();assert.equal(await page.locator('#assessmentArea').isVisible(),false);
 await page.locator('#practiceChapter').selectOption(await page.locator('#practiceChapter option').nth(1).getAttribute('value'));assert.equal(await page.locator('#practiceChapterRows details').count(),1);
 console.log('workspace',width,'quickref'); await page.locator('[data-page="page-quickref"]').click();assert.equal(await page.locator('#quickrefContent [data-ws-subject]').count(),7);
 await page.locator('#quickrefContent [data-ws-subject="physics"]').click();await page.locator('#quickrefSearch').fill('not_a_formula_123');assert.match(await page.locator('#quickrefResults').textContent(),/0 条要点/);await page.locator('#quickrefSearch').fill('');
 console.log('workspace',width,'vocab'); await page.locator('[data-page="page-vocab"]').click();assert.equal(await page.locator('#vocabBrowse [data-ws-subject]').count(),8);
 const subjectBefore=await page.locator('#subjectSelect').inputValue();await page.locator('#vocabBrowse [data-ws-subject="math"]').click();assert.equal(await page.locator('#subjectSelect').inputValue(),subjectBefore);
 const term=await page.evaluate(()=>SUBJECT_VOCAB.find(v=>v.subject==='math').en);await page.locator('#vocabSearch').fill(term);assert.ok(await page.locator('#vocabResults .ws-word').count()>0);await page.locator('#vocabSearch').fill('');await page.locator('#vocabBrowse [data-ws-subject="all"]').click();
 await page.locator('#vocabGameEn2Zh').click();assert.equal(await page.evaluate(()=>vocabGame.limit),10);assert.ok(await page.evaluate(()=>new Set(vocabGame.pool.slice(0,10).map(v=>v.subject)).size>1),'mixed game includes multiple subjects');
 for(let i=0;i<10;i++){const correct=await page.evaluate(()=>vocabGame._opts.indexOf(vocabGame._answer));await page.locator('[data-vopt="'+correct+'"]').click();await page.locator('#vocabGameArea button').filter({hasText:/下一|查看本局结果/}).click();}
 assert.match(await page.locator('#vocabGameArea').textContent(),/本局结束.*10 \/ 10/);
 console.log('workspace',width,'growth'); await page.locator('[data-page="page-profile"]').click();await page.locator('[data-growth-tab="badges"]').click();assert.equal(await page.locator('.ws-badge').count(),await page.evaluate(()=>BADGES.length));await page.locator('[data-growth-tab="assessments"]').click();assert.ok(await page.locator('.ws-assess-levels').isVisible());await page.locator('[data-growth-tab="subjects"]').click();assert.equal(await page.locator('.ws-trend li').count(),7);
 console.log('workspace',width,'motion'); await page.locator('#motion-lab-nav').click();if(!(await page.locator('.mv-route').evaluate(e=>e.open)))await page.locator('#mvCurrentObjective').click();await page.locator('#mvTree [data-k="M6"]').click();
 assert.match(await page.locator('#mvCurrentObjective').textContent(),/Acceleration/);
 await page.locator('#mvLearnDone').click();const motionXP=await page.evaluate(()=>IGCSE_MOTION_STATE.xp),mastery=await page.evaluate(()=>JSON.stringify(IGCSE_MOTION_STATE.mastery));await page.locator('#mvLearnDone').click();assert.equal(await page.evaluate(()=>IGCSE_MOTION_STATE.xp),motionXP);assert.equal(await page.evaluate(()=>JSON.stringify(IGCSE_MOTION_STATE.mastery)),mastery);
 await page.locator('[data-tab="practice"]').click();const attempts=await page.evaluate(()=>IGCSE_MOTION_STATE.stats.attempts);await page.locator('#mvSubmit').click();assert.equal(await page.evaluate(()=>IGCSE_MOTION_STATE.stats.attempts),attempts,'empty input creates no evidence');await page.locator('#mvNum').fill('3');await page.locator('#mvSubmit').click();assert.equal(await page.evaluate(()=>IGCSE_MOTION_STATE.stats.attempts),attempts+1);assert.equal(await page.locator('#mvSubmit').isDisabled(),true);
 await page.locator('#toast').waitFor({state:'hidden'});
 for(const [id,file] of [['page-dashboard','visual-dashboard'],['page-textbook','learning-center'],['page-practice','practice-hub'],['page-quickref','quickref'],['page-vocab','vocabulary'],['page-profile','growth'],['motion-lab-page','motion-workspace']]){
  await page.locator('#mainNav [data-page="'+id+'"]').click();if(id==='page-dashboard')await page.locator('[data-dashboard-view="today"]').click();assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,'workspace overflow '+id+' '+width);await page.screenshot({path:path.join(results,file+'-'+width+'.png'),fullPage:true,animations:'disabled'});
 }
 // Browser history and old bookmarks resolve to the consolidated destinations.
 await page.goto(page.url().split('#')[0]+'#page-home');assert.equal(await page.locator('#page-textbook.active').count(),1);await page.goto(page.url().split('#')[0]+'#page-assessment');assert.ok(await page.locator('#assessmentArea').isVisible());assert.match(page.url(),/#page-practice$/);
 await page.evaluate(()=>{localStorage.clear();});await page.reload();await page.locator('#dashboard-nav').click();page.setDefaultTimeout(30000);
};
