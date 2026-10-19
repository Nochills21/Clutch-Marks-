// Edexcel International A Level Biology (WBI14, WBI15), topics 5-8. Answers are 0-based.
module.exports = {
  subject: "biology",
  level: "A2",
  topics: [
    {
      slug: "energy-flow-ecosystems-and-environment",
      lesson: `# Energy Flow, Ecosystems and the Environment

Edexcel IAL Biology WBI14, Topic 5. Energy enters most ecosystems as light, is fixed by photosynthesis and then passes along food chains. Nutrients cycle, and human activity can disrupt those cycles.

### Photosynthesis and limiting factors
- The light-dependent reactions take place on the thylakoid membranes. Light energy splits water (photolysis), releases oxygen and makes ATP and reduced NADP.
- The light-independent reactions (the Calvin cycle) take place in the stroma. CO₂ is fixed by the enzyme RuBisCO onto ribulose bisphosphate, and the product is reduced to make triose phosphate.
- Light intensity, carbon dioxide concentration and temperature are limiting factors. The factor that is in shortest supply limits the rate.

### Energy transfer through trophic levels
- Gross primary productivity is the total energy fixed by plants. Net primary productivity is the energy left after respiration.
- Energy is lost between trophic levels: in respiration, as heat, in faeces and urine, and in parts of organisms that are not eaten. Only about 10% of the energy at one trophic level is usually passed on.
- Energy pyramids are always the right way up, because energy is lost at each step.

### Nutrient cycles
- In the carbon cycle, photosynthesis removes CO₂ from the air and respiration, decomposition and combustion return it.
- Nitrogen fixing bacteria in root nodules convert nitrogen gas into ammonium ions. Nitrifying bacteria convert ammonium to nitrate, and denitrifying bacteria return nitrogen gas to the air.

### Human impact
- Fertiliser run-off causes eutrophication. Algae grow rapidly, block light, and then die. Decomposers use up the oxygen, and fish and other animals die.
- Greenhouse gases such as carbon dioxide and methane absorb infrared radiation and raise the temperature of the Earth.
- Pesticides and persistent chemicals become more concentrated at higher trophic levels, which is called biomagnification.

Exam tip: when you explain a limiting factor, name the factor, state which reaction it slows, and say why the rate falls.`,
      questions: [
        { q: "Where do the light-dependent reactions of photosynthesis take place?", opts: ["Stroma", "Thylakoid membranes", "Cytoplasm", "Cell wall"], correct: 1, explain: "The light-dependent reactions happen on the thylakoid membranes of the chloroplast." },
        { q: "Which enzyme fixes carbon dioxide in the Calvin cycle?", opts: ["Amylase", "RuBisCO", "Helicase", "Lipase"], correct: 1, explain: "RuBisCO catalyses the fixation of CO₂ onto ribulose bisphosphate." },
        { q: "What is released as a product of photolysis of water?", opts: ["Carbon dioxide", "Nitrogen", "Oxygen", "Ethanol"], correct: 2, explain: "Photolysis splits water and releases oxygen." },
        { q: "Gross primary productivity is:", opts: ["the energy left after respiration", "the total energy fixed by plants in photosynthesis", "the energy lost as heat", "the energy in the faeces of herbivores"], correct: 1, explain: "Gross primary productivity is the total energy fixed; net productivity is what remains after respiration." },
        { q: "Which of these is NOT a reason energy is lost between trophic levels?", opts: ["Respiration", "Heat loss", "Excretion in urine and faeces", "Photosynthesis in the consumer"], correct: 3, explain: "Consumers do not photosynthesise. Energy is lost through respiration, heat, excretion and uneaten parts." },
        { q: "About what percentage of energy is usually passed from one trophic level to the next?", opts: ["90%", "50%", "10%", "1%"], correct: 2, explain: "Around 10% of the energy at one trophic level is passed to the next." },
        { q: "Why are energy pyramids always the right way up?", opts: ["Biomass always increases up the chain", "Energy is lost at each trophic level", "Producers are always the smallest organisms", "Consumers store more energy than producers"], correct: 1, explain: "Each level loses energy, so the producers always hold the most energy." },
        { q: "Which bacteria convert ammonium ions into nitrate?", opts: ["Nitrogen fixing bacteria", "Nitrifying bacteria", "Denitrifying bacteria", "Lactobacillus"], correct: 1, explain: "Nitrifying bacteria oxidise ammonium to nitrite and then to nitrate." },
        { q: "Eutrophication is caused mainly by:", opts: ["excess oxygen in water", "fertiliser run-off that makes algae grow rapidly", "removal of all plants from a river", "low light levels in deep oceans"], correct: 1, explain: "Nutrient enrichment from fertiliser drives algal blooms, which then deplete oxygen." },
        { q: "Why do algae die in a eutrophic lake?", opts: ["They are eaten by fish", "Their growth blocks light from reaching submerged plants", "They run out of carbon dioxide because of rain", "They are killed by cold water"], correct: 1, explain: "Dense algae block light, so the submerged plants stop photosynthesising and die." },
        { q: "Which factor limits the rate of the light-independent reactions most directly?", opts: ["Carbon dioxide concentration", "Water potential of the soil", "Colour of the leaf", "Number of stomata"], correct: 0, explain: "The light-independent reactions use CO₂ as a substrate, so its concentration can be the limiting factor." },
        { q: "Biomagnification means:", opts: ["a rise in the total biomass of a food chain", "a persistent substance becoming more concentrated at higher trophic levels", "an increase in the number of producers", "the growth of bacteria in soil"], correct: 1, explain: "Persistent chemicals accumulate in the tissues of organisms at each level." },
        { q: "Which gas is produced by denitrifying bacteria?", opts: ["Ammonia", "Nitrogen gas", "Methane only", "Oxygen"], correct: 1, explain: "Denitrifying bacteria return nitrogen to the atmosphere as nitrogen gas." },
        { q: "Which product of the light-dependent reactions is used to reduce glycerate 3-phosphate?", opts: ["ADP only", "Reduced NADP and ATP", "Carbon dioxide", "Ribulose bisphosphate"], correct: 1, explain: "Reduced NADP supplies hydrogen and ATP supplies energy in the Calvin cycle." },
        { q: "Which greenhouse gas is mainly produced by anaerobic decomposition in wetlands and by livestock?", opts: ["Methane", "Oxygen", "Nitrogen", "Argon"], correct: 0, explain: "Methane is produced by methanogenic archaea in anaerobic conditions." },
        { q: "A crop is grown in a greenhouse. Which change would most increase its gross primary productivity, if light is not limiting?", opts: ["Lowering the CO₂ concentration", "Raising the CO₂ concentration to the optimum", "Reducing the temperature to 0°C", "Removing all water"], correct: 1, explain: "When light is not limiting, raising CO₂ towards its optimum increases the rate of photosynthesis." }
      ]
    },
    {
      slug: "microbiology-immunity-and-forensics",
      lesson: `# Microbiology, Immunity and Forensics

Edexcel IAL Biology WBI14, Topic 6. Pathogens cause disease, and the immune system defends the body against them. Knowledge of microbes also allows antibiotics, vaccines and forensic DNA analysis.

### Pathogens and antibiotics
- Bacteria have 70S ribosomes, a cell wall made of peptidoglycan and circular DNA. Antibiotics such as penicillin block cell wall synthesis; others block 70S ribosomes.
- Viruses have no cell structure of their own. They are obligate parasites that use the host cell machinery to replicate, so antibiotics do not act on them.
- Antibiotic resistance spreads by natural selection. Bacteria with resistance alleles survive and reproduce, and the resistant population grows when antibiotics are overused.

### Immune response
- Phagocytes engulf pathogens by phagocytosis. Antigens on the pathogen surface are recognised as foreign.
- B lymphocytes with complementary receptors undergo clonal selection and clonal expansion. Plasma cells produce antibodies, which bind to specific antigens.
- T helper cells release cytokines that activate B cells and cytotoxic T cells. Cytotoxic T cells kill infected cells.
- Memory cells persist after an infection, so the secondary response is faster and larger.

### Vaccination
- A vaccine contains an antigen, often as a weakened or inactivated pathogen, or a harmless fragment. It stimulates a primary response without causing the disease.
- Herd immunity protects those who cannot be vaccinated when a high proportion of the population is immune.

### HIV
- HIV attacks and destroys helper T cells. Over time the immune system fails, and the person develops AIDS.
- The virus carries RNA and uses reverse transcriptase to make DNA copies inside the host cell.

### Forensic DNA profiling
- Short tandem repeats (STRs) are short sequences that repeat a variable number of times at specific loci. The number of repeats differs between people.
- PCR amplifies the STR regions from a small sample. The products are separated by gel electrophoresis, where DNA moves towards the positive electrode according to size.

Exam tip: when you explain antibiotic resistance, describe the variation, the selection pressure and the change in the population over generations.`,
      questions: [
        { q: "Which feature do bacteria have that antibiotics such as penicillin target?", opts: ["Nuclear envelope", "Peptidoglycan cell wall", "Golgi apparatus", "Histones"], correct: 1, explain: "Penicillin inhibits the synthesis of peptidoglycan in the bacterial cell wall." },
        { q: "Why do antibiotics not destroy viruses?", opts: ["Viruses have 70S ribosomes", "Viruses have no metabolism or ribosomes of their own", "Viruses have a thick cell wall", "Viruses are eukaryotic"], correct: 1, explain: "Viruses use host cell machinery and lack the bacterial structures antibiotics target." },
        { q: "Antibiotic resistance spreads mainly by:", opts: ["Lamarckian inheritance of acquired traits", "natural selection of resistant bacteria", "mutation in every cell at once", "the bacteria choosing to adapt"], correct: 1, explain: "Resistant bacteria survive antibiotic treatment and reproduce, so resistance becomes more common." },
        { q: "Which cell engulfs pathogens by phagocytosis?", opts: ["Plasma cell", "Phagocyte", "Erythrocyte", "Memory B cell only"], correct: 1, explain: "Phagocytes such as neutrophils and macrophages engulf and digest pathogens." },
        { q: "Antibodies are made by:", opts: ["Phagocytes", "Plasma cells", "Red blood cells", "Platelets"], correct: 1, explain: "Plasma cells, derived from B lymphocytes, secrete large amounts of antibody." },
        { q: "What is the role of memory cells?", opts: ["To engulf pathogens immediately", "To give a faster and larger secondary immune response", "To produce red blood cells", "To destroy the host's own cells"], correct: 1, explain: "Memory cells remain after the first infection and respond quickly on re-exposure." },
        { q: "Which cells does HIV destroy?", opts: ["Helper T cells", "Red blood cells", "Neurones", "Platelets"], correct: 0, explain: "HIV infects and destroys helper T cells, weakening the immune response." },
        { q: "Reverse transcriptase is used by HIV to:", opts: ["make an RNA copy of DNA", "make a DNA copy of its RNA", "cut DNA at specific sites", "join DNA fragments"], correct: 1, explain: "HIV uses reverse transcriptase to produce DNA from its RNA genome." },
        { q: "A vaccine works by:", opts: ["giving the person antibodies that last for life", "stimulating a primary response without causing the disease", "killing all bacteria in the body", "blocking all viruses from entering cells"], correct: 1, explain: "A vaccine contains an antigen that triggers memory cells without causing illness." },
        { q: "Herd immunity protects people who cannot be vaccinated because:", opts: ["they make antibodies without exposure", "the pathogen cannot spread when most people are immune", "antibiotics become more effective", "the vaccine stays active in the air"], correct: 1, explain: "When most people are immune, the pathogen has few hosts to infect." },
        { q: "Short tandem repeats (STRs) are used in forensics because:", opts: ["all people have the same number of repeats", "the number of repeats varies between individuals", "they are found only in mitochondria", "they code for skin colour"], correct: 1, explain: "STRs vary in copy number between people, giving a DNA profile." },
        { q: "In gel electrophoresis, DNA fragments move towards the:", opts: ["negative electrode", "positive electrode", "top of the gel", "centre of the gel"], correct: 1, explain: "DNA is negatively charged because of its phosphate groups, so it moves towards the positive electrode." },
        { q: "What is the function of PCR in forensic analysis?", opts: ["To separate proteins by charge", "To amplify a small DNA sample", "To kill bacteria in the sample", "To make antibodies"], correct: 1, explain: "PCR makes many copies of the target DNA from a tiny sample." },
        { q: "Which of these is a cytokine's role?", opts: ["To carry oxygen", "To signal and activate other immune cells", "To break down cell walls", "To store glucose"], correct: 1, explain: "Cytokines released by T helper cells signal and activate B cells and cytotoxic T cells." },
        { q: "Why do cytotoxic T cells target infected body cells?", opts: ["They recognise the antigens on the infected cell surface", "They detect red blood cell shape", "They produce antibodies against bacteria", "They are attracted to glucose"], correct: 0, explain: "Cytotoxic T cells recognise antigens presented on infected cells and destroy them." },
        { q: "Which statement about bacterial ribosomes is correct?", opts: ["They are 80S", "They are 70S, and some antibiotics block them", "They are found in the nucleus", "They are not present in bacteria"], correct: 1, explain: "Bacterial ribosomes are 70S, unlike the 80S ribosomes of eukaryotes, so some antibiotics target them selectively." }
      ]
    },
    {
      slug: "respiration-muscles-and-internal-environment",
      lesson: `# Respiration, Muscles and the Internal Environment

Edexcel IAL Biology WBI15, Topic 7. Respiration releases energy as ATP for muscle contraction. Homeostasis keeps the internal environment stable, and the kidney is central to this. The topic links biochemistry to physiology.

### Aerobic respiration
- Glycolysis takes place in the cytoplasm. Glucose is split into two pyruvate molecules, with a small net gain of ATP and reduced NAD.
- The link reaction converts pyruvate to acetyl coenzyme A in the mitochondrial matrix, releasing CO₂.
- The Krebs cycle takes place in the matrix. It releases CO₂ and produces reduced NAD and FAD, and a little ATP.
- Oxidative phosphorylation takes place on the inner mitochondrial membrane. Electrons pass along the electron transport chain, a proton gradient forms, and ATP synthase makes ATP. Oxygen is the final electron acceptor.

### Anaerobic respiration in mammals
- Without oxygen, pyruvate is reduced to lactate. This regenerates NAD so that glycolysis can continue, but it gives far less ATP.
- The oxygen debt is the extra oxygen needed after exercise to oxidise the lactate.

### Respiratory quotient
- RQ = volume of CO₂ produced ÷ volume of O₂ consumed. Carbohydrate gives an RQ of about 1.0 and fat gives about 0.7.

### Muscle contraction
- A sarcomere is the unit between two Z lines. Thick filaments of myosin and thin filaments of actin slide past each other; the sarcomere shortens but the filaments do not change length.
- Myosin heads bind to actin, and the power stroke pulls the actin along. ATP binds to myosin to break the link, and hydrolysis of ATP resets the head.
- Calcium ions bind to troponin, which moves tropomyosin and exposes the binding sites on actin.

### Homeostasis and the kidney
- Negative feedback corrects a change from the set point. Receptors detect the change, and effectors bring the level back.
- In the nephron, ultrafiltration occurs at the Bowman's capsule under high hydrostatic pressure. Glucose and amino acids are reabsorbed by active transport in the proximal convoluted tubule.
- The loop of Henle creates a salt gradient in the medulla. ADH increases the permeability of the collecting duct, so more water is reabsorbed by osmosis.

Exam tip: when you describe the link between ADH and water reabsorption, follow the steps in order: osmoreceptors, ADH release, collecting duct permeability, water reabsorption.`,
      questions: [
        { q: "Where does glycolysis take place?", opts: ["Mitochondrial matrix", "Cytoplasm", "Inner mitochondrial membrane", "Nucleus"], correct: 1, explain: "Glycolysis takes place in the cytoplasm and does not need oxygen." },
        { q: "Which molecule is produced by the link reaction and enters the Krebs cycle?", opts: ["Acetyl coenzyme A", "Lactate", "Glycogen", "Ethanol"], correct: 0, explain: "Pyruvate is converted to acetyl coenzyme A, which combines with oxaloacetate in the Krebs cycle." },
        { q: "What is the final electron acceptor in aerobic respiration?", opts: ["NAD", "Pyruvate", "Oxygen", "Water"], correct: 2, explain: "Oxygen accepts electrons at the end of the electron transport chain and forms water." },
        { q: "Where does oxidative phosphorylation take place?", opts: ["Cytoplasm", "Inner mitochondrial membrane", "Outer mitochondrial membrane", "Stroma"], correct: 1, explain: "The electron transport chain and ATP synthase are located on the inner mitochondrial membrane." },
        { q: "In mammalian muscle without enough oxygen, pyruvate is converted to:", opts: ["ethanol", "lactate", "glucose", "carbon dioxide only"], correct: 1, explain: "Lactate is formed, which regenerates NAD so glycolysis can continue." },
        { q: "The oxygen debt after exercise is used to:", opts: ["make more glycogen only", "oxidise the lactate that built up", "make red blood cells", "increase the pH of the blood"], correct: 1, explain: "The extra oxygen is needed to convert lactate back to pyruvate and to replenish ATP and phosphocreatine." },
        { q: "The respiratory quotient of a carbohydrate is approximately:", opts: ["0.7", "1.0", "2.0", "0.1"], correct: 1, explain: "Carbohydrates give CO₂ and O₂ in equal volumes, so the RQ is about 1.0." },
        { q: "During muscle contraction, the sarcomere shortens because:", opts: ["actin and myosin filaments shorten", "the thin filaments slide over the thick filaments", "the Z lines fuse together", "myosin becomes actin"], correct: 1, explain: "The filaments slide past each other, so the sarcomere shortens while the filaments keep their length." },
        { q: "Calcium ions allow muscle contraction by binding to:", opts: ["myosin", "troponin", "actin directly", "ATP synthase"], correct: 1, explain: "Calcium binds troponin, which moves tropomyosin and uncovers the myosin-binding sites on actin." },
        { q: "What is the role of ATP in the myosin cycle?", opts: ["It binds to actin to start contraction", "It binds to myosin to break the myosin-actin link", "It is made by the Z lines", "It removes calcium from the sarcoplasm only"], correct: 1, explain: "ATP binds to myosin, releasing it from actin, and its hydrolysis re-cocks the myosin head." },
        { q: "Ultrafiltration in the kidney takes place at the:", opts: ["collecting duct", "Bowman's capsule", "loop of Henle", "ureter"], correct: 1, explain: "Blood is filtered at high pressure in the glomerulus into the Bowman's capsule." },
        { q: "Which substance is reabsorbed completely from the filtrate by active transport in the proximal convoluted tubule?", opts: ["Urea", "Glucose", "Water only", "Creatinine"], correct: 1, explain: "Glucose is actively reabsorbed in the proximal tubule, so none is normally lost in urine." },
        { q: "ADH increases water reabsorption by:", opts: ["closing the collecting duct", "making the collecting duct more permeable to water", "stopping glucose reabsorption", "increasing the volume of filtrate"], correct: 1, explain: "ADH makes the collecting duct more permeable, so water leaves by osmosis." },
        { q: "Negative feedback:", opts: ["increases the change from the set point", "corrects a change and returns the level to the set point", "only works in plants", "is the same as positive feedback"], correct: 1, explain: "Negative feedback reverses the change, keeping a variable close to its set point." },
        { q: "The loop of Henle creates a:", opts: ["glucose gradient in the medulla", "salt gradient in the medulla", "pH gradient in the cortex", "temperature gradient in the blood"], correct: 1, explain: "Active transport of salt out of the ascending limb creates a concentration gradient in the medulla." },
        { q: "Which of these is produced in anaerobic respiration in yeast but not in mammalian muscle?", opts: ["Lactate", "Ethanol and carbon dioxide", "Pyruvate", "ATP"], correct: 1, explain: "Yeast converts pyruvate to ethanol and carbon dioxide. Mammalian muscle makes lactate." },
        { q: "The Z line marks the boundary of a:", opts: ["myofibril", "sarcomere", "motor unit", "muscle fibre nucleus"], correct: 1, explain: "A sarcomere lies between two adjacent Z lines." }
      ]
    },
    {
      slug: "coordination-response-and-gene-technology",
      lesson: `# Coordination, Response and Gene Technology

Edexcel IAL Biology WBI15, Topic 8. Nervous and hormonal systems coordinate the body, and plants respond to light and gravity using hormones. Gene technology uses enzymes to cut, join and copy DNA for medicine, research and agriculture.

### Nervous coordination
- A reflex arc passes information from a receptor along a sensory neurone, through a relay neurone in the spinal cord, and along a motor neurone to an effector. It is fast and does not need conscious control.
- The resting potential is about −70 mV. The sodium-potassium pump moves three Na⁺ out and two K⁺ in, maintaining the gradient.
- An action potential is a rapid depolarisation as voltage-gated sodium channels open, followed by repolarisation as potassium channels open. The myelin sheath allows saltatory conduction.
- At a cholinergic synapse, an action potential causes Ca²⁺ to enter the presynaptic knob. Vesicles of acetylcholine fuse with the membrane, and the transmitter diffuses across the cleft and binds to receptors. Acetylcholinesterase breaks it down.

### Hormonal coordination
- Insulin is released from β cells when blood glucose is high. It increases glucose uptake and glycogenesis, and lowers blood glucose.
- Glucagon is released from α cells when blood glucose is low. It stimulates glycogenolysis and gluconeogenesis.
- Adrenaline prepares the body for fight or flight by raising heart rate and glucose release.

### Plant responses
- Auxin is made in the shoot tip and moves to the shaded side of a shoot. Cells on that side elongate faster, so the shoot bends towards the light (positive phototropism).
- Roots show positive gravitropism and shoots show negative gravitropism.

### Gene technology
- Restriction endonucleases cut DNA at specific palindromic sequences. Many leave sticky ends that are complementary to each other.
- DNA ligase joins the sugar-phosphate backbone of two DNA fragments. Plasmids are used as vectors to carry the gene into bacteria.
- Reverse transcriptase makes complementary DNA (cDNA) from mRNA, so the cDNA has no introns.
- In PCR, the sample is heated to separate the strands, primers anneal, and Taq polymerase extends the new strands. Each cycle doubles the amount of DNA.

Exam tip: for a question on synapses, give the steps in order: action potential, calcium entry, vesicle fusion, diffusion, binding, and then removal of the transmitter.`,
      questions: [
        { q: "What is the typical resting potential of a neurone?", opts: ["+70 mV", "−70 mV", "0 mV", "+30 mV"], correct: 1, explain: "The resting potential is about −70 mV, with the inside negative relative to the outside." },
        { q: "The sodium-potassium pump moves:", opts: ["two Na⁺ out and three K⁺ in", "three Na⁺ out and two K⁺ in", "three Na⁺ in and two K⁺ out", "equal numbers of each ion in both directions"], correct: 1, explain: "The pump uses ATP to move three sodium ions out and two potassium ions in." },
        { q: "During repolarisation, which channels open?", opts: ["Voltage-gated sodium channels", "Voltage-gated potassium channels", "Ligand-gated chloride channels only", "Aquaporins"], correct: 1, explain: "Potassium channels open so K⁺ leaves the cell and restores the negative potential." },
        { q: "Saltatory conduction is faster because:", opts: ["the neurone is thicker everywhere", "action potentials jump between nodes of Ranvier along the myelin sheath", "the synapse is removed", "the membrane has no sodium channels"], correct: 1, explain: "The myelin sheath insulates the axon, so the impulse jumps from node to node." },
        { q: "At a cholinergic synapse, what triggers the release of neurotransmitter?", opts: ["Entry of Na⁺ into the synaptic cleft", "Entry of Ca²⁺ into the presynaptic knob", "Breakdown of acetylcholine", "Release of insulin"], correct: 1, explain: "Calcium entry causes vesicles to fuse with the presynaptic membrane and release acetylcholine." },
        { q: "Which enzyme breaks down acetylcholine in the synaptic cleft?", opts: ["Acetylcholinesterase", "Lipase", "Amylase", "Helicase"], correct: 0, explain: "Acetylcholinesterase hydrolyses acetylcholine so the signal stops." },
        { q: "Insulin is released from which cells, and when?", opts: ["α cells when blood glucose is low", "β cells when blood glucose is high", "α cells when blood glucose is high", "β cells when blood glucose is low"], correct: 1, explain: "β cells in the islets of Langerhans release insulin when blood glucose rises." },
        { q: "Glucagon acts to:", opts: ["lower blood glucose by glycogenesis", "raise blood glucose by glycogenolysis and gluconeogenesis", "increase glucose uptake into muscle only", "close the sodium channels"], correct: 1, explain: "Glucagon raises blood glucose by breaking down glycogen and making glucose from other sources." },
        { q: "Auxin causes a shoot to bend towards light because:", opts: ["cells on the shaded side elongate faster", "cells on the lit side elongate faster", "the shoot tip dies", "the roots grow towards the light"], correct: 0, explain: "Auxin accumulates on the shaded side, so those cells elongate more and the shoot bends towards the light." },
        { q: "Which type of gravitropism do roots show?", opts: ["Negative", "Positive", "No response", "Only in darkness"], correct: 1, explain: "Roots grow downwards towards gravity, which is positive gravitropism." },
        { q: "Restriction endonucleases cut DNA at:", opts: ["random positions", "specific palindromic sequences", "only the ends of chromosomes", "the sugar-phosphate backbone in no sequence"], correct: 1, explain: "Restriction enzymes recognise specific palindromic sequences and cut there." },
        { q: "DNA ligase is used to:", opts: ["cut DNA into fragments", "join DNA fragments by forming bonds in the backbone", "separate DNA strands by heating", "make mRNA from DNA"], correct: 1, explain: "DNA ligase seals the sugar-phosphate backbone between two DNA fragments." },
        { q: "Complementary DNA (cDNA) is made from:", opts: ["mRNA using reverse transcriptase", "DNA using RNA polymerase", "tRNA using helicase", "ribosomes using ligase"], correct: 0, explain: "Reverse transcriptase makes cDNA from an mRNA template, so it has no introns." },
        { q: "In PCR, the heating step separates the DNA strands. What is this step called?", opts: ["Annealing", "Denaturation", "Extension", "Ligation"], correct: 1, explain: "Denaturation separates the double-stranded DNA into single strands." },
        { q: "Which enzyme extends the new DNA strands in PCR?", opts: ["Taq polymerase", "Restriction endonuclease", "Lactase", "Helicase"], correct: 0, explain: "Taq polymerase is heat-stable and extends primers at high temperature." },
        { q: "A plasmid is used in gene technology as a:", opts: ["restriction enzyme", "vector to carry the gene into a host cell", "primer for PCR", "source of ribosomes"], correct: 1, explain: "Plasmids carry the target gene into bacteria or other host cells." },
        { q: "Which hormone prepares the body for fight or flight?", opts: ["Insulin", "Glucagon", "Adrenaline", "ADH"], correct: 2, explain: "Adrenaline raises heart rate and blood glucose during stress." }
      ]
    }
  ]
};
