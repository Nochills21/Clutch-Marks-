// Batch r4: deepens seven thin notes toward 3000+ characters.
// Consumed by .freebuff/extend-materials.cjs. No backticks and no dollar-brace sequences.
module.exports = {
  expectType: "notes",
  rows: {
    "8070ed35-c07d-4ba4-bba0-9dfbe1a79c80": `
<h3>Worked example: solving sin 2x = cos x</h3>
<p>Solve sin 2x = cos x for 0 ≤ x ≤ 2π. Using the double angle formula, 2 sin x cos x = cos x. Move everything to one side and factorise: cos x (2 sin x − 1) = 0. So cos x = 0, giving x = π/2 or 3π/2, or sin x = ½, giving x = π/6 or 5π/6. The four solutions are π/6, π/2, 5π/6 and 3π/2. Dividing both sides by cos x at the start would lose the two solutions where cos x = 0, and that is the most common way to drop marks on this type of question.</p>
<h3>Exam method: choosing an identity</h3>
<p>Before you start, look at which angles appear. If the question mixes x and 2x, rewrite the double angle first so that everything is in one angle. Always state the range of solutions in the form the question asks for, in radians or degrees, and check that each answer lies inside the range. Substituting each answer back into the original equation is a quick way to catch a sign error.</p>
`,
    "9aeb73c7-e1de-4bae-bb5e-eb23ae83e3b3": `
<h3>Worked example: pressure of a fixed amount of gas</h3>
<p>A sample of 0.50 mol of ideal gas is at 300 K in a container of volume 2.0 × 10⁻³ m³. Using pV = nRT with R = 8.31 J K⁻¹ mol⁻¹, the pressure is p = (0.50 × 8.31 × 300) ÷ (2.0 × 10⁻³) ≈ 6.2 × 10⁵ Pa. If the same gas is heated to 600 K in a rigid container, the pressure doubles, because for a fixed amount of gas at constant volume p is proportional to T in kelvin. Converting temperatures to kelvin before multiplying is the step examiners check first.</p>
<h3>Exam method: units and conversions</h3>
<p>Convert cm³ to m³ by dividing by 1 000 000, and convert °C to K by adding 273 (or 273.15). Mass in grams must be turned into kilograms for kinetic energy calculations, and into moles using the molar mass. A quick unit check helps: pressure in pascals multiplied by volume in cubic metres gives joules, the unit of energy.</p>
`,
    "025cde37-5b9f-4913-bf5c-b8b4d99007af": `
<h3>Worked example: wave speed from frequency and wavelength</h3>
<p>A sound wave has frequency 680 Hz and wavelength 0.50 m. Using v = fλ, the speed is 680 × 0.50 = 340 m/s, close to the speed of sound in air. For an electromagnetic wave in a vacuum the same relation applies, with v = 3.0 × 10⁸ m/s. Take the wavelength from a displacement–distance graph and the period from a displacement–time graph, then use f = 1/T before substituting.</p>
<h3>Exam method: reading wave graphs</h3>
<p>On a displacement–distance graph, the wavelength is the distance between two adjacent points in phase, such as two successive crests, not the distance between a crest and a trough. On a displacement–time graph, the period is the time for one complete oscillation at a fixed point. Mark the values on the axes carefully, because many lost marks come from reading half a wavelength or half a period.</p>
`,
    "cad3375c-cc3e-4846-8a72-441509ebada1": `
<h3>Worked example: a lamp on a 6.0 V supply</h3>
<p>A lamp is connected across a 6.0 V supply and the current through it is 0.50 A. Its resistance is R = V ÷ I = 6.0 ÷ 0.50 = 12 Ω. The power transferred is P = VI = 6.0 × 0.50 = 3.0 W, so in 60 s the energy transferred is E = Pt = 3.0 × 60 = 180 J. Give the unit with each answer, and keep power (the rate) separate from energy (the total).</p>
<h3>Exam method: series and parallel totals</h3>
<p>In a series circuit the current is the same everywhere and the resistances add. In a parallel circuit the voltage across each branch is the same and the branch currents add. A quick check is that adding a resistor in parallel always lowers the total resistance, while adding one in series always raises it.</p>
`,
    "7034932b-635a-4949-a7c1-e9df1bd9c136": `
<h3>Worked example: remainder theorem</h3>
<p>Find the remainder when f(x) = x³ − 2x² + 3x − 4 is divided by (x − 2). By the remainder theorem, the remainder equals f(2) = 8 − 8 + 6 − 4 = 2. The same test checks for a factor: if the remainder is zero, then (x − 2) is a factor. Here f(1) = −2 ≠ 0, so (x − 1) is not a factor of f(x).</p>
<h3>Exam method: long division with a missing term</h3>
<p>When a polynomial is missing a term, write that term with a coefficient of zero before dividing, for example x⁴ + 3x² − 1 becomes x⁴ + 0x³ + 3x² + 0x − 1. Leaving out the placeholder is the usual cause of an incorrect quotient. Check the answer by multiplying the quotient by the divisor and adding the remainder; the result should give back the original polynomial.</p>
`,
    "d7503fbf-4726-4fd0-97ad-92a64510499b": `
<h3>Worked example: two aces without replacement</h3>
<p>Two cards are taken from a standard pack of 52 without replacement. The probability that both are aces is (4/52) × (3/51) = 12/2652 = 1/221. Because the second draw depends on the first, multiply along the branches of the tree diagram and use the reduced totals (51 cards, 3 aces) on the second branch. If the first card were replaced, the answer would be (4/52)² = 1/169 instead.</p>
<h3>Exam method: checking a tree diagram</h3>
<p>The probabilities on the branches leaving any node must add to 1, so check each node before you multiply. The final probabilities at the ends of the branches must also sum to 1. For a question asking for "at least one", it is usually quicker to find the probability of none and subtract it from 1.</p>
`,
    "e08e10e6-d123-407a-877f-dcc7c82c3d5b": `
<h3>Worked example: resultant force and acceleration</h3>
<p>A 2.0 kg trolley is pushed to the right with a force of 12 N, and friction opposes the motion with a force of 5.0 N. The resultant force is 12 − 5.0 = 7.0 N to the right. Using F = ma, the acceleration is a = 7.0 ÷ 2.0 = 3.5 m/s² in the direction of the resultant force. Find the resultant force first, taking the direction of each force into account, and only then apply F = ma.</p>
<h3>Exam method: units and wording in answers</h3>
<p>Mass must be in kilograms and force in newtons before you use F = ma; a mass in grams gives an answer 1000 times too large. Weight is a force measured in newtons and is not the same as mass. When asked why a moving object does not accelerate, state that the resultant force is zero, not that no forces act on it.</p>
`
  },
};
