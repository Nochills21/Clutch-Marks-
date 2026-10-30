/**
 * Mathematics OL deepening, pass i: adds h3 subsections to the indices and
 * standard form note (syllabus 1.3 powers and roots, 1.7 indices I, 1.8
 * standard form, 1.18 surds, 2.4 indices II). Prose-only sections, inserted
 * before "Equations and symbols" by refine-note-sections.cjs; nothing already
 * in the note is rewritten.
 */

const ID = "e1c1569d-a45c-4ebe-8012-6df10e500034";
const SLUG = "number-indices-and-standard-form";

const sections = [
  {
    id: ID,
    slug: SLUG,
    proseOnly: true,
    heading: "Negative and zero indices in depth",
    html: `<h2>Negative and zero indices in depth</h2>
<p>A negative index tells you to take a reciprocal, and a zero index gives the value 1. These two rules follow from the index laws, not from memory, so the working below shows how each one is forced. The subsections cover the reasons, the calculator entry, and the common slips that turn a negative power into a negative number.</p>
<h3>Why a zero index gives one</h3>
<p>Take a number and divide it by itself. Using the division law, a⁵ ÷ a⁵ = a⁰, and the same quotient is 1 because any number divided by itself is 1. So a⁰ = 1 for any non-zero a. The rule is therefore a consequence of the laws already in use, and it is why 5⁰ = 1, 100⁰ = 1 and (−3)⁰ = 1.</p>
<h3>Why a negative index is a reciprocal</h3>
<p>Divide a power by a larger power of the same base: a² ÷ a⁵ = a^(2−5) = a⁻³. Writing the same quotient as 1/a³ shows that a⁻³ = 1/a³. So a negative index moves the base to the denominator and changes the sign of the index. The value 2⁻³ is 1/2³ = 1/8, which is positive, because a negative index does not make the answer negative.</p>
<h3>Negative indices with fractions</h3>
<p>The reciprocal rule also works on fractions, where it flips the fraction. (2/3)⁻² = (3/2)² = 9/4. Invert the fraction first, then apply the positive index. A common error is to change only the index and leave the fraction alone, which gives (2/3)⁻² = 4/9 and loses the mark.</p>
<h3>Entering negative and fractional powers on a calculator</h3>
<p>Use the power key, and enter the negative index in brackets so the calculator reads the whole index as a negative number. For 5⁻², enter 5, the power key and (−2), giving 0.04. A fractional power such as 8^(1/3) is entered with brackets around the fraction, and the calculator returns 2. Check the result by reversing the operation: 2³ = 8 confirms the cube root.</p>
<h3>Simplifying expressions with negative powers</h3>
<p>To simplify 3x⁻² × 6x⁵, multiply the numbers and add the indices: 18x^(−2+5) = 18x³. To write the answer with only positive indices, move any negative power to the denominator. For example, 4y⁻³ becomes 4/y³. Collect the coefficients first, then deal with the indices, so the final form is easy to check.</p>
<h3>Mistakes with negative and zero indices</h3>
<p>The commonest errors are treating 2⁻³ as −8, writing a⁰ as 0, and reading (−2)⁻² as −1/4 when the correct value is 1/4. The bracket in (−2)⁻² is what makes the base negative, and an even power of a negative number is positive. Write the bracket in the working so the sign is clear before the reciprocal is taken.</p>
`,
  },
  {
    id: ID,
    slug: SLUG,
    proseOnly: true,
    heading: "Fractional indices and roots",
    html: `<h2>Fractional indices and roots</h2>
<p>A fractional index is a root combined with a power, so a^(1/n) is the nth root of a, and a^(m/n) is the nth root of a raised to the mth power. The index laws extend to fractions without any new rule. The subsections below explain the notation, how to evaluate by hand and on a calculator, and how fractional indices appear in equations.</p>
<h3>The meaning of a^(1/n)</h3>
<p>The index law (a^(1/2))² = a^(1/2 × 2) = a¹ = a shows that a^(1/2) must be the square root of a. In the same way a^(1/3) is the cube root and a^(1/4) is the fourth root. So 16^(1/2) = 4, 27^(1/3) = 3 and 81^(1/4) = 3. The index is the reciprocal of the root.</p>
<h3>Evaluating a^(m/n)</h3>
<p>Take the root first, then the power, because the root is usually the smaller number. For 8^(2/3), the cube root of 8 is 2, and 2² = 4. Taking the power first gives 8² = 64, and the cube root of 64 is also 4, so the order does not change the answer, but the root first keeps the numbers small and is less error-prone.</p>
<h3>Negative fractional indices</h3>
<p>A negative fractional index takes a reciprocal of the root. For 16^(−3/4), the fourth root of 16 is 2, so 2³ = 8 and the reciprocal gives 16^(−3/4) = 1/8. Apply the reciprocal last, after the root and power have been found, and write the answer as a fraction if the question asks for an exact value.</p>
<h3>Solving an equation with a fractional index</h3>
<p>To solve x^(2/3) = 4, raise both sides to the power 3/2, which undoes the 2/3. Then x = 4^(3/2) = (√4)³ = 2³ = 8. Raising both sides to the reciprocal of the index is the step to remember, and the result should be checked by substituting back: 8^(2/3) = 4.</p>
<h3>Fractional indices on the calculator</h3>
<p>Enter the base, press the power key, and enter the fraction in brackets. For 125^(2/3), the calculator gives 25. Enter the bracket around the index to avoid reading 2 ÷ 3 as a separate step, and check a simple value first, such as 9^(1/2) = 3, so a mis-entered index is spotted.</p>
<h3>Why fractional indices matter</h3>
<p>Fractional indices let a root be treated with the same index laws as a power. Once a root is written as an index, multiplying and dividing it follows the usual rules. This is why the Extended content treats roots as powers, and it is also the link to surds, which are the roots that are left unevaluated.</p>
`,
  },
  {
    id: ID,
    slug: SLUG,
    proseOnly: true,
    heading: "Standard form in calculations",
    html: `<h2>Standard form in calculations</h2>
<p>Standard form writes a number as a × 10ⁿ, where 1 ≤ a < 10 and n is a whole number. It is used to write very large and very small numbers compactly, and it allows multiplication and division to be done by applying the index laws to the powers of ten. The subsections cover converting, multiplying and dividing, adding, and the calculator display.</p>
<h3>Converting to and from standard form</h3>
<p>To write 47 000 in standard form, move the decimal point until one non-zero digit is in front of it: 4.7. The point moved 4 places left, so the power is 10⁴, giving 4.7 × 10⁴. For 0.00052, the point moves 4 places right to give 5.2, so the power is −4 and the answer is 5.2 × 10⁻⁴. Count the places moved, and remember that a move to the left is a positive power.</p>
<h3>Multiplying numbers in standard form</h3>
<p>Multiply the number parts and add the powers of ten. (3 × 10⁵) × (2 × 10³) = 6 × 10⁸. If the product of the number parts is 10 or more, rewrite it in standard form and adjust the power. For (4 × 10⁶) × (5 × 10⁴) = 20 × 10¹⁰, which is 2 × 10¹¹ in standard form.</p>
<h3>Dividing numbers in standard form</h3>
<p>Divide the number parts and subtract the powers of ten. (8 × 10⁹) ÷ (2 × 10³) = 4 × 10⁶. If the number part is not between 1 and 10, adjust it. For (9 × 10⁴) ÷ (3 × 10⁶) = 3 × 10⁻², which is 0.03.</p>
<h3>Adding and subtracting in standard form</h3>
<p>Write both numbers with the same power of ten before adding or subtracting the number parts. To add 3 × 10⁴ and 5 × 10³, write the first as 30 × 10³, so the sum is (30 + 5) × 10³ = 35 × 10³ = 3.5 × 10⁴. Rewriting the answer in standard form is the step that loses marks when it is left out.</p>
<h3>Standard form on the calculator</h3>
<p>A calculator shows a standard form answer as a number with E or as a small power-of-ten display, such as 6.0E8, which means 6.0 × 10⁸. Enter a number in standard form with the EXP or ×10ˣ key, not by typing ×10 and the power separately, because the calculator then multiplies the brackets in the wrong order. Convert the display to the written form for the final answer.</p>
<h3>Real-world uses of standard form</h3>
<p>Standard form is used for distances in space, the mass of atoms and the population of large countries. The Earth is about 1.5 × 10⁸ km from the Sun, and a hydrogen atom has a mass of about 1.7 × 10⁻²⁷ kg. Comparing two such numbers is easy in standard form, because the larger power of ten is the larger number when the number parts are similar.</p>
`,
  },
  {
    id: ID,
    slug: SLUG,
    proseOnly: true,
    heading: "Surds: simplifying and working with roots",
    html: `<h2>Surds: simplifying and working with roots</h2>
<p>A surd is a root of a number that cannot be written exactly as a whole number or a fraction, such as √2 or √12. The exact form is kept in an answer when the question asks for an exact value, so surds are simplified by taking out any square factor. The subsections cover simplifying, multiplying and dividing surds, adding them, and rationalising a denominator.</p>
<h3>Simplifying a surd by its square factor</h3>
<p>Find the largest square number that divides the number under the root. √12 = √(4 × 3) = √4 × √3 = 2√3. The square factor 4 comes out of the root as 2, and the remaining 3 stays inside. Always check that the number left inside has no square factor, because an answer like √12 is not fully simplified.</p>
<h3>Multiplying and dividing surds</h3>
<p>Multiply the numbers inside the roots and simplify the result. √3 × √5 = √15, which has no square factor and is final. For division, √20 ÷ √5 = √(20 ÷ 5) = √4 = 2. The rule works for any two surds that are multiplied or divided, because the square root of a product is the product of the square roots.</p>
<h3>Adding and subtracting surds</h3>
<p>Surds can be added only when they have the same number under the root, like terms in algebra. 3√2 + 5√2 = 8√2, because both terms are a multiple of √2. But √2 + √3 cannot be simplified and must be left as it is. Simplify each surd first, because √8 + √2 becomes 2√2 + √2 = 3√2 only after √8 is simplified.</p>
<h3>Expanding brackets with surds</h3>
<p>Expand a bracket with surds in the same way as an ordinary bracket, multiplying each term and then simplifying. (√3 + 1)(√3 − 1) = 3 − √3 + √3 − 1 = 2. The middle terms cancel because they are equal and opposite. For (√5 + 2)², expand as (√5 + 2)(√5 + 2) = 5 + 2√5 + 2√5 + 4 = 9 + 4√5.</p>
<h3>Rationalising a denominator</h3>
<p>To rationalise a denominator such as 1/√3, multiply the top and bottom by √3. This gives √3/3, which has a whole number in the denominator. For a denominator with two terms, multiply by the conjugate: 1/(√5 + 2) × (√5 − 2)/(√5 − 2) = (√5 − 2)/(5 − 4) = √5 − 2. The conjugate changes the sign of the second term and removes the surd from the denominator.</p>
<h3>Checking surd answers</h3>
<p>Check a simplified surd by estimating its decimal value on the calculator. √12 should give 3.464…, and 2√3 should give the same value. Also check that no square factor remains inside a root, because the simplified answer is the one the mark scheme expects. An exact answer is not reduced to a decimal unless the question asks for one.</p>
`,
  },
];

