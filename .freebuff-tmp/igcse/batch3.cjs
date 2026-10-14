// IGCSE notes, batch 3. Worked answers here were checked by hand and in code.
module.exports = [
  {
    file: 'igcse-algebra-simplifying-and-expanding',
    eyebrow: 'Cambridge IGCSE Mathematics 0580, Algebra',
    title: 'Algebra: simplifying and expanding',
    syllabus: 'Cambridge IGCSE Mathematics 0580, Algebra: introduction to algebra, algebraic manipulation (Core), and algebraic fractions (Extended).',
    sections: [
      {
        h: 'Collecting like terms',
        why: 'Only terms with the same letter and the same power represent the same quantity, so only they can be added. The sign in front of a term belongs to that term and must be kept with it.',
        paras: [
          'A term is a single part of an expression, such as 3x or −5y². Like terms have exactly the same letters raised to exactly the same powers, so 4a and 7a are like terms, but 4a and 4a² are not. You can add or subtract like terms; you cannot combine unlike ones.',
          'The sign in front of a term is part of that term. In 2a − 9b, the term is −9b, so when you collect terms, carry the minus sign with it. Most lost marks in simplifying come from dropping a minus sign, so write each term with its sign at the start of each step.',
        ],
        examples: [
          '2a + 3b + 5a − 9b = 7a − 6b. The a terms give 2a + 5a = 7a, and the b terms give 3b − 9b = −6b.',
        ],
      },
      {
        h: 'Expanding brackets',
        why: 'The distributive law says a(b + c) = ab + ac, so every term in a bracket is multiplied by the term outside. Two brackets need every pair of terms multiplied, which is what FOIL lists.',
        paras: [
          'To expand a single bracket, multiply each term inside by the term outside, paying attention to signs. Multiplying a negative by a negative gives a positive, so −2 × (−3) = +6.',
          'To expand two brackets, multiply every term in the first by every term in the second: First, Outside, Inside, Last. Then collect like terms. The two middle terms are often like terms, so they combine into one, and that is why the working must not stop before the collecting step.',
          'Check an expansion by substituting a simple value, such as x = 1, into both the original and the expanded form. They must give the same result.',
        ],
        examples: [
          '3x(2x − 4y) = 6x² − 12xy.',
          '(2x + 1)(x − 4) = 2x² − 8x + x − 4 = 2x² − 7x − 4. Check at x = 1: the original is 3 × (−3) = −9, and the expansion is 2 − 7 − 4 = −9.',
        ],
      },
      {
        h: 'Factorising',
        why: 'Factorising reverses expanding, so checking by expanding again confirms the answer. Taking out the highest common factor first leaves the simplest bracket.',
        paras: [
          'To factorise, find the highest common factor of all the terms, write it outside a bracket, and divide each term by it to fill the bracket. Look at the numbers and the letters separately: take the highest common number and the lowest power of each letter that appears in every term.',
          'Always check whether the bracket can be factorised further, and always check the answer by expanding it. A common error is to take out a factor that is not common to every term, which leaves an expansion that does not match the original.',
        ],
        formulas: ['ab + ac = a(b + c)'],
        examples: [
          '9x² + 15xy = 3x(3x + 5y), since 3x is the highest common factor.',
          '6x² − 9x = 3x(2x − 3).',
        ],
      },
      {
        h: 'Indices in algebra',
        why: 'Index laws follow from what a power means: multiplying the same base adds the powers, dividing subtracts them, and a power of a power multiplies them. Each part of a term is handled separately.',
        paras: [
          'Apply the index laws to each part of a term separately. The number multiplies or divides as usual. For each letter, add the powers when multiplying terms with that letter, subtract the powers when dividing, and multiply the powers when raising a power to another power.',
          'A negative power means the reciprocal: a⁻² = 1/a². A common mistake is to treat a⁻² as a negative number. Bring the power into the working as an exponent, and do not change its sign unless the index laws say to.',
        ],
        formulas: ['aᵐ × aⁿ = aᵐ⁺ⁿ', 'aᵐ ÷ aⁿ = aᵐ⁻ⁿ', '(aᵐ)ⁿ = aᵐⁿ'],
        examples: [
          '(5x³)² = 25x⁶, since 5² = 25 and (x³)² = x⁶.',
          '12a⁵ ÷ 3a⁻² = 4a⁷, since 12 ÷ 3 = 4 and a^(5 − (−2)) = a⁷.',
        ],
      },
      {
        h: 'Algebraic fractions (Extended)',
        why: 'Algebraic fractions combine the same way as numeric ones: a common denominator is needed before the numerators can be added or subtracted. Simplify the result by cancelling common factors last.',
        paras: [
          'To add or subtract algebraic fractions, write each over a common denominator, combine the numerators carefully, and keep the bracket around a numerator that is being subtracted. The denominator is the product of the original denominators when they have no common factor.',
          'To simplify a single fraction, factorise the numerator and the denominator fully first, then cancel only factors that appear in both. You can cancel a common factor but not a common term that is added or subtracted.',
        ],
        examples: [
          '(x + 1)/2 + (x − 1)/3 = (3(x + 1) + 2(x − 1))/6 = (5x + 1)/6.',
          '(2x² − 2x)/(x² − 5x + 6) = 2x(x − 1)/((x − 2)(x − 3)). The denominator factorises as (x − 2)(x − 3), and no further factor is common to both parts.',
        ],
      },
    ],
    exam: [
      'Expand fully, then collect like terms; do not stop with unsimplified brackets.',
      'Check a factorised answer by expanding it again.',
      'Show each step in a fraction question so that method marks can be awarded.',
    ],
  },
  {
    file: 'igcse-algebra-inequalities',
    eyebrow: 'Cambridge IGCSE Mathematics 0580, Algebra',
    title: 'Algebra: inequalities',
    syllabus: 'Cambridge IGCSE Mathematics 0580, Algebra: representing and interpreting inequalities, including on a number line.',
    sections: [
      {
        h: 'Inequality symbols',
        why: 'Each symbol says how a value relates to a bound. Strict symbols exclude the bound, and inclusive symbols include it, which the number line makes visible.',
        paras: [
          'An inequality compares two expressions and does not state equality. The symbol < means less than and > means greater than. These are strict: the end value is not included in the solution.',
          'The symbol ≤ means less than or equal to, and ≥ means greater than or equal to. These are inclusive: the end value is included. Read the symbol aloud before you use it, since reversing a symbol is an easy slip.',
        ],
      },
      {
        h: 'Representing on a number line',
        why: 'An open circle leaves the end value out, so the value is not part of the solution. A closed circle includes it, which is why the two circles look different.',
        paras: [
          'Draw a number line, mark the end values, and use an open circle for a strict inequality and a closed circle for an inclusive one. Shade the region that satisfies the inequality, which is the part of the line between or beyond the marked values.',
          'For a double inequality such as −3 ≤ x < 1, you need one circle at each end. Each end has its own symbol, so the two circles can be different.',
        ],
        examples: [
          '−3 ≤ x < 1 is shown by a closed circle at −3, an open circle at 1, and shading between them.',
        ],
      },
      {
        h: 'Listing integer values',
        why: 'Listing the integers is a count of the whole numbers inside the solution set. The end values matter because a strict bound removes that integer from the list.',
        paras: [
          'When a question asks for integer values, list the whole numbers that satisfy the inequality, one at a time. Start from the lower bound and move up, checking each end. A closed end includes its integer; an open end does not.',
        ],
        examples: [
          'the integers satisfying −3 ≤ x < 1 are −3, −2, −1 and 0. The bound −3 is included, and 1 is not.',
        ],
      },
      {
        h: 'Solving linear inequalities',
        why: 'Adding or subtracting the same amount keeps the inequality true. Multiplying or dividing by a negative number reverses the sign, because it reverses the order of the numbers, so the inequality must be flipped.',
        paras: [
          'Solve a linear inequality as you would an equation, treating the inequality sign like an equals sign. Add or subtract to collect the x terms on one side, then divide to isolate x.',
          'The one exception is multiplying or dividing both sides by a negative number. Doing so reverses the sign. For example, 5 > 2, but −5 < −2. Forgetting this reversal is the most common error in the topic.',
        ],
        examples: [
          '3x − 2 > 7. Add 2 to get 3x > 9, then divide by 3 to get x > 3.',
          '−2x ≤ 6. Divide by −2 and reverse the sign to get x ≥ −3.',
        ],
      },
      {
        h: 'Interpreting inequalities',
        why: 'A number-line diagram encodes the same information as the inequality, so reading it is the reverse of drawing it. Checking whether the end value is included is the step most often missed.',
        paras: [
          'To read a number-line diagram, look at the direction of the shading and the type of circle at each end, then write the inequality. Shading to the right of a value means greater than that value; shading to the left means less than it.',
          'Check the end value at the end: is it included or not? A closed circle means ≤ or ≥, and an open circle means < or >.',
        ],
      },
    ],
    exam: [
      'Check the direction of the inequality after dividing by a negative number.',
      'Use the correct circle at each end of the number line.',
      'When asked for integer values, list each one separately.',
    ],
  },
  {
    file: 'igcse-algebra-sequences-and-functions',
    eyebrow: 'Cambridge IGCSE Mathematics 0580, Algebra',
    title: 'Algebra: sequences and functions',
    syllabus: 'Cambridge IGCSE Mathematics 0580, Algebra: sequences (Core) and functions (Extended).',
    sections: [
      {
        h: 'Continuing a sequence',
        why: 'A term-to-term rule says how each term follows from the one before. Applying it repeatedly extends the pattern, which is only valid if the rule holds for every step.',
        paras: [
          'A sequence is a list of numbers that follows a pattern. The term-to-term rule says how to get the next term from the previous one, for example “add 3”, “multiply by 2” or “add the next counting number”. Find the rule from the differences or ratios between terms, then apply it.',
          'Check the rule on every pair of terms you have, not just the first pair. A rule that works for two terms but not the rest is the wrong rule.',
        ],
        examples: [
          '1, 3, 6, 10, 15, … The differences are 2, 3, 4, 5, so the next two terms are 15 + 6 = 21 and 21 + 7 = 28.',
        ],
      },
      {
        h: 'The nth term',
        why: 'An nth term formula gives any term directly. Substituting n = 1, 2 and 3 checks that the formula reproduces the given terms, so the pattern is confirmed before you use it.',
        paras: [
          'For a linear sequence, the common difference is the coefficient of n. The nth term is then the common difference times n, plus a constant found by substituting n = 1.',
          'For a quadratic sequence, the second difference is constant. Its value, halved, is the coefficient of n². The cubic sequence in the example is a standard pattern to recognise: its terms are the cubes of the counting numbers.',
          'Check the formula by substituting n = 1, 2 and 3 and comparing the results with the given terms.',
        ],
        examples: [
          'linear: 5, 8, 11, … The difference is 3, so the nth term is 3n + 2. Check: 3(1) + 2 = 5.',
          'quadratic: 2, 5, 10, 17, … The differences are 3, 5, 7, with a second difference of 2, so the nth term is n² + 1. Check: n = 2 gives 5.',
          'cubic: 1, 8, 27, … The nth term is n³.',
        ],
      },
      {
        h: 'Function notation',
        why: 'A function gives one output for each input, so f(a) has a single value. Substituting a for x is the whole operation, which is why the notation stays simple.',
        paras: [
          'A function takes an input and gives one output. Write it as f(x), and find f(a) by substituting a for every x. Brackets are important: f(a) means the function evaluated at a, not f multiplied by a.',
          'The domain is the set of allowed inputs and the range is the set of outputs. A mapping diagram shows each input connected to its output, and each input has only one arrow leaving it.',
        ],
        examples: [
          'f(x) = 3x − 5, so f(2) = 3 × 2 − 5 = 1.',
        ],
      },
      {
        h: 'Composite functions',
        why: 'gf(x) means g applied to the output of f, so f is applied first. Changing the order usually changes the answer, because the two operations do not commute.',
        paras: [
          'A composite function applies one function to the output of another. Write gf(x) = g(f(x)): apply f first, then g to the result. Read the letters from right to left.',
          'Order matters. In general gf(x) and fg(x) are different functions, so always check which is asked for.',
        ],
        examples: [
          'f(x) = 3x − 5 and g(x) = x + 4. Then gf(x) = g(3x − 5) = 3x − 1, and fg(x) = f(x + 4) = 3x + 7. The two answers differ.',
        ],
      },
      {
        h: 'Inverse functions',
        why: 'The inverse undoes f, so applying f then f⁻¹ returns the original input. Swapping x and y and rearranging is the algebraic way to reverse each step.',
        paras: [
          'The inverse f⁻¹ reverses f. To find it, write y = f(x), swap x and y, and rearrange the equation to make y the subject. The result is f⁻¹(x).',
          'Check the inverse by applying f to a value and then f⁻¹ to the result: you should get back the original value.',
        ],
        formulas: ['f(f⁻¹(x)) = x'],
        examples: [
          'f(x) = 3x − 5. Writing y = 3x − 5 and swapping gives x = 3y − 5, so y = (x + 5)/3 and f⁻¹(x) = (x + 5)/3. Check: f(2) = 1 and f⁻¹(1) = 2.',
        ],
      },
    ],
    exam: [
      'Use the right order for composite functions: gf(x) means apply f first.',
      'Show the rearrangement when finding an inverse, then check it with one value.',
      'Check an nth term by substituting the first three values of n.',
    ],
  },
  {
    file: 'igcse-geometry-congruence-and-similarity',
    eyebrow: 'Cambridge IGCSE Mathematics 0580, Geometry',
    title: 'Geometry: similarity and symmetry',
    syllabus: 'Cambridge IGCSE Mathematics 0580, Geometry: similarity and symmetry (Core).',
    sections: [
      {
        h: 'Congruent and similar shapes',
        why: 'Congruent shapes match exactly, while similar shapes match in angle and proportion. Similar shapes differ only by a scale factor.',
        paras: [
          'Congruent shapes are identical in shape and size, so one can be moved onto the other exactly. Similar shapes have the same shape but may differ in size. Corresponding angles are equal, and every length in one shape is multiplied by the same scale factor to give the matching length in the other.',
          'Before you find a scale factor, match up the corresponding sides carefully. Corresponding sides are in the same position in each shape, and this matching is often the hardest step.',
        ],
      },
      {
        h: 'Calculating lengths in similar shapes',
        why: 'A scale factor is the ratio of a pair of corresponding lengths. Once you have it, every other length in the shape follows by multiplication.',
        paras: [
          'Find the scale factor from one pair of corresponding lengths: divide the length in the image by the length in the original. If the image is larger, the scale factor is greater than 1. If it is smaller, the factor is between 0 and 1.',
          'Then multiply every other length in the original by the scale factor to find the matching length in the image. If you need a length in the original from one in the image, divide by the scale factor instead.',
        ],
        examples: [
          'a triangle with sides 3 cm, 4 cm and 5 cm is enlarged to a similar triangle with a shortest side of 6 cm. The scale factor is 6 ÷ 3 = 2, so the other sides are 8 cm and 10 cm.',
          'a rectangle 4 cm by 6 cm is similar to one with sides 6 cm and 9 cm. The scale factor is 6 ÷ 4 = 1.5, and 6 × 1.5 = 9 confirms it.',
        ],
      },
      {
        h: 'Areas and volumes',
        why: 'Area is two-dimensional, so a length scale factor k gives k² for area. Volume is three-dimensional, so it gives k³, which is why doubling the sides multiplies the volume by eight.',
        paras: [
          'If the scale factor for lengths is k, the scale factor for areas is k² and for volumes is k³. Use this rule to avoid mistakes when a question asks about area or volume rather than length. Applying the length factor to an area is the most common error.',
        ],
        formulas: ['area scale factor = k²', 'volume scale factor = k³'],
        examples: [
          'in the rectangles above, the area scale factor is 1.5² = 2.25. The area changes from 4 × 6 = 24 cm² to 6 × 9 = 54 cm², and 24 × 2.25 = 54.',
        ],
      },
      {
        h: 'Line symmetry',
        why: 'A mirror line splits a shape into two identical halves, so each point on one side has a matching point on the other. Counting the mirror lines gives the number of symmetries.',
        paras: [
          'A shape has line symmetry if a mirror line divides it into two identical halves, with each point on one side matched by a point the same distance away on the other side. Draw the mirror lines on a sketch to check, and count each one once.',
        ],
        examples: [
          'a regular hexagon has 6 lines of symmetry. A kite has 1 line of symmetry. A rectangle has 2 lines of symmetry.',
        ],
      },
      {
        h: 'Rotational symmetry',
        why: 'The order of rotational symmetry counts how many times a shape fits onto itself in one full turn. A shape with no rotation fit has order 1.',
        paras: [
          'The order of rotational symmetry is the number of times a shape fits onto itself in one full turn. Every shape fits onto itself at least once, so the smallest order is 1. The order is found by counting the positions in which the shape looks the same as it did at the start.',
        ],
        examples: [
          'a square has order 4. An equilateral triangle has order 3. A kite has order 1, since it only fits onto itself in one full turn.',
        ],
      },
    ],
    exam: [
      'Match corresponding sides before finding the scale factor.',
      'Square the scale factor for areas, and cube it for volumes.',
      'When counting symmetries, state whether you mean line or rotational symmetry.',
    ],
  },
];
