#!/usr/bin/env node
/**
 * The review gate for the objective layer: what must pass before a topic's
 * objectives are published. Rules live in docs/objectives-authoring.md.
 *
 *   node .freebuff/gate-objectives.cjs algebra-equations      # one topic
 *   node .freebuff/gate-objectives.cjs --all                  # every topic that has objectives
 *   node .freebuff/gate-objectives.cjs --self-test            # prove the rules still reject bad content
 *
 * Read-only: it never writes. Exit code is 1 when a rule the content must pass
 * fails, 0 when only warnings are left; that split is the point — an error is
 * "do not publish this", a warning is "publish it and fix this next".
 *
 * The rules exist because each one is a way content has actually gone wrong in
 * this estate, not because it is tidy:
 *
 *   error   objective with no teach block        nothing to read before the checks
 *   error   objective with no questions at all   an objective with 0 tagged
 *                                                questions can never be mastered:
 *                                                my_objective_mastery() needs
 *                                                correct >= checks, and checks
 *                                                stays 0, so the state is stuck
 *                                                however many times the student
 *                                                answers
 *   error   correct_option outside its options   the legacy 1-based seeds' signature
 *   error   a backtick in any authored text      the .cjs seeders are template
 *                                                literals; one backtick breaks the
 *                                                parse of everything after it
 *   error   U+FFFD in any authored text          a lost character, one per byte
 *   error   Extended-only objective not marked   a Core student cannot be sent
 *                                                content the board does not examine
 *   error   topic with no objectives             nothing to publish
 *   warning teach block under 900 characters     too short for a worked example
 *   warning teach block not in the five §3.1     a missing, repeated or reordered
 *           sections, once each, in order         section is not decoration: it is
 *                                                 the shape the panel and every
 *                                                 later objective are read against
 *                                                 (2.5b shipped two Method sections
 *                                                 and this rule did not exist yet)
 *   warning objective with no 'check' question   it can be mastered, but nothing
 *                                                checks it right after the teach
 *                                                block — pair every teach with one
 *   warning question without an explanation      a check that does not teach the
 *                                                correction is a quiz, not a check
 *   warning difficulty outside check/drill/exam  'medium' survives from the legacy
 *                                                bank; do not author new ones
 *   warning every correct answer at one position the checks can be passed by
 *                                                reading the option list, not by
 *                                                knowing the method. The reference
 *                                                topic used to trip this (all 12 at
 *                                                option 0); its seeded positions
 *                                                are now rotated. The rule stays
 *                                                because the next topic is one
 *                                                copy-paste away from the same flaw
 *   warning objective code naming no statement   the claim is untraceable
 *   warning statement with no objective          coverage gap, at objective level
 *
 * The self-test is the reason to trust it: a gate that has never been shown to
 * fail is decoration. It runs the same pure rules over crafted bad content and
 * asserts each violation is caught.
 */
const fs = require("fs");
const path = require("path");
const https = require("https");

const ROOT = path.join(__dirname, "..");
const TOKEN = (fs.readFileSync(path.join(__dirname, "get-keys.cjs"), "utf8").match(/sbp_[a-f0-9]+/) || [])[0];
const REF = (fs.readFileSync(path.join(ROOT, ".env"), "utf8").match(/VITE_SUPABASE_PROJECT_ID\s*=\s*"?([\w-]+)"?/) || [])[1];

const REPLACEMENT = "\uFFFD";
const DIFFICULTIES = ["check", "drill", "exam"];
const MIN_TEACH_CHARS = 900;
const MIN_EXPLANATION_CHARS = 40;
const A_STAR_EXAM_QUESTIONS = 5; // matches public.syllabus_coverage()
const POSITION_SAMPLE = 4; // fewer than this and one position proves nothing
/** §3.1's five sections, in the order the teaching shape depends on. */
const TEACH_HEADINGS = ["What is being asked", "Method", "Worked example", "Traps", "Timing"];

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
          res.statusCode >= 300 ? reject(new Error(`${res.statusCode} ${out.slice(0, 400)}`)) : resolve(out),
        );
      },
    );
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

const readBodies = (text) => (Array.isArray(text) ? text : [String(text ?? "")]).filter((t) => typeof t === "string");

/** "0580 2.5a" -> { board: "0580", code: "2.5" }; "0580 E1.18" -> code "1.18". */
function parseObjectiveCode(code) {
  const match = String(code ?? "").match(/(\d{4})\s+([A-Za-z]?)(\d+(?:\.\d+)?)/);
  if (!match) return null;
  return { board: match[1], code: match[3] };
}

