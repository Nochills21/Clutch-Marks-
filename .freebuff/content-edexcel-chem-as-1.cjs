// Edexcel International AS Chemistry (WCH11-WCH13), topics 1-5. Answers are 0-based.
module.exports = {
  subject: "chemistry",
  level: "AS",
  topics: [
    {
      slug: "formulae-equations-and-amount-of-substance",
      lesson: `# Formulae, Equations and Amount of Substance

Edexcel IAL Chemistry WCH11, Topic 1. The mole is the bridge between the mass you can weigh and the number of particles a reaction actually uses, so every quantitative question in the course depends on it.

### Relative masses and the mole
- Relative atomic mass (Ar) and relative molecular mass (Mr) are based on the carbon-12 scale.
- One mole contains the Avogadro constant, 6.02 × 10²³ particles, and the molar mass in g mol⁻¹ equals Mr numerically.
- Moles: n = m / M. Rearrange to find mass (m = n × M) or molar mass (M = m / n).

### Empirical and molecular formulae
- Convert percentage (or mass) composition to moles, divide by the smallest value and multiply until the ratios are whole numbers.
- The molecular formula is a whole-number multiple of the empirical formula: n = Mr / Mr(empirical formula).

### Equations and reacting masses
- Balance equations by conserving each element, then use the coefficients as mole ratios.
- Limiting reagent: work out the moles each reactant could give, then take the smallest.
- Percentage yield = actual yield / theoretical yield × 100.

### Solutions and gases
- Concentration c = n / V, with V in dm³ (cm³ ÷ 1000). Titration data follow the same route.
- At room temperature and pressure one mole of gas occupies 24 dm³, so n = V / 24.

Exam tip: write the unit on every line of working, and check that your final answer has the same number of significant figures as the least precise data given.`,
      questions: [
        { q: "What is the mass of 0.50 mol of sodium chloride? (Ar: Na = 23.0, Cl = 35.5)", opts: ["29.25 g", "58.5 g", "11.7 g", "117 g"], correct: 0, explain: "Mr of NaCl = 58.5, so mass = 0.50 × 58.5 = 29.25 g." },
        { q: "How many moles are present in 4.0 g of sodium hydroxide? (Mr = 40)", opts: ["0.01 mol", "0.16 mol", "1.0 mol", "0.10 mol"], correct: 3, explain: "n = m / M = 4.0 / 40 = 0.10 mol." },
        { q: "How many moles of solute are in 25.0 cm³ of 0.200 mol dm⁻³ solution?", opts: ["0.05 mol", "0.0005 mol", "0.005 mol", "0.5 mol"], correct: 2, explain: "n = c × V = 0.200 × (25.0 / 1000) = 0.005 mol." },
        { q: "A compound contains 40.0% C, 6.7% H and 53.3% O by mass. What is its empirical formula?", opts: ["C2H4O2", "CHO", "C3H6O3", "CH2O"], correct: 3, explain: "Moles: C 3.33, H 6.7, O 3.33; dividing by 3.33 gives 1 : 2 : 1, so CH2O." },
        { q: "What volume does 0.10 mol of carbon dioxide occupy at room temperature and pressure?", opts: ["0.24 dm³", "24 dm³", "2.4 dm³", "4.8 dm³"], correct: 2, explain: "V = n × 24 = 0.10 × 24 = 2.4 dm³." },
        { q: "In the balanced equation C3H8 + ? O2 → 3CO2 + 4H2O, what is the coefficient of O2?", opts: ["3", "4", "5", "10"], correct: 2, explain: "Oxygen atoms on the right: 6 + 4 = 10, so 5 O2 molecules are needed." },
        { q: "Magnesium (0.10 mol) reacts with hydrochloric acid (0.10 mol) by Mg + 2HCl → MgCl2 + H2. How many moles of hydrogen form?", opts: ["0.025 mol", "0.10 mol", "0.20 mol", "0.05 mol"], correct: 3, explain: "HCl is limiting: 0.10 mol HCl gives 0.05 mol H2 (2 mol HCl per mol H2)." },
        { q: "A reaction has a theoretical yield of 10.0 g and an actual yield of 7.5 g. What is the percentage yield?", opts: ["133%", "25%", "7.5%", "75%"], correct: 3, explain: "Percentage yield = 7.5 / 10.0 × 100 = 75%." },
        { q: "3.0 g of a gas contains 0.050 mol. What is its molar mass?", opts: ["6.0 g mol⁻¹", "0.017 g mol⁻¹", "60 g mol⁻¹", "150 g mol⁻¹"], correct: 2, explain: "M = m / n = 3.0 / 0.050 = 60 g mol⁻¹." },
        { q: "How many water molecules are present in 0.50 mol of H2O?", opts: ["6.02 × 10²³", "3.01 × 10²³", "1.20 × 10²⁴", "6.02 × 10²²"], correct: 1, explain: "0.50 × 6.02 × 10²³ = 3.01 × 10²³ molecules." },
        { q: "25.0 cm³ of 0.10 mol dm⁻³ NaOH is neutralised by 12.5 cm³ of sulfuric acid. What is the concentration of the acid? (2NaOH + H2SO4 → Na2SO4 + 2H2O)", opts: ["0.10 mol dm⁻³", "0.0025 mol dm⁻³", "0.025 mol dm⁻³", "0.05 mol dm⁻³"], correct: 0, explain: "NaOH moles = 0.0025; acid moles = 0.00125; concentration = 0.00125 / 0.0125 = 0.10 mol dm⁻³." },
        { q: "The empirical formula is CH2O and the Mr is 180. What is the molecular formula?", opts: ["C6H12O6", "C3H6O3", "C2H4O2", "C12H24O12"], correct: 0, explain: "Mr of CH2O = 30; 180 / 30 = 6, so C6H12O6." },
        { q: "How many moles of NaCl are in 500 cm³ of a 2.0 mol dm⁻³ solution?", opts: ["0.25 mol", "0.001 mol", "1.0 mol", "4.0 mol"], correct: 2, explain: "n = 2.0 × (500 / 1000) = 1.0 mol." },
        { q: "What is the percentage by mass of oxygen in water? (Ar: H = 1.0, O = 16.0)", opts: ["11.1%", "50.0%", "16.0%", "88.9%"], correct: 3, explain: "Mr of H2O = 18; 16 / 18 × 100 = 88.9%." },
        { q: "How many moles are in 48 dm³ of oxygen gas at room temperature and pressure?", opts: ["2.0 mol", "1.0 mol", "24 mol", "0.5 mol"], correct: 0, explain: "n = V / 24 = 48 / 24 = 2.0 mol." }
      ]
    },
    {
      slug: "atomic-structure-and-the-periodic-table",
      lesson: `# Atomic Structure and the Periodic Table

Edexcel IAL Chemistry WCH11, Topic 2. The periodic table is not a list to memorise: its rows and columns follow directly from how electrons fill shells and sub-shells.

### Atoms, isotopes and mass spectrometry
- Protons and neutrons make up the nucleus; the mass number is protons plus neutrons, and the atomic number is the number of protons.
- Isotopes have the same number of protons and different numbers of neutrons, so the same chemistry but a different mass.
- Relative atomic mass is the weighted mean of isotopic masses. In a mass spectrum, abundance is read from the peak heights.

### Electron configuration
- Electrons fill orbitals in order of energy: 1s, 2s, 2p, 3s, 3p, 4s, 3d and so on, each orbital holding at most two electrons with opposite spins.
- Write configurations such as 1s² 2s² 2p⁶ for neon; for transition metals the 4s electrons are lost before the 3d electrons when forming ions.

### Periodic trends
- Ionisation energy increases across a period because nuclear charge rises with similar shielding, and falls down a group as the outer electrons sit further from the nucleus.
- Atomic radius falls across a period and rises down a group.
- Successive ionisation energies reveal the group of an element: a large jump appears after the outer-shell electrons are removed.

### Electron arrangement and the table
- Period number = highest principal quantum number in use; group number relates to the number of outer electrons.
- Blocks: s-block (groups 1-2), p-block (groups 13-18), d-block (transition metals).

Exam tip: when explaining an ionisation energy trend, name the factor (nuclear charge, shielding, distance) and say which way it changes.`,
      questions: [
        { q: "Which particle determines the atomic number of an element?", opts: ["Neutron", "Proton", "Electron in the outer shell", "Nucleon"], correct: 1, explain: "The atomic number is the number of protons in the nucleus." },
        { q: "Chlorine-35 and chlorine-37 are isotopes. Which statement is correct?", opts: ["They have different numbers of protons", "They have the same number of neutrons", "They have the same number of protons and different numbers of neutrons", "They have different chemical properties"], correct: 2, explain: "Isotopes share the proton count, so they have the same chemistry, but differ in neutron number and hence mass." },
        { q: "What is the electron configuration of a neutral oxygen atom (atomic number 8)?", opts: ["1s² 2s² 2p⁴", "1s² 2s² 2p⁶", "1s² 2s¹ 2p⁵", "1s² 2s² 2p² 2d²"], correct: 0, explain: "Eight electrons fill 1s² 2s² and leave four in 2p." },
        { q: "Which orbital fills after 3p and before 3d?", opts: ["4s", "2p", "3s", "4p"], correct: 0, explain: "The Aufbau order puts 4s (lower energy) before 3d." },
        { q: "Across Period 3 from sodium to argon, what happens to atomic radius?", opts: ["It increases steadily", "It decreases", "It stays constant", "It increases then decreases"], correct: 1, explain: "Nuclear charge rises with similar shielding, pulling the electron cloud inwards." },
        { q: "Why does first ionisation energy fall from magnesium to aluminium?", opts: ["Aluminium has a smaller nuclear charge", "The outer electron in aluminium is in a 3p orbital, which is higher in energy than 3s", "Aluminium has more shielding", "Aluminium has fewer protons than magnesium"], correct: 1, explain: "The 3p electron in aluminium is higher in energy and slightly easier to remove than the 3s pair in magnesium." },
        { q: "The first ionisation energies of an element show a large jump between the 4th and 5th electrons removed. In which group is the element?", opts: ["Group 1", "Group 2", "Group 3", "Group 4"], correct: 2, explain: "A large jump after three electrons means three outer electrons; that is Group 3." },
        { q: "What is the relative atomic mass of an element with isotopes 10 (20% abundance) and 11 (80% abundance)?", opts: ["10.0", "10.8", "10.5", "11.0"], correct: 1, explain: "Ar = (10 × 20 + 11 × 80) / 100 = 10.8." },
        { q: "In a mass spectrum, what does the height of a peak show?", opts: ["The mass of the isotope", "The relative abundance of the isotope", "The number of electrons", "The ionisation energy"], correct: 1, explain: "Peak height is proportional to abundance; peak position gives the mass-to-charge ratio." },
        { q: "Which element has the electron configuration 1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹?", opts: ["Potassium", "Calcium", "Scandium", "Argon"], correct: 0, explain: "Nineteen electrons in total: potassium has one electron in 4s." },
        { q: "Which block of the periodic table contains the transition metals?", opts: ["s-block", "p-block", "d-block", "f-block only"], correct: 2, explain: "Transition metals fill d sub-shells, forming the d-block." },
        { q: "Which of these has the largest atomic radius?", opts: ["Lithium", "Sodium", "Potassium", "Caesium"], correct: 3, explain: "Atomic radius increases down a group, so caesium is largest among these." },
        { q: "What is the electron configuration of the Fe²⁺ ion? (Fe: [Ar] 3d⁶ 4s²)", opts: ["[Ar] 3d⁴ 4s²", "[Ar] 3d⁶", "[Ar] 3d⁵ 4s¹", "[Ar] 3d⁴"], correct: 1, explain: "The 4s electrons are removed first, leaving [Ar] 3d⁶." },
        { q: "Why does ionisation energy generally increase across a period?", opts: ["Atomic radius increases", "Nuclear charge increases with similar shielding", "Shielding increases", "The number of shells increases"], correct: 1, explain: "Extra protons pull the electrons more strongly while shielding is essentially constant across the period." },
        { q: "Which group contains elements with two electrons in the outer shell?", opts: ["Group 1", "Group 2", "Group 13", "Group 0"], correct: 1, explain: "Group 2 (alkaline earth metals) has two outer-shell electrons." },
        { q: "Which of these is the first ionisation energy equation for magnesium?", opts: ["Mg(g) → Mg⁺(g) + e⁻", "Mg(s) → Mg(g)", "Mg(g) + e⁻ → Mg⁻(g)", "Mg²⁺(g) → Mg(g) + 2e⁻"], correct: 0, explain: "First ionisation energy removes one electron from a gaseous atom to form a gaseous +1 ion." }
      ]
    },
    {
      slug: "bonding-and-structure",
      lesson: `# Bonding and Structure

Edexcel IAL Chemistry WCH11, Topic 3. Bonding explains the physical properties of a substance: melting point, conductivity and solubility all follow from the type of bond and the way particles are packed.

### Ionic bonding
- Ionic bonds are the electrostatic attraction between oppositely charged ions in a giant lattice.
- They have high melting points, are brittle and conduct only when molten or dissolved, because the ions are free to move.

### Covalent bonding
- A covalent bond is a shared pair of electrons between two atoms. Simple molecular substances have low melting points because only weak intermolecular forces are overcome.
- Giant covalent structures such as diamond and silicon(IV) oxide need many strong bonds broken to melt, so they have very high melting points.
- Graphite conducts because each carbon uses three electrons in bonding, leaving one delocalised electron per atom.

### Electronegativity and polarity
- Electronegativity is the ability of an atom to attract the bonding pair. The difference between two atoms gives a polar bond.
- A molecule is polar only if its bond dipoles do not cancel. Shape decides this: CO2 is linear and non-polar, while H2O is bent and polar.

### Shapes of molecules
- Electron pairs repel each other, so they arrange themselves as far apart as possible. Lone pairs repel more strongly than bonding pairs.
- Common shapes: linear (180°), trigonal planar (120°), tetrahedral (109.5°), and bent or pyramidal forms when lone pairs are present.

### Metallic bonding
- Metals consist of positive ions in a sea of delocalised electrons, which explains conductivity, malleability and high melting points.

Exam tip: a question asking why a substance conducts must name the mobile particle — ions, delocalised electrons — not just "electrons".`,
      questions: [
        { q: "Why does solid sodium chloride not conduct electricity?", opts: ["It has no charged particles", "Its ions are fixed in the lattice", "It is a covalent compound", "Its electrons are localised on atoms"], correct: 1, explain: "Ions are held in place in the lattice; they become mobile only when molten or dissolved." },
        { q: "Which substance has the highest melting point?", opts: ["Iodine", "Diamond", "Water", "Methane"], correct: 1, explain: "Diamond is a giant covalent lattice, requiring many strong C–C bonds to be broken." },
        { q: "What is the shape of the carbon dioxide molecule?", opts: ["Bent", "Trigonal planar", "Linear", "Tetrahedral"], correct: 2, explain: "CO2 has two bonding regions and no lone pairs on carbon, so it is linear." },
        { q: "What is the bond angle in ammonia, NH3?", opts: ["120°", "109.5°", "107°", "104.5°"], correct: 2, explain: "NH3 is pyramidal with one lone pair; the lone pair compresses the angle to about 107°." },
        { q: "Which molecule is polar?", opts: ["BF3", "CCl4", "CO2", "NH3"], correct: 3, explain: "NH3 is pyramidal, so its bond dipoles do not cancel. BF3, CCl4 and CO2 are symmetrical and non-polar." },
        { q: "Why does graphite conduct electricity?", opts: ["It contains free ions", "Each carbon has one delocalised electron", "It has metallic bonding", "Its layers are ionic"], correct: 1, explain: "Each carbon bonds to three others, leaving one electron per atom free to move between layers." },
        { q: "What type of bonding holds the atoms together in a metal?", opts: ["Ionic bonding", "Covalent bonding", "Metallic bonding", "Hydrogen bonding"], correct: 2, explain: "Metallic bonding is the attraction between positive ions and a sea of delocalised electrons." },
        { q: "Which pair of atoms forms the most polar bond?", opts: ["C–H", "H–Cl", "C–C", "Cl–Cl"], correct: 1, explain: "The electronegativity difference between H and Cl (about 0.9) is the largest of these pairs." },
        { q: "What is the shape of the SF6 molecule?", opts: ["Trigonal planar", "Octahedral", "Tetrahedral", "Square planar"], correct: 1, explain: "Six bonding pairs around sulfur arrange octahedrally at 90°." },
        { q: "Why does silicon(IV) oxide have a very high melting point?", opts: ["It has delocalised electrons", "It is a giant covalent network with many strong bonds to break", "It is made of small molecules", "It has ionic lattice energy"], correct: 1, explain: "Melting requires breaking many strong covalent Si–O bonds throughout the giant structure." },
        { q: "Which electron-pair arrangement gives a bond angle of 109.5°?", opts: ["Linear", "Trigonal planar", "Tetrahedral", "Octahedral"], correct: 2, explain: "Four bonding pairs arranged tetrahedrally give 109.5° between bonds." },
        { q: "Which of these best explains why ionic compounds are brittle?", opts: ["Their ions are held by directional covalent bonds", "Shifting layers brings like-charged ions together and they repel", "Their electrons are delocalised", "They have weak intermolecular forces"], correct: 1, explain: "A displaced layer puts like-charged ions adjacent, and repulsion splits the crystal." },
        { q: "Which bond is non-polar?", opts: ["H–Cl", "O–H", "Cl–Cl", "C–O"], correct: 2, explain: "Two identical atoms share electrons equally, so Cl–Cl is non-polar." },
        { q: "How many lone pairs are on the central atom in water?", opts: ["0", "1", "2", "3"], correct: 2, explain: "Oxygen in H2O has six valence electrons: two bonds use two, leaving two lone pairs." },
        { q: "Why is iodine a solid at room temperature while chlorine is a gas?", opts: ["Iodine has ionic bonds", "Iodine has stronger covalent bonds", "Iodine has stronger intermolecular forces because it has more electrons", "Chlorine has metallic bonding"], correct: 2, explain: "Iodine molecules have more electrons, so larger London forces hold them together more strongly." },
        { q: "Which substance is a giant ionic lattice?", opts: ["Magnesium oxide", "Carbon dioxide", "Ammonia", "Diamond"], correct: 0, explain: "Magnesium oxide is an ionic giant lattice of Mg²⁺ and O²⁻ ions." }
      ]
    },
    {
      slug: "introductory-organic-chemistry-and-alkanes",
      lesson: `# Introductory Organic Chemistry and Alkanes

Edexcel IAL Chemistry WCH11, Topic 4. Organic chemistry is the chemistry of carbon compounds. Alkanes are the simplest family, and their reactions introduce the radical substitution mechanism used throughout the course.

### Naming and formulae
- A homologous series has the same general formula, similar chemical properties and a gradual change in physical properties.
- Alkanes have the general formula CnH2n+2. Names depend on the longest carbon chain: meth-, eth-, prop-, but-, pent-, hex-.
- Structural isomers have the same molecular formula but different connectivity, such as butane and methylpropane.

### Fossil fuels and cracking
- Alkanes are obtained from crude oil by fractional distillation; the fractions separate by boiling point, which rises with chain length.
- Cracking breaks long chains into shorter, more useful alkanes and alkenes, using heat or a catalyst.

### Radical substitution
- Alkanes react with chlorine or bromine under UV light by free-radical substitution.
- The three stages are initiation (Cl2 → 2Cl•), propagation (a radical reacts with an alkane, regenerating a radical) and termination (two radicals combine).
- Propagation steps form the product; termination steps are rare, so they do not appear in the main yield.

### Combustion
- Complete combustion gives carbon dioxide and water; limited oxygen gives carbon monoxide or carbon (soot).

Exam tip: when writing a radical mechanism, use a single-headed arrow for each electron moved and always show the radical dot.`,
      questions: [
        { q: "What is the general formula of the alkane homologous series?", opts: ["CnH2n", "CnH2n+2", "CnH2n-2", "CnH2n+1"], correct: 1, explain: "Alkanes are saturated hydrocarbons with the general formula CnH2n+2." },
        { q: "What is the name of C4H10 with a straight chain?", opts: ["Methylpropane", "Butane", "Pentane", "Propane"], correct: 1, explain: "Four carbons in a straight chain form butane." },
        { q: "Which pair are structural isomers?", opts: ["Butane and methylpropane", "Ethane and ethene", "Propane and propanol", "Methane and ethane"], correct: 0, explain: "Same molecular formula C4H10 but different structures." },
        { q: "What is the first step of free-radical substitution of methane with chlorine?", opts: ["Propagation: CH3 + Cl2", "Initiation: Cl2 → 2Cl•", "Termination: Cl• + Cl•", "Chain transfer to HCl"], correct: 1, explain: "The UV-driven homolytic fission of Cl2 is the initiation step." },
        { q: "Which species is the radical that propagates the chain in chlorination of methane?", opts: ["Cl⁻", "CH3•", "HCl", "CH3Cl"], correct: 1, explain: "CH3• reacts with Cl2 to form CH3Cl and a new Cl• radical." },
        { q: "What is the main product of the complete combustion of propane?", opts: ["Carbon and water", "Carbon monoxide and water", "Carbon dioxide and water", "Carbon dioxide and hydrogen"], correct: 2, explain: "Complete combustion of a hydrocarbon gives CO2 and H2O only." },
        { q: "Which fraction of crude oil has the highest boiling point?", opts: ["Petrol", "Bitumen", "Kerosene", "Naphtha"], correct: 1, explain: "Bitumen contains the longest chains and therefore has the highest boiling point." },
        { q: "What is the purpose of cracking?", opts: ["To add hydrogen to alkanes", "To make long-chain alkanes from short ones", "To break long chains into shorter, more useful molecules", "To remove sulfur from crude oil"], correct: 2, explain: "Cracking converts long-chain fractions into shorter alkanes and alkenes that are more in demand." },
        { q: "Why does the boiling point of alkanes increase with chain length?", opts: ["Bonds become stronger", "Van der Waals forces increase with greater surface contact", "Covalent bonds become polar", "Molecules become ionic"], correct: 1, explain: "Longer chains have larger surface areas, so London dispersion forces are greater." },
        { q: "Which conditions are needed for the radical substitution of alkanes?", opts: ["Dark, high pressure", "UV light", "Aqueous acid", "Room temperature in water"], correct: 1, explain: "UV light provides the energy to split Cl2 into radicals." },
        { q: "What is the name of C5H12 with a branch on the second carbon of a four-carbon chain?", opts: ["Pentane", "2-methylbutane", "2,2-dimethylpropane", "Hexane"], correct: 1, explain: "A methyl branch on C2 of butane gives 2-methylbutane." },
        { q: "Which product forms in the termination step of chlorination of methane?", opts: ["CH3Cl", "C2H6", "HCl", "CH2Cl2"], correct: 1, explain: "Two methyl radicals combine to give ethane, C2H6." },
        { q: "Why does incomplete combustion produce carbon monoxide?", opts: ["Too much oxygen is supplied", "Oxygen supply is limited", "The fuel is an alkene", "The temperature is too low to ignite"], correct: 1, explain: "With limited oxygen, carbon is oxidised only partially to CO." },
        { q: "What does the prefix 'pent-' indicate?", opts: ["Four carbon atoms", "Five carbon atoms", "Six carbon atoms", "Three carbon atoms"], correct: 1, explain: "Pent- indicates five carbon atoms in the longest chain." },
        { q: "Which statement about the propagation step is correct?", opts: ["It consumes radicals", "It produces a new radical as well as the product", "It forms the initiator", "It involves two species combining"], correct: 1, explain: "Propagation steps use one radical and regenerate another, keeping the chain going." },
        { q: "Which product is formed when chlorine reacts with ethane?", opts: ["Chloroethane", "Ethene", "Dichloroethene", "Ethanol"], correct: 0, explain: "Substitution replaces one hydrogen with chlorine, giving chloroethane and HCl." }
      ]
    },
    {
      slug: "alkenes",
      lesson: `# Alkenes

Edexcel IAL Chemistry WCH11, Topic 5. Alkenes contain a carbon–carbon double bond, which makes them far more reactive than alkanes. Their addition reactions are a central part of organic synthesis.

### Structure and bonding
- A C=C double bond consists of one sigma bond and one pi bond. The pi bond is an electron cloud above and below the plane of the atoms, and it is the reactive part.
- The carbons of a C=C bond are planar, with bond angles of about 120°.

### Addition reactions
- Hydrogen adds across the double bond in the presence of a nickel catalyst to form an alkane.
- Halogens (for example bromine water) add across the double bond: a colour change from orange to colourless is the test for an alkene.
- Steam adds across the double bond in the presence of phosphoric acid to form an alcohol.
- Hydrogen halides add to give halogenoalkanes; with unsymmetrical alkenes the Markovnikov rule predicts the major product.

### Polymerisation
- Addition polymers form when many alkene monomers join together. Poly(ethene) and poly(chloroethene) are examples.
- The repeat unit is drawn with the double bond opened and the bonds extended through brackets.

### Isomerism
- Restricted rotation about the C=C bond allows E/Z isomers when each carbon carries two different groups.

Exam tip: when drawing a polymer, show the repeat unit with the bonds extending outwards, and do not leave a dangling double bond.`,
      questions: [
        { q: "What is the test for a C=C double bond?", opts: ["Acidified potassium manganate(VII) remains purple", "Bromine water turns from orange to colourless", "Lime water turns milky", "Litmus turns red"], correct: 1, explain: "Alkenes decolourise bromine water by addition across the double bond." },
        { q: "What type of bond is the pi bond in an alkene?", opts: ["A single covalent bond formed head-on", "An electron cloud above and below the plane of the atoms", "An ionic bond", "A metallic bond"], correct: 1, explain: "The pi bond is sideways overlap of p-orbitals, giving electron density above and below the molecular plane." },
        { q: "What is the product of ethene reacting with hydrogen in the presence of a nickel catalyst?", opts: ["Ethane", "Ethanol", "Ethyne", "Chloroethane"], correct: 0, explain: "Hydrogenation adds H2 across the double bond to form ethane." },
        { q: "Which reagent converts ethene to ethanol?", opts: ["Sodium hydroxide solution at room temperature", "Steam with a phosphoric acid catalyst", "Bromine in an inert solvent", "Hydrogen chloride gas only"], correct: 1, explain: "Hydration with steam over an acid catalyst gives ethanol." },
        { q: "Which is the repeat unit of poly(ethene)?", opts: ["–CH2–CH2–", "–CH=CH–", "–CH2–CHCl–", "–C(CH3)=CH2–"], correct: 0, explain: "The addition polymer repeat unit is –CH2–CH2–, from the monomer ethene." },
        { q: "What is the major product of adding HBr to propene?", opts: ["1-bromopropane", "2-bromopropane", "1,2-dibromopropane", "Bromopropene"], correct: 1, explain: "The Markovnikov rule puts Br on the more substituted carbon, giving 2-bromopropane." },
        { q: "Which alkene shows E/Z isomerism?", opts: ["But-1-ene", "But-2-ene", "Propene", "Ethene"], correct: 1, explain: "But-2-ene has a different group on each end of the C=C bond, so it shows E/Z isomerism." },
        { q: "What is the bond angle around each carbon in a C=C double bond?", opts: ["90°", "109.5°", "120°", "180°"], correct: 2, explain: "Each sp2 carbon is trigonal planar, so the bond angles are about 120°." },
        { q: "Which conditions are used to hydrogenate an alkene?", opts: ["Nickel catalyst and heat", "UV light only", "Aqueous sodium hydroxide", "Concentrated sulfuric acid at room temperature"], correct: 0, explain: "Hydrogenation uses H2 with a nickel catalyst at around 150 °C." },
        { q: "What type of reaction is the addition of bromine to ethene?", opts: ["Substitution", "Elimination", "Electrophilic addition", "Radical substitution"], correct: 2, explain: "Br2 is polarised by the pi electrons and adds across the double bond as an electrophile." },
        { q: "What is the monomer for poly(chloroethene), also called PVC?", opts: ["Chloroethane", "Chloroethene", "Dichloroethene", "Ethyl chloride"], correct: 1, explain: "PVC is made from chloroethene, CH2=CHCl." },
        { q: "What is the molecular formula of the alkene containing five carbon atoms?", opts: ["C5H12", "C5H10", "C5H8", "C5H14"], correct: 1, explain: "Alkenes have the general formula CnH2n, so C5 gives C5H10." },
        { q: "Why is an alkene more reactive than an alkane?", opts: ["It has a stronger sigma bond", "Its pi bond has high electron density and is easily attacked", "It is always ionic", "It has more hydrogen atoms"], correct: 1, explain: "The exposed pi electron cloud attracts electrophiles, making the double bond reactive." },
        { q: "Which of these is an addition polymer's monomer?", opts: ["Ethane", "Methanol", "Propene", "Ethanoic acid"], correct: 2, explain: "Propene has a C=C double bond and polymerises to poly(propene)." },
        { q: "What is the observation when ethene reacts with bromine water?", opts: ["Orange colour disappears", "A white precipitate forms", "Bubbles of gas are given off", "The solution turns purple"], correct: 0, explain: "Bromine adds across the double bond, decolourising the orange solution." },
        { q: "Which factor allows E/Z isomers to exist?", opts: ["Free rotation about the double bond", "Restricted rotation about the C=C bond", "A triple bond", "A ring structure only"], correct: 1, explain: "The C=C bond cannot rotate, so different groups can sit on the same or opposite sides." }
      ]
    }
  ]
};
