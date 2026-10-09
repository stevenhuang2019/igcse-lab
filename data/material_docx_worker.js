/* Raw text only. Never render document-provided HTML or load external relationships. */
importScripts('../vendor/mammoth.browser.min.js');
onmessage=async e=>{try{const r=await mammoth.extractRawText({arrayBuffer:e.data});if(r.value.length>120000)throw new Error('Word 文字太长，请按章节拆分');postMessage({text:r.value});}catch{postMessage({error:'Word 读取失败或内容太长，请检查文件或按章节拆分'});}};
