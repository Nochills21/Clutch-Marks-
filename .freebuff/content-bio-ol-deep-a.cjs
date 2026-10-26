// IGCSE Biology — depth pass, tranche A (thinnest three remaining notes).
//
// Each section is inserted before "<h2>Equations and symbols</h2>" (or appended
// when a note has no sheet), so the existing body cannot lose a character.
// Figures are inline SVG built from .freebuff/note-figures.cjs: theme colours
// only, no style=, no TeX inside the SVG.
//
//   node .freebuff/refine-note-sections.cjs .freebuff/content-bio-ol-deep-a.cjs
const F = require("./note-figures.cjs");

const { C, text, frame, plot } = F;

/* ── Figure: the water potential ladder ─────────────────────────────── */
const waterLadder = (() => {
  const rows = [
    ["soil solution", "−0.02 MPa", "dilute: solutes are few, so water potential is high"],
    ["root hair cell sap", "−0.40 MPa", "sugars, amino acids and ions keep the sap concentrated"],
    ["xylem in the root", "−0.60 MPa", "the column is under tension, which lowers its potential"],
    ["leaf mesophyll cell", "−1.50 MPa", "solute-rich, and pulled on by the air spaces"],
    ["air spaces in the leaf", "−10 MPa", "humid air: water potential far below any cell"],
    ["the atmosphere", "−100 MPa", "unsaturated air — the sink that drives the whole stream"],
  ];
  const parts = [];
  rows.forEach(([stage, value, note], i) => {
    const y = 26 + i * 52;
    parts.push(
      `<rect x="34" y="${y}" width="492" height="38" rx="4" fill="${i === rows.length - 1 ? C.goldFill : C.goldFillSoft}" stroke="${C.gold}" stroke-width="1.2"/>`,
    );
    parts.push(text(48, y + 17, stage, { fill: C.ink, weight: "600", size: 13 }));
    parts.push(text(48, y + 31, note, { size: 11 }));
    parts.push(text(514, y + 17, value, { anchor: "end", fill: C.goldDeep, weight: "600", size: 13 }));
    if (i < rows.length - 1) {
      parts.push(`<line x1="280" y1="${y + 38}" x2="280" y2="${y + 50}" stroke="${C.muted}" stroke-width="1.6"/>`);
      parts.push(`<polygon points="280,${y + 52} 275,${y + 44} 285,${y + 44}" fill="${C.muted}"/>`);
    }
  });
  parts.push(text(34, 320, "water moves down this ladder; only the mineral ions are pumped up it", { size: 11.5 }));
  return frame({
    id: "tp-water-ladder",
    title: "Water potential falling from soil to atmosphere, with a value for each step",
    label: "Figure 1.",
    caption:
      "The transpiration stream is a ladder of water potentials. Each step is lower than the one before, so water moves by osmosis from cell to cell and then evaporates into the leaf's air spaces. No ATP is spent on the pull: the Sun pays for it by evaporating the water at the top.",
    w: 560,
    h: 330,
    body: parts.join("\n"),
  });
})();

/* ── Figure: respirometer traces at two temperatures ────────────────── */
const respTrace = (() => {
  const line = (rate) => Array.from({ length: 11 }, (_, i) => [i, +(rate * i).toFixed(1)]);
  return plot({
    id: "resp-trace",
    title: "Bubble travel against time for germinating seeds at 20 and 30 degrees Celsius",
    label: "Figure 2.",
    caption:
      "The gradient of each line is the rate of oxygen uptake. Both are straight, because the seeds respire at a steady rate once the apparatus is sealed; the steeper line is the warmer tube. Rate = gradient = distance ÷ time, and dividing by the mass of seeds gives the rate per gram.",
    w: 560,
    h: 320,
    x: { min: 0, max: 10, ticks: [0, 2, 4, 6, 8, 10], label: "time (minutes)" },
    y: { min: 0, max: 72, ticks: [0, 20, 40, 60], label: "bubble travel (mm)" },
    series: [
      { points: line(6.4), color: C.goldDeep, width: 2.6 },
      { points: line(3.1), color: C.gold, width: 2.6 },
    ],
    annotations: [
      { x: 8.2, y: 6.4 * 8.2, text: "30 °C", dx: 6, dy: -4, color: C.goldDeep, weight: "600" },
      { x: 8.2, y: 3.1 * 8.2, text: "20 °C", dx: 6, dy: 12, color: C.gold, weight: "600" },
    ],
  });
})();

