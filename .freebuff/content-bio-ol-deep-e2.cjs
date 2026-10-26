// IGCSE Biology — depth pass, tranche E: the last three Biology notes below the
// 20,000-character standard.
const F = require("./note-figures.cjs");
const { C, text, frame, plot } = F;

/* ── Figure: a negative feedback loop ────────────────────────────────── */
const feedbackLoop = (() => {
  const parts = [];
  const nodes = [
    [140, 60, "stimulus", "blood glucose rises"],
    [360, 60, "receptor", "pancreas detects it"],
    [360, 170, "coordinator", "islets release insulin"],
    [360, 280, "effector", "liver and muscle cells"],
    [140, 280, "response", "glucose uptake rises"],
  ];
  for (const [x, y, label, sub] of nodes) {
    parts.push(
      `<rect x="${x - 78}" y="${y - 26}" width="156" height="52" rx="8" fill="${C.goldFillSoft}" stroke="${C.gold}" stroke-width="1.5"/>`,
      text(x, y - 3, label, { anchor: "middle", size: 12.5, fill: C.ink, weight: "600" }),
      text(x, y + 13, sub, { anchor: "middle", size: 10.5 }),
    );
  }
  const arrow = (x1, y1, x2, y2) => [
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C.muted}" stroke-width="1.8"/>`,
    `<polygon points="${x2},${y2} ${x2 - 8},${y2 - 5} ${x2 - 8},${y2 + 5}" fill="${C.muted}" transform="rotate(${(Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI} ${x2} ${y2})"/>`,
  ];
  parts.push(...arrow(218, 60, 276, 60));
  parts.push(...arrow(360, 86, 360, 138));
  parts.push(...arrow(360, 196, 360, 248));
  parts.push(...arrow(282, 280, 224, 280));
  parts.push(...arrow(140, 254, 140, 92));
  parts.push(text(96, 175, "the response removes the stimulus", { anchor: "middle", size: 11, fill: C.goldDeep }));
  parts.push(text(420, 160, "negative feedback", { anchor: "middle", size: 11.5, fill: C.ink, weight: "600" }));
  return frame({
    id: "coord-feedback",
    title: "The negative feedback loop that holds blood glucose steady",
    label: "Figure 1.",
    caption:
      "Every homeostatic mechanism has this shape: a stimulus, a receptor, a coordinator, an effector and a response that removes the original stimulus. Replace the labels and the same diagram describes temperature control, water balance or the control of a hormone in the menstrual cycle.",
    w: 560,
    h: 330,
    body: parts.join("\n"),
  });
})();

/* ── Figure: logistic population growth ──────────────────────────────── */
const logistic = (() => {
  const pts = [];
  for (let t = 0; t <= 40; t += 0.5) {
    const n = 400 / (1 + Math.exp(-0.22 * (t - 16)));
    pts.push([t, +n.toFixed(1)]);
  }
  return plot({
    id: "env-logistic",
    title: "Population size over time, showing exponential growth then a plateau at the carrying capacity",
    label: "Figure 1.",
    caption:
      "Growth is exponential while resources are plentiful, then slows as competition, disease and predation intensify, and settles at the carrying capacity. The plateau is not a law of nature but a balance: the birth rate has fallen to equal the death rate, and the habitat cannot support more.",
    w: 580,
    h: 320,
    x: { min: 0, max: 40, ticks: [0, 10, 20, 30, 40], label: "time (arbitrary units)" },
    y: { min: 0, max: 450, ticks: [0, 100, 200, 300, 400], label: "population size" },
    series: [{ points: pts, color: C.gold, width: 2.8, smooth: true }],
    hidden: [{ y: 400, color: C.goldDeep }],
    annotations: [
      { x: 4, y: 60, text: "exponential phase", dx: 4, dy: 0, color: C.muted, size: 11.5 },
      { x: 24, y: 408, text: "carrying capacity", dx: 4, dy: -8, color: C.goldDeep, size: 12 },
    ],
  });
})();

