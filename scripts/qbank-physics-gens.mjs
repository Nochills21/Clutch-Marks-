// Per-topic MCQ generator families for Cambridge IGCSE Physics (0625).
// Quantitative questions compute their correct answers from randomized inputs.
// Concept questions come from per-topic pools. `tier` is "core" or "extended".
import { numericMcq, fmt } from "./qbank-lib.mjs";

// Helper: concept question from a pool entry {q, correct, wrong[], ex}
function pool(r, entries) {
  const e = r.pick(entries);
  return { question_text: e.q, options: r.shuffle([e.correct, ...e.wrong]), correct_option: -1, explanation: e.ex, __pool: true };
}
function finalize(q) {
  if (!q.__pool) return q;
  const i = q.options.indexOf(q.options.find((o) => o === q.__correct));
  // correct was placed during shuffle inside pool(); recompute index:
  return q;
}
function poolQ(r, entries) {
  const e = r.pick(entries);
  const opts = r.shuffle([e.correct, ...e.wrong]);
  return {
    question_text: e.q,
    options: opts,
    correct_option: opts.indexOf(e.correct),
    explanation: e.ex,
  };
}

export const PHYSICS_GENS = {
  // ---- Topic 1: Motion, forces and energy ----
  "1": [
    (r, tier) => {
      const t = r.pick([2, 4, 5, 8, 10, 20]);
      const v = tier === "extended" ? r.int(12, 60) : r.int(2, 12);
      const d = v * t;
      return numericMcq(r, `A car travels ${d} m at a constant speed of ${v} m/s. How long does the journey take?`,
        t, [t * 2, fmt(d / (v * 2)), t + 2],
        `t = d / v = ${d} / ${v} = ${t} s.`);
    },
    (r) => {
      const m = r.pick([2, 4, 5, 8, 10, 25]);
      return numericMcq(r, `What is the weight of a ${m} kg object? (g = 10 N/kg)`, m * 10, [m / 10, m, m + 10],
        `W = mg = ${m} × 10 = ${m * 10} N.`);
    },
    (r, tier) => {
      const m = r.pick([2, 3, 5, 8]);
      const v = tier === "extended" ? r.pick([6, 8, 10, 12]) : r.pick([2, 4, 6]);
      const ke = 0.5 * m * v * v;
      return numericMcq(r, `A ${m} kg ball moves at ${v} m/s. Its kinetic energy is:`, ke, [m * v, 0.5 * m * v, m * v * v],
        `KE = ½mv² = ½ × ${m} × ${v}² = ${ke} J.`);
    },
    (r) => {
      const m = r.pick([20, 50, 100, 200, 500]);
      const V = r.pick([10, 20, 25, 50, 100]);
      const rho = m / V;
      return numericMcq(r, `A block of mass ${m} g has volume ${V} cm³. Its density is:`,
        fmt(rho), [fmt(m * V), fmt(V / m), fmt(rho * 10)],
        `ρ = m/V = ${m}/${V} = ${fmt(rho)} g/cm³.`);
    },
    (r) => {
      const F = r.pick([10, 20, 40, 60, 100]);
      const A = r.pick([2, 4, 5, 10]);
      const p = F / A;
      return numericMcq(r, `A force of ${F} N acts on an area of ${A} m². The pressure is:`,
        fmt(p), [fmt(F * A), fmt(A / F), fmt(p * 2)],
        `p = F/A = ${F}/${A} = ${fmt(p)} Pa.`);
    },
    (r, tier) => {
      const F = r.pick([5, 10, 20, 25]);
      const d = r.pick([2, 4, 5, 8]);
      const W = F * d;
      if (tier === "extended") {
        const t = r.pick([2, 4, 5, 10]);
        const P = W / t;
        return numericMcq(r, `A ${F} N force moves an object ${d} m in ${t} s. The power developed is:`,
          P, [W * t, W, fmt(F * d * t)],
          `P = W/t = (${F}×${d})/${t} = ${fmt(P)} W.`);
      }
      return numericMcq(r, `A force of ${F} N moves an object ${d} m in the direction of the force. Work done:`,
        W, [F + d, F / d, d / F],
        `W = Fd = ${F} × ${d} = ${W} J.`);
    },
    () => poolQ(null, [
      { q: "A skydiver falls at constant velocity before opening the parachute. This is because:", correct: "Air resistance equals weight, so resultant force is zero", wrong: ["Air resistance is greater than weight", "Weight is greater than air resistance", "Gravity has stopped acting"], ex: "Constant velocity (terminal velocity) means zero resultant force: drag balances weight." },
      { q: "Which quantity is a vector?", correct: "Velocity", wrong: ["Speed", "Mass", "Temperature"], ex: "Vectors have magnitude and direction; speed, mass and temperature are scalars." },
      { q: "Newton's third law states that:", correct: "Forces occur in equal and opposite pairs acting on different bodies", wrong: ["F = ma", "An object stays at rest unless a force acts", "Momentum is always conserved"], ex: "Third law: action and reaction are equal, opposite, and act on different objects." },
      { q: "The moment of a force depends on:", correct: "The force and the perpendicular distance from the pivot", wrong: ["Only the size of the force", "The mass of the object", "The area of contact"], ex: "Moment = force × perpendicular distance from the line of action to the pivot." },
      { q: "Which energy store does a stretched spring have?", correct: "Elastic (strain) potential energy", wrong: ["Kinetic energy", "Gravitational potential energy", "Nuclear energy"], ex: "Deformation stores elastic potential energy, released when the spring returns to shape." },
      { q: "Efficiency is calculated as:", correct: "(useful energy output ÷ total energy input) × 100%", wrong: ["(total input ÷ useful output) × 100%", "useful output − wasted energy", "wasted energy ÷ useful output"], ex: "Efficiency compares useful output with total input, expressed as a fraction or percentage." },
    ]),
  ],
  // ---- Topic 2: Thermal physics ----
  "2": [
    (r) => {
      const c = r.pick([2, 4, 5, 8, 10]);
      const F = c * 9 / 5 + 32;
      return numericMcq(r, `Convert ${c}°C to degrees Fahrenheit (°F = 9/5 °C + 32).`,
        fmt(F), [fmt(c * 9 / 5), fmt(c + 32), fmt(c * 5 / 9 + 32)],
        `°F = 9/5 × ${c} + 32 = ${fmt(F)}°F.`);
    },
    (r, tier) => {
      const m = tier === "extended" ? r.pick([0.5, 1, 2, 4]) : r.pick([1, 2]);
      const c = 4200;
      const dT = r.pick([5, 10, 20]);
      const E = m * c * dT;
      return numericMcq(r, `How much energy raises ${m} kg of water by ${dT}°C? (c = 4200 J/kg°C)`,
        E, [m * dT * 1000, E / 2, m * 4200 + dT],
        `E = mcΔθ = ${m} × 4200 × ${dT} = ${fmt(E)} J.`);
    },
    () => poolQ(null, [
      { q: "Heat transfer in a solid metal rod happens mainly by:", correct: "Conduction", wrong: ["Convection", "Radiation", "Evaporation"], ex: "Lattice vibrations and free electrons pass energy along the rod: conduction." },
      { q: "Which surface is the best emitter of infrared radiation?", correct: "Dull black", wrong: ["Shiny white", "Shiny silver", "Smooth polished"], ex: "Dull black surfaces are the best absorbers and emitters; shiny surfaces reflect." },
      { q: "Convection currents can occur:", correct: "Only in liquids and gases (fluids)", wrong: ["In solids, liquids and gases", "Only in solids", "In a vacuum"], ex: "Convection needs fluid flow — density changes carry thermal energy in liquids/gases." },
      { q: "Evaporation differs from boiling because evaporation:", correct: "Happens at any temperature from the surface", wrong: ["Happens only at 100°C", "Needs an external heat source", "Does not cool the liquid"], ex: "Evaporation occurs at all temperatures at the surface and cools the remaining liquid." },
      { q: "The fixed points used to define a temperature scale are:", correct: "Melting point of ice and boiling point of water (at standard pressure)", wrong: ["Room temperature and body temperature", "Freezing point of mercury and steam", "Any two temperatures measured with a thermometer"], ex: "Scales are calibrated to reproducible fixed points: ice point (0°C) and steam point (100°C)." },
      { q: "A gas is compressed at constant temperature. Its pressure:", correct: "Increases because molecules hit the walls more often", wrong: ["Decreases because molecules move slower", "Stays the same", "Increases because molecules speed up"], ex: "Smaller volume → more frequent wall collisions → higher pressure (molecular speed unchanged)." },
    ]),
  ],
  // ---- Topic 3: Waves ----
  "3": [
    (r) => {
      const f = r.pick([2, 4, 5, 10, 50, 100]);
      const lam = r.pick([0.5, 1, 2, 3, 4]);
      const v = f * lam;
      return numericMcq(r, `A wave has frequency ${f} Hz and wavelength ${lam} m. Its speed is:`,
        v, [f / lam, lam / f, f + lam],
        `v = fλ = ${f} × ${lam} = ${v} m/s.`);
    },
    (r) => {
      const v = r.pick([300, 320, 340]);
      const f = r.pick([100, 200, 500]);
      const lam = v / f;
      return numericMcq(r, `Sound of frequency ${f} Hz travels at ${v} m/s in air. Its wavelength is:`,
        fmt(lam), [fmt(v * f), fmt(f / v), fmt(v / (2 * f))],
        `λ = v/f = ${v}/${f} = ${fmt(lam)} m.`);
    },
    () => poolQ(null, [
      { q: "The angle of incidence equals the angle of reflection:", correct: "Always, measured from the normal", wrong: ["Only for curved mirrors", "Only in rough surfaces", "Measured from the surface"], ex: "Law of reflection: equal angles, both measured from the normal." },
      { q: "Which list is in order of increasing wavelength?", correct: "Gamma rays, X-rays, ultraviolet, visible light", wrong: ["Radio, microwave, infrared", "Visible, ultraviolet, gamma", "X-rays, gamma rays, radio"], ex: "EM spectrum by increasing λ: gamma < X < UV < visible < IR < microwave < radio." },
      { q: "Sound cannot travel through:", correct: "A vacuum", wrong: ["Water", "Steel", "Air"], ex: "Sound needs a medium of particles; space is a vacuum so no sound." },
      { q: "Refraction happens because waves:", correct: "Change speed when entering a new medium", wrong: ["Lose energy in the new medium", "Reverse direction at the boundary", "Increase frequency"], ex: "Speed change at the boundary bends the wavefront; frequency stays constant." },
      { q: "A wave transfers:", correct: "Energy without transferring matter", wrong: ["Matter without energy", "Both matter and energy along the wave", "Neither matter nor energy"], ex: "Oscillations carry energy forward while particles stay near their fixed positions." },
      { q: "Total internal reflection can occur:", correct: "Only when travelling from a denser to a less dense medium beyond the critical angle", wrong: ["In any transparent medium at any angle", "Only from less dense to denser", "Only in mirrors"], ex: "TIR needs denser→less dense and angle of incidence greater than the critical angle." },
    ]),
  ],
  // ---- Topic 4: Electricity and magnetism ----
  "4": [
    (r) => {
      const I = r.pick([0.5, 1, 2, 3, 4]);
      const R = r.pick([2, 4, 5, 6, 10, 12]);
      const V = I * R;
      return numericMcq(r, `A current of ${I} A flows through a ${R} Ω resistor. The p.d. across it is:`,
        fmt(V), [fmt(I / R), fmt(R / I), fmt(V / 2)],
        `V = IR = ${I} × ${R} = ${fmt(V)} V.`);
    },
    (r) => {
      const V = r.pick([6, 12, 24, 230]);
      const P = r.pick([12, 24, 36, 60, 100]);
      const I = P / V;
      return numericMcq(r, `A ${P} W lamp runs on a ${V} V supply. The current it draws is:`,
        fmt(I), [fmt(V / P), fmt(V * P), fmt(I * 2)],
        `I = P/V = ${P}/${V} = ${fmt(I)} A.`);
    },
    (r) => {
      const I = r.pick([0.5, 2, 3, 5]);
      const t = r.pick([10, 20, 60, 120]);
      const Q = I * t;
      return numericMcq(r, `A current of ${I} A flows for ${t} s. The charge transferred is:`,
        Q, [I / t, t / I, Q * 2],
        `Q = It = ${I} × ${t} = ${Q} C.`);
    },
    (r) => {
      const R1 = r.pick([2, 3, 4, 6]), R2 = r.pick([6, 8, 12]);
      const Rp = (R1 * R2) / (R1 + R2);
      return numericMcq(r, `Two resistors, ${R1} Ω and ${R2} Ω, are connected in parallel. The combined resistance is:`,
        fmt(Rp), [R1 + R2, fmt(Math.abs(R2 - R1)), fmt(Rp * 2)],
        `1/R = 1/${R1} + 1/${R2} → R = (${R1}×${R2})/(${R1}+${R2}) = ${fmt(Rp)} Ω.`);
    },
    (r) => {
      const Np = r.pick([100, 200, 500]), Vs = r.pick([12, 24, 60]);
      const Vp = r.pick([120, 240]);
      const Ns = (Vs / Vp) * Np;
      return numericMcq(r, `A transformer has ${Np} primary turns and a primary p.d. of ${Vp} V. For a ${Vs} V output, the secondary turns needed are:`,
        fmt(Ns), [fmt((Vp / Vs) * Np), Np + Vs, fmt(Ns * 2)],
        `Ns = Np × Vs/Vp = ${Np} × ${Vs}/${Vp} = ${fmt(Ns)} turns.`);
    },
    () => poolQ(null, [
      { q: "In a series circuit, which quantity is the same at every point?", correct: "Current", wrong: ["Voltage", "Resistance", "Power"], ex: "Charge has one path, so current is common; p.d. shares across components." },
      { q: "An ohmic conductor at constant temperature has:", correct: "I proportional to V", wrong: ["V proportional to R", "I decreasing as V increases", "Constant current for any V"], ex: "Ohm's law: V = IR with constant R gives a straight I–V line through the origin." },
      { q: "The field lines of a bar magnet:", correct: "Point from the north pole to the south pole outside the magnet", wrong: ["Point south to north outside the magnet", "Cross each other between poles", "Exist only at the poles"], ex: "Field lines run N→S outside a magnet and never cross." },
      { q: "Which increases the strength of an electromagnet?", correct: "Increasing the current and adding an iron core", wrong: ["Reversing the current", "Removing the coils", "Using a plastic core"], ex: "More turns/current and a soft-iron core concentrate the field and strengthen it." },
      { q: "A step-up transformer increases:", correct: "Voltage (and decreases current)", wrong: ["Current (and decreases voltage)", "Both voltage and current", "Frequency of the supply"], ex: "Power is (ideally) constant: raising V lowers I; transformers only work on a.c." },
    ]),
  ],
  // ---- Topic 5: Nuclear physics ----
  "5": [
    (r) => {
      const initial = r.pick([80, 160, 200, 400]);
      const half = r.pick([2, 5, 10]);
      const n = r.int(2, 3);
      const remaining = initial / Math.pow(2, n);
      const time = half * n;
      return numericMcq(r, `A sample of ${initial} g has a half-life of ${half} hours. After ${time} hours, how much remains?`,
        fmt(remaining), [fmt(initial / 2), fmt(initial / Math.pow(2, n + 1)), fmt(initial - half * n)],
        `${time} h = ${n} half-lives: ${initial} → ${fmt(initial / 2)} → ${fmt(remaining)} g.`);
    },
    () => poolQ(null, [
      { q: "Which radiation is stopped by a few centimetres of air or paper?", correct: "Alpha (α)", wrong: ["Beta (β)", "Gamma (γ)", "X-rays"], ex: "Alpha particles are heavy and highly ionising — paper or a few cm of air absorbs them." },
      { q: "Beta decay changes the nucleus because:", correct: "A neutron turns into a proton (and an electron is emitted)", wrong: ["A proton turns into a neutron", "The nucleus loses two protons", "The nucleus absorbs an electron"], ex: "β⁻ decay: n → p + e⁻, so the proton number rises by one." },
      { q: "Which nuclear process powers the Sun?", correct: "Nuclear fusion of hydrogen", wrong: ["Nuclear fission of uranium", "Combustion of hydrogen", "Radioactive decay of helium"], ex: "Hydrogen nuclei fuse into helium at extreme temperature and pressure, releasing energy." },
      { q: "Background radiation comes from:", correct: "Cosmic rays, rocks and radon gas (natural sources)", wrong: ["Only nuclear power stations", "Only medical X-rays", "Mobile phones"], ex: "Most background is natural: cosmic rays, radon, rocks and food; small fraction is man-made." },
      { q: "Isotopes of an element have:", correct: "The same number of protons but different numbers of neutrons", wrong: ["Different numbers of protons", "The same number of neutrons but different protons", "Different chemical properties"], ex: "Isotopes share proton number (element identity) but differ in neutron number." },
    ]),
  ],
  // ---- Topic 6: Space physics ----
  "6": [
    (r) => {
      const T = r.pick([2, 4, 5, 8, 10]); // years
      const rAU = r.pick([1, 2, 4, 5, 9]); // AU
      const v = (2 * Math.PI * rAU * 1.5e8) / (T * 3.15e7); // m/s approx
      return numericMcq(r, `A planet orbits at ${rAU} AU (1 AU = 1.5×10⁸ km) with period ${T} years. Its orbital speed is closest to:`,
        fmt(Math.round(v / 1000)) + " km/s", [fmt(Math.round(v / 10)) + " km/s", fmt(Math.round(v / 1e6)) + " km/s", fmt(Math.round(v / 100)) + " km/s"],
        `v = 2πr/T = 2π×${fmt(rAU * 1.5e8)} km / (${T}×3.15×10⁷ s) ≈ ${fmt(Math.round(v / 1000))} km/s.`);
    },
    () => poolQ(null, [
      { q: "The Sun is kept in equilibrium by:", correct: "Gravity pulling in and radiation/gas pressure pushing out", wrong: ["Magnetic fields alone", "Nuclear fission reactions", "The solar wind"], ex: "Hydrostatic balance: inward gravity against outward pressure from fusion energy." },
      { q: "Redshift of light from distant galaxies shows that:", correct: "The galaxies are moving away — the universe is expanding", wrong: ["Galaxies are approaching", "The Sun is shrinking", "Light slows down in space"], ex: "Wavelengths stretch as sources recede: evidence for cosmic expansion." },
      { q: "The CMB (cosmic microwave background) is evidence for:", correct: "The Big Bang", wrong: ["Steady state theory", "Black holes", "Dark matter"], ex: "CMB is relic radiation from the hot early universe — key Big Bang evidence." },
      { q: "A star like the Sun ends its life as a:", correct: "White dwarf", wrong: ["Neutron star", "Black hole", "Red supergiant"], ex: "Sun-mass stars swell to red giants, shed shells (planetary nebula) and cool as white dwarfs." },
      { q: "Orbital speed of a satellite depends on:", correct: "The radius of its orbit and the mass of the body it orbits", wrong: ["The satellite's own mass", "The satellite's colour", "Only time"], ex: "v = √(GM/r): set by central mass and orbital radius, not satellite mass." },
    ]),
  ],
  // ---- Practicals (Papers 5/6): measurement skills ----
  practical: [
    (r) => {
      const div = r.pick([1, 2, 5, 10]);
      return { question_text: `A measuring cylinder has scale divisions every ${div} mL. To what precision should a volume be recorded?`, options: [`To the nearest ${div} mL (or half-division estimated)`, `To the nearest 100 mL`, `To 4 decimal places`, `To the nearest litre`], correct_option: 0, explanation: `Record to the smallest division, estimating between divisions where appropriate.` };
    },
    () => poolQ(null, [
      { q: "Parallax error when reading a ruler is reduced by:", correct: "Placing the eye level with the reading, perpendicular to the scale", wrong: ["Using a shorter ruler", "Measuring in the dark", "Reading from an angle above"], ex: "Viewing perpendicular to the scale at the mark avoids an apparent (false) reading." },
      { q: "A zero error is:", correct: "A systematic error when an instrument does not read zero initially", wrong: ["A random error reduced by repeats", "An error caused by the observer's reaction time", "Always too large to correct"], ex: "Zero offsets shift every reading the same way — check and subtract or adjust the instrument." },
      { q: "To improve the reliability of a time measurement:", correct: "Repeat the timing and average the results", wrong: ["Use a stopwatch with fewer digits", "Time only once quickly", "Estimate from a graph"], ex: "Repeats identify anomalies and averaging reduces random error." },
      { q: "The most suitable instrument to measure the internal diameter of a test tube:", correct: "Vernier calipers", wrong: ["Metre rule", "Tape measure", "Micrometer screw gauge"], ex: "Calipers span internal widths; micrometers suit small external thicknesses." },
      { q: "In an experiment to find the period of a pendulum, you should time:", correct: "Several oscillations and divide by the number", wrong: ["A single swing from release", "Ten swings without counting them", "Only the return journey"], ex: "Timing many oscillations spreads reaction-time error over a longer interval." },
    ]),
  ],
};
