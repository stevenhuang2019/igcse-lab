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
ctx.window.addEventListener=()=>{};
ctx.document={};
ctx.localStorage={getItem:()=>null,setItem:()=>{},removeItem:()=>{}};
vm.createContext(ctx);

// Syntax-check every data module without executing browser-dependent engines.
for(const f of files){
  const src=fs.readFileSync(path.join(DATA,f),'utf8');
  try{new vm.Script(src,{filename:f});ok('syntax data/'+f);}
  catch(e){bad('syntax data/'+f+': '+e.message);}
}

// Execute only normalized data modules that are expected to be browser-independent.
const load=['igcse_content.js','igcse_questions.js','igcse_questions_physics.js','igcse_questions_chemistry.js','igcse_questions_math.js','igcse_questions_dt.js','igcse_questions_business.js','igcse_cs_0478.js','igcse_questions_cs.js','igcse_cs_deep.js','igcse_questions_english.js','igcse_english_esl.js','igcse_english_deep.js','english_master_database.js'];
for(const f of load){
  const src=fs.readFileSync(path.join(DATA,f),'utf8');
  try{vm.runInContext(src,ctx,{filename:f});ok('load data/'+f);}
  catch(e){bad('load data/'+f+': '+e.message);}
}
const w=ctx.window;
function arr(name){if(!Array.isArray(w[name]))bad(name+' missing/not array');else ok(name+' '+w[name].length);}
arr('IGCSE_CONTENT'); arr('IGCSE_QUESTIONS'); arr('IGCSE_CS_CONTENT'); arr('IGCSE_CS_QUESTIONS'); arr('IGCSE_CS_DEEP_CONTENT'); arr('IGCSE_CS_DEEP_QUESTIONS'); arr('IGCSE_ENGLISH_CONTENT'); arr('IGCSE_ENGLISH_QUESTIONS');
if(!w.ENGLISH_MASTER_DB)bad('ENGLISH_MASTER_DB missing');else ok('ENGLISH_MASTER_DB loaded');

const groups=[w.IGCSE_QUESTIONS,w.IGCSE_CS_QUESTIONS,w.IGCSE_CS_DEEP_QUESTIONS,w.IGCSE_ENGLISH_QUESTIONS];
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
