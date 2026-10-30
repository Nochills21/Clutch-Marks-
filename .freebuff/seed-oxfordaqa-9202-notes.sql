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

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$chemical-changes$lit$
), upd as (
  update public.study_materials sm
  set content = $lit$<h2>Chemical Changes</h2>
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
$lit$, material_type = 'notes', updated_at = now()
  from t
  where sm.topic_id = t.id and sm.title = $lit$IGCSE Chemistry (OxfordAQA): Chemical Changes$lit$
  returning sm.id
)
insert into public.study_materials (topic_id, title, content, material_type)
select t.id, $lit$IGCSE Chemistry (OxfordAQA): Chemical Changes$lit$, $lit$<h2>Chemical Changes</h2>
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
$lit$, 'notes'
from t
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$chemical-analysis$lit$
), upd as (
  update public.study_materials sm
  set content = $lit$<h2>Chemical Analysis</h2>
<p>This topic is about finding out what a substance is without being told. Half of it is a set of tests you must know exactly — the gas tests, the flame tests, the hydroxide precipitates and the anion tests — because the examiner asks for the observation and the conclusion, and a test you half-remember produces the wrong colour and no marks. The other half is the two techniques that separate mixtures from pure substances: melting and boiling point as a measure of purity, and chromatography as a way of splitting a mixture into its components and identifying them by an Rf value. Both halves reward precision over explanation: a colour must be right, a calculation must be laid out, and the order of a test (acid first, then barium chloride) must be correct.</p>

<h3>1. What "pure" means in chemistry</h3>
<p>In everyday speech "pure" means "nothing added", which is why orange juice can be labelled pure while containing dozens of compounds. In chemistry a pure substance is a single element or a single compound, with nothing else mixed in. Pure water is H₂O and nothing else; orange juice is a mixture, however natural it is, because it contains water, sugars, acids and pigments together.</p>
<p>A mixture contains two or more substances that are not chemically joined, so it can be separated by physical means — filtration, distillation, crystallisation or chromatography — and the proportions can be anything. A compound is chemically joined, has a fixed formula, and can only be separated by a chemical reaction. That distinction is the reason a mixture has a melting <em>range</em> while a pure compound melts at one temperature.</p>
<p>Alloys are a useful test of the definition: brass is a mixture of copper and zinc, so it is not pure, even though it is a single solid material with a definite colour and it looks completely homogeneous.</p>

<h3>2. Melting and boiling points as a purity test</h3>
<p>A pure substance melts and boils at a single fixed temperature, and both values are a property of that substance. An impurity lowers the melting point and raises the boiling point, and it also spreads each one over a range, because the impurity disturbs the arrangement of particles and the substance no longer changes state all at once.</p>
<p>So the test is not just "get a number and look it up": the <em>sharpness</em> is the evidence. A sample that melts between 78.5 and 79.5 °C is almost certainly a pure substance, because that range is 1 °C wide and near the melting point of naphthalene at 80 °C; a sample that starts to soften at 70 °C and is fully liquid at 85 °C is impure, whatever its average. The value identifies the substance and the width of the range judges its purity, so two samples with different ranges are not equally pure, and the wider and lower the range, the more impurity is present.</p>
<p>Boiling point is measured the same way, and distillation uses this: a pure liquid distils at a constant temperature, so a thermometer reading that climbs during distillation is evidence that the liquid was a mixture. That is why fractional distillation can separate crude oil into fractions at all.</p>

<h3>3. Formulations and mixtures</h3>
<p>Many useful materials are deliberately mixtures, designed to have the properties no single substance has. These are called <strong>formulations</strong>, and each component is present in a measured amount: paints contain a pigment, a solvent, a binder and additives; medicines contain an active ingredient plus fillers; fertilisers contain several compounds to supply nitrogen, phosphorus and potassium together; alloys are formulated for strength or resistance to corrosion.</p>
<p>Because a formulation is a mixture, its composition can be checked by analysis rather than by a formula — the percentage by mass of each component can be measured, and a product that does not match its specification is out of specification even if every ingredient is present. The exam wording to watch for is "state why the paint is a formulation rather than a compound": the answer is that the components are mixed and not chemically combined, and each is present in a chosen proportion.</p>

<h3>4. Paper chromatography — how it separates</h3>
<p>Chromatography separates the components of a mixture by letting them travel at different speeds through a material. In paper chromatography the paper is the <strong>stationary phase</strong> (the water held in the paper fibres does most of the work) and the solvent that creeps up it is the <strong>mobile phase</strong>.</p>
<p>The method matters, because the marks are in the detail: draw a pencil line near the bottom of the paper (pencil, not pen, because ink would dissolve and run), put a small spot of the mixture on the line, and lower the paper into the solvent so that the solvent is <em>below</em> the line and the spot is not submerged. Let the solvent rise, then take the paper out and mark the solvent front before it dries.</p>
<p>A component that is strongly attracted to the stationary phase moves slowly; one that dissolves well in the mobile phase moves quickly. The result is a series of spots at different heights. If a substance is colourless, a <strong>locating agent</strong> is needed to make the spots visible — ninhydrin for amino acids, for example — which is why an "explain why a locating agent is used" question appears so often.</p>
<p>Chromatography is used to identify the dyes in an ink or a food colouring, to separate the amino acids from a protein digest, to check the purity of a drug, and in forensic work to compare a sample from a scene with a reference. In every case the identification works by comparison: the unknown's spots are compared with spots from known substances run on the same paper.</p>

<h3>5. Rf values and reading a chromatogram</h3>
<p>The position of a spot is summarised by its Rf value — the retention factor — which is the distance the spot moved divided by the distance the solvent moved:</p>
<p>Rf = distance moved by the substance ÷ distance moved by the solvent front → <em>Key:</em> both distances are measured in the same units (usually cm) from the pencil line, to the <em>centre</em> of the spot and to the solvent front; Rf has no units and is always less than 1, because nothing can travel further than the solvent.</p>
<p>The Rf value is a property of the substance <em>under those conditions</em>, which is the sentence that earns the mark. Change the solvent, the temperature or the type of paper and the value changes, so an Rf is only comparable with a reference value obtained the same way. That is why an unknown is run alongside known substances on the same sheet rather than matched against a table from a textbook.</p>
<p>Reading a chromatogram also involves counting: three spots in a vertical line means three components, and two spots at the same height means the same substance, whether the mixture is a single sample or two samples side by side.</p>

<h3>6. Worked examples — purity and chromatography</h3>
<p><strong>Example 1.</strong> On a chromatogram the solvent front is 7.8 cm above the pencil line and the centre of a spot is 4.7 cm above it. Calculate the Rf value.</p>
<p>Rf = distance moved by the substance ÷ distance moved by the solvent front = 4.7 ÷ 7.8 = 0.60. The answer has no units, and it must be below 1; a value above 1 means the distances were measured from the wrong place, usually from the bottom of the paper rather than from the pencil line.</p>
<p><strong>Example 2.</strong> A sample of a solid melts between 74 °C and 81 °C. The pure substance melts at 79 °C. State what the result shows and explain it.</p>
<p>The sample is impure. A pure substance melts sharply at a single temperature, whereas this sample melts over a range of 7 °C and starts to melt below the true value; an impurity lowers the melting point and broadens the range, so both features point the same way.</p>
<p><strong>Example 3.</strong> Why must the solvent level be below the spot when the paper is placed in the tank?</p>
<p>If the solvent covers the spot, the sample dissolves into the bulk solvent in the tank instead of travelling up the paper, so the components never separate and no chromatogram forms.</p>

<h3>7. Tests for the common gases</h3>
<p>Six gases are examined, and each has one test and one observation. Learn them as pairs, because a test without its observation scores nothing:</p>
<table border="1">
  <tr><th>Gas</th><th>Test</th><th>Positive result</th></tr>
  <tr><td>Hydrogen, H₂</td><td>Hold a lighted splint at the mouth of the tube</td><td>A squeaky pop as it burns</td></tr>
  <tr><td>Oxygen, O₂</td><td>Insert a glowing splint</td><td>The splint relights</td></tr>
  <tr><td>Carbon dioxide, CO₂</td><td>Bubble through limewater (calcium hydroxide solution)</td><td>The limewater turns milky or cloudy</td></tr>
  <tr><td>Chlorine, Cl₂</td><td>Hold damp litmus paper in the gas</td><td>The paper is bleached; the gas is pale green</td></tr>
  <tr><td>Ammonia, NH₃</td><td>Hold damp red litmus paper in the gas</td><td>The paper turns blue</td></tr>
  <tr><td>Sulfur dioxide, SO₂</td><td>Bubble through acidified potassium dichromate(VI) solution</td><td>Orange turns green</td></tr>
</table>
<p>The limewater test has a chemistry behind it, and it is worth knowing because it explains the word "milky": CO₂ + Ca(OH)₂ → CaCO₃ + H₂O → <em>Key:</em> the calcium carbonate is the white, insoluble solid that makes the solution cloudy, and it dissolves again if excess carbon dioxide is bubbled through, which is why a long bubbling can clear the liquid.</p>
<p>Two of these tests are easily confused. Chlorine bleaches damp litmus (it goes white), while ammonia turns damp <em>red</em> litmus blue; using blue litmus for chlorine and red for oxygen is the usual slip. Notice too that the litmus must be damp for both, because the gas has to dissolve to form an acid or an alkali before it can change the indicator.</p>

<h3>8. Flame tests for metal ions</h3>
<p>A clean nichrome or platinum wire is dipped in the sample and held in a non-luminous flame; the colour of the flame identifies the metal ion. The wire must be cleaned in concentrated hydrochloric acid between tests, otherwise the previous sample contaminates the next colour.</p>
<table border="1">
  <tr><th>Ion</th><th>Flame colour</th></tr>
  <tr><td>Lithium, Li⁺</td><td>Crimson (deep red)</td></tr>
  <tr><td>Sodium, Na⁺</td><td>Yellow, persistent and bright</td></tr>
  <tr><td>Potassium, K⁺</td><td>Lilac</td></tr>
  <tr><td>Calcium, Ca²⁺</td><td>Orange-red</td></tr>
  <tr><td>Copper, Cu²⁺</td><td>Green or blue-green</td></tr>
</table>
<p>Flame tests work because heating supplies energy that excites electrons; as they fall back they emit light of a wavelength characteristic of that ion. That explanation is not required at IGCSE, but it does explain the limitation: a mixture of two metal ions shows the dominant colour, so sodium's yellow can mask everything else, and a very small amount of an ion may give no visible colour at all. Flame tests are quick but not sensitive, which is exactly the gap that instrumental methods fill.</p>

<h3>9. Hydroxide precipitate tests</h3>
<p>Adding a few drops of sodium hydroxide solution to a solution of a metal salt produces an insoluble hydroxide, and the colour of that precipitate identifies several ions at once:</p>
<table border="1">
  <tr><th>Ion</th><th>Precipitate with NaOH(aq)</th><th>Behaviour in excess NaOH(aq)</th></tr>
  <tr><td>Copper(II), Cu²⁺</td><td>Blue</td><td>Insoluble</td></tr>
  <tr><td>Iron(II), Fe²⁺</td><td>Green, turning brown on standing in air</td><td>Insoluble</td></tr>
  <tr><td>Iron(III), Fe³⁺</td><td>Red-brown (rust coloured)</td><td>Insoluble</td></tr>
  <tr><td>Aluminium, Al³⁺</td><td>White</td><td>Dissolves to a colourless solution</td></tr>
  <tr><td>Zinc, Zn²⁺</td><td>White</td><td>Dissolves to a colourless solution</td></tr>
  <tr><td>Calcium, Ca²⁺</td><td>White</td><td>Insoluble</td></tr>
  <tr><td>Magnesium, Mg²⁺</td><td>White</td><td>Insoluble</td></tr>
</table>
<p>The behaviour in excess is the part students leave out and the part that carries the marks. Aluminium and zinc hydroxides are amphoteric — they dissolve in excess alkali — so a white precipitate that disappears in excess sodium hydroxide is evidence for Al³⁺ or Zn²⁺, and a white precipitate that stays is evidence for Ca²⁺ or Mg²⁺. To separate aluminium from zinc, add ammonia solution instead: the zinc hydroxide dissolves in excess ammonia, the aluminium hydroxide does not.</p>
<p>Iron(II) is worth a second look: the green precipitate is iron(II) hydroxide, and it darkens to brown because the iron(II) is oxidised to iron(III) by oxygen in the air. If a question says the precipitate "turns brown on standing", the answer is iron(II) and the explanation is oxidation, not a mistake by the student.</p>

<h3>10. Tests for anions</h3>
<p>Three anion tests cover the syllabus, and each has a required order of addition:</p>
<ul>
  <li><strong>Carbonate, CO₃²⁻:</strong> add dilute acid. If a carbonate is present, effervescence occurs and the gas turns limewater milky — the same CO₂ test as above. Nothing else in these tests fizzes with acid, so this one is a good first check.</li>
  <li><strong>Sulfate, SO₄²⁻:</strong> add dilute hydrochloric acid first, then barium chloride solution. A white precipitate of barium sulfate confirms a sulfate. The acid is added first to remove any carbonate, which would also give a white precipitate and a false positive.</li>
  <li><strong>Halides:</strong> add dilute nitric acid, then silver nitrate solution. Chloride gives a white precipitate, bromide gives cream, and iodide gives yellow. The acid removes carbonate for the same reason as above, so a white precipitate here really is silver chloride rather than a mixture of silver chloride and carbonate.</li>
</ul>
<p>To tell the halides apart with certainty, add ammonia solution: silver chloride dissolves in dilute ammonia, silver bromide only in concentrated ammonia, and silver iodide does not dissolve at all. That single extra step is often the difference between a 2-mark and a 3-mark answer.</p>

<h3>11. Putting the tests together — identifying an unknown</h3>
<p>Most exam questions give an unknown solid and a list of results, and the answer is built from them in order. Work through the observations systematically:</p>
<ol>
  <li>Colour of the solid or solution — a blue solution suggests Cu²⁺, pale green Fe²⁺, yellow or brown Fe³⁺. A colourless solution rules those out but not much else.</li>
  <li>Flame test — identifies Li⁺, Na⁺, K⁺, Ca²⁺ or Cu²⁺ even in a mixture.</li>
  <li>Hydroxide precipitate — confirms the cation and gives information the flame test cannot, especially for Al³⁺, Zn²⁺, Mg²⁺ and Fe²⁺, which have no useful flame colour.</li>
  <li>Carbonate test with acid — decides whether the anion might be a carbonate before anything else is added.</li>
  <li>Sulfate and halide tests — with the acid first in each case, so the result is not confused by a carbonate.</li>
</ol>
<p>The one modern addition in the spec is <strong>instrumental analysis</strong>, and flame emission spectroscopy is the example to know. The sample is heated in a flame and the light emitted is passed through a spectrometer, which separates it into wavelengths. Each metal ion emits a characteristic set of wavelengths, so the ion can be identified from the pattern, and the intensity of the light gives the concentration.</p>
<p>Compared with the tests above, instrumental methods are more sensitive (they detect amounts far too small to see), faster, and more accurate, and they can analyse a mixture without separating it or even without a trained eye reading a colour. The cost is the equipment, which is why a school laboratory still uses a wire and a flame.</p>

<h3>12. Worked examples — identification</h3>
<p><strong>Example 1.</strong> A white solid dissolves in water to give a colourless solution. Adding sodium hydroxide gives a white precipitate that does not dissolve in excess. Adding dilute nitric acid then silver nitrate gives a white precipitate that dissolves in dilute ammonia. Identify the solid.</p>
<p>A white precipitate with sodium hydroxide that is insoluble in excess is calcium or magnesium; the flame test would separate them, but with no flame colour reported, the anion decides the identity. The white precipitate with silver nitrate that dissolves in dilute ammonia is silver chloride, so the anion is Cl⁻. A compound of Ca²⁺ (the more common of the two in this test) with Cl⁻ gives calcium chloride, CaCl₂.</p>
<p><strong>Example 2.</strong> Three unlabelled solutions contain copper(II) sulfate, iron(II) sulfate and iron(III) sulfate. Describe one test that identifies all three.</p>
<p>Add sodium hydroxide solution to each. Copper(II) gives a blue precipitate, iron(II) gives a green precipitate that turns brown on standing, and iron(III) gives a red-brown precipitate immediately. One reagent, three colours, and the precipitates are all insoluble in excess, so the excess step is not needed here.</p>
<p><strong>Example 3.</strong> A fertiliser is suspected of containing ammonium sulfate. Explain why the sulfate test must come after the carbonate test.</p>
<p>If a carbonate were present, adding barium chloride would give a white precipitate of barium carbonate, which looks exactly like barium sulfate; adding dilute acid first destroys any carbonate, so a white precipitate afterwards can only be barium sulfate. The carbonate test is not optional housekeeping: it is what makes the sulfate result mean something.</p>

<h3>13. Exam-style questions</h3>
<ol>
  <li>State what is meant by a pure substance in chemistry, and explain why a sample that melts over a range of 8 °C is not pure. <em>Answer:</em> a pure substance is a single element or compound with nothing else mixed in; a pure substance melts at one fixed temperature, so a range of 8 °C shows an impurity is present, which lowers the melting point and spreads it over a range.</li>
  <li>Describe how paper chromatography can show that a green ink contains three dyes. <em>Answer:</em> place a spot of the ink on a pencil line near the bottom of the paper, stand the paper in a solvent with the solvent level below the spot, and let the solvent rise; the dyes travel at different speeds according to their attraction to the paper and the solvent, so three spots appear at different heights, and each can be identified by comparing its Rf value with those of known dyes run on the same paper.</li>
  <li>Give the test and the observation for carbon dioxide, and write the equation for the reaction involved. <em>Answer:</em> bubble the gas through limewater; it turns milky. CO₂ + Ca(OH)₂ → CaCO₃ + H₂O, and the white calcium carbonate is what makes it cloudy.</li>
  <li>A solution gives a white precipitate with sodium hydroxide that dissolves in excess, and no precipitate with silver nitrate. Identify the two ions that could be present and explain how to distinguish them. <em>Answer:</em> Al³⁺ or Zn²⁺, since both give a white hydroxide that is amphoteric; add ammonia solution instead, because zinc hydroxide dissolves in excess ammonia and aluminium hydroxide does not.</li>
  <li>Explain why the wire used in a flame test must be cleaned between samples. <em>Answer:</em> a trace of the previous sample would remain on the wire and give its flame colour, so the observed colour might belong to the contaminant rather than to the substance being tested.</li>
  <li>State two advantages of flame emission spectroscopy over a flame test. <em>Answer:</em> it is more sensitive, so it detects ions at concentrations too low for a visible colour; and it is more accurate and can measure concentration as well as identify the ion, whereas a flame test only gives a colour.</li>
  <li>A white solid fizzes with dilute hydrochloric acid and the gas turns limewater milky. Identify the anion and write the ionic equation for the reaction with acid. <em>Answer:</em> carbonate, CO₃²⁻; CO₃²⁻ + 2H⁺ → CO₂ + H₂O. The fizzing and the milky limewater together are the evidence, since neither observation on its own is conclusive.</li>
</ol>

<h3>14. Common mistakes</h3>
<ul>
  <li>Using the wrong litmus for a gas. Chlorine bleaches damp litmus paper; ammonia turns damp red litmus blue.</li>
  <li>Giving a test without its observation. "Bubble through limewater" scores nothing until you add "and it turns milky".</li>
  <li>Mixing the halide colours. Chloride is white, bromide cream, iodide yellow — not the other way round.</li>
  <li>Adding silver nitrate before the acid. Without the acid first, a carbonate produces a white precipitate and looks like a chloride.</li>
  <li>Forgetting the excess step in a hydroxide precipitate test, which is the only way to separate aluminium and zinc from calcium and magnesium.</li>
  <li>Measuring Rf from the bottom edge of the paper rather than from the pencil line, or to the top of the spot rather than its centre. Both give a value that is wrong and sometimes greater than 1.</li>
  <li>Saying a substance is pure because it looks uniform. Brass is uniform and is a mixture.</li>
  <li>Claiming an impurity raises the melting point. It lowers it, and raises the boiling point.</li>
</ul>

<h3>15. Exam technique for this topic</h3>
<ul>
  <li>Write tests as a pair: reagent, then observation, then conclusion. Three short sentences score three marks; "it goes cloudy" alone scores one.</li>
  <li>Give colours precisely, with the standard words: blue, green, red-brown, cream, yellow, lilac, crimson, orange-red. "Dark" or "light" is not a colour in a mark scheme.</li>
  <li>When the question says "excess", it is asking about the extra observation, not about the amount. Say whether the precipitate dissolves.</li>
  <li>In an Rf calculation, show the fraction with the words in place before substituting the numbers, and check the answer is below 1.</li>
  <li>If the data identify two possible ions, say how to tell them apart rather than guessing. A named second test is a mark; a guess is not.</li>
  <li>For "state one advantage of an instrumental method", the safe answers are sensitivity, speed, accuracy and the ability to work with very small samples.</li>
</ul>
$lit$, material_type = 'notes', updated_at = now()
  from t
  where sm.topic_id = t.id and sm.title = $lit$IGCSE Chemistry (OxfordAQA): Chemical Analysis$lit$
  returning sm.id
)
insert into public.study_materials (topic_id, title, content, material_type)
select t.id, $lit$IGCSE Chemistry (OxfordAQA): Chemical Analysis$lit$, $lit$<h2>Chemical Analysis</h2>
<p>This topic is about finding out what a substance is without being told. Half of it is a set of tests you must know exactly — the gas tests, the flame tests, the hydroxide precipitates and the anion tests — because the examiner asks for the observation and the conclusion, and a test you half-remember produces the wrong colour and no marks. The other half is the two techniques that separate mixtures from pure substances: melting and boiling point as a measure of purity, and chromatography as a way of splitting a mixture into its components and identifying them by an Rf value. Both halves reward precision over explanation: a colour must be right, a calculation must be laid out, and the order of a test (acid first, then barium chloride) must be correct.</p>

