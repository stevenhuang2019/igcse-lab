/* School pacing is independent of reading history and mastery evidence. */
(function(){
 'use strict';
 const names={math:'数学',physics:'物理',chemistry:'化学',dt:'D&T',business:'Business',computer_science:'Computer Science',english:'English ESL'};
 const advancedCodes={math:'9709',physics:'9702',chemistry:'9701',dt:'9705',business:'9609',computer_science:'9618',english:'9093'};
 const labels={unstarted:'未教',current:'正在学',taught:'已教',review:'复习'};
 const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const catalog=()=>window.IGCSE_CATALOG;
 function state(){const s=window.userState;s.curriculum=s.curriculum||{yearGroup:10,term:1,subjects:{}};s.curriculum.subjects=s.curriculum.subjects||{};return s.curriculum;}
 function profile(subject){return state().subjects[subject]||null;}
 function status(subject,id){return profile(subject)?.statuses?.[id]||'unstarted';}
 function advanced(subject){return (profile(subject)?.qualification||(+state().yearGroup>=12?'AS':'IGCSE'))!=='IGCSE';}
 function edition(subject){
  const p=profile(subject),r=window.getIGCSERegistry?.(subject)||window.IGCSE_SYLLABUS_REGISTRY?.[subject];
  if(!p)return {matches:!advanced(subject),message:advanced(subject)?'AS/A Level 课程待建设；本站内容为 IGCSE 补基础。':'尚未设置考试档案；目前显示本站 IGCSE 内容。'};
  if(advanced(subject))return {matches:false,message:'已选择 '+p.qualification+' '+p.code+'；独立高级课程待建设，本站题目仅用于 IGCSE 补基础。'};
  const years=(r?.year||'').split('-').map(Number),matches=p.code===r?.code&&p.examYear>=years[0]&&p.examYear<=(years[1]||years[0]);
  return {matches,message:matches?'目标 '+p.examYear+' · '+p.code+' 与本站登记版本一致；完整考纲细目仍待审核。':'目标 '+p.examYear+' · '+p.code+' 尚未完成映射；现有 '+(r?.code||'')+' '+(r?.year||'')+' 内容仅作基础参考。'};
 }
 function topicAllowed(subject,t){if(subject!=='business')return true;return (profile(subject)?.code==='0450'?t.syllabus!=='0264':t.syllabus==='0264');}
 function questionAllowed(q){return q.subject!=='business'||topicAllowed('business',catalog().topic('business',q.topicId)||{});}
 function ordered(subject){return catalog().topicsFor(subject).filter(t=>topicAllowed(subject,t)).slice().sort((a,b)=>(profile(subject)?.order?.[a.topicId]??9999)-(profile(subject)?.order?.[b.topicId]??9999));}
 function eligible(subject,id){if(!topicAllowed(subject,catalog().topic(subject,id)||{}))return false;const p=profile(subject);if(!p)return !advanced(subject);return (!advanced(subject)&&edition(subject).matches||p.foundation===true)&&status(subject,id)!=='unstarted';}
 function priority(subject,id){return ({current:0,review:1,taught:2,unstarted:3})[status(subject,id)];}
 function practiceTopics(subject,scope){const p=profile(subject);if(advanced(subject)&&!p?.foundation)return [];return ordered(subject).filter(t=>scope==='all'||(!p&&!advanced(subject))||status(subject,t.topicId)!=='unstarted');}
 function changed(){
  const s=window.userState;Object.values(s.dailyPlan||{}).forEach(d=>{d.tasks=null;d.pendingTask=null;});
  window.saveUserState?.(s);window.dispatchEvent?.(new CustomEvent('igcse-curriculum-change'));
  window.dispatchEvent?.(new CustomEvent('igcse-dashboard-refresh'));
 }
 function setProfile(subject,input){
  if(!catalog().subjects.includes(subject))throw new Error('Unknown subject');
  const examYear=Number(input.examYear),qualification=input.qualification;
  if(!Number.isInteger(examYear)||examYear<2026||examYear>2040||!['IGCSE','AS','A Level'].includes(qualification))throw new Error('Invalid exam profile');
  const codes={math:['0580'],physics:['0625'],chemistry:['0620'],dt:['0445'],business:['0450','0264'],computer_science:['0478'],english:['0510','0511','0500']};
  if(!(qualification==='IGCSE'?codes[subject]:[advancedCodes[subject],...(subject==='english'&&qualification==='AS'?['8021']:[])]).includes(input.code))throw new Error('Invalid syllabus code');
  state().subjects[subject]={...(profile(subject)||{}),examYear,qualification,code:input.code,foundation:input.foundation===true};changed();
 }
 function setTopic(subject,id,value,order){
  if(!catalog().topic(subject,id)||!labels[value])throw new Error('Invalid topic status');
  const p=profile(subject);if(!p)throw new Error('Save exam profile first');
  const rank=Number(order);if(!Number.isInteger(rank)||rank<1||rank>999)throw new Error('Invalid teaching order');
  p.statuses=p.statuses||{};p.order=p.order||{};p.statuses[id]=value;p.order[id]=rank;changed();
 }
 function matrix(subject){
  const audit=window.getIGCSESyllabusAudit(subject);
  return {subject,targetProfile:profile(subject),edition:edition(subject),scope:'outline-samples-not-exhaustive-objectives',sourceUrl:audit.sourceUrl,registeredCode:audit.code,registeredEdition:audit.year,sections:audit.sections.map(section=>({ref:section.ref,label:section.label,status:section.status,practiceCount:section.practiceCount,preparationCount:section.preparationCount,questionIds:section.questionIds,lessons:section.topicIds.map(id=>{const t=catalog().topic(subject,id);return {topicId:id,title:t.title,schoolStatus:status(subject,id),objectives:t.objectives||[],objectiveRefs:t.objectiveRefs||[t.syllabusRef||section.ref],tier:t.tier||'unclassified',prerequisites:t.prerequisites||[],practiceLevels:t.practiceLevels||[],reviewStatus:t.reviewStatus||'not-fully-audited'};})}))};
 }
 window.IGCSE_CURRICULUM={state,profile,status,advanced,edition,ordered,eligible,priority,practiceTopics,setProfile,setTopic,labels,changed,matrix,questionAllowed};
 function build(){
  const nav=document.getElementById('mainNav'),main=document.querySelector('main');if(!nav||!main)return;
  const b=document.createElement('button');b.id='curriculum-nav';b.dataset.page='page-curriculum';b.className='nav-btn px-3 py-1 rounded';b.textContent='教学安排';nav.append(b);
  const page=document.createElement('section');page.id='page-curriculum';page.className='page';main.append(page);b.onclick=()=>switchPage('page-curriculum');
  function render(){
   const subject=document.getElementById('subjectSelect').value,p=profile(subject),s=state(),r=window.getIGCSERegistry?.(subject)||window.IGCSE_SYLLABUS_REGISTRY[subject];
   const opts=(values,value)=>values.map(([v,n])=>'<option value="'+esc(v)+'" '+(String(v)===String(value)?'selected':'')+'>'+esc(n)+'</option>').join('');
   const igcseCodes={english:[['0510','0510 ESL'],['0511','0511 ESL'],['0500','0500 First Language（待建设）']],business:[['0264','0264 · 2027 起'],['0450','0450 · 2026']]}[subject]||[[r.code,r.code]];
   const codeOptions=q=>q==='IGCSE'?igcseCodes:[[advancedCodes[subject],advancedCodes[subject]+' · 高级课程待建设'],...(subject==='english'&&q==='AS'?[['8021','8021 · AS General Paper（待建设）']]:[])];
   const codes=codeOptions(p?.qualification||(+s.yearGroup>=12?'AS':'IGCSE'));
   page.innerHTML='<div class="db-hero"><div><h2>教学安排 · '+names[subject]+'</h2><p>让学习计划跟随学校当前章节；教学状态不等于个人掌握。</p></div></div><section class="db-panel"><h3>年级与考试档案</h3><form id="curriculumForm" class="curriculum-form"><label>年级<select id="curriculumYear">'+opts([10,11,12,13].map(n=>[n,'Y'+n]),s.yearGroup)+'</select></label><label>学期<select id="curriculumTerm">'+opts([1,2,3].map(n=>[n,'第 '+n+' 学期']),s.term)+'</select></label><label>本科目阶段<select id="curriculumQualification">'+opts(['IGCSE','AS','A Level'].map(n=>[n,n]),p?.qualification||(+s.yearGroup>=12?'AS':'IGCSE'))+'</select></label><label>目标考试年份<input id="curriculumExamYear" type="number" min="2026" max="2040" required value="'+(p?.examYear||new Date().getFullYear()+1)+'"></label><label>科目代码<select id="curriculumCode">'+opts(codes,p?.code||codes[0][0])+'</select></label><label><input type="checkbox" id="curriculumFoundation" '+(p?.foundation?'checked':'')+'> 允许推荐 IGCSE 补基础（旧版／高级阶段）</label><button type="submit">保存学习安排</button><p id="curriculumMessage" role="status"></p></form><p id="curriculumEdition">'+esc(edition(subject).message)+'</p><p>按考试年份选考纲。Business 0264 已有新版章节样例，完整细目仍待补；D&T 2027、2028–2030 及数学 2028–2030 需分别核对。选择档案不会自动完成新版映射。</p><a href="'+esc(subject==='business'?'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-business-0264/':subject==='dt'?'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-design-and-technology-0445/':r.sourceUrl)+'" target="_blank" rel="noopener">核对官方考纲</a></section><section class="db-panel"><button id="curriculumExport">导出考纲与章节建设清单</button><h3>学校章节进度 · IGCSE'+(advanced(subject)?' 补基础':'')+'</h3><p>先保存考试档案，再按学校课表标记章节并调整顺序。未教章节可浏览预习，但不进入常规每日任务。AS/A Level 独立课程尚未建设。</p><div class="db-topics">'+ordered(subject).map((t,i)=>'<article data-curriculum-topic="'+esc(t.topicId)+'"><div><b>'+esc(t.title)+'</b><small>'+esc(t.chapter)+'</small></div><div class="curriculum-row"><label>教学状态<select data-curriculum-status '+(!p?'disabled':'')+'>'+opts(Object.entries(labels),status(subject,t.topicId))+'</select></label><label>顺序<input data-curriculum-order type="number" min="1" max="999" value="'+(p?.order?.[t.topicId]||i+1)+'" '+(!p?'disabled':'')+'></label><button data-curriculum-save '+(!p?'disabled':'')+'>保存章节</button></div></article>').join('')+'</div></section>';
   page.querySelector('#curriculumExport').onclick=()=>{const url=URL.createObjectURL(new Blob([JSON.stringify(matrix(subject),null,2)],{type:'application/json'}));const link=document.createElement('a');link.href=url;link.download='igcse-curriculum-'+subject+'.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
   page.querySelector('#curriculumForm').onsubmit=e=>{e.preventDefault();try{setProfile(subject,{qualification:page.querySelector('#curriculumQualification').value,code:page.querySelector('#curriculumCode').value,examYear:page.querySelector('#curriculumExamYear').value,foundation:page.querySelector('#curriculumFoundation').checked});s.yearGroup=+page.querySelector('#curriculumYear').value;s.term=+page.querySelector('#curriculumTerm').value;changed();render();page.querySelector('#curriculumMessage').textContent='已保存。请继续标记学校正在学习的章节。';}catch(err){page.querySelector('#curriculumMessage').textContent=err.message;}};
   page.querySelector('#curriculumQualification').onchange=e=>{const choices=codeOptions(e.target.value);page.querySelector('#curriculumCode').innerHTML=opts(choices,choices[0][0]);};
   page.querySelectorAll('[data-curriculum-save]').forEach(button=>button.onclick=()=>{const row=button.closest('[data-curriculum-topic]');try{setTopic(subject,row.dataset.curriculumTopic,row.querySelector('select').value,row.querySelector('input').value);render();}catch(err){page.querySelector('#curriculumMessage').textContent=err.message;}});
  }
  window.addEventListener('igcse-page-change',e=>{if(e.detail.id==='page-curriculum')render();});
  document.getElementById('subjectSelect').addEventListener('change',()=>{if(page.classList.contains('active'))render();});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build);else build();
})();
