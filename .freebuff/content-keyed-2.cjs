// Keyed-equation sheets, worker 2 of 6.
//
// One section per note, appended by `.freebuff/append-note-sections.cjs`:
// every formula below is copied from that note's own body (the coordinator's
// verifier checks the text against the note), and every equation carries a
// <em>Key:</em> line in the same paragraph defining each symbol with its unit.
//
//   node .freebuff/append-note-sections.cjs .freebuff/content-keyed-2.cjs
module.exports = {
  minEquations: 3,
  sections: {
    /* ── Biology OL: Movement Into and Out of Cells ─────────────────── */
    "fe3ddcf1-8510-4e7d-b4df-b8cb3988292e": {
      slug: "movement-into-and-out-of-cells/OL",
      html: `<h2>Equations and symbols</h2>
<p>This topic is examined on two calculations and one ratio: the percentage change that every osmosis practical reports, the arithmetic that turns raw masses into comparable data, and the surface-area-to-volume comparison that explains why exchange surfaces exist. There is no formula for diffusion itself — the marks there are for the definition and the three factors.</p>
<p><strong>percentage change = (final mass − initial mass) ÷ initial mass × 100</strong> <em>Key:</em> final mass and initial mass are the two weighings of the same sample (g); percentage change is the result (%). Report it as a percentage, not as a raw mass change, so samples of different starting sizes compare fairly.</p>
<p><strong>−0.30 ÷ 2.40 = −0.125</strong> <em>Key:</em> −0.30 = change in mass, final minus initial (g) — the minus sign means water left the tissue; 2.40 = initial mass (g); −0.125 = the proportional change (no units), which is then multiplied by 100.</p>
<p><strong>−0.125 × 100 = −12.5 %</strong> <em>Key:</em> −0.125 = proportional change (no units); −12.5 % = the answer. Losing the minus sign is the commonest lost mark on this calculation, because the sign is the evidence that water moved out by osmosis.</p>
<p><strong>6 × 8² = 384 cm²</strong> <em>Key:</em> 6 = the number of faces of a cube (no units); 8 = the side length (cm); 384 cm² = the total surface area. Surface area scales with the square of the length.</p>
<p><strong>8³ = 512 cm³</strong> <em>Key:</em> 8 = the side length (cm); 512 cm³ = the volume. Volume scales with the cube of the length, which is why the larger cube's surface-area-to-volume ratio (384 : 512, about 0.75:1) is far worse than the 1 cm cube's 6:1 — and why large organisms need exchange surfaces and a transport system.</p>
<table>
<tr><th>Symbol</th><th>Quantity</th><th>Unit</th></tr>
<tr><td>ψ</td><td>water potential</td><td>kPa (pure water = 0 kPa; solutes make it negative)</td></tr>
<tr><td>SA : V</td><td>surface-area-to-volume ratio</td><td>no units (area ÷ volume)</td></tr>
<tr><td>%</td><td>percentage change in mass</td><td>%</td></tr>
</table>`,
    },

    /* ── Chemistry OL: States of Matter and Diffusion ───────────────── */
    "258a3ebd-d71c-4442-b520-667ad751bc89": {
      slug: "states-of-matter/OL",
      html: `<h2>Equations and symbols</h2>
<p>Four relations carry the whole topic: the kelvin conversion that every gas calculation depends on, Charles's law itself, the kinetic-energy relation that explains diffusion rates, and the ratio that compares two gases. Reach for them in that order — the commonest error in a gas-law question is dividing a Celsius temperature.</p>
<p><strong>K = °C + 273</strong> <em>Key:</em> K = absolute temperature (kelvin); °C = the temperature on the Celsius scale (°C). Every gas-law formula needs kelvin: 27 °C is 300 K, not 27, and 127 °C is 400 K.</p>
<p><strong>V¹ / T¹ = V² / T²</strong> <em>Key:</em> V¹ and V² = the volume before and after (cm³ or dm³); T¹ and T² = absolute temperature before and after (K). This is Charles's law, for a fixed mass of gas at constant pressure — if the pressure changes, the relation does not apply.</p>
<p><strong>T¹ = 27 + 273 = 300 K</strong> <em>Key:</em> 27 = starting temperature (°C); 273 = the offset between the scales (K); 300 K = the absolute starting temperature. Do this conversion before any substitution.</p>
<p><strong>T² = 127 + 273 = 400 K</strong> <em>Key:</em> 127 = final temperature (°C); 400 K = the absolute final temperature. Both temperatures must be absolute, or the ratio is meaningless.</p>
<p><strong>V² = V¹ x T² / T¹ = 500 × 400 / 300 = 667 cm³</strong> <em>Key:</em> V¹ = 500 cm³ initial volume; T¹ = 300 K; T² = 400 K; V² = 667 cm³ final volume. Write the rearrangement before substituting — the mark scheme pays for the rearranged relation, not only the number.</p>
<p><strong>KE = 1/2 mv²</strong> <em>Key:</em> KE = kinetic energy of a particle (J); m = mass of the particle (kg); v = its speed (m s⁻¹). At one temperature the average KE is the same for all gases, so the lighter particle must carry the larger speed — that single line answers every "why does the lighter gas diffuse faster" question.</p>
<p><strong>rate ratio = √(36.5 / 17) = √2.147 = 1.47</strong> <em>Key:</em> 36.5 = Mᵣ of HCl (no units); 17 = Mᵣ of NH₃ (no units); 1.47 = the factor by which ammonia diffuses faster. The ratio of rates is the square root of the inverse ratio of the masses, so quote it to 2 or 3 significant figures as asked.</p>
<p><strong>NH₃(g) + HCl(g) → NH₄Cl(s)</strong> <em>Key:</em> NH₃ = ammonia (gas); HCl = hydrogen chloride (gas); NH₄Cl = ammonium chloride (white solid ring). The ring forms nearer the HCl end, because the heavier gas has travelled less far in the same time — the position of the ring is the evidence for the rate comparison.</p>`,
    },

    /* ── Chemistry OL: Metals and Reactivity ────────────────────────── */
    "b289e98a-b116-4ed8-998a-acf221bcfe28": {
      slug: "metals/OL",
      html: `<h2>Equations and symbols</h2>
<p>The reactivity series is tested through equations, so this sheet is the reactions themselves grouped the way the questions ask them: with water, with steam, displacement, rusting and protection, the blast furnace, and electrolysis. Every one is a word equation the examiner will accept as a symbol equation only if the formulae are right.</p>
<p><strong>2K + 2H₂O → 2KOH + H₂</strong> <em>Key:</em> K = potassium (solid metal); H₂O = water (liquid); KOH = potassium hydroxide (aqueous, alkaline); H₂ = hydrogen (gas, burns with a pop). Potassium is the top of the series, so it reacts at room temperature, melting and skittering.</p>
<p><strong>Mg + H₂O → MgO + H₂</strong> <em>Key:</em> Mg = magnesium (solid); H₂O = steam (gas) — cold water reacts only very slowly; MgO = magnesium oxide (white solid); H₂ = hydrogen. Reacting with steam rather than cold water is itself proof of a lower place in the series than potassium.</p>
<p><strong>Fe + H₂O → Fe₃O₄ + H₂</strong> <em>Key:</em> Fe = iron (red-hot); H₂O = steam; Fe₃O₄ = iron(II,III) oxide (black solid); H₂ = hydrogen. Note that this is not Fe₂O₃ — the product with steam is the mixed oxide, which is a frequent lost mark.</p>
<p><strong>Zn(s) + CuSO₄(aq) → ZnSO₄(aq) + Cu(s)</strong> <em>Key:</em> Zn = zinc (solid); CuSO₄ = copper(II) sulfate (blue, aqueous); ZnSO₄ = zinc sulfate (colourless, aqueous); Cu = copper (red-brown solid). Two observations follow from one equation: the blue colour fades and a red-brown coating appears.</p>
<p><strong>Cu(s) + ZnSO₄(aq) → no reaction</strong> <em>Key:</em> copper sits below zinc in the series, so it cannot displace it. The pair — forward works, reverse does not — is the standard proof of the order, and quoting it earns the mark that a single observation does not.</p>
<p><strong>Zn → Zn²⁺ + 2e⁻</strong> <em>Key:</em> Zn = zinc atom (solid); Zn²⁺ = zinc ion (aqueous); e⁻ = electron released into the iron. This electron loss is the whole mechanism of sacrificial protection: zinc corrodes preferentially, so the iron cannot.</p>
<p><strong>C + O₂ → CO₂</strong> <em>Key:</em> C = coke, carbon (solid); O₂ = oxygen from the hot air blast (gas); CO₂ = carbon dioxide (gas). Exothermic — it is what heats the furnace.</p>
<p><strong>CO₂ + C → 2CO</strong> <em>Key:</em> CO₂ = carbon dioxide from the first reaction; C = more coke; CO = carbon monoxide, the reducing agent (gas). This endothermic step is the one candidates forget: carbon does not reduce the ore directly at the top of the furnace.</p>
<p><strong>Fe₂O₃ + 3CO → 2Fe + 3CO₂</strong> <em>Key:</em> Fe₂O₃ = haematite, the iron ore; CO = carbon monoxide, the reducing agent; Fe = molten iron; CO₂ = carbon dioxide. In the hottest zone carbon also reduces directly: Fe₂O₃ + 3C → 2Fe + 3CO.</p>
<p><strong>CaCO₃ → CaO + CO₂</strong> <em>Key:</em> CaCO₃ = limestone (solid, thermal decomposition); CaO = calcium oxide, quicklime; CO₂ = carbon dioxide. Calcium oxide is the species that removes the sandy impurity.</p>
<p><strong>CaO + SiO₂ → CaSiO₃</strong> <em>Key:</em> CaO = calcium oxide; SiO₂ = silica, the acidic impurity in the ore; CaSiO₃ = calcium silicate, the slag. Slag is less dense than iron, so it floats and is run off separately.</p>
<p><strong>Al³⁺ + 3e⁻ → Al</strong> <em>Key:</em> Al³⁺ = aluminium ion in the molten oxide dissolved in cryolite; e⁻ = electron supplied by the cathode; Al = molten aluminium. This is reduction at the cathode — aluminium is too reactive for carbon to reduce, which is why electrolysis is used.</p>
<p><strong>2O²⁻ → O₂ + 4e⁻</strong> <em>Key:</em> O²⁻ = oxide ion; O₂ = oxygen liberated at the anode; e⁻ = electrons released. The oxygen then burns the carbon anodes (C + O₂ → CO₂), which is why they are replaced regularly — a standard two-mark explanation.</p>`,
    },

    /* ── Chemistry AS: Introduction to Kinetics and Equilibria ──────── */
    "d4516bc0-b215-49ea-904f-286fef0f33bc": {
      slug: "introduction-to-kinetics-and-equilibria/AS",
      html: `<h2>Equations and symbols</h2>
<p>Two kinds of relation decide this topic: the rate measurements (a reciprocal, and a gradient read off a curve) and the reversible equations whose position Le Chatelier moves. Learn the direction of each shift against the equation itself — writing the equation down first, with its ΔH, is what makes the shift arguable rather than guessed.</p>
<p><strong>Rate = 1 / time</strong> <em>Key:</em> Rate = the average rate of the reaction (s⁻¹); time = the time taken to reach the chosen observable endpoint (s). Only valid when the endpoint is a fixed amount of reaction — the disappearance of a cross, a colour change — because the amount reacted is then the same in every trial.</p>
<p><strong>N₂(g) + 3H₂(g) ⇌ 2NH₃(g)</strong> <em>Key:</em> N₂ = nitrogen (gas); H₂ = hydrogen (gas); NH₃ = ammonia (gas); ⇌ marks a reaction at dynamic equilibrium. Four moles of gas become two, so raising the pressure shifts the position to the right and raises the yield.</p>
<p><strong>N₂ + 3H₂ ⇌ 2NH₃, ΔH negative</strong> <em>Key:</em> ΔH = enthalpy change of the forward reaction (kJ mol⁻¹); negative means exothermic, so raising the temperature shifts the position left and lowers the yield while raising the rate. That trade-off is the whole reason the Haber process runs at about 450 °C rather than at the yield-maximising low temperature.</p>
<p><strong>2SO₂ + O₂ ⇌ 2SO₃, ΔH negative</strong> <em>Key:</em> SO₂ = sulfur dioxide (gas); O₂ = oxygen (gas); SO₃ = sulfur trioxide (gas); three moles of gas become two, so high pressure favours the product, but the uncatalysed conversion is already high enough that 1–2 atm is economic. Vanadium(V) oxide is the catalyst, and it changes neither the yield nor ΔH.</p>
<p><strong>H₂(g) + I₂(g) ⇌ 2HI(g)</strong> <em>Key:</em> H₂ = hydrogen; I₂ = iodine (both gases); HI = hydrogen iodide (gas). Two moles of gas on each side, so changing the pressure has no effect on the position — quoting this example is the quickest way to show you know why pressure sometimes does nothing.</p>
<p><strong>Acid + alcohol ⇌ ester + water</strong> <em>Key:</em> acid = the carboxylic acid; alcohol = the alcohol; ester and water are the products. No change in the number of moles, so pressure is irrelevant; the position is moved by removing water or distilling off the ester.</p>
<table>
<tr><th>Symbol</th><th>Quantity</th><th>Unit</th></tr>
<tr><td>Ea</td><td>activation energy — the minimum collision energy that leads to reaction</td><td>kJ mol⁻¹</td></tr>
<tr><td>E</td><td>kinetic energy of a molecule in the distribution</td><td>J (or kJ mol⁻¹ when plotted per mole)</td></tr>
<tr><td>ΔH</td><td>enthalpy change of the forward reaction</td><td>kJ mol⁻¹ (negative = exothermic)</td></tr>
</table>
<p>The Maxwell–Boltzmann curve is not an equation to quote but a shape to describe: it starts at the origin, peaks at the most probable energy, tails to the right, and encloses a constant area. Temperature changes its shape; concentration and a catalyst do not — the fraction with E ≥ Ea is the quantity that decides the rate.</p>`,
    },

    /* ── Chemistry A2: Redox Equilibria ─────────────────────────────── */
    "f0935820-c33f-466f-bf4a-d368adc0f69c": {
      slug: "redox-equilibria/A2",
      html: `<h2>Equations and symbols</h2>
<p>Three relations give every mark in this topic: the subtraction that turns two electrode potentials into a cell emf, the free-energy link that says whether that emf means the reaction happens, and the balanced half-equations for the two titrations you must be able to write from memory. E° is the standard symbol for what these notes spell "E-zero"; both name the same quantity.</p>
<p><strong>E-zero-cell = E-zero(reduction) - E-zero(oxidation)</strong> <em>Key:</em> E-zero-cell, written E°cell, = the cell emf (V); E-zero(reduction) = the standard electrode potential of the half-cell that is reduced, the cathode (V); E-zero(oxidation) = that of the half-cell that is oxidised, the anode (V). Subtracting always gives the magnitude; a positive answer means the reaction as written is feasible.</p>
<p><strong>E-zero-cell = +0.34 − (−0.76) = +1.10 V</strong> <em>Key:</em> +0.34 V = E°(Cu²⁺/Cu), the reduction half-cell; −0.76 V = E°(Zn²⁺/Zn), the oxidation half-cell; +1.10 V = the emf of the zinc–copper cell (V). Two minuses become a plus — the arithmetic error that costs the whole mark.</p>
<p><strong>E(cell) = E(cathode, reduction) − E(anode, oxidation) = +0.34 − (−0.76) = +1.10 V</strong> <em>Key:</em> the same relation written with the electrode names; identify which metal is the anode (the more negative potential) before subtracting, and remember that E° values are never multiplied by the balancing coefficients.</p>
<p><strong>ΔG = −nFE</strong> <em>Key:</em> ΔG = Gibbs free energy change of the reaction (J mol⁻¹); n = number of electrons transferred in the balanced equation (no units); F = the Faraday constant, 96 500 C mol⁻¹; E = the cell emf (V). A positive E gives a negative ΔG, which is what "thermodynamically feasible" means.</p>
<p><strong>5Fe²⁺ + MnO₄⁻ + 8H⁺ → 5Fe³⁺ + Mn²⁺ + 4H₂O</strong> <em>Key:</em> Fe²⁺ = iron(II) ions being oxidised to Fe³⁺; MnO₄⁻ = manganate(VII) ions, the oxidising agent, reduced to colourless Mn²⁺; H⁺ = the acid that supplies the eight protons needed to balance the oxygens. The ratio is 5 : 1, which is the whole calculation: moles of Fe²⁺ = 5 × moles of MnO₄⁻.</p>
<p><strong>The fuel-cell pair, in the glyph form the exam expects.</strong> At the anode hydrogen is oxidised: H₂ + 2OH⁻ → 2H₂O + 2e⁻, where H₂ = hydrogen fuel (gas), OH⁻ = hydroxide ions of the alkaline electrolyte, H₂O = water (liquid) and e⁻ = electrons released to the external circuit. At the cathode oxygen is reduced: O₂ + 2H₂O + 4e⁻ → 4OH⁻, where O₂ = oxygen from the air (gas). In acid electrolyte the same pair is written H₂ → 2H⁺ + 2e⁻ and O₂ + 4H⁺ + 4e⁻ → 2H₂O; the electrons always travel through the external circuit, never through the electrolyte.</p>
<table>
<tr><th>Symbol</th><th>Quantity</th><th>Unit</th></tr>
<tr><td>E°</td><td>standard electrode (reduction) potential</td><td>V, measured at 298 K, 100 kPa and 1.00 mol dm⁻³</td></tr>
<tr><td>F</td><td>Faraday constant, charge per mole of electrons</td><td>96 500 C mol⁻¹</td></tr>
<tr><td>n</td><td>electrons transferred in the balanced equation</td><td>no units</td></tr>
</table>
<p>Two limitations to have ready as sentences: a positive E°cell proves feasibility, never rate, because a large activation energy can make a feasible reaction negligibly slow; and E° applies only at standard conditions, so a change in concentration or temperature can move the potential and reverse the prediction.</p>`,
    },

    /* ── Mathematics OL: Simplifying and Expanding ──────────────────── */
    "f87684c4-ab07-4f84-825d-b9fee9f73bc6": {
      slug: "algebra-simplifying-and-expanding/OL",
      html: `<h2>Equations and symbols</h2>
<p>The identities below are the whole topic in six lines: the distributive law that makes expanding legal, the two patterns worth recognising on sight, and the completed square that turns a quadratic into its turning point. Every one is proved by expanding it back, which is also the check that costs ten seconds in an exam.</p>
<p><strong>a(b + c) = ab + ac</strong> <em>Key:</em> a = the term outside the bracket; b, c = the terms inside (algebraic terms, no units). This is the distributive property of arithmetic, so it holds for every number, which is why one line of algebra replaces a million examples.</p>
<p><strong>3x + 2 = 3 × 5 + 2 = 15 + 2 = 17</strong> <em>Key:</em> x = 5, the substituted value; 3x means 3 × x, never 3 + x. Substitute into the structure in the order the expression is built: multiply first, then add.</p>
<p><strong>(x + a)² = x² + 2ax + a²</strong> <em>Key:</em> x = the variable; a = the constant added inside the bracket; the middle term 2ax is the one everybody drops. Writing (x + 5)² as x² + 25 is the single most common error in the whole of algebra — with a = 5 the middle term is 10x.</p>
<p><strong>x² − a² = (x + a)(x − a)</strong> <em>Key:</em> x = the variable; a = the square root of the constant term (no units); valid whenever the expression is one square subtracted from another, so 9x² − 25 = (3x + 5)(3x − 5).</p>
<p><strong>(x + a)(x − a) = x² − ax + ax − a² = x² − a²</strong> <em>Key:</em> the two middle products are equal and opposite, so they cancel — that cancellation is the proof of the difference of two squares, and the reason to look for the pattern before reaching for a longer method.</p>
<p><strong>12x³ − 8x² = 4x²(3x − 2)</strong> <em>Key:</em> 4x² = the highest common factor of both terms; 3x and −2 = what each term becomes when divided by it. Check by re-expanding: 4x² × 3x = 12x³ and 4x² × (−2) = −8x².</p>
<p><strong>x² + 6x − 7 = (x + 3)² − 9 − 7</strong> <em>Key:</em> 3 = half the coefficient of x (6 ÷ 2); 9 = 3², the amount the square introduces and must therefore be subtracted; the expression then reads (x + 3)² − 16, so the minimum value is −16 at x = −3.</p>
<p><strong>2(x² + 4x) − 5 = 2[(x + 2)² − 4] − 5 = 2(x + 2)² − 13</strong> <em>Key:</em> the leading 2 = the coefficient of x², taken out first; the 2 inside the square = half of 4, the coefficient of x; −4 = the square of that half, subtracted inside the bracket; −13 = what remains once the correction is multiplied by the 2 outside as well. Forgetting to multiply the correction by the outside factor is the standard slip.</p>
<p><strong>9x² − 25 = (3x + 5)(3x − 5)</strong> <em>Key:</em> 3x = the square root of 9x²; 5 = the square root of 25. Both terms must be perfect squares before the pattern applies, which is why 9x² − 25 factorises but 9x² − 26 does not.</p>`,
    },

    /* ── Mathematics OL: Statistics and Data Handling ───────────────── */
    "c4de73c5-5ba1-4192-a207-71e25ddd6870": {
      slug: "statistics-data-handling/OL",
      html: `<h2>Equations and symbols</h2>
<p>Seven formulas cover the whole paper: the three averages with their range and interquartile range, the two histogram relations, and the pie-chart angle. Every one carries the same mark-scheme requirement — substitute, then state the answer in the units of the data, not as a bare number.</p>
<p><strong>mean = sum of values / number of values</strong> <em>Key:</em> mean = the arithmetic average, in the same units as the data; sum of values = the total of every reading; number of values = how many readings there are. Uses every value, so one outlier moves it.</p>
<p><strong>median = the value at position (n + 1)/2 in cumulative order</strong> <em>Key:</em> n = the number of values; the position is a count through the ordered list, not a value. For an even n the position falls between two values, so average them — picking one of the two is the commonest lost mark.</p>
<p><strong>mode = the value with the highest frequency</strong> <em>Key:</em> mode = the most frequent value, in the same units as the data; for grouped data it is the modal class. The only average available for categorical data.</p>
<p><strong>range = largest - smallest</strong> <em>Key:</em> largest and smallest = the extreme values of the data set; the range is their difference, in the data's units. It uses only two values, so a single outlier destroys it.</p>
<p><strong>IQR = Q3 - Q1</strong> <em>Key:</em> IQR = interquartile range, the spread of the middle 50% of the data (same units); Q3 = upper quartile at the 75% position; Q1 = lower quartile at the 25% position. A negative IQR means the quartiles have been swapped.</p>
<p><strong>IQR = 68 - 42 = 26 marks</strong> <em>Key:</em> 68 = Q3, the mark at the 75% position; 42 = Q1, the mark at the 25% position; 26 marks = the IQR. Interpret it in words: the middle half of the students scored within 26 marks of each other.</p>
<p><strong>frequency density = frequency / class width</strong> <em>Key:</em> frequency density = the height of the bar (no units, since it is a count divided by a width); frequency = the number of readings in the class; class width = upper boundary minus lower boundary (in the data's units). Use it only when the class widths differ — with equal widths the height may be the frequency.</p>
<p><strong>frequency = frequency density x class width (area of the bar)</strong> <em>Key:</em> the same relation rearranged; reading a histogram backwards means measuring a bar's width and height and multiplying. In a histogram it is the area, never the height, that represents the frequency.</p>
<p><strong>angle = (frequency/total) × 360°</strong> <em>Key:</em> frequency = the count in the sector; total = the total count for the whole chart; angle in degrees, and the sectors must sum to 360°. To go the other way, total = frequency × 360/angle.</p>
<p><strong>mean = sum of (value x frequency) / sum of frequencies</strong> <em>Key:</em> value = each reading, or the midpoint of a class for grouped data (same units); frequency = how many times it occurs. With midpoints the answer is labelled an estimate, because the midpoint stands in for every value in the class.</p>`,
    },

    /* ── Mathematics AS: Probability Distributions ──────────────────── */
    "9c77bccd-7dc1-4b5a-8498-f45f5af99624": {
      slug: "probability-distributions/AS",
      html: `<h2>Equations and symbols</h2>
<p>The whole topic is four rules and one warning: expectation always combines linearly, variance combines linearly only for independent variables, and adding or subtracting them always adds the variances. Write the independence condition before you apply a variance rule — it is worth a mark on its own.</p>
<p><strong>E(X) = sum of x P(X = x)</strong> <em>Key:</em> E(X) = the expected value, the long-run average of X (same units as X); x = each possible value; P(X = x) = its probability. The value need not be attainable — 3.5 on a die is the standard example.</p>
<p><strong>Var(X) = E(X²) - [E(X)]^2</strong> <em>Key:</em> Var(X) = the variance, in squared units of X; E(X²) = the sum of x²P(X = x); [E(X)]² is the square of the mean, not the mean itself. The standard deviation is the square root and is back in the data's units.</p>
<p><strong>E(aX + b) = a E(X) + b</strong> <em>Key:</em> a = the multiplier applied to every value (no units); b = the constant added to every value (X's units); E(X) = the mean before the change. Shifting every value shifts the mean by exactly the same amount.</p>
<p><strong>Var(aX + b) = a² Var(X)</strong> <em>Key:</em> a = the multiplier; b = the constant shift, which does not appear at all because shifting every value leaves the spread unchanged. The variance scales by a², the standard deviation by the modulus of a — quoting a Var(aX) = a Var(X) loses the mark.</p>
<p><strong>E(aX + bY) = a E(X) + b E(Y)</strong> <em>Key:</em> X, Y = two random variables; a, b = constants; this holds always, with or without independence, and it is the rule most often needed in applied questions.</p>
<p><strong>Var(aX + bY) = a² Var(X) + b² Var(Y)</strong> <em>Key:</em> valid only when X and Y are independent, and the plus sign is unconditional — the variances add however the variables are combined, because uncertainties never cancel.</p>
<p><strong>Var(aX - bY) = a² Var(X) + b² Var(Y)</strong> <em>Key:</em> the same rule for a difference: the sign in front of Y affects the expectation and not the variance. Var(X − Y) = 9 + 4 = 13, never 9 − 4.</p>
<p><strong>F(x) = P(X &lt;= x) = sum of P(X = k) for k &lt;= x</strong> <em>Key:</em> F(x) = the cumulative distribution function, a probability (no units, between 0 and 1); x = the value asked about; k runs over every possible value at most x. For a discrete variable F is a step function, constant between values and jumping at each one.</p>
<p><strong>P(X = k) = F(k) - F(k - 1)</strong> <em>Key:</em> recovers a single probability from the cumulative function; mind the inequality, because P(X &lt; 3) = F(2) while P(X ≤ 3) = F(3) for a discrete variable.</p>
<p><strong>E(X) = (n + 1)/2</strong> and <strong>Var(X) = (n² - 1)/12</strong> <em>Key:</em> for a discrete uniform distribution on 1 to n: n = the number of equally likely values (no units); the mean and variance follow from n alone. A fair die has n = 6, so E(X) = 3.5 and Var(X) = 35/12.</p>`,
    },

    /* ── Mathematics A2: The Poisson Distribution ───────────────────── */
    "57eaee80-6b7e-424d-b649-06a608be6256": {
      slug: "poisson-distribution/A2",
      html: `<h2>Equations and symbols</h2>
<p>One formula does the arithmetic, and one identity checks the model: for a Poisson variable the mean and the variance are the same number λ. Every exam error on this topic is either a λ expressed for the wrong interval or a complement taken one term too far.</p>
<p><strong>P(X = r) = e^(-λ) λ^r / r!</strong> <em>Key:</em> X = the number of events counted in the fixed interval (a count, no units); r = the particular count asked about; λ = the mean number of events in that same interval (no units — it is a count, not a rate per second, unless the interval is one second); e = 2.71828…; r! = factorial of r, with 0! = 1.</p>
<p><strong>mean E(X) = λ</strong> <em>Key:</em> E(X) = the expected count in the interval; λ = the mean. Read it with the line below: the equality of mean and variance is the fingerprint of the model, and a sample whose variance far exceeds its mean is not Poisson.</p>
<p><strong>variance Var(X) = λ</strong> <em>Key:</em> Var(X) = the variance of the count; λ = the same mean. So the standard deviation is √λ, which is the quickest sanity check on an observed count: for λ = 9, counts between 6 and 12 are ordinary.</p>
<p><strong>P(X &gt;= r) = 1 - P(X &lt;= r - 1)</strong> <em>Key:</em> the complement rule, because the Poisson has no upper limit; r = the smallest count that counts as "at least". Subtracting P(X ≤ r) instead of P(X ≤ r − 1) is the classic off-by-one and throws the whole tail away.</p>
<p><strong>P = e^(-3) × 3² / 2!</strong> <em>Key:</em> λ = 3 for this interval; r = 2; 3² = λ^r; 2! = 2. The arithmetic is 0.049787 × 9 / 2 = 0.2240 — quote four decimal places unless told otherwise.</p>
<p><strong>λ = 200 × 0.02 = 4</strong> <em>Key:</em> 200 = n, the number of trials; 0.02 = p, the probability of the event in one trial; λ = np = 4, the mean of the approximating Poisson. The approximation is used when n is large and p small — n &gt; 50 and p &lt; 0.05, or np &lt; 5.</p>
<p><strong>P(X &lt;= 2) = e^(-4)(1 + 4 + 8) = 0.018316 × 13 = 0.2381</strong> <em>Key:</em> the bracket is λ^r/r! summed for r = 0, 1, 2: 1, 4 and 8 (since 4²/2! = 8); e^(−4) = 0.018316. The exact binomial gives 0.2351, so the approximation is close — say so when a question asks you to comment.</p>
<p><strong>X + Y ~ Po(l1 + l2)</strong> <em>Key:</em> X and Y = two independent Poisson counts; l1, l2 = their means; the total count is Poisson with the means added. A difference of two Poisson variables is not Poisson — only sums combine.</p>
<p><strong>X ~ B(n, p) with n large, p small  →  X is approximately Po(np)</strong> <em>Key:</em> B(n, p) = the binomial with n trials and success probability p; np = the Poisson mean that replaces them. State both conditions before using it, because the approximation fails when np is large.</p>
<table>
<tr><th>Symbol</th><th>Quantity</th><th>Unit</th></tr>
<tr><td>λ</td><td>mean number of events in the stated interval</td><td>a count (no units) — quote the interval with it</td></tr>
<tr><td>r</td><td>the observed or asked-about count</td><td>a count (no units)</td></tr>
<tr><td>H₀</td><td>null hypothesis, λ = λ₀</td><td>a stated mean count for the interval</td></tr>
</table>
<p>Scaling is the other half of the topic and it is not a formula but a substitution: a rate of 4 per minute is λ = 8 for a two-minute window, and 12 calls in one hour must be tested against 24 expected in two hours, not against 12. Write the interval beside the λ every time.</p>`,
    },

    /* ── Mathematics A2: Numerical Methods ──────────────────────────── */
    "623cecd2-630e-456c-ac75-c567c01d46c3": {
      slug: "numerical-methods/A2",
      html: `<h2>Equations and symbols</h2>
<p>Four relations cover the paper: the sign-change test that locates a root, the iteration and Newton–Raphson formulas that refine it, and the trapezium rule for an integral with no closed form. Each has a failure mode the examiner asks you to name, so the conditions matter as much as the algebra.</p>
<p><strong>x_(n+1) = g(x_n)</strong> <em>Key:</em> x_n = the current estimate of the root (in the variable's units); x_(n+1) = the next estimate; g = the rearranged equation, obtained by making x the subject of f(x) = 0. The same equation has several rearrangements and only some of them converge.</p>
<p><strong>the iteration converges when |g'(x)| &lt; 1 near the root</strong> <em>Key:</em> g′(x) = the derivative of the rearrangement (no units); a value smaller than 1 in size pulls successive estimates together, larger than 1 pushes them apart. This single test decides which rearrangement to use, and a question that says "show that this rearrangement converges" wants exactly this line.</p>
<p><strong>x_(n+1) = x_n - f(x_n)/f'(x_n)</strong> <em>Key:</em> f(x_n) = the value of the function at the current estimate; f′(x_n) = its derivative there; the quotient is the horizontal distance from x_n to where the tangent meets the axis. Geometrically the method follows the tangent down to the x-axis, which is why it converges far faster than plain iteration.</p>
<p><strong>f(1) = 1 - 1 - 1 = -1</strong> and <strong>f(2) = 8 - 2 - 1 = 5</strong> <em>Key:</em> for f(x) = x³ − x − 1; the two values have opposite signs and a cubic is continuous, so there is at least one root in (1, 2). Say "at least" — the sign change never proves uniqueness.</p>
<p><strong>g'(x) = (1/3)(x + 1)^(-2/3)</strong> <em>Key:</em> the derivative of g(x) = (x + 1)^(1/3), the rearrangement that converges for x³ − x − 1 = 0; at x = 1.32 it is about 0.19, well under 1. The other rearrangement, x = x³ − 1, has g′ ≈ 5.3 there and diverges — the comparison is the answer to "why this rearrangement".</p>
<p><strong>h = (b - a)/n</strong> <em>Key:</em> h = the width of one strip (in the units of x); b and a = the upper and lower limits of the integral; n = the number of strips, so there are n + 1 ordinates. Counting strips and counting points are different, and mixing them halves or doubles h.</p>
<p><strong>h = 0.5; x: 0, 0.5, 1, 1.5, 2</strong> <em>Key:</em> for the integral of e^(x²) from 0 to 2 with four strips: h = (2 − 0)/4 = 0.5, and the ordinates sit at x = 0, 0.5, 1, 1.5, 2. Tabulate the ordinates before substituting, because the bracket is where the factor-of-two errors happen.</p>
<p><strong>y: 1, 1.2840, 2.7183, 6.4760, 54.5982</strong> <em>Key:</em> the five values of e^(x²) at those ordinates; in the trapezium rule the first and last are counted once and the interior values twice, giving 0.25[1 + 20.9566 + 54.5982] = 19.14. The rule overestimates here because e^(x²) is concave up, and halving h roughly quarters the error.</p>
<p><strong>x2 = 0.5 - (-1.375)/(-0.25) = 0.5 - 5.5 = -5.0</strong> <em>Key:</em> Newton–Raphson failing: f(0.5) = −1.375 and f′(0.5) = −0.25, a nearly horizontal tangent, so the step overshoots wildly. The method needs f′ ≠ 0 and a starting value near the root; state that condition rather than continuing the arithmetic.</p>
<table>
<tr><th>Symbol</th><th>Quantity</th><th>Unit</th></tr>
<tr><td>f(x)</td><td>the function whose root or integral is wanted</td><td>whatever the function returns (no units if dimensionless)</td></tr>
<tr><td>x_n</td><td>the nth estimate of the root</td><td>same units as x</td></tr>
<tr><td>h</td><td>strip width</td><td>same units as x</td></tr>
</table>`,
    },

    /* ── Computer Science A2: Protocols, Circuit and Packet Switching ── */
    "17e42a4c-18d8-47cd-b02f-f5b78b6bc7e5": {
      slug: "networks-and-the-internet/A2",
      html: `<h2>Equations and symbols</h2>
<p>This topic is examined through one calculation and one comparison. The calculation is the store-and-forward delay — packet size divided by link rate, summed over the hops — and the comparison is the table of circuit against packet switching, which is best argued from numbers rather than adjectives.</p>
<p><strong>Store-and-forward delay per hop = packetSize / linkRate</strong> <em>Key:</em> packetSize = the length of the packet (bits, so bytes × 8); linkRate = the transmission rate of the link (bits per second); the result is a time (s). Every hop must receive the whole packet before forwarding it, so the delays add along the path — that sum is what a "why is the video call laggy" answer quotes.</p>
<p><strong>Packet = 1500 × 8 = 12 000 bits</strong> <em>Key:</em> 1500 = the packet size in bytes; 8 = bits per byte; 12 000 bits = the packet in the units every rate is quoted in. Converting to bits first is the step that prevents a factor-of-eight error in the next line.</p>
<p><strong>12 000 ÷ 10⁷ = 1.2 ms</strong> <em>Key:</em> 12 000 bits = the packet; 10⁷ bit s⁻¹ = a 10 Mbps link written in base units; 1.2 ms = the transmission delay for one hop. Three identical hops give 3 × 1.2 = 3.6 ms, before propagation and queueing.</p>
<p><strong>3 × 1.2 = 3.6 ms</strong> <em>Key:</em> 3 = the number of hops that each store and forward the packet; 1.2 ms = one hop's transmission delay; 3.6 ms = the total transmission delay. Add propagation (distance ÷ speed in the medium) and queueing separately — they are different quantities and the marks are separate.</p>
<p><strong>1.2 Mbit / 1.2 Mbps = 1 s</strong> <em>Key:</em> 1.2 Mbit = the message size (10⁶ bits); 1.2 Mbps = the link rate; 1 s = the transfer time on a dedicated circuit, during which no other call can use those links. This is the number the circuit-switching argument is built on.</p>
<p><strong>40 × 2 = 80 Mbps</strong> <em>Key:</em> 40 = the number of classrooms streaming at once; 2 Mbps = the rate of each video stream; 80 Mbps = the peak aggregate demand, before about 20% overhead for headers and retransmission. The same figure under circuit switching is 80 Mbps committed permanently, whether or not a room is streaming — that contrast is the efficiency argument.</p>
<table>
<tr><th>Symbol</th><th>Quantity</th><th>Unit</th></tr>
<tr><td>linkRate</td><td>transmission rate of one link</td><td>bit s⁻¹ (bps, kbps, Mbps, Gbps)</td></tr>
<tr><td>packetSize</td><td>length of one packet</td><td>bits (bytes × 8)</td></tr>
<tr><td>latency</td><td>total delay across the path: transmission + propagation + queueing</td><td>s (or ms)</td></tr>
</table>
<p>Two sentences carry the rest of the topic: packets may arrive out of order, which is why sequence numbers and reassembly exist; and a positive jitter figure is what QoS, traffic shaping and reservation are engineered to remove.</p>`,
    },

    /* ── Physics A2: Magnetic Fields and Electromagnetism ───────────── */
    "df41cba4-9394-49c0-8680-fde851153c12": {
      slug: "magnetic-fields-and-electromagnetism/A2",
      html: `<h2>Equations and symbols</h2>
<p>Eleven relations run this topic and they come in four groups: flux, force, field from a current, and induction — plus the three a.c. results that connect any of it to the mains. In every one the angle is measured between the field and something else, and getting that angle wrong is worth more marks than any arithmetic.</p>
<p><strong>Φ = B A cos(θ)</strong> <em>Key:</em> Φ = magnetic flux (Wb); B = magnetic flux density (T); A = area of the surface (m²); θ = angle between the field and the <em>normal</em> to the area, not between the field and the surface. Flux is maximum when the field is perpendicular to the surface, because then θ = 0 and cos θ = 1.</p>
<p><strong>flux linkage = N Φ</strong> <em>Key:</em> N = number of turns in the coil (no units); Φ = flux through one turn (Wb); the product is measured in weber-turns (Wb-turn). Induction depends on the <em>rate of change</em> of this quantity, so a 200-turn coil multiplies the effect of a single loop two hundredfold.</p>
<p><strong>F = B I L sin(θ)</strong> <em>Key:</em> F = force on the conductor (N); B = flux density (T); I = current (A); L = length of conductor in the field (m); θ = angle between the current and the field. Maximum at θ = 90°, zero when the wire lies along the field.</p>
<p><strong>F = B Q v sin(θ)</strong> <em>Key:</em> Q = charge on the particle (C); v = its speed (m s⁻¹); the other symbols as above. For a charge moving perpendicular to the field this becomes F = B Q v, and that force is centripetal.</p>
<p><strong>B Q v = m v²/r  →  r = m v/(B Q)</strong> <em>Key:</em> m = mass of the particle (kg); r = radius of the circular path (m); the other symbols as above. The radius grows with momentum and shrinks with field strength and charge — which is exactly how a mass spectrometer separates ions of different mass.</p>
<p><strong>B = μ₀I/(2πr)</strong> <em>Key:</em> B = flux density at distance r from a long straight wire (T); μ₀ = permeability of free space, 4π × 10⁻⁷ T m A⁻¹; I = current (A); r = perpendicular distance from the wire (m). The field falls as 1/r, so doubling the distance halves it.</p>
<p><strong>ε = - N dPhi/dt</strong> <em>Key:</em> ε = induced e.m.f. (V); N = number of turns; dPhi/dt = rate of change of flux through one turn (Wb s⁻¹). This is Faraday's law, and the minus sign is Lenz's law: the induced e.m.f. opposes the change that produced it.</p>
<p><strong>ε = B L v</strong> <em>Key:</em> the special case of a rod of length L (m) moving at speed v (m s⁻¹) perpendicular to a field B (T); ε in volts. A rod moving along the field induces nothing, because no flux is being cut.</p>
<p><strong>ε₀ = N B A ω</strong> <em>Key:</em> ε₀ = peak (maximum) e.m.f. from a rotating coil (V); N = turns; B = flux density (T); A = area of the coil (m²); ω = angular velocity of the rotation (rad s⁻¹). The sinusoidal output then has rms value ε₀/√2.</p>
<p><strong>V_rms = V_0/√(2) = 0.707 V_0</strong> <em>Key:</em> V_rms = the root-mean-square voltage (V), the steady d.c. value delivering the same power; V_0 = the peak voltage (V). Use it whenever a power is asked for, because the average of a sine wave is zero and the average power is not.</p>
<p><strong>P = V_rms I_rms = I_rms² R = V_rms²/R</strong> <em>Key:</em> P = average power (W); I_rms = root-mean-square current (A), equal to I_0/√2; R = resistance (Ω). All three forms are the same statement, and all three need rms values — substituting peak values overstates the power by a factor of two.</p>
<p><strong>τ = RC</strong> <em>Key:</em> τ = the time constant of the smoothing circuit (s); R = load resistance (Ω); C = capacitance (F). A larger τ relative to the period of the supply means the capacitor discharges less between peaks, so the ripple is smaller — the sentence that answers every smoothing question.</p>
<p><strong>F = BIL = 0.80 × 2.0 × 0.30 = 0.48 N</strong> <em>Key:</em> a worked instance with B = 0.80 T, I = 2.0 A, L = 0.30 m perpendicular to the field. Quote the formula first, then substitute, then give the unit — a bare number loses the method mark.</p>
<table>
<tr><th>Symbol</th><th>Quantity</th><th>Unit</th></tr>
<tr><td>B</td><td>magnetic flux density</td><td>T (tesla = N A⁻¹ m⁻¹ = Wb m⁻²)</td></tr>
<tr><td>Φ</td><td>magnetic flux</td><td>Wb</td></tr>
<tr><td>μ₀</td><td>permeability of free space</td><td>4π × 10⁻⁷ T m A⁻¹</td></tr>
<tr><td>ω</td><td>angular velocity of a rotating coil</td><td>rad s⁻¹</td></tr>
</table>`,
    },
  },
};
