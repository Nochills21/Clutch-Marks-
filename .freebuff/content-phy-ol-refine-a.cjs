#!/usr/bin/env node
/**
 * Physics IGCSE — refinement batch A.
 *
 * Five notes, one teaching section each. Every section does the same three
 * things, because that is what "deeper" means on this platform:
 *
 *   1. it draws the thing instead of describing it (an inline SVG figure, built
 *      by .freebuff/note-figures.cjs so all figures share one hand);
 *   2. it says why the rule is true, not just what the rule is — the sentence a
 *      student needs when the question changes shape;
 *   3. it works one number end to end, relation → substitution → result, and
 *      names the trap the mark scheme punishes.
 *
 * Apply with:
 *   node .freebuff/refine-note-sections.cjs .freebuff/content-phy-ol-refine-a.cjs
 *   node .freebuff/apply-sql-file.cjs .freebuff-tmp/note-refine.sql            (dry run)
 *   node .freebuff/apply-sql-file.cjs .freebuff-tmp/note-refine.sql --apply    (live)
 */
const fig = require("./note-figures.cjs");

/* ------------------------------------------------------------------ */
/* 1. Forces and Motion — a velocity–time graph read line by line      */
/* ------------------------------------------------------------------ */

const velocityTime = fig.plot({
  id: "fig-fm-vt",
  title:
    "Velocity–time graph of a car: 4 s of constant acceleration, 4 s at constant velocity, then 2 s of braking",
  label: "Figure 1.",
  caption:
    "The gradient of each segment is the acceleration on that segment, and the shaded area is the distance travelled while the car is accelerating or at constant speed. A velocity–time graph never shows where the car is — only how fast it is going and how that speed changes.",
  x: { min: 0, max: 10, label: "time / s", ticks: [0, 2, 4, 6, 8, 10] },
  y: { min: 0, max: 30, label: "velocity / m s⁻¹", ticks: [0, 10, 20, 30] },
  series: [
    { kind: "area", points: [[0, 0], [4, 24], [8, 24]], color: fig.C.goldFill },
    { points: [[0, 0], [4, 24], [8, 24], [10, 0]], color: fig.C.gold },
  ],
  hidden: [{ x: 4 }, { x: 8 }, { y: 24 }],
  annotations: [
    { x: 0.2, y: 21, text: "a = 24 ÷ 4 = 6 m s⁻²", anchor: "start", color: fig.C.goldDeep, weight: "600" },
    { x: 4.3, y: 28.5, text: "a = 0: constant velocity", anchor: "start" },
    { x: 9.9, y: 28, text: "a = −12 m s⁻²", anchor: "end", color: fig.C.goldDeep, weight: "600" },
    { x: 2.1, y: 7, text: "area = distance", anchor: "middle", color: fig.C.ink },
  ],
});