<h3>1. What "pure" means in chemistry</h3>
<p>In everyday speech "pure" means "nothing added", which is why orange juice can be labelled pure while containing dozens of compounds. In chemistry a pure substance is a single element or a single compound, with nothing else mixed in. Pure water is H₂O and nothing else; orange juice is a mixture, however natural it is, because it contains water, sugars, acids and pigments together.</p>
<p>A mixture contains two or more substances that are not chemically joined, so it can be separated by physical means — filtration, distillation, crystallisation or chromatography — and the proportions can be anything. A compound is chemically joined, has a fixed formula, and can only be separated by a chemical reaction. That distinction is the reason a mixture has a melting <em>range</em> while a pure compound melts at one temperature.</p>
<p>Alloys are a useful test of the definition: brass is a mixture of copper and zinc, so it is not pure, even though it is a single solid material with a definite colour and it looks completely homogeneous.</p>

<h3>2. Melting and boiling points as a purity test</h3>
<p>A pure substance melts and boils at a single fixed temperature, and both values are a property of that substance. An impurity lowers the melting point and raises the boiling point, and it also spreads each one over a range, because the impurity disturbs the arrangement of particles and the substance no longer changes state all at once.</p>
<p>So the test is not just "get a number and look it up": the <em>sharpness</em> is the evidence. A sample that melts between 78.5 and 79.5 °C is almost certainly a pure substance, because that range is 1 °C wide and near the melting point of naphthalene at 80 °C; a sample that starts to soften at 70 °C and is fully liquid at 85 °C is impure, whatever its average. The value identifies the substance and the width of the range judges its purity, so two samples with different ranges are not equally pure, and the wider and lower the range, the more impurity is present.</p>
<p>Boiling point is measured the same way, and distillation uses this: a pure liquid distils at a constant temperature, so a thermometer reading that climbs during distillation is evidence that the liquid was a mixture. That is why fractional distillation can separate crude oil into fractions at all.</p>

