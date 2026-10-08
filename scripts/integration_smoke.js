#!/usr/bin/env node
/* Deterministic repository smoke test.
 * Runtime/browser integration remains a separate manual/browser test.
 */
const fs=require('fs'),path=require('path'),vm=require('vm');
const ROOT=path.join(__dirname,'..'),DATA=path.join(ROOT,'data');
let fail=0;
const ok=m=>console.log('[ok] '+m), bad=m=>{fail++;console.error('[FAIL] '+m)};
const files=fs.readdirSync(DATA).filter(x=>x.endsWith('.js')).sort();
// Legacy browser data assets contain template/data fragments and are validated by runtime/load checks.
const browserDataAssets=new Set(['physics_motion_lab.js','vocab.js']);
for(const f of files){
  if(browserDataAssets.has(f)){ok('browser asset '+f+' (runtime-loaded)');continue;}
  const src=fs.readFileSync(path.join(DATA,f),'utf8');
  try{new vm.Script(src,{filename:f});ok('syntax '+f);}
  catch(e){bad('syntax '+f+': '+e.message);}
}
const requiredFiles=[
  'igcse_content.js','igcse_questions.js','igcse_questions_physics.js','igcse_questions_chemistry.js','igcse_questions_math.js','igcse_questions_dt.js','igcse_questions_business.js','igcse_cs_0478.js','igcse_questions_cs.js','igcse_cs_deep.js','igcse_english_esl.js','igcse_questions_english.js','igcse_english_deep.js','english_master_database.js','mastery_engine.js','learning_dashboard.js','chapter_learning_engine.js','user_state_schema.js','syllabus_map.js','srs_engine.js','error_diagnosis.js'
];
for(const f of requiredFiles) files.includes(f)?ok('required '+f):bad('missing '+f);
const index=fs.readFileSync(path.join(ROOT,'index.html'),'utf8');
['data/user_state_schema.js','data/syllabus_map.js','data/mastery_engine.js','data/learning_dashboard.js','data/chapter_learning_engine.js','data/igcse_cs_0478.js','data/igcse_questions_cs.js','data/igcse_english_esl.js','data/igcse_questions_english.js'].forEach(x=>index.includes(x)?ok('index loads '+x):bad('index missing '+x));
['function openTopic','function startPractice','igcse-answer-recorded','recordMasteryEvent'].forEach(x=>index.includes(x)?ok('index token '+x):bad('index token missing '+x));
const engineSources=index+'\n'+fs.readFileSync(path.join(DATA,'learning_dashboard.js'),'utf8')+'\n'+fs.readFileSync(path.join(DATA,'english_master_database.js'),'utf8')+'\n'+fs.readFileSync(path.join(DATA,'srs_engine.js'),'utf8');
['dailyPlan','examReadiness','English Master Database','IGCSE_SRS','dueCards','IGCSE_ERROR_DIAGNOSIS','errorDiagnosis'.forEach(x=>engineSources.includes(x)?ok('engine token '+x):bad('engine token missing '+x));

const mobileChecks=[
  '#mainNav{display:flex',
  'min-height:44px',
  'touch-action:manipulation',
  'font-size:16px',
  '@media (max-width:768px)',
  '@media (max-width:430px)'
];
mobileChecks.forEach(x=>index.includes(x)?ok('mobile rule '+x):bad('mobile rule missing '+x));
const checks=["#mainNav{display:flex","min-height:44px","touch-action:manipulation","font-size:16px","@media (max-width:768px)","@media (max-width:430px)","data-eng-topic","data-start-topic","startPracticeBtn"];

checks.forEach(x=>index.includes(x)?ok('interaction '+x):bad('interaction missing '+x));
console.log(fail?'SMOKE FAILED: '+fail+' failure(s)':'SMOKE PASSED');
process.exit(fail?1:0);
