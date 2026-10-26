// Keyed equation sections, Mathematics — second tranche, next-worst per level.
//
//   Mathematics OL  Cambridge IGCSE Mathematics: Ratio, Rate and Proportion (50)
//   Mathematics AS  AS Level Mathematics: Sequences and Series              (73)
//   Mathematics A2  A Level Mathematics: Integration II                      (61)
//
// Same house rules as content-math-keyed-a.cjs: `<h2>Equations and symbols</h2>`,
// one `<p>` per equation, `<em>Key:</em>` inside that same paragraph, Unicode
// notation (no LaTeX delimiters), appended rather than rewritten.
//
// Apply with:
//   node .freebuff/append-note-sections.cjs .freebuff/content-math-keyed-b.cjs
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/note-formulas.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/note-formulas.sql --apply    (live)

const HEAD = `<h2>Equations and symbols</h2>
<p>Every relation this topic is examined on, written with its real notation and followed by a key naming each symbol, its unit and what it means. Restaurant-bill questions, savings plans and areas under curves all reduce to one of these lines with numbers in it.</p>`;

const sections = {
  /* ── Mathematics OL: ratio, rate and proportion ───────────────────────── */
  "37923030-dd6a-49eb-b200-0cdfef605eea": {
    slug: "maths-ol-ratio-rate",
    html: `${HEAD}
<h3>Ratio and dividing a quantity</h3>
<p><strong>a : b : c, simplified by dividing every term by the HCF</strong><br><em>Key:</em> a, b, c = the quantities being compared, all in the same unit; HCF = highest common factor. A ratio has no units and no fixed size — 3 : 5 is the same comparison as 6 : 10, which is why simplifying first always shortens the arithmetic.</p>
<p><strong>share of a = total × a/(a + b)</strong><br><em>Key:</em> a, b = the ratio parts; total = the quantity being divided. Equivalently each part is total ÷ (a + b) and the share is a times that value — the additive-unitary method, which is safer when there are three or more parts.</p>
<p><strong>1 : n on a map ⇒ real length = map length × n</strong><br><em>Key:</em> n = the scale factor, e.g. 1 : 25 000 means 1 cm on the map is 25 000 cm (250 m) on the ground. The same factor applies to lengths only; areas scale by n² and volumes by n³.</p>
<p><strong>similar shapes: lengths a : b ⇒ areas a² : b² and volumes a³ : b³</strong><br><em>Key:</em> a : b = the ratio of corresponding lengths; a² : b² = the ratio of corresponding areas; a³ : b³ = the ratio of corresponding volumes. Squaring and cubing the length ratio is what a "the model is 20 times smaller" question is actually asking.</p>

<h3>Direct and inverse proportion</h3>
<p><strong>y ∝ x ⇒ y = kx</strong><br><em>Key:</em> y = the dependent quantity; x = the independent quantity; k = the constant of proportionality, found from one known pair. Direct proportion means doubling x doubles y — a straight line through the origin.</p>
<p><strong>y ∝ 1/x ⇒ y = k/x, so k = xy</strong><br><em>Key:</em> the same symbols; k = the constant product. Inverse proportion means doubling x halves y — the curve never reaches either axis.</p>
<p><strong>y ∝ x² ⇒ y = kx²; y ∝ √x ⇒ y = k√x</strong><br><em>Key:</em> k = the constant, still found from one pair. The Extended paper's variation questions: write the proportionality, convert it to an equation with k, substitute the known pair, then answer the question asked.</p>
<p><strong>percentage change: new value = original × (1 ± r/100)</strong><br><em>Key:</em> r = the percentage rate; the plus sign is an increase, the minus a decrease. Two successive changes multiply their multipliers — a 10% rise then a 10% fall returns to 99% of the original, not 100%.</p>

<h3>Rates and compound measures</h3>
<p><strong>speed = distance/time, so distance = speed × time and time = distance/speed</strong><br><em>Key:</em> speed in m/s or km/h; distance in m or km; time in s or h — the units must match the speed before substituting. The triangle is just this equation rearranged three ways.</p>
<p><strong>average speed = total distance ÷ total time</strong><br><em>Key:</em> total distance = the sum of every leg; total time = the sum of every leg's time, including stops. Averaging the two speeds instead of the two journeys is the standard trap and gives a number that is too high.</p>
<p><strong>density = mass/volume, so mass = density × volume</strong><br><em>Key:</em> density in g/cm³ or kg/m³; mass in g or kg; volume in cm³ or m³. Convert one unit before dividing, because 1 g/cm³ = 1000 kg/m³.</p>
<p><strong>flow rate = volume/time</strong><br><em>Key:</em> volume in litres or m³; time in seconds or minutes; the rate in the matching unit per unit time. "How long to fill the tank" is this equation solved for time.</p>
<p><strong>1 m/s = 3.6 km/h</strong><br><em>Key:</em> the conversion factor between the two speed units: multiply m/s by 3.6 for km/h, divide km/h by 3.6 for m/s. Worth memorising, because a paper that gives the distance in km and the time in seconds is testing exactly this step.</p>`,
  },

  /* ── Mathematics AS: sequences and series ─────────────────────────────── */
  "4c83eff4-82e2-473c-83a2-dc959f0ca347": {
    slug: "maths-as-sequences",
    html: `${HEAD}
<h3>Arithmetic sequences and series</h3>
<p><strong>uₙ = a + (n − 1)d</strong><br><em>Key:</em> uₙ = the nth term; a = the first term, u₁; d = the common difference, uₙ₊₁ − uₙ; n = the term number, n ≥ 1. The (n − 1) is what makes the first term come out as a: no difference has been added yet.</p>
<p><strong>Sₙ = (n/2)(2a + (n − 1)d) = (n/2)(a + l)</strong><br><em>Key:</em> Sₙ = the sum of the first n terms; a = first term; d = common difference; l = the last term, uₙ; n = how many terms are added. The second form is Gauss's pairing: n/2 pairs each summing to a + l.</p>
<p><strong>uₙ = Sₙ − Sₙ₋₁</strong><br><em>Key:</em> Sₙ = the sum of the first n terms; Sₙ₋₁ = the sum of the first n − 1. Subtracting the two sums leaves only the nth term — the standard route when a question gives a formula for Sₙ and asks about the sequence.</p>

<h3>Geometric sequences and series</h3>
<p><strong>uₙ = a rⁿ⁻¹</strong><br><em>Key:</em> a = the first term; r = the common ratio, uₙ₊₁/uₙ; n = the term number. Each step multiplies by r, so the power is one less than the term number.</p>
<p><strong>Sₙ = a(1 − rⁿ)/(1 − r), r ≠ 1</strong><br><em>Key:</em> Sₙ = the sum of the first n terms; a = first term; r = common ratio; n = the number of terms. The equivalent form a(rⁿ − 1)/(r − 1) is the same number and is easier when r &gt; 1; r = 1 is excluded because the series is then na.</p>
<p><strong>S∞ = a/(1 − r), valid only for |r| &lt; 1</strong><br><em>Key:</em> S∞ = the sum to infinity; a = first term; r = common ratio. The convergence condition is part of the answer: if |r| ≥ 1 the terms do not shrink and the sum diverges, so no finite value exists.</p>
<p><strong>arⁿ⁻¹ = X ⇒ n = 1 + log(X/a)/log r</strong><br><em>Key:</em> a = first term; r = common ratio; X = the term whose position is wanted; n = that position. Taking logs of both sides is the only way to get n out of the exponent, and it is what "after how many years" questions require.</p>
<p><strong>uₙ = a(1 + p/100)ⁿ⁻¹</strong><br><em>Key:</em> p = the percentage change per period; a = the starting amount; n = the period number. A savings or depreciation model is a geometric sequence: appreciate with p &gt; 0, depreciate with p &lt; 0.</p>

<h3>Sigma notation and standard sums</h3>
<p><strong>Σ_{r=1}^{n} (A r + B) = A·n(n + 1)/2 + B n</strong><br><em>Key:</em> Σ = "sum of"; r = the index running from 1 to n; A, B = constants; n = the number of terms. Every arithmetic series written in sigma notation is this one line, which is why the formula is worth recognising rather than re-deriving.</p>
<p><strong>Σ_{r=1}^{n} r = n(n + 1)/2 and Σ_{r=1}^{n} r² = n(n + 1)(2n + 1)/6</strong><br><em>Key:</em> n = the last index; r = the index. The two standard results, used to sum any quadratic expression term by term.</p>
<p><strong>Σ_{r=1}^{n} (f(r) ± g(r)) = Σ f(r) ± Σ g(r) and Σ k f(r) = k Σ f(r)</strong><br><em>Key:</em> k = a constant; f, g = functions of the index; n = the number of terms. Sums are linear, which is what lets a polynomial be split into the standard sums above.</p>

<h3>Recurrence relations and the binomial series</h3>
<p><strong>uₙ₊₁ = f(uₙ), with u₁ given</strong><br><em>Key:</em> uₙ = the current term; uₙ₊₁ = the next term; f = the rule. A recurrence defines a sequence term by term instead of by a formula in n; to find u₁₀ you iterate, and to describe the long-term behaviour you look for a limit L satisfying L = f(L).</p>
<p><strong>(a + b)ⁿ = Σ_{r=0}^{n} C(n, r) aⁿ⁻ʳ bʳ</strong><br><em>Key:</em> a, b = the two terms of the bracket; n = the positive integer power; C(n, r) = n!/(r!(n − r)!), the binomial coefficient; r = the index of the b-power. The (r + 1)th term alone is C(n, r) aⁿ⁻ʳ bʳ, which is how "find the coefficient of x³" is answered without expanding anything.</p>`,
  },

  /* ── Mathematics A2: Integration II ───────────────────────────────────── */
  "42a00afc-901a-4089-8544-5d9011e1d6ca": {
    slug: "maths-a2-integration-ii",
    html: `${HEAD}
<h3>Standard integrals</h3>
<p><strong>∫ xⁿ dx = xⁿ⁺¹/(n + 1) + c, n ≠ −1</strong><br><em>Key:</em> x = the variable; n = the power, any real except −1; c = the constant of integration. The power rule: raise the power by one and divide by the new power. The excluded case n = −1 is the logarithm below.</p>
<p><strong>∫ (ax + b)ⁿ dx = (ax + b)ⁿ⁺¹/(a(n + 1)) + c, n ≠ −1</strong><br><em>Key:</em> a, b = constants with a ≠ 0; n = the power; c = constant. The extra 1/a is the chain rule undone — differentiating the answer brings it back.</p>
<p><strong>∫ (1/x) dx = ln|x| + c and ∫ f′(x)/f(x) dx = ln|f(x)| + c</strong><br><em>Key:</em> x = the variable, x ≠ 0; f(x) = any differentiable function with f(x) ≠ 0; ln = natural logarithm; c = constant. The modulus is not decoration: it keeps the antiderivative valid where the function is negative but still defined.</p>
<p><strong>∫ e^(ax) dx = (1/a)e^(ax) + c; ∫ sin(ax) dx = −(1/a)cos(ax) + c; ∫ cos(ax) dx = (1/a)sin(ax) + c; ∫ sec²(ax) dx = (1/a)tan(ax) + c</strong><br><em>Key:</em> a = constant frequency or rate, a ≠ 0; e = 2.71828…; c = constant. Each is its partner derivative run backwards, with the 1/a that the chain rule produced.</p>

<h3>Substitution and parts</h3>
<p><strong>∫ f(g(x)) g′(x) dx = ∫ f(u) du, with u = g(x)</strong><br><em>Key:</em> u = the substitution; g′(x) = du/dx; f = the outer function. Valid when the integrand contains a function and (a multiple of) its derivative — the cue to look for a substitution at all. For a definite integral, change the limits to u-values rather than converting back.</p>
<p><strong>∫ u (dv/dx) dx = uv − ∫ v (du/dx) dx</strong><br><em>Key:</em> u = the part differentiated; dv/dx = the part integrated; v = its integral. Choose u by the order that makes du/dx simpler — logarithm, then power, then exponential, then trigonometric. The formula transfers a hard integral into an easier one, so a wrong choice shows up as a worse integral, not as an error.</p>
<p><strong>(px + q)/((x − a)(x − b)) = A/(x − a) + B/(x − b)</strong><br><em>Key:</em> p, q = the numerator's coefficients; a, b = the roots of the denominator; A, B = constants found by substituting x = a and x = b. Partial fractions turn a rational function into pieces that integrate to logarithms. A repeated factor (x − a)² needs an A/(x − a) term as well as B/(x − a)².</p>

<h3>Definite integrals, areas and volumes</h3>
<p><strong>∫_{a}^{b} f(x) dx = F(b) − F(a)</strong><br><em>Key:</em> a, b = the lower and upper limits; f = the integrand; F = any antiderivative of f. The fundamental theorem: the definite integral is the antiderivative evaluated at the limits, and the constant c cancels.</p>
<p><strong>area between y₁ and y₂ from x = a to x = b = ∫_{a}^{b} (y₁ − y₂) dx</strong><br><em>Key:</em> y₁ = the upper curve; y₂ = the lower curve; a, b = the x-values of the intersections. Subtract in the order upper minus lower; where the curves cross, split the interval, or the signed areas cancel.</p>
<p><strong>V = π ∫_{a}^{b} y² dx</strong><br><em>Key:</em> V = the volume of the solid formed by rotating the curve about the x-axis; y = the curve's height; a, b = the limits along x; π = 3.14159…. Each thin slice is a disc of radius y, so the integrand is its area πy².</p>
<p><strong>dy/dx = f(x)g(y) ⇒ ∫ (1/g(y)) dy = ∫ f(x) dx</strong><br><em>Key:</em> x = the independent variable; y = the dependent variable; f, g = given functions. Separating the variables is the whole method for a first-order differential equation; the constant of integration is fixed by the given condition, and the answer is usually left implicit.</p>
<p><strong>∫_{a}^{b} f(x) dx ≈ (h/2)[y₀ + 2(y₁ + y₂ + … + yₙ₋₁) + yₙ], h = (b − a)/n</strong><br><em>Key:</em> h = the width of each strip; n = the number of strips; yᵢ = the function value at each ordinate; a, b = the limits. The trapezium rule: end ordinates once, interior ordinates twice. It overestimates for a curve that is concave up and underestimates for one that is concave down.</p>`,
  },
};

module.exports = { sections };
