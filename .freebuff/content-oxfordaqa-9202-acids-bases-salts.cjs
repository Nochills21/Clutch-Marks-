// OxfordAQA International GCSE Chemistry 9202 — topic 3.5 Acids, Bases and Salts.
// Statements covered: 3.5.1 The properties of acids and bases, 3.5.2 Preparation
// of salts.
//
// The salt-preparation half of this topic is a practical: the marks are for the
// reason each step is done, so the note gives the method and the explanation of
// the method together rather than a numbered recipe on its own.
module.exports = {
  topicSlug: "acids-bases-and-salts",
  title: "IGCSE Chemistry (OxfordAQA): Acids, Bases and Salts",
  html: `<h2>Acids, Bases and Salts</h2>
<p>Acids and bases are the most quoted chemistry in everyday life — vinegar, lemon juice, indigestion tablets, soap, bleach — and the exam asks about them in two quite different ways. The first is properties: what an acid does to an indicator, to a metal, to a carbonate, and why a strong acid is not the same thing as a concentrated one. The second is preparation: given a named salt, which method would you use to make it, and why would the other two methods fail. That second question is where most marks are lost, because it cannot be answered from memory of a recipe — it needs the solubility rules and the reason each step exists. Both are covered here, with the equations written to the state symbols the mark scheme asks for.</p>

<h3>1. What an acid and a base actually are</h3>
<p>An acid is a proton donor: it releases hydrogen ions, H⁺, when it is dissolved in water. A base is a proton acceptor: it takes those hydrogen ions. An alkali is simply a base that dissolves in water, and it is the alkali that supplies the hydroxide ions, OH⁻, that neutralise the acid.</p>
<ul>
  <li><strong>Acids:</strong> hydrochloric acid, HCl; sulfuric acid, H₂SO₄; nitric acid, HNO₃; ethanoic acid (the acid in vinegar), CH₃COOH; citric acid in citrus fruit.</li>
  <li><strong>Alkalis:</strong> sodium hydroxide, NaOH; potassium hydroxide, KOH; ammonia solution, NH₃(aq); calcium hydroxide solution, Ca(OH)₂, which is limewater.</li>
  <li><strong>Bases that are not alkalis:</strong> copper(II) oxide, CuO; magnesium oxide, MgO; iron(III) oxide, Fe₂O₃. These accept protons but do not dissolve in water, which is why they are used as solids in salt preparation.</li>
</ul>
<p>The distinction between an acid and an alkali is not about strength but about which ion is in excess. In acidic solution there are more H⁺ ions than OH⁻; in alkaline solution there are more OH⁻; in a neutral solution the two are equal, which is what pH 7 records. The reaction between them is neutralisation, and its ionic equation is the same for every acid-alkali pair: H⁺ + OH⁻ → H₂O.</p>

<h3>2. Indicators and the pH scale</h3>
<p>The pH scale runs from 0 to 14 and measures the concentration of hydrogen ions: the lower the pH, the more H⁺ ions are present. A change of one pH unit is a change by a factor of ten in that concentration, which is why pH 2 is a hundred times more acidic than pH 4, not twice.</p>
<table border="1">
  <tr><th>pH</th><th>Universal indicator colour</th><th>What it means</th></tr>
  <tr><td>1–3</td><td>Red to orange</td><td>Strong acid</td></tr>
  <tr><td>4–6</td><td>Orange to yellow</td><td>Weak acid</td></tr>
  <tr><td>7</td><td>Green</td><td>Neutral</td></tr>
  <tr><td>8–11</td><td>Blue to blue-green</td><td>Weak alkali</td></tr>
  <tr><td>12–14</td><td>Purple</td><td>Strong alkali</td></tr>
</table>
<p>Universal indicator gives an approximate pH from the colour. Two other indicators are used because they change sharply over a narrow range, which is what a titration needs: litmus is red in acid and blue in alkali; methyl orange is red in acid and yellow in alkali; phenolphthalein is colourless in acid and pink in alkali. Phenolphthalein is the usual choice when titrating an acid with an alkali, because the first permanent pink is easy to see and appears at the end point.</p>
<p>The most accurate measurement is a pH meter, which reads the pH as a number rather than a colour. That is the same point as the instrumental methods in chemical analysis: an instrument is more precise than a dye, at the cost of the equipment.</p>

<h3>3. The four reactions of acids</h3>
<p>Dilute acids react with four families of substance, and each produces a salt with something different:</p>
<ul>
  <li><strong>Metal:</strong> acid + metal → salt + hydrogen. Only for metals above hydrogen in the reactivity series: Mg + 2HCl → MgCl₂ + H₂.</li>
  <li><strong>Metal oxide or hydroxide (a base):</strong> acid + base → salt + water. CuO + H₂SO₄ → CuSO₄ + H₂O. This is neutralisation, and it is how most soluble salts are made.</li>
  <li><strong>Carbonate:</strong> acid + carbonate → salt + water + carbon dioxide. CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂. The fizzing is the carbon dioxide, which turns limewater milky.</li>
  <li><strong>Alkali:</strong> acid + alkali → salt + water. NaOH + HCl → NaCl + H₂O, with the ionic equation H⁺ + OH⁻ → H₂O.</li>
</ul>
<p>Every one of these produces a salt, and the salt is named from the two things that combined: the metal (or ammonium) from the base, and the acid's own ending. Hydrochloric acid gives chlorides, sulfuric acid gives sulfates, nitric acid gives nitrates, phosphoric acid gives phosphates, and ethanoic acid gives ethanoates. So copper(II) oxide with sulfuric acid gives copper(II) sulfate, and sodium hydroxide with nitric acid gives sodium nitrate.</p>
<p>Notice that the carbonate reaction fizzes while the oxide reaction does not. That difference is the reason an examiner can ask you to distinguish two white solids with one reagent: add dilute acid and only the carbonate effervesces.</p>

<h3>4. Strong and weak, concentrated and dilute</h3>
<p>These four words are examined together precisely because students mix them up. <strong>Strong</strong> and <strong>weak</strong> describe how completely an acid ionises in water. <strong>Concentrated</strong> and <strong>dilute</strong> describe how much acid there is per unit volume.</p>
<ul>
  <li>A <strong>strong acid</strong> is fully ionised: every HCl molecule becomes H⁺ and Cl⁻, so the solution is full of hydrogen ions.</li>
  <li>A <strong>weak acid</strong> is only partly ionised: most ethanoic acid molecules stay intact, so there are few H⁺ ions even in a concentrated solution.</li>
  <li>A <strong>concentrated</strong> solution has a large amount of acid dissolved in a given volume, whether it is strong or weak.</li>
  <li>A <strong>dilute</strong> solution has little acid per unit volume, whether it is strong or weak.</li>
</ul>
<p>The consequences are testable. A strong acid of a given concentration has a lower pH than a weak acid of the same concentration, conducts electricity better because there are more ions to carry the charge, and reacts faster with a metal for the same reason. But a concentrated weak acid can have a lower pH than a dilute strong acid, which is the trap: it is the concentration of H⁺ that sets the pH, and both strength and concentration affect it. Sulfuric acid is the awkward case worth knowing — it is strong and it is also dibasic, so one mole can supply two moles of H⁺.</p>

<h3>5. Solubility rules, and why they decide the method</h3>
<p>A salt can be prepared in three different ways, and the choice is forced by one question: is the salt soluble in water, and are the starting materials soluble?</p>
<table border="1">
  <tr><th>Salt type</th><th>Solubility in water</th></tr>
  <tr><td>Sodium, potassium and ammonium salts</td><td>All soluble</td></tr>
  <tr><td>Nitrates</td><td>All soluble</td></tr>
  <tr><td>Chlorides</td><td>Soluble, except silver chloride and lead(II) chloride</td></tr>
  <tr><td>Sulfates</td><td>Soluble, except barium sulfate and lead(II) sulfate; calcium sulfate is only slightly soluble</td></tr>
  <tr><td>Carbonates</td><td>Insoluble, except sodium, potassium and ammonium carbonates</td></tr>
  <tr><td>Hydroxides</td><td>Insoluble, except sodium and potassium hydroxides; calcium hydroxide is slightly soluble</td></tr>
</table>
<p>Those rules give the three methods. A <strong>soluble salt of a metal other than sodium, potassium or ammonium</strong> is made from the acid and an insoluble base, oxide or carbonate, adding the solid in excess. A <strong>soluble salt of sodium, potassium or ammonium</strong> cannot be made that way, because every candidate base is soluble too and there is no excess solid to filter off — so it is made by titration. An <strong>insoluble salt</strong> is made by precipitation, mixing two solutions that each contain one of its ions.</p>
<p>Copper(II) sulfate and sodium chloride show the contrast perfectly. Copper(II) sulfate is soluble and its base, copper(II) oxide, is not, so the acid-plus-excess-oxide method works. Sodium chloride is soluble and every sodium base is soluble, so adding excess sodium hydroxide to hydrochloric acid would leave sodium hydroxide in the product — the titration is the only way to get the exact amount.</p>

<h3>6. Preparing a soluble salt: acid plus excess insoluble base</h3>
<p>The method is the same whether the base is an oxide, a hydroxide, a carbonate or a metal, with one difference: a metal also produces hydrogen. For copper(II) sulfate from copper(II) oxide and dilute sulfuric acid:</p>
<ol>
  <li>Warm the acid gently and add copper(II) oxide a little at a time, stirring, until no more dissolves and some solid remains at the bottom. The excess is the point: it guarantees that all the acid has reacted, so the product cannot be contaminated with acid.</li>
  <li>Filter the mixture. The filtrate is the copper(II) sulfate solution; the residue is the unreacted copper(II) oxide.</li>
  <li>Heat the filtrate in an evaporating basin to concentrate it, stopping when crystals begin to appear at the edge — the crystallising point.</li>
  <li>Leave it to cool slowly so that large crystals form, then filter them off and dry them between sheets of filter paper.</li>
</ol>
<p>Each step has a reason, and the reasons are what get marked. Warming the acid speeds the reaction up. Adding the solid in excess rather than measuring it means you do not need to know the concentration of the acid. Filtering removes the excess. Evaporating only to the crystallising point, rather than to dryness, matters because heating a salt solution to dryness drives off the water of crystallisation, gives a powder rather than crystals, and concentrates any soluble impurity into the product.</p>
<p>With a carbonate the same method applies but the mixture fizzes, because carbon dioxide is released: CuCO₃ + H₂SO₄ → CuSO₄ + H₂O + CO₂. The excess solid is still needed, and it is still removed by filtration.</p>

<h3>7. Preparing a soluble salt of sodium, potassium or ammonium: titration</h3>
<p>Both reactants are soluble, so there is no excess solid to remove and the amounts must be measured exactly. That is what a titration does:</p>
<ol>
  <li>Pipette a measured volume of the acid (25.0 cm³ is standard) into a conical flask and add two or three drops of indicator.</li>
  <li>Fill a burette with the alkali, record the starting reading, and run it in until the indicator changes permanently. Record the final reading and subtract to get the volume added.</li>
  <li>Repeat until two readings agree to within 0.1 cm³ — concordant results — and take the average of those.</li>
  <li>Repeat the titration using the same volumes but <em>no indicator</em>, because the indicator would contaminate the salt. Evaporate the resulting solution to the crystallising point, cool and dry the crystals.</li>
</ol>
<p>Every detail earns a mark. Reading the burette at the bottom of the meniscus, at eye level, prevents a systematic error. Rinsing the pipette with the solution it will deliver, but the conical flask with distilled water, prevents dilution errors. The indicator is left out of the final run because the whole point is a pure salt, and the reason two concordant titrations are needed is that one reading can be spoiled by a single extra drop.</p>

<h3>8. Preparing an insoluble salt: precipitation</h3>
<p>When the salt is insoluble, it can be made by mixing two solutions that each supply one of its ions, and it appears immediately as a solid. Barium sulfate, the "barium meal" used in hospital X-rays because it does not dissolve and so is not absorbed, is made this way: BaCl₂ + Na₂SO₄ → BaSO₄ + 2NaCl, with the ionic equation Ba²⁺ + SO₄²⁻ → BaSO₄.</p>
<p>The practical steps are short but each has a reason:</p>
<ul>
  <li>Mix the two solutions — the precipitate forms at once.</li>
  <li>Filter to collect the solid on the filter paper.</li>
  <li>Wash the residue with distilled water, to remove the soluble sodium chloride that would otherwise dry onto the crystals.</li>
  <li>Dry it, usually in a warm oven or between filter papers.</li>
</ul>
<p>A silver halide is made the same way, from silver nitrate and a solution of the halide: Ag⁺ + Cl⁻ → AgCl. The choice of solutions is constrained by solubility, not by preference — you need one solution that is soluble and contains the cation and another that is soluble and contains the anion, which is why sodium sulfate is used as the sulfate source rather than, say, lead(II) sulfate.</p>

<h3>9. Water of crystallisation and hydrated salts</h3>
<p>Many salts crystallise with a fixed number of water molecules built into the crystal, written after a dot: CuSO₄·5H₂O is hydrated copper(II) sulfate, blue, with five water molecules per formula unit. Heating drives the water off and leaves the anhydrous salt, which is white: CuSO₄·5H₂O → CuSO₄ + 5H₂O. Adding water reverses it, and the blue colour returns.</p>
<p>That colour change is the standard test for water: anhydrous copper(II) sulfate turns from white to blue, and cobalt chloride paper turns from blue to pink. Both are tests for water rather than for purity — they confirm that water is present, not that it is pure.</p>
<p>The dot matters in calculations. The relative formula mass of the hydrated salt includes the water, so 1 mol of CuSO₄·5H₂O is 250 g, not 160 g, and the water is 90 of those 250 g. A question that asks for the percentage of water in a hydrated salt is asking you to add the water in before dividing.</p>

<h3>10. Worked examples</h3>
<p><strong>Example 1.</strong> Name the salt formed when magnesium oxide reacts with dilute hydrochloric acid, and write the balanced equation.</p>
<p>The metal is magnesium and the acid is hydrochloric, so the salt is magnesium chloride. The oxide is a base, so the products are a salt and water: MgO + 2HCl → MgCl₂ + H₂O. The equation balances with two HCl because magnesium is 2+ and chloride is 1−, so two chloride ions are needed.</p>
<p><strong>Example 2.</strong> Describe how you would prepare pure, dry crystals of copper(II) sulfate from copper(II) oxide and dilute sulfuric acid.</p>
<p>Warm the dilute sulfuric acid and add copper(II) oxide in excess, stirring until no more dissolves; filter off the excess oxide; evaporate the filtrate to the crystallising point; cool to crystallise; filter and dry the crystals between filter papers. The excess ensures the acid is fully used up, and stopping at the crystallising point rather than dryness keeps the water of crystallisation in the crystals.</p>
<p><strong>Example 3.</strong> 25.0 cm³ of sodium hydroxide solution is neutralised by 20.0 cm³ of hydrochloric acid of concentration 0.125 mol/dm³. Calculate the concentration of the sodium hydroxide.</p>
<p>The equation is NaOH + HCl → NaCl + H₂O, so the ratio is 1 : 1. The amounts come from n = c × V → <em>Key:</em> n = amount of solute (mol); c = concentration (mol/dm³); V = volume of solution (dm³), so a volume in cm³ is divided by 1000 before it is used. Moles of acid: n = c × V = 0.125 × 0.0200 = 0.00250 mol. Moles of alkali = 0.00250 mol, and its volume is 25.0 ÷ 1000 = 0.0250 dm³. Then c = n ÷ V = 0.00250 ÷ 0.0250 = 0.100 mol/dm³.</p>
<p><strong>Example 4.</strong> Explain why sodium chloride cannot be prepared by adding excess sodium hydroxide to hydrochloric acid.</p>
<p>Sodium hydroxide is soluble, so there would be no excess solid to filter off; any unreacted sodium hydroxide would stay in solution and contaminate the salt, and evaporating the solution would leave it in the product. The titration method is used instead, because it measures exactly the volume needed to neutralise the acid.</p>

<h3>11. Exam-style questions</h3>
<ol>
  <li>State what is meant by a weak acid and explain why it has a higher pH than a strong acid of the same concentration. <em>Answer:</em> a weak acid is only partially ionised in water, so few of its molecules release H⁺ ions; the concentration of hydrogen ions is therefore lower than in a strong acid of the same concentration, and a lower H⁺ concentration means a higher pH.</li>
  <li>Describe the test that would distinguish a carbonate from a metal oxide, using one reagent. <em>Answer:</em> add dilute acid to each; the carbonate effervesces because carbon dioxide is released and the gas turns limewater milky, while the oxide dissolves without effervescence to give a salt solution.</li>
  <li>Write the ionic equation for the neutralisation of hydrochloric acid by sodium hydroxide. <em>Answer:</em> H⁺ + OH⁻ → H₂O. The sodium and chloride ions are spectators and are left out.</li>
  <li>Name the salt formed from calcium carbonate and nitric acid, and write the balanced equation. <em>Answer:</em> calcium nitrate; CaCO₃ + 2HNO₃ → Ca(NO₃)₂ + H₂O + CO₂.</li>
  <li>Explain why the excess solid must be filtered off before the salt solution is evaporated. <em>Answer:</em> the excess base did not react, so leaving it in would contaminate the crystals and make the product impure; filtration removes it while the salt stays in the filtrate.</li>
  <li>Explain why an indicator is used in the first titration but not in the final one. <em>Answer:</em> the indicator shows when neutralisation is complete, which is how the required volume is found; it is left out of the final run because it would dissolve in the solution and contaminate the salt being prepared.</li>
  <li>A white precipitate forms when solutions of barium chloride and sodium sulfate are mixed. Name the precipitate, write the ionic equation, and state why the precipitate is washed with distilled water. <em>Answer:</em> barium sulfate; Ba²⁺ + SO₄²⁻ → BaSO₄; washing removes the soluble sodium chloride that would otherwise dry onto the precipitate and contaminate it.</li>
  <li>Explain why anhydrous copper(II) sulfate cannot be used to show that a liquid is pure water. <em>Answer:</em> the test only shows that water is present, since any solution containing water would turn the solid blue; purity needs a boiling point measurement, because pure water boils sharply at 100 °C and a solution boils over a range.</li>
</ol>

<h3>12. Common mistakes</h3>
<ul>
  <li>Treating "strong" and "concentrated" as the same word. Strong is about ionisation; concentrated is about how much is dissolved.</li>
  <li>Calling copper(II) oxide an alkali. It is a base, but it does not dissolve, so it is not an alkali.</li>
  <li>Writing that an acid plus a carbonate gives salt and water only. Carbon dioxide is the third product, and the mark scheme counts it.</li>
  <li>Using the titration method for a salt of an insoluble base. If the base is insoluble, the excess-solid method is simpler and is what the question expects.</li>
  <li>Forgetting to remove the indicator from the final titration, or using the average of non-concordant readings.</li>
  <li>Evaporating the salt solution to dryness and calling the powder crystals. The water of crystallisation is lost and the product is not what was asked for.</li>
  <li>Washing an insoluble precipitate with tap water rather than distilled water, which adds impurities instead of removing them.</li>
  <li>Mixing up the indicator colours: methyl orange is red in acid and yellow in alkali; phenolphthalein is colourless in acid and pink in alkali.</li>
</ul>

<h3>13. Exam technique for this topic</h3>
<ul>
  <li>When asked to "describe how you would prepare" a salt, give the steps in order and add a reason for the two steps that carry marks: the excess solid and the crystallising point.</li>
  <li>Name the salt before writing the equation, then check the formula against the charges. Magnesium chloride is MgCl₂ and not MgCl because Mg is 2+.</li>
  <li>For an "explain why" question about method, the answer is almost always solubility: which reagent dissolves, and therefore which method can remove what is left over.</li>
  <li>Write state symbols whenever the question shows them in the equation stem, and keep them consistent.</li>
  <li>If a titration volume is given in cm³, convert it to dm³ before any concentration calculation, and show that conversion — it is worth a mark on its own.</li>
  <li>For indicator questions, quote the colour <em>before</em> and <em>after</em> the change, not just the final colour.</li>
</ul>
`,
};
