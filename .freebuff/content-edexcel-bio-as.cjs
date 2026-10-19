// Edexcel International AS Biology (WBI11, WBI12), topics 1-4. Answers are 0-based.
module.exports = {
  subject: "biology",
  level: "AS",
  topics: [
    {
      slug: "molecules-transport-and-health",
      lesson: `# Molecules, Transport and Health

Edexcel IAL Biology WBI11, Topic 1. Living things are built from a small set of biological molecules. Their structure decides how they are used, how substances move in and out of cells, and how diet affects health.

### Carbohydrates
- Monosaccharides such as glucose, fructose and galactose are the building blocks. Glucose is the main respiratory substrate.
- Disaccharides form by a condensation reaction that releases water and creates a glycosidic bond. Maltose is glucose + glucose, sucrose is glucose + fructose, and lactose is glucose + galactose.
- Starch (amylose and amylopectin) stores glucose in plants. Glycogen stores glucose in animals. Cellulose is a straight chain of beta-glucose with hydrogen bonds between chains, giving strength.

### Lipids and proteins
- A triglyceride is one glycerol with three fatty acids joined by ester bonds. Phospholipids have a hydrophilic head and two hydrophobic tails.
- Amino acids join by peptide bonds to form polypeptides. Tertiary structure is held by hydrogen, ionic, disulfide and hydrophobic interactions.

### Enzymes
- Enzymes have an active site with a shape complementary to the substrate. Rate rises with temperature until the enzyme denatures, and pH changes can alter the active site.

### Transport
- Diffusion moves substances down a concentration gradient without energy. Facilitated diffusion uses carrier or channel proteins. Active transport moves substances against a gradient and uses ATP.
- Water moves by osmosis from a less negative water potential to a more negative water potential.
- Large, multicellular organisms need exchange surfaces with a large surface area to volume ratio, such as alveoli and the villi of the small intestine.

### Health
- Body mass index (BMI) = mass (kg) ÷ height² (m²). Diet, exercise and cholesterol intake affect the risk of cardiovascular disease.

Exam tip: when you describe a transport process, state whether it needs energy, whether it uses a protein, and which way the gradient points.`,
      questions: [
        { q: "What is the monomer of starch?", opts: ["Fructose", "Glucose", "An amino acid", "Glycerol"], correct: 1, explain: "Starch is a polymer of alpha-glucose units." },
        { q: "Which test gives a brick-red precipitate with reducing sugars when heated?", opts: ["Biuret test (purple)", "Benedict's test", "Iodine test (blue-black)", "Emulsion test (cloudy white)"], correct: 1, explain: "Benedict's solution gives a brick-red precipitate with reducing sugars on heating." },
        { q: "Sucrose is formed from which two monosaccharides?", opts: ["glucose and glucose", "glucose and fructose", "glucose and galactose", "fructose and fructose"], correct: 1, explain: "Sucrose is a disaccharide of glucose and fructose." },
        { q: "A triglyceride is formed from:", opts: ["three glycerol and one fatty acid", "one glycerol and three fatty acids", "two amino acids", "one glucose and one fatty acid"], correct: 1, explain: "One glycerol and three fatty acids are joined by three ester bonds." },
        { q: "Which description of a phospholipid is correct?", opts: ["Two fatty acid tails only", "A hydrophilic head and hydrophobic tails", "Two hydrophobic heads", "Only sugar units"], correct: 1, explain: "The phosphate head is hydrophilic, and the fatty acid tails are hydrophobic." },
        { q: "The bond linking amino acids in a polypeptide is:", opts: ["an ester bond", "a peptide bond", "a glycosidic bond", "a hydrogen bond only"], correct: 1, explain: "A condensation reaction forms a peptide bond between amino acids." },
        { q: "Which statement about an enzyme's active site is correct?", opts: ["It is complementary in shape to its substrate", "It changes shape permanently", "It is the same for every enzyme", "It is located outside the enzyme"], correct: 0, explain: "The active site fits the specific substrate, which gives enzyme specificity." },
        { q: "Why does a high temperature stop an enzyme working?", opts: ["It enlarges the active site", "It denatures the enzyme by breaking the bonds that hold its tertiary structure", "It makes the enzyme more active", "It adds more substrate"], correct: 1, explain: "Heat disrupts the bonds in the tertiary structure, so the active site changes shape." },
        { q: "Water moves by osmosis from:", opts: ["a more negative water potential to a less negative one", "a less negative water potential to a more negative one", "equal water potentials in both directions", "water potential is only used in active transport"], correct: 1, explain: "Water moves from the less negative (higher) water potential to the more negative (lower) one." },
        { q: "Which process uses carrier or channel proteins but does not need ATP?", opts: ["Active transport", "Facilitated diffusion", "Phagocytosis", "Endocytosis"], correct: 1, explain: "Facilitated diffusion follows the concentration gradient through proteins, so it needs no ATP." },
        { q: "Which process requires energy from ATP?", opts: ["Diffusion", "Osmosis", "Active transport", "Facilitated diffusion"], correct: 2, explain: "Active transport moves substances against a gradient using ATP." },
        { q: "Why do single-celled organisms not need a specialised exchange surface?", opts: ["Their surface area to volume ratio is large enough for diffusion", "They have no membrane", "They do not need oxygen", "They always live in darkness"], correct: 0, explain: "Small cells have a large surface area to volume ratio, so diffusion is fast enough." },
        { q: "Which tissue transports water and mineral ions up the plant?", opts: ["Xylem", "Phloem", "Epidermis", "Cortex"], correct: 0, explain: "Xylem vessels carry water and dissolved minerals from the roots upwards." },
        { q: "Which tissue carries sucrose from the leaves to the rest of the plant?", opts: ["Xylem", "Phloem", "Epidermis", "Palisade"], correct: 1, explain: "Phloem sieve tubes carry sucrose and amino acids in both directions." },
        { q: "A person has a mass of 70 kg and a height of 1.75 m. What is their BMI?", opts: ["40.0", "22.9", "4.0", "70.0"], correct: 1, explain: "BMI = 70 ÷ (1.75)² = 70 ÷ 3.0625 = 22.9." }
      ]
    },
    {
      slug: "membranes-proteins-dna-and-gene-expression",
      lesson: `# Membranes, Proteins, DNA and Gene Expression

Edexcel IAL Biology WBI11, Topic 2. DNA holds the code for proteins. Gene expression copies that code into mRNA and then builds the protein. Cell membranes control what enters and leaves the cell.

### Cell membranes
- The fluid mosaic model describes a phospholipid bilayer with proteins that move within it.
- Cholesterol stabilises the membrane and reduces its fluidity at high temperature. Glycoproteins and glycolipids on the outer surface act as cell recognition sites.
- Channel and carrier proteins control facilitated diffusion and active transport.

### DNA structure and replication
- DNA is a double helix of two antiparallel strands. Each nucleotide has a deoxyribose sugar, a phosphate and one base: adenine, thymine, cytosine or guanine.
- Adenine pairs with thymine (two hydrogen bonds) and cytosine pairs with guanine (three hydrogen bonds).
- Replication is semi-conservative: each new molecule has one original strand and one new strand. Helicase unwinds the helix, and DNA polymerase adds nucleotides to the 3' end of the new strand.

### Protein synthesis
- Transcription takes place in the nucleus. RNA polymerase makes a complementary mRNA copy of one gene. RNA contains uracil instead of thymine.
- Translation takes place on ribosomes. A codon is three bases on mRNA that codes for one amino acid. tRNA carries a specific amino acid and has an anticodon that matches the codon.
- The genetic code is degenerate: several codons can code for the same amino acid. It is also universal and non-overlapping.

### Mutations
- A substitution changes one base. It may be silent, or it may change one amino acid.
- A deletion or insertion of one or two bases causes a frameshift that alters every codon after the mutation.

Exam tip: when you explain a mutation, say what happens to the codon, then to the amino acid, then to the protein's shape and function.`,
      questions: [
        { q: "Which cell-surface molecules on the outer face of the membrane act as recognition sites?", opts: ["Glycoproteins", "Cellulose", "Starch", "DNA"], correct: 0, explain: "Glycoproteins and glycolipids on the outer surface help cells recognise each other." },
        { q: "What is the effect of cholesterol in a cell membrane?", opts: ["It makes the membrane more fluid at all temperatures", "It stabilises the membrane and reduces fluidity", "It forms channels", "It digests lipids"], correct: 1, explain: "Cholesterol makes the bilayer less fluid and more stable, especially at high temperatures." },
        { q: "In DNA, adenine pairs with:", opts: ["guanine", "thymine", "cytosine", "uracil"], correct: 1, explain: "Adenine pairs with thymine by two hydrogen bonds." },
        { q: "After semi-conservative replication, each DNA molecule contains:", opts: ["two new strands", "two original strands", "one original strand and one new strand", "fragments of both strands only"], correct: 2, explain: "Each daughter molecule keeps one parental strand as a template." },
        { q: "Which enzyme separates the two DNA strands during replication?", opts: ["DNA ligase", "Helicase", "RNA polymerase", "Amylase"], correct: 1, explain: "Helicase breaks the hydrogen bonds between the bases so the strands can separate." },
        { q: "DNA polymerase adds new nucleotides to which end of the growing strand?", opts: ["the 5' end", "the 3' end", "the centre of the strand", "either end at random"], correct: 1, explain: "DNA is synthesised in the 5' to 3' direction, so nucleotides are added at the 3' end." },
        { q: "Where does transcription take place in a eukaryotic cell?", opts: ["Ribosome", "Nucleus", "Cytoplasm only", "Golgi body"], correct: 1, explain: "The DNA is in the nucleus, where mRNA is made." },
        { q: "Translation takes place on the:", opts: ["nuclear envelope", "ribosome", "cell membrane", "lysosome"], correct: 1, explain: "Ribosomes read the mRNA codons and assemble the polypeptide." },
        { q: "A codon is:", opts: ["three consecutive bases on mRNA that code for one amino acid", "two bases on tRNA", "one amino acid", "an anticodon"], correct: 0, explain: "A codon is a triplet of mRNA bases." },
        { q: "The genetic code is described as degenerate because:", opts: ["codons overlap", "several codons can code for the same amino acid", "it has more than 64 codons", "it contains introns"], correct: 1, explain: "Most amino acids have more than one codon, so the code is degenerate." },
        { q: "Which base is found in RNA but not in DNA?", opts: ["Thymine", "Uracil", "Adenine", "Guanine"], correct: 1, explain: "RNA contains uracil in place of thymine." },
        { q: "A substitution mutation changes:", opts: ["the number of chromosomes", "a single base, which may or may not change the amino acid", "the whole order of genes", "the structure of ribosomes"], correct: 1, explain: "Changing one base changes one codon, which may code for the same or a different amino acid." },
        { q: "Deleting a single base from a coding sequence causes:", opts: ["no change", "a frameshift that alters all the codons after the mutation", "only the last amino acid to change", "always a silent mutation"], correct: 1, explain: "Removing one base shifts the reading frame for every codon that follows." },
        { q: "tRNA carries:", opts: ["a specific amino acid to the ribosome, matched by its anticodon", "mRNA to the nucleus", "DNA to the ribosome", "glucose into the cell"], correct: 0, explain: "tRNA brings amino acids to the ribosome and pairs its anticodon with the mRNA codon." },
        { q: "Which bond joins the two strands of DNA?", opts: ["hydrogen bonds between complementary bases", "peptide bonds", "glycosidic bonds only", "ionic bonds between phosphate groups"], correct: 0, explain: "Complementary bases are held together by hydrogen bonds across the double helix." }
      ]
    },
    {
      slug: "cell-structure-reproduction-and-development",
      lesson: `# Cell Structure, Reproduction and Development

Edexcel IAL Biology WBI12, Topic 3. Cells are the basic units of life. Their structure reflects their function, and cell division produces the new cells needed for growth, repair and reproduction.

### Cell structure
- Prokaryotic cells have no nucleus; their DNA is a circular loop in the cytoplasm, and their ribosomes are 70S. Eukaryotic cells have a nucleus and membrane-bound organelles.
- The nucleus holds DNA. Mitochondria carry out aerobic respiration. Chloroplasts carry out photosynthesis in plant cells. Rough endoplasmic reticulum has ribosomes and makes proteins; the Golgi apparatus modifies and packages them.
- Electron microscopes have higher resolution than light microscopes because electrons have a much shorter wavelength than visible light.
- Magnification = image size ÷ actual size. For an image 40 mm across at a magnification of ×400, the actual size is 0.1 mm.

### Cell division
- The cell cycle has interphase (G1, S and G2) and mitotic division. DNA replicates in the S phase.
- Mitosis produces two genetically identical diploid daughter cells. It is used for growth and repair.
- Meiosis has two divisions and produces four genetically different haploid gametes. Crossing over happens in prophase I, and independent assortment happens when homologous pairs line up at metaphase I.

### Stem cells and development
- A totipotent cell can form any cell type, including the cells of the placenta. Embryonic stem cells are pluripotent: they can form any cell type of the body. Adult stem cells are multipotent.
- Differentiation switches on particular genes so that a cell becomes specialised.

### Cancer
- Cancer results from mutations that disrupt the control of the cell cycle. The cells divide in an uncontrolled way and can form a tumour.

Exam tip: when you compare mitosis and meiosis, name the number of divisions, the number of daughter cells, their ploidy and whether they are genetically identical.`,
      questions: [
        { q: "Which feature is found in prokaryotes but not in eukaryotes?", opts: ["a nucleus", "circular DNA that is not surrounded by a nuclear membrane", "mitochondria", "linear chromosomes inside a nucleus"], correct: 1, explain: "Prokaryotes have a single circular DNA molecule in the cytoplasm with no nuclear envelope." },
        { q: "Which organelle is the site of aerobic respiration in a eukaryotic cell?", opts: ["ribosome", "mitochondrion", "Golgi apparatus", "lysosome"], correct: 1, explain: "Aerobic respiration takes place in the mitochondria." },
        { q: "Which organelle modifies and packages proteins for secretion?", opts: ["rough ER", "Golgi apparatus", "nucleolus", "centriole"], correct: 1, explain: "The Golgi apparatus modifies proteins and packages them into vesicles." },
        { q: "Ribosomes on the endoplasmic reticulum make it:", opts: ["smooth", "rough, and it is the site of protein synthesis", "smooth, and it digests cells", "rough, and it stores starch"], correct: 1, explain: "Rough ER has ribosomes attached, and it carries out protein synthesis." },
        { q: "Electron microscopes have higher resolution than light microscopes because:", opts: ["electrons have a much shorter wavelength", "they use visible light", "they magnify less", "they use lenses only"], correct: 0, explain: "Shorter wavelengths give better resolution, so electrons can resolve finer detail." },
        { q: "Mitosis produces:", opts: ["four haploid cells", "two genetically identical diploid cells", "two haploid cells", "four diploid cells that are not identical"], correct: 1, explain: "Mitosis gives two identical daughter cells with the same chromosome number as the parent." },
        { q: "Meiosis produces:", opts: ["two identical diploid cells", "four genetically different haploid cells", "two identical haploid cells", "four diploid cells"], correct: 1, explain: "Meiosis has two divisions and gives four haploid gametes, each genetically different." },
        { q: "Crossing over occurs in:", opts: ["prophase I of meiosis", "anaphase of mitosis", "telophase II", "interphase only"], correct: 0, explain: "Homologous chromosomes exchange sections during prophase I." },
        { q: "Independent assortment of homologous chromosomes occurs at:", opts: ["metaphase I", "anaphase II", "G1 of interphase", "cytokinesis of mitosis"], correct: 0, explain: "Homologous pairs line up independently at the equator in metaphase I." },
        { q: "A totipotent cell can:", opts: ["only become one type of cell", "become any cell type, including those that form the placenta", "only make blood cells", "no longer divide"], correct: 1, explain: "Totipotent cells, such as the zygote and early cells, can form a whole organism." },
        { q: "Embryonic stem cells are described as pluripotent because they can:", opts: ["differentiate into any type of body cell", "differentiate into only one cell type", "form a whole organism alone", "never divide"], correct: 0, explain: "Pluripotent cells can form all the cell types of the body." },
        { q: "During which phase of the cell cycle does DNA replicate?", opts: ["G1", "S phase", "G2", "M phase"], correct: 1, explain: "DNA is copied during the S (synthesis) phase." },
        { q: "Cancer arises from:", opts: ["controlled cell division", "uncontrolled cell division caused by mutations", "failure to undergo mitosis", "reduced DNA replication"], correct: 1, explain: "Mutations in genes that control the cell cycle lead to uncontrolled division." },
        { q: "A human sperm cell contains 23 chromosomes. How many chromosomes does a human body cell contain?", opts: ["23", "46", "92", "12"], correct: 1, explain: "The sperm is haploid (n = 23), so a diploid body cell has 2n = 46." },
        { q: "What is differentiation?", opts: ["the process by which a cell becomes specialised by switching on particular genes", "the process of cell death", "the copying of DNA before division", "the fusion of two gametes"], correct: 0, explain: "Differentiation specialises a cell for a particular function." }
      ]
    },
    {
      slug: "plant-structure-biodiversity-and-conservation",
      lesson: `# Plant Structure and Function, Biodiversity and Conservation

Edexcel IAL Biology WBI12, Topic 4. Plant tissues are arranged to transport water, move sugars and carry out photosynthesis. Biodiversity measures and conservation methods show how ecosystems are monitored and protected.

### Plant tissues
- Xylem vessels are dead, hollow cells with lignified walls. They carry water and mineral ions up the plant.
- Phloem sieve tube elements have sieve plates and few organelles. They carry sucrose and amino acids in both directions.
- Palisade mesophyll cells are packed with chloroplasts near the upper surface of the leaf. Sclerenchyma gives support through thick lignified walls.

### Stomata and transpiration
- Stomata open when guard cells become turgid by taking in water. They close when the guard cells become flaccid.
- Transpiration is faster in high temperatures, dry air and wind, because these increase the water potential gradient out of the leaf.
- Xerophytes reduce water loss with a thick waxy cuticle, sunken stomata and hairs.

### Measuring biodiversity
- Species richness is the number of different species in a habitat.
- Simpson's index of diversity is D = 1 − Σ(n/N)², where n is the number of individuals of each species and N is the total. For two species with 10 individuals each, D = 1 − (0.25 + 0.25) = 0.50.

### Sampling
- Quadrats estimate the abundance of sessile or slow-moving organisms, often as percentage cover.
- Transects show how species change along an environmental gradient.
- Mark-release-recapture estimates the population of a mobile animal with the Lincoln index: N = (n₁ × n₂) ÷ m₂. Here n₁ is the number marked in the first sample, n₂ the number caught in the second, and m₂ the number of marked animals in the second sample.

### Conservation
- In situ conservation protects species in their natural habitat, for example in national parks and reserves.
- Ex situ conservation keeps species outside their habitat, for example in seed banks and zoos.
- The IUCN Red List classifies species by their conservation status.

Exam tip: when you are asked to explain a transpiration result, relate it to water potential and the diffusion gradient out of the stomata.`,
      questions: [
        { q: "Xylem vessels are adapted for transport because they are:", opts: ["living cells with cytoplasm", "hollow, dead and lignified", "joined by sieve plates", "full of chloroplasts"], correct: 1, explain: "Their hollow lumens and lignified walls allow water to move up the stem." },
        { q: "Sieve tube elements in phloem have:", opts: ["lignified walls", "sieve plates and few organelles", "large vacuoles only", "chloroplasts"], correct: 1, explain: "Sieve plates allow sap to flow between cells." },
        { q: "Stomata open when guard cells become:", opts: ["turgid (swollen) by water uptake", "flaccid", "plasmolysed", "lignified"], correct: 0, explain: "Turgid guard cells bend apart and open the stoma." },
        { q: "Which condition increases the rate of transpiration?", opts: ["high humidity", "low temperature", "high temperature and wind", "darkness"], correct: 2, explain: "Heat and wind keep the water potential gradient out of the leaf steep." },
        { q: "Palisade mesophyll cells are adapted for photosynthesis by:", opts: ["having few chloroplasts", "containing many chloroplasts and being packed near the upper surface", "having no chloroplasts", "having lignified walls"], correct: 1, explain: "They are tightly packed with chloroplasts close to the light." },
        { q: "Species richness refers to:", opts: ["the number of different species in a habitat", "the number of individuals of one species", "the total mass of organisms", "the genetic material in one species"], correct: 0, explain: "Richness counts how many different species are present." },
        { q: "Two species each have 10 individuals. Simpson's index D = 1 − Σ(n/N)² equals:", opts: ["0.25", "0.50", "0.75", "1.00"], correct: 1, explain: "N = 20, so Σ(n/N)² = 0.25 + 0.25 = 0.50 and D = 1 − 0.50 = 0.50." },
        { q: "A quadrat is used to estimate:", opts: ["the population of a mobile animal", "the abundance of sessile or slow-moving organisms", "genetic diversity", "rainfall"], correct: 1, explain: "Quadrats suit organisms that do not move much, such as plants." },
        { q: "Transects are used to show:", opts: ["changes in species distribution along an environmental gradient", "the total number of genes", "the internal structure of a leaf", "the rate of photosynthesis"], correct: 0, explain: "Sampling along a line shows how species change across a gradient." },
        { q: "In mark-release-recapture, 40 animals are marked. A second sample of 50 contains 10 marked animals. What is the population estimate (Lincoln index)?", opts: ["200", "20", "500", "4"], correct: 0, explain: "N = (40 × 50) ÷ 10 = 200." },
        { q: "In situ conservation means:", opts: ["conserving species in their natural habitat", "storing seeds in a gene bank", "keeping animals in zoos only", "cloning species in a laboratory"], correct: 0, explain: "In situ protects the species where it lives naturally." },
        { q: "Seed banks are an example of:", opts: ["in situ conservation", "ex situ conservation", "habitat restoration", "natural selection"], correct: 1, explain: "Ex situ conservation stores organisms or genetic material away from their habitat." },
        { q: "Which feature reduces water loss in xerophytes?", opts: ["large numbers of stomata on the upper surface", "a thick waxy cuticle and sunken stomata", "a thin cuticle", "large leaves with many stomata"], correct: 1, explain: "A thick cuticle and sunken stomata reduce evaporation in dry conditions." },
        { q: "Sclerenchyma tissue is adapted for:", opts: ["photosynthesis", "support, with thick lignified walls", "transport of sucrose", "water storage"], correct: 1, explain: "Sclerenchyma fibres have thick lignified walls and give mechanical support." },
        { q: "What does the IUCN Red List do?", opts: ["lists species by conservation status", "measures rainfall", "tracks photosynthesis", "identifies genes"], correct: 0, explain: "It classifies species from least concern to extinct." }
      ]
    }
  ]
};
