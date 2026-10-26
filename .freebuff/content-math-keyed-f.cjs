// Keyed equation sheets — sixth tranche: the worst unkeyed note in each of
// Mathematics A2, Mathematics OL and Physics A2.
//
//   A2 Maths   A Level Mathematics: Sequences and Series                  (48 formula lines, no key)
//   A2 Maths   A Level Mathematics: Vectors                               (42)
//   OL Maths   Cambridge IGCSE Mathematics: Area, Perimeter and Volume    (47)
//   OL Maths   Cambridge IGCSE Mathematics: Angles, Polygons and Circles  (38)
//   A2 Physics Electric Fields and Capacitance                            (43)
//   A2 Physics Circular Motion and Gravitational Fields                   (41)
//
// House rules as content-math-keyed-a..e.cjs: `<h2>Equations and symbols</h2>`,
// one `<p>` per equation, `<em>Key:</em>` inside that same paragraph naming every
// symbol with its unit, Unicode notation (no LaTeX delimiters, no backticks),
// appended rather than rewritten. Ids are study_materials ids.
//
// Apply with:
//   node .freebuff/append-note-sections.cjs .freebuff/content-math-keyed-f.cjs
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/note-formulas.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/note-formulas.sql --apply    (live)

const HEAD = `<h2>Equations and symbols</h2>
<p>Every relation this topic is examined on, written with its real notation and followed by a key naming each symbol, its unit and what it means. The sections above explain why each one is true; this sheet is the version to revise from, where the answer depends on reproducing the exact form and substituting into it without losing a unit.</p>`;

