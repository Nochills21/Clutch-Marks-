with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$atomic-structure-and-the-periodic-table$lit$
), upd as (
  update public.study_materials sm
  set content = $lit$<h2>Atomic Structure and the Periodic Table</h2>
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
</ul>$lit$, material_type = 'notes', updated_at = now()
  from t
  where sm.topic_id = t.id and sm.title = $lit$IGCSE Chemistry (OxfordAQA): Atomic Structure and the Periodic Table$lit$
  returning sm.id
)
insert into public.study_materials (topic_id, title, content, material_type)
select t.id, $lit$IGCSE Chemistry (OxfordAQA): Atomic Structure and the Periodic Table$lit$, $lit$<h2>Atomic Structure and the Periodic Table</h2>
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
</ul>$lit$, 'notes'
from t
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$structure-bonding-and-the-properties-of-matter$lit$
), upd as (
  update public.study_materials sm
  set content = $lit$<h2>Structure, Bonding and the Properties of Matter</h2>
<p>This is the topic where chemistry stops being a list of facts and becomes an explanation. Once you can say what holds the particles together in a substance, you can predict its melting point, whether it conducts electricity, whether it dissolves and why it behaves differently from something that looks similar. The OxfordAQA 9202 specification divides the topic into four parts — chemical bonds (ionic, covalent and metallic), the link between bonding and properties, the structures of carbon, and nanoparticles — and the exam regularly asks you to explain a property by naming the bond and the force that has to be overcome. This note covers all four statements, with the explanations phrased the way the mark scheme expects.</p>

<h3>1. Why atoms bond at all</h3>
<p>Atoms bond because the arrangement of a full outer shell is more stable than the arrangement they start with. There are three routes to it, and they lead to three different kinds of structure:</p>
<ul>
  <li><strong>Electron transfer</strong> — a metal loses electrons and a non-metal gains them, producing oppositely charged ions held by electrostatic attraction: ionic bonding.</li>
  <li><strong>Electron sharing</strong> — two non-metals share pairs of electrons, producing molecules or a giant network: covalent bonding.</li>
  <li><strong>Delocalisation</strong> — metal atoms release their outer electrons into a shared "sea" while the positive ions stay in a lattice: metallic bonding.</li>
</ul>
<p>The structure that results is at least as important as the bond. Sodium chloride and hydrogen chloride both contain strong bonds, but one is a giant lattice with a melting point of 801 °C and the other is a simple molecule that is a gas at room temperature. The difference is the structure, not the strength of the bond inside it.</p>

<h3>2. Ionic bonding</h3>
<p>An ionic bond is the electrostatic attraction between oppositely charged ions. In sodium chloride, sodium (2,8,1) loses one electron to become Na⁺ with the arrangement 2,8, and chlorine (2,8,7) gains one to become Cl⁻ with 2,8,8. The ions are arranged in a regular giant ionic lattice in which each ion is surrounded by ions of the opposite charge, and the formula NaCl records the ratio of ions rather than a molecule — there is no such thing as one "NaCl particle".</p>
<p>The charge on the formula comes from balancing the ions: Mg²⁺ with Cl⁻ needs two chloride ions, so magnesium chloride is MgCl₂; Al³⁺ with O²⁻ needs two aluminium ions and three oxide ions, so aluminium oxide is Al₂O₃; Ca²⁺ with PO₄³⁻ needs three calcium ions and two phosphate ions, so calcium phosphate is Ca₃(PO₄)₂.</p>
<p>Three properties follow directly from a giant lattice of strong attractions:</p>
<ul>
  <li><strong>High melting and boiling points</strong>, because melting means breaking many strong electrostatic attractions, not just the bond between one pair of ions.</li>
  <li><strong>Conducts electricity when molten or dissolved, but not when solid</strong>, because the ions are fixed in place in the solid lattice and only become free to move when the lattice is broken.</li>
  <li><strong>Brittle</strong>, because shifting one layer brings ions of the same charge alongside each other, and the repulsion splits the crystal.</li>
</ul>

<h3>3. Covalent bonding</h3>
<p>A covalent bond is a shared pair of electrons between two non-metal atoms, and each atom contributes one electron to the pair. In a water molecule the oxygen atom shares two pairs, one with each hydrogen atom; in carbon dioxide the carbon shares two pairs with each oxygen; in nitrogen the two atoms share three pairs. The atoms are held together strongly inside the molecule, but the molecules themselves are held to each other only by weak intermolecular forces.</p>
<p>That distinction explains the properties of simple molecular substances:</p>
<ul>
  <li><strong>Low melting and boiling points</strong>, because only the weak forces between molecules have to be overcome, not the covalent bonds inside them. Iodine, carbon dioxide and water are all examples.</li>
  <li><strong>Never conduct electricity</strong>, because there are no ions and no free electrons — the molecules are neutral and the electrons are locked into bonds.</li>
  <li><strong>Often insoluble in water but soluble in organic solvents</strong>, because a molecule that is not charged has nothing to attract it to water molecules.</li>
</ul>

<h3>4. Metallic bonding</h3>
<p>In a metal the outer electrons are not attached to any one atom. Metal atoms are packed in a regular lattice, and their outer electrons form a sea of delocalised electrons that is shared across the whole structure. The bonding is the attraction between the positive ions and this sea of negative electrons.</p>
<p>The properties of metals follow from it: they conduct electricity because the delocalised electrons can move through the structure and carry charge; they conduct heat because those electrons carry kinetic energy; they are malleable and ductile because the layers of ions can slide over one another without breaking the attraction to the electron sea; and their melting points are generally high, but vary a great deal — mercury is a liquid at room temperature while tungsten melts near 3,400 °C, because the strength of the attraction depends on the size of the ion and the number of electrons contributed.</p>

<h3>5. Giant covalent structures and the many faces of carbon</h3>
<p>Carbon is the clearest example of the rule that structure decides properties, because the same element appears in four very different forms:</p>
<ul>
  <li><strong>Diamond</strong> — each carbon atom is covalently bonded to four others in a rigid three-dimensional network, so diamond is the hardest natural substance, has a very high melting point, and does not conduct electricity because there are no free electrons.</li>
  <li><strong>Graphite</strong> — each carbon atom is bonded to three others in flat layers of hexagons, with the fourth electron delocalised between the layers. The weak forces between layers let them slide, which is why graphite is soft and is used as a lubricant and in pencils; the delocalised electrons make graphite a conductor.</li>
  <li><strong>Graphene</strong> — a single layer one atom thick taken from graphite, extremely strong and an excellent conductor, which is why it is used in composites and electronics.</li>
  <li><strong>Fullerenes</strong> — closed cage structures of carbon such as C₆₀, a football-shaped molecule of 60 atoms. Their hollow shape has been used to deliver drugs and as catalysts, and carbon nanotubes are related structures with very high strength.</li>
</ul>
<p>Silicon dioxide, the main component of sand, is a giant covalent structure like diamond and shares diamond's hardness and high melting point. That is why sand does not melt in a Bunsen flame.</p>

<h3>6. Comparing the four structures</h3>
<table border="1">
  <thead><tr><th>Structure</th><th>Particles and attraction</th><th>Melting point</th><th>Conducts?</th><th>Example</th></tr></thead>
  <tbody>
    <tr><td>Giant ionic lattice</td><td>Ions held by strong electrostatic attraction</td><td>High</td><td>Only when molten or dissolved</td><td>Sodium chloride</td></tr>
    <tr><td>Simple molecular</td><td>Molecules held by weak intermolecular forces</td><td>Low</td><td>No</td><td>Carbon dioxide</td></tr>
    <tr><td>Giant covalent</td><td>Atoms held by many strong covalent bonds</td><td>Very high</td><td>Only graphite and graphene</td><td>Diamond, sand</td></tr>
    <tr><td>Metallic</td><td>Positive ions in a sea of delocalised electrons</td><td>Varies, generally high</td><td>Yes</td><td>Copper</td></tr>
  </tbody>
</table>
<p>An exam answer that names the structure and the attraction it must overcome can explain almost any property question, and it works for substances you have never seen.</p>

<h3>7. Nanoparticles</h3>
<p>A nanoparticle is a particle with at least one dimension between about 1 and 100 nanometres. A nanometre is 10⁻⁹ m, so a nanoparticle is roughly a thousand times smaller than a red blood cell. Because they are so small, a given mass of nanoparticles has an enormous surface area compared with the same mass of a bulk material, and most of their atoms are on the surface rather than buried inside.</p>
<p>surface area : volume = 6a² ÷ a³ = 6 ÷ a → <em>Key:</em> a = side length of the particle (m); the ratio has units of 1/m. The relation shows the point: as a falls, the ratio rises, so a 10 nm cube exposes six times the relative surface of a 60 nm cube.</p>
<ul>
  <li><strong>Uses</strong>: catalysts (a larger surface area means more collisions per second), sunscreens that block ultraviolet light while appearing transparent, silver nanoparticles as antibacterial coatings, and drug delivery in medicine.</li>
  <li><strong>Risks</strong>: their small size lets them enter the body more easily than bulk materials, and their long-term effect on health and the environment is not yet fully understood.</li>
</ul>

<h3>8. Worked examples</h3>
<p><strong>Worked example 1 — why molten sodium chloride conducts but the solid does not.</strong> In the solid the ions are held in fixed positions by the lattice, so there is no movement of charge; when molten the lattice is broken and the ions are free to move to the electrodes, so the melt conducts. The answer needs both halves: "ions free to move" and "only when molten".</p>
<p><strong>Worked example 2 — formula from the ions.</strong> Aluminium forms Al³⁺ and oxygen forms O²⁻. The lowest common multiple of the charges is 6, so two Al³⁺ give +6 and three O²⁻ give −6, and the formula is Al₂O₃. Always check the charges add to zero before writing it down.</p>
<p><strong>Worked example 3 — why graphite conducts but diamond does not.</strong> In graphite each carbon is bonded to three others, leaving one delocalised electron per atom that can move along the layer; in diamond all four outer electrons are used in bonds, so there is no free electron and no conduction. Naming the electron is the mark.</p>
<p><strong>Worked example 4 — surface area to volume.</strong> For a cube of side 10 nm, surface area : volume = 6 ÷ a = 6 ÷ 10 = 0.6 nm⁻¹; for a cube of side 60 nm it is 6 ÷ 60 = 0.1 nm⁻¹. The small particle is six times greater in relative surface, which is why it is the better catalyst.</p>

<h3>9. Exam-style questions</h3>
<ol>
  <li>Explain why magnesium oxide has a much higher melting point than hydrogen chloride. <em>Answer:</em> magnesium oxide is a giant ionic lattice, so melting needs many strong electrostatic attractions broken; hydrogen chloride is a simple molecular substance, so melting only needs the weak intermolecular forces overcome, not the covalent bonds.</li>
  <li>Explain why a crystal of sodium chloride shatters when struck. <em>Answer:</em> the layers shift so that ions of like charge are alongside each other; the resulting repulsion splits the lattice, which is why ionic crystals are brittle.</li>
  <li>Deduce the formula of calcium phosphate, given Ca²⁺ and PO₄³⁻. <em>Answer:</em> lowest common multiple of 2 and 3 is 6, so 3 × Ca²⁺ = +6 and 2 × PO₄³⁻ = −6; formula = Ca₃(PO₄)₂.</li>
  <li>Describe how the structure of graphite allows it to act as a lubricant and as a conductor. <em>Answer:</em> graphite has layers of hexagons held together by weak forces, so the layers slide over one another and it is slippery; each carbon has one delocalised electron, so charge can pass along the layers.</li>
  <li>Explain why a nanoparticle catalyst is more effective than the same mass of the bulk metal. <em>Answer:</em> surface area : volume = 6 ÷ a; for a 10 nm particle = 6 ÷ 10 = 0.6 nm⁻¹, while for a 60 nm particle = 6 ÷ 60 = 0.1 nm⁻¹, so the smaller particle exposes six times the relative surface for the same mass; reactants collide with the exposed surface, so more collisions happen per second and the rate increases.</li>
  <li>State two properties of simple molecular substances and explain them in terms of their structure. <em>Answer:</em> low melting point, because only the weak intermolecular forces are overcome on melting; no electrical conductivity, because the molecules are neutral and there are no free electrons or ions.</li>
</ol>

<h3>10. Common mistakes</h3>
<ul>
  <li>Saying that covalent bonds break when a simple molecular substance melts. They do not — the molecules separate intact; only the intermolecular forces are overcome.</li>
  <li>Writing "graphite has free electrons" without saying where they come from: it is the fourth electron per carbon atom that is not used in a bond.</li>
  <li>Explaining conductivity of solid sodium chloride. The ions exist, but they are not free to move until the lattice is molten or dissolved.</li>
  <li>Treating the formula of an ionic compound as a molecule. NaCl is a ratio of ions in a lattice.</li>
  <li>Confusing nano with micro. A nanoparticle is 1 to 100 nm, so it is far smaller than a microscope can resolve.</li>
  <li>Answering "it has strong bonds" without naming the type. The mark is for naming the bond or the force that is overcome.</li>
</ul>

<h3>11. Exam technique for this topic</h3>
<ul>
  <li>Every "explain the property" answer takes the same three steps: name the structure, name the attraction, say how much energy is needed to overcome it.</li>
  <li>For conduction, always say whether ions or electrons are moving, and whether they can move in that state.</li>
  <li>For a formula from ions, write the charges first, find the lowest common multiple, then the ratio — that is a mark scheme's own working.</li>
  <li>Compare questions need a comparison word: "higher", "stronger", "more energy", not just a description of each substance.</li>
  <li>If the question names an unfamiliar substance, decide whether it is ionic, simple molecular, giant covalent or metallic first; the property answer follows from that choice.</li>
</ul>$lit$, material_type = 'notes', updated_at = now()
  from t
  where sm.topic_id = t.id and sm.title = $lit$IGCSE Chemistry (OxfordAQA): Structure, Bonding and the Properties of Matter$lit$
  returning sm.id
)
insert into public.study_materials (topic_id, title, content, material_type)
select t.id, $lit$IGCSE Chemistry (OxfordAQA): Structure, Bonding and the Properties of Matter$lit$, $lit$<h2>Structure, Bonding and the Properties of Matter</h2>
<p>This is the topic where chemistry stops being a list of facts and becomes an explanation. Once you can say what holds the particles together in a substance, you can predict its melting point, whether it conducts electricity, whether it dissolves and why it behaves differently from something that looks similar. The OxfordAQA 9202 specification divides the topic into four parts — chemical bonds (ionic, covalent and metallic), the link between bonding and properties, the structures of carbon, and nanoparticles — and the exam regularly asks you to explain a property by naming the bond and the force that has to be overcome. This note covers all four statements, with the explanations phrased the way the mark scheme expects.</p>

