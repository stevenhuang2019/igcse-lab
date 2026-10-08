/* English Master Database — unified language layer
 * Preserves the existing SUBJECT_VOCAB data and adds a normalized English-learning layer.
 * Sources are tagged so future CET-4/CET-6 imports can be merged without replacing IGCSE data.
 */
window.ENGLISH_MASTER_DB = {
  version:"1.0.0",
  schemaVersion:1,
  sources:{
    igcse_esl:{label:"IGCSE ESL 0510/0511",level:"IGCSE"},
    igcse_subject:{label:"IGCSE Subject English",level:"IGCSE"},
    cet4:{label:"CET-4",level:"CET",status:"import-ready"},
    cet6:{label:"CET-6",level:"CET",status:"import-ready"}
  },
  vocabulary:[],
  sentences:[
    {id:"sent_academic_001",level:"academic",category:"cause_effect",en:"This change may lead to a significant improvement in efficiency.",zh:"这一变化可能带来效率的显著提升。",pattern:"may lead to + noun",tags:["cause_effect","academic"]},
    {id:"sent_academic_002",level:"academic",category:"evidence",en:"The evidence suggests that the new method is more effective.",zh:"证据表明这种新方法更加有效。",pattern:"evidence suggests that...",tags:["evidence","academic"]},
    {id:"sent_academic_003",level:"academic",category:"comparison",en:"Compared with the original system, the new design is more reliable.",zh:"与原系统相比，新设计更加可靠。",pattern:"Compared with..., ...",tags:["comparison","academic"]},
    {id:"sent_exam_001",level:"exam",category:"explain",en:"This is because the process reduces the amount of time required.",zh:"这是因为该过程减少了所需的时间。",pattern:"This is because...",tags:["explain","igcse"]},
    {id:"sent_exam_002",level:"exam",category:"justify",en:"This option is more suitable because it meets the needs of the user.",zh:"这个选项更加合适，因为它满足用户的需求。",pattern:"... is more suitable because...",tags:["justify","igcse"]},
    {id:"sent_exam_003",level:"exam",category:"evaluate",en:"Overall, the advantages outweigh the disadvantages in this situation.",zh:"总体而言，在这种情况下优点大于缺点。",pattern:"Overall, ... outweigh...",tags:["evaluate","igcse"]},
    {id:"sent_exam_004",level:"exam",category:"suggest",en:"One possible improvement would be to increase the accuracy of the measurement.",zh:"一种可能的改进方法是提高测量的准确性。",pattern:"One possible improvement would be to...",tags:["suggest","igcse"]},
    {id:"sent_exam_005",level:"exam",category:"data",en:"The results show a clear upward trend as the variable increases.",zh:"结果显示，随着变量增加，呈现明显的上升趋势。",pattern:"The results show...",tags:["data","science"]},
    {id:"sent_business_001",level:"subject",category:"business",en:"Higher costs may reduce the firm's profit margin.",zh:"更高的成本可能降低企业的利润率。",pattern:"may reduce + noun",tags:["business","cause_effect"]},
    {id:"sent_cs_001",level:"subject",category:"computer_science",en:"The system uses encryption to protect data during transmission.",zh:"系统使用加密来保护数据传输过程中的数据。",pattern:"use + noun + to + verb",tags:["computer_science","security"]},
    {id:"sent_physics_001",level:"subject",category:"physics",en:"The gradient of the graph represents the acceleration.",zh:"图像的斜率代表加速度。",pattern:"The gradient of... represents...",tags:["physics","graphs"]},
    {id:"sent_chem_001",level:"subject",category:"chemistry",en:"The reaction rate increases when the temperature is increased.",zh:"温度升高时，反应速率增加。",pattern:"when + passive clause",tags:["chemistry","cause_effect"]}
  ],
  grammar:[
    {id:"grammar_001",level:"core",topic:"Tenses",rule:"Use past perfect for an action completed before another past event.",zh:"在一个过去动作发生之前已经完成的动作，常用过去完成时。",example:"By the time we arrived, the film had started.",tags:["tense","past_perfect"]},
    {id:"grammar_002",level:"core",topic:"Linking",rule:"Use however to connect contrasting ideas between clauses or sentences.",zh:"however 用于连接具有转折关系的观点。",example:"The journey was expensive; however, it was worthwhile.",tags:["linking","contrast"]},
    {id:"grammar_003",level:"academic",topic:"Cause and effect",rule:"Use because, therefore, therefore, as a result and lead to to express causal relationships.",zh:"使用 because、therefore、as a result、lead to 等表达因果关系。",example:"The sample was too small; therefore, the result may be unreliable.",tags:["cause_effect","academic"]},
    {id:"grammar_004",level:"academic",topic:"Conditionals",rule:"Use if + present simple with will/can for realistic future conditions.",zh:"真实的未来条件常使用 if + 一般现在时，再搭配 will/can。",example:"If the temperature increases, the reaction will become faster.",tags:["conditionals"]},
    {id:"grammar_005",level:"exam",topic:"Passive voice",rule:"Use passive voice when the action or process is more important than the person doing it.",zh:"当动作/过程比执行者更重要时使用被动语态。",example:"The data were collected at five-minute intervals.",tags:["passive","academic"]},
    {id:"grammar_006",level:"exam",topic:"Relative clauses",rule:"Use relative clauses to add precise information about a person, thing or idea.",zh:"关系从句可以补充关于人、事物或概念的精确信息。",example:"The device, which was tested twice, produced consistent results.",tags:["relative_clause","writing"]},
    {id:"grammar_007",level:"exam",topic:"Modal verbs",rule:"Use may, might, could and should to express possibility, uncertainty or recommendation.",zh:"may、might、could、should 可表达可能性、不确定性或建议。",example:"The change could improve the reliability of the system.",tags:["modals","evaluation"]}
  ],
  commandWords:[
    {word:"State",zh:"陈述/写出",action:"给出直接答案，不需要展开解释"},
    {word:"Identify",zh:"指出/识别",action:"明确指出所要求的对象"},
    {word:"Describe",zh:"描述",action:"说明是什么、有什么特征或发生了什么"},
    {word:"Explain",zh:"解释",action:"说明原因、过程或因果关系"},
    {word:"Compare",zh:"比较",action:"明确写出相同点和/或不同点"},
    {word:"Suggest",zh:"建议",action:"提出合理方案，并尽量结合题目情境"},
    {word:"Justify",zh:"论证理由",action:"给出选择/结论并提供理由或证据"},
    {word:"Evaluate",zh:"评价",action:"权衡优缺点并形成有依据的判断"}
  ]
};

