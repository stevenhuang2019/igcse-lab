/* Explicit school pacing import: validate the complete plan before replacing statuses. */
(function(){
 'use strict';
 const cp=()=>window.IGCSE_CURRICULUM;
 function parse(subject,text){
  if(typeof text!=='string'||text.length>100000)throw Error('安排过长，请限制在 100 KB 内。');
  const p=cp().profile(subject);if(!p)throw Error('请先保存本科目的考试档案。');
  const lines=text.trim().split(/\r?\n/);if(lines.shift()!=='topicId,status,order')throw Error('首行应为 topicId,status,order。');
  if(!lines.length||lines.length>500)throw Error('请提供 1–500 行章节安排。');
  const known=new Set(cp().ordered(subject).map(t=>t.topicId)),seen=new Set(),ranks=new Set();
  return lines.map((line,i)=>{const fields=line.split(',');if(fields.length!==3)throw Error('第 '+(i+2)+' 行应有三列。');const [topicId,status,raw]=fields.map(v=>v.trim()),order=Number(raw);
   if(!known.has(topicId)||seen.has(topicId)||!Object.hasOwn(cp().labels,status)||!/^\d+$/.test(raw)||!Number.isInteger(order)||order<1||order>999||ranks.has(order))throw Error('第 '+(i+2)+' 行的章节、状态或顺序无效／重复。');seen.add(topicId);ranks.add(order);return {topicId,status,order};});
 }
 function apply(subject,text){const rows=parse(subject,text),p=cp().profile(subject);p.statuses={...(p.statuses||{})};p.order={...(p.order||{})};for(const row of rows){p.statuses[row.topicId]=row.status;p.order[row.topicId]=row.order;}cp().changed();return rows.length;}
 const template=subject=>'topicId,status,order\n'+cp().ordered(subject).map((t,i)=>[t.topicId,cp().status(subject,t.topicId),cp().profile(subject)?.order?.[t.topicId]||i+1].join(',')).join('\n');
 window.IGCSE_SCHOOL_IMPORT={parse,apply,template};
 function render(){
  const page=document.getElementById('page-curriculum');if(!page?.classList.contains('active'))return;
  const subject=document.getElementById('subjectSelect').value,box=document.createElement('section');box.className='db-panel';box.id='schoolImportPanel';
  page.querySelector('#schoolImportPanel')?.remove();box.innerHTML='<h3>批量安排学校章节</h3><p>复制模板，按学校实际进度编辑后预览。只更新列出的 IGCSE 章节／补基础章节，不改变作答、掌握度或其他科目。状态：unstarted 未教、current 正在学、taught 已教、review 复习。AS/A Level 单元在高级课程入口单独安排。</p><button id="schoolTemplate">填写本科目模板</button><label>章节安排文本<textarea id="schoolPlanText" rows="8" placeholder="topicId,status,order"></textarea></label><button id="schoolPreview">检查安排</button><p id="schoolImportMessage" role="status"></p><label><input id="schoolConfirm" type="checkbox" disabled> 我已核对这些章节的学校进度</label><button id="schoolApply" disabled>保存这些章节安排</button>';
  page.append(box);let approved=null;const text=box.querySelector('textarea'),message=box.querySelector('[role=status]'),confirm=box.querySelector('#schoolConfirm'),button=box.querySelector('#schoolApply');
  const invalidate=()=>{approved=null;confirm.checked=false;confirm.disabled=true;button.disabled=true;};text.oninput=invalidate;
  box.querySelector('#schoolTemplate').onclick=()=>{text.value=template(subject);invalidate();message.textContent='模板保留当前状态；请按实际教学进度修改。';};
  box.querySelector('#schoolPreview').onclick=()=>{invalidate();try{const rows=parse(subject,text.value);approved=text.value;confirm.disabled=false;message.textContent='通过检查：'+rows.length+' 个章节，其中 '+rows.filter(r=>r.status==='current').length+' 个正在学。确认后保存。';}catch(e){message.textContent=e.message;}};
  confirm.onchange=()=>{button.disabled=!confirm.checked||approved!==text.value;};button.onclick=()=>{if(!confirm.checked||approved!==text.value)return;try{const count=apply(subject,approved);invalidate();message.textContent='已保存 '+count+' 个章节；学习记录和其他科目保留。';window.switchPage('page-curriculum');}catch(e){message.textContent=e.message;}};
 }
 function welcome(){const page=document.getElementById('page-dashboard');if(!page?.classList.contains('active'))return;page.querySelector('#learnerWelcome')?.remove();const box=document.createElement('section');box.id='learnerWelcome';box.className='db-panel';box.innerHTML='<h3>新学员开始使用</h3><p>使用自己的受邀账号。先设置考试代码、年份与年级，再标记学校当前／已教章节，最后定期导出学习备份。共享设备请为每位学员使用独立浏览器档案。</p><button id="welcomeProfile">设置我的学校进度</button><button id="welcomeBackup">学习记录与备份</button><button id="welcomeAdvanced">AS / A Level 课程</button>';page.append(box);box.querySelector('#welcomeProfile').onclick=()=>window.switchPage('page-curriculum');box.querySelector('#welcomeBackup').onclick=()=>window.switchPage('page-progress');box.querySelector('#welcomeAdvanced').onclick=()=>window.switchPage('page-advanced');}
 window.addEventListener('igcse-page-change',e=>{if(e.detail.id==='page-curriculum')render();if(e.detail.id==='page-dashboard')welcome();});
 window.addEventListener('igcse-curriculum-rendered',render);
 function build(){document.getElementById('subjectSelect')?.addEventListener('change',render);welcome();}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build);else build();
})();
