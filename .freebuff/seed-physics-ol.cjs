const fs = require("fs");
const https = require('https');
const TOKEN = (fs.readFileSync(".freebuff/get-keys.cjs", "utf8").match(/sbp_[a-f0-9]+/) || [])[0];
const PROJECT = 'zzliiazovezhxbmfeqco';

function query(sql) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ query: sql });
    const options = {
      hostname: 'api.supabase.com',
      path: `/v1/projects/${PROJECT}/database/query`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      }
    };
    const req = https.request(options, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch(e) { resolve(data); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function esc(s) { return JSON.stringify(s); }

const topics = [
  {
    name: 'Measurement & Units',
    lesson: `# Measurement & Units\n\n## What is Physics?\nPhysics is the study of the natural world — from the tiniest particles to the vastness of space.\n\n## Base Quantities and SI Units\n\n| Quantity | SI Unit | Symbol |\n|----------|---------|--------|\n| Length | metre | m |\n| Mass | kilogram | kg |\n| Time | second | s |\n| Electric current | ampere | A |\n| Temperature | kelvin | K |\n\n## Derived Units\n- Force (Newton): 1 N = 1 kg·m/s²\n- Energy (Joule): 1 J = 1 N·m\n- Power (Watt): 1 W = 1 J/s\n- Pressure (Pascal): 1 Pa = 1 N/m²\n\n## Prefixes\n| Prefix | Symbol | Multiplier |\n|--------|--------|------------|\n| kilo | k | 10³ |\n| centi | c | 10⁻² |\n| milli | m | 10⁻³ |\n| micro | μ | 10⁻⁶ |\n| nano | n | 10⁻⁹ |\n\n## Speed, Distance, Time\n**v = s / t**\n- v = speed (m/s), s = distance (m), t = time (s)\n- To convert km/h to m/s: multiply by 5/18\n\n## Acceleration\n**a = (v - u) / t**\n- a = acceleration (m/s²), v = final velocity, u = initial velocity\n\n## Equations of Motion (SUVAT)\n1. v = u + at\n2. s = ut + ½at²\n3. v² = u² + 2as\n\n## Scalar vs Vector\nScalars: distance, speed, mass, energy\nVectors: displacement, velocity, weight, force, acceleration`,
    questions: [
      { q: 'What is the SI unit of force?', opts: ['Newton (N)', 'Joule (J)', 'Watt (W)', 'Pascal (Pa)'], correct: 1, explain: 'The Newton is the SI unit of force, defined as 1 kg·m/s².' },
      { q: 'Convert 72 km/h to m/s:', opts: ['20 m/s', '72 m/s', '25.9 m/s', '2.59 m/s'], correct: 1, explain: '72 × (5/18) = 20 m/s.' },
      { q: 'A car accelerates from rest to 30 m/s in 6 s. What is its acceleration?', opts: ['5 m/s²', '180 m/s²', '0.2 m/s²', '10 m/s²'], correct: 1, explain: 'a = (30-0)/6 = 5 m/s².' },
      { q: 'On a distance-time graph, a flat line means the object is:', opts: ['Stationary', 'Moving at constant speed', 'Accelerating', 'Decelerating'], correct: 1, explain: 'A flat line means distance is not changing — the object is at rest.' },
      { q: 'The prefix "micro" (μ) represents:', opts: ['10⁻⁶', '10⁻³', '10⁻⁹', '10⁻²'], correct: 1, explain: 'Micro (μ) = 10⁻⁶.' },
      { q: 'A car travels 150 km in 2 h, then 90 km in 1 h. What is the average speed?', opts: ['80 km/h', '82.5 km/h', '90 km/h', '120 km/h'], correct: 1, explain: 'Average speed = (150+90)/(2+1) = 240/3 = 80 km/h.' },
      { q: 'Which is a vector quantity?', opts: ['Velocity', 'Speed', 'Mass', 'Energy'], correct: 1, explain: 'Velocity has magnitude AND direction — it is a vector.' },
      { q: 'On a velocity-time graph, the area under the line represents:', opts: ['Distance travelled', 'Acceleration', 'Speed', 'Time'], correct: 1, explain: 'The area under a v-t graph gives total distance travelled.' },
      { q: 'How many significant figures does 0.00540 have?', opts: ['3', '2', '4', '5'], correct: 1, explain: 'Leading zeros don\'t count, but the trailing zero does: 3 significant figures.' },
      { q: 'A micrometer reads main scale 4.5 mm and circular scale 23. The reading is:', opts: ['4.73 mm', '4.23 mm', '47.3 mm', '4.523 mm'], correct: 1, explain: 'Reading = 4.5 + (23 × 0.01) = 4.73 mm.' }
    ]
  },
  {
    name: 'Forces & Motion',
    lesson: `# Forces & Motion\n\n## What is a Force?\nA force is a push or pull that changes motion, shape, or direction. Measured in Newtons (N).\n\n## Types of Force\n**Contact forces:** Friction, air resistance, tension, normal reaction, upthrust\n**Non-contact forces:** Gravity, electrostatic, magnetic\n\n## Weight vs Mass\n**W = m × g** (Weight = mass × gravitational field strength)\n- Mass: kg (constant everywhere)\n- Weight: N (varies with gravity)\n- Earth: g ≈ 10 N/kg, Moon: g ≈ 1.6 N/kg\n\n## Newton's Laws\n**1st Law:** Object stays at rest or constant velocity unless acted on by resultant force.\n**2nd Law:** F = m × a (Resultant force = mass × acceleration)\n**3rd Law:** Every action has an equal and opposite reaction (on different objects).\n\n## Terminal Velocity\nFalling object: air resistance increases with speed until air resistance = weight → constant speed.\n\n## Momentum\n**p = m × v** (momentum = mass × velocity)\n**Conservation of Momentum:** Total momentum before = Total momentum after (in closed system)\n**Impulse:** F × t = change in momentum = m(v - u)`,
    questions: [
      { q: 'What is the weight of a 5 kg object on Earth (g = 10 N/kg)?', opts: ['50 N', '0.5 N', '5 N', '500 N'], correct: 1, explain: 'W = m × g = 5 × 10 = 50 N.' },
      { q: 'A 2000 kg car accelerates at 3 m/s². What is the resultant force?', opts: ['6000 N', '667 N', '2003 N', '600 N'], correct: 1, explain: 'F = ma = 2000 × 3 = 6000 N.' },
      { q: 'When a gun fires a bullet, the gun recoils because of:', opts: ['Newton\'s 3rd Law', 'Newton\'s 1st Law', 'Conservation of energy', 'Gravity'], correct: 1, explain: 'The bullet pushes the gun backward with an equal and opposite force.' },
      { q: 'What is the momentum of a 10 kg object moving at 4 m/s?', opts: ['40 kg·m/s', '2.5 kg·m/s', '14 kg·m/s', '400 kg·m/s'], correct: 1, explain: 'p = m × v = 10 × 4 = 40 kg·m/s.' },
      { q: 'Terminal velocity is reached when:', opts: ['Air resistance equals weight', 'Air resistance is zero', 'The object stops', 'Weight is zero'], correct: 1, explain: 'At terminal velocity, upward air resistance = downward weight.' },
      { q: 'Why do crumple zones reduce injuries?', opts: ['They increase impact time, reducing force', 'They make the car lighter', 'They increase speed', 'They reduce mass'], correct: 1, explain: 'F = Δp/Δt. More time = less force for the same momentum change.' },
      { q: 'Which is NOT a contact force?', opts: ['Gravitational force', 'Friction', 'Tension', 'Normal reaction'], correct: 1, explain: 'Gravity acts at a distance — the others require contact.' },
      { q: 'A car brakes from 20 m/s to 0 in 4 s. What is the deceleration?', opts: ['5 m/s²', '80 m/s²', '0.2 m/s²', '24 m/s²'], correct: 1, explain: 'a = (0-20)/4 = -5 m/s², so deceleration = 5 m/s².' },
      { q: 'Two ice skaters push off. A (60 kg) moves at 2 m/s. B has mass 40 kg. B\'s velocity?', opts: ['3 m/s opposite direction', '2 m/s same direction', '3 m/s same direction', '1.33 m/s'], correct: 1, explain: '0 = 60×2 + 40×v → v = -3 m/s (opposite direction).' },
      { q: 'According to Newton\'s 1st Law, an object at rest stays at rest if:', opts: ['The resultant force is zero', 'No forces act on it', 'It is heavy', 'It is not moving'], correct: 1, explain: 'The 1st Law: no resultant force → no change in motion.' }
    ]
  },
  {
    name: 'Energy, Work & Power',
    lesson: `# Energy, Work & Power\n\n## Forms of Energy\nKinetic, GPE, Elastic PE, Chemical, Nuclear, Internal (thermal), Electrical, Sound, Light\n\n## Key Formulas\n**KE = ½mv²** — Kinetic energy\n**GPE = mgh** — Gravitational potential energy\n**EPE = ½kx²** — Elastic potential energy\n\n## Conservation of Energy\nEnergy cannot be created or destroyed, only transferred or transformed.\n\n## Work Done\n**W = F × d** (work = force × distance in direction of force)\n\n## Power\n**P = W / t = F × v**\n- Units: Watts (W = J/s)\n\n## Efficiency\n**Efficiency = (useful output / total input) × 100%**`,
    questions: [
      { q: 'What is the KE of a 2 kg object moving at 3 m/s?', opts: ['9 J', '6 J', '12 J', '18 J'], correct: 1, explain: 'KE = ½mv² = ½ × 2 × 9 = 9 J.' },
      { q: 'A 5 kg book is lifted 2 m. GPE gained? (g = 10)', opts: ['100 J', '50 J', '10 J', '25 J'], correct: 1, explain: 'GPE = mgh = 5 × 10 × 2 = 100 J.' },
      { q: 'Double the speed → KE becomes:', opts: ['4 times larger', '2 times larger', 'Same', 'Half'], correct: 1, explain: 'KE = ½mv². Doubling v means v² is 4× larger.' },
      { q: 'Efficiency of device using 500 J and producing 350 J useful?', opts: ['70%', '143%', '30%', '350%'], correct: 1, explain: 'Efficiency = (350/500) × 100% = 70%.' },
      { q: 'A 20 N force pushes a box 5 m. Work done?', opts: ['100 J', '25 J', '4 J', '200 J'], correct: 1, explain: 'W = F × d = 20 × 5 = 100 J.' },
      { q: 'A motor lifts 10 kg 4 m in 8 s. Useful power? (g=10)', opts: ['50 W', '400 W', '5 W', '80 W'], correct: 1, explain: 'P = W/t = mgh/t = (10×10×4)/8 = 50 W.' },
      { q: 'When brakes are applied, KE converts mainly to:', opts: ['Internal (thermal) energy', 'Chemical energy', 'Nuclear energy', 'GPE'], correct: 1, explain: 'Braking converts KE to heat via friction.' },
      { q: 'Energy stored in a stretched rubber band is:', opts: ['Elastic PE', 'Kinetic', 'Chemical', 'Nuclear'], correct: 1, explain: 'A stretched material stores elastic potential energy.' },
      { q: 'Power is defined as:', opts: ['Rate of doing work', 'Force × distance', 'Energy × time', 'Mass × velocity'], correct: 1, explain: 'Power = work done / time = rate of energy transfer.' },
      { q: 'Energy cannot be created or destroyed. This is:', opts: ['Conservation of energy', 'Conservation of momentum', 'Newton\'s 1st Law', 'Conservation of mass'], correct: 1, explain: 'Total energy in a closed system remains constant.' }
    ]
  },
  {
    name: 'Pressure & Density',
    lesson: `# Pressure & Density\n\n## Pressure\n**P = F / A** (pressure = force / area)\n- Units: Pascals (Pa = N/m²)\n\n## Liquid Pressure\n**P = ρgh** (density × g × depth)\n- Increases with depth\n- Same at same depth in all directions\n\n## Density\n**ρ = m / V** (density = mass / volume)\n- Water: 1000 kg/m³ = 1 g/cm³\n\n## Float or Sink?\n- ρ_object < ρ_fluid → floats\n- ρ_object > ρ_fluid → sinks\n\n## Boyle's Law (constant T)\n**P₁V₁ = P₂V₂** — pressure inversely proportional to volume`,
    questions: [
      { q: '50 N force on 0.5 m². Pressure?', opts: ['100 Pa', '25 Pa', '50.5 Pa', '0.01 Pa'], correct: 1, explain: 'P = F/A = 50/0.5 = 100 Pa.' },
      { q: 'Pressure in liquid depends on:', opts: ['Density, g, and depth', 'Container shape', 'Total volume', 'Temperature only'], correct: 1, explain: 'P = ρgh — only density, gravitational field strength, and depth.' },
      { q: 'Object: mass 200 g, volume 50 cm³. Density?', opts: ['4 g/cm³', '0.25 g/cm³', '10000 g/cm³', '250 g/cm³'], correct: 1, explain: 'ρ = m/V = 200/50 = 4 g/cm³.' },
      { q: 'Pressure at 5 m depth in water? (ρ=1000, g=10)', opts: ['50,000 Pa', '5,000 Pa', '500 Pa', '50 Pa'], correct: 1, explain: 'P = ρgh = 1000 × 10 × 5 = 50,000 Pa.' },
      { q: 'Halve gas volume at constant T → pressure:', opts: ['Doubles', 'Halves', 'Stays same', 'Quadruples'], correct: 1, explain: 'Boyle\'s Law: V halves → P doubles.' },
      { q: 'Why does a sharp knife cut better?', opts: ['Smaller area → higher pressure', 'It is heavier', 'More force', 'Stronger material'], correct: 1, explain: 'P = F/A. Smaller area = higher pressure for same force.' },
      { q: 'An object floats because:', opts: ['Its density < water\'s density', 'It has no weight', 'Water pushes it down', 'It is hollow'], correct: 1, explain: 'Floats when ρ_object < ρ_water (1000 kg/m³).' },
      { q: 'Squeeze a sealed syringe (no air escape) → pressure:', opts: ['Increases', 'Decreases', 'Stays same', 'Becomes zero'], correct: 1, explain: 'Boyle\'s Law: decreasing V increases P.' },
      { q: '1000 kg/m³ in g/cm³ is:', opts: ['1 g/cm³', '10 g/cm³', '100 g/cm³', '0.001 g/cm³'], correct: 1, explain: '1000 kg/m³ = 1 g/cm³.' },
      { q: 'Atmospheric pressure decreases with:', opts: ['Altitude', 'Temperature', 'Humidity', 'Wind speed'], correct: 1, explain: 'Less air above at higher altitude → less pressure.' }
    ]
  },
  {
    name: 'Thermal Physics & Kinetic Theory',
    lesson: `# Thermal Physics & Kinetic Theory\n\n## Kinetic Theory\nAll matter = particles in constant random motion.\n\n## States of Matter\nSolid: fixed shape, fixed volume, particles vibrate in place\nLiquid: takes container shape, fixed volume, particles slide past each other\nGas: fills container, no fixed volume, particles move freely\n\n## Changes of State\nMelting, boiling, evaporation, condensation, freezing, sublimation\nDuring state change, temperature stays constant — energy breaks bonds.\n\n## Internal Energy\n= total KE of particles + total PE of bonds\n\n## Specific Heat Capacity\n**Q = mcΔT** — energy to raise temperature\nWater: c = 4200 J/kg°C (very high)\n\n## Specific Latent Heat\n**Q = mL** — energy to change state at constant temperature\nFusion (solid↔liquid), Vaporisation (liquid→gas)\n\n## Gas Laws\nBoyle's Law: PV = constant\nCharles's Law: V/T = constant\nIdeal Gas: PV = nRT`,
    questions: [
      { q: 'Energy to heat 2 kg water from 20°C to 80°C? (c=4200)', opts: ['504,000 J', '50,400 J', '5,040 J', '84,000 J'], correct: 1, explain: 'Q = mcΔT = 2 × 4200 × 60 = 504,000 J.' },
      { q: 'During boiling, temperature is constant because:', opts: ['Energy breaks bonds, not increases KE', 'No energy supplied', 'Water stopped absorbing heat', 'Temperature reached maximum'], correct: 1, explain: 'Energy goes into overcoming intermolecular forces.' },
      { q: 'Absolute zero in Celsius:', opts: ['-273°C', '0°C', '-100°C', '-373°C'], correct: 1, explain: 'Absolute zero = 0 K = -273°C.' },
      { q: 'Boiling vs evaporation: evaporation occurs:', opts: ['At any temperature, surface only', 'Only at boiling point', 'Only in closed containers', 'Faster than boiling'], correct: 1, explain: 'Evaporation is a surface phenomenon at any temperature.' },
      { q: 'Energy to melt 3 kg of ice at 0°C? (L=334,000 J/kg)', opts: ['1,002,000 J', '334,000 J', '111,333 J', '3,000 J'], correct: 1, explain: 'Q = mL = 3 × 334,000 = 1,002,000 J.' },
      { q: 'Charles\'s Law states V is proportional to:', opts: ['Absolute temperature (K)', 'Celsius temperature', 'Pressure', 'Mass'], correct: 1, explain: 'V/T = constant. T must be in Kelvin.' },
      { q: 'Particles in a gas move in:', opts: ['Constant random motion', 'Straight parallel lines', 'Circular paths', 'Fixed positions'], correct: 1, explain: 'Kinetic theory: constant, random, straight-line motion.' },
      { q: 'What happens to internal energy when ice melts?', opts: ['Increases (bonds break)', 'Decreases', 'Stays the same', 'Becomes negative'], correct: 1, explain: 'Energy is absorbed to break bonds, increasing internal energy.' },
      { q: 'Water has high specific heat capacity because:', opts: ['Strong hydrogen bonds between molecules', 'It is a good conductor', 'It is transparent', 'It is dense'], correct: 1, explain: 'Strong hydrogen bonds require lots of energy to weaken.' },
      { q: 'Convert 25°C to Kelvin:', opts: ['298 K', '273 K', '25 K', '373 K'], correct: 1, explain: 'K = °C + 273 = 25 + 273 = 298 K.' }
    ]
  },
  {
    name: 'Waves & Sound',
    lesson: `# Waves & Sound\n\n## What is a Wave?\nTransfers energy without transferring matter.\n\n## Transverse vs Longitudinal\nTransverse: particles vibrate perpendicular to wave direction (light, water, EM)\nLongitudinal: particles vibrate parallel (sound, P-waves)\n\n## Wave Equation\n**v = f × λ** (speed = frequency × wavelength)\n**T = 1/f**\n\n## Sound\nLongitudinal wave. Speed: ~340 m/s (air), ~1500 m/s (water), ~5000 m/s (steel)\nNeeds a medium — cannot travel through vacuum.\n\n## EM Spectrum (long wavelength → short)\nRadio → Microwave → Infrared → Visible → UV → X-ray → Gamma\nAll travel at c = 3 × 10⁸ m/s in vacuum.\nHigher frequency = more energy = more dangerous.\n\n## Refraction\nLight slows down and bends toward normal when entering denser medium.\nTotal internal reflection: occurs when angle > critical angle (denser → less dense).`,
    questions: [
      { q: 'Wave: f=50 Hz, λ=4 m. Speed?', opts: ['200 m/s', '12.5 m/s', '45 m/s', '2000 m/s'], correct: 1, explain: 'v = fλ = 50 × 4 = 200 m/s.' },
      { q: 'Sound waves are:', opts: ['Longitudinal', 'Transverse', 'Electromagnetic', 'Neither'], correct: 1, explain: 'Sound = longitudinal (compressions and rarefactions).' },
      { q: 'Which EM wave has highest frequency?', opts: ['Gamma rays', 'Radio waves', 'Microwaves', 'Visible light'], correct: 1, explain: 'Gamma = shortest wavelength = highest frequency.' },
      { q: 'Light enters glass from air. It:', opts: ['Slows down, bends toward normal', 'Speeds up, bends toward normal', 'Slows down, bends away', 'No change'], correct: 1, explain: 'Glass is denser → light slows and bends toward normal.' },
      { q: 'Echo takes 0.4 s from cliff (v=340 m/s). Distance?', opts: ['68 m', '136 m', '34 m', '17 m'], correct: 1, explain: 'd = vt/2 = 340 × 0.4/2 = 68 m.' },
      { q: 'In transverse waves, particles vibrate:', opts: ['Perpendicular to wave travel', 'Parallel to wave travel', 'Same direction as wave', 'Randomly'], correct: 1, explain: 'Transverse = perpendicular displacement.' },
      { q: 'Sound can\'t travel in space because:', opts: ['Space is a vacuum — needs a medium', 'Too slow', 'Absorbed by radiation', 'Gravity blocks it'], correct: 1, explain: 'Sound requires particles to vibrate.' },
      { q: 'Which colour bends most in a prism?', opts: ['Violet', 'Red', 'Green', 'Yellow'], correct: 1, explain: 'Violet has shortest λ → refracted most.' },
      { q: 'Speed of all EM waves in vacuum:', opts: ['3 × 10⁸ m/s', '340 m/s', '1500 m/s', 'Variable'], correct: 1, explain: 'All EM waves travel at c = 3 × 10⁸ m/s in vacuum.' },
      { q: 'Wave: v=600 m/s, f=200 Hz. Wavelength?', opts: ['3 m', '120,000 m', '0.33 m', '30 m'], correct: 1, explain: 'λ = v/f = 600/200 = 3 m.' }
    ]
  },
  {
    name: 'Electricity & Circuits',
    lesson: `# Electricity & Circuits\n\n## Key Quantities\n**I = Q/t** (current = charge flow / time)\n**V = W/Q** (PD = energy / charge)\n**R = V/I** (resistance)\n\n## Series vs Parallel\nSeries: current same, PD shared, R adds up\nParallel: PD same, current shared, R decreases\n\n## Ohm's Law\n**V = IR** (at constant temperature)\n\n## Power\n**P = VI = I²R = V²/R**\n\n## Energy\n**E = VIt**\n\n## Safety\nFuses, circuit breakers, earthing, double insulation\nBody resistance: ~1000-2000 Ω. 30 mA through heart = fatal.`,
    questions: [
      { q: '60 C flows in 2 minutes. Current?', opts: ['0.5 A', '30 A', '120 A', '5 A'], correct: 1, explain: 'I = Q/t = 60/120 = 0.5 A.' },
      { q: 'Series: 12 V battery, three 4 Ω resistors. Total R?', opts: ['12 Ω', '4 Ω', '1.33 Ω', '16 Ω'], correct: 1, explain: 'Series: R = 4+4+4 = 12 Ω.' },
      { q: 'Lamp: V=6 V, I=0.5 A. Resistance?', opts: ['12 Ω', '3 Ω', '6.5 Ω', '0.083 Ω'], correct: 1, explain: 'R = V/I = 6/0.5 = 12 Ω.' },
      { q: 'Parallel: two 10 Ω resistors. Total R?', opts: ['5 Ω', '20 Ω', '10 Ω', '0.1 Ω'], correct: 1, explain: '1/R = 1/10 + 1/10 = 1/5, so R = 5 Ω.' },
      { q: 'Device: 240 V, 2 A. Power?', opts: ['480 W', '120 W', '242 W', '238 W'], correct: 1, explain: 'P = VI = 240 × 2 = 480 W.' },
      { q: 'A fuse protects by:', opts: ['Melting and breaking circuit if current too high', 'Increasing current', 'Reducing voltage', 'Adding resistance'], correct: 1, explain: 'Fuse wire melts at specific current, breaking the circuit.' },
      { q: 'Most dangerous path through body:', opts: ['Across chest (through heart)', 'Same hand', 'Through legs', 'Across back'], correct: 1, explain: 'Current across chest → cardiac arrest.' },
      { q: 'LDR resistance in bright light:', opts: ['Decreases', 'Increases', 'Stays same', 'Becomes zero'], correct: 1, explain: 'LDR resistance decreases with more light.' },
      { q: '100 W device for 3 hours. Energy?', opts: ['0.3 kWh', '300 kWh', '30 kWh', '3 kWh'], correct: 1, explain: 'E = Pt = 100 × 3 = 300 Wh = 0.3 kWh.' },
      { q: 'V=10 V, I=2 A. Power dissipation?', opts: ['20 W', '5 W', '12 W', '8 W'], correct: 1, explain: 'P = VI = 10 × 2 = 20 W.' }
    ]
  },
  {
    name: 'Magnetism & Electromagnetism',
    lesson: `# Magnetism & Electromagnetism\n\n## Magnetism\n- Two poles: North and South. Like repel, unlike attract.\n- Magnetic materials: iron, steel, nickel, cobalt\n- Field lines: N to S outside, strongest at poles\n\n## Electromagnetism\n- Current-carrying wire produces concentric circular field\n- Solenoid = coil of wire, field like bar magnet inside\n- Electromagnet = solenoid + iron core (stronger, switchable)\n\n## Fleming's Left-Hand Rule (MOTOR)\nFirst finger = Field, SeCond finger = Current, Thumb = Motion\n\n## Motor Effect Force\n**F = BIL**\n\n## Electromagnetic Induction\nMoving conductor in magnetic field → induces voltage\nGenerator: coil rotating in field → AC\n\n## Split-ring commutator\nReverses current every half-turn in DC motor → continuous rotation`,
    questions: [
      { q: 'Two north poles brought together:', opts: ['Repel', 'Attract', 'Nothing', 'Merge'], correct: 1, explain: 'Like poles repel — fundamental property of magnets.' },
      { q: 'Advantage of electromagnet over permanent magnet:', opts: ['Can be switched on/off', 'Always stronger', 'Never loses magnetism', 'Cheaper'], correct: 1, explain: 'Control current → control magnetism.' },
      { q: 'In Fleming\'s Left-Hand Rule, first finger represents:', opts: ['Magnetic field (N to S)', 'Current', 'Motion', 'Voltage'], correct: 1, explain: 'First = Field, SeCond = Current, Thumb = Motion.' },
      { q: 'Which does NOT strengthen an electromagnet?', opts: ['Copper core instead of iron', 'More current', 'More turns', 'Iron core'], correct: 1, explain: 'Copper is not ferromagnetic — won\'t concentrate the field.' },
      { q: 'In a generator, induced current reverses because:', opts: ['Coil rotates, cutting direction reverses', 'Field changes direction', 'Wire moves faster', 'Circuit breaks'], correct: 1, explain: 'Rotation reverses the direction of field-line cutting each half-turn.' },
      { q: 'Converts electrical to mechanical energy:', opts: ['Motor', 'Generator', 'Transformer', 'Battery'], correct: 1, explain: 'Motor uses current + magnetic field → force/motion.' },
      { q: 'Converts mechanical to electrical energy:', opts: ['Generator', 'Motor', 'Electromagnet', 'Transformer'], correct: 1, explain: 'Generator uses electromagnetic induction.' },
      { q: 'Split-ring commutator in DC motor does:', opts: ['Reverses current each half-turn for continuous spin', 'Increases current', 'Changes field direction', 'Stops motor'], correct: 1, explain: 'Without it, coil rocks back and forth instead of spinning.' },
      { q: 'Mains supply uses:', opts: ['AC', 'DC', 'Both equally', 'Neither'], correct: 1, explain: 'Mains = alternating current (50/60 Hz).' },
      { q: 'Earth acts like a giant:', opts: ['Bar magnet', 'Electromagnet', 'Battery', 'Resistor'], correct: 1, explain: 'Earth\'s core generates a magnetic field similar to a bar magnet.' }
    ]
  },
  {
    name: 'Nuclear Physics',
    lesson: `# Nuclear Physics\n\n## The Atom\nProton (+1, mass 1), Neutron (0, mass 1), Electron (-1, mass ~0)\nAtomic number Z = protons. Mass number A = protons + neutrons.\n\n## Isotopes\nSame element (same Z), different neutrons (different A).\n\n## Radioactivity\nAlpha (α): helium nucleus (+2 charge), stopped by paper\nBeta (β⁻): electron (-1 charge), stopped by aluminium\nGamma (γ): EM wave (no charge), stopped by thick lead\n\n## Half-Life\nTime for half the nuclei to decay. Activity halves each half-life.\nAfter n half-lives: Activity = Original × (½)ⁿ\n\n## Nuclear Fission\nHeavy nucleus splits → lighter nuclei + neutrons + energy\nChain reaction in nuclear power stations.\n\n## Nuclear Fusion\nLight nuclei combine → heavier nucleus + energy\nPowers stars. Requires millions of °C.`,
    questions: [
      { q: '²³⁵U: protons and neutrons?', opts: ['92p, 143n', '235p, 92n', '143p, 92n', '92p, 235n'], correct: 1, explain: 'Z=92 (protons). N = 235-92 = 143 (neutrons).' },
      { q: 'Which radiation stopped by paper?', opts: ['Alpha', 'Beta', 'Gamma', 'All'], correct: 1, explain: 'Alpha = least penetrating, stopped by paper/skin.' },
      { q: 'Count rate 800 Bq. After 3 half-lives?', opts: ['100 Bq', '200 Bq', '400 Bq', '267 Bq'], correct: 1, explain: '800 → 400 → 200 → 100 Bq.' },
      { q: 'In beta decay, a neutron becomes:', opts: ['Proton + electron', 'Two protons', 'Two neutrons', 'Alpha particle'], correct: 1, explain: 'n → p + e⁻ (electron emitted as β).' },
      { q: 'Isotopes have same number of:', opts: ['Protons', 'Neutrons', 'Electrons only', 'Nucleons'], correct: 1, explain: 'Same Z (protons), different N (neutrons).' },
      { q: 'What stops gamma radiation?', opts: ['Thick lead/concrete', 'Paper', 'Thin aluminium', 'Glass'], correct: 1, explain: 'Gamma = most penetrating, needs thick lead.' },
      { q: 'In fission, a heavy nucleus is:', opts: ['Split into lighter nuclei', 'Combined with another', 'Absorbed by neutron', 'Emits only gamma'], correct: 1, explain: 'Fission = splitting of a heavy nucleus.' },
      { q: 'Carbon-14 dating uses half-life of:', opts: ['~5730 years', '1 year', '100 years', '1 million years'], correct: 1, explain: 'C-14 half-life ≈ 5730 years for dating organic materials.' },
      { q: 'Gamma rays are:', opts: ['EM waves, no charge, no mass', 'Charged particles', 'Neutrons', 'Helium nuclei'], correct: 1, explain: 'Gamma = high-energy photons, zero charge and mass.' },
      { q: 'Nuclear fusion requires:', opts: ['Extremely high temperatures', 'Room temperature', 'A vacuum', 'Magnetic fields only'], correct: 1, explain: 'Millions of °C needed to overcome electrostatic repulsion.' }
    ]
  },
  {
    name: 'Earth & Space',
    lesson: `# Earth & Space\n\n## Solar System\n8 planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune\nInner = rocky (terrestrial). Outer = gas/ice giants.\n\n## Day/Night & Seasons\nDay/night: Earth rotates on axis (24 hours)\nSeasons: caused by 23.5° tilt of Earth's axis (NOT distance from Sun)\n\n## Moon\nOrbits Earth in ~27.3 days. Always shows same face (synchronous rotation).\nPhases: New → Waxing Crescent → First Quarter → Waxing Gibbous → Full → Waning\n\n## Eclipses\nSolar: Moon between Sun and Earth (new moon)\nLunar: Earth between Sun and Moon (full moon)\n\n## Universe\nBig Bang theory: universe began ~13.8 billion years ago\nEvidence: red shift of distant galaxies → universe expanding\nLight year: distance light travels in 1 year ≈ 9.46 × 10¹² km\n\n## Stars\nLife cycle: Nebula → Protostar → Main sequence → Red giant → (White dwarf or Supernova → Neutron star/Black hole)`,
    questions: [
      { q: 'What causes seasons?', opts: ['23.5° tilt of Earth\'s axis', 'Distance from Sun', 'Moon\'s gravity', 'Volcanic activity'], correct: 1, explain: 'Tilt means different hemispheres get more direct sunlight.' },
      { q: 'Earth\'s rotation period:', opts: ['24 hours', '365 days', '27.3 days', '12 hours'], correct: 1, explain: 'One rotation = one day = 24 hours.' },
      { q: 'Full moon arrangement:', opts: ['Sun → Earth → Moon', 'Sun → Moon → Earth', 'Moon → Sun → Earth', 'Earth → Sun → Moon'], correct: 1, explain: 'Full moon: Earth between Sun and Moon.' },
      { q: 'A light year is:', opts: ['Distance light travels in 1 year', 'Time for light to reach Earth', 'One year of light', 'A bright star'], correct: 1, explain: 'Light year = ~9.46 × 10¹² km (distance, not time).' },
      { q: 'Red shift shows:', opts: ['Universe is expanding', 'Universe is shrinking', 'Stars dying', 'Light slows down'], correct: 1, explain: 'Red shift → galaxies moving away → expanding universe → Big Bang.' },
      { q: 'Which planet is hottest?', opts: ['Venus', 'Mercury', 'Jupiter', 'Mars'], correct: 1, explain: 'Venus: thick CO₂ atmosphere → runaway greenhouse (462°C).' },
      { q: 'Solar eclipse occurs during:', opts: ['New moon', 'Full moon', 'First quarter', 'Third quarter'], correct: 1, explain: 'Moon must be between Sun and Earth → new moon.' },
      { q: 'Stars produce energy by:', opts: ['Nuclear fusion of hydrogen', 'Chemical burning', 'Nuclear fission', 'Gravity alone'], correct: 1, explain: 'Fusion: hydrogen → helium in the core.' },
      { q: 'How many planets in solar system?', opts: ['8', '9', '7', '10'], correct: 1, explain: '8 planets (Pluto is a dwarf planet).' },
      { q: 'Stars are born from:', opts: ['Nebula (gas and dust cloud)', 'Black holes', 'Planets', 'Comets'], correct: 1, explain: 'Nebula collapses under gravity to form protostars.' }
    ]
  }
];

async function main() {
  const SUBJECT_LEVEL_ID = '6c6ca869-7b5f-4654-8c5a-bd015afdc45d';
  let topicCount = 0, questionCount = 0;

  for (const topic of topics) {
    topicCount++;
    console.log(`\n=== Topic ${topicCount}/${topics.length}: ${topic.name} ===`);

    // Insert topic (no slug column)
    const tr = await query(`INSERT INTO topics (subject_level_id, name, description, sort_order, created_at) VALUES ('${SUBJECT_LEVEL_ID}', ${esc(topic.name)}, ${esc(topic.name + ' - IGCSE Physics')}, ${topicCount}, now()) RETURNING id`);
    const tid = tr.rows ? tr.rows[0].id : tr[0]?.id;

    // Insert lesson
    const lr = await query(`INSERT INTO lessons (topic_id, title, content, sort_order, created_at) VALUES ('${tid}', ${esc(topic.name)}, ${esc(topic.lesson)}, 1, now()) RETURNING id`);

    // Insert quiz
    const qr = await query(`INSERT INTO quizzes (topic_id, title, description, is_published, created_at) VALUES ('${tid}', ${esc(topic.name + ' Quiz')}, ${esc('Test your knowledge of ' + topic.name)}, true, now()) RETURNING id`);
    const qid = qr.rows ? qr.rows[0].id : qr[0]?.id;

    // Insert questions (options as JSONB array)
    for (let i = 0; i < topic.questions.length; i++) {
      const q = topic.questions[i];
      await query(`INSERT INTO questions (quiz_id, question_text, options, correct_option, explanation, sort_order, created_at) VALUES ('${qid}', ${esc(q.q)}, '${JSON.stringify(q.opts)}', ${q.correct}, ${esc(q.explain)}, ${i + 1}, now())`);
      questionCount++;
    }
    console.log(`  ✓ ${topic.questions.length} questions`);
  }

  console.log(`\n=== DONE: ${topicCount} topics, ${topicCount} lessons, ${topicCount} quizzes, ${questionCount} questions ===`);
}

main().catch(console.error);
