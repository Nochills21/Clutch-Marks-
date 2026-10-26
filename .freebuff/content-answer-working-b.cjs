// Solved questions show the relation, then the substitution, then the result —
// `SE = σ/√n = 15/√25 = 15/5 = 3`, not `Answer: 3`. These five Mathematics
// notes had the most compressed answers in the estate (44 of them), so they are
// the second tranche after content-answer-working-a.cjs.
//
// Conceptual items are left alone: a counterexample ("2 is prime and even") has
// no equation to show, and padding it would add words, not method.
//
// One item here was not merely terse but wrong: the section formula for a
// 2:1 division cannot give (2; 3) when b = (6; 9), so the answer and the ratio
// now agree with each other.
//
// Apply with:
//   node .freebuff/apply-note-text-fixes.cjs .freebuff/content-answer-working-b.cjs
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/note-fixes.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/note-fixes.sql --apply    (live)

module.exports = {
  fixes: {
    // A Level Mathematics: Coordinate Geometry
    "022b44ee-69e7-427d-9442-1a55a32580fb": [
      [
        "<em>Answer:</em> √(16 + 36) = √52 = 7.21.",
        "<em>Answer:</em> d = √((x₂ − x₁)² + (y₂ − y₁)²) = √((−1 − 3)² + (4 + 2)²) = √(16 + 36) = √52 = 7.21.",
      ],
      [
        "<em>Answer:</em> B = (8, 5).",
        "<em>Answer:</em> M = ((x₁ + x₂)/2, (y₁ + y₂)/2), so 2M = A + B and B = 2M − A = (10 − 2, 2 + 3) = (8, 5).",
      ],
      [
        "<em>Answer:</em> y = −0.5x + 4.",
        "<em>Answer:</em> m⊥ = −1/m = −1/2 = −0.5; through (0, 4) with y = mx + c gives c = 4, so y = −0.5x + 4.",
      ],
      [
        "<em>Answer:</em> centre (−2, 5), radius 7.",
        "<em>Answer:</em> (x − a)² + (y − b)² = r² matches with a = −2, b = 5 and r² = 49, so r = √49 = 7: centre (−2, 5), radius 7.",
      ],
      [
        "<em>Answer:</em> (x+2)² + (y−3)² = 25, radius 5.",
        "<em>Answer:</em> x² + 4x = (x + 2)² − 4 and y² − 6y = (y − 3)² − 9, so (x + 2)² + (y − 3)² = 12 + 4 + 9 = 25 and r = √25 = 5.",
      ],
      [
        "<em>Answer:</em> gradient of radius 2, tangent −0.5, so x + 2y = 10.",
        "<em>Answer:</em> m(radius) = (4 − 0)/(2 − 0) = 2, so m(tangent) = −1/2; y − 4 = −0.5(x − 2) gives x + 2y = 10.",
      ],
      [
        "<em>Answer:</em> x = ±3, length 6.",
        "<em>Answer:</em> y = 2 in x² + y² = 13 gives x² = 13 − 4 = 9, so x = ±3 and the chord is 3 − (−3) = 6 long.",
      ],
      [
        "<em>Answer:</em> 5x² + 20x + 21 = 0, discriminant 400 − 420 &lt; 0.",
        "<em>Answer:</em> x² + (2x + 5)² = 4 gives 5x² + 20x + 21 = 0; b² − 4ac = 20² − 4 × 5 × 21 = 400 − 420 = −20 &lt; 0, so there are no real roots and the line misses the circle.",
      ],
      [
        "<em>Answer:</em> centre (3, 4), radius 5, (x−3)² + (y−4)² = 25.",
        "<em>Answer:</em> centre = midpoint = ((0 + 6)/2, (0 + 8)/2) = (3, 4); r = half the diameter = √(6² + 8²)/2 = 10/2 = 5, so (x − 3)² + (y − 4)² = 25.",
      ],
      [
        "<em>Answer:</em> x² + y²/4 = 1, an ellipse.",
        "<em>Answer:</em> cos θ = x and sin θ = y/2; cos²θ + sin²θ = 1 gives x² + (y/2)² = 1, i.e. x² + y²/4 = 1, an ellipse.",
      ],
    ],

    // A Level Mathematics: Vectors
    "7ff7a883-b6e3-483a-aa83-bea75fbfc73f": [
      ["<em>Answer:</em> √(25 + 144) = 13.", "<em>Answer:</em> |v| = √(x² + y²) = √(5² + (−12)²) = √(25 + 144) = √169 = 13."],
      [
        "<em>Answer:</em> (0.6; 0.8).",
        "<em>Answer:</em> v̂ = v/|v| = (3; 4)/√(3² + 4²) = (3/5; 4/5) = (0.6; 0.8), whose length is √(0.36 + 0.64) = 1.",
      ],
      [
        "<em>Answer:</em> (6 − 4; −9 + 1) = (2; −8).",
        "<em>Answer:</em> 3a + b = 3(2; −3) + (−4; 1) = (6; −9) + (−4; 1) = (6 − 4; −9 + 1) = (2; −8).",
      ],
      [
        "<em>Answer:</em> yes, each step is a multiple of (3; 6).",
        "<em>Answer:</em> AB = (4; 8) − (1; 2) = (3; 6) and BC = (7; 14) − (4; 8) = (3; 6) = 1 × AB; equal direction through a shared point, so the three points are collinear.",
      ],
      ["<em>Answer:</em> 4 − 6 = −2.", "<em>Answer:</em> a · b = a₁b₁ + a₂b₂ = 1 × 4 + 3 × (−2) = 4 − 6 = −2."],
      [
        "<em>Answer:</em> cos θ = 1/√2, θ = 45°.",
        "<em>Answer:</em> cos θ = a · b/(|a||b|) = 1/(1 × √2) = 1/√2, so θ = cos⁻¹(0.7071) = 45°.",
      ],
      [
        "<em>Answer:</em> 3k − 12 = 0, k = 4.",
        "<em>Answer:</em> perpendicular means a · b = 0: (k; 6) · (3; −2) = 3k − 12 = 0, so k = 4.",
      ],
      ["<em>Answer:</em> √81 = 9.", "<em>Answer:</em> |v| = √(x² + y² + z²) = √(1² + 4² + 8²) = √(1 + 16 + 64) = √81 = 9."],
      [
        "<em>Answer:</em> (2; 3).",
        "<em>Answer:</em> AP:PB = 2:1, so P = a + (2/3)(b − a) = (0; 0) + (2/3)(6; 9) = (4; 6) — two-thirds of the way from a to b, which is what a 2:1 division means.",
      ],
      [
        "<em>Answer:</em> (3; −3).",
        "<em>Answer:</em> v(relative) = v₁ − v₂ = (5; 1) − (2; 4) = (5 − 2; 1 − 4) = (3; −3).",
      ],
    ],

    // AS Level Mathematics: Coordinate Geometry
    "7eaeae86-301f-41c8-9901-70ab01bf804c": [
      [
        "<em>Answer:</em> √(9 + 16) = 5.",
        "<em>Answer:</em> d = √((x₂ − x₁)² + (y₂ − y₁)²) = √((5 − 2)² + (5 − 1)²) = √(9 + 16) = √25 = 5.",
      ],
      ["<em>Answer:</em> 8/4 = 2.", "<em>Answer:</em> m = (y₂ − y₁)/(x₂ − x₁) = (12 − 4)/(7 − 3) = 8/4 = 2."],
      ["<em>Answer:</em> 3/2.", "<em>Answer:</em> m⊥ = −1/m = −1/(−2/3) = 3/2."],
      [
        "<em>Answer:</em> y = −2x + 3.",
        "<em>Answer:</em> y − y₁ = m(x − x₁) gives y − 3 = −2(x − 0), so y = −2x + 3.",
      ],
      [
        "<em>Answer:</em> centre (−1, 4), radius 3.",
        "<em>Answer:</em> (x − a)² + (y − b)² = r² matches with a = −1, b = 4, r² = 9; r = √9 = 3, so centre (−1, 4), radius 3.",
      ],
      [
        "<em>Answer:</em> (x + 2)² + (y − 1)² = 9 → centre (−2, 1), radius 3.",
        "<em>Answer:</em> x² + 4x = (x + 2)² − 4 and y² − 2y = (y − 1)² − 1, so (x + 2)² + (y − 1)² = 4 + 4 + 1 = 9: centre (−2, 1), radius √9 = 3.",
      ],
      [
        "<em>Answer:</em> radius gradient 4/3, tangent gradient −3/4; 3x + 4y = 25.",
        "<em>Answer:</em> m(radius) = (4 − 0)/(3 − 0) = 4/3, so m(tangent) = −3/4; y − 4 = −¾(x − 3) multiplies out to 3x + 4y = 25.",
      ],
      [
        "<em>Answer:</em> gradients both 1; shared point → collinear.",
        "<em>Answer:</em> m₁₂ = (6 − 2)/(5 − 1) = 1 and m₂₃ = (10 − 6)/(9 − 5) = 1; equal gradients through the shared point (5, 6) put all three on one straight line.",
      ],
    ],

    // AS Level Mathematics: Probability
    "d7503fbf-4726-4fd0-97ad-92a64510499b": [
      ["<em>Answer:</em> 0.65.", "<em>Answer:</em> P(A′) = 1 − P(A) = 1 − 0.35 = 0.65."],
      [
        "Find P(A∪B). <em>Answer:</em> 0.7.",
        "Find P(A∪B). <em>Answer:</em> P(A ∪ B) = P(A) + P(B) − P(A ∩ B) = 0.4 + 0.5 − 0.2 = 0.7.",
      ],
      [
        "Find P(A or B). <em>Answer:</em> 0.7.",
        "Find P(A or B). <em>Answer:</em> exclusive means P(A ∩ B) = 0, so P(A ∪ B) = P(A) + P(B) = 0.3 + 0.4 = 0.7.",
      ],
      [
        "<em>Answer:</em> 0.15.",
        "<em>Answer:</em> independent means P(A ∩ B) = P(A) × P(B) = 0.5 × 0.3 = 0.15.",
      ],
      [
        "<em>Answer:</em> 6/36 = 1/6.",
        "<em>Answer:</em> P = favourable/total: totals of 10, 11 and 12 arise from 3 + 2 + 1 = 6 of the 36 equally likely pairs, so 6/36 = 1/6.",
      ],
      [
        "<em>Answer:</em> 6/10 × 5/9 = 1/3.",
        "<em>Answer:</em> P(B₁ and B₂) = P(B₁) × P(B₂ | B₁) = 6/10 × 5/9 = 30/90 = 1/3 — the second draw is from 9 sweets, not 10, because one blue has gone.",
      ],
      ["<em>Answer:</em> 0.2.", "<em>Answer:</em> P(A ∩ B) = P(A | B) × P(B) = 0.4 × 0.5 = 0.2."],
      [
        "<em>Answer:</em> 5 × 4 × 3 = 60.",
        "<em>Answer:</em> ordered choices without replacement: 5 × 4 × 3 = 60, i.e. 5!/(5 − 3)! = 120/2 = 60.",
      ],
    ],

    // AS Level Mathematics: Proof
    "1da2d645-3b35-4626-9a02-59685e70c60a": [
      [
        "<em>Answer:</em> (2m + 1) + 2n = 2(m + n) + 1, which is odd.",
        "<em>Answer:</em> write the odd number as 2m + 1 and the even one as 2n, m, n integers; then (2m + 1) + 2n = 2(m + n) + 1 = 2k + 1 with k = m + n, which is the definition of odd.",
      ],
      [
        "<em>Answer:</em> n(n + 1): one of n, n + 1 is even, so the product is even.",
        "<em>Answer:</em> of two consecutive integers one is even, so n = 2k or n + 1 = 2k; then n(n + 1) = 2k(n + 1) or 2kn, either way 2 × integer, so the product is even.",
      ],
      [
        "<em>Answer:</em> 9n² + 6n = 3(3n² + 2n).",
        "<em>Answer:</em> (3n + 1)² − 1 = 9n² + 6n + 1 − 1 = 9n² + 6n = 3(3n² + 2n), a multiple of 3 for every integer n.",
      ],
      [
        "<em>Answer:</em> (x − 3)² + 1 ≥ 1 &gt; 0.",
        "<em>Answer:</em> x² − 6x + 10 = (x − 3)² − 9 + 10 = (x − 3)² + 1; a square is never negative, so the expression is at least 1 and therefore &gt; 0 for every real x.",
      ],
      [
        "<em>Answer:</em> 4k² − 16 &lt; 0 → k² &lt; 4 → −2 &lt; k &lt; 2.",
        "<em>Answer:</em> no real roots needs b² − 4ac &lt; 0: (2k)² − 4 × 1 × 4 = 4k² − 16 &lt; 0, so k² &lt; 4 and −2 &lt; k &lt; 2.",
      ],
    ],
  },
};
