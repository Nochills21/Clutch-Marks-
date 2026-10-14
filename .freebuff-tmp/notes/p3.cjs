// Pure 3 notes. Every worked number here was checked by hand.
module.exports = [
  {
    file: 'p3-algebra-and-functions',
    eyebrow: 'Pearson Edexcel International Pure Mathematics 3, section 1',
    title: 'Pure 3: algebra and functions',
    syllabus: 'Pearson Edexcel International Pure Mathematics 3, section 1: rational expressions, functions, composition, inverses, the modulus function and transformations.',
    sections: [
      {
        h: 'Rational expressions and algebraic division',
        why: 'Dividing a polynomial by a linear factor gives a quotient and a remainder, and the remainder theorem gives that remainder without dividing.',
        paras: [
          'A rational expression is a fraction whose numerator and denominator are polynomials. When the numerator has a degree at least as large as the denominator, divide first, just as with numbers. The result is a polynomial plus a proper fraction, which is easier to sketch and to integrate.',
          'Long division and synthetic division both work. For division by x − a, synthetic division uses only the coefficients: bring down the first, multiply by a, add to the next, and repeat. The final number is the remainder.',
          'The remainder theorem says that when f(x) is divided by x − a, the remainder is f(a). This is a quick check on any division: if f(a) matches the remainder you found, the division is probably correct.',
        ],
        formulas: ['f(x) = (x − a)q(x) + f(a)'],
        examples: [
          'divide f(x) = x³ + 2x² − 5x + 6 by x − 1 using synthetic division on the coefficients 1, 2, −5, 6: the quotient is x² + 3x − 2 and the remainder is 4. Check: f(1) = 1 + 2 − 5 + 6 = 4. So f(x) = (x − 1)(x² + 3x − 2) + 4.',
        ],
      },
      {
        h: 'Functions, domain and range',
        why: 'A function is defined by a rule and a domain; the domain restricts which inputs are allowed, and the range is the set of outputs that result.',
        paras: [
          'The domain is the set of x-values for which the rule gives a real answer, and the range is the set of y-values it produces. For a rational function, the domain excludes values that make the denominator zero. For a square root, the domain excludes values that make the expression under it negative.',
          'Find the range from the graph or by rearranging y = f(x) to make x the subject and asking which y-values give a real x. A horizontal asymptote often shows a value the range cannot reach.',
          'A function must give exactly one output for each input. Restricting the domain is how a many-to-one function is made one-to-one, which is needed before an inverse can be found.',
        ],
        examples: [
          'f(x) = 1/(x − 2) has domain x ≠ 2 and range all real numbers except 0, since 1/(x − 2) can never equal zero. f(x) = √(x − 1) has domain x ≥ 1 and range y ≥ 0.',
        ],
      },
      {
        h: 'Composition and inverses',
        why: 'Composition applies one function to the result of another, and an inverse undoes a function, so the two are linked by f(f⁻¹(x)) = x.',
        paras: [
          'The composite function fg(x) means f(g(x)): first apply g, then apply f to the result. The order matters, so fg and gf are usually different. Read the composition from the right, working outwards.',
          'The inverse f⁻¹ exists only when f is one-to-one. To find it, write y = f(x), swap x and y, and make y the subject. The graph of f⁻¹ is the reflection of the graph of f in the line y = x.',
          'The domain of a composite function can be smaller than expected, because the inner function\'s output must lie in the domain of the outer one. Always check this when a question asks for the domain of fg.',
        ],
        formulas: ['fg(x) = f(g(x))', 'f(f⁻¹(x)) = x'],
        examples: [
          'let f(x) = 2x + 1 and g(x) = x². Then fg(x) = 2x² + 1, but gf(x) = (2x + 1)². For the inverse of f, y = 2x + 1 gives x = (y − 1)/2, so f⁻¹(x) = (x − 1)/2.',
        ],
      },
      {
        h: 'The modulus function',
        why: 'The modulus makes every value non-negative, so equations with a modulus are solved by considering both signs.',
        paras: [
          '|x| is x when x ≥ 0 and −x when x < 0. Its graph is V-shaped and is never negative. To solve an equation with a modulus, such as |2x − 3| = 5, split it into the two cases 2x − 3 = 5 and 2x − 3 = −5, solve each, and check each answer in the original equation.',
          'The graph of y = |f(x)| is found by reflecting the parts of y = f(x) that lie below the x-axis in the x-axis. The parts above the axis are unchanged. The graph of y = f(|x|) is different: the part for x ≥ 0 is reflected in the y-axis to give the part for x < 0.',
          'Students often solve |x| = a by writing x = a only. Always give both x = a and x = −a, unless the context excludes one.',
        ],
        examples: [
          'for |2x − 3| = 5: 2x − 3 = 5 gives x = 4, and 2x − 3 = −5 gives x = −1. Both check. The graph of y = |2x − 3| has its vertex at (1.5, 0).',
        ],
      },
      {
        h: 'Combining transformations',
        why: 'Each transformation changes the graph in one predictable way, and a sequence of them is applied one at a time, in the right order.',
        paras: [
          'For y = f(x), the transformations are: y = f(x) + a moves the graph up by a; y = f(x − a) moves it right by a; y = af(x) stretches it vertically by a; and y = f(ax) stretches it horizontally by 1/a. Notice that a horizontal shift acts in the opposite direction to the sign inside the bracket.',
          'When combining transformations, work from the inside outwards: a change to x inside the bracket acts on the input, and a change outside the bracket acts on the output. Horizontal and vertical changes do not interfere with each other, but two horizontal changes must be applied in the right order. Check the order by testing a point: a known point of y = f(x) should land where the transformed graph says it does.',
          'Use the key points to sketch: the intercepts, turning points and asymptotes of the original, transformed one at a time.',
        ],
        formulas: ['y = f(x) + a: up by a', 'y = f(x − a): right by a', 'y = af(x): vertical stretch factor a', 'y = f(ax): horizontal stretch factor 1/a'],
        examples: [
          'to sketch y = |x² − 4|, start from y = x² − 4, which crosses the x-axis at x = ±2 with minimum −4 at x = 0. Reflect the part below the axis in the x-axis, so the graph has minimum 0 at x = ±2, a maximum of 4 at x = 0, and crosses the y-axis at 4.',
        ],
      },
    ],
    exam: [
      'Use the remainder theorem to check a polynomial division.',
      'Give the domain and range of a function, not just its rule.',
      'For a modulus equation, always solve both cases and check each answer.',
      'Apply transformations in order, and test a known point to confirm the result.',
    ],
  },
  {
    file: 'p3-differentiation',
    eyebrow: 'Pearson Edexcel International Pure Mathematics 3, section 4',
    title: 'Pure 3: differentiation',
    syllabus: 'Pearson Edexcel International Pure Mathematics 3, section 4: differentiation of exponentials, logarithms and trigonometric functions, the product, quotient and chain rules, and exponential growth and decay.',
    sections: [
      {
        h: 'Standard derivatives',
        why: 'The derivatives of e^x, ln x and the trigonometric functions are the building blocks from which every other derivative in this section is made.',
        paras: [
          'The derivative of e^(kx) is k e^(kx), so the exponential function is its own derivative when k = 1. The derivative of ln x is 1/x for x > 0. The derivatives of sin x, cos x and tan x are cos x, −sin x and sec²x; the sign on cos x is the one most often forgotten.',
          'For a constant multiple or a sum, differentiate term by term. Constants disappear when differentiated, and a constant multiplying a function stays in front of the derivative.',
          'When the variable sits inside a function, such as sin(3x), the standard result is multiplied by the derivative of the inside. This is the chain rule, which the later part of this note explains in full.',
        ],
        formulas: ['d/dx e^(kx) = k e^(kx)', 'd/dx ln x = 1/x', 'd/dx sin x = cos x, d/dx cos x = −sin x, d/dx tan x = sec²x'],
        examples: [
          'differentiate y = 3e^(2x) + ln x − cos x. The result is dy/dx = 6e^(2x) + 1/x + sin x.',
        ],
      },
      {
        h: 'The product rule',
        why: 'When two functions multiply, the derivative has two terms, each taking the derivative of one factor and keeping the other.',
        paras: [
          'If y = uv, where u and v are both functions of x, then dy/dx = u dv/dx + v du/dx. The rule is written as (uv)′ = u′v + uv′. Each term has one factor differentiated and one left alone, and both terms must appear.',
          'Identify u and v clearly before differentiating, and write them down. Many errors come from differentiating the whole product as if it were a single function, or from differentiating only one term.',
          'The product rule is often needed to differentiate expressions such as x² e^x or x sin x. Factorising the answer at the end can make it easier to find stationary points.',
        ],
        formulas: ['(uv)′ = u′v + uv′'],
        examples: [
          'for y = x² e^x, take u = x² and v = e^x: dy/dx = 2x e^x + x² e^x = x e^x (x + 2).',
        ],
      },
      {
        h: 'The quotient rule',
        why: 'A fraction of two functions is differentiated by a rule that keeps the signs of the numerator\'s derivative in the right place.',
        paras: [
          'If y = u/v, then dy/dx = (v du/dx − u dv/dx) ÷ v². The order of the terms in the numerator matters: the derivative of the top goes first, and the subtraction is in that order. Writing the rule out in full each time avoids sign errors.',
          'Some quotients are easier to differentiate as a product using a negative power. If the denominator is a simple power of x, rewriting it as a product with x to a negative power and using the product rule can be quicker.',
          'Simplify the numerator as far as possible before setting it to zero to find stationary points. A numerator that factorises gives the solutions directly.',
        ],
        formulas: ['d/dx (u/v) = (v u′ − u v′) ÷ v²'],
        examples: [
          'for y = x/(x² + 1), u = x and v = x² + 1: dy/dx = ((x² + 1) − 2x²)/(x² + 1)² = (1 − x²)/(x² + 1)². The stationary points are at x = ±1.',
        ],
      },
      {
        h: 'The chain rule',
        why: 'When one function is inside another, the rate of change passes through the inner function, and the derivatives multiply.',
        paras: [
          'If y is a function of u and u is a function of x, then dy/dx = (dy/du)(du/dx). In practice, differentiate the outer function with respect to its inside, then multiply by the derivative of the inside. This is the rule used for almost all composite functions.',
          'For a function of the form f(ax + b), the chain rule gives a factor of a. For e^(x²), the outer derivative is e^(x²) and the inner derivative is 2x, so the result is 2x e^(x²).',
          'Check the chain rule on a simple case: if y = (2x)², then the rule and the direct expansion y = 4x² should agree on dy/dx = 8x.',
        ],
        formulas: ['dy/dx = (dy/du)(du/dx)'],
        examples: [
          'for y = ln(3x + 1), the outer derivative is 1/(3x + 1) and the inner derivative is 3, so dy/dx = 3/(3x + 1). For y = e^(x²), dy/dx = 2x e^(x²).',
        ],
      },
      {
        h: 'Using dy/dx = 1 / (dx/dy)',
        why: 'When x is easier to write in terms of y, the reciprocal of dx/dy gives dy/dx without rearranging.',
        paras: [
          'Since dy/dx and dx/dy are reciprocals, dy/dx = 1 ÷ (dx/dy) whenever dx/dy is non-zero. This is useful when the function is given as x in terms of y, such as x = y³.',
          'Give the final answer in terms of x if the question asks for it. Substitute y in terms of x, or use the chain rule to express the result in x.',
          'At points where dx/dy = 0, the tangent is vertical and dy/dx does not exist, so this method cannot be used there.',
        ],
        formulas: ['dy/dx = 1 ÷ (dx/dy)'],
        examples: [
          'for x = y³, dx/dy = 3y², so dy/dx = 1/(3y²) for y ≠ 0. This agrees with differentiating y = x^(1/3) directly, which gives (1/3)x^(−2/3) = 1/(3y²).',
        ],
      },
      {
        h: 'Exponential growth and decay',
        why: 'A quantity whose rate of change is proportional to its size follows an exponential law, and the differential form makes that link explicit.',
        paras: [
          'If N = N0 e^(kt), then dN/dt = kN. The rate of change of N is proportional to N itself. For growth, k is positive; for decay, k is negative. The initial value N0 is the value when t = 0.',
          'The differential equation dN/dt = kN is a useful way to recognise the model: any question that says the rate of change is proportional to the amount is describing this law.',
          'Interpret answers in context. At t = 0 the rate of change equals k N0, and the quantity is always positive for any finite t.',
        ],
        formulas: ['N = N0 e^(kt)', 'dN/dt = kN'],
        examples: [
          'a population N = 1000 e^(0.05t) has rate of change dN/dt = 0.05N, so at t = 0 it grows at 50 per unit time. At t = 10, N = 1000 e^(0.5) ≈ 1649.',
        ],
      },
    ],
    exam: [
      'Name the outer and inner functions before using the chain rule.',
      'In the quotient rule, keep the subtraction in the order: derivative of the top times the bottom, minus the top times the derivative of the bottom.',
      'Simplify the derivative before solving for stationary points.',
      'Recognise dN/dt = kN as exponential growth or decay and interpret the sign of k.',
    ],
  },
  {
    file: 'p3-exponentials-and-logarithms',
    eyebrow: 'Pearson Edexcel International Pure Mathematics 3, section 3',
    title: 'Pure 3: exponentials and logarithms',
    syllabus: 'Pearson Edexcel International Pure Mathematics 3, section 3: the functions e^x and ln x, their graphs, and logarithmic graphs.',
    sections: [
      {
        h: 'The functions e^x and ln x',
        why: 'The exponential and natural logarithm are inverses, so each undoes the other, and their graphs are reflections of each other in y = x.',
        paras: [
          'e^x is always positive, passes through (0, 1), and has the x-axis as a horizontal asymptote on the left. ln x is defined only for x > 0, passes through (1, 0), and has the y-axis as a vertical asymptote. Learn these key points, because most sketches start from them.',
          'Because they are inverses, ln(e^x) = x for all x and e^(ln x) = x for x > 0. Use these identities to simplify expressions and to solve equations by taking logs of both sides.',
          'The domain of ln is restricted to positive values, so any solution of a log equation must be checked against this. A negative value inside a logarithm is not allowed.',
        ],
        formulas: ['ln(e^x) = x', 'e^(ln x) = x'],
        examples: [
          'the curve y = e^x passes through (0, 1) and approaches 0 as x → −∞. The curve y = ln x passes through (1, 0) and approaches −∞ as x → 0⁺.',
        ],
      },
      {
        h: 'Transformed exponential graphs',
        why: 'The same transformation rules as for any function apply to exponentials, and the asymptote moves with the graph.',
        paras: [
          'For y = e^x + a, the graph moves up by a and the asymptote becomes y = a. For y = e^(x − a), the graph moves right by a. For y = e^(−x), the graph is reflected in the y-axis, so it decreases and approaches zero as x → +∞.',
          'When sketching, label the intercepts and the asymptote. The y-intercept is found by setting x = 0, and it often gives the key point of the sketch.',
          'Remember that e^x is always positive, so a transformation that moves the graph below zero moves the asymptote with it, and the curve never crosses it.',
        ],
        examples: [
          'for y = e^x + 2, the asymptote is y = 2, and the y-intercept is at e⁰ + 2 = 3. For y = e^(x − 1), the curve passes through (1, 1).',
        ],
      },
      {
        h: 'Solving equations',
        why: 'Equations with an unknown in an exponent are solved by taking logarithms, and equations that look like quadratics in e^x are solved by substitution.',
        paras: [
          'To solve a^x = b, take logarithms of both sides: x = ln b ÷ ln a. This works for any positive base, and the result is exact even when the decimal value is not needed.',
          'For an equation with e^(2x) and e^x, substitute u = e^x. The equation becomes a quadratic in u, and each positive root gives one solution for x, found by taking ln of u. Discard any root that is not positive, because e^x cannot be negative.',
          'Check solutions in the original equation, especially when logarithms are involved, because the domain of ln can remove a solution.',
        ],
        formulas: ['a^x = b ⇒ x = ln b ÷ ln a'],
        examples: [
          '2^x = 5 gives x = ln 5 ÷ ln 2 ≈ 2.32. For e^(2x) − 5e^x + 6 = 0, put u = e^x to get u² − 5u + 6 = (u − 2)(u − 3) = 0, so u = 2 or 3, and x = ln 2 ≈ 0.693 or ln 3 ≈ 1.099.',
        ],
      },
      {
        h: 'Logarithmic graphs',
        why: 'The same transformation rules apply to ln x, and the vertical asymptote moves with the shift.',
        paras: [
          'For y = ln(x − a), the graph is shifted right by a, the asymptote is x = a, and the curve passes through (a + 1, 0). For y = ln x + a, the curve is shifted up by a and the asymptote stays at x = 0.',
          'Sketch by finding the x-intercept, which occurs where the logarithm equals zero, and the asymptote. Remember that ln x is increasing, so the graph rises slowly to the right.',
          'Logarithm laws help when a log equation needs combining: log a + log b = log(ab), log a − log b = log(a/b), and k log a = log(a^k).',
        ],
        formulas: ['log a + log b = log(ab)', 'log a − log b = log(a/b)', 'k log a = log(a^k)'],
        examples: [
          'for y = ln(x − 3), the asymptote is x = 3 and the curve passes through (4, 0). To solve log(x + 2) − log x = log 3, combine to log((x + 2)/x) = log 3, so x + 2 = 3x and x = 1, which is positive and valid.',
        ],
      },
    ],
    exam: [
      'Sketch with the key points and asymptotes labelled.',
      'For a^x = b, take logs and give the exact form before the decimal.',
      'Substitute u = e^x for quadratic-type equations and reject any negative u.',
      'Check every logarithmic solution against the domain x > 0 of the original log terms.',
    ],
  },
  {
    file: 'p3-integration',
    eyebrow: 'Pearson Edexcel International Pure Mathematics 3, section 5',
    title: 'Pure 3: integration',
    syllabus: 'Pearson Edexcel International Pure Mathematics 3, section 5: integration of standard functions, and integration by recognising known derivatives.',
    sections: [
      {
        h: 'Standard integrals',
        why: 'Integration reverses differentiation, so every standard derivative gives a standard integral that can be checked by differentiating back.',
        paras: [
          'The integral of e^(kx) is (1/k) e^(kx) + c, and the integral of 1/x is ln|x| + c. The modulus in the second makes the result valid for negative x as well. The integral of cos(kx) is (1/k) sin(kx) + c, and the integral of sin(kx) is −(1/k) cos(kx) + c.',
          'Always include the constant of integration c in an indefinite integral. For a definite integral, the constant cancels, so it is not written.',
          'Check any integral by differentiating your answer. This takes a few seconds and catches most errors, particularly sign errors in the trigonometric results.',
        ],
        formulas: ['∫ e^(kx) dx = (1/k) e^(kx) + c', '∫ (1/x) dx = ln|x| + c', '∫ cos(kx) dx = (1/k) sin(kx) + c'],
        examples: [
          '∫ (e^(2x) + 3/x) dx = ½ e^(2x) + 3 ln|x| + c. Differentiating gives e^(2x) + 3/x, as required.',
        ],
      },
      {
        h: 'Recognising a known derivative: ∫ f′(x)/f(x) dx',
        why: 'When the numerator is the derivative of the denominator, the integral is a logarithm, and recognising the pattern avoids substitution.',
        paras: [
          'If the integrand has the form f′(x)/f(x), the integral is ln|f(x)| + c. The numerator must be exactly the derivative of the denominator, apart from a constant factor, which can be taken outside the integral.',
          'Check the pattern by differentiating ln|f(x)|: the chain rule gives f′(x)/f(x), which matches the integrand. If the numerator is a constant multiple of the derivative, adjust the constant in front.',
          'If the denominator\'s derivative is not the numerator, the pattern does not apply, and a different method such as substitution or partial fractions is needed.',
        ],
        formulas: ['∫ f′(x)/f(x) dx = ln|f(x)| + c'],
        examples: [
          '∫ 2x/(x² + 1) dx = ln(x² + 1) + c. Here the denominator is x² + 1, whose derivative is 2x, and x² + 1 is always positive, so the modulus can be dropped.',
        ],
      },
      {
        h: 'Recognising a power: ∫ f′(x)[f(x)]ⁿ dx',
        why: 'A derivative of a power of a function gives a power one higher, which reverses to give the integral.',
        paras: [
          'If the integrand is f′(x) multiplied by [f(x)]ⁿ, with n ≠ −1, the integral is [f(x)]^(n+1) ÷ (n + 1) + c. This is the reverse of the chain rule for a power, and it applies whenever the inner derivative is present.',
          'Check the pattern by differentiating the answer, which gives (n + 1)[f]ⁿ f′ ÷ (n + 1) = f′[f]ⁿ. If the inner derivative is missing a constant factor, put that factor in front of the integral.',
          'When n = −1, the rule does not apply and the answer is ln|f(x)| + c instead, which is the pattern in the previous section.',
        ],
        formulas: ['∫ f′(x)[f(x)]ⁿ dx = [f(x)]^(n+1) ÷ (n + 1) + c, n ≠ −1'],
        examples: [
          '∫ 3x²(x³ + 1)⁴ dx = (x³ + 1)⁵ ÷ 5 + c. The inner function is x³ + 1 and its derivative 3x² is present, so the rule applies directly.',
        ],
      },
      {
        h: 'Trigonometric identities',
        why: 'Powers of sine and cosine cannot be integrated directly, so an identity is used to rewrite them in a form that can.',
        paras: [
          'The identity cos 2x = 1 − 2 sin²x rearranges to sin²x = (1 − cos 2x) ÷ 2. Substituting this into the integral turns a square of sine into a constant and a cosine, both of which integrate easily.',
          'Similarly, cos²x = (1 + cos 2x) ÷ 2. Learn both forms, because the question often provides only one of the identities.',
          'Always check the result by differentiating, since the factors of ½ and ¼ are easy to lose.',
        ],
        formulas: ['sin²x = (1 − cos 2x) ÷ 2', 'cos²x = (1 + cos 2x) ÷ 2'],
        examples: [
          '∫ sin²x dx = ∫ (1 − cos 2x) ÷ 2 dx = x/2 − (sin 2x)/4 + c.',
        ],
      },
      {
        h: 'Solving equations with integration',
        why: 'A differential equation has a family of solutions, and a given point picks out the one that passes through it.',
        paras: [
          'When dy/dx is given, integrate to find y, then add the constant of integration. The constant is fixed by a point the curve passes through, which is substituted into the general solution to give the particular solution.',
          'Check the answer by differentiating it and confirming that the given dy/dx is recovered and that the point lies on the curve.',
          'Keep the constant of integration until the point is used; forgetting it, or substituting the point too early, gives an incorrect answer.',
        ],
        examples: [
          'dy/dx = 2x + 1 with the curve passing through (0, 3). Integration gives y = x² + x + c, and substituting (0, 3) gives c = 3, so y = x² + x + 3.',
        ],
      },
      {
        h: 'Definite integrals',
        why: 'A definite integral gives the net area between a curve and the x-axis over an interval, and the limits are substituted after integrating.',
        paras: [
          'Integrate the function, then substitute the upper limit and subtract the value at the lower limit. The constant of integration cancels, so it is not included in definite integrals.',
          'Keep the order of subtraction straight. Writing the answer as [F(x)] with the limits beside it helps to avoid sign errors.',
          'An area below the x-axis gives a negative definite integral, so take the modulus if the question asks for an area rather than a net value.',
        ],
        examples: [
          '∫ from 0 to 1 of e^(2x) dx = [½ e^(2x)] from 0 to 1 = ½ (e² − 1) ≈ 3.19.',
        ],
      },
    ],
    exam: [
      'Check every integral by differentiating your answer.',
      'Recognise f′(x)/f(x) and f′(x)[f(x)]ⁿ before choosing a method.',
      'Use a trigonometric identity to rewrite a square of sine or cosine before integrating.',
      'Include + c for indefinite integrals and fix c from a given point.',
    ],
  },
  {
    file: 'p3-numerical-methods',
    eyebrow: 'Pearson Edexcel International Pure Mathematics 3, section 6',
    title: 'Pure 3: numerical methods',
    syllabus: 'Pearson Edexcel International Pure Mathematics 3, section 6: locating roots by change of sign, and iterative methods.',
    sections: [
      {
        h: 'Locating a root by change of sign',
        why: 'A continuous function that changes sign over an interval must cross zero somewhere in it, so the sign change locates a root.',
        paras: [
          'If f is continuous on an interval [a, b] and f(a) and f(b) have opposite signs, then there is at least one root between a and b. This is the intermediate value theorem, and it is the reason the method works.',
          'To narrow the root, test the midpoint or the next value, and keep the subinterval over which the sign changes. Each test halves or refines the interval. The method is slow but reliable, and it never fails when the conditions hold.',
          'The sign change proves a root exists in the interval, but it does not show that there is exactly one. Check the function shape if the question asks for uniqueness.',
        ],
        examples: [
          'for f(x) = x³ − 2x − 5: f(2) = 8 − 4 − 5 = −1 and f(3) = 27 − 6 − 5 = 16, so there is a root between 2 and 3. Since f(2.1) = 9.261 − 4.2 − 5 = 0.061 > 0, the root lies between 2 and 2.1.',
        ],
      },
      {
        h: 'Iterative methods',
        why: 'Rewriting an equation as x = g(x) gives a simple repeated process that converges to the root.',
        paras: [
          'To solve f(x) = 0, rearrange it into the form x = g(x). Start with an initial value x0 and repeatedly calculate x(n+1) = g(xn). If the values settle down, they approach a root of the original equation.',
          'The choice of rearrangement matters. Different rearrangements give different iterations, and some diverge. The iteration must be chosen so that g is well behaved near the root.',
          'Keep extra decimal places during the iteration and round only the final answer. Premature rounding can change the last digit of the answer.',
        ],
        examples: [
          'for x³ = 2x + 5, rearrange to x = ∛(2x + 5). Starting at x0 = 2: x1 ≈ 2.0801, x2 ≈ 2.0924, x3 ≈ 2.0941, x4 ≈ 2.0944. The sequence settles at 2.0945 to four decimal places.',
        ],
      },
      {
        h: 'Convergence',
        why: 'An iteration converges when successive errors shrink, and the size of the gradient of g near the root decides whether they do.',
        paras: [
          'Near the root α, the error at each step is multiplied by roughly g′(α). If |g′(α)| < 1, the errors shrink and the iteration converges. If |g′(α)| > 1, the errors grow and the iteration diverges, even if the starting value is close.',
          'Check convergence by evaluating g′ at the root before running the iteration. For x = ∛(2x + 5), g′(x) = (2/3)(2x + 5)^(−2/3), which at the root is about 0.15, so the iteration converges.',
          'A useful check in an exam is to show that consecutive iterates agree to the required accuracy, which is the stopping condition for the method.',
        ],
        formulas: ['Converges near α if |g′(α)| < 1'],
        examples: [
          'g(x) = (2x + 5)^(1/3) has g′(x) = (2/3)(2x + 5)^(−2/3). At x ≈ 2.0945, 2x + 5 ≈ 9.189 and g′ ≈ 0.15, which is less than 1, so the iteration converges.',
        ],
      },
      {
        h: 'Giving answers',
        why: 'The question states the accuracy required, and an answer must meet it without rounding too early.',
        paras: [
          'Give the answer to the number of decimal places or significant figures asked for. If the question asks for three decimal places, state the value to four and round at the end, which protects against rounding errors.',
          'Show the sequence of iterates in an exam, with enough decimal places, so that the method and the convergence are visible. A final answer alone often loses the method marks.',
          'When a question asks you to show that a root lies in an interval, state the two values of f, their signs, and the conclusion. Do not simply write "a root exists".',
        ],
        examples: [
          'the root of x³ − 2x − 5 = 0 is 2.0946 to four decimal places, found from the iteration once consecutive values agree to that accuracy.',
        ],
      },
    ],
    exam: [
      'State the sign change with both values of f and the conclusion about the root.',
      'Rearrange f(x) = 0 into x = g(x), and state the starting value used.',
      'Check that |g′(α)| < 1 before relying on the iteration.',
      'Give the answer to the accuracy asked, and show successive iterates.',
    ],
  },
  {
    file: 'p3-trigonometry',
    eyebrow: 'Pearson Edexcel International Pure Mathematics 3, section 2',
    title: 'Pure 3: trigonometry',
    syllabus: 'Pearson Edexcel International Pure Mathematics 3, section 2: reciprocal and inverse trigonometric functions, identities, double and compound angles, and R-formulae.',
    sections: [
      {
        h: 'Reciprocal functions',
        why: 'The reciprocals of sine, cosine and tangent give three further functions, which simplify many expressions and identities.',
        paras: [
          'The secant, cosecant and cotangent are defined as sec x = 1/cos x, cosec x = 1/sin x and cot x = 1/tan x = cos x/sin x. They are undefined where their denominators are zero, which gives the asymptotes on their graphs.',
          'Use these definitions to rewrite an expression in sine and cosine when that makes it easier to simplify. Converting back to the reciprocal form is often the final step in an identity.',
          'The key values for the reciprocal functions come from the standard angles, so sec 60° = 2 and cot 45° = 1 should be recalled rather than calculated with a calculator in an exam.',
        ],
        formulas: ['sec x = 1/cos x', 'cosec x = 1/sin x', 'cot x = 1/tan x'],
        examples: [
          'sec 60° = 1/cos 60° = 1/(1/2) = 2, and cot 45° = 1/tan 45° = 1.',
        ],
      },
      {
        h: 'Identities',
        why: 'The Pythagorean identity links sine and cosine, and dividing it through gives the two other forms that are needed in exams.',
        paras: [
          'The fundamental identity is sin²θ + cos²θ = 1. Dividing by cos²θ gives 1 + tan²θ = sec²θ. Dividing by sin²θ gives 1 + cot²θ = cosec²θ. Recognising which form to use is often the key step in proving an identity.',
          'To prove an identity, work on one side only, rewrite everything in sine and cosine, and simplify until it matches the other side. Working on both sides and meeting in the middle is also valid, but do not move terms across the equals sign as if it were an equation to solve.',
          'For a value question, use the identities with a right-angled triangle. If cos θ = 3/5 and θ is acute, then sin θ = 4/5 and tan θ = 4/3.',
        ],
        formulas: ['sin²θ + cos²θ = 1', '1 + tan²θ = sec²θ', '1 + cot²θ = cosec²θ'],
        examples: [
          'if cos θ = 3/5 and θ is acute, sin θ = √(1 − 9/25) = 4/5, so tan θ = 4/3.',
        ],
      },
      {
        h: 'Inverse functions',
        why: 'Inverse trigonometric functions return an angle from a ratio, but each has a restricted range so that it is a function.',
        paras: [
          'The inverse functions arcsin, arccos and arctan give an angle for a given ratio. Each one is defined on a restricted range of angles, the principal values: arcsin gives angles from −90° to 90°, arccos from 0° to 180°, and arctan from −90° to 90°. The principal value is the one a calculator gives.',
          'Solve a trigonometric equation by finding the principal value first, then using the symmetry and periodicity of the graph to find every solution in the interval asked for. This avoids missing solutions.',
          'The range of each inverse is what makes it a function. Without the restriction, the inverse would give many angles for one ratio.',
        ],
        formulas: ['arcsin: [−90°, 90°]', 'arccos: [0°, 180°]', 'arctan: (−90°, 90°)'],
        examples: [
          'arccos(−½) = 120°, since 120° lies in the range [0°, 180°] and cos 120° = −½.',
        ],
      },
      {
        h: 'Double and compound angles',
        why: 'Expanding sin and cos of sums and doubles gives identities that simplify equations and calculations.',
        paras: [
          'The compound angle formulae are sin(A ± B) = sin A cos B ± cos A sin B, and cos(A ± B) = cos A cos B ∓ sin A sin B. The double angle formulae follow by setting B = A: sin 2A = 2 sin A cos A, cos 2A = cos²A − sin²A = 2cos²A − 1 = 1 − 2sin²A, and tan 2A = 2 tan A ÷ (1 − tan²A).',
          'The double angle formulae are used in reverse as well, to replace 2 sin x cos x with sin 2x. Recognising this pattern is often the key to a simplification.',
          'Use the compound formulae to find exact values of angles that are sums of standard ones, such as 75° = 45° + 30°.',
        ],
        formulas: ['sin(A + B) = sin A cos B + cos A sin B', 'sin 2A = 2 sin A cos A', 'cos 2A = cos²A − sin²A'],
        examples: [
          'sin 75° = sin(45° + 30°) = (√2/2)(√3/2) + (√2/2)(1/2) = (√6 + √2)/4.',
        ],
      },
      {
        h: 'R-formulae',
        why: 'Any combination a sin θ + b cos θ can be written as a single sine, which gives its maximum and the angles where it takes a given value.',
        paras: [
          'Write a sin θ + b cos θ = R sin(θ + α), where R = √(a² + b²) and tan α = b/a, with α in the correct quadrant. Expanding the right-hand side and comparing coefficients gives these values. The maximum of the expression is R, and its minimum is −R.',
          'Once in this form, solve equations by isolating sin(θ + α) and using the principal value and symmetry. Remember to add α back at the end and to find all solutions in the required interval.',
          'Quadrant care matters: tan α = b/a alone does not give α uniquely, so check the signs of a and b.',
        ],
        formulas: ['a sin θ + b cos θ = R sin(θ + α)', 'R = √(a² + b²)', 'tan α = b/a'],
        examples: [
          '3 sin θ + 4 cos θ = 5 sin(θ + 53.13°), with maximum 5 at θ ≈ 36.87°. To solve 3 sin θ + 4 cos θ = 4 for 0° ≤ θ < 360°: sin(θ + 53.13°) = 0.8, so θ + 53.13° = 53.13° or 126.87°, giving θ = 0° or 73.74°.',
        ],
      },
    ],
    exam: [
      'Rewrite reciprocal functions in sine and cosine when simplifying.',
      'In an identity proof, work on one side and never cross the equals sign.',
      'Find the principal value, then every solution in the interval.',
      'For a·sin θ + b·cos θ, write it as R sin(θ + α), check the quadrant, and give all solutions.',
    ],
  },
];