<h3>1. Why atoms bond at all</h3>
<p>Atoms bond because the arrangement of a full outer shell is more stable than the arrangement they start with. There are three routes to it, and they lead to three different kinds of structure:</p>
<ul>
  <li><strong>Electron transfer</strong> — a metal loses electrons and a non-metal gains them, producing oppositely charged ions held by electrostatic attraction: ionic bonding.</li>
  <li><strong>Electron sharing</strong> — two non-metals share pairs of electrons, producing molecules or a giant network: covalent bonding.</li>
  <li><strong>Delocalisation</strong> — metal atoms release their outer electrons into a shared "sea" while the positive ions stay in a lattice: metallic bonding.</li>
</ul>
<p>The structure that results is at least as important as the bond. Sodium chloride and hydrogen chloride both contain strong bonds, but one is a giant lattice with a melting point of 801 °C and the other is a simple molecule that is a gas at room temperature. The difference is the structure, not the strength of the bond inside it.</p>

<h3>2. Ionic bonding</h3>
<p>An ionic bond is the electrostatic attraction between oppositely charged ions. In sodium chloride, sodium (2,8,1) loses one electron to become Na⁺ with the arrangement 2,8, and chlorine (2,8,7) gains one to become Cl⁻ with 2,8,8. The ions are arranged in a regular giant ionic lattice in which each ion is surrounded by ions of the opposite charge, and the formula NaCl records the ratio of ions rather than a molecule — there is no such thing as one "NaCl particle".</p>
<p>The charge on the formula comes from balancing the ions: Mg²⁺ with Cl⁻ needs two chloride ions, so magnesium chloride is MgCl₂; Al³⁺ with O²⁻ needs two aluminium ions and three oxide ions, so aluminium oxide is Al₂O₃; Ca²⁺ with PO₄³⁻ needs three calcium ions and two phosphate ions, so calcium phosphate is Ca₃(PO₄)₂.</p>
<p>Three properties follow directly from a giant lattice of strong attractions:</p>
<ul>
  <li><strong>High melting and boiling points</strong>, because melting means breaking many strong electrostatic attractions, not just the bond between one pair of ions.</li>
  <li><strong>Conducts electricity when molten or dissolved, but not when solid</strong>, because the ions are fixed in place in the solid lattice and only become free to move when the lattice is broken.</li>
  <li><strong>Brittle</strong>, because shifting one layer brings ions of the same charge alongside each other, and the repulsion splits the crystal.</li>
