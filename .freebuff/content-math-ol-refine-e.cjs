/**
 * Mathematics OL deepening, pass e: adds h3 subsections to the sequences and
 * functions note (syllabus 2.7 and 2.13). Prose-only sections, inserted before
 * "Equations and symbols" by refine-note-sections.cjs; nothing already in the
 * note is rewritten.
 */

const ID = "7a6b58bd-8e42-4c07-8162-996586f0077b";
const SLUG = "algebra-sequences-and-functions";

const sections = [
  {
    id: ID,
    slug: SLUG,
    proseOnly: true,
    heading: "Sequences: terms, term-to-term rules and position rules",
    html: `<h2>Sequences: terms, term-to-term rules and position rules</h2>
<p>A sequence is an ordered list of numbers that follows a rule. Each number in the list is a term, and the position of a term in the list is its term number, written n. Exam questions give a sequence and ask for a missing term, a rule, or a check on whether a particular number belongs to the pattern. The subsections below cover the two kinds of rule and how to move between them.</p>
<h3>Reading a sequence and naming its terms</h3>
<p>Write the first term as the term with n = 1, the second as n = 2, and so on. In the sequence 5, 8, 11, 14, the first term is 5 and the fourth term is 14. Read the terms from left to right, and keep the positions fixed, because a term that is shifted by one place gives a wrong answer even when the arithmetic is correct.</p>
<h3>Term-to-term rules</h3>
<p>A term-to-term rule says how to get the next term from the one before it. "Add 3 each time" and "multiply by 2 each time" are term-to-term rules. To use one, start from a known term and apply the rule repeatedly. A term-to-term rule is quick to apply to a few terms, but it is slow to find a term far down the list, which is why the position rule is needed.</p>
<h3>Position-to-term rules, or nth term</h3>
<p>A position-to-term rule, often called the nth term, gives any term directly from its position n. For the sequence 5, 8, 11, 14, the nth term is 3n + 2. Check it by substitution: n = 1 gives 5, n = 2 gives 8, and n = 4 gives 14. The nth term is the more useful form in an exam, because it finds the 50th term without listing the first 49.</p>
<h3>Finding a term from an nth term</h3>
<p>Substitute the position into the rule. For the nth term 3n + 2, the 20th term is 3 × 20 + 2 = 62. Write the substitution in full, with the position inside brackets if it is negative or a fraction, and keep the working so that a method mark can be awarded even if the arithmetic slips.</p>
<h3>Testing whether a number belongs to a sequence</h3>
<p>To check whether a number such as 80 is in the sequence with nth term 3n + 2, set the rule equal to 80 and solve: 3n + 2 = 80, so 3n = 78 and n = 26. Because n is a whole number, 80 is a term, and it is the 26th term. If the solution for n is not a whole number, the number is not in the sequence.</p>
<h3>Arithmetic sequences and the common difference</h3>
<p>In an arithmetic sequence the difference between consecutive terms is the same every time. This fixed difference is the common difference, written d. For the sequence 5, 8, 11, 14, the common difference is 3. The nth term of any arithmetic sequence has the form dn + c, where d is the common difference and c is found by substituting the first term.</p>
<h3>Geometric sequences and the common ratio</h3>
<p>In a geometric sequence each term is found by multiplying the previous one by the same number, called the common ratio. The sequence 3, 6, 12, 24 has common ratio 2. A geometric sequence can grow very quickly, so check the ratio by dividing two consecutive terms rather than guessing it from the first two numbers.</p>
`,
  },
  {
    id: ID,
    slug: SLUG,
    proseOnly: true,
    heading: "Linear and quadratic sequences in depth",
    html: `<h2>Linear and quadratic sequences in depth</h2>
<p>Most sequence questions at this level use a linear rule or a quadratic rule. A linear sequence has a constant first difference, and a quadratic sequence has a constant second difference. Recognising which kind a sequence is decides the method, and the subsections below show how to find the rule and how to confirm it.</p>
<h3>Finding the nth term of a linear sequence</h3>
<p>For a linear sequence, write the common difference as d and the term before the first as a. The nth term is then dn + (a − d). Take the sequence 7, 10, 13, 16. The common difference is 3 and the first term is 7, so the nth term is 3n + (7 − 3), which is 3n + 4. Check the answer against the second term: 3 × 2 + 4 = 10, which matches.</p>
<h3>Checking a linear rule with the difference</h3>
<p>A quick check on a linear rule is to compare the coefficient of n with the difference between consecutive terms. The coefficient of n must equal the common difference. If the rule is 3n + 4 and the terms increase by 3 each time, the rule is consistent. A mismatch between the coefficient and the difference means the rule is wrong, and the mistake is usually in the constant term.</p>
<h3>Quadratic sequences and second differences</h3>
<p>Find the first differences, which are the gaps between consecutive terms, and then find the differences between those. If the second differences are constant, the sequence is quadratic. For 4, 7, 12, 19, the first differences are 3, 5, 7, and the second differences are 2, 2. The constant second difference shows that the sequence is quadratic, and the coefficient of n² is half of 2, so it is 1.</p>
<h3>Finding the nth term of a quadratic</h3>
<p>Write the nth term as an n² + bn + c, where a is half the second difference. Subtract a n² from each term and look at what is left. For 4, 7, 12, 19, subtracting n² leaves 3 for every term, so the remainder is the constant 3 and the nth term is n² + 3. Check n = 2: 2² + 3 = 7, which is the second term.</p>
<h3>Special sequences: squares, cubes and triangular numbers</h3>
<p>Some sequences should be recognised on sight. The square numbers are 1, 4, 9, 16, with nth term n². The cube numbers are 1, 8, 27, 64, with nth term n³. Triangular numbers are 1, 3, 6, 10, 15, and their nth term is n(n + 1) / 2. A sequence that matches one of these, with a small change, is often a question about adjusting the standard pattern.</p>
<h3>Recognising a sequence from its pattern</h3>
<p>Some questions give a pattern made of shapes or matchsticks and ask for the number of items in a given step. Write down the number for the first three steps, find the difference or the second difference, and form the rule. For steps that add 4 matchsticks each time, starting from 4 matchsticks, the rule is 4n. Test the rule against a step that is not used to find it, so that a pattern that only fits the first two steps is caught.</p>
<h3>Sequences in context</h3>
<p>A context question describes a sequence in words, such as the number of tiles in a border or the total of a savings plan that adds the same amount each month. Identify whether the change is by a fixed amount or a fixed factor, write the nth term, and then answer the question in the words of the context. A reply that states "the 12th term is 40" should go on to say what the 40 represents, such as the number of tiles in the 12th border.</p>
`,
  },
  {
    id: ID,
    slug: SLUG,
    proseOnly: true,
    heading: "Functions: notation, evaluation, domain and range",
    html: `<h2>Functions: notation, evaluation, domain and range</h2>
<p>A function takes an input, applies a rule, and gives exactly one output for each input. Functions are written in notation such as f(x), which is read as "f of x". The subsections below cover the notation, how to evaluate a function, and how to state the set of inputs and outputs that a function can have.</p>
<h3>What a function does</h3>
<p>Think of a function as a machine. Each input goes in, the rule is applied, and one output comes out. For the function f(x) = 2x + 1, the input 3 gives the output 7. A function cannot give two different outputs for the same input, which is why a rule such as "the square root of x" is only a function when the positive root is taken by convention.</p>
<h3>Function notation f(x)</h3>
<p>The letter in front of the bracket names the function, and the letter in the bracket is the input variable. The statement f(x) = x² − 4 says that the function called f squares its input and subtracts 4. Any letter can name a function, such as g or h, and the variable inside the bracket can be replaced by an expression, so the notation is used in the same way for every rule.</p>
<h3>Evaluating f(x) for a given input</h3>
<p>To find f(3) when f(x) = x² − 4, replace every x in the rule by 3 and calculate: f(3) = 3² − 4 = 9 − 4 = 5. Write the substitution in full, including the brackets around negative inputs, because f(−3) = (−3)² − 4 is different from −3² − 4 when the brackets are dropped.</p>
<h3>Finding a function of an expression</h3>
<p>The input can be an expression rather than a number. For f(x) = 2x + 1, the expression f(x + 2) replaces x by x + 2 everywhere in the rule, giving 2(x + 2) + 1, which expands to 2x + 5. Expand the brackets fully before you simplify, and keep the result as a single expression in x.</p>
<h3>Solving f(x) = k</h3>
<p>To find the input that gives a particular output, set the rule equal to that output and solve. For f(x) = 2x + 1, the input that gives 11 satisfies 2x + 1 = 11, so 2x = 10 and x = 5. Check the answer by evaluating f(5) = 11, which confirms the solution.</p>
<h3>Domain: the inputs a function can take</h3>
<p>The domain is the set of inputs for which the function is defined. For f(x) = 1 / (x − 2), the input 2 is not allowed because it makes the denominator zero, so the domain is every real number except 2. Write the domain as a statement, such as "all real numbers except 2", and not as a list of the values you tried.</p>
<h3>Range: the outputs a function can give</h3>
<p>The range is the set of outputs that the function actually produces for its domain. For f(x) = x² on all real numbers, the outputs are never negative, so the range is every number greater than or equal to 0. Work out the range from the rule and the domain together, and sketch the graph if the shape is not obvious from the algebra.</p>
`,
  },
  {
    id: ID,
    slug: SLUG,
    proseOnly: true,
    heading: "Composite and inverse functions",
    html: `<h2>Composite and inverse functions</h2>
<p>Two functions can be combined by applying one after the other, which is a composite function, or undone by an inverse function that reverses the rule. Both appear in OL questions on the functions statement, and both depend on the order in which the operations are carried out. The subsections below show the order rule, how to build each form, and how to check the answer.</p>
<h3>Composite functions: applying one after another</h3>
<p>The composite function fg(x) means apply g first and then apply f to the result. It is written f(g(x)). Take f(x) = 2x + 1 and g(x) = x − 3. Then fg(x) = f(x − 3) = 2(x − 3) + 1 = 2x − 5. Work from the inside of the bracket outwards, because the inner function is applied first.</p>
<h3>Why the order of composition matters</h3>
<p>Composition is not usually commutative, so fg(x) and gf(x) give different answers. For the same functions, gf(x) = g(2x + 1) = 2x + 1 − 3 = 2x − 2. The two results differ, so an exam question that asks for fg must be answered with the functions taken in that order, and the reverse order is a different function.</p>
<h3>Finding the inverse of a function</h3>
<p>The inverse function f⁻¹ reverses what f does. To find it, write y = f(x), swap x and y, and then solve for y. For f(x) = 2x + 1, write y = 2x + 1, swap to get x = 2y + 1, and solve to give y = (x − 1) / 2. So f⁻¹(x) = (x − 1) / 2. The inverse is written with the index −1, which is not an exponent.</p>
<h3>Checking an inverse by composition</h3>
<p>An inverse is correct when composing it with the original function returns the input. Check that f(f⁻¹(x)) = x. With f⁻¹(x) = (x − 1) / 2, f(f⁻¹(x)) = 2 × (x − 1) / 2 + 1 = x − 1 + 1 = x. The result is x, so the inverse is correct. This check takes less time than re-solving the equation, and it catches a sign or a division error.</p>
<h3>Inverses of linear functions</h3>
<p>For a linear function ax + b, the inverse is found by undoing the operations in reverse order. First subtract b, then divide by a. So the inverse of 3x − 6 is (x + 6) / 3. Undo the operations in the opposite order to the way they were applied, because the last operation done by the function is the first one to undo.</p>
<h3>Composite and inverse functions together</h3>
<p>An exam question may combine the two ideas, for example asking for the composite of a function with an inverse. Evaluate the inner function or inverse first, and then apply the outer function to the result. Write each stage on its own line, so that a method mark can be given even when the final answer is wrong.</p>
<h3>Common mistakes with inverse functions</h3>
<p>The most frequent errors are reversing the operations in the wrong order, forgetting to swap x and y before solving, and writing f⁻¹(x) as 1 / f(x). The last error confuses the inverse with the reciprocal. An inverse function does not exist for every function, but it does exist for the linear functions in this statement, and checking by composition confirms the working.</p>
`,
  },
];

module.exports = { sections };
