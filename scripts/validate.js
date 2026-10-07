#!/usr/bin/env node
/* IGCSE 自习实验室 数据/语法 全站校验脚本
 * 用法: node scripts/validate.js   (在项目根运行)
 * 检查项:
 *  1. data/*.js 与 index.html 内联 <script> 全部通过 vm.Script 语法编译
 *  2. IGCSE_CONTENT: 主题数量、字段完整、formulas LaTeX 无未配对 $、topicId 唯一
 *  3. IGCSE_QUESTIONS: 总数>=500、每科>=100、现有主题约40题、新主题约10题、
 *     choice options>=2 且 answer 逐字 ∈ options、essay answer+explain 非空、
 *     id 无重复、topicId 均存在于 content、question/explain/options/answer LaTeX $ 配对
 *  4. IGCSE_ASSESSMENT (若存在): 5 科 × 12 题、qid 均存在于题库、levels 10 条、paths 10 条
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = __dirname + '/..';
const DATA_DIR = path.join(ROOT, 'data');
let failures = 0;
let warns = 0;

function fail(msg){ failures++; console.log('  [FAIL] ' + msg); }
function warn(msg){ warns++; console.log('  [WARN] ' + msg); }
function ok(msg){ console.log('  [ok]   ' + msg); }

/* ---------- 1. 语法检查 ---------- */
console.log('== 1. 语法检查 ==');
const dataFiles = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.js')).sort();
for (const f of dataFiles){
  const src = fs.readFileSync(path.join(DATA_DIR, f), 'utf8');
  try { new vm.Script(src, { filename: f }); ok('data/' + f); }
  catch(e){ fail('data/' + f + ' 语法错误: ' + e.message); }
}
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const inlineScripts = [...html.matchAll(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/g)];
if(!inlineScripts.length) fail('index.html 未找到内联 <script>');
inlineScripts.forEach((m, i) => {
  try { new vm.Script(m[1], { filename: 'index.html#inline' + (i+1) }); ok('index.html 内联脚本 #' + (i+1) + ' (' + m[1].split('\n').length + ' 行)'); }
  catch(e){ fail('index.html 内联脚本 #' + (i+1) + ' 语法错误: ' + e.message); }
});

/* ---------- 2/3/4. 数据加载与断言 ---------- */
console.log('== 2/3/4. 数据断言 ==');
const ctx = { window: {}, console };
vm.createContext(ctx);
for (const f of dataFiles){
  try { vm.runInContext(fs.readFileSync(path.join(DATA_DIR, f), 'utf8'), ctx, { filename: f }); }
  catch(e){ fail('data/' + f + ' 执行失败: ' + e.message); }
}
const CONTENT = ctx.window.IGCSE_CONTENT || [];
const QS = ctx.window.IGCSE_QUESTIONS || [];
const ASSESS = ctx.window.IGCSE_ASSESSMENT || null;

/* ---- content ---- */
console.log('-- IGCSE_CONTENT --');
const EXISTING_TOPICS = ['math_algebra_01','math_algebra_02','math_graphs_01','phy_mechanics_01','phy_mechanics_02','phy_electricity_01','chem_bonding_01','chem_moles_01','chem_acids_01','dt_process_01','dt_materials_01','bus_market_01','bus_finance_01'];
const NEW_TOPICS = ['math_geometry_01','math_trig_01','math_stats_01','phy_energy_01','phy_waves_01','phy_electromag_01','chem_redox_01','chem_periodic_01','chem_organic_01','dt_manufacture_01','dt_structures_01','bus_operations_01','bus_hr_01','bus_growth_01'];
const contentIds = CONTENT.map(t => t.topicId);
const dupContent = contentIds.filter((id, i) => contentIds.indexOf(id) !== i);
if(dupContent.length) fail('content topicId 重复: ' + [...new Set(dupContent)].join(','));
for(const t of CONTENT){
  if(!t.knowledge || !t.knowledge.trim()) fail('主题 ' + t.topicId + ' knowledge 为空');
  if(!Array.isArray(t.formulas)) fail('主题 ' + t.topicId + ' formulas 不是数组');
  (t.formulas||[]).forEach((f, i) => { if(!latexOk(f)) fail('主题 ' + t.topicId + ' 公式#' + i + ' $ 未配对: ' + f); });
}
if(CONTENT.length !== 27){ fail('IGCSE_CONTENT 应有 27 个主题，实际 ' + CONTENT.length); }
else ok('主题总数 27');
for(const id of [...EXISTING_TOPICS, ...NEW_TOPICS]){
  if(!contentIds.includes(id)) fail('缺少主题 ' + id);
}

/* ---- questions ---- */
console.log('-- IGCSE_QUESTIONS --');
const ids = new Set(); let dupIds = [];
for(const q of QS){
  if(ids.has(q.id)) dupIds.push(q.id);
  ids.add(q.id);
}
if(dupIds.length) fail('题目 id 重复: ' + [...new Set(dupIds)].join(','));
else ok('无重复 id（共 ' + QS.length + ' 题）');

if(QS.length < 500) fail('总题数 ' + QS.length + ' < 500');
else ok('总题数 ' + QS.length + ' ≥ 500');

const subjCount = {};
for(const q of QS){ subjCount[q.subject] = (subjCount[q.subject]||0) + 1; }
for(const s of ['math','physics','chemistry','dt','business']){
  const n = subjCount[s]||0;
  if(n < 100) fail('科目 ' + s + ' 题数 ' + n + ' < 100');
  else ok('科目 ' + s + ' 题数 ' + n);
}

