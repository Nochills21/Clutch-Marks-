// IGCSE Biology depth pass, tranche 2 — inheritance.
//
// The existing note teaches the monohybrid cross as a procedure. This section
// makes the square a probability table, then applies it to the three cases the
// exam sets hardest: the test cross, pedigrees and sex linkage. Two figures: a
// labelled Punnett square and a three-generation pedigree.
//
//   node .freebuff/refine-note-sections.cjs .freebuff/content-bio-ol-deep-d.cjs
module.exports = {
  sections: [
    {
      id: "9369ec55-bf64-4bcf-987a-dbc2d96a06a0",
      slug: "inheritance",
      heading: "Inheritance: probability, pedigrees and sex linkage",
      html: `<h2>Inheritance: probability, pedigrees and sex linkage</h2>
<p>A Punnett square is not a drawing exercise; it is a table of outcomes for two independent events. Once you read it that way, the questions that look different — the chance of two children both being affected, whether a purple plant is BB or Bb, why an affected girl must have an affected father — all reduce to the same square and the same arithmetic. This section works those cases in full, then reads a family tree the way a geneticist does.</p>

<h3>Why a Punnett square is a probability table</h3>
<p>Each parent produces gametes by meiosis, and which allele a gamete carries is a matter of chance. A heterozygote (Tt) makes half T gametes and half t gametes. Because the two parents' gametes combine independently, the chance of any particular combination is the product of the two chances: the chance of a t gamete from the mother and a t gamete from the father is ½ × ½ = ¼, which is the bb box. That is why the four boxes are equally likely and why a 3:1 ratio means "three of the four equally likely outcomes". The arithmetic generalises in two ways the exam uses. For a single child, read the fraction straight off the square: ¼ affected, ¾ unaffected. For two separate children, multiply the fractions, because the children are independent events: the chance that both are affected is ¼ × ¼ = 1/16. Adding is only for alternatives — the chance of one affected child and one unaffected child (in either order) is (¼ × ¾) + (¾ × ¼) = 3/8.</p>

<h3>The test cross, done properly</h3>
<p>A purple flower could be BB or Bb, and no amount of looking at it will tell you which, because the dominant allele hides the recessive one. The test cross answers the question by crossing the unknown with a homozygous recessive (bb), whose gametes are all b. If the unknown is BB, every offspring receives B and is purple — all the offspring, not most of them. If it is Bb, half its gametes carry b, so about half the offspring are white. Two marks come from stating which cross to do and what each result would prove; a third comes from saying that the conclusion is about probability, so a small family can mislead: a heterozygous parent might, by chance, produce three purple offspring and no white one. Geneticists therefore quote the expected ratio and the sample size together, never a single result.</p>

<figure>
<svg viewBox="0 0 560 300" role="img" aria-labelledby="punnett-title" preserveAspectRatio="xMidYMid meet">
<title id="punnett-title">A Punnett square for a cross between two heterozygous tall pea plants, showing the four equally likely offspring genotypes and the 3 to 1 phenotype ratio</title>
<text x="120" y="30" font-size="13" fill="hsl(var(--muted-foreground))" text-anchor="middle">gametes from parent 1</text>
<text x="34" y="150" font-size="13" fill="hsl(var(--muted-foreground))" text-anchor="middle" transform="rotate(-90 34 150)">gametes from parent 2</text>
<text x="150" y="62" font-size="18" fill="hsl(var(--gold-deep))" text-anchor="middle">T</text>
<text x="290" y="62" font-size="18" fill="hsl(var(--gold-deep))" text-anchor="middle">t</text>
<text x="105" y="132" font-size="18" fill="hsl(var(--gold-deep))" text-anchor="middle">T</text>
<text x="105" y="222" font-size="18" fill="hsl(var(--gold-deep))" text-anchor="middle">t</text>
<rect x="150" y="80" width="140" height="70" fill="hsl(var(--gold) / 0.12)" stroke="hsl(var(--border))" stroke-width="1.2"/>
<rect x="290" y="80" width="140" height="70" fill="hsl(var(--gold) / 0.12)" stroke="hsl(var(--border))" stroke-width="1.2"/>
<rect x="150" y="150" width="140" height="70" fill="hsl(var(--gold) / 0.12)" stroke="hsl(var(--border))" stroke-width="1.2"/>
<rect x="290" y="150" width="140" height="70" fill="hsl(var(--gold) / 0.06)" stroke="hsl(var(--border))" stroke-width="1.2"/>
<text x="220" y="122" font-size="20" fill="hsl(var(--foreground))" text-anchor="middle">TT</text>
<text x="360" y="122" font-size="20" fill="hsl(var(--foreground))" text-anchor="middle">Tt</text>
<text x="220" y="192" font-size="20" fill="hsl(var(--foreground))" text-anchor="middle">Tt</text>
<text x="360" y="192" font-size="20" fill="hsl(var(--foreground))" text-anchor="middle">tt</text>
<text x="220" y="140" font-size="11" fill="hsl(var(--muted-foreground))" text-anchor="middle">tall</text>
<text x="360" y="140" font-size="11" fill="hsl(var(--muted-foreground))" text-anchor="middle">tall</text>
<text x="220" y="210" font-size="11" fill="hsl(var(--muted-foreground))" text-anchor="middle">tall</text>
<text x="360" y="210" font-size="11" fill="hsl(var(--muted-foreground))" text-anchor="middle">short</text>
<text x="455" y="110" font-size="12" fill="hsl(var(--foreground))">3 tall : 1 short</text>
<text x="455" y="128" font-size="12" fill="hsl(var(--muted-foreground))">= 75 % : 25 %</text>
<text x="455" y="178" font-size="12" fill="hsl(var(--foreground))">1 TT : 2 Tt : 1 tt</text>
<text x="455" y="196" font-size="12" fill="hsl(var(--muted-foreground))">each box = ¼</text>
<line x1="430" y1="122" x2="440" y2="170" stroke="hsl(var(--border))" stroke-width="1" stroke-dasharray="3 3"/>
<text x="280" y="272" font-size="12" fill="hsl(var(--muted-foreground))" text-anchor="middle">Each of the four boxes is equally likely, because each gamete is equally likely.</text>
</svg>
<figcaption><strong>Figure 1.</strong> Tt × Tt. The square is not a picture of the family — it is the list of four equally likely fertilisations, which is why the ratio is 3:1 and each genotype carries its own fraction.</figcaption>
</figure>

<h3>Reading a pedigree</h3>
<p>A pedigree is a family tree with squares for males, circles for females and shading for an affected individual. Three rules do almost all the work. First, if two unaffected parents have an affected child, the condition must be recessive: each parent carries a hidden allele and passes it on, and the child is the only one showing it. Second, if every affected child has at least one affected parent, and the condition appears in every generation, it is likely dominant. Third, if the condition is X-linked recessive, affected individuals are overwhelmingly male, no affected father ever passes it to a son (he gives his son Y), and every affected daughter must have an affected father — because she needs a recessive allele on both X chromosomes, and one of them came from him. Apply the rules before doing any squares: the pattern tells you the mode of inheritance, and the mode tells you what genotypes to test.</p>

<figure>
<svg viewBox="0 0 560 300" role="img" aria-labelledby="pedigree-title" preserveAspectRatio="xMidYMid meet">
<title id="pedigree-title">A three-generation pedigree in which two unaffected parents have an affected son, identifying the condition as autosomal recessive</title>
<rect x="60" y="30" width="30" height="30" fill="none" stroke="hsl(var(--foreground))" stroke-width="1.6"/>
<circle cx="175" cy="45" r="15" fill="none" stroke="hsl(var(--foreground))" stroke-width="1.6"/>
<line x1="90" y1="45" x2="160" y2="45" stroke="hsl(var(--foreground))" stroke-width="1.4"/>
<text x="125" y="22" font-size="12" fill="hsl(var(--muted-foreground))" text-anchor="middle">generation 1</text>
<line x1="125" y1="45" x2="125" y2="88" stroke="hsl(var(--foreground))" stroke-width="1.4"/>
<line x1="70" y1="88" x2="180" y2="88" stroke="hsl(var(--foreground))" stroke-width="1.4"/>
<line x1="70" y1="88" x2="70" y2="108" stroke="hsl(var(--foreground))" stroke-width="1.4"/>
<line x1="180" y1="88" x2="180" y2="108" stroke="hsl(var(--foreground))" stroke-width="1.4"/>
<rect x="55" y="108" width="30" height="30" fill="none" stroke="hsl(var(--foreground))" stroke-width="1.6"/>
<rect x="165" y="108" width="30" height="30" fill="hsl(var(--gold))" stroke="hsl(var(--gold-deep))" stroke-width="1.6"/>
<text x="125" y="164" font-size="12" fill="hsl(var(--muted-foreground))" text-anchor="middle">generation 2</text>
<text x="70" y="188" font-size="11" fill="hsl(var(--muted-foreground))" text-anchor="middle">unaffected</text>
<text x="180" y="188" font-size="11" fill="hsl(var(--foreground))" text-anchor="middle">affected</text>
<line x1="180" y1="138" x2="180" y2="216" stroke="hsl(var(--foreground))" stroke-width="1.4"/>
<rect x="165" y="216" width="30" height="30" fill="hsl(var(--gold))" stroke="hsl(var(--gold-deep))" stroke-width="1.6"/>
<text x="180" y="266" font-size="11" fill="hsl(var(--foreground))" text-anchor="middle">affected son</text>
<text x="300" y="70" font-size="12" fill="hsl(var(--foreground))">Two unaffected parents,</text>
<text x="300" y="88" font-size="12" fill="hsl(var(--foreground))">affected child:</text>
<text x="300" y="108" font-size="12" fill="hsl(var(--gold-deep))">the condition is recessive.</text>
<text x="300" y="140" font-size="12" fill="hsl(var(--muted-foreground))">Both parents must be carriers</text>
<text x="300" y="158" font-size="12" fill="hsl(var(--muted-foreground))">and pass the hidden allele on.</text>
<text x="300" y="196" font-size="12" fill="hsl(var(--foreground))">If the affected are all male and</text>
<text x="300" y="214" font-size="12" fill="hsl(var(--foreground))">no father passes it to a son,</text>
<text x="300" y="232" font-size="12" fill="hsl(var(--gold-deep))">suspect X-linked recessive.</text>
</svg>
<figcaption><strong>Figure 2.</strong> The shape of a pedigree carries the diagnosis: unaffected parents with an affected child can only be recessive, and if the affected are male-only with no father-to-son transmission, the gene is likely on the X.</figcaption>
</figure>

<h3>Sex linkage worked in full</h3>
<p>Write the X and Y explicitly, because the chromosomes are the point. A carrier mother of colour blindness is XᴮXᵇ and a colour-blind father is XᵇY. His gametes are Xᵇ and Y; hers are Xᴮ and Xᵇ. The four combinations are XᴮXᵇ (a carrier daughter with normal vision), XᵇXᵇ (an affected daughter), XᴮY (a normal son) and XᵇY (an affected son). Two results follow that students often miss. Half the daughters are affected, not none — the earlier example only gave none because the father had normal vision. And no son can be affected by his father, because a father gives his son Y; every affected son inherits the allele from his mother. That single sentence is worth a mark in almost every sex-linkage question.</p>

<h3>Codominance, multiple alleles and blood groups</h3>
<p>Blood group is the cleanest example of two things the syllabus asks about at once. There are three alleles in the population (Iᴬ, Iᴮ and i), but any one person carries only two — that is what "multiple alleles" means. Iᴬ and Iᴮ are codominant: a person with both makes both antigens, so the phenotype is AB, not a blend. The square still works: cross Iᴬi (group A, carrier of O) with Iᴮi (group B, carrier of O) and the four boxes are IᴬIᴮ (AB), Iᴬi (A), Iᴮi (B) and ii (O) — a 1:1:1:1 phenotypic ratio. The medical consequence is the reason blood groups matter: a person with group A has anti-B antibodies, so transfusing B blood causes the donated cells to be attacked. Group O carries no A or B antigen and is the universal donor for red cells; group AB has neither antibody and is the universal recipient.</p>

<h3>Where new alleles come from: mutation</h3>
<p>Inheritance shuffles existing alleles, but it cannot invent them. A mutation is a change in the base sequence of DNA, and it is the only source of new alleles. Mutations happen spontaneously when DNA is copied, and their rate rises with mutagens such as ultraviolet light, ionising radiation and some chemicals. A mutation in a body cell affects that individual only; a mutation in a gamete can be passed on, and that is the one that matters for evolution. Most mutations are neutral or harmful, because a random change to a working protein is unlikely to improve it, but a few are advantageous — and one is both, depending on how many copies you carry. Sickle-cell anaemia is caused by a mutation in the haemoglobin gene: two copies of the sickle allele produce distorted red cells that cannot carry oxygen well, while one copy produces a mild trait that also makes the person resistant to malaria. In a malarial region the heterozygote therefore has the advantage, which is why the allele stays common there.</p>

<h3>Command words in this topic</h3>
<table>
<tr><th>Command word</th><th>What earns the mark</th><th>A model sentence</th></tr>
<tr><td>State</td><td>The answer alone, no reasoning</td><td>The genotype of the affected child is bb.</td></tr>
<tr><td>Explain</td><td>The mechanism, cause to effect</td><td>Both parents are heterozygous, so each can pass the recessive allele without showing the condition.</td></tr>
<tr><td>Predict</td><td>The expected outcome and its probability</td><td>The chance of an affected child is 1 in 4, or 25 %.</td></tr>
<tr><td>Suggest</td><td>A reasoned use of the idea in a new case</td><td>A test cross with a white-flowered plant would show whether the purple parent is homozygous.</td></tr>
</table>

<h3>Mistakes that cost marks, corrected</h3>
<table>
<tr><th>What students write</th><th>Why it loses the mark</th><th>Write instead</th></tr>
<tr><td>"The parents are both affected."</td><td>In the common pedigree they are not — that is the whole clue.</td><td>Both unaffected parents are carriers of the recessive allele.</td></tr>
<tr><td>"Dominant alleles are more common."</td><td>Frequency and dominance are unrelated.</td><td>Dominance decides which allele is expressed in a heterozygote.</td></tr>
<tr><td>"A carrier has the disease mildly."</td><td>A carrier of a recessive condition has a normal phenotype.</td><td>A carrier is heterozygous, so the recessive allele is not expressed.</td></tr>
<tr><td>"Fathers pass colour blindness to sons."</td><td>A father gives his son Y, which carries no X-linked gene.</td><td>An affected son inherits the allele from his mother.</td></tr>
<tr><td>"The chance of two affected children is 1 in 4."</td><td>That is the chance for one child.</td><td>The chance for two is ¼ × ¼ = 1/16.</td></tr>
</table>

<h3>Stretch: four links the top band uses</h3>
<ul>
<li><strong>Why an affected daughter needs an affected father.</strong> She must inherit a recessive allele on both X chromosomes; one comes from her father, and he has only one X, so he must show the condition.</li>
<li><strong>Why the square cannot promise a family.</strong> It gives the probability for each child independently; a family of three can easily be the one-in-eight case.</li>
<li><strong>Why blood group is codominance, not blending.</strong> Both alleles are transcribed, so both antigens are present; nothing mixes into an intermediate.</li>
<li><strong>Why mutation matters more in gametes.</strong> Only a gamete's DNA reaches the next generation, so a body-cell mutation dies with the individual.</li>
</ul>

<h3>Exam-style questions with mark schemes</h3>
<p><strong>Q1.</strong> A purple-flowered plant is crossed with a white-flowered plant and 18 of 40 offspring are white. Deduce the genotype of the purple parent. (3 marks) <strong>Answer:</strong> white offspring must be homozygous recessive (1); the purple parent therefore passed a recessive allele (1); it is heterozygous (Bb), since a homozygous dominant would give no white offspring (1).</p>
<p><strong>Q2.</strong> A colour-blind man and a carrier woman have children. Give the expected phenotypes of their sons and daughters. (4 marks) <strong>Answer:</strong> his gametes Xᵇ and Y, hers Xᴮ and Xᵇ (1); daughters XᴮXᵇ (carrier) or XᵇXᵇ (affected) (1); sons XᴮY (normal) or XᵇY (affected) (1); so half of each sex are affected, and half the daughters are carriers (1).</p>
<p><strong>Q3.</strong> Explain why two unaffected parents can have a child with a recessive condition. (3 marks) <strong>Answer:</strong> each parent is heterozygous, carrying one recessive allele (1); the heterozygote shows the dominant phenotype (1); a child who inherits the recessive allele from both is homozygous and shows the condition (1).</p>
<p><strong>Q4.</strong> A woman with group A blood (Iᴬi) has a child with a man of group B blood (Iᴮi). Use a genetic diagram to show the possible blood groups of their children. (4 marks) <strong>Answer:</strong> gametes Iᴬ, i and Iᴮ, i (1); square giving IᴬIᴮ, Iᴬi, Iᴮi, ii (1); phenotypes AB, A, B, O (1); ratio 1:1:1:1, each 25 % (1).</p>
<p><strong>Q5.</strong> Explain how the sickle-cell allele can be both harmful and advantageous. (3 marks) <strong>Answer:</strong> two copies give distorted red cells and anaemia, so it is harmful (1); one copy gives resistance to malaria (1); in malarial regions heterozygotes survive better, so the allele remains common (1).</p>
<p><strong>Q6.</strong> In a pedigree, an affected boy has unaffected parents and no affected sisters. Suggest the most likely mode of inheritance and one reason for your answer. (2 marks) <strong>Answer:</strong> X-linked recessive (1); only males are affected and the parents are unaffected carriers (1).</p>`,
    },
  ],
};
