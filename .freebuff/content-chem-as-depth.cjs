// Chemistry AS notes, deepened to the A2 structure and depth (WCH11 Topics 1 and 4,
// WCH12 Topics 6, 7, 9 and 10). Generated from .freebuff-tmp/deepen/notes/*.cjs.
// Apply with:
//   node .freebuff/deepen-materials.cjs .freebuff/content-chem-as-depth.cjs > .freebuff-tmp/chem-as-depth.sql
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/chem-as-depth.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/chem-as-depth.sql --apply    (live)
module.exports = {
  expectType: "notes",
  titles: {
    "da7c9bd7-2551-4f16-91a9-4f446f20ae69": "AS Level Chemistry: Energetics",
    "b43306b7-ef00-4507-9aac-7f10d5b32897": "AS Level Chemistry: Formulae, Equations and Amount of Substance",
    "7782b9f5-a0e8-4eb1-9179-6b98a1c02b52": "AS Level Chemistry: Intermolecular Forces",
    "d4516bc0-b215-49ea-904f-286fef0f33bc": "AS Level Chemistry: Introduction to Kinetics and Equilibria",
    "71c55ef2-c940-4622-9f26-8a46aa507130": "AS Level Chemistry: Introductory Organic Chemistry and Alkanes",
    "77dc68f0-c9d0-4be8-9750-22f6d69602de": "AS Level Chemistry: Halogenoalkanes, Alcohols and Spectra",
  },
  rows: {
    "da7c9bd7-2551-4f16-91a9-4f446f20ae69": `
<h2>AS Level Chemistry: Energetics</h2>
<p>Edexcel IAL Chemistry WCH12, Topic 6 covers the heat energy exchanged in chemical reactions: how enthalpy change is defined and measured, how calorimetry data is turned into a value per mole, how Hess's Law lets you find an enthalpy change you cannot measure directly, and what bond enthalpies can and cannot tell you. The calculations are straightforward once the definitions are exact, because most marks are lost through signs, units and the direction of a cycle rather than through arithmetic.</p>

<h3>Enthalpy change and standard conditions</h3>
<p>Enthalpy change, ΔH, is the heat energy change measured at constant pressure. In an open beaker the pressure is constant, so the heat exchanged is an enthalpy change; the units are kJ mol⁻¹.</p>
<p>Standard conditions are a pressure of 100 kPa and a stated temperature, usually 298 K. A standard enthalpy change symbol has a plimsoll mark, as in ΔH⦵. The substance must also be in its standard state, which is its usual physical state at 100 kPa and 298 K: water is liquid, bromine is liquid, carbon is graphite.</p>
<ul>
<li><strong>Exothermic</strong>: heat is released to the surroundings, the temperature rises, and ΔH is negative by convention.</li>
<li><strong>Endothermic</strong>: heat is absorbed from the surroundings, the temperature falls, and ΔH is positive.</li>
</ul>
<p>An enthalpy level diagram shows the two states as horizontal lines: products below reactants for an exothermic reaction with an arrow pointing down, products above reactants for an endothermic reaction with an arrow pointing up. The vertical axis is enthalpy, and the arrow is labelled with the value of ΔH including its sign.</p>
<p>The sign convention is worth remembering in one sentence: breaking bonds always absorbs energy, making bonds always releases it, and whether a reaction is exothermic depends on which of those two totals is larger.</p>

<h3>The five standard enthalpy definitions</h3>
<p>These definitions are marked word for word, so learn each one with its standard state and its "per mole of" condition.</p>
<table border="1" cellpadding="6">
<tr><th>Quantity</th><th>Definition</th></tr>
<tr><td>Standard enthalpy change of reaction, ΔrH⦵</td><td>The enthalpy change when the reaction occurs in the molar quantities shown in the chemical equation, under standard conditions.</td></tr>
<tr><td>Standard enthalpy change of formation, ΔfH⦵</td><td>The enthalpy change when one mole of a compound is formed from its elements in their standard states under standard conditions.</td></tr>
<tr><td>Standard enthalpy change of combustion, ΔcH⦵</td><td>The enthalpy change when one mole of a substance is completely burned in oxygen under standard conditions.</td></tr>
<tr><td>Standard enthalpy change of neutralisation, ΔneutH⦵</td><td>The enthalpy change when one mole of water is formed by the reaction of an acid with an alkali under standard conditions.</td></tr>
<tr><td>Standard enthalpy change of atomisation, ΔatH⦵</td><td>The enthalpy change when one mole of gaseous atoms is formed from the element in its standard state under standard conditions.</td></tr>
</table>
<p>By definition, the standard enthalpy change of formation of an element in its standard state is zero, because no change occurs in forming an element from itself. Atomisation is always endothermic, because bonds or intermolecular forces must be broken: ΔatH⦵ of sodium is the energy to turn Na(s) into Na(g), and for a diatomic element such as chlorine it is half the bond enthalpy of Cl–Cl, since only one mole of chlorine atoms is formed from half a mole of Cl2 molecules.</p>

<h3>Calorimetry: measuring an enthalpy change</h3>
<p>Two experiments are examinable. In the first, two solutions are mixed in an insulated container, typically a plastic cup, and the maximum temperature reached is recorded. In the second, a fuel is burned in a spirit burner beneath a copper calorimeter containing water, and the temperature rise of the water is recorded along with the change in mass of the burner.</p>
<p>The energy transferred to the surroundings is calculated with the specific heat capacity equation:</p>
<pre><code>energy transferred (J) = mass (g) × specific heat capacity (J g-1 °C-1) × temperature change (°C)</code></pre>
<p>The specific heat capacity of water is 4.18 J g⁻¹ °C⁻¹. Then the enthalpy change of the reaction is the energy transferred divided by the number of moles that reacted, converted to kJ mol⁻¹ and given the correct sign.</p>
<p><strong>Worked example (mixing).</strong> 50.0 cm³ of 1.00 mol dm⁻³ hydrochloric acid is mixed with 50.0 cm³ of 1.00 mol dm⁻³ sodium hydroxide. The temperature rises by 6.8 °C. Assume the solution has a density of 1.00 g cm⁻³ and the same specific heat capacity as water.</p>
<pre><code>q = 100 × 4.18 × 6.8 = 2842 J
n(H2O) = c × V = 1.00 × 0.0500 = 0.0500 mol
ΔH = -2842 / 0.0500 = -56 840 J mol-1 = -56.8 kJ mol-1</code></pre>
<p>The temperature rose, so the reaction is exothermic and the answer must be negative. The accepted value is about −57.3 kJ mol⁻¹ for a strong acid and strong alkali, so the result is close.</p>
<p><strong>Worked example (combustion).</strong> Burning 0.500 g of methanol raises the temperature of 100 g of water by 20.0 °C.</p>
<pre><code>q = 100 × 4.18 × 20.0 = 8360 J
n(CH3OH) = 0.500 / 32.0 = 0.0156 mol
ΔH = -8360 / 0.0156 = -536 000 J mol-1 = -536 kJ mol-1</code></pre>
<p>The data book value is −726 kJ mol⁻¹. The measured value is much less exothermic, and the evaluation should explain why: heat is lost to the surroundings and to the apparatus, the combustion is incomplete because a spirit burner burns in air and produces soot and carbon monoxide, methanol evaporates from the wick without burning, and the experiment is not carried out under standard conditions.</p>
<h4>Assumptions and error evaluation</h4>
<ul>
<li>The solution is assumed to have the density of water (1.00 g cm⁻³) and the specific heat capacity of water (4.18 J g⁻¹ °C⁻¹); a solution that is not mostly water makes this less valid.</li>
<li>All the heat released is assumed to raise the temperature of the solution or water; in practice the container absorbs some heat, so a plastic cup is used to reduce conduction losses. A lid reduces losses by evaporation and convection.</li>
<li>Heat loss means the measured temperature rise is too small, so the magnitude of ΔH is underestimated.</li>
<li>Temperature is read to the nearest 0.5 °C with a simple thermometer, which is a large percentage uncertainty for a small rise. Use a larger amount of reactant or a digital thermometer to improve the precision.</li>
<li>The reaction is assumed to be complete and instantaneous, and the mass of water is assumed constant.</li>
</ul>

<h3>Hess's Law</h3>
<p>Hess's Law states that the total enthalpy change of a reaction is independent of the route taken, provided the initial and final conditions are the same. It follows from the law of conservation of energy and allows an enthalpy change that cannot be measured directly, such as the formation of carbon monoxide or the hydration of an anhydrous salt, to be calculated from values that can be measured.</p>
<p>An enthalpy cycle is a diagram of alternative routes. Two forms are examined:</p>
<ul>
<li><strong>From formation data</strong>: the elements in their standard states are the bottom of the cycle. Reactants and products both form from the elements, so ΔH(reaction) = Σ ΔfH(products) − Σ ΔfH(reactants).</li>
<li><strong>From combustion data</strong>: the combustion products, usually carbon dioxide and water, are the bottom of the cycle. Both reactants and products burn to the same products, so ΔH(reaction) = Σ ΔcH(reactants) − Σ ΔcH(products).</li>
</ul>
<p>Notice that the two expressions are mirror images. In both, you go from the reactants down to the reference state and back up to the products, which is why the subtraction reverses. Learn the direction rather than memorising a formula you may apply backwards under pressure.</p>
<p><strong>Worked example (formation).</strong> Calculate ΔH for the combustion of methane: CH4(g) + 2O2(g) → CO2(g) + 2H2O(l), given ΔfH⦵ values of −75 kJ mol⁻¹ for methane, −394 kJ mol⁻¹ for carbon dioxide and −286 kJ mol⁻¹ for water.</p>
<pre><code>ΔH = [ΔfH(CO2) + 2 × ΔfH(H2O)] - [ΔfH(CH4) + 2 × ΔfH(O2)]
ΔH = [-394 + 2(-286)] - [-75 + 0]
ΔH = -966 + 75 = -891 kJ mol-1</code></pre>
<p>The answer is negative, as expected for a combustion. The accepted value is −890 kJ mol⁻¹.</p>
<p><strong>Worked example (combustion data).</strong> Calculate ΔH for the reaction C2H4(g) + H2(g) → C2H6(g) given ΔcH⦵ values of −1411 kJ mol⁻¹ for ethene, −286 kJ mol⁻¹ for hydrogen and −1560 kJ mol⁻¹ for ethane.</p>
<pre><code>ΔH = [ΔcH(C2H4) + ΔcH(H2)] - [ΔcH(C2H6)]
ΔH = [-1411 + (-286)] - [-1560] = -1697 + 1560 = -137 kJ mol-1</code></pre>
<p>The reaction is the addition of hydrogen across a double bond, so a modest exothermic value is a sensible check.</p>

<h3>Core Practical 2: enthalpy change using Hess's Law</h3>
<p>The enthalpy change of hydration of anhydrous copper(II) sulfate cannot be measured directly, because the anhydrous solid reacts violently with water and the hydration step cannot be isolated. It is found from two measurable dissolution experiments and a cycle.</p>
<pre><code>Route 1: CuSO4(s)  + aq  → CuSO4(aq)      ΔH1 (dissolving anhydrous)
Route 2: CuSO4(s)  → CuSO4.5H2O(s) → CuSO4(aq)   ΔH(hydration) then ΔH2 (dissolving hydrated)</code></pre>
<p>Both routes start with anhydrous copper(II) sulfate and end with the same aqueous solution, so the total enthalpy changes are equal:</p>
<pre><code>ΔH1 = ΔH(hydration) + ΔH2      so      ΔH(hydration) = ΔH1 - ΔH2</code></pre>
<p>Each dissolution is carried out in a insulated cup with a known mass of solid added to a known volume of water, recording the temperature change and calculating the enthalpy change per mole as in the calorimetry section. Since dissolving anhydrous copper(II) sulfate is strongly exothermic and dissolving the hydrated salt is slightly endothermic, the difference is large and negative. The evaluation must mention heat loss, the assumption about the specific heat capacity of the solution, and the uncertainty in reading a small temperature change.</p>

<h3>Bond enthalpies</h3>
<p>Bond enthalpy is the energy required to break one mole of a specified covalent bond in the gas phase. Mean bond enthalpy is the average energy required to break one mole of a specified covalent bond, averaged over a range of different compounds. The two are not the same: the O–H bond in water, in methanol and in ethanoic acid has a slightly different enthalpy in each, so data books quote averages.</p>
<p>For a reaction in the gas phase:</p>
<pre><code>ΔH = Σ bond enthalpies broken - Σ bond enthalpies formed</code></pre>
<p>Breaking bonds is endothermic (positive), making bonds is exothermic (negative). If more energy is released in forming the products' bonds than is absorbed in breaking the reactants' bonds, the reaction is exothermic and the value is negative.</p>
<p><strong>Worked example.</strong> Calculate ΔH for the hydrogenation of ethene, C2H4 + H2 → C2H6, using mean bond enthalpies in kJ mol⁻¹: C=C 612, C–C 348, C–H 413, H–H 436.</p>
<pre><code>Bonds broken: 1 × C=C (612) + 4 × C-H (1652) + 1 × H-H (436) = 2700 kJ mol-1
Bonds formed: 1 × C-C (348) + 6 × C-H (2478) = 2826 kJ mol-1
ΔH = 2700 - 2826 = -126 kJ mol-1</code></pre>
<p>The arithmetic is simple but the bookkeeping is not: count the C–H bonds on both sides carefully, because the product has two more than the reactants. A quick check is that the number of bonds formed should equal the number broken plus one, since the double bond becomes a single bond and an H–H bond is lost.</p>
<h4>Limitations of bond enthalpy calculations</h4>
<ul>
<li>The values are averages, so a calculation using mean bond enthalpies gives an approximate answer; the true value differs because the environment of a bond changes its strength.</li>
<li>The calculation assumes all species are gaseous. If the reaction produces a liquid, the enthalpy of condensation is not included, so the result differs from the standard enthalpy change.</li>
<li>Values are quoted for the gas phase, so reactions involving solids or liquids need additional enthalpy terms to be accurate.</li>
</ul>
<p>Reversing the equation is the other examined skill: given ΔH and every bond enthalpy except one, substitute into the bond enthalpy equation and solve for the unknown. For example, if ΔH for a reaction is known and the bonds broken total 2000 kJ mol⁻¹, then the bonds formed total 2000 − ΔH.</p>
<p>Bond enthalpy data also gives a qualitative indication of which bond will break first in a reaction: the bond with the lowest bond enthalpy is the easiest to break, so it breaks first and the reaction proceeds more rapidly at room temperature. This is why the C–I bond in iodoalkanes breaks more readily than the C–Cl bond in chloroalkanes, and why alkanes react only slowly with halogens in the dark: the C–H and C–C bonds are strong and need ultraviolet light or heat to start the reaction.</p>

<h3>Typical mistakes</h3>
<ul>
<li>Giving an exothermic enthalpy change a positive sign, or an endothermic one a negative sign.</li>
<li>Using the mass of the fuel burned instead of the mass of water heated in q = mcΔT.</li>
<li>Forgetting to divide the energy transferred by the number of moles, and reporting a value in kJ rather than kJ mol⁻¹.</li>
<li>Mixing up the formation and combustion cycles, or adding the values instead of subtracting in the correct direction.</li>
<li>Quoting a standard enthalpy of formation for an element as non-zero.</li>
<li>Treating a mean bond enthalpy as an exact value for a specific molecule.</li>
<li>Omitting the sign when writing the final answer, even when the working is correct.</li>
</ul>

<h3>Exam-style questions</h3>
<ol>
<li>Define the standard enthalpy change of combustion. Answer: the enthalpy change when one mole of a substance is completely burned in oxygen, with all reactants and products in their standard states at 100 kPa and a stated temperature, usually 298 K.</li>
<li>A student dissolves 4.00 g of ammonium nitrate in 50.0 g of water and the temperature falls from 21.0 °C to 16.5 °C. Calculate the enthalpy change of solution in kJ mol⁻¹. Answer: q = 50.0 × 4.18 × 4.5 = 941 J absorbed from the surroundings, so the solution is endothermic. n = 4.00 / 80.0 = 0.0500 mol, so ΔH = +941 / 0.0500 = +18 800 J mol⁻¹ = +18.8 kJ mol⁻¹.</li>
<li>Explain why the enthalpy of combustion of methanol measured with a spirit burner is less exothermic than the data book value. Answer: heat is lost to the surroundings and apparatus, combustion is incomplete because of limited oxygen, some methanol evaporates without burning, and the experiment is not carried out under standard conditions.</li>
<li>Use the bond enthalpies C–H 413, Cl–Cl 242 and C–Cl 328 kJ mol⁻¹, and H–Cl 432 kJ mol⁻¹, to calculate ΔH for CH4 + Cl2 → CH3Cl + HCl. Answer: bonds broken = 4(413) + 242 = 1894; bonds formed = 3(413) + 328 + 432 = 1999; ΔH = 1894 − 1999 = −105 kJ mol⁻¹.</li>
<li>The standard enthalpy change of formation of ethyne, C2H2, is +227 kJ mol⁻¹ and that of benzene, C6H6, is +49 kJ mol⁻¹. Explain what these values show about the stability of the two compounds relative to their elements. Answer: both are endothermic relative to their elements, so both are thermodynamically unstable with respect to decomposition into carbon and hydrogen. Ethyne is much less stable than benzene, which is consistent with benzene's delocalised ring and with ethyne's tendency to polymerise or decompose.</li>
</ol>
<p>Practise by writing the cycle before any numbers: a correctly drawn cycle makes the sign obvious. Then revise Kinetics, where activation energy and reaction profiles use the same enthalpy ideas to explain rate rather than feasibility.</p>
`,
    "b43306b7-ef00-4507-9aac-7f10d5b32897": `
<h2>AS Level Chemistry: Formulae, Equations and Amount of Substance</h2>
<p>Edexcel IAL Chemistry WCH11, Topic 1 is the quantitative foundation of the whole course: every later topic, from titrations to equilibria to organic mechanisms, is marked using the ideas here. This topic covers the vocabulary of formulae, relative masses and the mole, balanced and ionic equations with state symbols, concentration in mol dm⁻³ and ppm, empirical and molecular formulae from experimental data, reacting masses, gas volumes including pV = nRT, percentage yield and atom economy, and the two core practicals that turn these ideas into measurements.</p>

<h3>The language of formulae</h3>
<p>Chemistry names substances at three levels: the particle, the formula and the amount. The vocabulary is examined directly, so learn the definitions precisely.</p>
<ul>
<li><strong>Atom</strong>: the smallest particle of an element that can take part in a chemical reaction.</li>
<li><strong>Element</strong>: a substance containing only one type of atom; it cannot be broken down chemically into anything simpler.</li>
<li><strong>Ion</strong>: a particle with a charge produced when an atom or group of atoms loses or gains electrons.</li>
<li><strong>Molecule</strong>: two or more atoms joined by covalent bonds; it is the smallest particle of a covalent substance that can exist independently.</li>
<li><strong>Compound</strong>: a substance containing two or more elements chemically combined in fixed proportions.</li>
<li><strong>Empirical formula</strong>: the simplest whole-number ratio of atoms of each element in a compound.</li>
<li><strong>Molecular formula</strong>: the actual number of atoms of each element in one molecule of a compound.</li>
</ul>
<p>A molecular formula is a whole-number multiple of the empirical formula. Hydrogen peroxide has the empirical formula HO and the molecular formula H₂O₂; ethanoic acid has the empirical formula CH₂O and the molecular formula C₂H₄O₂. Compounds with giant structures, such as sodium chloride or silicon dioxide, have no molecules, so they are described by their empirical formula alone.</p>

<h3>Relative masses and the mole</h3>
<p>Relative atomic mass, Aᵣ, is the weighted mean mass of the atoms of an element compared with one twelfth of the mass of an atom of carbon-12. Because it is a mean, it takes account of the natural abundances of the isotopes, which is why chlorine has Aᵣ = 35.5 rather than a whole number.</p>
<p>Relative molecular mass, Mᵣ, is the sum of the relative atomic masses in a molecule. For compounds with giant structures, use the term relative formula mass instead: NaCl has a relative formula mass of 23.0 + 35.5 = 58.5. Molar mass, M, is the mass per mole of a substance in g mol⁻¹, and it is numerically equal to Mᵣ or the relative formula mass.</p>
<p>The mole is the unit for amount of substance. One mole contains the Avogadro number of particles, L = 6.02 × 10²³ mol⁻¹. Three relationships do nearly all the work in this topic:</p>
<table border="1" cellpadding="6">
<tr><th>Relationship</th><th>Use it for</th></tr>
<tr><td>n = m / M</td><td>converting a mass in grams to moles, and back</td></tr>
<tr><td>N = n × L</td><td>converting moles to a number of particles</td></tr>
<tr><td>n = c × V / 1000</td><td>moles from concentration in mol dm⁻³ and volume in cm³</td></tr>
</table>
<p><strong>Worked example.</strong> How many molecules are in 4.40 g of carbon dioxide? M(CO₂) = 12.0 + 2(16.0) = 44.0 g mol⁻¹, so n = 4.40 / 44.0 = 0.100 mol. Then N = 0.100 × 6.02 × 10²³ = 6.02 × 10²² molecules. The number of oxygen atoms is twice that, 1.20 × 10²³, because each molecule holds two oxygen atoms.</p>

<h3>Balanced equations, state symbols and ionic equations</h3>
<p>A balanced equation has the same number of atoms of each element on both sides, and the total charge must balance too. State symbols (s), (l), (g) and (aq) are part of the answer, not decoration: they are how you show that, for example, a reaction produces hydrogen gas rather than hydrogen atoms. Never change a formula to balance an equation; change only the coefficients. Balance the elements that appear once first, leave hydrogen and oxygen until the end, and check by counting a polyatomic ion such as sulfate or nitrate as one unit.</p>
<p>Ionic equations show only the species that change. To construct one, write the full equation, split every soluble ionic compound into its ions, then cancel the ions that appear unchanged on both sides. Those unchanged ions are spectator ions.</p>
<p><strong>Worked example.</strong> Silver nitrate solution added to sodium chloride solution:</p>
<pre><code>AgNO3(aq) + NaCl(aq) → AgCl(s) + NaNO3(aq)
Ag+(aq) + NO3−(aq) + Na+(aq) + Cl−(aq) → AgCl(s) + Na+(aq) + NO3−(aq)
Ag+(aq) + Cl−(aq) → AgCl(s)</code></pre>
<p>Sodium and nitrate ions appear on both sides unchanged, so they are spectators. The ionic equation shows the actual change: hydrated silver ions meeting chloride ions to form a white precipitate.</p>
<p>You must be able to link equations to test-tube observations. Displacement reactions, typical acid reactions and precipitation reactions all follow this pattern: the observation is a change in appearance, and the equation explains it.</p>
<table border="1" cellpadding="6">
<tr><th>Observation</th><th>Ionic equation</th></tr>
<tr><td>Magnesium added to dilute hydrochloric acid: fizzing, metal dissolves, gas pops with a lighted splint</td><td>Mg(s) + 2H+(aq) → Mg2+(aq) + H2(g)</td></tr>
<tr><td>Zinc added to copper(II) sulfate solution: blue colour fades, red-brown solid forms</td><td>Zn(s) + Cu2+(aq) → Zn2+(aq) + Cu(s)</td></tr>
<tr><td>Barium chloride solution added to sodium sulfate solution: white precipitate</td><td>Ba2+(aq) + SO42−(aq) → BaSO4(s)</td></tr>
<tr><td>Calcium carbonate added to nitric acid: fizzing, solid dissolves, gas turns limewater milky</td><td>CaCO3(s) + 2H+(aq) → Ca2+(aq) + H2O(l) + CO2(g)</td></tr>
</table>

<h3>Concentration, dilution and ppm</h3>
<p>Concentration is the amount of solute per unit volume of solution. Two units are used and both are examinable:</p>
<ul>
<li><strong>mol dm⁻³</strong> (molarity): moles of solute per cubic decimetre of solution. 1 dm³ = 1000 cm³.</li>
<li><strong>g dm⁻³</strong>: mass of solute per cubic decimetre of solution.</li>
</ul>
<p>The bridge between them is molar mass: g dm⁻³ = mol dm⁻³ × M. So 0.250 mol dm⁻³ sodium hydroxide contains 0.250 × 40.0 = 10.0 g dm⁻³.</p>
<p><strong>Worked example.</strong> 25.0 cm³ of 0.100 mol dm⁻³ sodium hydroxide is diluted to 250 cm³. The moles of solute do not change: n = 0.100 × 25.0 / 1000 = 2.50 × 10⁻³ mol. The new concentration is 2.50 × 10⁻³ / 0.250 = 0.0100 mol dm⁻³. Diluting tenfold divides the concentration by ten.</p>
<p>Parts per million, ppm, expresses very small proportions and is used for trace gases in the atmosphere and impurities in water. One ppm means one part in a million by mass or by volume, depending on the context:</p>
<pre><code>ppm = (mass of component / mass of sample) × 10^6</code></pre>
<p>If the atmosphere contains 410 ppm of carbon dioxide and the total pressure is 100 kPa, the partial pressure of carbon dioxide is 410 / 10⁶ × 100 kPa = 0.0410 kPa. The same number treated as a volume fraction gives 0.041 % by volume.</p>

<h3>Empirical and molecular formulae from experiment</h3>
<p>Experimental data is converted into a formula in four steps: mass, moles, simplify, then scale using the molar mass.</p>
<p><strong>Worked example.</strong> A compound contains 40.0 % carbon, 6.7 % hydrogen and 53.3 % oxygen by mass, and its molar mass is 180 g mol⁻¹.</p>
<table border="1" cellpadding="6">
<tr><th>Element</th><th>Mass in 100 g</th><th>Divide by Aᵣ</th><th>Divide by smallest</th></tr>
<tr><td>C</td><td>40.0</td><td>40.0 / 12.0 = 3.33</td><td>1</td></tr>
<tr><td>H</td><td>6.7</td><td>6.7 / 1.0 = 6.67</td><td>2</td></tr>
<tr><td>O</td><td>53.3</td><td>53.3 / 16.0 = 3.33</td><td>1</td></tr>
</table>
<p>The empirical formula is CH₂O, with empirical formula mass 30.0. The molecular formula is (CH₂O)n where n = 180 / 30.0 = 6, so the molecular formula is C6H12O6. Always check that a ratio such as 1 : 1.5 is multiplied through to 2 : 3 before writing a formula.</p>
<p>Two related experiments are examined. In a magnesium oxide determination, a known mass of magnesium is burned in a crucible, the lid is lifted periodically to let air in, and the mass of the white powder is found; the increase in mass is the mass of oxygen that combined. In a water-of-crystallisation determination, a hydrated salt is heated to constant mass and the loss in mass is the water driven off, giving the value of x in a formula such as CuSO4·xH2O. In both cases heating to constant mass is essential, and in both the evaluation should name the errors: some magnesium oxide may escape as smoke, magnesium may react with nitrogen in the air to form a nitride, or the heating may not have removed all the water.</p>

<h3>Reacting masses</h3>
<p>A reacting-mass calculation follows the same route every time: balance the equation, convert the known mass to moles, use the mole ratio, convert back to a mass.</p>
<p><strong>Worked example.</strong> What mass of iron is produced when 8.00 g of iron(III) oxide is reduced by carbon monoxide?</p>
<pre><code>Fe2O3 + 3CO → 2Fe + 3CO2</code></pre>
<p>M(Fe₂O₃) = 2(55.8) + 3(16.0) = 159.6 g mol⁻¹, so n(Fe₂O₃) = 8.00 / 159.6 = 0.0501 mol. The ratio is 1 : 2, so n(Fe) = 0.100 mol and m(Fe) = 0.100 × 55.8 = 5.59 g. Notice that the mass of the solid fell: the oxygen was removed as carbon dioxide, and mass is conserved because the carbon dioxide carries it away.</p>
<p>Where two reactant amounts are given, one will be limiting. Calculate the moles of each, divide by the coefficient in the balanced equation, and the smaller quotient is the limiting reactant. The other is in excess and does not take part fully. All product calculations use the limiting reactant.</p>

<h3>Gas volumes, molar volume and pV = nRT</h3>
<p>One mole of any gas occupies the same volume at the same temperature and pressure. At room temperature and pressure, this molar volume is approximately 24 dm³ mol⁻¹, so 0.0500 mol of any gas occupies 1.20 dm³. Use this only when the conditions are stated as room temperature and pressure.</p>
<p>When conditions differ, use the ideal gas equation:</p>
<pre><code>pV = nRT</code></pre>
<p>In this equation p is in pascals, V in m³, n in moles, T in kelvin and R = 8.31 J K⁻¹ mol⁻¹. Unit conversion causes most lost marks: 1 kPa = 1000 Pa, 1 dm³ = 1 × 10⁻³ m³, and T = θ + 273.</p>
<p><strong>Worked example.</strong> A 0.250 g sample of a volatile liquid is vaporised in a syringe at 100 °C and 100 kPa, and occupies 97 cm³. Find its molar mass.</p>
<p>p = 100 000 Pa, V = 97 × 10⁻⁶ m³, T = 373 K. Then n = pV / RT = (100000 × 97 × 10⁻⁶) / (8.31 × 373) = 9.7 / 3099 = 3.13 × 10⁻³ mol. M = m / n = 0.250 / 3.13 × 10⁻³ = 79.9 g mol⁻¹, so the liquid is likely a small molecule such as benzene (Mᵣ = 78).</p>

<h3>Percentage yield and atom economy</h3>
<p>Percentage yield compares what you actually obtained with the maximum the equation allows:</p>
<pre><code>percentage yield = (actual yield / theoretical yield) × 100</code></pre>
<p>Reasons for a yield below 100 % include incomplete reaction, reversible reactions, loss during transfer or filtration, side reactions producing other products, and impurities in the reactants.</p>
<p>Atom economy asks a different question: how much of the mass of all the reactants ends up in the product you want?</p>
<pre><code>atom economy = (molar mass of desired product / sum of molar masses of all products) × 100</code></pre>
<p><strong>Worked example.</strong> Ethene is hydrated to ethanol: C2H4 + H2O → C2H5OH. The only product is ethanol, so the atom economy is 100 %, even though the yield may be well below that because the reaction is reversible. Compare the synthesis of bromoethane from ethene and hydrogen bromide: C2H4 + HBr → C2H5Br also has 100 % atom economy. In a reaction such as CH4 + Cl2 → CH3Cl + HCl, the desired product has Mᵣ = 50.5 and the products total 50.5 + 36.5 = 87.0, so the atom economy is 58.0 %. The HCl is a co-product with little value, which is why industry prefers addition reactions to substitutions.</p>

<h3>Core Practical 1: measurement of the molar volume of a gas</h3>
<p>A known mass of magnesium ribbon reacts with excess dilute hydrochloric acid and the hydrogen is collected in a gas syringe. The apparatus is assembled and checked for leaks, the acid is added, and the final syringe reading is taken once the reaction has finished and the apparatus has cooled to room temperature.</p>
<pre><code>Mg(s) + 2HCl(aq) → MgCl2(aq) + H2(g)</code></pre>
<p><strong>Calculation.</strong> If 0.024 g of magnesium gives 24.0 cm³ of hydrogen, n(Mg) = 0.024 / 24.3 = 9.88 × 10⁻⁴ mol, and the ratio is 1 : 1, so n(H₂) is the same. The molar volume is 24.0 / 9.88 × 10⁻⁴ = 24 300 cm³ mol⁻¹ = 24.3 dm³ mol⁻¹, close to the accepted 24.0 dm³ mol⁻¹ at room temperature and pressure.</p>
<p><strong>Evaluation.</strong> The main sources of error are gas escaping before the bung is replaced, a syringe that sticks or leaks, the temperature not being room temperature when the reading is taken, and the small mass of magnesium producing a large percentage uncertainty in mass. Using a larger mass of magnesium reduces the percentage uncertainty but needs a larger syringe.</p>

<h3>Typical mistakes</h3>
<ul>
<li>Using the mass of a solution rather than the mass of solute, or forgetting to divide by 1000 when converting cm³ to dm³.</li>
<li>Rounding an empirical formula ratio such as 1 : 2.5 to 1 : 3 instead of doubling it to 2 : 5.</li>
<li>Changing a subscript to balance an equation instead of the coefficient in front of the formula.</li>
<li>Leaving state symbols out of an equation when the question asks for a full equation, or including spectator ions in an ionic equation.</li>
<li>Forgetting to convert temperature to kelvin, or pressure to pascals, in pV = nRT.</li>
<li>Using the actual yield as the theoretical yield in a percentage-yield calculation.</li>
<li>Calculating atom economy from the reactants rather than from the products.</li>
</ul>

<h3>Exam-style questions</h3>
<ol>
<li>Define the terms empirical formula and molecular formula, using a compound of your choice to show the difference. Answer: the empirical formula is the simplest whole-number ratio of atoms of each element; the molecular formula is the actual number of atoms of each element in a molecule. Ethanoic acid has the empirical formula CH2O and the molecular formula C2H4O2.</li>
<li>0.500 g of a hydrated salt, MgSO4·xH2O, is heated to constant mass and 0.244 g of anhydrous magnesium sulfate remains. Find x. Answer: mass of water lost = 0.500 − 0.244 = 0.256 g. n(MgSO4) = 0.244 / 120.4 = 2.03 × 10⁻³ mol; n(H2O) = 0.256 / 18.0 = 1.42 × 10⁻² mol. The ratio is 1.42 × 10⁻² / 2.03 × 10⁻³ = 7.0, so x = 7 and the formula is MgSO4·7H2O.</li>
<li>Write the ionic equation, with state symbols, for the reaction between aqueous sodium carbonate and dilute hydrochloric acid, and state one observation. Answer: CO32−(aq) + 2H+(aq) → CO2(g) + H2O(l); effervescence, and the gas turns limewater milky.</li>
<li>25.0 cm³ of 0.150 mol dm⁻³ hydrochloric acid is neutralised by 0.100 mol dm⁻³ sodium hydroxide. Calculate the volume of alkali required. Answer: n(HCl) = 0.150 × 25.0 / 1000 = 3.75 × 10⁻³ mol. HCl + NaOH → NaCl + H2O, so n(NaOH) = 3.75 × 10⁻³ mol and V = n / c = 3.75 × 10⁻³ / 0.100 = 0.0375 dm³ = 37.5 cm³.</li>
<li>Explain why the percentage yield of a reaction can be less than 100 %, and why a reaction with a high percentage yield can still have a low atom economy. Answer: the yield is reduced by incomplete reaction, side reactions, losses in transfer and purification, or by the reaction being reversible. Atom economy depends only on the balanced equation, so a reaction can convert nearly all the limiting reactant into products while most of the product mass is an unwanted co-product.</li>
</ol>
<p>Revise this topic by practising calculations with the units written at every step, because each mark scheme rewards the mole ratio and the correct final unit as much as the numerical answer. Next, move to Atomic Structure and the Periodic Table, where the mole is used again for relative atomic mass and mass spectra.</p>
`,
    "7782b9f5-a0e8-4eb1-9179-6b98a1c02b52": `
<h2>AS Level Chemistry: Intermolecular Forces</h2>
<p>Edexcel IAL Chemistry WCH12, Topic 7 explains the forces that hold molecules to one another, as distinct from the covalent bonds inside them. These forces are far weaker than covalent bonds, yet they decide boiling temperature, volatility, solubility and the anomalous behaviour of water, and they are the reason a molecule with polar bonds is not necessarily a polar molecule. Examiners test the explanation rather than the label, so every answer should name the force, say what causes it, and relate it to the property asked about.</p>

<h3>Three types of intermolecular force</h3>
<p>All intermolecular forces are electrostatic: they arise from the attraction between regions of opposite charge. They differ in what creates those regions.</p>
<table border="1" cellpadding="6">
<tr><th>Force</th><th>Origin</th><th>Typical strength</th></tr>
<tr><td>London forces (instantaneous dipole–induced dipole)</td><td>Fluctuating electron density in one molecule induces a dipole in a neighbour</td><td>Very weak, but increases with the number of electrons</td></tr>
<tr><td>Permanent dipole–permanent dipole</td><td>Permanently polar bonds and an asymmetric shape leave one end of the molecule slightly positive and the other slightly negative</td><td>Weak, roughly 5–20 kJ mol⁻¹</td></tr>
<tr><td>Hydrogen bonding</td><td>A hydrogen atom bonded to N, O or F is attracted to a lone pair on N, O or F in another molecule</td><td>Strongest of the three, up to about 40 kJ mol⁻¹</td></tr>
</table>

<h3>London forces</h3>
<p>Electrons are in constant motion, so at any instant the electron distribution in a molecule may be uneven. That creates an instantaneous dipole, which in turn distorts the electron cloud of a neighbouring molecule and induces a dipole in it. The two dipoles then attract. The effect is present in every substance, including the noble gases and non-polar molecules such as methane, and it is the only intermolecular force in a non-polar substance.</p>
<p>The strength of London forces depends on how easily the electron cloud can be distorted, which is called polarisability. Two factors control it:</p>
<ul>
<li><strong>Number of electrons</strong>: more electrons means a larger, more polarisable cloud. Iodine (I₂) is a solid and chlorine (Cl₂) a gas at room temperature for this reason.</li>
<li><strong>Surface area and shape</strong>: a long unbranched chain has more surface contact between neighbouring molecules than a compact branched isomer with the same formula, so it has stronger London forces.</li>
</ul>
<p>London forces are also the reason why a noble gas such as argon can be liquefied at low temperature, even though its atoms have no permanent dipole and no bonds to break.</p>

<h3>Permanent dipole–dipole interactions</h3>
<p>A bond between atoms of different electronegativity is polar: the more electronegative atom carries a partial negative charge, δ−, and the less electronegative atom carries δ+. If the molecule is not symmetrical, the individual bond dipoles do not cancel, and the molecule as a whole has a permanent dipole. Neighbouring molecules then line up with opposite ends together, and the attraction is a permanent dipole–permanent dipole interaction.</p>
<p>Hydrogen chloride, HCl, is polar and its molecules attract this way. Carbon dioxide has two polar C=O bonds, but the molecule is linear and symmetrical, so the dipoles cancel exactly and CO₂ has no permanent dipole; its molecules are held only by London forces. Tetrachloromethane, CCl₄, is also symmetrical and non-polar for the same reason, while trichloromethane, CHCl₃, is polar because the fourth substituent is hydrogen rather than chlorine and the symmetry is broken. Whether a molecule is polar therefore needs two checks: are the bonds polar, and is the shape symmetrical?</p>

<h3>Hydrogen bonding</h3>
<p>Hydrogen bonding is a particularly strong form of permanent dipole attraction. It occurs only when two conditions are satisfied:</p>
<ul>
<li>A hydrogen atom is covalently bonded to a highly electronegative atom, limited to nitrogen, oxygen or fluorine.</li>
<li>A lone pair is available on an N, O or F atom in a neighbouring molecule, which the δ+ hydrogen can approach.</li>
</ul>
<p>The result is a strong attraction between the δ+ hydrogen and the lone pair, often drawn as a dotted line: O–H···O. The bond is directional, which is why hydrogen bonding produces specific structures rather than a random arrangement.</p>
<p>Water, ammonia and hydrogen fluoride all hydrogen bond:</p>
<table border="1" cellpadding="6">
<tr><th>Substance</th><th>Hydrogen-bonding unit</th><th>Number of hydrogen bonds per molecule in the liquid</th></tr>
<tr><td>H₂O</td><td>O–H···O</td><td>Two hydrogen atoms and two lone pairs allow an extensive network</td></tr>
<tr><td>NH₃</td><td>N–H···N</td><td>Three hydrogen atoms but only one lone pair, so fewer bonds than water</td></tr>
<tr><td>HF</td><td>F–H···F</td><td>One hydrogen atom and three lone pairs; chains of HF molecules</td></tr>
</table>
<p>Hydrogen bonding is not the same as a covalent bond to hydrogen. It is an intermolecular attraction, so it is broken when a substance melts or boils, while the O–H covalent bond stays intact. That distinction is worth stating explicitly in an answer.</p>

<h3>The anomalous properties of water</h3>
<p>Water's properties do not follow the pattern of similar molecules, and hydrogen bonding is the explanation.</p>
<p><strong>High melting and boiling temperatures.</strong> Compared with hydrogen sulfide, H₂S, which has a similar formula, water boils about 160 °C higher. The molecules of H₂S are held only by London forces and weak dipole–dipole attractions, whereas each water molecule can hydrogen bond to several neighbours. Breaking those attractions needs far more energy, so the melting and boiling temperatures are unusually high, and water is a liquid at room temperature while H₂S is a gas.</p>
<p><strong>Ice is less dense than liquid water.</strong> In ice, each water molecule hydrogen bonds to four neighbours in a regular tetrahedral arrangement, which holds the molecules further apart than in the liquid and leaves open hexagonal spaces. When ice melts, much of that open framework collapses and the molecules pack more closely, so liquid water is denser than ice. This is why ice floats, and why a lake freezes from the top, insulating the water beneath and allowing aquatic life to survive.</p>
<p>Hydrogen bonding also gives water a high surface tension, a high specific heat capacity and a high enthalpy of vaporisation, all of which follow from the energy needed to overcome the network of hydrogen bonds.</p>

<h3>Predicting hydrogen bonding</h3>
<p>To decide whether a molecule can hydrogen bond, look for an O–H, N–H or F–H group and for a lone pair on O, N or F. Ethanol, CH₃CH₂OH, can hydrogen bond because of its O–H group; ethanal, CH₃CHO, has a C=O bond with lone pairs but no hydrogen attached to an electronegative atom, so it cannot donate a hydrogen bond, although its oxygen can accept one. A molecule such as CH₃F has no H–F bond, so it does not hydrogen bond. Methanol and water mix in all proportions because both can both donate and accept hydrogen bonds, whereas methane, with only C–H bonds, cannot.</p>

<h3>Intermolecular forces and physical properties</h3>
<p>Boiling temperature is a measure of the energy needed to separate molecules, so it reports the strength of the intermolecular forces, not the strength of the covalent bonds. Four trends are examined.</p>
<p><strong>Boiling temperature of alkanes increases with chain length.</strong> Each additional CH₂ group adds electrons and surface area, so the London forces between the molecules become stronger and more energy is needed to separate them. Methane boils at −162 °C, ethane at −89 °C and decane at 174 °C.</p>
<p><strong>Branching lowers the boiling temperature.</strong> Pentane and 2,2-dimethylpropane have the same molecular formula, but the branched molecule is more compact. Its molecules have less surface contact, so its London forces are weaker and it boils at 9.5 °C compared with 36 °C for pentane. The same reasoning explains why branched isomers have lower boiling temperatures throughout the alkanes.</p>
<p><strong>Alcohols have higher boiling temperatures than alkanes of similar electron count.</strong> Ethanol (46 electrons) boils at 78 °C while propane (26 electrons) boils at −42 °C. The comparison is not quite like for like, but the key point is that ethanol molecules hydrogen bond through the O–H group, while propane molecules have only London forces. The hydrogen bonding more than compensates for the smaller number of electrons.</p>
<p><strong>Boiling temperatures of the hydrogen halides are not a simple trend.</strong> HF is the highest because of hydrogen bonding. From HCl to HBr to HI, London forces grow as the number of electrons increases, so the boiling temperatures rise in that order: HCl −85 °C, HBr −67 °C, HI −35 °C. HF, at 20 °C, sits far above the smooth trend, and that outlier is the evidence for hydrogen bonding.</p>

<h3>Choosing a solvent</h3>
<p>Dissolving depends on the solute particles being separated and surrounded by solvent particles, so the solute–solvent attractions must be comparable to the forces they replace. In practice, like dissolves like.</p>
<ul>
<li><strong>Water dissolves ionic compounds</strong> because the polar water molecules attract the ions: the partially negative oxygen surrounds a cation and the partially positive hydrogens surround an anion. This is hydration, and it releases hydration enthalpy that helps to compensate for the lattice enthalpy that must be overcome.</li>
<li><strong>Water dissolves simple alcohols</strong> such as methanol and ethanol, because the alcohol's O–H group can both donate a hydrogen bond to water and accept one from it. As the hydrocarbon chain grows, the non-polar part becomes a larger fraction of the molecule and solubility falls: ethanol mixes with water in all proportions, but hexan-1-ol is only slightly soluble.</li>
<li><strong>Water is a poor solvent for halogenoalkanes and other polar organic molecules</strong> such as chloroethane. The molecule has a dipole, so it is attracted to water to some extent, but it has no O–H group and cannot hydrogen bond with water, and its hydrocarbon part cannot interact favourably with the water network. The solute–solvent attractions are too weak to overcome the hydrogen bonding between water molecules.</li>
<li><strong>Non-aqueous solvents are used when the solute's intermolecular forces resemble the solvent's.</strong> Iodine, a non-polar molecule held by London forces, dissolves in hexane, which is also non-polar; bromine dissolves in cyclohexane for the same reason. Propanone is a useful intermediate case, dissolving both polar and many non-polar substances because it has a polar C=O group and a hydrocarbon part.</li>
</ul>
<p>A good answer states the force between solvent molecules, the force between solute and solvent, and whether the second is strong enough to replace the first.</p>

<h3>Typical mistakes</h3>
<ul>
<li>Saying a substance has hydrogen bonds when the hydrogen is bonded to carbon; only N–H, O–H and F–H count.</li>
<li>Describing hydrogen bonding as a covalent bond, or claiming that boiling water breaks O–H bonds.</li>
<li>Assuming that a molecule with polar bonds must be polar, without checking whether the shape cancels the dipoles.</li>
<li>Attributing the trend in alkane boiling temperatures to stronger covalent bonds rather than to stronger London forces.</li>
<li>Explaining branching by saying the molecule has fewer electrons; the number of electrons is the same, the surface contact is not.</li>
<li>Explaining the lower density of ice as an expansion on freezing without mentioning the open hydrogen-bonded lattice.</li>
<li>Describing London forces as "weak covalent forces" or as attractions between permanent dipoles.</li>
</ul>

<h3>Exam-style questions</h3>
<ol>
<li>Explain why the boiling temperature of iodine is higher than that of chlorine. Answer: iodine has more electrons and a larger, more polarisable electron cloud, so the London forces between its molecules are stronger; more energy is needed to separate the molecules.</li>
<li>Explain why 2-methylbutane has a lower boiling temperature than pentane. Answer: both have the molecular formula C5H12 and the same number of electrons. 2-methylbutane is more branched and more compact, so its molecules have less surface area in contact, the London forces between them are weaker, and less energy is needed to separate them.</li>
<li>Explain, in terms of intermolecular forces, why ethanol is soluble in water but chloroethane is not. Answer: ethanol has an O–H group and can both donate and accept hydrogen bonds with water, so the solute–solvent attractions are strong enough to replace the hydrogen bonds between water molecules. Chloroethane is polar but has no O–H group, so it cannot hydrogen bond with water; its attractions to water are too weak to compensate for breaking the water–water hydrogen bonds.</li>
<li>Explain why ice is less dense than liquid water. Answer: in ice each water molecule forms hydrogen bonds to four neighbours in a tetrahedral arrangement, producing an open lattice with spaces between the molecules. When ice melts the lattice collapses and the molecules pack more closely, so the liquid is denser.</li>
<li>Identify the strongest intermolecular force in each of the following and justify your answer: (a) HCl, (b) CH₃OH, (c) CCl₄. Answer: (a) permanent dipole–permanent dipole, because the molecule is polar and has no O–H, N–H or F–H group; (b) hydrogen bonding, because of the O–H group; (c) London forces, because the molecule is symmetrical and the bond dipoles cancel, so it is non-polar.</li>
</ol>
<p>When revising, practise the three-part answer: name the force, explain what causes it in these molecules, then link it to the property in the question. Move on to Introduction to Kinetics and Equilibria next, where the same molecular picture explains why reactions need collisions with sufficient energy.</p>
`,
    "d4516bc0-b215-49ea-904f-286fef0f33bc": `
<h2>AS Level Chemistry: Introduction to Kinetics and Equilibria</h2>
<p>Edexcel IAL Chemistry WCH12, Topic 9 joins two questions that are often confused: how fast a reaction goes, and how far it goes. Kinetics is explained by collision theory and the Maxwell–Boltzmann distribution of molecular energies; equilibrium is described by Le Chatelier's principle and the compromise between yield and rate that industry must make. The topic rewards precise language: "faster" describes rate, "more product at equilibrium" describes position, and the two are not the same thing.</p>

<h3>Collision theory</h3>
<p>For a reaction to happen, particles must collide with enough energy to break the bonds that need breaking. That minimum energy is the activation energy, Ea. Most collisions do not have it, so most collisions do not lead to reaction. The rate depends on two things: how often effective collisions occur, and what fraction of collisions is effective.</p>
<ul>
<li><strong>Concentration</strong>: a higher concentration means more particles per unit volume, so more frequent collisions and a faster rate.</li>
<li><strong>Pressure (gases)</strong>: compressing a gas has the same effect as raising its concentration; the particles are closer together and collide more often.</li>
<li><strong>Surface area</strong>: a powder exposes more surface than a single lump of the same mass, so more particles are available to collide and the rate increases. This is why powdered calcium carbonate reacts faster than marble chips.</li>
<li><strong>Temperature</strong>: raising the temperature makes particles move faster, so collisions are more frequent, but the dominant effect is that a much larger fraction of collisions has energy greater than Ea. A rule of thumb is that a 10 °C rise roughly doubles the rate of a reaction near room temperature.</li>
<li><strong>Catalyst</strong>: provides an alternative route with a lower activation energy, so a larger fraction of collisions is effective.</li>
</ul>

<h3>Measuring rate</h3>
<p>Rate is the change in amount of a reactant or product per unit time. Two simple measurements are examined:</p>
<ul>
<li><strong>Rate = 1 / time</strong>: useful when a reaction is followed to a visible endpoint, such as the disappearance of a cross seen through cloudy sulfur, or a colour change. The units are s⁻¹.</li>
<li><strong>Gradient of a graph</strong>: plot concentration, volume of gas or mass against time, and draw a tangent to the curve. The gradient at t = 0 is the initial rate; the gradient at any later time gives the rate at that moment. A steeper gradient means a faster reaction.</li>
</ul>
<p>Because the rate falls as reactants are used up, the curve flattens; that is why the initial rate is usually the cleanest measurement, and why comparing experiments by initial rate removes the complication of changing concentration during the measurement.</p>
<p><strong>Worked example.</strong> Magnesium ribbon is added to excess hydrochloric acid and the volume of hydrogen is recorded every 10 s. The volume rises quickly at first and then more slowly as the acid is used up. The initial rate is found by drawing a tangent at t = 0 to the volume–time curve and dividing the gradient by the molar volume; the units are cm³ s⁻¹ or, after conversion, mol dm⁻³ s⁻¹.</p>

<h3>The Maxwell–Boltzmann distribution</h3>
<p>The Maxwell–Boltzmann distribution plots the number of molecules with each energy at a fixed temperature. Its shape matters as much as its position:</p>
<ul>
<li>The curve starts at the origin, because no molecule has zero energy.</li>
<li>It rises to a peak at the most probable energy and then tails off to the right, because a small number of molecules have very high energies.</li>
<li>The area under the curve represents the total number of molecules, so the area is the same at every temperature.</li>
<li>A vertical line at Ea separates the molecules that can react from those that cannot; the area to the right of Ea is the fraction with sufficient energy.</li>
</ul>
<p>Raising the temperature has three effects on the curve: the peak moves to the right, the peak becomes lower, and the curve spreads out. The area beyond Ea increases markedly, which is the main reason a small temperature rise produces a large rate increase. Increasing the concentration does not change the shape of the distribution at all; it moves a larger number of molecules into the same distribution, so the area under the curve increases while the fraction with E ≥ Ea stays the same.</p>
<p>Adding a catalyst moves Ea to the left. The curve does not move, but a much larger area now lies beyond the new, lower activation energy, so many more collisions are effective.</p>

<h3>Catalysts and reaction profiles</h3>
<p>A catalyst increases the rate of a reaction by providing an alternative reaction route of lower activation energy; it is not used up, and it does not change the position of equilibrium or the enthalpy change of the reaction. It may be homogeneous (same phase as the reactants) or heterogeneous (different phase, often a solid surface).</p>
<p>A reaction profile plots enthalpy against reaction progress. For an uncatalysed reaction, the curve rises from the reactants to a single maximum and falls to the products. For a catalysed reaction, the curve rises to a lower maximum, and a shallow well appears in the middle representing the intermediate formed between the catalyst and the reactants. The enthalpy of the reactants and products is unchanged, so the catalysed and uncatalysed profiles start and finish at the same levels; only the height of the barrier differs.</p>
<p>Catalysts matter industrially for sustainability as well as speed. A lower activation energy means the process can run at a lower temperature, which saves energy and reduces carbon dioxide emissions; a catalyst can also allow a route with higher atom economy or fewer waste products, and it can make a reaction selective enough that less starting material is wasted.</p>

<h3>Dynamic equilibrium</h3>
<p>Many reactions are reversible. In a closed system, the forward and reverse reactions eventually occur at equal rates, and the concentrations of reactants and products stop changing. This is dynamic equilibrium, and "dynamic" is the key word: both reactions are still happening, at the same rate, so there is no net change in amounts.</p>
<ul>
<li>The rate of the forward reaction equals the rate of the backward reaction.</li>
<li>The concentrations of reactants and products remain constant, not necessarily equal.</li>
<li>Equilibrium is only reached in a closed system, because otherwise a product can escape and the reverse reaction cannot keep up.</li>
<li>A catalyst does not change the position of equilibrium; it only shortens the time taken to reach it, because it speeds up both directions equally.</li>
</ul>

<h3>Le Chatelier's principle</h3>
<p>Le Chatelier's principle states that when a system at equilibrium is subjected to a change, the position of equilibrium shifts to oppose that change. The changes examined are temperature, pressure and concentration.</p>
<table border="1" cellpadding="6">
<tr><th>Change</th><th>Shift</th><th>Reason</th></tr>
<tr><td>Increase temperature</td><td>In the endothermic direction</td><td>The system absorbs the extra heat, so the yield of the endothermic side rises</td></tr>
<tr><td>Decrease temperature</td><td>In the exothermic direction</td><td>The system releases heat to oppose the cooling</td></tr>
<tr><td>Increase pressure</td><td>Towards the side with fewer moles of gas</td><td>The system reduces the pressure by occupying less volume</td></tr>
<tr><td>Decrease pressure</td><td>Towards the side with more moles of gas</td><td>The system increases the pressure</td></tr>
<tr><td>Increase concentration of a reactant</td><td>Towards the products</td><td>The extra reactant is used up</td></tr>
<tr><td>Remove a product</td><td>Towards the products</td><td>The system replaces what was removed</td></tr>
</table>
<p>Pressure has no effect when the number of moles of gas is the same on both sides, as in H₂(g) + I₂(g) ⇌ 2HI(g), because there is no side with fewer gas moles to favour.</p>
<p><strong>Worked example.</strong> For the Haber process, N₂(g) + 3H₂(g) ⇌ 2NH₃(g), ΔH is negative. Increasing the pressure shifts the equilibrium to the right, because four moles of gas become two, and the yield of ammonia rises. Increasing the temperature shifts the equilibrium to the left, because the forward reaction is exothermic, so the yield falls even though the rate rises. Removing ammonia as it forms shifts the equilibrium to the right and increases the yield further.</p>

<h3>Compromise between yield and rate</h3>
<p>Industrial conditions are not chosen to maximise yield alone. A low temperature gives a high equilibrium yield for an exothermic reaction but an impractically slow rate; a very high pressure gives a high yield but requires expensive, energy-hungry compression equipment and thick-walled vessels. The chosen conditions are a compromise, and the examiner expects both halves of that argument.</p>
<table border="1" cellpadding="6">
<tr><th>Process</th><th>Equation</th><th>Conditions</th><th>Reasoning</th></tr>
<tr><td>Haber process</td><td>N₂ + 3H₂ ⇌ 2NH₃, ΔH negative</td><td>About 450 °C, 200 atm, iron catalyst</td><td>A moderate temperature balances yield against rate; high pressure favours the two-mole product side; the catalyst allows a workable rate at that temperature</td></tr>
<tr><td>Contact process</td><td>2SO₂ + O₂ ⇌ 2SO₃, ΔH negative</td><td>About 450 °C, 1–2 atm, vanadium(V) oxide catalyst</td><td>High pressure would improve yield but is not economic because the uncatalysed conversion is already high; a lower temperature would give more SO₃ but too slowly</td></tr>
<tr><td>Esterification</td><td>Acid + alcohol ⇌ ester + water</td><td>Reflux with acid catalyst, removing water</td><td>The reaction is reversible and has no favourable pressure change, so removing a product shifts the equilibrium to the right</td></tr>
</table>
<p>Data questions ask you to evaluate these choices: calculate the yield at two temperatures from a graph, or explain why a plant uses a pressure lower than the theoretical optimum. The answer is always the same shape: yield, rate, energy cost, equipment cost and safety.</p>

<h3>Typical mistakes</h3>
<ul>
<li>Saying a catalyst increases the yield at equilibrium, when it only shortens the time taken to reach equilibrium.</li>
<li>Claiming that increasing concentration or pressure changes the shape of the Maxwell–Boltzmann distribution; only temperature does.</li>
<li>Forgetting that the area under the Maxwell–Boltzmann curve is constant, so raising the temperature lowers the peak.</li>
<li>Writing that the rates of the forward and reverse reactions are equal in value but not saying they are equal and opposite, or that concentrations are constant rather than equal.</li>
<li>Applying pressure changes to reactions with equal moles of gas on both sides.</li>
<li>Using "more collisions" as the whole explanation for a temperature increase, when the fraction of collisions with E ≥ Ea is the dominant effect.</li>
<li>Describing equilibrium as static, or saying the reaction has stopped.</li>
</ul>

<h3>Exam-style questions</h3>
<ol>
<li>Explain, using collision theory, why increasing the surface area of a solid reactant increases the rate of reaction. Answer: a larger surface area exposes more particles to collision with the other reactant, so collisions occur more frequently and the rate increases.</li>
<li>Sketch the Maxwell–Boltzmann distribution at two temperatures and use it to explain why a small increase in temperature causes a large increase in rate. Answer: at the higher temperature the curve is flatter and shifted to the right, so a much larger area lies beyond Ea; the fraction of molecules with energy at least Ea is therefore much greater, and far more collisions are effective.</li>
<li>For the reaction 2SO₂(g) + O₂(g) ⇌ 2SO₃(g), ΔH negative, state and explain the effect on the equilibrium yield of SO₃ of (a) increasing the pressure, (b) increasing the temperature. Answer: (a) the equilibrium shifts to the right, towards the side with fewer moles of gas (three moles to two), so the yield rises; (b) the equilibrium shifts to the left, in the endothermic direction, so the yield falls.</li>
<li>Explain why the Haber process is not operated at the temperature that would give the highest equilibrium yield. Answer: the forward reaction is exothermic, so a low temperature gives a high yield, but at low temperature the rate is impractically slow even with a catalyst. About 450 °C is a compromise that gives an acceptable yield at a workable rate.</li>
<li>A reaction profile shows the products at a higher enthalpy than the reactants. State whether the reaction is exothermic or endothermic, and describe how the profile changes when a catalyst is added. Answer: the reaction is endothermic because the products have more enthalpy. With a catalyst, the maximum is lower and an intermediate well appears, but the reactant and product levels are unchanged.</li>
</ol>
<p>Revise by separating the two ideas in your notes: kinetics explains rate through collisions and activation energy, equilibrium explains position through opposing changes. Then move to Organic Chemistry, where the same ideas of bond strength and energy reappear in reaction mechanisms.</p>
`,
    "71c55ef2-c940-4622-9f26-8a46aa507130": `
<h2>AS Level Chemistry: Introductory Organic Chemistry and Alkanes</h2>
<p>Edexcel IAL Chemistry WCH11, Topic 4 introduces organic chemistry: how carbon compounds are named and drawn, how reactions are classified, how bonds break, and how alkanes are obtained and used. It also carries the safety material on hazard and risk, which is examined in a short-answer question nearly every year. The topic is the vocabulary and grammar of everything that follows, so the mechanisms and IUPAC rules must be exact rather than approximate.</p>

<h3>Hazard and risk</h3>
<p>A hazard is something with the potential to cause harm: a corrosive acid, a flammable solvent, a toxic gas. Risk is the chance that harm will actually occur when the hazard is used, and it depends on exposure as well as on the hazard itself. A concentrated acid sealed in a bottle is hazardous but carries little risk; the same acid being poured in a busy laboratory carries a real risk.</p>
<p>That distinction is why a risk assessment is made before practical work. It identifies the hazards, decides who might be harmed and how, evaluates the likelihood and severity, and records the controls.</p>
<p>Organic compounds are often hazardous because many are volatile and flammable, and because some are toxic or irritant. Ways to reduce risk include:</p>
<ul>
<li>Working on a smaller scale, which reduces the amount of vapour released and the consequences of a spill.</li>
<li>Taking precautions specific to the hazard: a fume cupboard for a volatile toxic liquid, a water bath instead of a naked flame for a flammable solvent, gloves for a corrosive, eye protection at all times.</li>
<li>Using an alternative method with less hazardous substances, for example a lower-risk solvent or a reaction that avoids a toxic reagent.</li>
<li>Following safe practice for heating: never heat a closed system, and use anti-bump granules or a stirrer to avoid violent boiling.</li>
</ul>
<p>The question usually asks you to suggest controls for a named procedure, so link each control to the specific hazard rather than listing generic safety advice.</p>

<h3>Homologous series and functional groups</h3>
<p>A homologous series is a family of organic compounds with the same general formula, the same functional group and similar chemical properties, in which each member differs from the next by a CH₂ unit. Because the formula changes by CH₂, the molar mass changes by 14, and the physical properties change gradually along the series while the chemical properties stay similar.</p>
<p>A functional group is the group of atoms responsible for the characteristic reactions of a compound. The functional groups examined at AS level are:</p>
<table border="1" cellpadding="6">
<tr><th>Family</th><th>Functional group</th><th>General formula</th></tr>
<tr><td>Alkane</td><td>C–C and C–H single bonds only</td><td>CₙH₂ₙ₊₂</td></tr>
<tr><td>Cycloalkane</td><td>ring of C–C single bonds</td><td>CₙH₂ₙ</td></tr>
<tr><td>Alkene</td><td>C=C double bond</td><td>CₙH₂ₙ</td></tr>
<tr><td>Halogenoalkane</td><td>C–X (X = Cl, Br, I)</td><td>CₙH₂ₙ₊₁X</td></tr>
<tr><td>Alcohol</td><td>–OH</td><td>CₙH₂ₙ₊₁OH</td></tr>
<tr><td>Aldehyde</td><td>–CHO</td><td>CₙH₂ₙO</td></tr>
<tr><td>Ketone</td><td>C=O between two carbon atoms</td><td>CₙH₂ₙO</td></tr>
<tr><td>Carboxylic acid</td><td>–COOH</td><td>CₙH₂ₙ₊₁COOH</td></tr>
</table>

<h3>Naming and drawing organic compounds</h3>
<p>IUPAC nomenclature follows a fixed sequence of steps. Work through them in order every time.</p>
<ol>
<li>Find the longest carbon chain containing the functional group; that gives the stem (meth, eth, prop, but, pent, hex...).</li>
<li>Number the chain so that the functional group gets the lowest possible number.</li>
<li>Name and number the substituents, and list them alphabetically (ethyl before methyl), with a multiplier for repeats (di-, tri-).</li>
<li>Add the functional group suffix, with its number: -an- for an alkane, -en- for an alkene, -ol for an alcohol, -al for an aldehyde, -one for a ketone, -oic acid for a carboxylic acid.</li>
<li>Use hyphens between numbers and letters, and commas between numbers.</li>
</ol>
<p><strong>Worked example.</strong> The compound CH₃CH(CH₃)CH₂CH₂OH has a four-carbon chain containing the –OH group, numbered from the end nearer the alcohol so that the OH is on carbon 1. There is a methyl group on carbon 3, so the name is 3-methylbutan-1-ol. Numbering from the other end would give 2-methylbutan-4-ol, which is wrong because the principal group must have the lowest number.</p>
<p>Three ways of drawing a compound are examined and you must be able to convert between them:</p>
<ul>
<li><strong>Structural formula</strong>: shows how the atoms are grouped, for example CH₃CH₂CH₂OH.</li>
<li><strong>Displayed formula</strong>: shows every atom and every bond, including the O–H bond, drawn out in full. Required for mechanisms.</li>
<li><strong>Skeletal formula</strong>: shows the carbon skeleton as a line, with carbon atoms at the ends and vertices and hydrogen atoms attached to carbon implied. Functional groups and the hydrogens on heteroatoms are drawn explicitly.</li>
</ul>
<p>Where a compound has a double bond, the position is numbered and geometric isomerism may exist; cis and trans (or E and Z) describe the arrangement around the C=C bond and is covered with the alkenes.</p>

<h3>Classifying reactions</h3>
<p>Every organic reaction can be placed in one of five categories, and the classification is often the first mark of a question.</p>
<ul>
<li><strong>Addition</strong>: two molecules join to form one, with no atom lost. Ethene plus bromine gives 1,2-dibromoethane.</li>
<li><strong>Substitution</strong>: one atom or group is replaced by another. Methane plus chlorine gives chloromethane plus hydrogen chloride.</li>
<li><strong>Oxidation</strong>: an increase in the oxygen content or a loss of hydrogen, such as a primary alcohol becoming a carboxylic acid.</li>
<li><strong>Reduction</strong>: a gain of hydrogen or a loss of oxygen, such as an alkene becoming an alkane.</li>
<li><strong>Polymerisation</strong>: small molecules (monomers) join to form a large molecule (a polymer), as in the addition polymerisation of ethene.</li>
</ul>
<p>Bond breaking can be classified in the same way. In <strong>homolytic</strong> fission the shared pair is split equally, one electron going to each atom, producing two free radicals. In <strong>heterolytic</strong> fission the shared pair goes entirely to one atom, producing a positive and a negative ion. A free radical is a species with an unpaired electron, shown with a single dot, such as Cl·. An electrophile is an electron-pair acceptor, such as HBr or Br₂ in an addition reaction; a nucleophile is an electron-pair donor, such as OH⁻ or NH₃.</p>
<p>Which fission happens depends on the conditions. Ultraviolet light supplies enough energy to break a Cl–Cl bond homolytically, which is why the chlorination of alkanes is a radical reaction; in a polar solvent, heterolytic fission is favoured and produces ions, which is why halogenoalkane hydrolysis is a nucleophilic substitution.</p>

<h3>Alkanes and structural isomerism</h3>
<p>Alkanes are hydrocarbons: compounds of carbon and hydrogen only. They are saturated, containing single bonds only, and their general formula is CₙH₂ₙ₊₂; cycloalkanes have the general formula CₙH₂ₙ because the ring uses two hydrogens to close.</p>
<p>Structural isomers are molecules with the same molecular formula but different structural formulae. Isomerism arises because the carbon skeleton can be arranged differently, and the number of isomers grows quickly with chain length. The alkanes with up to six carbon atoms are examined directly.</p>
<table border="1" cellpadding="6">
<tr><th>Formula</th><th>Number of structural isomers</th><th>Names</th></tr>
<tr><td>C4H10</td><td>2</td><td>butane; 2-methylpropane</td></tr>
<tr><td>C5H12</td><td>3</td><td>pentane; 2-methylbutane; 2,2-dimethylpropane</td></tr>
<tr><td>C6H14</td><td>5</td><td>hexane; 2-methylpentane; 3-methylpentane; 2,2-dimethylbutane; 2,3-dimethylbutane</td></tr>
</table>
<p>A systematic way to find them all is to take the longest chain first, then shorten the main chain by one carbon and place the removed carbon as a methyl substituent in every distinct position, then shorten again. Never place a methyl group on the end of a chain, because that only lengthens the chain and produces a duplicate.</p>

<h3>Obtaining alkanes from crude oil</h3>
<p>Crude oil is a mixture of hydrocarbons. It is separated by fractional distillation, which works because the fractions have different boiling temperatures: the larger the molecule, the stronger the London forces and the higher the boiling temperature. The column is hot at the bottom and cooler at the top, so smaller molecules rise further before condensing.</p>
<p>Demand is for short-chain molecules, especially fuels, so longer chains are broken down by cracking. Thermal cracking uses high temperature and pressure; catalytic cracking uses a zeolite catalyst at a lower temperature and pressure. In both cases a long alkane becomes a shorter alkane and an alkene:</p>
<pre><code>C10H22 → C8H18 + C2H4</code></pre>
<p>Reforming rearranges straight-chain alkanes into branched alkanes and cycloalkanes, or converts them into aromatic compounds, without changing the number of carbon atoms. Branched isomers are preferred in petrol because they burn more smoothly and resist premature ignition (knocking). A typical reforming equation shows a straight chain becoming a branched isomer with the same formula, or a cycloalkane plus hydrogen:</p>
<pre><code>C6H14 → cyclo-C6H12 + H2</code></pre>

<h3>Combustion and pollution</h3>
<p>Alkanes burn in a plentiful supply of oxygen to give carbon dioxide and water:</p>
<pre><code>C3H8 + 5O2 → 3CO2 + 4H2O</code></pre>
<p>With insufficient oxygen, combustion is incomplete and produces carbon monoxide, carbon particulates (soot) and unburned hydrocarbons. Combustion in air at high temperature also produces oxides of nitrogen, because nitrogen and oxygen from the air combine in the hot engine.</p>
<table border="1" cellpadding="6">
<tr><th>Pollutant</th><th>Source</th><th>Problem</th></tr>
<tr><td>Carbon monoxide</td><td>Incomplete combustion</td><td>Toxic: it binds to haemoglobin far more strongly than oxygen does, forming carboxyhaemoglobin, so the blood carries less oxygen and the body is starved of it</td></tr>
<tr><td>Oxides of nitrogen, NO and NO₂</td><td>Nitrogen and oxygen combining at high temperature in engines</td><td>Dissolve in rainwater to form nitric acid, contributing to acid rain, which damages buildings, soils and trees and acidifies lakes; also contribute to photochemical smog and respiratory irritation</td></tr>
<tr><td>Sulfur dioxide</td><td>Sulfur impurities in fossil fuels</td><td>Dissolves to form sulfurous and sulfuric acid, contributing to acid rain</td></tr>
<tr><td>Carbon particulates</td><td>Incomplete combustion, especially diesel</td><td>Respiratory damage; contributes to smog and deposits on buildings</td></tr>
<tr><td>Unburned hydrocarbons</td><td>Incomplete combustion and evaporation</td><td>React with nitrogen oxides in sunlight to form photochemical smog, and some are carcinogenic</td></tr>
<tr><td>Carbon dioxide</td><td>Complete combustion of any carbon fuel</td><td>A greenhouse gas, contributing to climate change</td></tr>
</table>
<p>Catalytic converters reduce these emissions by converting carbon monoxide and oxides of nitrogen into carbon dioxide and nitrogen, and oxidising unburned hydrocarbons:</p>
<pre><code>2CO + 2NO → 2CO2 + N2</code></pre>
<p>The catalyst is a ceramic honeycomb coated with platinum, palladium and rhodium. It works best when hot, which is why a cold engine emits more pollution, and it requires unleaded petrol because lead poisons the catalyst.</p>

<h3>Alternative fuels and carbon neutrality</h3>
<p>Fossil fuels are finite and their combustion adds carbon dioxide that was locked away for millions of years, so alternatives are developed to improve sustainability and reduce emissions. Sustainability means meeting present needs without compromising the ability of future generations to meet theirs.</p>
<ul>
<li><strong>Bioethanol</strong> is produced by fermentation of sugars from crops. It is renewable, but growing the crops uses land, water and fertiliser, and the carbon dioxide released when it burns was recently absorbed by the plants.</li>
<li><strong>Hydrogen</strong> releases only water when burned or used in a fuel cell, so it produces no carbon dioxide at the point of use. Whether it is low-carbon depends on how it was made: from renewable electricity by electrolysis it is clean, but from methane by steam reforming it is not.</li>
<li><strong>Biodiesel</strong> from vegetable oils is renewable and can be used in existing diesel engines, but it competes for agricultural land.</li>
</ul>
<p>Carbon neutrality means that the amount of carbon dioxide released when a fuel is used is balanced by the amount removed from the atmosphere when the fuel was produced. Petrol is not carbon neutral: the carbon in it was stored underground for millions of years and is added to the atmosphere when burned. Bioethanol is often described as carbon neutral because the crops absorbed carbon dioxide as they grew, but it is only truly neutral if the farming, harvesting, transport and distillation are also carbon neutral, and those processes usually burn fossil fuel. Hydrogen made by electrolysis using renewable electricity can be carbon neutral; hydrogen from steam reforming is not.</p>

<h3>Reactions of alkanes</h3>
<p>Alkanes are relatively unreactive because their C–C and C–H bonds are strong and non-polar. Two reactions are examined.</p>
<p><strong>Combustion.</strong> As above: complete combustion gives carbon dioxide and water, incomplete combustion gives carbon monoxide and soot. Alkanes are good fuels because they release a large amount of energy per gram.</p>
<p><strong>Halogenation.</strong> In the dark there is no reaction. In the presence of ultraviolet light, a halogen such as chlorine reacts with an alkane in a substitution reaction:</p>
<pre><code>CH4 + Cl2 → CH3Cl + HCl</code></pre>
<p>The reaction is a free radical substitution. It proceeds in three stages, and each must be shown with the correct species and the correct curly half-arrows.</p>
<p><strong>Initiation.</strong> Ultraviolet light supplies the energy to break the Cl–Cl bond homolytically, producing two chlorine radicals:</p>
<pre><code>Cl2 → 2Cl·</code></pre>
<p>One half-arrow starts at the middle of the Cl–Cl bond and curves to one chlorine atom, and a second half-arrow curves from the bond to the other chlorine atom, showing one electron going each way.</p>
<p><strong>Propagation.</strong> A chlorine radical collides with a methane molecule and removes a hydrogen atom, forming hydrogen chloride and a methyl radical; the methyl radical then reacts with a chlorine molecule to form chloromethane and a new chlorine radical:</p>
<pre><code>Cl· + CH4 → CH3· + HCl
CH3· + Cl2 → CH3Cl + Cl·</code></pre>
<p>Because a chlorine radical is regenerated in the second step, the reaction is a chain reaction. In each propagation step one radical is used and one is produced, so the number of radicals stays constant.</p>
<p><strong>Termination.</strong> Two radicals combine and the chain ends:</p>
<pre><code>Cl· + Cl· → Cl2
CH3· + Cl· → CH3Cl
CH3· + CH3· → C2H6</code></pre>
<p>The last termination step explains why ethane is found among the products of the chlorination of methane, even though it is not part of the desired reaction.</p>
<p>Free radical substitution has limited use in synthesis because the reaction does not stop at the first substitution. Chloromethane can react again to give dichloromethane, trichloromethane and tetrachloromethane, and the propagation steps also produce hydrogen chloride and small amounts of ethane, so the product is a mixture that must be separated. To obtain a single product in good yield, a different route such as nucleophilic substitution of an alcohol is preferred.</p>

<h3>Typical mistakes</h3>
<ul>
<li>Confusing hazard with risk: a hazard is the potential for harm, risk is the chance of it happening.</li>
<li>Numbering a chain from the end that gives the substituent the lowest number while ignoring the principal functional group.</li>
<li>Writing a radical with a full negative charge instead of a single dot, or forgetting the dot entirely.</li>
<li>Showing initiation with a heterolytic split, which would produce ions rather than radicals.</li>
<li>Giving the general formula of an alkene (CₙH₂ₙ) for an alkane, or forgetting that cycloalkanes share the alkene's general formula.</li>
<li>Missing a structural isomer by placing a methyl group at the end of a chain, which is the same molecule renamed.</li>
<li>Describing cracking as the addition of hydrogen, which is hydrogenation, or reforming as breaking molecules into smaller ones.</li>
<li>Claiming that a biofuel is automatically carbon neutral without accounting for its production.</li>
<li>Leaving ultraviolet light out of the conditions for halogenation, or writing the equation as an addition reaction.</li>
</ul>

<h3>Exam-style questions</h3>
<ol>
<li>Define the terms hazard and risk, and explain why a risk assessment is needed before heating ethanol over a Bunsen burner. Answer: a hazard is something with the potential to cause harm; risk is the chance that harm occurs. Ethanol is volatile and highly flammable, so heating it directly risks a flash fire; a risk assessment identifies that hazard and specifies the control, such as heating in a water bath and keeping the apparatus away from naked flames.</li>
<li>Name the compound CH₃CH₂CH(CH₃)CH₂OH. Answer: the longest chain containing the OH group has four carbons and is numbered from the right so that the OH is on carbon 1; the methyl group is on carbon 3, so the name is 3-methylbutan-1-ol.</li>
<li>Draw and name all the structural isomers of C₅H₁₂. Answer: pentane (a straight chain of five carbons), 2-methylbutane (a four-carbon chain with a methyl on carbon 2), and 2,2-dimethylpropane (a three-carbon chain with two methyls on carbon 2).</li>
<li>Explain why the reaction between methane and chlorine needs ultraviolet light. Answer: the C–H and Cl–Cl bonds are strong and the molecules are non-polar, so collisions at room temperature do not have enough energy to break them. Ultraviolet light provides the energy for homolytic fission of the Cl–Cl bond, which produces chlorine radicals and starts the chain reaction.</li>
<li>Outline the mechanism for the monochlorination of ethane, naming each type of step. Answer: initiation: Cl2 → 2Cl· under UV light. Propagation: Cl· + C2H6 → C2H5· + HCl, then C2H5· + Cl2 → C2H5Cl + Cl·. Termination: Cl· + Cl· → Cl2, C2H5· + Cl· → C2H5Cl, C2H5· + C2H5· → C4H10.</li>
</ol>
<p>Practise naming and drawing as one skill: take a name, draw the skeletal formula, then the displayed formula, then write the molecular formula, and reverse the process. That fluency is assumed in every later organic topic, especially halogenoalkanes, alcohols and spectra.</p>
`,
    "77dc68f0-c9d0-4be8-9750-22f6d69602de": `
<h2>AS Level Chemistry: Halogenoalkanes, Alcohols and Spectra</h2>
<p>Edexcel IAL Chemistry WCH12, Topic 10 is the largest organic topic in the AS year. It covers how to classify reactions and mechanisms, the chemistry of halogenoalkanes and alcohols with their characteristic substitution, elimination and oxidation reactions, the practical techniques used to prepare and purify a liquid organic compound, and the two spectroscopic methods, mass spectrometry and infrared, that identify what a compound is. The mechanisms are examined with curly arrows, so the drawing and the explanation must both be right.</p>

<h3>Classifying reactions and the idea of a mechanism</h3>
<p>Every organic reaction belongs to one of these categories, and the classification is often the first mark of a question:</p>
<ul>
<li><strong>Addition</strong>: two species combine into one, with nothing lost, as when an alkene adds hydrogen bromide.</li>
<li><strong>Elimination</strong>: a small molecule is removed from a larger one, leaving a double bond, as when a halogenoalkane forms an alkene.</li>
<li><strong>Substitution</strong>: one atom or group is replaced by another, as when a halogenoalkane becomes an alcohol.</li>
<li><strong>Oxidation</strong>: gain of oxygen or loss of hydrogen, as when an alcohol becomes an aldehyde or a carboxylic acid.</li>
<li><strong>Reduction</strong>: gain of hydrogen or loss of oxygen.</li>
<li><strong>Hydrolysis</strong>: breaking a bond by reaction with water or aqueous alkali, as in the hydrolysis of a halogenoalkane.</li>
<li><strong>Polymerisation</strong>: monomers join into a polymer.</li>
</ul>
<p>A reaction mechanism is a step-by-step description of how the electrons move during a reaction. It shows which bonds break, in what order, and which species are formed on the way. Mechanisms are drawn with curly arrows: a full arrow shows the movement of a pair of electrons, and a half-arrow shows the movement of one electron in a radical reaction. A curly arrow always starts at a bond or at a lone pair and points to where the electrons go.</p>
<p>The type of mechanism depends on bond polarity. When a bond is polar, the more electronegative atom carries a partial negative charge and the other a partial positive charge, so the molecule has an electron-rich site and an electron-poor site. That is an invitation to attack by a species with the opposite character:</p>
<ul>
<li>A <strong>nucleophile</strong> is an electron-pair donor: it has a lone pair and is attracted to an electron-poor (δ+) carbon. Examples are OH⁻, NH₃, CN⁻ and water.</li>
<li>An <strong>electrophile</strong> is an electron-pair acceptor: it is attracted to an electron-rich site such as a C=C double bond. Examples are HBr, Br₂ and the nitrosonium ion in nitration.</li>
</ul>
<p>So a polar C–X bond, with δ+ on the carbon, is attacked by nucleophiles and undergoes nucleophilic substitution. A C=C double bond with its exposed π electrons is attacked by electrophiles and undergoes electrophilic addition. Heterolytic fission produces these ions and charged species; homolytic fission produces radicals and leads to radical substitution.</p>

<h3>Halogenoalkanes: naming and classification</h3>
<p>A halogenoalkane has a halogen atom in place of a hydrogen on an alkane chain. The halogen is named as a prefix (fluoro-, chloro-, bromo-, iodo-) with its position number, and the chain is numbered to give the substituent the lowest number: CH₃CH₂CH₂Cl is 1-chloropropane, and CH₃CHClCH₃ is 2-chloropropane.</p>
<p>Halogenoalkanes are classified by how many carbon atoms are bonded directly to the carbon that carries the halogen:</p>
<table border="1" cellpadding="6">
<tr><th>Class</th><th>Definition</th><th>Example</th></tr>
<tr><td>Primary (1°)</td><td>The C–X carbon is bonded to one other carbon</td><td>CH₃CH₂Cl, chloroethane</td></tr>
<tr><td>Secondary (2°)</td><td>The C–X carbon is bonded to two other carbons</td><td>CH₃CHClCH₃, 2-chloropropane</td></tr>
<tr><td>Tertiary (3°)</td><td>The C–X carbon is bonded to three other carbons</td><td>(CH₃)₃CCl, 2-chloro-2-methylpropane</td></tr>
</table>

<h3>Reactions of halogenoalkanes</h3>
<p>The reagent and the solvent decide whether substitution or elimination happens. Learn the table as a set of conditions, not as separate facts.</p>
<table border="1" cellpadding="6">
<tr><th>Reagent and conditions</th><th>Product</th><th>Type</th><th>Equation (with 1-bromopropane)</th></tr>
<tr><td>Aqueous potassium hydroxide, heat</td><td>Alcohol</td><td>Nucleophilic substitution</td><td>C3H7Br + OH⁻ → C3H7OH + Br⁻</td></tr>
<tr><td>Ethanolic potassium hydroxide, heat</td><td>Alkene</td><td>Elimination</td><td>C3H7Br + OH⁻ → C3H6 + H2O + Br⁻</td></tr>
<tr><td>Aqueous silver nitrate in ethanol, warm</td><td>Alcohol, with a silver halide precipitate</td><td>Hydrolysis</td><td>C3H7Br + H2O → C3H7OH + HBr, then Ag+ + Br⁻ → AgBr(s)</td></tr>
<tr><td>Alcoholic ammonia, heated under pressure</td><td>Amine</td><td>Nucleophilic substitution</td><td>C3H7Br + 2NH3 → C3H7NH2 + NH4Br</td></tr>
<tr><td>Alcoholic potassium cyanide, heat</td><td>Nitrile</td><td>Nucleophilic substitution</td><td>C3H7Br + CN⁻ → C3H7CN + Br⁻</td></tr>
</table>
<p>In the first reaction the hydroxide ion acts as a nucleophile: its lone pair attacks the δ+ carbon and the C–Br bond breaks heterolytically, with the bromide ion leaving. In the second the same ion acts as a base instead, removing a hydrogen from an adjacent carbon and pushing the electrons into a new C=C bond, so the molecule loses HBr and becomes an alkene. The solvent is the switch: water favours substitution, ethanol favours elimination.</p>
<p>Ammonia is used in excess because the first substitution gives an amine, which can itself act as a nucleophile and react again with the halogenoalkane to give a secondary and then a tertiary amine. The cyanide reaction is useful because it lengthens the carbon chain by one carbon: the nitrile can be hydrolysed to a carboxylic acid.</p>

<h3>The nucleophilic substitution mechanisms</h3>
<p>For a primary halogenoalkane, the mechanism is a one-step bimolecular process. In the exam you draw the displayed formula of the halogenoalkane, place the nucleophile beside it, and use curly arrows.</p>
<p><strong>With aqueous potassium hydroxide.</strong> The arrow from the lone pair on the oxygen of OH⁻ points to the δ+ carbon of the C–Br bond. A second arrow starts at the middle of the C–Br bond and points to the bromine, showing the pair leaving with the bromine as Br⁻. The product is the alcohol and the leaving group.</p>
<p><strong>With ammonia.</strong> The arrow from the lone pair on the nitrogen of NH₃ points to the δ+ carbon, and a second arrow from the C–Br bond points to the bromine. The initial product is an alkylammonium ion, which loses a proton to give the amine, so the overall equation is a substitution of Br by NH₂. Drawing the ammonium ion is the detail that separates a full-mark answer from a partial one.</p>
<p>The carbon being attacked is electron-poor because bromine is more electronegative than carbon, so the bond is polarised Cδ+–Brδ−. The nucleophile is electron-rich and is attracted to that δ+ carbon, which is why the mechanism is described as nucleophilic substitution rather than electrophilic addition. A secondary or tertiary halogenoalkane may instead react by an ionisation-then-attack route, with a carbocation intermediate; that distinction, SN1 versus SN2, is examined in Unit 4, not here.</p>

<h3>Comparing the rates of hydrolysis</h3>
<p>The rate of hydrolysis can be followed by warming the halogenoalkane with aqueous silver nitrate in ethanol and timing how long it takes for a precipitate of silver halide to appear. Water is the nucleophile, and the silver ion removes the halide as it is released, which keeps the reaction moving and makes the halide visible.</p>
<pre><code>R-X + H2O → R-OH + HX          then          Ag+(aq) + X-(aq) → AgX(s)</code></pre>
<table border="1" cellpadding="6">
<tr><th>Halide</th><th>Precipitate colour</th><th>Relative rate</th></tr>
<tr><td>Chloro-</td><td>White</td><td>Slowest</td></tr>
<tr><td>Bromo-</td><td>Cream</td><td>Intermediate</td></tr>
<tr><td>Iodo-</td><td>Pale yellow</td><td>Fastest</td></tr>
</table>
<p>Two comparisons are made. Structurally, tertiary halogenoalkanes hydrolyse faster than secondary, which are faster than primary, because the intermediate carbocation is more stable when more alkyl groups can donate electron density, and because the crowded carbon is more easily approached. Across the halogens, the rate increases from chloro- to bromo- to iodo- because the C–X bond enthalpy decreases down the group: C–Cl is the strongest bond, so it is the hardest to break, and C–I the weakest, so it breaks most readily.</p>
<p><strong>Core Practical 5</strong> carries out exactly this investigation. A measured volume of the halogenoalkane is added to silver nitrate in ethanol at a fixed temperature, and the time to the first appearance of the precipitate is recorded; rate is taken as 1/time. Water baths keep the temperature constant, and the same volumes and concentrations must be used so that the comparison is fair. The evaluation should note that the precipitate appearance is a subjective endpoint, that temperature control is critical because rate is very sensitive to it, and that different halogenoalkanes have different solubilities in ethanol.</p>
<p><strong>Core Practical 6</strong> prepares 2-chloro-2-methylpropane by shaking 2-methylpropan-2-ol with concentrated hydrochloric acid. The tertiary alcohol reacts readily by substitution, and the product separates as an organic layer, which is washed with sodium hydrogencarbonate solution to remove excess acid, dried, and distilled. The boiling temperature of the distillate is checked against the data book value as a test of purity.</p>

<h3>Alcohols: naming and classification</h3>
<p>An alcohol contains the –OH group. The suffix is -ol with the position number: CH₃CH₂OH is ethanol, CH₃CH₂CH₂OH is propan-1-ol, and CH₃CHOHCH₃ is propan-2-ol.</p>
<p>Alcohols are classified in the same way as halogenoalkanes, by the number of carbons attached to the carbon carrying the –OH group: primary (one), secondary (two), tertiary (three). This classification predicts how each alcohol behaves on oxidation, so it is examined directly.</p>
<table border="1" cellpadding="6">
<tr><th>Class</th><th>Example</th><th>Oxidation product</th></tr>
<tr><td>Primary</td><td>propan-1-ol</td><td>Propanal with distillation, propanoic acid under reflux</td></tr>
<tr><td>Secondary</td><td>propan-2-ol</td><td>Propanone; no further oxidation under normal conditions</td></tr>
<tr><td>Tertiary</td><td>2-methylpropan-2-ol</td><td>No reaction with acidified dichromate at AS level</td></tr>
</table>

<h3>Reactions of alcohols</h3>
<table border="1" cellpadding="6">
<tr><th>Reagent and conditions</th><th>Product</th><th>Notes</th></tr>
<tr><td>Oxygen in air, ignition</td><td>Carbon dioxide and water</td><td>Combustion; alcohols are fuels</td></tr>
<tr><td>Phosphorus(V) chloride, PCl5, room temperature</td><td>Chloroalkane</td><td>Also gives misty fumes of HCl and is used as a qualitative test for an –OH group</td></tr>
<tr><td>Concentrated sulfuric acid with potassium bromide</td><td>Bromoalkane</td><td>The HBr generated in situ substitutes the OH</td></tr>
<tr><td>Red phosphorus with iodine</td><td>Iodoalkane</td><td>Red phosphorus and iodine generate phosphorus(III) iodide in situ</td></tr>
<tr><td>Concentrated phosphoric acid, heat</td><td>Alkene</td><td>Elimination of water (dehydration)</td></tr>
<tr><td>Acidified potassium dichromate(VI), heat</td><td>Aldehyde or carboxylic acid (primary), ketone (secondary)</td><td>The orange dichromate turns green as it is reduced</td></tr>
</table>
<p>For the halogenating agents, the mechanisms are not required, but the equations and the observation are. With PCl₅ the test is the white fumes or misty vapour of hydrogen chloride, which turns damp blue litmus paper red. For the sulfuric acid and potassium bromide route, the acid and the bromide produce hydrogen bromide, which then reacts with the alcohol:</p>
<pre><code>KBr + H2SO4 → KHSO4 + HBr
C2H5OH + HBr → C2H5Br + H2O</code></pre>
<p>Concentrated phosphoric acid dehydrates an alcohol to an alkene, and the alkene can be identified by decolourising bromine water.</p>

<h3>Oxidation of alcohols</h3>
<p>The oxidising agent is acidified potassium dichromate(VI), written as [O] in equations. The colour change from orange to green is the visual evidence that oxidation has occurred.</p>
<p><strong>Primary alcohols.</strong> The product depends on the apparatus. If the aldehyde is distilled off as it forms, it escapes before it can be oxidised further:</p>
<pre><code>C2H5OH + [O] → CH3CHO + H2O</code></pre>
<p>If the mixture is heated under reflux, the aldehyde stays in contact with the oxidising agent and is oxidised again to the carboxylic acid:</p>
<pre><code>C2H5OH + 2[O] → CH3COOH + H2O</code></pre>
<p><strong>Secondary alcohols.</strong> Oxidation gives a ketone, which resists further oxidation because the carbonyl carbon has no hydrogen attached:</p>
<pre><code>CH3CHOHCH3 + [O] → CH3COCH3 + H2O</code></pre>
<p><strong>Tertiary alcohols.</strong> No reaction with acidified dichromate, because the carbon carrying the OH has no hydrogen to remove and cannot form a C=O bond.</p>
<p>The products are distinguished by tests:</p>
<ul>
<li><strong>Aldehydes</strong> reduce Fehling's solution to a brick-red precipitate of copper(I) oxide, and Benedict's solution similarly, on warming. Ketones do not react.</li>
<li><strong>Carboxylic acids</strong> react with sodium carbonate or sodium hydrogencarbonate to give effervescence of carbon dioxide; aldehydes and ketones do not.</li>
<li><strong>Tollens' reagent</strong> gives a silver mirror with an aldehyde and no change with a ketone.</li>
</ul>

<h3>Preparing and purifying a liquid organic compound</h3>
<p>Five techniques are examined together, because a preparation uses several of them in sequence.</p>
<ul>
<li><strong>Heating under reflux</strong>: a vertical condenser returns vapour to the flask, so the mixture can be heated for a long time without losing solvent or volatile product. It is used when the reaction is slow or needs prolonged heating, such as the oxidation of a primary alcohol to a carboxylic acid.</li>
<li><strong>Extraction with a solvent using a separating funnel</strong>: the product is shaken with a solvent in which it is more soluble than in the reaction mixture, the two layers are allowed to separate, and the layer containing the product is run off. The stopper must be vented during shaking to release pressure.</li>
<li><strong>Distillation</strong>: separates a volatile product from involatile impurities or from a solvent with a different boiling temperature. The fraction boiling over the expected range is collected.</li>
<li><strong>Drying with an anhydrous salt</strong>: anhydrous magnesium sulfate or calcium chloride is added to remove traces of water; it clumps and can be filtered off once it stops clumping.</li>
<li><strong>Boiling temperature determination</strong>: a pure compound boils at a sharp, known temperature. A range that is wide or different from the data book value indicates impurities.</li>
</ul>
<p><strong>Core Practical 7</strong> oxidises propan-1-ol to propanal and to propanoic acid. For the aldehyde, the oxidising agent is added slowly to the alcohol and the product is distilled off as it forms, collecting the fraction that boils near 48 °C. For the acid, the mixture is heated under reflux, then the acid is separated and purified. The questions on this practical usually ask why the aldehyde must be removed as it forms, and what the observation of the dichromate colour shows.</p>

<h3>Mass spectrometry</h3>
<p>In a mass spectrometer a molecule is ionised, usually by electron impact, and the ions are separated by mass-to-charge ratio. The most intense peak of the molecular ion, M⁺, gives the relative molecular mass. Fragmentation produces smaller ions, and the pattern of peaks is a fingerprint of the structure.</p>
<ul>
<li>The molecular ion peak is the peak with the highest m/z value (ignoring small isotope peaks), and its m/z equals Mᵣ.</li>
<li>A peak at M−15 often indicates the loss of a methyl group, CH₃.</li>
<li>A peak at M−29 indicates the loss of an ethyl group, C₂H₅.</li>
<li>Peaks at 15, 29, 43 correspond to CH₃⁺, C₂H₅⁺ and C₃H₇⁺, and are common in alkanes and alkyl chains.</li>
<li>A peak at m/z 31 is characteristic of CH₂OH⁺ from a primary alcohol.</li>
<li>For a chloro- or bromo-compound, the isotope pattern is decisive: chlorine gives peaks two units apart in roughly 3:1 ratio, and bromine gives peaks two units apart in roughly 1:1 ratio, because of the ³⁵Cl/³⁷Cl and ⁷⁹Br/⁸¹Br isotopes.</li>
</ul>
<p><strong>Worked example.</strong> A compound has a molecular ion peak at m/z 74 and major fragments at 43 and 31. Mᵣ = 74 is consistent with C₄H₁₀O (4 × 12 + 10 + 16 = 74). A fragment at 43 corresponds to C₃H₇⁺ (loss of CH₂OH), and a fragment at 31 corresponds to CH₂OH⁺, so the compound is butan-1-ol, a primary alcohol. A secondary alcohol such as butan-2-ol would not give the 31 peak, because it cannot lose a CH₂OH group.</p>

<h3>Infrared spectroscopy</h3>
<p>Infrared radiation is absorbed by bonds that vibrate with a change in dipole. Different functional groups absorb at different wavenumbers, so an infrared spectrum identifies which groups are present.</p>
<table border="1" cellpadding="6">
<tr><th>Bond</th><th>Wavenumber / cm⁻¹</th><th>Appearance and group</th></tr>
<tr><td>O–H</td><td>2500–3300, broad</td><td>Broad absorption, carboxylic acid (with C=O)</td></tr>
<tr><td>O–H</td><td>3230–3550, broad</td><td>Broad absorption, alcohol</td></tr>
<tr><td>N–H</td><td>3300–3500</td><td>Sharp, amines</td></tr>
<tr><td>C–H</td><td>2850–3300</td><td>Stretching in alkanes, alkenes and aldehydes</td></tr>
<tr><td>C=O</td><td>1680–1750, strong</td><td>Strong sharp absorption: aldehyde, ketone or carboxylic acid</td></tr>
<tr><td>C=C</td><td>1620–1680</td><td>Weak to moderate, alkenes</td></tr>
<tr><td>C–O</td><td>1000–1300</td><td>Alcohols, ethers, esters</td></tr>
<tr><td>C–X</td><td>500–800</td><td>Halogenoalkanes</td></tr>
</table>
<p>Two practical points are examined. First, an absorption at about 1700 cm⁻¹ alone does not distinguish an aldehyde from a ketone from a carboxylic acid: look for the broad O–H absorption of the acid as well, or the aldehyde C–H absorptions near 2700 and 2800 cm⁻¹. Second, the region below about 1500 cm⁻¹ is the fingerprint region, with many overlapping absorptions; it is used to identify a compound by matching its whole spectrum to a known one, not to identify individual groups.</p>
<p>The O–H absorption of an alcohol is broad because hydrogen bonding varies the O–H bond strength across the sample; the carboxylic acid O–H is even broader and extends over a wider range because of strong hydrogen bonding. This is why the shape and position of the broad absorption, not just its presence, carries information.</p>

<h3>Core Practical 8: analysis of unknowns</h3>
<p>An unknown inorganic or organic substance is identified by a sequence of tests, each chosen to eliminate possibilities. For an organic unknown, the sequence is usually: test for unsaturation with bromine water; test for an alcohol with PCl₅ or by oxidation with acidified dichromate; test for an aldehyde with Fehling's or Tollens' reagent; test for a carboxylic acid with sodium carbonate; then use infrared and mass spectra to confirm the functional groups and the molecular mass. Each positive result should be recorded with its observation, because the observation is the evidence.</p>

<h3>Typical mistakes</h3>
<ul>
<li>Using aqueous KOH for elimination, or ethanolic KOH for substitution: the solvent decides the reaction.</li>
<li>Forgetting that the hydroxide ion is a nucleophile in substitution but a base in elimination.</li>
<li>Drawing a curly arrow from the wrong place, or drawing arrows that point to an atom rather than to a bond or lone pair.</li>
<li>Thinking a tertiary alcohol oxidises to a ketone; it does not react under these conditions.</li>
<li>Distilling a primary alcohol oxidation and expecting the carboxylic acid, or refluxing and expecting the aldehyde.</li>
<li>Calling the dichromate colour change a test for an aldehyde; it shows that oxidation has occurred, and Fehling's or Tollens' distinguishes the aldehyde.</li>
<li>Confusing the broad O–H absorption of an alcohol with the sharper C=O absorption, or ignoring the fingerprint region.</li>
<li>Quoting the base peak as the molecular ion peak; the base peak is the most intense, not necessarily the highest m/z.</li>
</ul>

<h3>Exam-style questions</h3>
<ol>
<li>Explain why 1-iodobutane hydrolyses faster than 1-chlorobutane with aqueous silver nitrate. Answer: the C–I bond has a lower bond enthalpy than the C–Cl bond because the halogen atom is larger and the overlap with the carbon orbital is poorer, so the C–I bond breaks more easily and the iodide is released faster, giving a precipitate sooner.</li>
<li>State the reagent and conditions needed to convert 1-bromopropane into propan-1-ol, and name the mechanism. Answer: aqueous potassium hydroxide, heated; nucleophilic substitution.</li>
<li>Describe how you would obtain propanal from propan-1-ol, including the apparatus and the observation. Answer: warm propan-1-ol with acidified potassium dichromate(VI) and distill the product as it forms, collecting the fraction boiling near 48 °C. The orange dichromate turns green. Distilling the aldehyde off prevents it being oxidised further to propanoic acid.</li>
<li>A compound with the molecular formula C₃H₇Br gives a precipitate with aqueous silver nitrate in ethanol, and on heating with ethanolic potassium hydroxide gives a gas that decolourises bromine water. Identify the type of reaction and explain the observation. Answer: the first is hydrolysis, releasing bromide ions that give a cream precipitate of silver bromide. The second is elimination, producing propene, which decolourises bromine water by electrophilic addition.</li>
<li>A compound shows a strong absorption at 1715 cm⁻¹, a broad absorption at 3000 cm⁻¹ and no absorption at 2500–3300 cm⁻¹. Its mass spectrum has a molecular ion at m/z 58. Identify the compound. Answer: Mᵣ = 58 is consistent with C₃H₆O. The strong 1715 cm⁻¹ absorption is C=O, and the absence of a very broad acid O–H absorption means it is not a carboxylic acid, so it is propanone (or propanal, which would also show aldehyde C–H absorptions near 2700–2800 cm⁻¹).</li>
</ol>
<p>Revise this topic by working from the functional group outwards: reagent, conditions, product, mechanism, then the observation that proves it. That single chain of reasoning answers most of the questions on halogenoalkanes, alcohols and spectra.</p>
`,
  },
};
