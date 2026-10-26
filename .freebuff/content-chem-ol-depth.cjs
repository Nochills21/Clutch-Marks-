// Chemistry OL batch 1: written directly from the official Cambridge IGCSE
// Chemistry 0620 (2026-2028) subject content list. Topic 3 Stoichiometry
// (3.1 Formulae, 3.2 Relative masses, 3.3 The mole and the Avogadro constant)
// and Topic 2 Atoms, elements and compounds (2.1-2.7). Every calculation is
// shown line by line. Apply with:
//   node .freebuff/deepen-materials.cjs .freebuff/content-chem-ol-depth.cjs > .freebuff-tmp/chem-ol-depth-1.sql
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/chem-ol-depth-1.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/chem-ol-depth-1.sql --apply    (live)
//   node .freebuff/gate-notes-depth.cjs chemistry OL
module.exports = {
  expectType: "notes",
  titles: {
    "c4a7ce8f-cac3-4f54-8f86-4d39ff558975": "IGCSE Chemistry: Stoichiometry and the Mole",
    "b382314b-f96f-407e-9ed7-5acf1fbbca63": "IGCSE Chemistry: Atoms, Elements and Compounds",
  },
  rows: {
    "c4a7ce8f-cac3-4f54-8f86-4d39ff558975": `
<h2>IGCSE Chemistry: Stoichiometry and the Mole</h2>
<p>Cambridge IGCSE Chemistry 0620 (2026–2028), Extended route, Topic 3 Stoichiometry: statement 3.1 Formulae, 3.2 Relative masses of atoms and molecules, and 3.3 The mole and the Avogadro constant. Stoichiometry is the accounting of chemistry — it answers "how much?" for every reaction — and it is the single highest-yield calculation topic on Paper 4. Every calculation below is expanded one line at a time with no skipped arithmetic, and each method is stated as a repeatable recipe before the numbers, because the marks sit in the working.</p>

<h3>What a chemical formula tells you</h3>
<p>Think of a formula as a recipe for one particle of a substance. H₂O says: every molecule of water contains exactly two hydrogen atoms and one oxygen atom. The small numbers are <strong>subscripts</strong> — they count atoms inside the particle, and changing them changes the substance entirely (H₂O is water; H₂O₂ is hydrogen peroxide).</p>
<ul>
<li><strong>Empirical formula</strong>: the simplest whole-number ratio of atoms in a compound. For glucose (C₆H₁₂O₆) the empirical formula is CH₂O — the ratio 6:12:6 divided by 6.</li>
<li><strong>Molecular formula</strong>: the actual number of each atom in one molecule (C₆H₁₂O₆).</li>
<li><strong>Formula of ionic compounds</strong>: the ratio that makes the charges balance. Ca²⁺ and Cl⁻ combine as CaCl₂ because one 2+ ion needs two 1− ions for neutrality.</li>
</ul>
<p>State symbols appear on every equation and carry a mark: (s) solid, (l) liquid, (g) gas, (aq) aqueous (dissolved in water).</p>

<h3>Equations: balancing and the conservation of mass</h3>
<p>Atoms are never created or destroyed in a chemical reaction — mass is conserved. Balancing an equation is simply making the atom count of each element equal on both sides. The master method:</p>
<pre><code>Balance: Al + O2 -> Al2O3   (no state symbols until balanced)

1. List the elements and count each side:
     left:  Al 1, O 2      right: Al 2, O 3
2. Pick the element that appears in the most complex formula and balance it
   first - here Al: put 2 in front of Al:
     2Al + O2 -> Al2O3      left: Al 2, O 2   right: Al 2, O 3
3. Balance O. Left has 2, right has 3. The lowest number both divide into
   is 6 - so aim for 6 O on each side:
     O2 needs 3 molecules (3 x 2 = 6); Al2O3 needs 2 formula units
     (2 x 3 = 6):
     2Al + 3O2 -> 2Al2O3
4. Re-count Al: right now has 4 (2 x 2). Fix the left:
     4Al + 3O2 -> 2Al2O3
5. Final check, every element:
     Al 4 = 4 ✓    O 6 = 6 ✓
6. Add state symbols from the facts you know:
     4Al(s) + 3O2(g) -> 2Al2O3(s)

Rules that never fail: only change the BIG numbers in front (never the
subscripts), never invent atoms, and always re-count at the end.</code></pre>

<h3>Relative atomic mass and relative formula mass</h3>
<p>You cannot weigh individual atoms, so chemistry compares masses against a standard: one-twelfth the mass of a carbon-12 atom. The <strong>relative atomic mass (Aᵣ)</strong> is the weighted average mass of an element's atoms on that scale. The <strong>relative molecular mass (Mᵣ)</strong> (or relative formula mass for ionic compounds) is the sum of the Aᵣ values in the formula.</p>
<pre><code>Worked: find the Mᵣ of calcium carbonate, CaCO₃.

  Aᵣ values from the Periodic Table: Ca = 40, C = 12, O = 16
  Mᵣ = 40 + 12 + (3 x 16)
     = 40 + 12 + 48
     = 100

Note the parenthesis: the subscript 3 multiplies ONLY the oxygen.
A common error is 40 + 12 + 16 = 68 - one mark lost to a bracket.

Mᵣ of sulfuric acid, H₂SO₄:
  Mᵣ = (2 x 1) + 32 + (4 x 16)
     = 2 + 32 + 64
     = 98</code></pre>

<h3>The mole and the Avogadro constant</h3>
<p>A mole is the chemist's counting unit, like "a dozen" — but sized for atoms. <strong>One mole of any substance contains 6.02 × 10²³ particles</strong> (the Avogadro constant, L). The practical magic: one mole of any substance has a mass in grams equal to its Mᵣ, which turns unweighable atoms into weighable quantities.</p>
<pre><code>The mole triangle - the three relationships and how to rearrange them:

        mass (g)
        /      \\
       /        \\
    moles x Mᵣ = mass        moles = mass / Mᵣ     Mᵣ = mass / moles

  particles = moles x 6.02 x 10²³

Worked: how many molecules are in 4.4 g of carbon dioxide, CO₂?

Step 1 - Mᵣ of CO₂ = 12 + (2 x 16) = 44
Step 2 - moles = mass / Mᵣ = 4.4 / 44 = 0.1 mol
Step 3 - molecules = 0.1 x 6.02 x 10²³ = 6.02 x 10²² molecules
Step 4 (if asked for ATOMS): each CO₂ has 3 atoms, so
        atoms = 6.02 x 10²² x 3 = 1.806 x 10²³ atoms

"Particles" can mean atoms, molecules or ions - read the question's word.</code></pre>

<table border="1" cellpadding="6">
<tr><th>Question asks for</th><th>Working line</th><th>Worked number</th></tr>
<tr><td>Moles from mass</td><td>moles = mass ÷ Mᵣ</td><td>25 g CaCO₃ → 25 ÷ 100 = 0.25 mol</td></tr>
<tr><td>Mass from moles</td><td>mass = moles × Mᵣ</td><td>0.25 mol CO₂ → 0.25 × 44 = 11 g</td></tr>
<tr><td>Particles from moles</td><td>particles = moles × 6.02 × 10²³</td><td>0.25 mol → 1.505 × 10²³ molecules</td></tr>
<tr><td>Gas volume at r.t.p.</td><td>volume = moles × 24 dm³</td><td>0.25 mol → 6 dm³</td></tr>
<tr><td>Solution moles</td><td>moles = c (mol/dm³) × V (dm³)</td><td>0.1 × 0.025 = 0.0025 mol</td></tr>
<tr><td>Concentration</td><td>c = moles ÷ V (dm³)</td><td>0.004 mol in 25 cm³ → 0.16 mol/dm³</td></tr>
</table>

<h3>Reacting masses</h3>
<p>The balanced equation is a recipe in moles: 2H₂ + O₂ → 2H₂O says 2 moles of hydrogen react with 1 mole of oxygen to make 2 moles of water. Master method for every reacting-mass question: balance the equation → convert given mass to moles → use the equation's ratio → convert back to mass.</p>
<pre><code>Worked: what mass of water forms when 10 g of hydrogen burns in 100 g of
oxygen? And which reactant limits the yield?

Step 1 - balance:  2H₂ + O₂ -> 2H₂O
Step 2 - moles of each reactant:
   H₂:  Mᵣ = 2   ->  moles = 10 / 2  = 5 mol
   O₂:  Mᵣ = 32  ->  moles = 100 / 32 = 3.125 mol
Step 3 - the ratio needed is 2 : 1.
   5 mol H₂ would need 5 / 2 = 2.5 mol O₂.
   We have 3.125 mol O₂ - MORE than needed, so O₂ is in excess and
   H₂ is the LIMITING reactant. All calculations use the limiting one.
Step 4 - moles of water from the limiting reactant:
   ratio H₂ : H₂O = 2 : 2 = 1 : 1  ->  water = 5 mol
Step 5 - mass of water:
   Mᵣ(H₂O) = 18  ->  mass = 5 x 18 = 90 g

Sanity check: 10 + 100 = 110 g in; 90 g water + 10 g unreacted O₂ out
(3.125 - 2.5 = 0.625 mol O₂ left = 0.625 x 32 = 20 g... 
wait - recompute: 100 - 80 = 20 g O₂ left, and 90 + 20 = 110 g ✓)</code></pre>
<p><strong>Percentage yield</strong> = (actual mass ÷ theoretical mass) × 100. If the reaction above actually gave 72 g of water: percentage yield = 72 ÷ 90 × 100 = 80%. <strong>Percentage purity</strong> = (mass of pure product ÷ mass of impure sample) × 100 — a different question, and mixing the two up is a classic lost mark.</p>

<h3>Gas volumes</h3>
<p>At room temperature and pressure (r.t.p.), <strong>one mole of any gas occupies 24 dm³</strong> (24 000 cm³). This connects gas volumes straight to moles.</p>
<pre><code>Worked: what volume of carbon dioxide forms when 25 g of calcium carbonate
decomposes?  CaCO₃ -> CaO + CO₂

Step 1 - balance (already 1:1:1)
Step 2 - moles CaCO₃ = 25 / 100 = 0.25 mol
Step 3 - ratio 1 : 1  ->  CO₂ = 0.25 mol
Step 4 - volume = moles x 24 = 0.25 x 24 = 6 dm³
        (in cm³: 6 x 1000 = 6000 cm³)

The reverse works identically: 480 cm³ of gas = 0.48 dm³
-> moles = 0.48 / 24 = 0.02 mol.</code></pre>

<h3>Solutions, concentration and titration</h3>
<p><strong>Concentration</strong> says how much solute sits in a given volume of solution, in g/dm³ or mol/dm³. The working equations: moles = concentration (mol/dm³) × volume (dm³), and cm³ ÷ 1000 = dm³.</p>
<pre><code>Titration worked in full: 25.0 cm³ of sodium hydroxide solution is neutralised
by 20.0 cm³ of 0.100 mol/dm³ sulfuric acid. Find the NaOH concentration.

  2NaOH + H₂SO₄ -> Na₂SO₄ + 2H₂O        [balanced first: ratio 2 : 1]

Step 1 - moles of acid used:
   volume = 20.0 cm³ = 20.0 / 1000 = 0.0200 dm³
   moles H₂SO₄ = 0.100 x 0.0200 = 0.00200 mol
Step 2 - ratio 2 : 1, so:
   moles NaOH = 0.00200 x 2 = 0.00400 mol
Step 3 - concentration of NaOH:
   volume = 25.0 cm³ = 0.0250 dm³
   conc = moles / volume = 0.00400 / 0.0250 = 0.160 mol/dm³

Three marks hide in three places: the balanced ratio (2:1), the cm³ to dm³
conversion, and the final division the right way up.</code></pre>
<p>Titrration technique itself (burette, pipette, indicator, concordant titres) is Paper 6 material — see the experimental techniques note — but the calculation above is pure Paper 4.</p>

<h3>Empirical and molecular formulae from data</h3>
<pre><code>Worked: a compound contains 40.0% carbon, 6.7% hydrogen and 53.3% oxygen
by mass. Its Mᵣ is 180. Find the empirical and molecular formulae.

Master method: assume 100 g -> divide each percentage by Aᵣ -> divide by the
smallest -> scale to whole numbers.

Step 1 - assume 100 g: C 40.0 g, H 6.7 g, O 53.3 g
Step 2 - convert to moles (Aᵣ: C 12, H 1, O 16):
   C: 40.0 / 12 = 3.33 mol
   H:  6.7 /  1 = 6.70 mol
   O: 53.3 / 16 = 3.33 mol
Step 3 - divide by the smallest (3.33):
   C: 3.33 / 3.33 = 1
   H: 6.70 / 3.33 = 2.01 ≈ 2
   O: 3.33 / 3.33 = 1
Step 4 - empirical formula = CH₂O   (empirical Mᵣ = 12 + 2 + 16 = 30)
Step 5 - molecular formula: 180 / 30 = 6, so multiply by 6
   molecular formula = C₆H₁₂O₆

Check: 6 x 12 + 12 x 1 + 6 x 16 = 72 + 12 + 96 = 180 ✓</code></pre>

<h3>Worked example: one problem using every method</h3>
<pre><code>10.0 g of magnesium reacts with hydrochloric acid:
  Mg + 2HCl -> MgCl₂ + H₂

(a) moles Mg = 10.0 / 24 = 0.4167 mol
(b) moles HCl needed = 0.4167 x 2 = 0.8333 mol
(c) if HCl is supplied as 2.00 mol/dm³, volume needed =
    0.8333 / 2.00 = 0.4167 dm³ = 416.7 cm³
(d) volume of H₂ at r.t.p. = 0.4167 x 24 = 10.0 dm³
(e) if only 8.4 dm³ of H₂ is collected, percentage yield =
    8.4 / 10.0 x 100 = 84%

One equation, five question shapes - mass, ratio, concentration, gas volume,
yield. The method never changes: moles first, ratio second, back to units.</code></pre>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Changing subscripts to "balance" an equation — that invents a different substance; only front numbers change.</li>
<li>Forgetting subscripts when calculating Mᵣ (Mᵣ of CaCO₃ is 100, not 68); bracket the multiplied terms.</li>
<li>Skipping the cm³ → dm³ conversion (divide by 1000) in concentration work — the most common single arithmetic slip on Paper 4.</li>
<li>Inverting the concentration rearrangement: moles = c × V, so c = moles ÷ V — state the triangle, don't improvise.</li>
<li>Using the excess reactant instead of the limiting one in reacting-mass questions; always compare moles ÷ coefficient first.</li>
<li>Confusing percentage yield with percentage purity — yield compares actual vs theoretical product; purity compares pure substance vs sample.</li>
<li>Dropping the ×10²³ or writing 6.02 × 10⁻²³; the Avogadro constant is positive-indexed and multiplied, not divided, for particle counts.</li>
<li>Quoting 24 dm³ without the conditions "at r.t.p."; the molar gas volume only holds there.</li>
<li>In empirical formula questions, not scaling 2.01 or 1.99 to whole numbers (2) — ratios are always whole numbers.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Paper 4, 3 marks).</strong> Calculate the relative formula mass of ammonium nitrate, NH₄NO₃. (Aᵣ: N = 14, H = 1, O = 16)</p>
<p>Answer: Mᵣ = (2 × 14) + (4 × 1) + (3 × 16) = 28 + 4 + 48 = 80.</p>
<p><strong>Question 2 (Paper 4, 4 marks).</strong> Calculate the mass of iron formed when 320 g of iron(III) oxide is reduced by carbon monoxide: Fe₂O₃ + 3CO → 2Fe + 3CO₂. (Aᵣ: Fe = 56, O = 16)</p>
<p>Answer: Mᵣ(Fe₂O₃) = (2 × 56) + (3 × 16) = 160. Moles Fe₂O₃ = 320 ÷ 160 = 2 mol. Ratio Fe₂O₃ : Fe = 1 : 2, so Fe = 4 mol. Mass Fe = 4 × 56 = 224 g.</p>
<p><strong>Question 3 (Paper 4, 5 marks).</strong> A student neutralises 25.0 cm³ of 0.200 mol/dm³ HNO₃ with Na₂CO₃ solution. Calculate the moles of acid and the mass of anhydrous Na₂CO₃ needed. (Mᵣ Na₂CO₃ = 106)</p>
<p>Answer: Moles HNO₃ = 0.200 × (25.0 ÷ 1000) = 0.200 × 0.025 = 0.00500 mol. Equation: Na₂CO₃ + 2HNO₃ → 2NaNO₃ + H₂O + CO₂, ratio 1 : 2, so moles Na₂CO₃ = 0.00500 ÷ 2 = 0.00250 mol. Mass = 0.00250 × 106 = 0.265 g.</p>
<p><strong>Question 4 (Paper 4, 3 marks).</strong> Calculate the volume at r.t.p. of 8.8 g of carbon dioxide.</p>
<p>Answer: Mᵣ(CO₂) = 44; moles = 8.8 ÷ 44 = 0.2 mol; volume = 0.2 × 24 = 4.8 dm³.</p>
<p><strong>Question 5 (Paper 4, 4 marks).</strong> An oxide of iron contains 69.9% iron by mass, the rest oxygen. Find its empirical formula. (Aᵣ: Fe = 56, O = 16)</p>
<p>Answer: Assume 100 g: Fe 69.9 g, O 30.1 g. Moles: Fe = 69.9 ÷ 56 = 1.248; O = 30.1 ÷ 16 = 1.881. Divide by the smallest (1.248): Fe 1, O 1.881 ÷ 1.248 = 1.51 ≈ 1.5. Multiply by 2 for whole numbers: Fe₂O₃. Check: (2 × 56) + (3 × 16) = 160; Fe fraction = 112 ÷ 160 = 69.9% ✓.</p>
<p><strong>Question 6 (Paper 4, 3 marks).</strong> 0.24 g of magnesium gives 240 cm³ of hydrogen at r.t.p. Calculate the percentage yield if theory predicts 288 cm³.</p>
<p>Answer: Percentage yield = (240 ÷ 288) × 100 = 83.3%.</p>
<p>With the quantitative bookkeeping in place, the next question is what these particles actually are — atomic structure and bonding.</p>
`,

    "b382314b-f96f-407e-9ed7-5acf1fbbca63": `
<h2>IGCSE Chemistry: Atoms, Elements and Compounds</h2>
<p>Cambridge IGCSE Chemistry 0620 (2026–2028), Extended route, Topic 2 Atoms, elements and compounds: statements 2.1 Elements, compounds and mixtures, 2.2 Atomic structure and the Periodic Table, 2.3 Isotopes, 2.4 Ions and ionic bonds, 2.5 Simple molecules and covalent bonds, 2.6 Giant covalent structures, and 2.7 Metallic bonding. This is the foundation everything else stands on: what atoms are made of, why they bond, and how the four bonding types dictate every physical property you will ever be asked to explain. Every electron configuration and isotope calculation is worked digit by digit.</p>

<h3>Elements, compounds and mixtures</h3>
<p>An <strong>element</strong> is one kind of atom only (iron, oxygen gas) — it cannot be broken down chemically. A <strong>compound</strong> is two or more elements chemically joined in fixed proportions, with new properties (water: hydrogen and oxygen, but nothing like either). A <strong>mixture</strong> is substances physically together, unchanged, separable by physical means. The test-paper distinction: compounds need chemical change to separate (electrolysis); mixtures separate physically (distillation, chromatography, filtration).</p>

<h3>Inside the atom</h3>
<p>Picture the atom as a sports stadium: the nucleus is a marble at the centre of the pitch, and the electrons are specks of dust whizzing around the stands. Almost all the mass sits in that tiny nucleus; almost all the volume is empty space.</p>
<table border="1" cellpadding="6">
<tr><th>Particle</th><th>Relative charge</th><th>Relative mass</th><th>Location</th></tr>
<tr><td>Proton</td><td>+1</td><td>1</td><td>Nucleus</td></tr>
<tr><td>Neutron</td><td>0</td><td>1</td><td>Nucleus</td></tr>
<tr><td>Electron</td><td>−1</td><td>1/1836 (negligible)</td><td>Electron shells around the nucleus</td></tr>
</table>
<p>Definitions the exam demands verbatim: the <strong>proton (atomic) number</strong> is the number of protons in an atom and fixes the element; the <strong>mass (nucleon) number</strong> is the total of protons plus neutrons. Atoms are neutral because protons = electrons; an <strong>ion</strong> forms when electrons are lost or gained.</p>
<pre><code>Reading the symbol notation, line by line:  ²³⁵₉₂U

  mass number (top)     = 235 = protons + neutrons
  proton number (bottom)= 92  = protons
  therefore:
    protons   = 92
    electrons = 92 (neutral atom)
    neutrons  = 235 - 92 = 143

Same arithmetic for any species:
  ⁴⁰₂₀Ca²⁺:  protons 20, neutrons 40 - 20 = 20,
             electrons 20 - 2 = 18 (the 2+ charge means 2 electrons LOST)</code></pre>

<h3>Electron arrangement, 1 to 20</h3>
<p>Electrons occupy shells that fill in a fixed order — first shell 2, second 8, third 8 (for the first twenty elements), then 2. The arrangement is written as comma-separated numbers: sodium (11 electrons) is 2,8,1.</p>
<pre><code>Building every configuration from hydrogen to calcium, step by step:

  H  1        He 2         [first shell full at 2]
  Li 2,1      Be 2,2       B 2,3        C 2,4
  N 2,5       O 2,6        F 2,7        Ne 2,8     [second shell full at 8]
  Na 2,8,1    Mg 2,8,2     Al 2,8,3     Si 2,8,4
  P 2,8,5     S 2,8,6      Cl 2,8,7     Ar 2,8,8   [third shell full at 8]
  K 2,8,8,1   Ca 2,8,8,2   [fourth shell starts after 8 in the third]

Two rules worth a mark each:
  outer-shell electron count = GROUP number  (Cl: 7 outer -> Group VII)
  number of occupied shells = PERIOD number (Cl: 3 shells -> Period 3)
A full outer shell (2 or 8) means the atom is unreactive - the noble gases.</code></pre>

<h3>Isotopes and relative atomic mass</h3>
<p><strong>Isotopes</strong> are atoms of the same element (same proton number) with different numbers of neutrons. They have identical chemical properties — chemistry lives in the electron arrangement, which isotopes share — but different masses. The relative atomic mass is the weighted average of the isotopic masses.</p>
<pre><code>Worked: chlorine exists as ³⁵Cl (75%) and ³⁷Cl (25%). Calculate its Aᵣ.

  Aᵣ = (isotope 1 mass x its fraction) + (isotope 2 mass x its fraction)
     = (35 x 0.75) + (37 x 0.25)
     = 26.25 + 9.25
     = 35.5

Percentages can be used directly with the same arithmetic:
  Aᵣ = (35 x 75 + 37 x 25) / 100 = (2625 + 925) / 100 = 35.5 ✓

If the question gives abundances as 3:1 instead of 75:25, the fractions are
3/4 = 0.75 and 1/4 = 0.25 - convert counts to fractions first.</code></pre>

<h3>Ions and ionic bonding</h3>
<p>Metals lose electrons, non-metals gain them, and the resulting oppositely charged ions attract — an <strong>ionic bond</strong> is the electrostatic attraction between cations and anions. The product is a <strong>giant ionic lattice</strong>: a regular, repeating grid of alternating ions, not individual molecules.</p>
<pre><code>Deduction of ionic formulae by charge balance - worked three times:

  Na (2,8,1) loses 1 electron -> Na⁺       Cl (2,8,7) gains 1 -> Cl⁻
    charges +1 and -1 balance 1:1  ->  NaCl

  Mg (2,8,2) loses 2 -> Mg²⁺               O (2,6) gains 2 -> O²⁻
    charges +2 and -2 balance 1:1  ->  MgO

  Ca (2,8,8,2) loses 2 -> Ca²⁺             Cl (2,8,7) gains 1 -> Cl⁻
    one 2+ needs TWO 1-  ->  CaCl₂

General rule: swap the charge NUMBERS to get the subscripts, then simplify
(Ca²⁺ and O²⁻ -> Ca₂O₂ -> CaO).</code></pre>
<p>Properties follow from structure — the reasoning chain examiners want: ionic compounds have <strong>high melting and boiling points</strong> because the strong electrostatic forces in the giant lattice take lots of energy to overcome; they <strong>conduct electricity when molten or aqueous</strong> (ions free to move) but not when solid (ions locked in place); they are often soluble in water (polar water molecules pull ions from the lattice).</p>

<h3>Covalent bonds and simple molecules</h3>
<p>A <strong>covalent bond</strong> is a shared pair of electrons holding two non-metal atoms together. Each shared pair is one bond; atoms bond until their outer shells are full. Dot-and-cross diagrams draw only the outer-shell electrons, with crosses from one atom and dots from the other.</p>
<pre><code>Dot-and-cross logic for four standard molecules (describe, then draw):

  H₂   each H brings 1 electron; one shared pair fills both 1-electron
       shells -> H-H
  H₂O  O (2,6) needs 2 electrons; each H shares 1 -> two shared pairs,
       two lone pairs on oxygen -> bent shape
  CH₄  C (2,4) needs 4; four H atoms each share 1 -> four shared pairs,
       four lone pairs total on the hydrogens -> tetrahedral
  NH₃  N (2,5) needs 3; three H atoms share -> three shared pairs and ONE
       lone pair on nitrogen -> pyramidal
  HCl  one shared pair between H and Cl (Cl keeps 3 lone pairs)

Simple molecular substances: LOW melting/boiling points - the covalent bonds
INSIDE molecules are strong, but the forces BETWEEN molecules are weak and
need little energy to break. They do not conduct: no free ions or electrons.</code></pre>
<p>The distinction students most often miss: melting a molecular substance breaks <em>intermolecular</em> forces, not covalent bonds. Breaking covalent bonds is a chemical change.</p>

<h3>Giant covalent structures</h3>
<table border="1" cellpadding="6">
<tr><th>Structure</th><th>Bonding</th><th>Properties and uses</th></tr>
<tr><td>Diamond</td><td>Each C bonded to 4 others; giant 3D lattice of strong covalent bonds</td><td>Hardest natural substance; cutting tools, drill bits — no free electrons, so does not conduct</td></tr>
<tr><td>Graphite</td><td>Each C bonded to 3 others in flat hexagonal layers; delocalised electrons between layers</td><td>Layers slide easily — lubricant; conducts electricity — electrodes; soft</td></tr>
<tr><td>Silicon(IV) oxide</td><td>Like diamond: each Si bonded to 4 O in a giant lattice</td><td>Very hard, very high melting point; similar to diamond in structure-property terms</td></tr>
</table>
<p>The property question is always the same shape: name the structure → name the strong bonds → explain why that gives the property (and where relevant why the other structure differs: graphite's weakly bonded layers slide; its delocalised electrons conduct).</p>

<h3>Metallic bonding</h3>
<p>Metal atoms pack into a giant lattice of positive ions surrounded by a "sea" of <strong>delocalised electrons</strong> — electrons detached from their atoms and free to move. The metallic bond is the attraction between the positive ions and that delocalised sea.</p>
<ul>
<li><strong>Electrical and thermal conductivity</strong>: the delocalised electrons carry charge (and energy) through the structure.</li>
<li><strong>Malleability and ductility</strong>: layers of identical ions can slide over each other without breaking the bonding — the electron sea simply re-forms around them (unlike ionic lattices, which shatter when layers shift and like charges align).</li>
<li><strong>High melting points</strong>: strong attraction throughout the giant lattice (tungsten very high; mercury low because its bonding is weaker).</li>
</ul>

<h3>Worked example: the four bonding types compared on one property set</h3>
<pre><code>Question: explain why sodium chloride melts at 801 °C, but methane melts at
-182 °C - even though both contain strong covalent/ionic interactions.

  NaCl: ionic. Giant lattice of Na⁺ and Cl⁻ held by strong electrostatic
        forces throughout. Melting means overcoming these forces everywhere
        at once -> lots of energy -> high temperature.
  Methane (CH₄): simple molecular. Strong covalent bonds INSIDE each molecule
        stay intact on melting; only the weak intermolecular forces BETWEEN
        molecules are overcome -> little energy -> very low temperature.

The structure sentence earns the mark; "because it is ionic" alone does not.
Same shape of answer: diamond vs CO₂ (giant covalent vs simple molecular),
iron vs sodium (both metallic - compare bond strength and ion size).</code></pre>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Swapping proton number and mass number in symbol notation; the bottom number is always the proton number.</li>
<li>Computing neutrons as mass number (it is mass number minus proton number).</li>
<li>Writing ion charges as counts (Ca⁺² instead of Ca²⁺) — charge goes top-right after the symbol.</li>
<li>Claiming isotopes differ chemically; only physical properties (mass-dependent behaviour like diffusion) differ.</li>
<li>Saying ionic compounds conduct when solid — only when molten or in solution, when ions can move.</li>
<li>Explaining low melting points of molecular substances by "weak covalent bonds" — the covalent bonds are strong; it is the intermolecular forces that are weak.</li>
<li>Forgetting lone pairs in dot-and-cross diagrams (ammonia's and water's lone pairs are marks).</li>
<li>Confusing graphite's conductivity (delocalised electrons within layers) with diamond's insulation (all four electrons locked in bonds).</li>
<li>Explaining malleability of metals by "layers slide" without mentioning the electron sea re-forming — the bonding must stay intact.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Paper 4, 3 marks).</strong> An atom has 16 protons, 16 neutrons and 16 electrons. State the element, its mass number, and the electron arrangement.</p>
<p>Answer: Proton number 16 is sulfur. Mass number = 16 + 16 = 32. Electron arrangement 2,8,6.</p>
<p><strong>Question 2 (Paper 4, 3 marks).</strong> Explain why isotopes of an element have the same chemical properties but different physical properties.</p>
<p>Answer: Chemical properties depend on electron arrangement (especially outer-shell electrons), and isotopes have identical electron arrangements since proton number fixes electron count. Physical properties that depend on mass — such as rate of diffusion — differ because isotopes have different numbers of neutrons and therefore different masses.</p>
<p><strong>Question 3 (Paper 4, 4 marks).</strong> Describe the bonding in magnesium oxide and explain why it has a high melting point.</p>
<p>Answer: Magnesium atoms (2,8,2) each lose two electrons to become Mg²⁺; oxygen atoms (2,6) each gain two to become O²⁻. The oppositely charged ions form a giant ionic lattice in which each ion is electrostatically attracted to all its neighbours. The strong electrostatic forces throughout the lattice require large amounts of energy to overcome, so the melting point is high (2852 °C).</p>
<p><strong>Question 4 (Paper 4, 4 marks).</strong> Explain why graphite conducts electricity but diamond does not, and why graphite is used as a lubricant.</p>
<p>Answer: In graphite each carbon bonds to three others, leaving one delocalised electron per atom free to move within the layers — these carry charge. In diamond every carbon bonds to four others with all electrons locked in bonds, so none are free. As a lubricant: graphite's layers are held only weakly and slide over each other easily while retaining bonding, reducing friction.</p>
<p><strong>Question 5 (Paper 4, 3 marks).</strong> Substance A melts at 801 °C and conducts electricity only when molten. Substance B melts at 1610 °C and never conducts. Identify each structure type and explain.</p>
<p>Answer: A is ionic (giant ionic lattice, e.g. sodium chloride): its high melting point reflects strong electrostatic forces between ions, and it conducts only when molten because the ions are then free to move while they are locked in place when solid. B is giant covalent (e.g. silicon(IV) oxide): its higher melting point reflects extensive strong covalent bonds, and it never conducts because there are no free ions or delocalised electrons in any state.</p>
<p><strong>Question 6 (Paper 4, 3 marks).</strong> Explain, in terms of structure, why metals are malleable while ionic compounds are brittle.</p>
<p>Answer: In metals, layers of identical positive ions in a sea of delocalised electrons can slide without breaking metallic bonding — the electron sea re-forms around the displaced ions. In ionic lattices, shifting a layer brings like charges next to each other; the repulsion splits the crystal — so ionic solids shatter rather than bend.</p>
<p>With the particles and their bonds understood, the next foundations are the states those particles move through and the energy changes when they react.</p>
`,
  },
};
