/* Choice difficulty is game scaffolding, not a CEFR or exam level. */
(function(){
 'use strict';
 function choices(target,rows,level='standard',random=Math.random){
  const seen=new Set([target.zh]),candidates=[];
  for(const row of rows){if(!row.en||!row.zh||row.en.toLowerCase()===target.en.toLowerCase()||seen.has(row.zh))continue;seen.add(row.zh);candidates.push({row,tie:random()});}
  const rank=row=>(row.chapter===target.chapter?0:20)+(level==='challenge'?Math.abs(row.en.length-target.en.length)+(row.en[0].toLowerCase()===target.en[0].toLowerCase()?0:8):0);
  candidates.sort((a,b)=>rank(a.row)-rank(b.row)||a.tie-b.tie);
  const result=[target,...candidates.slice(0,level==='guided'?1:3).map(x=>x.row)];
  for(let i=result.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[result[i],result[j]]=[result[j],result[i]];}return result;
 }
 window.IGCSE_ARCADE_OPTIONS={choices};
})();
