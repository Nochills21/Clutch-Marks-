/**
 * Batch 5 — Cambridge IGCSE Biology 0610 depth rewrite (final OL batch).
 * Statements: 17.1-17.4, 18.1-18.3, 19.1-19.4, 20.1-20.4, 21.1-21.3.
 */
const rows = {
  /* Inheritance — 17.1-17.4 */
  "9369ec55-bf64-4bcf-987a-dbc2d96a06a0": `
<h2>IGCSE Biology: Inheritance</h2>
<p>Why do you look like your parents but not exactly like either of them? The answer is written in the behaviour of chromosomes during two kinds of cell division, and this note builds it from scratch: DNA and genes first, then mitosis (the copying division), meiosis (the halving-and-shuffling division), and finally the monohybrid cross with every step of a Punnett square worked out loud. The vocabulary — gene, allele, dominant, recessive, homozygous, heterozygous, genotype, phenotype — is defined precisely and paired with a worked cross, because marks are lost when these words are swapped.</p>

<h3>Chromosomes, genes and proteins</h3>
<p>In the nucleus, DNA is wound around proteins to form chromosomes. A gene is a section of DNA that codes for the sequence of amino acids in a specific protein — and proteins build and run the organism (enzymes, structural proteins like keratin, hormones like insulin). One gene, one polypeptide is the classic summary. Humans have 23 pairs of chromosomes (46 total): 22 pairs of autosomes and one pair of sex chromosomes (XX female, XY male). A variant of a gene is an allele — for flower colour there may be a purple allele and a white allele. Chromosomes carry genes in a fixed order (loci), and each body cell has the full diploid set, while gametes carry one of each pair (haploid).</p>

<h3>Dominant, recessive and the vocabulary table</h3>
<table>
<tr><th>Term</th><th>Meaning</th><th>Example</th></tr>
<tr><td>Gene</td><td>Section of DNA coding for a protein</td><td>Flower-colour gene</td></tr>
<tr><td>Allele</td><td>Variant form of a gene</td><td>Purple allele or white allele</td></tr>
<tr><td>Dominant</td><td>Allele expressed in the phenotype when present with any other allele</td><td>B (purple)</td></tr>
<tr><td>Recessive</td><td>Allele expressed only when two copies are present</td><td>b (white)</td></tr>
<tr><td>Homozygous</td><td>Two identical alleles</td><td>BB or bb</td></tr>
<tr><td>Heterozygous</td><td>Two different alleles</td><td>Bb</td></tr>
<tr><td>Genotype</td><td>The allele combination an organism carries</td><td>Bb</td></tr>
<tr><td>Phenotype</td><td>The observable feature</td><td>Purple flowers</td></tr>
</table>
<p>Key logic to internalise: a recessive phenotype (white) always reveals the genotype (bb), because a white organism must carry two recessive alleles; a dominant phenotype (purple) could be BB or Bb — a test cross (with a homozygous recessive) distinguishes them. That inference is a standard "explain how you would tell" question.</p>

<h3>Mitosis: growth and repair</h3>
<p>Mitosis produces two genetically identical diploid daughter cells. Purpose: growth, repair of damaged tissues, and asexual reproduction. Sequence (learn the order, and what happens at each stage): interphase — the cell grows, DNA replicates (each chromosome now two identical chromatids joined at a centromere) and organelles multiply, using ATP; prophase — chromosomes condense and become visible, the nuclear envelope breaks down; metaphase — chromosomes line up along the equator of the cell, attached to spindle fibres; anaphase — centromeres divide and sister chromatids are pulled to opposite poles; telophase — two nuclei form around each set, and the cytoplasm divides (cytokinesis). The outcome: 2 daughter cells, each with 46 chromosomes in humans, genetically identical to each other and to the parent cell.</p>

<h3>Meiosis: variation and gametes</h3>
<p>Meiosis produces four genetically different haploid gametes (sex cells) — sperm or egg cells in animals, pollen and ovules in plants. It involves two divisions. Meiosis I: homologous chromosome pairs (one from each parent) pair up along the equator and then separate — this halves the chromosome number (from 46 to 23). Meiosis II: the sister chromatids separate, giving four cells each with 23 single chromosomes. Two sources of variation: crossing over (in prophase I, homologous chromosomes twist and swap sections of DNA, creating new allele combinations on a chromosome) and independent assortment (which member of each pair goes to which daughter cell is random — with 23 pairs, 2²³ ≈ 8.4 million combinations possible before crossing over). Meiosis is therefore the engine of genetic variation: no two gametes are genetically identical. Fertilisation (fusion of two haploid gametes) then restores the diploid number and adds yet more variation, combining the genes of two parents.</p>

<h3>Monohybrid inheritance: the master method</h3>
<p>A monohybrid cross tracks one gene. Method (memorise the six steps): Step 1: choose symbols — a capital letter for the dominant allele, the same letter lower case for the recessive (B and b). Step 2: write each parent's genotype (e.g. Bb × Bb). Step 3: draw the Punnett square: parental gametes along the top and side (B and b from each). Step 4: fill in the four boxes by combining one allele from each parent (BB, Bb, Bb, bb). Step 5: read off the genotypic ratio (1 BB : 2 Bb : 1 bb) and the phenotypic ratio (3 purple : 1 white). Step 6: state the probabilities as fractions (¾ purple, ¼ white), percentages (75 %, 25 %) or a ratio (3:1), as the question asks. Crossing two heterozygotes always gives 3:1 phenotypic and 1:2:1 genotypic. Crossing a heterozygote with a homozygous recessive (a test cross) gives 1:1 phenotypically.</p>

<h3>Worked example: a full monohybrid cross from scratch</h3>
<p>In pea plants, tall (T) is dominant over short (t). Cross a heterozygous tall plant with a short plant. Step 1: symbols — T tall, t short. Step 2: genotypes — Tt × tt. Step 3: gametes — the tall parent gives T and t; the short parent gives t only. Step 4: Punnett square (top row T, t; side column t, t): boxes are Tt, tt, Tt, tt. Step 5: genotypic ratio — 2 Tt : 2 tt, simplified 1:1. Step 6: phenotype — 2 tall : 2 short = 1:1 (50 % tall, 50 % short). Second worked cross: two heterozygous tall plants (Tt × Tt): gametes T and t from each; square gives TT, Tt, Tt, tt; genotypic ratio 1 TT : 2 Tt : 1 tt; phenotypic ratio 3 tall : 1 short. If the question asks the chance of a tall offspring from Tt × Tt, the answer is ¾ = 75 %; if it asks the chance of a homozygous tall, it is ¼ = 25 %. Show the square every time — it is a mark in itself.</p>

<h3>Sex determination and sex-linked inheritance</h3>
<p>Sex is determined by the sex chromosomes: females are XX, males are XY. A Punnett square for XX × XY gives: X from the mother combined with X (daughter) or Y (son) from the father — so the father's sperm determines the sex, 50:50. Sex-linked genes sit on the sex chromosomes (usually the X). Males (XY) express any allele on their single X — so recessive X-linked conditions (colour blindness, haemophilia) are far more common in males. Colour-blindness example: Xᴮ normal, Xᵇ colour-blind. A carrier mother (XᴮXᵇ) × normal father (XᴮY): daughters — XᴮXᴮ (normal), XᴮXᵇ (carrier, normal vision); sons — XᴮY (normal), XᵇY (colour-blind). So half the sons are affected, and no daughter is affected (though half are carriers). Write genotypes with the X superscript attached to the allele — the exam requires showing the X and Y chromosomes explicitly. Haemophilia: blood fails to clot (missing clotting factor VIII); affected males may die from cuts; treated with clotting-factor injections (historically from donated blood — the HIV-contaminated supply scandal).</p>

<h3>Codominance and multiple alleles</h3>
<p>Not all alleles are simply dominant or recessive. Codominance: both alleles are expressed in the heterozygote (blood groups are the classic example — allele Iᴬ and Iᴮ are codominant, i recessive). Blood-group genotypes: type A = IᴬIᴬ or Iᴬi; type B = IᴮIᴮ or Iᴮi; type AB = IᴬIᴮ (codominant); type O = ii. Multiple alleles: more than two alleles exist in the population (three: Iᴬ, Iᴮ, i), though each individual carries only two. The inheritance squares work the same way — cross Iᴬi × Iᴮi and the four boxes give IᴬIᴮ (AB), Iᴬi (A), Iᴮi (B), ii (O); the phenotypic ratio is 1:1:1:1. Blood typing is used in forensics (paternity testing, crime scenes) and medicine (transfusions must match the ABO group, or antibodies attack the donated cells).</p>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Swapping gene and allele: a gene is the DNA section; an allele is one variant of it. Mixing them costs the definition mark.</li>
<li>Writing "the dominant allele is stronger": dominance describes which allele is expressed in the phenotype, not which is better or more common.</li>
<li>Forgetting that the Punnett square needs parental gametes on the outside — filling the square from the parents' phenotypes is a classic error.</li>
<li>Leaving ratios as fractions when the question asks "as a ratio" (3:1) or vice versa; answer in the form requested.</li>
<li>Writing sex-linked genotypes without the X or Y chromosome (just "Bb") — lose the mark.</li>
<li>Claiming mitosis produces variation: mitosis makes identical clones; only meiosis (crossing over, independent assortment) and fertilisation create variation.</li>
<li>Confusing crossing over (exchange of DNA between homologous chromosomes) with independent assortment (random orientation of pairs).</li>
<li>Saying a carrier "has the disease": a carrier (heterozygous) has a normal phenotype for recessive conditions.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p>Q1. Define the terms allele, genotype and phenotype. (3 marks) Answer: allele — a variant form of a gene (1); genotype — the alleles an organism carries (1); phenotype — the observable feature of the organism (1).</p>
<p>Q2. In pea plants, purple (P) is dominant over white (p). Cross two heterozygous plants and give the phenotypic ratio. (4 marks) Answer: Pp × Pp (1); Punnett square giving PP, Pp, Pp, pp (1); genotypic ratio 1:2:1 (1); phenotypic ratio 3 purple : 1 white (1).</p>
<p>Q3. Explain why males are more likely to be colour-blind than females. (3 marks) Answer: the allele for colour blindness is recessive and carried on the X chromosome (1); males have only one X chromosome so one recessive allele is expressed (1); females need two copies — one from each parent (1).</p>
<p>Q4. Describe the role of meiosis in producing genetic variation. (4 marks) Answer: crossing over in prophase I exchanges DNA between homologous chromosomes (1); independent assortment of pairs at metaphase I gives many combinations (1); four genetically different haploid cells are produced (1); fertilisation then combines genes from two parents (1).</p>
<p>Q5. Explain how a test cross can determine whether a purple-flowered plant is homozygous or heterozygous. (3 marks) Answer: cross with a homozygous recessive (white) plant (1); if all offspring are purple, the parent is homozygous dominant (1); if any white offspring appear (about half), the parent is heterozygous (1).</p>
`,

  /* Variation and Selection — 18.1-18.3 */
  "51eb3656-5b3a-446b-9416-70b08a1776fe": `
<h2>IGCSE Biology: Variation and Selection</h2>
<p>No two humans are identical (except identical twins), and that variation is the raw material of evolution. This note separates the two kinds of variation and their causes, explains how adaptation arises through natural selection step by step, works through antibiotic and pesticide resistance as the exam's favourite modern example, describes artificial selection and selective breeding, and closes with classification-by-DNA and the evidence for evolution. The mechanism of natural selection is written as a five-step sequence — the order examiners mark.</p>

<h3>Types of variation</h3>
<p>Continuous variation shows a full range of intermediate phenotypes with no distinct classes: height, mass, hand-span, skin colour — plotted, they give a bell-shaped normal distribution curve (most individuals near the mean, few at the extremes), shaped by many genes plus the environment. Discontinuous variation falls into distinct categories with no intermediates: blood group (A, B, AB, O), tongue rolling (yes/no), eye colour categories, sex — each phenotype is clear-cut, usually controlled by one or a few genes with little environmental influence. Causes: genetic (the alleles inherited from parents), environmental (temperature, nutrition, light, exercise — e.g. plant height in different soils), and most often a combination of both (genes set a potential, the environment determines how much of it is realised). Mutations — random changes in DNA — create brand-new alleles and are the ultimate source of genetic variation.</p>

<h3>Continuous and discontinuous variation compared</h3>
<table>
<tr><th>Feature</th><th>Continuous</th><th>Discontinuous</th></tr>
<tr><td>Pattern</td><td>Full range of intermediates</td><td>Distinct categories</td></tr>
<tr><td>Graph</td><td>Bell-shaped normal distribution</td><td>Separate bars</td></tr>
<tr><td>Genetic control</td><td>Many genes (polygenic)</td><td>Usually one gene</td></tr>
<tr><td>Environmental influence</td><td>Strong (e.g. diet, exercise)</td><td>Little</td></tr>
<tr><td>Examples</td><td>Height, mass, hand-span</td><td>Blood group, tongue rolling, sex</td></tr>
</table>

<h3>Natural selection: the five-step mechanism</h3>
<p>Darwin's mechanism works on any reproducing population. Step 1: variation exists in the population (from mutation, meiosis and sexual reproduction). Step 2: a change in the environment creates a struggle for survival (resources, predators, disease, climate) — more offspring are produced than can survive. Step 3: individuals with characteristics better suited to the new environment (the adaptive features) survive and reproduce more successfully — "survival of the fittest", where fitness means reproductive success, not strength. Step 4: the advantageous alleles are passed to offspring, so their frequency increases in the population over generations. Step 5: over many generations, the population becomes adapted to its environment; if populations become isolated and diverge enough, new species may form (speciation). Antibiotic resistance is the textbook application: in any bacterial population, random mutation produces some resistant bacteria; when the antibiotic is applied, non-resistant bacteria die while resistant ones survive and reproduce with the drug present, passing the resistance gene on (including by plasmid transfer); the population becomes resistant. Pesticide resistance in insects and herbicide resistance in weeds follow the identical five steps — the exam often gives one of these instead of bacteria and expects the same logic.</p>

<h3>Adaptive features</h3>
<p>An adaptive feature is any inherited characteristic that increases an organism's chance of survival and reproduction in its environment. Examples worth memorising: polar bear — white fur (camouflage), thick blubber and fur (insulation), large paws (weight distribution on ice, swimming); cactus — spines instead of leaves (reduced water loss, defence), thick fleshy stem (water storage), shallow roots (rapid absorption); deep-sea fish — large eyes (dim light), bioluminescence (communication), no swim bladder (pressure); desert fox — large ears (heat loss); bacteria — rapid reproduction and plasmid exchange (resistance spread). Adaptations are always relative to an environment: an adaptation in one habitat can be a liability in another (a polar bear in the desert).</p>

<h3>Artificial selection (selective breeding)</h3>
<p>Humans drive artificial selection by choosing organisms with desired features to breed together, generation after generation, until the trait is fixed in the population. Examples: crops bred for higher yield, disease resistance or uniform ripening (modern wheat from wild grasses); domestic animals bred for milk yield, muscle mass, temperament or appearance (dogs from wolves — the enormous variety of breeds from one species); ornamental plants for flower colour and size. The method: identify parents with the desired phenotype → cross them → select offspring showing the trait → repeat over many generations; use inbreeding to fix the trait (homozygosity) — but inbreeding also concentrates harmful recessive alleles and reduces variation (inbreeding depression), so new genetic material must periodically be introduced. Selective breeding is slow (many generations) and depends on the trait being heritable.</p>

<h3>Evidence for evolution and speciation</h3>
<p>Direct evidence: antibiotic-resistant bacteria, pesticide-resistant insects, beak size changes in Galápagos finches observed over decades. Fossil evidence: the sequence of forms in rock strata shows change over time (horse evolution, Archaeopteryx linking reptiles and birds) — though the fossil record is incomplete. Molecular evidence: comparison of DNA base sequences and proteins; the more similar the sequences of a given gene, the more closely related the species — this underpins modern classification. Comparative anatomy: homologous structures (the pentadactyl limb — same bone pattern in human arm, whale flipper, bat wing, horse leg — indicating common ancestry) versus analogous structures (wings of insects and birds: similar function, different origin). Biogeography: island species resemble those of the nearest mainland (Darwin's finches). Speciation occurs when populations of the same species become isolated (geographically — a mountain range or river; or behaviourally) and face different selection pressures; over many generations, allele frequencies diverge until they can no longer interbreed to produce fertile offspring — then they are separate species.</p>

<h3>Worked example: natural selection applied to a new scenario</h3>
<p>Scenario: a moth population lives on tree trunks; most are pale, some carry a dark allele. Industrial soot darkens the trunks. Step 1: state the variation — pale and dark morphs exist from genetic variation. Step 2: state the selection pressure — dark trunks make pale moths conspicuous to birds. Step 3: differential survival — pale moths are eaten more; dark moths survive and reproduce. Step 4: inheritance — the dark allele is passed on, its frequency rises. Step 5: prediction — over generations the population becomes mostly dark (and the reverse when pollution falls, as recorded in the peppered moth). Calculation practice from population data: if the frequency of the recessive phenotype (bb) is 0.09 (9 %), then q² = 0.09, q = 0.3, p = 0.7, so carriers (2pq) = 2 × 0.7 × 0.3 = 0.42 = 42 % — at IGCSE the arithmetic of phenotype percentages from a data table is common even where Hardy-Weinberg is not named.</p>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Writing that organisms "develop resistance because they need it": variation must pre-exist — selection acts on existing mutation-driven variation. This Lamarckian phrasing is a classic lost mark.</li>
<li>Describing natural selection as "the strongest survive": fitness means reproductive success of better-adapted individuals, not physical strength.</li>
<li>Confusing continuous (bell curve, many genes) and discontinuous (distinct categories, one gene) variation in a graph question.</li>
<li>Leaving "heritable/variation passed to offspring" out of the natural-selection sequence — without inheritance there is no evolution.</li>
<li>Saying artificial selection produces "new genes": it selects from existing variation; only mutation creates new alleles.</li>
<li>Explaining antibiotic resistance as caused "by the antibiotic": the antibiotic selects resistant mutants that already exist; it does not create them.</li>
<li>In data questions, quoting percentages without converting between fractions and percentages when asked.</li>
<li>Calling analogous structures evidence of common ancestry: only homologous structures (same origin) are.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p>Q1. Describe how bacteria become resistant to antibiotics. (4 marks) Answer: random mutation produces resistant bacteria in the population (1); antibiotics kill non-resistant bacteria, leaving resistant ones (1); resistant bacteria survive and reproduce, passing on the resistance gene (1); frequency of resistant bacteria in the population increases (1).</p>
<p>Q2. Explain the difference between continuous and discontinuous variation with an example of each. (4 marks) Answer: continuous shows a range of intermediates (1) e.g. height (1); discontinuous falls into distinct categories (1) e.g. blood group (1).</p>
<p>Q3. Describe how a farmer might use selective breeding to increase milk yield in cattle. (3 marks) Answer: select cows and bulls with the highest milk yield (1); breed them together (1); select offspring with the highest yield and repeat over generations (1).</p>
<p>Q4. Explain how the fossil record provides evidence for evolution. (3 marks) Answer: fossils in older rock layers are simpler than those above (1); transitional forms such as Archaeopteryx link groups (1); shows change in species over millions of years (1).</p>
<p>Q5. Explain why the peppered moth population became darker during the Industrial Revolution. (4 marks) Answer: variation in colour already existed (1); soot darkened tree trunks so pale moths were predated more (1); dark moths survived and reproduced (1); dark allele frequency increased over generations (1).</p>
`,

  /* Organisms and their Environment — 19.1-19.4 */
  "b6bc221a-eb16-488f-9e32-65eb3beaa3a5": `
<h2>IGCSE Biology: Organisms and their Environment</h2>
<p>Ecology is the accounting of life: where the energy comes from, how much of it moves from level to level, and how the materials (carbon, nitrogen) are endlessly recycled while the energy flows through and out. This note builds food chains and food webs from producers up, explains why only about 10 % of energy passes between levels (with the transfer-efficiency calculations fully worked), traces the carbon and nitrogen cycles step by step, and finishes with population measurement and the factors that control population size. Every cycle is written as a numbered sequence so you can reproduce it in the exam.</p>

<h3>Energy flow: producers, consumers and decomposers</h3>
<p>Almost all ecosystems are powered by the Sun. Producers (green plants and algae) trap light energy by photosynthesis and convert it into chemical energy in glucose — the base of every food chain. Consumers eat other organisms: primary consumers (herbivores) eat producers; secondary consumers (carnivores) eat herbivores; tertiary consumers eat other carnivores. Decomposers (bacteria and fungi) break down dead organisms and waste, releasing nutrients back to the environment and respiring energy as heat. Detritivores (earthworms, woodlice) feed on detritus (dead material), fragmenting it for decomposers. The flow is one-way: light → chemical energy in producers → consumers → heat lost at every stage; materials, in contrast, cycle.</p>

<h3>Food chains, food webs and trophic levels</h3>
<p>A food chain shows the transfer of food energy from one trophic level to the next: maize (producer) → locust (primary consumer) → lizard (secondary) → hawk (tertiary). Arrow direction is critical — always point from the organism being eaten to the eater, representing the direction of energy flow. A food web is many interconnected food chains (more realistic); removing one species can cascade through the web — a favourite "explain the consequence" question. Each organism occupies a trophic level: level 1 producers, level 2 primary consumers, and so on. DDT and other persistent poisons accumulate up the chain (biomagnification): the top predator has the highest concentration, which is why raptor eggshells thinned after DDT use.</p>

<h3>Pyramids and energy transfer efficiency</h3>
<p>Pyramids of numbers count organisms (can be inverted — one tree feeding many caterpillars); pyramids of biomass show the dry mass at each level (usually upright, measured in g/m²); pyramids of energy (kJ/m²/year) are always upright because energy is lost at each transfer. Where does the energy go between levels? Much of the food is not digested (egested in faeces); some is lost in respiration as heat (the largest loss); some goes into growth, but parts are inedible (bones, fur) or become detritus. The result: only about 10 % of the biomass/energy at one level passes to the next. Calculation: if producers contain 20 000 kJ, primary consumers receive about 2 000 kJ, secondary consumers about 200 kJ, tertiary about 20 kJ — divide by 10 at each step. Percentage efficiency = (energy transferred to next level ÷ energy available at this level) × 100. This is why food chains rarely exceed four or five levels: not enough energy remains at the top, and it is why eating lower on the chain (plant-based diets) can feed more people — a linked food-supply question.</p>

<h3>Energy at each trophic level</h3>
<table>
<tr><th>Trophic level</th><th>Role</th><th>Typical energy (kJ per m² per year)</th></tr>
<tr><td>1</td><td>Producers (photosynthetic)</td><td>20 000</td></tr>
<tr><td>2</td><td>Primary consumers (herbivores)</td><td>2 000</td></tr>
<tr><td>3</td><td>Secondary consumers (carnivores)</td><td>200</td></tr>
<tr><td>4</td><td>Tertiary consumers (top carnivores)</td><td>20</td></tr>
</table>

<h3>Worked example: energy-transfer calculations</h3>
<p>A grassland fixes 25 000 kJ per m² per year. Grasshoppers assimilate 2 500 kJ; frogs 250 kJ; snakes 25 kJ. Step 1: check each transfer: 2 500 ÷ 25 000 = 0.10 = 10 %; 250 ÷ 2 500 = 10 %; 25 ÷ 250 = 10 % — consistent with the 10 % rule. Step 2: what happens to the rest? At each level, energy is lost as heat in respiration, in faeces (undigested material), and in uneaten parts. Step 3: question variants: if the snake level must support 10 000 kJ of snake biomass, how much producer is needed? 10 000 → 100 000 (frogs) → 1 000 000 (grasshoppers) → 10 000 000 kJ of grass — show the three multiplications. Step 4: biomass units: dry mass is used (water varies and is not energy), measured by drying samples to constant mass in an oven — a standard Paper 6 method note. Efficiency questions always want the working shown: division by the level below and the percentage written with its unit.</p>

<h3>The carbon cycle</h3>
<p>Carbon cycles between the atmosphere, living things and the oceans. Step 1: photosynthesis removes carbon dioxide from the air and fixes carbon into glucose and biomass. Step 2: feeding passes carbon along food chains. Step 3: respiration by all organisms returns carbon dioxide to the atmosphere. Step 4: decomposers respire the carbon in dead organisms and waste back to the air as carbon dioxide. Step 5: combustion of fossil fuels (coal, oil, gas) releases carbon that was locked away for millions of years. Step 6: carbon is also stored (sequestered) in fossil fuels, carbonate rocks, oceans (dissolved carbon dioxide and carbonates) and forests. Human impact: burning fossil fuels and deforestation have raised atmospheric carbon dioxide, intensifying the greenhouse effect and global climate change — cutting this cycle's balance is the core of the climate topic.</p>

<h3>The nitrogen cycle</h3>
<p>Nitrogen is essential for proteins and nucleic acids, and although the air is 78 % nitrogen gas, animals and plants cannot use it directly — the nitrogen cycle has four key bacterial steps. Step 1: nitrogen fixation — nitrogen-fixing bacteria (Rhizobium in root nodules of legumes, Azotobacter in soil) convert nitrogen gas into ammonia and then ammonium compounds in the soil. Step 2: nitrification — nitrifying bacteria (Nitrosomonas: ammonium to nitrite; Nitrobacter: nitrite to nitrate) oxidise ammonium compounds to nitrates, the form plants absorb by root hairs (active transport). Step 3: assimilation — plants take up nitrates and build them into amino acids and proteins; animals obtain nitrogen by eating plants or other animals. Step 4: ammonification — decomposers break down proteins in dead organisms and urea in waste, releasing ammonia/ammonium compounds. Step 5: denitrification — anaerobic bacteria (in waterlogged/poorly aerated soil) convert nitrates back to nitrogen gas, returning it to the air — a loss for farmers, which is why ploughing and drainage (aeration) and fertilisers are used. Fertilisers (natural: manure and compost; artificial: NPK) replace the nitrates removed at harvest.</p>

<h3>Populations and population size</h3>
<p>A population is all the organisms of one species in an area at a given time; a community is all the populations of different species living together; an ecosystem is the community plus the abiotic (non-living) environment — light, temperature, water, soil pH, mineral ions, carbon dioxide. Population size depends on: birth rate, death rate, immigration and emigration; and it is limited by competition (for light, water, space, nutrients), predation, disease and climate. A typical population growth curve: a lag phase (establishment), a log (exponential) phase (resources plentiful), a stationary phase (births = deaths, resources limiting) and sometimes a decline (resources exhausted). Sampling methods: quadrats (random sampling for plants and slow organisms — throw the quadrat randomly, count within, repeat for a mean), and mark-release-recapture (trap, mark, release, recapture later; population = (number in first catch × number in second catch) ÷ number marked in second catch) for mobile animals. The assumptions of mark-release-recapture: marks do not rub off or harm the animal, the marked animals mix fully with the population, and there are no significant births, deaths or migrations between samplings.</p>

<h3>Worked example: population estimation</h3>
<p>Ecologists trap 40 mice, mark them and release them. A week later they trap 50 mice, of which 20 are marked. Step 1: the formula — total population = (first catch × second catch) ÷ marked in second catch. Step 2: substitute — (40 × 50) ÷ 20 = 2000 ÷ 20 = 100 mice. Step 3: evaluate the reliability — the sample sizes are small and marks may have rubbed off, giving a wide confidence; repeat the recapture and take a mean. Quadrat example: five 1 m² quadrats contain 12, 15, 9, 14 and 10 dandelions; mean = (12 + 15 + 9 + 14 + 10) ÷ 5 = 60 ÷ 5 = 12 dandelions per m²; for a 200 m² field, the estimated population is 12 × 200 = 2 400. Always show the sum and the division, and quote units (organisms per m²).</p>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Pointing food-chain arrows from eater to eaten — the arrow shows energy flow, so it points to the eater.</li>
<li>Writing that energy "cycles" like carbon: energy flows through and is lost as heat; only materials cycle.</li>
<li>Using wet mass for biomass pyramids: dry mass is required because water content varies.</li>
<li>Skipping the 10 % rule in energy questions: always divide by 10 (or multiply by 0.1) per level and show it.</li>
<li>Confusing nitrogen gas with nitrates: plants absorb nitrates (and ammonium), not atmospheric nitrogen; bacteria convert the gas.</li>
<li>Mixing up nitrification (bacteria making nitrates) and denitrification (bacteria releasing nitrogen gas).</li>
<li>Confusing population (one species) with community (all species) in definitions.</li>
<li>Forgetting the assumptions of mark-release-recapture when evaluating a population estimate.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p>Q1. Explain why food chains rarely have more than five trophic levels. (2 marks) Answer: only about 10 % of energy passes to each successive level (1); so insufficient energy remains at higher levels to support another population (1).</p>
<p>Q2. Describe the role of nitrifying bacteria in the nitrogen cycle. (2 marks) Answer: they oxidise ammonium compounds first to nitrites and then to nitrates (1); the form of nitrogen that plant roots absorb (1).</p>
<p>Q3. A grassland producer level contains 50 000 kJ. Calculate the energy available to secondary consumers. (2 marks) Answer: 50 000 ÷ 10 ÷ 10 (1); = 500 kJ (1).</p>
<p>Q4. Describe how you would estimate the population of dandelions in a field. (3 marks) Answer: use quadrats thrown at random coordinates (1); count dandelions in each and calculate the mean per m² (1); multiply by the total field area (1).</p>
<p>Q5. Explain the effect of deforestation on the carbon cycle and climate. (3 marks) Answer: fewer trees means less photosynthesis removing carbon dioxide (1); burning or rotting trees releases stored carbon (1); atmospheric carbon dioxide rises intensifying the greenhouse effect and global warming (1).</p>
`,

  /* Human Influences on Ecosystems — 20.1-20.4 */
  "ef15d699-c8bb-47b4-aa60-e9d0fb29d8f2": `
<h2>IGCSE Biology: Human Influences on Ecosystems</h2>
<p>Humans now change every ecosystem on Earth — feeding ourselves at scale, destroying habitats, polluting air, water and soil, and altering the climate. This note works through food supply and intensive farming, the mechanisms of habitat destruction and species extinction, each pollutant with its cause-effect chain (from eutrophication to acid rain to greenhouse gases), and the conservation strategies that reverse the damage — reserves, breeding programmes, recycling and international agreements. The exam marks lie in chains of causation, so every impact is stated as mechanism → effect on the ecosystem → consequence.</p>

<h3>Food supply and intensive farming</h3>
<p>The growing human population (over 8 billion) needs more food; intensification maximises yield per hectare. Methods: fertilisers (replace soil nitrates and other ions removed at harvest — but excess runs off into waterways causing eutrophication), pesticides (kill insect pests, fungal diseases and weeds — but can poison non-target species, accumulate in food chains and drive resistance), herbicides (kill competing weeds), and livestock in confined conditions (high efficiency but welfare and antibiotic-resistance concerns). Monoculture (one crop over large areas) maximises short-term yield but depletes specific soil minerals and is vulnerable to a single pest or disease. Traditional/extensive farming (crop rotation, hedgerows, composting) sustains soil fertility and biodiversity at lower yields. The tension is the exam's favourite evaluation question: food security versus environmental cost.</p>

<h3>Habitat destruction and species extinction</h3>
<p>Habitat loss is the largest cause of biodiversity decline: deforestation for timber, cattle, soy and palm oil (tropical rainforests), wetland drainage for agriculture and housing, coral-reef destruction by trawling, warming and acidification, and urbanisation. Consequences: populations fragment (isolated groups cannot interbreed — reduced genetic diversity), food webs collapse (losing a keystone species cascades through the web), soil erosion follows tree removal (dust bowls, landslides, siltation of rivers), and species become extinct — extinction is forever. Human drivers in full: hunting and overfishing, pollution, introduced (invasive) species outcompeting natives (rats on islands, water hyacinth in lakes), and climate change shifting habitats faster than species can migrate or adapt. Rates of extinction today are estimated at 100–1000× the background (natural) rate.</p>

<h3>Pollution of water: eutrophication</h3>
<p>Excess nitrates and phosphates (from fertiliser run-off, sewage, detergents) enter rivers and lakes. Step 1: nutrients stimulate algal bloom — dense growth of algae covering the surface. Step 2: light is blocked, so submerged plants below die. Step 3: decomposer bacteria break down the dead plants and algae, multiplying rapidly. Step 4: bacterial respiration uses up the dissolved oxygen in the water. Step 5: fish and other aquatic animals suffocate and die (fish kills), and the water becomes anoxic and foul-smelling. Prevention: buffer strips of vegetation along waterways, careful fertiliser application (right amount, right time), tertiary sewage treatment (removing nitrates and phosphates), and phosphate-free detergents.</p>

<h3>Air pollution: acid rain and greenhouse gases</h3>
<p>Acid rain: sulfur dioxide (from burning fossil fuels containing sulfur, and smelting) and nitrogen oxides (from vehicle engines and power stations) dissolve in rainwater forming sulfuric and nitric acids, lowering rain pH below about 5.6. Effects: damages limestone buildings and statues (calcium carbonate + acid → soluble salts), leaches essential minerals (magnesium, calcium) from soil so plants weaken, acidifies lakes and rivers killing fish and amphibians (and mobilising toxic aluminium), and damages leaf cuticles and respiratory surfaces. Prevention: flue-gas desulfurisation (limestone scrubbers in power stations), catalytic converters in cars (converting carbon monoxide, nitrogen oxides and unburnt hydrocarbons to carbon dioxide, nitrogen and water), and low-sulfur fuels and renewables. The greenhouse effect: gases (carbon dioxide, methane, water vapour, nitrous oxide) absorb re-radiated infrared energy from the Earth's surface, warming the lower atmosphere — a natural effect that makes Earth habitable, but human emissions amplify it. Enhanced greenhouse effect and global warming: rising average temperatures cause ice-cap melting and sea-level rise, altered rainfall and more extreme weather, shifts in species distributions (poleward and uphill), coral bleaching, and threats to agriculture and water supplies. Sources of the extra greenhouse gases: fossil-fuel combustion (carbon dioxide), deforestation (carbon dioxide), rice paddies and ruminant livestock and landfill (methane), fertilisers (nitrous oxide).</p>

<h3>Pollution summary</h3>
<table>
<tr><th>Pollutant</th><th>Source</th><th>Effect</th><th>Prevention</th></tr>
<tr><td>Nitrates and phosphates</td><td>Fertiliser run-off, sewage</td><td>Eutrophication, fish kills</td><td>Buffer strips, phosphate-free detergents</td></tr>
<tr><td>Sulfur dioxide, nitrogen oxides</td><td>Power stations, vehicles</td><td>Acid rain: damaged buildings, lakes, soil</td><td>Scrubbers, catalytic converters</td></tr>
<tr><td>Carbon dioxide, methane</td><td>Fossil fuels, livestock, landfill</td><td>Enhanced greenhouse effect, climate change</td><td>Renewables, reforestation</td></tr>
<tr><td>CFCs</td><td>Aerosols, refrigeration</td><td>Ozone-layer depletion, more UV reaching Earth</td><td>International bans, replacement chemicals</td></tr>
</table>

<h3>Conservation and sustainability</h3>
<p>Conservation maintains biodiversity and ecosystem services. Methods: nature reserves and national parks protecting habitats (with buffer zones and wildlife corridors connecting fragmented habitats), captive breeding and reintroduction programmes (saving critically low populations — giant panda, golden lion tamarin, Arabian oryx), seed banks and gene banks preserving genetic material, legal protection (CITES trading bans, protected species and habitats legislation), sustainable resource use (selective logging, fishing quotas and no-take zones, rotation), reducing pollution (cleaner energy, recycling), and education and international agreements (Kyoto Protocol, Paris Agreement, Rio conventions on biodiversity and climate). Sustainability means meeting present needs without compromising future generations: renewable energy (solar, wind, hydro, biofuels), recycling (paper, glass, metals, plastics — reducing extraction energy and landfill), reforestation and afforestation, and permaculture and organic farming. Individual-level actions (recycling, less meat, public transport) and governmental policy (carbon taxes, protected areas) are both fair comparison material.</p>

<h3>Worked example: evaluating a conservation decision</h3>
<p>Scenario: a lake suffers annual fish kills and algal blooms; farmland surrounds it. Step 1: diagnose — nitrate and phosphate run-off from fertilisers causes eutrophication (algal bloom → light blocked → decomposers multiply → oxygen depleted → fish die). Step 2: propose controls with mechanisms — buffer strips of vegetation along the watercourse trap run-off; precision fertiliser application reduces excess; phosphate-free detergents cut the phosphorus load; tertiary sewage treatment removes nutrients; aeration of the lake replenishes oxygen. Step 3: evaluate — buffer strips are cheap and create habitat (biodiversity bonus) but take land out of production; precision farming costs equipment but reduces fertiliser bills; aeration treats symptoms, not causes. Step 4: conclude with a balanced judgement citing productivity versus biodiversity, exactly as an evaluation question demands. Writing technique: for "assess" or "evaluate" questions, give both sides with mechanisms and finish with a justified judgement — a one-sided answer caps at half marks.</p>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Describing eutrophication without the oxygen step: the fish die because decomposer bacteria deplete dissolved oxygen, not because algae "eat" them.</li>
<li>Saying the greenhouse effect itself is bad: it is natural and beneficial; it is the enhanced (human-boosted) effect that causes dangerous warming.</li>
<li>Confusing the ozone layer (stratospheric ozone absorbing UV) with the greenhouse effect (warming) — different phenomena, both pollution-related.</li>
<li>Listing pollutants without the mechanism: acid rain requires naming sulfur dioxide/nitrogen oxides dissolving in rainwater.</li>
<li>Writing that conservation means "leaving everything alone": active management (breeding, reserves, corridors, quotas) is the exam's expected answer.</li>
<li>Forgetting invasive species and overhunting when listing causes of extinction — habitat loss is biggest but not the only one.</li>
<li>Answering an "evaluate" question from one side only.</li>
<li>Confusing methane sources: ruminant livestock, rice paddies and landfill (anaerobic decomposition) — not fossil-fuel burning (that is mainly carbon dioxide).</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p>Q1. Explain how fertiliser run-off leads to the death of fish in a river. (4 marks) Answer: nitrates and phosphates leach into the river (1); algal bloom grows covering the surface (1); submerged plants die and decomposers multiply breaking them down (1); bacterial respiration depletes dissolved oxygen so fish suffocate (1).</p>
<p>Q2. Describe two ways in which humans reduce biodiversity. (4 marks) Answer: habitat destruction by deforestation or drainage (1) removing food and shelter so species die out (1); pollution of air/water/soil (1) poisoning organisms or acidifying lakes (1).</p>
<p>Q3. Explain how carbon dioxide contributes to global climate change. (3 marks) Answer: burning fossil fuels raises atmospheric carbon dioxide (1); carbon dioxide absorbs re-radiated infrared heat from the Earth (1); average global temperature rises, changing weather patterns and sea levels (1).</p>
<p>Q4. Describe the methods used to conserve endangered species. (4 marks) Answer: habitat protection in reserves and national parks (1); captive breeding and reintroduction programmes (1); seed/gene banks and legal protection from hunting and trade (1); international agreements limiting exploitation (1).</p>
<p>Q5. Evaluate the use of pesticides in farming. (4 marks) Answer: benefits — higher yields, less crop loss to pests and disease, more reliable food supply (1); costs — non-target species poisoned, biomagnification up food chains, resistant pests evolve (1); alternatives — biological control and integrated pest management (1); balanced judgement weighing food security against biodiversity (1).</p>
`,

  /* Biotechnology and Genetic Modification — 21.1-21.3 */
  "bed703c4-851e-4ab8-96e6-cc56be8ce619": `
<h2>IGCSE Biology: Biotechnology and Genetic Modification</h2>
<p>Biotechnology is the industrial use of living organisms, cells or their products — from 8000-year-old yeast fermentation to gene-edited crops. This note covers the classical applications (biogas, fermenters, enzymes in industry), then builds genetic modification from the DNA mechanics up: how a gene is cut, copied and inserted; how marker genes screen for success; and every benefit and risk argued with mechanisms rather than slogans. The exam rewards balanced, mechanism-backed arguments, so each claim in the final section carries its biological reasoning.</p>

<h3>What biotechnology includes</h3>
<p>Classical biotechnology: fermentation — yeast converting glucose to ethanol and carbon dioxide anaerobically (bread, beer, wine), and bacterial fermentation making yoghurt (Lactobacillus converts lactose to lactic acid, lowering pH and setting the milk protein), cheese (rennet and bacteria), and antibiotics (Penicillium moulds in large fermenters). Biogas: anaerobic digestion of sewage, manure and crop waste by methanogenic bacteria produces methane (biogas) for heating and electricity — a renewable fuel that also disposes of waste; small-scale digesters are widely used in developing countries. Enzymes in industry: proteases in biological detergents (digesting protein stains at low temperature), amylases in baking and brewing (breaking starch to sugar), isomerase converting glucose to fructose (a sweeter sugar for low-calorie foods), lactase producing lactose-free milk, and pectinases clarifying fruit juices. Advantages of using enzymes: they work at low temperatures and pressures (saving energy), are specific (fewer by-products), and are biodegradable. Immobilised enzymes (attached to beads or membranes) can be reused continuously and kept out of the product — cutting costs in continuous-flow processes.</p>

<h3>Fermenters</h3>
<p>Industrial fermentation grows microorganisms in a fermenter (a large sterile stainless-steel vessel) to make products such as antibiotics, single-cell protein (mycoprotein from Fusarium for food), enzymes, vaccines and organic acids. Conditions controlled automatically: temperature (water jacket or cooling coils — microbial respiration releases heat and enzymes denature above the optimum), pH (acids/alkalis added as growth changes the pH), oxygen supply (sterile air pumped in and stirred to keep aerobic organisms respiring and the mixture uniform), nutrients (sterile glucose/mineral broth fed in), and sterility (no contaminating microbes — the vessel is steam-sterilised and the air filtered). Agitation (stirring) keeps nutrients and oxygen evenly distributed and prevents clumping. Batch versus continuous culture: batch is run in cycles and harvested at once; continuous removes product and adds medium continuously for constant output.</p>

<h3>Genetic modification: the core technique</h3>
<p>Genetic modification (GM, genetic engineering) transfers a gene from one species into another so the recipient expresses a new trait. Step 1: identify and isolate the desired gene — the gene sequence is known, and it is copied many times by the polymerase chain reaction (PCR) or taken from a gene library. Step 2: cut the DNA — restriction endonuclease enzymes cut at specific recognition sequences, often leaving "sticky ends"; the same enzyme cuts the vector (carrier). Step 3: insert the gene into a vector — most often a bacterial plasmid (small circular DNA); DNA ligase joins the sugar-phosphate backbone, forming recombinant DNA. Step 4: transfer into the target organism — the plasmid is taken up by bacteria (transformation), or the gene is inserted into plant cells by Agrobacterium tumefaciens or a gene gun, or into animal embryos by microinjection. Step 5: screen for success — a marker gene (e.g. antibiotic resistance or fluorescent protein) in the vector identifies the transformed cells; only cells containing the recombinant DNA survive the antibiotic or glow. Step 6: grow the modified organism and test the trait. The same gene inserted into a different organism usually works because the genetic code is universal — DNA codes the same amino acids in all living things.</p>

<h3>Worked example: making insulin and Bt crops</h3>
<p>Human insulin by GM bacteria: Step 1 — the human insulin gene is identified and copied (PCR). Step 2 — restriction enzymes cut the gene and a bacterial plasmid; sticky ends allow pairing. Step 3 — DNA ligase seals the gene into the plasmid, forming recombinant DNA. Step 4 — the plasmid is inserted into E. coli by transformation with heat shock and calcium ions. Step 5 — bacteria are grown in a fermenter with the marker gene confirming success; the bacteria transcribe and translate the human gene and secrete insulin, which is purified. Advantages over pig/bovine insulin: exact human sequence (fewer allergic reactions), unlimited cheap supply, consistent purity. GM crops with examples and mechanisms: Bt crops carry a bacterial gene (from Bacillus thuringiensis) coding for an insecticidal toxin protein, killing pests that eat the plant (less chemical pesticide needed); Golden Rice carries daffodil/bacterial genes for beta-carotene (provitamin A) to combat vitamin A deficiency and blindness; herbicide-tolerant soya survives broad-spectrum weedkiller so weeds can be sprayed on the crop; drought- or salt-tolerant varieties protect yields in marginal lands; virus-resistant papaya protects against ringspot virus. GM animals: fast-growing salmon with a growth-hormone gene; goats producing spider silk proteins in milk; pigs with phytase improving phosphorus uptake to cut phosphate pollution.</p>

<h3>GM applications at a glance</h3>
<table>
<tr><th>Organism</th><th>Gene added</th><th>Result</th></tr>
<tr><td>E. coli bacteria</td><td>Human insulin gene</td><td>Producing human insulin cheaply in fermenters</td></tr>
<tr><td>Bt crops (maize, cotton)</td><td>Bacillus thuringiensis toxin gene</td><td>Insecticidal leaves, less chemical pesticide</td></tr>
<tr><td>Golden Rice</td><td>beta-carotene genes</td><td>Provitamin A, reducing vitamin A deficiency</td></tr>
<tr><td>Herbicide-tolerant soya</td><td>Herbicide resistance gene</td><td>Survives weedkiller, easier weed control</td></tr>
<tr><td>Papaya</td><td>Virus coat protein gene</td><td>Resistance to ringspot virus</td></tr>
</table>

<h3>Benefits and risks — argue with mechanisms</h3>
<p>Benefits: higher crop yields and food security (feeding a growing population); crops with added nutrition (Golden Rice addressing vitamin A deficiency); disease-, pest-, drought- and salt-resistant varieties reducing losses and chemical use; faster livestock growth; cheaper pharmaceuticals (insulin, clotting factors); reduced pesticide run-off (Bt crops); bioremediation (bacteria engineered to digest oil spills or break down plastics). Risks and concerns: unintended effects on human health (new proteins might be allergenic or toxic — though tested rigorously); gene transfer to wild relatives creating super-weeds (herbicide resistance escaping into wild populations); harm to non-target species (Bt pollen killing monarch butterfly larvae is the classic study); loss of biodiversity if a few engineered varieties dominate; corporate control of seed (patents raise costs for farmers, who cannot save seed); ethical/religious objections to crossing species boundaries ("playing God"); antibiotic resistance marker genes potentially transferring to pathogens; and monoculture vulnerability. The exam's standard instruction is "evaluate" or "discuss" — give at least two benefits and two risks with biological reasoning, then a justified conclusion. The balance is genuinely contested: the science (gene flow, allergenicity) can be tested, while the ethics and economics are value judgements.</p>

<h3>Bioprocessing and other applications</h3>
<p>Bioremediation: microorganisms (naturally occurring or engineered) break down pollutants — oil-eating bacteria (Alcanivorax) after spills, digesters breaking down sewage, fungi accumulating heavy metals from contaminated soil (mycoremediation). Gene therapy: replacing or supplementing a faulty gene in a patient's cells to treat genetic disorders (cystic fibrosis trials deliver a functional CFTR gene to airway cells using a viral vector); somatic changes affect only the individual, while germline editing (heritable) is internationally restricted. Cloning: tissue culture micropropagation (growing whole plants from tiny explants — identical, disease-free stock); animal cloning by nuclear transfer (Dolly the sheep — nucleus from a body cell into an enucleated egg); advantages (preserve elite genetics, revive endangered species) and disadvantages (low success rate, reduced diversity, welfare issues). DNA fingerprinting in forensics and paternity: variable DNA regions are amplified by PCR, separated by gel electrophoresis and compared; matching profiles establish identity. Each of these is examinable at mechanism level: be able to state the tool (restriction enzyme, ligase, vector, PCR) and the purpose for each.</p>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Writing that GM "mixes all the genes of two species": only one or a few specific genes are transferred.</li>
<li>Confusing restriction enzymes (cut DNA) with ligase (joins DNA fragments) in the technique sequence.</li>
<li>Forgetting the vector (plasmid): genes do not enter bacteria by magic — a carrier is required.</li>
<li>Leaving out the marker gene when asked "how do scientists know which cells have been modified".</li>
<li>Saying fermenters "feed bacteria sugar only": a fermenter controls temperature, pH, oxygen and sterility — name two or more controls for full marks.</li>
<li>Answering a GM-evaluation question with only benefits (or only risks): the command word "evaluate" requires both sides plus a judgement.</li>
<li>Claiming GM food is "proven safe" or "proven dangerous": the scientific position is that approved GM foods pass rigorous testing, while specific risks (gene flow, allergens) are assessed case by case.</li>
<li>Confusing biotechnology (whole organisms/products in industry) with genetic modification (transferring specific genes) — GM is a subset.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p>Q1. Describe how a gene for human growth hormone could be inserted into bacteria. (5 marks) Answer: isolate the gene and copy it (1); cut the gene and a plasmid with the same restriction enzyme (1); sticky ends allow the gene to pair with the plasmid (1); DNA ligase joins them to form recombinant DNA (1); plasmid is taken up by the bacteria which now express the gene (1).</p>
<p>Q2. Explain the role of a marker gene in genetic modification. (2 marks) Answer: the marker (e.g. antibiotic resistance or fluorescence) is inserted alongside the desired gene (1); only cells containing the recombinant DNA survive the antibiotic or glow, identifying successful transformation (1).</p>
<p>Q3. Explain how Bt crops reduce the use of chemical pesticides. (3 marks) Answer: the plants carry a bacterial gene for an insecticidal toxin (1); pests that eat the leaves are killed by the toxin (1); so fewer chemical sprays are needed, reducing run-off and harm to non-target species (1).</p>
<p>Q4. Describe two uses of microorganisms in biotechnology. (4 marks) Answer: yeast ferments glucose to ethanol for bread and alcoholic drinks (1); Penicillium in fermenters produces the antibiotic penicillin (1); bacteria make yoghurt and cheese by converting lactose to lactic acid (1); anaerobic bacteria in biogas digesters produce methane from waste (1).</p>
<p>Q5. Evaluate the use of genetically modified crops. (4 marks) Answer: benefits — higher yields and food security, added nutrients like Golden Rice, less pesticide use with Bt crops (1 per two); risks — gene flow creating super-weeds, effects on non-target insects, corporate control of seed (1 per two); judgement balancing tested benefits against managed risks in regulation (1).</p>
`,
};

const titles = {
  "9369ec55-bf64-4bcf-987a-dbc2d96a06a0": "IGCSE Biology: Inheritance",
  "51eb3656-5b3a-446b-9416-70b08a1776fe": "IGCSE Biology: Variation and Selection",
  "b6bc221a-eb16-488f-9e32-65eb3beaa3a5": "IGCSE Biology: Organisms and their Environment",
  "ef15d699-c8bb-47b4-aa60-e9d0fb29d8f2": "IGCSE Biology: Human Influences on Ecosystems",
  "bed703c4-851e-4ab8-96e6-cc56be8ce619": "IGCSE Biology: Biotechnology and Genetic Modification",
};

module.exports = { rows, titles };
