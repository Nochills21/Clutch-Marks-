const fs = require('fs');
const p = '.freebuff/content-a2-math-stats.cjs';
let s = fs.readFileSync(p, 'utf8');
s = s.replace("np(1 − p) = 10 × 0.4 × 0.6 = 2.4. Wait — 2.4 is correct, not listed... the intended key is 2.4.", "np(1 − p) = 10 × 0.4 × 0.6 = 2.4.");
fs.writeFileSync(p, s);
const m = require('./content-a2-math-stats.cjs');
console.log('topics:', m.length, '| questions per topic:', m.map(t => t.questions.length).join(','));
const bad = m.flatMap(t => t.questions.filter(q => q.correct < 0 || q.correct > 3 || q.opts.length !== 4).map(q => t.name));
console.log('malformed:', bad.length ? bad : 'none');
