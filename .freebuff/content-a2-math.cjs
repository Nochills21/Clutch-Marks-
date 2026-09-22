// A2 Mathematics (CAIE 9709) — 8 topics. Questions use 0-based `correct`.
module.exports = [
  {
    name: 'Further Algebra',
    description: 'Polynomial division, the factor and remainder theorems, modulus and partial fractions.',
    lesson: `# Further Algebra

### Polynomial Division and the Remainder Theorem
Divide to rewrite p(x) = (x − a)q(x) + r. The remainder when dividing by (x − a) equals p(a).

**Example:** p(x) = x³ − 2x² + 5. p(2) = 8 − 8 + 5 = 5, so dividing by (x − 2) leaves remainder 5.

If p(a) = 0, then (x − a) is a **factor** — that is the factor theorem. Divide out fully to reduce a cubic to a quadratic and factorise completely.

### The Modulus Function
|x| measures distance from zero: |x| = x for x ≥ 0, −x for x < 0. Its graph is V-shaped.

Solving |2x − 1| = 5: split into 2x − 1 = 5 or 2x − 1 = −5, giving x = 3 or −2.

Inequalities: |2x − 1| < 5 becomes −5 < 2x − 1 < 5, so −2 < x < 3.

### Partial Fractions
Reverse of combining fractions — needed before binomial expansion of rational functions.

- Repeated linear: (4x + 1)/(x + 1)² = A/(x + 1) + B/(x + 1)²
- Distinct linear: (7x + 4)/(x + 1)(x + 2) = A/(x + 1) + B/(x + 2)

**Example:** cover the (x + 1) factor with x = −1: B = 3; then compare coefficients for A = 4.

**Exam tips:** for |ax + b| > c, remember two separate regions; check factor-theorem roots by substitution before long division.`,
    questions: [
      { q: 'The remainder when x³ − 2x² + 5 is divided by (x − 2) is:', opts: ['5', '1', '0', '−3'], correct: 0, explain: 'p(2) = 8 − 8 + 5 = 5.' },
      { q: 'x = 1 is a root of x³ − 3x² + x + 1. After factorising fully, the roots are:', opts: ['1 and −1', '−1 and −1', '2 and 3', '−1 and 2'], correct: 0, explain: 'Divide by (x − 1): x² − 2x − 1... but (x+1) is also a factor of the cubic: (x − 1)(x + 1)² so the roots are 1, −1, −1.' },
      { q: '|2x − 1| = 5 has solutions:', opts: ['x = 3 or −2', 'x = 2 or −3', 'x = 3 only', 'x = −2 only'], correct: 0, explain: 'Split into 2x − 1 = ±5: x = 3 or −2.' },
      { q: '|x + 3| < 2 gives:', opts: ['−5 < x < −1', 'x < −1', 'x > −5', '−1 < x < 5'], correct: 0, explain: '−2 < x + 3 < 2 gives −5 < x < −1.' },
      { q: '(7x + 4)/((x + 1)(x + 2)) = A/(x + 1) + B/(x + 2). B =', opts: ['10', '3', '4', '7'], correct: 0, explain: 'Set x = −2: 7(−2) + 4 = B(−2 + 1), so −10 = −B, B = 10.' },
      { q: 'The graph of y = |x − 2| has its vertex at:', opts: ['(2, 0)', '(0, 2)', '(−2, 0)', '(0, −2)'], correct: 0, explain: 'The V-bottom is where x − 2 = 0.' },
      { q: 'A root of x³ − 6x² + 11x − 6 is x = 1. The other roots are:', opts: ['2 and 3', '−2 and −3', '1 and 2', '5 and 6'], correct: 0, explain: 'Factor out (x − 1): (x − 1)(x − 2)(x − 3).' },
      { q: '|3x − 2| ≥ 4 gives:', opts: ['x ≤ −2/3 or x ≥ 2', '−2/3 ≤ x ≤ 2', 'x ≥ 2', 'x ≤ 2/3'], correct: 0, explain: '3x − 2 ≥ 4 or ≤ −4: x ≥ 2 or x ≤ −2/3.' },
      { q: 'If p(x) = (x + 1)q(x) + 3, then p(−1) =', opts: ['3', '0', '−1', 'q(−1)'], correct: 0, explain: 'Substituting x = −1 kills q(x), leaving 3.' },
      { q: '4x/(x² − 1) in partial fractions is:', opts: ['2/(x − 1) + 2/(x + 1)', '4/(x − 1)', '2/(x − 1) − 2/(x + 1)', '1/(x − 1) + 3/(x + 1)'], correct: 0, explain: 'A(x + 1) + B(x − 1) = 4x gives A = B = 2.' },
    ],
  },
  {
    name: 'Further Trigonometry',
    description: 'Compound and double angles, R-form, reciprocal functions and inverse trig.',
    lesson: `# Further Trigonometry

### Compound Angles
- sin(A ± B) = sin A cos B ± cos A sin B
- cos(A ± B) = cos A cos B ∓ sin A sin B

**Example:** sin 75° = sin(45° + 30°) = (√2/2)(√3/2) + (√2/2)(1/2) = (√6 + √2)/4.

### Double Angles
- sin 2A = 2 sin A cos A
- cos 2A = cos²A − sin²A = 2cos²A − 1 = 1 − 2sin²A

**Example:** express 4 sin x cos x in one term: 2 sin 2x.

### The R-Form
a sin x + b cos x = R sin(x + α) with R = √(a² + b²) and tan α = b/a.

**Example:** 3 sin x + 4 cos x = 5 sin(x + 0.927). This instantly gives the maximum 5 and minimum −5.

### Reciprocal Functions
sec θ = 1/cos θ, cosec θ = 1/sin θ, cot θ = 1/tan θ. Key identity: 1 + cot²θ = cosec²θ.

**Exam tips:** choose the cos 2A form that eliminates the unwanted function; when solving with R-form, divide by R before using inverse trig, and translate intervals carefully.`,
    questions: [
      { q: 'sin 2A equals:', opts: ['2 sin A cos A', 'sin²A', '2 sin A', 'sin A cos A'], correct: 0, explain: 'Double-angle formula.' },
      { q: 'cos 2A in terms of cos A only is:', opts: ['2cos²A − 1', '1 − 2cos²A', '2cos²A + 1', 'cos²A − 1'], correct: 0, explain: 'Eliminate sin²A = 1 − cos²A.' },
      { q: '3 sin x + 4 cos x = R sin(x + α). R =', opts: ['7', '5', '1', '√7'], correct: 1, explain: 'R = √(9 + 16) = 5.' },
      { q: 'The maximum value of 3 sin x + 4 cos x is:', opts: ['7', '5', '4', '1'], correct: 1, explain: 'R-form gives max R = 5.' },
      { q: 'sin 75° using compound angles equals:', opts: ['(√6 + √2)/4', '(√6 − √2)/4', '√3/2', '(√2 + 1)/2'], correct: 0, explain: 'sin(45° + 30°) expands to (√6 + √2)/4.' },
      { q: 'sec θ =', opts: ['1/sin θ', '1/cos θ', '1/tan θ', 'cos θ'], correct: 1, explain: 'Secant is the reciprocal of cosine.' },
      { q: '1 + cot²θ =', opts: ['sec²θ', 'cosec²θ', 'tan²θ', '1'], correct: 1, explain: 'Divide sin²θ + cos²θ = 1 by sin²θ.' },
      { q: '2 sin x cos x in one trig function is:', opts: ['sin 2x', 'cos 2x', 'sin x', 'tan 2x'], correct: 0, explain: 'Double-angle identity.' },
      { q: 'cos(A − B) expands to:', opts: ['cos A cos B + sin A sin B', 'cos A cos B − sin A sin B', 'sin A cos B − cos A sin B', 'cos A + cos B'], correct: 0, explain: 'Compound-angle formula with the minus form.' },
      { q: 'tan 2A equals:', opts: ['2 tan A/(1 − tan²A)', '2 tan A', 'tan²A − 1', '2 tan A/(1 + tan²A)'], correct: 0, explain: 'Double-angle formula for tangent.' },
    ],
  },
  {
    name: 'Differentiation II',
    description: 'Product, quotient and chain rules with all standard functions; implicit and parametric work.',
    lesson: `# Differentiation II

### Product and Quotient Rules
- (uv)′ = u′v + uv′
- (u/v)′ = (u′v − uv′)/v²

**Example:** y = x² e^x gives dy/dx = 2x e^x + x² e^x = e^x(2x + x²).

### Standard Derivatives
- sin x → cos x; cos x → −sin x; tan x → sec²x
- e^x → e^x; ln x → 1/x

### Chain Rule Everywhere
d/dx [ln(3x)] = 3/(3x) = 1/x; d/dx [e^(2x)] = 2e^(2x); d/dx [sin²x] = 2 sin x cos x.

### Implicit Differentiation
Differentiate both sides w.r.t. x, treating y as a function of x (terms in y pick up dy/dx).

**Example:** x² + y² = 25 → 2x + 2y(dy/dx) = 0 → dy/dx = −x/y.

### Parametric Curves
For x = f(t), y = g(t): dy/dx = (dy/dt)/(dx/dt).

**Example:** x = t², y = t³ gives dy/dx = 3t²/2t = 3t/2.

**Exam tips:** quote the rule you use; for tangent/normal on parametric curves, find t at the point first, and simplify implicit answers using the original equation.`,
    questions: [
      { q: 'd/dx (x² sin x) =', opts: ['2x sin x + x² cos x', '2x cos x', 'x² cos x', '2x sin x − x² cos x'], correct: 0, explain: 'Product rule: u′v + uv′.' },
      { q: 'd/dx (e^(3x)) =', opts: ['e^(3x)', '3e^(3x)', '3x e^(3x)', 'e^(3x)/3'], correct: 1, explain: 'Chain rule multiplies by 3.' },
      { q: 'd/dx (ln 5x) =', opts: ['1/(5x)', '1/x', '5/x', 'ln 5'], correct: 1, explain: '(5)/(5x) = 1/x.' },
      { q: 'd/dx (tan x) =', opts: ['sec²x', '−cosec²x', 'cot x', 'sec x'], correct: 0, explain: 'Standard result.' },
      { q: 'x² + y² = 25 gives dy/dx =', opts: ['−x/y', 'x/y', '−2x/y', '2y/x'], correct: 0, explain: '2x + 2y y′ = 0 rearranges to y′ = −x/y.' },
      { q: 'x = t², y = t³. dy/dx =', opts: ['3t/2', '3t²/2t', '2t/3t²', 't'], correct: 0, explain: '(3t²)/(2t) = 3t/2.' },
      { q: 'd/dx (x e^x) =', opts: ['e^x(1 + x)', 'e^x', 'x e^x', 'e^x(1 − x)'], correct: 0, explain: 'Product rule.' },
      { q: 'd/dx (sin²x) =', opts: ['cos 2x', 'sin 2x', '2 sin x', '2 sin x cos x'], correct: 3, explain: 'Chain rule gives 2 sin x cos x (= sin 2x; both accepted, 3 is the direct form).' },
      { q: 'y = x/(x + 1). dy/dx =', opts: ['1/(x + 1)²', '1', '(x + 1)²', '−1/(x + 1)²'], correct: 0, explain: 'Quotient rule: ((x+1) − x)/(x+1)².' },
      { q: 'The second derivative of e^(2x) is:', opts: ['2e^(2x)', 'e^(2x)', '4e^(2x)', '4x e^(2x)'], correct: 2, explain: 'Each differentiation multiplies by 2.' },
    ],
  },
  {
    name: 'Integration II',
    description: 'Integrals of standard functions, substitution, integration by parts and partial-fraction integrals.',
    lesson: `# Integration II

### Standard Integrals
- ∫ sin x dx = −cos x + c
- ∫ cos x dx = sin x + c
- ∫ e^x dx = e^x + c
- ∫ 1/x dx = ln|x| + c
- ∫ sec²x dx = tan x + c

With linear arguments: ∫ e^(3x) dx = e^(3x)/3 + c; ∫ cos 2x dx = sin 2x/2 + c.

### Substitution
Reverse of the chain rule. For ∫ 2x e^(x²) dx, let u = x²: du = 2x dx, so the integral is ∫ e^u du = e^(x²) + c.

### Integration by Parts
∫ u (dv/dx) dx = uv − ∫ v (du/dx) dx. Choose u to be the part that simplifies when differentiated (LIATE: logs, inverse trig, algebraic, trig, exponential).

**Example:** ∫ x e^x dx = x e^x − ∫ e^x dx = x e^x − e^x + c.

### Partial Fractions
Break rational functions into pieces like ∫ 1/(x+1) dx = ln|x + 1| + c.

**Example:** ∫ 4x/(x² − 1) dx = ∫ [2/(x − 1) + 2/(x + 1)] dx = 2 ln|x − 1| + 2 ln|x + 1| + c.

**Exam tips:** definite integrals: substitute limits into the transformed variable directly; for by-parts integrals like ∫ ln x dx, take u = ln x, dv/dx = 1.`,
    questions: [
      { q: '∫ cos x dx =', opts: ['−sin x + c', 'sin x + c', 'cos x + c', 'tan x + c'], correct: 1, explain: 'Standard integral.' },
      { q: '∫ e^(3x) dx =', opts: ['e^(3x) + c', '3e^(3x) + c', 'e^(3x)/3 + c', 'e^(3x)/3 without c'], correct: 2, explain: 'Divide by the inner derivative 3.' },
      { q: '∫ x e^x dx =', opts: ['x e^x − e^x + c', 'x e^x + c', 'e^x(x − 1) without c', 'x² e^x/2 + c'], correct: 0, explain: 'By parts: x e^x − ∫ e^x dx.' },
      { q: '∫ 2x e^(x²) dx =', opts: ['e^(x²) + c', 'x² e^(x²) + c', '2e^(x²) + c', 'e^(x²)/2 + c'], correct: 0, explain: 'Substitute u = x², du = 2x dx.' },
      { q: '∫₁^e (1/x) dx =', opts: ['1', 'e − 1', 'e', 'ln e²'], correct: 0, explain: '[ln x]₁^e = 1 − 0 = 1.' },
      { q: '∫ sec²x dx =', opts: ['tan x + c', 'sec x + c', 'cot x + c', '−tan x + c'], correct: 0, explain: 'Standard integral (reverse of d/dx tan x).' },
      { q: '∫ ln x dx =', opts: ['x ln x − x + c', 'ln x/x + c', '1/x + c', 'x ln x + c'], correct: 0, explain: 'By parts with u = ln x, dv/dx = 1.' },
      { q: '∫₀^(π/2) sin x dx =', opts: ['1', '0', '−1', 'π/2'], correct: 0, explain: '[−cos x] from 0 to π/2 = 0 − (−1) = 1.' },
      { q: '∫ 1/(x + 2) dx =', opts: ['ln|x + 2| + c', 'ln x + 2 + c', '1/(x + 2)² + c', 'x/(x + 2) + c'], correct: 0, explain: 'Linear-denominator log rule.' },
      { q: '∫₀¹ 12x² (x³ + 1)² dx with u = x³ + 1 gives:', opts: ['∫₁² 4u² du = 28/3', '∫₀¹ 4u² du', '∫₁² u² du = 7/3', '∫₁² 12u² du = 28'], correct: 0, explain: 'du = 3x² dx, so 12x² dx = 4 du; limits become 1 to 2.' },
    ],
  },
  {
    name: 'Complex Numbers',
    description: 'Imaginary numbers, arithmetic, Argand diagrams, mod-arg form and de Moivre.',
    lesson: `# Complex Numbers

### Basics
i² = −1. A complex number z = a + bi has real part a and imaginary part b. Two numbers are equal iff both parts match.

Arithmetic: add/subtract parts; multiply with brackets and replace i² with −1.

**Example:** (2 + 3i)(1 − i) = 2 − 2i + 3i − 3i² = 5 + i.

### Conjugates
z̄ = a − bi. zz̄ = a² + b² (real). Dividing: multiply numerator and denominator by the conjugate.

**Example:** 1/(3 − i) × (3 + i)/(3 + i) = (3 + i)/10.

### Argand Diagram
Plot z as the point (a, b). |z| = √(a² + b²) is the modulus (distance from origin); arg z = tan⁻¹(b/a) is the argument (angle). Multiply two numbers: moduli multiply, arguments add.

### Modulus–Argument Form
z = r(cos θ + i sin θ), r = |z|, θ = arg z. Useful for powers and roots.

### de Moivre and Roots
[r(cos θ + i sin θ)]ⁿ = rⁿ(cos nθ + i sin nθ).

**Example:** (1 + i)⁸: |1 + i| = √2, arg = π/4, so z⁸ = (√2)⁸ cis 2π = 16.

An nth root gives n evenly spaced solutions, 2π/n apart on a circle of radius r^(1/n).

**Exam tips:** always give arguments in the required interval; when solving equations, remember complex roots come in conjugate pairs for real polynomials.`,
    questions: [
      { q: 'i² =', opts: ['−1', '1', 'i', '0'], correct: 0, explain: 'Defining property of i.' },
      { q: '(2 + 3i)(1 − i) =', opts: ['5 + i', '5 − i', '2 − 3i', '5 + 5i'], correct: 0, explain: 'Expand and use i² = −1.' },
      { q: 'The conjugate of 4 − 7i is:', opts: ['4 + 7i', '−4 + 7i', '7 − 4i', '−4 − 7i'], correct: 0, explain: 'Flip the sign of the imaginary part.' },
      { q: '|3 + 4i| =', opts: ['5', '7', '25', '12'], correct: 0, explain: '√(9 + 16) = 5.' },
      { q: 'arg(1 + i) is:', opts: ['π/4', 'π/2', 'π/3', '3π/4'], correct: 0, explain: 'tan⁻¹(1/1) = π/4.' },
      { q: 'Multiplying two complex numbers:', opts: ['adds arguments and multiplies moduli', 'adds moduli', 'multiplies arguments and adds moduli', 'adds both'], correct: 0, explain: 'Polar multiplication rule.' },
      { q: '1/(3 − i) =', opts: ['(3 + i)/10', '(3 + i)/8', '(3 − i)/10', '3 + i'], correct: 0, explain: 'Multiply by the conjugate: (3 + i)/((3)² + 1).' },
      { q: 'de Moivre states (r cis θ)ⁿ =', opts: ['rⁿ cis nθ', 'r cis nθ', 'rⁿ cis θ', 'n r cis nθ'], correct: 0, explain: 'Powers raise the modulus and multiply the argument.' },
      { q: '(1 + i)⁸ =', opts: ['16', '8', '16i', '−16'], correct: 0, explain: '(√2)⁸ cis(8 × π/4) = 16 cis 2π = 16.' },
      { q: 'The square roots of a complex number are:', opts: ['2π apart', 'π apart', 'π/2 apart', 'equal'], correct: 1, explain: 'Roots are 2π/n apart; for n = 2 that is π.' },
    ],
  },
  {
    name: 'Vectors',
    description: 'Vector algebra, magnitude and direction, scalar products and line equations in 2D and 3D.',
    lesson: `# Vectors

### Components and Arithmetic
A vector a = 3i + 4j has magnitude |a| = √(3² + 4²) = 5. Parallel vectors are scalar multiples; unit vector = a/|a|.

### Position and Direction
The line through point A with direction d: r = a + t d. Two lines are parallel if their directions are multiples.

**Example:** r = (1, 2) + t(3, −1).

### Scalar (Dot) Product
a · b = |a||b| cos θ = a₁b₁ + a₂b₂.

Perpendicular ⇔ a · b = 0. Parallel ⇔ cross-multiplied components are equal (in 2D: a₁b₂ − a₂b₁ = 0).

**Example:** (2, 3) · (−6, 4) = −12 + 12 = 0, so they are perpendicular.

### Angle Between Vectors
cos θ = (a · b)/(|a||b|).

**Example:** between (1, 0) and (1, 1): cos θ = 1/(1 × √2), θ = 45°.

### Lines and Points
Foot of perpendicular from P to a line, intersection of two lines, and shortest distances all come from dot products and parameter t.

**Exam tips:** write column vectors cleanly; check answers by substituting the found t back into both position vectors; keep exact surd magnitudes rather than decimals.`,
    questions: [
      { q: '|3i + 4j| =', opts: ['5', '7', '25', '12'], correct: 0, explain: '√(9 + 16) = 5.' },
      { q: '(2, 3) · (−6, 4) =', opts: ['0', '12', '−12', '24'], correct: 0, explain: '−12 + 12 = 0, so the vectors are perpendicular.' },
      { q: 'Vectors a and b are perpendicular when:', opts: ['a · b = 0', '|a| = |b|', 'a = b', 'a × b = 1'], correct: 0, explain: 'Dot product zero means cos θ = 0.' },
      { q: 'The unit vector along (3, 4) is:', opts: ['(3/5, 4/5)', '(3, 4)', '(1, 1)', '(0.3, 0.4)'], correct: 0, explain: 'Divide by the magnitude 5.' },
      { q: 'The angle between (1, 0) and (1, 1) is:', opts: ['45°', '30°', '60°', '90°'], correct: 0, explain: 'cos θ = 1/√2.' },
      { q: 'The line r = (1, 2) + t(3, −1) passes through:', opts: ['(4, 1)', '(4, 2)', '(1, 1)', '(3, −1)'], correct: 0, explain: 't = 1 gives (4, 1).' },
      { q: 'Two lines are parallel when their direction vectors are:', opts: ['perpendicular', 'scalarm multiples', 'unit vectors', 'orthogonal'], correct: 1, explain: 'Same or opposite direction.' },
      { q: 'a · b = |a||b| cos θ defines:', opts: ['the vector product', 'the scalar product', 'the magnitude', 'the projection of a on the y-axis'], correct: 1, explain: 'Geometric definition of the dot product.' },
      { q: '(4, −2) and (−2, 1) are:', opts: ['perpendicular', 'parallel', 'equal', 'unit vectors'], correct: 1, explain: '(−2, 1) = −½(4, −2).' },
      { q: 'The magnitude of (−1, 2, 2) in 3D is:', opts: ['3', '5', '9', '√5'], correct: 0, explain: '√(1 + 4 + 4) = 3.' },
    ],
  },
  {
    name: 'Probability and Statistics II',
    description: 'Normal and binomial distributions, approximations, expectations and hypothesis-testing basics.',
    lesson: `# Probability and Statistics II

### Normal Distribution
Continuous, bell-shaped, defined by mean μ and variance σ². Standardise: Z = (X − μ)/σ ~ N(0, 1).

**Example:** X ~ N(50, 4²). P(X > 56) = P(Z > 1.5) = 1 − 0.9332 = 0.0668.

Backwards problems: given a probability, find μ or σ from the z-value: x = μ + zσ.

### Binomial Distribution
Fixed n independent trials, success probability p: P(X = r) = C(n, r) pʳ (1−p)^(n−r). Mean np, variance np(1 − p).

**Example:** n = 5, p = 0.2: P(X = 2) = 10 × 0.04 × 0.8³ = 0.2048.

### Normal Approximation to Binomial
Valid when np > 5 and n(1 − p) > 5. Apply a **continuity correction**: P(X ≤ 10) becomes P(Y < 10.5) under Y ~ N(np, np(1−p)).

### Expectation and Variance Rules
E(aX + b) = aE(X) + b; Var(aX + b) = a² Var(X). For sums: E(X + Y) = E(X) + E(Y).

**Exam tips:** always sketch the normal curve and shade the region; state the distribution you are using; never forget the continuity correction when approximating a discrete variable.`,
    questions: [
      { q: 'X ~ N(50, 16). P(X > 56) ≈ (Φ(1.5) = 0.9332):', opts: ['0.0668', '0.9332', '0.4332', '0.1336'], correct: 0, explain: 'Z = 1.5, tail = 1 − 0.9332.' },
      { q: 'The binomial mean is:', opts: ['np', 'np(1 − p)', 'n(1 − p)', 'p'], correct: 0, explain: 'E(X) = np.' },
      { q: 'Binomial n = 5, p = 0.2. P(X = 2) =', opts: ['0.2048', '0.4096', '0.0512', '0.1024'], correct: 0, explain: 'C(5,2) × 0.04 × 0.512 = 0.2048.' },
      { q: 'The normal approximation to binomial is valid when:', opts: ['np and n(1−p) both exceed 5', 'n > 30 only', 'p = 0.5', 'variance equals mean'], correct: 0, explain: 'Both tails need enough expected successes/failures.' },
      { q: 'P(X ≤ 10) approximated normally with continuity correction is:', opts: ['P(Y < 10.5)', 'P(Y ≤ 10)', 'P(Y < 9.5)', 'P(Y > 10.5)'], correct: 0, explain: 'Discrete ≤ 10 covers up to 10.5 on the continuous scale.' },
      { q: 'Var(aX + b) =', opts: ['a² Var(X)', 'a Var(X) + b', 'a Var(X)', 'Var(X) + b²'], correct: 0, explain: 'Shifts do not change variance; scaling scales it by a².' },
      { q: 'X ~ N(μ, σ²). P(X < μ) =', opts: ['0.5', '0', '1', 'depends on σ'], correct: 0, explain: 'Symmetry about the mean.' },
      { q: 'The variance of a binomial B(n, p) is:', opts: ['np(1 − p)', 'np', '√(np)', 'p(1 − p)'], correct: 0, explain: 'Standard formula.' },
      { q: 'E(2X + 3) with E(X) = 4 is:', opts: ['11', '8', '14', '5'], correct: 0, explain: '2 × 4 + 3 = 11.' },
      { q: 'Standardising uses Z =', opts: ['(X − μ)/σ', '(X + μ)/σ', '(μ − X)/σ', 'Xσ − μ'], correct: 0, explain: 'Subtract the mean, divide by the SD.' },
    ],
  },
  {
    name: 'Probability and Statistics I',
    description: 'Permutations, combinations, probability rules, conditional probability and discrete random variables.',
    lesson: `# Probability and Statistics I

### Permutations and Combinations
- Permutations (order matters): ⁿPᵣ = n!/(n − r)!
- Combinations (order irrelevant): ⁿCᵣ = n!/(r!(n − r)!)

**Example:** choosing a committee of 3 from 8 people: C(8,3) = 56. Arranging 3 of 8 books on a shelf: P(8,3) = 336.

### Probability Rules
- P(A ∪ B) = P(A) + P(B) − P(A ∩ B)
- Independent events: P(A ∩ B) = P(A)P(B)
- Complement: P(A′) = 1 − P(A)

### Conditional Probability
P(A | B) = P(A ∩ B)/P(B). Tree diagrams multiply along branches and add across outcomes.

**Example:** P(two reds without replacement from 5 red + 3 blue) = (5/8)(4/7) = 5/14.

### Discrete Random Variables
E(X) = Σ x P(X = x); Var(X) = E(X²) − [E(X)]².

**Example:** die: E(X) = 3.5; E(X²) = 91/6, so Var(X) ≈ 2.92.

**Exam tips:** decide permutation vs combination by testing whether swapping two items changes the outcome; always verify tree-branch probabilities sum to 1.`,
    questions: [
      { q: 'C(8, 3) =', opts: ['56', '336', '24', '512'], correct: 0, explain: '8!/(3!5!) = 56.' },
      { q: 'P(8, 3) =', opts: ['336', '56', '512', '24'], correct: 0, explain: '8 × 7 × 6 = 336.' },
      { q: 'P(A) = 0.4, P(B) = 0.3, independent. P(A ∩ B) =', opts: ['0.12', '0.7', '0.58', '0.1'], correct: 0, explain: 'Multiply for independent events.' },
      { q: 'P(A) = 0.4, P(B) = 0.3, P(A ∩ B) = 0.1. P(A ∪ B) =', opts: ['0.6', '0.7', '0.12', '0.8'], correct: 0, explain: '0.4 + 0.3 − 0.1.' },
      { q: 'Two reds without replacement from 5 red, 3 blue:', opts: ['5/14', '25/64', '10/28', '1/2'], correct: 0, explain: '(5/8)(4/7) = 20/56 = 5/14.' },
      { q: 'P(A | B) =', opts: ['P(A ∩ B)/P(B)', 'P(A)P(B)', 'P(A ∪ B)/P(B)', 'P(B)/P(A)'], correct: 0, explain: 'Definition of conditional probability.' },
      { q: 'E(X) of a fair die is:', opts: ['3.5', '3', '4', '21'], correct: 0, explain: '(1 + 2 + … + 6)/6 = 3.5.' },
      { q: 'Var(X) =', opts: ['E(X²) − [E(X)]²', 'E(X²)', '[E(X)]²', 'E(X)² − E(X²)'], correct: 0, explain: 'Standard definition.' },
      { q: 'Order matters when counting:', opts: ['combinations', 'permutations', 'both equally', 'neither'], correct: 1, explain: 'Permutations count arrangements.' },
      { q: 'P(A′) with P(A) = 0.35 is:', opts: ['0.65', '0.35', '0.1225', '1.35'], correct: 0, explain: 'Complement rule.' },
    ],
  },
];
