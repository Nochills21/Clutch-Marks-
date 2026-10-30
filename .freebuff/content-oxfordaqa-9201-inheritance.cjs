// OxfordAQA International GCSE Biology 9201 — topic 3.5 Inheritance.
// Statements covered: 3.5.1 Reproduction, 3.5.2 Cell division, 3.5.3 Genetic
// variation, 3.5.4 Genetic disorders, 3.5.5 Genetic manipulation.
//
// The genetic cross is the one calculation in the topic and the one most often
// lost, so a monohybrid cross is worked twice: once from parents to probability,
// once from probability back to expected numbers in a family.
module.exports = {
  topicSlug: "inheritance",
  title: "IGCSE Biology (OxfordAQA): Inheritance",
  html: `<h2>Inheritance</h2>
<p>Every cell in your body carries the same set of instructions, written in DNA and packaged into chromosomes, and this topic is about how that set is copied, halved, shuffled and sometimes changed. Two divisions do the copying and halving; alleles decide which version of a characteristic appears; a genetic cross predicts the odds; and genetic engineering and cloning are the technologies that follow once you can read and cut DNA. The exam treats the cross as arithmetic — set out the gametes, fill the grid, read the ratio — so the worked examples below are the ones to practise rather than the vocabulary.</p>

<h3>1. Sexual and asexual reproduction</h3>
<p>Sexual reproduction involves two parents and the fusion of gametes, so the offspring are genetically different from each other and from their parents. Asexual reproduction involves one parent and no gamete fusion, so the offspring are genetically identical clones.</p>
<table border="1">
  <tr><th>Feature</th><th>Sexual</th><th>Asexual</th></tr>
  <tr><td>Parents</td><td>Two</td><td>One</td></tr>
  <tr><td>Gametes</td><td>Fused (sperm and egg)</td><td>None</td></tr>
  <tr><td>Offspring</td><td>Genetically varied</td><td>Genetically identical clones</td></tr>
  <tr><td>Examples</td><td>Humans, flowering plants</td><td>Bacteria, strawberry runners, potato tubers</td></tr>
  <tr><td>Advantage</td><td>Variation helps a population survive a change</td><td>Fast, and needs only one parent</td></tr>
</table>
<p>Some organisms do both depending on conditions — aphids reproduce asexually in summer when food is plentiful and sexually in autumn, which is variation exactly when it is useful.</p>

<h3>2. Cell division: mitosis and meiosis</h3>
<p>Mitosis produces two genetically identical diploid cells and is used for growth, repair and asexual reproduction. Meiosis produces four genetically different haploid gametes and happens only in the reproductive organs.</p>
<ul>
  <li><strong>Diploid</strong> means two copies of each chromosome, one from each parent; human body cells are diploid with 46 chromosomes.</li>
  <li><strong>Haploid</strong> means one copy of each chromosome; human gametes are haploid with 23.</li>
  <li><strong>Meiosis</strong> halves the chromosome number so that fertilisation restores the diploid number, and it shuffles the chromosomes and their alleles, which is where genetic variation comes from.</li>
  <li><strong>Mitosis</strong> copies the chromosomes first, then divides once, so each new cell has the full set.</li>
</ul>
<p>The order of events matters: in meiosis the chromosomes line up in pairs and are pulled apart twice, so four cells result; in mitosis they line up singly and are pulled apart once, so two cells result.</p>

<h3>3. Genetic variation</h3>
<p>A gene is a section of DNA that codes for a characteristic. Different versions of the same gene are <strong>alleles</strong>, and the combination an organism carries is its <strong>genotype</strong>; the characteristic you can see is its <strong>phenotype</strong>.</p>
<ul>
  <li><strong>Dominant</strong> alleles are expressed even when only one copy is present, written with a capital letter.</li>
  <li><strong>Recessive</strong> alleles are expressed only when two copies are present, written with a lower-case letter.</li>
  <li><strong>Homozygous</strong> means two identical alleles (AA or aa); <strong>heterozygous</strong> means two different alleles (Aa).</li>
  <li><strong>Co-dominance</strong> means both alleles are expressed, as in AB blood group or a roan coat.</li>
</ul>
<p>Variation comes from three sources: the genes inherited from two parents, meiosis shuffling the alleles, and mutation. Environmental factors such as diet and exercise also affect phenotype, which is why identical twins are not perfectly identical.</p>

<h3>4. Worked example: a monohybrid cross</h3>
<p>Two heterozygous parents (Aa × Aa) have children. A is the dominant allele for free earlobes; a gives attached earlobes. Predict the ratio of phenotypes and the probability that a child has attached earlobes.</p>
<p>Each parent's gametes are A and a, so the grid gives AA, Aa, Aa and aa: the ratio is 1 AA : 2 Aa : 1 aa. Three of the four combinations carry at least one A, so 3 have free earlobes and 1 has attached — a phenotype ratio of 3 : 1. The probability of attached earlobes is 1 in 4, or 25 %.</p>
<p><em>Key:</em> A = dominant allele (free earlobes); a = recessive allele (attached earlobes); AA and Aa = free earlobes because A is expressed; aa = attached earlobes because both alleles are recessive.</p>
<p>Now run it the other way. If the couple has four children, each child independently has a 25 % chance, so the expected number with attached earlobes is 4 × 0.25 = 1 — but a family of four can easily have none or two. Expected numbers are probabilities multiplied by the number of children, not a promise.</p>

<h3>5. Genetic disorders</h3>
<p>Some disorders are caused by a single gene and are inherited in a predictable pattern, which is why a genetic cross can estimate the risk.</p>
<ul>
  <li><strong>Cystic fibrosis</strong> is caused by a recessive allele. A person inherits it only with two copies (cc); a carrier (Cc) has one copy and no symptoms, so two carrier parents have a 1 in 4 chance of an affected child.</li>
  <li><strong>Polydactyly</strong> — extra fingers or toes — is caused by a dominant allele, so a person with one copy has the condition and can pass it to half their children.</li>
</ul>
<p>Genetic screening tests for these alleles before or during pregnancy, and for embryos during IVF. It gives parents information, and raises the ethical question of what to do with it; the exam asks for both sides, so give one benefit and one concern rather than a verdict.</p>

<h3>6. Genetic manipulation and cloning</h3>
<p>Genetic engineering moves a gene from one organism to another. A human gene for insulin, for example, is cut out with an enzyme, inserted into a bacterial plasmid using another enzyme, and the bacteria are grown in a fermenter to produce insulin.</p>
<ul>
  <li><strong>Advantages:</strong> insulin is produced in large quantities, is identical to human insulin so fewer reactions occur, and the process does not depend on animal pancreases.</li>
  <li><strong>Concerns:</strong> the long-term effects of genetically modified organisms on ecosystems are uncertain, and some people object on ethical or religious grounds.</li>
  <li><strong>Cloning</strong> by embryo transplant takes a fertilised egg, splits it into several embryos and implants them into surrogates, producing identical offspring. Adult cell cloning transfers the nucleus of a body cell into an egg cell with its nucleus removed.</li>
  <li><strong>Cloning plants</strong> by cuttings or tissue culture is cheap and preserves a desirable variety, but the whole crop is equally vulnerable to one disease.</li>
</ul>

<h3>7. Typical mistakes</h3>
<ul>
  <li>Saying meiosis produces two cells. It produces four, each with half the chromosome number.</li>
  <li>Writing "a recessive allele is weaker". It is not weaker; it is simply not expressed when a dominant allele is present.</li>
  <li>Giving a genotype ratio when the question asks for a phenotype ratio, or forgetting to say which phenotype is which.</li>
  <li>Claiming a 3 : 1 ratio guarantees three of one and one of the other in a family of four.</li>
  <li>Confusing a carrier with an affected person. A carrier has one copy of a recessive allele and no symptoms.</li>
  <li>Describing genetic engineering as "breeding". Breeding selects existing alleles; engineering moves a gene between species.</li>
  <li>Saying clones are "identical in every way". They share genotype, but environment still affects phenotype.</li>
</ul>

<h3>8. Exam-style questions</h3>
<ol>
  <li>Compare mitosis and meiosis in terms of the cells produced. <em>Answer:</em> Mitosis gives two genetically identical diploid cells; meiosis gives four genetically different haploid gametes.</li>
  <li>Explain why meiosis is important for sexual reproduction. <em>Answer:</em> It halves the chromosome number so that fertilisation restores the diploid number, and it creates genetic variation by shuffling alleles.</li>
  <li>A heterozygous brown-eyed parent (Bb) has children with a blue-eyed parent (bb). What proportion of the children would be expected to have blue eyes? <em>Answer:</em> The gametes are B and b from one parent and b and b from the other, giving Bb, Bb, bb and bb — so 50 % would be expected to have blue eyes.</li>
  <li>Two carriers of cystic fibrosis have a child. State the probability the child is affected and explain. <em>Answer:</em> 1 in 4, or 25 %: both parents are Cc, so one combination in four is cc, and cc is the only genotype that gives the condition.</li>
  <li>Explain why two parents with the same phenotype can have a child with a different one. <em>Answer:</em> Both parents may be heterozygous carriers of a recessive allele, so the child can inherit the recessive allele from each and show the recessive phenotype.</li>
  <li>Give one advantage and one concern of genetic engineering. <em>Answer:</em> Advantage: insulin can be produced in large amounts and is identical to human insulin. Concern: the long-term effects of releasing genetically modified organisms into the environment are uncertain.</li>
  <li>Explain why cloning a plant produces a crop that is uniformly vulnerable. <em>Answer:</em> The plants are genetically identical, so none of them carries resistance to a disease that the others lack, and the whole crop can be lost together.</li>
</ol>

<h3>9. Revision checklist</h3>
<ul>
  <li>I can compare sexual and asexual reproduction.</li>
  <li>I can compare mitosis and meiosis and say where each happens.</li>
  <li>I can define gene, allele, genotype, phenotype, homozygous and heterozygous.</li>
  <li>I can complete a Punnett square and give a phenotype ratio and a probability.</li>
  <li>I can explain cystic fibrosis and polydactyly as recessive and dominant inheritance.</li>
  <li>I can describe genetic engineering of insulin and give one advantage and one concern.</li>
  <li>I can describe embryo transplant and adult cell cloning.</li>
</ul>
`,
};
