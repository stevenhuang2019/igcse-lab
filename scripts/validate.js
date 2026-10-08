#!/usr/bin/env node
/* Backwards-compatible entry point for the current seven-subject validators. */
const {spawnSync}=require('node:child_process');
const fs=require('node:fs'),path=require('node:path');
const root=path.join(__dirname,'..');
const tests=fs.readdirSync(path.join(root,'tests')).filter(f=>f.endsWith('.test.js')).map(f=>path.join('tests',f));
for(const args of [['scripts/integration_smoke.js'],['--test',...tests]]){
 const result=spawnSync(process.execPath,args,{cwd:root,stdio:'inherit'});
 if(result.error)throw result.error;
 if(result.status!==0)process.exit(result.status||1);
}
