// IGCSE Biology depth pass, tranche 2 — drugs.
//
// The existing note lists drugs, classes and risks. This section explains the
// machine they act on: the synapse, receptor adaptation (tolerance and
// withdrawal), selective toxicity and the resistance treadmill, and why a drug
// trial's design earns the marks rather than its result.
//
//   node .freebuff/refine-note-sections.cjs .freebuff/content-bio-ol-deep-e.cjs
module.exports = {
  sections: [
    {
      id: "57208d40-830e-44f5-b36d-f58553997878",
      slug: "drugs",
      heading: "Drugs: the synapse, resistance and the trial",
      html: `<h2>Drugs: the synapse, resistance and the trial</h2>
<p>The drug questions in this paper are almost never "name the drug". They ask you to explain an effect, which means naming what the chemical does to a cell — and nearly every mood-altering drug does it at a synapse. This section supplies that mechanism, then turns to the two other places marks hide: why antibiotics stop working, and why a trial is designed the way it is.</p>

<h3>The synapse in five steps — the vocabulary every drug answer needs</h3>
<p>An impulse reaches the end of the presynaptic neurone; calcium ions enter, vesicles of neurotransmitter fuse with the membrane and release their contents into the synaptic cleft; the transmitter diffuses across and binds to receptors on the postsynaptic membrane, opening ion channels and starting a new impulse; then the transmitter is removed, either taken back into the presynaptic cell (reuptake) or broken down by an enzyme in the cleft. Each of those five steps is a place a drug can act, and the exam asks you to say which. A drug that <strong>mimics</strong> the transmitter and binds the receptor is an agonist; one that <strong>blocks</strong> the receptor is an antagonist; one that blocks reuptake or the breakdown enzyme leaves the transmitter in the cleft longer, prolonging the signal; one that blocks release silences the synapse. "It affects the brain" earns nothing; "it binds to receptors that normally respond to dopamine, so the postsynaptic cell fires more often" earns the mark.</p>

<figure>
<svg viewBox="0 0 560 320" role="img" aria-labelledby="synapse-title" preserveAspectRatio="xMidYMid meet">
<title id="synapse-title">A synapse with the four places a drug can act: transmitter release, receptor binding, reuptake and enzyme breakdown</title>
<path d="M40 40 L230 40 L230 108 L40 108 Z" fill="hsl(var(--gold) / 0.10)" stroke="hsl(var(--gold))" stroke-width="1.4"/>
<text x="135" y="30" font-size="12" fill="hsl(var(--muted-foreground))" text-anchor="middle">presynaptic neurone</text>
<circle cx="96" cy="76" r="13" fill="hsl(var(--gold) / 0.30)" stroke="hsl(var(--gold-deep))" stroke-width="1.2"/>
<circle cx="140" cy="76" r="13" fill="hsl(var(--gold) / 0.30)" stroke="hsl(var(--gold-deep))" stroke-width="1.2"/>
<circle cx="184" cy="76" r="13" fill="hsl(var(--gold) / 0.30)" stroke="hsl(var(--gold-deep))" stroke-width="1.2"/>
<circle cx="118" cy="104" r="5" fill="hsl(var(--gold-deep))"/>
<circle cx="154" cy="118" r="5" fill="hsl(var(--gold-deep))"/>
<circle cx="190" cy="106" r="5" fill="hsl(var(--gold-deep))"/>
<path d="M40 150 L230 150 L230 250 L40 250 Z" fill="hsl(var(--gold) / 0.05)" stroke="hsl(var(--border))" stroke-width="1.4"/>
<text x="135" y="270" font-size="12" fill="hsl(var(--muted-foreground))" text-anchor="middle">postsynaptic neurone</text>
<g fill="none" stroke="hsl(var(--gold-deep))" stroke-width="1.6">
<path d="M70 150 C 70 136, 82 136, 82 150"/>
<path d="M140 150 C 140 136, 152 136, 152 150"/>
<path d="M210 150 C 210 136, 222 136, 222 150"/>
</g>
<text x="255" y="70" font-size="12" fill="hsl(var(--foreground))">1. vesicles release transmitter</text>
<line x1="232" y1="76" x2="250" y2="66" stroke="hsl(var(--border))" stroke-width="1" stroke-dasharray="3 3"/>
<text x="255" y="126" font-size="12" fill="hsl(var(--foreground))">2. transmitter crosses the cleft</text>
<line x1="232" y1="120" x2="250" y2="122" stroke="hsl(var(--border))" stroke-width="1" stroke-dasharray="3 3"/>
<text x="255" y="152" font-size="12" fill="hsl(var(--foreground))">3. binds receptors (agonist / antagonist)</text>
<line x1="232" y1="146" x2="250" y2="148" stroke="hsl(var(--border))" stroke-width="1" stroke-dasharray="3 3"/>
<text x="255" y="194" font-size="12" fill="hsl(var(--foreground))">4. reuptake blocked, or</text>
<text x="255" y="212" font-size="12" fill="hsl(var(--foreground))">5. breakdown enzyme inhibited</text>
<path d="M196 122 C 214 132, 214 88, 198 92" fill="none" stroke="hsl(var(--gold-deep))" stroke-width="1.4" stroke-dasharray="4 3"/>
<polygon points="198,92 206,96 206,88" fill="hsl(var(--gold-deep))"/>
<rect x="255" y="232" width="270" height="62" rx="6" fill="hsl(var(--gold) / 0.06)" stroke="hsl(var(--border))" stroke-width="1"/>
<text x="266" y="252" font-size="11" fill="hsl(var(--muted-foreground))">Agonist mimics the transmitter; antagonist blocks it.</text>
<text x="266" y="269" font-size="11" fill="hsl(var(--muted-foreground))">Reuptake inhibitor prolongs the signal; blocker silences it.</text>
<text x="266" y="286" font-size="11" fill="hsl(var(--muted-foreground))">Name the step — that is the mark.</text>
</svg>
<figcaption><strong>Figure 1.</strong> One synapse, five drug targets. Every "explain how this drug works" answer is a sentence about which of these steps it changes, and in which direction.</figcaption>
</figure>

<h3>Tolerance, dependence and withdrawal</h3>
<p>Repeated exposure to a drug changes the synapse. If a receptor is over-stimulated, the cell reduces the number of receptors or becomes less responsive; if a transmitter is chronically blocked, it may add receptors instead. Either way the same dose produces a smaller effect — that is <strong>tolerance</strong>, and it is why a dependent user needs more of the drug to feel normal. <strong>Physical dependence</strong> exists when the body has adapted so far that removing the drug produces withdrawal symptoms, and those symptoms are usually the opposite of the drug's effect: a depressant produces anxiety, tremor and raised heart rate when stopped; a stimulant produces exhaustion and depression. <strong>Psychological dependence</strong> is the compulsion to take the drug for its effect, which can exist with little physical withdrawal. An exam answer that says "it is addictive because it is a drug" is a restatement; the marked answer names the adaptation and the withdrawal effect.</p>

<h3>Antibiotics work because bacteria are not us</h3>
<p>An antibiotic is only useful if it harms the bacterium and not the patient, and that selectivity comes from structures human cells do not have. Penicillin blocks the cross-linking of peptidoglycan, the polymer that gives a bacterial cell wall its strength, so the wall fails as the cell takes in water and the bacterium bursts; human cells have no cell wall, which is why the drug is safe to take. Other antibiotics bind the 70S bacterial ribosome and stop protein synthesis — human ribosomes are 80S and are not affected. This is why antibiotics are useless against viruses: a virus has no cell wall and no ribosome of its own, and it uses the host's machinery, which the drug cannot attack without harming the patient.</p>

<h3>The resistance treadmill</h3>
<p>Resistance is natural selection in a test tube. A random mutation may give one bacterium a protein that the antibiotic no longer binds, or an enzyme that destroys the drug. That cell survives the course, divides, and leaves descendants that inherit the advantage; in a patient, or in a hospital, the population becomes resistant. Bacteria also pass resistance genes sideways on plasmids, so a species that was never exposed can acquire the gene from one that was — which is how resistance spreads far faster than mutation alone would allow. MRSA is the flagship example: a strain of <em>Staphylococcus aureus</em> that acquired resistance to methicillin and then to most of the others. The response is stewardship: prescribe only when a bacterial infection is likely, use the narrowest effective drug, and finish the course so that the susceptible population is reduced before the resistant minority can grow. The "finish the course" advice has been revisited for some infections, so write the selection argument — a partial course leaves survivors and selects them — rather than a slogan.</p>

<h3>Why the design of a drug trial earns the marks</h3>
<p>A trial has to answer one question: is the improvement caused by the drug, or by something else? Three devices separate those. A <strong>control group</strong> receives a placebo or the existing best treatment, so the comparison is fair. <strong>Randomisation</strong> assigns patients to groups by chance, so the groups do not differ systematically in age, severity or lifestyle. <strong>Blinding</strong> hides who received what — a double-blind trial hides it from both patient and doctor — because expectation alone can change how a patient reports symptoms, and an unblinded doctor can unconsciously treat the two groups differently. The phases build on each other: phase 1 checks safety and dose in a small group, phase 2 looks for evidence of effect in patients, phase 3 compares on a large scale against the control. A trial also needs enough patients for the result not to be luck, and it must be stopped if harm appears — which is why ethics approval and informed consent are part of the design, not an afterthought.</p>

<h3>Worked example: reading a trial table</h3>
<p>A trial reports: 400 patients given the drug, 120 improved; 400 given a placebo, 80 improved. Step 1, the rates: drug 120 ÷ 400 = 0.30, so 30 %; placebo 80 ÷ 400 = 0.20, so 20 %. Step 2, the difference: 30 − 20 = 10 percentage points — that is the <strong>absolute</strong> benefit. Step 3, the relative comparison: 30 ÷ 20 = 1.5, so the drug is associated with a 50 % higher improvement rate than placebo — a large-sounding number produced by a 10-point difference. Step 4, judge the claim: the drug does appear to help, but only one in ten more patients improved, and the trial says nothing about side effects or how long the benefit lasts. Step 5, what would strengthen it: a larger sample, a longer follow-up, and a comparison with the existing treatment rather than only with placebo. That five-step structure is the whole skill; the arithmetic is trivial, the judgement is the mark.</p>

<h3>Worked example: absolute versus relative risk</h3>
<p>A leaflet says a drug "doubles the risk" of a side effect. If the side effect occurs in 2 of every 1,000 untreated people and 4 of every 1,000 treated people, the relative risk is 4 ÷ 2 = 2, and the absolute increase is 4 − 2 = 2 per 1,000 — 0.2 percentage points. Both statements are true, and only one tells a patient what will happen to them. In an answer, give both: "the risk doubles, from 2 in 1,000 to 4 in 1,000, an extra 2 cases per 1,000 patients." Data-response questions are marked on that distinction more often than on any definition.</p>

<h3>Command words in this topic</h3>
<table>
<tr><th>Command word</th><th>What earns the mark</th><th>A model sentence</th></tr>
<tr><td>Describe</td><td>The effect, without cause</td><td>Alcohol slows reaction time and impairs coordination and judgement.</td></tr>
<tr><td>Explain</td><td>The mechanism joining drug to effect</td><td>Nicotine binds receptors that normally respond to acetylcholine, so the postsynaptic cell fires more often.</td></tr>
<tr><td>Suggest</td><td>A reasoned application to a new case</td><td>Resistance spread because the survivors of the course were the cells with the mutation.</td></tr>
<tr><td>Evaluate</td><td>Both sides, with a judgement</td><td>The trial shows a benefit, but without a longer follow-up the size of the effect is uncertain.</td></tr>
</table>

<h3>Mistakes that cost marks, corrected</h3>
<table>
<tr><th>What students write</th><th>Why it loses the mark</th><th>Write instead</th></tr>
<tr><td>"Drugs damage the brain."</td><td>Names no mechanism.</td><td>The drug alters transmission at synapses by binding receptors or blocking reuptake.</td></tr>
<tr><td>"Antibiotics kill viruses too, if the dose is high."</td><td>Viruses have no cell wall or 70S ribosome to attack.</td><td>Antibiotics target bacterial structures, so they have no effect on viruses.</td></tr>
<tr><td>"Bacteria become resistant because they want to."</td><td>Resistance is a mutation, not a decision.</td><td>A random mutation gives some cells resistance, and those survive to reproduce.</td></tr>
<tr><td>"Withdrawal means the drug is out of the body."</td><td>Withdrawal is the adapted body correcting without the drug.</td><td>Withdrawal symptoms are the opposite of the drug's effect, as the adapted synapses readjust.</td></tr>
<tr><td>"A placebo is a sugar pill, so it does nothing."</td><td>The placebo effect changes reported symptoms.</td><td>The placebo controls for expectation, which is why the comparison is valid.</td></tr>
</table>

<h3>Stretch: four links the top band uses</h3>
<ul>
<li><strong>Why the same drug can calm and stimulate.</strong> Dose, receptor subtype and which brain region is affected decide the effect; a low dose of alcohol may feel relaxing while a high dose causes loss of consciousness.</li>
<li><strong>Why antibiotics are given for the full course.</strong> The aim is to remove the susceptible population before the resistant minority can grow — the same selection argument as in evolution.</li>
<li><strong>Why blinding is not politeness.</strong> Expectation and unconscious bias can produce a difference with no drug at all; blinding removes both.</li>
<li><strong>Why "doubles the risk" can mean almost nothing.</strong> Relative and absolute risk differ; a doubled risk of a rare event is still a rare event.</li>
</ul>

<h3>Exam-style questions with mark schemes</h3>
<p><strong>Q1.</strong> Explain how a drug can prolong a nerve signal without binding to the receptor. (3 marks) <strong>Answer:</strong> it blocks reuptake of the transmitter into the presynaptic cell (1); or inhibits the enzyme that breaks the transmitter down (1); so the transmitter stays in the cleft longer and the postsynaptic cell fires more often (1).</p>
<p><strong>Q2.</strong> Explain why penicillin does not harm human cells. (2 marks) <strong>Answer:</strong> penicillin prevents cross-linking of peptidoglycan in the bacterial cell wall (1); human cells have no cell wall, so the target is absent (1).</p>
<p><strong>Q3.</strong> Describe how a population of bacteria becomes resistant to an antibiotic. (4 marks) <strong>Answer:</strong> a random mutation gives some cells resistance (1); the antibiotic kills the susceptible cells (1); resistant cells survive and reproduce (1); resistance genes can also be transferred between bacteria on plasmids (1).</p>
<p><strong>Q4.</strong> Explain why a double-blind placebo-controlled trial is the best design for testing a new drug. (4 marks) <strong>Answer:</strong> the placebo controls for expectation (1); randomisation makes the groups comparable (1); blinding prevents doctors and patients influencing the result (1); a large sample and comparison with existing treatment make the result reliable (1).</p>
<p><strong>Q5.</strong> Using the worked example, calculate the absolute and relative benefit of the drug. (2 marks) <strong>Answer:</strong> 30 % versus 20 %, so 10 percentage points absolute (1); 30 ÷ 20 = 1.5, a 50 % higher rate relative to placebo (1).</p>
<p><strong>Q6.</strong> A patient stops a course of antibiotics after three days because they feel better. Suggest why this can make the infection harder to treat later. (2 marks) <strong>Answer:</strong> some bacteria, including resistant mutants, survive the shortened course (1); they reproduce and the infection returns with a larger resistant population (1).</p>`,
    },
  ],
};
