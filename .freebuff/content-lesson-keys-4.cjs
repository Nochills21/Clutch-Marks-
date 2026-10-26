// Lesson inline symbol keys — batch 4 (23 lessons; 1fa2a57d is a table-attribute
// false positive and carries no relation to key). Each `find` is copied
// character-for-character from the dumped lesson body and must occur exactly
// once; `replace` is that same fragment with the key added inside its own
// container.
//
//   node .freebuff/apply-inline-keys.cjs .freebuff/content-lesson-keys-4.cjs
module.exports = {
  edits: {
    /* Physics OL — Energy, Work & Power */
    "1bd7a4d0-2866-45ef-a12d-3b3c631df386": [
      {
        find: "<li>KE = ½mv²; PE = mgh.</li>",
        replace:
          "<li>KE = ½mv²; PE = mgh. <em>Key:</em> KE = kinetic energy (J); m = mass (kg); v = speed (m s⁻¹); PE = change in gravitational potential energy (J); g = gravitational field strength (10 N kg⁻¹ on Earth); h = height gained (m).</li>",
      },
      {
        find: "<li>Work W = Fd (force along displacement, joules).</li>",
        replace:
          "<li>Work W = Fd (force along displacement, joules). <em>Key:</em> W = work done (J); F = the component of force along the motion (N); d = displacement in that direction (m) — a force at right angles to the motion does no work.</li>",
      },
      {
        find: "<li>Power P = W/t = E/t; P = Fv for constant speed.</li>",
        replace:
          "<li>Power P = W/t = E/t; P = Fv for constant speed. <em>Key:</em> P = power (W = J s⁻¹); W or E = work done or energy transferred (J); t = time taken (s); F = driving force (N); v = speed (m s⁻¹).</li>",
      },
      {
        find: "<p>Efficiency = useful output ÷ total input (×100%). Sankey diagrams show losses.</p>",
        replace:
          "<p>Efficiency = useful output ÷ total input (×100%). Sankey diagrams show losses. <em>Key:</em> efficiency is a ratio of two energies in the same unit (J), so it has no unit itself — multiply by 100 only to report a percentage, and it can never exceed 1 (100%).</p>",
      },
      {
        find: "<p>Equating KE loss to PE gain: v = √(2gh) for frictionless drop; braking distance grows with v².</p>",
        replace:
          "<p>Equating KE loss to PE gain: v = √(2gh) for frictionless drop; braking distance grows with v². <em>Key:</em> v = speed reached (m s⁻¹); g = gravitational field strength (10 N kg⁻¹); h = vertical drop (m) — mass cancels because it appears on both sides.</p>",
      },
    ],

    /* Physics OL — Forces & Motion */
    "954aa28b-2d7d-45a4-85bf-1fad78520c88": [
      {
        find: "<li>Speed = distance/time; average speed = (u + v)/2 for uniform acceleration.</li>",
        replace:
          "<li>Speed = distance/time; average speed = (u + v)/2 for uniform acceleration. <em>Key:</em> u = initial speed (m s⁻¹); v = final speed (m s⁻¹); time in s, distance in m — the averaging formula holds only when the acceleration is constant.</li>",
      },
      {
        find: "<li>Acceleration a = (v − u)/t.</li>",
        replace:
          "<li>Acceleration a = (v − u)/t. <em>Key:</em> a = acceleration (m s⁻²); v = final velocity; u = initial velocity (both m s⁻¹); t = time for the change (s) — a negative answer means deceleration, so keep the sign.</li>",
      },
      {
        find: "<li>SUVAT (uniform a): v = u + at; s = ut + ½at²; v² = u² + 2as.</li>",
        replace:
          "<li>SUVAT (uniform a): v = u + at; s = ut + ½at²; v² = u² + 2as. <em>Key:</em> s = displacement (m); u = initial velocity; v = final velocity (m s⁻¹); a = acceleration (m s⁻²); t = time (s) — each equation omits one of these, which is how you choose it.</li>",
      },
      {
        find: "<p>W = mg (g ≈ 10 N/kg). Weight acts at the centre of mass; mass is invariant. Density ρ = m/V.</p>",
        replace:
          "<p>W = mg (g ≈ 10 N/kg). Weight acts at the centre of mass; mass is invariant. Density ρ = m/V. <em>Key:</em> W = weight (N); m = mass (kg); g = gravitational field strength (N kg⁻¹); ρ = density (kg m⁻³); V = volume (m³).</p>",
      },
      {
        find: "<li>F = ma. Terminal velocity: drag grows with speed until it balances weight.</li>",
        replace:
          "<li>F = ma. Terminal velocity: drag grows with speed until it balances weight. <em>Key:</em> F = resultant force (N); m = mass (kg); a = acceleration (m s⁻²) — F is the sum of all forces, not any single one, and at terminal velocity F = 0 so a = 0.</li>",
      },
      {
        find: "<p>p = mv; impulse Ft = Δ(mv); conservation: Σp<sub>before</sub> = Σp<sub>after</sub> (explosions, collisions).</p>",
        replace:
          "<p>p = mv; impulse Ft = Δ(mv); conservation: Σp<sub>before</sub> = Σp<sub>after</sub> (explosions, collisions). <em>Key:</em> p = momentum (kg m s⁻¹); m = mass (kg); v = velocity (m s⁻¹, sign matters); F = force (N); t = time the force acts (s); Δ means \"change in\"; Σ means \"sum of\" over every object.</p>",
      },
      {
        find: "<li>Moment = F × perpendicular distance from pivot.</li>",
        replace:
          "<li>Moment = F × perpendicular distance from pivot. <em>Key:</em> moment = turning effect (N m); F = force (N); the distance is measured perpendicular to the force's line of action, from the pivot — not along the lever.</li>",
      },
    ],

    /* Physics OL — Magnetism & Electromagnetism */
    "e74e5298-d5ad-4563-abe7-c8da8cb0041e": [
      {
        find: "speed/torque ↑ with current, field strength, turns/area.</p>",
        replace:
          "speed/torque ↑ with current, field strength, turns/area. <em>Key:</em> F = force on the wire (N); B = magnetic flux density (T); I = current (A); L = length of wire inside the field (m) — the motor turns because each side of the coil carries current in the opposite direction, so the two forces form a couple.</p>",
      },
    ],

    /* Physics OL — Pressure & Density */
    "8ad0dedf-b507-4ee6-8ded-7286e0e3898d": [
      {
        find: "<p>p = F/A (Pa = N/m²). Increase F or decrease A to raise pressure; explain applications (snowshoes, knives, hydraulic press).</p>",
        replace:
          "<p>p = F/A (Pa = N/m²). Increase F or decrease A to raise pressure; explain applications (snowshoes, knives, hydraulic press). <em>Key:</em> p = pressure (Pa = N m⁻²); F = force acting perpendicular to the surface (N); A = area over which it acts (m²).</p>",
      },
      {
        find: "<li>Pressure increases with depth: p = ρgh (Extended).</li>",
        replace:
          "<li>Pressure increases with depth: p = ρgh (Extended). <em>Key:</em> p = pressure due to the liquid (Pa); ρ = density of the liquid (kg m⁻³); g = gravitational field strength (10 N kg⁻¹); h = vertical depth below the surface (m) — the shape of the container does not appear, so it does not matter.</li>",
      },
      {
        find: "<p>ρ = m/V; floating condition; upthrust = weight of displaced fluid (qualitative).</p>",
        replace:
          "<p>ρ = m/V; floating condition; upthrust = weight of displaced fluid (qualitative). <em>Key:</em> ρ = density (kg m⁻³); m = mass (kg); V = volume (m³); an object floats when its own density is less than the fluid's, because the upthrust then equals its weight before it is fully submerged.</p>",
      },
    ],

    /* Physics OL — Thermal Physics */
    "912b7efa-f45a-4664-b2ab-f40181c9252d": [
      {
        find: "<p>c = ΔE/(mΔθ). Heating: ΔE = mcΔθ.</p>",
        replace:
          "<p>c = ΔE/(mΔθ). Heating: ΔE = mcΔθ. <em>Key:</em> ΔE = energy supplied (J); m = mass (kg); c = specific heat capacity (J kg⁻¹ °C⁻¹); Δθ = temperature rise (°C or K — a difference is the same in both).</p>",
      },
      {
        find: "<p>High c of water → coolant; temperature rise measured with known heater power P in time t: c = Pt/(mΔθ).</p>",
        replace:
          "<p>High c of water → coolant; temperature rise measured with known heater power P in time t: c = Pt/(mΔθ). <em>Key:</em> P = heater power (W = J s⁻¹); t = heating time (s), so Pt is the energy supplied (J); m = mass of the sample (kg); Δθ = its temperature rise (°C).</p>",
      },
    ],

    /* Physics OL — Waves & Sound */
    "d0bc346b-ac46-435a-869c-eacb65a1fdb4": [
      {
        find: "Amplitude, wavelength, frequency f = 1/T; wavefront diagrams.</p>",
        replace:
          "Amplitude, wavelength, frequency f = 1/T; wavefront diagrams. <em>Key:</em> v = wave speed (m s⁻¹); f = frequency (Hz); λ = wavelength (m); T = period, the time for one complete oscillation (s) — the medium sets v, the source sets f, and λ follows from v = fλ.</p>",
      },
      {
        find: "<p>Distance = (v × t)/2 (there and back).</p>",
        replace:
          "<p>Distance = (v × t)/2 (there and back). <em>Key:</em> distance = one-way distance to the reflector (m); v = speed of the pulse in the medium (m s⁻¹, 340 for sound in air); t = total time between sending and hearing the echo (s); dividing by 2 is what makes it one-way.</p>",
      },
    ],

    /* Physics AS — Dynamics */
    "e01c658f-53f1-4d39-9476-eed0e60af55f": [
      {
        find: "<li>F = ma — the resultant force equals mass × acceleration.</li>",
        replace:
          "<li>F = ma — the resultant force equals mass × acceleration. <em>Key:</em> F = resultant force (N); m = mass (kg); a = acceleration (m s⁻²), in the same direction as F — resolve forces before applying it.</li>",
      },
      {
        find: "<p>Weight W = mg — a force in newtons; mass in kg is invariant. A 70 kg person weighs about 687 N.</p>",
        replace:
          "<p>Weight W = mg — a force in newtons; mass in kg is invariant. A 70 kg person weighs about 687 N. <em>Key:</em> W = weight (N); m = mass (kg); g = gravitational field strength (9.81 N kg⁻¹ on Earth) — g is the same number as the free-fall acceleration, which is why W = mg and F = ma agree.</p>",
      },
      {
        find: "<p>p = mv (vector, kg m s⁻¹). Resultant force = rate of change of momentum: F = Δp/Δt.</p>",
        replace:
          "<p>p = mv (vector, kg m s⁻¹). Resultant force = rate of change of momentum: F = Δp/Δt. <em>Key:</em> p = momentum; m = mass (kg); v = velocity (m s⁻¹); Δp = change in momentum (kg m s⁻¹); Δt = time over which it changes (s) — this form of Newton's second law still holds when the mass changes.</p>",
      },
    ],

    /* Physics AS — Electricity: D.C. Circuits */
    "a172289d-64da-4005-a868-fa221a15f97c": [
      {
        find: "Conventional current flows + to − (electrons drift the other way).</p>",
        replace:
          "Conventional current flows + to − (electrons drift the other way). <em>Key:</em> I = current (A); Q = charge passing a point (C); t = time (s) — one ampere is one coulomb per second.</p>",
      },
      {
        find: "<li>V = W/Q (joules per coulomb)</li>",
        replace:
          "<li>V = W/Q (joules per coulomb) <em>Key:</em> V = potential difference across the component (V); W = work done on the charge, i.e. energy transferred (J); Q = charge moved (C).</li>",
      },
      {
        find: "<li>P = VI = I²R = V²/R</li>",
        replace:
          "<li>P = VI = I²R = V²/R <em>Key:</em> P = power dissipated (W); V = potential difference across the component (V); I = current through it (A); R = its resistance (Ω) — use V²/R when the voltage is fixed and I²R when the current is.</li>",
      },
      {
        find: "Metals' resistance rises with temperature; thermistors' falls (NTC).</p>",
        replace:
          "Metals' resistance rises with temperature; thermistors' falls (NTC). <em>Key:</em> R = resistance (Ω); V = potential difference (V); I = current (A); ρ = resistivity (Ω m), a property of the material alone; L = length of the conductor (m); A = its cross-sectional area (m²).</p>",
      },
      {
        find: "<p>ε = I(R + r) — some voltage is 'lost' inside the battery. Terminal voltage V = ε − Ir drops as load current rises.</p>",
        replace:
          "<p>ε = I(R + r) — some voltage is 'lost' inside the battery. Terminal voltage V = ε − Ir drops as load current rises. <em>Key:</em> ε = electromotive force of the source (V); I = current (A); R = external resistance (Ω); r = internal resistance (Ω); V = terminal p.d. across the external circuit (V).</p>",
      },
      {
        find: "<p>V_out = V_in × R₂/(R₁ + R₂). Used with LDRs/thermistors to make sensor circuits.</p>",
        replace:
          "<p>V_out = V_in × R₂/(R₁ + R₂). Used with LDRs/thermistors to make sensor circuits. <em>Key:</em> V_in = supply p.d. (V); V_out = p.d. across R₂ only (V); R₁ and R₂ = the two resistors of the potential divider (Ω) — swapping which one is the sensor inverts the response.</p>",
      },
    ],

    /* Physics AS — Forces and Equilibrium */
    "f7d071f2-beb1-4750-8fbb-6046e7314053": [
      {
        find: "<p>Moment = force × perpendicular distance from the pivot.</p>",
        replace:
          "<p>Moment = force × perpendicular distance from the pivot. <em>Key:</em> moment = turning effect of the force (N m); force in N; the distance in m is measured at 90° to the force's line of action.</p>",
      },
      {
        find: "<p>For equilibrium: Σ clockwise moments = Σ anticlockwise moments.</p>",
        replace:
          "<p>For equilibrium: Σ clockwise moments = Σ anticlockwise moments. <em>Key:</em> Σ = sum over every force; each moment is force × perpendicular distance (N m); equilibrium also needs the forces themselves to cancel, so the body has no resultant force and no resultant turning effect.</p>",
      },
    ],

    /* Physics AS — Kinematics */
    "6990ef53-4641-4e0c-8e64-6ec737c63b6a": [
      {
        find: "<li><strong>Velocity</strong> v: rate of change of displacement, v = ds/dt</li>",
        replace:
          "<li><strong>Velocity</strong> v: rate of change of displacement, v = ds/dt <em>Key:</em> s = displacement (m, signed); t = time (s); ds/dt = the gradient of the displacement–time graph, so v is in m s⁻¹.</li>",
      },
      {
        find: "<li><strong>Acceleration</strong> a: rate of change of velocity, a = dv/dt</li>",
        replace:
          "<li><strong>Acceleration</strong> a: rate of change of velocity, a = dv/dt <em>Key:</em> v = velocity (m s⁻¹); t = time (s); a is in m s⁻² and is the gradient of the velocity–time graph.</li>",
      },
      {
        find: "range = uₓ × t ≈ 35 m.</p>",
        replace:
          "range = uₓ × t ≈ 35 m. <em>Key:</em> u = initial speed (m s⁻¹); uₓ and u_y = its horizontal and vertical components (m s⁻¹), found with cos and sin of the launch angle; g = 9.81 m s⁻²; t = time of flight (s) — horizontal and vertical motion are solved separately.</p>",
      },
    ],

    /* Physics AS — Materials: Deformation */
    "12685663-b843-4c03-8178-87c9e379e552": [
      {
        find: "<p>Up to the limit of proportionality, F = kx — extension is proportional to load. k is the spring constant (N m⁻¹).</p>",
        replace:
          "<p>Up to the limit of proportionality, F = kx — extension is proportional to load. k is the spring constant (N m⁻¹). <em>Key:</em> F = applied load (N); x = extension from natural length (m); k = stiffness of that particular spring (N m⁻¹) — beyond the limit of proportionality the line bends, so the formula no longer applies.</p>",
      },
      {
        find: "<li><strong>Young modulus E = σ/ε</strong> (Pa) — a material property, independent of shape</li>",
        replace:
          "<li><strong>Young modulus E = σ/ε</strong> (Pa) — a material property, independent of shape <em>Key:</em> σ = tensile stress = F/A (Pa); ε = tensile strain = x/L (no unit); F = load (N); A = cross-sectional area (m²); x = extension (m); L = original length (m) — because strain has no unit, E has the unit of stress.</li>",
      },
      {
        find: "<li>Area under graph = elastic PE stored = ½Fx (for linear) = ½kx²</li>",
        replace:
          "<li>Area under graph = elastic PE stored = ½Fx (for linear) = ½kx² <em>Key:</em> elastic PE in J; F = the load at that extension (N); x = extension (m); k = spring constant (N m⁻¹) — the ½ comes from the area of the triangle under a straight force–extension line.</li>",
      },
    ],

    /* Physics AS — Quantum Physics */
    "6d58aa9d-0d15-4005-8b94-d6d7186d7725": [
      {
        find: "<p>E = hf = hc/λ, h = 6.63 × 10⁻³⁴ J s.</p>",
        replace:
          "<p>E = hf = hc/λ, h = 6.63 × 10⁻³⁴ J s. <em>Key:</em> E = energy of one photon (J); h = Planck constant (J s); f = frequency (Hz); c = speed of light (3 × 10⁸ m s⁻¹); λ = wavelength (m).</p>",
      },
      {
        find: "<li>Einstein: hf = φ + KE_max (φ = work function)</li>",
        replace:
          "<li>Einstein: hf = φ + KE_max (φ = work function) <em>Key:</em> hf = photon energy (J); φ = work function, the minimum energy needed to free an electron from that metal (J); KE_max = maximum kinetic energy of an emitted electron (J) — no emission at all if hf is below φ, whatever the intensity.</li>",
      },
      {
        find: "<li>KE_max = eV_s (stopping potential)</li>",
        replace:
          "<li>KE_max = eV_s (stopping potential) <em>Key:</em> e = elementary charge (1.6 × 10⁻¹⁹ C); V_s = stopping potential, the reverse p.d. that just stops the fastest electrons (V); eV_s is therefore in joules.</li>",
      },
      {
        find: "<p>de Broglie: λ = h/p = h/(mv).",
        replace:
          "<p>de Broglie: λ = h/p = h/(mv). <em>Key:</em> λ = de Broglie wavelength of the particle (m); h = Planck constant (J s); p = momentum (kg m s⁻¹); m = mass (kg); v = speed (m s⁻¹) — heavier and faster particles have shorter wavelengths.",
      },
    ],

    /* Physics AS — Superposition */
    "9fdbac75-9baa-467c-91d6-c8b871c2ed85": [
      {
        find: "<p>Two sources are coherent if they share frequency and constant phase difference. Maxima occur where path difference = nλ; minima where it = (n + ½)λ.</p>",
        replace:
          "<p>Two sources are coherent if they share frequency and constant phase difference. Maxima occur where path difference = nλ; minima where it = (n + ½)λ. <em>Key:</em> n = any whole number (0, 1, 2 …), the order of the fringe; λ = wavelength (m); path difference = the extra distance one wave travels (m) — a whole number of wavelengths arrives in phase.</p>",
      },
      {
        find: "<p>Fringe spacing x = λD/a (D = slit–screen distance, a = slit separation).</p>",
        replace:
          "<p>Fringe spacing x = λD/a (D = slit–screen distance, a = slit separation). <em>Key:</em> x = distance between adjacent bright fringes (m); λ = wavelength (m); D = distance from the slits to the screen (m); a = separation of the two slits (m) — move the screen further away and the fringes spread out.</p>",
      },
    ],

    /* Physics AS — Waves */
    "976e16ef-816a-40a1-92c2-5238d5b5ab78": [
      {
        find: "<p>v = fλ. Frequency f is set by the source; speed v by the medium.</p>",
        replace:
          "<p>v = fλ. Frequency f is set by the source; speed v by the medium. <em>Key:</em> v = wave speed (m s⁻¹); f = frequency (Hz); λ = wavelength (m) — a wave crossing into another medium keeps f and changes v, so λ must change with it.</p>",
      },
      {
        find: "<p>I = P/A. Intensity ∝ amplitude² — doubling the amplitude quadruples the intensity.</p>",
        replace:
          "<p>I = P/A. Intensity ∝ amplitude² — doubling the amplitude quadruples the intensity. <em>Key:</em> I = intensity (W m⁻²); P = power carried by the wave (W); A = area the wave passes through (m²), taken perpendicular to the direction of travel.</p>",
      },
      {
        find: "<p>Only transverse waves can be polarised — proof that light is transverse. Malus' law: I = I₀ cos²θ between polariser axes.</p>",
        replace:
          "<p>Only transverse waves can be polarised — proof that light is transverse. Malus' law: I = I₀ cos²θ between polariser axes. <em>Key:</em> I = transmitted intensity (W m⁻²); I₀ = intensity after the first polariser; θ = angle between the two polarising axes (°) — at 90° nothing gets through, which is how glare is cut.</p>",
      },
    ],

    /* Physics AS — Work, Energy and Power */
    "400dc27f-18d2-4df3-a147-b6273b714eb0": [
      {
        find: "<p>W = Fs cos θ — force × displacement in the force's direction. Unit: joule (J).</p>",
        replace:
          "<p>W = Fs cos θ — force × displacement in the force's direction. Unit: joule (J). <em>Key:</em> W = work done (J); F = magnitude of the force (N); s = displacement (m); θ = angle between the force and the displacement — at 90° the cosine is 0 and the force does no work.</p>",
      },
      {
        find: "<li>Kinetic energy: Ek = ½mv²</li>",
        replace:
          "<li>Kinetic energy: Ek = ½mv², in joules <em>Key:</em> m = mass (kg); v = speed (m s⁻¹) — v is squared, so doubling the speed quadruples the energy and the braking distance.</li>",
      },
      {
        find: "<li>Gravitational PE: Ep = mgh</li>",
        replace:
          "<li>Gravitational PE: Ep = mgh, in joules <em>Key:</em> m = mass (kg); g = 9.81 N kg⁻¹; h = height gained above the chosen zero level (m) — the zero level is arbitrary, so only changes matter.</li>",
      },
      {
        find: "<p>P = W/t = Fv. Unit: watt (W = J s⁻¹).</p>",
        replace:
          "<p>P = W/t = Fv. Unit: watt (W = J s⁻¹). <em>Key:</em> P = power (W); W = work done (J); t = time (s); F = driving force (N); v = speed (m s⁻¹) — P = Fv applies when the force is along the motion.</p>",
      },
      {
        find: "<p>Efficiency = useful output / total input × 100%.</p>",
        replace:
          "<p>Efficiency = useful output / total input × 100%. <em>Key:</em> both energies in the same unit (J), so efficiency has no unit; ×100 is only to report it as a percentage, and it can never exceed 100%.</p>",
      },
    ],

    /* Physics A2 — Astronomy and Cosmology */
    "86a02849-22ff-4c3f-8a7b-55994c71a97d": [
      {
        find: "<p>Luminosity L is total power radiated (W). Intensity at distance d: I = L/(4πd²) — the key to distances.</p>",
        replace:
          "<p>Luminosity L is total power radiated (W). Intensity at distance d: I = L/(4πd²) — the key to distances. <em>Key:</em> I = intensity received (W m⁻²); L = luminosity of the star (W); d = distance from the star (m); 4πd² is the surface area of the sphere the light has spread over.</p>",
      },
      {
        find: "<li>Wien: λ_max T = 2.9 × 10⁻³ m K — hotter stars are bluer</li>",
        replace:
          "<li>Wien: λ_max T = 2.9 × 10⁻³ m K — hotter stars are bluer <em>Key:</em> λ_max = wavelength of peak emission (m); T = surface temperature (K); the constant 2.9 × 10⁻³ has unit m K, so λ_max and T are inversely proportional.</li>",
      },
      {
        find: "<li>Stefan: L = σAT⁴, σ = 5.67 × 10⁻⁸</li>",
        replace:
          "<li>Stefan: L = σAT⁴, σ = 5.67 × 10⁻⁸ <em>Key:</em> L = luminosity (W); σ = Stefan–Boltzmann constant (5.67 × 10⁻⁸ W m⁻² K⁻⁴); A = surface area of the star (m²), 4πr² for a sphere; T = surface temperature (K) — the fourth power is why temperature dominates.</li>",
      },
      {
        find: "<p>Galaxies recede with v = Hd, H₀ ≈ 2.2 × 10⁻¹⁸ s⁻¹. Redshift z = Δλ/λ ≈ v/c for small z.</p>",
        replace:
          "<p>Galaxies recede with v = Hd, H₀ ≈ 2.2 × 10⁻¹⁸ s⁻¹. Redshift z = Δλ/λ ≈ v/c for small z. <em>Key:</em> v = recessional speed (m s⁻¹); H₀ = Hubble constant (s⁻¹); d = distance to the galaxy (m); z = redshift, a ratio with no unit; Δλ = observed minus emitted wavelength (m); λ = emitted wavelength (m); c = speed of light (3 × 10⁸ m s⁻¹).</p>",
      },
    ],

    /* Physics A2 — Circular Motion and SHM */
    "34d57f77-3b97-47be-b6a7-23ff6a01529e": [
      {
        find: "<p>Angular speed ω = 2π/T; v = ωr; a = ω²r = v²/r; F = mv²/r toward the centre.</p>",
        replace:
          "<p>Angular speed ω = 2π/T; v = ωr; a = ω²r = v²/r; F = mv²/r toward the centre. <em>Key:</em> ω = angular speed (rad s⁻¹); T = period of one revolution (s); r = radius of the circle (m); v = speed along the path (m s⁻¹); a = centripetal acceleration (m s⁻²); F = centripetal force (N); m = mass (kg).</p>",
      },
      {
        find: "<p>Acceleration is proportional to displacement and opposite: a = −ω²x.</p>",
        replace:
          "<p>Acceleration is proportional to displacement and opposite: a = −ω²x. <em>Key:</em> a = acceleration (m s⁻²); ω = angular frequency (rad s⁻¹); x = displacement from the equilibrium position (m) — the minus sign is the definition of SHM and is what examiners award the mark for.</p>",
      },
      {
        find: "<p>E = ½mω²x₀² total (constant), exchanged between KE (max at centre) and PE (max at extremes).</p>",
        replace:
          "<p>E = ½mω²x₀² total (constant), exchanged between KE (max at centre) and PE (max at extremes). <em>Key:</em> E = total energy of the oscillator (J); m = mass (kg); ω = angular frequency (rad s⁻¹); x₀ = amplitude, the maximum displacement (m).</p>",
      },
    ],

    /* Physics A2 — Electric Fields and Capacitance */
    "6ad8fc19-951c-4ac5-8852-eec4eab98eae": [
      {
        find: "<p>F = q₁q₂/(4πε₀r²). Field strength E = F/q (N C⁻¹); for a point charge E = q/(4πε₀r²).</p>",
        replace:
          "<p>F = q₁q₂/(4πε₀r²). Field strength E = F/q (N C⁻¹); for a point charge E = q/(4πε₀r²). <em>Key:</em> F = force between the charges (N); q₁, q₂ = the two charges (C); ε₀ = permittivity of free space (8.85 × 10⁻¹² F m⁻¹); r = separation (m); E = field strength (N C⁻¹); q = the charge feeling the force (C) — like charges repel, so keep the signs.</p>",
      },
      {
        find: "<p>Between parallel plates: E = V/d, constant.</p>",
        replace:
          "<p>Between parallel plates: E = V/d, constant. <em>Key:</em> E = uniform field strength between the plates (V m⁻¹, the same as N C⁻¹); V = potential difference across them (V); d = plate separation (m) — the field is uniform, so the force on a charge is the same everywhere between them.</p>",
      },
      {
        find: "<p>C = Q/V (farads). Energy stored: W = ½QV = ½CV².</p>",
        replace:
          "<p>C = Q/V (farads). Energy stored: W = ½QV = ½CV². <em>Key:</em> C = capacitance (F); Q = charge stored on one plate (C); V = p.d. across the capacitor (V); W = energy stored (J) — the ½ is there because the voltage rises from zero as the charge is added.</p>",
      },
      {
        find: "<p>Exponential: V = V₀ e^(−t/RC). Time constant RC: after one RC, V falls to 37%. Half-life t½ = 0.69 RC.</p>",
        replace:
          "<p>Exponential: V = V₀ e^(−t/RC). Time constant RC: after one RC, V falls to 37%. Half-life t½ = 0.69 RC. <em>Key:</em> V = p.d. at time t (V); V₀ = initial p.d. (V); R = resistance in the discharge path (Ω); C = capacitance (F); t = time since discharge began (s); RC = time constant (s); e = 2.718; 0.69 = ln 2.</p>",
      },
    ],

    /* Physics A2 — Magnetic Fields and Electromagnetism */
    "d02d042d-7eb0-432c-9b92-a65a264966bf": [
      {
        find: "<p>F = BIL sin θ (Fleming's left hand: field-index, current-first-finger, force-thumb).</p>",
        replace:
          "<p>F = BIL sin θ (Fleming's left hand: field-index, current-first-finger, force-thumb). <em>Key:</em> F = force on the wire (N); B = flux density (T); I = current (A); L = length of wire in the field (m); θ = angle between the wire and the field — the force is maximum at 90° and zero when the wire lies along the field.</p>",
      },
      {
        find: "<p>F = BQv sin θ, always perpendicular to v → circular paths: r = mv/(BQ) (basis of cyclotrons and mass spectrometers).</p>",
        replace:
          "<p>F = BQv sin θ, always perpendicular to v → circular paths: r = mv/(BQ) (basis of cyclotrons and mass spectrometers). <em>Key:</em> F = magnetic force (N); B = flux density (T); Q = charge of the particle (C); v = its speed (m s⁻¹); θ = angle between v and B; m = mass (kg); r = radius of the circular path (m) — the force does no work, so the speed stays constant and only the direction turns.</p>",
      },
      {
        find: "<li>Long straight wire: B = μ₀I/(2πr), circling by the right-hand grip rule</li>",
        replace:
          "<li>Long straight wire: B = μ₀I/(2πr), circling by the right-hand grip rule <em>Key:</em> B = flux density at distance r (T); μ₀ = permeability of free space (4π × 10⁻⁷ H m⁻¹); I = current (A); r = perpendicular distance from the wire (m) — the field falls off as 1/r and circles the wire.</li>",
      },
      {
        find: "<li>Solenoid: B = μ₀nI inside</li>",
        replace:
          "<li>Solenoid: B = μ₀nI inside <em>Key:</em> B = flux density inside the solenoid (T); μ₀ = 4π × 10⁻⁷ H m⁻¹; n = turns per metre of length (m⁻¹); I = current (A) — the field is uniform inside and weak outside.</li>",
      },
      {
        find: "<p>Faraday: induced EMF = rate of flux cutting = N dΦ/dt. Lenz: induced effects oppose the change (negative sign).</p>",
        replace:
          "<p>Faraday: induced EMF = rate of flux cutting = N dΦ/dt. Lenz: induced effects oppose the change (negative sign). <em>Key:</em> EMF = induced p.d. (V); N = number of turns in the coil; Φ = magnetic flux through one turn (Wb); dΦ/dt = rate of change of that flux (Wb s⁻¹); the minus sign of Lenz's law says the induced current opposes whatever changed the flux.</p>",
      },
    ],

    /* Physics A2 — Motion in a Circle and Gravity */
    "f78e91ca-bc85-427e-b271-3fed790ef350": [
      {
        find: "<p>Angular speed ω = v/r = 2π/T (rad s⁻¹). Centripetal acceleration a = v²/r = ω²r, always directed to the centre; centripetal force F = mv²/r.</p>",
        replace:
          "<p>Angular speed ω = v/r = 2π/T (rad s⁻¹). Centripetal acceleration a = v²/r = ω²r, always directed to the centre; centripetal force F = mv²/r. <em>Key:</em> ω = angular speed (rad s⁻¹); v = speed (m s⁻¹); r = radius (m); T = period (s); a = centripetal acceleration (m s⁻²); F = centripetal force (N); m = mass (kg) — the force is not a new kind of force but whatever supplies it (tension, gravity, friction).</p>",
      },
      {
        find: "<p>Newton's law: F = Gm₁m₂/r², G = 6.67 × 10⁻¹¹ N m² kg⁻².</p>",
        replace:
          "<p>Newton's law: F = Gm₁m₂/r², G = 6.67 × 10⁻¹¹ N m² kg⁻². <em>Key:</em> F = gravitational force between the masses (N); G = gravitational constant; m₁, m₂ = the two masses (kg); r = distance between their centres (m) — the force is always attractive and equal on both bodies.</p>",
      },
      {
        find: "<p>Field strength g = GM/r². At Earth's surface g ≈ 9.81 N kg⁻¹.</p>",
        replace:
          "<p>Field strength g = GM/r². At Earth's surface g ≈ 9.81 N kg⁻¹. <em>Key:</em> g = gravitational field strength (N kg⁻¹ = m s⁻²); G = 6.67 × 10⁻¹¹ N m² kg⁻²; M = mass of the body creating the field (kg); r = distance from its centre (m) — g falls with the square of the distance, so it is not constant for satellites.</p>",
      },
      {
        find: "<p>Gravitational potential φ = −GM/r (zero at infinity). Potential gradient gives field strength: g = −dφ/dr.</p>",
        replace:
          "<p>Gravitational potential φ = −GM/r (zero at infinity). Potential gradient gives field strength: g = −dφ/dr. <em>Key:</em> φ = gravitational potential (J kg⁻¹); G = 6.67 × 10⁻¹¹ N m² kg⁻²; M = mass (kg); r = distance from the centre (m); the potential is negative everywhere and rises towards zero as r grows, which is why g carries the minus sign.</p>",
      },
    ],

    /* Physics A2 — Nuclear Physics */
    "525747d5-08cc-430d-ab13-40fa5936390f": [
      {
        find: "<p><strong>Half-life:</strong> time for half the nuclei to decay. N = N₀ e^(−λt), λ = ln 2 / t½.</p>",
        replace:
          "<p><strong>Half-life:</strong> time for half the nuclei to decay. N = N₀ e^(−λt), λ = ln 2 / t½. <em>Key:</em> N = nuclei remaining after time t; N₀ = nuclei present at the start; λ = decay constant (s⁻¹), the probability per second that any one nucleus decays; t = elapsed time (s); t½ = half-life (s); ln 2 = 0.693.</p>",
      },
      {
        find: "<p>E = mc². Mass difference Δm in nuclear reactions becomes energy; binding energy = energy released assembling the nucleus. 1 u ≈ 931 MeV.</p>",
        replace:
          "<p>E = mc². Mass difference Δm in nuclear reactions becomes energy; binding energy = energy released assembling the nucleus. 1 u ≈ 931 MeV. <em>Key:</em> E = energy released (J); m = the mass that disappears (kg); c = speed of light (3 × 10⁸ m s⁻¹); Δm = mass of the separate nucleons minus the mass of the nucleus (kg); binding energy per nucleon peaks near iron, which is why both fission and fusion release energy.</p>",
      },
    ],

    /* Physics A2 — Oscillations and Waves II */
    "6eb125ef-0751-40e0-9a28-34f9bcef28c2": [
      {
        find: "<li>Young's double slit: x = λD/a — evidence light is a wave</li>",
        replace:
          "<li>Young's double slit: x = λD/a — evidence light is a wave <em>Key:</em> x = fringe spacing (m); λ = wavelength (m); D = slit-to-screen distance (m); a = slit separation (m) — interference cannot be explained by particles travelling in straight lines, so it is the wave evidence.</li>",
      },
      {
        find: "<p>Polaroid sunglasses cut glare from horizontal surfaces; stress analysis in plastics; LCD screens control light with twisted polarizers. Malus' law I = I₀cos²θ.</p>",
        replace:
          "<p>Polaroid sunglasses cut glare from horizontal surfaces; stress analysis in plastics; LCD screens control light with twisted polarizers. Malus' law I = I₀cos²θ. <em>Key:</em> I = intensity after the analyser (W m⁻²); I₀ = intensity reaching it; θ = angle between the polarising directions (°) — at 90° the cosine is zero and the light is blocked.</p>",
      },
    ],

    /* Physics A2 — Thermal Physics */
    "caf9cbe6-4b6b-4d5b-9cf0-d3bbe37d54c2": [
      {
        find: "<li>Heating: Q = mcΔθ (c = specific heat capacity)</li>",
        replace:
          "<li>Heating: Q = mcΔθ (c = specific heat capacity) <em>Key:</em> Q = heat energy added (J); m = mass (kg); c = energy needed to raise 1 kg by 1 K (J kg⁻¹ K⁻¹); Δθ = temperature rise (K) — no phase change happens while this applies.</li>",
      },
      {
        find: "<li>Phase change: Q = mL (L = specific latent heat)</li>",
        replace:
          "<li>Phase change: Q = mL (L = specific latent heat) <em>Key:</em> Q = energy needed to change state (J); m = mass changing state (kg); L = energy per kilogram for that change (J kg⁻¹) — temperature stays constant throughout, which is what distinguishes it from Q = mcΔθ.</li>",
      },
      {
        find: "<li>Combined/ideal: pV = nRT, R = 8.31 J K⁻¹ mol⁻¹</li>",
        replace:
          "<li>Combined/ideal: pV = nRT, R = 8.31 J K⁻¹ mol⁻¹ <em>Key:</em> p = pressure (Pa); V = volume (m³); n = amount of gas (mol); R = molar gas constant (8.31 J mol⁻¹ K⁻¹); T = thermodynamic temperature (K) — T must be in kelvin, never °C.</li>",
      },
      {
        find: "<p>½m⟨c²⟩ = (3/2)kT — temperature measures mean translational KE. Also pV = ⅓Nm⟨c²⟩.</p>",
        replace:
          "<p>½m⟨c²⟩ = (3/2)kT — temperature measures mean translational KE. Also pV = ⅓Nm⟨c²⟩. <em>Key:</em> m = mass of one molecule (kg); ⟨c²⟩ = mean square speed of the molecules (m² s⁻²); k = Boltzmann constant (1.38 × 10⁻²³ J K⁻¹); T = temperature (K); N = number of molecules; p and V are pressure (Pa) and volume (m³).</p>",
      },
    ],
  },
};