/**
 * §3.1's shape, executable: the five sections, exactly once each, in that order.
 *
 * This exists because the reference topic shipped `### Method: elimination` *and*
 * `### Method: substitution` on 2.5b — six sections where the standard says five —
 * and the gate passed it clean. A heading is not decoration: it is the contract the
 * panel and every later objective are read against, so a heading that is missing,
 * duplicated or reordered is reported by name rather than left to a reviewer.
 *
 * Returns the problem as a sentence, or null when the shape is right.
 */
function teachHeadingProblem(teach) {
  const position = (title) => {
    const lower = title.toLowerCase();
    return TEACH_HEADINGS.findIndex((h) => lower === h.toLowerCase() || lower.startsWith(`${h.toLowerCase()}:`));
  };
  const found = String(teach ?? "")
    .split("\n")
    .filter((line) => line.startsWith("### "))
    .map((line) => line.slice(4).trim());

  const unexpected = found.find((title) => position(title) === -1);
  if (unexpected) return `unexpected section "${unexpected}"`;

  const indexes = found.map(position);
  const duplicated = TEACH_HEADINGS.filter((_, i) => indexes.filter((index) => index === i).length > 1);
  if (duplicated.length) return `"${duplicated[0]}" appears more than once`;

  const missing = TEACH_HEADINGS.filter((_, i) => !indexes.includes(i));
  if (missing.length) return `missing section(s): ${missing.join(", ")}`;

  if (indexes.some((index, i) => index !== i)) {
    return `sections out of order (found: ${found.join(" / ")})`;
  }
  return null;
}

/**
 * The rules, as a pure function over plain rows — so the self-test can feed it
 * content the database would never accept and check it is still refused.
 */
function audit({ slug, objectives = [], questions = [], statements = [], techniqueMaterials = 0 }) {
  const findings = [];
  const add = (severity, rule, subject, detail) => findings.push({ severity, rule, subject, detail });
  const short = (t, n = 48) => String(t ?? "").replace(/\s+/g, " ").slice(0, n);

  if (!objectives.length) {
    add("error", "topic_no_objectives", slug, "no objectives yet — nothing to publish");
  }

  const taggedByObjective = new Map();
  const checksByObjective = new Map();
  for (const q of questions) {
    if (!q.objective_id) continue;
    taggedByObjective.set(q.objective_id, (taggedByObjective.get(q.objective_id) ?? 0) + 1);
    if (q.difficulty === "check") {
      checksByObjective.set(q.objective_id, (checksByObjective.get(q.objective_id) ?? 0) + 1);
    }
  }

  const statementTier = new Map(statements.map((s) => [s.code, s.tier]));
  const referencedStatements = new Set();

  for (const o of objectives) {
    const teach = o.teach ?? "";
    if (!teach.trim()) {
      add("error", "objective_no_teach", o.code, "no teach block");
    } else if (teach.trim().length < MIN_TEACH_CHARS) {
      add("warning", "objective_thin_teach", o.code, `${teach.trim().length} chars (want ≥ ${MIN_TEACH_CHARS})`);
    }
    if (teach.trim()) {
      const headingProblem = teachHeadingProblem(teach);
      if (headingProblem) {
        add("warning", "teach_headings_wrong", o.code, `${headingProblem} — §3.1's five sections, once each, in order`);
      }
    }
    if (teach.includes("`")) {
      add("error", "text_has_backtick", o.code, "backtick in the teach block — it breaks the seeder's template literal");
    }
    if (teach.includes(REPLACEMENT) || String(o.statement ?? "").includes(REPLACEMENT)) {
      add("error", "text_has_replacement_char", o.code, "U+FFFD in the objective text");
    }
    if (!(taggedByObjective.get(o.id) > 0)) {
      add("error", "objective_no_questions", o.code, "no question tagged to it — checks stays 0, so it can never be mastered");
    } else if (!(checksByObjective.get(o.id) > 0)) {
      add("warning", "objective_without_check", o.code, "tagged questions but no 'check' tier — nothing checks the teach block");
    }

    const parsed = parseObjectiveCode(o.code);
    if (!parsed) {
      add("warning", "objective_code_unparsable", o.code, "does not name a board code");
      continue;
    }
    if (!statementTier.has(parsed.code)) {
      add("warning", "objective_code_not_a_statement", o.code, `no syllabus statement ${parsed.board} ${parsed.code} on this topic`);
      continue;
    }
    referencedStatements.add(parsed.code);
    const tier = statementTier.get(parsed.code);
    const marked = /\(extended only\)/i.test(String(o.statement ?? ""));
    if (tier === "extended" && !marked) {
      add("error", "extended_only_unmarked", o.code, "statement is Extended-only but the objective does not say so");
    }
    if (tier === "core" && marked) {
      add("error", "core_marked_extended", o.code, "statement is Core-only but the objective says Extended only");
    }
  }

  for (const s of statements) {
    if (!referencedStatements.has(s.code)) {
      add("warning", "statement_without_objective", s.code, `${s.tier} statement has no objective yet`);
    }
  }

  for (const q of questions) {
    const options = Array.isArray(q.options) ? q.options : [];
    if (!(Number.isInteger(q.correct_option) && q.correct_option >= 0 && q.correct_option < options.length)) {
      add("error", "answer_index_out_of_range", short(q.question_text), `correct_option ${q.correct_option} of ${options.length} options`);
    }
    if ((q.explanation ?? "").trim().length < MIN_EXPLANATION_CHARS) {
      add("warning", "question_without_explanation", short(q.question_text), `${(q.explanation ?? "").trim().length} chars`);
    }
    if (!DIFFICULTIES.includes(q.difficulty)) {
      add("warning", "difficulty_outside_vocabulary", short(q.question_text), `difficulty '${q.difficulty}'`);
    }
    const bodies = [...readBodies(q.question_text), ...options.map((o) => String(o))];
    if (bodies.some((t) => t.includes("`"))) {
      add("error", "text_has_backtick", short(q.question_text), "backtick in the question or its options");
    }
    if (bodies.some((t) => t.includes(REPLACEMENT))) {
      add("error", "text_has_replacement_char", short(q.question_text), "U+FFFD in the question or its options");
    }
  }

  // The answer key must not be guessable from the position of the right option:
  // if every correct answer sits at the same index, a student can pass the checks
  // without knowing the method, and the mastery state stops meaning anything.
  if (questions.length >= POSITION_SAMPLE) {
    const positions = new Set(questions.map((q) => q.correct_option));
    if (positions.size === 1) {
      add("warning", "answer_position_fixed", slug, `all ${questions.length} correct answers sit at option ${[...positions][0]}`);
    }
  }

  return findings;
}

