// IGCSE Biology — depth pass, tranche D: biological molecules, enzymes,
// movement into and out of cells.
const F = require("./note-figures.cjs");
const { C, text, frame, plot } = F;

/* ── Figure: condensation and hydrolysis ─────────────────────────────── */
const condensation = (() => {
  const parts = [];
  const boxY = 70;
  const mono = (x, label, sub) => [
    `<rect x="${x}" y="${boxY}" width="72" height="46" rx="6" fill="${C.goldFill}" stroke="${C.gold}" stroke-width="1.6"/>`,
    text(x + 36, boxY + 22, label, { anchor: "middle", size: 13, fill: C.ink, weight: "600" }),
    text(x + 36, boxY + 38, sub, { anchor: "middle", size: 10.5 }),
  ];
  parts.push(...mono(40, "glucose", "C₆H₁₂O₆"));
  parts.push(...mono(176, "glucose", "C₆H₁₂O₆"));
  parts.push(...mono(360, "maltose", "C₁₂H₂₂O₁₁"));
  // Bond line and the water released.
  parts.push(
    `<line x1="112" y1="${boxY + 23}" x2="176" y2="${boxY + 23}" stroke="${C.goldDeep}" stroke-width="2.6" stroke-dasharray="7 5"/>`,
    text(144, boxY - 10, "condensation", { anchor: "middle", size: 12, fill: C.goldDeep, weight: "600" }),
    text(144, boxY + 52, "removes H₂O", { anchor: "middle", size: 11 }),
    `<line x1="248" y1="${boxY + 23}" x2="286" y2="${boxY + 23}" stroke="${C.muted}" stroke-width="2"/>`,
    `<polygon points="290,${boxY + 23} 280,${boxY + 18} 280,${boxY + 28}" fill="${C.muted}"/>`,
    text(320, boxY + 14, "+ H₂O", { size: 11.5 }),
  );
  // Reverse arrow underneath.
  parts.push(
    `<line x1="286" y1="${boxY + 74}" x2="248" y2="${boxY + 74}" stroke="${C.muted}" stroke-width="2"/>`,
    `<polygon points="244,${boxY + 74} 254,${boxY + 69} 254,${boxY + 79}" fill="${C.muted}"/>`,
    text(320, boxY + 78, "hydrolysis: adds H₂O, breaks the glycosidic bond", { size: 11 }),
  );
  // A second row making the same point for proteins.
  const row2 = boxY + 150;
  parts.push(
    `<rect x="40" y="${row2}" width="72" height="46" rx="6" fill="${C.goldFillSoft}" stroke="${C.gold}" stroke-width="1.6"/>`,
    text(76, row2 + 22, "amino acid", { anchor: "middle", size: 12, fill: C.ink }),
    `<rect x="176" y="${row2}" width="72" height="46" rx="6" fill="${C.goldFillSoft}" stroke="${C.gold}" stroke-width="1.6"/>`,
    text(212, row2 + 22, "amino acid", { anchor: "middle", size: 12, fill: C.ink }),
    `<line x1="112" y1="${row2 + 23}" x2="176" y2="${row2 + 23}" stroke="${C.goldDeep}" stroke-width="2.6" stroke-dasharray="7 5"/>`,
    text(144, row2 - 8, "peptide bond", { anchor: "middle", size: 11.5, fill: C.goldDeep }),
    text(320, row2 + 23, "a dipeptide plus water", { size: 11.5 }),
  );
  parts.push(text(40, 300, "Every polymer in a cell is built by removing water and broken by adding it back.", { size: 11.5 }));
  return frame({
    id: "bm-condensation",
    title: "Two glucose molecules joining by condensation to form maltose and water, and the reverse hydrolysis",
    label: "Figure 1.",
    caption:
      "The same reaction builds every polymer: condensation removes a water molecule and forms a bond, hydrolysis adds one back and breaks it. That is why digestion is hydrolysis, and why a cell that stores starch rather than glucose also stores less water.",
    w: 560,
    h: 320,
    body: parts.join("\n"),
  });
})();

