// Apply mark-scheme explanations to A2 physics/CS questions.
// For entries with a `fix`, replaces options + correct index as well.
// Replaces the explanation field entirely (mark-scheme lines are the full text).
const fs = require("fs");
const https = require("https");
const { physics, cs } = require("./mark-schemes-a2.cjs");

const TOKEN = (fs.readFileSync(".freebuff/get-keys.cjs", "utf8").match(/sbp_[a-f0-9]+/) || [])[0];
const REF = (fs.readFileSync(".env", "utf8").match(/VITE_SUPABASE_PROJECT_ID\s*=\s*"?([\w-]+)"?/) || [])[1];

const SL = {
  "physics": "0c990ae9-64ef-45a9-8a9c-388b12af3fa8", // Physics A2 (from seed-as-a2-rest)
  "computer-science": "d7a629ea-ffbc-4067-88bd-d556a8ced681", // CS A2
};

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
function dq(s) {
  let tag = "$t$";
  while (s.includes(tag)) tag = `$t${Math.random().toString(36).slice(2)}$`;
  return tag + s + tag;
}

async function applyToSubject(subjectKey, schemes, slId) {
  const topics = rows(await query(
    `select t.id, t.name from topics t where t.subject_level_id = '${slId}'`));
  let applied = 0, fixed = 0, missing = [];

  for (const [topicName, qMap] of Object.entries(schemes)) {
    const topic = topics.find((t) => t.name === topicName);
    if (!topic) { missing.push(`${subjectKey}/${topicName} (topic)`); continue; }
    const qs = rows(await query(
      `select qq.id, qq.sort_order from questions qq
       join quizzes q on q.id = qq.quiz_id where q.topic_id = '${topic.id}'
       order by q.id, qq.sort_order`));

    for (const [idxStr, entry] of Object.entries(qMap)) {
      const idx = parseInt(idxStr, 10);
      const row = qs[idx]; // sort_order is 1-based and matches authoring order
      if (!row) { missing.push(`${subjectKey}/${topicName}[${idx}] (question)`); continue; }

      const msLines = Array.isArray(entry) ? entry : entry.ms;
      const explanation = msLines.join("\n");
      if (Array.isArray(entry) || !entry.fix) {
        await query(`update questions set explanation = ${dq(explanation)} where id = '${row.id}'`);
      } else {
        const { opts, correct } = entry.fix;
        await query(
          `update questions set explanation = ${dq(explanation)}, options = '${JSON.stringify(opts)}'::jsonb, correct_option = ${correct} where id = '${row.id}'`);
        fixed++;
      }
      applied++;
    }
  }
  console.log(`${subjectKey}: ${applied} explanations applied, ${fixed} answers corrected, missing: ${missing.length ? missing.join("; ") : "none"}`);
}

(async () => {
  await applyToSubject("physics", physics, SL["physics"]);
  await applyToSubject("computer-science", cs, SL["computer-science"]);
  // sanity: distribution of answer positions after fixes
  for (const [k, slId] of Object.entries(SL)) {
    const dist = rows(await query(
      `select qq.correct_option, count(*) as n from questions qq
       join quizzes q on q.id = qq.quiz_id join topics t on t.id = q.topic_id
       where t.subject_level_id = '${slId}' group by 1 order by 1`));
    console.log(`${k} answer distribution:`, JSON.stringify(dist));
  }
})().catch((e) => { console.error("FATAL", e.message); process.exit(1); });
