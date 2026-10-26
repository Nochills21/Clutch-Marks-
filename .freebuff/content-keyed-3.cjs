// Keyed-equation sheets, batch 3 of 6 — the notes that still carried formulas
// with no symbol key. Each section is APPENDED to its note (content = content || section)
// and only opens with the standard heading, so the note body is never rewritten.
//
//   node .freebuff/append-note-sections.cjs .freebuff/content-keyed-3.cjs
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/note-formulas.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/note-formulas.sql --apply    (live)
module.exports = {
  minEquations: 2,
  sections: {
    /* ── Biology OL: Biological Molecules ─────────────────────────────── */
    "904e6645-0102-427d-a120-c720073c316c": {
      slug: "biological-molecules",
      html: `
<h2>Equations and symbols</h2>
<p>The quantitative side of this topic is small but examinable: one energy calculation from a calorimeter, and the two food-energy figures that let you say why a fatty food releases more. Everything else here is a symbol-and-unit reference for the structures and quantities the questions name.</p>

<p><strong>Energy released = mass of water × specific heat capacity × temperature change</strong> <em>Key:</em> energy released = the chemical energy transferred from the burning food, in joules (J); mass of water = the mass heated in the calorimeter (g); specific heat capacity = 4.2 J g⁻¹ °C⁻¹ for water; temperature change = rise in the water's temperature (°C). Keep grams and joules together — using kilograms here is the commonest arithmetic slip.</p>

<p><strong>50 g × 4.2 J/g°C × 12 °C = 2520 J = 2.52 kJ</strong> <em>Key:</em> the numbers are the worked case in the note — 50 g of water warmed by 12 °C releases 2520 J, and 1 kJ = 1000 J, so the stored energy in that 10 g sample is 2.52 kJ. Divide by the mass of food burned to quote energy per gram, which is the figure the question then compares.</p>

<h3>The quantities and their units</h3>
<table border="1" cellpadding="6">
<tr><th>Quantity</th><th>Symbol or phrase</th><th>Unit</th></tr>
<tr><td>Energy released by a food sample</td><td>E</td><td>J, or kJ per gram</td></tr>
<tr><td>Mass of water heated</td><td>m</td><td>g</td></tr>
<tr><td>Temperature rise</td><td>ΔT</td><td>°C</td></tr>
<tr><td>Energy value of a nutrient</td><td>—</td><td>kJ g⁻¹ (lipid ≈ 38, carbohydrate ≈ 17)</td></tr>
<tr><td>Glucose formula</td><td>C₆H₁₂O₆</td><td>—</td></tr>
</table>

<h3>The bonds and the molecules, written as formulae</h3>
<ul>
<li>Condensation removes one water molecule per bond formed; hydrolysis adds one back. The bond names are examinable: glycosidic (carbohydrate), ester (lipid), peptide (protein), phosphodiester (DNA).</li>
<li>Monosaccharide C₆H₁₂O₆ → disaccharide by one glycosidic bond; a polysaccharide is many such bonds in a chain.</li>
<li>DNA base pairing: A–T with two hydrogen bonds, C–G with three. Write the dash as the bond, never as "equals", because the pair is not a formula.</li>
</ul>
`,
    },

    /* ── Biology OL: Reproduction ─────────────────────────────────────── */
    "23c105d5-9fe1-4969-8922-d242fd7aef04": {
      slug: "reproduction",
      html: `
<h2>Equations and symbols</h2>
<p>Reproduction has no algebra, so the "equations" here are the two arrows that earn sequence marks — pollination to germination, and the hormone chain that runs the menstrual cycle — plus the chromosome arithmetic. Learn the order, not the words.</p>

<p><strong>n = 23</strong> <em>Key:</em> n = the haploid chromosome number of a human gamete (23 chromosomes, no unit). Two haploid gametes fuse at fertilisation to restore the diploid number, 2n = 46 — which is why a gamete is never described as diploid.</p>

<p><strong>pollination → fertilisation → germination</strong> <em>Key:</em> pollination = transfer of pollen from anther to stigma (an event, not a fusion); fertilisation = fusion of the male gamete from the pollen tube with the egg cell in the ovule; germination = the seed taking up water, activating enzymes and growing. They are three separate events, days apart, and the marks are awarded in that order.</p>

<p><strong>intercourse → fertilisation → implantation</strong> <em>Key:</em> fertilisation happens in the oviduct, usually within a day of ovulation; implantation is the blastocyst embedding in the endometrium about a week later. Naming the oviduct as the site of fertilisation and the uterus as the site of implantation is a mark on its own.</p>

<p><strong>FSH → follicle/oestrogen → LH surge → ovulation → progesterone → lining maintained</strong> <em>Key:</em> FSH from the pituitary matures a follicle; the follicle secretes oestrogen, which rebuilds the endometrium; oestrogen triggers the LH surge; LH causes ovulation around day 14; the corpus luteum then secretes progesterone, which maintains the lining and inhibits FSH. No fertilisation means the corpus luteum degenerates, both hormones fall, and menstruation follows — the chain read backwards.</p>

<h3>The hormones and their targets</h3>
<table border="1" cellpadding="6">
<tr><th>Hormone</th><th>Source</th><th>Effect</th></tr>
<tr><td>FSH</td><td>Pituitary gland</td><td>Matures a follicle and its egg</td></tr>
<tr><td>Oestrogen</td><td>Ovary (follicle)</td><td>Rebuilds the endometrium; triggers the LH surge</td></tr>
<tr><td>LH</td><td>Pituitary gland</td><td>Ovulation, about day 14</td></tr>
<tr><td>Progesterone</td><td>Corpus luteum</td><td>Maintains the endometrium; inhibits FSH</td></tr>
<tr><td>Oxytocin</td><td>Pituitary (posterior)</td><td>Uterine contractions in labour, amplified by positive feedback</td></tr>
</table>

<h3>Where the sequence marks are lost</h3>
<ul>
<li>Writing "the pollen fertilises the stigma" — pollen lands, a tube grows, gametes fuse. Transfer and fusion are different events.</li>
<li>Putting the LH surge before the oestrogen rise, or progesterone before ovulation.</li>
<li>Saying the placenta blocks all harmful substances; alcohol, HIV and several drugs cross it.</li>
</ul>
`,
    },

    /* ── Biology AS: Cell Structure, Reproduction and Development ─────── */
    "254175d8-d3d0-46bb-81a7-465f573dc717": {
      slug: "cell-structure-reproduction-and-development",
      html: `
<h2>Equations and symbols</h2>
<p>Four calculations carry the marks in this topic: real size from a micrograph, total magnification, the mitotic index, and the chromosome arithmetic of meiosis. Each is one line of arithmetic, and each loses marks for a unit that was never converted.</p>

<p><strong>actual size = image size ÷ magnification</strong> <em>Key:</em> actual size = the real length of the structure (µm); image size = the measured length on the micrograph, in the same unit (µm); magnification = the stated magnification (×, no unit). Convert millimetres and centimetres to micrometres before dividing: 1 mm = 1000 µm, 1 cm = 10 000 µm.</p>

<p><strong>4.2 cm = 42 000 µm</strong> <em>Key:</em> the conversion line that must be written before the division — 4.2 cm × 10 000 = 42 000 µm. Examiners award this step separately, so writing it out protects the mark even if the division slips.</p>

<p><strong>42 000 ÷ 20 000 = 2.1 µm</strong> <em>Key:</em> 42 000 µm = image size of the mitochondrion; 20 000 = magnification; 2.1 µm = actual length. The same arithmetic with 7 000 gives 42 000 / 7 000 = 6 micrometres for a nucleus.</p>

<p><strong>mitotic index = number of cells undergoing mitosis ÷ total number of cells in the field of view</strong> <em>Key:</em> mitotic index = the proportion of dividing cells (a fraction or a percentage, no unit); the numerator counts only cells with visibly separated chromosomes; the denominator counts every cell in the field, including all the interphase cells. Leaving interphase out of the total is the classic error.</p>

<p><strong>12 / 80 = 0.15</strong> <em>Key:</em> 12 = cells showing visible chromosomes; 80 = all cells in the field; 0.15 = mitotic index, i.e. 15 per cent dividing. A high value is expected in a root tip because the meristem is actively growing.</p>

<h3>The symbols of this topic</h3>
<table border="1" cellpadding="6">
<tr><th>Term</th><th>Meaning</th><th>Value or unit</th></tr>
<tr><td>n</td><td>haploid chromosome number</td><td>23 in humans (no unit)</td></tr>
<tr><td>2n</td><td>diploid chromosome number</td><td>46 in humans</td></tr>
<tr><td>A, T, C, G</td><td>DNA bases</td><td>pair A–T, C–G</td></tr>
<tr><td>70S, 80S</td><td>ribosome size</td><td>prokaryote, eukaryote</td></tr>
<tr><td>×</td><td>magnification</td><td>eyepiece × objective</td></tr>
</table>

<h3>Traps specific to the arithmetic</h3>
<ul>
<li>Dividing by the magnification when the question asks for the image size — the same formula rearranged, so read which quantity is unknown.</li>
<li>Leaving the answer in centimetres after converting only one side of the division.</li>
<li>Counting a cell in anaphase twice because the chromosomes have separated: it is one cell until cytokinesis.</li>
</ul>
`,
    },

    /* ── Chemistry OL: Atoms, Elements and Compounds ──────────────────── */
    "b382314b-f96f-407e-9ed7-5acf1fbbca63": {
      slug: "atoms-elements-and-compounds",
      html: `
<h2>Equations and symbols</h2>
<p>Every calculation in this topic is one of three: particles from a symbol, relative atomic mass from isotopic abundances, or a formula from charge balance. The arithmetic is short; the marks are for the labels on each line.</p>

<p><strong>mass number (top) = 235 = protons + neutrons</strong> <em>Key:</em> mass number (nucleon number) = the total of protons and neutrons, written top-left of the symbol (no unit); 235 is the value for ²³⁵₉₂U.</p>

<p><strong>proton number (bottom) = 92 = protons</strong> <em>Key:</em> proton (atomic) number = the number of protons, written bottom-left; it fixes the element, so 92 is uranium. A neutral atom has electrons equal to this number.</p>

<p><strong>neutrons = 235 - 92 = 143</strong> <em>Key:</em> neutrons = mass number minus proton number (no unit). For an ion, adjust only the electrons: ⁴⁰₂₀Ca²⁺ has 20 protons, 20 neutrons and 20 − 2 = 18 electrons.</p>

<p><strong>Aᵣ = (isotope 1 mass x its fraction) + (isotope 2 mass x its fraction)</strong> <em>Key:</em> Aᵣ = relative atomic mass of the element (no unit, it is a weighted average); isotope mass = the mass number of each isotope; fraction = its abundance as a decimal or percentage of the total. Chlorine's 35 and 37 at 75 per cent and 25 per cent give 35.5.</p>

<p><strong>Aᵣ = (35 × 75 + 37 × 25) / 100 = (2625 + 925) / 100 = 35.5</strong> <em>Key:</em> the percentage form of the same line — the numerator is each mass times its percentage, the denominator is 100 because the percentages total 100. If abundances are given as a ratio such as 3:1, convert to fractions (0.75 and 0.25) first.</p>

<p><strong>outer-shell electron count = GROUP number</strong> <em>Key:</em> the number of electrons in the outermost shell equals the group number of the element (chlorine, 2,8,7, is Group VII); a full outer shell of 2 or 8 is the noble-gas configuration and means the atom is unreactive. The number of occupied shells equals the period number.</p>

<h3>Charge balance into a formula</h3>
<table border="1" cellpadding="6">
<tr><th>Cation</th><th>Anion</th><th>Balance</th><th>Formula</th></tr>
<tr><td>Na⁺</td><td>Cl⁻</td><td>+1 and −1</td><td>NaCl</td></tr>
<tr><td>Mg²⁺</td><td>O²⁻</td><td>+2 and −2</td><td>MgO</td></tr>
<tr><td>Ca²⁺</td><td>Cl⁻</td><td>one 2+ needs two 1−</td><td>CaCl₂</td></tr>
<tr><td>Al³⁺</td><td>O²⁻</td><td>swap the numbers, then simplify</td><td>Al₂O₃</td></tr>
</table>

<h3>Traps specific to the arithmetic</h3>
<ul>
<li>Reading neutrons as the mass number, or the proton number as the top number.</li>
<li>Changing the proton number when an atom becomes an ion — only electrons move.</li>
<li>Averaging isotope masses without weighting: (35 + 37)/2 = 36 is the common wrong answer for chlorine.</li>
<li>Writing a charge as Ca⁺² — the number precedes the sign.</li>
</ul>
`,
    },

    /* ── Chemistry OL: Chemistry of the Environment ───────────────────── */
    "e51a576e-ebcb-4404-8ae8-7aa018b616b7": {
      slug: "chemistry-of-the-environment",
      html: `
<h2>Equations and symbols</h2>
<p>This topic is examined almost entirely through equations: the Haber–Bosch pair that makes fertiliser, the combustion and catalytic-converter reactions behind air quality, and the acid-rain and flue-gas scrubbing chain. State symbols and conditions are part of the mark.</p>

<p><strong>N₂ + 3H₂ ⇌ 2NH₃</strong> <em>Key:</em> the Haber–Bosch equilibrium — N₂ = nitrogen from air, H₂ = hydrogen from natural gas, NH₃ = ammonia; the ⇌ shows the reaction is reversible, and the industrial conditions are about 450 °C, 200 atm and an iron catalyst. Ammonia is the nitrogen source for fertiliser.</p>

<p><strong>NH₃ + HNO₃ → NH₄NO₃</strong> <em>Key:</em> NH₃ = ammonia; HNO₃ = nitric acid; NH₄NO₃ = ammonium nitrate, the soluble nitrogen fertiliser. The arrow (not ⇌) marks the neutralisation step, which goes to completion.</p>

<p><strong>2CO + 2NO → 2CO₂ + N₂</strong> <em>Key:</em> the catalytic-converter reaction — CO = carbon monoxide from incomplete combustion; NO = nitrogen monoxide from high-temperature combustion; CO₂ = carbon dioxide; N₂ = nitrogen. Both pollutants are converted to less harmful gases on a platinum/palladium/rhodium honeycomb.</p>

<p><strong>N₂ + O₂ → 2NO</strong> <em>Key:</em> how NO forms inside an engine — the heat of combustion is enough to break the strong N≡N and O=O bonds, so atmospheric nitrogen and oxygen combine. It then oxidises further: 2NO + O₂ → 2NO₂, giving the brown gas that dissolves to nitric acid.</p>

<p><strong>6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂</strong> <em>Key:</em> photosynthesis, the natural sink for the carbon dioxide that combustion releases — 6 molecules of carbon dioxide and 6 of water give one glucose molecule and 6 of oxygen, in light and with chlorophyll. It is the balance that fossil-fuel burning breaks.</p>

<p><strong>CaCO₃ → CaO + CO₂</strong> <em>Key:</em> the calcination step of flue-gas desulfurisation — CaCO₃ = calcium carbonate (limestone); CaO = calcium oxide (quicklime); CO₂ released here is the cost of the method. The quicklime then removes sulfur dioxide: CaO + SO₂ → CaSO₃, oxidised further to CaSO₄ (gypsum, sold for plasterboard).</p>

<h3>The pollutants, in the form to memorise</h3>
<table border="1" cellpadding="6">
<tr><th>Pollutant</th><th>Formed by</th><th>Harm</th></tr>
<tr><td>CO</td><td>Incomplete combustion</td><td>Binds haemoglobin, so blood carries less oxygen</td></tr>
<tr><td>SO₂</td><td>S + O₂ → SO₂ from sulfur in fuel</td><td>Acid rain: SO₂ + H₂O → H₂SO₃, oxidised to H₂SO₄</td></tr>
<tr><td>NO, NO₂</td><td>N₂ + O₂ → 2NO at engine temperature</td><td>Acid rain and photochemical smog</td></tr>
<tr><td>CO₂</td><td>Complete combustion of any carbon fuel</td><td>Enhanced greenhouse effect</td></tr>
<tr><td>Particulates</td><td>Incomplete combustion, diesel</td><td>Respiratory disease</td></tr>
</table>

<h3>Traps specific to the equations</h3>
<ul>
<li>Writing the Haber process with a one-way arrow, which loses the reversibility mark.</li>
<li>Balancing the catalytic converter with one CO: it is 2CO + 2NO → 2CO₂ + N₂, because each NO supplies one oxygen and one nitrogen needs two NO.</li>
<li>Quoting acid rain as "sulfuric acid from SO₂" without the water and oxidation steps.</li>
<li>Saying chlorination removes impurities — it kills microbes; sedimentation and filtration remove solids.</li>
</ul>
`,
    },

    /* ── Chemistry AS: Introductory Organic Chemistry and Alkanes ─────── */
    "71c55ef2-c940-4622-9f26-8a46aa507130": {
      slug: "introductory-organic-chemistry-and-alkanes",
      html: `
<h2>Equations and symbols</h2>
<p>Organic equations here fall into three groups: the cracking and reforming lines that turn long chains into useful ones, the combustion lines whose products decide which pollutant is discussed, and the free-radical chain for chlorination. The dots matter — a radical is not an ion.</p>

<p><strong>C10H22 → C8H18 + C2H4</strong> <em>Key:</em> catalytic or thermal cracking — C10H22 = the long alkane feedstock; C8H18 = the shorter, more useful alkane; C2H4 = ethene, the alkene by-product. One long molecule becomes a shorter alkane plus an alkene, which is why demand for petrol is met without waste.</p>

<p><strong>C6H14 → cyclo-C6H12 + H2</strong> <em>Key:</em> reforming — C6H14 = hexane, a straight chain; cyclo-C6H12 = a cycloalkane with the same carbon count; H2 = hydrogen removed. The carbon skeleton changes shape without changing the number of carbon atoms, and branched or cyclic products resist knocking in petrol.</p>

<p><strong>C3H8 + 5O2 → 3CO2 + 4H2O</strong> <em>Key:</em> complete combustion — C3H8 = propane; the coefficients balance carbon (3), then hydrogen (8, so 4 H₂O), then oxygen (6 + 4 = 10, so 5 O₂). Complete combustion gives carbon dioxide and water only; insufficient oxygen gives CO and soot instead.</p>

<p><strong>CH4 + Cl2 → CH3Cl + HCl</strong> <em>Key:</em> free-radical substitution — CH₄ = methane; Cl₂ = chlorine, split by ultraviolet light; CH₃Cl = chloromethane; HCl = hydrogen chloride. The reaction needs UV, and it continues past the first product, so a mixture forms.</p>

<p><strong>Cl2 → 2Cl·</strong> <em>Key:</em> initiation — one chlorine molecule splits homolytically under ultraviolet light to give two chlorine radicals; the dot marks the unpaired electron. Writing Cl⁺ and Cl⁻ here is a chemistry error, not a notation choice.</p>

<p><strong>Cl· + CH4 → CH3· + HCl</strong> <em>Key:</em> the first propagation step — a chlorine radical removes a hydrogen atom, producing hydrogen chloride and a methyl radical. One radical is used and one created, which is what makes the chain self-sustaining.</p>

<p><strong>CH3· + Cl2 → CH3Cl + Cl·</strong> <em>Key:</em> the second propagation step — the methyl radical takes a chlorine atom and regenerates a chlorine radical, closing the cycle. The two propagation steps together consume one CH₄ and one Cl₂ and return the radical unchanged.</p>

<p><strong>CH3· + CH3· → C2H6</strong> <em>Key:</em> a termination step — two methyl radicals pair to give ethane. This is why ethane appears among the products of methane chlorination even though no equation asks for it, and it is the observation that proves the mechanism is a radical chain.</p>

<h3>The formula language of the topic</h3>
<table border="1" cellpadding="6">
<tr><th>Family</th><th>General formula</th><th>Functional group</th></tr>
<tr><td>Alkane</td><td>CₙH₂ₙ₊₂</td><td>single C–C and C–H bonds only</td></tr>
<tr><td>Cycloalkane</td><td>CₙH₂ₙ</td><td>ring of C–C single bonds</td></tr>
<tr><td>Alkene</td><td>CₙH₂ₙ</td><td>C=C double bond</td></tr>
<tr><td>Halogenoalkane</td><td>CₙH₂ₙ₊₁X</td><td>C–X, where X = Cl, Br or I</td></tr>
<tr><td>Alcohol</td><td>CₙH₂ₙ₊₁OH</td><td>–OH</td></tr>
</table>

<h3>Traps specific to the equations</h3>
<ul>
<li>Writing a radical with a charge, or omitting the dot — both lose the mechanism marks.</li>
<li>Showing initiation as heterolytic fission, which would give ions instead of radicals.</li>
<li>Writing chlorination as an addition reaction; methane is saturated, so it substitutes.</li>
<li>Choosing the chain end by the substituent's number while ignoring the principal functional group.</li>
</ul>
`,
    },

    /* ── Chemistry A2: Kinetics ───────────────────────────────────────── */
    "ef86c7de-059c-4e33-877c-4547ccb0e5e0": {
      slug: "kinetics",
      html: `
<h2>Equations and symbols</h2>
<p>Kinetics is a topic you cannot answer in words: the order, the rate constant and the activation energy are all numbers derived from one of these expressions. Note what each symbol's unit is, because half the marks in a rate-constant question are the units.</p>

<p><strong>rate = k[A]m[B]n</strong> <em>Key:</em> rate = the change in concentration per unit time (mol dm⁻³ s⁻¹); k = the rate constant, fixed at a given temperature (units depend on the overall order); [A], [B] = concentrations of the reactants (mol dm⁻³); m, n = the orders with respect to each, each 0, 1 or 2 and found experimentally — never from the balanced equation.</p>

<p><strong>k = A e^(−Ea / RT)</strong> <em>Key:</em> k = rate constant; A = the pre-exponential factor, the frequency of collisions with the right orientation (same units as k); Ea = activation energy (J mol⁻¹); R = the gas constant, 8.31 J mol⁻¹ K⁻¹; T = temperature in kelvin. Ea and R must be in joules — mixing kJ into this line is the standard error.</p>

<p><strong>ln k = (−Ea / R) × (1 / T) + ln A</strong> <em>Key:</em> the logarithmic form, which is the equation of a straight line: plot ln k on the y-axis against 1/T on the x-axis, so the gradient is −Ea/R and the intercept is ln A. The gradient is negative for every real reaction.</p>

<p><strong>Ea = −(gradient) × R = −(−12400) × 8.31 = 103044 J mol⁻¹ = 103 kJ mol⁻¹</strong> <em>Key:</em> gradient = the slope of the ln k against 1/T line (K, since it is −Ea/R); R = 8.31 J mol⁻¹ K⁻¹; the answer is in J mol⁻¹ and is converted to kJ mol⁻¹ by dividing by 1000. Keep the minus signs: two negatives give the positive activation energy.</p>

<p><strong>rate = k[halogenoalkane][OH−]</strong> <em>Key:</em> the SN2 rate equation for a primary halogenoalkane — first order in each species and second order overall. Both concentrations appear, which is the evidence that the hydroxide ion is present in the rate-determining step: one concerted collision, no intermediate.</p>

<p><strong>rate = k[halogenoalkane]</strong> <em>Key:</em> the SN1 rate equation for a tertiary halogenoalkane — first order overall, with no [OH⁻] term. The slow step is the heterolytic fission of the C–X bond to form a carbocation, so the nucleophile's concentration cannot affect the rate.</p>

<p><strong>units of k = (units of rate) / (units of concentration) raised to the power of the overall order</strong> <em>Key:</em> derive the units rather than recall them: with rate in mol dm⁻³ s⁻¹ and concentration in mol dm⁻³, a first-order reaction gives s⁻¹, a second-order gives mol⁻¹ dm³ s⁻¹ and a third-order gives mol⁻² dm⁶ s⁻¹.</p>

<h3>Reading the graphs</h3>
<table border="1" cellpadding="6">
<tr><th>Evidence</th><th>Order</th></tr>
<tr><td>Rate–concentration graph is horizontal</td><td>Zero order: rate independent of concentration</td></tr>
<tr><td>Rate–concentration graph is a straight line through the origin</td><td>First order: rate proportional to concentration</td></tr>
<tr><td>Constant half-life on a concentration–time curve</td><td>First order (the defining test)</td></tr>
<tr><td>Rate–concentration graph is a curve of increasing gradient</td><td>Second order</td></tr>
</table>

<h3>Traps specific to the arithmetic</h3>
<ul>
<li>Reading orders off the stoichiometric coefficients — they must come from experiment.</li>
<li>Leaving the temperature in Celsius before 1/T.</li>
<li>Saying k changes when concentration changes; only temperature and a catalyst change k.</li>
<li>Forgetting that a zero-order reactant cannot appear in the rate-determining step.</li>
</ul>
`,
    },

    /* ── Chemistry A2: Organic Nitrogen Compounds ─────────────────────── */
    "33a0fa2e-e229-4df3-abf8-d266c0f90886": {
      slug: "organic-nitrogen-compounds",
      html: `
<h2>Equations and symbols</h2>
<p>The reactions of amines, amides and amino acids, written as equations, with the form of each species that carries the mark — an amine in acid is a cation, an amide heated with alkali gives ammonia gas, and an amino acid at neutral pH is a zwitterion with no net charge.</p>

<p><strong>CH₃CH₂CH₂CH₂NH₂ + H₂O → CH₃CH₂CH₂CH₂NH₃⁺ + OH⁻</strong> <em>Key:</em> butylamine dissolving in water — the amine's lone pair accepts a proton from water, so the solution is alkaline. The products are the alkylammonium ion and hydroxide; writing OH⁻ (not O²⁻) is the mark.</p>

<p><strong>CH₃NH₂ + HCl → CH₃NH₃⁺Cl⁻</strong> <em>Key:</em> methylamine with hydrochloric acid giving methylammonium chloride — a white, water-soluble salt. The amine behaves as a base; the salt is what remains when the water is evaporated, and adding alkali to it regenerates the free amine.</p>

<p><strong>⁺H₃NCH(R)COO⁻</strong> <em>Key:</em> the zwitterion an amino acid adopts in the solid state and near neutral pH — R = the variable side chain that distinguishes one amino acid from another; the ammonium group carries + and the carboxylate −, so the net charge is zero. That is why an amino acid does not move in an electric field at its isoelectric point.</p>

<p><strong>−CONH−</strong> <em>Key:</em> the peptide (amide) link — a carbonyl carbon joined to a nitrogen, formed when the –COOH of one amino acid condenses with the –NH₂ of the next and a water molecule is eliminated. Hydrolysing it with hot concentrated hydrochloric acid returns the amino acid mixture.</p>

<p><strong>C₆H₅N₂⁺Cl⁻</strong> <em>Key:</em> benzenediazonium chloride — C₆H₅ = the benzene ring with its hydrogen replaced; N₂⁺ = the diazonium group; Cl⁻ = the counter-ion. It is made from phenylamine with nitrous acid below 5 °C and is unstable above that, which is why the coupling step is also kept cold.</p>

<h3>The species and their basicity, in order</h3>
<table border="1" cellpadding="6">
<tr><th>Species</th><th>Base strength relative to ammonia</th><th>Reason</th></tr>
<tr><td>Primary aliphatic amine (butylamine)</td><td>Stronger</td><td>Alkyl groups push electron density onto N (positive inductive effect), so the lone pair is more available</td></tr>
<tr><td>Ammonia</td><td>Reference</td><td>Lone pair on N, no donor and no delocalisation</td></tr>
<tr><td>Phenylamine</td><td>Weaker</td><td>The lone pair delocalises into the ring's π system, so it is less available for a proton</td></tr>
</table>

<h3>Traps specific to the equations</h3>
<ul>
<li>Writing the amine salt as a neutral molecule; in acid the nitrogen is protonated and the formula carries a + charge and a counter-ion.</li>
<li>Drawing the amino acid with –COOH and –NH₂ at neutral pH instead of the zwitterion.</li>
<li>Saying alkyl groups "attract" electron density; they push it.</li>
<li>Forgetting the fifth repeat-unit rule: square brackets plus the extension bonds, or the polymer mark is lost.</li>
</ul>
`,
    },

    /* ── Computer Science OL: Databases and SQL ───────────────────────── */
    "e57fcf07-484e-4716-b79e-2e80f4c59824": {
      slug: "database-systems",
      html: `
<h2>Equations and symbols</h2>
<p>In this topic the equations are queries. Each one is a single statement whose clauses run in a fixed order, and every clause is worth a mark: FROM chooses the table, WHERE filters rows, GROUP BY collects them, HAVING filters the groups, SELECT chooses the columns and ORDER BY sorts what is left.</p>

<p><strong>SELECT surname FROM STUDENTS WHERE class = '11A' ORDER BY surname ASC;</strong> <em>Key:</em> SELECT surname = output only that column; FROM STUDENTS = the table the rows come from; WHERE class = '11A' = keep rows whose class field equals the text value, which is quoted because it is text; ORDER BY surname ASC = sort alphabetically. Drop the quotes and the comparison fails — text is quoted, numbers are not.</p>

<p><strong>SELECT studentID, COUNT(*) FROM RESULTS GROUP BY studentID HAVING COUNT(*) >= 2;</strong> <em>Key:</em> COUNT(*) = count the rows in each group; GROUP BY studentID = one group per student; HAVING COUNT(*) >= 2 = filter the groups after counting. WHERE cannot do this job: it filters individual rows before the count, so a row-level condition can never test an aggregate.</p>

<p><strong>SELECT subject, AVG(mark) FROM RESULTS GROUP BY subject;</strong> <em>Key:</em> AVG(mark) = the mean of the mark field within each group; the output has one row per subject, not one per record. The aggregate functions examined are COUNT, SUM, AVG, MIN and MAX, and each collapses a group to a single value.</p>

<h3>The clauses in execution order</h3>
<table border="1" cellpadding="6">
<tr><th>Step</th><th>Clause</th><th>What it does</th></tr>
<tr><td>1</td><td>FROM</td><td>Selects the table and its rows</td></tr>
<tr><td>2</td><td>WHERE</td><td>Keeps rows that meet a condition</td></tr>
<tr><td>3</td><td>GROUP BY</td><td>Collects rows into groups</td></tr>
<tr><td>4</td><td>HAVING</td><td>Keeps groups that meet a condition</td></tr>
<tr><td>5</td><td>SELECT</td><td>Chooses the columns to output</td></tr>
<tr><td>6</td><td>ORDER BY</td><td>Sorts the finished result</td></tr>
</table>

<h3>The comparison operators the syllabus allows</h3>
<ul>
<li>= equality, &lt;&gt; inequality, &lt; and &gt; ordering, &lt;= and &gt;= inclusive ordering.</li>
<li>Conditions combine with AND, OR and NOT; LIKE matches patterns, with % standing for any run of characters (WHERE surname LIKE 'B%').</li>
<li>SELECT * returns every column, which is acceptable but never as precise as naming them.</li>
</ul>

<h3>Traps specific to the queries</h3>
<ul>
<li>Using WHERE for an aggregate; use HAVING.</li>
<li>Sorting with WHERE, or filtering with ORDER BY.</li>
<li>Leaving the semicolon off, or quoting a number.</li>
<li>Writing the clauses in the wrong order in an analysis answer: the execution order above is what the mark scheme describes.</li>
</ul>
`,
    },

    /* ── Computer Science AS: Networks Including the Internet ─────────── */
    "c1d1652f-cd1f-4ce5-b824-a753d5fc6db0": {
      slug: "communication-and-networking",
      html: `
<h2>Equations and symbols</h2>
<p>Two calculations carry marks in this topic: how long a transfer takes, and what a contended or degraded link actually delivers. Both are one division, and both go wrong at the same place — bytes are not bits.</p>

<p><strong>250 MB = 250 × 8 = 2000 megabits</strong> <em>Key:</em> MB = megabytes of data (a byte is 8 bits); the multiplication by 8 converts to megabits, which is the unit bandwidth is quoted in. Skipping this line is the single commonest lost mark in a transfer-time question, because 250 divided by 50 then looks like 5 seconds instead of 40.</p>

<p><strong>2000 / 50 = 40 seconds</strong> <em>Key:</em> 2000 = the file size in megabits; 50 = the link bandwidth (Mbps, megabits per second); 40 s = the ideal transfer time, before protocol overheads. The units cancel only because both are bits — Mbps against megabytes gives an answer 8 times too small.</p>

<p><strong>effective rate = 6.6 Mbps → 2000 / 6.6 = 303 seconds</strong> <em>Key:</em> effective rate = the rated bandwidth multiplied by the fraction actually achieved (11 Mbps × 0.6 = 6.6 Mbps); 303 s ≈ 5 minutes. Real links are shared, so the weakest segment and the number of users set the rate, not the headline figure.</p>

<p><strong>Transfer time ≈ file size in bits ÷ bandwidth</strong> <em>Key:</em> file size in bits = bytes × 8; bandwidth in bits per second (bps, kbps, Mbps, Gbps); transfer time in seconds. The approximation ignores headers, acknowledgements and retransmissions, which is why a real download takes slightly longer than the sum.</p>

<h3>The quantities and their units</h3>
<table border="1" cellpadding="6">
<tr><th>Quantity</th><th>Unit</th><th>Note</th></tr>
<tr><td>File size</td><td>bytes, kB, MB, GB</td><td>Multiply by 8 for bits</td></tr>
<tr><td>Bandwidth</td><td>bps, Mbps, Gbps</td><td>Already in bits per second</td></tr>
<tr><td>Latency</td><td>ms</td><td>Delay, not rate — a fast link can still feel slow</td></tr>
<tr><td>IP address</td><td>IPv4 32-bit, IPv6 128-bit</td><td>Hierarchical, used for routing</td></tr>
<tr><td>MAC address</td><td>48-bit hardware address</td><td>Flat, used within the LAN</td></tr>
</table>

<h3>Traps specific to the numbers</h3>
<ul>
<li>Mixing bytes and bits, in either direction.</li>
<li>Quoting the routed distance as the reason for a slow link when the cause is bandwidth or contention.</li>
<li>Assuming a 100 Mbps link delivers 100 Mbps to one user on a shared medium.</li>
<li>Confusing latency with bandwidth in an explanation — name which one the scenario changes.</li>
</ul>
`,
    },

    /* ── Computer Science AS: Ethics, Ownership and AI ────────────────── */
    "676e85b2-92ba-4147-a226-ffb7f1a011a0": {
      slug: "ethics-and-ai",
      html: `
<h2>Equations and symbols</h2>
<p>This topic has no formulas, and inventing some would be worse than useless. What it does have is a vocabulary that carries marks, and a set of named frameworks that must be applied rather than gestured at. This sheet is the term-by-term reference: use the framework's name, then the clause, then the stakeholder.</p>

<h3>The terms examiners look for</h3>
<table border="1" cellpadding="6">
<tr><th>Term</th><th>Meaning</th><th>Where it earns the mark</th></tr>
<tr><td>Utilitarianism</td><td>Judge an action by its consequences for the greatest number</td><td>Cost–benefit arguments for surveillance, tracking, automation</td></tr>
<tr><td>Deontology</td><td>Some duties hold regardless of outcome</td><td>Objections to reading messages or filming homes, even when it works</td></tr>
<tr><td>Virtue ethics</td><td>What a responsible professional would do</td><td>Codes of conduct, refusing to ship known-flawed software</td></tr>
<tr><td>Fairness, accountability, transparency</td><td>The data-ethics triad</td><td>Every AI-bias question</td></tr>
<tr><td>Copyright</td><td>Automatic protection of the expression of original work</td><td>Reproducing past-paper questions, code, images</td></tr>
<tr><td>Patent</td><td>Protection of an invention for a fixed term, in exchange for disclosure</td><td>Algorithms and processes, as distinct from code</td></tr>
<tr><td>Open-source licence</td><td>Permissions granted by the copyright holder under conditions</td><td>GPL's share-alike obligation on derivative software</td></tr>
<tr><td>Lawful basis</td><td>The legal ground for processing personal data</td><td>Consent or contract for a revision app's user data</td></tr>
<tr><td>Data minimisation</td><td>Collect only what the stated purpose needs</td><td>Not collecting a birthdate nobody uses</td></tr>
<tr><td>Storage limitation</td><td>Keep data no longer than necessary</td><td>"Indefinitely for analytics" is non-compliant</td></tr>
<tr><td>Digital divide</td><td>Unequal access by income, age or geography</td><td>Online exams, rural connectivity</td></tr>
<tr><td>WEEE</td><td>Regulation of waste electrical and electronic equipment</td><td>E-waste mitigation</td></tr>
</table>

<h3>The three named laws, and what each actually covers</h3>
<ul>
<li><strong>Data protection law</strong> (GDPR-style): lawful basis, purpose limitation, minimisation, accuracy, storage limitation, security, accountability, plus the individual rights of access, rectification, erasure and portability.</li>
<li><strong>Computer misuse law</strong>: unauthorised access, unauthorised access with intent to commit a further offence, and unauthorised modification of data — three separate offences, which is why "hacking" alone is not the answer.</li>
<li><strong>Intellectual property</strong>: copyright protects expression automatically; patents protect inventions and must be applied for; trademarks protect identifiers such as names and logos.</li>
</ul>

<h3>Machine learning versus an expert system</h3>
<table border="1" cellpadding="6">
<tr><th>Feature</th><th>Expert system</th><th>Machine learning</th></tr>
<tr><td>Source of behaviour</td><td>Rules written by a human expert</td><td>Parameters adjusted from data during training</td></tr>
<tr><td>Transparency</td><td>High — the rule that fired can be shown</td><td>Low in deep models — no explanation of the decision</td></tr>
<tr><td>Weakness</td><td>Only knows what was encoded; expensive to build</td><td>Needs large labelled data; replicates bias; brittle outside its training distribution</td></tr>
</table>

<h3>Traps specific to this topic</h3>
<ul>
<li>An opinion with no framework scores nothing: name the stance and then apply it.</li>
<li>"The data protection act" is too vague; name the principle or the right.</li>
<li>Copyright protects expression, not the idea — the patent does that.</li>
<li>Open source is about licence freedoms, not price.</li>
<li>Machine learning is defined by learning from data, not by being programmed with rules.</li>
</ul>
`,
    },

    /* ── Computer Science A2: Encryption and Digital Certificates ─────── */
    "b85187cd-a73d-45af-9ae1-f1616a80a393": {
      slug: "web-technologies-and-security",
      html: `
<h2>Equations and symbols</h2>
<p>The cryptography in this topic is arithmetic under a modulus, and every worked step in the handshake is one of these lines. Know which key does which job: encryption and verification use the public key, decryption and signing use the private key.</p>

<p><strong>n = p x q = 3233</strong> <em>Key:</em> n = the public modulus, the product of two secret primes (3233 here); p and q = the primes (61 and 53 in the worked example). Publishing n is safe because recovering p and q means factoring it, which is infeasible at real key sizes of 2048 bits and above.</p>

<p><strong>Φ(n) = (p-1)(q-1) = 3120</strong> <em>Key:</em> Φ(n) = Euler's totient, the count of integers below n that share no factor with it; in RSA it is the modulus used to relate the two exponents. It is secret because it is derived from p and q.</p>

<p><strong>d x e = 1 mod 3120 → d = 2753</strong> <em>Key:</em> e = the public exponent (17, coprime to Φ(n)); d = the private exponent, the modular inverse of e; mod = arithmetic that wraps at the modulus. This one line is the whole key-generation step, and it is why the pair is mathematically linked but not derivable from the public values alone.</p>

<p><strong>c = m^e mod n = 65¹⁷ mod 3233 = 2790</strong> <em>Key:</em> m = the plaintext as a number (65); c = the ciphertext number (2790); e = the public exponent; n = the public modulus. Encryption is a modular exponentiation with the public key, which anyone can do — that is what makes the key publishable.</p>

<p><strong>m = c^d mod n = 2790²⁷⁵³ mod 3233 = 65</strong> <em>Key:</em> the decryption step, using the private exponent d; the result returns the original message, which is the correctness check on the key pair. Without d, factoring n is the only route, and that is the trapdoor.</p>

<p><strong>hash = SHA-256(message)</strong> <em>Key:</em> hash = a fixed-length digest (256 bits for SHA-256) computed from the message; it is one-way and collision-resistant, so any edit changes it completely (the avalanche effect). A hash alone proves integrity, never authorship, because anyone can hash anything.</p>

<p><strong>signature = RSA-encrypt(hash) with the SIGNER'S PRIVATE key</strong> <em>Key:</em> signature = the digest encrypted with the signer's private key; a verifier decrypts it with the signer's public key and compares digests. A match proves integrity (the message is unaltered) and authentication plus non-repudiation (only the private-key holder could have produced it).</p>

<h3>The two families compared</h3>
<table border="1" cellpadding="6">
<tr><th>Property</th><th>Symmetric</th><th>Asymmetric</th></tr>
<tr><td>Keys</td><td>One shared secret</td><td>Public and private pair</td></tr>
<tr><td>Speed</td><td>Fast — used for bulk data</td><td>Slow — used for key exchange and signatures</td></tr>
<tr><td>Key distribution</td><td>The hard problem: n(n−1)/2 pairs</td><td>The public key can be published</td></tr>
<tr><td>Non-repudiation</td><td>No — either holder could have encrypted</td><td>Yes — the signature binds the private key</td></tr>
</table>

<h3>Traps specific to the arithmetic</h3>
<ul>
<li>Saying asymmetric is "more secure"; it solves key distribution and signatures, not strength.</li>
<li>Encrypting a large file with RSA — it is 100–1000× slower than AES, so the bulk goes symmetric.</li>
<li>Signing by encrypting with the public key, which proves nothing.</li>
<li>Treating a certificate as an encryption file; it is a signed binding of an identity to a public key.</li>
</ul>
`,
    },

    /* ── English IGCSE (Oxford): Word Formation ───────────────────────── */
    "68f705c7-4037-41c5-97ce-1386dc410618": {
      slug: "word-formation-prefixes-and-suffixes",
      html: `
<h2>Equations and symbols</h2>
<p>Word formation has formulas in the strict sense: a base plus an affix gives a new word, and the arrow is the derivation. Read each line as an instruction — identify the base, apply the ending the sentence needs, then apply the spelling change. The affix carries the meaning; the spelling carries the mark.</p>

<p><strong>hope + ful → hopeful</strong> <em>Key:</em> hope = the base noun; -ful = "full of", an adjective suffix; the silent e is dropped because a vowel suffix follows. The same base with a consonant suffix keeps it: hope + less → hopeless.</p>

<p><strong>happy + ness → happiness</strong> <em>Key:</em> happy = base adjective ending in consonant + y; -ness = noun suffix; y becomes i before a consonant suffix. The y stays before -ing and -ous: carrying, curious.</p>

<p><strong>beauty + ful → beautiful</strong> <em>Key:</em> beauty = base noun (consonant + y); -ful = adjective suffix; y → i. The adverb then adds -ly: beautifully, with both changes kept.</p>

<p><strong>big + er → bigger</strong> <em>Key:</em> big = base adjective, one vowel + one final consonant, stressed on the last syllable; -er = comparative suffix; the consonant doubles. Where the stress is not final the consonant stays single: visit + or → visitor.</p>

<p><strong>manage + ment → management</strong> <em>Key:</em> manage = base verb ending in a silent e followed by a consonant suffix; -ment = noun suffix; the e is kept because the suffix begins with a consonant. Contrast like + able → likable, where the vowel suffix drops it.</p>

<p><strong>courage + ous → courageous</strong> <em>Key:</em> courage = base noun ending in -ge; -ous = adjective suffix; the e is kept before a vowel suffix so the soft g survives. Drop it and the word reads with a hard g.</p>

<p><strong>decide → decision</strong> <em>Key:</em> decide = base verb; the noun is not a suffix added to the whole word but a family member with its own spelling — -sion replaces -de. Learn the family, not the rule: decide, decision, decisive, decisively.</p>

<p><strong>dramatic + ally → dramatically</strong> <em>Key:</em> dramatic = adjective ending in -ic; -ally = adverb suffix (not -ly alone). The same pattern gives automatic → automatically, basic → basically. Writing "dramaticly" is the classic spelling loss.</p>

<h3>The affix tables in one place</h3>
<table border="1" cellpadding="6">
<tr><th>Affix</th><th>Meaning</th><th>Example</th></tr>
<tr><td>-ful / -less</td><td>full of / without</td><td>hopeful / hopeless</td></tr>
<tr><td>-ous</td><td>having the quality</td><td>danger → dangerous</td></tr>
<tr><td>-tion, -sion, -ment, -ness</td><td>noun of action or state</td><td>decision, achievement, happiness</td></tr>
<tr><td>-er, -or, -ist, -ee</td><td>person who does / receives</td><td>teacher, actor, employee</td></tr>
<tr><td>un- / in- / im- / il- / ir-</td><td>not</td><td>unhappy, inactive, impossible, illegal, irregular</td></tr>
<tr><td>mis- / re- / over- / under-</td><td>wrongly / again / too much / too little</td><td>misunderstand, rewrite, overestimate, underestimate</td></tr>
</table>

<h3>Traps specific to the derivation</h3>
<ul>
<li>Right family, wrong spelling: explaination, decission, beautifull. The morphology is right; the mark is not.</li>
<li>Impossible negatives: unpossible, unlegal, unregular — learn the prefix with the word.</li>
<li>-ing versus -ed: the thing is boring, the person is bored.</li>
<li>Adding -ness to a word that is already the noun (beautifulness), when the sentence needs the base.</li>
</ul>
`,
    },

    /* ── English IGCSE (Cambridge): Descriptive Writing ───────────────── */
    "f06d77b8-4613-4554-ae77-3af2ea182bc8": {
      slug: "descriptive-writing",
      html: `
<h2>Equations and symbols</h2>
<p>Descriptive writing has no arithmetic, but it does have a repeatable construction — dominant impression plus sensory coverage plus camera order — and that construction is what turns a list of details into a scene. This sheet is the checklist form of it, with the terms the mark scheme uses.</p>

<h3>The construction, in the order you build it</h3>
<table border="1" cellpadding="6">
<tr><th>Term</th><th>What it means</th><th>What it decides</th></tr>
<tr><td>Dominant impression</td><td>The single feeling the description leaves</td><td>Which details you keep, which senses lead, what the sentences do</td></tr>
<tr><td>Sensory motif</td><td>One sound, smell or taste returning twice</td><td>Makes the description feel composed rather than accumulated</td></tr>
<tr><td>Pathetic fallacy</td><td>Weather and nature echoing the mood</td><td>Atmosphere, once, at the climax — not on every line</td></tr>
<tr><td>Camera lens</td><td>Wide shot, medium, close-up, micro detail, pull back</td><td>Shape: it stops the description being shapeless</td></tr>
<tr><td>Figurative density</td><td>Two or three figures per page, each true to the thing compared</td><td>Prevents over-writing</td></tr>
<tr><td>Showing not telling</td><td>The action and the object carry the emotion</td><td>Voice, and the top band's "convincing" descriptor</td></tr>
</table>

<h3>The five senses, as a planning grid</h3>
<ul>
<li><strong>Sight</strong> — light, colour, movement, scale. The default channel; do not let it be the only one.</li>
<li><strong>Sound</strong> — what is heard, and what is conspicuously absent. The silence after a bell carries more than the bell.</li>
<li><strong>Smell</strong> — the sense most tied to memory, and the one most candidates omit.</li>
<li><strong>Touch</strong> — temperature, texture, the body's state. A cold rail is worth three adjectives.</li>
<li><strong>Taste</strong> — sparingly: the metallic taste of fear, salt on the wind.</li>
</ul>

<h3>Mood into technique</h3>
<table border="1" cellpadding="6">
<tr><th>Mood</th><th>Sentence shape</th><th>Sound</th><th>Detail</th></tr>
<tr><td>Menace</td><td>Short, clipped</td><td>k, t, g</td><td>Light failing, shapes half-seen</td></tr>
<tr><td>Peace</td><td>Long, slow</td><td>l, m, s</td><td>Warm light, spaciousness</td></tr>
<tr><td>Melancholy</td><td>Falling, unfinished</td><td>Soft consonants</td><td>Dust, stopped clocks, empty chairs</td></tr>
<tr><td>Wonder</td><td>Extended, building</td><td>Open vowels</td><td>Scale, small narrator</td></tr>
</table>

<h3>Traps specific to description</h3>
<ul>
<li>The everything-list: details in random order pointing in different directions. One impression, camera order, selection.</li>
<li>Adjective stacking (beautiful, amazing, wonderful) — zero information. Precise verb, concrete noun, one exact adjective.</li>
<li>Sight-only writing: it reads as a photograph of a photograph.</li>
<li>Mood drift with nothing causing the change.</li>
<li>Cliché: the eerie silence, crystal-clear water, the wind howled.</li>
<li>No perceiver: pure inventory reads as a guidebook rather than a mind encountering a place.</li>
</ul>
`,
    },

    /* ── Mathematics OL: Inequalities ─────────────────────────────────── */
    "a5a88378-f424-47de-9f47-e92967a125cc": {
      slug: "algebra-inequalities",
      html: `
<h2>Equations and symbols</h2>
<p>An inequality is solved like an equation with one extra rule, and the region questions are all the same line tested against a point. This sheet is the boundary lines and the sign rule — the two places marks are lost.</p>

<p><strong>y = mx + c</strong> <em>Key:</em> y and x = the coordinates of a point on the plane (no units); m = the gradient; c = the y-intercept. Drawn solid when the inequality includes equality (⩽ or ⩾) and dashed when it is strict (&lt; or &gt;) — the line style is the first mark of a region question.</p>

<p><strong>y = 2x + 1</strong> <em>Key:</em> the boundary line of y ⩽ 2x + 1, drawn solid because equality is included. Test the origin (0, 0): 0 ⩽ 1 is true, so shade the side containing the origin — testing, never guessing, is what earns the shading mark.</p>

<p><strong>y = -x + 2</strong> <em>Key:</em> the boundary line of y &gt; −x + 2, drawn dashed because the inequality is strict, so points on the line are excluded. Here (0, 0) gives 0 &gt; 2, false, so the region is the side away from the origin.</p>

<p><strong>x = 0 (the y-axis)</strong> <em>Key:</em> the boundary of x ⩾ 0; a vertical line has no gradient to quote, which is why the general form breaks down and the line is named instead. Shade to the right of it.</p>

<p><strong>x + y = 6</strong> <em>Key:</em> a boundary written in implicit form; the intercepts are (6, 0) and (0, 6). With y = x + 2 it meets at x + (x + 2) = 6, so x = 2 and y = 4 — corner (2, 4), where the maximum of a linear expression over that region always sits.</p>

<p><strong>x² + kx + 9 = 0</strong> <em>Key:</em> x = the variable; k = the unknown coefficient; the condition "two distinct real roots" becomes b² − 4ac &gt; 0 with a = 1, b = k, c = 9, so k² &gt; 36 and k &gt; 6 or k &lt; −6. The result is a pair of rays, not an interval between them — writing 6 &lt; k &lt; −6 is the standard wrong answer.</p>

<h3>The sign rule, in one table</h3>
<table border="1" cellpadding="6">
<tr><th>Operation</th><th>Effect on the sign</th></tr>
<tr><td>Add or subtract the same value</td><td>Unchanged</td></tr>
<tr><td>Multiply or divide by a positive number</td><td>Unchanged</td></tr>
<tr><td>Multiply or divide by a negative number</td><td>Reverses: &lt; becomes &gt;, ⩽ becomes ⩾</td></tr>
<tr><td>Reverse the two sides</td><td>Reverses: 3 &lt; 5 is the same statement as 5 &gt; 3</td></tr>
</table>

<h3>Traps specific to the algebra</h3>
<ul>
<li>Forgetting to reverse when dividing by a negative: −2x ⩽ 8 gives x ⩾ −4.</li>
<li>Reversing when subtracting, which is not a reversal at all.</li>
<li>Hollow versus solid endpoints: x = 4 does not satisfy x &gt; 4.</li>
<li>Reporting 11.25 when the question asks for the greatest integer, which is 11.</li>
<li>Shading every inequality's own side instead of their overlap.</li>
</ul>
`,
    },

    /* ── Mathematics OL: Probability ──────────────────────────────────── */
    "120ecca6-69da-44e7-8537-beda4c42532d": {
      slug: "statistics-probability",
      html: `
<h2>Equations and symbols</h2>
<p>Four rules cover every IGCSE probability question, and each has a condition that decides whether it applies. Learn the condition with the formula — most lost marks are a correct formula used where its condition fails.</p>

<p><strong>P(event) = number of favourable outcomes / total outcomes</strong> <em>Key:</em> P = probability, between 0 and 1 with no unit; favourable = outcomes that satisfy the event; total = every outcome in the sample space. Valid only when all outcomes are equally likely — a biased die needs relative frequency instead.</p>

<p><strong>0 <= P(A) <= 1</strong> <em>Key:</em> A = any event; the bounds are the check on every answer. An answer above 1 means two rules were combined wrongly, and an answer below 0 cannot occur.</p>

<p><strong>P(not A) = 1 - P(A)</strong> <em>Key:</em> the complement rule — every outcome is either A or not A, so the two probabilities add to 1. This is the route to every "at least one" question: P(at least one) = 1 − P(none).</p>

<p><strong>P(A or B) = P(A) + P(B)</strong> <em>Key:</em> the addition rule, valid only for mutually exclusive events — those that cannot both happen. When they can, subtract the overlap: P(heart or king) = 13/52 + 4/52 − 1/52.</p>

<p><strong>P(A and B) = P(A) × P(B)</strong> <em>Key:</em> the multiplication rule, valid only for independent events — where one outcome does not change the other's probability. With replacement the events are independent; without replacement they are not, and the second denominator drops by one.</p>

<p><strong>P(A | B) = P(A and B) / P(B)</strong> <em>Key:</em> A | B = "A given B"; the denominator is the total of B's group, not the grand total. In a two-way table, restrict to B's row or column first and then divide.</p>

<p><strong>relative frequency = number of times the event occurred / total number of trials</strong> <em>Key:</em> an estimate of probability from experiment (no unit); it approaches the theoretical value as the number of trials grows, which is the answer to "explain the discrepancy" questions about small samples.</p>

<p><strong>expected number = probability x number of trials</strong> <em>Key:</em> probability = the chance of the event in one trial; trials = how many times it is repeated; the answer is a count, so round sensibly when the context needs a whole number.</p>

<h3>Which rule, in one table</h3>
<table border="1" cellpadding="6">
<tr><th>Situation</th><th>Rule</th></tr>
<tr><td>Two events cannot both happen</td><td>Add: P(A) + P(B)</td></tr>
<tr><td>Two events can both happen</td><td>Add and subtract the overlap</td></tr>
<tr><td>Two events do not affect each other</td><td>Multiply</td></tr>
<tr><td>Draws without replacement</td><td>Multiply, with the second denominator reduced</td></tr>
<tr><td>"At least one"</td><td>1 − P(none)</td></tr>
<tr><td>"Given that"</td><td>Divide by the total of the given group</td></tr>
</table>

<h3>Traps specific to the rules</h3>
<ul>
<li>Adding when the events are independent, or multiplying when they are exclusive.</li>
<li>Forgetting the second draw's denominator falls by one.</li>
<li>Counting one-of-each in only one order: RB and BR are two branches, both added.</li>
<li>Using favourable/total on outcomes that are not equally likely.</li>
<li>P(A | B) with the grand total underneath instead of B's total.</li>
<li>Mixing fractions, decimals and percentages inside one calculation.</li>
</ul>
`,
    },

    /* ── Mathematics A2: Further Algebra ──────────────────────────────── */
    "7034932b-635a-4949-a7c1-e9df1bd9c136": {
      slug: "further-algebra",
      html: `
<h2>Equations and symbols</h2>
<p>Every technique in this topic is one of five statements: the division identity, the two theorems, the partial-fraction form and the modulus rule. Learn the form and the case it does not cover, because the incomplete form is what loses the marks.</p>

<p><strong>2x³ - 5x² + 4x - 7 = (x - 2)(2x² - x + 2) - 3</strong> <em>Key:</em> the division identity dividend = divisor × quotient + remainder. The remainder (−3) is a constant because the divisor is linear; if the remainder had an x in it, the division is unfinished. Write 0x² and 0x placeholders when a power is missing, or the columns misalign.</p>

<p><strong>remainder theorem: dividing f(x) by (x - a) leaves remainder f(a)</strong> <em>Key:</em> f(x) = the polynomial; a = the value that makes the divisor zero. For a divisor (x + a) substitute −a, and for (ax − b) substitute b/a — the sign error here is the commonest in the topic.</p>

<p><strong>factor theorem: (x - a) is a factor exactly when f(a) = 0</strong> <em>Key:</em> the same substitution, read the other way: a remainder of zero means no remainder, so the divisor divides exactly. It is also the fastest route to an unknown coefficient: substitute the root, set the result to zero, solve.</p>

<p><strong>(px + q)/[(x - a)(x - b)] = A/(x - a) + B/(x - b)</strong> <em>Key:</em> p, q = coefficients of the numerator; a, b = the roots of the denominator; A, B = the constants to find. Multiply through by the denominator and substitute x = a then x = b (the cover-up method) — valid only while the factors are distinct.</p>

<p><strong>repeated factor: (px + q)/[(x - a)²] = A/(x - a) + B/(x - a)²</strong> <em>Key:</em> a squared factor needs both fractions, not one; cover-up finds B, and comparing coefficients of x finds A. Writing only A/(x − a) leaves a decomposition that cannot satisfy the coefficients.</p>

<p><strong>improper (degree of numerator >= degree of denominator): divide first</strong> <em>Key:</em> the polynomial part is part of the answer — (x² + 3x + 2)/(x − 1) = x + 4 + 6/(x − 1). Skipping the division gives a form with no solution.</p>

<p><strong>|x - a| < b  means  a - b < x < a + b</strong> <em>Key:</em> | | = modulus, the distance from x to a ignoring sign; b = the radius of the interval, so the answer is one interval for &lt; and two rays for &gt;. Solve −b &lt; x − a &lt; b, and never drop the modulus without writing both directions.</p>

<h3>The forms, by case</h3>
<table border="1" cellpadding="6">
<tr><th>Denominator</th><th>Form to write</th></tr>
<tr><td>Distinct linear factors</td><td>A/(x − a) + B/(x − b)</td></tr>
<tr><td>Repeated linear factor</td><td>A/(x − a) + B/(x − a)²</td></tr>
<tr><td>Irreducible quadratic</td><td>A/(x − c) + (Bx + C)/(x² + px + q)</td></tr>
<tr><td>Improper fraction</td><td>Divide first, then decompose the remainder</td></tr>
</table>

<h3>Traps specific to the algebra</h3>
<ul>
<li>Cover-up used on a repeated factor, which gives only one of the two constants.</li>
<li>A constant numerator over an irreducible quadratic; it must be linear.</li>
<li>Multiplying an inequality by a variable whose sign is unknown — use a sign diagram instead.</li>
<li>Cancelling terms before factorising, which is invalid because a sum is not a product.</li>
<li>Leaving out the excluded values where a cancelled factor's denominator was zero.</li>
</ul>
`,
    },

    /* ── Mathematics A2: Continuous Random Variables ─────────────────── */
    "e04cf551-2c45-4d65-b4b5-bd16e733c938": {
      slug: "continuous-random-variables",
      html: `
<h2>Equations and symbols</h2>
<p>One idea governs the whole topic: probability is area under the density curve, never the height of the curve. Every formula below is that idea applied — to a range, to a constant, to a mean, to a percentile.</p>

<p><strong>P(a <= X <= b) = integral from a to b of f(x) dx</strong> <em>Key:</em> X = the continuous random variable (units of the variable); f(x) = the probability density function (per unit of X, so it may exceed 1); a, b = the limits of the range. The probability of any single value is zero, because a point has no width.</p>

<p><strong>the total area is 1: integral of f over the whole range = 1</strong> <em>Key:</em> the normalising condition — the first mark of every "find the constant" question. Set the integral over the support equal to one, solve for k, then check the density is non-negative on the support.</p>

<p><strong>F(x) = P(X <= x) = integral from the lower limit to x of f(t) dt</strong> <em>Key:</em> F = the cumulative distribution function (a probability, 0 to 1); f = the density. It is non-decreasing, F(lower) = 0 and F(upper) = 1, and for a piecewise density it must be evaluated at the join first.</p>

<p><strong>f(x) = F'(x) where F is differentiable</strong> <em>Key:</em> differentiating the cumulative function returns the density — the check that catches a wrong constant of integration. Integrating f gives F; differentiating F gives f; confusing the two directions is a whole-mark error.</p>

<p><strong>E(X) = integral of x f(x) dx over the support</strong> <em>Key:</em> E(X) = the mean of X (same units as X); the continuous version of ΣxP, with the sum replaced by the integral. For a uniform distribution on [a, b] it gives (a + b)/2.</p>

<p><strong>Var(X) = E(X²) - [E(X)]^2</strong> <em>Key:</em> Var(X) = the variance (units of X squared); E(X²) = the integral of x²f(x) dx. Subtracting the square of the mean, not the mean, is the step that goes wrong; the uniform case gives (b − a)²/12.</p>

<p><strong>median m: F(m) = 0.5</strong> <em>Key:</em> m = the median, a position on the axis and not a probability; the lower quartile solves F = 0.25 and the upper 0.75, and the interquartile range is q₃ − q₁. For a continuous variable these are always found by solving an equation, never by averaging.</p>

<p><strong>mode: maximise f(x) on the support</strong> <em>Key:</em> the mode is where the density peaks — differentiate and set the derivative to zero, then compare with the endpoint values, because a monotone density peaks at the boundary. A density with no stationary point still has a mode.</p>

<h3>Which function answers which question</h3>
<table border="1" cellpadding="6">
<tr><th>Asked for</th><th>Use</th></tr>
<tr><td>P(X ≤ k)</td><td>F(k), or integrate f to k</td></tr>
<tr><td>P(a ≤ X ≤ b)</td><td>F(b) − F(a)</td></tr>
<tr><td>The constant in f</td><td>Total area = 1</td></tr>
<tr><td>Mean</td><td>∫ x f(x) dx</td></tr>
<tr><td>Variance</td><td>∫ x² f(x) dx − [E(X)]²</td></tr>
<tr><td>Median, quartiles</td><td>Solve F = 0.5, 0.25, 0.75</td></tr>
<tr><td>Mode</td><td>Maximise f, checking the endpoints</td></tr>
</table>

<h3>Traps specific to the integrals</h3>
<ul>
<li>Reading a probability off the height of the curve.</li>
<li>Integrating past the edge of the support, where the density is zero — split the integral.</li>
<li>Variance written as E(X²) − E(X), or with a plus sign.</li>
<li>A piecewise density integrated as a single piece.</li>
<li>Reporting a percentile as a probability: k has the units of the variable.</li>
</ul>
`,
    },

    /* ── Physics AS: Kinematics ───────────────────────────────────────── */
    "c6799c2c-a5ca-4a0d-b962-7bf95e65b17d": {
      slug: "kinematics",
      html: `
<h2>Equations and symbols</h2>
<p>Four equations cover every constant-acceleration problem, and each one is missing exactly one quantity — which is how you choose between them. They are vector equations, so the sign convention written down before the substitution is part of the method, not a preliminary.</p>

<p><strong>v = u + a t</strong> <em>Key:</em> u = initial velocity (m s⁻¹); v = final velocity (m s⁻¹); a = acceleration (m s⁻²); t = time (s). Omits s — use it when displacement is neither given nor wanted.</p>

<p><strong>s = u t + 1/2 a t²</strong> <em>Key:</em> s = displacement (m); u = initial velocity (m s⁻¹); a = acceleration (m s⁻²); t = time (s). Omits v, and it is the one to use when the time is the unknown.</p>

<p><strong>v² = u² + 2 a s</strong> <em>Key:</em> v, u = final and initial velocity (m s⁻¹); a = acceleration (m s⁻²); s = displacement (m). Omits t, which is why it is the fastest route whenever time is neither given nor asked for.</p>

<p><strong>s = 1/2 (u + v) t</strong> <em>Key:</em> s = displacement (m); u, v = initial and final velocity (m s⁻¹); t = time (s). This is the area of the trapezium under a velocity–time graph, which is why the equations and the graphs always agree.</p>

<p><strong>R = √(A² + B²)</strong> <em>Key:</em> R = the resultant of two perpendicular vectors (units of A and B); A, B = the magnitudes of the two vectors. At an angle to A the direction is θ = tan⁻¹(B/A) — magnitude alone is incomplete for a vector quantity.</p>

<p><strong>1 N = 1 kg m s⁻²</strong> <em>Key:</em> the definition of the newton in SI base units, which is how every derived unit in mechanics resolves: check a calculation's units by substituting these and the answer's unit follows.</p>

<p><strong>a = (v − u)/t = (15 − 5.0)/6.0 = 1.7 m s⁻²</strong> <em>Key:</em> the worked case — 15 and 5.0 m s⁻¹ are the final and initial velocities, 6.0 s the time, and the answer is positive because the car speeds up in the chosen direction. A negative result would mean deceleration, not an error.</p>

<p><strong>s = ½(u + v)t = ½(5.0 + 15)(6.0) = 60 m</strong> <em>Key:</em> the same journey's displacement — the mean velocity 10 m s⁻¹ for 6.0 s. This form is the quickest when both velocities and the time are known.</p>

<h3>Quantities, units and the scalar–vector split</h3>
<table border="1" cellpadding="6">
<tr><th>Quantity</th><th>Unit</th><th>Scalar or vector</th></tr>
<tr><td>Displacement</td><td>m</td><td>Vector</td></tr>
<tr><td>Velocity</td><td>m s⁻¹</td><td>Vector</td></tr>
<tr><td>Acceleration</td><td>m s⁻²</td><td>Vector</td></tr>
<tr><td>Speed</td><td>m s⁻¹</td><td>Scalar</td></tr>
<tr><td>Time</td><td>s</td><td>Scalar</td></tr>
</table>

<h3>Traps specific to the equations</h3>
<ul>
<li>Using them while the acceleration is changing — after drag becomes significant they no longer apply.</li>
<li>Mixing sign conventions: upward positive with g = +9.81 gives nonsense.</li>
<li>Reading "at the top" as "at rest": so long as the flight continues, a is 9.81 m s⁻² downwards even where v_y is momentarily zero.</li>
<li>Feeding km h⁻¹ straight in; divide by 3.6 first.</li>
<li>Adding percentage uncertainties for a sum, where absolute uncertainties add.</li>
</ul>
`,
    },

    /* ── Physics A2: Nuclear Physics ──────────────────────────────────── */
    "0b01158e-1681-416b-986a-b17cb4bc9956": {
      slug: "nuclear-physics",
      html: `
<h2>Equations and symbols</h2>
<p>Nuclear physics has two families of arithmetic: the mass–energy bookkeeping of binding energy, and the exponential law of decay. Both are unforgiving about units — kilograms against atomic mass units in the first, seconds against hours in the second.</p>

<p><strong>E = Δm c²</strong> <em>Key:</em> E = energy released (J); Δm = the mass defect, the difference between the nucleus and its separated nucleons (kg); c = the speed of light, 3.0 × 10⁸ m s⁻¹. One atomic mass unit is 1.661 × 10⁻²⁷ kg, equivalent to 931.5 MeV — pick one route and stay in it.</p>

<p><strong>1 u = 1.661 × 10⁻²⁷ kg</strong> <em>Key:</em> u = the unified atomic mass unit; it is defined from carbon-12, so it is a mass, not an energy. Multiply by c² to convert a mass defect in u into joules, or use the 931.5 MeV equivalent to stay in MeV.</p>

<p><strong>binding energy per nucleon = binding energy / A</strong> <em>Key:</em> A = the nucleon number (protons plus neutrons, no unit); the quotient is in MeV per nucleon and is what the curve plots. Its maximum near iron-56 is why both fission of heavy nuclei and fusion of light ones release energy.</p>

<p><strong>energy released = (binding energy of products) - (binding energy of reactants)</strong> <em>Key:</em> the sign follows the arrow: a positive result is energy released. Work per nucleon and multiply by A when the curve gives you the per-nucleon figures — 235 × 0.9 MeV ≈ 211 MeV for one uranium-235 fission.</p>

<p><strong>N = N⁰ e^(-λ t)</strong> <em>Key:</em> N = the number of undecayed nuclei at time t; N⁰ = the number at t = 0; λ = the decay constant (s⁻¹), the probability per unit time that one nucleus decays; t = time (s). The same exponential governs activity, so both quantities halve on the same clock.</p>

<p><strong>A = λ N</strong> <em>Key:</em> A = activity, the rate of decay (Bq, where 1 Bq = 1 decay per second); λ = the decay constant (s⁻¹); N = the number of nuclei present. Activity falls because N falls, not because λ changes — λ is a constant of the isotope.</p>

<p><strong>A = A⁰ e^(-λ t)</strong> <em>Key:</em> the activity form of the decay law; A⁰ = the activity at t = 0. Count rate is proportional to activity but not equal to it, because the detector intercepts only a fraction of the decays — which is why background must be subtracted before halvings are counted.</p>

<p><strong>t_half = ln(2)/λ = 0.693/λ</strong> <em>Key:</em> t_half = the half-life (s, or the time unit of λ); ln 2 = 0.693. It converts between the exponential form and the "count the halvings" method, and it is the check that the two give the same answer.</p>

<p><strong>λ = 0.693/t_half = 0.693/(2.0 × 3600) = 9.6 × 10⁻⁵ s⁻¹</strong> <em>Key:</em> the worked conversion — 2.0 hours must become 7200 s before dividing, because λ is per second. Then N = A/λ = 1000/9.6 × 10⁻⁵ = 1.04 × 10⁷ nuclei.</p>

<p><strong>n → p + e⁻ + ν̄</strong> <em>Key:</em> beta-minus decay — n = neutron, p = proton, e⁻ = the beta particle, ν̄ = the antineutrino. Nucleon number is unchanged (one nucleon in, one out) while proton number rises by one, which is the bookkeeping to write on both sides.</p>

<h3>The three radiations</h3>
<table border="1" cellpadding="6">
<tr><th>Property</th><th>Alpha</th><th>Beta-minus</th><th>Gamma</th></tr>
<tr><td>Nature</td><td>⁴₂He nucleus</td><td>fast electron</td><td>photon</td></tr>
<tr><td>Charge</td><td>+2e</td><td>−1e</td><td>0</td></tr>
<tr><td>Stopped by</td><td>paper</td><td>a few mm of aluminium</td><td>lead or thick concrete</td></tr>
<tr><td>Ionising power</td><td>strongest</td><td>moderate</td><td>weakest</td></tr>
</table>

<h3>Traps specific to the arithmetic</h3>
<ul>
<li>Mixing u and kg, or MeV and J, midway through a calculation.</li>
<li>Reading a half-life as the time to reach zero; it halves the current amount.</li>
<li>Using hours with a λ quoted in s⁻¹.</li>
<li>Treating the count rate as the activity without subtracting background.</li>
<li>Balancing a nuclear equation on protons only, or on nucleons only.</li>
</ul>
`,
    },
  },
};
