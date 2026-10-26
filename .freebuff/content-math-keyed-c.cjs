// Keyed equation sheets, Mathematics — third tranche, worst note per level.
//
//   Mathematics AS  AS Level Mathematics: Quadratics                      (63 formula lines, no key)
//   Mathematics A2  A Level Mathematics: Coordinate Geometry              (55)
//   Mathematics OL  IGCSE Mathematics: Trig Graphs, Sine and Cosine Rules (48)
//
// Same house rules as content-math-keyed-a/b.cjs: opens with
// `<h2>Equations and symbols</h2>`, one `<p>` per equation, `<em>Key:</em>` inside
// that same paragraph naming every symbol with its unit, Unicode notation (no
// LaTeX delimiters), and appended rather than rewritten — the appender emits
// `content = content || section` guarded by id, material_type and the heading.
//
// Apply with:
//   node .freebuff/append-note-sections.cjs .freebuff/content-math-keyed-c.cjs
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/note-formulas.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/note-formulas.sql --apply    (live)

const HEAD = `<h2>Equations and symbols</h2>
<p>Every relation this topic is examined on, gathered into one reference sheet, each written with its real notation and followed by a key that names every symbol. Nothing here replaces the worked examples above; it is the list you revise from the night before, when you need the form of an answer rather than the reasoning behind it.</p>`;

