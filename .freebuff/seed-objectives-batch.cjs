#!/usr/bin/env node
/**
 * Batch seeder for the objective layer.
 *
 * Each topic's content lives in `.freebuff/objectives/<topic-slug>.cjs`, shaped
 * like `.freebuff/seed-objectives-algebra-equations.cjs`:
 *
 *   { TOPIC: { subject, level, slug }, QUIZ_TITLE, QUIZ_DESCRIPTION,
 *     OBJECTIVES: [{ code, statement, teach, checks: [{ q, options, correct, explanation }] }],
 *     EXAM_QUESTIONS: [{ code, q, options, correct, explanation }] }
 *
 * Behaviour per topic (mirrors the reference seeder):
 *   - upsert learning_objectives on (topic_id, code)
 *   - delete + recreate the checkpoint quiz (questions cascade), so a re-run
 *     replaces content instead of duplicating it
 *   - insert check questions untagged-to-statement (like the reference) and
 *     exam questions WITH statement_id resolved from syllabus_statements
 *
 *   node .freebuff/seed-objectives-batch.cjs --topic algorithms-programming
 *   node .freebuff/seed-objectives-batch.cjs --all
 *   node .freebuff/seed-objectives-batch.cjs --topic algorithms-programming --print .freebuff-tmp/seed.sql
 */
const fs = require("fs");
const path = require("path");
const https = require("https");

const ROOT = path.join(__dirname, "..");
const DIR = path.join(__dirname, "objectives");
const TOKEN = (fs.readFileSync(path.join(__dirname, "get-keys.cjs"), "utf8").match(/sbp_[a-f0-9]+/) || [])[0];
const REF = (fs.readFileSync(path.join(ROOT, ".env"), "utf8").match(/VITE_SUPABASE_PROJECT_ID\s*=\s*"?([\w-]+)"?/) || [])[1];

function post(query) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ query });
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

/** Dollar-quoted literal: authored strings contain quotes, newlines and maths. */
const dq = (text, tag) => `$${tag}$${text}$${tag}$`;
/** Plain single-quoted literal for short values. */
const q = (s) => `'${String(s).replace(/'/g, "''")}'`;

/** Same parse as gate-objectives.cjs: "0478 7a" -> "7", "0478 1.1a" -> "1.1". */
function statementKey(code) {
  const tail = String(code ?? "").trim().split(" ").pop() || "";
  let s = tail;
  const isL = (c) => (c >= 65 && c <= 90) || (c >= 97 && c <= 122);
  if (s.length > 1 && isL(s.charCodeAt(0))) s = s.slice(1);
  if (s.length > 1 && isL(s.charCodeAt(s.length - 1))) s = s.slice(0, -1);
  return s || null;
}

const subqueryFor = (t) => `(select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = ${q(t.subject)} and sl.level = ${q(t.level)} and t.slug = ${q(t.slug)})`;

function buildRows(data, T, quizId) {
  const { OBJECTIVES, EXAM_QUESTIONS } = data;
  const rows = [];
  for (const [index, o] of OBJECTIVES.entries()) {
    o.checks.forEach((c, i) => {
      rows.push(
        `(${q(quizId)}, ${dq(c.q, "qt")}, ${dq(JSON.stringify(c.options), "opts")}::jsonb, ${c.correct}, ` +
          `${dq(c.explanation, "ex")}, 'check', ${index + 1}${String(i + 1).padStart(2, "0")}, ` +
          `(select id from public.learning_objectives where topic_id = ${T} and code = ${q(o.code)}), null)`,
      );
    });
  }
  EXAM_QUESTIONS.forEach((c, i) => {
    const key = statementKey(c.code);
    rows.push(
      `(${q(quizId)}, ${dq(c.q, "qt")}, ${dq(JSON.stringify(c.options), "opts")}::jsonb, ${c.correct}, ` +
        `${dq(c.explanation, "ex")}, 'exam', ${900 + i}, ` +
        `(select id from public.learning_objectives where topic_id = ${T} and code = ${q(c.code)}), ` +
        `(select id from public.syllabus_statements where topic_id = ${T} and code = ${q(key)}))`,
    );
  });
  return rows;
}

