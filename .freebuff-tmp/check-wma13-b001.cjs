const fs = require('fs');
const p = '.freebuff/drafts/wma13-p3-b001.json';
const d = JSON.parse(fs.readFileSync(p, 'utf8'));
const qs = d.questions;
let fails = [];
console.log('count=' + qs.length);
console.log('ids=' + qs.map(q => q.q).join(','));
for (const q of qs) {
  if (q.options.length !== 4) fails.push(q.q + ': options != 4');
  if (!(q.correct_option >= 0 && q.correct_option <= 3)) fails.push(q.q + ': key out of range');
  const t = q.question_text + ' ' + q.options.join(' ') + ' ' + q.explanation;
  if (t.includes('`')) fails.push(q.q + ': backtick');
  if (t.includes('\uFFFD')) fails.push(q.q + ': U+FFFD');
  if (!(/\[1\]/.test(q.explanation))) fails.push(q.q + ': no [1] marks');
  if (!(/marks\]/.test(q.question_text))) fails.push(q.q + ': no marks tag');
  if (q.explanation.length < 50) fails.push(q.q + ': explanation short');
  const norm = q.options.map(o => o.trim());
  if (new Set(norm).size !== 4) fails.push(q.q + ': duplicate options');
}
const dist = [0,0,0,0];
for (const q of qs) dist[q.correct_option]++;
console.log('positions 0/1/2/3 = ' + dist.join('/'));
console.log('technique_note=' + (d.technique_note ? d.technique_note.title : null));
if (fails.length) { console.log('FAILS:\n' + fails.join('\n')); process.exit(1); }
else console.log('FORMAT CHECKS PASS');