<h3>3. Formulations and mixtures</h3>
<p>Many useful materials are deliberately mixtures, designed to have the properties no single substance has. These are called <strong>formulations</strong>, and each component is present in a measured amount: paints contain a pigment, a solvent, a binder and additives; medicines contain an active ingredient plus fillers; fertilisers contain several compounds to supply nitrogen, phosphorus and potassium together; alloys are formulated for strength or resistance to corrosion.</p>
<p>Because a formulation is a mixture, its composition can be checked by analysis rather than by a formula — the percentage by mass of each component can be measured, and a product that does not match its specification is out of specification even if every ingredient is present. The exam wording to watch for is "state why the paint is a formulation rather than a compound": the answer is that the components are mixed and not chemically combined, and each is present in a chosen proportion.</p>

<h3>4. Paper chromatography — how it separates</h3>
<p>Chromatography separates the components of a mixture by letting them travel at different speeds through a material. In paper chromatography the paper is the <strong>stationary phase</strong> (the water held in the paper fibres does most of the work) and the solvent that creeps up it is the <strong>mobile phase</strong>.</p>
<p>The method matters, because the marks are in the detail: draw a pencil line near the bottom of the paper (pencil, not pen, because ink would dissolve and run), put a small spot of the mixture on the line, and lower the paper into the solvent so that the solvent is <em>below</em> the line and the spot is not submerged. Let the solvent rise, then take the paper out and mark the solvent front before it dries.</p>
<p>A component that is strongly attracted to the stationary phase moves slowly; one that dissolves well in the mobile phase moves quickly. The result is a series of spots at different heights. If a substance is colourless, a <strong>locating agent</strong> is needed to make the spots visible — ninhydrin for amino acids, for example — which is why an "explain why a locating agent is used" question appears so often.</p>
<p>Chromatography is used to identify the dyes in an ink or a food colouring, to separate the amino acids from a protein digest, to check the purity of a drug, and in forensic work to compare a sample from a scene with a reference. In every case the identification works by comparison: the unknown's spots are compared with spots from known substances run on the same paper.</p>

