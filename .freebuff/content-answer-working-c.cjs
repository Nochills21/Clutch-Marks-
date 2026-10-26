// Third tranche of solved-answer working: the next five Mathematics notes by
// count of compressed answers (Binomial Distribution, Functions, Integration II,
// Transformations and Vectors, Complex Numbers). Same rule: relation, then
// substitution, then result. Descriptions and definitions are left alone.
//
// Apply with:
//   node .freebuff/apply-note-text-fixes.cjs .freebuff/content-answer-working-c.cjs
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/note-fixes.sql --apply

module.exports = {
  fixes: {
    // A Level Mathematics: The Binomial Distribution
    "e1a3c834-71a5-46c5-87e6-4700be5beeb8": [
      [
        "<em>Answer:</em> X ~ B(12, 1/6).",
        "<em>Answer:</em> X ~ B(n, p) with n = 12 rolls and p = 1/6 the chance of a six on each, so X ~ B(12, 1/6).",
      ],
      [
        "<em>Answer:</em> 28 × 0.0625 × 0.1780 = 0.3115.",
        "<em>Answer:</em> P(X = 2) = ⁸C₂ (0.25)² (0.75)⁶ = 28 × 0.0625 × 0.1780 = 0.3115.",
      ],
      [
        "<em>Answer:</em> 0.5155 from tables.",
        "<em>Answer:</em> P(X ≤ 4) = Σₖ₌₀⁴ ¹⁵Cₖ (0.3)ᵏ (0.7)¹⁵⁻ᵏ = 0.5155 from cumulative binomial tables.",
      ],
      [
        "<em>Answer:</em> 1 − 0.2969 = 0.7031.",
        "<em>Answer:</em> P(X ≥ 3) = 1 − P(X ≤ 2) = 1 − 0.2969 = 0.7031 — the complement, because the tables give the lower tail only.",
      ],
      [
        "<em>Answer:</em> p = 1/3, n = 54.",
        "<em>Answer:</em> mean np = 18 and variance np(1 − p) = 12; dividing, 1 − p = 12/18 = 2/3, so p = 1/3 and n = 18 ÷ (1/3) = 54.",
      ],
      [
        "<em>Answer:</em> P(X ≤ 12) = 0.8684, no evidence to reject.",
        "<em>Answer:</em> H₀: p = 0.5 against H₁: p &lt; 0.5; under H₀, X ~ B(20, 0.5) and P(X ≤ 12) = 0.8684, which is far above 0.05, so there is no evidence to reject H₀.",
      ],
      [
        "<em>Answer:</em> P(X ≤ 0) = 0.1074 &gt; 0.05, so no region exists at 5%.",
        "<em>Answer:</em> the smallest possible tail is P(X ≤ 0) = (0.8)¹⁰ = 0.1074, which already exceeds 0.05, so no critical region exists at the 5% level for this n.",
      ],
      [
        "<em>Answer:</em> μ = 50, σ = 5, z = 1.9, P = 0.0287.",
        "<em>Answer:</em> μ = np = 50 and σ = √(np(1 − p)) = √25 = 5; with the continuity correction z = (59.5 − 50)/5 = 1.9, so P(X ≥ 60) ≈ P(Z &gt; 1.9) = 0.0287.",
      ],
    ],

    // AS Level Mathematics: Functions
    "f35f2af5-9d17-40d9-8772-d181fa861e96": [
      ["<em>Answer:</em> 2(9) − 1 = 17.", "<em>Answer:</em> substitute x = −3: f(−3) = 2(−3)² − 1 = 2(9) − 1 = 17."],
      [
        "<em>Answer:</em> x ≠ −4.",
        "<em>Answer:</em> a fraction is undefined where its denominator is zero: x + 4 = 0 at x = −4, so the domain is x ≠ −4.",
      ],
      ["<em>Answer:</em> 2x + 3.", "<em>Answer:</em> fg(x) = f(g(x)) = f(2x) = 2x + 3 — g acts first, then f."],
      [
        "<em>Answer:</em> y = 2x + 5.",
        "<em>Answer:</em> write y = (x − 5)/2, then x = 2y + 5 after swapping and rearranging, so f⁻¹(x) = 2x + 5.",
      ],
      [
        "<em>Answer:</em> x ≥ 1 (the range of f).",
        "<em>Answer:</em> the domain of f⁻¹ is the range of f; f(x) = x² + 1 with x ≥ 0 takes values from 1 upward, so the domain of f⁻¹ is x ≥ 1.",
      ],
      [
        "<em>Answer:</em> (2, 14).",
        "<em>Answer:</em> y = 2f(x) doubles every y value while x is unchanged, so (2, 7) → (2, 2 × 7) = (2, 14).",
      ],
    ],

    // A Level Mathematics: Integration II
    "42a00afc-901a-4089-8544-5d9011e1d6ca": [
      [
        "<em>Answer:</em> (1/3) sin 3x + c.",
        "<em>Answer:</em> ∫ cos kx dx = (1/k) sin kx + c, so with k = 3: (1/3) sin 3x + c.",
      ],
      [
        "<em>Answer:</em> x/2 + (sin 2x)/4 + c.",
        "<em>Answer:</em> cos²x = (1 + cos 2x)/2, so ∫ cos²x dx = ½∫(1 + cos 2x) dx = x/2 + (sin 2x)/4 + c.",
      ],
      [
        "<em>Answer:</em> u = x³ + 1 → (x³ + 1)⁵/5 + c.",
        "<em>Answer:</em> let u = x³ + 1, then du = 3x² dx, so ∫ u⁴ du = u⁵/5 + c = (x³ + 1)⁵/5 + c.",
      ],
      [
        "<em>Answer:</em> −x cos x + sin x + c.",
        "<em>Answer:</em> by parts with u = x, dv = sin x dx: ∫ x sin x dx = −x cos x + ∫ cos x dx = −x cos x + sin x + c.",
      ],
      [
        "<em>Answer:</em> (x²/2)ln x − x²/4 + c.",
        "<em>Answer:</em> by parts with u = ln x, dv = x dx: ∫ x ln x dx = (x²/2)ln x − ∫ (x²/2)(1/x) dx = (x²/2)ln x − x²/4 + c.",
      ],
      [
        "<em>Answer:</em> 2 ln|x − 1| − 2 ln|x + 1| + c.",
        "<em>Answer:</em> partial fractions: 4/((x + 1)(x − 1)) = 2/(x − 1) − 2/(x + 1), so the integral is 2 ln|x − 1| − 2 ln|x + 1| + c.",
      ],
      [
        "<em>Answer:</em> π/5.",
        "<em>Answer:</em> V = π∫₀¹ y² dx = π∫₀¹ (x²)² dx = π[x⁵/5]₀¹ = π(1/5 − 0) = π/5.",
      ],
      [
        "<em>Answer:</em> y = 5e^(2x).",
        "<em>Answer:</em> separate the variables: ∫ dy/y = ∫ 2 dx, so ln y = 2x + c; y = 5 at x = 0 gives c = ln 5, hence y = 5e^(2x).",
      ],
    ],

    // Cambridge IGCSE Mathematics: Transformations and Vectors
    "6103544a-0080-4c85-af53-ddbb12284c25": [
      [
        "<em>Answer:</em> (4, −1).",
        "<em>Answer:</em> reflection in the x-axis maps (x, y) → (x, −y), so (4, 1) → (4, −1).",
      ],
      [
        "<em>Answer:</em> (−2, 5).",
        "<em>Answer:</em> a 90° anticlockwise rotation about the origin maps (x, y) → (−y, x), so (5, 2) → (−2, 5).",
      ],
      [
        "<em>Answer:</em> (−2, −4).",
        "<em>Answer:</em> enlargement about the origin maps (x, y) → k(x, y); with k = −2, (1, 2) → (−2, −4) — the negative factor also puts the image on the opposite side of the centre.",
      ],
      [
        "<em>Answer:</em> Translation by (2; 4) — one of many correct complete descriptions.",
        "<em>Answer:</em> translation vector = image − object = (3 − 1; 5 − 1) = (2; 4), so translation by (2; 4) — one of many correct complete descriptions.",
      ],
      [
        "<em>Answer:</em> √(36 + 64) = 10.",
        "<em>Answer:</em> |v| = √(x² + y²) = √(6² + 8²) = √(36 + 64) = √100 = 10.",
      ],
      [
        "<em>Answer:</em> (4; −2).",
        "<em>Answer:</em> AB = OB − OA = (5; 2) − (1; 4) = (5 − 1; 2 − 4) = (4; −2).",
      ],
    ],

    // A Level Mathematics: Complex Numbers
    "d40be9ac-7510-48c6-82ed-0ad1c587fe37": [
      [
        "<em>Answer:</em> 15 + 20i − 6i − 8i² = 23 + 14i.",
        "<em>Answer:</em> (5 − 2i)(3 + 4i) = 15 + 20i − 6i − 8i², and i² = −1, so 15 + 14i + 8 = 23 + 14i.",
      ],
      [
        "<em>Answer:</em> multiply by (3 + i): (5 + 5i)/10 = 0.5 + 0.5i.",
        "<em>Answer:</em> multiply top and bottom by the conjugate 3 + i: (2 + i)(3 + i)/((3 − i)(3 + i)) = (5 + 5i)/(9 + 1) = (5 + 5i)/10 = 0.5 + 0.5i.",
      ],
      ["<em>Answer:</em> √(16 + 9) = 5.", "<em>Answer:</em> |a + bi| = √(a² + b²) = √(16 + 9) = √25 = 5."],
      [
        "<em>Answer:</em> third quadrant, so −135°.",
        "<em>Answer:</em> arg(a + bi) = atan(b/a) corrected for the quadrant: atan(−2/−2) = atan 1 = 45°, and the point is in the third quadrant, so 45° − 180° = −135°.",
      ],
      [
        "<em>Answer:</em> r = 2, θ = 30°, so 16(cos 120 + i sin 120) = −8 + 8√3 i.",
        "<em>Answer:</em> r = √(3 + 1) = 2 and θ = atan(1/√3) = 30°; de Moivre gives r⁴(cos 4θ + i sin 4θ) = 16(cos 120° + i sin 120°) = −8 + 8√3 i.",
      ],
      [
        "<em>Answer:</em> 1 + 2i.",
        "<em>Answer:</em> the coefficients are real, so the roots come in conjugate pairs: if 1 − 2i is a root then 1 + 2i is the other.",
      ],
      [
        "<em>Answer:</em> circle centre −2, radius 3.",
        "<em>Answer:</em> |z + 2| = 3 is |z − (−2)| = 3, the set of points at distance 3 from −2: a circle with centre −2 and radius 3.",
      ],
      [
        "<em>Answer:</em> half-line from 1 at 60°, excluding the point itself.",
        "<em>Answer:</em> arg(z − 1) = π/3 makes the line from 1 to z sit at 60° to the positive real axis, so the locus is a half-line starting at 1 at 60°, excluding the point itself where z − 1 = 0.",
      ],
      [
        "<em>Answer:</em> r = 2√2, θ = −45°, so 2√2 e^(−iπ/4).",
        "<em>Answer:</em> r = √(4 + 4) = 2√2, and the point is in the fourth quadrant, so θ = −atan(2/2) = −45° = −π/4, giving 2√2 e^(−iπ/4).",
      ],
    ],
  },
};
