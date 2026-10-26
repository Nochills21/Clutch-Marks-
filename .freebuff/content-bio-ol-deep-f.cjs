// IGCSE Biology depth pass, tranche 2 — human influences on ecosystems.
//
// The existing note gives each impact as a chain. This section explains why the
// chains behave the way they do: what a keystone species does to a web, what
// "biodiversity" is counting at each level, why nitrate moves through soil and
// water so easily, and why a climate feedback can be self-reinforcing. The
// figures carry the cascade and the mechanism the prose would otherwise list.
//
//   node .freebuff/refine-note-sections.cjs .freebuff/content-bio-ol-deep-f.cjs
module.exports = {
  sections: [
    {
      id: "ef15d699-c8bb-47b4-aa60-e9d0fb29d8f2",
      slug: "human-influences-on-ecosystems",
      heading: "Human Influences: cascades, biodiversity and feedback",
      html: `<h2>Human Influences: cascades, biodiversity and feedback</h2>
<p>The damage humans do is rarely one effect on one species. Remove a predator and the herbivores it controlled multiply; add a nutrient and the whole chain of light, oxygen and decomposition shifts; warm the sea and it holds less dissolved gas. This section explains those knock-on effects, defines what "biodiversity" is actually counting, and shows how to read the data questions that carry the marks.</p>

<h3>Why losing one species can cost a dozen</h3>
<p>In a food web, species are not interchangeable. A <strong>keystone species</strong> is one whose effect on the community is far larger than its abundance suggests, because the rest of the web is built around what it eats. The classic case is the sea otter on the Pacific coast: otters eat sea urchins, urchins graze kelp, and kelp forests shelter fish and absorb carbon. Where otters were hunted out, urchin numbers exploded, the kelp was grazed to bare rock and the fish that depended on it disappeared — a <strong>trophic cascade</strong>, one removal travelling down three levels. Protecting the otter restored the kelp without anyone planting a single frond. That is why conservation often targets predators and large herbivores rather than the species that look most endangered: protecting the top of the web protects the structure under it.</p>

<figure>
<svg viewBox="0 0 560 300" role="img" aria-labelledby="cascade-title" preserveAspectRatio="xMidYMid meet">
<title id="cascade-title">A trophic cascade: sea otters control urchins which graze kelp, so removing otters collapses the kelp forest</title>
<text x="30" y="30" font-size="12" fill="hsl(var(--muted-foreground))">WITH OTTERS</text>
<rect x="30" y="42" width="150" height="44" rx="6" fill="hsl(var(--gold) / 0.12)" stroke="hsl(var(--gold))" stroke-width="1.3"/>
<text x="105" y="69" font-size="13" fill="hsl(var(--foreground))" text-anchor="middle">otters (predator)</text>
<line x1="105" y1="86" x2="105" y2="112" stroke="hsl(var(--muted-foreground))" stroke-width="1.4"/>
<polygon points="105,112 101,104 109,104" fill="hsl(var(--muted-foreground))"/>
<rect x="30" y="112" width="150" height="44" rx="6" fill="hsl(var(--gold) / 0.08)" stroke="hsl(var(--border))" stroke-width="1.3"/>
<text x="105" y="139" font-size="13" fill="hsl(var(--foreground))" text-anchor="middle">few urchins</text>
<line x1="105" y1="156" x2="105" y2="182" stroke="hsl(var(--muted-foreground))" stroke-width="1.4"/>
<polygon points="105,182 101,174 109,174" fill="hsl(var(--muted-foreground))"/>
<rect x="30" y="182" width="150" height="44" rx="6" fill="hsl(var(--gold) / 0.16)" stroke="hsl(var(--gold-deep))" stroke-width="1.3"/>
<text x="105" y="209" font-size="13" fill="hsl(var(--foreground))" text-anchor="middle">dense kelp forest</text>
<text x="30" y="252" font-size="11" fill="hsl(var(--muted-foreground))">fish, invertebrates and carbon storage survive</text>
<text x="300" y="30" font-size="12" fill="hsl(var(--muted-foreground))">WITHOUT OTTERS</text>
<rect x="300" y="42" width="150" height="44" rx="6" fill="hsl(var(--gold) / 0.04)" stroke="hsl(var(--border))" stroke-width="1.3" stroke-dasharray="4 3"/>
<text x="375" y="69" font-size="13" fill="hsl(var(--muted-foreground))" text-anchor="middle">otters removed</text>
<line x1="375" y1="86" x2="375" y2="112" stroke="hsl(var(--muted-foreground))" stroke-width="1.4"/>
<polygon points="375,112 371,104 379,104" fill="hsl(var(--muted-foreground))"/>
<rect x="300" y="112" width="150" height="44" rx="6" fill="hsl(var(--gold) / 0.20)" stroke="hsl(var(--gold-deep))" stroke-width="1.3"/>
<text x="375" y="139" font-size="13" fill="hsl(var(--foreground))" text-anchor="middle">urchins explode</text>
<line x1="375" y1="156" x2="375" y2="182" stroke="hsl(var(--muted-foreground))" stroke-width="1.4"/>
<polygon points="375,182 371,174 379,174" fill="hsl(var(--muted-foreground))"/>
<rect x="300" y="182" width="150" height="44" rx="6" fill="hsl(var(--gold) / 0.05)" stroke="hsl(var(--border))" stroke-width="1.3"/>
<text x="375" y="209" font-size="13" fill="hsl(var(--muted-foreground))" text-anchor="middle">kelp grazed to rock</text>
<text x="300" y="252" font-size="11" fill="hsl(var(--muted-foreground))">the fish that used the kelp are lost with it</text>
</svg>
<figcaption><strong>Figure 1.</strong> The cascade runs in both directions: removing the predator lets the herbivore strip the habitat, and restoring the predator rebuilds it. The otter is a keystone species because the web depends on what it eats, not on how many there are.</figcaption>
</figure>

<h3>Biodiversity is three counts, not one</h3>
<p>Biodiversity is the variety of living things, and the exam expects you to separate three levels. <strong>Species diversity</strong> is the number of species in a habitat plus how evenly the individuals are spread between them — a field with 20 species represented by one individual each is richer than a field with 20 species where one dominates. <strong>Genetic diversity</strong> is the variation of alleles within a species, and it is the level that decides whether a population can adapt: a cheetah population that passed through a bottleneck has little variation, so a new disease can sweep through it. <strong>Ecosystem diversity</strong> is the range of habitats — a country with forests, wetlands and reefs is more diverse than one with a single crop over the same area. When a question says "biodiversity", check which level the data supports: a species count answers the first, not the third.</p>

<h3>Why nitrate travels: the fertiliser problem in one paragraph</h3>
<p>Plants need nitrogen for proteins and DNA, but they cannot use the nitrogen gas that makes up most of the atmosphere. The Haber–Bosch process fixes it industrially into ammonia, which becomes the nitrate in fertiliser — this is what fed the population growth of the twentieth century, and it is also why rivers suffer. Nitrate is negatively charged and does not bind to soil particles, which are also negatively charged, so it stays dissolved and moves with rainwater. Anything the crop does not take up in that season leaches into groundwater or runs off the surface, carrying the nutrients into streams. That mobility is the mechanism behind eutrophication, and it explains why the fix is about timing and buffering — applying the right amount at the right moment, and trapping run-off in vegetation strips — rather than banning fertiliser, which would cut food production.</p>

<h3>Climate: warming is a trend, weather is a day</h3>
<p>"It was cold this morning" is not evidence about climate, because climate is the average over decades while weather is what happens this week. The greenhouse effect itself is natural and necessary: gases absorb outgoing infrared radiation and return part of it to the surface, keeping the planet about 33 °C warmer than it would otherwise be. What humans have changed is the concentration of those gases, so more heat is trapped and the average rises. Two feedbacks make the change hard to reverse. Melting ice exposes darker ocean, which absorbs more sunlight, which melts more ice — a <strong>positive feedback</strong> that accelerates warming. And warmer water holds less dissolved carbon dioxide, so the ocean, which has absorbed a large share of our emissions, takes up less as it warms — another positive feedback. A negative feedback would damp the change (more plant growth absorbing carbon dioxide), which is why the net effect is a question of measurement rather than of principle.</p>

<h3>Conservation that survives contact with evidence</h3>
<p>Protected areas work when they are large, well managed and connected; a reserve drawn on a map but never patrolled — a "paper park" — protects nothing. Small reserves suffer <strong>edge effects</strong>: the windier, drier, brighter conditions at the boundary change the habitat for a distance inside it, so a small fragment is mostly edge. Corridors between fragments let individuals move, which restores gene flow and allows populations to recolonise after a local loss. Captive breeding can rescue a species from the last few individuals, but the population that comes out has passed through a genetic bottleneck, so the programme has to manage relatedness as carefully as it manages feed. Seed banks store genetic diversity cheaply and for decades, but they preserve genes, not the habitat the species needs when it is planted back into a landscape that has changed. No single method wins; an evaluation answer should say which method suits which problem.</p>

<h3>Worked example: reading a biodiversity data table</h3>
<p>Two fields are surveyed. Field A: 5 species, counts 40, 38, 36, 35, 34. Field B: 5 species, counts 170, 8, 3, 1, 1. Step 1, species richness: both have 5, so richness alone cannot separate them. Step 2, evenness: A's individuals are spread almost evenly, B's are dominated by one species. Step 3, conclusion: A has the higher species diversity, because diversity includes how evenly the individuals are distributed, not just how many species are present. Step 4, relate it to management: B's pattern is what a disturbed or polluted habitat looks like — one tolerant species swamping the rest — so a management answer should address the cause of the dominance, not just count species. Percentage change is the other calculation: if a count falls from 250 to 160, the change is (160 − 250) ÷ 250 × 100 = −36 %.</p>

<h3>Worked example: what one change does to the rest of the chain</h3>
<p>A lake is stocked with a predatory fish to improve angling. Predict the effects, with reasoning. Step 1, direct effect: the predator eats small fish and invertebrates, so their numbers fall. Step 2, indirect effect: fewer small fish means less grazing on zooplankton, so zooplankton numbers rise. Step 3, next link: more zooplankton graze more algae, so the water clears — the opposite of what a nutrient input does. Step 4, the caveat: if the predator also eats the juveniles of a species people value, the stocking has two effects in opposite directions, and which dominates depends on numbers. The structure of the answer is a chain in which each link names the mechanism (eaten, starved, outcompeted), which is exactly what the mark scheme credits.</p>

<h3>Command words in this topic</h3>
<table>
<tr><th>Command word</th><th>What earns the mark</th><th>A model sentence</th></tr>
<tr><td>Describe</td><td>The sequence, in order</td><td>Nutrients enter the river, algae bloom, light is blocked, decomposers deplete oxygen and fish die.</td></tr>
<tr><td>Explain</td><td>The cause of each step</td><td>The algae block light, so submerged plants cannot photosynthesise and die.</td></tr>
<tr><td>Suggest</td><td>A reasoned measure for a new case</td><td>A vegetated buffer strip would intercept run-off before it reaches the stream.</td></tr>
<tr><td>Evaluate</td><td>Both sides, then a judgement</td><td>Pesticides raise yield but remove non-target insects, so integrated pest management is the better balance.</td></tr>
</table>

<h3>Mistakes that cost marks, corrected</h3>
<table>
<tr><th>What students write</th><th>Why it loses the mark</th><th>Write instead</th></tr>
<tr><td>"Biodiversity is the number of species."</td><td>That is species richness only.</td><td>Biodiversity includes species richness and evenness, genetic variation and the range of habitats.</td></tr>
<tr><td>"The greenhouse effect is pollution."</td><td>The effect is natural; the enhancement is human.</td><td>Human emissions have strengthened the natural greenhouse effect, raising the average temperature.</td></tr>
<tr><td>"Fish die because the algae use the oxygen."</td><td>Algae release oxygen by day; the decomposers remove it.</td><td>Decomposer bacteria breaking down the dead algae use up the dissolved oxygen.</td></tr>
<tr><td>"Conservation means not touching nature."</td><td>Reserves, corridors and breeding need active management.</td><td>Conservation is active management of habitats and populations to maintain biodiversity.</td></tr>
<tr><td>"The sea is getting warmer, so it absorbs more carbon dioxide."</td><td>Warmer water holds less dissolved gas.</td><td>Warmer water absorbs less carbon dioxide, so more remains in the atmosphere.</td></tr>
</table>

<h3>Stretch: four links the top band uses</h3>
<ul>
<li><strong>Why a predator is worth protecting.</strong> A keystone predator sets the abundance of everything below it, so protecting it protects the structure of the web, not just one species.</li>
<li><strong>Why a bottleneck is permanent.</strong> The alleles lost when a population crashes do not come back by breeding; genetic diversity has to be managed for decades afterwards.</li>
<li><strong>Why the fix is often local.</strong> Nitrate moves with water, so a buffer strip at the field edge can protect a stream that a national policy cannot reach in time.</li>
<li><strong>Why feedbacks make forecasts uncertain.</strong> Positive feedbacks amplify a change, so the difference between 1.5 °C and 2 °C is not linear — which is why the data questions ask for trends rather than single values.</li>
</ul>

<h3>Exam-style questions with mark schemes</h3>
<p><strong>Q1.</strong> Explain how removing a keystone predator can reduce biodiversity. (3 marks) <strong>Answer:</strong> the predator controls the numbers of a herbivore (1); without it the herbivore population grows and over-grazes a habitat-forming species (1); the species that depended on that habitat lose food and shelter (1).</p>
<p><strong>Q2.</strong> Two habitats both contain six species. Explain why one may still have higher biodiversity. (2 marks) <strong>Answer:</strong> diversity includes evenness as well as richness (1); the habitat where individuals are spread evenly among species is more diverse (1).</p>
<p><strong>Q3.</strong> Explain why nitrate from fertiliser reaches rivers more easily than phosphate from the same field. (2 marks) <strong>Answer:</strong> nitrate is soluble and negatively charged, so it is not held by the negatively charged soil particles (1); phosphate binds to soil particles, so it moves mainly with eroded soil (1).</p>
<p><strong>Q4.</strong> Explain how melting sea ice can accelerate further warming. (3 marks) <strong>Answer:</strong> ice reflects sunlight, while the darker ocean absorbs more (1); as ice melts, more energy is absorbed and the surface warms (1); the warmer water holds less carbon dioxide and melts more ice, so the effect reinforces itself (1).</p>
<p><strong>Q5.</strong> Suggest why a small nature reserve may protect fewer species than a large one of the same total area. (3 marks) <strong>Answer:</strong> edge effects change conditions further into a small reserve (1); small populations are more likely to die out by chance (1); a large reserve has more habitat types and less isolation (1).</p>
<p><strong>Q6.</strong> A bird count falls from 250 to 160 over ten years. Calculate the percentage change and suggest one reason for it. (3 marks) <strong>Answer:</strong> change = (160 − 250) ÷ 250 × 100 = −36 % (2); a named cause such as habitat loss, pesticide use or climate-driven change in food supply (1).</p>`,
    },
  ],
};
