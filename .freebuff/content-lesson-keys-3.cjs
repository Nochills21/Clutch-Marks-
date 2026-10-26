// Lesson inline symbol keys — batch 3 (26 lessons, keys where a real relation
// is stated). Each `find` is copied character-for-character from the dumped
// lesson body and must occur exactly once; `replace` is that same fragment
// with the key added inside its own container.
//
//   node .freebuff/apply-inline-keys.cjs .freebuff/content-lesson-keys-3.cjs
module.exports = {
  edits: {
    /* Maths AS — circular measure: arc length, sector and segment areas */
    "ad8ff577-04ea-42ec-ac9e-ea746e98ff02": [
      {
        find: "<p>s = rθ (θ in radians).</p>",
        replace:
          "<p>s = rθ (θ in radians). <em>Key:</em> s = arc length, in the same unit as r; r = radius; θ = the angle at the centre in radians, which is a pure number — never put degrees in here.</p>",
      },
      {
        find: "<p>A = ½r²θ.</p>",
        replace:
          "<p>A = ½r²θ. <em>Key:</em> A = area of the sector, in square units of the length used; r = radius; θ = angle at the centre in radians (not degrees).</p>",
      },
      {
        find: "<p>A = ½r²(θ − sin θ). For r = 2, θ = π/2: A = 2(π/2 − 1) = π − 2.</p>",
        replace:
          "<p>A = ½r²(θ − sin θ). For r = 2, θ = π/2: A = 2(π/2 − 1) = π − 2. <em>Key:</em> A = area of the segment between the chord and the arc (square units); r = radius; θ = angle subtended at the centre in radians — sin θ is dimensionless, so it can be subtracted from θ.</p>",
      },
    ],

    /* Maths AS — coordinate geometry */
    "8be68cdd-a426-4fc6-bb78-14dc291e7337": [
      {
        find: "<p>Gradient m = (y₂ − y₁)/(x₂ − x₁). From ax + by + c = 0, the gradient is −a/b.</p>",
        replace:
          "<p>Gradient m = (y₂ − y₁)/(x₂ − x₁). From ax + by + c = 0, the gradient is −a/b. <em>Key:</em> m = gradient, the change in y per unit x; (x₁, y₁) and (x₂, y₂) = two points on the line; a, b and c = the coefficients of the line's equation (no units, since they only set the line's position).</p>",
      },
      {
        find: "<p>Intersections: solve the equations simultaneously. The perpendicular bisector of AB passes through the midpoint of AB with gradient −1/m(AB) — equate distances PA = PB for the locus method.</p>",
        replace:
          "<p>Intersections: solve the equations simultaneously. The perpendicular bisector of AB passes through the midpoint of AB with gradient −1/m(AB) — equate distances PA = PB for the locus method. <em>Key:</em> m(AB) = the gradient of the line AB; P = a general point of the locus; PA and PB = distances from P to each endpoint, so they share the unit of the axes.</p>",
      },
    ],

    /* Maths AS — differentiation */
    "1873a087-21ee-4705-b853-3a10d6908ebc": [
      {
        find: "<li>d/dx (k) = 0, d/dx (kx) = k</li>",
        replace:
          "<li>d/dx (k) = 0, d/dx (kx) = k <em>Key:</em> d/dx = differentiate with respect to x; k = a constant (it carries y's unit per unit of x); differentiating a constant kills it, and a linear term keeps its coefficient.</li>",
      },
      {
        find: "<p>dy/dx = dy/du × du/dx.</p>",
        replace:
          "<p>dy/dx = dy/du × du/dx. <em>Key:</em> dy/dx = rate of change of y with respect to x; u = an intermediate variable introduced to split the function; the chain rule multiplies the two rates, and du cancels like a fraction.</p>",
      },
      {
        find: "<p>dy/dx is a rate: if V = 4/3 πr³, then dV/dr = 4πr² links volume change to radius change.</p>",
        replace:
          "<p>dy/dx is a rate: if V = 4/3 πr³, then dV/dr = 4πr² links volume change to radius change. <em>Key:</em> V = volume (m³); r = radius (m); dV/dr = the rate at which volume grows per metre of radius, so its unit is m³ ÷ m = m².</p>",
      },
    ],

    /* Maths AS — functions: the inverse */
    "435ea01f-996d-4c6c-a598-f760b331ea21": [
      {
        find: "<p>f⁻¹ reverses f: f⁻¹f(x) = x. To find it, swap x and y in y = f(x) and rearrange.</p>",
        replace:
          "<p>f⁻¹ reverses f: f⁻¹f(x) = x. To find it, swap x and y in y = f(x) and rearrange. <em>Key:</em> f⁻¹ = the inverse function; f⁻¹f(x) means \"apply f, then undo it\", which returns the original input; x stays in f's domain and the output stays in f's range.</p>",
      },
    ],

    /* Maths AS — integration */
    "5a5deb96-4351-475d-a3e2-1041cf7ccf2c": [
      {
        find: "<p>Reverse the power rule and add a constant: ∫ xⁿ dx = xⁿ⁺¹/(n+1) + c (n ≠ −1).</p>",
        replace:
          "<p>Reverse the power rule and add a constant: ∫ xⁿ dx = xⁿ⁺¹/(n+1) + c (n ≠ −1). <em>Key:</em> n = the power of x, any number except −1 (where division by n + 1 would fail); c = the constant of integration, carrying the same unit as y; dx = integrate with respect to x.</p>",
      },
      {
        find: "<p>∫ₐᵇ f(x) dx = [F(x)]ₐᵇ = F(b) − F(a). Constants of integration cancel.</p>",
        replace:
          "<p>∫ₐᵇ f(x) dx = [F(x)]ₐᵇ = F(b) − F(a). Constants of integration cancel. <em>Key:</em> F = any antiderivative of f; a = lower and b = upper limit, both values of x; the result is the signed area under the curve between them, in y-units × x-units.</p>",
      },
      {
        find: "<p>A ≈ h/2 [y₀ + 2(y₁ + … + yₙ₋₁) + yₙ], h = (b − a)/n. More strips → better estimate; always an over-estimate for convex curves.</p>",
        replace:
          "<p>A ≈ h/2 [y₀ + 2(y₁ + … + yₙ₋₁) + yₙ], h = (b − a)/n. More strips → better estimate; always an over-estimate for convex curves. <em>Key:</em> h = width of each strip (unit of x); y₀ … yₙ = the strip heights (unit of y); n = the number of strips (a count); a and b = the limits of x; A = the estimated area.</p>",
      },
    ],

    /* Maths AS — measures of variation */
    "6d28b4d8-2171-4ad4-9199-8d84e2640aa7": [
      {
        find: "<p>The range is max − min — quick but destroyed by a single outlier. Quartiles split ordered data into quarters: Q₁ at position (n + 1)/4, Q₃ at 3(n + 1)/4 (raw data). The interquartile range, IQR = Q₃ − Q₁, is the spread of the middle 50% and resists outliers. Outliers are commonly flagged as values beyond Q₁ − 1.5·IQR or Q₃ + 1.5·IQR.</p>",
        replace:
          "<p>The range is max − min — quick but destroyed by a single outlier. Quartiles split ordered data into quarters: Q₁ at position (n + 1)/4, Q₃ at 3(n + 1)/4 (raw data). The interquartile range, IQR = Q₃ − Q₁, is the spread of the middle 50% and resists outliers. Outliers are commonly flagged as values beyond Q₁ − 1.5·IQR or Q₃ + 1.5·IQR. <em>Key:</em> n = the number of data items (a count); Q₁ and Q₃ = the lower and upper quartile values, in the same unit as the data; the IQR and the 1.5·IQR fences share that unit.</p>",
      },
      {
        find: "<li>standard deviation s = √(variance)</li>",
        replace:
          "<li>standard deviation s = √(variance) <em>Key:</em> s = standard deviation, back in the unit of the data because the square root undoes the squaring; variance is the mean square deviation, so it carries that unit squared.</li>",
      },
    ],

    /* Maths AS — central tendency: coding */
    "30686f94-712e-434f-9373-2af41dcf9581": [
      {
        find: "<p>Subtract a constant and divide by a convenient width: y = (x − a)/b. Then x̄ = b·ȳ + a. Coding simplifies arithmetic and always preserves the relationship — the coded mean decodes exactly.</p>",
        replace:
          "<p>Subtract a constant and divide by a convenient width: y = (x − a)/b. Then x̄ = b·ȳ + a. Coding simplifies arithmetic and always preserves the relationship — the coded mean decodes exactly. <em>Key:</em> x = the raw value (its own unit); a = the assumed mean, in that same unit; b = the coding divisor, also in that unit, so y is a plain number; x̄ = the decoded mean and ȳ = the mean of the coded values.</p>",
      },
    ],

    /* Maths AS — probability: overlap, conditional */
    "72edddc7-1e10-4d4b-b8fe-36fc36f22a6f": [
      {
        find: "<li>P(A ∪ B) = P(A) + P(B) − P(A ∩ B)</li>",
        replace:
          "<li>P(A ∪ B) = P(A) + P(B) − P(A ∩ B) <em>Key:</em> P = a probability, a number from 0 to 1 with no unit; A ∪ B = \"at least one of A, B\"; A ∩ B = \"both\", which is subtracted once because adding P(A) and P(B) counts it twice.</li>",
      },
      {
        find: "<p>P(A | B) = P(A ∩ B)/P(B) — the probability of A given that B has occurred. The condition shrinks the sample space.</p>",
        replace:
          "<p>P(A | B) = P(A ∩ B)/P(B) — the probability of A given that B has occurred. The condition shrinks the sample space. <em>Key:</em> P(A | B) = the probability of A once B is known; P(A ∩ B) = the probability that both occur; P(B) = the probability of the condition, which must not be zero.</p>",
      },
    ],

    /* Maths AS — probability distributions: expectation and variance */
    "f459f9e5-7cac-4857-90b0-9004444a980d": [
      {
        find: "<li>E(X) = Σxᵢpᵢ</li>",
        replace:
          "<li>E(X) = Σxᵢpᵢ <em>Key:</em> X = the random variable; xᵢ = each value X can take; pᵢ = the probability of that value; Σ = add the products over every value; E(X) has X's own unit — it is the long-run average.</li>",
      },
      {
        find: "<li>Var(X) = E(X²) − (E(X))²</li>",
        replace:
          "<li>Var(X) = E(X²) − (E(X))² <em>Key:</em> Var(X) = the variance, in X's unit squared; E(X²) = the expectation of the squares (compute Σxᵢ²pᵢ, not the square of E(X)) — the gap between the two is the spread.</li>",
      },
      {
        find: "<li>E(aX + b) = a·E(X) + b and Var(aX + b) = a²·Var(X)</li>",
        replace:
          "<li>E(aX + b) = a·E(X) + b and Var(aX + b) = a²·Var(X) <em>Key:</em> a = a scaling constant (pure, so it takes X's unit with it); b = a shift in X's own unit; expectations move with both, while variance only feels the scale, and feels it squared.</li>",
      },
    ],

    /* Maths AS — quadratics: vertex form */
    "e0575801-5f93-446c-80a5-8ee539be4133": [
      {
        find: "<p>Vertex form a(x − h)² + k gives the minimum/maximum value k at x = h — this is how you find a maximum area or minimum cost.</p>",
        replace:
          "<p>Vertex form a(x − h)² + k gives the minimum/maximum value k at x = h — this is how you find a maximum area or minimum cost. <em>Key:</em> a = the shape coefficient (positive opens upward, negative downward); h = the x-coordinate of the turning point; k = the function's value there, in the unit of y — so the max or min answer is k itself, not h.</p>",
      },
    ],

    /* Maths AS — sequences and series: worked AP and GP */
    "5873d859-74be-4ec6-be1e-2c073f6edb4e": [
      {
        find: "<p><strong>Example:</strong> AP 5, 8, 11: the 20th term is 5 + 19 × 3 = 62.</p>",
        replace:
          "<p><strong>Example:</strong> AP 5, 8, 11: the 20th term is 5 + 19 × 3 = 62. <em>Key:</em> 5 = a, the first term; 3 = d, the common difference; 19 = n − 1, because the 20th term sits 19 steps after the first.</p>",
      },
      {
        find: "<p><strong>Example:</strong> a = 8, r = 1/2 gives S∞ = 8/(1/2) = 16.</p>",
        replace:
          "<p><strong>Example:</strong> a = 8, r = 1/2 gives S∞ = 8/(1/2) = 16. <em>Key:</em> a = the first term of the GP; r = the common ratio (each term × r); S∞ = the sum to infinity, which only exists while |r| < 1 — otherwise the series diverges.</p>",
      },
    ],

    /* Maths AS — the normal distribution */
    "fdc18cc4-d701-46d2-9b30-b3c37f8ebbed": [
      {
        find: "<p>A continuous distribution with the familiar bell shape, symmetric about the mean, described by two parameters: X ~ N(μ, σ²). The curve is fully determined by μ (centre) and σ (width). Total probability is 1, and because X is continuous, P(X = a) = 0 for any single point — inequalities do not need strictness.</p>",
        replace:
          "<p>A continuous distribution with the familiar bell shape, symmetric about the mean, described by two parameters: X ~ N(μ, σ²). The curve is fully determined by μ (centre) and σ (width). Total probability is 1, and because X is continuous, P(X = a) = 0 for any single point — inequalities do not need strictness. <em>Key:</em> X = the random variable, in its own unit; μ = the mean of the distribution (that unit); σ² = the variance (that unit squared), so σ is the standard deviation.</p>",
      },
      {
        find: "<li>Z = (X − μ)/σ</li>",
        replace:
          "<li>Z = (X − μ)/σ <em>Key:</em> X = the value being tested; μ = mean of the distribution; σ = standard deviation; Z = how many standard deviations X sits from the mean — it has no unit, because a length in X-units is divided by a length in the same units, which is why one table serves every distribution.</li>",
      },
      {
        find: "<p>P(X &gt; μ) = 0.5. P(X &lt; a) for a above the mean uses the complement. Tables usually give Φ(z) for z ≥ 0 only; use Φ(−z) = 1 − Φ(z).</p>",
        replace:
          "<p>P(X &gt; μ) = 0.5. P(X &lt; a) for a above the mean uses the complement. Tables usually give Φ(z) for z ≥ 0 only; use Φ(−z) = 1 − Φ(z). <em>Key:</em> Φ(z) = P(Z < z), the area under the standard normal curve up to z, read straight off the table (a probability, so 0 to 1 with no unit).</p>",
      },
    ],

    /* Maths AS — trigonometry: the wave equation */
    "974076e4-7f15-4e75-abb8-428249e25f7a": [
      {
        find: "<p>y = a sin(bx) + c has amplitude a, period 2π/b, and vertical shift c.</p>",
        replace:
          "<p>y = a sin(bx) + c has amplitude a, period 2π/b, and vertical shift c. <em>Key:</em> a = amplitude, in the unit of y (measure it peak-to-midline and take the positive value); b = the angular multiplier, which shortens the period to 2π/b in radians (360°/b in degrees); c = the vertical shift, in the unit of y.</p>",
      },
    ],

    /* Maths A2 — binomial distribution */
    "438bdb94-d1b5-4ce8-a01b-0acc04f0560c": [
      {
        find: "<p>P(X = r) = ⁿCᵣ pʳ(1 − p)ⁿ⁻ʳ for r = 0, 1, ..., n. The ⁿCᵣ counts which r of the n trials were the successes.</p>",
        replace:
          "<p>P(X = r) = ⁿCᵣ pʳ(1 − p)ⁿ⁻ʳ for r = 0, 1, ..., n. The ⁿCᵣ counts which r of the n trials were the successes. <em>Key:</em> X = number of successes; n = number of independent trials (a count); p = probability of success on one trial (0 to 1); r = the observed number of successes; ⁿCᵣ = n! / (r!(n − r)!), the number of ways to choose which trials succeeded.</p>",
      },
      {
        find: "<li>E(X) = np and Var(X) = np(1 − p)</li>",
        replace:
          "<li>E(X) = np and Var(X) = np(1 − p) <em>Key:</em> n = number of trials; p = success probability; E(X) = the mean number of successes (a count); Var(X) = its variance — always smaller than the mean, because (1 − p) is under 1.</li>",
      },
    ],

    /* Maths A2 — complex numbers */
    "9811355f-158e-40bd-830d-b837f237dde3": [
      {
        find: "<p>i² = −1. A complex number z = a + bi has real part a and imaginary part b. Two numbers are equal iff both parts match.</p>",
        replace:
          "<p>i² = −1. A complex number z = a + bi has real part a and imaginary part b. Two numbers are equal iff both parts match. <em>Key:</em> z = the complex number; a = Re(z), the real part; b = Im(z), the imaginary part — both are ordinary real numbers; i = √−1, the unit that cannot be plotted on the real axis.</p>",
      },
      {
        find: "<p>Plot z as the point (a, b). |z| = √(a² + b²) is the modulus (distance from origin); arg z = tan⁻¹(b/a) is the argument (angle). Multiply two numbers: moduli multiply, arguments add.</p>",
        replace:
          "<p>Plot z as the point (a, b). |z| = √(a² + b²) is the modulus (distance from origin); arg z = tan⁻¹(b/a) is the argument (angle). Multiply two numbers: moduli multiply, arguments add. <em>Key:</em> a and b = the coordinates of z on the Argand diagram (the modulus takes their unit, if any); arg z = the angle from the positive real axis, in radians or degrees as the question asks.</p>",
      },
      {
        find: "<p>z = r(cos θ + i sin θ), r = |z|, θ = arg z. Useful for powers and roots.</p>",
        replace:
          "<p>z = r(cos θ + i sin θ), r = |z|, θ = arg z. Useful for powers and roots. <em>Key:</em> r = modulus of z, the distance from the origin; θ = argument of z, the angle it makes with the real axis; cos θ and sin θ are dimensionless, so r carries the unit.</p>",
      },
    ],

    /* Maths A2 — continuous random variables */
    "f20303aa-a977-4d69-b46e-7511db135c9d": [
      {
        find: "<p>A continuous variable X is described by a density f(x) with f(x) ≥ 0 and ∫f(x)dx = 1 over all x. Probabilities are areas:</p>",
        replace:
          "<p>A continuous variable X is described by a density f(x) with f(x) ≥ 0 and ∫f(x)dx = 1 over all x. Probabilities are areas: <em>Key:</em> f(x) = the probability density, measured per unit of X (so it is not itself a probability); the total area under it must be exactly 1.</p>",
      },
      {
        find: "<li>P(a ≤ X ≤ b) = ∫ₐᵇ f(x) dx</li>",
        replace:
          "<li>P(a ≤ X ≤ b) = ∫ₐᵇ f(x) dx <em>Key:</em> a and b = the limits, values of X in its own unit; the integral is the area under the density between them, which comes out as a probability between 0 and 1.</li>",
      },
      {
        find: "<li>E(X) = ∫x·f(x) dx</li>",
        replace:
          "<li>E(X) = ∫x·f(x) dx <em>Key:</em> E(X) = the mean of X, in X's own unit; f(x) = the density per unit of X, which is what leaves the integral in that unit; integrate over the whole range of X.</li>",
      },
      {
        find: "<li>Var(X) = E(X²) − (E(X))²</li>",
        replace:
          "<li>Var(X) = E(X²) − (E(X))² <em>Key:</em> Var(X) = the variance, in X's unit squared; E(X²) = ∫x²f(x) dx, the expectation of the squares — compute it separately from the square of E(X), the two are never the same thing.</li>",
      },
    ],

    /* Maths A2 — differentiation II: parametric */
    "88a910d5-276d-42b5-b3d1-8f58a3361a02": [
      {
        find: "<p>For x = f(t), y = g(t): dy/dx = (dy/dt)/(dx/dt).</p>",
        replace:
          "<p>For x = f(t), y = g(t): dy/dx = (dy/dt)/(dx/dt). <em>Key:</em> t = the parameter (often time, in seconds); dy/dt and dx/dt = the rates of change with respect to t; their quotient is the rate of y per unit x, because dt cancels like a fraction.</p>",
      },
    ],

    /* Maths A2 — further algebra: remainder and partial fractions */
    "681322f4-6928-4633-82b0-57a52bc13567": [
      {
        find: "<p>Divide to rewrite p(x) = (x − a)q(x) + r. The remainder when dividing by (x − a) equals p(a).</p>",
        replace:
          "<p>Divide to rewrite p(x) = (x − a)q(x) + r. The remainder when dividing by (x − a) equals p(a). <em>Key:</em> p(x) = the polynomial being divided; q(x) = the quotient (one degree lower than p); a = the value substituted; r = the remainder, a constant in p(x)'s own unit — and it is exactly p(a).</p>",
      },
      {
        find: "<li>Distinct linear: (7x + 4)/(x + 1)(x + 2) = A/(x + 1) + B/(x + 2)</li>",
        replace:
          "<li>Distinct linear: (7x + 4)/(x + 1)(x + 2) = A/(x + 1) + B/(x + 2) <em>Key:</em> A and B = the constants to be found (pure numbers), chosen so the split is identical to the original fraction for every x; the method then integrates each simple piece separately.</li>",
      },
    ],

    /* Maths A2 — further trigonometry */
    "d91246f7-9ff6-4ae4-8fda-792e4dc74f4b": [
      {
        find: "<li>cos(A ± B) = cos A cos B ∓ sin A sin B</li>",
        replace:
          "<li>cos(A ± B) = cos A cos B ∓ sin A sin B <em>Key:</em> A and B = two angles in the same unit (degrees or radians); the ± pairs with ∓ — a plus on the left is a minus on the right; every term is dimensionless, being a ratio of lengths.</li>",
      },
      {
        find: "<li>cos 2A = cos²A − sin²A = 2cos²A − 1 = 1 − 2sin²A</li>",
        replace:
          "<li>cos 2A = cos²A − sin²A = 2cos²A − 1 = 1 − 2sin²A <em>Key:</em> A = the angle (the same identity holds for sin 2A = 2 sin A cos A above); the three forms are interchangeable — pick the one that matches what you know, cos²A for cos values, sin²A for sin values.</li>",
      },
      {
        find: "<p>a sin x + b cos x = R sin(x + α) with R = √(a² + b²) and tan α = b/a.</p>",
        replace:
          "<p>a sin x + b cos x = R sin(x + α) with R = √(a² + b²) and tan α = b/a. <em>Key:</em> a and b = the original coefficients (they share a unit, so √(a² + b²) means anything); R = the amplitude of the combined wave; α = the phase shift, in the same angular unit as x — read both R and α from a sketch of the triangle, since tan α alone loses the quadrant.</p>",
      },
    ],

    /* Maths A2 — hypothesis testing */
    "8fbe32b4-a982-4320-a61a-dd42805f3a7a": [
      {
        find: "<p>The null hypothesis H₀ is the default claim (no change, p = p₀). The alternative H₁ is what a suspicious observation suggests (p &gt; p₀, p &lt; p₀, or p ≠ p₀). The significance level α is the probability of rejecting a true H₀ — the false-alarm rate, usually 5% or 1%.</p>",
        replace:
          "<p>The null hypothesis H₀ is the default claim (no change, p = p₀). The alternative H₁ is what a suspicious observation suggests (p &gt; p₀, p &lt; p₀, or p ≠ p₀). The significance level α is the probability of rejecting a true H₀ — the false-alarm rate, usually 5% or 1%. <em>Key:</em> p = the true success probability being tested; p₀ = the value H₀ pins it to (a number from 0 to 1); α = significance level, also a probability — 5% is written 0.05, never 5.</p>",
      },
    ],

    /* Maths A2 — integration II: standard results and by parts */
    "a437b2b1-1dc1-4e2c-96e8-2ac4a561f557": [
      {
        find: "<li>∫ 1/x dx = ln|x| + c</li>",
        replace:
          "<li>∫ 1/x dx = ln|x| + c <em>Key:</em> for every standard result above: c = the constant of integration, in the same unit as the antiderivative; the absolute value keeps the logarithm defined for negative x; each answer differentiates straight back to the integrand.</li>",
      },
      {
        find: "<p>∫ u (dv/dx) dx = uv − ∫ v (du/dx) dx. Choose u to be the part that simplifies when differentiated (LIATE: logs, inverse trig, algebraic, trig, exponential).</p>",
        replace:
          "<p>∫ u (dv/dx) dx = uv − ∫ v (du/dx) dx. Choose u to be the part that simplifies when differentiated (LIATE: logs, inverse trig, algebraic, trig, exponential). <em>Key:</em> u = the factor you differentiate (first in the LIATE order); v = the factor you integrate; both are functions of x — for a definite integral, evaluate uv between the same limits and the constants cancel.</p>",
      },
    ],

    /* Maths A2 — Poisson distribution */
    "fe8054b1-1e62-4fe3-823c-abb7dd5e1954": [
      {
        find: "<p>P(X = r) = e^(−λ) λʳ / r! for r = 0, 1, 2, ...</p>",
        replace:
          "<p>P(X = r) = e^(−λ) λʳ / r! for r = 0, 1, 2, ... <em>Key:</em> X = number of occurrences in the fixed interval; λ = the mean number expected in that interval (a count, e.g. 2 arrivals per minute); r = the value being evaluated (0, 1, 2, …); e = 2.718…, so the whole expression is a probability between 0 and 1.</p>",
      },
      {
        find: "<li>E(X) = λ and Var(X) = λ — the mean and variance are equal.</li>",
        replace:
          "<li>E(X) = λ and Var(X) = λ — the mean and variance are equal. <em>Key:</em> E(X) = the mean count; Var(X) = the variance of that count; they are numerically identical for a Poisson, which is the quickest way to recognise one — if the mean and variance disagree, the data is not Poisson.</li>",
      },
    ],

    /* Maths A2 — sampling and estimation: the sample-mean distribution */
    "fd3bdf78-e388-45d8-b724-aa9baa27183a": [
      {
        find: "<p><strong>Example:</strong> population mean 50, s.d. 12, n = 36. Then x̄ ~ N(50, 4) and P(x̄ &gt; 51) = P(Z &gt; 0.5) = 0.3085.</p>",
        replace:
          "<p><strong>Example:</strong> population mean 50, s.d. 12, n = 36. Then x̄ ~ N(50, 4) and P(x̄ &gt; 51) = P(Z &gt; 0.5) = 0.3085. <em>Key:</em> x̄ = the sample mean, in the data's own unit; 4 = σ²/n = 144/36, the variance of x̄, so the spread shrinks with √n; Z = (x̄ − μ)/(σ/√n), the standardised distance, with no unit.</p>",
      },
    ],

    /* Maths A2 — vectors */
    "870c63cf-7392-4cf3-b28c-9200a2d6eda2": [
      {
        find: "<p>A vector a = 3i + 4j has magnitude |a| = √(3² + 4²) = 5. Parallel vectors are scalar multiples; unit vector = a/|a|.</p>",
        replace:
          "<p>A vector a = 3i + 4j has magnitude |a| = √(3² + 4²) = 5. Parallel vectors are scalar multiples; unit vector = a/|a|. <em>Key:</em> i and j = the unit vectors along the x- and y-axes, each of length 1; 3 and 4 = the components (same unit as the axes); |a| = the magnitude, back in that unit; a/|a| = a direction with length exactly 1.</p>",
      },
      {
        find: "<p>The line through point A with direction d: r = a + t d. Two lines are parallel if their directions are multiples.</p>",
        replace:
          "<p>The line through point A with direction d: r = a + t d. Two lines are parallel if their directions are multiples. <em>Key:</em> r = the position vector of any point on the line; a = the position vector of the fixed point A; d = the direction vector; t = a free scalar parameter — sweep t and you walk the whole line.</p>",
      },
      {
        find: "<p>a · b = |a||b| cos θ = a₁b₁ + a₂b₂.</p>",
        replace:
          "<p>a · b = |a||b| cos θ = a₁b₁ + a₂b₂. <em>Key:</em> a · b = the scalar product, which has the units of length squared; |a|, |b| = the magnitudes; θ = the angle between the two vectors, in degrees or radians as the question uses; a₁, a₂ and b₁, b₂ = their components.</p>",
      },
    ],

    /* Physics OL — earth and space: orbital speed */
    "8b98db4d-d584-48c4-85e8-b99aaa172e6b": [
      {
        find: "<p>Orbital speed v = 2πr/T. T grows with r (Kepler trend). Comets speed up near the Sun (ellipse, Sun at focus).</p>",
        replace:
          "<p>Orbital speed v = 2πr/T. T grows with r (Kepler trend). Comets speed up near the Sun (ellipse, Sun at focus). <em>Key:</em> v = orbital speed (m s⁻¹); r = orbital radius, measured from the centre of the body being circled (m); T = time for one full orbit (s); 2πr = the circumference travelled each period.</p>",
      },
    ],

    /* Physics OL — electricity and circuits */
    "27d43cee-9aa9-46c2-98de-01175c97892d": [
      {
        find: "<p>Conventional current: + → − (electron flow opposite). I = Q/t. Ammeter in series; voltmeter in parallel.</p>",
        replace:
          "<p>Conventional current: + → − (electron flow opposite). I = Q/t. Ammeter in series; voltmeter in parallel. <em>Key:</em> I = current (A); Q = charge flowed (C); t = time taken (s) — one amp is one coulomb per second.</p>",
      },
      {
        find: "<li>R = V/I. Ohmic conductor: V ∝ I at constant temperature.</li>",
        replace:
          "<li>R = V/I. Ohmic conductor: V ∝ I at constant temperature. <em>Key:</em> R = resistance (Ω); V = potential difference across the component (V); I = current through it (A) — one ohm is one volt per amp.</li>",
      },
      {
        find: "<li>Series: R = R₁ + R₂ + …; same current; p.d. shares in proportion to R.</li>",
        replace:
          "<li>Series: R = R₁ + R₂ + …; same current; p.d. shares in proportion to R. <em>Key:</em> R = total resistance of the chain (Ω); R₁, R₂ = the individual resistors (Ω); in series the total always grows, and each p.d. is its share R/total × supply.</li>",
      },
      {
        find: "<li>Parallel: 1/R = 1/R₁ + 1/R₂; same p.d.; current splits (inverse-R share).</li>",
        replace:
          "<li>Parallel: 1/R = 1/R₁ + 1/R₂; same p.d.; current splits (inverse-R share). <em>Key:</em> R = total resistance of the combination (Ω); R₁, R₂ = branch resistances (Ω); the total is always smaller than the smallest branch, because every extra path eases the flow.</li>",
      },
      {
        find: "<p>P = VI = I²R = V²/R; E = VIt. Fuse rating just above normal current; earth wire, double insulation, circuit breakers (trip quickly, resettable).</p>",
        replace:
          "<p>P = VI = I²R = V²/R; E = VIt. Fuse rating just above normal current; earth wire, double insulation, circuit breakers (trip quickly, resettable). <em>Key:</em> P = electrical power (W); V = potential difference (V); I = current (A); R = resistance (Ω); E = energy transferred (J); t = time the current flows (s) — the three forms of P are the same equation rearranged, so pick the one whose two quantities you know.</p>",
      },
    ],
  },
};