// Eleventh tranche of solved-answer working: Exponentials and Logarithms (AS),
// Bearings, Constructions and Loci (IGCSE), Integration (AS), Area, Perimeter
// and Volume (IGCSE) and Sets and Venn Diagrams (IGCSE).
//
// The two construction answers get a described method as well as a result —
// a construction mark is awarded for the compass work, which a sentence of
// instructions can stand in for in a written answer.
//
//   node .freebuff/gen-answer-fixes.cjs .freebuff/content-answer-working-k.cjs
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/answer-fixes.sql --apply

module.exports = {
  // A Level Mathematics: Exponentials and Logarithms (AS)
  "7b88a182-63f2-490e-9fe3-af5bde499827": [
    {
      after: "Find log₄64.",
      answer: "log₄64 asks for the power of 4 that gives 64, and 4³ = 64, so log₄64 = 3.",
    },
    {
      after: "Simplify log 8 + log 5 − log 2.",
      answer: "add first: log 8 + log 5 = log(8 × 5) = log 40, then subtract: log 40 − log 2 = log(40/2) = log 20.",
    },
    {
      after: "Write 3 ln 2 − ln 4 as a single logarithm.",
      answer: "3 ln 2 = ln 2³ = ln 8, so 3 ln 2 − ln 4 = ln 8 − ln 4 = ln(8/4) = ln 2.",
    },
  ],

  // Cambridge IGCSE Mathematics: Bearings, Constructions and Loci
  "153c8051-6b06-48ca-b39a-24d41b791d2c": [
    {
      after: "The bearing of X from Y is 128°. Find the bearing of Y from X.",
      answer:
        "a back bearing reverses direction, so add 180° when the bearing is below 180°: 128° + 180° = 308° (if the bearing exceeds 180°, subtract 180° instead).",
    },
    {
      after: "Describe how to construct the perpendicular bisector of a 6 cm segment.",
      answer:
        "set the compasses to more than half the segment — more than 3 cm — and draw arcs from each end both above and below it; the two crossings of the arcs give the points the bisector passes through, so join them, and every point on that line is equidistant from both ends.",
    },
    {
      after: "Shade the region inside a triangle that is closer to side AB than to side AC and within 2 cm of vertex A.",
      answer:
        "closer to AB than to AC means the half-plane on AB's side of the angle bisector of angle A, and within 2 cm of A means inside the circle of radius 2 cm centred on A; the shaded region is the intersection of those two, bounded by the bisector and the compass arc.",
    },
  ],

  // A Level Mathematics: Integration
  "3bc168f1-4a43-4e2f-9954-2f256539800e": [
    {
      after: "Find ∫(4x³ − 2) dx.",
      answer: "integrate term by term and add the constant: ∫4x³ dx = x⁴ and ∫2 dx = 2x, so the result is x⁴ − 2x + c.",
    },
    {
      after: "Find ∫x⁻² dx.",
      answer: "raise the power by one and divide by the new power: ∫x⁻² dx = x⁻¹/(−1) + c = −1/x + c.",
    },
    {
      after: "Evaluate ∫ from 0 to 2 of 3x² dx.",
      answer: "integrate, then substitute the limits: ∫₀² 3x² dx = [x³]₀² = 2³ − 0³ = 8.",
    },
  ],

  // Cambridge IGCSE Mathematics: Area, Perimeter and Volume
  "dce98df1-2982-40df-ab8c-b849b8d78ee1": [
    {
      after: "Convert 2.4 m² to cm² and 0.75 litres to cm³.",
      answer:
        "areas scale by the square of the length factor: 1 m² = 100 × 100 = 10 000 cm², so 2.4 m² = 2.4 × 10 000 = 24 000 cm²; volumes by the cube, and 1 litre = 1000 cm³, so 0.75 litres = 0.75 × 1000 = 750 cm³.",
    },
    {
      after: "Parallel sides 12 cm and 8 cm, height 6 cm. Find the area.",
      answer: "trapezium area = ½(a + b)h = ½(12 + 8) × 6 = ½ × 20 × 6 = 60 cm².",
    },
    {
      after: "Radius 3 cm, height 12 cm. Find the volume.",
      answer: "cylinder volume = πr²h = π × 3² × 12 = π × 9 × 12 = 339 cm³ (3 s.f.).",
    },
  ],

  // Cambridge IGCSE Mathematics: Sets and Venn Diagrams
  "dcbbe01b-cbb0-4e90-bf61-0ecc971a9467": [
    {
      after: "With A = {2, 4, 6, 8} in ξ above, list A′.",
      answer:
        "A′ is everything in ξ that is not in A: ξ = {1, 2, 3, 4, 5, 6, 7, 8} and A = {2, 4, 6, 8}, so A′ = {1, 3, 5, 7}.",
    },
    {
      after: "n(A) = 14, n(B) = 9, n(A ∩ B) = 4. Find n(A ∪ B).",
      answer:
        "the overlap is counted twice when the sizes are added, so take it off once: n(A ∪ B) = n(A) + n(B) − n(A ∩ B) = 14 + 9 − 4 = 19.",
    },
    {
      after: "A = even numbers; B = multiples of 5. Find n(A ∩ B).",
      answer:
        "A ∩ B holds the numbers that are both even and a multiple of 5, i.e. multiples of 10; up to 20 those are 10 and 20, so n(A ∩ B) = 2.",
    },
  ],
};
