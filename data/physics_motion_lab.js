/* Physics 0625 Motion Lab — complete learning-loop pilot
 * Learn → English → Practice → Feedback → SRS → Mastery → Quest → Boss
 */
window.PHYSICS_MOTION_LAB={
 version:'2.0',
 syllabus:'0625', years:'2026-2028', topic:'1.2 Motion',
 objectives:[
  {id:'M1',title:'Speed',ref:'1.2.1',en:'Speed',definition:'Distance travelled per unit time.',formula:'speed = distance / time',vocab:['speed','distance','time'],skills:['Knowledge','Calculation']},
  {id:'M2',title:'Velocity',ref:'1.2.2',en:'Velocity',definition:'Speed in a stated direction.',formula:'velocity = speed + direction',vocab:['velocity','direction'],skills:['Knowledge','Application']},
  {id:'M3',title:'Average speed',ref:'1.2.3',en:'Average speed',definition:'Total distance divided by total time.',formula:'average speed = total distance / total time',vocab:['average speed','total distance','total time'],skills:['Calculation','Problem Solving']},
  {id:'M4',title:'Motion graphs',ref:'1.2.4–1.2.5',en:'Motion graphs',definition:'Distance–time and speed–time graphs describe motion.',formula:'gradient of distance-time graph = speed',vocab:['distance-time graph','speed-time graph','gradient'],skills:['Graph','Data Analysis']},
  {id:'M5',title:'Gradient and area',ref:'1.2.6–1.2.7',en:'Gradient and area',definition:'Gradient and area provide physical quantities from motion graphs.',formula:'area under speed-time graph = distance',vocab:['gradient','area under the graph'],skills:['Graph','Calculation']},
  {id:'M6',title:'Acceleration',ref:'1.2.8–1.2.9',en:'Acceleration',definition:'Change in velocity per unit time.',formula:'acceleration = change in velocity / time',vocab:['acceleration','change in velocity'],skills:['Calculation','Application']},
  {id:'M7',title:'Deceleration',ref:'1.2.10–1.2.12',en:'Deceleration',definition:'Acceleration opposite to the chosen positive direction.',formula:'a = (final velocity − initial velocity) / time',vocab:['deceleration','negative acceleration'],skills:['Calculation','Interpretation']},
  {id:'M8',title:'Terminal velocity',ref:'1.2.13',en:'Terminal velocity',definition:'Constant velocity reached when resistive force balances weight.',formula:'resultant force = 0 → acceleration = 0',vocab:['air resistance','weight','resultant force','terminal velocity'],skills:['Explanation','Application']}
 ],
 vocabulary:[
  ['speed','速率'],['velocity','速度（有方向）'],['distance','路程'],['displacement','位移'],['time','时间'],
  ['average speed','平均速率'],['acceleration','加速度'],['deceleration','减速度'],['gradient','斜率'],
  ['distance-time graph','路程—时间图'],['speed-time graph','速率—时间图'],['area under the graph','图像下方面积'],
  ['air resistance','空气阻力'],['terminal velocity','终端速度'],['resultant force','合力'],['constant velocity','匀速']
 ],
 commandWords:[
  {word:'Define',zh:'定义',action:'Give the precise meaning of a term.'},
  {word:'State',zh:'写出 / 指出',action:'Give a short, direct answer; no explanation is normally needed.'},
  {word:'Describe',zh:'描述',action:'Say what happens or what the data/graph shows.'},
  {word:'Explain',zh:'解释',action:'Give reasons using physics ideas or cause-and-effect.'},
  {word:'Calculate',zh:'计算',action:'Show an appropriate calculation and give the correct unit where applicable.'},
  {word:'Determine',zh:'确定 / 求出',action:'Use data, a graph or calculation to obtain the required value.'},
  {word:'Suggest',zh:'提出建议',action:'Give a reasonable answer supported by the context.'},
  {word:'Compare',zh:'比较',action:'Identify similarities and/or differences explicitly.'}
 ],
 practical:[
  {id:'P1',title:'Measure speed',steps:['Measure a known distance.','Measure the time taken.','Repeat and calculate speed = distance / time.'],english:['measure a distance','measure the time taken','repeat the measurement','calculate the speed'],pitfalls:'Use consistent units and repeat measurements to reduce random error.'},
  {id:'P2',title:'Motion graph',steps:['Record time and distance/speed.','Plot quantities with labelled axes and units.','Draw a suitable line/curve.','Use gradient or area when required.'],english:['label the axes','plot the points','draw a best-fit line','calculate the gradient'],pitfalls:'Do not confuse gradient with area; always check the axis quantities and units.'},
  {id:'P3',title:'Falling object',steps:['Observe increasing speed.','Describe changing air resistance.','Explain why forces become balanced at terminal velocity.'],english:['air resistance increases','forces become balanced','resultant force becomes zero'],pitfalls:'Gravity does not stop at terminal velocity; acceleration becomes zero.'}
 ],
 questions:[
  {id:'M-Q1',kp:'M1',type:'choice',marks:1,question:'A runner travels 150 m in 12 s. What is the speed?',options:['10.5 m/s','12.5 m/s','13.5 m/s','18.0 m/s'],answer:1,explanation:'speed = distance / time = 150 / 12 = 12.5 m/s.',mistake:'Formula selection or arithmetic',command:'Calculate'},
  {id:'M-Q2',kp:'M4',type:'choice',marks:1,question:'A horizontal section of a distance-time graph means the object is:',options:['accelerating','moving at constant speed','at rest','moving backwards'],answer:2,explanation:'Distance is unchanged as time increases, so the object is at rest.',mistake:'Graph interpretation',command:'Identify'},
  {id:'M-Q3',kp:'M6',type:'number',marks:2,question:'Velocity increases from 6 m/s to 18 m/s in 4 s. Calculate the acceleration.',answer:3,unit:'m/s²',explanation:'a = (18 − 6) / 4 = 3 m/s².',mistake:'Subtraction order or missing time',command:'Calculate'},
  {id:'M-Q4',kp:'M5',type:'number',marks:2,question:'A vehicle travels at 8 m/s for 6 s. Find the distance travelled.',answer:48,unit:'m',explanation:'Distance is the area under a speed-time graph: 8 × 6 = 48 m.',mistake:'Using gradient instead of area',command:'Determine'},
  {id:'M-Q5',kp:'M7',type:'choice',marks:2,question:'A car changes velocity from +20 m/s to +8 m/s in 3 s. What is its acceleration?',options:['+4 m/s²','−4 m/s²','+9.3 m/s²','−9.3 m/s²'],answer:1,explanation:'a = (8 − 20) / 3 = −4 m/s².',mistake:'Sign convention',command:'Calculate'},
  {id:'M-Q6',kp:'M8',type:'choice',marks:2,question:'Why does a falling object eventually reach terminal velocity?',options:['Mass becomes zero','Air resistance disappears','Air resistance balances weight','Gravity stops'],answer:2,explanation:'When resistance balances weight, resultant force is zero and acceleration becomes zero.',mistake:'Misunderstanding balanced forces',command:'Explain'},
  {id:'M-Q7',kp:'M2',type:'choice',marks:1,question:'Which statement correctly distinguishes velocity from speed?',options:['Velocity has a direction','Velocity is always larger','Speed has a direction','Speed is always constant'],answer:0,explanation:'Velocity is a vector quantity and includes direction; speed is scalar.',mistake:'Speed vs velocity',command:'State'},
  {id:'M-Q8',kp:'M4',type:'choice',marks:2,question:'The gradient of a straight section of a distance-time graph represents:',options:['acceleration','distance','speed','force'],answer:2,explanation:'Gradient = change in distance / change in time = speed.',mistake:'Confusing graph meanings',command:'State'}
 ],
 boss:[
  {id:'B1',type:'choice',kp:'M4',question:'A speed-time graph is horizontal at 12 m/s for 5 s. What does the area under this section represent?',options:['Acceleration','Distance travelled','Average speed','Resultant force'],answer:1,explanation:'Area under a speed-time graph represents distance.'},
  {id:'B2',type:'number',kp:'M6',question:'A cyclist changes velocity from 4 m/s to 16 m/s in 6 s. Calculate acceleration.',answer:2,unit:'m/s²',explanation:'(16 − 4) / 6 = 2 m/s².'},
  {id:'B3',type:'choice',kp:'M8',question:'Which statement best explains terminal velocity?',options:['The object stops moving','Weight is zero','Resistance balances weight, so acceleration is zero','Gravity becomes weaker than air resistance'],answer:2,explanation:'Balanced forces give zero resultant force and therefore zero acceleration.'},
  {id:'B4',type:'choice',kp:'M5',question:'A student calculates the gradient when the question asks for distance from a speed-time graph. What should they use?',options:['The gradient','The area under the graph','The y-intercept','The highest speed only'],answer:1,explanation:'Distance is obtained from the area under a speed-time graph.'}
 ],
 quest:{title:'⚡ Motion Quest',tasks:[
  {id:'learn',label:'Learn 5 Motion knowledge points',target:5,xp:25},
  {id:'practice',label:'Answer 6 Motion questions',target:6,xp:35},
  {id:'vocab',label:'Master 10 Physics words',target:10,xp:25},
  {id:'srs',label:'Complete today’s SRS review',target:1,xp:20}
 ],reward:120}
};

