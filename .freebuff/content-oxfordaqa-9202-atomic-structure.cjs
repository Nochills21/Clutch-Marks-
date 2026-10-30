// OxfordAQA International GCSE Chemistry (9202) — Topic 3.1
// "Atomic structure and the periodic table", covering specification statements
// 3.1.1 Solids, liquids and gases, 3.1.2 A simple model of the atom and
// 3.1.3 The Periodic Table.
//
// House rules applied here: every symbol is a real glyph with an <em>Key:</em>
// line inside the same paragraph, and every solved answer shows the relation,
// the substitution and the result rather than jumping to a number.
module.exports = {
  topicSlug: "atomic-structure-and-the-periodic-table",
  title: "IGCSE Chemistry (OxfordAQA): Atomic Structure and the Periodic Table",
  html: `<h2>Atomic Structure and the Periodic Table</h2>
<p>Everything in chemistry comes back to this topic. The particle model explains why ice melts and why perfume crosses a room; the model of the atom explains why sodium loses an electron and chlorine gains one; and the periodic table turns those two ideas into predictions you can make for an element you have never seen. In the OxfordAQA 9202 papers this material is not a single question — it is the language the rest of the paper is written in, so a shaky answer here shows up in bonding, electrolysis, quantitative chemistry and organic chemistry too. This note covers specification statements 3.1.1, 3.1.2 and 3.1.3, works through the calculations the examiner actually sets, and ends with exam-style questions with full working.</p>

<h3>1. The three states of matter</h3>
<p>Matter is classified into three states by how its particles are arranged and how freely they move. The particles themselves do not change when a substance changes state — only their arrangement and their energy do. That is why melting ice is a physical change and not a chemical one: H₂O is still H₂O.</p>
<table border="1">
  <thead><tr><th>Property</th><th>Solid</th><th>Liquid</th><th>Gas</th></tr></thead>
  <tbody>
    <tr><td>Arrangement</td><td>Regular lattice, particles touching</td><td>Irregular, particles still touching</td><td>Far apart, random</td></tr>
    <tr><td>Movement</td><td>Vibrate about fixed positions</td><td>Slide past one another</td><td>Move quickly in straight lines</td></tr>
    <tr><td>Shape</td><td>Fixed</td><td>Takes the shape of the container</td><td>Fills the container</td></tr>
    <tr><td>Volume</td><td>Fixed</td><td>Fixed (almost)</td><td>Fills the container</td></tr>
    <tr><td>Compressibility</td><td>Almost none</td><td>Almost none</td><td>Easily compressed</td></tr>
  </tbody>
</table>
<p>The state a substance is in at room temperature depends on the balance between the forces holding its particles together and the kinetic energy they have. Strong forces and low energy give a solid; weak forces and high energy give a gas. Heating raises the average kinetic energy of the particles, so it is always the route from solid to liquid to gas.</p>

<h3>2. Changing state, and the energy it costs</h3>
<p>Each change of state has its own name, and the examiner expects the exact word rather than "it turns into":</p>
<ul>
  <li>melting — solid to liquid; freezing — liquid to solid</li>
  <li>boiling or evaporating — liquid to gas; condensing — gas to liquid</li>
  <li>subliming — solid straight to gas (dry ice and iodine both do this); depositing — gas straight to solid</li>
</ul>
<p>During a change of state the temperature does not rise even though energy is being supplied. The energy is being used to overcome the forces between particles rather than to speed them up. On a heating curve this appears as a flat section: the first flat section is melting, the second is boiling, and the boiling one is longer because vaporisation needs more energy than melting.</p>
<p>The energy needed to change the state of a mass without changing its temperature is given by the specific latent heat: E = m L → <em>Key:</em> E = energy (J); m = mass (kg); L = specific latent heat (J/kg). For boiling the value used is the specific latent heat of vaporisation, and for melting the specific latent heat of fusion.</p>

<h3>3. Diffusion and the evidence for particles</h3>
<p>Diffusion is the spreading of particles from a region of higher concentration to a region of lower concentration because of their random motion. It is the simplest evidence that particles exist and that they move:</p>
<ul>
  <li>bromine vapour in air — the brown colour spreads through the gas jar without stirring</li>
  <li>ammonia and hydrogen chloride at opposite ends of a tube — a white ring of ammonium chloride forms nearer the hydrogen chloride end, because ammonia particles are lighter and travel faster</li>
  <li>potassium manganate(VII) in water — the purple colour spreads slowly through the liquid</li>
</ul>
<p>Diffusion is faster at a higher temperature, because the particles have more kinetic energy, and faster for a lighter particle at the same temperature. In a liquid it is much slower than in a gas, because the particles are close together and collide constantly. The kinetic energy of a particle is Eₖ = ½ m v² → <em>Key:</em> Eₖ = kinetic energy (J); m = mass (kg); v = speed (m/s). Two particles at the same temperature have the same average kinetic energy, so the lighter one must have the greater speed — which is exactly why the ammonia particles reach the middle of the tube first.</p>

<h3>4. A simple model of the atom</h3>
<p>An atom is the smallest part of an element that can exist. An element contains only one kind of atom; a compound contains atoms of two or more elements chemically combined in fixed proportions; a mixture contains substances that are not chemically combined. The atom itself is built from three subatomic particles.</p>
<table border="1">
  <thead><tr><th>Particle</th><th>Relative mass</th><th>Relative charge</th><th>Where it is</th></tr></thead>
  <tbody>
    <tr><td>Proton</td><td>1</td><td>+1</td><td>Nucleus</td></tr>
    <tr><td>Neutron</td><td>1</td><td>0</td><td>Nucleus</td></tr>
    <tr><td>Electron</td><td>1/1836 (negligible)</td><td>−1</td><td>Shells around the nucleus</td></tr>
  </tbody>
</table>
<p>Two numbers describe any atom. The <strong>atomic number</strong> (Z) is the number of protons, and it is what makes the element what it is — every carbon atom has six protons and no other element does. The <strong>mass number</strong> (A) is the number of protons plus the number of neutrons, because the electron's mass is negligible. In an ion the protons never change; only the electrons do.</p>
<p>neutrons = A − Z → <em>Key:</em> neutrons = number of neutrons in the nucleus; A = mass number (protons + neutrons); Z = atomic number (protons). For a neutral atom electrons = Z; for an ion of charge q, electrons = Z − q, where q is the charge as a number with its sign.</p>
<p>Electrons occupy shells, filled from the inside out. The first shell holds 2, the second 8, the third 8, and the fourth fills after the third has eight (potassium and calcium are the two you meet at this level). The configuration of an element is written as a list of shell occupancies, for example sodium is 2,8,1 and calcium is 2,8,8,2. The number of electrons in the outer shell is the same as the group number for the main-group elements, and the number of shells is the same as the period number.</p>

<h3>5. Isotopes and relative atomic mass</h3>
<p>Isotopes are atoms of the same element with the same number of protons but different numbers of neutrons. Carbon-12 and carbon-14 both have six protons, but carbon-14 has eight neutrons instead of six. Isotopes have identical chemical properties, because chemistry is decided by the electrons, and slightly different physical properties, because mass affects how fast particles move and diffuse.</p>
<p>Because a sample of an element usually contains a mixture of isotopes, the mass quoted in the periodic table is a weighted mean called the relative atomic mass: Aᵣ = (mass₁ × abundance₁ + mass₂ × abundance₂ + …) ÷ 100 → <em>Key:</em> Aᵣ = relative atomic mass (no units); mass = mass number of each isotope; abundance = percentage of that isotope in the sample. That is why chlorine's relative atomic mass is 35.5 and not a whole number.</p>

<h3>6. Ions, and why atoms form them</h3>
<p>Atoms react to reach the stable electron arrangement of a noble gas. Metals lose electrons and become positively charged ions; non-metals gain electrons and become negatively charged ions. Sodium (2,8,1) loses its outer electron to become Na⁺ with the arrangement 2,8; chlorine (2,8,7) gains one to become Cl⁻ with 2,8,8; magnesium (2,8,2) loses two to become Mg²⁺; oxygen (2,6) gains two to become O²⁻.</p>
<p>The charge on an ion tells you the ratio in which ions combine, because the total charge in a compound must be zero: Na⁺ with Cl⁻ gives NaCl; Mg²⁺ with O²⁻ gives MgO; Al³⁺ with O²⁻ needs two aluminium ions and three oxide ions, giving Al₂O₃.</p>

<h3>7. The Periodic Table</h3>
<p>Mendeleev arranged the elements in order of atomic weight but left gaps for elements that had not been discovered, and predicted their properties from their neighbours — and the predictions turned out to be right, which is why his table became the basis of the modern one. The modern table arranges elements in order of <strong>atomic number</strong>, which removes the few places where Mendeleev had to break his own weight order.</p>
<p>A <strong>group</strong> is a vertical column and contains elements with the same number of outer electrons, so they react in similar ways. A <strong>period</strong> is a horizontal row, and going across a period the atoms gain a proton and an electron and the elements change from metals to non-metals.</p>
<ul>
  <li><strong>Group 1, the alkali metals</strong> (lithium, sodium, potassium): one outer electron, so they are very reactive; reactivity increases down the group because the outer electron is further from the nucleus and lost more easily; they are soft, low density, and react with water to give a hydroxide and hydrogen: 2Na + 2H₂O → 2NaOH + H₂</li>
  <li><strong>Group 7, the halogens</strong> (fluorine, chlorine, bromine, iodine): seven outer electrons, so they gain one; reactivity decreases down the group; a more reactive halogen displaces a less reactive one from its salt: Cl₂ + 2KBr → 2KCl + Br₂</li>
  <li><strong>Group 0, the noble gases</strong> (helium, neon, argon): full outer shells, so they are unreactive; used where a non-reactive atmosphere is needed, such as argon in a filament lamp</li>
  <li><strong>Transition metals</strong> (the block between groups 2 and 3): hard, dense, high melting points, coloured compounds, variable oxidation states and useful catalysts — iron in the Haber process is the example the paper uses</li>
</ul>
<p>The table is a prediction machine: an element's group tells you its outer electrons and therefore its ion, and its position tells you whether it is a metal or a non-metal. That is how the properties of an unfamiliar element are answered without memorising it.</p>

<h3>8. Worked examples</h3>
<p><strong>Worked example 1 — counting the particles in an ion.</strong> Give the number of protons, neutrons and electrons in ²⁴Mg²⁺. The mass number is 24 and the atomic number of magnesium is 12. Protons = Z = 12; neutrons = A − Z = 24 − 12 = 12; electrons = Z − charge = 12 − 2 = 10. The ion has 10 electrons and the arrangement 2,8, the same as neon.</p>
<p><strong>Worked example 2 — relative atomic mass from abundances.</strong> A sample of chlorine contains 75% ³⁵Cl and 25% ³⁷Cl. Aᵣ = (35 × 75 + 37 × 25) ÷ 100 = (2625 + 925) ÷ 100 = 3550 ÷ 100 = 35.5. The answer is not rounded to a whole number, because a relative atomic mass is a weighted mean and chlorine really is a mixture.</p>
<p><strong>Worked example 3 — electron configuration.</strong> Calcium has atomic number 20, so it has 20 electrons: 2 in the first shell, 8 in the second, 8 in the third, and the remaining 2 in the fourth, giving 2,8,8,2. The Ca²⁺ ion has lost the two outer electrons, so its configuration is 2,8,8 and it is isoelectronic with argon.</p>
<p><strong>Worked example 4 — energy to boil a liquid.</strong> How much energy is needed to boil 0.50 kg of water if its specific latent heat of vaporisation is 2.3 × 10⁶ J/kg? Using E = m L: E = 0.50 × 2.3 × 10⁶ = 1.15 × 10⁶ J. Show the substitution — the mark scheme pays for the numbers being put into the relation, not for the final value alone.</p>

<h3>9. Exam-style questions</h3>
<ol>
  <li>An atom of an element has 17 protons and 18 neutrons. State its mass number, its number of electrons, and the charge on the ion it forms. <em>Answer:</em> mass number = protons + neutrons = 17 + 18 = 35; electrons = Z = 17; the atom has seven outer electrons, so it gains one and forms a 1− ion.</li>
  <li>Explain why the melting point of sodium is lower than the melting point of magnesium. <em>Answer:</em> both are metals, but magnesium contributes two delocalised electrons per atom and has a smaller ion, so the electrostatic attraction between the ions and the delocalised electrons is stronger, so more energy is needed to break the lattice.</li>
  <li>Bromine exists as ⁷⁹Br and ⁸¹Br in a 1:1 ratio. Calculate its relative atomic mass. <em>Answer:</em> Aᵣ = (mass₁ × abundance₁ + mass₂ × abundance₂) ÷ 100 = (79 × 50 + 81 × 50) ÷ 100 = (3950 + 4050) ÷ 100 = 8000 ÷ 100 = 80.0.</li>
  <li>Describe what happens to the particles of a solid as it is heated to its melting point and then melted. <em>Answer:</em> the particles vibrate more vigorously as the temperature rises, until the vibrations are strong enough to overcome the forces holding them in the lattice; at the melting point the temperature stays constant while the energy supplied breaks those forces, and the particles can then slide over one another.</li>
  <li>Chlorine water is added to potassium bromide solution. State what is observed and write the equation. <em>Answer:</em> the solution turns orange-brown because bromine is displaced; Cl₂ + 2KBr → 2KCl + Br₂; because chlorine is above bromine in group 7, it is the more reactive halogen and takes the bromide ion's electron.</li>
  <li>Explain why argon is used as the atmosphere inside a filament lamp. <em>Answer:</em> argon has a full outer shell so it is unreactive, and it will not react with the hot filament; it also stops the filament oxidising, which would shorten its life.</li>
</ol>

<h3>10. Common mistakes</h3>
<ul>
  <li>Writing "the particles get bigger" when a substance is heated. They do not — they move faster.</li>
  <li>Giving the number of electrons in an ion as the atomic number. In a positive ion the electron count is lower than Z.</li>
  <li>Confusing mass number with relative atomic mass: the first belongs to one atom, the second is a weighted mean for the element.</li>
  <li>Saying reactivity increases down group 7. It decreases; the halogen nearer the top of the group displaces the one below.</li>
  <li>Explaining a flat section on a heating curve as "the substance is not being heated". Energy is still being supplied; it is being used to change state.</li>
  <li>Giving a relative atomic mass with units. Aᵣ has no units, because it is a comparison with carbon-12.</li>
</ul>

<h3>11. Exam technique for this topic</h3>
<ul>
  <li>When asked to explain a trend, name the force and say what happens to it: "the attraction between the ions and the delocalised electrons is stronger, so more energy is needed".</li>
  <li>For "describe the arrangement and movement", answer both parts — examiners award a mark for arrangement and a separate one for movement.</li>
  <li>In a calculation question, write the relation, then the substitution, then the result with its unit. A bare answer can score zero even when the number is right.</li>
  <li>For an unfamiliar element, use its group number for outer electrons and its period for shells instead of trying to recall it.</li>
  <li>If a question says "explain", a statement of fact is not enough: link the observation to the particle-level reason.</li>
</ul>`,
};
