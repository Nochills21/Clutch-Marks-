/**
 * Mathematics OL deepening, pass f: adds h3 subsections to the number-sets note
 * (syllabus 1.2 Sets). Prose-only sections, inserted before "Equations and
 * symbols" by refine-note-sections.cjs; nothing already in the note is rewritten.
 */

const ID = "dcbbe01b-cbb0-4e90-bf61-0ecc971a9467";
const SLUG = "number-sets";

const sections = [
  {
    id: ID,
    slug: SLUG,
    proseOnly: true,
    heading: "Sets: the building blocks of counting",
    html: `<h2>Sets: the building blocks of counting</h2>
<p>A set is a well-defined collection of objects, called its elements or members. In IGCSE Mathematics, sets are used to organise numbers and to count how many items share or avoid a property. Questions on this statement test three things: reading and writing set notation, drawing and filling Venn diagrams, and using counting rules without double-counting. The subsections below take these one at a time.</p>
<h3>What counts as a set</h3>
<p>A set is defined by a rule that tells you, for any object, whether it is in the set or not. "The even numbers less than 10" is a set because every number either is or is not an even number less than 10. A list such as "some tall students" is not a set, because two people might disagree about who is tall. Exam questions always use clear rules, so the first step is to write each set as a list or a rule before counting anything.</p>
<h3>Writing a set in roster form</h3>
<p>Roster form lists every element between curly brackets, separated by commas. The set of prime numbers less than 12 is {2, 3, 5, 7, 11}. The order of the elements does not matter, and an element is never written twice. Roster form is quickest for small sets, and it is the form the examiner usually expects when a question says "list the elements".</p>
<h3>The element and not-element symbols</h3>
<p>The symbol ∈ means "is an element of", and ∉ means "is not an element of". So 4 ∈ {1, 2, 3, 4} is true, and 5 ∉ {1, 2, 3, 4} is also true. These symbols are used in statements about membership, and they should be read aloud as whole sentences when you check an answer, because a reversed symbol reverses the meaning of the statement.</p>
<h3>The empty set</h3>
<p>The empty set, written ∅ or { }, contains no elements at all. The set of whole numbers that are both odd and even is the empty set, because no number has both properties. The empty set is a subset of every set, and in a Venn diagram it is shown by a region with no number in it. Do not confuse ∅ with the set containing zero, {0}, which has one element.</p>
<h3>Subsets and the subset symbol</h3>
<p>A set A is a subset of a set B when every element of A is also an element of B, and this is written A ⊂ B. For example, {1, 2} ⊂ {1, 2, 3, 4} because both 1 and 2 are in the larger set. Every set is a subset of itself, and the empty set is a subset of every set. A question asking whether one set is a subset of another can be answered by checking each element of the first set in turn.</p>
<h3>Equal sets</h3>
<p>Two sets are equal when they contain exactly the same elements, whatever order they are listed in. So {3, 1, 2} and {1, 2, 3} are equal, because both contain the numbers 1, 2 and 3 and no others. A repeated element does not make a set bigger, so {1, 1, 2} is the same set as {1, 2}. This is why counting the elements of a set means counting distinct members.</p>
<h3>The number of elements in a set</h3>
<p>The number of elements in a set A is written n(A). For A = {2, 4, 6, 8}, n(A) = 4. The notation is used in every counting formula in the Venn diagram work later in this note, so write it carefully. A common slip is to count the brackets, the commas or the repeated entries rather than the distinct elements.</p>
`,
  },
  {
    id: ID,
    slug: SLUG,
    proseOnly: true,
    heading: "Union, intersection and complement",
    html: `<h2>Union, intersection and complement</h2>
<p>Three operations combine or select sets, and every Venn diagram question uses at least one of them. The union collects everything in either set, the intersection keeps only what is common to both, and the complement takes everything outside a set. The subsections below define each operation, show how it is written, and give a method for working with them.</p>
<h3>The universal set</h3>
<p>Most set questions give a universal set, written ξ, which contains every element under discussion. The complement of a set is always taken relative to the universal set. If ξ is the set of integers from 1 to 10, then the complement of the even numbers is the odd numbers within those ten integers. Always state the universal set before you find any complement, because the same set has a different complement in a different universe.</p>
<h3>Union: everything in either set</h3>
<p>The union of A and B, written A ∪ B, is the set of all elements that are in A, or in B, or in both. For A = {1, 2, 3} and B = {3, 4}, the union is A ∪ B = {1, 2, 3, 4}. The element 3 appears once in the answer, even though it is in both sets. The word "or" in mathematics includes the case where both are true, so the union is never smaller than either set on its own.</p>
<h3>Intersection: what the two sets share</h3>
<p>The intersection of A and B, written A ∩ B, is the set of elements that are in both A and B. For the same sets, A ∩ B = {3}. If two sets have no elements in common, their intersection is the empty set, and the sets are called disjoint. The word "and" in a question such as "students who play both hockey and tennis" points to an intersection.</p>
<h3>Complement: everything not in the set</h3>
<p>The complement of A, written A′ (read as "A dash"), is the set of all elements of the universal set that are not in A. With ξ = {1, 2, 3, 4, 5} and A = {1, 2, 3}, the complement is A′ = {4, 5}. Every element of ξ is in exactly one of A and A′, so the two together account for the whole universal set. This is a useful check when you list a complement by hand.</p>
<h3>Combining operations in one expression</h3>
<p>Expressions such as (A ∪ B)′ or A ∩ B′ contain more than one operation. Work inside the brackets first, and then apply the outer operation. For A = {1, 2, 3}, B = {3, 4} and ξ = {1, 2, 3, 4, 5}, the union A ∪ B is {1, 2, 3, 4}, so its complement is {5}. Writing each stage on a separate line makes the working easy to mark.</p>
<h3>Reading the notation in words</h3>
<p>Translating between symbols and words is a skill in its own right. A ∪ B is "A or B", A ∩ B is "A and B", and A′ is "not A". A question that asks for "students who do not study French" describes the complement of the French set. Write the set in symbols first, then check your answer against the words of the question before you count.</p>
<h3>Identifying the sets from a list</h3>
<p>Given a list of properties, the sets are found by reading each property as a rule. For instance, "the multiples of 3 from 1 to 20" is {3, 6, 9, 12, 15, 18}. Construct each set from its rule separately, then apply the operation the question asks for. This prevents mixing up the elements of the two sets when the question involves several properties at once.</p>
<h3>Checking an answer with the universal set</h3>
<p>When a result is a union or an intersection, check that every element is inside the universal set, and that no element of A or B is missing. When a result is a complement, check that it and the original set together make up the universal set with no overlap. These two checks take a few seconds and catch most of the errors made with set operations.</p>
`,
  },
  {
    id: ID,
    slug: SLUG,
    proseOnly: true,
    heading: "Venn diagrams with two and three sets",
    html: `<h2>Venn diagrams with two and three sets</h2>
<p>A Venn diagram shows sets as overlapping regions inside a rectangle that represents the universal set. Each region holds the elements that belong to exactly the sets that cover it. Once the regions are filled, every set operation and every count can be read from the diagram. The subsections below build the diagram from the information in a question, first for two sets and then for three.</p>
<h3>Drawing a two-set Venn diagram</h3>
<p>Draw a rectangle for the universal set and two overlapping circles, one for each set. The overlap is the intersection, the rest of each circle is that set without the other, and the area outside both circles is neither set. There are four regions in total, and each one must be labelled before any numbers are entered. Labelling the circles with the set names first avoids confusion when the question changes which set is which.</p>
<h3>Filling a two-set diagram from a total</h3>
<p>A common question gives the total number of people, the number in each set, and the number in both. Put the number in both sets into the overlap first. Then subtract that number from each circle total to find the number that belong only to that set. The number in neither set is the total minus everything placed in the circles. The order matters: starting with the outer region gives a wrong answer.</p>
<h3>Using the counting formula for two sets</h3>
<p>The number of elements in a union is given by n(A ∪ B) = n(A) + n(B) − n(A ∩ B). The intersection is subtracted because it was counted in both n(A) and n(B). For 15 people in A, 12 in B and 5 in both, n(A ∪ B) = 15 + 12 − 5 = 22. The formula gives the same answer as filling the diagram, and it is quicker when the diagram is not needed.</p>
<h3>Reading a diagram with a question about "only"</h3>
<p>The phrase "only A" refers to the region inside circle A and outside circle B, which is A ∩ B′. The phrase "neither" refers to the region outside both circles, which is (A ∪ B)′. Students often read "only" as a total of A, which includes the overlap, so check the word carefully. Write the set expression next to each phrase before you read a value from the diagram.</p>
<h3>Setting up a three-set Venn diagram</h3>
<p>A three-set diagram has three overlapping circles and eight regions, including the one outside all three. Label the circles A, B and C and the regions from the centre outwards. The centre is A ∩ B ∩ C, and the region outside all three is the complement of A ∪ B ∪ C. Filling the centre first is the standard approach, because every other region depends on it.</p>
<h3>Filling a three-set diagram step by step</h3>
<p>Start from the centre and work outwards. Each pairwise region is found by subtracting the centre from the given total for that pair. Each single-set region is found by subtracting the pairwise and centre values from the total for that set. The region outside all three circles comes last, as the universal total minus everything already placed. Check at the end that the regions add up to the universal total, because an error in one region shows up as a mismatch there.</p>
<h3>Using the inclusion–exclusion rule with three sets</h3>
<p>For three sets, n(A ∪ B ∪ C) = n(A) + n(B) + n(C) − n(A ∩ B) − n(B ∩ C) − n(A ∩ C) + n(A ∩ B ∩ C). The triple intersection is added back at the end because it was subtracted three times, once in each pairwise term. Use this formula when the question gives the sizes of the sets and their intersections, and draw the diagram only if a region is asked for.</p>
<h3>Common errors in Venn diagram questions</h3>
<p>The commonest mistakes are filling the outer regions before the centre, forgetting to subtract the overlap from the total of a set, and reading a single region as if it were a whole set. A quick check is to add every region in the diagram and compare the total with the universal set. Where the sum is wrong, go back to the centre and recompute outwards.</p>
`,
  },
  {
    id: ID,
    slug: SLUG,
    proseOnly: true,
    heading: "Sets of numbers and the notation for each",
    html: `<h2>Sets of numbers and the notation for each</h2>
<p>Several sets of numbers recur throughout IGCSE Mathematics, and each has a standard symbol. Naming the set a number belongs to is how a question about membership is answered, and it is also how a Venn diagram of numbers is labelled. The subsections below introduce each set, show how to write it with set-builder notation, and explain how to decide which set a number belongs to.</p>
<h3>The natural numbers and the integers</h3>
<p>The natural numbers are the counting numbers 1, 2, 3 and so on, and they are written ℕ. The integers are the whole numbers, positive, negative and zero, and they are written ℤ. Every natural number is an integer, so ℕ is a subset of ℤ. A question that asks whether −4 belongs to ℕ has the answer no, because −4 is an integer but not a natural number.</p>
<h3>The rational numbers</h3>
<p>The rational numbers are numbers that can be written as a fraction p/q, where p and q are integers and q is not zero. They are written ℚ. The number 0.75 is rational because it equals 3/4, and so is −2 because it equals −2/1. Every integer is rational, so ℤ is a subset of ℚ. A recurring decimal such as 0.333… is also rational, since it can be written as 1/3.</p>
<h3>The irrational numbers</h3>
<p>An irrational number cannot be written as a fraction of two integers. Examples are √2, √3 and the number π, whose decimal expansion never ends and never repeats. Irrational numbers are not written with a single standard symbol at this level, and a question about them is answered by showing that no fraction equals the number. A square root of a number that is not a perfect square is usually irrational.</p>
<h3>The real numbers</h3>
<p>The real numbers, written ℝ, are all the numbers that can be placed on a number line. They include the rational and the irrational numbers together. Every number used in IGCSE Mathematics is real, unless the question specifically introduces a non-real quantity. The relationship between the sets is that ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ, and each set sits inside the one after it.</p>
<h3>The prime numbers as a set</h3>
<p>The set of prime numbers is {2, 3, 5, 7, 11, 13, …}, where a prime is a natural number greater than 1 with exactly two factors, 1 and itself. The number 1 is not prime, and 2 is the only even prime. Questions often ask for the primes in a given range, or for the intersection of the primes with another set, such as the odd numbers, which gives every prime except 2.</p>
<h3>Set-builder notation</h3>
<p>Set-builder notation describes a set by a rule instead of a list. The set {x : x is an integer and −2 < x ≤ 3} is read as "the set of x such that x is an integer and x lies between −2 and 3, not including −2 and including 3". Its elements are {−1, 0, 1, 2, 3}. Read the colon as "such that", and read each inequality as a condition on the element.</p>
<h3>Choosing the right set for a number</h3>
<p>To decide which sets a number belongs to, check its properties in order. Ask whether it is a counting number, then whether it is a whole number, then whether it is a fraction of integers, and finally whether it is real. The number −3/4 is in ℚ and ℝ, but not in ℕ or ℤ. Writing the list of memberships for each number is a quick way to answer several membership questions at once.</p>
`,
  },
];

module.exports = { sections };
