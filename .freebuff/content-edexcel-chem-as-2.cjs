// Edexcel International AS Chemistry (WCH11-WCH12), topics 6-10. Answers are 0-based.
module.exports = {
  subject: "chemistry",
  level: "AS",
  topics: [
    {
      slug: "energetics",
      lesson: `# Energetics

Edexcel IAL Chemistry WCH12, Topic 6. Energetics explains why reactions release or absorb heat, and it provides the enthalpy data that later decides whether a reaction is feasible.

### Enthalpy change and types of reaction
- The enthalpy change ΔH is the heat energy transferred at constant pressure. Exothermic reactions have a negative ΔH; endothermic reactions have a positive ΔH.
- Standard conditions are 100 kPa and a stated temperature, usually 298 K, with substances in their standard states.
- Important definitions include standard enthalpy of formation, combustion and neutralisation. Each is written for one mole of the stated substance.

### Measuring enthalpy changes
- In a calorimetry experiment, q = m × c × ΔT, where m is the mass of solution (usually assumed to be 4.18 J g⁻¹ K⁻¹ for water-based solutions).
- Convert heat to enthalpy change using moles: ΔH = −q / n. The sign is negative for an exothermic reaction.
- Sources of error include heat loss to the surroundings and incomplete combustion; the answer is always lower than the data book value for combustion.

### Hess's law
- The total enthalpy change is independent of the route taken. Enthalpy cycles let you find an unknown ΔH from known values.
- For formation values: ΔH = Σ ΔHf(products) − Σ ΔHf(reactants).

### Bond enthalpies
- Breaking bonds is endothermic; making bonds is exothermic. ΔH ≈ Σ bonds broken − Σ bonds formed.
- Bond enthalpies are averages over many compounds, so values from bond enthalpy calculations differ from accurate formation data.

### Entropy and free energy (introduced)
- A reaction that increases disorder (more gas molecules, for example) has a positive entropy change, which favours spontaneous change.

Exam tip: a common mistake is to use the wrong sign for ΔH. Always check whether the process is releasing or taking in heat before writing the value.`,
      questions: [
        { q: "What is the sign of ΔH for an exothermic reaction?", opts: ["Positive", "Zero", "Negative", "It depends on the temperature"], correct: 2, explain: "Exothermic reactions release heat to the surroundings, so ΔH is negative." },
        { q: "Which definition describes the standard enthalpy of combustion?", opts: ["The enthalpy change when one mole of a compound forms from its elements", "The enthalpy change when one mole of a substance burns completely in oxygen under standard conditions", "The enthalpy change when one mole of bonds is broken", "The enthalpy change when an acid is neutralised by an alkali"], correct: 1, explain: "Standard enthalpy of combustion refers to one mole of a substance burnt completely in oxygen." },
        { q: "In a calorimetry experiment, 50.0 g of water rises by 10.0 °C. What is the heat energy transferred? (c = 4.18 J g⁻¹ K⁻¹)", opts: ["2090 J", "418 J", "20 900 J", "5.0 J"], correct: 0, explain: "q = m × c × ΔT = 50.0 × 4.18 × 10.0 = 2090 J." },
        { q: "Which step in an enthalpy cycle uses Hess's law?", opts: ["Adding the enthalpy changes around a closed loop of different routes", "Dividing the heat energy by the mass of solution", "Multiplying the number of moles by the molar mass", "Measuring the temperature change directly"], correct: 0, explain: "Hess's law says that the sum of the enthalpy changes around a closed cycle is zero, so unknown values can be found." },
        { q: "Using bond enthalpies, what is ΔH for H2 + Cl2 → 2HCl if H–H = 436, Cl–Cl = 242 and H–Cl = 431 kJ mol⁻¹?", opts: ["+247 kJ mol⁻¹", "−184 kJ mol⁻¹", "−247 kJ mol⁻¹", "+184 kJ mol⁻¹"], correct: 1, explain: "Bonds broken = 436 + 242 = 678; bonds formed = 2 × 431 = 862; ΔH = 678 − 862 = −184 kJ mol⁻¹." },
        { q: "Why are bond enthalpy values only approximate?", opts: ["They are measured at absolute zero", "They are averages taken over many different compounds", "They ignore the number of electrons", "They are always negative"], correct: 1, explain: "The same bond differs slightly in different molecules, so tabulated bond enthalpies are averages." },
        { q: "What is the standard state of oxygen?", opts: ["O", "O2(g)", "O3(g)", "O2(aq)"], correct: 1, explain: "The standard state of oxygen is O2 gas at 100 kPa." },
        { q: "The standard enthalpy of formation of carbon dioxide is −394 kJ mol⁻¹. What does this represent?", opts: ["Formation of one mole of CO2 from its elements under standard conditions", "Combustion of one mole of carbon in excess oxygen only", "Breaking all bonds in one mole of CO2", "The heat released when CO2 dissolves in water"], correct: 0, explain: "ΔHf refers to forming one mole of the compound from its elements in standard states." },
        { q: "Which process is always endothermic?", opts: ["Combustion", "Neutralisation", "Breaking bonds", "Bond formation"], correct: 2, explain: "Energy must be supplied to break bonds, so bond breaking is endothermic." },
        { q: "In a combustion experiment, why does the measured value of ΔH usually come out lower than the data book value?", opts: ["Heat is lost to the surroundings", "The mass was measured too accurately", "The reaction is endothermic", "Water has a very high specific heat capacity"], correct: 0, explain: "Heat escapes to the surroundings, so less energy is recorded in the water and the magnitude is underestimated." },
        { q: "Which factor increases the entropy of a reaction most?", opts: ["Gaseous molecules being formed from solids", "Two gases reacting to form one solid", "Fewer molecules after reaction", "Liquid becoming a crystalline solid"], correct: 0, explain: "Forming gas molecules from solids increases disorder and so increases entropy." },
        { q: "Which expression correctly gives ΔH for a reaction from formation enthalpies?", opts: ["ΔH = Σ ΔHf(reactants) − Σ ΔHf(products)", "ΔH = Σ ΔHf(products) − Σ ΔHf(reactants)", "ΔH = Σ ΔHf(products) + Σ ΔHf(reactants)", "ΔH = Σ ΔHf(reactants) × Σ ΔHf(products)"], correct: 1, explain: "The enthalpy of the products minus that of the reactants gives the overall change." },
        { q: "What is the enthalpy change of neutralisation of a strong acid with a strong alkali, approximately?", opts: ["−57 kJ mol⁻¹", "+57 kJ mol⁻¹", "−5.7 kJ mol⁻¹", "+570 kJ mol⁻¹"], correct: 0, explain: "Neutralisation releases about 57 kJ mol⁻¹ of water formed for strong acid and alkali." },
        { q: "A reaction releases 4.18 kJ of heat into 100 g of water. What is the temperature rise? (c = 4.18 J g⁻¹ K⁻¹)", opts: ["0.01 °C", "10 °C", "1.0 °C", "100 °C"], correct: 1, explain: "ΔT = q / (m × c) = 4180 / (100 × 4.18) = 10 °C." },
        { q: "Which statement is correct for an endothermic reaction?", opts: ["The products have more energy than the reactants", "The products have less energy than the reactants", "The temperature of the surroundings rises", "The enthalpy change is negative"], correct: 0, explain: "Energy is taken in, so the products have more chemical energy than the reactants." },
        { q: "Why must the reaction mixture be stirred in a calorimetry experiment?", opts: ["To make the reaction faster", "To ensure a uniform temperature throughout the mixture", "To remove dissolved gases", "To increase the pressure"], correct: 1, explain: "Stirring spreads the heat evenly so the thermometer reads the true temperature of the mixture." }
      ]
    },
    {
      slug: "intermolecular-forces",
      lesson: `# Intermolecular Forces

Edexcel IAL Chemistry WCH12, Topic 7. Intermolecular forces are the attractions between molecules, not the bonds inside them. They determine boiling points, solubility and how molecules pack together.

### Types of intermolecular force
- London (instantaneous dipole–induced dipole) forces exist in all molecules. They grow with the number of electrons, so larger molecules have higher boiling points.
- Permanent dipole–dipole forces occur between polar molecules, where the partial positive and negative charges attract one another.
- Hydrogen bonding is a strong dipole–dipole attraction. It occurs when H is bonded to N, O or F and attracts a lone pair on another N, O or F.

### Effect on physical properties
- Boiling point depends on the strength of intermolecular forces: more energy is needed to separate molecules that attract strongly.
- Water boils at a much higher temperature than hydrogen sulfide because hydrogen bonding is much stronger than the dipole forces between H2S molecules.
- Branched alkanes have lower boiling points than straight-chain isomers because they have a smaller surface area for London forces.

### Solubility
- Substances dissolve when the new attractions between solute and solvent replace the attractions within each.
- Polar solvents such as water dissolve ionic and polar solutes; non-polar solvents dissolve non-polar solutes.
- Ethanol is miscible with water because its –OH group forms hydrogen bonds with water.

### Ideal and real gases
- A real gas deviates from ideal behaviour at high pressure and low temperature, because molecules have volume and attract one another.

Exam tip: when comparing boiling points, name the type of intermolecular force, state whether it is stronger or weaker, and say how much energy is needed to overcome it. Do not say that "bonds break" when a liquid boils.`,
      questions: [
        { q: "Which intermolecular force is present in all molecules?", opts: ["Hydrogen bonding", "London forces", "Ionic bonding", "Permanent dipole–dipole forces"], correct: 1, explain: "All molecules have electrons that create temporary dipoles, so London forces are always present." },
        { q: "What is the strongest intermolecular force between water molecules?", opts: ["London forces", "Hydrogen bonding", "Metallic bonding", "Dipole–dipole forces only"], correct: 1, explain: "Water molecules form hydrogen bonds because H is attached to O." },
        { q: "Why does iodine have a higher boiling point than chlorine?", opts: ["Iodine molecules are polar", "Iodine has more electrons and therefore stronger London forces", "Chlorine has ionic bonds", "Iodine has hydrogen bonds"], correct: 1, explain: "Larger molecules with more electrons have stronger London forces, which need more energy to overcome." },
        { q: "Which molecule can form hydrogen bonds with other molecules of the same type?", opts: ["CH4", "CH3OCH3", "CH3CH3", "CH3CH2OH"], correct: 3, explain: "Ethanol has an O–H group, so it forms hydrogen bonds between molecules." },
        { q: "Why does 2,2-dimethylpropane have a lower boiling point than pentane?", opts: ["It is more polar", "It has a smaller surface area, so weaker London forces", "It has stronger hydrogen bonding", "It has more electrons"], correct: 1, explain: "The branched molecule is more compact, reducing contact and the strength of London forces." },
        { q: "Which substance is most likely to dissolve in water?", opts: ["Hexane", "Sodium chloride", "Cyclohexane", "Octane"], correct: 1, explain: "Ionic compounds dissolve in water because water molecules attract and surround the ions." },
        { q: "What bond must be present in a molecule for hydrogen bonding to occur?", opts: ["C–H", "H bonded to N, O or F", "C=C", "Cl–Cl"], correct: 1, explain: "The H must be bonded to a very electronegative atom (N, O or F) to form a hydrogen bond." },
        { q: "Why does H2O have a much higher boiling point than H2S?", opts: ["Oxygen is larger than sulfur", "Water molecules form stronger hydrogen bonds", "H2S has metallic bonds", "Water has no lone pairs"], correct: 1, explain: "Hydrogen bonding in water is much stronger than the dipole–dipole forces between H2S molecules." },
        { q: "What happens to intermolecular forces when a liquid boils?", opts: ["Covalent bonds in the molecules break", "Intermolecular forces are overcome, and molecules separate", "Ionic bonds form", "Electrons are transferred between molecules"], correct: 1, explain: "Boiling separates molecules by overcoming intermolecular forces, not the covalent bonds inside them." },
        { q: "Which is the main reason ethanol dissolves in water in any proportion?", opts: ["Both are ionic", "Hydrogen bonds form between ethanol and water", "Both are non-polar", "Water is a non-polar solvent"], correct: 1, explain: "The –OH group of ethanol forms hydrogen bonds with water, so the new attractions replace the old ones." },
        { q: "Which substance has the strongest London forces?", opts: ["Helium", "Neon", "Argon", "Iodine (I2)"], correct: 3, explain: "Iodine has the most electrons of these, so its London forces are strongest." },
        { q: "Under which conditions does a real gas deviate most from ideal behaviour?", opts: ["High temperature and low pressure", "Low temperature and high pressure", "High temperature and high pressure only", "Low temperature and low pressure"], correct: 1, explain: "At high pressure and low temperature, molecules are close together and attract one another, so the gas deviates." },
        { q: "Which pair of molecules has the most significant permanent dipole–dipole forces?", opts: ["Propane and butane", "Ethane and ethene", "Chloroethane molecules", "Methane molecules"], correct: 2, explain: "Chloroethane is polar because of the C–Cl bond, so its molecules attract each other through dipole–dipole forces." },
        { q: "Why does hydrogen fluoride have a higher boiling point than hydrogen chloride?", opts: ["HF is ionic", "HF forms stronger hydrogen bonds", "HCl has hydrogen bonding", "HF has no dipole"], correct: 1, explain: "Hydrogen bonding in HF is stronger than the dipole forces in HCl." },
        { q: "Which substance is least likely to dissolve in water?", opts: ["Glucose", "Ethanoic acid", "Hexane", "Ammonia"], correct: 2, explain: "Hexane is non-polar and cannot form attractions strong enough to replace the hydrogen bonds in water." },
        { q: "Which statement about dipole–dipole forces is correct?", opts: ["They occur only between ions", "They exist between polar molecules", "They are stronger than covalent bonds", "They occur in non-polar molecules only"], correct: 1, explain: "Permanent dipoles attract one another in polar molecules, giving dipole–dipole forces." },
        { q: "Which is the best explanation for the solubility of iodine in cyclohexane?", opts: ["Both are non-polar, so the attractions are similar", "Both are ionic", "Cyclohexane forms hydrogen bonds with iodine", "Iodine reacts with cyclohexane"], correct: 0, explain: "Like dissolves like: non-polar iodine dissolves in the non-polar solvent cyclohexane." }
      ]
    },
    {
      slug: "redox-chemistry-and-groups-1-2-and-7",
      lesson: `# Redox Chemistry and Groups 1, 2 and 7

Edexcel IAL Chemistry WCH12, Topic 8. Redox reactions involve electron transfer. The same ideas explain the reactions of metals with water and acids, and the displacement reactions of the halogens.

### Oxidation states
- Oxidation state is the charge an atom would have if all bonds were ionic. Elements are 0, simple ions equal their charge, and the sum of oxidation states equals the overall charge.
- Oxidation is an increase in oxidation state (loss of electrons); reduction is a decrease (gain of electrons).
- The oxidising agent is reduced; the reducing agent is oxidised.

### Redox equations
- Half-equations balance atoms, then charge, with electrons added to show the transfer. Combine them so that electrons cancel.
- Example: MnO4⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H2O, and acidified manganate(VII) decolourises when it is reduced.

### Group 1 and Group 2
- Reactivity increases down Group 1 because the outer electron is further from the nucleus and more shielded, so it is lost more easily.
- Group 2 metals form M²⁺ ions. Reactivity with water increases down the group: magnesium reacts slowly with cold water, while calcium reacts steadily.
- The solubility of Group 2 hydroxides and sulfates changes down the group: magnesium sulfate is soluble, barium sulfate is not.

### Group 7
- Halogens are non-metals that form X2 molecules. Oxidising power decreases down the group: chlorine displaces bromide and iodide ions, bromine displaces iodide ions.
- Halide ions are reducing agents, and reducing power increases down the group. Concentrated sulfuric acid is reduced by HI to hydrogen sulfide, because iodide ions are strong reducing agents.

### Tests for halide ions
- Silver nitrate solution forms precipitates: chloride gives white, bromide cream, iodide yellow. Dilute ammonia distinguishes the first two.

Exam tip: when balancing a redox equation in acid, add H⁺ and H2O before counting electrons, and always check that charge and atoms balance on both sides.`,
      questions: [
        { q: "What is the oxidation state of manganese in MnO4⁻?", opts: ["+2", "+4", "+7", "+8"], correct: 2, explain: "Oxygen is −2 each, four oxygens give −8, so Mn must be +7 for an overall −1 charge." },
        { q: "Which statement describes reduction?", opts: ["Loss of electrons", "Gain of electrons", "Increase in oxidation state", "Gain of oxygen only"], correct: 1, explain: "Reduction is the gain of electrons, which decreases the oxidation state." },
        { q: "In the reaction Cl2 + 2KBr → 2KCl + Br2, which species is the oxidising agent?", opts: ["KBr", "Cl2", "Br2", "KCl"], correct: 1, explain: "Chlorine gains electrons and is reduced, so it is the oxidising agent." },
        { q: "Why does reactivity increase down Group 1?", opts: ["Atoms get smaller", "The outer electron is further away and more shielded, so it is lost more easily", "Nuclear charge decreases", "Atoms gain more electrons"], correct: 1, explain: "Larger atoms have more shielding and a more distant outer electron, which is easier to remove." },
        { q: "Which Group 2 metal reacts most vigorously with water?", opts: ["Beryllium", "Magnesium", "Calcium", "Barium"], correct: 3, explain: "Reactivity increases down Group 2, so barium reacts most vigorously of these." },
        { q: "Which Group 2 sulfate is insoluble in water?", opts: ["Magnesium sulfate", "Calcium sulfate", "Barium sulfate", "Beryllium sulfate"], correct: 2, explain: "Barium sulfate is insoluble; solubility of Group 2 sulfates decreases down the group." },
        { q: "What happens when chlorine water is added to potassium iodide solution?", opts: ["No reaction", "The solution turns brown as iodine forms", "A white precipitate forms", "Hydrogen gas is produced"], correct: 1, explain: "Chlorine displaces iodine, which gives a brown solution." },
        { q: "Which halogen is the strongest oxidising agent?", opts: ["Iodine", "Bromine", "Chlorine", "Fluorine"], correct: 3, explain: "Oxidising power decreases down Group 7, so fluorine is strongest of these." },
        { q: "What precipitate forms when silver nitrate is added to sodium bromide solution?", opts: ["White", "Cream", "Yellow", "Black"], correct: 1, explain: "Silver bromide is a cream precipitate." },
        { q: "What is the half-equation for the reduction of acidified MnO4⁻?", opts: ["MnO4⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H2O", "MnO4⁻ → Mn²⁺ + 4O", "MnO4⁻ + e⁻ → MnO4²⁻", "Mn²⁺ → MnO4⁻ + 5e⁻"], correct: 0, explain: "Balance atoms and charge: 8H⁺ and 5e⁻ on the left give Mn²⁺ and 4H2O on the right." },
        { q: "Which Group 7 ion is the strongest reducing agent?", opts: ["Fluoride", "Chloride", "Bromide", "Iodide"], correct: 3, explain: "Reducing power increases down Group 7, so iodide is the strongest reducing agent." },
        { q: "What is the observation when calcium reacts with cold water?", opts: ["No reaction at all", "Steady fizzing with a milky solution forming", "A violent explosion", "A black solid forms"], correct: 1, explain: "Calcium reacts steadily to form calcium hydroxide, which is only slightly soluble, giving a milky suspension." },
        { q: "Why is magnesium used for the reduction of iron(III) oxide?", opts: ["It is less reactive than iron", "It is more reactive than iron", "It is a halogen", "It is a non-metal"], correct: 1, explain: "A more reactive metal reduces the oxide of a less reactive metal." },
        { q: "Which ion is the reducing agent in the reaction 2Br⁻ + Cl2 → Br2 + 2Cl⁻?", opts: ["Cl2", "Br⁻", "Cl⁻", "Br2"], correct: 1, explain: "Bromide ions are oxidised to bromine, so Br⁻ is the reducing agent." },
        { q: "Which test identifies chloride ions?", opts: ["Silver nitrate, followed by dilute ammonia, giving a precipitate that dissolves", "Litmus paper", "Flame test giving a lilac flame", "Lime water turning milky"], correct: 0, explain: "The white silver chloride precipitate dissolves in dilute ammonia; bromide's cream precipitate does not dissolve as readily." },
        { q: "In a redox reaction, what is the total change in oxidation state of the species being reduced?", opts: ["It increases", "It decreases", "It stays the same", "It becomes zero"], correct: 1, explain: "Reduction always lowers the oxidation state of the species that is reduced." },
        { q: "Which Group 2 hydroxide is the most soluble?", opts: ["Magnesium hydroxide", "Calcium hydroxide", "Strontium hydroxide", "Beryllium hydroxide"], correct: 2, explain: "Hydroxide solubility increases down Group 2, so strontium hydroxide is the most soluble of these." },
        { q: "What is the oxidation state of sulfur in H2SO4?", opts: ["+4", "+2", "+6", "−2"], correct: 2, explain: "Hydrogen is +1 (two atoms), oxygen −2 (four atoms), so S is +6." },
        { q: "What happens to the oxidation state of iron in Fe²⁺ → Fe³⁺?", opts: ["It decreases by one", "It increases by one", "It becomes zero", "It stays the same"], correct: 1, explain: "The species loses an electron, so the oxidation state rises from +2 to +3." }
      ]
    },
    {
      slug: "introduction-to-kinetics-and-equilibria",
      lesson: `# Introduction to Kinetics and Equilibria

Edexcel IAL Chemistry WCH12, Topic 9. Kinetics asks how fast a reaction goes, and equilibria asks how far it goes before the forward and backward reactions balance. Both depend on the same collision ideas.

### Rates and collision theory
- For a reaction to occur, particles must collide with enough energy (the activation energy, Ea) and in the correct orientation.
- Increasing concentration or pressure increases the frequency of collisions. Increasing temperature raises the proportion of particles with energy above Ea, which has a larger effect than the increase in collision frequency.
- A catalyst provides an alternative route with a lower Ea; it is not used up.

### Measuring rates
- Rates can be found from the gradient of a concentration–time graph at the start of the reaction (the initial rate).
- Methods include measuring the volume of gas produced, the change in mass, or the time for a colour change to occur (1/time gives a relative rate).

### Dynamic equilibrium
- In a closed system, the forward and reverse rates become equal. Concentrations stop changing, but the reaction has not stopped.
- Equilibrium constant Kc = [products]^n / [reactants]^m, with each concentration raised to the power of its coefficient. Kc is constant for a given temperature.

### Le Chatelier's principle
- If a system at equilibrium is disturbed, the position shifts to oppose the change.
- Increasing temperature favours the endothermic direction. Increasing pressure favours the side with fewer gas molecules. Adding a reactant shifts the position towards products.
- A catalyst speeds up both directions equally, so it changes the rate of reaching equilibrium but not the equilibrium position or Kc.

Exam tip: say which direction is favoured and why, using the principle. Do not claim that a catalyst increases the yield.`,
      questions: [
        { q: "What must happen for a reaction to occur between two particles?", opts: ["They must be ions", "They must collide with energy at least equal to Ea and in the correct orientation", "They must be at absolute zero", "They must be in the same phase only"], correct: 1, explain: "Collision theory requires enough energy and correct orientation." },
        { q: "What effect does a catalyst have on activation energy?", opts: ["It increases it", "It decreases it", "It has no effect on it", "It makes it zero"], correct: 1, explain: "A catalyst gives an alternative pathway with a lower activation energy." },
        { q: "Why does raising the temperature increase the rate of reaction so much?", opts: ["Particles become larger", "A greater proportion of particles have energy above Ea", "The catalyst is activated", "Concentration increases"], correct: 1, explain: "Higher temperature increases the fraction of collisions with energy at least equal to Ea." },
        { q: "What is the initial rate of a reaction found from a concentration–time graph?", opts: ["The gradient at the end of the graph", "The gradient at the start of the graph", "The area under the curve", "The intercept with the y-axis at 100 s"], correct: 1, explain: "The initial rate is the gradient at t = 0, where the concentrations are changing most quickly." },
        { q: "What is true of a system at dynamic equilibrium?", opts: ["The reaction has stopped", "The forward and reverse rates are equal", "The concentrations of reactants are zero", "The temperature is zero"], correct: 1, explain: "At equilibrium the forward and backward rates are equal, so concentrations stay constant." },
        { q: "Which expression is the Kc for N2 + 3H2 ⇌ 2NH3?", opts: ["[N2][H2]3 / [NH3]2", "[NH3]2 / [N2][H2]3", "[NH3] / [N2][H2]", "[N2] + [H2] / [NH3]"], correct: 1, explain: "Products go on top, each concentration raised to its coefficient." },
        { q: "What happens to the equilibrium position when pressure is increased in N2 + 3H2 ⇌ 2NH3?", opts: ["Shifts left", "Shifts right", "No change", "The equilibrium constant increases"], correct: 1, explain: "Four gas molecules become two, so the position shifts to the side with fewer molecules." },
        { q: "How does a catalyst affect the equilibrium constant Kc?", opts: ["It increases Kc", "It decreases Kc", "It has no effect on Kc", "It makes Kc zero"], correct: 2, explain: "Kc depends only on temperature, and a catalyst does not change the equilibrium position." },
        { q: "The forward reaction is exothermic. What happens to the position of equilibrium when temperature rises?", opts: ["Shifts towards products", "Shifts towards reactants", "No change", "Kc increases"], correct: 1, explain: "Raising temperature favours the endothermic reverse reaction, so the position shifts to reactants." },
        { q: "Which factor increases the frequency of collisions but not the proportion with enough energy?", opts: ["Temperature", "Concentration", "A catalyst", "Surface area of a solid"], correct: 1, explain: "Higher concentration gives more collisions per second, but the energy distribution is unchanged." },
        { q: "What would increase the rate of reaction of a solid with an acid?", opts: ["Using a larger lump of solid", "Using a finer powder", "Lowering the temperature", "Removing all the acid"], correct: 1, explain: "A powder has a larger surface area, so more collisions occur per second." },
        { q: "What is the unit of rate of reaction commonly used when the concentration is in mol dm⁻³?", opts: ["mol dm⁻³ s⁻¹", "s", "dm³", "mol"], correct: 0, explain: "Rate is the change in concentration per unit time." },
        { q: "What does a large value of Kc indicate?", opts: ["Reactants are favoured at equilibrium", "Products are favoured at equilibrium", "The reaction is very slow", "The reaction has stopped"], correct: 1, explain: "A large Kc means the numerator (products) dominates at equilibrium." },
        { q: "What happens to the rate of reaction when the concentration of a reactant is doubled in a first-order reaction?", opts: ["It doubles", "It halves", "It quadruples", "It stays the same"], correct: 0, explain: "In a first-order reaction, the rate is directly proportional to the concentration." },
        { q: "Which change shifts the position of equilibrium in 2SO2 + O2 ⇌ 2SO3?", opts: ["Adding a catalyst", "Increasing the pressure", "Adding helium at constant volume", "Changing the surface area only"], correct: 1, explain: "Three gas molecules become two, so higher pressure favours the product side." },
        { q: "Why does the equilibrium constant change with temperature?", opts: ["Because the reaction is faster at higher temperature", "Because the forward and backward rates change by different amounts", "Because a catalyst is added", "Because the volume changes"], correct: 1, explain: "Forward and backward reactions have different enthalpy changes, so their rates change by different amounts when temperature changes." },
        { q: "Which statement about Le Chatelier's principle is correct?", opts: ["The system shifts to increase the disturbance", "The system shifts to oppose the disturbance", "The system always shifts to the right", "The system never shifts"], correct: 1, explain: "The equilibrium position shifts to counteract the change that was imposed." },
        { q: "Which graph feature shows the initial rate of a reaction?", opts: ["The steepest part at the start", "The flattest part at the end", "The total area", "The point where it crosses the x-axis"], correct: 0, explain: "The steepest section at the start has the greatest rate of change of concentration." },
        { q: "How does adding a catalyst affect the time taken to reach equilibrium?", opts: ["It is lengthened", "It is shortened", "It is unchanged", "It becomes infinite"], correct: 1, explain: "A catalyst speeds up both forward and reverse reactions, so equilibrium is reached more quickly." },
        { q: "Which of these is a suitable way to follow the rate of a reaction that produces a gas?", opts: ["Measuring the volume of gas collected over time", "Measuring the colour of a solid", "Measuring the pH of a buffer only", "Measuring the melting point"], correct: 0, explain: "The volume of gas collected over time gives the rate directly." }
      ]
    },
    {
      slug: "organic-halogenoalkanes-alcohols-and-spectra",
      lesson: `# Organic Chemistry: Halogenoalkanes, Alcohols and Spectra

Edexcel IAL Chemistry WCH12, Topic 10. Halogenoalkanes and alcohols are the first families where a functional group changes the reactivity of the molecule. Spectra are the tools that identify those groups in an unknown compound.

### Halogenoalkanes
- A halogenoalkane has a halogen atom bonded to a carbon atom. The C–X bond is polar because the halogen is more electronegative, so the carbon is slightly positive.
- Reactivity rises down the group because the C–X bond gets weaker (C–I is weakest), so the iodoalkane reacts fastest.
- Nucleophilic substitution with aqueous hydroxide ions gives an alcohol. The nucleophile donates a pair of electrons to the carbon atom.
- Halogenoalkanes can be tested by warming with aqueous silver nitrate in ethanol: the precipitate forms at different rates, and iodoalkanes react fastest.

### Alcohols
- Alcohols contain the –OH group. Primary, secondary and tertiary alcohols depend on how many other carbons are attached to the carbon bearing the –OH.
- Oxidation of primary alcohols with acidified potassium dichromate(VI) gives aldehydes, which can be oxidised further to carboxylic acids; excess oxidant and heat give the acid.
- Secondary alcohols oxidise to ketones; tertiary alcohols are not oxidised under these conditions.
- Dehydration with hot concentrated sulfuric acid or aluminium oxide forms an alkene.

### Mass spectrometry
- The molecular ion peak gives the relative molecular mass. Fragmentation patterns reveal structural features.
- Peaks at m/z 15 and 29 can indicate CH3 and C2H5 fragments.

### Infrared spectroscopy
- Bonds absorb infrared radiation at characteristic wavenumbers. A broad absorption near 3200–3550 cm⁻¹ indicates an O–H group in an alcohol. A strong absorption near 1700 cm⁻¹ indicates a C=O group.
- Use tables of characteristic absorptions with the spectrum, rather than memorised single values.

### NMR (introduced)
- The number of peaks in a proton NMR spectrum gives the number of environments of hydrogen atoms; the relative areas give the ratio of hydrogens.

Exam tip: when identifying an unknown, combine evidence: the molecular formula from mass spectrometry, the functional groups from infrared, and the environments from NMR.`,
      questions: [
        { q: "Which halogenoalkane reacts fastest with aqueous hydroxide ions?", opts: ["Chloroethane", "Bromoethane", "Iodoethane", "Fluoroethane"], correct: 2, explain: "The C–I bond is the weakest, so iodoalkanes react fastest." },
        { q: "What type of reaction do halogenoalkanes undergo with aqueous hydroxide?", opts: ["Electrophilic addition", "Nucleophilic substitution", "Free-radical addition", "Elimination only"], correct: 1, explain: "The hydroxide ion acts as a nucleophile, replacing the halogen." },
        { q: "What is the product when 1-bromopropane reacts with aqueous sodium hydroxide?", opts: ["Propan-1-ol", "Propene", "Propan-2-ol", "Propanal"], correct: 0, explain: "Substitution replaces Br with OH, giving propan-1-ol." },
        { q: "Why is the C–X bond polar in a halogenoalkane?", opts: ["Halogens are less electronegative than carbon", "The halogen is more electronegative and pulls electrons towards itself", "Carbon has no electrons", "The bond is ionic"], correct: 1, explain: "The halogen attracts the bonding electrons more strongly, leaving the carbon slightly positive." },
        { q: "What is the product of oxidising propan-1-ol with excess acidified dichromate and heat?", opts: ["Propanal", "Propanone", "Propanoic acid", "Propan-2-ol"], correct: 2, explain: "Primary alcohols oxidise to aldehydes and then to carboxylic acids under excess oxidant and heat." },
        { q: "What is the product of oxidising propan-2-ol?", opts: ["Propanal", "Propanone", "Propanoic acid", "No reaction"], correct: 1, explain: "Secondary alcohols oxidise to ketones; propan-2-ol gives propanone." },
        { q: "Which alcohol is not oxidised by acidified potassium dichromate(VI)?", opts: ["Primary alcohol", "Secondary alcohol", "Tertiary alcohol", "Ethanol"], correct: 2, explain: "Tertiary alcohols have no hydrogen on the carbon bearing the –OH, so they resist oxidation." },
        { q: "What product forms when an alcohol is heated with concentrated sulfuric acid?", opts: ["An alkane", "An alkene", "A halogenoalkane", "A carboxylic acid"], correct: 1, explain: "Dehydration removes water from the alcohol, forming an alkene." },
        { q: "Which infrared absorption shows an O–H group in an alcohol?", opts: ["Broad absorption near 3200–3550 cm⁻¹", "Sharp absorption near 1700 cm⁻¹", "Absorption near 2100 cm⁻¹ only", "No absorption above 2500 cm⁻¹"], correct: 0, explain: "The broad O–H stretch appears in this region." },
        { q: "What does the molecular ion peak in a mass spectrum give?", opts: ["The relative molecular mass", "The boiling point", "The number of hydrogens only", "The bond angle"], correct: 0, explain: "The molecular ion peak corresponds to the molecular mass of the compound." },
        { q: "Which reagent is used to distinguish a primary alcohol from a tertiary alcohol?", opts: ["Acidified potassium dichromate(VI)", "Aqueous sodium chloride", "Hydrogen gas", "Lime water"], correct: 0, explain: "The primary alcohol changes the orange dichromate to green, but the tertiary alcohol does not." },
        { q: "In a proton NMR spectrum, what does the number of peaks indicate?", opts: ["Number of carbon atoms", "Number of hydrogen environments", "Molecular mass", "Number of oxygen atoms"], correct: 1, explain: "Each chemically distinct set of hydrogens gives a separate peak." },
        { q: "What is the name of a secondary halogenoalkane with four carbons and bromine on the second carbon?", opts: ["1-bromobutane", "2-bromobutane", "2-bromopropane", "1-bromopropane"], correct: 1, explain: "Bromine on C2 of a four-carbon chain gives 2-bromobutane." },
        { q: "What is the reagent used to make a halogenoalkane from an alcohol?", opts: ["Concentrated HCl or PCl5", "Sodium hydroxide", "Ethene", "Hydrogen"], correct: 0, explain: "Hydrogen chloride or phosphorus(V) chloride replaces the –OH group with Cl." },
        { q: "What colour change is seen when acidified dichromate(VI) oxidises an alcohol?", opts: ["Orange to green", "Purple to colourless", "Colourless to brown", "Blue to red"], correct: 0, explain: "Cr2O7²⁻ (orange) is reduced to Cr³⁺ (green)." },
        { q: "What is the main reason iodoalkanes are used in the silver nitrate test?", opts: ["They react fastest and give a precipitate quickly", "They are not reactive", "They do not form halide ions", "They give a gas"], correct: 0, explain: "The weaker C–I bond releases iodide quickly, giving a yellow precipitate faster than the other halides." },
        { q: "Which statement about primary alcohols is correct?", opts: ["The carbon with –OH is bonded to two other carbons", "The carbon with –OH is bonded to one other carbon", "The carbon with –OH is bonded to three other carbons", "They cannot be oxidised"], correct: 1, explain: "A primary alcohol has the –OH on a carbon attached to only one other carbon." },
        { q: "What is the typical absorption for a C=O bond in infrared spectroscopy?", opts: ["Near 1700 cm⁻¹", "Near 3000 cm⁻¹ only", "Near 1000 cm⁻¹ only", "Above 4000 cm⁻¹"], correct: 0, explain: "The strong C=O stretch appears near 1700 cm⁻¹." },
        { q: "Which species acts as the nucleophile in alkaline hydrolysis of a halogenoalkane?", opts: ["H⁺", "OH⁻", "Br⁻", "CH3⁺"], correct: 1, explain: "The hydroxide ion donates a lone pair to the electron-deficient carbon." }
      ]
    }
  ]
};
