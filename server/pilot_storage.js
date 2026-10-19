/* Scope browser records to the authenticated invitation, before the learning app starts. */
(function(){
 'use strict';
 const user=document.currentScript.dataset.user,prefix='igcse-pilot:'+user+':',native=window.localStorage;
 const keys=()=>Array.from({length:native.length},(_,i)=>native.key(i)).filter(k=>k?.startsWith(prefix));
 const scoped={getItem:k=>native.getItem(prefix+k),setItem:(k,v)=>native.setItem(prefix+k,v),removeItem:k=>native.removeItem(prefix+k),clear:()=>keys().forEach(k=>native.removeItem(k)),key:i=>keys()[i]?.slice(prefix.length)||null,get length(){return keys().length;}};
 Object.defineProperty(window,'localStorage',{value:scoped});
 const open=indexedDB.open.bind(indexedDB),remove=indexedDB.deleteDatabase.bind(indexedDB);
 indexedDB.open=(name,version)=>version===undefined?open(prefix+name):open(prefix+name,version);indexedDB.deleteDatabase=name=>remove(prefix+name);
 const originalFetch=window.fetch.bind(window);window.fetch=(input,options={})=>{
  const url=new URL(typeof input==='string'||input instanceof URL?input:input.url,location.href);
  if(url.origin===location.origin&&url.pathname.startsWith('/api/')){const headers=new Headers(input instanceof Request?input.headers:options.headers);new Headers(options.headers).forEach((v,k)=>headers.set(k,v));headers.set('X-IGCSE-User',user);options={...options,headers};}
  return originalFetch(input,options);
 };
 window.addEventListener('DOMContentLoaded',()=>{
  const check=async()=>{try{const r=await fetch('/api/pilot/status');if(r.status===401||r.status===403){location.replace('/login');return;}if(r.ok){const v=await r.json();document.getElementById('pilotQuota').textContent=v.aiEnabled?' · AI '+(v.quota.persistent?'今日可用 ':'本次运行可用 ')+Math.min(v.quota.userRemaining,v.quota.globalRemaining)+' 次'+(v.quota.persistent?'':'（重启会重置）'):' · AI 暂未启用';}}catch{}};check();setInterval(check,60000);
  document.getElementById('pilotLogout').onclick=async()=>{try{const r=await fetch('/auth/logout',{method:'POST'});if(r.ok)location.replace('/login');else alert('退出失败，请重试');}catch{alert('连接失败，请重试退出');}};});
})();
