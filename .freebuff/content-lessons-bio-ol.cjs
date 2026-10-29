// Lessons for Cambridge IGCSE Biology 0610.
//
// The level had twenty-one topics and ZERO lessons, so its hub reported
// "0 Lessons" while every other subject's IGCSE level listed a lesson per topic.
// One lesson per topic, same shape as the estate: h2 title, syllabus reference,
// numbered sections, exam focus.

module.exports = [
  {
    topic: "characteristics-and-classification-of-living-organisms",
    title: "Characteristics and Classification of Living Organisms",
    content: `<h2>Characteristics and Classification of Living Organisms</h2>
<p><strong>Cambridge IGCSE 0610 (2023–2025):</strong> 1.1 characteristics of living organisms; 1.2 classification; 1.3 features of organisms; 1.4 dichotomous keys.</p>

<h3>1. The seven characteristics</h3>
<p>Remember MRS GREN: movement, respiration, sensitivity, growth, reproduction, excretion, nutrition. Every living organism shows all seven; a virus shows none outside a host cell, which is why it is not classified as living.</p>

<h3>2. The classification hierarchy</h3>
<p>Kingdom, phylum, class, order, family, genus, species. The binomial name uses genus and species, written in italics with a capital genus (Homo sapiens). Organisms in the same species can interbreed to produce fertile offspring.</p>
<p>The five kingdoms are animals, plants, fungi, protoctists and prokaryotes (bacteria). Viruses are placed outside the kingdoms because they are not cells.</p>

<h3>3. Features of the main groups</h3>
<ul>
<li>Animals: multicellular, no cell wall, feed heterotrophically; vertebrates have a backbone, invertebrates do not.</li>
<li>Plants: multicellular, cellulose cell walls, chlorophyll, photosynthesise.</li>
<li>Fungi: cell walls of chitin, no chlorophyll, feed by absorbing dissolved nutrients (yeast, moulds, mushrooms).</li>
<li>Protoctists: mostly single-celled with a nucleus (Amoeba, Chlorella).</li>
<li>Prokaryotes: no nucleus, loop of DNA, no membrane-bound organelles (bacteria).</li>
</ul>
<p>Vertebrate classes: fish (scales, gills), amphibians (moist skin, eggs in water), reptiles (dry scaly skin, shelled eggs), birds (feathers, beaks), mammals (hair, mammary glands).</p>

<h3>4. Using a key</h3>
<p>A dichotomous key asks one question at a time with two mutually exclusive answers, each leading to another question until the organism is named. Good keys describe visible features, not habitat or behaviour.</p>

<h3>Exam focus</h3>
<p><strong>Q:</strong> State two features that distinguish fungi from plants.</p>
<p><strong>A:</strong> Fungi have cell walls made of chitin rather than cellulose, and they have no chlorophyll, so they cannot photosynthesise and feed heterotrophically.</p>`,
  },
  {
    topic: "organisation-of-the-organism",
    title: "Organisation of the Organism",
    content: `<h2>Organisation of the Organism</h2>
<p><strong>Cambridge IGCSE 0610 (2023–2025):</strong> 2.1 cell structure; 2.2 levels of organisation; 2.3 size and magnification.</p>

<h3>1. Plant and animal cells</h3>
<table border="1" cellpadding="6"><tr><th>Structure</th><th>Function</th><th>Plant</th><th>Animal</th></tr>
<tr><td>nucleus</td><td>contains chromosomes, controls the cell</td><td>yes</td><td>yes</td></tr>
<tr><td>cytoplasm</td><td>site of chemical reactions</td><td>yes</td><td>yes</td></tr>
<tr><td>cell membrane</td><td>controls what enters and leaves</td><td>yes</td><td>yes</td></tr>
<tr><td>cell wall</td><td>cellulose, supports the cell</td><td>yes</td><td>no</td></tr>
<tr><td>chloroplast</td><td>contains chlorophyll, photosynthesis</td><td>yes</td><td>no</td></tr>
<tr><td>vacuole</td><td>large, permanent, stores sap</td><td>yes</td><td>small or absent</td></tr></table>

<h3>2. From cell to organism</h3>
<p>Cell → tissue → organ → organ system → organism. A tissue is a group of similar cells doing one job (muscle tissue); an organ combines tissues for a function (stomach); a system combines organs (digestive system).</p>

<h3>3. Specialised cells and their shapes</h3>
<ul>
<li>Root hair cell: long thin extension, large surface area for water uptake.</li>
<li>Palisade mesophyll: packed with chloroplasts near the leaf surface.</li>
<li>Red blood cell: no nucleus, biconcave, packed with haemoglobin.</li>
<li>Ciliated cell: tiny hairs sweep mucus (trachea, oviduct).</li>
<li>Sperm and egg cells: one is motile, the other stores food for the embryo.</li>
<li>Nerve cell: long to carry impulses; muscle cell: contracts.</li>
</ul>

<h3>4. Magnification</h3>
<p>Magnification = drawing size / actual size. Keep the units consistent: 1 mm = 1000 µm. A cell 50 µm wide drawn 10 mm across is ×200. Convert the other way for actual size: actual = image / magnification.</p>

<h3>Exam focus</h3>
<p><strong>Q:</strong> A cell is examined and shown to have a cell wall and many chloroplasts. State two things it cannot be.</p>
<p><strong>A:</strong> It cannot be an animal cell (it has a wall and chloroplasts) and it cannot be a fungal or bacterial cell (fungi have no chloroplasts, bacteria have no membrane-bound chloroplasts or nucleus).</p>`,
  },
  {
    topic: "movement-into-and-out-of-cells",
    title: "Movement into and out of Cells",
    content: `<h2>Movement into and out of Cells</h2>
<p><strong>Cambridge IGCSE 0610 (2023–2025):</strong> 3.1 diffusion; 3.2 osmosis; 3.3 active transport.</p>

<h3>1. Diffusion</h3>
<p>Diffusion is the net movement of particles from a region of higher concentration to lower concentration, down a concentration gradient, due to random motion. It needs no energy from the cell. Rate is faster with a steeper gradient, higher temperature, larger surface area and a shorter distance — which is why alveoli and villi are shaped as they are.</p>

<h3>2. Osmosis</h3>
<p>Osmosis is the diffusion of water through a partially permeable membrane from a dilute solution (high water potential) to a concentrated solution (low water potential). In pure water, a plant cell becomes turgid because the cell wall resists further expansion; in a concentrated sugar solution it loses water, the vacuole shrinks and the membrane pulls away — plasmolysis. An animal cell in pure water bursts (lysis); in strong solution it shrinks (crenation).</p>

<h3>3. Active transport</h3>
<p>Movement against the concentration gradient, using energy from respiration and carrier proteins in the membrane. Root hair cells absorb mineral ions from very dilute soil solution this way, and the ileum absorbs glucose against its gradient after diffusion has taken what it can.</p>

<h3>4. Proving osmosis in the lab</h3>
<p>Weigh potato cylinders, leave them in a series of sucrose concentrations for a fixed time, then reweigh. Gaining mass means water entered; losing mass means it left. Plot the change against concentration: the solution where mass does not change is isotonic to the potato. Visking tubing filled with starch and glucose in water shows the same: glucose diffuses out and is detected with Benedict's reagent, starch cannot leave.</p>

<h3>Exam focus</h3>
<p><strong>Q:</strong> A plant wilts on a hot day. Explain its cells' change in terms of water potential.</p>
<p><strong>A:</strong> More water evaporates than is absorbed, so cells lose water by osmosis to the surrounding tissue; the vacuoles shrink, turgor is lost and the leaves droop.</p>`,
  },
  {
    topic: "biological-molecules",
    title: "Biological Molecules",
    content: `<h2>Biological Molecules</h2>
<p><strong>Cambridge IGCSE 0610 (2023–2025):</strong> 4.1 carbohydrates; 4.2 fats (lipids); 4.3 proteins; 4.4 tests for food substances.</p>

<h3>1. The three large groups</h3>
<table border="1" cellpadding="6"><tr><th>Molecule</th><th>Made of</th><th>Function</th><th>Test</th></tr>
<tr><td>carbohydrate</td><td>C, H, O</td><td>energy, structure</td><td>starch: iodine</td></tr>
<tr><td>protein</td><td>C, H, O, N</td><td>growth and repair, enzymes</td><td>Biuret</td></tr>
<tr><td>lipid</td><td>C, H, O</td><td>energy store, insulation, membranes</td><td>ethanol emulsion</td></tr></table>
<p>Starch is a storage polysaccharide; glycogen stores energy in animals; cellulose builds plant cell walls from long unbranched chains. Proteins are chains of amino acids; lipids are glycerol with three fatty acids.</p>

<h3>2. The food tests</h3>
<ul>
<li><strong>Starch:</strong> add iodine solution — blue-black is positive.</li>
<li><strong>Reducing sugar:</strong> add Benedict's solution and heat in a water bath — green to brick-red indicates the amount.</li>
<li><strong>Protein:</strong> add Biuret reagent — lilac/purple is positive.</li>
<li><strong>Lipid:</strong> add ethanol then water — a cloudy white emulsion forms.</li>
<li><strong>Vitamin C:</strong> DCPIP solution is decolourised by vitamin C.</li>
</ul>

<h3>3. Water, vitamins and minerals</h3>
<p>Water is the solvent for all cell chemistry and a reactant in hydrolysis. Vitamin C prevents scurvy and is found in citrus; vitamin D is needed for calcium absorption and is made in skin in sunlight. Calcium strengthens bones and teeth; iron is needed for haemoglobin; fibre (cellulose) adds bulk so the gut muscles can push food along.</p>

<h3>Exam focus</h3>
<p><strong>Q:</strong> A student tests a food and obtains a lilac colour with Biuret reagent and a brick-red precipitate with Benedict's. What does this show?</p>
<p><strong>A:</strong> The food contains protein (lilac) and a reducing sugar such as glucose (brick-red), so it could be, for example, milk.</p>`,
  },
  {
    topic: "enzyme",
    title: "Enzymes",
    content: `<h2>Enzymes</h2>
<p><strong>Cambridge IGCSE 0610 (2023–2025):</strong> 5.1 enzyme action; 5.2 effects of temperature and pH.</p>

<h3>1. What an enzyme is</h3>
<p>Enzymes are proteins that act as biological catalysts: they speed up reactions and are not used up. Each has an active site with a shape complementary to its substrate — the lock-and-key model. The substrate binds, the reaction happens, and the products leave. Enzymes lower activation energy, so reactions proceed at body temperature.</p>

<h3>2. Temperature</h3>
<p>Rate rises with temperature because molecules move faster and collide more often, up to an optimum (about 37 °C in humans). Above the optimum the bonds holding the enzyme's shape break, the active site loses its shape irreversibly, and the enzyme is denatured — the rate falls sharply and does not recover on cooling.</p>

<h3>3. pH</h3>
<p>Each enzyme has an optimum pH. Pepsin works at pH 2 in the stomach; pancreatic enzymes work at about pH 8 in the small intestine; amylase in saliva at about pH 7. Extreme pH denatures the enzyme the same way heat does.</p>

<h3>4. Named enzymes and uses</h3>
<ul>
<li>Amylase: starch → maltose (saliva, pancreas).</li>
<li>Protease: protein → amino acids (stomach, pancreas).</li>
<li>Lipase: lipids → fatty acids and glycerol (pancreas).</li>
<li>Catalase: hydrogen peroxide → water and oxygen.</li>
</ul>
<p>Industrially, enzymes clarify fruit juice, tenderise meat, and in biological washing powders digest protein and fat stains at low temperature, which saves energy.</p>

<h3>Exam focus</h3>
<p><strong>Q:</strong> Explain why an enzyme stops working after being boiled, but works again if it is only chilled.</p>
<p><strong>A:</strong> Boiling breaks the bonds that hold the active site's shape, denaturing the enzyme permanently. Chilling slows molecular motion so the rate falls, but the shape is unchanged and activity returns on warming.</p>`,
  },
  {
    topic: "plant-nutrition",
    title: "Plant Nutrition",
    content: `<h2>Plant Nutrition</h2>
<p><strong>Cambridge IGCSE 0610 (2023–2025):</strong> 6.1 photosynthesis; 6.2 leaf structure; 6.3 mineral requirements.</p>

<h3>1. Photosynthesis</h3>
<p>6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂, catalysed by chlorophyll and driven by light energy. Carbon dioxide enters through stomata, water arrives in the xylem, and oxygen leaves. The glucose is used for respiration, converted to starch for storage, made into cellulose, or combined with nitrogen to form amino acids.</p>

<h3>2. Limiting factors</h3>
<p>Light intensity, carbon dioxide concentration and temperature each limit the rate when in short supply; raising any one of them increases the rate only until another becomes limiting. A graph of rate against light levels off for that reason. The standard experiment uses pondweed and counts oxygen bubbles, or measures the distance a bubble travels in a set time.</p>

<h3>3. Leaf structure and its reasons</h3>
<ul>
<li>Waxy cuticle — reduces water loss.</li>
<li>Upper epidermis — transparent, lets light through.</li>
<li>Palisade mesophyll — packed with chloroplasts for absorption.</li>
<li>Spongy mesophyll — air spaces for gas diffusion.</li>
<li>Veins — xylem brings water, phloem removes sugar.</li>
<li>Stomata and guard cells — controlled gas exchange; guard cells swell to open.</li>
</ul>

<h3>4. Mineral ions</h3>
<table border="1" cellpadding="6"><tr><th>Ion</th><th>Deficiency symptom</th></tr>
<tr><td>nitrate</td><td>stunted growth, yellowing leaves (needed for amino acids)</td></tr>
<tr><td>phosphate</td><td>poor root growth (respiration, DNA)</td></tr>
<tr><td>potassium</td><td>yellow leaves with dead spots (enzymes, stomata)</td></tr>
<tr><td>magnesium</td><td>yellow leaves between veins (chlorophyll)</td></tr></table>

<h3>Exam focus</h3>
<p><strong>Q:</strong> A plant is grown in distilled water with all minerals except magnesium. Predict the appearance and explain.</p>
<p><strong>A:</strong> The leaves turn yellow between the veins, because magnesium is needed to make chlorophyll; without chlorophyll the plant cannot photosynthesise.</p>`,
  },
  {
    topic: "human-nutrition",
    title: "Human Nutrition",
    content: `<h2>Human Nutrition</h2>
<p><strong>Cambridge IGCSE 0610 (2023–2025):</strong> 7.1 diet; 7.2 the alimentary canal; 7.3 physical and chemical digestion; 7.4 absorption; 7.5 assimilation.</p>

<h3>1. A balanced diet</h3>
<p>Carbohydrates for energy, proteins for growth and repair, lipids for energy and insulation, vitamins and minerals in small amounts, fibre for bulk, and water. Energy needs depend on age, sex and activity. Deficiency diseases: scurvy (vitamin C), rickets (vitamin D or calcium), anaemia (iron), marasmus and kwashiorkor (protein-energy malnutrition).</p>

<h3>2. The journey through the canal</h3>
<table border="1" cellpadding="6"><tr><th>Organ</th><th>What happens</th></tr>
<tr><td>mouth</td><td>chewing; amylase begins starch digestion; bolus formed</td></tr>
<tr><td>oesophagus</td><td>peristalsis pushes the bolus down</td></tr>
<tr><td>stomach</td><td>churning; pepsin digests protein at pH 2; acid kills bacteria</td></tr>
<tr><td>small intestine</td><td>pancreatic and intestinal enzymes complete digestion; absorption in the ileum</td></tr>
<tr><td>large intestine</td><td>water reabsorbed; faeces formed</td></tr>
<tr><td>rectum and anus</td><td>storage and egestion</td></tr></table>
<p>Bile from the liver is stored in the gall bladder; it emulsifies fats and neutralises stomach acid.</p>

<h3>3. Absorption</h3>
<p>The ileum is folded and covered in villi, each with a thin epithelium, a rich blood supply and a lacteal. These three features give a large surface area, a short diffusion distance and a steep gradient. Glucose and amino acids enter capillaries; fatty acids and glycerol enter lacteals.</p>

<h3>4. Teeth and decay</h3>
<p>Incisors cut, canines grip, premolars and molars crush. Enamel is the hardest layer and is not replaced. Bacteria on plaque ferment sugar into acid, which dissolves enamel and then dentine; fluoride, less sugar and regular brushing prevent decay.</p>

<h3>Exam focus</h3>
<p><strong>Q:</strong> Explain two ways the structure of a villus helps absorption.</p>
<p><strong>A:</strong> Its finger-like shape and large number provide a large surface area; its wall is one cell thick, so the diffusion distance into the blood is short.</p>`,
  },
  {
    topic: "transport-in-plants",
    title: "Transport in Plants",
    content: `<h2>Transport in Plants</h2>
<p><strong>Cambridge IGCSE 0610 (2023–2025):</strong> 8.1 transport in xylem; 8.2 transpiration; 8.3 translocation.</p>

<h3>1. Two tissues, two directions</h3>
<p>Xylem carries water and mineral ions from the roots upwards. Its vessels are dead, hollow cells with lignified walls, which stop them collapsing and give support. Phloem carries sugars and amino acids from sources (leaves) to sinks (roots, fruits, growing tips); its cells are living, with sieve plates and companion cells.</p>

<h3>2. Water uptake</h3>
<p>Root hair cells increase the surface area for osmosis; water moves in because the root hair cell has a lower water potential than the soil solution. Mineral ions are taken up by active transport against their gradient.</p>

<h3>3. Transpiration</h3>
<p>Transpiration is the loss of water vapour from leaves, mostly through stomata. It is faster when the air is warm, dry and moving, and when light is bright (stomata open for photosynthesis). The cohesion-tension theory explains the pull: evaporation from mesophyll cells creates tension, water molecules cohere in a continuous column, and water is drawn up the xylem.</p>
<p>Wilting is a protective response: the leaves droop, reducing surface area and light exposure, so less water is lost. A potometer measures water uptake as a proxy for transpiration.</p>

<h3>4. Translocation</h3>
<p>Sugars made in the leaves are loaded into phloem, raising solute concentration; water follows by osmosis and the pressure pushes sap towards sinks. This is why bark damage (which removes phloem) starves the roots.</p>

<h3>Exam focus</h3>
<p><strong>Q:</strong> Explain why a plant wilts on a hot, sunny day and why this helps.</p>
<p><strong>A:</strong> Transpiration exceeds uptake, so cells lose turgor and the leaves droop. Drooping reduces the exposed surface area and light interception, so less water is lost and the plant is more likely to survive.</p>`,
  },
  {
    topic: "transport-in-animals",
    title: "Transport in Animals",
    content: `<h2>Transport in Animals</h2>
<p><strong>Cambridge IGCSE 0610 (2023–2025):</strong> 9.1 transport systems; 9.2 the heart; 9.3 blood vessels; 9.4 blood.</p>

<h3>1. Why a transport system</h3>
<p>A large, active organism cannot rely on diffusion: the distance is too great and the demand too high. Blood carries oxygen, nutrients, hormones, antibodies and heat, and removes carbon dioxide and urea. Mammals have a double circulation: blood passes the heart twice per circuit, so the lungs receive low-pressure blood and the body receives high-pressure blood.</p>

<h3>2. The heart</h3>
<p>Right atrium → right ventricle → pulmonary artery → lungs → pulmonary vein → left atrium → left ventricle → aorta. The left ventricle wall is thickest because it pumps blood round the whole body. Valves prevent backflow: the tricuspid and bicuspid valves close when the ventricles contract, and the semilunar valves close when they relax.</p>

<h3>3. Blood vessels</h3>
<table border="1" cellpadding="6"><tr><th>Vessel</th><th>Wall</th><th>Lumen</th><th>Role</th></tr>
<tr><td>artery</td><td>thick, elastic, muscular</td><td>narrow</td><td>carries blood away, withstands pressure</td></tr>
<tr><td>vein</td><td>thinner</td><td>wide, with valves</td><td>returns blood at low pressure</td></tr>
<tr><td>capillary</td><td>one cell thick</td><td>very narrow</td><td>exchange with tissues</td></tr></table>

<h3>4. Blood and its parts</h3>
<p>Plasma carries dissolved substances; red cells carry oxygen as oxyhaemoglobin (no nucleus, biconcave, packed with haemoglobin); white cells defend against pathogens; platelets clot blood. Coronary heart disease is caused by fatty deposits narrowing the coronary arteries; risk factors include smoking, high saturated fat, obesity, inactivity and family history.</p>

<h3>Exam focus</h3>
<p><strong>Q:</strong> Explain why the wall of the left ventricle is thicker than that of the right.</p>
<p><strong>A:</strong> The left ventricle pumps blood at higher pressure around the whole body, whereas the right ventricle pumps only to the lungs, so it needs less muscle.</p>`,
  },
  {
    topic: "diseases-and-immunity",
    title: "Diseases and Immunity",
    content: `<h2>Diseases and Immunity</h2>
<p><strong>Cambridge IGCSE 0610 (2023–2025):</strong> 10.1 diseases and immunity; 10.2 the body's defence; 10.3 vaccination.</p>

<h3>1. Pathogens and transmission</h3>
<p>A pathogen is a disease-causing organism: bacteria (cholera, tuberculosis), viruses (influenza, HIV), fungi (athlete's foot), protoctists (malaria). Transmission is by droplets, contaminated food or water, direct contact, vectors and blood. Cholera spreads through contaminated water; malaria by the female Anopheles mosquito; HIV by unprotected sex, shared needles or contaminated blood.</p>

<h3>2. The body's defences</h3>
<p>First line: skin, mucus, cilia, stomach acid, tears. Second line: phagocytes engulf pathogens non-specifically; lymphocytes produce antibodies specific to an antigen, and memory cells give long-lasting immunity. A fever and inflammation are part of the response.</p>

<h3>3. Vaccination</h3>
<p>A vaccine contains dead or weakened pathogens or their antigens, so lymphocytes produce antibodies without illness. Memory cells mean a real infection is fought before symptoms develop. Herd immunity protects those who cannot be vaccinated. Antibiotics kill bacteria but not viruses, and overuse selects resistant strains such as MRSA.</p>

<h3>4. Reducing the spread</h3>
<p>Clean water and sanitation (cholera), mosquito nets and draining standing water (malaria), condoms and screened blood (HIV), covering the mouth and ventilation (droplets), and completing antibiotic courses.</p>

<h3>Exam focus</h3>
<p><strong>Q:</strong> Explain why a person who has had one vaccination may need a booster years later.</p>
<p><strong>A:</strong> Antibody levels and memory cells fall over time, so a booster re-exposes the immune system and raises antibody levels again before infection.</p>`,
  },
  {
    topic: "gas-exchange-in-humans",
    title: "Gas Exchange in Humans",
    content: `<h2>Gas Exchange in Humans</h2>
<p><strong>Cambridge IGCSE 0610 (2023–2025):</strong> 11.1 breathing; 11.2 the respiratory tract; 11.3 gas exchange; 11.4 smoking.</p>

<h3>1. The mechanics of breathing</h3>
<p>Inhaling: the diaphragm contracts and flattens, the external intercostal muscles lift the ribs up and out, the thorax volume increases and pressure falls, so air rushes in. Exhaling is largely passive: muscles relax, volume falls and pressure rises. The lungs contain no muscle; they follow the thorax.</p>

<h3>2. From trachea to alveoli</h3>
<p>Air passes the trachea, bronchi, bronchioles and alveoli. The trachea is kept open by C-shaped cartilage rings; the lining has cilia and mucus to trap dust and bacteria. Alveoli are the exchange surface and they are built for it: a huge total surface area, walls one cell thick, a moist lining, a dense capillary network and a short distance to blood.</p>

<h3>3. Gas exchange</h3>
<p>Oxygen diffuses from the alveolar air, where its concentration is higher, into blood, then into red cells. Carbon dioxide diffuses the other way and is exhaled. Breathing maintains the concentration gradients. Inhaled air is about 21% oxygen and 0.04% carbon dioxide; exhaled air is about 16% oxygen and 4% carbon dioxide, and is warmer and saturated with water vapour.</p>

<h3>4. Smoking</h3>
<p>Tar paralyses cilia and irritates the lining, causing a smoker's cough; nicotine is addictive and raises heart rate; carbon monoxide binds haemoglobin, reducing oxygen transport; carcinogens cause mutations and lung cancer; emphysema destroys alveolar walls, reducing surface area and causing breathlessness.</p>

<h3>Exam focus</h3>
<p><strong>Q:</strong> State two features of alveoli and explain how each helps gas exchange.</p>
<p><strong>A:</strong> Their walls are one cell thick, giving a short diffusion distance, and their millions of tiny sacs give a large surface area for diffusion.</p>`,
  },
  {
    topic: "respiration",
    title: "Respiration",
    content: `<h2>Respiration</h2>
<p><strong>Cambridge IGCSE 0610 (2023–2025):</strong> 12.1 respiration; 12.2 aerobic respiration; 12.3 anaerobic respiration.</p>

<h3>1. Respiration is not breathing</h3>
<p>Respiration is the chemical release of energy from food in every living cell. Breathing is the ventilation that supplies oxygen and removes carbon dioxide. Energy released by respiration powers muscle contraction, growth, active transport and maintaining body temperature.</p>

<h3>2. Aerobic respiration</h3>
<p>C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O, releasing about 38 ATP per glucose. It happens mainly in the mitochondria, which is why active cells (muscle, liver) have many of them. Glucose is the preferred substrate; fat and protein can also be respired.</p>

<h3>3. Anaerobic respiration</h3>
<p>Without oxygen, glucose is partly broken down. In human muscle: C₆H₁₂O₆ → 2C₃H₆O₃ (lactic acid), releasing about 2 ATP. Lactic acid builds up and causes fatigue; oxygen is later used to break it down, and the extra oxygen consumed is the oxygen debt. In yeast: C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂, the basis of brewing and bread-making.</p>

<h3>4. Demonstrating it</h3>
<p>Limewater turns milky with carbon dioxide (test with hydrogencarbonate indicator: yellow at high CO₂). Yeast in warm glucose solution with a layer of oil respires anaerobically; a thermometer shows heat, and the gas given off turns limewater milky. Germinating seeds show the same, and their temperature rise is measurable in a vacuum flask.</p>

<h3>Exam focus</h3>
<p><strong>Q:</strong> Explain the benefit of anaerobic respiration to a sprinter.</p>
<p><strong>A:</strong> It releases a small amount of ATP without oxygen, so muscles can keep contracting briefly after oxygen supply is exhausted, which sustains the sprint.</p>`,
  },
  {
    topic: "excretion-in-humans",
    title: "Excretion in Humans",
    content: `<h2>Excretion in Humans</h2>
<p><strong>Cambridge IGCSE 0610 (2023–2025):</strong> 13.1 excretion; 13.2 the kidney; 13.3 urine and dialysis.</p>

<h3>1. Excretion and egestion</h3>
<p>Excretion is removing metabolic waste made in cells: carbon dioxide from respiration and urea from the breakdown of excess amino acids in the liver. Egestion is removing undigested food. Sweat removes water, salts and urea; the lungs remove carbon dioxide and water vapour.</p>

<h3>2. The kidney</h3>
<p>Each kidney is supplied by a renal artery and drained by a renal vein and a ureter. Inside, the cortex contains the glomeruli and the medulla the collecting ducts. Nephrons do three things:</p>
<ul>
<li><strong>Ultrafiltration:</strong> pressure in the glomerulus forces water, glucose, urea and salts into the capsule; proteins and blood cells are too large.</li>
<li><strong>Selective reabsorption:</strong> glucose is reabsorbed entirely, most water and salts partly, in the proximal tubule.</li>
<li><strong>Urine forms</strong> from what is left and passes to the bladder via the ureter.</li>
</ul>

<h3>3. Dialysis</h3>
<p>A dialysis machine passes blood on one side of a partially permeable membrane and dialysate fluid on the other. Urea and excess salts diffuse out down their gradients; glucose and proteins keep the correct concentration and stay. It must be repeated several times a week because waste accumulates between sessions.</p>

<h3>4. Water balance</h3>
<p>ADH from the pituitary increases water reabsorption when blood water potential falls, so urine becomes more concentrated; it falls on a hot day or after salty food, and rises after drinking a lot.</p>

<h3>Exam focus</h3>
<p><strong>Q:</strong> Explain why glucose is not found in the urine of a healthy person.</p>
<p><strong>A:</strong> It is filtered at the glomerulus but then completely reabsorbed by active transport in the proximal tubule, so none remains in the urine.</p>`,
  },
  {
    topic: "coordination-and-response",
    title: "Coordination and Response",
    content: `<h2>Coordination and Response</h2>
<p><strong>Cambridge IGCSE 0610 (2023–2025):</strong> 14.1 nervous control; 14.2 the eye; 14.3 hormones; 14.4 homeostasis; 14.5 tropisms.</p>

<h3>1. The reflex arc</h3>
<p>Stimulus → receptor → sensory neurone → relay neurone in the spinal cord → motor neurone → effector → response. The relay neurone in the spinal cord allows a reflex without waiting for the brain, which is faster and protects the body. Impulses cross synapses with neurotransmitters.</p>

<h3>2. The eye</h3>
<p>Light passes the cornea and pupil to the lens, which focuses it on the retina; rods detect low light and cones colour. In bright light the iris muscles make the pupil smaller; in dim light it widens. To focus on a near object, the ciliary muscle contracts and the lens becomes fatter; for a distant object it relaxes and the lens thins.</p>

<h3>3. Hormones and homeostasis</h3>
<p>Hormones travel in blood and act more slowly than nerves. Insulin lowers blood glucose by converting it to glycogen in the liver; glucagon raises it. Adrenaline raises heart rate and breathing in emergencies. Thyroxine controls metabolic rate; ADH controls water reabsorption; oestrogen and testosterone control secondary sexual characteristics.</p>
<p>Homeostasis keeps temperature, glucose and water constant. Temperature control uses sweating, vasodilation and vasoconstriction, shivering and hairs standing up.</p>

<h3>4. Tropisms</h3>
<p>Phototropism: shoots grow towards light because auxin accumulates on the shaded side and stimulates elongation. Geotropism: roots grow downwards towards gravity, anchoring the plant and reaching water. These are examples of plant responses without a nervous system.</p>

<h3>Exam focus</h3>
<p><strong>Q:</strong> Explain why a reflex action is faster than a deliberate response.</p>
<p><strong>A:</strong> The reflex pathway passes through a relay neurone in the spinal cord and bypasses the brain, so there are fewer synapses and less processing before the effector responds.</p>`,
  },
  {
    topic: "drugs",
    title: "Drugs",
    content: `<h2>Drugs</h2>
<p><strong>Cambridge IGCSE 0610 (2023–2025):</strong> 15.1 medicinal drugs; 15.2 misuse of drugs; 15.3 the effects of alcohol and tobacco.</p>

<h3>1. Medicinal drugs</h3>
<p>Antibiotics kill bacteria by attacking their cell wall or protein synthesis; they do not work on viruses. Painkillers relieve symptoms without killing pathogens. Insulitis, asthma inhalers and insulin are examples of drugs that replace a missing function. Antibiotic resistance develops when courses are incomplete or antibiotics are used for viral infections, so resistant strains such as MRSA survive.</p>

<h3>2. Recreational drugs and their effects</h3>
<table border="1" cellpadding="6"><tr><th>Drug</th><th>Effect</th><th>Harm</th></tr>
<tr><td>alcohol</td><td>depressant</td><td>liver damage, impaired judgement, fetal harm</td></tr>
<tr><td>nicotine</td><td>stimulant</td><td>addiction, raised heart rate, and tar harms lungs</td></tr>
<tr><td>heroin</td><td>strong painkiller, depressant</td><td>addiction, overdose, infected needles</td></tr>
<tr><td>cannabis</td><td>altered perception</td><td>impaired memory, mental health risk</td></tr></table>

<h3>3. Alcohol and pregnancy</h3>
<p>Alcohol crosses the placenta; heavy drinking can cause fetal alcohol spectrum disorder, with learning and behavioural difficulties. Smoking in pregnancy reduces oxygen supply and raises the risk of low birth weight.</p>

<h3>4. Performance-enhancing drugs</h3>
<p>Anabolic steroids build muscle but damage the liver, raise blood pressure and upset hormone balance. Stimulants raise heart rate and risk cardiac problems. They are banned in sport because they are unsafe and give an unfair advantage.</p>

<h3>Exam focus</h3>
<p><strong>Q:</strong> Explain why antibiotics should not be prescribed for influenza.</p>
<p><strong>A:</strong> Influenza is caused by a virus, and antibiotics only act on bacteria; unnecessary use also selects resistant bacteria and wastes the drug.</p>`,
  },
  {
    topic: "reproduction",
    title: "Reproduction",
    content: `<h2>Reproduction</h2>
<p><strong>Cambridge IGCSE 0610 (2023–2025):</strong> 16.1 asexual and sexual reproduction; 16.2 sexual reproduction in plants; 16.3 sexual reproduction in humans; 16.4 sexually transmitted infections.</p>

<h3>1. Two strategies</h3>
<p>Asexual reproduction produces genetically identical offspring from one parent (runners in strawberry, tubers in potato, binary fission in bacteria); it is fast and needs no mate but reduces variation. Sexual reproduction fuses gametes, so offspring vary, which helps survival when conditions change.</p>

<h3>2. The flower</h3>
<p>Sepals protect the bud; petals attract pollinators; stamens (anther and filament) are male; the carpel (stigma, style, ovary) is female. Pollination is the transfer of pollen to the stigma, by insects or wind. Fertilisation is the fusion of the male nucleus with the egg in the ovule. The ovule becomes the seed and the ovary the fruit; dispersal is by wind, water, animals or explosion.</p>

<h3>3. Human reproduction</h3>
<p>Sperm are made in the testes and travel through the sperm duct; the egg is released from an ovary into the oviduct, where fertilisation occurs. The zygote divides into an embryo, implants in the uterus lining and is nourished by the placenta, which also removes waste. The menstrual cycle is about 28 days: menstruation, repair, ovulation around day 14, then the lining thickens.</p>

<h3>4. STIs</h3>
<p>HIV weakens the immune system; chlamydia and gonorrhoea damage the reproductive tract and can cause infertility; syphilis and HPV are also transmitted sexually. Condoms reduce transmission, and screening and treatment prevent complications.</p>

<h3>Exam focus</h3>
<p><strong>Q:</strong> Explain the difference between pollination and fertilisation in a flowering plant.</p>
<p><strong>A:</strong> Pollination is the transfer of pollen from anther to stigma, which may be by insect or wind; fertilisation is the fusion of the male gamete nucleus with the egg nucleus inside the ovule.</p>`,
  },
  {
    topic: "inheritance",
    title: "Inheritance",
    content: `<h2>Inheritance</h2>
<p><strong>Cambridge IGCSE 0610 (2023–2025):</strong> 17.1 chromosomes and genes; 17.2 monohybrid inheritance; 17.3 sex determination; 17.4 mutation.</p>

<h3>1. Where the information lives</h3>
<p>Chromosomes are DNA molecules; a gene is a length of DNA that codes for a protein. Humans have 46 chromosomes in 23 pairs, one of each pair from each parent. Alleles are alternative forms of a gene. Genotype is the allele combination; phenotype is the observable characteristic.</p>

<h3>2. Monohybrid crosses</h3>
<p>Use capital for dominant, lower case for recessive. A cross between two heterozygotes Tt × Tt gives 1 TT : 2 Tt : 1 tt, so 3 tall : 1 short. A test cross with a homozygous recessive identifies whether a tall individual is TT or Tt.</p>
<p><strong>Worked example.</strong> Both parents have brown eyes (Bb) but carry a blue allele. Offspring: 25% BB, 50% Bb, 25% bb, so the chance of blue eyes is 1 in 4.</p>

<h3>3. Sex determination</h3>
<p>Females are XX and males XY, so the father determines the sex: eggs are all X, sperm are half X and half Y. A cross gives a 1:1 ratio of girls to boys.</p>

<h3>4. Mutation</h3>
<p>A mutation is a change in the base sequence of DNA. Most are harmful or neutral; some are beneficial. Mutagens include radiation and some chemicals. Sickle-cell anaemia and cystic fibrosis are caused by gene mutations; Down syndrome results from an extra chromosome 21.</p>

<h3>Exam focus</h3>
<p><strong>Q:</strong> Two heterozygous tall pea plants (Tt) are crossed. State the expected ratio of phenotypes.</p>
<p><strong>A:</strong> 3 tall : 1 short, because the Punnett square gives TT, Tt, Tt and tt, and the first three are tall.</p>`,
  },
  {
    topic: "variation-and-selection",
    title: "Variation and Selection",
    content: `<h2>Variation and Selection</h2>
<p><strong>Cambridge IGCSE 0610 (2023–2025):</strong> 18.1 variation; 18.2 adaptive features; 18.3 selection.</p>

<h3>1. Types of variation</h3>
<p>Continuous variation gives a range of values (height, mass) and is usually affected by many genes plus the environment. Discontinuous variation puts individuals into distinct groups (blood group, tongue rolling) and is usually controlled by one or a few genes. Plotting continuous data gives a normal curve; discontinuous data gives separate bars.</p>

<h3>2. Causes</h3>
<p>Variation comes from genes (meiosis creates new combinations of alleles; mutation makes new alleles) and from the environment (diet, exercise, light). Identical twins show how much of a characteristic is environmental.</p>

<h3>3. Natural selection</h3>
<p>Organisms produce more offspring than survive; there is variation; some variants are better adapted; those individuals survive and reproduce, passing their alleles on; the frequency of the advantageous allele rises. This is why bacteria become resistant to antibiotics and why insects become resistant to pesticides.</p>
<p>Adaptive features can be structural (long roots), behavioural (migration) or physiological (water conservation).</p>

<h3>4. Artificial selection</h3>
<p>Humans choose individuals with desirable features to breed. It has produced high-yield crops, dairy cattle and breeds of dog. It reduces genetic diversity and can spread inherited defects, because the population is narrowed deliberately.</p>

<h3>Exam focus</h3>
<p><strong>Q:</strong> Explain how a population of bacteria can become resistant to an antibiotic.</p>
<p><strong>A:</strong> A random mutation gives some bacteria resistance; the antibiotic kills the non-resistant ones; the resistant bacteria survive, reproduce and pass on the resistance allele, so the proportion resistant rises.</p>`,
  },
  {
    topic: "organisms-and-their-environment",
    title: "Organisms and their Environment",
    content: `<h2>Organisms and their Environment</h2>
<p><strong>Cambridge IGCSE 0610 (2023–2025):</strong> 19.1 energy flow; 19.2 food chains and webs; 19.3 cycles; 19.4 populations.</p>

<h3>1. Energy through an ecosystem</h3>
<p>The Sun is the source. Producers (plants) convert light to chemical energy; consumers eat them; decomposers break down dead matter and return nutrients to the soil. Only about 10% of energy passes to the next trophic level, because most is lost as heat, in movement, and in uneaten or undigested parts. That is why food chains are short and why pyramids of numbers or biomass narrow upwards.</p>

<h3>2. Food chains and webs</h3>
<p>A food chain starts with a producer and ends with a top predator; the arrows show the direction of energy flow. A food web joins chains, so removing one species affects many. Interdependence means a change in one population alters others — a fall in aphids reduces ladybirds.</p>

<h3>3. Cycles</h3>
<p>Carbon cycle: photosynthesis removes CO₂; respiration, combustion and decomposition return it. Nitrogen cycle: nitrogen fixation by bacteria in root nodules and in the soil converts N₂ to nitrates; nitrification converts ammonium compounds to nitrates; denitrification returns N₂; decomposers release ammonium compounds.</p>

<h3>4. Populations and sampling</h3>
<p>A population is all the individuals of one species in an area; a community is all the populations. Quadrats estimate plant abundance (place randomly, count, multiply by area ratio); sweep nets and pitfall traps sample animals. Random sampling avoids bias; the mean of several quadrats is more reliable than one.</p>

<h3>Exam focus</h3>
<p><strong>Q:</strong> Explain why only about 10% of energy passes to the next trophic level.</p>
<p><strong>A:</strong> Energy is lost as heat from respiration, used in movement, and lost in uneaten and undigested material, so little remains to be stored as biomass.</p>`,
  },
  {
    topic: "human-influences-on-ecosystems",
    title: "Human Influences on Ecosystems",
    content: `<h2>Human Influences on Ecosystems</h2>
<p><strong>Cambridge IGCSE 0610 (2023–2025):</strong> 20.1 food supply; 20.2 habitat destruction; 20.3 pollution; 20.4 conservation.</p>

<h3>1. Feeding a growing population</h3>
<p>Intensive farming raises yield with fertilisers, pesticides, irrigation and monoculture, but can pollute water, reduce soil quality and lower biodiversity. Organic farming uses manure and biological control instead. Genetically modified crops can resist pests or drought, with the risk of genes spreading to wild relatives.</p>

<h3>2. Habitat destruction</h3>
<p>Deforestation removes habitats, causes soil erosion and increases atmospheric CO₂; draining wetlands and building on land do the same. Biodiversity falls and species may become extinct. Tropical rainforests matter globally because they store carbon and hold most terrestrial species.</p>

<h3>3. Pollution</h3>
<ul>
<li>Water: sewage and fertiliser cause eutrophication — algae bloom, die, decompose, and oxygen is used up so fish die.</li>
<li>Air: sulfur dioxide from fossil fuels causes acid rain; CO₂ and methane enhance the greenhouse effect; CFCs damaged the ozone layer.</li>
<li>Land: non-biodegradable plastics and toxic waste persist and enter food chains.</li>
</ul>

<h3>4. Conservation</h3>
<p>Conservation protects habitats and species: national parks, seed banks, captive breeding, fishing quotas and reforestation. Sustainable use means taking resources at a rate the ecosystem can replace. Education and legislation are as important as biology, because most causes are economic.</p>

<h3>Exam focus</h3>
<p><strong>Q:</strong> Describe how fertiliser washing into a lake can kill fish.</p>
<p><strong>A:</strong> Nitrates cause algae to grow rapidly; they die and are decomposed by bacteria that use up dissolved oxygen, so fish cannot respire and suffocate.</p>`,
  },
  {
    topic: "biotechnology-and-genetic-modification",
    title: "Biotechnology and Genetic Modification",
    content: `<h2>Biotechnology and Genetic Modification</h2>
<p><strong>Cambridge IGCSE 0610 (2023–2025):</strong> 21.1 biotechnology; 21.2 genetic modification; 21.3 industrial uses.</p>

<h3>1. Using microorganisms</h3>
<p>Yeast ferments glucose to ethanol and carbon dioxide: brewing, bread-making and biofuel. Bacteria make yoghurt and cheese from milk. Penicillium mould produces penicillin. The conditions are controlled: temperature, pH, oxygen and sterile equipment, because contamination ruins a batch.</p>

<h3>2. Industrial fermentation</h3>
<p>A fermenter provides a controlled environment with a stirrer, a water jacket for cooling, air supply and a pH monitor. Fermentation releases heat, so cooling is essential. Biogas from anaerobic digestion of waste is mainly methane and is used for cooking and electricity.</p>

<h3>3. Genetic modification</h3>
<p>A gene from one organism is cut out with an enzyme, inserted into a plasmid vector, and taken up by a host cell. Bacteria carrying the human insulin gene make insulin in bulk; GM crops carry genes for pest resistance or vitamin A. The steps are cut, insert, transform, select, culture.</p>

<h3>4. Benefits and concerns</h3>
<p>Benefits: medicine produced cheaply and safely, higher yields, less pesticide. Concerns: genes spreading to wild plants, effects on non-target insects, cost to small farmers, and ethical objections. Regulation exists because the risks are uncertain, not because the science is unsound.</p>

<h3>Exam focus</h3>
<p><strong>Q:</strong> State two advantages of producing human insulin using genetically modified bacteria.</p>
<p><strong>A:</strong> It can be produced in large quantities, and it is human insulin rather than animal insulin, so it is less likely to cause an immune reaction.</p>`,
  },
];
