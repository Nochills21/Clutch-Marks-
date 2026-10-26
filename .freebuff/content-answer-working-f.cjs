// Sixth tranche of solved-answer working: Differentiation II (A2) and
// Probability (IGCSE). Every answer now states the rule, puts the numbers in,
// and finishes with the result — the mark scheme's own three steps.
//
//   node .freebuff/gen-answer-fixes.cjs .freebuff/content-answer-working-f.cjs
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/answer-fixes.sql --apply

module.exports = {
  // A Level Mathematics: Differentiation II
  "39e37ac0-41b8-4d23-8d69-64e36dfd77af": [
    {
      after: "Differentiate (2x − 1)⁴.",
      answer: "chain rule: dy/dx = 4(2x − 1)³ × d/dx(2x − 1) = 4(2x − 1)³ × 2 = 8(2x − 1)³.",
    },
    {
      after: "Differentiate x³e^x.",
      answer: "product rule: dy/dx = u′v + uv′ = 3x²e^x + x³e^x = x²e^x(3 + x).",
    },
    {
      after: "Differentiate (x + 1)/(x − 1).",
      answer:
        "quotient rule: dy/dx = (u′v − uv′)/v² = (1(x − 1) − (x + 1)(1))/(x − 1)² = (x − 1 − x − 1)/(x − 1)² = −2/(x − 1)².",
    },
    {
      after: "x² + y² = 16: find dy/dx.",
      answer: "differentiate implicitly: 2x + 2y(dy/dx) = 0, so dy/dx = −2x/2y = −x/y.",
    },
    {
      after: "Same circle at (2, √12): gradient?",
      answer: "dy/dx = −x/y, so at (2, √12) the gradient is −2/√12 = −2/3.464 = −0.577.",
    },
    {
      after: "x = t², y = 2t + 1: find dy/dx.",
      answer: "parametric: dy/dx = (dy/dt) ÷ (dx/dt) = 2 ÷ 2t = 1/t.",
    },
    {
      after: "V = s³, ds/dt = 1.5, s = 4. Find dV/dt.",
      answer: "chain rule: dV/dt = (dV/ds)(ds/dt) = 3s² × 1.5 = 3(4²) × 1.5 = 48 × 1.5 = 72 cm³ s⁻¹.",
    },
    {
      after: "y = x²e^x: find the stationary points.",
      answer:
        "product rule: dy/dx = 2xe^x + x²e^x = e^x(x² + 2x) = xe^x(x + 2), which is zero at x = 0 and x = −2.",
    },
  ],

  // Cambridge IGCSE Mathematics: Probability
  "120ecca6-69da-44e7-8537-beda4c42532d": [
    {
      after: "P(A) = 0.35. Find P(not A).",
      answer: "complement rule: P(not A) = 1 − P(A) = 1 − 0.35 = 0.65.",
    },
    {
      after: "A bag has 4 green and 6 yellow balls. Find P(green).",
      answer: "P(green) = favourable/total = 4/(4 + 6) = 4/10 = 2/5.",
    },
    {
      after: "A spinner has probabilities 0.2, 0.3, 0.4 and x. Find x.",
      answer: "all outcomes together make a certainty: x = 1 − (0.2 + 0.3 + 0.4) = 1 − 0.9 = 0.1.",
    },
    {
      after: "P(A) = 0.6, P(B) = 0.5, independent. Find P(A and B) and P(A or B).",
      answer:
        "independent means multiply: P(A and B) = 0.6 × 0.5 = 0.3, and P(A or B) = P(A) + P(B) − P(A and B) = 0.6 + 0.5 − 0.3 = 0.8.",
    },
    {
      after: "Two draws without replacement from 5 red, 3 blue. Find P(both blue).",
      answer:
        "without replacement the second draw is from 7 balls: P(both blue) = 3/8 × 2/7 = 6/56 = 3/28.",
    },
    {
      after: "A biased coin has P(head) = 0.4. Tossed twice, find P(at least one head).",
      answer: "use the complement: P(at least one head) = 1 − P(no head) = 1 − 0.6² = 1 − 0.36 = 0.64.",
    },
    {
      after: "400 seeds are planted; 340 germinate. Estimate the germination probability.",
      answer: "relative frequency estimates probability: 340/400 = 0.85.",
    },
    {
      after: "In a class, 12 of 20 boys and 8 of 15 girls wear glasses. Find P(wears glasses | boy).",
      answer:
        "the condition shrinks the sample space to the 20 boys: P(glasses | boy) = 12/20 = 3/5, since the girls' numbers are irrelevant once a boy is given.",
    },
  ],
};
