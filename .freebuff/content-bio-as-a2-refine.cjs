/**
 * Biology AS/A2 deepening: one teaching section per note, each with a drawn
 * figure and three subsections. Inserted before "Equations and symbols" by
 * refine-note-sections.cjs; nothing already in the note is rewritten.
 */
const F = require("./note-figures.cjs");
const { C } = F;

const r2 = (n) => Math.round(n * 100) / 100;

const cellCycle = F.plot({
  id: "bio-cell-cycle-dna",
  title: "DNA content of a nucleus through one cell cycle",
  label: "Figure 1.",
  caption: "DNA per nucleus rises from 2C to 4C during S phase and returns to 2C at the end of mitosis. Schematic, not measured data.",
  x: { min: 0, max: 10, ticks: [0, 2, 4, 6, 8, 10], label: "time through the cycle (arbitrary units)" },
  y: { min: 0, max: 4, ticks: [0, 1, 2, 3, 4], label: "DNA content (C)" },
  series: [{ points: [[0, 2], [3, 2], [5, 4], [7, 4], [8, 2], [10, 2]], kind: "line" }],
  annotations: [
    { x: 1.5, y: 2, text: "G1", dy: -8, anchor: "middle" },
    { x: 4, y: 2, text: "S", dy: -8, anchor: "middle" },
    { x: 6, y: 4, text: "G2", dy: -8, anchor: "middle" },
    { x: 7.5, y: 0.5, text: "mitosis", anchor: "middle" },
  ],
});

const quotient = F.plot({
  id: "bio-rq-fuels",
  title: "Carbon dioxide produced against oxygen consumed for two respiratory fuels",
  label: "Figure 1.",
  caption: "The slope of each line is the respiratory quotient. Carbohydrate gives a slope of 1.0; fat gives about 0.7. Idealised lines.",
  x: { min: 0, max: 10, ticks: [0, 2, 4, 6, 8, 10], label: "oxygen consumed (cm³)" },
  y: { min: 0, max: 10, ticks: [0, 2, 4, 6, 8, 10], label: "carbon dioxide produced (cm³)" },
  series: [
    { points: [[0, 0], [10, 10]], kind: "line" },
    { points: [[0, 0], [10, 7]], kind: "dashed", color: C.muted },
  ],
  annotations: [
    { x: 10, y: 10, text: "carbohydrate: RQ = 1.0", dx: -6, dy: -8, anchor: "end" },
    { x: 10, y: 7, text: "fat: RQ ≈ 0.7", dx: -6, dy: 16, anchor: "end" },
  ],
});

const membraneRate = F.plot({
  id: "bio-diffusion-surface",
  title: "Rate of net movement against concentration difference for two surface areas",
  label: "Figure 1.",
  caption: "For the same membrane and concentration difference, a larger surface area gives a faster net movement. Schematic.",
  x: { min: 0, max: 10, ticks: [0, 2, 4, 6, 8, 10], label: "concentration difference (arbitrary units)" },
  y: { min: 0, max: 16, ticks: [0, 4, 8, 12, 16], label: "rate of net movement (arbitrary units)" },
  series: [
    { points: [[0, 0], [10, 8]], kind: "line", color: C.muted },
    { points: [[0, 0], [10, 14]], kind: "line" },
  ],
  annotations: [
    { x: 10, y: 14, text: "larger surface area", dx: -6, dy: -8, anchor: "end" },
    { x: 10, y: 8, text: "smaller surface area", dx: -6, dy: 16, anchor: "end" },
  ],
});

const inhibition = (f) => {
  const pts = [];
  for (let s = 0; s <= 10; s += 1) pts.push([s, r2(f(s))]);
  return pts;
};

