/* IGCSE Personal Learning OS — Dashboard v1
 * Unified Course Map / Mastery / Error Diagnosis / Today Mission.
 * Reuses existing contentData, questionData, userState and Motion Lab state.
 */
(function(){
  'use strict';
  const esc=x=>String(x??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const subjName=s=>({math:'数学 Math',physics:'物理 Physics',chemistry:'化学 Chemistry',dt:'设计 DT',business:'商业 Business',computer_science:'计算机科学 CS',english:'英语 English'})[s]||s;
  const key='igcse_dashboard_v1';

  function getState(){
    window.userState=window.userState||{};
    return window.userState;
  }
  function topics(sub){
    const base=(window.contentData||[]).filter(x=>x.subject===sub);
    if(sub==='physics'&&window.PHYSICS_0625_COURSE_MAP){
      const ids=new Set(base.map(x=>x.topicId));
      const extra=window.PHYSICS_0625_COURSE_MAP.filter(x=>!ids.has(x.topicId)).map(x=>({subject:'physics',chapter:x.chapter,topicId:x.topicId,title:x.title,knowledge:x.knowledge,formulas:x.formulas,commonMistake:x.commonMistake}));
      return base.concat(extra);
    }
    return base;
  }
  function questions(sub){return (window.questionData||[]).filter(x=>x.subject===sub);}
  function allSubjects(){return ['math','physics','chemistry','dt','business','computer_science','english'];}
  function topicPriority(t){
    const n=masteryForTopic(t);
    const qs=questions(t.subject||currentSubject()).filter(q=>q.topicId===t.topicId);
    const unanswered=qs.filter(q=>!(topicStats()[t.topicId]?.answered)).length;
    return (100-n)*0.7+Math.min(20,unanswered*2);
  }
  function globalWeaknesses(){
    const out=[];
    allSubjects().forEach(sub=>topics(sub).forEach(t=>{
      const n=masteryForTopic(t);
      if(n<85) out.push({subject:sub,t,n,priority:topicPriority(Object.assign({},t,{subject:sub}))});
    }));
    return out.sort((a,b)=>b.priority-a.priority);
  }
  function adaptivePlan(){
    const weak=globalWeaknesses().slice(0,6);
    const mistakes=(getState().mistakes||[]).filter(m=>m.nextReviewAt&&new Date(m.nextReviewAt)<=new Date()).slice(0,6);
    const tasks=[];
    mistakes.slice(0,2).forEach((m,i)=>tasks.push({id:'srs_'+(m.qid||i),type:'srs',icon:'🔁',title:'SRS 错题复习',text:'复习到期错题并重新作答',minutes:5,priority:100-i*2,qid:m.qid}));
    weak.slice(0,5).forEach((x,i)=>{
      const type=x.n===0?'learn':x.n<50?'practice':x.n<70?'repair':'reinforce';
      const meta={learn:['📘','知识学习','先建立核心知识框架',8],practice:['🎯','针对练习','集中训练薄弱知识点',10],repair:['🛠️','错因修复','针对常见错误进行强化',10],reinforce:['⚡','巩固练习','保持已建立的掌握度',8]}[type];
      tasks.push({id:'topic_'+x.subject+'_'+x.t.topicId,type,icon:meta[0],title:subjName(x.subject)+' · '+meta[1],text:meta[2]+' · 当前掌握度 '+x.n+'%',minutes:meta[3],priority:Math.round(x.priority),subject:x.subject,topic:x.t.topicId});
    });
    tasks.sort((a,b)=>b.priority-a.priority);
    return {tasks:tasks.slice(0,5),totalMinutes:tasks.slice(0,5).reduce((a,x)=>a+x.minutes,0)};
  }
  function build(){
    if(document.getElementById('page-dashboard'))return;
    const nav=document.getElementById('mainNav'),main=document.querySelector('main');
    if(!nav||!main)return;
    const b=document.createElement('button');
    b.id='dashboard-nav';b.className='nav-btn px-3 py-1 rounded bg-indigo-700';b.textContent='🧭 学习驾驶舱';
    nav.appendChild(b);
    const p=document.createElement('div');p.id='page-dashboard';p.className='page';
    p.innerHTML='<div class="space-y-4">'+
      '<div class="bg-gradient-to-r from-slate-900 via-indigo-900 to-violet-900 text-white rounded-2xl shadow p-5">'+
      '<div class="text-xs text-indigo-200 font-bold">IGCSE PERSONAL LEARNING OS</div><div class="flex flex-wrap justify-between gap-4 items-end"><div><h2 class="text-3xl font-bold mt-1">🧭 学习驾驶舱</h2><p class="text-indigo-100 mt-1">不是只看分数，而是找出“下一步最值得学什么”。</p></div><div id="dbOverall" class="text-right"></div></div></div>'+
      '<div id="dbMission"></div><div id="dbMap"></div><div id="dbDiagnosis"></div><div id="dbReadiness"></div></div>';
    main.appendChild(p);

    let sub=currentSubject();
    function render(){
      sub=currentSubject();
      document.getElementById('dbOverall').innerHTML=overall();
      document.getElementById('dbMission').innerHTML=mission();
      document.getElementById('dbMap').innerHTML=courseMap();
      document.getElementById('dbDiagnosis').innerHTML=diagnosis();
      document.getElementById('dbReadiness').innerHTML=readiness();
      bind();
    }
    function overall(){
      const subjects=allSubjects().map(sub=>{const ts=topics(sub),vals=ts.map(masteryForTopic).filter(x=>x>0);return {sub,avg:vals.length?Math.round(vals.reduce((a,b)=>a+b,0)/vals.length):0,started:vals.length,total:ts.length};});
      const active=subjects.find(x=>x.sub===sub)||{avg:0};
      const started=subjects.filter(x=>x.started>0);
      const global=started.length?Math.round(started.reduce((a,x)=>a+x.avg,0)/started.length):0;
      const weakest=subjects.filter(x=>x.started>0).sort((a,b)=>a.avg-b.avg)[0];
      const qs=questions(sub),st=getState(),gs=st.globalStats||{},acc=gs.totalAnswered?Math.round(gs.totalCorrect/gs.totalAnswered*100):0;
      return '<div class="text-3xl font-bold">'+active.avg+'%</div><div class="text-xs text-indigo-200">当前科目掌握度 · '+esc(subjName(sub))+'</div><div class="text-xs text-indigo-200 mt-1">全科学习指数 '+global+'% · '+(weakest?'最需关注：'+esc(subjName(weakest.sub)):'尚未形成全科数据')+'</div><div class="text-xs text-indigo-200 mt-1">'+qs.length+' 道题 · '+(gs.totalAnswered||0)+' 次答题 · 总正确率 '+acc+'%</div>';
    }
      const ts=topics(sub),qs=questions(sub), vals=ts.map(masteryForTopic).filter(x=>x>0);
      const avg=vals.length?Math.round(vals.reduce((a,b)=>a+b,0)/vals.length):0;
      const st=getState(),gs=st.globalStats||{};
      const acc=gs.totalAnswered?Math.round(gs.totalCorrect/gs.totalAnswered*100):0;
      return '<div class="text-3xl font-bold">'+avg+'%</div><div class="text-xs text-indigo-200">当前科目掌握度 · '+esc(subjName(sub))+'</div><div class="text-xs text-indigo-200 mt-1">'+qs.length+' 道题 · '+(gs.totalAnswered||0)+' 次答题 · 总正确率 '+acc+'%</div>';
    }
    function mission(){
      const plan=adaptivePlan(), cards=plan.tasks.slice(0,3);
      return '<section class="bg-white rounded-2xl shadow p-5"><div class="flex flex-wrap justify-between gap-3 items-center"><div><h3 class="text-xl font-bold">🎯 今日学习计划</h3><p class="text-sm text-slate-500 mt-1">系统按 SRS、薄弱知识点与掌握阶段自动安排下一步。</p></div><div class="text-right"><div class="text-lg font-bold text-indigo-700">'+plan.totalMinutes+' min</div><div class="text-xs text-slate-500">预计学习时间</div></div></div><div class="grid md:grid-cols-3 gap-3 mt-4">'+(cards.length?cards.map((c,i)=>'<button data-topic="'+esc(c.topic||'')+'" data-subject="'+esc(c.subject||'')+'" data-qid="'+esc(c.qid||'')+'" class="text-left border rounded-xl p-4 hover:bg-indigo-50"><div class="flex justify-between"><span class="text-2xl">'+c.icon+'</span><span class="text-xs px-2 py-1 rounded-full bg-slate-100">'+c.minutes+' min</span></div><div class="font-bold mt-2">'+esc(c.title)+'</div><div class="text-sm text-slate-600 mt-1">'+esc(c.text)+'</div><div class="text-xs text-indigo-600 mt-3">优先级 '+c.priority+'</div></button>').join(''):'<div class="col-span-full p-4 rounded-xl bg-green-50 text-green-700">🏆 今日没有明显弱项，可以进入 Boss Challenge。</div>')+'</div></section>';
    }
    function courseMap(){
      const cs=chapters(sub);
      return '<section class="bg-white rounded-2xl shadow p-5"><div class="flex justify-between items-center"><div><h3 class="text-xl font-bold">🗺️ Course Map · '+esc(subjName(sub))+'</h3><p class="text-sm text-slate-500 mt-1">章节 → 主题 → 掌握度。绿色不是“学过”，而是达到掌握标准。</p></div><button id="openChapterEngine" class="text-sm border rounded-lg px-3 py-2 hover:bg-slate-50">打开章节学习中心 →</button></div><div class="mt-4 space-y-3">'+cs.map((c,ci)=>{const ts=topics(sub).filter(t=>t.chapter===c),avg=ts.length?Math.round(ts.reduce((a,t)=>a+masteryForTopic(t),0)/ts.length):0;return '<div class="border rounded-xl p-4"><div class="flex justify-between gap-3"><div><b>'+esc(c)+'</b><span class="text-xs text-slate-500 ml-2">'+ts.length+' topics</span></div><b>'+avg+'%</b></div>'+bar(avg)+'<div class="grid md:grid-cols-3 gap-2 mt-3">'+ts.slice(0,6).map(t=>{const n=masteryForTopic(t),bd=band(n);return '<div class="border rounded-lg p-2 text-sm"><div class="flex justify-between gap-2"><span class="truncate">'+esc(t.title)+'</span><span class="text-xs '+bd[1]+' px-1 rounded">'+n+'%</span></div></div>';}).join('')+'</div></div>';}).join('')+'</div></section>';
    }
    function diagnosis(){
      const mistakes=getState().mistakes||[];
      const counts={}; mistakes.forEach(m=>{const k=m.errorType||m.mistake||'Knowledge gap';counts[k]=(counts[k]||0)+1;});
      const rows=Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,8);
      const weak=topics(sub).map(t=>({t,n:masteryForTopic(t)})).filter(x=>x.n<70).sort((a,b)=>a.n-b.n).slice(0,5);
      return '<section class="bg-white rounded-2xl shadow p-5"><div><h3 class="text-xl font-bold">🩺 错题诊断</h3><p class="text-sm text-slate-500 mt-1">从“错了几道题”升级为“为什么错”。</p></div><div class="grid lg:grid-cols-2 gap-5 mt-4"><div><h4 class="font-semibold mb-2">Error Taxonomy</h4>'+(rows.length?rows.map(r=>'<div class="flex items-center gap-3 mb-2"><div class="w-36 text-sm truncate">'+esc(r[0])+'</div><div class="flex-1">'+bar(Math.min(100,r[1]*12))+'</div><b class="text-sm">'+r[1]+'</b></div>').join(''):'<p class="text-sm text-slate-400">暂无错题数据。</p>')+'</div><div><h4 class="font-semibold mb-2">Top Weak Knowledge Points</h4>'+(weak.length?weak.map(x=>'<div class="flex justify-between border-b py-2 text-sm"><span>'+esc(x.t.title)+'</span><b class="text-red-600">'+x.n+'%</b></div>').join(''):'<p class="text-sm text-slate-400">没有低于 70% 的主题，继续保持。</p>')+'</div></div></section>';
    }
    function readiness(){
      if(sub==='physics'&&window.PHYSICS_MOTION_LAB?.getExamReadiness){
        const r=window.PHYSICS_MOTION_LAB.getExamReadiness(window.IGCSE_MOTION_STATE||{});
        return '<section class="bg-white rounded-2xl shadow p-5"><div class="flex justify-between"><div><h3 class="text-xl font-bold">🧠 Exam Readiness · Motion</h3><p class="text-sm text-slate-500 mt-1">考试能力不是一个分数，而是一组可训练的技能。</p></div><b class="text-2xl">'+r.overall+'%</b></div><div class="grid md:grid-cols-4 gap-3 mt-4">'+window.PHYSICS_MOTION_LAB.readinessSkills.map(k=>'<div class="border rounded-xl p-3"><div class="text-sm">'+esc(k)+'</div><div class="text-xl font-bold mt-1">'+(r[k]||0)+'%</div>'+bar(r[k]||0)+'</div>').join('')+'</div><div class="mt-4 p-3 rounded-xl bg-amber-50 text-amber-900 text-sm"><b>优先补强：</b> '+r.weak.join(' · ')+'</div></section>';
      }
      return '<section class="bg-white rounded-2xl shadow p-5"><h3 class="text-xl font-bold">🧠 Exam Readiness</h3><p class="text-sm text-slate-500 mt-1">完成更多带有 command word / skill / errorType 的题目后，这里会形成考试能力画像。</p></section>';
    }
    function bind(){
      document.querySelectorAll('#dbMission [data-topic]').forEach(x=>x.onclick=()=>{
        const t=x.dataset.topic, targetSub=x.dataset.subject;
        if(targetSub && window.subjectSelect){ window.subjectSelect.value=targetSub; window.subjectSelect.dispatchEvent(new Event('change')); }
        const btn=document.querySelector('#chapter-engine-nav'); if(btn)btn.click();
        setTimeout(()=>{const sel=document.getElementById('ceTopic');if(sel&&t){sel.value=t;sel.dispatchEvent(new Event('change'));}},100);
      });
      const oc=document.getElementById('openChapterEngine');if(oc)oc.onclick=()=>document.getElementById('chapter-engine-nav')?.click();
    }
    b.onclick=()=>{if(window.switchPage)window.switchPage('page-dashboard');b.classList.add('active');render();};
    document.getElementById('subjectSelect')?.addEventListener('change',()=>{sub=currentSubject();if(document.getElementById('page-dashboard')?.classList.contains('active'))render();});
    window.addEventListener('igcse-subject-change',()=>{sub=currentSubject();if(document.getElementById('page-dashboard')?.classList.contains('active'))render();});
    window.addEventListener('igcse-dashboard-refresh',render);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build);else setTimeout(build,0);
})();