</ul>

<h3>3. Covalent bonding</h3>
<p>A covalent bond is a shared pair of electrons between two non-metal atoms, and each atom contributes one electron to the pair. In a water molecule the oxygen atom shares two pairs, one with each hydrogen atom; in carbon dioxide the carbon shares two pairs with each oxygen; in nitrogen the two atoms share three pairs. The atoms are held together strongly inside the molecule, but the molecules themselves are held to each other only by weak intermolecular forces.</p>
<p>That distinction explains the properties of simple molecular substances:</p>
<ul>
  <li><strong>Low melting and boiling points</strong>, because only the weak forces between molecules have to be overcome, not the covalent bonds inside them. Iodine, carbon dioxide and water are all examples.</li>
  <li><strong>Never conduct electricity</strong>, because there are no ions and no free electrons — the molecules are neutral and the electrons are locked into bonds.</li>
  <li><strong>Often insoluble in water but soluble in organic solvents</strong>, because a molecule that is not charged has nothing to attract it to water molecules.</li>
</ul>

<h3>4. Metallic bonding</h3>
<p>In a metal the outer electrons are not attached to any one atom. Metal atoms are packed in a regular lattice, and their outer electrons form a sea of delocalised electrons that is shared across the whole structure. The bonding is the attraction between the positive ions and this sea of negative electrons.</p>
<p>The properties of metals follow from it: they conduct electricity because the delocalised electrons can move through the structure and carry charge; they conduct heat because those electrons carry kinetic energy; they are malleable and ductile because the layers of ions can slide over one another without breaking the attraction to the electron sea; and their melting points are generally high, but vary a great deal — mercury is a liquid at room temperature while tungsten melts near 3,400 °C, because the strength of the attraction depends on the size of the ion and the number of electrons contributed.</p>

