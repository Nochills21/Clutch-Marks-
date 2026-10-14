// Classify same-statement pairs that share an identical option multiset:
// A = the same question (word multiset identical) and the same answer,
// B = same answer + same option set but different wording/parameters,
// C = same option set with a different answer (option-set reuse, acceptable).
const fs = require('fs');
const dir = '.freebuff/drafts';
const files = fs.readdirSync(dir).filter(f => /^wma/.test(f) && f.endsWith('.json')).sort();
const groups = {};
const norm = s => String(s).replace(/\s+/g, '').replace(/\\/g, '');
const words = s => {
  const t = (s.replace(/\\[a-z]+/gi, ' ').toLowerCase().match(/[a-z0-9.^+-]+/g) || []);
  return t.slice().sort().join(' ');
};
for (const f of files) {
  const d = JSON.parse(fs.readFileSync(`${dir}/${f}`, 'utf8'));
  const code = `${d.code} ${d.paper}`;
  for (const q of d.questions) {
    const k = `${code}|${q.statement_code || '?'}`;
    (groups[k] = groups[k] || []).push({ f, ...q });
  }
}
const A = [], B = [];
let C = 0;
for (const k of Object.keys(groups)) {
  const it = groups[k];
  for (let i = 0; i < it.length; i++)
    for (let j = i + 1; j < it.length; j++) {
      const a = it[i], b = it[j];
      if ([...a.options].map(norm).sort().join('|') !== [...b.options].map(norm).sort().join('|')) continue;
      const sameKey = norm(a.options[a.correct_option]) === norm(b.options[b.correct_option]);
      if (!sameKey) { C++; continue; }
      (words(a.question_text) === words(b.question_text) ? A : B).push([a, b]);
    }
}
const show = (label, arr) => {
  console.log(`### ${label}: ${arr.length}`);
  for (const [a, b] of arr) {
    console.log(`   ${a.f}/${a.q}  <->  ${b.f}/${b.q}   answer=${a.options[a.correct_option]}`);
    console.log(`      A: ${a.question_text}`);
    console.log(`      B: ${b.question_text}`);
  }
};
show('CLASS A - same question (word multiset identical), same answer', A);
show('CLASS B - same answer + same option set, different wording/parameters', B);
console.log(`### CLASS C - same option set, different answer (option-set reuse, acceptable): ${C}`);
