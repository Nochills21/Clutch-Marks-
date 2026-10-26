/**
 * Batch 3 — Cambridge IGCSE Biology 0610 depth rewrite.
 * Statements: 8.1-8.4, 9.1-9.4, 11.1, 13.1.
 */
const rows = {
  /* Transport in Plants — 8.1-8.4 */
  "d7347bf0-a7bf-4ab9-9048-9cbed508b672": `
<h2>IGCSE Biology: Transport in Plants</h2>
<p>A tall tree can lift water more than 100 metres from soil to leaf without a single pump — no heart, no muscles, just physics and two sets of microscopic pipes. This note explains the structure of xylem and phloem, how root hair cells take water in, how the transpiration stream pulls a continuous water column up the plant (with the potometer method that measures it), and how sugars are translocated from leaves to the rest of the plant. Every mechanism is built from the underlying physical idea first — evaporation, cohesion, osmosis, active transport — then named, so you can reconstruct it in the exam rather than recite it.</p>

<h3>Xylem and phloem: the two transport systems</h3>
<p>Vascular tissue runs through roots, stems and leaves as veins. Xylem carries water and dissolved mineral ions upwards from the roots to the leaves. Its vessels are dead, hollow tubes made of lignified cells stacked end to end with perforated end walls — wide bore, no cytoplasm, lignin-thickened walls that resist collapse under negative pressure. Phloem carries sucrose (the translocate) and amino acids both up and down the plant, from source (leaves, or storage organs in spring) to sink (roots, fruits, growing tips). Its sieve tubes are living cells with thin walls, perforated sieve plates at the ends, and no nucleus at maturity; each sieve tube element is kept alive by a companion cell packed with mitochondria. Root, stem and leaf arrangement: in roots the xylem sits in a central star; in stems the vascular bundles form a ring near the outside (giving strength); in leaves they branch as veins.</p>

<h3>Xylem and phloem compared</h3>
<table>
<tr><th>Feature</th><th>Xylem</th><th>Phloem</th></tr>
<tr><td>Carries</td><td>Water and dissolved mineral ions</td><td>Sucrose and amino acids (translocate)</td></tr>
<tr><td>Direction</td><td>Upwards only (roots to leaves)</td><td>Both directions (source to sink)</td></tr>
<tr><td>Cells</td><td>Dead, hollow, lignified walls</td><td>Living sieve tube elements with companion cells</td></tr>
<tr><td>End walls</td><td>Perforated or absent</td><td>Sieve plates with pores</td></tr>
<tr><td>Mechanism</td><td>Transpiration pull and cohesion</td><td>Pressure flow (active loading/unloading)</td></tr>
</table>

<h3>Water uptake by root hair cells</h3>
<p>The root hair is a long extension of an epidermal cell, giving a huge surface area and a thin wall for a short diffusion path. Soil water has a higher water potential than the cell sap of the root cortex cells, so water enters the root hair by osmosis and then passes from cell to cell across the cortex (by osmosis, down the water potential gradient — living layers of the endodermis with their Casparian strip force the symplastic route), until it reaches the xylem. Mineral ions enter by active transport (against their gradient, using carrier proteins and ATP from respiration), which lowers the water potential in the root and helps water follow by osmosis. The whole route: soil solution → root hair → cortex cells → endodermis → xylem. The alternative pathway (through cell walls — the apoplastic route) is blocked at the endodermis by the waterproof Casparian strip, forcing water into the living cells where it can be controlled.</p>

<h3>The transpiration stream</h3>
<p>Transpiration is the loss of water vapour from the aerial parts of the plant, mainly through the stomata. The mechanism: water evaporates from the spongy mesophyll cell walls into the air spaces of the leaf; this water vapour diffuses out through open stomata down its concentration gradient into the drier air outside. The evaporation pulls the remaining water molecules into the gap (transpiration pull), and because water molecules are cohesive (hydrogen-bonded to each other), they form a continuous column from root to leaf: as molecules leave the top, they pull the next ones up behind them (the cohesion-tension theory). Root pressure and capillary action in the narrow xylem vessels assist. The transpiration stream thus has two consequences: water reaches the leaves for photosynthesis, and dissolved mineral ions travel with it to where they are needed.</p>

<h3>Factors affecting transpiration and the potometer</h3>
<p>Transpiration increases with: higher temperature (water molecules evaporate faster), lower humidity (steeper diffusion gradient), more wind (water vapour carried away, maintaining the gradient), and higher light intensity (stomata open for carbon dioxide). It decreases when stomata close in darkness, in drought (guard cells lose turgor), or in cold. Xerophytes (cacti, marram grass) have adaptations to cut it: thick cuticle, sunken stomata, rolled leaves, hairs to trap moist air, reduced leaves (spines). The potometer measures water uptake as a proxy for transpiration: a cut leafy shoot is sealed into a capillary tube of water with an air bubble; as the shoot transpires, the bubble moves along the tube; distance moved per minute measures the rate. Keep the apparatus airtight (grease the seal), use the same shoot for all trials, and control temperature, light, humidity and air movement. Note the assumption: uptake ≈ transpiration (some water is used in photosynthesis and growth).</p>

<h3>Translocation: moving sugars</h3>
<p>Translocation is the movement of sucrose and amino acids in the phloem from source to sink, in both directions depending on the season (down from leaves in summer; up from root stores in spring). Loading sucrose into the sieve tubes at the source (by companion cells, using ATP — active transport) lowers the water potential, water enters by osmosis from the xylem, the pressure rises, and the solution mass-flows towards sinks where sucrose is unloaded (raising water potential, water leaves). This is the pressure-flow hypothesis. Evidence examiners like: aphid stylet experiments (sap collects where the stylet punctures a sieve tube; the exudate is sugary and under pressure), and ringing a stem (removing phloem causes sugars to accumulate above the cut, swelling the bark, while xylem is undisturbed). Sucrose is the transport sugar — not glucose — because it is non-reducing, stable and soluble.</p>

<h3>Worked example: potometer data and transpiration reasoning</h3>
<p>A potometer's bubble moved 12 cm in 30 minutes at 20 °C in still air. Calculate the rate and predict the effect of a fan. Step 1: rate = distance ÷ time = 12 cm ÷ 30 min = 0.4 cm per minute. Step 2: with a fan, the boundary layer of saturated air around the leaf is swept away, keeping the diffusion gradient steep — the rate increases, perhaps to 0.7 cm/min. Step 3: percent change = (0.7 − 0.4) ÷ 0.4 × 100 = 75 % increase. A second calculation: water loss per day — if 0.4 cm/min over a 12-hour day and the capillary tube bore corresponds to 0.02 cm³ per cm, daily uptake = 0.4 × 60 × 12 × 0.02 = 5.76 cm³. Use the numbers given in any real question, and always quote units (cm per minute, cm³ per hour) — unitless answers lose a mark.</p>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Swapping xylem and phloem: xylem = water up (dead, lignified); phloem = sugars both ways (living, sieve plates). A memory hook: "xylem is for X-tra water".</li>
<li>Saying transpiration is "the plant breathing": it is evaporation of water through stomata.</li>
<li>Forgetting cohesion in the explanation of the transpiration stream: the continuous hydrogen-bonded column is the whole mechanism.</li>
<li>Describing water movement in the xylem as osmosis — xylem is dead, so water movement there is bulk flow under tension, not osmosis.</li>
<li>Confusing translocation (sugars in phloem) with transpiration (water vapour loss).</li>
<li>In a potometer plan, not mentioning airtight seals or the same shoot for repeats — both are standard control marks.</li>
<li>Saying stomata "let water in": they admit carbon dioxide and release oxygen; water loss is a side effect of keeping them open.</li>
<li>Writing the source-to-sink direction as one-way only; at A Level the season reversal is examined.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p>Q1. Describe how water moves from the soil into the xylem of a root. (4 marks) Answer: water enters root hair cells by osmosis down the water potential gradient (1); passes through cortex cells from cell to cell (1); endodermis (Casparian strip) blocks the apoplastic route so water passes into living cells (1); enters the xylem where root pressure and transpiration pull move it up (1).</p>
<p>Q2. Explain how four environmental factors affect the rate of transpiration. (4 marks) Answer: higher temperature increases evaporation rate (1); lower humidity steepens the diffusion gradient (1); wind removes saturated air from leaf surfaces (1); light opens stomata so more surface is exposed (1).</p>
<p>Q3. Explain why xylem vessels have lignified walls and no cytoplasm. (2 marks) Answer: lignin strengthens the walls to withstand the negative pressure of the transpiration stream (1); no cytoplasm leaves a clear hollow tube for water flow (1).</p>
<p>Q4. Describe how you would investigate the effect of wind on transpiration using a potometer. (4 marks) Answer: set up the potometer with a cut leafy shoot, ensuring the apparatus is airtight (1); measure the distance the air bubble moves per minute in still air (1); place a fan at a fixed distance and repeat (1); keep temperature, light and humidity constant and repeat for a mean (1).</p>
<p>Q5. Explain the advantage of translocation occurring in both directions in the phloem. (2 marks) Answer: sugars move down from leaves to roots in summer for storage (1); and up from storage organs to growing shoots in spring when leaves are absent (1).</p>
`,

  /* Transport in Animals — 9.1-9.4 */
  "f6640283-d20a-409d-b6bb-4f9e2d2ac832": `
<h2>IGCSE Biology: Transport in Animals</h2>
<p>Your body contains about 5 litres of blood travelling through roughly 100 000 km of vessels, driven by a pump the size of your fist that beats around 100 000 times a day. This note builds the circulatory system from first principles: why large animals need a double circulation, how the heart is wired (with every chamber, valve and vessel named and the blood path traced through it), how arteries, veins and capillaries are each built for their job, what blood is made of and what each component does, and how coronary heart disease develops and is prevented. The heart-cycle sequence is expanded beat by beat so you can follow the pressure changes rather than memorise a diagram.</p>

<h3>Single and double circulations</h3>
<p>Small organisms rely on diffusion alone; larger animals need a mass-transport system. A single circulation (fish): blood passes through the heart once per circuit — heart → gills → body → heart. Gas exchange at the gills drops the pressure, so flow to the body is slow; a double circulation solves this. A double circulation (mammals, birds): blood passes through the heart twice per full circuit. The right side pumps deoxygenated blood to the lungs (pulmonary circulation); oxygenated blood returns to the left side, which pumps it at high pressure around the body (systemic circulation). Advantage: blood pressure is restored after the lungs, so oxygen reaches tissues fast; and the two circuits can operate at different pressures (low in the delicate lungs, high for the body). An open circulation (insects) bathes organs directly in haemolymph; a closed circulation keeps blood in vessels at all times — the mammalian system is closed.</p>

<h3>Heart structure and the double circulation</h3>
<p>The heart has four chambers: two thin-walled atria (singular: atrium) that receive blood, and two thick-walled ventricles that pump it out. The right atrium receives deoxygenated blood from the vena cava; the right ventricle pumps it to the lungs via the pulmonary artery. The left atrium receives oxygenated blood from the pulmonary veins; the left ventricle pumps it to the whole body via the aorta — its wall is thickest because it generates the highest pressure. Four valves ensure one-way flow: the atrioventricular valves (tricuspid on the right, bicuspid/mitral on the left) between atria and ventricles, and the semilunar valves at the base of the pulmonary artery and aorta. Valves open when pressure behind them exceeds pressure ahead, and close to prevent backflow — the "lub" of the heartbeat is the atrioventricular valves closing; the "dub" is the semilunar valves closing. Coronary arteries wrap over the heart muscle itself and deliver oxygenated blood to the cardiac muscle, which cannot absorb oxygen from the blood inside its chambers.</p>

<h3>The cardiac cycle, step by step</h3>
<p>Step 1 — atrial systole: the atria contract, pushing the last of the blood into the ventricles (atrioventricular valves open; semilunar valves closed). Step 2 — ventricular systole: the ventricles contract, pressure rises above the atria (atrioventricular valves slam shut — "lub"), blood is ejected into the pulmonary artery and aorta (semilunar valves forced open). Step 3 — diastole: the ventricles relax, pressure drops below that in the arteries (semilunar valves snap shut — "dub"), blood fills the atria again from the veins, and the cycle repeats. Duration: about 0.8 s at rest (0.1 s atrial systole, 0.3 s ventricular systole, 0.4 s diastole). During exercise the cycle shortens (more beats per minute) and stroke volume rises, so cardiac output (heart rate × stroke volume) increases to deliver more oxygen.</p>

<h3>Blood vessels: structure fits function</h3>
<table>
<tr><th>Vessel</th><th>Wall</th><th>Lumen</th><th>Special features</th><th>Function</th></tr>
<tr><td>Artery</td><td>Thick, muscular, elastic</td><td>Narrow</td><td>Elastic recoil smooths pressure pulses</td><td>Carries blood at high pressure away from the heart</td></tr>
<tr><td>Arteriole</td><td>Muscular</td><td>Narrow</td><td>Smooth muscle contracts/relaxes to control flow</td><td>Diverts blood to active organs</td></tr>
<tr><td>Capillary</td><td>One cell thick (endothelium)</td><td>Very narrow (one cell wide)</td><td>Huge total surface area, slow flow</td><td>Exchange of gases, nutrients and wastes with tissue fluid</td></tr>
<tr><td>Vein</td><td>Thin, less muscle/elastic</td><td>Wide</td><td>Valves prevent backflow</td><td>Returns blood at low pressure to the heart</td></tr>
</table>
<p>Artery walls are thick and elastic to withstand and smooth the pulsing pressure (elastic recoil maintains flow between beats); veins have valves and rely on skeletal muscle contraction to squeeze blood back against gravity. Capillaries are exactly one cell thick so the diffusion distance is minimal, and their slow flow gives time for exchange — structure and function matched at every level.</p>

<h3>Blood: plasma, cells and their roles</h3>
<p>Plasma is the straw-coloured liquid: about 55 % of blood volume; it carries water, dissolved glucose, amino acids, fatty acids, glycerol, hormones, carbon dioxide (as hydrogencarbonate ions), urea, plasma proteins (fibrinogen for clotting, albumin for osmotic balance), and antibodies. Red blood cells (erythrocytes): biconcave discs with no nucleus and packed haemoglobin; haemoglobin binds oxygen at high partial pressure in the lungs and releases it at low partial pressure in the tissues (oxyhaemoglobin ↔ haemoglobin + oxygen). White blood cells (leucocytes): part of immunity — phagocytes engulf pathogens; lymphocytes produce antibodies and antitoxins. Platelets (cell fragments): clotting — they stick to a wound, trap red cells and activate fibrinogen → fibrin threads, forming a scab that seals the vessel and blocks pathogen entry. Tissue fluid: plasma minus large proteins, formed at the arteriole end of capillaries where pressure forces it out; most is reabsorbed at the venule end; excess drains into the lymphatic system.</p>

<h3>Coronary heart disease</h3>
<p>The coronary arteries supply the heart muscle itself. Coronary heart disease develops when fatty deposits (atheroma/cholesterol plaques) build up in the artery walls, narrowing the lumen and restricting blood flow; the muscle is starved of oxygen and glucose, causing angina (chest pain on exertion) and, if a coronary artery blocks completely (a thrombus/clot), a myocardial infarction — heart attack — and muscle death. Risk factors: diet high in saturated fat and salt, smoking (carbon monoxide reduces oxygen-carrying capacity; nicotine raises heart rate and constricts vessels), obesity, stress, lack of exercise, alcohol, age, and inherited family history. Prevention and treatment: a balanced diet low in saturated fat, regular exercise, not smoking, statins (lower cholesterol), anticoagulants (aspirin/warfarin), angioplasty (balloon to widen the artery, often with a stent), and coronary bypass surgery (grafting a vessel to detour the blockage). The exam wants risk factor linked to mechanism — not just a list.</p>

<h3>Worked example: cardiac output calculation and reading a heart diagram</h3>
<p>At rest a person has a heart rate of 70 beats per minute and a stroke volume of 70 cm³. Step 1: cardiac output = heart rate × stroke volume = 70 × 70 = 4900 cm³ per minute = 4.9 dm³/min ≈ the whole blood volume circulated each minute. Step 2: during exercise, rate rises to 150 and stroke volume to 110: output = 150 × 110 = 16 500 cm³/min — 3.4 times the resting output. Step 3: explain the benefit: more oxygen and glucose delivered to muscles per minute, more carbon dioxide removed, so respiration rate can stay high. Diagram-reading practice: trace one drop of blood — vena cava → right atrium → (tricuspid valve) → right ventricle → (semilunar valve) → pulmonary artery → lungs → pulmonary veins → left atrium → (bicuspid valve) → left ventricle → (semilunar valve) → aorta → body. Name the valves in order and you answer almost any "trace the path" question for full marks.</p>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Saying arteries "carry oxygenated blood": the pulmonary artery carries deoxygenated blood; arteries carry blood away from the heart, whatever its oxygen content.</li>
<li>Confusing atrium and ventricle roles: atria receive; ventricles pump.</li>
<li>Explaining the left ventricle's thick wall as "it is bigger" — the answer is higher pressure needed for the systemic circulation.</li>
<li>Forgetting the coronary arteries in a heart-structure question — they are often the last mark.</li>
<li>Describing blood flow in veins as due to "suction" or gravity alone; mention valves and skeletal muscle contraction.</li>
<li>Writing that platelets "carry oxygen": they clot blood; red blood cells carry oxygen.</li>
<li>Listing heart-disease risk factors without explaining the mechanism (e.g. saturated fat raises blood cholesterol which deposits in artery walls).</li>
<li>In valve questions, writing "valves stop the blood going back" without the pressure context: they open forward when pressure behind them is higher and close to prevent backflow.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p>Q1. Describe the route of blood through the heart, naming the chambers and vessels. (4 marks) Answer: vena cava to right atrium (1); to right ventricle and out via the pulmonary artery to the lungs (1); pulmonary veins to left atrium (1); to left ventricle and out via the aorta to the body (1).</p>
<p>Q2. Explain why the wall of the left ventricle is thicker than that of the right. (2 marks) Answer: it pumps blood at higher pressure to the whole body (1), while the right ventricle only pumps to the nearby lungs at lower pressure (1).</p>
<p>Q3. Compare the structure of an artery and a vein. (4 marks) Answer: artery has thicker muscular/elastic wall, vein thinner (1); artery narrower lumen, vein wider (1); veins have valves, arteries generally do not (1); arteries carry blood under high pressure from the heart, veins return it at low pressure (1).</p>
<p>Q4. Explain how a diet high in saturated fat can lead to a heart attack. (3 marks) Answer: raises blood cholesterol (1); fatty deposits build up in coronary artery walls narrowing the lumen (1); a clot can block the vessel completely, starving the muscle of oxygen (1).</p>
<p>Q5. Describe the role of platelets and plasma in blood clotting. (3 marks) Answer: platelets stick to the damaged vessel wall and release clotting factors (1); fibrinogen is converted to fibrin threads (1); the mesh traps red blood cells forming a scab; plasma carries the fibrinogen and other clotting proteins (1).</p>
`,

  /* Gas Exchange in Humans — 11.1 */
  "f02c50e2-ed9d-43a4-8552-77b170e4a29d": `
<h2>IGCSE Biology: Gas Exchange in Humans</h2>
<p>Every cell in your body needs oxygen and must be rid of carbon dioxide, and the surface where that trade happens is astonishingly thin and large: the alveoli, together about the size of a tennis court, packed into your chest behind a set of muscles and airways built like an inverted tree. This note traces the anatomy from nose to alveolus, explains the mechanism of breathing with the pressure changes named, works through the diffusion of the two gases across the alveolar-capillary membrane, and closes with how exercise and lung diseases change the picture — plus the Paper 6 spirometry and data-response skills.</p>

<h3>The airway anatomy and its adaptations</h3>
<p>Air enters through the nose or mouth; the nasal cavity warms, moistens and filters it (hairs and mucus trap particles and microbes). It passes the pharynx, through the larynx (voice box), down the trachea (windpipe), into the two bronchi (one per lung), then branching bronchioles, and finally into clusters of alveoli. The trachea and bronchi are held open by C-shaped rings of cartilage, lined with ciliated epithelium and mucus-secreting goblet cells: mucus traps pathogens and dust, and the cilia sweep it upwards to the throat to be swallowed (the mucociliary escalator — smoking paralyses the cilia). Bronchioles have smooth muscle in their walls to control airflow (they constrict in asthma). The lungs themselves are spongy, elastic, and sit in the pleural cavity with a fluid layer that reduces friction as they inflate.</p>

<h3>Alveoli: the exchange surface</h3>
<p>Each alveolus is a tiny air sac with features that maximise gas exchange: an enormous combined surface area (about 70 m² in an adult); walls one cell thick (thin squamous epithelium) giving a very short diffusion path; a dense capillary network around each sac maintaining steep concentration gradients (blood flow constantly sweeps oxygen away and brings carbon dioxide); and a moist lining so gases dissolve before diffusing. Ventilation keeps the gradients fresh: oxygen concentration in alveolar air stays higher than in deoxygenated blood arriving, so oxygen diffuses in; carbon dioxide concentration in the blood stays higher than in alveolar air, so carbon dioxide diffuses out. Partial pressure gradients, not "attraction", drive the movement — always answer in terms of gradients.</p>

<h3>Breathing (ventilation) mechanism</h3>
<p>Inhalation is active: the external intercostal muscles contract (ribcage up and out) and the diaphragm contracts (flattens from dome to lower), enlarging the thoracic volume; the lungs stretch with it, pressure inside falls below atmospheric pressure, and air rushes in down the pressure gradient. Exhalation at rest is passive: the intercostals and diaphragm relax, elastic recoil of the lungs reduces thoracic volume, pressure rises above atmospheric, and air is pushed out. During exercise, forced exhalation uses the internal intercostals and abdominal muscles. The pressure story is the mark: volume up → pressure down → air in; volume down → pressure up → air out. Tidal volume is the volume per breath at rest (about 0.5 dm³); breathing rate rises and tidal volume deepens during exercise; minute ventilation = tidal volume × breathing rate.</p>

<h3>Gas exchange in the alveolus</h3>
<p>Oxygen: inhaled air brings oxygen to a high partial pressure in the alveolus; deoxygenated blood arriving in the capillary has low oxygen partial pressure; oxygen therefore dissolves in the moist alveolar surface and diffuses across the alveolar epithelium, the thin interstitial space, and the capillary endothelium into the plasma, then into red blood cells where it binds haemoglobin (forming oxyhaemoglobin) — keeping free oxygen low and the gradient steep. Carbon dioxide: produced by respiration in tissues, carried in plasma (as hydrogencarbonate ions and dissolved gas) and partly bound to haemoglobin; its partial pressure in capillary blood exceeds that in alveolar air, so it diffuses the opposite way and is exhaled. The whole exchange depends on the thinness of the barrier (two cells thick at most), the large surface area, and constant blood flow and ventilation maintaining gradients.</p>

<h3>Ventilation data at a glance</h3>
<table>
<tr><th>Measurement</th><th>At rest (typical)</th><th>During vigorous exercise</th></tr>
<tr><td>Tidal volume (per breath)</td><td>0.5 dm³</td><td>2.0-3.0 dm³</td></tr>
<tr><td>Breathing rate</td><td>12-16 breaths per minute</td><td>30-40 breaths per minute</td></tr>
<tr><td>Minute ventilation</td><td>7-8 dm³ per minute</td><td>60-100 dm³ per minute</td></tr>
<tr><td>Vital capacity</td><td>4-5 dm³</td><td>Unchanged (trained athletes higher)</td></tr>
</table>

<h3>Effects of exercise on gas exchange</h3>
<p>During exercise, muscles respire faster and produce more carbon dioxide; the brain detects rising carbon dioxide (via chemoreceptors) and increases breathing rate and depth, and heart rate, to deliver oxygen faster and remove carbon dioxide. Tidal volume and breathing rate both rise, so minute ventilation increases dramatically; gas exchange remains efficient because the gradients are steeper (more carbon dioxide arriving keeps its gradient high) and blood flow is faster. Oxygen debt after exercise (covered in the respiration note) is the extra oxygen consumed for recovery. The trained athlete has a larger vital capacity (maximum volume exhaled after a maximum inhalation), more efficient ventilation, and a lower resting heart rate — all standard data-response comparison points.</p>

<h3>Lung disease and smoking</h3>
<p>Asthma: bronchioles constrict (smooth muscle spasm), narrowing the airways; triggers include allergens, cold air, exercise; symptoms wheezing and breathlessness; treated with inhalers (bronchodilators). Emphysema: alveolar walls break down and merge, destroying surface area and elasticity; permanent breathlessness; strongly linked to smoking. Lung cancer: uncontrolled cell division in the airways forming tumours that block air flow; smoking (tar and carcinogens) is the main risk factor. Smoking's mechanisms: carbon monoxide binds haemoglobin irreversibly in preference to oxygen, reducing oxygen transport; tar paralyses cilia and deposits in alveoli causing chronic cough and infections; nicotine constricts vessels and raises heart rate, increasing heart disease risk; particulates irritate and inflame the airways. The comparison questions reward "disease → structural change → functional effect".</p>

<h3>Worked example: spirometry and ventilation calculations</h3>
<p>A student records tidal volume 0.5 dm³ at rest with a breathing rate of 14 breaths per minute. Step 1: minute ventilation = tidal volume × rate = 0.5 × 14 = 7.0 dm³/min. Step 2: during exercise, tidal volume rises to 2.0 dm³ and rate to 32: ventilation = 2.0 × 32 = 64 dm³/min. Step 3: interpret: ventilation increased 64 ÷ 7.0 ≈ 9-fold, supplying the extra oxygen demanded by respiring muscles and clearing the extra carbon dioxide. Step 4: if the question gives a spirometer trace (a loop of volume against time), read tidal volume from the peak-to-trough amplitude at rest, count peaks for breathing rate, and use vital capacity from the highest peak to the lowest trough — then apply the same formula. Percentage change of ventilation = (64 − 7) ÷ 7 × 100 = 814 % increase — quote the multiplier (about nine times) as well as the percentage for clarity.</p>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Saying air is "sucked into the lungs": air moves in because thoracic pressure falls below atmospheric pressure — use pressure language.</li>
<li>Confusing the diaphragm's action: it contracts and flattens on inhalation, relaxes and domes on exhalation.</li>
<li>Describing gas exchange as "osmosis": gases move by diffusion down partial pressure gradients.</li>
<li>Forgetting the moisture lining of the alveoli — gases must dissolve before they diffuse.</li>
<li>Writing that emphysema "blocks the alveoli" — the correct description is walls break down, reducing surface area and elasticity.</li>
<li>Leaving cilia and mucus out of an airway-adaptation question — they are marks for protection.</li>
<li>In a ventilation calculation, mixing up tidal volume and vital capacity; and forgetting units (dm³ per minute).</li>
<li>Explaining exercise response as "the lungs grow bigger": breathing rate and depth increase, but lung structure does not change.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p>Q1. Describe how the alveoli are adapted for gas exchange. (4 marks) Answer: large surface area (1); walls one cell thick for a short diffusion path (1); dense capillary network maintains steep concentration gradients (1); moist lining so gases dissolve (1).</p>
<p>Q2. Explain how the intercostal muscles and diaphragm cause inhalation. (3 marks) Answer: external intercostals contract lifting the ribcage up and out (1); diaphragm contracts and flattens (1); thoracic volume increases so pressure falls below atmospheric and air enters (1).</p>
<p>Q3. Explain why smoking increases the risk of lung infections. (3 marks) Answer: tar paralyses cilia so mucus is not swept away (1); pathogens accumulate in the airways (1); carbon monoxide reduces oxygen transport weakening defences (1).</p>
<p>Q4. Calculate the minute ventilation of a person with a tidal volume of 0.4 dm³ breathing 18 times per minute. (2 marks) Answer: 0.4 × 18 (1); = 7.2 dm³ per minute (1).</p>
<p>Q5. Compare gas exchange in a healthy person and someone with emphysema. (4 marks) Answer: healthy alveoli have a huge surface area and thin walls (1); in emphysema walls break down so surface area falls (1); elasticity is lost so air is not expelled efficiently (1); oxygen diffusion rate drops causing breathlessness (1).</p>
`,

  /* Excretion in Humans — 13.1 */
  "d4b4bf03-7fd4-4d21-9c65-0a7f3841e11b": `
<h2>IGCSE Biology: Excretion in Humans</h2>
<p>Metabolism is a messy business: breaking down amino acids leaves toxic ammonia, respiration leaves carbon dioxide, and dead cells leave wastes that would poison the blood if they accumulated. Excretion is the removal of these waste products of metabolism, and the kidney is the chemical processing plant that does most of it — filtering the entire blood volume about 40 times a day and adjusting exactly what is kept. This note defines excretion precisely (against egestion), follows the blood and urine pathways, works through the nephron's filtration-reabsorption-secretion logic, explains kidney failure and dialysis, and shows how the liver's deamination and the urea cycle fit together — with the urine-composition data answers examiners expect.</p>

<h3>What excretion is (and what it is not)</h3>
<p>Excretion is the removal from organisms of the waste products of metabolism (chemical reactions in cells) — carbon dioxide from respiration, water, and nitrogenous wastes such as urea from the liver. It is NOT egestion (the removal of undigested food as faeces — that material never entered the body's cells), and NOT sweating merely (sweat contains some excretory water and salts, but its main role is temperature regulation). The four mammalian excretory routes: lungs (carbon dioxide and water vapour, exhaled), kidneys (urea, excess water and salts, in urine), skin (water, salts, small urea, in sweat), and the liver processes the toxins first. Being able to classify a given substance's route is a common one-mark question.</p>

<h3>The liver, deamination and the urea cycle</h3>
<p>The liver receives amino acids from digestion via the hepatic portal vein. Amino acids cannot be stored, so surplus ones are deaminated: the amino group is removed in the liver (using oxygen in a process that also produces carbon dioxide and water), releasing ammonia — highly toxic — which is immediately converted (ornithine/urea cycle) into the much less toxic urea, which enters the blood for the kidneys to excrete. The deaminated remainder (a keto acid) is respired or converted to glycogen or fat for storage. Liver functions in full: deamination and urea production, storing glycogen (and releasing glucose to regulate blood sugar), detoxifying alcohol and drugs (enzymes break them down; chronic alcohol use damages liver cells and reduces detoxification), making bile for fat emulsification, and breaking down old red blood cells (the bile pigment bilirubin being an excretory product of haemoglobin).</p>

<h3>The kidneys and the nephron</h3>
<p>Each kidney contains about a million nephrons. Blood enters the kidney via the renal artery (high pressure, oxygenated), branches into afferent arterioles, and each feeds a glomerulus — a knot of capillaries inside Bowman's capsule. Filtration: the high pressure forces small molecules (water, glucose, amino acids, salts, urea) out of the blood into the Bowman's capsule, forming the glomerular filtrate; large molecules (proteins, blood cells) stay in the blood. Selective reabsorption: as the filtrate passes along the proximal convoluted tubule, all the glucose and amino acids, most of the water, and some salts are reabsorbed into the peritubular capillaries (glucose and amino acids by active transport, water by osmosis — the proximal tubule is lined with microvilli and packed with mitochondria to power it). Secretion: additional salts and hydrogen ions (and drugs such as penicillin) are secreted from the blood into the tubule. The loop of Henle concentrates the filtrate; the collecting duct adjusts final water reabsorption under the influence of antidiuretic hormone (ADH): more ADH → more water reabsorbed → small volumes of concentrated urine; less ADH → dilute urine. The final fluid is urine: water, urea, salts — normally no glucose.</p>

<h3>Urine composition and what it reveals</h3>
<p>Normal urine: water, urea, mineral salts, small amounts of other excretory products; no glucose (all reabsorbed at the proximal tubule), no protein (too large to filter). Glucose in urine (glycosuria) indicates diabetes mellitus — insulin deficiency means blood glucose exceeds the kidney's reabsorption capacity (the transport maximum), or renal damage. Protein in urine indicates kidney damage (glomerulitis/nephritis) allowing large molecules through. Dehydration: low water intake or heavy sweating → more water reabsorbed → small volume of dark, concentrated urine, and blood osmotic pressure rises detected by osmoreceptors in the hypothalamus triggering ADH release and thirst. Overhydration: pale, dilute, high-volume urine. Ketones in urine indicate fat breakdown during starvation or uncontrolled diabetes. Reading a urine-composition table against a scenario is a standard Paper 4 data-response question.</p>

<h3>Urine composition: normal and diagnostic</h3>
<table>
<tr><th>Substance</th><th>Normal urine</th><th>Presence indicates</th></tr>
<tr><td>Water, urea, salts</td><td>Present</td><td>Normal excretion</td></tr>
<tr><td>Glucose</td><td>Absent</td><td>Diabetes mellitus or kidney damage</td></tr>
<tr><td>Protein</td><td>Absent</td><td>Kidney damage (large molecules passing the filter)</td></tr>
<tr><td>Blood</td><td>Absent</td><td>Infection, stones or glomerular damage</td></tr>
<tr><td>Ketones</td><td>Absent</td><td>Fat breakdown in starvation or uncontrolled diabetes</td></tr>
</table>

<h3>Kidney failure and dialysis</h3>
<p>Kidney failure (from chronic high blood pressure, diabetes, infection or nephrotoxic drugs) means urea and excess salts and water build up in the blood (uraemia), which is fatal without treatment. Two treatments: dialysis (a haemodialysis machine) — the patient's blood is passed over a partially permeable dialysis membrane bathed in dialysis fluid that matches the desired blood composition: no urea, correct glucose and salt concentrations; so urea diffuses out of the blood down its concentration gradient, glucose does not diffuse in (already at the right concentration), and the balance of water and salts is adjusted by pressure and concentration gradients; sessions last several hours, several times a week. Or a kidney transplant — a donor kidney surgically joined to the patient's blood vessels and bladder; success depends on tissue-type matching (HLA antigens) to prevent rejection; immunosuppressant drugs are then needed. Compare in exams: dialysis is regular, time-consuming and diet-restricted but no surgery; transplant restores normal function but needs a matched donor and lifelong immunosuppression.</p>

<h3>Worked example: following one molecule and one calculation</h3>
<p>Trace a molecule of urea: protein in food → digested to amino acids → absorbed into the blood → deamination in the liver releases ammonia → converted to urea → carried in the blood to the kidney → filtered at the glomerulus into Bowman's capsule → not reabsorbed in the tubule → collects in the collecting duct → drains to the ureter → stored in the bladder → excreted in urine. Now the numbers: a dialysis machine processes 300 cm³ of blood per pass, and the patient has 5 dm³ (5000 cm³) of blood; each hour about 1.5 dm³ passes. If the blood urea concentration is 0.06 g/dm³ and the dialysis fluid contains 0 g/dm³, the concentration gradient drives urea out; after treatment the concentration falls to 0.01 g/dm³. Mass of urea removed per dm³ = 0.06 − 0.01 = 0.05 g; over a 4-hour session treating 12 dm³ of blood-pass volume, up to about 0.6 g is cleared per 12 dm³ processed (use the actual volumes in any question, and show mass = concentration × volume in every calculation).</p>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Calling faeces an excretory product: it is egested undigested food, never part of metabolism inside cells.</li>
<li>Writing that the kidney "makes urea": urea is made in the liver; the kidney only filters and excretes it.</li>
<li>Confusing the afferent and efferent arterioles: afferent brings blood to the glomerulus (wider bore, creating filtration pressure); efferent leaves it (narrower, maintaining pressure).</li>
<li>Saying glucose is "actively secreted" into the tubule: it is filtered then actively reabsorbed — direction matters.</li>
<li>Forgetting the protein-and-blood-cells size rule: too large to be filtered, which is why their presence in urine signals damage.</li>
<li>Explaining dialysis as "cleaning the blood with soap": specify the partially permeable membrane, the concentration gradients, and the composition of dialysis fluid (no urea, correct glucose).</li>
<li>Leaving ADH out of an osmoregulation/urine-concentration answer — it is usually a mark.</li>
<li>Confusing urea (nitrogenous waste, made in liver) with uric acid or ammonia (toxic intermediate, immediately converted).</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p>Q1. Define excretion and give two excretory products in mammals with the organ that removes each. (3 marks) Answer: removal of waste products of metabolism (1); carbon dioxide from the lungs (1); urea from the kidneys (1).</p>
<p>Q2. Describe the role of the liver in excretion. (3 marks) Answer: deamination of surplus amino acids removes the amino group (1); ammonia is toxic and is converted to urea (1); urea is released into the blood for the kidneys to filter out (1).</p>
<p>Q3. Describe what happens in the nephron during urine formation. (4 marks) Answer: ultrafiltration at the glomerulus under high pressure (1); small molecules pass into Bowman's capsule while proteins and cells remain (1); selective reabsorption of glucose, amino acids and most water in the proximal tubule (1); water reabsorption in the collecting duct regulated by ADH (1).</p>
<p>Q4. Explain why glucose may appear in the urine of a person with diabetes. (2 marks) Answer: insulin deficiency raises blood glucose above the kidney's reabsorption capacity (1); so not all glucose can be reabsorbed and the excess is excreted (1).</p>
<p>Q5. Compare dialysis with kidney transplantation as treatments for kidney failure. (4 marks) Answer: dialysis regularly filters blood externally without surgery but is time-consuming with diet restrictions (1); transplant restores continuous normal function (1); transplant requires tissue-type matching to prevent rejection (1); transplant recipients take immunosuppressant drugs for life (1).</p>
`,
};

const titles = {
  "d7347bf0-a7bf-4ab9-9048-9cbed508b672": "IGCSE Biology: Transport in Plants",
  "f6640283-d20a-409d-b6bb-4f9e2d2ac832": "IGCSE Biology: Transport in Animals",
  "f02c50e2-ed9d-43a4-8552-77b170e4a29d": "IGCSE Biology: Gas Exchange in Humans",
  "d4b4bf03-7fd4-4d21-9c65-0a7f3841e11b": "IGCSE Biology: Excretion in Humans",
};

module.exports = { rows, titles };