(function(){
 var K='igcse_motion_lab_v2',defaults={mastery:{},dims:{},xp:0,wrong:[],srs:{},stats:{attempts:0,correct:0},quest:{},boss:{best:0}};
 var s=defaults;
 try{s=Object.assign(defaults,JSON.parse(localStorage.getItem(K)||'{}'));}catch(e){}
 window.IGCSE_MOTION_STATE=s;
 window.saveMotion=function(){try{localStorage.setItem(K,JSON.stringify(s));}catch(e){}};
 window.motionMastery=function(k){return Math.round(s.mastery[k]||0);};
 window.updateMotionMastery=function(k,ok,dimension){
   var old=s.mastery[k]||0;
   s.mastery[k]=Math.max(0,Math.min(100,Math.round(ok?old+(100-old)*0.18+4:old*0.82)));
   if(dimension){s.dims[k]=s.dims[k]||{};var d=s.dims[k],v=d[dimension]||0;d[dimension]=Math.max(0,Math.min(100,Math.round(ok?v+(100-v)*.2+3:v*.82)));}
   s.stats.attempts=(s.stats.attempts||0)+1;if(ok)s.stats.correct=(s.stats.correct||0)+1;
   window.saveMotion();
 };
 window.addMotionXP=function(n){s.xp=(s.xp||0)+n;window.saveMotion();};
 window.scheduleMotionSRS=function(k,ok){
   var now=Date.now(),days=ok?Math.min(14,Math.pow(2,(s.srs[k]?.stage||0)+1)):1;
   s.srs[k]={stage:ok?(s.srs[k]?.stage||0)+1:0,nextReview:now+days*86400000};
   window.saveMotion();
 };
})();

