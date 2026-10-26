// IGCSE Biology depth pass, tranche 2 — characteristics and classification.
//
// The existing note states the seven processes, the hierarchy and the kingdoms.
// This section examines the ideas underneath: what "species" can and cannot
// mean, why a hierarchy is a set of nested sets, how to turn a table of DNA
// differences into a tree, and how to write a key that the mark scheme credits.
//
//   node .freebuff/refine-note-sections.cjs .freebuff/content-bio-ol-deep-g.cjs
module.exports = {
  sections: [
    {
      id: "6456582a-93fe-468d-9dc6-f8fd418d9e91",
      slug: "characteristics-and-classification-of-living-organisms",
      heading: "Classification: species, evidence and keys",
      html: `<h2>Classification: species, evidence and keys</h2>
<p>Classification looks like a list to memorise, and then a question asks why a mule is not a species, or which two organisms in a table are most closely related, and the list stops helping. This section supplies the reasoning: what the species definition is trying to capture, why the hierarchy is built from shared features, how molecular data is read, and what separates a key that scores from one that merely looks like a key.</p>

<h3>What "species" is trying to capture — and where it breaks</h3>
<p>The working definition is a group of organisms with similar features that can interbreed to produce <strong>fertile</strong> offspring. Each word is load-bearing. "Similar features" is how you recognise a species in the field; "interbreed" is the biological test; "fertile offspring" is what separates a species boundary from a family resemblance. A horse and a donkey interbreed, so they are close, but the mule they produce is sterile — the genes cannot be reshuffled into working gametes — so the two remain separate species. The definition has known limits, and a strong answer can say so: many plants form fertile hybrids and blur the line; organisms that reproduce asexually (bacteria, many protoctists) never interbreed at all, so the test cannot be applied and biologists group them by genetic similarity instead. What the definition is really capturing is <strong>gene flow</strong> — populations that exchange genes freely belong to one species, and populations that do not are on separate evolutionary paths.</p>

<h3>The hierarchy is nested sets, not a ladder</h3>
<p>Each level of the hierarchy contains the level below it, so the groups are sets inside sets rather than ranks in an army. Humans sit in Animalia (multicellular, no cell wall, ingestive nutrition), Chordata (a supporting rod at some stage, dorsal nerve cord), Mammalia (hair, mammary glands, four-chambered heart), Primates (forward-facing eyes, grasping hands), Hominidae (the great apes), <em>Homo</em>, and <em>sapiens</em>. Every feature that puts us in a group is inherited from the ancestor that group is defined by, which is why the hierarchy can be read as a family tree: the deeper the level you share with another organism, the more recent the common ancestor — and therefore the more closely related you are. A cat shares Mammalia with us but not Primates, so it is a closer relative than a lizard, which shares only Chordata.</p>

<figure>
<svg viewBox="0 0 560 260" role="img" aria-labelledby="hierarchy-title" preserveAspectRatio="xMidYMid meet">
<title id="hierarchy-title">The taxonomic hierarchy as nested groups, from kingdom down to species, with humans as the example</title>
<rect x="30" y="26" width="500" height="34" rx="5" fill="hsl(var(--gold) / 0.06)" stroke="hsl(var(--border))" stroke-width="1.2"/>
<text x="44" y="48" font-size="13" fill="hsl(var(--muted-foreground))">Kingdom</text>
<text x="500" y="48" font-size="13" fill="hsl(var(--foreground))" text-anchor="end">Animalia</text>
<rect x="70" y="66" width="460" height="34" rx="5" fill="hsl(var(--gold) / 0.08)" stroke="hsl(var(--border))" stroke-width="1.2"/>
<text x="84" y="88" font-size="13" fill="hsl(var(--muted-foreground))">Phylum</text>
<text x="500" y="88" font-size="13" fill="hsl(var(--foreground))" text-anchor="end">Chordata</text>
<rect x="110" y="106" width="420" height="34" rx="5" fill="hsl(var(--gold) / 0.10)" stroke="hsl(var(--border))" stroke-width="1.2"/>
<text x="124" y="128" font-size="13" fill="hsl(var(--muted-foreground))">Class</text>
<text x="500" y="128" font-size="13" fill="hsl(var(--foreground))" text-anchor="end">Mammalia</text>
<rect x="150" y="146" width="380" height="34" rx="5" fill="hsl(var(--gold) / 0.12)" stroke="hsl(var(--border))" stroke-width="1.2"/>
<text x="164" y="168" font-size="13" fill="hsl(var(--muted-foreground))">Order</text>
<text x="500" y="168" font-size="13" fill="hsl(var(--foreground))" text-anchor="end">Primates</text>
<rect x="190" y="186" width="340" height="34" rx="5" fill="hsl(var(--gold) / 0.14)" stroke="hsl(var(--border))" stroke-width="1.2"/>
<text x="204" y="208" font-size="13" fill="hsl(var(--muted-foreground))">Family</text>
<text x="500" y="208" font-size="13" fill="hsl(var(--foreground))" text-anchor="end">Hominidae</text>
<rect x="230" y="226" width="130" height="0" fill="none"/>
<text x="230" y="240" font-size="13" fill="hsl(var(--gold-deep))">Genus Homo · species sapiens</text>
</svg>
<figcaption><strong>Figure 1.</strong> Each box sits inside the one above it. Sharing a deeper box means sharing a more recent ancestor, which is why the hierarchy works as a family tree.</figcaption>
</figure>

<h3>Reading molecular evidence</h3>
<p>Modern classification compares molecules rather than only bodies. The logic is simple: DNA accumulates changes at a roughly steady rate, so two species that separated recently have had less time to differ than two that separated long ago. A table of percentage differences is therefore a table of relatedness in disguise, and the task is to convert it into a tree. Compare A with B, C and D; the pair with the smallest difference is the closest pair and joins first; then join the next closest to that pair, and so on. The tree you draw is a hypothesis about common ancestors, and the numbers are the evidence — never the reverse. This is why a molecular tree can contradict a tree built from appearance: two species can look alike because they live alike (convergent evolution) while their DNA shows they are not close relatives.</p>

<h3>Writing a key the mark scheme credits</h3>
<p>A dichotomous key is a series of choices, each of which divides the remaining organisms into exactly two groups. Four rules separate a good key from a plausible one. Each pair of statements must be a genuine contrast — "has wings" against "has no wings", not "has wings" against "is large". The feature must be observable and unambiguous, so "has six legs" works and "looks like a beetle" does not. Every organism must appear exactly once as an outcome, and every branch must lead somewhere. And the pairs must be numbered so a reader can follow them (1a, 1b, 2a, 2b). The commonest lost mark is a first split on a feature that only separates one organism, leaving a long untidy branch — split on the feature that divides the group most evenly.</p>

<h3>The features that actually separate the vertebrate classes</h3>
<table>
<tr><th>Class</th><th>Skin and covering</th><th>Gas exchange</th><th>Reproduction</th><th>Heart</th></tr>
<tr><td>Fish</td><td>Wet scales</td><td>Gills</td><td>Eggs laid in water</td><td>Two chambers</td></tr>
<tr><td>Amphibians</td><td>Moist, permeable skin</td><td>Lungs and skin; gills as larvae</td><td>Shell-less eggs in water</td><td>Three chambers</td></tr>
<tr><td>Reptiles</td><td>Dry, scaly</td><td>Lungs</td><td>Leathery eggs on land</td><td>Three chambers, partly divided</td></tr>
<tr><td>Birds</td><td>Feathers</td><td>Lungs with air sacs</td><td>Hard-shelled eggs</td><td>Four chambers</td></tr>
<tr><td>Mammals</td><td>Hair or fur</td><td>Lungs with diaphragm</td><td>Mostly live young, milk</td><td>Four chambers</td></tr>
</table>
<p>The four-chambered heart is worth understanding rather than memorising: it keeps oxygenated and deoxygenated blood completely separate, so the blood leaving for the body is fully oxygenated. That supports the high metabolic rate endotherms need to hold a constant body temperature — which is why birds and mammals, the two endothermic classes, are the two with four chambers.</p>

<h3>Viruses: outside the five kingdoms, and outside life</h3>
<p>A virus is a nucleic acid (DNA or RNA) inside a protein coat, with no cytoplasm, no ribosomes and no metabolism of its own. It cannot respire, grow or reproduce by itself; it reproduces only by inserting its genetic material into a host cell and making that cell build more viruses. Because it performs none of the seven processes on its own, it is not classified into any of the five kingdoms, and many biologists do not call it alive at all. This is not a technicality for exams: it is why antibiotics do not work on viral infections, and why "is a virus living?" is a question that expects you to apply the seven characteristics rather than recite a definition.</p>

<figure>
<svg viewBox="0 0 560 250" role="img" aria-labelledby="tree-title" preserveAspectRatio="xMidYMid meet">
<title id="tree-title">A simple phylogenetic tree drawn from DNA differences, with the closest pair joining first</title>
<line x1="60" y1="60" x2="60" y2="200" stroke="hsl(var(--border))" stroke-width="1.4"/>
<line x1="60" y1="80" x2="150" y2="80" stroke="hsl(var(--muted-foreground))" stroke-width="1.4"/>
<line x1="60" y1="180" x2="150" y2="180" stroke="hsl(var(--muted-foreground))" stroke-width="1.4"/>
<line x1="150" y1="80" x2="150" y2="180" stroke="hsl(var(--muted-foreground))" stroke-width="1.4"/>
<line x1="150" y1="110" x2="250" y2="110" stroke="hsl(var(--muted-foreground))" stroke-width="1.4"/>
<line x1="150" y1="150" x2="250" y2="150" stroke="hsl(var(--muted-foreground))" stroke-width="1.4"/>
<line x1="250" y1="110" x2="250" y2="150" stroke="hsl(var(--muted-foreground))" stroke-width="1.4"/>
<line x1="250" y1="110" x2="340" y2="110" stroke="hsl(var(--gold-deep))" stroke-width="1.8"/>
<line x1="250" y1="150" x2="340" y2="150" stroke="hsl(var(--gold-deep))" stroke-width="1.8"/>
<circle cx="340" cy="110" r="4" fill="hsl(var(--gold-deep))"/>
<circle cx="340" cy="150" r="4" fill="hsl(var(--gold-deep))"/>
<text x="352" y="114" font-size="13" fill="hsl(var(--foreground))">A and B: 2 differences</text>
<text x="352" y="154" font-size="13" fill="hsl(var(--foreground))">C and D: 6 differences</text>
<text x="150" y="215" font-size="11" fill="hsl(var(--muted-foreground))">A and B join first — the smallest number is the closest pair</text>
<text x="150" y="232" font-size="11" fill="hsl(var(--muted-foreground))">A and C: 11 differences, so their split is deeper in the tree</text>
</svg>
<figcaption><strong>Figure 2.</strong> Differences are read before the tree is drawn: the smallest number joins first, and the depth of each split is set by how long the lineages have been apart.</figcaption>
</figure>

<h3>Command words in this topic</h3>
<table>
<tr><th>Command word</th><th>What earns the mark</th><th>A model sentence</th></tr>
<tr><td>State</td><td>The name or feature, no reasoning</td><td>The genus is <em>Panthera</em>.</td></tr>
<tr><td>Describe</td><td>The feature, precisely</td><td>Fungi have cell walls made of chitin and no chloroplasts.</td></tr>
<tr><td>Explain</td><td>The reason the grouping holds</td><td>They are placed in the same class because they share a four-chambered heart and hair.</td></tr>
<tr><td>Suggest</td><td>A reasoned application to new data</td><td>A and B are most closely related because their DNA differs least.</td></tr>
</table>

<h3>Mistakes that cost marks, corrected</h3>
<table>
<tr><th>What students write</th><th>Why it loses the mark</th><th>Write instead</th></tr>
<tr><td>"A species is a group that looks the same."</td><td>Appearance is not the biological test.</td><td>A species is a group that can interbreed to produce fertile offspring.</td></tr>
<tr><td>"The mule is a species."</td><td>It is sterile, so the line ends with it.</td><td>The mule is a hybrid and cannot produce fertile offspring.</td></tr>
<tr><td>"Fungi are plants without chlorophyll."</td><td>Chitin walls and saprotrophic nutrition are the real differences.</td><td>Fungi have chitin cell walls and feed by extracellular digestion.</td></tr>
<tr><td>"A virus is a tiny bacterium."</td><td>It has no cells, no ribosomes and no metabolism.</td><td>A virus is nucleic acid in a protein coat and reproduces only inside a host cell.</td></tr>
<tr><td>"The key says 1a legs, 1b no legs."</td><td>Both branches must still lead to outcomes.</td><td>Each pair divides the remaining organisms and every branch names one.</td></tr>
</table>

<h3>Stretch: four links the top band uses</h3>
<ul>
<li><strong>Why the hierarchy is evidence, not bookkeeping.</strong> Each shared group marks a shared ancestor, so a classification is a hypothesis about evolution that DNA can confirm or overturn.</li>
<li><strong>Why convergence fools appearance.</strong> Dolphins and fish share a streamlined shape because both live in water, not because they are close relatives; molecules settle the question.</li>
<li><strong>Why endothermy needs four chambers.</strong> Separate circulations deliver fully oxygenated blood, which supports the high metabolic rate that generates body heat.</li>
<li><strong>Why a virus is not in a kingdom.</strong> Classification groups organisms by shared features and ancestry; a virus has no metabolism of its own, so it is not an organism in that sense.</li>
</ul>

<h3>Exam-style questions with mark schemes</h3>
<p><strong>Q1.</strong> Explain why a horse and a donkey are classified as different species even though they can interbreed. (2 marks) <strong>Answer:</strong> their offspring, the mule, is sterile (1); fertile offspring are required by the species definition, so gene flow cannot continue (1).</p>
<p><strong>Q2.</strong> A table shows DNA differences: A–B 2 %, A–C 11 %, B–C 12 %, C–D 6 %. State which two organisms are most closely related and explain your answer. (2 marks) <strong>Answer:</strong> A and B (1); they have the smallest difference in base sequence, so their lineages separated most recently (1).</p>
<p><strong>Q3.</strong> Describe two features that place a whale in Mammalia rather than with fish. (2 marks) <strong>Answer:</strong> it has hair and mammary glands (1); it is endothermic with a four-chambered heart and lungs, not gills (1).</p>
<p><strong>Q4.</strong> Explain why a dichotomous key must use observable features. (2 marks) <strong>Answer:</strong> the user has only the specimen in front of them (1); a feature that cannot be seen cannot be used to decide the branch (1).</p>
<p><strong>Q5.</strong> Explain why viruses are not placed in any of the five kingdoms. (3 marks) <strong>Answer:</strong> they have no cellular structure, no cytoplasm or ribosomes (1); they carry out none of the seven life processes independently (1); they reproduce only using a host cell's machinery (1).</p>
<p><strong>Q6.</strong> The scientific name of the domestic dog is <em>Canis familiaris</em>. State one rule of binomial nomenclature shown by this name. (1 mark) <strong>Answer:</strong> the genus is capitalised and the species is lower case (both italicised or underlined).</p>`,
    },
  ],
};
