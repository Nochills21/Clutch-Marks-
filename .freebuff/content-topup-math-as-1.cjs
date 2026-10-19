// Top-up module: Mathematics AS — proof & exponentials-and-logarithms (empty topics).
// Notes + 15 questions (5 exam tier + 10 drill) + 15 flashcards each.
// Verified: every correct option re-derived, answer positions varied.
module.exports = {
  subject: "mathematics",
  level: "AS",
  topics: [
    {
      slug: "proof",
      notes: `# Proof

Proof is a logical argument that shows a statement is true in **every** case in its domain. At AS level you must know the four proof techniques, choose the right one for a given statement, and produce or critique a short algebraic argument.

### Direct proof

Start from known facts and deduce the result by valid steps. Most algebraic identities are proved this way: expand, factorise or substitute until the required form appears.

- To prove "the sum of two even numbers is even": write the numbers as 2a and 2b, so their sum is 2(a + b), which is even by definition.
- To prove "the sum of two consecutive integers is odd": write them as n and n + 1, so the sum is 2n + 1, which is odd.

### Proof by exhaustion

Check every case one by one. Only valid when the number of cases is finite and small, for example proving a statement about the factors of 12 by listing 1, 2, 3, 4, 6, 12.

### Disproof by counter-example

A single case where the statement fails disproves a universal claim. This is the fastest way to kill a false statement: for "n^2 + n + 17 is prime for all n", the case n = 16 gives 289 = 17 x 17, so the claim is false.

### Proof by contradiction

Assume the statement is false, then deduce something impossible. The classic is proving that the square root of 2 is irrational: assume sqrt(2) = p/q in lowest terms, derive that both p and q must be even, contradicting the lowest-terms assumption.

### Common algebraic forms

- Even: 2n. Odd: 2n + 1. Consecutive integers: n, n + 1, n + 2.
- Consecutive even numbers: 2n, 2n + 2, 2n + 4.
- A square number is n^2; the difference of two squares is (a - b)(a + b).
- Divisibility: show the expression can be written as the required factor times an integer.`,
      exam: [
        ["Prove that the sum of two consecutive positive integers is always odd. Which argument is valid?", ["Let the integers be n and n + 2, giving 2n + 2, which is even", "Let the integers be n and n + 1, giving 2n + 1, which is odd by definition", "Test n = 1, 2, 3 and observe the sums are 3, 5, 7", "Write the sum as 2n + 1 and note that 2n is odd"], 1, "Let the consecutive integers be n and n + 1. Their sum is 2n + 1, which fits the definition of an odd number for every integer n, so the proof is complete and general. Testing cases is not a proof."],
        ["The statement 'n^2 + n + 17 is prime for all positive integers n' is false. Which counter-example disproves it?", ["n = 3", "n = 16", "n = 5", "n = 7"], 1, "For n = 16: 16^2 + 16 + 17 = 256 + 16 + 17 = 289 = 17^2, which is not prime. One counter-example is enough to disprove a universal claim (n = 3, 5, 7 all give primes: 29, 47, 73)."],
        ["Which line of reasoning proves that the product of two odd numbers is odd?", ["Odd numbers are 2n and 2m; the product is 4nm, which is even", "Test 3 x 5 = 15 and 5 x 7 = 35, both odd", "Write 2n + 1 and 2m + 1; the product is 2(2nm + n + m) + 1, which is odd", "Odd numbers end in 1, 3, 5, 7 or 9, so the product ends in an odd digit"], 2, "Expanding (2n + 1)(2m + 1) = 4nm + 2n + 2m + 1 = 2(2nm + n + m) + 1, which is the definition of an odd number, valid for all integers n and m."],
        ["Prove by contradiction that there is no largest even number. Which assumption starts the proof correctly?", ["Assume a largest even number N exists, then N + 2 is a larger even number, a contradiction", "Assume there are finitely many even numbers", "Assume N is odd, then N + 1 is even", "Assume the largest even number is 2, then list bigger even numbers"], 0, "Assume a largest even number N exists. Then N + 2 is even (it is 2 times an integer) and N + 2 > N, contradicting the maximality of N. The assumption must be false, so no largest even number exists."],
        ["Which argument proves completely that n^2 - 1 is divisible by 8 for all odd n?", ["Write n = 2k + 1: then n^2 - 1 = 4k(k + 1), and k(k + 1) is the product of consecutive integers so one factor is even, giving 8m", "Write n = 2k: then n^2 - 1 = 4k^2 - 1, which is odd", "Test n = 3 and n = 5, giving 8 and 24", "Use n^2 - 1 = (n - 1)(n + 1) and note n - 1 is even, so the product is even"], 0, "With n = 2k + 1: n^2 - 1 = (2k + 1)^2 - 1 = 4k^2 + 4k = 4k(k + 1). Since k and k + 1 are consecutive, one is even, so k(k + 1) = 2m and n^2 - 1 = 8m. Choice D only shows divisibility by 2, which is not enough."],
      ],
      extra: [
        ["Which statement is best proved by exhaustion?", ["The sum of two even numbers is even", "Every factor of 12 is less than 13", "There are infinitely many primes", "sqrt(3) is irrational"], 1, "The factors of 12 (1, 2, 3, 4, 6, 12) are a finite list that can be checked one by one, so exhaustion works. Statements about all integers need a general proof."],
        ["The sum of three consecutive integers is n + (n + 1) + (n + 2). What does this simplify to?", ["3n", "3n + 3", "n + 3", "3n + 6"], 1, "Collecting terms: n + n + 1 + n + 2 = 3n + 3 = 3(n + 1), which shows the sum is always a multiple of 3."],
        ["What is the smallest positive integer n for which n^2 + n + 41 is not prime?", ["40", "41", "39", "42"], 0, "For n = 40: 40^2 + 40 + 41 = 1681 = 41^2, which is not prime. The polynomial is prime for n = 0 to 39 but fails at n = 40."],
        ["To prove 'the sum of two odd numbers is even' by direct proof, the standard opening line is:", ["Let the numbers be 2n and 2m", "Let the numbers be n and m", "Let the numbers be 2n + 1 and 2m + 1", "Let the numbers be n + 1 and m + 1"], 2, "Odd numbers are written 2n + 1 and 2m + 1. Their sum is 2(n + m + 1), which is even. Starting from 2n and 2m would be proving a fact about even numbers instead."],
        ["A student claims 'if n is even then n^2 is odd', arguing: 'take n = 4, then n^2 = 16 which is odd'. What is wrong?", ["Nothing is wrong", "The arithmetic is wrong: 16 is even, and in fact an even n always gives an even n^2, so the claim is false", "n = 4 is not even", "The claim needs proof by exhaustion"], 1, "16 is even, so the example refutes nothing and the claim itself is false: if n = 2k then n^2 = 4k^2, which is even."],
        ["Which method proves an identity such as (n + 1)^2 = n^2 + 2n + 1?", ["Proof by contradiction", "Direct proof by expanding the bracket", "Proof by exhaustion", "Disproof by counter-example"], 1, "An identity valid for all n is proved directly: expand (n + 1)^2 = n^2 + 2n + 1 by multiplying out the bracket. Exhaustion cannot cover infinitely many cases."],
        ["The statement '2n + 1 is prime for all positive integers n' is disproved by which value of n?", ["n = 3", "n = 4", "n = 2", "n = 1"], 1, "For n = 4: 2(4) + 1 = 9 = 3 x 3, which is not prime. For n = 1, 2, 3 the values are 3, 5, 7, which are prime."],
        ["To prove by contradiction that 'there is no smallest positive rational number', the assumption to make is:", ["Assume a smallest positive rational r exists, then r/2 is a smaller positive rational", "Assume all rationals are positive", "Assume r is irrational", "Assume the rationals are finite"], 0, "Assume the smallest positive rational r exists. Then r/2 is positive, rational and smaller than r, contradicting minimality. Hence no smallest positive rational exists."],
        ["Which expression represents the sum of two consecutive even numbers?", ["4n", "4n + 2", "2n + 2", "3n + 2"], 1, "Consecutive even numbers are 2n and 2n + 2, so their sum is 4n + 2 = 2(2n + 1), which is even but not a multiple of 4."],
        ["The product of two consecutive integers is n(n + 1). Which statement about it is always true?", ["It is always even", "It is always odd", "It is always a square", "It is always prime"], 0, "n and n + 1 are consecutive, so one of them is even; the product of an even number with any integer is even."],
        ["Which method best disproves 'every integer greater than 1 is either prime or odd'?", ["Disproof by counter-example", "Direct proof", "Proof by contradiction", "Proof by exhaustion"], 0, "One counter-example settles it: n = 4 is composite (not prime) and even (not odd), so the universal claim is false."],
        ["A direct proof shows n^3 - n is divisible by 6 for all integers n. Which factorisation supports it?", ["n(n^2 - 1)", "(n - 1)^3 + 3n^2 - 3n", "n(n - 1)(n + 1), the product of three consecutive integers, so divisible by 2 and 3", "n^3(1 - 1/n)"], 2, "Three consecutive integers always include a multiple of 2 and a multiple of 3, so their product is divisible by 6. That is the whole proof."],
        ["In a proof by exhaustion of a claim about the digits 0 to 9, how many cases must be checked?", ["9", "10", "100", "1"], 1, "Exhaustion means covering every possible case: the ten digits 0 to 9 give ten cases."],
        ["Which assumption starts a contradiction proof that 'there are infinitely many primes'?", ["Assume all primes are odd", "Assume there are exactly two primes", "Assume there are finitely many primes p1 to pn and consider N = p1 x ... x pn + 1", "Assume N is composite"], 2, "Assume finitely many primes p1 to pn. Then N = p1...pn + 1 leaves remainder 1 when divided by any of them, so N has a prime factor not in the list — a contradiction."],
        ["A proof checks a statement only for n = 1, 2, 3. Which technique is this?", ["Contradiction", "Direct", "Exhaustion", "Counter-example"], 2, "Checking each case individually is proof by exhaustion, valid only when the cases are finite and complete for the claim."],
      ],
      cards: [
        ["Direct proof", "Start from known facts and deduce the result step by step, e.g. write evens as 2a and 2b and factor."],
        ["Proof by exhaustion", "Check every case individually; only valid for a finite, small case list."],
        ["Disproof by counter-example", "One case where the statement fails is enough to disprove a universal claim."],
        ["Proof by contradiction", "Assume the statement is false and deduce something impossible."],
        ["Form of an even number", "2n for integer n."],
        ["Form of an odd number", "2n + 1 for integer n."],
        ["Consecutive integers", "n, n + 1, n + 2 (one of any two consecutive integers is even)."],
        ["Consecutive even numbers", "2n, 2n + 2, 2n + 4."],
        ["Sum of two consecutive integers", "n + (n + 1) = 2n + 1, always odd."],
        ["Product of two consecutive integers", "n(n + 1), always even."],
        ["Difference of two squares", "a^2 - b^2 = (a - b)(a + b)."],
        ["Sum of two odd numbers", "(2n + 1) + (2m + 1) = 2(n + m + 1), always even."],
        ["Product of two odd numbers", "(2n + 1)(2m + 1) = 2(2nm + n + m) + 1, always odd."],
        ["Classic contradiction result", "sqrt(2) is irrational: assume p/q in lowest terms, derive both even."],
        ["n^3 - n divisibility", "n(n - 1)(n + 1) is three consecutive integers, so divisible by 6."],
      ],
    },
    {
      slug: "exponentials-and-logarithms",
      notes: `# Exponentials and logarithms

The exponential function e^x and the natural logarithm ln x are inverse functions. They model growth and decay (populations, radioactive decay, cooling) and appear in almost every AS/A2 paper.

### The functions

- e is Euler's number, e = 2.71828... to 4 s.f.
- y = e^x is always positive, passes through (0, 1), and grows rapidly for large x.
- y = ln x is defined for x > 0, passes through (1, 0), and is the inverse of e^x: ln(e^x) = x and e^(ln x) = x.
- The graph of ln x is the reflection of e^x in the line y = x.

### Logarithm laws

- ln(ab) = ln a + ln b
- ln(a/b) = ln a - ln b
- ln(a^n) = n ln a
- The same laws hold for logs to any base; log base a of x = ln x / ln a.

### Solving equations

- To solve e^(kx + c) = d: take ln of both sides, kx + c = ln d, then rearrange.
- To solve ln(ax + b) = c: exponentiate, ax + b = e^c.
- To solve a^x = b where a is not e: take logs, x = ln b / ln a.

### Modelling

- Growth/decay: N = N0 e^(kt), k > 0 for growth, k < 0 for decay.
- Half-life: the time for a quantity to halve, found from ln(0.5) = k t_half.
- Compound interest and continuously compounded growth use the same form.

### Key results

- The derivative of e^x is e^x; the derivative of ln x is 1/x (know these for later calculus).
- e^0 = 1, ln 1 = 0, ln e = 1.
- The curve y = e^x has gradient 1 at x = 0.`,
      exam: [
        ["Solve e^(2x - 1) = 7, giving x to 3 significant figures.", ["x = 1.14", "x = 0.973", "x = 1.47", "x = 2.48"], 2, "Take ln of both sides: 2x - 1 = ln 7 = 1.9459. So 2x = 2.9459 and x = 1.4730... giving x = 1.47 to 3 s.f."],
        ["Solve ln(3x + 1) = 2.5, giving x to 3 significant figures.", ["x = 3.36", "x = 3.73", "x = 2.72", "x = 4.02"], 1, "Exponentiate: 3x + 1 = e^2.5 = 12.182. So 3x = 11.182 and x = 3.7275... giving x = 3.73 to 3 s.f."],
        ["A population grows as N = 500 e^(0.04t) with t in years. What is the population after 10 years, to the nearest whole number?", ["610", "746", "520", "785"], 1, "N = 500 e^(0.04 x 10) = 500 e^0.4 = 500 x 1.4918 = 745.9, so the population is about 746."],
        ["A substance has half-life 8 years. Find k in the decay model N = N0 e^(kt).", ["k = -0.125", "k = -0.0866", "k = 0.0866", "k = -0.693"], 1, "At t = 8 the amount halves: N/N0 = 0.5, so ln(0.5) = 8k and k = ln(0.5)/8 = -0.0866 to 3 s.f."],
        ["Solve 3^(2x) = 20, giving x to 3 significant figures.", ["x = 1.94", "x = 0.682", "x = 2.17", "x = 1.36"], 3, "Take logs: 2x ln 3 = ln 20, so x = ln 20 / (2 ln 3) = 2.9957 / 2.1972 = 1.3634... giving x = 1.36 to 3 s.f."],
      ],
      extra: [
        ["What is the value of e^0?", ["0", "1", "e", "undefined"], 1, "Any non-zero number to the power 0 is 1; e^0 = 1. The curve y = e^x passes through (0, 1)."],
        ["What is the value of ln 1?", ["1", "0", "e", "-1"], 1, "ln 1 = 0 because e^0 = 1. The curve y = ln x passes through (1, 0)."],
        ["Simplify ln 6 - ln 3.", ["ln 3", "ln 2", "ln 9", "2 ln 3"], 1, "By the quotient law ln 6 - ln 3 = ln(6/3) = ln 2."],
        ["Simplify 2 ln 5.", ["ln 7", "ln 10", "ln 25", "25"], 2, "By the power law n ln a = ln(a^n): 2 ln 5 = ln 25."],
        ["What is the domain of y = ln x?", ["x > 0", "All real x", "x >= 0", "x < 0"], 0, "The logarithm is only defined for positive arguments: x > 0. The y-axis is an asymptote."],
        ["The curve y = e^x crosses the y-axis at which point?", ["(0, 0)", "(0, 1)", "(1, 0)", "(e, 1)"], 1, "e^0 = 1, so the y-intercept is (0, 1)."],
        ["Solve e^x = 12, giving x to 3 s.f.", ["x = 1.08", "x = 2.48", "x = 12", "x = 3.21"], 1, "x = ln 12 = 2.4849..., so x = 2.48 to 3 s.f."],
        ["Solve ln x = -1, giving x to 3 s.f.", ["x = -2.72", "x = 0.632", "x = 0.368", "x = 1.00"], 2, "x = e^(-1) = 0.36787..., so x = 0.368 to 3 s.f."],
        ["What is log base 2 of 8?", ["4", "3", "2.08", "1.5"], 1, "2^3 = 8, so log base 2 of 8 = 3. Equivalently ln 8 / ln 2 = 3."],
        ["Which rearrangement solves 2^x = 9?", ["x = ln 2 / ln 9", "x = 9 ln 2", "x = ln 9 / ln 2", "x = ln 18"], 2, "Taking natural logs: x ln 2 = ln 9, so x = ln 9 / ln 2 (about 3.17)."],
        ["A quantity decays as N = 200 e^(-0.03t). What is N at t = 5, to 3 s.f.?", ["190", "155", "230", "172"], 3, "N = 200 e^(-0.03 x 5) = 200 e^(-0.15) = 200 x 0.8607 = 172.1, so N = 172 to 3 s.f."],
        ["In which line is y = ln x reflected to give y = e^x?", ["the y-axis", "y = x", "y = -x", "the x-axis"], 1, "e^x and ln x are inverse functions, and inverse graphs are reflections in the line y = x."],
        ["Simplify ln(e^5).", ["e^5", "5e", "5", "1/5"], 2, "ln and exp are inverses, so ln(e^5) = 5."],
        ["Simplify e^(ln 4).", ["ln 4", "4", "e^4", "1"], 1, "e^(ln x) = x for x > 0, so e^(ln 4) = 4."],
        ["Which value of x solves ln(x - 2) = 1?", ["x = 3", "x = e", "x = 1", "x = e + 2"], 3, "Exponentiate: x - 2 = e^1 = e, so x = e + 2 (about 4.72)."],
      ],
      cards: [
        ["Euler's number e", "e = 2.71828 (4 s.f.); the base of natural logarithms."],
        ["Graph of e^x", "Always positive, passes through (0, 1), horizontal asymptote y = 0 as x -> -infinity."],
        ["Graph of ln x", "Domain x > 0, passes through (1, 0), vertical asymptote x = 0; reflection of e^x in y = x."],
        ["ln(ab) rule", "ln(ab) = ln a + ln b."],
        ["ln(a/b) rule", "ln(a/b) = ln a - ln b."],
        ["ln(a^n) rule", "ln(a^n) = n ln a."],
        ["Change of base", "log base a of x = ln x / ln a."],
        ["ln and e are inverses", "ln(e^x) = x and e^(ln x) = x."],
        ["Solving e^(kx+c) = d", "Take ln: kx + c = ln d, then solve the linear equation."],
        ["Solving ln(ax+b) = c", "Exponentiate: ax + b = e^c."],
        ["Exponential growth/decay model", "N = N0 e^(kt); k > 0 growth, k < 0 decay."],
        ["Half-life", "Time for a quantity to halve: t_half = ln(0.5) / k."],
        ["ln 1 and ln e", "ln 1 = 0, ln e = 1."],
        ["e^0", "e^0 = 1."],
        ["Solving a^x = b", "x = ln b / ln a."],
      ],
    },
  ],
};
