// OxfordAQA International GCSE Chemistry 9202 — topic 3.6 Quantitative Chemistry.
// Statements covered: 3.6.1 Conservation of mass including the quantitative
// interpretation of chemical equations, 3.6.2 Amount of substance in relation to
// masses, 3.6.3 The mole concept, 3.6.4 Molar concentrations.
//
// The only topic in the qualification that is arithmetic from end to end, so every
// worked example shows the relation, the substitution and the result, which is also
// what .freebuff/audit-answer-steps.cjs measures.
module.exports = {
  topicSlug: "quantitative-chemistry",
  title: "IGCSE Chemistry (OxfordAQA): Quantitative Chemistry",
  html: `<h2>Quantitative Chemistry</h2>
<p>Everything a chemist predicts about amounts rests on one idea: the balanced equation tells you the ratio in which particles react, and the mole is the bridge that turns that ratio into grams. Get the bridge right and the whole topic becomes a handful of standard moves — mass to moles, moles through the ratio, moles back to mass — applied to masses, to solutions and to gases. Get it wrong and the arithmetic looks fine while the answer is wrong by a factor of two. This note builds the bridge in order, from the conservation of mass through balancing and relative formula mass to the mole, then applies it to reacting masses, yields, atom economy, concentrations, titrations and gas volumes, with every worked example written out in three steps so that the method can be followed and marked.</p>

<h3>1. Conservation of mass</h3>
<p>In a chemical reaction atoms are rearranged, never created or destroyed. The mass of the products therefore equals the mass of the reactants that actually reacted, and a balanced equation is simply that statement written in symbols. This is why balancing works: the number of each kind of atom must be the same on both sides.</p>
<p>The rule only appears to fail when something leaves or joins the system without being weighed. Both directions are examined:</p>
<ul>
  <li><strong>Mass appears to fall.</strong> Marble chips in an open flask of dilute acid lose mass, because carbon dioxide escapes: CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂. In a closed flask with a balloon over the neck, the total mass is unchanged and the balloon inflates.</li>
  <li><strong>Mass appears to rise.</strong> Magnesium burning in air gains mass, because oxygen from the air is incorporated: 2Mg + O₂ → 2MgO. The gain is exactly the mass of oxygen that combined, and it is the reason the white ash weighs more than the ribbon did.</li>
  <li><strong>Mass is lost in solution.</strong> A precipitate seems to appear from nowhere, but the total mass of the beaker is unchanged: the dissolved ions have simply joined into an insoluble solid.</li>
</ul>
<p>The phrasing to use is "in a closed system", because that is the condition under which the conservation is measurable. A question that shows a mass change is asking you to name what entered or left, not to declare that conservation has failed.</p>

<h3>2. Balancing equations</h3>
<p>A balanced equation has the same number of each type of atom on both sides. Only coefficients may be changed — never subscripts, because changing a subscript changes the substance: H₂O is water, H₂O₂ is hydrogen peroxide. The method is mechanical:</p>
<ol>
  <li>Write the word equation and the correct formulae, including state symbols where they help.</li>
  <li>Count each element on both sides and leave hydrogen and oxygen until last.</li>
  <li>Adjust coefficients one element at a time, re-counting after each change.</li>
  <li>Multiply through by a whole number if any coefficient is a fraction, and check.</li>
</ol>
<p>For example, propane burning: C₃H₈ + O₂ → CO₂ + H₂O is unbalanced. Three carbons need 3CO₂, and eight hydrogens need 4H₂O; that gives 3 × 2 + 4 × 1 = 10 oxygens on the right, so 5O₂ are needed on the left: C₃H₈ + 5O₂ → 3CO₂ + 4H₂O. The check is the oxygen count, which is why it is done last.</p>
<p>An ionic equation drops the spectator ions, which is the version required for precipitation and neutralisation: Ag⁺ + Cl⁻ → AgCl rather than AgNO₃ + NaCl → AgCl + NaNO₃. Both are correct, but only one is what the question asked for, and the charges must balance in an ionic equation as well as the atoms.</p>

<h3>3. Relative formula mass and percentage composition</h3>
<p>The relative atomic mass, Aᵣ, of an element is its mass compared with one twelfth of a carbon-12 atom, and it has no units. The relative formula mass, Mᵣ, of a compound is the sum of the Aᵣ values of every atom in its formula. Water, H₂O, is 2 × 1 + 16 = 18; carbon dioxide, CO₂, is 12 + 2 × 16 = 44; calcium carbonate, CaCO₃, is 40 + 12 + 3 × 16 = 100.</p>
<p>Because a formula gives the ratio of atoms, the same arithmetic gives the percentage by mass of any element in a compound:</p>
<p>percentage by mass = (Aᵣ of the element × number of atoms in the formula) ÷ Mᵣ of the compound × 100 → <em>Key:</em> Aᵣ = relative atomic mass (no units); Mᵣ = relative formula mass (no units); the result is a percentage, so it carries the % sign.</p>
<p>For ammonium nitrate, NH₄NO₃, Mᵣ = 14 + 4 + 14 + 48 = 80, and the nitrogen contribution is 2 × 14 = 28, so the percentage of nitrogen is 28 ÷ 80 × 100 = 35.0 %. That number is why the fertiliser is sold on its nitrogen content rather than its mass. The same method gives the water in a hydrated salt: copper(II) sulfate pentahydrate, CuSO₄·5H₂O, has Mᵣ = 160 + 5 × 18 = 250, so water is 90 ÷ 250 × 100 = 36.0 % of the crystal.</p>

<h3>4. The mole concept</h3>
<p>A mole is the amount of substance that contains 6.02 × 10²³ particles — Avogadro's number. That number is not arbitrary: it is chosen so that one mole of a substance, in grams, is numerically equal to its relative formula mass. One mole of carbon is 12 g, one mole of water is 18 g, one mole of calcium carbonate is 100 g.</p>
<p>That is the entire usefulness of the mole. A balanced equation speaks in particles, and a balance speaks in grams, and the mole is the conversion factor between them. The relation is worth knowing in all three rearrangements:</p>
<p>n = m ÷ M → <em>Key:</em> n = amount of substance (mol); m = mass (g); M = molar mass, numerically equal to Mᵣ (g/mol). The same relation rearranges to m = n × M and M = m ÷ n, so any two of the three give the third.</p>
<p>For example, 10.0 g of calcium carbonate is n = m ÷ M = 10.0 ÷ 100 = 0.100 mol, while 10.0 g of water is 10.0 ÷ 18 = 0.556 mol. Equal masses, very different amounts, because the particles weigh differently. The reverse move matters just as much: 0.250 mol of sodium hydroxide is m = n × M = 0.250 × 40 = 10.0 g.</p>

<h3>5. Reading an equation quantitatively</h3>
<p>The coefficients in a balanced equation are the ratio in which amounts react, in moles. In 2H₂ + O₂ → 2H₂O, two moles of hydrogen react with one mole of oxygen to give two moles of water. The ratio is 2 : 1 : 2, and it holds whatever the actual amounts are — 0.10 mol of hydrogen reacts with 0.05 mol of oxygen.</p>
<p>This is the step where most marks are lost, because a student who ignores the coefficients adds, subtracts or divides by the wrong number. Two habits prevent it. First, always write the ratio underneath the equation before touching any numbers. Second, remember that the ratio applies to moles and never to grams: 2 g of hydrogen does not react with 1 g of oxygen, because the ratio is between amounts, not masses.</p>
<p>The standard three-step method for every reacting-mass question is therefore: convert the known mass to moles; use the ratio from the equation to convert to moles of the wanted substance; convert back to mass.</p>

<h3>6. Reacting mass calculations</h3>
<p>How much calcium oxide is produced by heating 25.0 g of calcium carbonate? The equation is CaCO₃ → CaO + CO₂, so the ratio is 1 : 1 : 1.</p>
<ol>
  <li>Moles of calcium carbonate: n = m ÷ M = 25.0 ÷ 100 = 0.250 mol.</li>
  <li>Ratio CaCO₃ : CaO is 1 : 1, so moles of calcium oxide = 0.250 mol.</li>
  <li>Mass of calcium oxide: m = n × M = 0.250 × 56 = 14.0 g.</li>
</ol>
<p>The same method handles a ratio that is not 1 : 1. For 4.00 g of hydrogen burning in excess oxygen, 2H₂ + O₂ → 2H₂O: n(H₂) = 4.00 ÷ 2 = 2.00 mol, the ratio is 2 : 2 so n(H₂O) = 2.00 mol, and m = 2.00 × 18 = 36.0 g. Skipping the ratio would give 36.0 g anyway here, which is exactly why an examiner chooses examples where it does not: try methane, CH₄ + 2O₂ → CO₂ + 2H₂O, where 1 mol of methane gives 2 mol of water and the missing factor of two is the error being tested.</p>
<p>Two checks catch most mistakes: the mass of the product cannot exceed the total mass of the reactants, and a quick estimate of the molar masses tells you the right order of magnitude before any calculation.</p>

<h3>7. Limiting reactants</h3>
<p>In a real reaction the reactants are rarely present in exactly the ratio the equation requires, so one of them runs out first. That one is the <strong>limiting reactant</strong>, and it decides how much product can form; the other is in excess and some of it will be left over.</p>
<p>The method is to convert both amounts to moles, then divide each by its coefficient in the equation. The smallest result is the limiting reactant. For example, 0.20 mol of magnesium is heated with 0.050 mol of oxygen in 2Mg + O₂ → 2MgO:</p>
<ul>
  <li>Magnesium: 0.20 ÷ 2 = 0.10.</li>
  <li>Oxygen: 0.050 ÷ 1 = 0.050.</li>
</ul>
<p>Oxygen gives the smaller value, so oxygen is limiting. Working from it, 0.050 mol of O₂ produces 0.100 mol of MgO, which is m = n × M = 0.100 × 40 = 4.0 g. Working from the magnesium instead would predict 0.20 mol of MgO and 8.0 g, which is more product than the available oxygen allows — the classic error, and the reason the calculation must start from the limiting reactant.</p>
<p>The industrial version of the same idea is using an excess of one reactant deliberately: in the blast furnace, carbon monoxide is supplied in excess so that all the iron oxide is reduced, because unreacted ore is worthless and the gas is cheap.</p>

<h3>8. Percentage yield</h3>
<p>Yield compares what you actually obtained with the maximum the equation allows, which is the <strong>theoretical yield</strong> calculated from the limiting reactant:</p>
<p>percentage yield = actual yield ÷ theoretical yield × 100 → <em>Key:</em> both masses are in grams (or both in moles, but never one of each); the result is a percentage of the theoretical maximum.</p>
<p>If 25.0 g of calcium carbonate should give 14.0 g of calcium oxide and a student collects 11.2 g, the yield is 11.2 ÷ 14.0 × 100 = 80.0 %. A yield above 100 % is impossible and always means the product is wet or impure, which is a standard exam question.</p>
<p>Yields are never 100 % in practice, for reasons worth learning as a list: the reaction may be reversible, so it never goes to completion; some product is lost in transferring between vessels, or left on filter paper; side reactions may convert some reactant to a different product; and the product may be impure or partly decomposed during drying. A high yield is a commercial advantage because the reactants were paid for, which is why industrial processes are designed around it.</p>

<h3>9. Atom economy</h3>
<p>Yield asks how much of the expected product you got. Atom economy asks a different question: of all the atoms you put in, how many ended up in the product you wanted?</p>
<p>percentage atom economy = (Mᵣ of the desired product ÷ total Mᵣ of all reactants) × 100 → <em>Key:</em> Mᵣ = relative formula mass (no units); the denominator is the sum of the Mᵣ of every reactant, as the equation is balanced, and by conservation of mass it equals the total Mᵣ of all products.</p>
<p>For CaCO₃ → CaO + CO₂, the desired product is CaO at 56 and the only reactant is CaCO₃ at 100, so the atom economy is 56 ÷ 100 × 100 = 56.0 %. The other 44 %, a whole molecule of carbon dioxide, is waste — which is truthful, because that is what the process produces.</p>
<p>The distinction is worth stating clearly, because examiners test it: a reaction can have a 100 % atom economy and a poor yield if it is slow or reversible, and a reaction can have a poor atom economy and a perfect yield. For example, the preparation of an ester has a low atom economy because water is also produced, yet it may go essentially to completion; the displacement of copper by zinc has a good one but may leave copper behind in the apparatus. Industry prefers a high atom economy because it means less waste to dispose of and less reactant bought per kilogram of product, both of which are cost and environmental arguments.</p>

<h3>10. Molar concentration</h3>
<p>Concentration is the amount of solute per unit volume of solution, and the working unit is mol/dm³, sometimes written M. One cubic decimetre is one litre, so 1 dm³ = 1000 cm³ and a volume in cm³ is divided by 1000 to become dm³.</p>
<p>c = n ÷ V → <em>Key:</em> c = concentration (mol/dm³); n = amount of solute (mol); V = volume of solution (dm³, not cm³). Rearranged, n = c × V and V = n ÷ c.</p>
<p>For example, 4.0 g of sodium hydroxide dissolved to make 250 cm³ of solution: n = m ÷ M = 4.0 ÷ 40 = 0.100 mol; V = 250 ÷ 1000 = 0.250 dm³; c = n ÷ V = 0.100 ÷ 0.250 = 0.400 mol/dm³. In the other direction, 250 cm³ of 0.200 mol/dm³ copper(II) sulfate contains n = c × V = 0.200 × 0.250 = 0.0500 mol, which is m = n × M = 0.0500 × 160 = 8.0 g of CuSO₄.</p>
<p>Concentration is not the same as amount. A 0.100 mol/dm³ solution in a 25 cm³ pipette contains 0.00250 mol, while the same concentration in a 1 dm³ flask contains 0.100 mol; the concentration is identical, the amount is forty times greater. That confusion is the single commonest error in titration arithmetic.</p>

<h3>11. Titration calculations</h3>
<p>A titration gives two volumes of solution that just neutralise each other, and one known concentration; the calculation finds the other concentration. The sequence is always the same: moles of the known solution, ratio from the equation, moles of the unknown, then divide by its volume in dm³.</p>
<p><strong>Example, 1 : 1 ratio.</strong> 25.0 cm³ of 0.100 mol/dm³ sodium hydroxide is neutralised by 20.0 cm³ of hydrochloric acid. NaOH + HCl → NaCl + H₂O, so the ratio is 1 : 1. Moles of alkali: n = c × V = 0.100 × 0.0250 = 0.00250 mol. Moles of acid = 0.00250 mol, and its volume is 20.0 ÷ 1000 = 0.0200 dm³. Then c = n ÷ V = 0.00250 ÷ 0.0200 = 0.125 mol/dm³.</p>
<p><strong>Example, 2 : 1 ratio.</strong> The same alkali is neutralised by 12.5 cm³ of sulfuric acid. H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O, so one mole of acid neutralises two moles of alkali. Moles of alkali are still 0.00250 mol, so moles of acid = 0.00250 ÷ 2 = 0.00125 mol, and c = 0.00125 ÷ 0.0125 = 0.100 mol/dm³. Notice how the ratio is applied to moles before the division: dividing the concentration by two instead is the error this example exists to catch.</p>
<p>The practical side matters too. Two concordant titres within 0.1 cm³ are averaged, because a single reading can be spoiled by one drop past the end point, and a titre that is far from the others is discarded rather than averaged in.</p>

<h3>12. Gas volumes</h3>
<p>One mole of any gas occupies the same volume at the same temperature and pressure, because the volume depends on the number of particles rather than on their mass. At room temperature and pressure that volume is 24 dm³ (24 000 cm³) per mole, so:</p>
<p>n = V ÷ 24 → <em>Key:</em> n = amount of gas (mol); V = volume at room temperature and pressure (dm³); 24 = molar gas volume (dm³/mol) at RTP, and it changes if the temperature or pressure changes.</p>
<p>So 0.0500 mol of carbon dioxide at RTP occupies V = n × 24 = 1.20 dm³, which is 1200 cm³. Combined with a reacting-mass calculation, the same relation answers how much gas a reaction produces: 25.0 g of calcium carbonate decomposes to 0.250 mol of CO₂, which is 0.250 × 24 = 6.00 dm³ at RTP. The temperature has to be stated because 24 dm³ applies at 20 °C and 1 atm; at other conditions the same amount of gas occupies a different volume, which is why the units include the conditions implicitly.</p>

<h3>13. Worked examples</h3>
<p><strong>Example 1.</strong> Calculate the percentage by mass of oxygen in copper(II) sulfate, CuSO₄.</p>
<p>Mᵣ = 63.5 + 32 + (4 × 16) = 159.5. Oxygen contributes 64, so the percentage is 64 ÷ 159.5 × 100 = 40.1 %. Rounding 63.5 to 64 would give 40.0 %, so keep the value you were given.</p>
<p><strong>Example 2.</strong> 6.50 g of zinc reacts completely with dilute hydrochloric acid. Calculate the mass of zinc chloride formed. Zn + 2HCl → ZnCl₂ + H₂.</p>
<p>n(Zn) = m ÷ M = 6.50 ÷ 65 = 0.100 mol. The ratio Zn : ZnCl₂ is 1 : 1, so n(ZnCl₂) = 0.100 mol. Mᵣ(ZnCl₂) = 65 + (2 × 35.5) = 136, so m = n × M = 0.100 × 136 = 13.6 g. The hydrogen escapes, which is why the mass of the solid product is greater than the mass of zinc that formed it — the chloride ions supplied the extra mass.</p>
<p><strong>Example 3.</strong> A reaction has a theoretical yield of 14.0 g and produces 11.2 g. Calculate the percentage yield, and state one reason the yield is below 100 %.</p>
<p>Percentage yield = 11.2 ÷ 14.0 × 100 = 80.0 %. A reason: some product was left behind on the filter paper when it was transferred, or the reaction is reversible and did not go to completion.</p>
<p><strong>Example 4.</strong> 25.0 cm³ of 0.100 mol/dm³ sodium hydroxide is titrated with sulfuric acid and 12.5 cm³ is needed. Calculate the concentration of the acid, and its mass concentration in g/dm³.</p>
<p>n(NaOH) = c × V = 0.100 × 0.0250 = 0.00250 mol; the ratio in H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O is 1 : 2, so n(H₂SO₄) = 0.00250 ÷ 2 = 0.00125 mol; c = n ÷ V = 0.00125 ÷ 0.0125 = 0.100 mol/dm³. The molar mass of H₂SO₄ is 98, so the mass concentration is 0.100 × 98 = 9.8 g/dm³.</p>

<h3>14. Exam-style questions</h3>
<ol>
  <li>Magnesium ribbon is burned in a crucible and the mass of the contents increases. Explain the increase in terms of the balanced equation. <em>Answer:</em> the magnesium combines with oxygen from the air, 2Mg + O₂ → 2MgO, so oxygen atoms are added to the system; the mass increases by exactly the mass of oxygen that reacted, and mass is conserved because the oxygen was part of the surroundings rather than the crucible.</li>
  <li>Calculate the relative formula mass of aluminium sulfate, Al₂(SO₄)₃. <em>Answer:</em> 2 × 27 + 3 × (32 + 4 × 16) = 54 + 3 × 96 = 342.</li>
  <li>Calculate the mass of carbon dioxide produced when 50.0 g of calcium carbonate is heated. CaCO₃ → CaO + CO₂. <em>Answer:</em> n(CaCO₃) = 50.0 ÷ 100 = 0.500 mol; the ratio is 1 : 1 so n(CO₂) = 0.500 mol; m = n × M = 0.500 × 44 = 22.0 g.</li>
  <li>Explain why a yield greater than 100 % is impossible. <em>Answer:</em> the theoretical yield is the maximum allowed by the limiting reactant and by conservation of mass, so a measured yield above it means the product is impure or still wet rather than that extra product was formed.</li>
  <li>For the reaction 2Na + Cl₂ → 2NaCl, calculate the atom economy. <em>Answer:</em> the desired product is NaCl with Mᵣ = 58.5 and two moles of it are formed, so the product mass is 117; the reactants are 2 × 23 + 71 = 117, so the atom economy is 117 ÷ 117 × 100 = 100 %, because there is only one product.</li>
  <li>0.500 mol/dm³ hydrochloric acid is used to make 2.00 dm³ of solution. Calculate the amount of acid in the solution and the mass of hydrogen chloride it contains. <em>Answer:</em> n = c × V = 0.500 × 2.00 = 1.00 mol; m = n × M = 1.00 × 36.5 = 36.5 g of HCl.</li>
  <li>12.0 g of magnesium is burned in 8.00 g of oxygen. Which reactant is limiting, and what mass of magnesium oxide forms? <em>Answer:</em> n(Mg) = 12.0 ÷ 24 = 0.500 mol and 0.500 ÷ 2 = 0.250; n(O₂) = 8.00 ÷ 32 = 0.250 mol and 0.250 ÷ 1 = 0.250; the values are equal, so neither is in excess and 0.500 mol of MgO forms, which is m = 0.500 × 40 = 20.0 g.</li>
  <li>A student obtains 3.60 g of copper from 4.00 g of copper(II) oxide reduced by hydrogen, CuO + H₂ → Cu + H₂O. Calculate the percentage yield. <em>Answer:</em> the theoretical yield is n(CuO) = 4.00 ÷ 79.5 = 0.0503 mol, so m(Cu) = 0.0503 × 63.5 = 3.19 g; the yield would then be 3.60 ÷ 3.19 × 100 = 113 %, which is impossible, so the product must be contaminated — a result worth suspecting rather than accepting.</li>
</ol>

<h3>15. Common mistakes</h3>
<ul>
  <li>Applying the equation's ratio to grams instead of moles. The ratio is between amounts, so both masses must be converted first.</li>
  <li>Leaving a volume in cm³ when dividing by it. A concentration in mol/dm³ needs the volume in dm³, so divide by 1000 first.</li>
  <li>Using the reactant that is in excess to calculate the product. Find the limiting reactant, then calculate from that.</li>
  <li>Confusing yield with atom economy. Yield compares actual with theoretical product; atom economy compares the wanted product with everything the reaction makes.</li>
  <li>Forgetting the water in a hydrated salt. CuSO₄·5H₂O has Mᵣ 250, not 160.</li>
  <li>Rounding relative atomic masses before the last step, which shifts the answer by more than the tolerance allowed.</li>
  <li>Balancing by changing a subscript. Changing H₂O to H₂O₂ changes the substance rather than the equation.</li>
  <li>Writing a mass change as a failure of conservation. Name the gas that escaped or the oxygen that joined instead.</li>
</ul>

<h3>16. Exam technique for this topic</h3>
<ul>
  <li>Write the three steps explicitly, every time: moles of what you know, ratio, moles of what you want. Most of the marks are awarded for the steps, not the final number.</li>
  <li>Give the unit on every answer, and check it is the unit asked for — mol, g, g/dm³, mol/dm³, dm³ or a percentage.</li>
  <li>Balance the equation before using it. An unbalanced equation gives the wrong ratio and the rest of the working inherits the error.</li>
  <li>Quote answers to three significant figures unless the question says otherwise, and keep the unrounded value in the calculator until the end.</li>
  <li>If the answer comes out absurd — a yield over 100 %, or a product heavier than all the reactants — say so; a sentence of comment often earns a mark on its own.</li>
  <li>For an "explain" question about a mass change, use the words "closed system" and name what entered or left.</li>
</ul>
`,
};