const forcesSection = `
<h2>Reading a motion graph line by line</h2>
<p>A velocity–time graph is not a picture of the journey. It is a table of two quantities, drawn so that the arithmetic can be done with a ruler. That is the whole idea, and it is why the graph rewards a student who knows what to look for and punishes one who reads it like a map.</p>
${velocityTime}
<p>Read the graph above in the order the journey happened, and at every segment ask two questions: <em>what is the gradient</em> and <em>what is the area underneath</em>. The answers are always the same two quantities, just measured over different intervals.</p>
<table border="1" cellpadding="6">
<tr><th>Segment</th><th>Gradient (Δv ÷ Δt)</th><th>What it means</th><th>Area under that segment</th></tr>
<tr><td>0 s to 4 s</td><td>24 ÷ 4 = 6 m s⁻²</td><td>Constant acceleration: the velocity rises by 6 m s⁻¹ every second</td><td>½ × 4 × 24 = 48 m</td></tr>
<tr><td>4 s to 8 s</td><td>0 ÷ 4 = 0</td><td>Constant velocity — <strong>not</strong> at rest. The car is still moving at 24 m s⁻¹</td><td>4 × 24 = 96 m</td></tr>
<tr><td>8 s to 10 s</td><td>−24 ÷ 2 = −12 m s⁻²</td><td>Deceleration: the velocity falls 12 m s⁻¹ each second</td><td>½ × 2 × 24 = 24 m</td></tr>
</table>
<p><strong>a = (v − u) / t</strong> <em>Key:</em> a = acceleration (m s⁻²); v = final velocity (m s⁻¹); u = initial velocity (m s⁻¹); t = time taken (s). The gradient is this equation rearranged — nothing more.</p>
<p><strong>Worked example.</strong> Find the total distance travelled and the average speed over the ten seconds.</p>
<p>Distance is the area under the whole line, so add the three segments:<br>
s = 48 m + 96 m + 24 m = 168 m</p>
<p>Average speed is total distance over total time, never the mean of the speeds:<br>
v<sub>avg</sub> = s / t = 168 m ÷ 10 s = 16.8 m s⁻¹</p>
<p>Notice what that number is <em>not</em>. The car spent most of the journey at 24 m s⁻¹, yet its average is 16.8 m s⁻¹, because the first four seconds and the last two were slower. A student who averages 6, 0 and −12 (or 24 and 0) gets a number with no meaning at all.</p>
<p><strong>The self-check that proves the area rule.</strong> For the first four seconds, u = 0, a = 6 m s⁻² and t = 4 s, so the equation of motion gives<br>
s = u t + ½ a t² = 0 + ½ × 6 × 4² = 48 m<br>
which is exactly the triangle's area. The area rule is not a separate law — it is that equation, drawn.</p>
<p><strong>Where marks are lost.</strong> Three traps account for almost every lost mark on this topic. Reading a <em>flat</em> line as "stopped" (it is constant velocity; only a line on the time axis is stationary). Measuring distance from the height of the line rather than the area under it. And forgetting that a negative velocity means travel in the opposite direction, so a journey out and back has a displacement near zero even though the distance is large — the areas on either side of the axis cancel, and the examiner asks for "distance" or "displacement" precisely to see whether you noticed.</p>
`;

/* ------------------------------------------------------------------ */
/* 2. Thermal Physics — the heating curve                              */
/* ------------------------------------------------------------------ */

const heatingCurve = fig.plot({
  id: "fig-th-heat",
  title:
    "Heating curve for 1 kg of ice: warming to 0 °C, melting at a constant temperature, then warming as water",
  label: "Figure 1.",
  caption:
    "One kilogram of ice heated at a steady rate. The sloping parts are temperature rising; the flat part is melting, where energy breaks the bonds between molecules instead of speeding them up. The boiling plateau for the same kilogram is 2,260 kJ long and runs far off the right of this scale.",
  x: { min: 0, max: 800, label: "energy supplied / kJ", ticks: [0, 200, 400, 600, 800] },
  y: { min: -20, max: 120, label: "temperature / °C", ticks: [-20, 0, 20, 40, 60, 80, 100] },
  series: [{ points: [[0, -20], [42, 0], [376, 0], [796, 100]], color: fig.C.gold }],
  hidden: [{ y: 0 }, { y: 100 }],
  annotations: [
    { x: 6, y: -14, text: "ice warming", anchor: "start", color: fig.C.ink, weight: "600" },
    { x: 60, y: 26, text: "melting: 334 kJ absorbed, 0 °C throughout", anchor: "start", color: fig.C.goldDeep, weight: "600" },
    { x: 470, y: 46, text: "water warming", anchor: "start", color: fig.C.ink, weight: "600" },
    { x: 700, y: 112, text: "boiling point reached", anchor: "middle" },
  ],
});

