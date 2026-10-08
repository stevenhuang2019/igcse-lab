/* Progress UX: explain evidence, separate preparation and give a concrete next action. */
(function(){
 'use strict';
 const names={math:'数学',physics:'物理',chemistry:'化学',dt:'设计 DT',business:'商业研究',computer_science:'计算机科学',english:'英语 ESL'};
 const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function model(subject){
  const topics=window.IGCSE_CATALOG.topicsFor(subject).map(t=>({...t,evidence:window.getTopicMasteryEvidence(t.topicId,subject)}));
  const now=new Date(),days=[];
  for(let i=6;i>=0;i--){const date=new Date(now.getFullYear(),now.getMonth(),now.getDate()-i),key=window.IGCSE_DASHBOARD.localDate(date),a=window.userState.activityByDay?.[key]?.[subject];days.push({date:key,answered:a?.answered||0,correct:a?.correct||0});}
  return {subject,topics,days,summary:window.IGCSE_DASHBOARD.summary(subject)};
 }
 window.IGCSE_PROGRESS_VIEW={model};
 function build(){
  const nav=document.getElementById('mainNav'),main=document.querySelector('main');if(!nav||!main)return;
  const b=document.createElement('button');b.className='nav-btn px-3 py-1 rounded';b.dataset.page='page-progress';b.id='progress-nav';b.textContent='学习进度';nav.append(b);
  const page=document.createElement('section');page.id='page-progress';page.className='page';main.append(page);b.onclick=()=>switchPage('page-progress');
  function render(){
   const subject=document.getElementById('subjectSelect').value,m=model(subject),s=m.summary;
   page.innerHTML='<div class="db-hero"><div><p class="section-label">LEARNING PROGRESS</p><h2>'+esc(names[subject])+' · 学习进度</h2><p>把练习记录变成下一步行动</p></div><div><strong>'+s.mastery+'%</strong><p>平均掌握估计，包含未开始主题</p></div></div>'+
    '<section class="db-panel"><h3>这份估计如何计算</h3><p>起点评估 20%、累计练习 30%、最近作答 20%、官方试题记录 20%、间隔复习 10%。仅使用已测量的维度，按其权重重新归一；未测量项显示“未测量”，不补默认分。</p><p>高分但样本少会标为“样本有限”。至少完成 5 次客观作答，并练过本站该主题最多 5 道不同客观题，估计达 85% 后才显示“练习表现稳固”。这不是官方考试等级；自评和准备练习另列。</p><div class="db-actions"><button id="progressDashboard">返回学习驾驶舱</button><button id="exportLearningBackup">导出学习备份</button></div></section>'+
    '<section class="db-panel"><h3>最近七天的作答</h3><p>从本版本开始记录；旧记录不补造每日历史。</p><ol class="progress-days">'+m.days.map(d=>'<li><time>'+esc(d.date.slice(5))+'</time><b>'+d.answered+' 次</b><span>正确 '+d.correct+' 次</span></li>').join('')+'</ol></section>'+
    '<section class="db-panel"><h3>各主题的依据与下一步</h3><label class="db-audit-filter">显示主题 <select id="progressFilter"><option value="all">全部</option><option value="limited">样本有限或尚未开始</option><option value="review">需要巩固</option><option value="established">练习表现稳固</option></select></label><div class="db-topics">'+m.topics.map(t=>{const e=t.evidence;return '<article data-progress-topic="'+esc(t.topicId)+'" data-progress-band="'+(e.established?'established':e.objectiveAttempts<5?'limited':'review')+'"><div><b>'+esc(t.title)+'</b><small>'+e.score+'% · '+e.band+'</small><small>客观作答 '+e.objectiveAttempts+' 次 · 不同客观题 '+e.objectiveUnique+'/'+e.objectivePool+' · 自评 '+e.selfAssessed+' 次 · 准备练习 '+e.preparation+' 次</small><details><summary>查看计算依据</summary><ul>'+e.dimensions.map(d=>'<li>'+d.label+'：'+(d.score===null?'未测量':d.score+'%')+'（基础权重 '+d.weight+'%）</li>').join('')+'</ul></details></div><div class="db-actions"><button data-progress-practice="'+esc(t.topicId)+'">'+(e.objectiveAttempts?'继续巩固':'开始练习')+'</button></div></article>';}).join('')+'</div><p id="progressEmpty" hidden>当前筛选没有主题。</p></section>';
   page.querySelector('#progressDashboard').onclick=()=>switchPage('page-dashboard');
   page.querySelectorAll('[data-progress-practice]').forEach(x=>x.onclick=()=>gotoTopicPractice(x.dataset.progressPractice));
   page.querySelector('#progressFilter').onchange=e=>{let visible=0;page.querySelectorAll('[data-progress-topic]').forEach(row=>{row.hidden=e.target.value!=='all'&&row.dataset.progressBand!==e.target.value;if(!row.hidden)visible++;});page.querySelector('#progressEmpty').hidden=visible>0;};
   page.querySelector('#exportLearningBackup').onclick=()=>{const url=URL.createObjectURL(new Blob([JSON.stringify(window.userState,null,2)],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download='igcse-learning-backup-'+window.IGCSE_DASHBOARD.localDate()+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
  }
  window.addEventListener('igcse-page-change',e=>{if(e.detail.id==='page-progress')render();});
  document.getElementById('subjectSelect').addEventListener('change',()=>{if(page.classList.contains('active'))render();});
  window.addEventListener('igcse-answer-recorded',()=>{if(page.classList.contains('active'))render();});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build);else build();
})();
