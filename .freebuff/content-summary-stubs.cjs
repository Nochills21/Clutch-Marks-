// The eleven summary rows that were stubs (176–250 characters of placeholder).
// Each is rewritten as a map of its topic: one <h3> per section of the notes,
// bullets that carry the actual rule, and a keyed equation wherever a formula
// appears — the same standard the notes are held to.
//
//   node .freebuff/deepen-materials.cjs .freebuff/content-summary-stubs.cjs > .freebuff-tmp/summary-stubs.sql
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/summary-stubs.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/summary-stubs.sql --apply    (live)
//
// expectType guards every statement: a stale id cannot overwrite a note.
module.exports = {
  expectType: "summary",
  rows: {
    /* ── Proof, AS ─────────────────────────────────────────────────────── */
    "aee9e4b1-54aa-4287-abe4-c947b76f3d69": `
<h2>Proof — Quick Revision Summary</h2>
<p>AS Mathematics: what a proof is, the four methods you are expected to use, and the algebraic shapes that come up again and again. Read it as a checklist — each bullet is a step the examiner looks for, not a fact to memorise.</p>

<h3>The vocabulary</h3>
<ul>
<li><strong>Conjecture</strong> — believed true, not proved. <strong>Theorem</strong> — proved. <strong>Axiom</strong> — assumed and not proved.</li>
<li><strong>Direct proof</strong>: start from what is given and chain implications to the conclusion.</li>
<li><strong>Proof by exhaustion</strong>: the cases are finite, so every case is checked. Say how many cases there are and that you have done them all.</li>
<li><strong>Disproof by counterexample</strong>: one case where the statement fails is enough, and it must be a counterexample, not three cases that work.</li>
</ul>

<h3>The algebra of even and odd</h3>
<p>Even means 2k, odd means 2k + 1, for an integer k. Almost every "prove that" in this topic is that substitution followed by a factorisation:</p>
<p><strong>(2k + 1)(2m + 1) = 4km + 2k + 2m + 1 = 2(2km + k + m) + 1</strong> <em>Key:</em> 2(2km + k + m) is even by definition, so adding 1 makes the product odd.</p>
<p><strong>n² − n = n(n − 1)</strong> <em>Key:</em> n = any integer. Consecutive integers always include one even number, so the product is always even — which proves it for every n at once, where testing values proves nothing.</p>

<h3>Completing the square as a proof tool</h3>
<p>A statement of the form "this quadratic is always positive" is proved by writing it as a square plus a constant:</p>
<p><strong>x² + 6x + 11 = (x + 3)² + 2</strong> <em>Key:</em> (x + 3)² ≥ 0 for every real x, so the expression is at least 2 and can never be zero. The same move shows x² − 4x + 7 = (x − 2)² + 3 &gt; 0.</p>

<h3>Algebraic identities</h3>
<p>Prove an identity by starting at one side and reaching the other — never by moving terms across the equals sign, which assumes what you are proving.</p>
<p><strong>(a + b)² − (a − b)² = 4ab</strong> <em>Key:</em> expand each square, then subtract: a² + 2ab + b² − (a² − 2ab + b²) = 4ab.</p>

<h3>How the marks are given</h3>
<ul>
<li>State the method you are using in words before the algebra — "assume n is even, so n = 2k".</li>
<li>Define every new letter: "for some integer k" is a mark-bearing clause.</li>
<li>Finish with the conclusion sentence, matching the wording of the question.</li>
<li>A statement proved only for n = 1, 2, 3 has been illustrated, not proved: say "this is not a proof" and use exhaustion properly or use algebra.</li>
</ul>

<h3>Exam traps</h3>
<ul>
<li>Proving the converse. "If n² is even then n is even" is not the same as "if n is even then n² is even".</li>
<li>Using a counterexample against a statement that is actually true — a failed search is not a disproof.</li>
<li>Assuming the result in the first line (circular argument).</li>
</ul>
`,

    /* ── Proof, A2 ─────────────────────────────────────────────────────── */
    "a9e7b67b-da58-4fee-92db-28b9163a434d": `
<h2>Proof — Quick Revision Summary</h2>
<p>A2 Mathematics: the four methods, the classic contradiction proofs that appear verbatim, and the inequality arguments that decide whether a quadratic is always positive. This is the topic where presentation carries as many marks as the mathematics.</p>

<h3>Choosing the method</h3>
<ul>
<li>Finite cases named in the question → <strong>exhaustion</strong>.</li>
<li>"Show that there is no …", "prove that √2 is irrational", "prove there is no largest prime" → <strong>contradiction</strong>.</li>
<li>"Prove that for all integers …" where the algebra closes → <strong>direct</strong>.</li>
<li>"Is it true that …", "disprove" → look for a <strong>counterexample</strong> first; if none appears, prove it.</li>
</ul>

<h3>Contradiction, written out</h3>
<p>The shape is fixed: assume the opposite, use it as if it were true, arrive at a statement that cannot be true, then conclude the assumption was false.</p>
<p><strong>√2 = p/q with p, q integers having no common factor → p² = 2q² → p even → p = 2k → 4k² = 2q² → q² = 2k² → q even</strong> <em>Key:</em> p and q both even contradicts "no common factor", so √2 cannot be written as a fraction. Every line of that chain is worth a mark, and the closing sentence is a mark of its own.</p>
<p>The same skeleton proves that there is no largest prime: assume a largest prime P, form N = (2 × 3 × 5 × … × P) + 1, and note that dividing N by any prime on the list leaves remainder 1, so N is either prime itself or has a prime factor not on the list — either way P was not the largest.</p>

<h3>Inequalities and completed squares</h3>
<p><strong>x² + bx + c = (x + b/2)² + (c − b²/4)</strong> <em>Key:</em> b, c = coefficients; the bracket is never negative, so the expression is always at least c − b²/4. That single line proves "always positive", "always greater than 3" and "has no real roots" — and tells you the minimum at the same time.</p>
<p>For a quotient, prove the denominator is never zero first, then multiply through: it is legitimate because the denominator keeps one sign.</p>

<h3>Proving an identity</h3>
<p>Work from the more complicated side; never cross-multiply between the two sides. Difference of two squares and the factor theorem do most of the work.</p>
<p><strong>a³ − b³ = (a − b)(a² + ab + b²)</strong> <em>Key:</em> a, b = any real numbers. Multiplying out the right side returns a³ − b³, which is the whole proof.</p>

<h3>Exam traps</h3>
<ul>
<li>Assuming what you are asked to prove — the commonest zero on this topic.</li>
<li>Using decimals or rounded values inside a proof; keep everything exact.</li>
<li>Forgetting to state that the contradicting line is impossible, so the proof never closes.</li>
<li>Arguing from examples. Three confirming cases prove nothing; one failing case disproves everything.</li>
</ul>
`,

    /* ── Mechanics M1, AS ──────────────────────────────────────────────── */
    "213ec5f9-cd66-4806-8bf2-6b45f44ac7c4": `
<h2>Mechanics (M1) — Quick Revision Summary</h2>
<p>AS Mechanics in one page: the modelling assumptions that earn marks before any algebra, the constant-acceleration equations, Newton's second law on connected particles, friction, and moments in equilibrium. Every question is a free-body diagram followed by one of six equations.</p>

<h3>Modelling assumptions, and what each one buys you</h3>
<ul>
<li><strong>Particle</strong> — no size, so rotation and air resistance are ignored and all forces act at one point.</li>
<li><strong>Smooth</strong> — no friction, so the only contact force is the normal reaction.</li>
<li><strong>Light</strong> string or rod — tension is the same at both ends.</li>
<li><strong>Inextensible</strong> — connected particles share one acceleration.</li>
<li><strong>Uniform</strong> rod — weight acts at its midpoint.</li>
</ul>
<p>A "state one assumption and its effect" mark is nearly always available: name it, then say what it simplifies.</p>

<h3>Constant acceleration</h3>
<p><strong>v = u + at</strong> <em>Key:</em> u = initial velocity (m s⁻¹); v = final velocity (m s⁻¹); a = acceleration (m s⁻²); t = time (s). Use it when s is neither given nor wanted.</p>
<p><strong>s = ut + ½at²</strong> <em>Key:</em> s = displacement (m); u = initial velocity (m s⁻¹); a = acceleration (m s⁻²); t = time (s). The one to reach for when t is asked.</p>
<p><strong>v² = u² + 2as</strong> <em>Key:</em> s = displacement (m); u, v = initial and final velocity (m s⁻¹); a = acceleration (m s⁻²). Use it when time is absent from the question.</p>
<p>Take one direction as positive and keep it. A particle thrown up and caught later has a = −g throughout, even at the top where v = 0 — that is a common lost mark.</p>

<h3>Newton's second law and connected particles</h3>
<p><strong>F = ma</strong> <em>Key:</em> F = resultant force (N); m = mass (kg); a = acceleration (m s⁻²).</p>
<p>For two masses joined by a string over a pulley, write F = ma for each mass separately, with the same a and the same T, then add the equations to eliminate T:</p>
<p><strong>a = (m₁ − m₂)g/(m₁ + m₂)</strong> <em>Key:</em> m₁ = heavier mass (kg); m₂ = lighter mass (kg); g = 9.8 m s⁻²; a = acceleration of the system (m s⁻²). Adding first is faster and safer than substituting.</p>

<h3>Friction</h3>
<p><strong>F = μR</strong> <em>Key:</em> F = friction (N); μ = coefficient of friction (no units); R = normal reaction (N). This holds only at the point of sliding or in limiting equilibrium; while the body is at rest and not about to move, friction is only as large as it needs to be.</p>
<p><strong>R = mg cos θ</strong> <em>Key:</em> R = normal reaction (N); m = mass (kg); g = 9.8 m s⁻²; θ = angle of the plane to the horizontal (degrees). On an incline the weight splits into mg sin θ down the slope and mg cos θ into it.</p>

<h3>Moments</h3>
<p><strong>moment = F d</strong> <em>Key:</em> F = force (N); d = perpendicular distance from the pivot to the line of action (m); moment in N m. A rod in equilibrium needs both: the resultant force is zero <em>and</em> the total moment about any point is zero.</p>

<h3>Exam traps</h3>
<ul>
<li>Using a formula across two stages of motion. Split the journey at every change of acceleration.</li>
<li>Forgetting that the tension in a string is an internal force when both masses are taken as one system, so it disappears from that equation.</li>
<li>Taking d along the rod rather than perpendicular to the force.</li>
<li>Quoting g = 9.81 and rounding mid-calculation — carry the value through and round at the end.</li>
</ul>
`,

    /* ── Statistics S1, AS ─────────────────────────────────────────────── */
    "7cf768ed-afa9-45f5-9f6b-b86628e5d511": `
<h2>Statistics (S1) — Quick Revision Summary</h2>
<p>AS Statistics: summarising bivariate data with a regression line and a correlation coefficient, then probability — discrete random variables, the binomial and the normal — and the hypothesis test that ties them together. Formulas first, then the sentences the mark scheme wants.</p>

<h3>Bivariate data</h3>
<ul>
<li>Explanatory variable on the x-axis, response on the y; label both axes with the quantity and its unit.</li>
<li>Correlation describes strength and direction of a linear relationship only — it never proves causation, and a value of r near 0 rules out a straight line, not any relationship.</li>
<li>Interpolation inside the data range is safe; extrapolation beyond it is not.</li>
</ul>
<p><strong>b = S_xy / S_xx</strong> <em>Key:</em> b = gradient of the regression line of y on x; S_xy = Σ(x − x̄)(y − ȳ); S_xx = Σ(x − x̄)². Work in the coded variables when the data is large, then decode.</p>
<p><strong>a = ȳ − b x̄</strong> <em>Key:</em> a = intercept; ȳ = mean of y; x̄ = mean of x. The line always passes through (x̄, ȳ), which is the quickest check on your answer.</p>
<p><strong>r = S_xy / √(S_xx S_yy)</strong> <em>Key:</em> r = product moment correlation coefficient, between −1 and 1; S_yy = Σ(y − ȳ)². The sign of r is the sign of b, always.</p>

<h3>Probability</h3>
<ul>
<li>P(A ∪ B) = P(A) + P(B) − P(A ∩ B); drop the last term only when A and B are mutually exclusive.</li>
<li>Independent means P(A ∩ B) = P(A)P(B) — do not assume it; test it.</li>
<li>Tree diagrams for conditional work: multiply along a branch, add across branches.</li>
</ul>

<h3>Discrete random variables</h3>
<p><strong>E(X) = Σ x P(X = x)</strong> <em>Key:</em> E(X) = expected value, the long-run mean of X; the probabilities must total 1, which is usually the first thing to check.</p>
<p><strong>Var(X) = E(X²) − [E(X)]²</strong> <em>Key:</em> Var(X) = variance; E(X²) = Σ x² P(X = x). Subtracting the square of the mean, not the mean, is the step that goes wrong most often.</p>

<h3>Binomial and normal</h3>
<p><strong>P(X = r) = nCr pʳ (1 − p)ⁿ⁻ʳ</strong> <em>Key:</em> n = number of trials; p = probability of success in one trial; r = number of successes; nCr = n!/(r!(n − r)!). Conditions: fixed n, constant p, independent trials.</p>
<p><strong>z = (x − μ)/σ</strong> <em>Key:</em> x = observed value; μ = mean; σ = standard deviation; z = standard normal score, used with the table. For a sample mean use σ/√n in place of σ.</p>

<h3>Hypothesis testing</h3>
<ul>
<li>H₀ is always an equality; H₁ carries the inequality and decides the tail.</li>
<li>Compare the calculated probability with the significance level — not the test statistic with a critical value, unless the question gives critical values.</li>
<li>Conclude in the context: "there is sufficient evidence at the 5% level that …", never "H₀ is true".</li>
</ul>

<h3>Exam traps</h3>
<ul>
<li>Mixing up which variable goes on which axis when the regression line is of x on y rather than y on x.</li>
<li>Using the wrong standard deviation — of the population or of the sample — in a normal calculation.</li>
<li>Forgetting the continuity correction when a discrete variable is approximated by a normal distribution.</li>
</ul>
`,

    /* ── Numerical Methods, A2 ─────────────────────────────────────────── */
    "b76385e7-49bb-4776-b7d5-e319f9888aa8": `
<h2>Numerical Methods — Quick Revision Summary</h2>
<p>A2 Mathematics: finding a root you cannot solve algebraically, and the iteration and Newton–Raphson schemes that hunt it down, plus the trapezium rule for an integral with no closed form. The marks are for the setup and the justification as much as for the digits.</p>

<h3>Locating a root: change of sign</h3>
<p>If f is continuous on [a, b] and f(a) and f(b) have opposite signs, there is at least one root between them. Write both values, state that the sign changes, and state that the function is continuous — all three are needed for the mark.</p>
<p>A change of sign is evidence, not proof: it can hide two roots in the interval, and it fails entirely at a repeated root, where the curve touches the axis without crossing.</p>

<h3>Fixed-point iteration</h3>
<p><strong>x_(n+1) = g(x_n)</strong> <em>Key:</em> x_n = current estimate; g = the rearranged equation; the sequence converges only when the starting value is in range and the scheme is stable.</p>
<p><strong>|g′(x)| &lt; 1 near the root</strong> <em>Key:</em> g′ = derivative of the iteration function. A derivative smaller than 1 in size pulls successive values together — that is convergence; larger than 1 pushes them apart. The same equation rearranges several ways, so choose the form whose derivative is small there.</p>

<h3>Newton–Raphson</h3>
<p><strong>x_(n+1) = x_n − f(x_n)/f′(x_n)</strong> <em>Key:</em> f(x_n) = value of the function at the current estimate; f′(x_n) = its derivative there. Geometrically it follows the tangent down to the axis.</p>
<p>It converges far faster than iteration — usually doubling the correct digits — but it fails at a stationary point, where f′ = 0 and the formula divides by zero, and it can jump to a different root. Say which of those two it is when a question asks why a scheme fails.</p>

<h3>The trapezium rule</h3>
<p><strong>∫ f(x) dx ≈ (h/2)[y₀ + 2(y₁ + y₂ + … + y_(n−1)) + y_n]</strong> <em>Key:</em> h = strip width = (b − a)/n; y_i = f at each ordinate; n = number of strips, so there are n + 1 ordinates. Halving h roughly quarters the error.</p>
<p>The rule overestimates a curve that is concave up and underestimates one that is concave down — that sentence is what earns the "state whether it is an over- or underestimate" mark.</p>

<h3>Exam traps</h3>
<ul>
<li>Rounding at every step. Keep full accuracy in the calculator and round only the printed value.</li>
<li>Giving x_n when the question asks for x_(n+1) — count the iterations.</li>
<li>Forgetting the "to 3 decimal places" instruction, or dropping a leading zero.</li>
<li>Claiming convergence just because the sequence settles; show |g′| &lt; 1 or quote successive values closing in.</li>
</ul>
`,

    /* ── Further Mechanics, A2 Physics ─────────────────────────────────── */
    "7900e896-51b8-4904-82d4-ce8b5184a96f": `
<h2>Further Mechanics — Quick Revision Summary</h2>
<p>A2 Physics: momentum and impulse in one and two dimensions, collisions that conserve kinetic energy and those that do not, and motion in a circle — where the force is always inward and the speed is constant while the velocity is not.</p>

<h3>Momentum and impulse</h3>
<p><strong>p = m v</strong> <em>Key:</em> p = momentum (kg m s⁻¹); m = mass (kg); v = velocity (m s⁻¹). Momentum is a vector, so a reversal of direction means a change of sign.</p>
<p><strong>F = Δp/Δt</strong> <em>Key:</em> F = resultant force (N); Δp = change in momentum (kg m s⁻¹); Δt = time over which it acts (s). This is Newton's second law in its momentum form, and it is the form that holds when mass changes.</p>
<p><strong>impulse = F Δt = m v − m u</strong> <em>Key:</em> F = force (N); Δt = contact time (s); m = mass (kg); u, v = velocity before and after (m s⁻¹); impulse in N s. A crumple zone lengthens Δt, so the same Δp produces a smaller force.</p>

<h3>Conservation of momentum</h3>
<p>In any collision or explosion with no external resultant force:</p>
<p><strong>m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂</strong> <em>Key:</em> m₁, m₂ = masses (kg); u₁, u₂ = velocities before (m s⁻¹); v₁, v₂ = velocities after (m s⁻¹). Take one direction as positive before substituting, and keep the signs.</p>
<p><strong>Elastic:</strong> momentum and kinetic energy are both conserved. <strong>Inelastic:</strong> momentum is conserved, kinetic energy is not — it leaves as heat, sound and deformation. <strong>Perfectly inelastic:</strong> the bodies stick together, so there is one final velocity and the kinetic energy lost is at its maximum.</p>

<h3>Circular motion</h3>
<p><strong>v = ω r</strong> <em>Key:</em> v = speed along the arc (m s⁻¹); ω = angular velocity (rad s⁻¹); r = radius (m).</p>
<p><strong>a = v²/r = ω² r</strong> <em>Key:</em> a = centripetal acceleration (m s⁻²), directed towards the centre; v = speed (m s⁻¹); r = radius (m); ω = angular velocity (rad s⁻¹).</p>
<p><strong>F = m v²/r = m ω² r</strong> <em>Key:</em> F = centripetal force (N); m = mass (kg); v = speed (m s⁻¹); r = radius (m); ω = angular velocity (rad s⁻¹). The force is not an extra force — it is the resultant of the real forces, so identify which real force is providing it.</p>

<h3>Vertical circles</h3>
<p>At the top of a loop the weight and the normal reaction both point inward, so the minimum speed to stay in contact comes from mg = m v²/r:</p>
<p><strong>v_min = √(g r)</strong> <em>Key:</em> v_min = minimum speed at the top (m s⁻¹); g = 9.81 m s⁻²; r = radius of the circle (m). Below that speed the object leaves the track.</p>

<h3>Exam traps</h3>
<ul>
<li>Using speed where velocity is meant — momentum and impulse both need direction.</li>
<li>Forgetting that kinetic energy is a scalar while momentum is not, so a "loss" of kinetic energy can accompany a perfectly conserved momentum.</li>
<li>Calling the centripetal force a separate force on the free-body diagram, so the diagram ends up with one force too many.</li>
<li>Leaving ω in degrees per second; the formulas need radians.</li>
</ul>
`,

    /* ── Binomial Expansion, A2 ────────────────────────────────────────── */
    "086f9786-6f7d-4d27-80d2-ed31501ea667": `
<h2>Binomial Expansion — Quick Revision Summary</h2>
<p>A2 Mathematics: expanding (a + b)ⁿ for any positive integer n, extending the same series to negative and fractional n, and the range of x for which that infinite series is actually valid. The validity condition carries marks on almost every question.</p>

<h3>The theorem</h3>
<p><strong>(a + b)ⁿ = Σ (nCr) aⁿ⁻ʳ bʳ for r = 0 to n</strong> <em>Key:</em> n = positive integer index; a, b = the two terms; r = the term number counted from 0; nCr = n!/(r!(n − r)!). For n a positive integer the series stops at r = n.</p>
<p>The term independent of x is found by setting the power of x to zero and solving for r — not by expanding everything and looking.</p>

<h3>Negative and fractional indices</h3>
<p><strong>(1 + x)ⁿ = 1 + nx + n(n − 1)x²/2! + n(n − 1)(n − 2)x³/3! + …</strong> <em>Key:</em> n = any real index (negative or fractional allowed); x = the variable; the factorials come from the falling product, which is why the coefficients never reach zero.</p>
<p><strong>valid for |x| &lt; 1</strong> <em>Key:</em> x = the variable in the bracket, not the whole bracket — for (1 + 3x)ⁿ the condition is |3x| &lt; 1, so |x| &lt; 1/3. This is the mark most often dropped.</p>
<p>For (a + x)ⁿ with a ≠ 1, factor a out first, so the bracket is (1 + x/a)ⁿ and the validity condition follows from the new variable.</p>

<h3>Approximations</h3>
<ul>
<li>Substitute a small value of x into the expansion, having first checked it lies inside the valid range.</li>
<li>Quote the approximation to the number of terms the question asks for; extra terms do not earn extra marks and can introduce error.</li>
<li>State whether the approximation is too large or too small only if the question asks — the sign of the next term decides it.</li>
</ul>

<h3>Partial fractions into a series</h3>
<p>Split the fraction first, then expand each part separately and add the like powers. The overall validity is the <em>intersection</em> of the two ranges, not the union — the stricter condition governs.</p>
<p><strong>1/((1 − x)(1 + 2x)) = (1/3)/(1 − x) + (2/3)/(1 + 2x)</strong> <em>Key:</em> x = the variable; the numerators 1/3 and 2/3 come from A(1 + 2x) + B(1 − x) = 1, so A + B = 1 and 2A − B = 0. Check by recombining over the common denominator. Each part then expands as a geometric series, valid where |x| &lt; 1 and |2x| &lt; 1, so |x| &lt; 0.5.</p>

<h3>Exam traps</h3>
<ul>
<li>Forgetting the binomial coefficient when a term is subtracted — (1 − 2x)ⁿ alternates in sign.</li>
<li>Expanding without the modulus sign in the validity statement.</li>
<li>Losing a factor of aⁿ when the bracket starts with something other than 1.</li>
<li>Mixing the order of the two terms: (2 + x)ⁿ and (x + 2)ⁿ give the same terms in reverse order, so state which convention you used when quoting "the term in x³".</li>
</ul>
`,

    /* ── Coordinate Geometry, A2 ───────────────────────────────────────── */
    "bfd985ae-f64e-420a-bc24-9e8cf624c204": `
<h2>Coordinate Geometry — Quick Revision Summary</h2>
<p>A2 Mathematics: the straight line extended to the circle — centre and radius from a general equation, tangents and normals, chords, and the discriminant deciding how a line meets a curve. Every result here is one of five formulas plus a sketch.</p>

<h3>Lines, distances and gradients</h3>
<p><strong>d = √((x₂ − x₁)² + (y₂ − y₁)²)</strong> <em>Key:</em> d = distance between the two points; (x₁, y₁) and (x₂, y₂) = the points' coordinates. It is Pythagoras, so a negative difference disappears when squared.</p>
<p><strong>m = (y₂ − y₁)/(x₂ − x₁)</strong> <em>Key:</em> m = gradient; the denominator must not be zero, which is the vertical line. Perpendicular gradients satisfy m₁ m₂ = −1.</p>
<p><strong>y − y₁ = m(x − x₁)</strong> <em>Key:</em> m = gradient; (x₁, y₁) = a point on the line. Use it rather than y = mx + c when the gradient is a fraction.</p>

<h3>The circle</h3>
<p><strong>(x − a)² + (y − b)² = r²</strong> <em>Key:</em> (a, b) = centre; r = radius. Note the signs: (x − 3)² has centre x = 3, not −3.</p>
<p><strong>x² + y² + 2gx + 2fy + c = 0 → centre (−g, −f), r = √(g² + f² − c)</strong> <em>Key:</em> g, f, c = coefficients of the general form. Completing the square is the safe route if you cannot recall the letters, and it also shows at once whether r² is negative — in which case there is no circle.</p>

<h3>Tangents, normals and chords</h3>
<ul>
<li>The tangent at P is perpendicular to the radius at P, so its gradient is −1/m_radius.</li>
<li>The normal at P is the radius line itself, extended.</li>
<li>The perpendicular from the centre to a chord bisects the chord — the standard route to a chord's length.</li>
<li>The angle in a semicircle is a right angle, so a diameter subtends 90° at any point on the circle.</li>
</ul>

<h3>Intersections and the discriminant</h3>
<p>Substitute the line into the circle, collect a quadratic, then read the discriminant:</p>
<p><strong>b² − 4ac &gt; 0</strong> two points; <strong>= 0</strong> the line is a tangent; <strong>&lt; 0</strong> the line misses the circle. <em>Key:</em> a, b, c = coefficients of the resulting quadratic; this is also how "show that the line is a tangent" is proved.</p>

<h3>Exam traps</h3>
<ul>
<li>Forgetting to halve the coefficients in the general form, so the centre comes out at (−2g, −2f).</li>
<li>Using the diameter as the radius.</li>
<li>Quoting r rather than r² when writing the equation, and vice versa when reading it.</li>
<li>A sketch is not decoration: it decides which of two possible tangents or points the question wants.</li>
</ul>
`,

    /* ── Sequences and Series, A2 ──────────────────────────────────────── */
    "0cf9eb07-d713-4771-a959-8a55abf7f764": `
<h2>Sequences and Series — Quick Revision Summary</h2>
<p>A2 Mathematics: arithmetic and geometric sequences, the sums that go with them, convergence, and the standard results that turn a sigma into a formula. Recognise which type a sequence is before choosing a formula — that is the whole topic.</p>

<h3>Arithmetic sequences</h3>
<p><strong>u_n = a + (n − 1)d</strong> <em>Key:</em> u_n = the nth term; a = first term; d = common difference; n = term number. The (n − 1) is the usual slip.</p>
<p><strong>S_n = n/2 [2a + (n − 1)d] = n/2 (a + l)</strong> <em>Key:</em> S_n = sum of the first n terms; a = first term; d = common difference; l = last term. The second form is quicker when the last term is known.</p>

<h3>Geometric sequences</h3>
<p><strong>u_n = a rⁿ⁻¹</strong> <em>Key:</em> a = first term; r = common ratio; n = term number. The ratio is found by dividing any term by the one before it, and it may be negative.</p>
<p><strong>S_n = a(1 − rⁿ)/(1 − r)</strong> <em>Key:</em> S_n = sum of the first n terms; a = first term; r = common ratio, r ≠ 1. Use the equivalent a(rⁿ − 1)/(r − 1) when r &gt; 1 to keep the arithmetic positive.</p>
<p><strong>S_∞ = a/(1 − r) for |r| &lt; 1</strong> <em>Key:</em> S_∞ = sum to infinity; a = first term; r = common ratio. The modulus condition is the mark: with |r| ≥ 1 the series diverges and the formula does not apply.</p>

<h3>Standard summations</h3>
<p><strong>Σ r = n(n + 1)/2</strong> <em>Key:</em> r runs from 1 to n; the result is the sum of the first n integers.</p>
<p><strong>Σ r² = n(n + 1)(2n + 1)/6</strong> <em>Key:</em> r runs from 1 to n. For a sum that starts at r = 0 or at r = 5, subtract the part you do not want rather than re-deriving.</p>

<h3>Recurrence relations</h3>
<ul>
<li>A recurrence defines each term from the previous one; list the first few terms to see whether it is arithmetic or geometric.</li>
<li>A recurrence of the form u_(n+1) = a u_n + b has a fixed point; the sequence converges to it when |a| &lt; 1.</li>
<li>For "find the least n such that S_n &gt; 1000", form the inequality with the sum formula and solve — do not add terms one at a time.</li>
</ul>

<h3>Exam traps</h3>
<ul>
<li>Using n instead of n − 1 in the nth term, especially when the sequence is given from u₀.</li>
<li>Applying the sum-to-infinity formula to a divergent series.</li>
<li>Losing the sign when r is negative — the terms alternate, and the sum formula still works.</li>
<li>For a "how many terms" question, checking the answer rounds the right way: too few terms fail the condition, so round up.</li>
</ul>
`,

    /* ── Exponentials and Logarithms, AS ───────────────────────────────── */
    "730a18c0-2347-4534-9ccb-f2c2a9ab8df8": `
<h2>Exponentials and Logarithms — Quick Revision Summary</h2>
<p>AS Mathematics: a logarithm is an index written backwards, and every log law is an index law in disguise. Once that is clear, solving aˣ = b is one line, and the graph shapes decide the number of solutions.</p>

<h3>Definition and the two bases that matter</h3>
<p><strong>aˣ = b ⇔ x = log_a b</strong> <em>Key:</em> a = base, a &gt; 0 and a ≠ 1; b &gt; 0; x = the logarithm. The base of the log is the base of the power — reading it the other way round is the single commonest error.</p>
<p><strong>ln x = log_e x</strong> <em>Key:</em> e = 2.71828…, the natural base; ln x is defined for x &gt; 0 only. On a calculator, log is base 10 and ln is base e, and neither will accept a negative argument.</p>

<h3>The laws</h3>
<p><strong>log_a (xy) = log_a x + log_a y</strong> <em>Key:</em> a = base; x, y &gt; 0. Multiplication outside becomes addition inside — and there is no law for log(x + y).</p>
<p><strong>log_a (x/y) = log_a x − log_a y</strong> <em>Key:</em> a = base; x, y &gt; 0.</p>
<p><strong>log_a (xᵏ) = k log_a x</strong> <em>Key:</em> a = base; x &gt; 0; k = any real power. This is the law that solves exponential equations: take logs of both sides and bring the unknown down.</p>
<p><strong>a^(log_a x) = x and log_a a = 1</strong> <em>Key:</em> a = base; x &gt; 0. These two identities undo each other and settle most "show that" questions before any algebra.</p>

<h3>Solving equations</h3>
<ul>
<li>To solve 3^(2x) = 20, take ln of both sides: 2x ln 3 = ln 20, so x = ln 20/(2 ln 3).</li>
<li>An equation with two powers of the same base, such as 4ˣ − 5(2ˣ) + 4 = 0, is a quadratic in 2ˣ: substitute y = 2ˣ, solve for y, then take logs.</li>
<li>A negative or zero value of y is rejected at once, because an exponential is always positive.</li>
<li>Check every root in the original equation: squaring or substituting can introduce a solution that does not satisfy it.</li>
</ul>

<h3>Graphs</h3>
<ul>
<li>y = aˣ passes through (0, 1) and never touches the x-axis; it is increasing for a &gt; 1, decreasing for 0 &lt; a &lt; 1.</li>
<li>y = log_a x is the reflection of y = aˣ in the line y = x, passes through (1, 0), and has the y-axis as an asymptote.</li>
<li>The number of intersections of a curve and a line is the number of solutions — a graph, not algebra, answers "how many roots".</li>
</ul>

<h3>Exam traps</h3>
<ul>
<li>Writing log(x + 3) = log x + log 3. It is not, and no rearrangement makes it so.</li>
<li>Dropping the "x &gt; 0" domain, then keeping a negative root.</li>
<li>Using log instead of ln (or the reverse) and losing the base in the final answer.</li>
<li>Forgetting to state the answer to the required accuracy — these questions almost always ask for 3 significant figures.</li>
</ul>
`,

    /* ── Exponentials and Logarithms, A2 ───────────────────────────────── */
    "9284fe82-c63e-49a8-adff-9571465eb6d3": `
<h2>Exponentials and Logarithms — Quick Revision Summary</h2>
<p>A2 Mathematics: the same definition and laws, now used in both directions — as a modelling tool for growth and decay, and as a way to turn a curved set of data into a straight line. Plus the calculus of eˣ and ln x.</p>

<h3>The laws, and the change of base</h3>
<p><strong>log_a b = ln b / ln a</strong> <em>Key:</em> a = the base you want; b = the number; ln = natural log. Calculators offer only base 10 and base e, so every other base goes through this line — log₂ 7 = ln 7/ln 2 = 2.807.</p>
<p><strong>log_a x = log_b x / log_b a</strong> <em>Key:</em> the general form, identical in substance to the line above. It also proves log_a b = 1/log_b a, which is useful when the unknown is a base.</p>

<h3>Calculus</h3>
<p><strong>d/dx (e^(kx)) = k e^(kx)</strong> <em>Key:</em> k = constant multiplier of x; the exponential is the one function that is its own derivative, up to that constant.</p>
<p><strong>d/dx (ln x) = 1/x</strong> <em>Key:</em> x &gt; 0; for ln(kx) the derivative is still 1/x, because the constant contributes nothing.</p>
<p>In reverse, ∫ (1/x) dx = ln|x| + c, and the modulus is required because the antiderivative must work on both sides of zero.</p>

<h3>Modelling growth and decay</h3>
<p><strong>N = N₀ e^(kt)</strong> <em>Key:</em> N = amount at time t; N₀ = starting amount; k = rate constant (s⁻¹, positive for growth, negative for decay); t = time. Half-life follows from setting N = N₀/2, giving t = ln 2/|k|.</p>
<p><strong>N = N₀ a^t with a = e^k</strong> <em>Key:</em> a = the multiplier per unit time. The two forms are the same model, and a question may fix k by giving one data point.</p>

<h3>Reducing a relationship to a straight line</h3>
<ul>
<li>Take logs of both sides, then compare with Y = mX + c.</li>
<li>y = axⁿ becomes log y = n log x + log a: plot log y against log x, gradient n, intercept log a.</li>
<li>y = abˣ becomes log y = (log b)x + log a: plot log y against x, gradient log b, intercept log a.</li>
<li>y = ae^(kx) becomes ln y = kx + ln a: plot ln y against x, gradient k, intercept ln a.</li>
</ul>
<p><strong>ln y = k x + ln a</strong> <em>Key:</em> y = measured quantity; x = the other variable; k = gradient, the continuous rate; ln a = intercept, so a = e^(intercept). The gradient of the straight-line graph is the rate constant itself — that sentence is usually worth a mark.</p>

<h3>Exam traps</h3>
<ul>
<li>Plotting y against x and expecting a straight line from exponential data.</li>
<li>Reading the gradient as a itself, rather than as ln a or log a.</li>
<li>Using log (base 10) on one axis and ln on the other; both work, but mixing them inside one calculation does not.</li>
<li>For a decay model, a negative k quoted as positive — the sign carries the meaning.</li>
</ul>
`,
  },
};