const topicCount = {};
for(const q of QS){ topicCount[q.topicId] = (topicCount[q.topicId]||0) + 1; }
for(const id of EXISTING_TOPICS){
  const n = topicCount[id]||0;
  if(n < 38 || n > 42) fail('现有主题 ' + id + ' 题数 ' + n + '（期望约 40）');
  else ok('现有主题 ' + id + ' 题数 ' + n);
}
for(const id of NEW_TOPICS){
  const n = topicCount[id]||0;
  if(n < 8 || n > 12) fail('新主题 ' + id + ' 题数 ' + n + '（期望约 10）');
  else ok('新主题 ' + id + ' 题数 ' + n);
}
const orphan = QS.filter(q => !contentIds.includes(q.topicId));
if(orphan.length) fail('题目引用不存在的 topicId: ' + [...new Set(orphan.map(q=>q.topicId))].join(','));
const emptyTopics = contentIds.filter(id => !topicCount[id]);
if(emptyTopics.length) fail('无题目的主题: ' + emptyTopics.join(','));

let choiceBad = 0, essayBad = 0, latexBad = 0;
for(const q of QS){
  if(q.type === 'choice'){
    if(!Array.isArray(q.options) || q.options.length < 2) { choiceBad++; fail('choice ' + q.id + ' options < 2'); }
    else if(q.options.indexOf(q.answer) === -1){ choiceBad++; fail('choice ' + q.id + ' answer 不在 options 中: answer=' + q.answer); }
  } else if(q.type === 'essay'){
    if(!q.answer || !String(q.answer).trim() || !q.explain || !String(q.explain).trim()){ essayBad++; fail('essay ' + q.id + ' answer/explain 缺失'); }
  } else {
    fail('未知 type: ' + q.id + ' (' + q.type + ')');
  }
  if(q.xpReward !== (q.type === 'essay' ? 5 : 10)) fail('xpReward 异常: ' + q.id + ' = ' + q.xpReward);
  if(!latexOk(q.question)){ latexBad++; fail('question $ 未配对: ' + q.id); }
  if(!latexOk(q.explain)){ latexBad++; fail('explain $ 未配对: ' + q.id); }
  if(q.type === 'choice') (q.options||[]).forEach(o => { if(!latexOk(o)){ latexBad++; fail('options $ 未配对: ' + q.id); } });
}
if(!choiceBad) ok('全部 choice 题 answer ∈ options 且 options ≥ 2');
if(!essayBad) ok('全部 essay 题 answer/explain 完整');
if(!latexBad) ok('题干/解析/选项 LaTeX $ 全部配对');

/* ---- assessment ---- */
console.log('-- IGCSE_ASSESSMENT --');
if(ASSESS){
  const qids = new Set(QS.map(q => q.id));
  let paperBad = 0;
  for(const sub of ['math','physics','chemistry','dt','business']){
    const paper = (ASSESS.papers||{})[sub];
    if(!Array.isArray(paper) || paper.length !== 12){ paperBad++; fail('测评卷 ' + sub + ' 不是 12 题（实际 ' + (paper?paper.length:0) + '）'); continue; }
    const missing = paper.filter(id => !qids.has(id));
    if(missing.length){ paperBad++; fail('测评卷 ' + sub + ' 引用不存在的题: ' + missing.join(',')); }
    else ok('测评卷 ' + sub + ' 12 题均有效');
  }
  if(!paperBad) ok('5 科测评卷各 12 题全部有效');
  const lv = ASSESS.levels || [];
  if(lv.length !== 10) fail('levels 应有 10 条，实际 ' + lv.length);
  else {
    let lvBad = 0;
    for(const l of lv){ if(!l.level || !l.title || !l.comment || !l.advice) lvBad++; }
    if(lvBad) fail('levels 有 ' + lvBad + ' 条缺字段');
    else ok('levels L1-L10 完整');
  }
  const paths = ASSESS.paths || [];
  if(paths.length !== 10) fail('paths 应有 10 条，实际 ' + paths.length);
  else {
    let pathBad = 0;
    for(const p of paths){
      if(!p.level || !p.goal || !Array.isArray(p.topics) || !p.topics.length) pathBad++;
      for(const t of (p.topics||[])){
        if(!contentIds.includes(t.topicId)) { pathBad++; fail('路径 L' + p.level + ' 引用不存在主题 ' + t.topicId); }
        if(!['math','physics','chemistry','dt','business'].includes(t.subject)) { pathBad++; fail('路径 L' + p.level + ' subject 非法: ' + t.subject); }
      }
    }
    if(!pathBad) ok('paths 10 条路径 topicId 全部有效');
  }
} else {
  warn('IGCSE_ASSESSMENT 尚未生成（阶段二）');
}

/* ---------- 汇总 ---------- */
console.log('');
console.log(failures ? ('校验失败：' + failures + ' 个 FAIL，' + warns + ' 个 WARN') : ('校验通过！' + warns + ' 个 WARN'));
process.exit(failures ? 1 : 0);

function latexOk(s){
  if(s == null) return true;
  s = String(s).replace(/\$\$[\s\S]*?\$\$/g, '');
  return ((s.match(/\$/g) || []).length % 2) === 0;
}
