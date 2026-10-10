const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
test('listening source excludes the question and lesson English notes supplement existing content without replacing it',()=>{
 const topics=[{topicId:'eng_esl_listening',knowledge:'original Chinese'},{topicId:'eng_read_gist',knowledgeEn:'Existing authored notes'}],window={openEnglishTopic(){},addEventListener(){}};
 vm.runInNewContext(fs.readFileSync('data/english_media.js','utf8'),{window,document:{addEventListener(){}},IGCSE_CATALOG:{topicsFor:()=>topics}});
 assert.match(topics[0].knowledgeEn,/Read the questions/);assert.equal(topics[0].knowledge,'original Chinese');assert.equal(topics[1].knowledgeEn,'Existing authored notes');
 assert.equal(window.IGCSE_ENGLISH_MEDIA.source({question:'A speaker says, “I took a train.” Which transport?'}),'I took a train.');assert.equal(window.IGCSE_ENGLISH_MEDIA.source({audioTranscript:'Explicit full recording script',question:'“Short quote”'}),'Explicit full recording script');assert.equal(window.IGCSE_ENGLISH_MEDIA.source({question:'A strategy question'}),'');
});
