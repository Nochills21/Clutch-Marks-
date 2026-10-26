// IGCSE Biology — depth pass, tranche C: diseases and immunity, transport in
// animals, organisation of the organism.
const F = require("./note-figures.cjs");
const { C, text, frame, plot } = F;

/* ── Figure: primary and secondary antibody response ─────────────────── */
const immuneCurve = (() => {
  const primary = [];
  const secondary = [];
  for (let d = 0; d <= 42; d += 0.5) {
    // A first exposure produces a small, slow peak; the second a fast, large one.
    const p = d < 7 ? 0.02 : Math.exp(-((d - 16) ** 2) / 34) * 0.9;
    const s = d < 21 ? 0 : Math.exp(-((d - 26) ** 2) / 20) * 2.6;
    primary.push([d, +p.toFixed(3)]);
    secondary.push([d, +(d < 21 ? p : Math.max(p * Math.exp(-(d - 21) / 9), s)).toFixed(3)]);
  }
  return plot({
    id: "imm-response",
    title: "Antibody concentration after a first and a second exposure to the same antigen",
    label: "Figure 1.",
    caption:
      "The first exposure takes about a week to produce a small peak. Memory cells left behind make the second response faster (peak within days), larger and longer, which is why a booster or a natural second infection often causes no illness at all.",
    w: 580,
    h: 330,
    x: { min: 0, max: 42, ticks: [0, 7, 14, 21, 28, 35, 42], label: "time after first exposure (days)" },
    y: { min: 0, max: 3, ticks: [0, 1, 2, 3], label: "antibody concentration (arbitrary units)" },
    series: [
      { points: primary, color: C.muted, width: 2.2, smooth: true },
      { points: secondary, color: C.goldDeep, width: 2.8, smooth: true },
    ],
    hidden: [{ x: 21, color: C.gold }],
    annotations: [
      { x: 16, y: 0.95, text: "primary response", dx: 6, dy: -8, color: C.muted, size: 12 },
      { x: 26, y: 2.62, text: "secondary response", dx: 6, dy: -6, color: C.goldDeep, size: 12 },
      { x: 21, y: 2.05, text: "second exposure", dx: 6, dy: 0, color: C.gold, size: 11.5 },
    ],
  });
})();

/* ── Figure: oxygen dissociation curve and the Bohr shift ────────────── */
const dissociation = (() => {
  const curve = (p50) => {
    const pts = [];
    for (let p = 0; p <= 14; p += 0.25) {
      const sat = 100 / (1 + Math.pow(p50 / Math.max(p, 0.001), 2.6));
      pts.push([+p.toFixed(2), +sat.toFixed(1)]);
    }
    return pts;
  };
  return plot({
    id: "ta-dissociation",
    title: "Oxygen dissociation curve of haemoglobin, and its shift to the right at high carbon dioxide",
    label: "Figure 1.",
    caption:
      "The S-shape means haemoglobin loads oxygen eagerly in the lungs and releases it steeply in the tissues. The dashed curve is the same blood at higher carbon dioxide and lower pH: the curve shifts right, so oxygen is released at a higher partial pressure — exactly where respiring muscle needs it.",
    w: 580,
    h: 330,
    x: { min: 0, max: 14, ticks: [0, 2, 4, 6, 8, 10, 12, 14], label: "partial pressure of oxygen (kPa)" },
    y: { min: 0, max: 105, ticks: [0, 25, 50, 75, 100], label: "haemoglobin saturation (%)" },
    series: [
      { points: curve(3.5), color: C.gold, width: 2.8, smooth: true },
      { points: curve(5.4), color: C.muted, width: 2.2, smooth: true, kind: "dashed" },
    ],
    annotations: [
      { x: 9.2, y: 92, text: "lungs: 98 % saturated", dx: 4, dy: 0, color: C.gold, size: 12 },
      { x: 2.4, y: 28, text: "tissues: steep release", dx: 4, dy: 6, color: C.ink, size: 12 },
      { x: 7.4, y: 44, text: "shifted right by CO₂", dx: 4, dy: 0, color: C.muted, size: 11.5 },
    ],
  });
})();

