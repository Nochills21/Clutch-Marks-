// OxfordAQA International GCSE Chemistry 9202 — topic 3.7 Trends within the
// Periodic Table.
// Statements covered: 3.7.1 Group properties, 3.7.2 Transition metals.
//
// The exam asks "explain the trend", not "state the trend", so every group here
// is taught as a consequence of atomic structure: distance and shielding for the
// metals, the same two plus nuclear charge for the non-metals. A student who can
// say which way the trend goes but not why loses the second mark on every part.
module.exports = {
  topicSlug: "trends-within-the-periodic-table",
  title: "IGCSE Chemistry (OxfordAQA): Trends within the Periodic Table",
  html: `<h2>Trends within the Periodic Table</h2>
<p>The Periodic Table is arranged in order of increasing atomic number, and that single decision explains almost every trend the course asks about. Elements in the same group have the same number of electrons in their outer shell, so they react in the same way; the trends down a group come from where that outer shell sits relative to the nucleus. This topic takes the three groups the specification names — Group 1, Group 7 and Group 0 — and works out why reactivity changes in the direction it does, then turns to the block of transition metals, whose properties are different enough that the exam expects you to contrast them with Group 1 in a table. Every trend below is written with its explanation, because the explanation is the mark.</p>

<h3>1. What a group is, and what changes down it</h3>
<p>A group is a vertical column. Elements in one group have the same number of outer-shell electrons — one for Group 1, seven for Group 7, a full shell for Group 0 — and that number, not the mass, is what decides how an element reacts. Going down a group the atoms get larger: each element has one more shell than the one above it, so the outer electron is further from the nucleus, and the inner shells shield it from the nuclear charge.</p>
<ul>
  <li><strong>Down a group, the outer shell is further out and more shielded.</strong> The nucleus still attracts the outer electrons, but the pull at the surface is weaker because of the extra distance and the extra shells in between.</li>
  <li><strong>Across a period, atoms get smaller and the nuclear charge grows.</strong> The electrons are added to the same shell, so the pull on that shell increases from left to right.</li>
  <li><strong>Metals lose electrons, non-metals gain them.</strong> A Group 1 atom has one outer electron and loses it easily; a Group 7 atom needs one more and takes it readily. This is why the two groups sit at opposite ends of the table and behave in opposite ways.</li>
</ul>

<h3>2. Group 1: the alkali metals</h3>
<p>Lithium, sodium, potassium, rubidium and caesium are soft, low-density metals stored under oil because they react with water and with the air. They are called alkali metals because the hydroxide they form when they react with water is an alkali.</p>
<p>Reactivity <em>increases</em> down the group, and the reason is the outer electron. Going down, that electron is in a shell further from the nucleus and is shielded by more inner shells, so it is held less tightly and is lost more easily. The ion that forms is always 1+, and that is what makes the chemistry so regular: every Group 1 element forms the same compounds with the same formulas.</p>
<table border="1">
  <tr><th>Property</th><th>Trend down Group 1</th><th>Reason</th></tr>
  <tr><td>Reactivity with water</td><td>Increases</td><td>The outer electron is lost more easily</td></tr>
  <tr><td>Melting point</td><td>Decreases</td><td>The atoms are larger, so the metallic bonding holds them less strongly</td></tr>
  <tr><td>Softness</td><td>Increases</td><td>Weaker metallic bonding, so the metal is easier to cut</td></tr>
  <tr><td>Density</td><td>Generally increases</td><td>The atoms are heavier; potassium is the exception, and floats on water</td></tr>
</table>

<h3>3. Group 1 reactions you must be able to write</h3>
<p>Every Group 1 metal reacts in the same three ways, and the equations follow the same pattern, which is why knowing one element is enough to predict the rest.</p>
<ul>
  <li><strong>With water</strong> it forms the metal hydroxide and hydrogen. Sodium melts into a ball and fizzes; potassium burns with a lilac flame and the reaction is violent enough to be dangerous. 2Na + 2H₂O → 2NaOH + H₂</li>
  <li><strong>With oxygen</strong> it forms the metal oxide. 4Na + O₂ → 2Na₂O</li>
  <li><strong>With chlorine</strong> it forms the metal chloride, a white solid. 2Na + Cl₂ → 2NaCl</li>
</ul>
<p>The observation to quote is the one that changes down the group: lithium fizzes steadily and moves slowly, sodium fizzes vigorously and may melt, potassium ignites the hydrogen it produces. "It reacted" earns nothing; "it moved, fizzing, and shrank to a ball" is the observation the mark scheme pays for.</p>

<h3>4. Group 7: the halogens</h3>
<p>Fluorine, chlorine, bromine, iodine and astatine each have seven outer electrons and need one more to complete the shell, so they form 1− ions and pair up as diatomic molecules: F₂, Cl₂, Br₂, I₂. Their appearance and state change steadily down the group, which is a common one-mark question.</p>
<table border="1">
  <tr><th>Halogen</th><th>State at room temperature</th><th>Colour</th></tr>
  <tr><td>Fluorine, F₂</td><td>Gas</td><td>Pale yellow</td></tr>
  <tr><td>Chlorine, Cl₂</td><td>Gas</td><td>Greenish yellow</td></tr>
  <tr><td>Bromine, Br₂</td><td>Liquid</td><td>Red-brown, with an orange vapour</td></tr>
  <tr><td>Iodine, I₂</td><td>Solid</td><td>Grey-black, giving a purple vapour on heating</td></tr>
</table>
<p>Reactivity <em>decreases</em> down the group, which is the opposite of Group 1, and the reason is the same fact read backwards. A halogen reacts by gaining an electron, and the nucleus must attract an electron into its outer shell. Down the group that shell is further from the nucleus and more shielded, so the attraction is weaker, the electron is gained less readily, and the element is less reactive.</p>

<h3>5. Displacement: how the trend is tested</h3>
<p>A more reactive halogen displaces a less reactive one from a solution of its salt. This is the standard practical test of the trend, and it is a redox reaction: the halogen that is displaced is oxidised back to the element, and the halogen doing the displacing is reduced.</p>
<ul>
  <li>Chlorine added to potassium bromide solution turns it orange, because bromine is made: Cl₂ + 2KBr → 2KCl + Br₂</li>
  <li>Chlorine added to potassium iodide solution turns it brown, because iodine is made: Cl₂ + 2KI → 2KCl + I₂</li>
  <li>Bromine added to potassium iodide solution turns it brown: Br₂ + 2KI → 2KBr + I₂</li>
  <li>Bromine added to potassium chloride solution does nothing, because chlorine is more reactive and cannot be displaced.</li>
</ul>
<p>Read the direction of each equation as evidence rather than something to memorise: the element on the left is the more reactive one, and it is the one that ends up in the compound.</p>

<h3>6. Group 0: the noble gases</h3>
<p>Helium, neon, argon, krypton and xenon have a full outer shell, so they neither lose nor gain electrons readily and are almost completely unreactive. They exist as single atoms rather than molecules, which is why their formulas are written He, Ne and Ar with no subscript.</p>
<ul>
  <li><strong>Helium</strong> is used in balloons and airships because it is less dense than air and does not burn.</li>
  <li><strong>Argon</strong> fills filament lamps and shields a weld, because being unreactive it will not react with the hot metal.</li>
  <li><strong>Neon</strong> is used in advertising signs, where an electric discharge makes it glow.</li>
</ul>
<p>Boiling point <em>increases</em> down the group even though reactivity does not change. Larger atoms have more electrons, so the intermolecular forces between their atoms are stronger and more energy is needed to separate them. That is a common exam trap: unreactive does not mean low boiling point.</p>

<h3>7. Transition metals: what makes them different</h3>
<p>The transition metals sit between Group 2 and Group 3, and they are the metals of everyday life: iron, copper, zinc, nickel, silver, gold. They are not one group in the same sense as Group 1 — their outer shells are similar but not identical — so their properties vary more. The specification asks you to know the typical properties and to contrast them with Group 1.</p>
<table border="1">
  <tr><th>Property</th><th>Group 1 metals</th><th>Transition metals</th></tr>
  <tr><td>Hardness</td><td>Soft, cut with a knife</td><td>Hard and strong</td></tr>
  <tr><td>Density</td><td>Low; lithium, sodium and potassium float</td><td>High; most sink</td></tr>
  <tr><td>Melting point</td><td>Low, and falling down the group</td><td>High, except mercury, which is liquid</td></tr>
  <tr><td>Reactivity</td><td>Very reactive, reacting with cold water</td><td>Much less reactive; many do not react with water at all</td></tr>
  <tr><td>Compounds</td><td>White or colourless</td><td>Often coloured</td></tr>
  <tr><td>Ions</td><td>One charge only, 1+</td><td>Several charges, for example Fe²⁺ and Fe³⁺</td></tr>
  <tr><td>Catalytic activity</td><td>Rare</td><td>Common</td></tr>
</table>
<p>Two of those rows carry most of the marks. <strong>Variable oxidation state</strong> means the same metal can form more than one compound with different formulas — iron(II) chloride, FeCl₂, and iron(III) chloride, FeCl₃ — which is why the Roman numeral in the name is not decoration. <strong>Coloured compounds</strong> means a solution of copper(II) sulfate is blue and one of iron(II) sulfate is pale green, so colour becomes evidence for which ion is present.</p>

<h3>8. Transition metals as catalysts</h3>
<p>A catalyst speeds up a reaction without being used up, and transition metals are the standard examples because their surfaces and their variable oxidation states let them hold reacting species in place. Three named ones are worth learning, because each belongs to a process the specification also covers.</p>
<ul>
  <li><strong>Iron</strong> catalyses the Haber process, N₂ + 3H₂ ⇌ 2NH₃.</li>
  <li><strong>Vanadium(V) oxide, V₂O₅</strong> catalyses the Contact process, 2SO₂ + O₂ ⇌ 2SO₃, which makes sulfuric acid.</li>
  <li><strong>Nickel</strong> catalyses the hydrogenation of alkenes, turning an unsaturated oil into a saturated fat.</li>
</ul>
<p>Note what a catalyst does and does not do: it lowers the activation energy by providing an alternative pathway, so more collisions have enough energy to succeed. It does not change the position of an equilibrium, and it does not change the yield — it only gets the mixture there sooner.</p>

<h3>9. Worked example: identifying a metal from its density</h3>
<p>A student is given a rectangular bar of an unknown silvery metal. It has a mass of 178 g and a volume of 20.0 cm³. Decide whether it is a Group 1 metal or a transition metal.</p>
<p>ρ = m / V = 178 g ÷ 20.0 cm³ = 8.90 g/cm³</p>
<p><em>Key:</em> ρ = density (g/cm³); m = mass (g); V = volume (cm³).</p>
<p>The density is 8.90 g/cm³, which is close to copper (8.96 g/cm³) and nickel (8.90 g/cm³) and is far above the Group 1 metals, whose densities are all below 2 g/cm³ and three of which float on water. The metal is therefore a transition metal.</p>
<p>The reasoning matters more than the number: a density near 9 g/cm³ could not belong to a Group 1 element, because those atoms are large and pack loosely, while transition metal atoms are smaller and their metallic bonding pulls them together tightly. If the question gives you the mass and the dimensions instead, find the volume first by multiplying length by width by height, and keep the units consistent before dividing.</p>

<h3>10. Typical mistakes</h3>
<ul>
  <li>Saying reactivity increases down Group 7 as well as Group 1. It increases down Group 1 and decreases down Group 7, and both are explained by the same distance-and-shielding argument.</li>
  <li>Giving the trend without the reason. "Potassium is more reactive than sodium" is worth one mark; "because its outer electron is further from the nucleus and more shielded, so it is lost more easily" is worth the second.</li>
  <li>Writing Group 1 formulas as if the metal were 2+. Sodium chloride is NaCl, not NaCl₂, because the sodium ion is Na⁺.</li>
  <li>Saying the noble gases have a low boiling point because they are unreactive. The two facts are separate: their boiling points rise down the group with the number of electrons.</li>
  <li>Assuming every transition metal is magnetic, or that every one is a good catalyst. Manganese and copper are transition metals, and neither is magnetic in the way iron is.</li>
  <li>Calling a catalyst a reactant, or claiming it increases the yield. It increases the rate and is recovered at the end.</li>
</ul>

<h3>11. Exam-style questions</h3>
<ol>
  <li>Explain why potassium reacts more vigorously with water than sodium does. <em>Answer:</em> Potassium's outer electron is in a shell further from the nucleus and is shielded by more inner shells than sodium's, so it is held less tightly and lost more easily, making the reaction faster.</li>
  <li>Chlorine is bubbled through potassium bromide solution. State the observation and write the equation. <em>Answer:</em> The colourless solution turns orange-brown as bromine is formed: Cl₂ + 2KBr → 2KCl + Br₂.</li>
  <li>Explain why bromine does not displace chlorine from potassium chloride solution. <em>Answer:</em> Chlorine is more reactive than bromine, because its outer shell is closer to the nucleus and less shielded, so chlorine is the one that gains the electron and bromine cannot displace it.</li>
  <li>Give two properties that a transition metal has and a Group 1 metal does not. <em>Answer:</em> It forms coloured compounds, and it can form ions with more than one charge (for example Fe²⁺ and Fe³⁺). It is also harder and denser with a higher melting point.</li>
  <li>Argon is used to fill filament lamps. Explain the property that makes it suitable. <em>Answer:</em> Argon has a full outer shell, so it is unreactive and will not react with the hot filament, which would otherwise burn away.</li>
  <li>A 15.0 cm³ sample of a metal has a mass of 134 g. Calculate its density and suggest whether it is a transition metal. <em>Answer:</em> ρ = m / V = 134 ÷ 15.0 = 8.93 g/cm³, which is far above the density of a Group 1 metal and consistent with a transition metal such as copper.</li>
  <li>State one use of a transition metal as a catalyst and name the process. <em>Answer:</em> Iron catalyses the Haber process, in which nitrogen and hydrogen react to form ammonia.</li>
</ol>

<h3>12. Revision checklist</h3>
<ul>
  <li>I can give the group number, outer-shell electron count and ion charge for Groups 1, 7 and 0.</li>
  <li>I can state the trend in reactivity down Groups 1 and 7 and explain both with distance and shielding.</li>
  <li>I can write the equations for a Group 1 metal with water, oxygen and chlorine.</li>
  <li>I can describe the appearance and state of each halogen at room temperature.</li>
  <li>I can predict the result of any halogen displacement and write its equation.</li>
  <li>I can explain why noble gas boiling points rise down the group.</li>
  <li>I can contrast transition metals with Group 1 metals in at least four properties.</li>
  <li>I can name three transition metal catalysts and the process each is used in.</li>
  <li>I can calculate a density and use it to argue which family a metal belongs to.</li>
</ul>
`,
};
