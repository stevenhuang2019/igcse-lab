/* Local listening and speaking practice. Recordings stay in this tab, never uploaded. */
(function(){
 'use strict';
 const en=()=>window.IGCSE_SHELL?.getLanguage()==='en',label=(zh,english)=>en()?english:zh;
 let cleanup=()=>{};
 function source(q){return q?.audioTranscript||String(q?.question||'').match(/[“"]([^”"]+)[”"]/)?.[1]||'';}
 function stop(){cleanup();cleanup=()=>{};window.IGCSE_SPEECH?.cancel();}
 function panel(parent,kind,text,onReveal){
  stop();const box=document.createElement('section');box.className='english-media-panel';box.dataset.noTranslate='';
  const heading=document.createElement('h3');heading.textContent=label(kind==='listening'?'🎧 听前预测 → 播放 → 作答':'🎤 思考 → 录音 → 回放 → 自查',kind==='listening'?'🎧 Predict → Listen → Answer':'🎤 Plan → Record → Replay → Reflect');box.append(heading);
  const status=document.createElement('p');status.setAttribute('role','status');status.id='englishMediaStatus';
  const play=document.createElement('button');play.id='englishMediaPlay';play.textContent=label('▶ 播放美式示范','▶ Play English model');
  play.onclick=async()=>{status.textContent=label('正在播放…','Playing…');const r=await window.speakIGCSE(text);if(!box.isConnected)return;status.textContent=r?.ok?label('播放完成，可再次播放。','Finished. You can replay.'):r?.cancelled?'':label('未能播放，请检查设备音量、英语声音和浏览器声音权限后重试。','Playback failed. Check volume, English voices and browser sound permission, then retry.');};
  box.append(play,status);parent.append(box);
  if(kind==='listening'){
   const note=document.createElement('p');note.textContent=label('本站原创合成语音训练，非官方录音。首次点播放启用声音；进入新题后可再次点播放。','Original synthesized practice, not official exam audio. Tap play to enable sound and replay each new item.');
   const details=document.createElement('details');const summary=document.createElement('summary');summary.textContent=label('学习辅助：查看听力原文','Study support: reveal transcript');const transcript=document.createElement('p');transcript.lang='en';transcript.textContent=text;details.append(summary,transcript);if(onReveal)details.addEventListener('toggle',()=>{if(details.open)onReveal();});box.append(note,details);play.click();return box;
  }
  const note=document.createElement('p');note.textContent=label('录音仅保存在当前页面，刷新后清除；可下载到本机。回放自查不是自动评分，也不推算考试等级。','Recordings remain in this tab until reload; download to keep them. Replay and reflection are not automatic grading or an exam level.');box.append(note);
  const start=document.createElement('button'),end=document.createElement('button');start.id='englishRecordStart';end.id='englishRecordStop';start.textContent=label('● 开始录音（最长90秒）','● Record (up to 90 seconds)');end.textContent=label('■ 停止录音','■ Stop recording');end.disabled=true;box.append(start,end);
  const player=document.createElement('audio');player.controls=true;player.hidden=true;player.id='englishRecording';const download=document.createElement('a');download.hidden=true;download.textContent=label('下载我的录音','Download recording');box.append(player,download);
  const checks=document.createElement('fieldset');const legend=document.createElement('legend');legend.textContent=label('回放后自查','Reflect after replay');checks.append(legend);for(const [zh,eng] of [['回答紧扣问题','I answered the question'],['给出了理由和例子','I included a reason and an example'],['表达清楚、停顿合理','My speech was clear with useful pauses']]){const row=document.createElement('label'),input=document.createElement('input');input.type='checkbox';row.append(input,document.createTextNode(label(zh,eng)));checks.append(row);}box.append(checks);
  let recorder,stream,url,timer,disposed=false,pending=false;
  const release=()=>{clearTimeout(timer);stream?.getTracks().forEach(t=>t.stop());stream=null;};
  cleanup=()=>{disposed=true;if(recorder?.state==='recording')recorder.stop();release();if(url)URL.revokeObjectURL(url);player.removeAttribute('src');};
  start.onclick=async()=>{
   if(pending||recorder?.state==='recording')return;
   if(!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder){status.textContent=label('此浏览器不支持录音，请使用 HTTPS 下的 Chrome 或 Safari。','Recording is unavailable. Use Chrome or Safari over HTTPS.');return;}
   pending=true;start.disabled=true;status.textContent=label('请允许麦克风权限…','Please allow microphone permission…');
   try{
    stream=await navigator.mediaDevices.getUserMedia({audio:true});if(disposed||!box.isConnected){release();return;}
    const mime=['audio/webm;codecs=opus','audio/mp4','audio/webm'].find(t=>MediaRecorder.isTypeSupported?.(t));recorder=new MediaRecorder(stream,mime?{mimeType:mime}:undefined);const chunks=[];
    recorder.ondataavailable=e=>{if(e.data.size)chunks.push(e.data);};
    recorder.onstop=()=>{release();if(disposed||!box.isConnected)return;start.disabled=false;end.disabled=true;if(!chunks.length){status.textContent=label('没有录到声音，请重试。','No recording was captured. Try again.');return;}if(url)URL.revokeObjectURL(url);const blob=new Blob(chunks,{type:recorder.mimeType||mime||'audio/webm'});url=URL.createObjectURL(blob);player.src=url;player.hidden=false;download.href=url;download.download='igcse-speaking.'+(blob.type.includes('mp4')?'m4a':'webm');download.hidden=false;status.textContent=label('录音完成，请回放并自查。','Recording ready. Replay and reflect.');};
    recorder.onerror=()=>{release();start.disabled=false;end.disabled=true;status.textContent=label('录音中断，请重新录制。','Recording failed. Try again.');};
    window.IGCSE_SPEECH?.cancel();player.pause();recorder.start();end.disabled=false;status.textContent=label('正在录音，最长90秒…','Recording, up to 90 seconds…');timer=setTimeout(()=>{if(recorder.state==='recording')recorder.stop();},90000);
   }catch(e){release();if(!disposed){start.disabled=false;status.textContent=label(e.name==='NotAllowedError'?'麦克风被拒绝，请在浏览器站点设置中允许后重试。':'麦克风不可用或被占用，请检查设备后重试.',e.name==='NotAllowedError'?'Microphone denied. Allow it in site settings and retry.':'Microphone unavailable or busy. Check your device and retry.');}}finally{pending=false;}
  };
  end.onclick=()=>{if(recorder?.state==='recording'){end.disabled=true;recorder.stop();}};return box;
 }
 const notes={
 eng_esl_reading:'Locate information quickly, interpret meaning in context and infer unstated ideas. Support each answer with evidence from the text.',
 eng_esl_writing:'Before writing, identify your purpose, audience and register. Organise ideas into paragraphs, use suitable links and check accuracy and language range.',
 eng_esl_listening:'Read the questions first and predict the information required. Listen for paraphrases, numbers, times, places and changes to an earlier plan.',
 eng_esl_speaking:'Answer the question directly, develop your ideas and interact naturally. Give reasons and personal examples rather than reciting a memorised script.',
 eng_esl_language:'Learn grammar and vocabulary in context. Practise tenses, conditionals, sentence structures, collocations, phrasal verbs and synonyms.',
 eng_esl_exam:'Identify the command word, task, evidence and answer form before responding. Check qualifiers such as not, except, best and main reason.',
 eng_read_gist:'Identify what the whole paragraph is about. Distinguish its main idea from individual supporting details before choosing a summary.',
 eng_read_inference:'Infer a meaning that is not directly stated, using evidence from the text. Do not replace textual evidence with your own assumptions.',
 eng_write_email:'Identify the recipient, purpose and relationship before writing. Choose an appropriate opening, closing, vocabulary and level of formality.',
 eng_write_discussion:'Develop a point with a reason, example and link to the task. Consider more than one view and explain your position rather than listing opinions.',
 eng_listen_prediction:'Predict whether the answer will be a person, place, time or reason. Track corrections during listening and check the final information.',
 eng_speak_develop:'Develop an answer with a reason, example and personal detail. Adjust naturally to the conversation rather than memorising a long response.'
 };
 for(const topic of IGCSE_CATALOG.topicsFor('english'))if(notes[topic.topicId]&&!topic.knowledgeEn)topic.knowledgeEn=notes[topic.topicId];
 function refreshNotes(t){const node=document.getElementById('englishTopicNotes');if(!node)return;node.replaceChildren();const p=document.createElement('p');p.textContent=t.knowledgeEn||t.knowledge;p.lang=t.knowledgeEn?'en':'zh-CN';node.append(p);if(t.knowledgeEn&&igcseLang()!=='exam'){const d=document.createElement('details'),summary=document.createElement('summary'),zh=document.createElement('p');summary.textContent=label('查看中文讲解','Show Chinese notes');zh.textContent=t.knowledge;d.append(summary,zh);node.append(d);}else if(!t.knowledgeEn&&igcseLang()==='exam'){const note=document.createElement('p');note.textContent=label('本主题英文讲解待补，当前保留原文。','English notes for this topic are pending; the source text is shown.');node.append(note);}}
 let currentTopic;
 window.addEventListener('igcse-language-change',()=>{if(currentTopic)refreshNotes(currentTopic);});
 const original=window.openEnglishTopic;
 window.openEnglishTopic=function(t){original(t);currentTopic=t;const old=document.querySelector('#englishCenterContent .mt-3.text-gray-700');if(old){const notesRoot=document.createElement('div');notesRoot.id='englishTopicNotes';notesRoot.className=old.className;notesRoot.dataset.noTranslate='';old.replaceWith(notesRoot);document.querySelector('#englishCenterContent .content-fallback-note')?.remove();refreshNotes(t);}const kind=/listening/i.test(t.chapter)?'listening':/speaking/i.test(t.chapter)?'speaking':'';if(!kind){stop();return;}const qs=IGCSE_CATALOG.questionsFor('english',t.topicId);const q=qs.find(q=>source(q))||qs[0];const text=source(q)||(kind==='speaking'?'Describe an activity you enjoy. Explain why you enjoy it and give a personal example.':'Listen for the main idea. Then listen again for details and any changes to the first plan.');const media=panel(document.getElementById('englishCenterContent'),kind,text);document.getElementById('englishTopicNotes')?.before(media);};
 function attachQuestion(q,area,s){stop();if(q.subject!=='english'||['mock','paper'].includes(s.mode))return;const topic=IGCSE_CATALOG.topic('english',q.topicId);const category=q.skill||topic?.chapter||'';const kind=/listening/i.test(category)?'listening':/speaking/i.test(category)?'speaking':'';if(!kind)return;const text=source(q);if(kind==='listening'&&text){area.querySelector('.q-body').textContent=String(q.question).replace(text,label('[请听音源]','[listen to the audio]'));}const media=panel(area,kind,text||q.question,()=>{s.hints=s.hints||{};s.hints[q.id]=true;});area.querySelector('.q-body')?.after(media);}
 window.addEventListener('igcse-before-page-change',stop);document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
 window.IGCSE_ENGLISH_MEDIA={attachQuestion,stop,source};
})();
