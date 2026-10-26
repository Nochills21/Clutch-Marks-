// Ninth tranche of solved-answer working: the two AS statistics notes on
// averages and spread, Continuous Random Variables (A2) and Trigonometry (AS).
// A mean written as "70/5 = 14" hides which numbers were added; a mode written
// as "9" hides the counting. Both are now spelled out.
//
//   node .freebuff/gen-answer-fixes.cjs .freebuff/content-answer-working-i.cjs
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/answer-fixes.sql --apply

module.exports = {
  // A Level Mathematics: Numerical Measures of Central Tendency
  "2c8a9240-8b25-4768-a26d-9bdc7fca0a89": [
    {
      after: "Find the mean of 12, 15, 9, 18, 16.",
      answer: "mean = (Σx)/n = (12 + 15 + 9 + 18 + 16)/5 = 70/5 = 14.",
    },
    {
      after: "Find the mode of 3, 5, 5, 7, 9, 9, 9.",
      answer: "count each value: f(3) = 1, f(5) = 2, f(7) = 1, f(9) = 3; the mode is the value with the highest frequency, 9.",
    },
    {
      after: "Find the median of 4, 9, 2, 7, 11, 6.",
      answer:
        "order first: 2, 4, 6, 7, 9, 11; with six values the median is the mean of the 3rd and 4th, (6 + 7)/2 = 6.5.",
    },
    {
      after: "A bar of height 3 has class width 5. What frequency does it represent?",
      answer: "frequency = height × width = 3 × 5 = 15.",
    },
  ],

  // A Level Mathematics: Measures of Variation and Standard Deviation
  "f1f5eeb9-8449-47ac-8dca-bf15caf51664": [
    {
      after: "Find the range of 3, 8, 12, 15, 22.",
      answer: "range = largest − smallest = 22 − 3 = 19.",
    },
    {
      after: "Find the standard deviation of 2, 4, 4, 6, 9.",
      answer:
        "mean = 25/5 = 5; deviations = −3, −1, −1, 1, 4; squares = 9, 1, 1, 1, 16 summing to 28; variance = 28/5 = 5.6, so sd = √5.6 = 2.37.",
    },
    {
      after: "x: 0, 1, 2 with f: 4, 3, 3. Find the mean.",
      answer: "mean = Σfx/Σf = (0×4 + 1×3 + 2×3)/(4 + 3 + 3) = 9/10 = 0.9.",
    },
    {
      after: "y = (x − 20)/4 has sd 2.5. Find the sd of x.",
      answer:
        "coding by y = (x − 20)/4 divides every deviation by 4, so sd(y) = sd(x)/4 and sd(x) = 4 × 2.5 = 10.",
    },
  ],

  // A Level Mathematics: Continuous Random Variables
  "e04cf551-2c45-4d65-b4b5-bd16e733c938": [
    {
      after: "f(x) = k on [0, 5]: find k.",
      answer: "the total area under a probability density is 1: ∫₀⁵ k dx = 5k = 1, so k = 1/5 = 0.2.",
    },
    {
      after: "For that f, find P(1 ≤ X ≤ 3).",
      answer: "P(1 ≤ X ≤ 3) = ∫₁³ 0.2 dx = 0.2 × (3 − 1) = 0.2 × 2 = 0.4.",
    },
    {
      after: "F(x) = x³/8 on [0, 2]: find f(x).",
      answer: "the density is the derivative of the CDF: f(x) = dF/dx = d/dx (x³/8) = 3x²/8.",
    },
    {
      after: "Uniform on [0, 4]: find Var(X).",
      answer: "for a uniform distribution Var(X) = (b − a)²/12 = (4 − 0)²/12 = 16/12 = 1.333.",
    },
  ],

  // A Level Mathematics: Trigonometry
  "9b34477c-27c5-4eb8-9a65-e4fb425f5edc": [
    {
      after: "Find sin 240° exactly.",
      answer:
        "240° is in the third quadrant, where sine is negative, with reference angle 240° − 180° = 60°, so sin 240° = −sin 60° = −√3/2.",
    },
    {
      after: "Solve tan θ = 1 for 0 ≤ θ ≤ 360°.",
      answer:
        "tangent is positive in the first and third quadrants and tan⁻¹(1) = 45°, so θ = 45° or θ = 180° + 45° = 225°.",
    },
    {
      after: "Find the area of a triangle with sides 6 cm and 9 cm and included angle 50°.",
      answer: "area = ½ab sin C = ½ × 6 × 9 × sin 50° = ½ × 54 × 0.766 = 20.7 cm².",
    },
    {
      after: "State the period and amplitude of y = 4 cos 3x.",
      answer: "for y = A cos(Bx), amplitude = |A| = 4 and period = 360°/B = 360°/3 = 120°.",
    },
  ],
};
