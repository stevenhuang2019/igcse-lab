/* Learner-controlled restore: validate, preview, explicit replacement and one recovery snapshot. */
(function(){
 'use strict';
 const object=x=>x&&typeof x==='object'&&!Array.isArray(x);
 const fail=()=>{throw new Error('备份格式不正确，请使用本站导出的学习 JSON。');};
 function parse(text){
  if(typeof text!=='string'||new TextEncoder().encode(text).length>5*1024*1024)throw new Error('备份超过 5 MiB 或格式无效。');
  let s;try{s=JSON.parse(text);}catch{fail();}
  let nodes=0;
  function check(x,depth=0){if(++nodes>150000||depth>30)fail();if(typeof x==='number'&&(!Number.isFinite(x)||Math.abs(x)>Number.MAX_SAFE_INTEGER))fail();if(x&&typeof x==='object')for(const [key,value] of Object.entries(x)){if(['__proto__','constructor','prototype'].includes(key))fail();check(value,depth+1);}}
  check(s);if(!object(s)||!Array.isArray(s.learnedTopics)||!object(s.questionStats)||!object(s.globalStats))fail();
  for(const name of ['learnedTopics','mistakes','badges','assessmentRecords','homeworkRecords','vocabMistakes'])if(s[name]!==undefined&&!Array.isArray(s[name]))fail();
  if(s.openedTopics!==undefined&&(!Array.isArray(s.openedTopics)||!s.openedTopics.every(x=>typeof x==='string')))fail();
  if(!s.learnedTopics.every(x=>typeof x==='string'))fail();
  if(s.writtenPractice!==undefined){if(!object(s.writtenPractice)||Object.keys(s.writtenPractice).length>100)fail();for(const [id,r] of Object.entries(s.writtenPractice))if(id.length>200||!object(r)||typeof r.answer!=='string'||r.answer.length>12000||!Number.isInteger(r.updatedAt)||r.updatedAt<0)fail();}
  for(const name of ['topicStats','dailyPlan','subjectStats','progress','mastery','srs','assessments','mockExams','achievements','errorDiagnosis','englishMaster','activityByDay','curriculum','learningPath','advancedLearning','hintReviews'])if(s[name]!==undefined&&!object(s[name]))fail();
  function counts(r,answerKey='answered',correctKey='correct'){if(!object(r))fail();for(const key of [answerKey,correctKey])if(r[key]!==undefined&&(!Number.isInteger(r[key])||r[key]<0))fail();if((r[correctKey]||0)>(r[answerKey]||0))fail();}
  for(const key of ['level','xp','xpNextLevel','schemaVersion'])if(s[key]!==undefined&&(typeof s[key]!=='number'||s[key]<0))fail();
  if(s.xpNextLevel!==undefined&&s.xpNextLevel<=0)fail();if(s.level!==undefined&&(!Number.isInteger(s.level)||s.level<1))fail();
  if(s.lastSciSubject!==undefined&&!window.IGCSE_CATALOG.subjects.includes(s.lastSciSubject))fail();
  counts(s.globalStats,'totalAnswered','totalCorrect');for(const r of Object.values(s.questionStats)){counts(r);for(const key of ['assistedAnswered','assistedCorrect'])if(r[key]!==undefined&&(!Number.isInteger(r[key])||r[key]<0))fail();if((r.assistedAnswered||0)>(r.answered||0)||(r.assistedCorrect||0)>(r.correct||0)||(r.assistedCorrect||0)>(r.assistedAnswered||0))fail();}for(const r of Object.values(s.subjectStats||{}))counts(r);
  for(const r of Object.values(s.topicStats||{}))if(!object(r))fail();
  for(const day of Object.values(s.activityByDay||{})){if(!object(day))fail();for(const r of Object.values(day))counts(r);}
  for(const e of Object.values(s.errorDiagnosis||{})){if(!object(e)||!object(e.subjects)||!Array.isArray(e.questions)||!e.questions.every(x=>typeof x==='string')||!Number.isInteger(e.count)||e.count<0||!Object.values(e.subjects).every(x=>Number.isInteger(x)&&x>=0))fail();}
  for(const key of ['subjects','topics'])if(s.progress?.[key]!==undefined&&!object(s.progress[key]))fail();
  for(const key of ['vocab','grammar','sentences','commandWords'])if(s.englishMaster?.[key]!==undefined&&!object(s.englishMaster[key]))fail();
  if(s.hintReviews)for(const [id,r] of Object.entries(s.hintReviews)){if(!window.IGCSE_CATALOG.question(id)||!object(r)||r.qid!==id||r.subject!==window.IGCSE_CATALOG.question(id).subject||typeof r.lastHintAt!=='number'||!Number.isFinite(r.lastHintAt)||!Number.isInteger(r.level)||r.level<1||r.level>2||!['pending','complete'].includes(r.status))fail();}
  for(const r of s.mistakes||[])if(!object(r)||typeof (r.questionId||r.qid||r.id)!=='string')fail();
  if(s.srs?.cards!==undefined){if(!object(s.srs.cards)||!Object.values(s.srs.cards).every(object))fail();}
  if(s.mockExams?.records!==undefined){if(!Array.isArray(s.mockExams.records))fail();for(const r of s.mockExams.records){if(!object(r)||typeof r.id!=='string'||!object(r.result)||!Array.isArray(r.questionIds)||!r.questionIds.every(x=>typeof x==='string'))fail();counts(r.result,'total','correct');if(r.result.accuracy!==null&&(typeof r.result.accuracy!=='number'||r.result.accuracy<0||r.result.accuracy>100))fail();for(const key of ['byTopic','bySkill'])if(r.result[key]!==undefined){if(!object(r.result[key]))fail();for(const v of Object.values(r.result[key]))counts(v,'total','correct');}for(const key of ['objectiveTotal','openTotal','openAnswered','preparationTotal','preparationAnswered','unanswered'])if(r.result[key]!==undefined&&(!Number.isInteger(r.result[key])||r.result[key]<0))fail();}}
  const c=s.curriculum;if(c){if(![10,11,12,13].includes(c.yearGroup)||![1,2,3].includes(c.term)||!object(c.subjects))fail();for(const [subject,p] of Object.entries(c.subjects)){if(!window.IGCSE_CATALOG.subjects.includes(subject)||!object(p)||!['IGCSE','AS','A Level'].includes(p.qualification)||!/^\d{4}$/.test(p.code)||!Number.isInteger(p.examYear)||p.examYear<2026||p.examYear>2040)fail();if(p.statuses!==undefined&&(!object(p.statuses)||!Object.values(p.statuses).every(x=>['unstarted','current','taught','review'].includes(x))))fail();if(p.order!==undefined&&(!object(p.order)||!Object.values(p.order).every(x=>Number.isInteger(x)&&x>0&&x<=999)))fail();}}
  if(s.advancedLearning){const a=s.advancedLearning;if(!object(a.records)||!object(a.plans))fail();for(const p of Object.values(a.plans)){if(!object(p)||!['unstarted','current','taught','review'].includes(p.status)||!Number.isInteger(p.order)||p.order<1||p.order>999)fail();}for(const r of Object.values(a.records)){if(!object(r)||!object(r.answers))fail();for(const answer of Object.values(r.answers)){if(!object(answer)||typeof answer.value!=='string'||answer.value.length>10000||![true,false,null].includes(answer.correct)||!Number.isInteger(answer.attempts)||answer.attempts<1||!Number.isInteger(answer.updatedAt)||answer.updatedAt<0)fail();}}}
  for(const d of Object.values(s.dailyPlan||{})){if(!object(d)||d.completed!==undefined&&(!Array.isArray(d.completed)||!d.completed.every(x=>typeof x==='string')))fail();d.tasks=null;d.pendingTask=null;}
  // Attachments and working drafts are separate stores. Untrusted active question snapshots are never resumed.
  if(s.mockExams){delete s.mockExams.active;delete s.mockExams.activePractice;delete s.mockExams.activeQuestions;}
  delete s.materialStudyLinks;delete s.learningPath;
  s.backupRestoredAt=new Date().toISOString();
  return {state:s,summary:{answered:s.globalStats.totalAnswered||0,learned:s.learnedTopics.length,questions:Object.keys(s.questionStats).length,mocks:s.mockExams?.records?.length||0,profiles:Object.keys(c?.subjects||{}).length}};
 }
 function apply(preview,storage=localStorage){
  if(window.userState.mockExams?.activePractice)throw new Error('请先交卷当前模拟考，再恢复备份。');
  const verified=parse(JSON.stringify(preview.state)),before=storage.getItem('igcseUserState');
  try{if(before!==null)storage.setItem('igcseRecoverySnapshot',before);else storage.removeItem('igcseRecoverySnapshot');storage.setItem('igcseUserState',JSON.stringify(verified.state));}catch{throw new Error('浏览器存储空间不足，恢复未完成；现有学习记录未替换。');}
  return verified;
 }
 window.IGCSE_BACKUP={parse,apply};
 function build(){
  const main=document.querySelector('main');if(!main)return;
  const page=document.createElement('section');page.id='page-backup';page.className='page';main.append(page);let pending=null;
  function render(){pending=null;page.innerHTML='<div class="db-hero"><div><h2>恢复学习备份</h2><p>先查看备份内容，再决定是否替换当前记录。</p></div></div><section class="db-panel"><p>恢复学习 JSON 会替换当前作答、教学安排、错题及考试历史。教材附件、写作草稿与资源收藏保留在各自存储中，不从此 JSON 恢复。进行中的考试和诊断不恢复；阶段检查请重新开始。</p><p>恢复前自动保留一份当前记录，可撤销上次恢复；请另行导出长期备份。</p><label>选择本站导出的 JSON（最多 5 MiB）<input id="backupFile" type="file" accept=".json,application/json"></label><p id="backupPreview" role="status">尚未选择文件。</p><label><input id="backupConfirm" type="checkbox" disabled> 我已查看内容，同意替换当前学习记录</label><div class="db-actions"><button id="backupApply" disabled>确认恢复并刷新</button><button id="backupUndo" '+(!localStorage.getItem('igcseRecoverySnapshot')?'disabled':'')+'>查看上次恢复前的记录</button><button id="backupReturn">返回学习进度</button></div></section>';
   const message=page.querySelector('#backupPreview'),confirm=page.querySelector('#backupConfirm'),button=page.querySelector('#backupApply');
   function show(p){pending=p;confirm.checked=false;confirm.disabled=false;button.disabled=true;const s=p.summary;message.textContent='备份预览：'+s.answered+' 次作答、'+s.learned+' 个已读单元、'+s.questions+' 道题的记录、'+s.mocks+' 次测验历史、'+s.profiles+' 个科目档案。点击确认后替换。';}
   page.querySelector('#backupFile').onchange=async e=>{pending=null;confirm.checked=false;confirm.disabled=true;button.disabled=true;try{const file=e.target.files[0];if(!file)return;if(file.size>5*1024*1024)throw new Error('备份超过 5 MiB。');show(parse(await file.text()));}catch(err){message.textContent=err.message;}};
   page.querySelector('#backupUndo').onclick=()=>{try{show(parse(localStorage.getItem('igcseRecoverySnapshot')));message.textContent='恢复前快照 · '+message.textContent;}catch(err){message.textContent=err.message;}};
   confirm.onchange=()=>{button.disabled=!pending||!confirm.checked;};
   button.onclick=()=>{if(!pending||!confirm.checked)return;try{apply(pending);history.replaceState(null,'','#page-dashboard');location.reload();}catch(err){message.textContent=err.message;}};
   page.querySelector('#backupReturn').onclick=()=>switchPage('page-progress');
  }
  window.addEventListener('igcse-page-change',e=>{if(e.detail.id==='page-backup')render();if(e.detail.id==='page-progress'){const actions=document.querySelector('#page-progress .db-actions');if(actions&&!document.getElementById('importLearningBackup')){const b=document.createElement('button');b.id='importLearningBackup';b.textContent='恢复学习备份';b.onclick=()=>switchPage('page-backup');actions.append(b);}}});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build);else build();
})();
