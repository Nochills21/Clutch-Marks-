// Mathematics A2 notes, deepened to the depth bar — batch D:
// Complex Numbers (3.9), Coordinate Geometry, Vectors (3.7),
// The Binomial Distribution.
module.exports = {
  titles: {
    "d40be9ac-7510-48c6-82ed-0ad1c587fe37": "A Level Mathematics: Complex Numbers",
    "022b44ee-69e7-427d-9442-1a55a32580fb": "A Level Mathematics: Coordinate Geometry",
    "7ff7a883-b6e3-483a-aa83-bea75fbfc73f": "A Level Mathematics: Vectors",
    "e1a3c834-71a5-46c5-87e6-4700be5beeb8": "A Level Mathematics: The Binomial Distribution",
  },
  rows: {
    "d40be9ac-7510-48c6-82ed-0ad1c587fe37": `
<h2>A Level Mathematics: Complex Numbers</h2>
<p>Complex numbers exist because the real number line is not big enough to solve every quadratic. The equation x² + 1 = 0 has no real solution, and rather than declaring it unsolvable mathematicians invented a number whose square is −1 and then discovered that the resulting system is not a curiosity but the natural home of rotation, oscillation and alternating current. This note builds the arithmetic from that single definition, then shows the two representations — Cartesian a + bi and modulus-argument — and why switching between them turns multiplication into something you can do in your head.</p>

<h3>Why the number system needed extending</h3>
<p>The real numbers are ordered: given any two, one is bigger. That ordering is exactly what a complex number gives up, and it is why complex numbers cannot be drawn on a line but can be drawn on a plane. The analogy that makes the extension feel inevitable is the one that produced negative numbers: subtracting a larger number from a smaller one was once impossible, so the integers were invented to close the gap. Square-rooting a negative number closes the next gap in the same way.</p>
<pre><code>i is defined by  i^2 = -1
a complex number is z = a + bi, where a and b are real
a = Re(z)  the real part;  b = Im(z)  the imaginary part
two complex numbers are equal only when both parts match:
a + bi = c + di  means  a = c and b = d</code></pre>
<p>The last line is not a triviality — it is the standard method for finding unknown constants in complex equations, because one equation in complex numbers carries two real equations inside it.</p>

<h3>Arithmetic in Cartesian form</h3>
<p>Addition and subtraction work component by component, exactly like vectors. Multiplication works by expanding the brackets and then replacing i² with −1; nothing else is needed.</p>
<pre><code>(3 + 2i) + (1 - 5i) = 4 - 3i
(3 + 2i)(1 - 5i) = 3 - 15i + 2i - 10i^2 = 3 - 13i + 10 = 13 - 13i</code></pre>
<p><strong>Worked example.</strong> Expand (2 + 3i)².</p>
<pre><code>(2 + 3i)(2 + 3i) = 4 + 6i + 6i + 9i^2
= 4 + 12i - 9
= -5 + 12i</code></pre>
<p><strong>Worked example 2 (a product that comes out real).</strong> Expand (4 + 3i)(4 − 3i).</p>
<pre><code>= 16 - 12i + 12i - 9i^2 = 16 + 9 = 25</code></pre>
<p>That result is not a coincidence: it is the complex analogue of the difference of two squares, and it is the engine of division.</p>
<p>Powers of i cycle with period four, which saves a great deal of work:</p>
<table>
<tr><th>Power</th><th>Value</th><th>Reason</th></tr>
<tr><td>i¹</td><td>i</td><td>definition</td></tr>
<tr><td>i²</td><td>−1</td><td>definition</td></tr>
<tr><td>i³</td><td>−i</td><td>i² × i</td></tr>
<tr><td>i⁴</td><td>1</td><td>(i²)² = 1</td></tr>
</table>
<p>So i^99 = i^(96+3) = (i⁴)^24 × i³ = −i, because 99 divided by 4 leaves remainder 3.</p>

<h3>Complex conjugates and division</h3>
<p>Division is made possible by the conjugate: the number with the imaginary part negated, written with a bar over the z. Multiplying a number by its own conjugate always gives a real, non-negative result, which is what allows the i to be cleared from a denominator.</p>
<pre><code>conjugate of z = a + bi is z-bar = a - bi
z x z-bar = a^2 + b^2  (always real, always >= 0)
to divide: multiply numerator and denominator by the conjugate of the denominator</code></pre>
<p><strong>Worked example.</strong> Write (3 + 4i)/(1 − 2i) in the form a + bi.</p>
<pre><code>multiply by (1 + 2i)/(1 + 2i):
numerator: (3 + 4i)(1 + 2i) = 3 + 6i + 4i + 8i^2 = 3 + 10i - 8 = -5 + 10i
denominator: (1 - 2i)(1 + 2i) = 1 + 4 = 5
result: (-5 + 10i)/5 = -1 + 2i</code></pre>
<p><strong>Worked example 2 (solving an equation).</strong> Find real x and y such that (x + iy)(2 − i) = 5 + i.</p>
<pre><code>expand: 2x - xi + 2yi - i^2 y = (2x + y) + (2y - x)i
match parts:  2x + y = 5  and  2y - x = 1
from the second: x = 2y - 1
substitute: 2(2y - 1) + y = 5  ->  5y = 7  ->  y = 1.4, x = 1.8</code></pre>

<h3>The Argand diagram and modulus-argument form</h3>
<p>A complex number is a point, and the plane it lives in is the Argand diagram: real part across, imaginary part up. That picture immediately supplies two other ways to describe the same point — how far it is from the origin and at what angle — and those are the coordinates that make multiplication behave.</p>
<pre><code>modulus |z| = sqrt(a^2 + b^2)     (distance from the origin)
argument arg z = theta, the angle from the positive real axis
principal argument: -180 &lt; theta &lt;= 180 degrees (or -pi &lt; theta &lt;= pi)
\ntan theta = b/a, but the quadrant decides the actual angle</code></pre>
<p><strong>Worked example.</strong> Find the modulus and argument of z = −1 + √3 i.</p>
<pre><code>|z| = sqrt(1 + 3) = 2
the point is in the second quadrant (a negative, b positive)
reference angle: tan^-1(sqrt3/1) = 60 degrees
argument = 180 - 60 = 120 degrees
so z = 2(cos 120 + i sin 120)</code></pre>
<p><strong>Worked example 2 (fourth quadrant).</strong> Find the argument of z = 3 − 3i.</p>
<pre><code>|z| = sqrt(9 + 9) = 4.243
tan^-1(-3/3) = -45 degrees, and the point is in the fourth quadrant
so the principal argument is -45 degrees (equivalently 315 degrees)</code></pre>

<h3>Multiplying and dividing in modulus-argument form</h3>
<p>In Cartesian form multiplication is a bracket expansion; in modulus-argument form it is two separate, simple operations. That is the whole reason the form exists.</p>
<pre><code>z1 z2:  multiply the moduli, add the arguments
z1/z2:  divide the moduli, subtract the arguments
z^n:    modulus^n, argument x n     (de Moivre's theorem)</code></pre>
<p><strong>Worked example.</strong> z1 = 2(cos 30° + i sin 30°) and z2 = 3(cos 80° + i sin 80°). Find z1z2 and z1/z2.</p>
<pre><code>z1 z2 = 6(cos 110 + i sin 110)
z1/z2 = (2/3)(cos(-50) + i sin(-50)) = 0.667(cos 50 - i sin 50)</code></pre>
<p><strong>Worked example 2 (de Moivre).</strong> Find (1 + i)⁸.</p>
<pre><code>|1 + i| = sqrt 2, arg = 45 degrees
(1 + i)^8 = (sqrt2)^8 (cos 360 + i sin 360) = 16(1 + 0i) = 16</code></pre>
<p><strong>Worked example 3 (geometric reading).</strong> Describe what multiplying by i does to a point on the Argand diagram.</p>
<pre><code>i has modulus 1 and argument 90 degrees
so multiplying by i keeps the distance from the origin and adds 90 degrees
that is a quarter turn anticlockwise - multiplication as rotation</code></pre>

<h3>Roots of polynomial equations</h3>
<p>Real-coefficient polynomials have complex roots in conjugate pairs. That single fact lets you go from one known root to two, halve the degree by dividing out a quadratic factor, and often finish the job with ordinary factorisation.</p>
<pre><code>if a + bi is a root of a polynomial with real coefficients, then a - bi is too
the pair supplies the quadratic factor (z - (a+bi))(z - (a-bi)) = z^2 - 2az + (a^2 + b^2)</code></pre>
<p><strong>Worked example.</strong> 2 + i is a root of z³ − 5z² + 9z − 5. Find all three roots.</p>
<pre><code>conjugate pair: 2 + i and 2 - i
quadratic factor: z^2 - 4z + 5
divide: (z^3 - 5z^2 + 9z - 5) / (z^2 - 4z + 5) = z - 1
roots: 2 + i, 2 - i, 1</code></pre>
<p><strong>Worked example 2 (forming an equation).</strong> Find the quadratic with roots 3 ± 2i.</p>
<pre><code>sum = 6, product = 9 + 4 = 13
z^2 - 6z + 13 = 0</code></pre>

<h3>Loci on the Argand diagram</h3>
<p>A locus question asks for the set of points satisfying a condition on a complex number, and every standard condition has a shape you should recognise without algebra.</p>
<table>
<tr><th>Condition</th><th>Shape</th><th>Why</th></tr>
<tr><td>|z − a| = r</td><td>circle, centre a, radius r</td><td>constant distance from a point</td></tr>
<tr><td>|z − a| = |z − b|</td><td>perpendicular bisector of ab</td><td>equidistant from two points</td></tr>
<tr><td>arg(z − a) = θ</td><td>half-line from a at angle θ</td><td>constant direction, one-way</td></tr>
<tr><td>|z − a| ≤ r</td><td>closed disc</td><td>the inequality includes the boundary</td></tr>
</table>
<p><strong>Worked example.</strong> Sketch the locus of |z − 3 − 4i| = 5 and state its centre and radius.</p>
<pre><code>rewrite: |z - (3 + 4i)| = 5
circle, centre 3 + 4i, radius 5
it passes through the origin because |0 - 3 - 4i| = 5</code></pre>
<p><strong>Worked example 2 (inequality region).</strong> Describe the region |z − 1| &lt; 2 and arg z &gt; 45°.</p>
<pre><code>inside the circle centre 1 radius 2 (not the boundary)
AND above the half-line from the origin at 45 degrees
the answer is the part of the disc lying above that ray</code></pre>

<h3>Exponential form and Euler's relation</h3>
<p>The modulus-argument form is usually written more compactly as re^(iθ), using Euler's relation. That notation is not decoration: it makes the multiplication rules obvious, because exponentials multiply by adding their powers.</p>
<pre><code>Euler: e^(i theta) = cos theta + i sin theta
so z = r e^(i theta)
z1 z2 = r1 r2 e^(i(theta1 + theta2))
z^n = r^n e^(i n theta)
z-bar = r e^(-i theta)</code></pre>
<p><strong>Worked example.</strong> Write z = 1 + i in exponential form and hence find z⁶.</p>
<pre><code>r = sqrt 2, theta = pi/4  ->  z = sqrt2 e^(i pi/4)
z^6 = (sqrt2)^6 e^(i 6 pi/4) = 8 e^(i 3pi/2) = 8(cos 270 + i sin 270) = -8i</code></pre>
<p><strong>Worked example 2 (cos and sin from exponentials).</strong> Use Euler's relation to express cos θ in terms of exponentials.</p>
<pre><code>e^(i theta) = cos theta + i sin theta
e^(-i theta) = cos theta - i sin theta
adding: 2 cos theta = e^(i theta) + e^(-i theta)
cos theta = (e^(i theta) + e^(-i theta))/2</code></pre>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Powers)</strong> Simplify i^35. <em>Answer:</em> 35 = 4 × 8 + 3, so i^35 = i³ = −i.</li>
<li><strong>(Arithmetic)</strong> Write (5 − 2i)(3 + 4i) in the form a + bi. <em>Answer:</em> 15 + 20i − 6i − 8i² = 23 + 14i.</li>
<li><strong>(Division)</strong> Write (2 + i)/(3 − i) in the form a + bi. <em>Answer:</em> multiply by (3 + i): (5 + 5i)/10 = 0.5 + 0.5i.</li>
<li><strong>(Modulus)</strong> Find |4 − 3i|. <em>Answer:</em> √(16 + 9) = 5.</li>
<li><strong>(Argument)</strong> Find arg(−2 − 2i) in the principal range. <em>Answer:</em> third quadrant, so −135°.</li>
<li><strong>(De Moivre)</strong> Find (√3 + i)⁴. <em>Answer:</em> r = 2, θ = 30°, so 16(cos 120 + i sin 120) = −8 + 8√3 i.</li>
<li><strong>(Roots)</strong> 1 − 2i is a root of z² − 2z + 5 = 0. State the other root. <em>Answer:</em> 1 + 2i.</li>
<li><strong>(Locus)</strong> Describe |z + 2| = 3. <em>Answer:</em> circle centre −2, radius 3.</li>
<li><strong>(Locus)</strong> Describe arg(z − 1) = π/3. <em>Answer:</em> half-line from 1 at 60°, excluding the point itself.</li>
<li><strong>(Exponential)</strong> Write 2 − 2i as re^(iθ). <em>Answer:</em> r = 2√2, θ = −45°, so 2√2 e^(−iπ/4).</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Squaring the imaginary part only:</strong> (2i)² = −4, not 4i² left uncollected, and (a + bi)² has a middle term 2abi that is easy to drop.</li>
<li><strong>Conjugate applied to the numerator:</strong> divide by multiplying both parts by the conjugate of the <em>denominator</em> only.</li>
<li><strong>Argument in the wrong quadrant:</strong> tan⁻¹(b/a) returns a first-quadrant angle; add or subtract 180° to place it correctly.</li>
<li><strong>Principal range ignored:</strong> an argument of 300° is written −60°, not 300°, when the question asks for the principal value.</li>
<li><strong>Modulus of a sum:</strong> |z1 + z2| is not |z1| + |z2|; only products and quotients distribute over modulus.</li>
<li><strong>Conjugate pairs assumed for complex coefficients:</strong> the pairing holds for real coefficients, which is the case in every exam question — but say so when justifying.</li>
<li><strong>Locus with the wrong centre:</strong> |z − a| is a circle centred at a, not at −a; the sign inside the modulus flips the centre.</li>
<li><strong>deg/rad mode:</strong> de Moivre in radians while the question is in degrees gives a phase that is wrong by a factor of 57.3.</li>
</ul>
`,
    "022b44ee-69e7-427d-9442-1a55a32580fb": `
<h2>A Level Mathematics: Coordinate Geometry</h2>
<p>Coordinate geometry is the bridge between algebra and shape: every geometric object is described by an equation, and every geometric question becomes an algebraic one. This note starts from the two measurements that define a straight line — how far and how steep — and builds outwards to circles, tangents, chords and the discriminant conditions that decide whether a line meets a curve at all. The exam almost never asks for a definition; it asks you to combine two or three of these tools in one question, so each one is presented with the situation that calls for it.</p>

<h3>Distance, midpoint and gradient</h3>
<p>Everything else is built on three formulas. They come from Pythagoras and from averaging, and they are worth being able to derive rather than recall.</p>
<pre><code>for A(x1, y1) and B(x2, y2):
distance AB = sqrt((x2 - x1)^2 + (y2 - y1)^2)     Pythagoras on the step
midpoint   = ((x1 + x2)/2, (y1 + y2)/2)            the averages
gradient m = (y2 - y1)/(x2 - x1)                   rise over run</code></pre>
<p><strong>Worked example.</strong> For A(2, −1) and B(8, 7), find the distance AB, the midpoint and the gradient.</p>
<pre><code>distance = sqrt(6^2 + 8^2) = sqrt(100) = 10
midpoint = ((2+8)/2, (-1+7)/2) = (5, 3)
gradient = 8/6 = 4/3</code></pre>
<p><strong>Worked example 2 (finding an unknown).</strong> The distance from (1, 2) to (4, k) is 5. Find k.</p>
<pre><code>sqrt(3^2 + (k-2)^2) = 5
9 + (k-2)^2 = 25
(k-2)^2 = 16  ->  k - 2 = 4 or -4
k = 6 or k = -2</code></pre>
<p>Two answers, not one: the square root in the distance formula hides a sign, and examiners always intend both.</p>

<h3>Forms of the equation of a straight line</h3>
<p>Three forms, each suited to a different piece of information. Choosing the wrong one costs time, not marks, but the wrong one also invites arithmetic slips.</p>
<table>
<tr><th>Form</th><th>Equation</th><th>Use when you know</th></tr>
<tr><td>gradient–intercept</td><td>y = mx + c</td><td>gradient and intercept, or for sketching</td></tr>
<tr><td>point–gradient</td><td>y − y1 = m(x − x1)</td><td>gradient and one point</td></tr>
<tr><td>general</td><td>ax + by + c = 0</td><td>the form most mark schemes quote</td></tr>
</table>
<p><strong>Worked example.</strong> Find the equation of the line through (3, −2) with gradient −1/2, in general form.</p>
<pre><code>y + 2 = (-1/2)(x - 3)
2y + 4 = -x + 3
x + 2y + 1 = 0</code></pre>
<p><strong>Worked example 2 (two points).</strong> Find the equation of the line through (1, 4) and (5, 2).</p>
<pre><code>m = (2 - 4)/(5 - 1) = -1/2
y - 4 = -0.5(x - 1)  ->  y = -0.5x + 4.5
or x + 2y - 9 = 0</code></pre>

<h3>Parallel and perpendicular lines</h3>
<p>Parallel means equal gradients. Perpendicular means the gradients multiply to −1, which is the same as one being the negative reciprocal of the other. Recognising that the negative reciprocal is a rotation by 90° prevents the common error of negating without inverting.</p>
<pre><code>parallel: m1 = m2
perpendicular: m1 x m2 = -1, so m2 = -1/m1</code></pre>
<p><strong>Worked example.</strong> Find the perpendicular bisector of the segment joining A(2, 5) and B(6, 1).</p>
<pre><code>midpoint = (4, 3)
gradient AB = (1 - 5)/(6 - 2) = -1
perpendicular gradient = 1
equation: y - 3 = 1(x - 4)  ->  y = x - 1</code></pre>
<p><strong>Worked example 2 (proving a right angle).</strong> Show that the triangle with vertices P(1, 1), Q(4, 2) and R(3, 5) is right-angled at Q.</p>
<pre><code>gradient PQ = (2 - 1)/(4 - 1) = 1/3
gradient QR = (5 - 2)/(3 - 4) = -3
product = (1/3)(-3) = -1  ->  perpendicular, so the angle at Q is 90 degrees</code></pre>

<h3>The equation of a circle</h3>
<p>A circle is the set of points a fixed distance from a fixed centre, so the distance formula written with an unknown point gives the equation directly.</p>
<pre><code>centre (a, b), radius r:   (x - a)^2 + (y - b)^2 = r^2
expanded form: x^2 + y^2 + 2gx + 2fy + c = 0
completing the square recovers the centre (-g, -f) and radius sqrt(g^2 + f^2 - c)</code></pre>
<p><strong>Worked example.</strong> Find the centre and radius of x² + y² − 6x + 8y − 11 = 0.</p>
<pre><code>complete the square in x: x^2 - 6x = (x - 3)^2 - 9
in y: y^2 + 8y = (y + 4)^2 - 16
so (x - 3)^2 + (y + 4)^2 - 9 - 16 - 11 = 0
(x - 3)^2 + (y + 4)^2 = 36
centre (3, -4), radius 6</code></pre>
<p><strong>Worked example 2 (finding the equation).</strong> Find the equation of the circle with diameter AB where A(1, 2) and B(7, 10).</p>
<pre><code>centre = midpoint = (4, 6)
radius = half of AB = 0.5 sqrt(6^2 + 8^2) = 5
(x - 4)^2 + (y - 6)^2 = 25</code></pre>
<p>The diameter shortcut is worth remembering: the angle in a semicircle is a right angle, so any point on the circle sees AB at 90°, which is another route into the same equation.</p>

<h3>Tangents, normals and chords</h3>
<p>A tangent touches the circle at exactly one point and is perpendicular to the radius there. That single fact generates almost every circle question in the paper.</p>
<pre><code>to find the tangent at P on a circle:
1. gradient of the radius from the centre to P
2. tangent gradient = negative reciprocal
3. use point-gradient form with P</code></pre>
<p><strong>Worked example.</strong> Find the tangent to x² + y² = 25 at the point (3, 4).</p>
<pre><code>centre is the origin, so radius gradient = 4/3
tangent gradient = -3/4
y - 4 = (-3/4)(x - 3)
4y - 16 = -3x + 9  ->  3x + 4y = 25</code></pre>
<p><strong>Worked example 2 (chord).</strong> A chord of the circle x² + y² = 25 lies on the line y = 3. Find its length.</p>
<pre><code>substitute: x^2 + 9 = 25  ->  x^2 = 16  ->  x = +/-4
endpoints (-4, 3) and (4, 3)
length = 8</code></pre>
<p><strong>Worked example 3 (perpendicular from the centre bisects a chord).</strong> Use that fact to find the distance from the centre to a chord of length 8 in a circle of radius 5.</p>
<pre><code>half the chord = 4
distance = sqrt(5^2 - 4^2) = 3</code></pre>

<h3>Intersections and the discriminant</h3>
<p>Substituting a line into a circle gives a quadratic. How many times the line meets the circle is decided by the discriminant, so a tangency condition is a discriminant-equals-zero condition.</p>
<pre><code>substitute y = mx + c into the circle equation
b^2 - 4ac &gt; 0: two intersections (secant)
b^2 - 4ac = 0: one intersection (tangent)
b^2 - 4ac &lt; 0: no intersection</code></pre>
<p><strong>Worked example.</strong> Show that the line y = x + 5 is a tangent to x² + y² = 12.5, and find the point of contact.</p>
<pre><code>x^2 + (x + 5)^2 = 12.5
2x^2 + 10x + 25 - 12.5 = 0
2x^2 + 10x + 12.5 = 0   ->  divide by 2: x^2 + 5x + 6.25 = 0
discriminant = 25 - 25 = 0, so tangent
repeated root: x = -2.5, y = 2.5</code></pre>
<p><strong>Worked example 2 (finding an unknown gradient).</strong> Find the values of m for which y = mx is tangent to (x − 3)² + y² = 4.</p>
<pre><code>substitute: (x - 3)^2 + m^2 x^2 = 4
(1 + m^2)x^2 - 6x + 5 = 0
for tangency: 36 - 4(1 + m^2)(5) = 0
36 = 20 + 20m^2  ->  m^2 = 0.8  ->  m = +/- 0.894</code></pre>

<h3>Parametric circles and arcs</h3>
<p>A circle can also be described by a parameter, which is often the easier form when a point has to move. For a circle of radius r centred at the origin, the point (r cos θ, r sin θ) traces it as θ increases.</p>
<pre><code>x = r cos theta, y = r sin theta  satisfies x^2 + y^2 = r^2
centre (a, b): x = a + r cos theta, y = b + r sin theta
this is why the modulus-argument form of a complex number is a point on a circle</code></pre>
<p><strong>Worked example.</strong> A point moves on x² + y² = 9 with x = 3 cos θ. Find y and the coordinates when θ = 60°.</p>
<pre><code>y = 3 sin theta
at theta = 60: (3 cos 60, 3 sin 60) = (1.5, 2.598)</code></pre>
<p><strong>Worked example 2 (eliminating the parameter).</strong> Eliminate θ from x = 2 + 4 cos θ, y = −1 + 4 sin θ.</p>
<pre><code>cos theta = (x - 2)/4;  sin theta = (y + 1)/4
square and add: ((x-2)/4)^2 + ((y+1)/4)^2 = 1
(x - 2)^2 + (y + 1)^2 = 16</code></pre>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Distance)</strong> Find the distance between (3, −2) and (−1, 4). <em>Answer:</em> √(16 + 36) = √52 = 7.21.</li>
<li><strong>(Midpoint)</strong> The midpoint of AB is (5, 1) and A is (2, −3). Find B. <em>Answer:</em> B = (8, 5).</li>
<li><strong>(Line)</strong> Find the line through (0, 4) perpendicular to y = 2x + 1. <em>Answer:</em> y = −0.5x + 4.</li>
<li><strong>(Circle)</strong> State the centre and radius of (x + 2)² + (y − 5)² = 49. <em>Answer:</em> centre (−2, 5), radius 7.</li>
<li><strong>(Completed square)</strong> Find the radius of x² + y² + 4x − 6y = 12. <em>Answer:</em> (x+2)² + (y−3)² = 25, radius 5.</li>
<li><strong>(Tangent)</strong> Find the tangent to x² + y² = 20 at (2, 4). <em>Answer:</em> gradient of radius 2, tangent −0.5, so x + 2y = 10.</li>
<li><strong>(Chord)</strong> Line y = 2 cuts x² + y² = 13. Find the chord length. <em>Answer:</em> x = ±3, length 6.</li>
<li><strong>(Discriminant)</strong> Show y = 2x + 5 does not meet x² + y² = 4. <em>Answer:</em> 5x² + 20x + 21 = 0, discriminant 400 − 420 &lt; 0.</li>
<li><strong>(Circle from diameter)</strong> Find the circle with diameter from (0, 0) to (6, 8). <em>Answer:</em> centre (3, 4), radius 5, (x−3)² + (y−4)² = 25.</li>
<li><strong>(Parametric)</strong> Eliminate θ from x = cos θ, y = 2 sin θ. <em>Answer:</em> x² + y²/4 = 1, an ellipse.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Perpendicular gradient half-applied:</strong> the negative reciprocal of 3 is −1/3, not −3; negating without inverting is the classic slip.</li>
<li><strong>Radius squared:</strong> (x − a)² + (y − b)² = 49 has radius 7, not 49 — the right-hand side is r².</li>
<li><strong>Sign of the centre:</strong> (x − 3)² means centre x = +3; students routinely write −3.</li>
<li><strong>Completing the square with the constant:</strong> the −9 and −16 produced by completing the square must move to the other side, and forgetting them changes the radius.</li>
<li><strong>One root from a squared distance:</strong> √(k−2)² = 4 gives two values; the geometry usually admits both.</li>
<li><strong>Tangent versus normal:</strong> a tangent is perpendicular to the radius; the normal is along it. Read which is asked.</li>
<li><strong>Intersections solved approximately:</strong> the discriminant route gives exact values and the marks; sketching loses the algebra marks.</li>
<li><strong>General form left unsimplified:</strong> mark schemes quote ax + by + c = 0 with integer coefficients where possible, so clear the fractions.</li>
</ul>
`,
    "7ff7a883-b6e3-483a-aa83-bea75fbfc73f": `
<h2>A Level Mathematics: Vectors</h2>
<p>A vector is a quantity with both size and direction, and the whole subject is the algebra of arrows. The idea feels abstract until you notice you already use it: a displacement of three miles north-east is a vector, the wind reported as 20 km/h from the west is a vector, and the instruction to walk to a point is a vector. This note builds vectors from components, shows how to add and scale them, then uses the scalar product to measure the angle between two directions — the tool that turns vector algebra into geometry.</p>

<h3>What a vector is, and what it is not</h3>
<p>A scalar has size alone. A vector has size and direction, and two vectors are equal only if both match. That is why a vector is written with an arrow or in bold, and why reversing the arrow changes the vector into its negative even though the length is unchanged.</p>
<pre><code>vector a has magnitude |a| and direction
-a has the same magnitude, opposite direction
the zero vector 0 has no direction and magnitude 0
a unit vector has magnitude 1 and gives a direction</code></pre>
<p>The distinction matters in mechanics: displacement and velocity are vectors, distance and speed are scalars, and mixing them up is how answers acquire impossible units. A direction given as a bearing is the same information in a different costume, and converting between a compass bearing and a pair of components is a routine exam step.</p>

<h3>Components and magnitude</h3>
<p>In two dimensions a vector is written as a column of its two components, one per axis. The house convention in this course writes a column vector as (x; y), the first component horizontal and the second vertical.</p>
<pre><code>a = (3; 4)
magnitude |a| = sqrt(3^2 + 4^2) = 5
in three dimensions: a = (x; y; z), |a| = sqrt(x^2 + y^2 + z^2)</code></pre>
<p><strong>Worked example.</strong> Find the magnitude of (6; −8). Draw the reasoning, not just the answer.</p>
<pre><code>|a| = sqrt(36 + 64) = 10
the components form a right triangle with legs 6 and 8, so this is a 3-4-5 triangle scaled by 2</code></pre>
<p><strong>Worked example 2 (unit vector).</strong> Find the unit vector in the direction of (6; −8).</p>
<pre><code>divide by the magnitude: (6/10; -8/10) = (0.6; -0.8)
check: 0.36 + 0.64 = 1</code></pre>
<p><strong>Worked example 3 (3-D).</strong> Find the magnitude of (2; −3; 6).</p>
<pre><code>sqrt(4 + 9 + 36) = sqrt(49) = 7</code></pre>

<h3>Adding, subtracting and scaling</h3>
<p>Addition is component by component, and geometrically it is the triangle law: place the tail of the second at the head of the first, and the sum runs from the first tail to the second head. Subtraction is addition of the negative, which gives the vector from one point to another.</p>
<pre><code>a + b = (a1 + b1; a2 + b2)
a - b = (a1 - b1; a2 - b2)
k a = (k a1; k a2)  parallel to a, scaled by k</code></pre>
<p><strong>Worked example.</strong> a = (3; 1), b = (−1; 4). Find a + b, a − b and 2a − 3b.</p>
<pre><code>a + b = (2; 5)
a - b = (4; -3)
2a = (6; 2);  3b = (-3; 12)
2a - 3b = (9; -10)</code></pre>
<p><strong>Worked example 2 (parallel condition).</strong> Show that (4; −6) and (−2; 3) are parallel.</p>
<pre><code>(4; -6) = -2 x (-2; 3)
one is a scalar multiple of the other, so they are parallel (and antiparallel)</code></pre>

<h3>Position vectors and points on a line</h3>
<p>A position vector locates a point relative to the origin. The vector from A to B is then the position vector of B minus that of A — a subtraction rule worth memorising because it fixes the direction of every later step.</p>
<pre><code>position vectors a and b for points A and B:
vector AB = b - a
the midpoint of AB has position vector (a + b)/2
a point dividing AB in the ratio m:n has position (n a + m b)/(m + n)</code></pre>
<p><strong>Worked example.</strong> A has position vector (2; 1) and B has (8; 5). Find AB and the midpoint.</p>
<pre><code>AB = (8 - 2; 5 - 1) = (6; 4)
midpoint = ((2+8)/2; (1+5)/2) = (5; 3)</code></pre>
<p><strong>Worked example 2 (section formula).</strong> P divides AB in the ratio 1:2. Find P.</p>
<pre><code>P = (2a + 1b)/3 = ((4; 2) + (8; 5))/3 = (12; 7)/3 = (4; 2.333)</code></pre>
<p><strong>Worked example 3 (proving three points are collinear).</strong> Show that A(1, 1), B(3, 4) and C(7, 10) lie on a line.</p>
<pre><code>AB = (2; 3)
AC = (6; 9) = 3 x (2; 3)
AC is a multiple of AB and they share A, so the three points are collinear</code></pre>

<h3>The scalar product</h3>
<p>The scalar product (dot product) takes two vectors and returns a number. That number encodes the angle between them, which is why it is the single most useful operation in the topic.</p>
<pre><code>a . b = a1 b1 + a2 b2  (+ a3 b3 in 3-D)
a . b = |a| |b| cos theta
so cos theta = (a . b)/(|a| |b|)</code></pre>
<p><strong>Worked example.</strong> Find the angle between a = (3; 4) and b = (5; 0).</p>
<pre><code>a . b = 15 + 0 = 15
|a| = 5, |b| = 5
cos theta = 15/25 = 0.6  ->  theta = 53.13 degrees</code></pre>
<p><strong>Worked example 2 (perpendicularity).</strong> Find k so that (2; k) is perpendicular to (3; −4).</p>
<pre><code>perpendicular means a . b = 0
6 - 4k = 0  ->  k = 1.5</code></pre>
<p><strong>Worked example 3 (3-D angle).</strong> Find the angle between (1; 2; 2) and (2; 1; 0).</p>
<pre><code>a . b = 2 + 2 + 0 = 4
|a| = 3, |b| = sqrt 5 = 2.236
cos theta = 4/(3 x 2.236) = 0.596  ->  theta = 53.4 degrees</code></pre>

<h3>Using vectors in geometry</h3>
<p>Geometry proofs become short algebraic arguments once vectors are in play: parallelism is a scalar multiple, equal lengths are equal magnitudes, and a right angle is a zero scalar product. The discipline is to express everything in terms of two base vectors and then compare coefficients.</p>
<table>
<tr><th>Geometric statement</th><th>Vector test</th></tr>
<tr><td>PQ is parallel to RS</td><td>PQ = k RS for some scalar k</td></tr>
<tr><td>PQ has the same length as RS</td><td>|PQ| = |RS|</td></tr>
<tr><td>angle PQR is a right angle</td><td>QP . QR = 0</td></tr>
<tr><td>P, Q, R are collinear</td><td>PQ = k PR</td></tr>
</table>
<p><strong>Worked example.</strong> In triangle OAB, M is the midpoint of OA and N is the midpoint of OB. Prove MN is parallel to AB.</p>
<pre><code>let OA = a and OB = b
OM = a/2;  ON = b/2
MN = ON - OM = (b - a)/2
AB = b - a
so MN = AB/2: parallel and half the length</code></pre>
<p>A common variant gives two vectors with unknown constants and requires a right angle or a given length. The routine is always the same: write the condition as an equation in the constants, solve it, then check that the solution satisfies any sign or magnitude restriction stated in the question. Two solutions usually appear because a squared length produces a quadratic.</p>
<p><strong>Worked example 2 (right angle inside a shape).</strong> With a = (1; 2) and b = (3; −1), show that the diagonals of the parallelogram spanned by a and b are perpendicular.</p>
<pre><code>diagonals are a + b and a - b
a + b = (4; 1);  a - b = (-2; 3)
dot product = -8 + 3 = -5, not zero
so they are not perpendicular - the test is the check, not an assumption</code></pre>

<h3>Velocity and displacement vectors</h3>
<p>In mechanics, position is a vector function of time and velocity is its rate of change. Constant velocity makes the position a straight line, which is why relative-motion questions reduce to vector subtraction.</p>
<pre><code>position r = r0 + v t
displacement over time t is v t
relative velocity of A with respect to B is vA - vB</code></pre>
<p><strong>Worked example.</strong> A boat has velocity (4; 3) m/s relative to the water and the current has velocity (−1; 2) m/s. Find the boat's velocity over the ground and its speed.</p>
<pre><code>resultant = (4 - 1; 3 + 2) = (3; 5)
speed = sqrt(9 + 25) = 5.83 m/s</code></pre>
<p><strong>Worked example 2 (intercept).</strong> A particle starts at (1; 2) with velocity (3; −1). Where is it after 4 seconds?</p>
<pre><code>r = (1; 2) + 4(3; -1) = (1 + 12; 2 - 4) = (13; -2)</code></pre>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Magnitude)</strong> Find |(5; −12)|. <em>Answer:</em> √(25 + 144) = 13.</li>
<li><strong>(Unit vector)</strong> Find the unit vector of (3; 4). <em>Answer:</em> (0.6; 0.8).</li>
<li><strong>(Addition)</strong> a = (2; −3), b = (−4; 1). Find 3a + b. <em>Answer:</em> (6 − 4; −9 + 1) = (2; −8).</li>
<li><strong>(Collinear)</strong> Are (1; 2), (4; 8) and (7; 14) collinear? <em>Answer:</em> yes, each step is a multiple of (3; 6).</li>
<li><strong>(Dot product)</strong> Find a . b for a = (1; 3), b = (4; −2). <em>Answer:</em> 4 − 6 = −2.</li>
<li><strong>(Angle)</strong> Find the angle between (1; 0) and (1; 1). <em>Answer:</em> cos θ = 1/√2, θ = 45°.</li>
<li><strong>(Perpendicular)</strong> Find k so (k; 6) is perpendicular to (3; −2). <em>Answer:</em> 3k − 12 = 0, k = 4.</li>
<li><strong>(3-D)</strong> Find |(1; 4; 8)|. <em>Answer:</em> √81 = 9.</li>
<li><strong>(Section)</strong> P divides AB in ratio 2:1, a = (0; 0), b = (6; 9). Find P. <em>Answer:</em> (2; 3).</li>
<li><strong>(Relative)</strong> Velocities (5; 1) and (2; 4). Find the relative velocity of the first with respect to the second. <em>Answer:</em> (3; −3).</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>AB versus BA:</strong> AB = b − a; reversing the subtraction gives the wrong direction and the wrong sign in every later step.</li>
<li><strong>Magnitude of a sum:</strong> |a + b| is not |a| + |b| unless the vectors are parallel; compute the components first.</li>
<li><strong>Scalar product sign:</strong> an obtuse angle gives a negative dot product, which is information, not an error.</li>
<li><strong>Division by a vector:</strong> there is no vector division; rearrange using scalar multiples instead.</li>
<li><strong>Collinearity without a shared point:</strong> parallel vectors alone do not make points collinear — say that they share a point.</li>
<li><strong>Degrees and radians:</strong> the inverse cosine returns whatever mode the calculator is in; state the unit in the answer.</li>
<li><strong>Missing the z component in 3-D:</strong> dot products and magnitudes need all three components, including zeros.</li>
<li><strong>Arrow notation ignored in proofs:</strong> writing a length where a directed vector was needed destroys the argument even when the number is right.</li>
</ul>
`,
    "e1a3c834-71a5-46c5-87e6-4700be5beeb8": `
<h2>A Level Mathematics: The Binomial Distribution</h2>
<p>A binomial distribution counts successes in a fixed number of independent trials, each with the same probability of success. Coins, multiple-choice guesses, defective items in a sample and free throws all fit the same template, and once a problem is recognised as binomial the calculation is a formula plus a cumulative table. This note builds the distribution from its four conditions, derives the formula from counting, and then uses it for the two things exams actually ask: probabilities and hypothesis tests.</p>

<h3>The four conditions</h3>
<p>Before writing X ~ B(n, p) you must be able to name the conditions, because most exam questions include a part asking whether the model is appropriate. The conditions are not red tape: drop any one and the formula is simply wrong.</p>
<pre><code>1. a fixed number of trials n
2. each trial has exactly two outcomes (success / failure)
3. the probability of success p is constant for every trial
4. the trials are independent
then X = number of successes has X ~ B(n, p)</code></pre>
<p><strong>Worked example (checking the model).</strong> A bag holds 5 red and 15 blue counters. Four counters are taken without replacement. Is the number of red counters binomial?</p>
<pre><code>n = 4 is fixed and each draw is red or not red
but p changes: 5/20, then 5/19 if a red was taken, ...
the trials are not independent, so NOT binomial (it is hypergeometric)</code></pre>
<p>Taking with replacement would fix it: p stays 0.25 on every draw.</p>

<h3>The formula, and where it comes from</h3>
<p>The probability of a particular sequence of r successes and n − r failures is p^r (1−p)^(n−r), because independence lets you multiply. The number of such sequences is the number of ways to choose which r trials succeed, which is nCr. Multiplying gives the formula.</p>
<pre><code>P(X = r) = nCr p^r (1 - p)^(n - r)
the nCr counts arrangements; the powers give the probability of one arrangement</code></pre>
<p><strong>Worked example.</strong> X ~ B(10, 0.3). Find P(X = 3).</p>
<pre><code>P = 10C3 (0.3)^3 (0.7)^7
= 120 x 0.027 x 0.08235
= 120 x 0.002223 = 0.2668</code></pre>
<p><strong>Worked example 2 (a single trial count).</strong> A fair die is rolled 8 times. Find the probability of exactly two sixes.</p>
<pre><code>X ~ B(8, 1/6)
P(X = 2) = 8C2 (1/6)^2 (5/6)^6 = 28 x 0.02778 x 0.3349 = 0.2605</code></pre>
<p><strong>Worked example 3 (why nCr appears).</strong> For n = 3 and r = 1, list the sequences and confirm the coefficient.</p>
<pre><code>sequences: SFF, FSF, FFS - three of them
each has probability p(1-p)^2
so P(X = 1) = 3p(1-p)^2, and 3C1 = 3</code></pre>

<h3>Cumulative probabilities</h3>
<p>Questions almost always ask for a range, not a single value, and the cumulative distribution is what the calculator or the tables supply. The skill is rewriting the question into the form the table gives you.</p>
<pre><code>P(X &lt;= r) is tabulated directly
P(X &gt;= r) = 1 - P(X &lt;= r - 1)
P(X &lt; r)  = P(X &lt;= r - 1)
P(a &lt;= X &lt;= b) = P(X &lt;= b) - P(X &lt;= a - 1)
P(X = r) = P(X &lt;= r) - P(X &lt;= r - 1)</code></pre>
<p><strong>Worked example.</strong> X ~ B(20, 0.4). Find P(X ≥ 8).</p>
<pre><code>P(X &gt;= 8) = 1 - P(X &lt;= 7)
= 1 - 0.4159
= 0.5841</code></pre>
<p><strong>Worked example 2 (between).</strong> For the same X, find P(5 ≤ X ≤ 10).</p>
<pre><code>= P(X &lt;= 10) - P(X &lt;= 4)
= 0.8725 - 0.0510
= 0.8215</code></pre>
<p><strong>Worked example 3 (the strict inequality trap).</strong> For the same X, find P(X &gt; 6).</p>
<pre><code>P(X &gt; 6) = 1 - P(X &lt;= 6) = 1 - 0.2500 = 0.7500
note this is different from P(X &gt;= 6) = 1 - P(X &lt;= 5) = 0.8746</code></pre>

<h3>Mean and variance</h3>
<p>The binomial has the simplest mean and variance in the syllabus, and they are worth knowing both forwards and backwards: a question can give the mean and variance and ask for n and p.</p>
<pre><code>E(X) = np
Var(X) = np(1 - p)
standard deviation = sqrt(np(1-p))</code></pre>
<p><strong>Worked example.</strong> X ~ B(50, 0.2). Find the mean and standard deviation.</p>
<pre><code>mean = 50 x 0.2 = 10
variance = 10 x 0.8 = 8
sd = 2.828</code></pre>
<p><strong>Worked example 2 (backwards).</strong> A binomial variable has mean 12 and variance 9. Find n and p.</p>
<pre><code>np = 12;  np(1-p) = 9
divide: 1 - p = 9/12 = 0.75  ->  p = 0.25
then n = 12/0.25 = 48</code></pre>

<h3>Hypothesis testing with the binomial</h3>
<p>A one-tailed test asks whether p has increased or decreased; the test statistic is the observed count, and the p-value is the probability of a result at least as extreme in the direction of the alternative.</p>
<pre><code>H0: p = p0      H1: p &gt; p0 (or p &lt; p0)
X ~ B(n, p0) under H0
p-value = P(X &gt;= observed) or P(X &lt;= observed)
compare with the significance level; reject H0 if p-value &lt;= alpha</code></pre>
<p><strong>Worked example.</strong> A coin is tossed 20 times and lands heads 15 times. Test at the 5% level whether the coin is biased towards heads.</p>
<pre><code>H0: p = 0.5;  H1: p &gt; 0.5
X ~ B(20, 0.5)
P(X &gt;= 15) = 1 - P(X &lt;= 14) = 1 - 0.9793 = 0.0207
0.0207 &lt; 0.05, so reject H0
there is evidence at the 5% level that the coin favours heads</code></pre>
<p><strong>Worked example 2 (two-tailed).</strong> The same data tested two-tailed.</p>
<pre><code>double the smaller tail: 2 x 0.0207 = 0.0414
0.0414 &lt; 0.05, so still reject H0 at the 5% level</code></pre>
<p><strong>Worked example 3 (critical region).</strong> For X ~ B(20, 0.5), find the critical region for a 5% one-tailed test of p &gt; 0.5.</p>
<pre><code>P(X &gt;= 14) = 0.0577 (above 0.05)
P(X &gt;= 15) = 0.0207 (below 0.05)
critical region: X &gt;= 15</code></pre>
<p>Note that the critical region is chosen so the probability of a Type I error is at most 5%, which is why 14 is excluded even though it is close.</p>

<h3>When the model breaks down</h3>
<p>Examiners like the question that asks why a binomial model is only an approximation. The usual culprits are dependence, a varying probability, or a fixed sample drawn without replacement from a small population.</p>
<table>
<tr><th>Situation</th><th>Problem</th><th>Effect</th></tr>
<tr><td>sampling without replacement</td><td>trials not independent</td><td>p drifts; use the hypergeometric instead</td></tr>
<tr><td>clustered data (pupils in classes)</td><td>responses correlated</td><td>variance underestimated</td></tr>
<tr><td>probability varies between trials</td><td>p not constant</td><td>formula invalid</td></tr>
<tr><td>large n, p near 0.5</td><td>computation heavy</td><td>normal approximation is reasonable</td></tr>
</table>
<p><strong>Worked example (normal approximation).</strong> X ~ B(200, 0.4). Use a normal approximation to estimate P(X ≤ 70).</p>
<pre><code>mean = 80;  variance = 200 x 0.4 x 0.6 = 48;  sd = 6.928
continuity correction: X &lt;= 70 becomes X &lt; 70.5
z = (70.5 - 80)/6.928 = -1.371
P(Z &lt; -1.371) = 0.0852</code></pre>
<p>The continuity correction is compulsory: a discrete count needs a half-unit boundary before it can be treated as continuous.</p>

<h3>Expected frequencies and the shape of the distribution</h3>
<p>A binomial distribution is not symmetric unless p = 0.5, and that shape decides which tail an exam question is fishing in. The most likely value — the mode — is the integer near (n + 1)p, and expected frequency multiplies the probability by the number of samples taken. Both are quick marks that are frequently missed because students jump straight to the formula.</p>
<pre><code>mode is near (n + 1)p, checked by comparing consecutive probabilities
expected number in a sample of size N = N x P(X = r)</code></pre>
<p><strong>Worked example.</strong> X ~ B(12, 0.3). Find the most likely value of X and the expected number of 3s in 500 independent observations.</p>
<pre><code>(n + 1)p = 13 x 0.3 = 3.9, so check r = 3 and r = 4
P(X = 3) = 220 x 0.027 x 0.1176 = 0.2397
P(X = 4) = 495 x 0.0081 x 0.1681 = 0.2311
mode = 3
expected number of 3s = 500 x 0.2397 = 120 (to the nearest whole)</code></pre>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Model)</strong> State the distribution for the number of sixes in 12 rolls of a fair die. <em>Answer:</em> X ~ B(12, 1/6).</li>
<li><strong>(Single value)</strong> X ~ B(8, 0.25): find P(X = 2). <em>Answer:</em> 28 × 0.0625 × 0.1780 = 0.3115.</li>
<li><strong>(Cumulative)</strong> X ~ B(15, 0.3): find P(X ≤ 4). <em>Answer:</em> 0.5155 from tables.</li>
<li><strong>(Complement)</strong> Same X: find P(X ≥ 3). <em>Answer:</em> 1 − 0.2969 = 0.7031.</li>
<li><strong>(Mean)</strong> X ~ B(40, 0.35): find E(X) and Var(X). <em>Answer:</em> 14 and 9.1.</li>
<li><strong>(Backwards)</strong> Mean 18, variance 12: find n and p. <em>Answer:</em> p = 1/3, n = 54.</li>
<li><strong>(Test)</strong> 12 of 20 seeds germinate; test p = 0.5 against p &lt; 0.5 at 5%. <em>Answer:</em> P(X ≤ 12) = 0.8684, no evidence to reject.</li>
<li><strong>(Critical region)</strong> X ~ B(10, 0.2): find the 5% critical region for p &lt; 0.2. <em>Answer:</em> P(X ≤ 0) = 0.1074 &gt; 0.05, so no region exists at 5%.</li>
<li><strong>(Approximation)</strong> X ~ B(100, 0.5): approximate P(X ≥ 60). <em>Answer:</em> μ = 50, σ = 5, z = 1.9, P = 0.0287.</li>
<li><strong>(Assumption)</strong> Give one reason a binomial model may fail for defects in boxes of 20. <em>Answer:</em> defects may cluster, so trials are not independent.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Forgetting nCr:</strong> the coefficient counts arrangements; without it the answer is the probability of one specific sequence.</li>
<li><strong>nCr on the wrong factor:</strong> it is p^r (1−p)^(n−r), with the success probability raised to the number of successes.</li>
<li><strong>Inequality direction:</strong> P(X ≥ 8) uses 1 − P(X ≤ 7), not 1 − P(X ≤ 8).</li>
<li><strong>Variance confused with standard deviation:</strong> np(1−p) is the variance; the test and the normal approximation need the square root.</li>
<li><strong>Continuity correction omitted:</strong> any normal approximation to a discrete count needs the half-unit adjustment.</li>
<li><strong>One-tailed evidence read as two:</strong> halving or doubling the tail without checking the alternative direction is a silent error.</li>
<li><strong>Independence asserted, not checked:</strong> sampling without replacement from a small population breaks the model, and the question usually invites you to say so.</li>
<li><strong>p-value compared with the wrong threshold:</strong> the significance level is given as a percentage; 5% means 0.05, not 5.</li>
</ul>
`,
  },
};
