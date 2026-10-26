// Keyed equation sheets — seventh tranche: Physics AS, Chemistry OL/AS and all
// three Computer Science levels.
//
//   AS Physics  Forces and Equilibrium                                   (31 formula lines, no key)
//   OL Chemistry Chemical Energetics                                     (35)
//   AS Chemistry Organic Chemistry: Halogenoalkanes, Alcohols and Spectra (16 reaction equations)
//   OL CS        Hardware Architecture                                    (23)
//   AS CS        Information Representation                               (22)
//   A2 CS        Abstract Data Types                                      (20)
//
// House rules as content-math-keyed-a..f.cjs. Chemistry and Computer Science
// sheets key the symbols inside the equations that subject actually uses — moles,
// bond energies and ΔH, clock rate and CPI, bit weights and two's-complement
// ranges, Big-O growth — rather than importing algebra the note never uses.
//
// Apply with:
//   node .freebuff/append-note-sections.cjs .freebuff/content-math-keyed-g.cjs
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/note-formulas.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/note-formulas.sql --apply    (live)

const HEAD = `<h2>Equations and symbols</h2>
<p>Every relation and reaction this topic is examined on, written with its real notation and followed by a key naming each symbol, its unit or condition, and what it represents. The sections above teach the method; this is the sheet you revise from, where a mark turns on reproducing the form exactly — the same bond counted twice, the right power of two, or the reagent and temperature that name a reaction.</p>`;

