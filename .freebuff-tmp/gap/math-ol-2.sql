-- Maths OL batch 2: notes top-up (append only)

UPDATE study_materials SET content = content || $n$
<h3>Angle facts you must know</h3>
<p>Angles on a straight line sum to 180°; angles at a point sum to 360°; vertically opposite angles are equal. Parallel lines give equal alternate and corresponding angles and supplementary co-interior angles. Give a reason with every step, naming the rule (for example, alternate angles).</p>
<h3>Interior and exterior angles of polygons</h3>
<p>The interior angles of a polygon with n sides sum to (n − 2) × 180°. For a regular polygon each interior angle is that sum divided by n, and each exterior angle is 360° divided by n. The exterior angles of any convex polygon always sum to 360°.</p>
<h3>Triangles and quadrilaterals</h3>
<p>Angles in a triangle sum to 180°, and an exterior angle equals the sum of the two opposite interior angles. Angles in a quadrilateral sum to 360°. Use the properties of isosceles, equilateral and special quadrilaterals to find unknown angles.</p>
$n$ WHERE material_type = 'notes' AND topic_id = (SELECT id FROM topics WHERE slug = 'geometry-angles-and-polygons');

UPDATE study_materials SET content = content || $n$
<h3>Congruent triangles</h3>
<p>Two triangles are congruent when they match on one of four conditions: SSS (three sides), SAS (two sides and the included angle), ASA or AAS (two angles and a side), or RHS (right angle, hypotenuse and a side) for right-angled triangles. SSA is not a condition. Name the congruence test in every proof.</p>
<h3>Similar shapes and scale factors</h3>
<p>Similar shapes have equal angles and proportional sides. The linear scale factor k multiplies lengths, k² multiplies areas and k³ multiplies volumes. To find a missing side, set up the ratio of corresponding sides and cross-multiply.</p>
<h3>Transformations in geometry questions</h3>
<p>A translation is described by a column vector, a rotation by its centre, angle and direction, a reflection by its mirror line and an enlargement by its centre and scale factor. Image points are checked by measuring the same distance from the centre or the mirror line.</p>
$n$ WHERE material_type = 'notes' AND topic_id = (SELECT id FROM topics WHERE slug = 'geometry-congruence-and-similarity');

UPDATE study_materials SET content = content || $n$
<h3>Area formulae</h3>
<p>Rectangle: length × width. Triangle: ½ × base × perpendicular height. Parallelogram: base × perpendicular height. Trapezium: ½(a + b)h, where a and b are the parallel sides. Circle: πr², and circumference 2πr. Leave answers in terms of π when asked, or round to the accuracy stated.</p>
<h3>Volume and surface area</h3>
<p>Prism volume is cross-sectional area × length. Cylinder volume is πr²h. Cone volume is ⅓πr²h and sphere volume is ⁴⁄₃πr³. Surface area of a cylinder is 2πr² + 2πrh. Sketch the solid and label radii and heights before you substitute.</p>
<h3>Units and compound measures</h3>
<p>Convert units before calculating: 1 m² = 10 000 cm² and 1 m³ = 1 000 000 cm³. Density is mass ÷ volume, and speed is distance ÷ time. Keep the units with the answer.</p>
$n$ WHERE material_type = 'notes' AND topic_id = (SELECT id FROM topics WHERE slug = 'mensuration-area-and-volume');

UPDATE study_materials SET content = content || $n$
<h3>Three-figure bearings</h3>
<p>A bearing is measured clockwise from north and written with three figures, so 045° is north-east and 250° is south-west. To find the back bearing, add or subtract 180°. Draw a north line at the starting point and measure the angle carefully with a protractor.</p>
<h3>Scale drawings and distance</h3>
<p>Use the scale given to convert a map distance to a real distance, and convert back when drawing. Scale 1:50 000 means 1 cm on the map represents 50 000 cm, or 0.5 km. Use Pythagoras or trigonometry to find distances where a direct measurement is not possible.</p>
<h3>Loci</h3>
<p>The locus of points at a fixed distance from a point is a circle. Points equidistant from two points lie on the perpendicular bisector of the line joining them. Points equidistant from two lines lie on an angle bisector. Shade a region by combining the loci and stating the condition clearly.</p>
$n$ WHERE material_type = 'notes' AND topic_id = (SELECT id FROM topics WHERE slug = 'mensuration-bearings-and-loci');

