// Read-only: for each flagged card, print the topic's notes sentences that mention the card's front.
const { execFileSync } = require('child_process');
const flagged = JSON.parse(require('fs').readFileSync('.freebuff-tmp/flashcards/flagged.json', 'utf8'));
const slugs = [...new Set(flagged.map(r => r.slug))];
const list = slugs.map(s => `'${s}'`).join(',');
const q = `select t.slug, regexp_replace(regexp_replace(sm.content,'<[^>]*>',' ','g'),'[[:space:]]+',' ','g') as txt from study_materials sm join topics t on t.id=sm.topic_id where t.slug in (${list}) and sm.material_type in ('notes','summary');`;
const rows = JSON.parse(execFileSync('node', ['.freebuff-tmp/fc-coverage.cjs', q], { encoding: 'utf8' }));
const notes = {};
for (const r of rows) notes[r.slug] = (notes[r.slug] || '') + ' ' + r.txt;
const out = [];
for (const f of flagged) {
  const key = (f.front.split(/\s+/).find(w => w.length > 3) || f.front).replace(/[^A-Za-z]/g, '');
  const txt = notes[f.slug] || '';
  const sents = txt.split(/(?<=[.!?])\s+/).filter(s => key && s.toLowerCase().includes(key.toLowerCase())).slice(0, 2).map(s => s.slice(0, 260));
  out.push(`## ${f.slug} #${f.sort_order} | ${f.front}\n  back: ${f.back}\n  notes: ${sents.join(' || ') || '(no match)'}`);
}
console.log(out.join('\n'));