(function(){
  var db=window.ENGLISH_MASTER_DB;
  var vocab=Array.isArray(window.SUBJECT_VOCAB)?window.SUBJECT_VOCAB:[];
  db.vocabulary=vocab.map(function(v,i){
    var source=v.subject==="english"?"igcse_esl":"igcse_subject";
    return Object.assign({id:"vocab_"+source+"_"+i,source:source,level:source==="igcse_esl"?"IGCSE":"Subject English",category:v.chapter||"General",tags:[v.subject,v.chapter||"General"]},v);
  });
  window.getEnglishMasterVocabulary=function(filter){
    filter=filter||{};
    return db.vocabulary.filter(function(v){
      return (!filter.source||v.source===filter.source)&&(!filter.subject||v.subject===filter.subject)&&(!filter.query||((v.en+" "+v.zh).toLowerCase().indexOf(String(filter.query).toLowerCase())>=0));
    });
  };
  window.getEnglishMasterData=function(){return db;};
  window.recordEnglishMasterEvent=function(type,key,correct,meta){
    try{
      var state=window.__IGCSE_USER_STATE__;
      if(!state) return;
      state.englishMaster=state.englishMaster||{vocab:{},grammar:{},sentences:{},commandWords:{}};
      var bucket=state.englishMaster[type]||(state.englishMaster[type]={});
      var x=bucket[key]||(bucket[key]={attempts:0,correct:0,wrong:0,mastery:0,lastStudied:null});
      x.attempts++; correct?x.correct++:x.wrong++; x.lastStudied=new Date().toISOString();
      x.mastery=Math.round((x.correct/Math.max(1,x.attempts))*100);
      if(meta) Object.assign(x,meta);
      if(window.saveUserState) window.saveUserState(state);
    }catch(e){}
  };
})();