/* ── Figure: rate against substrate concentration ────────────────────── */
const enzymeKinetics = (() => {
  const pts = [];
  for (let s = 0; s <= 10; s += 0.4) {
    const v = (3.4 * s) / (2.1 + s);
    pts.push([+s.toFixed(1), +v.toFixed(2)]);
  }
  return plot({
    id: "enz-kinetics",
    title: "Rate of reaction against substrate concentration at a fixed enzyme concentration",
    label: "Figure 2.",
    caption:
      "The curve rises steeply while substrate is scarce, then flattens: every active site is occupied, so adding more substrate cannot increase the rate. The plateau is the point at which substrate stops being the limiting factor — the same shape you get for light intensity in photosynthesis, for the same reason.",
    w: 580,
    h: 320,
    x: { min: 0, max: 10, ticks: [0, 2, 4, 6, 8, 10], label: "substrate concentration (arbitrary units)" },
    y: { min: 0, max: 4, ticks: [0, 1, 2, 3, 4], label: "rate of reaction (arbitrary units)" },
    series: [{ points: pts, color: C.gold, width: 2.8, smooth: true }],
    hidden: [{ y: 3.4, color: C.goldDeep }],
    annotations: [
      { x: 6.6, y: 3.42, text: "plateau: all active sites occupied", dx: 4, dy: -8, color: C.goldDeep, size: 12 },
      { x: 0.4, y: 0.7, text: "substrate is limiting", dx: 4, dy: 0, color: C.muted, size: 11.5 },
    ],
  });
})();

/* ── Figure: potato cylinders in sugar solutions ─────────────────────── */
const potato = plot({
  id: "mv-potato",
  title: "Percentage change in mass of potato cylinders against sugar solution concentration",
  label: "Figure 1.",
  caption:
    "Where the line crosses zero, the solution is isotonic with the potato tissue: no net movement of water. To the left of that point the cells gain water and become turgid; to the right they lose water and become flaccid, then plasmolysed. Reading the intercept is a mark in itself.",
  w: 580,
  h: 330,
  x: { min: 0, max: 1.0, ticks: [0, 0.2, 0.4, 0.6, 0.8, 1.0], label: "sugar solution concentration (mol dm⁻³)" },
  y: { min: -24, max: 20, ticks: [-20, -10, 0, 10, 20], label: "change in mass (%)" },
  series: [{
    points: [[0, 17], [0.2, 11], [0.4, 4], [0.6, -5], [0.8, -14], [1.0, -22]],
    color: C.gold,
    width: 2.6,
    smooth: true,
    dotted: true,
  }],
  hidden: [{ y: 0, color: C.goldDeep }],
  annotations: [
    { x: 0.47, y: 0.4, text: "isotonic point", dx: 6, dy: -12, color: C.goldDeep, size: 12 },
    { x: 0.72, y: 12, text: "water lost: plasmolysis", dx: 0, dy: 0, color: C.muted, size: 11.5 },
    { x: 0.06, y: -16, text: "water gained: turgid", dx: 4, dy: 0, color: C.muted, size: 11.5 },
  ],
});

