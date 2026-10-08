/* IGCSE Personal Learning OS — Error Diagnosis v1 */
(function(){
'use strict';
const state=()=>window.userState||(window.userState={});
const ensure=()=>{const s=state();s.errorDiagnosis=s.errorDiagnosis||{};return s.errorDiagnosis;};
const normalize=s=>String(s||'').toLowerCase();
function infer(d){
 const q=d.question||{}, ans=normalize(d.answer), exp=normalize(q.explanation||q.answer||'');
 const types=[];
 if(q.commandWord)types.push('command_word');
 if(q.skill)types.push(normalize(q.skill).includes('graph')?'graph_interpretation':normalize(q.skill).includes('practical')?'practical_method':normalize(q.skill).includes('calculation')?'calculation':'application');
 if(!d.correct){
   if(q.type==='number'||normalize(q.skill).includes('calculation'))types.push('calculation');
   if(normalize(q.skill).includes('graph'))types.push('graph_interpretation');
   if(q.commandWord==='Explain'||q.commandWord==='Justify')types.push('concept_explanation');
   if(!q.commandWord&&!q.skill)types.push('knowledge');
 }
 return [...new Set(types)];
}
function record(d){
 if(!d||d.correct)return;
 const s=state(), q=(window.questionData||[]).find(x=>x.id===d.qid)||{};
 const types=(d.errorTypes&&d.errorTypes.length?d.errorTypes:infer({question:q,answer:d.answer}));
 const e=ensure();
 types.forEach(t=>{
   e[t]=e[t]||{count:0,lastAt:null,subjects:{},questions:[]};
   e[t].count++;e[t].lastAt=new Date().toISOString();
   e[t].subjects[d.subject||q.subject]=(e[t].subjects[d.subject||q.subject]||0)+1;
   if(d.qid&&!e[t].questions.includes(d.qid))e[t].questions.unshift(d.qid);
   e[t].questions=e[t].questions.slice(0,20);
 });
 if(window.saveUserState)window.saveUserState(s);
}
function top(subject){
 const e=ensure();
 return Object.keys(e).map(k=>({type:k,count:e[k].subjects&&e[k].subjects[subject]||0,total:e[k].count||0})).filter(x=>x.count>0).sort((a,b)=>b.count-a.count);
}
window.IGCSE_ERROR_DIAGNOSIS={infer,record,top};
window.addEventListener('igcse-answer-recorded',e=>record(e.detail||{}));
})();