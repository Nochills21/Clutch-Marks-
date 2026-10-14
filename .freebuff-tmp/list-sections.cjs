const fs=require('fs'),path=require('path');const {parse}=require('./render-designed.cjs');
const D=path.join(__dirname,'..','.freebuff','drafts');
for (const f of process.argv.slice(2)) {
  const src=fs.readFileSync(path.join(D,f),'utf8'); const body=src.replace(/^<!--[\s\S]*?-->/,'');
  const p=parse(body); console.log(`## ${f} | ${p.title} | exam=${p.exam?'y':'n'}`);
  p.sections.forEach((s,i)=>{ const first=(s.blocks.find(b=>b.type==='p')||{}).html||''; console.log(`  ${i+1}. ${s.title} :: ${first.replace(/<[^>]+>/g,'').slice(0,110)}`); });
}