<h3>5. Giant covalent structures and the many faces of carbon</h3>
<p>Carbon is the clearest example of the rule that structure decides properties, because the same element appears in four very different forms:</p>
<ul>
  <li><strong>Diamond</strong> — each carbon atom is covalently bonded to four others in a rigid three-dimensional network, so diamond is the hardest natural substance, has a very high melting point, and does not conduct electricity because there are no free electrons.</li>
  <li><strong>Graphite</strong> — each carbon atom is bonded to three others in flat layers of hexagons, with the fourth electron delocalised between the layers. The weak forces between layers let them slide, which is why graphite is soft and is used as a lubricant and in pencils; the delocalised electrons make graphite a conductor.</li>
  <li><strong>Graphene</strong> — a single layer one atom thick taken from graphite, extremely strong and an excellent conductor, which is why it is used in composites and electronics.</li>
  <li><strong>Fullerenes</strong> — closed cage structures of carbon such as C₆₀, a football-shaped molecule of 60 atoms. Their hollow shape has been used to deliver drugs and as catalysts, and carbon nanotubes are related structures with very high strength.</li>
</ul>
<p>Silicon dioxide, the main component of sand, is a giant covalent structure like diamond and shares diamond's hardness and high melting point. That is why sand does not melt in a Bunsen flame.</p>