<h3>5. Rf values and reading a chromatogram</h3>
<p>The position of a spot is summarised by its Rf value — the retention factor — which is the distance the spot moved divided by the distance the solvent moved:</p>
<p>Rf = distance moved by the substance ÷ distance moved by the solvent front → <em>Key:</em> both distances are measured in the same units (usually cm) from the pencil line, to the <em>centre</em> of the spot and to the solvent front; Rf has no units and is always less than 1, because nothing can travel further than the solvent.</p>
<p>The Rf value is a property of the substance <em>under those conditions</em>, which is the sentence that earns the mark. Change the solvent, the temperature or the type of paper and the value changes, so an Rf is only comparable with a reference value obtained the same way. That is why an unknown is run alongside known substances on the same sheet rather than matched against a table from a textbook.</p>
<p>Reading a chromatogram also involves counting: three spots in a vertical line means three components, and two spots at the same height means the same substance, whether the mixture is a single sample or two samples side by side.</p>

<h3>6. Worked examples — purity and chromatography</h3>
<p><strong>Example 1.</strong> On a chromatogram the solvent front is 7.8 cm above the pencil line and the centre of a spot is 4.7 cm above it. Calculate the Rf value.</p>
<p>Rf = distance moved by the substance ÷ distance moved by the solvent front = 4.7 ÷ 7.8 = 0.60. The answer has no units, and it must be below 1; a value above 1 means the distances were measured from the wrong place, usually from the bottom of the paper rather than from the pencil line.</p>
<p><strong>Example 2.</strong> A sample of a solid melts between 74 °C and 81 °C. The pure substance melts at 79 °C. State what the result shows and explain it.</p>
<p>The sample is impure. A pure substance melts sharply at a single temperature, whereas this sample melts over a range of 7 °C and starts to melt below the true value; an impurity lowers the melting point and broadens the range, so both features point the same way.</p>
<p><strong>Example 3.</strong> Why must the solvent level be below the spot when the paper is placed in the tank?</p>
<p>If the solvent covers the spot, the sample dissolves into the bulk solvent in the tank instead of travelling up the paper, so the components never separate and no chromatogram forms.</p>