/* ── Figure: cell sizes to scale ─────────────────────────────────────── */
const cellScale = (() => {
  const parts = [];
  // 1 µm = 4 px, so the drawings are honestly to scale.
  const um = 4;
  const y = 150;
  // Bacterium: a rod 2 µm long, 0.8 µm wide.
  parts.push(
    `<rect x="60" y="${y - 0.4 * um}" width="${2 * um}" height="${0.8 * um}" rx="${0.4 * um}" fill="${C.goldFill}" stroke="${C.gold}" stroke-width="1.4"/>`,
    text(60 + um, y - 14, "bacterium 2 µm", { anchor: "middle", size: 11.5 }),
  );
  // Animal cell: 20 µm across.
  parts.push(
    `<circle cx="${60 + 2 * um + 140}" cy="${y}" r="${10 * um}" fill="${C.goldFillSoft}" stroke="${C.gold}" stroke-width="1.4"/>`,
    `<circle cx="${60 + 2 * um + 140}" cy="${y}" r="${2.6 * um}" fill="none" stroke="${C.muted}" stroke-width="1.2" stroke-dasharray="4 4"/>`,
    text(60 + 2 * um + 140, y + 4, "nucleus", { anchor: "middle", size: 10.5 }),
    text(60 + 2 * um + 140, y + 10 * um + 16, "animal cell 20 µm", { anchor: "middle", size: 11.5 }),
  );
  // Plant cell: 100 µm wide, drawn as a box (it has a wall).
  parts.push(
    `<rect x="300" y="${y - 22}" width="${40 * um}" height="${11 * um}" rx="3" fill="${C.goldFillSoft}" stroke="${C.gold}" stroke-width="1.8"/>`,
    text(300 + 20 * um, y - 32, "plant cell 100 µm", { anchor: "middle", size: 11.5 }),
  );
  // Scale bar: 20 µm.
  parts.push(
    `<line x1="300" y1="300" x2="${300 + 20 * um}" y2="300" stroke="${C.ink}" stroke-width="2"/>`,
    `<line x1="300" y1="294" x2="300" y2="306" stroke="${C.ink}" stroke-width="2"/>`,
    `<line x1="${300 + 20 * um}" y1="294" x2="${300 + 20 * um}" y2="306" stroke="${C.ink}" stroke-width="2"/>`,
    text(300 + 10 * um, 322, "20 µm", { anchor: "middle", size: 11.5, fill: C.ink }),
  );
  return frame({
    id: "org-cell-scale",
    title: "A bacterium, an animal cell and a plant cell drawn to the same scale, with a 20 micrometre bar",
    label: "Figure 1.",
    caption:
      "Drawing cells to a common scale is the quickest way to remember the orders of magnitude: a bacterium is a few micrometres long, an animal cell about twenty, and a plant cell about a hundred. It also shows why a light microscope (resolution about 0.2 µm) can see the nucleus but not a ribosome, which is twenty nanometres across.",
    w: 620,
    h: 340,
    body: parts.join("\n"),
  });
})();

