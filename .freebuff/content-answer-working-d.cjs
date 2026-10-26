// Fourth tranche of solved-answer working: the five Mathematics notes with the
// most compressed answers left after -b and -c. Each entry names the question
// that precedes the answer (the anchor) and the answer that should replace it,
// so `.freebuff/gen-answer-fixes.cjs` can derive the exact strings from the live
// body instead of a copy of it.
//
// The standard is unchanged: the relation, the numbers in, the result out.
// Conceptual items ("state two conditions for a Poisson model") are not in this
// spec — there is no equation to show, and padding them would add words, not
// method.
//
//   node .freebuff/gen-answer-fixes.cjs .freebuff/content-answer-working-d.cjs
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/answer-fixes.sql --apply

module.exports = {
  // AS Level Mathematics: Probability Distributions
  "9c77bccd-7dc1-4b5a-8498-f45f5af99624": [
    {
      after: "P(X = 3) = k. Find k.",
      answer: "ΣP(X = x) = 1, so k = 1 − 0.3 − 0.4 = 0.3.",
    },
    {
      after: "X = 1, 3, 5 with probabilities 0.2, 0.5, 0.3. Find E(X).",
      answer: "E(X) = ΣxP(X = x) = 1(0.2) + 3(0.5) + 5(0.3) = 0.2 + 1.5 + 1.5 = 3.2.",
    },
    {
      after: "For the same X, find Var(X).",
      answer:
        "Var(X) = Σx²P(X = x) − [E(X)]² = 1(0.2) + 9(0.5) + 25(0.3) − 3.2² = 0.2 + 4.5 + 7.5 − 10.24 = 1.96.",
    },
    {
      after: "Find E(4X − 1) and Var(4X − 1).",
      answer: "E(4X − 1) = 4E(X) − 1 = 24 − 1 = 23; Var(4X − 1) = 4²Var(X) = 16 × 5 = 80.",
    },
    {
      after: "Find Var(2X + Y).",
      answer:
        "Var(2X + Y) = 2²Var(X) + Var(Y) = 4(6) + 8 = 32 — the variances add because X and Y are independent, and the constant is squared.",
    },
  ],

  // A Level Mathematics: Proof
  "f8fe66ce-4d84-4329-9cb4-7dd7fc8825a1": [
    {
      after: "Disprove \"n² − n + 1 is prime for all n\".",
      answer:
        "try n = 5: n² − n + 1 = 25 − 5 + 1 = 21 = 3 × 7, which is not prime — one counterexample disproves the claim for all n.",
    },
    {
      after: "Prove the sum of two odd numbers is even.",
      answer:
        "write the odd numbers as 2m + 1 and 2n + 1; their sum is (2m + 1) + (2n + 1) = 2m + 2n + 2 = 2(m + n + 1), which is twice an integer and therefore even.",
    },
    {
      after: "Prove 5n² + 5n is a multiple of 10.",
      answer:
        "5n² + 5n = 5n(n + 1); one of n and n + 1 is even, so n(n + 1) = 2k and 5n(n + 1) = 5 × 2k = 10k, a multiple of 10.",
    },
    {
      after: "Prove x² + 2x + 2 &gt; 0.",
      answer:
        "complete the square: x² + 2x + 2 = (x + 1)² − 1 + 2 = (x + 1)² + 1; a square is never negative, so the expression is at least 1 and therefore &gt; 0 for every real x.",
    },
    {
      after: "Find k so that x² + 2kx + 9 &gt; 0 always.",
      answer:
        "the quadratic must have no real roots, so b² − 4ac &lt; 0: (2k)² − 4(1)(9) = 4k² − 36 &lt; 0, giving k² &lt; 9 and −3 &lt; k &lt; 3.",
    },
    {
      after: "Prove n² + n is even by cases.",
      answer:
        "n even (n = 2k): n² + n = 4k² + 2k = 2(2k² + k); n odd (n = 2k + 1): n² + n = 4k² + 6k + 2 = 2(2k² + 3k + 1) — even in both cases, so even for all n.",
    },
    {
      after: "Prove there is no greatest even integer.",
      answer:
        "suppose N were the greatest even integer; then N + 2 is even (a sum of two even numbers) and N + 2 &gt; N, contradicting the assumption that N was greatest — so no such N exists.",
    },
  ],

  // A Level Mathematics: The Binomial Expansion
  "50371f75-b6a2-488e-b042-9f655f4ea264": [
    {
      after: "Expand (1 + x)⁵.",
      answer:
        "(1 + x)⁵ = 1 + 5x + 10x² + 10x³ + 5x⁴ + x⁵, from the coefficients ⁵C₀…⁵C₅ = 1, 5, 10, 10, 5, 1.",
    },
    {
      after: "Find the coefficient of x² in (1 − 3x)⁶.",
      answer: "the x² term is ⁶C₂(−3x)² = 15 × 9x² = 135x², so the coefficient is 135.",
    },
    {
      after: "Find the term in x⁴ in (2 + x)⁶.",
      answer: "the x⁴ term is ⁶C₄(2)²x⁴ = 15 × 4 × x⁴ = 60x⁴.",
    },
    {
      after: "Find the constant term in (2x − 1/x)⁴.",
      answer:
        "the general term ⁴Cᵣ(2x)^(4−r)(−1/x)^r carries x^(4 − 2r); 4 − 2r = 0 gives r = 2, so the constant term is ⁴C₂(2)²(−1)² = 6 × 4 = 24.",
    },
    {
      after: "Expand (1 − x)^(−2) to x³.",
      answer:
        "(1 + u)^n = 1 + nu + n(n−1)u²/2 + n(n−1)(n−2)u³/6 with u = −x and n = −2 gives 1 + 2x + 3x² + 4x³.",
    },
    {
      after: "Expand (1 + 3x)^(1/3) to x².",
      answer:
        "1 + (1/3)(3x) + [(1/3)(−2/3)/2](3x)² = 1 + x − x² — the third term is negative because the second factor is negative.",
    },
    {
      after: "State the range for (1 + 5x)^(−1).",
      answer: "the binomial series needs |5x| &lt; 1, so |x| &lt; 1/5.",
    },
    {
      after: "Estimate (0.98)^(−1) to three terms.",
      answer:
        "(1 + x)^(−1) ≈ 1 − x + x² with x = −0.02: 1 + 0.02 + 0.0004 = 1.0204.",
    },
  ],

  // A Level Mathematics: The Poisson Distribution
  "57eaee80-6b7e-424d-b649-06a608be6256": [
    {
      after: "X ~ Po(2.5): find P(X = 3).",
      answer: "P(X = 3) = e^(−λ)λ³/3! = e^(−2.5) × 15.625/6 = 0.0821 × 2.604 = 0.2138.",
    },
    {
      after: "X ~ Po(4): find P(X ≤ 2).",
      answer: "P(X ≤ 2) = e^(−4)(1 + 4 + 8) = 0.0183 × 13 = 0.2381.",
    },
    {
      after: "X ~ Po(5): find P(X ≥ 3).",
      answer: "P(X ≥ 3) = 1 − P(X ≤ 2) = 1 − e^(−5)(1 + 5 + 12.5) = 1 − 0.1247 = 0.8753.",
    },
    {
      after: "Rate 3 per hour: find P(X = 0) in 20 minutes.",
      answer: "the rate scales with the interval: λ = 3 × 20/60 = 1, so P(X = 0) = e^(−1) = 0.3679.",
    },
    {
      after: "Independent Po(2) and Po(3): find P(total = 4).",
      answer:
        "independent Poisson variables add, so T ~ Po(2 + 3) = Po(5) and P(T = 4) = e^(−5)5⁴/4! = 0.1755.",
    },
    {
      after: "B(500, 0.01): approximate P(X = 0).",
      answer:
        "n is large and p small, so use Po(λ = np = 5): P(X = 0) ≈ e^(−5) = 0.00674.",
    },
    {
      after: "9 events observed where 4 expected; test for an increase at 5%.",
      answer:
        "under H₀, X ~ Po(4); P(X ≥ 9) = 1 − P(X ≤ 8) = 0.0214 &lt; 0.05, so reject H₀ — the observed rate is significantly higher.",
    },
    {
      after: "Po(3), 5% upper tail: find the critical region.",
      answer:
        "P(X ≥ 6) = 0.0839 and P(X ≥ 7) = 0.0335; the largest region still at or below 5% starts at 7, so the critical region is X ≥ 7.",
    },
  ],

  // Cambridge IGCSE Mathematics: Angles and Polygons
  "dc3d7286-feb5-4d75-99e1-ce0941a6a237": [
    {
      after: "one co-interior angle is 72°. Find the other.",
      answer:
        "co-interior angles between parallel lines sum to 180°, so the other angle is 180 − 72 = 108°.",
    },
    {
      after: "Find the interior angle sum of a 15-sided polygon.",
      answer: "the interior angles of an n-gon sum to (n − 2) × 180°, so (15 − 2) × 180 = 2340°.",
    },
    {
      after: "Each exterior angle of a regular polygon is 24°.",
      answer:
        "exterior angles sum to 360°, so n = 360 ÷ 24 = 15; each interior angle is 180 − 24 = 156°.",
    },
    {
      after: "An angle at the circumference is 28°.",
      answer:
        "the angle at the centre is twice the angle at the circumference on the same arc: 2 × 28 = 56°.",
    },
    {
      after: "A triangle is inscribed in a semicircle with the diameter as one side",
      answer:
        "the angle in a semicircle is 90°, so the third angle is 180 − 90 − 33 = 57°.",
    },
    {
      after: "A cyclic quadrilateral has one angle 118°.",
      answer: "opposite angles of a cyclic quadrilateral sum to 180°, so the opposite angle is 180 − 118 = 62°.",
    },
    {
      after: "Two tangents from P touch the circle at A and B; PA = 9 cm.",
      answer: "tangents drawn from the same external point are equal, so PB = PA = 9 cm.",
    },
    {
      after: "angle ABD = 42° and angle ACD = 42°",
      answer:
        "angle ABD and angle ACD are both 42° and both stand on the chord AD, so they are angles in the same segment; equal angles in the same segment put B and C on the same circle through A and D, so A, B, C and D are concyclic.",
    },
  ],
};
