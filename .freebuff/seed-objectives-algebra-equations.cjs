#!/usr/bin/env node
/**
 * The objective layer's reference topic: IGCSE Mathematics OL, `algebra-equations`
 * (CAIE 0580 statement 2.5 Equations).
 *
 *   node .freebuff/seed-objectives-algebra-equations.cjs            # write it
 *   node .freebuff/seed-objectives-algebra-equations.cjs --dry      # print counts only
 *
 * This is the one topic built by hand end to end, so the *shape* of the objective
 * layer can be reviewed before it is rolled out to the other 99 topics:
 *
 *   learning_objectives        5 rows — one per thing a student must be able to do
 *                              inside 2.5, each with its own `teach` micro-lesson
 *   quizzes                    one "Checkpoints" quiz, kept apart from the topic's
 *                              own quiz so nothing existing changes underneath it
 *   questions                  difficulty 'check' — one short set per objective,
 *                              carrying `objective_id` so a wrong answer names the
 *                              objective to revisit
 *                              difficulty 'exam' — two past-paper-style questions
 *                              with the marks-as-awarded reasoning, to show what
 *                              the top tier of the same column looks like
 *
 * Why a separate quiz: the mastery RPC aggregates every question of the topic's
 * quizzes by objective, so a checkpoint set needs no new table — and keeping it in
 * its own quiz means the two existing student-facing quizzes ("Solving Equations",
 * "Practice — Algebra — Equations") are untouched.
 *
 * `correct_option` is 0-based and the position is **rotated** across the set — a
 * run of right answers at the same index makes the checks guessable without the
 * method, which is what the gate's `answer_position_fixed` warning is about. Keep
 * that rotation when editing a check: move the correct option, do not just edit
 * its text.
 *
 * Idempotent per run: the checkpoint quiz is deleted and rebuilt (its questions
 * cascade), and objectives are upserted on (topic_id, code). Ordered statements,
 * each in its own transaction — a failure after the delete leaves the topic with
 * no checkpoint quiz, which the next run repairs.
 */
const fs = require("fs");
const path = require("path");
const https = require("https");

const REF = "zzliiazovezhxbmfeqco";
const TOKEN = (fs.readFileSync(path.join(__dirname, "get-keys.cjs"), "utf8").match(/sbp_[a-f0-9]+/) || [])[0];

const TOPIC = { subject: "mathematics", level: "OL", slug: "algebra-equations" };
const QUIZ_TITLE = "Checkpoints — Algebra — Equations";
const QUIZ_DESCRIPTION =
  "Short checks, one set per objective in this topic. Answer one wrongly and the objective it belongs to is the thing to revisit — not the whole topic.";
/** The board statement every objective below sits in. */
const STATEMENT = "0580 2.5 Equations";

/**
 * `\\(` in this file is a markdown-escaped parenthesis for the app's maths
 * renderer, not a backslash the database should keep — the strings below are
 * template literals, so a double backslash is what produces a single one.
 * No backticks anywhere: this file's content is a template literal.
 */
