/**
 * Biology A2 — "Coordination, Response and Gene Technology": a quick revision
 * summary, not a second set of notes.
 *
 * The row this replaces was 33,366 characters against 39,731 characters of
 * notes — 84% of the full note, so the two cards on the topic page opened
 * almost the same document. A summary is a map read in one sitting: every
 * specification point (8.1–8.22) gets the statement it asks for, and the
 * explanation, practical method and exam practice stay in the notes.
 *
 * Emits `.freebuff-tmp/update-coord-summary.sql`: keyed by id, guarded by
 * material_type and by the exact content length that was read, so it cannot
 * replace anything but the row it was drafted for. Run it through
 * `.freebuff/apply-sql-file.cjs` (dry run first).
 */
const fs = require("fs");

const ID = "dd922b00-1181-4fc5-88c5-d92e69cf3220";
const TITLE = "Coordination, Response and Gene Technology — Quick Revision Summary";
/** Length of the row this draft replaces; a different length means drift. */
const EXPECTED_LEN = 10237;

const content = `<h2>Coordination, Response and Gene Technology — Quick Revision Summary</h2>
<p>Edexcel International A2 Biology Topic 8 (8.1–8.22) in one pass: the statement each specification point asks for, in the order of the notes. Detail and exam practice stay in the full notes — use this to check recall.</p>

<h3>8.1 Neurones</h3>
<ul>
<li><strong>Sensory</strong> — cell body to one side, long dendron; receptor to CNS.</li>
<li><strong>Relay</strong> — cell body central, short axon; inside the CNS.</li>
<li><strong>Motor</strong> — cell body in the CNS, long axon; CNS to effector.</li>
<li>Dendrites carry impulses in, the axon out; mitochondria supply ATP for the Na⁺/K⁺ pump; Schwann cells form myelin and the gaps are nodes of Ranvier.</li>
</ul>

<h3>8.2 Stimulus to response</h3>
<p>Stimulus → receptor → sensory neurone → relay neurone in the CNS → motor neurone → effector (muscle contracts, gland secretes).</p>

<h3>8.1, 8.5 Saltatory conduction</h3>
<p>Myelin insulates the axon, so an impulse can only start at bare nodes and jumps node to node — faster than depolarising the whole membrane. Larger diameter and higher temperature speed it too.</p>

<h3>8.3 The spinal reflex arc</h3>
<ul>
<li>Rapid and involuntary, completed before the brain is aware: it protects the body.</li>
<li>Grey matter (inner) holds the cell bodies and synapses of relay and motor neurones; white matter (outer) holds myelinated axons to and from the brain.</li>
<li>Withdrawal: pain receptor → sensory neurone → relay neurone in the cord → motor neurone → flexor contracts, extensor relaxes.</li>
</ul>

<h3>8.4 The action potential</h3>
<ul>
<li>Resting about −70 mV: the pump moves 3 Na⁺ out for 2 K⁺ in, and the membrane is more permeable to K⁺.</li>
<li>Threshold opens voltage-gated Na⁺ channels: Na⁺ in, depolarisation to about +40 mV.</li>
<li>Na⁺ channels close, K⁺ channels open: K⁺ out, repolarisation, brief hyperpolarisation, pump restores.</li>
<li>All-or-nothing: a stronger stimulus gives more impulses per second. In the refractory period Na⁺ channels are inactivated, so conduction stays one-way.</li>
</ul>

<h3>8.6 Synapses and the pupil</h3>
<p>Impulse → Ca²⁺ channels open → Ca²⁺ in → vesicles release acetylcholine → binds postsynaptic receptors → Na⁺ in → new impulse; acetylcholinesterase ends the signal. Bright light: parasympathetic → circular muscles contract → constricted pupil. Dim: sympathetic → radial muscles contract → dilated pupil.</p>

<h3>8.7 Drugs acting on transmission</h3>
<ul>
<li><strong>Nicotine</strong> — mimics acetylcholine at nicotinic receptors; addictive stimulant.</li>
<li><strong>Lidocaine</strong> — blocks voltage-gated Na⁺ channels, so no impulse forms; local anaesthetic.</li>
<li><strong>Cobra venom α-toxin</strong> — blocks acetylcholine receptors at the neuromuscular junction; paralysis.</li>
<li><strong>L-DOPA</strong> — crosses into the brain and becomes dopamine; eases Parkinson's symptoms.</li>
<li><strong>MDMA</strong> — floods the synapse with serotonin, then depletes and damages serotonin neurones.</li>
</ul>

<h3>8.8 Rods and the optic neurone</h3>
<p>Rhodopsin is opsin plus 11-cis retinal. Light makes retinal all-trans, cGMP falls and the Na⁺ channels open in the dark close: the rod hyperpolarises, releases less glutamate, and the signal passes through the bipolar cell until impulses fire in the optic neurone.</p>

<h3>8.9 Habituation</h3>
<p>A decreasing response to a repeated, harmless stimulus — learning to ignore it. Not fatigue or sensory adaptation: the receptor still responds, and the change is at the sensory-to-motor synapse. A new stimulus still produces a full response.</p>

<h3>8.10 CNS and PNS</h3>
<p>The CNS (brain, spinal cord) integrates and coordinates. The PNS links it to receptors and effectors: somatic control is voluntary, autonomic is not — sympathetic for action, parasympathetic for rest, often opposite effects on the same organ.</p>

<h3>8.11–8.12 Coordination in plants</h3>
<ul>
<li><strong>Phytochrome</strong> — Pr + red light (660 nm) → active Pfr; far-red (730 nm) reverses it. Pfr acts on transcription, switching germination and flowering genes on or off.</li>
<li><strong>Auxin (IAA)</strong> — made in the shoot tip, moved polarly; cells on the shaded or lower side elongate more (acid growth) so shoots bend to light and upwards. In roots higher auxin inhibits elongation, so roots bend down.</li>
<li><strong>Gibberellins</strong> — stem elongation and germination: GA from the embryo makes the aleurone layer produce amylase that hydrolyses starch to maltose.</li>
<li><strong>Core practical 18</strong> — germinating grains on starch agar + iodine: a clear zone shows amylase activity, boiled grains give none.</li>
</ul>

<h3>8.13 Nervous and hormonal coordination</h3>
<p>Nervous: electrical, fast, short-lived, targeted. Hormonal: chemical, in the blood, slower, longer-lasting, widespread. They combine in fight or flight. Plants use hormones only.</p>

<h3>8.14 The brain</h3>
<ul>
<li><strong>Cerebral hemispheres</strong> — thought, memory, reasoning, language, conscious sensation; each controls the opposite side.</li>
<li><strong>Hypothalamus</strong> — homeostasis and control of the pituitary.</li>
<li><strong>Pituitary</strong> — hormones such as growth hormone and ADH.</li>
<li><strong>Cerebellum</strong> — coordination of movement, posture and balance.</li>
<li><strong>Medulla oblongata</strong> — heart rate, breathing, coughing and swallowing reflexes.</li>
</ul>

<h3>8.15 Imaging the brain</h3>
<ul>
<li><strong>CT</strong> — X-rays: structure, bone bleeding; quick but ionising.</li>
<li><strong>MRI</strong> — magnetic field and radio waves: detailed soft tissue, no ionising radiation; slower.</li>
<li><strong>fMRI</strong> — blood-oxygen change after activity, so it shows which areas are active; good spatial, poor temporal resolution.</li>
<li><strong>PET</strong> — a radioactive tracer such as labelled glucose shows metabolism and receptors; ionising and expensive.</li>
</ul>

<h3>8.16 Brain chemicals and disease</h3>
<p>Parkinson's: dopamine neurones in the substantia nigra are lost — treated with L-DOPA. Depression: low serotonin and noradrenaline — SSRIs block reuptake. Finding the chemical at fault is what lets a drug replace it or slow its loss.</p>

<h3>8.17–8.19 GMOs and recombinant DNA</h3>
<ul>
<li><strong>Drugs from GMOs</strong> — the human insulin gene in a bacterial plasmid, grown in a fermenter, then purified: identical to human insulin, so fewer immune reactions than animal insulin.</li>
<li><strong>Making it</strong> — a restriction endonuclease leaves sticky ends; the same enzyme cuts the plasmid, the two base-pair, and DNA ligase seals the backbone.</li>
<li><strong>Inserting it</strong> — competent bacteria (calcium chloride and heat shock, or electroporation), viral vectors, microinjection, gene gun; antibiotic-resistance markers show which cells took it up.</li>
</ul>

<h3>8.20 Microarrays</h3>
<p>mRNA from two samples → cDNA with two fluorescent dyes → hybridises to the chip's probes. Green or red: more active in that sample; yellow: similar; brightness: how active. Used to compare which genes are switched on.</p>

<h3>8.21 Bioinformatics</h3>
<p>Computers storing and analysing biological data — sequences, expression, structures. It identifies genes by comparison, builds phylogenetic trees, predicts protein structure and interprets microarrays.</p>

<h3>8.22 GM risks and benefits</h3>
<ul>
<li><strong>Benefits</strong> — pest- and herbicide-resistant crops, better nutrition, higher yields; human proteins for medicine.</li>
<li><strong>Risks</strong> — genes escaping to wild populations, harm to non-target species, pest resistance, allergens; ethical and regulatory concerns.</li>
</ul>

<h3>Typical mistakes</h3>
<ul>
<li>Saying light depolarises a rod cell — it hyperpolarises it.</li>
<li>Putting saltatory conduction under the myelin instead of at the nodes.</li>
<li>Swapping circular (constrict) and radial (dilate) muscles.</li>
<li>Claiming a stronger stimulus gives a bigger action potential.</li>
<li>Calling habituation fatigue or sensory adaptation.</li>
<li>Giving auxin a promotive effect on elongation in roots, where it inhibits it.</li>
<li>Swapping restriction enzymes and DNA ligase.</li>
<li>Using fMRI to image structure — MRI does that.</li>
</ul>
`;

const q = (value) => value.replace(/'/g, "''");

const sql = `-- Replacement quick-revision summary for Biology A2 coordination-response-and-gene-technology.
-- Keyed by id, and only while the row still holds the ${EXPECTED_LEN}-character version
-- this draft was written against. Content and title are replaced together so the
-- title stays the content's own <h2>.
update public.study_materials m
set title = '${q(TITLE)}',
    content = '${q(content)}'
where m.id = '${ID}'
  and m.material_type = 'summary'
  and length(m.content) = ${EXPECTED_LEN}
returning
  m.id,
  length(m.content) as content_len,
  length(m.title) as title_len,
  (regexp_match(m.content, '^\\s*<h2[^>]*>(.*?)</h2>', 'is'))[1] as h2;
`;

fs.writeFileSync(".freebuff-tmp/update-coord-summary.sql", sql);
console.log(`draft: ${content.length} chars (was ${EXPECTED_LEN}), ${(content.match(/<h3/g) || []).length} h3 sections`);
