// Keyed equation sections for the worst Mathematics notes, one per level.
//
//   Mathematics OL  IGCSE Mathematics: Equations            (66 formula lines, no key)
//   Mathematics AS  AS Level Mathematics: Functions          (75)
//   Mathematics A2  A Level Mathematics: Further Trigonometry (72)
//
// Appended, never rewritten: append-note-sections.cjs emits
// `content = content || section` guarded by id, material_type and a heading
// check, so the existing body is not part of the UPDATE at all.
//
// Notation: Unicode (Δ, θ, α, ±, ⇔, √, ², ⁻¹) — the notes render Unicode, and
// the appender refuses LaTeX delimiters for that reason.
//
// Apply with:
//   node .freebuff/append-note-sections.cjs .freebuff/content-math-keyed-a.cjs
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/note-formulas.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/note-formulas.sql --apply    (live)

const HEAD = `<h2>Equations and symbols</h2>
<p>Every relation this topic is examined on, written with its real notation and followed by a key naming each symbol, its unit and what it means. Where a statement has a second useful form both are given, so a rearrangement in the exam is mechanical rather than something to rediscover under time pressure.</p>`;

const sections = {
  /* ── Mathematics OL: IGCSE Equations (0580, statement 2.5) ────────────── */
  "0922f772-661e-4380-b5a6-141b70f1263c": {
    slug: "maths-ol-equations",
    html: `${HEAD}
<h3>Linear equations and changing the subject</h3>
<p><strong>ax + b = c ⇒ x = (c − b)/a</strong><br><em>Key:</em> a = coefficient of the unknown, a ≠ 0; b = constant added to the unknown; c = the value on the right-hand side. Subtract b from both sides, then divide both sides by a — the two moves that solve every linear equation in the paper.</p>
<p><strong>P = Q ⇒ P + k = Q + k and mP = mQ (m ≠ 0)</strong><br><em>Key:</em> P, Q = the two sides of any equation; k = any number added to both; m = any non-zero multiplier. This is the balance principle written as a rule: an equation survives exactly those operations performed identically on both sides, which is why dividing by zero is excluded.</p>
<p><strong>a/b = c/d ⇒ ad = bc</strong><br><em>Key:</em> a, c = numerators; b, d = denominators, b ≠ 0 and d ≠ 0. Cross-multiplication clears a fractional equation in one step; the excluded values of b and d must be stated, because a value that makes a denominator zero is not a solution.</p>
<p><strong>y = mx + c ⇒ x = (y − c)/m</strong><br><em>Key:</em> y = the dependent variable (the output); x = the independent variable; m = gradient, m ≠ 0; c = intercept on the y-axis. The standard change of subject: undo the addition first, then the multiplication.</p>
<p><strong>(x + p)² = q ⇒ x = −p ± √q</strong><br><em>Key:</em> p = the number added inside the bracket; q = the value on the right, q ≥ 0 for real solutions. Take the square root of both sides, remembering both signs — the step students most often halve.</p>

<h3>Simultaneous equations</h3>
<p><strong>a₁x + b₁y = c₁ and a₂x + b₂y = c₂ ⇒ x = (c₁b₂ − c₂b₁)/D, y = (a₁c₂ − a₂c₁)/D, where D = a₁b₂ − a₂b₁</strong><br><em>Key:</em> a₁, b₁, c₁ = coefficients and constant of the first equation; a₂, b₂, c₂ = those of the second; D = the determinant. The elimination method in one line: multiply each equation to match a coefficient, add or subtract to remove that unknown, then substitute back.</p>
<p><strong>D = a₁b₂ − a₂b₁ = 0 ⇒ no unique solution</strong><br><em>Key:</em> D = the determinant of the coefficients. If D = 0 the two lines are parallel (no intersection, no solution) or identical (infinitely many); if D ≠ 0 they cross once, which is the case every exam question in this topic except the deliberate discussion part.</p>
<p><strong>y = mx + k and ax² + bx + c = 0 ⇒ ax² + (b − m)x + (c − k) = 0</strong><br><em>Key:</em> m = gradient of the line; k = its y-intercept; a, b, c = the quadratic's coefficients, a ≠ 0. Substituting the line into the curve gives the linear–non-linear pair of the Extended paper; the number of solutions is then decided by the discriminant of this combined quadratic.</p>

<h3>Quadratic equations</h3>
<p><strong>ax² + bx + c = 0 ⇒ x = (−b ± √(b² − 4ac))/(2a)</strong><br><em>Key:</em> a, b, c = coefficients with a ≠ 0; x = the unknown. The quadratic formula, valid for every quadratic whether or not it factorises, and the only reliable route when the coefficients are decimals or surds.</p>
<p><strong>Δ = b² − 4ac</strong><br><em>Key:</em> Δ = the discriminant; a, b, c = the quadratic's coefficients. Δ &gt; 0 gives two distinct real roots, Δ = 0 gives one repeated root (the curve touches the x-axis), Δ &lt; 0 gives no real roots — the three cases the syllabus asks you to identify.</p>
<p><strong>a(x − α)(x − β) = 0, with α + β = −b/a and αβ = c/a</strong><br><em>Key:</em> α, β = the two roots; a, b, c = the coefficients. The factorised form, and the sum-and-product relations that let a second equation be built from known roots without expanding anything.</p>
<p><strong>ax² + bx + c = a(x + b/(2a))² + c − b²/(4a)</strong><br><em>Key:</em> a, b, c = the coefficients, a ≠ 0. Completing the square: it proves the formula, gives the turning point at x = −b/(2a) with y = c − b²/(4a), and is the fastest route to a maximum or minimum in an optimisation question.</p>
<p><strong>Δ = 0 in the combined equation ⇒ the line is a tangent</strong><br><em>Key:</em> Δ = the discriminant of the quadratic produced by substituting the line into the curve. One repeated intersection is exactly what tangency means, which is how a "find k such that the line touches the curve" question is solved.</p>`,
  },

  /* ── Mathematics AS: Functions ────────────────────────────────────────── */
  "f35f2af5-9d17-40d9-8772-d181fa861e96": {
    slug: "maths-as-functions",
    html: `${HEAD}
<h3>Notation, domain and range</h3>
<p><strong>f: x ↦ f(x), with domain D_f and range R_f</strong><br><em>Key:</em> f = the function (the rule); x = an input drawn from the domain; f(x) = the single output; D_f = the set of allowed inputs; R_f = the set of outputs actually produced. A function is only fully specified when all three of rule, domain and range are given — an answer that states the rule alone loses the mark.</p>
<p><strong>f(x) = √(x − a) ⇒ D_f = {x : x ≥ a}</strong><br><em>Key:</em> a = the value under the root where the expression becomes zero. A square root is real only when its argument is non-negative, and that inequality <em>is</em> the domain.</p>
<p><strong>f(x) = k/x ⇒ D_f = {x : x ≠ 0}</strong><br><em>Key:</em> k = any non-zero constant. Division by zero is undefined, so the excluded value is removed from the domain and becomes a vertical asymptote on the graph.</p>

<h3>Composite functions</h3>
<p><strong>(g ∘ f)(x) = g(f(x))</strong><br><em>Key:</em> f = the function applied first (the inner one); g = applied second (the outer one). Order matters: f then g is not the same as g then f, and the notation is read right-to-left, which is the single most common source of lost marks here.</p>
<p><strong>D_{g∘f} = {x ∈ D_f : f(x) ∈ D_g}</strong><br><em>Key:</em> D_f = domain of the inner function; D_g = domain of the outer function. The composite exists only where the inner output is a legal input for the outer function, so every restriction from either function survives.</p>
<p><strong>(f ∘ g)(x) ≠ (g ∘ f)(x) in general</strong><br><em>Key:</em> f, g = two functions. Composition is not commutative; a question that asks for both is testing exactly this, and the two answers differing is the expected result, not an error.</p>

<h3>Inverse functions</h3>
<p><strong>y = f(x) ⇔ x = f⁻¹(y), with D_{f⁻¹} = R_f and R_{f⁻¹} = D_f</strong><br><em>Key:</em> f⁻¹ = the inverse function; D and R = domain and range. To find the rule: write y = f(x), rearrange to make x the subject, then swap the letters. The domain and range exchange, which is why an inverse can fail to exist until the domain is restricted.</p>
<p><strong>f⁻¹(f(x)) = x and f(f⁻¹(x)) = x</strong><br><em>Key:</em> the two compositions that define an inverse: each function undoes the other. A quick check on any answer — compose them and you must return to the input.</p>
<p><strong>y = f⁻¹(x) is the reflection of y = f(x) in the line y = x</strong><br><em>Key:</em> the line y = x = the mirror. Every point (a, b) on the graph of f appears as (b, a) on the graph of f⁻¹, which is the geometric statement of swapping the variables.</p>
<p><strong>f(x) = x² on x ≥ 0 ⇒ f⁻¹(x) = √x</strong><br><em>Key:</em> the restriction x ≥ 0 is what makes the squaring function one-to-one. Without it the parabola fails the horizontal-line test and no inverse function exists; the restricted domain is the mark.</p>

<h3>Transformations of graphs</h3>
<p><strong>y = f(x) + a ⇒ translation by a in the y-direction</strong><br><em>Key:</em> a = the number added outside the function; positive moves up. Every point rises by a, so the shape is unchanged.</p>
<p><strong>y = f(x + a) ⇒ translation by −a in the x-direction</strong><br><em>Key:</em> a = the number added inside the bracket; the graph moves <em>opposite</em> to the sign. This is the rule students invert under pressure: f(x + 3) moves the curve 3 to the left.</p>
<p><strong>y = a f(x) ⇒ stretch parallel to the y-axis, scale factor a; y = f(ax) ⇒ stretch parallel to the x-axis, scale factor 1/a</strong><br><em>Key:</em> a = the multiplier, a &gt; 0. Outside the function multiplies heights; inside multiplies inputs, so it compresses horizontally by the reciprocal.</p>
<p><strong>y = −f(x) reflects in the x-axis; y = f(−x) reflects in the y-axis</strong><br><em>Key:</em> the minus sign's position decides the mirror. Outside negates the output (vertical flip); inside negates the input (horizontal flip).</p>
<p><strong>f(x) = a(x − h)² + k ⇒ R_f = [k, ∞) for a &gt; 0, and (−∞, k] for a &lt; 0</strong><br><em>Key:</em> a = the coefficient controlling width and direction; h = the x-coordinate of the vertex; k = its y-coordinate (the minimum or maximum value). Completing the square reads the range straight off the completed form.</p>
<p><strong>y = (ax + b)/(cx + d) ⇒ vertical asymptote x = −d/c, horizontal asymptote y = a/c</strong><br><em>Key:</em> a, b, c, d = the four coefficients, c ≠ 0. The excluded input gives the vertical asymptote; the ratio of the leading coefficients gives the horizontal one, which is the value the function approaches as x grows.</p>`,
  },

  /* ── Mathematics A2: Further Trigonometry ─────────────────────────────── */
  "8070ed35-c07d-4ba4-bba0-9dfbe1a79c80": {
    slug: "maths-a2-further-trig",
    html: `${HEAD}
<h3>Reciprocal functions and their identities</h3>
<p><strong>sec θ = 1/cos θ, cosec θ = 1/sin θ, cot θ = 1/tan θ = cos θ/sin θ</strong><br><em>Key:</em> θ = the angle, in degrees or radians; sec, cosec, cot = the reciprocals of cosine, sine and tangent. Each is undefined wherever its denominator is zero — sec and tan at 90°, cosec at 0° — and those exclusions are part of the domain.</p>
<p><strong>1 + tan²θ = sec²θ</strong><br><em>Key:</em> θ = any angle where both sides are defined. Divide sin²θ + cos²θ = 1 by cos²θ; it is the identity that turns a quadratic in tan into one in sec, which is how many equations in this topic are solved.</p>
<p><strong>1 + cot²θ = cosec²θ</strong><br><em>Key:</em> θ = any angle where both sides are defined. The same division by sin²θ instead of cos²θ. Knowing which of the two to use is decided by which function appears in the equation.</p>
<p><strong>sin²θ + cos²θ = 1</strong><br><em>Key:</em> θ = any angle. The parent identity; both Pythagorean forms above come from it and every proof starts here.</p>

<h3>Compound angles</h3>
<p><strong>sin(A ± B) = sin A cos B ± cos A sin B</strong><br><em>Key:</em> A, B = two angles. The signs match on both sides: a plus in the bracket gives a plus between the terms.</p>
<p><strong>cos(A ± B) = cos A cos B ∓ sin A sin B</strong><br><em>Key:</em> A, B = two angles. The signs are opposite on the two sides — the one place the pattern breaks, and the reason cos(90° − θ) = sin θ rather than −sin θ.</p>
<p><strong>tan(A ± B) = (tan A ± tan B)/(1 ∓ tan A tan B)</strong><br><em>Key:</em> A, B = two angles, with A + B ≠ 90° + 180°n. Derived from the sine and cosine forms by dividing through by cos A cos B.</p>

<h3>Double angles and half angles</h3>
<p><strong>sin 2A = 2 sin A cos A</strong><br><em>Key:</em> A = the single angle; 2A = its double. Set B = A in the compound formula. It converts a product of sine and cosine into a single sine, which is what makes ∫sin A cos A dx tractable.</p>
<p><strong>cos 2A = cos²A − sin²A = 2cos²A − 1 = 1 − 2sin²A</strong><br><em>Key:</em> A = the single angle. Three forms of one identity: the first from the compound formula, the other two by substituting sin²A = 1 − cos²A or cos²A = 1 − sin²A. Choose the form that leaves only the function already in the question.</p>
<p><strong>tan 2A = 2 tan A/(1 − tan²A)</strong><br><em>Key:</em> A = the single angle, tan A ≠ ±1. The double-angle formula for tangent, undefined at the values that make the denominator zero.</p>
<p><strong>sin²A = (1 − cos 2A)/2 and cos²A = (1 + cos 2A)/2</strong><br><em>Key:</em> A = the single angle. The double-angle identity rearranged: the standard way to integrate an even power of sine or cosine, because it replaces the square with a cosine of the double angle.</p>

<h3>Harmonic form and equations</h3>
<p><strong>a sin θ + b cos θ = R sin(θ + α), where R = √(a² + b²) and tan α = b/a</strong><br><em>Key:</em> a = coefficient of sin θ; b = coefficient of cos θ; R = the amplitude of the combined wave; α = the phase shift, chosen in the quadrant that matches the signs of a and b. Expand the right-hand side and compare coefficients to prove it: R cos α = a and R sin α = b.</p>
<p><strong>−R ≤ a sin θ + b cos θ ≤ R, so the maximum is R and the minimum is −R</strong><br><em>Key:</em> R = √(a² + b²). A single sine wave cannot leave its amplitude, which is why "find the greatest value of 3 sin θ + 4 cos θ" is answered by 5 without differentiating anything.</p>
<p><strong>sin θ = k ⇒ θ = (−1)ⁿ arcsin k + 180°n</strong><br><em>Key:</em> k = the given value, −1 ≤ k ≤ 1; n = any integer; arcsin = the principal value. The general solution, covering both the first-quadrant answer and its supplement. In radians replace 180°n with πn.</p>
<p><strong>cos θ = k ⇒ θ = ±arccos k + 360°n; tan θ = k ⇒ θ = arctan k + 180°n</strong><br><em>Key:</em> k = the given value (|k| ≤ 1 for cosine, any real for tangent); n = any integer. Cosine repeats every 360° and is symmetric about 0°; tangent repeats every 180° with no symmetry, which is why its solution needs one line rather than two.</p>
<p><strong>sin θ ≈ θ, tan θ ≈ θ, cos θ ≈ 1 − θ²/2 (θ in radians)</strong><br><em>Key:</em> θ = a small angle measured in radians. The small-angle approximations, valid because the curve and its tangent coincide near zero; the cosine form keeps the squared term because the linear term cancels, and that quadratic term is what a limits question needs.</p>`,
  },
};

module.exports = { sections };
