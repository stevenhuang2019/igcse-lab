/* Compact learning workspaces. Presentation preferences never alter assessment evidence. */
(function(){
 'use strict';
 const icons={math:'📐',physics:'⚛️',chemistry:'🧪',dt:'🛠️',business:'💼',computer_science:'💻',english:'🇬🇧',all:'🌐'};
 const names={math:'数学',physics:'物理',chemistry:'化学',dt:'设计 D&T',business:'商业研究',computer_science:'计算机科学',english:'英语'};
 const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 let prefs={};try{prefs=JSON.parse(localStorage.getItem('igcseWorkspacePrefs')||'{}')||{};}catch{}
 if(typeof prefs!=='object'||Array.isArray(prefs))prefs={};
 const save=()=>{try{localStorage.setItem('igcseWorkspacePrefs',JSON.stringify(prefs));}catch{}};
 const subject=()=>document.getElementById('subjectSelect').value;
 const topics=()=>window.IGCSE_CURRICULUM?.ordered(subject())||window.IGCSE_CATALOG.topicsFor(subject());
 const options=(values,selected,all)=>'<option value="">'+all+'</option>'+values.map(x=>'<option value="'+esc(x)+'" '+(x===selected?'selected':'')+'>'+esc(x)+'</option>').join('');
 const meter=(n,label)=>'<progress max="100" value="'+n+'" aria-label="'+esc(label)+' '+n+'%">'+n+'%</progress>';
 function chips(selected,callback,all=false){
  const box=document.createElement('div');box.className='ws-subjects';box.setAttribute('aria-label','学科筛选');
  for(const [id,name] of [...(all?[['all','综合 · 七科']]:[]),...Object.entries(names)]){const b=document.createElement('button');b.type='button';b.innerHTML='<span aria-hidden="true">'+icons[id]+'</span> '+esc(name);b.dataset.wsSubject=id;b.setAttribute('aria-pressed',String(selected===id));b.onclick=()=>callback(id);box.append(b);}return box;
 }
 function selectSubject(id){setEnglishMode(false);setCurrentSubjectSafe(id);}
 function actions(items){return '<div class="ws-actions">'+items.map(([id,text])=>'<button type="button" data-ws-route="'+id+'">'+text+'</button>').join('')+'</div>';}
 function bindRoutes(root){root.querySelectorAll('[data-ws-route]').forEach(b=>b.onclick=()=>go(b.dataset.wsRoute));}
 function go(id){if(id==='page-english'){renderEnglishPage();switchPage(id);return;}const b=document.querySelector('#mainNav [data-page="'+id+'"]');if(b)b.click();else switchPage(id);}
 function rememberTopic(topic){prefs.lastTopic={subject:topic.subject,id:topic.topicId};prefs.lastTopics=prefs.lastTopics||{};prefs.lastTopics[topic.subject]=topic.topicId;save();}
 function renderLearning(){
  const area=document.getElementById('learningCenterTools'),list=document.getElementById('topicList'),today=document.getElementById('learningToday');if(!area)return;
  const key='learn:'+subject(),filter=prefs[key]||{chapter:'',search:''},ts=topics(),chapters=[...new Set(ts.map(t=>t.chapter||'其他'))];
  if(!chapters.includes(filter.chapter))filter.chapter='';prefs[key]=filter;
  area.replaceChildren(chips(subject(),s=>{selectSubject(s);renderLearning();}));
  const controls=document.createElement('div');controls.className='ws-filters';controls.innerHTML='<label>章节 / 单元<select id="learningChapter">'+options(chapters,filter.chapter,'全部章节')+'</select></label><label>查找知识点<input id="learningSearch" type="search" placeholder="标题或知识点" value="'+esc(filter.search)+'"></label>'+actions([['page-materials','教材与作业资料'],['page-curriculum','学校进度'],['page-advanced','AS / A Level'],['page-writing','英语写作'],['page-english','英语技能中心']]);area.append(controls);bindRoutes(area);
  const lastId=prefs.lastTopics?.[subject()]||(prefs.lastTopic?.subject===subject()?prefs.lastTopic.id:null),last=lastId&&window.IGCSE_CATALOG.topic(subject(),lastId);
  if(last&&ts.some(t=>t.topicId===last.topicId)){const resume=document.createElement('button');resume.id='resumeStudyTopic';resume.className='ws-resume';resume.textContent='继续上次主题：'+last.title;resume.onclick=()=>openTopic(last);controls.append(resume);}
  document.getElementById('topicContent').classList.add('hidden');list.hidden=false;today.hidden=false;
  const renderList=()=>{const query=filter.search.trim().toLowerCase(),rows=ts.filter(t=>(!filter.chapter||(t.chapter||'其他')===filter.chapter)&&(!query||(t.title+' '+t.chapter).toLowerCase().includes(query)));
   list.innerHTML='<p class="ws-count" role="status">'+rows.length+' 个知识点 · 已读与掌握分别记录</p>'+rows.map(t=>'<button class="ws-topic topic-card" data-topic-id="'+esc(t.topicId)+'"><span><b>'+esc(t.title)+'</b><small>'+esc(t.chapter)+' · '+(window.IGCSE_CURRICULUM?.labels[window.IGCSE_CURRICULUM.status(subject(),t.topicId)]||'未设置学校进度')+'</small></span><span>'+(window.IGCSE_TOPIC_WORKSPACE?.stateLabel(t)||(userState.learnedTopics.includes(t.topicId)?'已读':'未读'))+' · '+window.IGCSE_CATALOG.questionsFor(subject(),t.topicId).length+' 题 →</span></button>').join('')+(!rows.length?'<p>没有匹配的知识点，试试其他章节或关键词。</p>':'');
   list.querySelectorAll('[data-topic-id]').forEach(b=>b.onclick=()=>openTopic(ts.find(t=>t.topicId===b.dataset.topicId)));};
  controls.querySelector('select').onchange=e=>{filter.chapter=e.target.value;save();renderList();};controls.querySelector('input').oninput=e=>{filter.search=e.target.value;save();renderList();};renderList();
  const d=window.IGCSE_DASHBOARD.day(),tasks=d.tasks.filter(t=>t.subject===subject());
  today.innerHTML='<details class="ws-today"><summary>今日学习 · '+names[subject()]+' · '+tasks.length+' 项</summary><div class="ws-actions">'+tasks.map(t=>'<button data-learning-task="'+esc(t.id)+'">'+esc(t.title)+' · '+esc(window.IGCSE_CATALOG.topic(t.subject,t.topic)?.title||t.topic)+'</button>').join('')+'</div><p>没有推荐时，可自由选择章节学习。</p></details>';
  today.querySelectorAll('[data-learning-task]').forEach(b=>b.onclick=()=>window.IGCSE_DASHBOARD.startTask(tasks.find(t=>t.id===b.dataset.learningTask)));
 }
 function practiceTab(tab){
  const live=!!userState.mockExams?.activePractice;if(live&&tab!=='mock'){showToast('请先继续或交卷当前模拟考');tab='mock';}
  prefs.practiceTab=tab;save();
  document.querySelectorAll('[data-practice-tab]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.practiceTab===tab)));
  document.getElementById('practiceAssessment').hidden=tab!=='assessment';
  document.getElementById('mockEntry').hidden=tab!=='mock';
  document.getElementById('questionArea').hidden=tab==='assessment';document.getElementById('practiceResult').style.display=tab==='assessment'?'none':'';
  document.getElementById('practiceTopicSelect').hidden=tab!=='chapters';
  if(tab==='assessment')renderAssessmentPage();
  if(tab==='mistakes')go('page-mistake');
  if(tab==='mock')renderMockEntry();
 }
 function clearPractice(){practiceSession=null;window.IGCSE_TOPIC_WORKSPACE?.syncPractice(null);stopMockTimer();document.getElementById('questionArea').replaceChildren();document.getElementById('practiceResult').classList.add('hidden');}
 function renderPractice(){
  const hub=document.getElementById('practiceHub'),el=document.getElementById('practiceTopicSelect');
  hub.replaceChildren(chips(subject(),s=>{if(userState.mockExams?.activePractice){showToast('请先继续或交卷当前模拟考');return;}clearPractice();selectSubject(s);renderPractice();}));
  const nav=document.createElement('div');nav.className='ws-tabs';nav.setAttribute('aria-label','练习方式');nav.innerHTML=[['assessment','① 诊断测评'],['chapters','章节练习'],['mistakes','错题复习'],['mock','模拟考']].map(([id,label])=>'<button data-practice-tab="'+id+'">'+label+'</button>').join('');hub.append(nav);
  nav.querySelectorAll('button').forEach(b=>b.onclick=()=>practiceTab(b.dataset.practiceTab));
  const cp=window.IGCSE_CURRICULUM,profile=cp?.profile(subject()),scope=prefs.practiceScope?.[subject()]||'all',ts=cp?cp.practiceTopics(subject(),scope):topics(),key='practice:'+subject(),filter=prefs[key]||{chapter:'',search:''},chapters=[...new Set(ts.map(t=>t.chapter||'其他'))];if(!chapters.includes(filter.chapter))filter.chapter='';prefs[key]=filter;
  el.innerHTML='<p>'+esc(cp?.edition(subject()).message||'')+'</p><div class="ws-filters"><label>练习范围<select id="practiceSchoolScope"><option value="taught" '+(scope==='taught'?'selected':'')+' '+(!profile?'disabled':'')+'>当前与已教章节</option><option value="all" '+(scope==='all'?'selected':'')+'>全部本站 IGCSE</option></select></label><label>章节 / 单元<select id="practiceChapter">'+options(chapters,filter.chapter,'全部章节')+'</select></label><label>查找主题<input type="search" id="practiceSearch" value="'+esc(filter.search)+'" placeholder="知识点名称"></label></div><div id="practiceChapterRows"></div>';
  function rows(){const query=filter.search.trim().toLowerCase(),matches=ts.filter(t=>(!filter.chapter||(t.chapter||'其他')===filter.chapter)&&(!query||(t.title+' '+t.chapter).toLowerCase().includes(query)));const box=el.querySelector('#practiceChapterRows');box.innerHTML='<p class="ws-count" role="status">'+matches.length+' 个主题</p>'+chapters.filter(c=>matches.some(t=>(t.chapter||'其他')===c)).map(c=>'<details class="ws-unit" '+(filter.chapter?'open':'')+'><summary>'+esc(c)+' · '+matches.filter(t=>(t.chapter||'其他')===c).length+' 个主题</summary><div class="ws-topic-list">'+matches.filter(t=>(t.chapter||'其他')===c).map(t=>{const count=window.IGCSE_CATALOG.questionsFor(subject(),t.topicId).length;return '<button data-start-topic="'+esc(t.topicId)+'" '+(!count?'disabled':'')+'>'+esc(t.title)+' · '+count+' 题 · '+esc(cp?.labels[cp.status(subject(),t.topicId)]||'自主学习')+'</button>';}).join('')+'</div></details>').join('')+(!matches.length?'<p>此范围暂无主题，请调整筛选或学校进度。</p>':'');box.querySelectorAll('[data-start-topic]').forEach(b=>b.onclick=()=>{startPractice(b.dataset.startTopic);document.getElementById('questionArea').scrollIntoView({block:'start'});});}
  el.querySelector('#practiceSchoolScope').onchange=e=>{prefs.practiceScope=prefs.practiceScope||{};prefs.practiceScope[subject()]=e.target.value;save();renderPractice();};el.querySelector('#practiceChapter').onchange=e=>{filter.chapter=e.target.value;save();rows();};el.querySelector('#practiceSearch').oninput=e=>{filter.search=e.target.value;save();rows();};rows();
  const live=userState.mockExams?.activePractice;
  practiceTab(live?'mock':'chapters');
  // An active answer/report is left intact when changing chapter filters.
 }
 function enhanceDashboard(){
  const page=document.getElementById('page-dashboard');if(!page||page.querySelector('#continueLearning'))return;
  const hero=page.querySelector('.db-hero'),d=window.IGCSE_DASHBOARD.day();
  const cta=document.createElement('div');cta.className='ws-actions';cta.innerHTML='<button id="continueLearning" class="ws-primary">继续学习 →</button><button id="dashboardPractice">练习与测评</button>';hero.prepend(cta);
  cta.querySelector('#continueLearning').onclick=()=>{const last=prefs.lastTopic;if(last&&window.IGCSE_CATALOG.topic(last.subject,last.id)){selectSubject(last.subject);go('page-textbook');openTopic(window.IGCSE_CATALOG.topic(last.subject,last.id));}else go('page-textbook');};cta.querySelector('#dashboardPractice').onclick=()=>go('page-practice');
  const tasks=page.querySelector('.db-tasks');if(tasks&&tasks.children.length>3){const more=document.createElement('details');more.className='ws-more';more.innerHTML='<summary>其余今日任务（'+(tasks.children.length-3)+'）</summary>';while(tasks.children.length>3)more.append(tasks.children[3]);tasks.after(more);}
  const school=Array.from(page.querySelectorAll(':scope > .db-panel')).find(p=>p.querySelector('h3')?.textContent==='学校学习安排');if(school){const actions=page.querySelector('#dbMaterials').parentElement;actions.prepend(school.querySelector('#dbCurriculum'),school.querySelector('#dbPath'));const detail=document.createElement('details');detail.className='ws-more';detail.innerHTML='<summary>学校安排与学习路径</summary>';school.replaceWith(detail);detail.append(school);}
  const overview=page.querySelector('.db-subjects');overview.querySelectorAll('button').forEach(b=>{const original=b.onclick;b.innerHTML+='<small>学习章节 →</small>';b.onclick=()=>{original();go('page-textbook');};});
  const map=Array.from(page.querySelectorAll(':scope > .db-panel')).find(p=>p.querySelector('h3')?.textContent==='课程地图与练习覆盖');
  if(map){const selector=chips(subject(),s=>{selectSubject(s);window.dispatchEvent(new Event('igcse-dashboard-refresh'));});selector.querySelectorAll('[data-ws-subject]').forEach(b=>b.dataset.mapSubject=b.dataset.wsSubject);map.insertBefore(selector,map.querySelector('p'));const ts=topics(),chapters=[...new Set(ts.map(t=>t.chapter||'其他'))],key='map:'+subject();if(prefs[key]===undefined||(prefs[key]&&!chapters.includes(prefs[key])))prefs[key]=chapters[0]||'';
   const bar=document.createElement('div');bar.className='ws-filters';bar.innerHTML='<label>路线章节<select id="dashboardMapChapter">'+options(chapters,prefs[key],'全部章节 · 列表')+'</select></label><button id="mapMode" aria-pressed="'+(prefs.mapMode!=='list')+'">切换路线 / 列表</button>';map.insertBefore(bar,map.querySelector('.db-topics'));
   const cards=Array.from(map.querySelectorAll('article'));cards.forEach((card,i)=>{card.dataset.mapChapter=ts[i]?.chapter||'其他';card.dataset.mapTopic=ts[i]?.topicId;const n=document.createElement('span');n.className='ws-node-number';n.textContent=String(i+1);card.prepend(n);const label=document.createElement('small');label.className='ws-node-status';const evidence=window.getTopicMasteryEvidence(ts[i].topicId,subject());label.textContent=evidence.established?'✓ 练习表现稳固':evidence.objectiveAttempts?'◎ 学习中 · 继续巩固':userState.learnedTopics.includes(ts[i].topicId)?'◉ 已读 · 待练习':'○ 可开始';card.firstElementChild.after(label);});
   const apply=()=>{map.querySelector('.db-topics').classList.toggle('ws-route-map',prefs.mapMode!=='list');cards.forEach(c=>c.hidden=!!prefs[key]&&c.dataset.mapChapter!==prefs[key]);};bar.querySelector('select').onchange=e=>{prefs[key]=e.target.value;save();apply();};bar.querySelector('#mapMode').onclick=e=>{prefs.mapMode=prefs.mapMode==='list'?'route':'list';e.target.setAttribute('aria-pressed',String(prefs.mapMode!=='list'));save();apply();};apply();
  }
  const sum=window.IGCSE_DASHBOARD.summary(subject()),read=sum.topics?Math.round(sum.learned/sum.topics*100):0;
  const chart=document.createElement('section');chart.className='ws-reading-summary';chart.innerHTML='<div class="ws-donut" style="--ws-percent:'+read+'%" role="img" aria-label="当前学科已读主题 '+sum.learned+'，未读 '+(sum.topics-sum.learned)+'"><b>'+read+'%</b></div><div><b>'+names[subject()]+' · 阅读进度</b><p>已读 '+sum.learned+' / '+sum.topics+' · 未读 '+(sum.topics-sum.learned)+'</p><small>阅读进度不是掌握度；七科估计见下方进度条。</small></div>';hero.after(chart);
  const routes=document.createElement('div');routes.className='ws-tabs';routes.id='dashboardViews';routes.setAttribute('aria-label','看板视图');routes.innerHTML=[['today','今日任务'],['overview','七科概览'],['map','课程路线与覆盖']].map(([id,text])=>'<button data-dashboard-view="'+id+'">'+text+'</button>').join('');hero.after(routes);
  const views={today:[],overview:[chart,page.querySelector('.db-stats'),overview.closest('.db-panel')],map:[map,page.querySelector('#dbSyllabusAudit'),page.querySelector('#dbObjectiveAudit')]};
  const todayPanel=tasks?.closest('.db-panel');if(todayPanel)views.today.push(todayPanel);
  const quick=page.querySelector('#dbMaterials').parentElement;routes.after(quick);
  const extras=page.querySelector('#dbMock').closest('.db-panel');if(extras){quick.append(page.querySelector('#dbMistakes'),page.querySelector('#dbMock'));extras.remove();}
  function view(id){prefs.dashboardView=id;save();routes.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.dashboardView===id)));Object.entries(views).forEach(([key,els])=>els.filter(Boolean).forEach(el=>el.hidden=key!==id));}
  routes.querySelectorAll('button').forEach(b=>b.onclick=()=>view(b.dataset.dashboardView));view(['today','overview','map'].includes(prefs.dashboardView)?prefs.dashboardView:'today');

 }
 let qrFilter={subject:'math',chapter:'',search:''};
 function renderQuickref(){
  const root=document.getElementById('quickrefContent');if(!root)return;qrFilter=prefs.quickref||qrFilter;
  const all=window.IGCSE_QUICKREF||[],section=all.find(s=>s.subject===qrFilter.subject),groups=section?.groups||[];
  if(!groups.some(g=>g.title===qrFilter.chapter))qrFilter.chapter='';
  root.replaceChildren(chips(qrFilter.subject,s=>{qrFilter.subject=s;qrFilter.chapter='';prefs.quickref=qrFilter;save();renderQuickref();}));
  const body=document.createElement('div');body.innerHTML='<div class="ws-filters"><label>章节 / 要点组<select id="quickrefChapter">'+options(groups.map(g=>g.title),qrFilter.chapter,'全部要点组')+'</select></label><label>查找公式或概念<input type="search" id="quickrefSearch" value="'+esc(qrFilter.search)+'" placeholder="公式、单位或关键词"></label></div><div id="quickrefResults"></div>';root.append(body);
  function results(){const q=qrFilter.search.trim().toLowerCase(),matches=groups.filter(g=>!qrFilter.chapter||qrFilter.chapter===g.title).map(g=>({...g,items:(g.items||[]).filter(it=>!q||(g.title+' '+it.formula+' '+it.note).toLowerCase().includes(q))})).filter(g=>g.items.length);body.querySelector('#quickrefResults').innerHTML='<p class="ws-count" role="status">'+matches.reduce((n,g)=>n+g.items.length,0)+' 条要点</p>'+matches.map(g=>'<details class="ws-unit" '+(qrFilter.chapter||q?'open':'')+'><summary>'+esc(g.title)+' · '+g.items.length+' 条</summary>'+g.items.map(it=>'<article class="ws-reference"><div class="katex-line">'+(it.formula||'')+'</div><p>'+esc(it.note||'')+'</p></article>').join('')+'</details>').join('')+(!matches.length?'<p>暂无匹配要点。此学科资料可能仍待补充，可前往教材学习。</p>':'');if(window.renderMathInElement)renderMathInElement(body,{delimiters:[{left:'$$',right:'$$',display:true},{left:'$',right:'$',display:false}]});}
  const update=()=>{prefs.quickref=qrFilter;save();results();};body.querySelector('select').onchange=e=>{qrFilter.chapter=e.target.value;update();};body.querySelector('input').oninput=e=>{qrFilter.search=e.target.value;update();};results();
 }
 let vocabFilter={subject:'all',chapter:'',search:''};
 function vocabRows(){vocabFilter=prefs.vocab||vocabFilter;const q=String(vocabFilter.search||'').trim().toLowerCase();return getVocab().filter(v=>(vocabFilter.subject==='all'||v.subject===vocabFilter.subject)&&(!vocabFilter.chapter||(v.chapters||[v.chapter||'其他']).includes(vocabFilter.chapter))&&(!q||(v.en+' '+v.zh).toLowerCase().includes(q)));}
 function gamePool(){const rows=vocabRows(),seen=new Set(),unique=rows.filter(v=>{const key=v.en.toLowerCase()+'::'+v.zh;if(seen.has(key))return false;seen.add(key);return true;});const buckets={};unique.forEach(v=>(buckets[v.subject]||=[]).push(v));Object.values(buckets).forEach(shuffle);const result=[];while(Object.values(buckets).some(b=>b.length)){for(const b of shuffle(Object.values(buckets)))if(b.length)result.push(b.pop());}return result;}
 function renderVocab(){
  const root=document.getElementById('vocabBrowse');if(!root)return;vocabFilter=prefs.vocab||vocabFilter;
  root.replaceChildren(chips(vocabFilter.subject,s=>{vocabFilter.subject=s;vocabFilter.chapter='';prefs.vocab=vocabFilter;save();renderVocab();},true));
  const source=getVocab().filter(v=>vocabFilter.subject==='all'||v.subject===vocabFilter.subject),chapters=[...new Set(source.flatMap(v=>v.chapters||[v.chapter||'其他']))];if(!chapters.includes(vocabFilter.chapter))vocabFilter.chapter='';
  const body=document.createElement('div');body.innerHTML='<div class="ws-filters"><label>章节<select id="vocabChapter">'+options(chapters,vocabFilter.chapter,'全部章节')+'</select></label><label>词汇查找<input id="vocabSearch" type="search" value="'+esc(vocabFilter.search)+'" placeholder="英文或中文"></label></div><div id="vocabResults"></div>';root.append(body);if(vocabFilter.subject==='english'){const note=document.createElement('p');note.className='ws-count';note.textContent=window.IGCSE_ENGLISH_VOCAB_INFO.note;root.insertBefore(note,body);}
  let wordPage=0;
  function results(clearGame=true){
   const rows=vocabRows(),groups=[...new Set(rows.map(v=>v.chapter||'其他'))],filtered=!!(vocabFilter.chapter||vocabFilter.search),pages=Math.max(1,Math.ceil(filtered?rows.length/24:groups.length/8));wordPage=Math.min(wordPage,pages-1);
   const word=v=>'<div class="ws-word"><b>'+esc(v.en)+'</b><span>'+esc(v.zh)+'</span><small>'+esc(names[v.subject])+'</small></div>';
   body.querySelector('#vocabResults').innerHTML='<p class="ws-count" role="status">'+rows.length+' 个词 · 游戏每局最多 10 词</p>'+(filtered?'<div>'+rows.slice(wordPage*24,(wordPage+1)*24).map(word).join('')+'</div><div class="ws-actions"><button data-word-page="prev" '+(!wordPage?'disabled':'')+'>上一页</button><span role="status">第 '+(wordPage+1)+' / '+pages+' 页 · 每页最多 24 词</span><button data-word-page="next" '+(wordPage+1>=pages?'disabled':'')+'>下一页</button></div>':'<div class="ws-chapter-grid">'+groups.slice(wordPage*8,(wordPage+1)*8).map(c=>'<details class="ws-unit"><summary>'+esc(c)+' · '+rows.filter(v=>(v.chapter||'其他')===c).length+' 词</summary>'+rows.filter(v=>(v.chapter||'其他')===c).map(word).join('')+'</details>').join('')+'</div><div class="ws-actions"><button data-word-page="prev" '+(!wordPage?'disabled':'')+'>上一页</button><span role="status">第 '+(wordPage+1)+' / '+pages+' 页 · 每页最多 8 组</span><button data-word-page="next" '+(wordPage+1>=pages?'disabled':'')+'>下一页</button></div>')+(!rows.length?'<p>没有匹配词汇，请调整筛选。</p>':'');
   body.querySelectorAll('[data-word-page]').forEach(b=>b.onclick=()=>{wordPage+=b.dataset.wordPage==='next'?1:-1;results(false);body.querySelector('#vocabResults').scrollIntoView({block:'start'});});
   window.IGCSE_SHELL?.refreshVocabReview();
   document.getElementById('vocabGameMeta').textContent=rows.length+' 词可选 · '+(vocabFilter.subject==='all'?'综合七科':names[vocabFilter.subject]);if(clearGame){vocabGame=null;document.getElementById('vocabGameArea').replaceChildren();}
  }
  const update=()=>{prefs.vocab=vocabFilter;wordPage=0;save();results();};body.querySelector('select').onchange=e=>{vocabFilter.chapter=e.target.value;update();};body.querySelector('input').oninput=e=>{vocabFilter.search=e.target.value;update();};results();
 }
 function renderGrowth(){
  const root=document.getElementById('profileContent'),g=userState.globalStats,tab=prefs.growthTab||'subjects';
  root.innerHTML='<div class="ws-player"><div><span class="ws-avatar" aria-hidden="true">✦</span><h3>Lv.'+userState.level+' · 学习旅程</h3><p>'+userState.xp+' XP · 下一级目标 '+userState.xpNextLevel+'</p></div><div><b>'+userState.badges.length+' / '+BADGES.length+' 徽章</b><p>客观与自评记录请查看掌握依据</p></div></div><p>平台等级与测评分级用于学习反馈，不代表官方考试等级。</p><div class="ws-tabs">'+[['subjects','学科进展'],['assessments','测评记录'],['badges','徽章收藏']].map(([id,text])=>'<button data-growth-tab="'+id+'" aria-pressed="'+(tab===id)+'">'+text+'</button>').join('')+'</div><div id="growthPanel"></div>';
  root.querySelectorAll('[data-growth-tab]').forEach(b=>b.onclick=()=>{prefs.growthTab=b.dataset.growthTab;save();renderGrowth();});
  const panel=root.querySelector('#growthPanel');
  if(tab==='badges')panel.innerHTML='<div class="ws-badges">'+BADGES.map(b=>'<details class="ws-badge '+(userState.badges.includes(b.id)?'earned':'')+'"><summary><span>'+b.icon+'</span><b>'+esc(b.name)+'</b><small>'+(userState.badges.includes(b.id)?'✓ 已获得':'待解锁')+'</small></summary><p>'+esc(b.desc)+'</p></details>').join('')+'</div>';
  else if(tab==='assessments'){panel.innerHTML='<div class="ws-assess-levels">'+ASSESS_SUBJECTS.map(s=>{const r=lastAssessmentRecord(s);return '<article><b>'+names[s]+'</b><p>'+(r?'L'+r.level:'未测评')+'</p></article>';}).join('')+'</div><details class="ws-unit"><summary>查看全部测评记录（'+(userState.assessmentRecords||[]).length+'）</summary>'+(userState.assessmentRecords||[]).slice().reverse().map(r=>'<p>'+esc(names[r.subject])+' · L'+r.level+' · '+r.score+'/'+r.total+' · '+esc(fmtTime(r.time))+'</p>').join('')+'</details>'+actions([['page-assessment','开始诊断测评']]);bindRoutes(panel);}
  else{panel.append(chips(subject(),s=>{selectSubject(s);renderGrowth();}));const m=window.IGCSE_PROGRESS_VIEW.model(subject()),max=Math.max(1,...m.days.map(d=>d.answered)),s=userState.subjectStats[subject()]||{answered:0,correct:0};const view=document.createElement('div');view.innerHTML='<section class="ws-growth-summary"><h3>'+names[subject()]+' · '+s.answered+' 次作答</h3><p>'+s.correct+' 次正确 · '+m.summary.learned+'/'+m.summary.topics+' 主题已读</p>'+meter(m.summary.mastery,'平均掌握估计')+'<p>掌握估计 '+m.summary.mastery+'% · '+m.summary.mastered+' 个主题练习表现稳固</p></section><h3>最近七天的作答</h3><ol class="ws-trend">'+m.days.map(d=>'<li><b>'+d.answered+'</b><span class="ws-trend-bar" style="height:'+Math.round(80*d.answered/max)+'px"></span><time>'+esc(d.date.slice(5))+'</time></li>').join('')+'</ol><p>只展示已记录的每日数据，不补造历史。</p>'+actions([['page-progress','查看主题与掌握依据'],['page-textbook','继续学习'],['page-backup','数据备份']]);panel.append(view);bindRoutes(view);}
 }
 function build(){
  const assessment=document.getElementById('assessmentArea');document.getElementById('practiceAssessment').append(assessment);
  const home=document.querySelector('#mainNav [data-page="page-home"]'),textbook=document.querySelector('#mainNav [data-page="page-textbook"]'),assess=document.querySelector('#mainNav [data-page="page-assessment"]');
  home.hidden=true;assess.hidden=true;home.onclick=()=>switchPage('page-home');assess.onclick=()=>switchPage('page-assessment');textbook.onclick=()=>{switchPage('page-textbook');renderLearning();};
  document.getElementById('subjectSelect').onchange=function(){if(userState.mockExams?.activePractice&&document.getElementById('page-practice').classList.contains('active')){this.value=currentSubject;showToast('请先继续或交卷当前模拟考');return;}if(document.getElementById('page-practice').classList.contains('active'))clearPractice();selectSubject(this.value);const active=document.querySelector('.page.active')?.id;if(active==='page-textbook')renderLearning();if(active==='page-practice')renderPractice();if(active==='page-profile')renderGrowth();if(active==='page-resources')renderMyResources();};
  window.addEventListener('igcse-page-change',e=>{const id=e.detail.id;if(id==='page-home'){go('page-textbook');return;}if(id==='page-assessment'){go('page-practice');practiceTab('assessment');return;}if(id==='page-textbook')renderLearning();if(id==='page-practice')renderPractice();if(id==='page-profile')renderGrowth();});
  window.initMotionWorkspace?.();
  renderLearning();
 }
 window.IGCSE_WORKSPACE={subjectChips:chips,setVocabRange:(chapter,selectedSubject='english')=>{prefs.vocab={subject:selectedSubject,chapter,search:''};save();renderVocab();},renderLearning,rememberTopic,renderPractice,practiceTab,enhanceDashboard,renderQuickref,renderVocab,gamePool,renderGrowth};
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build);else build();
})();