<h3>7. Tests for the common gases</h3>
<p>Six gases are examined, and each has one test and one observation. Learn them as pairs, because a test without its observation scores nothing:</p>
<table border="1">
  <tr><th>Gas</th><th>Test</th><th>Positive result</th></tr>
  <tr><td>Hydrogen, H₂</td><td>Hold a lighted splint at the mouth of the tube</td><td>A squeaky pop as it burns</td></tr>
  <tr><td>Oxygen, O₂</td><td>Insert a glowing splint</td><td>The splint relights</td></tr>
  <tr><td>Carbon dioxide, CO₂</td><td>Bubble through limewater (calcium hydroxide solution)</td><td>The limewater turns milky or cloudy</td></tr>
  <tr><td>Chlorine, Cl₂</td><td>Hold damp litmus paper in the gas</td><td>The paper is bleached; the gas is pale green</td></tr>
  <tr><td>Ammonia, NH₃</td><td>Hold damp red litmus paper in the gas</td><td>The paper turns blue</td></tr>
  <tr><td>Sulfur dioxide, SO₂</td><td>Bubble through acidified potassium dichromate(VI) solution</td><td>Orange turns green</td></tr>
</table>
<p>The limewater test has a chemistry behind it, and it is worth knowing because it explains the word "milky": CO₂ + Ca(OH)₂ → CaCO₃ + H₂O → <em>Key:</em> the calcium carbonate is the white, insoluble solid that makes the solution cloudy, and it dissolves again if excess carbon dioxide is bubbled through, which is why a long bubbling can clear the liquid.</p>
<p>Two of these tests are easily confused. Chlorine bleaches damp litmus (it goes white), while ammonia turns damp <em>red</em> litmus blue; using blue litmus for chlorine and red for oxygen is the usual slip. Notice too that the litmus must be damp for both, because the gas has to dissolve to form an acid or an alkali before it can change the indicator.</p>

