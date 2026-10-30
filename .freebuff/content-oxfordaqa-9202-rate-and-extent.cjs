// OxfordAQA International GCSE Chemistry 9202 — topic 3.8 The Rate and Extent of
// Chemical Change.
// Statements covered: 3.8.1 Rate of reaction, 3.8.2 Factors affecting
// equilibrium, 3.8.3 Production of ammonia and sulfuric acid, 3.8.4 Redox
// reactions.
//
// Two ideas share this topic and students mix them up constantly: how fast a
// reaction goes, and how far it goes. The note keeps them in separate halves and
// says so at the join, because a catalyst answer written into an equilibrium
// question is one of the most common losses on the paper.
module.exports = {
  topicSlug: "the-rate-and-extent-of-chemical-change",
  title: "IGCSE Chemistry (OxfordAQA): Rate and Extent of Chemical Change",
  html: `<h2>The Rate and Extent of Chemical Change</h2>
<p>This topic holds two questions that look alike and are not. The first is <em>how fast</em> a reaction goes — the rate — which is measured by how quickly a reactant is used up or a product appears. The second is <em>how far</em> it goes — the extent — which for a reversible reaction is decided by where the equilibrium sits. A catalyst changes the first and not the second, a temperature change usually changes both, and an exam that asks about one is testing whether you can tell them apart. The second half of the topic applies the equilibrium idea to the two industrial processes the specification names, then closes with redox, which is the electron bookkeeping underneath displacement, extraction and corrosion.</p>

<h3>1. What a rate is, and how it is measured</h3>
<p>The rate of a reaction is the change in the amount of a reactant or product per unit time. Anything that can be measured as the reaction proceeds can be turned into a rate, so the practical you are given decides the measurement rather than the other way round.</p>
<ul>
  <li><strong>Volume of gas</strong> collected in a gas syringe or over water, read against a stopwatch. Good for metal plus acid, or carbonate plus acid.</li>
  <li><strong>Loss in mass</strong> on a balance, when a gas escapes. Good for marble chips plus acid, where carbon dioxide leaves.</li>
  <li><strong>Time to a visible change</strong>, such as the cross disappearing behind precipitated sulfur, measured by looking down through the flask.</li>
  <li><strong>Colour change</strong> measured with a colorimeter, which turns "it went paler" into a number.</li>
</ul>
<p>The rate is fastest at the start and slows as the reaction proceeds, because the reactants are being used up and their concentration falls. That is why a rate graph curves rather than running straight, and why the tangent at the start gives the initial rate.</p>

<h3>2. Collision theory: why any factor works</h3>
<p>Particles react only when they collide, and only when they collide with at least the activation energy — the minimum energy needed to break the bonds that must break. Every factor in this topic changes one of those two things: how often collisions happen, or what fraction of them carry enough energy.</p>
<ul>
  <li><strong>More frequent collisions</strong> come from crowding the particles together: higher concentration, higher pressure, or a larger surface area.</li>
  <li><strong>More energetic collisions</strong> come from higher temperature, which gives the particles more kinetic energy, so a larger fraction of collisions exceeds the activation energy.</li>
  <li><strong>A catalyst</strong> does neither: it provides an alternative pathway with a lower activation energy, so a larger fraction of the existing collisions is now sufficient.</li>
</ul>
<p>Notice that a temperature rise does both — particles move faster, so they collide more often, and each collision is more energetic. The second effect is much larger, which is why "more collisions" alone is an incomplete answer when the factor is temperature.</p>

<h3>3. Concentration and pressure</h3>
<p>Increasing the concentration of a solution means more particles of the reactant in the same volume, so collisions between reactant particles are more frequent and the rate rises. Increasing the pressure of a gas does the same thing by squeezing the same number of particles into a smaller volume. Neither changes the activation energy, and neither changes how much product you eventually get — only how quickly you get it.</p>
<p>A common exam version gives you a graph and asks you to compare two curves. Say which is steeper and why, and then say that both level off at the same height, because the same amount of reactant was used in each case.</p>

<h3>4. Surface area</h3>
<p>A reaction between a solid and a solution can only happen at the surface of the solid, so breaking the solid into smaller pieces exposes more surface for the same mass and the rate rises. Powdered calcium carbonate reacts faster than marble chips of the same mass, and the total volume of gas collected is unchanged.</p>
<ul>
  <li><strong>Same mass, more surface:</strong> the rate increases because more particles are available to collide.</li>
  <li><strong>Same mass, same product:</strong> the final volume of gas or mass of product is identical, so the two curves meet at the same level.</li>
  <li><strong>Powder is not always better:</strong> in a school practical a fine powder can froth over or block a filter, which is why the method specifies chips even though the powder is faster.</li>
</ul>

<h3>5. Catalysts</h3>
<p>A catalyst increases the rate of a reaction without being used up, by lowering the activation energy. It is not a reactant, it does not appear in the balanced equation, and it is recovered chemically unchanged at the end — which is why a catalyst can be reused indefinitely and why only a small amount is needed.</p>
<p>The effect on a rate graph is specific and examinable: the catalysed curve is steeper and levels off sooner, but it reaches exactly the same final amount, because a catalyst changes the rate and not the yield. Enzymes are biological catalysts, and they are specific — one enzyme catalyses one reaction — which is the usual link question into Biology.</p>

<h3>6. Worked example: calculating a rate</h3>
<p>Magnesium ribbon is added to excess dilute hydrochloric acid and the hydrogen is collected in a gas syringe. After 24 s, 72 cm³ of gas has been collected. Calculate the mean rate of reaction over that time.</p>
<p>rate = volume ÷ time = 72 cm³ ÷ 24 s = 3.0 cm³/s</p>
<p><em>Key:</em> rate = the mean rate of reaction (cm³/s); volume = the volume of gas collected (cm³); time = the time taken (s).</p>
<p>The word "mean" matters: this is the average over the whole 24 s, and the instantaneous rate at the start was higher. If the same experiment were repeated with powder instead of ribbon, the mean rate over the first 24 s would be larger, but the total volume collected when the reaction finished would be the same.</p>
<p>A second form appears when the measurement is a mass loss: if a flask loses 1.20 g in 30 s, the mean rate is 1.20 g ÷ 30 s = 0.040 g/s. The units always carry the answer — a rate with no unit, or with the wrong one, loses a mark.</p>

<h3>7. Reversible reactions and dynamic equilibrium</h3>
<p>Some reactions can go both ways. When the forward and reverse reactions happen in the same container, the mixture eventually reaches a state where both are still occurring but at the same rate, so the amounts of reactants and products stop changing. That state is a dynamic equilibrium, and "dynamic" is the word that earns the mark: the reactions have not stopped.</p>
<p>Two conditions are needed for an equilibrium to be reached: the reaction must be reversible, and it must take place in a closed system so nothing escapes. If a gas is allowed to leave, the reverse reaction cannot keep up and there is no equilibrium.</p>
<p>At equilibrium the concentrations are constant, not equal. It is entirely normal for a mixture to be mostly reactants, or mostly products, and the position of equilibrium describes which.</p>

<h3>8. Factors affecting equilibrium</h3>
<p>Le Chatelier's principle says that if a change is made to a system at equilibrium, the position of equilibrium shifts to oppose that change. It tells you the direction of the shift, and the exam usually then asks what happens to the yield. The factors that matter are concentration, pressure and temperature.</p>
<ul>
  <li><strong>Concentration.</strong> Adding more of a reactant shifts the equilibrium to the right, using it up. Removing a product as it forms also shifts it to the right.</li>
  <li><strong>Pressure.</strong> Increasing pressure shifts the equilibrium towards the side with fewer gas molecules, because that reduces the pressure. If both sides have the same number of gas molecules, pressure has no effect.</li>
  <li><strong>Temperature.</strong> Raising the temperature shifts the equilibrium in the endothermic direction, absorbing the extra heat. Lowering it shifts it in the exothermic direction.</li>
  <li><strong>Catalyst.</strong> A catalyst has no effect on the position of equilibrium at all. It reaches the same equilibrium sooner, which is a rate effect and not an extent effect.</li>
</ul>
<p>Count the gas molecules before you answer a pressure question, and check the sign of ΔH before you answer a temperature question. Both are one line of working that decides the answer.</p>

<h3>9. The Haber process: making ammonia</h3>
<p>Ammonia is made from nitrogen from the air and hydrogen from natural gas, over an iron catalyst. The reaction is reversible and exothermic in the forward direction.</p>
<p>N₂ + 3H₂ ⇌ 2NH₃ &nbsp; ΔH = −92 kJ/mol</p>
<p><em>Key:</em> ΔH = the enthalpy change for the forward reaction (kJ/mol); ⇌ = the reaction is reversible.</p>
<p>Four gas molecules on the left become two on the right, so a high pressure shifts the equilibrium to the right and increases the yield. The forward reaction is exothermic, so a low temperature would also increase the yield — but a low temperature makes the reaction far too slow to be useful. The compromise is about 450 °C and 200 atmospheres with an iron catalyst: the temperature is a rate compromise, the pressure is a yield choice, and the catalyst recovers the rate that the temperature costs.</p>
<p>The ammonia is removed by cooling it to a liquid and taking it out of the mixture, which pulls the equilibrium further to the right because the product is being removed. That is the industrial version of the concentration rule above.</p>

<h3>10. The Contact process: making sulfuric acid</h3>
<p>Sulfur is burned to sulfur dioxide, the dioxide is oxidised to sulfur trioxide over a vanadium(V) oxide catalyst, and the trioxide is dissolved in concentrated sulfuric acid to make more acid.</p>
<p>2SO₂ + O₂ ⇌ 2SO₃ &nbsp; ΔH = −197 kJ/mol</p>
<p><em>Key:</em> ΔH = the enthalpy change for the forward reaction (kJ/mol); ⇌ = the reaction is reversible; V₂O₅ is the catalyst.</p>
<p>This is the same compromise as the Haber process. Three gas molecules become two, so high pressure raises the yield; the forward reaction is exothermic, so high temperature lowers the yield but raises the rate. The process runs at about 450 °C and 1 to 2 atmospheres, with the pressure kept modest because the yield is already high at ordinary pressure and compressing gas is expensive.</p>
<p>The sulfur trioxide is not added to water directly, because the reaction is violent and produces a fine mist of acid that is hard to condense. It is dissolved in concentrated sulfuric acid instead, which is a practical detail the exam does ask about.</p>

<h3>11. Redox: oxidation, reduction and oxidation states</h3>
<p>Oxidation is the loss of electrons, and reduction is the gain of electrons — remember them as OIL RIG. They always happen together, which is why the whole class of reactions is called redox: whatever loses electrons is oxidised, and whatever gains them is reduced.</p>
<ul>
  <li><strong>Oxidising agent</strong> takes electrons from something else, so it is itself reduced. Potassium manganate(VII) and chlorine are common examples.</li>
  <li><strong>Reducing agent</strong> gives electrons to something else, so it is itself oxidised. Carbon and hydrogen are common examples.</li>
</ul>
<p>For simple ions, oxidation state is just the charge: Na⁺ is +1, Cl⁻ is −1, Fe³⁺ is +3. For an element, it is 0. In a compound, hydrogen is usually +1, oxygen is usually −2, and the states of everything else must add up to the overall charge. That bookkeeping identifies what has been oxidised even when no electrons appear in the equation.</p>

<h3>12. Worked example: oxidation states and half equations</h3>
<p>Find the oxidation state of sulfur in sulfuric acid, H₂SO₄, and of manganese in potassium manganate(VII), KMnO₄.</p>
<p>For H₂SO₄: 2(+1) + x + 4(−2) = 0, so x = 6 and sulfur is +6. For KMnO₄: (+1) + x + 4(−2) = 0, so x = 7 and manganese is +7.</p>
<p><em>Key:</em> x = the unknown oxidation state; the numbers in brackets are the known states of hydrogen (+1), oxygen (−2) and potassium (+1); the total equals the overall charge of the species, which is 0 for a neutral compound.</p>
<p>Now the electron half-equations for iron displacing copper from copper(II) sulfate. The iron atom loses two electrons and the copper ion gains them:</p>
<p>Fe → Fe²⁺ + 2e⁻ (oxidation) &nbsp; and &nbsp; Cu²⁺ + 2e⁻ → Cu (reduction), giving Fe + Cu²⁺ → Fe²⁺ + Cu.</p>
<p><em>Key:</em> e⁻ = an electron; the two half-equations must transfer the same number of electrons, which is why no coefficients are needed here.</p>
<p>The blue colour of the solution fades and a pink-brown solid appears, because copper(II) ions are blue and iron(II) ions are pale green. That observation plus the two half-equations is a full-mark answer.</p>

<h3>13. Typical mistakes</h3>
<ul>
  <li>Saying a catalyst increases the yield. It increases the rate and leaves the equilibrium position alone.</li>
  <li>Explaining a temperature rise only as "more collisions". The dominant effect is that a larger fraction of collisions now exceeds the activation energy.</li>
  <li>Answering a pressure question without counting gas molecules, or a temperature question without knowing which direction is exothermic.</li>
  <li>Saying the reaction has stopped at equilibrium. Both directions are still running at equal rates.</li>
  <li>Calling oxidation "gain of oxygen" as if that were the definition. It works for some reactions, but the electron definition is the one the specification uses and the one that covers all of them.</li>
  <li>Mixing up the agent with what happens to it: the oxidising agent is reduced, and the reducing agent is oxidised.</li>
  <li>Giving a rate with no unit, or with the unit of the quantity rather than of the rate.</li>
</ul>

<h3>14. Exam-style questions</h3>
<ol>
  <li>Explain why increasing the temperature increases the rate of a reaction. <em>Answer:</em> The particles have more kinetic energy, so they move faster and collide more often, and a much larger fraction of those collisions has at least the activation energy, so more collisions are successful.</li>
  <li>Marble chips and powdered calcium carbonate of the same mass are added to separate samples of excess acid. State two differences between the rate curves. <em>Answer:</em> The powdered sample's curve is steeper and levels off sooner, but both curves reach the same final volume of gas.</li>
  <li>Explain the effect of increasing the pressure on the equilibrium N₂ + 3H₂ ⇌ 2NH₃. <em>Answer:</em> There are four gas molecules on the left and two on the right, so increasing the pressure shifts the equilibrium to the right, towards the fewer molecules, and the yield of ammonia increases.</li>
  <li>Explain why the Haber process is not run at the temperature that would give the highest yield. <em>Answer:</em> The forward reaction is exothermic, so a low temperature would shift the equilibrium to the right and increase the yield, but the rate would be far too slow, so a compromise of about 450 °C is used with an iron catalyst.</li>
  <li>State the catalyst used in the Contact process and write the equation for the reaction it catalyses. <em>Answer:</em> Vanadium(V) oxide, V₂O₅: 2SO₂ + O₂ ⇌ 2SO₃.</li>
  <li>Zinc is added to copper(II) sulfate solution. Write the two half-equations and say which species is oxidised. <em>Answer:</em> Zn → Zn²⁺ + 2e⁻ and Cu²⁺ + 2e⁻ → Cu. Zinc is oxidised because it loses electrons.</li>
  <li>Calculate the oxidation state of chromium in potassium dichromate, K₂Cr₂O₇. <em>Answer:</em> 2(+1) + 2x + 7(−2) = 0, so 2x = 12 and x = +6.</li>
  <li>0.80 g of magnesium reacts with excess acid and 640 cm³ of hydrogen is collected in 40 s. Calculate the mean rate. <em>Answer:</em> rate = 640 ÷ 40 = 16 cm³/s.</li>
</ol>

<h3>15. Revision checklist</h3>
<ul>
  <li>I can describe three ways to measure a rate and say which suits which reaction.</li>
  <li>I can explain every factor using collision theory, distinguishing frequency from energy.</li>
  <li>I can calculate a mean rate and give its unit.</li>
  <li>I can define dynamic equilibrium and say why a closed system is needed.</li>
  <li>I can predict the effect of concentration, pressure, temperature and a catalyst on an equilibrium.</li>
  <li>I can describe the Haber and Contact processes with their equations, conditions and catalysts.</li>
  <li>I can explain each industrial compromise in terms of rate against yield.</li>
  <li>I can assign oxidation states and write half-equations for a redox reaction.</li>
  <li>I can name the oxidising and reducing agent in a reaction and say what happens to each.</li>
</ul>
`,
};