/** The counts the report cares about, computed from the same rows. */
function summarise({ objectives = [], questions = [], statements = [], techniqueMaterials = 0 }) {
  const byDifficulty = {};
  for (const q of questions) byDifficulty[q.difficulty] = (byDifficulty[q.difficulty] ?? 0) + 1;
  const exam = byDifficulty.exam ?? 0;
  return {
    objectives: objectives.length,
    statements: statements.length,
    taggedQuestions: questions.length,
    byDifficulty,
    // The A* claim is a separate gate (syllabus_coverage()); it is reported here
    // so an author sees how far the topic is from it, not as a publish blocker.
    aStarReady: exam >= A_STAR_EXAM_QUESTIONS && techniqueMaterials >= 1,
    aStar: `${exam} of ${A_STAR_EXAM_QUESTIONS} exam questions, ${techniqueMaterials} exam-technique material(s)`,
  };
}

// ------------------------------------------------------------------ live mode

const q = (s) => `'${String(s).replace(/'/g, "''")}'`;

async function fetchTopic(slug) {
  const [topic] = JSON.parse(
    await post(`select t.id, t.slug, t.name, s.slug as subject, sl.level::text as level
  from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
 where t.slug = ${q(slug)}
 limit 1`),
  );
  if (!topic) throw new Error(`no topic with slug ${slug}`);

  const objectives = JSON.parse(
    await post(`select o.id, o.code, o.statement, o.teach, o.sort_order
  from public.learning_objectives o
 where o.topic_id = ${q(topic.id)}
 order by o.sort_order`),
  );
  const questions = JSON.parse(
    await post(`select q.id, q.objective_id, q.difficulty, q.question_text, q.options, q.correct_option,
       coalesce(q.explanation, '') as explanation
  from public.questions q
  join public.quizzes z on z.id = q.quiz_id
 where z.topic_id = ${q(topic.id)} and q.objective_id is not null
 order by q.sort_order`),
  );
  const statements = JSON.parse(
    await post(`select st.code, st.tier from public.syllabus_statements st where st.topic_id = ${q(topic.id)}`),
  );
  const [{ technique_materials }] = JSON.parse(
    await post(`select count(*)::int as technique_materials from public.study_materials m
 where m.topic_id = ${q(topic.id)}
   and lower(replace(coalesce(m.material_type, ''), '_', '-')) = 'exam-technique'`),
  );
  return { slug: topic.slug, name: topic.name, subject: topic.subject, level: topic.level, objectives, questions, statements, techniqueMaterials: technique_materials };
}

