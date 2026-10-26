// Keyed-equation reference sheets, batch 6 of the keyed pass.
// Each section is appended to a note that states formulas but never defines
// their symbols, so the note fails the formula audit. Every equation here is
// copied from that note's own body (the verifier checks the text), and every
// equation paragraph carries its own <em>Key:</em> line.
//
//   node .freebuff/append-note-sections.cjs .freebuff/content-keyed-6.cjs
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/note-formulas.sql
module.exports = {
  minEquations: 3,
  sections: {
    /* ── Biology OL: Gas Exchange in Humans ───────────────────────────── */
    "f02c50e2-ed9d-43a4-8552-77b170e4a29d": {
      slug: "gas-exchange-in-humans/OL",
      html: `
<h2>Equations and symbols</h2>
<p>Two relations carry the whole of the ventilation arithmetic, and Paper 6 asks for both. Learn them as words first — the symbols are only shorthand for the measurements a spirometer trace gives you.</p>
<p><strong>minute ventilation = tidal volume × breathing rate</strong> <em>Key:</em> minute ventilation = volume of air moved in or out per minute (dm³ min⁻¹); tidal volume = volume breathed in one breath at rest (dm³); breathing rate = breaths per minute (min⁻¹). Multiply, never divide: a big tidal volume at a slow rate and a small one at a fast rate can give the same minute ventilation.</p>
<p><strong>minute ventilation = 0.5 × 14 = 7.0 dm³/min</strong> <em>Key:</em> 0.5 = tidal volume at rest (dm³); 14 = breathing rate at rest (breaths per minute); 7.0 = minute ventilation (dm³ min⁻¹). This is the at-rest figure every comparison starts from.</p>
<p><strong>ventilation = 2.0 × 32 = 64 dm³/min</strong> <em>Key:</em> 2.0 = tidal volume during vigorous exercise (dm³); 32 = breathing rate during exercise (breaths per minute); 64 = minute ventilation during exercise (dm³ min⁻¹). Both factors rise, which is why the product rises so sharply.</p>
<p><strong>Percentage change of ventilation = (64 − 7) ÷ 7 × 100 = 814 %</strong> <em>Key:</em> 64 = new minute ventilation (dm³ min⁻¹); 7 = original minute ventilation (dm³ min⁻¹); 814 % = the percentage increase. Divide by the <em>original</em> value, not the new one, and quote the multiplier as well — an 814 % rise is about nine times.</p>
<p><strong>0.4 × 18 = 7.2 dm³ per minute</strong> <em>Key:</em> 0.4 = tidal volume (dm³); 18 = breathing rate (breaths per minute); 7.2 = minute ventilation (dm³ min⁻¹). The standard two-mark calculation: one mark for multiplying the two measurements, one for the unit.</p>
<p>Where the question gives a spirometer trace instead of numbers, read the quantities off it and use the same relations: tidal volume is the peak-to-trough amplitude of one resting cycle (dm³), breathing rate is the number of cycles in a minute (min⁻¹), and vital capacity is the height from the deepest trough to the highest peak (dm³). Vital capacity is not part of minute ventilation — mixing the two up is the commonest lost mark in this calculation.</p>
`,
    },

    /* ── Biology OL: Organisms and their Environment ──────────────────── */
    "b6bc221a-eb16-488f-9e32-65eb3beaa3a5": {
      slug: "organisms-and-their-environment/OL",
      html: `
<h2>Equations and symbols</h2>
<p>Ecology questions look descriptive but are marked on arithmetic: a transfer efficiency, a pyramid step, a mark-release-recapture estimate, a quadrat mean. These five relations cover every calculation in the topic.</p>
<p><strong>Percentage efficiency = (energy transferred to next level ÷ energy available at this level) × 100</strong> <em>Key:</em> energy transferred = energy in the biomass of the next trophic level (kJ m⁻² year⁻¹); energy available = energy in the biomass of the level below (kJ m⁻² year⁻¹); the answer is a percentage, typically about 10 %. Do not divide by the top level and do not forget the × 100.</p>
<p><strong>2 500 ÷ 25 000 = 0.10 = 10 %</strong> <em>Key:</em> 2 500 = energy assimilated by grasshoppers (kJ m⁻² year⁻¹); 25 000 = energy fixed by the grassland (kJ m⁻² year⁻¹); 0.10 = the transfer efficiency as a decimal, which is 10 % as a percentage. The same division at each step is the whole 10 % rule.</p>
<p><strong>population = (number in first catch × number in second catch) ÷ number marked in second catch</strong> <em>Key:</em> first catch = animals caught, marked and released (individuals); second catch = animals caught on the recapture visit (individuals); marked in second catch = how many of those already carried a mark (individuals); population = estimated total in the habitat (individuals). Assumes marks do not rub off, marked animals mix fully, and no births, deaths or migration between visits.</p>
<p><strong>(40 × 50) ÷ 20 = 2000 ÷ 20 = 100 mice</strong> <em>Key:</em> 40 = mice marked and released; 50 = mice in the recapture; 20 = marked mice in the recapture; 100 = estimated population size (mice). If more than half the recapture is marked, the population is small — a sanity check worth one line.</p>
<p><strong>mean = (12 + 15 + 9 + 14 + 10) ÷ 5 = 60 ÷ 5 = 12 dandelions per m²</strong> <em>Key:</em> the five counts = dandelions per 1 m² quadrat (individuals m⁻²); 5 = number of quadrats; 12 = mean density (individuals m⁻²). Multiply the mean density by the habitat area to estimate the population — 12 × 200 = 2 400 for a 200 m² field.</p>
<p><strong>12 × 200 = 2 400</strong> <em>Key:</em> 12 = mean density from the quadrats (dandelions per m²); 200 = area of the field (m²); 2 400 = estimated population (dandelions). The mean is only a density; multiplying by the area is the step that turns it into a population, and it is worth a mark of its own.</p>
<p><strong>10 000 → 100 000 (frogs) → 1 000 000 (grasshoppers) → 10 000 000 kJ of grass</strong> <em>Key:</em> 10 000 kJ = energy the top level must receive; each arrow is one trophic step backwards, multiplying by 10; 10 000 000 kJ = producer energy needed. Work backwards with × 10, forwards with ÷ 10, and say which direction you used.</p>
`,
    },

    /* ── Physics AS: Materials and Deformation ────────────────────────── */
    "eff91bce-733f-4869-933f-f449fc857e90": {
      slug: "materials-deformation/AS",
      html: `
<h2>Equations and symbols</h2>
<p>The materials topic is six equations and one graph. Every one of them is a straight-line relation used inside the limit of proportionality, so the first thing to state in any answer is that the deformation is still elastic.</p>
<p><strong>F = k x</strong> <em>Key:</em> F = applied load (N); k = spring constant, the stiffness of this spring (N m⁻¹); x = extension, meaning loaded length minus original length (m). The gradient of a load–extension graph is k; beyond the limit of proportionality the line curves and the equation stops applying.</p>
<p><strong>σ = F / A</strong> <em>Key:</em> σ = tensile stress (Pa, where 1 Pa = 1 N m⁻²); F = tensile force (N); A = cross-sectional area (m²). Stress removes the size of the sample so two wires of different diameter can be compared.</p>
<p><strong>ε = x / L</strong> <em>Key:</em> ε = tensile strain (dimensionless — a ratio of two lengths); x = extension (m); L = <em>original</em> length, not stretched length (m). Quoting a unit for strain is a lost mark.</p>
<p><strong>E = σ / ε = F L / (A x)</strong> <em>Key:</em> E = Young modulus (Pa, usually GPa); σ = stress (Pa); ε = strain (dimensionless); F = load (N); L = original length (m); A = cross-sectional area (m²); x = extension (m). E is the gradient of the straight part of a stress–strain graph — not of a load–extension graph, which gives k.</p>
<p><strong>A = π d² / 4</strong> <em>Key:</em> A = cross-sectional area of the wire (m²); d = diameter (m); π = 3.14. Because d is squared, the percentage uncertainty in the diameter doubles in the final answer — the standard WPH13 data-analysis mark.</p>
<p><strong>E = 1/2 F x = 1/2 k x²</strong> <em>Key:</em> E = elastic strain energy stored (J); F = load at that extension (N); x = extension (m); k = spring constant (N m⁻¹). It is the area of the triangle under the load–extension graph, so the ½ is not optional: the load rose from zero.</p>
<p><strong>1/k = 1/k₁ + 1/k₂</strong> <em>Key:</em> k = combined spring constant of two springs in series (N m⁻¹); k₁, k₂ = their individual constants (N m⁻¹). Springs in series add extensions for the same load; springs in parallel add constants instead.</p>
<p><strong>½kx² = ½mv²</strong> <em>Key:</em> k = spring constant (N m⁻¹); x = compression or extension (m); m = mass of the launched object (kg); v = its launch speed (m s⁻¹). Energy stored in the spring becomes kinetic energy, which is the launch-speed question in one line.</p>
`,
    },

    /* ── Chemistry AS: Formulae, Equations and Amount of Substance ──────── */
    "b43306b7-ef00-4507-9aac-7f10d5b32897": {
      slug: "formulae-equations-and-amount-of-substance/AS",
      html: `
<h2>Equations and symbols</h2>
<p>Almost every mark in this topic comes from three relations, two conversions and one unit discipline. The sheet is ordered the way a calculation runs: moles first, then whatever the question asks you to turn them into.</p>
<p><strong>n = m / M</strong> <em>Key:</em> n = amount of substance (mol); m = mass (g); M = molar mass (g mol⁻¹), numerically equal to Mᵣ or the relative formula mass. The one relation nothing else works without: grams down, moles up.</p>
<p><strong>M = m / n</strong> <em>Key:</em> M = molar mass (g mol⁻¹); m = mass of the sample (g); n = amount it contains (mol). The same relation rearranged, and the one to use when a gas experiment gives you moles and a mass.</p>
<p><strong>N = n × L</strong> <em>Key:</em> N = number of particles (atoms, molecules or ions); n = amount (mol); L = the Avogadro constant, 6.02 × 10²³ mol⁻¹. Multiply by the subscript afterwards if the question asks for atoms rather than molecules — CO₂ has two oxygen atoms per molecule.</p>
<p><strong>n = c × V / 1000</strong> <em>Key:</em> n = amount of solute (mol); c = concentration (mol dm⁻³); V = volume of solution (<em>cm³</em>, which is why the 1000 is there). 1 dm³ = 1000 cm³, and forgetting that division is the single commonest lost mark in titration arithmetic.</p>
<p><strong>g dm⁻³ = mol dm⁻³ × M</strong> <em>Key:</em> g dm⁻³ = mass concentration (g dm⁻³); mol dm⁻³ = molarity (mol dm⁻³); M = molar mass (g mol⁻¹). Converts between the two concentration units the specification allows — 0.250 mol dm⁻³ sodium hydroxide is 0.250 × 40.0 = 10.0 g dm⁻³.</p>
<p><strong>ppm = (mass of component / mass of sample) × 10⁶</strong> <em>Key:</em> ppm = parts per million (a ratio, no unit); mass of component = mass of the trace substance (g); mass of sample = total mass (g). For a gas mixture the same ratio works by volume, so 410 ppm of carbon dioxide at 100 kPa is 0.0410 kPa partial pressure.</p>
<p><strong>pV = nRT</strong> <em>Key:</em> p = pressure (<em>Pa</em>, not kPa); V = volume (<em>m³</em>, not dm³ or cm³); n = amount of gas (mol); R = the gas constant, 8.31 J K⁻¹ mol⁻¹; T = thermodynamic temperature (K). Both conversions — kPa to Pa and dm³ to m³ — must happen before the substitution, and each is worth a mark.</p>
<p><strong>T = θ + 273</strong> <em>Key:</em> T = temperature in kelvin (K); θ = temperature in degrees Celsius (°C). Never insert a Celsius value into pV = nRT: a gas at 100 °C is at 373 K.</p>
<p><strong>percentage yield = (actual yield / theoretical yield) × 100</strong> <em>Key:</em> actual yield = mass or moles actually obtained (g or mol); theoretical yield = the maximum the balanced equation and the limiting reactant allow, in the same unit; the answer is a percentage of 100 or less. Below 100 % because of incomplete reaction, reversibility, side reactions and losses in transfer.</p>
<p><strong>atom economy = (molar mass of desired product / sum of molar masses of all products) × 100</strong> <em>Key:</em> desired product = the product the process wants (g mol⁻¹); sum of molar masses of all products = every product in the balanced equation, added (g mol⁻¹). It depends only on the equation, so it is fixed before the reaction runs — which is why addition reactions beat substitutions industrially.</p>
<p><strong>n = 0.100 × 25.0 / 1000 = 2.50 × 10⁻³ mol</strong> <em>Key:</em> 0.100 = concentration of the sodium hydroxide (mol dm⁻³); 25.0 = its volume (cm³); 2.50 × 10⁻³ = amount of solute (mol). The moles do not change on dilution — only the volume does — which is what makes a dilution question one line long.</p>
`,
    },

    /* ── Chemistry AS: Intermolecular Forces ───────────────────────────── */
    "7782b9f5-a0e8-4eb1-9179-6b98a1c02b52": {
      slug: "intermolecular-forces/AS",
      html: `
<h2>Equations and symbols</h2>
<p>This topic is argued in words, but the evidence for hydrogen bonding is numeric, and that is where the marks are: the energy budget of boiling water. The symbols of the bonding itself come first, because a dotted line is the only "equation" hydrogen bonding has.</p>
<p><strong>O–H···O</strong> <em>Key:</em> O–H = the covalent bond <em>inside</em> one water molecule, which survives boiling; ··· = the hydrogen bond <em>between</em> molecules, which is what boiling breaks. The same notation gives N–H···N in ammonia and F–H···F in hydrogen fluoride, and drawing the dotted line as a full line is the mistake the examiner is looking for.</p>
<p><strong>δ+ / δ−</strong> <em>Key:</em> δ+ = the partial positive charge on the hydrogen of a polar bond (fraction of an electron charge); δ− = the partial negative charge on the more electronegative atom. They are <em>partial</em>, not full, charges — writing H⁺ and O⁻ for a hydrogen bond is wrong, and it is a different species from the H⁺(aq) of an acid.</p>
<p><strong>q = mcΔT = 100 × 4.18 × 75 = 31 350 J = 31.4 kJ</strong> <em>Key:</em> q = energy supplied to the water (J); m = mass of water (g); c = specific heat capacity of water, 4.18 J g⁻¹ °C⁻¹; ΔT = temperature rise (75 °C here, from 25 °C to 100 °C). This is the energy that raises the temperature — notice how small it is beside the energy needed to boil the same water.</p>
<p><strong>n(H₂O) = 100 / 18.0 = 5.56 mol</strong> <em>Key:</em> n(H₂O) = amount of water (mol); 100 = its mass (g); 18.0 = its molar mass (g mol⁻¹). Amount, not mass, is what the enthalpy of vaporisation is quoted per — confusing the two scales the whole answer by a factor of 18.</p>
<p><strong>energy = 5.56 × 40.7 = 226 kJ</strong> <em>Key:</em> energy = energy needed to vaporise the water (kJ); 5.56 = amount of water (mol); 40.7 = enthalpy of vaporisation of water (kJ mol⁻¹) — the energy needed to overcome the hydrogen bonds holding one mole of molecules together. Per mole, not per gram.</p>
<p><strong>Total = 31.4 + 226 = 257 kJ</strong> <em>Key:</em> 31.4 kJ = energy to heat the water to 100 °C; 226 kJ = energy to vaporise it at that temperature; 257 kJ = the whole process. 88 % of it goes into separating molecules, which is the quantitative proof that boiling breaks intermolecular forces and not covalent bonds.</p>
<p>Read the boiling temperatures of the hydrogen halides the same way: HF at 20 °C sits far above the smooth HCl → HBr → HI trend (−85 °C, −67 °C, −35 °C), and that single outlier is the evidence for hydrogen bonding. When a question asks you to justify, quote the number that breaks the pattern — never the label alone.</p>
`,
    },

    /* ── Chemistry OL: Acids, Bases and Salts ─────────────────────────── */
    "216c9d31-4a93-46df-a523-fcc7557e1427": {
      slug: "acids-bases-and-salts/OL",
      html: `
<h2>Equations and symbols</h2>
<p>Acids and salts are marked almost entirely on equations: balanced formulae, state symbols, and the right products for the right reaction type. Every equation below is one the note already states, collected so the four reaction types and the four salt routes can be checked in one sweep.</p>
<p><strong>HCl(aq) → H⁺(aq) + Cl⁻(aq)</strong> <em>Key:</em> HCl = hydrogen chloride dissolved in water; H⁺(aq) = the proton released, which is what makes the solution acidic; Cl⁻(aq) = the chloride ion left behind. A single arrow means a strong acid, fully dissociated — every molecule releases its proton.</p>
<p><strong>CH₃COOH(aq) ⇌ H⁺(aq) + CH₃COO⁻(aq)</strong> <em>Key:</em> CH₃COOH = ethanoic acid; CH₃COO⁻ = the ethanoate ion; the ⇌ marks partial dissociation, so both the acid and its ions exist together. Strong versus weak is this arrow, not the concentration: dilute hydrochloric acid is strong, concentrated ethanoic acid is weak.</p>
<p><strong>Mg(s) + 2HCl(aq) → MgCl₂(aq) + H₂(g)</strong> <em>Key:</em> (s) = solid metal; (aq) = dissolved; (g) = gas evolved, which pops with a lighted splint. Metal + acid gives salt + hydrogen, and the state symbols are part of the answer rather than decoration.</p>
<p><strong>H⁺ + OH⁻ → H₂O</strong> <em>Key:</em> H⁺ = proton from the acid; OH⁻ = hydroxide ion from the alkali; H₂O = water. This is the ionic essence of every neutralisation, whichever acid and alkali were named in the question.</p>
<p><strong>Al₂O₃ + 6HCl → 2AlCl₃ + 3H₂O</strong> <em>Key:</em> Al₂O₃ = aluminium oxide, acting here as a base; HCl = hydrochloric acid; AlCl₃ = aluminium chloride (charge balance needs three Cl⁻ per Al³⁺); H₂O = water. Amphoteric means there is a second equation in the opposite direction.</p>
<p><strong>Al₂O₃ + 2NaOH → 2NaAlO₂ + H₂O</strong> <em>Key:</em> NaOH = sodium hydroxide, an alkali; NaAlO₂ = sodium aluminate, the salt formed when the oxide behaves as an acid; H₂O = water. The same oxide with both an acid and an alkali is the definition of amphoteric.</p>
<p><strong>BaCl₂(aq) + Na₂SO₄(aq) → BaSO₄(s) + 2NaCl(aq)</strong> <em>Key:</em> BaCl₂ and Na₂SO₄ = two soluble salts mixed as solutions; BaSO₄(s) = the insoluble precipitate, filtered, washed and dried; NaCl(aq) = the spectator ions left in solution. Precipitation is the only route to an insoluble salt.</p>
<p><strong>Mᵣ of CuSO₄·5H₂O = 160 + 5 × 18 = 250</strong> <em>Key:</em> 160 = Mᵣ of anhydrous copper(II) sulfate; 5 × 18 = the five water molecules of crystallisation; 250 = Mᵣ of the hydrated salt (no unit). Leaving the water out of the formula mass is the standard error in a hydrated-salt calculation.</p>
<p><strong>moles CaCO₃ = 10.0 / 100 = 0.100 mol</strong> <em>Key:</em> 10.0 = mass of calcium carbonate (g); 100 = its Mᵣ (g mol⁻¹); 0.100 = amount (mol). Then the 1 : 1 ratio gives the moles of calcium chloride, which is the step the mark scheme always rewards.</p>
<p><strong>mass CaCl₂ (Mᵣ = 111) = 0.100 × 111 = 11.1 g</strong> <em>Key:</em> 0.100 = moles of calcium chloride (mol); 111 = its Mᵣ (g mol⁻¹); 11.1 g = the theoretical yield. Theoretical means the maximum the equation allows, before any losses.</p>
<p><strong>percentage yield = 9.4 / 11.1 × 100 = 84.7%</strong> <em>Key:</em> 9.4 g = the dry salt actually collected; 11.1 g = the theoretical yield; 84.7 % = the yield, always below 100 because of crystals left in solution, spills or a product not fully dried. Never put the actual yield in the denominator.</p>
`,
    },

    /* ── Chemistry A2: Acid-base Equilibria ─────────────────────────────── */
    "0e710d77-178c-47d7-b1ce-ea81300abfce": {
      slug: "acid-base-equilibria/A2",
      html: `
<h2>Equations and symbols</h2>
<p>Five expressions do all the work in this topic — the pH definition, the ionic product of water, Ka, the buffer equation and the strong-base workaround. Learn the approximations alongside them, because the marks are usually for saying <em>why</em> a simplification is allowed.</p>
<p><strong>pH = −log10[H+]</strong> <em>Key:</em> pH = the negative logarithm to base 10 of the hydrogen ion concentration (no unit); [H+] = hydrogen ion concentration (mol dm⁻³). A tenfold change in [H+] moves the pH by exactly 1 unit, which is the whole point of the logarithmic scale.</p>
<p><strong>[H+] = 10^(−pH)</strong> <em>Key:</em> [H+] = hydrogen ion concentration (mol dm⁻³); pH = the measured pH (no unit). The inverse of the definition, and the line you need when a question gives a pH and asks for a concentration.</p>
<p><strong>Kw = [H+][OH−]</strong> <em>Key:</em> Kw = the ionic product of water, 1.0 × 10^(−14) mol² dm⁻⁶ at 298 K; [H+] and [OH−] = the two ion concentrations (mol dm⁻³). It is a constant only at a fixed temperature — quoting 1.0 × 10^(−14) at 320 K is a lost mark.</p>
<p><strong>[H+] = Kw / [OH−]</strong> <em>Key:</em> [H+] = hydrogen ion concentration (mol dm⁻³); Kw = the ionic product of water (mol² dm⁻⁶); [OH−] = hydroxide concentration (mol dm⁻³). The route from a strong base to a pH without going through pOH.</p>
<p><strong>pOH = −log10(0.050) = 1.30</strong> <em>Key:</em> 0.050 = [OH−] of the 0.050 mol dm⁻³ sodium hydroxide (mol dm⁻³), because a strong base dissociates completely; 1.30 = pOH (no unit). Then pH = 14.00 − 1.30 = 12.70 — the strong-base shortcut, valid at 298 K only.</p>
<p><strong>HA ⇌ H+ + A−</strong> <em>Key:</em> HA = the undissociated weak acid; H+ = the proton released; A− = the conjugate base; ⇌ marks the equilibrium, so all three exist together. A single arrow here would describe a strong acid, which is the mistake the whole topic is built to catch.</p>
<p><strong>Ka = [H+][A−] / [HA]</strong> <em>Key:</em> Ka = the acid dissociation constant (mol dm⁻³); [H+], [A−], [HA] = equilibrium concentrations (mol dm⁻³). Ka is fixed for a given acid at a given temperature, so it does not change when you dilute — only the concentrations do.</p>
<p><strong>Ka = [H+]2 / [HA]</strong> <em>Key:</em> [H+]2 = the square of the hydrogen ion concentration; the step that produces it is the approximation [H+] = [A−], which holds because every proton released comes from one molecule of acid. [HA] is taken as the <em>initial</em> concentration, valid only while dissociation is small — check it is under about 5 %.</p>
<p><strong>[H+] = √(Ka × [HA]) = √(1.35 × 10^(−5) × 0.100) = √(1.35 × 10^(−6)) = 1.16 × 10^(−3) mol dm−3</strong> <em>Key:</em> Ka = 1.35 × 10^(−5) mol dm⁻³ for propanoic acid; [HA] = 0.100 mol dm⁻³; [H+] = 1.16 × 10⁻³ mol dm⁻³. Then pH = −log10(1.16 × 10^(−3)) = 2.93 — a weak acid at the same concentration as a strong one is about two pH units less acidic.</p>
<p><strong>pH = pKa + log([A−] / [HA])</strong> <em>Key:</em> pKa = −log10 Ka (no unit); [A−] = concentration of the conjugate base from the salt (mol dm⁻³); [HA] = concentration of the undissociated weak acid (mol dm⁻³). This is the buffer equation: it is the ratio that sets the pH, not either concentration alone.</p>
<p><strong>pH = pKa</strong> <em>Key:</em> at the half-neutralisation point [HA] = [A−], so log 1 = 0 and the buffer equation collapses to this. It is how Core Practical 11 finds Ka from a titration curve without knowing any concentration.</p>
`,
    },

    /* ── Computer Science OL: Boolean Logic and Logic Gates ─────────────── */
    "410f9140-4fa3-467e-8cac-852bafc28653": {
      slug: "logic-gates-boolean-logic/OL",
      html: `
<h2>Equations and symbols</h2>
<p>Boolean algebra is a notation, and the marks are for applying one law per line. This sheet collects the identities and the two worked simplifications in the form the note writes them, so each line can be checked against its law.</p>
<p><strong>A + 0 = A</strong> <em>Key:</em> A = a Boolean variable (1 or 0); + = OR; 0 = FALSE. OR with FALSE changes nothing — the identity law, the Boolean version of adding zero.</p>
<p><strong>A · 1 = A</strong> <em>Key:</em> · = AND; 1 = TRUE. AND with TRUE leaves the variable alone. Writing the dot matters: AB and A·B mean the same thing, but a bare juxtaposition is easy to misread in a truth table.</p>
<p><strong>A + 1 = 1</strong> <em>Key:</em> OR with TRUE is always TRUE, whatever A is — the null (dominating) law. It is what lets a term disappear in a simplification.</p>
<p><strong>A · 0 = 0</strong> <em>Key:</em> AND with FALSE is always FALSE, so the whole term vanishes. Paired with A + 1 = 1, these two are the reason a simplification can throw terms away.</p>
<p><strong>A + Ā = 1</strong> <em>Key:</em> Ā = NOT A (the overline inverts the variable); a variable OR its own opposite is certainly TRUE — the complement law.</p>
<p><strong>A · Ā = 0</strong> <em>Key:</em> the same variable ANDed with its opposite can never both be TRUE, so the term is always FALSE. This is the line that deletes terms in a simplification.</p>
<p><strong>A + A = A</strong> <em>Key:</em> the idempotent law: repeating a condition adds nothing. Note it is <em>not</em> 2A — Boolean algebra has no coefficients, and writing 2A is a zero.</p>
<p><strong>AB = BA</strong> <em>Key:</em> the commutative law: the order of two ANDed variables does not matter, and the same holds for A + B = B + A. Safe to reorder, never safe to invent a subtraction or a division: neither exists here.</p>
<p><strong>A(B + C) = AB + AC</strong> <em>Key:</em> the distributive law, the one that behaves exactly like ordinary algebra. It is used in both directions: expanding a bracket to build a truth table, and factorising to collapse a circuit.</p>
<p><strong>NOT (A AND B) = Ā OR B̄</strong> <em>Key:</em> De Morgan's first law: break the bar and change AND to OR. The negation applies to the whole bracket, not just to A — which is why the brackets must be written.</p>
<p><strong>NOT (A OR B) = Ā AND B̄</strong> <em>Key:</em> De Morgan's second law, the same bar-break with OR becoming AND. Together the two laws let any NAND or NOR expression be turned into AND/OR/NOT form, which is why NAND and NOR are called universal gates.</p>
<p><strong>F = A·B + A·B̄</strong> <em>Key:</em> F = the output of the expression; A and B = the two inputs; B̄ = NOT B. Factorise to A·(B + B̄), then apply B + B̄ = 1 and A·1 = A, so the whole expression collapses to F = A — one wire instead of three gates.</p>
<p><strong>F = L · (B + S)</strong> <em>Key:</em> L = the lift is at a floor (1 or 0); B = the button is pressed; S = the sensor detects an obstacle; F = the door opens. The brackets are the design: the door opens only when L is 1 <em>and</em> at least one of B, S is 1, and the truth table must test the L = 0 rows to prove it.</p>
`,
    },

    /* ── Computer Science AS: Data Types, Records and Arrays ────────────── */
    "eb9deec8-1112-4fa5-aaff-c4302c1ed6ad": {
      slug: "data-structures/AS",
      html: `
<h2>Equations and symbols</h2>
<p>This topic has few formulas and a great many assignments, and the exam marks both the same way: every symbol on the left must be defined before it is used. These are the statements that carry a mark, in the order a program runs them.</p>
<p><strong>student = {"studentID": "S1024", "name": "Chen", "mark": 72}</strong> <em>Key:</em> student = the record variable (a dictionary, in Python); studentID, name, mark = the field names, each with its own type (STRING, STRING, INTEGER); S1024, Chen, 72 = the values held for one entity. A record's fields are addressed by <em>name</em>, which is the whole reason it exists: no "which index was the mark?"</p>
<p><strong>student["mark"] = 75</strong> <em>Key:</em> student["mark"] = the mark field of that one record (INTEGER); 75 = the new value written into it (INTEGER). The field name is in quotes because it is a key, not a variable — student[mark] would look up a different thing entirely.</p>
<p><strong>ord('A') = 65</strong> <em>Key:</em> ord = the function returning a character's code (INTEGER); 'A' = the single character (CHAR); 65 = its ASCII code point (no unit). The inverse is chr(66) = 'B', and between them they link a character to the binary pattern stored in memory.</p>
<p><strong>count = 0</strong> <em>Key:</em> count = the accumulator variable (INTEGER); 0 = its starting value, the additive identity. Every aggregate is built the same way: a counter starts at 0, a running total starts at 0, but a running <em>minimum</em> must start at the first element of the array, because 0 would beat every value in all-negative data.</p>
<p><strong>empty = 0</strong> <em>Key:</em> empty = the count of unoccupied seats (INTEGER); 0 = its initial value before the scan begins. Inside the nested loop, seats[row][col] == 0 tests one cell, and empty += 1 runs only when the test is true — the pattern for counting anything in a two-dimensional array.</p>
<p>Two relations run underneath all of it and are worth stating in an answer. An array of n slots indexed from 0 has valid indices 0 to n − 1, so a loop written range(n) is exactly right and range(n + 1) reads past the end. And insertion or deletion in an array moves O(n) elements, because every later slot has to shift — which is the cost sentence that distinguishes an array from a linked list.</p>
`,
    },

    /* ── Computer Science A2: Database Definition and Normalisation ─────── */
    "4e59efe4-7386-4b2f-92cf-1c627eb63269": {
      slug: "databases-and-data-definition/A2",
      html: `
<h2>Equations and symbols</h2>
<p>Database answers are argued in one notation and demonstrated in two predicates. The arrow is the notation: it says which attribute decides which, and every normal-form judgement in the topic is made by reading it.</p>
<p><strong>studentID → studentName</strong> <em>Key:</em> studentID = the key attribute (CHAR(5)); studentName = the attribute it determines (VARCHAR(60)); → reads "determines" or "functionally determines", so one studentID gives exactly one studentName. It does not read "depends on" in the everyday sense, and it is not an assignment.</p>
<p><strong>courseID → courseFee, lecturerID</strong> <em>Key:</em> courseID = the course key; courseFee = the fee charged for that course (a money value); lecturerID = the lecturer who teaches it. Two attributes on the right means one arrow can carry several determinants — and both of these are the reason a course must not be repeated on every enrolment row.</p>
<p><strong>lecturerID → lecturerName</strong> <em>Key:</em> lecturerID = the lecturer's key; lecturerName = their name. Because lecturerID is <em>not</em> a key of the enrolment table, this arrow is a transitive dependency, and transitive dependency is what 3NF removes.</p>
<p><strong>COUNT(o.orderID) = 0</strong> <em>Key:</em> COUNT = the aggregate that counts rows in a group; o.orderID = the order key from the joined orders table; 0 = no matching rows, which is what "customers with no orders" means. It belongs in HAVING, not WHERE: WHERE runs before the groups exist, so it cannot see an aggregate.</p>
<p><strong>p.patientID = a.patientID</strong> <em>Key:</em> p = the patient table, a = the appointment table (the aliases); patientID = the shared key on both sides (CHAR(5)). This is the join predicate, and the join type is the design decision: INNER keeps only matches, LEFT keeps every patient with nulls where nothing matched — which is precisely how "all patients, even those with no appointment" is answered.</p>
<p>Read the enrolment table's key the same way: the key is the pair (studentID, courseID), because neither column alone identifies a row — one student takes many courses, one course has many students. A <em>partial</em> dependency is a non-key attribute depending on only part of that pair, and 2NF is the normal form that splits them out. Naming the dependency, not the normal form, is what earns the mark: "studentName depends on studentID, which is only part of the key".</p>
`,
    },

    /* ── Mathematics OL: Arithmetic and Place Value ─────────────────────── */
    "fcf12351-d3b1-4ebf-a940-772b1080dca9": {
      slug: "number-arithmetic-and-place-value/OL",
      html: `
<h2>Equations and symbols</h2>
<p>Arithmetic has three relations worth memorising as formulas rather than as habits: the bounds of a rounded measurement, the prime-factor rule for HCF and LCM, and the reciprocal rule for division. Each is written here in the form the mark scheme expects to see, with every symbol named.</p>
<p><strong>upper bound = measured value + half the unit of accuracy</strong> <em>Key:</em> upper bound = the largest value the true measurement could be (same unit as the measurement); measured value = the rounded reading (cm, s, g …); half the unit of accuracy = half the last decimal place or whole unit the value was rounded to (0.5 cm for a measurement to the nearest cm). A measurement is an interval, not a point.</p>
<p><strong>lower bound = measured value - half the unit of accuracy</strong> <em>Key:</em> lower bound = the smallest value the true measurement could be; the other two symbols are as above. For 45 cm to the nearest centimetre the bounds are 44.5 cm and 45.5 cm, and the true value is written 44.5 ⩽ x &lt; 45.5.</p>
<p><strong>upper bound of speed = 45.5 / 5.5 = 8.27 cm s⁻¹</strong> <em>Key:</em> 45.5 = the upper bound of the distance (cm); 5.5 = the <em>lower</em> bound of the time (s); 8.27 = the largest possible speed (cm s⁻¹). To maximise a quotient, divide the largest numerator by the smallest denominator — the rule students most often reverse.</p>
<p><strong>lower bound of speed = 44.5 / 6.5 = 6.85 cm s⁻¹</strong> <em>Key:</em> 44.5 = the lower bound of the distance (cm); 6.5 = the <em>upper</em> bound of the time (s); 6.85 = the smallest possible speed (cm s⁻¹). Note the crossing: small over large, never small over small.</p>
<p><strong>60 = 2² × 3 × 5</strong> <em>Key:</em> 60 = the number being factorised; 2, 3, 5 = its prime factors; the index 2 counts how many times that prime divides the number. A prime factor tree produces this line, and everything about HCF and LCM is read from it.</p>
<p><strong>HCF: 2² × 3 = 12</strong> <em>Key:</em> 2² × 3 = the product of the primes <em>common</em> to both numbers, each taken at its <em>lowest</em> power; 12 = the highest common factor of 60 and 84. Common primes only, lowest powers — one rule, both halves.</p>
<p><strong>LCM: 2² × 3 × 5 × 7 = 420</strong> <em>Key:</em> every prime appearing in either number, each at its <em>highest</em> power; 420 = the lowest common multiple of 60 and 84. Check it with 60 × 84 = HCF x LCM = 12 × 420 = 5040, which is the identity that catches both errors at once.</p>
<p><strong>3/4 × 5/2 = (3 × 5)/(4 × 2) = 15/8 = 1 7/8</strong> <em>Key:</em> 3/4 = the fraction being divided (the dividend); 5/2 = the reciprocal of 2/5, the divisor flipped; 15/8 = the quotient, which is 1 7/8 as a mixed number. Dividing by a fraction is multiplying by its reciprocal, and checking in decimals — 0.75 ÷ 0.4 = 1.875 — proves the rule rather than asserting it.</p>
<p><strong>3 + 4 × 2² = 3 + 4 × 4 = 3 + 16 = 19</strong> <em>Key:</em> 2² = the index, evaluated first; 4 × 4 = the multiplication, evaluated next; 3 + 16 = the addition, evaluated last. Brackets change everything: (3 + 4) × 2² = 28, which is why the absence of brackets is itself a statement about order.</p>
<p><strong>84 × 0.85 × 0.90 = 64.26</strong> <em>Key:</em> 84 = the original price (£); 0.85 = the multiplier for a 15 % reduction (1 − 0.15); 0.90 = the multiplier for a further 10 % reduction (1 − 0.10); 64.26 = the final price (£). Percentage changes multiply as multipliers, never add: two reductions of 15 % and 10 % are a 23.5 % reduction, not 25 %.</p>
`,
    },

    /* ── Mathematics AS: Integration ────────────────────────────────────── */
    "3bc168f1-4a43-4e2f-9954-2f256539800e": {
      slug: "integration/AS",
      html: `
<h2>Equations and symbols</h2>
<p>Integration is four formulas and two decisions: which power rule, and whether the answer is signed. Learn the rule with its condition attached — the exception at n = −1 is the mark most often lost.</p>
<p><strong>integral of x^n dx = x^(n+1)/(n+1) + c</strong> <em>Key:</em> x = the variable of integration (no units for a pure function); n = the power, any real number except −1; c = the constant of integration, fixed by a boundary condition. Raise the power by one, then divide by the new power — the reverse of differentiating, and n = −1 is excluded because it would divide by zero.</p>
<p><strong>if dy/dx = x^n then y = x^(n+1)/(n+1) + c   (n not -1)</strong> <em>Key:</em> dy/dx = the gradient function; y = the function recovered from it; n = the power; c = the constant. The same statement read from the other end: differentiating the answer returns the question.</p>
<p><strong>integral of k f(x) dx = k integral of f(x) dx</strong> <em>Key:</em> k = a constant multiplier (no units); f(x) = the function being integrated. Constants pass through the integral sign, which is why a polynomial is integrated term by term.</p>
<p><strong>integral from a to b of f(x) dx = F(b) - F(a)</strong> <em>Key:</em> a = the lower limit; b = the upper limit; f(x) = the integrand; F(x) = any antiderivative of f(x). Upper value minus lower value, never the reverse — a negative area usually means the limits were swapped.</p>
<p><strong>velocity v = ds/dt</strong> <em>Key:</em> v = velocity (m s⁻¹); s = displacement (m); t = time (s). The gradient form; integrate it in reverse to recover displacement.</p>
<p><strong>displacement s = integral of v dt</strong> <em>Key:</em> s = displacement (m); v = velocity (m s⁻¹); t = time (s). The signed integral, so motion backwards subtracts from the total.</p>
<p><strong>acceleration a = dv/dt</strong> <em>Key:</em> a = acceleration (m s⁻²); v = velocity (m s⁻¹); t = time (s). The link that lets a question give acceleration and ask for velocity or displacement.</p>
<p><strong>velocity v = integral of a dt</strong> <em>Key:</em> v = velocity (m s⁻¹); a = acceleration (m s⁻²); t = time (s). Integrate, then use "starts from rest" or a stated value to fix the constant.</p>
<p><strong>integral of |v| = distance travelled</strong> <em>Key:</em> |v| = the magnitude of the velocity, so every piece counts positive (m s⁻¹); the integral gives distance (m), not displacement. Split the integral wherever v = 0, because that is where the sign changes.</p>
<p><strong>9k = 36  →  k = 4</strong> <em>Key:</em> 9k = the definite integral of kx² from 0 to 3, written with the unknown constant k; 36 = the given area (square units); k = 4 (no units). The inverted-area question: set the integral equal to the stated area and solve, rather than integrating a known function.</p>
`,
    },

    /* ── Mathematics A2: Permutations and Combinations ──────────────────── */
    "a8ebc823-3b62-4380-be53-b636ae87d6b4": {
      slug: "permutations-and-combinations/A2",
      html: `
<h2>Equations and symbols</h2>
<p>Every formula here is a shortcut for the multiplication principle, and each one carries a condition that decides whether it applies. The condition is the mark: "order matters" and "items are identical" change the count by a factorial.</p>
<p><strong>n! = n x (n-1) x ... x 2 × 1</strong> <em>Key:</em> n = the number of distinct objects (a count, no units); n! = the number of orders they can be arranged in (a count). The falling product stops at 1, and 0! = 1 by convention so the formulas stay consistent.</p>
<p><strong>nPr = n!/(n - r)!</strong> <em>Key:</em> n = how many objects are available; r = how many are being chosen; nPr = the number of <em>ordered</em> selections (a count). Read it as "start at n and write down r factors": 26P4 = 26 × 25 × 24 × 23.</p>
<p><strong>nCr = n!/(r!(n - r)!)</strong> <em>Key:</em> n = objects available; r = objects chosen; nCr = the number of <em>unordered</em> selections (a count). The extra r! in the denominator is exactly what removes the orderings — which is the whole difference between a permutation and a combination.</p>
<p><strong>nPr = nCr × r!</strong> <em>Key:</em> nPr = ordered selections; nCr = unordered selections; r! = the ways to order each selection. The identity explains both formulas at once: count the sets, then arrange each one.</p>
<p><strong>26P4 = 26 × 25 × 24 × 23 = 358,800</strong> <em>Key:</em> 26 = letters available; 4 = letters chosen without replacement; 358,800 = ordered passwords (a count). The factors fall because each letter is used once — repetition allowed would give 26⁴ instead.</p>
<p><strong>26C4 = 14,950</strong> <em>Key:</em> 26 = students available; 4 = students chosen; 14,950 = unordered groups (a count). The same numbers as the password question, 24 times smaller, because a group of four has 4! orderings that all count as one group.</p>
<p><strong>n!/(a! b! c! ...)</strong> <em>Key:</em> n = total items; a, b, c = the sizes of the groups of identical items. Dividing by the factorials of the repeats removes the arrangements that look identical — 6!/(1! 3! 2!) = 60 arrangements of BANANA, not 720.</p>
<p><strong>6!/(1! 3! 2!) = 720/12 = 60</strong> <em>Key:</em> 6 = letters in BANANA; 1! = the single B; 3! = the three As; 2! = the two Ns; 60 = distinct arrangements (a count). Every repeated letter needs its own factorial in the denominator, or the count is inflated.</p>
<p><strong>n^r</strong> <em>Key:</em> n = choices available at each stage; r = number of stages; the result counts selections <em>with</em> repetition allowed (a count). It is the multiplication principle applied r times — three digits from 0 to 9 with repeats gives 10³ = 1000.</p>
<p><strong>(n - 1)!</strong> <em>Key:</em> n = people or objects around a circle; the result counts distinct circular arrangements (a count), because rotating a seating does not create a new one. For a necklace, where a reflection is also the same, divide once more: (n - 1)!/2.</p>
<p><strong>5! × 2! = 120 × 2 = 240</strong> <em>Key:</em> 5! = the arrangements of four single items plus the glued pair as one object; 2! = the internal orders of the pair; 240 = total arrangements (a count). Gluing without the internal factor halves the answer, which is the classic lost mark in this topic.</p>
`,
    },

    /* ── Mathematics OL: Congruence and Similarity ─────────────────────── */
    "c003d9a3-a2b3-4cd9-a6af-7fdbe98cf9d6": {
      slug: "geometry-congruence-and-similarity/OL",
      html: `
<h2>Equations and symbols</h2>
<p>Similarity is one symbol — the scale factor k — and a chain that squares and cubes it. Almost every lost mark in this topic comes from using k where k² belongs, so the three factors are set out first.</p>
<p><strong>k = length in image / length in original</strong> <em>Key:</em> k = the linear scale factor (no units, because it is a ratio of two lengths); image = the enlarged or reduced shape; original = the shape you started from. Divide in that order: k &gt; 1 enlarges, k &lt; 1 reduces, and using the inverse turns every later answer upside down.</p>
<p><strong>missing length = corresponding length x k</strong> <em>Key:</em> missing length = the side being found (cm); corresponding length = its partner on the other shape, not just any side (cm); k = the linear scale factor (no units). Corresponding means "same position in the shape", and the vertex order in the statement of similarity tells you which is which.</p>
<p><strong>k = DE/AB = 9/6 = 1.5</strong> <em>Key:</em> AB = 6 cm on the original triangle; DE = 9 cm on its image; k = 1.5 (no units). Then EF = BC x k = 8 × 1.5 = 12 cm — find k once from a pair whose lengths you know, then apply it to the one you do not.</p>
<p><strong>area factor = k² = 4</strong> <em>Key:</em> k = the linear scale factor (no units); k² = the factor by which every area changes. Doubling the lengths multiplies area by four, not two — the single most expensive error in Paper 4.</p>
<p><strong>volume ratio = k³ = 27/125</strong> <em>Key:</em> k = the linear scale factor; k³ = the factor by which every volume changes. Coming the other way, from volumes to lengths, take the cube root; from areas to lengths, take the square root.</p>
<p><strong>area factor = 200/50 = 4</strong> <em>Key:</em> 50 cm² = area of the smaller shape; 200 cm² = area of the larger; 4 = the area factor (no units). Then k = √4 = 2, and the linear sizes double — work areas to lengths through the square root, never directly.</p>
<p><strong>length factor k = √(4) = 2</strong> <em>Key:</em> 4 = the ratio of the two areas (no units); k = 2 (no units). The square root is what turns an area comparison into a length comparison.</p>
<p><strong>k = cube root of 8 = 2</strong> <em>Key:</em> 8 = the ratio of the two volumes (2000 ml ÷ 250 ml, no units); k = 2 (no units). Then height = 12 × 2 = 24 cm: a volume ratio becomes a length ratio only through the cube root.</p>
<p><strong>k = AB/AD = (4 + 6)/4 = 2.5</strong> <em>Key:</em> AD = 4 cm, the small triangle's side from the vertex; AB = 4 + 6 = 10 cm, the whole side of the large triangle; k = 2.5 (no units). The parallel line DE gives the similar triangle, and the correspondence runs from the shared vertex — that is why the whole side AB is used, not DB.</p>
<p><strong>k = 24/15 = 1.6</strong> <em>Key:</em> 15 cm = the original longer side; 24 cm = the enlarged longer side; k = 1.6 (no units). Then shorter side = 10 × 1.6 = 16 cm and the area ratio is k² = 2.56 — an enlargement of 60 % in length is an enlargement of 156 % in area.</p>
<p>A last relation that is not a formula but is marked like one: a shape with no rotational symmetry has order <strong>1</strong>, not 0, because one full turn always maps it onto itself. And a regular n-gon has exactly n lines of symmetry and rotational order n — count them, never assume them.</p>
`,
    },

    /* ── Mathematics A2: The Binomial Expansion ──────────────────────────── */
    "50371f75-b6a2-488e-b042-9f655f4ea264": {
      slug: "binomial-expansion/A2",
      html: `
<h2>Equations and symbols</h2>
<p>Three forms and one condition. The general term locates a coefficient without expanding anything, the infinite series handles negative and fractional powers, and the validity range is a mark of its own.</p>
<p><strong>(a + b)^n = sum from r = 0 to n of nCr a^(n - r) b^r</strong> <em>Key:</em> a = the first term of the bracket; b = the second term; n = the index, a positive integer here; r = the term counter running 0 to n; nCr = n!/(r!(n − r)!), the binomial coefficient. Powers of a fall while powers of b rise, and the two always add to n.</p>
<p><strong>general term: nCr a^(n - r) b^r</strong> <em>Key:</em> r = which term you want, counted from 0; a, b = the two terms of the bracket; n = the index. Write this line before substituting anything — the constant term is where the power of x is zero, and the coefficient of x³ is where the power is 3.</p>
<p><strong>(1 + x)^n = 1 + nx + n(n-1)x²/2! + n(n-1)(n-2)x³/3! + ...</strong> <em>Key:</em> n = the index, which may be negative or fractional; x = the variable, subject to |x| &lt; 1; the factorials in the denominators come from the falling product, which is why the series never terminates. Each new coefficient multiplies the previous one by the next factor in the falling product and divides by the next integer.</p>
<p><strong>valid for |x| < 1</strong> <em>Key:</em> x = the <em>whole</em> variable part of the bracket, not just the letter; |x| &lt; 1 = the condition under which the infinite series converges. For (1 + 2x)^(1/2) the condition is |2x| &lt; 1, so |x| &lt; 1/2 — quoting the wrong range costs the mark even when the series is right.</p>
<p><strong>(A + Bx)^n = A^n (1 + Bx/A)^n, valid |Bx/A| < 1</strong> <em>Key:</em> A = the constant term (must be taken outside); B = the coefficient of x; n = the index. This factorisation is compulsory whenever A ≠ 1, because the standard series only exists for a bracket starting with 1 — and it generates the range |x| &lt; |A/B|.</p>
<p><strong>|Bx/A| < 1  →  |x| < |A/B|</strong> <em>Key:</em> A = the constant term of the bracket; B = the coefficient of x; the result is the validity range (no units). For (3 − 2x)^(−2) this gives |x| &lt; 3/2.</p>
<p><strong>sum of nCr over r = 0..n = 2^n</strong> <em>Key:</em> nCr = the binomial coefficients of row n; 2ⁿ = their total. It follows from setting a = b = 1 in the theorem, and the alternating sum is zero by setting a = 1, b = −1.</p>
<p><strong>nCr = nC(n - r)</strong> <em>Key:</em> nCr = choosing r from n; nC(n − r) = choosing which to leave out. That symmetry is why the coefficients of a row read the same forwards and backwards — 6C2 = 15 and 6C4 = 15.</p>
<p><strong>24k² = 216  →  k² = 9  →  k = 3 or -3</strong> <em>Key:</em> 24k² = the coefficient of x² in (2 + kx)⁴, from 6(2²)(kx)²; 216 = the stated coefficient; k = ±3 (no units). Both roots are valid unless the question fixes k &gt; 0, so quote both and say why one is rejected if it is.</p>
<p><strong>na = 12</strong> <em>Key:</em> n = the index; a = the coefficient of x inside the bracket; 12 = the given coefficient of x in (1 + ax)ⁿ. One coefficient gives one equation, so a second (n(n − 1)a²/2 = 60) is needed — eliminating a by substituting a = 12/n gives n = 6, a = 2.</p>
`,
    },

    /* ── Physics A2: Further Mechanics ──────────────────────────────────── */
    "aa5be96b-372d-4bee-9a92-9a5530573c02": {
      slug: "further-mechanics/A2",
      html: `
<h2>Equations and symbols</h2>
<p>Two vectors do all the work here — momentum, which is conserved, and impulse, which is how momentum changes. Direction is part of every symbol, so a sign error is a wrong answer even when the arithmetic is right.</p>
<p><strong>p = m v</strong> <em>Key:</em> p = momentum (kg m s⁻¹, equivalent to N s); m = mass (kg); v = velocity (m s⁻¹), with its direction as a sign. Momentum is a vector, so "right" and "left" must be fixed before the first line of any collision question.</p>
<p><strong>J = F Δt = Δp = m v - m u</strong> <em>Key:</em> J = impulse (N s); F = average force during contact (N); Δt = duration of contact (s); Δp = change in momentum (kg m s⁻¹); m = mass (kg); u = velocity before (m s⁻¹); v = velocity after (m s⁻¹). A rebound makes u negative, so the change is the sum of the speeds, not their difference.</p>
<p><strong>F = Δp/Δt = 12/0.012 = 1000 N = 1.0 kN</strong> <em>Key:</em> 12 kg m s⁻¹ = the momentum change of the struck ball; 0.012 s = the contact time (12 ms); 1000 N = the average force. The whole physics of crumple zones is in this division: fixed Δp, longer Δt, smaller F.</p>
<p><strong>Δv = 40/2.0 = 20 m s⁻¹</strong> <em>Key:</em> 40 N s = the impulse, read as the area under a force–time graph (a triangle here, so ½ x base x height); 2.0 kg = the object's mass; 20 m s⁻¹ = its speed change. The area is the geometric shape's, not base × height for a triangle.</p>
<p><strong>0 = 0.30 × 12 + 0.20 v</strong> <em>Key:</em> 0 = the total momentum of the firework before it explodes (at rest); 0.30 kg and 0.20 kg = the two fragments; 12 m s⁻¹ = the velocity of the heavier piece; v = the velocity of the lighter piece (m s⁻¹, negative because it moves the other way). An explosion is conservation with the left side equal to zero.</p>
<p><strong>v2 = -(m¹/m²) v1</strong> <em>Key:</em> m¹ = the mass of the projectile (kg); m² = the mass of the recoiling body (kg); v1 = the projectile's velocity (m s⁻¹); v2 = the recoil velocity (m s⁻¹), negative because it is opposite. The heavier the recoiling body, the slower it moves — 0.020 kg at 400 m s⁻¹ gives a 4.0 kg rifle just 2.0 m s⁻¹.</p>
<p><strong>|Δp| = 2 m v cos(θ)</strong> <em>Key:</em> Δp = the change in momentum of a ball bouncing off a smooth wall (kg m s⁻¹); m = its mass (kg); v = its speed (m s⁻¹), unchanged in an elastic bounce; θ = the angle between the velocity and the normal to the wall (degrees). The parallel component is untouched, so only the perpendicular one doubles — hence the factor 2 cos θ.</p>
<p><strong>KE before = (1/2) × 1500 × 400 = 300 000 J</strong> <em>Key:</em> 1500 kg = the mass of the moving car; 400 = v², since v = 20 m s⁻¹ (m² s⁻²); 300 000 J = its kinetic energy. Comparing it with the 180 000 J after the crash is the whole energy audit: 120 kJ left the kinetic store as heat, sound and deformation, while momentum stayed exactly conserved.</p>
<p>Two sentences carry marks of their own and belong with the equations: momentum is conserved in every collision, kinetic energy only in elastic ones; and the impulse from a force–time graph is the area beneath it, counted square by square when the line is curved.</p>
`,
    },

    /* ── Biology A2: Respiration, Muscles and the Internal Environment ───── */
    "a582f48a-8c36-42e4-8134-cc3682a9fe47": {
      slug: "respiration-muscles-and-internal-environment/A2",
      html: `
<h2>Equations and symbols</h2>
<p>Two pieces of arithmetic sit inside this otherwise descriptive topic: the respirometer calculation that turns a moving drop into an oxygen-uptake rate, and the respiratory quotient that identifies which substrate is being respired. Both are marked on method and on units.</p>
<p><strong>3.0 − 0.2 = 2.8 cm</strong> <em>Key:</em> 3.0 cm = the distance the drop moved with living seeds (cm); 0.2 cm = the distance the dead-seed control moved in the same time (cm); 2.8 cm = the movement due to respiration alone. The control is not optional: it removes the effect of changing atmospheric pressure and temperature, which move the drop with no respiration at all.</p>
<p><strong>cross-sectional area = π times the radius squared = 3.14 times 0.05 squared = 3.14 times 0.0025 = 0.00785 cm²</strong> <em>Key:</em> π = 3.14 (no units); 0.05 cm = the capillary's internal radius (0.5 mm); 0.00785 cm² = its cross-sectional area. The radius must be in cm to match the distance in cm — the constant source of a factor-of-ten error.</p>
<p><strong>Volume = area times distance = 0.00785 times 2.8 = 0.0220 cm³</strong> <em>Key:</em> 0.00785 cm² = the capillary cross-section; 2.8 cm = the corrected movement; 0.0220 cm³ = the volume of oxygen taken up in 30 minutes. Length becomes volume only through the bore of the tube.</p>
<p><strong>0.0220 times 2 = 0.0440 cm³</strong> <em>Key:</em> 0.0220 cm³ = oxygen used in 30 minutes; 2 = the factor that converts a half hour into an hour (min⁻¹ to h⁻¹); 0.0440 cm³ = oxygen used per hour. State the scaling explicitly — a rate per hour is what the mark scheme asks for.</p>
<p><strong>rate = 0.044 cm³ of oxygen per gram per hour</strong> <em>Key:</em> 0.044 cm³ h⁻¹ = oxygen uptake per hour; the mass of tissue = 1.00 g, so the division is by 1 and the rate is expressed per gram (cm³ g⁻¹ h⁻¹). Dividing by mass is what makes two samples of different size comparable, and it is the unit the question expects.</p>
<p><strong>RQ = CO₂ released ÷ O₂ consumed</strong> <em>Key:</em> RQ = the respiratory quotient (no units, because it is a ratio of gas volumes or of moles); CO₂ released and O₂ consumed are measured over the same period (cm³ or mol). A quotient needs the same units above and below — mixing volumes with masses is the mistake this definition exists to prevent.</p>
<p><strong>C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O</strong> <em>Key:</em> C₆H₁₂O₆ = glucose; O₂ = oxygen consumed; CO₂ and H₂O = the products. The coefficients are the stoichiometry the quotient is built from: six of each gas in and out.</p>
<p><strong>RQ = 6 ÷ 6 = 1.0</strong> <em>Key:</em> 6 = moles of CO₂ produced per mole of glucose; 6 = moles of O₂ consumed; RQ = 1.0, the value for carbohydrate. Fats give about 0.7 because they need more oxygen per carbon dioxide released — so the number itself identifies the substrate, which is why you calculate it rather than quote it.</p>
`,
    },
  },
};
