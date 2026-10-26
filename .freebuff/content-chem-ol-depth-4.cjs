// Chemistry OL batch 4 (final): official Cambridge IGCSE Chemistry 0620
// (2026-2028) Topic 10 Chemistry of the environment (10.1-10.3), Topic 11
// Organic chemistry (11.1-11.8), Topic 4 Electrochemistry (4.1-4.2), and
// Topic 12 Experimental techniques and chemical analysis (12.1-12.5).
// Apply with:
//   node .freebuff/deepen-materials.cjs .freebuff/content-chem-ol-depth-4.cjs > .freebuff-tmp/chem-ol-depth-4.sql
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/chem-ol-depth-4.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/chem-ol-depth-4.sql --apply    (live)
//   node .freebuff/gate-notes-depth.cjs chemistry OL
module.exports = {
  expectType: "notes",
  titles: {
    "e51a576e-ebcb-4404-8ae8-7aa018b616b7": "IGCSE Chemistry: Chemistry of the Environment",
    "b3609283-5d19-4ea0-86aa-356e04df0f0b": "IGCSE Chemistry: Organic Chemistry",
    "b290fd9b-cc65-4027-a372-df32e53681df": "IGCSE Chemistry: Electrochemistry",
    "9034a6b5-8b7b-4c8e-a7d2-66cab166e916": "IGCSE Chemistry: Experimental Techniques and Analysis",
  },
  rows: {
    "e51a576e-ebcb-4404-8ae8-7aa018b616b7": `
<h2>IGCSE Chemistry: Chemistry of the Environment</h2>
<p>Cambridge IGCSE Chemistry 0620 (2026–2028), Extended route, Topic 10 Chemistry of the environment: statement 10.1 Water, 10.2 Fertilisers, and 10.3 Air quality and climate. This is applied chemistry at its most exam-visible: the greenhouse mechanism, pollutant chemistry and water treatment are all regular Paper 4 questions that demand particle-level and chemical explanations, not lists. Every reaction below is written in the form the mark scheme expects.</p>

<h3>Water: testing, purity and treatment</h3>
<p>The <strong>test for water</strong> is anhydrous copper(II) sulfate (white → blue) or anhydrous cobalt(II) chloride (blue → pink) — the hydrated colour change from the salts topic. <strong>Purity</strong> is judged by melting/boiling point: pure water boils sharply at 100 °C; an impure sample boils over a range and above 100 °C (boiling-point elevation). Practical chemistry uses distilled water because tap water's dissolved ions interfere with reactions and leave residues.</p>
<pre><code>Domestic water treatment, stage by stage:

  1. SEDIMENTATION: water stands in settling tanks; insoluble particles
     sink (sometimes a flocculant like aluminium sulfate is added to bind
     small particles).
  2. FILTRATION: through gravel and sand beds - removes remaining solids.
  3. CARBON FILTRATION: activated carbon adsorbs dissolved organic
     substances, taste and odour compounds.
  4. CHLORINATION: chlorine kills bacteria and viruses (dose ~1 ppm);
     it stays in the supply to guard against recontamination.

  Natural waters may contain: dissolved oxygen (essential for aquatic
  life), metal compounds (toxic - e.g. lead from old pipes), nitrates and
  phosphates (from fertiliser run-off - cause eutrophication: algal bloom,
  blocked light, decay deoxygenates the water, fish die), sewage and
  microbes (disease), plastics (physical harm, microplastics).</code></pre>

<h3>Fertilisers</h3>
<p>Fertilisers supply the three nutrients <strong>NPK</strong>: nitrogen (leaf growth), phosphorus (roots), potassium (flowers/fruit). Ammonium salts (e.g. ammonium nitrate, NH₄NO₃) and nitrates are the main nitrogen sources. Manufacture is the Haber–Bosch chain: N₂ + 3H₂ ⇌ 2NH₃, then NH₃ + HNO₃ → NH₄NO₃. Fertilisers boost yields but cause water pollution when washed off — the trade-off earns marks in environment questions.</p>

<h3>Air quality and climate</h3>
<table border="1" cellpadding="6">
<tr><th>Pollutant</th><th>Source</th><th>Effect</th><th>Countermeasure</th></tr>
<tr><td>CO</td><td>Incomplete combustion of fuels</td><td>Toxic (binds haemoglobin)</td><td>Catalytic converters; efficient engines</td></tr>
<tr><td>SO₂</td><td>Combustion of sulfur-containing fossil fuels</td><td>Acid rain (damages buildings, lakes, trees)</td><td>Flue-gas desulfurisation (CaO/CaCO₃ scrubbing); low-sulfur fuels</td></tr>
<tr><td>NO/NO₂</td><td>High-temperature combustion in engines</td><td>Acid rain; photochemical smog</td><td>Catalytic converters (2CO + 2NO → 2CO₂ + N₂)</td></tr>
<tr><td>CO₂</td><td>Combustion of all carbon fuels</td><td>Greenhouse gas — enhanced global warming</td><td>Renewables, efficiency, carbon capture</td></tr>
<tr><td>Particulates</td><td>Diesel engines, industry</td><td>Respiratory disease</td><td>Filters</td></tr>
</table>
<pre><code>The greenhouse effect explained mechanistically - the Extended wording:

  1. Solar radiation arrives mostly as short-wavelength (visible/UV) light,
     which passes through the atmosphere and warms the Earth's surface.
  2. The warm Earth re-radiates energy as longer-wavelength INFRA-RED.
  3. Greenhouse gases (CO₂, CH₄, H₂O vapour) ABSORB this infra-red and
     re-emit it in all directions - some back toward the surface.
  4. Less energy escapes to space than arrived, so the lower atmosphere and
     surface warm further.

  Sources of the enhanced effect: burning fossil fuels (CO₂), agriculture
  and landfill (CH₄), deforestation (less CO₂ absorbed).
  Why methane matters: each CH₄ molecule absorbs MORE infra-red per molecule
  than CO₂, though it is shorter-lived in the atmosphere.

Nitrogen oxides in engines: N₂ + O₂ -> 2NO at high temperature inside the
engine (the heat of combustion breaks the very strong N≡N and O=O bonds);
2NO + O₂ -> 2NO₂ in the air. Catalytic converters reduce them back:
  2CO + 2NO -> 2CO₂ + N₂   (both pollutants converted to less harmful gases)

Photosynthesis:  6CO₂ + 6H₂O -> C₆H₁₂O₆ + 6O₂   (light, chlorophyll)</code></pre>

<h3>The atmosphere and climate change evidence</h3>
<p>Clean dry air is approximately 78% nitrogen, 21% oxygen, 1% noble gases and about 0.04% carbon dioxide — a composition worth stating in source-and-effect answers because the gases that matter climatically are the trace ones. Climate evidence the syllabus expects candidates to interpret: rising global mean temperatures, retreating glaciers and ice sheets, rising sea levels from thermal expansion and melting ice, and changing weather patterns. Mitigation strategies split into two families: <strong>adaptation</strong> (building flood defences, developing drought-resistant crops) and <strong>mitigation</strong> (renewable energy, efficiency, reforestation, international agreements to cut emissions). Chemistry contributes both the diagnosis — isotopic analysis of atmospheric CO₂ traces its source to fossil fuels — and the solutions: catalytic converters, flue-gas scrubbing, carbon capture and hydrogen fuel technology.</p>

<h3>Worked example: evaluating an environmental scenario</h3>
<pre><code>A coal power plant adds a desulfurisation unit. Evaluate.

  Problem: SO₂ from sulfur impurities in coal causes acid rain:
    SO₂ + H₂O -> H₂SO₃ (and further oxidation to H₂SO₄).
  Countermeasure: CaCO₃ or CaO in the flue:
    CaCO₃ -> CaO + CO₂ ;  CaO + SO₂ -> CaSO₃ ;
    2CaSO₃ + O₂ -> 2CaSO₄ (gypsum - sold for plasterboard).
  Trade-offs: removes >90% of SO₂ and turns waste into a product, but costs
  energy and money, adds CO₂ from the calcination step, and the slurry waste
  must be handled. Net: acid rain reduced substantially; the CO₂ problem
  (global warming) remains - pollution problems are separate.</code></pre>

<h3>Water purity and the oxygen cycle</h3>
<p>Aquatic chemistry ties the water and air topics together. Dissolved oxygen sustains fish and is replenished at the surface by diffusion and by photosynthesis; organic pollution (sewage, fertiliser run-off) upsets the balance because bacteria consuming the waste also consume the dissolved oxygen — biochemical oxygen demand (BOD) rises and aquatic life suffocates. Heavy-metal compounds (mercury, lead) are toxic because they bind to enzymes and accumulate up the food chain. Microplastics and pathogens add physical and disease hazards. The treatment train in the first section targets exactly these: filtration removes particulates and the organisms sheltering in them, carbon adsorption removes organics, and chlorination kills the pathogens — while distillation in the laboratory removes everything dissolved, which is why distilled water is the chemist's standard.</p>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Describing the greenhouse effect as "the ozone layer" or "the sun getting hotter" — it is infra-red absorption by specific gases.</li>
<li>Confusing global warming (CO₂/CH₄, climate) with acid rain (SO₂/NOₓ) and with ozone depletion (CFCs) — three distinct problems.</li>
<li>Writing acid rain as sulfuric acid only from SO₂ without the water/oxidation steps.</li>
<li>Saying chlorination removes impurities — it kills microbes; sedimentation/filtration removes solids; carbon removes taste/odour.</li>
<li>Forgetting dissolved oxygen in water-quality answers (its absence is the harm in eutrophication).</li>
<li>Claiming fertilisers are simply "pollution" — the balanced answer names yield benefits and run-off costs.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Paper 4, 4 marks).</strong> Describe how carbon dioxide causes global warming.</p>
<p>Answer: Solar radiation warms the Earth's surface, which re-radiates energy as infra-red. CO₂ absorbs this outgoing infra-red and re-emits it in all directions, including back to the surface, so less energy escapes to space. Burning fossil fuels increases atmospheric CO₂, enhancing this natural effect and raising average temperatures.</p>
<p><strong>Question 2 (Paper 4, 4 marks).</strong> Explain how sulfur dioxide causes acid rain and one method of reducing it.</p>
<p>Answer: Sulfur impurities in fuels burn to sulfur dioxide: S + O₂ → SO₂. In the atmosphere it dissolves in rainwater and oxidises to sulfuric acid: SO₂ + H₂O → H₂SO₃, then further oxidation gives H₂SO₄. Reduction: flue-gas desulfurisation using calcium oxide/carbonate, which reacts with SO₂ to give calcium sulfate; or use low-sulfur fuels.</p>
<p><strong>Question 3 (Paper 4, 3 marks).</strong> Describe the stages of domestic water treatment.</p>
<p>Answer: Sedimentation (solids settle, sometimes with a flocculant), filtration through gravel/sand (removes remaining insoluble particles), activated-carbon adsorption (removes taste, odour, dissolved organics), and chlorination (kills bacteria and viruses and protects the supply).</p>
<p><strong>Question 4 (Paper 4, 3 marks).</strong> Explain the test for water and how boiling-point data shows purity.</p>
<p>Answer: Anhydrous copper(II) sulfate turns from white to blue (or cobalt(II) chloride from blue to pink) when water is added. Pure water boils sharply at exactly 100 °C at standard pressure; an impure sample boils over a range of temperatures and above 100 °C.</p>
<p><strong>Question 5 (Paper 4, 4 marks).</strong> Explain the environmental problems caused by fertiliser run-off.</p>
<p>Answer: Nitrates and phosphates wash into rivers and lakes, causing eutrophication: algae grow explosively and block light, so aquatic plants die; the decay of this material by bacteria consumes dissolved oxygen, suffocating fish and other organisms. Excess nitrate in drinking water is also a health risk (it affects blood oxygen transport).</p>
<p><strong>Question 6 (Paper 4, 3 marks).</strong> Write an equation for the catalytic conversion of nitrogen monoxide and carbon monoxide and name the products.</p>
<p>Answer: 2CO + 2NO → 2CO₂ + N₂. The products are carbon dioxide and nitrogen — both far less harmful than the reactants.</p>
<p>The environment is shaped by carbon chemistry too — the organic family tree comes next.</p>
`,

    "b3609283-5d19-4ea0-86aa-356e04df0f0b": `
<h2>IGCSE Chemistry: Organic Chemistry</h2>
<p>Cambridge IGCSE Chemistry 0620 (2026–2028), Extended route, Topic 11 Organic chemistry: statements 11.1 Formulae, functional groups and terminology, 11.2 Naming organic compounds, 11.3 Fuels, 11.4 Alkanes, 11.5 Alkenes, 11.6 Alcohols, 11.7 Carboxylic acids, and 11.8 Polymers. Organic chemistry is a system, not a list — one structural logic generates every name, formula and reaction in this note. Each homologous series is derived from its general formula, and every reaction shows the functional-group change explicitly.</p>

<h3>The organic framework: homologous series and functional groups</h3>
<p>A <strong>homologous series</strong> is a family of similar compounds with the same functional group and general formula, differing by CH₂ units, showing gradual physical-property trends and similar chemistry. A <strong>functional group</strong> is the atom or group of atoms responsible for the characteristic reactions (C=C for alkenes, –OH for alcohols, –COOH for acids).</p>
<table border="1" cellpadding="6">
<tr><th>Series</th><th>General formula</th><th>Functional group</th><th>Suffix</th></tr>
<tr><td>Alkanes</td><td>CₙH₂ₙ₊₂</td><td>None (single bonds)</td><td>-ane</td></tr>
<tr><td>Alkenes</td><td>CₙH₂ₙ</td><td>C=C</td><td>-ene</td></tr>
<tr><td>Alcohols</td><td>CₙH₂ₙ₊₁OH</td><td>–OH</td><td>-ol</td></tr>
<tr><td>Carboxylic acids</td><td>CₙH₂ₙ₊₁COOH</td><td>–COOH</td><td>-oic acid</td></tr>
</table>
<p><strong>Saturated</strong> = all single C–C bonds (alkanes); <strong>unsaturated</strong> = at least one C=C (alkenes). <strong>Structural isomers</strong> share the molecular formula but have different structural formulae (butane and methylpropane, both C₄H₁₀) — the reason displayed formula alone is not enough. Naming: count the carbons (meth- 1, eth- 2, prop- 3, but- 4), add the suffix for the functional group.</p>

<h3>Fuels and fractional distillation</h3>
<pre><code>Petroleum = a mixture of hydrocarbons, separated by FRACTIONAL DISTILLATION.

  The crude oil is vaporised and fed into the column:
   - hot at the bottom, cooler at the top;
   - each fraction condenses at the height where its boiling range matches
     the temperature.

  Fractions (lightest at top): refinery gas (C1-C4, bottled gas),
  gasoline/petrol (C5-C10, car fuel), naphtha (chemical feedstock),
  kerosene/paraffin (jet fuel), diesel oil (lorry fuel), fuel oil (ships),
  lubricating fraction (oils, waxes), bitumen (road surfaces).

  Trend up the column (towards longer chains):
   - BOILING POINT RISES (bigger molecules, stronger intermolecular forces);
   - VISCOSITY INCREASES (thicker, flows less easily);
   - VOLATILITY FALLS (evaporates less readily);
   - COMBUSTION gets less clean (more soot/carbon).</code></pre>
<p>Fractional cracking breaks long alkane chains into shorter, more useful ones (alkanes + alkenes): C₁₀H₂₂ → C₈H₁₈ + C₂H₄ — driven by the need for petrol and alkene feedstock.</p>

<h3>Alkanes: substitution</h3>
<p>Alkanes are generally unreactive (strong, non-polar C–C and C–H bonds) but burn (combustion) and undergo <strong>substitution</strong> with halogens in UV light.</p>
<pre><code>Complete combustion (all hydrocarbons):
  CH₄ + 2O₂ -> CO₂ + 2H₂O
Incomplete combustion (limited O₂):
  2CH₄ + 3O₂ -> 2CO + 4H₂O   (carbon monoxide - toxic)
  or soot (C) forms - a visible flame with yellow tips.

Chlorination of methane (photochemical substitution):
  CH₄ + Cl₂  --UV light-->  CH₃Cl + HCl
  One H is REPLACED by Cl - the definition of substitution. The UV light
  provides the activation energy to split the Cl-Cl bond into radicals.
  Further substitution gives CH₂Cl₂, CHCl₃, CCl₄ - the products are a
  mixture, which is why the reaction is poor for synthesis.</code></pre>

<h3>Alkenes: addition</h3>
<p>Alkenes react via the C=C double bond in <strong>addition</strong> reactions — two reactants join to give one product (nothing is lost).</p>
<pre><code>Addition to ethene - each with its conditions:

  + bromine (test for unsaturation):
    C₂H₄ + Br₂ -> C₂H₄Br₂        (1,2-dibromoethane)
    OBSERVATION: orange bromine water is DECOLOURISED - the test that
    distinguishes alkenes from alkanes.

  + hydrogen (nickel catalyst, heat):
    C₂H₄ + H₂ -> C₂H₆            (ethane; hydrogenation - margarine making)

  + steam (phosphoric acid catalyst, heat + pressure):
    C₂H₄ + H₂O -> C₂H₅OH         (ethanol)

In every case the double bond opens to single bonds and the atoms add on -
draw the product by "opening" the C=C and attaching one atom to each carbon.</code></pre>

<h3>Alcohols</h3>
<p>Two production routes for ethanol, with the trade-off the exam always asks:</p>
<pre><code>1. FERMENTATION of glucose (yeast, no oxygen, 25-35 °C):
     C₆H₁₂O₆ -> 2C₂H₅OH + 2CO₂
   Advantages: renewable feedstock (sugar/corn), low energy conditions,
   batch process.
   Disadvantages: slow (days), dilute product (needs distilling), depends on
   crop supply and weather.

2. CATALYTIC HYDRATION of ethene (H₃PO₄ catalyst, 300 °C, 60 atm):
     C₂H₄ + H₂O -> C₂H₅OH
   Advantages: fast, continuous, high purity and yield.
   Disadvantages: ethene comes from crude oil (finite), high energy/pressure
   costs.

Ethanol itself: burns cleanly (C₂H₅OH + 3O₂ -> 2CO₂ + 3H₂O) as a fuel;
a solvent (perfumes, paints); in alcoholic drinks.</code></pre>

<h3>Carboxylic acids and esters</h3>
<p>Carboxylic acids are weak acids: they react with metals (salt + hydrogen), bases (salt + water) and carbonates (salt + water + carbon dioxide — the fizz test that identifies an acid).</p>
<pre><code>Oxidation of ethanol to ethanoic acid:
  ethanol + [O] -> ethanoic acid     e.g. by acidified potassium
  manganate(VII), or by bacterial action in vinegar production (air + 
  Acetobacter).

Esterification (acid + alcohol, concentrated H₂SO₄ catalyst):
  ethanoic acid + ethanol -> ethyl ethanoate + water
  CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O

  Naming esters: the FIRST word comes from the ALCOHOL (ethyl, from ethanol),
  the second from the ACID (ethanoate, from ethanoic acid).
  Propyl methanoate = propanol + methanoic acid.

  Esters: sweet smells (fruits, perfumes), solvents, plasticisers.</code></pre>

<h3>Polymers</h3>
<p>A <strong>monomer</strong> is the small molecule that repeats; a <strong>polymer</strong> is the very long chain of joined monomers. <strong>Addition polymerisation</strong> joins many alkene molecules by opening the double bonds — nothing else is produced.</p>
<pre><code>Deducing the repeat unit - the master method:

  Monomer: propene, CH₂=CH-CH₃
  1. Open the double bond: -CH₂-CH(CH₃)-
  2. Extend the "bonds" at both ends to show the chain continuing:
     [ -CH₂-CH(CH₃)- ]ₙ

  Reverse (monomer from repeat unit): find the two backbone carbons of one
  unit, restore the double bond between them, and cap the ends with the
  substituents that were drawn.

  poly(ethene):  n CH₂=CH₂ -> [ -CH₂-CH₂- ]ₙ
  poly(propene): n CH₂=CHCH₃ -> [ -CH₂-CH(CH₃)- ]ₙ
  poly(chloroethene) (PVC): n CH₂=CHCl -> [ -CH₂-CHCl- ]ₙ

Condensation polymerisation (two different bifunctional monomers):
  a small molecule (usually water) is LOST at each link.
  Nylon (a polyamide): diamine + dicarboxylic acid -> nylon + water.
  PET (a polyester): diol + dicarboxylic acid -> PET + water.
  Proteins are natural polyamides from amino-acid monomers.</code></pre>
<p>Disposal: plastics are non-biodegradable — landfill accumulates, plastics in the ocean harm wildlife, burning releases toxic gases (HCl from PVC, CO from incomplete combustion). Options: recycling (sorted by type), depolymerisation (PET can be broken back to monomers and re-polymerised), and biodegradable alternatives.</p>

<h3>Worked example: one route map, every reaction type</h3>
<pre><code>From ethane to ethyl ethanoate:

  ethane --(cracking/heat)--> ethene      [thermal decomposition]
  ethene + steam --(H₃PO₄, 300 °C)--> ethanol   [addition / hydration]
  ethanol + [O] --(bacterial)--> ethanoic acid  [oxidation]
  ethanol + ethanoic acid --(conc. H₂SO₄)--> ethyl ethanoate [esterification]

  Each arrow names its type, conditions and the functional-group change:
  alkane -> alkene (C-C to C=C), alkene -> alcohol (C=C to C-OH),
  alcohol -> acid (-OH to -COOH), acid + alcohol -> ester (-COOH/-OH to
  -COO-). Tracking the functional group through a route map is the skill
  the exam tests.</code></pre>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Forgetting that addition reactions need the C=C — alkanes substitute, alkenes add; mixing them up loses every mark on the question.</li>
<li>Bromine water: decolourised by alkenes (addition) but NOT by alkanes — the observation sentence must name the colour loss.</li>
<li>Counting general formula wrong for the first members (methane CH₄ fits CₙH₂ₙ₊₂ with n = 1).</li>
<li>Writing polymers without the extending bonds at both ends of the repeat unit (it must show continuation).</li>
<li>In ester naming, swapping which part comes from the acid and which from the alcohol.</li>
<li>Leaving reaction conditions off (UV for substitution, Ni/heat for hydrogenation, concentrated H₂SO₄ for esterification) — conditions are marks.</li>
<li>Claiming fermentation is fast/pure — the comparison with catalytic hydration needs both sides.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Paper 4, 3 marks).</strong> Define a homologous series and state three general characteristics.</p>
<p>Answer: A homologous series is a family of similar compounds with the same functional group and general formula, each member differing from the next by a CH₂ unit. Characteristics: similar chemical properties; gradual trend in physical properties (boiling point rises with chain length); can be made by similar methods.</p>
<p><strong>Question 2 (Paper 4, 4 marks).</strong> Describe the test that distinguishes ethene from ethane, with equations.</p>
<p>Answer: Add aqueous bromine and shake. Ethene decolourises the orange bromine (addition: C₂H₄ + Br₂ → C₂H₄Br₂); ethane shows no change (no reaction in the dark at room temperature). The C=C double bond is responsible for the addition.</p>
<p><strong>Question 3 (Paper 4, 5 marks).</strong> Compare fermentation and catalytic hydration as routes to ethanol.</p>
<p>Answer: Fermentation (C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂, yeast, 25–35 °C) uses renewable sugar crops and mild conditions, but is slow, gives dilute ethanol needing distillation, and varies with crop supply. Catalytic hydration (C₂H₄ + H₂O → C₂H₅OH, H₃PO₄, 300 °C, 60 atm) is fast, continuous and high-yield, but depends on crude-oil-derived ethene and costly high-pressure conditions.</p>
<p><strong>Question 4 (Paper 4, 4 marks).</strong> Draw the repeat unit of poly(propene) and name the polymerisation type.</p>
<p>Answer: Monomer propene CH₂=CHCH₃ opens at the double bond giving repeat unit [–CH₂–CH(CH₃)–]ₙ, with the chain bonds extending at both ends. This is addition polymerisation — many monomers join with no other product.</p>
<p><strong>Question 5 (Paper 4, 4 marks).</strong> Describe how ethyl ethanoate is made and state its uses.</p>
<p>Answer: Warm ethanol with ethanoic acid in the presence of concentrated sulfuric acid catalyst (esterification): CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O. The ester is distilled off. Ethyl ethanoate is used as a solvent (nail-varnish remover), in perfumes and flavourings (sweet smell).</p>
<p><strong>Question 6 (Paper 4, 3 marks).</strong> Explain why burning PVC can be more harmful than burning poly(ethene).</p>
<p>Answer: PVC contains chlorine; burning it releases hydrogen chloride gas, which is toxic and forms acidic fumes, plus carbon monoxide from incomplete combustion. Poly(ethene) contains only carbon and hydrogen and burns to CO₂ and water if complete — less acutely toxic though still a CO₂ source.</p>
<p>Organic molecules can be burned as fuels — the next topic is what happens when electrons move instead: electrochemistry.</p>
`,

    "b290fd9b-cc65-4027-a372-df32e53681df": `
<h2>IGCSE Chemistry: Electrochemistry</h2>
<p>Cambridge IGCSE Chemistry 0620 (2026–2028), Extended route, Topic 4 Electrochemistry: statement 4.1 Electrolysis and 4.2 Hydrogen–oxygen fuel cells. Electrolysis is chemistry driven by electricity — forced electron movement — and every question asks three things: what is the electrolyte, what forms at each electrode, and why. The product rules below are derived from ion behaviour, not memorised lists, and every half-equation is balanced for atoms and charge.</p>

<h3>What electrolysis is</h3>
<p><strong>Electrolysis</strong> is the breakdown of an ionic compound (molten or aqueous) by passing electricity through it. Vocabulary: the <strong>electrolyte</strong> is the ionic compound that conducts when molten or in solution (ions free to move); the <strong>cathode</strong> is the negative electrode (reduction: cations are attracted to it); the <strong>anode</strong> is the positive electrode (oxidation: anions are attracted to it). Electrons flow through the wires; ions carry the charge through the liquid.</p>
<pre><code>The electron bookkeeping, spelled out:

  CATHODE (negative): positive ions (cations) drift here.
    Each cation GAINS electrons -> reduction:  Mⁿ⁺ + n e⁻ -> M
  ANODE (positive): negative ions (anions) drift here.
    Each anion LOSES electrons -> oxidation:  X⁻ -> X + e⁻

  Mnemonic that never fails: OIL RIG
    Oxidation Is Loss (of electrons) - at the ANODE
    Reduction Is Gain - at the CATHODE

  And the electrode names:
    PANC - Positive Anode, Negative Cathode.</code></pre>

<h3>Molten electrolysis</h3>
<pre><code>Case study: molten lead(II) bromide, PbBr₂ (electrolysis of the melt)

  Ions present: Pb²⁺ and Br⁻

  CATHODE: Pb²⁺ + 2e⁻ -> Pb(l)    [lead metal, grey liquid]
    OBSERVATION: grey molten lead collects.
  ANODE:   2Br⁻ -> Br₂(g) + 2e⁻    [bromine vapour]
    OBSERVATION: orange-brown vapour with choking smell.

  Overall: PbBr₂ -> Pb + Br₂  (electrons supplied by the circuit)

General molten-binary rule: the METAL forms at the cathode (reduced);
the NON-METAL forms at the anode (oxidised).</code></pre>

<h3>Aqueous electrolysis: the competition</h3>
<p>In solution, water provides H⁺ and OH⁻ alongside the salt's ions, so both electrodes have competing species. The rules, applied in order:</p>
<ul>
<li><strong>Cathode:</strong> the less reactive ion is discharged (e.g. copper over hydrogen in copper sulfate); if the metal is above hydrogen (Na, K, Ca, Mg, Al), hydrogen is discharged from water.</li>
<li><strong>Anode:</strong> concentrated halide solutions give halogen (Cl₂ from concentrated NaCl); otherwise (sulfate, nitrate, dilute solutions) hydroxide/oxygen is discharged from water.</li>
</ul>
<pre><code>Three standard aqueous cases, worked:

1. Concentrated sodium chloride solution (brine):
   CATHODE: 2H⁺ + 2e⁻ -> H₂(g)         [hydrogen - sodium is too reactive]
   ANODE:   2Cl⁻ -> Cl₂(g) + 2e⁻        [chlorine - concentrated halide]
   Left in solution: NaOH (sodium hydroxide) - a useful by-product.
   Uses: chlorine (water treatment, plastics), hydrogen (ammonia), NaOH.

2. Dilute sulfuric acid (electrolysis of water):
   CATHODE: 4H⁺ + 4e⁻ -> 2H₂
   ANODE:   2H₂O -> O₂ + 4H⁺ + 4e⁻  (or 4OH⁻ -> O₂ + 2H₂O + 4e⁻)
   Volume ratio H₂ : O₂ = 2 : 1 (the classic exam volume question).

3. Aqueous copper(II) sulfate with INERT (platinum/graphite) electrodes:
   CATHODE: Cu²⁺ + 2e⁻ -> Cu(s)        [copper coats the electrode]
   ANODE:   4OH⁻ -> O₂ + 2H₂O + 4e⁻    [oxygen bubbles; solution goes
                                         acidic as Cu²⁺ removed and H⁺
                                         remains from water]

   With COPPER electrodes (electroplating setup):
   CATHODE: Cu²⁺ + 2e⁻ -> Cu          [object being plated gains copper]
   ANODE:   Cu -> Cu²⁺ + 2e⁻          [copper anode dissolves, refilling
                                        the solution - the classic
                                        electroplating arrangement]

Ionic half-equation discipline: atoms balanced first, then charges balanced
with electrons on the correct side (right for oxidation, left for reduction).</code></pre>

<table border="1" cellpadding="6">
<tr><th>Electrolyte</th><th>Electrodes</th><th>Cathode product</th><th>Anode product</th></tr>
<tr><td>Molten PbBr₂</td><td>Inert</td><td>Lead (Pb²⁺ + 2e⁻ → Pb)</td><td>Bromine (2Br⁻ → Br₂ + 2e⁻)</td></tr>
<tr><td>Conc. NaCl(aq)</td><td>Inert</td><td>Hydrogen (2H⁺ + 2e⁻ → H₂)</td><td>Chlorine (2Cl⁻ → Cl₂ + 2e⁻)</td></tr>
<tr><td>Dilute H₂SO₄(aq)</td><td>Inert</td><td>Hydrogen</td><td>Oxygen (2H₂O → O₂ + 4H⁺ + 4e⁻)</td></tr>
<tr><td>CuSO₄(aq)</td><td>Inert</td><td>Copper (Cu²⁺ + 2e⁻ → Cu)</td><td>Oxygen (from OH⁻)</td></tr>
<tr><td>CuSO₄(aq)</td><td>Copper anode</td><td>Copper</td><td>None — anode dissolves (Cu → Cu²⁺ + 2e⁻)</td></tr>
</table>

<h3>Electroplating</h3>
<p><strong>Electroplating</strong> coats an object with a thin layer of another metal (cutlery with chromium, jewellery with silver, cans with tin) — for appearance, corrosion resistance and reduced cost. The object is the <strong>cathode</strong>; the plating metal is the <strong>anode</strong>; the electrolyte contains the plating metal's ions. Its purpose in the syllabus: protection, looks and cost.</p>

<h3>Hydrogen–oxygen fuel cells</h3>
<pre><code>The fuel cell reaction, both half-equations:

  At the anode (hydrogen side):  2H₂ -> 4H⁺ + 4e⁻
  At the cathode (oxygen side):  O₂ + 4H⁺ + 4e⁻ -> 2H₂O
  Overall:  2H₂ + O₂ -> 2H₂O     (electrical energy + heat - a redox
                                   reaction whose electrons travel through
                                   an external circuit instead of direct
                                   contact)

  Key point: the ONLY product is WATER - no CO₂ at the point of use.

Comparison with petrol engines (the "advantages and disadvantages" question):
  + no pollutants at point of use (only water),
  + more efficient than combustion engines (no thermal cycle limits),
  + refuel in minutes (unlike battery charging).
  - hydrogen storage is hard (high pressure/low temperature; bulky tanks),
  - hydrogen is usually made from natural gas (so CO₂ is emitted at the
    production stage) unless made by electrolysis with renewables,
  - fuel cells and hydrogen infrastructure are expensive.</code></pre>

<h3>Worked example: predicting products systematically</h3>
<pre><code>Question: predict all products of electrolysis of aqueous copper(II) sulfate
with copper electrodes, and write the equations.

Step 1 - ions in solution: Cu²⁺, SO₄²⁻, and from water H⁺, OH⁻.
Step 2 - cathode (reduction): competing Cu²⁺ and H⁺; copper is BELOW
  hydrogen in the reactivity series, so Cu²⁺ is discharged:
    Cu²⁺ + 2e⁻ -> Cu
Step 3 - anode (oxidation): sulfate is not discharged; OH⁻ from water would
  give O₂ - BUT the anode is copper, and the copper anode OXIDISES first:
    Cu -> Cu²⁺ + 2e⁻
Step 4 - overall: copper is transferred from anode to cathode (electroplating
  geometry). The solution concentration stays constant (Cu²⁺ lost at the
  cathode is replaced from the anode).
Observations: cathode gains mass (reddish coating); anode loses mass.</code></pre>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Swapping electrodes: cathode is negative (reduction of cations); anode is positive (oxidation of anions) — PANC and OIL RIG together prevent this.</li>
<li>Putting electrons on the wrong side of half-equations (reduction gains them — left; oxidation loses — right) or leaving charge unbalanced.</li>
<li>Ignoring the "concentrated" in brine questions: dilute NaCl gives oxygen at the anode, not chlorine.</li>
<li>Discharging the reactive metal (Na) instead of hydrogen at the cathode in aqueous solutions.</li>
<li>Forgetting the electrodes' material in aqueous cases: copper anodes dissolve rather than producing oxygen.</li>
<li>Claiming fuel cells produce "no products" — water is the product; and ignoring that hydrogen production may still emit CO₂.</li>
<li>Misreading gas volumes: electrolysis of dilute acid gives H₂:O₂ = 2:1 by volume (twice as much hydrogen).</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Paper 4, 3 marks).</strong> Define electrolysis and name the electrode where reduction occurs.</p>
<p>Answer: Electrolysis is the decomposition of an ionic compound (molten or aqueous) by passing an electric current through it. Reduction occurs at the cathode (the negative electrode), where cations gain electrons.</p>
<p><strong>Question 2 (Paper 4, 5 marks).</strong> Write the half-equations and observations for the electrolysis of molten lead(II) bromide.</p>
<p>Answer: Cathode: Pb²⁺ + 2e⁻ → Pb — grey molten lead collects. Anode: 2Br⁻ → Br₂ + 2e⁻ — orange-brown bromine vapour forms. The melt conducts because its ions are free to move; lead forms because Pb²⁺ ions are reduced at the negative electrode.</p>
<p><strong>Question 3 (Paper 4, 5 marks).</strong> Predict the products of electrolysis of concentrated aqueous sodium chloride and explain each choice.</p>
<p>Answer: Cathode: hydrogen (2H⁺ + 2e⁻ → H₂) — sodium is more reactive than hydrogen, so H⁺ from water is discharged. Anode: chlorine (2Cl⁻ → Cl₂) — the solution is concentrated in chloride, which is discharged in preference to hydroxide. Sodium hydroxide remains in solution. Both gases are industrially useful.</p>
<p><strong>Question 4 (Paper 4, 3 marks).</strong> Describe the electrolysis of aqueous copper(II) sulfate with copper electrodes.</p>
<p>Answer: The copper anode dissolves (Cu → Cu²⁺ + 2e⁻) and copper is deposited on the cathode (Cu²⁺ + 2e⁻ → Cu), transferring copper from anode to object — the electroplating arrangement. The blue colour of the solution stays constant because Cu²⁺ is replenished at the anode.</p>
<p><strong>Question 5 (Paper 4, 4 marks).</strong> Write the electrode reactions in a hydrogen–oxygen fuel cell and state one advantage and one disadvantage versus petrol.</p>
<p>Answer: Anode: 2H₂ → 4H⁺ + 4e⁻. Cathode: O₂ + 4H⁺ + 4e⁻ → 2H₂O. Overall 2H₂ + O₂ → 2H₂O. Advantage: the only product is water, so no pollutants at the point of use. Disadvantage: hydrogen is hard to store safely and is currently mostly produced from natural gas, which generates CO₂.</p>
<p><strong>Question 6 (Paper 4, 4 marks).</strong> Explain why a copper coating is applied to a steel object and how the setup is arranged.</p>
<p>Answer: The copper coating improves appearance and protects the steel from corrosion at lower cost than solid copper. The steel object is made the cathode, a copper anode is used, and the electrolyte is aqueous copper(II) sulfate (or acidified copper sulfate): Cu²⁺ + 2e⁻ → Cu deposits on the object while the anode dissolves, keeping the ion concentration constant.</p>
<p>The final pillar of the course is the laboratory itself — the techniques and analyses that Paper 6 tests in writing.</p>
`,

    "9034a6b5-8b7b-4c8e-a7d2-66cab166e916": `
<h2>IGCSE Chemistry: Experimental Techniques and Analysis</h2>
<p>Cambridge IGCSE Chemistry 0620 (2026–2028), Extended route, Topic 12 Experimental techniques and chemical analysis: statements 12.1 Experimental design, 12.2 Acid–base titrations, 12.3 Chromatography, 12.4 Separation and purification, and 12.5 Identification of ions and gases. This is the Paper 6 blueprint — the written practical paper — and it rewards precise procedure language: apparatus named, steps ordered, errors identified with improvements. Every technique below is described as a step-by-step method plus its accuracy reasoning.</p>

<h3>Experimental design and apparatus</h3>
<table border="1" cellpadding="6">
<tr><th>Quantity</th><th>Apparatus</th><th>Accuracy notes</th></tr>
<tr><td>Volume (large)</td><td>Measuring cylinder</td><td>Read at the bottom of the meniscus at eye level</td></tr>
<tr><td>Volume (precise)</td><td>Burette (titration), volumetric pipette</td><td>Burette reads to 0.05 cm³; pipette delivers one fixed volume accurately</td></tr>
<tr><td>Mass</td><td>Balance (±0.01 g)</td><td>Zero the balance; subtract container mass</td></tr>
<tr><td>Time</td><td>Stopwatch</td><td>Human reaction time ≈ 0.2 s — significant for fast reactions</td></tr>
<tr><td>Temperature</td><td>Thermometer (or probe)</td><td>Stir for even readings; do not rest the bulb on the vessel</td></tr>
<tr><td>Gas volume</td><td>Gas syringe (or inverted burette)</td><td>Check for leaks; read dead-on at eye level</td></tr>
</table>
<p><strong>Design variables</strong>: the independent variable (what you change), the dependent (what you measure), and control variables (what you keep fixed for a fair test). Range and number of values: at least 5–6 values across a sensible span, with repeats for averages and anomalous results.</p>

<h3>Titration technique</h3>
<pre><code>Titration of sodium hydroxide with hydrochloric acid - full method:

  1. Rinse the burette with the acid; fill above the zero and run out to
     remove the air bubble below the tap (a trapped bubble corrupts every
     reading).
  2. Rinse the pipette with the alkali; pipette exactly 25.0 cm³ of NaOH
     into a conical flask.
  3. Add 2-3 drops of a suitable indicator (phenolphthalein or methyl
     orange - choose one that changes at the endpoint).
  4. Run acid in from the burette with constant swirling until the indicator
     CHANGES COLOUR permanently (the endpoint).
  5. Record the titre (final - initial reading). REPEAT to obtain CONCORDANT
     titres within 0.10 cm³; average only the concordant ones.

  Sources of error and their improvements:
   - misjudging the endpoint -> add the last cm³ dropwise, swirl;
   - bubble in the burette -> run the tap briefly before starting;
   - reading the meniscus at an angle (parallax) -> read at eye level;
   - overswirling spilling -> controlled swirling against a white tile.

  Titration calculation (linked to the stoichiometry note):
   moles = c x V ; use the balanced equation's ratio ; c = moles / V.</code></pre>

<h3>Chromatography</h3>
<p><strong>Paper chromatography</strong> separates soluble coloured mixtures: a spot of the mixture is placed on the baseline near the bottom of the paper, the paper stands in a solvent (the baseline must be ABOVE the solvent level, or the spot washes away), and the solvent rises carrying components at different rates.</p>
<pre><code>Reading a chromatogram - the Rf calculation:

  Rf = distance travelled by the substance
       / distance travelled by the solvent front

  Worked: a component moves 4.2 cm; the solvent front moves 6.0 cm.
    Rf = 4.2 / 6.0 = 0.70

  Rf is always less than 1 (substances cannot outrun the solvent) and has
  no units. Measure from the CENTRE of the spot to the line, both distances
  from the same baseline.

  Colourless mixtures: run the chromatography, then use a LOCATING AGENT
  (spray with ninhydrin for amino acids, or view under UV) to reveal spots.
  Purity assessment: a pure substance gives ONE spot; mixtures give several.
  Identification: compare Rf values with known standards run on the same
  paper (same solvent, same conditions).</code></pre>

<h3>Separation and purification</h3>
<ul>
<li><strong>Filtration</strong> — separates an insoluble solid from a liquid (filter paper/funnel; the residue stays, the filtrate passes).</li>
<li><strong>Crystallisation</strong> — evaporate solvent to the point of crystallisation, then cool; used for soluble salts from solution.</li>
<li><strong>Simple distillation</strong> — separates a solvent from a solution (water from salt solution): boil, condense the vapour in a Liebig condenser, collect the distillate.</li>
<li><strong>Fractional distillation</strong> — separates miscible liquids with different boiling points (ethanol/water; petroleum fractions) using a fractionating column.</li>
<li><strong>Purity checks</strong> — pure substances melt/boil at sharp, fixed temperatures; impure samples over a range and displaced (impure melts lower, boils higher).</li>
</ul>
<pre><code>Simple vs fractional distillation - the difference that earns marks:

  SIMPLE:  mixture heated; vapour goes straight to the condenser.
           Used when ONE component is needed (pure water from brine).
  FRACTIONAL: a fractionating column sits between flask and condenser;
           vapour condenses and re-evaporates up the column, so fractions
           with different boiling points separate at different heights.
           Used to separate several components (petroleum, air).

  Apparatus detail: the thermometer bulb sits level with the side arm of the
  still head - it must measure the VAPOR, not the liquid.</code></pre>

<h3>Qualitative analysis: ions and gases</h3>
<table border="1" cellpadding="6">
<tr><th>Test</th><th>Reagent / method</th><th>Positive observation</th></tr>
<tr><td>Carbonate</td><td>Add dilute acid</td><td>Effervescence; gas turns limewater milky (CO₂)</td></tr>
<tr><td>Chloride</td><td>Dilute nitric acid + silver nitrate</td><td>White precipitate</td></tr>
<tr><td>Bromide</td><td>As chloride</td><td>Cream precipitate</td></tr>
<tr><td>Iodide</td><td>As chloride</td><td>Yellow precipitate</td></tr>
<tr><td>Sulfate</td><td>Dilute hydrochloric acid + barium chloride</td><td>White precipitate</td></tr>
<tr><td>Nitrate</td><td>Add NaOH + aluminium foil, warm</td><td>Ammonia gas (turns damp red litmus blue)</td></tr>
<tr><td>Hydrogen</td><td>Burning splint at the mouth</td><td>Squeaky pop</td></tr>
<tr><td>Oxygen</td><td>Glowing splint</td><td>Relights</td></tr>
<tr><td>Carbon dioxide</td><td>Bubble through limewater</td><td>Turns milky/cloudy</td></tr>
<tr><td>Ammonia</td><td>Damp red litmus</td><td>Turns blue</td></tr>
<tr><td>Chlorine</td><td>Damp litmus</td><td>Bleaches white</td></tr>
</table>
<p>Flame tests: Li⁺ red, Na⁺ yellow, K⁺ lilac, Ca²⁺ orange-red, Ba²⁺ light green, Cu²⁺ blue-green — the wire is dipped in acid and cleaned between tests. Cation tests with NaOH(aq): Cu²⁺ light blue precipitate, Fe²⁺ green, Fe³⁺ red-brown, Zn²⁺ white (dissolves in excess), Al³⁺ white (dissolves in excess), NH₄⁺ gives ammonia on warming; with ammonia solution, copper gives a deep blue solution in excess.</p>

<h3>Worked example: a full Paper 6 problem</h3>
<pre><code>Question: a student finds a white solid that could be sodium carbonate or
sodium chloride. Plan a test.

  1. SOLUBILITY/FUNCTIONAL: dissolve a sample in water; add dilute
     hydrochloric acid to a portion.
       Effervescence -> carbonate present (CO₂: limewater test confirms).
       No change -> chloride likely.
  2. CONFIRM CHLORIDE: acidify with dilute nitric acid, add silver nitrate.
       White precipitate of AgCl confirms chloride.
  3. FLAME TEST for sodium (yellow flame) confirms the cation either way.

  Error analysis the question may add: "the limewater was already milky
  before the test" -> use fresh limewater and a control; "no precipitate
  formed but chloride was claimed" -> the acid must be nitric (hydrochloric
  acid adds chloride itself - a classic trap).</code></pre>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Hydrochloric acid in the sulfate or chloride test — it introduces the very ions being tested for; use nitric acid for halide tests, HCl + BaCl₂ only for sulfate.</li>
<li>Placing the baseline below the solvent level in chromatography (spot dissolves away).</li>
<li>Rf values greater than 1 or calculated without the solvent-front measurement from the same baseline.</li>
<li>Titration: forgetting to remove the burette bubble or averaging non-concordant titres.</li>
<li>Describing distillation apparatus without the thermometer position at the side arm.</li>
<li>Listing qualitative tests without the exact observation wording (precipitate colours, gas tests) — the observation is the mark.</li>
<li>Not naming control variables in design questions; a "fair test" answer must say what is kept constant and why.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Paper 6, 4 marks).</strong> Describe how to obtain pure water from salt water and name the technique.</p>
<p>Answer: Simple distillation: heat the salt solution in a flask; water evaporates and the vapour passes into a Liebig condenser (cold water jacket) where it condenses; collect the distillate in a receiver. The salt remains in the flask. The thermometer bulb is placed at the side arm to confirm pure water distilling at 100 °C.</p>
<p><strong>Question 2 (Paper 6, 4 marks).</strong> A chromatogram of a food dye gives a spot 5.0 cm from the baseline with a solvent front of 8.0 cm. Calculate Rf and explain how the mixture's components are identified.</p>
<p>Answer: Rf = 5.0 ÷ 8.0 = 0.625. Each component moves a characteristic distance; identification is by comparing Rf values with known standards run in the same solvent under the same conditions. A pure substance gives one spot; several spots show a mixture.</p>
<p><strong>Question 3 (Paper 6, 5 marks).</strong> Describe a titration to find the concentration of hydrochloric acid using standard sodium hydroxide, including precautions.</p>
<p>Answer: Rinse and fill the burette with acid (remove the air bubble); pipette 25.0 cm³ of the sodium hydroxide into a conical flask; add 2–3 drops of indicator; run in acid with swirling until the colour changes permanently; record the titre; repeat to concordant titres within 0.10 cm³ and average. Precautions: read the meniscus at eye level; add the last cm³ dropwise; swirl continuously.</p>
<p><strong>Question 4 (Paper 6, 3 marks).</strong> State the tests and results for carbon dioxide, oxygen and ammonia gases.</p>
<p>Answer: Carbon dioxide: bubble through limewater — turns milky/cloudy. Oxygen: insert a glowing splint — it relights. Ammonia: hold damp red litmus paper at the mouth — it turns blue.</p>
<p><strong>Question 5 (Paper 6, 4 marks).</strong> A student must separate a mixture of sand and salt. Describe the method and how to recover solid salt.</p>
<p>Answer: Add water and stir to dissolve the salt; filter through filter paper and funnel — sand stays as the residue, salt solution is the filtrate. Evaporate the filtrate (gentle heating to the point of crystallisation) to recover solid salt crystals; the water can be distilled off for reuse. Check purity by melting-point determination.</p>
<p><strong>Question 6 (Paper 6, 3 marks).</strong> Identify a white solid: it effervesces with acid and the gas turns limewater milky; the flame test is lilac. Name the compound and justify.</p>
<p>Answer: Effervescence with limewater-milky gas confirms carbonate (CO₃²⁻); the lilac flame confirms potassium. The solid is potassium carbonate, K₂CO₃.</p>
<p>With the full 0620 content in place, the IGCSE chemistry estate is complete — the A Level course builds directly on these foundations.</p>
`,
  },
};
