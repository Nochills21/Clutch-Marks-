// Edexcel International A Level Chemistry (WCH14), topics 11-15. Answers are 0-based.
module.exports = {
  subject: "chemistry",
  level: "A2",
  topics: [
    {
      slug: "kinetics",
      lesson: `# Kinetics

Edexcel IAL Chemistry WCH14, Topic 11. Kinetics links the rate of a reaction to the concentrations of the reactants, and the rate constant to temperature. Rate equations come from experiments, not from the balanced equation.

### Rate equations and order
- The rate equation has the form rate = k[A]^m[B]^n. The powers m and n are the orders with respect to A and B, and they must be found from experimental data.
- A first-order reaction has rate proportional to concentration: doubling [A] doubles the rate. A second-order reaction gives a quadrupled rate when [A] doubles.
- A zero-order reaction has a rate that does not depend on the concentration of that reactant, because the reactant is not involved in the rate-determining step or the reaction surface is saturated.
- The overall order is the sum of the individual orders.

### Initial rates
- Using the initial rates method, keep all but one concentration constant and compare the rates. The ratio of rates gives the order for the changed reactant.

### Rate constant and units
- The rate constant k is the proportionality constant in the rate equation. Its units depend on the overall order: for rate in mol dm⁻³ s⁻¹, a first-order k is in s⁻¹ and a second-order k is in dm³ mol⁻¹ s⁻¹.
- k changes only with temperature (and with a catalyst, which lowers Ea). Concentration changes alter the rate, not k.

### Half-life
- For a first-order reaction, the half-life is constant and given by t½ = ln 2 / k = 0.693 / k.

### Arrhenius equation
- The Arrhenius equation k = A e^(−Ea/RT) relates the rate constant to temperature. Taking natural logarithms gives ln k = ln A − Ea/(RT).
- A plot of ln k against 1/T is a straight line with gradient −Ea/R, which allows the activation energy to be found.

### Mechanisms
- A reaction mechanism is a series of steps. The slowest step is the rate-determining step, and the rate equation is predicted from its stoichiometry.

Exam tip: when asked for the rate equation, use the data and state the order for each reactant; do not simply copy the coefficients from the balanced equation.`,
      questions: [
        { q: "A reaction has rate proportional to [A]². If [A] doubles, what happens to the rate?", opts: ["It doubles", "It quadruples", "It halves", "It does not change"], correct: 1, explain: "Rate ∝ [A]², so doubling [A] multiplies the rate by 2² = 4." },
        { q: "What are the units of k for a second-order reaction when the rate is in mol dm⁻³ s⁻¹?", opts: ["s⁻¹", "mol dm⁻³ s⁻¹", "dm³ mol⁻¹ s⁻¹", "mol² dm⁻⁶ s⁻¹"], correct: 2, explain: "k = rate / [A]² = (mol dm⁻³ s⁻¹) / (mol dm⁻³)² = dm³ mol⁻¹ s⁻¹." },
        { q: "For a zero-order reaction, what happens to the rate when [A] is doubled?", opts: ["It doubles", "It quadruples", "It halves", "It does not change"], correct: 3, explain: "A zero-order rate does not depend on the concentration of that reactant." },
        { q: "What is the half-life of a first-order reaction with k = 0.0693 s⁻¹?", opts: ["0.1 s", "10 s", "0.693 s", "100 s"], correct: 1, explain: "t½ = ln 2 / k = 0.693 / 0.0693 = 10 s." },
        { q: "Which statement is true of the half-life of a first-order reaction?", opts: ["It depends on the starting concentration", "It is constant whatever the concentration", "It doubles with each half-life", "It is always zero"], correct: 1, explain: "For a first-order reaction the half-life is independent of concentration." },
        { q: "In a plot of ln k against 1/T for the Arrhenius equation, what is the gradient?", opts: ["Ea/R", "−Ea/R", "R/Ea", "−R/Ea"], correct: 1, explain: "ln k = ln A − Ea/(RT), so the gradient of ln k against 1/T is −Ea/R." },
        { q: "Which change alters the value of the rate constant k?", opts: ["A change in reactant concentration", "A change in temperature", "A change in reaction vessel size", "A change in the amount of product"], correct: 1, explain: "k depends on temperature; concentration changes the rate but not k." },
        { q: "The rate equation for a reaction is rate = k[A][B]². What is the overall order?", opts: ["1", "2", "3", "4"], correct: 2, explain: "The overall order is the sum of the orders: 1 + 2 = 3." },
        { q: "How is a rate equation predicted from a reaction mechanism?", opts: ["From the coefficients of the overall equation only", "From the stoichiometry of the rate-determining step", "From the products formed", "From the enthalpy change"], correct: 1, explain: "The rate-determining step, the slowest step, governs the rate equation." },
        { q: "Which technique is suitable for following a reaction in which the colour of the mixture changes?", opts: ["Colorimetry", "Melting point measurement", "Density of a solid", "Titration with no indicator"], correct: 0, explain: "Colorimetry measures absorbance, which changes as the coloured species forms or is used up." },
        { q: "In a reaction mechanism, the rate-determining step is best described as:", opts: ["The fastest step", "The slowest step", "The first step always", "The step involving the catalyst only"], correct: 1, explain: "The slowest step limits the overall rate of the reaction." },
        { q: "A reaction is first order in X and second order in Y. What is the rate equation?", opts: ["rate = k[X][Y]", "rate = k[X]²[Y]", "rate = k[X][Y]²", "rate = k[X]²[Y]²"], correct: 2, explain: "First order in X gives [X]¹, second order in Y gives [Y]², so rate = k[X][Y]²." },
        { q: "The rate of a first-order reaction is 0.20 mol dm⁻³ s⁻¹ when [A] = 0.10 mol dm⁻³. What is k?", opts: ["0.02 s⁻¹", "2.0 s⁻¹", "0.50 s⁻¹", "0.10 s⁻¹"], correct: 1, explain: "For first order, rate = k[A], so k = 0.20 / 0.10 = 2.0 s⁻¹." },
        { q: "What effect does a catalyst have on the rate constant k?", opts: ["It decreases k", "It increases k by lowering Ea", "It has no effect on k in any reaction", "It increases the activation energy"], correct: 1, explain: "A catalyst gives a route with lower Ea, which increases the rate constant at a given temperature." },
        { q: "Why does the rate of a zero-order reaction not depend on the concentration of that reactant?", opts: ["The reactant is not involved in the rate-determining step, or the reaction surface is saturated", "The reactant is itself a catalyst", "The concentration is always zero", "The reaction is at equilibrium"], correct: 0, explain: "Zero order means the reactant does not control the rate, for example when a catalyst surface is fully occupied." }
      ]
    },
    {
      slug: "entropy-and-energetics",
      lesson: `# Entropy and Energetics

Edexcel IAL Chemistry WCH14, Topic 12. Enthalpy alone does not decide whether a reaction happens. Entropy measures how energy and matter are spread out, and the Gibbs energy combines enthalpy and entropy to predict feasibility.

### Entropy
- Entropy S measures the disorder or the number of ways energy can be dispersed. Its standard unit is J K⁻¹ mol⁻¹.
- Entropy increases when a solid melts or dissolves, when a liquid evaporates, and when the number of gas molecules increases.
- Entropy decreases when gas molecules condense or when a crystal forms from solution.
- Standard entropy values are given in data books. The entropy change for a reaction is ΔS = Σ S(products) − Σ S(reactants).

### Gibbs free energy
- The Gibbs energy change is ΔG = ΔH − TΔS, where T is in kelvin. ΔH is in J mol⁻¹ and ΔS in J K⁻¹ mol⁻¹, so convert ΔH from kJ to J before calculating.
- A reaction is feasible when ΔG is negative. When ΔG = 0 the system is at equilibrium.

### Total entropy change
- The total entropy change is ΔS total = ΔS system + ΔS surroundings. For the surroundings, ΔS surroundings = −ΔH / T.

### Temperature and feasibility
- For a reaction with positive ΔH and positive ΔS, ΔG becomes negative above the temperature T = ΔH / ΔS. High temperature therefore makes the reaction feasible.
- For a reaction with ΔH positive and ΔS negative, ΔG is always positive, so the reaction is never feasible.

### Worked example
- For CaCO3 → CaO + CO2, ΔH = +178 kJ mol⁻¹ and ΔS = +161 J K⁻¹ mol⁻¹. The temperature at which ΔG = 0 is T = 178 000 / 161 = 1106 K, so the decomposition becomes feasible above about 1100 K.

Exam tip: always convert kJ to J before subtracting TΔS, and state the temperature in kelvin.`,
      questions: [
        { q: "Which equation links Gibbs energy, enthalpy and entropy?", opts: ["ΔG = ΔH + TΔS", "ΔG = ΔH − TΔS", "ΔG = ΔS − TΔH", "ΔG = TΔH − ΔS"], correct: 1, explain: "The Gibbs energy change is ΔG = ΔH − TΔS." },
        { q: "A reaction is feasible when its Gibbs energy change ΔG is:", opts: ["Positive", "Zero only", "Negative", "Equal to ΔH"], correct: 2, explain: "A negative ΔG means the reaction is thermodynamically feasible." },
        { q: "What is the standard unit of entropy?", opts: ["kJ mol⁻¹", "J K⁻¹ mol⁻¹", "K mol⁻¹", "J mol⁻¹"], correct: 1, explain: "Entropy is measured in joules per kelvin per mole." },
        { q: "Which change gives a positive entropy change for the system?", opts: ["Two gases forming one liquid", "A solid dissolving to form a gas", "A gas condensing to a liquid", "Crystallisation from solution"], correct: 1, explain: "Turning a solid into a gas greatly increases the number of ways energy is dispersed." },
        { q: "For CaCO3 → CaO + CO2, ΔH = +178 kJ mol⁻¹ and ΔS = +161 J K⁻¹ mol⁻¹. At what temperature is ΔG = 0?", opts: ["1106 K", "178 K", "161 K", "2.8 K"], correct: 0, explain: "T = ΔH / ΔS = 178 000 / 161 = 1106 K." },
        { q: "A reaction has ΔH = −100 kJ mol⁻¹ and ΔS = −50 J K⁻¹ mol⁻¹. Is it feasible at 298 K?", opts: ["Yes, ΔG is negative", "No, ΔG is positive", "Yes, because ΔS is negative", "It cannot be determined"], correct: 0, explain: "ΔG = −100 000 − (298 × −50) = −85 100 J mol⁻¹, which is negative." },
        { q: "For a reaction with positive ΔH and positive ΔS, when is it feasible?", opts: ["Only at low temperature", "At high temperature, because TΔS dominates", "Never", "At all temperatures equally"], correct: 1, explain: "Above T = ΔH / ΔS, the TΔS term is larger than ΔH and ΔG becomes negative." },
        { q: "What is the total entropy change of the universe?", opts: ["ΔS system only", "ΔS surroundings only", "ΔS system + ΔS surroundings", "ΔH divided by T only"], correct: 2, explain: "The total entropy change is the sum of the system and surroundings changes." },
        { q: "Which temperature unit must be used in ΔG = ΔH − TΔS?", opts: ["°C", "K", "°F", "mol"], correct: 1, explain: "Thermodynamic equations use the absolute temperature in kelvin." },
        { q: "A reaction with ΔG = 0 is at:", opts: ["Equilibrium", "Complete reaction", "Zero kelvin", "The standard state only"], correct: 0, explain: "When ΔG = 0 the forward and reverse processes balance, so the system is at equilibrium." },
        { q: "Why must ΔH be converted to joules before calculating TΔS when ΔS is in J K⁻¹ mol⁻¹?", opts: ["To keep the units consistent", "Because joules are larger", "To change the sign", "It does not matter"], correct: 0, explain: "Both terms must be in joules so that ΔG is in consistent units." },
        { q: "Which process has a decrease in entropy?", opts: ["Evaporation of water", "Dissolving a salt in water", "Formation of a crystal from solution", "Gas expansion into a vacuum"], correct: 2, explain: "Forming an ordered crystal from solution reduces disorder." },
        { q: "Which statement describes entropy?", opts: ["A measure of energy stored in bonds", "A measure of disorder, or the number of ways energy can be dispersed", "A measure of temperature", "A measure of mass"], correct: 1, explain: "Entropy measures how energy and matter are dispersed." },
        { q: "Where are standard entropy values usually found?", opts: ["Data books and tables", "Calorimetry results only", "Bond energy tables only", "Titration results"], correct: 0, explain: "Standard entropy values are tabulated in data books." },
        { q: "A reaction is endothermic with negative ΔS. Is it ever feasible?", opts: ["Always feasible", "Never feasible at any temperature", "Feasible at high temperature", "Feasible at low temperature"], correct: 1, explain: "ΔH is positive and −TΔS is positive, so ΔG is always positive." }
      ]
    },
    {
      slug: "chemical-equilibria",
      lesson: `# Chemical Equilibria

Edexcel IAL Chemistry WCH14, Topic 13. In a closed system a reaction reaches a dynamic equilibrium, where the forward and reverse rates are equal. The equilibrium constant tells you the position of that equilibrium at a given temperature.

### The equilibrium constant Kc
- For aA + bB ⇌ cC + dD, Kc = [C]^c [D]^d / ([A]^a [B]^b). Only species in solution or gas phase appear in the expression.
- Kc is constant for a given temperature. Changing concentration or pressure shifts the position but not the value of Kc.
- The units of Kc depend on the stoichiometry. For N2 + 3H2 ⇌ 2NH3, Kc has units of mol⁻² dm⁶.

### Worked example
- For H2 + I2 ⇌ 2HI, at equilibrium [HI] = 1.60, [H2] = 0.20 and [I2] = 0.20 mol dm⁻³. Kc = 1.60² / (0.20 × 0.20) = 64.

### Partial pressure and Kp
- In gas equilibria, the partial pressure of a gas is its mole fraction multiplied by the total pressure.
- Kp uses partial pressures instead of concentrations. For N2O4 ⇌ 2NO2, Kp = p(NO2)² / p(N2O4).

### Effect of changes
- Adding reactant or removing product shifts the position towards the products. Adding product shifts it towards the reactants.
- Increasing pressure favours the side with fewer gas molecules. Changing the volume has the same effect as changing pressure.
- Raising the temperature favours the endothermic direction. For an exothermic forward reaction, Kc decreases as temperature rises.
- A catalyst changes the rate at which equilibrium is reached but not the position or Kc.

Exam tip: a change in temperature is the only change that alters Kc. Concentration, pressure and catalyst changes alter the position or rate, but not the constant.`,
      questions: [
        { q: "For H2 + I2 ⇌ 2HI, [HI] = 1.60, [H2] = 0.20 and [I2] = 0.20 mol dm⁻³. What is Kc?", opts: ["8", "0.25", "64", "2.56"], correct: 2, explain: "Kc = 1.60² / (0.20 × 0.20) = 2.56 / 0.04 = 64." },
        { q: "What are the units of Kc for N2 + 3H2 ⇌ 2NH3?", opts: ["mol dm⁻³", "mol⁻² dm⁶", "mol² dm⁻⁶", "No units"], correct: 1, explain: "Kc = [NH3]² / ([N2][H2]³), giving (mol dm⁻³)² / (mol dm⁻³)⁴ = mol⁻² dm⁶." },
        { q: "What is the Kc expression for 2NO2 ⇌ N2O4?", opts: ["[NO2]² / [N2O4]", "[N2O4] / [NO2]²", "[N2O4] / [NO2]", "2[N2O4] / 2[NO2]"], correct: 1, explain: "Products go on top, each concentration raised to its coefficient." },
        { q: "What is Kp defined in terms of?", opts: ["Concentrations in mol dm⁻³", "Partial pressures of gases", "Masses of solids", "Volumes of liquids"], correct: 1, explain: "Kp is written using the partial pressures of the gases." },
        { q: "For an exothermic forward reaction, what happens to Kc when temperature rises?", opts: ["Increases", "Decreases", "Stays the same", "Becomes zero"], correct: 1, explain: "Raising the temperature favours the endothermic reverse reaction, so Kc falls." },
        { q: "Adding a catalyst to an equilibrium mixture changes:", opts: ["Kc", "the equilibrium position", "the rate at which equilibrium is reached", "the enthalpy change"], correct: 2, explain: "A catalyst speeds up both directions equally, so only the rate of reaching equilibrium changes." },
        { q: "Increasing the pressure on 2SO2 + O2 ⇌ 2SO3 does what to the position of equilibrium?", opts: ["Shifts left", "Shifts right", "No change to position", "Kc decreases"], correct: 1, explain: "Three gas molecules become two, so the position shifts to the side with fewer molecules." },
        { q: "Which change alters the value of Kc?", opts: ["Adding a catalyst", "Changing the concentration of a reactant", "Changing the temperature", "Changing the pressure"], correct: 2, explain: "Only temperature changes the equilibrium constant." },
        { q: "What is the partial pressure of a gas in a mixture?", opts: ["Its mole fraction multiplied by the total pressure", "The total pressure divided by the number of gases", "Its mass divided by volume", "Its concentration in mol dm⁻³"], correct: 0, explain: "Partial pressure equals mole fraction times total pressure." },
        { q: "What does a small value of Kc indicate?", opts: ["Products are strongly favoured", "Reactants are favoured at equilibrium", "The reaction is very fast", "The reaction has stopped"], correct: 1, explain: "A small Kc means the denominator (reactants) dominates at equilibrium." },
        { q: "What is the Kp expression for N2O4 ⇌ 2NO2?", opts: ["p(N2O4) / p(NO2)²", "p(NO2)² / p(N2O4)", "p(NO2) / p(N2O4)", "p(N2O4) + p(NO2)"], correct: 1, explain: "Kp = p(NO2)² / p(N2O4), with partial pressures raised to the coefficients." },
        { q: "Increasing the volume of a gas equilibrium mixture has the same effect as:", opts: ["Increasing the pressure", "Decreasing the pressure", "Adding a catalyst", "Increasing the temperature"], correct: 1, explain: "Increasing volume lowers the pressure, so the position shifts towards more gas molecules." },
        { q: "Why is a chemical equilibrium described as dynamic?", opts: ["Reactions continue in both directions at equal rates", "The reaction has stopped", "Only products are present", "The temperature keeps changing"], correct: 0, explain: "Both forward and reverse reactions continue, but their rates are equal." },
        { q: "What happens to the position of an equilibrium when product is removed?", opts: ["Shifts towards reactants", "Shifts towards products", "No change", "Kc becomes zero"], correct: 1, explain: "Removing product shifts the position to replace it, towards the products." },
        { q: "For an endothermic reaction, what happens to Kc as temperature increases?", opts: ["Decreases", "Increases", "Stays the same", "Becomes zero"], correct: 1, explain: "Raising the temperature favours the endothermic forward reaction, so Kc increases." }
      ]
    },
    {
      slug: "acid-base-equilibria",
      lesson: `# Acid-base Equilibria

Edexcel IAL Chemistry WCH14, Topic 14. Acids and bases are defined by proton transfer. The strength of an acid is given by its dissociation constant, and pH calculations, buffers and titrations all follow from it.

### Strong and weak acids
- A strong acid dissociates completely in water, so [H⁺] equals the acid concentration. For 0.010 mol dm⁻³ HCl, [H⁺] = 0.010 and pH = 2.00.
- A weak acid dissociates only partly. For HA ⇌ H⁺ + A⁻, Ka = [H⁺][A⁻] / [HA].
- pKa = −log10 Ka. A smaller pKa means a stronger acid.

### pH calculations
- pH = −log10[H⁺]. For a base, find pOH = −log10[OH⁻] and use pH = 14.00 − pOH at 298 K.
- Kw = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴ mol² dm⁻⁶ at 298 K.
- For a 0.050 mol dm⁻³ NaOH solution, [OH⁻] = 0.050, pOH = 1.30 and pH = 12.70.

### Buffers
- A buffer contains a weak acid and its conjugate base (for example ethanoic acid and sodium ethanoate). It resists large pH changes.
- The pH of a buffer is given by pH = pKa + log([A⁻] / [HA]). When [A⁻] = [HA], pH = pKa.
- Adding a small amount of strong acid is absorbed by the conjugate base, so the pH changes only slightly.

### Titrations and indicators
- Strong acid with strong base: the equivalence point is pH 7.
- Weak acid with strong base: the equivalence point is above pH 7, so phenolphthalein (pH 8.3 to 10) is suitable.
- Strong acid with weak base: the equivalence point is below pH 7, so methyl orange (pH 3.1 to 4.4) is suitable.
- Choose an indicator whose colour change lies within the steep vertical section of the titration curve.

Exam tip: when pH is asked for a weak acid, calculate [H⁺] from Ka and the concentration before taking the logarithm.`,
      questions: [
        { q: "What is the pH of 0.010 mol dm⁻³ HCl?", opts: ["1", "2", "12", "0.01"], correct: 1, explain: "HCl is a strong acid, so [H⁺] = 0.010 and pH = −log10(0.010) = 2." },
        { q: "What is pKa when Ka = 1.0 × 10⁻⁵?", opts: ["1.0", "5", "−5", "10⁻⁵"], correct: 1, explain: "pKa = −log10(1.0 × 10⁻⁵) = 5." },
        { q: "A buffer solution is made from:", opts: ["A strong acid and a strong alkali", "Two strong acids", "A weak acid and its conjugate base", "Two salts only"], correct: 2, explain: "A buffer needs a weak acid and its conjugate base to resist pH change." },
        { q: "What is the pH of 0.050 mol dm⁻³ NaOH?", opts: ["1.30", "12.70", "2.00", "7.00"], correct: 1, explain: "[OH⁻] = 0.050, pOH = 1.30, pH = 14.00 − 1.30 = 12.70." },
        { q: "Which indicator is most suitable for a weak acid titrated with a strong alkali?", opts: ["Methyl orange", "Phenolphthalein", "Universal indicator only", "Litmus only"], correct: 1, explain: "The equivalence point is above pH 7, and phenolphthalein changes colour in the basic range." },
        { q: "What is the pH at the equivalence point of a strong acid titrated with a strong base?", opts: ["4", "7", "9", "14"], correct: 1, explain: "A neutral salt solution forms, so the equivalence point is pH 7." },
        { q: "Which expression defines Kw?", opts: ["[H⁺] + [OH⁻]", "[H⁺][OH⁻]", "[H⁺] / [OH⁻]", "[OH⁻]²"], correct: 1, explain: "Kw is the ionic product of water, [H⁺][OH⁻] = 1.0 × 10⁻¹⁴ at 298 K." },
        { q: "A weak acid has pKa 4.76. What is the pH when it is exactly half-neutralised?", opts: ["7.00", "4.76", "2.38", "9.52"], correct: 1, explain: "At half-neutralisation [A⁻] = [HA], so pH = pKa = 4.76." },
        { q: "Which statement about weak acids is correct?", opts: ["They fully dissociate in water", "They partially dissociate in water", "Their pH is always 0", "They are strong bases"], correct: 1, explain: "A weak acid only partly dissociates, so [H⁺] is much less than the acid concentration." },
        { q: "What is [H⁺] in a solution of pH 3?", opts: ["3", "1.0 × 10⁻³ mol dm⁻³", "1.0 × 10³ mol dm⁻³", "0.3 mol dm⁻³"], correct: 1, explain: "[H⁺] = 10⁻³ mol dm⁻³ when pH = 3." },
        { q: "What happens to the pH of a buffer when a small amount of strong acid is added?", opts: ["It falls greatly", "It changes only slightly", "It rises to 14", "It becomes exactly 7"], correct: 1, explain: "The conjugate base reacts with the added H⁺, so the pH changes very little." },
        { q: "Ka for ethanoic acid is 1.74 × 10⁻⁵. What is pKa?", opts: ["4.76", "1.74", "5.00", "−4.76"], correct: 0, explain: "pKa = −log10(1.74 × 10⁻⁵) = 4.76." },
        { q: "Which pair of solutions forms a buffer?", opts: ["HCl and NaCl", "CH3COOH and CH3COONa", "NaOH and NaCl", "HNO3 and KNO3"], correct: 1, explain: "Ethanoic acid and sodium ethanoate form a weak acid and its conjugate base." },
        { q: "Methyl orange changes colour over which pH range?", opts: ["3.1 to 4.4", "8.3 to 10", "6.8 to 8.2", "11 to 13"], correct: 0, explain: "Methyl orange changes colour between about pH 3.1 and 4.4, which suits strong acid and weak base titrations." },
        { q: "What is the pH of a solution with [OH⁻] = 0.01 mol dm⁻³?", opts: ["2", "7", "12", "14"], correct: 2, explain: "pOH = 2, so pH = 14 − 2 = 12." }
      ]
    },
    {
      slug: "organic-carbonyls-carboxylic-acids-and-chirality",
      lesson: `# Organic Chemistry: Carbonyls, Carboxylic Acids and Chirality

Edexcel IAL Chemistry WCH14, Topic 15. Aldehydes and ketones contain the carbonyl group, C=O. Their reactions are nucleophilic addition, and the products can be carboxylic acids, alcohols or molecules with a chiral centre.

### Carbonyl compounds
- An aldehyde has the C=O group at the end of a chain (RCHO). A ketone has it inside the chain (RCOR).
- The carbon of C=O is slightly positive, so nucleophiles attack it. Ketones are less reactive than aldehydes because the two alkyl groups donate electron density.

### Reactions and tests
- Hydrogen cyanide adds across C=O. For ethanal, CH3CHO + HCN gives 2-hydroxypropanenitrile.
- Sodium tetrahydridoborate(III) (NaBH4) reduces aldehydes to primary alcohols and ketones to secondary alcohols.
- 2,4-dinitrophenylhydrazine (2,4-DNPH) gives an orange or yellow precipitate with any carbonyl compound.
- Tollens' reagent gives a silver mirror with aldehydes but not with ketones.
- The iodoform test gives a yellow precipitate of triiodomethane with compounds containing CH3CO– or CH3CH(OH)– groups, such as propanone.

### Carboxylic acids
- Carboxylic acids contain –COOH and are weak acids. They are more acidic than alcohols because the carboxylate ion is stabilised by delocalisation.
- Carboxylic acids react with alcohols in the presence of concentrated sulfuric acid to form esters, in a reversible esterification.
- Primary alcohols are oxidised to carboxylic acids by heating with acidified potassium dichromate(VI) under reflux.

### Chirality
- A chiral carbon atom has four different groups attached. Molecules with a chiral centre exist as a pair of enantiomers.
- Enantiomers have identical physical properties except their effect on plane-polarised light: one rotates it clockwise and the other anticlockwise by the same amount.
- An equimolar mixture of the two enantiomers is a racemic mixture, which is optically inactive.

Exam tip: when describing a nucleophilic addition, show the nucleophile attacking the carbon of C=O and the oxygen gaining the negative charge.`,
      questions: [
        { q: "Which reagent reduces an aldehyde to a primary alcohol?", opts: ["NaBH4", "Concentrated H2SO4", "Bromine water", "Dilute HCl"], correct: 0, explain: "Sodium tetrahydridoborate(III) reduces C=O to a C–OH group." },
        { q: "Which reagent gives an orange or yellow precipitate with carbonyl compounds?", opts: ["2,4-DNPH", "Silver nitrate", "Litmus", "Iodine solution"], correct: 0, explain: "2,4-DNPH forms a coloured hydrazone precipitate with aldehydes and ketones." },
        { q: "Which compound forms when HCN adds to ethanal?", opts: ["2-hydroxypropanenitrile", "Propanenitrile", "Ethanol", "Ethanoic acid"], correct: 0, explain: "CH3CHO + HCN gives CH3CH(OH)CN, which is 2-hydroxypropanenitrile." },
        { q: "Which test gives a silver mirror with ethanal but not with propanone?", opts: ["Tollens' reagent", "2,4-DNPH", "Sodium carbonate", "Bromine water"], correct: 0, explain: "Aldehydes reduce Tollens' reagent to silver; ketones do not." },
        { q: "Which compound gives a yellow precipitate in the iodoform test?", opts: ["Propanone", "Propanoic acid", "Methanol", "Butane"], correct: 0, explain: "Propanone contains CH3CO–, so it gives a yellow triiodomethane precipitate." },
        { q: "Carboxylic acids react with alcohols in the presence of H2SO4 to form:", opts: ["Esters", "Alkanes", "Amines", "Alkenes"], correct: 0, explain: "Esterification joins the acid and alcohol, losing water." },
        { q: "A chiral carbon atom has:", opts: ["Two identical groups attached", "Four different groups attached", "Three hydrogen atoms", "A C=C double bond"], correct: 1, explain: "Four different groups around one carbon give non-superimposable mirror images." },
        { q: "Enantiomers differ in which property?", opts: ["Molecular formula", "Boiling point only", "Their effect on plane-polarised light", "Number of atoms"], correct: 2, explain: "Enantiomers rotate plane-polarised light in opposite directions." },
        { q: "A racemic mixture is:", opts: ["Strongly optically active", "Optically inactive", "Made of only one enantiomer", "Always a solid"], correct: 1, explain: "Equal amounts of both enantiomers cancel out the rotation of plane-polarised light." },
        { q: "Which reagent oxidises a primary alcohol to a carboxylic acid?", opts: ["Acidified dichromate(VI) under reflux", "NaBH4", "Dilute sodium hydroxide", "Ethanal alone"], correct: 0, explain: "Excess oxidant with heating under reflux gives the carboxylic acid." },
        { q: "In nucleophilic addition to C=O, the nucleophile attacks:", opts: ["The oxygen atom", "The carbon atom of C=O", "A hydrogen atom", "A lone pair"], correct: 1, explain: "The carbon is electron deficient, so the nucleophile attacks it." },
        { q: "Which carbonyl compound is least reactive towards nucleophilic addition?", opts: ["Ethanal", "Propanone", "Methanal", "All are equally reactive"], correct: 1, explain: "Ketones are less reactive than aldehydes; propanone is a ketone." },
        { q: "Which is more acidic?", opts: ["Alcohols", "Carboxylic acids", "Both are equally acidic", "Neither is acidic"], correct: 1, explain: "The carboxylate ion is stabilised by delocalisation, so carboxylic acids are more acidic than alcohols." },
        { q: "What is the product of reducing propanone with NaBH4?", opts: ["Propan-1-ol", "Propan-2-ol", "Propanal", "Propanoic acid"], correct: 1, explain: "A ketone reduces to a secondary alcohol, here propan-2-ol." },
        { q: "Which reagent converts a ketone into a secondary alcohol?", opts: ["Silver nitrate", "NaBH4", "Concentrated sulfuric acid", "Bromine"], correct: 1, explain: "NaBH4 reduces a ketone to a secondary alcohol." }
      ]
    }
  ]
};