/* ── Figure: hormone levels across the menstrual cycle ───────────────── */
const cycle = (() => {
  const curve = (fn) => Array.from({ length: 57 }, (_, i) => [i / 2, +fn(i / 2).toFixed(2)]);
  const gauss = (x, mu, sd, amp) => amp * Math.exp(-((x - mu) ** 2) / (2 * sd * sd));
  return plot({
    id: "rep-cycle",
    title: "FSH, LH, oestrogen and progesterone across a 28-day menstrual cycle",
    label: "Figure 1.",
    caption:
      "FSH starts the cycle by maturing a follicle; the follicle secretes oestrogen, which repairs the lining and eventually triggers the LH surge; LH causes ovulation; the empty follicle becomes the corpus luteum and secretes progesterone, which maintains the lining. If no embryo implants, the corpus luteum degenerates, progesterone falls, and menstruation follows.",
    w: 600,
    h: 340,
    x: { min: 0, max: 28, ticks: [0, 7, 14, 21, 28], label: "day of cycle" },
    y: { min: 0, max: 10, ticks: [0, 2, 4, 6, 8, 10], label: "relative hormone level" },
    series: [
      { points: curve((d) => gauss(d, 2, 2.2, 6.2)), color: C.muted, width: 2, smooth: true, kind: "dashed" },
      { points: curve((d) => gauss(d, 13.5, 1.1, 9.2)), color: C.gold, width: 2.4, smooth: true },
      { points: curve((d) => gauss(d, 9, 4.4, 6.6)), color: C.goldDeep, width: 2.4, smooth: true },
      { points: curve((d) => (d > 14 ? gauss(d, 21, 5, 7.4) : 0.2)), color: C.ink, width: 2.2, smooth: true },
    ],
    hidden: [{ x: 14, color: C.gold }],
    annotations: [
      { x: 14, y: 9.6, text: "ovulation", dx: 6, dy: 0, color: C.gold, size: 11.5 },
      { x: 2, y: 6.5, text: "FSH", dx: 4, dy: -4, color: C.muted, size: 11.5 },
      { x: 8.4, y: 7.4, text: "oestrogen", dx: 4, dy: -4, color: C.goldDeep, size: 11.5 },
      { x: 21, y: 6.4, text: "progesterone", dx: 4, dy: -4, color: C.ink, size: 11.5 },
    ],
  });
})();

