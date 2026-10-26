// Mathematics OL notes, deepened to the depth bar — Angles and Polygons (statements
// 4.1, 4.6, 4.7, 4.8), Congruence and Similarity (4.4, 4.5), Mensuration: Area and
// Volume (5.1-5.5) and Bearings, Constructions and Loci (4.2-4.3).
// Cambridge IGCSE Mathematics 0580 Extended, Papers 2 and 4.
// Apply with:
//   node .freebuff/deepen-materials.cjs .freebuff/content-math-ol-a-depth.cjs > .freebuff-tmp/math-ol-a.sql
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/math-ol-a.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/math-ol-a.sql --apply    (live)
module.exports = {
  expectType: "notes",
  titles: {
    "dc3d7286-feb5-4d75-99e1-ce0941a6a237": "Cambridge IGCSE Mathematics: Angles and Polygons",
    "c003d9a3-a2b3-4cd9-a6af-7fdbe98cf9d6": "Cambridge IGCSE Mathematics: Congruence and Similarity",
    "dce98df1-2982-40df-ab8c-b849b8d78ee1": "Cambridge IGCSE Mathematics: Area, Perimeter and Volume",
    "153c8051-6b06-48ca-b39a-24d41b791d2c": "Cambridge IGCSE Mathematics: Bearings, Constructions and Loci",
  },
  rows: {
    "dc3d7286-feb5-4d75-99e1-ce0941a6a237": `
<h2>Cambridge IGCSE Mathematics: Angles and Polygons</h2>
<p>Angles are the simplest measurements in geometry and the most frequently examined: almost every Paper 2 and Paper 4 geometry question ends with a reason written next to a number, and the reason earns as many marks as the calculation. This note builds the whole angle toolkit from zero: the vocabulary of points, lines and angles; the parallel-line rules; the angle sums of triangles, quadrilaterals and polygons; and the full set of circle theorems with the standard reasons examiners accept. Every worked example writes the reason line, because that is how the marks are earned.</p>

<h3>Geometrical terms</h3>
<p>Geometry has a precise vocabulary, and Paper 2 questions often begin by asking you to use it:</p>
<ul>
<li><strong>Point:</strong> a position with no size; named with a capital letter.</li>
<li><strong>Line segment:</strong> the straight path between two points; a <strong>line</strong> extends without end.</li>
<li><strong>Ray:</strong> a line starting at a point and extending in one direction.</li>
<li><strong>Parallel lines:</strong> always the same distance apart, never meeting (marked with arrows).</li>
<li><strong>Perpendicular lines:</strong> meeting at 90°.</li>
<li><strong>Vertex:</strong> a corner where two or more lines meet; <strong>vertices</strong> in the plural.</li>
<li><strong>Polygon:</strong> a closed shape with straight sides; <strong>regular</strong> means all sides equal and all angles equal.</li>
</ul>
<p>Angle vocabulary: acute (less than 90°), right (90°), obtuse (between 90° and 180°), straight (180°), reflex (between 180° and 360°). Angles on a straight line sum to 180°; angles around a point sum to 360°; vertically opposite angles are equal.</p>

<h3>Parallel lines: the three rules</h3>
<p>A transversal line crossing two parallel lines creates eight angles, and three relationships do all the work:</p>
<table border="1" cellpadding="6">
<tr><th>Relationship</th><th>What they look like</th><th>Rule</th></tr>
<tr><td>Corresponding (F-shape)</td><td>same position at each intersection</td><td>equal</td></tr>
<tr><td>Alternate (Z-shape)</td><td>opposite sides of the transversal, between the parallels</td><td>equal</td></tr>
<tr><td>Co-interior (C-shape)</td><td>same side of the transversal, between the parallels</td><td>sum to 180°</td></tr>
</table>
<p><strong>Worked example.</strong> Two parallel lines are cut by a transversal. One angle is 115°. Find the angle in the alternate position and the co-interior angle on the other side.</p>
<pre><code>alternate angle = 115 deg            (alternate angles are equal)
co-interior angle = 180 - 115 = 65 deg (co-interior angles sum to 180)</code></pre>
<p>Always write the reason next to each answer: "alternate angles" or "co-interior angles sum to 180°". Paper 2 awards the reason mark explicitly.</p>

<h3>Triangles and quadrilaterals</h3>
<p>The angle sum of any triangle is 180° (proof: draw a line through one vertex parallel to the opposite side and use alternate angles). Consequences you must know:</p>
<ul>
<li><strong>Exterior angle</strong> of a triangle equals the sum of the two opposite interior angles.</li>
<li><strong>Isosceles triangle:</strong> base angles are equal; the angle bisector from the apex is also the perpendicular bisector of the base.</li>
<li><strong>Equilateral triangle:</strong> all angles 60°.</li>
<li><strong>Quadrilateral:</strong> interior angles sum to 360° (split into two triangles).</li>
</ul>
<p><strong>Worked example.</strong> A quadrilateral has angles 85°, 95° and 110°. Find the fourth angle.</p>
<pre><code>sum = 360 deg
fourth = 360 - (85 + 95 + 110) = 360 - 290 = 70 deg</code></pre>
<p><strong>Worked example 2 (exterior angle).</strong> In a triangle, an exterior angle is 125° and one opposite interior angle is 48°. Find the other opposite interior angle.</p>
<pre><code>exterior = sum of opposite interiors
125 = 48 + x  ->  x = 77 deg</code></pre>

<h3>Angles in polygons</h3>
<p>Any n-sided polygon can be split into (n − 2) triangles from one vertex, so:</p>
<pre><code>interior angle sum = (n - 2) x 180 deg

regular polygon: each interior angle = (n - 2) x 180/n
exterior angles of any convex polygon sum to 360 deg
regular polygon: each exterior angle = 360/n
interior + exterior = 180 deg at each vertex</code></pre>
<p><strong>Worked example 1.</strong> Find the interior angle sum of a decagon (10 sides) and each interior angle of a regular decagon.</p>
<pre><code>sum = (10 - 2) x 180 = 1440 deg
each = 1440/10 = 144 deg
check with exterior: 360/10 = 36; 180 - 36 = 144 deg</code></pre>
<p><strong>Worked example 2 (working backwards).</strong> A regular polygon has each interior angle 150°. Find the number of sides.</p>
<pre><code>exterior angle = 180 - 150 = 30 deg
n = 360/30 = 12 sides  (a regular dodecagon)</code></pre>
<p><strong>Worked example 3 (exterior angles).</strong> A pentagon has exterior angles 70°, 80°, 60°, 90°. Find the fifth.</p>
<pre><code>exterior angles sum to 360 deg
fifth = 360 - (70 + 80 + 60 + 90) = 360 - 300 = 60 deg</code></pre>

<h3>Circle theorems: the full set</h3>
<p>Circle theorems are examined every session, and each answer needs its theorem named. Learn them as pictures with their standard reasons:</p>
<table border="1" cellpadding="6">
<tr><th>Theorem</th><th>Statement</th><th>Reason to write</th></tr>
<tr><td>Angle at the centre</td><td>the angle at the centre is twice the angle at the circumference subtended by the same arc</td><td>angle at centre = 2 × angle at circumference</td></tr>
<tr><td>Angle in a semicircle</td><td>the angle in a semicircle (subtended by a diameter) is 90°</td><td>angle in a semicircle is 90°</td></tr>
<tr><td>Same segment</td><td>angles subtended by the same arc in the same segment are equal</td><td>angles in the same segment are equal</td></tr>
<tr><td>Cyclic quadrilateral</td><td>opposite angles of a cyclic quadrilateral sum to 180°</td><td>opposite angles of a cyclic quadrilateral sum to 180°</td></tr>
<tr><td>Tangent–radius</td><td>a tangent meets the radius at the point of contact at 90°</td><td>tangent is perpendicular to the radius</td></tr>
<tr><td>Two tangents</td><td>tangents from an external point are equal in length</td><td>tangents from an external point are equal</td></tr>
<tr><td>Alternate segment</td><td>the angle between a tangent and a chord equals the angle in the alternate segment</td><td>alternate segment theorem</td></tr>
</table>
<p><strong>Worked example 1 (centre).</strong> The angle at the centre subtended by an arc is 130°. Find the angle at the circumference subtended by the same arc.</p>
<pre><code>angle at circumference = 130/2 = 65 deg
(reason: angle at centre = 2 x angle at circumference)</code></pre>
<p><strong>Worked example 2 (cyclic quadrilateral).</strong> In a cyclic quadrilateral, one pair of opposite angles is 105° and 75°, and the other pair is 4x and 2x. Find x.</p>
<pre><code>opposite angles sum to 180 deg
4x + 2x = 180
6x = 180  ->  x = 30
check the first pair: 105 + 75 = 180, consistent</code></pre>
<p>Two disciplines make this safe: pair the angles that sit opposite each other (a diagonal between them), and verify both pairs satisfy the 180° rule before writing the answer.</p>
<p><strong>Worked example 3 (tangent).</strong> A tangent touches a circle of radius 5 cm at T; O is the centre and P is a point on the tangent 12 cm from T. Find OP.</p>
<pre><code>The radius OT is perpendicular to the tangent, so triangle OTP
is right-angled at T.
OP^2 = 5^2 + 12^2 = 25 + 144 = 169
OP = 13 cm</code></pre>
<p><strong>Worked example 4 (alternate segment).</strong> A tangent and a chord form an angle of 62° at the point of contact. Find the angle in the alternate segment.</p>
<pre><code>alternate segment theorem: the tangent-chord angle equals the
angle in the alternate segment
answer = 62 deg</code></pre>

<h3>Circle theorems: multi-step problems</h3>
<p>Paper 4 circle problems chain two or three theorems. The method: mark every angle you can find with its reason, then use each new angle to unlock the next.</p>
<p><strong>Worked example.</strong> O is the centre; A, B, C lie on the circle; angle BAC = 35°. Find angle BOC and angle OBC.</p>
<pre><code>angle BOC = 2 x 35 = 70 deg
  (angle at centre = 2 x angle at circumference)
triangle OBC is isosceles (OB = OC = radii)
base angles OBC and OCB are equal:
OBC = (180 - 70)/2 = 55 deg</code></pre>
<p><strong>Worked example 2 (semicircle + cyclic).</strong> AB is a diameter; C and D lie on the circle; angle ABC = 40°. Find angle ADC.</p>
<pre><code>angle ACB = 90 deg (angle in a semicircle)
angle BAC = 180 - 90 - 40 = 50 deg
ABCD is cyclic, so angle ADC = 180 - angle ABC? No - opposite
pairs: A with C, B with D. Angle ADC is opposite angle ABC?
The vertices in order are A, B, C, D, so opposite pairs are
(A, C) and (B, D). Angle ADC is at D, opposite angle ABC at B:
angle ADC = 180 - 40 = 140 deg.</code></pre>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Parallel lines)</strong> Two parallel lines are cut by a transversal; one co-interior angle is 72°. Find the other. <em>Answer:</em> 108°, because co-interior angles sum to 180°.</li>
<li><strong>(Polygon)</strong> Find the interior angle sum of a 15-sided polygon. <em>Answer:</em> (15 − 2) × 180 = 2340°.</li>
<li><strong>(Regular polygon)</strong> Each exterior angle of a regular polygon is 24°. Find the number of sides and each interior angle. <em>Answer:</em> n = 360/24 = 15; interior = 180 − 24 = 156°.</li>
<li><strong>(Circle — centre)</strong> An angle at the circumference is 28°. Find the angle at the centre subtended by the same arc. <em>Answer:</em> 56°.</li>
<li><strong>(Circle — semicircle)</strong> A triangle is inscribed in a semicircle with the diameter as one side; one base angle is 33°. Find the other. <em>Answer:</em> 90° at the circumference, so the other angle is 180 − 90 − 33 = 57°.</li>
<li><strong>(Circle — cyclic)</strong> A cyclic quadrilateral has one angle 118°. Find the opposite angle. <em>Answer:</em> 62° (180 − 118).</li>
<li><strong>(Tangent)</strong> Two tangents from P touch the circle at A and B; PA = 9 cm. Find PB and explain. <em>Answer:</em> 9 cm — tangents from an external point are equal.</li>
<li><strong>(Multi-step)</strong> In a circle, angle ABD = 42° and angle ACD = 42°. What does this tell you about A, B, C, D? <em>Answer:</em> They are concyclic — equal angles subtended by the same chord AD at B and C mean the points lie on the same circle (angles in the same segment).</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Missing reasons:</strong> Paper 2 geometry marks include the reason. "x = 65° (angles on a straight line)" scores; a bare "65°" may not.</li>
<li><strong>Wrong pairing in cyclic quadrilaterals:</strong> opposite angles are the ones separated by a diagonal (A and C, B and D), not adjacent ones. Check both pairs sum to 180°.</li>
<li><strong>Alternate versus corresponding:</strong> alternate angles form a Z, corresponding an F. Identifying the wrong pattern gives the wrong equality.</li>
<li><strong>Interior formula mix-up:</strong> interior sum is (n − 2) × 180; each exterior is 360/n. Do not use 360/n for the interior of a regular polygon.</li>
<li><strong>Reflex angles:</strong> the angle at the centre may be reflex; if the diagram shows an obtuse angle but the geometry demands a reflex one, use 360° − the drawn angle.</li>
<li><strong>Assuming radii are parallel or equal to chords:</strong> radii are equal to each other, not to chords. Isosceles triangles in circles come from two radii.</li>
<li><strong>Tangent–chord angle:</strong> the alternate segment theorem requires the angle between the tangent and the chord at the point of contact, not any angle involving the tangent.</li>
<li><strong>Diagram not to scale:</strong> never measure an angle with a protractor in an exam diagram; the geometry must be calculated. "Diagram not accurately drawn" is a warning, not decoration.</li>
</ul>
`,
    "c003d9a3-a2b3-4cd9-a6af-7fdbe98cf9d6": `
<h2>Cambridge IGCSE Mathematics: Congruence and Similarity</h2>
<p>Two shapes are congruent when they are identical in shape and size; they are similar when they are the same shape but a different size. Those two ideas power a whole family of exam questions: proving triangles congruent, finding missing lengths with scale factors, and scaling areas and volumes — where the factors square and cube. This note builds the topic from zero: the four congruence tests with how to write a proof, the similarity rules and the length–area–volume factor chain, and symmetry (line and rotational) with its order and practical counting.</p>

<h3>Congruence: identical in every way</h3>
<p>Congruent shapes have the same side lengths and the same angles — one can be moved onto the other by translation, rotation or reflection (but not enlargement). Triangles are the workhorse, and four tests prove congruence:</p>
<table border="1" cellpadding="6">
<tr><th>Test</th><th>What you need</th></tr>
<tr><td>SSS</td><td>three pairs of corresponding sides equal</td></tr>
<tr><td>SAS</td><td>two pairs of sides and the included angle equal</td></tr>
<tr><td>ASA (or AAS)</td><td>two pairs of angles and a corresponding side equal</td></tr>
<tr><td>RHS</td><td>right angle, hypotenuse and one other side equal</td></tr>
</table>
<p>Note what is not a test: AAA proves similarity, not congruence (same shape, different size), and SSA is not valid in general (the ambiguous case). Writing a congruence proof means listing the three equalities with reasons and naming the test.</p>
<p><strong>Worked example.</strong> In triangles ABC and PQR: AB = PQ, angle ABC = angle PQR, BC = QR. Prove the triangles are congruent.</p>
<pre><code>AB = PQ       (given)
angle ABC = angle PQR  (given, the included angle)
BC = QR       (given)
Therefore triangles ABC and PQR are congruent (SAS).</code></pre>
<p><strong>Worked example 2 (RHS).</strong> Two right-angled triangles share a hypotenuse of 13 cm, and each has one shorter side 5 cm. Are they congruent?</p>
<pre><code>Right angle: given; hypotenuse 13 = 13; one side 5 = 5.
RHS applies, so the triangles are congruent - in fact both
have the third side sqrt(169 - 25) = 12 cm.</code></pre>

<h3>Similarity: same shape, scaled size</h3>
<p>Two shapes are similar when corresponding angles are equal and corresponding sides are in the same ratio. For triangles, any one of these proves similarity:</p>
<ul>
<li><strong>AAA (or AA):</strong> two pairs of equal angles suffice (the third follows from the angle sum).</li>
<li><strong>All three sides in the same ratio</strong> (SSS similarity).</li>
<li><strong>Two sides in the same ratio with the included angle equal</strong> (SAS similarity).</li>
</ul>
<p>The scale factor k compares corresponding lengths:</p>
<pre><code>k = length in image / length in original
missing length = corresponding length x k</code></pre>
<p><strong>Worked example.</strong> Triangles ABC and DEF are similar with AB = 6 cm, DE = 9 cm, BC = 8 cm. Find EF.</p>
<pre><code>k = DE/AB = 9/6 = 1.5
EF = BC x k = 8 x 1.5 = 12 cm</code></pre>
<p><strong>Worked example 2 (working backwards).</strong> Similar rectangles have areas 50 cm² and 200 cm²; the smaller is 5 cm wide. Find the width of the larger.</p>
<pre><code>area factor = 200/50 = 4
length factor k = sqrt(4) = 2
width = 5 x 2 = 10 cm</code></pre>

<h3>The length–area–volume factor chain</h3>
<p>This is the highest-yield similarity result in the syllabus: if the length scale factor is k, then areas scale by k² and volumes by k³.</p>
<table border="1" cellpadding="6">
<tr><th>Quantity</th><th>Factor</th><th>Example (k = 3)</th></tr>
<tr><td>Length</td><td>k</td><td>sides triple</td></tr>
<tr><td>Area</td><td>k²</td><td>areas multiply by 9</td></tr>
<tr><td>Volume</td><td>k³</td><td>volumes multiply by 27</td></tr>
</table>
<p><strong>Worked example.</strong> Two similar bottles hold 250 ml and 2000 ml. The smaller is 12 cm tall. Find the height of the larger and the ratio of their surface areas.</p>
<pre><code>volume factor = 2000/250 = 8
k = cube root of 8 = 2
height = 12 x 2 = 24 cm
area factor = k^2 = 4, so the larger has 4 times the surface area.</code></pre>
<p><strong>Worked example 2 (reverse).</strong> Two similar solids have surface areas in the ratio 9 : 25. Find the ratio of their volumes.</p>
<pre><code>area factor 9/25 -> k = sqrt(9/25) = 3/5
volume ratio = k^3 = 27/125</code></pre>

<h3>Similarity in real geometry: triangles in circles and parallel lines</h3>
<p>Similar triangles hide inside diagrams. Two standard configurations:</p>
<ul>
<li><strong>Parallel lines cutting a triangle:</strong> a line parallel to one side of a triangle creates a smaller similar triangle (corresponding angles equal).</li>
<li><strong>Intersecting chords and the "bow-tie":</strong> two chords crossing inside a circle create similar triangles because angles in the same segment are equal — this is the route to the intersecting-chords result.</li>
</ul>
<p><strong>Worked example.</strong> In triangle ABC, DE is parallel to BC with D on AB and E on AC. AD = 4 cm, DB = 6 cm, DE = 5 cm. Find BC.</p>
<pre><code>Triangles ADE and ABC are similar (DE parallel BC gives
corresponding angles).
k = AB/AD = (4 + 6)/4 = 2.5
BC = DE x k = 5 x 2.5 = 12.5 cm</code></pre>

<h3>Symmetry: lines and rotation</h3>
<p>Symmetry is examined as counting and as reasoning:</p>
<ul>
<li><strong>Line (reflective) symmetry:</strong> a line about which the shape maps onto itself. Count the lines: a square has 4, an equilateral triangle 3, a rectangle 2, a regular n-gon n, a circle infinitely many.</li>
<li><strong>Rotational symmetry:</strong> the shape maps onto itself when rotated about a centre by less than 360°. The <strong>order</strong> is the number of distinct positions in a full turn (a square has order 4; a parallelogram order 2; a scalene triangle order 1 or none).</li>
<li><strong>Regular polygons:</strong> n lines of symmetry and rotational symmetry of order n.</li>
</ul>
<p><strong>Worked example.</strong> State the line and rotational symmetry of a regular hexagon and of an isosceles trapezium.</p>
<pre><code>regular hexagon: 6 lines of symmetry; rotational order 6
isosceles trapezium: 1 line of symmetry (vertical through the
midpoints of the parallel sides); rotational order 1 (none)</code></pre>

<h3>Writing congruence and similarity proofs for marks</h3>
<p>Proof questions are marked on structure as much as conclusion, and the structure has three parts: name the pair of triangles you are comparing (in corresponding order); list every equality with its reason (given, common side, vertically opposite, alternate angles, radii of the same circle); and finish with the test that the equalities satisfy. A proof that reaches the right conclusion without naming the test loses the final mark, and one that names equalities out of correspondence order cannot be followed.</p>
<pre><code>Triangle ABC and triangle PQR:
  AB = PQ        (given)
  angle B = angle Q (given)
  BC = QR        (common/given)
Therefore ABC is congruent to PQR (SAS).</code></pre>
<p>For similarity, the same scaffold with a different finish: two pairs of equal angles (or equivalent ratios of sides) and the word "similar" with the test named. State the correspondence explicitly — writing ABC similar to PQR means A matches P, B matches Q, C matches R — because the next part of the question will expect you to use those pairings to form ratios.</p>

<h3>Worked examples: mixed congruence and similarity</h3>
<p><strong>Worked example.</strong> A photograph 15 cm by 10 cm is enlarged so its longer side becomes 24 cm. Find the shorter side and the ratio of areas.</p>
<pre><code>k = 24/15 = 1.6
shorter side = 10 x 1.6 = 16 cm
area ratio = k^2 = 2.56
(new area is 2.56 times the old)</code></pre>
<p><strong>Worked example 2.</strong> Explain why all circles are similar but not all rectangles are.</p>
<pre><code>Circles: every circle is a scaled copy of every other (same shape,
different radius), so they are similar.
Rectangles: only those with the same length-to-width ratio are
similar; a 2 x 1 rectangle and a 3 x 1 rectangle have different
ratios, so they are not similar.</code></pre>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Congruence test)</strong> State the four tests for congruent triangles. <em>Answer:</em> SSS, SAS, ASA (or AAS), RHS.</li>
<li><strong>(Proof)</strong> Triangles ABC and XYZ have AB = XY, AC = XZ and angle BAC = angle YXZ. Are they congruent? Which test? <em>Answer:</em> Yes — SAS, because the equal angles are included between the equal sides.</li>
<li><strong>(Scale factor)</strong> Two similar triangles have corresponding sides 5 cm and 8 cm. Find the area factor. <em>Answer:</em> k = 8/5 = 1.6; area factor = 2.56.</li>
<li><strong>(Volumes)</strong> Two similar cones have heights 6 cm and 15 cm. Find the ratio of their volumes. <em>Answer:</em> k = 2.5; volume ratio = 2.5³ = 15.625 (or 125 : 8).</li>
<li><strong>(Reverse)</strong> Two similar solids have volumes in the ratio 64 : 27. Find the ratio of their surface areas. <em>Answer:</em> k = 4/3; area ratio = 16/9.</li>
<li><strong>(Parallel line)</strong> In a triangle, a line parallel to the base divides the other two sides in the ratio 3 : 2 (from the vertex). If the base is 15 cm, find the parallel segment. <em>Answer:</em> k = 3/(3 + 2) = 0.6; segment = 9 cm.</li>
<li><strong>(Symmetry)</strong> State the symmetry of a regular octagon. <em>Answer:</em> 8 lines of symmetry; rotational symmetry of order 8.</li>
<li><strong>(Reasoning)</strong> A student says two rectangles with the same perimeter are similar. Give a counterexample. <em>Answer:</em> A 4 × 2 rectangle (perimeter 12) and a 5 × 1 rectangle (perimeter 12) are not similar — their side ratios differ.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>AAA as congruence:</strong> three equal angles prove similarity, not congruence. Size can differ.</li>
<li><strong>SSA:</strong> two sides and a non-included angle do not determine a unique triangle — never cite it as a congruence test.</li>
<li><strong>Area factor as k:</strong> areas scale by k², volumes by k³. Doubling lengths quadruples areas and octuples volumes — the most common Paper 4 error.</li>
<li><strong>Square-root confusion:</strong> from an area ratio take the square root to get k; from a volume ratio take the cube root.</li>
<li><strong>Correspondence:</strong> match corresponding vertices in the order named (ABC to PQR means A↔P, B↔Q, C↔R). Mixing the order produces wrong ratios.</li>
<li><strong>Rotational order 1:</strong> a shape with no rotational symmetry has order 1, not 0 — one full turn always maps a shape onto itself.</li>
<li><strong>Line symmetry count:</strong> a rectangle has 2 lines, a square 4; do not assume all quadrilaterals have the same.</li>
<li><strong>Proof formatting:</strong> list each equality with its reason and finish with the test name. The structure is the mark scheme.</li>
</ul>
`,
    "dce98df1-2982-40df-ab8c-b849b8d78ee1": `
<h2>Cambridge IGCSE Mathematics: Area, Perimeter and Volume</h2>
<p>Measurement questions are the most reliable marks on the paper — provided you convert units correctly and choose the right formula. This note builds the mensuration toolkit from zero: the unit system and its tricky area and volume conversions, the area formulas for every plane shape with derivations, circles, arcs and sectors, the volume and surface area of every solid in the syllabus, and compound shapes — how to add and subtract the pieces. Every worked example shows the substitution and the units, because units and premature rounding are where the marks disappear.</p>

<h3>Units of measure</h3>
<p>Length, area and volume units are linked by powers of the linear conversion factor:</p>
<table border="1" cellpadding="6">
<tr><th>Conversion</th><th>Length</th><th>Area</th><th>Volume</th></tr>
<tr><td>1 m = 100 cm</td><td>× 100</td><td>× 100² = 10 000</td><td>× 100³ = 1 000 000</td></tr>
<tr><td>1 cm = 10 mm</td><td>× 10</td><td>× 100</td><td>× 1000</td></tr>
<tr><td>1 km = 1000 m</td><td>× 1000</td><td>× 10⁶</td><td>× 10⁹</td></tr>
</table>
<p>Capacity: 1 litre = 1000 cm³ = 1000 ml; 1 m³ = 1000 litres. The classic trap is converting area with a length factor — 1 m² is 10 000 cm², not 100 cm².</p>
<p><strong>Worked example.</strong> Convert 3.5 m² to cm² and 2500 cm³ to litres.</p>
<pre><code>3.5 m2 = 3.5 x 10 000 = 35 000 cm2
2500 cm3 = 2500/1000 = 2.5 litres</code></pre>

<h3>Area and perimeter of plane shapes</h3>
<table border="1" cellpadding="6">
<tr><th>Shape</th><th>Perimeter</th><th>Area</th></tr>
<tr><td>Rectangle</td><td>2(l + w)</td><td>l × w</td></tr>
<tr><td>Triangle</td><td>sum of sides</td><td>½ × base × perpendicular height</td></tr>
<tr><td>Parallelogram</td><td>2(a + b)</td><td>base × perpendicular height</td></tr>
<tr><td>Trapezium</td><td>sum of sides</td><td>½(a + b) × h (parallel sides a, b)</td></tr>
<tr><td>Circle</td><td>2πr</td><td>πr²</td></tr>
</table>
<p>The triangle and parallelogram formulas both need the <em>perpendicular</em> height — not a slanted side. That single word accounts for more lost marks than any other in mensuration.</p>
<p><strong>Worked example.</strong> Find the area of a trapezium with parallel sides 7 cm and 11 cm and height 5 cm.</p>
<pre><code>A = (1/2)(a + b) h = 0.5 x (7 + 11) x 5
  = 0.5 x 18 x 5 = 45 cm2</code></pre>
<p><strong>Worked example 2 (triangle).</strong> A triangle has sides 6 cm, 8 cm, 10 cm. Is it right-angled, and what is its area?</p>
<pre><code>6^2 + 8^2 = 36 + 64 = 100 = 10^2, so yes - right-angled
at the 6-8 corner. Area = (1/2) x 6 x 8 = 24 cm2.</code></pre>

<h3>Circles, arcs and sectors</h3>
<p>An arc is a fraction of the circumference; a sector is the same fraction of the area. The fraction is the angle over a full turn:</p>
<pre><code>circumference = 2 pi r;  area = pi r^2

arc length  = (theta/360) x 2 pi r
sector area = (theta/360) x pi r^2
perimeter of a sector = arc length + 2r
segment area = sector area - triangle area</code></pre>
<p><strong>Worked example.</strong> A sector has radius 9 cm and angle 140°. Find its arc length, sector area and perimeter (π = 3.142).</p>
<pre><code>arc = (140/360) x 2 x 3.142 x 9 = 0.3889 x 56.56 = 21.99 cm
area = (140/360) x 3.142 x 81 = 0.3889 x 254.5 = 98.97 cm2
perimeter = 21.99 + 18 = 39.99 cm = 40.0 cm (3 s.f.)</code></pre>
<p>The perimeter of a sector includes the two radii — students routinely answer only the arc length.</p>
<p><strong>Worked example 2 (segment).</strong> Find the area of the segment cut off by a chord in a circle of radius 6 cm when the sector angle is 90°.</p>
<pre><code>sector area = (90/360) x 3.142 x 36 = 28.28 cm2
triangle area = (1/2) x 6 x 6 = 18 cm2 (right angle at centre)
segment = 28.28 - 18 = 10.28 cm2</code></pre>

<h3>Surface area and volume of solids</h3>
<table border="1" cellpadding="6">
<tr><th>Solid</th><th>Volume</th><th>Surface area</th></tr>
<tr><td>Cuboid</td><td>l × w × h</td><td>2(lw + lh + wh)</td></tr>
<tr><td>Prism (any cross-section)</td><td>area of cross-section × length</td><td>2 × cross-section + perimeter × length</td></tr>
<tr><td>Cylinder</td><td>πr²h</td><td>2πr² + 2πrh</td></tr>
<tr><td>Cone</td><td>⅓πr²h</td><td>πr² + πrl (l = slant height)</td></tr>
<tr><td>Sphere</td><td>⁴⁄₃πr³</td><td>4πr²</td></tr>
<tr><td>Pyramid</td><td>⅓ × base area × height</td><td>sum of face areas</td></tr>
</table>
<p>Slant height versus vertical height is the cone trap: volume uses the perpendicular height h, surface area uses the slant height l, and l² = r² + h² connects them.</p>
<p><strong>Worked example 1 (cylinder).</strong> A cylinder has radius 4 cm and height 10 cm. Find its volume and total surface area.</p>
<pre><code>V = pi r^2 h = 3.142 x 16 x 10 = 502.7 cm3
SA = 2 pi r^2 + 2 pi r h = 2 x 3.142 x 16 + 2 x 3.142 x 4 x 10
   = 100.5 + 251.4 = 351.9 cm2  (352 cm2, 3 s.f.)</code></pre>
<p><strong>Worked example 2 (cone).</strong> A cone has radius 5 cm and vertical height 12 cm. Find its volume and slant height.</p>
<pre><code>V = (1/3) pi r^2 h = (1/3) x 3.142 x 25 x 12 = 314.2 cm3
l = sqrt(5^2 + 12^2) = sqrt(169) = 13 cm</code></pre>
<p><strong>Worked example 3 (sphere).</strong> Find the volume of a sphere of radius 6 cm.</p>
<pre><code>V = (4/3) pi r^3 = (4/3) x 3.142 x 216 = 904.8 cm3</code></pre>

<h3>Compound shapes: add and subtract</h3>
<p>Compound figures are split into standard shapes (add) or standard shapes with a piece removed (subtract). The discipline: draw the split lines, label each sub-shape's dimensions, compute each area separately, then combine.</p>
<p><strong>Worked example.</strong> An L-shape is made from a 10 cm × 8 cm rectangle with a 4 cm × 3 cm rectangle removed from one corner. Find its area and perimeter.</p>
<pre><code>area = 10 x 8 - 4 x 3 = 80 - 12 = 68 cm2
perimeter: trace the outline:
10 + 8 + 6 + 5 + 4 + 3 = 36 cm
(6 = 10 - 4 along the removed edge; 5 = 8 - 3)</code></pre>
<p><strong>Worked example 2 (semicircle on a rectangle).</strong> A running track is a 60 m by 30 m rectangle with a semicircle of diameter 30 m at each end. Find its area.</p>
<pre><code>rectangle = 60 x 30 = 1800 m2
two semicircles = one full circle of radius 15:
  pi x 225 = 706.9 m2
total = 1800 + 706.9 = 2507 m2  (2510 m2, 3 s.f.)</code></pre>

<h3>Worked examples: composite solids</h3>
<p>Composite solids combine the standard formulas: a silo is a cylinder with a hemisphere on top; a pencil is a cylinder with a cone; a capsule is a cylinder with two hemispheres. The method: split the solid, compute each volume, add; for surface area, add only the faces that are actually exposed (the join is hidden).</p>
<p><strong>Worked example.</strong> A capsule is a cylinder of radius 3 cm and length 10 cm with a hemisphere at each end. Find its total volume and surface area.</p>
<pre><code>cylinder volume = pi r^2 h = 3.142 x 9 x 10 = 282.8 cm3
two hemispheres = one sphere: (4/3) pi r^3 = (4/3) x 3.142 x 27
               = 113.1 cm3
total volume = 282.8 + 113.1 = 395.9 cm3

surface area: cylinder curved surface 2 pi r h = 188.5 cm2
plus one full sphere 4 pi r^2 = 113.1 cm2
total = 301.6 cm2  (the circular joins are internal, not exposed)</code></pre>
<p><strong>Worked example 2 (frustum-free method).</strong> A cone of radius 6 cm and height 9 cm has its top 3 cm cut off parallel to the base. Find the volume removed.</p>
<pre><code>the removed cone is similar to the whole cone, scale k = 3/9 = 1/3
volume of whole cone = (1/3) pi x 36 x 9 = 339.3 cm3
removed volume = k^3 x whole = (1/27) x 339.3 = 12.6 cm3
(the same as computing directly with radius 2 cm and height 3 cm)</code></pre>

<h3>Worked examples: reverse problems and density</h3>
<p><strong>Worked example.</strong> A cylindrical tank of radius 1.5 m holds 20 m³ of water. Find the depth.</p>
<pre><code>V = pi r^2 h  ->  h = V/(pi r^2) = 20/(3.142 x 2.25)
h = 20/7.07 = 2.83 m</code></pre>
<p><strong>Worked example 2 (density).</strong> A metal cuboid 5 cm × 4 cm × 2 cm has mass 312 g. Find its density in g cm⁻³ and kg m⁻³.</p>
<pre><code>volume = 5 x 4 x 2 = 40 cm3
density = 312/40 = 7.8 g cm-3
in kg m-3: 7.8 x 1000 = 7800 kg m-3</code></pre>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Units)</strong> Convert 2.4 m² to cm² and 0.75 litres to cm³. <em>Answer:</em> 24 000 cm²; 750 cm³.</li>
<li><strong>(Trapezium)</strong> Parallel sides 12 cm and 8 cm, height 6 cm. Find the area. <em>Answer:</em> ½(12 + 8) × 6 = 60 cm².</li>
<li><strong>(Sector)</strong> Radius 7 cm, angle 72°. Find arc length and sector area. <em>Answer:</em> arc = (72/360) × 2π × 7 = 8.80 cm; area = (72/360) × π × 49 = 61.6 cm².</li>
<li><strong>(Cylinder)</strong> Radius 3 cm, height 12 cm. Find the volume. <em>Answer:</em> π × 9 × 12 = 339 cm³ (3 s.f.).</li>
<li><strong>(Cone)</strong> Radius 8 cm, height 15 cm. Find the volume and slant height. <em>Answer:</em> V = ⅓π × 64 × 15 = 1005 cm³; l = √(64 + 225) = 17 cm.</li>
<li><strong>(Sphere)</strong> Diameter 10 cm. Find the surface area. <em>Answer:</em> r = 5; SA = 4π × 25 = 314 cm².</li>
<li><strong>(Compound)</strong> A rectangle 14 m × 6 m has a semicircle of diameter 6 m removed from one end. Find the area. <em>Answer:</em> 84 − ½π × 9 = 84 − 14.14 = 69.9 m².</li>
<li><strong>(Reverse)</strong> A sphere has volume 288 cm³. Find its radius. <em>Answer:</em> 288 = ⁴⁄₃πr³ → r³ = 288 × 3/(4π) = 68.75 → r = 4.10 cm.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Slant versus perpendicular height:</strong> triangle/parallelogram areas use perpendicular height; cone surface area uses slant height; cone volume uses perpendicular height.</li>
<li><strong>Area unit conversion:</strong> 1 m² = 10 000 cm² and 1 cm² = 100 mm². Multiplying by 100 instead of 10 000 is the single most common mensuration error.</li>
<li><strong>Sector perimeter:</strong> add the two radii to the arc length. The question asks for the perimeter of the sector, not the arc.</li>
<li><strong>Using the diameter as radius:</strong> halve the diameter first; every circle formula uses r.</li>
<li><strong>π precision:</strong> use 3.142 or the calculator's π; rounding π to 3 loses accuracy on multi-step questions. Round only the final answer (usually 3 s.f. or as stated).</li>
<li><strong>Compound shape subtraction:</strong> remove the correct region and keep the outline consistent — recompute the perimeter from the actual boundary, not the sum of the sub-shapes' perimeters.</li>
<li><strong>Volume of a prism:</strong> cross-section area × length, where the length is perpendicular to the cross-section (a slanted prism uses the perpendicular distance).</li>
<li><strong>Units in the answer:</strong> cm² for area, cm³ for volume, and capacity conversions (1000 cm³ = 1 litre). A correct number with the wrong unit loses marks on Paper 2.</li>
</ul>
`,
    "153c8051-6b06-48ca-b39a-24d41b791d2c": `
<h2>Cambridge IGCSE Mathematics: Bearings, Constructions and Loci</h2>
<p>Bearings are how navigators describe direction, and geometrical constructions are how geometers draw exact figures with only a ruler and a pair of compasses. Together they fill the practical geometry questions on both papers: a bearing calculated from a diagram, a locus sketched and shaded, a perpendicular bisector constructed and justified. This note builds the topic from zero: the three rules of bearings and the back-bearing calculation, the compass-and-ruler constructions with their standard arcs, scale drawings and their measurements, and the four loci the syllabus requires, with every step shown.</p>

<h3>Bearings: the three rules</h3>
<p>A bearing is a direction written as a three-figure angle. Three rules define it:</p>
<ol>
<li><strong>Measured from North</strong> (the north line, drawn as an upward arrow).</li>
<li><strong>Clockwise.</strong></li>
<li><strong>Written with three figures</strong> — 035°, 090°, 245° (never 35° or 9°).</li>
</ol>
<p>Bearings are always between 000° and 360°; a direction due east is 090°, due south 180°, due west 270°.</p>
<p><strong>Worked example.</strong> A ship sails from A on a bearing of 060° for 12 km to B, then on a bearing of 150° for 8 km to C. Describe the position of C relative to A qualitatively.</p>
<pre><code>060 deg is between north and east; 150 deg is between east and
south. So C lies south-east of A, and the two legs turn 90 deg
(150 - 60 = 90) - the path is two perpendicular legs, making a
right angle at B.</code></pre>

<h3>Back bearings</h3>
<p>The bearing of A from B is not the bearing of B from A — they differ by 180° (add if under 180°, subtract if 180° or more):</p>
<pre><code>back bearing = bearing + 180  (if bearing < 180)
             = bearing - 180  (if bearing >= 180)</code></pre>
<p><strong>Worked example.</strong> The bearing of B from A is 072°. Find the bearing of A from B.</p>
<pre><code>72 + 180 = 252 deg</code></pre>
<p><strong>Worked example 2 (three-figure check).</strong> The bearing of P from Q is 310°. Find the bearing of Q from P.</p>
<pre><code>310 - 180 = 130 deg</code></pre>

<h3>Bearings with trigonometry</h3>
<p>Bearing problems become right-triangle problems once you draw the north lines and mark the angles between the path and north. Use Pythagoras for distances and trigonometry for angles, then convert the angle into a bearing.</p>
<p><strong>Worked example.</strong> A boat sails 5 km due north, then 12 km due east. Find its distance and bearing from the start.</p>
<pre><code>distance = sqrt(5^2 + 12^2) = sqrt(169) = 13 km
angle east of north: tan(theta) = 12/5  ->  theta = 67.4 deg
bearing = 067 deg (to the nearest degree)</code></pre>
<p><strong>Worked example 2 (reverse).</strong> A helicopter is 9 km from base on a bearing of 145°. How far east and how far south of the base is it?</p>
<pre><code>angle from south = 180 - 145 = 35 deg
east = 9 sin(35) = 5.16 km
south = 9 cos(35) = 7.37 km</code></pre>

<h3>Constructions: ruler and compasses only</h3>
<p>Constructions are marked on the accuracy of the arcs and the visibility of the construction lines. Keep your compasses sharp and do not rub out the arcs.</p>
<table border="1" cellpadding="6">
<tr><th>Construction</th><th>Standard method (in order)</th></tr>
<tr><td>Perpendicular bisector of AB</td><td>compasses wider than half AB: arc from A, same-radius arc from B, both sides; join the two intersections</td></tr>
<tr><td>Angle bisector</td><td>arc across both arms from the vertex; same-radius arcs from those two crossings; join the vertex to their intersection</td></tr>
<tr><td>Perpendicular from a point to a line</td><td>arc from the point cutting the line twice; equal arcs from those cuts; join the point to their intersection</td></tr>
<tr><td>Perpendicular at a point on a line</td><td>equal arcs either side of the point; then the perpendicular-bisector method between them</td></tr>
<tr><td>60° angle</td><td>arc from the endpoint across the line; same radius arc from the crossing; join</td></tr>
<tr><td>Triangle given SSS</td><td>draw the base; arcs of the other two lengths from each end; join the intersection</td></tr>
</table>
<p><strong>Worked example.</strong> Construct the perpendicular bisector of a segment AB of length 8 cm and explain why every point on it is equidistant from A and B.</p>
<pre><code>Construction: arcs of radius > 4 cm from A and from B, above and
below the segment; the two intersections join to form the bisector.
Why: the arcs are circles of equal radius centred at A and B, so
their intersection points are equidistant from A and B; the line
through them is the locus of all such points.</code></pre>

<h3>Scale drawings</h3>
<p>A scale drawing represents a real situation to a ratio: 1 : 50 000 means 1 cm on paper represents 50 000 cm in reality (0.5 km). The method: convert the scale to a usable unit, measure or construct to scale, then read back with the reverse conversion.</p>
<p><strong>Worked example.</strong> A map has scale 1 : 25 000. Two towns are 6.4 cm apart on the map. Find the real distance in km.</p>
<pre><code>6.4 cm x 25 000 = 160 000 cm
160 000 cm = 1600 m = 1.6 km</code></pre>
<p><strong>Worked example 2 (drawing).</strong> A field is 400 m by 250 m. Draw it at scale 1 : 5000. What are the drawing dimensions?</p>
<pre><code>400 m = 40 000 cm; /5000 = 8 cm
250 m = 25 000 cm; /5000 = 5 cm
The drawing is 8 cm by 5 cm.</code></pre>

<h3>Loci</h3>
<p>A locus is the set of all points satisfying a condition. Four standard loci are examinable, and each has its construction:</p>
<ul>
<li><strong>Fixed distance from a point:</strong> a circle (arc) of that radius, centred on the point.</li>
<li><strong>Equidistant from two points:</strong> the perpendicular bisector of the segment joining them.</li>
<li><strong>Equidistant from two lines:</strong> the angle bisector(s) of the angle between them.</li>
<li><strong>Fixed distance from a line:</strong> two parallel lines at that distance, one on each side (with semicircular ends for a segment).</li>
</ul>
<p>Region questions combine loci: "shade the region closer to A than B and within 3 cm of C" means intersect the perpendicular bisector's half-plane with the circle's interior.</p>
<p><strong>Worked example.</strong> A goat is tethered to a corner of a 6 m by 4 m shed with a 5 m rope. Describe the region it can reach.</p>
<pre><code>A three-quarter circle of radius 5 m around the corner, minus
the part blocked by the shed: the rope wraps the shed's 4 m and
6 m walls. The reachable region is the quarter circle of radius
5 m outside the shed plus smaller arcs where the rope wraps
(radius 1 m around the far 4 m corner, no reach around the far
6 m corner since 5 - 6 < 0).</code></pre>

<h3>Worked examples: bearings and loci together</h3>
<p><strong>Worked example.</strong> Two radio transmitters A and B are 10 km apart, with B due east of A. A signal is received equally strongly at points equidistant from A and B, and within 6 km of A. Describe the region.</p>
<pre><code>Equidistant from A and B: the perpendicular bisector of AB - a
north-south line 5 km east of A.
Within 6 km of A: a circle of radius 6 km centred at A.
The region is the part of the circle on one side of the bisector:
a circular segment of radius 6 km, cut by the line 5 km from A.</code></pre>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Bearing definition)</strong> State the three rules for a bearing. <em>Answer:</em> Measured from north, clockwise, written as three figures.</li>
<li><strong>(Back bearing)</strong> The bearing of X from Y is 128°. Find the bearing of Y from X. <em>Answer:</em> 128 + 180 = 308°.</li>
<li><strong>(Calculation)</strong> A plane flies 30 km north then 40 km east. Find its distance from the start and its bearing. <em>Answer:</em> distance = √(900 + 1600) = 50 km; tan θ = 40/30 → θ = 53.1°, bearing 053°.</li>
<li><strong>(Components)</strong> A ship is 15 km from port on a bearing of 210°. Find its distance west of the port. <em>Answer:</em> angle from south = 210 − 180 = 30°; west = 15 sin 30 = 7.5 km.</li>
<li><strong>(Construction)</strong> Describe how to construct the perpendicular bisector of a 6 cm segment. <em>Answer:</em> Set compasses wider than 3 cm; draw arcs from each endpoint, both above and below; join the two crossing points.</li>
<li><strong>(Locus)</strong> Describe the locus of points equidistant from the sides of an angle. <em>Answer:</em> The angle bisector — every point on it is the same perpendicular distance from both arms.</li>
<li><strong>(Scale)</strong> On a 1 : 20 000 map, a lake is 3.5 cm long. Find its real length in km. <em>Answer:</em> 3.5 × 20 000 = 70 000 cm = 0.7 km.</li>
<li><strong>(Region)</strong> Shade the region inside a triangle that is closer to side AB than to side AC and within 2 cm of vertex A. <em>Answer:</em> The intersection of the half-plane on AB's side of the angle bisector of A with the circle of radius 2 cm centred at A.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Two-figure bearings:</strong> 35° must be written 035°. Three figures, always.</li>
<li><strong>Measuring from the wrong north:</strong> bearings start at north, not east. A bearing of 090° is east, not north.</li>
<li><strong>Back-bearing addition:</strong> add 180 if the bearing is below 180, subtract if above; the result must stay between 000 and 360.</li>
<li><strong>Anticlockwise angles:</strong> bearing questions are clockwise; a clockwise angle and its anticlockwise partner sum to 360.</li>
<li><strong>Rubbing out construction arcs:</strong> the arcs are the evidence. Leave them visible and use a sharp pencil.</li>
<li><strong>Locus shading:</strong> shade the region, not the boundary line; the question usually says "shade the region".</li>
<li><strong>Scale unit slips:</strong> convert the real measurement to the same unit as the drawing before applying the ratio, and remember 1 km = 100 000 cm.</li>
<li><strong>Diagram not to scale:</strong> measure only when told to; otherwise calculate. A protractor reading on a "not to scale" diagram earns nothing.</li>
</ul>
`,
  },
};
