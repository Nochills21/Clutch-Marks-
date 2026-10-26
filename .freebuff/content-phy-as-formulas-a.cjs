// AS Level Physics (CAIE 9702) — the complete equation set for three notes,
// each equation followed by a symbol key in the same paragraph.
//
// Written against the notes' own syllabus statements:
//   electricity-d-c-circuits   9.1-9.3, 10.1-10.3
//   superposition              8.1-8.4
//   quantum-physics            22.1-22.4
//
// Notation: Unicode glyphs (Δ, λ, ρ, ω, θ, Φ, π, √, ×, ⁻¹), no LaTeX — the
// stored body is HTML and the PDF export does not run the maths renderer.
//
// Apply with:
//   node .freebuff/append-note-sections.cjs .freebuff/content-phy-as-formulas-a.cjs
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/note-formulas.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/note-formulas.sql --apply    (live)

const HEAD = `<h2>Equations and symbols</h2>
<p>The whole of this topic as equations, each written with its real symbols and each followed by a key naming every symbol and its unit. Where a law has more than one useful form both are given, because which one is quickest depends on which quantities the question hands you. Learn the form here and the algebraic rearrangement becomes mechanical in the exam.</p>`;

const sections = {
  /* ── 9.1-9.3, 10.1-10.3 ─────────────────────────────────────────────── */
  "b019737f-148f-4517-90eb-36528c45eb85": {
    slug: "electricity-d-c-circuits",
    html: `${HEAD}
<h3>9.1 Current, charge and drift velocity</h3>
<p><strong>I = ΔQ / Δt</strong><br><em>Key:</em> I = current (A, where 1 A = 1 C s⁻¹); ΔQ = charge passing a point in the conductor (C); Δt = time taken (s). The definition of current as rate of flow of charge.</p>
<p><strong>Q = I t</strong><br><em>Key:</em> Q = charge transferred (C); I = steady current (A); t = time for which it flows (s). The definition rearranged for a constant current — the form used in electrolysis and in electricity-cost questions, where 1 kW h = 3.6 × 10⁶ J.</p>
<p><strong>I = n A v q</strong><br><em>Key:</em> I = current (A); n = number density of charge carriers (m⁻³); A = cross-sectional area of the conductor (m²); v = mean drift velocity of the carriers (m s⁻¹); q = charge on each carrier (C), equal to e = 1.60 × 10⁻¹⁹ C for electrons. Because n is fixed by the metal, a thinner wire must have a larger drift velocity for the same current.</p>
<p><strong>W = Q V = I V t</strong><br><em>Key:</em> W = energy transferred electrically (J); Q = charge moved (C); V = potential difference across the component (V); I = current (A); t = time (s).</p>

<h3>9.2 Potential difference, e.m.f. and power</h3>
<p><strong>V = W / Q</strong><br><em>Key:</em> V = potential difference across a component (V, where 1 V = 1 J C⁻¹); W = energy converted from electrical to other forms in that component (J); Q = charge passing through it (C).</p>
<p><strong>E = W / Q</strong><br><em>Key:</em> E = electromotive force of the source (V); W = energy converted from chemical, mechanical or light energy into electrical energy per charge (J); Q = charge (C). The distinction the mark scheme rewards: e.m.f. is energy given <em>to</em> the charge inside the source; p.d. is energy taken <em>from</em> the charge in a component.</p>
<p><strong>P = W / t = I V</strong><br><em>Key:</em> P = power (W = J s⁻¹); W = energy transferred (J); t = time (s); I = current (A); V = potential difference (V).</p>
<p><strong>P = I² R = V² / R</strong><br><em>Key:</em> P = power dissipated as heat in a resistor (W); I = current through it (A); R = its resistance (Ω); V = p.d. across it (V). Use I²R when the current is known and V²/R when the p.d. is fixed — in parallel, V is shared equally, in series the current is.</p>
<p><strong>η = P_useful / P_input × 100%</strong><br><em>Key:</em> η = efficiency (%); P_useful = power delivered to the load (W); P_input = total power supplied by the source, E I (W).</p>

<h3>9.3 Resistance and resistivity</h3>
<p><strong>R = V / I</strong><br><em>Key:</em> R = resistance (Ω = V A⁻¹); V = p.d. across the component (V); I = current through it (A). Ohmic only when R is constant as V varies — the I–V graph through the origin is the test.</p>
<p><strong>R = ρ L / A</strong><br><em>Key:</em> R = resistance (Ω); ρ = resistivity of the material (Ω m); L = length of the conductor (m); A = cross-sectional area (m²). Resistivity is a property of the material, resistance of the object — doubling the length doubles R but leaves ρ unchanged.</p>
<p><strong>ρ = R A / L</strong><br><em>Key:</em> ρ = resistivity (Ω m); R = measured resistance (Ω); A = cross-sectional area (m²); L = measured length (m). The working form of the experiment: plot R against L, gradient = ρ/A, so ρ = gradient × A.</p>
<p><strong>G = 1 / R</strong><br><em>Key:</em> G = conductance (S = Ω⁻¹); R = resistance (Ω). Conductance adds directly in parallel, which is why parallel combinations are easier in G.</p>

<h3>10.1 Series, parallel, internal resistance and meters</h3>
<p><strong>R_series = R₁ + R₂ + R₃ + …</strong><br><em>Key:</em> R_series = total resistance (Ω); R₁, R₂ … = individual resistances (Ω). The current is common to all, so the p.d.s add and the resistances add.</p>
<p><strong>1 / R_parallel = 1 / R₁ + 1 / R₂ + 1 / R₃ + …</strong><br><em>Key:</em> R_parallel = total resistance (Ω); R₁, R₂ … = branch resistances (Ω). The p.d. is common, so the currents add. For n identical resistors R each, R_parallel = R / n.</p>
<p><strong>R_parallel = R₁ R₂ / (R₁ + R₂)</strong><br><em>Key:</em> R_parallel = resistance of the pair (Ω); R₁, R₂ = the two resistances (Ω). The two-resistor shortcut; the total is always smaller than the smaller of the two.</p>
<p><strong>E = V + I r</strong><br><em>Key:</em> E = e.m.f. of the source (V); V = terminal potential difference, the p.d. across the external circuit (V); I = current drawn (A); r = internal resistance of the source (Ω). The lost volts are I r, and they exist because the current also flows through the source itself.</p>
<p><strong>V = E − I r</strong><br><em>Key:</em> V = terminal p.d. (V); E = e.m.f. (V); I = current (A); r = internal resistance (Ω). This is why a battery reads nearly its e.m.f. on a high-resistance voltmeter and sags when a lamp is connected.</p>
<p><strong>E = I (R + r)</strong><br><em>Key:</em> E = e.m.f. (V); I = current (A); R = external load resistance (Ω); r = internal resistance (Ω). The circuit as one loop: the e.m.f. drives the current through both the load and the source.</p>
<p><strong>I = E / (R + r)</strong><br><em>Key:</em> I = current (A); E = e.m.f. (V); R = external resistance (Ω); r = internal resistance (Ω). To measure r, vary R, plot 1/I against R: gradient = 1/E and intercept = r/E.</p>
<p><strong>P_output = I² R = E² R / (R + r)²</strong><br><em>Key:</em> P_output = power delivered to the external load (W); E = e.m.f. (V); R = load resistance (Ω); r = internal resistance (Ω); I = current (A). Differentiating gives the maximum-power condition below.</p>
<p><strong>R = r gives P_output (max) = E² / (4 r)</strong><br><em>Key:</em> R = load resistance at which output power peaks (Ω); r = internal resistance (Ω); E = e.m.f. (V); P_output (max) = greatest power the source can deliver (W). Maximum power transfer — but at this point the efficiency is only 50%, since the source dissipates the same power internally.</p>
<p><strong>Ammeter resistance → 0, voltmeter resistance → ∞</strong><br><em>Key:</em> an ideal ammeter is placed in series and must not change the current, so its resistance is zero; an ideal voltmeter is placed in parallel and must not divert current, so its resistance is infinite. A real voltmeter of resistance R_V across a resistor R reads V R_V / (R + R_V), which is always less than the true p.d.</p>

<h3>10.2 Kirchhoff's laws</h3>
<p><strong>Σ I_in = Σ I_out</strong><br><em>Key:</em> currents entering a junction (A) equal currents leaving it. The conservation of charge: charge cannot pile up at a point in a steady circuit.</p>
<p><strong>Σ E = Σ I R</strong><br><em>Key:</em> Σ E = sum of e.m.f.s around a closed loop (V); Σ I R = sum of the potential drops around the same loop (V). The conservation of energy: going round a loop returns you to the same potential.</p>
<p><strong>Σ ΔV = 0 around any closed loop</strong><br><em>Key:</em> ΔV = potential change across each element (V), counted positive in the direction of travel when the potential rises. The same statement as the line above, written so that sources and resistors are treated alike.</p>

<h3>10.3 Potential dividers</h3>
<p><strong>V_out = V_in × R₂ / (R₁ + R₂)</strong><br><em>Key:</em> V_out = p.d. across the resistor the output is taken from (V); V_in = p.d. across the whole chain (V); R₁ = the other resistor (Ω); R₂ = the resistor across which the output is measured (Ω). The chain carries the same current, so each resistor takes a share of the p.d. in proportion to its resistance.</p>
<p><strong>V₁ / V₂ = R₁ / R₂</strong><br><em>Key:</em> V₁, V₂ = p.d.s across the two resistors (V); R₁, R₂ = their resistances (Ω). The ratio form — quicker than the fraction when both outputs are wanted.</p>
<p><strong>V_out = E × R / (R + R_thermistor)</strong><br><em>Key:</em> V_out = output p.d. across the fixed resistor R (V); E = supply e.m.f. (V); R = fixed resistance (Ω); R_thermistor = resistance of the thermistor at the current temperature (Ω). A thermistor's resistance <em>falls</em> as temperature rises (negative temperature coefficient), so tapping across the fixed resistor gives an output that rises with temperature and tapping across the thermistor gives one that falls.</p>
<p><strong>V_out = E × R_LDR / (R + R_LDR)</strong><br><em>Key:</em> V_out = output p.d. across the LDR (V); E = supply e.m.f. (V); R = fixed series resistance (Ω); R_LDR = resistance of the light-dependent resistor (Ω), which falls as illumination increases. The same divider, with light instead of heat as the input.</p>
<p><strong>V_out = V_in × R₂ / (R₁ + R₂) × R_load / (R_load + R₂)</strong><br><em>Key:</em> R_load = resistance of whatever the divider feeds (Ω); the other symbols as above. The loaded-divider correction: a load in parallel with R₂ lowers the effective lower resistance, so the output sags below the unloaded value — the reason a divider is a poor supply for anything drawing current.</p>`,
  },

  /* ── 8.1-8.4 ─────────────────────────────────────────────────────────── */
  "013ebfea-e165-48f6-ad1d-2e01fd4e5214": {
    slug: "superposition",
    html: `${HEAD}
<h3>8.1 Wave quantities and stationary waves</h3>
<p><strong>v = f λ</strong><br><em>Key:</em> v = wave speed (m s⁻¹); f = frequency (Hz); λ = wavelength (m). For a wave crossing a boundary the speed and wavelength change but the frequency is set by the source and does not.</p>
<p><strong>T = 1 / f</strong><br><em>Key:</em> T = period, the time for one complete oscillation (s); f = frequency (Hz).</p>
<p><strong>y = y₁ + y₂</strong><br><em>Key:</em> y = resultant displacement at a point (m); y₁, y₂ = displacements the two waves would separately produce there (m). The superposition principle itself: displacements add as vectors, so two troughs make a deeper trough and a crest meeting a trough cancels.</p>
<p><strong>node spacing = λ / 2, antinode spacing = λ / 2, node to nearest antinode = λ / 4</strong><br><em>Key:</em> λ = wavelength of the waves forming the stationary wave (m). A stationary wave stores energy rather than transporting it, because the two travelling waves carry equal energy in opposite directions.</p>
<p><strong>λ_n = 2 L / n, so f_n = n v / (2 L)</strong><br><em>Key:</em> λ_n = wavelength of the nth harmonic (m); L = length of the string or pipe (m); n = 1, 2, 3 … (all integers); f_n = its frequency (Hz); v = wave speed on the string or in the air (m s⁻¹). Applies to a string fixed at both ends and to a pipe open at both ends; f₁ = v/2L is the fundamental, and every harmonic is present.</p>
<p><strong>λ_n = 4 L / n, so f_n = n v / (4 L) with n = 1, 3, 5 …</strong><br><em>Key:</em> λ_n = wavelength (m); L = length of the pipe closed at one end (m); n = odd integers only; f_n = frequency (Hz); v = speed of sound (m s⁻¹). A closed end must be a node and an open end an antinode, so only odd harmonics exist — the missing even harmonics are the standard exam trap.</p>
<p><strong>f_n = n f₁</strong><br><em>Key:</em> f_n = frequency of the nth harmonic (Hz); f₁ = fundamental frequency (Hz); n = harmonic number. Use it to jump straight from the fundamental to the harmonic a question asks for.</p>

<h3>8.2 Diffraction and 8.3 interference</h3>
<p><strong>path difference = n λ (constructive), path difference = (n + ½) λ (destructive)</strong><br><em>Key:</em> path difference = difference in distance travelled by the two waves to the point (m); λ = wavelength (m); n = 0, 1, 2 … For sources in phase, a whole number of wavelengths arrives in step and reinforces; a half-odd number arrives in antiphase and cancels.</p>
<p><strong>Δφ = 2π Δx / λ</strong><br><em>Key:</em> Δφ = phase difference between the two waves at the point (rad); Δx = path difference (m); λ = wavelength (m). The bridge between the two languages of interference: distances in metres and phase in radians, related by 2π per wavelength.</p>
<p><strong>Δφ = 2π Δt / T</strong><br><em>Key:</em> Δφ = phase difference (rad); Δt = time delay between the two waves arriving (s); T = period (s). The same idea in time: one whole period of delay is one whole cycle of phase.</p>
<p><strong>w = λ D / d</strong><br><em>Key:</em> w = fringe spacing, centre to centre of adjacent bright fringes (m); λ = wavelength (m); D = distance from the double slits to the screen (m); d = separation of the two slits (m). Young's double-slit result, valid when D ≫ d and the fringes are close together.</p>
<p><strong>λ = w d / D</strong><br><em>Key:</em> λ = wavelength of the light (m); w = measured fringe spacing (m); d = slit separation (m); D = slit-to-screen distance (m). The measuring form: w and D are easy to measure, d is given, so λ comes out of three lengths.</p>
<p><strong>I ∝ A²</strong><br><em>Key:</em> I = intensity, power per unit area (W m⁻²); A = amplitude of the oscillation (m). Doubling the amplitude quadruples the intensity, which is why two identical waves in phase give four times the intensity of one rather than twice.</p>
<p><strong>I = P / (4 π r²)</strong><br><em>Key:</em> I = intensity at distance r from a point source (W m⁻²); P = power radiated by the source (W); r = distance from the source (m). The inverse-square law that follows from the energy spreading over a sphere.</p>
<p><strong>coherence: constant phase difference, same frequency</strong><br><em>Key:</em> two sources are coherent when the phase difference between them does not vary with time, which requires identical frequency and a fixed path relationship. Independent lamps are not coherent, which is why a stable fringe pattern needs one source split into two paths — a laser, or a single slit feeding a double slit.</p>

<h3>8.4 The diffraction grating</h3>
<p><strong>d sin θ = n λ</strong><br><em>Key:</em> d = grating spacing, the distance between adjacent slits (m); θ = angle between the normal and the nth-order maximum (degrees); n = order of the maximum, 0, 1, 2 …; λ = wavelength (m). Constructive interference from many slits at once, which is why the maxima are sharp where two-slit fringes are broad.</p>
<p><strong>d = 1 / N</strong><br><em>Key:</em> d = slit spacing (m); N = number of lines per metre (m⁻¹). For a grating quoted in lines per millimetre, N = 1000 × lines mm⁻¹.</p>
<p><strong>n_max = d / λ (largest integer below it)</strong><br><em>Key:</em> n_max = highest order that can be seen; d = slit spacing (m); λ = wavelength (m). It follows from sin θ ≤ 1: an order whose d sin θ would exceed d cannot exist, and the largest integer that fits is the answer.</p>
<p><strong>total maxima = 2 n_max + 1</strong><br><em>Key:</em> n_max = highest visible order; the +1 counts the central zero-order maximum; the factor 2 counts the orders on either side of it. The standard final part of a grating question.</p>
<p><strong>sin θ ∝ λ</strong><br><em>Key:</em> θ = diffraction angle (degrees); λ = wavelength (m); at fixed order n and spacing d, since sin θ = nλ/d. This is why white light spreads into a spectrum with red deviated most and violet least — the opposite of a prism, where violet is deviated most.</p>`,
  },

  /* ── 22.1-22.4 ───────────────────────────────────────────────────────── */
  "9078e0a1-ee3d-4cec-bb01-092369018e88": {
    slug: "quantum-physics",
    html: `${HEAD}
<h3>22.1 Energy and momentum of a photon</h3>
<p><strong>E = h f</strong><br><em>Key:</em> E = energy of one photon (J); h = Planck constant, 6.63 × 10⁻³⁴ J s; f = frequency of the radiation (Hz). The energy is carried in discrete packets, so a dim beam of high-frequency light delivers more energy per photon than a bright beam of low-frequency light.</p>
<p><strong>f = c / λ</strong><br><em>Key:</em> f = frequency (Hz); c = speed of light in a vacuum, 3.00 × 10⁸ m s⁻¹; λ = wavelength (m). In a medium the speed falls but the frequency — and therefore the photon energy — is unchanged.</p>
<p><strong>E = h c / λ</strong><br><em>Key:</em> E = photon energy (J); h = 6.63 × 10⁻³⁴ J s; c = 3.00 × 10⁸ m s⁻¹; λ = wavelength (m). The working form, since wavelengths are what a spectrum gives you.</p>
<p><strong>p = h / λ</strong><br><em>Key:</em> p = momentum of the photon (kg m s⁻¹ = N s); h = 6.63 × 10⁻³⁴ J s; λ = wavelength (m). A photon has no mass but does have momentum, which is how radiation pressure and Compton scattering arise.</p>
<p><strong>E = p c</strong><br><em>Key:</em> E = photon energy (J); p = photon momentum (kg m s⁻¹); c = 3.00 × 10⁸ m s⁻¹. The massless-particle energy relation, and a quick check on the two equations above.</p>
<p><strong>N = P / (h f)</strong><br><em>Key:</em> N = number of photons emitted per second (s⁻¹); P = power of the source (W); h = 6.63 × 10⁻³⁴ J s; f = frequency (Hz). Dividing the beam power by the energy of one photon counts the photons.</p>

<h3>22.2 The photoelectric effect</h3>
<p><strong>h f = Φ + KE_max</strong><br><em>Key:</em> h f = energy of the incident photon (J); Φ = work function, the minimum energy needed to remove an electron from the metal surface (J); KE_max = maximum kinetic energy of an emitted photoelectron (J). Einstein's equation: one photon interacts with one electron, and whatever is left after the escape cost becomes kinetic energy.</p>
<p><strong>Φ = h f₀ = h c / λ₀</strong><br><em>Key:</em> Φ = work function (J); f₀ = threshold frequency, below which no emission occurs whatever the intensity (Hz); λ₀ = threshold wavelength (m); h = 6.63 × 10⁻³⁴ J s; c = 3.00 × 10⁸ m s⁻¹. The threshold exists because a single photon must carry the whole escape energy — intensity cannot make up the deficit, which is the observation classical wave theory cannot explain.</p>
<p><strong>KE_max = e V_s</strong><br><em>Key:</em> KE_max = maximum kinetic energy of the emitted electrons (J); e = elementary charge, 1.60 × 10⁻¹⁹ C; V_s = stopping potential, the reverse p.d. that just stops the photocurrent (V). The stopping potential measures the fastest electrons directly, which is how KE_max is found in the experiment.</p>
<p><strong>KE_max = h (f − f₀)</strong><br><em>Key:</em> KE_max = maximum kinetic energy (J); h = 6.63 × 10⁻³⁴ J s; f = incident frequency (Hz); f₀ = threshold frequency (Hz). The linear graph: KE_max against f is a straight line of gradient h, intercept −Φ on the energy axis and f₀ on the frequency axis.</p>
<p><strong>gradient = h, y-intercept = −Φ</strong><br><em>Key:</em> on a graph of KE_max (J) against frequency f (Hz); gradient = Planck constant (J s); y-intercept = minus the work function (−J). This is the standard "use the graph" question, and it works for any metal — only the intercept moves.</p>
<p><strong>1 eV = 1.60 × 10⁻¹⁹ J</strong><br><em>Key:</em> eV = electronvolt, the energy gained by one electron accelerated through 1 V. Convert before substituting into h f = Φ + KE_max unless every term is in eV.</p>

<h3>22.3 Wave–particle duality</h3>
<p><strong>λ = h / p</strong><br><em>Key:</em> λ = de Broglie wavelength of the particle (m); h = 6.63 × 10⁻³⁴ J s; p = momentum of the particle (kg m s⁻¹). Every particle has a wavelength; it is immeasurably small for a cricket ball and comparable to atomic spacing for an electron.</p>
<p><strong>λ = h / (m v)</strong><br><em>Key:</em> λ = de Broglie wavelength (m); m = mass of the particle (kg); v = its speed (m s⁻¹); h = 6.63 × 10⁻³⁴ J s. The non-relativistic form, valid while v ≪ c.</p>
<p><strong>p = √(2 m KE)</strong><br><em>Key:</em> p = momentum (kg m s⁻¹); m = mass (kg); KE = kinetic energy (J). From KE = ½ m v² and p = m v, eliminating v.</p>
<p><strong>λ = h / √(2 m KE)</strong><br><em>Key:</em> λ = de Broglie wavelength (m); m = mass of the particle (kg); KE = its kinetic energy (J); h = 6.63 × 10⁻³⁴ J s. The form to use when the energy is given rather than the speed.</p>
<p><strong>e V = ½ m v², so λ = h / √(2 m e V)</strong><br><em>Key:</em> e = elementary charge, 1.60 × 10⁻¹⁹ C; V = accelerating potential difference (V); m = mass of the electron, 9.11 × 10⁻³¹ kg; v = its speed (m s⁻¹); λ = de Broglie wavelength (m); h = 6.63 × 10⁻³⁴ J s. An electron accelerated through 100 V has a wavelength of about 0.12 nm — the same order as atomic spacing, which is why electron diffraction works and electron microscopes resolve what light cannot.</p>

<h3>22.4 Energy levels in atoms and line spectra</h3>
<p><strong>ΔE = E_upper − E_lower = h f = h c / λ</strong><br><em>Key:</em> ΔE = energy difference between two levels (J); E_upper, E_lower = energies of the levels involved (J); h = 6.63 × 10⁻³⁴ J s; f = frequency of the emitted or absorbed photon (Hz); c = 3.00 × 10⁸ m s⁻¹; λ = its wavelength (m). Emission when an electron falls, absorption when one is raised.</p>
<p><strong>λ = h c / ΔE</strong><br><em>Key:</em> λ = wavelength of the line (m); h = 6.63 × 10⁻³⁴ J s; c = 3.00 × 10⁸ m s⁻¹; ΔE = level separation (J). Rearranged for the wavelength question; convert ΔE from eV to joules first.</p>
<p><strong>E_n = −13.6 / n² eV (hydrogen)</strong><br><em>Key:</em> E_n = energy of the nth level of the hydrogen atom (eV); n = principal quantum number, 1, 2, 3 …; the negative sign means the electron is bound, with zero energy at infinite separation. The spacing between levels shrinks as n grows, which is why the spectral lines bunch together towards a series limit.</p>
<p><strong>ionisation energy = 0 − E₁ = 13.6 eV (hydrogen)</strong><br><em>Key:</em> E₁ = energy of the ground state (eV). The energy needed to remove an electron completely from the ground state; for any other level it is 0 − E_n, which is smaller.</p>
<p><strong>line spectra: ΔE fixed, so λ fixed</strong><br><em>Key:</em> because only discrete level differences exist, only photons of those exact energies can be emitted or absorbed, so a spectrum shows sharp lines rather than a continuous band. Each element has its own set of levels and therefore its own signature lines — the basis of spectroscopic identification.</p>`,
  },
};

module.exports = { sections };