const coordination = `<h2>Coordination and Response: the detail behind the reflex</h2>
<p>A reflex is described in five steps in most textbooks, which is enough for a two-mark question and not enough to explain why a reflex is faster than a voluntary action, why it cannot be stopped halfway, or what a drug does at a synapse. This section supplies that detail. It also covers the eye and hormone control at the level a top-band answer needs, without going beyond what the specification asks for.</p>

<h3>The neurone, and why the impulse is fast</h3>
<p>A sensory neurone carries an impulse from a receptor to the central nervous system; a relay (intermediate) neurone carries it within the spinal cord or brain; a motor neurone carries it from the central nervous system to an effector, a muscle or a gland. Each has a cell body containing the nucleus, dendrites that receive signals, and a long axon that conducts. The axon of a motor neurone is wrapped in a myelin sheath made by Schwann cells. Myelin is an electrical insulator, so the impulse cannot travel through it; instead it jumps between the gaps between Schwann cells, the nodes of Ranvier, which is far faster than continuous conduction along an unmyelinated fibre. This is why myelinated fibres conduct at tens of metres per second while a fine unmyelinated fibre manages one or two, and why demyelinating disease such as multiple sclerosis produces weakness and loss of coordination: the signals still travel, but too slowly and too unreliably.</p>
<p>The reflex arc is deliberately short. The sensory neurone synapses directly with a relay neurone in the spinal cord, and the relay neurone synapses with a motor neurone; the brain is informed by a branch but is not required for the response. Three consequences follow, and each is a mark. The response is fast, because there are few synapses to cross. It is involuntary, because the decision is not taken in the brain. And it is protective, because it removes the body from harm before the conscious brain has had time to process the pain — which is why you have already dropped a hot pan before you decide to.</p>

<h3>The synapse: one-way, chemical, and the target of drugs</h3>
<p>A synapse is a junction between two neurones, or between a neurone and an effector, separated by a gap about twenty nanometres wide, the synaptic cleft. The arrival of an impulse at the presynaptic membrane depolarises it, calcium ions enter, and vesicles of neurotransmitter fuse with the membrane and release their contents into the cleft. The neurotransmitter diffuses across and binds to receptors on the postsynaptic membrane, which opens ion channels and either excites or inhibits the next cell. The neurotransmitter is then broken down by an enzyme or taken back into the presynaptic neurone, so the signal is switched off and the synapse is ready for the next impulse.</p>
<p>Three examinable consequences follow. The synapse is one-way, because vesicles are only on the presynaptic side and receptors only on the postsynaptic side, which is why impulses travel in one direction around a circuit. Transmission is slower than along an axon, because diffusion and chemical binding take time — a reflex arc with two synapses is still fast, but not instantaneous. And the synapse is where drugs act, which is why so many medicines and poisons are neuroactive: a drug may mimic a neurotransmitter, block its receptor, prevent its reuptake so it stays in the cleft, or block the enzyme that breaks it down. Each changes the pattern of impulses without touching the nerve itself.</p>

<h3>The eye: two reflexes and one focusing mechanism</h3>
<p>The pupil reflex adjusts the amount of light entering. In bright light, circular muscles in the iris contract and radial muscles relax, so the pupil constricts; in dim light the radial muscles contract and the pupil dilates. It is a reflex, so it happens without conscious control.</p>
<p>Accommodation adjusts the lens for distance. The lens is elastic and held by suspensory ligaments attached to the ciliary muscle. To look at a near object, the ciliary muscle contracts, which slackens the suspensory ligaments, so the lens becomes fatter and more curved and refracts more strongly. To look at a distant object, the ciliary muscle relaxes, the ligaments pull tight, and the lens is stretched thinner. Students routinely invert this, so learn it as: near vision needs more refraction, therefore the lens must be fat, therefore the ligaments must be slack, therefore the ciliary muscle must be contracted.</p>
<p>Long sight (hypermetropia) happens when the lens cannot become fat enough, or the eyeball is too short, so near objects focus behind the retina; a converging (convex) lens corrects it. Short sight (myopia) happens when the eyeball is too long or the cornea too curved, so distant objects focus in front of the retina; a diverging (concave) lens corrects it. The retina itself has two kinds of receptor: rods, which are densely packed away from the fovea, work in dim light and give black-and-white vision; cones, concentrated at the fovea, need bright light and give colour vision and sharp detail. That is why you see colour and detail best in the centre of your field of view and why a faint star is easier to see if you look slightly to one side of it.</p>

<h3>Homeostasis: the loop, not the list</h3>
<p>Every homeostatic mechanism has the same shape (Figure 1): a stimulus moves a variable away from its set point, a receptor detects the change, a coordinator compares it with the set point, an effector responds, and the response removes the stimulus. That is negative feedback, and it is worth drawing once and reusing for temperature, blood glucose, water balance and the menstrual cycle.</p>
<p><strong>Temperature.</strong> The hypothalamus contains the coordinator and receives input from thermoreceptors in the skin and in the blood. When the body is too hot, arterioles near the skin surface dilate (vasodilation), so more blood flows near the surface and more heat is radiated; sweat glands secrete more sweat, and its evaporation removes latent heat; hair erector muscles relax, so the hair lies flat and traps less insulating air; and metabolic rate falls slightly. When the body is too cold, the opposite happens, and shivering adds heat because muscle contraction releases energy from respiration. Note that shivering is involuntary and that it is respiration, not the movement itself, that produces the heat.</p>
<p><strong>Water balance.</strong> Osmoreceptors in the hypothalamus detect the concentration of the blood. If it is too concentrated, the posterior pituitary releases more ADH, which increases the permeability of the collecting ducts in the kidney to water, so more water is reabsorbed, the urine becomes smaller in volume and more concentrated, and blood concentration falls. If the blood is too dilute, less ADH is released, the collecting ducts are less permeable, and a large volume of dilute urine is produced. Alcohol suppresses ADH, which is why drinking alcohol produces more urine and can leave a person dehydrated.</p>
<p><strong>Blood glucose.</strong> The islets of Langerhans in the pancreas contain alpha cells, which secrete glucagon when glucose is low, and beta cells, which secrete insulin when it is high. Insulin increases glucose uptake by cells, increases the conversion of glucose to glycogen in the liver and muscle, and increases the conversion of glucose to fat; the result is a fall in blood glucose. Glucagon does the reverse: it converts glycogen back to glucose and releases it into the blood. Adrenaline, from the adrenal glands, raises blood glucose in an emergency by the same glycogen-to-glucose route, which is why fear makes you feel shaky and alert.</p>
<p>Diabetes follows directly from the loop. In type 1 diabetes the beta cells are destroyed, so insulin is not produced; glucose stays in the blood, the kidney cannot reabsorb it all, and it appears in the urine, drawing water with it by osmosis and causing thirst and copious urination. Treatment is insulin injection, because insulin is a protein and would be digested if swallowed. In type 2 diabetes the receptors on cells become less responsive to insulin, often associated with obesity and inactivity; it is managed first by diet and exercise, then by drugs, and only later by insulin. The distinction between "no insulin" and "insulin does not work" is the mark in almost every question on the topic.</p>

<h3>Plant hormones: a gradient, not a gland</h3>
<p>Auxin is produced in the shoot tip and moves down the stem. In a shoot lit from one side, auxin accumulates on the shaded side, where it stimulates cell elongation, so that side grows faster and the shoot bends towards the light — phototropism. In a root, the same accumulation inhibits elongation, so the root bends away from light and downward, which is gravitropism: gravity causes auxin to collect on the lower side, growth is inhibited there, and the root curves down. The same hormone therefore has opposite effects in shoot and root, which is worth stating explicitly, because it explains why a root placed on its side corrects itself in the right direction.</p>
<p>Other plant hormones are worth naming: gibberellins promote stem elongation and seed germination, and are used commercially to increase fruit size; ethene (ethylene) promotes fruit ripening, which is why a ripe banana in a bag ripens the others; and abscisic acid closes stomata and promotes dormancy when water is short. Each is a chemical signal, and none of them travels in a nervous system — which is the fundamental difference between plant and animal coordination.</p>`;

