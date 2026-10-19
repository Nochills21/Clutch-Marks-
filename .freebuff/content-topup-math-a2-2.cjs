// Top-up module: Mathematics A2 — coordinate-geometry (circles),
// exponentials-and-logarithms (calculus), numerical-methods.
// Arithmetic verified: center (3,-2) r=5; tangent 3x+4y=25; |c|=5; tangent grad -4/3;
// r=5 for x^2+y^2-10x+2y+1; tangent length sqrt(169-25)=12; distance 10/5=2;
// d/dx 3e^(2x)=6e^(2x); int e^(3x)=e^(3x)/3; ln(x^2)=4 -> x=e^2; N=2000e^0.5=3297;
// Newton x1=2.67 and 2.17; x1=3.25; bisection widths 2->0.25 in 3 steps; 7 halvings.
module.exports = {
  subject: "mathematics",
  level: "A2",
  topics: [
    {
      slug: "coordinate-geometry",
      notes: `# Coordinate geometry of circles

At A2, coordinate geometry centres on the circle: its equation, tangents, normals and the interaction with straight lines.

### Circle equations

- Centre (a, b), radius r: (x - a)^2 + (y - b)^2 = r^2.
- General form x^2 + y^2 + 2gx + 2fy + c = 0 has centre (-g, -f) and radius sqrt(g^2 + f^2 - c).
- Always complete the square to find centre and radius.

### Tangents and normals

- The tangent at a point is perpendicular to the radius at that point: gradient of tangent = -1 / (gradient of radius).
- The normal at a point passes through the centre (it is the radius line extended).
- For the circle x^2 + y^2 = r^2, the tangent at (x1, y1) is x x1 + y y1 = r^2.

### Line and circle

- Substituting a line into the circle gives a quadratic: two roots = two intersections (secant), one repeated root = tangent, no real roots = no intersection.
- Tangency condition: the perpendicular distance from the centre to the line equals the radius.
- Distance from (x0, y0) to ax + by + c = 0 is |ax0 + by0 + c| / sqrt(a^2 + b^2).

### Tangent from an external point

The length of a tangent from an external point P to a circle is sqrt(d^2 - r^2), where d is the distance from P to the centre.`,
      exam: [
        ["Find the centre and radius of the circle x^2 + y^2 - 6x + 4y - 12 = 0.", ["Centre (3, -2), radius 5", "Centre (-3, 2), radius 5", "Centre (3, -2), radius 25", "Centre (6, -4), radius 5"], 0, "Complete the square: (x - 3)^2 + (y + 2)^2 = 9 + 4 + 12 = 25, so the centre is (3, -2) and the radius is 5."],
        ["Find the equation of the tangent to the circle x^2 + y^2 = 25 at the point (3, 4).", ["4x + 3y = 25", "3x - 4y = 25", "3x + 4y = 7", "3x + 4y = 25"], 3, "For x^2 + y^2 = r^2 the tangent at (x1, y1) is x x1 + y y1 = r^2, giving 3x + 4y = 25."],
        ["The line y = 2x + c is tangent to the circle x^2 + y^2 = 5. Find the possible values of c.", ["c = 5 only", "c = plus or minus sqrt(5)", "c = plus or minus 5", "c = plus or minus 10"], 2, "Tangency needs distance from the origin to the line equal to sqrt(5): |c| / sqrt(1 + 4) = sqrt(5), so |c| = 5 and c = plus or minus 5."],
        ["Find the gradient of the tangent to the circle x^2 + y^2 = 25 at the point (4, 3).", ["-3/4", "3/4", "4/3", "-4/3"], 3, "The radius to (4, 3) has gradient 3/4. The tangent is perpendicular, so its gradient is -4/3."],
        ["Find the centre and radius of the circle (x + 1)^2 + (y - 4)^2 = 20.", ["Centre (-1, 4), radius 2sqrt(5)", "Centre (1, -4), radius 2sqrt(5)", "Centre (-1, 4), radius 10", "Centre (1, 4), radius 2sqrt(5)"], 2, "Reading directly: centre (-1, 4) and radius sqrt(20) = 2sqrt(5) (about 4.47)."],
      ],
      extra: [
        ["Find the radius of the circle x^2 + y^2 - 10x + 2y + 1 = 0.", ["25", "sqrt(26)", "5", "10"], 2, "Centre (5, -1); radius^2 = 25 + 1 - 1 = 25, so the radius is 5."],
        ["Where does the point (1, 2) lie relative to the circle centre (1, 1) radius 3?", ["on the circle", "outside", "inside", "at the centre"], 2, "The distance from the centre is 1, which is less than the radius 3, so the point is inside."],
        ["Find the gradient of the radius from the origin to the point (3, 4).", ["3/4", "-4/3", "4/3", "-3/4"], 2, "Gradient = rise/run = 4/3."],
        ["Find the equation of the circle with centre (0, 0) passing through (6, 8).", ["x^2 + y^2 = 20", "x^2 + y^2 = 10", "x^2 + y^2 = 100", "(x - 6)^2 + (y - 8)^2 = 100"], 2, "The radius is the distance sqrt(36 + 64) = 10, so the equation is x^2 + y^2 = 100."],
        ["How many times does the line y = x + 10 meet the circle x^2 + y^2 = 4?", ["2", "1", "0", "4"], 2, "The distance from the origin to the line is 10/sqrt(2) = 7.07, which exceeds the radius 2, so there are no intersections."],
        ["Find the length of the tangent from the point (5, 12) to the circle x^2 + y^2 = 25.", ["13", "5", "12", "17"], 2, "Distance from (5, 12) to the centre is sqrt(25 + 144) = 13. Tangent length = sqrt(13^2 - 5^2) = sqrt(144) = 12."],
        ["Find the perpendicular distance from the origin to the line 3x + 4y = 10.", ["10", "2", "5", "0.5"], 1, "|3(0) + 4(0) - 10| / sqrt(9 + 16) = 10/5 = 2."],
        ["Find the centre of the circle x^2 + y^2 + 4x - 6y + 4 = 0.", ["(2, -3)", "(-2, 3)", "(-4, 6)", "(4, -6)"], 1, "With 2g = 4 and 2f = -6: centre (-g, -f) = (-2, 3)."],
        ["What is the gradient of the tangent to x^2 + y^2 = 25 at the point (0, 5)?", ["1", "0", "undefined", "-1"], 1, "At (0, 5) the radius is vertical, so the tangent is horizontal with gradient 0."],
        ["Which is the equation of the tangent to x^2 + y^2 = r^2 at (x1, y1)?", ["x + y = r^2", "x1 + y1 = r^2", "x x1 + y y1 = r^2", "x x1 - y y1 = r^2"], 2, "The tangent at (x1, y1) on the circle centred at the origin is x x1 + y y1 = r^2."],
      ],
      cards: [
        ["Circle equation", "(x - a)^2 + (y - b)^2 = r^2, centre (a, b), radius r."],
        ["General form", "x^2 + y^2 + 2gx + 2fy + c = 0: centre (-g, -f), radius sqrt(g^2 + f^2 - c)."],
        ["Completing the square", "The reliable route from general form to centre and radius."],
        ["Tangent gradient", "Perpendicular to the radius: m_tangent = -1 / m_radius."],
        ["Normal at a point", "Passes through the centre; it is the radius extended."],
        ["Tangent to x^2 + y^2 = r^2", "At (x1, y1): x x1 + y y1 = r^2."],
        ["Tangency condition", "Perpendicular distance from centre to line equals the radius."],
        ["Distance point to line", "|ax0 + by0 + c| / sqrt(a^2 + b^2)."],
        ["Line meets circle", "Quadratic in one variable: 2 roots = secant, 1 = tangent, 0 = miss."],
        ["Tangent length", "From external point: sqrt(d^2 - r^2), d = distance to centre."],
        ["Chord midpoint", "The line from the centre perpendicular to a chord bisects it."],
        ["Radius through (x1, y1)", "Gradient (y1 - b)/(x1 - a) from centre (a, b)."],
        ["Circle through 3 points", "Substitute the points into the general form and solve for g, f, c."],
        ["Symmetry", "A circle is symmetric about any diameter; reflections map the circle to itself."],
        ["Intersection check", "Substitute the line into the circle and inspect the discriminant."],
      ],
    },
    {
      slug: "exponentials-and-logarithms",
      notes: `# Exponentials and logarithms in calculus and modelling

The A2 work on e^x and ln x adds calculus and rates of change to the AS algebraic toolkit.

### Differentiation and integration

- d/dx (e^(kx)) = k e^(kx); so d/dx (e^x) = e^x.
- d/dx (ln x) = 1/x; by the chain rule d/dx (ln(ax + b)) = a/(ax + b).
- d/dx (ln(kx)) = 1/x for any constant k > 0.
- The integral of e^(kx) is (1/k) e^(kx) + c; the integral of 1/x is ln x + c (x > 0).
- Product rule with logs: d/dx (x ln x) = ln x + 1.

### Solving equations

- ln(x^2) = 4 gives x^2 = e^4, so x = e^2 or x = -e^2 (check the domain).
- Log equations combine: ln a + ln b = ln(ab); always reject solutions outside the domain.
- ln(x) = 1 + ln(3) gives ln x = ln(3e), so x = 3e.

### Exponential growth and decay

- If dN/dt = kN then N = N0 e^(kt): the rate of change is proportional to the quantity itself.
- Examples: population growth, radioactive decay, cooling, compound interest.
- Doubling time = ln 2 / k; half-life = ln(0.5) / k.

### Graphs and limits

- e^x grows without bound; e^(-x) tends to 0 as x increases (asymptote y = 0).
- The gradient of e^x at x = 0 is 1.
- ln x grows slowly; its graph crosses the x-axis at (1, 0).`,
      exam: [
        ["Differentiate y = 3e^(2x).", ["3e^(2x)", "3e^(x)", "6e^(2x)", "3e^(2x) + c"], 2, "d/dx (e^(2x)) = 2e^(2x), so d/dx (3e^(2x)) = 6e^(2x)."],
        ["Integrate e^(3x) with respect to x.", ["3e^(3x) + c", "(1/3)e^(x) + c", "e^(3x) + c", "(1/3)e^(3x) + c"], 3, "The integral of e^(kx) is (1/k)e^(kx) + c, so with k = 3 the answer is (1/3)e^(3x) + c."],
        ["Differentiate y = ln(5x).", ["1/(5x)", "1/x", "5/x", "ln(5) + 1/x"], 1, "ln(5x) = ln 5 + ln x, and the constant ln 5 differentiates to zero, giving 1/x."],
        ["Solve ln(x^2) = 4, giving the positive solution.", ["e^4", "e^2", "2e", "4"], 1, "x^2 = e^4, so x = e^2 (or x = -e^2; the positive solution is e^2, about 7.39)."],
        ["A population grows with dN/dt = 0.05N and N = 2000 at t = 0. Find N at t = 10, to 3 s.f.", ["2750", "3000", "3297", "3644"], 2, "N = 2000 e^(0.05 x 10) = 2000 e^0.5 = 2000 x 1.6487 = 3297 (3 s.f.)."],
      ],
      extra: [
        ["Differentiate e^(-x).", ["e^(-x)", "-e^(-x)", "-x e^(-x)", "e^x"], 1, "With k = -1: d/dx (e^(-x)) = -e^(-x)."],
        ["Integrate 1/x for x > 0.", ["ln x + c", "1/x + c", "-1/x^2 + c", "x ln x + c"], 0, "The antiderivative of 1/x is ln x + c for x > 0."],
        ["Solve e^(2x) = e^5.", ["2.5", "5", "10", "1"], 0, "Equate exponents: 2x = 5, so x = 2.5."],
        ["Simplify ln(e^(3x)).", ["3", "x/3", "3e^x", "3x"], 3, "ln and exp are inverse functions, so ln(e^(3x)) = 3x."],
        ["Differentiate y = x ln x.", ["1/x + 1", "ln x", "1/x", "ln x + 1"], 3, "Product rule: 1 x ln x + x x (1/x) = ln x + 1."],
        ["Solve log base 2 of x + log base 2 of (x - 2) = 3.", ["2", "4", "8", "-2"], 1, "Combine logs: x(x - 2) = 2^3 = 8, so x^2 - 2x - 8 = 0, giving x = 4 or x = -2; the domain x > 2 leaves x = 4."],
        ["What is the asymptote of y = e^(-x)?", ["x = 0", "y = 0", "y = 1", "There is no asymptote"], 1, "As x -> infinity, e^(-x) -> 0, so the horizontal asymptote is y = 0."],
        ["Evaluate the integral of e^x from 0 to ln 2.", ["ln 2", "2", "1", "3"], 2, "[e^x] from 0 to ln 2 = e^(ln 2) - e^0 = 2 - 1 = 1."],
        ["Solve ln x = 1 + ln 3.", ["e + 3", "3e", "3 + 1", "e^3"], 1, "ln x = ln e + ln 3 = ln(3e), so x = 3e."],
        ["What is the gradient of y = e^x at x = 0?", ["1", "0", "e", "1/e"], 0, "dy/dx = e^x, and e^0 = 1."],
      ],
      cards: [
        ["d/dx e^(kx)", "k e^(kx)."],
        ["d/dx ln x", "1/x (x > 0)."],
        ["d/dx ln(ax + b)", "a/(ax + b)."],
        ["Integral of e^(kx)", "(1/k) e^(kx) + c."],
        ["Integral of 1/x", "ln x + c (x > 0)."],
        ["d/dx (x ln x)", "ln x + 1 (product rule)."],
        ["Proportional growth", "dN/dt = kN solves to N = N0 e^(kt)."],
        ["Doubling time", "ln 2 / k."],
        ["Half-life", "ln(0.5) / k."],
        ["ln(x^2) = 4", "x^2 = e^4 so x = plus or minus e^2 (check the domain)."],
        ["Log equation strategy", "Combine logs first, exponentiate second, reject out-of-domain roots."],
        ["Asymptote of e^(-x)", "y = 0 as x -> infinity."],
        ["Gradient of e^x at 0", "1."],
        ["ln x = 1 + ln 3", "x = 3e."],
        ["Domain rules", "ln needs positive arguments; e^x is defined everywhere."],
      ],
    },
    {
      slug: "numerical-methods",
      notes: `# Numerical methods

When an equation cannot be solved algebraically, numerical methods locate roots to required accuracy. You must know three families: change of sign, fixed-point iteration and Newton-Raphson.

### Change of sign (decimal search)

If f is continuous and f(a) and f(b) have opposite signs, there is a root in (a, b). Bisection repeatedly halves the interval; a decimal search tests x = 1.0, 1.1, 1.2, ... until the sign changes. The method fails for repeated roots (the graph touches the axis without crossing).

### Fixed-point iteration

Rearrange f(x) = 0 into x = g(x), then iterate x_(n+1) = g(x_n). Near the root the iteration converges when |g'(x)| < 1 at the root; if |g'(x)| > 1 it diverges. The iteration staircase/cobweb diagrams show this.

### Newton-Raphson

x_(n+1) = x_n - f(x_n) / f'(x_n).

It uses the tangent at the current estimate and converges quadratically (fast), but it can fail: if f'(x_n) = 0 the tangent is vertical, and a poor starting point can send the sequence to a different root or into a loop.

### Accuracy and error bounds

- A sign change over an interval of width w brackets the root to within w; quoting the midpoint gives error at most w/2.
- Iterate until successive values agree to the required accuracy (e.g. 3 s.f.).
- Always substitute the final value back into f to confirm f(root) is close to 0.

### Choosing a method

- Bisection: guaranteed on a bracketed interval but slow.
- Newton-Raphson: fast, needs f' and a good starting value.
- Iteration: simple, but convergence depends on the rearrangement.`,
      exam: [
        ["The function f(x) = x^3 - 2x - 5 has one real root. In which interval does it lie?", ["(1, 2)", "(2, 3)", "(3, 4)", "(0, 1)"], 1, "f(2) = 8 - 4 - 5 = -1 and f(3) = 27 - 6 - 5 = 16. The sign change brackets a root in (2, 3)."],
        ["Use one step of Newton-Raphson on f(x) = x^2 - 7 from x0 = 3. Find x1 to 3 s.f.", ["2.60", "2.71", "2.67", "2.50"], 2, "x1 = x0 - f(x0)/f'(x0) = 3 - (9 - 7)/6 = 3 - 0.3333 = 2.67 (3 s.f.)."],
        ["An iteration for sqrt(5) is x_(n+1) = (2x_n + 5/x_n)/2. Starting from x0 = 2, find x1.", ["2.75", "3.25", "3.50", "2.50"], 1, "x1 = (2(2) + 5/2)/2 = (4 + 2.5)/2 = 3.25."],
        ["Which formula defines the Newton-Raphson iteration?", ["x_(n+1) = x_n - f(x_n)/f'(x_n)", "x_(n+1) = x_n + f(x_n)/f'(x_n)", "x_(n+1) = x_n - f'(x_n)/f(x_n)", "x_(n+1) = x_n/2 + f(x_n)"], 0, "Newton-Raphson subtracts f/f' from the current estimate — the x-intercept of the tangent."],
        ["A root is bracketed by the sign change over (1.41, 1.42). If quoted as the midpoint 1.415, what is the maximum error?", ["plus or minus 0.005", "plus or minus 0.05", "plus or minus 0.01", "plus or minus 0.1"], 0, "The interval has width 0.01, so the midpoint is at most 0.005 from either end."],
      ],
      extra: [
        ["What condition guarantees a root in (a, b) for the change of sign method?", ["f(a) and f(b) have opposite signs", "f(a) = f(b)", "f(a) > 0", "f'(a) = 0"], 0, "For a continuous f, f(a)f(b) < 0 guarantees at least one root in (a, b)."],
        ["Apply one Newton-Raphson step to f(x) = x^2 - 4 from x0 = 3. Find x1 to 3 s.f.", ["2.50", "2.17", "2.00", "3.83"], 1, "x1 = 3 - (9 - 4)/6 = 3 - 0.8333 = 2.17 (3 s.f.)."],
        ["When does the Newton-Raphson iteration fail immediately?", ["f'(x_n) = 0", "f(x_n) = 0", "x_n = 0", "f''(x) = 0"], 0, "A zero derivative makes the tangent vertical and the fraction f/f' undefined."],
        ["The iteration x_(n+1) = g(x_n) converges to the root when:", ["|g'(x)| < 1 near the root", "|g'(x)| > 1 near the root", "g(x) = x", "g'(x) = 1"], 0, "Convergence of fixed-point iteration needs |g'(root)| < 1; otherwise the iterates spiral away."],
        ["An interval (1, 3) is bisected 3 times. What is the final interval width?", ["0.5", "0.25", "0.125", "1"], 1, "Each bisection halves the width: 2 x (1/2)^3 = 0.25."],
        ["The function f(x) = x^3 - x - 1 has a root in which interval?", ["(0, 1)", "(1, 2)", "(2, 3)", "(-1, 0)"], 1, "f(1) = -1 and f(2) = 5, so a sign change brackets a root in (1, 2)."],
        ["The iteration x_(n+1) = cos(x_n) (radians) converges to approximately:", ["1.000", "0.739", "0.500", "1.571"], 1, "The fixed point of cos x is the Dottie number, about 0.7391."],
        ["How many bisections halve an interval of width 1 to below 0.01?", ["5", "6", "7", "10"], 2, "2^-n < 0.01 needs n = 7 (2^-7 = 0.0078 < 0.01)."],
        ["A decimal search locates a root by detecting:", ["a change of sign", "a zero gradient", "a local maximum", "a vertical tangent"], 0, "The method scans values and brackets the root where the sign of f changes."],
        ["Which method is guaranteed to converge on any interval where a sign change occurs?", ["Bisection", "Newton-Raphson", "Fixed-point iteration", "Rearrangement"], 0, "Bisection always converges (slowly) on a bracketed interval; the others can diverge or fail."],
      ],
      cards: [
        ["Change of sign", "f(a)f(b) < 0 with f continuous guarantees a root in (a, b)."],
        ["Bisection", "Halve the bracket each step; guaranteed but slow."],
        ["Decimal search", "Scan in fixed steps until the sign changes."],
        ["Repeated roots", "Change of sign misses roots where the curve only touches the axis."],
        ["Fixed-point iteration", "Rearrange to x = g(x), iterate x_(n+1) = g(x_n)."],
        ["Iteration convergence", "Converges when |g'(root)| < 1; diverges when |g'(root)| > 1."],
        ["Newton-Raphson", "x_(n+1) = x_n - f(x_n)/f'(x_n); uses the tangent."],
        ["Newton failure", "f'(x_n) = 0 (vertical tangent) or a poor starting value."],
        ["Convergence speed", "Newton-Raphson is quadratic; bisection is linear."],
        ["Error bound", "Bracket of width w gives error at most w/2 at the midpoint."],
        ["Accuracy check", "Iterate until successive iterates agree to the required accuracy."],
        ["Verification", "Substitute the final root estimate back into f."],
        ["Domain care", "Iterations with logs or roots must stay inside the domain."],
        ["Starting value", "A close x0 matters most for Newton-Raphson."],
        ["Choosing a method", "Guaranteed: bisection. Fast: Newton. Simple: iteration."],
      ],
    },
  ],
};