const diseases = `<h2>Diseases and Immunity: the mechanism, cell by cell</h2>
<p>An answer that names a defence without saying what it does is worth half a mark. This section follows a pathogen from the moment it enters the body to the moment it is cleared, and names the cell or the molecule responsible at every step. That is the level of detail a four- or five-mark question rewards, and it is also the level at which the topic finally makes sense as a story rather than a list.</p>

<h3>The four groups of pathogen, and how each does harm</h3>
<table>
<tr><th>Group</th><th>Structure</th><th>Examples</th><th>How it damages the host</th></tr>
<tr><td>Bacteria</td><td>Prokaryote: cell wall, no nucleus, 1–5 µm</td><td>Cholera (Vibrio cholerae), tuberculosis (Mycobacterium tuberculosis), typhoid</td><td>Multiply in tissue and destroy cells; release toxins that alter cell function, as cholera toxin does to the gut lining</td></tr>
<tr><td>Viruses</td><td>Nucleic acid in a protein coat; no cell structure; 20–300 nm</td><td>Influenza, measles, HIV, coronavirus</td><td>Enter a host cell, use its machinery to replicate, then burst it — the host cell is destroyed</td></tr>
<tr><td>Fungi</td><td>Eukaryote with chitin walls; hyphae</td><td>Athlete's foot, ringworm</td><td>Grow on and into the skin, digesting keratin and provoking inflammation</td></tr>
<tr><td>Protoctists</td><td>Single-celled eukaryote</td><td>Plasmodium (malaria), Amoeba</td><td>Reproduce inside host cells (Plasmodium in red blood cells) and destroy them</td></tr>
</table>
<p>Two consequences follow. First, the type of pathogen decides the treatment: antibiotics act on bacterial structures and have no target in a virus, so they cannot cure influenza or the common cold. Second, the type decides which defence is relevant: a virus hidden inside a host cell cannot be reached by an antibody until it is displayed on the cell surface, which is why the cell-mediated arm of the immune system exists at all.</p>

<h3>The barriers, in the order a pathogen meets them</h3>
<p>The skin is the first barrier and is more than a wrapping: its outer layer is dead, dry and keratinised, which denies most pathogens the moisture they need; sebum from sebaceous glands lowers the pH; and intact skin is physically continuous. A cut breaches all three at once, which is why a wound is an infection risk and why clotting matters as a defence, not only as a repair.</p>
<p>Where skin is absent, other barriers take over. The airways are lined with ciliated epithelium and mucus-secreting goblet cells: mucus traps particles and microbes, and the cilia beat it upward to the throat to be swallowed, an escalator that never stops. The stomach's hydrochloric acid kills most swallowed organisms, which is why contaminated food is more dangerous when it bypasses the stomach or when the dose is large. Tears and saliva contain lysozyme, an enzyme that breaks down bacterial cell walls. The vagina has an acidic secretion, and the nose is lined with hairs and mucus. Each is a chemical or physical barrier, and each can be named in a mark scheme.</p>
<p>Inflammation is the local response when a barrier is breached. Damaged cells release histamine, which dilates nearby arterioles and makes capillary walls more permeable. More blood flows to the area, so it becomes red and warm; fluid leaks into the tissue, so it swells and the pressure on nerve endings makes it painful. The warmth also slows some pathogens and speeds the phagocytes arriving. This is why a wound is hot and swollen, and why anti-inflammatory drugs reduce those signs rather than fighting the infection directly.</p>

<h3>Phagocytosis: four steps, not one word</h3>
<ol>
<li><strong>Attraction.</strong> Phagocytes such as neutrophils and macrophages are drawn to the site by chemicals released by pathogens and damaged cells.</li>
<li><strong>Attachment.</strong> The phagocyte's membrane binds to surface molecules on the pathogen. Antibodies attached to the pathogen make this far more effective, because the phagocyte also has receptors for the antibody's constant region.</li>
<li><strong>Engulfment.</strong> The membrane extends around the pathogen and fuses, enclosing it in a vesicle — a phagosome — inside the cytoplasm.</li>
<li><strong>Digestion.</strong> Lysosomes fuse with the phagosome and release hydrolytic enzymes that break the pathogen down. The soluble products are absorbed, and the antigens may be displayed on the phagocyte's surface, which is how the specific response is started.</li>
</ol>
<p>This is non-specific: the same process attacks any bacterium, without recognising which one it is. That is its strength, because it begins within minutes, and its limitation, because it cannot remember.</p>

<h3>Lymphocytes: the specific arm</h3>
<p>A lymphocyte carries receptors that fit one antigen shape. When that antigen — displayed by a phagocyte or on a pathogen's surface — binds to the receptor, the lymphocyte is selected and divides, producing a clone of identical cells. B lymphocytes become plasma cells, which secrete antibodies into the blood and tissue fluid; the antibody has the same binding site as the original receptor, so it fits the antigen. T lymphocytes include helper cells, which activate B cells and other T cells by releasing signalling molecules, and killer (cytotoxic) cells, which recognise infected body cells and destroy them before the pathogen can replicate further.</p>
<p>The antibody itself does not kill. It binds, and binding has consequences: antibodies clump pathogens together (agglutination) so that phagocytes can engulf many at once; they neutralise toxins by covering the active site; they block the pathogen's attachment to host cells; and they mark it for phagocytosis. An answer that says "antibodies destroy the pathogen" is incomplete, and an answer that says "antibodies stick to the antigen so the phagocyte can engulf it" gets the mark.</p>
<p>Specificity comes from shape. The antigen has a particular three-dimensional shape and the antibody's binding site is complementary to it, the same lock-and-key logic as an enzyme and its substrate. This is why an antibody against measles does nothing about mumps, and why immunity is specific.</p>

<h3>Memory cells, and why the second response is different</h3>
<p>Some of the cloned lymphocytes do not become effector cells. They remain as memory cells, with the same receptor, circulating for years. On a second exposure the antigen meets a lymphocyte that is already present in large numbers and already has the right receptor, so the response begins at once: antibodies appear within two or three days, reach a much higher concentration, and last much longer (Figure 1). Often the pathogen is cleared before symptoms develop, which is why a second attack of measles is rare and why immunity after infection is usually lifelong for that pathogen.</p>
<p>This is also the mechanism a vaccine exploits. A vaccine presents antigens — as killed organisms, weakened organisms, inactivated toxins or just a surface protein — without causing the disease. The primary response happens, memory cells are made, and a later real infection meets a prepared immune system. A booster dose simply repeats the exposure and raises the memory population further.</p>

<h3>The four kinds of immunity, in a table that settles most questions</h3>
<table>
<tr><th>Type</th><th>How it arises</th><th>Example</th><th>How long it lasts</th></tr>
<tr><td>Natural active</td><td>Antibodies made after a real infection</td><td>Measles infection in childhood</td><td>Years, often lifelong</td></tr>
<tr><td>Artificial active</td><td>Antibodies made after vaccination</td><td>MMR, tetanus booster</td><td>Years; boosters maintain it</td></tr>
<tr><td>Natural passive</td><td>Antibodies received from the mother across the placenta or in milk</td><td>Breast-fed baby's resistance to gut infections</td><td>Weeks to months: no memory cells</td></tr>
<tr><td>Artificial passive</td><td>Antibodies injected as a serum</td><td>Antivenom after a snake bite; rabies immunoglobulin</td><td>Weeks: no memory cells, and the recipient's body does not produce them</td></tr>
</table>
<p>The distinction that decides the marks is <em>active</em> versus <em>passive</em>: active means the recipient's own lymphocytes produced the antibodies, so memory cells exist and protection lasts; passive means antibodies were supplied from outside, so protection is immediate but temporary. A baby fed on formula rather than breast milk has no passive antibody supply, which is one of the real advantages of breast-feeding — and it is a clear application of the distinction rather than a slogan.</p>

<h3>Herd immunity, stated precisely</h3>
<p>If enough of a population is immune, a pathogen cannot find enough susceptible hosts to keep a chain of transmission going, so even unvaccinated people — newborns, people with compromised immunity, those who cannot be vaccinated — are protected. The proportion needed depends on how contagious the pathogen is: measles is so infectious that roughly 95 % coverage is required, while a less transmissible pathogen needs less. This is why a fall in vaccination rates can produce outbreaks among people who were never vaccinated, and why the argument "I am safe because everyone around me is vaccinated" fails as soon as enough people make it.</p>

<h3>HIV: a pathogen that attacks the defence itself</h3>
<p>HIV is a virus that infects helper T lymphocytes. It inserts its RNA, reverse-transcribes it into DNA, and integrates that DNA into the host cell's genome, so the cell is reprogrammed to make more virus. The infected helper T cells are eventually destroyed. Because helper T cells are the coordinators of the specific response, their loss disables both the antibody arm and the killer-cell arm. The person may remain well for years, but as the helper T cell count falls, opportunistic infections — infections a healthy immune system would shrug off — become lethal. That stage is AIDS. The reason a vaccine is so difficult is the virus's high mutation rate: its surface proteins change faster than a vaccine can be updated, the same antigenic variation that makes influenza require a new vaccine most years.</p>

<h3>Antibiotics: why they work on bacteria and nothing else</h3>
<p>Antibiotics target structures bacteria have and human cells do not: the bacterial cell wall, the bacterial ribosome, or enzymes unique to bacterial DNA replication. Penicillin, for instance, prevents the cross-linking of peptidoglycan, so a growing bacterium bursts under its own osmotic pressure. Human cells have no cell wall, so the drug has no target. A virus has no cell wall, no ribosome of its own and no metabolism to disrupt, so an antibiotic is simply irrelevant to it — which is why prescribing one for a cold does nothing except select resistant bacteria in the patient's body.</p>
<p>Resistance arises by the mechanism described in the Variation and Selection note: a random mutation, present before the antibiotic, that lets a cell survive; selection by the drug; reproduction of survivors; a rise in allele frequency. The practical consequences — finish the course, do not use antibiotics for viral illness, expect problems in hospitals — follow from the mechanism rather than needing to be memorised separately.</p>`;

