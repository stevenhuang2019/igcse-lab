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
  function todayKey(){return new Date().toISOString().slice(0,10);}
  function dailyState(){
    const st=getState(); st.dailyPlan=st.dailyPlan||{}; const k=todayKey();
    if(!st.dailyPlan[k])st.dailyPlan[k]={completed:[],startedAt:null,tasks:null,pendingTask:null};
    return st.dailyPlan[k];
  }
  function dailyPlanTasks(){
    const d=dailyState();
    if(!Array.isArray(d.tasks)){
      const plan=adaptivePlan();
      d.tasks=plan.tasks.map(x=>({id:x.id,type:x.type,title:x.title,text:x.text,minutes:x.minutes,priority:x.priority,subject:x.subject||'',topic:x.topic||'',qid:x.qid||''}));
      if(window.saveUserState)window.saveUserState(getState());
    }
    return d.tasks;
  }
  function markDailyTask(id){
    const d=dailyState(); if(!d.completed.includes(id))d.completed.push(id);
    if(!d.startedAt)d.startedAt=new Date().toISOString();
    if(window.saveUserState)window.saveUserState(getState());
  }
  function dailyStats(){
    const d=dailyState(), tasks=dailyPlanTasks(), total=Math.max(tasks.length,1);
    return {completed:d.completed.length,total:tasks.length,rate:Math.min(100,Math.round(d.completed.length/total*100))};
  }
  function streakDays(){
    const plans=getState().dailyPlan||{}, today=new Date(); let n=0;
    for(let i=0;i<365;i++){
      const d=new Date(today); d.setDate(today.getDate()-i);
      const p=plans[d.toISOString().slice(0,10)];
      if(p&&p.completed&&p.completed.length)n++; else if(i>0)break;
    }
    return n;
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
    const key=(window.masteryTopicKey?window.masteryTopicKey(t.topicId,t.subject||currentSubject()):t.topicId);
    const legacy=topicStats()[t.topicId], ns=topicStats()[key]||legacy;
    const unanswered=qs.filter(q=>!(ns?.answered)).length;
    return (100-n)*0.7+Math.min(20,unanswered*2);
  }
  function examProfile(sub){
    const profiles={
      physics:[['calculation','Calculation'],['graph','Graph / Data'],['practical','Practical'],['command','Exam English'],['explanation','Explanation']],
      chemistry:[['calculation','Calculation'],['practical','Practical'],['data','Data Analysis'],['command','Exam English'],['explanation','Explanation']],
      math:[['calculation','Calculation'],['problem','Problem Solving'],['graph','Graph / Data'],['command','Exam English']],
      computer_science:[['algorithm','Algorithm'],['programming','Programming'],['trace','Trace Table / Testing'],['logic','Boolean Logic'],['command','Exam English']],
      english:[['reading','Reading'],['writing','Writing'],['listening','Listening'],['speaking','Speaking'],['language','Language / Grammar']],
      business:[['knowledge','Business Knowledge'],['application','Application'],['analysis','Analysis'],['evaluation','Evaluation'],['command','Exam English']],
      dt:[['design','Design Thinking'],['technical','Technical Knowledge'],['analysis','Analysis'],['evaluation','Evaluation'],['command','Exam English']]
    }; return profiles[sub]||[['knowledge','Knowledge'],['application','Application'],['command','Exam English']];
  }
  function skillScoreFor(sub,id){
    const qs=questions(sub).filter(q=>{
      const s=String(q.skill||'').toLowerCase(), c=String(q.commandWord||q.command||'').toLowerCase(), k=String(q.knowledgePoint||'').toLowerCase(), t=String(q.topicId||'').toLowerCase();
      if(id==='calculation')return s.includes('calculation')||c==='calculate';
      if(id==='graph')return s.includes('graph')||s.includes('data')||/graph|gradient|图像|数据/.test(String(q.question||''));
      if(id==='practical')return s.includes('practical')||q.type==='practical';
      if(id==='command')return !!(q.commandWord||q.command);
      if(id==='explanation')return c==='explain'||s.includes('explain');
      if(id==='algorithm')return /algorithm|伪代码|pseudocode/.test(s+' '+k+' '+t);
      if(id==='programming')return /program|python|code/.test(s+' '+k+' '+t);
      if(id==='trace')return /trace|test|debug/.test(s+' '+k+' '+t);
      if(id==='logic')return /boolean|logic|truth/.test(s+' '+k+' '+t);
      if(id==='reading')return /read/.test(s+' '+t);
      if(id==='writing')return /writ/.test(s+' '+t);
      if(id==='listening')return /listen/.test(s+' '+t);
      if(id==='speaking')return /speak/.test(s+' '+t);
      if(id==='language')return /grammar|vocab|language/.test(s+' '+t);
      return s.includes(id)||k.includes(id)||t.includes(id);
    });
    if(!qs.length)return null;
    const st=topicStats(), vals=qs.map(q=>{
      const k=window.masteryTopicKey?window.masteryTopicKey(q.topicId,sub):q.topicId;
      const x=st[k]||st[q.topicId];
      return x&&x.answered?Math.min(100,(x.correct||0)/x.answered*100):0;
    });
    return Math.round(vals.reduce((a,b)=>a+b,0)/vals.length);
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
    const readinessWeak=examReadiness(currentSubject()).gaps.slice(0,2);
    const mistakes=(getState().mistakes||[]).filter(m=>m.nextReviewAt&&new Date(m.nextReviewAt)<=new Date()).slice(0,6);
    const tasks=[];
    readinessWeak.forEach((g,i)=>{
      const candidates=questions(currentSubject()).filter(q=>{
        const s=String(q.skill||'').toLowerCase(), id=g.id;
        if(id==='calculation')return s.includes('calculation')||String(q.commandWord||'').toLowerCase()==='calculate';
        if(id==='graph')return s.includes('graph')||s.includes('data');
        if(id==='practical')return s.includes('practical')||q.type==='practical';
        if(id==='command')return !!q.commandWord;
        if(id==='explanation')return String(q.commandWord||'').toLowerCase()==='explain';
        return s.includes(id);
      });
      const target=candidates[0];
      tasks.push({id:'skill_'+currentSubject()+'_'+g.id,type:'skill',icon:'🧠',title:subjName(currentSubject())+' · '+g.cn+'强化',text:'针对考试能力弱项训练 · 当前 '+g.score+'%'+(target?' · 推荐主题 '+(target.topicId||'') :''),minutes:10,priority:96-i*3,subject:currentSubject(),topic:target&&target.topicId||'' ,qid:target&&target.id||''});
    });
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
      const subjects=allSubjects().map(x=>{const ts=topics(x),vals=ts.map(masteryForTopic).filter(v=>v>0);return {sub:x,avg:vals.length?Math.round(vals.reduce((a,b)=>a+b,0)/vals.length):0,started:vals.length,total:ts.length};});
      const active=subjects.find(x=>x.sub===sub)||{avg:0};
      const started=subjects.filter(x=>x.started>0);
      const global=started.length?Math.round(started.reduce((a,x)=>a+x.avg,0)/started.length):0;
      const weakest=subjects.filter(x=>x.started>0).sort((a,b)=>a.avg-b.avg)[0];
      const qs=questions(sub),st=getState(),gs=st.globalStats||{},acc=gs.totalAnswered?Math.round(gs.totalCorrect/gs.totalAnswered*100):0;
      return '<div class="text-3xl font-bold">'+active.avg+'%</div><div class="text-xs text-indigo-200">当前科目掌握度 · '+esc(subjName(sub))+'</div><div class="text-xs text-indigo-200 mt-1">全科学习指数 '+global+'% · '+(weakest?'最需关注：'+esc(subjName(weakest.sub)):'尚未形成全科数据')+'</div><div class="text-xs text-indigo-200 mt-1">'+qs.length+' 道题 · '+(gs.totalAnswered||0)+' 次答题 · 总正确率 '+acc+'%</div>';
    }
  ;function examReadiness(sub){
      const qs=questions(sub), ts=topics(sub), st=topicStats();
      const total=qs.length, answered=qs.reduce((n,q)=>n+(st[q.topicId]?.answered?1:0),0);
      const accuracy=qs.reduce((a,q)=>{const x=st[q.topicId];return a+(x&&x.answered?(x.correct||0)/x.answered*100:0)},0)/(qs.filter(q=>st[q.topicId]?.answered).length||1);
      const mastery=ts.map(masteryForTopic).filter(x=>x>0);
      const knowledge=mastery.length?mastery.reduce((a,b)=>a+b,0)/mastery.length:0;
      const coverage=total?Math.min(100,answered/total*100):0;
      const practical=qs.filter(q=>q.skill==='practical'||q.type==='practical');
      const calc=qs.filter(q=>q.skill==='calculation'||q.commandWord==='Calculate');
      const graph=qs.filter(q=>q.skill==='graph'||/graph|图像|gradient|斜率/i.test((q.tags||[]).join(' ')+' '+(q.question||'')));
      function skillScore(arr){
        if(!arr.length)return null;
        const vals=arr.map(q=>{const x=st[q.topicId];return x&&x.answered?Math.min(100,(x.correct||0)/x.answered*100):0});
        return Math.round(vals.reduce((a,b)=>a+b,0)/vals.length);
      }
      const dimensions=[
        {id:'knowledge',name:'Knowledge',cn:'知识掌握',score:Math.round(knowledge),weight:.35},
        {id:'accuracy',name:'Question Accuracy',cn:'题目正确率',score:Math.round(accuracy),weight:.25},
        {id:'coverage',name:'Syllabus Coverage',cn:'课程覆盖',score:Math.round(coverage),weight:.15},
        {id:'calculation',name:'Calculation',cn:'计算能力',score:skillScore(calc),weight:.1},
        {id:'graph',name:'Graph / Data',cn:'图像与数据',score:skillScore(graph),weight:.075},
        {id:'practical',name:'Practical',cn:'实验技能',score:skillScore(practical),weight:.075}
      ];
      const usable=dimensions.filter(d=>d.score!==null);
      const readiness=Math.round(usable.reduce((a,d)=>a+d.score*d.weight,0)/(usable.reduce((a,d)=>a+d.weight,0)||1));
      const target=85;
      const gaps=dimensions.filter(d=>d.score!==null&&d.score<target).sort((a,b)=>a.score-b.score);
      return {readiness,target,dimensions,gaps,coverage,answered,total};
    }
    function readinessGapText(r){
      if(r.readiness>=85)return '已达到 A* readiness 目标，建议转入整套模拟考试与限时训练。';
      const g=r.gaps[0];
      return g?'距离目标还差 '+(r.target-r.readiness)+' 分；最优先提升：'+g.cn+'（'+g.score+'%）。':'继续完成课程覆盖并积累答题数据。';
    }
  
  
  
    function mission(){
      const daily=dailyState(), cards=dailyPlanTasks().slice(0,3), ds=dailyStats(), plan={tasks:dailyPlanTasks(),totalMinutes:dailyPlanTasks().reduce((a,x)=>a+x.minutes,0)};
      return '<section class="bg-white rounded-2xl shadow p-5"><div class="flex flex-wrap justify-between gap-3 items-center"><div><h3 class="text-xl font-bold">🎯 今日学习计划</h3><p class="text-sm text-slate-500 mt-1">系统按 SRS、薄弱知识点与掌握阶段自动安排下一步。</p></div><div class="text-right"><div class="text-lg font-bold text-indigo-700">'+plan.totalMinutes+' min</div><div class="text-xs text-slate-500">预计学习时间</div><div class="text-xs text-slate-500 mt-1">今日完成 '+ds.completed+'/'+ds.total+' · '+ds.rate+'% · 🔥 '+streakDays()+' 天</div></div></div><div class="grid md:grid-cols-3 gap-3 mt-4">'+(cards.length?cards.map((c,i)=>'<button data-topic="'+esc(c.topic||'')+'" data-subject="'+esc(c.subject||'')+'" data-qid="'+esc(c.qid||'')+'" class="text-left border rounded-xl p-4 hover:bg-indigo-50"><div class="flex justify-between"><span class="text-2xl">'+c.icon+'</span><span class="text-xs px-2 py-1 rounded-full bg-slate-100">'+c.minutes+' min</span></div><div class="font-bold mt-2">'+esc(c.title)+'</div><div class="text-sm text-slate-600 mt-1">'+esc(c.text)+'</div><div class="text-xs text-indigo-600 mt-3">优先级 '+c.priority+(daily.completed.includes(c.id)?' · ✅ 已完成':'')+'</div></button>').join(''):'<div class="col-span-full p-4 rounded-xl bg-green-50 text-green-700">🏆 今日没有明显弱项，可以进入 Boss Challenge。</div>')+'</div></section>';
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
      const r=examReadiness(sub);
      return '<section class="bg-white rounded-2xl shadow p-5"><div class="flex flex-wrap justify-between gap-3 items-center"><div><h3 class="text-xl font-bold">🎓 Exam Readiness</h3><p class="text-sm text-slate-500 mt-1">'+esc(readinessGapText(r))+'</p></div><div class="text-right"><div class="text-3xl font-bold text-indigo-700">'+r.readiness+'%</div><div class="text-xs text-slate-500">目标 85% · '+esc(subjName(sub))+'</div></div></div><div class="grid md:grid-cols-3 gap-3 mt-4">'+r.dimensions.map(d=>'<div class="border rounded-xl p-3"><div class="flex justify-between text-sm"><span>'+esc(d.cn)+'</span><b>'+(d.score===null?'—':d.score+'%')+'</b></div>'+ (d.score===null?'<div class="text-xs text-slate-400 mt-2">数据不足</div>':bar(d.score))+'</div>').join('')+'</div><div class="mt-4 p-4 rounded-xl bg-indigo-50"><b>📌 考试准备诊断</b><div class="text-sm mt-1">已覆盖 '+r.coverage+'% 题库 · 已有 '+r.answered+' 个题目主题产生答题数据。</div></div></section>';
    }
    function bind(){
      document.querySelectorAll('#dbMission [data-topic]').forEach(x=>x.onclick=()=>{
        const t=x.dataset.topic, targetSub=x.dataset.subject, qid=x.dataset.qid;
        const taskId=qid||('topic_'+targetSub+'_'+t);
        const d=dailyState(); d.pendingTask={id:taskId,topic:t,qid:qid||'',subject:targetSub||currentSubject()};
        if(window.saveUserState)window.saveUserState(getState());
        if(targetSub && window.subjectSelect){ window.subjectSelect.value=targetSub; window.subjectSelect.dispatchEvent(new Event('change')); }
        const btn=document.querySelector('#chapter-engine-nav'); if(btn)btn.click();
        setTimeout(()=>{const sel=document.getElementById('ceTopic');if(sel&&t){sel.value=t;sel.dispatchEvent(new Event('change'));}},100);
      });
      const oc=document.getElementById('openChapterEngine');if(oc)oc.onclick=()=>document.getElementById('chapter-engine-nav')?.click();
    }
    b.onclick=()=>{if(window.switchPage)window.switchPage('page-dashboard');b.classList.add('active');render();};
    document.getElementById('subjectSelect')?.addEventListener('change',()=>{sub=currentSubject();if(document.getElementById('page-dashboard')?.classList.contains('active'))render();});
    window.addEventListener('igcse-subject-change',()=>{sub=currentSubject();if(document.getElementById('page-dashboard')?.classList.contains('active'))render();});
    window.addEventListener('igcse-answer-recorded',e=>{
      const d=e.detail||{}, p=dailyState().pendingTask;
      if(!p)return;
      if((p.qid&&p.qid===d.qid)||(p.topic&&p.topic===d.topicId)){
        markDailyTask(p.id); delete dailyState().pendingTask; render();
      }
    });
    window.addEventListener('igcse-dashboard-refresh',render);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build);else setTimeout(build,0);
})();