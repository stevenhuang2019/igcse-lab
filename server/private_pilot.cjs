'use strict';
const http=require('node:http'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {createServer,config}=require('./material_ai.cjs');
const root=path.resolve(__dirname,'..'),cookieName='__Host-igcsePilot';
const hashPassword=(password,salt)=>crypto.scryptSync(password,salt,64).toString('hex');
function loadUsers(file){
 if(fs.statSync(file).size>65536)throw new Error('Invalid invitation file');
 return validateUsers(JSON.parse(fs.readFileSync(file,'utf8')));
}
function validateUsers(users){
 if(!Array.isArray(users)||!users.length||users.length>20)throw new Error('Expected 1–20 invited users');
 const ids=new Set();for(const u of users){
  if(!u||!/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,39}$/.test(u.id)||ids.has(u.id)||! /^[a-f0-9]{32}$/.test(u.salt)||! /^[a-f0-9]{128}$/.test(u.hash)||typeof u.enabled!=='boolean')throw new Error('Invalid invitation record');ids.add(u.id);
 }return users;
}
function quotaStore(file,userLimit,globalLimit,now){
 let data={day:'',users:{},total:0};
 if(file&&fs.existsSync(file)){
  if(fs.statSync(file).size>65536)throw new Error('Invalid quota file');data=JSON.parse(fs.readFileSync(file,'utf8'));
  if(!/^\d{4}-\d{2}-\d{2}$/.test(data.day)||!Number.isInteger(data.total)||data.total<0||!data.users||typeof data.users!=='object'||Array.isArray(data.users)||Object.values(data.users).some(n=>!Number.isInteger(n)||n<0))throw new Error('Invalid quota file');
 }
 function refresh(){const day=new Date(now()).toISOString().slice(0,10);if(data.day!==day)data={day,users:{},total:0};}
 const count=id=>Object.hasOwn(data.users,id)?data.users[id]:0;
 function remaining(id){refresh();return {userRemaining:Math.max(0,userLimit-count(id)),globalRemaining:Math.max(0,globalLimit-data.total),resetTimezone:'UTC'};}
 function reserve(id){refresh();const r=remaining(id);if(!r.userRemaining||!r.globalRemaining)return false;
  const next={day:data.day,users:{...data.users,[id]:count(id)+1},total:data.total+1};
  if(file){fs.mkdirSync(path.dirname(file),{recursive:true,mode:0o700});const tmp=file+'.'+process.pid+'.tmp';
  fs.writeFileSync(tmp,JSON.stringify(next),{mode:0o600});fs.renameSync(tmp,file);}data=next;return true;
 }return {remaining,reserve};
}
function boundedInt(value,fallback,max){const n=value===undefined?fallback:Number(value);if(!Number.isInteger(n)||n<1||n>max)throw new Error('Invalid pilot limit');return n;}
function createPilot({origin,userFile,usageFile,provider='deepseek',key,model,fetcher=fetch,topicsFor,now=Date.now,userLimit=20,globalLimit=100,aiEnabled=true,freeMode=false,usersJSON}={}){
 const publicURL=new URL(origin);if(publicURL.protocol!=='https:'||publicURL.origin!==origin||publicURL.username||publicURL.password)throw new Error('Pilot requires an exact HTTPS origin');
 let readUsers;
 if(freeMode){
  const users=validateUsers(JSON.parse(usersJSON));readUsers=()=>users;
 }else{
  if(!path.isAbsolute(userFile)||!path.isAbsolute(usageFile)||userFile===usageFile)throw new Error('Use separate absolute private file paths');
  if(!fs.existsSync(usageFile))throw new Error('Initialise persistent quota file before starting');
  for(const file of [userFile,usageFile]){const real=fs.realpathSync(file);if(real===root||real.startsWith(root+path.sep))throw new Error('Private files must be outside the application directory');}
  loadUsers(userFile);readUsers=()=>loadUsers(userFile);
 }
 userLimit=boundedInt(userLimit,20,100);globalLimit=boundedInt(globalLimit,100,1000);
 const quota=quotaStore(freeMode?null:usageFile,userLimit,globalLimit,now),sessions=new Map(),attempts=new Map();
 const app=createServer({provider,key:aiEnabled?key:undefined,model,fetcher,topicsFor,publicOrigin:origin});
 function headers(res){res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','no-referrer');res.setHeader('Content-Security-Policy',"frame-ancestors 'none'; base-uri 'self'; object-src 'none'");res.setHeader('Strict-Transport-Security','max-age=31536000');}
 const json=(res,status,value)=>{res.writeHead(status,{'Content-Type':'application/json'});res.end(JSON.stringify(value));};
 const redirect=(res,to)=>{res.writeHead(303,{Location:to});res.end();};
 function token(req){return req.headers.cookie?.split(';').map(x=>x.trim()).find(x=>x.startsWith(cookieName+'='))?.slice(cookieName.length+1);}
 function identity(req){const s=sessions.get(token(req));if(!s||s.expiry<=now())return null;return readUsers().find(u=>u.id===s.id&&u.enabled)?s.id:null;}
 function cleanup(){for(const [k,s] of sessions)if(s.expiry<=now())sessions.delete(k);for(const [k,a] of attempts)if(a.until<=now())attempts.delete(k);}
 async function readBody(req){let size=0,chunks=[];for await(const chunk of req){size+=chunk.length;if(size>8192)throw new Error('body too large');chunks.push(chunk);}return Buffer.concat(chunks).toString();}
 const server=http.createServer(async(req,res)=>{
  headers(res);try{
   if(req.headers.host!==publicURL.host)return json(res,403,{error:'访问地址不匹配'});
   const url=new URL(req.url,origin),sameOrigin=()=>req.headers.origin===origin&&req.headers['sec-fetch-site']!=='cross-site';
   if(url.pathname==='/healthz'&&req.method==='GET')return json(res,200,{ok:true});
   if(url.pathname==='/login'&&req.method==='GET'){
    res.setHeader('Content-Type','text/html; charset=utf-8');return res.end(fs.readFileSync(path.join(__dirname,'pilot_login.html')));
   }
   if(url.pathname==='/auth/login'){
    if(req.method!=='POST')return json(res,405,{error:'请使用 POST'});if(!sameOrigin())return json(res,403,{error:'只允许本站登录'});
    if(!req.headers['content-type']?.startsWith('application/x-www-form-urlencoded'))return json(res,415,{error:'登录格式不正确'});
    cleanup();const ip=req.socket.remoteAddress||'unknown';let a=attempts.get(ip);if(!a){if(attempts.size>=1000)return json(res,429,{error:'登录繁忙，请稍后重试'});a={count:0,until:now()+60000};attempts.set(ip,a);}if(++a.count>6)return json(res,429,{error:'尝试过多，请一分钟后再试'});
    const fields=new URLSearchParams(await readBody(req)),id=fields.get('username')||'',password=fields.get('password')||'';
    if(password.length>256||password.length<12||! /^[a-zA-Z0-9][a-zA-Z0-9_-]{0,39}$/.test(id))return json(res,401,{error:'账号或密码不正确，或授权已撤销'});
    const u=readUsers().find(u=>u.id===id&&u.enabled),salt=u?.salt||'00'.repeat(16),hash=hashPassword(password,salt);
    if(!u||!crypto.timingSafeEqual(Buffer.from(hash,'hex'),Buffer.from(u.hash,'hex')))return json(res,401,{error:'账号或密码不正确，或授权已撤销'});
    if(sessions.size>=100)return json(res,429,{error:'登录人数已达上限，请稍后重试'});
    sessions.delete(token(req));const t=crypto.randomBytes(32).toString('hex');sessions.set(t,{id,expiry:now()+8*3600000});
    res.setHeader('Set-Cookie',cookieName+'='+t+'; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=28800');return redirect(res,'/');
   }
   const id=identity(req);
   if(url.pathname==='/auth/logout'){
    if(req.method!=='POST')return json(res,405,{error:'请使用 POST'});if(!sameOrigin())return json(res,403,{error:'只允许本站退出'});
    sessions.delete(token(req));res.setHeader('Set-Cookie',cookieName+'=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0');return json(res,200,{ok:true});
   }
   if(!id)return url.pathname.startsWith('/api/')?json(res,401,{error:'请先使用受邀账号登录'}):redirect(res,'/login');
   if(url.pathname.startsWith('/api/')){
    if(req.headers['x-igcse-user']!==id)return json(res,403,{error:'账号已切换，请刷新页面'});
    if(url.pathname==='/api/ai/status'&&req.method==='GET')return json(res,200,{configured:aiEnabled&&Boolean(key),provider,model,liveValidated:false});
    if(url.pathname==='/api/pilot/status'&&req.method==='GET')return json(res,200,{user:id,aiEnabled:aiEnabled&&Boolean(key),quota:{...quota.remaining(id),persistent:!freeMode}});
    if(['/api/materials/analyse','/api/writing/coach'].includes(url.pathname)&&req.method==='POST'){
     if(!sameOrigin())return json(res,403,{error:'只允许本站请求'});if(!aiEnabled||!key)return json(res,503,{error:'管理员暂未启用 AI；本地学习仍可使用'});
     if(!quota.reserve(id))return json(res,429,{error:freeMode?'本次服务运行的 AI 额度已用完；请联系管理员':'今日 AI 请求额度已用完，请在次日 UTC 重置后再试'});
    }else if(url.pathname!=='/api/ai/status')return json(res,404,{error:'接口不存在'});
   }
   if(url.pathname==='/'||url.pathname==='/index.html'){
    if(!['GET','HEAD'].includes(req.method))return json(res,405,{error:'请使用 GET'});
    const markup=fs.readFileSync(path.join(root,'index.html'),'utf8').replace('<head>','<head><script src="/pilot/storage.js" data-user="'+id+'"></script>').replace(/<body([^>]*)>/,'<body$1><aside style="background:#eef2ff;color:#312e81;padding:8px;font-size:14px">私人测试版 · '+id+' · 资料仍保存在本机浏览器 <span id="pilotQuota"></span> <button id="pilotLogout" style="margin-left:8px">退出登录</button></aside>');
    res.setHeader('Content-Type','text/html; charset=utf-8');return res.end(req.method==='HEAD'?'':markup);
   }
   if(url.pathname==='/pilot/storage.js'&&req.method==='GET'){res.setHeader('Content-Type','text/javascript');return res.end(fs.readFileSync(path.join(__dirname,'pilot_storage.js')));}
   app.emit('request',req,res);
  }catch{if(!res.headersSent)json(res,503,{error:'私人测试服务暂时不可用，请联系管理员'});else res.end();}
 });server.requestTimeout=30000;server.headersTimeout=15000;server.keepAliveTimeout=5000;return server;
}
function deploymentOrigin(env){return env.IGCSE_PUBLIC_ORIGIN||(env.RENDER==='true'?env.RENDER_EXTERNAL_URL:undefined);}
if(require.main===module){try{
 const c=config(),server=createPilot({origin:deploymentOrigin(process.env),freeMode:process.env.IGCSE_PILOT_STORAGE==='environment',usersJSON:process.env.IGCSE_PILOT_USERS_JSON,userFile:process.env.IGCSE_PILOT_USERS_FILE,usageFile:process.env.IGCSE_PILOT_USAGE_FILE,...c,userLimit:process.env.IGCSE_PILOT_USER_DAILY_LIMIT,globalLimit:process.env.IGCSE_PILOT_GLOBAL_DAILY_LIMIT,aiEnabled:process.env.IGCSE_PILOT_AI_ENABLED==='true'});
 const port=boundedInt(process.env.PORT,4174,65535);server.listen(port,'0.0.0.0',()=>console.log('IGCSE 私人测试服务已启动；需 HTTPS 网关与受邀账号'));server.on('error',()=>{console.error('私人测试服务启动失败');process.exitCode=1;});
}catch{console.error('私人测试配置无效，请核对 HTTPS 地址、授权名单和配额文件；未开放服务');process.exitCode=1;}}
module.exports={createPilot,hashPassword,loadUsers,quotaStore,deploymentOrigin};