const transportAnimals = `<h2>Transport in Animals: pressure, valves and the plumbing that fails</h2>
<p>The heart is usually learned as a sequence of chamber names, which is enough to label a diagram and not enough to explain anything. This section works from pressures: blood moves because pressure falls along every vessel, valves exist because pressure reverses at particular moments, and most cardiovascular disease is a failure of one of those two facts. Learn the pressures and the anatomy becomes a consequence.</p>

<h3>The pressure profile, and what it explains</h3>
<p>The left ventricle generates the highest pressure in the circulation, roughly 16 kPa (120 mmHg) at the peak of systole, because it must push blood around the whole body. The right ventricle generates only about 3 kPa (25 mmHg), because the lungs are close and their vessels are short and wide. That fivefold difference is why the muscular wall of the left ventricle is several times thicker than the right — a structural fact that follows from the pressure, not the other way round.</p>
<p>Pressure falls continuously along the arterial tree: from about 16 kPa in the aorta at systole to roughly 10.7 kPa (80 mmHg) at diastole, to perhaps 4.7 kPa (35 mmHg) at the start of a capillary, and to nearly zero in the venules. Blood therefore flows down a gradient, and the steepest fall is across the arterioles, which is where resistance is controlled. Two consequences are examinable. Arteries need thick, elastic, muscular walls because they must withstand and smooth a high pulsatile pressure; veins need only thin walls with valves, because the pressure inside them is low and the flow would otherwise stall or reverse.</p>
<p>The elasticity of the aorta is not decoration. When the ventricle contracts, the aorta stretches and stores energy; when the ventricle relaxes, the recoil keeps the pressure up and continues to push blood forward. That is why flow in the arteries is continuous rather than starting and stopping with each beat, and why a stiffened aorta in old age raises systolic pressure.</p>

<h3>The cardiac cycle, with the valve events that cause the sounds</h3>
<p>One cycle has two phases. During <strong>atrial systole</strong> the atria contract and top up the ventricles; the atrioventricular valves are open and the semilunar valves closed. During <strong>ventricular systole</strong> the ventricles contract; the pressure inside them rises above the pressure in the atria, which slams the atrioventricular valves shut, and then above the pressure in the aorta and pulmonary artery, which forces the semilunar valves open and ejects blood. During <strong>diastole</strong> the ventricles relax; pressure inside falls below that in the arteries, the semilunar valves close, and when it falls below atrial pressure the atrioventricular valves open and the ventricles refill.</p>
<p>Valves are passive: they do not actively open or close, they are pushed. That is why the first heart sound corresponds to the atrioventricular valves closing at the start of ventricular systole, and the second to the semilunar valves closing at the start of diastole. It also explains why a leaky valve produces a murmur — blood flows backwards through a valve that should be shut — and why a narrowed valve forces the heart to work harder to push blood through a smaller opening.</p>
<p>The rhythm is set by the sinoatrial node in the wall of the right atrium, which depolarises spontaneously and is therefore the pacemaker. The impulse spreads across the atria, causing them to contract, and reaches the atrioventricular node, which delays it by a fraction of a second before passing it down the septum and out through the ventricle walls from the apex upward. The delay is functional: it lets the atria finish emptying before the ventricles contract, so the ventricles are filled rather than fighting a contracting atrium. The apex-first spread squeezes blood towards the outlets, which is more efficient than squeezing from the top down.</p>

<h3>How oxygen actually leaves the blood</h3>
<p>Haemoglobin does not release oxygen steadily; it releases it in a way that suits the tissue it is passing through. The oxygen dissociation curve is S-shaped (Figure 1). At the high partial pressure in the lungs, haemoglobin is about 98 % saturated, so it loads oxygen readily. In the tissues, where partial pressure is low, the curve is steep: a small fall in partial pressure releases a large amount of oxygen. The shape arises because binding the first oxygen molecule changes the shape of the haemoglobin molecule and makes the next one easier to bind — cooperative binding — so the curve starts flat, rises steeply, and flattens again as the sites fill.</p>
<p>The curve shifts right when carbon dioxide is high, pH is low or temperature is raised — all conditions in a respiring muscle. A shift right means that at any given partial pressure haemoglobin holds less oxygen, so it unloads more readily exactly where respiration is fastest. This is the Bohr shift, and it is the reason exercise delivers more oxygen to muscle than the increased blood flow alone would explain.</p>
<p>Two comparisons are worth having ready. Fetal haemoglobin has a higher affinity for oxygen than adult haemoglobin, so it can take oxygen from the mother's blood across the placenta even though the maternal blood is already partly deoxygenated. Myoglobin, found in muscle, has a much higher affinity still and holds oxygen as a store, releasing it only when the partial pressure falls very low — which is why muscle can keep respiring briefly when blood flow is interrupted.</p>

<h3>Tissue fluid, lymph and oedema</h3>
<p>At the arteriole end of a capillary, the hydrostatic pressure of the blood is higher than the pressure of the tissue fluid outside, so water and dissolved solutes are forced out through the capillary wall. At the venule end, hydrostatic pressure has fallen, but the plasma proteins remaining inside the capillary exert an osmotic pull that draws most of the fluid back in. The small surplus, together with any protein that escaped and any pathogens and cell debris, is collected by lymph capillaries, which are blind-ended vessels with valves, and returned to the blood through the thoracic duct. Lymph is moved by the squeezing of surrounding muscles and by breathing movements, because it has no pump of its own.</p>
<p>This explains oedema, the swelling of tissue with fluid. It occurs if capillary hydrostatic pressure is too high (heart failure backing up blood), if plasma protein is too low (severe malnutrition or liver disease, so the osmotic pull is weak), or if lymph vessels are blocked (as in some parasitic infections). It also explains why a bruise swells: damage raises permeability, so more fluid leaves the capillary.</p>

<h3>Coronary heart disease, as a sequence rather than a label</h3>
<p>The coronary arteries supply the heart muscle itself, and they are narrow, so they are the first place atherosclerosis causes trouble. The sequence is: damage to the endothelium (from high blood pressure, smoking, high LDL cholesterol); an inflammatory response and the deposition of fatty material and cholesterol in the wall, forming a plaque; the artery narrows, so the muscle downstream receives less oxygen, which produces chest pain on exertion (angina); if the plaque ruptures, a clot forms on it and may block the artery completely, so the muscle beyond it is starved of oxygen and dies — a myocardial infarction, or heart attack.</p>
<p>The risk factors map onto that sequence and each has a mechanism: smoking damages the endothelium and carbon monoxide reduces oxygen carriage; high blood pressure damages the endothelium mechanically; a diet high in saturated fat raises LDL cholesterol, which is the material deposited; diabetes raises blood glucose, which damages vessels; obesity and inactivity worsen blood pressure and cholesterol; and a family history indicates inherited risk that no behaviour can remove. Treatments follow the same logic — statins reduce cholesterol synthesis, stents hold the artery open, bypass surgery routes blood around a blockage, and anticoagulants reduce clot formation.</p>

<h3>Why blood can carry carbon dioxide in three forms</h3>
<p>Carbon dioxide is far more soluble than oxygen, so some simply dissolves in the plasma. Some binds to the globin part of haemoglobin, forming carbaminohaemoglobin, which is a different site from the oxygen-binding haem groups, so the two gases do not compete directly. Most, however, is converted inside red blood cells to hydrogencarbonate by the enzyme carbonic anhydrase, and then exchanged into the plasma in return for chloride ions to keep the charge balanced. At the lungs the reactions run backwards, releasing carbon dioxide to be exhaled. This is why the carbon dioxide content of blood is high even though its partial pressure is low, and why the enzyme carbonic anhydrase matters: without it, the reaction would be far too slow to carry the load.</p>`;