const OBJECTIVES = [
  {
    code: "0580 2.5a",
    statement: "Solve a linear equation in one unknown, including equations with brackets and fractions.",
    teach: `### What is being asked
Solve a linear equation means: find the value of the unknown that makes the two sides equal. The answer is a number (or a simple fraction), not an expression.

### Method
1. Remove brackets by multiplying out.
2. If there are fractions, multiply **every** term by the lowest common multiple of the denominators. The fractions disappear in one step; there is no need to handle them one at a time.
3. Collect the unknown terms on one side and the numbers on the other. Whatever you do to one side, do to the other.
4. Divide by the coefficient of the unknown.
5. **Check** by substituting your answer back into the **original** equation — with fractions that is where sign slips show up.

### Worked example
Solve \\(\\frac{x}{3} + \\frac{x-1}{2} = 4\\).
Multiply every term by 6: \\(2x + 3(x-1) = 24\\), so \\(5x - 3 = 24\\), \\(5x = 27\\), \\(x = 5.4\\).
Check: \\(5.4/3 = 1.8\\) and \\(4.4/2 = 2.2\\), and \\(1.8 + 2.2 = 4\\). Correct.

### Traps
- Multiplying only the terms that contain the unknown when clearing fractions. Every term, including the number on the right.
- Losing a sign when a bracket is subtracted: \\(-(2x - 5)\\) is \\(-2x + 5\\).
- Stopping at \\(5x = 27\\). The question wants \\(x\\), so divide.
- Giving the answer as a fraction when the question says give your answer to 2 decimal places, or the other way round.

### Timing
Paper 2: about 2 minutes, 2-3 marks. Paper 4: often the first line of a longer question, so a slip here costs the marks that follow.`,
    checks: [
      {
        q: "Solve 5x - 7 = 2x + 11.",
        options: ["x = 4", "x = 6", "x = 3", "x = 18"],
        correct: 1,
        explanation:
          "Subtract 2x from both sides: 3x - 7 = 11. Add 7: 3x = 18. Divide by 3: x = 6. Check: 5(6) - 7 = 23 and 2(6) + 11 = 23.",
      },
      {
        q: "Solve 3(x - 2)/4 = 6.",
        options: ["x = 8", "x = 12", "x = 10", "x = 6"],
        correct: 2,
        explanation:
          "Multiply both sides by 4: 3(x - 2) = 24. Divide by 3: x - 2 = 8. So x = 10. Expanding first works too, but dividing first keeps the numbers small.",
      },
    ],
  },
  {
    code: "0580 2.5b",
    statement: "Solve simultaneous linear equations in two unknowns, by elimination and by substitution.",
    teach: `### What is being asked
Two equations, two unknowns, one pair of values that satisfies **both**. The answer is a pair — write it as \\(x = 3,\\ y = 2\\), or as coordinates if the question is about a graph.

### Method
**By elimination**
1. Multiply one or both equations so the coefficients of one unknown match.
2. **Add** if the matching terms have opposite signs, **subtract** if they have the same sign.
3. Solve the single equation that is left.
4. Substitute back into the **simpler** original equation to get the other unknown.

**By substitution**
Make one unknown the subject of the easier equation, substitute that expression into the other, and solve. Use it when one equation already has a coefficient of 1 or -1 — exactly when elimination would need fractions.

### Worked example
\\(2x + 3y = 12\\) and \\(3x - y = 7\\).
The second equation gives \\(y = 3x - 7\\). Substitute: \\(2x + 3(3x - 7) = 12\\), so \\(11x - 21 = 12\\), \\(11x = 33\\), \\(x = 3\\).
Then \\(y = 3(3) - 7 = 2\\).
Check in the **other** equation: \\(2(3) + 3(2) = 12\\). Correct.

### Traps
- Solving for one unknown and stopping. Both are wanted; each is worth a mark.
- Checking with the equation you already used. Check with the one you did not.
- Subtracting in the wrong order when eliminating: \\((2x + 3y) - (4x + 3y)\\) is \\(-2x\\), not \\(2x\\).
- Losing the second unknown in a word problem: define what x and y mean in your answer.

### Timing
Paper 2: 3-4 minutes, 3-4 marks. Paper 4: frequently a "form and solve" word problem worth 4-5 marks, where the forming is worth as much as the solving.`,
    checks: [
      {
        q: "Solve 2x + 3y = 12 and 3x - y = 7.",
        options: ["x = 2, y = 3", "x = 3, y = -2", "x = 1, y = 10/3", "x = 3, y = 2"],
        correct: 3,
        explanation:
          "From 3x - y = 7, y = 3x - 7. Substituting into 2x + 3y = 12 gives 2x + 9x - 21 = 12, so 11x = 33 and x = 3, then y = 3(3) - 7 = 2. Check in 2(3) + 3(2) = 12.",
      },
      {
        q: "3 pens and 2 pencils cost 2.40 dollars. 5 pens and 4 pencils cost 4.20 dollars. Find the cost of one pen.",
        options: ["0.45 dollars", "0.30 dollars", "0.60 dollars", "0.72 dollars"],
        correct: 2,
        explanation:
          "Let a pen cost p and a pencil cost q, working in cents: 3p + 2q = 240 and 5p + 4q = 420. Doubling the first gives 6p + 4q = 480; subtracting the second gives p = 60, so a pen costs 0.60 dollars (and a pencil 30 cents). Checking q in the first equation is the cheap way to catch a doubling slip.",
      },
    ],
  },
  {
    code: "0580 2.5c",
    statement: "Solve a quadratic equation by factorising it, including equations that must be rearranged first.",
    teach: `### What is being asked
The values of x that make the quadratic equal to zero. A quadratic has **two** roots (they may be equal), so expect two answers unless the question is a "show that" or asks for one.

### Method
1. Rearrange so that one side is **exactly zero**. Factorising before this step is the commonest way to lose a root.
2. Factorise into two brackets. For \\(x^2 + bx + c\\), find two numbers that multiply to \\(c\\) and add to \\(b\\).
3. Use the zero-product rule: if \\(AB = 0\\) then \\(A = 0\\) or \\(B = 0\\). Set each bracket to zero and solve.
4. Check one root by substitution — usually enough, and fast.

### Worked example
Solve \\(x^2 = 3x\\).
Do not divide by x: that throws a root away. Rearrange: \\(x^2 - 3x = 0\\), so \\(x(x - 3) = 0\\), giving \\(x = 0\\) or \\(x = 3\\).
For \\(2x^2 + 7x - 4 = 0\\) the pair multiplies to \\(2 \\times -4 = -8\\) and adds to 7: 8 and -1. So \\((2x - 1)(x + 4) = 0\\), giving \\(x = 0.5\\) or \\(x = -4\\).

### Traps
- Dividing by x (or by any bracket) instead of factorising — the missing root is a lost mark.
- Sign pairs: for \\(x^2 - 5x + 6\\), both numbers are negative, which surprises people who expect one of each.
- Assuming a quadratic that will not factorise in whole numbers has no solution. It does — complete the square or use the formula (2.5d, 2.5e).
- Writing the roots as the numbers inside the brackets rather than their negatives: \\((x - 2)\\) gives \\(x = 2\\).

### Timing
Paper 2: 2-3 minutes, 3 marks. Paper 4: usually one part of a multi-part question, sometimes "show that the equation can be written as ..." first.`,
    checks: [
      {
        q: "Solve x² - 5x + 6 = 0.",
        options: ["x = -2 or x = -3", "x = 2 or x = 3", "x = 1 or x = 6", "x = -1 or x = -6"],
        correct: 1,
        explanation:
          "Two numbers that multiply to +6 and add to -5 are -2 and -3, so (x - 2)(x - 3) = 0 and x = 2 or x = 3. Check: 4 - 10 + 6 = 0.",
      },
      {
        q: "Solve x² = 3x.",
        options: ["x = 3", "x = 0", "x = -3 or x = 0", "x = 0 or x = 3"],
        correct: 3,
        explanation:
          "Rearrange to x² - 3x = 0, then factorise: x(x - 3) = 0, so x = 0 or x = 3. Dividing both sides by x gives only x = 3 and loses the x = 0 root — never divide by the unknown.",
      },
    ],
  },
  {
    code: "0580 2.5d",
    statement: "Solve a quadratic equation by completing the square, leaving the answer in surd form where the roots are not rational.",
    teach: `### What is being asked
Rewrite \\(x^2 + bx + c\\) as \\((x + p)^2 + q\\) and solve from there. Questions either say "by completing the square" or require it (a surd answer, or a "show that" that gives the form).

### Method
1. Halve the coefficient of x to get \\(p\\): \\(x^2 + bx \\to (x + b/2)^2 - (b/2)^2\\).
2. Keep the constant: \\(x^2 + bx + c = (x + b/2)^2 + c - (b/2)^2\\).
3. Rearrange to \\((x + p)^2 = k\\).
4. Take the square root of **both sides**, remembering the \\(\\pm\\). Give both roots, simplified (\\(x = 3 \\pm 2\\sqrt{2}\\), not \\(3 \\pm \\sqrt{8}\\)).
5. If the coefficient of \\(x^2\\) is not 1, take it out as a factor first.

### Worked example
Solve \\(x^2 - 6x + 1 = 0\\).
Half of -6 is -3, and \\((-3)^2 = 9\\): \\((x - 3)^2 - 9 + 1 = 0\\), so \\((x - 3)^2 = 8\\).
Then \\(x - 3 = \\pm\\sqrt{8} = \\pm 2\\sqrt{2}\\), so \\(x = 3 \\pm 2\\sqrt{2}\\).

### Traps
- Forgetting the \\(\\pm\\): one root instead of two.
- The sign of p: for \\(x^2 - 6x\\) it is \\((x - 3)^2\\), not \\((x + 3)^2\\).
- Leaving \\(\\sqrt{8}\\) unsimplified where the question asks for \\(a \\pm b\\sqrt{2}\\).
- Subtracting instead of adding the square term when converting: the constant outside the bracket is \\(c - (b/2)^2\\).

### Timing
Paper 2: 3-4 minutes, 3 marks. Paper 4: worth 4-5 marks because the marks are for the method (the completed-square line) as much as the roots.`,
    checks: [
      {
        q: "Solve x² - 6x + 1 = 0 by completing the square. Give your answers in simplified surd form.",
        options: ["x = 3 ± √8", "x = 3 ± 4", "x = 3 ± 2√2", "x = -3 ± 2√2"],
        correct: 2,
        explanation:
          "(x - 3)² - 9 + 1 = 0 gives (x - 3)² = 8, so x - 3 = ±2√2 and x = 3 ± 2√2. Root 8 simplifies to 2√2, and the ± is what makes it two roots.",
      },
      {
        q: "Write x² + 10x + 3 in the form (x + p)² + q.",
        options: ["(x + 5)² + 28", "(x + 5)² - 22", "(x + 10)² - 97", "(x + 5)² - 25"],
        correct: 1,
        explanation:
          "Half of 10 is 5, so (x + 5)² - 25 + 3 = (x + 5)² - 22. The -25 is what (x + 5)² adds over the original, so it has to come back off.",
      },
    ],
  },
  {
    code: "0580 2.5e",
    statement: "Solve a quadratic equation using the quadratic formula, including equations that must be rearranged into the form ax² + bx + c = 0 first.",
    teach: `### What is being asked
A quadratic that will not factorise is solved with
\\(x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}\\)
— write the formula, substitute, then simplify. Answers are usually required to 2 decimal places or 3 significant figures, so say what you rounded to.

### Method
1. Rearrange to \\(ax^2 + bx + c = 0\\) and write down a, b and c **with their signs**.
2. Substitute into the formula. Bracket negative values: \\(-(-7)\\) is \\(7\\).
3. Work out the discriminant \\(b^2 - 4ac\\) first; if it is negative there is no real solution, and saying so is the mark.
4. Give both roots, then round as the question asks.

### Worked example
Solve \\(2x^2 - 7x + 3 = 0\\).
\\(a = 2\\), \\(b = -7\\), \\(c = 3\\), so \\(b^2 - 4ac = 49 - 24 = 25\\).
\\(x = \\frac{7 \\pm 5}{4}\\), giving \\(x = 3\\) or \\(x = 0.5\\). Here factorising is quicker — choose the formula when the numbers refuse to cooperate.

### Traps
- Dropping the minus signs of b or c on substitution.
- Forgetting the whole numerator is over \\(2a\\), not just the square root.
- Rounding the intermediate value: keep full accuracy until the last step.
- Equations with the unknown in a denominator (for example \\(\\frac{2}{x} = x - 1\\)): multiply through by x first, then rearrange — the formula comes in only after that.

### Timing
Paper 2: 3-4 minutes, 3 marks. Paper 4: 4-5 marks, one for correct substitution, two for the roots, and often a rounding instruction that is itself worth a mark.`,
    checks: [
      {
        q: "Solve 2x² - 7x + 3 = 0 using the quadratic formula.",
        options: ["x = -3 or x = -0.5", "x = 3 or x = -0.5", "x = 7 or x = 3", "x = 3 or x = 0.5"],
        correct: 3,
        explanation:
          "a = 2, b = -7, c = 3, so b² - 4ac = 49 - 24 = 25 and x = (7 ± 5)/4, giving x = 3 or x = 0.5. Factorising as (2x - 1)(x - 3) checks the same roots.",
      },
      {
        q: "Solve 2/x = x - 1.",
        options: ["x = -2 or x = 1", "x = 2 or x = -1", "x = 2 or x = 1", "x = 1 or x = -2"],
        correct: 1,
        explanation:
          "Multiply both sides by x (so x cannot be 0): 2 = x² - x, giving x² - x - 2 = 0, so (x - 2)(x + 1) = 0 and x = 2 or x = -1. Multiply through before rearranging — the formula only applies once the equation is in the form ax² + bx + c = 0.",
      },
    ],
  },
];