const thermalSection = `
<h2>Heating and cooling curves: what the flat parts are telling you</h2>
<p>Energy supplied to a substance does two completely different jobs, and the heating curve is the picture of which job is being done at each moment. Some of it raises the temperature — it makes the molecules move faster. Some of it breaks the attractions holding the molecules in place — it changes the state without changing the temperature at all. Students who see only "heat goes in, temperature goes up" cannot explain a flat line, and a flat line is where the marks are.</p>
${heatingCurve}
<p><strong>Why the sloping parts are sloping.</strong> On a sloping section the energy is going into kinetic energy of the particles, so the temperature must rise. How steep the slope is depends on how much energy one degree costs:</p>
<p><strong>E = m c Δθ</strong> <em>Key:</em> E = energy supplied (J); m = mass (kg); c = specific heat capacity (J kg⁻¹ °C⁻¹); Δθ = temperature rise (°C). Rearranged, the <em>gradient</em> of the heating curve is Δθ / E = 1 / (m c), so a larger mass or a larger specific heat capacity gives a shallower slope. That single rearrangement answers the "explain why this line is less steep" question that appears in almost every paper.</p>
<p><strong>Why the flat parts are flat.</strong> At 0 °C the ice is at its melting point: any further energy goes into pulling the molecules out of the rigid lattice, not into speeding them up, so the thermometer does not move while the ice turns to water. The energy needed per kilogram for that is the specific latent heat of fusion, and for water it is 334 kJ kg⁻¹:</p>
<p><strong>E = m L</strong> <em>Key:</em> E = energy absorbed at the change of state (J); m = mass that changes state (kg); L = specific latent heat (J kg⁻¹) — L<sub>f</sub> for melting, L<sub>v</sub> for boiling. No Δθ appears, because the temperature does not change.</p>
<p>The sizes are the lesson. For one kilogram: warming ice from −20 °C to 0 °C costs 42 kJ; melting it costs 334 kJ — eight times as much; warming the water to 100 °C costs 420 kJ; boiling it costs 2,260 kJ, more than all the rest together. That is why steam at 100 °C scalds far worse than water at 100 °C: the steam releases 2,260 kJ for every kilogram as it condenses on your skin, before any cooling begins.</p>
<p><strong>Worked example.</strong> How much energy is needed to turn 0.50 kg of ice at −10 °C into water at 20 °C? (c<sub>ice</sub> = 2,100 J kg⁻¹ °C⁻¹, L<sub>f</sub> = 334,000 J kg⁻¹, c<sub>water</sub> = 4,200 J kg⁻¹ °C⁻¹.)</p>
<p>Three stages, three equations, added at the end:<br>
warming the ice: E = m c Δθ = 0.50 × 2,100 × 10 = 10,500 J<br>
melting it: E = m L = 0.50 × 334,000 = 167,000 J<br>
warming the water: E = m c Δθ = 0.50 × 4,200 × 20 = 42,000 J<br>
total: E = 10,500 + 167,000 + 42,000 = 219,500 J ≈ 2.2 × 10⁵ J</p>
<p>Melting is 76% of that total, and it happens at a single temperature. A student who reaches for E = m c Δθ on the plateau gets zero for that stage, which is usually half the marks.</p>
<p><strong>Cooling is the same curve, read backwards.</strong> A cooling curve falls, plateaus at the freezing point, then falls again; the flat section is the latent heat being released as bonds re-form. The same two equations apply, with the same symbols — the only change is that energy leaves rather than arrives. Note also that Δθ is a <em>difference</em>, so °C and K give the same number; converting to kelvin is only needed when the equation uses the temperature itself, as the gas law does.</p>
<p><strong>Where marks are lost.</strong> Using the wrong specific heat capacity — ice, water and steam each have their own, and the examiner gives you all three to see whether you notice the change of state. Forgetting to add the stages. And writing "the energy is lost" for the flat part: nothing is lost, it is being used to break bonds.</p>
`;

/* ------------------------------------------------------------------ */
/* 3. Waves and Sound — the labels on a wave drawing                   */
/* ------------------------------------------------------------------ */

const waveFigure = fig.wave({
  id: "fig-wv-profile",
  title:
    "A transverse wave drawn to scale, with wavelength measured crest to crest and amplitude measured from the equilibrium line to a crest",
  label: "Figure 1.",
  caption:
    "Wavelength is the distance over which the wave repeats — crest to crest, trough to trough, or any point to the next identical point. Amplitude is measured from the dashed equilibrium line to a crest, never from a trough to a crest. The fainter dashed trace is the same wave half a period later.",
  wavelength: 168,
  amplitude: 48,
  cycles: 3,
});