/* ── Figure: stabilising selection ──────────────────────────────────── */
const stabilising = (() => {
  const curve = (mean, sd) => {
    const pts = [];
    for (let x = 0; x <= 60; x += 1.5) pts.push([x, Math.exp(-((x - mean) ** 2) / (2 * sd * sd))]);
    return pts;
  };
  return plot({
    id: "var-stabilising",
    title: "Frequency of birth mass before and after stabilising selection",
    label: "Figure 3.",
    caption:
      "Stabilising selection trims both tails: very small and very large babies have lower survival, so the peak rises and narrows while staying in the same place. Directional selection would instead move the peak sideways, and disruptive selection would push it into two peaks.",
    w: 560,
    h: 320,
    x: { min: 0, max: 60, ticks: [0, 15, 30, 45, 60], label: "birth mass (arbitrary units)" },
    y: { min: 0, max: 1.25, ticks: [0, 0.5, 1], label: "frequency" },
    series: [
      { points: curve(30, 8), color: C.muted, width: 2, smooth: true, kind: "dashed" },
      { points: curve(30, 5), color: C.goldDeep, width: 2.8, smooth: true },
    ],
    annotations: [
      { x: 46, y: 0.62, text: "before selection (wide)", dx: 8, dy: 0, color: C.muted },
      { x: 36, y: 1.05, text: "after: peak higher, spread narrower", dx: 8, dy: 0, color: C.goldDeep },
    ],
  });
})();

