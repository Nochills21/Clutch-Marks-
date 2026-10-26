// Cambridge IGCSE Chemistry 0620 — Extended route (A*–C).
// Twelve topics, syllabus-referenced, with an A* extension in each note.
// Statements follow the 2026–2028 syllabus numbering (1.1–12.5).
// No backticks anywhere in the HTML (these strings are template literals).
module.exports = [
  {
    slug: "states-of-matter",
    name: "States of Matter",
    content: `<h2>States of Matter</h2>
<p>Cambridge IGCSE Chemistry 0620, Extended route, topic 1 (statements 1.1–1.2). Everything a top-grade answer needs on solids, liquids and gases, kinetic theory, heating and cooling curves, and diffusion — plus the reasoning examiners reserve the last marks for.</p>
<h3>1.1 Solids, liquids and gases</h3>
<ul>
<li>Solids: particles packed in a regular lattice, touching, vibrating about fixed positions. Liquids: close together but randomly arranged, moving past each other. Gases: far apart, random rapid motion, mostly empty space.</li>
<li>Melting and boiling are endothermic; freezing and condensing are exothermic. During a change of state the temperature stays constant while the energy is used to overcome the forces between particles — this is why heating curves have flat sections.</li>
<li>Heating a gas: its particles gain kinetic energy and move faster. Cooling it: they lose kinetic energy. Increasing the pressure of a fixed mass of gas at constant temperature pushes the particles closer together, so the volume decreases.</li>
</ul>
<h3>1.2 Diffusion</h3>
<ul>
<li>Diffusion is the net movement of particles from a region of higher concentration to a region of lower concentration, down a concentration gradient, due to random motion. It happens in gases and in liquids, and is faster at higher temperatures.</li>
<li>A light gas diffuses faster than a heavy one at the same temperature, because the average speed of the particles is higher for the lower relative molecular mass (Mr). So ammonia (Mr 17) diffuses faster than hydrogen chloride (Mr 36.5).</li>
</ul>
<h3>A* extension: worked reasoning and calculations</h3>
<ul>
<li>Heating curve reasoning, applied to a solid being heated to a gas: the two flat sections are melting and boiling. Say that energy is being used to overcome the forces of attraction between particles, NOT that bonds in the particles are breaking — the particles themselves are unchanged in a physical change.</li>
<li>Diffusion calculation, applied to a cotton wool plug experiment: two plugs are soaked in concentrated ammonia and concentrated hydrochloric acid at opposite ends of a tube. NH₃ (Mr 17) travels faster than HCl (Mr 36.5), so the white ring of NH₄Cl forms closer to the HCl end. The ratio of distances travelled equals the ratio of speeds, which is roughly the inverse ratio of the square roots of Mr: √36.5 ÷ √17 = 6.04 ÷ 4.12 = 1.47, so the ring is about 1.47 times further from the ammonia end.</li>
<li>Explain-type mark scheme: when asked why gases mix, the three marks are random particle motion, particles moving down a concentration gradient, and the system becoming more spread out. Give all three.</li>
</ul>
<h3>Common errors</h3>
<ul>
<li>Saying gas particles expand when heated — the particles gain speed, the spaces between them grow.</li>
<li>Attributing the flat part of a heating curve to bonds inside molecules breaking. In 0620 it is the forces between particles being overcome.</li>
<li>Claiming diffusion needs stirring. It does not — random motion does the work.</li>
</ul>`,
  },
  {
    slug: "atoms-elements-and-compounds",
    name: "Atoms, Elements and Compounds",
    content: `<h2>Atoms, Elements and Compounds</h2>
<p>Cambridge IGCSE Chemistry 0620, Extended route, topic 2 (statements 2.1–2.7). Atomic structure, isotopes, ionic and covalent bonding, giant covalent and metallic structures, with the structure-to-property reasoning top grades are built on.</p>
<h3>2.2 Atomic structure and the Periodic Table</h3>
<ul>
<li>Protons: charge +1, relative mass 1. Neutrons: charge 0, mass 1. Electrons: charge −1, negligible mass. Atoms are neutral because the numbers of protons and electrons are equal; ions form when electrons are lost or gained.</li>
<li>Proton (atomic) number counts protons; mass (nucleon) number counts protons plus neutrons. Neutrons = mass number − proton number.</li>
<li>Electron arrangement for proton numbers 1–20: shells fill in order 2, 8, 8, 2. Sodium (11): 2,8,1. Calcium (20): 2,8,8,2. The outer-shell electron count gives the group number; the number of occupied shells gives the period number.</li>
</ul>
<h3>2.3 Isotopes</h3>
<ul>
<li>Isotopes are atoms of the same element (same proton number) with different numbers of neutrons. They have identical chemical properties because chemistry depends on the electron arrangement, which is unchanged.</li>
</ul>
<h3>2.4 to 2.7 Bonding and structure</h3>
<ul>
<li>Ionic bonding: metal atoms lose electrons, non-metal atoms gain them, and the strong electrostatic attraction between the oppositely charged ions is the bond. Sodium chloride forms a giant lattice with 6:6 coordination; it conducts only when molten or dissolved.</li>
<li>Covalent bonding: a shared pair of electrons attracted to two nuclei. Simple molecules (H₂, H₂O, CH₄, NH₃, CO₂, N₂) have weak forces between molecules, so low melting and boiling points, and no conductivity.</li>
<li>Giant covalent: diamond has each carbon bonded to four others in a tetrahedral lattice — very hard, very high melting point, no conduction. Graphite has layers of hexagonal rings with one delocalised electron per carbon — conducts, soft, used as lubricant and electrodes. Silicon(IV) oxide has the same giant structure as diamond but with Si and O alternating.</li>
<li>Metallic bonding: a giant lattice of positive metal ions in a sea of delocalised electrons. Metals conduct (delocalised electrons carry charge), are malleable (layers slide, the electrons keep the attraction), and have high melting points.</li>
</ul>
<h3>A* extension: worked reasoning and calculations</h3>
<ul>
<li>Relative atomic mass, applied to lithium: 90% ⁷Li and 10% ⁶Li gives Ar = (7 × 90 + 6 × 10) ÷ 100 = 6.9. Show the abundances as percentages in the formula and give the answer to one decimal place.</li>
<li>Dot-and-cross reasoning, applied to magnesium oxide: Mg (2,8,2) loses two electrons, O (2,8,6) gains two, giving Mg²⁺ and O²⁻ with full outer shells and a 1:1 ratio. The formula is MgO, not Mg₂O₂ — the simplest ratio is written.</li>
<li>Property explanations, applied to why graphite conducts but diamond does not: each carbon in graphite forms three bonds, leaving one delocalised electron that is free to move between layers. In diamond all four outer electrons are used in bonds, so no electrons are free. Name the delocalised electron — it is what earns the mark.</li>
<li>Structure comparison, applied to silicon(IV) oxide versus silicon(IV) chloride: SiO₂ is giant covalent with very high melting point; SiCl₄ is simple molecular with a low melting point. The difference is structure, not the elements involved.</li>
</ul>
<h3>Common errors</h3>
<ul>
<li>Calling the attraction in NaCl a bond between one Na and one Cl. It is a lattice-wide electrostatic attraction.</li>
<li>Forgetting to put the charge outside square brackets in dot-and-cross diagrams.</li>
<li>Saying graphite conducts because it is a metal. It conducts because of its delocalised electrons.</li>
</ul>`,
  },
  {
    slug: "stoichiometry",
    name: "Stoichiometry",
    content: `<h2>Stoichiometry</h2>
<p>Cambridge IGCSE Chemistry 0620, Extended route, topic 3 (statements 3.1–3.3). Formulae, equations, the mole, reacting masses, gas volumes, concentration and titration calculations — the highest-weight calculation topic on the paper.</p>
<h3>3.1 to 3.2 Formulae and masses</h3>
<ul>
<li>An empirical formula is the simplest whole-number ratio of atoms; a molecular formula is the actual number of each atom. Mr of a substance is the sum of the Ar values in its formula.</li>
<li>Equations must be balanced and carry state symbols: (s), (l), (g), (aq). Conservation of mass means the number of atoms of each element is the same on both sides.</li>
</ul>
<h3>3.3 The mole</h3>
<ul>
<li>One mole of any substance contains 6.02 × 10²³ particles (the Avogadro constant). Moles = mass ÷ Mr. At room temperature and pressure, one mole of any gas occupies 24 dm³.</li>
<li>Concentration can be given in g/dm³ or mol/dm³. Moles in solution = concentration (mol/dm³) × volume (dm³), with cm³ ÷ 1000 = dm³.</li>
<li>Titration data gives moles of one reagent; the balanced equation gives the ratio; the other reagent's moles and concentration follow. Percentage yield = actual ÷ theoretical × 100.</li>
</ul>
<h3>A* extension: worked reasoning and calculations</h3>
<ul>
<li>Reacting masses, applied to 12 g of magnesium burning in oxygen: moles of Mg = 12 ÷ 24 = 0.5 mol. From 2Mg + O₂ → 2MgO, 0.5 mol Mg gives 0.5 mol MgO, so mass = 0.5 × 40 = 20 g. Oxygen used = 20 − 12 = 8 g. Always convert to moles first, then use the ratio.</li>
<li>Gas volume, applied to 5.6 g of calcium carbonate decomposing: CaCO₃ → CaO + CO₂. Moles of CaCO₃ = 5.6 ÷ 100 = 0.056 mol, so 0.056 mol CO₂ forms. Volume = 0.056 × 24 = 1.34 dm³ (1340 cm³, to 3 significant figures).</li>
<li>Titration chain, applied to 25.0 cm³ of 0.100 mol/dm³ NaOH needing 22.0 cm³ of HCl: NaOH + HCl → NaCl + H₂O, ratio 1:1. Moles NaOH = 0.100 × 0.0250 = 2.50 × 10⁻³, so moles HCl = 2.50 × 10⁻³, and concentration HCl = 2.50 × 10⁻³ ÷ 0.0220 = 0.114 mol/dm³. Convert cm³ to dm³ before multiplying — that is where most marks are lost.</li>
<li>Empirical formula, applied to a compound with 40.0% carbon, 6.7% hydrogen and 53.3% oxygen by mass: divide by Ar to get 3.33 mol C, 6.67 mol H, 3.33 mol O; divide by the smallest (3.33) to get CH₂O. To find the molecular formula, divide Mr by the empirical formula mass: 180 ÷ 30 = 6, so C₆H₁₂O₆.</li>
</ul>
<h3>Common errors</h3>
<ul>
<li>Using cm³ directly with mol/dm³ without dividing by 1000.</li>
<li>Using 22.4 dm³ (that is at standard temperature and pressure, not room temperature and pressure). IGCSE 0620 uses 24 dm³ at r.t.p.</li>
<li>Writing an ionic formula that is not the simplest ratio, or leaving a 1:1 ratio as Mg₂O₂.</li>
</ul>`,
  },
  {
    slug: "electrochemistry",
    name: "Electrochemistry",
    content: `<h2>Electrochemistry</h2>
<p>Cambridge IGCSE Chemistry 0620, Extended route, topic 4 (statements 4.1–4.2). Electrolysis of molten and aqueous electrolytes, electrode products, half-equations, electroplating and fuel cells.</p>
<h3>4.1 Electrolysis</h3>
<ul>
<li>Electrolysis is the breakdown of an ionic compound, when molten or in aqueous solution, by the passage of electricity. Cations (positive ions) move to the cathode (negative electrode) and are reduced; anions (negative ions) move to the anode (positive electrode) and are oxidised.</li>
<li>Molten lead(II) bromide: Pb²⁺ → Pb at the cathode (grey lead forms), 2Br⁻ → Br₂ at the anode (brown bromine vapour). Only the ions of the compound are present, so the products are unambiguous.</li>
<li>Concentrated aqueous sodium chloride: hydrogen at the cathode, chlorine at the anode, sodium hydroxide left in solution. Dilute sulfuric acid: hydrogen at the cathode, oxygen at the anode (water is preferentially discharged over the sulfate ion).</li>
<li>Aqueous copper(II) sulfate with inert electrodes: copper at the cathode, oxygen at the anode. With copper electrodes the anode dissolves instead, so the concentration stays constant — this is electroplating and industrial copper refining.</li>
<li>Half-equations (Extended): 2H⁺ + 2e⁻ → H₂; 4OH⁻ → O₂ + 2H₂O + 4e⁻; Cu²⁺ + 2e⁻ → Cu. Include electrons on the correct side and balance charge as well as atoms.</li>
</ul>
<h3>4.2 Hydrogen–oxygen fuel cells</h3>
<ul>
<li>A hydrogen–oxygen fuel cell uses hydrogen and oxygen to produce electricity, with water as the only product. Advantages: no carbon dioxide at the point of use, high efficiency. Disadvantages: hydrogen is hard to store and transport, and producing it may itself burn fossil fuels.</li>
</ul>
<h3>A* extension: worked reasoning and calculations</h3>
<ul>
<li>Product prediction, applied to molten aluminium oxide: Al³⁺ → Al at the cathode, O²⁻ → O₂ at the anode. The Extended rule is that in aqueous solutions the hydrogen ion discharges in preference to a metal low in the reactivity series, and the hydroxide ion in preference to most anions. State the rule you are applying.</li>
<li>Electroplating, applied to plating a key with silver: the key is the cathode (it must be negative so Ag⁺ ions deposit on it), the silver object is the anode (it dissolves to replace the Ag⁺ used up), and the electrolyte is a soluble silver salt such as silver nitrate. Name all three — a three-mark question.</li>
<li>Mass deposited calculation, applied to a current plating with copper for a given time: moles of copper = mass ÷ 64. From Cu²⁺ + 2e⁻ → Cu, two moles of electrons are needed per mole of copper. The reasoning marks come from linking the mass to the half-equation, not from the arithmetic alone.</li>
</ul>
<h3>Common errors</h3>
<ul>
<li>Swapping anode and cathode. The anode is positive and oxidation happens there; the cathode is negative and reduction happens there.</li>
<li>Writing half-equations with unbalanced charge.</li>
<li>Saying the anode "loses mass" for inert electrodes in dilute sulfuric acid — it is the water that is oxidised, and oxygen gas forms.</li>
</ul>`,
  },
  {
    slug: "chemical-energetics",
    name: "Chemical Energetics",
    content: `<h2>Chemical Energetics</h2>
<p>Cambridge IGCSE Chemistry 0620, Extended route, topic 5 (statement 5.1). Energy changes, exothermic and endothermic reactions, reaction pathway diagrams, activation energy and bond energy calculations.</p>
<h3>5.1 Exothermic and endothermic reactions</h3>
<ul>
<li>Exothermic reactions release energy to the surroundings; the temperature of the surroundings rises. Combustion and neutralisation are exothermic. Endothermic reactions take in energy; the temperature falls. Thermal decomposition and photosynthesis are endothermic.</li>
<li>Enthalpy change, ΔH, is the energy change for a reaction. Exothermic: ΔH is negative. Endothermic: ΔH is positive.</li>
<li>Bond breaking is endothermic (energy is put in); bond making is exothermic (energy is released).</li>
<li>A reaction pathway (energy profile) diagram plots energy against progress: the reactants sit at one level, the products at another, and the difference is ΔH. The hump between them is the activation energy, Ea.</li>
</ul>
<h3>A* extension: worked reasoning and calculations</h3>
<ul>
<li>Bond energy calculation, applied to H₂ + Cl₂ → 2HCl: bonds broken are H–H (436 kJ/mol) and Cl–Cl (242 kJ/mol), total in = 678 kJ/mol. Bonds made are two H–Cl bonds (431 kJ/mol each), total out = 862 kJ/mol. ΔH = 678 − 862 = −184 kJ/mol. The reaction is exothermic, and the negative sign must be written.</li>
<li>Sign convention, applied to an endothermic decomposition: energy in is greater than energy out, so ΔH is positive. When the question asks "is the reaction exothermic or endothermic?", the sign of ΔH is your evidence — quote it.</li>
<li>Activation energy reasoning, applied to why a catalyst does not change ΔH: a catalyst provides an alternative pathway with a lower activation energy, so more collisions are successful and the rate rises. The energy of reactants and products is unchanged, so ΔH is the same. State both halves of that argument.</li>
<li>Experimental enthalpy change, applied to an acid–alkali neutralisation measured in a polystyrene cup: q = mcΔT, with m the mass of the solution (use the volumes added, 1 cm³ ≈ 1 g), c = 4.2 J/g°C. If 50.0 cm³ rises by 6.8 °C, q = 50.0 × 4.2 × 6.8 = 1428 J. Divide by the moles of water formed to get ΔH per mole; the sign is negative because the solution warmed.</li>
</ul>
<h3>Common errors</h3>
<ul>
<li>Getting the ΔH sign backwards — energy out means negative.</li>
<li>Adding bond energies that are broken and made together instead of subtracting.</li>
<li>Calling the activation energy "the energy of the reaction". It is the minimum energy needed to start the reaction.</li>
</ul>`,
  },
  {
    slug: "chemical-reactions",
    name: "Chemical Reactions",
    content: `<h2>Chemical Reactions</h2>
<p>Cambridge IGCSE Chemistry 0620, Extended route, topic 6 (statements 6.1–6.4). Rates of reaction and collision theory, reversible reactions and equilibrium (including the Haber and Contact processes), and redox.</p>
<h3>6.2 Rate of reaction</h3>
<ul>
<li>Rates rise with concentration, gas pressure, the surface area of a solid, temperature, and the presence of a catalyst (including enzymes). Measure a rate by mass loss (gas escaping) or gas volume collected against time.</li>
<li>Collision theory: reactions happen when particles collide with at least the activation energy and in the correct orientation. Increasing concentration or pressure increases the collision frequency; increasing surface area exposes more particles; a higher temperature gives particles more energy, so a greater proportion of collisions exceed Ea; a catalyst lowers the Ea itself.</li>
</ul>
<h3>6.3 Reversible reactions and equilibrium</h3>
<ul>
<li>In a closed system at equilibrium, the forward and reverse reactions continue at equal rates and concentrations stay constant. Changing temperature, pressure or concentration shifts the position of equilibrium to oppose the change.</li>
<li>Haber process: N₂ + 3H₂ ⇌ 2NH₃, ΔH negative. About 450 °C with an iron catalyst and around 200 atm — a compromise of yield, rate and cost.</li>
<li>Contact process: 2SO₂ + O₂ ⇌ 2SO₃, ΔH negative, about 450 °C with a vanadium(V) oxide catalyst.</li>
</ul>
<h3>6.4 Redox</h3>
<ul>
<li>Oxidation is loss of electrons, reduction is gain. In terms of oxygen: oxidation is gain of oxygen, reduction is loss of hydrogen. Oxidation numbers use Roman numerals: copper(II) oxide has copper at +2.</li>
<li>Acidified potassium manganate(VII) is purple and turns colourless as it oxidises; potassium iodide is colourless and turns brown (iodine) as it reduces.</li>
</ul>
<h3>A* extension: worked reasoning and calculations</h3>
<ul>
<li>Rate graph interpretation, applied to two curves from the same reaction at 20 °C and 40 °C: the 40 °C curve is steeper from the start and levels off at the same total gas volume, because temperature changes the rate but not the amount of product. Compare gradients for rate and final heights for yield.</li>
<li>Equilibrium application, applied to the Haber process at higher pressure: four gas molecules of reactants become two of product, so higher pressure shifts the equilibrium to the right and raises yield. Explain with collision frequency and the opposing change, not just "more product".</li>
<li>Redox identification, applied to a reaction where carbon reduces copper(II) oxide: copper's oxidation number falls from +2 to 0 (reduction), carbon's rises from 0 to +2 in CO (oxidation). Name both changes — one mark each.</li>
<li>Catalyst reasoning: a catalyst lowers the activation energy for BOTH the forward and reverse reactions, so equilibrium is reached faster but the position does not change. That distinction earns the top mark.</li>
</ul>
<h3>Common errors</h3>
<ul>
<li>Saying a catalyst increases yield. It only increases speed.</li>
<li>Using concentration as the only factor that changes equilibrium — temperature also changes the value of the equilibrium constant.</li>
<li>Confusing oxidation numbers with ionic charges. In CuO the copper ion is 2+, and its oxidation number is written +2.</li>
</ul>`,
  },
  {
    slug: "acids-bases-and-salts",
    name: "Acids, Bases and Salts",
    content: `<h2>Acids, Bases and Salts</h2>
<p>Cambridge IGCSE Chemistry 0620, Extended route, topic 7 (statements 7.1–7.3). Acid and base properties, strong versus weak acids, oxide classification, and the preparation of soluble and insoluble salts with full practical detail.</p>
<h3>7.1 Acids and bases</h3>
<ul>
<li>An acid is a proton (H⁺) donor; a base is a proton acceptor. An alkali is a soluble base. Neutralisation is H⁺ + OH⁻ → H₂O.</li>
<li>Acid reactions: with metals to give a salt and hydrogen; with bases to give a salt and water; with carbonates to give a salt, water and carbon dioxide.</li>
<li>Strong acids (hydrochloric, sulfuric, nitric) are fully dissociated in water; weak acids (ethanoic, carbonic) are only partly dissociated. Both can be dilute or concentrated — strength and concentration are different ideas.</li>
</ul>
<h3>7.2 Oxides</h3>
<ul>
<li>Basic oxides are metal oxides such as CuO; acidic oxides are non-metal oxides such as SO₂; amphoteric oxides react with both acids and bases — Al₂O₃ and ZnO are the syllabus examples.</li>
</ul>
<h3>7.3 Preparation of salts</h3>
<ul>
<li>Soluble salts by titration: dissolve the acid, use a pipette and burette with an indicator, add alkali until neutralised, then evaporate to crystallise.</li>
<li>Soluble salts from an excess insoluble reactant: add excess metal or insoluble base or carbonate to the acid, filter off the excess, evaporate the filtrate.</li>
<li>Insoluble salts by precipitation: mix two solutions whose ions combine to form an insoluble salt; filter, wash and dry. Silver chloride and barium sulfate are the standard examples.</li>
<li>Hydrated salts contain water of crystallisation (CuSO₄·5H₂O); heating drives it off to give the anhydrous salt, which turns blue again with water.</li>
</ul>
<h3>A* extension: worked reasoning and calculations</h3>
<ul>
<li>Method choice, applied to making pure copper sulfate crystals from copper oxide and dilute sulfuric acid: copper oxide is insoluble, so add it in excess to the acid, filter, then crystallise. You cannot titrate here — there is no soluble base to measure. Justify the choice of method in one sentence; that justification is the mark.</li>
<li>Purity reasoning, applied to crystals dried too quickly: crystals coated with impure surface moisture give a melting point below the pure value and a broad range. A pure substance melts sharply at a single temperature — quote the sharp range as the evidence.</li>
<li>Strong versus weak, applied to equal concentrations of hydrochloric and ethanoic acid: hydrochloric acid has a lower pH and a greater temperature rise when reacting with the same mass of magnesium, because it is fully dissociated and supplies more H⁺ per mole. Name dissociation as the reason.</li>
</ul>
<h3>Common errors</h3>
<ul>
<li>Confusing strong (fully dissociated) with concentrated (lots of solute per dm³).</li>
<li>Forgetting to filter off the excess solid when preparing a salt from an insoluble reactant.</li>
<li>Choosing titration for a preparation where one reactant is insoluble.</li>
</ul>`,
  },
  {
    slug: "the-periodic-table",
    name: "The Periodic Table",
    content: `<h2>The Periodic Table</h2>
<p>Cambridge IGCSE Chemistry 0620, Extended route, topic 8 (statements 8.1–8.5). Periodic trends, Group I and Group VII properties and displacement reactions, transition elements, and the noble gases.</p>
<h3>8.1 Arrangement</h3>
<ul>
<li>Elements are arranged in order of increasing proton number, in periods (rows) and groups (columns). Metallic character decreases across a period from left to right and increases down a group.</li>
</ul>
<h3>8.2 Group I</h3>
<ul>
<li>Alkali metals: soft, low density, low melting point. Reactivity increases down the group because the outer electron is further from the nucleus and more shielded, so it is lost more easily. Products with water: a metal hydroxide and hydrogen.</li>
</ul>
<h3>8.3 Group VII</h3>
<ul>
<li>Halogens: reactivity decreases down the group because the outer shell is further from the nucleus, so an atom gains an electron less easily. Denser and darker down the group: fluorine pale yellow gas, chlorine green-yellow gas, bromine red-brown liquid, iodine grey solid.</li>
</ul>
<h3>8.4 to 8.5 Transition elements and noble gases</h3>
<ul>
<li>Transition elements: high density, high melting point, form coloured compounds, act as catalysts, and show variable oxidation states (iron(II) and iron(III) are the syllabus examples).</li>
<li>Noble gases: full outer shells, so they are monatomic and unreactive.</li>
</ul>
<h3>A* extension: worked reasoning and calculations</h3>
<ul>
<li>Displacement reasoning, applied to chlorine added to potassium bromide: Cl₂ + 2KBr → 2KCl + Br₂. Chlorine is more reactive than bromine, so it displaces the bromide ions. The chlorine is reduced (0 to −1) and the bromide is oxidised (−1 to 0). Name both half-changes for full marks.</li>
<li>Prediction, applied to astatine: it sits below iodine, so it is a solid, less reactive than iodine, and would be displaced from its salts by chlorine, bromine and iodine. Predictions must be justified from the group trend, not asserted.</li>
<li>Trend explanation, applied to why potassium reacts more violently with water than lithium: the outer electron in potassium is in shell 4 versus shell 2 in lithium, so it is further from the nucleus and more shielded by inner shells, so it is lost more easily. Use the words shielding and nuclear attraction.</li>
</ul>
<h3>Common errors</h3>
<ul>
<li>Saying reactivity of Group VII increases down the group. It decreases.</li>
<li>Explaining Group I trends by "atoms get bigger" without the electron-loss link.</li>
<li>Calling transition metal catalysts "changing the product". They change the rate, not the products.</li>
</ul>`,
  },
  {
    slug: "metals",
    name: "Metals",
    content: `<h2>Metals</h2>
<p>Cambridge IGCSE Chemistry 0620, Extended route, topic 9 (statements 9.1–9.6). Metal properties and uses, alloys, the reactivity series, rusting and its prevention, and extraction of metals including the blast furnace and electrolysis of aluminium ore.</p>
<h3>9.1 to 9.4 Properties, uses, alloys and reactivity</h3>
<ul>
<li>Metals are good conductors, malleable, ductile, lustrous and usually solid with high melting points. Aluminium: low density and a protective oxide layer, so it is used in aircraft and drink cans. Copper: excellent conductivity and ductility, so it is used in wiring.</li>
<li>An alloy is a mixture of a metal with other elements. Brass (copper and zinc) and stainless steel (iron, chromium, nickel) are the syllabus examples. Different-sized atoms disrupt the regular layers, so the layers cannot slide — the alloy is harder than the pure metal.</li>
<li>Reactivity series: potassium, sodium, calcium, magnesium, zinc, iron, (hydrogen), copper, silver, gold. More reactive metals react more vigorously with water or steam and dilute acids, and displace less reactive metals from their compounds.</li>
</ul>
<h3>9.5 Corrosion</h3>
<ul>
<li>Rusting needs both oxygen and water. Barriers (paint, grease, plastic) exclude them. Galvanising coats iron with zinc; sacrificial protection uses a more reactive metal such as zinc or magnesium that corrodes instead of the iron.</li>
</ul>
<h3>9.6 Extraction of metals</h3>
<ul>
<li>Iron: in the blast furnace, carbon monoxide (from coke and hot air) reduces iron(III) oxide: Fe₂O₃ + 3CO → 2Fe + 3CO₂. Limestone removes sandy impurities as slag.</li>
<li>Aluminium: extracted by electrolysis of molten aluminium oxide in cryolite, which lowers the melting point and saves energy. The carbon anodes burn away and must be replaced, and oxygen at the anode reacts with the carbon.</li>
</ul>
<h3>A* extension: worked reasoning and calculations</h3>
<ul>
<li>Extraction choice, applied to a metal found as the pure element in the ground: gold is extracted by physical methods because it is below hydrogen and does not react with acids or oxygen. Zinc and iron need chemical reduction; aluminium needs electrolysis because it is more reactive than carbon. Link the method to the position in the reactivity series in one sentence.</li>
<li>Reactivity deduction, applied to experimental results where metal X displaces metal Y from its salt: X is more reactive than Y. If metal Y does not react with dilute acid but X does, X is above hydrogen and Y below it. Build the order from the evidence, then justify each step.</li>
<li>Blast furnace chemistry, applied to the role of coke: coke burns in a blast of hot air to make carbon dioxide (exothermic, providing heat), then carbon dioxide reacts with more coke to make carbon monoxide, the actual reducing agent. Distinguish the two roles — heat provider and reducing agent.</li>
<li>Rusting protection reasoning, applied to an iron pipe under a ship: a block of magnesium attached to it corrodes instead, because magnesium is more reactive than iron and loses electrons in preference. That is sacrificial protection; name the electron transfer.</li>
</ul>
<h3>Common errors</h3>
<ul>
<li>Saying alloys are harder because "they are stronger". The mark is for disrupted layers that cannot slide.</li>
<li>Claiming the carbon anode in aluminium extraction is inert. It burns away.</li>
<li>Confusing galvanising (a coating) with sacrificial protection (a more reactive metal doing the corroding).</li>
</ul>`,
  },
  {
    slug: "chemistry-of-the-environment",
    name: "Chemistry of the Environment",
    content: `<h2>Chemistry of the Environment</h2>
<p>Cambridge IGCSE Chemistry 0620, Extended route, topic 10 (statements 10.1–10.3). Water testing and treatment, fertilisers, air pollution, greenhouse gases and photosynthesis.</p>
<h3>10.1 Water</h3>
<ul>
<li>Test for water: anhydrous copper(II) sulfate turns from white to blue, or anhydrous cobalt(II) chloride paper turns from blue to pink. Purity is tested by melting point (0 °C) and boiling point (100 °C) — impurities shift both, depression of melting point and elevation of boiling point.</li>
</ul>
<h3>10.2 Fertilisers</h3>
<ul>
<li>Ammonium salts and nitrates are used as fertilisers. NPK fertilisers supply nitrogen (for protein), phosphorus (for roots) and potassium (for flowers and fruit).</li>
</ul>
<h3>10.3 Air quality and climate</h3>
<ul>
<li>Clean dry air is about 78% nitrogen, 21% oxygen, with noble gases and about 0.04% carbon dioxide. Pollutants include carbon monoxide (incomplete combustion, toxic), sulfur dioxide (sulfur impurities in fossil fuels, causes acid rain), oxides of nitrogen (from vehicle engines, cause acid rain and photochemical smog), and particulates.</li>
<li>Acid rain damages forests, buildings and lakes. Removal methods include flue gas desulfurisation with calcium oxide or calcium carbonate, and catalytic converters in cars that reduce oxides of nitrogen to nitrogen and oxygen.</li>
<li>Greenhouse gases such as carbon dioxide and methane absorb re-radiated heat and warm the Earth. Photosynthesis: carbon dioxide + water → glucose + oxygen, using light and chlorophyll.</li>
</ul>
<h3>A* extension: worked reasoning and calculations</h3>
<ul>
<li>Removal chemistry, applied to a catalytic converter: 2CO + 2NO → 2CO₂ + N₂. Carbon monoxide is oxidised to carbon dioxide and nitrogen monoxide is reduced to nitrogen. Name the oxidation and reduction halves separately.</li>
<li>Desulfurisation, applied to calcium carbonate removing sulfur dioxide: CaCO₃ + SO₂ → CaSO₃ + CO₂. Explain why this works: calcium carbonate is basic and sulfur dioxide is acidic, an acid–base reaction. That reasoning earns the mark.</li>
<li>Experimental design, applied to testing whether a lake is acidic: sample and compare against pure water using universal indicator or a pH meter, and state that a control sample of unpolluted water must be measured with the same method. Naming the control is often the difference mark.</li>
<li>Greenhouse reasoning, applied to why methane matters more per molecule than carbon dioxide: methane absorbs more infrared radiation per molecule, so a smaller amount produces a similar warming effect. Quantity AND per-molecule effect both count in an evaluation answer.</li>
</ul>
<h3>Common errors</h3>
<ul>
<li>Confusing the water tests: copper(II) sulfate is the white-to-blue test; cobalt(II) chloride is the blue-to-pink test.</li>
<li>Describing acid rain without naming its source gases (sulfur dioxide and oxides of nitrogen).</li>
<li>Saying catalytic converters "remove carbon dioxide". They convert CO and NO, and can produce more CO₂.</li>
</ul>`,
  },
  {
    slug: "organic-chemistry",
    name: "Organic Chemistry",
    content: `<h2>Organic Chemistry</h2>
<p>Cambridge IGCSE Chemistry 0620, Extended route, topic 11 (statements 11.1–11.8). Formulae and functional groups, naming, fuels and fractional distillation, alkanes, alkenes, alcohols, carboxylic acids and polymers.</p>
<h3>11.1 to 11.2 Formulae and naming</h3>
<ul>
<li>A homologous series shares a general formula and functional group, with similar chemical properties and a gradual change in physical properties. Alkanes CₙH₂ₙ₊₂ (saturated), alkenes CₙH₂ₙ (unsaturated, C=C), alcohols CₙH₂ₙ₊₁OH, carboxylic acids CₙH₂ₙ₊₁COOH.</li>
<li>Structural isomers have the same molecular formula but different structural formulae — butan-1-ol and butan-2-ol are a syllabus example.</li>
</ul>
<h3>11.3 to 11.5 Fuels, alkanes and alkenes</h3>
<ul>
<li>Petroleum is a mixture of hydrocarbons separated by fractional distillation. Fractions with shorter chains have lower boiling points, are more volatile, less viscous and burn more easily. From the top: refinery gas, gasoline, naphtha, kerosene, diesel, fuel oil, bitumen.</li>
<li>Alkanes are saturated and burn; complete combustion gives carbon dioxide and water, incomplete combustion gives carbon monoxide and soot. Substitution with chlorine in ultraviolet light: methane + chlorine → chloromethane + hydrogen chloride.</li>
<li>Alkenes have a carbon–carbon double bond and decolourise orange bromine water — the test for unsaturation. Cracking breaks long-chain alkanes into shorter alkanes and alkenes, using a hot catalyst of silica or alumina.</li>
</ul>
<h3>11.6 to 11.8 Alcohols, acids and polymers</h3>
<ul>
<li>Ethanol by fermentation (yeast, 25–35 °C, no air) or by hydration of ethene (300 °C, 60 atm, phosphoric acid catalyst). Fermentation uses a renewable feedstock but is slow and gives dilute ethanol; hydration is fast and pure but uses a finite feedstock.</li>
<li>Ethanoic acid forms from ethanol oxidation; it reacts with metals (salt + hydrogen), bases (salt + water) and carbonates (salt + water + carbon dioxide). Carboxylic acid + alcohol gives an ester (the syllabus example is ethyl ethanoate).</li>
<li>Addition polymerisation: many ethene monomers join to make poly(ethene); the repeat unit keeps all atoms. Condensation polymerisation releases a small molecule (water or HCl) per link — nylon and PET are the syllabus examples, and proteins are natural condensation polymers of amino acids.</li>
</ul>
<h3>A* extension: worked reasoning and calculations</h3>
<ul>
<li>Repeat unit reasoning, applied to a polymer shown with a backbone: find the two carbons of the monomer double bond, keep the other groups attached, and redraw as a repeat unit with single bonds and extension bonds on each side. Deduce the monomer from the repeat unit by restoring the double bond — the exam habit that prevents lost marks.</li>
<li>Cracking equations, applied to C₁₀H₂₂ cracking to octane: C₁₀H₂₂ → C₈H₁₈ + C₂H₄. Atoms must balance on both sides, so the second product must be an alkene. Check carbon and hydrogen counts before writing the final answer.</li>
<li>Fermentation yield calculation, applied to 100 g of glucose (Mr 180) giving ethanol: moles = 100 ÷ 180 = 0.556 mol. From C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂, ethanol = 1.11 mol, mass = 1.11 × 46 = 51.1 g. Percentage yield compares this theoretical mass with the actual mass obtained.</li>
<li>Homologous series trends, applied to naming and properties: as chain length increases in alkanes, boiling point rises (stronger intermolecular forces), viscosity rises and flammability falls. Use intermolecular forces as the reason, not "molecules get bigger".</li>
</ul>
<h3>Common errors</h3>
<ul>
<li>Breaking the polymer chain when drawing a repeat unit. The extension bonds must remain.</li>
<li>Forgetting the ultraviolet light in the alkane substitution conditions, or the catalyst and conditions in cracking.</li>
<li>Saying alkenes "react with bromine water by substitution". It is addition, and the decolourisation is the test.</li>
</ul>`,
  },
  {
    slug: "experimental-techniques-and-chemical-analysis",
    name: "Experimental Techniques and Chemical Analysis",
    content: `<h2>Experimental Techniques and Chemical Analysis</h2>
<p>Cambridge IGCSE Chemistry 0620, Extended route, topic 12 (statements 12.1–12.5). Apparatus and measurement, titration, chromatography and Rf, separation and purification, and the tests for ions and gases. Practical skills are examined directly in Paper 5 or 6.</p>
<h3>12.1 to 12.2 Apparatus and titration</h3>
<ul>
<li>Measure time with a stopwatch, temperature with a thermometer, mass with a balance, volume of liquids with a burette, pipette or measuring cylinder. A volumetric pipette delivers one exact volume; a burette delivers a variable, measured volume.</li>
<li>Titration setup: rinse the burette with the solution it will hold, fill above zero, run out to remove the air bubble in the tip, record the initial reading at eye level with the meniscus. Swirl throughout and wash down near the endpoint.</li>
</ul>
<h3>12.3 Chromatography</h3>
<ul>
<li>Separation happens because components differ in solubility in the solvent and attraction to the paper. Rf = distance moved by substance ÷ distance moved by the solvent. Colourless substances are located with a locating agent such as ninhydrin.</li>
</ul>
<h3>12.4 Separation and purification</h3>
<ul>
<li>Filtration separates an insoluble solid from a liquid; crystallisation obtains a dissolved solid; simple distillation obtains a solvent; fractional distillation separates miscible liquids with close boiling points. Purity is assessed by a sharp melting or boiling point.</li>
</ul>
<h3>12.5 Ion and gas tests</h3>
<ul>
<li>Carbonate + dilute acid → carbon dioxide (turns limewater milky). Halides with acidified silver nitrate: white (Cl⁻), cream (Br⁻), yellow (I⁻). Sulfate with acidified barium chloride → white precipitate. Nitrate + sodium hydroxide + aluminium foil → ammonia. Flame tests: lithium/calcium red, sodium yellow, potassium lilac, copper(II) green-blue, barium light green.</li>
<li>Aqueous cations with aqueous sodium hydroxide: copper(II) gives a blue precipitate soluble in excess only in ammonia; iron(II) pale green, iron(III) red-brown, aluminium white soluble in excess, zinc white soluble in excess. Ammonia: copper(II) deep blue solution, zinc white precipitate soluble in excess.</li>
<li>Gases: hydrogen relights a glowing splint with a squeaky pop; oxygen relights a glowing splint; carbon dioxide turns limewater milky; ammonia turns damp red litmus paper blue; chlorine bleaches damp litmus.</li>
</ul>
<h3>A* extension: worked reasoning and calculations</h3>
<ul>
<li>Rf calculation, applied to a spot moving 3.6 cm while the solvent moves 9.0 cm: Rf = 3.6 ÷ 9.0 = 0.40. Rf has no unit and is always less than 1. Two spots with the same Rf on the same chromatogram are likely the same substance — say "on the same chromatogram", because Rf values are not comparable between different runs.</li>
<li>Evaluation reasoning, applied to a titration with titres of 22.35, 22.40 and 24.10 cm³: the 24.10 cm³ titre is a concordant outlier — discard it, because the first two agree within 0.10 cm³ and the third does not. Average the concordant titres: (22.35 + 22.40) ÷ 2 = 22.375 cm³, reported as 22.38 cm³.</li>
<li>Plan-a-method questions: name the independent variable (what you change), the dependent variable (what you measure) and the control variables (what you keep the same). Then give the safety point and one improvement. Structure answers in that order and every part of the question gets its mark.</li>
<li>Ion identification, applied to a white solid giving a yellow precipitate with silver nitrate that dissolves in excess ammonia: the halide is iodide. Write the full test, observation and conclusion as a chain — Cambridge marks each link separately, and skipping the observation loses the middle marks.</li>
</ul>
<h3>Common errors</h3>
<ul>
<li>Calling the milky limewater precipitate "a white precipitate in the test tube". The observation is that limewater turns milky.</li>
<li>Forgetting to state that the burette reading is taken at eye level to avoid parallax error.</li>
<li>Reporting Rf to the wrong precision or without showing the division.</li>
</ul>`,
  },
];