const wavesSection = `
<h2>Drawing a wave to scale: what each label measures</h2>
<p>Two quantities decide everything a wave does, and both are measured on the same drawing — which is exactly why they get confused. The wavelength is how long one repeat of the wave is; the amplitude is how far the medium is displaced from where it would sit if the wave were not there. Get those two straight and the wave equation, the energy argument and the "describe what you see" question all follow from the same picture.</p>
${waveFigure}
<p><strong>Wavelength λ is a distance between identical points.</strong> Crest to crest works, trough to trough works, and so does any point to the next point doing exactly the same thing — a point on the way up to the next point on the way up, one full cycle later. What does not work is crest to trough: that is half a wavelength, and it is the single most common wrong answer on a wave diagram. In metres, λ is a length; the symbol is the Greek letter lambda.</p>
<p><strong>Amplitude A is measured from the middle, not from the bottom.</strong> The dashed line in the figure is the equilibrium position — where the rope or the air would be with no wave. Amplitude is the distance from that line to a crest, and it is the same distance from the line down to a trough. Trough-to-crest is <em>twice</em> the amplitude. The amplitude tells you how much energy the wave carries: doubling the amplitude quadruples the energy, which is why a loud sound at a concert can damage hearing far more than its extra loudness suggests.</p>
<p><strong>Frequency is the other half of the story.</strong> Frequency f is how many complete waves pass a point each second, measured in hertz (Hz), and it is set by the source, not by the medium. The period T is the time for one complete wave, so the two are reciprocals:</p>
<p><strong>f = 1 / T</strong> <em>Key:</em> f = frequency (Hz); T = period (s). A wave with a period of 0.004 s has a frequency of 1 ÷ 0.004 = 250 Hz.</p>
<p>Put the distance of one wave and the time for one wave together and you get the wave equation:</p>
<p><strong>v = f λ</strong> <em>Key:</em> v = wave speed (m s⁻¹); f = frequency (Hz); λ = wavelength (m). Multiplying "waves per second" by "metres per wave" leaves metres per second.</p>
<p><strong>Worked example.</strong> A tuning fork of frequency 512 Hz sends a sound through air in which the wavelength is 0.66 m. Find the speed of the sound.</p>
<p>v = f λ = 512 × 0.66 = 338 m s⁻¹</p>
<p>The answer is close to the accepted 340 m s⁻¹, which is the check to make in your head: if a sound speed comes out as 34 or 3,400, a power of ten has slipped, usually because a wavelength was left in centimetres.</p>
<p><strong>Which graph am I looking at?</strong> The same wave can be drawn against distance or against time, and the axis is the clue. A displacement–distance graph shows the wave frozen at one instant, so λ is read straight off the horizontal axis. A displacement–time graph shows one point of the medium as the wave passes, so the horizontal width of one cycle is the period T, not the wavelength. Students who read λ off a time graph get a number in seconds and a speed that is wrong by a factor of f — and the mark scheme gives nothing for the right arithmetic on the wrong quantity.</p>
<p><strong>Where marks are lost.</strong> Crest-to-trough as the wavelength. Trough-to-crest as the amplitude. Reading λ from a displacement–time graph. And forgetting that frequency does not change when a wave crosses into a new medium while its speed and wavelength do — that is exactly how refraction is explained.</p>
`;

/* ------------------------------------------------------------------ */
/* 4. Energy, Work and Power — reading a Sankey diagram                */
/* ------------------------------------------------------------------ */

const sankeyFigure = fig.sankey({
  id: "fig-en-sankey",
  title: "Sankey diagram of an electric motor: 200 J in, 150 J of kinetic energy out, 50 J wasted as heating",
  label: "Figure 1.",
  caption:
    "A Sankey diagram of an electric motor. The widths of the bands are the amounts of energy, so the input band is as wide as the two output bands together — that is the conservation of energy, drawn.",
  input: 200,
  useful: 150,
  wasted: 50,
  inLabel: "electrical energy in",
  usefulLabel: "useful kinetic energy",
  wastedLabel: "wasted by heating",
});