const transportInPlants = `<h2>Transport in Plants: the mechanism, measured</h2>
<p>The sections above give you the systems and what they do. This one is about the physics and chemistry that make them happen, because that is where the mark-scheme marks for "explain" actually sit: a statement that water travels up the xylem earns a mark for recall, but an explanation has to name the gradient, the force and the properties of water that let the force work. Everything below is written so it can be read in one sitting and still make sense when you come back to it the night before the exam.</p>

<h3>Root hair cells: the gradient does the work, not the surface area</h3>
<p>A root hair cell is a long, thin extension of an epidermal cell. Its familiar adaptation list — large surface area, thin wall, no cuticle, large permanent vacuole — explains how <em>fast</em> water can cross, not <em>why</em> it crosses. The reason is water potential. Soil solution is a very dilute solution, so its water potential is high, close to pure water. The sap inside a root hair cell is concentrated with sugars, amino acids and mineral ions, so its water potential is lower. Water therefore enters by osmosis, down that gradient, across the partially permeable cell surface membrane.</p>
<p>Two consequences follow, and both are examinable. First, the cell must keep its sap concentrated, or the gradient disappears. Mineral ions are absorbed by active transport against their concentration gradient, which costs ATP, which is why root hair cells contain many mitochondria and why their uptake is fastest in well-aerated, warm soil. If you bubble nitrogen through the solution around a root and remove the oxygen, ion uptake stops within minutes while water uptake continues — the classic demonstration that one process is active and the other passive. Second, water uptake stops if the soil water potential falls: over-watering with fertiliser makes the soil solution concentrated, lowers its water potential below that of the root, and the plant wilts even though it is standing in water. That is fertiliser burn, and it is the reverse of the normal gradient.</p>
<p>Deeper in the root, the endodermis carries the Casparian strip, a band of waterproof suberin around each cell wall. Water cannot slip between endodermal cells, so it must pass through their membranes to reach the xylem. This is a filter: the plant controls which ions enter the water column rather than accepting whatever the soil contains.</p>

<h3>Cohesion–tension: how water climbs without a pump</h3>
<p>Water leaves the leaf as vapour and the xylem column is pulled up behind it. Four properties make that possible, and the examiner wants each one named:</p>
<ul>
<li><strong>Transpiration pull.</strong> Evaporation from the moist mesophyll surfaces into the leaf's air spaces, then diffusion out through the stomata, lowers the pressure at the top of the column. The column is continuous, so the drop is transmitted all the way down to the root.</li>
<li><strong>Cohesion.</strong> Water molecules stick to each other by hydrogen bonds. A column only a few micrometres across can support a tension of several megapascals without breaking, which is what allows water to be lifted a hundred metres.</li>
<li><strong>Adhesion.</strong> Water molecules stick to the hydrophilic lignin and cellulose of the xylem wall, which helps hold the column against the walls and resists the column slipping down.</li>
<li><strong>Capillarity.</strong> The narrow lumen of a xylem vessel raises water a little on its own. It is a real effect but a small one — a few centimetres, not a hundred metres — so never offer it as the main explanation.</li>
</ul>
<p>Root pressure exists, and it is worth knowing why it cannot be the answer on its own: ions pumped into the xylem draw water in by osmosis, producing a positive pressure of only a few kilopascals, enough to push water up a short stem and to make a cut stump bleed, but nowhere near the roughly one megapascal needed to raise water ten storeys. The energy for the tall column comes from the Sun, through the latent heat of vaporisation, and from the water potential difference between leaf air spaces and the atmosphere — the ladder in Figure 1.</p>
<p>Xylem vessels are dead at maturity, hollow, with no end walls and lignified walls. Each feature is a consequence of this mechanism: a living cell would have cytoplasm and membranes in the way of the flow, and a thin wall would collapse inward under tension. Lignin also waterproofs, so no water leaks sideways out of the column, and it prevents the vessel imploding as the tension rises. The trade-off is that a xylem vessel cannot repair itself: if an air bubble enters (cavitation), the column breaks and that vessel stops conducting. This is why a cut stem must be cut under water when you set up a potometer.</p>

<h3>Guard cells: the only valves the plant has</h3>
<p>A stoma opens because its two guard cells become turgid. Potassium ions are pumped into the guard cells by active transport; their water potential falls; water enters by osmosis; the cells swell. The wall of a guard cell next to the pore is thicker and less extensible than the wall on the outside, so the swelling cell bows outward and the pore between the pair widens. When potassium leaves, water follows, the cells become flaccid, and the pore closes. Abscisic acid, released when a plant is short of water, triggers exactly this closure — the hormone signal behind wilting as a protective response rather than a failure.</p>
<p>Stomata are a compromise the plant cannot escape. Open, carbon dioxide diffuses in for photosynthesis and water vapour diffuses out. Closed, water is conserved and photosynthesis stops for want of carbon dioxide. That single sentence is the answer to most "why" questions about stomatal behaviour, so learn it in that form.</p>
<p>Distribution follows the same logic. Most species have more stomata on the lower epidermis than the upper, because the lower surface is shaded and cooler and the air beneath the leaf is more humid, so the gradient for evaporation is gentler. Floating leaves such as water lily have stomata only on the upper surface, which is the only surface in contact with air. Xerophytes go further: stomata sunk in pits, rolled leaves that trap a layer of humid air, a thick waxy cuticle, reduced leaves as spines, and CAM photosynthesis that opens stomata at night. Each is a way of keeping the carbon dioxide route open while making the water route as narrow as possible.</p>

<h3>Measuring transpiration without deceiving yourself</h3>
<p>A potometer measures water uptake by a cut shoot, and water uptake is only a proxy for water loss: the two are equal when the shoot is in a steady state. If the shoot is wilting, it is losing more than it takes up; if it has just been watered, it may be storing water, and the potometer reads lower than the true transpiration rate. Say "uptake" when you describe the reading, and "transpiration" only when you explain why they are assumed equal.</p>
<p>The method is a list of ways to avoid a wrong answer. Cut the shoot under water at a slant: an air bubble drawn into the xylem breaks the water column and the reading stops. Assemble the apparatus with the joints submerged, then seal every joint with petroleum jelly, because a leak looks exactly like transpiration. Dry the leaves gently before starting, so surface water does not evaporate and inflate the first readings. Use one bubble and reset it by opening the reservoir tap rather than by tipping the apparatus. Keep temperature, humidity, light intensity and air movement constant, and change exactly one of them when you are investigating a factor — a lamp at a fixed distance, a fan on one setting, a plastic bag for humidity.</p>
<p>Then calculate properly. Rate of uptake is distance moved divided by time. To turn that into a volume, multiply by the cross-sectional area of the tube: for a tube of radius 0.5 mm, the area is π × 0.5² = 0.785 mm², so a bubble moving 32 mm has taken up 0.785 × 32 = 25.1 mm³; over 5 minutes that is 5.0 mm³ min⁻¹. Divide by leaf area to compare shoots fairly: a shoot with 240 cm² of leaf gives 0.021 mm³ cm⁻² min⁻¹. Errors worth naming are the ones a mark scheme will pay for: a temperature change expands the air bubble and moves it without any uptake, the shoot may be wilting, the cut end may be blocked by sap, and a single reading has no error bar, so repeat and average.</p>

<h3>Translocation: loading, pressure flow, unloading</h3>
<p>Phloem transport runs from a source — a photosynthesising leaf, or a storage organ in spring — to a sink, such as a root, a growing tip, a developing fruit or a storage tissue. Sucrose is loaded into the sieve tube by active transport, using companion cells that are packed with mitochondria and which pass the sugar across through plasmodesmata. Loading lowers the water potential inside the sieve tube, water enters from the adjacent xylem by osmosis, and the resulting hydrostatic pressure at the source pushes the sap along the tube. At the sink, sucrose is unloaded, either used in respiration or converted to starch, so the water potential there rises, water leaves to the xylem, and the pressure falls. Sap therefore flows down a pressure gradient from source to sink, a mechanism called mass flow or pressure flow.</p>
<p>The structure matches the mechanism. Sieve tube elements are joined end to end by sieve plates perforated with pores; the elements lose their nucleus and most organelles at maturity so the lumen is clear for flow, and each is kept alive by an adjacent companion cell. The evidence for the route is worth knowing because it is a favourite data question: removing a ring of bark, which contains the phloem, makes sugars accumulate and the stem swell above the ring while the roots starve below it; aphids feeding on stems exude sap that is rich in sucrose, and their stylets can be cut to sample the contents; carbon-14 supplied to a leaf appears in the roots within hours; and the measured speed, around a metre per hour, is far faster than diffusion could manage.</p>

<h3>Common exam phrasings that lose marks</h3>
<table>
<tr><th>Command word</th><th>What the mark scheme needs</th><th>In this topic</th></tr>
<tr><td>State</td><td>One fact, no reason</td><td>"Xylem vessels are dead and hollow."</td></tr>
<tr><td>Describe</td><td>The sequence, in order</td><td>"Water evaporates from the mesophyll into the air spaces, then diffuses out through the stomata."</td></tr>
<tr><td>Explain</td><td>A cause and its effect, linked</td><td>"Because loading sucrose lowers the water potential in the phloem, water enters by osmosis and raises the pressure."</td></tr>
<tr><td>Suggest</td><td>Apply to the unfamiliar case</td><td>"The leaves are rolled, which traps humid air and reduces the water potential gradient."</td></tr>
<tr><td>Compare</td><td>Both sides, using the same feature</td><td>"Xylem carries water and minerals; phloem carries sucrose and amino acids."</td></tr>
</table>
<p>Two phrases to avoid. "Water is sucked up by the roots" inverts the mechanism: the pull is at the top, and the roots follow. And "the plant drinks" implies an active process: the only active steps in the whole story are ion uptake at the root and sucrose loading in the phloem.</p>`;

