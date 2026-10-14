// Precise duplicate detector: questions in the same statement_code whose option
// multiset is identical (the same four values in some order), or whose correct
// value is identical while the stems share the same numbers.
const fs = require('fs');
const dir = '.freebuff/drafts';
const files = fs.readdirSync(dir).filter(f => /^wma/.test(f) && f.endsWith('.json')).sort();
const groups = {};
const nums = s => (s.replace(/\\[a-z]+/gi, ' ').match(/\d+(?:\.\d+)?/g) || []).sort().join(',');
for (const f of files) {
  const d = JSON.parse(fs.readFileSync(`${dir}/${f}`, 'utf8'));
  const code = `${d.code} ${d.paper}`;
  for (const q of d.questions) {
    const k = `${code}|${q.statement_code || '?'}`;
    (groups[k] = groups[k] || []).push({ f, ...q });
  }
}
const norm = s => String(s).replace(/\s+/g, '').replace(/\\/g, '');
let optDup = 0, ansDup = 0;
for (const k of Object.keys(groups).sort()) {
  const items = groups[k];
  const optPairs = [], ansPairs = [];
  for (let i = 0; i < items.length; i++)
    for (let j = i + 1; j < items.length; j++) {
      const a = items[i], b = items[j];
      const sm = [...a.options].map(norm).sort().join('|');
      const tn = [...b.options].map(norm).sort().join('|');
      if (sm === tn) optPairs.push([a, b]);
      else if (norm(a.options[a.correct_option]) === norm(b.options[b.correct_option]) && nums(a.question_text) === nums(b.question_text) && nums(a.question_text))
        ansPairs.push([a, b]);
    }
  if (!optPairs.length && !ansPairs.length) continue;
  console.log(`### ${k}  (${items.length} questions)`);
  for (const [a, b] of optPairs) {
    optDup++;
    const sameKey = norm(a.options[a.correct_option]) === norm(b.options[b.correct_option]);
    console.log(`  [SAME OPTION SET${sameKey ? ', same answer' : ''}] ${a.f}/${a.q} <-> ${b.f}/${b.q}`);
    console.log(`     A: ${a.question_text}`);
    console.log(`     B: ${b.question_text}`);
  }
  for (const [a, b] of ansPairs) {
    ansDup++;
    console.log(`  [SAME ANSWER+numbers] ${a.f}/${a.q} <-> ${b.f}/${b.q}: ${a.options[a.correct_option]}`);
    console.log(`     A: ${a.question_text}`);
    console.log(`     B: ${b.question_text}`);
  }
}
console.log(`\nidentical-option-set pairs: ${optDup}   same-answer-and-numbers pairs: ${ansDup}`);
