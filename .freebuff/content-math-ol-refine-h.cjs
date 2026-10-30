/**
 * Mathematics OL deepening, pass h: adds h3 subsections to the right-angled
 * trigonometry note (syllabus 6.1 Pythagoras' theorem, 6.2 right-angled
 * triangles, 6.3 exact values, 6.6 combined methods). Prose-only sections,
 * inserted before "Equations and symbols" by refine-note-sections.cjs; nothing
 * already in the note is rewritten.
 */

const ID = "dcb48bc6-ebfa-4469-9a47-d9fc8394172f";
const SLUG = "trigonometry-right-angled-triangles";

const sections = [
  {
    id: ID,
    slug: SLUG,
    proseOnly: true,
    heading: "Pythagoras' theorem in more depth",
    html: `<h2>Pythagoras' theorem in more depth</h2>
<p>Pythagoras' theorem states that in a right-angled triangle the square of the hypotenuse equals the sum of the squares of the other two sides, so c² = a² + b², where c is the hypotenuse. The theorem is used in two directions: to find a missing side when the triangle is known to be right-angled, and to test whether a triangle is right-angled at all. The subsections below cover both directions, the common number patterns, and the errors that cost marks.</p>
<h3>Finding the hypotenuse</h3>
<p>When the two shorter sides are known, add their squares and take the square root. For a triangle with shorter sides 5 cm and 12 cm, the hypotenuse is √(5² + 12²) = √(25 + 144) = √169 = 13 cm. The hypotenuse is always the longest side and always opposite the right angle, so it is the side that is added, not subtracted, in the calculation.</p>
<h3>Finding a shorter side</h3>
<p>When the hypotenuse and one shorter side are known, subtract the square of the known shorter side from the square of the hypotenuse, then take the square root. For a hypotenuse of 13 cm and a side of 5 cm, the missing side is √(13² − 5²) = √(169 − 25) = √144 = 12 cm. Write the subtraction out in full, because the most common error in this type of question is to add the squares by mistake.</p>
<h3>Testing whether a triangle is right-angled</h3>
<p>The converse of Pythagoras' theorem says that if the square of the longest side equals the sum of the squares of the other two, the triangle is right-angled. For sides 6, 8 and 10, the check is 6² + 8² = 36 + 64 = 100 = 10², so the triangle is right-angled. For sides 7, 8 and 10, the check is 49 + 64 = 113, which is greater than 100, so the triangle is acute and not right-angled. Always compare the squares of the longest side with the others.</p>
<h3>Pythagorean triples</h3>
<p>A Pythagorean triple is a set of three whole numbers that satisfy a² + b² = c². The most used are 3, 4, 5; 5, 12, 13; 8, 15, 17; and 7, 24, 25. Any multiple of a triple is also a triple, so 6, 8, 10 and 9, 12, 15 are triples. Recognising a triple lets you give an exact answer with no square root, which is often what the question wants when the sides are whole numbers.</p>
<h3>Pythagoras in a problem with several triangles</h3>
<p>Some questions need the theorem twice, because the first right-angled triangle gives a side that is needed in the second. For example, a rectangle 9 cm by 12 cm has a diagonal of √(9² + 12²) = 15 cm. If a second triangle uses that diagonal as one of its sides, the same method applies again. Mark the sides you have found on the diagram before starting the next step, so each calculation has its numbers ready.</p>
<h3>Real-world problems with Pythagoras</h3>
<p>A ladder leaning against a wall, a diagonal across a field and the straight-line distance between two towns are all Pythagoras problems once the right angle is identified. Draw the triangle, label the hypotenuse as the longest side, and state which right angle the theorem is being used at. A question that describes a route going east then north is a right-angled triangle formed by the two legs and the straight line between the ends.</p>
<h3>Rounding and giving the answer</h3>
<p>Leave square roots exact if the question asks for an exact answer, and give a decimal to the accuracy the question states. A calculation that gives √50 can be left as 5√2 for an exact answer, or written as 7.07 to 3 significant figures for a decimal answer. Do the rounding only at the last step, because rounding an intermediate square root and then squaring it can change the final answer.</p>
<h3>Common errors with Pythagoras</h3>
<p>The errors that lose marks are forgetting the square root at the end, adding when the question needs a subtraction, and applying the theorem to a triangle that is not right-angled. Check the answer by reversing the calculation: square the two shorter sides, add them, and confirm the result equals the square of the hypotenuse. A quick reversal catches most slips.</p>
`,
  },
  {
    id: ID,
    slug: SLUG,
    proseOnly: true,
    heading: "Trigonometric ratios in more depth",
    html: `<h2>Trigonometric ratios in more depth</h2>
<p>The sine, cosine and tangent ratios connect an angle in a right-angled triangle to the ratio of two sides. They are defined by sin θ = opposite ÷ hypotenuse, cos θ = adjacent ÷ hypotenuse and tan θ = opposite ÷ adjacent, and the calculator supplies the values. The subsections below cover naming the sides, the two directions of use (finding a side and finding an angle), and why the ratios depend only on the angle.</p>
<h3>Naming the sides from the angle</h3>
<p>The three sides are named from the point of view of the angle θ you are using. The hypotenuse is opposite the right angle and is always the longest. The opposite side is the one across from θ, and the adjacent side is the one next to θ that is not the hypotenuse. The same side is the opposite side for one angle and the adjacent side for the other acute angle, so name the sides again for each angle rather than once for the whole triangle.</p>
<h3>Finding a side when an angle is known</h3>
<p>Choose the ratio that uses the side you know and the side you want. If the hypotenuse is 10 cm and the angle is 30°, and you want the opposite side, use sin 30° = opposite ÷ 10, so the opposite side is 10 × sin 30° = 10 × 0.5 = 5 cm. Writing the ratio first, with the unknown alone on one side, is the step that keeps the working correct.</p>
<h3>Finding an angle from a ratio</h3>
<p>When two sides are known, find the ratio and use the inverse function on the calculator. For opposite 7 and adjacent 24, tan θ = 7 ÷ 24 = 0.2917, so θ = tan⁻¹(0.2917) = 16.3° to 1 decimal place. Use sin⁻¹, cos⁻¹ or tan⁻¹ according to the pair of sides, and never take the inverse of a ratio that you have not first worked out.</p>
<h3>Setting the calculator to degrees</h3>
<p>Every trigonometry question in this note uses degrees, so the calculator must be in degree mode before any value is found. A calculator in radian mode gives sin 30 = −0.988, which is a wrong answer that looks like a real value. Check the mode at the start of each exam and again if an answer looks unreasonable. A quick test is that sin 30 should return 0.5 in degree mode.</p>
<h3>Why the ratios depend only on the angle</h3>
<p>Two right-angled triangles with the same angle are similar, so the ratio of opposite to hypotenuse is the same in both. A triangle with a hypotenuse of 10 and opposite of 5 has the same sin θ as one with hypotenuse 20 and opposite 10. This is why a table of sine values works for every triangle, and it is the reason the ratios can be used to find unknown sides.</p>
<h3>Complementary angles</h3>
<p>In a right-angled triangle the two acute angles add to 90°, so each is the complement of the other. This gives sin θ = cos (90° − θ) and cos θ = sin (90° − θ). For example, sin 30° = cos 60° = 0.5. The relationship is useful for checking a value, and it explains why sine and cosine are the same curve shifted by 90°.</p>
<h3>Tangent as sine over cosine</h3>
<p>The tangent ratio is the sine divided by the cosine, because tan θ = (opposite ÷ hypotenuse) ÷ (adjacent ÷ hypotenuse) = opposite ÷ adjacent. This is the form to use when a question gives the tangent of an angle and asks for a side, and it also explains why tangent is undefined at 90°, where the adjacent side would have length zero.</p>
`,
  },
  {
    id: ID,
    slug: SLUG,
    proseOnly: true,
    heading: "Trigonometry in three dimensions",
    html: `<h2>Trigonometry in three dimensions</h2>
<p>Many three-dimensional questions are answered by finding a right-angled triangle inside a solid and then using the methods already covered. The skill is to see the triangle, not to learn a new rule. The subsections below cover the angle between a line and a plane, the diagonal of a solid, and the choice of triangle in a pyramid or cone.</p>
<h3>Finding a right-angled triangle inside a solid</h3>
<p>In a cuboid, a cone or a pyramid, pick the triangle that contains both the length you want and a length you know. The triangle must have a right angle, and that right angle is often at a vertex where an edge meets the base or where the height meets the base. Draw the triangle on its own, separate from the solid, with the known lengths marked on it. This makes the method the same as the two-dimensional case.</p>
<h3>The diagonal of a cuboid</h3>
<p>A cuboid with sides 3 cm, 4 cm and 12 cm has a base diagonal of √(3² + 4²) = 5 cm. The space diagonal is then found using the base diagonal and the vertical edge: √(5² + 12²) = √169 = 13 cm. Two applications of Pythagoras give the answer, and the first triangle lies flat on the base while the second stands on its edge.</p>
<h3>The angle between a line and the base</h3>
<p>To find the angle a space diagonal makes with the base, first find the base diagonal, then use the triangle formed by the vertical height, the base diagonal and the space diagonal. For a box with a base diagonal of 10 cm and a vertical height of 12 cm, the angle is tan θ = 12 ÷ 10 = 1.2, so θ = tan⁻¹(1.2) = 50.2°. The angle is measured between the line and the base, not the vertical.</p>
<h3>Heights in pyramids and cones</h3>
<p>The vertical height of a pyramid or cone meets the base at a right angle, so it forms a right-angled triangle with a line from the centre of the base to a corner or to the edge. For a square-based pyramid with base side 10 cm, the distance from the centre of the base to a corner is √(5² + 5²) = √50 = 7.07 cm to 2 decimal places. The slant edge then uses that distance and the vertical height.</p>
<h3>Choosing the triangle that contains the answer</h3>
<p>Ask what you need to find, then identify the triangle whose sides include it. If the question asks for an angle in a plane through the solid, use the triangle in that plane. If it asks for a length along a diagonal of the base, use the triangle in the base. Writing down the triangle you have chosen before any calculation prevents the common error of using lengths from two different triangles in one step.</p>
<h3>Sketching a three-dimensional figure</h3>
<p>A clear sketch is worth marks, because it shows the examiner which triangle you are using. Draw the solid as a simple outline, use dashed lines for hidden edges, and mark the right angle with a small square. Label the lengths you know and the one you want. A sketch that is a neat outline with the triangle shaded is enough, and it does not need to be drawn to scale.</p>
<h3>Checking the three-dimensional answer</h3>
<p>A space diagonal must be longer than any edge of the solid, and an angle with the base must lie between 0° and 90°. In the cuboid example, 13 cm is longer than the 12 cm edge, which confirms the calculation. An answer that is shorter than an edge, or an angle above 90° for a line to the base, shows a wrong triangle or a swapped length.</p>
`,
  },
  {
    id: ID,
    slug: SLUG,
    proseOnly: true,
    heading: "Accuracy, units and reporting answers",
    html: `<h2>Accuracy, units and reporting answers</h2>
<p>A correct method can still lose the final mark through rounding too early, leaving out a unit or giving the wrong degree of accuracy. The syllabus asks for answers to a stated accuracy, and the examiner checks the final line against the question. The subsections below give the rules for rounding, units and presentation that apply to every right-angled trigonometry question.</p>
<h3>Working with the calculator's full value</h3>
<p>Keep the full calculator value in memory and round only the final answer, or round to at least one more significant figure than the answer requires. If a side is found as 7.0711… and then used in a second calculation, the rounded 7.07 can give a final answer that is one unit out. Use the stored value where the calculator allows it, or write intermediate answers to four significant figures at least.</p>
<h3>Significant figures and decimal places</h3>
<p>Read the question carefully for the accuracy it requires. \"Give your answer to 3 significant figures\" means the first three non-zero digits, so 16.2849 becomes 16.3 and 0.0034567 becomes 0.00346. \"Give your answer to 1 decimal place\" means one digit after the point, so 16.2849 becomes 16.3. The two rules differ for numbers below 1 and for numbers that are whole.</p>
<h3>Giving exact answers</h3>
<p>When an answer is a surd or uses an exact trigonometric value, give it exactly if the question asks for an exact value. A hypotenuse of √50 simplifies to 5√2, and sin 30° is exactly 1/2. If the question asks for a decimal, round the exact value at the end. An exact answer is always acceptable where the question says \"exact\", and a decimal is not.</p>
<h3>Units in the final answer</h3>
<p>Every length answer needs a unit, and the unit must match the question. If the sides are in centimetres, the answer is in centimetres, and an area is in square centimetres. A common error is to convert the unit partway through a calculation and forget to convert the final answer, so state the unit next to the number at every step and check it at the end.</p>
<h3>Angles and the form of the answer</h3>
<p>An angle answer is given in degrees to the accuracy asked for, with the degree sign. For bearings, the answer has three figures and is measured clockwise from north, as covered in the mensuration note. An angle of elevation or depression is given as a single angle from the horizontal, so check that the question asks for the angle from the horizontal and not from the vertical.</p>
<h3>Estimating before calculating</h3>
<p>Estimate the answer before using the calculator, so a wrong value is obvious. A side opposite a 30° angle in a triangle with hypotenuse 10 must be less than half the hypotenuse, so the answer cannot be 8. Estimating takes seconds and is the simplest protection against a wrong mode, a swapped ratio or a misplaced decimal point.</p>
<h3>Checking the answer against the diagram</h3>
<p>Compare the answer with the diagram once it is found. The longest side must be the hypotenuse, an angle opposite a longer side must be larger, and a side in a triangle with a 60° angle must not be shorter than one opposite a 30° angle. A result that contradicts the diagram means the wrong ratio or the wrong side was used, and the calculation should be repeated before the answer is written.</p>
<h3>Presenting the working for method marks</h3>
<p>Write each step on its own line: the formula or ratio, the substitution, the calculation, and the result with its unit. The method marks are given for the ratio and the substitution, even if the final number is wrong, so a clear working is worth marks in its own right. A bare final answer, even when it is correct, can earn only the marks for the answer.</p>
`,
  },
];

module.exports = { sections };