<h3>6. Comparing the four structures</h3>
<table border="1">
  <thead><tr><th>Structure</th><th>Particles and attraction</th><th>Melting point</th><th>Conducts?</th><th>Example</th></tr></thead>
  <tbody>
    <tr><td>Giant ionic lattice</td><td>Ions held by strong electrostatic attraction</td><td>High</td><td>Only when molten or dissolved</td><td>Sodium chloride</td></tr>
    <tr><td>Simple molecular</td><td>Molecules held by weak intermolecular forces</td><td>Low</td><td>No</td><td>Carbon dioxide</td></tr>
    <tr><td>Giant covalent</td><td>Atoms held by many strong covalent bonds</td><td>Very high</td><td>Only graphite and graphene</td><td>Diamond, sand</td></tr>
    <tr><td>Metallic</td><td>Positive ions in a sea of delocalised electrons</td><td>Varies, generally high</td><td>Yes</td><td>Copper</td></tr>
  </tbody>
</table>
<p>An exam answer that names the structure and the attraction it must overcome can explain almost any property question, and it works for substances you have never seen.</p>

<h3>7. Nanoparticles</h3>
<p>A nanoparticle is a particle with at least one dimension between about 1 and 100 nanometres. A nanometre is 10⁻⁹ m, so a nanoparticle is roughly a thousand times smaller than a red blood cell. Because they are so small, a given mass of nanoparticles has an enormous surface area compared with the same mass of a bulk material, and most of their atoms are on the surface rather than buried inside.</p>
<p>surface area : volume = 6a² ÷ a³ = 6 ÷ a → <em>Key:</em> a = side length of the particle (m); the ratio has units of 1/m. The relation shows the point: as a falls, the ratio rises, so a 10 nm cube exposes six times the relative surface of a 60 nm cube.</p>
<ul>
  <li><strong>Uses</strong>: catalysts (a larger surface area means more collisions per second), sunscreens that block ultraviolet light while appearing transparent, silver nanoparticles as antibacterial coatings, and drug delivery in medicine.</li>
  <li><strong>Risks</strong>: their small size lets them enter the body more easily than bulk materials, and their long-term effect on health and the environment is not yet fully understood.</li>
