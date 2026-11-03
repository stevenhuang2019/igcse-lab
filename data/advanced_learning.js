/* Advanced evidence and school plans stay separate from the IGCSE catalogue. */
(function(){
 'use strict';
 const content=()=>window.IGCSE_ADVANCED_CONTENT||[],cp=()=>window.IGCSE_CURRICULUM;
 const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function state(){const s=window.userState;return s.advancedLearning||(s.advancedLearning={records:{},plans:{}});}
 const key=l=>[l.subject,l.code,l.edition,l.id].join(':');
 function matches(l){const p=cp().profile(l.subject);return !!p&&['AS','A Level'].includes(p.qualification)&&p.code===l.code&&p.examYear>=l.startYear&&p.examYear<=l.endYear&&(p.qualification==='A Level'||l.stage==='AS');}
 const status=l=>state().plans[key(l)]?.status||'unstarted';
 const eligible=l=>matches(l);
 const save=()=>window.saveUserState?.(window.userState);
 function plan(id,value,order){const l=content().find(l=>l.id===id);if(!l||!matches(l)||!Object.hasOwn(cp().labels,value)||!Number.isInteger(Number(order))||Number(order)<1||Number(order)>999)throw Error('请使用匹配的考试档案、教学状态和 1–999 的顺序。');state().plans[key(l)]={status:value,order:Number(order)};save();}
 function answer(id,qid,value){const l=content().find(l=>l.id===id),q=l?.questions.find(q=>q.id===qid);if(!q||!eligible(l))throw Error('请先设置匹配的课程代码、年份和阶段；教学状态不会阻止练习。');
  if(typeof value!=='string'||!value.trim()||value.length>10000)throw Error('请填写答案（最多 10000 字符）。');
  if(q.type==='number'&&!Number.isFinite(Number(value)))throw Error('请输入有效数字。');if(q.type==='choice'&&!q.options.includes(value))throw Error('请选择列出的选项。');
  const correct=q.type==='essay'?null:q.type==='number'?Math.abs(Number(value)-Number(q.answer))<=q.tolerance:value===q.answer;
  const records=state().records,k=key(l),record=records[k]||(records[k]={answers:{}}),prev=record.answers[qid];
  record.answers[qid]={value,correct,attempts:(prev?.attempts||0)+1,updatedAt:Date.now()};save();return {correct,reference:q.answer,explain:q.explain,rubric:q.rubric||[]};
 }
 window.IGCSE_ADVANCED={content,key,matches,status,eligible,plan,answer,state};
 function build(){const nav=document.getElementById('mainNav'),main=document.querySelector('main');if(!nav||!main)return;
  const button=document.createElement('button');button.id='advanced-nav';button.className='nav-btn px-3 py-1 rounded';button.dataset.page='page-advanced';button.textContent='AS / A Level';nav.append(button);
  const page=document.createElement('section');page.id='page-advanced';page.className='page';main.append(page);button.onclick=()=>window.switchPage('page-advanced');
  function render(){const subject=document.getElementById('subjectSelect').value,p=cp().profile(subject),all=content().filter(l=>l.subject===subject),lessons=all.filter(matches).sort((a,b)=>(state().plans[key(a)]?.order||999)-(state().plans[key(b)]?.order||999));
   const shown=lessons.length?lessons:all;page.innerHTML='<div class="db-hero"><div><h2>AS / A Level 学习</h2><p>六科首批 12 个入门单元、36 道原创练习。每科含 AS 与 A Level 单元；尚未覆盖完整高级课程。</p></div></div><section class="db-panel"><p id="advancedProfile">'+esc(p?p.qualification+' '+p.code+' · '+p.examYear:'尚未设置本科目考试档案')+'。'+(lessons.length?'本轮匹配 '+lessons.length+' 个单元。':'当前档案没有匹配单元；下方仅供预览，不保存作答或教学状态。')+'</p><button id="advancedProfileLink">设置考试档案／IGCSE 补基础</button><p>按学校实际章节安排，不自动把 Y12／Y13 当作已学。高级课程作答与教学安排独立保存、随学习 JSON 备份；IGCSE 掌握度不受影响。开放回答只保存和提供参考，不自动给正式考试分数。</p></section><div id="advancedLessons">'+shown.map((l,i)=>{
    const active=matches(l),r=state().records[key(l)]?.answers||{},unique=Object.keys(r).length;
    return '<article class="db-panel" data-advanced-lesson="'+esc(l.id)+'"><h3>'+esc(l.stage+' · '+l.title)+'</h3><p>'+esc(l.code+' · '+l.edition+' · '+l.syllabusRef)+' · <a target="_blank" rel="noopener noreferrer" href="'+esc(l.sourceUrl)+'#page='+l.sourcePage+'">官方大纲第 '+l.sourcePage+' 页</a></p><p data-advanced-count>本单元保存 '+unique+' / '+l.questions.length+' 道题的回答；重复提交保留最新答案。</p><div class="curriculum-row"><label>教学状态<select data-advanced-status '+(!active?'disabled':'')+'>'+Object.entries(cp().labels).map(([v,n])=>'<option value="'+v+'" '+(status(l)===v?'selected':'')+'>'+esc(n)+'</option>').join('')+'</select></label><label>学校顺序<input data-advanced-order type="number" min="1" max="999" value="'+(state().plans[key(l)]?.order||i+1)+'" '+(!active?'disabled':'')+'></label><button data-advanced-plan '+(!active?'disabled':'')+'>保存高级章节安排</button></div><p data-advanced-message role="status">'+(!active?'预览：请检查科目、代码、年份和课程阶段。':eligible(l)?'教学状态：'+cp().labels[status(l)]+' · 可自由练习和保存。':'请检查课程代码、年份与阶段。')+'</p><details data-advanced-notes><summary>课程讲解与示例</summary><h4>学习目标</h4><ul>'+l.objectives.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul>'+l.notes.map(x=>'<p>'+esc(x)+'</p>').join('')+'<h4>示例推导</h4><p>'+esc(l.workedExample)+'</p></details><details data-advanced-practice><summary>练习本单元 · '+l.questions.length+' 题</summary>'+l.questions.map(q=>'<form data-advanced-question="'+esc(q.id)+'"><label>'+esc(q.question)+(q.type==='choice'?'<select name="answer"><option value="">选择答案</option>'+q.options.map(x=>'<option '+(r[q.id]?.value===x?'selected':'')+' value="'+esc(x)+'">'+esc(x)+'</option>').join('')+'</select>':q.type==='essay'?'<textarea name="answer" rows="4" maxlength="10000">'+esc(r[q.id]?.value||'')+'</textarea>':'<input name="answer" type="text" inputmode="decimal" value="'+esc(r[q.id]?.value||'')+'">')+'</label><button type="submit" '+(!eligible(l)?'disabled':'')+'>'+(q.type==='essay'?'保存回答并查看参考':'检查并保存')+'</button><p data-advanced-feedback role="status">'+(r[q.id]?esc(r[q.id].correct===null?'已保存，未自动评分。':r[q.id].correct?'上次答案正确。':'上次答案需要复习。'):'')+'</p></form>').join('')+'</details></article>';
   }).join('')+'</div>';
   page.querySelector('#advancedProfileLink').onclick=()=>window.switchPage('page-curriculum');
   page.querySelectorAll('[data-advanced-plan]').forEach(b=>b.onclick=()=>{const row=b.closest('[data-advanced-lesson]');try{plan(row.dataset.advancedLesson,row.querySelector('[data-advanced-status]').value,row.querySelector('[data-advanced-order]').value);render();}catch(e){row.querySelector('[data-advanced-message]').textContent=e.message;}});
   page.querySelectorAll('[data-advanced-question]').forEach(form=>form.onsubmit=e=>{e.preventDefault();const row=form.closest('[data-advanced-lesson]'),feedback=form.querySelector('[data-advanced-feedback]');try{const r=answer(row.dataset.advancedLesson,form.dataset.advancedQuestion,form.elements.answer.value);const lesson=content().find(l=>l.id===row.dataset.advancedLesson);row.querySelector('[data-advanced-count]').textContent='本单元保存 '+Object.keys(state().records[key(lesson)].answers).length+' / '+lesson.questions.length+' 道题的回答；重复提交保留最新答案。';feedback.textContent=(r.correct===null?'已保存，未自动评分。':r.correct?'答案正确。':'答案需要复习。')+' 参考：'+r.reference+' '+r.explain+(r.rubric.length?' 核对要点：'+r.rubric.join('；'):'');}catch(err){feedback.textContent=err.message;}});
   window.IGCSE_DISCOVERY?.enhancePage('page-advanced');
  }
  window.addEventListener('igcse-page-change',e=>{if(e.detail.id==='page-advanced')render();});document.getElementById('subjectSelect').addEventListener('change',()=>{if(page.classList.contains('active'))render();});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build);else build();
})();