const molecules = `<h2>Biological Molecules: the chemistry that explains the tests</h2>
<p>The food tests are usually learned as four recipes, which is why they are forgotten a week later. They make far more sense as four consequences of molecular structure: iodine works because amylose coils, Benedict's works because a reducing sugar can donate electrons, emulsion works because lipid is soluble in ethanol and not in water. This section supplies the structure underneath, and the arithmetic that turns a food test into a measurement.</p>

<h3>Condensation and hydrolysis: one reaction, every polymer</h3>
<p>Every large biological molecule is built from small subunits joined by a bond formed with the removal of a water molecule. That reaction is condensation, and its reverse — adding water back to break the bond — is hydrolysis. The bond has a different name in each family: glycosidic between sugars, peptide between amino acids, ester between glycerol and fatty acids. The pattern is identical, and the consequence is examinable: digestion is hydrolysis, which is why it needs water and why enzymes that catalyse it are called hydrolytic enzymes.</p>
<p>There is a second, less obvious consequence. Storing energy as a polymer rather than as loose subunits means storing less water, because every free glucose molecule would exert an osmotic effect and draw water in. Starch and glycogen are osmotically almost inert; a thousand glucose units joined together have the osmotic effect of one molecule. That is why cells store carbohydrate as a polymer, and it is a mark-worthy answer to "why not just keep glucose?".</p>

<h3>Carbohydrates: same atoms, different properties</h3>
<p>Monosaccharides are single sugars with the formula C₆H₁₂O₆: glucose, fructose and galactose are isomers, with the same atoms arranged differently, which is why they taste different and are handled differently by the body. Two monosaccharides joined form a disaccharide — glucose plus glucose gives maltose, glucose plus fructose gives sucrose, glucose plus galactose gives lactose — with the loss of one water molecule, so the formula is C₁₂H₂₂O₁₁.</p>
<p>Polysaccharides are the interesting case, because they are built from the same glucose and behave completely differently depending on how the units are joined. <strong>Amylose</strong>, one component of starch, is a long unbranched helix of α-glucose; the helix is compact and traps iodine inside it, which is why starch turns blue-black with iodine solution. <strong>Amylopectin</strong>, the other component, is branched, and the branches give many ends for enzymes to attack, so it is digested quickly. <strong>Glycogen</strong> is even more branched and is the animal storage form, which suits a tissue that needs to release glucose fast. <strong>Cellulose</strong> is made of β-glucose, and joining β-glucose flips every alternate unit, so the chain is straight and forms hydrogen bonds with its neighbours, producing strong microfibrils. Human enzymes cannot break β-1,4 bonds, so cellulose passes through undigested as dietary fibre — the same glucose, a completely different fate, because of the orientation of one bond.</p>

<h3>Proteins: four levels, and what denaturation actually breaks</h3>
<p>Amino acids join by peptide bonds into a polypeptide: the primary structure is the sequence. That chain then folds. Hydrogen bonds between nearby amino acids form a regular secondary structure, a helix or a sheet. The whole chain then folds into a precise three-dimensional shape held by hydrogen bonds, ionic bonds between charged side chains, hydrophobic interactions and — importantly — covalent disulphide bridges between cysteine residues. That folded shape is the tertiary structure, and it is the shape that matters, because the shape determines what the protein can do. Some proteins, such as haemoglobin, have several polypeptide chains and a non-protein prosthetic group: that is quaternary structure.</p>
<p>Denaturation is the loss of the tertiary structure, and it is worth being precise about what breaks. Heat increases vibration, which breaks the weak hydrogen and ionic bonds but not the peptide bonds, so the chain unfolds without being cut. Extreme pH alters the charges on side chains, which breaks ionic bonds. Heavy metal ions bind to side chains and disrupt the folding. In every case the primary structure survives, which is why a denatured protein cannot refold into its original shape: the information is still there, but the correct weak interactions have been destroyed and the molecule collapses into a random tangle. This is why a boiled egg cannot be un-boiled, and why an enzyme denatured by heat does not recover when it cools — a distinction examiners test constantly.</p>

<h3>Lipids: why the same class of molecule builds a membrane and blocks an artery</h3>
<p>A triglyceride is glycerol joined to three fatty acids by ester bonds, formed by condensation. Fatty acids differ in their hydrocarbon tails. <strong>Saturated</strong> tails have no carbon-carbon double bonds, so they are straight and pack closely, which makes them solid at room temperature and is associated with raised LDL cholesterol. <strong>Unsaturated</strong> tails have one or more double bonds, which put a kink in the chain so the molecules cannot pack tightly: they are liquid at room temperature. A <strong>phospholipid</strong> replaces one fatty acid with a phosphate group, giving a molecule with a hydrophilic head and two hydrophobic tails — and that single change is why phospholipids form bilayers in water, with tails inward and heads facing the water on both sides. Every cell membrane is built from that behaviour, not from a scaffold.</p>
<p>Lipids are also the most energy-dense food: about 37 kJ g⁻¹ against 17 kJ g⁻¹ for carbohydrate and protein. The reason is chemical — hydrocarbon chains are highly reduced, so oxidising them yields more energy per gram — and the biological consequence is that fat is the efficient long-term store and also the reason a high-fat diet delivers more energy than its mass suggests.</p>

<h3>Water: five properties, five biological reasons</h3>
<ul>
<li><strong>It is a solvent.</strong> Its polarity lets it dissolve ions and polar molecules, so reactions can happen in solution and substances can be transported in blood and sap.</li>
<li><strong>It has a high specific heat capacity.</strong> A lot of energy raises its temperature only slightly, which buffers organisms and habitats against temperature change — the reason a pond does not boil on a hot day.</li>
<li><strong>It has a high latent heat of vaporisation.</strong> Evaporating water carries away a large amount of energy, which is why sweating and transpiration cool effectively.</li>
<li><strong>Its molecules cohere.</strong> Hydrogen bonding holds a continuous column in a xylem vessel and gives water a high surface tension, which matters for small organisms and for water movement in soil.</li>
<li><strong>It is a reactant and a product.</strong> It is used in hydrolysis and produced in condensation and in aerobic respiration.</li>
</ul>
<p>Water is also unusual in being less dense as a solid, so ice floats and insulates the water beneath — which is why aquatic organisms survive a frozen winter. That property is worth knowing as an application of hydrogen bonding rather than as trivia.</p>

<h3>The food tests, with the reason behind each step</h3>
<table>
<tr><th>Test for</th><th>Reagent and method</th><th>Positive result</th><th>Why it works</th></tr>
<tr><td>Starch</td><td>Iodine in potassium iodide solution, at room temperature</td><td>Blue-black</td><td>Iodine molecules sit inside the amylose helix and the complex absorbs light differently</td></tr>
<tr><td>Reducing sugar</td><td>Benedict's solution, heat in a water bath at about 80 °C for five minutes</td><td>Green, yellow, orange, then brick-red precipitate</td><td>Reducing sugars reduce the blue copper(II) ions to red copper(I) oxide; the colour shows how much</td></tr>
<tr><td>Protein</td><td>Biuret reagent (or dilute sodium hydroxide then copper(II) sulphate)</td><td>Purple or lilac</td><td>Copper ions form a coloured complex with peptide bonds</td></tr>
<tr><td>Lipid</td><td>Emulsion test: shake with ethanol, then pour into water</td><td>Cloudy white emulsion</td><td>Lipid dissolves in ethanol but not in water, so it comes out of solution as tiny droplets that scatter light</td></tr>
</table>
<p>Three practical points carry marks. Benedict's needs heat: no water bath, no result. The biuret test must not be used on a coloured sample without a control, because the colour change is subtle. And every test needs a negative control — water instead of the sample — because a brick-red result from a reagent that was already contaminated proves nothing.</p>
<p>Benedict's can be made semi-quantitative by comparing the colour with a series of known concentrations, or by filtering off the precipitate and measuring its mass. A colorimeter reading the absorbance of the blue solution gives a proper number: the more sugar, the less blue remains, so absorbance falls as concentration rises. This is how a Paper 6 question turns a qualitative test into a rate measurement.</p>

<h3>Turning a food test into a number: the burning-food calorimeter</h3>
<p>A known mass of food is burned beneath a boiling tube containing a known volume of water, and the temperature rise is recorded. The energy released is calculated from the water: energy = mass of water × 4.2 × temperature rise, where 4.2 J is the energy needed to raise 1 g of water by 1 °C.</p>
<p>Worked example: 0.50 g of peanut raises 20 cm³ of water from 20 °C to 50 °C. The water gained 20 × 4.2 × 30 = 2,520 J. Per gram of peanut that is 2,520 ÷ 0.50 = 5,040 J g⁻¹, or about 5.0 kJ g⁻¹. A packet may state 25 kJ g⁻¹, and the enormous discrepancy is not an error in the arithmetic: much of the heat is lost to the surroundings, some food is incompletely burned, and the apparatus heats the tube as well as the water. The result is an underestimate, and saying so is worth a mark — as is the improvement, a bomb calorimeter with a sealed oxygen-filled chamber.</p>`;