const sections = {
  /* ── Mathematics AS: Quadratics ───────────────────────────────────────── */
  "6d5aa4b1-9916-4af0-a529-74d409d9f9b9": {
    slug: "maths-as-quadratics",
    html: `${HEAD}
<h3>The three forms and what each one gives you</h3>
<p><strong>f(x) = ax² + bx + c, a ≠ 0</strong><br><em>Key:</em> f(x) = the value of the quadratic at input x; a = leading coefficient (a &gt; 0 opens upward, a &lt; 0 opens downward; larger |a| narrows the curve); b = coefficient of x, which controls the horizontal position of the vertex; c = the constant term, equal to f(0), so (0, c) is the y-intercept. The standard form reads off the intercept in one glance.</p>
<p><strong>f(x) = a(x − p)(x − q)</strong><br><em>Key:</em> p, q = the two roots, i.e. the x-values where the curve crosses the axis, so the intercepts are (p, 0) and (q, 0); a = the same leading coefficient, unchanged by factorising. This form answers "where does it cross?" and nothing else.</p>
<p><strong>f(x) = a(x − h)² + k</strong><br><em>Key:</em> h = x-coordinate of the vertex; k = the value of the function there, so the vertex is (h, k) and k is the minimum when a &gt; 0 or the maximum when a &lt; 0; a = leading coefficient. The completed-square form is the only one that answers "where is the turning point and what is its value?"</p>
<p><strong>x_vertex = −b/(2a), y_vertex = c − b²/(4a) = f(−b/(2a))</strong><br><em>Key:</em> x_vertex = the axis of symmetry, the x where the turning point sits; y_vertex = the minimum or maximum value; a, b, c = coefficients of ax² + bx + c with a ≠ 0. The y-coordinate is never −b/(2a) on its own: substitute the x back, or use the closed form, and keep the sign of c.</p>
<p><strong>x² + bx + c = (x + b/2)² + c − b²/4</strong><br><em>Key:</em> b = coefficient of x; c = constant; the halving of b and the subtraction of its square are the whole method. With a leading coefficient, factor it out first: ax² + bx + c = a(x + b/(2a))² + c − b²/(4a).</p>
<p><strong>a² − b² = (a − b)(a + b)</strong><br><em>Key:</em> a, b = the two terms being squared (numbers, variables or both). The difference of two squares: it factorises 9x² − 25 as (3x − 5)(3x + 5) without any trial and error, and it is the fastest route whenever both terms are perfect squares separated by a minus.</p>

<h3>Roots, the discriminant and the formula</h3>
<p><strong>x = (−b ± √(b² − 4ac))/(2a)</strong><br><em>Key:</em> x = the root(s); a, b, c = coefficients of ax² + bx + c, a ≠ 0; ± = the two signs, which produce the two roots. Both −b and the square root sit in the numerator, and the whole numerator is divided by 2a — the two places this formula is mis-copied.</p>
<p><strong>Δ = b² − 4ac</strong><br><em>Key:</em> Δ (delta) = the discriminant, a pure number with no unit; a, b, c = the coefficients. Δ &gt; 0 gives two distinct real roots, Δ = 0 gives one repeated root (the curve touches the axis), Δ &lt; 0 gives no real roots. The sign of Δ answers "how many roots" without solving anything.</p>
<p><strong>α + β = −b/a and αβ = c/a</strong><br><em>Key:</em> α (alpha), β (beta) = the two roots; a, b, c = the coefficients of ax² + bx + c. Sum and product let a question ask about the roots without your finding them, and let you build a quadratic from two given roots: x² − (α + β)x + αβ = 0.</p>

<h3>A curve and a line</h3>
<p><strong>ax² + bx + c = mx + k ⇒ ax² + (b − m)x + (c − k) = 0</strong><br><em>Key:</em> a, b, c = the quadratic's coefficients; m = the line's gradient; k = the line's y-intercept. Substituting the line into the curve leaves a quadratic in x, and its discriminant decides the geometry: Δ &gt; 0 two intersections, Δ = 0 the line is a tangent, Δ &lt; 0 no intersection.</p>
<p><strong>Δ = 0 in the combined equation ⇒ the line is a tangent</strong><br><em>Key:</em> Δ = the discriminant of the quadratic produced by the substitution above. "Find k such that the line touches the curve" is exactly this equation set to zero, then solved for the unknown coefficient.</p>

<h3>Inequalities, disguised quadratics and modelling</h3>
<p><strong>a &gt; 0 and f(x) &lt; 0 ⇒ p &lt; x &lt; q; a &gt; 0 and f(x) &gt; 0 ⇒ x &lt; p or x &gt; q</strong><br><em>Key:</em> a = leading coefficient; p, q = the two roots with p &lt; q; the interval between the roots is where an upward parabola dips below the axis. For a &lt; 0 the two answers swap. Always sketch before writing the inequality — the sketch is the check.</p>
<p><strong>g(x) = u ⇒ au² + bu + c = 0, then back-substitute</strong><br><em>Key:</em> g(x) = the repeated expression (x², 2ˣ, sin x, …); u = the substitution that reduces the equation to a standard quadratic; a, b, c = its coefficients. Every solution in u must be checked in the original domain, because a negative u cannot equal 2ˣ and a u outside [−1, 1] cannot equal sin x.</p>
<p><strong>A = x(L − 2x) = −2(x − L/4)² + L²/8</strong><br><em>Key:</em> A = the enclosed area (m²); x = the repeated side (m); L = the total length of fencing available (m), so the opposite side is L − 2x. The completing-the-square step turns a product into a single squared term, and the maximum is the constant at the end: L²/8 m², reached at x = L/4.</p>
<p><strong>d = √((x₂ − x₁)² + (y₂ − y₁)²)</strong><br><em>Key:</em> d = the distance between the two points (same unit as the axes); (x₁, y₁) and (x₂, y₂) = the coordinates of the two points. It is Pythagoras applied to the horizontal step and the vertical step, and it is the form a "show that" question about a quadratic graph usually needs.</p>`,
  },

  /* ── Mathematics A2: Coordinate Geometry ──────────────────────────────── */
  "022b44ee-69e7-427d-9442-1a55a32580fb": {
    slug: "maths-a2-coordinate-geometry",
    html: `${HEAD}
<h3>Two points: distance, midpoint, gradient</h3>
<p><strong>d = √((x₂ − x₁)² + (y₂ − y₁)²)</strong><br><em>Key:</em> d = the distance AB, in the units of the axes; (x₁, y₁) = the first point; (x₂, y₂) = the second. Pythagoras on the horizontal and vertical steps. Taking the square root of each square separately is the classic slip — the sum is rooted, not the terms.</p>
<p><strong>M = ((x₁ + x₂)/2, (y₁ + y₂)/2)</strong><br><em>Key:</em> M = the midpoint of AB; the coordinates are the averages, which is why a midpoint question is always "add and halve" and never "subtract and halve".</p>
<p><strong>m = (y₂ − y₁)/(x₂ − x₁), x₂ ≠ x₁</strong><br><em>Key:</em> m = the gradient, i.e. the rise per unit run (unitless); x₂ ≠ x₁ because a vertical line has no finite gradient. Keep the order of subtraction identical in numerator and denominator, or the sign flips.</p>

<h3>Lines: the three forms</h3>
<p><strong>y = mx + c</strong><br><em>Key:</em> m = gradient; c = y-intercept, the value of y where x = 0. Best when you know the gradient and the intercept, or when you are sketching quickly.</p>
<p><strong>y − y₁ = m(x − x₁)</strong><br><em>Key:</em> m = gradient; (x₁, y₁) = one point on the line. Point–gradient form is the version to reach for whenever a question gives a gradient and a point, because it needs no algebra before substituting.</p>
<p><strong>ax + by + c = 0 ⇒ m = −a/b</strong><br><em>Key:</em> a, b, c = the integer coefficients of the general form, b ≠ 0 for a non-vertical line; m = the gradient recovered by rearranging. Examiners often state the answer in this form, so converting confidently in both directions is worth practising.</p>
<p><strong>parallel: m₁ = m₂; perpendicular: m₁m₂ = −1 ⇒ m₂ = −1/m₁</strong><br><em>Key:</em> m₁ = gradient of the given line; m₂ = gradient of the line you are finding. Perpendicular gradients are negative reciprocals, which flips the sign as well as inverting the fraction — a habit that saves the "find the normal" mark.</p>
<p><strong>perpendicular bisector: through M with gradient −1/m_AB</strong><br><em>Key:</em> M = the midpoint of AB; m_AB = the gradient of AB. Two steps, in this order: the midpoint (a point on the line), then the negative reciprocal (its gradient).</p>

<h3>Circles</h3>
<p><strong>(x − a)² + (y − b)² = r²</strong><br><em>Key:</em> (a, b) = the centre; r = the radius, r &gt; 0, in the units of the axes. The signs inside the brackets are the opposite of the centre's coordinates — (x + 2)² means the centre's x is −2.</p>
<p><strong>x² + y² + 2gx + 2fy + c = 0 ⇒ centre (−g, −f), r = √(g² + f² − c)</strong><br><em>Key:</em> g = half the x-coefficient; f = half the y-coefficient; c = the constant term; r = the radius, which exists only when g² + f² − c &gt; 0. Completing the square in x and in y recovers both, and the radius is the square root of the whole expression.</p>
<p><strong>circle with diameter AB: centre M and r = ½√((x₂ − x₁)² + (y₂ − y₁)²)</strong><br><em>Key:</em> M = the midpoint of AB (the centre); the radius is half the distance between the endpoints. The alternative test (x − x₁)(x − x₂) + (y − y₁)(y − y₂) = 0 encodes the same circle through the angle-in-a-semicircle fact.</p>

<h3>Tangents, chords and intersections</h3>
<p><strong>m_tangent = −1/m_radius</strong><br><em>Key:</em> m_radius = gradient of the line from the circle's centre to the point of contact; m_tangent = the gradient of the tangent there. A radius meets its tangent at a right angle, so this negative reciprocal is the first line of every tangent question, followed by point–gradient form at the point of contact.</p>
<p><strong>half-chord = √(r² − d²)</strong><br><em>Key:</em> r = the radius; d = the perpendicular distance from the centre to the chord. The perpendicular from the centre bisects the chord, so this right-angled triangle gives half the chord length — double it for the whole chord.</p>
<p><strong>tangent length from an external point: L = √(d² − r²)</strong><br><em>Key:</em> L = the length of the tangent from the external point to the point of contact; d = the distance from that point to the centre; r = the radius. Tangency again makes a right angle, this time at the point of contact.</p>
<p><strong>line meets circle: Δ = b² − 4ac of the substituted quadratic</strong><br><em>Key:</em> Δ = the discriminant of the quadratic left after substituting y = mx + k into the circle's equation; a, b, c = its coefficients. Δ &gt; 0 gives a secant (two points), Δ = 0 a tangent, Δ &lt; 0 no intersection — the same test as for a parabola, because the algebra is identical.</p>
<p><strong>x = a + r cos θ, y = b + r sin θ ⇒ (x − a)² + (y − b)² = r²</strong><br><em>Key:</em> (a, b) = the centre; r = the radius; θ (theta) = the parameter, the angle measured anticlockwise from the positive x-direction, in degrees or radians. Squaring and adding eliminates θ through sin²θ + cos²θ = 1, which is how a parametric description is turned back into a Cartesian one.</p>`,
  },

  /* ── Mathematics OL: trig graphs, sine and cosine rules ──────────────── */
  "3e7dd5a5-8c36-474d-9ae4-f9cbb91c9a3e": {
    slug: "maths-ol-trig-graphs-rules",
    html: `${HEAD}
<h3>Ratios, identities and the graphs</h3>
<p><strong>sin θ = opposite/hypotenuse, cos θ = adjacent/hypotenuse, tan θ = opposite/adjacent</strong><br><em>Key:</em> θ (theta) = the angle, measured in degrees unless stated; "opposite" = the side facing θ; "adjacent" = the side next to θ that is not the hypotenuse; hypotenuse = the longest side, opposite the right angle. These three ratios define the functions for 0° to 90° and the graphs extend them to every angle.</p>
<p><strong>tan θ = sin θ/cos θ</strong><br><em>Key:</em> θ = any angle where cos θ ≠ 0. The reason tan is undefined at 90° and 270°: the cosine underneath is zero, which is exactly where the tan graph has its asymptotes.</p>
<p><strong>sin²θ + cos²θ = 1</strong><br><em>Key:</em> θ = any angle. Pythagoras on the unit circle, and the identity that turns a mixture of sine and cosine into one function when an equation looks unsolvable.</p>
<p><strong>y = sin x: maximum 1, minimum −1, period 360°; y = cos x: maximum 1, minimum −1, period 360°; y = tan x: period 180°, asymptotes at 90° + 180°n</strong><br><em>Key:</em> x = the angle in degrees; y = the value of the function; period = the angle after which the graph repeats; n = any integer, so the asymptotes recur every 180°. The amplitude of sine and cosine is 1, which is why no value of sin x or cos x ever leaves [−1, 1].</p>
<p><strong>sin(180° − x) = sin x; cos(360° − x) = cos x; cos(180° − x) = −cos x; tan(x + 180°) = tan x</strong><br><em>Key:</em> x = the angle in degrees. These four symmetries generate the second solution of every trigonometric equation: sine is positive in two quadrants, cosine changes sign across 90°, and tangent simply repeats.</p>
<p><strong>sin 30° = ½, cos 60° = ½, tan 45° = 1, sin 45° = cos 45° = √2/2, sin 60° = cos 30° = √3/2, tan 30° = 1/√3, tan 60° = √3</strong><br><em>Key:</em> the exact values from the half-equilateral triangle (30°–60°–90°, sides 1, √3, 2) and the isosceles right triangle (45°–45°–90°, sides 1, 1, √2). They are what a "give your answer in exact form" question is asking for, and a calculator decimal is not that.</p>

<h3>The two rules and the area formula</h3>
<p><strong>a/sin A = b/sin B = c/sin C = 2R</strong><br><em>Key:</em> a = the side opposite angle A; b opposite B; c opposite C; A, B, C = the three angles of the triangle, summing to 180°; R = the radius of the circumscribed circle (rarely needed, but it is the constant the three ratios share). Use the sine rule when you have a matching side-and-opposite-angle pair plus one more piece.</p>
<p><strong>sin A/a = sin B/b = sin C/c</strong><br><em>Key:</em> the same six quantities, inverted so the unknown is on top when you are finding an angle. Rearranging the first form gives this one, and using the wrong orientation is the most common wasted mark in the topic.</p>
<p><strong>a² = b² + c² − 2bc cos A</strong><br><em>Key:</em> a = the side opposite angle A; b, c = the other two sides; A = the angle between sides b and c (the included angle). Use it for SAS (two sides and the angle between) or SSS (three sides). When A = 90°, cos A = 0 and it collapses to Pythagoras.</p>
<p><strong>cos A = (b² + c² − a²)/(2bc)</strong><br><em>Key:</em> A = the angle being found; a = the side opposite it; b, c = the other two sides. The rearranged cosine rule, and the only reliable way to find an angle from three sides. A negative cosine here means an obtuse angle, which is the check that catches a sign slip.</p>
<p><strong>area = ½ab sin C</strong><br><em>Key:</em> a, b = two sides of the triangle, in the same unit (cm, m); C = the angle between them, in degrees; area = in the matching squared unit (cm², m²). The angle must be the included one: given two sides and a non-included angle, find the third side first with the cosine rule.</p>
<p><strong>h = b sin C</strong><br><em>Key:</em> h = the perpendicular height to side a; b = a side meeting C; C = the angle between b and a. This is where ½ab sin C comes from — drop the perpendicular, and the height is a sine — which is worth being able to reproduce in a "show that" question.</p>

<h3>Bearings and the ambiguous case</h3>
<p><strong>bearing of A from B = bearing of B from A ± 180°</strong><br><em>Key:</em> a bearing = an angle measured clockwise from due north, always written with three figures (070°, 150°); the ± chooses the value in 0°–360°. The reverse (back) bearing differs by exactly 180°, because the north lines at the two points are parallel.</p>
<p><strong>angle between two legs from the same point = |θ₁ − θ₂|</strong><br><em>Key:</em> θ₁, θ₂ = the two bearings measured from the common starting point; the difference is the included angle for the cosine rule. When the legs start from different points, convert one to a back bearing first, then subtract.</p>
<p><strong>sin A = k with 0° ≤ A ≤ 180° ⇒ A = arcsin k or A = 180° − arcsin k</strong><br><em>Key:</em> k = the sine value, 0 ≤ k ≤ 1 for this range; arcsin = the inverse-sine function on the calculator (sin⁻¹, not 1/sin). Two triangles can share the same sine, which is why a sine-rule question that gives two sides and a non-included angle can have two valid answers — state both, or say why one is impossible.</p>`,
  },
};

module.exports = { sections };