const inhibitionFigure = F.plot({
  id: "bio-enzyme-inhibition",
  title: "Reaction rate against substrate concentration with and without an inhibitor",
  label: "Figure 1.",
  caption: "A competitive inhibitor (dashed) is overcome by more substrate, so the curve reaches the same maximum. A non-competitive inhibitor (lower curve) lowers the maximum itself. Idealised curves.",
  x: { min: 0, max: 10, ticks: [0, 2, 4, 6, 8, 10], label: "substrate concentration (arbitrary units)" },
  y: { min: 0, max: 10, ticks: [0, 2, 4, 6, 8, 10], label: "rate of reaction (arbitrary units)" },
  series: [
    { points: inhibition((s) => (10 * s) / (2 + s)), kind: "line", smooth: true },
    { points: inhibition((s) => (10 * s) / (4 + s)), kind: "dashed", smooth: true, color: C.muted },
    { points: inhibition((s) => (5 * s) / (2 + s)), kind: "line", smooth: true, color: C.goldDeep },
  ],
  annotations: [
    { x: 10, y: 8.33, text: "no inhibitor", dx: -6, dy: -8, anchor: "end" },
    { x: 10, y: 7.14, text: "competitive", dx: -6, dy: 18, anchor: "end" },
    { x: 10, y: 4.17, text: "non-competitive", dx: -6, dy: 16, anchor: "end" },
  ],
});

const quadrats = F.plot({
  id: "bio-species-accumulation",
  title: "Species recorded against the number of quadrats sampled",
  label: "Figure 1.",
  caption: "The curve levels off once more quadrats stop adding new species. This shape is illustrative; a real curve comes from your own sample.",
  x: { min: 0, max: 20, ticks: [0, 4, 8, 12, 16, 20], label: "number of quadrats sampled" },
  y: { min: 0, max: 30, ticks: [0, 6, 12, 18, 24, 30], label: "species recorded" },
  series: [
    {
      points: Array.from({ length: 21 }, (_, q) => [q, r2(30 * (1 - Math.exp(-q / 4)))]),
      kind: "line",
      smooth: true,
    },
  ],
  annotations: [{ x: 11, y: 20, text: "levels off: new quadrats add few new species", dx: 0, dy: 0, anchor: "start" }],
});

const action = F.plot({
  id: "bio-action-potential",
  title: "Membrane potential against time for one action potential",
  label: "Figure 1.",
  caption: "Depolarisation to about +40 mV, repolarisation, and a brief hyperpolarisation during which a second impulse cannot start. Schematic.",
  x: { min: 0, max: 6, ticks: [0, 1, 2, 3, 4, 5, 6], label: "time (ms)" },
  y: { min: -80, max: 50, ticks: [-80, -60, -40, -20, 0, 20, 40], label: "membrane potential (mV)" },
  series: [
    {
      points: [[0, -70], [1, -70], [1.6, -55], [2, 40], [2.6, -80], [3.6, -72], [4.5, -70], [6, -70]],
      kind: "line",
    },
  ],
  hidden: [{ y: -55 }],
  annotations: [
    { x: 0.1, y: -55, text: "threshold (−55 mV)", dy: -6 },
    { x: 2, y: 40, text: "peak ≈ +40 mV", dx: 8, dy: 4 },
    { x: 3.2, y: -30, text: "refractory period: no second impulse", anchor: "middle" },
  ],
});

const light = F.plot({
  id: "bio-limiting-factors",
  title: "Rate of photosynthesis against light intensity at two CO₂ concentrations",
  label: "Figure 1.",
  caption: "At low light both curves share one slope, so light is limiting. The plateau is set by CO₂: more CO₂ raises the ceiling. Schematic.",
  x: { min: 0, max: 10, ticks: [0, 2, 4, 6, 8, 10], label: "light intensity (arbitrary units)" },
  y: { min: 0, max: 10, ticks: [0, 2, 4, 6, 8, 10], label: "rate of photosynthesis (arbitrary units)" },
  series: [
    { points: [[0, 0], [3, 6], [10, 6]], kind: "line", color: C.muted },
    { points: [[0, 0], [4.5, 9], [10, 9]], kind: "line" },
  ],
  annotations: [
    { x: 7, y: 6, text: "low CO₂: plateau set by CO₂", dy: -8, anchor: "middle" },
    { x: 7, y: 9, text: "higher CO₂: higher plateau", dy: -8, anchor: "middle" },
  ],
});