const energySection = `
<h2>Reading a Sankey diagram — and why its widths are the physics</h2>
<p>A Sankey diagram looks like decoration and is actually an equation. The width of each band is the amount of energy in that transfer, which means conservation of energy is visible as a shape: whatever goes in on the left comes out on the right, split into useful and wasted. Once you read the widths as numbers, efficiency stops being a formula to memorise and becomes a comparison of two lengths.</p>
${sankeyFigure}
<p><strong>Why the bands widen and narrow.</strong> Energy is never created or destroyed, only transferred between stores. A machine takes energy in one store, moves some of it to the store you wanted, and the rest to a store you did not — usually the thermal store of the surroundings. In the motor above, 200 J of electrical energy becomes 150 J of kinetic energy and 50 J of heating: 150 + 50 = 200, and the diagram cannot be drawn any other way.</p>
<p><strong>Efficiency = useful output ÷ total input</strong> <em>Key:</em> efficiency = the fraction of the energy supplied that ends up in the useful store (no unit, or %); useful output = energy in the store you wanted (J); total input = energy supplied (J).</p>
<p><strong>Worked example.</strong> For the motor above, find the efficiency and the energy wasted each second if it is supplied with 200 J every second.</p>
<p>efficiency = useful ÷ total = 150 ÷ 200 = 0.75 = 75%<br>
wasted per second = 200 J − 150 J = 50 J</p>
<p>The same number read as power: the motor is supplied with 200 W and delivers 150 W of useful mechanical power, so 50 W is transferred to the surroundings by heating. Efficiency is the same whether you use energy or power, because both sides are divided by the same time.</p>
<p><strong>The word the examiner wants for "wasted".</strong> Energy that does not reach the useful store is <em>dissipated</em> — spread out into the surroundings, usually by heating, at a slightly higher temperature. It has not disappeared, and writing "lost" invites the follow-up "where did it go?". Writing "dissipated to the surroundings by heating" earns it in one phrase.</p>
<p><strong>Chained efficiency: the reason a lamp is worse than it looks.</strong> Machines are usually in series, and efficiencies multiply. A power station converts fuel at about 40%, transmission through the grid keeps about 95%, and a filament lamp turns about 5% of what reaches it into light. The overall figure is<br>
0.40 × 0.95 × 0.05 = 0.019<br>
so roughly 2% of the chemical energy in the fuel leaves the lamp as light. Multiplying fractions that are all less than one gives an answer smaller than any of them, which is the arithmetic behind every "why is this so inefficient?" question.</p>
<p><strong>Where marks are lost.</strong> Drawing a Sankey whose output bands do not add up to the input band — it is a conservation diagram, and the mark scheme checks the widths. Quoting efficiency as a fraction when the question asks for a percentage, or the other way round. And describing the wasted arrow as "energy lost", which is both wrong and, in an exam, a marked error.</p>
`;

/* ------------------------------------------------------------------ */
/* 5. Electricity — I–V characteristics                                */
/* ------------------------------------------------------------------ */

const ivGraph = fig.plot({
  id: "fig-el-iv",
  title:
    "Current–voltage graphs for a fixed resistor and a filament lamp: a straight line through the origin, and a curve that flattens as the lamp heats",
  label: "Figure 1.",
  caption:
    "Current against voltage for two components. The resistor's straight line through the origin means its resistance is constant; the lamp's curve bends towards the horizontal because its resistance rises as the filament gets hotter.",
  x: { min: 0, max: 6, label: "potential difference / V", ticks: [0, 1, 2, 3, 4, 5, 6] },
  y: { min: 0, max: 0.6, label: "current / A", ticks: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6] },
  series: [
    { points: [[0, 0], [6, 0.6]], color: fig.C.gold },
    // A filament lamp is not a straight line: its resistance rises with
    // temperature, so the current saturates. Sampled finely and drawn as a
    // polyline — a few points joined by a smoothing pass overshoots the axis.
    {
      points: Array.from({ length: 25 }, (_, i) => {
        const V = i / 4;
        return [V, 0.6 * (1 - Math.exp(-V / 2.2))];
      }),
      color: fig.C.goldDeep,
    },
  ],
  annotations: [
    { x: 3.1, y: 0.06, text: "fixed resistor: I ∝ V", anchor: "start", color: fig.C.goldDeep, weight: "600" },
    { x: 0.55, y: 0.55, text: "filament lamp: gradient falls as it heats", anchor: "start" },
  ],
});

