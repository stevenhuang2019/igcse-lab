const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const root=path.join(__dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
test('all inline application scripts compile',()=>{
 for(const m of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)) new vm.Script(m[1]);
});
test('syllabus coverage reflects learned topics and excludes unknown subjects',()=>{
 const window={IGCSE_CONTENT:[{subject:'math',chapter:'1',topicId:'a'},{subject:'math',chapter:'1',topicId:'b'}],__IGCSE_USER_STATE__:{learnedTopics:['a']}};
 vm.runInNewContext(fs.readFileSync(path.join(root,'data/syllabus_map.js'),'utf8'),{window});
 assert.equal(window.getIGCSESyllabusCoverage('math').coverage,50);
 assert.equal(window.getIGCSESyllabusCoverage('unknown').topics,0);
});
test('navigation validates destinations, updates accessibility and preserves history restoration',()=>{
 function element(id){const classes=new Set(['page']);return {id,dataset:{page:id},textContent:id,attributes:{},classList:{contains:x=>classes.has(x),add:x=>classes.add(x),remove:x=>classes.delete(x),toggle:(x,on)=>on?classes.add(x):classes.delete(x)},setAttribute(k,v){this.attributes[k]=v},removeAttribute(k){delete this.attributes[k]}};}
 const pages=['page-home','page-practice'].map(element),navBtns=pages.map(p=>element(p.id));
 const location={hash:''},entries=[];
 const document={title:'',getElementById:id=>pages.find(p=>p.id===id)||(id==='pageLocation'?{}:null)};
 const context=vm.createContext({pages,navBtns,document,location,history:{pushState:(_,__,hash)=>{entries.push(hash);location.hash=hash}}});
 const source=html.slice(html.indexOf('let restoringRoute = false;'),html.indexOf('navBtns.forEach(btn =>'));
 vm.runInContext(source,context);
 vm.runInContext("switchPage('page-practice')",context);
 assert.equal(navBtns[1].attributes['aria-current'],'page');
 assert.equal(pages[1].classList.contains('active'),true);
 assert.deepEqual(entries,['#page-practice']);
 vm.runInContext("switchPage('missing')",context);
 assert.equal(pages[1].classList.contains('active'),true);
 vm.runInContext("restoringRoute=true; switchPage('page-home')",context);
 assert.equal(entries.length,1);
 assert.equal(navBtns[1].attributes['aria-current'],undefined);
});