function printReport(topic, findings) {
  const summary = summarise(topic);
  console.log(`\n=== ${topic.name} (${topic.subject} ${topic.level}, ${topic.slug})`);
  console.log(
    `    ${summary.objectives} objectives · ${summary.statements} statements · ${summary.taggedQuestions} tagged questions ` +
      `(${Object.entries(summary.byDifficulty).map(([d, n]) => `${d} ${n}`).join(", ") || "none"})`,
  );
  console.log(`    A* layer: ${summary.aStar}`);
  for (const f of findings) {
    console.log(`${f.severity === "error" ? "ERROR" : "WARN "} ${f.rule} · ${f.subject} — ${f.detail}`);
  }
  if (!findings.length) console.log("    clean: no findings");
}

async function liveMode(args) {
  const slugs = args.includes("--all")
    ? JSON.parse(
        await post(`select t.slug from public.topics t
 where exists (select 1 from public.learning_objectives o where o.topic_id = t.id)
 order by t.slug`),
      ).map((r) => r.slug)
    : [args[0]];

  if (!slugs.length) throw new Error("no topic with objectives — pass a slug or run --all");

  let errors = 0;
  let warnings = 0;
  for (const slug of slugs) {
    const topic = await fetchTopic(slug);
    const findings = audit(topic);
    printReport(topic, findings);
    errors += findings.filter((f) => f.severity === "error").length;
    warnings += findings.filter((f) => f.severity === "warning").length;
  }

  console.log(
    errors
      ? `\nGATE FAILED — ${errors} error(s), ${warnings} warning(s). Do not publish until the errors are fixed.`
      : `\nGATE PASSED — 0 errors, ${warnings} warning(s).`,
  );
  process.exit(errors ? 1 : 0);
}

// ------------------------------------------------------------------ self-test

/** A question tagged to o1 that would be clean on its own. */
const goodQuestion = (over = {}) => ({
  id: "q1",
  objective_id: "o1",
  difficulty: "check",
  question_text: "Solve 5x - 7 = 2x + 11.",
  options: ["x = 6", "x = 4", "x = 3", "x = 18"],
  correct_option: 0,
  explanation: "y".repeat(60),
  ...over,
});

/**
 * A teach block in §3.1's shape and long enough to clear the thin-teach warning,
 * so the "well-formed topic is clean" case is genuinely clean. The filler is
 * per-section so a case can still trim one section without shortening another.
 */
const GOOD_TEACH = [
  "### What is being asked",
  "a".repeat(200),
  "",
  "### Method",
  `1. ${"b".repeat(200)}`,
  "",
  "### Worked example",
  "c".repeat(200),
  "",
  "### Traps",
  `- ${"d".repeat(200)}`,
  "",
  "### Timing",
  "e".repeat(200),
].join("\n");

function fixture(over = {}) {
  return {
    slug: "fixture-topic",
    objectives: [
      {
        id: "o1",
        code: "0580 2.5a",
        statement: "Solve a linear equation in one unknown",
        teach: GOOD_TEACH,
        sort_order: 1,
      },
    ],
    questions: [goodQuestion()],
    statements: [{ code: "2.5", tier: "both" }],
    techniqueMaterials: 0,
    ...over,
  };
}

const rulesSeen = (findings) => new Set(findings.map((f) => f.rule));

