// A2 Level Physics (CAIE 9702) — the complete equation set for the two worst
// A2 notes, each equation followed by a symbol key in the same paragraph.
//
// Written against the notes' own syllabus statements:
//   thermal-physics            14.1-14.3, 15.1-15.3, 16.1-16.2
//   circular-motion-and-shm    12.1-12.2 (SHM and the gravitational link)
//
// Notation: Unicode glyphs (Δ, θ, ω, π, λ, ρ, √, ×, ⁻¹), no LaTeX.
//
// Apply with:
//   node .freebuff/append-note-sections.cjs .freebuff/content-phy-a2-formulas-a.cjs
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/note-formulas.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/note-formulas.sql --apply    (live)

const HEAD = `<h2>Equations and symbols</h2>
<p>Every relation this topic can be examined on, in the form the mark scheme expects, with a key naming each symbol and its unit. The derivations in the sections above end here: if you can write these from memory and say what each symbol means, the algebra in the exam is bookkeeping.</p>`;

const sections = {
  /* ── 14.1-16.2 ───────────────────────────────────────────────────────── */
  "9aeb73c7-e1de-4bae-bb5e-eb23ae83e3b3": {
    slug: "thermal-physics",
    html: `${HEAD}
<h3>14.1-14.2 Thermal equilibrium and temperature scales</h3>
<p><strong>T(K) = θ(°C) + 273.15</strong><br><em>Key:</em> T = thermodynamic temperature (K); θ = Celsius temperature (°C); 273.15 = the offset between the ice point and absolute zero (K). Exams accept 273, and a temperature given as 27 °C becomes 300 K.</p>
<p><strong>ΔT (in K) = Δθ (in °C)</strong><br><em>Key:</em> ΔT = temperature change in kelvin (K); Δθ = the same change in degrees Celsius (°C). A change of one kelvin is a change of one degree Celsius, because the scales differ only by their zero — which is why a specific heat capacity in J kg⁻¹ K⁻¹ can be used with a temperature difference measured in °C.</p>
<p><strong>thermal equilibrium: no net heat flow between bodies in contact</strong><br><em>Key:</em> two bodies are in thermal equilibrium when they are at the same temperature, so no net energy transfers between them; the thermometer reads the same as the body only once this state is reached. The zeroth law in one line: equilibrium is transitive, which is what makes a thermometer possible.</p>

<h3>14.3 Specific heat capacity and specific latent heat</h3>
<p><strong>E = m c Δθ</strong><br><em>Key:</em> E = energy supplied to raise the temperature (J); m = mass of the substance (kg); c = specific heat capacity, the energy needed to raise 1 kg by 1 K (J kg⁻¹ K⁻¹); Δθ = temperature rise (°C or K, the same number). No phase change is allowed during the heating, or some of E goes into breaking bonds instead.</p>
<p><strong>c = E / (m Δθ)</strong><br><em>Key:</em> c = specific heat capacity (J kg⁻¹ K⁻¹); E = energy supplied (J); m = mass (kg); Δθ = temperature rise (K). The measuring form, used with an electrical heater where E = V I t.</p>
<p><strong>C = m c</strong><br><em>Key:</em> C = heat capacity of the whole object (J K⁻¹); m = its mass (kg); c = specific heat capacity of its material (J kg⁻¹ K⁻¹). Then E = C Δθ for the object as a whole; two objects of the same material have heat capacities in the ratio of their masses.</p>
<p><strong>E = m L</strong><br><em>Key:</em> E = energy transferred during a change of state (J); m = mass changing state (kg); L = specific latent heat, the energy per kilogram to change state at constant temperature (J kg⁻¹). Use L_fusion for melting and freezing, L_vaporisation for boiling and condensing; the temperature does not rise while this energy is supplied.</p>
<p><strong>E_total = m c Δθ (heating to the change) + m L (the change itself) + m c Δθ (heating beyond it)</strong><br><em>Key:</em> each term is the energy for one stage (J); the symbols are as above. The shape of a heating curve: sloped where a single phase is warming, flat where it changes state.</p>
<p><strong>heat lost = heat gained</strong><br><em>Key:</em> in an insulated system, the energy leaving the hotter body (J) equals that entering the colder one, so m₁ c₁ (θ_hot − θ_mix) = m₂ c₂ (θ_mix − θ_cold). The method of mixtures: the only unknown is usually the final temperature, or a specific heat capacity once it is measured.</p>

<h3>15.1 The mole</h3>
<p><strong>n = m / M</strong><br><em>Key:</em> n = amount of substance (mol); m = mass of the sample (kg or g); M = molar mass, the mass of one mole (kg mol⁻¹ or g mol⁻¹). Keep m and M in the same unit — grams with g mol⁻¹, kilograms with kg mol⁻¹.</p>
<p><strong>N = n N_A</strong><br><em>Key:</em> N = number of particles (dimensionless); n = amount of substance (mol); N_A = Avogadro constant, 6.02 × 10²³ mol⁻¹. One mole of any substance contains the same number of particles, which is why molar masses compare masses of equal particle counts.</p>
<p><strong>N_A = 6.02 × 10²³ mol⁻¹</strong><br><em>Key:</em> Avogadro constant: the number of particles in one mole. In this specification it is defined as the number of atoms in 0.012 kg of carbon-12.</p>

<h3>15.2 The equation of state</h3>
<p><strong>p V = n R T</strong><br><em>Key:</em> p = pressure (Pa = N m⁻²); V = volume (m³); n = amount of gas (mol); R = molar gas constant, 8.31 J K⁻¹ mol⁻¹; T = thermodynamic temperature (K). The molar form — use it when the amount is known in moles.</p>
<p><strong>p V = N k T</strong><br><em>Key:</em> p = pressure (Pa); V = volume (m³); N = number of molecules; k = Boltzmann constant, 1.38 × 10⁻²³ J K⁻¹; T = temperature (K). The molecular form — use it when the question counts molecules rather than moles.</p>
<p><strong>R = N_A k</strong><br><em>Key:</em> R = 8.31 J K⁻¹ mol⁻¹; N_A = 6.02 × 10²³ mol⁻¹; k = 1.38 × 10⁻²³ J K⁻¹. The bridge between the two forms of the equation of state: dividing pV = NkT by n gives pV = (N/n) kT = N_A k T.</p>
<p><strong>p V / T = constant (for a fixed mass of gas)</strong><br><em>Key:</em> p = pressure (Pa); V = volume (m³); T = temperature (K). The combined gas law: states 1 and 2 of the same sample satisfy p₁V₁/T₁ = p₂V₂/T₂, which covers Boyle's, Charles' and the pressure law as special cases.</p>
<p><strong>p = ρ R T / M</strong><br><em>Key:</em> p = pressure (Pa); ρ = density of the gas (kg m⁻³); R = 8.31 J K⁻¹ mol⁻¹; T = temperature (K); M = molar mass (kg mol⁻¹). Since ρ = m/V and n = m/M, the equation of state written in terms of density — the form for "why is hot air less dense".</p>

<h3>15.3 Kinetic theory of gases</h3>
<p><strong>p V = ⅓ N m ⟨c²⟩</strong><br><em>Key:</em> p = pressure (Pa); V = volume (m³); N = number of molecules; m = mass of one molecule (kg); ⟨c²⟩ = mean square speed of the molecules (m² s⁻²). The pressure comes from molecular collisions with the walls: momentum change per collision times collision rate per unit area.</p>
<p><strong>½ m ⟨c²⟩ = (3/2) k T</strong><br><em>Key:</em> ½ m ⟨c²⟩ = mean translational kinetic energy of one molecule (J); m = molecular mass (kg); ⟨c²⟩ = mean square speed (m² s⁻²); k = 1.38 × 10⁻²³ J K⁻¹; T = temperature (K). The mean kinetic energy depends only on temperature, and is the same for every gas at that temperature — heavier molecules simply move more slowly.</p>
<p><strong>⟨c²⟩ = 3 k T / m = 3 p / ρ</strong><br><em>Key:</em> ⟨c²⟩ = mean square speed (m² s⁻²); k = 1.38 × 10⁻²³ J K⁻¹; T = temperature (K); m = mass of one molecule (kg); p = pressure (Pa); ρ = density (kg m⁻³). The second form needs no molecular data at all.</p>
<p><strong>c_rms = √(3 k T / m) = √(3 p / ρ)</strong><br><em>Key:</em> c_rms = root-mean-square speed (m s⁻¹); k = 1.38 × 10⁻²³ J K⁻¹; T = temperature (K); m = mass of one molecule (kg); p = pressure (Pa); ρ = density (kg m⁻³). Take the rms speed rather than the mean speed: the mean of the squared speeds carries the energy.</p>
<p><strong>n = N / V = p / (k T)</strong><br><em>Key:</em> n = number density of molecules (m⁻³); N = number of molecules; V = volume (m³); p = pressure (Pa); k = 1.38 × 10⁻²³ J K⁻¹; T = temperature (K). At s.t.p. this gives about 2.7 × 10²⁵ m⁻³, the number worth remembering for order-of-magnitude checks.</p>

<h3>16.1 Internal energy</h3>
<p><strong>U = Σ KE + Σ PE of the molecules</strong><br><em>Key:</em> U = internal energy of the body (J); Σ KE = total random kinetic energy of its molecules (J); Σ PE = total potential energy from the intermolecular forces (J). For an ideal gas the potential term is negligible, so U depends only on temperature; for a real solid or liquid the potential term dominates the latent heat.</p>
<p><strong>U = (3/2) N k T (ideal monatomic gas)</strong><br><em>Key:</em> U = internal energy (J); N = number of molecules; k = 1.38 × 10⁻²³ J K⁻¹; T = temperature (K). Follows from ½ m ⟨c²⟩ = (3/2) k T multiplied by N molecules — no potential energy to add.</p>

<h3>16.2 The first law of thermodynamics</h3>
<p><strong>ΔU = q + w</strong><br><em>Key:</em> ΔU = increase in internal energy of the system (J); q = heat supplied <em>to</em> the system (J); w = work done <em>on</em> the system (J). The sign convention used throughout this specification — energy in is positive. Get the convention wrong and every answer is out by a sign, so state it in the working.</p>
<p><strong>w = − p ΔV</strong><br><em>Key:</em> w = work done on the gas (J); p = pressure (Pa); ΔV = change in volume (m³); the minus sign says that a gas expanding (ΔV positive) does work on its surroundings, so work is done <em>on</em> it negatively. For a constant-pressure process this is the area under a p–V graph.</p>
<p><strong>ΔU = q − p ΔV</strong><br><em>Key:</em> ΔU = change in internal energy (J); q = heat supplied to the gas (J); p = pressure (Pa); ΔV = volume change (m³). The expanded first law: heat in, minus the work the gas does by expanding.</p>
<p><strong>q = 0 ⇒ ΔU = w (adiabatic); ΔV = 0 ⇒ ΔU = q (isochoric); ΔT = 0 ⇒ ΔU = 0 (isothermal, ideal gas)</strong><br><em>Key:</em> the three named processes as special cases; q = heat exchanged (J); w = work done on the system (J); ΔU = internal energy change (J); ΔV = volume change (m³); ΔT = temperature change (K). An adiabatic change is fast enough, or insulated enough, that no heat flows — a sudden compression, or a gas expanding into a vacuum.</p>
<p><strong>C_p − C_v = R</strong><br><em>Key:</em> C_p = molar heat capacity at constant pressure (J K⁻¹ mol⁻¹); C_v = molar heat capacity at constant volume (J K⁻¹ mol⁻¹); R = 8.31 J K⁻¹ mol⁻¹. At constant pressure some of the heat goes into work of expansion, so more is needed for the same temperature rise — the difference is exactly R per mole.</p>`,
  },

  /* ── 12.1-12.2, SHM ──────────────────────────────────────────────────── */
  "08301850-6448-4a6a-9f29-d723df78f89a": {
    slug: "circular-motion-and-shm",
    html: `${HEAD}
<h3>12.1 Kinematics of uniform circular motion</h3>
<p><strong>θ = s / r</strong><br><em>Key:</em> θ = angular displacement (rad); s = arc length travelled along the circle (m); r = radius of the circle (m). The radian is defined by this ratio, so an angle in radians is a pure number — one complete revolution is 2π rad = 360°.</p>
<p><strong>ω = Δθ / Δt = 2π / T = 2π f</strong><br><em>Key:</em> ω = angular velocity (rad s⁻¹); Δθ = angular displacement (rad); Δt = time taken (s); T = period, the time for one revolution (s); f = frequency of revolution (Hz). Uniform circular motion means ω is constant while the direction of the velocity changes continuously.</p>
<p><strong>v = ω r</strong><br><em>Key:</em> v = linear speed along the tangent (m s⁻¹); ω = angular velocity (rad s⁻¹); r = radius (m). The same ω for two points on a rotating body gives them speeds in the ratio of their radii — the rim of a wheel moves faster than a point near its hub.</p>
<p><strong>f = 1 / T</strong><br><em>Key:</em> f = frequency (Hz); T = period (s). A wheel turning 20 times a minute has f = 20/60 = 0.33 Hz and T = 3.0 s.</p>
<p><strong>a = v² / r = ω² r = ω v</strong><br><em>Key:</em> a = centripetal acceleration (m s⁻²); v = speed (m s⁻¹); r = radius (m); ω = angular velocity (rad s⁻¹). Directed towards the centre at every instant; the speed is constant but the velocity is not, because its direction changes, and that change is the acceleration.</p>
<p><strong>F = m a = m v² / r = m ω² r</strong><br><em>Key:</em> F = resultant centripetal force (N); m = mass of the moving object (kg); a = centripetal acceleration (m s⁻²); v = speed (m s⁻¹); r = radius (m); ω = angular velocity (rad s⁻¹). Not a new kind of force — it is the name for whatever real force points to the centre: tension, gravity, friction or the normal contact force.</p>

<h3>Turning, banking and vertical circles</h3>
<p><strong>tan θ = v² / (r g)</strong><br><em>Key:</em> θ = angle of banking of the road, or the angle the string makes with the vertical for a conical pendulum (°); v = speed of the vehicle or bob (m s⁻¹); r = radius of the circular path (m); g = 9.81 m s⁻². Derived by dividing the horizontal equation N sin θ = m v²/r by the vertical N cos θ = m g, so the normal force cancels.</p>
<p><strong>at the top of a vertical circle: T + m g = m v² / r</strong><br><em>Key:</em> T = tension in the string, or the normal contact force from the track (N); m = mass (kg); g = 9.81 m s⁻²; v = speed at the top (m s⁻¹); r = radius (m). Both the weight and the tension point towards the centre, so they add.</p>
<p><strong>v_min = √(g r)</strong><br><em>Key:</em> v_min = minimum speed at the top for the object to stay on its path (m s⁻¹); g = 9.81 m s⁻²; r = radius (m). Found by setting T = 0 at the top: below this speed gravity alone exceeds the required centripetal force and the object leaves the circle.</p>
<p><strong>at the bottom of a vertical circle: T − m g = m v² / r</strong><br><em>Key:</em> T = tension (N); m = mass (kg); g = 9.81 m s⁻²; v = speed at the bottom (m s⁻¹); r = radius (m). Here the tension must support the weight as well as provide the centripetal force, so the string is most likely to break at the bottom.</p>
<p><strong>energy between top and bottom: ½ m v_bottom² = ½ m v_top² + m g (2 r)</strong><br><em>Key:</em> v_bottom, v_top = speeds at the lowest and highest points (m s⁻¹); m = mass (kg); g = 9.81 m s⁻²; r = radius (m); 2r = the vertical drop. The bridge between the two parts of a looping-track question.</p>

<h3>12.2 Linking circular motion to SHM</h3>
<p><strong>a = − ω² x</strong><br><em>Key:</em> a = acceleration (m s⁻²); ω = angular frequency of the oscillation (rad s⁻¹); x = displacement from the equilibrium position (m). The defining condition of simple harmonic motion: acceleration is proportional to displacement and always directed back towards the centre.</p>
<p><strong>x = A cos(ω t)</strong><br><em>Key:</em> x = displacement at time t (m); A = amplitude, the maximum displacement (m); ω = angular frequency (rad s⁻¹); t = time from the start of the motion (s). A sine form with the matching initial condition is equally valid — the physics is the same, only the phase differs.</p>
<p><strong>v = ± ω √(A² − x²)</strong><br><em>Key:</em> v = velocity at displacement x (m s⁻¹); ω = angular frequency (rad s⁻¹); A = amplitude (m); x = displacement (m). Fastest at the centre where x = 0, momentarily zero at the extremes where x = ±A.</p>
<p><strong>v_max = ω A, a_max = ω² A</strong><br><em>Key:</em> v_max = maximum speed, at the equilibrium position (m s⁻¹); a_max = maximum acceleration, at the extremes (m s⁻²); ω = angular frequency (rad s⁻¹); A = amplitude (m). The two numbers most questions actually ask for.</p>
<p><strong>T = 2 π / ω</strong><br><em>Key:</em> T = period of the oscillation (s); ω = angular frequency (rad s⁻¹). The link between the SHM equations and the timing of the motion.</p>
<p><strong>T = 2 π √(m / k)</strong><br><em>Key:</em> T = period (s); m = mass on the spring (kg); k = spring constant, force per unit extension (N m⁻¹). Mass–spring oscillator: a stiffer spring or a lighter mass oscillates faster, and amplitude does not affect the period.</p>
<p><strong>T = 2 π √(l / g)</strong><br><em>Key:</em> T = period (s); l = length of the simple pendulum (m); g = 9.81 m s⁻². Valid only for small oscillations (a few degrees), where sin θ ≈ θ; the period is independent of the mass of the bob, which is what makes a pendulum a clock.</p>
<p><strong>E_total = ½ m ω² A²</strong><br><em>Key:</em> E_total = total energy of the oscillator (J); m = mass (kg); ω = angular frequency (rad s⁻¹); A = amplitude (m). Constant in undamped SHM, exchanged continuously between kinetic and potential forms.</p>
<p><strong>KE = ½ m ω² (A² − x²), PE = ½ m ω² x²</strong><br><em>Key:</em> KE = kinetic energy (J); PE = potential energy (J); m = mass (kg); ω = angular frequency (rad s⁻¹); A = amplitude (m); x = displacement (m). The two add to E_total at every point, which is the quickest check on either.</p>
<p><strong>phase: v leads x by π/2, and a is in antiphase with x (π)</strong><br><em>Key:</em> x = displacement, v = velocity, a = acceleration of the oscillator; the phase differences are in radians. At the equilibrium position x = 0 while v is greatest and a is zero; at an extreme v = 0 while a is greatest and opposite to x.</p>
<p><strong>G M / r² = v² / r ⇒ v = √(G M / r)</strong><br><em>Key:</em> G = gravitational constant, 6.67 × 10⁻¹¹ N m² kg⁻²; M = mass of the central body (kg); r = orbital radius from its centre (m); v = orbital speed (m s⁻¹). Circular motion with gravity as the centripetal force — a satellite is simply falling around the planet rather than into it.</p>
<p><strong>T = 2 π √(r³ / (G M))</strong><br><em>Key:</em> T = orbital period (s); r = orbital radius (m); G = 6.67 × 10⁻¹¹ N m² kg⁻²; M = mass of the central body (kg). Kepler's third law, obtained by substituting v = 2πr/T into the equation above; r³/T² is the same for every satellite of the same body.</p>`,
  },
};

module.exports = { sections };