const sections = {
  /* ── Mathematics A2: sequences and series ─────────────────────────────── */
  "50449486-6299-42c5-9454-bfe5811a2e68": {
    slug: "maths-a2-sequences",
    html: `${HEAD}
<h3>Arithmetic and geometric, in both directions</h3>
<p><strong>uₙ = a + (n − 1)d and Sₙ = (n/2)(2a + (n − 1)d) = (n/2)(a + l)</strong><br><em>Key:</em> uₙ = the nth term; a = the first term; d = the common difference, uₙ₊₁ − uₙ; n = the term number; Sₙ = the sum of the first n terms; l = the last term included, uₙ. The (n − 1) is why the first term has no d added, and the second sum form is Gauss's pairing of the ends.</p>
<p><strong>uₙ = a rⁿ⁻¹ and Sₙ = a(1 − rⁿ)/(1 − r), r ≠ 1</strong><br><em>Key:</em> a = the first term; r = the common ratio, uₙ₊₁/uₙ; n = the number of terms; Sₙ = the sum of the first n. Each step multiplies by r, so the power is one less than the term number; r = 1 makes every term a and the sum na, which is the excluded case.</p>
<p><strong>S∞ = a/(1 − r), valid only for |r| &lt; 1</strong><br><em>Key:</em> S∞ = the sum to infinity; a = the first term; r = the common ratio. The condition is part of the answer, not a footnote: at |r| ≥ 1 the terms do not shrink and no finite sum exists, so writing the value without the condition loses a mark.</p>
<p><strong>remainder after n terms = S∞ − Sₙ = a rⁿ/(1 − r)</strong><br><em>Key:</em> S∞ = the infinite sum, a and r as above; Sₙ = the sum of the first n; the difference is the tail still to be added. It shrinks geometrically, which is the algebraic form of the convergence argument.</p>
<p><strong>arⁿ⁻¹ = X ⇒ n = 1 + log(X/a)/log r</strong><br><em>Key:</em> a = the first term; r = the common ratio, r &gt; 0 for this form; X = the value of the term whose position is wanted; n = that position. Taking logarithms is the only way to free n from the exponent, and rounding up is usually required because n must be a whole number of terms.</p>

<h3>Recurrence relations and their closed forms</h3>
<p><strong>uₙ₊₁ = a uₙ + b ⇒ limit L = b/(1 − a), reached only when |a| &lt; 1</strong><br><em>Key:</em> uₙ = the current term; a = the multiplier; b = the constant added; L = the fixed point, the value satisfying L = aL + b. A recurrence with |a| &lt; 1 creeps towards L without reaching it, one with |a| &gt; 1 diverges, and |a| = 1 either repeats or drifts linearly.</p>
<p><strong>uₙ = aⁿ⁻¹(u₁ − L) + L</strong><br><em>Key:</em> u₁ = the given first term; a, b = the recurrence constants; L = its fixed point b/(1 − a); n = the term number. Subtracting the limit turns the recurrence into a geometric sequence, which is why the closed form has this shape — it is the bridge between the two halves of the topic.</p>
<p><strong>|uₙ − L| = |a|ⁿ⁻¹|u₁ − L|</strong><br><em>Key:</em> L = the limit; a = the recurrence multiplier; u₁ = the first term; the modulus is the distance from the limit after n terms. It is how "how many terms until it is within 0.01 of the limit" is answered, by solving an inequality in n with logarithms.</p>

<h3>Sums in sigma notation</h3>
<p><strong>Σ_{r=1}^{n} r = n(n + 1)/2, Σ r² = n(n + 1)(2n + 1)/6, Σ r³ = [n(n + 1)/2]²</strong><br><em>Key:</em> Σ = the sum; r = the index running from 1 to n; n = the last index. The three standard results every polynomial sum is built from; the cube sum being the square of the linear sum is worth recognising as a check.</p>
<p><strong>Σ_{r=1}^{n} (A r + B) = A n(n + 1)/2 + B n</strong><br><em>Key:</em> A, B = constants; r = the index; n = the number of terms. Sums are linear, so a linear expression splits into the standard r-sum plus a repeated constant — no new formula needed.</p>
<p><strong>Σ_{r=m}^{n} f(r) = Σ_{r=1}^{n} f(r) − Σ_{r=1}^{m−1} f(r)</strong><br><em>Key:</em> m = the first index wanted; n = the last; f = the term expression. Subtracting two running totals is the safe way to handle a sum that does not start at 1, rather than re-deriving.</p>

<h3>Models and disguised series</h3>
<p><strong>0.ẋẏ̇ = a/(1 − r) with a = the repeating block over its place value and r = 10⁻ᵏ</strong><br><em>Key:</em> a = the first occurrence of the repeating block as a decimal; r = the ratio between consecutive blocks (10⁻² for a two-digit block, 10⁻³ for three); k = the block length. Every recurring decimal is a geometric series, which is why the fraction is always a rational number.</p>
<p><strong>appreciation or depreciation: Aₙ = A₀(1 ± p/100)ⁿ</strong><br><em>Key:</em> Aₙ = the value after n periods; A₀ = the starting value, in the currency unit; p = the percentage change per period; n = the number of periods. It is a geometric sequence with r = 1 ± p/100, so the same convergence and log methods apply.</p>
<p><strong>loan or savings balance: Bₙ₊₁ = Bₙ(1 + i) − R</strong><br><em>Key:</em> Bₙ = the balance after n payments, in currency; i = the interest rate per period as a decimal; R = the fixed repayment or withdrawal. This is uₙ₊₁ = auₙ + b with a = 1 + i and b = −R, so its long-term behaviour and closed form come straight from the recurrence results above.</p>`,
  },

  /* ── Mathematics A2: vectors ──────────────────────────────────────────── */
  "7ff7a883-b6e3-483a-aa83-bea75fbfc73f": {
    slug: "maths-a2-vectors",
    html: `${HEAD}
<h3>Components, magnitude and the unit vector</h3>
<p><strong>a = (x; y) and |a| = √(x² + y²); in three dimensions a = (x; y; z) and |a| = √(x² + y² + z²)</strong><br><em>Key:</em> a = the vector; x, y (and z) = its components along each axis, in the units of the problem; |a| = the magnitude, the length of the arrow, in those same units. The column form (x; y) is the house convention — the first entry is horizontal and the second vertical. The modulus is Pythagoras applied once per dimension.</p>
<p><strong>â = a/|a|, with |â| = 1</strong><br><em>Key:</em> â (a-hat) = the unit vector in the direction of a; |a| = the magnitude of a, which must be non-zero. It keeps the direction and discards the length, which is how a direction is quoted independently of how far it is travelled; the check is that its components square and sum to 1.</p>
<p><strong>a ± b = (x₁ ± x₂; y₁ ± y₂) and k a = (k x₁; k y₁)</strong><br><em>Key:</em> a, b = two vectors; x₁, x₂ = their components along the same axis; k = a scalar multiplier, which may be negative. Addition is component by component; multiplying by k scales the length by |k| and reverses the direction when k &lt; 0.</p>

<h3>Displacement, position and the line</h3>
<p><strong>AB = b − a, so |AB| = |b − a|</strong><br><em>Key:</em> AB = the vector from point A to point B (with an arrow over it in handwriting); a, b = the position vectors of A and B measured from the origin. "Head minus tail" is the rule; reversing the subtraction gives BA, which is the same length in the opposite direction.</p>
<p><strong>r = a + t d</strong><br><em>Key:</em> r = the position vector of a general point on the line; a = the position vector of a known point on it; d = a direction vector along the line; t = a scalar parameter with no unit. Every value of t gives one point, so the line is the set of all such r; parallel lines have parallel d, and a point lies on the line only if its vector satisfies the equation for some single t.</p>
<p><strong>r = a + t(b − a)</strong><br><em>Key:</em> a, b = the position vectors of two points on the line; t = the parameter, with t = 0 at A and t = 1 at B. The direction is the displacement between the two given points, which is why two points are enough to write the line.</p>
<p><strong>angle between two lines: cos θ = (d₁·d₂)/(|d₁||d₂|)</strong><br><em>Key:</em> d₁, d₂ = the direction vectors of the two lines; θ = the acute angle between them, in degrees or radians. Only the directions matter, so any scalar multiple of either d gives the same angle — take the acute value by using the modulus of the dot product.</p>

<h3>The scalar product and what it measures</h3>
<p><strong>a·b = x₁x₂ + y₁y₂ (+ z₁z₂) = |a||b| cos θ</strong><br><em>Key:</em> a·b = the scalar (dot) product, a pure number with no direction; x₁, x₂ = the components of a and b along each shared axis; |a|, |b| = the magnitudes; θ = the angle between the two vectors. The two expressions are the same quantity: components for arithmetic, magnitudes for geometry.</p>
<p><strong>a ⟂ b ⇔ a·b = 0</strong><br><em>Key:</em> ⟂ means perpendicular; a·b = the dot product. When θ = 90°, cos θ = 0, so the product vanishes — the quickest perpendicularity test there is, and the first line of every "find the foot of the perpendicular" question.</p>
<p><strong>a ∥ b ⇔ a = k b for some scalar k</strong><br><em>Key:</em> ∥ means parallel; k = the scale factor between them, positive for the same direction and negative for opposite. Component ratios being equal is the practical test, and a dot-product check should never be used for parallelism.</p>
<p><strong>projection of a on b: scalar a·b/|b|, vector ((a·b)/|b|²) b</strong><br><em>Key:</em> a = the vector being projected; b = the direction projected onto; the scalar version is a signed length along b's direction, in the units of a; the vector version is that length times a unit vector. It is how a component along a given direction is extracted without drawing a triangle.</p>
<p><strong>area of the parallelogram on a and b = |a||b| sin θ</strong><br><em>Key:</em> a, b = the two vectors spanning the parallelogram; θ = the angle between them; the area is in squared units. Since sin²θ = 1 − cos²θ, the area can be recovered from the dot product alone when θ is not given.</p>`,
  },

  /* ── Mathematics OL: mensuration ──────────────────────────────────────── */
  "dce98df1-2982-40df-ab8c-b849b8d78ee1": {
    slug: "maths-ol-mensuration",
    html: `${HEAD}
<h3>Plane shapes: perimeter and area</h3>
<p><strong>rectangle: P = 2(l + w), A = l w</strong><br><em>Key:</em> l = length (cm, m); w = width, in the same unit; P = perimeter, in that unit; A = area, in the matching square unit (cm², m²). Both dimensions must be converted to the same unit before multiplying — a mixed mm and cm rectangle is the commonest unit slip.</p>
<p><strong>triangle: A = ½ × base × perpendicular height</strong><br><em>Key:</em> base = any side, in cm or m; perpendicular height = the distance from the opposite vertex to that side, measured at 90°. A slanted side is not a height; the words "perpendicular height" are the instruction.</p>
<p><strong>parallelogram: A = b h; trapezium: A = ½(a + b)h</strong><br><em>Key:</em> b = base; h = perpendicular height in both; a, b = the two parallel sides of the trapezium, in the same unit. The trapezium formula is the average of the parallel sides times the distance between them, which is why it also handles a triangle when one of them is zero.</p>
<p><strong>circle: C = 2πr = πd, A = πr²</strong><br><em>Key:</em> r = radius; d = diameter, so d = 2r; π = 3.14159…; C = circumference (cm); A = area (cm²). The radius is squared in the area and only doubled in the circumference — using r² in both, or d in the area, is the standard confusion.</p>
<p><strong>sector: arc length = (θ/360) × 2πr, area = (θ/360) × πr², perimeter = arc + 2r</strong><br><em>Key:</em> θ (theta) = the angle at the centre in degrees; r = radius; the fractions are of the whole circle. The perimeter of a sector includes the two radii, which is the term most often omitted.</p>

<h3>Solids: volume and surface area</h3>
<p><strong>prism or cylinder: V = A × h and V = πr²h</strong><br><em>Key:</em> A = the area of the constant cross-section (cm²); h = the length or height (cm); r = the radius of a circular cross-section; V = volume (cm³). A prism is any solid with the same cross-section throughout, so the first formula covers cuboids, triangular prisms and cylinders alike.</p>
<p><strong>cone: V = ⅓πr²h, curved surface = πrl; sphere: V = (4/3)πr³, surface = 4πr²</strong><br><em>Key:</em> r = radius; h = perpendicular height of the cone; l = the slant height, l = √(r² + h²); π = 3.14159…. The ⅓ appears in the cone and pyramid volumes and nowhere else; l is a slant length, never h.</p>
<p><strong>cuboid: surface area = 2(lw + lh + wh)</strong><br><em>Key:</em> l, w, h = the three dimensions, in the same unit; the result is in square units. Three pairs of identical faces, which is why each product is doubled — counting six faces individually gets the same answer and fewer marks for method.</p>
<p><strong>pyramid: V = ⅓ × base area × perpendicular height</strong><br><em>Key:</em> base area = the area of the polygon forming the base (cm²); perpendicular height = the vertical distance from apex to base, not a slant edge. Slant heights belong to the triangular faces' areas, not the volume.</p>
<p><strong>density = mass/volume, so mass = density × volume</strong><br><em>Key:</em> density in g/cm³ or kg/m³; mass in g or kg; volume in cm³ or m³. The units must be consistent: 1 g/cm³ = 1000 kg/m³, so a density given in one system with a volume in the other multiplies the answer by a thousand.</p>

<h3>Units, scaling and similar solids</h3>
<p><strong>1 m = 100 cm ⇒ 1 m² = 10⁴ cm² and 1 m³ = 10⁶ cm³</strong><br><em>Key:</em> the linear factor is squared for area and cubed for volume, so a factor of 100 becomes 10,000 and 1,000,000. Converting area with the length factor is the single most expensive unit error in the topic.</p>
<p><strong>similar solids with length ratio k: surface areas in ratio k², volumes in ratio k³</strong><br><em>Key:</em> k = the ratio of any pair of corresponding lengths (a scale factor, no unit); areas scale as the square; volumes as the cube. A model at 1:20 therefore has 1/400 of the surface area and 1/8000 of the volume, which is why a scaled-down animal cannot simply be a smaller version of the original.</p>
<p><strong>1 litre = 1000 cm³ = 1000 ml and 1 m³ = 1000 litres</strong><br><em>Key:</em> the litre is a capacity unit equal to a cubic decimetre; cm³ and ml are interchangeable. Capacity questions usually give the container's dimensions in cm and the answer in litres, so the division by 1000 is part of the answer.</p>`,
  },

  /* ── Mathematics OL: angles, polygons and circles ─────────────────────── */
  "dc3d7286-feb5-4d75-99e1-ce0941a6a237": {
    slug: "maths-ol-geometry-angles",
    html: `${HEAD}
<h3>Angle facts and parallel lines</h3>
<p><strong>angles at a point sum to 360°; angles on a straight line sum to 180°; vertically opposite angles are equal</strong><br><em>Key:</em> the angle in each case is measured in degrees at the named vertex. These three are the reason every angle chase starts by marking what is already known, not by guessing; a missing step is nearly always one of them.</p>
<p><strong>alternate angles are equal, corresponding angles are equal, co-interior angles sum to 180°</strong><br><em>Key:</em> the pairs are formed where a transversal crosses two parallel lines; alternate angles lie on opposite sides in a Z-shape, corresponding angles are in matching positions, co-interior are on the same side inside the parallel lines. Naming the reason is worth a mark on its own, so write it beside the number.</p>
<p><strong>triangle interior angles sum to 180°; exterior angle = sum of the two interior opposite angles</strong><br><em>Key:</em> interior angles are inside the triangle at each vertex; the exterior angle is formed by extending one side, and equals the sum of the two angles it does not touch. Quadrilaterals split into two triangles, so their angles sum to 360°.</p>

<h3>Polygons</h3>
<p><strong>interior angle sum = (n − 2) × 180°</strong><br><em>Key:</em> n = the number of sides of the polygon; the result is in degrees. The (n − 2) counts the triangles a polygon can be split into from one vertex, which is the derivation rather than a fact to memorise.</p>
<p><strong>exterior angles of any convex polygon sum to 360°, and for a regular polygon each exterior angle = 360°/n</strong><br><em>Key:</em> n = the number of sides; an exterior angle is the turn made at each vertex, so walking round once is a full revolution. Regularity is what makes every exterior angle equal — without it only the total is fixed.</p>
<p><strong>regular polygon: each interior angle = (n − 2) × 180°/n, and interior + exterior = 180° at each vertex</strong><br><em>Key:</em> n = the number of sides; the two angles at a vertex lie on a straight line, which is why they add to 180°. The pair gives a fast check: an interior angle of 150° means an exterior of 30°, hence n = 360/30 = 12.</p>

<h3>Circle theorems</h3>
<p><strong>angle at the centre = 2 × angle at the circumference, standing on the same arc</strong><br><em>Key:</em> both angles subtend the same chord; the centre angle is measured at the centre of the circle, the circumference angle at any point on the remaining arc. This is the theorem most others are proved from, so quote it by name.</p>
<p><strong>angle in a semicircle = 90°</strong><br><em>Key:</em> the angle is subtended by a diameter at any point on the circumference; it is the centre-angle theorem with the centre angle at 180°. Its converse is how a question proves that a triangle's longest side is a diameter.</p>
<p><strong>angles in the same segment are equal; opposite angles of a cyclic quadrilateral sum to 180°</strong><br><em>Key:</em> a cyclic quadrilateral has all four vertices on one circle; the segment angles stand on the same chord from the same side. The 180° result is the single most useful one in multi-step problems, because it turns a known angle into the one opposite it.</p>
<p><strong>tangent ⟂ radius at the point of contact; tangents from an external point are equal in length</strong><br><em>Key:</em> the tangent touches the circle at exactly one point; the radius is drawn to that point and meets it at 90°, which is what makes Pythagoras available. The equal tangents fact creates the two congruent right triangles that most tangent proofs rely on.</p>
<p><strong>alternate segment theorem: the angle between a tangent and a chord equals the angle in the alternate segment</strong><br><em>Key:</em> the chord divides the circle into two segments; the angle is measured between the tangent and the chord at the point of contact, and equals the angle subtended by that chord at any point in the opposite segment. Quote the theorem by name — the reason carries marks.</p>`,
  },

  /* ── Physics A2: electric fields and capacitance ──────────────────────── */
  "7e15d4c0-7177-419e-989b-05b5eca76131": {
    slug: "physics-a2-electric-fields",
    html: `${HEAD}
<h3>Uniform fields and the force on a charge</h3>
<p><strong>E = V/d</strong><br><em>Key:</em> E = the electric field strength (V m⁻¹, equivalently N C⁻¹); V = the potential difference between the plates (V); d = their separation (m). It holds only between parallel plates, where the field is uniform; the field points from the positive plate to the negative one, so a positive charge is pushed that way.</p>
<p><strong>F = QE and a = QE/m</strong><br><em>Key:</em> F = the force on the charge (N); Q = its charge (C), with the sign giving the direction; E = the field strength (N C⁻¹); m = the particle's mass (kg); a = its acceleration (m s⁻²). For an electron in a laboratory field the acceleration comes out enormous because m is of order 10⁻³¹ kg, which is why the path curves visibly.</p>
<p><strong>W = Q ΔV</strong><br><em>Key:</em> W = the work done moving the charge (J); Q = the charge moved (C); ΔV = the potential difference it moves through (V). The work is independent of the path in a uniform field, so the same energy is transferred however the charge gets from one plate to the other.</p>

<h3>Point charges: force, field and potential</h3>
<p><strong>F = Q₁Q₂/(4πε₀r²), with 1/(4πε₀) = 8.99 × 10⁹ N m² C⁻²</strong><br><em>Key:</em> F = the force between two point charges (N), attractive for opposite signs and repulsive for like signs; Q₁, Q₂ = the charges (C); r = the separation between their centres (m); ε₀ (epsilon nought) = 8.85 × 10⁻¹² F m⁻¹, the permittivity of free space. The inverse square is the same geometry as gravity, but the force can be repulsive, which gravity's cannot.</p>
<p><strong>E = Q/(4πε₀r²)</strong><br><em>Key:</em> E = the field strength at distance r from an isolated point charge (N C⁻¹); Q = the charge producing the field (C); r = the distance from its centre (m). Field strength is force per unit charge, so this is Coulomb's law with the test charge divided out; for a negative Q the field points towards the charge.</p>
<p><strong>V = Q/(4πε₀r)</strong><br><em>Key:</em> V = the electric potential at distance r from the charge (V, equivalently J C⁻¹); Q = the charge (C); r = the distance from it (m); the potential is taken as zero at infinity. Potential falls as 1/r while the field falls as 1/r² — a distinction examiners test directly.</p>
<p><strong>E = −dV/dr</strong><br><em>Key:</em> E = the field strength (V m⁻¹); dV/dr = the gradient of potential with distance (V m⁻¹); the minus sign means the field points towards decreasing potential. It is the electrostatic version of "field is the negative gradient of potential energy", and the reason a potential–distance graph's slope gives the field.</p>

<h3>Capacitance, energy and discharge</h3>
<p><strong>C = Q/V</strong><br><em>Key:</em> C = the capacitance (F, farads); Q = the charge stored on one plate (C); V = the potential difference across the capacitor (V). Capacitance is a property of the construction, not of how much charge happens to be on it — 1 F stores 1 C per volt.</p>
<p><strong>C = ε₀ε_r A/d</strong><br><em>Key:</em> ε₀ = 8.85 × 10⁻¹² F m⁻¹, the permittivity of free space; ε_r = the relative permittivity of the dielectric between the plates; A = the area of overlap of the plates (m²); d = their separation (m). Every "how would you increase the capacitance" answer is one of these three factors: bigger plates, closer plates, better dielectric.</p>
<p><strong>series: 1/C = 1/C₁ + 1/C₂ + …; parallel: C = C₁ + C₂ + …</strong><br><em>Key:</em> C = the total capacitance (F); C₁, C₂ = the individual capacitances. The rules are the reverse of resistors: parallel capacitors add because they share the same voltage and each stores its own charge, while series capacitors carry the same charge and split the voltage.</p>
<p><strong>W = ½QV = ½CV² = Q²/(2C)</strong><br><em>Key:</em> W = the energy stored (J); Q = the charge (C); V = the potential difference (V); C = the capacitance (F). The three forms are one expression rewritten with C = Q/V; the half is there because the voltage rises from zero as the charge is added, so the average voltage is V/2.</p>
<p><strong>Q = Q₀e^(−t/RC) and I = I₀e^(−t/RC)</strong><br><em>Key:</em> Q = the charge remaining at time t (C); Q₀ = the initial charge (C); I = the current at time t (A); I₀ = the initial current; R = the resistance in the circuit (Ω); C = the capacitance (F); t = the time since discharge began (s); e = 2.71828…. Both fall exponentially with the same time constant, which is why the current halves and the charge halves together.</p>
<p><strong>time constant τ = RC; after τ the charge has fallen to 1/e ≈ 37%, and the half-life is RC ln 2 ≈ 0.693RC</strong><br><em>Key:</em> τ (tau) = the time constant (s); R = resistance (Ω); C = capacitance (F); ln 2 = 0.693. The time constant is the natural unit of the decay, and the half-life is the version a "how long until half the charge is gone" question wants.</p>`,
  },

  /* ── Physics A2: circular motion and gravitation ──────────────────────── */
  "60c15fd5-3a9c-4466-ab16-33b4c3496232": {
    slug: "physics-a2-gravity",
    html: `${HEAD}
<h3>Circular motion, the kinematics the orbits need</h3>
<p><strong>v = ωr and ω = 2π/T</strong><br><em>Key:</em> v = the speed along the circular path (m s⁻¹); ω (omega) = the angular velocity (rad s⁻¹); r = the radius of the circle (m); T = the period of one revolution (s). Speed is constant in magnitude but the direction changes continuously, so a body in uniform circular motion is always accelerating.</p>
<p><strong>a = v²/r = ω²r, directed towards the centre; F = mv²/r</strong><br><em>Key:</em> a = the centripetal acceleration (m s⁻²); v = speed (m s⁻¹); r = radius (m); ω = angular velocity (rad s⁻¹); F = the resultant force needed (N); m = the mass (kg). The force is not an extra force: it is the net inward force supplied by gravity, tension, friction or a normal reaction, and naming which is the first line of any circular-motion answer.</p>

<h3>Gravitational force and field strength</h3>
<p><strong>F = GMm/r²</strong><br><em>Key:</em> F = the gravitational force between the two masses (N), always attractive; G = 6.67 × 10⁻¹¹ N m² kg⁻², the gravitational constant; M, m = the two masses (kg); r = the distance between their centres (m). The inverse square makes the force fall to a quarter at twice the distance, and r is measured from the centre, never the surface.</p>
<p><strong>g = GM/r², so g at a planet's surface = GM/R²</strong><br><em>Key:</em> g = the gravitational field strength (N kg⁻¹, numerically the acceleration of free fall); M = the mass of the planet or star (kg); r = the distance from its centre (m); R = its radius (m). Surface g therefore depends on mass and radius together: a heavier planet with a much larger radius can have the weaker surface field.</p>
<p><strong>g = GM/r² falls as 1/r² from the centre, so half the surface value occurs at r = R√2</strong><br><em>Key:</em> g = the field strength at distance r; R = the planet's radius; the √2 comes from solving GM/R² ÷ 2 = GM/r². The height above the surface is then r − R, which is the quantity a "how high" question actually wants.</p>

<h3>Potential and energy</h3>
<p><strong>V = −GM/r and U = mV = −GMm/r</strong><br><em>Key:</em> V = the gravitational potential at distance r (J kg⁻¹), defined as zero at infinity and therefore negative everywhere finite; U = the potential energy of mass m at that point (J); G = 6.67 × 10⁻¹¹ N m² kg⁻²; M, m = the two masses (kg); r = the separation (m). The minus sign is the statement that gravity is attractive and work must be done to separate the masses.</p>
<p><strong>work done in moving between potentials: W = m(V₂ − V₁)</strong><br><em>Key:</em> W = the work done on or by the mass (J); m = the mass moved (kg); V₁, V₂ = the potentials at the start and end (J kg⁻¹). Moving away from a planet means V₂ &gt; V₁ (both negative, but less negative), so W is positive — energy must be supplied.</p>
<p><strong>ΔV = g Δh holds only for a uniform field</strong><br><em>Key:</em> ΔV = the change in potential (J kg⁻¹); g = the field strength (N kg⁻¹); Δh = the height gained (m). It is the small-distance approximation to GM/r² and fails once the height is a noticeable fraction of the planet's radius — the point a "why not use mgh" question is making.</p>

<h3>Escape velocity and orbits</h3>
<p><strong>½mv² = GMm/R ⇒ v_escape = √(2GM/R)</strong><br><em>Key:</em> v_escape = the minimum launch speed to escape to infinity (m s⁻¹); G = 6.67 × 10⁻¹¹ N m² kg⁻²; M = the mass of the body being escaped (kg); R = the distance from its centre at launch (m). Setting the kinetic energy equal to the depth of the potential well is the whole derivation; the escape speed does not depend on the mass of the escaping object, only on M and R.</p>
<p><strong>orbital speed: GMm/r² = mv²/r ⇒ v = √(GM/r)</strong><br><em>Key:</em> v = the orbital speed (m s⁻¹); G = 6.67 × 10⁻¹¹ N m² kg⁻²; M = the mass of the central body (kg); r = the orbital radius from the centre (m). Gravity supplies the centripetal force, which is why a larger orbit means a slower speed — the opposite of the intuition that a bigger orbit needs more speed.</p>
<p><strong>T = 2π√(r³/(GM)), so T² ∝ r³</strong><br><em>Key:</em> T = the orbital period (s); r = the orbital radius (m); G = 6.67 × 10⁻¹¹ N m² kg⁻²; M = the central mass (kg). Kepler's third law: the square of the period is proportional to the cube of the radius, which is why a geostationary satellite has one specific radius and not any radius above the equator.</p>
<p><strong>geostationary: T = 24 h ≈ 8.64 × 10⁴ s, orbit in the plane of the equator, same sense as the Earth's rotation</strong><br><em>Key:</em> T = the orbital period (s); the two geometric conditions are what make the satellite appear fixed in the sky. A satellite at the right radius but the wrong inclination or direction is merely geosynchronous, not geostationary — the distinction is a standard two-mark point.</p>`,
  },
};

module.exports = { sections };