</ul>

<h3>8. Worked examples</h3>
<p><strong>Worked example 1 — why molten sodium chloride conducts but the solid does not.</strong> In the solid the ions are held in fixed positions by the lattice, so there is no movement of charge; when molten the lattice is broken and the ions are free to move to the electrodes, so the melt conducts. The answer needs both halves: "ions free to move" and "only when molten".</p>
<p><strong>Worked example 2 — formula from the ions.</strong> Aluminium forms Al³⁺ and oxygen forms O²⁻. The lowest common multiple of the charges is 6, so two Al³⁺ give +6 and three O²⁻ give −6, and the formula is Al₂O₃. Always check the charges add to zero before writing it down.</p>
<p><strong>Worked example 3 — why graphite conducts but diamond does not.</strong> In graphite each carbon is bonded to three others, leaving one delocalised electron per atom that can move along the layer; in diamond all four outer electrons are used in bonds, so there is no free electron and no conduction. Naming the electron is the mark.</p>
<p><strong>Worked example 4 — surface area to volume.</strong> For a cube of side 10 nm, surface area : volume = 6 ÷ a = 6 ÷ 10 = 0.6 nm⁻¹; for a cube of side 60 nm it is 6 ÷ 60 = 0.1 nm⁻¹. The small particle is six times greater in relative surface, which is why it is the better catalyst.</p>

