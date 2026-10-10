/* Real Chromium regression flows. npm ci; npx playwright install chromium; npm run test:browser */
const {chromium}=require('playwright');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),results=path.join(root,'test-results'),metrics=[];
fs.mkdirSync(results,{recursive:true});
const server=http.createServer((req,res)=>{
 if(req.url==='/api/ai/status'){res.setHeader('Content-Type','application/json');res.end(JSON.stringify({configured:false}));return;}
 const route=decodeURIComponent(new URL(req.url,'http://localhost').pathname),file=path.resolve(root,'.'+(route==='/'?'/index.html':route));
 if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
 try{res.setHeader('Content-Type',(file.endsWith('.js')||file.endsWith('.mjs'))?'text/javascript':file.endsWith('.css')?'text/css':'text/html');res.end(fs.readFileSync(file));}catch{res.writeHead(404).end();}
});
(async()=>{
 let browser;
 try{
  await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port;
  browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{})});
  for(const width of [1280,768,390]){
   const context=await browser.newContext({viewport:{width,height:900}}),page=await context.newPage(),errors=[],expectedHTTP=new Set();
   page.on('pageerror',e=>errors.push(e.stack));page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400){const label=r.status()+' '+r.url();if(!expectedHTTP.delete(label))errors.push(label);}});
   // Application flows must work even when optional external math resources are unavailable.
   await page.route('**/*',route=>route.request().url().startsWith(base)?route.continue():route.abort());
   const started=Date.now();await page.goto(base+'/#page-dashboard');await page.locator('#dbMock').waitFor();
   const performance=await page.evaluate(()=>({domReadyMs:Math.round(window.performance.getEntriesByType('navigation')[0].domContentLoadedEventEnd),localAssetBytes:window.performance.getEntriesByType('resource').filter(r=>r.name.startsWith(location.origin)).reduce((n,r)=>n+r.decodedBodySize,0)}));
   assert.ok(performance.domReadyMs<5000,'startup budget '+width);assert.ok(performance.localAssetBytes<3*1024*1024,'local asset budget '+width);metrics.push({width,...performance});
   await require('./shell_browser.cjs')(page,width,results);
   require('./legacy_navigation.cjs')(page);
   if(process.env.SHELL_ONLY){assert.deepEqual(errors,[]);await context.close();continue;}
   if(!process.env.DISCOVERY_ONLY)await require('./workspace_browser.cjs')(page,width,results);
   await require('./discovery_browser.cjs')(page,width,results);
   if(process.env.WORKSPACE_ONLY||process.env.DISCOVERY_ONLY){assert.deepEqual(errors,[]);await context.close();continue;}
   await require('./material_browser_flows.cjs')(page,width,results);
   await require('./material_plan_browser.cjs')(page);
   await require('./study_resources_browser.cjs')(page,width,results);
   await require('./writing_browser.cjs')(page,width,results,expectedHTTP);
   assert.equal(await page.locator('.page.active').count(),1);
   assert.equal(await page.locator('#dashboard-nav').getAttribute('aria-current'),'page');
   assert.equal(await page.evaluate(()=>userState===window.userState),true);
   for(const subject of ['math','physics','chemistry','dt','business','computer_science','english']){
    await page.locator('[data-dashboard-view="map"]').click();await page.locator('[data-map-subject="'+subject+'"]').click();
    assert.equal(await page.locator('#page-dashboard > .db-panel').filter({has:page.locator('h3', {hasText:'课程地图与练习覆盖'})}).locator('.db-topics article').count(),await page.evaluate(s=>IGCSE_CURRICULUM.ordered(s).length,subject));
   }
   await page.locator('#dbSyllabusAudit summary').click();
   assert.match(await page.locator('#dbSyllabusAudit').textContent(),/0510.*2027-2029/s);
   assert.match(await page.locator('#dbSyllabusAudit').textContent(),/准备练习/);
   assert.equal(await page.locator('#dbSyllabusAudit article').count(),16);
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);assert.equal(overflow,false,'dashboard overflow '+width);
   await page.screenshot({path:path.join(results,'dashboard-'+width+'.png'),fullPage:true});
   // Section actions must select only the matching edition/reference, preserve evidence and label preparation.
   await page.locator('#dbAuditFilter').selectOption('preparation-only');
   assert.ok(await page.locator('#dbSyllabusAudit article:visible').count()>0);
   assert.ok(await page.locator('#dbSyllabusAudit article:visible').evaluateAll(rows=>rows.every(r=>r.dataset.auditStatus==='preparation-only')));
   await page.getByRole('button',{name:'准备练习 L1',exact:true}).click();
   assert.ok(await page.evaluate(()=>practiceSession.order.every(id=>{const q=findQuestion(id);return q.syllabusRef==='L1'&&q.assessmentMode==='preparation';})));
   assert.match(await page.locator('#practiceTopicSelect').textContent(),/准备练习/);
   await page.locator('#questionArea .opt-btn').first().click();
   await page.locator('#dashboard-nav').click();await page.locator('[data-dashboard-view="map"]').click();await page.locator('[data-map-subject="computer_science"]').click();
   await page.locator('#dbSyllabusAudit summary').click();
   await page.locator('#dbAuditFilter').selectOption('needs-practice');
   assert.equal(await page.locator('#dbSyllabusAudit article:visible').count(),0);
   assert.equal(await page.locator('#dbAuditEmpty').isVisible(),true);
   await page.locator('#dbAuditFilter').selectOption('all');
   await page.getByRole('button',{name:'学习 8.3',exact:true}).click();
   assert.match(await page.locator('#topicTitle').textContent(),/8.3 File handling/);
   assert.ok(await page.evaluate(()=>userState.learnedTopics.includes('cs0478_8_files')));
   await page.locator('#dashboard-nav').click();await page.locator('#dbSyllabusAudit summary').click();
   await page.getByRole('button',{name:'练习 8.3',exact:true}).click();
   assert.equal(await page.evaluate(()=>practiceSession.order.length),11);
   assert.ok(await page.evaluate(()=>practiceSession.order.every(id=>{const q=findQuestion(id);return q.syllabus==='0478'&&q.syllabusYear==='2026-2028'&&q.syllabusRef==='8.3';})));
   const fileQuestionType=await page.evaluate(()=>findQuestion(practiceSession.order[practiceSession.idx]).type);
   if(fileQuestionType==='choice')await page.locator('#questionArea .opt-btn').first().click();
   else if(fileQuestionType==='number'){await page.locator('#numberInput').fill('9999');await page.locator('[data-act=number-check]').click();}
   else{await page.locator('#essayInput').fill('My practice answer');await page.locator('[data-act=essay-check]').click();await page.locator('[data-self=no]').click();}
   await page.reload();await page.locator('#dashboard-nav').click();
   assert.equal(await page.evaluate(()=>getIGCSESyllabusAudit('computer_science').sections.find(s=>s.ref==='8.3').attemptedCount),1);
   assert.equal(await page.evaluate(()=>getIGCSESyllabusAudit('english').sections.find(s=>s.ref==='L1').preparationAttemptedCount),1);
   // Previously empty outline sections now have a lesson -> practice -> progress path.
   for(const [subject,ref,title] of [['chemistry','4','电解'],['math','7','平移']]){
    await page.locator('[data-dashboard-view="map"]').click();await page.locator('[data-map-subject="'+subject+'"]').click();await page.locator('#dbSyllabusAudit summary').click();
    await page.getByRole('button',{name:'学习 '+ref,exact:true}).click();assert.match(await page.locator('#topicTitle').textContent(),new RegExp(title));
    await page.locator('#startPracticeBtn').click();
    const correct=await page.evaluate(()=>{const q=findQuestion(practiceSession.order[0]);return q.options.indexOf(q.answer);});
    await page.locator('#questionArea .opt-btn').nth(correct).click();
    assert.match(await page.locator('.q-feedback').textContent(),/回答正确/);
    assert.equal(await page.locator('[data-act="next-q"]').count(),1,'feedback remains until explicit next');
    await page.locator('[data-act="next-q"]').click();assert.equal(await page.evaluate(()=>practiceSession.idx),1);
    await page.locator('#dashboard-nav').click();
   }
   await page.locator('#dbProgress').click();assert.equal(await page.locator('#page-progress.active').count(),1);
   assert.equal(await page.locator('[data-progress-topic]').count(),15);
   await page.locator('#page-progress [data-browse-chapter]').selectOption('');
   const transform=page.locator('[data-progress-topic="math_transform_01"]');assert.match(await transform.textContent(),/样本有限/);
   await transform.locator('summary').click();assert.match(await transform.textContent(),/未测量/);
   assert.ok(await page.evaluate(()=>IGCSE_PROGRESS_VIEW.model('math').days.at(-1).answered>=1));
   await page.locator('#progressFilter').selectOption('established');assert.equal(await page.locator('#progressEmpty').isVisible(),true);
   await page.locator('#progressFilter').selectOption('all');
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,'progress overflow '+width);
   await page.screenshot({path:path.join(results,'progress-'+width+'.png'),fullPage:true});
   const downloadPromise=page.waitForEvent('download');await page.locator('#exportLearningBackup').click();const download=await downloadPromise;
   assert.match(download.suggestedFilename(),/^igcse-learning-backup-.*\.json$/);
   const backup=JSON.parse(fs.readFileSync(await download.path(),'utf8'));assert.ok(backup.questionStats&&backup.activityByDay);
   await page.reload();assert.equal(await page.locator('#page-progress.active').count(),1);
   assert.equal(await page.locator('#progress-nav').getAttribute('aria-current'),'page');
   await page.locator('#progressDashboard').click();
   // Newly authored questions must enter the real practice flow and record evidence.
   await page.evaluate(()=>{setCurrentSubjectSafe('computer_science');startSessionFromIds(['depth_cs_001'],'normal',{subject:'computer_science'});});
   const depthAnswer=await page.evaluate(()=>{const q=findQuestion('depth_cs_001');return q.options.indexOf(q.answer);});
   await page.locator('#questionArea .opt-btn').nth(depthAnswer).click();
   assert.equal(await page.evaluate(()=>userState.questionStats.depth_cs_001.correct),1);
   await page.locator('#dashboard-nav').click();
   await page.locator('[data-dashboard-view="map"]').click();await page.locator('[data-map-subject="math"]').click();
   await page.locator('[data-dashboard-view="today"]').click();
   const taskId=await page.locator('[data-task]').first().getAttribute('data-task');
   await page.locator('[data-task]').first().click();
   const qid=await page.evaluate(()=>practiceSession.order[0]);
   const priorAnswers=await page.evaluate(id=>userState.questionStats?.[id]?.answered||0,qid);
   const type=await page.evaluate(()=>findQuestion(practiceSession.order[0]).type);
   if(type==='choice')await page.locator('#questionArea .opt-btn').first().click();
   else if(type==='number'){await page.locator('#numberInput').fill('9999');await page.locator('[data-act=number-check]').click();}
   else{await page.locator('#essayInput').fill('My practice answer');await page.locator('[data-act=essay-check]').click();await page.locator('[data-self=no]').click();}
   assert.ok(await page.evaluate(id=>IGCSE_DASHBOARD.day().completed.includes(id),taskId));
   await page.reload();await page.locator('#dashboard-nav').click();
   assert.equal(await page.evaluate(id=>userState.questionStats[id].answered,qid),priorAnswers+1);
   assert.ok(await page.evaluate(id=>IGCSE_DASHBOARD.day().completed.includes(id),taskId));
   // Subject controls, chapters and all existing page renderers must execute without exceptions.
   for(const id of ['page-textbook','page-assessment','page-mistake','page-quickref','page-vocab','page-resources','page-homework','page-profile','page-progress','page-chapters','motion-lab-page','page-home','page-dashboard']){
    const button=page.locator('#mainNav [data-page="'+id+'"]');
    if(await button.count()&&await button.isVisible()){await button.click();assert.equal(await page.locator('.page.active').count(),1,'single active '+id);}
   }
   await page.locator('#dbMock').click();
   await page.locator('[data-mock="physics"]').click();await page.locator('#confirmMock').click();
   const before=await page.evaluate(()=>({startedAt:practiceSession.startedAt,total:practiceSession.total}));assert.equal(before.total,30);
   const answer=await page.evaluate(()=>{const q=findQuestion(practiceSession.order[practiceSession.idx]);return q.options.indexOf(q.answer);});
   await page.locator('#questionArea .opt-btn').nth(answer).click();
   assert.match(await page.locator('.q-feedback').textContent(),/答案已记录/);
   assert.equal(await page.locator('#questionArea .correct').count(),0);
   // Entering an outline practice during a live mock must return to resumption without replacing the exam.
   const liveId=await page.evaluate(()=>practiceSession.id);
   await page.locator('#dashboard-nav').click();await page.locator('[data-dashboard-view="map"]').click();await page.locator('[data-map-subject="computer_science"]').click();
   await page.locator('#dbSyllabusAudit summary').click();await page.getByRole('button',{name:'练习 8.3',exact:true}).click();
   assert.equal(await page.locator('#page-practice.active').count(),1);
   assert.equal(await page.evaluate(()=>practiceSession.id),liveId);
   await page.reload();await page.locator('#resumeMock').click();
   assert.equal(await page.evaluate(()=>practiceSession.startedAt),before.startedAt);
   assert.equal(await page.evaluate(()=>practiceSession.idx),1);
   await page.locator('#mockSubmitEarly').click();
   assert.match(await page.locator('#mockDetailedReport').textContent(),/29 题未答/);
   assert.equal(await page.evaluate(()=>userState.mockExams.records.length),1);
   await page.locator('#mockDetailedReport summary').click();
   assert.match(await page.locator('#mockDetailedReport').textContent(),/参考答案/);
   // Long unbroken formula text must wrap even when random mocks do not sample it.
   await page.locator('#mockDetailedReport details').evaluate(node=>{const p=document.createElement('p');p.textContent='formula_without_spaces_'.repeat(40);node.append(p);});
   await page.screenshot({path:path.join(results,'mock-report-'+width+'.png'),fullPage:true});
   const reportOverflow=await page.evaluate(()=>Array.from(document.querySelectorAll('#mockDetailedReport, #mockDetailedReport *')).filter(e=>e.getBoundingClientRect().right>innerWidth+1).map(e=>({tag:e.tagName,text:e.textContent.slice(0,100)})));
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,'mock overflow '+width+' '+JSON.stringify(reportOverflow));
   await page.locator('[data-report-topic]').first().click();assert.equal(await page.locator('#page-practice.active').count(),1);
   await page.locator('[data-page="page-practice"]').click();await page.locator('[data-practice-tab="mock"]').click();await page.locator('[data-view-report]').first().click();assert.equal(await page.locator('#mockDetailedReport').count(),1);
   // A resumed expired exam submits once with a full denominator, even after refresh.
   await page.locator('[data-page="page-practice"]').click();await page.locator('[data-practice-tab="mock"]').click();await page.locator('[data-mock="math"]').click();await page.locator('#confirmMock').click();
   await page.evaluate(()=>{practiceSession.startedAt=Date.now()-1900000;IGCSE_MOCK_ENGINE.saveActive(practiceSession);});
   await page.reload();await page.locator('#resumeMock').click();await page.locator('#mockDetailedReport').waitFor();
   assert.equal(await page.evaluate(()=>userState.mockExams.records.length),2);
   assert.equal(await page.evaluate(()=>userState.mockExams.records[0].result.unanswered),30);
   await page.reload();assert.equal(await page.evaluate(()=>userState.mockExams.records.length),2);
   // Direct routes and browser history include dynamically registered pages.
   await page.goto(base+'/#page-chapters');await page.locator('#ceBody').waitFor();
   assert.equal(await page.locator('#page-chapters.active').count(),1);
   await page.locator('#dashboard-nav').click();await page.goBack();assert.equal(await page.locator('#page-chapters.active').count(),1);
   if(width===1280){
    await page.evaluate(()=>{setCurrentSubjectSafe('computer_science');startSessionFromIds(['cs1d_q3'],'normal',{subject:'computer_science'});});
    await page.locator('#numberInput').fill('3840000');await page.locator('[data-act=number-check]').click();
    assert.equal(await page.evaluate(()=>userState.questionStats.cs1d_q3.lastCorrect),true);
    await page.locator('#dashboard-nav').click();await page.locator('#subjectSelect').selectOption('english');
    assert.equal(await page.locator('#page-dashboard.active').count(),1);
    assert.match(await page.locator('.page.active .db-hero').textContent(),/英语/);
   }
   await page.goto(base);await page.locator('#dbProgress').waitFor();assert.equal(await page.locator('#page-dashboard.active').count(),1,'default landing');
   await require('./content_expansion_browser.cjs')(page,width,results);
   await require('./learning_path_browser.cjs')(page,width,results);
   await require('./release_browser.cjs')(page,width,results);
   await require('./objective_browser.cjs')(page,width,results);
   await require('./curriculum_browser.cjs')(page,width,results);
   await require('./advanced_browser.cjs')(page,width,results);
   assert.deepEqual(errors,[],'browser errors '+width);assert.equal(expectedHTTP.size,0,'expected error fixtures observed');
   console.log('[ok] '+width+'px: dashboard, seven subjects, task completion, storage, navigation, mock resume/submit/timeout/report, curriculum pacing/stages/export; '+(Date.now()-started)+'ms');
   await context.close();
   await require('./pilot_browser.cjs')(browser,width,results);
  }
  fs.writeFileSync(path.join(results,'performance.json'),JSON.stringify(metrics,null,2));console.log('[ok] startup budgets: '+JSON.stringify(metrics));
 }finally{if(browser)await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
