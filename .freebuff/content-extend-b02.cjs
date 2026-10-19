// Batch 02: extends six existing maths OL notes toward 2x.
// Consumed by .freebuff/extend-materials.cjs. No backticks and no dollar-brace sequences.
module.exports = {
  expectType: "notes",
  rows: {
    "0922f772-661e-4380-b5a6-141b70f1263c": `
<h3>Worked example: equations with fractions</h3>
<p>Solve 3(x − 2)/4 = x + 1. Multiply both sides by 4 to clear the denominator: 3(x − 2) = 4(x + 1), so 3x − 6 = 4x + 4, which gives −10 = x. Check by substitution: left side 3(−12)/4 = −9 and right side −10 + 1 = −9. Both agree, so x = −10.</p>
<p>Examiners award the method mark for clearing the fraction correctly, so write the line where every term is multiplied by the denominator before you expand.</p>
<h3>Unknowns on both sides</h3>
<p>Solve 5x + 3 = 2x − 9. Subtract 2x from both sides to get 3x + 3 = −9, then subtract 3 to get 3x = −12, so x = −4. Keeping the unknowns on the side where the coefficient stays positive avoids negative-sign slips.</p>
<h3>Quadratics and the discriminant</h3>
<p>For ax² + bx + c = 0, the discriminant b² − 4ac decides how many real roots there are. If it is positive there are two distinct real roots, if it is zero there is one repeated root, and if it is negative there are no real roots.</p>
<p>Example: 2x² + 3x − 5 = 0 has discriminant 9 + 40 = 49. The formula gives x = (−3 ± 7)/4, so x = 1 or x = −2.5. Check x = 1: 2 + 3 − 5 = 0.</p>
<h3>Common errors that lose marks</h3>
<ul>
<li>Dividing both sides of an equation by a variable, which can lose a solution (for example x² = 4x has solutions 0 and 4).</li>
<li>Applying the quadratic formula with the wrong sign on b, for example writing −3 when b = +3 in the formula.</li>
<li>Stopping at a rearranged formula without isolating the subject, or leaving a square root unsimplified when the question asks for an exact answer.</li>
</ul>
`,
    "32494a39-439f-420e-9bf7-d3421da7c2e6": `
<h3>Worked example: gradient and equation of a line</h3>
<p>A line passes through (1, 3) and (4, −3). The gradient is (−3 − 3)/(4 − 1) = −6/3 = −2. Substituting into y = mx + c with the point (1, 3) gives 3 = −2 + c, so c = 5 and the equation is y = −2x + 5.</p>
<p>A parallel line has the same gradient, so a line through (0, 1) parallel to this one is y = −2x + 1. A perpendicular line has gradient 1/2.</p>
<h3>Turning points of a quadratic</h3>
<p>For y = x² − 6x + 5, complete the square: y = (x − 3)² − 4. The minimum turning point is (3, −4), and the curve crosses the x-axis where (x − 3)² = 4, that is at x = 1 and x = 5. Sketch the curve through these points and label the turning point.</p>
<h3>Gradient of a curve at a point</h3>
<p>Between two points on a curve, the average rate of change is the gradient of the chord. To estimate the gradient at a point, draw a tangent by eye and find its gradient from two clearly read points on the tangent, using a large triangle. The answer will only be as accurate as your tangent.</p>
<h3>Reading a graph in context</h3>
<p>A distance–time graph has gradient equal to speed, so a horizontal section means the object is stationary. A speed–time graph has gradient equal to acceleration, and the area under it equals the distance travelled. Always state the units of the gradient, for example m/s or m/s².</p>
<ul>
<li>Plot points carefully and join curves with a smooth line, not straight segments.</li>
<li>When a question asks you to use a graph to solve an equation, draw the line y = (the right-hand side) and read off the x-values where the curve crosses it.</li>
</ul>
`,
    "a5a88378-f424-47de-9f47-e92967a125cc": `
<h3>Worked example: solving a linear inequality</h3>
<p>Solve 3x − 7 &lt; 2x + 4. Subtract 2x from both sides to get x − 7 &lt; 4, then add 7 to get x &lt; 11. The solution set is every number less than 11, which has no lower bound.</p>
<h3>Double inequalities and integer solutions</h3>
<p>Solve −3 ≤ 2x + 1 &lt; 7. Subtract 1 from each part: −4 ≤ 2x &lt; 6. Divide each part by 2: −2 ≤ x &lt; 3. The integer solutions are −2, −1, 0, 1 and 2. Remember that the ≤ sign includes −2 and the &lt; sign excludes 3.</p>
<h3>Multiplying or dividing by a negative number</h3>
<p>Solve 8 − 3x &gt; 2. Subtract 8: −3x &gt; −6. Divide by −3 and reverse the sign: x &lt; 2. Forgetting to reverse the sign is the most common lost mark in this topic.</p>
<h3>Quadratic inequalities</h3>
<p>Solve x² − x − 6 ≤ 0. Factorise to (x − 3)(x + 2) ≤ 0. The expression is zero at x = 3 and x = −2, and it is negative between them. The solution is −2 ≤ x ≤ 3. Sketch the parabola to see which region is below the axis.</p>
<h3>Shading regions on a grid</h3>
<ul>
<li>Draw a boundary line as a solid line for ≤ or ≥, and as a dashed line for &lt; or &gt;.</li>
<li>Test a point that is not on the line, usually (0, 0) if the line does not pass through it, to decide which side to shade.</li>
<li>If the question asks for a region bounded by several inequalities, shade each one lightly and leave the overlap clear.</li>
</ul>
`,
    "f87684c4-ab07-4f84-825d-b9fee9f73bc6": `
<h3>Worked example: expanding and collecting terms</h3>
<p>Expand (2x + 3)(x − 4). Multiply each term in the first bracket by each term in the second: 2x × x = 2x², 2x × (−4) = −8x, 3 × x = 3x, 3 × (−4) = −12. Collect the like terms: 2x² − 5x − 12.</p>
<p>A quick check is to substitute x = 1: (5)(−3) = −15, and 2 − 5 − 12 = −15. The two agree.</p>
<h3>Factorising quadratics and the difference of two squares</h3>
<p>Factorise x² + x − 12. Find two numbers that multiply to −12 and add to +1: +4 and −3. So x² + x − 12 = (x + 4)(x − 3).</p>
<p>The difference of two squares gives 4x² − 9 = (2x − 3)(2x + 3). Recognise it whenever there is no middle term and both terms are squares with a minus sign between them.</p>
<h3>Simplifying algebraic fractions</h3>
<p>Simplify (x² − 9)/(x² + x − 6). Factorise the numerator as (x − 3)(x + 3) and the denominator as (x + 3)(x − 2). Cancel the common factor (x + 3) to get (x − 3)/(x − 2), with the restriction x ≠ −3 stated because the original expression is undefined there.</p>
<h3>Common errors that lose marks</h3>
<ul>
<li>Writing (a + b)² = a² + b², which drops the middle term 2ab.</li>
<li>Cancelling a term rather than a factor, for example simplifying (x + 3)/(x + 2) to 3/2.</li>
<li>Expanding a negative bracket without changing the signs inside it: −(x − 4) = −x + 4.</li>
</ul>
`,
    "dc3d7286-feb5-4d75-99e1-ce0941a6a237": `
<h3>Worked example: interior and exterior angles</h3>
<p>A regular polygon has n sides. The sum of its interior angles is (n − 2) × 180°, and each exterior angle is 360°/n. For a regular decagon (n = 10) the sum of interior angles is 8 × 180° = 1440°, so each interior angle is 144°, and each exterior angle is 36°.</p>
<p>Check that exterior and interior angles sum to 180° at each vertex: 36° + 144° = 180°.</p>
<h3>Angles in a circle</h3>
<ul>
<li>The angle at the centre is twice the angle at the circumference subtended by the same arc.</li>
<li>Angles in the same segment are equal.</li>
<li>The angle in a semicircle is 90°.</li>
<li>Opposite angles of a cyclic quadrilateral sum to 180°.</li>
<li>A tangent meets a radius at 90°.</li>
</ul>
<p>Example: O is the centre of a circle and the angle at the circumference subtended by an arc is 35°. The angle at the centre is 70°.</p>
<h3>Working with unknown angles</h3>
<p>Give a reason for every step, for example "angles on a straight line sum to 180°" or "base angles of an isosceles triangle are equal". The reason is part of the mark scheme and is often awarded separately from the numerical answer.</p>
<p>In an isosceles triangle with apex angle 40°, each base angle is (180° − 40°)/2 = 70°.</p>
`,
    "c003d9a3-a2b3-4cd9-a6af-7fdbe98cf9d6": `
<h3>Worked example: proving congruence</h3>
<p>Triangles ABC and PQR have AB = PQ, angle B = angle Q and BC = QR. These are two sides and the included angle, so the triangles are congruent by SAS. A correct proof names the criterion and lists the equal parts in the same order as the letters.</p>
<h3>The four congruence conditions</h3>
<ul>
<li>SSS: three pairs of equal sides.</li>
<li>SAS: two pairs of equal sides with the angle between them equal.</li>
<li>ASA or AAS: two pairs of equal angles and one pair of equal sides.</li>
<li>RHS: a right angle, the hypotenuse and one other side equal, for right-angled triangles only.</li>
</ul>
<p>SSA is not a valid condition, because the angle may not be the one between the sides, and two different triangles can share those measurements.</p>
<h3>Similar shapes and scale factors</h3>
<p>If two shapes are similar with scale factor k, every length multiplies by k, every area by k², and every volume by k³. Example: two similar solids have a height ratio 2 : 3. The area ratio is 4 : 9 and the volume ratio is 8 : 27.</p>
<p>To find a missing length, set up the ratio from a known pair: if a side of 6 cm on the small shape matches 9 cm on the large one, the scale factor is 1.5 and an 8 cm side becomes 12 cm.</p>
<h3>Symmetry</h3>
<ul>
<li>A shape has rotational symmetry of order n if it looks the same after rotations of 360°/n about its centre.</li>
<li>A regular hexagon has six lines of symmetry and rotational symmetry of order 6.</li>
<li>Count lines of symmetry on the diagram itself, and check each one with a tracing or a mirror image.</li>
</ul>
`
  }
};
