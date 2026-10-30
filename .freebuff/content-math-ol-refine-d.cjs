/**
 * Mathematics OL deepening, pass d: adds h3 subsections to the inequalities
 * note (syllabus 2.6). Prose-only sections, inserted before "Equations and
 * symbols" by refine-note-sections.cjs; nothing already in the note is rewritten.
 */

const sections = [
  {
    id: "a5a88378-f424-47de-9f47-e92967a125cc",
    slug: "algebra-inequalities",
    proseOnly: true,
    heading: "Inequality symbols and the number line",
    html: `<h2>Inequality symbols and the number line</h2>
<p>An inequality compares two expressions that are not necessarily equal. There are four symbols, and each one says which side is larger. Reading the symbol correctly is the first step in every inequality question, and most errors in this topic start with a misread symbol rather than with the algebra.</p>
<h3>The four inequality symbols</h3>
<p>The symbol &lt; means less than, &gt; means greater than, \u2264 means less than or equal to, and \u2265 means greater than or equal to. The open symbols &lt; and &gt; exclude the boundary value, and the symbols with a bar underneath include it. Write the symbol that matches the wording, because \"at least 5\" is \u2265 5 and \"more than 5\" is &gt; 5.</p>
<h3>Drawing a number line</h3>
<p>Mark the boundary value on a number line with an open circle for &lt; or &gt;, and a filled circle for \u2264 or \u2265. Shade the side of the line that contains the solutions. A filled circle at 3 with shading to the right shows x \u2265 3, which includes 3 itself. The open circle at 3 with shading to the left shows x &lt; 3, which does not.</p>
<h3>Writing a solution set from a number line</h3>
<p>To write the inequality from a number line, find the boundary value, decide whether the circle is open or filled, and check the direction of the shading. Shading to the right of the boundary gives a greater-than form, and shading to the left gives a less-than form. Read the direction from the arrow of the shading, not from the side on which the circle sits.</p>
<h3>Solutions as whole numbers</h3>
<p>Many questions ask for the integers that satisfy an inequality. If x &lt; 4 and x is a positive integer, the solutions are 1, 2 and 3, and 4 is excluded. The boundary value decides the list: x \u2264 4 would include 4. List the values in order, separated by commas, and do not include values that the inequality excludes.</p>
<h3>Double inequalities</h3>
<p>A double inequality such as \u22122 &lt; x \u2264 5 states two conditions at once: x is greater than \u22122 and x is at most 5. On a number line, the two boundaries limit a single shaded section. Keep the inequality in one line when you solve it, and apply every operation to all three parts, so that the middle term is treated the same as the outer two.</p>
<h3>Common reading errors</h3>
<p>The two errors that cost the most marks are reversing the boundary value by mistake and marking the circle the wrong way. An answer of x \u2264 3 drawn with an open circle is wrong even though the direction is right, because the examiner checks the circle as well as the shading. Check both before you move on to the algebra.</p>
`,
  },
  {
    id: "a5a88378-f424-47de-9f47-e92967a125cc",
    slug: "algebra-inequalities",
    proseOnly: true,
    heading: "Solving linear inequalities step by step",
    html: `<h2>Solving linear inequalities step by step</h2>
<p>A linear inequality is solved in the same way as a linear equation, with one rule added: the inequality sign changes direction whenever both sides are multiplied or divided by a negative number. The subsections below take the steps in the order an examiner marks them.</p>
<h3>Collecting the variable on one side</h3>
<p>Add or subtract terms until all the x-terms sit on one side and the constants sit on the other. Adding or subtracting the same quantity from both sides keeps the inequality true, and the sign stays the same. For 3x + 5 &gt; x + 11, subtract x from both sides to get 2x + 5 &gt; 11, then subtract 5 to get 2x &gt; 6.</p>
<h3>Dividing by a positive number</h3>
<p>Divide both sides by the coefficient of x. When that coefficient is positive, the inequality sign stays the same. From 2x &gt; 6, dividing by 2 gives x &gt; 3, and the solution is every value greater than 3.</p>
<h3>Dividing by a negative number</h3>
<p>When both sides are divided by a negative number, the sign must flip. From \u22124x \u2265 12, dividing by \u22124 gives x \u2264 \u22123. Check this by taking a value from the solution: x = \u22125 satisfies the original inequality, since \u22124 \u00d7 (\u22125) = 20 is at least 12, and \u22125 is less than \u22123.</p>
<h3>Multiplying by a fraction or a bracket</h3>
<p>To remove a fraction, multiply both sides by the denominator, which is positive in most questions, so the sign stays the same. Expand any bracket before you collect terms. For (x \u2212 2) / 3 &lt; 4, multiply both sides by 3 to get x \u2212 2 &lt; 12, then add 2 to get x &lt; 14.</p>
<h3>Checking the solution with a test value</h3>
<p>Choose a value that lies inside your solution and substitute it into the original inequality. If x &gt; 3 is correct, the value 4 should make the original statement true. If it does not, the sign was reversed somewhere in the working. A test value takes a few seconds and catches the most common error in this topic.</p>
<h3>Writing the answer in the form the question asks for</h3>
<p>Give the answer as an inequality in x, such as x &lt; 5, or in the form the question asks for. Keep the variable on the left in the final answer, and make sure the sign matches the direction you found. A correct solution written with the wrong symbol still loses the mark.</p>
`,
  },
  {
    id: "a5a88378-f424-47de-9f47-e92967a125cc",
    slug: "algebra-inequalities",
    proseOnly: true,
    heading: "Two inequalities together: finding the overlap",
    html: `<h2>Two inequalities together: finding the overlap</h2>
<p>Many questions give two inequalities in the same variable and ask for the values that satisfy both. The answer is the overlap of the two solution sets. The subsections below show how to find that overlap and how to present it.</p>
<h3>Solving each inequality separately</h3>
<p>Solve each inequality on its own first, exactly as you would solve a single inequality, and keep each answer in its own line. If one gives x &gt; 2 and the other gives x \u2264 7, write both results before you combine them. Combining too early is the usual source of a sign error.</p>
<h3>Finding the overlap on a number line</h3>
<p>Draw both solution sets on the same number line, one above the other, and find where the shading of both overlaps. The overlap is the answer, and it is the only region where both conditions hold at once. Use open or filled circles on each boundary exactly as you would for a single inequality.</p>
<h3>Writing the overlap as a double inequality</h3>
<p>When the overlap is a bounded interval, write it as a double inequality. For x &gt; 2 and x \u2264 7, the overlap is 2 &lt; x \u2264 7. Put the smaller boundary on the left and keep the inequality symbols in the same direction, so that the expression reads from smallest to largest.</p>
<h3>When the two sets do not overlap</h3>
<p>Sometimes the two solution sets have no values in common. For x &lt; 1 and x &gt; 5, no number is less than 1 and greater than 5 at once, so the answer is that there is no solution. State this clearly in words, rather than leaving the answer blank, because the examiner gives the mark for recognising it.</p>
<h3>Integer solutions of a combined inequality</h3>
<p>If the question asks for the whole numbers that satisfy both conditions, list the overlap first and then pick out the integers. For 2 &lt; x \u2264 7 the integers are 3, 4, 5, 6 and 7, and 2 is excluded. Check the endpoints one at a time, because the open and filled circles decide whether each end is in the list.</p>
<h3>Inequalities with a variable on both sides</h3>
<p>When the variable appears on both sides, collect the x-terms on one side before you solve. Write 5x \u2212 3 \u2265 2x + 9, subtract 2x from both sides to get 3x \u2212 3 \u2265 9, then add 3 to get 3x \u2265 12, and divide by 3 to get x \u2265 4. Each step keeps the variable on the same side, so the sign never needs a second thought.</p>
<h3>Checking a combined answer</h3>
<p>Test one value from inside the overlap and one value from outside it. The value inside must satisfy both original inequalities, and the value outside must fail at least one of them. This check confirms that the overlap is right and that neither boundary was reversed.</p>
<h3>Presenting a two-part answer clearly</h3>
<p>Show each solved inequality, then the overlap, then the final answer, in that order. The mark scheme awards the separate solutions and the overlap separately, so a single unexplained line can lose a method mark even when the answer is correct.</p>
`,
  },
  {
    id: "a5a88378-f424-47de-9f47-e92967a125cc",
    slug: "algebra-inequalities",
    proseOnly: true,
    heading: "Inequalities in context: limits, budgets and sensible answers",
    html: `<h2>Inequalities in context: limits, budgets and sensible answers</h2>
<p>Inequalities describe limits in real situations: a maximum load, a budget that cannot be exceeded, or a minimum number of items needed. The algebra is the same as in a pure question, but the answer must also make sense in the context. The subsections below cover how to turn a situation into an inequality and how to check the result.</p>
<h3>Turning a sentence into an inequality</h3>
<p>Identify the unknown quantity, give it a letter, and then translate the key phrase into a symbol. "At most 20 students" gives n \u2264 20, "more than \u00a35" gives c &gt; 5, and "at least 3 hours" gives t \u2265 3. Write the inequality before you solve it, so the wording is checked against the symbol once and not guessed at during the algebra.</p>
<h3>Maximum and minimum limits</h3>
<p>A limit such as "the mass must not exceed 12 kg" is an upper bound, which is written with \u2264. A requirement such as "the score must be at least 60" is a lower bound, which is written with \u2265. Read the phrase "not exceed" as \u2264 and "not less than" as \u2265, because these are the phrases that most often lead to the wrong symbol.</p>
<h3>Budgets and total costs</h3>
<p>For a budget, form an inequality from the total cost: if each ticket costs \u00a34 and the total must not exceed \u00a340, then 4n \u2264 40, so n \u2264 10. The largest whole number that satisfies the inequality is the most tickets the budget allows. Give the answer as a whole number in context, because 10.5 tickets is not a sensible answer.</p>
<h3>Choosing the right whole-number answer</h3>
<p>When the solution is a bound, the answer in context is often the largest or smallest whole number inside it. From n \u2264 10.5, the number of items can only be 10, since an 11th item would exceed the limit. Rounding up or down depends on which way the inequality points, so check the direction against the wording of the question.</p>
<h3>Interpreting the answer in words</h3>
<p>Finish a context question with a sentence that states the answer in terms of the situation, such as "The maximum number of tickets is 10." A bare inequality such as n \u2264 10 does not say what n is, and the interpretation mark depends on the sentence. Use the name of the quantity and its unit.</p>
<h3>Checking the answer against the situation</h3>
<p>Test a value from the answer in the original situation and confirm that it satisfies the wording. If the answer says the speed can be at most 30 km/h, a speed of 25 km/h must be allowed by the situation and a speed of 35 km/h must not. This check catches a reversed sign and a boundary that was misread.</p>
<h3>Negative values in a context</h3>
<p>A quantity such as time, length or number of people cannot be negative, even if the algebra gives a negative solution. A solution of t \u2265 \u22122 for a time means that every positive time works, and the answer should say that the constraint is satisfied for every non-negative time. Check the physical meaning of the variable before you state the final answer.</p>
`,
  },
];

module.exports = { sections };
