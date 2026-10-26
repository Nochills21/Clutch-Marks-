// Physics A2 notes, deepened to the depth bar — Thermal Physics (statements
// 14.1-14.3, 15.1-15.3, 16.1-16.2), Nuclear Physics (11.1, 23.1-23.2) and
// Oscillations and Waves II (17.1-17.3). Board framing: Edexcel IAL Physics Units 4-6.
// Apply with:
//   node .freebuff/deepen-materials.cjs .freebuff/content-phy-a2-a-depth.cjs > .freebuff-tmp/phy-a2-a.sql
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/phy-a2-a.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/phy-a2-a.sql --apply    (live)
module.exports = {
  expectType: "notes",
  titles: {
    "9aeb73c7-e1de-4bae-bb5e-eb23ae83e3b3": "A Level Physics: Thermal Physics",
    "0b01158e-1681-416b-986a-b17cb4bc9956": "A Level Physics: Nuclear Physics",
    "17860f55-8ba0-4591-85d1-577aabc0b5af": "A Level Physics: Oscillations and Waves II",
  },
  rows: {
    "9aeb73c7-e1de-4bae-bb5e-eb23ae83e3b3": `
<h2>A Level Physics: Thermal Physics</h2>
<p>Thermal physics is the accountancy of heat: what temperature really measures, how much energy it takes to change a substance's state, and how the invisible motion of billions of particles produces the pressure in a balloon. This note builds the whole subject from zero: thermal equilibrium and the temperature scales, specific heat capacity and specific latent heat with full calorimetry arithmetic, the mole and the equation of state, the kinetic theory that justifies it, and the first law of thermodynamics — the energy bookkeeping rule that governs engines, fridges and stars alike.</p>

<h3>Thermal equilibrium</h3>
<p>Heat flows from hotter to cooler bodies until no further net transfer occurs — that final state is thermal equilibrium, when both bodies are at the same temperature. The zeroth law of thermodynamics makes the logic precise: if A is in thermal equilibrium with B, and B with C, then A is in equilibrium with C — which is exactly why thermometers work (they reach equilibrium with the thing measured, and the reading transfers). The distinction examiners demand: temperature measures the average random kinetic energy per particle; heat is energy in transit because of a temperature difference. Objects do not contain heat — they contain internal energy.</p>

<h3>Temperature scales</h3>
<p>The Celsius scale is defined by two fixed points: the melting point of pure ice (0 °C) and the boiling point of pure water (100 °C) at standard pressure. The thermodynamic (Kelvin) scale starts at absolute zero — the temperature at which particles have minimum kinetic energy, −273.15 °C — and its unit, the kelvin, is the same size as the degree Celsius:</p>
<pre><code>T (K) = theta (deg C) + 273        (273.15 exact; 273 usual in exams)
temperature change: Delta T in K = Delta theta in deg C</code></pre>
<p>Every gas-law and kinetic-theory calculation demands kelvin; forgetting the conversion is the single commonest thermal error. A temperature change of 10 °C is a change of 10 K — only absolute values need converting.</p>

<h3>Specific heat capacity</h3>
<p>Heating a body raises its temperature; the energy needed depends on the substance's own reluctance to change temperature:</p>
<pre><code>E = m c Delta theta        (or E = C Delta theta for a whole body)

E in J, m in kg, c in J kg-1 K-1 (specific heat capacity)
Delta theta in deg C or K (the same size)
C = m c = heat capacity of the object (J K-1)</code></pre>
<p>The electrical method of measuring c is examinable as a practical: a heater of known power runs for a known time (E = Pt), the temperature rise is recorded, and losses are reduced with insulation and a lid; the graph of temperature against time is extrapolated back to the start to correct for losses during heating.</p>
<p><strong>Worked example 1.</strong> A 2.0 kg aluminium block (c = 900 J kg⁻¹ K⁻¹) is heated from 20 °C to 80 °C by a 500 W heater. Find the energy needed and the minimum heating time.</p>
<pre><code>E = m c Delta theta = 2.0 x 900 x 60 = 108 000 J = 108 kJ
t = E/P = 108 000/500 = 216 s = 3.6 minutes</code></pre>
<p><strong>Worked example 2 (mixing).</strong> 0.50 kg of water at 90 °C is mixed with 0.50 kg of water at 10 °C. Find the final temperature (no losses).</p>
<pre><code>heat lost = heat gained
m c (90 - T) = m c (T - 10)   (same m and c cancel)
90 - T = T - 10 -> 100 = 2T -> T = 50 deg C</code></pre>
<p>The mixing equation is worth learning as a shape: Σ(heat lost) = Σ(heat gained), with each term mcΔθ evaluated from its own temperature <em>difference</em> to the final T.</p>

<h3>Specific latent heat</h3>
<p>During a change of state, energy goes into breaking intermolecular bonds rather than raising temperature — the heating curve flatlines at the melting or boiling point. The energy for the change:</p>
<pre><code>E = m L        L = specific latent heat (J kg-1)

L_fusion for melting/freezing; L_vaporisation for boiling/condensing</code></pre>
<p><strong>Worked example.</strong> A 3.0 kW kettle boils 1.5 kg of water already at 100 °C. How long to boil it dry (L_vap = 2.26 × 10⁶ J kg⁻¹)?</p>
<pre><code>E = m L = 1.5 x 2.26 x 10^6 = 3.39 x 10^6 J
t = E/P = 3.39 x 10^6/3000 = 1130 s = 18.8 minutes</code></pre>
<p>Reading a heating curve is a standard question: sloped sections are temperature rise (mcΔθ applies), flat sections are change of state (mL applies), and the flat at 0 °C is melting while the flat at 100 °C is boiling.</p>

<h3>The mole</h3>
<p>The mole counts particles the way a dozen counts eggs: one mole contains exactly Nₐ = 6.02 × 10²³ particles (Avogadro's constant). The molar mass M is the mass of one mole (numerically the relative atomic mass in grams; in kg mol⁻¹ for calculations).</p>
<pre><code>n = m / M        N = n N_A

n in mol, m in kg (or g consistently with M), M in kg mol-1</code></pre>
<p><strong>Worked example.</strong> Find the number of molecules in 8.0 g of oxygen (O₂, M = 0.032 kg mol⁻¹).</p>
<pre><code>n = m/M = 0.008/0.032 = 0.25 mol
N = n N_A = 0.25 x 6.02 x 10^23 = 1.505 x 10^23 molecules
  = 1.5 x 10^23 (2 s.f.)</code></pre>

<h3>The equation of state</h3>
<p>For a fixed mass of an ideal gas, pressure, volume and temperature obey one master equation:</p>
<pre><code>p V = n R T        (also p V = N k T)

p in pascals (Pa), V in m3, T in kelvin (K)
R = 8.31 J K-1 mol-1  (molar gas constant)
k = 1.38 x 10-23 J K-1 (Boltzmann constant), N = number of molecules</code></pre>
<p>Unit discipline: 1 atm = 1.01 × 10⁵ Pa; 1 cm³ = 10⁻⁶ m³; 1 litre = 10⁻³ m³. The ideal-gas assumptions are examinable: molecules are point particles with negligible volume, intermolecular forces are negligible except during collisions, and collisions are perfectly elastic.</p>
<p><strong>Worked example.</strong> 0.40 mol of gas occupies 2.0 × 10⁻³ m³ at 27 °C. Find the pressure.</p>
<pre><code>T = 27 + 273 = 300 K
p = nRT/V = (0.40 x 8.31 x 300)/(2.0 x 10^-3)
  = 997.2/2.0 x 10^-3 = 4.99 x 10^5 Pa = 5.0 x 10^5 Pa (2 s.f.)</code></pre>
<p>Boyle's, Charles's and the pressure law are all slices of this one equation — if a question gives a change at constant moles, either hold one variable fixed to get the simple law, or write p₁V₁/T₁ = p₂V₂/T₂ for the general case.</p>

<h3>Kinetic theory</h3>
<p>The kinetic model explains pressure: gas molecules collide elastically with container walls, and each collision transfers momentum; billions per second give a steady average force per unit area — pressure. The model's assumptions (large number of molecules, random motion, elastic collisions, negligible molecular volume, forces only during collisions) justify the ideal-gas behaviour, and the theory links the microscopic to the macroscopic:</p>
<pre><code>p V = (1/3) N m c^2        c = root-mean-square speed

mean kinetic energy per molecule = (3/2) k T
so (1/2) m c^2 = (3/2) k T  ->  c = sqrt(3 k T / m)</code></pre>
<p>The rms speed rises with the square root of absolute temperature and falls with molecular mass — hydrogen molecules move faster than oxygen molecules at the same temperature.</p>
<p><strong>Worked example.</strong> Find the rms speed of helium atoms (m = 6.6 × 10⁻²⁷ kg) at 300 K.</p>
<pre><code>c = sqrt(3 k T/m) = sqrt(3 x 1.38 x 10^-23 x 300/6.6 x 10^-27)
  = sqrt(1.242 x 10^-20/6.6 x 10^-27) = sqrt(1.88 x 10^6)
  = 1372 m s-1  (2 s.f.: 1.4 x 10^3 m s-1)</code></pre>

<h3>Internal energy</h3>
<p>The internal energy of a substance is the sum of the random kinetic energies of its particles plus the potential energies of their interactions. For an ideal gas (no intermolecular forces) internal energy is purely kinetic and proportional to absolute temperature; for real substances, melting and boiling raise internal energy because potential energy increases as bonds stretch and break. State the split precisely in definitions: internal energy = total random kinetic energy + total intermolecular potential energy.</p>

<h3>The first law of thermodynamics</h3>
<p>Energy is conserved: the change in a system's internal energy equals the heat added to it plus the work done on it.</p>
<pre><code>Delta U = Q + W

Delta U = change in internal energy (J)
Q = heat energy transferred to the system (J), negative if lost
W = work done ON the system (J), negative if the system does work
    (for a gas: W = -p Delta V under the convention W = work done
     on the system; expanding gas does work, so W is negative)</code></pre>
<p>The sign convention must match your course's — state it in words when you apply the law. Applications the papers love: compressing a gas quickly (W positive, little Q, so ΔU and temperature rise); a gas expanding slowly at constant temperature (ΔU = 0 for an ideal gas, so Q = −W — heat flows in to supply the work done); and refrigerators (work is done to move heat against its natural flow).</p>
<p><strong>Worked example.</strong> A gas is compressed so that 500 J of work is done on it while 200 J of heat flows out. Find ΔU and state the temperature change.</p>
<pre><code>W = +500 J (done on the system), Q = -200 J (lost)
Delta U = Q + W = -200 + 500 = +300 J
internal energy rises -> temperature rises (for an ideal gas)</code></pre>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Definitions)</strong> Distinguish between temperature and internal energy. <em>Answer:</em> Temperature is proportional to the mean random kinetic energy per molecule; internal energy is the total random kinetic energy plus the intermolecular potential energy of all the particles.</li>
<li><strong>(Kelvin)</strong> Convert 27 °C to kelvin and state absolute zero in °C. <em>Answer:</em> T = 27 + 273 = 300 K; absolute zero = −273 °C (−273.15 °C exactly).</li>
<li><strong>(Specific heat)</strong> 0.15 kg of a metal at 100 °C is dropped into 0.25 kg of water at 15 °C; the final temperature is 22 °C. Find the metal's specific heat capacity (c_water = 4200 J kg⁻¹ K⁻¹). <em>Answer:</em> heat gained by water = 0.25 × 4200 × 7 = 7350 J; metal lost = 0.15 × c × 78 = 7350 → c = 7350/(0.15 × 78) = 628 J kg⁻¹ K⁻¹ ≈ 630 J kg⁻¹ K⁻¹.</li>
<li><strong>(Latent heat)</strong> Explain why the temperature of boiling water stays constant. <em>Answer:</em> The energy supplied breaks intermolecular bonds during the change of state instead of raising the average kinetic energy of the molecules, so the temperature is unchanged until all the liquid has vaporised.</li>
<li><strong>(Equation of state)</strong> 2.0 g of helium (M = 4.0 g mol⁻¹) occupies 0.012 m³ at 300 K. Find the pressure. <em>Answer:</em> n = 2.0/4.0 = 0.50 mol; p = nRT/V = (0.50 × 8.31 × 300)/0.012 = 103 875 Pa ≈ 1.0 × 10⁵ Pa.</li>
<li><strong>(Kinetic theory)</strong> State two assumptions of the kinetic model and explain why doubling absolute temperature changes rms speed the way it does. <em>Answer:</em> Molecules are point particles with negligible volume; collisions are perfectly elastic; intermolecular forces are negligible except during collisions (any two). Since c = √(3kT/m), doubling T multiplies c by √2 — speed depends on the square root of absolute temperature.</li>
<li><strong>(First law)</strong> A gas expands, doing 300 J of work, while 100 J of heat is supplied. Find ΔU. <em>Answer:</em> W = −300 J (work done by the system), Q = +100 J; ΔU = 100 − 300 = −200 J — internal energy falls and the gas cools.</li>
<li><strong>(Practical)</strong> Describe how to determine the specific heat capacity of a metal block electrically. <em>Answer:</em> Place a known-power heater in the block, insulate it, record temperature against time as the heater runs; energy input E = Pt; plot temperature vs time and use the gradient (with m and the extrapolated zero-time temperature) to find c from E = mcΔθ; extrapolating back corrects for heat lost during the experiment.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Celsius in gas laws:</strong> pV = nRT demands kelvin. A gas-law calculation with 300 °C is wrong by 273 K at the first step.</li>
<li><strong>Δθ in specific heat:</strong> E = mcΔθ uses a temperature <em>change</em>; questions giving start and end temperatures need the difference, not a raw value.</li>
<li><strong>Latent vs specific heat:</strong> during a change of state use mL, not mcΔθ; on a heating curve the flat sections are where Δθ = 0.</li>
<li><strong>Molar mass units:</strong> grams versus kilograms must match the mass unit in n = m/M; the equation of state with R = 8.31 needs moles and SI units throughout.</li>
<li><strong>Pressure units:</strong> kPa and atm into Pa, cm³ into m³, before substitution.</li>
<li><strong>Internal energy wording:</strong> it includes potential energy for real substances; defining it as kinetic only is wrong outside ideal gases.</li>
<li><strong>First-law signs:</strong> pick a convention and state it — work done on the system is positive in ΔU = Q + W; expanding gas does work on the surroundings (negative W).</li>
<li><strong>rms speed vs mean speed:</strong> the c in pV = ⅓Nmc² is the root-mean-square speed; it is not the average of speeds (which is smaller).</li>
<li><strong>Precision and method:</strong> 2 or 3 s.f. with units (J, Pa, K, mol, m s⁻¹); write the formula line before numbers — the physics formulae are credit in their own right.</li>
</ul>
`,
    "0b01158e-1681-416b-986a-b17cb4bc9956": `
<h2>A Level Physics: Nuclear Physics</h2>
<p>Nuclear physics studies the dense heart of the atom: what the nucleus contains, why some nuclei fly apart, and how the mass of a nucleus is less than the sum of its parts — the most famous equation in physics. This note builds the subject from zero: nuclear composition and notation, the three kinds of radiation and their detection, mass defect and binding energy with the binding-energy curve, and radioactive decay as an exponential process with its own vocabulary (activity, decay constant, half-life). Every calculation type is worked line by line.</p>

<h3>Atoms, nuclei and radiation</h3>
<p>An atom is a tiny nucleus surrounded by electrons. The nucleus contains protons (positive) and neutrons (neutral); the notation uses X with atomic number Z (protons) above and mass number A (nucleons: protons + neutrons) below. Isotopes share Z but differ in N; they are chemically identical (same electron configuration) but physically different (different mass and nuclear stability).</p>
<p>Three kinds of emission come from unstable nuclei:</p>
<table border="1" cellpadding="6">
<tr><th>Property</th><th>Alpha (α)</th><th>Beta-minus (β⁻)</th><th>Gamma (γ)</th></tr>
<tr><td>What it is</td><td>helium nucleus (2 protons + 2 neutrons)</td><td>fast electron from the nucleus</td><td>high-energy photon</td></tr>
<tr><td>Notation</td><td>⁴₂He</td><td>⁰₋₁e</td><td>⁰₀γ</td></tr>
<tr><td>Charge</td><td>+2e</td><td>−1e</td><td>0</td></tr>
<tr><td>Speed</td><td>up to ~0.05c</td><td>up to ~0.99c</td><td>c</td></tr>
<tr><td>Range in air</td><td>a few cm</td><td>a few metres</td><td>hundreds of metres</td></tr>
<tr><td>Ionising</td><td>strongly (double charge, slow)</td><td>moderately</td><td>weakly</td></tr>
<tr><td>Deflection</td><td>slight, in magnetic/electric fields</td><td>greater, opposite direction to α</td><td>none</td></tr>
<tr><td>Stopped by</td><td>paper</td><td>thin aluminium</td><td>lead or thick concrete</td></tr>
</table>
<p>Nuclear equations balance on two counts: nucleon number A and proton number Z both conserved. In beta-minus decay a neutron turns into a proton plus an electron plus an antineutrino (n → p + e⁻ + ν̄), which is why A stays the same while Z rises by one.</p>
<p><strong>Worked example.</strong> Complete: ²³⁸₉₂U → ²³⁴₉₀Th + ? <em>Answer:</em> the missing particle has A = 238 − 234 = 4 and Z = 92 − 90 = 2 → an alpha particle ⁴₂He. For ¹⁴₆C → ¹⁴₇N + ?: A = 0, Z = −1 → beta-minus ⁰₋₁e (plus an antineutrino).</p>

<h3>Mass defect and nuclear binding energy</h3>
<p>Every nucleus weighs less than its separated nucleons — the mass defect Δm. That missing mass is the energy released when the nucleus assembled, by Einstein's mass–energy equivalence:</p>
<pre><code>E = Delta m c^2        c = 3.0 x 10^8 m s-1

binding energy = energy needed to separate a nucleus into
                 its individual nucleons
binding energy per nucleon = binding energy / A</code></pre>
<p>The atomic mass unit, u, is defined so that 1 u = 1.661 × 10⁻²⁷ kg, equivalent to 931.5 MeV of energy. The binding-energy-per-nucleon curve is the map of nuclear energy: it rises steeply to a maximum near iron-56 (about 8.8 MeV per nucleon) and falls slowly for heavier nuclei. Consequences, both examinable:</p>
<ul>
<li><strong>Fission:</strong> a heavy nucleus (uranium) splitting toward the middle of the curve releases energy — each fragment is more tightly bound.</li>
<li><strong>Fusion:</strong> light nuclei (hydrogen isotopes) joining toward the peak also release energy — this powers stars.</li>
</ul>
<p><strong>Worked example 1.</strong> Find the binding energy of a helium-4 nucleus (mass 4.0026 u) given proton mass 1.0073 u and neutron mass 1.0087 u.</p>
<pre><code>separate nucleons: 2(1.0073) + 2(1.0087) = 4.0320 u
nucleus: 4.0026 u
mass defect: Delta m = 4.0320 - 4.0026 = 0.0294 u
binding energy = 0.0294 x 931.5 = 27.4 MeV
per nucleon = 27.4/4 = 6.85 MeV</code></pre>
<p><strong>Worked example 2 (joules).</strong> Convert the mass defect 0.0294 u to joules.</p>
<pre><code>Delta m = 0.0294 x 1.661 x 10^-27 = 4.88 x 10^-29 kg
E = Delta m c^2 = 4.88 x 10^-29 x (3.0 x 10^8)^2
  = 4.88 x 10^-29 x 9.0 x 10^16 = 4.39 x 10^-12 J</code></pre>

<h3>Radioactive decay</h3>
<p>Radioactive decay is spontaneous and random: no external condition (temperature, pressure, chemistry) changes when a given nucleus decays. What is predictable is the behaviour of huge numbers of nuclei — an exponential law:</p>
<pre><code>N = N0 e^(-lambda t)

N = number of undecayed nuclei; N0 at t = 0
lambda = decay constant (s-1)

activity A = lambda N    (becquerel, Bq; 1 Bq = 1 decay per second)
A = A0 e^(-lambda t)

half-life t_half = ln(2)/lambda = 0.693/lambda</code></pre>
<p>The decay constant is the probability per unit time that any one nucleus decays. The half-life is the time for half the present nuclei to decay — a fixed fraction, not a fixed number. On a graph of N against t, read the half-life directly as the time to fall from any value to half of it; the gradient of ln N against t is −λ.</p>
<p><strong>Worked example 1.</strong> A sample has activity 8000 Bq. After 6.0 hours the activity is 1000 Bq. Find the half-life.</p>
<pre><code>8000 -> 1000 is three halvings (8 -> 4 -> 2 -> 1)
three half-lives = 6.0 hours  ->  t_half = 2.0 hours</code></pre>
<p><strong>Worked example 2 (decay constant).</strong> Find λ and the number of nuclei in a 1000 Bq sample with that half-life.</p>
<pre><code>lambda = 0.693/t_half = 0.693/(2.0 x 3600) = 9.6 x 10-5 s-1
A = lambda N -> N = A/lambda = 1000/9.6 x 10-5 = 1.04 x 10^7 nuclei</code></pre>
<p><strong>Worked example 3 (exponential).</strong> A sample of 4.0 × 10¹⁰ nuclei has λ = 2.0 × 10⁻⁶ s⁻¹. How many remain after one hour?</p>
<pre><code>N = N0 e^(-lambda t) = 4.0 x 10^10 x e^(-2.0 x 10-6 x 3600)
  = 4.0 x 10^10 x e^(-0.0072) = 4.0 x 10^10 x 0.9928
  = 3.97 x 10^10  (only 0.7% decayed - short times barely dent N)</code></pre>

<h3>Worked examples: interpreting decay data</h3>
<p><strong>Worked example.</strong> A student measures count rate against time and finds it falls from 640 counts per minute to 40 in 30 minutes. Explain why count rate is used instead of activity directly, and find the half-life.</p>
<pre><code>640 -> 320 -> 160 -> 80 -> 40 : four halvings in 30 min
t_half = 30/4 = 7.5 minutes
why counts: a detector records only the fraction of decays that
reach it (geometric efficiency), so the count rate is proportional
to activity but not equal to it - proportional, so halvings work.</code></pre>

<h3>Fission, fusion and the binding-energy curve</h3>
<p>The curve of binding energy per nucleon against nucleon number is the energy map of the nucleus. It rises steeply through the light nuclei, peaks near iron-56 at about 8.8 MeV per nucleon, and falls slowly for the heaviest nuclei. Any process that moves nucleons toward the peak releases energy: splitting a heavy nucleus (fission) and joining light nuclei (fusion) both climb toward iron. The energy released is the difference in total binding energy between the starting nucleus and the products.</p>
<pre><code>energy released = (binding energy of products)
                - (binding energy of reactants)

for fission of one U-235 nucleus: about 200 MeV is released;
it appears as the kinetic energy of the two fragments
(and some neutrons) plus gamma radiation</code></pre>
<p><strong>Worked example.</strong> Estimate the energy released when one uranium-235 nucleus fissions into fragments whose binding energy per nucleon averages 8.5 MeV, given U-235 has about 7.6 MeV per nucleon.</p>
<pre><code>change per nucleon = 8.5 - 7.6 = 0.9 MeV
235 nucleons take part (approximately)
energy = 235 x 0.9 = 211 MeV
       = 211 x 10^6 x 1.6 x 10^-19 = 3.4 x 10^-11 J</code></pre>
<p>Fusion in the Sun is the same arithmetic in reverse: four protons combine through a chain of reactions into helium-4, releasing about 26.7 MeV per nucleus formed — small per nucleus but astronomical in total because the Sun fuses about 600 million tonnes of hydrogen every second.</p>

<h3>Detecting radiation and handling it safely</h3>
<p>Radiation is detected by its ionising effect: a Geiger-Muller tube counts individual particles or photons (each gives a click or count), a cloud chamber shows tracks as condensed droplets along ionisation paths, and a photographic film badge darkens cumulatively with dose. Every measurement must subtract background radiation — the constant low level from cosmic rays, rocks, radon gas and medical sources — recorded with no source present.</p>
<ul>
<li><strong>Alpha:</strong> dangerous only if inhaled or swallowed (it is stopped by skin but deposits all its energy in a small volume of tissue); handled with gloves and no eating in the lab.</li>
<li><strong>Beta:</strong> stopped by a few millimetres of aluminium or by thick clothing; eye protection and distance matter.</li>
<li><strong>Gamma:</strong> penetrates deeply; lead shielding, distance and limiting exposure time are the protections (dose falls with the inverse square of distance).</li>
<li><strong>General rules:</strong> minimise time near a source, maximise distance, use shielding, and never point a source at anyone. Tracers in medicine use short-half-life isotopes (technetium-99m, t½ = 6 hours) so activity falls quickly after use.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Structure)</strong> Define isotope and state one pair of isotopes. <em>Answer:</em> Isotopes are nuclei of the same element (same proton number Z) with different numbers of neutrons (different mass number A) — e.g. carbon-12 and carbon-14.</li>
<li><strong>(Radiation)</strong> Explain why alpha radiation is more ionising than gamma. <em>Answer:</em> An alpha particle has double charge and moves slowly, so it exerts strong Coulomb forces on nearby electrons over a longer interaction time, stripping many electrons; gamma photons interact only occasionally.</li>
<li><strong>(Equations)</strong> Complete: ²¹⁰₈₄Po → ²⁰⁶₈₂Pb + X. <em>Answer:</em> X has A = 4, Z = 2 → ⁴₂He (alpha).</li>
<li><strong>(Binding energy)</strong> Explain, in terms of binding energy per nucleon, why fusion releases energy. <em>Answer:</em> Light nuclei have low binding energy per nucleon; fusing them moves products toward the peak of the curve near iron, where each nucleon is more tightly bound; the difference in total binding energy is released.</li>
<li><strong>(Mass defect)</strong> State what mass defect represents. <em>Answer:</em> The difference between the mass of a nucleus and the total mass of its separate nucleons; it equals the energy released when the nucleus formed (E = Δmc²), and also the energy required to disassemble it.</li>
<li><strong>(Decay law)</strong> Define activity and the decay constant. <em>Answer:</em> Activity is the rate of decay of a sample (decays per second, Bq); the decay constant is the probability per unit time that a given nucleus decays, with A = λN.</li>
<li><strong>(Half-life)</strong> A sample's activity drops from 2000 Bq to 250 Bq in 12 days. Find the half-life. <em>Answer:</em> 2000 → 250 is three halvings; t½ = 12/3 = 4 days.</li>
<li><strong>(Randomness)</strong> Explain why radioactive decay is described as random yet its rate is predictable. <em>Answer:</em> Each nucleus decays spontaneously with no known trigger, so no individual decay can be predicted; but for a large population the probability per unit time (λ) is constant, so the number decaying per second — the activity — follows A = λN predictably.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Conservation bookkeeping:</strong> A and Z both balance in nuclear equations; beta decay keeps A constant while Z changes — write both numbers at every arrow.</li>
<li><strong>u to joules:</strong> 1 u = 1.661 × 10⁻²⁷ kg; 1 u = 931.5 MeV. Use one route consistently; mixing MeV and joules mid-question fails.</li>
<li><strong>Binding energy direction:</strong> energy is <em>released</em> when a tightly bound nucleus forms and <em>required</em> to split it; the sign of ΔE follows the arrow.</li>
<li><strong>Half-life arithmetic:</strong> it is the time to halve the current amount, not to reach zero; count the halvings (80 → 20 is two halvings).</li>
<li><strong>ln 2 versus base-2:</strong> N = N₀(½)^(t/t½) and N = N₀e^(−λt) are the same law; λ = 0.693/t½ converts between them. Do not apply e-folding time as a half-life.</li>
<li><strong>Activity vs count rate:</strong> count rate is proportional to activity but reduced by detector geometry and absorption; background radiation must be subtracted before analysis.</li>
<li><strong>Decay units:</strong> λ in s⁻¹ (or per the time unit given), A in Bq; hours and minutes into seconds when mixing with s⁻¹.</li>
<li><strong>Ignoring neutrinos:</strong> beta decay equations in modern syllabuses include the antineutrino; omitting it is an accuracy loss where the paper's data sheet includes it.</li>
<li><strong>Precision:</strong> 2 or 3 s.f. with units; quote c = 3.0 × 10⁸ m s⁻¹ and Nₐ = 6.02 × 10²³ mol⁻¹ from the data sheet.</li>
</ul>
`,
    "17860f55-8ba0-4591-85d1-577aabc0b5af": `
<h2>A Level Physics: Oscillations and Waves II</h2>
<p>Simple harmonic motion is the master oscillation: the movement of a pendulum, a mass on a spring, a guitar string, a child on a swing — every system that accelerates back toward an equilibrium position with a restoring force proportional to displacement. This note builds SHM from zero: the defining condition and its equations, the displacement, velocity and acceleration graphs and their calculus links, the energy bookkeeping within a cycle, and the real-world finishing topics — damping and resonance — with the applications and disasters that make them examinable.</p>

<h3>What simple harmonic motion is</h3>
<p>A body performs simple harmonic motion (SHM) when its acceleration is proportional to its displacement from a fixed equilibrium point and always directed toward that point:</p>
<pre><code>a = - omega^2 x

a = acceleration (m s-2), x = displacement from equilibrium (m)
omega = angular frequency (rad s-1); the minus sign means the
acceleration always points back toward equilibrium</code></pre>
<p>The analogy: a ball in a bowl. Push the ball up the side (displacement) and gravity pulls it back with a force proportional to how far up the slope it is — push twice as far, and the restoring force doubles. That proportionality is the whole defining feature; friction-less mass-spring systems and small-angle pendulums obey it.</p>
<table border="1" cellpadding="6">
<tr><th>Quantity</th><th>Symbol</th><th>Relation</th></tr>
<tr><td>Displacement</td><td>x</td><td>x = A sin(ωt) (from equilibrium at t = 0)</td></tr>
<tr><td>Amplitude</td><td>A</td><td>maximum displacement</td></tr>
<tr><td>Period</td><td>T</td><td>T = 2π/ω; mass on a spring: T = 2π√(m/k); pendulum: T = 2π√(L/g)</td></tr>
<tr><td>Frequency</td><td>f</td><td>f = 1/T = ω/(2π)</td></tr>
<tr><td>Angular frequency</td><td>ω</td><td>ω = 2πf = √(k/m) (spring), √(g/L) (pendulum)</td></tr>
</table>

<h3>SHM equations and graphs</h3>
<p>Starting from equilibrium at t = 0, the kinematics follows by differentiation (or by reading the graphs):</p>
<pre><code>displacement:  x = A sin(omega t)
velocity:      v = A omega cos(omega t)
acceleration:  a = - A omega^2 sin(omega t) = - omega^2 x

velocity-displacement relation:
v = omega sqrt(A^2 - x^2)</code></pre>
<p>Graph discipline is a mark source in its own right: displacement is a sine wave; velocity leads displacement by a quarter cycle (cosine); acceleration is the inverted displacement (anti-phase, scaled by ω²). At the extremes (x = ±A): velocity is zero and acceleration is maximum; at equilibrium (x = 0): velocity is maximum and acceleration is zero. Learn the four positions (centre, both extremes, mid-point) as a table of states.</p>
<p><strong>Worked example.</strong> A mass oscillates with amplitude 0.10 m and frequency 2.0 Hz. Find ω, the maximum speed, and the maximum acceleration.</p>
<pre><code>omega = 2 pi f = 2 x 3.14 x 2.0 = 12.6 rad s-1
v_max = A omega = 0.10 x 12.6 = 1.26 m s-1
a_max = A omega^2 = 0.10 x 158 = 15.8 m s-2</code></pre>
<p><strong>Worked example 2 (using v = ω√(A² − x²)).</strong> With the same oscillation, find the speed at x = 0.06 m.</p>
<pre><code>v = omega sqrt(A^2 - x^2) = 12.6 x sqrt(0.010 - 0.0036)
  = 12.6 x sqrt(0.0064) = 12.6 x 0.08 = 1.01 m s-1</code></pre>
<p><strong>Worked example 3 (pendulum).</strong> Find the period of a 0.90 m pendulum (g = 9.81 m s⁻²).</p>
<pre><code>T = 2 pi sqrt(L/g) = 2 x 3.14 x sqrt(0.90/9.81)
  = 6.28 x sqrt(0.0917) = 6.28 x 0.303 = 1.90 s</code></pre>

<h3>Energy in simple harmonic motion</h3>
<p>Energy shuttles between kinetic and potential stores while the total stays constant (undamped SHM):</p>
<pre><code>total energy:  E = (1/2) m omega^2 A^2 = (1/2) k A^2
kinetic:       KE = (1/2) m omega^2 (A^2 - x^2)
potential:     PE = (1/2) m omega^2 x^2   (spring: (1/2) k x^2)</code></pre>
<p>The energy curves are examinable as graphs: total energy is a horizontal line over x; KE is an inverted parabola peaking at equilibrium; PE is an upright parabola peaking at the extremes; against time both are sine-squared curves oscillating at twice the frequency of x. Doubling the amplitude quadruples the total energy (E ∝ A²) — a favourite multiple-choice item.</p>
<p><strong>Worked example.</strong> A 0.50 kg mass on a spring (k = 200 N m⁻¹) oscillates with amplitude 0.08 m. Find the total energy and the kinetic energy at x = 0.04 m.</p>
<pre><code>E = (1/2) k A^2 = 0.5 x 200 x 0.0064 = 0.64 J
PE at x = 0.04: (1/2) k x^2 = 0.5 x 200 x 0.0016 = 0.16 J
KE = E - PE = 0.64 - 0.16 = 0.48 J</code></pre>

<h3>Damping</h3>
<p>Real oscillations lose energy to drag and friction — damping. The three regimes matter:</p>
<ul>
<li><strong>Light damping:</strong> amplitude decays exponentially while the system keeps oscillating at almost the natural frequency (a child's swing gradually slowing).</li>
<li><strong>Critical damping:</strong> the system returns to equilibrium in the minimum time without overshooting — deliberately engineered for car suspension, door closers and moving-coil meters.</li>
<li><strong>Heavy (over) damping:</strong> a slow, sluggish return without oscillation.</li>
</ul>
<p>The energy lost per cycle is the exam phrasing: light damping reduces amplitude gradually because each cycle transfers energy to the surroundings; the total energy falls exponentially with time even though the frequency barely changes.</p>

<h3>Resonance</h3>
<p>A driven oscillation responds most strongly when the driving frequency matches the system's natural frequency — resonance. The amplitude–frequency curve shows a peak at resonance; sharper peaks mean lighter damping. The mechanism: at resonance the driving force is in phase with the velocity, so energy is transferred most efficiently each cycle.</p>
<table border="1" cellpadding="6">
<tr><th>Application</th><th>Use or effect</th></tr>
<tr><td>Musical instruments</td><td>air columns and strings resonate at their natural frequencies to amplify sound</td></tr>
<tr><td>Radio tuning</td><td>an LC circuit selects the broadcast frequency that resonates with it</td></tr>
<tr><td>Microwave ovens</td><td>drive water molecules near their resonant absorption frequency</td></tr>
<tr><td>Car suspension</td><td>designed so road-frequency inputs never match the car's natural frequency; damping controls the peak</td></tr>
<tr><td>Tacoma Narrows (1940)</td><td>wind-driven resonance (with aeroelastic flutter) destroyed the bridge — the cautionary case study</td></tr>
<tr><td>Bridges and buildings</td><td>seismic design detunes natural frequencies from earthquake oscillations</td></tr>
</table>
<p><strong>Worked example.</strong> Explain why soldiers break step crossing a bridge. <em>Answer:</em> Marching produces a periodic driving force at the step frequency; if it matched the bridge's natural frequency, resonance would build large-amplitude oscillations and structural damage; breaking step makes the driving frequency irregular and removes the coherent input.</p>

<h3>Worked examples: combined SHM problems</h3>
<p><strong>Worked example.</strong> A 0.25 kg mass on a spring completes 20 oscillations in 8.0 s. Find the spring constant k.</p>
<pre><code>T = 8.0/20 = 0.40 s
T = 2 pi sqrt(m/k)  ->  k = m (2 pi/T)^2
k = 0.25 x (6.28/0.40)^2 = 0.25 x 246.4 = 61.6 N m-1
  = 62 N m-1 (2 s.f.)</code></pre>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Definition)</strong> State the defining condition for SHM. <em>Answer:</em> The acceleration is proportional to the displacement from equilibrium and directed toward it: a = −ω²x.</li>
<li><strong>(Graphs)</strong> Sketch or describe the velocity–time graph of an oscillating mass starting at maximum displacement. <em>Answer:</em> Velocity is a cosine-like curve starting at zero, reaching extremes of ±v_max as the mass passes equilibrium, one quarter cycle ahead of the displacement.</li>
<li><strong>(Calculations)</strong> An oscillator has amplitude 0.12 m and ω = 8.0 rad s⁻¹. Find the maximum acceleration. <em>Answer:</em> a_max = Aω² = 0.12 × 64 = 7.68 m s⁻² ≈ 7.7 m s⁻².</li>
<li><strong>(Energy)</strong> State how the total energy of an SHM system depends on amplitude and explain the effect of doubling it. <em>Answer:</em> E = ½kA², so energy is proportional to A²; doubling the amplitude quadruples the total energy.</li>
<li><strong>(Pendulum)</strong> Explain why a pendulum clock keeps worse time on a warm day. <em>Answer:</em> Warmth lengthens the pendulum L, and T = 2π√(L/g), so the period increases and the clock runs slow.</li>
<li><strong>(Damping)</strong> Distinguish light and critical damping. <em>Answer:</em> Light damping: oscillations continue with amplitude decaying exponentially; critical damping: the system returns to equilibrium in the shortest time without oscillating.</li>
<li><strong>(Resonance)</strong> Sketch qualitatively the amplitude–frequency response for a lightly and a heavily damped driven system, and state one use of resonance. <em>Answer:</em> Both peak at the natural frequency; the lightly damped peak is tall and sharp, the heavily damped one short and broad. Use: radio tuning circuits selecting a station's frequency.</li>
<li><strong>(Practical)</strong> Describe how you would determine g using a simple pendulum. <em>Answer:</em> Measure pendulum length L from pivot to bob centre; time N complete oscillations with a stopwatch and find T = t/N; repeat for several L values; plot T² against L — the gradient is 4π²/g, so g = 4π²/gradient.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>ω versus f:</strong> ω = 2πf. In a = −ω²x the ω is angular frequency; using f directly misses a factor of 4π².</li>
<li><strong>Phase of the graphs:</strong> at maximum displacement, speed is zero and acceleration is maximum — candidates often invert this. Anchor on the extremes first: nothing moves at the turning points.</li>
<li><strong>Energy ∝ A²:</strong> doubling amplitude quadruples energy; the amplitude of displacement does not scale energy linearly.</li>
<li><strong>Pendulum validity:</strong> T = 2π√(L/g) assumes small angles (under about 10°) and a point mass; large angles lengthen the period.</li>
<li><strong>Period independence:</strong> a pendulum's period is independent of bob mass and amplitude (small angle) — the classic conceptual question.</li>
<li><strong>Damping and frequency:</strong> damping reduces amplitude and slightly shifts the peak frequency; in light damping the frequency is almost unchanged — do not claim the oscillation stops instantly.</li>
<li><strong>Resonance condition:</strong> resonance requires the driving frequency to match the natural frequency; merely being "vibrated" does not guarantee it.</li>
<li><strong>Spring constant from period:</strong> rearrange algebraically first (k = m(2π/T)²) and write the formula line — the rearrangement itself carries marks.</li>
<li><strong>Precision:</strong> 2 or 3 s.f. with units (rad s⁻¹, m s⁻², N m⁻¹, J); keep π in the working until the final step.</li>
</ul>
`,
  },
};
