const test=require('node:test'),assert=require('node:assert/strict');
const {selectRound}=require('../data/arcade_rounds.js');
const rows=Array.from({length:30},(_,i)=>({id:String(i),en:'word'+i,zh:'释义'+i}));
test('rounds rotate new words before repeats, honour limits and do not mutate input',()=>{
 const first=selectRound(rows,{size:10,random:()=>.5}),second=selectRound(rows,{size:10,seen:first.map(v=>v.id),random:()=>.5});
 assert.equal(second.length,10);assert.ok(second.every(v=>!first.includes(v)));assert.equal(selectRound(rows,{size:50}).length,30);assert.equal(rows[0].id,'0');
});
test('reinforcement is bounded to leave room for new words and matching meanings are unique',()=>{
 const selected=selectRound(rows,{size:10,isWeak:v=>Number(v.id)<20,random:()=>.5});assert.equal(selected.filter(v=>Number(v.id)<20).length,3);
 const duplicate=[rows[0],{id:'dup',en:'another',zh:rows[0].zh}];assert.equal(selectRound(duplicate,{size:10,matching:true}).length,1);
});
test('malformed sizes are bounded; caller filtered banks are never expanded',()=>{for(const size of [NaN,-5,Infinity,0])assert.equal(selectRound(rows,{size}).length,10);assert.equal(selectRound(rows.slice(0,3),{size:25}).length,3);});
