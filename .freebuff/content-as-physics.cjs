// AS Physics (CAIE 9702) — 8 topics. Questions use 0-based `correct`.
// lesson strings carry REAL newlines (JSON.stringify with escape=false is unsafe; kept as data, seeder writes via dollar-quoting).
module.exports = [
  {
    name: "Kinematics",
    description: "Displacement, velocity, acceleration, SUVAT equations and projectile motion.",
    lesson: `# Kinematics

### Definitions
- **Displacement** s: distance in a given direction (vector)
- **Velocity** v: rate of change of displacement, v = ds/dt
- **Acceleration** a: rate of change of velocity, a = dv/dt

### Graphs
- Gradient of a displacement–time graph = velocity
- Gradient of a velocity–time graph = acceleration
- **Area under a velocity–time graph = displacement**
- Area under an acceleration–time graph = change in velocity

### SUVAT (uniform acceleration only)
| Equation | Missing |
|---|---|
| v = u + at | s |
| s = ut + ½at² | v |
| v² = u² + 2as | t |
| s = ½(u + v)t | a |

Sign convention matters: take up as positive and g = −9.81 m s⁻² for falling objects.

### Projectiles
Resolve into independent components: horizontal at constant velocity (s = ut), vertical under gravity (SUVAT).

**Example:** a ball fired at 20 m s⁻¹ at 30°: uₓ = 20 cos 30° ≈ 17.3 m s⁻¹, u_y = 20 sin 30° = 10 m s⁻¹. Time of flight = 2u_y/g ≈ 2.04 s; range = uₓ × t ≈ 35 m.

**Exam tips:** state which direction is positive; projectile questions are two separate 1-D problems joined by time.`,
    questions: [
      { q: "The area under a velocity–time graph gives:", opts: ["acceleration","displacement","jerk","distance per second"], correct: 1, explain: "v × t has units of displacement." },
      { q: "A stone falls from rest for 3 s (g = 9.81). Its speed is:", opts: ["9.81 m s⁻¹","3.27 m s⁻¹","88.3 m s⁻¹","29.4 m s⁻¹ downward"], correct: 3, explain: "v = u + at = 0 + 9.81 × 3." },
      { q: "A car goes from 0 to 30 m s⁻¹ in 6 s. Its acceleration is:", opts: ["0.2 m s⁻²","36 m s⁻²","5 m s⁻²","180 m s⁻²"], correct: 2, explain: "a = Δv/t = 30/6." },
      { q: "The horizontal component of a projectile launched at 20 m s⁻¹, 30° above horizontal:", opts: ["34.6 m s⁻¹","17.3 m s⁻¹","10 m s⁻¹","20 m s⁻¹"], correct: 1, explain: "u cos 30° = 20 × 0.866." },
      { q: "At the top of its flight, a projectile's vertical velocity is:", opts: ["equal to u_y","zero","g","maximum"], correct: 1, explain: "The vertical component passes through zero; the horizontal component continues." },
      { q: "The gradient of a displacement–time graph is:", opts: ["velocity","distance","force","acceleration"], correct: 0, explain: "Rate of change of displacement." },
      { q: "s = ut + ½at² is used when which quantity is unknown?", opts: ["acceleration a","initial velocity u","final velocity v","time t"], correct: 2, explain: "That equation omits v." },
      { q: "A ball thrown up at 15 m s⁻¹ takes to reach maximum height:", opts: ["15 s","1.53 s","3.06 s","0.66 s"], correct: 1, explain: "t = u/g = 15/9.81 ≈ 1.53 s." },
      { q: "Uniform acceleration means:", opts: ["constant velocity","equal velocity changes each second","zero acceleration","constant displacement"], correct: 1, explain: "a is constant, so v changes by the same amount each second." },
      { q: "The range of a projectile is maximised (no air resistance) at:", opts: ["45°","60°","90°","30°"], correct: 0, explain: "Range = u² sin 2θ/g, maximised when 2θ = 90°." },
    ],
  },
  {
    name: "Dynamics",
    description: "Newton's laws, momentum, weight, friction and connected bodies.",
    lesson: `# Dynamics

### Newton's Laws
1. A body stays at rest or in uniform motion unless acted on by a resultant force.
2. F = ma — the resultant force equals mass × acceleration.
3. Forces occur in pairs: equal magnitude, opposite direction, on **different** bodies.

**Example:** a 2 kg mass with a 10 N resultant accelerates at 5 m s⁻².

### Weight and Mass
Weight W = mg — a force in newtons; mass in kg is invariant. A 70 kg person weighs about 687 N.

### Momentum
p = mv (vector, kg m s⁻¹). Resultant force = rate of change of momentum: F = Δp/Δt.

**Conservation:** in a collision with no external forces, total momentum is unchanged.

- Elastic: kinetic energy also conserved
- Inelastic: some KE becomes heat/sound

**Example:** a 3 kg trolley at 4 m s⁻¹ hits a stationary 1 kg trolley and they couple: 12 = 4v, so v = 3 m s⁻¹.

### Friction and Connected Bodies
Draw free-body diagrams, then apply F = ma along each axis. For a towed car and trailer, the tow-bar tension appears as an internal pair (equal and opposite).

**Exam tips:** \'constant velocity\' means zero resultant force, not zero friction; impulse questions want FΔt = Δp.`,
    questions: [
      { q: "A 2 kg mass with 10 N resultant force accelerates at:", opts: ["12 m s⁻²","5 m s⁻²","20 m s⁻²","0.2 m s⁻²"], correct: 1, explain: "a = F/m = 10/2." },
      { q: "The weight of a 70 kg person (g = 9.81) is about:", opts: ["687 N","70 N","7.1 N","6870 N"], correct: 0, explain: "W = mg = 70 × 9.81." },
      { q: "Newton's third law pairs act on:", opts: ["different bodies","the same direction","light bodies only","the same body"], correct: 0, explain: "Action and reaction act on different bodies." },
      { q: "Momentum is defined as:", opts: ["ma","Ft","mv","½mv²"], correct: 2, explain: "p = mv." },
      { q: "A 3 kg trolley at 4 m s⁻¹ couples with a stationary 1 kg trolley. The speed after is:", opts: ["12 m s⁻¹","3 m s⁻¹","4 m s⁻¹","2 m s⁻¹"], correct: 1, explain: "12 = (4)v → v = 3." },
      { q: "In an elastic collision:", opts: ["only momentum is conserved","momentum and KE are conserved","KE only is conserved","neither is conserved"], correct: 1, explain: "Elastic means no KE lost." },
      { q: "Impulse equals:", opts: ["F/Δt","Fv","ma","FΔt"], correct: 3, explain: "Impulse = change in momentum = force × time." },
      { q: "A box moves at constant velocity. The resultant force is:", opts: ["mg","ma","equal to friction","zero"], correct: 3, explain: "Constant velocity → a = 0 → F = 0." },
      { q: "Force as rate of change of momentum is written:", opts: ["F = mv","F = Δp/Δt","F = p/Δt","F = Δp × Δt"], correct: 1, explain: "Newton's second law in momentum form." },
      { q: "A skydiver at terminal velocity has:", opts: ["zero air resistance","weight equal to drag","zero weight","downward acceleration"], correct: 1, explain: "Forces balance at terminal velocity." },
    ],
  },
  {
    name: "Forces and Equilibrium",
    description: "Free-body diagrams, resolving forces, moments, centre of gravity and the principle of moments.",
    lesson: `# Forces and Equilibrium

### Free-Body Diagrams
Draw every force on one body: weight (down), normal reactions (perpendicular to surfaces), tension (along strings), friction (opposing motion).

### Resolving Forces
Any force F at angle θ splits into F cos θ (along) and F sin θ (perpendicular).

**Example:** a 50 N pull at 30° above horizontal drags with 50 cos 30° ≈ 43.3 N horizontally.

An object on a slope of angle θ has components mg sin θ down the slope and mg cos θ into it.

### Equilibrium
A body is in equilibrium when the resultant force is zero in **every** direction and the resultant moment is zero.

### Moments and the Principle of Moments
Moment = force × perpendicular distance from the pivot.

For equilibrium: Σ clockwise moments = Σ anticlockwise moments.

**Example:** a 600 N child 2 m from a pivot balances an adult 1.2 m away: 600 × 2 = W × 1.2, so W = 1000 N.

### Centre of Gravity
The point where the weight appears to act. For stable equilibrium the line of action must pass through the base.

**Exam tips:** take moments about the point with the most unknown forces; include the normal reaction and friction of any support, and check units of perpendicular distance.`,
    questions: [
      { q: "The horizontal component of a 50 N force at 30° above horizontal is:", opts: ["50 N","21.7 N","43.3 N","25 N"], correct: 2, explain: "50 cos 30°." },
      { q: "A moment equals:", opts: ["force / distance","force × perpendicular distance","force × velocity","mass × distance"], correct: 1, explain: "Definition of moment." },
      { q: "For rotational equilibrium:", opts: ["clockwise moments equal anticlockwise moments","all forces are vertical","speed is constant","momenta balance"], correct: 0, explain: "Principle of moments." },
      { q: "The component of weight down a slope of angle θ is:", opts: ["mg cos θ","mg","mg tan θ","mg sin θ"], correct: 3, explain: "Resolve along the slope." },
      { q: "A 600 N child 2 m from a pivot is balanced by a weight 1.2 m away of:", opts: ["500 N","1440 N","1000 N","360 N"], correct: 2, explain: "1200 = 1.2W." },
      { q: "In equilibrium the resultant force is:", opts: ["equal to friction","zero","constant but non-zero","mg"], correct: 1, explain: "No acceleration in any direction." },
      { q: "The centre of gravity is:", opts: ["always inside the object","where weight appears to act","at the geometric centre always","the point of contact with the ground"], correct: 1, explain: "Definition." },
      { q: "The normal reaction acts:", opts: ["perpendicular to the surface","downward","opposite to weight always","along the surface"], correct: 0, explain: "Normal means perpendicular." },
      { q: "Resolving a force into components gives:", opts: ["one force only","a moment","two smaller forces at right angles","two larger forces"], correct: 2, explain: "Standard perpendicular pair." },
      { q: "Taking moments about a support with unknown reaction is useful because:", opts: ["g cancels","the reaction contributes no moment there","reactions always vanish","moments are vectors"], correct: 1, explain: "Its lever arm is zero there." },
    ],
  },
  {
    name: "Work, Energy and Power",
    description: "Work done, kinetic and potential energy, conservation of energy, efficiency and power.",
    lesson: `# Work, Energy and Power

### Work
W = Fs cos θ — force × displacement in the force's direction. Unit: joule (J).

**Example:** 100 N over 5 m in the same direction: W = 500 J. At 60°: 100 × 5 × cos 60° = 250 J.

### Energy Forms
- Kinetic energy: Ek = ½mv²
- Gravitational PE: Ep = mgh
- Elastic PE: ½kx² (spring, Hooke's law region)

### Conservation of Energy
Energy changes between forms but the total stays constant (no external work).

Falling from height h: mgh = ½mv², so v = √(2gh) — independent of mass.

**Example:** a 0.5 kg ball dropped from 4 m hits at v = √(2 × 9.81 × 4) ≈ 8.9 m s⁻¹.

### Power
P = W/t = Fv. Unit: watt (W = J s⁻¹).

**Example:** a 750 N runner at 6 m s⁻¹ outputs P = 4500 W.

### Efficiency
Efficiency = useful output / total input × 100%.

**Exam tips:** energy questions are solved with energy, not kinematics, when forces vary; always ask \'where did the missing energy go?\' — usually heat or sound.`,
    questions: [
      { q: "Work done =", opts: ["force × time","mass × speed","power × time only","force × displacement in the force direction"], correct: 3, explain: "W = Fs cos θ." },
      { q: "Kinetic energy of a 2 kg mass at 3 m s⁻¹ is:", opts: ["18 J","3 J","9 J","6 J"], correct: 2, explain: "½ × 2 × 9 = 9 J." },
      { q: "A 0.5 kg ball dropped from 4 m lands at about:", opts: ["39.2 m s⁻¹","8.9 m s⁻¹","4 m s⁻¹","19.6 m s⁻¹"], correct: 1, explain: "v = √(2gh)." },
      { q: "Power =", opts: ["W/t or Fv","W × t","F/a","mv"], correct: 0, explain: "Two equivalent definitions." },
      { q: "A 750 N runner at 6 m s⁻¹ outputs:", opts: ["125 W","750 W","0.125 W","4500 W"], correct: 3, explain: "P = Fv = 750 × 6." },
      { q: "Efficiency is:", opts: ["output − input","energy created / energy used","useful output / total input","total input / useful output"], correct: 2, explain: "Always a fraction of input, then × 100%." },
      { q: "1 watt equals:", opts: ["1 N s","1 J s⁻¹","1 N m s⁻²","1 J"], correct: 1, explain: "Definition of the watt." },
      { q: "Lifting a 5 kg box 2 m (g = 9.81) takes about:", opts: ["98 J","10 J","49 J","196 J"], correct: 0, explain: "Ep = mgh = 5 × 9.81 × 2 ≈ 98 J." },
      { q: "The work done by friction on a sliding block is:", opts: ["negative (removes KE)","zero","always equal to mg","positive"], correct: 0, explain: "Friction opposes displacement." },
      { q: "Doubling speed multiplies KE by:", opts: ["8","½","2","4"], correct: 3, explain: "KE ∝ v²." },
    ],
  },
  {
    name: "Materials: Deformation",
    description: "Hooke's law, stress and strain, Young modulus and elastic potential energy.",
    lesson: `# Materials: Deformation

### Hooke's Law
Up to the limit of proportionality, F = kx — extension is proportional to load. k is the spring constant (N m⁻¹).

Springs in series share the load (k_total < each); in parallel, k_total adds.

### Stress, Strain, Young Modulus
- Stress σ = F/A (Pa)
- Strain ε = x/L (no unit)
- **Young modulus E = σ/ε** (Pa) — a material property, independent of shape

**Example:** a wire of length 2 m, cross-section 1 × 10⁻⁶ m², extends 1 mm under 100 N: E = (F/A)/(x/L) = (10⁸)/(5 × 10⁻⁴) = 2 × 10¹¹ Pa — steel-like.

### Force–Extension Graphs
- Gradient of the linear region = k
- Area under graph = elastic PE stored = ½Fx (for linear) = ½kx²
- Beyond the yield point the wire deforms plastically and will not return

### Breaking Stress
The maximum stress a material withstands — strong materials have high breaking stress, stiff materials have high E.

**Exam tips:** convert mm to m and mm² to m² before substituting; the area under a stress–strain graph gives energy per unit volume.`,
    questions: [
      { q: "Hooke's law states:", opts: ["F = kx","F = kx²","F = ma","F = k/x"], correct: 0, explain: "Extension proportional to load." },
      { q: "Young modulus is defined as:", opts: ["stress × strain","force × extension","strain / stress","stress / strain"], correct: 3, explain: "E = σ/ε." },
      { q: "Stress is measured in:", opts: ["metres","joules","pascals","newtons"], correct: 2, explain: "N m⁻² = Pa." },
      { q: "Strain has:", opts: ["units of N","no unit","units of m","units of Pa"], correct: 1, explain: "Length divided by length." },
      { q: "Energy stored in a stretched spring (linear region) is:", opts: ["½kx²","kx","kx²","½kx"], correct: 0, explain: "Elastic PE." },
      { q: "The area under a force–extension graph gives:", opts: ["the spring constant","stress","the breaking force","work done stretching"], correct: 3, explain: "F × x = energy." },
      { q: "A 100 N load on area 1 × 10⁻⁶ m² gives stress:", opts: ["1 × 10⁻⁴ Pa","1 × 10⁶ Pa","1 × 10⁸ Pa","1 × 10² Pa"], correct: 2, explain: "F/A = 100/10⁻⁶." },
      { q: "Two identical springs in parallel (each k) give:", opts: ["k²","2k","k/2","k"], correct: 1, explain: "Parallel springs add stiffness." },
      { q: "Beyond the limit of proportionality, a wire:", opts: ["still obeys Hooke's law","may deform plastically","gets shorter","doubles k"], correct: 1, explain: "Plastic deformation does not reverse." },
      { q: "A stiff material has:", opts: ["low E","high density","low breaking stress","high E"], correct: 3, explain: "Stiffness is measured by the Young modulus." },
    ],
  },
  {
    name: "Waves",
    description: "Wave properties, the wave equation, doppler effect, EM spectrum and polarization.",
    lesson: `# Waves

### Basics
A wave transfers **energy** without net transfer of matter.

- Transverse: oscillation ⊥ propagation (EM waves, water surface)
- Longitudinal: oscillation ∥ propagation (sound)

### The Wave Equation
v = fλ. Frequency f is set by the source; speed v by the medium.

**Example:** sound at 340 m s⁻¹, f = 512 Hz: λ = 340/512 ≈ 0.66 m.

### Intensity
I = P/A. Intensity ∝ amplitude² — doubling the amplitude quadruples the intensity.

### Doppler Effect
Observed frequency changes with relative motion: f′ = f(v ± v_o)/(v ∓ v_s). Approaching sources sound higher.

**Example:** an ambulance passing you: high pitch approaching, low pitch receding.

### EM Spectrum
Radio → micro → IR → visible (400–700 nm) → UV → X-ray → gamma. All travel at c = 3 × 10⁸ m s⁻¹ in vacuum.

### Polarization
Only transverse waves can be polarised — proof that light is transverse. Malus' law: I = I₀ cos²θ between polariser axes.

**Exam tips:** distinguish wave speed (set by medium) from frequency (set by source); in Doppler problems, signs depend on approach or recession.`,
    questions: [
      { q: "The wave equation is:", opts: ["v = fλ²","v = fλ","v = f/λ","v = λ/f"], correct: 1, explain: "Standard relation." },
      { q: "Sound at 340 m s⁻¹ and 512 Hz has wavelength about:", opts: ["0.66 m","1.5 m","512 m","0.33 m"], correct: 0, explain: "λ = v/f." },
      { q: "Longitudinal waves oscillate:", opts: ["parallel to travel","in circles","at 45°","perpendicular to travel"], correct: 0, explain: "Compression along the propagation direction." },
      { q: "Doubling a wave's amplitude changes intensity by:", opts: ["×√2","no change","×4","×2"], correct: 2, explain: "I ∝ amplitude²." },
      { q: "Which can be polarised?", opts: ["all waves","sound","light","water waves in a tank"], correct: 2, explain: "Only transverse waves polarise." },
      { q: "The Doppler effect makes an approaching source sound:", opts: ["higher frequency","lower frequency","louder only","unchanged"], correct: 0, explain: "Wavefronts bunch up." },
      { q: "Visible light spans roughly:", opts: ["1–10 mm","10–400 nm","700 nm–1 mm","400–700 nm"], correct: 3, explain: "Standard visible band." },
      { q: "All EM waves in vacuum travel at:", opts: ["speeds depending on frequency","1.5 × 10⁸ m s⁻¹","3 × 10⁸ m s⁻¹","340 m s⁻¹"], correct: 2, explain: "c, independent of frequency." },
      { q: "Wave frequency is determined by:", opts: ["the wavelength","the medium","the source","the amplitude"], correct: 2, explain: "The medium sets speed, the source sets frequency." },
      { q: "Malus' law is I =", opts: ["I₀ cos²θ","I₀ cos θ","I₀ sin²θ","I₀/2 always"], correct: 0, explain: "Intensity between crossed polarisers." },
    ],
  },
  {
    name: "Superposition",
    description: "Interference, double-slit, diffraction gratings and stationary waves.",
    lesson: `# Superposition

### The Principle of Superposition
When waves meet, displacements add. In phase → constructive (big amplitude); antiphase → destructive (cancellation).

### Coherence and Path Difference
Two sources are coherent if they share frequency and constant phase difference. Maxima occur where path difference = nλ; minima where it = (n + ½)λ.

### Double-Slit (Young)
Fringe spacing x = λD/a (D = slit–screen distance, a = slit separation).

**Example:** λ = 600 nm, D = 2 m, a = 0.5 mm: x = 2.4 mm.

Red light gives wider fringes than blue; smaller slit separation also widens fringes.

### Diffraction Grating
d sin θ = nθth order maximum. More slits → sharper, brighter maxima. The number of visible orders is the largest n with sin θ ≤ 1.

**Example:** 600 lines/mm → d = 1.67 μm; for 500 nm light, n_max = 3.

### Stationary Waves
Two identical waves travelling opposite directions (e.g. wave + reflection) create nodes (no movement) and antinodes (max movement), spaced λ/2 apart. Strings and closed pipes resonate at f₁ = v/2L (fundamental) and harmonics.

**Exam tips:** always compute d from \'lines per mm\' first; state \'path difference = nλ\' explicitly in explain-the-fringe questions.`,
    questions: [
      { q: "Constructive interference occurs at path difference:", opts: ["λ/4","zero only","nλ","(n + ½)λ"], correct: 2, explain: "Crests meet crests." },
      { q: "Fringe spacing in the double-slit is:", opts: ["λ/D","λD/a","λa/D","aD/λ"], correct: 1, explain: "x = λD/a." },
      { q: "Two sources are coherent when they have:", opts: ["equal amplitude","constant phase difference","the same medium","equal intensity"], correct: 1, explain: "Coherence needs constant phase relation." },
      { q: "The grating equation is:", opts: ["d cos θ = nλ","λ sin θ = d","d sin θ = λ/n","d sin θ = nλ"], correct: 3, explain: "Standard grating formula." },
      { q: "Adjacent nodes on a stationary wave are separated by:", opts: ["λ/4","2λ","λ/2","λ"], correct: 2, explain: "Half-wavelength spacing." },
      { q: "A stationary wave stores:", opts: ["momentum","net energy transfer","no net energy transfer","only potential energy"], correct: 2, explain: "Energy oscillates but does not propagate." },
      { q: "The fundamental of a string of length L is:", opts: ["v/2L","v/L","2v/L","v/4L"], correct: 0, explain: "One loop spans L = λ/2." },
      { q: "Red light compared with blue in Young's slits gives:", opts: ["narrower fringes","the same spacing","no fringes","wider fringes"], correct: 3, explain: "x ∝ λ and λ_red > λ_blue." },
      { q: "A grating with 600 lines/mm has slit spacing:", opts: ["0.6 mm","1.67 mm","1.67 μm","600 μm"], correct: 2, explain: "d = 1/600 mm." },
      { q: "At a node the displacement is:", opts: ["doubled","always zero","maximum","half the amplitude"], correct: 1, explain: "Destructive superposition at all times." },
    ],
  },
  {
    name: "Electricity: D.C. Circuits",
    description: "Charge and current, resistance and resistivity, EMF, series/parallel networks and potential dividers.",
    lesson: `# Electricity: D.C. Circuits

### Current and Charge
I = Q/t — charge per second, in amperes. Conventional current flows + to − (electrons drift the other way).

I = nAvq links microscopic drift to macroscopic current (n = carrier density).

### Voltage and Power
- V = W/Q (joules per coulomb)
- P = VI = I²R = V²/R

### Resistance and Resistivity
R = V/I; R = ρL/A. Resistivity ρ is a material property (Ω m). Metals' resistance rises with temperature; thermistors' falls (NTC).

**Example:** a wire 2 m long, 0.5 mm² cross-section, ρ = 5 × 10⁻⁷: R = 2 Ω.

### Series and Parallel
- Series: same current, R_total = R₁ + R₂ + …
- Parallel: same voltage, 1/R_total = 1/R₁ + 1/R₂ + …

### EMF and Internal Resistance
ε = I(R + r) — some voltage is \'lost\' inside the battery. Terminal voltage V = ε − Ir drops as load current rises.

### Potential Dividers
V_out = V_in × R₂/(R₁ + R₂). Used with LDRs/thermistors to make sensor circuits.

**Exam tips:** redraw messy networks with clean junctions; always account for internal resistance in \'maximum power\' questions.`,
    questions: [
      { q: "I = Q/t defines:", opts: ["voltage","resistance","power","current"], correct: 3, explain: "Current is charge per time." },
      { q: "Power dissipated in a resistor is:", opts: ["V/I","V/R","I²R","IR"], correct: 2, explain: "All of P = VI = I²R = V²/R." },
      { q: "Resistivity is measured in:", opts: ["Ω/m²","Ω m","Ω","Ω/m"], correct: 1, explain: "ρ = RA/L." },
      { q: "Two 6 Ω resistors in parallel give:", opts: ["3 Ω","12 Ω","6 Ω","36 Ω"], correct: 0, explain: "Equal parallel resistors halve." },
      { q: "Terminal voltage equals:", opts: ["ε + Ir","ε always","εI","ε − Ir"], correct: 3, explain: "Internal drop subtracts." },
      { q: "A potential divider output V_out =", opts: ["V_in/2 always","V_in × (R₁ + R₂)/R₂","V_in × R₂/(R₁ + R₂)","V_in × R₁/R₂"], correct: 2, explain: "Ratio of lower resistor." },
      { q: "The resistance of a metal as temperature rises:", opts: ["becomes zero","increases","decreases","is unchanged"], correct: 1, explain: "More lattice vibration scatters electrons." },
      { q: "In series, the quantity common to all components is:", opts: ["current","voltage","resistance","power"], correct: 0, explain: "One loop, one current." },
      { q: "A wire of L, A, ρ has resistance R. Another of 2L and 2A (same ρ) has:", opts: ["2R","4R","R/2","R"], correct: 3, explain: "R ∝ L/A: both double, cancelling." },
      { q: "An NTC thermistor's resistance:", opts: ["is constant","is zero at 0°C","falls as temperature rises","rises as temperature rises"], correct: 2, explain: "Negative temperature coefficient." },
    ],
  },
  {
    name: "Motion in a Circle and Gravity",
    description: "Angular speed, centripetal acceleration, gravitational fields, and satellite orbits.",
    lesson: `# Motion in a Circle and Gravity

### Circular Motion
Angular speed ω = v/r = 2π/T (rad s⁻¹). Centripetal acceleration a = v²/r = ω²r, always directed to the centre; centripetal force F = mv²/r.

**Example:** a 0.5 kg ball on a 1 m string at 2 m s⁻¹ needs F = 2 N inward.

### Gravitational Field
Newton's law: F = Gm₁m₂/r², G = 6.67 × 10⁻¹¹ N m² kg⁻².

Field strength g = GM/r². At Earth's surface g ≈ 9.81 N kg⁻¹.

### Orbits
For a circular orbit, gravity supplies the centripetal force: GMm/r² = mv²/r, so v = √(GM/r) — higher orbits move **slower** but have **longer** periods (Kepler's third law: T² ∝ r³).

Geostationary satellites: T = 24 h, r ≈ 42,300 km from the centre.

### Potential
Gravitational potential φ = −GM/r (zero at infinity). Potential gradient gives field strength: g = −dφ/dr.

**Exam tips:** speed in orbit is independent of the satellite's own mass; don't confuse g at the surface with orbital equations using r from the planet's centre.`,
    questions: [
      { q: "Centripetal force is given by:", opts: ["mv²/r","mvr","mv/r²","mr²v"], correct: 0, explain: "Standard formula." },
      { q: "Centripetal acceleration points:", opts: ["toward the centre","away from the centre","tangent to the circle","along the velocity"], correct: 0, explain: "By definition." },
      { q: "A satellite's orbital speed depends on:", opts: ["its engine","its shape","its mass","the orbit radius"], correct: 3, explain: "v = √(GM/r), independent of satellite mass." },
      { q: "Higher orbits have:", opts: ["zero period","longer periods","shorter periods","equal periods"], correct: 1, explain: "T² ∝ r³." },
      { q: "Gravitational force between two masses is:", opts: ["Gm₁m₂/r²","Gm₁m₂r²","G(m₁ + m₂)/r","Gm₁m₂/r"], correct: 0, explain: "Newton's law of gravitation." },
      { q: "Angular speed ω equals:", opts: ["π/T","T/2π","2T/π","2π/T"], correct: 3, explain: "Radians per second for one period." },
      { q: "The weight of a 70 kg astronaut in orbit (g ≈ 8.7 there) is about:", opts: ["687 N","70 N","609 N","zero"], correct: 2, explain: "W = mg still applies; \\'weightlessness\\' is free-fall, not zero g." },
      { q: "Geostationary satellites orbit at roughly:", opts: ["1,000,000 km","42,300 km from the centre","400 km","the surface"], correct: 1, explain: "The 24-hour orbit." },
      { q: "Gravitational potential is:", opts: ["always negative","always positive","zero everywhere","positive above surface"], correct: 0, explain: "Zero at infinity, negative in the field." },
      { q: "Halving the radius of a circular orbit (same planet):", opts: ["speed halves","speed doubles","speed is unchanged","speed increases by √2"], correct: 3, explain: "v ∝ 1/√r." },
    ],
  },
];