<h3>8. Flame tests for metal ions</h3>
<p>A clean nichrome or platinum wire is dipped in the sample and held in a non-luminous flame; the colour of the flame identifies the metal ion. The wire must be cleaned in concentrated hydrochloric acid between tests, otherwise the previous sample contaminates the next colour.</p>
<table border="1">
  <tr><th>Ion</th><th>Flame colour</th></tr>
  <tr><td>Lithium, Li⁺</td><td>Crimson (deep red)</td></tr>
  <tr><td>Sodium, Na⁺</td><td>Yellow, persistent and bright</td></tr>
  <tr><td>Potassium, K⁺</td><td>Lilac</td></tr>
  <tr><td>Calcium, Ca²⁺</td><td>Orange-red</td></tr>
  <tr><td>Copper, Cu²⁺</td><td>Green or blue-green</td></tr>
</table>
<p>Flame tests work because heating supplies energy that excites electrons; as they fall back they emit light of a wavelength characteristic of that ion. That explanation is not required at IGCSE, but it does explain the limitation: a mixture of two metal ions shows the dominant colour, so sodium's yellow can mask everything else, and a very small amount of an ion may give no visible colour at all. Flame tests are quick but not sensitive, which is exactly the gap that instrumental methods fill.</p>

<h3>9. Hydroxide precipitate tests</h3>
<p>Adding a few drops of sodium hydroxide solution to a solution of a metal salt produces an insoluble hydroxide, and the colour of that precipitate identifies several ions at once:</p>
<table border="1">
  <tr><th>Ion</th><th>Precipitate with NaOH(aq)</th><th>Behaviour in excess NaOH(aq)</th></tr>
  <tr><td>Copper(II), Cu²⁺</td><td>Blue</td><td>Insoluble</td></tr>
  <tr><td>Iron(II), Fe²⁺</td><td>Green, turning brown on standing in air</td><td>Insoluble</td></tr>
  <tr><td>Iron(III), Fe³⁺</td><td>Red-brown (rust coloured)</td><td>Insoluble</td></tr>
  <tr><td>Aluminium, Al³⁺</td><td>White</td><td>Dissolves to a colourless solution</td></tr>
  <tr><td>Zinc, Zn²⁺</td><td>White</td><td>Dissolves to a colourless solution</td></tr>
  <tr><td>Calcium, Ca²⁺</td><td>White</td><td>Insoluble</td></tr>
  <tr><td>Magnesium, Mg²⁺</td><td>White</td><td>Insoluble</td></tr>
