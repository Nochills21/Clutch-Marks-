// Batch 06: deepens eight thin notes toward 2500+ characters.
// Consumed by .freebuff/extend-materials.cjs. No backticks and no dollar-brace sequences.
module.exports = {
  expectType: "notes",
  rows: {
    "120ecca6-69da-44e7-8537-beda4c42532d": `
<h3>Worked example: drawing without replacement</h3>
<p>A bag holds 3 red and 2 blue counters. Two counters are taken without replacement. P(red, red) = 3/5 × 2/4 = 3/10. P(blue, blue) = 2/5 × 1/4 = 1/10. P(one of each) = 1 − 3/10 − 1/10 = 6/10 = 3/5. The probabilities of all the outcomes must add up to 1, so use this as a check.</p>
<h3>With replacement and at least one</h3>
<p>If the first counter is replaced, the second draw has the same probabilities. P(at least one red) is quicker through the complement: 1 − P(no red) = 1 − (2/5 × 2/5) = 21/25. Use the complement whenever the phrase "at least one" appears.</p>
<h3>Mutually exclusive and independent events</h3>
<ul>
<li>Mutually exclusive events cannot both happen, so P(A or B) = P(A) + P(B).</li>
<li>Independent events do not affect each other, so P(A and B) = P(A) × P(B). Test independence by checking whether P(A and B) equals this product.</li>
<li>Probabilities always lie between 0 and 1 inclusive. An answer outside this range signals an error.</li>
</ul>
<p>Exam point: give probabilities as exact fractions unless the question asks for a decimal, and round only the final answer, to the accuracy the question requests.</p>
`,
    "c015774f-319c-423f-94e2-c1b6a3505c70": `
<h3>Worked example: building a binary search tree</h3>
<p>Insert 8, 3, 10, 1 and 6 in that order. The first value, 8, becomes the root. Since 3 is less than 8, it goes to the left; 10 goes to the right. The value 1 is less than 8 and less than 3, so it sits to the left of 3. The value 6 is less than 8 and greater than 3, so it sits to the right of 3. An in-order traversal (left, node, right) then lists the values in sorted order: 1, 3, 6, 8, 10.</p>
<h3>Complexity of the main operations</h3>
<ul>
<li>Search, insert and delete in a balanced tree take O(log n) time, because each comparison discards about half the remaining nodes.</li>
<li>If the values are inserted in sorted order, the tree becomes a chain and the same operations degrade to O(n).</li>
<li>Hash table lookup takes O(1) on average but gives no ordering, so a hash table cannot list the data in sorted order.</li>
</ul>
<h3>Choosing between the structures</h3>
<p>A stack, a queue and a linked list each store a collection, but they differ in how items are added and removed. A stack is last in, first out. A queue is first in, first out. A linked list allows insertion and deletion at a known position without shifting other items. The exam question usually asks you to justify the choice, so state the access pattern the data needs.</p>
`,
    "c4de73c5-5ba1-4192-a207-71e25ddd6870": `
<h3>Worked example: a full set of averages</h3>
<p>Take the data 2, 4, 4, 7, 9, 10. There are six values. The mean is (2 + 4 + 4 + 7 + 9 + 10)/6 = 36/6 = 6. The median is the average of the third and fourth values, (4 + 7)/2 = 5.5. The mode is 4, the only value that occurs twice. The range is 10 − 2 = 8.</p>
<h3>Stem-and-leaf diagrams</h3>
<p>A stem-and-leaf diagram keeps every original value while showing the shape of the data. For values 23 and 27 on the stem 2, write 2 | 3 7. Always include a key such as 2 | 3 means 23, and put the leaves in ascending order so that the median and quartiles can be read directly.</p>
<h3>Pie charts and scatter diagrams</h3>
<ul>
<li>In a pie chart, the angle for each category is (frequency/total) × 360°. Check that all the angles add up to 360°.</li>
<li>A scatter diagram shows the relationship between two variables. A positive correlation means that y tends to increase as x increases.</li>
<li>A line of best fit should pass close to the middle of the points. Use it to interpolate within the data, which is reliable, and be cautious about extrapolating beyond it.</li>
</ul>
<p>Exam point: when you compare two distributions, comment on both an average and a spread, for example the median and the IQR, in the context of the data.</p>
`,
    "fa0fd6bb-1dda-4f3c-af76-0db40924f2a3": `
<h3>Worked example: binary search on sixteen items</h3>
<p>A sorted list has 16 items. Each comparison with the middle item halves the search range: 16 to 8, 8 to 4, 4 to 2, 2 to 1. At most ⌈log₂16⌉ = 4 comparisons are needed to find the item or confirm it is absent. A linear search on the same list may need 16 comparisons, so binary search is much faster, but only when the list is sorted.</p>
<h3>Recursion: factorial</h3>
<p>A recursive function calls itself on a smaller problem. For factorial, fact(n) returns 1 when n is 0 (the base case), and otherwise returns n × fact(n − 1). Each call waits for the next one to return, so the calls build up on the call stack. Without a base case the recursion never ends.</p>
<h3>Testing a solution</h3>
<ul>
<li>Normal test data checks the typical case.</li>
<li>Boundary test data checks the limits, such as the first item, the last item and an empty list.</li>
<li>Erroneous test data checks that invalid input is rejected, for example a letter typed where a number is expected.</li>
</ul>
<p>Exam point: a test plan lists the input, the expected output and the reason for each test, so that the result can be checked against the design.</p>
`,
    "d371087c-b171-4536-ae7e-16eadfdba067": `
<h3>Worked example: lifting a load</h3>
<p>A 2.0 kg mass is lifted through 5.0 m at constant speed. The work done against gravity is W = mgh = 2.0 × 9.8 × 5.0 = 98 J. If the lift takes 4.0 s, the power is P = W/t = 98/4.0 = 24.5 W. Check the units at each step: joules divided by seconds give watts.</p>
<h3>Kinetic and gravitational potential energy</h3>
<ul>
<li>Kinetic energy: E_k = ½mv². A 1000 kg car at 20 m s⁻¹ has 2.0 × 10⁵ J of kinetic energy.</li>
<li>Gravitational potential energy: E_p = mgh, measured from a chosen reference level.</li>
<li>Doubling the speed quadruples the kinetic energy, because the speed is squared.</li>
</ul>
<h3>Efficiency in practice</h3>
<p>An electric motor takes 200 J of electrical energy and delivers 150 J of useful kinetic energy and 50 J of thermal energy. The efficiency is 150/200 × 100% = 75%. The energy that is not useful is usually dissipated as thermal energy in the surroundings, and it is never destroyed.</p>
<p>Exam point: in a question about the energy transfers, name each store involved, such as chemical, kinetic, gravitational potential, or thermal, rather than writing only "energy".</p>
`,
    "4e59efe4-7386-4b2f-92cf-1c627eb63269": `
<h3>Worked example: a SELECT query</h3>
<p>To list the names of students in Year 11 who study Physics, sorted by surname, a query joins two tables and filters the result: SELECT Name FROM Student INNER JOIN Enrolment ON Student.StudentID = Enrolment.StudentID WHERE Year = 11 AND Subject = 'Physics' ORDER BY Name. Read the question word by word and map each condition onto a clause.</p>
<h3>Keys and integrity</h3>
<ul>
<li>A primary key uniquely identifies each record in a table and cannot be null.</li>
<li>A foreign key holds the primary key of another table, which links the two tables together.</li>
<li>A candidate key is any field, or combination of fields, that could serve as the primary key.</li>
</ul>
<h3>Entity-relationship modelling</h3>
<p>A one-to-many relationship, such as one teacher and many classes, is shown by placing the primary key of the "one" side in the "many" table. A many-to-many relationship, such as students and courses, needs a third, linking table that holds a foreign key for each side. Without it the database would repeat data or store several values in one field, which breaks normalisation.</p>
<p>Exam point: CREATE TABLE statements declare the data types, the primary key and each foreign key. DROP and ALTER change the structure; INSERT, UPDATE, DELETE and SELECT work with the records.</p>
`,
    "d40be9ac-7510-48c6-82ed-0ad1c587fe37": `
<h3>Worked example: square root of a complex number</h3>
<p>Find z such that z² = −9 + 40i. Let z = a + bi. Then a² − b² = −9 and 2ab = 40, so ab = 20. Trying a = 4 and b = 5 gives 16 − 25 = −9, which works. So z = 4 + 5i or z = −(4 + 5i). Check by squaring: (4 + 5i)² = 16 + 40i − 25 = −9 + 40i.</p>
<h3>Quadratic equations with complex roots</h3>
<p>For x² + 2x + 5 = 0, the discriminant is 4 − 20 = −16, which is negative, so the roots are not real. Use √(−16) = 4i to get x = (−2 ± 4i)/2 = −1 ± 2i. The two roots form a conjugate pair, as they always do when the coefficients are real.</p>
<h3>Loci in the Argand diagram</h3>
<ul>
<li>|z − 2| = 3 is the circle with centre 2 and radius 3, since it gives the distance of z from the point 2.</li>
<li>arg(z) = π/4 is a half-line from the origin at 45° above the positive real axis.</li>
<li>|z − 1| = |z + i| is the perpendicular bisector of the points 1 and −i.</li>
</ul>
<p>Exam point: when a locus question gives an inequality, shade the correct region on the diagram and label the boundary as a solid or dashed line depending on whether it is included.</p>
`,
    "15f953e6-3831-4cd9-a4ff-98a991c5d346": `
<h3>Worked example: distance from parallax</h3>
<p>A star has a parallax angle of 0.25 arcseconds when observed from opposite sides of the Earth's orbit. The distance in parsecs is d = 1/p = 1/0.25 = 4.0 pc. One parsec is about 3.26 light-years, so the star is roughly 13 light-years away. Parallax is the most direct distance method, and it works only for nearby stars.</p>
<h3>Inverse-square law for brightness</h3>
<p>The apparent brightness of a star falls as the inverse square of its distance. A star that is four times as far away appears 4² = 16 times fainter, for the same luminosity. This is why luminosity, which is intrinsic, must be distinguished from apparent brightness, which depends on distance.</p>
<h3>Hubble's law and the expanding universe</h3>
<ul>
<li>Hubble's law states that v = H₀d, where v is the recession speed and d is the distance.</li>
<li>With H₀ ≈ 70 km s⁻¹ Mpc⁻¹, a galaxy 100 Mpc away recedes at about 7000 km s⁻¹.</li>
<li>Redshift shows that most galaxies are moving away from us, which is evidence that the universe is expanding.</li>
</ul>
<p>Exam point: the Big Bang model gives an age for the universe of about 13.8 billion years, consistent with the cosmic microwave background, which is the faint, nearly uniform radiation left from the early universe.</p>
`
  }
};
