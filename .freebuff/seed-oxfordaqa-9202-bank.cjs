#!/usr/bin/env node
/**
 * Seed the OxfordAQA 9202 question bank, one quiz per topic, every question
 * linked to the specification subsection it tests.
 *
 *   node .freebuff/seed-oxfordaqa-9202-bank.cjs            # dry run, writes the SQL
 *   node .freebuff/seed-oxfordaqa-9202-bank.cjs --apply    # sends it
 *
 * Why this exists rather than reusing build-topic-bank.cjs: that script drafts
 * through Workers AI, and the older 0620 banks it produced carry a null
 * questions.statement_id, so syllabus_coverage() cannot see them. These modules
 * name their subsection, so the bank is attributable without a model call.
 *
 * Idempotent twice over: the quiz is matched on (topic_id, title) and each
 * question on (quiz_id, question_text). A re-run updates in place. Questions
 * that have been removed from a module are deleted only if no bookmark or
 * timing row points at them — deleting a question cascades to bookmarks, and a
 * re-seed must never take a student's saved question with it.
 */
const fs = require("node:fs");
const path = require("node:path");
const https = require("node:https");

const ROOT = path.join(__dirname, "..");
const SUBJECT_SLUG = "chemistry-oxfordaqa";
const LEVEL = "IGCSE";

const MODULES = [
  require("./content-bank-9202-01-atomic.cjs"),
  require("./content-bank-9202-02-bonding.cjs"),
  require("./content-bank-9202-03-chemical-changes.cjs"),
  require("./content-bank-9202-04-chemical-analysis.cjs"),
  require("./content-bank-9202-05-acids-salts.cjs"),
  require("./content-bank-9202-06-quantitative.cjs"),
  require("./content-bank-9202-07-trends.cjs"),
  require("./content-bank-9202-08-rate-extent.cjs"),
  require("./content-bank-9202-09-energy.cjs"),
  require("./content-bank-9202-10-organic.cjs"),
];

const TOKEN = (fs.readFileSync(path.join(__dirname, "get-keys.cjs"), "utf8").match(/sbp_[a-f0-9]+/) || [])[0];
const REF = (fs.readFileSync(path.join(ROOT, ".env"), "utf8").match(/VITE_SUPABASE_PROJECT_ID\s*=\s*"?([\w-]+)"?/) || [])[1];

/* ── validate the modules before any SQL exists ──────────────────────────── */

const problems = [];
const seenStems = new Map();
for (const m of MODULES) {
  if (!m.topicSlug || !m.title) problems.push(`${m.topicSlug || "(no slug)"}: missing topicSlug or title`);
  if (!Array.isArray(m.questions) || m.questions.length < 12) {
    problems.push(`${m.topicSlug}: only ${(m.questions || []).length} questions (need 12+)`);
  }
  const stems = new Set();
  for (const [i, q] of (m.questions || []).entries()) {
    const where = `${m.topicSlug} q${i + 1}`;
    if (!q.st || !/^\d+\.\d+\.\d+$/.test(q.st)) problems.push(`${where}: bad statement code ${JSON.stringify(q.st)}`);
    if (!q.q || q.q.length < 20) problems.push(`${where}: stem too short`);
    if (!Array.isArray(q.o) || q.o.length !== 4) problems.push(`${where}: needs exactly 4 options`);
    else if (new Set(q.o.map((o) => String(o).trim().toLowerCase())).size !== 4) problems.push(`${where}: duplicate options`);
    if (!Number.isInteger(q.c) || q.c < 0 || q.c > 3) problems.push(`${where}: correct_option ${q.c} cannot point at an option`);
    if (!q.e || q.e.length < 40) problems.push(`${where}: explanation too short`);
    if (!["check", "drill", "exam"].includes(q.d)) problems.push(`${where}: bad difficulty ${q.d}`);
    if (stems.has(q.q)) problems.push(`${where}: duplicate stem inside the topic`);
    stems.add(q.q);
    const key = q.q.trim().toLowerCase();
    if (seenStems.has(key)) problems.push(`${where}: stem duplicates ${seenStems.get(key)}`);
    else seenStems.set(key, where);
  }
  const tiers = new Set((m.questions || []).map((q) => q.d));
  for (const tier of ["check", "drill", "exam"]) if (!tiers.has(tier)) problems.push(`${m.topicSlug}: no ${tier} questions`);
}
if (problems.length) {
  console.error("module validation failed:");
  for (const p of problems) console.error("  - " + p);
  process.exit(1);
}

/* ── SQL helpers ─────────────────────────────────────────────────────────── */

function lit(value) {
  let tag = "lit";
  let n = 0;
  while (String(value).includes(`$${tag}$`)) tag = `lit${++n}`;
  return `$${tag}$${value}$${tag}$`;
}

