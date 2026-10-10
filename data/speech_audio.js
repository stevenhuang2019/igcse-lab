/* Device-provided voices: explicitly select US English and handle asynchronous discovery. */
(function(){
 'use strict';
 let selected='',speed=.9,generation=0,active=null,utterance=null;
 try{const p=JSON.parse(localStorage.getItem('igcseSpeechPrefs')||'{}');selected=typeof p.voice==='string'?p.voice:'';if([.75,.9,1].includes(p.speed))speed=p.speed;}catch{}
 const synth=()=>window.speechSynthesis;
 const voices=()=>synth()?.getVoices?.()||[];
 const us=v=>/^en[-_]US$/i.test(v.lang);
 function choose(list=voices()){return list.find(v=>us(v)&&v.voiceURI===selected)||list.filter(us).sort((a,b)=>Number(b.localService)-Number(a.localService)||Number(/Samantha|Google US English|Natural/i.test(b.name))-Number(/Samantha|Google US English|Natural/i.test(a.name)))[0]||list.find(v=>/^en[-_]/i.test(v.lang))||null;}
 function prefs(voice,rate){selected=voice||'';speed=[.75,.9,1].includes(Number(rate))?Number(rate):.9;try{localStorage.setItem('igcseSpeechPrefs',JSON.stringify({voice:selected,speed}));}catch{}}
 function cancel(){generation++;synth()?.cancel();if(active){active({ok:false,cancelled:true});active=null;}utterance=null;}
 async function speak(text,rate){cancel();const ticket=generation;if(!synth()||!window.SpeechSynthesisUtterance)return {ok:false,error:'unsupported'};/* Speak within the tap gesture, including cold voice discovery on phones. */if(ticket!==generation)return {ok:false,cancelled:true};const voice=choose(),u=new window.SpeechSynthesisUtterance(String(text));u.lang=voice?.lang||'en-US';if(voice)u.voice=voice;u.rate=typeof rate==='number'?Math.max(.6,Math.min(1.2,rate)):speed;u.pitch=1;u.volume=1;
  return new Promise(resolve=>{let timer;const finish=result=>{clearTimeout(timer);if(active===finish){active=null;utterance=null;}resolve({...result,voice:voice?.name||'',american:!!voice&&us(voice)});};active=finish;utterance=u;u.onend=()=>finish({ok:true});u.onerror=e=>finish({ok:false,error:e.error});timer=setTimeout(()=>{finish({ok:false,error:'timeout'});if(ticket===generation)synth().cancel();},Math.max(12000,String(text).length*180));try{synth().resume?.();synth().speak(u);}catch{finish({ok:false,error:'unavailable'});}});
 }
 if(synth()?.addEventListener)synth().addEventListener('voiceschanged',()=>window.dispatchEvent(new CustomEvent('igcse-voices-change')));
 window.IGCSE_SPEECH={voices,choose,speak,cancel,prefs,getPrefs:()=>({voice:selected,speed})};
})();
