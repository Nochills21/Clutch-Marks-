// Pure 4 notes. Every worked number here was checked by hand.
module.exports = [
  {
    file: 'p4-algebra-and-binomial',
    eyebrow: 'Pearson Edexcel International Pure Mathematics 4, sections 2 and 4',
    title: 'Pure 4: algebra and binomial expansion',
    syllabus: 'Pearson Edexcel International Pure Mathematics 4, sections 2 and 4: partial fractions and the binomial series.',
    sections: [
      {
        h: 'Partial fractions: distinct linear factors',
        why: 'A fraction whose denominator factorises into distinct linear factors splits into a sum of simpler fractions, one per factor.',
        paras: [
          'Partial fractions reverse the process of adding fractions. If the denominator is (x + 1)(x + 3), the fraction is written as A/(x + 1) + B/(x + 3), where A and B are constants to be found. This works only when the numerator has a lower degree than the denominator, which is why improper fractions come first.',
          'Find A and B by putting the equation over the common denominator and comparing, or by substituting values that make one factor zero. Substituting x = −1 removes the B term, and substituting x = −3 removes the A term, so each constant is found directly.',
          'Check the result by substituting a value that is not one of the special points, such as x = 0. If the two sides agree, the decomposition is correct.',
        ],
        formulas: ['(3x + 5)/((x + 1)(x + 3)) = A/(x + 1) + B/(x + 3)'],
        examples: [
          'for (3x + 5)/((x + 1)(x + 3)), put x = −1 to get 2 = 2A, so A = 1, and x = −3 to get −4 = −2B, so B = 2. Then (3x + 5)/((x + 1)(x + 3)) = 1/(x + 1) + 2/(x + 3). Check at x = 0: 5/3 on both sides.',
        ],
      },
      {
        h: 'Partial fractions: repeated linear factors',
        why: 'A repeated factor needs one term for each power up to its multiplicity, or the decomposition does not have enough unknowns to work.',
        paras: [
          'If a factor (x − a) appears squared, the decomposition needs both A/(x − a) and B/(x − a)². A factor that appears to the third power needs three terms, and so on. Missing the squared term is the most common error with repeated factors.',
          'Find the constants by substituting the value that makes the non-repeated factor zero, which gives one constant directly. Then substitute other values, or compare coefficients, to find the rest.',
          'Comparing coefficients of the highest power is a good check, because the coefficients of x² on both sides must match.',
        ],
        formulas: ['1/((x − 1)²(x + 2)) = A/(x − 1) + B/(x − 1)² + C/(x + 2)'],
        examples: [
          'for 1/((x − 1)²(x + 2)): x = 1 gives B = 1/3, x = −2 gives C = 1/9, and x = 0 gives A = −1/9. So the decomposition is −1/(9(x − 1)) + 1/(3(x − 1)²) + 1/(9(x + 2)). Check at x = 0: both sides equal 0.5.',
        ],
      },
      {
        h: 'Improper fractions',
        why: 'When the numerator has the same or higher degree than the denominator, dividing first leaves a polynomial and a proper fraction that can be split.',
        paras: [
          'If the degree of the numerator is at least that of the denominator, divide first, exactly as with numbers. The result is a polynomial plus a proper fraction, and only the proper fraction needs partial fractions.',
          'Divide carefully, keeping the remainder. The remainder becomes the numerator of the proper fraction, so an error at this stage changes every later step.',
          'The division also reveals the behaviour of the function for large x. The polynomial part gives the asymptote, and the proper fraction tends to zero.',
        ],
        examples: [
          '(x² + 3x + 4)/(x + 1) = x + 2 + 2/(x + 1), because (x + 1)(x + 2) = x² + 3x + 2, leaving remainder 2. Check at x = 0: 4 on both sides.',
        ],
      },
      {
        h: 'The binomial series',
        why: 'For any rational power n, the binomial series gives an infinite expansion of (1 + x)ⁿ that is valid when |x| is less than 1.',
        paras: [
          'The binomial series is (1 + x)ⁿ = 1 + nx + n(n − 1)/2! x² + n(n − 1)(n − 2)/3! x³ + … . Unlike the finite binomial theorem for positive integers, it does not stop, so it is an approximation whose accuracy improves with more terms.',
          'The series is valid only for |x| < 1. Outside this range it does not converge, so the expansion cannot be used for that value of x. Always state the range of validity in an exam answer.',
          'For a power of (a + bx), factor out a first, so that the bracket begins with 1. Then substitute into the series with x replaced by bx/a.',
        ],
        formulas: ['(1 + x)ⁿ = 1 + nx + n(n − 1)/2! x² + …', 'valid for |x| < 1'],
        examples: [
          '(1 + x)^(1/2) = 1 + x/2 − x²/8 + x³/16 + …, valid for |x| < 1. The coefficients come from n = 1/2: n(n − 1)/2 = −1/8 and n(n − 1)(n − 2)/6 = 1/16.',
        ],
      },
      {
        h: 'Expanding rational functions',
        why: 'A rational function expands as a series when its denominator is written as (1 + kx) to a power, so the binomial series applies directly.',
        paras: [
          'Rewrite the denominator so that it begins with 1, then use the binomial series for the negative power. For (1 − 2x)⁻², substitute u = −2x into (1 + u)⁻² = 1 − 2u + 3u² − 4u³ + …, which is valid for |2x| < 1.',
          'Partial fractions can be used first, which turns a single fraction into simpler terms each with its own series. Combine the series for each term, and collect like powers of x.',
          'State the range of validity for the whole expansion, which is the intersection of the ranges of the individual series.',
        ],
        formulas: ['(1 + u)⁻² = 1 − 2u + 3u² − 4u³ + …'],
        examples: [
          '(1 − 2x)⁻² = 1 + 4x + 12x² + 32x³ + …, valid for |x| < ½. The x² term is 3 × (−2x)² = 12x².',
        ],
      },
    ],
    exam: [
      'Make sure the numerator has a lower degree than the denominator before splitting, and divide first if not.',
      'Include a term for every power of a repeated factor.',
      'Check a partial fraction by substituting a value that is not a special point.',
      'State the range of validity |x| < something for every binomial expansion.',
    ],
  },
  {
    file: 'p4-integration',
    eyebrow: 'Pearson Edexcel International Pure Mathematics 4, section 6',
    title: 'Pure 4: integration',
    syllabus: 'Pearson Edexcel International Pure Mathematics 4, section 6: volumes of revolution, substitution, parts, partial fractions, separable differential equations and parametric areas.',
    sections: [
      {
        h: 'Volume of revolution',
        why: 'Rotating a curve sweeps out a solid, and the volume is built from circular discs whose areas are π times the square of the radius.',
        paras: [
          'When the region between a curve y = f(x), the x-axis and two vertical lines is rotated about the x-axis, the solid is made of thin discs of radius y and thickness dx. Each disc has volume πy² dx, so the volume is V = π ∫ y² dx between the limits.',
          'Square the function before integrating: the most common error is to integrate y and then square the result. Also make sure the limits are in x, and that the radius is measured from the axis of rotation.',
          'For rotation about the y-axis, the same idea applies with x in terms of y, giving V = π ∫ x² dy. Check which axis is given before choosing the form.',
        ],
        formulas: ['V = π ∫ y² dx (rotation about the x-axis)'],
        examples: [
          'the region under y = √x from x = 0 to x = 4 is rotated about the x-axis. V = π ∫ from 0 to 4 of x dx = π [x²/2] from 0 to 4 = 8π.',
        ],
      },
      {
        h: 'Integration by substitution',
        why: 'When an integrand contains a function and its derivative, a substitution turns it into a simpler integral in a new variable.',
        paras: [
          'Choose u as the inner function whose derivative appears elsewhere in the integrand. Then du/dx gives the replacement for dx, and the integral becomes a standard one in u. Remember to change the limits if the integral is definite, or to substitute back for an indefinite integral.',
          'The substitution works in reverse when the integrand is a product of a function and its derivative: ∫ f′(x) f(x) dx has the form ∫ u du, which equals u²/2.',
          'Check by differentiating the final answer in x, not in u. This confirms that the substitution back was done correctly.',
        ],
        examples: [
          '∫ x(x² + 1)³ dx: let u = x² + 1, so du = 2x dx. The integral is ½ ∫ u³ du = u⁴/8 + c = (x² + 1)⁴/8 + c.',
        ],
      },
      {
        h: 'Integration by parts',
        why: 'A product of two functions can be integrated by reversing the product rule, which moves the derivative onto the simpler factor.',
        paras: [
          'The formula is ∫ u dv/dx dx = uv − ∫ v du/dx dx. Choose u as the part that becomes simpler when differentiated, such as a polynomial or ln x, and dv/dx as the part that is easy to integrate, such as e^x or sin x.',
          'The rule often needs to be applied once. If the new integral is still a product, apply it again, or change the choice of u.',
          'Check the answer by differentiating it with the product rule, which should return the original integrand.',
        ],
        formulas: ['∫ u (dv/dx) dx = uv − ∫ v (du/dx) dx'],
        examples: [
          '∫ x eˣ dx: take u = x and dv/dx = eˣ, giving (x − 1)eˣ + c. Differentiating: eˣ + (x − 1)eˣ = x eˣ, as required. Also ∫ ln x dx = x ln x − x + c, with u = ln x and dv/dx = 1.',
        ],
      },
      {
        h: 'Partial fractions in integration',
        why: 'A rational integrand that cannot be integrated directly splits into simpler fractions, each of which integrates to a logarithm or a power.',
        paras: [
          'Write the integrand in partial fractions first, then integrate term by term. A term of the form A/(x − a) integrates to A ln|x − a|, and a repeated factor gives a power in the denominator, which integrates to a power.',
          'Take care with the modulus in the logarithm and with constant factors. The answer for a difference of two logarithms can be combined into one, which is worth doing when the question asks for a single expression.',
          'Check the decomposition before integrating, by recombining the fractions.',
        ],
        formulas: ['∫ A/(x − a) dx = A ln|x − a| + c'],
        examples: [
          '∫ 1/(x² − 1) dx: since 1/(x² − 1) = ½[1/(x − 1) − 1/(x + 1)], the integral is ½ ln|(x − 1)/(x + 1)| + c.',
        ],
      },
      {
        h: 'Separable differential equations',
        why: 'When the derivative of y factorises into a function of x times a function of y, the variables can be separated and each side integrated.',
        paras: [
          'Write dy/dx = f(x)g(y) as dy/g(y) = f(x) dx. Integrate both sides, and include a constant on one side only. Then solve for y if possible.',
          'Use the initial condition to fix the constant. Substitute the given point into the general solution, and check that the solution satisfies the differential equation.',
          'Division by g(y) may lose solutions where g(y) = 0, so check these separately if the question asks for all solutions.',
        ],
        formulas: ['dy/dx = f(x) g(y) ⇒ ∫ dy/g(y) = ∫ f(x) dx'],
        examples: [
          'solve dy/dx = 2xy with y(0) = 1. Separating gives ∫ dy/y = ∫ 2x dx, so ln|y| = x² + C. Then y = A eˣ² with A = 1 from y(0) = 1, so y = e^(x²).',
        ],
      },
      {
        h: 'Areas under parametric curves',
        why: 'When a curve is given by parametric equations, the area under it is an integral in t, using dx = (dx/dt) dt.',
        paras: [
          'The area under a curve is A = ∫ y dx. For parametric equations x = x(t) and y = y(t), substitute dx = (dx/dt) dt and change the limits to values of t, giving A = ∫ y(t) (dx/dt) dt between the t-values that correspond to the ends of the region.',
          'Check the limits carefully. The limits are the values of t at which x takes its end values, not the values of x themselves.',
          'If the curve lies below the x-axis, the integral is negative, so take the modulus when the question asks for an area.',
        ],
        formulas: ['A = ∫ y (dx/dt) dt'],
        examples: [
          'x = t², y = t³ with t from 0 to 1. The area under the curve is ∫ from 0 to 1 of t³ (2t) dt = ∫ 2t⁴ dt = 2/5.',
        ],
      },
    ],
    exam: [
      'Square the function before integrating a volume of revolution.',
      'Choose u and dv/dx deliberately in integration by parts, and check by differentiating.',
      'Separate variables and fix the constant from the initial condition.',
      'Use t-limits, not x-limits, for parametric areas.',
    ],
  },
  {
    file: 'p4-parametric-and-coordinate-geometry',
    eyebrow: 'Pearson Edexcel International Pure Mathematics 4, sections 3 and 5',
    title: 'Pure 4: parametric equations and coordinate geometry',
    syllabus: 'Pearson Edexcel International Pure Mathematics 4, sections 3 and 5: parametric equations, conversion to Cartesian form, and tangents and normals.',
    sections: [
      {
        h: 'Parametric equations',
        why: 'A parameter gives both coordinates in terms of one variable, so a point moves along a curve as the parameter changes.',
        paras: [
          'A curve given by x = f(t) and y = g(t) is a parametric curve, and t is the parameter. Each value of t gives one point on the curve. The direction of travel is the direction of increasing t, which matters for questions about motion.',
          'To plot a parametric curve, make a table of values of t, calculate x and y for each, and plot the points. Joining them smoothly gives the curve, and the points show where the parameter starts and ends.',
          'The parameter often represents time or an angle. In a question about a particle, t is time, and the position is the point given by the parametric equations at that time.',
        ],
        examples: [
          'x = 2t, y = t² − 1: at t = 0 the point is (0, −1); at t = 1 it is (2, 0); at t = 2 it is (4, 3).',
        ],
      },
      {
        h: 'Converting to Cartesian form',
        why: 'Eliminating the parameter gives a single equation in x and y, which is often easier to recognise and to differentiate implicitly.',
        paras: [
          'Find an expression for the parameter from one of the equations, then substitute into the other. For x = 2t, t = x/2, and substituting gives y = (x/2)² − 1 = x²/4 − 1.',
          'The domain of the Cartesian equation may be restricted by the parametric form. For example, if x = t² then x ≥ 0, even though the Cartesian relation may appear to allow negative x.',
          'Check the conversion by substituting a point from the parametric form into the Cartesian equation.',
        ],
        formulas: ['Eliminate the parameter: solve one equation for t and substitute into the other'],
        examples: [
          'x = 2t, y = t² − 1 gives y = x²/4 − 1. The point t = 2, which is (4, 3), satisfies 3 = 16/4 − 1.',
        ],
      },
      {
        h: 'Differentiating parametric equations',
        why: 'The chain rule gives the gradient of a parametric curve without eliminating the parameter.',
        paras: [
          'dy/dx = (dy/dt) ÷ (dx/dt), provided dx/dt ≠ 0. This follows from the chain rule, since dy/dx = (dy/dt)(dt/dx) and dt/dx = 1/(dx/dt).',
          'Find dx/dt and dy/dt separately, then divide. Simplify the result in terms of t, and substitute the value of t at the point of interest to get a numerical gradient.',
          'If dx/dt = 0, the tangent is vertical, and dy/dx is undefined there, so the formula cannot be used at that point.',
        ],
        formulas: ['dy/dx = (dy/dt) ÷ (dx/dt)'],
        examples: [
          'for x = 2t, y = t² − 1: dx/dt = 2 and dy/dt = 2t, so dy/dx = t. At t = 1 the gradient is 1.',
        ],
      },
      {
        h: 'Tangents and normals',
        why: 'A tangent touches the curve at one point with the gradient there, and a normal is perpendicular to the tangent at that point.',
        paras: [
          'Find the point using the parameter value, then the gradient using dy/dx, then write the equation of the line through that point. The tangent has gradient m, and the normal has gradient −1/m, which is perpendicular to it.',
          'Use the point-gradient form y − y1 = m(x − x1), then rearrange to the required form. Leave the answer in the form the question asks for.',
          'If the gradient is zero, the normal is vertical and has the equation x = constant, which cannot be written as y = mx + c. Handle that case separately.',
        ],
        formulas: ['Tangent: y − y1 = m(x − x1)', 'Normal gradient = −1/m'],
        examples: [
          'for x = 2t, y = t² − 1 at t = 1: the point is (2, 0) and the gradient is 1. The tangent is y = x − 2, and the normal has gradient −1, so it is y = −x + 2.',
        ],
      },
      {
        h: 'Implicit differentiation',
        why: 'When a curve is given by an equation in x and y that cannot be solved for y, differentiating both sides with respect to x gives dy/dx directly.',
        paras: [
          'Differentiate each term with respect to x. A term in y gives a factor dy/dx by the chain rule, so y² differentiates to 2y dy/dx. Then collect the dy/dx terms on one side and solve for dy/dx.',
          'Substitute the coordinates of the point to get a numerical gradient. The answer is often easier to express in terms of x and y, and you can then substitute.',
          'Implicit differentiation is faster than rearranging when the equation is a circle or a similar curve, because y is not a single function of x there.',
        ],
        formulas: ['d/dx (y²) = 2y dy/dx'],
        examples: [
          'for x² + y² = 25: 2x + 2y dy/dx = 0, so dy/dx = −x/y. At (3, 4) the gradient is −3/4, and the tangent is 3x + 4y = 25.',
        ],
      },
    ],
    exam: [
      'Check the direction of the parameter, and use the parameter value given for each point.',
      'Use dy/dx = (dy/dt) ÷ (dx/dt), and simplify before substituting.',
      'Write the normal gradient as −1/m, and handle a zero or undefined gradient separately.',
      'Substitute the point into the final tangent or normal equation to check it.',
    ],
  },
  {
    file: 'p4-proof',
    eyebrow: 'Pearson Edexcel International Pure Mathematics 4, section 1',
    title: 'Pure 4: proof',
    syllabus: 'Pearson Edexcel International Pure Mathematics 4, section 1: proof by contradiction.',
    sections: [
      {
        h: 'The method',
        why: 'Assuming the statement is false and reaching an impossibility proves that the statement must be true.',
        paras: [
          'In a proof by contradiction, you assume the negation of the statement you want to prove, then reason logically until you reach a result that is impossible or contradicts a known fact. The original statement must then be true, because the only other option has failed.',
          'Write the assumption clearly at the start, and state the contradiction explicitly at the end. A proof that does not say what has been contradicted is incomplete, even if the algebra is right.',
          'Contradiction is most useful when a direct proof is hard to start, and when the statement is about a property that is "not true" being impossible, such as irrationality or the existence of infinitely many objects.',
        ],
        examples: [
          'to prove that the sum of a rational number and an irrational number is irrational: assume r + s = q is rational, where r is rational and s is irrational. Then s = q − r is rational, which contradicts s being irrational.',
        ],
      },
      {
        h: 'The irrationality of √2',
        why: 'This is the classic proof by contradiction: if √2 were rational, its numerator and denominator would both have to be even, which is impossible.',
        paras: [
          'Assume √2 = p/q, where p and q are integers with no common factor. Squaring gives p² = 2q², so p² is even, which means p is even. Write p = 2k, so 4k² = 2q² and q² = 2k². Then q² is even, so q is even.',
          'Both p and q are even, so they share the factor 2. This contradicts the assumption that p/q was in lowest terms, so √2 cannot be rational.',
          'The same argument works for √3 with the prime 3, and the key step is that a prime dividing a square must divide the root.',
        ],
        examples: [
          'if √3 = p/q in lowest terms, then p² = 3q², so 3 divides p², hence 3 divides p. Writing p = 3k gives q² = 3k², so 3 divides q, a contradiction.',
        ],
      },
      {
        h: 'The infinity of primes',
        why: 'If there were only finitely many primes, a number built from all of them would have a prime factor not on the list, which is a contradiction.',
        paras: [
          'Assume there are finitely many primes, p1, p2, …, pn. Form N = p1 p2 … pn + 1. Then N is greater than 1, so it has a prime factor. But N leaves remainder 1 when divided by any pi, so no pi divides N.',
          'The prime factor of N is therefore a prime not in the list, which contradicts the assumption that the list was complete. So there are infinitely many primes.',
          'The proof does not give the next prime; it shows only that the list can never be finished. This is a common point in exam questions about the nature of a proof.',
        ],
        examples: [
          'if the primes were only 2, 3 and 5, then N = 2 × 3 × 5 + 1 = 31 is itself prime, and it is not on the list, so the list is incomplete.',
        ],
      },
      {
        h: 'Unfamiliar proofs',
        why: 'Contradiction and contrapositive are tools for statements that are hard to attack directly, and they are used in unfamiliar questions.',
        paras: [
          'To prove that if n² is even then n is even, prove the contrapositive instead: if n is odd, then n² is odd. Write n = 2k + 1, so n² = 4k² + 4k + 1, which is odd. This is often easier than working on the original statement.',
          'When a statement asserts that something exists, a counterexample disproves it. When it asserts that something is impossible, contradiction is usually the method.',
          'Structure the answer: state the method, make the assumption or the contrapositive explicit, give each line of reasoning, and end with the conclusion.',
        ],
        examples: [
          'to show that n² + n is always even: n² + n = n(n + 1), and one of n and n + 1 is even, so their product is even.',
        ],
      },
    ],
    exam: [
      'State the assumption clearly at the start of a contradiction proof.',
      'Identify the contradiction explicitly at the end.',
      'Consider the contrapositive when the direct statement is hard to handle.',
      'Show every step of the algebra, because the method marks depend on it.',
    ],
  },
  {
    file: 'p4-vectors',
    eyebrow: 'Pearson Edexcel International Pure Mathematics 4, section 7',
    title: 'Pure 4: vectors',
    syllabus: 'Pearson Edexcel International Pure Mathematics 4, section 7: vectors in three dimensions, lines, distances and the scalar product.',
    sections: [
      {
        h: 'Vectors in three dimensions',
        why: 'A three-dimensional vector has three components, and its magnitude extends Pythagoras to three axes.',
        paras: [
          'A vector in three dimensions is written as (x, y, z), or as xi + yj + zk, where i, j and k are unit vectors along the axes. The magnitude is √(x² + y² + z²), which is found by applying Pythagoras twice: once in the horizontal plane and once with the vertical component.',
          'Addition and scalar multiplication work component by component, exactly as in two dimensions. A scalar multiple of a vector has the same direction if the scalar is positive and the opposite direction if it is negative.',
          'Unit vectors have magnitude 1. To find one in the direction of a, divide a by its magnitude.',
        ],
        formulas: ['|(x, y, z)| = √(x² + y² + z²)'],
        examples: [
          'the vector (2, −3, 6) has magnitude √(4 + 9 + 36) = 7, so (2, −3, 6)/7 is a unit vector in its direction.',
        ],
      },
      {
        h: 'Position vectors and distances',
        why: 'The vector between two points is the difference of their position vectors, and its magnitude is the distance between them.',
        paras: [
          'If A and B have position vectors a and b, then the vector AB is b − a. Its magnitude is the distance AB, which is found from the components of AB. This is the three-dimensional version of finding the distance between two points.',
          'Be careful with the order: AB is from A to B, so it is b − a, not a − b. The magnitude is the same either way, but the direction is reversed.',
          'Use the distance formula to check whether points lie on a sphere or are a given distance apart, which is common in exam questions.',
        ],
        formulas: ['AB = b − a', '|AB| = √((Δx)² + (Δy)² + (Δz)²)'],
        examples: [
          'A(1, 0, 2) and B(4, 4, −2): AB = (3, 4, −4), so |AB| = √(9 + 16 + 16) = √41 ≈ 6.40.',
        ],
      },
      {
        h: 'Vector equations of lines',
        why: 'A line is fixed by one point on it and a direction, and every point on the line is reached by adding a multiple of the direction.',
        paras: [
          'The vector equation of a line is r = a + λb, where a is the position vector of a point on the line, b is a direction vector, and λ is a scalar parameter. Each value of λ gives one point, and every point on the line corresponds to one value.',
          'To test whether a point P lies on the line, set r equal to the position vector of P and solve for λ. If one value of λ satisfies all three components, the point is on the line; if not, it is not.',
          'A line through two points A and B has direction b − a, so its equation is r = a + λ(b − a).',
        ],
        formulas: ['r = a + λb', 'Line through A and B: r = a + λ(b − a)'],
        examples: [
          'the line r = (1, 2, 0) + λ(2, 1, −1) passes through (5, 4, −2) when λ = 2: 1 + 2(2) = 5, 2 + 2 = 4 and 0 − 2 = −2, so the point lies on the line.',
        ],
      },
      {
        h: 'The scalar product',
        why: 'The scalar product gives the angle between two vectors through a single formula, and it is zero exactly when the vectors are perpendicular.',
        paras: [
          'The scalar product of a and b is a·b = a1b1 + a2b2 + a3b3. It is also equal to |a||b| cos θ, where θ is the angle between the vectors. Equating the two forms gives cos θ = a·b ÷ (|a||b|), which is used to find angles between vectors and between lines.',
          'The scalar product is zero when the vectors are perpendicular, which is a quick test for perpendicularity. It is a number, not a vector.',
          'For the angle between two lines, use the direction vectors, and take the acute angle unless the question asks for the obtuse one.',
        ],
        formulas: ['a·b = a1b1 + a2b2 + a3b3 = |a||b| cos θ'],
        examples: [
          'for a = (1, 2, 3) and b = (4, −5, 6), a·b = 4 − 10 + 18 = 12. The angle between (1, 0, 0) and (1, 1, 1) satisfies cos θ = 1/√3, so θ ≈ 54.7°.',
        ],
      },
      {
        h: 'Lines: parallel, intersecting or skew',
        why: 'Two lines in three dimensions can be parallel, meet at a point, or be skew, and the test depends on the directions and on solving the equations.',
        paras: [
          'Two lines are parallel if their direction vectors are scalar multiples of each other. If not, they either intersect or are skew. Parallel lines never intersect unless they are the same line.',
          'To test for intersection, set the two equations equal using different parameters, such as λ and μ, and solve the three component equations. If the three equations give consistent values, the lines intersect; if they are inconsistent, the lines are skew.',
          'Skew lines are not parallel and do not meet, and they exist only in three dimensions. A common error is to conclude that lines intersect after solving only two of the three equations.',
        ],
        examples: [
          'L1: (1, 0, 0) + s(1, 1, 0) and L2: (0, 2, 1) + t(0, 1, 1). From the x-component s = −1, and from the y-component 0 + s = 2 + t gives t = −3. The z-component needs 0 = 1 + t, so t = −1, which contradicts t = −3. The lines do not meet, and they are skew.',
        ],
      },
    ],
    exam: [
      'Write AB as the position vector of B minus the position vector of A.',
      'Test a point on a line by solving for one parameter and checking all three components.',
      'Use a·b = |a||b| cos θ, and state the angle clearly.',
      'For two lines, check parallelism first, then solve the three equations and check consistency.',
    ],
  },
];
