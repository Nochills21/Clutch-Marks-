// Lesson inline symbol keys — batch 2 (26 lessons, keys where a real relation
// is stated). Each `find` is copied character-for-character from the dumped
// lesson body and must occur exactly once; `replace` is that same fragment
// with the key added inside its own container.
//
//   node .freebuff/apply-inline-keys.cjs .freebuff/content-lesson-keys-2.cjs
module.exports = {
  edits: {
    /* CS AS — information representation: bitmap file size */
    "b937d0e9-f679-4342-a264-d8e17f9947eb": [
      {
        find: "<li>Bitmap: pixels with colour depth (bits per pixel). File size = width × height × depth.</li>",
        replace:
          "<li>Bitmap: pixels with colour depth (bits per pixel). File size = width × height × depth. <em>Key:</em> width and height are counts of pixels; depth = bits used for each pixel; the product is in bits, so divide by 8 for bytes.</li>",
      },
    ],

    /* CS AS — programming and algorithms: recursive factorial */
    "4656c761-2e2d-4697-8558-bef6877764c6": [
      {
        find: "<p>A function calling itself with a base case. Factorial: f(0)=1, f(n)=n·f(n−1). Stack frames handle state.</p>",
        replace:
          "<p>A function calling itself with a base case. Factorial: f(0)=1, f(n)=n·f(n−1). Stack frames handle state. <em>Key:</em> f(n) = n factorial, the product 1 × 2 × … × n (no units); n = a non-negative integer; the base case f(0) = 1 is what stops the recursion.</p>",
      },
    ],

    /* CS A2 — data types: division hashing */
    "c258daa5-db1b-4160-a5b3-823fe5c91d8b": [
      {
        find: "<p>A common method is division hashing: Address = Key MOD TableSize. A good hash distributes keys evenly; load factor above roughly 70 percent degrades performance.</p>",
        replace:
          "<p>A common method is division hashing: Address = Key MOD TableSize. A good hash distributes keys evenly; load factor above roughly 70 percent degrades performance. <em>Key:</em> Address = the slot chosen, an index from 0 to TableSize − 1; Key = the value converted to an integer; TableSize = the number of slots — all three are counts, with no units.</p>",
      },
    ],

    /* Maths OL — solving equations: quadratic formula and completing the square */
    "4f3531f3-437b-417a-9979-8e9925cf13c5": [
      {
        find: "<p>x = (−b ± √(b² − 4ac)) / 2a.</p>",
        replace:
          "<p>x = (−b ± √(b² − 4ac)) / 2a. <em>Key:</em> a, b and c are the coefficients of ax² + bx + c = 0, with a ≠ 0 (no units); ± gives the two roots; the discriminant b² − 4ac decides how many real roots exist.</p>",
      },
      {
        find: "<p>x² + bx + c = (x + b/2)² − (b/2)² + c. x² − 6x + 5 = (x − 3)² − 4 → minimum at (3, −4). Use for turning points and for solving when factorising fails.</p>",
        replace:
          "<p>x² + bx + c = (x + b/2)² − (b/2)² + c. x² − 6x + 5 = (x − 3)² − 4 → minimum at (3, −4). Use for turning points and for solving when factorising fails. <em>Key:</em> b and c are the coefficients of the quadratic (no units); the squared bracket makes the turning point readable straight off — the graph is at its lowest or highest where x + b/2 = 0.</p>",
      },
    ],

    /* Maths OL — graphs of linear functions: gradient and y = mx + c */
    "0c1e15ee-d6e9-428a-b3d9-338cbfb88985": [
      {
        find: "<li>Gradient m = (y₂ − y₁)/(x₂ − x₁).</li>",
        replace:
          "<li>Gradient m = (y₂ − y₁)/(x₂ − x₁). <em>Key:</em> m = gradient, the change in y for every 1 unit of x; (x₁, y₁) and (x₂, y₂) = any two points on the line, taken in the same order so m comes out positive when the line rises.</li>",
      },
      {
        find: "<li>y = mx + c; parallel ⇒ equal m; perpendicular ⇒ m₁m₂ = −1.</li>",
        replace:
          "<li>y = mx + c; parallel ⇒ equal m; perpendicular ⇒ m₁m₂ = −1. <em>Key:</em> y = the dependent variable; x = the independent variable; m = gradient; c = the y-coordinate where the line crosses the y-axis; m₁ and m₂ = the gradients of the two perpendicular lines.</li>",
      },
    ],

    /* Maths OL — sequences and functions */
    "13e630d4-2daa-414f-95d2-7b873d1e311f": [
      {
        find: "<p>nth term = a + (n − 1)d. 5, 8, 11, … → 3n + 2. Check n = 1, 2, 3.</p>",
        replace:
          "<p>nth term = a + (n − 1)d. 5, 8, 11, … → 3n + 2. Check n = 1, 2, 3. <em>Key:</em> a = the first term; d = the common difference, the fixed step between terms; n = the position of the term, counted from 1.</p>",
      },
      {
        find: "<p>Second difference = 2a → an² + bn + c. 3, 8, 15, 24 … has second difference 2 → n² + bn + c; subtract n² → 2, 4, 6, 8 → 2n; so nth term = n² + 2n.</p>",
        replace:
          "<p>Second difference = 2a → an² + bn + c. 3, 8, 15, 24 … has second difference 2 → n² + bn + c; subtract n² → 2, 4, 6, 8 → 2n; so nth term = n² + 2n. <em>Key:</em> a, b and c = the coefficients to be found, with a read straight from the second difference; n = the term position.</p>",
      },
      {
        find: "<p>Even/odd, triangular (½n(n+1)), squares, cubes, Fibonacci-type (each term = sum of previous two), geometric (×r).</p>",
        replace:
          "<p>Even/odd, triangular (½n(n+1)), squares, cubes, Fibonacci-type (each term = sum of previous two), geometric (×r). <em>Key:</em> n = the term position, so ½n(n+1) is the nth triangular number; r = the common ratio of a geometric sequence, the factor every term is multiplied by.</p>",
      },
    ],

    /* Maths OL — angles and polygons */
    "a51c590f-bb3c-4068-8692-ea4fb7bf34bf": [
      {
        find: "<p>Interior angle sum = (n − 2) × 180°. Regular polygon: exterior = 360° ÷ n; interior = 180° − exterior.</p>",
        replace:
          "<p>Interior angle sum = (n − 2) × 180°. Regular polygon: exterior = 360° ÷ n; interior = 180° − exterior. <em>Key:</em> n = the number of sides (a count); every result is an angle in degrees.</p>",
      },
    ],

    /* Maths OL — congruence and similarity: scale factor */
    "60b3ef8c-f51b-4e2d-a480-870f37ba35dd": [
      {
        find: "<p>Equal angles + sides in proportion. Scale factor k = corresponding new ÷ old.</p>",
        replace:
          "<p>Equal angles + sides in proportion. Scale factor k = corresponding new ÷ old. <em>Key:</em> k = scale factor, a length divided by a length so it has no unit; lengths scale by k, areas by k² and volumes by k³.</p>",
      },
    ],

    /* Maths OL — mensuration: area formulae, then the solids block */
    "45f3db7d-0146-46bb-9ec0-18e14cfc53bb": [
      {
        find: "<li>Triangle ½bh; trapezium ½(a + b)h; parallelogram bh.</li>",
        replace:
          "<li>Triangle ½bh; trapezium ½(a + b)h; parallelogram bh. <em>Key:</em> b = base and h = the perpendicular height for the triangle and parallelogram; a and b are the two parallel sides of the trapezium; all lengths share one unit, so every area comes out in square units.</li>",
      },
      {
        find: "<li>Circle A = πr²; sector area = (θ/360)πr²; arc = (θ/360) × 2πr.</li>",
        replace:
          "<li>Circle A = πr²; sector area = (θ/360)πr²; arc = (θ/360) × 2πr. <em>Key:</em> r = radius (same length unit as the arc); θ = the angle at the centre in degrees; A is in square units, while the arc stays in the length unit of r.</li>",
      },
      {
        find: "<li>Sphere V = (4/3)πr³; SA = 4πr².</li>\n</ul>",
        replace:
          "<li>Sphere V = (4/3)πr³; SA = 4πr².</li>\n</ul>\n<p><em>Key:</em> for every solid in this list: r = radius, h = vertical height, l = slant height (with l² = r² + h² for a cone), b = a base length; V comes out in cubic units and SA in square units of that same length.</p>",
      },
    ],

    /* Maths OL — arithmetic, place value and estimation: bounds */
    "4ed27a6e-c5b4-42d5-95b7-a9f4dcced29e": [
      {
        find: "<p>Measured to nearest u: UB = +u/2, LB = −u/2. Division p/q: max = UB<sub>p</sub> ÷ LB<sub>q</sub>.</p>",
        replace:
          "<p>Measured to nearest u: UB = +u/2, LB = −u/2. Division p/q: max = UB<sub>p</sub> ÷ LB<sub>q</sub>. <em>Key:</em> u = the unit the reading was rounded to (the same unit as the measurement); UB = upper bound; LB = lower bound; the subscripts p and q say which quantity each bound belongs to.</p>",
      },
    ],

    /* Maths OL — fractions, decimals and percentages: interest formulae */
    "9784060f-55ed-42cc-b482-92014f361801": [
      {
        find: "<p>Multiplierⁿ. Simple interest I = Prt/100 vs compound P(1 + r/100)ⁿ.</p>",
        replace:
          "<p>Multiplierⁿ. Simple interest I = Prt/100 vs compound P(1 + r/100)ⁿ. <em>Key:</em> I = simple interest earned (in the money unit); P = principal, the starting amount; r = the annual rate in per cent; t = time in years; n = the number of compounding periods.</p>",
      },
    ],

    /* Maths OL — indices and standard form: the index laws */
    "373f3c1c-63cb-4723-abb6-784101d12713": [
      {
        find: "<li>a⁰ = 1; a⁻ⁿ = 1/aⁿ; a^(1/n) = ⁿ√a; a^(m/n) = (ⁿ√a)ᵐ</li>",
        replace:
          "<li>a⁰ = 1; a⁻ⁿ = 1/aⁿ; a^(1/n) = ⁿ√a; a^(m/n) = (ⁿ√a)ᵐ <em>Key:</em> a = the base, any non-zero number; m and n = integers, with ⁿ√a meaning the nth root of a; these laws hold for every non-zero base, positive or negative.</li>",
      },
    ],

    /* Maths OL — ratio, rate and proportion: direct and inverse */
    "968dbd42-7dea-442d-b6ff-3c25b42d9d65": [
      {
        find: "<p>y = kx. Best method: find the unit value, then multiply.</p>",
        replace:
          "<p>y = kx. Best method: find the unit value, then multiply. <em>Key:</em> y = the quantity that grows; x = the quantity it grows with; k = the constant of proportionality, found from any one matching pair of values and carrying y's unit per unit of x.</p>",
      },
      {
        find: "<p>y = k/x (product constant). 4 workers 6 days ⇒ 24 worker-days ⇒ 8 workers take 3 days. Square-law: y ∝ 1/x².</p>",
        replace:
          "<p>y = k/x (product constant). 4 workers 6 days ⇒ 24 worker-days ⇒ 8 workers take 3 days. Square-law: y ∝ 1/x². <em>Key:</em> y and x = the two inversely related quantities; k = the fixed product, so x × y never changes; under a square law it is y × x² that stays constant.</p>",
      },
    ],

    /* Maths OL — data handling: mean, quartiles, frequency density */
    "bc97ec75-41aa-4964-b2a6-5b6bd1e75c95": [
      {
        find: "<li>Mean = Σfx/Σf from frequency tables. Median = middle value (ordered data). Mode = most frequent. Range = max − min.</li>",
        replace:
          "<li>Mean = Σfx/Σf from frequency tables. Median = middle value (ordered data). Mode = most frequent. Range = max − min. <em>Key:</em> f = the frequency of each value; x = the value itself, or the class midpoint; Σ means add them all up, so the mean carries the unit of x.</li>",
      },
      {
        find: "<p>Q₁ at n/4, Q₃ at 3n/4 (position); IQR = Q₃ − Q₁ — less affected by outliers than the range.</p>",
        replace:
          "<p>Q₁ at n/4, Q₃ at 3n/4 (position); IQR = Q₃ − Q₁ — less affected by outliers than the range. <em>Key:</em> n = the number of data items (a count); Q₁ and Q₃ = the lower and upper quartiles, in the same unit as the data; the IQR shares that unit.</p>",
      },
      {
        find: "<p>Bar <em>area</em> ∝ frequency: FD = frequency ÷ class width. Recover frequencies as FD × width; unequal widths need FDs on the axis.</p>",
        replace:
          "<p>Bar <em>area</em> ∝ frequency: FD = frequency ÷ class width. Recover frequencies as FD × width; unequal widths need FDs on the axis. <em>Key:</em> FD = frequency density, the count per one unit of class width; frequency is a plain count; class width is in the units the data was measured in.</p>",
      },
    ],

    /* Maths OL — probability: the basic rule and conditional probability */
    "8bac1568-0c89-4ae5-bf04-9eb2a66c58f6": [
      {
        find: "<p>P(event) = favourable/total; 0 ≤ P ≤ 1; P(not A) = 1 − P(A). Probabilities of a complete set sum to 1 — use to find a missing probability.</p>",
        replace:
          "<p>P(event) = favourable/total; 0 ≤ P ≤ 1; P(not A) = 1 − P(A). Probabilities of a complete set sum to 1 — use to find a missing probability. <em>Key:</em> P(event) = the probability of that event, a number between 0 and 1 with no unit; A = any event in the set being described.</p>",
      },
      {
        find: "<p>P(A|B) = P(A ∩ B)/P(B). From tree diagrams it is the \"given the first branch happened\" re-weighting.</p>",
        replace:
          "<p>P(A|B) = P(A ∩ B)/P(B). From tree diagrams it is the \"given the first branch happened\" re-weighting. <em>Key:</em> P(A|B) = the probability of A once B is known to have happened; P(A ∩ B) = the probability that both occur; P(B) = the probability of the given event, which must not be zero.</p>",
      },
    ],

    /* Maths OL — transformations and vectors */
    "e3f0c7e3-2a18-4393-b074-dc0d9e9bbdd4": [
      {
        find: "<li>Column vector (x; y); magnitude = √(x² + y²).</li>",
        replace:
          "<li>Column vector (x; y); magnitude = √(x² + y²). <em>Key:</em> x = the horizontal displacement and y = the vertical displacement, both in the same unit as the axes; the magnitude is a length in that unit.</li>",
      },
      {
        find: "<li>Position vectors: AB = OB − OA.</li>",
        replace:
          "<li>Position vectors: AB = OB − OA. <em>Key:</em> AB = the vector running from A to B; OA and OB = the vectors from the origin O to each point; subtracting gives the journey that starts at A and ends at B.</li>",
      },
      {
        find: "<p>Midpoint of AB = ½(a + b). Prove collinearity: show AB = k·BC (shared point). Prove parallelogram: AB = DC. Use route paths: AC = AB + BC.</p>",
        replace:
          "<p>Midpoint of AB = ½(a + b). Prove collinearity: show AB = k·BC (shared point). Prove parallelogram: AB = DC. Use route paths: AC = AB + BC. <em>Key:</em> a and b = the position vectors of the two endpoints; k = any scalar multiplier, a pure number that keeps AB parallel to BC; AB, BC, AC, DC are all vectors.</p>",
      },
    ],

    /* Maths OL — right-angled trigonometry: the three ratios */
    "cf0ed13b-da18-48db-a334-e7fe98b90c9f": [
      {
        find: "<li>sin θ = opp/hyp; cos θ = adj/hyp; tan θ = opp/adj.</li>",
        replace:
          "<li>sin θ = opp/hyp; cos θ = adj/hyp; tan θ = opp/adj. <em>Key:</em> θ = the marked angle (in degrees or radians); opp = the side opposite θ; adj = the side next to θ that is not the hypotenuse; hyp = the longest side, opposite the right angle — all three are lengths, so each ratio has no unit.</li>",
      },
    ],

    /* Maths OL — sine rule, cosine rule and triangle area */
    "c97ea2aa-351b-41d2-a1a2-f6d62e260450": [
      {
        find: "<p>A = ½ab sin C (C = included angle between sides a and b).</p>",
        replace:
          "<p>A = ½ab sin C (C = included angle between sides a and b). <em>Key:</em> A = the area of the triangle, in square units of the length used; a and b = the two sides enclosing angle C; C = that included angle, taken in degrees.</p>",
      },
      {
        find: "<p>a/sin A = b/sin B = c/sin C. Use when a matching angle–side pair is known.</p>",
        replace:
          "<p>a/sin A = b/sin B = c/sin C. Use when a matching angle–side pair is known. <em>Key:</em> a, b and c = the sides of the triangle; A, B and C = the angles opposite them; the common ratio carries the unit of length, because sin of an angle has no unit.</p>",
      },
      {
        find: "<p>a² = b² + c² − 2bc cos A. Use with two sides + included angle, or all three sides (then cos A = (b² + c² − a²)/(2bc)).</p>",
        replace:
          "<p>a² = b² + c² − 2bc cos A. Use with two sides + included angle, or all three sides (then cos A = (b² + c² − a²)/(2bc)). <em>Key:</em> a = the side opposite angle A; b and c = the other two sides; cos A takes A in degrees; every term is a length squared, so the square root at the end returns a length.</p>",
      },
    ],
  },
};