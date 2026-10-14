-- Maths OL batch 1: notes top-up (append only)

UPDATE study_materials SET content = content || $n$
<h3>Solving linear equations step by step</h3>
<p>Collect the unknown on one side and the numbers on the other, undoing operations in the reverse order to BODMAS. Whatever you do to one side you must do to the other. When brackets are present, expand first, then collect like terms. Fractions are cleared by multiplying every term by the lowest common denominator.</p>
<h3>Simultaneous equations</h3>
<p>Two linear equations in x and y can be solved by elimination (make the coefficient of one unknown equal and opposite, then add or subtract) or by substitution (rearrange one equation for one unknown and put it into the other). Check the answer in both original equations. Examiners award method marks for a correct, clearly shown elimination even when arithmetic slips later.</p>
<h3>Rearranging formulae</h3>
<p>Treat the subject letter as the unknown and apply inverse operations. Where the subject appears twice, gather every term containing it, factorise, then divide. Square roots or squares are undone with a square and a root, applied to both sides.</p>
$n$ WHERE material_type = 'notes' AND topic_id = (SELECT id FROM topics WHERE slug = 'algebra-equations');

UPDATE study_materials SET content = content || $n$
<h3>Plotting and reading straight-line graphs</h3>
<p>A table of values is set up from the equation, points are plotted and joined with a ruler. For y = mx + c, m is the gradient and c the y-intercept. The gradient is the change in y divided by the change in x, measured on a large triangle drawn on the line, not between two points read from a table.</p>
<h3>Quadratic and cubic curves</h3>
<p>Curves are drawn freehand as smooth curves through plotted points. Turning points, roots (where the curve cuts the x-axis) and the y-intercept are read directly from the graph. A quadratic has one turning point; a cubic can have up to two.</p>
<h3>Using graphs to solve equations</h3>
<p>To solve f(x) = k, draw the line y = k and read the x-coordinates where it meets the curve. Intersections of two graphs give simultaneous solutions. Always state the solutions to the accuracy the question asks for.</p>
$n$ WHERE material_type = 'notes' AND topic_id = (SELECT id FROM topics WHERE slug = 'algebra-graphs');

UPDATE study_materials SET content = content || $n$
<h3>Solving linear inequalities</h3>
<p>Inequalities are solved like equations, with one crucial exception: multiplying or dividing both sides by a negative number reverses the inequality sign. Answers are written as a single inequality such as x &gt; 3, or as a set such as -2 &lt; x ≤ 5 when two bounds are given.</p>
<h3>Representing inequalities on a number line</h3>
<p>An open circle marks a strict bound (&lt; or &gt;) that is not included; a filled circle marks an inclusive bound (≤ or ≥). Shade the region that satisfies the statement.</p>
<h3>Regions on a coordinate grid</h3>
<p>Draw each boundary line as a solid line for ≤ or ≥ and a dashed line for &lt; or &gt;. Test a point such as (0, 0) if it is not on the line; shade the side that makes the inequality true. Where several regions are required, the wanted region is the overlap of all the shaded areas. Integer points inside a region are counted when a question asks for them.</p>
$n$ WHERE material_type = 'notes' AND topic_id = (SELECT id FROM topics WHERE slug = 'algebra-inequalities');

UPDATE study_materials SET content = content || $n$
<h3>Finding the nth term of a linear sequence</h3>
<p>For a sequence with a constant difference d, the nth term is dn + (a − d), where a is the first term. Check the rule by substituting n = 1, 2 and 3 before using it. Given a term value, set the nth term equal to it and solve for n to test whether it belongs to the sequence.</p>
<h3>Functions as machines</h3>
<p>A function takes an input and gives exactly one output. Composite functions are applied right to left: fg(x) means apply g first, then f. The inverse f⁻¹ reverses each step, found by writing y = f(x), swapping x and y, and rearranging for y.</p>
<h3>Domain and range</h3>
<p>The domain is the set of allowed inputs; the range is the set of outputs produced. Restrictions usually come from division by zero or from taking square roots of negative numbers. State both when asked to describe a function fully.</p>
$n$ WHERE material_type = 'notes' AND topic_id = (SELECT id FROM topics WHERE slug = 'algebra-sequences-and-functions');

UPDATE study_materials SET content = content || $n$
<h3>Expanding brackets</h3>
<p>Each term outside a bracket multiplies every term inside it. For a double bracket, multiply each term in the first by each term in the second, then collect like terms. Expanding (x + 3)(x − 5) gives x² − 2x − 15. Keep track of signs carefully, since most lost marks come from negative terms.</p>
<h3>Factorising</h3>
<p>Take out the highest common factor first, then look for a pair of brackets. For a quadratic x² + bx + c, find two numbers that multiply to c and add to b. For the difference of two squares, a² − b² = (a + b)(a − b). Check by expanding your answer.</p>
<h3>Algebraic fractions</h3>
<p>Simplify by factorising the numerator and denominator and cancelling common factors. Add or subtract fractions by writing them over a common denominator. Never cancel terms that are added, only factors that multiply.</p>
$n$ WHERE material_type = 'notes' AND topic_id = (SELECT id FROM topics WHERE slug = 'algebra-simplifying-and-expanding');
