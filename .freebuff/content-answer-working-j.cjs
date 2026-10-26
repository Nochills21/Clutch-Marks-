// Tenth tranche of solved-answer working: Statistics S1 (AS), Differentiation
// (AS), Transformations and Vectors (IGCSE) and Proof (AS).
//
// Two answers here are damaged, not merely terse: an earlier pipeline stripped
// the `<`/`>` characters, leaving "2x − 4 0 → x 2" and "b² − 4ac 0". Those are
// restored as escaped glyphs (&lt; / &gt;) in the same edit that adds the working.
//
//   node .freebuff/gen-answer-fixes.cjs .freebuff/content-answer-working-j.cjs
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/answer-fixes.sql --apply

module.exports = {
  // A Level Mathematics: Statistics S1 — Correlation and Regression
  "5ad98814-ed87-4998-9623-110870576cd3": [
    {
      after: "Can r = 1.2?",
      answer:
        "no: r is a scaled covariance divided by the two standard deviations, so |r| ≤ 1 always; the extreme values are r = 1 (perfect positive) and r = −1 (perfect negative).",
    },
    {
      after: "Sxx = 20, Syy = 45, Sxy = 27. Find r.",
      answer: "r = Sxy/√(Sxx × Syy) = 27/√(20 × 45) = 27/30 = 0.9.",
    },
    {
      after: "Sxy = 27, Sxx = 20. Find b.",
      answer: "the gradient of the regression line of y on x is b = Sxy/Sxx = 27/20 = 1.35.",
    },
  ],

  // A Level Mathematics: Differentiation
  "edbbedae-7847-4852-a895-44af0d0b57d5": [
    {
      after: "Differentiate y = 5x⁴ − 3x² + 2.",
      answer:
        "dy/dx = 4(5x³) − 2(3x) + 0 = 20x³ − 6x: the constant 2 differentiates to zero, which is why it disappears.",
    },
    {
      after: "Find where y = x² − 4x is decreasing.",
      answer:
        "dy/dx = 2x − 4 = 2(x − 2), and the curve decreases where 2(x − 2) &lt; 0, i.e. x &lt; 2.",
    },
    {
      after: "Find the gradient of y = x² + 2x at x = −1.",
      answer: "dy/dx = 2x + 2, so at x = −1 the gradient is 2(−1) + 2 = 0 — the curve is momentarily flat there.",
    },
  ],

  // Cambridge IGCSE Mathematics: Transformations and Vectors
  "6103544a-0080-4c85-af53-ddbb12284c25": [
    {
      after: "Translate (2, 3) by (−1; 4).",
      answer: "add the translation vector: (2, 3) + (−1, 4) = (2 − 1, 3 + 4) = (1, 7).",
    },
    {
      after: "Reflect (4, 1) in the x-axis.",
      answer:
        "reflection in the x-axis negates the y-coordinate: x′ = x = 4 and y′ = −y = −1, so the image is (4, −1).",
    },
    {
      after: "Rotate (5, 2) 90° anticlockwise about the origin.",
      answer:
        "a 90° anticlockwise turn about the origin maps (x, y) → (−y, x): x′ = −y = −2 and y′ = x = 5, so the image is (−2, 5).",
    },
    {
      after: "Enlarge (1, 2) by factor −2 about the origin.",
      answer:
        "enlargement about the origin maps (x, y) → k(x, y) with k = −2, so (1, 2) becomes (−2, −4); the negative factor puts the image on the opposite side of the centre.",
    },
  ],

  // A Level Mathematics: Proof
  "1da2d645-3b35-4626-9a02-59685e70c60a": [
    {
      after: "Disprove \"all primes are odd\".",
      answer: "one counter-example settles a universal claim: n = 2 is prime and 2 = 2 × 1 is even, so the statement is false.",
    },
    {
      after: "Prove that n³ − n is divisible by 6 for n = 1, 2, 3, 4.",
      answer:
        "check each case: 1³ − 1 = 0 = 6 × 0, 2³ − 2 = 6 = 6 × 1, 3³ − 3 = 24 = 6 × 4, 4³ − 4 = 60 = 6 × 10 — all divisible by 6, which proves it for these four values only (exhaustion, not a general proof).",
    },
    {
      after: "Disprove \"n² + 1 is prime for all n\".",
      answer: "one value kills it: at n = 3, n² + 1 = 9 + 1 = 10, and 10 = 2 × 5 is not prime, so the claim fails.",
    },
    {
      after: "Find k so that x² + 2kx + 4 = 0 has no real roots.",
      answer:
        "no real roots needs b² − 4ac &lt; 0, so (2k)² − 4(1)(4) &lt; 0, giving 4k² − 16 &lt; 0, i.e. k² &lt; 4 and −2 &lt; k &lt; 2.",
    },
  ],
};
