// AS Mathematics (CAIE 9709) — 8 topics. Questions use 0-based `correct`.
module.exports = [
  {
    name: 'Quadratics',
    description: 'Completing the square, the discriminant, quadratic inequalities and curve-line intersections.',
    lesson: `# Quadratics

A quadratic has the form ax² + bx + c with a ≠ 0. Master three tools: completing the square, the discriminant, and inequalities.

### Completing the Square
Rewrite x² + bx + c as (x + b/2)² − (b/2)² + c.

**Example:** x² + 6x + 5 = (x + 3)² − 9 + 5 = (x + 3)² − 4, so the vertex is at (−3, −4).

For a > 1, factor out a first: 2x² + 12x + 19 = 2(x² + 6x) + 19 = 2(x + 3)² − 18 + 19 = 2(x + 3)² + 1.

Vertex form a(x − h)² + k gives the minimum/maximum value k at x = h — this is how you find a maximum area or minimum cost.

### The Discriminant
Δ = b² − 4ac decides how the curve meets the x-axis:

| Δ | Roots | Graph |
|---|-------|-------|
| Δ > 0 | two distinct real roots | crosses x-axis twice |
| Δ = 0 | repeated root | touches (tangent) |
| Δ < 0 | no real roots | never meets x-axis |

**Example:** kx² + 4x + 1 = 0 has equal roots when 16 − 4k = 0, so k = 4.

### Quadratic Inequalities
Solve by sketching. For x² − 5x + 4 < 0, factorise: (x − 1)(x − 4) < 0, and the curve is below the axis between the roots, so 1 < x < 4.

**Tip:** flip the inequality when dividing by a negative number, and always sketch to check which interval you need.

### Curve and Line Intersections
Set the equations equal; the resulting quadratic's discriminant tells you if the line is a secant (Δ > 0), tangent (Δ = 0) or misses (Δ < 0).

**Exam tips:** complete the square before reading off turning points; state the discriminant condition explicitly before solving for an unknown coefficient.`,
    questions: [
      { q: 'The vertex of y = x² − 8x + 11 is at:', opts: ['(−4, −5)', '(4, 5)', '(4, −5)', '(−4, 5)'], correct: 2, explain: 'x² − 8x + 11 = (x − 4)² − 5, so the vertex is (4, −5).' },
      { q: 'The discriminant of 2x² − 3x + 5 is:', opts: ['-31', '49', '-49', '31'], correct: 0, explain: 'Δ = (−3)² − 4(2)(5) = 9 − 40 = −31.' },
      { q: 'x² + kx + 9 = 0 has equal roots when:', opts: ['k = 6 only', 'k = ±6', 'k = ±3', 'k = 36'], correct: 1, explain: 'Δ = k² − 36 = 0 gives k = ±6.' },
      { q: 'The solution of x² − 5x + 4 < 0 is:', opts: ['x < 1 or x > 4', '1 < x < 4', 'x < 4', 'x > 1'], correct: 1, explain: '(x − 1)(x − 4) < 0 holds between the roots: 1 < x < 4.' },
      { q: 'y = x² + 4x + c touches the x-axis when c =', opts: ['c = 4', 'c = −4', 'c = 16', 'c = 2'], correct: 0, explain: 'Δ = 16 − 4c = 0 gives c = 4.' },
      { q: 'The roots of 2x² − 7x + 3 = 0 are:', opts: ['x = 3 or 1/2', 'x = −3 or −1/2', 'x = 3 or 1', 'x = 1.5 or 2'], correct: 0, explain: 'Factorising: (2x − 1)(x − 3) = 0, so x = 1/2 or 3.' },
      { q: 'The range of f(x) = x² − 6x + 10 is:', opts: ['f(x) ≥ 10', 'all real numbers', 'f(x) ≥ 1', 'f(x) > 3'], correct: 2, explain: '(x − 3)² + 1 has minimum 1, so f(x) ≥ 1.' },
      { q: '2x² + 12x + 19 written as a(x + p)² + q is:', opts: ['2(x + 3)² + 1', '2(x + 3)² − 1', '2(x − 3)² + 1', '(x + 3)² + 2'], correct: 0, explain: '2(x² + 6x) + 19 = 2(x + 3)² − 18 + 19 = 2(x + 3)² + 1.' },
      { q: 'y = 2x + c is a tangent to y = x² + 4x + 5 when c =', opts: ['c = 2', 'c = 5', 'c = −4', 'c = 4'], correct: 3, explain: 'x² + 2x + (5 − c) = 0 needs Δ = 4 − 4(5 − c) = 0, so c = 4.' },
      { q: 'The sum of the roots of 3x² − 9x + 2 = 0 is:', opts: ['−3', '3', '9', '2/3'], correct: 1, explain: 'Sum of roots = −b/a = 9/3 = 3.' },
    ],
  },
  {
    name: 'Functions',
    description: 'Domain and range, composite and inverse functions, and graph transformations.',
    lesson: `# Functions

A function maps each input in the **domain** to exactly one output in the **range**.

### Composite Functions
fg(x) means f(g(x)) — apply g first, then f. Order matters.

**Example:** f(x) = 2x + 1, g(x) = x². Then fg(x) = 2x² + 1 but gf(x) = (2x + 1)².

### Inverse Functions
f⁻¹ reverses f: f⁻¹f(x) = x. To find it, swap x and y in y = f(x) and rearrange.

**Example:** f(x) = 3x − 2 gives f⁻¹(x) = (x + 2)/3.

An inverse exists only if f is **one-one**. If not, restrict the domain (e.g. f(x) = x² for x ≥ 0 has f⁻¹(x) = √x). Graphically, y = f⁻¹(x) is the reflection of y = f(x) in the line y = x, and the range of f becomes the domain of f⁻¹.

### Transformations
| Notation | Effect on y = f(x) |
|---|---|
| f(x) + a | translation up by a |
| f(x + a) | translation left by a |
| a f(x) | vertical stretch, factor a |
| f(ax) | horizontal stretch, factor 1/a |
| −f(x) | reflection in the x-axis |
| f(−x) | reflection in the y-axis |

**Exam tips:** state the domain of any inverse; when combining transformations, translations inside the bracket act in the opposite direction to the sign.`,
    questions: [
      { q: 'f(x) = 2x + 3 and g(x) = x − 1. fg(x) =', opts: ['2x − 1', '2x + 1', '2x + 5', '2x − 2'], correct: 1, explain: 'fg(x) = 2(x − 1) + 3 = 2x + 1.' },
      { q: 'With the same f and g, gf(x) =', opts: ['2x + 2', '2x + 1', '2x − 2', '2x'], correct: 0, explain: 'gf(x) = (2x + 3) − 1 = 2x + 2.' },
      { q: 'The inverse of f(x) = 5x − 4 is:', opts: ['(x + 4)/5', '(x − 4)/5', '5x + 4', '1/(5x − 4)'], correct: 0, explain: 'Swap and solve: x = 5y − 4 gives y = (x + 4)/5.' },
      { q: 'f(x) = x² for x ≥ 0 has inverse with domain:', opts: ['x ≥ 0', 'x > 0', 'all real numbers', 'x ≤ 0'], correct: 0, explain: 'The range of f is y ≥ 0, which becomes the domain of f⁻¹.' },
      { q: 'y = f(x − 2) transforms the graph by:', opts: ['a shift 2 left', 'a shift 2 up', 'a shift 2 right', 'a shift 2 down'], correct: 2, explain: 'Replacing x with x − 2 shifts the graph 2 units right.' },
      { q: 'y = 3f(x) applies:', opts: ['a shift up 3', 'a horizontal stretch factor 1/3', 'a vertical stretch factor 3', 'a reflection in the x-axis'], correct: 2, explain: 'Multiplying outputs stretches the graph vertically by factor 3.' },
      { q: 'y = f(−x) reflects the graph in the:', opts: ['x-axis', 'y-axis', 'line y = x', 'origin'], correct: 1, explain: 'Negating the input reflects in the y-axis.' },
      { q: 'Which function is one-one over all real x (so has an inverse)?', opts: ['f(x) = x²', 'f(x) = 2x + 1', 'f(x) = |x|', 'f(x) = x² + 3'], correct: 1, explain: 'A non-horizontal linear function is one-one; the others fail the horizontal line test.' },
      { q: 'f(x) = x², g(x) = x + 3. fg(2) =', opts: ['5', '10', '25', '13'], correct: 2, explain: 'g(2) = 5, then f(5) = 25.' },
      { q: 'The domain of f(x) = 1/(x − 2) is:', opts: ['x ≠ 2', 'x > 2', 'x < 2', 'all real numbers'], correct: 0, explain: 'Division by zero is undefined at x = 2.' },
    ],
  },
  {
    name: 'Coordinate Geometry',
    description: 'Gradients, parallel and perpendicular lines, midpoints, distances and intersections.',
    lesson: `# Coordinate Geometry

### Gradients and Equations of Lines
Gradient m = (y₂ − y₁)/(x₂ − x₁). From ax + by + c = 0, the gradient is −a/b.

Point-slope form: y − y₁ = m(x − x₁).

**Example:** through (4, 3) with m = −1/2: y − 3 = −(x − 4)/2, i.e. y = −x/2 + 5.

### Parallel and Perpendicular
- Parallel lines: equal gradients.
- Perpendicular lines: m₁m₂ = −1 (gradients are negative reciprocals).

**Example:** perpendicular to y = 2x + 1 has gradient −1/2.

### Midpoint and Distance
Midpoint of (x₁, y₁), (x₂, y₂): ((x₁+x₂)/2, (y₁+y₂)/2).

Distance: √((x₂−x₁)² + (y₂−y₁)²). The line from (0,0) to (3,4) has length 5 — recognise 3-4-5 triangles.

### Intersections and Bisectors
Intersections: solve the equations simultaneously. The perpendicular bisector of AB passes through the midpoint of AB with gradient −1/m(AB) — equate distances PA = PB for the locus method.

**Exam tips:** rationalise gradients as fractions; check perpendicularity by multiplying gradients to get −1.`,
    questions: [
      { q: 'The gradient of 3x + 4y = 12 is:', opts: ['−3/4', '3/4', '−4/3', '4/3'], correct: 0, explain: 'Rearranging: y = 3 − (3/4)x, gradient −3/4.' },
      { q: 'The line through (1, 2) and (5, 10) is:', opts: ['y = 2x', 'y = 2x + 1', 'y = 8x', 'y = x + 1'], correct: 0, explain: 'm = 8/4 = 2; y = 2x passes through both points.' },
      { q: 'A line perpendicular to y = 3x − 2 has gradient:', opts: ['3', '−3', '1/3', '−1/3'], correct: 3, explain: 'Perpendicular gradient = −1/3.' },
      { q: 'The midpoint of (2, −3) and (6, 5) is:', opts: ['(4, 1)', '(8, 2)', '(4, −1)', '(2, 4)'], correct: 0, explain: 'Averages: ((2+6)/2, (−3+5)/2) = (4, 1).' },
      { q: 'The distance between (0, 0) and (3, 4) is:', opts: ['7', '25', '5', '4'], correct: 2, explain: '√(9 + 16) = √25 = 5.' },
      { q: 'Parallel lines always have:', opts: ['gradients multiplying to −1', 'equal gradients', 'equal y-intercepts', 'gradients summing to 1'], correct: 1, explain: 'Parallel means the same gradient.' },
      { q: 'The y-intercept of 2x − 5y = 20 is:', opts: ['10', '−4', '4', '20'], correct: 1, explain: 'Set x = 0: −5y = 20, y = −4.' },
      { q: 'The perpendicular bisector of A(0,0), B(4,2) is:', opts: ['y = −2x + 5', 'y = 2x − 5', 'y = −2x − 5', 'y = 2x + 5'], correct: 0, explain: 'Midpoint (2,1), AB has gradient 1/2, so the bisector is y − 1 = −2(x − 2).' },
      { q: 'The lines y = 2x + 1 and y = 2x − 3 are:', opts: ['intersecting once', 'parallel', 'perpendicular', 'the same line'], correct: 1, explain: 'Same gradient 2, different intercepts — parallel.' },
      { q: 'The point on the y-axis equidistant from A(1, 2) and B(5, 4) is:', opts: ['(0, −9)', '(0, 9)', '(0, 5)', '(9, 0)'], correct: 1, explain: 'Solve 1 + (y−2)² = 25 + (y−4)²: 4y = 36, y = 9.' },
    ],
  },
  {
    name: 'Circular Measure',
    description: 'Radians, arc length, sector area and segment area.',
    lesson: `# Circular Measure

### Radians
One radian is the angle subtending an arc equal in length to the radius. π radians = 180°.

- Degrees → radians: multiply by π/180.
- Radians → degrees: multiply by 180/π.

Common angles: 30° = π/6, 45° = π/4, 60° = π/3, 90° = π/2, 180° = π, 360° = 2π.

### Arc Length
s = rθ (θ in radians).

**Example:** r = 6, θ = π/3 gives s = 2π.

### Sector Area
A = ½r²θ.

**Example:** r = 5, θ = 1.2 gives A = ½ × 25 × 1.2 = 15.

### Segment Area
A = ½r²(θ − sin θ). For r = 2, θ = π/2: A = 2(π/2 − 1) = π − 2.

### Rearranging
- θ = s/r (must be radians)
- θ = 2A/r²

**Exam tips:** never mix degrees into s = rθ; convert first. Sketch the sector and mark r and θ before computing, and check whether a question asks for the major or minor sector.`,
    questions: [
      { q: '150° in radians is:', opts: ['5π/6', '3π/4', '2π/3', '5π/12'], correct: 0, explain: '150 × π/180 = 5π/6.' },
      { q: 'π/12 in degrees is:', opts: ['15°', '12°', '30°', '18°'], correct: 0, explain: '(180/π) × π/12 = 15°.' },
      { q: 'Arc length with r = 8, θ = 0.75 rad:', opts: ['6', '48', '3', '14'], correct: 0, explain: 's = rθ = 8 × 0.75 = 6.' },
      { q: 'Sector area with r = 5, θ = 1.2 rad:', opts: ['15', '30', '3', '6'], correct: 0, explain: 'A = ½r²θ = ½ × 25 × 1.2 = 15.' },
      { q: 'A full turn in radians is:', opts: ['π', '2π', '360', 'π/2'], correct: 1, explain: 'A full circle is 2π radians.' },
      { q: 'The sector area formula is:', opts: ['rθ', '½r²θ', '½rθ', 'πr²θ'], correct: 1, explain: 'A = ½r²θ with θ in radians.' },
      { q: 'Segment area for r = 2, θ = π/2 is:', opts: ['π − 2', '2π − 4', 'π/2', '4 − π'], correct: 2, explain: '½ × 4 × (π/2 − 1) = 2(π/2 − 1) = π − 2.' },
      { q: 'An arc of length 10 on a circle of radius 4 subtends:', opts: ['0.4 rad', '2.5 rad', '40 rad', '14 rad'], correct: 1, explain: 'θ = s/r = 10/4 = 2.5 rad.' },
      { q: 'The area of a circle of radius 3 is:', opts: ['9π', '6π', '3π', 'π/9'], correct: 0, explain: 'A = πr² = 9π.' },
      { q: 'An arc equal in length to the radius subtends an angle of:', opts: ['1 radian', '1°', 'π radians', '57 radians'], correct: 0, explain: 'That is the definition of one radian.' },
    ],
  },
  {
    name: 'Trigonometry',
    description: 'Exact values, identities, solving equations in intervals, and graph transformations.',
    lesson: `# Trigonometry

### Exact Values
| Angle | sin | cos | tan |
|---|---|---|---|
| 30° | 1/2 | √3/2 | √3/3 |
| 45° | √2/2 | √2/2 | 1 |
| 60° | √3/2 | 1/2 | √3 |

### Key Identities
- sin²θ + cos²θ = 1
- tan θ = sin θ / cos θ
- sec²θ = 1 + tan²θ

### Solving Equations
Use the symmetry of the graphs. For sin x = 1/2 in 0 ≤ x ≤ 2π: the acute answer is π/6, and the second solution is π − π/6 = 5π/6.

For cos x = 0.5 in 0° ≤ x ≤ 360°: x = 60° and 360° − 60° = 300°.

**Always check the required interval and give every solution.**

### Graphs and Transformations
y = a sin(bx) + c has amplitude a, period 2π/b, and vertical shift c.

**Example:** y = 3 sin(2x) has amplitude 3 and period π.

### Using Identities
If sin x = 0.6 with x acute, then cos x = √(1 − 0.36) = 0.8 (positive in the first quadrant).

**Exam tips:** write the general second solution using graph symmetry rather than memorising CAST blindly; square both sides only with care, as it can add false solutions.`,
    questions: [
      { q: 'sin 30° =', opts: ['1/2', '√3/2', '√2/2', '1'], correct: 0, explain: 'sin 30° = 1/2 exactly.' },
      { q: 'cos 60° =', opts: ['√3/2', '1/2', '1', '0'], correct: 1, explain: 'cos 60° = 1/2.' },
      { q: 'tan 45° =', opts: ['0', '1/2', '1', 'undefined'], correct: 2, explain: 'tan 45° = 1.' },
      { q: 'cos x = 0.5 for 0° ≤ x ≤ 360° has solutions:', opts: ['60° only', '60° and 300°', '120° and 240°', '30° and 330°'], correct: 1, explain: 'Cosine is positive in quadrants I and IV: 60° and 300°.' },
      { q: 'sin²θ + cos²θ =', opts: ['tan²θ', '0', 'sec²θ', '1'], correct: 3, explain: 'It is the fundamental identity, equal to 1.' },
      { q: 'sin x = −√3/2 for 0 ≤ x ≤ 2π has solutions:', opts: ['4π/3 and 5π/3', '2π/3 and 5π/3', 'π/3 and 2π/3', 'π and 3π/2'], correct: 0, explain: 'Sine is negative in quadrants III and IV.' },
      { q: 'The amplitude of y = 3 sin(2x) is:', opts: ['2', '3', '6', '1'], correct: 1, explain: 'Amplitude is the coefficient 3.' },
      { q: 'The period of y = sin(3x) is:', opts: ['2π', 'π/3', '2π/3', '3π'], correct: 2, explain: 'Period = 2π/b = 2π/3.' },
      { q: 'sin x = 0.6 with x acute. cos x =', opts: ['0.8', '0.6', '0.4', '−0.8'], correct: 0, explain: 'cos x = √(1 − 0.36) = 0.8, positive when acute.' },
      { q: 'sec²θ − tan²θ =', opts: ['1', '0', 'tan²θ', 'cot²θ'], correct: 0, explain: 'Rearranged from sec²θ = 1 + tan²θ.' },
    ],
  },
  {
    name: 'Sequences and Series',
    description: 'Arithmetic and geometric progressions, sums, sigma notation and binomial expansion.',
    lesson: `# Sequences and Series

### Arithmetic Progressions (AP)
Terms increase by a common difference d.

- nth term: uₙ = a + (n − 1)d
- Sum: Sₙ = n/2 [2a + (n − 1)d]

**Example:** AP 5, 8, 11: the 20th term is 5 + 19 × 3 = 62.

### Geometric Progressions (GP)
Terms multiply by a common ratio r.

- nth term: uₙ = arⁿ⁻¹
- Sum: Sₙ = a(1 − rⁿ)/(1 − r)
- Sum to infinity (|r| < 1 only): S∞ = a/(1 − r)

**Example:** a = 8, r = 1/2 gives S∞ = 8/(1/2) = 16.

### Binomial Expansion
(1 + x)ⁿ = 1 + nx + n(n − 1)/2! x² + n(n − 1)(n − 2)/3! x³ + …, valid for |x| < 1.

For positive integer n, coefficients come from Pascal's triangle: (1 + 2x)⁴ = 1 + 8x + 24x² + 32x³ + 16x⁴.

**Exam tips:** identify a, d or r first; for "sum to infinity" questions check |r| < 1 explicitly, and for binomial expansions give terms up to the power asked (usually x² or x³).`,
    questions: [
      { q: 'The 15th term of the AP 3, 7, 11, … is:', opts: ['59', '63', '55', '51'], correct: 0, explain: 'u₁₅ = 3 + 14 × 4 = 59.' },
      { q: 'The sum of the first 20 terms with a = 2, d = 3 is:', opts: ['610', '600', '305', '590'], correct: 0, explain: 'S₂₀ = 10(4 + 19 × 3) = 10 × 61 = 610.' },
      { q: 'The 6th term of the GP with a = 3, r = 2 is:', opts: ['48', '64', '96', '192'], correct: 2, explain: 'u₆ = 3 × 2⁵ = 96.' },
      { q: 'The sum to infinity with a = 8, r = 1/2 is:', opts: ['4', '12', '16', '8'], correct: 2, explain: 'S∞ = 8/(1 − 1/2) = 16.' },
      { q: 'A GP has a finite sum to infinity when:', opts: ['r > 1', '|r| < 1', 'r = 1', '|r| > 1'], correct: 1, explain: 'The terms must tend to 0, so |r| < 1.' },
      { q: 'Which sequence is geometric?', opts: ['2, 4, 6', '3, 6, 9', '4, 12, 36', '1, 4, 9'], correct: 2, explain: 'Each term of 4, 12, 36 is multiplied by 3.' },
      { q: 'The coefficient of x² in (1 + x)⁵ is:', opts: ['5', '10', '20', '4'], correct: 1, explain: 'C(5,2) = 10.' },
      { q: 'The first three terms of (1 + 2x)⁴ are:', opts: ['1 + 8x + 24x²', '1 + 4x + 12x²', '1 + 8x + 16x²', '1 + 2x + 4x²'], correct: 0, explain: 'Terms: 1, 4(2x) = 8x, C(4,2)(2x)² = 24x².' },
      { q: 'The common ratio of the GP 27, 9, 3 is:', opts: ['3', '1/3', '−3', '9'], correct: 1, explain: 'r = 9/27 = 1/3.' },
      { q: 'The AP with a = 1, d = 2 has uₙ = 21 when n =', opts: ['10', '11', '21', '20'], correct: 1, explain: '1 + (n − 1)2 = 21 gives n = 11.' },
    ],
  },
  {
    name: 'Differentiation',
    description: 'Power rule, chain rule, tangents and normals, stationary points and rates of change.',
    lesson: `# Differentiation

### Basic Rules
- d/dx (xⁿ) = n xⁿ⁻¹
- d/dx (k) = 0, d/dx (kx) = k

**Example:** y = 5x² − 3x gives dy/dx = 10x − 3.

### Chain Rule
dy/dx = dy/du × du/dx.

**Example:** y = (3x − 1)⁵: dy/dx = 5(3x − 1)⁴ × 3 = 15(3x − 1)⁴.

### Tangents and Normals
The tangent gradient at a point is dy/dx there; the normal gradient is −1/(dy/dx).

**Example:** y = x² at (2, 4): tangent y = 4x − 4; normal has gradient −1/4.

### Stationary Points
Set dy/dx = 0, then classify with the second derivative:
- d²y/dx² > 0 → minimum
- d²y/dx² < 0 → maximum
- d²y/dx² = 0 → test either side

**Example:** y = x³ − 3x: dy/dx = 3x² − 3 = 0 at x = ±1; d²y/dx² = 6x, so a maximum at x = −1 and a minimum at x = 1.

### Rates of Change
dy/dx is a rate: if V = 4/3 πr³, then dV/dr = 4πr² links volume change to radius change.

**Exam tips:** always restart gradients from the derivative at the exact point, and answer rate questions with units.`,
    questions: [
      { q: 'd/dx (x⁴) =', opts: ['4x³', 'x³', '3x⁴', '4x⁴'], correct: 0, explain: 'Power rule: n xⁿ⁻¹ = 4x³.' },
      { q: 'd/dx (5x² − 3x) =', opts: ['10x − 3', '5x − 3', '10x² − 3', '7x'], correct: 0, explain: 'Differentiate term by term.' },
      { q: 'y = (3x − 1)⁵. dy/dx =', opts: ['5(3x − 1)⁴', '15(3x − 1)⁴', '3(3x − 1)⁴', '15(3x − 1)⁵'], correct: 1, explain: 'Chain rule multiplies by the derivative of the bracket, 3.' },
      { q: 'The gradient of y = x² at x = 3 is:', opts: ['9', '6', '3', '12'], correct: 1, explain: 'dy/dx = 2x = 6 at x = 3.' },
      { q: 'The tangent to y = x² at (2, 4) is:', opts: ['y = 4x − 4', 'y = 4x + 4', 'y = 2x', 'y = 4x'], correct: 0, explain: 'Gradient 4 through (2, 4): y = 4x − 4.' },
      { q: 'The normal to y = x² at (2, 4) has gradient:', opts: ['4', '−1/4', '−4', '1/4'], correct: 1, explain: 'Normal gradient = −1/4.' },
      { q: 'y = x³ − 3x has stationary points at:', opts: ['x = 1 only', 'x = −1 only', 'x = 1 and x = −1', 'x = 0'], correct: 2, explain: '3x² − 3 = 0 gives x = ±1.' },
      { q: 'y = x³ − 3x at x = −1 has a:', opts: ['minimum', 'maximum', 'point of inflection', 'neither'], correct: 1, explain: 'd²y/dx² = 6x = −6 < 0, so a maximum.' },
      { q: 'd/dx (sin x) =', opts: ['−cos x', '−sin x', 'cos x', 'tan x'], correct: 2, explain: 'Standard result.' },
      { q: 'y = 8x³ − 6x has dy/dx = 0 at:', opts: ['x = ±1/2', 'x = ±1/4', 'x = 2', 'x = ±3'], correct: 0, explain: '24x² − 6 = 0 gives x² = 1/4.' },
    ],
  },
  {
    name: 'Integration',
    description: 'Indefinite and definite integrals, areas under curves and the trapezium rule.',
    lesson: `# Integration

### Indefinite Integrals
Reverse the power rule and add a constant: ∫ xⁿ dx = xⁿ⁺¹/(n+1) + c (n ≠ −1).

**Examples:** ∫ x³ dx = x⁴/4 + c; ∫ 1/x dx = ln|x| + c; ∫ sin x dx = −cos x + c; ∫ e^x dx = e^x + c.

### Definite Integrals
∫ₐᵇ f(x) dx = [F(x)]ₐᵇ = F(b) − F(a). Constants of integration cancel.

**Example:** ∫₀¹ 6x² dx = [2x³]₀¹ = 2.

### Areas Under Curves
Area between a curve and the x-axis = ∫ₐᵇ y dx, where y ≥ 0. If the curve dips below the axis, split the integral at the roots and add the absolute values.

**Example:** area between y = x² − 4 and the x-axis: roots ±2, and the area is |∫₋₂² (x² − 4) dx| = 32/3.

### Trapezium Rule
A ≈ h/2 [y₀ + 2(y₁ + … + yₙ₋₁) + yₙ], h = (b − a)/n. More strips → better estimate; always an over-estimate for convex curves.

**Exam tips:** never forget +c on indefinite integrals; for areas with negative regions, sketch first and split.`,
    questions: [
      { q: '∫ x³ dx =', opts: ['x⁴/4 + c', '3x² + c', 'x⁴ + c', '4x³ + c'], correct: 0, explain: 'Raise the power and divide: x⁴/4 + c.' },
      { q: '∫₀¹ 6x² dx =', opts: ['3', '2', '6', '18'], correct: 1, explain: '[2x³]₀¹ = 2.' },
      { q: '∫ (4x³ + 2x) dx =', opts: ['4x⁴ + x² + c', 'x⁴ + x² + c', 'x⁴ + 2x² + c', 'x⁴ + x + c'], correct: 1, explain: 'Integrate term by term: x⁴ + x² + c.' },
      { q: 'The area under y = 2x from x = 0 to 3 is:', opts: ['6', '18', '9', '3'], correct: 2, explain: '∫₀³ 2x dx = [x²]₀³ = 9.' },
      { q: 'A constant of integration appears in:', opts: ['definite integrals', 'indefinite integrals only', 'areas only', 'derivatives'], correct: 1, explain: 'Definite integrals cancel it; indefinite ones need +c.' },
      { q: '∫ 1/x dx =', opts: ['−1/x² + c', 'ln|x| + c', '1/x² + c', 'e^x + c'], correct: 1, explain: 'Standard result for n = −1.' },
      { q: 'Using more strips in the trapezium rule gives:', opts: ['a less accurate estimate', 'the exact answer', 'a more accurate estimate', 'always zero error'], correct: 2, explain: 'Accuracy improves with more, thinner strips.' },
      { q: '∫₀^π sin x dx =', opts: ['0', '1', '2', 'π'], correct: 2, explain: '[−cos x]₀^π = 1 + 1 = 2.' },
      { q: 'The area between y = x² − 4 and the x-axis is:', opts: ['16/3', '32/3', '8', '16'], correct: 1, explain: 'Split at ±2 and total the magnitudes: 32/3.' },
      { q: 'dA/dx = 2x + 1 and A(0) = 3. A(x) =', opts: ['x² + x', 'x² + 3x', 'x² + x + 3', '2x² + x + 3'], correct: 2, explain: 'Integrate to x² + x + c; A(0) = 3 fixes c = 3.' },
    ],
  },
];
