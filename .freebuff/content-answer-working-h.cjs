// Eighth tranche of solved-answer working: Mechanics M1 (AS) and Exponentials
// and Logarithms (A2). Mechanics answers must show the suvat relation, the
// numbers and the unit; a bare "3 m/s²" teaches a student nothing they can
// reproduce under exam pressure.
//
//   node .freebuff/gen-answer-fixes.cjs .freebuff/content-answer-working-h.cjs
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/answer-fixes.sql --apply

module.exports = {
  // A Level Mathematics: Mechanics M1
  "cb996b1e-2ddd-4e29-87e4-a19c3f0a97db": [
    {
      after: "u = 4, a = 3, t = 5. Find s.",
      answer: "s = ut + ½at² = 4(5) + ½(3)(5²) = 20 + 37.5 = 57.5 m.",
    },
    {
      after: "A v–t graph rises 0 to 20 m/s in 4 s, then falls to 0 in 2 s. Distance?",
      answer:
        "distance is the area under a v–t graph: ½ × 4 × 20 + ½ × 2 × 20 = 40 + 20 = 60 m.",
    },
    {
      after: "12 kg, resultant 36 N. Find a.",
      answer: "Newton's second law: F = ma, so a = F/m = 36/12 = 3 m/s².",
    },
    {
      after: "Smooth slope at 20°, mass 5 kg. Find a.",
      answer:
        "the only force along a smooth slope is the weight component mg sin θ, so a = g sin 20° = 9.8 × 0.342 = 3.35 m/s² (the mass cancels).",
    },
    {
      after: "6 kg and 4 kg over a smooth pulley. Find a.",
      answer:
        "net force = (m₁ − m₂)g and total mass moved = m₁ + m₂, so a = (6 − 4)(9.8)/(6 + 4) = 19.6/10 = 1.96 m/s².",
    },
  ],

  // A Level Mathematics: Exponentials and Logarithms
  "b9b130df-e3f7-41f1-9347-ac8773a9fe71": [
    {
      after: "Find ln(e³).",
      answer: "ln and e are inverses, and ln(e³) = 3 ln e = 3 × 1 = 3.",
    },
    {
      after: "Simplify ln 12 − ln 3.",
      answer: "the quotient law: ln a − ln b = ln(a/b), so ln 12 − ln 3 = ln(12/3) = ln 4.",
    },
    {
      after: "y = e^(2x) ln x. Use the product rule.",
      answer:
        "product rule: dy/dx = (2e^(2x))(ln x) + e^(2x)(1/x) = 2e^(2x) ln x + e^(2x)/x.",
    },
    {
      after: "∫ (1/(2x)) dx.",
      answer:
        "take out the constant: ½∫ (1/x) dx = ½ ln|x| + c. Writing it as ½ ln|2x| + c′ is the same family, since ½ ln|2x| = ½ ln|x| + ½ ln 2 and that extra ½ ln 2 is absorbed into the constant.",
    },
    {
      after: "ln y = 0.5x + 2. Find y.",
      answer: "exponentiate both sides: y = e^(0.5x + 2) = e² × e^(0.5x) = 7.39e^(0.5x).",
    },
  ],
};
