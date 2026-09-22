const fs = require("fs");
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://zzliiazovezhxbmfeqco.supabase.co';
const SERVICE_KEY = (fs.readFileSync(".freebuff/get-keys.cjs", "utf8").match(/sbp_[a-f0-9]+/) || [])[0];
const PROJECT_REF = 'zzliiazovezhxbmfeqco';

// Use Management API to get service_role key first
const https = require('https');

function getApiKey() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.supabase.com',
      path: `/v1/projects/${PROJECT_REF}/api-keys`,
      method: 'GET',
      headers: { Authorization: `Bearer ${SERVICE_KEY}` }
    };
    const req = https.request(options, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const keys = JSON.parse(data);
          const serviceKey = keys.find(k => k.name === 'service_role');
          const anonKey = keys.find(k => k.name === 'anon');
          resolve({ serviceKey: serviceKey?.api_key, anonKey: anonKey?.api_key });
        } catch(e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

async function main() {
  const keys = await getApiKey();
  console.log('Got keys:', keys.serviceKey ? 'service_role ✓' : 'service_role ✗');

  const supabase = createClient(SUPABASE_URL, keys.serviceKey || keys.anonKey);

  const SUBJECT_LEVEL_ID = 'fc2155c8-9d4d-4896-b1c1-fac0a2810f5b'; // Physics OL

  // Check existing
  const { data: existing } = await supabase.from('topics').select('id').eq('subject_level_id', SUBJECT_LEVEL_ID);
  if (existing && existing.length > 0) {
    console.log(`Physics OL already has ${existing.length} topics. Skipping.`);
    return;
  }

  const topics = [
    {
      name: 'Measurement & Units',
      lesson: '# Measurement & Units\n\n## What is Physics?\nPhysics is the study of the natural world.\n\n## SI Base Units\n| Quantity | Unit | Symbol |\n|----------|------|--------|\n| Length | metre | m |\n| Mass | kilogram | kg |\n| Time | second | s |\n| Temperature | kelvin | K |\n| Current | ampere | A |\n\n## Derived Units\n- Force: Newton (N) = kg·m/s²\n- Energy: Joule (J) = N·m\n- Power: Watt (W) = J/s\n- Pressure: Pascal (Pa) = N/m²\n\n## Prefixes\nkilo (k) = 10³, milli (m) = 10⁻³, micro (μ) = 10⁻⁶, nano (n) = 10⁻⁹\n\n## Speed\nv = s/t. Convert km/h to m/s: ×5/18\n\n## Acceleration\na = (v-u)/t\n\n## SUVAT Equations\n1. v = u + at\n2. s = ut + ½at²\n3. v² = u² + 2as\n\n## Scalars vs Vectors\nScalars: distance, speed, mass. Vectors: displacement, velocity, force.',
      questions: [
        { q: 'SI unit of force?', opts: ['Newton (N)', 'Joule (J)', 'Watt (W)', 'Pascal (Pa)'], correct: 1 },
        { q: 'Convert 72 km/h to m/s:', opts: ['20 m/s', '72 m/s', '25.9 m/s', '2.59 m/s'], correct: 1 },
        { q: 'Acceleration from rest to 30 m/s in 6s?', opts: ['5 m/s²', '180 m/s²', '0.2 m/s²', '10 m/s²'], correct: 1 },
        { q: 'Flat line on distance-time graph means:', opts: ['Stationary', 'Constant speed', 'Accelerating', 'Decelerating'], correct: 1 },
        { q: '"micro" (μ) represents:', opts: ['10⁻⁶', '10⁻³', '10⁻⁹', '10⁻²'], correct: 1 },
        { q: 'Average speed of 150km/2h + 90km/1h?', opts: ['80 km/h', '82.5 km/h', '90 km/h', '120 km/h'], correct: 1 },
        { q: 'Which is a vector?', opts: ['Velocity', 'Speed', 'Mass', 'Energy'], correct: 1 },
        { q: 'Area under v-t graph =', opts: ['Distance', 'Acceleration', 'Speed', 'Time'], correct: 1 },
        { q: 'Sig figs in 0.00540?', opts: ['3', '2', '4', '5'], correct: 1 },
        { q: 'Micrometer: main 4.5mm, circular 23. Reading?', opts: ['4.73 mm', '4.23 mm', '47.3 mm', '4.523 mm'], correct: 1 }
      ]
    },
    {
      name: 'Forces & Motion',
      lesson: '# Forces & Motion\n\n## Force\nA push or pull. Measured in Newtons (N).\n\n## Types\nContact: friction, air resistance, tension, normal reaction, upthrust\nNon-contact: gravity, electrostatic, magnetic\n\n## Weight\nW = m × g (g ≈ 10 N/kg on Earth)\n\n## Newton\'s Laws\n1st: Object stays at rest/constant velocity if no resultant force\n2nd: F = ma\n3rd: Action = reaction (on different objects)\n\n## Terminal Velocity\nFalling object: air resistance ↑ until = weight → constant speed\n\n## Momentum\np = m × v. Conservation: total momentum before = total after\nImpulse: F × t = Δp = m(v-u)',
      questions: [
        { q: 'Weight of 5kg on Earth (g=10)?', opts: ['50 N', '0.5 N', '5 N', '500 N'], correct: 1 },
        { q: '2000kg car, a=3 m/s². Force?', opts: ['6000 N', '667 N', '2003 N', '600 N'], correct: 1 },
        { q: 'Gun recoils due to:', opts: ['3rd Law', '1st Law', 'Energy conservation', 'Gravity'], correct: 1 },
        { q: 'Momentum of 10kg at 4 m/s?', opts: ['40 kg·m/s', '2.5 kg·m/s', '14 kg·m/s', '400 kg·m/s'], correct: 1 },
        { q: 'Terminal velocity when:', opts: ['Air resistance = weight', 'Air resistance = 0', 'Object stops', 'Weight = 0'], correct: 1 },
        { q: 'Crumple zones reduce injuries by:', opts: ['Increasing impact time', 'Making car lighter', 'Increasing speed', 'Reducing mass'], correct: 1 },
        { q: 'NOT a contact force:', opts: ['Gravity', 'Friction', 'Tension', 'Normal reaction'], correct: 1 },
        { q: 'Deceleration from 20→0 m/s in 4s?', opts: ['5 m/s²', '80 m/s²', '0.2 m/s²', '24 m/s²'], correct: 1 },
        { q: '60kg skater at 2m/s, 40kg skater velocity?', opts: ['3 m/s opposite', '2 m/s same', '3 m/s same', '1.33 m/s'], correct: 1 },
        { q: '1st Law: object at rest stays if:', opts: ['Resultant force = 0', 'No forces act', 'It is heavy', 'Not moving'], correct: 1 }
      ]
    },
    {
      name: 'Energy, Work & Power',
      lesson: '# Energy, Work & Power\n\n## KE = ½mv²\n## GPE = mgh\n## EPE = ½kx²\n\n## Conservation of Energy\nCannot be created or destroyed.\n\n## Work Done\nW = F × d\n\n## Power\nP = W/t = F × v. Units: Watts\n\n## Efficiency\n= (useful output / total input) × 100%',
      questions: [
        { q: 'KE of 2kg at 3m/s?', opts: ['9 J', '6 J', '12 J', '18 J'], correct: 1 },
        { q: 'GPE gained: 5kg lifted 2m (g=10)?', opts: ['100 J', '50 J', '10 J', '25 J'], correct: 1 },
        { q: 'Double speed → KE:', opts: ['Quadruples', 'Doubles', 'Same', 'Halves'], correct: 1 },
        { q: 'Efficiency: 500J in, 350J useful?', opts: ['70%', '143%', '30%', '350%'], correct: 1 },
        { q: 'Work: 20N for 5m?', opts: ['100 J', '25 J', '4 J', '200 J'], correct: 1 },
        { q: 'Motor: 10kg, 4m, 8s. Power? (g=10)', opts: ['50 W', '400 W', '5 W', '80 W'], correct: 1 },
        { q: 'Braking converts KE to:', opts: ['Internal energy', 'Chemical', 'Nuclear', 'GPE'], correct: 1 },
        { q: 'Stretched rubber band stores:', opts: ['Elastic PE', 'Kinetic', 'Chemical', 'Nuclear'], correct: 1 },
        { q: 'Power is:', opts: ['Rate of work', 'Force×distance', 'Energy×time', 'Mass×velocity'], correct: 1 },
        { q: 'Energy cannot be created/destroyed =', opts: ['Conservation of energy', 'Conservation of momentum', '1st Law', 'Conservation of mass'], correct: 1 }
      ]
    },
    {
      name: 'Pressure & Density',
      lesson: '# Pressure & Density\n\n## Pressure\nP = F/A. Units: Pa (N/m²)\n\n## Liquid Pressure\nP = ρgh\n\n## Density\nρ = m/V. Water = 1000 kg/m³\n\n## Float/Sink\nρ_object < ρ_fluid → float\n\n## Boyle\'s Law\nP₁V₁ = P₂V₂ (constant T)',
      questions: [
        { q: '50N on 0.5m². Pressure?', opts: ['100 Pa', '25 Pa', '50.5 Pa', '0.01 Pa'], correct: 1 },
        { q: 'Liquid pressure depends on:', opts: ['ρ, g, h', 'Container shape', 'Volume', 'Temperature only'], correct: 1 },
        { q: 'Density: 200g, 50cm³?', opts: ['4 g/cm³', '0.25', '10000', '250'], correct: 1 },
        { q: 'Pressure at 5m depth? (ρ=1000, g=10)', opts: ['50,000 Pa', '5,000', '500', '50'], correct: 1 },
        { q: 'Halve volume at const T → pressure:', opts: ['Doubles', 'Halves', 'Same', 'Quadruples'], correct: 1 },
        { q: 'Sharp knife cuts better because:', opts: ['Smaller area → higher pressure', 'Heavier', 'More force', 'Stronger'], correct: 1 },
        { q: 'Object floats because:', opts: ['ρ_object < ρ_water', 'No weight', 'Water pushes down', 'Hollow'], correct: 1 },
        { q: 'Squeeze sealed syringe → pressure:', opts: ['Increases', 'Decreases', 'Same', 'Zero'], correct: 1 },
        { q: '1000 kg/m³ = ? g/cm³', opts: ['1', '10', '100', '0.001'], correct: 1 },
        { q: 'Atmospheric pressure decreases with:', opts: ['Altitude', 'Temperature', 'Humidity', 'Wind'], correct: 1 }
      ]
    },
    {
      name: 'Thermal Physics',
      lesson: '# Thermal Physics\n\n## Kinetic Theory\nMatter = particles in constant random motion.\n\n## States\nSolid (fixed shape), Liquid (fixed volume), Gas (fills container)\n\n## State Changes\nTemp constant during change — energy breaks bonds.\n\n## Q = mcΔT (specific heat capacity)\nWater c = 4200 J/kg°C\n\n## Q = mL (latent heat)\n\n## Gas Laws\nBoyle: PV = const\nCharles: V/T = const\nIdeal: PV = nRT',
      questions: [
        { q: 'Heat 2kg water 20→80°C? (c=4200)', opts: ['504,000 J', '50,400', '5,040', '84,000'], correct: 1 },
        { q: 'Temp constant during boiling because:', opts: ['Energy breaks bonds', 'No energy supplied', 'Water stopped absorbing', 'Max temp reached'], correct: 1 },
        { q: 'Absolute zero =', opts: ['-273°C', '0°C', '-100°C', '-373°C'], correct: 1 },
        { q: 'Evaporation occurs:', opts: ['At any temp, surface only', 'Only at boiling point', 'Only in containers', 'Faster than boiling'], correct: 1 },
        { q: 'Melt 3kg ice (L=334,000)?', opts: ['1,002,000 J', '334,000', '111,333', '3,000'], correct: 1 },
        { q: 'Charles\'s Law: V ∝', opts: ['T (Kelvin)', 'T (Celsius)', 'Pressure', 'Mass'], correct: 1 },
        { q: 'Gas particles move in:', opts: ['Random straight lines', 'Parallel lines', 'Circles', 'Fixed positions'], correct: 1 },
        { q: 'Internal energy when ice melts:', opts: ['Increases', 'Decreases', 'Same', 'Negative'], correct: 1 },
        { q: 'Water has high c because:', opts: ['Strong H-bonds', 'Good conductor', 'Transparent', 'Dense'], correct: 1 },
        { q: '25°C in Kelvin?', opts: ['298 K', '273 K', '25 K', '373 K'], correct: 1 }
      ]
    },
    {
      name: 'Waves & Sound',
      lesson: '# Waves & Sound\n\n## Wave\ Transfers energy, not matter.\n\n## Transverse vs Longitudinal\nTransverse: perpendicular (light, water)\nLongitudinal: parallel (sound)\n\n## v = fλ, T = 1/f\n\n## Sound\n~340 m/s (air). Needs medium.\n\n## EM Spectrum\nRadio→μwave→IR→Visible→UV→X-ray→Gamma\nc = 3×10⁸ m/s in vacuum\n\n## Refraction\nLight slows, bends toward normal in denser medium.\nTotal internal reflection when angle > critical angle.',
      questions: [
        { q: 'v = fλ: f=50Hz, λ=4m. Speed?', opts: ['200 m/s', '12.5', '45', '2000'], correct: 1 },
        { q: 'Sound waves are:', opts: ['Longitudinal', 'Transverse', 'EM', 'Neither'], correct: 1 },
        { q: 'Highest freq EM wave:', opts: ['Gamma', 'Radio', 'μwave', 'Visible'], correct: 1 },
        { q: 'Light enters glass:', opts: ['Slows, bends toward normal', 'Speeds up, toward normal', 'Slows, bends away', 'No change'], correct: 1 },
        { q: 'Echo 0.4s from cliff (v=340). Distance?', opts: ['68 m', '136', '34', '17'], correct: 1 },
        { q: 'Transverse: particles vibrate', opts: ['Perpendicular to travel', 'Parallel', 'Same direction', 'Randomly'], correct: 1 },
        { q: 'Sound can\'t travel in space:', opts: ['Vacuum — needs medium', 'Too slow', 'Absorbed', 'Gravity blocks'], correct: 1 },
        { q: 'Colour bending most in prism:', opts: ['Violet', 'Red', 'Green', 'Yellow'], correct: 1 },
        { q: 'EM speed in vacuum:', opts: ['3×10⁸ m/s', '340', '1500', 'Variable'], correct: 1 },
        { q: 'v=600, f=200. Wavelength?', opts: ['3 m', '120000', '0.33', '30'], correct: 1 }
      ]
    },
    {
      name: 'Electricity & Circuits',
      lesson: '# Electricity\n\n## I = Q/t, V = W/Q, R = V/I\n\n## Series: current same, PD shared\n## Parallel: PD same, current shared\n\n## Ohm\'s Law: V = IR\n\n## Power: P = VI = I²R = V²/R\n\n## Safety\nFuses, circuit breakers, earthing. 30mA through heart = fatal.',
      questions: [
        { q: '60C in 2 min. Current?', opts: ['0.5 A', '30', '120', '5'], correct: 1 },
        { q: 'Series: 12V, three 4Ω. Total R?', opts: ['12 Ω', '4', '1.33', '16'], correct: 1 },
        { q: 'V=6V, I=0.5A. R?', opts: ['12 Ω', '3', '6.5', '0.083'], correct: 1 },
        { q: 'Parallel: two 10Ω. Total R?', opts: ['5 Ω', '20', '10', '0.1'], correct: 1 },
        { q: '240V, 2A. Power?', opts: ['480 W', '120', '242', '238'], correct: 1 },
        { q: 'Fuse protects by:', opts: ['Melting if current too high', 'Increasing current', 'Reducing voltage', 'Adding resistance'], correct: 1 },
        { q: 'Most dangerous body path:', opts: ['Across chest', 'Same hand', 'Legs', 'Back'], correct: 1 },
        { q: 'LDR in bright light:', opts: ['R decreases', 'R increases', 'Same', 'R = 0'], correct: 1 },
        { q: '100W for 3 hours. Energy?', opts: ['0.3 kWh', '300', '30', '3'], correct: 1 },
        { q: 'V=10, I=2. Power?', opts: ['20 W', '5', '12', '8'], correct: 1 }
      ]
    },
    {
      name: 'Magnetism & Electromagnetism',
      lesson: '# Magnetism\n\n## Magnets\nN/S poles. Like repel, unlike attract.\n\n## Electromagnetism\nCurrent → magnetic field. Solenoid + iron core = electromagnet.\n\n## Fleming\'s LHR\nFirst=F(ield), seCond=C(urrent), Thumb=M(otion)\n\n## Motor Effect: F = BIL\n\n## Induction\nMoving conductor in field → voltage. Generator = coil rotating in field → AC.\n\n## Split-ring commutator reverses current each half-turn.',
      questions: [
        { q: 'Two north poles:', opts: ['Repel', 'Attract', 'Nothing', 'Merge'], correct: 1 },
        { q: 'Electromagnet advantage:', opts: ['Switchable', 'Always stronger', 'Permanent', 'Cheaper'], correct: 1 },
        { q: 'LHR first finger =', opts: ['Field', 'Current', 'Motion', 'Voltage'], correct: 1 },
        { q: 'Doesn\'t strengthen electromagnet:', opts: ['Copper core', 'More current', 'More turns', 'Iron core'], correct: 1 },
        { q: 'Generator current reverses because:', opts: ['Coil rotates', 'Field changes', 'Wire speeds up', 'Circuit breaks'], correct: 1 },
        { q: 'Electrical→mechanical:', opts: ['Motor', 'Generator', 'Transformer', 'Battery'], correct: 1 },
        { q: 'Mechanical→electrical:', opts: ['Generator', 'Motor', 'Electromagnet', 'Transformer'], correct: 1 },
        { q: 'Commutator does:', opts: ['Reverses current each half-turn', 'Increases current', 'Changes field', 'Stops motor'], correct: 1 },
        { q: 'Mains supply:', opts: ['AC', 'DC', 'Both', 'Neither'], correct: 1 },
        { q: 'Earth is like a:', opts: ['Bar magnet', 'Electromagnet', 'Battery', 'Resistor'], correct: 1 }
      ]
    },
    {
      name: 'Nuclear Physics',
      lesson: '# Nuclear Physics\n\n## Atom\np(+1), n(0), e(-1). Z=protons, A=protons+neutrons.\n\n## Isotopes\nSame Z, different N.\n\n## Radiation\nα: helium nucleus, stopped by paper\nβ: electron, stopped by aluminium\nγ: EM wave, stopped by lead\n\n## Half-life\nTime for half to decay. Activity = Orig × (½)ⁿ\n\n## Fission\nHeavy nucleus splits. Chain reaction → power stations.\n\n## Fusion\nLight nuclei combine. Powers stars.',
      questions: [
        { q: '²³⁵U: protons, neutrons?', opts: ['92p 143n', '235p 92n', '143p 92n', '92p 235n'], correct: 1 },
        { q: 'Stopped by paper:', opts: ['Alpha', 'Beta', 'Gamma', 'All'], correct: 1 },
        { q: '800 Bq after 3 half-lives?', opts: ['100 Bq', '200', '400', '267'], correct: 1 },
        { q: 'Beta decay: neutron becomes', opts: ['Proton + electron', 'Two protons', 'Two neutrons', 'Alpha'], correct: 1 },
        { q: 'Isotopes have same:', opts: ['Protons', 'Neutrons', 'Electrons only', 'Nucleons'], correct: 1 },
        { q: 'Stops gamma:', opts: ['Thick lead', 'Paper', 'Aluminium', 'Glass'], correct: 1 },
        { q: 'Fission = heavy nucleus:', opts: ['Splits', 'Combines', 'Absorbed', 'Emits gamma only'], correct: 1 },
        { q: 'C-14 half-life:', opts: ['~5730 years', '1 year', '100', '1M'], correct: 1 },
        { q: 'Gamma rays are:', opts: ['EM, no charge/mass', 'Charged', 'Neutrons', 'He nuclei'], correct: 1 },
        { q: 'Fusion requires:', opts: ['Millions of °C', 'Room temp', 'Vacuum', 'Magnets only'], correct: 1 }
      ]
    },
    {
      name: 'Earth & Space',
      lesson: '# Earth & Space\n\n## 8 planets\nInner=rocky (M,V,E,M). Outer=gas giants (J,S,U,N).\n\n## Seasons\nCaused by 23.5° tilt, NOT distance from Sun.\n\n## Moon\nOrbits in ~27.3 days. Phases: New→Full→New.\n\n## Eclipses\nSolar: Moon blocks Sun (new moon)\nLunar: Earth blocks Sun to Moon (full moon)\n\n## Universe\nBig Bang ~13.8B years ago. Evidence: red shift.\nLight year = distance in 1 year ≈ 9.46×10¹² km.',
      questions: [
        { q: 'Seasons caused by:', opts: ['23.5° tilt', 'Distance from Sun', 'Moon', 'Volcanoes'], correct: 1 },
        { q: 'Earth\'s rotation:', opts: ['24 hours', '365 days', '27.3 days', '12 hours'], correct: 1 },
        { q: 'Full moon arrangement:', opts: ['Sun→Earth→Moon', 'Sun→Moon→Earth', 'Moon→Sun→Earth', 'Earth→Sun→Moon'], correct: 1 },
        { q: 'Light year is:', opts: ['Distance light travels in 1 year', 'Time for light', 'One year of light', 'Bright star'], correct: 1 },
        { q: 'Red shift shows:', opts: ['Universe expanding', 'Shrinking', 'Stars dying', 'Light slows'], correct: 1 },
        { q: 'Hottest planet:', opts: ['Venus', 'Mercury', 'Jupiter', 'Mars'], correct: 1 },
        { q: 'Solar eclipse at:', opts: ['New moon', 'Full moon', '1st quarter', '3rd quarter'], correct: 1 },
        { q: 'Stars powered by:', opts: ['Nuclear fusion', 'Chemical burning', 'Fission', 'Gravity alone'], correct: 1 },
        { q: 'Planets in solar system:', opts: ['8', '9', '7', '10'], correct: 1 },
        { q: 'Stars born from:', opts: ['Nebula', 'Black holes', 'Planets', 'Comets'], correct: 1 }
      ]
    }
  ];

  let totalQ = 0;
  for (let i = 0; i < topics.length; i++) {
    const t = topics[i];
    console.log(`\n[${i+1}/${topics.length}] ${t.name}`);

    const { data: topic, error: te } = await supabase.from('topics').insert({
      subject_level_id: SUBJECT_LEVEL_ID,
      name: t.name,
      description: t.name + ' - IGCSE Physics',
      sort_order: i + 1
    }).select().single();

    if (te) { console.log('  Topic error:', te.message); continue; }
    console.log(`  Topic: ${topic.id}`);

    const { data: lesson, error: le } = await supabase.from('lessons').insert({
      topic_id: topic.id,
      title: t.name,
      content: t.lesson,
      sort_order: 1
    }).select().single();

    if (le) { console.log('  Lesson error:', le.message); continue; }

    const { data: quiz, error: qe } = await supabase.from('quizzes').insert({
      topic_id: topic.id,
      title: t.name + ' Quiz',
      description: 'Test your knowledge of ' + t.name,
      is_published: true
    }).select().single();

    if (qe) { console.log('  Quiz error:', qe.message); continue; }

    const questions = t.questions.map((q, idx) => ({
      quiz_id: quiz.id,
      question_text: q.q,
      options: q.opts,
      correct_option: q.correct,
      explanation: q.explain || '',
      sort_order: idx + 1
    }));

    const { error: qe2 } = await supabase.from('questions').insert(questions);
    if (qe2) { console.log('  Questions error:', qe2.message); continue; }

    totalQ += questions.length;
    console.log(`  ✓ ${questions.length} questions`);
  }

  console.log(`\n=== DONE: ${topics.length} topics, ${topics.length} lessons, ${topics.length} quizzes, ${totalQ} questions ===`);
}

main().catch(console.error);
