/**
 * Batch 1 — Cambridge IGCSE Biology 0610 depth rewrite.
 * Rows keyed by live study_materials id; titles in house format.
 * Written from the 2026-2028 syllabus statements: 2.1-2.2, 3.1-3.3, 4.1, 5.1.
 */
const rows = {
  /* Organisation of the Organism — 2.1 Cell structure, 2.2 Size of specimens */
  "821d977f-fba2-4db9-a316-ac617721233b": `
<h2>IGCSE Biology: Organisation of the Organism</h2>
<p>Every living thing you will ever meet — from a single bacterium to a blue whale — is built from cells, and this note starts where all biology starts: at the microscope. We begin with the idea that the cell is the smallest unit that can still be called alive, then map the structures inside animal and plant cells, explain what each one actually does, and finish with the specimen-size calculations that Paper 6 loves. Nothing here assumes prior knowledge; each structure is introduced with a physical analogy before the formal term, and every calculation is expanded line by line so you can follow it with no chemistry or maths background at all.</p>

<h3>What a cell is, and why it is the unit of life</h3>
<p>A cell is the smallest structure that carries out all seven life processes: movement, respiration, sensitivity, growth, reproduction, excretion and nutrition (the mnemonic MRS GREN). A brick is not alive; a single white blood cell is, because it does all seven. Two organisational levels follow. Unicellular organisms (bacteria, Amoeba, yeast) are one cell doing everything. Multicellular organisms (you, an oak tree) are communities of cells that specialise, so the body shows three levels of organisation: cells group into tissues (one job, like muscle tissue), tissues into organs (the stomach), and organs into organ systems (the digestive system).</p>
<p>Cell specialisation means a cell's structure fits its function like a tool fits a job. A red blood cell is a flat biconcave disc with no nucleus, leaving maximum room for haemoglobin. A sperm cell carries a long tail (flagellum) and a packed mitochondria cluster for swimming. A root hair cell pushes out one long extension to maximise surface area for absorption. A palisade cell packs its top half with chloroplasts to catch light. When asked to explain a specialised cell, always write it as: feature, then what the feature does, then why the job needs it.</p>

<h3>Animal cell structure</h3>
<p>Think of a cell as a factory. The cell membrane is the security door: a thin, selectively permeable layer of lipid and protein that decides what enters and leaves. The cytoplasm is the factory floor: a jelly-like solution of water, salts and enzymes where most reactions happen. The nucleus is the manager's office: it contains genetic material (DNA) and controls the cell's activities by regulating which proteins are made. Mitochondria are the power stations: rod-shaped organelles where aerobic respiration releases energy from glucose. Ribosomes are the assembly lines: tiny structures where proteins are assembled from amino acids. The cytoplasm and cell membrane together carry out most of the life processes; the nucleus stores and passes on genetic information.</p>

<h3>Plant cell structure — the three additions</h3>
<p>A plant cell has everything an animal cell has, plus three structures an exam will always want named. The cell wall is a rigid layer of cellulose outside the membrane: it gives mechanical strength and stops the cell bursting when water enters. Chloroplasts are the solar panels: they contain the green pigment chlorophyll and are the site of photosynthesis. The permanent vacuole is a storage tank: a large sac of cell sap (dilute sugars, salts and acids) that keeps the cell turgid, pressing the cytoplasm against the wall so leaves stay firm. Learn the comparison as a table — it is the single most reliable three-mark question in Paper 4.</p>
<table>
<tr><th>Structure</th><th>Animal cell</th><th>Plant cell</th><th>Job</th></tr>
<tr><td>Cell membrane</td><td>Present</td><td>Present</td><td>Controls what enters and leaves</td></tr>
<tr><td>Cell wall</td><td>Absent</td><td>Present (cellulose)</td><td>Strength and support; prevents bursting</td></tr>
<tr><td>Chloroplasts</td><td>Absent</td><td>Present (palisade, spongy mesophyll)</td><td>Photosynthesis in chlorophyll</td></tr>
<tr><td>Permanent vacuole</td><td>Small, temporary</td><td>Large, permanent, cell sap</td><td>Turgor, storage</td></tr>
<tr><td>Nucleus</td><td>Present</td><td>Present</td><td>Controls activities; stores DNA</td></tr>
<tr><td>Mitochondria</td><td>Present</td><td>Present</td><td>Aerobic respiration, releases energy</td></tr>
<tr><td>Ribosomes</td><td>Present</td><td>Present</td><td>Protein synthesis</td></tr>
</table>

<h3>Bacterial cells: the prokaryote difference</h3>
<p>Bacteria are prokaryotes — cells with no nucleus and no membrane-bound organelles. Their DNA is a single circular chromosome free in the cytoplasm, often with small extra rings called plasmids. They have a cell wall (not cellulose — it is murein), a cell membrane, cytoplasm and ribosomes (smaller than eukaryotic ones), and many have a flagellum for swimming and a capsule for protection. The exam answer to "give two differences between a bacterium and a plant cell" is: no nucleus in the bacterium (DNA free in cytoplasm) and no chloroplasts or mitochondria (respiration at the membrane).</p>

<h3>Microscopy and magnification</h3>
<p>An optical (light) microscope uses glass lenses and visible light; specimens can be living or dead and are often stained (methyl blue for nuclei, iodine for starch) to add contrast. An electron microscope uses a beam of electrons, giving far higher magnification and resolution so organelles such as mitochondria, ribosomes, lysosomes and the endoplasmic reticulum can be seen — but specimens must be dead and in a vacuum. Magnification is how many times larger the image is than the real object; resolution is the minimum distance between two points still seen as separate — a blurry zoomed image has magnification without resolution. The three calculations you must know are written below, and the worked example expands each one.</p>

<h3>Size of specimens — the three equations</h3>
<p>Equation 1, magnification: magnification = size of image divided by size of real object. Equation 2, real size: real size = image size divided by magnification. Equation 3, image size: image size = real size × magnification. The golden rule of units: convert everything to the same unit before dividing. 1 millimetre (mm) = 1000 micrometres (µm); 1 µm = 1000 nanometres (nm). A common exam device is a scale bar drawn under an image: measure the bar in millimetres with a ruler, note the length it claims to represent in µm, and the magnification is bar length (in µm) ÷ claimed length (in µm). Drawing magnification for Paper 6 is measured the same way: magnification = drawing width (mm) ÷ real width (mm), with the real width first converted from µm by dividing by 1000.</p>

<h3>Worked example: specimen size from first principles</h3>
<p>An image of a plant cell is 40 mm long in a textbook, and the real cell is 80 µm long. Calculate the magnification. Step 1: write the equation: magnification = image size ÷ real size. Step 2: list what you have: image = 40 mm, real = 80 µm. Step 3: convert to one unit — 40 mm = 40 × 1000 = 40 000 µm. Step 4: divide: 40 000 ÷ 80 = 500. Step 5: write the answer with its × symbol: magnification = ×500. Now the reverse direction. A cell is 12 µm wide and you draw it at ×1500. Step 1: image size = real size × magnification. Step 2: 12 µm × 1500 = 18 000 µm. Step 3: convert to a workable unit: 18 000 ÷ 1000 = 18 mm. Your drawing must be 18 mm wide — measure it with a ruler in the practical. Finally, a bacterium appears 35 mm long in a micrograph at ×20 000. Step 1: real size = 35 mm ÷ 20 000 = 0.00175 mm. Step 2: convert: 0.00175 mm × 1000 = 1.75 µm. Step 3: state the answer: 1.75 µm, which is a sensible bacterium size.</p>

<h3>Exam technique: command words and drawing rules</h3>
<p>"State" wants one short fact; "describe" wants what you see in a diagram or graph (no reasons); "explain" wants the mechanism with because. For drawings: use clean, unbroken pencil lines with no shading; the drawing should be at least 6 cm wide for a decent magnification; label lines are straight, horizontal, do not cross, and touch the structure named; labels name the structure (write "mitochondrion", not "the power station"). When asked for differences between two diagrams (typical Paper 6), compare like with like: "the plant cell has a cell wall, the animal cell does not" is two marks in one line.</p>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Calling the cell wall "membrane": the membrane is inside the wall; mixing them loses the mark.</li>
<li>Writing "chloroplast" on an animal cell diagram — animals have mitochondria, never chloroplasts.</li>
<li>Forgetting units after converting: 40 mm ÷ 80 µm is wrong until both are µm; always show the conversion line.</li>
<li>Saying magnification and resolution are the same thing; they are different, and Paper 4 has asked for the distinction outright.</li>
<li>Shading a drawing or using a ruler-free squiggle: both are explicitly penalised in Paper 6 mark schemes.</li>
<li>Label lines crossing each other or drawn as arrows; a line that does not touch the structure scores zero.</li>
<li>Writing "cytoplasm" when you mean "cytosol" or vice versa is safe at IGCSE — use "cytoplasm" — but never write "cell sap" for cytoplasm; cell sap is only inside the vacuole.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p>Q1. State two structures found in a plant cell but not in an animal cell. (2 marks) Answer: cell wall (cellulose) and chloroplasts — one mark each; the permanent vacuole is also accepted but do not list more than the question asks.</p>
<p>Q2. A cell is drawn 60 mm wide. The real cell is 150 µm wide. Calculate the magnification and show your working. (3 marks) Answer: 60 mm = 60 000 µm (1); magnification = 60 000 ÷ 150 (1); = ×400 (1).</p>
<p>Q3. Explain why root hair cells are specialised for absorption. (2 marks) Answer: they have a long extension that increases surface area (1), so more water and mineral ions can be absorbed per unit time by diffusion and active transport (1).</p>
<p>Q4. Describe how you would prepare a slide of onion cells for viewing. (4 marks) Answer: peel a thin transparent layer of epidermis (1); place it flat in a drop of water on a slide (1); add a coverslip at an angle without trapping air bubbles (1); view at low power then focus with the fine adjustment (1).</p>
<p>Q5. Explain why the electron microscope was needed to discover ribosomes. (2 marks) Answer: ribosomes are very small (around 20 nm) so need much higher resolution than the light microscope provides (1); the electron microscope's shorter wavelength of electrons gives that resolution (1).</p>
`,

  /* Movement into and out of Cells — 3.1 Diffusion, 3.2 Osmosis, 3.3 Active transport */
  "fe3ddcf1-8510-4e7d-b4df-b8cb3988292e": `
<h2>IGCSE Biology: Movement Into and Out of Cells</h2>
<p>Nothing in a cell can work unless molecules can get in and waste can get out. Three mechanisms do all of that transport, and they differ in one thing: how much energy the cell must spend. Diffusion is free movement down a concentration gradient; osmosis is the special case of water crossing a partially permeable membrane; active transport is the paid, uphill service that pushes molecules against their gradient using energy from respiration. This note builds each one from a physical analogy first, then gives the formal definition you must memorise, the factors examiners ask about, and the calculations (water potential and percentage change) fully expanded line by line.</p>

<h3>Diffusion: the crowd analogy</h3>
<p>Imagine a packed crowd pouring through a wide gate into an empty field: particles spread out until they are evenly shared, with no instruction and no energy spent. That is diffusion — the net movement of particles from a region of higher concentration to a region of lower concentration, down a concentration gradient, as a result of their random movement. It is passive: no energy from respiration is used. It is also vital: oxygen diffusing from alveoli into blood, carbon dioxide diffusing out of cells into the plasma, and urea diffusing out of cells into the blood for excretion.</p>
<p>Three factors control the rate. A steeper concentration gradient speeds it (more difference, faster net flow). A higher temperature speeds it (particles carry more kinetic energy and move faster). A larger surface area speeds it (more room for particles to cross). For single cells, a large surface-area-to-volume ratio keeps diffusion effective; as a cube grows, volume rises faster than area (area scales as length², volume as length³), which is why large organisms need specialised exchange surfaces (alveoli, villi, root hairs) and transport systems (blood, xylem). Membrane thickness matters too: a thinner diffusion path means faster exchange — flattened red blood cells and thin alveolar walls are both built for exactly that.</p>

<h3>Osmosis: water crossing a membrane</h3>
<p>Picture a nightclub with a rope that lets small people through but blocks large ones: over time the small people spread evenly on both sides. A partially permeable membrane does this to water. Osmosis is the net movement of water molecules from a region of higher water potential to a region of lower water potential, through a partially permeable membrane. Water potential (symbol ψ, measured in kilopascals, kPa) measures the tendency of water to leave a solution: pure water is 0 kPa, and dissolving anything lowers the water potential, making it more negative. A dilute solution has a higher water potential than a concentrated one — remember: more solute means less free water, so lower water potential.</p>
<p>Osmosis in animal cells: an animal cell in pure water takes water in, swells and may burst (lysis) because it has no wall. In a concentrated solution it loses water and shrivels (crenation). In an isotonic solution (same water potential) it keeps its normal shape. Osmosis in plant cells: in pure water a plant cell becomes turgid — the vacuole fills, the cytoplasm presses against the cellulose wall, and the wall stops it bursting. In a concentrated solution it loses water and the membrane pulls away from the wall: this is plasmolysis, and the cell is plasmolysed. At intermediate water potentials the cell is flaccid. Percentage change in mass is the standard Paper 4 calculation: percentage change = (final mass − initial mass) ÷ initial mass × 100.</p>

<h3>Worked example: the osmosis calculation from scratch</h3>
<p>A potato cylinder starts at 2.40 g and, after 30 minutes in a 0.4 mol/dm³ sucrose solution, weighs 2.10 g. Calculate the percentage change in mass. Step 1: write the equation: percentage change = (final − initial) ÷ initial × 100. Step 2: substitute: (2.10 − 2.40) ÷ 2.40 × 100. Step 3: the top line first: 2.10 − 2.40 = −0.30 g — the minus sign matters, it shows water left the tissue. Step 4: divide: −0.30 ÷ 2.40 = −0.125. Step 5: multiply by 100: −0.125 × 100 = −12.5 %. The mass decreased by 12.5 %. Interpretation, which the examiner often wants next: the solution had a lower water potential than the cell sap, so water left the cells by osmosis. Plotting percentage change against concentration gives a curve through zero at the concentration where there is no net movement — the point where the external solution matches the tissue's water potential. Always plot percentage change (not raw mass change) so that differently sized samples compare fairly.</p>

<h3>Active transport: the paid pump</h3>
<p>Imagine pushing a boulder uphill: it will never roll there on its own, so you must spend energy. Active transport is the movement of particles through a cell membrane from a lower concentration to a higher concentration (against the gradient) using energy released by respiration. Carrier proteins in the membrane bind the specific molecule, change shape, and release it on the other side; each cycle burns ATP made in the mitochondria. It is essential where the gradient runs the wrong way: mineral ions into root hair cells from dilute soil, glucose from the gut into epithelial cells after absorption has lowered the lumen concentration, and glucose into muscle cells during exercise.</p>

<h3>Diffusion, osmosis and active transport compared</h3>
<table>
<tr><th>Feature</th><th>Diffusion</th><th>Osmosis</th><th>Active transport</th></tr>
<tr><td>What moves</td><td>Any solute particles</td><td>Water only</td><td>Specific molecules or ions</td></tr>
<tr><td>Direction</td><td>Down the gradient (high to low)</td><td>Higher to lower water potential</td><td>Against the gradient (low to high)</td></tr>
<tr><td>Energy</td><td>None (passive)</td><td>None (passive)</td><td>Energy from respiration (ATP)</td></tr>
<tr><td>Membrane role</td><td>Passage through or between lipids</td><td>Partially permeable membrane required</td><td>Carrier proteins required</td></tr>
<tr><td>Example in the body</td><td>Oxygen from alveolus into blood</td><td>Water in the kidney tubule</td><td>Glucose from the gut into the blood</td></tr>
</table>

<h3>The surface-area-to-volume problem</h3>
<p>Work through the cube model numerically and the biology becomes obvious. A 1 cm cube has a surface area of 6 cm² and a volume of 1 cm³ — a ratio of 6:1. An 8 cm cube has a surface area of 6 × 8² = 384 cm² and a volume of 8³ = 512 cm³ — a ratio of 0.75:1. The big cube has relatively less surface per unit volume, so diffusion alone would starve its centre. Cells stay small to keep the ratio high; large organisms flatten exchange surfaces (alveoli, villi), fold them, or thin them to a single layer of cells, and then add a mass-transport system (the heart) to carry molecules the rest of the distance.</p>

<h3>Adaptations for exchange — applied to whole organisms</h3>
<ul>
<li>Root hair cells: a long extension greatly increases surface area and the thin wall gives a short diffusion path for water and ions.</li>
<li>Alveoli in the lung: thousands of spherical sacs give a huge combined surface area; each wall is one cell thick; rich blood supply and constant ventilation maintain steep gradients.</li>
<li>Villi in the small intestine: finger-like projections with one-cell-thick walls and a dense capillary network, absorbing digested food rapidly.</li>
<li>Capillary walls: a single endothelial cell thick, so gases exchange fast between plasma and tissue fluid.</li>
<li>Flat shape of red blood cells: short diffusion path for oxygen to reach haemoglobin.</li>
</ul>

<h3>Worked example: comparing rates and designing a fair test</h3>
<p>An investigation puts potato discs in five sucrose concentrations (0.0, 0.2, 0.4, 0.6, 0.8 mol/dm³) for 30 minutes. Identify the variables. Independent variable (the one you change): sucrose concentration. Dependent variable (the one you measure): percentage change in mass. Control variables (the ones you keep the same): temperature (affects rate of osmosis), time in solution, volume of solution, same potato variety and same disc dimensions (surface area to volume ratio), same blotting technique before weighing (surface liquid adds mass). Repeat for each concentration and calculate a mean to spot anomalous results. The gradient of the plotted curve is steepest where the concentration is closest to the tissue's own water potential — outside that range almost all water potential difference is already exploited.</p>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Defining osmosis without the words "partially permeable membrane" — that phrase is a mark on its own.</li>
<li>Writing "water moves from weak to strong solution" — acceptable in some mark schemes, but "high water potential to low water potential" is the guaranteed-accurate wording.</li>
<li>Forgetting the minus sign in percentage change: negative means a loss of mass and the interpretation follows from it.</li>
<li>Saying active transport "uses energy" without saying where it comes from: respiration (mitochondria) — a favourite one-mark probe.</li>
<li>Confusing turgid (plant cell, full of water, firm) with plasmolysed (plant cell, lost water, membrane pulled from wall).</li>
<li>Describing water as "moving through the membrane holes" — membranes are not sieves; they are lipid bilayers with protein channels.</li>
<li>In Paper 6, failing to state repeats and a mean, or listing the independent and dependent variables the wrong way round.</li>
<li>Answering "describe" with reasons or "explain" with only a description: describe = what happens, explain = why it happens.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p>Q1. Define osmosis. (2 marks) Answer: net movement of water molecules from a region of higher water potential to a region of lower water potential (1) through a partially permeable membrane (1).</p>
<p>Q2. Explain why a cell placed in pure water may burst if it is an animal cell but not if it is a plant cell. (3 marks) Answer: water enters both cells by osmosis down the water potential gradient (1); the animal cell has no cell wall so swells and lyses (1); the plant cell's cellulose wall resists the pressure so the cell becomes turgid instead (1).</p>
<p>Q3. A potato core loses 0.24 g from a starting mass of 3.00 g. Calculate the percentage change. (2 marks) Answer: (−0.24 ÷ 3.00) × 100 (1); = −8 % (1).</p>
<p>Q4. Explain why active transport is needed to absorb mineral ions from the soil into a root hair cell when diffusion cannot do the job. (3 marks) Answer: ions are at higher concentration inside the root hair than in the soil (1), so the gradient runs against entry (1); active transport uses energy from respiration to move them in by carrier proteins (1).</p>
<p>Q5. Describe two ways the small intestine is adapted for absorption. (2 marks) Answer: villi/ microvilli increase surface area (1); walls one cell thick and rich capillary supply maintain steep gradients and short diffusion paths (1).</p>
`,

  /* Biological Molecules — 4.1 */
  "904e6645-0102-427d-a120-c720073c316c": `
<h2>IGCSE Biology: Biological Molecules</h2>
<p>Your body is a chemical machine, and the machine runs on four families of large molecules: carbohydrates for fuel and structure, lipids for membranes and long-term energy stores, proteins for everything from muscles to enzymes to antibodies, and nucleic acids (DNA) for information. This note takes each family from its smallest building block to its full structure and function, defines every bond by name, explains the food tests you will perform in Paper 6, and expands the DNA double helix base-by-base. By the end you should be able to look at any food test result or structural diagram and derive the reasoning rather than memorise it.</p>

<h3>Elements, small molecules and large molecules</h3>
<p>Life is built mainly from carbon, hydrogen, oxygen and nitrogen (plus smaller amounts of sulfur and phosphorus). Small molecules (glucose, amino acids, fatty acids, nucleotides) join end-to-end to form large molecules (starch, protein, lipid, DNA) in condensation reactions — one molecule of water is removed each time a bond forms. The reverse, splitting a molecule by adding water, is hydrolysis; every digestive enzyme in the body is named after the bond it hydrolyses. Learn the pairing now and it pays off twice: in this topic and again in human nutrition.</p>

<h3>Carbohydrates: sugars, starch, glycogen, cellulose</h3>
<p>Monosaccharides are single sugars: glucose (C₆H₁₂O₆) is the body's immediate fuel. Disaccharides are two sugars joined: maltose (glucose + glucose), sucrose (glucose + fructose) and lactose (glucose + galactose), each joined by a glycosidic bond formed in condensation. Polysaccharides are long chains: starch (the plant store, a mixture of amylose and amylopectin), glycogen (the animal store, highly branched, in liver and muscle) and cellulose (the plant structural fibre, straight chains that cross-link for strength). Starch is tested with iodine solution: yellow-brown turns blue-black. Function summary: sugars for transport and instant energy; starch and glycogen for storage; cellulose for cell walls.</p>

<h3>Lipids: fats, oils and membranes</h3>
<p>A lipid is built from one glycerol joined to three fatty acids by ester bonds (three condensation reactions, three water molecules removed). Saturated lipids have no carbon-carbon double bonds in the tails (straight, pack tightly, solid at room temperature — animal fats); unsaturated lipids have one or more double bonds (kinks in the tails, loose packing, liquid — plant oils). Lipids store twice the energy per gram of carbohydrates, form waterproof layers, insulate (blubber, subcutaneous fat), protect organs, and make up the phospholipid bilayer of every cell membrane. The test for lipids is the ethanol emulsion test: dissolve the sample in ethanol, then add water — a milky-white emulsion means lipid present.</p>

<h3>Proteins: amino acids to polypeptides</h3>
<p>A protein is one or more polypeptide chains folded into a specific 3-D shape. Each amino acid has the same backbone — a central carbon with an amino group (–NH₂), a carboxyl group (–COOH), a hydrogen and a variable R group. In a condensation reaction the –NH₂ of one amino acid reacts with the –COOH of the next, releasing water and forming a peptide bond; repeat it and you have a polypeptide. The sequence of R groups (the primary structure) dictates how the chain folds (secondary and tertiary structure), and that fold dictates function: haemoglobin's shape cradles iron to carry oxygen; enzymes' active sites fit one substrate; antibodies' variable regions fit one antigen; keratin's coil makes hair and nails. The biuret test detects peptide bonds: add biuret solution (sodium hydroxide then copper(II) sulfate) — blue turns to purple if protein is present.</p>

<h3>Enzymes as biological molecules (see the Enzymes note for the full kinetics)</h3>
<p>Enzymes are globular proteins that act as biological catalysts: they speed reactions without being used up by lowering activation energy. Their active site is a specific-shaped pocket formed by the tertiary structure; only a substrate with a complementary shape fits (the induced-fit model shows the site flexing slightly as the substrate binds). Digestive enzymes hydrolyse their named bonds: carbohydrases (amylase) break glycosidic bonds in starch; proteases (pepsin, trypsin) break peptide bonds in proteins; lipases break ester bonds in lipids. Naming rule: the suffix –ase is an enzyme, the suffix –ose is a sugar, and the stem names the substrate.</p>

<h3>Water and mineral ions — the small molecules that matter</h3>
<p>Water is the biological solvent for a reason: its molecules are polar (slightly negative oxygen, slightly positive hydrogens), so they surround and dissolve ions and polar molecules, forming the cytoplasm, blood plasma and tissue fluid. Water's high specific heat capacity buffers temperature swings; its high latent heat of vaporisation makes sweating and transpiration effective coolers; its cohesion (hydrogen bonding between molecules) helps the water column in xylem; and it is a reactant in photosynthesis and hydrolysis. Mineral ions have named roles worth memorising: iron for haemoglobin, calcium for bones and clotting and muscle contraction, sodium for nerve impulses, phosphate for DNA and ATP, nitrate for amino acids and chlorophyll in plants, magnesium for chlorophyll, potassium for stomatal opening.</p>

<h3>The four food tests at a glance</h3>
<table>
<tr><th>Molecule</th><th>Test reagent</th><th>Positive result</th><th>Technique note</th></tr>
<tr><td>Starch</td><td>Iodine solution</td><td>Yellow-brown to blue-black</td><td>Add the solution to the food on a white tile</td></tr>
<tr><td>Reducing sugar</td><td>Benedict's solution</td><td>Blue to brick-red precipitate</td><td>Must be heated in a water bath; green or orange for lower amounts</td></tr>
<tr><td>Protein</td><td>Biuret (sodium hydroxide then copper(II) sulfate)</td><td>Blue to purple</td><td>Do not heat</td></tr>
<tr><td>Lipid</td><td>Ethanol then water</td><td>White milky emulsion</td><td>Shake the sample with ethanol first, then add water</td></tr>
</table>

<h3>Worked example: the food-test decision tree and one full calculation</h3>
<p>A student tests a mystery food for starch, reducing sugars, protein and lipid. Result log: iodine stays orange-brown; Benedict's solution turns from blue to brick-red after heating; biuret turns purple; the emulsion test gives no white cloud. Reading it step by step: iodine unchanged means no starch (the only positive is blue-black). Benedict's brick-red after heating means a reducing sugar is present (glucose gives the strongest red; moderate heat gives yellow-green). Biuret purple means peptide bonds, so protein is present. No emulsion means no lipid. Conclusion: a protein-rich food containing glucose — egg white with sugar, for instance. Now a calculation you can be asked to do with any of these: a 10 g food sample releases 2.5 kJ when burnt under a calorimeter that heated 50 g of water by 12 °C. Energy released = mass of water × specific heat capacity × temperature change = 50 g × 4.2 J/g°C × 12 °C = 2520 J = 2.52 kJ. Because 1 g of lipid yields about 38 kJ and 1 g of carbohydrate about 17 kJ, a high energy per gram means a fatty food.</p>

<h3>DNA: the information molecule</h3>
<p>DNA (deoxyribonucleic acid) is a polymer of nucleotides. Each nucleotide has three parts: a deoxyribose sugar, a phosphate group, and one of four organic bases — adenine (A), thymine (T), cytosine (C), guanine (G). The nucleotides form a long chain by phosphodiester bonds between the sugar of one and the phosphate of the next (one sugar-phosphate backbone on each strand). Two strands then twist into a double helix, held by hydrogen bonds between complementary base pairs: A–T (two hydrogen bonds) and C–G (three hydrogen bonds). The pairing rule is strict and examinable: A only ever bonds with T, C only ever with G. Genes are short sections of DNA whose base sequence codes for the amino acid sequence of a protein; chromosomes are long DNA molecules wound around proteins; a gene is to a chromosome as one sentence is to a book.</p>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Confusing "condensation" with "digestion": condensation builds polymers; digestion (hydrolysis) breaks them; every digestive enzyme performs hydrolysis.</li>
<li>Writing the Benedict's result as "turns red" without heating: the test must be heated (water bath), or it scores nothing.</li>
<li>Calling a protein's shape "its secondary structure" when the question wants "tertiary structure, which determines the active site".</li>
<li>Mixing up the base pairing: writing A–C or G–T in a DNA question is an instant lost mark.</li>
<li>Describing iodine for starch as turning "brown to black" — the required wording is "yellow-brown to blue-black".</li>
<li>Saying lipids "give more energy because they are bigger" — they store more per gram because their tails are more reduced (more C–H bonds).</li>
<li>In Paper 6, omitting the control (a known positive and negative sample) in a food-test plan; examiners award a mark for "compare with a known sample".</li>
<li>Writing "DNA is a protein": DNA is a nucleic acid; it is made of nucleotides, not amino acids.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p>Q1. Describe how you would test a food sample for reducing sugar. (3 marks) Answer: dissolve or crush the sample in water and filter (1); add Benedict's solution and heat in a water bath (1); a brick-red (or orange/green) precipitate confirms reducing sugar (1).</p>
<p>Q2. Explain how a change in an amino acid sequence can change an enzyme's function. (3 marks) Answer: the sequence determines the tertiary fold (1); a different R group alters the shape or charge of the active site (1); so the substrate no longer fits and the rate of reaction falls (1).</p>
<p>Q3. State the two base-pairing rules in DNA and the number of hydrogen bonds in each. (2 marks) Answer: A–T with two hydrogen bonds; C–G with three hydrogen bonds (1 per pair).</p>
<p>Q4. Explain why lipids are better energy stores than carbohydrates. (2 marks) Answer: lipid tails contain more carbon-hydrogen bonds per gram so more energy is released per gram on oxidation (1); and they are insoluble so they do not affect water potential in cells (1).</p>
<p>Q5. Describe the role of water in living organisms. (3 marks) Answer: solvent for transport in blood and cytoplasm (1); high specific heat capacity buffers temperature (1); reactant in photosynthesis and hydrolysis, and cohesion aids water movement in xylem (1).</p>
`,

  /* Enzymes — 5.1 */
  "eecb3395-811d-42a6-97cd-cc1b5bae0b6f": `
<h2>IGCSE Biology: Enzymes</h2>
<p>Enzymes are the reason you can digest a meal in hours rather than centuries: they are biological catalysts, proteins that speed up chemical reactions without being consumed. This note starts with the lock-and-key picture of how they work, moves to the factors that change their rate (temperature, pH, substrate concentration, enzyme concentration), gives the graph-reading rules examiners use to separate A-grade answers from C-grade ones, and closes with the Paper 6 enzyme-investigation design you can be asked to write from scratch. Every graph is described in words as well as axes, so you can reconstruct it in the exam.</p>

<h3>What an enzyme is, physically</h3>
<p>Each enzyme is a globular protein folded so that part of its surface forms a pocket called the active site — a groove whose shape and charge match one particular molecule, the substrate. When substrate meets active site they form an enzyme-substrate complex, the reaction happens (bonds broken or made), and the products leave, freeing the unchanged enzyme to repeat. The lock-and-key analogy imagines the substrate as the key and the active site as the lock; the induced-fit model is the modern refinement — the active site flexes slightly to grip the substrate, straining its bonds so less energy is needed to break them. That lowering of activation energy is the whole catalytic trick: enzymes do not add energy, they lower the hill the reaction must climb.</p>

<h3>Specificity and the naming rule</h3>
<p>Each enzyme acts on one substrate only, because the active site is complementary to that substrate's shape — this is enzyme specificity. The naming convention is worth a free mark: the enzyme is named after its substrate with the suffix –ase. Starch is digested by carbohydrase (specifically amylase); protein by protease; lipid by lipase; and a specific sugar like lactose by lactase. Maltase digests maltose, sucrase digests sucrose. If a question names a substrate and asks for its enzyme, answer by adding –ase and you will almost always be right.</p>

<h3>Temperature and enzyme rate</h3>
<p>Temperature works in two stages. Below the optimum, heating increases the kinetic energy of both enzyme and substrate, so they collide more often and with more energy — the rate rises (roughly doubling per 10 °C near the optimum). At the optimum temperature (around 37 °C for human enzymes, 25 °C for many plant enzymes), the rate is fastest. Above the optimum, the bonds holding the tertiary structure (hydrogen and ionic bonds) break: the active site changes shape, the substrate no longer fits, and the enzyme is denatured — this is permanent. The graph of rate against temperature is therefore a steep rise, a rounded peak, then a fall to zero. Exam phrasing: "denatured" must be paired with "active site changes shape" and "substrate no longer fits" to earn all the marks.</p>

<h3>pH and enzyme rate</h3>
<p>Each enzyme has an optimum pH — around pH 2 for pepsin in the stomach, pH 7–8 for salivary amylase and trypsin in the small intestine. Changing pH alters the charges on the amino acids of the active site; far from the optimum, ionic and hydrogen bonds break and the enzyme denatures, exactly as with temperature. The rate-pH graph is a bell curve centred on the optimum. The trap: do not write that acid "kills" the enzyme or that pH "denatures the substrate" — it is the enzyme's structure that fails.</p>

<h3>Substrate and enzyme concentration</h3>
<p>With enzyme constant and substrate concentration rising: the rate rises in direct proportion at first (more substrate means more frequent collisions, every active site busy), then the curve levels off (a plateau) when all active sites are occupied — the enzyme is saturated, and adding substrate cannot help. With substrate in excess and enzyme concentration rising: the rate rises linearly and does not plateau while substrate remains available. Recognising which factor is limiting is a standard three-mark "explain the shape of the graph" question: name the limiting factor at each stage (substrate concentration below saturation; number of active sites above it).</p>

<h3>Every factor at a glance</h3>
<table>
<tr><th>Factor</th><th>Effect on rate below the optimum</th><th>Effect above the optimum</th><th>Reason</th></tr>
<tr><td>Temperature</td><td>Rate rises with heating</td><td>Rate falls to zero</td><td>More energetic collisions, then denaturation of the active site</td></tr>
<tr><td>pH</td><td>Rate rises towards the optimum</td><td>Rate falls to zero</td><td>Charges on the active site change, then bonds break</td></tr>
<tr><td>Substrate concentration</td><td>Rate rises in proportion</td><td>Rate plateaus</td><td>All active sites occupied — the enzyme is saturated</td></tr>
<tr><td>Enzyme concentration</td><td>Rate rises in proportion</td><td>Rises while substrate remains</td><td>More active sites available for the substrate</td></tr>
</table>

<h3>Inhibitors</h3>
<p>Competitive inhibitors have a shape similar to the substrate and bind to the active site, blocking it; their effect can be reduced by raising substrate concentration (more substrate outcompetes them). Non-competitive inhibitors bind elsewhere on the enzyme (an allosteric site), changing the active site's shape so the substrate cannot fit; raising substrate concentration does not overcome them. At IGCSE, know both in one line each and be able to say which one is affected by substrate concentration — that distinction is a favourite Paper 2 and Paper 4 probe.</p>

<h3>Investigating enzyme rate: the Paper 6 method</h3>
<p>A standard investigation: measure 5 cm³ of starch solution into a water bath at a set temperature; add 1 cm³ of amylase solution; start the timer; every 30 seconds take a drop of the mixture and test on a spotting tile with iodine; record the time until the iodine stays yellow-brown (all starch hydrolysed). Rate = 1 ÷ time (the standard reciprocal, in s⁻¹). Variables: independent = temperature (or pH, or enzyme concentration); dependent = time for starch to disappear (converted to rate); controls = volume and concentration of starch, volume and concentration of enzyme, pH (use buffer), identical timing technique. Repeat and take a mean. A water bath (not a Bunsen flame) is required for temperature control, and each test tube must reach the set temperature before mixing.</p>

<h3>Worked example: reading and calculating from an enzyme experiment</h3>
<p>At 25 °C, starch disappeared in 240 s; at 35 °C, in 120 s; at 45 °C, in 150 s; at 55 °C, in 600 s. Step 1: convert to rate using rate = 1 ÷ time: 1/240 = 0.00417 s⁻¹; 1/120 = 0.00833 s⁻¹; 1/150 = 0.00667 s⁻¹; 1/600 = 0.00167 s⁻¹. Step 2: read the pattern — the rate rises from 25 to 35 °C (kinetic energy up), peaks between 35 and 45 °C, then collapses at 55 °C. Step 3: explain each point as the examiner wants: from 25 to 35 °C, more energetic collisions occur; at the peak the enzyme is at its optimum; at 55 °C the enzyme has denatured, its active site has changed shape and the substrate no longer fits, so the rate is lowest. Step 4: state the trend as a sentence with a number: "the fastest rate was at 35 °C (0.00833 s⁻¹) and the slowest at 55 °C (0.00167 s⁻¹), a five-fold difference." Always quote at least one figure when asked to "use the data".</p>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Writing that enzymes "are used up" — catalysts are unchanged at the end; say "recovered unchanged".</li>
<li>Explaining high temperature as "the enzyme dies" — enzymes are not alive; say the enzyme is denatured because bonds in the tertiary structure break.</li>
<li>Forgetting to state "the active site changes shape, so the substrate can no longer fit" — the two extra clauses are the extra marks.</li>
<li>Confusing "rate of reaction" with "time taken": rate = 1 ÷ time, so a longer time means a slower rate; plotting time and calling it rate loses interpretation marks.</li>
<li>Leaving units off rates (s⁻¹ or per second) or off concentration (mol/dm³) in Paper 4 calculations.</li>
<li>In a design question, not controlling pH or temperature — even if you are not investigating them, they must be listed and held constant.</li>
<li>Calling the lock-and-key model "wrong": at IGCSE, induced fit is the more precise description, but both are accepted if you explain specificity.</li>
<li>Saying competitive inhibitors "kill" enzymes; they only block the active site temporarily.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p>Q1. Explain why the rate of an enzyme-controlled reaction increases as temperature rises from 20 °C to 30 °C. (2 marks) Answer: molecules gain kinetic energy so move faster (1); collisions between enzyme and substrate are more frequent and more energetic, so more enzyme-substrate complexes form (1).</p>
<p>Q2. Explain what happens to an enzyme at 60 °C and why the reaction stops. (3 marks) Answer: the enzyme is denatured (1); bonds maintaining the tertiary structure break so the active site changes shape (1); the substrate no longer fits so no enzyme-substrate complexes form (1).</p>
<p>Q3. Describe how you would investigate the effect of pH on amylase activity. (4 marks) Answer: use buffers to set a range of pH values (1); keep starch concentration, amylase volume and temperature constant (1); time how long starch takes to be hydrolysed, testing with iodine (1); repeat and calculate rate = 1 ÷ time, plot rate against pH (1).</p>
<p>Q4. Explain why adding more substrate eventually stops increasing the reaction rate. (2 marks) Answer: the enzyme becomes saturated — all active sites are occupied at any moment (1), so additional substrate has to wait and cannot raise the rate further (1).</p>
<p>Q5. A reaction takes 40 s. Calculate the rate and state its unit. (2 marks) Answer: rate = 1 ÷ 40 = 0.025 (1); unit s⁻¹ or per second (1).</p>
`,
};

const titles = {
  "821d977f-fba2-4db9-a316-ac617721233b": "IGCSE Biology: Organisation of the Organism",
  "fe3ddcf1-8510-4e7d-b4df-b8cb3988292e": "IGCSE Biology: Movement Into and Out of Cells",
  "904e6645-0102-427d-a120-c720073c316c": "IGCSE Biology: Biological Molecules",
  "eecb3395-811d-42a6-97cd-cc1b5bae0b6f": "IGCSE Biology: Enzymes",
};

module.exports = { rows, titles };
