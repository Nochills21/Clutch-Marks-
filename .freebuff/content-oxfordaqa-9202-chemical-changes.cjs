// OxfordAQA International GCSE Chemistry 9202 — topic 3.3 Chemical Changes.
// Statements covered: 3.3.1 Metals, 3.3.2 Electrolysis.
//
// Applied by .freebuff/seed-oxfordaqa-9202-notes.cjs (upsert on topic_id + title).
// Run `node .freebuff/gate-notes-depth.cjs chemistry-oxfordaqa IGCSE` after editing
// — the subject is resolved by NAME, not slug, so the slug audits nothing.
module.exports = {
  topicSlug: "chemical-changes",
  title: "IGCSE Chemistry (OxfordAQA): Chemical Changes",
  html: `<h2>Chemical Changes</h2>
<p>Two of the most examined ideas in the whole course sit in this topic. The first is the reactivity series, which turns a list of metals into a set of predictions: which metal reacts with water, which one displaces which from a solution, and why some metals can be dug out of the ground with carbon while others need electricity. The second is electrolysis, the reverse process — using a current to force a reaction that would never happen on its own. Both come down to one question about electrons: how easily does a species give them up, and how easily does another take them. Every equation in this note is written with the state symbols the mark scheme asks for, because losing them is one of the cheapest marks in the paper to drop.</p>

<h3>1. The reactivity series and what it measures</h3>
<p>A metal atom reacts by losing one or more outer electrons to become a positive ion. Potassium loses its single outer electron almost without being asked; gold holds on to its electrons so tightly that it survives unchanged for thousands of years in air and water. The reactivity series is simply the metals ranked by how readily they lose electrons, and the ranking is worth learning in order because almost every prediction in this topic is read off it:</p>
<p>potassium &gt; sodium &gt; calcium &gt; magnesium &gt; aluminium &gt; carbon &gt; zinc &gt; iron &gt; hydrogen &gt; copper &gt; silver &gt; gold</p>
<p>Two of those entries are not metals at all. <strong>Carbon</strong> and <strong>hydrogen</strong> are included as reference points, and they earn their place: a metal above carbon can be extracted from its oxide by heating it with carbon, and a metal below hydrogen does not react with dilute acids. The series therefore answers two exam questions at once — how a metal reacts, and how it is obtained.</p>
<table border="1">
  <tr><th>Metal</th><th>With oxygen</th><th>With water</th><th>With dilute acid</th><th>Extraction</th></tr>
  <tr><td>Potassium, sodium</td><td>Burns vigorously; oxide forms</td><td>Violent; hydroxide and hydrogen</td><td>Explosive</td><td>Electrolysis of molten compound</td></tr>
  <tr><td>Calcium, magnesium</td><td>Bright flame; white oxide</td><td>Calcium fizzes in cold water; magnesium needs steam</td><td>Rapid; hydrogen</td><td>Electrolysis</td></tr>
  <tr><td>Aluminium</td><td>Oxide layer forms at once</td><td>No reaction (protected by oxide)</td><td>Slow until oxide is removed</td><td>Electrolysis of molten oxide in cryolite</td></tr>
  <tr><td>Zinc, iron</td><td>React on heating</td><td>Steam only</td><td>Steady; hydrogen</td><td>Heating with carbon</td></tr>
  <tr><td>Copper, silver, gold</td><td>Copper reacts slowly; silver and gold not at all</td><td>No reaction</td><td>No reaction</td><td>Gold and silver found native; copper from its ore by roasting, then reduction</td></tr>
</table>
<p>Note what the table is not: it is not a list of "how reactive" in a vague sense. It is a ranking of the willingness to form a positive ion, and that is the phrase to use in an answer.</p>

<h3>2. Metals and oxygen</h3>
<p>Almost every metal reacts with oxygen to form an oxide, and the speed is the point of the series. A freshly cut piece of sodium tarnishes in seconds: 4Na + O₂ → 2Na₂O. Magnesium burns with a blinding white flame and leaves a white powder of magnesium oxide, 2Mg + O₂ → 2MgO. Copper must be heated before anything happens, and then it slowly turns black as copper(II) oxide forms, 2Cu + O₂ → 2CuO. Gold does not react even when strongly heated, which is why it is still found as the metal rather than as an ore.</p>
<p>Aluminium looks like an exception and is not. It is high in the series and should react quickly, but the first trace of oxide forms an unreactive Al₂O₃ layer that seals the metal away from further oxygen. That is why aluminium window frames do not corrode away, and also why aluminium does not react with water: the layer is already there. The same reaction can be deliberately thickened by anodising, pass a current through the metal in an acid bath to grow the oxide coat so that dyes can be trapped in it.</p>
<p>In all of these reactions the metal is <strong>oxidised</strong>: it gains oxygen, and it also loses electrons. The two definitions describe the same event, and the mark scheme accepts either as long as it is complete. The reverse reaction, in which a metal is obtained from its oxide, needs the oxide to lose oxygen, so the species that removes it — carbon, carbon monoxide, or hydrogen — is the <strong>reducing agent</strong>.</p>

<h3>3. Metals and water</h3>
<p>Reaction with water is the clearest demonstration of the series, because the observations differ so much that you can identify the metal from the tube. Potassium floats, melts into a ball, moves rapidly over the surface, ignites with a lilac flame, and leaves a solution of potassium hydroxide: 2K + 2H₂O → 2KOH + H₂. Sodium does the same with a yellow flame and rather less drama. Calcium sinks and fizzes steadily, and the calcium hydroxide that forms is only slightly soluble, so a white precipitate appears: Ca + 2H₂O → Ca(OH)₂ + H₂.</p>
<p>Magnesium is where cold water stops being enough. It reacts so slowly with cold water that nothing seems to happen, but in a tube of steam it reacts rapidly and glows: Mg + H₂O → MgO + H₂. The product is the oxide, not the hydroxide, because steam is hot enough to dehydrate it. Zinc and iron also need steam, and their reactions are reversible, so the arrow should be a double arrow: Zn + H₂O ⇌ ZnO + H₂ and 3Fe + 4H₂O ⇌ Fe₃O₄ + 4H₂. Copper, silver and gold do not react with water or steam at all.</p>
<p>Iron's slow reaction with water and oxygen is rusting, and it is worth separating from the rest: rusting needs both water and oxygen, it is not the same as the steam reaction, and it is prevented by excluding one of them — paint, oil, or a more reactive metal in contact with the iron.</p>

<h3>4. Metals and dilute acids</h3>
<p>A metal above hydrogen in the series displaces hydrogen from a dilute acid, producing a salt and hydrogen gas. The salt is named from the acid: hydrochloric acid gives chlorides, sulfuric acid gives sulfates, nitric acid gives nitrates. For example Mg + 2HCl → MgCl₂ + H₂, Zn + H₂SO₄ → ZnSO₄ + H₂, and 2Al + 6HCl → 2AlCl₃ + 3H₂.</p>
<p>Iron is the one to be careful with. With dilute hydrochloric acid it forms iron(II) chloride and not iron(III), because the acid is not oxidising enough to take iron to its higher state: Fe + 2HCl → FeCl₂ + H₂. The green colour of the solution and the pale green of the Fe²⁺ ion are the evidence for that.</p>
<p>The test for the gas produced is worth knowing exactly: hold a lighted splint to the mouth of the tube and a squeaky pop confirms hydrogen. Copper, silver and gold give no reaction at all — a copper coin in acid stays shiny, which is why the series puts them below hydrogen. Sodium and potassium are never used in this experiment because they react with the water in the acid, and violently.</p>
<p>Finally, the speed of the reaction also follows the series: magnesium fizzes so vigorously that the tube warms sharply, zinc steadily, iron slowly. That observation, not a memorised list, is the experimental evidence for the order.</p>

<h3>5. Displacement reactions</h3>
<p>Put a piece of zinc into blue copper(II) sulfate solution and two things happen at once: the blue colour fades towards colourless, and a red-brown deposit of copper appears on the zinc. Zinc is above copper, so zinc takes the copper's place: Zn + CuSO₄ → ZnSO₄ + Cu. Written as ions, only the ions that change appear, and the spectator sulfate is dropped: Zn + Cu²⁺ → Zn²⁺ + Cu.</p>
<p>Split that into half equations and the electron transfer is visible: Zn → Zn²⁺ + 2e⁻ is oxidation, because electrons are lost; Cu²⁺ + 2e⁻ → Cu is reduction, because electrons are gained. Nothing else is oxidised and nothing else is reduced, so zinc is the reducing agent and the copper ion is the oxidising agent. A mark scheme will accept either the ionic equation or the pair of half equations, but it will not accept a mixture of the two.</p>
<p>The reaction runs one way only. Copper cannot displace zinc, so putting copper into zinc sulfate does nothing — the absence of a reaction is itself evidence for the order. The same test can be used to build the series from scratch: each metal displaces every metal below it from solution and none above it.</p>
<p>The most spectacular displacement is the thermite reaction, 2Al + Fe₂O₃ → Al₂O₃ + 2Fe, in which aluminium takes the oxygen from iron(III) oxide. It releases so much heat that the iron is produced molten, which is why the reaction is used to weld railway track in place. Displacement is also the principle behind protecting iron: a zinc coating (galvanising) or a magnesium block bolted to a ship's hull corrodes instead of the iron, because it is more reactive. That is called sacrificial protection.</p>

<h3>6. Extracting metals</h3>
<p>The method used to obtain a metal follows directly from its position. Metals that hold their electrons weakly are the hardest to reduce, so they need the strongest possible method, and electricity is the strongest method available. Metals low in the series can be reduced by carbon or even found native.</p>
<ul>
  <li><strong>Found native:</strong> gold, silver and platinum, because they do not react with oxygen or water.</li>
  <li><strong>Heating the oxide alone:</strong> silver and mercury, whose oxides decompose on heating.</li>
  <li><strong>Heating with carbon or carbon monoxide:</strong> zinc, iron, lead and copper, all below carbon in the series.</li>
  <li><strong>Electrolysis:</strong> potassium, sodium, calcium, magnesium and aluminium, all above carbon.</li>
</ul>
<p>Iron is the case the spec expects you to know in detail. In a blast furnace, coke burns to carbon dioxide, C + O₂ → CO₂, and that carbon dioxide is reduced by more coke to carbon monoxide, CO₂ + C → 2CO. The carbon monoxide then reduces the iron(III) oxide: Fe₂O₃ + 3CO → 2Fe + 3CO₂. Limestone is added to remove the sandy impurity: it decomposes to calcium oxide, CaCO₃ → CaO + CO₂, and the calcium oxide reacts with silicon dioxide to form a slag, CaO + SiO₂ → CaSiO₃. The slag floats on the molten iron and is tapped off separately.</p>
<p>Aluminium cannot be extracted with carbon, because aluminium is above carbon and carbon is not a strong enough reducing agent: the oxide and the carbon would simply sit there. Instead the oxide is dissolved in molten cryolite, which lowers the working temperature from over 2000 °C to about 950 °C and saves a great deal of energy, and electrolysed: 2Al₂O₃ → 4Al + 3O₂. Electrolysis is expensive because it consumes electricity, which is the reason aluminium is worth recycling rather than re-smelting.</p>

<h3>7. Worked examples — metals</h3>
<p><strong>Example 1.</strong> A student adds a strip of zinc to lead(II) nitrate solution. Predict the observation, write the ionic equation, and identify what is oxidised.</p>
<p>Zinc is above lead in the series, so a displacement occurs. The lead is deposited as a grey solid and the solution stays colourless, because both Zn²⁺ and Pb²⁺ are colourless, so the only visible change is the deposit. Ionic equation: Zn + Pb²⁺ → Zn²⁺ + Pb → <em>Key:</em> the arrow means "reacts to form", and the two-electron transfer is implied because each ion has charge 2. Zinc loses electrons, so zinc is oxidised and is the reducing agent.</p>
<p><strong>Example 2.</strong> A factory needs a container for copper(II) sulfate solution. Explain why a galvanised (zinc-coated) steel tank is a poor choice, and name a metal that would be suitable.</p>
<p>Zinc is more reactive than copper, so it would displace the copper from the solution and dissolve into it, contaminating the product and destroying the coating. A metal below copper in the series does not react with copper ions, so silver (or gold) would be suitable; in practice the tank would be lined with plastic for cost.</p>
<p><strong>Example 3.</strong> What mass of zinc is needed to displace all the copper from 25.0 cm³ of 0.100 mol/dm³ copper(II) sulfate solution?</p>
<p>First the amount of copper ions: n = c V = 0.100 × 0.0250 = 0.00250 mol. The equation Zn + Cu²⁺ → Zn²⁺ + Cu shows a 1 : 1 ratio, so zinc needed = 0.00250 mol. Then m = n M = 0.00250 × 65.4 = 0.1635 g, which is 0.164 g to three significant figures. Writing the ratio out is worth a mark on its own; jumping from the concentration to the mass is where most marks are lost.</p>

<h3>8. Electrolysis: what it needs</h3>
<p>Electrolysis is the decomposition of an ionic compound by passing a direct current through it, either molten or dissolved in water. It requires four things, and an exam answer that misses one of them is incomplete:</p>
<ul>
  <li>an <strong>electrolyte</strong> — an ionic compound, molten or in aqueous solution, so that its ions are free to move;</li>
  <li><strong>free ions</strong> — a solid ionic lattice does not conduct, because the ions are held in fixed positions, which is why solid sodium chloride is an insulator;</li>
  <li>two <strong>electrodes</strong>, usually graphite or platinum, which are inert and conduct the current into the electrolyte;</li>
  <li>a <strong>direct current</strong> supply, because alternating current would reverse the reactions at each electrode before any product accumulated.</li>
</ul>
<p>The naming is worth fixing firmly, because it is examined every year: the <strong>cathode is the negative electrode</strong> and the <strong>anode is the positive electrode</strong>. Cations (positive ions) are attracted to the cathode, where they gain electrons and are reduced. Anions (negative ions) are attracted to the anode, where they lose electrons and are oxidised. The mnemonic PANIC — Positive Anode, Negative Is Cathode — is worth the two seconds it takes.</p>
<p>Reduction at the cathode and oxidation at the anode means electrolysis is a redox process in which the electrical supply does the work. The electrons are not created or destroyed: they are pushed into the cathode by the supply and pulled out of the anode, and they travel through the external circuit while the ions carry the charge through the electrolyte.</p>

<h3>9. Electrolysis of molten compounds</h3>
<p>Molten lead(II) bromide is the standard example, because both products are visible. The cathode is coated with silvery beads of lead and a brown vapour of bromine collects at the anode. At the cathode: Pb²⁺ + 2e⁻ → Pb. At the anode: 2Br⁻ → Br₂ + 2e⁻. Adding them gives the overall change, PbBr₂ → Pb + Br₂.</p>
<p>Aluminium is produced the same way at industrial scale. The electrolyte is aluminium oxide dissolved in cryolite, and the electrodes are carbon. At the cathode: Al³⁺ + 3e⁻ → Al. At the anode: 2O²⁻ → O₂ + 4e⁻. The oxygen produced attacks the hot carbon anode, forming carbon dioxide, so the anodes are gradually eaten away and have to be replaced — a running cost that the spec likes to test as an "explain why" question.</p>
<p>Water would ruin both examples. If water is present, the water itself competes at the electrodes, and a metal that is above hydrogen in the series will not be deposited from an aqueous solution at all — hydrogen comes off instead. That is the single most important sentence in this topic, and it is why aluminium must be electrolysed as the molten oxide.</p>

<h3>10. Electrolysis of aqueous solutions</h3>
<p>In water there are always two extra ions available, H⁺ and OH⁻, so each electrode becomes a competition, and the winner is decided by two rules. At the <strong>cathode</strong>, a metal below hydrogen in the series is deposited and hydrogen is produced for every other metal. At the <strong>anode</strong>, a halogen is produced if a halide ion is present and the solution is concentrated; otherwise oxygen is produced.</p>
<p>Concentrated sodium chloride solution (brine) shows both rules at once. At the cathode, hydrogen: 2H⁺ + 2e⁻ → H₂. At the anode, chlorine: 2Cl⁻ → Cl₂ + 2e⁻. Sodium ions stay in solution, so the liquid left behind is sodium hydroxide, and all three products are useful: 2NaCl + 2H₂O → 2NaOH + H₂ + Cl₂. If the same experiment is repeated with very dilute sodium chloride, the chloride is too dilute to compete and oxygen is produced at the anode instead — the observation that distinguishes the two cases is the smell of chlorine.</p>
<p>Copper(II) sulfate solution with inert electrodes behaves differently again. Copper is below hydrogen, so copper is deposited at the cathode: Cu²⁺ + 2e⁻ → Cu. At the anode, oxygen: 4OH⁻ → O₂ + 2H₂O + 4e⁻. The blue colour fades as the copper ions are removed, and the solution becomes acidic because sulfuric acid is left behind: 2CuSO₄ + 2H₂O → 2Cu + O₂ + 2H₂SO₄.</p>
<p>Now change the electrodes to copper and something important happens. The anode is no longer inert, so it dissolves: Cu → Cu²⁺ + 2e⁻. The cathode plates copper out of the solution: Cu²⁺ + 2e⁻ → Cu. The concentration of copper ions stays constant, and the net effect is that copper moves from the anode to the cathode. That is exactly how copper is refined — the impure copper is the anode and the pure copper is the cathode — and exactly how electroplating works.</p>
<p>To electroplate an object, make it the cathode, make the plating metal the anode, and use a solution of that metal's ions as the electrolyte. The coating improves appearance or resistance to corrosion; a steel spoon plated with silver is the standard example. The longer the current is passed, the thicker the coat, which is why current and time are the two variables in an electroplating question.</p>

<h3>11. Worked examples — electrolysis</h3>
<p><strong>Example 1.</strong> Predict the products at each electrode when concentrated potassium chloride solution is electrolysed with inert electrodes, and write the half equation for the anode.</p>
<p>Potassium is above hydrogen, so hydrogen is produced at the cathode. Chloride is a halide and the solution is concentrated, so chlorine is produced at the anode: 2Cl⁻ → Cl₂ + 2e⁻. The solution becomes potassium hydroxide, so this is a way of making an alkali and a halogen at the same time.</p>
<p><strong>Example 2.</strong> A steel spoon is to be plated with silver. State the electrode the spoon must be, name a suitable electrolyte, and write the half equation at the spoon.</p>
<p>The spoon is the cathode, because reduction — the gain of electrons — has to happen where the metal is deposited. The electrolyte is silver nitrate solution, since it supplies Ag⁺ ions. At the spoon: Ag⁺ + e⁻ → Ag. At the silver anode the reverse happens, Ag → Ag⁺ + e⁻, which keeps the concentration of silver ions in the solution constant.</p>
<p><strong>Example 3.</strong> What mass of copper is deposited at the cathode when 0.0500 mol of electrons pass through copper(II) sulfate solution?</p>
<p>The half equation Cu²⁺ + 2e⁻ → Cu shows two moles of electrons per mole of copper, so n(Cu) = 0.0500 ÷ 2 = 0.0250 mol. Then m = n M = 0.0250 × 63.5 = 1.5875 g, which is 1.59 g to three significant figures. The ratio is the whole question: assuming one electron per copper ion gives an answer that is exactly twice too large.</p>

<h3>12. Exam-style questions</h3>
<ol>
  <li>Explain why potassium reacts more vigorously with water than calcium. <em>Answer:</em> potassium is higher in the reactivity series, so it loses its single outer electron more readily than calcium does; less energy is needed to remove the electron, so the reaction with water is faster and more exothermic.</li>
  <li>Write the balanced equation for the reaction of magnesium with steam and name the products. <em>Answer:</em> Mg + H₂O → MgO + H₂; the products are magnesium oxide and hydrogen. The oxide forms rather than the hydroxide because steam is hot enough to dehydrate it.</li>
  <li>Zinc is added to iron(II) sulfate solution. State the observation and write the ionic equation. <em>Answer:</em> the pale green colour of the iron(II) ions fades and a grey deposit of iron forms on the zinc; Zn + Fe²⁺ → Zn²⁺ + Fe, because zinc is above iron in the series.</li>
  <li>Explain why aluminium is extracted by electrolysis rather than by heating its oxide with carbon. <em>Answer:</em> aluminium is above carbon in the reactivity series, so carbon is not a strong enough reducing agent to remove the oxygen; electrolysis of the molten oxide dissolved in cryolite is needed instead.</li>
  <li>Explain why solid sodium chloride does not conduct electricity but molten sodium chloride does. <em>Answer:</em> in the solid the ions are held in fixed positions in the lattice and cannot move, so there is no mobile charge carrier; when molten, the lattice breaks down and the ions are free to move to the electrodes and carry the current.</li>
  <li>Copper(II) sulfate solution is electrolysed with copper electrodes. Explain why the blue colour does not fade, unlike the same experiment with inert electrodes. <em>Answer:</em> the copper anode dissolves at the same rate as copper is deposited at the cathode, so the concentration of copper ions in the solution stays constant; with inert electrodes the copper ions are removed and not replaced, so the colour fades.</li>
  <li>State two reasons why electrolysis is an expensive way to extract a metal. <em>Answer:</em> it requires a large, continuous supply of electrical energy; and the carbon anodes are consumed by the oxygen produced, so they must be replaced regularly.</li>
</ol>

<h3>13. Common mistakes</h3>
<ul>
  <li>Mixing up the electrodes. The cathode is negative and attracts cations, where reduction happens; the anode is positive and attracts anions, where oxidation happens. Write PANIC on the top of your rough page.</li>
  <li>Saying "the metal reacts with water" for zinc or iron without mentioning steam. Neither reacts with cold water in a visible way.</li>
  <li>Writing copper as reacting with dilute acid. It is below hydrogen in the series, so it does not.</li>
  <li>Giving iron(II) chloride as FeCl₃. Dilute hydrochloric acid produces iron(II) chloride, FeCl₂.</li>
  <li>Reversing a displacement. The more reactive metal displaces the less reactive one, never the other way round.</li>
  <li>Assuming hydrogen is always produced at the cathode in aqueous solution. Copper, silver and gold are deposited instead, because they are below hydrogen.</li>
  <li>Assuming chlorine is always produced at the anode when a chloride is present. It has to be concentrated; in dilute solution oxygen is produced.</li>
  <li>Forgetting the state symbols in an electrolysis half equation, or writing "e" without its charge. Electrons are e⁻.</li>
</ul>

<h3>14. Exam technique for this topic</h3>
<ul>
  <li>When asked to explain a difference in reactivity, name the electron loss and say how easily it happens. "It is more reactive" alone scores nothing beyond the first mark.</li>
  <li>For an observation question, give the colour change or the gas test, not the name of the product. "A red-brown solid forms" is an observation; "copper is produced" is a conclusion.</li>
  <li>In electrolysis questions, work through it in order: is the electrolyte molten or aqueous; what ions are present; which ion wins at each electrode; then write the half equation. Doing it in that order prevents most errors.</li>
  <li>Balance half equations by atoms first and charge second. The charge on each side must match, which is the check that catches a missing electron.</li>
  <li>For a calculation, always write the mole ratio from the equation before substituting numbers. Examiners award a mark for the ratio even when the arithmetic goes wrong.</li>
  <li>If the question says "suggest", the answer is usually a consequence of the series — lower reactivity, harder to reduce, needs electrolysis — rather than a fact you were supposed to memorise.</li>
</ul>
`,
};
