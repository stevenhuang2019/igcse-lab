/* Content language is independent of interface language. No automatic AI translation. */
window.IGCSE_LANGUAGE_ENGINE={version:'2.0',modes:{bilingual:'中英对照',exam:'英文优先'}};
window.igcseLang=function(){try{return localStorage.getItem('igcseLangMode')==='exam'?'exam':'bilingual';}catch{return 'bilingual';}};
window.setIGCSEGlobalLang=function(mode){mode=mode==='exam'?'exam':'bilingual';try{localStorage.setItem('igcseLangMode',mode);}catch{}window.IGCSE_GLOBAL_LANG=mode;if(typeof langMode!=='undefined')langMode=mode;document.documentElement.dataset.contentLanguage=mode;window.dispatchEvent(new CustomEvent('igcse-language-change',{detail:{mode}}));};
window.speakIGCSE=function(text,rate){return window.IGCSE_SPEECH?.speak(text,rate)||Promise.resolve({ok:false,error:'unsupported'});};
window.subjectVocabModes={en2zh:'English → 中文释义',zh2en:'中文 → English 释义',listen2zh:'🔊 听音 → 选中文',listen2en:'🔊 听音 → 选英文'};
window.getTopicLanguage=function(topic){const en=topic&&(topic.knowledgeEn||topic.englishKnowledge||topic.enKnowledge),zh=topic?.knowledge||'';return {title:(topic?.titleEn||topic?.title||''),body:en?'<div class="lang-en" data-no-translate lang="en">'+en+'</div><details class="lang-zh"><summary>查看中文解释</summary><div data-no-translate lang="zh-CN">'+zh+'</div></details>':'<div data-no-translate lang="zh-CN">'+zh+'</div>',fallback:!en};};
window.IGCSE_GLOBAL_LANG=window.igcseLang();if(typeof langMode!=='undefined')langMode=window.IGCSE_GLOBAL_LANG;
