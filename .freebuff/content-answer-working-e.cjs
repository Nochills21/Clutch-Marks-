// Fifth tranche of solved-answer working: Sequences and Series (A2), Further
// Algebra (A2), Statistics and Data Handling (OL) and Ratio, Rate and Proportion
// (OL). Same standard and same generator as -d.cjs: name the question, give the
// relation and the numbers, end with the result.
//
// Conceptual comparisons ("B is faster but less consistent") stay as they are:
// there is no arithmetic to show, and the examiner wants the judgement.
//
//   node .freebuff/gen-answer-fixes.cjs .freebuff/content-answer-working-e.cjs
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/answer-fixes.sql --apply

module.exports = {
  // A Level Mathematics: Sequences and Series
  "50449486-6299-42c5-9454-bfe5811a2e68": [
    {
      after: "Find S∞ of 5 + 2 + 0.8 + ...",
      answer: "S∞ = a/(1 − r) with a = 5 and r = 2/5 = 0.4, so S∞ = 5/(1 − 0.4) = 5/0.6 = 8⅓.",
    },
    {
      after: "For what x does 2 + 6x + 18x² + ... converge?",
      answer: "the common ratio is 3x, and a geometric series converges when |r| &lt; 1: |3x| &lt; 1, so |x| &lt; ⅓.",
    },
    {
      after: "Write 0.4545... as a fraction.",
      answer: "0.4545… = 0.45/(1 − 0.01) = 45/99 = 5/11, a geometric series with first term 0.45 and ratio 0.01.",
    },
    {
      after: "find the limit.",
      answer: "at the limit L = 0.2L + 8, so L − 0.2L = 8 and L = 8/0.8 = 10.",
    },
    {
      after: "Evaluate Σ from 1 to 10 of 5.",
      answer: "Σ from 1 to 10 of 5 = 5 × 10 = 50 — a constant summed n times is just n times the constant.",
    },
    {
      after: "Evaluate Σ from 1 to 15 of (2k + 1).",
      answer: "Σ(2k + 1) = 2Σk + Σ1 = 2 × (15 × 16/2) + 15 = 2(120) + 15 = 255.",
    },
    {
      after: "8000 pounds loses 10% annually. Value after 6 years?",
      answer: "each year multiplies by 0.9, so value = 8000(0.9)⁶ = 8000 × 0.5314 = 4252 pounds.",
    },
    {
      after: "The sum of 3 + 6 + 12 + ... exceeds 1000 first at which term?",
      answer:
        "Sₙ = a(rⁿ − 1)/(r − 1) = 3(2ⁿ − 1) &gt; 1000, so 2ⁿ &gt; 334.3 and n &gt; log₂334.3 = 8.39, giving n = 9.",
    },
  ],

  // A Level Mathematics: Further Algebra
  "7034932b-635a-4949-a7c1-e9df1bd9c136": [
    {
      after: "Find the remainder when x³ + 2x − 4 is divided by (x − 1).",
      answer: "by the remainder theorem the remainder is f(1) = 1³ + 2(1) − 4 = −1.",
    },
    {
      after: "Is (x + 3) a factor of x³ + 2x² − 5x + 6?",
      answer:
        "by the factor theorem (x + 3) is a factor only if f(−3) = 0: f(−3) = −27 + 18 + 15 + 6 = 12 ≠ 0, so it is not a factor.",
    },
    {
      after: "has (x − 2) as a factor. Find k.",
      answer: "a factor means f(2) = 0: 2³ + 2k − 6 = 8 + 2k − 6 = 0, so 2k = −2 and k = −1.",
    },
    {
      after: "Express 7/[(x − 1)(x + 6)].",
      answer:
        "7/((x − 1)(x + 6)) = A/(x − 1) + B/(x + 6), so 7 = A(x + 6) + B(x − 1); x = 1 gives A = 1 and x = −6 gives B = −1, i.e. 1/(x − 1) − 1/(x + 6).",
    },
    {
      after: "Express (2x + 1)/(x + 1)².",
      answer:
        "(2x + 1)/(x + 1)² = A/(x + 1) + B/(x + 1)², so 2x + 1 = A(x + 1) + B; comparing coefficients gives A = 2 and B = −1.",
    },
    {
      after: "Express (x² + 1)/(x + 1).",
      answer:
        "divide first: x² + 1 = (x + 1)(x − 1) + 2, so the quotient is x − 1 with remainder 2 — x − 1 + 2/(x + 1).",
    },
    {
      after: "Solve |x − 4| ≥ 3.",
      answer: "|x − 4| ≥ 3 means x − 4 ≥ 3 or x − 4 ≤ −3, giving x ≥ 7 or x ≤ 1.",
    },
    {
      after: "Solve (x − 2)/(x + 1) &lt; 1.",
      answer:
        "subtract 1: (x − 2 − x − 1)/(x + 1) &lt; 0, i.e. −3/(x + 1) &lt; 0; the numerator is negative, so the fraction is negative only when the denominator is positive: x + 1 &gt; 0, giving x &gt; −1.",
    },
  ],

  // Cambridge IGCSE Mathematics: Statistics and Data Handling
  "c4de73c5-5ba1-4192-a207-71e25ddd6870": [
    {
      after: "Find the mean and range of 12, 15, 11, 19, 13.",
      answer: "mean = (12 + 15 + 11 + 19 + 13)/5 = 70/5 = 14; range = largest − smallest = 19 − 11 = 8.",
    },
    {
      after: "Values 1, 2, 3 with frequencies 4, 7, 9. Find the mean.",
      answer: "mean = Σfx/Σf = (1 × 4 + 2 × 7 + 3 × 9)/(4 + 7 + 9) = (4 + 14 + 27)/20 = 45/20 = 2.25.",
    },
    {
      after: "Find the median of 2, 4, 4, 6, 9, 10.",
      answer: "there are six values, so the median is the mean of the 3rd and 4th: (4 + 6)/2 = 5.",
    },
    {
      after: "A sector of 90° represents 15 people. Find the total.",
      answer: "90° is 90/360 = ¼ of the circle, so the total is 15 ÷ ¼ = 15 × 4 = 60 people.",
    },
    {
      after: "A bar of width 5 has frequency density 4. Find its frequency.",
      answer: "frequency = frequency density × class width = 4 × 5 = 20.",
    },
    {
      after: "Class 30–50 has frequency 24. Find the frequency density.",
      answer: "class width = 50 − 30 = 20, so frequency density = frequency/width = 24/20 = 1.2.",
    },
  ],

  // Cambridge IGCSE Mathematics: Ratio, Rate and Proportion
  "37923030-dd6a-49eb-b200-0cdfef605eea": [
    {
      after: "Share 360 in the ratio 5 : 7.",
      answer: "the ratio has 5 + 7 = 12 parts, so one part is 360/12 = 30 and the shares are 5 × 30 = 150 and 7 × 30 = 210.",
    },
    {
      after: "Simplify 40 minutes : 2 hours.",
      answer: "convert to the same unit first: 2 hours = 120 minutes, so 40 : 120 = 1 : 3.",
    },
    {
      after: "8 m of cloth costs $52. Find the cost of 13 m.",
      answer: "unit cost = 52/8 = $6.50 per metre, so 13 m costs 13 × 6.50 = $84.50.",
    },
    {
      after: "4 taps fill a tank in 45 minutes. How long for 6 taps?",
      answer: "the work is constant: 4 × 45 = 180 tap-minutes, so 6 taps take 180/6 = 30 minutes.",
    },
    {
      after: "y ∝ x² and y = 50 when x = 5. Find y when x = 8.",
      answer: "y = kx², so 50 = k(5²) = 25k and k = 2; at x = 8, y = 2(8²) = 128.",
    },
    {
      after: "A train covers 210 km in 2 h 20 min. Find its average speed.",
      answer: "2 h 20 min = 2 + 20/60 = 2⅓ h, so average speed = 210 ÷ (7/3) = 90 km/h.",
    },
    {
      after: "150 cm³ of a liquid has mass 120 g. Find the mass of 1 litre.",
      answer: "density = m/V = 120/150 = 0.8 g/cm³, so 1 litre = 1000 cm³ has mass 1000 × 0.8 = 800 g.",
    },
    {
      after: "A map scale is 1 : 50 000. Two points are 7 cm apart on the map.",
      answer: "real distance = 7 × 50 000 = 350 000 cm, and 350 000 cm ÷ 100 000 = 3.5 km.",
    },
  ],
};