const immune = F.plot({
  id: "bio-primary-secondary",
  title: "Antibody concentration after a first and a second exposure to the same antigen",
  label: "Figure 1.",
  caption: "The second response starts at once from memory cells, rises faster, peaks higher and lasts longer. Schematic, not measured data.",
  x: { min: 0, max: 14, ticks: [0, 2, 4, 6, 8, 10, 12, 14], label: "time after first exposure (days)" },
  y: { min: 0, max: 10, ticks: [0, 2, 4, 6, 8, 10], label: "antibody concentration (arbitrary units)" },
  series: [
    { points: [[0, 0], [2, 0], [4, 2], [7, 5], [10, 2.5]], kind: "line", smooth: true, color: C.muted },
    { points: [[10, 2.5], [11, 6], [12, 9], [13, 8.5], [14, 7]], kind: "dashed", smooth: true },
  ],
  hidden: [{ x: 10 }],
  annotations: [
    { x: 6, y: 5.5, text: "first exposure", dy: -6, anchor: "middle" },
    { x: 12, y: 9, text: "second exposure: faster, higher", dx: 8, dy: 0, anchor: "start" },
  ],
});

const sections = [
  {
    id: "254175d8-d3d0-46bb-81a7-465f573dc717",
    slug: "cell-structure-reproduction-and-development",
    heading: "The cell cycle as a graph of DNA content",
    html: `<h2>The cell cycle as a graph of DNA content</h2>
<p>Interphase is not a rest period. It is the stage in which the cell grows, copies its DNA and checks the copy before it divides. Plotting the amount of DNA in one nucleus against time shows the whole cycle on a single graph, and questions on the cycle are often built on exactly that picture.</p>
${cellCycle}
<p><em>Key:</em> C = the DNA content of one haploid set; 2C = the diploid amount before the DNA is copied; 4C = the amount after S phase, when each chromosome consists of two sister chromatids that are still joined.</p>
<h3>G1, S and G2: the three parts of interphase</h3>
<p>In G1 the cell makes proteins and organelles and grows, and its DNA stays at 2C. In S phase the DNA is replicated semi-conservatively, so the nucleus moves from 2C to 4C. G2 follows: the cell makes the proteins needed for division and checks the replicated DNA for damage before it commits to mitosis. Checkpoints at the end of G1 and G2 can stop the cycle if the DNA is damaged, which is why a fault at these points can lead to uncontrolled division.</p>
<h3>Mitosis and the mitotic index</h3>
<p>Mitosis returns the nucleus to 2C by separating the sister chromatids at anaphase, so each daughter cell is diploid again. A root tip squash is used to observe it because the cells are fixed and stained, and the chromosomes can be seen at each stage. The mitotic index is the proportion of cells in a sample that are in mitosis: mitotic index = number of cells in mitosis ÷ total number of cells counted. A higher index means more cells are dividing at the moment of fixing; it does not by itself say how long each stage lasts.</p>
<h3>Why the graph matters for growth and stem cells</h3>
<p>Tissues that replace cells constantly, such as the epidermis, keep their cells cycling. Stem cells are the cells that keep dividing and whose daughters can specialise. Knowing where a cell sits on the graph tells you whether it can copy its DNA at all, which is why many cancer treatments target the cell cycle.</p>`,
  },
  {
    id: "0f02b6a6-e605-4244-b79a-ae4b44c853c6",
    slug: "membranes-proteins-dna-and-gene-expression",
    heading: "Factors that change the rate of diffusion and osmosis",
    html: `<h2>Factors that change the rate of diffusion and osmosis</h2>
<p>Diffusion across a membrane depends on the membrane and on the gradient across it. The rate of net movement rises with the concentration difference, with the surface area available for exchange, and it falls as the diffusion path gets longer. Osmosis is the same process for water alone: net movement of water across a partially permeable membrane, down a water potential gradient.</p>
${membraneRate}
<p><em>Key:</em> rate of diffusion ∝ (surface area × concentration difference) ÷ diffusion path length, where ∝ means "is proportional to", surface area is in m², concentration difference in mol m⁻³ and path length in m.</p>
<h3>Why surface area changes the rate</h3>
<p>The graph holds the concentration difference fixed and changes only the surface area. The steeper line has the larger area, and it moves more molecules per second for the same gradient. Cells that exchange materials quickly, such as the cells lining the small intestine, increase their surface area by folding the membrane, and that is why the same gradient is worked harder by a larger area.</p>
<h3>Osmosis in a plant tissue practical</h3>
<p>In the plant tissue osmosis practical, cylinders of plant tissue are placed in sucrose solutions of different concentrations and their mass is measured before and after. A gain in mass means water has moved into the cells, which happens when the solution is more dilute than the cell contents; a loss means water has left. The concentration at which the mass does not change is the one at which the solution and the cell sap are isotonic. Reading the result correctly depends on remembering that osmosis follows water potential, not the concentration of the solute alone.</p>
<h3>Common errors in the rate answer</h3>
<p>Students often say that a larger surface area makes diffusion faster because there is more space, without naming the gradient. A complete answer names the surface area, the concentration difference and the thinness of the membrane, and states that the rate is greater because more molecules cross per unit time.</p>`,
  },
  {
    id: "fe7f71d3-15f5-4c6c-836a-351016c8bf63",
    slug: "molecules-transport-and-health",
    heading: "Inhibitors: how competitive and non-competitive inhibitors change the rate graph",
    html: `<h2>Inhibitors: how competitive and non-competitive inhibitors change the rate graph</h2>
<p>An enzyme inhibitor slows a reaction by reducing the number of enzyme molecules that are working at a given moment. The two main types act in different places, and the rate graph shows the difference clearly: one can be overcome by adding substrate, the other cannot.</p>
${inhibitionFigure}
<p><em>Key:</em> the curves are idealised; the maximum rate is the rate with every active site occupied, and the substrate concentration needed to reach half of it is higher with a competitive inhibitor present.</p>
<h3>Competitive inhibition</h3>
<p>A competitive inhibitor has a shape similar to the substrate, so it binds to the active site and blocks the substrate from entering. Because the two compete, adding more substrate increases the chance that a substrate molecule meets the active site first. The maximum rate can still be reached, but it takes a higher substrate concentration, so the curve is shifted to the right.</p>
<h3>Non-competitive inhibition</h3>
<p>A non-competitive inhibitor binds to a site away from the active site, which changes the shape of the enzyme so that the active site no longer fits the substrate well. Adding more substrate does not remove this effect, because the inhibitor is not competing for the active site. The maximum rate falls, so the curve is flattened rather than shifted.</p>
<h3>Reading an inhibition graph in an exam</h3>
<p>Identify the curve with no inhibitor first. If the inhibited curve reaches the same maximum at high substrate, the inhibitor is competitive. If the maximum itself is lower, it is non-competitive. Name the site of binding and link the shape change to the fall in rate, rather than describing the graph alone.</p>`,
  },
  {
    id: "f6cc301d-7f8a-4ce2-b57a-4cf50f94b1fd",
    slug: "plant-structure-biodiversity-and-conservation",
    heading: "How many quadrats are enough: the species-accumulation curve",
    html: `<h2>How many quadrats are enough: the species-accumulation curve</h2>
<p>Species richness is the number of different species in a habitat. It cannot be counted directly in a large area, so a sample is taken. A single quadrat gives a poor estimate, and the question is how many quadrats are needed before the estimate stops changing. Plotting the cumulative number of species against the number of quadrats answers that question.</p>
${quadrats}
<p><em>Key:</em> species richness = the number of different species recorded; the curve is a running total, so it can only rise or stay level.</p>
<h3>Why the curve rises steeply and then levels off</h3>
<p>The first few quadrats each contain species not yet seen, so the curve climbs quickly. As sampling continues, most common species have already been recorded and each new quadrat adds fewer. The point where the curve flattens is the point at which more quadrats would add little information, and it is a reasonable sample size for the habitat.</p>
<h3>Random placement and bias</h3>
<p>Quadrats must be placed at random, for example with random coordinates, so that the sample is not chosen by the person sampling. Placing quadrats where the species look most interesting biases the count upwards for rare species and gives a misleading picture of the habitat. A random sample gives an estimate that can be compared between habitats.</p>
<h3>Using the curve in a habitat survey</h3>
<p>Two habitats can have different species richness, but a fair comparison needs the same sampling effort in each. If one habitat's curve is still rising at the end of the survey, its true richness has not been reached and the comparison is incomplete. In an answer, state the number of quadrats, say whether the curve had levelled off and explain how that affects confidence in the result.</p>`,
  },
  {
    id: "eb9a809a-a086-4f98-b365-670ae0c8f7aa",
    slug: "coordination-response-and-gene-technology",
    heading: "The refractory period and why impulses travel one way",
    html: `<h2>The refractory period and why impulses travel one way</h2>
<p>An action potential is a brief reversal of the membrane potential. At rest the inside of the axon is about −70 mV, maintained by the sodium–potassium pump, which moves three sodium ions out for every two potassium ions moved in. A stimulus that brings the membrane to threshold opens voltage-gated sodium channels, and the potential rises to about +40 mV before the channels close and potassium channels open to restore it.</p>
${action}
<p><em>Key:</em> membrane potential is measured in millivolts (mV); time is in milliseconds (ms); threshold is the potential at which the all-or-nothing response is triggered.</p>
<h3>The all-or-nothing response</h3>
<p>Below threshold nothing happens. Once threshold is reached, the full action potential follows, whatever the size of the stimulus. A stronger stimulus does not make a bigger impulse; it makes more neurones fire, or fires them more often, which is how the nervous system codes the intensity of a stimulus.</p>
<h3>The refractory period</h3>
<p>After the peak, the sodium channels are inactivated and cannot be opened again until the membrane has returned close to its resting potential. During this refractory period no second action potential can start in that region of the axon. Because the region just behind the impulse is refractory, the impulse cannot travel backwards, and it moves in one direction along the axon.</p>
<h3>Why the refractory period matters</h3>
<p>The refractory period limits how often a neurone can fire, which sets its maximum frequency, and it ensures that each impulse is separate from the one before. In an answer, link the one-way movement to the refractory region behind the impulse, and do not describe it as the membrane being unable to "rest".</p>`,
  },
  {
    id: "de2af4ab-d36e-4c26-9cf6-c1e5312f6dd9",
    slug: "energy-flow-ecosystems-and-environment",
    heading: "Limiting factors: reading the photosynthesis rate graph",
    html: `<h2>Limiting factors: reading the photosynthesis rate graph</h2>
<p>A limiting factor is the factor in shortest supply, which controls the rate of a process while the others are in excess. For photosynthesis the main candidates are light intensity, carbon dioxide concentration and temperature. A rate graph shows which one is limiting at each point, and reading it correctly is worth as much as the calculation of a rate.</p>
${light}
<p><em>Key:</em> the rising part of each curve is light-limited; the plateau is limited by something other than light, here carbon dioxide concentration, and would also be limited by temperature if that were the factor in shortest supply.</p>
<h3>Light-limited and CO₂-limited regions</h3>
<p>At low light intensity the two curves overlap. Light is the limiting factor, because raising the CO₂ concentration does not increase the rate. Light energy drives the light-dependent reactions, which make ATP and reduced NADP for the Calvin cycle, so when light is short the cycle cannot run faster whatever the CO₂ supply.</p>
<h3>Why the plateau is set by something else</h3>
<p>Beyond the knee, further light does not help. Now the rate is limited by the supply of carbon dioxide, which is fixed by RuBisCO in the Calvin cycle; a higher CO₂ concentration lifts the ceiling, so the higher curve reaches a higher plateau. Temperature limits the rate in a different way, by slowing the enzymes of the Calvin cycle.</p>
<h3>Writing the answer</h3>
<p>Name the limiting factor for each region, not for the graph as a whole. A strong answer says that the gradient is the same at low light because both curves are light-limited, and that the plateau differs because the CO₂ concentration differs. Avoid saying that "light stops being useful": more light is still absorbed, it is just no longer the factor that controls the rate.</p>`,
  },
  {
    id: "87af1d72-2a4f-41be-b34d-ae7156bc8ac9",
    slug: "microbiology-immunity-and-forensics",
    heading: "Primary and secondary responses: why a second exposure is met faster",
    html: `<h2>Primary and secondary responses: why a second exposure is met faster</h2>
<p>The first time the body meets an antigen, the immune system has to find the few B cells whose antibodies fit it, and let those cells divide. This takes days. A second exposure to the same antigen is met much more quickly, because the body keeps memory cells from the first response that are ready to act. The difference is the basis of vaccination.</p>
${immune}
<p><em>Key:</em> antigen = a molecule that triggers an immune response; antibody = a protein made by a plasma cell that binds a specific antigen; memory cell = a long-lived B or T cell produced in the first response.</p>
<h3>The primary response</h3>
<p>On first exposure there is a lag while the correct B cell is selected by clonal selection and divides into plasma cells. Antibody concentration rises to a peak and then falls as the infection is cleared. Because the number of specific B cells is small at the start, the lag is long and the peak is modest.</p>
<h3>The secondary response</h3>
<p>Memory cells are already present in greater numbers and respond at once. The lag is short, the antibody concentration rises more steeply and reaches a higher peak, and it is maintained for longer. The infection is often cleared before it causes symptoms, which is the protection a vaccine aims to produce.</p>
<h3>Comparing the two responses in an answer</h3>
<p>Compare the lag, the rate of rise, the peak and the duration for the two exposures, and say why each differs: the number of specific B cells present at the time of exposure. Do not say that the body "learns" in the sense of changing its antibodies; the antibodies are the same, and the difference lies in the number of cells ready to make them.</p>`,
  },
  {
    id: "a582f48a-8c36-42e4-8134-cc3682a9fe47",
    slug: "respiration-muscles-and-internal-environment",
    heading: "Respiratory quotient: what the CO₂ to O₂ ratio tells you about the fuel",
    html: `<h2>Respiratory quotient: what the CO₂ to O₂ ratio tells you about the fuel</h2>
<p>Different respiratory fuels need different amounts of oxygen for the same amount of carbon dioxide released. Measuring both gases in a respirometer gives a ratio that identifies the fuel being used, or the mixture of fuels, in the tissue. This ratio is the respiratory quotient, and it is used both in examinations and in physiology.</p>
${quotient}
<p><em>Key:</em> RQ = volume of carbon dioxide produced ÷ volume of oxygen consumed; the slope of the line on the graph is the RQ.</p>
<h3>Why carbohydrate gives an RQ of 1.0</h3>
<p>For glucose the overall equation is C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O. Six molecules of oxygen are used and six of carbon dioxide are released, so the ratio is 1.0. The carbon and oxygen in the fuel are already close to the proportions in carbon dioxide, so little extra oxygen is needed.</p>
<h3>Why fat gives an RQ near 0.7</h3>
<p>Fats have fewer oxygen atoms per carbon than carbohydrate, so more oxygen is needed to oxidise them completely. The same amount of oxygen therefore releases less carbon dioxide, and the RQ falls to about 0.7. A mixture of fat and carbohydrate gives a value between these, and protein gives a value near 0.9.</p>
<h3>Using RQ in a question</h3>
<p>Calculate the RQ from the two volumes, then compare the value with the table of fuels. Show the division, state the value to two decimal places, and say which fuel or mixture it indicates. Remember that an RQ above 1.0 can occur when yeast ferments sugar anaerobically, releasing carbon dioxide without using oxygen, so the value then does not identify a fuel.</p>`,
  },
];

module.exports = { sections };
