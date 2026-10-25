const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
function load(){const window={};const ctx=vm.createContext({window});for(const f of ['vocab.js','igcse_quickref.js','learning_extensions_data.js'])vm.runInContext(fs.readFileSync('data/'+f,'utf8'),ctx);return window;}
test('expanded English vocabulary is unique, bilingual and linked to all 18 local skill topics',()=>{
 const w=load(),rows=w.SUBJECT_VOCAB.filter(v=>v.subject==='english');assert.equal(rows.length,319);assert.ok(rows.every(v=>v.topicIds?.length&&v.chapters?.includes(v.chapter)));assert.equal(new Set(rows.map(v=>v.en.toLowerCase())).size,rows.length);
 const authored=rows.filter(v=>v.source==='original-teaching-vocabulary');assert.equal(authored.length,300);assert.equal(new Set(authored.map(v=>v.chapter)).size,10);assert.equal(new Set(authored.flatMap(v=>v.topicIds)).size,18);
 for(const r of authored){assert.ok(r.en.trim()&&r.zh.trim());assert.ok(r.chapters.includes(r.chapter));assert.ok(r.topicIds.length>0);}
 assert.equal(w.IGCSE_ENGLISH_VOCAB_INFO.exhaustive,undefined);assert.match(w.IGCSE_ENGLISH_VOCAB_INFO.note,/未发布封闭/);
});
test('Business, Computer Science and English each gain 12 original explained quick reference concepts',()=>{
 const w=load();for(const subject of ['business','computer_science','english']){const section=w.IGCSE_QUICKREF.find(s=>s.subject===subject);assert.ok(section);const groups=section.groups.slice(-2);assert.equal(groups.flatMap(g=>g.items).length,12);assert.ok(groups.flatMap(g=>g.items).every(i=>i.formula&&i.note.length>15));}
});

test('backup preserves valid hint review state and rejects impossible assisted evidence',()=>{
 const w=load();w.userState={};w.IGCSE_CATALOG={question:id=>id==='q'?{subject:'math'}:null,subjects:['math']};
 vm.runInNewContext(fs.readFileSync('data/learning_backup.js','utf8'),{window:w,TextEncoder,document:{readyState:'loading',addEventListener(){}}});
 const state={learnedTopics:[],globalStats:{totalAnswered:1,totalCorrect:1},questionStats:{q:{answered:1,correct:1,assistedAnswered:1,assistedCorrect:1}},hintReviews:{q:{qid:'q',subject:'math',topicId:'t',level:1,lastHintAt:Date.now(),status:'pending'}}};
 assert.equal(w.IGCSE_BACKUP.parse(JSON.stringify(state)).state.hintReviews.q.status,'pending');
 state.questionStats.q.assistedAnswered=2;assert.throws(()=>w.IGCSE_BACKUP.parse(JSON.stringify(state)));state.questionStats.q.assistedAnswered=1;state.hintReviews.q.level=3;assert.throws(()=>w.IGCSE_BACKUP.parse(JSON.stringify(state)));
});
