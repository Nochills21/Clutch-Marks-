// OxfordAQA International GCSE Chemistry 9202 — topic 3.9 Energy Changes.
// Statements covered: 3.9.1 Exothermic and endothermic reactions, 3.9.2
// Calculating and explaining energy change, 3.9.3 Chemical cells and fuel cells.
//
// The calculations are where this topic is lost, so both routes are worked in
// full: bond energies for a reaction, and Q = mcΔT for a practical. The sign
// convention is stated once, plainly, because a correct number with the wrong
// sign reads as a wrong answer to an examiner.
module.exports = {
  topicSlug: "energy-changes",
  title: "IGCSE Chemistry (OxfordAQA): Energy Changes",
  html: `<h2>Energy Changes</h2>
<p>Every chemical reaction either releases energy to the surroundings or takes energy from them, and the difference between the two is a matter of direction, not of size. This topic is about that direction: how to recognise an exothermic reaction from a thermometer, how to draw its energy level diagram, how to calculate the energy change from bond energies or from a temperature rise in the laboratory, and how the same release of energy can be turned into a voltage in a chemical cell or a fuel cell. The two calculations are the part students lose marks on, because the arithmetic is easy and the sign convention is not obvious. Both are worked step by step here.</p>

<h3>1. Exothermic and endothermic reactions</h3>
<p>An exothermic reaction releases energy to the surroundings, so the surroundings get warmer and the temperature rises. An endothermic reaction takes energy in from the surroundings, so the surroundings get cooler and the temperature falls. The thermometer is the evidence, and the examination expects you to name the observation before you name the term.</p>
<ul>
  <li><strong>Exothermic:</strong> combustion of fuels, neutralisation of an acid by an alkali, the reaction of magnesium with acid, respiration, and the setting of concrete.</li>
  <li><strong>Endothermic:</strong> thermal decomposition of calcium carbonate, the reaction of citric acid with sodium hydrogencarbonate, photosynthesis, and the melting or boiling of a substance.</li>
  <li><strong>The sign:</strong> an exothermic change has a negative ΔH, because the products have less energy than the reactants; an endothermic change has a positive ΔH.</li>
</ul>
<p>Read the sign carefully. A negative number here does not mean "less energy released" — it means energy has left the system, which is exactly what an exothermic reaction does. The larger the number, the more energy is involved, whatever the sign.</p>

<h3>2. Energy level diagrams and activation energy</h3>
<p>A reaction profile plots energy against the progress of the reaction. The reactants sit on the left and the products on the right, and the height difference between them is ΔH.</p>
<ul>
  <li>In an <strong>exothermic</strong> profile the products are lower than the reactants, and the arrow to the surroundings points outwards.</li>
  <li>In an <strong>endothermic</strong> profile the products are higher than the reactants, and the arrow from the surroundings points inwards.</li>
  <li>In both, the curve rises to a peak between them. The height from the reactants to that peak is the activation energy, the minimum energy the colliding particles need before the reaction can happen.</li>
</ul>
<p>A catalyst lowers the peak — the activation energy — but leaves the heights of the reactants and products exactly where they were. That single sentence answers a large share of the questions on this topic, and it is the same point as the rate topic: a catalyst changes how quickly the reaction goes, not how much energy it releases.</p>

<h3>3. Bond breaking and bond forming</h3>
<p>Chemical reactions involve breaking the bonds in the reactants and forming new bonds in the products. Breaking a bond requires energy, so it is endothermic; forming a bond releases energy, so it is exothermic. The overall energy change is the balance of the two.</p>
<p>ΔH = energy needed to break the bonds − energy released forming the bonds</p>
<p><em>Key:</em> ΔH = the enthalpy change of the reaction (kJ/mol); energy needed = the total bond energy of the bonds broken (kJ/mol); energy released = the total bond energy of the bonds formed (kJ/mol).</p>
<p>If the bonds formed release more than the bonds broken required, the surplus is released to the surroundings and the reaction is exothermic, so ΔH is negative. If the bonds broken cost more than the bonds formed give back, the reaction is endothermic and ΔH is positive. The rule works for every reaction, which is why it is worth writing out rather than trying to remember which way round it goes.</p>

<h3>4. Worked example: bond energies</h3>
<p>Hydrogen reacts with chlorine to form hydrogen chloride: H₂ + Cl₂ → 2HCl. Use the bond energies H–H 436 kJ/mol, Cl–Cl 243 kJ/mol and H–Cl 432 kJ/mol to calculate ΔH.</p>
<p>Bonds broken: H–H (436) + Cl–Cl (243) = 679 kJ/mol. Bonds formed: 2 × H–Cl = 2 × 432 = 864 kJ/mol. ΔH = 679 − 864 = −185 kJ/mol.</p>
<p><em>Key:</em> ΔH = the enthalpy change (kJ/mol); the bond energies are the energy needed to break one mole of each bond (kJ/mol); the 2 in front of H–Cl is there because two molecules of hydrogen chloride are formed.</p>
<p>The answer is negative, so the reaction is exothermic: forming the two H–Cl bonds released 864 kJ, more than the 679 kJ needed to break the H–H and Cl–Cl bonds. The most common error here is forgetting the coefficient of 2 on the product side, which would give 679 − 432 = +247 and turn a clearly exothermic reaction into an endothermic one.</p>

<h3>5. Worked example: measuring an energy change in the laboratory</h3>
<p>25.0 cm³ of 1.00 mol/dm³ hydrochloric acid is mixed with 25.0 cm³ of 1.00 mol/dm³ sodium hydroxide solution. The temperature rises by 6.5 °C. Calculate the energy released and the enthalpy change per mole of water formed.</p>
<p>Q = m × c × ΔT = 50.0 g × 4.18 J/(g·°C) × 6.5 °C = 1 358.5 J, which is 1.36 kJ.</p>
<p><em>Key:</em> Q = the energy released (J); m = the mass of the solution heated (g); c = the specific heat capacity of water, 4.18 J/(g·°C); ΔT = the temperature rise (°C).</p>
<p>The amount of water formed is 0.0250 mol, because 25.0 cm³ of a 1.00 mol/dm³ solution contains 0.0250 mol and the acid and alkali react in a 1:1 ratio. So the energy per mole is 1.36 kJ ÷ 0.0250 mol = 54.4 kJ/mol, and the enthalpy change is −54 kJ/mol because the temperature rose.</p>
<p>The textbook value is about −57 kJ/mol, so the measurement is slightly low. That gap is not an error in the method: heat is lost to the cup, the thermometer and the air during the experiment, which is why the apparatus is insulated and why the answer is described as an approximate value. An exam that asks why the measured value is lower wants exactly that sentence.</p>

<h3>6. Chemical cells: turning a reaction into a voltage</h3>
<p>A chemical cell, or simple cell, uses two different metals dipped into an electrolyte. Because the metals have different reactivities, one loses electrons more readily than the other, and the electrons flow through an external wire from one electrode to the other, producing a current.</p>
<ul>
  <li>The <strong>more reactive metal</strong> loses electrons, so it is oxidised and becomes the negative electrode.</li>
  <li>The <strong>less reactive metal</strong> gains those electrons at its surface, so it is reduced and becomes the positive electrode.</li>
  <li>The <strong>voltage</strong> is larger when the difference in reactivity between the two metals is larger, so a cell of magnesium and copper gives a bigger reading than one of zinc and copper.</li>
  <li>A cell stops working when the reaction that drives it has gone as far as it can, which is why a simple cell goes flat. A rechargeable cell can be driven backwards by an external supply.</li>
</ul>
<p>Notice that this is the redox chemistry of the previous topic with a wire in the middle: oxidation at one electrode, reduction at the other, electrons travelling between them instead of being transferred on contact.</p>

<h3>7. Fuel cells</h3>
<p>A fuel cell produces electricity from a fuel that is supplied continuously, rather than from chemicals stored inside it. The hydrogen–oxygen fuel cell is the one the specification names: hydrogen is oxidised at one electrode and oxygen is reduced at the other, and the only product is water.</p>
<p>2H₂ + O₂ → 2H₂O</p>
<p><em>Key:</em> H₂ = hydrogen, the fuel supplied to the negative electrode; O₂ = oxygen from the air, supplied to the positive electrode; H₂O = water, the only product.</p>
<ul>
  <li><strong>Advantages:</strong> the only product is water, so there is no carbon dioxide and no other pollutant at the point of use; the cell keeps working as long as fuel is supplied; and it is more efficient than burning the fuel in an engine.</li>
  <li><strong>Disadvantages:</strong> hydrogen is difficult to store and transport, because it is a gas that leaks easily and needs high pressure or very low temperature; the electrodes use expensive catalysts such as platinum; and most hydrogen is currently made from fossil fuels, so the environmental benefit depends on how it was produced.</li>
</ul>

<h3>8. Comparing cells and fuel cells</h3>
<table border="1">
  <tr><th>Feature</th><th>Chemical cell</th><th>Fuel cell</th></tr>
  <tr><td>Source of energy</td><td>Chemicals stored inside the cell</td><td>Fuel supplied continuously from outside</td></tr>
  <tr><td>Lifetime</td><td>Goes flat when the reactants are used up</td><td>Works while fuel is supplied</td></tr>
  <tr><td>Rechargeable</td><td>Some are; a simple cell is not</td><td>Refuelled rather than recharged</td></tr>
  <tr><td>Products</td><td>Depends on the cell chemistry</td><td>Water only, for a hydrogen–oxygen cell</td></tr>
  <tr><td>Main cost</td><td>Low for a simple cell</td><td>High, because of the catalyst and the fuel storage</td></tr>
</table>

<h3>9. Typical mistakes</h3>
<ul>
  <li>Using the mass of the solid instead of the mass of the solution in Q = m × c × ΔT. The water is what warms up, so the mass is the volume of solution in grams.</li>
  <li>Forgetting to convert joules to kilojoules before dividing by the number of moles, which makes the answer a thousand times too large.</li>
  <li>Giving a positive ΔH for an exothermic reaction because "energy was released". The sign is negative because energy has left the system.</li>
  <li>Forgetting the coefficient when counting bonds formed, which flips the sign of the answer.</li>
  <li>Claiming a catalyst increases the energy released. It lowers the activation energy and changes nothing about ΔH.</li>
  <li>Calling the more reactive metal in a cell the positive electrode. It is the negative one, because it is the one losing electrons.</li>
  <li>Saying a fuel cell "does not pollute" without qualification. Its own product is only water, but producing and transporting the hydrogen may not be clean.</li>
</ul>

<h3>10. Exam-style questions</h3>
<ol>
  <li>A test tube containing dilute hydrochloric acid and magnesium becomes warm. State whether the reaction is exothermic or endothermic and give the sign of ΔH. <em>Answer:</em> Exothermic, because the temperature of the surroundings rises, so ΔH is negative.</li>
  <li>Sketch the energy level diagram for an endothermic reaction and label the activation energy. <em>Answer:</em> The products are drawn higher than the reactants, and the activation energy is labelled as the height from the reactants to the peak of the curve.</li>
  <li>Use the bond energies N≡N 945 kJ/mol and H–H 436 kJ/mol, and N–H 391 kJ/mol, to calculate ΔH for N₂ + 3H₂ → 2NH₃. <em>Answer:</em> Bonds broken are 945 + 3 × 436 = 2 253 kJ/mol; bonds formed are 6 × 391 = 2 346 kJ/mol; ΔH = 2 253 − 2 346 = −93 kJ/mol, so the reaction is exothermic.</li>
  <li>Explain why a catalyst does not change the value of ΔH. <em>Answer:</em> A catalyst provides an alternative pathway with a lower activation energy, but the reactants and products are unchanged, so the energy difference between them is unchanged.</li>
  <li>50.0 g of water in a calorimeter rises in temperature by 4.0 °C. Calculate the energy released. <em>Answer:</em> Q = m × c × ΔT = 50.0 × 4.18 × 4.0 = 836 J, which is 0.836 kJ.</li>
  <li>Explain why the enthalpy change measured in a school laboratory is usually smaller than the accepted value. <em>Answer:</em> Heat is lost to the surroundings, the apparatus and the air, so not all of the energy released is used to raise the temperature of the solution.</li>
  <li>Give one advantage and one disadvantage of using a hydrogen–oxygen fuel cell in a car. <em>Answer:</em> Advantage: the only product is water, so no carbon dioxide is produced at the vehicle. Disadvantage: hydrogen is difficult and expensive to store and transport.</li>
</ol>

<h3>11. Revision checklist</h3>
<ul>
  <li>I can define exothermic and endothermic in terms of energy transfer and the sign of ΔH.</li>
  <li>I can draw and label both reaction profiles, including activation energy.</li>
  <li>I can state which of bond breaking and bond forming is endothermic.</li>
  <li>I can calculate ΔH from bond energies, including coefficients.</li>
  <li>I can apply Q = m × c × ΔT and convert the result into kJ per mole.</li>
  <li>I can explain why a measured value is lower than the accepted one.</li>
  <li>I can describe how a chemical cell works and which electrode is negative.</li>
  <li>I can describe a hydrogen–oxygen fuel cell and give one advantage and one disadvantage.</li>
</ul>
`,
};
