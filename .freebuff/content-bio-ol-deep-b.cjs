// IGCSE Biology — depth pass, tranche B: respiration top-up (it landed 108
// characters short of 20,000), gas exchange in humans, biotechnology.
const F = require("./note-figures.cjs");
const { C, text, frame, plot } = F;

/* ── Figure: a spirometer trace read correctly ───────────────────────── */
const spirometer = (() => {
  const pts = [];
  let v = 3.0;
  // Seven breaths, each losing a little volume to the soda lime, so the whole
  // trace drifts downwards: that gradient is the oxygen consumption.
  for (let t = 0; t <= 42; t += 0.35) {
    const phase = t % 6;
    const cycle = Math.floor(t / 6);
    const base = 3.0 - cycle * 0.16;
    const inOut = phase < 3 ? Math.sin((phase / 3) * Math.PI) : -Math.sin(((phase - 3) / 3) * Math.PI) * 0.55;
    pts.push([+t.toFixed(2), +(base + inOut * 0.55).toFixed(3)]);
  }
  return plot({
    id: "gas-spirometer",
    title: "A spirometer trace: tidal peaks, a falling baseline, and the oxygen consumed",
    label: "Figure 1.",
    caption:
      "Each up-and-down is one breath. The peaks and troughs are tidal volume; the slow downward drift is the carbon dioxide absorbed by the soda lime, so the volume lost over the whole trace is the oxygen used. The gradient of that drift, divided by time, is the oxygen consumption rate.",
    w: 600,
    h: 330,
    x: { min: 0, max: 42, ticks: [0, 6, 12, 18, 24, 30, 36, 42], label: "time (s)" },
    y: { min: 1.2, max: 3.6, ticks: [1.5, 2, 2.5, 3, 3.5], label: "volume in spirometer (dm³)" },
    series: [{ points: pts, color: C.gold, width: 2.2 }],
    annotations: [
      { x: 1.4, y: 3.55, text: "one breath = tidal volume", dx: 4, dy: 12, color: C.ink, size: 12 },
      { x: 30, y: 1.44, text: "baseline falls: oxygen is being used", dx: 4, dy: -6, color: C.goldDeep, size: 12 },
    ],
  });
})();

/* ── Figure: a stirred-tank fermenter ────────────────────────────────── */
const fermenter = (() => {
  const parts = [];
  const cx = 250;
  const top = 44;
  const h = 210;
  const w = 150;
  // Vessel.
  parts.push(
    `<rect x="${cx - w / 2}" y="${top}" width="${w}" height="${h}" rx="10" fill="${C.goldFillSoft}" stroke="${C.gold}" stroke-width="2"/>`,
  );
  // Broth level.
  parts.push(
    `<line x1="${cx - w / 2}" y1="${top + 62}" x2="${cx + w / 2}" y2="${top + 62}" stroke="${C.goldDeep}" stroke-width="1.6" stroke-dasharray="6 5"/>`,
    text(cx - w / 2 + 8, top + 56, "broth", { size: 11.5, fill: C.goldDeep }),
  );
  // Stirrer shaft and paddles.
  parts.push(
    `<line x1="${cx}" y1="${top - 26}" x2="${cx}" y2="${top + h - 30}" stroke="${C.ink}" stroke-width="2.4"/>`,
    `<line x1="${cx - 46}" y1="${top + h - 34}" x2="${cx + 46}" y2="${top + h - 34}" stroke="${C.ink}" stroke-width="4" stroke-linecap="round"/>`,
    text(cx - 6, top - 32, "motor", { anchor: "end", size: 12, fill: C.ink }),
  );
  // Water jacket: two loops around the vessel.
  parts.push(
    `<path d="M${cx - w / 2 - 14} ${top + 30} h-14 v26 h14" fill="none" stroke="${C.muted}" stroke-width="2"/>`,
    `<path d="M${cx - w / 2 - 14} ${top + h - 56} h-14 v26 h14" fill="none" stroke="${C.muted}" stroke-width="2"/>`,
    text(cx - w / 2 - 66, top + 44, "water jacket", { size: 11.5 }),
    text(cx - w / 2 - 66, top + 58, "(temperature)", { size: 11.5 }),
  );
  // Air inlet with sparger.
  parts.push(
    `<path d="M${cx + w / 2 + 8} ${top + h - 22} h44 v-40" fill="none" stroke="${C.muted}" stroke-width="2"/>`,
    `<line x1="${cx + 12}" y1="${top + h - 22}" x2="${cx + 52}" y2="${top + h - 22}" stroke="${C.muted}" stroke-width="2.4"/>`,
    text(cx + w / 2 + 56, top + h - 44, "sterile air in", { size: 11.5 }),
    text(cx + 56, top + h - 30, "sparger", { size: 11 }),
  );
  // Outlet and probes on the right.
  parts.push(
    `<path d="M${cx + w / 2} ${top + 24} h48" fill="none" stroke="${C.muted}" stroke-width="2"/>`,
    text(cx + w / 2 + 54, top + 28, "exhaust", { size: 11.5 }),
    `<path d="M${cx + w / 2} ${top + 92} h30" fill="none" stroke="${C.goldDeep}" stroke-width="2"/>`,
    text(cx + w / 2 + 36, top + 96, "pH probe", { size: 11.5, fill: C.goldDeep }),
    `<path d="M${cx + w / 2} ${top + 128} h30" fill="none" stroke="${C.goldDeep}" stroke-width="2"/>`,
    text(cx + w / 2 + 36, top + 132, "oxygen probe", { size: 11.5, fill: C.goldDeep }),
    `<path d="M${cx - w / 2} ${top + h} v34 h-40" fill="none" stroke="${C.muted}" stroke-width="2"/>`,
    text(cx - w / 2 - 46, top + h + 38, "harvest", { anchor: "end", size: 11.5 }),
    text(cx, 20, "stirred-tank fermenter", { anchor: "middle", size: 13, fill: C.ink, weight: "600" }),
  );
  return frame({
    id: "bio-fermenter",
    title: "A stirred-tank fermenter with its jacket, sparger, stirrer and probes",
    label: "Figure 2.",
    caption:
      "Every fitting answers one need of the microorganism: the stirrer keeps cells and nutrients mixed and breaks air into bubbles, the sparger supplies sterile oxygen, the jacket holds the optimum temperature, the probes monitor pH and dissolved oxygen, and the whole vessel is sterilised before inoculation so a contaminant cannot outgrow the culture.",
    w: 560,
    h: 320,
    body: parts.join("\n"),
  });
})();

