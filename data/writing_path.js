/* Practice stages and difficulty choices are not examination grades. */
(function(){
 const stages={sentence:{name:'① 句子起步',goal:'写清一个想法，再检查主语、动词与时态。',range:[15,40],rows:5},paragraph:{name:'② 段落发展',goal:'主题句 → 理由 → 例子 → 小结，围绕一个主要意思。',range:[50,90],rows:8},article:{name:'③ 完整成文',goal:'回应题目各要点，安排段落，检查受众、语气与语言。',range:[120,160],rows:12}};
 const levels={foundation:'基础：短句与常用表达',core:'标准：IGCSE语境表达',stretch:'挑战：丰富句式与论证'};
 function range(stage,level){if(stage!=='article')return stages[stage]?.range||stages.article.range;return level==='foundation'?[80,120]:level==='stretch'?[180,220]:[120,160];}
 function checkpoints(text,stage){const words=(String(text).match(/[A-Za-z]+(?:['’-][A-Za-z]+)*|\d+(?:[.,]\d+)*/g)||[]).length,[min]=range(stage,'core');return {words,ready:words>=min,steps:stages[stage]?.goal||stages.article.goal};}
 window.IGCSE_WRITING_PATH={stages,levels,range,checkpoints};
})();