/**
 * Two past-paper-style questions, `difficulty = 'exam'`: the same objective
 * tagging, but the explanation is written the way the marks are awarded, which is
 * the shape a top-grade check needs. Two is deliberately not enough to make the
 * topic A*-ready (that needs five plus an exam-technique material) — this is a
 * sample of the shape, not the finished layer.
 */
const EXAM_QUESTIONS = [
  {
    code: "0580 2.5e",
    q: "A rectangle's length is 3 cm longer than its width. Its area is 40 cm². Form an equation and solve it to find the width.",
    options: ["8 cm", "4 cm", "5 cm", "6.4 cm"],
    correct: 2,
    explanation:
      "Marks as awarded: letting the width be x and the length x + 3 [1]; writing x(x + 3) = 40 [1]; expanding and rearranging to x² + 3x - 40 = 0 [1]; factorising to (x + 8)(x - 5) = 0 [1]; x = 5, rejecting x = -8 because a length cannot be negative [1]. Answer 5 cm. Leaving both roots as the answer scores no more than a correct equation without a decision.",
  },
  {
    code: "0580 2.5d",
    q: "Solve x² - 4x - 9 = 0 by completing the square, giving your answers in the form a ± √b.",
    options: ["x = -2 ± √13", "x = 2 ± √13", "x = 2 ± √17", "x = 4 ± √13"],
    correct: 1,
    explanation:
      "(x - 2)² - 4 - 9 = 0, so (x - 2)² = 13 [2 marks: one for the correct completed square, one for the rearrangement]. Then x - 2 = ±√13, so x = 2 ± √13 [2 marks: one for the ±, one for the correct form]. Expressing it as a single surd on the right and not simplifying further is expected — 13 has no square factor.",
  },
];

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

  // Rebuild the checkpoint quiz: its questions cascade with it, so a re-run
  // replaces the content instead of duplicating it.
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
  EXAM_QUESTIONS.forEach((c, i) => {
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