sections.push({
  id: ID,
  slug: SLUG,
  proseOnly: true,
  heading: "Checking index and standard form answers",
  html: `<h2>Checking index and standard form answers</h2>
<p>Most marks in this topic are lost in the last step, not the method. A result can be correct in form and still wrong in size, sign or units, so each answer should be checked against a rough estimate before it is written down. The subsections below give the estimates and checks for the main types of question.</p>
<h3>Estimating the size of a power</h3>
<p>Before calculating 3⁴ × 2⁻³, estimate it: 3⁴ is about 80 and 2⁻³ is a small fraction, so the answer should be roughly 80 ÷ 8 = 10. The exact value is 81/8 = 10.125, which agrees with the estimate. A large disagreement between the estimate and the answer signals a sign or index slip.</p>
<h3>Checking the sign of an answer</h3>
<p>A negative base raised to an even index is positive, and to an odd index it is negative. (−2)⁴ = 16 and (−2)³ = −8. Also check the sign of a negative index: 10⁻² is positive, equal to 0.01, and does not turn the answer negative. Writing the sign check as a separate line in the working catches most of these errors.</p>
<h3>Checking standard form answers</h3>
<p>The number part of a standard form answer must be at least 1 and less than 10. An answer of 25 × 10⁵ is not in standard form even though it is equal to 2.5 × 10⁶; the final step is to rewrite it. Check the power of ten by counting the digits of a rough value: a number between 10⁵ and 10⁶ has a power of 5.</p>
<h3>Checking surd and root answers</h3>
<p>Square the simplified surd to check it: (2√3)² = 4 × 3 = 12, which is the number inside the original root. Also check that a fractional index gives the right root by raising the answer back: 27^(2/3) = 9 and 9^(3/2) = 27 confirm each other. A check that returns the original number confirms the simplification.</p>
<h3>Units and the final answer</h3>
<p>When the question involves a measurement, the units must be consistent before the answer is written, and any power of ten must be converted to the unit the question asks for. A value in metres converted to centimetres is multiplied by 100, not by 100 squared, unless it is an area. Write the unit beside the final answer so the marker can see the value and the unit together.</p>
`,
});

module.exports = { sections };
