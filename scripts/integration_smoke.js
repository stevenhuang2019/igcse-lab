#!/usr/bin/env node
/* Deterministic repository smoke test.
 * Runtime/browser integration remains a separate manual/browser test.
 */
const fs=require('fs'),path=require('path'),vm=require('vm');
const ROOT=path.join(__dirname,'..'),DATA=path.join(ROOT,'data');
let fail=0;
const ok=m=>console.log('[ok] '+m), bad=m=>{fail++;console.error('[FAIL] '+m)};
const files=fs.readdirSync(DATA).filter(x=>x.endsWith('.js')).sort();

for(const f of files){
  const src=fs.readFileSync(path.join(DATA,f),'utf8');
  try{new vm.Script(src,{filename:f});ok('syntax '+f);}
  catch(e){bad('syntax '+f+': '+e.message);}
}

const requiredFiles=[
  'igcse_content.js','igcse_questions.js','igcse_questions_physics.js',
  'igcse_questions_chemistry.js','igcse_questions_math.js','igcse_questions_dt.js',
  'igcse_questions_business.js','igcse_cs_0478.js','igcse_questions_cs.js',
  'igcse_cs_deep.js','igcse_english_esl.js','igcse_questions_english.js',
  'igcse_english_deep.js','english_master_database.js','mastery_engine.js',
  'learning_dashboard.js','chapter_learning_engine.js','user_state_schema.js','syllabus_map.js'
];
for(const f of requiredFiles) files.includes(f)?ok('required '+f):bad('missing '+f);

const index=fs.readFileSync(path.join(ROOT,'index.html'),'utf8');
[
  'data/user_state_schema.js',
  'data/syllabus_map.js',
  'data/mastery_engine.js',
  'data/learning_dashboard.js',
  'data/chapter_learning_engine.js',
  'data/igcse_cs_0478.js',
  'data/igcse_questions_cs.js',
  'data/igcse_english_esl.js',
  'data/igcse_questions_english.js'
].forEach(x=>index.includes(x)?ok('index loads '+x):bad('index missing '+x));

const requiredTokens=[
  'function openTopic','function startPractice','igcse-answer-recorded',
  'recordMasteryEvent','dailyPlan','examReadiness','English Master Database'
];
requiredTokens.forEach(x=>index.includes(x)?ok('index token '+x):bad('index token missing '+x));

console.log(fail?'SMOKE FAILED: '+fail+' failure(s)':'SMOKE PASSED');
process.exit(fail?1:0);
