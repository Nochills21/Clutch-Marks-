/**
 * Mathematics AS integration deepening, pass a: four new h2 sections with
 * 24 h3 subsections in total (12 → 36 h3 headings, at the bar). Prose only:
 * the topic is algebraic, so no figure is drawn. Inserted before
 * "Equations and symbols" by refine-note-sections.cjs; nothing already in the
 * note is rewritten.
 */

const NOTE = "3bc168f1-4a43-4e2f-9954-2f256539800e";

const sections = [
  {
    id: NOTE,
    slug: "integration",
    proseOnly: true,
    heading: "Reverse differentiation and the constant of integration",
    html: `<h2>Reverse differentiation and the constant of integration</h2>
<p>Integration undoes differentiation. Every indefinite integral is found by asking which function differentiates to the one given, and every answer carries a constant of integration, because a constant disappears when a function is differentiated.</p>
<h3>Integrating powers of x</h3>
<p>For any power other than −1, ∫xⁿ dx = xⁿ⁺¹/(n + 1) + c. Raise the power by one and divide by the new power. For example ∫x³ dx = x⁴/4 + c, and ∫x⁻² dx = x⁻¹/(−1) + c = −1/x + c. Students often forget to add one to the power, which gives a result that does not differentiate back to the start.</p>
<h3>Integrating a sum and a constant multiple</h3>
<p>Integrate term by term and keep constant multipliers outside. ∫(3x² − 4x + 5) dx = x³ − 2x² + 5x + c. Check it by differentiating: 3x² − 4x + 5 is returned exactly, which is the test that the answer is correct.</p>
<h3>Why the constant of integration is needed</h3>
<p>The derivative of x³ + 7 is the same as the derivative of x³ − 2, so the integral of 3x² must be x³ plus some unknown constant. Writing +c records that the answer is a whole family of curves, one for each value of c. A question that gives one point on the curve fixes c, and that step is worth marks in its own right.</p>
<h3>Integrating (ax + b)ⁿ</h3>
<p>When the bracket is linear, the chain rule runs backwards and needs one extra division by a. ∫(2x + 3)⁴ dx = (2x + 3)⁵/(2 × 5) + c = (2x + 3)⁵/10 + c. Differentiating (2x + 3)⁵/10 gives 5 × 2 × (2x + 3)⁴/10, which is (2x + 3)⁴, so the answer is confirmed.</p>
<h3>Integrating expressions that need rearranging</h3>
<p>Expand brackets and split fractions before integrating, because the power rule works only on single powers. (x + 1)² is x² + 2x + 1 before integration, so ∫(x + 1)² dx = x³/3 + x² + x + c. Writing (x + 1)² as a power of a bracket and applying the linear rule gives the same answer, but expanding is the safer route when the bracket is not linear.</p>
<h3>Checking an integral by differentiating</h3>
<p>Differentiate the answer and compare it with the integrand. If the two do not match, the error is in the power, the division or a missing coefficient. This check takes a few seconds and catches most sign and division slips before they reach the final line.</p>`,
  },
  {
    id: NOTE,
    slug: "integration",
    proseOnly: true,
    heading: "Definite integrals: meaning and evaluation",
    html: `<h2>Definite integrals: meaning and evaluation</h2>
<p>A definite integral has limits and gives a number. It is the signed area between the curve and the x-axis between those limits, and it is evaluated by substituting the upper limit, substituting the lower limit and subtracting. The constant of integration cancels in that subtraction, so it is not written for a definite integral.</p>
<h3>Evaluating between limits</h3>
<p>Write the result in square brackets with the limits at the top and bottom, then substitute. ∫₁³ (2x + 1) dx = [x² + x]₁³ = (9 + 3) − (1 + 1) = 12 − 2 = 10. Put the subtraction in brackets when the limit is negative, so that the sign is not lost.</p>
<h3>Reversing the limits</h3>
<p>Swapping the limits changes the sign of the answer: ∫₃¹ f(x) dx = −∫₁³ f(x) dx. This is useful when the limits are given in the wrong order, and it is also a common source of a wrong sign when a question asks for an area, because an area is always positive.</p>
<h3>Integrals over an interval of zero width</h3>
<p>If the two limits are equal, the integral is zero, because the interval has no width. ∫₂² f(x) dx = 0 for any function f. The rule is used as a quick check: an answer that is not zero for equal limits has a mistake in the evaluation.</p>
<h3>Using the fundamental theorem</h3>
<p>The definite integral equals F(b) − F(a), where F is any antiderivative of f. The choice of antiderivative does not matter, because adding a constant to F adds the same constant to both values and cancels. This is why the constant can be left out of definite integrals.</p>
<h3>Finding a constant from a definite integral</h3>
<p>If ∫₀² (kx) dx = 4, then [kx²/2]₀² = 2k = 4, so k = 2. Set up the integral with the unknown inside it, evaluate it in terms of the unknown, and then solve the resulting equation as a normal linear or quadratic equation.</p>
<h3>Area as a definite integral from a graph</h3>
<p>When a question asks for the area between a curve and the x-axis, first sketch the curve to see whether it is above or below the axis on the interval. Only then write the integral. A region above the axis gives a positive integral, and a region below gives a negative one, so the area is the absolute value.</p>`,
  },
  {
    id: NOTE,
    slug: "integration",
    proseOnly: true,
    heading: "Areas: below the axis, between curves and crossing points",
    html: `<h2>Areas: below the axis, between curves and crossing points</h2>
<p>Most area questions on this topic are a sketch, a set of limits and one subtraction. The difficulty is identifying which function is on top and where the curve crosses the axis, so those two steps should be written out before any integral is set up.</p>
<h3>Area below the x-axis</h3>
<p>When the curve is below the axis, its integral is negative, and the area is the positive value of that integral. For y = x² − 4 between x = 0 and x = 2, the integral is [x³/3 − 4x]₀² = (8/3 − 8) = −16/3, so the area is 16/3 square units.</p>
<h3>Area that crosses the axis</h3>
<p>Split the integral at each point where the curve meets the x-axis, and take the absolute value of each piece before adding them. For y = x² − 4 from x = 0 to x = 3, the two pieces are 16/3 (below the axis) and 7/3 (above it). The total area is 23/3, although the single integral from 0 to 3 gives −3. A single integral across the crossing gives the net signed value, not the area.</p>
<h3>Area between a curve and a line</h3>
<p>The area between two curves is the integral of the top curve minus the bottom curve, taken between the points where they meet. The subtraction is what makes the method work: the integral of the top curve gives the area under it, and subtracting the bottom curve removes the part that lies beneath the bottom curve.</p>
<h3>Finding intersection points first</h3>
<p>Set the two equations equal and solve for x. For y = x² and y = 2x, x² = 2x gives x = 0 and x = 2. These values are the limits of integration. Solving the intersection first prevents limits being guessed from the sketch, which is the usual cause of a wrong answer on a question that is otherwise correct.</p>
<h3>Area enclosed by two curves</h3>
<p>For y = 6 − x and y = x², the intersections satisfy x² + x − 6 = 0, so x = −3 and x = 2. The line is on top throughout this interval, so the area is ∫ from −3 to 2 of (6 − x − x²) dx = [6x − x²/2 − x³/3] from −3 to 2 = 22/3 + 27/2 = 125/6 square units.</p>
<h3>Choosing the top and bottom curve</h3>
<p>Test a point between the intersections in both equations to find which curve is higher. The answer depends on this choice: subtracting the wrong way round gives the negative of the area. If the curves swap over inside the interval, split the integral at the second intersection and treat each part separately.</p>`,
  },
  {
    id: NOTE,
    slug: "integration",
    proseOnly: true,
    heading: "Kinematics and integration in context",
    html: `<h2>Kinematics and integration in context</h2>
<p>In kinematics, integration moves between acceleration, velocity and displacement. Each step adds a constant, and the constant is found from a value the question gives, usually the velocity or position at time zero. Keeping the units and the direction of motion in view prevents most errors on these questions.</p>
<h3>Velocity from acceleration</h3>
<p>Velocity is the integral of acceleration with respect to time, v = ∫a dt. If a = 6t and the velocity at t = 0 is 2 m/s, then v = 3t² + C, and v(0) = 2 gives C = 2, so v = 3t² + 2 m/s.</p>
<h3>Displacement from velocity</h3>
<p>Displacement is the integral of velocity, s = ∫v dt, and the definite integral between two times gives the change in position. For v = 3t² − 6t from t = 0 to t = 3, the displacement is [t³ − 3t²] from 0 to 3 = 0, so the particle ends where it started.</p>
<h3>Distance when velocity changes sign</h3>
<p>Distance counts all the movement, so it needs the magnitude of velocity. Find where v = 0; here t = 0 and t = 2. The distance is the integral of |v|, so split at t = 2: the first part gives −4, whose magnitude is 4, and the second part gives 4. The total distance is 8 m, while the displacement is 0.</p>
<h3>Finding the constant from initial conditions</h3>
<p>Every integration in mechanics adds a constant that the question must supply. Write the constant as C, substitute the given time and value, and solve for C before writing the final function. Writing the function with C still in it, and never substituting, loses the mark for the final answer.</p>
<h3>Average velocity and average speed</h3>
<p>Average velocity is displacement divided by time, so for the example above it is 0/3 = 0. Average speed is distance divided by time, which is 8/3 m/s. The two answers differ because the particle changes direction, and a question will ask for one of them by name.</p>
<h3>Interpreting a negative answer</h3>
<p>A negative velocity means motion in the negative direction, and a negative displacement means the particle is on the negative side of the origin. A negative definite integral of velocity is a displacement, not a distance, so do not take its magnitude unless the question asks for distance.</p>`,
  },
];

module.exports = { sections };
