// Idempotent fix for 1-based correct_option in CS/Physics OL questions.
// Ground truth: seed files put the true answer at opts[0] with correct: 1,
// while grading (grade_quiz RPC + UI) is 0-based. For every affected question
// we locate the TRUE answer by TEXT (from the seed files), then ensure it sits
// at a deterministic hash-based slot with correct_option = that slot.
// Safe to re-run: questions already correct are skipped.
const https = require("https");
const fs = require("fs");

const TOKEN = (fs.readFileSync(".freebuff/get-keys.cjs", "utf8").match(/sbp_[a-f0-9]+/) || [])[0];
const REF = (fs.readFileSync(".env", "utf8").match(/VITE_SUPABASE_PROJECT_ID\s*=\s*"?([\w-]+)"?/) || [])[1];

function raw(body) {
  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: "api.supabase.com",
        path: `/v1/projects/${REF}/database/query`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body),
        },
      },
      (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          if (res.statusCode >= 400) return reject(new Error(`HTTP ${res.statusCode}: ${data.slice(0, 300)}`));
          try { resolve(JSON.parse(data)); } catch { resolve(data); }
        });
      }
    );
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}
async function query(sql) {
  const body = JSON.stringify({ query: sql });
  for (let attempt = 1; ; attempt++) {
    try { return await raw(body); }
    catch (e) {
      if (String(e.message).includes("429") && attempt <= 8) {
        await new Promise((r) => setTimeout(r, 1500 * attempt));
        continue;
      }
      throw e;
    }
  }
}
const rows = (r) => (Array.isArray(r) ? r : r.rows ?? []);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------- parse seed files: question text -> true answer text ----------
function parseSeeds(file) {
  const src = fs.readFileSync(file, "utf8");
  const map = new Map();
  // Each question is one line: { q: '...', opts: ['a','b','c','d'], correct: 1, ... }
  const lineRe = /q:\s*'((?:[^'\\]|\\.)*)'[\s\S]{0,400}?opts:\s*\[([^\]]+)\]/g;
  let m;
  while ((m = lineRe.exec(src))) {
    const q = m[1].replace(/\\'/g, "'").replace(/\\n/g, "\n").trim();
    const opts = [...m[2].matchAll(/'((?:[^'\\]|\\.)*)'/g)].map((x) => x[1].replace(/\\'/g, "'").trim());
    if (q && opts.length === 4) map.set(q, opts[0]);
  }
  return map;
}
const truth = new Map();
for (const f of ["seed-cs-ol.cjs", "seed-physics-ol.cjs", "seed-physics-v2.cjs"]) {
  const m = parseSeeds(`.freebuff/${f}`);
  console.log(`${f}: ${m.size} questions parsed`);
  for (const [k, v] of m) truth.set(k, v); // later files win; texts are identical where duplicated
}
console.log(`Ground-truth map: ${truth.size} unique questions`);

// ---------- load affected DB questions ----------
const affected = rows(await query(`
  select q.id::text as qid, q.question_text, q.options, q.correct_option
  from questions q
  join quizzes z on z.id = q.quiz_id
  join topics t on t.id = z.topic_id
  join subject_levels sl on sl.id = t.subject_level_id
  join subjects s on s.id = sl.subject_id
  where (s.name = 'Computer Science' and sl.level = 'OL')
     or (s.name = 'Physics' and sl.level = 'OL')
`));
console.log(`Affected DB questions: ${affected.length}`);

const hashSlot = (qid) => [...qid].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7) % 4;

const updates = [];
let ok = 0, missing = 0, alreadyDone = 0;
for (const q of affected) {
  const answer = truth.get(q.question_text.trim());
  if (!answer) { missing++; continue; }
  const opts = q.options;
  if (!Array.isArray(opts) || opts.length !== 4) { missing++; continue; }
  const curIdx = opts.findIndex((o) => String(o).trim() === answer);
  if (curIdx < 0) { console.log(`answer text not found in options for: ${q.question_text.slice(0, 50)}`); missing++; continue; }
  const target = hashSlot(q.qid);
  if (curIdx === target && q.correct_option === target) { alreadyDone++; continue; }
  const rotated = [...opts];
  rotated.splice(curIdx, 1);
  rotated.splice(target, 0, answer);
  updates.push({ qid: q.qid, options: rotated, slot: target });
  ok++;
}
console.log(`to fix: ${ok}, already correct: ${alreadyDone}, unmatched: ${missing}`);

// ---------- apply in chunks of 8 with dollar-quoted JSON ----------
const dq = (s) => `$j$${s}$j$`;
for (let i = 0; i < updates.length; i += 8) {
  const chunk = updates.slice(i, i + 8);
  const vals = chunk
    .map((u) => `('${u.qid}'::uuid, ${dq(JSON.stringify(u.options))}::jsonb, ${u.slot})`)
    .join(",");
  await query(
    `update questions as q set options = v.o, correct_option = v.c from (values ${vals}) as v(id, o, c) where q.id = v.id`
  );
  console.log(`  applied ${Math.min(i + 8, updates.length)}/${updates.length}`);
  await sleep(400);
}

const dist = rows(await query(`select correct_option, count(*)::int as n from questions group by 1 order by 1`));
console.log("New distribution:", JSON.stringify(dist));
