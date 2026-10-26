// Inline symbol keys for the notes and summaries whose formulas had no key.
// Each edit is an exact-string splice against the live row: `find` occurs once,
// `replace` is the same text with the key added.
//
//   node .freebuff/apply-inline-keys.cjs .freebuff/content-inline-keys-4.cjs --dry
//   node .freebuff/apply-inline-keys.cjs .freebuff/content-inline-keys-4.cjs --apply
//
// Rows not edited here and why:
//   73-programming-paradigms-and-low-level  — the flagged "=" lines are Python
//     assignments inside code traces (self.__w = w); the identifiers are named
//     in the code itself, so a symbol key would be padding.
//   74-ethics-and-ai                        — contains no equations at all; the
//     audit match was prose.
module.exports = {
  edits: {
    /* Physics A2: Electric Fields and Capacitance ------------------------- */
    "e5f53156-8227-4f3c-92c7-dcdd8ea84914": [
      {
        find: "<li>Capacitors in series: 1/C = 1/C₁ + 1/C₂; in parallel: C = C₁ + C₂.</li></ul>",
        replace:
          "<li>Capacitors in series: 1/C = 1/C₁ + 1/C₂; in parallel: C = C₁ + C₂.</li></ul><p><em>Key:</em> F = force between the two point charges (N); Q, q = the two charges (C); ε₀ = permittivity of free space, 8.85 × 10⁻¹² F m⁻¹; r = separation of the charges (m); E = electric field strength (N C⁻¹); V = electric potential (V); C = capacitance (F); the stored energy is in joules when C is in farads and V in volts.</p>",
      },
    ],

    /* Physics A2: Nuclear Physics ---------------------------------------- */
    "379155d8-4a5c-418e-b3cc-ecd40080281d": [
      {
        find: "<li>Fission splits heavy nuclei and fusion joins light nuclei; both release energy when the product nuclei have higher binding energy per nucleon.</li></ul>",
        replace:
          "<li>Fission splits heavy nuclei and fusion joins light nuclei; both release energy when the product nuclei have higher binding energy per nucleon.</li></ul><p><em>Key:</em> ᴬZX — A = nucleon number, Z = proton number, X = the element; Δm = mass defect (kg); c = speed of light, 3.00 × 10⁸ m s⁻¹; E = energy released (J); A = activity (Bq, one decay per second); λ = decay constant (s⁻¹); N = number of undecayed nuclei at that instant; T½ = half-life (s).</p>",
      },
    ],

    /* Physics A2: Oscillations and Waves II ------------------------------ */
    "2e10ac10-f110-4a0e-a462-9d0eec4f6a62": [
      {
        find: "<li>Stationary waves form from superposition of two travelling waves of the same frequency and amplitude moving in opposite directions.</li></ul>",
        replace:
          "<li>Stationary waves form from superposition of two travelling waves of the same frequency and amplitude moving in opposite directions.</li></ul><p><em>Key:</em> f = fundamental frequency (Hz); v = speed of the wave along the string (m s⁻¹); L = length between the two fixed ends (m); the harmonic number is a whole number, not a unit.</p>",
      },
    ],

    /* Chemistry A2: Redox Equilibria ------------------------------------- */
    "a5238e13-ce47-4f35-ac65-3e5c4ba3ab51": [
      {
        find: "The cell diagram is written as Zn(s) | Zn(2+)(aq) || Cu(2+)(aq) | Cu(s).</p>",
        replace:
          "The cell diagram is written as Zn(s) | Zn(2+)(aq) || Cu(2+)(aq) | Cu(s).</p><p><em>Key:</em> Eo = standard electrode potential (V), measured against the standard hydrogen electrode at 298 K, 100 kPa and 1.00 mol dm⁻³; Eo cell = standard cell emf (V); the half-cell written on the right of the diagram is the one that undergoes reduction, so Eo cell = Eo right − Eo left, and a positive value means the reaction as written is thermodynamically feasible.</p>",
      },
    ],

    /* Chemistry A2: Transition Metals and their Chemistry ---------------- */
    "432c26cc-2a4f-4b4a-addd-b063dae00039": [
      {
        find: "<p>How to use this: skim the list above",
        replace:
          "<p><em>Key:</em> Cr₂O₇²⁻ = dichromate(VI) ion; CrO₄²⁻ = chromate(VI) ion; H⁺ = hydrogen ion; H₂O = water; the dichromate–chromate line is an equilibrium, so adding acid shifts it left and adding alkali shifts it right; Eo = standard electrode potential (V); ΔSsystem = total entropy change of the system (J K⁻¹ mol⁻¹).</p><p>How to use this: skim the list above",
      },
    ],

    /* Mathematics AS: Circular Measure ----------------------------------- */
    "7a971f20-7ee9-4a15-9c5d-d0b0420228e0": [
      {
        find: "add the two radii to the arc length, and give units in your final answer.</p>",
        replace:
          "add the two radii to the arc length, and give units in your final answer. <em>Key:</em> s = arc length (cm); r = radius (cm); θ = angle at the centre in radians; A = area (cm²), in the same length unit squared.</p>",
      },
    ],

    /* Biology OL: Excretion in Humans ------------------------------------ */
    "d4b4bf03-7fd4-4d21-9c65-0a7f3841e11b": [
      {
        find: "show mass = concentration × volume in every calculation).</p>",
        replace:
          "show mass = concentration × volume in every calculation. <em>Key:</em> mass = mass of urea removed (g); concentration = blood urea concentration (g dm⁻³); volume = volume of blood processed by the machine (dm³), so the units cancel to grams.</p>",
      },
    ],

    /* Mathematics AS: Coordinate Geometry -------------------------------- */
    "394cb753-26fe-47fd-a973-3989e8116211": [
      {
        find: "A tangent meets the radius at right angles, so find the radius gradient first and take its negative reciprocal.</p>",
        replace:
          "A tangent meets the radius at right angles, so find the radius gradient first and take its negative reciprocal.</p><p><em>Key:</em> m = gradient (no units); (x₁, y₁) and (x₂, y₂) = the coordinates of the two points (no units); a, b, c = the coefficients of ax + by + c = 0; (a, b) = the centre of the circle; r = radius; m₁ × m₂ = −1 for a perpendicular pair.</p>",
      },
    ],

    /* Mathematics AS: Integration ---------------------------------------- */
    "6d372466-7990-438f-ac73-a0c8b8a657d2": [
      {
        find: "Check whether the question asks for an exact value or a decimal to the required accuracy.</p>",
        replace:
          "Check whether the question asks for an exact value or a decimal to the required accuracy.</p><p><em>Key:</em> ∫ = the integral sign, the accumulated area under the curve; x = the variable of integration; n = the power of x, with n ≠ −1; a = the constant multiplying xⁿ; c = the constant of integration, needed for every indefinite integral.</p>",
      },
    ],

    /* Mathematics A2: Differentiation II --------------------------------- */
    "75a8a9e4-15af-43f6-9395-1a37660fd65d": [
      {
        find: "Identify the outer and inner functions before you differentiate.</p>",
        replace:
          "Identify the outer and inner functions before you differentiate. <em>Key:</em> y = the function being differentiated; x = the variable; u and v = the two functions in a product or a quotient; f and g = the outer and inner functions of a composite, with f′ evaluated at g(x).</p>",
      },
    ],

    /* Mathematics A2: Further Algebra ------------------------------------ */
    "31047ce2-126a-4ce6-b0af-ce1049258953": [
      {
        find: "The remainder when dividing by (x − a) equals p(a).</p>",
        replace:
          "The remainder when dividing by (x − a) equals p(a). <em>Key:</em> p(x) = the polynomial being divided; (x − a) = the linear divisor, so a is the value that makes it zero; q(x) = the quotient; r = the remainder, a constant when the divisor is linear; A and B = the unknown numerators of the partial fractions.</p>",
      },
    ],

    /* Biology AS: Molecules, Transport and Health ------------------------- */
    "bea89e3b-8399-45c8-a121-0ba720102b40": [
      {
        find: "and were confounding factors such as diet and exercise accounted for).</p>",
        replace:
          "and were confounding factors such as diet and exercise accounted for).</p><p><em>Key:</em> relative risk = risk in the exposed group ÷ risk in the unexposed group (no units); BMI = body mass index (kg m⁻²), with mass in kg and height in m; waist-to-hip ratio = waist circumference ÷ hip circumference (no units, both measured in the same unit).</p>",
      },
    ],

    /* Biology AS: Membranes, Proteins, DNA and Gene Expression (notes) ---- */
    "0f02b6a6-e605-4244-b79a-ae4b44c853c6": [
      {
        find: "A ratio alone earns less than the full working.</li>",
        replace:
          "A ratio alone earns less than the full working. <em>Key:</em> AA = homozygous dominant; Aa = heterozygote; aa = homozygous recessive; the numbers 1 : 2 : 1 are the expected proportions of those genotypes among the offspring, not counts unless the family is large.</li>",
      },
    ],

    /* Biology AS: Membranes, Proteins, DNA and Gene Expression (summary) -- */
    "7a6d8b02-5114-40ad-b1cf-94a699d3a6bb": [
      {
        find: "Heterozygosity index: in a population of 20 individuals at one locus, 8 are heterozygotes → H = 8/20 = 0.40.</p>",
        replace:
          "Heterozygosity index: in a population of 20 individuals at one locus, 8 are heterozygotes → H = 8/20 = 0.40. <em>Key:</em> H = heterozygosity index (a proportion, no units); 8 = the number of heterozygotes at that locus; 20 = the number of individuals sampled; a value near 1 means most individuals are heterozygous.</p>",
      },
    ],

    /* Computer Science AS: Processor Fundamentals ------------------------ */
    "a836a83d-d4a7-469e-8654-2518686bb60e": [
      {
        find: "the sequential quarter, which is the whole point of the question.</code></pre>",
        replace:
          "the sequential quarter, which is the whole point of the question.</code></pre><p><em>Key:</em> speed-up = time on one core ÷ time on n cores (a factor, no units); 0.25 = the fraction of the program that cannot be parallelised; 0.75 = the parallel fraction; 8 = the number of cores. As the core count grows, the gain approaches 1 ÷ the sequential fraction — here 4.</p>",
      },
    ],
  },
};