const respTopUp = `<h2>Respiration: two calculations worth rehearsing</h2>
<p>Most respiration questions are descriptive, but the arithmetic versions appear often enough to be worth practising cold, and they are also the questions where a small slip costs the whole mark.</p>

<h3>Comparing the energy released by the two routes</h3>
<p>A muscle fibre respires 0.90 g of glucose. Aerobic respiration releases about 2,880 kJ per mole of glucose; anaerobic respiration releases about 150 kJ per mole, because most of the energy stays locked in the lactate. The molar mass of glucose is 180 g mol⁻¹, so 0.90 g is 0.90 ÷ 180 = 0.0050 mol.</p>
<p>Aerobically: 0.0050 × 2,880 = 14.4 kJ. Anaerobically: 0.0050 × 150 = 0.75 kJ. The ratio is about 19:1, which is the quantitative version of the statement "aerobic respiration releases much more energy". Notice the pattern of the working: mass → moles → multiply by the energy per mole. Show all three steps, because the mark scheme pays for the conversion, not just the final number.</p>

<h3>How much carbon dioxide a person actually produces</h3>
<p>A student respires 12 dm³ of air per minute, of which 4.0 % by volume is carbon dioxide leaving the lungs and 0.04 % is carbon dioxide entering. The carbon dioxide added is therefore 4.0 − 0.04 = 3.96 % of 12 dm³, which is 0.475 dm³ per minute. Over a 45-minute lesson that is 0.475 × 45 = 21.4 dm³ of carbon dioxide, or about 21 litres.</p>
<p>Two habits make these answers robust. Keep units attached to every number, so that a volume in dm³ cannot silently be multiplied by a rate in cm³. And check the direction of the subtraction: the percentage you want is the difference between exhaled and inhaled air, never the exhaled figure alone.</p>`;