const ecosystems = `<h2>Organisms and their Environment: cycles, limits and sampling</h2>
<p>The cycles are usually learned as arrows, which makes them forgettable. They become memorable once you see that they are all the same story — an element is taken up by a living thing, passed along a food chain, and returned to the physical environment by respiration or decay — and that only the element differs. This section adds that reasoning, the eutrophication sequence that examiners love, and the sampling arithmetic that turns a field into a number.</p>

<h3>Energy flows; matter cycles</h3>
<p>Energy enters the ecosystem as sunlight, is captured by producers in photosynthesis and passed along food chains; at every step some is lost as heat from respiration and none of it is returned to the Sun. That is why a food chain has only four or five links: the energy available falls by roughly ninety per cent at each transfer, so there is not enough left to support another level. Matter is different. The carbon and nitrogen atoms in a dead leaf are not lost; they are released by decomposers and become available to plants again. Ecosystems therefore need a continuous input of energy but only a recycling of elements, and this single distinction answers a whole class of questions.</p>
<p>Decomposers are the reason the cycle closes. Bacteria and fungi are saprotrophs: they secrete enzymes onto dead organic matter, digest it externally, and absorb the soluble products. This releases carbon dioxide by respiration and ammonium compounds by ammonification, both of which return to the physical environment. A detritus food chain starts from dead matter rather than from a living producer, and in many forests most of the energy flow goes through it rather than through the grazing chain.</p>

<h3>The nitrogen cycle, with the organisms named</h3>
<p>Nitrogen is abundant in the air but unavailable to plants in that form, because the triple bond between its two atoms is almost inert. Four processes convert it into usable forms, and each has a named agent.</p>
<ul>
<li><strong>Nitrogen fixation.</strong> Rhizobium bacteria live in nodules on the roots of legumes such as peas, beans and clover. They reduce atmospheric nitrogen to ammonia, which the plant uses to make amino acids; the plant supplies the bacteria with sugars and a protected, low-oxygen environment. This mutualism is why a legume crop enriches the soil, and why farmers rotate legumes with cereals. Free-living nitrogen-fixing bacteria in the soil, and lightning, fix smaller amounts.</li>
<li><strong>Nitrification.</strong> Ammonium compounds in the soil are oxidised first to nitrite by Nitrosomonas and then to nitrate by Nitrobacter. Nitrate is the form plants absorb, and it is the form that dissolves and runs off into rivers.</li>
<li><strong>Assimilation and feeding.</strong> Plants use nitrate to make amino acids and proteins; animals obtain nitrogen by eating plants or other animals and digest the proteins into amino acids.</li>
<li><strong>Ammonification and denitrification.</strong> Decomposers break down proteins and urea and release ammonium compounds; and Pseudomonas bacteria in waterlogged, anaerobic soil convert nitrate back to nitrogen gas, which escapes to the atmosphere. Waterlogging therefore loses nitrogen from the soil in two ways: the roots cannot respire, and denitrification returns the nitrate to the air.</li>
</ul>
<p>Draw the cycle as a loop with four labelled arrows and the organism names beside them; a question that asks for two roles of bacteria in the cycle is then a matter of reading two arrows.</p>

<h3>Eutrophication: the sequence that is worth learning as a story</h3>
<p>Fertiliser or sewage containing nitrate and phosphate runs off the land into a river or lake. The nutrients are the limiting factor for algal growth, so algae multiply rapidly — an algal bloom — and form a dense layer at the surface. The algae below the surface are shaded and die, and they are joined by the algae at the end of the bloom as nutrients run out. Decomposers then break down this dead material, and they respire aerobically, consuming oxygen from the water. Oxygen concentration falls, and fish and other aerobic organisms suffocate. Anaerobic bacteria then take over, producing hydrogen sulfide and methane, and the water becomes foul and turbid. The result is a dead zone with low biodiversity, and the cause was a nutrient that was not toxic in itself.</p>
<p>Every step in that chain is a mark, and it is the classic example of a small input having a large effect through a food web. The remedy is equally mechanistic: reduce the run-off at source by planting buffer strips along watercourses, improve sewage treatment to remove phosphate, and avoid applying fertiliser just before heavy rain.</p>

<h3>Populations: growth, limits and the carrying capacity</h3>
<p>With unlimited resources a population grows exponentially: the more individuals there are, the more there are to reproduce, so the rate of increase rises with the size of the population. Nothing grows exponentially for long, because resources are finite. As the population rises, competition for food and space intensifies, waste products accumulate, disease spreads more easily, and predators are attracted. The birth rate falls and the death rate rises, and growth slows. Eventually the population levels off at the carrying capacity, the maximum the habitat can support (Figure 1).</p>
<p>A crash rather than a plateau happens when the limit is overshot: a population that has eaten its food supply may starve, and the decline can be as rapid as the growth. Lemmings and some insect populations show this. The distinction worth knowing is between density-dependent factors, whose effect increases with population density (competition, disease, predation), and density-independent factors, which kill the same proportion regardless of density (a drought, a fire, a frost). Only density-dependent factors produce the plateau; density-independent ones simply reduce the population wherever it happens to be.</p>

<h3>Sampling: two methods and the assumptions behind them</h3>
<p>A quadrat is a square frame, usually 0.25 m² or 0.5 m², placed at random in the habitat. Random placement matters: choosing a spot because it looks interesting biases the sample. A practical method is to lay two tape measures along the edges of the area, use a random number generator to pick a coordinate, and place the quadrat where they cross. Record the number of individuals of each species, or the percentage of the quadrat covered, or simply presence or absence, depending on the question. Then scale up: if a 0.25 m² quadrat in a 100 m² field contains 6 daisies, the estimated population is 6 × (100 ÷ 0.25) = 2,400.</p>
<p>A transect is a line across a habitat along which quadrats are placed at intervals. A line transect records which species touch the line; a belt transect records the contents of quadrats along it. Transects are used where the habitat changes systematically — across a rocky shore, from a path into a wood — because the question is about the pattern of change, not about an average.</p>
<p>Mark-recapture estimates the size of a mobile population. Capture a sample, mark the animals harmlessly, release them, allow time to mix, then capture a second sample and count how many are marked. The estimate is (number in first sample × number in second sample) ÷ number marked in the second sample. If 40 animals are marked and a second sample of 50 contains 8 marked ones, the estimate is (40 × 50) ÷ 8 = 250.</p>
<p>The assumptions are the exam question. The population must be closed, with no immigration, emigration, births or deaths between the samples. The marks must not make animals more or less likely to be caught, and must not harm them. The marked animals must mix fully with the rest, which needs enough time. And the mark must not rub off. Each assumption, if broken, biases the estimate in a predictable direction — if marked animals are more likely to be recaught, the number of marked animals in the second sample is too high and the estimate is too low.</p>

<h3>Pyramids: three kinds, and when one is inverted</h3>
<p>A pyramid of numbers counts individuals at each trophic level; a pyramid of biomass measures their mass; a pyramid of energy measures the energy passing through each level in a given time. Only the energy pyramid is always upright, because energy is lost at every transfer and cannot be created. A numbers pyramid can be inverted when the producers are very large: one oak tree supports thousands of caterpillars, so the bottom bar is one and the next is huge. A biomass pyramid can be temporarily inverted in an aquatic system, where a small standing crop of rapidly dividing phytoplankton supports a larger mass of zooplankton — the phytoplankton turn over so quickly that their production is high even though their mass at any instant is low. That is the distinction the exam wants: pyramid of energy measures rate, the other two measure a snapshot.</p>`;