const respiration = `<h2>Respiration: the chemistry under the equation</h2>
<p>The equation for aerobic respiration balances, so it is easy to write and easy to misunderstand. It is not one reaction but a chain of them, and the chain explains the details mark schemes keep asking about: why oxygen is needed at all, why anaerobic respiration releases so little energy, why carbon dioxide appears in some organisms and not others, and where the oxygen debt goes. This section follows the chemistry far enough to answer those questions without going beyond what the specification expects.</p>

<h3>ATP: the cell's currency, not its fuel</h3>
<p>Glucose is the fuel; ATP is what the cell actually spends. Respiration transfers the energy released by oxidising glucose into the bonds of ATP, and a cell then hydrolyses ATP to ADP and inorganic phosphate wherever work is needed: active transport across a membrane, protein synthesis on a ribosome, contraction of a muscle fibre, movement of chromosomes in mitosis, and the maintenance of body temperature in endotherms. Each hydrolysis releases a small, usable packet of energy, roughly thirty kilojoules per mole, rather than the sudden large release that burning glucose would give.</p>
<p>ATP is not stored in quantity. A working muscle can use its entire ATP content in seconds, so it is continually remade, and this is the real reason respiration never stops. Even a resting cell respires continuously, and the rate rises with activity. If you are asked why a dead organism stops producing carbon dioxide, the answer is not "it has run out of glucose" but "its enzymes have denatured, so the reactions that regenerate ATP have stopped".</p>

<h3>Glycolysis: the stage that needs no oxygen</h3>
<p>The first stage takes place in the cytoplasm and needs no oxygen at all. A six-carbon glucose molecule is split into two three-carbon pyruvate molecules, and the process yields a net two ATP per glucose. Because this stage is anaerobic, it is the reason any respiration at all is possible without oxygen: anaerobic respiration is not a different pathway so much as a different ending to the same beginning.</p>
<p>This is also why the anaerobic equations are worth writing as a two-step story. Glucose goes to pyruvate first, in both cases; then pyruvate is converted either onward into the mitochondrion, when oxygen is available, or into lactate or ethanol, when it is not.</p>

<h3>Aerobic: where the oxygen is actually spent</h3>
<p>With oxygen present, pyruvate enters a mitochondrion. There it is broken down completely: the carbon atoms leave as carbon dioxide, and the hydrogen atoms are removed and carried to the inner membrane — the cristae — where they are passed along a chain of electron carriers. At the end of that chain, hydrogen combines with oxygen to form water. Oxygen's role is therefore not to "burn" glucose directly but to accept the hydrogen at the end of the chain: remove it and the carriers stay reduced, the chain stops, and the whole of aerobic respiration stops with it. That single sentence explains why breathing faster after exercise is not enough on its own — the oxygen has to reach the mitochondrion, which is why circulation and haemoglobin matter too.</p>
<p>The yield is about thirty to thirty-two ATP per glucose, against two for the anaerobic route. Do not write thirty-eight; modern counting gives a lower figure, and the mark scheme only needs "much more than anaerobic". Carbon dioxide is released in the mitochondrion, never in the cytoplasm, which is why a respiring plant cell releases carbon dioxide but a respiring human red blood cell — which has no mitochondria — does not.</p>
<p>Check the balance once by counting atoms. Glucose C₆H₁₂O₆ plus six O₂ gives six CO₂ and six H₂O: six carbons, twelve hydrogens and eighteen oxygens on each side. If a question gives you an unfamiliar fuel, this is how you write its equation.</p>

<h3>Anaerobic: two different endings, two different equations</h3>
<p>In animals, including your own muscles, pyruvate is converted to lactate. No carbon dioxide is released, and the yield is two ATP per glucose: C₆H₁₂O₆ → 2C₃H₆O₃. In yeast and in plant cells, pyruvate is converted to ethanol and carbon dioxide, again with two ATP: C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂. The difference matters in the exam: if a respiring tissue releases carbon dioxide without oxygen, it is not animal muscle.</p>
<p>Lactate is not a waste product in the way carbon dioxide is, because it still holds usable energy. It is carried in the blood to the liver, where it is oxidised back to pyruvate using oxygen supplied after exercise has stopped. That extra oxygen is the oxygen debt, and it is why breathing stays elevated for minutes afterwards. The lactate that accumulates in muscle lowers the pH slightly and is associated with the burning sensation and fatigue of sprinting; the older claim that lactate alone causes cramp is too strong, so write "associated with fatigue" and gain the mark without overstating the evidence.</p>
<p>Where each route happens in real organisms is examinable. Anaerobic respiration in animals occurs during vigorous exercise, when breathing and circulation cannot deliver oxygen fast enough. In plants it happens in roots in waterlogged soil, where air spaces fill with water and oxygen cannot diffuse in; this is one reason waterlogged fields damage crops. In microorganisms it is the basis of brewing and bread-making, where the carbon dioxide from yeast raises the dough, and of biogas production.</p>

<h3>The respirometer: what the bubble is really showing</h3>
<p>A respirometer seals a living organism in a tube with a carbon dioxide absorbent such as potassium hydroxide. The organism uses oxygen and releases carbon dioxide, but the alkali removes the carbon dioxide, so the only gas leaving the air in the tube is oxygen. The volume falls, the pressure falls, and the bubble at the end of the capillary moves towards the organism. The distance it travels is therefore a direct measure of oxygen consumption, not of total gas exchange — a distinction the exam likes.</p>
<p>Temperature must be held constant, and there is a specific reason: a rise of one degree Celsius expands a gas by about 0.3 %, and over ten minutes that expansion can equal the movement caused by a small organism's respiration. A control tube — the same apparatus with the same mass of dead organism, or with glass beads — is called a thermobarometer. It shows how far the bubble moves for reasons that are not respiration, and you subtract that movement from the reading.</p>
<p>Calculate in the order the mark scheme expects. Rate equals distance divided by time; divide by the mass of the organism to compare fairly; state the units. Two tubes at different temperatures give two rates (Figure 2), and the comparison is only valid if the masses, the species, the state of the organism and the time are the same. Good Paper 6 answers add repeats and a mean, and mention that the apparatus was sealed and left to equilibrate for a few minutes before the first reading.</p>

<h3>Evidence: how we know what we know</h3>
<p>Four demonstrations are worth having at your fingertips, because each isolates one claim. Yeast with glucose in a sealed tube, connected to limewater, turns the limewater milky: carbon dioxide is produced without oxygen, so anaerobic respiration occurs. Boiled yeast in the same apparatus produces nothing: the process needs intact enzymes, so it is biological, not a chemical decomposition. Germinating seeds in a respirometer take up oxygen faster than dry seeds: germination is energetically expensive and powered by aerobic respiration. And a person's oxygen consumption stays above resting rate for several minutes after hard exercise, while blood lactate falls: the extra oxygen is being used to clear the lactate, which is the oxygen debt made visible.</p>

<h3>Anaerobic and aerobic compared, in the terms an examiner uses</h3>
<table>
<tr><th>Feature</th><th>Aerobic</th><th>Anaerobic (animal)</th><th>Anaerobic (yeast)</th></tr>
<tr><td>Oxygen</td><td>Required</td><td>Not required</td><td>Not required</td></tr>
<tr><td>Where</td><td>Cytoplasm, then mitochondria</td><td>Cytoplasm only</td><td>Cytoplasm only</td></tr>
<tr><td>Products</td><td>Carbon dioxide and water</td><td>Lactate</td><td>Ethanol and carbon dioxide</td></tr>
<tr><td>ATP per glucose</td><td>About 30</td><td>2</td><td>2</td></tr>
<tr><td>When it happens</td><td>Continuously, in all living cells</td><td>Vigorous exercise, oxygen shortfall</td><td>Waterlogged roots, brewing, baking</td></tr>
<tr><td>Recovery</td><td>None needed</td><td>Oxygen debt repaid in the liver</td><td>Ethanol accumulates and is toxic</td></tr>
</table>
<p>One last precision point. Respiration is a series of enzyme-controlled reactions inside cells; breathing is the mechanical movement of air into and out of the lungs; gas exchange is diffusion across a surface. They are three different words for three different things, and a paper that asks for two of them usually has a mark for keeping them apart.</p>`;