</table>
<p>The behaviour in excess is the part students leave out and the part that carries the marks. Aluminium and zinc hydroxides are amphoteric — they dissolve in excess alkali — so a white precipitate that disappears in excess sodium hydroxide is evidence for Al³⁺ or Zn²⁺, and a white precipitate that stays is evidence for Ca²⁺ or Mg²⁺. To separate aluminium from zinc, add ammonia solution instead: the zinc hydroxide dissolves in excess ammonia, the aluminium hydroxide does not.</p>
<p>Iron(II) is worth a second look: the green precipitate is iron(II) hydroxide, and it darkens to brown because the iron(II) is oxidised to iron(III) by oxygen in the air. If a question says the precipitate "turns brown on standing", the answer is iron(II) and the explanation is oxidation, not a mistake by the student.</p>

<h3>10. Tests for anions</h3>
<p>Three anion tests cover the syllabus, and each has a required order of addition:</p>
<ul>
  <li><strong>Carbonate, CO₃²⁻:</strong> add dilute acid. If a carbonate is present, effervescence occurs and the gas turns limewater milky — the same CO₂ test as above. Nothing else in these tests fizzes with acid, so this one is a good first check.</li>
  <li><strong>Sulfate, SO₄²⁻:</strong> add dilute hydrochloric acid first, then barium chloride solution. A white precipitate of barium sulfate confirms a sulfate. The acid is added first to remove any carbonate, which would also give a white precipitate and a false positive.</li>
  <li><strong>Halides:</strong> add dilute nitric acid, then silver nitrate solution. Chloride gives a white precipitate, bromide gives cream, and iodide gives yellow. The acid removes carbonate for the same reason as above, so a white precipitate here really is silver chloride rather than a mixture of silver chloride and carbonate.</li>
</ul>
<p>To tell the halides apart with certainty, add ammonia solution: silver chloride dissolves in dilute ammonia, silver bromide only in concentrated ammonia, and silver iodide does not dissolve at all. That single extra step is often the difference between a 2-mark and a 3-mark answer.</p>

<h3>11. Putting the tests together — identifying an unknown</h3>
<p>Most exam questions give an unknown solid and a list of results, and the answer is built from them in order. Work through the observations systematically:</p>
<ol>
  <li>Colour of the solid or solution — a blue solution suggests Cu²⁺, pale green Fe²⁺, yellow or brown Fe³⁺. A colourless solution rules those out but not much else.</li>
  <li>Flame test — identifies Li⁺, Na⁺, K⁺, Ca²⁺ or Cu²⁺ even in a mixture.</li>
  <li>Hydroxide precipitate — confirms the cation and gives information the flame test cannot, especially for Al³⁺, Zn²⁺, Mg²⁺ and Fe²⁺, which have no useful flame colour.</li>
  <li>Carbonate test with acid — decides whether the anion might be a carbonate before anything else is added.</li>
  <li>Sulfate and halide tests — with the acid first in each case, so the result is not confused by a carbonate.</li>
</ol>
<p>The one modern addition in the spec is <strong>instrumental analysis</strong>, and flame emission spectroscopy is the example to know. The sample is heated in a flame and the light emitted is passed through a spectrometer, which separates it into wavelengths. Each metal ion emits a characteristic set of wavelengths, so the ion can be identified from the pattern, and the intensity of the light gives the concentration.</p>
<p>Compared with the tests above, instrumental methods are more sensitive (they detect amounts far too small to see), faster, and more accurate, and they can analyse a mixture without separating it or even without a trained eye reading a colour. The cost is the equipment, which is why a school laboratory still uses a wire and a flame.</p>

