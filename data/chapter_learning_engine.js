/* IGCSE Chapter Learning Engine
 * Subject -> Chapter -> Topic -> Knowledge -> Practice -> Chapter Test -> Unit Test -> Exam Points
 * Reuses IGCSE_CONTENT / IGCSE_QUESTIONS; no subject-specific duplication.
 */
(function(){
  function esc(x){return String(x??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}
  function subjects(){return [...new Set((contentData||[]).map(x=>x.subject))];}
  function topics(sub,chapter){return (window.IGCSE_CURRICULUM?.ordered(sub)||(contentData||[]).filter(x=>x.subject===sub)).filter(x=>!chapter||x.chapter===chapter);}
  function qs(sub,chapter,topicId){const ids=new Set(topics(sub,chapter).map(t=>t.topicId));return (questionData||[]).filter(q=>q.subject===sub&&ids.has(q.topicId)&&(!topicId||q.topicId===topicId)&&(!window.IGCSE_CURRICULUM||window.IGCSE_CURRICULUM.practiceTopics(sub,window.IGCSE_CURRICULUM.profile(sub)?.scope||'taught').some(t=>t.topicId===q.topicId)));}
  function chapters(sub){return [...new Set(topics(sub).map(x=>x.chapter))];}
  function label(s){return ({math:'数学 Math',physics:'物理 Physics',chemistry:'化学 Chemistry',dt:'设计 DT',business:'商业 Business',english:'英语 English'})[s]||s;}
  function command(q){
    if(q.command)return q.command;
    const t=(q.tags||[]).join(' ').toLowerCase();
    if(q.type==='essay') return /why|explain|原因|为什么/.test(q.question||'')?'Explain':'Describe';
    if(/graph|linear|gradient|图|斜率/.test(t+(q.question||''))) return 'Interpret / Calculate';
    if(/calculate|formula|calculation|moles|finance|概率|方程/.test(t+(q.question||''))) return 'Calculate';
    return 'State / Identify';
  }
  function skill(q){
    const t=(q.tags||[]).join(' ').toLowerCase();
    if(/graph|linear|gradient|statistics/.test(t)) return 'Graph & Data';
    if(/kinematics|forces|electricity|moles|finance/.test(t)) return 'Calculation';
    if(q.type==='essay') return 'Explanation / Application';
    return 'Knowledge & Understanding';
  }
  function build(){
    if(document.getElementById('page-chapters')) return;
    const main=document.querySelector('main'),nav=document.getElementById('mainNav');
    if(!main||!nav)return;
    const b=document.createElement('button'); b.id='chapter-engine-nav'; b.dataset.page='page-chapters'; b.className='nav-btn px-3 py-1 rounded bg-indigo-700'; b.textContent='🗺️ 章节学习';
    nav.appendChild(b);
    const p=document.createElement('div'); p.id='page-chapters'; p.className='page';
    p.innerHTML='<div class="bg-white rounded-2xl shadow p-5">'+
      '<div class="flex flex-wrap justify-between gap-3 items-start"><div><div class="text-xs text-indigo-600 font-bold">IGCSE LEARNING ENGINE</div><h2 class="text-2xl font-bold mt-1">🗺️ 章节学习中心</h2><p class="text-sm text-slate-600 mt-1">按章节学习、练习、单元测试，并追踪知识点与考试考点。</p></div><div id="ceProgress" class="text-sm"></div></div>'+
      '<div id="ceControls" class="grid md:grid-cols-3 gap-2 mt-5"></div><div id="ceTabs" class="flex flex-wrap gap-2 mt-4"></div><div id="ceBody" class="mt-4"></div></div>';
    main.appendChild(p);
    b.onclick=()=>{switchPage('page-chapters');b.classList.add('active');render();};
    let sub=currentSubject||'math',ch='',topic='',mode='overview',session=null;
    const control=(id,html)=>'<select id="'+id+'" class="border rounded-lg p-2 w-full">'+html+'</select>';
    function renderControls(){
      const chs=chapters(sub); if(!chs.includes(ch))ch=chs[0]||'';
      const ts=topics(sub,ch); if(!ts.some(x=>x.topicId===topic))topic=ts[0]?.topicId||'';
      document.getElementById('ceControls').innerHTML=
        control('ceSub',subjects().map(s=>'<option value="'+s+'" '+(s===sub?'selected':'')+'>'+label(s)+'</option>').join(''))+
        control('ceCh',chs.map(x=>'<option value="'+esc(x)+'" '+(x===ch?'selected':'')+'>'+esc(x)+'</option>').join(''))+
        control('ceTopic',ts.map(x=>'<option value="'+x.topicId+'" '+(x.topicId===topic?'selected':'')+'>'+esc(x.title)+'</option>').join(''));
      ceSub.onchange=()=>{sub=ceSub.value;ch='';topic='';mode='overview';render();};
      ceCh.onchange=()=>{ch=ceCh.value;topic='';mode='overview';render();};
      ceTopic.onchange=()=>{topic=ceTopic.value;mode='knowledge';render();};
    }
    function renderTabs(){
      const tabs=[['overview','章节总览'],['knowledge','知识学习'],['practice','章节练习'],['chapterTest','章节测试'],['unitTest','综合单元测试'],['exam','考点模拟']];
      ceTabs.innerHTML=tabs.map(x=>'<button data-m="'+x[0]+'" class="px-3 py-2 rounded-lg '+(mode===x[0]?'bg-indigo-600 text-white':'bg-slate-100')+'">'+x[1]+'</button>').join('');
      ceTabs.querySelectorAll('[data-m]').forEach(x=>x.onclick=()=>{mode=x.dataset.m;session=null;render();});
    }
    function progress(){
      const all=topics(sub,ch), qq=qs(sub,ch), answered=all.filter(t=>(userState.topicStats?.[sub+'::'+t.topicId]||userState.topicStats?.[t.topicId])?.answered).length;
      ceProgress.innerHTML='<span class="px-3 py-2 rounded-lg bg-indigo-50 text-indigo-700">'+esc(window.IGCSE_CURRICULUM?.edition(sub).message||'')+'<br>本章 '+all.length+' 个主题 · '+qq.length+' 道题 · 已练 '+answered+' 个主题</span>';
    }
    function overview(){
      const all=topics(sub,ch);
      return '<div class="grid md:grid-cols-2 gap-3">'+all.map(t=>{
        const n=qs(sub,ch,t.topicId).length, st=userState.topicStats?.[sub+'::'+t.topicId]||userState.topicStats?.[t.topicId]||{}, rate=st.answered?Math.round(st.correct/st.answered*100):0;
        return '<button data-topic="'+t.topicId+'" class="text-left border rounded-xl p-4 hover:bg-indigo-50"><div class="flex justify-between gap-2"><b>'+esc(t.title)+'</b><span class="text-xs '+(rate>=80?'text-green-600':'text-slate-500')+'">'+(st.answered?rate+'%':'未开始')+'</span></div><div class="text-xs text-slate-500 mt-1">'+esc(t.topicId)+' · '+n+' 题</div><div class="text-sm text-slate-600 mt-2">'+esc((t.knowledge||'').slice(0,150))+'…</div></button>';
      }).join('')+'</div>';
    }
    function knowledge(){
      const t=(contentData||[]).find(x=>x.topicId===topic); if(!t)return '<p>请选择知识主题。</p>';
      return '<div class="border rounded-xl p-5"><div class="text-xs text-indigo-600 font-bold">'+esc(t.chapter)+' · '+esc(t.topicId)+'</div><h3 class="text-2xl font-bold mt-1">'+esc(t.title)+'</h3><div class="mt-4 prose max-w-none">'+(t.knowledge||'暂无知识说明')+'</div>'+
        (t.formulas?.length?'<div class="mt-4 p-4 rounded-xl bg-indigo-50"><b>核心公式 / 关系</b>'+t.formulas.map(f=>'<div class="mt-2">'+f+'</div>').join('')+'</div>':'')+
        '<div class="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200"><b>⚠ 常见错误</b><p class="mt-1 text-sm">'+esc(t.commonMistake||'暂无')+'</p></div>'+
        '<div class="mt-4 flex flex-wrap gap-2"><button id="ceStartTopic" class="bg-indigo-600 text-white px-4 py-2 rounded-lg">开始本主题练习</button><button id="ceStartTest" class="border px-4 py-2 rounded-lg">完成本章测试</button></div></div>';
    }
    function start(ids,title){
      if(!ids.length){ceBody.innerHTML='<div class="p-5 bg-slate-50 rounded-xl">这个范围目前还没有足够的练习题。</div>';return;}
      session={ids:ids.slice(),idx:0,correct:0,title:title||'练习',answered:false}; renderQuestion();
    }
    function questionMeta(q){
      const t=(contentData||[]).find(x=>x.topicId===q.topicId)||{};
      return '<div class="grid md:grid-cols-4 gap-2 text-xs mt-3"><div class="bg-slate-50 p-2 rounded">知识点<br><b>'+esc(t.title||q.topicId)+'</b></div><div class="bg-slate-50 p-2 rounded">考查方式<br><b>'+esc(command(q))+'</b></div><div class="bg-slate-50 p-2 rounded">能力<br><b>'+esc(skill(q))+'</b></div><div class="bg-slate-50 p-2 rounded">章节<br><b>'+esc(q.chapter||ch)+'</b></div></div>';
    }
    function renderQuestion(){
      session.answered=false;
      const q=findQuestion(session.ids[session.idx]); if(!q)return finish();
      ceBody.innerHTML='<div class="mb-3 text-sm text-slate-500">'+esc(session.title)+' · 第 '+(session.idx+1)+' / '+session.ids.length+' 题</div>'+
        '<div class="border rounded-2xl p-5"><div class="text-xs text-indigo-600 font-bold">'+esc(command(q))+' · '+esc(skill(q))+'</div><div class="text-lg font-semibold mt-2">'+questionStemHtml(q)+'</div>'+
        (q.type==='choice'?'<div class="grid gap-2 mt-4">'+(q.options||[]).map((o,i)=>'<button data-ans="'+i+'" class="border rounded-lg p-3 text-left hover:bg-indigo-50">'+String.fromCharCode(65+i)+'. '+o+'</button>').join('')+'</div>':'<textarea id="ceEssay" class="w-full border rounded-lg p-3 mt-4 h-28" placeholder="写出你的答案，再对照 Mark Scheme 自查"></textarea><button id="ceEssayBtn" class="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-lg">查看解析</button>')+
        questionMeta(q)+'<div id="ceFeedback" class="mt-4"></div></div>';
      if(q.type==='choice')ceBody.querySelectorAll('[data-ans]').forEach(x=>x.onclick=()=>answer(q,Number(x.dataset.ans)));
      if(q.type!=='choice')ceEssayBtn.onclick=()=>selfCheck(q);
      if(window.renderMathInElement)renderMathInElement(ceBody,{delimiters:[{left:'$$',right:'$$',display:true},{left:'$',right:'$',display:false}]});
    }
    function feedback(q,ok){
      const t=(contentData||[]).find(x=>x.topicId===q.topicId)||{};
      return '<div class="p-4 rounded-xl '+(ok?'bg-green-50 text-green-800':'bg-red-50 text-red-800')+'"><b>'+(ok?'✓ 回答正确':'✗ 需要复习')+'</b><p class="mt-2"><b>答案 / Mark Scheme：</b> '+esc(q.answer||'')+'</p><p class="mt-2"><b>解析：</b> '+(q.explain||'暂无详细解析')+'</p><p class="mt-2"><b>关联知识点：</b> '+esc(t.title||q.topicId)+'</p><p class="mt-2"><b>知识要点：</b> '+esc(t.knowledge||'')+'</p><p class="mt-2"><b>常见错误：</b> '+esc(t.commonMistake||'暂无')+'</p></div><button id="ceNext" class="mt-3 bg-slate-900 text-white px-4 py-2 rounded-lg">下一题</button>';
    }
    function record(q,ok){
      userState.topicStats=userState.topicStats||{};
      const key=window.masteryTopicKey?window.masteryTopicKey(q.topicId,q.subject||sub):q.topicId; const st=userState.topicStats[key]||userState.topicStats[q.topicId]||{subject:q.subject||sub,topicId:q.topicId,answered:0,correct:0,lastWrongAt:null};
      st.answered++; if(ok)st.correct++; else st.lastWrongAt=new Date().toISOString();
      userState.topicStats[key]=st;
      userState.globalStats=userState.globalStats||{totalAnswered:0,totalCorrect:0};
      userState.globalStats.totalAnswered=(userState.globalStats.totalAnswered||0)+1;
      if(ok) userState.globalStats.totalCorrect=(userState.globalStats.totalCorrect||0)+1;
      if(!ok){
        userState.mistakes=userState.mistakes||[];
        const old=userState.mistakes.find(m=>mistakeQid(m)===q.id);
        if(old){old.wrongCount=(old.wrongCount||0)+1;old.lastResult='fail';}
        else userState.mistakes.push({questionId:q.id,subject:q.subject,topicId:q.topicId,time:new Date().toISOString(),wrongCount:1,srsStage:0,nextReviewAt:new Date(Date.now()+864e5).toISOString(),mastered:false,reviewedCount:0,lastResult:'fail'});
      }
      addXp(ok?(q.xpReward||10):2); if(window.dispatchEvent)window.dispatchEvent(new CustomEvent('igcse-answer-recorded',{detail:{topicId:q.topicId,qid:q.id,subject:q.subject||sub,correct:ok,srs:false,pastPaper:!!q.pastPaper,mode:'chapter',question:q}}));
      saveUserState(userState);
    }
    function answer(q,i){
      if(session.answered)return;session.answered=true;
      const ok=(q.options||[])[i]===q.answer; record(q,ok);
      ceFeedback.innerHTML=feedback(q,ok); ceBody.querySelectorAll('[data-ans]').forEach(x=>x.disabled=true);
      ceNext.onclick=()=>{session.idx++;ok&&(session.correct++);renderQuestion();};
    }
    function selfCheck(q){
      if(session.answered)return;
      const v=ceEssay.value.trim(); if(!v){showToast('请先写下自己的答案');return;}
      if(q.type==='number'){
        if(!Number.isFinite(Number(v))){showToast('请输入有效数字');return;}
        session.answered=true;const ok=Math.abs(Number(v)-Number(q.answer))<=(q.tolerance??1e-9);record(q,ok);
        ceFeedback.innerHTML=feedback(q,ok);ceNext.onclick=()=>{session.idx++;if(ok)session.correct++;renderQuestion();};return;
      }
      ceFeedback.innerHTML='<div class="border rounded p-4"><b>参考答案</b><p>'+esc(q.answer)+'</p><p>'+esc(q.explain)+'</p><button data-ce-self="yes" class="mock-action">我已覆盖得分点</button><button data-ce-self="no" class="mock-action">需要复习</button></div>';
      ceFeedback.querySelectorAll('[data-ce-self]').forEach(b=>b.onclick=()=>{
        if(session.answered)return;session.answered=true;const ok=b.dataset.ceSelf==='yes';record(q,ok);
        ceFeedback.innerHTML=feedback(q,ok);ceNext.onclick=()=>{session.idx++;if(ok)session.correct++;renderQuestion();};
      });
    }
    function finish(){const rate=Math.round(session.correct/session.ids.length*100);ceBody.innerHTML='<div class="text-center p-8 bg-slate-50 rounded-2xl"><div class="text-4xl">🏆</div><h3 class="text-2xl font-bold mt-2">'+esc(session.title)+'完成</h3><p class="mt-2 text-slate-600">正确（含开放题自评） '+session.correct+' / '+session.ids.length+'（'+rate+'%）</p><p class="text-sm mt-2">错题已经进入原有错题/SRS系统，可继续复习。</p><button id="ceAgain" class="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg">再练一次</button></div>';ceAgain.onclick=()=>start(session.ids,session.title);}
    function practice(){const t=topic||topics(sub,ch)[0]?.topicId;const ids=qs(sub,ch,t).map(q=>q.id);start(ids,'主题练习');}
    function chapterTest(){start(qs(sub,ch).map(q=>q.id),'章节综合测试');}
    function unitTest(){const cs=chapters(sub).slice(0,Math.max(1,chapters(sub).indexOf(ch)+1));start(qs(sub).filter(q=>cs.includes(window.IGCSE_CATALOG.topic(sub,q.topicId)?.chapter)).map(q=>q.id),'综合单元测试 · 已学章节');}
    function exam(){
      const pool=qs(sub,ch); const ranked=[...pool].sort((a,b)=>{const sa=(a.type==='essay'?2:1)+(skill(a)==='Calculation'?1:0),sb=(b.type==='essay'?2:1)+(skill(b)==='Calculation'?1:0);return sb-sa;});
      start(ranked.map(q=>q.id).slice(0,Math.min(12,ranked.length)),'考点模拟 · '+ch);
    }
    function renderBody(){
      if(mode==='overview')ceBody.innerHTML=overview();
      else if(mode==='knowledge')ceBody.innerHTML=knowledge();
      else if(mode==='practice')practice();
      else if(mode==='chapterTest')chapterTest();
      else if(mode==='unitTest')unitTest();
      else if(mode==='exam')exam();
      if(mode==='overview')ceBody.querySelectorAll('[data-topic]').forEach(x=>x.onclick=()=>{topic=x.dataset.topic;mode='knowledge';render();});
      const st=document.getElementById('ceStartTopic'); if(st)st.onclick=()=>{mode='practice';render();};
      const ct=document.getElementById('ceStartTest'); if(ct)ct.onclick=()=>{mode='chapterTest';render();};
    }
    function render(){renderControls();renderTabs();progress();renderBody();}
    window.addEventListener('igcse-subject-change',e=>{if(e.detail?.subject){sub=e.detail.subject;ch='';topic='';mode='overview';render();}});
    const ss=document.getElementById('subjectSelect');
    if(ss) ss.addEventListener('change',()=>{sub=ss.value;ch='';topic='';mode='overview';render();});
    render();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build);else setTimeout(build,0);
})();