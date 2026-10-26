// Lesson inline symbol keys — batch 1 (26 lessons, keys where a real relation
// is stated). Each `find` is copied character-for-character from the dumped
// lesson body and must occur exactly once; `replace` is that same fragment
// with the key added inside its own container (<li> stays <li>).
//
//   node .freebuff/apply-inline-keys.cjs .freebuff/content-lesson-keys-1.cjs
module.exports = {
  edits: {
    /* Biology AS — cell structure: magnification */
    "e314c6d9-e0e5-43a2-af28-9f30843c571a": [
      {
        find: "<li>Magnification = image size ÷ actual size. For an image 40 mm across at a magnification of ×400, the actual size is 0.1 mm.</li>",
        replace:
          "<li>Magnification = image size ÷ actual size. For an image 40 mm across at a magnification of ×400, the actual size is 0.1 mm. <em>Key:</em> magnification is a ratio with no unit; image size and actual size are measured in the same unit, so the units cancel.</li>",
      },
    ],

    /* Biology AS — molecules, transport and health: BMI */
    "43e27e22-c8ef-4002-9d12-0c4870925c42": [
      {
        find: "<li>Body mass index (BMI) = mass (kg) ÷ height² (m²). Diet, exercise and cholesterol intake affect the risk of cardiovascular disease.</li>",
        replace:
          "<li>Body mass index (BMI) = mass (kg) ÷ height² (m²). Diet, exercise and cholesterol intake affect the risk of cardiovascular disease. <em>Key:</em> BMI = body mass index in kg m⁻²; mass in kilograms; height in metres, already squared.</li>",
      },
    ],

    /* Biology A2 — respiration: RQ */
    "ed7ad040-8076-4580-b28d-853bc172d8d8": [
      {
        find: "<li>RQ = volume of CO₂ produced ÷ volume of O₂ consumed. Carbohydrate gives an RQ of about 1.0 and fat gives about 0.7.</li>",
        replace:
          "<li>RQ = volume of CO₂ produced ÷ volume of O₂ consumed. Carbohydrate gives an RQ of about 1.0 and fat gives about 0.7. <em>Key:</em> RQ = respiratory quotient (no units, because it is a volume divided by a volume); both gases are measured at the same temperature and pressure.</li>",
      },
    ],

    /* Chemistry AS — formulae, equations and amount of substance */
    "6f39713e-2825-445a-88c0-522cbd27112c": [
      {
        find: "<li>Moles: n = m / M. Rearrange to find mass (m = n × M) or molar mass (M = m / n).</li>",
        replace:
          "<li>Moles: n = m / M. Rearrange to find mass (m = n × M) or molar mass (M = m / n). <em>Key:</em> n = amount of substance (mol); m = mass (g); M = molar mass (g mol⁻¹).</li>",
      },
      {
        find: "<li>The molecular formula is a whole-number multiple of the empirical formula: n = Mr / Mr(empirical formula).</li>",
        replace:
          "<li>The molecular formula is a whole-number multiple of the empirical formula: n = Mr / Mr(empirical formula). <em>Key:</em> n = the whole-number multiple (no units); Mr = relative molecular mass, which has no unit either, because it is a ratio against ¹²C.</li>",
      },
      {
        find: "<li>Percentage yield = actual yield / theoretical yield × 100.</li>",
        replace:
          "<li>Percentage yield = actual yield / theoretical yield × 100. <em>Key:</em> both yields are expressed in the same unit (usually g), so the percentage carries no unit.</li>",
      },
      {
        find: "<li>Concentration c = n / V, with V in dm³ (cm³ ÷ 1000). Titration data follow the same route.</li>",
        replace:
          "<li>Concentration c = n / V, with V in dm³ (cm³ ÷ 1000). Titration data follow the same route. <em>Key:</em> c = concentration (mol dm⁻³); n = amount of solute (mol); V = volume of solution (dm³).</li>",
      },
      {
        find: "<li>At room temperature and pressure one mole of gas occupies 24 dm³, so n = V / 24.</li>",
        replace:
          "<li>At room temperature and pressure one mole of gas occupies 24 dm³, so n = V / 24. <em>Key:</em> n = amount of gas (mol); V = gas volume at rtp (dm³); 24 = the volume one mole occupies at rtp (dm³ mol⁻¹).</li>",
      },
    ],

    /* Chemistry AS — kinetics and equilibria: Kc */
    "38db0b32-fe11-4ac6-a123-7520a2a00735": [
      {
        find: "<li>Equilibrium constant Kc = [products]^n / [reactants]^m, with each concentration raised to the power of its coefficient. Kc is constant for a given temperature.</li>",
        replace:
          "<li>Equilibrium constant Kc = [products]^n / [reactants]^m, with each concentration raised to the power of its coefficient. Kc is constant for a given temperature. <em>Key:</em> [products] and [reactants] = equilibrium concentrations (mol dm⁻³); n and m = the stoichiometric powers taken from the balanced equation (no units).</li>",
      },
    ],

    /* Chemistry A2 — acid-base equilibria */
    "8a72faad-7e00-4417-bc9b-4a2bab23c111": [
      {
        find: "<li>A strong acid dissociates completely in water, so [H⁺] equals the acid concentration. For 0.010 mol dm⁻³ HCl, [H⁺] = 0.010 and pH = 2.00.</li>",
        replace:
          "<li>A strong acid dissociates completely in water, so [H⁺] equals the acid concentration. For 0.010 mol dm⁻³ HCl, [H⁺] = 0.010 and pH = 2.00. <em>Key:</em> [H⁺] = hydrogen ion concentration (mol dm⁻³); pH = −log₁₀[H⁺], and pH itself has no unit.</li>",
      },
      {
        find: "<li>A weak acid dissociates only partly. For HA ⇌ H⁺ + A⁻, Ka = [H⁺][A⁻] / [HA].</li>",
        replace:
          "<li>A weak acid dissociates only partly. For HA ⇌ H⁺ + A⁻, Ka = [H⁺][A⁻] / [HA]. <em>Key:</em> Ka = acid dissociation constant (mol dm⁻³); [HA] = concentration of the undissociated acid (mol dm⁻³); A⁻ = the conjugate base.</li>",
      },
      {
        find: "<li>pKa = −log10 Ka. A smaller pKa means a stronger acid.</li>",
        replace:
          "<li>pKa = −log10 Ka. A smaller pKa means a stronger acid. <em>Key:</em> pKa has no unit because Ka, a concentration, is taken logarithmically; the smaller the pKa, the stronger the acid.</li>",
      },
      {
        find: "<li>pH = −log10[H⁺]. For a base, find pOH = −log10[OH⁻] and use pH = 14.00 − pOH at 298 K.</li>",
        replace:
          "<li>pH = −log10[H⁺]. For a base, find pOH = −log10[OH⁻] and use pH = 14.00 − pOH at 298 K. <em>Key:</em> [OH⁻] = hydroxide ion concentration (mol dm⁻³); pOH has no unit; 14.00 = −log₁₀ Kw at 298 K.</li>",
      },
      {
        find: "<li>Kw = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴ mol² dm⁻⁶ at 298 K.</li>",
        replace:
          "<li>Kw = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴ mol² dm⁻⁶ at 298 K. <em>Key:</em> Kw = ionic product of water, whose units are (mol dm⁻³)², and it is fixed once the temperature is 298 K.</li>",
      },
      {
        find: "<li>The pH of a buffer is given by pH = pKa + log([A⁻] / [HA]). When [A⁻] = [HA], pH = pKa.</li>",
        replace:
          "<li>The pH of a buffer is given by pH = pKa + log([A⁻] / [HA]). When [A⁻] = [HA], pH = pKa. <em>Key:</em> [A⁻] = conjugate-base concentration (mol dm⁻³); [HA] = weak-acid concentration (mol dm⁻³); the log is base 10, so the ratio must be dimensionless.</li>",
      },
    ],

    /* Chemistry A2 — chemical equilibria: Kc and Kp expressions */
    "df9d6640-623f-41fc-aa79-e2adcb909131": [
      {
        find: "<li>For aA + bB ⇌ cC + dD, Kc = [C]^c [D]^d / ([A]^a [B]^b). Only species in solution or gas phase appear in the expression.</li>",
        replace:
          "<li>For aA + bB ⇌ cC + dD, Kc = [C]^c [D]^d / ([A]^a [B]^b). Only species in solution or gas phase appear in the expression. <em>Key:</em> a, b, c, d = stoichiometric coefficients from the balanced equation (no units); [X] = equilibrium concentration of X (mol dm⁻³).</li>",
      },
      {
        find: "<li>Kp uses partial pressures instead of concentrations. For N2O4 ⇌ 2NO2, Kp = p(NO2)² / p(N2O4).</li>",
        replace:
          "<li>Kp uses partial pressures instead of concentrations. For N2O4 ⇌ 2NO2, Kp = p(NO2)² / p(N2O4). <em>Key:</em> p(X) = partial pressure of X at equilibrium (Pa or atm); the powers 2 and 1 are the coefficients from the balanced equation.</li>",
      },
    ],

    /* Chemistry A2 — kinetics: rate equation, half-life, Arrhenius */
    "69478e65-90a1-4b72-959d-ab80797e6c72": [
      {
        find: "<li>The rate equation has the form rate = k[A]^m[B]^n. The powers m and n are the orders with respect to A and B, and they must be found from experimental data.</li>",
        replace:
          "<li>The rate equation has the form rate = k[A]^m[B]^n. The powers m and n are the orders with respect to A and B, and they must be found from experimental data. <em>Key:</em> rate = reaction rate (mol dm⁻³ s⁻¹); k = rate constant, whose units depend on the overall order; [A], [B] = concentrations (mol dm⁻³); m, n = orders (no units).</li>",
      },
      {
        find: "<li>For a first-order reaction, the half-life is constant and given by t½ = ln 2 / k = 0.693 / k.</li>",
        replace:
          "<li>For a first-order reaction, the half-life is constant and given by t½ = ln 2 / k = 0.693 / k. <em>Key:</em> t½ = half-life (s); ln 2 = 0.693, a number with no units; k = first-order rate constant (s⁻¹).</li>",
      },
      {
        find: "<li>The Arrhenius equation k = A e^(−Ea/RT) relates the rate constant to temperature. Taking natural logarithms gives ln k = ln A − Ea/(RT).</li>",
        replace:
          "<li>The Arrhenius equation k = A e^(−Ea/RT) relates the rate constant to temperature. Taking natural logarithms gives ln k = ln A − Ea/(RT). <em>Key:</em> A = pre-exponential factor (same units as k); Ea = activation energy (J mol⁻¹); R = gas constant (8.31 J K⁻¹ mol⁻¹); T = temperature (K).</li>",
      },
    ],

    /* Chemistry A2 — organic synthesis: percentage yield */
    "a79822f6-6df8-4c27-afd5-b1b6ff9887fb": [
      {
        find: "<li>Percentage yield = actual mass ÷ theoretical mass × 100.</li>",
        replace:
          "<li>Percentage yield = actual mass ÷ theoretical mass × 100. <em>Key:</em> both masses are in the same unit (g), so the percentage has no unit; the theoretical mass comes from the limiting reagent.</li>",
      },
    ],

    /* Chemistry A2 — redox equilibria: E⁰cell and ΔG = −nFE */
    "985eb4a7-fa78-48d3-a2cb-4799ca1239ad": [
      {
        find: "<li>E⁰cell = E⁰(reduction) − E⁰(oxidation). A positive E⁰cell means the reaction is feasible under standard conditions.</li>",
        replace:
          "<li>E⁰cell = E⁰(reduction) − E⁰(oxidation). A positive E⁰cell means the reaction is feasible under standard conditions. <em>Key:</em> E⁰ = standard electrode potential (V), measured at 298 K, 100 kPa and 1.00 mol dm⁻³.</li>",
      },
      {
        find: "<li>ΔG = −nFE. A negative ΔG (positive E⁰cell) means the reaction is spontaneous.</li>",
        replace:
          "<li>ΔG = −nFE. A negative ΔG (positive E⁰cell) means the reaction is spontaneous. <em>Key:</em> ΔG = standard Gibbs free energy change (J mol⁻¹); n = moles of electrons transferred (mol); F = Faraday constant (96 500 C mol⁻¹); E = cell e.m.f. (V).</li>",
      },
    ],

    /* CS OL — data representation: bitmap file size */
    "b0e30a64-512f-4703-8718-836878ff7f92": [
      {
        find: "<li>Bitmap: pixels; colour depth = bits per pixel. File size (bits) = W × H × depth. Metadata (width, height, depth) stores dimensions.</li>",
        replace:
          "<li>Bitmap: pixels; colour depth = bits per pixel. File size (bits) = W × H × depth. Metadata (width, height, depth) stores dimensions. <em>Key:</em> W = width in pixels; H = height in pixels; depth = bits used per pixel; the product is in bits, so divide by 8 for bytes.</li>",
      },
    ],

    /* CS AS — hardware and logic gates: Boolean laws and the half adder */
    "3eb037f5-0669-498e-a504-188fdef8b532": [
      {
        find: "<li>Absorption: A + A·B = A</li>",
        replace:
          "<li>Absorption: A + A·B = A <em>Key:</em> A, B and C are Boolean variables that hold 0 or 1; · means AND and + means OR, so these laws are algebra for logic, not arithmetic.</li>",
      },
      {
        find: "<p>Truth table → Boolean expression → gates. A half adder: S = A XOR B, C = A AND B.</p>",
        replace:
          "<p>Truth table → Boolean expression → gates. A half adder: S = A XOR B, C = A AND B. <em>Key:</em> A and B = the two input bits; S = sum output bit; C = carry output bit; all four are 0 or 1.</p>",
      },
    ],
  },
};