<h3>12. Worked examples — identification</h3>
<p><strong>Example 1.</strong> A white solid dissolves in water to give a colourless solution. Adding sodium hydroxide gives a white precipitate that does not dissolve in excess. Adding dilute nitric acid then silver nitrate gives a white precipitate that dissolves in dilute ammonia. Identify the solid.</p>
<p>A white precipitate with sodium hydroxide that is insoluble in excess is calcium or magnesium; the flame test would separate them, but with no flame colour reported, the anion decides the identity. The white precipitate with silver nitrate that dissolves in dilute ammonia is silver chloride, so the anion is Cl⁻. A compound of Ca²⁺ (the more common of the two in this test) with Cl⁻ gives calcium chloride, CaCl₂.</p>
<p><strong>Example 2.</strong> Three unlabelled solutions contain copper(II) sulfate, iron(II) sulfate and iron(III) sulfate. Describe one test that identifies all three.</p>
<p>Add sodium hydroxide solution to each. Copper(II) gives a blue precipitate, iron(II) gives a green precipitate that turns brown on standing, and iron(III) gives a red-brown precipitate immediately. One reagent, three colours, and the precipitates are all insoluble in excess, so the excess step is not needed here.</p>
<p><strong>Example 3.</strong> A fertiliser is suspected of containing ammonium sulfate. Explain why the sulfate test must come after the carbonate test.</p>
<p>If a carbonate were present, adding barium chloride would give a white precipitate of barium carbonate, which looks exactly like barium sulfate; adding dilute acid first destroys any carbonate, so a white precipitate afterwards can only be barium sulfate. The carbonate test is not optional housekeeping: it is what makes the sulfate result mean something.</p>

<h3>13. Exam-style questions</h3>
<ol>
  <li>State what is meant by a pure substance in chemistry, and explain why a sample that melts over a range of 8 °C is not pure. <em>Answer:</em> a pure substance is a single element or compound with nothing else mixed in; a pure substance melts at one fixed temperature, so a range of 8 °C shows an impurity is present, which lowers the melting point and spreads it over a range.</li>
  <li>Describe how paper chromatography can show that a green ink contains three dyes. <em>Answer:</em> place a spot of the ink on a pencil line near the bottom of the paper, stand the paper in a solvent with the solvent level below the spot, and let the solvent rise; the dyes travel at different speeds according to their attraction to the paper and the solvent, so three spots appear at different heights, and each can be identified by comparing its Rf value with those of known dyes run on the same paper.</li>
  <li>Give the test and the observation for carbon dioxide, and write the equation for the reaction involved. <em>Answer:</em> bubble the gas through limewater; it turns milky. CO₂ + Ca(OH)₂ → CaCO₃ + H₂O, and the white calcium carbonate is what makes it cloudy.</li>
  <li>A solution gives a white precipitate with sodium hydroxide that dissolves in excess, and no precipitate with silver nitrate. Identify the two ions that could be present and explain how to distinguish them. <em>Answer:</em> Al³⁺ or Zn²⁺, since both give a white hydroxide that is amphoteric; add ammonia solution instead, because zinc hydroxide dissolves in excess ammonia and aluminium hydroxide does not.</li>
  <li>Explain why the wire used in a flame test must be cleaned between samples. <em>Answer:</em> a trace of the previous sample would remain on the wire and give its flame colour, so the observed colour might belong to the contaminant rather than to the substance being tested.</li>
  <li>State two advantages of flame emission spectroscopy over a flame test. <em>Answer:</em> it is more sensitive, so it detects ions at concentrations too low for a visible colour; and it is more accurate and can measure concentration as well as identify the ion, whereas a flame test only gives a colour.</li>
  <li>A white solid fizzes with dilute hydrochloric acid and the gas turns limewater milky. Identify the anion and write the ionic equation for the reaction with acid. <em>Answer:</em> carbonate, CO₃²⁻; CO₃²⁻ + 2H⁺ → CO₂ + H₂O. The fizzing and the milky limewater together are the evidence, since neither observation on its own is conclusive.</li>
</ol>

<h3>14. Common mistakes</h3>
<ul>
  <li>Using the wrong litmus for a gas. Chlorine bleaches damp litmus paper; ammonia turns damp red litmus blue.</li>
  <li>Giving a test without its observation. "Bubble through limewater" scores nothing until you add "and it turns milky".</li>
  <li>Mixing the halide colours. Chloride is white, bromide cream, iodide yellow — not the other way round.</li>
  <li>Adding silver nitrate before the acid. Without the acid first, a carbonate produces a white precipitate and looks like a chloride.</li>
  <li>Forgetting the excess step in a hydroxide precipitate test, which is the only way to separate aluminium and zinc from calcium and magnesium.</li>
  <li>Measuring Rf from the bottom edge of the paper rather than from the pencil line, or to the top of the spot rather than its centre. Both give a value that is wrong and sometimes greater than 1.</li>
  <li>Saying a substance is pure because it looks uniform. Brass is uniform and is a mixture.</li>
  <li>Claiming an impurity raises the melting point. It lowers it, and raises the boiling point.</li>
</ul>

<h3>15. Exam technique for this topic</h3>
<ul>
  <li>Write tests as a pair: reagent, then observation, then conclusion. Three short sentences score three marks; "it goes cloudy" alone scores one.</li>
  <li>Give colours precisely, with the standard words: blue, green, red-brown, cream, yellow, lilac, crimson, orange-red. "Dark" or "light" is not a colour in a mark scheme.</li>
  <li>When the question says "excess", it is asking about the extra observation, not about the amount. Say whether the precipitate dissolves.</li>
  <li>In an Rf calculation, show the fraction with the words in place before substituting the numbers, and check the answer is below 1.</li>
  <li>If the data identify two possible ions, say how to tell them apart rather than guessing. A named second test is a mark; a guess is not.</li>
  <li>For "state one advantage of an instrumental method", the safe answers are sensitivity, speed, accuracy and the ability to work with very small samples.</li>
</ul>
$lit$, 'notes'
from t
where not exists (select 1 from upd);
