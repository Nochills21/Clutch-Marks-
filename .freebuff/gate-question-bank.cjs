#!/usr/bin/env node
/**
 * The question-bank bar, as a check rather than an opinion.
 *
 *   node .freebuff/gate-question-bank.cjs chemistry-oxfordaqa IGCSE
 *   node .freebuff/gate-question-bank.cjs chemistry-oxfordaqa IGCSE --strict
 *   node .freebuff/gate-question-bank.cjs --self-test
 *
 * What it protects, and why each rule exists:
 *
 *  - **Every question is linked to a statement of its own topic.** A null
 *    `statement_id` silently hides a question from syllabus_coverage(), which is
 *    how the 0620 banks read as uncovered for months. A statement id from
 *    *another* topic is worse than a null one, because it inflates a topic that
 *    does not contain the question.
 *  - **Every statement has at least one question.** A topic can be "covered" by
 *    a bank that tests only one of its four subsections; this is the rule that
 *    catches that.
 *  - **`correct_option` points at a real option**, and the four options are
 *    distinct. The legacy 1-based seeds put `correct_option` 4 on a 4-option
 *    question, which cannot index anything.
 *  - **The key is spread.** If the answer sits at index 0 for more than 45% of
 *    the bank, the bank can be scored without reading it.
 *  - **No damaged text.** U+FFFD, markup and a missing explanation all reach a
 *    student, and a CHECK constraint only covers the tables that have one.
 *  - **No "all of the above" / "none of the above"**, which turn a four-option
 *    item into a two-option one and reward test technique over knowledge.
 *
 * Read-only: it never writes. --self-test runs the same check() against
 * fixtures, one rule broken at a time, and fails if a rule stops biting.
 */
const fs = require("node:fs");
const path = require("node:path");
const https = require("node:https");

const REF = "zzliiazovezhxbmfeqco";
const TOKEN = (fs.readFileSync(path.join(__dirname, "get-keys.cjs"), "utf8").match(/sbp_[a-f0-9]+/) || [])[0];

const BAR = {
  minPerTopic: 12,
  minExplanation: 40,
  keyShareMax: 0.45,
  tiers: ["check", "drill", "exam"],
};

const argv = process.argv.slice(2);
const strict = argv.includes("--strict");
const selfTest = argv.includes("--self-test");
const [subjectArg = "chemistry-oxfordaqa", levelArg = "IGCSE"] = argv.filter((a) => !a.startsWith("--"));

function query(sql) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({ query: sql });
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
            reject(new Error(`bad JSON: ${out.slice(0, 200)}`));
          }
        });
      },
    );
    req.on("error", reject);
    req.write(payload);
    req.end();
  });
}

/* ── the check ───────────────────────────────────────────────────────────── */

