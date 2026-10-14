// Structural recheck over every accepted question in the topic drafts, so the
// repaired files are verified on the field they actually ship (`accepted`).
const fs = require('fs');
const files = fs.readdirSync('.freebuff/drafts').filter(f => f.endsWith('.json'));
const RESIDUE = /\b(I did it again|wait,|Let's|recalculat|re-evaluat|hmm,|actually,|others are incorrect calculations or applications)/i;
let n = 0, bad = [];
const touched = new Set(['coordinate-geometry', 'differentiation', 'integration', 'quadratics', 'sequences-and-series', 'trigonometry', 'algebra-graphs', 'algebra-sequences-and-functions', 'algebra-simplifying-and-expanding', 'geometry-angles-and-polygons', 'geometry-congruence-and-similarity', 'networking-communication', 'web-technologies', 'data-representation']);
for (const f of files) {
  const slug = f.replace(/\.json$/, '');
  const d = JSON.parse(fs.readFileSync(`.freebuff/drafts/${f}`, 'utf8'));
  for (const q of d.accepted || []) {
    n++;
    const where = `${slug}: ${q.question_text.slice(0, 50)}`;
    const text = [q.question_text, ...q.options, q.explanation].join(' ');
    if (!Array.isArray(q.options) || q.options.length !== 4) bad.push(`${where} — options ${q.options && q.options.length}`);
    if (!Number.isInteger(q.correct_option) || q.correct_option < 0 || q.correct_option > 3) bad.push(`${where} — key ${q.correct_option}`);
    if (new Set(q.options.map(o => o.trim().toLowerCase())).size !== 4) bad.push(`${where} — duplicate options`);
    if (!q.explanation || !q.explanation.trim()) bad.push(`${where} — empty explanation`);
    if (/\\u[0-9a-fA-F]{4}/.test(text)) bad.push(`${where} — literal \\u escape`);
    if (/!\s*$/.test(q.question_text)) bad.push(`${where} — stem ends with !`);
    const m = RESIDUE.exec(text);
    if (m) bad.push(`${where} — residue "${m[0]}"`);
    if (touched.has(slug) && q.key_review) {
      console.log(`repaired  ${slug} key ${q.key_review.previous_correct_option} -> ${q.correct_option}`);
    }
  }
}
console.log(`\naccepted questions checked=${n}  problems=${bad.length}`);
for (const b of bad) console.log('  - ' + b);
process.exit(bad.length ? 1 : 0);
