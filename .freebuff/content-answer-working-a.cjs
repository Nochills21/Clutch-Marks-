// Solved questions must show the relation, then the substitution, then the
// result — not "Answer: 3". These three Mathematics A2 notes had the most
// compressed answers in the estate (10 of 10 without working each), so they are
// the first tranche. Conceptual items are untouched: there is no equation to
// show in "define a Type II error".
//
// Every `from` is an exact substring of the live row and
// .freebuff/apply-note-text-fixes.cjs refuses to write if one is missing, so a
// stale copy fails loudly instead of editing the wrong text. HTML entities are
// reproduced as stored (`&lt;`, `&gt;`).
//
// Apply with:
//   node .freebuff/apply-note-text-fixes.cjs .freebuff/content-answer-working-a.cjs
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/note-fixes.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/note-fixes.sql --apply    (live)

module.exports = {
  fixes: {
    // A Level Mathematics: Sampling and Estimation
    "dec61a69-ea89-4236-9ae4-64f25d54c51d": [
      ["σ = 15, n = 25: find the standard error. <em>Answer:</em> 3.", "σ = 15, n = 25: find the standard error. <em>Answer:</em> SE = σ/√n = 15/√25 = 15/5 = 3."],
      [
        "<em>Answer:</em> it halves, from 3 to 1.5.",
        "<em>Answer:</em> SE = σ/√n, so quadrupling n multiplies √n by 2: 15/√25 = 3 becomes 15/√100 = 1.5, so the standard error halves.",
      ],
      [
        "<em>Answer:</em> 40 ± 1.96 = (38.04, 41.96).",
        "<em>Answer:</em> CI = x̄ ± z σ/√n = 40 ± 1.96 × 6/√36 = 40 ± 1.96 × 1 = 40 ± 1.96 = (38.04, 41.96).",
      ],
      [
        "<em>Answer:</em> 0.15 ± 1.96(0.01785) = (0.115, 0.185).",
        "<em>Answer:</em> p̂ ± z √(p̂(1 − p̂)/n) = 0.15 ± 1.96 √(0.15 × 0.85/400) = 0.15 ± 1.96 × 0.01785 = (0.115, 0.185).",
      ],
    ],

    // A Level Mathematics: Permutations and Combinations
    "a8ebc823-3b62-4380-be53-b636ae87d6b4": [
      ["Evaluate 7!. <em>Answer:</em> 5040.", "Evaluate 7!. <em>Answer:</em> 7! = 7 × 6 × 5 × 4 × 3 × 2 × 1 = 5040."],
      ["In how many orders can 5 runners finish? <em>Answer:</em> 5! = 120.", "In how many orders can 5 runners finish? <em>Answer:</em> 5P5 = 5! = 5 × 4 × 3 × 2 × 1 = 120."],
      ["Evaluate 10C3. <em>Answer:</em> 120.", "Evaluate 10C3. <em>Answer:</em> 10C3 = 10!/(3! × 7!) = (10 × 9 × 8)/(3 × 2 × 1) = 720/6 = 120."],
      ["From 8 books, how many ways to choose 3? <em>Answer:</em> 56.", "From 8 books, how many ways to choose 3? <em>Answer:</em> 8C3 = 8!/(3! × 5!) = (8 × 7 × 6)/(3 × 2 × 1) = 336/6 = 56."],
      [
        "<em>Answer:</em> 10!/(3!3!2!) = 50,400.",
        "<em>Answer:</em> 10!/(3! × 3! × 2!) = 3 628 800/(6 × 6 × 2) = 3 628 800/72 = 50,400.",
      ],
      ["<em>Answer:</em> 5! × 2 = 240.", "<em>Answer:</em> glue the pair: 5! × 2! = 120 × 2 = 240."],
      ["<em>Answer:</em> 720 − 240 = 480.", "<em>Answer:</em> total − together = 6! − 5! × 2! = 720 − 240 = 480."],
      ["7 people around a table: <em>Answer:</em> 6! = 720.", "7 people around a table: <em>Answer:</em> (n − 1)! = 6! = 720."],
      ["<em>Answer:</em> 5C2 × 4C1 = 40.", "<em>Answer:</em> 5C2 × 4C1 = 10 × 4 = 40."],
      ["<em>Answer:</em> 9C4 − 5C4 = 126 − 5 = 121.", "<em>Answer:</em> all − none = 9C4 − 5C4 = 126 − 5 = 121."],
    ],

    // A Level Mathematics: Hypothesis Testing
    "124279ee-da25-472a-b5f2-53fdcaab4186": [
      [
        "<em>Answer:</em> P(X ≤ 8) = 0.0565, not significant.",
        "<em>Answer:</em> X ~ B(20, 0.6), so P(X ≤ 8) = 0.0565; since 0.0565 &gt; 0.05 there is insufficient evidence to reject H0.",
      ],
      [
        "<em>Answer:</em> P(X ≤ 2) = 0.0271, P(X ≤ 3) = 0.0905, so X ≤ 2.",
        "<em>Answer:</em> test P(X ≤ c) ≤ 0.05: P(X ≤ 2) = 0.0271 ≤ 0.05, but P(X ≤ 3) = 0.0905 &gt; 0.05, so the critical region is X ≤ 2.",
      ],
      ["<em>Answer:</em> 2.71%.", "<em>Answer:</em> actual significance level = P(X ≤ 2) = 0.0271 = 2.71%."],
      [
        "<em>Answer:</em> z = 1.875 &gt; 1.6449, reject.",
        "<em>Answer:</em> z = (x̄ − μ0)/(σ/√n) = (21.5 − 20)/(4/√25) = 1.5/0.8 = 1.875, and 1.875 &gt; 1.6449, so reject H0.",
      ],
      [
        "<em>Answer:</em> 1.875 &lt; 1.96, do not reject.",
        "<em>Answer:</em> z = (21.5 − 20)/(4/√25) = 1.875, and 1.875 &lt; 1.96, so do not reject H0.",
      ],
      ["<em>Answer:</em> 0.0082.", "<em>Answer:</em> p-value = P(Z &gt; 2.4) = 1 − 0.9918 = 0.0082."],
    ],
  },
};
