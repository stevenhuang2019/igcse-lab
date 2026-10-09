const assert=require('node:assert/strict'),path=require('node:path');
module.exports=async(page,width,results)=>{
 await page.locator('#dashboard-nav').click();await page.locator('[data-db-subject="math"]').click();await page.locator('#dbObjectiveAudit summary').click();assert.equal(await page.locator('#dbObjectiveAudit article').count(),4);
 await page.locator('#dbObjectiveFilter').selectOption('gap');assert.equal(await page.locator('#dbObjectiveAudit article:visible').count(),0);
 await page.locator('#dbObjectiveFilter').selectOption('partial');assert.equal(await page.locator('#dbObjectiveAudit article:visible').count(),4);
 await page.locator('[data-objective-practice="math_bounds"]').click();assert.deepEqual(await page.evaluate(()=>practiceSession.order.slice().sort()),['objective_math_boundarea','objective_math_boundspeed','course_math_bounds_structured','release_math_5'].sort());
 await page.evaluate(()=>startSessionFromIds(['objective_math_boundarea'],'normal',{subject:'math',noShuffle:true}));
 await page.locator('#numberInput').fill('24.5025');await page.locator('[data-act=number-check]').click();assert.match(await page.locator('.q-feedback').textContent(),/回答正确/);
 assert.equal(await page.evaluate(()=>userState.questionStats.objective_math_boundarea.correct),1);
 await page.locator('#dashboard-nav').click();await page.locator('[data-db-subject="english"]').click();await page.locator('#dbObjectiveAudit summary').click();await page.locator('#dbObjectiveFilter').selectOption('preparation');assert.equal(await page.locator('#dbObjectiveAudit article:visible').count(),1);assert.match(await page.locator('#dbObjectiveAudit article:visible').textContent(),/客观 0/);
 await page.locator('#dbObjectiveFilter').selectOption('gap');assert.match(await page.locator('#dbObjectiveAudit article:visible').textContent(),/真实音频/);assert.equal(await page.locator('#dbObjectiveAudit article:visible [data-objective-practice]').count(),0);
 await page.locator('#dbObjectiveFilter').selectOption('all');assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);await page.screenshot({path:path.join(results,'priority-objectives-'+width+'.png'),fullPage:true});
 await page.locator('[data-db-subject="dt"]').click();assert.equal(await page.locator('#dbObjectiveAudit').count(),0);
};
