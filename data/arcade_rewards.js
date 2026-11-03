/* Game rewards are separate from assessment/mastery; only completed rounds commit rewards. */
(function(){
 'use strict';
 const badges={first:['🚀','初次启航','First expedition'],combo:['🔥','五连击','Five in a row'],perfect:['🌟','独立满分','Independent perfect round'],recovery:['🛠️','坚持纠错','Correction champion'],matcher:['🧩','配对达人','Match explorer']};
 const levels=[{at:0,icon:'🌱',zh:'探索者',en:'Explorer'},{at:50,icon:'🧭',zh:'挑战者',en:'Challenger'},{at:150,icon:'⚡',zh:'突破者',en:'Trailblazer'},{at:300,icon:'🛡️',zh:'守护者',en:'Guardian'},{at:600,icon:'👑',zh:'词汇勇士',en:'Word champion'}];
 function day(now){const d=new Date(now);return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');}
 function wallet(state){const s=state.vocabArcade||(state.vocabArcade={records:{}});return s.rewards||(s.rewards={points:0,roundsCompleted:0,badges:[],daily:{day:'',credits:{}},history:[]});}
 function rank(points){let i=0;for(let n=0;n<levels.length;n++)if(points>=levels[n].at)i=n;const current=levels[i],next=levels[i+1];return {current,next,progress:next?Math.max(0,Math.min(1,(points-current.at)/(next.at-current.at))):1};}
 function summary(g){const total=g.mode==='match'?g.pairs:g.queue.length,ratio=g.mode==='match'?g.pairs/Math.max(1,g.pairs+(g.matchMisses||0)):g.right/Math.max(1,total);return {mode:g.mode,score:g.score||0,stars:ratio>=.9?3:ratio>=.6?2:1,independent:g.right||0,corrected:g.corrected||0,pairs:g.pairs||0,total,bestCombo:g.bestCombo||0};}
 function finish(state,g,now=Date.now()){
  if(g.rewardResult)return g.rewardResult;
  const w=wallet(state),before=rank(w.points).current.at,s=summary(g),today=day(now);if(w.daily.day!==today)w.daily={day:today,credits:{}};let earned=0;
  for(const [key,amount] of Object.entries(g.claims||{})){const previous=w.daily.credits[key]||0;if(!previous&&Object.keys(w.daily.credits).length>=200)continue;const value=Math.min(10,amount);if(value>previous){earned+=value-previous;w.daily.credits[key]=value;}}
  w.points+=earned;w.roundsCompleted++;const unlocked=[];for(const id of ['first',...(s.bestCombo>=5?['combo']:[]),...(s.mode!=='match'&&s.total>=5&&s.independent===s.total?['perfect']:[]),...(s.corrected>0?['recovery']:[]),...(s.mode==='match'&&s.pairs>=5?['matcher']:[])])if(!w.badges.includes(id)){w.badges.push(id);unlocked.push(id);}
  w.history.unshift({...s,date:now});w.history=w.history.slice(0,100);g.rewardResult={...s,earned,unlocked,levelUp:rank(w.points).current.at>before};return g.rewardResult;
 }
 function hit(g,wordKey,independent){g.combo=independent?(g.combo||0)+1:0;g.bestCombo=Math.max(g.bestCombo||0,g.combo);const gain=independent?10+Math.min(g.combo,5)*2:3;g.score=(g.score||0)+gain;if(!independent)g.corrected=(g.corrected||0)+1;g.claims=g.claims||{};g.claims[wordKey]=Math.max(g.claims[wordKey]||0,independent?10:2);return gain;}
 function pair(g,wordKey){g.combo=(g.combo||0)+1;g.bestCombo=Math.max(g.bestCombo||0,g.combo);g.pairs=(g.pairs||0)+1;g.score=(g.score||0)+4;g.claims=g.claims||{};g.claims[wordKey]=Math.max(g.claims[wordKey]||0,2);}
 window.IGCSE_ARCADE_REWARDS={badges,levels,day,wallet,rank,summary,finish,hit,pair};
})();
