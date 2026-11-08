/* Temporary public-endpoint connectivity diagnostic. No credentials or learner data. */
const test=require('node:test');
test('public production endpoint connectivity from the runner',{skip:!process.env.CI},async()=>{
 for(const route of ['/healthz','/login']){
  const started=Date.now();try{
   const r=await fetch('https://igcse-private-pilot.onrender.com'+route,{redirect:'manual',signal:AbortSignal.timeout(45000)});
   console.log('PRODUCTION_CONNECTIVITY '+JSON.stringify({route,status:r.status,ms:Date.now()-started,location:r.headers.get('location')}));
   await r.body?.cancel();
  }catch(e){console.log('PRODUCTION_CONNECTIVITY '+JSON.stringify({route,error:e.name,code:e.cause?.code,ms:Date.now()-started}));}
 }
});
