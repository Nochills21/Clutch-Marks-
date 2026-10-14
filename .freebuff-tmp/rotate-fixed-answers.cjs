// Rotates the correct option of each question in the fixed-answer quizzes.
// Input: .freebuff-tmp/fixed-answers.out (from probe-fixed-answers.sql).
// Output: .freebuff-tmp/rotate-fixed-answers.sql (guarded UPDATEs).
const fs = require("fs");
const rows = JSON.parse(fs.readFileSync(".freebuff-tmp/fixed-answers.out", "utf8"));

const byQuiz = new Map();
for (const r of rows) {
  if (!byQuiz.has(r.quiz_id)) byQuiz.set(r.quiz_id, []);
  byQuiz.get(r.quiz_id).push(r);
}

const lit = (s) => `'${String(s).replace(/'/g, "''")}'`;
const out = [];
let total = 0;
for (const [quizId, qs] of byQuiz) {
  qs.sort((a, b) => a.sort_order - b.sort_order);
  qs.forEach((r, i) => {
    const opts = r.options;
    const n = opts.length;
    const oldC = r.correct_option;
    const newC = i % n;
    if (newC === oldC) return; // already in its slot
    // Shift so the old correct element lands at newC.
    const s = (((newC - oldC) % n) + n) % n;
    const rotated = opts.map((_, k) => opts[(k - s + n) % n]);
    if (rotated[newC] !== opts[oldC]) throw new Error("rotation check failed " + r.question_id);
    out.push(
      `update public.questions set options = ${lit(JSON.stringify(rotated))}::jsonb, correct_option = ${newC} ` +
        `where id = '${r.question_id}' and correct_option = ${oldC};`,
    );
    total++;
  });
}
fs.writeFileSync(".freebuff-tmp/rotate-fixed-answers.sql", out.join("\n") + "\n");
console.log("quizzes", byQuiz.size, "updates", total);
