// Blind re-solve of every accepted question, using the deployed draft-content
// function in its read-only `solve` kind (the same call build-topic-bank makes).
// Results go to .freebuff-tmp/blind/<slug>.json. Drafts are never written.
// Stops cleanly on a neuron-cap 429 so a rerun resumes from saved files.
const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = process.cwd();
const env = fs.readFileSync(path.join(ROOT, '.env'), 'utf8');
const envVal = n => (env.match(new RegExp(`^${n}=(.*)$`, 'm')) || [])[1].trim().replace(/^["']|["']$/g, '');
const SUPABASE_URL = envVal('VITE_SUPABASE_URL');
const SERVICE_KEY = fs.readFileSync(path.join(ROOT, '.freebuff', 'sr.key'), 'utf8').trim();
const OUT = path.join(ROOT, '.freebuff-tmp', 'blind');
const BATCH = 15;
fs.mkdirSync(OUT, { recursive: true });

function post(body) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(body);
    const req = https.request({
      hostname: new URL(SUPABASE_URL).hostname,
      path: '/functions/v1/draft-content',
      method: 'POST',
      headers: { Authorization: `Bearer ${SERVICE_KEY}`, apikey: SERVICE_KEY, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) },
    }, res => {
      let out = '';
      res.on('data', c => (out += c));
      res.on('end', () => resolve({ status: res.statusCode, text: out }));
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function solveBatch(items) {
  // Answers come back positional; a 500 is retried once at half size, as the builder does.
  let r = await post({ kind: 'solve', count: 0, items });
  if (r.status === 500 && items.length > 4) {
    const h = Math.ceil(items.length / 2);
    const a = await solveBatch(items.slice(0, h));
    const b = await solveBatch(items.slice(h));
    return [...a, ...b];
  }
  if (r.status === 429) throw Object.assign(new Error('NEURON_CAP'), { cap: true, text: r.text.slice(0, 200) });
  if (r.status !== 200) throw new Error(`solve HTTP ${r.status}: ${r.text.slice(0, 200)}`);
  const parsed = JSON.parse(r.text);
  const answers = Array.isArray(parsed.answers) ? parsed.answers : [];
  if (answers.length !== items.length) throw new Error(`solve returned ${answers.length} answers for ${items.length} items`);
  return answers;
}

(async () => {
  const dir = path.join(ROOT, '.freebuff', 'drafts');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json')).sort();
  let total = 0, agree = 0, disagree = 0, noOpt = 0;
  for (const f of files) {
    const slug = f.replace(/\.json$/, '');
    const d = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
    if (!Array.isArray(d.accepted) || !d.accepted.length) continue;
    const outFile = path.join(OUT, f);
    if (fs.existsSync(outFile)) {
      const prev = JSON.parse(fs.readFileSync(outFile, 'utf8'));
      for (const r of prev.items) { total++; r.verdict === 'agrees' ? agree++ : r.verdict === 'no_option' ? noOpt++ : disagree++; }
      console.log(`cached  ${slug}`);
      continue;
    }
    const qs = d.accepted;
    const items = [];
    try {
      for (let i = 0; i < qs.length; i += BATCH) {
        const chunk = qs.slice(i, i + BATCH);
        const answers = await solveBatch(chunk.map(q => ({ question_text: q.question_text, options: q.options })));
        chunk.forEach((q, j) => {
          const a = answers[j];
          const verdict = a === -1 ? 'no_option' : a === null || a === undefined ? 'unreadable' : a === q.correct_option ? 'agrees' : 'disagrees';
          items.push({ question_text: q.question_text, key: q.correct_option, answer: a, verdict });
        });
      }
    } catch (e) {
      if (e.cap) { console.log(`NEURON CAP reached at ${slug}; ${items.length} solved for this file are NOT saved. Rerun resumes.`); process.exit(2); }
      throw e;
    }
    fs.writeFileSync(outFile, JSON.stringify({ topic_slug: slug, items }, null, 2) + '\n');
    for (const r of items) { total++; r.verdict === 'agrees' ? agree++ : r.verdict === 'no_option' ? noOpt++ : disagree++; }
    const dis = items.filter(r => r.verdict !== 'agrees').length;
    console.log(`solved  ${slug}  n=${items.length}  not-agreeing=${dis}`);
  }
  console.log(`\nTOTAL=${total} agrees=${agree} disagrees=${disagree} no_option=${noOpt}`);
})().catch(e => { console.error('ERROR', e.message); process.exit(1); });
