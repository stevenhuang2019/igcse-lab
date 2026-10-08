#!/usr/bin/env node
/* IGCSE LAB integration smoke test
 * Browser-independent checks for the unified data layer.
 */
const fs=require('fs'),path=require('path'),vm=require('vm');
const ROOT=path.join(__dirname,'..'),DATA=path.join(ROOT,'data');
let fail=0;
const ok=m=>console.log('[ok] '+m), bad=m=>{fail++;console.error('[FAIL] '+m)};
const files=fs.readdirSync(DATA).filter(x=>x.endsWith('.js')).sort();
const ctx={window:{},console,CustomEvent:function(type,init){this.type=type;this.detail=init&&init.detail}};
ctx.window.dispatchEvent=()=>{};
vm.createContext(ctx);
for(const f of files){
  const src=fs.readFileSync(path.join(DATA,f),'utf8');
  try{new vm.Script(src,{filename:f});vm.runInContext(src,ctx,{filename:f});ok('data/'+f);}
  catch(e){bad('data/'+f+': '+e.message);}
}
const w=ctx.window;
function arr(name){if(!Array.isArray(w[name]))bad(name+' missing/not array');else ok(name+' '+w[name].length);}
arr('IGCSE_CONTENT'); arr('IGCSE_QUESTIONS');
arr('IGCSE_CS_CONTENT'); arr('IGCSE_CS_QUESTIONS');
arr('IGCSE_CS_DEEP_CONTENT'); arr('IGCSE_CS_DEEP_QUESTIONS');
arr('IGCSE_ENGLISH_CONTENT'); arr('IGCSE_ENGLISH_QUESTIONS');
if(!w.ENGLISH_MASTER_DB)bad('ENGLISH_MASTER_DB missing');else ok('ENGLISH_MASTER_DB loaded');
const q=[].concat(w.IGCSE_QUESTIONS||[],w.IGCSE_CS_QUESTIONS||[],w.IGCSE_CS_DEEP_QUESTIONS||[],w.IGCSE_ENGLISH_QUESTIONS||[]);
const ids=new Set(),dups=[];
for(const x of q){if(!x||!x.id){bad('question missing id');continue}if(ids.has(x.id))dups.push(x.id);ids.add(x.id);}
if(dups.length)bad('duplicate question ids: '+[...new Set(dups)].join(', '));else ok('question ids unique ('+q.length+')');
for(const x of q){
  if(!x.subject||!x.topicId||!x.question)bad('incomplete question: '+(x.id||'?'));
  if(x.type==='choice' && (!Array.isArray(x.options)||x.options.length<2||!x.options.includes(x.answer)))bad('invalid choice: '+x.id);
}
const subjects=new Set(q.map(x=>x.subject));
['math','physics','chemistry','dt','business','computer_science','english'].forEach(s=>subjects.has(s)?ok('subject '+s+' present'):bad('subject '+s+' missing'));
console.log(fail?'SMOKE FAILED: '+fail+' failure(s)':'SMOKE PASSED');
process.exit(fail?1:0);