const norm = (s) => String(s || "").trim().toLowerCase().replace(/\s+/g, " ");
const textOf = (html) =>
  String(html || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/**
 * bank = {
 *   topics: [{ slug, name, statements: [{ code }] }],
 *   quizzes: [{ id, title, topic, published }],
 *   questions: [{ id, topic, statement, quiz, stem, options, correct, explanation, difficulty }]
 * }
 * Returns { ok, reasons[], stats }.
 */
function check(bank, bar = BAR) {
  const reasons = [];
  const topics = bank.topics || [];
  const questions = bank.questions || [];
  const quizzes = bank.quizzes || [];
  const byTopic = new Map(topics.map((t) => [t.slug, []]));
  for (const q of questions) {
    if (!byTopic.has(q.topic)) byTopic.set(q.topic, []);
    byTopic.get(q.topic).push(q);
  }

  for (const t of topics) {
    const qs = byTopic.get(t.slug) || [];
    const published = quizzes.filter((z) => z.topic === t.slug && z.published);
    if (!published.length) reasons.push(`${t.slug}: no published quiz`);
    if (qs.length < bar.minPerTopic) reasons.push(`${t.slug}: ${qs.length} questions < ${bar.minPerTopic}`);
    const tiers = new Set(qs.map((q) => q.difficulty));
    for (const tier of bar.tiers) if (!tiers.has(tier)) reasons.push(`${t.slug}: no ${tier} questions`);
    const covered = new Set(qs.map((q) => q.statement).filter(Boolean));
    const missing = (t.statements || []).map((s) => s.code).filter((c) => !covered.has(c));
    if (missing.length) reasons.push(`${t.slug}: ${missing.length} statement(s) untested (${missing.slice(0, 3).join(", ")})`);
  }

  const stems = new Map();
  for (const q of questions) {
    const where = `${q.topic} "${String(q.stem || "").slice(0, 40)}"`;
    const opts = Array.isArray(q.options) ? q.options : (() => {
      try {
        return JSON.parse(q.options || "[]");
      } catch {
        return [];
      }
    })();
    if (opts.length !== 4) reasons.push(`${where}: ${opts.length} options, need 4`);
    else {
      if (opts.some((o) => !String(o || "").trim())) reasons.push(`${where}: empty option`);
      if (new Set(opts.map(norm)).size !== 4) reasons.push(`${where}: duplicate options`);
      for (const o of opts) {
        if (/^(all|none) of (the )?above/i.test(String(o).trim())) reasons.push(`${where}: "${o}" is a technique answer`);
      }
    }
    if (!Number.isInteger(q.correct) || q.correct < 0 || q.correct > 3) {
      reasons.push(`${where}: correct_option ${JSON.stringify(q.correct)} cannot point at an option`);
    }
    if (!q.statement) reasons.push(`${where}: no statement_id`);
    const codes = new Set((topics.find((t) => t.slug === q.topic)?.statements || []).map((s) => s.code));
    if (q.statement && codes.size && !codes.has(q.statement)) {
      reasons.push(`${where}: statement ${q.statement} belongs to another topic`);
    }
    const explanation = textOf(q.explanation);
    if (explanation.length < bar.minExplanation) reasons.push(`${where}: explanation ${explanation.length} < ${bar.minExplanation}`);
    for (const field of [q.stem, q.explanation, ...opts]) {
      const value = String(field || "");
      if (value.includes("\uFFFD")) reasons.push(`${where}: contains U+FFFD`);
      if (/<\/?[a-z][^>]*>/i.test(value)) reasons.push(`${where}: contains markup`);
    }
    const key = norm(q.stem);
    if (key) {
      if (stems.has(key)) reasons.push(`${where}: duplicate stem of ${stems.get(key)}`);
      else stems.set(key, where);
    }
  }

  const total = questions.length;
  const keys = [0, 0, 0, 0];
  for (const q of questions) if (Number.isInteger(q.correct) && q.correct >= 0 && q.correct <= 3) keys[q.correct]++;
  if (total) {
    for (const [index, count] of keys.entries()) {
      if (count / total > bar.keyShareMax) {
        reasons.push(`answer key at index ${index} for ${count}/${total} questions (> ${Math.round(bar.keyShareMax * 100)}%)`);
      }
    }
  }

  return {
    ok: reasons.length === 0,
    reasons,
    stats: {
      topics: topics.length,
      questions: total,
      statements: topics.reduce((n, t) => n + (t.statements || []).length, 0),
      keys,
    },
  };
}

/* ── self-test ───────────────────────────────────────────────────────────── */

function fixture() {
  const topics = [
    {
      slug: "topic-a",
      name: "Topic A",
      statements: [{ code: "1.1.1" }, { code: "1.1.2" }],
    },
  ];
  const quizzes = [{ id: "z1", title: "Topic A — Topic Questions", topic: "topic-a", published: true }];
  const questions = [];
  for (let i = 0; i < 12; i++) {
    questions.push({
      id: `q${i}`,
      topic: "topic-a",
      statement: i < 6 ? "1.1.1" : "1.1.2",
      quiz: "z1",
      stem: `Distinct question number ${i + 1} about a chemical idea that is specific enough`,
      options: [`Option ${i}-A`, `Option ${i}-B`, `Option ${i}-C`, `Option ${i}-D`],
      correct: i % 4,
      explanation: `Explanation number ${i + 1} says why the answer is right and why the others are wrong.`,
      difficulty: ["check", "drill", "exam"][i % 3],
    });
  }
  return { topics, quizzes, questions };
}

function runSelfTest() {
  const base = fixture();
  const clone = () => JSON.parse(JSON.stringify(base));
  const cases = [
    ["passes unmodified", base, true, null],
    [
      "unlinked question",
      (() => {
        const b = clone();
        b.questions[3].statement = null;
        return b;
      })(),
      false,
      /no statement_id/,
    ],
    [
      "statement from another topic",
      (() => {
        const b = clone();
        b.questions[2].statement = "9.9.9";
        return b;
      })(),
      false,
      /belongs to another topic/,
    ],
    [
      "untested statement",
      (() => {
        const b = clone();
        b.topics[0].statements.push({ code: "1.1.3" });
        return b;
      })(),
      false,
      /statement\(s\) untested/,
    ],
    [
      "correct_option off the end",
      (() => {
        const b = clone();
        b.questions[0].correct = 4;
        return b;
      })(),
      false,
      /cannot point at an option/,
    ],
    [
      "three options",
      (() => {
        const b = clone();
        b.questions[1].options.pop();
        return b;
      })(),
      false,
      /3 options, need 4/,
    ],
    [
      "duplicate options",
      (() => {
        const b = clone();
        b.questions[4].options[1] = b.questions[4].options[0];
        return b;
      })(),
      false,
      /duplicate options/,
    ],
    [
      "technique answer",
      (() => {
        const b = clone();
        b.questions[5].options[3] = "All of the above";
        return b;
      })(),
      false,
      /technique answer/,
    ],
    [
      "no explanation",
      (() => {
        const b = clone();
        b.questions[6].explanation = "Because.";
        return b;
      })(),
      false,
      /explanation \d+ < 40/,
    ],
    [
      "damaged character",
      (() => {
        const b = clone();
        b.questions[7].stem += " \uFFFD";
        return b;
      })(),
      false,
      /U\+FFFD/,
    ],
    [
      "markup in a stem",
      (() => {
        const b = clone();
        b.questions[8].stem += " <b>bold</b>";
        return b;
      })(),
      false,
      /contains markup/,
    ],
    [
      "duplicate stem",
      (() => {
        const b = clone();
        b.questions[9].stem = b.questions[0].stem;
        return b;
      })(),
      false,
      /duplicate stem/,
    ],
    [
      "missing tier",
      (() => {
        const b = clone();
        for (const q of b.questions) if (q.difficulty === "exam") q.difficulty = "drill";
        return b;
      })(),
      false,
      /no exam questions/,
    ],
    [
      "too few questions",
      (() => {
        const b = clone();
        b.questions = b.questions.slice(0, 8);
        return b;
      })(),
      false,
      /\d+ questions < 12/,
    ],
    [
      "no published quiz",
      (() => {
        const b = clone();
        b.quizzes[0].published = false;
        return b;
      })(),
      false,
      /no published quiz/,
    ],
    [
      "answer key piled on one index",
      (() => {
        const b = clone();
        for (const q of b.questions) q.correct = 0;
        return b;
      })(),
      false,
      /answer key at index 0/,
    ],
  ];

  let failed = 0;
  for (const [name, bank, expected, pattern] of cases) {
    const result = check(bank);
    const reasonOk = pattern ? result.reasons.some((r) => pattern.test(r)) : true;
    const pass = result.ok === expected && reasonOk;
    if (!pass) {
      failed++;
      console.log(`FAIL ${name} — expected ok=${expected}, got ok=${result.ok}${pattern ? `, reasons: ${result.reasons.join(" | ")}` : ""}`);
    } else {
      console.log(`ok   ${name}`);
    }
  }
  console.log(`\n${cases.length - failed}/${cases.length} self-test cases behaved correctly`);
  if (failed) process.exit(1);
}

/* ── live run ────────────────────────────────────────────────────────────── */

async function main() {
  if (selfTest) return runSelfTest();

  const topicRows = await query(`select t.slug, t.name, t.sort_order, s.code
    from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects su on su.id = sl.subject_id
    left join public.syllabus_statements s on s.topic_id = t.id
    where su.slug = '${subjectArg.replace(/'/g, "''")}' and sl.level = '${levelArg.replace(/'/g, "''")}'
    order by t.sort_order, s.sort_order`);

  const topics = [];
  for (const row of topicRows) {
    let topic = topics.find((t) => t.slug === row.slug);
    if (!topic) topics.push((topic = { slug: row.slug, name: row.name, statements: [] }));
    if (row.code && !topic.statements.some((s) => s.code === row.code)) topic.statements.push({ code: row.code });
  }

  const quizRows = await query(`select z.id, z.title, t.slug as topic, z.is_published as published,
      count(q.id) as questions
    from public.quizzes z
    join public.topics t on t.id = z.topic_id
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects su on su.id = sl.subject_id
    left join public.questions q on q.quiz_id = z.id
    where su.slug = '${subjectArg.replace(/'/g, "''")}' and sl.level = '${levelArg.replace(/'/g, "''")}'
    group by z.id, z.title, t.slug, z.is_published
    order by t.slug, z.title`);

  const questionRows = await query(`select q.id, q.question_text as stem, q.options::text as options,
      q.correct_option as correct, q.explanation, q.difficulty, s.code as statement,
      t.slug as topic, q.quiz_id as quiz
    from public.questions q
    join public.quizzes z on z.id = q.quiz_id
    join public.topics t on t.id = z.topic_id
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects su on su.id = sl.subject_id
    left join public.syllabus_statements s on s.id = q.statement_id
    where su.slug = '${subjectArg.replace(/'/g, "''")}' and sl.level = '${levelArg.replace(/'/g, "''")}'
    order by t.sort_order, q.sort_order`);

  const questions = questionRows.map((q) => {
    let options = q.options;
    try {
      options = JSON.parse(q.options);
    } catch {
      /* leave as-is; the check reports it */
    }
    return { ...q, options };
  });

  const bank = { topics, quizzes: quizRows, questions };
  const result = check(bank);

  console.log("");
  for (const topic of topics) {
    const mine = questions.filter((q) => q.topic === topic.slug);
    const codes = new Set(mine.map((q) => q.statement).filter(Boolean));
    const tiers = new Set(mine.map((q) => q.difficulty));
    const unpublished = quizRows.filter((z) => z.topic === topic.slug && !z.published).length;
    console.log(
      `${topic.slug.padEnd(46)} ${String(mine.length).padStart(3)} q · ` +
        `${codes.size}/${topic.statements.length} statements · ${tiers.size}/3 tiers` +
        (unpublished ? ` · ${unpublished} unpublished quiz` : ""),
    );
  }
  console.log("");
  console.log(`${result.stats.questions} questions · ${result.stats.statements} statements · key spread ${result.stats.keys.join("/")}`);

  if (result.ok) {
    console.log(`\n${subjectArg} ${levelArg}: the question bank clears every rule`);
    return;
  }
  console.log(`\n${result.reasons.length} finding(s):`);
  for (const reason of result.reasons) console.log("  - " + reason);
  if (strict) process.exit(1);
}

main().catch((e) => {
  console.error("FAIL", e.message);
  process.exit(1);
});