const sections = {
  /* ── Physics AS: forces and equilibrium ──────────────────────────────── */
  "3a5f3230-7e9e-4d8b-8943-bcf86193dc3b": {
    slug: "physics-as-forces-equilibrium",
    html: `${HEAD}
<h3>Moments and couples</h3>
<p><strong>M = F × d</strong><br><em>Key:</em> M = the moment of the force (N m); F = the force (N); d = the perpendicular distance from the pivot to the force's line of action (m). A distance measured along the beam rather than perpendicular to the force is the standard error; when the force is at an angle, take its perpendicular component first.</p>
<p><strong>M = (F sin θ) × d</strong><br><em>Key:</em> F = the applied force (N); θ (theta) = the angle between the force and the beam or door, in degrees; d = the distance from the pivot to the point where the force acts (m). The sine picks out the component perpendicular to the lever; when θ is measured to the perpendicular instead, the sine becomes a cosine, so label the angle on your diagram.</p>
<p><strong>torque of a couple = F × d</strong><br><em>Key:</em> F = one of the two equal and opposite forces (N); d = the perpendicular distance between their lines of action (m), not the length of the object. A couple produces rotation with no resultant force, which is why it cannot be balanced by a single force and why a steering wheel uses one.</p>
<p><strong>principle of moments: Σ clockwise moments = Σ anticlockwise moments</strong><br><em>Key:</em> each moment = force × perpendicular distance (N m), with its sense recorded. Taking moments about a support eliminates that support's unknown reaction, so one equation gives one unknown — the standard first move on any beam question.</p>

<h3>Equilibrium of a rigid body</h3>
<p><strong>ΣF_x = 0 and ΣF_y = 0</strong><br><em>Key:</em> ΣF_x = the sum of horizontal components (N); ΣF_y = the sum of vertical components (N). Both must vanish for a body at rest, alongside the moments condition — three equations in total, which is why a question can ask for two unknown reactions.</p>
<p><strong>R₁ + R₂ = W + loads</strong><br><em>Key:</em> R₁, R₂ = the reaction forces at the two supports (N); W = the beam's own weight (N), acting at its centre of gravity if uniform; loads = any added weights (N). Vertical equilibrium gives the total reaction, and moments then split it between the supports.</p>
<p><strong>uniform beam: weight acts at its midpoint; non-uniform: at the stated centre of gravity</strong><br><em>Key:</em> the midpoint is L/2 from either end, where L = the beam's length (m); the centre of gravity is the single point through which the whole weight acts. Treating a non-uniform beam as uniform is the assumption that silently breaks the moment equation.</p>
<p><strong>three coplanar forces in equilibrium form a closed triangle</strong><br><em>Key:</em> each side of the triangle represents one force's magnitude and direction, in newtons, drawn nose to tail. It is a graphical check on a resolved solution and the fastest route when exactly three forces act and two angles are known.</p>

<h3>Resolving and connected problems</h3>
<p><strong>T₁ cos α = T₂ cos β and T₁ sin α + T₂ sin β = W</strong><br><em>Key:</em> T₁, T₂ = the tensions in two ropes (N); α (alpha), β (beta) = the angles each rope makes with the horizontal (degrees); W = the hanging weight (N). The first equation says the horizontal pulls cancel; the second says the vertical components together carry the weight.</p>
<p><strong>component along a slope = W sin θ, perpendicular = W cos θ</strong><br><em>Key:</em> W = the weight of the body (N), W = mg with m in kg and g = 9.8 m s⁻²; θ = the angle of the slope to the horizontal. The two swap if θ is measured from the vertical, and on a rough slope the perpendicular component is what sets the normal reaction R = W cos θ.</p>
<p><strong>limiting friction F = μR, and a body stays at rest on a slope when μ ≥ tan θ</strong><br><em>Key:</em> F = the friction force (N); μ (mu) = the coefficient of friction, dimensionless; R = the normal reaction (N); θ = the slope angle. At the point of slipping friction reaches μR; below it friction takes only the value needed to hold the body, so quoting μR for a body at rest is wrong.</p>`,
  },

  /* ── Chemistry OL: chemical energetics ───────────────────────────────── */
  "898a04b7-907b-40f2-b919-a7beca60be7d": {
    slug: "chem-ol-energetics",
    html: `${HEAD}
<h3>Enthalpy change and the two directions</h3>
<p><strong>ΔH = H(products) − H(reactants)</strong><br><em>Key:</em> ΔH (delta H) = the enthalpy change of the reaction (kJ mol⁻¹); H = the enthalpy (heat content) of each side (kJ mol⁻¹). A negative ΔH means the products sit lower in energy and heat is released (exothermic); a positive ΔH means energy is absorbed (endothermic). The sign is part of the answer, not a decoration.</p>
<p><strong>ΔH = energy needed to break bonds − energy released forming bonds</strong><br><em>Key:</em> the first term is the sum of the bond energies of every bond broken (kJ mol⁻¹); the second is the sum for every bond made. Breaking bonds always absorbs energy and making them always releases it, so this subtraction is the whole calculation — an answer with the wrong sign almost always means the two totals were swapped.</p>
<p><strong>ΔH = Σ(bond energy × number of that bond) for reactants − the same sum for products</strong><br><em>Key:</em> bond energy (kJ mol⁻¹) is the energy to break one mole of that bond in the gas phase; the multiplier is how many of that bond appear in the balanced equation. CO₂ contains two C=O bonds and each water molecule two O–H bonds, which is where the counting marks are won or lost.</p>
<p><strong>Eₐ = the height of the energy barrier from reactants to the transition state</strong><br><em>Key:</em> Eₐ = the activation energy (kJ mol⁻¹); the transition state is the peak of the reaction pathway diagram. It is independent of ΔH: a reaction can be strongly exothermic and still have a large Eₐ, which is why a mixture can be thermodynamically favourable and yet not react at room temperature.</p>

<h3>Measuring an enthalpy change</h3>
<p><strong>q = m c ΔT</strong><br><em>Key:</em> q = the heat energy transferred (J); m = the mass of the substance heated (g), usually the water or solution; c = the specific heat capacity (J g⁻¹ K⁻¹), 4.18 for water; ΔT = the temperature rise (K or °C, since a difference is the same in both). Using the mass of the fuel instead of the water it heated is the classic error.</p>
<p><strong>ΔH = −q/n, with n = m/M</strong><br><em>Key:</em> ΔH = the enthalpy change per mole (kJ mol⁻¹, so divide q by 1000 as well); q = the heat measured (J); n = the number of moles reacting (mol); m = the mass of the limiting reactant (g); M = its molar mass (g mol⁻¹). The minus sign appears because an exothermic reaction warms the surroundings: q is positive for the water, so ΔH is negative for the reaction.</p>
<p><strong>n = m/M, and for a solution n = c × V/1000</strong><br><em>Key:</em> n = amount of substance (mol); m = mass (g); M = molar mass (g mol⁻¹); c = concentration (mol dm⁻³); V = volume (cm³). The division by 1000 converts cm³ to dm³; forgetting it makes the answer a thousand times too small.</p>

<h3>Comparing and using the numbers</h3>
<p><strong>mean bond energy is an average over many compounds, so a ΔH from bond energies is an estimate</strong><br><em>Key:</em> a mean bond energy (kJ mol⁻¹) is the average energy needed to break that bond across a range of molecules, because the same bond is not equally strong in every compound. That is why a bond-energy ΔH differs by a few kJ mol⁻¹ from a calorimetric one, and the difference is a legitimate exam point rather than an error.</p>
<p><strong>energy released per gram = |ΔH|/M</strong><br><em>Key:</em> ΔH = the enthalpy change (kJ mol⁻¹); M = molar mass (g mol⁻¹); the result is in kJ g⁻¹. It is how two fuels are compared fairly — a fuel with a large ΔH per mole may release less per gram if its molecules are heavy.</p>
<p><strong>exothermic: ΔH &lt; 0, surroundings warm; endothermic: ΔH &gt; 0, surroundings cool</strong><br><em>Key:</em> ΔH = the enthalpy change (kJ mol⁻¹) with its sign; the temperature change of the surroundings is the observable. The reaction's sign and the thermometer's direction are opposites for an exothermic change, which is exactly the confusion the minus sign in ΔH = −q/n exists to prevent.</p>`,
  },

  /* ── Chemistry AS: halogenoalkanes, alcohols and spectra ─────────────── */
  "77dc68f0-c9d0-4be8-9750-22f6d69602de": {
    slug: "chem-as-organic-reactions",
    html: `${HEAD}
<p>Organic equations carry their conditions: the reagent, the solvent and the temperature decide which of two competing reactions happens. Each line below is written with those conditions named, because "hydroxide" alone is worth nothing when hot aqueous hydroxide substitutes and hot ethanolic hydroxide eliminates.</p>
<h3>Halogenoalkanes: substitution and elimination</h3>
<p><strong>R–X + OH⁻(aq) → R–OH + X⁻ (aqueous NaOH, heat under reflux)</strong><br><em>Key:</em> R = the alkyl group; X = the halogen atom being replaced (Cl, Br or I); the nucleophile is the hydroxide ion, shown with its lone pair attacking the electron-poor carbon. This is nucleophilic substitution and gives an alcohol; the halide ion leaves as the leaving group.</p>
<p><strong>R–X + OH⁻(ethanol) → alkene + H₂O + X⁻ (ethanolic NaOH or KOH, hot)</strong><br><em>Key:</em> the same reagents in a different solvent give elimination instead of substitution; the hydroxide acts as a base and removes a hydrogen from the adjacent carbon. Naming the solvent in the answer is worth a mark, because it is the only thing that distinguishes the two reactions.</p>
<p><strong>R–X + NH₃(excess) → R–NH₂ + HX (ethanol solvent, heat under pressure)</strong><br><em>Key:</em> ammonia is the nucleophile; excess ammonia favours the primary amine and limits further substitution to secondary and tertiary amines. The ethanol solvent dissolves both the halogenoalkane and the ammonia, which do not mix otherwise.</p>
<p><strong>R–X + CN⁻ → R–CN + X⁻ (ethanolic KCN, heat under reflux)</strong><br><em>Key:</em> the cyanide ion is the nucleophile and the product is a nitrile, which has one more carbon than the starting halogenoalkane. It is the standard carbon-chain-lengthening step, and hydrolysis of the nitrile afterwards gives a carboxylic acid.</p>
<p><strong>rate of hydrolysis: primary &gt; secondary &gt; tertiary for Sₙ2, reversed for Sₙ1</strong><br><em>Key:</em> a primary halogenoalkane has little steric hindrance, so the Sₙ2 mechanism is fast; a tertiary one stabilises the carbocation, so Sₙ1 dominates. The C–X bond strength also matters — the iodide is hydrolysed fastest because the C–I bond is weakest, which the silver nitrate test shows as a precipitate of AgX forming sooner.</p>
<p><strong>R–X + AgNO₃(aq in ethanol) → AgX(s) precipitate</strong><br><em>Key:</em> AgX = the silver halide precipitate; its colour identifies the halide — white for AgCl, cream for AgBr, yellow for AgI. The time to form the precipitate ranks the rates, and warming is needed because the reaction is slow at room temperature.</p>

<h3>Alcohols: preparation, dehydration and oxidation</h3>
<p><strong>R–OH + HX → R–X + H₂O (concentrated HBr or HCl, or PCl₅, or SOCl₂)</strong><br><em>Key:</em> the hydroxyl group is replaced by a halogen; concentrated hydrohalic acid, phosphorus pentachloride or thionyl chloride all do it. With PCl₅ the tell-tale is misty fumes of HCl, which is the test for an –OH group.</p>
<p><strong>R–OH → alkene + H₂O (concentrated H₂SO₄, 170 °C)</strong><br><em>Key:</em> this is dehydration, an elimination of water from the alcohol; the acid is a catalyst, so it is not consumed. Below about 140 °C the same reagents give an ether instead, which is why the temperature is part of the answer.</p>
<p><strong>primary alcohol + [O] → aldehyde + H₂O, then aldehyde + [O] → carboxylic acid</strong><br><em>Key:</em> [O] represents the oxidising agent, acidified potassium dichromate(VI); distilling the aldehyde out as it forms stops it oxidising further, while refluxing gives the acid. The colour change is orange to green, not a precipitate.</p>
<p><strong>secondary alcohol + [O] → ketone + H₂O; tertiary alcohols resist oxidation</strong><br><em>Key:</em> a secondary alcohol has one hydrogen on the carbon bearing the –OH, so one oxidation step is possible and the product is a ketone; a tertiary alcohol has none, so it survives hot acidified dichromate entirely. That difference is the chemical test for the three classes.</p>
<p><strong>RCOOH + R′OH ⇌ RCOOR′ + H₂O (concentrated H₂SO₄, heat)</strong><br><em>Key:</em> the product is an ester; the reaction is an equilibrium, so the acid catalyst removes water or an excess of one reactant pushes it right. Esters are recognised by their sweet smell and by the hydrolysis that reverses this equation.</p>

<h3>Spectra: the numbers worth knowing</h3>
<p><strong>infrared: O–H (alcohol) 2500–3300 cm⁻¹ broad; C=O 1680–1750 cm⁻¹ strong; C–H 2850–3300 cm⁻¹</strong><br><em>Key:</em> the wavenumber axis runs right to left in cm⁻¹; a broad O–H absorption is the alcohol, and a sharp strong C=O is the carbonyl. A carboxylic acid shows both, which is how it is distinguished from an alcohol or a ketone on one spectrum.</p>
<p><strong>mass spectrometry: the molecular ion peak M⁺ gives the relative molecular mass</strong><br><em>Key:</em> M⁺ = the peak from the molecule minus one electron, at m/z equal to Mr; the M+1 peak's size reflects the number of carbon atoms. Fragmentation peaks below it identify the groups lost, which is the evidence used to propose a structure.</p>`,
  },

  /* ── Computer Science OL: hardware architecture ──────────────────────── */
  "fc1ffd6d-f913-4c5a-9336-ec908c9223ec": {
    slug: "cs-ol-hardware",
    html: `${HEAD}
<h3>The processor: what the numbers mean</h3>
<p><strong>instructions per second = clock speed / cycles per instruction</strong><br><em>Key:</em> clock speed = the number of clock cycles per second (Hz, so 2.0 GHz = 2.0 × 10⁹ Hz); cycles per instruction (CPI) = the average number of clock cycles one instruction needs, a pure number; the result is in instructions per second. A higher clock speed does not automatically mean a faster processor: the instruction count and the CPI both count, which is why a 2 GHz chip with CPI 2 matches a 1 GHz chip with CPI 1.</p>
<p><strong>time for a program = (number of instructions × CPI) / clock speed</strong><br><em>Key:</em> the numerator is the total cycles needed (a count); the denominator is cycles per second (Hz); the quotient is in seconds. This is the equation behind every "which processor is faster" comparison, and the one that shows cache size and core count acting through CPI.</p>
<p><strong>number of addressable memory locations = 2ⁿ, where n = the width of the address bus in bits</strong><br><em>Key:</em> n = the number of address lines; each line carries one bit, so n lines select 2ⁿ distinct addresses. An 8-bit address bus therefore addresses 256 locations, and adding one address line doubles the addressable memory.</p>
<p><strong>maximum value in a word of n bits = 2ⁿ − 1</strong><br><em>Key:</em> n = the number of bits in the register or data bus; the values run from 0 to 2ⁿ − 1, and an overflow occurs when a result needs n + 1 bits. Confusing 2ⁿ with 2ⁿ − 1 is the commonest off-by-one in the topic.</p>

<h3>Storage capacity and transfer</h3>
<p><strong>file size (bytes) = width × height × colour depth / 8</strong><br><em>Key:</em> width, height = the image dimensions in pixels; colour depth = bits per pixel; dividing by 8 converts bits to bytes. Doubling the colour depth doubles the file; doubling both dimensions quadruples it.</p>
<p><strong>storage capacity = number of blocks × block size</strong><br><em>Key:</em> a block (or cluster) is the smallest unit the file system allocates; block size is in bytes or sectors. Capacity questions usually need the answer in GB or TB, so divide by 10⁹ or 10¹² (or by 2³⁰ for GiB) and say which convention you used.</p>
<p><strong>data transfer rate = data transferred / time</strong><br><em>Key:</em> data in bits or bytes, time in seconds, giving bit s⁻¹ or B s⁻¹; multiply by 8 to move between bits and bytes. A link quoted in Mbps and a file quoted in MB differ by that factor of 8, which is the classic interface-speed trap.</p>

<h3>Making it faster, and where the numbers come from</h3>
<p><strong>performance gains from: higher clock speed, more cores, larger cache, wider data bus, pipelining</strong><br><em>Key:</em> clock speed raises cycles per second; cores allow real parallelism; cache reduces average memory access time by keeping frequently used data on-chip; a wider data bus moves more bits per transfer. Each affects a different term in the time equation above, so name the term rather than the component.</p>
<p><strong>RAM is volatile and holds the currently running programs and their data; ROM is non-volatile and holds the bootstrap</strong><br><em>Key:</em> volatile = loses its contents when power is removed; non-volatile = keeps them. Both are primary storage and both are directly addressable by the processor, which is what distinguishes them from secondary storage such as an SSD.</p>
<p><strong>secondary storage is measured by capacity, read/write speed, portability, durability and cost per GB</strong><br><em>Key:</em> capacity in bytes; speed in MB s⁻¹ or IOPS; cost per GB in currency per gigabyte. A storage recommendation question wants two of these criteria named and compared, not a single adjective such as "fast".</p>`,
  },

  /* ── Computer Science AS: information representation ─────────────────── */
  "38530bbf-b762-49dc-9a91-707b477f6a0c": {
    slug: "cs-as-information-representation",
    html: `${HEAD}
<h3>Place value and base conversion</h3>
<p><strong>value = Σ dᵢ × bⁱ</strong><br><em>Key:</em> dᵢ = the digit in position i, counted from 0 at the right; b = the base (2, 10 or 16); i = the position index, so the rightmost digit is multiplied by b⁰ = 1. The same sum reads 1011₂ as 11 and AD₁₆ as 173 — the base alone changes.</p>
<p><strong>one hexadecimal digit = four binary digits</strong><br><em>Key:</em> hex digits run 0–9 then A–F, where A = 10 and F = 15; four bits hold exactly 16 values, so the mapping is one-to-one. Converting through hex is how long binary strings are written without losing a digit.</p>
<p><strong>repeated division by b, reading the remainders upwards</strong><br><em>Key:</em> b = the target base (2 for binary, 16 for hex); each remainder is one digit, the first remainder being the least significant. Division stops when the quotient reaches zero, and the answer is read from the bottom of the column upwards.</p>
<p><strong>unsigned range with n bits: 0 to 2ⁿ − 1</strong><br><em>Key:</em> n = the number of bits available; 2ⁿ counts the patterns and the − 1 is because zero is one of them. An 8-bit unsigned byte holds 0 to 255, which is why a sum above 255 in an 8-bit register overflows.</p>

<h3>Signed integers and fractional numbers</h3>
<p><strong>two's complement value = −d₍ₙ₋₁₎2ⁿ⁻¹ + Σ dᵢ2ⁱ for i = 0 to n − 2</strong><br><em>Key:</em> d₍ₙ₋₁₎ = the most significant bit, which carries a negative weight; n = the word length; the remaining bits keep their positive weights. This is why 1100 1011 is −53 and not 203, and why the leading bit is called the sign bit.</p>
<p><strong>two's complement range with n bits: −2ⁿ⁻¹ to 2ⁿ⁻¹ − 1; negate by inverting every bit and adding 1</strong><br><em>Key:</em> n = the word length; the asymmetric range has one more negative value than positive, because zero occupies a pattern. In 8 bits that is −128 to 127, and the negation rule works for every value except −128 itself.</p>
<p><strong>fixed point: value = integer/2ᶠ, f = the number of fractional bits</strong><br><em>Key:</em> integer = the stored bit pattern read as a whole number; f = how many of those bits lie right of the binary point; the result has 2⁻ᶠ resolution. Fixed point is fast and exact but cannot span both very large and very small values, which is what floating point buys.</p>
<p><strong>floating point: value = (−1)ˢ × 1.M × 2^(E − bias)</strong><br><em>Key:</em> s = the sign bit (0 positive, 1 negative); 1.M = the normalised mantissa with its implicit leading 1 followed by the stored fraction; E = the stored exponent; bias = the offset added so the exponent can be negative. More mantissa bits give precision, more exponent bits give range — the trade every floating-point format makes.</p>

<h3>Text, images, sound and compression</h3>
<p><strong>image file size (bits) = width × height × colour depth; bytes = that ÷ 8</strong><br><em>Key:</em> width, height in pixels; colour depth in bits per pixel, so 24-bit true colour allows 2²⁴ colours. Metadata and compression mean the stored file can be smaller than this raw figure, which is why questions say "uncompressed".</p>
<p><strong>sound file size (bits) = sample rate × bit depth × channels × duration</strong><br><em>Key:</em> sample rate in samples per second (Hz); bit depth in bits per sample; channels = 1 mono or 2 stereo; duration in seconds. Doubling the sample rate doubles the file and improves the highest frequency that can be captured, which is the Nyquist argument.</p>
<p><strong>compression ratio = original size / compressed size; percentage saved = (1 − compressed/original) × 100</strong><br><em>Key:</em> both sizes in the same unit (bytes); a ratio of 4:1 means the file is a quarter of its raw size. Lossless compression preserves every bit, lossy discards detail the eye or ear is unlikely to notice.</p>
<p><strong>character codes: ASCII uses 7 bits for 128 characters; Unicode uses a variable number of bits for over 140,000</strong><br><em>Key:</em> ASCII's 128 patterns cover English letters, digits and punctuation; Unicode extends the same idea to every writing system, with UTF-8 encoding a character in 1 to 4 bytes. A file's size in a code depends on the encoding, not just the character count.</p>`,
  },

  /* ── Computer Science A2: abstract data types ────────────────────────── */
  "c015774f-319c-423f-94e2-c1b6a3505c70": {
    slug: "cs-a2-adts",
    html: `${HEAD}
<h3>Complexity: the vocabulary the questions use</h3>
<p><strong>growth order = 1, then log n, then n, then n log n, then n²</strong><br><em>Key:</em> n = the size of the data set; log = the base-2 logarithm, the number of times n can be halved. The ordering is what "which is more efficient" means: an O(n²) algorithm that wins at n = 10 loses badly at n = 10,000.</p>
<p><strong>two nested loops over the same n: work = n × n = O(n²); halving each step: work = O(log n)</strong><br><em>Key:</em> n = the number of items; a loop inside a loop multiplies the counts, while repeatedly dividing by two counts the halvings. Binary search is O(log n) because each comparison removes half the remaining items.</p>
<p><strong>binary search worst case = O(log₂ n), on sorted data only; linear search = O(n) on any data</strong><br><em>Key:</em> log₂ n = the number of halvings needed to reach one item, so 1,000 items need about 10 comparisons. The speed costs the sort, and being able to name that trade is the mark.

<h3>Linear structures</h3>
<p><strong>stack: push = O(1), pop = O(1), access order = LIFO</strong><br><em>Key:</em> LIFO = last in, first out; only the top element is accessible, so no traversal is needed for either operation. Used for function call frames, undo histories and expression evaluation.</p>
<p><strong>queue: enqueue = O(1), dequeue = O(1), access order = FIFO</strong><br><em>Key:</em> FIFO = first in, first out; a circular queue avoids the wasted space a linear array queue leaves behind. Used for print spools, task scheduling and buffering.</p>
<p><strong>linked list: traversal = O(n), insertion or deletion at a known node = O(1)</strong><br><em>Key:</em> n = the number of nodes; each node holds data plus a pointer to the next, so no shifting is needed on insertion, but reaching the position costs the traversal. There is no random access, which is the trade against an array.</p>
<p><strong>array: random access = O(1), insertion or deletion = O(n) because the elements shift</strong><br><em>Key:</em> random access means indexing directly by position, which is constant time; shifting is what costs the linear pass. That comparison — constant-time read versus constant-time insert — is the standard "choose a structure" answer.</p>

<h3>Trees, hash tables and ordering</h3>
<p><strong>binary tree: maximum nodes = 2ʰ − 1; balanced search = O(log n), degenerate = O(n)</strong><br><em>Key:</em> h = the number of levels, counting the root as level 1; each node has at most two children. Balance is what delivers the log: a tree shaped like a list degrades to the cost of a linked list.</p>
<p><strong>hash table: average insert and lookup = O(1), worst case = O(n), load factor = items/buckets</strong><br><em>Key:</em> the load factor measures how full the table is, and above about 0.7 collisions climb and performance falls towards O(n). A collision resolution policy — chaining or open addressing — is what keeps the average near constant.</p>
<p><strong>sorting: bubble = O(n²), insertion = O(n²), merge = O(n log n), quicksort average = O(n log n)</strong><br><em>Key:</em> n = the number of items; the quadratic sorts do about n²/2 comparisons, the divide-and-conquer sorts log n levels of n work. Space is the second axis: merge sort needs O(n) extra storage while quicksort sorts in place.</p>
<p><strong>adjacency matrix space = O(n²); adjacency list space = O(n + e), with e = the number of edges</strong><br><em>Key:</em> n = the number of vertices; e = the number of edges connecting them. A matrix answers "is there an edge" in O(1) but wastes space on sparse graphs; a list saves space and costs a scan of one vertex's neighbours.</p>`,
  },
};

module.exports = { sections };