const reproduction = `<h2>Reproduction: the physiology and the arithmetic</h2>
<p>The diagrams are familiar and the hormones are not. This section covers the parts that are usually learned as a list and are actually a sequence: what happens between ovulation and implantation, what each hormone does to the next, how the placenta exchanges without mixing the two blood supplies, and why the different contraceptive methods work at different points in the cycle. It ends with the plant side, where the same logic of gametes and fertilisation applies with less anatomy.</p>

<h3>The gametes, compared</h3>
<table>
<tr><th>Feature</th><th>Sperm</th><th>Egg cell</th></tr>
<tr><td>Size</td><td>Very small, about 0.05 mm, mostly nucleus</td><td>Large, about 0.1 mm, packed with food reserves</td></tr>
<tr><td>Numbers</td><td>Hundreds of millions per ejaculation</td><td>One per cycle, a few hundred thousand in the ovary at birth</td></tr>
<tr><td>Mobility</td><td>Flagellum, many mitochondria for ATP</td><td>Non-motile; moved along the oviduct by cilia and muscle</td></tr>
<tr><td>Adaptations</td><td>Acrosome enzymes to penetrate the egg; streamlined shape</td><td>Food store for the early embryo; protective jelly coat</td></tr>
<tr><td>Chromosomes</td><td>Haploid, either X or Y</td><td>Haploid, always X</td></tr>
</table>
<p>The chromosomal point settles a common question: the father determines the sex of the child, because the egg always carries an X and the sperm carries either X or Y. The mother cannot.</p>

<h3>Meiosis, and why it is not mitosis</h3>
<p>Meiosis produces gametes with half the chromosome number. One diploid cell undergoes two divisions after a single round of DNA replication, giving four haploid cells, each genetically different. Two processes make them different: crossing over, where homologous chromosomes exchange sections during the first division, and independent assortment, where each pair of homologous chromosomes lines up independently of the others. In humans, 23 pairs can assort in 2²³ combinations before crossing over is even counted, which is why no two siblings are identical unless they are identical twins.</p>
<p>The alternative, mitosis, produces two genetically identical diploid cells and is used for growth and repair. A question that asks why meiosis is necessary wants two answers: it halves the chromosome number so that fertilisation restores the diploid number rather than doubling it each generation, and it produces genetic variation, which is the raw material for natural selection.</p>

<h3>From fertilisation to implantation</h3>
<p>Fertilisation normally occurs in the oviduct. The sperm penetrates the jelly coat using enzymes from its acrosome, and once one sperm has fused with the egg membrane, the membrane changes so that no second sperm can enter — the cortical reaction, which prevents a zygote with too many chromosomes. The nuclei fuse, and the resulting zygote is diploid.</p>
<p>The zygote divides by mitosis as it travels down the oviduct: two cells, four, eight, forming a ball of cells called a morula, then a hollow ball with an inner mass, the blastocyst. About a week after fertilisation the blastocyst reaches the uterus and sinks into the endometrium, which is implantation. The outer cells then secrete human chorionic gonadotrophin, hCG, which maintains the corpus luteum so that progesterone continues to be produced and the lining is not shed. This is the hormone that home pregnancy tests detect, because it appears in the urine within days of implantation — and it is the reason a pregnancy test works before any scan could show anything.</p>

<h3>The menstrual cycle as a chain of cause and effect</h3>
<p>FSH from the pituitary gland stimulates a follicle in the ovary to mature. The developing follicle secretes oestrogen, which stimulates the repair and thickening of the endometrium. Oestrogen also has a positive feedback effect in the middle of the cycle: when its concentration is high, it triggers a surge of LH from the pituitary. LH causes ovulation, the release of the egg on about day 14. The remains of the follicle become the corpus luteum, which secretes progesterone; progesterone maintains the endometrium and inhibits FSH and LH, so no new follicle develops while a pregnancy might be starting.</p>
<p>If fertilisation does not occur, the corpus luteum degenerates, progesterone falls, and the endometrium is shed as menstruation. With progesterone gone, the inhibition of FSH and LH is lifted and a new cycle begins. If fertilisation does occur, hCG from the embryo keeps the corpus luteum alive, progesterone stays high, and the lining is maintained. Figure 1 shows the four hormones on one axis, and it is worth tracing one arrow at a time rather than trying to memorise the shapes.</p>

<h3>The placenta: exchange without mixing</h3>
<p>The placenta is formed from fetal tissue, the chorionic villi, growing into the endometrium. The villi increase the surface area enormously and are separated from the maternal blood in the intervillous spaces by a thin membrane, usually only a few cells thick. The two blood supplies never mix, which matters because the fetus may have a different blood group from the mother; instead, substances diffuse across the membrane in both directions.</p>
<p>Oxygen and glucose pass from maternal to fetal blood, along their concentration gradients; carbon dioxide and urea pass from fetal to maternal blood, to be excreted by the mother. Antibodies pass too, giving the fetus passive immunity for the first months of life — the natural passive immunity described in the Diseases and Immunity note. Water, mineral ions and some drugs also cross, which is why alcohol, nicotine and certain medicines can harm a fetus, and why some viruses, including rubella, can cross and cause damage.</p>
<p>The placenta is also an endocrine organ: it secretes progesterone and oestrogen throughout pregnancy, taking over from the corpus luteum, and hCG early on. That is why the corpus luteum is no longer needed after the first trimester, and why the placenta is not merely a filter but a control point.</p>

<h3>Contraception, by mechanism rather than by name</h3>
<table>
<tr><th>Method</th><th>How it works</th><th>Point in the chain it blocks</th></tr>
<tr><td>Combined pill (oestrogen and progesterone)</td><td>Negative feedback inhibits FSH and LH, so no follicle matures and no ovulation occurs</td><td>Ovulation</td></tr>
<tr><td>Progesterone-only pill</td><td>Thickens cervical mucus so sperm cannot pass, and thins the endometrium</td><td>Fertilisation and implantation</td></tr>
<tr><td>Condom</td><td>Physical barrier that stops sperm entering the vagina</td><td>Fertilisation; also reduces STI transmission</td></tr>
<tr><td>Copper IUD</td><td>Copper ions are toxic to sperm and alter the endometrium</td><td>Fertilisation and implantation</td></tr>
<tr><td>Sterilisation</td><td>Oviducts or sperm ducts are cut and tied</td><td>Gamete transport; permanent</td></tr>
<tr><td>Emergency contraception</td><td>Delays ovulation if taken soon enough; does not cause an abortion</td><td>Ovulation, before it happens</td></tr>
</table>
<p>Two clarifications earn marks. The combined pill prevents ovulation, not fertilisation, so it does not act by killing sperm or by preventing implantation. And a condom is the only method in the table that also reduces the transmission of sexually transmitted infections, which is why it is promoted alongside hormonal methods rather than instead of them.</p>
<p>Infertility treatment follows the same map in reverse. IVF collects eggs after hormone treatment to stimulate multiple follicles, fertilises them in a dish, and transfers an embryo to the uterus. Success rates fall with maternal age. The ethical questions are real and not settled by evidence: what to do with unused embryos, whether selecting embryos for characteristics is acceptable, and who should have access to treatment.</p>

<h3>The plant side: pollination is not fertilisation</h3>
<p>Pollination is the transfer of pollen from an anther to a stigma, by wind, insects, birds or water. Fertilisation is the fusion of a male gamete from the pollen tube with the egg in the ovule, and the two are separated by the growth of that tube down the style. A question that asks for the difference wants exactly that: pollination is transfer, fertilisation is fusion, and the tube is what connects them.</p>
<p>Wind-pollinated and insect-pollinated flowers differ in every feature that follows from their method. Wind-pollinated flowers are small and dull, with no scent or nectar, because they do not need to attract anything; they produce huge quantities of light pollen, because most of it is wasted; their stigmas are large and feathery to catch pollen, and their anthers hang outside the flower to release it into the air. Insect-pollinated flowers are large and coloured, scented and nectar-producing, with sticky pollen in smaller quantities and stigmas inside the flower where an insect will brush them. Learn the two lists as consequences of the same problem — how to get pollen to another flower of the same species — rather than as separate facts.</p>
<p>After fertilisation the ovule becomes the seed and the ovary becomes the fruit, which is why a tomato is a fruit and a strawberry carries its seeds on the outside. Dispersal follows the same logic: wing-like structures for wind, hooks for animals' fur, fleshy fruits for animals to eat, and buoyant or waterproof coats for water. Germination then requires water, oxygen and a suitable temperature, but not light for most species, because the seed's food store supplies energy until the first leaves open.</p>`;

module.exports = {
  sections: [
    {
      id: "ec6d90a3-fa1c-4d57-9f27-81b700153502",
      slug: "coordination-and-response",
      heading: "Coordination and Response: the detail behind the reflex",
      html: coordination + "\n" + feedbackLoop + "\n",
    },
    {
      id: "b6bc221a-eb16-488f-9e32-65eb3beaa3a5",
      slug: "organisms-and-their-environment",
      heading: "Organisms and their Environment: cycles, limits and sampling",
      html: ecosystems + "\n" + logistic + "\n",
    },
    {
      id: "23c105d5-9fe1-4969-8922-d242fd7aef04",
      slug: "reproduction",
      heading: "Reproduction: the physiology and the arithmetic",
      html: reproduction + "\n" + cycle + "\n",
    },
  ],
};
