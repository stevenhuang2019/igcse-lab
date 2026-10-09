/* Advisory prerequisites and resumable sample diagnostics follow the school profile. */
(function(){
 'use strict';
 const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const cat=()=>window.IGCSE_CATALOG,cp=()=>window.IGCSE_CURRICULUM;
 const state=()=>window.userState.learningPath||(window.userState.learningPath={runs:{}});
 const signature=subject=>JSON.stringify({yearGroup:cp().state().yearGroup,profile:cp().profile(subject)});
 const save=()=>window.saveUserState?.(window.userState);
 function pool(subject){return (window.IGCSE_SKILL_DEPTH_QUESTIONS||[]).filter(q=>q.subject===subject&&cp().eligible(subject,q.topicId)&&cp().questionAllowed(q));}
 function run(subject){const r=state().runs[subject];if(r&&r.signature!==signature(subject)&&!r.invalidated){r.invalidated=true;save();}return r;}
 function prerequisites(topic){return (topic.prerequisites||[]).map(id=>cat().topics.find(t=>t.topicId===id)).filter(Boolean);}
 function needs(topic){return prerequisites(topic).filter(t=>!window.getTopicMasteryEvidence(t.topicId,t.subject).established);}
 function repairPriority(subject,id){const r=run(subject);if(!r||r.invalidated)return 0;return r.qids.some(qid=>r.answers[qid]===false&&cat().question(qid)?.topicId===id)?-1:0;}
 function summary(subject){const r=run(subject);if(!r)return null;const answered=r.qids.filter(id=>Object.hasOwn(r.answers,id)),correct=answered.filter(id=>r.answers[id]).length;return {...r,answered:answered.length,correct,complete:answered.length===r.qids.length,preparation:subject==='english'};}
 function start(subject,resume=false){
  if(window.userState.mockExams?.activePractice){window.showToast?.('请先继续或交卷当前模拟考');return false;}
  let r=run(subject);
  if(!resume||!r||r.invalidated){const qids=pool(subject).map(q=>q.id);if(!qids.length)return false;r={subject,qids,answers:{},signature:signature(subject),startedAt:new Date().toISOString()};}
  const remaining=r.qids.filter(id=>!Object.hasOwn(r.answers,id));if(!remaining.length)return false;
  window.setCurrentSubjectSafe(subject);
  const sessionId=window.startSessionFromIds(remaining,'normal',{subject,noShuffle:true,label:subject==='english'?'英语准备性阶段检查':'章节样例阶段诊断'});
  if(!sessionId)return false;Object.values(window.userState.dailyPlan||{}).forEach(d=>{d.pendingTask=null;});r.sessionId=sessionId;state().runs[subject]=r;save();return true;
 }
 function record(d){const r=run(d.subject);if(!r||r.invalidated||d.sessionId!==r.sessionId||!r.qids.includes(d.qid)||Object.hasOwn(r.answers,d.qid))return;r.answers[d.qid]=!!d.correct;if(r.qids.every(id=>Object.hasOwn(r.answers,id)))r.completedAt=new Date().toISOString();Object.values(window.userState.dailyPlan||{}).forEach(d=>{d.tasks=null;});save();}
 window.IGCSE_LEARNING_PATH={pool,run,summary,start,record,needs,prerequisites,repairPriority};
 window.addEventListener('igcse-answer-recorded',e=>record(e.detail||{}));
 function build(){
  const nav=document.getElementById('mainNav'),main=document.querySelector('main');if(!nav||!main)return;
  const b=document.createElement('button');b.id='path-nav';b.dataset.page='page-path';b.className='nav-btn px-3 py-1 rounded';b.textContent='学习路径';nav.append(b);
  const page=document.createElement('section');page.id='page-path';page.className='page';main.append(page);b.onclick=()=>switchPage('page-path');
  function render(){
   const subject=document.getElementById('subjectSelect').value,ts=cp().ordered(subject).filter(t=>cp().eligible(subject,t.topicId)),r=summary(subject),questions=pool(subject);
   const learnButton=t=>'<button data-path-learn="'+esc(t.topicId)+'">学习 '+esc(t.title)+'</button>';
   const wrong=r&&!r.invalidated?r.qids.filter(id=>r.answers[id]===false).map(id=>cat().question(id)):[];
   page.innerHTML='<div class="db-hero"><div><h2>学习路径与阶段检查</h2><p>跟随学校已教和正在学的章节，先补基础，再做应用与综合任务。</p></div></div><section class="db-panel"><p>'+esc(cp().edition(subject).message)+'</p><p>先修关系是本站教学建议，不是考试局或学校规定；未教基础会显示提示，仍由你决定是否预习。高级阶段这里只提供已允许的 IGCSE 补基础。</p><button id="pathCurriculum">设置学校进度</button></section><section class="db-panel" id="pathDiagnostic"><h3>'+(subject==='english'?'英语准备性阶段检查':'章节样例阶段诊断')+'</h3><p>当前有 '+questions.length+' 道可用分层检查题。仅检查本站已补充的章节样例，结果不代表完整考纲、正式作文／听说能力或考试等级。逐题作答后记录，可退出并继续未答题。</p><button id="pathStart" '+(!questions.length?'disabled':'')+'>开始新检查</button>'+(r&&!r.complete&&!r.invalidated?'<button id="pathResume">继续未答检查</button>':'')+(r?'<p id="pathResult" role="status">'+(r.invalidated?'学习档案已改变；旧结果保留作参考，请重新检查。':'本次已答 '+r.answered+'/'+r.qids.length+'，正确 '+r.correct+' 道'+(r.complete?' · 本次检查完成':' · 尚未完成'))+'</p>':'<p>尚未开始阶段检查。</p>')+(wrong.length?'<h4>建议复习</h4>'+wrong.map(q=>'<article><p>'+esc(q.question)+'</p><p>'+esc(q.explain)+'</p>'+learnButton(cat().topic(q.subject,q.topicId))+'</article>').join(''):'')+'</section><section class="db-panel"><h3>按学校进度学习</h3>'+(ts.length?'':'<p>本科目没有符合安排的章节。请先配置档案并标记正在学、已教或复习；D&T 本轮未新增分层检查题。</p>')+ts.map(t=>{const pending=needs(t),qs=(window.IGCSE_SKILL_DEPTH_QUESTIONS||[]).filter(q=>q.topicId===t.topicId);return '<article data-path-topic="'+esc(t.topicId)+'"><h4>'+esc(t.title)+'</h4><p>'+esc(cp().labels[cp().status(subject,t.topicId)])+' · '+esc(t.tier||'层级待核对')+'</p>'+(pending.length?'<p>建议先补：'+pending.map(p=>esc(p.title)+(cp().eligible(p.subject,p.topicId)?'':'（尚未纳入学校安排，可自主预习）')).join('、')+'</p><div class="db-actions">'+pending.map(learnButton).join('')+'</div>':'<p>没有待提示的本站先修单元；不代表完整基础已掌握。</p>')+'<div class="db-actions">'+learnButton(t)+['basic','application','integrated'].map((level,i)=>{const ids=qs.filter(q=>q.practiceLevel===level);return ids.length?'<button data-path-practice="'+esc(t.topicId)+'" data-path-level="'+level+'">'+['基础','应用','综合'][i]+' · '+ids.length+' 题</button>':'';}).join('')+'</div></article>';}).join('')+'</section>';
   page.querySelector('#pathCurriculum').onclick=()=>switchPage('page-curriculum');
   page.querySelector('#pathStart').onclick=()=>start(subject);
   const resume=page.querySelector('#pathResume');if(resume)resume.onclick=()=>start(subject,true);
   page.querySelectorAll('[data-path-learn]').forEach(b=>b.onclick=()=>{const t=cat().topics.find(t=>t.topicId===b.dataset.pathLearn);setCurrentSubjectSafe(t.subject);renderTopicList();switchPage('page-textbook');openTopic(t);});
   page.querySelectorAll('[data-path-practice]').forEach(b=>b.onclick=()=>{if(window.userState.mockExams?.activePractice){showToast('请先继续或交卷当前模拟考');return;}const ids=pool(subject).filter(q=>q.topicId===b.dataset.pathPractice&&q.practiceLevel===b.dataset.pathLevel).map(q=>q.id);if(ids.length)startSessionFromIds(ids,'normal',{subject,label:'分层练习',noShuffle:true});});
  }
  window.addEventListener('igcse-page-change',e=>{if(e.detail.id==='page-path')render();});
  document.getElementById('subjectSelect').addEventListener('change',()=>{if(page.classList.contains('active'))render();});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build);else build();
})();
