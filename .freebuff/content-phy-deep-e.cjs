// Physics depth pass, tranche E: the three notes that landed 300–1,700 reading
// characters short of the 20,000 standard after their first section.
const F = require("./note-figures.cjs");
const { C, text, frame, plot, sankey } = F;

/* ── Figure: force-time graphs with the same impulse ─────────────────── */
const impulse = (() => {
  const hard = [];
  const soft = [];
  for (let t = 0; t <= 0.30; t += 0.005) {
    hard.push([+t.toFixed(3), +(t < 0.05 ? 2400 * Math.sin((t / 0.05) * Math.PI) : 0).toFixed(0)]);
  }
  for (let t = 0; t <= 0.30; t += 0.005) {
    soft.push([+t.toFixed(3), +(t < 0.25 ? 480 * Math.sin((t / 0.25) * Math.PI) : 0).toFixed(0)]);
  }
  return plot({
    id: "fm-impulse",
    title: "Force against time for a hard and a cushioned impact with the same impulse",
    label: "Figure 1.",
    caption:
      "Both curves enclose the same area, because the change in momentum is the same whatever the surface. The hard impact reaches a high force for a very short time; the cushioned one spreads the same impulse over five times as long, so the peak force is a fifth as large. That is the arithmetic behind a crumple zone, an airbag and a helmet.",
    w: 580,
    h: 330,
    x: { min: 0, max: 0.30, ticks: [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3], label: "time (s)" },
    y: { min: 0, max: 2600, ticks: [0, 650, 1300, 1950, 2600], label: "force (N)" },
    series: [
      { points: hard, color: C.goldDeep, width: 2.4, smooth: true },
      { points: soft, color: C.gold, width: 2.4, smooth: true },
    ],
    annotations: [
      { x: 0.07, y: 2100, text: "hard surface: 2.4 kN for 50 ms", dx: 6, dy: 0, color: C.goldDeep, size: 11.5 },
      { x: 0.16, y: 300, text: "cushioned: 0.48 kN for 250 ms", dx: 6, dy: -10, color: C.gold, size: 11.5 },
    ],
  });
})();

/* ── Figure: energy flow through a pump ──────────────────────────────── */
const pumpSankey = sankey({
  id: "wep-pump",
  title: "Energy flow through a pump drawing 5.0 kW and delivering 3.5 kW of useful work",
  label: "Figure 2.",
  caption:
    "The useful output is the gravitational potential energy gained by the water; the wasted energy appears as heat in the pump casing and the water, and no design removes all of it. Efficiency is the ratio of the two widths, 3,530 ÷ 5,000 = 71 %.",
  input: 5000,
  useful: 3530,
  wasted: 1470,
  unit: "W",
  inLabel: "electrical input",
  usefulLabel: "useful (lifting water)",
  wastedLabel: "wasted (heating)",
});

/* ── Figure: resonance curves at two damping levels ──────────────────── */
const resonance = (() => {
  const amp = (f, f0, gamma) => {
    const r = f / f0;
    return 1 / Math.sqrt((1 - r * r) ** 2 + (gamma * r) ** 2);
  };
  const light = [];
  const heavy = [];
  for (let f = 0.2; f <= 2.0; f += 0.04) {
    light.push([+f.toFixed(2), +amp(f, 1, 0.15).toFixed(2)]);
    heavy.push([+f.toFixed(2), +amp(f, 1, 0.7).toFixed(2)]);
  }
  return plot({
    id: "osc-resonance",
    title: "Amplitude of a driven oscillator against driving frequency, at two damping levels",
    label: "Figure 2.",
    caption:
      "Both curves peak at the natural frequency, but the lightly damped system peaks sharply and reaches a much larger amplitude, while the heavily damped one has a broad, low maximum. This is why a radio circuit is tuned to be lightly damped — it must respond to one frequency and ignore its neighbours — while a car suspension is damped heavily enough to avoid a violent bounce.",
    w: 580,
    h: 330,
    x: { min: 0.2, max: 2.0, ticks: [0.2, 0.6, 1.0, 1.4, 1.8], label: "driving frequency / natural frequency" },
    y: { min: 0, max: 7, ticks: [0, 2, 4, 6], label: "amplitude (arbitrary units)" },
    series: [
      { points: light, color: C.goldDeep, width: 2.4, smooth: true },
      { points: heavy, color: C.gold, width: 2.4, smooth: true },
    ],
    hidden: [{ x: 1, color: C.muted }],
    annotations: [
      { x: 1.04, y: 6.5, text: "light damping", dx: 6, dy: 0, color: C.goldDeep, size: 11.5 },
      { x: 1.5, y: 1.4, text: "heavy damping", dx: 6, dy: 0, color: C.gold, size: 11.5 },
      { x: 1, y: 0.35, text: "resonance", dx: 6, dy: 0, color: C.muted, size: 11 },
    ],
  });
})();

