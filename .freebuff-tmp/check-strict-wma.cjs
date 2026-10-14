// Strict validation over every WMA bank draft: marks tags, [1] tags, encoding,
// drafting residue, duplicate ids and duplicate stems (within and across files).
const fs = require('fs');
const path = require('path');
// Defaults to the real drafts; DRAFTS_DIR lets the self-test point it at a
// mutated copy so every rule below is proven to still reject bad content.
const dir = process.env.DRAFTS_DIR || '.freebuff/drafts';
const files = fs.readdirSync(dir).filter(f => /^wma\d/.test(f)).sort();
const MARK = /\[1\]/;
const STEM_MARK = /\[WMA\d+ P\d+, \d+ marks?\]/;
const RESIDUE = /\b(wait,|wait —|wait!|Let's|lets |recalculat|re-evaluat|hmm,|actually,|I need to|the answer is)/i;
const seen = new Map(); // normalised stem -> file/q
let fails = [], n = 0, rawN = 0;
const rawFiles = [];
const badChar = /\uFFFD/;

for (const f of files) {
  // Byte level first: a cp1252 punctuation byte decodes to U+FFFD and would be
  // refused by the study_materials CHECK on import, so catch the raw bytes too.
  // Round-trip is the exact test: invalid bytes decode to U+FFFD and cannot
  // re-encode to the original. (A byte-range scan would falsely flag the 0x80 0x94
  // continuation bytes of a perfectly valid UTF-8 em dash.)
  const buf = fs.readFileSync(path.join(dir, f));
  const text = buf.toString('utf8');
  if (!Buffer.from(text, 'utf8').equals(buf))
    fails.push(`${f}: file is not valid UTF-8 (${buf.length} bytes do not round-trip)`);
  if (text.includes('\uFFFD')) fails.push(`${f}: decodes with U+FFFD`);
  // A file saved mid-edit (or a truncated write) is not JSON at all: name it
  // and move on instead of aborting the whole run with a stack trace.
  let d;
  try { d = JSON.parse(text); }
  catch (e) { fails.push(`${f}: invalid JSON (${e.message})`); continue; }
  const qs = (d && d.questions) || [];
  rawFiles.push(f);
  // technique_note is student-visible too: scan it for the same defects.
  const tn = d.technique_note;
  if (tn) {
    const t = `${tn.title || ''} ${tn.content || ''}`;
    if (badChar.test(t)) fails.push(`${f}: technique_note U+FFFD`);
    if (!tn.title) fails.push(`${f}: technique_note missing title`);
    if (!tn.material_type) fails.push(`${f}: technique_note missing material_type`);
    if ((tn.content || '').length < 300) fails.push(`${f}: technique_note content too short (${(tn.content || '').length})`);
    if (t.includes('`')) fails.push(`${f}: backtick in technique_note`);
    const tnm = RESIDUE.exec(t);
    if (tnm) fails.push(`${f}: technique_note residue "${tnm[0]}"`);
    for (const bad of ['\u2018', '\u2019', '\u201c'])
      if (t.includes(bad)) fails.push(`${f}: curly quote ${JSON.stringify(bad)} in technique_note`);
  }
  const ids = new Set();
  for (const q of qs) {
    n++; rawN++;
    const t = `${q.question_text} ${(q.options || []).join(' ')} ${q.explanation}`;
    if (badChar.test(t)) fails.push(`${f}/${q.q}: U+FFFD`);
    if (t.includes('`')) fails.push(`${f}/${q.q}: backtick`);
    if (!q.explanation || !MARK.test(q.explanation)) fails.push(`${f}/${q.q}: explanation missing [1] tag`);
    if (!q.question_text || !STEM_MARK.test(q.question_text)) fails.push(`${f}/${q.q}: stem missing [WMA.. marks] tag`);
    if ((q.explanation || '').length < 60) fails.push(`${f}/${q.q}: explanation too short`);
    const m = RESIDUE.exec(q.explanation || '');
    if (m) fails.push(`${f}/${q.q}: residue "${m[0]}"`);
    if (ids.has(q.q)) fails.push(`${f}/${q.q}: duplicate id in file`);
    ids.add(q.q);
    if (!q.statement_code) fails.push(`${f}/${q.q}: missing statement_code`);
    const key = (q.question_text || '').replace(/\s+/g, ' ').trim().toLowerCase();
    if (seen.has(key)) fails.push(`${f}/${q.q}: stem duplicated from ${seen.get(key)}`);
    else seen.set(key, `${f}/${q.q}`);
  }
}
console.log(`files=${rawFiles.length} questions=${n}`);
if (fails.length) { console.log('FAILS:'); console.log(fails.join('\n')); process.exit(1); }
console.log('STRICT CHECKS PASS');
