// Self-test for check-strict-wma.cjs. Copies the real drafts into a temp dir,
// injects one defect at a time, and asserts the checker reports it (exit 1) with
// a message naming the right file. Proves the rules still bite — my own edits to
// the checker are exactly the case where a rule can quietly stop firing.
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const SRC = '.freebuff/drafts';
const CHECKS = {
  strict: '.freebuff-tmp/check-strict-wma.cjs',
  // duplicate-options and key-range are check-all-drafts.cjs rules, so the
  // self-test exercises that checker for those two cases.
  all: '.freebuff-tmp/check-all-drafts.cjs',
};
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'wma-selftest-'));

function stage() {
  const dest = path.join(tmp, 'drafts');
  fs.rmSync(dest, { recursive: true, force: true });
  fs.mkdirSync(dest, { recursive: true });
  for (const f of fs.readdirSync(SRC).filter(x => /^wma/.test(x) && x.endsWith('.json')))
    fs.copyFileSync(path.join(SRC, f), path.join(dest, f));
  return dest;
}

function run(dest, which = 'strict') {
  try {
    const out = execFileSync(process.execPath, [CHECKS[which]], {
      env: { ...process.env, DRAFTS_DIR: dest },
      encoding: 'utf8',
    });
    return { code: 0, out };
  } catch (e) {
    return { code: e.status ?? 1, out: (e.stdout || '') + (e.stderr || '') };
  }
}

const CASES = [
  ['stray cp1252 byte in a technique_note title', 'wma11-p1-b001.json', (dest) => {
    const p = path.join(dest, 'wma11-p1-b001.json');
    const b = fs.readFileSync(p);
    const i = b.indexOf(Buffer.from('\u2014'));
    fs.writeFileSync(p, Buffer.concat([b.slice(0, i), Buffer.from([0x97]), b.slice(i + 3)]));
  }, 'not valid UTF-8'],
  ['backtick in a technique_note content', 'wma11-p1-b002.json', (dest) => {
    const p = path.join(dest, 'wma11-p1-b002.json');
    const d = JSON.parse(fs.readFileSync(p, 'utf8'));
    d.technique_note.content = 'Use `x` here.';
    fs.writeFileSync(p, JSON.stringify(d));
  }, 'backtick in technique_note'],
  ['curly apostrophe in a technique_note', 'wma11-p1-b004.json', (dest) => {
    const p = path.join(dest, 'wma11-p1-b004.json');
    const d = JSON.parse(fs.readFileSync(p, 'utf8'));
    d.technique_note.content = d.technique_note.content + ' It\u2019s marked.';
    fs.writeFileSync(p, JSON.stringify(d));
  }, 'curly quote'],
  ['missing technique_note title', 'wma11-p1-b005.json', (dest) => {
    const p = path.join(dest, 'wma11-p1-b005.json');
    const d = JSON.parse(fs.readFileSync(p, 'utf8'));
    d.technique_note.title = '';
    fs.writeFileSync(p, JSON.stringify(d));
  }, 'technique_note missing title'],
  ['duplicate options', 'wma11-p1-b006.json', (dest) => {
    const p = path.join(dest, 'wma11-p1-b006.json');
    const d = JSON.parse(fs.readFileSync(p, 'utf8'));
    d.questions[4].options[1] = d.questions[4].options[0];
    fs.writeFileSync(p, JSON.stringify(d));
  }, 'duplicate option', 'all'],
  ['key out of range', 'wma11-p1-b007.json', (dest) => {
    const p = path.join(dest, 'wma11-p1-b007.json');
    const d = JSON.parse(fs.readFileSync(p, 'utf8'));
    d.questions[3].correct_option = 7;
    fs.writeFileSync(p, JSON.stringify(d));
  }, 'correct_option', 'all'],
  ['missing [1] mark tag', 'wma11-p1-b011.json', (dest) => {
    const p = path.join(dest, 'wma11-p1-b011.json');
    const d = JSON.parse(fs.readFileSync(p, 'utf8'));
    d.questions[2].explanation = d.questions[2].explanation.replace(/\[1\]/g, '');
    fs.writeFileSync(p, JSON.stringify(d));
  }, 'missing [1] tag'],
  ['missing marks tag in stem', 'wma11-p1-b012.json', (dest) => {
    const p = path.join(dest, 'wma11-p1-b012.json');
    const d = JSON.parse(fs.readFileSync(p, 'utf8'));
    d.questions[1].question_text = d.questions[1].question_text.replace(/\s*\[WMA11 P1, \d+ marks\]/, '');
    fs.writeFileSync(p, JSON.stringify(d));
  }, 'marks] tag'],
  ['drafting residue', 'wma11-p1-b014.json', (dest) => {
    const p = path.join(dest, 'wma11-p1-b014.json');
    const d = JSON.parse(fs.readFileSync(p, 'utf8'));
    d.questions[0].explanation = 'Wait, let me recalculate. ' + d.questions[0].explanation;
    fs.writeFileSync(p, JSON.stringify(d));
  }, 'residue'],
  ['duplicate stem', 'wma11-p1-b017.json', (dest) => {
    const p = path.join(dest, 'wma11-p1-b017.json');
    const q = path.join(dest, 'wma11-p1-b018.json');
    const a = JSON.parse(fs.readFileSync(p, 'utf8'));
    const b = JSON.parse(fs.readFileSync(q, 'utf8'));
    b.questions[5].question_text = a.questions[5].question_text;
    fs.writeFileSync(q, JSON.stringify(b));
  }, 'duplicated from'],
  ['missing statement_code', 'wma11-p1-b019.json', (dest) => {
    const p = path.join(dest, 'wma11-p1-b019.json');
    const d = JSON.parse(fs.readFileSync(p, 'utf8'));
    delete d.questions[6].statement_code;
    fs.writeFileSync(p, JSON.stringify(d));
  }, 'missing statement_code'],
  ['U+FFFD in student-visible text', 'wma12-p2-b005.json', (dest) => {
    const p = path.join(dest, 'wma12-p2-b005.json');
    const d = JSON.parse(fs.readFileSync(p, 'utf8'));
    d.questions[2].options[0] = 'oops \uFFFD here';
    fs.writeFileSync(p, JSON.stringify(d));
  }, 'U+FFFD'],
  // A truncated write must be named and skipped, not abort the run: the gate
  // has to report exit 1 with the file's name, never an uncaught stack trace.
  ['truncated draft file (invalid JSON)', 'wma11-p1-b016.json', (dest) => {
    const p = path.join(dest, 'wma11-p1-b016.json');
    fs.writeFileSync(p, fs.readFileSync(p, 'utf8').slice(0, 4000));
  }, 'invalid JSON'],
];

