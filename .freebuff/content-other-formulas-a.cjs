// Keyed equation sections for the worst note in four subjects, each equation
// followed by a symbol key in the same paragraph.
//
//   Mathematics A2  A Level Mathematics: Exponentials and Logarithms (85)
//   Mathematics AS  AS Level Mathematics: Exponentials and Logarithms  (80)
//   Chemistry OL    IGCSE Chemistry: Stoichiometry and the Mole        (45)
//   Biology OL      IGCSE Biology: Enzymes                             (5)
//
// Notation: Unicode (Δ, λ, ρ, π, √, ⁻¹, ⇔), no LaTeX.
//
// Apply with:
//   node .freebuff/append-note-sections.cjs .freebuff/content-other-formulas-a.cjs
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/note-formulas.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/note-formulas.sql --apply    (live)

const HEAD = `<h2>Equations and symbols</h2>
<p>Every relation this topic is examined on, written with its real notation and followed by a key naming each symbol, its unit and what it means. Where a law has a second useful form both are given, so the rearrangement in the exam is mechanical rather than a thing to rediscover under time pressure.</p>`;

const sections = {
  /* ── Mathematics A2: exponentials and logarithms ─────────────────────── */
  "b9b130df-e3f7-41f1-9347-ac8773a9fe71": {
    slug: "maths-a2-exponentials",
    html: `${HEAD}
<h3>Definition, laws and change of base</h3>
<p><strong>y = aˣ ⇔ x = log_a y</strong><br><em>Key:</em> a = base, a &gt; 0 and a ≠ 1; x = the exponent; y = the result, always positive. The logarithm is defined as the inverse of the exponential, which is why log_a y exists only for y &gt; 0 — a positive base can never produce a negative power.</p>
<p><strong>log_a(xy) = log_a x + log_a y</strong><br><em>Key:</em> log_a = logarithm to base a; x, y = positive numbers. Multiplication inside becomes addition outside, because aᵐ·aⁿ = aᵐ⁺ⁿ.</p>
<p><strong>log_a(x/y) = log_a x − log_a y</strong><br><em>Key:</em> the same symbols. Division inside becomes subtraction outside.</p>
<p><strong>log_a(xⁿ) = n log_a x</strong><br><em>Key:</em> n = any real power. The law that turns an unknown exponent into a coefficient, and therefore the one that solves every equation of the form aˣ = b.</p>
<p><strong>log_a a = 1 and log_a 1 = 0</strong><br><em>Key:</em> a = the base. Both follow from a¹ = a and a⁰ = 1; they are the two anchors most simplification questions use.</p>
<p><strong>a^(log_a x) = x and log_a(aˣ) = x</strong><br><em>Key:</em> the inverse pair, valid for x &gt; 0. Composing the two functions returns the input, which is how an exponential equation is cleared.</p>
<p><strong>log_a x = log_b x / log_b a</strong><br><em>Key:</em> a = the base wanted; b = any base the calculator offers, usually 10 or e. The change-of-base formula: a calculator computes ln and log, so every other base is converted to one of those.</p>
<p><strong>log_a(1/x) = −log_a x and log_a √x = ½ log_a x</strong><br><em>Key:</em> the power law with n = −1 and n = ½. Useful when a reciprocal or a root appears inside a log.</p>

<h3>Calculus of exponentials and logarithms</h3>
<p><strong>d/dx (eˣ) = eˣ</strong><br><em>Key:</em> e = 2.71828…, the base for which the curve's gradient equals its value. This is the property that defines e, not a coincidence about it.</p>
<p><strong>d/dx (e^(kx)) = k e^(kx)</strong><br><em>Key:</em> k = constant multiplier of x (any real number). The chain rule applied to the inner function kx.</p>
<p><strong>d/dx (aˣ) = aˣ ln a</strong><br><em>Key:</em> a = base &gt; 0; ln a = natural log of the base. Any exponential differentiates to itself times a constant, and that constant is ln a — for a = e it is 1, which recovers the line above.</p>
<p><strong>d/dx (ln x) = 1/x and d/dx (ln kx) = 1/x</strong><br><em>Key:</em> x &gt; 0; k &gt; 0 constant. The second result surprises students: ln kx = ln k + ln x, and ln k is a constant, so it differentiates away.</p>
<p><strong>∫ e^(kx) dx = (1/k) e^(kx) + c</strong><br><em>Key:</em> k ≠ 0 constant; c = constant of integration. The reverse of the derivative, with the 1/k that undoes the chain rule.</p>
<p><strong>∫ (1/x) dx = ln|x| + c</strong><br><em>Key:</em> x ≠ 0; the modulus keeps the antiderivative valid for negative x, where 1/x is still defined but ln x is not. For a definite integral across zero the function is undefined and the integral must be split.</p>

<h3>Modelling: growth, decay and log-linear graphs</h3>
<p><strong>y = A e^(kx)</strong><br><em>Key:</em> y = the quantity at time t; A = its value at t = 0; k = the rate constant (per unit time); k &gt; 0 growth, k &lt; 0 decay. The continuous model — every exponential growth or decay question is this equation with numbers in it.</p>
<p><strong>t½ = ln 2 / |k|</strong><br><em>Key:</em> t½ = half-life, the time for y to halve (same time unit as k); k = the rate constant. From A/2 = A e^(kt½), taking logs: kt½ = −ln 2.</p>
<p><strong>ln y = ln A + k x</strong><br><em>Key:</em> x = the independent variable; y = the measured quantity; A, k = the model's constants. Taking logs turns the curve into a straight line: plot ln y against x and the gradient is k with intercept ln A.</p>
<p><strong>y = a xⁿ ⇒ ln y = ln a + n ln x</strong><br><em>Key:</em> a = coefficient; n = the power. A power law becomes linear on a log–log plot, with gradient n and intercept ln a — the standard way to find an unknown index from data.</p>
<p><strong>y = a bˣ ⇒ log y = log a + x log b</strong><br><em>Key:</em> a = value at x = 0; b = the growth factor per unit x. A geometric model becomes linear when log y is plotted against x, with gradient log b.</p>
<p><strong>dy/dx = 0 gives the stationary point of y = A e^(kx)</strong><br><em>Key:</em> since A e^(kx) is never zero for finite x, a pure exponential has no stationary point — one exists only where the exponent is a function of x that itself has a turning point, which is the usual exam twist.</p>`,
  },

  /* ── Mathematics AS: exponentials and logarithms ─────────────────────── */
  "7b88a182-63f2-490e-9fe3-af5bde499827": {
    slug: "maths-as-exponentials",
    html: `${HEAD}
<h3>What a logarithm is</h3>
<p><strong>log_a x = n ⇔ aⁿ = x</strong><br><em>Key:</em> a = base (a &gt; 0, a ≠ 1); x = the number, x &gt; 0; n = the logarithm, the power a must be raised to. Read it aloud as "a to what power gives x" and most of the difficulty disappears.</p>
<p><strong>log_a a = 1 and log_a 1 = 0</strong><br><em>Key:</em> a = the base. Consequences of a¹ = a and a⁰ = 1; a log question that stalls usually stalls because one of these was not used.</p>
<p><strong>a^(log_a x) = x and log_a(aˣ) = x</strong><br><em>Key:</em> the two functions are inverses, so each undoes the other. Graphically the curves y = aˣ and y = log_a x are reflections of one another in the line y = x.</p>
<p><strong>log x means log_10 x, and ln x means log_e x</strong><br><em>Key:</em> log = common logarithm, base 10; ln = natural logarithm, base e = 2.71828…; e is the base for which the exponential has gradient equal to its value. The calculator has keys for exactly these two, which is why change of base exists.</p>

<h3>The three laws and their consequences</h3>
<p><strong>log_a(xy) = log_a x + log_a y</strong><br><em>Key:</em> x, y &gt; 0; a = base. Addition outside the log is multiplication inside it.</p>
<p><strong>log_a(x/y) = log_a x − log_a y</strong><br><em>Key:</em> the same symbols. Subtraction outside is division inside — the law that collapses a fraction into one log.</p>
<p><strong>log_a(xⁿ) = n log_a x</strong><br><em>Key:</em> n = any real index. Brings a power down in front, which is how 3ˣ = 20 is solved: x log 3 = log 20.</p>
<p><strong>log_a(1/x) = −log_a x and log_a √x = ½ log_a x</strong><br><em>Key:</em> the power law with n = −1 and n = ½. A reciprocal flips the sign; a square root halves the value.</p>
<p><strong>log_a x = log_b x / log_b a</strong><br><em>Key:</em> b = any convenient base, 10 or e on a calculator. Change of base; the special case log_a b = 1 / log_b a falls out by putting x = b.</p>

<h3>Solving, modelling and scale</h3>
<p><strong>aˣ = b ⇒ x = log b / log a</strong><br><em>Key:</em> a &gt; 0, b &gt; 0; the logs may be to any base provided both are the same. Take logs of both sides, then use the power law — never guess the exponent.</p>
<p><strong>A = P(1 + r/100)ⁿ</strong><br><em>Key:</em> A = amount after n periods; P = principal; r = percentage rate per period; n = number of periods. Compound growth, where the growth factor is 1 + r/100 and the model is geometric rather than exponential.</p>
<p><strong>A = P e^(rt)</strong><br><em>Key:</em> A = amount after time t; P = initial amount; r = continuous growth rate per unit time (r &lt; 0 for decay); t = time. Continuous compounding, the bridge between the geometric model and e.</p>
<p><strong>t½ = ln 2 / k</strong><br><em>Key:</em> t½ = half-life; k = decay constant in y = A e^(−kt). Follows from ½ = e^(−kt½); the half-life does not depend on the starting amount.</p>
<p><strong>ln y = ln A + k x</strong><br><em>Key:</em> plotting ln y against x gives gradient k and intercept ln A. Log-linearisation: how a curve is proved to be exponential and its constants extracted from experimental data.</p>
<p><strong>pH = −log₁₀[H⁺]</strong><br><em>Key:</em> pH = acidity on the logarithmic scale; [H⁺] = hydrogen ion concentration in mol dm⁻³. The standard logarithmic scale in context: pH 3 is ten times more acidic than pH 4, not twice.</p>`,
  },

  /* ── Chemistry OL: stoichiometry and the mole ────────────────────────── */
  "c4a7ce8f-cac3-4f54-8f86-4d39ff558975": {
    slug: "chem-ol-stoichiometry",
    html: `${HEAD}
<h3>The mole and its three routes</h3>
<p><strong>n = m / Mᵣ</strong><br><em>Key:</em> n = amount of substance (mol); m = mass of the sample (g); Mᵣ = relative formula mass (g mol⁻¹), the sum of the Aᵣ values in the formula. The central relationship of the topic — every other calculation starts or ends here.</p>
<p><strong>Mᵣ = Σ Aᵣ</strong><br><em>Key:</em> Mᵣ = relative formula mass; Aᵣ = relative atomic mass of each element; Σ means add, multiplying each Aᵣ by the number of atoms of that element in the formula. A bracket multiplies everything inside it: in Ca(OH)₂ the 2 applies to both O and H.</p>
<p><strong>N = n × 6.02 × 10²³</strong><br><em>Key:</em> N = number of particles (atoms, molecules or ions); n = amount in moles; 6.02 × 10²³ mol⁻¹ = the Avogadro constant. One mole of any substance holds this many particles, whatever the substance.</p>
<p><strong>V = n × 24 dm³ at r.t.p.</strong><br><em>Key:</em> V = volume of gas (dm³); n = amount (mol); 24 dm³ mol⁻¹ = molar gas volume at room temperature and pressure (20 °C, 1 atm). At s.t.p. the value is 22.4 dm³ mol⁻¹; use the one the question's conditions specify, and convert cm³ to dm³ by dividing by 1000.</p>

<h3>Solutions and titration</h3>
<p><strong>c = n / V</strong><br><em>Key:</em> c = concentration (mol dm⁻³); n = amount of solute (mol); V = volume of solution (dm³, not the volume of solvent). Rearranged as n = cV, this is the form used in every titration.</p>
<p><strong>concentration in g dm⁻³ = c × Mᵣ</strong><br><em>Key:</em> c = concentration (mol dm⁻³); Mᵣ = relative formula mass (g mol⁻¹). Converts between the two ways a concentration can be quoted; a 0.1 mol dm⁻³ solution of NaOH (Mᵣ 40) is 4.0 g dm⁻³.</p>
<p><strong>c_a V_a / c_b V_b = n_a / n_b</strong><br><em>Key:</em> c_a, V_a = concentration and volume of the acid; c_b, V_b = those of the base; n_a, n_b = the mole ratio from the balanced equation. The titration equation — the volumes must be in the same unit, and the ratio is the one that trips people who forget to balance.</p>

<h3>Yields, atom economy and composition</h3>
<p><strong>% yield = (mass obtained / mass expected) × 100</strong><br><em>Key:</em> mass obtained = what the experiment actually produced (g); mass expected = the theoretical maximum from the limiting reactant (g). Always below 100% in practice because of side reactions, incomplete reaction, transfer losses and purification.</p>
<p><strong>atom economy = (Mᵣ of desired product / Σ Mᵣ of all reactants) × 100</strong><br><em>Key:</em> both masses are those in the balanced equation, not the masses weighed out. A reaction can have 100% atom economy and a poor yield, or the reverse — the two measure different things, which is a standard 2-mark comparison.</p>
<p><strong>% by mass of an element = (Aᵣ × number of atoms / Mᵣ) × 100</strong><br><em>Key:</em> Aᵣ = relative atomic mass of that element; number of atoms = its count in the formula; Mᵣ = relative formula mass of the compound. The percentage composition calculation, and the check on an empirical formula answer.</p>

<h3>Formulae from data and limiting reactants</h3>
<p><strong>empirical formula: divide each element's moles by the smallest</strong><br><em>Key:</em> moles of each element = mass / Aᵣ; dividing through by the smallest gives the simplest whole-number ratio, which is the empirical formula. If the ratios come out as 1 : 1.5, multiply both by 2 — an empirical formula never contains a fraction.</p>
<p><strong>molecular formula: n = Mᵣ(molecular) / Mᵣ(empirical), then multiply the empirical formula by n</strong><br><em>Key:</em> Mᵣ(molecular) = the mass from the question (often from Mr or a gas density); Mᵣ(empirical) = the mass of the empirical formula. n is a whole number: C₂H₄ has an empirical formula of CH₂, so n = 2.</p>
<p><strong>limiting reactant: the one whose (moles ÷ coefficient) is smallest</strong><br><em>Key:</em> moles = amount of each reactant (mol); coefficient = its number in the balanced equation. The limiting reactant sets the maximum product; the one in excess is left over, and questions asking "which is in excess" want both calculations shown.</p>
<p><strong>2H₂ + O₂ → 2H₂O</strong><br><em>Key:</em> the coefficients 2 : 1 : 2 are the mole ratio, not masses. 4 g of H₂ (2 mol) needs 1 mol of O₂ (32 g) and gives 2 mol of water (36 g) — mass is conserved, which is the check that a mole answer is sane.</p>`,
  },

  /* ── Biology OL: enzymes ─────────────────────────────────────────────── */
  "eecb3395-811d-42a6-97cd-cc1b5bae0b6f": {
    slug: "bio-ol-enzymes",
    html: `${HEAD}
<h3>Measuring enzyme rate</h3>
<p><strong>rate = amount of product formed / time taken</strong><br><em>Key:</em> rate = the speed of the reaction (units per second or per minute, e.g. cm³ s⁻¹ of gas, or g min⁻¹ of product); amount of product = the measured change (volume of gas, mass lost, colour change); time = the interval over which it happened. The quantity measured in Paper 6 is almost always one of these three.</p>
<p><strong>rate = 1 / time to completion</strong><br><em>Key:</em> time to completion = how long the reaction takes to finish, judged by a fixed end point (all the substrate gone, the colour stops changing). A convenient rate in arbitrary units: if one tube finishes in 20 s and another in 40 s, the first is twice as fast.</p>
<p><strong>mean rate = (total product) / (total time)</strong><br><em>Key:</em> the average over the whole experiment. It is smaller than the initial rate, because the substrate concentration falls as the reaction proceeds — which is why the initial rate is the fair comparison between two conditions.</p>
<p><strong>initial rate = gradient of the tangent at t = 0 on a product-against-time graph</strong><br><em>Key:</em> gradient = change in y divided by change in x, taken at the steepest point (the start). Drawing the tangent by eye is a mark-scheme skill: use a ruler, take points far apart, and give the unit.</p>

<h3>Comparing rates between conditions</h3>
<p><strong>Q₁₀ = rate at (T + 10 °C) / rate at T</strong><br><em>Key:</em> Q₁₀ = the temperature coefficient; T = the lower temperature in °C. A Q₁₀ of about 2 for a enzyme-catalysed reaction means the rate doubles for a 10 °C rise — until the enzyme denatures, above which Q₁₀ falls below 1 and the comparison becomes meaningless.</p>
<p><strong>% change = ((new value − original value) / original value) × 100</strong><br><em>Key:</em> new value = the rate under the changed condition; original value = the control rate. The correct way to say "how much faster", and the check that a percentage has not been confused with a rate.</p>
<p><strong>optimum temperature: the peak of the rate-against-temperature graph</strong><br><em>Key:</em> rate rises to a maximum as kinetic energy and collision frequency increase, then falls sharply as the enzyme's tertiary structure breaks and the active site loses its shape. The fall is not gradual: denaturation is irreversible, which is why the graph is asymmetric.</p>
<p><strong>optimum pH: the peak of the rate-against-pH graph</strong><br><em>Key:</em> pH changes the charges on the amino acids in the active site, so the substrate no longer fits; extremes also denature the enzyme. Pepsin works near pH 2, salivary amylase near pH 7, and a question that gives the wrong optimum for the named enzyme is a common trap.</p>`,
  },
};

module.exports = { sections };
