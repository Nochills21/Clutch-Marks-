// Batch 01: extends six existing maths notes (about 2.3k characters each) toward 2x.
// Consumed by .freebuff/extend-materials.cjs. No backticks and no dollar-brace sequences.
module.exports = {
  expectType: "notes",
  rows: {
    "39e37ac0-41b8-4d23-8d69-64e36dfd77af": `
<h3>Worked examples: combining rules</h3>
<p><strong>Example 1 (product rule).</strong> Differentiate y = x²(3x − 1)⁴.</p>
<p>Let u = x² and v = (3x − 1)⁴. Then du/dx = 2x and dv/dx = 4(3x − 1)³ × 3 = 12(3x − 1)³ (chain rule inside the product). So dy/dx = x² × 12(3x − 1)³ + (3x − 1)⁴ × 2x = 2x(3x − 1)³[6x + (3x − 1)] = 2x(3x − 1)³(9x − 1). Factorising at the end is what the examiner expects; leave a fully expanded answer only if asked.</p>
<p><strong>Example 2 (quotient rule).</strong> Differentiate y = (x + 2)/(x² + 1). Let u = x + 2 and v = x² + 1. dy/dx = [1(x² + 1) − (x + 2)(2x)]/(x² + 1)² = (x² + 1 − 2x² − 4x)/(x² + 1)² = (1 − 4x − x²)/(x² + 1)². Check the numerator by substituting a value of x into the original and the answer: it is easy to lose the minus sign on the second term.</p>
<h3>Trigonometric and exponential derivatives in context</h3>
<ul>
<li>d/dx (sin 3x) = 3 cos 3x, so the chain rule multiplies by the derivative of the inside. Writing sin 3x as sin(3x) makes the inside visible.</li>
<li>d/dx (e<sup>4x − 1</sup>) = 4e<sup>4x − 1</sup>. The derivative of e to a power is the same expression times the derivative of the power.</li>
<li>d/dx (ln(2x + 5)) = 2/(2x + 5). The derivative of ln x is 1/x, and the chain rule supplies the factor 2.</li>
<li>d/dx (cos² x) = 2 cos x × (−sin x) = −2 sin x cos x. Write powers of functions as (function)ⁿ and apply the chain rule once for each layer.</li>
</ul>
<h3>Implicit differentiation worked through</h3>
<p>For x² + xy + y² = 7, differentiate each term with respect to x. A term in y is differentiated as a function of x and so gives dy/dx through the chain rule: 2x + (x dy/dx + y × 1) + 2y dy/dx = 0. Collect the dy/dx terms: dy/dx(x + 2y) = −(2x + y), so dy/dx = −(2x + y)/(x + 2y). The gradient is then found at a given point by substituting both coordinates.</p>
<h3>Parametric differentiation</h3>
<p>If x = t² and y = 2t³, then dx/dt = 2t and dy/dt = 6t², so dy/dx = (dy/dt)/(dx/dt) = 6t²/(2t) = 3t. This is a chain-rule statement, not a new formula, and it is the reason the division is by dx/dt, not multiplied.</p>
<h3>Common errors that lose marks</h3>
<ul>
<li>Forgetting the inner derivative in the chain rule, for example differentiating sin(3x) as cos(3x).</li>
<li>Writing the quotient rule with the denominator on the wrong side, or dropping the square on the denominator.</li>
<li>Treating dy/dx as a fraction and cancelling dy with dx in an implicit step; differentiate term by term instead.</li>
<li>Substituting the point into dy/dx before simplifying, which is fine, but forgetting to substitute both x and y when the expression still contains y.</li>
</ul>
`,
    "3bc168f1-4a43-4e2f-9954-2f256539800e": `
<h3>Worked examples: indefinite and definite integrals</h3>
<p><strong>Example 1.</strong> Find ∫(3x² + 2x − 5) dx. Integrate term by term and add a constant: x³ + x² − 5x + c. Always include + c for an indefinite integral; examiners remove the mark when it is missing.</p>
<p><strong>Example 2.</strong> Evaluate ∫<sub>1</sub><sup>3</sup> x² dx = [x³/3] from 1 to 3 = (27/3) − (1/3) = 9 − 1/3 = 26/3. Substitute the upper limit, then subtract the value at the lower limit; the constant of integration cancels and is not written.</p>
<h3>Reverse chain rule</h3>
<p>∫(2x + 1)⁵ dx = (2x + 1)⁶ / (6 × 2) + c = (2x + 1)⁶/12 + c. Check by differentiating: the chain rule gives 6(2x + 1)⁵ × 2 / 12 = (2x + 1)⁵. The divisor is the new power multiplied by the coefficient of x inside the bracket.</p>
<h3>Area between a curve and the x-axis</h3>
<p>A definite integral gives a signed area. If the curve crosses the x-axis between the limits, the integral from a to b can be smaller than the true area, because the part below the axis counts negatively. Split the integral at each crossing and take the modulus of each part: area = |∫ from a to c| + |∫ from c to b|. Sketch the curve before integrating; it is the quickest way to see where the crossings are.</p>
<h3>Area between two curves</h3>
<p>For y = f(x) above y = g(x) between x = a and x = b, the area is ∫<sub>a</sub><sup>b</sup> [f(x) − g(x)] dx. Find the intersection points by solving f(x) = g(x), since they give the limits. A common error is subtracting in the wrong order, which gives a negative answer; the area is always positive.</p>
<h3>Trapezium rule</h3>
<p>With n strips of equal width h, the trapezium rule gives ∫<sub>a</sub><sup>b</sup> y dx ≈ (h/2)[y₀ + 2(y₁ + … + y<sub>n−1</sub>) + y<sub>n</sub>]. Where the curve is concave down the estimate is an underestimate, and where it is concave up it is an overestimate. Give the answer to the accuracy the question asks for and show the y-values in a table to earn the method marks.</p>
<h3>Common errors</h3>
<ul>
<li>Forgetting + c on an indefinite integral, or writing + c on a definite one.</li>
<li>Dividing by the power before the coefficient in a reverse chain rule question.</li>
<li>Reporting a negative area from a definite integral without splitting at the x-axis crossings.</li>
<li>Using the trapezium rule with the wrong number of ordinates: n strips need n + 1 y-values.</li>
</ul>
`,
    "7a6b58bd-8e42-4c07-8162-996586f0077b": `
<h3>Worked examples: sequences</h3>
<p><strong>Linear.</strong> The sequence 5, 9, 13, 17 has a common difference of 4. The nth term is 4n + 1, since the nth term of a linear sequence is dn + (first term − d). Check the 10th term: 4 × 10 + 1 = 41.</p>
<p><strong>Quadratic.</strong> For 2, 6, 12, 20, the first differences are 4, 6, 8 and the second difference is 2. The coefficient of n² is half the second difference, so it is 1. Subtract n² from each term: 1, 2, 3, 4, which is linear with nth term n. So the nth term is n² + n. Check n = 3: 9 + 3 = 12 ✓.</p>
<h3>Function notation with composites</h3>
<p>Let f(x) = 2x + 3 and g(x) = x − 1. Then fg(x) means f(g(x)) = f(x − 1) = 2(x − 1) + 3 = 2x + 1. Note that gf(x) = g(2x + 3) = 2x + 2, which is different. Composition is not commutative, and questions often ask for both to test whether you apply the inner function first.</p>
<h3>Inverse functions</h3>
<p>To find f⁻¹(x) for f(x) = 2x + 3: write y = 2x + 3, swap to x = 2y + 3 and solve, giving y = (x − 3)/2. So f⁻¹(x) = (x − 3)/2. Check by substituting: f(f⁻¹(x)) = 2(x − 3)/2 + 3 = x ✓. The graph of f⁻¹ is the reflection of f in the line y = x.</p>
<h3>Domain and range</h3>
<p>For f(x) = √(x − 2), the expression under the root must be non-negative, so the domain is x ≥ 2. The output of a square root is never negative, so the range is f(x) ≥ 0. For a rational function such as 1/(x − 4), the domain excludes x = 4, and the range excludes y = 0, since the value 0 is never reached.</p>
<h3>Common errors</h3>
<ul>
<li>Taking the nth term of a quadratic sequence from the first term alone; the second difference must be used.</li>
<li>Reversing the order of composition: fg(x) and gf(x) are not the same.</li>
<li>Writing the domain as x > 2 when the question allows equality, or stating the range with an inequality in the wrong direction.</li>
<li>Forgetting to swap x and y before solving for the inverse.</li>
</ul>
`,
    "dcbbe01b-cbb0-4e90-bf61-0ecc971a9467": `
<h3>Worked example: a two-set Venn diagram</h3>
<p>In a group of 30 students, 18 play football (set F) and 12 play cricket (set C), and 5 play both. Fill the diagram from the centre outwards: the intersection is 5, so football only is 18 − 5 = 13 and cricket only is 12 − 5 = 7. The union has 13 + 5 + 7 = 25 students, so 30 − 25 = 5 play neither sport. Answer questions by reading from the diagram: the number who play football or cricket but not both is 13 + 7 = 20.</p>
<h3>Notation in words and symbols</h3>
<ul>
<li>A ∩ B: elements in both A and B. Written as "and" in the question.</li>
<li>A ∪ B: elements in A or B or both. Written as "or" in the question.</li>
<li>A′: the complement, everything in the universal set ξ that is not in A.</li>
<li>n(A) means the number of elements in A; the total of all regions in the diagram is n(ξ).</li>
</ul>
<h3>Shading regions</h3>
<p>To shade (A ∪ B)′, first shade A ∪ B, then leave the shaded region outside both circles. To shade A′ ∩ B, shade B and take away the part that lies inside A. A quick test: list the regions by number (1 for A only, 2 for the intersection, 3 for B only, 4 outside) and write each expression as the list of regions it covers. Expressions that match the same list describe the same set.</p>
<h3>Factors, HCF and LCM</h3>
<p>Write each number as a product of primes. 360 = 2³ × 3² × 5 and 84 = 2² × 3 × 7. The HCF takes the lowest power of each common prime: 2² × 3 = 12. The LCM takes the highest power of every prime that appears: 2³ × 3² × 5 × 7 = 2520. The HCF multiplies to the smallest number that both divide; the LCM is the smallest number both divide into.</p>
<h3>Surds and roots</h3>
<p>Simplify √72 by finding a square factor: √72 = √(36 × 2) = 6√2. A surd is left in exact form until the question asks for a decimal. Cube roots follow the same logic: ∛54 = ∛(27 × 2) = 3∛2. Do not split a sum under a root: √(9 + 16) is 5, not √9 + √16 = 7.</p>
<h3>Common errors</h3>
<ul>
<li>Writing 13 as the answer to "football only" by reading the total for football, not the region.</li>
<li>Confusing HCF with LCM, usually by taking the highest power for both.</li>
<li>Treating 0 as a natural number when a question asks for the set of natural numbers; state which convention is used if the mark scheme is strict.</li>
</ul>
`,
    "edbbedae-7847-4852-a895-44af0d0b57d5": `
<h3>Worked example: a full stationary-point analysis</h3>
<p>Let y = x³ − 3x² − 9x + 5. Then dy/dx = 3x² − 6x − 9 = 3(x − 3)(x + 1). Stationary points occur when dy/dx = 0, so x = 3 or x = −1. The second derivative is d²y/dx² = 6x − 6. At x = −1 it is −12, which is negative, so there is a maximum; at x = 3 it is +12, so there is a minimum. Substitute back into the original equation for the y-coordinates: (−1, 10) is a maximum and (3, −22) is a minimum. Always state both coordinates.</p>
<h3>Tangent and normal at a point</h3>
<p>At x = 2, y = 8 − 12 − 18 + 5 = −17 and dy/dx = 12 − 12 − 9 = −9. The tangent has gradient −9 through (2, −17), so y + 17 = −9(x − 2). The normal is perpendicular, with gradient 1/9, so y + 17 = (1/9)(x − 2). Keep the equations in the form the question asks for, and do not mix the gradient of the normal with the tangent.</p>
<h3>Rates of change: a chain rule example</h3>
<p>The volume of a sphere is V = (4/3)πr³. If the radius increases at 0.5 cm/s, find the rate of change of volume when r = 3. dV/dr = 4πr², so dV/dt = dV/dr × dr/dt = 4π(9)(0.5) = 18π cm³/s ≈ 56.5 cm³/s. Linking the rates through the chain rule is the method being tested, so write the link explicitly.</p>
<h3>Increasing and decreasing</h3>
<p>The sign of dy/dx tells you whether the function is increasing (dy/dx > 0) or decreasing (dy/dx < 0). For y = x³ − 3x² − 9x + 5, the curve increases for x < −1, decreases between −1 and 3, and increases again for x > 3. State these intervals with the correct inequalities; an answer that says "x > −1" for the decreasing part loses the mark.</p>
<h3>Common errors</h3>
<ul>
<li>Concluding a maximum or minimum from dy/dx = 0 alone without a sign test or second derivative.</li>
<li>Substituting the x-value into dy/dx to give the y-coordinate of the stationary point.</li>
<li>Using the gradient of the tangent in the normal equation, instead of its negative reciprocal.</li>
<li>Forgetting the chain-rule factor when the rate of change question involves two variables.</li>
</ul>
`,
    "dce98df1-2982-40df-ab8c-b849b8d78ee1": `
<h3>Worked example: a cylinder</h3>
<p>A cylinder has radius 3 cm and height 10 cm. Volume = πr²h = π × 9 × 10 = 90π ≈ 282.7 cm³. Curved surface area = 2πrh = 60π ≈ 188.5 cm². Total surface area adds two circles: 2πr² + 2πrh = 2πr(r + h) = 2π × 3 × 13 = 78π ≈ 245.0 cm². Give the units with every answer, and keep π in the working until the final line when the question allows it.</p>
<h3>Cones and spheres</h3>
<ul>
<li>Cone: volume = (1/3)πr²h, curved surface area = πrl, where l is the slant height. For r = 5 and h = 12, l = √(5² + 12²) = 13, so the curved area is 65π cm².</li>
<li>Sphere: volume = (4/3)πr³ and surface area = 4πr². For r = 6, the volume is (4/3)π × 216 = 288π cm³.</li>
<li>Find the slant height or a missing height with Pythagoras before using the formula; most lost marks in cone questions come from using the vertical height where the slant height is required.</li>
</ul>
<h3>Converting units of area and volume</h3>
<p>Linear conversions are squared and cubed. 1 m = 100 cm, so 1 m² = 10 000 cm² and 1 m³ = 1 000 000 cm³. A common trap is writing 1 m² = 100 cm². Remember also that 1 litre = 1000 cm³, so a tank of 2.5 m³ holds 2 500 litres.</p>
<h3>Compound measures</h3>
<p>Speed, density and population density are compound measures. Density = mass ÷ volume: a 600 g block of volume 200 cm³ has density 3 g/cm³. To find a mass from density and volume, multiply; to find volume, divide. Check the units match the question before dividing, for example converting litres to cm³ first.</p>
<h3>Common errors</h3>
<ul>
<li>Using the diameter where the radius is required, the most common error in circle and sphere questions.</li>
<li>Leaving π out of an exact answer when the question says "give your answer in terms of π".</li>
<li>Adding the area of only one circular end when finding the total surface area of a closed cylinder.</li>
</ul>
`,
  },
};
