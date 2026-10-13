#!/usr/bin/env node
/**
 * Generic objectives seeder: same shape as the reference topic
 * (seed-objectives-algebra-equations.cjs), driven by a data file:
 *
 *   node .freebuff/seed-objectives.cjs .freebuff/objectives/<topic-slug>.cjs [--dry]
 *
 * The data file exports { TOPIC, QUIZ_TITLE, QUIZ_DESCRIPTION, OBJECTIVES,
 * EXAM_QUESTIONS } with the reference file's exact shapes. Idempotent:
 * objectives upserted on (topic_id, code); the checkpoint quiz is deleted and
 * rebuilt (its questions cascade). Run the gate after:
 *   node .freebuff/gate-objectives.cjs <topic-slug>
 *
 * Content rules (see docs/objectives-authoring.md): no backticks anywhere in
 * the data, maths as \\( ... \\) (double backslash in the .cjs source),
 * correct_option 0-based with rotated positions, 2 checks per objective.
 */
const fs = require("fs");
const path = require("path");
const https = require("https");

const REF = "zzliiazovezhxbmfeqco";
const TOKEN = (fs.readFileSync(path.join(__dirname, "get-keys.cjs"), "utf8").match(/sbp_[a-f0-9]+/) || [])[0];

const dataFile = process.argv[2];
if (!dataFile) {
  console.error("usage: node .freebuff/seed-objectives.cjs <data-file.cjs> [--dry]");
  process.exit(1);
}
const DATA = require(path.resolve(dataFile));
const { TOPIC, QUIZ_TITLE, QUIZ_DESCRIPTION, OBJECTIVES, EXAM_QUESTIONS } = DATA;
if (!TOPIC || !QUIZ_TITLE || !OBJECTIVES) {
  console.error("data file must export TOPIC, QUIZ_TITLE, OBJECTIVES (and EXAM_QUESTIONS)");
  process.exit(1);
}

function post(sql) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ query: sql });
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
        let out = "";
        res.on("data", (c) => (out += c));
        res.on("end", () =>
          res.statusCode >= 300 ? reject(new Error(`${res.statusCode} ${out.slice(0, 500)}`)) : resolve(out),
        );
      },
    );
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

/** Dollar-quoted literal: these strings contain quotes, newlines and maths. */
const dq = (text, tag) => `$${tag}$${text}$${tag}$`;
/** Plain single-quoted literal for short values. */
const q = (s) => `'${String(s).replace(/'/g, "''")}'`;

const TOPIC_SUBQUERY = `(select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = ${q(TOPIC.subject)} and sl.level = ${q(TOPIC.level)} and t.slug = ${q(TOPIC.slug)})`;

async function main() {
  const dry = process.argv.includes("--dry");

  const objectivesSql = OBJECTIVES.map(
    (o, index) => `(${TOPIC_SUBQUERY}, ${q(o.code)}, ${dq(o.statement, "st")}, ${dq(o.teach, "teach")}, ${index + 1})`,
  ).join(",\n");
  await post(`insert into public.learning_objectives (topic_id, code, statement, teach, sort_order)
values
${objectivesSql}
on conflict (topic_id, code) do update set
  statement = excluded.statement,
  teach = excluded.teach,
  sort_order = excluded.sort_order;`);

  if (dry) {
    console.log(`${TOPIC.slug}: objectives upserted (${OBJECTIVES.length}); quiz not touched (--dry)`);
    return;
  }

  await post(`delete from public.quizzes
 where topic_id = ${TOPIC_SUBQUERY} and title = ${q(QUIZ_TITLE)};`);

  const inserted = JSON.parse(
    await post(`insert into public.quizzes (topic_id, title, description, is_published, exam_type)
values (${TOPIC_SUBQUERY}, ${q(QUIZ_TITLE)}, ${dq(QUIZ_DESCRIPTION, "desc")}, true, 'quiz')
returning id;`),
  );
  const quizId = inserted[0].id;

  const rows = [];
  for (const [index, o] of OBJECTIVES.entries()) {
    o.checks.forEach((c, i) => {
      rows.push(
        `(${q(quizId)}, ${dq(c.q, "qt")}, ${dq(JSON.stringify(c.options), "opts")}::jsonb, ${c.correct}, ` +
          `${dq(c.explanation, "ex")}, 'check', ${index + 1}${String(i + 1).padStart(2, "0")}, ` +
          `(select id from public.learning_objectives where topic_id = ${TOPIC_SUBQUERY} and code = ${q(o.code)}))`,
      );
    });
  }
  (EXAM_QUESTIONS || []).forEach((c, i) => {
    rows.push(
      `(${q(quizId)}, ${dq(c.q, "qt")}, ${dq(JSON.stringify(c.options), "opts")}::jsonb, ${c.correct}, ` +
        `${dq(c.explanation, "ex")}, 'exam', ${900 + i}, ` +
        `(select id from public.learning_objectives where topic_id = ${TOPIC_SUBQUERY} and code = ${q(c.code)}))`,
    );
  });

  await post(`insert into public.questions
  (quiz_id, question_text, options, correct_option, explanation, difficulty, sort_order, objective_id)
values
${rows.join(",\n")};`);

  const summary = JSON.parse(
    await post(`select o.code,
       o.sort_order,
       length(o.teach) as teach_chars,
       count(q.id) filter (where q.difficulty = 'check') as checks,
       count(q.id) filter (where q.difficulty = 'exam') as exam
  from public.learning_objectives o
  left join public.questions q on q.objective_id = o.id
 where o.topic_id = ${TOPIC_SUBQUERY}
 group by o.code, o.sort_order, o.teach
 order by o.sort_order;`),
  );

  console.log(`${TOPIC.slug}: ${summary.length} objectives, quiz ${quizId}`);
  for (const r of summary) {
    console.log(`  ${r.code.padEnd(11)} teach ${String(r.teach_chars).padStart(4)} chars · ${r.checks} check · ${r.exam} exam`);
  }
  console.log(
    `  total: ${summary.reduce((n, r) => n + Number(r.checks), 0)} checkpoint questions, ` +
      `${summary.reduce((n, r) => n + Number(r.exam), 0)} exam-tier`,
  );
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