const electricitySection = `
<h2>I–V characteristics: what the shape of the graph proves</h2>
<p>A current–voltage graph is the fastest way to see what a component does, because its shape <em>is</em> the answer. A straight line through the origin says the resistance is constant; a curve says the resistance changes, and the direction of the bend says whether it rises or falls. This is one of the few places on the paper where you are asked to describe a shape and then explain it with particles.</p>
${ivGraph}
<p><strong>Ohm's law is a statement about constancy.</strong> For a metallic conductor kept at constant temperature, the current is directly proportional to the potential difference:</p>
<p><strong>R = V / I</strong> <em>Key:</em> R = resistance (Ω); V = potential difference across the component (V); I = current through it (A). A component obeys Ohm's law when R is the same at every point — that is, when the graph is a straight line through the origin, as the resistor's is.</p>
<p><strong>Why the lamp bends.</strong> As the current through a filament lamp increases, the filament gets hotter. In a metal, current is carried by electrons drifting through a lattice of vibrating ions; the hotter the metal, the more violently the ions vibrate and the more often they collide with the electrons. More collisions mean a harder push needed for the same current, so the resistance rises. On the graph, that shows up as the current increasing more and more slowly for each extra volt — the gradient falls. The lamp does not disobey Ohm's law; it simply does not meet the law's condition, because its temperature is not constant.</p>
<p><strong>The trap that costs a mark every year.</strong> On a curved characteristic, the resistance at a point is V ÷ I <em>at that point</em> — the ratio of the coordinates, not the gradient of the curve. The gradient has units of A V⁻¹, which is conductance, and using it here produces a number that is not a resistance at all. Read the coordinates off the curve and divide them.</p>
<p><strong>Worked example.</strong> Use the lamp's curve to find its resistance at 1.0 V and at 4.0 V, and explain the change.</p>
<p>At 1.0 V the curve gives I = 0.22 A, so R = V ÷ I = 1.0 ÷ 0.22 = 4.5 Ω.<br>
At 4.0 V the curve gives I = 0.51 A, so R = V ÷ I = 4.0 ÷ 0.51 = 7.8 Ω.</p>
<p>The resistance has almost doubled because the filament is far hotter at 4.0 V than at 1.0 V, so its ions vibrate more strongly and obstruct the electron drift more. The temperature rise, not the voltage itself, is the cause — say so explicitly, because "the resistance goes up because V goes up" is the answer that gets no credit.</p>
<p><strong>The two other shapes worth knowing.</strong> A diode conducts almost nothing in one direction and then, above about 0.6 V in the forward direction, its current rises steeply: its resistance falls as the voltage rises, the opposite of the lamp. A thermistor's resistance falls as its temperature rises, which is what makes it useful in a thermostat — the shape on its own graph is not the point, the direction of change is.</p>
<p><strong>Where marks are lost.</strong> Reading the gradient instead of V ÷ I. Describing the lamp's curve as "Ohm's law fails" without saying why. And forgetting the units: potential difference in volts, current in amperes, resistance in ohms — a characteristic read in milliamps gives a resistance a thousand times too small.</p>
`;

module.exports = {
  sections: [
    {
      id: "e08e10e6-d123-407a-877f-dcc7c82c3d5b",
      slug: "forces-motion-graphs",
      heading: "Reading a motion graph line by line",
      html: forcesSection,
    },
    {
      id: "944cae75-d042-4e44-adb7-84ee5a7e4f18",
      slug: "thermal-heating-curves",
      heading: "Heating and cooling curves: what the flat parts are telling you",
      html: thermalSection,
    },
    {
      id: "4c3feece-d824-42a8-88ae-a9f3c5c313f7",
      slug: "waves-drawing-to-scale",
      heading: "Drawing a wave to scale: what each label measures",
      html: wavesSection,
    },
    {
      id: "d371087c-b171-4536-ae7e-16eadfdba067",
      slug: "energy-sankey",
      heading: "Reading a Sankey diagram — and why its widths are the physics",
      html: energySection,
    },
    {
      id: "cad3375c-cc3e-4846-8a72-441509ebada1",
      slug: "electricity-iv-characteristics",
      heading: "I–V characteristics: what the shape of the graph proves",
      html: electricitySection,
    },
  ],
};