const organisation = `<h2>Organisation of the Organism: the cell in detail</h2>
<p>Cell structure questions look like recall and are really about function. A mark scheme rarely asks what a mitochondrion is; it asks why a cell that secretes a lot of enzyme has many of them, or why a root hair cell has no chloroplasts. This section gives the organelle functions in enough detail to answer those, then does the arithmetic of magnification properly, because that is where most marks are lost.</p>

<h3>Organelles and what each one is for</h3>
<table>
<tr><th>Structure</th><th>What it is</th><th>Function, and the clue it leaves in a cell</th><th>Plant</th><th>Animal</th></tr>
<tr><td>Nucleus</td><td>Chromatin (DNA and protein) inside a double membrane with pores</td><td>Controls the cell and holds the genetic code; the pores let messenger RNA out. Large and dark in a cell making lots of protein</td><td>Yes</td><td>Yes</td></tr>
<tr><td>Mitochondrion</td><td>Double membrane, inner one folded into cristae; own small amount of DNA</td><td>Site of aerobic respiration; cristae increase the area for the reactions. Numerous in muscle, sperm midpiece and active transport cells</td><td>Yes</td><td>Yes</td></tr>
<tr><td>Ribosome</td><td>Two subunits of RNA and protein, about 20 nm</td><td>Protein synthesis; free in the cytoplasm or attached to the rough ER. Never visible with a light microscope</td><td>Yes</td><td>Yes</td></tr>
<tr><td>Rough ER</td><td>Membranes studded with ribosomes</td><td>Folds and transports proteins made on its ribosomes; abundant in cells that secrete enzymes or antibodies</td><td>Yes</td><td>Yes</td></tr>
<tr><td>Smooth ER</td><td>Membrane tubules, no ribosomes</td><td>Makes lipids and steroids, and detoxifies drugs; abundant in liver cells</td><td>Yes</td><td>Yes</td></tr>
<tr><td>Golgi apparatus</td><td>Stack of flattened sacs</td><td>Modifies proteins (for example by adding carbohydrate), packages them into vesicles for secretion</td><td>Yes</td><td>Yes</td></tr>
<tr><td>Lysosome</td><td>Vesicle containing hydrolytic enzymes</td><td>Digests worn-out organelles and material taken in by phagocytosis; abundant in phagocytes</td><td>Rare</td><td>Yes</td></tr>
<tr><td>Chloroplast</td><td>Double membrane, stacks of thylakoid discs (grana) in a stroma, containing chlorophyll</td><td>Photosynthesis: light absorbed in the grana, carbon fixation in the stroma; contains starch grains. Only in photosynthetic cells</td><td>Yes</td><td>No</td></tr>
<tr><td>Vacuole</td><td>Fluid-filled sac bounded by the tonoplast</td><td>Stores water, sugars and salts and provides turgor; the large permanent vacuole is what keeps a plant cell firm</td><td>Large, permanent</td><td>Small, temporary</td></tr>
<tr><td>Cell wall</td><td>Cellulose microfibrils</td><td>Strength and support; freely permeable, so it does not control what enters</td><td>Yes</td><td>No</td></tr>
<tr><td>Cell membrane</td><td>Phospholipid bilayer with proteins</td><td>Partially permeable boundary controlling exchange; the site of osmosis, diffusion and active transport</td><td>Yes</td><td>Yes</td></tr>
</table>
<p>Two exam traps sit in that table. The cell wall is freely permeable, so it plays no part in osmosis — the membrane does. And a plant cell has mitochondria as well as chloroplasts, because it respires at night and in its roots; a plant cell is not a photosynthetic cell by default.</p>

<h3>Prokaryote and eukaryote, in the terms that get marked</h3>
<p>A prokaryote has no nucleus: its DNA is a single circular molecule lying free in the cytoplasm, often with additional small circles called plasmids. It has no membrane-bound organelles, so no mitochondria, no chloroplasts and no Golgi; its ribosomes are smaller. Many have a cell wall of peptidoglycan (murein), a capsule for protection, and one or more flagella for movement. A eukaryote has a nucleus, membrane-bound organelles and larger ribosomes, and may be unicellular or multicellular. Sizes overlap at the edges, but as a rule a prokaryote is 1–5 µm and a eukaryotic cell 10–100 µm (Figure 1).</p>
<p>The practical consequence of the size difference is what a microscope can show. With a light microscope, resolution is limited to about 0.2 µm by the wavelength of visible light, so you can see a nucleus, a vacuole and a chloroplast, but not a ribosome, a membrane or the cristae of a mitochondrion. An electron microscope uses electrons with a far shorter wavelength, so it resolves to a fraction of a nanometre and reveals those structures — but the specimen must be dead, because the preparation requires a vacuum. Magnification and resolution are different things: magnification enlarges the image, resolution determines how much detail survives the enlargement.</p>

<h3>Specialised cells: structure written as function</h3>
<table>
<tr><th>Cell</th><th>Structural feature</th><th>Function it serves</th></tr>
<tr><td>Red blood cell</td><td>No nucleus, biconcave disc, haemoglobin</td><td>More room for haemoglobin; large surface area for oxygen uptake; flexible enough to pass capillaries</td></tr>
<tr><td>Sperm cell</td><td>Many mitochondria in the midpiece, a tail, an acrosome of enzymes</td><td>Energy for swimming, propulsion, and enzymes to penetrate the egg</td></tr>
<tr><td>Ciliated epithelial cell</td><td>Cilia on the free surface, many mitochondria</td><td>Beats mucus and trapped particles away from the lungs; ATP for the beating</td></tr>
<tr><td>Root hair cell</td><td>Long thin extension, no cuticle, large vacuole, many mitochondria</td><td>Large surface area for water uptake; concentrated sap maintains the osmotic gradient; ATP for ion uptake</td></tr>
<tr><td>Palisade mesophyll cell</td><td>Many chloroplasts, near the upper surface, cylindrical</td><td>Maximum light absorption where light is strongest</td></tr>
<tr><td>Nerve cell (neurone)</td><td>Long axon, branched endings, myelin sheath</td><td>Rapid conduction over distance; many connections</td></tr>
<tr><td>Muscle cell</td><td>Elongated, packed with protein filaments and mitochondria</td><td>Contraction and the ATP to power it</td></tr>
<tr><td>Xylem vessel</td><td>Dead, hollow, no end walls, lignified</td><td>Continuous low-resistance column for water under tension</td></tr>
<tr><td>Guard cell</td><td>Thicker inner wall, chloroplasts, can change shape</td><td>Opens and closes the stoma by turgor change</td></tr>
</table>

<h3>From cell to organism</h3>
<p>A tissue is a group of similar cells working together for one function: muscular tissue, epithelial tissue, xylem, phloem, palisade mesophyll. An organ is several tissues working together: the stomach contains muscular tissue to churn, epithelial tissue to secrete, and glandular tissue to make acid. An organ system is several organs with a common function, such as the digestive system or the circulatory system, and the organism is the sum of its systems. The same hierarchy applies to plants, with the leaf as an organ and the transport system as the plant's equivalent of a system.</p>
<p>Questions that ask "why is a leaf an organ?" want the answer "because it contains several tissues — epidermis, palisade mesophyll, spongy mesophyll, xylem and phloem — working together for photosynthesis". Naming two tissues is the evidence; the word "organ" alone is not.</p>

<h3>Magnification and actual size, done without slips</h3>
<p>Three quantities are related by one equation, and every version of the question is that equation rearranged:</p>
<p>magnification = image size ÷ actual size; actual size = image size ÷ magnification; image size = actual size × magnification.</p>
<p>Work in one unit and convert at the end. A cell drawn 40 mm across at a magnification of ×2,000 has an actual size of 40 ÷ 2,000 = 0.02 mm, which is 20 µm. A chloroplast 5 µm long viewed at ×4,000 appears 5 × 4,000 = 20,000 µm = 20 mm. The conversion is the step that loses marks: 1 mm = 1,000 µm, and 1 µm = 1,000 nm, so 0.02 mm = 20 µm = 20,000 nm.</p>
<p>When the question gives you a scale bar instead of a magnification, measure the bar, work out how many micrometres it represents, and use that as your conversion — do not try to calculate a magnification from the print size, because the print size is not the specimen. And when you are asked to draw a cell, use a sharp pencil, unbroken lines, no shading, and label with straight lines that touch the structure; the drawing rules are worth marks on their own.</p>`;

module.exports = {
  sections: [
    {
      id: "eeff9351-5328-426f-84fe-c30f770d4c50",
      slug: "diseases-and-immunity",
      heading: "Diseases and Immunity: the mechanism, cell by cell",
      html: diseases + "\n" + immuneCurve + "\n",
    },
    {
      id: "f6640283-d20a-409d-b6bb-4f9e2d2ac832",
      slug: "transport-in-animals",
      heading: "Transport in Animals: pressure, valves and the plumbing that fails",
      html: transportAnimals + "\n" + dissociation + "\n",
    },
    {
      id: "821d977f-fba2-4db9-a316-ac617721233b",
      slug: "organisation-of-the-organism",
      heading: "Organisation of the Organism: the cell in detail",
      html: organisation + "\n" + cellScale + "\n",
    },
  ],
};
