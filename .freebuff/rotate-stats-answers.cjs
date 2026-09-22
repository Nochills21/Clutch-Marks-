// Rotate options for A2 math stats questions (currently all correct:0) so the
// answer position varies. Rotation preserves the answer text itself.
const fs = require("fs");
const https = require("https");

const TOKEN = (fs.readFileSync(".freebuff/get-keys.cjs", "utf8").match(/sbp_[a-f0-9]+/) || [])[0];
const REF = (fs.readFileSync(".env", "utf8").match(/VITE_SUPABASE_PROJECT_ID\s*=\s*"?([\w-]+)"?/) || [])[1];
const A2_MATH_SL = "e7af57fc-acf9-47cd-b28f-9bc7d1cee4dc";

function query(sql) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ query: sql });
    const req = https.request(
      { hostname: "api.supabase.com", path: `/v1/projects/${REF}/database/query`, method: "POST",
        headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json", "Content-Length": Buffer.byteLength(body) } },
      (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          if (res.statusCode >= 400) return reject(new Error(`HTTP ${res.statusCode}: ${data.slice(0, 400)}`));
          try { resolve(JSON.parse(data)); } catch { resolve(data); }
        });
      }
    );
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}
const rows = (r) => (Array.isArray(r) ? r : r.rows ?? []);

(async () => {
  // Stats topics are sort_order >= 7 in A2 math (pure occupies 1-6).
  const qs = rows(await query(
    `select qq.id, qq.options, qq.correct_option, qq.sort_order from questions qq
     join quizzes q on q.id = qq.quiz_id
     join topics t on t.id = q.topic_id
     where t.subject_level_id = '${A2_MATH_SL}' and t.sort_order >= 7
     order by q.id, qq.sort_order`));
  console.log(`questions to rotate: ${qs.length}`);

  // Position before rotation for reporting.
  const before = { 0: 0, 1: 0, 2: 0, 3: 0 };
  qs.forEach((q) => before[q.correct_option]++);

  let updated = 0;
  for (let i = 0; i < qs.length; i++) {
    const q = qs[i];
    const opts = q.options;
    if (!Array.isArray(opts) || opts.length !== 4) { console.log(`skip malformed ${q.id}`); continue; }
    const shift = i % 4; // deterministic even spread
    if (shift === 0) continue;
    const rotated = opts.map((_, j) => opts[(j - shift + 4) % 4]);
    const newCorrect = (q.correct_option + shift) % 4;
    await query(
      `update questions set options = '${JSON.stringify(rotated)}'::jsonb, correct_option = ${newCorrect} where id = '${q.id}'`);
    updated++;
  }
  const after = { 0: 0, 1: 0, 2: 0, 3: 0 };
  const check = rows(await query(
    `select qq.correct_option, count(*) as n from questions qq
     join quizzes q on q.id = qq.quiz_id
     join topics t on t.id = q.topic_id
     where t.subject_level_id = '${A2_MATH_SL}' and t.sort_order >= 7
     group by 1 order by 1`));
  check.forEach((r) => (after[r.correct_option] = r.n));
  console.log(`rotated: ${updated}`);
  console.log(`before: ${JSON.stringify(before)} | after: ${JSON.stringify(after)}`);
})().catch((e) => { console.error("FATAL", e.message); process.exit(1); });