const furtherTopUp = `<h3>Reading a force-time graph, and why the area is the answer</h3>
<p>When the force is not constant, the impulse is still the change in momentum, and it is the area under the force-time graph (Figure 1). That single statement resolves the cases the equations cannot: a bat hitting a ball for eight milliseconds, a car crumpling against a barrier over a tenth of a second, a gymnast landing and absorbing the impact by bending their knees. In each case the change in momentum is fixed by the speeds before and after, so the area is fixed, and the only thing the surface can change is how that area is shaped — tall and narrow, or short and wide.</p>
<p>An average force is therefore the impulse divided by the total contact time, which is why a graph with a high peak and a long tail can have a modest average. That is the physical meaning of the "average force" a mark scheme asks for when it gives you a contact time rather than a curve, and it is why comparing peak forces between two surfaces requires the areas to be equal. If the cushioned impact has five times the contact time, its peak force is about a fifth of the hard impact's — provided the shapes are similar, which is the assumption worth stating.</p>
<p>Two checks catch most errors. The area must be counted with the time axis in seconds and the force axis in newtons, so a graph in milliseconds needs converting before multiplying. And the impulse must have the same sign as the change in momentum: if a ball rebounds, the change is the sum of the magnitudes of the before and after momenta, not the difference, and a graph of force against time for the rebound will show a single peak whose area equals that sum.</p>`;

const workTopUp = `<h3>The energy chain, drawn as a Sankey</h3>
<p>A Sankey diagram is the audit made visual: the width of each band is proportional to the energy or power it carries, and the bands must add up at every junction (Figure 2). For the pump in the worked example above, 5,000 W of electrical power enters, 3,530 W leaves as gravitational potential energy in the raised water, and 1,470 W leaves as heat in the pump and the water. The efficiency is the useful band divided by the input band, and the diagram makes it obvious that improving the pump means narrowing the wasted band, not widening the input.</p>
<p>Two skills are worth practising on such a diagram. Reading an efficiency off the widths: if the wasted band is a quarter of the input band, the efficiency is 75 %, without any calculation. And identifying where a further loss would appear: a leak in the pipework, a blocked filter or a worn bearing each adds a new wasted arrow, and the efficiency falls even though the motor is unchanged. That is the same reasoning a question uses when it asks why the efficiency of a real machine is lower than the data sheet claims — the data sheet describes the machine, not the installation.</p>`;

const oscillationsTopUp = `<h3>Resonance curves, and how damping changes the shape</h3>
<p>Plotting the amplitude of a driven oscillator against the driving frequency gives a curve that peaks at the natural frequency (Figure 2). The height and sharpness of that peak are controlled entirely by damping: a lightly damped system responds violently to a driving frequency close to its own and hardly at all to one far from it, while a heavily damped system responds weakly across a broad range. That trade-off is the whole of resonance engineering, and it is why the same physics produces both a tuning circuit and a car suspension.</p>
<p>Two quantitative readings are examinable. The resonant frequency is the frequency at which the amplitude is greatest, and for light damping it is almost exactly the natural frequency; as damping increases the peak shifts slightly downwards and flattens. And the phase between the driving force and the motion changes through the resonance: well below it the oscillator moves in step with the force, at resonance it lags by a quarter of a cycle, and well above it the motion is almost exactly out of step. That last fact is why a driven swing is pushed at the bottom of its arc rather than at the top.</p>`;

module.exports = {
  sections: [
    {
      id: "aa5be96b-372d-4bee-9a92-9a5530573c02",
      slug: "further-mechanics",
      heading: "Further Mechanics: reading a force-time graph",
      html: `<h2>Further Mechanics: reading a force-time graph</h2>\n<p>The area under a force-time graph is an impulse, and an impulse is a change in momentum. That one sentence covers every collision where the force is not constant, which is most real collisions, and it is the reasoning behind every safety device in a vehicle. This short section adds the graph reading and the average-force calculation to the conservation laws above.</p>\n` + furtherTopUp + "\n" + impulse + "\n",
    },
    {
      id: "c521dc16-c47b-4ecc-8b0d-4c38df77c482",
      slug: "work-energy-and-power",
      heading: "Work, Energy and Power: the energy chain as a diagram",
      html: `<h2>Work, Energy and Power: the energy chain as a diagram</h2>\n<p>A Sankey diagram turns the energy audit into a picture, and a picture is harder to get wrong than a list. This section reads one for a pump, then uses it to answer the efficiency questions that follow.</p>\n` + workTopUp + "\n" + pumpSankey + "\n",
    },
    {
      id: "17860f55-8ba0-4591-85d1-577aabc0b5af",
      slug: "oscillations-and-waves-ii",
      heading: "Oscillations: resonance curves and the phase lag",
      html: `<h2>Oscillations: resonance curves and the phase lag</h2>\n<p>Resonance is usually described in words, and the curve it produces is more informative than the sentence. This section reads the amplitude-frequency curve, then adds the phase relationship that most answers leave out.</p>\n` + oscillationsTopUp + "\n" + resonance + "\n",
    },
  ],
};