UPDATE study_materials SET content = content || $n$
<h3>Place value and ordering</h3>
<p>Each digit is worth ten times the digit to its right. To order decimals, compare digits from left to right, padding with zeros so every number has the same number of decimal places. Rounding to a given number of decimal places or significant figures looks at the next digit: 5 or more rounds up.</p>
<h3>Written methods</h3>
<p>Long multiplication and division are set out in columns with place value kept aligned. Estimate first by rounding each number to one significant figure; the estimate shows whether the exact answer is reasonable. Check using the inverse operation.</p>
<h3>Order of operations</h3>
<p>Brackets, then indices, then division and multiplication from left to right, then addition and subtraction from left to right. For example, 3 + 4 × 2² = 3 + 4 × 4 = 19. Use a calculator's brackets key to enter long expressions in one go.</p>
$n$ WHERE material_type = 'notes' AND topic_id = (SELECT id FROM topics WHERE slug = 'number-arithmetic-and-place-value');

UPDATE study_materials SET content = content || $n$
<h3>Equivalent fractions and simplifying</h3>
<p>Multiply or divide the numerator and denominator by the same non-zero number. Simplify by dividing both by their highest common factor. Mixed numbers are converted to improper fractions before multiplying or dividing.</p>
<h3>Adding and subtracting fractions</h3>
<p>Find the lowest common denominator, rewrite each fraction over it, then add or subtract the numerators only. Multiplying fractions multiplies the numerators and the denominators; dividing multiplies by the reciprocal of the second fraction.</p>
<h3>Percentages</h3>
<p>To find a percentage of a quantity, multiply by the decimal equivalent: 15% of 240 is 0.15 × 240 = 36. Percentage change is the change divided by the original value, multiplied by 100. Repeated percentage change multiplies by one plus the multiplier each time, so 5% increase twice is × 1.05 × 1.05.</p>
$n$ WHERE material_type = 'notes' AND topic_id = (SELECT id FROM topics WHERE slug = 'number-fractions-decimals-and-percentages');

UPDATE study_materials SET content = content || $n$
<h3>Writing and simplifying ratios</h3>
<p>A ratio a : b is simplified by dividing both parts by their highest common factor. Ratios with decimals or fractions are multiplied up to whole numbers first. A ratio shared between a total uses the total number of parts as the divisor.</p>
<h3>Direct and inverse proportion</h3>
<p>In direct proportion, y = kx, so doubling x doubles y. In inverse proportion, y = k ÷ x, so doubling x halves y. Find k from a known pair of values, then use it to answer the question.</p>
<h3>Speed, density and rates</h3>
<p>Rate questions are solved by identifying the two quantities and the unit of the answer. Speed = distance ÷ time; average speed for a journey is the total distance divided by the total time, not the mean of the speeds. Exchange rates and recipe scaling use the same unitary method: find the value of one unit first.</p>
$n$ WHERE material_type = 'notes' AND topic_id = (SELECT id FROM topics WHERE slug = 'number-ratio-rate-and-proportion');

UPDATE study_materials SET content = content || $n$
<h3>The number sets</h3>
<p>Natural numbers are 1, 2, 3 and so on; integers add zero and negatives; rational numbers can be written as a fraction p/q with q not zero; irrational numbers, such as π and √2, cannot. Terminating and recurring decimals are rational. Prime numbers have exactly two factors, 1 and themselves.</p>
<h3>Prime factors and HCF/LCM</h3>
<p>Write a number as a product of primes using a factor tree. The highest common factor uses the common primes at their lowest powers; the lowest common multiple uses every prime at its highest power. Venn diagrams sort numbers by properties such as even, square or prime.</p>
<h3>Square roots and cube roots</h3>
<p>The square root of a number is positive or negative: √16 = 4 but x² = 16 gives x = ±4. Check whether a root is exact or needs a calculator, and give a non-exact answer to the accuracy asked.</p>
$n$ WHERE material_type = 'notes' AND topic_id = (SELECT id FROM topics WHERE slug = 'number-sets');
