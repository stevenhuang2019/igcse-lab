const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),out=path.join(root,'vendor');fs.mkdirSync(out,{recursive:true});
const sources=[['pdfjs-dist/build/pdf.min.mjs','pdf.mjs'],['pdfjs-dist/build/pdf.worker.min.mjs','pdf.worker.mjs'],['pdfjs-dist/LICENSE','PDFJS-LICENSE'],['mammoth/mammoth.browser.min.js','mammoth.browser.min.js'],['mammoth/LICENSE','MAMMOTH-LICENSE']];
const expected=JSON.parse(fs.readFileSync(path.join(out,'manifest.json'),'utf8'));
for(const [source,target] of sources){const bytes=fs.readFileSync(path.join(root,'node_modules',source)),hash=crypto.createHash('sha256').update(bytes).digest('hex');if(hash!==expected[target])throw new Error('Material reader checksum changed: '+target);fs.writeFileSync(path.join(out,target),bytes);}
console.log('Local document readers built and checksums verified.');
