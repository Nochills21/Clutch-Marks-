/**
 * Biology A2 deepening, pass b2: adds h3 subsections to four notes. Each section
 * is prose-only because the note already carries its figure. Inserted before
 * "Equations and symbols" (or appended) by refine-note-sections.cjs; nothing
 * already in a note is rewritten.
 */

const sections = [
  {
    id: "eb9a809a-a086-4f98-b365-670ae0c8f7aa",
    slug: "coordination-response-and-gene-technology",
    proseOnly: true,
    heading: "Deeper notes: the resting potential, synapses and the autonomic control of the heart",
    html: `<h2>Deeper notes: the resting potential, synapses and the autonomic control of the heart</h2>
<p>These subsections explain the membrane and synapse mechanisms behind the coordination statements. Name the ion, the channel or the pump involved each time, because examiners reward the mechanism rather than the outcome.</p>
<h3>The resting potential and the sodium–potassium pump</h3>
<p>A neurone at rest is about −70 mV inside relative to outside. The sodium–potassium pump uses ATP to move three sodium ions out of the cell for every two potassium ions moved in. Potassium ions leak back out more easily than sodium ions leak in, so the inside stays negative. This resting potential is the starting point for every action potential.</p>
<h3>The all-or-nothing principle and the refractory period</h3>
<p>An action potential either happens fully or not at all, once the threshold potential is reached. A stronger stimulus does not make a bigger action potential; it produces more frequent impulses. After an impulse the membrane is refractory for a short time and cannot generate a second action potential, which is why the impulse travels in one direction only.</p>
<h3>Voltage-gated channels in depolarisation and repolarisation</h3>
<p>When the membrane reaches threshold, voltage-gated sodium channels open and sodium ions rush in, making the inside positive. The sodium channels then close and voltage-gated potassium channels open, so potassium ions leave and the membrane repolarises. The potassium channels close slowly, so the membrane briefly becomes more negative than its resting potential.</p>
<h3>Calcium entry and neurotransmitter release</h3>
<p>When an action potential reaches the synaptic knob, voltage-gated calcium channels open and calcium ions diffuse in. The rise in calcium concentration makes synaptic vesicles fuse with the presynaptic membrane, and acetylcholine is released into the synaptic cleft by exocytosis. Acetylcholine diffuses across the cleft and binds to receptors on the postsynaptic membrane.</p>
<h3>Acetylcholinesterase and why the signal must be cleared</h3>
<p>Acetylcholinesterase in the synaptic cleft hydrolyses acetylcholine into choline and ethanoic acid, so the postsynaptic membrane is not stimulated continuously. Choline is taken back into the presynaptic knob and combined with acetyl coenzyme A to make acetylcholine again, using energy from respiration. A nerve agent that blocks this enzyme causes continuous stimulation and can be fatal.</p>
<h3>Spatial and temporal summation at a synapse</h3>
<p>A single synaptic event is rarely enough to trigger an action potential in the next neurone. Spatial summation adds the effects of impulses arriving at different synapses at the same time. Temporal summation adds the effects of impulses arriving at the same synapse in quick succession. Both bring the postsynaptic membrane to threshold.</p>
<h3>The autonomic nervous system and the heart</h3>
<p>The autonomic nervous system controls involuntary organs. Sympathetic neurones release noradrenaline and increase heart rate. Parasympathetic neurones, which reach the heart in the vagus nerve, release acetylcholine and slow it. The two systems act antagonistically, and the balance between them sets the heart rate at any moment.</p>
<h3>Designing a reflex investigation</h3>
<p>A reflex can be timed by measuring the interval between a stimulus and a response, such as the knee-jerk. Results are more reliable when the stimulus is applied in the same way each time and the timings are repeated and averaged. A reaction-time test also involves conscious processing, so it cannot isolate the reflex arc from the brain's response.</p>`,
  },
  {
    id: "de2af4ab-d36e-4c26-9cf6-c1e5312f6dd9",
    slug: "energy-flow-ecosystems-and-environment",
    proseOnly: true,
    heading: "Deeper notes: where the energy goes, nutrients and the compensation point",
    html: `<h2>Deeper notes: where the energy goes, nutrients and the compensation point</h2>
<p>These subsections follow energy and nutrients through the ecosystem. Each one states where the energy leaves the system, because a loss that is not named will not earn the mark.</p>
<h3>Respiration losses and why only part of NPP is passed on</h3>
<p>Of the energy fixed in gross primary productivity, some is used in respiration by the producers, and some is lost as heat, in faeces and in dead material that is not eaten. Only the remainder, net primary productivity, is available to the next trophic level. Consumers lose energy in the same ways, so the efficiency falls at each step.</p>
<h3>Decomposers and the return of nutrients</h3>
<p>Bacteria and fungi break down dead organic matter and waste. They release carbon dioxide through respiration and return mineral ions such as nitrate and phosphate to the soil. Nutrients are recycled, but energy is not: it leaves the ecosystem as heat, so energy must be continuously supplied from the sun.</p>
<h3>Energy pyramids and why they never invert</h3>
<p>A pyramid of energy is always upright, because each trophic level receives less energy than the level below it. A pyramid of biomass or numbers can be inverted, for example where one large tree supports many insects. The energy pyramid must narrow because of the losses described above.</p>
<h3>Light intensity, limiting factors and the light compensation point</h3>
<p>When light is the limiting factor, the rate of photosynthesis rises as light intensity rises. The light compensation point is the intensity at which the rate of photosynthesis equals the rate of respiration, so there is no net uptake of carbon dioxide. Below it a plant loses carbon overall, which explains why a shaded leaf cannot grow.</p>`,
  },
  {
    id: "87af1d72-2a4f-41be-b34d-ae7156bc8ac9",
    slug: "microbiology-immunity-and-forensics",
    proseOnly: true,
    heading: "Deeper notes: vaccination, the two responses, phagocytosis and sterilisation",
    html: `<h2>Deeper notes: vaccination, the two responses, phagocytosis and sterilisation</h2>
<p>These subsections explain how the immune response is built and how microbes are controlled in practice. Use the named cells and the named processes in your answers, since the mark schemes ask for them.</p>
<h3>Vaccination and herd immunity</h3>
<p>A vaccine presents the immune system with a harmless form of an antigen, so that a later exposure to the pathogen triggers a rapid secondary response. Herd immunity develops when enough of a population is immune that an infection cannot pass easily from person to person, which protects people who cannot be vaccinated. The proportion needed depends on how infectious the pathogen is.</p>
<h3>The primary and secondary immune responses compared</h3>
<p>The first exposure produces a slow primary response: the B cells that match the antigen divide and differentiate, and antibody appears after several days. Memory cells remain afterwards. On a second exposure the secondary response is faster, larger and longer-lasting, with more antibody produced sooner.</p>
<h3>Phagocytosis, step by step</h3>
<p>A phagocyte such as a neutrophil or a macrophage binds to a pathogen through receptors on its surface. The membrane surrounds the pathogen, forming a vesicle called a phagosome. Lysosomes fuse with the phagosome and release enzymes that digest the pathogen. Macrophages then display antigens from the pathogen, which links the non-specific response to the specific one.</p>
<h3>How antibiotic resistance spreads</h3>
<p>Bacteria with a gene that confers resistance survive an antibiotic that kills the rest, and they multiply without competition from the susceptible strain. Resistance genes can also pass between bacteria on plasmids. Because the antibiotic selects for survivors, using antibiotics only when they are needed slows the spread of resistance.</p>
<h3>Sterilisation and disinfection</h3>
<p>Sterilisation kills all microorganisms, including endospores, and is achieved by autoclaving at 121 °C, reached at a pressure of about 100 kPa above atmospheric, for at least 15 minutes. Disinfection reduces the number of microorganisms on a surface with chemicals such as ethanol, which is not reliable against spores. Aseptic technique prevents contamination during an experiment.</p>`,
  },
  {
    id: "a582f48a-8c36-42e4-8134-cc3682a9fe47",
    slug: "respiration-muscles-and-internal-environment",
    proseOnly: true,
    heading: "Deeper notes: anaerobic respiration, the heart and feedback",
    html: `<h2>Deeper notes: anaerobic respiration, the heart and feedback</h2>
<p>These subsections cover the respiration and control mechanisms named in the specification. Each one gives the molecule or organ responsible.</p>
<h3>Anaerobic respiration and the lactate oxygen debt</h3>
<p>Without enough oxygen, pyruvate is reduced to lactate, which regenerates the NAD that glycolysis needs. The liver later converts most of the lactate back to glucose, using ATP. The extra oxygen used for this is the oxygen debt.</p>
<h3>The respiratory quotient</h3>
<p>RQ = CO₂ produced ÷ O₂ consumed. <em>Key:</em> RQ = respiratory quotient (no unit). Glucose gives 1.0, since C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O. Fats give about 0.7, so a value near 0.7 means fat is the main fuel.</p>
<h3>Core Practical 15: the artificial hydrogen carrier</h3>
<p>DCPIP is a blue redox indicator that turns colourless when it accepts hydrogen. The time for the blue colour to disappear measures how fast the tissue releases hydrogen: a shorter time means a faster rate.</p>
<h3>Myogenic cardiac muscle and the sinoatrial node</h3>
<p>Cardiac muscle contracts without a nerve impulse for each beat, so it is myogenic. The sinoatrial node, the pacemaker in the right atrium, sets the rhythm.</p>
<h3>Cardiac output and what changes it</h3>
<p>Cardiac output = stroke volume × heart rate. <em>Key:</em> cardiac output (cm³ min⁻¹); stroke volume (cm³ per beat); heart rate (beats per minute). A stroke volume of 70 cm³ at 70 beats per minute gives 4900 cm³ min⁻¹.</p>
<h3>Positive feedback and why it is rare</h3>
<p>Negative feedback reverses a change and keeps conditions stable. Positive feedback increases the change, as in blood clotting, so it is rare in homeostasis because it pushes a variable away from its set point.</p>
<h3>Adrenaline and the fight or flight response</h3>
<p>Adrenaline from the adrenal medulla raises heart rate and stroke volume, dilates the blood vessels to the muscles, and promotes the breakdown of glycogen to glucose. Its effects reverse once its level falls.</p>`,
  },
];

module.exports = { sections };
