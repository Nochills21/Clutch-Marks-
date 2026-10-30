/**
 * Biology AS deepening, pass b1: adds h3 subsections to four notes. Each section
 * is prose-only because the note already carries its figure. Inserted before
 * "Equations and symbols" (or appended) by refine-note-sections.cjs; nothing
 * already in a note is rewritten.
 */

const sections = [
  {
    id: "254175d8-d3d0-46bb-81a7-465f573dc717",
    slug: "cell-structure-reproduction-and-development",
    proseOnly: true,
    heading: "Deeper notes: the organelles, microscopy and meiosis",
    html: `<h2>Deeper notes: the organelles, microscopy and meiosis</h2>
<p>The subsections below fill in the detail that examiners test on the ultrastructure, the microscopes and the division of cells. Read each one with its matching specification statement open, and check that you can give the units and the reason as well as the name.</p>
<h3>The magnification equation and its units</h3>
<p>Magnification = image size ÷ actual size. Both lengths must be in the same units before you divide, and 1 mm = 1000 µm and 1 µm = 1000 nm. A cell drawn 50 mm long at ×500 is 50 ÷ 500 = 0.1 mm, which is 100 µm. Rearranged, actual size = image size ÷ magnification, the form most often used in calculations. Many lost marks come from leaving the answer in millimetres when the question asks for micrometres.</p>
<h3>Resolution and why a microscope can separate two points</h3>
<p>Resolution is the smallest distance between two points that still appear separate. Magnification makes an image bigger without adding detail, so a blurred image stays blurred at high magnification. The light microscope resolves about 200 nm, which is why a mitochondrion, roughly 1 µm across, can be seen but its cristae cannot. The electron microscope uses electrons with a much shorter wavelength and resolves a few tenths of a nanometre in practice.</p>
<h3>Preparing a slide: stains and coverslips</h3>
<p>The specimen must be thin enough for light to pass through it. A stain such as methylene blue or iodine raises contrast, because most cell structures are almost colourless. Lower the coverslip at an angle so that air bubbles are not trapped, since a bubble can be mistaken for a structure. Focus first on the lowest-power objective lens, then move to higher power and use the fine focus.</p>
<h3>The nucleus: envelope, pores and nucleolus</h3>
<p>The nucleus is bounded by a double membrane, the nuclear envelope, which is continuous with the rough endoplasmic reticulum. Nuclear pores allow mRNA and ribosomal subunits to leave and let proteins such as DNA polymerase enter. The nucleolus is a dense region where ribosomal RNA is made and ribosomal subunits are assembled, so a large nucleolus suggests a cell that makes a lot of protein.</p>
<h3>Mitochondria: the double membrane and the cristae</h3>
<p>A mitochondrion has an outer and an inner membrane. The inner membrane is folded into cristae, which increase the surface area for the electron transport chain and for ATP synthase. The fluid inside is the matrix, which holds the enzymes of the link reaction and the Krebs cycle. Muscle cells and sperm cells, which need a great deal of ATP, have many mitochondria.</p>
<h3>Chloroplasts: thylakoid stacks and the stroma</h3>
<p>A chloroplast has a double envelope. Stacks of thylakoid membranes, called grana, hold chlorophyll and the proteins of the light-dependent reactions. The stroma around them contains the enzymes of the Calvin cycle, including RuBisCO. Chloroplasts also carry their own DNA and ribosomes.</p>
<h3>Ribosomes: where proteins are made</h3>
<p>Ribosomes are not surrounded by a membrane. Those attached to the rough endoplasmic reticulum make proteins for secretion or for the cell membrane, while free ribosomes in the cytoplasm make proteins that stay in the cell. Eukaryotic ribosomes are 80S and prokaryotic ribosomes are 70S; the S is a sedimentation value, not a direct measure of size.</p>
<h3>The Golgi apparatus: modifying and packaging</h3>
<p>The Golgi apparatus receives vesicles from the rough endoplasmic reticulum, modifies the proteins (for example by adding carbohydrate groups), sorts them and packs them into vesicles. These vesicles carry their contents to the cell membrane or to lysosomes. It is made of flattened sacs called cisternae, and secretory cells such as goblet cells have a prominent one.</p>
<h3>Lysosomes: digestion inside the cell</h3>
<p>Lysosomes contain hydrolytic enzymes inside a single membrane, which keeps those enzymes away from the rest of the cell. A lysosome fuses with a vesicle carrying material taken in by phagocytosis and digests its contents. Lysosomes also break down worn-out organelles, so the cell renews its own components.</p>
<h3>Surface area to volume ratio and why cells stay small</h3>
<p>A cell takes in and releases materials through its surface, but uses them throughout its volume. As a cell grows, its volume increases faster than its surface area, so the ratio falls. For a sphere the ratio is 3 ÷ r. A radius of 1 cm gives a ratio of 3:1, and a radius of 2 cm gives 1.5:1, so the larger cell has less surface for each unit of volume it must supply.</p>
<h3>Eukaryotic and prokaryotic cells compared</h3>
<p>Prokaryotic cells, such as bacteria, have no nucleus and no membrane-bound organelles. Their DNA is a single circular chromosome in the cytoplasm, often with small rings of extra DNA called plasmids. Their ribosomes are 70S. Eukaryotic cells have a nucleus, mitochondria, and in plants chloroplasts, and their DNA is linear and associated with histone proteins. Both types have a plasma membrane and ribosomes, which is why both can be placed in the same broad functional family of cells.</p>
<h3>Chromosomes, homologous pairs and the diploid number</h3>
<p>A human body cell has 46 chromosomes, arranged as 23 homologous pairs, and one chromosome of each pair comes from each parent. Homologous chromosomes carry the same genes at the same loci, but they may carry different alleles. A gamete carries one chromosome from each pair, 23 in all, which is the haploid number.</p>
<h3>Meiosis: two divisions and the halving of the chromosome number</h3>
<p>Meiosis consists of two divisions and turns one diploid cell into four haploid cells. In meiosis I the homologous pairs separate, which halves the chromosome number. In meiosis II the sister chromatids separate, as they do in mitosis. Each gamete is genetically different from the parent cell and from the other gametes made by the same meiosis.</p>
<h3>Crossing over and independent assortment</h3>
<p>In prophase I homologous chromosomes pair up and can exchange sections at the points where they cross, called chiasmata. This crossing over produces new combinations of alleles on a chromosome. Independent assortment means that each homologous pair lines up at random in metaphase I, so each gamete gets a random mix of maternal and paternal chromosomes. Both processes add to genetic variation.</p>
<h3>Fertilisation and the restoration of the diploid number</h3>
<p>Two haploid gametes fuse to form a diploid zygote. Because each gamete is a random selection, the zygote is a new combination of alleles. The number of chromosome combinations possible from one parent alone is 2²³, about eight million, which is why sexual reproduction produces so much variety. The zygote then divides by mitosis to form the embryo.</p>`,
  },
  {
    id: "0f02b6a6-e605-4244-b79a-ae4b44c853c6",
    slug: "membranes-proteins-dna-and-gene-expression",
    proseOnly: true,
    heading: "Deeper notes: the membrane, transport, the genetic code and inheritance",
    html: `<h2>Deeper notes: the membrane, transport, the genetic code and inheritance</h2>
<p>These subsections explain the mechanisms behind the membrane, transport, DNA and inheritance statements. Each one names the molecule or structure involved, because a bare statement such as "active transport uses ATP" will not earn the marks an explanation will.</p>
<h3>The phospholipid bilayer and why it forms</h3>
<p>A phospholipid has a hydrophilic phosphate head and two hydrophobic fatty acid tails. In water the tails are pushed together and the heads face outwards, so the molecules form a bilayer with a hydrophobic core. That core stops most charged and polar substances from crossing freely, which is why the membrane is described as partially permeable.</p>
<h3>Cholesterol and membrane fluidity</h3>
<p>Cholesterol sits between the phospholipids. At high temperatures it restrains their movement, and at low temperatures it stops the tails packing tightly. It therefore keeps the membrane fluid over a wider range of temperatures. Animal membranes contain cholesterol; plant membranes contain related sterols instead.</p>
<h3>Membrane proteins: channels, carriers and receptors</h3>
<p>Integral proteins span the bilayer. Channel proteins form water-filled pores for ions. Carrier proteins change shape to move a specific molecule across. Receptor proteins bind a hormone or neurotransmitter on the outside and pass a signal to the inside, without the signal molecule itself entering the cell.</p>
<h3>Glycoproteins and glycolipids as recognition markers</h3>
<p>Carbohydrate chains attached to proteins (glycoproteins) and to lipids (glycolipids) project from the outer surface. They act as recognition markers: cells of the immune system use them to tell the body’s own cells from foreign ones, and they help cells of a tissue or an embryo to recognise and bind to each other.</p>
<h3>Facilitated diffusion through carrier and channel proteins</h3>
<p>Facilitated diffusion moves molecules down their concentration gradient through proteins, without ATP. Glucose is too large and too polar to cross the bilayer directly, so it uses carriers. Carriers can become saturated: once every carrier is occupied, adding more glucose does not raise the rate. Simple diffusion, by contrast, rises in proportion to the gradient.</p>
<h3>Active transport and the sodium–potassium pump</h3>
<p>Active transport moves a substance against its concentration gradient, using ATP. The sodium–potassium pump hydrolyses one ATP per cycle and moves three sodium ions out of the cell for every two potassium ions moved in. This keeps the inside negative relative to the outside, and the sodium gradient it maintains drives co-transport, for example pulling glucose into intestinal epithelial cells.</p>
<h3>Water potential: solute potential and pressure potential</h3>
<p>Water potential is the potential energy of water, measured in kilopascals (kPa), and it is zero or negative in any solution. Adding solute lowers it, which is the solute potential. Pressure in a plant cell raises it, which is the pressure potential. Water moves from high to low water potential. When a plant cell is fully turgid, the turgor pressure stops further entry of water.</p>
<h3>Endocytosis and exocytosis: moving bulk material</h3>
<p>Endocytosis takes material into the cell by folding the membrane around it to form a vesicle. Phagocytosis is endocytosis of solid particles, and pinocytosis is endocytosis of liquid. Exocytosis works in reverse: a vesicle fuses with the membrane and releases its contents outside, as insulin is released from pancreatic beta cells. Both processes use ATP.</p>
<h3>Amino acids and the peptide bond</h3>
<p>Each amino acid has a central carbon atom, an amino group, a carboxyl group, a hydrogen atom and a variable R group. Two amino acids join by a condensation reaction that removes one molecule of water and forms a peptide bond between the carboxyl group of one and the amino group of the other. A chain of amino acids is a polypeptide.</p>
<h3>Hydrogen, ionic and disulfide bonds in tertiary structure</h3>
<p>The tertiary structure of a protein is held by hydrogen bonds, ionic bonds between charged R groups, hydrophobic interactions and disulfide bridges between cysteine residues. Raising the temperature or changing the pH breaks these bonds, which changes the three-dimensional shape and therefore the function. This is denaturation, and it is usually permanent.</p>
<h3>Nucleotides and the sugar–phosphate backbone</h3>
<p>A nucleotide has a phosphate group, a pentose sugar and a nitrogenous base. In DNA the sugar is deoxyribose, and the bases are adenine, thymine, guanine and cytosine. Phosphodiester bonds link the sugar of one nucleotide to the phosphate of the next, forming the backbone. The bases point inwards and pair by hydrogen bonds.</p>
<h3>Semi-conservative replication and the Meselson–Stahl evidence</h3>
<p>Each new DNA molecule contains one original strand and one new strand. Meselson and Stahl showed this by growing bacteria in heavy nitrogen (¹⁵N) and then transferring them to light nitrogen (¹⁴N). After one generation the DNA had an intermediate density. After two, half of it was light, which fits semi-conservative replication and rules out the conservative model.</p>
<h3>Transcription: making mRNA from the template strand</h3>
<p>RNA polymerase binds to the promoter and unwinds a short length of DNA. It builds a single strand of mRNA by complementary base pairing with the template strand, using uracil in place of thymine. In eukaryotes the transcript is processed before it leaves the nucleus through a nuclear pore.</p>
<h3>Translation: codons, anticodons and the ribosome</h3>
<p>A ribosome moves along the mRNA one codon at a time. Each codon of three bases codes for one amino acid. A tRNA molecule carries the matching amino acid, and its anticodon pairs with the codon. Two tRNAs sit in adjacent sites on the ribosome, a peptide bond forms between their amino acids, and then the ribosome moves on to the next codon.</p>
<h3>Monohybrid crosses and the 3:1 ratio</h3>
<p>A cross between two heterozygotes (Aa × Aa) gives, in a Punnett square, 1 AA : 2 Aa : 1 aa. If A is dominant, three-quarters of the offspring show the dominant phenotype and one-quarter show the recessive. The ratio is an expected value, and a small sample may differ from it, which is why a chi-squared test is used to check the observed numbers.</p>
<h3>Codominance and incomplete dominance</h3>
<p>In codominance both alleles are fully expressed, as in the AB blood group, where the products of IA and IB both show. In incomplete dominance the heterozygote is intermediate: a cross between red-flowered and white-flowered snapdragons gives pink flowers. A cross between two heterozygotes then gives a phenotypic ratio of 1:2:1, not 3:1.</p>
<h3>Testing a genetic ratio with the chi-squared test</h3>
<p>The chi-squared test asks whether observed numbers differ from expected numbers by more than chance would allow. For each category calculate (observed − expected)² ÷ expected, and add the results. Compare the total with the critical value for the number of categories minus one degrees of freedom at the chosen probability. For one degree of freedom at p = 0.05 the critical value is 3.84; a smaller calculated value means the expected ratio is accepted.</p>`,
  },
  {
    id: "fe7f71d3-15f5-4c6c-836a-351016c8bf63",
    slug: "molecules-transport-and-health",
    proseOnly: true,
    heading: "Deeper notes: water, starch and glycogen in detail",
    html: `<h2>Deeper notes: water, starch and glycogen in detail</h2>
<p>These subsections extend the note on water and the carbohydrates. Each explains the property through the bonding that causes it, which is the link examiners ask for when they set a "explain why" question.</p>
<h3>Hydrogen bonding and the high specific heat of water</h3>
<p>Water molecules are polar, so each one can form hydrogen bonds with its neighbours. Many of these bonds must be broken before the temperature of water rises, which gives it a high specific heat capacity. This stabilises the temperature of organisms and of lakes. Evaporation also needs a large input of energy to break the remaining hydrogen bonds, which is why sweating cools the body.</p>
<h3>Cohesion, adhesion and surface tension</h3>
<p>Cohesion is the attraction between water molecules, produced by hydrogen bonds. Adhesion is the attraction between water and other polar surfaces, such as the walls of xylem vessels. Together they let a continuous column of water rise through a xylem vessel under the tension produced by transpiration. Cohesion also gives water a high surface tension, which lets small insects stand on a pond surface.</p>
<h3>Amylose and amylopectin: how branching changes a starch</h3>
<p>Starch is a mixture of two polymers of alpha glucose. Amylose is unbranched, with 1,4 glycosidic bonds that let the chain coil into a compact helix. Amylopectin has 1,6 branches roughly every 24 to 30 glucose units. The branches give many free ends where enzymes can add or remove glucose quickly, which is why a starch with branches is easier to mobilise than a straight chain.</p>
<h3>Glycogen as the animal store</h3>
<p>Glycogen is the storage polysaccharide of animals. It is more highly branched than amylopectin, with 1,6 branches about every eight to ten glucose units, so it can be broken down and resynthesised quickly. Muscle glycogen supplies glucose for respiration within the muscle itself. Liver glycogen is broken down to glucose, which is released into the blood to maintain blood glucose concentration.</p>`,
  },
  {
    id: "f6cc301d-7f8a-4ce2-b57a-4cf50f94b1fd",
    slug: "plant-structure-biodiversity-and-conservation",
    proseOnly: true,
    heading: "Deeper notes: transport in plants, classification and sampling",
    html: `<h2>Deeper notes: transport in plants, classification and sampling</h2>
<p>These subsections explain the plant transport tissues, the routes taken by water and ions, and the practical methods used to classify and sample organisms. Each one ends with the point an examiner is most likely to credit, so use it as a checklist when you revise.</p>
<h3>Lignin and the strength of xylem walls</h3>
<p>Xylem vessel walls are thickened with lignin, a polymer that makes them rigid and waterproof. Lignin is laid down in rings, spirals or a continuous layer, and the gaps that remain unlignified, the pits, let water pass sideways between vessels. Lignified walls resist the negative pressure produced by transpiration, so the vessel does not collapse.</p>
<h3>Phloem sieve tubes, companion cells and mass flow</h3>
<p>Sieve tube elements have sieve plates with pores and few organelles. Their metabolism is run by the neighbouring companion cells, which have many mitochondria. Sugars are loaded actively into the sieve tubes, water follows by osmosis, and the resulting pressure drives mass flow towards sinks such as roots and developing fruit.</p>
<h3>Stomata, guard cells and the water pathway through the leaf</h3>
<p>Water moves from the xylem in the veins to the mesophyll cells, evaporates into the air spaces and diffuses out through open stomata. Guard cells take in water and swell, and because their walls are unevenly thickened the swelling bends them apart and opens the stoma. Stomata close when water is short, which saves water at the cost of less carbon dioxide uptake.</p>
<h3>Root hair cells and the active uptake of mineral ions</h3>
<p>Root hair cells have a large surface area, a thin cell wall and many mitochondria. Ions such as nitrate are often at a lower concentration in the soil than in the root, so they are taken up by active transport using ATP. Water then enters the root by osmosis, following the solutes.</p>
<h3>The apoplast and symplast pathways across a root</h3>
<p>Water and ions cross a root by two routes. The apoplast pathway runs through the cell walls and intercellular spaces, and it is blocked at the endodermis by the Casparian strip, a band of waterproof suberin. The symplast pathway runs through the cytoplasm, linked by plasmodesmata. Everything that reaches the xylem must therefore pass through a cell membrane at the endodermis.</p>
<h3>Turgor pressure and herbaceous support</h3>
<p>A non-woody plant stays upright because its cells are turgid. Water enters each cell by osmosis until the cell wall resists further expansion, and the resulting turgor pressure keeps the stem and leaves rigid. Wilting happens when water lost by transpiration exceeds the water absorbed, so turgor falls and the plant loses its rigidity.</p>
<h3>Monocot and dicot stems compared</h3>
<p>In a dicot stem the vascular bundles form a ring, with a cambium between the xylem and the phloem that allows secondary thickening. In a monocot stem the bundles are scattered through the ground tissue and there is no cambium, so the stem does not thicken in the same way. Both types contain sclerenchyma that supports the stem.</p>
<h3>The binomial system of naming species</h3>
<p>Each species has a two-part scientific name: the genus, with a capital letter, followed by the species name in lower case. Both are italicised in print and underlined when handwritten. A single worldwide system avoids the confusion of common names, which differ between languages and can refer to several species.</p>
<h3>Dichotomous keys in identification</h3>
<p>A dichotomous key offers two choices at each step, and each choice leads either to another pair or to a name. To use one, start at the first pair, choose the description that matches the specimen and follow the numbered route until a name is reached. Good keys rely on features that can be seen directly, such as the shape of a leaf margin, rather than features that need dissection.</p>
<h3>Extinction and the rate of species loss</h3>
<p>Extinction happens when the last individual of a species dies. Background extinction occurs at a low rate in every period, whereas mass extinctions remove many species in a short time. Habitat loss and climate change caused by human activity are increasing the rate, which is why conservation records track the number of species listed as threatened.</p>
<h3>Using a transect to show a gradient</h3>
<p>A transect is a line laid across a habitat, with quadrats or point samples taken at regular intervals along it. It shows how a species changes along a gradient, such as distance from the shore or the light intensity under a canopy. Record the distance along the transect as well as the species, so that the change can be plotted against distance.</p>`,
  },
];

module.exports = { sections };
