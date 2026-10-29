// Lessons for Cambridge IGCSE Chemistry 0620.
//
// Why this file exists: the level had twelve topics and ZERO lessons, so its hub
// reported "0 Lessons" and every other Chemistry level looked complete next to
// it. One lesson per topic, in the same shape as the rest of the estate (h2
// title, syllabus reference, numbered sections, exam focus) because a topic's
// lesson is the taught walk-through, not a second copy of its notes.
//
// Content only — no backticks, no LaTeX, symbols written as glyphs.

module.exports = [
  {
    topic: "states-of-matter",
    title: "States of Matter",
    content: `<h2>States of Matter</h2>
<p><strong>Cambridge IGCSE 0620 (2023–2025):</strong> 1.1 solids, liquids and gases; 1.2 diffusion — particle arrangement, kinetic theory, changes of state.</p>

<h3>1. The three states, in particles</h3>
<table border="1" cellpadding="6"><tr><th>State</th><th>Arrangement</th><th>Motion</th><th>Shape / volume</th></tr>
<tr><td>solid</td><td>close, regular lattice</td><td>vibrate about fixed positions</td><td>fixed both</td></tr>
<tr><td>liquid</td><td>close, irregular</td><td>slide past each other</td><td>fixed volume, takes container shape</td></tr>
<tr><td>gas</td><td>far apart, random</td><td>fast, straight lines</td><td>fills the container</td></tr></table>

<h3>2. Changes of state and their names</h3>
<p>Melting (s → l) and boiling (l → g) take in energy; freezing (l → s) and condensing (g → l) release it. Evaporation happens below the boiling point, from the surface, and is faster with a higher temperature, larger surface area and moving air. Sublimation is solid → gas directly, as iodine and carbon dioxide do.</p>
<p>During melting and boiling the temperature stays constant: the energy supplied breaks forces between particles instead of raising kinetic energy. That plateau is why a heating curve has flat sections.</p>

<h3>3. Kinetic theory and pressure</h3>
<p>Gas pressure comes from particles colliding with the walls. Heating at constant volume raises the average speed, so collisions are more frequent and harder: pressure rises. Compressing a fixed mass at constant temperature raises pressure because each collision is more frequent. The kelvin scale is needed for gas calculations: T(K) = θ(°C) + 273.</p>

<h3>4. Diffusion</h3>
<p>Diffusion is the spreading of particles from high to low concentration by random motion. It is fastest for light particles at high temperature: ammonia (Mr 17) travels faster than hydrogen chloride (Mr 36.5), so the white ring of ammonium chloride forms nearer the HCl end. Bromine vapour and potassium manganate(VII) in water are the standard demonstrations.</p>

<h3>Exam focus</h3>
<p><strong>Q:</strong> Explain why a gas exerts a higher pressure when its temperature is raised at constant volume.</p>
<p><strong>A:</strong> Particles gain kinetic energy and move faster; they hit the walls more often and with greater force per collision, so pressure rises.</p>`,
  },
  {
    topic: "atoms-elements-and-compounds",
    title: "Atoms, Elements and Compounds",
    content: `<h2>Atoms, Elements and Compounds</h2>
<p><strong>Cambridge IGCSE 0620 (2023–2025):</strong> 2.1 elements, compounds and mixtures; 2.2 atomic structure and the Periodic Table; 2.3 isotopes; 2.4 ions and ionic bonds; 2.5 simple molecules and covalent bonds; 2.6 giant covalent structures; 2.7 metallic bonding.</p>

<h3>1. Pure substances and mixtures</h3>
<p>An element contains one kind of atom; a compound contains atoms of two or more elements chemically combined in fixed proportions; a mixture contains substances not chemically joined and can be separated by physical means. Air, seawater and alloys are mixtures.</p>

<h3>2. Inside the atom</h3>
<table border="1" cellpadding="6"><tr><th>Particle</th><th>Relative mass</th><th>Charge</th><th>Where</th></tr>
<tr><td>proton</td><td>1</td><td>+1</td><td>nucleus</td></tr>
<tr><td>neutron</td><td>1</td><td>0</td><td>nucleus</td></tr>
<tr><td>electron</td><td>1/1836</td><td>−1</td><td>shells</td></tr></table>
<p>Proton number Z fixes the element; nucleon number A = protons + neutrons. Isotopes have the same Z and different A, and they differ only in neutron count, so their chemistry is identical while their mass and some physical properties differ. Relative atomic mass is the weighted average of the isotopes, which is why chlorine is 35.5.</p>

<h3>3. Ionic bonding</h3>
<p>A metal loses electrons to form a positive ion, a non-metal gains them to form a negative ion, and the ions are held in a giant lattice by electrostatic attraction. Sodium chloride: Na → Na⁺ + e⁻ and Cl + e⁻ → Cl⁻. Properties follow from the lattice: high melting point, brittle, and it conducts only when molten or dissolved, because the ions must be free to move.</p>

<h3>4. Covalent and metallic bonding</h3>
<p>Non-metals share electron pairs. Simple molecules (H₂O, CO₂, CH₄) have weak forces between molecules, so they melt low. Giant covalent structures (diamond, graphite, silicon(IV) oxide) have very high melting points; diamond is hard because every carbon has four strong bonds, graphite is soft and conducts because its layers slide and each carbon has a delocalised electron. Metals are a lattice of positive ions in a sea of delocalised electrons, which explains conduction and malleability.</p>

<h3>Exam focus</h3>
<p><strong>Q:</strong> Explain why solid sodium chloride does not conduct electricity but molten sodium chloride does.</p>
<p><strong>A:</strong> In the solid the ions are held in fixed positions in the lattice and cannot move; when molten, the lattice breaks down and the ions are free to carry charge.</p>`,
  },
  {
    topic: "stoichiometry",
    title: "Stoichiometry",
    content: `<h2>Stoichiometry</h2>
<p><strong>Cambridge IGCSE 0620 (2023–2025):</strong> 3.1 formulae; 3.2 relative masses of atoms and molecules; 3.3 the mole and the Avogadro constant; 3.4 calculations using moles; 3.5 concentration.</p>

<h3>1. Formulae and relative mass</h3>
<p>Work out an empirical formula from percentage composition by dividing each percentage by its Ar, then dividing by the smallest. Molecular formula is a whole-number multiple of the empirical formula. Relative formula mass Mr is the sum of Ar values: Mr(CaCO₃) = 40 + 12 + 3(16) = 100.</p>

<h3>2. The mole</h3>
<p>One mole contains 6.02 × 10²³ particles and has a mass equal to Mr in grams. Three conversions carry almost every calculation:</p>
<ul>
<li>n = m / Mr (mass in g)</li>
<li>n = V / 24 dm³ at room temperature and pressure, for gases</li>
<li>n = c × V, with c in mol/dm³ and V in dm³, for solutions</li>
</ul>

<h3>3. Using an equation</h3>
<p>The balancing numbers are mole ratios. For 2H₂ + O₂ → 2H₂O, two moles of hydrogen need one mole of oxygen. A typical route: mass → moles of the known substance → moles of the required substance by ratio → mass or volume.</p>
<p><strong>Worked example.</strong> What mass of magnesium oxide forms when 2.4 g of magnesium burns? n(Mg) = 2.4 / 24 = 0.10 mol. The ratio is 2Mg : 2MgO, so n(MgO) = 0.10 mol. Mr(MgO) = 40, so m = 0.10 × 40 = 4.0 g.</p>

<h3>4. Concentration and yield</h3>
<p>Concentration in g/dm³ converts to mol/dm³ by dividing by Mr. Percentage yield = actual / theoretical × 100; percentage purity = mass of pure substance / mass of sample × 100. A yield below 100% is normal: reversible reactions, side reactions and losses on transfer.</p>

<h3>Exam focus</h3>
<p><strong>Q:</strong> 25.0 cm³ of 0.100 mol/dm³ sodium hydroxide neutralises 20.0 cm³ of hydrochloric acid. Find the acid concentration.</p>
<p><strong>A:</strong> n(NaOH) = 0.100 × 0.0250 = 2.50 × 10⁻³ mol; the ratio is 1:1, so n(HCl) is the same; c = 2.50 × 10⁻³ / 0.0200 = 0.125 mol/dm³.</p>`,
  },
  {
    topic: "electrochemistry",
    title: "Electrochemistry",
    content: `<h2>Electrochemistry</h2>
<p><strong>Cambridge IGCSE 0620 (2023–2025):</strong> 4.1 electrolysis; 4.2 hydrogen–oxygen fuel cells; 4.3 rusting.</p>

<h3>1. What electrolysis is</h3>
<p>An electric current drives a non-spontaneous reaction in an electrolyte — a molten ionic compound or an aqueous solution. The positive anode attracts anions, where oxidation (loss of electrons) happens; the negative cathode attracts cations, where reduction (gain) happens. Remember "PANIC": Positive Anode, Negative Is Cathode.</p>

<h3>2. Molten compounds</h3>
<p>Molten lead(II) bromide gives bromine at the anode and lead at the cathode, because there is only one cation and one anion present. This is the cleanest case and the one to quote when asked what electrolysis of a molten salt produces.</p>

<h3>3. Aqueous solutions and the reactivity series</h3>
<p>In water there are always H⁺ and OH⁻ competing. At the cathode, a metal below hydrogen in the reactivity series is deposited; a reactive metal such as sodium or potassium is not, and hydrogen is given off instead. At the anode, halides are discharged in preference to hydroxide, so concentrated sodium chloride solution gives chlorine; with a dilute or non-halide solution, oxygen is produced.</p>
<p>Copper(II) sulfate with copper electrodes is the exception worth knowing: the anode dissolves and copper is deposited at the cathode, so the blue colour stays the same. That is copper refining.</p>

<h3>4. Fuel cells and rusting</h3>
<p>A hydrogen–oxygen fuel cell produces electricity with water as the only product, which is why it is used where exhaust must be clean. Rusting needs both oxygen and water; salt speeds it up, and painting, greasing, galvanising or sacrificial protection (zinc, magnesium) prevents it. Sacrificial protection works because the more reactive metal corrodes instead.</p>

<h3>Exam focus</h3>
<p><strong>Q:</strong> State the products at each electrode when concentrated aqueous sodium chloride is electrolysed, and explain the anode product.</p>
<p><strong>A:</strong> Cathode: hydrogen. Anode: chlorine. Chloride ions are discharged in preference to hydroxide ions because the solution is concentrated, and chlorine is formed by oxidation of Cl⁻.</p>`,
  },
  {
    topic: "chemical-energetics",
    title: "Chemical Energetics",
    content: `<h2>Chemical Energetics</h2>
<p><strong>Cambridge IGCSE 0620 (2023–2025):</strong> 5.1 exothermic and endothermic reactions; 5.2 using enthalpy changes.</p>

<h3>1. Two directions of energy</h3>
<p>An exothermic reaction releases energy to the surroundings, so the mixture warms (combustion, neutralisation, adding water to anhydrous copper(II) sulfate). An endothermic reaction takes energy in, so it cools (thermal decomposition, dissolving ammonium nitrate). The sign convention: ΔH is negative for exothermic, positive for endothermic.</p>

<h3>2. Reading a reaction profile</h3>
<p>Every profile has reactants on one side, products on the other, and a hump in between. The hump height from reactants is the activation energy Ea — the minimum energy colliding particles need. For an exothermic reaction the products sit lower than the reactants; for an endothermic reaction they sit higher. ΔH is simply products minus reactants.</p>

<h3>3. Bond energy arithmetic</h3>
<p>Breaking bonds takes energy in; making bonds gives it out. ΔH = energy to break bonds in reactants − energy released making bonds in products. If breaking costs more than making releases, the reaction is endothermic. A catalyst lowers Ea but never changes ΔH, because the reactants and products are unchanged.</p>

<h3>4. Measuring the change</h3>
<p>A simple calorimeter: measure the temperature rise of a known mass of water, then use q = m c ΔT with c = 4.2 J/(g °C) and divide by the moles reacting. Energy is lost to the surroundings, so the measured value is always smaller than the data-book value; insulation and a lid reduce the loss.</p>

<h3>Exam focus</h3>
<p><strong>Q:</strong> A reaction has ΔH = −890 kJ/mol. Is it exothermic or endothermic, and what happens to the temperature of the mixture?</p>
<p><strong>A:</strong> Exothermic, because ΔH is negative. Energy is transferred to the surroundings, so the temperature rises.</p>`,
  },
  {
    topic: "chemical-reactions",
    title: "Chemical Reactions",
    content: `<h2>Chemical Reactions</h2>
<p><strong>Cambridge IGCSE 0620 (2023–2025):</strong> 6.1 physical and chemical changes; 6.2 rate of reaction; 6.3 reversible reactions and equilibrium; 6.4 redox.</p>

<h3>1. Rate and collision theory</h3>
<p>Particles must collide with at least the activation energy for a reaction to happen. Four factors change the rate, and each one has a particle-level explanation:</p>
<ul>
<li>higher temperature — more frequent and more energetic collisions;</li>
<li>higher concentration or pressure — more particles in the same volume;</li>
<li>larger surface area — more solid exposed to the other reactant;</li>
<li>a catalyst — provides an alternative path with lower activation energy.</li>
</ul>
<p>Measuring rate: mass lost on a balance, gas volume in a syringe, or the time for a cross to disappear behind a precipitate. A steeper initial gradient means a faster rate; the graph flattens as reactants are used up.</p>

<h3>2. Reversible reactions and equilibrium</h3>
<p>In a closed system a reversible reaction settles at dynamic equilibrium: both directions continue at equal rates, so concentrations stay constant but are not equal. Changing conditions moves the position of equilibrium — increasing temperature favours the endothermic direction, increasing pressure favours the side with fewer gas moles, and a catalyst only speeds up reaching equilibrium.</p>
<p>The Haber process is the standard example: N₂ + 3H₂ ⇌ 2NH₃ is exothermic forwards, so a compromise temperature around 450 °C, high pressure and an iron catalyst are used.</p>

<h3>3. Redox in one line</h3>
<p>Oxidation is loss of electrons (and gain of oxygen or loss of hydrogen); reduction is gain of electrons. In Zn + Cu²⁺ → Zn²⁺ + Cu, zinc is oxidised and copper ions are reduced. An oxidising agent is itself reduced.</p>

<h3>Exam focus</h3>
<p><strong>Q:</strong> Explain why increasing the temperature increases the rate of reaction, using collision theory.</p>
<p><strong>A:</strong> Particles move faster and collide more frequently, and a greater proportion of collisions have energy at least equal to the activation energy, so more successful collisions occur per second.</p>`,
  },
  {
    topic: "acids-bases-and-salts",
    title: "Acids, Bases and Salts",
    content: `<h2>Acids, Bases and Salts</h2>
<p><strong>Cambridge IGCSE 0620 (2023–2025):</strong> 7.1 the characteristic properties of acids and bases; 7.2 oxides; 7.3 preparation of salts.</p>

<h3>1. Definitions and everyday behaviour</h3>
<p>An acid is a proton donor; a base is a proton acceptor; an alkali is a soluble base that releases OH⁻ in water. Acids turn litmus red and methyl orange red, and they react with metals, bases and carbonates. Strong acids ionise completely (HCl, HNO₃, H₂SO₄); weak acids ionise partially (ethanoic, citric), which is why they have a higher pH at the same concentration.</p>

<h3>2. pH and indicators</h3>
<p>The pH scale runs 0–14: below 7 acidic, 7 neutral, above 7 alkaline. Universal indicator gives a colour for each pH. Neutralisation is acid + base → salt + water; the ionic equation is H⁺ + OH⁻ → H₂O.</p>

<h3>3. Oxides</h3>
<table border="1" cellpadding="6"><tr><th>Type</th><th>Example</th><th>Behaviour</th></tr>
<tr><td>acidic</td><td>CO₂, SO₂</td><td>non-metal oxide, reacts with alkali</td></tr>
<tr><td>basic</td><td>MgO, CuO</td><td>metal oxide, reacts with acid</td></tr>
<tr><td>amphoteric</td><td>Al₂O₃, ZnO</td><td>reacts with acid and with alkali</td></tr>
<tr><td>neutral</td><td>CO, H₂O</td><td>no acidic or basic behaviour</td></tr></table>

<h3>4. Making a named salt</h3>
<p>Pick the route from solubility. Soluble salts: acid + excess insoluble base or carbonate, filter off the excess, evaporate to crystallise (copper(II) sulfate from CuO and H₂SO₄). Sodium, potassium and ammonium salts: titration, because both reactants are soluble (NaOH + HCl gives NaCl). Insoluble salts: precipitation, mixing two solutions (BaCl₂ + Na₂SO₄ gives BaSO₄).</p>
<p>Tests worth memorising: carbonate + acid gives CO₂ (limewater milky); sulfate + barium chloride gives a white precipitate; chloride + silver nitrate gives a white precipitate soluble in ammonia.</p>

<h3>Exam focus</h3>
<p><strong>Q:</strong> Describe how to prepare pure, dry crystals of copper(II) sulfate from copper(II) oxide and dilute sulfuric acid.</p>
<p><strong>A:</strong> Warm the acid, add copper(II) oxide in excess until no more dissolves, filter off the excess solid, then heat the filtrate to the point of crystallisation and leave it to cool so crystals form; dry them between filter papers.</p>`,
  },
  {
    topic: "the-periodic-table",
    title: "The Periodic Table",
    content: `<h2>The Periodic Table</h2>
<p><strong>Cambridge IGCSE 0620 (2023–2025):</strong> 8.1 arrangement of elements; 8.2 Group I properties; 8.3 Group VII properties; 8.4 transition elements; 8.5 noble gases.</p>

<h3>1. How the table is built</h3>
<p>Elements are ordered by increasing proton number. A new period starts when a shell fills, so elements in the same group have the same number of outer electrons and therefore similar chemical properties. Metals are on the left, non-metals on the right, with the metalloids along the staircase.</p>

<h3>2. Group I — the alkali metals</h3>
<p>Lithium, sodium, potassium, rubidium, caesium. Down the group: reactivity increases, melting point decreases, density increases. They react with water to give a metal hydroxide and hydrogen (2Na + 2H₂O → 2NaOH + H₂), and with oxygen to form oxides. Reactivity rises because the outer electron is further from the nucleus and lost more easily.</p>

<h3>3. Group VII — the halogens</h3>
<p>Fluorine, chlorine, bromine, iodine. Down the group: colour deepens, melting and boiling points rise, reactivity falls. A more reactive halogen displaces a less reactive one from its salt: chlorine + potassium bromide gives bromine and potassium chloride. They form ionic halides with metals and covalent compounds with non-metals.</p>

<h3>4. Transition elements and noble gases</h3>
<p>Transition metals (iron, copper, zinc, silver, gold) are hard, dense, good conductors, often form coloured compounds and can show several oxidation states; they are also useful catalysts. Noble gases (Group VIII/0) have full outer shells, so they are unreactive and are used where inertness matters: argon in lamps, helium in balloons, neon in signs.</p>

<h3>Exam focus</h3>
<p><strong>Q:</strong> Explain why potassium is more reactive than sodium.</p>
<p><strong>A:</strong> Potassium's outer electron is in a shell further from the nucleus and is shielded by more inner shells, so it is lost more easily, making the reaction faster and more vigorous.</p>`,
  },
  {
    topic: "metals",
    title: "Metals",
    content: `<h2>Metals</h2>
<p><strong>Cambridge IGCSE 0620 (2023–2025):</strong> 9.1 properties of metals; 9.2 uses of metals; 9.3 alloys; 9.4 reactivity series; 9.5 corrosion; 9.6 extraction.</p>

<h3>1. Properties and uses</h3>
<p>Metals are malleable, ductile, good conductors of heat and electricity, and have high melting points (mercury is the exception). Uses follow from properties: copper for wiring and pipes, aluminium for aircraft because it is light and corrosion-resistant, iron for structures because it is strong and cheap, gold for contacts because it does not corrode.</p>

<h3>2. Alloys</h3>
<p>An alloy is a mixture of a metal with other elements. Different-sized atoms disrupt the layers, so the alloy is harder and stronger than the pure metal but less malleable. Steel is iron with carbon; stainless steel adds chromium and nickel for corrosion resistance; brass is copper and zinc; bronze is copper and tin.</p>

<h3>3. Reactivity series and displacement</h3>
<p>Potassium, sodium, calcium, magnesium, aluminium, (carbon), zinc, iron, (hydrogen), copper, silver, gold. A metal displaces any metal below it from a solution of its salt: iron + copper(II) sulfate gives copper + iron(II) sulfate. The series also decides extraction: metals above carbon are extracted by electrolysis, those below by reduction with carbon.</p>

<h3>4. Extraction, corrosion and recycling</h3>
<p>Iron is extracted in a blast furnace: coke burns to CO₂, CO₂ is reduced to CO, and CO reduces the iron ore (Fe₂O₃ + 3CO → 2Fe + 3CO₂); limestone removes the sandy impurities as slag. Aluminium is extracted by electrolysis of alumina dissolved in molten cryolite, which is expensive in electricity, so recycling aluminium saves about 95% of the energy.</p>
<p>Corrosion of iron needs oxygen and water; galvanising, painting and sacrificial protection prevent it. Recycling also conserves ore and reduces landfill.</p>

<h3>Exam focus</h3>
<p><strong>Q:</strong> Explain why aluminium is extracted by electrolysis rather than by reduction with carbon.</p>
<p><strong>A:</strong> Aluminium is more reactive than carbon, so carbon cannot displace it from its oxide; electrolysis of the molten oxide can supply enough energy to break the very strong bonds.</p>`,
  },
  {
    topic: "chemistry-of-the-environment",
    title: "Chemistry of the Environment",
    content: `<h2>Chemistry of the Environment</h2>
<p><strong>Cambridge IGCSE 0620 (2023–2025):</strong> 10.1 water; 10.2 fertilisers; 10.3 air quality and climate.</p>

<h3>1. Water and its treatment</h3>
<p>Water is tested with anhydrous copper(II) sulfate, which turns from white to blue, and with cobalt(II) chloride paper, which turns from blue to pink. Natural water is treated by filtration to remove solids and chlorination to kill bacteria; in the lab, distilled water is made by boiling and condensing, which removes dissolved ions.</p>

<h3>2. Fertilisers</h3>
<p>Plants need nitrogen, phosphorus and potassium. Ammonium salts, nitrates and phosphates are applied as fertilisers; the ammonium ion is made industrially by the Haber process and converted to ammonium sulfate or ammonium nitrate. Over-application is an environmental problem: rain washes nitrates into rivers, causing eutrophication, where algae bloom, die, and their decay removes oxygen from the water.</p>

<h3>3. Air, pollution and climate</h3>
<table border="1" cellpadding="6"><tr><th>Pollutant</th><th>Source</th><th>Effect</th></tr>
<tr><td>carbon dioxide</td><td>combustion of fossil fuels</td><td>enhanced greenhouse effect</td></tr>
<tr><td>carbon monoxide</td><td>incomplete combustion</td><td>toxic, binds haemoglobin</td></tr>
<tr><td>sulfur dioxide</td><td>burning sulfur-containing fuels</td><td>acid rain</td></tr>
<tr><td>oxides of nitrogen</td><td>high-temperature engines</td><td>acid rain, photochemical smog</td></tr></table>
<p>Acid rain damages buildings (carbonates dissolve) and lakes. Clean-up measures include catalytic converters, flue-gas desulfurisation with calcium oxide, and using renewable energy. The greenhouse effect itself is natural; the enhanced effect comes from extra CO₂ and methane trapping more outgoing infrared radiation.</p>

<h3>Exam focus</h3>
<p><strong>Q:</strong> Explain how sulfur dioxide causes acid rain and give one effect.</p>
<p><strong>A:</strong> Sulfur dioxide from burning fossil fuels is oxidised in the air to sulfur trioxide, which dissolves in rain to form sulfuric acid; the acidic rain corrodes limestone buildings and lowers the pH of lakes.</p>`,
  },
  {
    topic: "organic-chemistry",
    title: "Organic Chemistry",
    content: `<h2>Organic Chemistry</h2>
<p><strong>Cambridge IGCSE 0620 (2023–2025):</strong> 11.1 formulae; 11.2 fuels; 11.3 alkanes; 11.4 alkenes; 11.5 alcohols; 11.6 carboxylic acids; 11.7 polymers.</p>

<h3>1. The families and their general formulae</h3>
<table border="1" cellpadding="6"><tr><th>Family</th><th>General formula</th><th>Bonding</th><th>Example</th></tr>
<tr><td>alkane</td><td>CₙH₂ₙ₊₂</td><td>single bonds, saturated</td><td>methane CH₄</td></tr>
<tr><td>alkene</td><td>CₙH₂ₙ</td><td>C=C double bond, unsaturated</td><td>ethene C₂H₄</td></tr>
<tr><td>alcohol</td><td>CₙH₂ₙ₊₁OH</td><td>—OH group</td><td>ethanol C₂H₅OH</td></tr>
<tr><td>carboxylic acid</td><td>CₙH₂ₙ₊₁COOH</td><td>—COOH group</td><td>ethanoic acid CH₃COOH</td></tr></table>
<p>Displayed and structural formulae must show every bond; the empirical formula is the simplest ratio and the molecular formula the actual count.</p>

<h3>2. Alkanes and fuels</h3>
<p>Alkanes are unreactive except for combustion and substitution with halogens in ultraviolet light. Fractions of crude oil are separated by fractional distillation, and larger molecules are cracked into smaller, more useful ones. Complete combustion gives CO₂ and H₂O; incomplete gives CO and soot.</p>

<h3>3. Alkenes and addition reactions</h3>
<p>The C=C bond is the reactive site. Bromine water is decolourised, which is the test that tells an alkene from an alkane. Ethene reacts by addition with hydrogen (to ethane), steam (to ethanol) and bromine (to dibromoethane). Ethanol is also made by fermentation of glucose from sugar with yeast.</p>

<h3>4. Oxidation, esters and polymers</h3>
<p>Ethanol is oxidised to ethanoic acid by acidified potassium dichromate(VI), which turns from orange to green. Carboxylic acids react with alcohols to give esters, which smell fruity. Addition polymerisation joins alkene monomers (poly(ethene) from ethene); condensation polymerisation joins monomers with loss of water (nylon, PET).</p>

<h3>Exam focus</h3>
<p><strong>Q:</strong> Describe the test that distinguishes ethene from methane and state the result.</p>
<p><strong>A:</strong> Add bromine water and shake; ethene decolourises it by addition across the double bond, while methane leaves the orange colour unchanged.</p>`,
  },
  {
    topic: "experimental-techniques-and-chemical-analysis",
    title: "Experimental Techniques and Chemical Analysis",
    content: `<h2>Experimental Techniques and Chemical Analysis</h2>
<p><strong>Cambridge IGCSE 0620 (2023–2025):</strong> 12.1 apparatus; 12.2 purity; 12.3 separation techniques; 12.4 identification of ions and gases; 12.5 chromatography.</p>

<h3>1. Choosing apparatus</h3>
<p>A measuring cylinder is quick but imprecise (about ±1 cm³); a burette reads to 0.05 cm³ and a pipette delivers a fixed accurate volume; a volumetric flask makes a standard solution. Read at eye level, at the bottom of the meniscus, to avoid parallax error.</p>

<h3>2. Purity and melting point</h3>
<p>A pure substance melts and boils at a single sharp temperature; an impure one melts over a range and at a lower temperature than the pure substance. That is the standard test for purity, and it is why a melting-point apparatus is used rather than appearance.</p>

<h3>3. Separation methods</h3>
<ul>
<li>filtration — insoluble solid from a liquid;</li>
<li>evaporation or crystallisation — soluble salt from its solution;</li>
<li>simple distillation — solvent from a solution, or a liquid from a less volatile solute;</li>
<li>fractional distillation — liquids with different boiling points, as in crude oil;</li>
<li>separating funnel — immiscible liquids;</li>
<li>chromatography — separating and identifying dissolved dyes.</li>
</ul>

<h3>4. Tests for ions and gases</h3>
<p>Flame tests: lithium crimson, sodium yellow, potassium lilac, calcium orange-red, copper blue-green. Cations with sodium hydroxide: a white precipitate insoluble in excess suggests aluminium or calcium; a blue precipitate is copper(II); a green precipitate is iron(II); a red-brown precipitate is iron(III). Anions: carbonate effervesces with acid; sulfate gives a white precipitate with barium chloride and hydrochloric acid; chloride gives a white precipitate with silver nitrate that dissolves in ammonia.</p>
<p>Gases: oxygen relights a glowing splint, hydrogen gives a squeaky pop, carbon dioxide turns limewater milky, chlorine bleaches damp litmus, ammonia turns damp red litmus blue.</p>

<h3>Exam focus</h3>
<p><strong>Q:</strong> A solution gives a green precipitate with sodium hydroxide and effervesces with dilute acid. Identify the metal ion and name a possible anion.</p>
<p><strong>A:</strong> The metal ion is iron(II), Fe²⁺. The effervescence suggests carbonate, CO₃²⁻.</p>`,
  },
];