const enzyme = `<h2>Enzymes: kinetics where the marks actually live</h2>
<p>Enzyme questions almost always ask for a shape, a rate or a limiting factor. This section supplies the detail behind all three: what the active site really does, how to calculate a rate from raw measurements, why a curve flattens, and what an immobilised enzyme is used for in industry. The definitions are in the sections above; nothing here repeats them.</p>

<h3>The active site: complementary, not identical</h3>
<p>An enzyme's active site is a small region, often a pocket, formed by a handful of amino acids brought together by the folding of the whole chain. Its shape and charge distribution are complementary to the substrate: the substrate fits, and the groups lining the pocket catalyse the reaction. The old lock-and-key picture is a useful first approximation, but the more accurate description is induced fit — the active site is not exactly the right shape until the substrate arrives, and binding changes the enzyme's conformation slightly so that the substrate is held in the strained arrangement that makes the reaction easier.</p>
<p>Whichever description you use, two consequences follow and both are examinable. Specificity arises because a differently shaped substrate cannot bind, or binds but is not positioned correctly. And denaturation destroys activity because unfolding destroys the pocket: the amino acids that formed it are now somewhere else, so no substrate can bind at all. That is why a denatured enzyme is not merely slower — it is inactive, permanently.</p>

<h3>Calculating a rate, and what the units mean</h3>
<p>In an experiment the measured quantity is usually a time, not a rate: the time taken for a starch-iodine sample to stop turning blue, or for a bubble to travel a set distance. The rate is the reciprocal: rate = 1 ÷ time. If the starch clears in 40 s, the rate is 0.025 s⁻¹; if it clears in 20 s, the rate is 0.050 s⁻¹. Because the relationship is reciprocal, halving the time doubles the rate — which is why a graph of rate against time is a curve while a graph of 1/time against the variable is usually a straight line.</p>
<p>If the measurement is a volume of gas, rate is volume ÷ time and the units are cm³ s⁻¹. If it is a mass loss, rate is mass ÷ time. If you are reading a graph of product formed against time, the rate at any moment is the gradient of the tangent at that point, and the initial rate is the gradient of the steepest, earliest part. State the units every time: a rate without units loses the mark even when the arithmetic is right.</p>

<h3>Why the temperature curve rises and then collapses</h3>
<p>From low temperature upward, rate roughly doubles for every 10 °C rise, because molecules move faster and collide more often with enough energy. This continues to the optimum, the temperature at which the enzyme's rate is highest — around 37 °C for human enzymes. Beyond the optimum the rate falls very steeply, because the weak hydrogen and ionic bonds holding the tertiary structure break, the active site loses its shape, and the enzyme is denatured. The fall is much steeper than the rise, and it is irreversible: cooling the tube afterwards does not restore activity. A question that asks why the rate falls at 60 °C wants "the enzyme is denatured, so the active site is no longer complementary to the substrate", not "the enzyme is killed" — enzymes are not alive, and the word costs a mark with some examiners.</p>

<h3>Why the substrate curve flattens</h3>
<p>At low substrate concentration the rate rises almost in proportion to concentration, because collisions between enzyme and substrate are the limiting factor. As concentration rises, the rate increases more slowly, and eventually plateaus (Figure 2). At the plateau every active site is occupied at all times, so adding more substrate cannot increase the number of reactions per second; the enzyme concentration is now the limiting factor. Double the enzyme and the plateau doubles in height. That is the whole logic of limiting factors, and it transfers directly to the light-intensity curve in photosynthesis and to the carbon dioxide curve in the same topic.</p>
<p>There is a third variable that behaves differently: enzyme concentration. At a fixed, plentiful substrate concentration, rate is directly proportional to enzyme concentration over a wide range, because doubling the number of active sites doubles the number of reactions. If a graph of rate against enzyme concentration curves upward rather than being straight, suspect that substrate has become limiting at the higher enzyme concentrations.</p>

<h3>Inhibitors, and how to tell them apart from a graph</h3>
<p>A competitive inhibitor resembles the substrate and binds to the active site, so it blocks the substrate physically. Adding more substrate outcompetes it, so the rate can still reach the normal maximum — the curve is shifted right but not lowered. A non-competitive inhibitor binds elsewhere on the enzyme and changes the shape of the active site, so extra substrate cannot help; the maximum rate is reduced. Heavy metal ions such as mercury and lead act this way, which is one reason they are toxic. Cyanide inhibits a respiratory enzyme and stops aerobic respiration, which is why it kills so quickly.</p>
<p>In medicine the same distinction is used deliberately. Penicillin inhibits the bacterial enzyme that cross-links the cell wall, so the bacterium bursts. Statins inhibit an enzyme in cholesterol synthesis. And the reason a drug company cares whether an inhibitor is competitive is that it determines the dose: a competitive inhibitor can be overcome by raising the substrate, a non-competitive one cannot.</p>

<h3>Immobilised enzymes: the industrial version</h3>
<p>An immobilised enzyme is trapped in or attached to an inert support — alginate beads, a gel, or the wall of a vessel — so that it stays put while the substrate flows past. The advantages are practical and examinable: the enzyme can be reused many times, which is a large cost saving; the product does not contain the enzyme, so purification is simpler; the enzyme is more stable because the support holds its shape; and the process can run continuously rather than as a batch.</p>
<p>The disadvantages are equally real: the support and the immobilisation cost money; diffusion of substrate into the beads and product out is slower, so the rate can be lower than with a free enzyme; and the enzyme may be damaged during attachment or come loose over time. Standard examples are lactase immobilised to hydrolyse lactose in milk, producing lactose-free milk for people who are intolerant; amylase and glucoamylase used to convert starch into glucose syrup; and invertase converting sucrose into the glucose-fructose syrup used in soft drinks. The lactase example is the one to know in detail, because it connects the biology to a product a student can buy.</p>

<h3>A fair test of enzyme rate, in the order a mark scheme wants</h3>
<ol>
<li>Measure a fixed volume of substrate solution into a tube and add a buffer to hold the pH, because pH affects the charge on the active site and would otherwise be a second variable.</li>
<li>Bring the substrate and the enzyme separately to the required temperature in a water bath, then mix. If you mix first and then heat, the reaction has already started at the wrong temperature.</li>
<li>Start the clock at the moment of mixing and stop it at a defined, observable endpoint: the starch stops turning blue with iodine, or a set volume of gas is collected.</li>
<li>Repeat at each temperature, and repeat each measurement at least three times so you can calculate a mean and identify an anomaly.</li>
<li>Keep everything else constant: the same volume and concentration of substrate, the same volume and concentration of enzyme, the same pH and the same endpoint.</li>
</ol>
<p>Common sources of error are worth naming rather than hand-waving: the enzyme and substrate take time to reach the bath temperature; the endpoint is judged by eye and is therefore subjective; a gas syringe leaks; and the enzyme concentration drifts because a stock solution was made up days earlier. A good answer names one of these and gives the fix, which is what distinguishes evaluation from description.</p>`;

