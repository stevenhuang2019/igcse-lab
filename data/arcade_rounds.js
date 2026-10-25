/* Bank-filtered selection: bounded reinforcement plus unseen-word rotation. */
(function(scope){
 'use strict';
 function selectRound(rows,{size=10,seen=[],isWeak=()=>false,matching=false,random=Math.random}={}){
  size=Number.isInteger(size)&&size>=1&&size<=50?size:10;
  const unique=new Set(),items=rows.filter(v=>{const k=matching?v.zh:(v.id||v.subject+'::'+v.en);if(unique.has(k))return false;unique.add(k);return true;});
  const mix=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
  const visited=new Set(seen),key=v=>v.id||v.subject+'::'+v.en.toLowerCase().trim();
  const review=mix(items.filter(isWeak)).sort((a,b)=>Number(visited.has(key(a)))-Number(visited.has(key(b)))).slice(0,Math.floor(size*.3));
  const remaining=mix(items.filter(v=>!review.includes(v))).sort((a,b)=>Number(isWeak(a))-Number(isWeak(b))||Number(visited.has(key(a)))-Number(visited.has(key(b))));
  return [...review,...remaining].slice(0,size);
 }
 const api={selectRound};if(typeof module==='object')module.exports=api;else scope.IGCSE_ARCADE_ROUNDS=api;
})(typeof window==='object'?window:globalThis);
