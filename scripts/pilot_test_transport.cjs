/* Test-only HTTPS proxy transport: preserve the production Host header over loopback. */
const http=require('node:http');
module.exports=function request(url,options={}){return new Promise((resolve,reject)=>{
 const body=options.body instanceof URLSearchParams?options.body.toString():options.body;
 const req=http.request(url,{method:options.method||'GET',headers:options.headers},res=>{const chunks=[];res.on('data',c=>chunks.push(c));res.on('end',()=>resolve(new Response(Buffer.concat(chunks),{status:res.statusCode,headers:res.headers})));res.on('error',reject);});
 req.on('error',reject);req.setTimeout(15000,()=>req.destroy(new Error('Test proxy timeout')));if(body)req.write(body);req.end();
});};
