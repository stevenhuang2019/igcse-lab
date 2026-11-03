const assert=require('node:assert/strict'),path=require('node:path');
module.exports=async(page,width,results)=>{
 const original=await page.evaluate(()=>({state:JSON.stringify(userState),review:localStorage.getItem('igcseWritingReview'),draft:localStorage.getItem('igcseWritingDrafts')}));
 await page.evaluate(()=>{
  const a=IGCSE_ARCADE,v=a.words().find(v=>v.subject==='math');userState.vocabArcade={records:{[a.key(v)]:{flagged:true,wrong:1,nextReviewAt:1,stage:0,lastQualifiedAt:0}}};userState.dailyPlan={};
  localStorage.removeItem('igcseWritingReview');IGCSE_REVIEW.capture([{original:'She go to school.',replacement:'She goes to school.',explanation:'Third person singular.'}]);
  localStorage.setItem('igcseWritingDrafts',JSON.stringify({email:{draft:'My original private draft.',task:'Keep this task.'}}));
  switchPage('page-dashboard');
 });
 await page.locator('[data-dashboard-view="today"]').click();

 await page.locator('[data-task="review_vocabulary"]').click();
 assert.equal(await page.evaluate(()=>IGCSE_ARCADE.getSession().queue.length),1);
 await page.evaluate(()=>{const g=IGCSE_ARCADE.getSession();IGCSE_ARCADE.outcome(g.queue[0],true,true);});
 assert.equal(await page.evaluate(()=>IGCSE_DASHBOARD.day().completed.includes('review_vocabulary')),false);
 await page.evaluate(()=>{const g=IGCSE_ARCADE.getSession();IGCSE_ARCADE.outcome(g.queue[0],true,false);});
 assert.equal(await page.evaluate(()=>IGCSE_DASHBOARD.day().completed.includes('review_vocabulary')),true);
 await page.locator('#arcadeExitReview').click();assert.ok(await page.evaluate(()=>IGCSE_ARCADE.pool('choice').length)>1);
 await page.evaluate(()=>switchPage('page-dashboard'));
 await page.locator('[data-dashboard-view="today"]').click();
 const id=await page.evaluate(()=>IGCSE_DASHBOARD.day().tasks.find(t=>t.type==='writing-review').id);
 await page.locator('[data-task="'+id+'"]').click();await page.locator('#writingReviewAnswer').fill('She goes to school.');await page.locator('#writingReviewPanel').getByRole('button',{name:'检查 / Check',exact:true}).click();
 assert.equal(await page.evaluate(id=>IGCSE_DASHBOARD.day().completed.includes(id),id),true);
 assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('igcseWritingDrafts')).email.draft),'My original private draft.');
 await page.screenshot({path:path.join(results,'daily-review-'+width+'.png')});
 await page.evaluate(original=>{const state=JSON.parse(original.state);for(const k of Object.keys(userState))delete userState[k];Object.assign(userState,state);saveUserState(userState);for(const [k,v] of [['igcseWritingReview',original.review],['igcseWritingDrafts',original.draft]])v===null?localStorage.removeItem(k):localStorage.setItem(k,v);},original);await page.reload();
 console.log('Targeted due vocabulary and private writing recall '+width);
};