// 1. the unmodified copy must pass
let fails = 0;
const clean = stage();
let r = run(clean);
if (r.code !== 0) { console.log('SELFTEST FAIL: clean copy reported problems\n' + r.out); fails++; }
else console.log('ok  clean copy passes (strict)');
r = run(clean, 'all');
if (!/PROBLEMS=0/.test(r.out)) { console.log('SELFTEST FAIL: clean copy has structural problems\n' + r.out); fails++; }
else console.log('ok  clean copy passes (structural)');

// 2. each injected defect must be reported, naming its file.
// check-all-drafts.cjs reports via ISSUES= lines (exit 0), so for its cases
// the message match is the assertion, not the exit code.
for (const [label, file, mutate, expect, which = 'strict'] of CASES) {
  const dest = stage();
  mutate(dest);
  r = run(dest, which);
  const flagged = r.out.includes(file) && r.out.includes(expect);
  const ok = which === 'strict' ? (r.code !== 0 && flagged) : flagged;
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${label}`);
  if (!ok) { fails++; console.log('      exit=' + r.code + ' expected message ' + JSON.stringify(expect) + '\n' + r.out.split('\n').slice(0, 4).join('\n')); }
}

fs.rmSync(tmp, { recursive: true, force: true });
console.log(fails ? `\nSELFTEST FAILURES: ${fails}` : `\nSELFTEST PASS (${CASES.length} rules + clean copy)`);
process.exit(fails ? 1 : 0);
