// Near-duplicate scan: stems that differ only in numbers/trivial wording are the
// failure mode the exact-stem check misses. Jaccard on lowercased word tokens.
const fs = require('fs');
const dir = '.freebuff/drafts';
const files = fs.readdirSync(dir).filter(f => /^wma/.test(f) && f.endsWith('.json')).sort();
const byCode = {};
for (const f of files) {
  const d = JSON.parse(fs.readFileSync(`${dir}/${f}`, 'utf8'));
  const code = `${d.code} ${d.paper}`;
  for (const q of d.questions) {
    const toks = new Set(
      q.question_text.replace(/\\\(|\\\)|\$\$|\\[a-z]+/gi, ' ').toLowerCase().match(/[a-z0-9.^+\-]+/g) || []
    );
    (byCode[code] = byCode[code] || []).push({ f, id: q.q, stem: q.question_text, toks, key: q.correct_option, opts: q.options });
  }
}
const jac = (a, b) => {
  let inter = 0;
  for (const t of a) if (b.has(t)) inter++;
  return inter / (a.size + b.size - inter);
};
let hits = 0;
for (const code of Object.keys(byCode)) {
  const items = byCode[code];
  const pairs = [];
  for (let i = 0; i < items.length; i++)
    for (let j = i + 1; j < items.length; j++) {
      const s = jac(items[i].toks, items[j].toks);
      if (s >= 0.8) pairs.push({ s, a: items[i], b: items[j] });
    }
  pairs.sort((x, y) => y.s - x.s);
  console.log(`### ${code}: ${pairs.length} near-duplicate pair(s) at >=0.80 (of ${items.length} items)`);
  for (const p of pairs.slice(0, 25)) {
    const sameAns = JSON.stringify(p.a.opts) === JSON.stringify(p.b.opts);
    console.log(`  ${p.s.toFixed(2)} ${p.a.f}/${p.a.id} <-> ${p.b.f}/${p.b.id}${sameAns ? '  [IDENTICAL OPTIONS]' : ''}`);
    console.log(`        A: ${p.a.stem}`);
    console.log(`        B: ${p.b.stem}`);
  }
  hits += pairs.length;
}
console.log(`\nTOTAL near-duplicate pairs >=0.80: ${hits}`);