<h3>9. Exam-style questions</h3>
<ol>
  <li>Explain why magnesium oxide has a much higher melting point than hydrogen chloride. <em>Answer:</em> magnesium oxide is a giant ionic lattice, so melting needs many strong electrostatic attractions broken; hydrogen chloride is a simple molecular substance, so melting only needs the weak intermolecular forces overcome, not the covalent bonds.</li>
  <li>Explain why a crystal of sodium chloride shatters when struck. <em>Answer:</em> the layers shift so that ions of like charge are alongside each other; the resulting repulsion splits the lattice, which is why ionic crystals are brittle.</li>
  <li>Deduce the formula of calcium phosphate, given Ca²⁺ and PO₄³⁻. <em>Answer:</em> lowest common multiple of 2 and 3 is 6, so 3 × Ca²⁺ = +6 and 2 × PO₄³⁻ = −6; formula = Ca₃(PO₄)₂.</li>
  <li>Describe how the structure of graphite allows it to act as a lubricant and as a conductor. <em>Answer:</em> graphite has layers of hexagons held together by weak forces, so the layers slide over one another and it is slippery; each carbon has one delocalised electron, so charge can pass along the layers.</li>
  <li>Explain why a nanoparticle catalyst is more effective than the same mass of the bulk metal. <em>Answer:</em> surface area : volume = 6 ÷ a; for a 10 nm particle = 6 ÷ 10 = 0.6 nm⁻¹, while for a 60 nm particle = 6 ÷ 60 = 0.1 nm⁻¹, so the smaller particle exposes six times the relative surface for the same mass; reactants collide with the exposed surface, so more collisions happen per second and the rate increases.</li>
  <li>State two properties of simple molecular substances and explain them in terms of their structure. <em>Answer:</em> low melting point, because only the weak intermolecular forces are overcome on melting; no electrical conductivity, because the molecules are neutral and there are no free electrons or ions.</li>
</ol>

<h3>10. Common mistakes</h3>
<ul>
  <li>Saying that covalent bonds break when a simple molecular substance melts. They do not — the molecules separate intact; only the intermolecular forces are overcome.</li>
  <li>Writing "graphite has free electrons" without saying where they come from: it is the fourth electron per carbon atom that is not used in a bond.</li>
  <li>Explaining conductivity of solid sodium chloride. The ions exist, but they are not free to move until the lattice is molten or dissolved.</li>
  <li>Treating the formula of an ionic compound as a molecule. NaCl is a ratio of ions in a lattice.</li>
  <li>Confusing nano with micro. A nanoparticle is 1 to 100 nm, so it is far smaller than a microscope can resolve.</li>
  <li>Answering "it has strong bonds" without naming the type. The mark is for naming the bond or the force that is overcome.</li>
</ul>

<h3>11. Exam technique for this topic</h3>
<ul>
  <li>Every "explain the property" answer takes the same three steps: name the structure, name the attraction, say how much energy is needed to overcome it.</li>
  <li>For conduction, always say whether ions or electrons are moving, and whether they can move in that state.</li>
  <li>For a formula from ions, write the charges first, find the lowest common multiple, then the ratio — that is a mark scheme's own working.</li>
  <li>Compare questions need a comparison word: "higher", "stronger", "more energy", not just a description of each substance.</li>
  <li>If the question names an unfamiliar substance, decide whether it is ionic, simple molecular, giant covalent or metallic first; the property answer follows from that choice.</li>
</ul>$lit$, 'notes'
from t
where not exists (select 1 from upd);
