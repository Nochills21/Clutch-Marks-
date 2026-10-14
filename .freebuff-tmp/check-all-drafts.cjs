// Read-only structural check over every draft file.
const fs = require('fs');
const path = require('path');
// DRAFTS_DIR lets the self-test point it at a mutated copy.
const dir = process.env.DRAFTS_DIR || '.freebuff/drafts';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json')).sort();
const NOTE = /\b(wait,|wait —|Let's|recalculat|re-evaluat|hmm,|actually,)/i;
let total = 0, problems = 0;
for (const f of files) {
  let d;
  try { d = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')); }
  catch (e) { console.log(`!! ${f}: PARSE ERROR ${e.message}`); problems++; continue; }
  // Topic banks keep their questions in `accepted`; WMA batches use `questions`.
  const qs = d.accepted || d.questions || d.items || [];
  const keys = [0, 0, 0, 0];
  const bad = [];
  for (const q of qs) {
    const id = q.q || q.id || q.code || '?';
    const opts = q.options || [];
    const k = q.correct_option;
    if (typeof k !== 'number' || !Number.isInteger(k) || k < 0 || k >= opts.length)
      bad.push(`${id}: correct_option ${JSON.stringify(k)} out of range (n=${opts.length})`);
    else keys[k]++;
    const norm = opts.map(o => String(o).trim().toLowerCase());
    const dupes = norm.filter((o, i) => norm.indexOf(o) !== i);
    if (dupes.length) bad.push(`${id}: duplicate option(s) ${JSON.stringify([...new Set(dupes)])}`);
    if (opts.length && opts.length !== 4) bad.push(`${id}: ${opts.length} options`);
    const exp = String(q.explanation || '');
    const m = exp.match(NOTE);
    if (m) bad.push(`${id}: drafting note "${m[0]}"`);
    if (exp.includes('`')) bad.push(`${id}: backtick in explanation`);
    if (!exp.trim()) bad.push(`${id}: empty explanation`);
  }
  total += qs.length;
  const dist = `${keys[0]}/${keys[1]}/${keys[2]}/${keys[3]}`;
  console.log(`${f}  n=${qs.length}  keys=${dist}  ${bad.length ? 'ISSUES=' + bad.length : 'ok'}`);
  for (const b of bad) { console.log(`    - ${b}`); problems++; }
}
console.log(`\nTOTAL questions=${total}  PROBLEMS=${problems}`);
