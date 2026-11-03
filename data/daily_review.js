/* Local review excerpts only. Assisted corrections never count as independent recall. */
(function(){
 'use strict';
 const storeKey='igcseWritingReview',DAY=864e5;
 const normal=s=>String(s||'').trim().replace(/\s+/g,' ');
 function read(){try{const rows=JSON.parse(localStorage.getItem(storeKey)||'[]');return Array.isArray(rows)?rows.filter(r=>r&&typeof r.id==='string'&&typeof r.original==='string'&&typeof r.replacement==='string').slice(-100):[];}catch{return [];}}
 function write(rows){localStorage.setItem(storeKey,JSON.stringify(rows.slice(-100)));}
 function capture(corrections,now=Date.now()){
  const rows=read();for(const c of (Array.isArray(corrections)?corrections:[]).slice(0,20)){
   if(typeof c.original!=='string'||typeof c.replacement!=='string'||!c.original.trim()||!c.replacement.trim()||c.original.length>300||c.replacement.length>300||normal(c.original)===normal(c.replacement))continue;
   if(rows.some(r=>normal(r.original)===normal(c.original)&&normal(r.replacement)===normal(c.replacement)))continue;
   let id='writing_'+now+'_'+rows.length;while(rows.some(r=>r.id===id))id+='x';
   rows.push({id,original:c.original,replacement:c.replacement,explanation:String(c.explanation||'').slice(0,500),due:now,correct:0});
  }write(rows);
 }
 function writing(now=Date.now()){return read().filter(r=>Number(r.due||0)<=now).sort((a,b)=>a.due-b.due);}
 function vocabulary(now=Date.now()){
  const arcade=window.IGCSE_ARCADE,records=window.userState?.vocabArcade?.records||{};
  return (arcade?.words()||[]).filter(v=>{const r=records[arcade.key(v)];return r&&!r.mastered&&(r.flagged||r.wrong>0)&&Number(r.nextReviewAt||0)<=now;}).sort((a,b)=>Number(records[arcade.key(a)].nextReviewAt||0)-Number(records[arcade.key(b)].nextReviewAt||0));
 }
 function attempt(id,text,assisted=false,now=Date.now()){
  const rows=read(),r=rows.find(r=>r.id===id);if(!r)return false;
  if(assisted||normal(text)!==normal(r.replacement))return false;
  r.correct=(r.correct||0)+1;r.due=now+DAY*[1,3,7,14][Math.min(r.correct-1,3)];write(rows);
  finish('writing-review',id);return true;
 }
 function chapterMistakes(now=Date.now()){
  const unique=new Set();return (window.userState?.mistakes||[]).flatMap(m=>{
   if(!m)return [];
   const qid=typeof m==='string'?m:m.questionId||m.qid,q=window.IGCSE_CATALOG?.question(qid);
   if(!q||m.mastered||unique.has(qid)||(m.nextReviewAt&&new Date(m.nextReviewAt).getTime()>now))return [];
   unique.add(qid);return [{id:'mistake_'+qid,qid,subject:q.subject,topic:q.topicId,minutes:5,type:'srs',title:'章节错题 · 到期复盘'}];
  });
 }
 function tasks(day){
  const existing=(day.tasks||[]).filter(t=>['vocabulary-review','writing-review'].includes(t.type)&&((day.completed||[]).includes(t.id)||day.pendingTask?.id===t.id));
  if(!existing.some(t=>t.type==='vocabulary-review')){const words=vocabulary().slice(0,5);if(words.length)existing.push({id:'review_vocabulary',type:'vocabulary-review',subject:'english',minutes:5,title:'到期错词 · 独立回忆',topic:'跨学科与 CET 词汇',keys:words.map(window.IGCSE_ARCADE.key)});}
  if(!existing.some(t=>t.type==='writing-review')){const row=writing()[0];if(row)existing.push({id:'review_'+row.id,type:'writing-review',subject:'english',minutes:3,title:'写作错点 · 句子改写',topic:'本机 AI 建议待核对',reviewId:row.id});}
  return existing;
 }
 function finish(type,id){
  const dashboard=window.IGCSE_DASHBOARD;if(!dashboard)return;const d=dashboard.day(),p=d.pendingTask;
  if(!p||p.type!==type)return;
  if(type==='vocabulary-review'){
   if(!p.keys.includes(id))return;d.reviewAnswered=d.reviewAnswered||{};const done=d.reviewAnswered[p.id]||[];if(!done.includes(id))done.push(id);d.reviewAnswered[p.id]=done;if(!p.keys.every(k=>done.includes(k))){window.saveUserState(window.userState);return;}
  }else if(p.reviewId!==id)return;
  if(!d.completed.includes(p.id))d.completed.push(p.id);d.pendingTask=null;window.saveUserState(window.userState);
 }
 function openWriting(id){
  const r=read().find(r=>r.id===id);if(!r)return false;window.IGCSE_WRITING?.open();
  const host=document.getElementById('page-writing');if(!host)return false;
  document.getElementById('writingReviewPanel')?.remove();const panel=document.createElement('section');panel.id='writingReviewPanel';panel.className='db-panel';
  const heading=document.createElement('h3');heading.textContent='写作错点复习 / Writing recall';const prompt=document.createElement('p');prompt.textContent='核对并改写这句话 / Check and rewrite: '+r.original;const input=document.createElement('input');input.id='writingReviewAnswer';input.setAttribute('aria-label','改写句子 / Rewrite the sentence');input.autocomplete='off';input.style.width='100%';const submit=document.createElement('button');submit.textContent='检查 / Check';const reveal=document.createElement('button');reveal.textContent='查看建议 / Show suggestion';const status=document.createElement('p');status.setAttribute('role','status');let assisted=false;
  reveal.onclick=()=>{assisted=true;status.textContent=r.replacement+' — '+r.explanation+'（本次为辅助复习；稍后再次独立回忆）';};
  submit.onclick=()=>{const correct=normal(input.value)===normal(r.replacement);if(!correct){status.textContent='再试一次，或查看建议；AI 建议请自行核对。 / Try again or show the suggestion.';assisted=true;return;}if(attempt(id,input.value,assisted)){status.textContent='✓ 已完成独立回忆，已安排下次复习。 / Recalled independently; scheduled for review.';input.disabled=submit.disabled=reveal.disabled=true;}else status.textContent='✓ 已完成辅助修改；本题保留到期复习，不计独立掌握。 / Assisted correction; still due for independent review.';};
  panel.append(heading,prompt,input,submit,reveal,status);host.prepend(panel);panel.scrollIntoView({block:'start'});input.focus({preventScroll:true});return true;
 }
 window.IGCSE_REVIEW={chapterMistakes,capture,writing,vocabulary,attempt,tasks,openWriting};
 window.addEventListener('igcse-arcade-answer',e=>{if(e.detail?.correct&&!e.detail.assisted&&e.detail.qualified)finish('vocabulary-review',e.detail.key);});
})();