function selfTest() {
  const cases = [
    ["a well-formed topic is clean", fixture(), [], []],
    [
      "an objective with no questions at all is refused",
      fixture({ questions: [] }),
      ["objective_no_questions"],
      [],
    ],
    [
      "an objective with only exam questions warns about the missing check",
      fixture({ questions: [goodQuestion({ difficulty: "exam" })] }),
      [],
      ["objective_without_check"],
    ],
    [
      "correct_option outside the options is refused",
      fixture({ questions: [goodQuestion({ correct_option: 4 })] }),
      ["answer_index_out_of_range"],
      [],
    ],
    [
      "a backtick in the teach block is refused",
      fixture({ objectives: [{ ...fixture().objectives[0], teach: GOOD_TEACH + "`code`" }] }),
      ["text_has_backtick"],
      [],
    ],
    [
      "a second Method heading warns — §3.1 is one section per heading, which 2.5b broke",
      fixture({
        objectives: [
          { ...fixture().objectives[0], teach: GOOD_TEACH.replace("### Timing", "### Method: substitution\n1. c\n\n### Timing") },
        ],
      }),
      [],
      ["teach_headings_wrong"],
    ],
    [
      "teach sections out of order warn",
      fixture({
        objectives: [
          {
            ...fixture().objectives[0],
            teach: [
              "### What is being asked",
              "a".repeat(200),
              "",
              "### Worked example",
              "c".repeat(200),
              "",
              "### Method",
              `1. ${"b".repeat(200)}`,
              "",
              "### Traps",
              `- ${"d".repeat(200)}`,
              "",
              "### Timing",
              "e".repeat(200),
            ].join("\n"),
          },
        ],
      }),
      [],
      ["teach_headings_wrong"],
    ],
    [
      "a replacement character in an option is refused",
      fixture({ questions: [goodQuestion({ options: ["x = 6\uFFFD", "x = 4"] })] }),
      ["text_has_replacement_char"],
      [],
    ],
    [
      "an Extended-only objective must say so",
      fixture({
        statements: [{ code: "2.5", tier: "extended" }],
        objectives: [{ ...fixture().objectives[0], id: "o1" }],
      }),
      ["extended_only_unmarked"],
      [],
    ],
    [
      "marking a Core-only statement Extended is refused",
      fixture({
        statements: [{ code: "2.5", tier: "core" }],
        objectives: [{ ...fixture().objectives[0], statement: "Solve it (Extended only)" }],
      }),
      ["core_marked_extended"],
      [],
    ],
    [
      "a topic with no objectives is refused",
      fixture({ objectives: [], questions: [], statements: [] }),
      ["topic_no_objectives"],
      [],
    ],
    [
      "a thin teach block warns but does not block",
      fixture({ objectives: [{ ...fixture().objectives[0], teach: "short" }] }),
      [],
      ["objective_thin_teach"],
    ],
    [
      "legacy 'medium' warns but does not block",
      fixture({ questions: [goodQuestion({ difficulty: "medium" })] }),
      [],
      ["difficulty_outside_vocabulary", "objective_without_check"],
    ],
    [
      "a question with a one-line explanation warns",
      fixture({ questions: [goodQuestion({ explanation: "It is x = 6." })] }),
      [],
      ["question_without_explanation"],
    ],
    [
      "every correct answer at one position warns — the checks would be guessable",
      fixture({
        questions: [0, 1, 2, 3].map((n) => goodQuestion({ id: `q${n}`, question_text: `Solve ${n}x = ${n}.` })),
      }),
      [],
      ["answer_position_fixed"],
    ],
    [
      "an objective naming a statement that is not on the topic warns",
      fixture({ objectives: [{ ...fixture().objectives[0], code: "0580 9.9a" }] }),
      [],
      ["objective_code_not_a_statement", "statement_without_objective"],
    ],
    [
      "a statement with no objective warns",
      fixture({ statements: [{ code: "2.5", tier: "both" }, { code: "2.6", tier: "both" }] }),
      [],
      ["statement_without_objective"],
    ],
  ];

  let failures = 0;
  for (const [label, input, expectedErrors, expectedWarnings] of cases) {
    const findings = audit(input);
    const errors = findings.filter((f) => f.severity === "error");
    const warnings = findings.filter((f) => f.severity === "warning");
    const seen = rulesSeen(findings);
    const missingErrors = expectedErrors.filter((r) => !errors.some((e) => e.rule === r));
    const missingWarnings = expectedWarnings.filter((r) => !warnings.some((w) => w.rule === r));
    const unexpectedErrors = errors.filter((e) => !expectedErrors.includes(e.rule)).map((e) => e.rule);
    const ok = !missingErrors.length && !missingWarnings.length && !unexpectedErrors.length;
    if (!ok) failures += 1;
    console.log(
      `${ok ? "PASS" : "FAIL"}  ${label}` +
        (ok
          ? ` — ${errors.length} error(s), ${warnings.length} warning(s)`
          : ` — missing errors [${missingErrors}], missing warnings [${missingWarnings}], unexpected [${unexpectedErrors}], saw [${[...seen].sort()}]`),
    );
  }
  console.log(failures ? `\n${failures} self-test case(s) failed` : "\nself-test passed: every rule still rejects what it is for");
  process.exit(failures ? 1 : 0);
}

// ----------------------------------------------------------------------- main

const args = process.argv.slice(2);
if (args.includes("--self-test")) {
  selfTest();
} else if (!args.length) {
  console.error("usage: node .freebuff/gate-objectives.cjs <topic-slug> | --all | --self-test");
  process.exit(2);
} else {
  liveMode(args).catch((e) => {
    console.error(e.message);
    process.exit(1);
  });
}