const movement = `<h2>Movement Into and Out of Cells: the membrane, the gradient and the evidence</h2>
<p>This topic is three processes, one membrane and a set of experiments. The processes are easy; the marks come from being precise about the membrane, about water potential, and about what a set of results actually shows. This section deals with those three.</p>

<h3>What the membrane is made of, and why that matters</h3>
<p>The membrane is a phospholipid bilayer: two sheets of phospholipid with their hydrophilic heads facing the watery environment on each side and their hydrophobic tails meeting in the middle. Embedded in it are proteins — some forming channels through which small ions and water pass, others acting as carriers that change shape to move a specific substance — and between the phospholipids sits cholesterol, which regulates fluidity. On the outer surface, glycoproteins and glycolipids act as receptors and recognition markers. The whole arrangement is fluid: the molecules move sideways within their sheet, which is why the model is called the fluid mosaic model.</p>
<p>Structure explains permeability. Small, non-polar molecules such as oxygen and carbon dioxide dissolve in the lipid bilayer and cross easily, which is why gas exchange needs no transport protein. Water crosses through the bilayer slowly and through protein channels faster. Ions and polar molecules such as glucose and amino acids are repelled by the hydrophobic core and require a channel or a carrier protein. A substance's route across the membrane is therefore predictable from its size and its charge — and that prediction is a common exam question.</p>

<h3>Diffusion: the five things that change its rate</h3>
<p>Diffusion is the net movement of particles from a region of higher concentration to a region of lower concentration, down a concentration gradient, as a result of their random motion. The rate depends on five factors, and an answer that names three of them with their direction of effect is complete:</p>
<ul>
<li><strong>Steepness of the gradient</strong> — a bigger difference drives a faster net movement.</li>
<li><strong>Distance</strong> — a thicker barrier slows diffusion; the rate is inversely proportional to distance, which is why alveolar walls and capillary walls are one cell thick.</li>
<li><strong>Surface area</strong> — more area, more diffusion; the reason for villi, alveoli and root hairs.</li>
<li><strong>Temperature</strong> — higher temperature means more kinetic energy and faster movement.</li>
<li><strong>Size and lipid solubility of the molecule</strong> — small and lipid-soluble molecules cross fastest.</li>
</ul>
<p>Diffusion is passive: it needs no ATP and continues until equilibrium, at which point net movement stops but individual molecules keep crossing in both directions. That distinction — net movement versus individual movement — is worth having ready, because "diffusion stops at equilibrium" is a common and avoidable error.</p>

<h3>Water potential, which is what osmosis is really about</h3>
<p>Osmosis is the net movement of water molecules from a region of higher water potential to a region of lower water potential, through a partially permeable membrane. Water potential is measured in pressure units and pure water at atmospheric pressure is defined as zero; adding solutes lowers it, so every solution has a negative water potential. Water therefore moves towards the more concentrated solution, which is the opposite of the way students often phrase it ("water moves to the weaker solution").</p>
<p>Two consequences follow for cells. An animal cell in pure water gains water until the membrane bursts, because it has no wall to resist the pressure; this is why red blood cells lyse in distilled water. An animal cell in a concentrated solution loses water and shrinks, becoming crenated. A plant cell behaves differently because of its wall: in pure water it gains water, the vacuole swells, the membrane presses against the wall and the cell becomes turgid, which is the normal healthy state and provides support. In a concentrated solution it loses water, the vacuole shrinks, the membrane pulls away from the wall and the cell is plasmolysed — and at the point where it just begins to pull away, the cell is at incipient plasmolysis. That point is how the water potential of a tissue is measured experimentally.</p>

<h3>Active transport: the one process that costs energy</h3>
<p>Active transport moves substances against their concentration gradient, from lower to higher concentration, using carrier proteins and energy from ATP produced by respiration. It is the reason a root hair cell can accumulate mineral ions from a soil solution in which they are scarce, the reason the gut can absorb the last traces of glucose from digested food, and the reason the kidney can reabsorb glucose and ions that diffusion would have lost. The evidence that it is active is straightforward: cyanide or a lack of oxygen stops it within minutes, while diffusion continues; a rise in temperature increases it up to the point where the carrier proteins denature.</p>
<p>The distinction from facilitated diffusion is worth keeping: facilitated diffusion uses the same carrier proteins but runs down the gradient and needs no ATP. A question that gives you a graph of uptake against external concentration and asks whether the process is active is really asking whether uptake continues to rise beyond the point where the external concentration equals the internal one — if it does, energy is being spent.</p>

<h3>Reading the potato experiment properly</h3>
<p>Potato cylinders are weighed, placed in sugar solutions of different concentrations for a fixed time, blotted dry and reweighed. Plotting percentage change in mass against concentration produces a straight line with a negative gradient that crosses zero at the concentration where the tissue is isotonic with the solution (Figure 1). Read that intercept: it is the water potential of the potato tissue, expressed as the concentration of an equivalent solution.</p>
<p>The arithmetic is a percentage change, not a simple difference: change = (final − initial) ÷ initial × 100. A cylinder that goes from 3.0 g to 3.3 g has gained 0.3 g, which is +10 %; one going from 3.0 g to 2.4 g has lost 20 %. Calculating a percentage rather than a mass makes cylinders of different starting sizes comparable, which is why the mark scheme insists on it.</p>
<p>The controls are what make the result trustworthy. Use cylinders of the same potato, cut to the same size, because different tissue and different surface areas differ in water potential and in the rate of uptake. Blot each cylinder dry before weighing, because surface water is not part of the mass. Use the same immersion time, because osmosis continues. And use a cork borer rather than a knife, so the surface area is consistent. A question that asks why the cylinders are blotted is testing whether you know what the balance is measuring, not whether you can list steps.</p>

<h3>Visking tubing, beetroot and the evidence for the model</h3>
<p>Visking tubing is a partially permeable membrane with pores large enough for water and small ions to pass but too small for starch and protein. Filled with starch and glucose solution, tied, and placed in water, it produces a clear demonstration: iodine in the surrounding water turns blue only if starch has escaped, and Benedict's on the surrounding water turns red only if glucose has. Glucose appears; starch does not. The tubing is a model of a membrane, and its limitation is worth stating — it is a sieve, whereas a real membrane is a lipid bilayer with proteins, so it cannot show active transport or specificity.</p>
<p>Beetroot is a membrane-integrity test. Beetroot cells contain a red pigment in their vacuoles; intact membranes keep it inside. Cut cylinders, rinse them until the water is clear, then place them in water at different temperatures. Pigment leaks out only when the membrane is damaged — at high temperature, the proteins denature and the bilayer is disrupted, so the pigment escapes and the water turns red. Plotting absorbance of the water against temperature gives a curve that stays near zero and then rises sharply, which is the same shape as an enzyme's denaturation curve, and for the same reason.</p>`;

module.exports = {
  sections: [
    {
      id: "904e6645-0102-427d-a120-c720073c316c",
      slug: "biological-molecules",
      heading: "Biological Molecules: the chemistry that explains the tests",
      html: molecules + "\n" + condensation + "\n",
    },
    {
      id: "eecb3395-811d-42a6-97cd-cc1b5bae0b6f",
      slug: "enzyme",
      heading: "Enzymes: kinetics where the marks actually live",
      html: enzyme + "\n" + enzymeKinetics + "\n",
    },
    {
      id: "fe3ddcf1-8510-4e7d-b4df-b8cb3988292e",
      slug: "movement-into-and-out-of-cells",
      heading: "Movement Into and Out of Cells: the membrane, the gradient and the evidence",
      html: movement + "\n" + potato + "\n",
    },
  ],
};
