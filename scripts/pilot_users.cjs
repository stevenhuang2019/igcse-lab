/* Run locally by the administrator. Never accepts or prints passwords. */
'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {hashPassword,loadUsers}=require('../server/private_pilot.cjs');
function manage(action,id,file){
 if(!path.isAbsolute(file)||! /^[a-zA-Z0-9][a-zA-Z0-9_-]{0,39}$/.test(id))throw new Error('Provide an account ID and absolute private file path');
 let users=fs.existsSync(file)?loadUsers(file):[];
 if(action==='add'){
  if(users.some(u=>u.id===id)||users.length>=20)throw new Error('Account already exists or 20-account limit reached');
  const password=crypto.randomBytes(24).toString('base64url'),salt=crypto.randomBytes(16).toString('hex');
  fs.mkdirSync(path.dirname(file),{recursive:true,mode:0o700});
  const invitation=path.join(path.dirname(file),id+'.invite');fs.writeFileSync(invitation,'账号：'+id+'\n临时邀请密码：'+password+'\n请通过你认可的私密渠道交给受邀用户。\n',{mode:0o600,flag:'wx'});
  users.push({id,salt,hash:hashPassword(password,salt),enabled:true});
 }else if(action==='disable'){
  const user=users.find(u=>u.id===id);if(!user)throw new Error('Account does not exist');user.enabled=false;
 }else throw new Error('Use add or disable');
 const temp=file+'.'+process.pid+'.tmp';fs.writeFileSync(temp,JSON.stringify(users,null,2)+'\n',{mode:0o600});fs.renameSync(temp,file);
 return action==='add'?path.join(path.dirname(file),id+'.invite'):null;
}
function initialiseQuota(file){if(!path.isAbsolute(file))throw new Error('Use an absolute path');fs.mkdirSync(path.dirname(file),{recursive:true,mode:0o700});fs.writeFileSync(file,JSON.stringify({day:new Date().toISOString().slice(0,10),users:{},total:0}),{mode:0o600,flag:'wx'});}
if(require.main===module){try{const [action,id,file]=process.argv.slice(2);if(action==='init-quota'){initialiseQuota(id);console.log('持久配额文件已创建');}else{const invitation=manage(action,id,file);console.log(invitation?'账号已加入授权名单；请在本机查看邀请文件：'+invitation:'授权已撤销；活跃会话将失效');}}catch(e){console.error(e.message);process.exitCode=1;}}
module.exports={manage,initialiseQuota};