async function seedFile(file, printTo) {
  const data = require(file);
  const { TOPIC, QUIZ_TITLE, QUIZ_DESCRIPTION, OBJECTIVES } = data;
  const T = subqueryFor(TOPIC);

  if (printTo) {
    const objectivesSql = OBJECTIVES.map(
      (o, i) => `(${T}, ${q(o.code)}, ${dq(o.statement, "st")}, ${dq(o.teach, "teach")}, ${i + 1})`,
    ).join(",\n");
    const sql = [
      `insert into public.learning_objectives (topic_id, code, statement, teach, sort_order)\nvalues\n${objectivesSql}\non conflict (topic_id, code) do update set\n  statement = excluded.statement,\n  teach = excluded.teach,\n  sort_order = excluded.sort_order;`,
      `delete from public.quizzes\n where topic_id = ${T} and title = ${q(QUIZ_TITLE)};`,
      `insert into public.quizzes (id, topic_id, title, description, is_published, exam_type)
values ('00000000-0000-0000-0000-000000000000', ${T}, ${q(QUIZ_TITLE)}, ${dq(QUIZ_DESCRIPTION, "desc")}, true, 'quiz');`,
      `insert into public.questions\n  (quiz_id, question_text, options, correct_option, explanation, difficulty, sort_order, objective_id, statement_id)\nvalues\n${buildRows(data, T, "00000000-0000-0000-0000-000000000000").join(",\n")};`,
    ].join("\n");
    fs.writeFileSync(printTo, sql + "\n");
    console.log(`${TOPIC.slug}: wrote SQL to ${printTo}`);
    return;
  }

  const step = async (label, sql) => {
    try {
      return await post(sql);
    } catch (e) {
      throw new Error(`${label}: ${e.message}`);
    }
  };

  const objectivesSql = OBJECTIVES.map(
    (o, i) => `(${T}, ${q(o.code)}, ${dq(o.statement, "st")}, ${dq(o.teach, "teach")}, ${i + 1})`,
  ).join(",\n");
  await step(
    "objectives-upsert",
    `insert into public.learning_objectives (topic_id, code, statement, teach, sort_order)\nvalues\n${objectivesSql}\non conflict (topic_id, code) do update set\n  statement = excluded.statement,\n  teach = excluded.teach,\n  sort_order = excluded.sort_order;`,
  );

  await step("quiz-delete", `delete from public.quizzes\n where topic_id = ${T} and title = ${q(QUIZ_TITLE)};`);

  const inserted = JSON.parse(
    await step(
      "quiz-insert",
      `insert into public.quizzes (topic_id, title, description, is_published, exam_type)\nvalues (${T}, ${q(QUIZ_TITLE)}, ${dq(QUIZ_DESCRIPTION, "desc")}, true, 'quiz')\nreturning id;`,
    ),
  );
  const quizId = inserted[0].id;

  await step(
    "questions-insert",
    `insert into public.questions\n  (quiz_id, question_text, options, correct_option, explanation, difficulty, sort_order, objective_id, statement_id)\nvalues\n${buildRows(data, T, quizId).join(",\n")};`,
  );

  const summary = JSON.parse(
    await step(
      "summary",
      `select o.code,\n       o.sort_order,\n       length(o.teach) as teach_chars,\n       count(q.id) filter (where q.difficulty = 'check') as checks,\n       count(q.id) filter (where q.difficulty = 'exam') as exam\n  from public.learning_objectives o\n  left join public.questions q on q.objective_id = o.id\n where o.topic_id = ${T}\n group by o.code, o.sort_order, o.teach\n order by o.sort_order;`,
    ),
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

async function main() {
  const args = process.argv.slice(2);
  const pi = args.indexOf("--print");
  const printTo = pi >= 0 ? args[pi + 1] : null;
  let files;
  if (args.includes("--all")) {
    files = fs.readdirSync(DIR).filter((f) => f.endsWith(".cjs")).map((f) => path.join(DIR, f)).sort();
    if (printTo) throw new Error("--print works with a single --topic only");
  } else {
    const i = args.indexOf("--topic");
    const slug = i >= 0 ? args[i + 1] : args[0];
    if (!slug) throw new Error("usage: node .freebuff/seed-objectives-batch.cjs --topic <slug> | --all");
    files = [path.join(DIR, `${slug}.cjs`)];
  }
  for (const f of files) {
    if (!fs.existsSync(f)) throw new Error(`no data file ${f}`);
    await seedFile(f, printTo);
  }
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
