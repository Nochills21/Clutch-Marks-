// Cambridge IGCSE Physics 0625 (2023–2025 exams) — exam-grade lesson HTML
// for the 10 existing DB topics (exact names). Used by upgrade-notes.cjs.
module.exports = [
  {
    topic: "Measurement & Units",
    spec: "1.1–1.3 (2023–2025)",
    html: `<h2>Measurement &amp; Units</h2>
<p><strong>Cambridge IGCSE 0625 (2023–2025):</strong> 1.1 lengths &amp; volumes; 1.2 density; 1.3 forces &amp; motion context (measurements) — plus measurement techniques, SI units, scalars/vectors.</p>

<h3>1. Measuring</h3>
<ul>
<li>Length: ruler (mm), vernier calipers (0.1 mm / 0.01 cm), micrometer screw gauge (0.01 mm).</li>
<li>Volume: measuring cylinder read at the meniscus bottom; regular solids by calculation; irregular by displacement (eureka can).</li>
<li>Time: stopwatch — human reaction time ±0.2 s; measure many oscillations and divide (e.g. 20 T).</li>
<li>Pendulum: T = time/oscillations; f = 1/T.</li>
</ul>

<h3>2. SI units and prefixes</h3>
<table border="1" cellpadding="6"><tr><th>Quantity</th><th>Unit</th><th>Symbol</th></tr>
<tr><td>length</td><td>metre</td><td>m</td></tr>
<tr><td>mass</td><td>kilogram</td><td>kg</td></tr>
<tr><td>time</td><td>second</td><td>s</td></tr>
<tr><td>current</td><td>ampere</td><td>A</td></tr>
<tr><td>temperature</td><td>kelvin (°C used)</td><td>K</td></tr></table>
<p>kilo 10³; centi 10⁻²; milli 10⁻³; micro 10⁻⁶; nano 10⁻⁹.</p>

<h3>3. Scalars and vectors</h3>
<p>Scalars: distance, speed, mass, energy, time. Vectors: displacement, velocity, acceleration, force, weight, momentum. Vector addition by scale diagram (tip-to-tail) or by components.</p>

<h3>4. Density</h3>
<p>ρ = m/V (kg/m³ or g/cm³; 1 g/cm³ = 1000 kg/m³). Determining: mass on balance; volume by displacement. Floating: ρ<sub>object</sub> &lt; ρ<sub>fluid</sub>.</p>

<h3>5. Accuracy and improvements</h3>
<p>Avoid parallax (eye level with reading), zero errors (subtract the zero reading), measure multiple laps for small times. Suggest improvements by naming the error and the fix.</p>`,
  },
  {
    topic: "Forces & Motion",
    spec: "1.5–1.9 (2023–2025)",
    html: `<h2>Forces &amp; Motion</h2>
<p><strong>Cambridge IGCSE 0625 (2023–2025):</strong> motion (speed, acceleration, graphs); mass &amp; weight; density link; force basics (F = ma, resultant); momentum (Extended); turning effects; equilibrium.</p>

<h3>1. Kinematics</h3>
<ul>
<li>Speed = distance/time; average speed = (u + v)/2 for uniform acceleration.</li>
<li>Acceleration a = (v − u)/t.</li>
<li>SUVAT (uniform a): v = u + at; s = ut + ½at²; v² = u² + 2as.</li>
</ul>

<h3>2. Motion graphs</h3>
<ul>
<li>Distance–time: gradient = speed.</li>
<li>Speed–time: gradient = acceleration; area = distance. Negative gradient = deceleration.</li>
<li>Free fall 1: g ≈ 9.8 m/s² (use 10) — v = gt from rest.</li>
</ul>

<h3>3. Mass, weight, density</h3>
<p>W = mg (g ≈ 10 N/kg). Weight acts at the centre of mass; mass is invariant. Density ρ = m/V.</p>

<h3>4. Newton's laws and resultant force</h3>
<ul>
<li>Resultant: colinear addition/subtraction; perpendicular by Pythagoras.</li>
<li>F = ma. Terminal velocity: drag grows with speed until it balances weight.</li>
<li>Third law pairs: equal magnitude, opposite direction, different bodies.</li>
</ul>

<h3>5. Momentum (Extended)</h3>
<p>p = mv; impulse Ft = Δ(mv); conservation: Σp<sub>before</sub> = Σp<sub>after</sub> (explosions, collisions).</p>
<p><strong>Example:</strong> 2 kg at 3 m/s hits 1 kg at rest, combined 1 m/s: 6 = 3v ⇒ v = 2 m/s.</p>

<h3>6. Moments and equilibrium</h3>
<ul>
<li>Moment = F × perpendicular distance from pivot.</li>
<li>Principle of moments: Σclockwise = Σanticlockwise.</li>
<li>Equilibrium: resultant force = 0 and resultant moment = 0.</li>
</ul>
<p><strong>Example:</strong> 100 N at 0.3 m balances F at 0.5 m: F = 60 N.</p>`,
  },
  {
    topic: "Energy, Work & Power",
    spec: "1.7 (2023–2025)",
    html: `<h2>Energy, Work &amp; Power</h2>
<p><strong>Cambridge IGCSE 0625 (2023–2025):</strong> stores and transfers, KE/PE, work, energy sources, power, efficiency.</p>

<h3>1. Energy stores &amp; transfers</h3>
<p>Stores: kinetic, gravitational, elastic, chemical, nuclear, thermal. Transfer mechanisms: mechanically, electrically, heating, waves. Energy is conserved overall; transfers via <strong>work</strong> done.</p>

<h3>2. Formulas</h3>
<ul>
<li>KE = ½mv²; PE = mgh.</li>
<li>Work W = Fd (force along displacement, joules).</li>
<li>Power P = W/t = E/t; P = Fv for constant speed.</li>
</ul>
<p><strong>Example:</strong> 0.5 kg at 4 m/s: KE = 4 J. Lift 2 kg by 3 m: PE = 60 J (g = 10).</p>

<h3>3. Energy sources</h3>
<p>Renewable: solar, wind, hydro, geothermal, biofuel, tidal — replenished. Non-renewable: fossil fuels, nuclear — finite. Discuss reliability, cost, pollution for "evaluate" questions.</p>

<h3>4. Efficiency</h3>
<p>Efficiency = useful output ÷ total input (×100%). Sankey diagrams show losses.</p>
<p><strong>Example:</strong> motor: 150 J useful from 600 J → 25%.</p>

<h3>5. Energy-chain problems</h3>
<p>Equating KE loss to PE gain: v = √(2gh) for frictionless drop; braking distance grows with v².</p>

<p><strong>Exam tips:</strong> define work as "force × distance moved <em>in the direction of the force</em>"; use g = 10 unless told otherwise; efficiency is a ratio — no units.</p>`,
  },
  {
    topic: "Pressure & Density",
    spec: "1.4, 1.9 (2023–2025)",
    html: `<h2>Pressure &amp; Density</h2>
<p><strong>Cambridge IGCSE 0625 (2023–2025):</strong> pressure &amp; pressure differences in fluids, density review (Extended pressure-depth).</p>

<h3>1. Pressure basics</h3>
<p>p = F/A (Pa = N/m²). Increase F or decrease A to raise pressure; explain applications (snowshoes, knives, hydraulic press).</p>

<h3>2. Liquids</h3>
<ul>
<li>Pressure increases with depth: p = ρgh (Extended).</li>
<li>Same level, same liquid ⇒ same pressure (hydrostatic paradox).</li>
<li>Hydraulic systems transmit pressure — force multiplier: F₁/A₁ = F₂/A₂.</li>
</ul>

<h3>3. Atmospheric pressure</h3>
<p>~10⁵ Pa at sea level; demonstrated by collapsing can, mercury barometer 760 mmHg; decreases with altitude.</p>

<h3>4. Density revisited</h3>
<p>ρ = m/V; floating condition; upthrust = weight of displaced fluid (qualitative).</p>

<h3>5. Gas pressure (particle model)</h3>
<p>Particles collide with walls → force per area. Volume ↓ at same T ⇒ pressure ↑ (more frequent collisions). Temperature ↑ ⇒ faster particles ⇒ more frequent, harder impacts.</p>`,
  },
  {
    topic: "Thermal Physics",
    spec: "2.1–2.4 (2023–2025)",
    html: `<h2>Thermal Physics</h2>
<p><strong>Cambridge IGCSE 0625 (2023–2025):</strong> kinetic particle model; thermal expansion; specific heat capacity; melting/boiling; conduction, convection, radiation.</p>

<h3>1. Kinetic model</h3>
<p>Solid: fixed positions, vibrate — fixed shape/volume. Liquid: move around, touching — fixed volume, flows. Gas: far apart, fast random motion — fills container. Brownian motion evidences random molecular motion.</p>

<h3>2. Gas pressure and temperature</h3>
<p>Pressure from wall collisions. Heating at fixed volume → faster particles → more frequent, harder collisions → higher pressure.</p>

<h3>3. Thermal expansion</h3>
<p>Heating → particles vibrate more → solids expand slightly (gases expand most). Applications: bimetallic strip (fire alarm/thermostat), gaps in bridges/rails; the liquid-in-glass thermometer.</p>

<h3>4. Specific heat capacity</h3>
<p>c = ΔE/(mΔθ). Heating: ΔE = mcΔθ.</p>
<p><strong>Example:</strong> 2 kg water (c = 4200), 20→80 °C: ΔE = 2×4200×60 = 504 kJ.</p>
<p>High c of water → coolant; temperature rise measured with known heater power P in time t: c = Pt/(mΔθ).</p>

<h3>5. State changes</h3>
<p>Melting/boiling at fixed temperature despite heating (energy breaks bonds, not temperature). Condensation/ freezing release energy. Impurities raise melting point of mixtures/lower freezing; boiling needs nucleation.</p>

<h3>6. Transfer: conduction, convection, radiation</h3>
<ul>
<li><strong>Conduction</strong>: mainly metals (delocalised electrons + lattice vibration); non-metals poor; insulators trap air.</li>
<li><strong>Convection</strong>: hot fluid expands, density falls, rises; denser cool fluid sinks — currents.</li>
<li><strong>Radiation</strong>: infrared EM waves; no medium; matte black best absorber/emitter, shiny silver worst.</li>
</ul>
<p>Applications: vacuum flask, house insulation, car radiators, solar heating panels.</p>`,
  },
  {
    topic: "Waves & Sound",
    spec: "3.1–3.4 (2023–2025)",
    html: `<h2>Waves &amp; Sound</h2>
<p><strong>Cambridge IGCSE 0625 (2023–2025):</strong> general wave properties; reflection/refraction/diffraction; sound.</p>

<h3>1. Wave basics</h3>
<p>v = fλ. Transverse (oscillation ⊥ travel — light, water, S-waves) vs longitudinal (parallel — sound, P-waves). Amplitude, wavelength, frequency f = 1/T; wavefront diagrams.</p>

<h3>2. Ripple tank behaviours</h3>
<ul>
<li><strong>Reflection</strong>: angle in = angle out; speed/frequency unchanged, direction changes.</li>
<li><strong>Refraction</strong>: speed change at boundary bends wavefronts (shallow water slows ripples).</li>
<li><strong>Diffraction</strong>: spreading through gaps ≈ λ wide; around edges.</li>
</ul>

<h3>3. Electromagnetic spectrum (order)</h3>
<p>Radio → micro → IR → visible (red 700 nm – violet 400 nm) → UV → X → gamma. All travel at 3 × 10⁸ m/s in vacuum; transverse; uses and dangers (IR heating; UV skin; X/gamma ionising).</p>

<h3>4. Sound</h3>
<ul>
<li>Longitudinal; needs a medium (bell in vacuum demo). Speed ~340 m/s air, faster in liquids/solids.</li>
<li>Range 20 Hz–20 kHz; ultrasound &gt; 20 kHz (sonar, prenatal scans, cleaning).</li>
<li>Pitch ↔ frequency; loudness ↔ amplitude.</li>
</ul>

<h3>5. Echo problems</h3>
<p>Distance = (v × t)/2 (there and back).</p>
<p><strong>Example:</strong> echo after 0.6 s, v = 340 → cliff 102 m away.</p>

<p><strong>Exam tips:</strong> in diagrams always label wavelength as crest-to-crest; for refraction, state "changes speed" first, then direction; quote EM uses with the hazard.</p>`,
  },
  {
    topic: "Electricity & Circuits",
    spec: "4.1–4.5 (2023–2025)",
    html: `<h2>Electricity &amp; Circuits</h2>
<p><strong>Cambridge IGCSE 0625 (2023–2025):</strong> simple circuits, current, p.d., resistance, series/parallel, electrical safety, practical electricity.</p>

<h3>1. Circuit symbols &amp; current</h3>
<p>Conventional current: + → − (electron flow opposite). I = Q/t. Ammeter in series; voltmeter in parallel.</p>

<h3>2. Current, p.d., e.m.f.</h3>
<ul>
<li>Current: rate of charge flow; same everywhere in series.</li>
<li>p.d.: energy per coulomb <em>across a component</em>; e.m.f.: electrical energy per coulomb <em>given by the source</em>.</li>
</ul>

<h3>3. Resistance</h3>
<ul>
<li>R = V/I. Ohmic conductor: V ∝ I at constant temperature.</li>
<li>Series: R = R₁ + R₂ + …; same current; p.d. shares in proportion to R.</li>
<li>Parallel: 1/R = 1/R₁ + 1/R₂; same p.d.; current splits (inverse-R share).</li>
<li>Resistance ∝ length, ∝ 1/area (wires).</li>
</ul>

<h3>4. Components</h3>
<p>Fixed/variable resistors, LDR (light ↑ R ↓), thermistor (T ↑ R ↓), diode/LED (one-way), relay, filament lamp (R grows as T rises — V–I curve flattens).</p>

<h3>5. Power and energy</h3>
<p>P = VI = I²R = V²/R; E = VIt. Fuse rating just above normal current; earth wire, double insulation, circuit breakers (trip quickly, resettable).</p>
<p><strong>Example:</strong> 230 V, 2 A heater: P = 460 W; correct fuse 3 A or 5 A.</p>

<h3>6. Digital electronics basics (syllabus 4.5 context)</h3>
<p>Analogue vs digital; logic gates drive outputs from inputs (see CS link); sensors feed comparator-style circuits.</p>

<p><strong>Exam tips:</strong> series: current same; parallel: p.d. same — say which before calculating; always compute total resistance first in mixed circuits.</p>`,
  },
  {
    topic: "Magnetism & Electromagnetism",
    spec: "4.5 (2023–2025)",
    html: `<h2>Magnetism &amp; Electromagnetism</h2>
<p><strong>Cambridge IGCSE 0625 (2023–2025):</strong> magnets &amp; fields; magnetic effect of a current; force on a current-carrying conductor; motor effect; electromagnetic induction (Extended); transformers (Extended).</p>

<h3>1. Magnets and fields</h3>
<p>Iron/steel/cobalt/nickel; like poles repel. Field lines exit N, enter S; compass plotting; plotting compass aligns with field. Induced magnetism: iron (temporary) vs steel (permanent).</p>

<h3>2. Electromagnets</h3>
<p>Solenoid field like a bar magnet; strength ↑ with current, turns, iron core. Uses: relays, scrapyard crane, electric bell, speaker. Hard/soft magnetic materials choose permanent vs core use.</p>

<h3>3. Force on a current-carrying conductor</h3>
<p>F = BIL, direction by Fleming's left hand (fIeld, current, force). Reversing current or field reverses force. D.C. motor: coil, commutator reverses current each half-turn for continuous rotation; speed/torque ↑ with current, field strength, turns/area.</p>

<h3>4. Electromagnetic induction (Extended)</h3>
<p>Induced e.m.f. when a conductor cuts field lines or flux changes. Fleming's right hand (generator). Factors: speed, field strength, turns. A.C. generator: slip rings; dynamo effect; Lenz's law opposes change (direction of induced current).</p>

<h3>5. Transformers (Extended)</h3>
<p>V<sub>p</sub>/V<sub>s</sub> = N<sub>p</sub>/N<sub>s</sub>; P<sub>in</sub> ≈ P<sub>out</sub> (100% assumed): I<sub>p</sub>V<sub>p</sub> = I<sub>s</sub>V<sub>s</sub>. Step-up raises V, lowers I → lower I²R transmission losses; a.c. required (changing flux).</p>`,
  },
  {
    topic: "Nuclear Physics",
    spec: "5.1–5.2 (2023–2025)",
    html: `<h2>Nuclear Physics</h2>
<p><strong>Cambridge IGCSE 0625 (2023–2025):</strong> nuclear model, radioactivity, decay types, half-life, safety, fission/fusion (Extended).</p>

<h3>1. The nuclear model</h3>
<p>Nucleus (protons +, neutrons 0) with orbiting electrons (−). Nuclide notation ᴬ_Z X. Isotopes: same Z, different A. Rutherford scattering established the nuclear model; proton number Z, nucleon number A.</p>

<h3>2. Radiation types</h3>
<table border="1" cellpadding="6"><tr><th>Type</th><th>Nature</th><th>Range (air)</th><th>Stopped by</th></tr>
<tr><td>alpha α</td><td>helium nucleus (2p2n)</td><td>few cm</td><td>paper</td></tr>
<tr><td>beta β⁻</td><td>fast electron</td><td>~20–30 cm</td><td>few mm aluminium</td></tr>
<tr><td>gamma γ</td><td>EM wave</td><td>very far</td><td>thick lead/concrete</td></tr></table>
<p>Deflection in fields: α/β opposite, γ none. Ionising: α &gt; β &gt; γ. Background radiation: radon, cosmic, rocks, medical, fallout.</p>

<h3>3. Decay equations</h3>
<ul>
<li>α: A −4, Z −2 (e.g. ²³⁸₉₂U → ²³⁴₉₀Th + α).</li>
<li>β⁻: neutron → proton; A same, Z +1 (e.g. ¹⁴₆C → ¹⁴₇N + β⁻).</li>
<li>γ: no change to A or Z.</li>
</ul>
<p>Balance A and Z on both sides — that is the check.</p>

<h3>4. Half-life</h3>
<p>Time for half the unstable nuclei to decay (random process). Read from a decay curve or count halves: 80 → 40 → 20 over two half-lives.</p>
<p><strong>Example:</strong> 800 Bq, half-life 2 h → 200 Bq after 4 h.</p>

<h3>5. Safety and uses</h3>
<p>Uses: medical tracers (β/γ), sterilisation, thickness gauge (β), dating (C-14), smoke alarms (α). Safety: distance, time, shielding, wear badges, store in lead. Handle with tongs; never point at people.</p>

<h3>6. Fission and fusion (Extended)</h3>
<p>Fission: heavy nucleus splits (U-235 + neutron), chain reaction controlled by moderators/control rods — power stations. Fusion: light nuclei join (stellar) — needs huge T/P; releases more energy per kg; no long-lived waste.</p>`,
  },
  {
    topic: "Earth & Space",
    spec: "6 (2023–2025) — Earth and the Solar System; stars and the Universe (Extended)",
    html: `<h2>Earth &amp; Space</h2>
<p><strong>Cambridge IGCSE 0625 (2023–2025):</strong> Earth &amp; Solar System; stars &amp; the Universe (Extended).</p>

<h3>1. Earth, Moon, Sun</h3>
<p>Earth rotates 24 h (day/night), orbits 365¼ d (year + leap). Moon orbits Earth ~27.3 d; phases from viewing angle; lunar/solar eclipses when aligned. Seasons from axial tilt (23.5°), not distance.</p>

<h3>2. Solar system</h3>
<p>Planets (Mercury → Neptune), dwarf planets (Pluto), moons, asteroids, comets (eccentric orbits, tails away from Sun), natural satellites. Gravity keeps orbits; orbital speed &amp; radius relate to the central mass.</p>

<h3>3. Orbital motion</h3>
<p>Orbital speed v = 2πr/T. T grows with r (Kepler trend). Comets speed up near the Sun (ellipse, Sun at focus).</p>

<h3>4. Stars (Extended)</h3>
<p>Star formation: nebula → protostar (gravity, KE→thermal) → main sequence (hydrogen fusion: H→He, radiation pressure balances gravity) → red giant → white dwarf (Sun-mass) or supergiant → supernova → neutron star/black hole (massive stars). Elements heavier than iron form in supernovae.</p>

<h3>5. Universe (Extended)</h3>
<p>The Sun is one star in the Milky Way; the Milky Way is one of billions of galaxies. Redshift: receding galaxies show stretched wavelengths → the Universe is expanding → Big Bang model; CMB is the afterglow. Hubble: farther ⇒ faster recession.</p>

<h3>6. Scales</h3>
<p>light-year = distance light travels in a year (9.5 × 10¹⁵ m); astronomical unit = Earth–Sun distance (1.5 × 10¹¹ m).</p>`,
  },
];
