/**
 * The ten deep-but-incomplete notes: the sections they were missing, plus house
 * titles. Nothing here replaces what already teaches — the builder
 * (.freebuff/build-depth-appends.cjs) splices each block into the live body and
 * keeps every existing paragraph, so the edit is an append, not a rewrite.
 *
 * House shape for the appended part: a worked example where the note had none,
 * then the mistakes that lose marks, then exam-style questions with answers.
 * Modules are template literals: no backticks inside the content, no "${", and
 * no "$" anywhere (deepen-materials dollar-quotes the body, and a stray tag
 * would end the literal early).
 *
 * Each row may use:
 *   replace  [[from, to]]      exact, must hit exactly once
 *   before   { match, html }   insert before the <h3> whose text matches
 *   tail     html              appended at the end of the body
 */
module.exports = {
  expectType: "notes",
  edits: [
    /* ── Biology AS (Edexcel IAS, WBI12 Topic 3) ────────────────────────── */
    {
      topic: "cell-structure-reproduction-and-development",
      title: "AS Level Biology: Cell Structure, Reproduction and Development",
      tail: `
<h3>Typical mistakes</h3>
<ul>
<li><strong>Describing an organelle instead of answering the question.</strong> "Mitochondria have cristae" earns nothing when the question asks why a cell needs many of them. State the function — aerobic respiration, so an ATP supply — and link it to the cell's demand, such as the tail of a sperm or the active transport in a kidney cell.</li>
<li><strong>Confusing magnification with resolution.</strong> Magnification is how much larger the image is than the object; resolution is the smallest distance at which two points are still seen as separate. The electron microscope wins on resolution, and that is why it separates cristae and ribosomes that a light microscope blurs together.</li>
<li><strong>Forgetting to convert units in a magnification calculation.</strong> Put image size and real size in the same unit before dividing. 1 mm is 1 000 micrometres, and the mark is often for the unit as much as the number.</li>
<li><strong>Using the cell wall alone to identify a plant cell.</strong> Bacteria and fungi have walls too. Use the cellulose wall together with the chloroplast or the large permanent vacuole, and remember that plant cells lack centrioles.</li>
<li><strong>Mixing up mitosis and meiosis.</strong> Mitosis: one division, two genetically identical diploid cells, for growth and asexual reproduction. Meiosis: two divisions, four genetically non-identical haploid cells, for gametes.</li>
<li><strong>Saying meiosis "creates variation" without naming the source.</strong> Crossing over in prophase I and independent assortment in metaphase I are separate marks; the names of the prophase stages are not required.</li>
<li><strong>Counting every cell in the mitotic index.</strong> Interphase cells belong in the total, never in the numerator: mitotic index = cells in mitosis divided by all cells in the field.</li>
<li><strong>Treating epigenetics as a change in the DNA sequence.</strong> Methylation and histone modification change which genes are active without altering the base sequence, and the pattern can be passed to daughter cells after division.</li>
</ul>
<h3>Exam-style questions</h3>
<ol>
<li>A nucleus measures 42 mm across on an electron micrograph taken at a magnification of 7 000. Calculate its actual width. <em>Answer:</em> 42 mm = 42 000 micrometres. Actual size = image size divided by magnification = 42 000 / 7 000 = 6 micrometres.</li>
<li>Explain two features of a sperm cell that adapt it for fertilisation. <em>Answer:</em> many mitochondria in the midpiece supply ATP for the flagellum, so the cell can swim to the egg; the acrosome contains hydrolytic enzymes that digest through the zona pellucida so the sperm can reach the egg membrane.</li>
<li>Give three features visible in an electron micrograph that identify a cell as prokaryotic. <em>Answer:</em> circular DNA lying free in the cytoplasm with no nuclear envelope; 70S ribosomes, smaller than eukaryotic 80S ribosomes; no membrane-bound organelles such as mitochondria or Golgi; a peptidoglycan cell wall, sometimes with a capsule, plasmids, flagella or pili.</li>
<li>Explain how a protein destined for secretion is made and released. <em>Answer:</em> ribosomes on the rough endoplasmic reticulum synthesise the polypeptide; the rER folds it and packages it into a vesicle; the vesicle fuses with the Golgi apparatus, which modifies the protein, for example by adding carbohydrate; a secretory vesicle carries it to the plasma membrane and releases it by exocytosis.</li>
<li>A root tip squash contains 80 cells in the field of view, of which 12 show visible chromosomes. Calculate the mitotic index. <em>Answer:</em> 12 / 80 = 0.15, or 15 per cent of the cells are in mitosis. A high value in a root tip is expected because the meristem is growing.</li>
<li>Explain how the cortical reaction prevents a second sperm from fertilising the egg. <em>Answer:</em> when the first sperm fuses with the egg membrane, cortical granules release their contents into the space outside the egg; this hardens the zona pellucida and destroys the binding sites, so no further sperm can penetrate.</li>
<li>Explain two ways in which meiosis produces gametes that are genetically different from each other. <em>Answer:</em> crossing over in prophase I exchanges alleles between non-sister chromatids of a homologous pair, so each chromatid carries a new combination; independent assortment in metaphase I means the maternal and paternal chromosomes of each pair line up randomly, giving 2 to the power n different combinations for n pairs.</li>
<li>Explain how one gene can give rise to more than one protein. <em>Answer:</em> the primary transcript can be spliced in different ways, so different mature mRNAs carry different exon combinations; each mRNA is translated into a different polypeptide. Epigenetic modification can also switch the gene on or off in different cells, so the same gene produces protein in one cell type and not in another.</li>
</ol>`,
    },

    /* ── Biology AS (Edexcel IAS, WBI11 Topic 2) ────────────────────────── */
    {
      topic: "membranes-proteins-dna-and-gene-expression",
      title: "AS Level Biology: Membranes, Proteins, DNA and Gene Expression",
      tail: `
<h3>How substances cross a membrane, compared</h3>
<table border="1" cellpadding="6">
<tr><th>Route</th><th>Direction</th><th>Protein needed</th><th>ATP used</th><th>Example</th></tr>
<tr><td>Simple diffusion</td><td>Down the concentration gradient</td><td>No</td><td>No</td><td>Oxygen into a cell</td></tr>
<tr><td>Facilitated diffusion</td><td>Down the concentration gradient</td><td>Channel or carrier</td><td>No</td><td>Glucose into a red blood cell through a carrier</td></tr>
<tr><td>Osmosis</td><td>Down a water potential gradient</td><td>No (partially permeable membrane)</td><td>No</td><td>Water into a root hair cell</td></tr>
<tr><td>Active transport</td><td>Against the concentration gradient</td><td>Carrier that changes shape</td><td>Yes, ATP hydrolysed</td><td>Ions reabsorbed in the kidney</td></tr>
<tr><td>Endocytosis and exocytosis</td><td>Into or out of the cell in a vesicle</td><td>No, membrane fusion</td><td>Yes</td><td>Phagocytosis of a bacterium; secretion of an enzyme</td></tr>
</table>
<h3>Typical mistakes</h3>
<ul>
<li><strong>Writing that active transport "uses energy" and stopping there.</strong> The mark is for ATP being hydrolysed to change the shape of the carrier protein, which moves the substance against its gradient.</li>
<li><strong>Confusing water potential with solute concentration.</strong> Pure water at atmospheric pressure has a water potential of zero, and every solution has a negative value. Water moves from the less negative (higher) water potential to the more negative one.</li>
<li><strong>Swapping codon and anticodon.</strong> The codon is the triplet on messenger RNA; the anticodon is the triplet on transfer RNA that pairs with it.</li>
<li><strong>Saying DNA polymerase unzips the helix.</strong> Helicase breaks the hydrogen bonds between the strands; DNA polymerase then adds free nucleotides to the exposed template, always in the 5-prime to 3-prime direction.</li>
<li><strong>Claiming the Meselson and Stahl experiment showed dispersive replication.</strong> After one generation in nitrogen-15 there was a single hybrid band, and after two generations there were hybrid and light bands. A dispersive model would have given a single intermediate band throughout.</li>
<li><strong>Assuming a dominant allele is the more common one.</strong> Dominance describes expression in the heterozygote, not frequency in the population.</li>
<li><strong>Confusing amniocentesis with chorionic villus sampling.</strong> Amniocentesis samples amniotic fluid at about 15 to 17 weeks; chorionic villus sampling takes placental tissue at about 8 to 12 weeks, earlier but with a higher risk of miscarriage.</li>
<li><strong>Explaining cystic fibrosis without a mechanism.</strong> The mutation changes the chloride channel, so chloride and water cannot cross normally, secretions become thick, and the airways, pancreatic duct and vas deferens are affected. Name the ion, the effect on the secretion and the effect on the organ.</li>
</ul>
<h3>Exam-style questions</h3>
<ol>
<li>Explain why the fluid mosaic model was modified as new evidence appeared. <em>Answer:</em> the model is an interpretation of data, not a direct observation. Freeze-fracture electron micrographs showed proteins embedded within the bilayer rather than coating it, and experiments on membrane fusion showed that proteins move within the membrane, so the model was revised to show a fluid bilayer with proteins partly or wholly embedded.</li>
<li>A potato cylinder loses mass after 30 minutes in 0.6 mol per dm cubed sucrose solution. Explain the loss in terms of water potential. <em>Answer:</em> the sucrose solution has a lower (more negative) water potential than the vacuole contents, so water leaves the cells by osmosis down a water potential gradient through the partially permeable membranes, the cells lose turgor, and the cylinder shrinks.</li>
<li>Distinguish facilitated diffusion from active transport. <em>Answer:</em> both use membrane proteins, but facilitated diffusion moves substances down their concentration gradient through channels or carriers and needs no ATP, while active transport moves them against the gradient using a carrier whose shape is changed by ATP hydrolysis.</li>
<li>Describe the evidence that DNA replication is semi-conservative. <em>Answer:</em> bacteria were grown in nitrogen-15 so that all DNA was heavy, then transferred to nitrogen-14. After one generation all DNA was of intermediate density, which rules out conservative replication; after two generations half the DNA was intermediate and half light, which fits each new molecule keeping one parental strand.</li>
<li>Give the role of the template strand, the codon and the anticodon in protein synthesis. <em>Answer:</em> the template (antisense) strand is the DNA strand that RNA polymerase copies; the codon is the triplet of bases on mRNA that specifies one amino acid; the anticodon on tRNA is complementary to the codon and pairs with it at the ribosome so that the correct amino acid is added.</li>
<li>Explain how a substitution and a deletion affect the polypeptide differently. <em>Answer:</em> a substitution changes one base, so at most one codon changes and, because the code is degenerate, the amino acid sequence may not change at all. A deletion shifts the reading frame, so every codon after the mutation is different and the protein is usually non-functional.</li>
<li>A carrier mother and an unaffected father are expecting a child. Explain the probability that a son is colour blind. <em>Answer:</em> the mother is heterozygous, with one affected X chromosome and one normal X chromosome. A son inherits one of her X chromosomes with equal probability, so half the sons are colour blind. Daughters receive the father's normal X, so none is colour blind, although half are carriers.</li>
<li>Explain how the mutation that causes cystic fibrosis impairs three body systems. <em>Answer:</em> the three-base deletion removes one amino acid from the chloride channel protein, so chloride transport is faulty and water follows less readily. Mucus in the airways becomes thick and blocks gas exchange; the pancreatic duct blocks so digestive enzymes do not reach the gut; the vas deferens is absent or blocked, reducing male fertility.</li>
</ol>`,
    },

    /* ── Biology AS (Edexcel IAS, WBI11 Topic 1 and 2.1, 2.6-2.8) ──────── */
    {
      topic: "molecules-transport-and-health",
      title: "AS Level Biology: Molecules, Transport and Health",
      tail: `
<h3>The tests in Core Practicals 1, 2 and 4, compared</h3>
<table border="1" cellpadding="6">
<tr><th>Test</th><th>Detects</th><th>Positive result</th><th>What makes it semi-quantitative</th></tr>
<tr><td>Benedict's reagent, heated</td><td>Reducing sugars</td><td>Blue to green, yellow, orange or brick-red precipitate</td><td>Comparing the colour with a set of standards made from known concentrations</td></tr>
<tr><td>Iodine solution</td><td>Starch</td><td>Orange-brown to blue-black</td><td>Judging the depth of colour against standards</td></tr>
<tr><td>Biuret reagent</td><td>Peptide bonds, so protein</td><td>Blue to purple or lilac</td><td>Colour standards for known protein concentrations</td></tr>
<tr><td>DCPIP</td><td>Vitamin C</td><td>Blue to colourless</td><td>Volume of sample needed to decolourise a fixed volume of DCPIP</td></tr>
<tr><td>Emulsion test</td><td>Lipid</td><td>Milky white emulsion after adding water to an ethanol extract</td><td>None: it is a qualitative test</td></tr>
</table>
<h3>Statistical analysis for practical papers: spread and significance</h3>
<p>Every measurement you make varies, and statistics is the machinery that separates a real difference from the noise of the bench. Start with the mean: the sum of the values divided by the number of values, which locates the centre of a data set. The mean alone hides the spread, though, and spread is what decides whether two data sets really differ. Standard deviation measures that spread: it is the average distance of the individual values from the mean, weighted so that points far from the centre count for more. A small standard deviation means the values cluster tightly around the mean (a precise method); a large one means they scatter (an unreliable method or a genuinely variable system). The formula is standard deviation = the square root of the sum of each value minus the mean, squared, divided by n minus one, where n is the number of values. The n minus one is Bessel's correction: dividing by one fewer than the sample size corrects the bias of estimating spread from a sample rather than the whole population.</p>
<p>Standard error of the mean then estimates how precisely your mean estimates the true population mean: standard error = standard deviation divided by the square root of n. The 95 per cent confidence interval is the mean plus or minus 1.96 times the standard error: if you repeated the experiment many times, 95 of every 100 such intervals would contain the true mean. The practical rule for a quick judgement is that when the 95 per cent confidence intervals of two means do not overlap, the difference is probably significant. On a graph, error bars drawn as plus or minus one standard deviation show the spread of the data; bars drawn as plus or minus two standard error (or 95 per cent confidence) show the precision of the mean — say which you have drawn, because they answer different questions.</p>
<h3>Worked example: standard deviation and a t-test from raw data</h3>
<p>Ten students each count stomata in one field of view at the leaf surface and one at the leaf underside: surface counts 12, 15, 14, 13, 16 and underside counts 34, 38, 36, 35, 37. Step 1: the means: surface = (12 + 15 + 14 + 13 + 16) / 5 = 70 / 5 = 14; underside = (34 + 38 + 36 + 35 + 37) / 5 = 180 / 5 = 36. Step 2: the standard deviation of the surface counts: deviations from the mean are −2, +1, 0, −1, +2; the squares are 4, 1, 0, 1, 4, which sum to 10; divide by n minus one = 4 to give a variance of 2.5; the square root of 2.5 = 1.58, so the standard deviation is 1.58 stomata per field. Step 3: state the result in the form the examiner wants: mean 14, standard deviation 1.58, n = 5. Step 4: to test whether the surface and underside differ significantly, state a null hypothesis — there is no significant difference between the mean counts at the surface and the underside — then apply the t-test for two means: t equals the difference between the means divided by the square root of the sum of each variance divided by its n. With standard deviations of 1.58 and 1.64 for the two sets and n = 5 in each, t = (36 − 14) / sqrt(2.5 / 5 + 2.7 / 5) = 22 / sqrt(1.04) = 22 / 1.02 = 21.6. Step 5: degrees of freedom = n1 + n2 − 2 = 8; the critical value of t at p = 0.05 for 8 degrees of freedom is 2.306; since 21.6 is far larger than 2.306, the probability that this difference arose by chance is less than 5 per cent, so reject the null hypothesis and conclude that the underside has significantly more stomata. Wording matters: never write that you "proved" a difference; write that the difference is significant at the 5 per cent level.</p>
<p>The chi-squared test does the same job for category counts rather than measurements. If you expect a 3:1 ratio and observe 78 dominant and 22 recessive offspring from 100, the expected values are 75 and 25. Chi-squared = the sum of (observed minus expected) squared divided by expected = (78 − 75)² / 75 + (22 − 25)² / 25 = 9 / 75 + 9 / 25 = 0.12 + 0.36 = 0.48. With one degree of freedom (categories minus one), the critical value at p = 0.05 is 3.84. Since 0.48 is below 3.84, accept the null hypothesis: the data do not differ significantly from a 3:1 ratio. Correlation coefficients work the same way in reverse — a value near plus or minus one indicates a strong association, but correlation is never proof of causation, and confounding variables must be considered.</p>
<h3>Presenting and evaluating data</h3>
<ul>
<li>Plot the independent variable on the x-axis and the dependent variable on the y-axis, always with units, and choose a scale that fills the graph rather than cramping it into one corner.</li>
<li>Join points on a line graph with a smooth line of best fit, not a dot-to-dot zigzag; the line should pass through the mean of any repeated values at each x.</li>
<li>Repeat every measurement at least three times and take a mean; a single reading cannot show an anomaly, and anomaly detection is a mark in evaluation questions.</li>
<li>Identify anomalies honestly and say whether you would discard them and why; never invent a rule after seeing the data.</li>
<li>Control variables must be named with the method of control: not just "temperature" but "water bath set at 25 degrees Celsius".</li>
<li>Errors are random (scattered in both directions, reduced by repeats and larger samples) or systematic (biased in one direction, reduced by calibrating the apparatus); percentage error = uncertainty divided by the measured value, times 100.</li>
<li>Evaluate with pairs: a limitation and the improvement that answers it — small sample, so increase n; measurement at fixed time points, so record continuously; parallax reading, so read at eye level or use a data logger.</li>
<li>Sample size and the t-test: the test assumes roughly normal data and similar variances; small samples make significance hard to reach, so report the actual p threshold used (p = 0.05 is the convention).</li>
</ul>
<h3>Typical mistakes</h3>
<ul>
<li><strong>Explaining water's properties from polarity alone.</strong> Polarity matters because it allows hydrogen bonds, and it is the hydrogen bonds that give water its high specific heat capacity, its high latent heat of vaporisation and its cohesion.</li>
<li><strong>Confusing condensation with hydrolysis.</strong> Condensation joins monomers and releases water; hydrolysis adds water and splits the bond. State which one is happening before you name the bond.</li>
<li><strong>Describing unsaturated fatty acids as "less healthy" instead of describing their structure.</strong> Unsaturated chains contain one or more carbon-carbon double bonds, so the chain kinks, the molecules cannot pack closely, and the substance is liquid at room temperature.</li>
<li><strong>Giving the artery wall as "thick" without saying why.</strong> The elastic and muscle tissue withstands and smooths high pressure from the ventricles. Capillaries are one cell thick to shorten the diffusion distance, and veins have valves to prevent backflow.</li>
<li><strong>Reading the oxygen dissociation curve backwards.</strong> A curve shifted to the right shows a lower affinity for oxygen, so haemoglobin unloads oxygen more readily to respiring tissue. That is the Bohr effect, and it is caused by a higher carbon dioxide concentration and lower pH.</li>
<li><strong>Treating correlation as causation.</strong> A study that finds a statistical association has not shown that one factor causes the other; confounding variables, sample size and study design all have to be evaluated first.</li>
<li><strong>Mixing up the treatments for cardiovascular disease.</strong> Statins lower blood cholesterol, antihypertensives lower blood pressure, anticoagulants reduce clotting, and platelet inhibitors reduce platelet aggregation. Name the effect, not just the drug.</li>
<li><strong>Forgetting the control variables in an enzyme practical.</strong> When temperature is the independent variable, pH, enzyme concentration and substrate concentration must be held constant, and the initial rate is measured from the steepest part of the graph, before substrate is used up.</li>
</ul>
<h3>Exam-style questions</h3>
<ol>
<li>Explain why water is an effective solvent for transport in organisms. <em>Answer:</em> the water molecule is a dipole, with a partial negative charge on the oxygen and partial positive charges on the hydrogens, so it attracts ions and polar molecules and surrounds them; this keeps them dissolved and able to move in the bloodstream or in xylem.</li>
<li>A heart beats 75 times a minute with a stroke volume of 70 cm cubed. Calculate the cardiac output in dm cubed per minute. <em>Answer:</em> cardiac output = heart rate times stroke volume = 75 times 70 = 5 250 cm cubed per minute, which is 5.25 dm cubed per minute.</li>
<li>An alveolus has a surface area of 0.02 m squared, a wall thickness of 0.0005 mm and an oxygen concentration difference of 40 units. Use Fick's law to explain what happens to the rate of diffusion if the wall thickens. <em>Answer:</em> rate is proportional to surface area times concentration difference divided by thickness. Thickening the wall increases the diffusion distance, so the rate falls in proportion. Rate = (0.02 times 40) / thickness, so doubling the thickness halves the rate.</li>
<li>Describe the sequence of events that leads to atherosclerosis. <em>Answer:</em> the endothelium is damaged (for example by high blood pressure or smoking); an inflammatory response attracts white blood cells and lipids into the wall; fatty deposits form a plaque (atheroma); the plaque narrows the artery and stiffens it, raising blood pressure; if the plaque ruptures, a clot forms and can block the artery, causing a heart attack or stroke.</li>
<li>Explain the role of haemoglobin in oxygen transport and how the Bohr effect helps a exercising muscle. <em>Answer:</em> haemoglobin binds oxygen in the lungs, where the partial pressure of oxygen is high, and releases it in tissues where it is low. Respiring muscle raises carbon dioxide and lowers pH, which shifts the dissociation curve to the right, lowering the affinity for oxygen so that more oxygen is unloaded where it is needed.</li>
<li>A student tests four solutions with Benedict's reagent and records the time taken to reach a brick-red colour. Explain how this design could be made semi-quantitative and reliable. <em>Answer:</em> fix the volume of solution, the volume of reagent, the temperature of the water bath and the time, then compare each result with a set of standards made from known concentrations. Repeat each measurement and take a mean, and use the same observer or a colorimeter to judge the end point.</li>
<li>Explain why a diet high in saturated fat and low in fruit and vegetables increases the risk of cardiovascular disease. <em>Answer:</em> saturated fat raises low-density lipoprotein cholesterol, which is deposited in artery walls and contributes to plaque formation; fruit and vegetables supply antioxidants that reduce the oxidation of LDL cholesterol, so a low intake removes part of that protection. Both act alongside other risk factors such as smoking, age and inactivity.</li>
<li>Explain the difference between a channel protein and a carrier protein in a membrane. <em>Answer:</em> a channel protein forms a pore through which specific ions or small polar molecules pass down their gradient; a carrier protein binds the substance and changes shape to move it across, which is how active transport can move substances against a gradient using ATP.</li>
</ol>`,
    },

    /* ── Biology AS (Edexcel IAS, WBI12 Topic 4) ────────────────────────── */
    {
      topic: "plant-structure-biodiversity-and-conservation",
      title: "AS Level Biology: Plant Structure and Function, Biodiversity and Conservation",
      replace: [["<h3>18. How to use this note and what to revise next</h3>", "<h3>19. How to use this note and what to revise next</h3>"]],
      before: {
        match: "How to use this note",
        html: `<h3>18. Hardy-Weinberg, zoos and seed banks: allele frequencies and conservation</h3>
<p>The Hardy-Weinberg equation tests whether a population is evolving. In a large population with random mating, no mutation, no migration and no selection, allele frequencies stay constant from generation to generation. Write the frequency of the dominant allele as p and the recessive allele as q. Then p + q = 1, and the genotype frequencies are p squared for the homozygous dominant, 2pq for the heterozygote and q squared for the homozygous recessive, so p squared + 2pq + q squared = 1. The value of the equation is that it gives a null expectation: if the observed genotype frequencies differ significantly from it, one of the assumptions is being broken and the allele frequencies are changing, which is evolution happening in front of you.</p>
<p>A worked use: a recessive condition affects 1 in 10 000 people, so q squared = 0.0001, q = 0.01 and p = 0.99. The carrier frequency is 2pq = 2 times 0.99 times 0.01 = 0.0198, about 1 in 50. That is why a rare recessive allele can be common in carriers while the disease itself stays rare, and it is the calculation the mark scheme wants rather than a guess from the disease frequency.</p>
<p>Conservation of genetic diversity is the other half of this section. Zoos use captive breeding programmes with studbooks to decide which animals pair, so that inbreeding is minimised and unrelated individuals are introduced; they also support scientific research and education, and run reintroduction programmes that prepare animals for the wild. The risks are that captive populations are small, so genetic drift and inbreeding reduce diversity, and that animals bred in captivity may lack the behaviour needed to survive on release. Seed banks store seeds at low temperature and low moisture, testing viability periodically and germinating samples to grow fresh seed, which protects genetic diversity far more cheaply than keeping animals. Their limits are that not all seeds survive drying, so some species need cryopreservation or living collections, and that a bank protects genes rather than the habitat the species needs. Evaluate both by naming what they conserve, what they cost and what they cannot do.</p>`,
      },
      tail: `
<h3>Typical mistakes</h3>
<ul>
<li><strong>Calling xylem living.</strong> Xylem vessels are dead, hollow, lignified tubes with no end walls, which is what allows a continuous water column. Phloem sieve tubes are living and supported by companion cells.</li>
<li><strong>Giving sclerenchyma a transport role.</strong> Sclerenchyma fibres provide support only; xylem transports water and mineral ions and also supports, and phloem translocates sugars and amino acids.</li>
<li><strong>Inverting the heterozygosity index.</strong> It is the number of heterozygotes divided by the number of individuals in the population, so it cannot exceed 1. A value of 1 would mean every individual is heterozygous.</li>
<li><strong>Reading a diversity index the wrong way round.</strong> Use the formula given on the paper and then say which site has the higher diversity; do not assume a small number means a diverse habitat.</li>
<li><strong>Missing the assumptions in a Hardy-Weinberg calculation.</strong> State that the population is large, mating is random and there is no selection or migration, and say that a significant difference in allele frequency between generations is evidence that one assumption is broken.</li>
<li><strong>Claiming aseptic technique keeps everything sterile.</strong> Aseptic technique keeps contamination out of the culture and the worker safe: sterilise the loop, flame the neck of the bottle, work near a flame, and dispose of plates in the correct way. The apparatus and the medium are sterilised before use, which is a different step.</li>
<li><strong>Describing drug trials without their purpose.</strong> A placebo controls for the expectation of improvement, a double-blind design stops the patient or the doctor influencing the result, and the three phases test safety, then effectiveness and dose, then comparison with existing treatment in a larger group.</li>
<li><strong>Using the three-domain system without the evidence.</strong> Archaea, Bacteria and Eukarya were separated after molecular evidence, particularly ribosomal RNA sequences, showed that the archaea are as different from bacteria as both are from eukaryotes. New data changing a classification is a strength of the system, not a flaw.</li>
</ul>
<h3>Exam-style questions</h3>
<ol>
<li>In a population of 2 000 plants, 120 are heterozygous at a particular locus. Calculate the heterozygosity index. <em>Answer:</em> 120 / 2 000 = 0.06. Only 6 per cent of the population is heterozygous, so the genetic diversity at that locus is low.</li>
<li>A recessive allele causing a disease is present in 1 in 2 500 births. Assuming Hardy-Weinberg conditions, calculate the carrier frequency. <em>Answer:</em> q squared = 1 / 2 500 = 0.0004, so q = 0.02 and p = 0.98. The carrier frequency is 2pq = 2 times 0.98 times 0.02 = 0.0392, about 1 in 25.</li>
<li>Explain how secondary thickening adapts a xylem vessel for its function. <em>Answer:</em> lignin is deposited in the wall, which makes it rigid so the vessel does not collapse under tension, and it makes the wall waterproof so water is not lost sideways; the strengthening also supports the plant.</li>
<li>Describe how you would compare the tensile strength of fibres from two plant stems. <em>Answer:</em> extract fibres of equal length from each stem, clamp each in turn and hang masses from it until it breaks, recording the mass that causes failure. Control fibre length, thickness and the point of attachment, repeat each measurement and compare means. The fibre that withstands the greater mass has the greater tensile strength.</li>
<li>Explain why a seed bank may conserve genetic diversity more effectively than a zoo. <em>Answer:</em> seeds are small, so many individuals and many species can be stored in a small space at low cost, and a large sample preserves more alleles than a small captive population that suffers inbreeding and genetic drift. A zoo is still needed for species whose seed cannot be stored or whose behaviour must be learned.</li>
<li>Explain the evidence that led to the three-domain classification. <em>Answer:</em> comparisons of ribosomal RNA and other molecular sequences showed that archaeal sequences differ from bacterial sequences as much as both differ from eukaryotes, so the archaea were placed in their own domain alongside Bacteria and Eukarya. The classification is based on genotype as well as phenotype, and it is revised when new molecular data are critically evaluated.</li>
<li>Withering's digitalis treatment and a modern double-blind trial are both tests of a drug. Explain two ways in which the modern protocol is an improvement. <em>Answer:</em> the modern trial uses a control group given a placebo, so improvement caused by expectation is separated from the effect of the drug, and it is randomised and double-blind, so neither patient nor doctor knows who received which treatment and bias is removed. It also uses measured doses and larger samples, so the result can be tested statistically.</li>
</ol>`,
    },

    /* ── Biology A2 (Edexcel IAL, WBI15 Topic 8) ────────────────────────── */
    {
      topic: "coordination-response-and-gene-technology",
      title: "A2 Level Biology: Coordination, Response and Gene Technology",
      replace: [["<h3>20. How to use this note and what to revise next</h3>", "<h3>21. How to use this note and what to revise next</h3>"]],
      before: {
        match: "How to use this note",
        html: `<h3>20. Plant responses: phytochrome, auxin, gibberellins and Core Practical 18</h3>
<p>Plants coordinate responses without a nervous system, using pigments and hormones that change gene expression. Phytochrome is a pigment that exists in two interconvertible forms. Red light at about 660 nm converts the inactive form, Pr, into the active form, Pfr; far-red light at about 730 nm converts Pfr back to Pr, and in darkness Pfr slowly reverts. Because daylight is rich in red light, Pfr accumulates during the day, so the ratio of Pfr to Pr tells the plant whether it is in light or shade and how long the night is. Pfr acts as a transcription factor: it enters the nucleus and switches on genes, for example for germination in lettuce seeds or for flowering in long-day plants. A brief flash of red light is enough to trigger germination, and a flash of far-red light immediately afterwards cancels it, which is the classic experimental evidence that phytochrome is the receptor.</p>
<p>Auxin, principally indoleacetic acid or IAA, is made in the shoot tip and moves down the stem. It is transported polarly, from cell to cell, and it accumulates on the shaded side of a shoot in phototropism and on the lower side of a root or shoot in gravitropism. In the shoot, a higher auxin concentration stimulates cell elongation, so the shaded side grows faster and the shoot bends towards the light. In the root the same concentration inhibits elongation, which is why a root bends downwards. Auxin works by binding a receptor that triggers the destruction of repressor proteins, so transcription factors are released and genes for wall-loosening enzymes are transcribed, allowing the cell wall to stretch.</p>
<p>Gibberellins promote stem elongation, seed germination and the transition to flowering. In a germinating cereal grain the embryo releases gibberellin, which diffuses to the aleurone layer and switches on transcription of the gene for amylase. The amylase is secreted into the endosperm, where it hydrolyses starch to maltose, which the embryo respires. Core Practical 18 investigates exactly this: sterilise and soak cereal grains, place them on starch agar with and without gibberellin, leave them to incubate, then flood the plate with iodine solution. Clear zones around the treated grains show that amylase has broken down the starch, and measuring or comparing the zones shows that gibberellin has induced the enzyme.</p>`,
      },
      tail: `
<h3>Worked example: reading an action potential trace</h3>
<p>Two electrodes on a giant axon are 30 mm apart. The trace shows an action potential arriving at the first electrode, and the same potential arriving at the second 1.5 ms later. Conduction velocity is distance divided by time, so the answer is 0.030 m divided by 0.0015 s = 20 m per second. Convert millimetres to metres and milliseconds to seconds before dividing, and give the unit, because the mark is for the calculation and the unit together.</p>
<p>The same trace gives information about the refractory period. If the axon cannot fire again for 5 ms after each impulse, the maximum frequency is 1 divided by 0.005 s = 200 impulses per second. That limit, not the size of the stimulus, is why a stronger stimulus cannot raise the frequency indefinitely: the all-or-nothing law means a bigger stimulus does not make a bigger impulse, it can only make more impulses or recruit more axons.</p>
<h3>Drugs and nerve transmission, compared</h3>
<table border="1" cellpadding="6">
<tr><th>Substance</th><th>Site of action</th><th>Effect</th></tr>
<tr><td>Nicotine</td><td>Binds nicotinic acetylcholine receptors on the postsynaptic membrane</td><td>Mimics acetylcholine, so the postsynaptic membrane depolarises; prolonged exposure desensitises the receptor</td></tr>
<tr><td>Lidocaine</td><td>Blocks voltage-gated sodium channels in the axon membrane</td><td>No sodium influx means no depolarisation, so no impulse is generated and the area is anaesthetised</td></tr>
<tr><td>Cobra venom alpha toxin</td><td>Binds nicotinic acetylcholine receptors and blocks them</td><td>Acetylcholine cannot bind, the postsynaptic membrane is not depolarised, and paralysis follows</td></tr>
<tr><td>L-DOPA</td><td>Crosses the blood-brain barrier and is converted to dopamine</td><td>Replaces the dopamine that is missing in Parkinson's disease, improving movement control</td></tr>
<tr><td>MDMA</td><td>Increases the release of serotonin and blocks its reuptake at synapses in the brain</td><td>Prolongs serotonin signalling, altering mood and perception and raising body temperature</td></tr>
</table>
<h3>Typical mistakes</h3>
<ul>
<li><strong>Making the action potential bigger with a bigger stimulus.</strong> The impulse is all-or-nothing; a stronger stimulus increases the frequency of impulses or the number of neurones firing, not the amplitude.</li>
<li><strong>Describing depolarisation as potassium leaving the axon.</strong> Depolarisation is sodium ions entering through voltage-gated sodium channels. Repolarisation is potassium ions leaving, and the sodium-potassium pump restores the resting distribution afterwards.</li>
<li><strong>Saying saltatory conduction is faster because the impulse jumps "through" the myelin.</strong> The myelin is an insulator, so the local circuits skip from one node of Ranvier to the next, where the channels are, which is why the impulse travels faster in a myelinated axon.</li>
<li><strong>Treating habituation as fatigue.</strong> Habituation is a learned decrease in response to a repeated harmless stimulus, as in the snail withdrawal response; the sensory and motor pathways still work, which is why a novel stimulus still produces a response.</li>
<li><strong>Using "MRI" for everything.</strong> MRI shows structure from the behaviour of hydrogen nuclei in a magnetic field; fMRI shows activity through changes in blood oxygenation; PET shows metabolic activity using a radioactive tracer such as labelled glucose; CT uses X-rays and shows dense tissue such as bone.</li>
<li><strong>Explaining a drug's effect without naming the protein or the ion.</strong> Say whether it mimics or blocks a receptor, or blocks a channel, and then say what that does to the postsynaptic membrane potential.</li>
<li><strong>Confusing nervous and hormonal coordination.</strong> Nervous control is electrical along neurones and chemical across synapses, so it is fast, short-lived and targeted. Hormonal control travels in the blood, so it is slower, longer-lasting and widespread.</li>
</ul>
<h3>Exam-style questions</h3>
<ol>
<li>Explain how the myelin sheath increases the speed of conduction. <em>Answer:</em> myelin is a lipid insulator wrapped by Schwann cells, so the membrane cannot depolarise where it is covered. The local circuit current therefore travels from one node of Ranvier to the next, where voltage-gated sodium channels are concentrated, and the impulse is regenerated at each node rather than continuously. This saltatory conduction is faster than conduction in an unmyelinated axon of the same diameter.</li>
<li>Describe the sequence of events at a cholinergic synapse. <em>Answer:</em> the arrival of an action potential depolarises the presynaptic membrane, which opens calcium channels; calcium ions enter and cause vesicles to fuse with the presynaptic membrane and release acetylcholine into the cleft; acetylcholine binds receptors on the postsynaptic membrane, which opens sodium channels and depolarises it; acetylcholinesterase then hydrolyses acetylcholine so the signal ends and the synapse can transmit again.</li>
<li>Explain how a rod cell signals the presence of light. <em>Answer:</em> light is absorbed by rhodopsin, which is retinal bound to opsin. The retinal changes shape, opsin is activated and triggers a cascade that breaks down a messenger molecule, so sodium channels close. Sodium ions stop entering, the cell hyperpolarises, and less neurotransmitter is released, which alters the rate of action potentials in the optic neurone. Rod cells therefore signal light by switching off rather than switching on.</li>
<li>Explain how L-DOPA relieves the symptoms of Parkinson's disease but dopamine itself does not. <em>Answer:</em> dopamine cannot cross the blood-brain barrier, so taken as a drug it does not reach the brain. L-DOPA is its precursor, crosses the barrier using amino acid transporters, and is converted to dopamine by enzymes in the brain, replacing the dopamine that the substantia nigra no longer supplies.</li>
<li>Explain how recombinant DNA is made and inserted into a bacterium. <em>Answer:</em> a restriction endonuclease cuts the gene out of the donor DNA at specific recognition sites, leaving sticky ends; the same enzyme cuts a plasmid vector, giving complementary sticky ends; DNA ligase joins the gene into the plasmid by forming phosphodiester bonds; the recombinant plasmid is inserted into a bacterium, for example by heat shock or electroporation, and the bacterium is selected, often with an antibiotic resistance marker, then grown to produce the protein.</li>
<li>Explain what a microarray shows and why it is useful. <em>Answer:</em> a microarray carries many known DNA probes fixed in a grid. Labelled cDNA made from the mRNA of a sample hybridises to the probes it matches, and the pattern and intensity of the signal show which genes are being transcribed. It therefore compares gene expression between samples, such as healthy and tumour tissue, without testing genes one at a time.</li>
<li>Give two benefits and two risks of using genetically modified organisms, and explain why the answer depends on the GMO. <em>Answer:</em> benefits could include higher yield or reduced pesticide use, and production of human insulin without the risk of animal-derived contamination. Risks could include genes spreading to wild relatives and long-term effects on ecosystems. Each assessment depends on which organism is modified, which gene is inserted and how it is regulated, because a crop modified for drought tolerance is not the same case as a modified animal.</li>
</ol>`,
    },

    /* ── Biology A2 (Edexcel IAL, WBI14 Topic 6) ────────────────────────── */
    {
      topic: "microbiology-immunity-and-forensics",
      title: "A2 Level Biology: Microbiology, Immunity and Forensics",
      tail: `
<h3>The four types of immunity, compared</h3>
<table border="1" cellpadding="6">
<tr><th>Type</th><th>How it is acquired</th><th>Antibodies made by the person</th><th>Duration</th></tr>
<tr><td>Natural active</td><td>Infection with the pathogen</td><td>Yes</td><td>Long, because memory cells remain</td></tr>
<tr><td>Natural passive</td><td>Antibodies cross the placenta or arrive in colostrum</td><td>No</td><td>Short, until the transferred antibodies are broken down</td></tr>
<tr><td>Artificial active</td><td>Vaccination with antigen or an attenuated pathogen</td><td>Yes</td><td>Long, and boosters raise the secondary response</td></tr>
<tr><td>Artificial passive</td><td>Injection of antibodies from another source, such as an antiserum</td><td>No</td><td>Short, but immediate</td></tr>
</table>
<h3>Typical mistakes</h3>
<ul>
<li><strong>Confusing aseptic technique with sterilisation.</strong> Apparatus and medium are sterilised before use; aseptic technique is how the worker keeps them sterile while handling them, by flaming the loop, passing the neck of the bottle through the flame and minimising the time the plate is open.</li>
<li><strong>Forgetting the dilution factor in a viable count.</strong> A count on a diluted sample must be multiplied by the dilution factor and divided by the volume plated, or the answer is out by orders of magnitude. Quote the units as cells per cm cubed.</li>
<li><strong>Reading the growth curve without the phase names.</strong> Lag phase: cells adapt and synthesise enzymes, so numbers rise slowly. Exponential phase: numbers double at a constant rate. Stationary: growth equals death as nutrients run low and waste builds. Death: death exceeds growth.</li>
<li><strong>Saying antibiotics are bactericidal when they are bacteriostatic.</strong> Bactericidal antibiotics kill the bacteria; bacteriostatic ones stop them dividing, so the immune system finishes the job. Penicillin is bactericidal because it blocks the cross-linking of peptidoglycan, so growing cells burst.</li>
<li><strong>Giving B and T cells the same job.</strong> B effector cells make and secrete antibodies and B memory cells make the secondary response faster. T helper cells release cytokines that activate B cells and macrophages, T killer cells destroy infected cells, and T memory cells persist.</li>
<li><strong>Describing PCR without its requirements.</strong> PCR needs a DNA template, primers, free nucleotides, a heat-stable DNA polymerase and a buffer, with repeated cycles of denaturation, annealing and extension. Each cycle doubles the DNA, so 30 cycles give 2 to the power 30 copies.</li>
<li><strong>Forgetting which electrode DNA moves towards.</strong> DNA is negatively charged because of its phosphate groups, so in gel electrophoresis it moves towards the positive electrode, and shorter fragments move further.</li>
<li><strong>Giving a single figure for time of death.</strong> It is an estimate from several methods, each with a limitation: body temperature depends on the environment, decomposition depends on conditions, and succession depends on the species available.</li>
</ul>
<h3>Exam-style questions</h3>
<ol>
<li>A 0.1 cm cubed sample of a 10 to the power minus 4 dilution produces 64 colonies. Calculate the number of viable cells in the original culture. <em>Answer:</em> 64 colonies in 0.1 cm cubed is 640 cells per cm cubed in the diluted sample; multiply by the dilution factor 10 000, giving 6.4 times 10 to the power 6 viable cells per cm cubed.</li>
<li>Explain why a viable count can be lower than a total count from a haemocytometer. <em>Answer:</em> a viable count only counts cells that can divide and form a colony, so dead cells and cells that are alive but not dividing are missed; a haemocytometer counts all cells, living and dead, present in the sample.</li>
<li>Describe how you would investigate the effect of different antibiotics on a bacterial culture, naming the variables. <em>Answer:</em> inoculate a lawn of the bacterium evenly over an agar plate using a sterile spreader, place discs soaked in equal volumes of different antibiotic solutions on the surface, incubate at a controlled temperature for a fixed time, and measure the diameter of the clear zone around each disc. Controls: a disc soaked in sterile water, and the same species, incubation temperature and time for every plate. A larger zone means greater inhibition, and repeats give a mean.</li>
<li>Explain how a vaccine produces immunity and why a booster is sometimes needed. <em>Answer:</em> the vaccine presents antigens, which are taken up by antigen-presenting cells; helper T cells activate the specific B cell carrying a matching receptor; the B cell divides into effector cells that secrete antibodies and memory cells that persist. A booster raises the antibody level again through the quicker, larger secondary response, and may be needed when the first dose did not produce enough memory cells or when the pathogen varies.</li>
<li>Explain how HIV and Mycobacterium tuberculosis cause disease. <em>Answer:</em> HIV binds the CD4 receptor on helper T cells, and the virus enters and replicates, eventually destroying the cells; the loss of helper T cells disables the immune response, so opportunistic infections cause AIDS. Mycobacterium tuberculosis is engulfed by macrophages but survives inside them, and the inflammatory response forms tubercles that damage the lung tissue, causing coughing and reduced gas exchange.</li>
<li>Explain how gel electrophoresis separates DNA fragments and what a DNA profile shows. <em>Answer:</em> fragments are cut with restriction enzymes and loaded into a gel; an electric field moves the negatively charged DNA towards the positive electrode, and shorter fragments travel further, so the fragments separate by length. A profile from several loci is a pattern that can identify an individual or show relatedness, because the pattern is inherited.</li>
<li>Explain how PCR amplifies DNA and why contamination is a problem. <em>Answer:</em> the mixture is heated to denature the double helix, cooled so primers anneal to the target sequences, then warmed so DNA polymerase extends the primers; each cycle doubles the number of target molecules. A single foreign DNA molecule can also be amplified, so contamination makes the sample unusable.</li>
</ol>`,
    },

    /* ── Biology A2 (Edexcel IAL, WBI14 Topic 5) ────────────────────────── */
    {
      // Deep and complete: every structural check already passes, and the page
      // budget now scales with its 26 statements. Only the title was wrong.
      topic: "energy-flow-ecosystems-and-environment",
      title: "A2 Level Biology: Energy Flow, Ecosystems and the Environment",
    },

    /* ── Biology A2 (Edexcel IAL, WBI15 Topic 7) ────────────────────────── */
    {
      topic: "respiration-muscles-and-internal-environment",
      title: "A2 Level Biology: Respiration, Muscles and the Internal Environment",
      before: {
        match: "Typical mistakes",
        html: `<h3>Respirometry: measuring oxygen uptake directly</h3>
<p>Gas exchange during respiration can be followed with a respirometer, the practical that links the pathways of respiration to a measurable rate. A conical tube holds germinating seeds (actively respiring), and a small inner tube holds soda lime or potassium hydroxide pellets, which absorb the carbon dioxide the seeds produce. Because carbon dioxide is removed, any change in gas volume inside the sealed apparatus is due to oxygen being used up: as oxygen is consumed, the gas pressure falls and the coloured drop of manometer fluid moves along the capillary towards the tube. The distance moved per unit time, converted to a volume through the bore of the capillary, measures the rate of oxygen uptake. A parallel tube with the same mass of dead (boiled) seeds corrects the reading for changes in atmospheric pressure and temperature, which move the drop without any respiration at all. The whole apparatus sits in a water bath, because even one degree of temperature change alters both respiration rate and gas volume enough to swamp the effect being measured. Variables: independent = temperature or seed type or germination stage; dependent = volume of oxygen consumed per gram per hour; controls = mass of seeds, volume of soda lime, capillary bore, time, and the dead-seed control.</p>
<h3>Worked example: from manometer reading to oxygen uptake</h3>
<p>Germinating peas with a mass of 1.00 g move the drop 3.0 cm in 30 minutes at 25 degrees Celsius; the dead-seed control moves 0.2 cm in the same period. Step 1: correct for the control: 3.0 − 0.2 = 2.8 cm of movement is due to respiration. Step 2: convert the distance to a volume through the capillary bore: the capillary has an internal radius of 0.5 mm (0.05 cm), so its cross-sectional area = pi times the radius squared = 3.14 times 0.05 squared = 3.14 times 0.0025 = 0.00785 cm². Volume = area times distance = 0.00785 times 2.8 = 0.0220 cm³ of oxygen in 30 minutes. Step 3: scale to an hourly, per-gram rate: 0.0220 times 2 = 0.0440 cm³ per hour for 1.00 g, so the rate = 0.044 cm³ of oxygen per gram per hour. Step 4: repeat at 15 and 35 degrees Celsius; between 15 and 25 the rate typically doubles with each 10-degree rise (more kinetic energy, so more frequent successful collisions of enzyme and substrate), then falls away at higher temperatures as the enzymes of the respiratory pathway denature. Step 5: evaluate the method: the apparatus is assumed gas-tight (grease the joints), the drop is assumed to move only because of oxygen use (hence the control), and germinating seeds are compared with equal masses so that the rate can be quoted per gram.</p>
<p>Designing a multivariable investigation (the Unit 6 style): if you want the effects of both temperature and germination stage, run a two-factor design — for example three temperatures crossed with two seed stages — with equal replicates in every cell of the design, so the two factors can be compared without confounding. Analyse each factor with its own comparison (or a two-way analysis of variance), state the null hypotheses separately, and evaluate with paired limitation-and-improvement points: seeds respire at different rates as they germinate, so define the stage by germination length; carbon dioxide absorption is only complete while the soda lime is fresh, so replace it for every run; evaporation from the seeds adds water vapour to the gas, so include a control for that or use a drying agent in the manometer arm.</p>`,
      },
      replace: [
        [
          "<p>Edexcel International A Level Biology — Unit 5 (WBI15), Topic 7.</p>",
          "<p>Edexcel International A Level Biology — Unit 5 (WBI15), Topic 7, covering statements 7.1 to 7.22: glycolysis, the link reaction, the Krebs cycle and oxidative phosphorylation, then muscles and the sliding filament, cardiac output and ventilation, negative feedback and thermoregulation, the kidney and osmoregulation, and the transcription factors that control gene expression. Work through the numbered sections, then test yourself on the mistakes and the exam-style questions at the end.</p>",
        ],
      ],
    },

    /* ── Computer Science AS (Cambridge 9618, 3.1, 3.2, 15.2) ──────────── */
    {
      topic: "hardware-and-logic-gates",
      title: "AS Level Computer Science: Hardware, Logic Gates and Boolean Algebra",
      tail: `
<h3>Worked example: simplifying a function and checking the answer</h3>
<p>Simplify F = A'BC + AB'C + ABC' + ABC. Start by grouping terms that differ in one variable. A'BC + ABC differ only in A, so they reduce to BC. AB'C + ABC reduce to AC, and ABC' + ABC reduce to AB. The function is therefore F = BC + AC + AB, the majority function: the output is 1 when at least two of the three inputs are 1. Check that on the original expression: the rows that should give 1 are 011, 101, 110 and 111, which match BC, AC, AB and all three together.</p>
<p>Now check a simplification made with De Morgan's laws rather than a K-map. Simplify Y = ((A + B) multiplied by C)'. Complement the whole expression: the complement of an AND is an OR of the complements, so Y = (A + B)' + C'. Then complement the bracket: (A + B)' = A' multiplied by B'. The result is Y = A'B' + C'. Test one row to be sure: with A = 1, B = 0, C = 0, the original gives (1 multiplied by 0)' = 1, and the simplification gives (0 multiplied by 1) + 1 = 1. A single check row does not prove the simplification, but it catches the common errors of dropping a complement or changing the wrong operator.</p>
<h3>Typical mistakes</h3>
<ul>
<li><strong>Treating XOR as OR.</strong> OR is 1 when at least one input is 1; XOR is 1 only when the inputs differ, so it is 0 for 1 and 1. Read the gate symbol, not just the name.</li>
<li><strong>Losing the bracket scope in a complement.</strong> A multiplied by B' is not the same as (A multiplied by B)'. Write out the grouping before applying De Morgan, and complement the whole bracketed expression, not one term of it.</li>
<li><strong>Swapping Sum and Carry in an adder.</strong> Sum is the XOR of the inputs; Carry is the AND, or for a full adder the majority of A, B and carry-in. For 1 plus 1 the Sum is 0 and the Carry is 1, which is the opposite of what a careless answer gives.</li>
<li><strong>Breaking the Gray-code order in a K-map.</strong> Row and column labels run 00, 01, 11, 10 so that neighbouring cells differ by one variable. Placing labels in binary order groups cells that are not adjacent, and the simplified expression is then wrong.</li>
<li><strong>Grouping diagonal cells or a non-power-of-two rectangle.</strong> Groups must be 1, 2, 4, 8 and so on adjacent cells, and groups may wrap around the edges. Each group contributes a term containing only the variables that stay constant.</li>
<li><strong>Forgetting that S = R = 1 is forbidden in an SR latch.</strong> Both outputs would go low, which breaks the complementary-output condition. The JK flip-flop removes this state by toggling when J = K = 1.</li>
</ul>
<h3>Exam-style questions</h3>
<ol>
<li>Simplify F = A + A'B. <em>Answer:</em> F = A + B. Either factor out the terms as (A + A')(A + B) using the distributive law, since A + A' = 1, or note that when A = 0 the expression is B and when A = 1 it is 1, which is exactly A + B.</li>
<li>Use a K-map to simplify F(A, B, C) = the sum of minterms 0, 2, 4 and 6. <em>Answer:</em> the rows 000, 010, 100 and 110 all have C = 0 and the other two variables vary, so the four cells form one group and the only constant is C = 0. F = C'.</li>
<li>State the Sum and Carry-out of a full adder when A = 1, B = 1 and carry-in = 1. <em>Answer:</em> the total is 3, which is 11 in binary, so Sum = 1 and Carry-out = 1.</li>
<li>Write the truth table for Y = (A multiplied by B) + C' and give the output when A = 1, B = 0, C = 1. <em>Answer:</em> the expression is 1 when both A and B are 1, or when C is 0. With A = 1, B = 0, C = 1, the AND term is 0 and C' is 0, so Y = 0.</li>
<li>Explain how a JK flip-flop differs from an SR latch. <em>Answer:</em> a JK flip-flop removes the forbidden input combination: with J = 1 and K = 1 the output toggles to its complement instead of forcing both outputs low. With J = 1, K = 0 it sets, with J = 0, K = 1 it resets, and with J = 0, K = 0 it holds its state, so it stores one bit until clocked again.</li>
<li>A greenhouse heater is switched by a control system. Identify the sensor, actuator and feedback, and explain why the system is closed loop. <em>Answer:</em> the sensor is a temperature sensor, the actuator is the heater, and the feedback is the measured temperature compared with the target. It is closed loop because the system measures the result of its own action and changes its output accordingly, unlike a monitoring system that only records readings.</li>
</ol>`,
    },

    /* ── English as a Second Language (Oxford) IGCSE ───────────────────── */
    {
      topic: "tenses-in-context",
      title: "IGCSE English as a Second Language: Tenses in Context",
      tail: `
<h3>Worked example: choosing tenses in a passage</h3>
<p>Read the passage first, without filling any gaps. Ask two questions: when does each event happen, and how does it relate to the other events? Only then choose the form. Take this passage: "Last summer I (1) ____ (travel) to Malaysia with my cousin. We (2) ____ (stay) there for three weeks, and by the end of the trip we (3) ____ (visit) six cities."</p>
<p>Gap 1 has a finished past time marker, "last summer", so it takes the past simple: travelled. Gap 2 describes a state that lasted for a period in the finished past, which also takes the past simple: stayed. Gap 3 describes something completed before another past point, "by the end of the trip", so it takes the past perfect: had visited. The same time reference, the past, produces three different forms because the relationships between the events are different. That is the whole skill: the time word gives the family, and the relationship gives the form within it.</p>
<h3>Model answer with examiner annotation</h3>
<p><strong>Question:</strong> "By the time the train arrived, we (wait) for over an hour." <strong>Answer:</strong> had been waiting.</p>
<p><strong>Why it earns the mark:</strong> the event started before the train arrived and continued up to that moment, so it is a past action in progress with a stated duration. The past perfect continuous is the form for exactly that combination, "for over an hour" supplies the duration, and "by the time" marks the second past point. <strong>What a weaker answer looks like:</strong> "waited" ignores the continuation and treats the waiting as a finished block; "were waiting" shows the action in progress but loses the sense that it had already lasted an hour; "have been waiting" moves the action into the present and contradicts the past arrival. In a gap-fill task the examiner is checking that the auxiliary and the participle both belong to the time you have chosen, so write the complete form rather than the main verb alone.</p>
<h3>Exam-style questions</h3>
<ol>
<li>"She ____ (live) in Dubai since 2018." <em>Answer:</em> has lived. The action started in the past and continues to the present, and "since" marks the starting point.</li>
<li>"When we arrived at the cinema, the film ____ (already, start)." <em>Answer:</em> had already started. The film started before the arrival, so the earlier past action takes the past perfect.</li>
<li>"Look at those clouds. It ____ (rain) in a minute." <em>Answer:</em> is going to rain. The evidence is visible now and the prediction is immediate, so "going to" fits better than "will".</li>
<li>"If I ____ (know) the answer, I would tell you." <em>Answer:</em> knew. This is the second conditional, an unreal present situation, so the if-clause takes the past simple and the main clause takes would plus the infinitive.</li>
<li>"The results ____ (publish) every year in June." <em>Answer:</em> are published. This is a regular event in the present and the subject receives the action, so the present simple passive is correct.</li>
<li>"He ____ (work) here for three years when he was promoted." <em>Answer:</em> had been working. The working continued up to the promotion, a past point, so the past perfect continuous shows the duration before it.</li>
</ol>`,
    },
  ],
};