const variation = `<h2>Variation and Selection: the genetics underneath</h2>
<p>Natural selection is usually taught as five steps, which is fine for a two-mark question and not enough for a four-mark one. The marks live in the detail: where the variation came from, why selection cannot create it, and what has to happen for a population to split into two species. This section supplies that detail, using two examples — the peppered moth and antibiotic resistance — that between them cover almost every version of the question.</p>

<h3>Where the differences come from</h3>
<p>Variation has four sources, and an answer that names all four is complete. <strong>Mutation</strong> creates new alleles: a change in the base sequence of a gene, or a change in chromosome structure or number. <strong>Meiosis</strong> shuffles existing alleles twice over, through crossing over between homologous chromosomes in prophase I and independent assortment of the pairs in metaphase I. <strong>Random fertilisation</strong> combines one gamete from each parent, and which two gametes meet is a matter of chance. <strong>The environment</strong> modifies the phenotype without touching the genotype: nutrition changes body mass, sunlight changes skin colour, and a plant grown in shade is taller and thinner than its genetic twin in full sun.</p>
<p>That last point is the answer to a question that catches people out. Continuous variation is usually polygenic — controlled by many genes, each with a small effect — and is also affected by the environment, which is why a graph of a continuous feature is a smooth bell-shaped curve and why identical twins are not identically tall. Discontinuous variation is usually controlled by one or a few genes with large effects and is little affected by the environment, which is why blood group data fall into four separate columns with nothing in between.</p>

<h3>Mutation: the source of variation, never the response to need</h3>
<p>Mutations happen at random with respect to what would be useful. They arise during DNA replication, or are caused by mutagenic agents such as ultraviolet light, ionising radiation and some chemicals. A gene mutation may be a substitution, where one base is replaced by another, or an insertion or deletion, where bases are added or lost and every codon after the change is read differently. Most mutations are neutral or harmful, because a random change to a working instruction is unlikely to improve it; a very small number are advantageous in a particular environment.</p>
<p>The sickle-cell allele is the example that repays knowing in full. A single base substitution in the gene for the beta chain of haemoglobin produces haemoglobin S. At low oxygen concentrations, haemoglobin S molecules stick together and crystallise, distorting the red cell into a sickle shape. Sickled cells block small blood vessels, causing pain and tissue damage, and they are destroyed faster than they are made, causing anaemia. A person with two copies of the allele may die young; a person with one copy has sickle-cell trait and is usually healthy.</p>
<p>In regions where malaria is common, that heterozygote has a clear advantage: the malaria parasite spends part of its life cycle inside red blood cells, and in a carrier those cells sickle and are removed by the spleen before the parasite can multiply. So the allele persists at high frequency in malarious populations even though homozygotes are at a disadvantage. This is the important exception to "the better allele always wins": here neither homozygote is best, and selection maintains both alleles. It is also the cleanest demonstration that the environment decides whether a mutation is advantageous — remove malaria and the allele becomes simply harmful.</p>

<h3>Selection: three shapes, one mechanism</h3>
<p>All selection does is change the frequency of alleles in the next generation, because individuals with certain phenotypes survive and reproduce more often. What differs is which phenotypes are favoured, and a graph of the distribution shows it.</p>
<ul>
<li><strong>Directional selection</strong> moves the peak: one extreme is favoured. The peppered moth is the standard case. Before industrialisation, the pale speckled form was camouflaged against lichen-covered bark and the dark form was conspicuous and eaten by birds. Soot killed the lichen and blackened the trunks, the pale form became the conspicuous one, and the frequency of the dark allele rose sharply within decades. When clean-air legislation allowed lichens to return, the trend reversed — which is the strongest evidence that the agent was bird predation, not the pollution itself.</li>
<li><strong>Stabilising selection</strong> trims both tails and keeps the average: very small babies lose heat quickly and very large ones are difficult to deliver, so intermediate birth masses have the highest survival. The curve becomes taller and narrower without moving (Figure 3).</li>
<li><strong>Disruptive selection</strong> pushes the two extremes apart and can, in theory, split a population. It is rare, and worth mentioning mainly to show you know directional selection is not the only possibility.</li>
</ul>

<h3>Antibiotic resistance: selection you can watch</h3>
<p>Write this answer as a mechanism, in order, and never as a story about bacteria "becoming" resistant.</p>
<ol>
<li>Variation already exists in the bacterial population: random mutation has given a few cells an allele that lets them survive a particular antibiotic, for instance by producing an enzyme that breaks it down or by altering the protein the antibiotic targets.</li>
<li>The antibiotic is applied. It kills the susceptible cells, which are the great majority.</li>
<li>The resistant cells survive because they are not affected, and they have no competition for nutrients.</li>
<li>They reproduce, passing the allele to their offspring — and in bacteria they can also pass it sideways to unrelated cells on plasmids, which is why resistance spreads so fast.</li>
<li>The frequency of the resistance allele in the population rises, and the next dose of the same antibiotic is less effective.</li>
</ol>
<p>Two phrases earn marks and two lose them. "The antibiotic selected the resistant bacteria" is right; "the antibiotic caused the mutation" is wrong, because the mutation was there before the antibiotic, and that is the whole point of the example. "Bacteria became resistant in order to survive" is wrong for the same reason: there is no intention and no direction.</p>
<p>The practical consequences follow directly. Finish a prescribed course, because the partially treated population is enriched in the least susceptible survivors. Do not use antibiotics for viral infections, because they do nothing except expose your bacteria to selection. And expect problems in hospitals, where close contact, invasive procedures and heavy antibiotic use make selection intense: MRSA and other resistant strains are the result of ordinary selection acting in an unusual environment, not of bacteria acquiring new tricks on purpose.</p>

<h3>Speciation without magic</h3>
<p>A species is a group of organisms that can interbreed to produce fertile offspring. Speciation is what happens when one population becomes two that cannot. In the standard model, a population is split by a geographical barrier — a river changing course, a mountain range, a sea channel, or a few individuals colonising an island. The two groups no longer exchange alleles, so mutation and genetic drift accumulate independently, and, crucially, the selection pressures differ because the environments differ. Over many generations the two gene pools diverge so far that their gametes no longer fuse successfully, or the offspring are sterile. If the barrier later disappears and the two populations meet, they either interbreed freely — in which case they were never two species — or they do not, or their hybrids are sterile.</p>
<p>The mule is the standard illustration of the last case. A horse and a donkey can mate and produce a mule, but the mule's chromosomes cannot pair properly in meiosis, so it is sterile. Horses and donkeys are therefore separate species despite being able to hybridise. Use this whenever a question asks how you would tell whether two populations are the same species: interbreed them and see whether the offspring are fertile, not merely whether mating is possible.</p>

<h3>Artificial selection, and the price of uniformity</h3>
<p>Selective breeding runs the same mechanism with a human choosing the phenotype: identify individuals with the desired feature, breed them, select again among the offspring, and repeat over many generations. The allele frequencies shift in the direction the breeder wants, which is why every pedigree breed of dog, every high-yield cereal and every breed of dairy cow exists.</p>
<p>The cost is genetic uniformity. Selection for one feature shrinks the gene pool, and a population with little variation has little capacity to respond when the environment changes. The Irish potato famine is the textbook case: millions of people depended on a few genetically near-identical potato varieties, so a single blight pathogen could destroy the entire crop. Modern breeding therefore keeps seed banks and maintains landraces as reservoirs of alleles that no current variety carries but a future disease might require. That is natural selection's raw material being stored deliberately, and it is the best answer to "why does variation matter?" that you can give.</p>

<h3>Checking an allele-frequency calculation</h3>
<p>Questions give you the frequency of a recessive phenotype and ask for the allele frequencies. Work in the order below and check at the end.</p>
<ol>
<li>Write the frequency of the recessive phenotype as a proportion: 1 in 2,500 is 0.0004.</li>
<li>That proportion equals q², where q is the frequency of the recessive allele.</li>
<li>Take the square root: q = 0.02.</li>
<li>Since p + q = 1, p = 0.98.</li>
<li>The carrier frequency is 2pq = 2 × 0.98 × 0.02 = 0.0392, about 3.9 %, or roughly 1 in 25.</li>
</ol>
<p>Now check: q² + 2pq + p² = 0.0004 + 0.0392 + 0.9604 = 1.0000. If your three frequencies do not sum to one, or p + q does not equal one, you have made an arithmetic slip — find it before you write the answer, because a mark-scheme answer that does not sum correctly reads as a guess.</p>`;

module.exports = {
  sections: [
    {
      id: "d7347bf0-a7bf-4ab9-9048-9cbed508b672",
      slug: "transport-in-plants",
      heading: "Transport in Plants: the mechanism, measured",
      html: transportInPlants + "\n" + waterLadder + "\n",
    },
    {
      id: "d4916dc4-4e6b-46f3-a59f-3f6372af80e8",
      slug: "respiration",
      heading: "Respiration: the chemistry under the equation",
      html: respiration + "\n" + respTrace + "\n",
    },
    {
      id: "51eb3656-5b3a-446b-9416-70b08a1776fe",
      slug: "variation-and-selection",
      heading: "Variation and Selection: the genetics underneath",
      html: variation + "\n" + stabilising + "\n",
    },
  ],
};
