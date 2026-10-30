/**
 * Mathematics A2 deepening, permutations and combinations, pass a: five new h2
 * sections with six h3 subsections each (9 → 39 h3 headings, above the 36 bar).
 * Prose-only: counting has no geometry to draw. Inserted before
 * "Equations and symbols" by refine-note-sections.cjs; nothing already in the
 * note is rewritten.
 */

const NOTE = "a8ebc823-3b62-4380-be53-b636ae87d6b4";

const sections = [
  {
    id: NOTE,
    slug: "permutations-and-combinations",
    proseOnly: true,
    heading: "Choosing between nPr, nCr and a plain product",
    html: `<h2>Choosing between nPr, nCr and a plain product</h2>
<p>Most lost marks in this topic come from using the right formula for the wrong question. Before any calculation, decide whether you are selecting, arranging or doing both, and whether the answer depends on the order. The subsections below set out the decision in the order a careful candidate works through it.</p>
<h3>Selecting without arranging: nCr</h3>
<p>If you only need to choose a group and the order inside the group does not matter, use ⁿCᵣ = n! / (r!(n − r)!). Choosing a committee of 4 from 10 people gives ¹⁰C₄ = 210. The result counts groups, so two committees with the same members in a different order are the same committee.</p>
<h3>Selecting and arranging: nPr</h3>
<p>If the chosen items are then placed in distinct positions, the order matters and you use ⁿPᵣ = n! / (n − r)!. Choosing a chair, a vice-chair and a secretary from 10 people gives ¹⁰P₃ = 720. Each committee of 3 from the previous example can be arranged in 3! = 6 ways, so 720 = 120 × 6, which is a useful check.</p>
<h3>A plain product for independent choices</h3>
<p>When each decision is made separately and the number of options for one does not depend on the others, multiply. Three shirts and four trousers give 3 × 4 = 12 outfits. Do not reach for a combination formula here: nothing is being chosen from a single pool of identical kinds of object.</p>
<h3>Checking the order question</h3>
<p>Ask whether swapping two chosen items changes the outcome. A password changes if its letters are swapped, so it is an arrangement. A team does not change when two members swap places, so it is a selection. If the words in the question say \u201cthe first, second and third\u201d or \u201cpositions\u201d, the order matters.</p>
<h3>Worked decision</h3>
<p>Seven runners compete for gold, silver and bronze. The medals are different, so the order matters and the count is ⁷P₃ = 7 × 6 × 5 = 210. If the question asked for three runners to go through to a final with no ranking, the count would be ⁷C₃ = 35. The same seven people give 210 or 35 depending only on whether the medal order is asked for, so state which one you have chosen before you write the number.</p>
<h3>Common error: dividing when you should not</h3>
<p>Students often divide by a factorial out of habit. Divide only when items are truly identical or the outcome groups are truly unordered. Dividing ⁷P₃ by 3! to get the medal count gives 35 and throws away the difference between gold and silver, which the question asked you to keep.</p>
`,
  },
  {
    id: NOTE,
    slug: "permutations-and-combinations",
    proseOnly: true,
    heading: "Keeping items apart and placing them together",
    html: `<h2>Keeping items apart and placing them together</h2>
<p>Restriction questions usually ask that certain people or letters are together, or that they are not. Two methods work, and the complement is often shorter. Choose the method from the wording before you start counting.</p>
<h3>Together: treat the pair as one object</h3>
<p>If two items must sit together, glue them into one block. Arrange the block with the others, then multiply by the number of internal orders of the block. Seven people in a row with two particular people side by side give 6! × 2! = 720 × 2 = 1440 arrangements. Omitting the 2! halves the answer.</p>
<h3>Not together: subtract the together cases</h3>
<p>For the same seven people with the two not allowed together, the total is 7! = 5040. Subtract the 1440 arrangements in which they are together, giving 5040 − 1440 = 3600. This is usually quicker than building the arrangements directly, because the gaps between people are hard to count without listing them.</p>
<h3>Not together: place people in the gaps</h3>
<p>An alternative for the same question is to arrange the other five people first, which gives 5! = 120 orders. There are six gaps, including the two ends, and the two special people must go into different gaps. Choose 2 of the 6 gaps in order, 6P2 = 30 ways, and this gives 120 × 30 = 3600. Both methods agree, and showing the second one earns the method marks even if the first has an error.</p>
<h3>Letters that must not be adjacent</h3>
<p>For the word HEART with the vowels E and A not next to each other, count the arrangements with the vowels together (4! × 2! = 48) and subtract from 5! = 120, giving 72. The same subtraction pattern applies to any pair that must be kept apart.</p>
<h3>Position restrictions</h3>
<p>If one person must stand at one end, fix that person first and arrange the rest. A person fixed at one end leaves 6 people for 6 places, giving 6! = 720. Fixing the restricted item before counting the free ones avoids double counting, which is the usual cause of an answer that is too large.</p>
<h3>Interpreting \u201ctogether\u201d and \u201cnext to\u201d</h3>
<p>\u201cSide by side\u201d and \u201cnext to each other\u201d mean adjacent in the order given. They do not mean the same chair or a shared seat. Read the wording carefully, because a question about two people sitting \u201cwith one seat between them\u201d needs a different count altogether.</p>
`,
  },
  {
    id: NOTE,
    slug: "permutations-and-combinations",
    proseOnly: true,
    heading: "Groups, teams and sharing into sets",
    html: `<h2>Groups, teams and sharing into sets</h2>
<p>Questions that divide people or objects into groups are where the difference between labelled and unlabelled groups decides the answer. A group that is named, such as \u201cteam A\u201d or \u201cthe first group\u201d, is labelled. A group that is only described by its members is unlabelled, and the count must not treat two identical splits as different.</p>
<h3>Choosing one team from a pool</h3>
<p>Choosing a team of 3 from 10 people is a plain selection, so the count is ¹⁰C₃ = 120. No ordering inside the team is counted, and the team is simply the set of three names.</p>
<h3>Two teams with names: labelled groups</h3>
<p>If the two teams are called Red and Blue, the choice of Red fixes the rest. Choosing 3 for Red from 6 people and 3 for Blue from the remaining 3 gives ⁶C₃ × ³C₃ = 20 × 1 = 20 ways. The name of each team matters, so there is no further division.</p>
<h3>Two identical teams: unlabelled groups</h3>
<p>If the two teams are not named, the same 20 splits are counted twice, once with each team as Red. Divide by 2 to get 10 ways to split six people into two unlabelled teams of three. Check that the answer is even, since the teams can be swapped in pairs.</p>
<h3>Sharing into several sets of equal size</h3>
<p>Dividing 9 people into three unlabelled groups of three gives ⁹C₃ × ⁶C₃ × ³C₃ / 3! = 84 × 20 × 1 / 6 = 280 ways. The divisor 3! is needed because the three groups can be listed in 3! orders without changing the split.</p>
<h3>Groups with a fixed member</h3>
<p>If a particular person must be in the team, choose the other two from the remaining nine: ⁹C₂ = 36. Fixing the person first removes the need for a subtraction later and keeps the count clear.</p>
<h3>Worked example: a committee of mixed teachers</h3>
<p>A committee of 4 is chosen from 5 men and 4 women and must contain at least one woman. The complement is the committee with no women, which is all men: ⁵C₄ = 5. The total committees are ⁹C₄ = 126. So the answer is 126 − 5 = 121. Writing the complement out in words, \u201cno women\u201d, stops the most common slip, which is counting the all-women case as if it had been excluded.</p>
`,
  },
  {
    id: NOTE,
    slug: "permutations-and-combinations",
    proseOnly: true,
    heading: "Pascal's triangle and binomial coefficients",
    html: `<h2>Pascal's triangle and binomial coefficients</h2>
<p>The numbers ⁿCᵣ are the same numbers that appear in the binomial expansion and in Pascal's triangle. Seeing the link lets you check a count quickly, and it appears in both the algebra and the probability questions in A2.</p>
<h3>Building the triangle from addition</h3>
<p>Each entry in Pascal's triangle is the sum of the two entries above it. Row 0 is 1, row 1 is 1 1, row 2 is 1 2 1, row 3 is 1 3 3 1, and row 4 is 1 4 6 4 1. The entry in row n, position r (counting from 0) is ⁿCᵣ, so row 4 gives ⁴C₂ = 6 directly.</p>
<h3>The binomial theorem</h3>
<p>The expansion of (a + b)ⁿ has the coefficient ⁿCᵣ on the term aⁿ⁻ʳbʳ. For (1 + x)⁵, the coefficient of x² is ⁵C₂ = 10, and the full expansion is 1 + 5x + 10x² + 10x³ + 5x⁴ + x⁵. Check one value by substituting x = 1, which gives 2⁵ = 32, the sum of the row.</p>
<h3>Using the row sum as a check</h3>
<p>The sum of row n is 2ⁿ, because it counts all the subsets of an n-element set. Row 5 sums to 1 + 5 + 10 + 10 + 5 + 1 = 32 = 2⁵. If a count you calculated does not fit the row pattern, look again before you write it down.</p>
<h3>Symmetry: ⁿCᵣ = ⁿCₙ₋ᵣ</h3>
<p>Choosing r items to take is the same as choosing n − r items to leave, so ⁿCᵣ = ⁿCₙ₋ᵣ. For example ⁸C₆ = ⁸C₂ = 28. Use the smaller of r and n − r when you calculate by hand, because the factorials are shorter.</p>
<h3>Coefficient questions</h3>
<p>A question might ask for the coefficient of x³ in (2 + x)⁶. The general term is ⁶Cᵣ 2⁶⁻ʳ xʳ, so for r = 3 the coefficient is ⁶C₃ × 2³ = 20 × 8 = 160. The combination gives the number of ways and the power of the constant gives the rest; both are needed.</p>
<h3>Why the link matters in probability</h3>
<p>The binomial probability P(X = r) = ⁿCᵣ pʳ qⁿ⁻ʳ uses the same coefficient as the expansion of (q + p)ⁿ. The coefficients count the ways the successes can be placed among the trials, and the powers of p and q give the chance of each arrangement. Keeping the two roles separate prevents the error of leaving out the combination.</p>
`,
  },
  {
    id: NOTE,
    slug: "permutations-and-combinations",
    proseOnly: true,
    heading: "Counting with conditions and explaining the method",
    html: `<h2>Counting with conditions and explaining the method</h2>
<p>A-level counting questions are marked on method as well as on the final number. A count with no stated method earns little even when it is correct, so the subsections below show how to present a count so that each step can be followed and credited.</p>
<h3>Write the condition before the count</h3>
<p>Begin each answer by writing the condition in words, for example \u201cat least one woman\u201d or \u201cthe two twins are not together\u201d. The condition decides between a direct count and a complement, and a marker looks for it before reading the arithmetic.</p>
<h3>Split into disjoint cases</h3>
<p>When a condition has several possibilities, count each one separately and add the results. A committee of 4 from 5 men and 4 women with exactly 2 women is ⁵C₂ × ⁴C₂ = 10 × 6 = 60. The cases must not overlap: exactly one woman, exactly two women, and so on, each counted once.</p>
<h3>Show the substitution</h3>
<p>Write the formula, then the numbers, then the result, for example ⁹C₄ = 9! / (4! 5!) = 126. The substitution is the step a marker cannot reconstruct from a bare answer, so it is the step to show, even when a calculator gives the value in one key press.</p>
<h3>Check with a small case</h3>
<p>Before trusting a formula for a large count, test it on a small case you can list. For three letters A, B, C taken two at a time, there are 3P2 = 6 arrangements, AB, BA, AC, CA, BC, CB, which you can see by writing them down. A method that fails on the small case will fail on the large one.</p>
<h3>Answer in words as well as numbers</h3>
<p>End with a sentence that names what was counted, such as \u201cthere are 120 different teams of three\u201d. A bare number leaves the marker to guess which count it is, and a guess is not awarded a mark.</p>
<h3>Why method lines are worth writing</h3>
<p>A marker can only credit a method that is on the page. A correct number with no formula, no substitution and no statement of what was counted gives the examiner nothing to award, so the method lines are worth writing even when the arithmetic is quick. Check the mark scheme in your own specification for how the marks are split.</p>
`,
  },
];

module.exports = { sections };