const topicCte = (slug) => `t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = ${lit(SUBJECT_SLUG)} and sl.level = ${lit(LEVEL)} and t.slug = ${lit(slug)}
)`;

const statements = [];

for (const m of MODULES) {
  const description = `Practice questions for ${m.title.replace(/ — Topic Questions$/, "")}, each linked to the OxfordAQA 9202 specification subsection it tests.`;

  statements.push(`with ${topicCte(m.topicSlug)},
upd as (
  update public.quizzes z
  set description = ${lit(description)}, is_published = true, exam_type = 'quiz', updated_at = now()
  from t
  where z.topic_id = t.id and z.title = ${lit(m.title)}
  returning z.id
)
insert into public.quizzes (topic_id, title, description, is_published, exam_type)
select t.id, ${lit(m.title)}, ${lit(description)}, true, 'quiz'
from t
where not exists (select 1 from upd);`);

  m.questions.forEach((q, index) => {
    const options = lit(JSON.stringify(q.o));
    statements.push(`with ${topicCte(m.topicSlug)},
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = ${lit(m.title)}),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = ${lit(q.st)}),
upd as (
  update public.questions q
  set options = ${options}::jsonb, correct_option = ${q.c}, explanation = ${lit(q.e)},
      sort_order = ${index + 1}, difficulty = ${lit(q.d)}, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = ${lit(q.q)}
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, ${lit(q.q)}, ${options}::jsonb, ${q.c}, ${lit(q.e)}, ${index + 1}, ${lit(q.d)}, (select id from st)
from z
where not exists (select 1 from upd);`);
  });

  const stemList = m.questions.map((q) => lit(q.q)).join(",\n      ");
  statements.push(`delete from public.questions q
using public.quizzes z, public.topics t, public.subject_levels sl, public.subjects s
where q.quiz_id = z.id and z.topic_id = t.id and sl.id = t.subject_level_id and s.id = sl.subject_id
  and s.slug = ${lit(SUBJECT_SLUG)} and sl.level = ${lit(LEVEL)} and z.title = ${lit(m.title)}
  and q.question_text not in (
      ${stemList})
  and not exists (select 1 from public.question_bookmarks b where b.question_id = q.id)
  and not exists (select 1 from public.question_timings tm where tm.question_id = q.id);`);
}

const sql = statements.join("\n\n") + "\n";
const sqlPath = path.join(__dirname, "seed-oxfordaqa-9202-bank.sql");
fs.writeFileSync(sqlPath, sql);
console.log(`built ${MODULES.length} quiz(zes), ${MODULES.reduce((n, m) => n + m.questions.length, 0)} questions, ${sql.length} chars of SQL`);
for (const m of MODULES) {
  const counts = { check: 0, drill: 0, exam: 0 };
  for (const q of m.questions) counts[q.d]++;
  const sts = new Set(m.questions.map((q) => q.st));
  console.log(`  ${m.topicSlug}: ${m.questions.length} questions · ${sts.size} statements · ${counts.check}/${counts.drill}/${counts.exam}`);
}

if (!process.argv.includes("--apply")) {
  console.log("dry run: nothing sent. Re-run with --apply to write.");
  process.exit(0);
}

/* ── preflight: every statement code must exist, or statement_id lands null ─ */

function query(text) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({ query: text });
    const req = https.request(
      {
        hostname: "api.supabase.com",
        path: `/v1/projects/${REF}/database/query`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(payload),
        },
      },
      (res) => {
        let out = "";
        res.setEncoding("utf8");
        res.on("data", (c) => (out += c));
        res.on("end", () => {
          if (res.statusCode >= 300) return reject(new Error(`HTTP ${res.statusCode}: ${out.slice(0, 400)}`));
          try {
            resolve(JSON.parse(out));
          } catch {
            resolve(out);
          }
        });
      },
    );
    req.on("error", reject);
    req.write(payload);
    req.end();
  });
}

(async () => {
  const wanted = [...new Set(MODULES.flatMap((m) => m.questions.map((q) => `${m.topicSlug}|${q.st}`)))];
  const rows = await query(`select t.slug as topic, s.code
    from public.syllabus_statements s
    join public.topics t on t.id = s.topic_id
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects su on su.id = sl.subject_id
    where su.slug = '${SUBJECT_SLUG}' and sl.level = '${LEVEL}'`);
  const have = new Set(rows.map((r) => `${r.topic}|${r.code}`));
  const missing = wanted.filter((w) => !have.has(w));
  if (missing.length) {
    console.error(`preflight failed: ${missing.length} statement code(s) not found — ${missing.slice(0, 8).join(", ")}`);
    process.exit(1);
  }
  console.log(`preflight: all ${wanted.length} topic/statement pairs exist`);

  const result = await query(sql);
  console.log("status 201");
  console.log(JSON.stringify(result).slice(0, 200));
})().catch((e) => {
  console.error("FAIL", e.message);
  process.exit(1);
});