/* Upgrade the existing Motion Lab UI without changing the site's main architecture. */
document.addEventListener('DOMContentLoaded',function(){
 var page=document.getElementById('motion-lab-page');if(!page||!window.PHYSICS_MOTION_LAB)return;
 page.innerHTML='<div class="grid lg:grid-cols-12 gap-4"><section class="lg:col-span-8"><div class="bg-gradient-to-r from-indigo-700 to-violet-700 text-white rounded-2xl shadow p-5"><div class="text-xs opacity-80">CAMBRIDGE IGCSE PHYSICS · 0625 · 2026–2028 · 1.2 MOTION</div><h2 class="text-3xl font-bold mt-2">⚡ Motion Lab</h2><p class="text-indigo-100 mt-1">Learn · Play · Master · English</p><div class="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm"><div class="bg-white/10 rounded-lg p-2">Mastery <b id="mvMastery">0%</b></div><div class="bg-white/10 rounded-lg p-2">XP <b id="mvXP">0</b></div><div class="bg-white/10 rounded-lg p-2">Accuracy <b id="mvAcc">0%</b></div><div class="bg-white/10 rounded-lg p-2">SRS <b id="mvSRS">0</b></div></div></div><div class="bg-white rounded-2xl shadow p-5 mt-4"><div id="mvTabs" class="flex flex-wrap gap-2"></div><div id="mvContent" class="mt-4"></div></div></section><aside class="lg:col-span-4"><div class="bg-white rounded-2xl shadow p-5"><h3 class="font-bold">🌳 Motion Skill Tree</h3><div id="mvTree" class="mt-3 space-y-2"></div></div><div class="bg-white rounded-2xl shadow p-5 mt-4"><h3 class="font-bold">🎯 Today’s Quest</h3><div id="mvQuest" class="mt-3 text-sm"></div></div></aside></div>';
 var lab=window.PHYSICS_MOTION_LAB,s=window.IGCSE_MOTION_STATE,active='M1',tab='learn',qidx=0,bidx=0;
 var esc=function(x){return String(x).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});};
 function avg(){var a=lab.objectives.map(o=>s.mastery[o.id]||0);return Math.round(a.reduce((x,y)=>x+y,0)/a.length);}
 function acc(){return s.stats.attempts?Math.round(100*s.stats.correct/s.stats.attempts):0;}
 function updateHeader(){document.getElementById('mvMastery').textContent=avg()+'%';document.getElementById('mvXP').textContent=s.xp||0;document.getElementById('mvAcc').textContent=acc()+'%';document.getElementById('mvSRS').textContent=Object.values(s.srs||{}).filter(x=>x.nextReview<=Date.now()).length;}
 function bar(n){return '<div class="h-2 bg-slate-200 rounded-full overflow-hidden mt-2"><div class="h-full bg-indigo-500" style="width:'+n+'%"></div></div>';}
 function drawTree(){document.getElementById('mvTree').innerHTML=lab.objectives.map(o=>{var n=Math.round(s.mastery[o.id]||0);return '<button data-k="'+o.id+'" class="w-full text-left border rounded-xl p-3 hover:bg-indigo-50"><div class="flex justify-between text-sm"><b>'+esc(o.title)+'</b><span>'+n+'%</span></div>'+bar(n)+'<div class="text-xs text-slate-500 mt-1">'+o.ref+' · '+esc(o.en)+'</div></button>';}).join('');document.querySelectorAll('#mvTree [data-k]').forEach(x=>x.onclick=function(){active=x.dataset.k;tab='learn';render();});}
 function renderQuest(){document.getElementById('mvQuest').innerHTML=lab.quest.tasks.map(t=>'<div class="mb-3"><div class="flex justify-between gap-2"><span>'+esc(t.label)+'</span><b>+'+t.xp+' XP</b></div>'+bar(Math.min(100,((s.quest[t.id]||0)/t.target)*100))+'</div>').join('')+'<div class="text-xs text-slate-500">完成全部任务：+'+lab.quest.reward+' XP</div>';}
 function vocab(){return lab.vocabulary.slice(0,12).map(x=>'<button class="border rounded-lg p-2 text-left hover:bg-indigo-50" data-speak="'+esc(x[0])+'"><b>'+esc(x[0])+'</b><span class="text-slate-500"> · '+esc(x[1])+'</span> 🔊</button>').join('');}
 function learn(){var o=lab.objectives.find(x=>x.id===active), mode=window.igcseLang?window.igcseLang():'learn';var title=mode==='exam'?o.en:o.title;var zh=mode==='exam'?'':('<p class="mt-2 text-slate-600">'+esc(o.definition)+'</p>');return '<div class="text-xs text-indigo-600 font-bold">'+o.ref+'</div><h3 class="text-2xl font-bold mt-1">'+esc(title)+'</h3>'+zh+'<div class="mt-4 grid md:grid-cols-2 gap-3"><div class="p-4 rounded-xl bg-indigo-50"><b>Formula</b><div class="text-xl mt-2">'+esc(o.formula)+'</div></div><div class="p-4 rounded-xl bg-slate-50"><b>Skills</b><p class="mt-2 text-sm">'+o.skills.join(' · ')+'</p></div></div><div class="mt-4 p-4 border rounded-xl"><b>English vocabulary</b><div class="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3">'+o.vocab.map(v=>'<button class="border rounded-lg px-3 py-2 text-left" data-speak="'+esc(v)+'">🔊 '+esc(v)+'</button>').join('')+'</div></div><div class="mt-4 p-4 border rounded-xl"><b>Knowledge check</b><p class="text-sm text-slate-600 mt-1">学习后标记完成，系统会计入 Quest 与 Mastery。</p><button id="mvLearnDone" class="mt-3 bg-indigo-600 text-white px-4 py-2 rounded-lg">✓ Mark as learned · +10 XP</button></div>';}
 function english(){var o=lab.objectives.find(x=>x.id===active),c=lab.commandWords[qidx%lab.commandWords.length];return '<div class="p-4 rounded-xl bg-indigo-50"><div class="text-xs text-indigo-700 font-bold">EXAM ENGLISH</div><h3 class="text-xl font-bold mt-1">'+esc(o.en)+'</h3><p class="mt-2"><b>Example:</b> Calculate the speed of the car.</p><p class="mt-2 text-sm">考试重点：<b>Calculate</b> 要求用适当方法求出数值，并注意计算过程和单位。</p></div><div class="mt-4 p-4 border rounded-xl"><b>Command Word Academy</b><div class="mt-2 text-2xl font-bold">'+c.word+'</div><div class="text-sm text-slate-600">'+c.zh+' · '+c.action+'</div><button class="mt-3 border rounded-lg px-3 py-2" data-speak="'+c.word+'">🔊 Hear command word</button></div><div class="mt-4 p-4 border rounded-xl"><b>Exam Decoder</b><ol class="list-decimal ml-5 mt-2 text-sm space-y-1"><li>Find the command word.</li><li>Identify the physics quantity/data.</li><li>Select the formula or graph operation.</li><li>Calculate and include the correct unit.</li></ol></div>';}
 function questionCard(q,bossMode){var prompt=window.igcseLang&&window.igcseLang()==='exam'?q.question:q.question;var opts=q.options||[];return '<div class="border rounded-xl p-4"><div class="text-xs text-indigo-600 font-bold">'+(bossMode?'BOSS BATTLE':'PRACTICE')+' · '+(q.marks||1)+' marks · '+esc(q.command||'')+'</div><h3 class="text-lg font-semibold mt-2">'+esc(prompt)+'</h3>'+(opts.length?'<div class="grid gap-2 mt-4">'+opts.map((x,i)=>'<button class="mvOpt border rounded-lg p-3 text-left hover:bg-indigo-50" data-i="'+i+'">'+String.fromCharCode(65+i)+'. '+esc(x)+'</button>').join('')+'</div>':'<div class="mt-4"><input id="mvNum" type="number" step="any" class="border rounded-lg p-3 w-full" placeholder="Enter your answer"><button id="mvSubmit" class="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-lg">Check answer</button></div>')}<div id="mvFeedback" class="mt-4"></div></div>';}
 function practice(){var pool=(lab.questions||[]).concat(lab.examQuestions||[]),q=pool[qidx%pool.length];return '<div class="mb-3 p-3 rounded-xl bg-slate-50 border"><b>Exam Skills:</b> '+esc(q.skill||'core')+' · '+esc(q.command||'')+'</div>'+questionCard(q,false)+'<p class="text-xs text-slate-500 mt-3">Question '+((qidx%pool.length)+1)+' / '+pool.length+'</p>';}
 function boss(){var q=lab.boss[bidx%lab.boss.length];return '<div class="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 mb-4"><b>👑 Motion Boss Battle</b><p class="text-sm mt-1">综合知识、计算、图像理解与考试英语。</p></div>'+questionCard(q,true);}
 function render(){updateHeader();drawTree();renderQuest();document.getElementById('mvTabs').innerHTML=['learn','english','practice','srs','boss'].map(x=>'<button data-tab="'+x+'" class="px-3 py-2 rounded-lg '+(tab===x?'bg-indigo-600 text-white':'bg-slate-100')+'">'+({learn:'📚 Learn',english:'🇬🇧 English',practice:'🎯 Practice',srs:'🔁 SRS',boss:'👑 Boss'}[x])+'</button>').join('');document.querySelectorAll('#mvTabs [data-tab]').forEach(x=>x.onclick=function(){tab=x.dataset.tab;render();});var html=tab==='learn'?learn():tab==='english'?english():tab==='practice'?practice():tab==='boss'?boss():'<div class="p-4 rounded-xl bg-slate-50"><b>🔁 SRS Review</b><p class="text-sm text-slate-600 mt-1">到期知识点会优先出现。完成后自动更新下一次复习时间。</p><div class="grid md:grid-cols-2 gap-2 mt-3">'+lab.objectives.map(o=>{var z=s.srs[o.id];return '<div class="border rounded-lg p-3"><b>'+esc(o.title)+'</b><div class="text-xs text-slate-500 mt-1">'+(z?(z.nextReview<=Date.now()?'Due now':'Scheduled'):'Not scheduled')+'</div></div>';}).join('')+'</div></div>';document.getElementById('mvContent').innerHTML=html;bind();}
 function bind(){document.querySelectorAll('[data-speak]').forEach(x=>x.onclick=function(){if(window.speakIGCSE)window.speakIGCSE(x.dataset.speak);});var done=document.getElementById('mvLearnDone');if(done)done.onclick=function(){s.quest.learn=Math.min(5,(s.quest.learn||0)+1);window.addMotionXP(10);window.saveMotion();render();};document.querySelectorAll('.mvOpt').forEach(x=>x.onclick=function(){check(Number(x.dataset.i));});var sub=document.getElementById('mvSubmit');if(sub)sub.onclick=function(){var v=Number(document.getElementById('mvNum').value);check(v);};}
 function check(v){var isBoss=tab==='boss',pool=isBoss?lab.boss:(lab.questions||[]).concat(lab.examQuestions||[]),q=pool[isBoss?bidx%pool.length:qidx%pool.length],ok=(q.tolerance!=null&&typeof v==='number')?Math.abs(v-q.answer)<=q.tolerance:String(v)===String(q.answer);var dim=q.command==='Calculate'?'Calculation':q.command==='Explain'?'Explanation':q.command==='State'?'Knowledge':'Application';window.updateMotionMastery(q.kp,ok,dim);window.scheduleMotionSRS(q.kp,ok);if(!ok)s.wrong.unshift({id:q.id,kp:q.kp,time:Date.now(),mistake:q.mistake||q.errorType||'Review the concept and command word.',errorType:q.errorType||'knowledge'});else s.quest.practice=Math.min(6,(s.quest.practice||0)+1);window.addMotionXP(ok?(isBoss?35:15):3);window.saveMotion();var fb=document.getElementById('mvFeedback');if(fb)fb.innerHTML='<div class="p-3 rounded-lg '+(ok?'bg-green-50 text-green-700':'bg-red-50 text-red-700')+'"><b>'+(ok?'✓ Correct':'✗ Review this')+'</b><p class="mt-1">'+esc(q.explanation)+'</p>'+(q.mistake||q.errorType?'<p class="text-xs mt-1"><b>Diagnostic:</b> '+esc(q.mistake||q.errorType)+'</p>':'')+'</div><button id="mvNext" class="mt-2 bg-slate-900 text-white px-4 py-2 rounded-lg">Next</button>';document.getElementById('mvNext').onclick=function(){if(isBoss)bidx++;else qidx++;render();};}
 render();
});

