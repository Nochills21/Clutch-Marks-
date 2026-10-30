// OxfordAQA International GCSE Biology 9201 — topic 3.3 Ecology.
// Statements covered: 3.3.1 Energy transferred in ecosystems, 3.3.2 Adaptations,
// interdependence and competition, 3.3.3 Decay and the carbon cycle, 3.3.4
// Humans and their effects on the environment.
//
// The topic is quantitative in a way students do not expect: efficiency of
// energy transfer and population estimates from quadrats are both marked
// calculations, so both are worked in full rather than described.
module.exports = {
  topicSlug: "ecology",
  title: "IGCSE Biology (OxfordAQA): Ecology",
  html: `<h2>Ecology</h2>
<p>An ecosystem is a community of organisms interacting with each other and with their physical surroundings, and almost every question about one is a question about energy or about a limit. Energy enters as sunlight, is captured by producers, and loses most of itself at every step up a food chain; organisms compete for the rest, and their adaptations decide who wins. This topic also contains two calculations that are easy marks if you keep the units straight — the efficiency of energy transfer and a population estimate from quadrats — and one cycle, carbon, that links every living thing to the atmosphere. The last subsection turns the same ideas on us: what happens to an ecosystem when a forest is cleared or a river is polluted.</p>

<h3>1. Feeding relationships</h3>
<p>Photosynthetic organisms are <strong>producers</strong>: they capture light energy and store it in glucose, which becomes the starting point of every food chain. Organisms that eat others are <strong>consumers</strong>, and decomposers break down dead material and return nutrients to the soil.</p>
<ul>
  <li><strong>Primary consumer</strong> — eats a producer (a herbivore).</li>
  <li><strong>Secondary consumer</strong> — eats a primary consumer (a carnivore).</li>
  <li><strong>Tertiary consumer</strong> — eats a secondary consumer.</li>
  <li><strong>Decomposer</strong> — bacteria and fungi that break down dead organisms and waste, releasing minerals such as nitrates and carbon dioxide.</li>
</ul>
<p>Each step is a <strong>trophic level</strong>. A food chain shows one route; a food web shows all of them, which is why removing one species from a web affects many others — that is <strong>interdependence</strong>. A pyramid of biomass shows the mass of living material at each level and is almost always widest at the bottom.</p>

<h3>2. Energy transfer and efficiency</h3>
<p>Only about 10 % of the energy at one trophic level is passed to the next. The rest is lost as heat from respiration, used in movement, lost in waste materials, or left in parts that are not eaten. This is why food chains rarely have more than four or five levels: there is simply not enough energy left.</p>
<p>efficiency = (energy transferred to the next level ÷ energy available at the previous level) × 100</p>
<p><em>Key:</em> efficiency = the percentage of energy passed on (%); energy transferred = the energy in the organisms at the next trophic level (kJ); energy available = the energy in the organisms being eaten (kJ).</p>
<p>A pyramid of biomass is not the same as a pyramid of energy. Biomass is a snapshot of mass at one moment; energy flow is measured over time. A pyramid of biomass can occasionally be inverted — for example where the producers are tiny phytoplankton that reproduce very fast — while a pyramid of energy never is.</p>

<h3>3. Adaptations, competition and interdependence</h3>
<p>An adaptation is a feature that helps an organism survive in its habitat. Examiners want three words: the feature, the advantage, and the reason it matters.</p>
<ul>
  <li><strong>Structural</strong> — a physical feature. A polar bear's thick fur and fat layer reduce heat loss; a cactus has spines instead of leaves to reduce water loss.</li>
  <li><strong>Behavioural</strong> — what the organism does. Desert animals are active at night to avoid the heat; some birds migrate to find food.</li>
  <li><strong>Functional</strong> — a physiological process. A camel conserves water by producing concentrated urine; some fish can change the amount of salt they excrete.</li>
</ul>
<p><strong>Competition</strong> happens when organisms need the same resource that is in short supply — light, water, space, food or a mate. Organisms that compete successfully are more likely to survive and reproduce, which is natural selection in one sentence. <strong>Extremophiles</strong> are adapted to conditions that would kill most life, such as high temperature, high salt or high pressure.</p>

<h3>4. Sampling: quadrats and transects</h3>
<p>You cannot count every organism, so ecologists sample. A quadrat is a square frame placed at random; counting within several quadrats gives an estimate for the whole area. A transect is a line across a habitat, with quadrats placed along it, used when conditions change from one place to another — for example from a path into a wood.</p>
<p>estimated population = (mean number per quadrat × total area) ÷ area of one quadrat</p>
<p><em>Key:</em> estimated population = the total number in the habitat (individuals); mean per quadrat = the average count from the samples; total area = the area of the whole habitat (m²); area of one quadrat = the area covered by the frame (m²).</p>
<p>Random placement matters. Throwing the quadrat over the shoulder, or always placing it where the flowers are, produces a biased estimate — and "state one way to make the sampling more reliable" wants either random placement or a larger number of samples.</p>

<h3>5. Worked example: population estimate and energy efficiency</h3>
<p>A student places ten 0.25 m² quadrats in a 400 m² field and counts 4, 6, 5, 7, 3, 5, 4, 6, 5, 5 dandelions. Estimate the population.</p>
<p>mean per quadrat = 50 ÷ 10 = 5. Then estimated population = (5 × 400) ÷ 0.25 = 2 000 ÷ 0.25 = 8 000 dandelions.</p>
<p><em>Key:</em> mean per quadrat = the total count divided by the number of quadrats; 400 m² = the area of the field; 0.25 m² = the area of one quadrat.</p>
<p>Now the energy side. If the grass in a field contains 80 000 kJ of energy and the rabbits eating it contain 8 000 kJ, the efficiency is (8 000 ÷ 80 000) × 100 = 10 %. The other 72 000 kJ was lost as heat from respiration, used in movement, or passed out in waste — and it is not available to the foxes.</p>

<h3>6. The carbon cycle</h3>
<p>Carbon moves between the atmosphere, living organisms, the soil and the oceans. The processes are few, and the exam asks you to name the one that moves carbon in a given direction.</p>
<ul>
  <li><strong>Photosynthesis</strong> removes carbon dioxide from the atmosphere and stores the carbon in glucose.</li>
  <li><strong>Respiration</strong> releases carbon dioxide back to the atmosphere from plants, animals and decomposers.</li>
  <li><strong>Feeding</strong> passes carbon compounds along a food chain.</li>
  <li><strong>Decomposition</strong> releases carbon dioxide as microorganisms break down dead material.</li>
  <li><strong>Combustion</strong> of fossil fuels releases carbon that was locked away for millions of years, which is why it adds to the atmospheric store rather than recycling it quickly.</li>
</ul>

<h3>7. Decay</h3>
<p>Decomposers break down dead material faster when the conditions suit them: warm, moist and aerobic. That is why compost heaps are kept damp and turned to add oxygen, and why food lasts longer in a freezer — cold slows the microorganisms down.</p>
<ul>
  <li><strong>Temperature</strong> — warmer means faster decay, up to the point where the microorganisms are killed.</li>
  <li><strong>Water</strong> — decomposers need moisture; a dry compost heap barely decays.</li>
  <li><strong>Oxygen</strong> — most decomposers are aerobic, so turning a heap or leaving it open speeds decay.</li>
</ul>
<p>The standard practical measures the rate of decay of milk or bread at different temperatures, using the time taken for an indicator to change colour. The point of the result is that decay is enzyme-controlled, so it has an optimum rather than simply rising with temperature forever.</p>

<h3>8. Humans and their effects on the environment</h3>
<p>The specification's biology-only subsection asks for the effects, and each effect is best remembered as a cause, a consequence and a cost to biodiversity.</p>
<ul>
  <li><strong>Deforestation</strong> destroys habitats, reduces carbon dioxide uptake and can increase soil erosion and flooding.</li>
  <li><strong>Air pollution</strong> — sulfur dioxide from burning fossil fuels dissolves in rain to form acid rain, which damages leaves and kills aquatic life in acidified lakes.</li>
  <li><strong>Water pollution</strong> — fertiliser run-off adds nitrates, causing eutrophication: algae grow, block light, die, and their decomposition uses up oxygen, killing fish.</li>
  <li><strong>Land pollution</strong> — landfill takes land and releases methane; plastics persist for centuries because they are not biodegradable.</li>
  <li><strong>Greenhouse gases</strong> — carbon dioxide and methane trap heat; rising global temperature shifts habitats and raises sea levels.</li>
</ul>
<p>Biodiversity is the variety of species and of the genetic variation within them. It matters because a more diverse ecosystem is more resilient: if one species fails, others can fill its role. Conservation — protected areas, breeding programmes, hedgerows and seed banks — is the response, and it works best when it protects a whole habitat rather than one animal.</p>

<h3>9. Typical mistakes</h3>
<ul>
  <li>Writing "energy is lost" without saying where: heat from respiration, movement, waste, uneaten parts.</li>
  <li>Confusing a pyramid of biomass with a pyramid of energy, or claiming energy pyramids can be inverted.</li>
  <li>Giving an adaptation without its advantage — "the cactus has spines" earns nothing on its own.</li>
  <li>Sampling only where the plants are obvious, then describing the estimate as accurate.</li>
  <li>Saying plants only take carbon dioxide out of the atmosphere. They also respire, day and night.</li>
  <li>Describing eutrophication as "algae poison the water" rather than the oxygen being used up by decomposers.</li>
  <li>Calling decay "rotting by chemicals" — it is microorganisms, and their enzymes, that do it.</li>
</ul>

<h3>10. Exam-style questions</h3>
<ol>
  <li>Explain why a food chain rarely contains more than five trophic levels. <em>Answer:</em> Only about 10 % of the energy is passed to the next level, the rest being lost as heat from respiration, in movement and in waste, so there is too little energy left for more levels.</li>
  <li>Grass contains 60 000 kJ and the cows eating it contain 6 600 kJ. Calculate the efficiency of energy transfer. <em>Answer:</em> efficiency = (6 600 ÷ 60 000) × 100 = 11 %.</li>
  <li>Give two adaptations of a polar bear and explain each. <em>Answer:</em> Thick fur traps a layer of warm air, reducing heat loss; a thick layer of fat insulates and stores energy for when food is scarce.</li>
  <li>A 0.5 m² quadrat is used 8 times in a 200 m² field, giving a mean of 6 plants. Estimate the population. <em>Answer:</em> estimated population = (mean per quadrat × total area) ÷ area of one quadrat = (6 × 200) ÷ 0.5 = 2 400 plants.</li>
  <li>Describe how carbon dioxide is returned to the atmosphere from a dead tree. <em>Answer:</em> Decomposers such as fungi and bacteria break down the dead wood and respire, releasing carbon dioxide.</li>
  <li>Explain why a compost heap decays faster when it is turned regularly. <em>Answer:</em> Turning adds oxygen, and the decomposers are aerobic, so respiration and therefore decay are faster.</li>
  <li>Explain how fertiliser run-off can kill fish in a river. <em>Answer:</em> Nitrates cause algae to grow and cover the surface, blocking light so plants die; decomposers break them down and use up the dissolved oxygen, so fish suffocate.</li>
  <li>Why does deforestation reduce biodiversity? <em>Answer:</em> It removes the habitat and food sources of many species, so populations fall and some species disappear locally.</li>
</ol>

<h3>11. Revision checklist</h3>
<ul>
  <li>I can define producer, consumer, decomposer and trophic level.</li>
  <li>I can explain the 10 % rule and calculate efficiency.</li>
  <li>I can give structural, behavioural and functional adaptations with their advantages.</li>
  <li>I can describe quadrat and transect sampling and calculate a population estimate.</li>
  <li>I can name every process that moves carbon and say which way it moves.</li>
  <li>I can describe the conditions that speed up decay and explain why.</li>
  <li>I can describe four human effects on ecosystems and their consequences.</li>
  <li>I can explain why biodiversity makes an ecosystem more resilient.</li>
</ul>
`,
};