const gasExchange = `<h2>Gas Exchange in Humans: gradients, volumes and what the numbers mean</h2>
<p>The anatomy is only half of this topic. The other half is the physics of diffusion and the arithmetic of breathing, and that is where the "explain" marks sit. Everything below is either a mechanism you can reason from or a measurement you may be given in a data question.</p>

<h3>Partial pressure, not concentration, drives the diffusion</h3>
<p>Gases diffuse down a gradient of partial pressure — the share of the total pressure that one gas contributes. At sea level, air is about 21 % oxygen, so its partial pressure is roughly 21 kPa; in the alveoli it falls to about 13–14 kPa, because incoming air mixes with the residual air already there and oxygen is continuously removed into the blood. Blood arriving at the lungs has a partial pressure of about 5 kPa, so there is a gradient of some 8–9 kPa across a membrane half a micrometre thick, and oxygen diffuses in rapidly. Blood leaving the lungs is close to 13 kPa, almost in equilibrium with the alveolar air — which is why the gradient stays steep all along the capillary rather than fading.</p>
<p>Carbon dioxide runs the other way with a much smaller gradient: about 6 kPa in the arriving blood against 5.3 kPa in the alveolar air. The gradient is small because carbon dioxide is roughly twenty times more soluble in water than oxygen, so a small pressure difference carries a large flux. This is the answer to the common "why does carbon dioxide leave the blood so easily?" question: solubility, not gradient size. It also explains why the body can afford to control breathing by monitoring carbon dioxide rather than oxygen — a small change in carbon dioxide partial pressure signals a real change in the amount being carried.</p>
<p>Two structural numbers are worth remembering because they turn the mechanism into a calculation: the alveoli of an adult present a total surface area of roughly 70 m², and the barrier between air and blood is about 0.5 µm thick. Diffusion rate is proportional to area and to the gradient, and inversely proportional to thickness. Every disease in the next section damages one of those three terms, which is why the comparison is really a comparison of diffusion physics.</p>

<h3>Ventilation, in the numbers an examiner supplies</h3>
<p>Ventilation rate is the volume of air moved into the lungs per minute: tidal volume multiplied by breathing frequency. At rest, a tidal volume of 0.5 dm³ at 12 breaths per minute gives 6.0 dm³ min⁻¹. During hard exercise the same person may reach a tidal volume of 2.0 dm³ at 30 breaths per minute, which is 60 dm³ min⁻¹ — a tenfold increase, achieved by both a bigger breath and a faster rate. Note that only part of each breath reaches the alveoli: about 0.15 dm³ of the airways, the trachea and bronchi, holds air that never meets a blood capillary. That dead space is why rapid shallow breathing is much less effective than slower deep breathing at the same total volume, and it is why a person panting after a sprint still feels short of breath.</p>
<p>Percentages of gases in inhaled and exhaled air are a standard data table: inhaled air is about 21 % oxygen and 0.04 % carbon dioxide; exhaled air is about 16 % oxygen and 4 % carbon dioxide, is warmer, and is saturated with water vapour. The oxygen figure falls by a quarter, but the carbon dioxide figure rises a hundredfold — because the amount in inhaled air is so small, not because the body produces a hundred times more carbon dioxide than it uses of oxygen.</p>

<h3>Reading a spirometer trace</h3>
<p>A spirometer records the volume of air in a chamber as a person breathes in and out of it. Four measurements come off one trace, and they are easy to confuse. <strong>Tidal volume</strong> is the height of one ordinary breath, peak to trough. <strong>Vital capacity</strong> is the largest possible breath out after the largest possible breath in. <strong>Residual volume</strong> is what cannot be breathed out at all and so never appears on the trace — which is why the trace can tell you vital capacity but never total lung capacity on its own. <strong>Breathing rate</strong> is the number of peaks per minute, read off the time axis.</p>
<p>When the spirometer contains soda lime, the trace drifts downward (Figure 1). The lime absorbs the carbon dioxide the subject exhales, so the only gas leaving the system is oxygen: the volume lost over a known time is the oxygen consumed. Divide that volume by the time to get the consumption rate, and divide again by the subject's mass if you are comparing people. This is the same reasoning as the respirometer in the Respiration note, and the control is the same: keep the temperature steady, because thermal expansion of the air moves the trace without any respiration.</p>
<p>Comparing traces before and after exercise shows the mechanism working: tidal volume rises, breathing rate rises, and the oxygen consumption gradient steepens. The deeper breaths recruit more alveoli and increase the surface area actually being ventilated, which raises the diffusion gradient across the whole exchange surface at once.</p>

<h3>Why you cannot simply hold your breath</h3>
<p>Breathing is controlled by the medulla oblongata in the brain stem, which sends nerve impulses to the diaphragm and intercostal muscles to set the rhythm. The signal is adjusted by chemoreceptors, and the one that matters most is the receptor monitoring carbon dioxide — directly in the blood and, more sensitively, as a fall in pH in the cerebrospinal fluid, because dissolved carbon dioxide forms carbonic acid. Rising carbon dioxide, not falling oxygen, is the normal stimulus to breathe. That is why you can hold your breath only until the carbon dioxide rises far enough to override your will, and why breathing a gas mixture rich in carbon dioxide makes you gasp almost immediately.</p>
<p>This also explains the effect of exercise on breathing: respiring muscle produces carbon dioxide faster, arterial carbon dioxide rises, chemoreceptors fire, the medulla increases the depth and rate of breathing. The chain is exercise → more respiration → more carbon dioxide → lower blood pH → medulla → faster, deeper ventilation. Write it in that order and every mark is available.</p>

<h3>Lung disease as damage to the diffusion mechanism</h3>
<table>
<tr><th>Condition</th><th>What is damaged</th><th>Effect on diffusion</th><th>Typical evidence</th></tr>
<tr><td>Emphysema</td><td>Alveolar walls break down; small alveoli merge into large sacs</td><td>Surface area falls sharply; the barrier may also thicken</td><td>Shortness of breath on exertion; reduced vital capacity and FEV₁</td></tr>
<tr><td>Chronic bronchitis</td><td>Cilia destroyed, mucus glands enlarge, airways inflamed and narrowed</td><td>Airways obstructed, so ventilation is reduced and less fresh air reaches the alveoli; mucus raises the diffusion distance</td><td>Persistent cough with sputum; frequent infections</td></tr>
<tr><td>Asthma</td><td>Bronchioles constrict and their lining swells; mucus secreted</td><td>Airway resistance rises, so the gradient is reduced; surface area is normal between attacks</td><td>Wheezing, reversible with a bronchodilator</td></tr>
<tr><td>Lung cancer</td><td>Uncontrolled cell division forms a mass; tumours can block a bronchus</td><td>Functional surface area lost; a blocked airway ventilates nothing</td><td>Persistent cough, blood in sputum, weight loss</td></tr>
</table>
<p>Each row is an application of the same three-term rule: area, thickness, gradient. Emphysema attacks area, bronchitis and asthma attack the gradient by obstructing ventilation, and fibrosis (not in the table because it is less commonly asked at IGCSE) attacks thickness. Naming which term a disease damages is a stronger answer than listing symptoms, and it is what a four-mark "explain" question is looking for.</p>
<p>Smoking causes all of them by different routes: tar paralyses and then destroys the cilia so mucus and pathogens accumulate; tar is carcinogenic and causes mutations in dividing cells; carbon monoxide binds to haemoglobin and reduces the oxygen carried, which lowers the gradient at the alveolus; and nicotine is addictive, which is why the exposure continues. Each mechanism maps onto one of the conditions above.</p>

<h3>Measuring lung function as evidence</h3>
<p>Peak flow measures how fast air can be forced out of the lungs, and FEV₁ — the forced expiratory volume in one second — measures how much of a full breath can be expelled in that second. Both are reduced in obstructive disease and both rise after a bronchodilator in asthma but not in emphysema. A data question will often give you a table of these values for a person before and after exercise, or for smokers and non-smokers, and expect you to conclude something about airway resistance rather than about lung size. Read the units before you compare, and remember that a person with a large vital capacity can still have a poor FEV₁ if their airways are narrowed.</p>`;