/* Exam-skill extension: graph/data/practical questions + diagnostic error taxonomy */
(function(){
  var L=window.PHYSICS_MOTION_LAB;
  L.examSkills=[
   {id:'graph',name:'Graph Skills',items:['read axes and units','calculate gradient','interpret shape','use area under speed-time graph']},
   {id:'data',name:'Data Analysis',items:['identify trend','compare values','calculate from data','comment on anomalies']},
   {id:'calculation',name:'Calculation',items:['select formula','substitute values','calculate','include unit','check significant figures']},
   {id:'practical',name:'Practical Skills',items:['independent/dependent variables','repeat measurements','plot graph','reduce random error','identify limitations and improvements']}
  ];
  L.examQuestions=(L.examQuestions||[]).concat([
   {id:'E-G1',kp:'M4',skill:'graph',type:'choice',marks:2,command:'Describe',question:'A distance-time graph rises as a straight line. What does this show about the object?',options:['It is stationary','It moves at constant speed','It accelerates uniformly','It changes direction continuously'],answer:1,explanation:'A constant gradient on a distance-time graph means constant speed.',errorType:'graph_interpretation'},
   {id:'E-G2',kp:'M5',skill:'graph',type:'number',marks:2,command:'Calculate',question:'A section of a speed-time graph has speed 6 m/s for 10 s. Calculate the distance travelled during this section.',answer:60,unit:'m',explanation:'Distance = area under the graph = 6 × 10 = 60 m.',errorType:'graph_operation'},
   {id:'E-D1',kp:'M3',skill:'data',type:'number',marks:2,command:'Calculate',question:'A student travels 240 m in 20 s, then 160 m in 10 s. Calculate the average speed for the complete journey.',answer:13.3333333333,tolerance:0.1,unit:'m/s',explanation:'Total distance = 400 m; total time = 30 s; average speed = 400/30 = 13.3 m/s.',errorType:'data_selection'},
   {id:'E-C1',kp:'M6',skill:'calculation',type:'number',marks:2,command:'Determine',question:'A car increases velocity from 5 m/s to 17 m/s in 6 s. Determine its acceleration.',answer:2,tolerance:0.01,unit:'m/s²',explanation:'a = (17 − 5)/6 = 2 m/s².',errorType:'calculation'},
   {id:'E-P1',kp:'M1',skill:'practical',type:'choice',marks:2,command:'Suggest',question:'A student measures a short distance and time once to calculate speed. Which improvement most directly improves reliability?',options:['Use a longer measured distance and repeat the timing','Use fewer measurements','Remove the units','Round every value to the nearest 10'],answer:0,explanation:'A longer distance gives a larger time interval and repeated measurements reduce random error.',errorType:'practical_method'},
   {id:'E-E1',kp:'M8',skill:'practical',type:'choice',marks:2,command:'Explain',question:'Explain why the acceleration of a falling object becomes zero at terminal velocity.',options:['The object has no mass','Weight is balanced by air resistance','Gravity stops acting','The object stops moving'],answer:1,explanation:'At terminal velocity, air resistance equals weight, so resultant force is zero and acceleration is zero.',errorType:'concept_explanation'}
  ]);
  L.diagnosticTypes={knowledge:'Knowledge gap',calculation:'Calculation / formula',command_word:'Command word / task interpretation',english:'English comprehension',graph_interpretation:'Graph interpretation',graph_operation:'Graph operation',data_selection:'Data selection',practical_method:'Practical method',concept_explanation:'Concept explanation'};
})();
