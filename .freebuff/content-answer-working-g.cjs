// Seventh tranche of solved-answer working: Angles and Polygons (IGCSE),
// Further Trigonometry (A2), Circular Measure (AS) and Numerical Methods (A2).
//
// These four topics were the worst kind of "solved": a rule named without the
// numbers, or a bare value with no rule at all. Each answer now shows the
// relation, the substitution and the result.
//
//   node .freebuff/gen-answer-fixes.cjs .freebuff/content-answer-working-g.cjs
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/answer-fixes.sql --apply

module.exports = {
  // Cambridge IGCSE Mathematics: Angles and Polygons
  "dc3d7286-feb5-4d75-99e1-ce0941a6a237": [
    {
      after: "Two parallel lines are cut by a transversal; one co-interior angle is 72°. Find the other.",
      answer: "co-interior angles between parallel lines are supplementary: A + B = 180°, so B = 180° − 72° = 108°.",
    },
    {
      after: "Find the interior angle sum of a 15-sided polygon.",
      answer: "the interior angles of an n-gon sum to S = (n − 2) × 180°, so S = (15 − 2) × 180° = 13 × 180° = 2340°.",
    },
    {
      after: "An angle at the circumference is 28°. Find the angle at the centre subtended by the same arc.",
      answer: "the angle at the centre is twice the angle at the circumference on the same arc: centre = 2 × 28° = 56°.",
    },
    {
      after: "one base angle is 33°. Find the other.",
      answer:
        "the angle in a semicircle is 90° and the angles of a triangle sum to 180°, so the third angle = 180° − 90° − 33° = 57°.",
    },
    {
      after: "A cyclic quadrilateral has one angle 118°. Find the opposite angle.",
      answer: "opposite angles of a cyclic quadrilateral are supplementary: A + C = 180°, so C = 180° − 118° = 62°.",
    },
    {
      after: "angle ABD = 42° and angle ACD = 42°. What does this tell you about A, B, C, D?",
      answer:
        "angles in the same segment are equal: both 42° angles stand on the chord AD and lie on the same side of it, so A, B, C and D are concyclic — all four points lie on one circle. The theorem runs one way only from equal angles on a shared chord, which is why the answer names the chord AD rather than the quadrilateral.",
    },
  ],

  // A Level Mathematics: Further Trigonometry
  "8070ed35-c07d-4ba4-bba0-9dfbe1a79c80": [
    {
      after: "Solve cosec x = 2 for 0 ≤ x ≤ 360°.",
      answer: "cosec x = 2 means sin x = 1/2; sine is positive in the first and second quadrants, so x = 30° or 180° − 30° = 150°.",
    },
    {
      after: "Find cos 15° exactly.",
      answer:
        "cos 15° = cos(45° − 30°) = cos 45° cos 30° + sin 45° sin 30° = (√2/2)(√3/2) + (√2/2)(1/2) = (√6 + √2)/4.",
    },
    {
      after: "Given cos A = 5/13, find sin 2A.",
      answer:
        "for acute A, sin A = √(1 − cos²A) = √(1 − 25/169) = 12/13; then sin 2A = 2 sin A cos A = 2(12/13)(5/13) = 120/169.",
    },
    {
      after: "Express 5 sin x − 12 cos x as R sin(x − α).",
      answer:
        "R = √(5² + 12²) = 13 and tan α = 12/5 gives α = 67.4°, so 5 sin x − 12 cos x = 13 sin(x − 67.4°).",
    },
    {
      after: "Max of 5 sin x − 12 cos x?",
      answer:
        "writing it as R sin(x − α) bounds it by ±R, so the maximum is R = √(5² + 12²) = 13 (reached when sin(x − α) = 1).",
    },
  ],

  // A Level Mathematics: Circular Measure
  "929796bd-05c8-46af-85a3-af6815541b09": [
    {
      after: "Convert 72° to radians.",
      answer: "θ(rad) = θ(°) × π/180°, so 72 × π/180 = 72π/180 = 2π/5 ≈ 1.257 rad.",
    },
    {
      after: "Radius 5 cm, θ = 2.0 rad. Find the arc length.",
      answer: "arc length s = rθ = 5 × 2.0 = 10 cm.",
    },
    {
      after: "Radius 4 cm, θ = 3.0 rad. Find the area.",
      answer: "sector area A = ½r²θ = ½ × 4² × 3.0 = ½ × 16 × 3 = 24 cm².",
    },
    {
      after: "Find the perimeter of a sector of radius 7 cm and angle 0.8 rad.",
      answer: "the perimeter is the arc plus two radii: rθ + 2r = 7(0.8) + 14 = 5.6 + 14 = 19.6 cm.",
    },
    {
      after: "Use sin θ ≈ θ to estimate sin(0.10) and compare with the calculator value.",
      answer:
        "in radians sin θ ≈ θ for small θ, so sin(0.10) ≈ 0.10 against the calculator's 0.0998 — an error of about 0.2%, small because 0.10 rad is small.",
    },
  ],

  // A Level Mathematics: Numerical Methods
  "623cecd2-630e-456c-ac75-c567c01d46c3": [
    {
      after: "x_(n+1) = (3 − x_n)^(1/3), x₁ = 1. Find x₃.",
      answer:
        "apply the iteration twice: x₂ = (3 − 1)^(1/3) = 1.2599, then x₃ = (3 − 1.2599)^(1/3) = 1.2020.",
    },
    {
      after: "g(x) = (3 − x)^(1/3): show |g′| &lt; 1 near 1.21.",
      answer:
        "g′(x) = −(1/3)(3 − x)^(−2/3), so |g′(1.21)| = (1/3)(1.79)^(−2/3) ≈ 0.21 &lt; 1 — convergence needs the gradient of g to stay inside ±1 near the root.",
    },
    {
      after: "f(x) = x² − 5, x₁ = 2. Find x₂.",
      answer: "Newton–Raphson: x₂ = x₁ − f(x₁)/f′(x₁) = 2 − (2² − 5)/(2 × 2) = 2 − (−1)/4 = 2.25.",
    },
  ],
};