const biotech = `<h2>Biotechnology: the process control behind the product</h2>
<p>The products of biotechnology are familiar — insulin, penicillin, mycoprotein, pest-resistant maize — but exam questions rarely ask what a product is. They ask how the process is controlled, why one condition rather than another, and why a batch can fail. That is what this section covers: the fermenter as a controlled environment, the growth curve that decides when to harvest, and the genetic engineering steps that put a human gene into a microorganism in the first place.</p>

<h3>A fermenter is a set of answers to the needs of a cell</h3>
<p>Look at a stirred-tank fermenter and every fitting maps onto a requirement (Figure 2). The vessel is sterilised before use and inoculated with a pure culture, because a contaminant would compete for nutrients and could produce toxins — aseptic technique is not fussiness, it is the difference between a product and a spoiled batch. The stirrer keeps the broth mixed so that nutrients and heat are distributed and cells do not settle, and it breaks the incoming air into small bubbles. The sparger supplies sterile air, which provides oxygen for aerobic respiration; the oxygen demand of a dense culture is enormous, which is why the air is sparged rather than merely blown over the surface. A water jacket circulates cold water to remove the heat that respiration generates, because a fermenter can otherwise warm itself past the optimum and denature the enzymes. Probes monitor pH and dissolved oxygen, and acid or alkali is added automatically, since pH drifts as products such as organic acids accumulate. An antifoam agent controls the foam that protein-rich broths produce, and a sampling port lets the operator check for contamination without opening the vessel.</p>
<p>Two operating modes are examinable. In <strong>batch culture</strong> the vessel is filled once, run, emptied, cleaned and sterilised again; nutrients fall and waste products rise throughout, so the growth curve is fixed. In <strong>continuous culture</strong> fresh medium is added and broth removed at the same rate, holding the culture in exponential growth indefinitely. Batch is simpler and less prone to contamination; continuous gives a steadier supply and higher output per unit volume but is much easier to ruin with a single contaminant.</p>

<h3>The growth curve, and why harvest time is a decision</h3>
<p>A batch culture passes through four phases. In the <strong>lag phase</strong> the cells are synthesising enzymes and adapting to the medium, so numbers barely rise. In the <strong>exponential (log) phase</strong> every cell divides at its maximum rate, because nutrients are plentiful and waste is low. In the <strong>stationary phase</strong> growth and death balance: a nutrient has become limiting, or waste has accumulated, or pH has drifted. In the <strong>decline phase</strong> the death rate exceeds the division rate and the culture dies.</p>
<p>When you harvest depends on what you want. If the product is the cells themselves, or a protein they make continuously, harvest at the end of exponential growth, when the living biomass is greatest. If the product is a secondary metabolite — penicillin is the standard example — harvest during stationary phase, because these compounds are produced when growth has stopped and the organism is stressed, often by a shortage of a nutrient such as nitrogen or phosphate. This is why penicillin production deliberately limits one nutrient: the shortage switches on the genes for the antibiotic. The same logic applies to mycoprotein, where the fungus Fusarium is grown aerobically in continuous culture and harvested as food, and to single-cell protein generally.</p>

<h3>Doubling time, worked</h3>
<p>A culture starts with 1,000 cells and doubles every 30 minutes. After 8 hours there are 16 doubling periods, because 8 hours is 480 minutes and 480 ÷ 30 = 16. The population is 1,000 × 2¹⁶ = 65,536,000 cells. Two habits make this reliable: count the doublings, not the hours, and use the formula final = initial × 2ⁿ, where n is the number of doublings. If a question gives you two population sizes and asks for the doubling time, work backwards: find how many doublings separate them by repeated halving or by logarithms, then divide the elapsed time by that number.</p>
<p>The same arithmetic explains why contamination is catastrophic. A single contaminant cell with a 20-minute doubling time will outnumber the intended culture within a few hours, so a batch that looked sterile at inoculation can be lost by the morning.</p>

<h3>Genetic modification, step by step</h3>
<p>The core technique is the same whatever the organism, and the sequence is worth knowing as a sequence because questions often ask for the order.</p>
<ol>
<li>The gene of interest is identified and cut out of the donor DNA using a restriction enzyme, which recognises a specific sequence and cuts it to leave a short single-stranded overhang, a sticky end.</li>
<li>A vector — usually a bacterial plasmid, sometimes a virus — is cut open with the same restriction enzyme, so it has complementary sticky ends.</li>
<li>The gene and the vector are joined by DNA ligase, which forms the sugar-phosphate bonds. The result is a recombinant plasmid.</li>
<li>The plasmid is introduced into a host cell, commonly the bacterium Escherichia coli or the yeast Saccharomyces cerevisiae, by heat shock, by electroporation or by a gene gun.</li>
<li>Only some cells take up the plasmid, so a marker is needed to find them. The classic marker is a gene for resistance to an antibiotic: the cells are grown on a medium containing that antibiotic, and only the transformed cells survive.</li>
<li>The successful cells are cloned, and the gene is expressed — transcribed and translated — so the protein is made and can be harvested and purified.</li>
</ol>
<p>Plants are usually transformed differently: Agrobacterium tumefaciens naturally inserts a piece of its plasmid into plant cells, and genetic engineers replace the disease-causing genes with the gene of interest, then use the bacterium to infect a leaf disc and regenerate whole plants from the transformed cells. A gene gun fires DNA-coated metal particles into cells and is used where Agrobacterium does not work, such as in some cereals.</p>

<h3>Two products worth knowing in detail</h3>
<p><strong>Human insulin.</strong> The human gene for insulin is inserted into a plasmid and expressed in E. coli or in yeast. Yeast is often preferred because, being eukaryotic, it can process the protein in ways a bacterium cannot — folding it and forming the disulfide bonds that the active hormone needs. The advantages over insulin extracted from pig or beef pancreas are that the supply is unlimited and does not depend on slaughterhouses, the product is identical to human insulin so it causes fewer immune reactions, it can be produced quickly in large quantity, and the risk of transmitting animal disease is removed. One precision point: the genetically modified organism is the microorganism, not the patient — the patient receives a purified protein, not a living organism.</p>
<p><strong>Bt crops.</strong> The bacterium Bacillus thuringiensis produces a protein that is toxic to the larvae of certain insects, particularly caterpillars, but harmless to humans because it needs the alkaline gut of the insect to become active. The gene for that protein is inserted into maize or cotton so that the plant itself produces it, and the caterpillar that eats the leaf stops feeding and dies. The benefit is a large reduction in insecticide spraying. The risks are specific and arguable: insects can evolve resistance to the toxin, just as bacteria evolve resistance to antibiotics, so refuges of non-Bt crops are planted to slow that down; the toxin may affect non-target insects, though the evidence is that it is far more selective than a broad-spectrum spray; and the gene can spread to wild relatives by pollen, producing weeds that are also insect-resistant.</p>

<h3>Arguing the risks with mechanisms, not adjectives</h3>
<p>Examiners reward a benefit or risk only when it is attached to a mechanism or a consequence. "GM is unnatural" earns nothing; "the inserted gene could transfer by pollen to a wild relative and give it a selective advantage, creating a weed that is harder to control" earns a mark. The reusable set is:</p>
<ul>
<li><strong>Gene flow.</strong> Pollen carries the gene to related wild plants; if the gene confers herbicide or pest resistance, the offspring have an advantage and become hard to control.</li>
<li><strong>Resistance evolution.</strong> Continuous exposure to a single toxin selects resistant pests, exactly as a single antibiotic selects resistant bacteria; the countermeasure is a refuge and multiple genes.</li>
<li><strong>Loss of biodiversity.</strong> Widespread planting of one variety narrows the gene pool, so a new pathogen can devastate a whole region — the Irish potato famine argument, applied to modern agriculture.</li>
<li><strong>Allergenicity and toxicity.</strong> A protein new to the human diet may be an allergen, so novel foods are tested before release.</li>
<li><strong>Access and economics.</strong> Patented seed must be bought each year, which can be unaffordable for smallholders and can trap them in debt; this is an argument about markets, not biology, and should be labelled as such.</li>
<li><strong>Ethics.</strong> Modifying animals, patenting living organisms and editing human embryos raise objections that cannot be settled by evidence; state them as ethical positions rather than as scientific findings.</li>
</ul>

<h3>The vocabulary that keeps answers precise</h3>
<table>
<tr><th>Term</th><th>What it means</th><th>What it does not mean</th></tr>
<tr><td>Biotechnology</td><td>Using living organisms or their parts to make a useful product</td><td>Only genetic modification — brewing and cheese-making are biotechnology too</td></tr>
<tr><td>Genetic modification</td><td>Transferring a gene between organisms, usually different species</td><td>Selective breeding, which works within a species by choosing parents</td></tr>
<tr><td>Vector</td><td>A carrier that moves DNA into a host, such as a plasmid</td><td>The host organism itself</td></tr>
<tr><td>Clone</td><td>A genetically identical copy, or a population of them</td><td>Only an animal — a bacterial colony is a clone too</td></tr>
<tr><td>Fermentation</td><td>Large-scale culture of microorganisms, aerobic or anaerobic</td><td>Only anaerobic breakdown of sugar, which is the chemical meaning</td></tr>
</table>`;

module.exports = {
  sections: [
    {
      id: "d4916dc4-4e6b-46f3-a59f-3f6372af80e8",
      slug: "respiration",
      heading: "Respiration: two calculations worth rehearsing",
      proseOnly: true,
      html: respTopUp + "\n",
    },
    {
      id: "f02c50e2-ed9d-43a4-8552-77b170e4a29d",
      slug: "gas-exchange-in-humans",
      heading: "Gas Exchange in Humans: gradients, volumes and what the numbers mean",
      html: gasExchange + "\n" + spirometer + "\n",
    },
    {
      id: "bed703c4-851e-4ab8-96e6-cc56be8ce619",
      slug: "biotechnology-and-genetic-modification",
      heading: "Biotechnology: the process control behind the product",
      html: biotech + "\n" + fermenter + "\n",
    },
  ],
};
