/* IGCSE Personal Learning OS — Dashboard v1
 * Unified Course Map / Mastery / Error Diagnosis / Today Mission.
 * Reuses existing contentData, questionData, userState and Motion Lab state.
 */
(function(){
  'use strict';
  const esc=x=>String(x??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const subjName=s=>({math:'数学 Math',physics:'物理 Physics',chemistry:'化学 Chemistry',dt:'设计 DT',business:'商业 Business',english:'英语 English'})[s]||s;
  const key='igcse_dashboard_v1';

  function getState(){
    window.userState=window.userState||{};
    return window.userState;
  }
  function topics(sub){return (window.contentData||[]).filter(x=>x.subject===sub);}
  function questions(sub){return (window.questionData||[]).filter(x=>x.subject===sub);}
  function chapters(sub){return [...new Set(topics(sub).map(x=>x.chapter).filter(Boolean))];}
  function topicStats(){
    const s=getState(); return s.topicStats||{};
  }
  function masteryForTopic(t){
    const st=topicStats()[t.topicId];
    if(!st||!st.answered)return 0;
    const acc=Math.round((st.correct||0)/st.answered*100);
    const recency=st.lastWrongAt?Math.max(0,100-Math.floor((Date.now()-new Date(st.lastWrongAt).getTime())/86400000)*8):100;
    return Math.max(0,Math.min(100,Math.round(acc*.75+recency*.25)));
  }
  function band(n){
    return n>=85?['Mastered','text-green-700 bg-green-50']:n>=70?['Good','text-blue-700 bg-blue-50']:n>=50?['Learning','text-amber-700 bg-amber-50']:n>0?['Weak','text-red-700 bg-red-50']:['Not started','text-slate-500 bg-slate-100'];
  }
  function bar(n){
    return '<div class="h-2 bg-slate-200 rounded-full overflow-hidden"><div class="h-full bg-indigo-500" style="width:'+n+'%"></div></div>';
  }
  function currentSubject(){
    return window.currentSubject || document.getElementById('subjectSelect')?.value || 'physics';
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
      const ts=topics(sub),qs=questions(sub), vals=ts.map(masteryForTopic).filter(x=>x>0);
      const avg=vals.length?Math.round(vals.reduce((a,b)=>a+b,0)/vals.length):0;
      const st=getState(),gs=st.globalStats||{};
      const acc=gs.totalAnswered?Math.round(gs.totalCorrect/gs.totalAnswered*100):0;
      return '<div class="text-3xl font-bold">'+avg+'%</div><div class="text-xs text-indigo-200">当前科目掌握度 · '+esc(subjName(sub))+'</div><div class="text-xs text-indigo-200 mt-1">'+qs.length+' 道题 · '+(gs.totalAnswered||0)+' 次答题 · 总正确率 '+acc+'%</div>';
    }
    function mission(){
      const ts=topics(sub), st=topicStats(), mistakes=getState().mistakes||[];
      const ranked=ts.map(t=>({t,n:masteryForTopic(t),wrong:st[t.topicId]?.lastWrongAt})).sort((a,b)=>a.n-b.n);
      const weak=ranked.filter(x=>x.n<85).slice(0,3);
      const due=mistakes.filter(m=>m.nextReviewAt&&new Date(m.nextReviewAt)<=new Date()).slice(0,3);
      const cards=[];
      weak.forEach((x,i)=>cards.push({icon:i===0?'🔥':'🎯',title:'攻克 '+x.t.title,text:x.n?('当前掌握度 '+x.n+'%，优先做 5 题并复习知识点。'):'尚未开始，先完成知识学习。',topic:x.t.topicId}));
      if(due.length)cards.push({icon:'🔁',title:'SRS 错题复习',text:'有 '+due.length+' 道错题到期，先处理再学新内容。'});
      if(!cards.length)cards.push({icon:'🏆',title:'挑战 Boss',text:'当前科目没有明显弱项，可以进入章节测试或综合挑战。'});
      return '<section class="bg-white rounded-2xl shadow p-5"><div class="flex justify-between items-center"><div><h3 class="text-xl font-bold">🎯 今日学习任务</h3><p class="text-sm text-slate-500 mt-1">系统按弱项 → 错题 → SRS → 新内容排序。</p></div><span class="text-xs px-3 py-1 rounded-full bg-indigo-50 text-indigo-700">Adaptive</span></div><div class="grid md:grid-cols-3 gap-3 mt-4">'+cards.slice(0,3).map((c,i)=>'<button data-topic="'+esc(c.topic||'')+'" class="text-left border rounded-xl p-4 hover:bg-indigo-50"><div class="text-2xl">'+c.icon+'</div><div class="font-bold mt-2">'+esc(c.title)+'</div><div class="text-sm text-slate-600 mt-1">'+esc(c.text)+'</div><div class="text-xs text-indigo-600 mt-3">任务 '+(i+1)+'</div></button>').join('')+'</div></section>';
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
        const t=x.dataset.topic;
        const btn=document.querySelector('#chapter-engine-nav'); if(btn)btn.click();
        setTimeout(()=>{const sel=document.getElementById('ceTopic');if(sel&&t){sel.value=t;sel.dispatchEvent(new Event('change'));}},50);
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
