#!/usr/bin/env node
/**
 * Re-derive every applied statement link and report where the live row no longer
 * follows from the rules in link-question-statements.cjs.
 *
 *   node .freebuff/audit-statement-links.cjs [--limit N]
 *
 * A disagreement is not automatically an error: it means the link was written by
 * something other than these rules (an AI draft, a manual edit) or that the
 * rules changed after the write. It is the list a reviewer should read, which is
 * cheaper than reading 2,295 rows.
 */
const fs = require("node:fs");
const path = require("node:path");
const https = require("node:https");
const { proposalFor } = require("./link-question-statements.cjs");

const REF = "zzliiazovezhxbmfeqco";
const TOKEN = (fs.readFileSync(path.join(__dirname, "get-keys.cjs"), "utf8").match(/sbp_[a-f0-9]+/) || [])[0];
const limit = (() => {
  const i = process.argv.indexOf("--limit");
  return i === -1 ? 25 : Number(process.argv[i + 1]) || 25;
})();

const q = (t) =>
  new Promise((res, rej) => {
    const p = JSON.stringify({ query: t });
    const r = https.request(
      {
        hostname: "api.supabase.com",
        path: `/v1/projects/${REF}/database/query`,
        method: "POST",
        headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json", "Content-Length": Buffer.byteLength(p) },
      },
      (x) => {
        let o = "";
        x.on("data", (c) => (o += c));
        x.on("end", () => {
          try {
            res(JSON.parse(o));
          } catch {
            rej(new Error(o.slice(0, 200)));
          }
        });
      },
    );
    r.on("error", rej);
    r.write(p);
    r.end();
  });

(async () => {
  const statements = await q(`select s.id, s.code, s.title, s.topic_id from public.syllabus_statements s order by s.topic_id, s.sort_order`);
  const byTopic = new Map();
  for (const s of statements) {
    if (!byTopic.has(s.topic_id)) byTopic.set(s.topic_id, []);
    byTopic.get(s.topic_id).push({ id: s.id, code: s.code, title: s.title });
  }

  const rows = await q(`select q.id, q.question_text, q.options::text as options, q.explanation,
      q.statement_id, s.code as live_code, t.id as topic_id, t.slug as topic
    from public.questions q
    join public.quizzes z on z.id = q.quiz_id
    join public.topics t on t.id = z.topic_id
    left join public.syllabus_statements s on s.id = q.statement_id
    where q.statement_id is not null`);

  let agree = 0;
  const disagree = [];
  for (const r of rows) {
    let options = [];
    try {
      options = JSON.parse(r.options || "[]");
    } catch {
      options = [];
    }
    const p = proposalFor({ question_text: r.question_text, options, explanation: r.explanation }, byTopic.get(r.topic_id) || []);
    if (p.code === r.live_code) agree++;
    else disagree.push({ ...r, proposed: p });
  }

  console.log(`${rows.length} linked questions · ${agree} match the rules · ${disagree.length} do not`);
  const unlinkedByRules = disagree.filter((d) => !d.proposed.code).length;
  console.log(`  of those, the rules would leave ${unlinkedByRules} null and move ${disagree.length - unlinkedByRules} elsewhere`);
  for (const d of disagree.slice(0, limit)) {
    console.log(`\n  live ${d.live_code} · rules ${d.proposed.code || "null"} (${d.proposed.rule})`);
    console.log(`  [${d.topic}] ${String(d.question_text).slice(0, 110)}`);
  }
})().catch((e) => {
  console.error("FAIL", e.message);
  process.exit(1);
});
