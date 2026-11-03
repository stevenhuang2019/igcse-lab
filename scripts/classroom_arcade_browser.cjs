const assert=require('node:assert/strict'),path=require('node:path');
module.exports=async(page,width,results)=>{
 const before=await page.evaluate(()=>({state:JSON.stringify(userState),prefs:localStorage.getItem('igcseArcadePrefs'),history:localStorage.getItem('igcseArcadeHistory')}));
 await page.evaluate(()=>{window.__oldSpeak=window.speakIGCSE;window.__spoken=[];window.speakIGCSE=async text=>{__spoken.push(text);return {ok:true,american:true};};IGCSE_ARCADE.open({bank:'cet4'});});
 await page.locator('#arcadeRoundSize').fill('12');await page.locator('#arcadeRoundSize').dispatchEvent('change');await page.locator('[data-arcade-mode=choice]').click();
 const first=await page.evaluate(()=>{const g=IGCSE_ARCADE.getSession();return g.queue.map(v=>({key:IGCSE_ARCADE.key(v),en:v.en,zh:v.zh,bank:v.subject}));});assert.equal(first.length,12);assert.ok(first.every(v=>v.bank==='cet4'));await page.waitForFunction(()=>__spoken.length>0);assert.equal(await page.evaluate(()=>__spoken.at(-1)),first[0].en);
 await page.locator('[data-arcade-choice]').filter({hasText:first[0].zh}).first().click();await page.waitForFunction(()=>IGCSE_ARCADE.getSession().index===1);assert.match(await page.locator('#arcadePrevious').textContent(),new RegExp(first[0].en));assert.ok((await page.locator('#arcadePrevious').textContent()).includes(first[0].zh));
 await page.locator('[data-arcade-mode=choice]').click();const second=await page.evaluate(()=>IGCSE_ARCADE.getSession().queue.map(IGCSE_ARCADE.key));assert.ok(second.every(k=>!first.some(v=>v.key===k)));
 await page.locator('[data-arcade-mode=match]').click();assert.equal(await page.evaluate(()=>IGCSE_ARCADE.getSession().queue.length),12);assert.equal(await page.locator('[data-side=en]').count(),6);
 for(let board=0;board<2;board++){const pairs=await page.locator('[data-side=en]').evaluateAll(bs=>bs.map(b=>b.dataset.pair));for(const id of pairs){await page.locator('[data-pair="'+id+'"][data-side=en]').click();await page.locator('[data-pair="'+id+'"][data-side=zh]').click();}if(board===0)await page.waitForFunction(()=>IGCSE_ARCADE.getSession().matchOffset===6);}
 await page.locator('.arcade-result').waitFor();await page.screenshot({path:path.join(results,'classroom-rounds-'+width+'.png')});
 await page.evaluate(before=>{IGCSE_ARCADE.stop();window.speakIGCSE=__oldSpeak;const s=JSON.parse(before.state);for(const k of Object.keys(userState))delete userState[k];Object.assign(userState,s);saveUserState(userState);for(const [key,value] of [['igcseArcadePrefs',before.prefs],['igcseArcadeHistory',before.history]])value===null?localStorage.removeItem(key):localStorage.setItem(key,value);},before);await page.reload();
 console.log('Autoplay, previous-word review, configurable bank rotation and multi-board matching '+width);
};
