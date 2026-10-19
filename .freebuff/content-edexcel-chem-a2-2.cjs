// Edexcel International A Level Chemistry (WCH15), topics 16-20. Answers are 0-based.
module.exports = {
  subject: "chemistry",
  level: "A2",
  topics: [
    {
      slug: "redox-equilibria",
      lesson: `# Redox Equilibria

Edexcel IAL Chemistry WCH15, Topic 16. Redox reactions transfer electrons. Standard electrode potentials let you predict whether a reaction is feasible and quantify the reducing and oxidising power of species.

### Oxidation and reduction
- Oxidation is loss of electrons and an increase in oxidation state. Reduction is gain of electrons and a decrease in oxidation state.
- The reducing agent is oxidised; the oxidising agent is reduced.

### Standard electrode potentials
- Each half-cell has a standard electrode potential, E⁰, measured under standard conditions: 298 K, 1.0 mol dm⁻³ solutions and 100 kPa for gases.
- E⁰ is measured against the standard hydrogen electrode, which is defined as 0 V.
- A more positive E⁰ means a stronger oxidising agent on the left of the half-equation. A more negative E⁰ means a stronger reducing agent.

### Predicting feasibility
- E⁰cell = E⁰(reduction) − E⁰(oxidation). A positive E⁰cell means the reaction is feasible under standard conditions.
- ΔG = −nFE. A negative ΔG (positive E⁰cell) means the reaction is spontaneous.

### Redox titrations
- Manganate(VII) is its own indicator: it is purple in solution and becomes colourless at the end point when Mn²⁺ forms.
- Acidified dichromate(VI) turns from orange to green as Cr³⁺ forms. Iodine and thiosulfate use starch, which turns blue-black with iodine and loses that colour at the end point.

Exam tip: write the ion-electron half-equations first, balance the electrons, then combine them. The ratio of electrons sets the mole ratio in titration calculations.`,
      questions: [
        { q: "The standard electrode potentials are Zn²⁺/Zn = −0.76 V and Cu²⁺/Cu = +0.34 V. What is E⁰cell for a Zn/Cu cell?", opts: ["+0.42 V", "+1.10 V", "−1.10 V", "+0.76 V"], correct: 1, explain: "E⁰cell = E⁰(Cu²⁺/Cu) − E⁰(Zn²⁺/Zn) = 0.34 − (−0.76) = +1.10 V." },
        { q: "Which species is the strongest oxidising agent: Cl₂ (E⁰ +1.36 V), Fe³⁺/Fe²⁺ (+0.77 V), Zn²⁺/Zn (−0.76 V) or Fe²⁺?", opts: ["Zn²⁺", "Fe³⁺", "Cl₂", "Fe²⁺"], correct: 2, explain: "Cl₂ has the most positive E⁰, so it is the best electron acceptor." },
        { q: "How many electrons are gained per mole of MnO₄⁻ reduced to Mn²⁺ (MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O)?", opts: ["1", "3", "5", "7"], correct: 2, explain: "Manganese changes from +7 to +2, a gain of 5 electrons." },
        { q: "Which condition is NOT part of the standard conditions for electrode potentials?", opts: ["298 K", "1.0 mol dm⁻³ solutions", "100 kPa for gases", "pH 14"], correct: 3, explain: "Standard conditions use 1.0 mol dm⁻³ solutions, so the acid is at pH 0, not pH 14." },
        { q: "A redox reaction is feasible under standard conditions when E⁰cell is:", opts: ["negative", "positive", "zero only", "equal to ΔH"], correct: 1, explain: "A positive E⁰cell gives a negative ΔG, so the reaction is spontaneous." },
        { q: "Calculate ΔG for a 2-electron cell with E⁰cell = +1.10 V (ΔG = −nFE, F = 96 500 C mol⁻¹).", opts: ["−106 kJ mol⁻¹", "+212 kJ mol⁻¹", "−212 kJ mol⁻¹", "−2.12 kJ mol⁻¹"], correct: 2, explain: "ΔG = −2 × 96 500 × 1.10 = −212 000 J mol⁻¹ ≈ −212 kJ mol⁻¹." },
        { q: "25.0 cm³ of 0.0200 mol dm⁻³ KMnO₄ is titrated against Fe²⁺ (MnO₄⁻ + 5Fe²⁺ + 8H⁺ → Mn²⁺ + 5Fe³⁺ + 4H₂O). How many moles of Fe²⁺ react?", opts: ["5.00 × 10⁻⁴ mol", "2.50 × 10⁻³ mol", "1.00 × 10⁻² mol", "1.25 × 10⁻⁴ mol"], correct: 1, explain: "Moles MnO₄⁻ = 0.0200 × 0.0250 = 5.00 × 10⁻⁴ mol; Fe²⁺ = 5 × 5.00 × 10⁻⁴ = 2.50 × 10⁻³ mol." },
        { q: "What is the end-point colour change when permanganate is titrated with no added indicator?", opts: ["Purple to colourless", "Colourless to pale pink", "Green to orange", "Orange to green"], correct: 1, explain: "The first excess of MnO₄⁻ gives a persistent pale pink or purple colour." },
        { q: "What is the oxidation state of chromium in Cr₂O₇²⁻?", opts: ["+3", "+4", "+6", "+7"], correct: 2, explain: "2x + 7(−2) = −2, so x = +6." },
        { q: "Acidified dichromate(VI) is reduced in a titration. What colour change is observed?", opts: ["Green to orange", "Orange to green", "Blue to colourless", "Yellow to red"], correct: 1, explain: "Cr₂O₇²⁻ (orange) is reduced to Cr³⁺ (green)." },
        { q: "A metal displaces another metal from its solution only if it is:", opts: ["less reactive", "more reactive, with a more negative E⁰", "of the same E⁰", "unreactive"], correct: 1, explain: "The more reactive metal, with the more negative E⁰, is the stronger reducing agent." },
        { q: "In a redox reaction, the reducing agent is:", opts: ["the species that gains electrons", "the species that is itself reduced", "the species that loses electrons (is oxidised)", "always a metal"], correct: 2, explain: "The reducing agent donates electrons and is oxidised." },
        { q: "The purpose of a salt bridge in an electrochemical cell is to:", opts: ["supply electrons to the external circuit", "complete the circuit by allowing ion flow", "act as a catalyst", "provide the reactants"], correct: 1, explain: "The salt bridge lets ions move between half-cells so charge balance is maintained." },
        { q: "A more positive standard electrode potential indicates:", opts: ["a stronger reducing agent", "a stronger oxidising agent", "a less feasible reduction", "an inert electrode"], correct: 1, explain: "Species with more positive E⁰ are better at accepting electrons." },
        { q: "In the iodine–thiosulfate titration, starch is added near the end point because:", opts: ["the blue-black starch–iodine colour disappears when iodine is used up", "starch is a catalyst", "starch is oxidised to thiosulfate", "starch removes excess thiosulfate"], correct: 0, explain: "The starch–iodine complex is blue-black; when the iodine is consumed, the colour disappears." }
      ]
    },
    {
      slug: "transition-metals-and-their-chemistry",
      lesson: `# Transition Metals and their Chemistry

Edexcel IAL Chemistry WCH15, Topic 17. Transition metals form coloured complex ions, show variable oxidation states and act as catalysts. These properties come from partly filled d orbitals.

### Complex ions and ligands
- A ligand is a species with a lone pair that forms a dative bond to a metal ion. Water, ammonia and chloride are monodentate ligands.
- Ethane-1,2-diamine is bidentate because it has two donor atoms. EDTA⁴⁻ is hexadentate.
- The coordination number is the number of coordinate bonds to the central metal ion. Common shapes are octahedral (6), tetrahedral (4), square planar (4) and linear (2, e.g. [Ag(NH₃)₂]⁺).

### Colour
- In a ligand field the five d orbitals split into two energy levels. Electrons absorb light to jump between them, and the colour seen is complementary to the colour absorbed.
- The d-orbital splitting depends on the metal, its oxidation state and the ligands. Ligand exchange changes the colour.

### Ligand substitution and isomerism
- Concentrated HCl converts [Cu(H₂O)₆]²⁺ (blue) into [CuCl₄]²⁻ (yellow-green, tetrahedral).
- Excess aqueous ammonia converts Cu²⁺ into [Cu(NH₃)₄(H₂O)₂]²⁺, a deep blue complex.
- Square planar [Pt(NH₃)₂Cl₂] shows cis-trans isomerism. The cis form is the anticancer drug cisplatin.

### Catalysis
- Heterogeneous catalysts (iron in the Haber process) work on a surface. Homogeneous catalysts such as Fe²⁺ in the iodide–peroxydisulfate reaction are in the same phase as the reactants.
- In the MnO₄⁻ and ethanedioate reaction, Mn²⁺ is the product and catalyses the reaction, so the rate increases as it forms: this is autocatalysis.

Exam tip: when a ligand exchange is asked for, name both the shape and the colour change, and write the complex formula with its charge.`,
      questions: [
        { q: "What colour is an aqueous solution of [Cu(H₂O)₆]²⁺?", opts: ["Green", "Blue", "Colourless", "Yellow"], correct: 1, explain: "Hydrated copper(II) ions give a blue solution." },
        { q: "What is the coordination number of the silver ion in [Ag(NH₃)₂]⁺?", opts: ["1", "2", "4", "6"], correct: 1, explain: "Two NH₃ ligands each form one coordinate bond, so the coordination number is 2." },
        { q: "What is the shape of [Ni(H₂O)₆]²⁺?", opts: ["Tetrahedral", "Square planar", "Octahedral", "Linear"], correct: 2, explain: "Six water ligands around the metal give an octahedral complex." },
        { q: "Adding concentrated HCl to [Cu(H₂O)₆]²⁺ forms a complex with a new shape and colour. Which is correct?", opts: ["Octahedral, blue", "Tetrahedral, yellow-green", "Square planar, pink", "Linear, colourless"], correct: 1, explain: "[CuCl₄]²⁻ is tetrahedral and yellow-green." },
        { q: "Which description fits cisplatin, [Pt(NH₃)₂Cl₂]?", opts: ["An optically active octahedral complex", "A square planar complex with the two Cl ligands adjacent (cis)", "A tetrahedral complex with optical isomers", "A linear complex"], correct: 1, explain: "Cisplatin is the cis isomer of a square planar complex." },
        { q: "Ethane-1,2-diamine is classed as which type of ligand?", opts: ["Monodentate", "Bidentate", "Hexadentate", "Not a ligand"], correct: 1, explain: "It has two lone-pair donor atoms, one on each nitrogen, so it is bidentate." },
        { q: "The colour of transition metal complexes arises from:", opts: ["electrons jumping between split d orbitals", "ionic bonds", "electron-deficient carbon atoms", "unpaired s electrons"], correct: 0, explain: "Light is absorbed as d electrons move between the split d-orbital energy levels." },
        { q: "Iron in the Haber process is an example of which catalyst?", opts: ["Homogeneous", "Heterogeneous", "Enzyme", "Autocatalyst"], correct: 1, explain: "The iron is a solid, and the gases react on its surface, so it is heterogeneous." },
        { q: "Why does the reaction between MnO₄⁻ and ethanedioate speed up as it proceeds?", opts: ["Mn²⁺, a product, catalyses the reaction", "The temperature rises with time only", "The MnO₄⁻ concentration increases", "Ethanedioate is a catalyst"], correct: 0, explain: "This is autocatalysis: the product Mn²⁺ acts as the catalyst." },
        { q: "Which of these is a transition metal ion with variable oxidation states?", opts: ["Na⁺", "Ca²⁺", "Fe²⁺ / Fe³⁺", "Al³⁺"], correct: 2, explain: "Iron can exist as Fe²⁺ and Fe³⁺; the main-group ions here do not change oxidation state." },
        { q: "Adding a few drops of NaOH to aqueous Cu²⁺ forms a precipitate of:", opts: ["Cu(OH)₂, pale blue", "Fe(OH)₃, green", "Cu(OH)₂, white", "Al(OH)₃, brown"], correct: 0, explain: "Copper(II) hydroxide is a pale blue precipitate." },
        { q: "Adding excess aqueous ammonia to Cu²⁺(aq) gives:", opts: ["a white precipitate", "a deep blue solution of [Cu(NH₃)₄(H₂O)₂]²⁺", "a colourless solution", "a yellow solution"], correct: 1, explain: "The ammonia replaces water ligands, forming a deep blue tetraammine complex." },
        { q: "Which hydroxide dissolves in excess NaOH because it is amphoteric?", opts: ["Cu(OH)₂", "Fe(OH)₂", "Cr(OH)₃", "Mg(OH)₂"], correct: 2, explain: "Cr(OH)₃ dissolves in excess alkali to form [Cr(OH)₆]³⁻." },
        { q: "Why does NH₃ replace H₂O as a ligand in [Cu(H₂O)₆]²⁺?", opts: ["NH₃ is a weaker ligand than H₂O", "NH₃ is a stronger ligand and displaces H₂O", "Water is a stronger ligand", "Ligand exchange needs heating only"], correct: 1, explain: "NH₃ binds more strongly, so it replaces water ligands." },
        { q: "What is the oxidation state of iron in [Fe(CN)₆]⁴⁻?", opts: ["+2", "+3", "+4", "−2"], correct: 0, explain: "x + 6(−1) = −4, so x = +2." }
      ]
    },
    {
      slug: "organic-arenes",
      lesson: `# Organic Chemistry: Arenes

Edexcel IAL Chemistry WCH15, Topic 18. Benzene is an arene. Its delocalised ring of six pi electrons makes it stable, so it reacts by electrophilic substitution rather than addition.

### Structure and stability
- Benzene is C₆H₆ with a planar ring. All six C–C bonds are the same length (0.139 nm), intermediate between single and double bonds.
- The measured enthalpy of hydrogenation is about −208 kJ mol⁻¹, compared with −360 kJ mol⁻¹ for a hypothetical cyclohexa-1,3,5-triene. The difference, about 150 kJ mol⁻¹, is the delocalisation energy.

### Electrophilic substitution
- The pi electron cloud is electron-rich, so the ring is a nucleophile and attacks electrophiles.
- Nitration: concentrated HNO₃ and concentrated H₂SO₄ at about 50 °C. The electrophile is NO₂⁺, and nitrobenzene forms.
- Halogenation: Br₂ with an AlBr₃ or FeBr₃ halogen carrier. The carrier polarises Br₂ to give Br⁺.
- Friedel–Crafts alkylation uses a haloalkane and AlCl₃ to add an alkyl group. Friedel–Crafts acylation uses an acyl chloride and AlCl₃ to form a phenyl ketone.

### Directing effects
- Alkyl groups, including –CH₃, direct a second substituent to the 2- and 4- (ortho and para) positions.
- A –NO₂ group directs to the 3- (meta) position.
- –OH and –NH₂ are strongly activating: phenol reacts with bromine water at room temperature to give a white precipitate of 2,4,6-tribromophenol.

### Side-chain oxidation
- Hot, acidified KMnO₄ oxidises an alkyl side chain on the ring to a carboxylic acid group. Methylbenzene forms benzoic acid.

Exam tip: when describing a mechanism, show the electrophile, the arenium intermediate with its positive charge spread over the ring, and the loss of H⁺ to restore the delocalised ring.`,
      questions: [
        { q: "The delocalisation energy of benzene is approximately:", opts: ["36 kJ mol⁻¹", "150 kJ mol⁻¹", "360 kJ mol⁻¹", "208 kJ mol⁻¹"], correct: 1, explain: "The Kekulé value (−360) minus the measured value (−208) gives about 150 kJ mol⁻¹." },
        { q: "Why are all the C–C bonds in benzene the same length?", opts: ["Each bond is a pure single bond", "Each bond is intermediate between single and double because of delocalisation", "Benzene has three double bonds at fixed positions", "The ring has strain"], correct: 1, explain: "The delocalised pi system gives bonds of equal length between single and double." },
        { q: "The electrophile in the nitration of benzene is:", opts: ["NO₂⁺", "NO₂⁻", "NO₃⁻", "H⁺"], correct: 0, explain: "The nitronium ion, NO₂⁺, is formed from HNO₃ and H₂SO₄." },
        { q: "Benzene is nitrated with concentrated HNO₃ and H₂SO₄ at about:", opts: ["room temperature only", "50 °C", "above 500 °C", "−10 °C"], correct: 1, explain: "Nitration of benzene is carried out at about 50 °C." },
        { q: "Which catalyst is needed for the bromination of benzene with Br₂?", opts: ["Nickel", "AlBr₃ or FeBr₃ (a halogen carrier)", "Platinum", "Sulfuric acid only"], correct: 1, explain: "The halogen carrier polarises Br₂ so that it can act as an electrophile." },
        { q: "Phenol reacts with bromine water at room temperature to give:", opts: ["No reaction", "2,4,6-tribromophenol as a white precipitate", "bromobenzene", "1,2-dibromoethane"], correct: 1, explain: "The –OH group activates the ring, so substitution happens without a catalyst." },
        { q: "Friedel–Crafts alkylation of benzene with CH₃Cl and AlCl₃ forms:", opts: ["methylbenzene", "chlorobenzene", "phenylamine", "benzoic acid"], correct: 0, explain: "An alkyl group is attached to the ring, giving methylbenzene." },
        { q: "Acylation of benzene with ethanoyl chloride and AlCl₃ gives:", opts: ["phenyl ethanoate", "phenylethanone (methyl phenyl ketone)", "benzaldehyde", "ethylbenzene"], correct: 1, explain: "The acyl group, CH₃CO–, is attached to the ring to give a phenyl ketone." },
        { q: "A methyl group on the benzene ring directs an incoming electrophile to:", opts: ["only the meta position", "the ortho and para positions", "only the ipso position", "nowhere"], correct: 1, explain: "Alkyl groups are electron-donating and direct to the 2- and 4- positions." },
        { q: "A nitro group on the benzene ring directs a second substitution mainly to the:", opts: ["ortho and para positions", "meta position", "ipso position", "position 1 only"], correct: 1, explain: "The –NO₂ group is electron-withdrawing and directs to the meta position." },
        { q: "Benzene does not readily undergo addition reactions because:", opts: ["it is non-polar", "addition would destroy the stable delocalised pi system", "it has no pi electrons", "hydrogen cannot approach the ring"], correct: 1, explain: "Substitution keeps the delocalised system, but addition would remove that stabilisation." },
        { q: "In electrophilic substitution, the benzene ring acts as a:", opts: ["nucleophile", "electrophile", "radical", "acid catalyst"], correct: 0, explain: "The electron-rich pi cloud donates electrons to the electrophile." },
        { q: "Nitrobenzene is converted into phenylamine by:", opts: ["heating with water", "reduction with tin and concentrated HCl", "oxidation with KMnO₄", "hydrolysis with NaOH"], correct: 1, explain: "Sn and concentrated HCl reduce –NO₂ to –NH₂." },
        { q: "Benzene reacts with chlorine in UV light by:", opts: ["electrophilic substitution", "free-radical addition, giving C₆H₆Cl₆", "nucleophilic substitution", "elimination"], correct: 1, explain: "Under UV light the reaction is free-radical addition, not substitution." },
        { q: "Hot, acidified KMnO₄ oxidises methylbenzene to:", opts: ["benzaldehyde", "benzoic acid", "phenol", "benzyl alcohol"], correct: 1, explain: "The alkyl side chain is oxidised to a –COOH group, giving benzoic acid." }
      ]
    },
    {
      slug: "organic-nitrogen-compounds",
      lesson: `# Organic Nitrogen Compounds: Amines, Amides, Amino Acids and Proteins

Edexcel IAL Chemistry WCH15, Topic 19. Amines, amides, amino acids and proteins contain nitrogen. The lone pair on nitrogen controls basicity, and the amide and peptide links join molecules into polymers.

### Amines
- Primary amines have one alkyl group on the nitrogen, for example ethylamine.
- Alkyl groups push electron density onto nitrogen, so ethylamine is a stronger base than ammonia.
- In phenylamine the lone pair is delocalised into the ring, so it is a weaker base than ammonia.
- Amines form salts with acids: CH₃NH₂ + HCl gives CH₃NH₃⁺Cl⁻.
- Preparation: a haloalkane heated with excess ethanolic ammonia gives a primary amine. The excess ammonia limits further substitution. A nitrile reduced by LiAlH₄ gives a primary amine.

### Amides
- An acyl chloride reacts with ammonia or an amine to form an amide. Ethanoyl chloride with ammonia gives ethanamide.
- Hydrolysis of an amide with hot dilute acid gives a carboxylic acid and an ammonium salt.

### Amino acids and zwitterions
- Amino acids contain –NH₂ and –COOH. In the solid and near neutral pH they exist as zwitterions, ⁺H₃NCH(R)COO⁻, with no net charge.
- At the isoelectric point the zwitterion has no net charge. In strong acid it is a cation; in alkali it is an anion.
- Amino acids can be separated by electrophoresis because their charge depends on pH.

### Peptides and proteins
- A peptide link forms when the –COOH of one amino acid condenses with the –NH₂ of another, releasing water.
- Proteins have primary (sequence), secondary (alpha helices and beta sheets, held by hydrogen bonds) and tertiary structures. Complete hydrolysis with hot acid gives amino acids.

Exam tip: when comparing base strength, explain the availability of the nitrogen lone pair, not just the names of the groups.`,
      questions: [
        { q: "Ethylamine is a stronger base than ammonia because:", opts: ["the ethyl group pushes electron density onto N, making the lone pair more available", "ammonia is ionic", "the ethyl group withdraws electron density", "ethylamine has more hydrogen atoms"], correct: 0, explain: "Alkyl groups are electron-donating, which increases the availability of the lone pair." },
        { q: "Phenylamine is a weaker base than ammonia because:", opts: ["its lone pair is delocalised into the ring", "it has more carbon atoms", "it is a salt", "the NH₂ group is absent"], correct: 0, explain: "Delocalisation of the lone pair into the ring reduces its availability to accept H⁺." },
        { q: "Heating bromoethane with excess ethanolic ammonia under pressure gives:", opts: ["ethanol", "ethylamine", "ethanenitrile", "ethanamide"], correct: 1, explain: "A nucleophilic substitution gives the primary amine ethylamine." },
        { q: "Ethanenitrile is reduced by LiAlH₄ to:", opts: ["ethylamine", "ethanal", "ethanoic acid", "ethane"], correct: 0, explain: "Reduction of a nitrile gives a primary amine: CH₃CN gives CH₃CH₂NH₂." },
        { q: "Ethanoyl chloride reacts with ammonia to give:", opts: ["ethanamide", "ethylamine", "ethanenitrile", "ethanal"], correct: 0, explain: "The acyl chloride reacts with NH₃ to form the amide CH₃CONH₂." },
        { q: "Hydrolysis of an amide with hot dilute acid forms:", opts: ["an amine only", "a carboxylic acid and an ammonium salt", "an ester", "an alkene"], correct: 1, explain: "Amide hydrolysis breaks the C–N bond, giving a carboxylic acid and NH₄⁺." },
        { q: "At its isoelectric point, an amino acid:", opts: ["exists as a zwitterion with no net charge", "is fully protonated", "has the maximum net charge", "is a gas"], correct: 0, explain: "The zwitterion has equal positive and negative charges, so the net charge is zero." },
        { q: "In strongly acidic solution, glycine exists mainly as:", opts: ["H₂NCH₂COO⁻", "⁺H₃NCH₂COOH", "H₂NCH₂COOH only", "⁻OOCCH₂NH⁻"], correct: 1, explain: "In strong acid the amino group is protonated and the carboxyl group is not ionised." },
        { q: "Forming a peptide link between two amino acids releases:", opts: ["hydrogen", "water", "carbon dioxide", "ammonia"], correct: 1, explain: "A condensation reaction joins the amino acids and releases H₂O." },
        { q: "Nylon-6,6 is formed from:", opts: ["hexanedioyl dichloride and 1,6-diaminohexane", "ethene and propene", "glucose and fructose", "ethanedioic acid and ethanol"], correct: 0, explain: "Condensation of a diacyl chloride with a diamine forms a polyamide." },
        { q: "The salt formed when an amine reacts with HCl is:", opts: ["an alkyl chloride", "an alkylammonium chloride", "an amide", "an ester"], correct: 1, explain: "The amine accepts H⁺, forming an alkylammonium salt." },
        { q: "Alpha helices and beta sheets in proteins are held together mainly by:", opts: ["ionic bonds only", "hydrogen bonds", "covalent disulfide bonds only", "van der Waals forces only"], correct: 1, explain: "Secondary structure depends on hydrogen bonds between the backbone N–H and C=O groups." },
        { q: "Amino acids can be separated by electrophoresis because:", opts: ["they have different masses only", "they have different charges at a given pH", "they are all neutral", "they sublime at different temperatures"], correct: 1, explain: "The net charge of each amino acid depends on pH, so it moves differently in an electric field." },
        { q: "Why is excess ammonia used when making a primary amine from a haloalkane?", opts: ["to prevent further substitution to secondary and tertiary amines", "to oxidise the haloalkane", "to act as an acid", "to remove water"], correct: 0, explain: "The large excess of NH₃ makes it more likely that the haloalkane reacts with NH₃ than with the amine product." },
        { q: "Complete hydrolysis of a protein by hot acid gives:", opts: ["glucose", "amino acids", "fatty acids", "nucleotides"], correct: 1, explain: "Proteins are polymers of amino acids, so hydrolysis breaks the peptide links." }
      ]
    },
    {
      slug: "organic-synthesis",
      lesson: `# Organic Synthesis

Edexcel IAL Chemistry WCH15, Topic 20. Organic synthesis plans a route from a starting material to a target molecule. You need to choose reagents and conditions, track functional groups and calculate the overall yield.

### Planning a route
- Retrosynthesis works backwards from the target: identify the functional group, then find a precursor that converts into it in one step.
- Each step should be a known functional group interconversion with suitable reagents and conditions.
- Carbon chain length can be increased with KCN, which turns a haloalkane into a nitrile. The nitrile can then be hydrolysed to a carboxylic acid or reduced to an amine.

### Key interconversions
- Primary alcohol to aldehyde: distillation with acidified dichromate(VI), so the aldehyde is removed before it oxidises further.
- Primary alcohol to carboxylic acid: reflux with excess acidified dichromate(VI).
- Aldehyde or ketone to alcohol: NaBH₄ (or LiAlH₄ for carboxylic acids and nitriles).
- Alkene to haloalkane: addition of HBr. Alkene to alcohol: steam with an acid catalyst.
- Nitrobenzene to phenylamine: reduction with Sn and concentrated HCl. Nitration of benzene is the first step of a route to phenylamine.

### Yield calculations
- Percentage yield = actual mass ÷ theoretical mass × 100.
- Overall yield for a multi-step route is the product of the individual step yields. Two steps at 80% and 70% give 0.80 × 0.70 = 0.56, or 56% overall.
- Atom economy measures the proportion of reactant atoms that end up in the desired product: (molar mass of desired product ÷ sum of molar masses of all products) × 100.

Exam tip: state the reagent, the condition (reflux, distillation, heat under pressure) and the product of each step. Marks are often given for the condition, not just the reagent.`,
      questions: [
        { q: "Two steps have yields of 80% and 70%. What is the overall yield?", opts: ["150%", "75%", "56%", "10%"], correct: 2, explain: "0.80 × 0.70 = 0.56, so the overall yield is 56%." },
        { q: "Which sequence converts bromoethane into propanoic acid?", opts: ["KCN in ethanol, then dilute acid under reflux (via the nitrile)", "NaOH(aq), then NaBH₄", "H₂ with Ni, then Br₂", "LiAlH₄, then Cl₂"], correct: 0, explain: "KCN adds one carbon to give propanenitrile, which is hydrolysed to propanoic acid." },
        { q: "Which reagent oxidises ethanol to ethanal when the product is distilled off?", opts: ["acidified dichromate(VI) with distillation", "NaBH₄", "concentrated H₂SO₄ only", "LiAlH₄"], correct: 0, explain: "Distilling off the aldehyde prevents it being oxidised further to ethanoic acid." },
        { q: "Ethanal is converted to ethanol by:", opts: ["oxidation with KMnO₄", "reduction with NaBH₄", "hydrolysis with water", "esterification"], correct: 1, explain: "NaBH₄ reduces the C=O group of an aldehyde to a primary alcohol." },
        { q: "Ethene is converted industrially to ethanol by:", opts: ["hydration with steam over an acid catalyst", "reaction with NaOH", "reduction with H₂", "oxidation with O₂ only"], correct: 0, explain: "Steam adds across the C=C bond in the presence of an acid catalyst." },
        { q: "Benzene is converted into phenylamine by:", opts: ["nitration then reduction", "reduction then nitration", "hydrolysis then oxidation", "direct addition of NH₃"], correct: 0, explain: "Nitration introduces –NO₂, which is then reduced to –NH₂." },
        { q: "Hydrolysis of propanenitrile with dilute acid under reflux gives:", opts: ["propanoic acid", "propan-1-amine", "propan-1-ol", "propanal"], correct: 0, explain: "Acid hydrolysis converts the –CN group into –COOH." },
        { q: "Ethene reacts with HBr to form:", opts: ["bromoethane", "1,2-dibromoethane", "ethanol", "ethanal"], correct: 0, explain: "HBr adds across the C=C bond to give bromoethane." },
        { q: "Reducing a carboxylic acid with LiAlH₄ gives:", opts: ["a primary alcohol", "a ketone", "an ester", "an amide"], correct: 0, explain: "LiAlH₄ reduces –COOH all the way to –CH₂OH." },
        { q: "Working backwards from a target molecule to starting materials is called:", opts: ["retrosynthesis", "polymerisation", "hydrolysis", "titration"], correct: 0, explain: "Retrosynthesis plans a route by identifying possible precursors." },
        { q: "Which two reagents reduce a nitrile to a primary amine?", opts: ["LiAlH₄ or H₂ with a Ni catalyst", "NaBH₄ only", "dilute HCl only", "bromine water"], correct: 0, explain: "Both reductions convert –CN into –CH₂NH₂." },
        { q: "Phenol can be made from chlorobenzene by heating with:", opts: ["NaOH under high temperature and pressure", "water alone at room temperature", "NaBH₄", "Br₂ only"], correct: 0, explain: "Nucleophilic substitution with hot, pressurised NaOH replaces the Cl with OH." },
        { q: "Atom economy is defined as:", opts: ["the percentage of reactant atoms that end up in the desired product", "the percentage yield", "the rate of reaction", "the enthalpy change of reaction"], correct: 0, explain: "Atom economy measures how much of the reactant mass ends up in the wanted product." },
        { q: "Ethanoic acid is converted into ethyl ethanoate by heating with:", opts: ["ethanol and a strong acid catalyst", "ethanol and NaBH₄", "NH₃ and heat", "bromine"], correct: 0, explain: "Esterification needs an alcohol and an acid catalyst such as concentrated H₂SO₄." },
        { q: "Which reagent oxidises a primary alcohol to an aldehyde without over-oxidation?", opts: ["excess acidified dichromate(VI)", "distillation with acidified dichromate(VI)", "NaBH₄", "concentrated H₂SO₄"], correct: 1, explain: "Removing the aldehyde by distillation stops it being oxidised to the acid." }
      ]
    }
  ]
};
