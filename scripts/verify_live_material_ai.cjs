/* Explicit live check: no key or file means no provider request; never log source or key. */
const fs=require('node:fs'),path=require('node:path');
const {analyse,catalog}=require('../server/material_ai.cjs');
(async()=>{
 if(!process.env.OPENAI_API_KEY){console.error('尚未配置服务端 OPENAI_API_KEY；没有发送文件或运行真实 AI 验证。');process.exitCode=2;return;}
 const args=process.argv.slice(2),value=flag=>args[args.indexOf(flag)+1];
 if(!args.includes('--file')||!args.includes('--subject')){console.error('请提供 --file 文件路径及 --subject 科目；选中的文件将发送至 OpenAI，可能产生 API 费用。');process.exitCode=2;return;}
 const file=path.resolve(value('--file')),subject=value('--subject'),topics=catalog().topicsFor(subject);if(!topics.length)throw new Error('科目不正确');const stat=fs.statSync(file);if(!stat.isFile()||stat.size>10*1024*1024)throw new Error('文件超过限制或不是普通文件');const bytes=fs.readFileSync(file),ext=path.extname(file).slice(1).toLowerCase(),pages=['txt','md'].includes(ext)?[{page:null,text:bytes.toString('utf8')}]:[];
 const result=await analyse({subject,filename:path.basename(file),ext,pages,fileData:'data:application/octet-stream;base64,'+bytes.toString('base64')},{key:process.env.OPENAI_API_KEY,model:process.env.IGCSE_AI_MODEL||'gpt-5-mini',topics});
 const report={live:true,testedAt:new Date().toISOString(),subject,ext,model:process.env.IGCSE_AI_MODEL||'gpt-5-mini',suggestedTopics:result.topics.length,matchedTextQuotes:result.topics.filter(t=>t.verified).length,manualReviewRequired:true};
 const out=path.resolve(__dirname,'../test-results');fs.mkdirSync(out,{recursive:true});fs.writeFileSync(path.join(out,'live-ai-verification.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report));
})().catch(()=>{console.error('真实 AI 验证未通过，请检查服务配置、文件格式或缩小资料范围。');process.exitCode=1;});
