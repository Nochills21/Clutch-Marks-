// Worker 1 of 4: inline symbol keys for batch 1.
//
// Every `find` is copied character-for-character from the live row and must
// occur exactly once; `replace` is that same fragment with the key added.
// Two rows (12, 13) carried their Formulas/Worked-example block twice, so the
// edit collapses the duplicate while it keys the formulas — noted in the report.
module.exports = {
  edits: {
    /* 01 — IGCSE CS: Algorithm design. The stage-2 pseudocode states the mean
       relation; the key names its three variables and the divide-by-zero test. */
    "230d770c-b169-4153-b7a0-41297244195b": [
      {
        find: `Note what refinement surfaced: the empty-input case (line 9). Division by zero
would have been a runtime failure - refinement finds these before coding.</code></pre>`,
        replace: `Note what refinement surfaced: the empty-input case (line 9). Division by zero
would have been a runtime failure - refinement finds these before coding.</code></pre>
<p><em>Key:</em> mean = the average of the values read, in the same unit as the numbers; total = the running sum of those values; count = how many values were read, so mean ← total ÷ count. The count &gt; 0 test exists because division by zero is undefined, which is why refinement surfaced it before coding.</p>`,
      },
    ],

    /* 02 — IAL CS: Database concepts. The SQL block states the aggregate relation. */
    "ab443e7e-11f0-4286-966f-b5ff4edc5835": [
      {
        find: `Execution order to remember: FROM → WHERE → GROUP BY → HAVING →
SELECT → ORDER BY.</code></pre>`,
        replace: `Execution order to remember: FROM → WHERE → GROUP BY → HAVING →
SELECT → ORDER BY.</code></pre>
<p><em>Key:</em> AVG(mark) = (sum of the marks in that group) ÷ (number of rows in that group), so Maths is (72 + 58)/2 = 65 marks and Physics, with one row, 65; COUNT(...) counts rows, SUM(...) adds a field, MIN/MAX take the extremes; GROUP BY decides which rows each aggregate sees, and HAVING filters those groups after aggregation where WHERE filters rows before it.</p>`,
      },
    ],

    /* 03 — Biology summary: graticule and magnification. */
    "7f015b5b-32fa-4084-b42e-ac9b839fcd93": [
      {
        find: `so a cell drawn 50 mm long at ×2000 is 50 mm ÷ 2000 = 0.025 mm = 25 µm.</p>`,
        replace: `so a cell drawn 50 mm long at ×2000 is 50 mm ÷ 2000 = 0.025 mm = 25 µm.</p>
<p><em>Key:</em> real size = image size ÷ magnification, both lengths in the same unit (50 mm ÷ 2000 = 0.025 mm = 25 µm); magnification = the stated ×2000, a pure number; total magnification = eyepiece lens × objective lens (×10 × ×40 = ×400); one eyepiece division = 2.5 µm at ×400 after calibration; mitotic index = cells in mitosis ÷ total cells counted, a fraction from 0 to 1.</p>`,
      },
    ],

    /* 04 — CS summary: the SQL condition is a comparison, not an assignment. */
    "d4d41ed0-cbb8-4358-909f-a9a7d7aa7149": [
      {
        find: `A query such as SELECT Name FROM Students WHERE Year = 11; returns only the matching rows.`,
        replace: `A query such as SELECT Name FROM Students WHERE Year = 11; returns only the matching rows. <em>Key:</em> SELECT = the fields returned (Name); FROM = the table searched (Students); WHERE = the condition every row must satisfy, so Year = 11 keeps only Year-eleven rows — here = is a comparison, not an assignment, and changing the operator (&gt;, &lt;) changes which rows survive.`,
      },
    ],

    /* 05 — Maths summary: integration with a linear argument. */
    "e55b2928-1858-4fff-9a10-5587d803053b": [
      {
        find: `<p><strong>Mathematics — A2 (9709).</strong> With linear arguments: ∫ e^(3x) dx = e^(3x)/3 + c; ∫ cos 2x dx = sin 2x/2 + c.</p>`,
        replace: `<p><strong>Mathematics — A2 (9709).</strong> With linear arguments: ∫ e^(3x) dx = e^(3x)/3 + c; ∫ cos 2x dx = sin 2x/2 + c. <em>Key:</em> x = the variable, in radians for the trigonometric case, so 2x is in radians; e = 2.718…, the natural base; c = the constant of integration, needed because an indefinite integral is a family of functions and each separate integration brings its own.</p>`,
      },
    ],

    /* 06 — IAL CS: translators. The pseudocode states an accumulator. */
    "6a16eae8-e107-4e78-bbf3-f9767aa67e18": [
      {
        find: `Intermediate languages (bytecode for the JVM) sit between: compiled once,
interpreted or JIT-compiled at run time - portable without source exposure.</code></pre>`,
        replace: `Intermediate languages (bytecode for the JVM) sit between: compiled once,
interpreted or JIT-compiled at run time - portable without source exposure.</code></pre>
<p><em>Key:</em> total = the running sum (no units); i = the loop counter, taking 1, 2, 3, 4, 5 in turn, so total = 0 + 1 + 2 + 3 + 4 + 5 = 15 and print(total) outputs 15. The only difference between the two paths is what is saved: machine code by the compiler, nothing by the interpreter.</p>`,
      },
    ],

    /* 07 — Biology summary: index of diversity and heterozygosity. */
    "92752a03-2ff7-487c-afb9-3c8e2f28e127": [
      {
        find: `because in B one species dominates and the others are rare.</p>`,
        replace: `because in B one species dominates and the others are rare.</p>
<p><em>Key:</em> D = index of diversity (no units, larger is more diverse); N = total individuals of all species counted, so N(N−1) = 24 × 23 = 552; Σ n(n−1) = the sum over species of each species' count n multiplied by n − 1, which is why a habitat dominated by one species has a large denominator and a low D; H = heterozygosity index = heterozygotes ÷ total individuals in the sample, a proportion from 0 to 1.</p>`,
      },
    ],

    /* 08 — Biology summary: Rf, NPP, transfer efficiency, Q10, q². */
    "17dec020-fa06-4c1e-a90d-7be6d00d13d7": [
      {
        find: `</ul>

<h3>How the pieces fit together</h3>`,
        replace: `</ul>
<p><em>Key:</em> Rf = distance moved by the pigment ÷ distance moved by the solvent front, both in mm, so a ratio with no units that is never above 1; GPP = gross primary productivity (kJ m⁻² year⁻¹); R = energy lost in plant respiration (same unit); NPP = GPP − R, the energy available to the next trophic level (same unit); transfer efficiency = (energy at the next level ÷ energy at the previous level) × 100, in per cent; Q10 = rate at (T + 10 °C) ÷ rate at T, no units; q² = the frequency of the recessive phenotype, so q² = 60 ÷ 200 = 0.30 and the recessive allele frequency is q = √0.30 = 0.55.</p>

<h3>How the pieces fit together</h3>`,
      },
    ],

    /* 09 — Maths summary: polygon angle relations. The file holds this block
       twice, so the find is anchored on the unique "How to use" paragraph. */
    "0832a964-36cb-422e-b5f2-f32b559c16d6": [
      {
        find: `<p><strong>How to use this:</strong> skim the list above, then open the full revision notes for any area that feels shaky, and finish with the topic questions to check yourself.</p>
<h3>Worked example</h3>
<p>The interior angle sum of a polygon with n sides is (n − 2) × 180°. For a regular octagon, n = 8, so the sum is 6 × 180° = 1080°. Each interior angle is 1080 ÷ 8 = 135°, and each exterior angle is 360 ÷ 8 = 45°. Exterior angles of any convex polygon always add up to 360°.</p>`,
        replace: `<p><strong>How to use this:</strong> skim the list above, then open the full revision notes for any area that feels shaky, and finish with the topic questions to check yourself.</p>
<h3>Worked example</h3>
<p>The interior angle sum of a polygon with n sides is (n − 2) × 180°. For a regular octagon, n = 8, so the sum is 6 × 180° = 1080°. Each interior angle is 1080 ÷ 8 = 135°, and each exterior angle is 360 ÷ 8 = 45°. Exterior angles of any convex polygon always add up to 360°. <em>Key:</em> n = the number of sides (no units); (n − 2) × 180° is the interior angle sum in degrees, so a regular polygon's interior angle is that sum ÷ n and its exterior angle is 360° ÷ n.</p>`,
      },
    ],

    /* 10 — IAL CS: simulation. The Monte Carlo paragraph states the π estimator. */
    "10ed5d54-2c62-4360-a2d0-483a39f500af": [
      {
        find: `the technique behind risk models.</p>`,
        replace: `the technique behind risk models. <em>Key:</em> x, y = the coordinates of one random point, each uniform between 0 and 1 (no units); x² + y² ≤ 1 selects the points inside the quarter circle, so (points inside ÷ total points) → π/4 and π ≈ 4 × that ratio; the error falls as 1/√(number of samples), which is why thousands of trials buy only three or four digits.</p>`,
      },
    ],

    /* 11 — Maths summary: vectors and transformations. */
    "23188cf0-1f26-446b-8c51-fcce1cb9471a": [
      {
        find: `</ul>
<p><strong>How to use this:</strong> skim the list above, then open the full revision notes for any area that feels shaky, and finish with the topic questions to check yourself.</p>`,
        replace: `</ul>
<p><em>Key:</em> (x; y) = the column vector, x the horizontal component and y the vertical component (in the same unit as the diagram, or no units on a coordinate grid); √(x² + y²) = the magnitude of that vector, a length, so never negative; under the mirror line y = x the image of (a, b) is (b, a); a 90° anticlockwise rotation about the origin sends (x, y) to (−y, x); a negative scale factor k rotates the image 180° about the centre and multiplies every length by |k|.</p>
<p><strong>How to use this:</strong> skim the list above, then open the full revision notes for any area that feels shaky, and finish with the topic questions to check yourself.</p>`,
      },
    ],

    /* 12 — Maths summary: the three triangle relations. The row held its
       Formulas/Worked-example block twice and wrote the formulas in words; the
       single copy below is in glyphs and carries its key. */
    "139e542c-853c-4cc8-adc9-753d2f78e2fa": [
      {
        find: `<li>5. 3-D trigonometry</li>
</ul>
<h3>Formulas to learn</h3>
<ul><li>Area of a triangle: one half of a b sin C.</li><li>Sine rule: a / sin A = b / sin B = c / sin C.</li><li>Cosine rule: a^2 = b^2 + c^2 - 2bc cos A, and cos A = (b^2 + c^2 - a^2) / (2bc).</li></ul>
<h3>Worked example</h3>
<p>In a triangle with sides 7 and 9 and included angle 40 degrees, the area is one half of 7 x 9 x sin 40, about 20.2. The angle opposite the side 9 is then found by the sine rule, so check the answer against the cosine rule before you finish.</p>
<h3>Formulas to learn</h3>
<ul><li>Area of a triangle: one half of a b sin C.</li><li>Sine rule: a / sin A = b / sin B = c / sin C.</li><li>Cosine rule: a^2 = b^2 + c^2 - 2bc cos A, and cos A = (b^2 + c^2 - a^2) / (2bc).</li></ul>
<h3>Worked example</h3>
<p>In a triangle with sides 7 and 9 and included angle 40 degrees, the area is one half of 7 x 9 x sin 40, about 20.2. The angle opposite the side 9 is then found by the sine rule, so check the answer against the cosine rule before you finish.</p>`,
        replace: `<li>5. 3-D trigonometry</li>
</ul>
<h3>Formulas to learn</h3>
<ul><li>Area of a triangle: <strong>area = ½ a b sin C</strong>.</li><li>Sine rule: <strong>a / sin A = b / sin B = c / sin C</strong>.</li><li>Cosine rule: <strong>a² = b² + c² − 2bc cos A</strong>, and <strong>cos A = (b² + c² − a²) / 2bc</strong>.</li></ul>
<p><em>Key:</em> a, b, c = the side lengths (cm, m or no units), each opposite the angle of the same letter; A, B, C = those angles in degrees, so sin A is the sine of the angle at A; the area is in square units of the sides. The sine rule needs one matching side-and-opposite-angle pair; the cosine rule needs two sides and the included angle, or all three sides.</p>
<h3>Worked example</h3>
<p>In a triangle with sides 7 and 9 and included angle 40°, the area is ½ × 7 × 9 × sin 40° ≈ 20.2 square units. The angle opposite the side 9 is then found by the sine rule, so check the answer against the cosine rule before you finish.</p>`,
      },
    ],

    /* 13 — Maths summary: grouped-data measures. The same duplicated block, and
       the same treatment: one copy, glyph formulas, key underneath. */
    "18c77db3-3d16-4e63-b19a-c8fb9e1bdfc0": [
      {
        find: `<li>5. Histograms</li>
</ul>
<h3>Formulas to learn</h3>
<ul><li>Mean from a grouped table: sum of f x divided by sum of f, using the class midpoints.</li><li>Interquartile range: Q3 - Q1. The median is Q2.</li><li>Histogram height: frequency density = frequency / class width. Area of each bar is proportional to frequency.</li></ul>
<h3>Worked example</h3>
<p>A cumulative frequency curve has its points plotted against the upper class boundary. Reading the curve at 25 percent of the total gives Q1, at 50 percent gives the median, and at 75 percent gives Q3. The IQR is Q3 minus Q1, and it is less affected by outliers than the range.</p>
<h3>Formulas to learn</h3>
<ul><li>Mean from a grouped table: sum of f x divided by sum of f, using the class midpoints.</li><li>Interquartile range: Q3 - Q1. The median is Q2.</li><li>Histogram height: frequency density = frequency / class width. Area of each bar is proportional to frequency.</li></ul>
<h3>Worked example</h3>
<p>A cumulative frequency curve has its points plotted against the upper class boundary. Reading the curve at 25 percent of the total gives Q1, at 50 percent gives the median, and at 75 percent gives Q3. The IQR is Q3 minus Q1, and it is less affected by outliers than the range.</p>`,
        replace: `<li>5. Histograms</li>
</ul>
<h3>Formulas to learn</h3>
<ul><li>Mean from a grouped table: <strong>mean = Σfx / Σf</strong>, taking x as each class midpoint.</li><li>Interquartile range: <strong>IQR = Q₃ − Q₁</strong>. The median is Q₂.</li><li>Histogram height: <strong>frequency density = frequency / class width</strong>; the area of each bar is proportional to its frequency.</li></ul>
<p><em>Key:</em> f = the frequency of a class (a count, no units); x = that class's midpoint (same unit as the variable); Σf = the total number of values; Q₁ and Q₃ = the lower and upper quartiles; frequency density carries frequency per unit of the variable, which is exactly why the area of the bar, not its height, represents the frequency.</p>
<h3>Worked example</h3>
<p>A cumulative frequency curve has its points plotted against the upper class boundary. Reading the curve at 25% of the total gives Q₁, at 50% gives the median, and at 75% gives Q₃. The IQR is Q₃ − Q₁, and it is less affected by outliers than the range.</p>`,
      },
    ],

    /* 14 — Maths summary: the union formula, keyed in place. */
    "e7813732-d626-49af-a422-6d68faf6340b": [
      {
        find: `<li>4. Regions algebra: n(A ∪ B) = n(A) + n(B) − n(A ∩ B), because the overlap is counted twice if you add the two sets.</li>`,
        replace: `<li>4. Regions algebra: n(A ∪ B) = n(A) + n(B) − n(A ∩ B), because the overlap is counted twice if you add the two sets. <em>Key:</em> n(A) = the number of elements in set A; n(B) = the number in B; n(A ∩ B) = the number in both; n(A ∪ B) = the number in either, so subtracting the overlap once removes the double count.</li>`,
      },
    ],

    /* 16 — Maths summary: variance, standard deviation, quartiles, outliers. */
    "eda06930-1fde-4f9f-bfdf-58bcf2a64245": [
      {
        find: `Outliers are commonly flagged as values beyond Q₁ − 1.5·IQR or Q₃ + 1.5·IQR.</p>`,
        replace: `Outliers are commonly flagged as values beyond Q₁ − 1.5·IQR or Q₃ + 1.5·IQR.</p>
<p><em>Key:</em> x = each data value; x̄ = the mean; n = how many values there are, so the population variance is Σ(x − x̄)² ÷ n and the standard deviation is its square root, in the same unit as the data (√(8/3) ≈ 1.63 for 2, 4, 6); Q₁ and Q₃ sit at positions (n + 1)/4 and 3(n + 1)/4 of the ordered list; IQR = Q₃ − Q₁ is a spread in the data's own unit.</p>`,
      },
    ],

    /* 17 — IGCSE CS: machine learning. Accuracy is the relation the block states. */
    "f4ec1c0b-4462-46b9-98fe-457d9fbd7e90": [
      {
        find: `6. DEPLOYMENT: new emails are classified by the model; correct and incorrect
   feedback can be fed back in so it keeps improving.</code></pre>`,
        replace: `6. DEPLOYMENT: new emails are classified by the model; correct and incorrect
   feedback can be fed back in so it keeps improving.</code></pre>
<p><em>Key:</em> accuracy = correct predictions ÷ total predictions tested, × 100 for a percentage and no units; the figure means something only on the held-back test set, and a wide gap between training and test accuracy is the definition of overfitting. In the vehicle trace the 4 m s⁻² is a deceleration, the a in v² = u² + 2as, where u = speed when braking begins (m s⁻¹), v = final speed (m s⁻¹, zero to stop) and s = stopping distance (m).</p>`,
      },
    ],

    /* 18 — IGCSE CS: email encoding inflation. */
    "37c076d2-e903-4a57-8672-96dd9b97fbec": [
      {
        find: `Attachments are encoded into text by MIME and travel inside the message — which is why a 5 MB attachment becomes about 6.7 MB in transit.</p>`,
        replace: `Attachments are encoded into text by MIME and travel inside the message — which is why a 5 MB attachment becomes about 6.7 MB in transit. <em>Key:</em> encoded size ≈ original size × 4/3, because base64 carries 6 usable bits per character instead of 8, so 5 MB becomes about 6.7 MB; SMTP carries the message out (send) and POP3 or IMAP fetches it (receive).</p>`,
      },
    ],

    /* 19 — Maths summary: the quadratic formula is stated in words, so the key
       writes it out and names every symbol. */
    "d0a35e08-95a1-4cb2-8159-f10d1e086f8c": [
      {
        find: `Completing the square writes the expression as a(x + p)² + q, which gives the turning point at (−p, q).</p>`,
        replace: `Completing the square writes the expression as a(x + p)² + q, which gives the turning point at (−p, q).</p>
<p><em>Key:</em> a = the coefficient of x² (a ≠ 0); b = the coefficient of x; c = the constant term; x = the variable; the roots are x = (−b ± √(b² − 4ac)) / 2a, so the discriminant b² − 4ac decides how many real roots exist; in a(x + p)² + q the turning point is (−p, q) and the axis of symmetry is the line x = −p.</p>`,
      },
    ],
  },
};
