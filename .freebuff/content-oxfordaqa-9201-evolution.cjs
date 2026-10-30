// OxfordAQA International GCSE Biology 9201 — topic 3.6 Variation and evolution.
// Statements covered: 3.6.1 Continuous and discontinuous variation, 3.6.2
// Natural selection.
//
// The exam asks for the mechanism in order — variation, competition, survival,
// reproduction, inheritance — so it is set out as a numbered chain and then
// applied twice: to a moth population and to antibiotic resistance, which is the
// example students are most often asked to explain.
module.exports = {
  topicSlug: "variation-and-evolution",
  title: "IGCSE Biology (OxfordAQA): Variation and Evolution",
  html: `<h2>Variation and Evolution</h2>
<p>No two individuals are identical, and that difference is the raw material of evolution. This topic separates the two kinds of variation an exam can ask you to plot, explains where variation comes from, and then walks through natural selection as a sequence rather than a slogan: variation exists, competition follows, some variants survive, they reproduce, and their alleles become more common. Once that chain is clear, selective breeding, antibiotic resistance and the fossil record are all the same argument applied to different timescales — and the answer to "explain how" becomes a list of five steps instead of a guess.</p>

<h3>1. Continuous and discontinuous variation</h3>
<p>Variation is the difference between individuals of the same species. It is either continuous or discontinuous, and the distinction decides which graph you draw.</p>
<table border="1">
  <tr><th>Feature</th><th>Continuous</th><th>Discontinuous</th></tr>
  <tr><td>Values</td><td>Any value in a range</td><td>Distinct categories, with no intermediate values</td></tr>
  <tr><td>Graph</td><td>A line graph or histogram</td><td>A bar chart</td></tr>
  <tr><td>Controlled by</td><td>Many genes, plus the environment</td><td>Usually one gene, or a few</td></tr>
  <tr><td>Examples</td><td>Height, mass, leaf length, hand span</td><td>Blood group, eye colour, earlobe type, tongue rolling</td></tr>
</table>
<p>A person's height is not "tall" or "short" — it falls somewhere on a smooth continuum, and it depends on diet as well as genes. Blood group has no in-between: you are A, B, AB or O, and no environment changes that.</p>

<h3>2. Where variation comes from</h3>
<p>Variation has three genetic sources and one environmental one, and most characteristics are a mixture.</p>
<ul>
  <li><strong>Inherited alleles</strong> — different combinations from two parents.</li>
  <li><strong>Meiosis</strong> — shuffles chromosomes into gametes, so each gamete is different.</li>
  <li><strong>Mutation</strong> — a change in the DNA sequence, which creates new alleles. Most mutations have no effect or are harmful; a few are useful.</li>
  <li><strong>Environment</strong> — diet, exercise, sunlight and disease all change phenotype. A plant grown in shade is taller and thinner than its genetically identical twin in full sun.</li>
</ul>
<p>Identical twins share every allele, so any difference between them is environmental. That is the cleanest evidence for the environmental component of variation, and it is a common exam item.</p>

<h3>3. Worked example: describing continuous data</h3>
<p>A student measures the hand span of 10 classmates in centimetres: 18, 19, 19, 20, 20, 20, 21, 22, 22, 23. Calculate the mean and the range, and say which graph should display the data.</p>
<p>mean = total ÷ number of values = 204 ÷ 10 = 20.4 cm. Range = largest − smallest = 23 − 18 = 5 cm. The data are continuous, so a histogram or line graph is appropriate, with hand span on the x-axis and frequency on the y-axis.</p>
<p><em>Key:</em> mean = the sum of the measurements divided by how many there are (cm); range = the difference between the largest and smallest values (cm); frequency = how many individuals fall in each group.</p>
<p>Now suppose 5 % of a moth population is dark and the rest pale. In a population of 2 000 moths, that is 0.05 × 2 000 = 100 dark moths. If pollution darkens the trees and the dark proportion rises to 60 % in the next generation, that is 1 200 dark moths — a change in allele frequency, which is evolution measurable in one line.</p>

<h3>4. Natural selection</h3>
<p>Natural selection is the mechanism of evolution, and it is marked as a sequence. Learn the five steps in order.</p>
<ol>
  <li>Individuals in a population vary, because of mutation and the shuffling of alleles.</li>
  <li>More offspring are produced than can survive, so there is competition for resources.</li>
  <li>Individuals with variations that suit the environment are more likely to survive and reproduce.</li>
  <li>They pass those advantageous alleles to their offspring.</li>
  <li>Over many generations the proportion of individuals with the advantageous allele increases, and the population changes.</li>
</ol>
<p>The peppered moth is the standard example: pale moths were camouflaged on lichen-covered trees, but industrial pollution killed the lichen and blackened the bark, so dark moths were less visible to birds, survived, and became common. When clean-air legislation returned the lichen, the pale form increased again — which shows the process tracks the environment rather than moving in one direction.</p>

<h3>5. Antibiotic resistance</h3>
<p>Antibiotic resistance is natural selection happening in days rather than millennia, and it is the example the specification expects you to be able to explain.</p>
<ul>
  <li>Bacteria vary: a random mutation gives some individuals resistance to an antibiotic.</li>
  <li>The antibiotic kills the non-resistant bacteria, removing the competition.</li>
  <li>The resistant bacteria survive, reproduce and pass on the resistance allele.</li>
  <li>The population becomes resistant, so the antibiotic stops working.</li>
</ul>
<p>Because of this, doctors prescribe antibiotics only when they are needed, patients complete the full course, and antibiotics are not used for viral infections. Those three rules are the answer to "how can resistance be reduced".</p>

<h3>6. Speciation</h3>
<p>A species is a group of organisms that can breed together to produce fertile offspring. Speciation happens when populations become isolated — by a river, a mountain range or an ocean — so they stop interbreeding.</p>
<ul>
  <li>Each population experiences different selection pressures, so different alleles become common.</li>
  <li>Over many generations the populations become so different that they can no longer interbreed successfully.</li>
  <li>They are now separate species, even if they meet again.</li>
</ul>
<p>Isolation is the key word: without it, the two populations would keep mixing and the differences would not accumulate.</p>

<h3>7. Selective breeding and extinction</h3>
<p>Selective breeding is artificial selection: humans choose which individuals reproduce, so the desirable alleles become common.</p>
<ul>
  <li><strong>Method:</strong> choose parents with the desired characteristic, breed them, select the best offspring, and repeat over many generations.</li>
  <li><strong>Examples:</strong> high-yield wheat, disease-resistant crops, dairy cattle that produce more milk, dogs bred for particular traits.</li>
  <li><strong>Drawbacks:</strong> the population becomes genetically similar, so a single disease can wipe it out; and inbreeding can produce inherited health problems.</li>
  <li><strong>Extinction</strong> happens when a species cannot adapt to a change — a new predator, a lost habitat, a disease or climate change — and every individual dies.</li>
</ul>
<p>The fossil record provides evidence for evolution: it shows organisms that no longer exist, and sequences of change such as the increasing size of horse ancestors. It is incomplete, because most organisms do not fossilise, which is why the record is evidence rather than a complete account.</p>

<h3>8. Typical mistakes</h3>
<ul>
  <li>Plotting continuous data as a bar chart, or discontinuous data as a line graph.</li>
  <li>Writing "the moth wanted to be dark" or "the bacteria learned to resist". Individuals do not adapt on purpose; the population changes because some individuals already have the allele.</li>
  <li>Saying an individual evolves. Individuals do not evolve; populations do, over generations.</li>
  <li>Giving only "survival of the fittest" without the variation, inheritance and generations that make it a mechanism.</li>
  <li>Confusing natural selection with selective breeding. One is driven by the environment, the other by humans.</li>
  <li>Claiming the fossil record is complete, or that a gap disproves evolution.</li>
  <li>Forgetting that a species must produce fertile offspring. A horse and a donkey produce a mule, which is infertile, so they are separate species.</li>
</ul>

<h3>9. Exam-style questions</h3>
<ol>
  <li>Explain whether human height shows continuous or discontinuous variation. <em>Answer:</em> Continuous: height can take any value in a range, is controlled by many genes and is also affected by the environment such as diet.</li>
  <li>Give two sources of genetic variation. <em>Answer:</em> Mutation, which creates new alleles, and meiosis, which shuffles alleles into different gametes.</li>
  <li>Explain how a population of bacteria becomes resistant to an antibiotic. <em>Answer:</em> A random mutation gives some bacteria resistance; the antibiotic kills the non-resistant ones; the resistant bacteria survive, reproduce and pass the allele on, so the proportion of resistant bacteria increases.</li>
  <li>Describe how natural selection could produce darker moths in a polluted area. <em>Answer:</em> The population varies in colour; on soot-blackened bark, dark moths are better camouflaged and less likely to be eaten; they survive, reproduce and pass on the dark allele; over generations the dark form becomes common.</li>
  <li>Explain why two populations on opposite sides of a mountain might become separate species. <em>Answer:</em> They are isolated and cannot interbreed, so they experience different selection pressures and their allele frequencies diverge until they can no longer produce fertile offspring together.</li>
  <li>Give one advantage and one drawback of selective breeding. <em>Answer:</em> Advantage: it produces crops or animals with higher yield or disease resistance. Drawback: the population becomes genetically similar, so a single disease could destroy the whole crop.</li>
  <li>A student records hand spans of 19, 20, 20, 21 and 25 cm. Calculate the mean and state what the 25 cm value is called. <em>Answer:</em> mean = 105 ÷ 5 = 21 cm; 25 cm is an outlier, far from the rest of the data.</li>
</ol>

<h3>10. Revision checklist</h3>
<ul>
  <li>I can distinguish continuous and discontinuous variation and choose the right graph.</li>
  <li>I can name the sources of genetic and environmental variation.</li>
  <li>I can calculate a mean and a range.</li>
  <li>I can give the five steps of natural selection in order.</li>
  <li>I can explain antibiotic resistance as natural selection.</li>
  <li>I can explain speciation through isolation.</li>
  <li>I can describe selective breeding and its drawbacks.</li>
  <li>I can explain extinction and the evidence from fossils.</li>
</ul>
`,
};
