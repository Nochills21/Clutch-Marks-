// A2 Physics (CAIE 9702) — 8 topics. Questions use 0-based `correct`.
// lesson strings carry REAL newlines (JSON.stringify with escape=false is unsafe; kept as data, seeder writes via dollar-quoting).
module.exports = [
  {
    name: "Circular Motion and SHM",
    description: "Angular speed, centripetal force, simple harmonic motion, energy in oscillators and damping.",
    lesson: `# Circular Motion and SHM

### Circular Motion Recap
Angular speed ω = 2π/T; v = ωr; a = ω²r = v²/r; F = mv²/r toward the centre.

### Simple Harmonic Motion
Acceleration is proportional to displacement and opposite: a = −ω²x.

Solutions: x = x₀ sin ωt (start at centre) or x = x₀ cos ωt (start at extreme), with ω = 2πf.

**Velocity and acceleration:**
- v_max = ωx₀ at the centre
- a_max = ω²x₀ at the extremes

**Example:** a pendulum with x₀ = 0.02 m, f = 0.5 Hz has a_max = (2π × 0.5)² × 0.02 ≈ 0.20 m s⁻².

### Energy in SHM
E = ½mω²x₀² total (constant), exchanged between KE (max at centre) and PE (max at extremes).

### Damping and Resonance
Damping removes energy: light damping → slow decay; critical → fastest return without oscillation. Resonance: driving at the natural frequency gives maximum amplitude (microwave ovens, swing pushing, bridge disasters).

**Exam tips:** quote a = −ω²x as the defining condition; time period questions often need only T = 2π/ω.`,
    questions: [
      { q: "SHM requires acceleration:", opts: ["proportional to v","zero at the centre","proportional to x, opposite in direction","constant"], correct: 2, explain: "a = −ω²x is the defining relation." },
      { q: "Maximum speed in SHM equals:", opts: ["ωx₀²","ωx₀","ω²x₀","x₀/ω"], correct: 1, explain: "At the equilibrium position." },
      { q: "A pendulum with x₀ = 0.02 m, f = 0.5 Hz has a_max about:", opts: ["0.20 m s⁻²","0.02 m s⁻²","0.5 m s⁻²","2 m s⁻²"], correct: 0, explain: "ω²x₀ = π² × 0.02." },
      { q: "In SHM, KE is maximum:", opts: ["at the centre","everywhere equal","at t = 0 only","at the extremes"], correct: 0, explain: "Speed peaks at the equilibrium position." },
      { q: "Resonance occurs when driving frequency equals:", opts: ["zero","any frequency","natural frequency","twice natural frequency"], correct: 2, explain: "Maximum amplitude at the natural frequency." },
      { q: "Critical damping returns a system to equilibrium:", opts: ["after one full cycle","slowly with oscillation","fastest without oscillation","never"], correct: 2, explain: "Definition of critical damping." },
      { q: "The total energy of an undamped oscillator is:", opts: ["½mω²x₀²","½mω²x","mgh","zero"], correct: 0, explain: "Set by the amplitude." },
      { q: "Angular speed for period 2 s is:", opts: ["2π rad s⁻¹","0.5 rad s⁻¹","4π rad s⁻¹","π rad s⁻¹"], correct: 3, explain: "ω = 2π/T." },
      { q: "At the extremes of SHM:", opts: ["both zero","both maximum","v = 0, a is maximum","v max, a zero"], correct: 2, explain: "Turning points of the motion." },
      { q: "Doubling the amplitude of an oscillator multiplies total energy by:", opts: ["√2","4","2","8"], correct: 1, explain: "E ∝ x₀²." },
    ],
  },
  {
    name: "Thermal Physics",
    description: "Internal energy, specific heat and latent heat, gas laws and kinetic theory.",
    lesson: `# Thermal Physics

### Internal Energy
Sum of random kinetic + potential energies of molecules. Temperature rise → KE up; phase change → PE up (bonds stretch) at constant temperature.

### Specific Heat and Latent Heat
- Heating: Q = mcΔθ (c = specific heat capacity)
- Phase change: Q = mL (L = specific latent heat)

**Example:** melting 0.2 kg ice: Q = 0.2 × 334,000 ≈ 67 kJ — no temperature change during the change.

Mixtures: heat lost = heat gained.

### Gas Laws
- Boyle: pV = constant (T fixed)
- Charles: V/T = constant (p fixed)
- Pressure law: p/T = constant (V fixed)
- Combined/ideal: pV = nRT, R = 8.31 J K⁻¹ mol⁻¹

**Example:** 2 mol at 300 K in 0.05 m³: p = nRT/V = 2 × 8.31 × 300/0.05 ≈ 100 kPa.

### Kinetic Theory
½m⟨c²⟩ = (3/2)kT — temperature measures mean translational KE. Also pV = ⅓Nm⟨c²⟩.

**Exam tips:** use kelvin in every gas equation; in mixture problems, work per substance with a common final temperature.`,
    questions: [
      { q: "During melting at constant temperature, molecular:", opts: ["PE rises","both rise","neither changes","KE rises"], correct: 0, explain: "Energy breaks bonds, not speed." },
      { q: "Heating 0.5 kg water by 20 K (c = 4200) takes:", opts: ["840 J","210 kJ","42 kJ","42 J"], correct: 2, explain: "Q = 0.5 × 4200 × 20." },
      { q: "Melting 0.2 kg ice (L = 334 kJ/kg) takes about:", opts: ["6.7 kJ","67 kJ","334 kJ","13.4 kJ"], correct: 1, explain: "Q = mL." },
      { q: "The ideal gas equation is:", opts: ["pV = nRT","pV = RT/n","p/V = nRT","pT = nRV"], correct: 0, explain: "Standard form." },
      { q: "Gas temperature must be in:", opts: ["°C","either","Fahrenheit","kelvin"], correct: 3, explain: "Absolute scale required." },
      { q: "½m⟨c²⟩ = (3/2)kT relates:", opts: ["pressure to volume","mass to moles","mean KE to temperature","PE to temperature"], correct: 2, explain: "Kinetic theory result." },
      { q: "Boyle's law holds when which is constant?", opts: ["moles","temperature","pressure","volume"], correct: 1, explain: "pV = constant at fixed T." },
      { q: "Internal energy is the sum of:", opts: ["random kinetic and potential energies of molecules","heat and work","KE of the whole object","chemical energy only"], correct: 0, explain: "Microscopic definition." },
      { q: "2 mol at 300 K in 0.05 m³ has p ≈ (R = 8.31):", opts: ["50 kPa","300 kPa","10 kPa","100 kPa"], correct: 3, explain: "p = nRT/V = 2 × 8.31 × 300 / 0.05." },
      { q: "Latent heat of vaporisation is larger than fusion because:", opts: ["liquids are denser","fusion is exothermic","separating molecules fully needs more energy","steam is hotter"], correct: 2, explain: "All intermolecular bonds must break." },
    ],
  },
  {
    name: "Electric Fields and Capacitance",
    description: "Coulomb's law, field strength and potential, uniform fields, and capacitor behaviour.",
    lesson: `# Electric Fields and Capacitance

### Coulomb's Law
F = q₁q₂/(4πε₀r²). Field strength E = F/q (N C⁻¹); for a point charge E = q/(4πε₀r²).

### Uniform Fields
Between parallel plates: E = V/d, constant.

**Example:** 2 kV across 5 mm: E = 400 kV m⁻¹. An electron feels F = eE ≈ 6.4 × 10⁻¹⁴ N toward the positive plate.

### Potential
V = W/q, scalar; E = −dV/dr. Potential energy of q at V is qV.

### Capacitance
C = Q/V (farads). Energy stored: W = ½QV = ½CV².

**Combinations:** parallel adds (C = C₁ + C₂); series: 1/C = 1/C₁ + 1/C₂ (opposite to resistors).

**Example:** 10 μF and 20 μF in series: 1/C = 1/10 + 1/20 → C ≈ 6.7 μF.

### Charging and Discharging
Exponential: V = V₀ e^(−t/RC). Time constant RC: after one RC, V falls to 37%. Half-life t½ = 0.69 RC.

**Exam tips:** field points from high to low potential; in discharge problems identify which quantity (V, Q or I) decays — all share the same exponential factor.`,
    questions: [
      { q: "E = V/d applies to:", opts: ["uniform fields between plates","point charges","dipoles","magnetic fields"], correct: 0, explain: "Parallel-plate geometry." },
      { q: "2 kV across 5 mm gives E =", opts: ["100 V m⁻¹","4 kV m⁻¹","10⁴ V m⁻¹","400 kV m⁻¹"], correct: 3, explain: "2000/0.005." },
      { q: "Capacitance is defined as:", opts: ["QV","½QV","Q/V","V/Q"], correct: 2, explain: "C = Q/V." },
      { q: "Energy in a capacitor is:", opts: ["C²V","½CV²","CV²","½CV"], correct: 1, explain: "One of the three equivalent forms." },
      { q: "10 μF and 20 μF in series give about:", opts: ["6.7 μF","30 μF","15 μF","200 μF"], correct: 0, explain: "Reciprocal formula." },
      { q: "Capacitors in parallel:", opts: ["reciprocals add","halve","multiply","add directly"], correct: 3, explain: "Opposite behaviour to resistors." },
      { q: "After one time constant RC, a discharging capacitor's voltage falls to:", opts: ["63%","0%","37%","50%"], correct: 2, explain: "e⁻¹ ≈ 0.37." },
      { q: "The force on charge q in field E is:", opts: ["qE²","qE","E/q","q/E"], correct: 1, explain: "Definition of field strength." },
      { q: "Electric field strength points:", opts: ["from high to low potential","from low to high potential","any direction","perpendicular to equipotentials moving upward"], correct: 0, explain: "E = −dV/dr." },
      { q: "The time constant of 100 kΩ with 500 μF is:", opts: ["0.5 s","5 s","500 s","50 s"], correct: 3, explain: "RC = 10⁵ × 5 × 10⁻⁴." },
    ],
  },
  {
    name: "Magnetic Fields and Electromagnetism",
    description: "Force on currents and charges, B-field of wires and solenoids, and electromagnetic induction.",
    lesson: `# Magnetic Fields and Electromagnetism

### Force on a Current
F = BIL sin θ (Fleming's left hand: field-index, current-first-finger, force-thumb).

**Example:** 0.5 m wire carrying 3 A at 90° to a 0.2 T field: F = 0.3 N.

### Force on a Moving Charge
F = BQv sin θ, always perpendicular to v → circular paths: r = mv/(BQ) (basis of cyclotrons and mass spectrometers).

**Example:** an electron (m = 9.1 × 10⁻³¹ kg) at 2 × 10⁶ m s⁻¹ in 0.5 mT: r ≈ 2.3 cm.

### Fields from Currents
- Long straight wire: B = μ₀I/(2πr), circling by the right-hand grip rule
- Solenoid: B = μ₀nI inside

### Electromagnetic Induction
Faraday: induced EMF = rate of flux cutting = N dΦ/dt. Lenz: induced effects oppose the change (negative sign).

**Example:** a coil of 100 turns, flux changing 2 mWb in 50 ms induces EMF = 100 × 0.002/0.05 = 4 V.

Flux Φ = BA (B ⊥ A). Generators rotate coils in fields; transformers link two coils by a shared changing flux with V₁/V₂ = N₁/N₂.

**Exam tips:** use left hand for motors (force on current), right hand for generators (induced current); state Lenz's law in explain questions.`,
    questions: [
      { q: "F = BIL sin θ applies to:", opts: ["a capacitor","a current-carrying wire in a field","a static charge","two charges"], correct: 1, explain: "Force on a current." },
      { q: "A 0.5 m wire carrying 3 A at 90° to a 0.2 T field feels:", opts: ["0.3 N","0.6 N","0.033 N","3 N"], correct: 0, explain: "F = 0.2 × 3 × 0.5." },
      { q: "The force on a moving charge is:", opts: ["BQ/v","BQv²","Qv/B","BQv"], correct: 3, explain: "F = BQv sin θ." },
      { q: "A charge in a uniform B field moves in:", opts: ["a parabola","a spiral always","a circle","a straight line"], correct: 2, explain: "Force stays perpendicular to velocity." },
      { q: "Faraday's law: induced EMF equals:", opts: ["resistance × current","rate of flux cutting","total flux","flux × time"], correct: 1, explain: "EMF = −N dΦ/dt." },
      { q: "Lenz's law says the induced current:", opts: ["opposes the change causing it","aids the change","is always clockwise","produces no field"], correct: 0, explain: "Energy conservation in induction." },
      { q: "A 100-turn coil with flux changing 2 mWb in 50 ms induces:", opts: ["0.04 V","40 V","0.4 V","4 V"], correct: 3, explain: "N × ΔΦ/Δt." },
      { q: "The field around a straight wire:", opts: ["is radial outward","is zero","circles the wire","points along the wire"], correct: 2, explain: "Right-hand grip rule." },
      { q: "The radius of a charge's circular path is:", opts: ["mv²/(BQ)","mv/(BQ)","BQ/(mv)","mv·BQ"], correct: 1, explain: "From BQv = mv²/r." },
      { q: "A transformer steps voltage using:", opts: ["N₁/N₂ = V₁/V₂","N₁ = N₂","V₁V₂ = N₁N₂","V ∝ N²"], correct: 0, explain: "Turns ratio relation." },
    ],
  },
  {
    name: "Quantum Physics",
    description: "Photoelectric effect, photon energy, wave-particle duality, and energy levels in atoms.",
    lesson: `# Quantum Physics

### Photons
E = hf = hc/λ, h = 6.63 × 10⁻³⁴ J s.

**Example:** green light 550 nm: E ≈ 3.6 × 10⁻¹⁹ J ≈ 2.3 eV.

### The Photoelectric Effect
Light above a threshold frequency ejects electrons instantly; intensity alone does nothing below f₀.

- Einstein: hf = φ + KE_max (φ = work function)
- KE_max = eV_s (stopping potential)

**Example:** sodium φ = 2.3 eV needs λ < 540 nm; 400 nm light gives KE_max = 3.1 − 2.3 = 0.8 eV.

### Wave–Particle Duality
de Broglie: λ = h/p = h/(mv). Electrons diffract like waves — electron microscopes exploit short electron wavelengths.

**Example:** an electron at 10⁶ m s⁻¹: λ ≈ 0.7 nm.

### Energy Levels and Line Spectra
Atoms absorb/emit photons matching level gaps: hf = E₁ − E₂. Emission lines are bright; absorption dark.

**Example:** the Hα line: 3 → 2 transition, 656 nm.

**Exam tips:** one photon interacts with one electron — that is why intensity cannot release electrons below threshold; convert eV ↔ J with 1.6 × 10⁻¹⁹.`,
    questions: [
      { q: "Photon energy is:", opts: ["hf²","hλ","hf","h/f"], correct: 2, explain: "E = hf = hc/λ." },
      { q: "Green light (550 nm) photons carry about:", opts: ["9 × 10⁻¹⁴ J","3.6 × 10⁻¹⁹ J","3.6 × 10⁻²⁵ J","1.1 × 10⁻²⁷ J"], correct: 1, explain: "E = hc/λ." },
      { q: "The photoelectric equation is:", opts: ["hf = φ + KE_max","hf = φ − KE_max","φ = hf + KE","KE = hf always"], correct: 0, explain: "Einstein's equation." },
      { q: "Below the threshold frequency, electrons:", opts: ["are not emitted at all","are emitted slowly","absorb two photons","are emitted with low KE"], correct: 0, explain: "One-photon interaction." },
      { q: "The work function φ is:", opts: ["the stopping voltage","the electron charge","the minimum energy to free an electron","the photon energy"], correct: 2, explain: "Surface property of the metal." },
      { q: "de Broglie wavelength is:", opts: ["hf/c","h/(mv)","mv/h","hc/λ"], correct: 1, explain: "λ = h/p." },
      { q: "An electron at 10⁶ m s⁻¹ has λ ≈", opts: ["0.7 nm","0.7 μm","700 nm","7 pm"], correct: 0, explain: "λ = 6.6e-34/(9.1e-31 × 1e6)." },
      { q: "Emission spectra lines correspond to:", opts: ["ionisation only","nuclear decays","thermal radiation","electron transitions to lower levels"], correct: 3, explain: "hf = ΔE." },
      { q: "Increasing light intensity above threshold increases:", opts: ["the threshold frequency","the work function","the number of electrons per second","their maximum KE"], correct: 2, explain: "More photons, not more energy each." },
      { q: "1 eV =", opts: ["1 J","1.6 × 10⁻¹⁹ J","6.6 × 10⁻³⁴ J","9.1 × 10⁻³¹ J"], correct: 1, explain: "Energy of one electron through 1 V." },
    ],
  },
  {
    name: "Nuclear Physics",
    description: "Nuclear structure, radioactivity and half-life, mass-energy equivalence, and binding energy.",
    lesson: `# Nuclear Physics

### The Nucleus
Protons + neutrons (nucleons). Nuclide notation: ᴬZX — Z protons, A nucleons. Isotopes share Z, differ in N.

Nuclear densities are enormous (~10¹⁷ kg m⁻³) — nearly all mass in a tiny volume.

### Radioactive Decay
Random and spontaneous:

| Type | What changes | Stopped by |
|---|---|---|
| alpha | Z − 2, A − 4 | paper |
| beta-minus | Z + 1, A same | mm of aluminium |
| gamma | nothing | thick lead |

**Half-life:** time for half the nuclei to decay. N = N₀ e^(−λt), λ = ln 2 / t½.

**Example:** a sample with t½ = 10 days: after 30 days, 1/8 of the original activity remains.

### Mass–Energy
E = mc². Mass difference Δm in nuclear reactions becomes energy; binding energy = energy released assembling the nucleus. 1 u ≈ 931 MeV.

### Fission and Fusion
Both release energy by moving toward iron (peak binding energy per nucleon): heavy nuclei split (fission, reactors), light nuclei merge (fusion, stars).

**Exam tips:** balance Z and A on both sides of every equation; activity questions use A = λN, not guesswork with halves.`,
    questions: [
      { q: "Alpha decay changes the nucleus to:", opts: ["Z + 1, A","Z, A − 4","Z − 1, A","Z − 2, A − 4"], correct: 3, explain: "A helium nucleus is emitted." },
      { q: "Beta-minus decay converts:", opts: ["a proton to an electron","energy to mass","a neutron to a proton","a proton to a neutron"], correct: 2, explain: "Z increases by 1, A unchanged." },
      { q: "Gamma radiation is stopped by:", opts: ["air only","paper","aluminium foil","several cm of lead"], correct: 3, explain: "Very penetrating." },
      { q: "Half-life is the time for:", opts: ["half the nuclei to decay","all nuclei to decay","activity to double","the sample to halve in mass"], correct: 0, explain: "Definition." },
      { q: "A sample with t½ = 10 days after 30 days has activity fraction:", opts: ["1/3","1/2","1/16","1/8"], correct: 3, explain: "Three half-lives." },
      { q: "E = mc² relates:", opts: ["energy to binding only","charge to mass","mass change to energy released","mass to velocity"], correct: 2, explain: "Mass–energy equivalence." },
      { q: "Binding energy per nucleon peaks near:", opts: ["helium","iron","uranium","hydrogen"], correct: 1, explain: "Most stable nuclides around A ≈ 56." },
      { q: "Isotopes have the same:", opts: ["Z, different N","N, different Z","A, different Z","nothing in common"], correct: 0, explain: "Same protons, different neutrons." },
      { q: "Decay is:", opts: ["predictable per nucleus","caused by temperature","reversible","random and spontaneous"], correct: 3, explain: "Quantum randomness." },
      { q: "λ (decay constant) relates to half-life by:", opts: ["λ = 1/t½","λ = 2/t½","λ = ln 2 / t½","λ = t½ / ln 2"], correct: 2, explain: "From N = N₀e^(−λt)." },
    ],
  },
  {
    name: "Oscillations and Waves II",
    description: "Progressive vs stationary waves, superposition details, polarization applications and the EM spectrum.",
    lesson: `# Oscillations and Waves II

### Progressive vs Stationary
Progressive waves transfer energy; stationary waves store it in loops. Stationary patterns arise from two identical waves travelling in opposite directions (reflections on strings, air columns).

| Property | Progressive | Stationary |
|---|---|---|
| Amplitude | same for all points | varies: nodes zero, antinodes max |
| Phase | varies along wave | same within a loop, π flip across nodes |
| Energy | transferred | trapped |

### Harmonics
A string fixed at both ends: f₁ = v/2L, then 2f₁, 3f₁… Closed pipes resonate at odd multiples; open pipes at all multiples.

### Superposition Applications
- Young's double slit: x = λD/a — evidence light is a wave
- Diffraction grating: d sin θ = nλ — resolution of spectra
- Noise-cancelling headphones: destructive interference of antiphase sound

### Polarization Applications
Polaroid sunglasses cut glare from horizontal surfaces; stress analysis in plastics; LCD screens control light with twisted polarizers. Malus' law I = I₀cos²θ.

**Exam tips:** \'explain\' marks want the physics: path difference, phase, node/antinode conditions — not just formula substitution.`,
    questions: [
      { q: "A stationary wave:", opts: ["transfers energy along the medium","stores energy in loops","moves at v = fλ","requires two frequencies"], correct: 1, explain: "No net transfer." },
      { q: "Adjacent nodes and antinodes are separated by:", opts: ["λ/2","λ","2λ","λ/4"], correct: 3, explain: "Half of the node–node spacing." },
      { q: "A closed pipe resonates at:", opts: ["even multiples only","no harmonics","odd multiples of the fundamental","all multiples"], correct: 2, explain: "Node at the closed end." },
      { q: "In a stationary wave, points within one loop are:", opts: ["90° apart","in phase","in antiphase","random phase"], correct: 1, explain: "They oscillate together." },
      { q: "Noise-cancelling headphones use:", opts: ["destructive interference","resonance","polarization","diffraction"], correct: 0, explain: "Antiphase sound cancels ambient noise." },
      { q: "Young's double-slit proved light:", opts: ["is a particle only","travels at c","is longitudinal","behaves as a wave"], correct: 3, explain: "Interference requires waves." },
      { q: "Malus' law is:", opts: ["I = I₀sin θ","I = I₀/θ","I = I₀cos²θ","I = I₀cos θ"], correct: 2, explain: "Intensity between polarizers." },
      { q: "The phase change across a node is:", opts: ["2π","π","0","π/2"], correct: 1, explain: "Opposite sides move oppositely." },
      { q: "A diffraction grating produces maxima that are:", opts: ["sharp and bright","broad and dim","the same as double-slit","only first order"], correct: 0, explain: "Many slits sharpen maxima." },
      { q: "The second harmonic of 200 Hz is:", opts: ["300 Hz","100 Hz","600 Hz","400 Hz"], correct: 3, explain: "Twice the fundamental." },
    ],
  },
  {
    name: "Astronomy and Cosmology",
    description: "Standard candles, luminosity, Hubble's law, redshift and the Big Bang model.",
    lesson: `# Astronomy and Cosmology

### Luminosity and Intensity
Luminosity L is total power radiated (W). Intensity at distance d: I = L/(4πd²) — the key to distances.

**Standard candles** (Cepheid variables, Type Ia supernovae) have known L, so measuring I gives d.

**Example:** the Sun: I = 1370 W m⁻² at d = 1.5 × 10¹¹ m gives L ≈ 3.9 × 10²⁶ W.

### Wien and Stefan–Boltzmann
- Wien: λ_max T = 2.9 × 10⁻³ m K — hotter stars are bluer
- Stefan: L = σAT⁴, σ = 5.67 × 10⁻⁸

### Hubble's Law
Galaxies recede with v = Hd, H₀ ≈ 2.2 × 10⁻¹⁸ s⁻¹. Redshift z = Δλ/λ ≈ v/c for small z.

**Example:** a galaxy at 100 Mpc recedes at v = 2.2 × 10⁻¹⁸ × 100 × 3.09 × 10²² ≈ 6800 km s⁻¹.

### The Big Bang
Evidence: Hubble expansion, cosmic microwave background (2.7 K), hydrogen/helium abundance. Age estimate: t ≈ 1/H₀ ≈ 14 billion years. The fate question: critical density, Ω.

**Exam tips:** convert Mpc to metres (×3.09 × 10²²) before Hubble arithmetic; distinguish redshift of light from distance ladder methods.`,
    questions: [
      { q: "I = L/(4πd²) links:", opts: ["temperature and colour","intensity, luminosity, distance","mass and luminosity","redshift and age"], correct: 1, explain: "Inverse-square spreading." },
      { q: "A standard candle is an object with:", opts: ["known luminosity","known distance","known mass","constant intensity everywhere"], correct: 0, explain: "Its measured brightness reveals distance." },
      { q: "Wien's law says hotter stars are:", opts: ["redder","dimmer","larger","bluer"], correct: 3, explain: "λ_max shifts shorter." },
      { q: "Stefan–Boltzmann: L ∝", opts: ["T","1/T","T⁴","T²"], correct: 2, explain: "L = σAT⁴." },
      { q: "Hubble's law is:", opts: ["v = Hd²","v = Hd","v = H/d","d = Hv"], correct: 1, explain: "Recession speed proportional to distance." },
      { q: "Redshift z equals:", opts: ["Δλ/λ","λ/Δλ","v²/c","Δλ c"], correct: 0, explain: "Fractional wavelength shift." },
      { q: "Evidence for the Big Bang includes:", opts: ["solar flares","meteorites","tides","CMB radiation"], correct: 3, explain: "Plus expansion and light-element abundance." },
      { q: "1/H₀ estimates:", opts: ["Earth's mass","galaxy mass","the age of the universe","the Sun's luminosity"], correct: 2, explain: "Roughly 14 billion years." },
      { q: "The CMB today is about:", opts: ["5800 K","2.7 K","300 K","0 K"], correct: 1, explain: "Cooled relic radiation." },
      { q: "The Sun's luminosity is about:", opts: ["3.9 × 10²⁶ W","3.9 × 10¹⁸ W","1370 W","3.9 × 10³⁰ W"], correct: 0, explain: "From I = 1370 W m⁻² at Earth." },
    ],
  },
];
