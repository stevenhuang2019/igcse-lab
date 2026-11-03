/* Existing controller regressions use real grouped navigation, expanded before clicking.
   The removed global subject select is driven as internal state; shell_browser separately
   verifies the learner-facing page subject chips and mobile group controls. */
module.exports=page=>{
 const locate=page.locator.bind(page);
 page.locator=(...args)=>{const loc=locate(...args),click=loc.click.bind(loc),select=loc.selectOption.bind(loc);
 loc.click=async opts=>{if(typeof args[0]==='string'&&(args[0].includes('nav')||args[0].includes('data-page'))){await loc.evaluate(el=>{if(el.closest('#mainNav'))window.IGCSE_SHELL?.reveal(el.dataset.page);}).catch(()=>{});}if(typeof args[0]==='string'&&args[0].includes('vocabGame')&&!args[0].includes('Area'))await page.evaluate(()=>window.IGCSE_SHELL?.vocabPanels('game'));return click(opts);};
 loc.selectOption=async(value,opts)=>{if(args[0]==='#subjectSelect'){return loc.evaluate((el,value)=>{el.value=value;el.dispatchEvent(new Event('change'));return [el.value];},value);}return select(value,opts);};return loc;};
};
