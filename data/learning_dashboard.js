/* Learning dashboard: catalogue coverage and evidence-based next actions. */
(function(){
  'use strict';
  const names={math:'数学',physics:'物理',chemistry:'化学',dt:'设计 DT',business:'商业研究',computer_science:'计算机科学',english:'英语 ESL'};
  const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const catalog=()=>window.IGCSE_CATALOG;
  const state=()=>window.userState;
  const localDate=(date=new Date())=>date.getFullYear()+'-'+String(date.getMonth()+1).padStart(2,'0')+'-'+String(date.getDate()).padStart(2,'0');
  function stats(subject,id){return state().topicStats[subject+'::'+id]||state().topicStats[id]||{};}
  function summary(subject){
    const ts=window.IGCSE_CURRICULUM?.ordered(subject)||catalog().topicsFor(subject),qs=ts.flatMap(t=>catalog().questionsFor(subject,t.topicId));
    const mastery=ts.map(t=>window.calculateMasteryV2?window.calculateMasteryV2(t.topicId,subject):Number(stats(subject,t.topicId).mastery||0));
    const attempts=qs.map(q=>state().questionStats?.[q.id]).filter(Boolean);
    const answered=attempts.reduce((n,x)=>n+x.answered,0),correct=attempts.reduce((n,x)=>n+x.correct,0);
    return {subject,topics:ts.length,questions:qs.length,learned:ts.filter(t=>state().learnedTopics.includes(t.topicId)).length,
      withQuestions:ts.filter(t=>catalog().questionsFor(subject,t.topicId).length).length,
      practiced:attempts.length,accuracy:answered?Math.round(correct/answered*100):null,
      mastery:ts.length?Math.round(mastery.reduce((a,b)=>a+b,0)/ts.length):0,mastered:ts.filter(t=>window.getTopicMasteryEvidence?.(t.topicId,subject).established).length};
  }
  function day(){
    const s=state();s.dailyPlan=s.dailyPlan||{};
    const k=localDate();s.dailyPlan[k]=s.dailyPlan[k]||{completed:[],tasks:[]};
    const d=s.dailyPlan[k],cp=window.IGCSE_CURRICULUM;
    const planSignature=cp?JSON.stringify(cp.state()):'';if(d.curriculumSignature!==planSignature){d.tasks=null;d.pendingTask=null;d.curriculumSignature=planSignature;}
    if(d.version!==2){d.version=2;d.completed=Array.isArray(d.completed)?d.completed:[];d.pendingTask=null;d.tasks=null;}
    if(!Array.isArray(d.tasks)){
      const due=window.IGCSE_SRS?window.IGCSE_SRS.dueCards(3):[];
      const tasks=due.filter(c=>catalog().question(c.qid)&&(!cp||cp.eligible(c.subject,c.topicId))).map(c=>({id:'srs_'+c.qid,qid:c.qid,subject:c.subject,topic:c.topicId,minutes:5,type:'srs',title:'复习到期错题'}));
      const weak=catalog().topics.filter(t=>catalog().questionsFor(t.subject,t.topicId).length&&(!cp||cp.eligible(t.subject,t.topicId))).map(t=>({t,n:window.calculateMasteryV2(t.topicId,t.subject)})).sort((a,b)=>(cp?cp.priority(a.t.subject,a.t.topicId)-cp.priority(b.t.subject,b.t.topicId):0)||a.n-b.n);
      for(const {t,n} of weak){
        if(tasks.length>=5)break;
        if(tasks.some(x=>x.subject===t.subject&&(!cp?.profile(t.subject)||x.topic===t.topicId)))continue;
        tasks.push({id:'topic_'+t.subject+'_'+t.topicId,subject:t.subject,topic:t.topicId,minutes:8,type:'practice',title:cp?.status(t.subject,t.topicId)==='current'?'跟进学校当前章节':n?'巩固薄弱主题':'建立基础练习'});
      }
      d.tasks=tasks;window.saveUserState(s);
    }
    const materialTasks=(window.IGCSE_MATERIAL_PLAN?.tasks()||[]).filter(t=>!cp||cp.eligible(t.subject,t.topic));
    d.tasks=d.tasks.filter(t=>t.type!=='material').concat(materialTasks);
    if(d.pendingTask?.type==='material'&&!materialTasks.some(t=>t.id===d.pendingTask.id))d.pendingTask=null;
    return d;
  }
  function startTask(task){
    if(!task)return;
    if(state().mockExams?.activePractice){switchPage('page-practice');renderMockEntry();return;}
    if(task.type==='material'){window.IGCSE_MATERIAL_PLAN.learn(task);return;}
    const d=day();d.pendingTask={...task};window.saveUserState(state());
    setCurrentSubjectSafe(task.subject);
    const ids=task.qid?[task.qid]:catalog().questionsFor(task.subject,task.topic).slice(0,5).map(q=>q.id);
    startSessionFromIds(ids,task.type==='srs'?'srs':'normal',{topicId:task.topic,subject:task.subject,label:task.title});
  }
  window.IGCSE_DASHBOARD={summary,day,localDate,startTask};
  function auditPanel(subject){
    const a=window.getIGCSESyllabusAudit?.(subject);if(!a)return '';
    const labels={'sample-practice':'已有样题','preparation-only':'准备练习','content-linked':'内容关联 · 待补样题','gap':'尚未建设'};
    return '<section class="db-panel" id="dbSyllabusAudit"><h3>官方考纲建设清单</h3><p>'+esc(a.code)+' · '+esc(a.year)+' · <a href="'+esc(a.sourceUrl)+'" target="_blank" rel="noopener">查看官方考纲</a></p><p>'+esc(a.note)+'</p><p>'+a.sampled+'/'+a.sectionCount+' 项有明确关联样题。样题数不代表完整考纲覆盖或能力达标。</p><details><summary>展开各项建设状态</summary><label class="db-audit-filter">显示条目 <select id="dbAuditFilter"><option value="all">全部</option><option value="needs-practice">待建设样题</option><option value="preparation-only">只有准备练习</option></select></label><div class="db-topics">'+a.sections.map(x=>'<article data-audit-status="'+x.status+'"><div><b>'+esc(x.ref)+' · '+esc(x.label)+'</b><small>'+labels[x.status]+' · '+x.practiceCount+' 道样题 · '+x.preparationCount+' 道准备练习</small><small>样题已作答 '+x.attemptedCount+'/'+x.practiceCount+' · 准备练习已作答 '+x.preparationAttemptedCount+'/'+x.preparationCount+'</small></div><div class="db-actions">'+(x.topicIds.length?'<button data-db-learn="'+esc(x.topicIds[0])+'" aria-label="学习 '+esc(x.ref)+'">学习</button>':'')+(x.questionIds.length?'<button data-syllabus-practice="'+esc(x.ref)+'" aria-label="'+(x.practiceCount?'练习 ':'准备练习 ')+esc(x.ref)+'">'+(x.practiceCount?'练习样题':'准备练习')+'</button>':'')+'</div></article>').join('')+'</div><p id="dbAuditEmpty" hidden>当前筛选没有条目。</p></details></section>';
  }
  function build(){
    const nav=document.getElementById('mainNav'),main=document.querySelector('main');
    if(!nav||!main||document.getElementById('page-dashboard'))return;
    const b=document.createElement('button');b.id='dashboard-nav';b.dataset.page='page-dashboard';b.className='nav-btn px-3 py-1 rounded bg-indigo-700';b.textContent='学习驾驶舱';nav.prepend(b);
    const p=document.createElement('section');p.id='page-dashboard';p.className='page';main.append(p);
    const bar=n=>'<progress class="db-progress" max="100" value="'+n+'" aria-label="掌握度 '+n+'%">'+n+'%</progress>';
    function render(){
      const sub=document.getElementById('subjectSelect').value,s=summary(sub),d=day(),errors=window.IGCSE_ERROR_DIAGNOSIS.top(sub).slice(0,3),done=d.tasks.filter(t=>d.completed.includes(t.id)).length;
      p.innerHTML='<div class="db-hero"><div><p class="section-label">IGCSE PERSONAL LEARNING OS</p><h2>今天，从下一步开始</h2><p>'+esc(names[sub])+' · '+s.learned+'/'+s.topics+' 个主题已学 · '+s.mastered+' 个主题练习表现稳固</p></div><div><strong>'+s.mastery+'%</strong><p>本站 IGCSE 平均掌握估计</p></div></div>'+
        '<div class="db-stats"><div><b>'+done+'/'+d.tasks.length+'</b><span>今日任务完成</span></div><div><b>'+s.practiced+'/'+s.questions+'</b><span>实际练过的题目</span></div><div><b>'+(s.accuracy===null?'—':s.accuracy+'%')+'</b><span>已记录答题正确率</span></div><div><b>'+s.withQuestions+'/'+s.topics+'</b><span>本站有题的主题</span></div></div>'+
        '<section class="db-panel"><h3>学校学习安排</h3><p>'+esc(window.IGCSE_CURRICULUM?.edition(sub).message||'')+'</p><p>Y'+(window.IGCSE_CURRICULUM?.state().yearGroup||10)+' · '+(window.IGCSE_CURRICULUM?.ordered(sub)||catalog().topicsFor(sub)).filter(t=>['taught','review'].includes(window.IGCSE_CURRICULUM?.status(sub,t.topicId))).length+'/'+s.topics+' 个本站单元已教；阅读记录与掌握证据分别统计。</p><button id="dbCurriculum">设置考试档案与学校进度</button></section><div class="db-actions"><button id="dbMaterials">上传与查看本科目资料</button><button id="dbProgress">查看进度与掌握依据</button></div><section class="db-panel"><h3>今日学习计划</h3><p>按学校当前章节优先安排练习，并复习已教内容；设置档案后，未教章节不进入每日任务。资料任务先学习章节，再完成一次对应作答；上传与阅读不计为练习完成。</p><div class="db-tasks">'+d.tasks.map(t=>'<button data-task="'+esc(t.id)+'" class="db-task"><small>'+esc(names[t.subject])+' · '+t.minutes+' 分钟</small><b>'+esc(t.title)+'</b><span>'+esc(catalog().topic(t.subject,t.topic)?.title||t.topic)+'</span>'+(t.materialTitle?'<small>资料：'+esc(t.materialTitle)+'</small>':'')+'<em>'+(d.completed.includes(t.id)?'✓ 已完成 · 再练习':'开始练习 →')+'</em></button>').join('')+'</div>'+d.tasks.filter(t=>t.type==='material').map(t=>'<div class="db-actions"><button data-material-review="'+esc(t.id)+'">复习资料章节错题 · '+esc(t.materialTitle)+'</button></div>').join('')+'</section>'+
        '<section class="db-panel"><h3>全科学习概览</h3><div class="db-subjects">'+catalog().subjects.map(subject=>{const x=summary(subject);return '<button data-db-subject="'+subject+'" class="db-task"><b>'+esc(names[subject])+'</b><span>'+x.mastery+'% 估计 · '+x.withQuestions+'/'+x.topics+' 主题有题</span>'+bar(x.mastery)+'</button>';}).join('')+'</div></section>'+
        '<section class="db-panel"><h3>课程地图与练习覆盖</h3><p>以下比例只统计本站课程主题，不代表完整官方考纲或考试等级预测。</p><div class="db-topics">'+(window.IGCSE_CURRICULUM?.ordered(sub)||catalog().topicsFor(sub)).map(t=>{const count=catalog().questionsFor(sub,t.topicId).length,n=window.calculateMasteryV2(t.topicId,sub);return '<article><div><b>'+esc(t.title)+'</b><small>'+esc(t.chapter)+' · '+count+' 道题 · 掌握 '+n+'%</small>'+bar(n)+'</div><div class="db-actions"><button data-db-learn="'+esc(t.topicId)+'">学习</button><button data-db-practice="'+esc(t.topicId)+'" '+(!count?'disabled':'')+'>练习</button></div></article>';}).join('')+'</div></section>'+
        auditPanel(sub)+'<section class="db-panel"><h3>错题与模拟考</h3><p>当前科目 '+state().mistakes.filter(m=>m.subject===sub&&!m.mastered).length+' 道待复习错题。</p>'+ (errors.length?'<p>常见错误类型：'+errors.map(e=>esc(e.type)+' ('+e.count+')').join('、')+'</p>':'')+'<div class="db-actions"><button id="dbMistakes">打开错题本</button><button id="dbMock">准备模拟考</button></div></section>';
      p.querySelectorAll('[data-material-review]').forEach(b=>b.onclick=()=>window.IGCSE_MATERIAL_PLAN.review(d.tasks.find(t=>t.id===b.dataset.materialReview)));
      p.querySelectorAll('[data-task]').forEach(x=>x.onclick=()=>startTask(d.tasks.find(t=>t.id===x.dataset.task)));
      p.querySelectorAll('[data-db-subject]').forEach(x=>x.onclick=()=>{setCurrentSubjectSafe(x.dataset.dbSubject);render();});
      p.querySelectorAll('[data-db-practice]').forEach(x=>x.onclick=()=>gotoTopicPractice(x.dataset.dbPractice));
      p.querySelectorAll('[data-db-learn]').forEach(x=>x.onclick=()=>{const t=catalog().topic(sub,x.dataset.dbLearn);setCurrentSubjectSafe(sub);renderTopicList();switchPage('page-textbook');openTopic(t);});
      p.querySelectorAll('[data-syllabus-practice]').forEach(x=>x.onclick=()=>{
        const a=window.getIGCSESyllabusAudit(sub),section=a?.sections.find(t=>t.ref===x.dataset.syllabusPractice);
        if(!section?.questionIds.length)return;
        if(state().mockExams?.activePractice){switchPage('page-practice');renderMockEntry();return;}
        setCurrentSubjectSafe(sub);
        startSessionFromIds(section.questionIds,'normal',{subject:sub,label:(section.practiceCount?'考纲样题 · ':'准备练习 · ')+section.ref+' '+section.label});
      });
      const filter=p.querySelector('#dbAuditFilter');
      if(filter)filter.onchange=()=>{
        let visible=0;
        p.querySelectorAll('[data-audit-status]').forEach(row=>{
          const status=row.dataset.auditStatus;
          row.hidden=filter.value==='needs-practice'?!['gap','content-linked'].includes(status):filter.value!=='all'&&status!==filter.value;
          if(!row.hidden)visible++;
        });
        p.querySelector('#dbAuditEmpty').hidden=visible>0;
      };
      p.querySelector('#dbCurriculum').onclick=()=>switchPage('page-curriculum');
      p.querySelector('#dbMaterials').onclick=()=>switchPage('page-materials');
      p.querySelector('#dbProgress').onclick=()=>switchPage('page-progress');
      p.querySelector('#dbMistakes').onclick=()=>{switchPage('page-mistake');renderMistakePage();};
      p.querySelector('#dbMock').onclick=()=>{switchPage('page-practice');renderPracticeTopicSelect();renderMockEntry();};
    }
    b.onclick=()=>switchPage('page-dashboard');
    window.addEventListener('igcse-page-change',e=>{if(e.detail.id==='page-dashboard')render();});
    document.getElementById('subjectSelect').addEventListener('change',()=>{if(p.classList.contains('active'))render();});
    window.addEventListener('igcse-answer-recorded',e=>{
      const answer=e.detail||{},d=day(),pending=d.pendingTask;
      if(pending&&pending.subject===answer.subject&&(pending.qid?pending.qid===answer.qid:pending.topic===answer.topicId)){
        if(!d.completed.includes(pending.id))d.completed.push(pending.id);
        d.pendingTask=null;window.saveUserState(state());
      }
    });
    window.addEventListener('igcse-dashboard-refresh',()=>{if(p.classList.contains('active'))render();});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build);else build();
})();
