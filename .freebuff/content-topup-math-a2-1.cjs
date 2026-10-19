// Top-up module: Mathematics A2 — binomial-expansion, sequences-and-series, proof.
// Notes + 15 questions (5 exam tier + 10 drill) + 15 flashcards each.
// Arithmetic verified: (1+x)^(1/2) = 1 + x/2 - x^2/8; (1-2x)^(-2) = 1 + 4x + 12x^2;
// x^3 coeff of (1+x)^(1/3) = 5/81; sqrt(1.04) = 1.0198; S20 = 1010; Sinf = 8;
// S5(GP 3,2) = 93; Newton x1 = 2.67; Sigma r^2 step identity checked by expansion.
module.exports = {
  subject: "mathematics",
  level: "A2",
  topics: [
    {
      slug: "binomial-expansion",
      notes: `# Binomial expansion

The binomial theorem expands (1 + x)^n in ascending powers of x. For positive integer n the series terminates; for negative or fractional n it is an infinite series valid only inside a restricted range.

### The expansion

(1 + x)^n = 1 + nx + [n(n - 1)/2!] x^2 + [n(n - 1)(n - 2)/3!] x^3 + ...

The coefficient of x^r is n(n - 1)...(n - r + 1) / r!. Note this is NOT C(n, r) unless n is a positive integer.

### Non-integer n

When n is negative or fractional the expansion is an infinite series, and it is valid only for **|x| < 1**. If the bracket is (1 + kx), validity becomes |kx| < 1, i.e. |x| < 1/|k|.

### Rewriting awkward brackets

- Factor out the constant: (3 + 2x)^n = 3^n (1 + 2x/3)^n, then expand the bracket.
- Negative powers and reciprocals: (1 - 2x)^(-2), 1/sqrt(1 + x) = (1 + x)^(-1/2).

### Approximations

To estimate a surd, force the (1 + x) form with a small x:
- sqrt(1.04) = (1 + 0.04)^(1/2) approx 1 + 0.02 - 0.0002 = 1.0198.
- Use three terms for 3 s.f. accuracy, and state the range of validity.

### Common mistakes

- Forgetting to halve (or divide by r!) the product in the coefficient.
- Losing the minus signs when n is negative or x is negative.
- Ignoring the validity condition when asked for the range of x.`,
      exam: [
        ["Expand (1 + x)^(1/2) as far as the term in x^2.", ["1 + x/2 + x^2/8", "1 + x/2 - x^2/8", "1 - x/2 + x^2/8", "1 + x/2 - x^2/4"], 1, "With n = 1/2: 1 + (1/2)x + [(1/2)(-1/2)/2]x^2 = 1 + x/2 - x^2/8."],
        ["Expand (1 - 2x)^(-2) as far as the term in x^2.", ["1 - 4x + 12x^2", "1 + 4x + 6x^2", "1 + 4x + 12x^2", "1 + 2x + 4x^2"], 2, "With n = -2 and x replaced by -2x: 1 + (-2)(-2x) + [(-2)(-3)/2](-2x)^2 = 1 + 4x + 3(4x^2) = 1 + 4x + 12x^2."],
        ["State the range of values of x for which the expansion of (1 + 3x)^(-1/2) is valid.", ["|x| < 3", "|x| < 1/3", "|x| < 1", "|x| > 1/3"], 1, "The expansion in powers of 3x requires |3x| < 1, so |x| < 1/3."],
        ["Find the coefficient of x^3 in the expansion of (1 + x)^(1/3).", ["-5/81", "5/27", "5/81", "10/81"], 2, "Coefficient = n(n-1)(n-2)/3! with n = 1/3: (1/3)(-2/3)(-5/3)/6 = (10/27)/6 = 5/81."],
        ["Using the expansion of (1 + x)^(1/2) with x = 0.04, estimate sqrt(1.04) to 4 decimal places.", ["1.0190", "1.0198", "1.0202", "1.0210"], 1, "sqrt(1.04) approx 1 + (0.04)/2 - (0.04)^2/8 = 1 + 0.02 - 0.0002 = 1.0198."],
      ],
      extra: [
        ["What is the coefficient of x^2 in (1 + x)^5?", ["5", "1", "10", "20"], 2, "C(5, 2) = 5 x 4 / 2 = 10."],
        ["What is the coefficient of x^2 in the expansion of (1 - 3x)^(-1)?", ["-9", "6", "9", "3"], 2, "(1 - y)^(-1) = 1 + y + y^2 + ... with y = 3x gives 9x^2, so the coefficient is 9."],
        ["Evaluate 4! / (2! 2!).", ["24", "12", "4", "6"], 3, "4! = 24 and 2! 2! = 4, so the value is 6 (it is also C(4, 2)."],
        ["For which x is the expansion of (1 + x)^(1/4) valid?", ["|x| < 1", "|x| <= 1", "|x| < 1/4", "|x| > 1"], 0, "A fractional power gives an infinite series valid only for |x| < 1."],
        ["What is the coefficient of x^3 in (1 + x)^(1/2)?", ["-1/16", "1/8", "1/16", "3/16"], 2, "(1/2)(-1/2)(-3/2)/6 = (3/8)/6 = 1/16."],
        ["Using (1 + x)^(1/2) with x = -0.02, estimate sqrt(0.98).", ["0.99", "0.98995", "0.9895", "0.9901"], 1, "1 + (-0.02)/2 - (-0.02)^2/8 = 1 - 0.01 - 0.00005 = 0.98995."],
        ["Evaluate C(6, 2).", ["12", "20", "15", "30"], 2, "C(6, 2) = 6 x 5 / 2 = 15."],
        ["In the expansion of (1 + x)^(-1), what is the sign of the coefficient of x^10?", ["negative", "positive", "zero", "There is no x^10 term"], 1, "(1 + x)^(-1) = 1 - x + x^2 - x^3 + ... The signs alternate with even powers positive, so x^10 has coefficient +1."],
        ["For which x is the expansion of (1 - 2x)^(1/2) valid?", ["|x| < 1", "|x| < 2", "|x| < 1/2", "|x| > 1/2"], 2, "We need |-2x| < 1, i.e. |x| < 1/2."],
        ["Which expression gives the coefficient of x^3 in (1 + x)^n?", ["n^3/3!", "n(n-1)/2!", "n(n-1)(n-2)/3!", "n(n-1)(n-2)(n-3)/4!"], 2, "The x^3 coefficient is n(n-1)(n-2)/3!, the product of three descending factors divided by 3!."],
      ],
      cards: [
        ["Binomial expansion", "(1 + x)^n = 1 + nx + [n(n-1)/2!]x^2 + [n(n-1)(n-2)/3!]x^3 + ..."],
        ["Coefficient of x^r", "n(n-1)...(n-r+1) / r! — not C(n,r) unless n is a positive integer."],
        ["Validity (non-integer n)", "|x| < 1, or |kx| < 1 when expanding (1 + kx)^n."],
        ["Terminating series", "Only for positive integer n; the series then stops at x^n."],
        ["Negative n", "(1 - x)^(-1) = 1 + x + x^2 + ...; (1 - x)^(-2) = 1 + 2x + 3x^2 + ..."],
        ["Fractional power", "(1 + x)^(1/2) = 1 + x/2 - x^2/8 + x^3/16 - ..."],
        ["Rewriting brackets", "(a + bx)^n = a^n (1 + bx/a)^n before expanding."],
        ["Reciprocal form", "1/sqrt(1 + x) = (1 + x)^(-1/2)."],
        ["Approximating surds", "Write as (1 + x)^n with small x and use 2-3 terms."],
        ["sqrt(1.04) estimate", "1 + 0.02 - 0.0002 = 1.0198."],
        ["Common error: coefficient", "Forgetting to divide by r! in the coefficient."],
        ["Common error: signs", "Losing minus signs when n or x is negative."],
        ["Factorising first", "Factor out the constant before using the standard form."],
        ["Range of validity", "Always state it when the question gives a non-integer power."],
        ["Pascal link", "For integer n the coefficients match Pascal's triangle / C(n,r)."],
      ],
    },
    {
      slug: "sequences-and-series",
      notes: `# Sequences and series

An arithmetic progression (AP) adds a constant difference d each term; a geometric progression (GP) multiplies by a constant ratio r. You must master both closed forms, their sums, and the conditions for an infinite sum.

### Arithmetic progression

- nth term: a_n = a + (n - 1)d.
- Sum: S_n = n/2 [2a + (n - 1)d] = n/2 (first + last).
- The difference between consecutive terms is constant: a_{n+1} - a_n = d.

### Geometric progression

- nth term: a_n = a r^(n - 1).
- Sum: S_n = a(r^n - 1)/(r - 1) = a(1 - r^n)/(1 - r).
- Sum to infinity: S_inf = a/(1 - r), valid ONLY when |r| < 1.

### Sigma notation

- sum of r from 1 to n = n(n + 1)/2; sum of r^2 = n(n + 1)(2n + 1)/6; sum of r^3 = [n(n + 1)/2]^2.
- sum of a constant c over n terms is cn.
- Split sums: sum (3r + 1) = 3 sum r + sum 1.

### Modelling

- Arithmetic: hire charges, stacked rows, simple interest.
- Geometric: depreciation, compound interest, population growth, drug decay.
- For repeated percentage change, multiplier = (1 + percentage/100) per period.

### Exam technique

- Write the first few terms before committing to a formula.
- Check the sum formula by substituting n = 1 and n = 2.
- For 'sum exceeds X' questions solve the inequality and take the first integer.`,
      exam: [
        ["An AP has first term 3 and common difference 5. Find the sum of the first 20 terms.", ["950", "1010", "1060", "200"], 1, "S_20 = 20/2 [2(3) + 19(5)] = 10 [6 + 95] = 10 x 101 = 1010."],
        ["A GP has first term 4 and common ratio 0.5. Find the sum to infinity.", ["6", "4", "12", "8"], 3, "|r| = 0.5 < 1, so S_inf = a/(1 - r) = 4/0.5 = 8."],
        ["An AP has first term 2 and common difference 7. Find the nth term.", ["7n + 2", "7n - 5", "2n + 7", "7n - 2"], 1, "a_n = 2 + (n - 1)7 = 2 + 7n - 7 = 7n - 5."],
        ["A GP has first term 3 and common ratio 2. Find the sum of the first 5 terms.", ["63", "93", "96", "155"], 1, "S_5 = 3(2^5 - 1)/(2 - 1) = 3(31) = 93."],
        ["The sum to infinity of a GP is 12 and its first term is 4. Find the common ratio.", ["1/3", "2/3", "3/4", "1/2"], 1, "a/(1 - r) = 12 gives 4/(1 - r) = 12, so 1 - r = 1/3 and r = 2/3."],
      ],
      extra: [
        ["An AP has a = 5, d = 2. Find S_10.", ["125", "140", "155", "130"], 1, "S_10 = 10/2 [2(5) + 9(2)] = 5 [10 + 18] = 140."],
        ["Find the common ratio of the GP 2, 6, 18, ...", ["2", "3", "6", "1/3"], 1, "6/2 = 3 and 18/6 = 3, so r = 3."],
        ["Under what condition does a GP have a sum to infinity?", ["|r| <= 1", "|r| < 1", "|r| > 1", "r > 0"], 1, "S_inf = a/(1 - r) is only valid when |r| < 1; the terms must shrink to zero."],
        ["A GP has a = 2, r = 3. Which expression gives the nth term?", ["3 x 2^(n-1)", "2 x 3^(n-1)", "2 x 3^n", "2 x 3n"], 1, "a_n = a r^(n-1) = 2 x 3^(n-1)."],
        ["Evaluate the sum of (3r + 1) from r = 1 to 4.", ["30", "34", "38", "28"], 1, "3(1 + 2 + 3 + 4) + 4(1) = 3(10) + 4 = 34."],
        ["An AP has a = 10, d = -3. Find the 4th term.", ["4", "-2", "1", "7"], 2, "a_4 = 10 + 3(-3) = 10 - 9 = 1."],
        ["Find the sum to infinity of 1 + 1/2 + 1/4 + ...", ["2", "1.5", "3", "1"], 0, "a = 1, r = 1/2, so S_inf = 1/(1 - 1/2) = 2."],
        ["How many terms of 3 + 7 + 11 + ... sum to 210?", ["7", "10", "12", "14"], 1, "S_n = n/2[6 + 4(n-1)] = n(2n + 1) = 210, so 2n^2 + n - 210 = 0, giving n = 10 (the positive root)."],
        ["In a GP the 2nd term is 6 and the 5th term is 48. Find r.", ["3", "2", "1.5", "4"], 1, "a_5/a_2 = r^3 = 48/6 = 8, so r = 2."],
        ["Which expression gives the nth term of an AP with first term a and common difference d?", ["a + (n - 1)d", "a + nd", "a d^(n-1)", "n(a + d)"], 0, "The nth term starts at a and adds d exactly (n - 1) times."],
      ],
      cards: [
        ["AP nth term", "a_n = a + (n - 1)d."],
        ["AP sum", "S_n = n/2 [2a + (n - 1)d] = n/2 (first + last)."],
        ["GP nth term", "a_n = a r^(n-1)."],
        ["GP sum", "S_n = a(1 - r^n)/(1 - r), r not equal to 1."],
        ["Sum to infinity", "S_inf = a/(1 - r), valid only for |r| < 1."],
        ["Sum of r", "sum r from 1 to n = n(n + 1)/2."],
        ["Sum of r^2", "n(n + 1)(2n + 1)/6."],
        ["Sum of r^3", "[n(n + 1)/2]^2."],
        ["Sum of a constant", "sum of c over n terms = cn."],
        ["Arithmetic difference", "a_(n+1) - a_n = d, constant."],
        ["Geometric ratio", "a_(n+1) / a_n = r, constant."],
        ["Compound change", "Percentage change p per period gives multiplier (1 + p/100)."],
        ["Depreciation", "Value after n years = initial x multiplier^n with multiplier < 1."],
        ["Convergence check", "A GP converges only when the terms tend to zero: |r| < 1."],
        ["Formula check", "Substitute n = 1 and n = 2 to verify a sum formula."],
      ],
    },
    {
      slug: "proof",
      notes: `# Proof by induction and other formal arguments

A2 proof extends the AS toolkit with **mathematical induction** — the standard method for statements indexed by the positive integers (series formulae, divisibility, inequalities).

### The structure of induction

1. **Base case**: verify the statement directly for n = 1 (or the stated starting value).
2. **Inductive step**: assume the statement true for n = k (the inductive hypothesis). Prove it true for n = k + 1, using that assumption.
3. **Conclusion**: by induction the statement is true for all positive integers n >= starting value.

### Divisibility inductions

To prove "expression is divisible by m": the base case must divide exactly, and the inductive step writes P(k + 1) = P(k) + m x (something), so divisibility passes from k to k + 1.

### Series inductions

To prove a sum formula: write S_{k+1} = S_k + a_{k+1}, substitute the assumed formula for S_k, and simplify to the claimed form with n replaced by k + 1.

### When induction is NOT appropriate

- Statements about all real numbers (use direct proof or contradiction).
- Finite case lists (use exhaustion).
- Disproving a universal claim (use a counter-example).

### Contradiction and contrapositive

- To prove "if P then Q" by contradiction: assume P and not Q, and derive nonsense.
- Contrapositive: prove "if not Q then not P", which is logically equivalent and often cleaner — e.g. "if n^2 is even then n is even" is proved by "if n is odd then n^2 is odd".`,
      exam: [
        ["Which pair of steps completes a proof by induction that a statement P(n) holds for all positive integers n?", ["Show P(1) is true; assume P(k) true and prove P(k + 1)", "Show P(1) and P(2) are true", "Assume P(n) true and rearrange", "Show P(n) is a formula"], 0, "Induction needs the base case P(1) and the inductive step P(k) implies P(k + 1); together these cover all positive integers."],
        ["In the inductive step of a proof about a series formula, what is assumed?", ["The formula is true for n = k", "The formula is true for all n", "The formula is false", "Nothing; the step is direct"], 0, "The inductive hypothesis is exactly the assumption that P(k) holds; it is then used to establish P(k + 1)."],
        ["In an induction proof that the sum of the first n squares equals n(n + 1)(2n + 1)/6, which equality must be established in the inductive step?", ["k(k+1)(2k+1)/6 + (k+1)^2 = (k+1)(k+2)(2k+3)/6", "k(k+1)(2k+1)/6 = (k+1)(k+2)(2k+3)/6", "(k+1)^2 = (k+1)(k+2)(2k+3)/6", "k^2 = k(k+1)(2k+1)/6"], 0, "Add the (k + 1)th term (k + 1)^2 to the assumed sum for k terms and simplify: the right-hand side is the formula with n = k + 1."],
        ["The statement 'n^2 - n + 41 is prime for all positive integers n' is false. Which counter-example disproves it?", ["n = 40", "n = 41", "n = 39", "n = 30"], 1, "At n = 41: 41^2 - 41 + 41 = 1681 = 41^2, which is not prime. (The expression is prime for n = 1 to 40.)"],
        ["To prove 'if n^2 is even then n is even' by contradiction, which assumption leads to a contradiction?", ["Assume n^2 is even and n is odd, so n = 2k + 1 and n^2 = 4k^2 + 4k + 1 is odd", "Assume n is even", "Assume n^2 is odd", "Assume the statement is true"], 0, "Assuming n odd gives n^2 = 4k^2 + 4k + 1, which is odd, contradicting that n^2 is even. Hence n must be even."],
      ],
      extra: [
        ["What is the assumption P(k) in an induction proof called?", ["The inductive hypothesis", "The base case", "The contradiction", "The axiom"], 0, "The assumption that P(k) holds is the inductive hypothesis, used to prove P(k + 1)."],
        ["Find the sum of 2 + 4 + 8 + ... + 2^n (geometric, first 2, ratio 2).", ["2^(n+1) - 2", "2^n - 1", "2^n - 2", "2^(n+1) - 1"], 0, "S_n = 2(2^n - 1)/(2 - 1) = 2^(n+1) - 2."],
        ["Which counter-example disproves 'every prime number is odd'?", ["2", "3", "5", "9"], 0, "2 is prime and even, so one counter-example destroys the universal claim (9 is not prime at all)."],
        ["To prove that sqrt(5) is irrational by contradiction, the opening assumption is:", ["sqrt(5) is rational, so sqrt(5) = p/q in lowest terms", "sqrt(5) is irrational", "5 is prime", "p and q are both even"], 0, "Assume sqrt(5) = p/q with p, q coprime; squaring and analysing divisibility by 5 forces both to be multiples of 5, contradicting lowest terms."],
        ["Which formula gives the sum of the first n cubes?", ["n(n+1)(2n+1)/6", "[n(n+1)/2]^2", "n(n+1)(2n+1)/3", "n(n+1)/2"], 1, "The sum of r^3 from 1 to n is [n(n + 1)/2]^2 — check n = 2: 1 + 8 = 9 = 3^2."],
        ["Find the sum of the first n odd numbers 1 + 3 + 5 + ... + (2n - 1).", ["n^2", "n(n+1)", "2n^2", "n^2 + 1"], 0, "The first n odd numbers sum to n^2 — check n = 4: 1 + 3 + 5 + 7 = 16."],
        ["Which of these is NOT part of a proof by induction?", ["Verify the base case", "Assume P(k) and prove P(k + 1)", "Prove the statement separately for every positive integer", "Conclude P(n) holds for all positive integers"], 2, "Proving each case separately is exhaustion and is impossible for infinitely many cases; induction replaces it with the chain P(1) => P(2) => ..."],
        ["Mathematical induction proves statements indexed by which set?", ["Positive integers", "Real numbers", "Prime numbers only", "Negative integers only"], 0, "Induction chains P(1) => P(2) => P(3) => ..., so the index set must be the positive integers (or a stated finite starting point upwards)."],
        ["The base case of an induction proof that n^2 + n is even (starting n = 1) checks:", ["n = 1 gives 2, which is even", "n = 0 gives 0", "n = 2 gives 6", "the inductive step"], 0, "At n = 1: 1 + 1 = 2, which is even, so P(1) holds and the induction can start."],
        ["In an inductive proof that the sum of the first n integers is n(n + 1)/2, which equality shows P(k + 1)?", ["k(k+1)/2 + (k+1) = (k+1)(k+2)/2", "k(k+1)/2 = (k+1)(k+2)/2", "k + 1 = (k+1)(k+2)/2", "2k + 1 = k + 2"], 0, "S_{k+1} = S_k + (k + 1) = k(k + 1)/2 + (k + 1); factoring (k + 1)/2 gives (k + 1)(k + 2)/2, the formula with n = k + 1."],
      ],
      cards: [
        ["Base case", "Verify P(1) directly before any general argument."],
        ["Inductive hypothesis", "Assume P(k) true; it is the fuel for the inductive step."],
        ["Inductive step", "Prove P(k + 1) from P(k), then conclude for all n >= 1."],
        ["Divisibility induction", "Write P(k+1) = P(k) + m x something to pass divisibility along."],
        ["Series induction", "S_{k+1} = S_k + a_{k+1}; substitute the assumed formula."],
        ["Induction domain", "Statements indexed by positive integers (or n >= stated start)."],
        ["Not for reals", "Statements about all real numbers need direct proof or contradiction."],
        ["Counter-example", "One failing case kills a universal claim."],
        ["Proof by contradiction", "Assume P and not Q, derive a contradiction."],
        ["Contrapositive", "Prove 'if not Q then not P' — logically equivalent to 'if P then Q'."],
        ["n^2 even implies n even", "Contrapositive: n odd gives n^2 = 4k^2 + 4k + 1 odd."],
        ["Sum of first n integers", "n(n + 1)/2."],
        ["Sum of first n cubes", "[n(n + 1)/2]^2."],
        ["Sum of first n odd numbers", "n^2."],
        ["Irrationality proof", "Assume p/q in lowest terms, derive a common factor — contradiction."],
      ],
    },
  ],
};
