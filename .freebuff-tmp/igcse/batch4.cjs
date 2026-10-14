// IGCSE notes, batch 4. Worked answers here were checked by hand and in code.
module.exports = [
  {
    file: 'igcse-algebra-equations',
    eyebrow: 'Cambridge IGCSE Mathematics 0580, Algebra',
    title: 'Algebra: equations',
    syllabus: 'Cambridge IGCSE Mathematics 0580, Algebra: equations.',
    sections: [
      {
        h: 'The rule of balance',
        why: 'Doing the same operation to both sides keeps the equation true. You undo operations in reverse order because the last operation applied to x is the first one to undo.',
        paras: [
          'An equation is a statement that two expressions are equal. You solve it by finding the value of the unknown that makes the statement true. The rule of balance says that whatever you do to one side, you must do to the other, so the equation stays true at every step.',
          'Undo the operations applied to x in reverse order. First remove additions and subtractions, then multiplications and divisions. Brackets are removed first when they are in the way, and fractions are cleared before the other steps when they are present.',
        ],
      },
      {
        h: 'Two-step and bracketed equations',
        why: 'Substitution checks the answer against the original equation, catching slips without relying on memory. Brackets come off first, or the order of operations would undo the wrong step.',
        paras: [
          'A two-step equation needs two undoing steps. Remove the constant added or subtracted first, then divide by the coefficient of x. With brackets, expand first so that the equation becomes a two-step equation.',
          'Check every answer by substituting it back into the original equation, not into your working. A slip in the expansion is common, and only the original equation catches it.',
        ],
        examples: [
          '3(2x − 5) = 21. Expand: 6x − 15 = 21. Add 15: 6x = 36. Divide by 6: x = 6. Check by substitution: 3(2 × 6 − 5) = 3 × 7 = 21 ✓.',
        ],
      },
      {
        h: 'Equations with fractions',
        why: 'Multiplying every term by the lowest common denominator removes the fractions and keeps the balance. Choosing the lowest one keeps the numbers small.',
        paras: [
          'To clear fractions, multiply every term on both sides by the lowest common denominator. Every term must be multiplied, including the whole numbers, or the balance is lost. This is the most common error with fractions.',
          'After clearing, expand any brackets and solve as usual. The result will be a linear equation with no fractions.',
        ],
        examples: [
          '(x + 4)/3 − x/2 = 1. Multiply every term by 6: 2(x + 4) − 3x = 6. Expand: 2x + 8 − 3x = 6, so −x = −2 and x = 2. Check: (2 + 4)/3 − 2/2 = 2 − 1 = 1 ✓.',
        ],
      },
      {
        h: 'Unknowns on both sides',
        why: 'Moving letter terms to one side and numbers to the other is the same balancing rule applied twice. Pick the side where the letter term will stay positive to avoid sign errors.',
        paras: [
          'When x appears on both sides, collect the letter terms on one side and the numbers on the other. Subtract the smaller letter term from both sides, so that the x term you keep is positive. This avoids working with a negative coefficient, which is a frequent source of sign mistakes.',
        ],
        examples: [
          '5x + 3 = 2x + 12. Subtract 2x: 3x + 3 = 12. Subtract 3: 3x = 9, so x = 3.',
        ],
      },
      {
        h: 'Forming and solving equations from words',
        why: 'Defining the unknown first makes the relationship in the question clear enough to write as an equation. The answer must match the quantity asked for, which may be a total rather than one part.',
        paras: [
          'Start by defining the unknown with a letter and stating what it stands for, such as “let Tom be t”. Then write the relationship in the question as an equation, solve it, and answer the question that was actually asked.',
          'If the question asks for a total or for the other person’s age, use the value you have found to work it out. Stopping at the value of the unknown is a common way to lose the final mark.',
        ],
        examples: [
          'Sam is 4 years older than Tom. Their ages add to 26. Let Tom be t. Then t + (t + 4) = 26, so 2t = 22 and t = 11. Tom is 11 and Sam is 15.',
        ],
      },
      {
        h: 'Squares and square roots',
        why: 'Squaring loses the sign, so x² = 49 has both x = 7 and x = −7. Context such as a length being positive removes one of them, so read the question before choosing.',
        paras: [
          'Taking the square root of both sides of x² = k gives x = √k and x = −√k, so there are two solutions whenever k is positive. Give both unless the context restricts the value. A length, an area or a count must be positive, so only the positive root is then valid.',
        ],
        examples: [
          'x² = 49 gives x = 7 or x = −7. If x is the side length of a square, only x = 7 is possible.',
        ],
      },
    ],
    exam: [
      'Always check the answer by substituting it back into the original equation.',
      'Show each line of working; method marks depend on it.',
      'When an equation contains a fraction and a bracket, clear the fraction first, then expand.',
    ],
  },
  {
    file: 'igcse-algorithms-programming',
    eyebrow: 'Cambridge IGCSE Computer Science 0478, Section 7',
    title: 'Algorithm design and problem-solving',
    syllabus: 'Cambridge IGCSE Computer Science 0478, Section 7: algorithm design, problem-solving, and standard algorithms.',
    sections: [
      {
        h: 'Designing solutions',
        why: 'Decomposition makes a large problem testable by splitting it into parts. Abstraction hides detail that does not matter at the current level, so the solution stays clear.',
        paras: [
          'Decomposition breaks a large problem into smaller, manageable sub-problems that can each be solved and tested separately. Abstraction removes detail that is not needed to solve the problem, so that the solution focuses on what matters. An algorithm is a clear, step-by-step method that always finishes.',
          'Algorithms can be shown as pseudocode or as a flowchart. Flowchart symbols: an oval for start and end, a rectangle for a process, a parallelogram for input or output, and a diamond for a decision with a yes or no branch.',
        ],
      },
      {
        h: 'Constructs',
        why: 'Sequence, selection and iteration are the control structures that decide the order in which statements run. Any algorithm can be built from these three.',
        paras: [
          'Sequence means steps run one after another, in the order written. Selection chooses between paths by a condition, using IF or CASE statements. Iteration repeats steps, using FOR, WHILE or REPEAT loops.',
          'Choose the loop by what you know. Use FOR when the number of repeats is fixed in advance, and WHILE or REPEAT when the loop continues until a condition changes. A WHILE loop may run zero times, while a REPEAT loop always runs at least once.',
        ],
      },
      {
        h: 'Testing algorithms',
        why: 'Normal data show the algorithm works in typical cases. Boundary data test the edges, where off-by-one errors appear, and erroneous data check that invalid input is rejected.',
        paras: [
          'Test with three kinds of data. Normal data are typical values that should work. Boundary data are the values at the edges of the valid range, where off-by-one errors appear. Erroneous data are values that should be rejected, to check that the algorithm handles invalid input.',
          'A trace table records the values of the variables after each step, so you can follow the logic line by line and find the step where the result goes wrong.',
        ],
      },
      {
        h: 'Linear search',
        why: 'Linear search works on any list because it examines each item in turn. In the worst case it needs as many comparisons as there are items.',
        paras: [
          'Check each item in turn until the target is found or the list ends. It works on unsorted data, because it never assumes an order. In the worst case, the target is last or missing, and every item is compared.',
        ],
      },
      {
        h: 'Binary search',
        why: 'Binary search halves the sorted list at each step, so the number of comparisons grows with the logarithm of the list length. It is faster on long lists but only works after the data are sorted.',
        paras: [
          'Binary search works only on sorted data. Compare the target with the middle item, then discard the half that cannot contain it. Repeat on the remaining half until the target is found or no items remain.',
          'Because each step halves the list, a list of 1,000 items needs at most about 10 comparisons, while a linear search could need 1,000.',
        ],
        examples: [
          'search for 23 in 2, 5, 8, 12, 16, 23, 38 (positions 1 to 7). The middle is position 4, which holds 12. Since 23 is larger, the search continues in positions 5 to 7. The middle is position 6, which holds 23. Found in two comparisons.',
        ],
      },
      {
        h: 'Bubble sort',
        why: 'Each pass of a bubble sort carries the largest unsorted value to its final position. Repeating the passes places every value in order.',
        paras: [
          'Compare each adjacent pair and swap them if they are in the wrong order. Each pass moves the largest unsorted value to the end, so each pass places one more value correctly. Stop when a pass makes no swaps, because the list is then sorted.',
        ],
        examples: [
          'sort 5, 3, 8, 1. Pass 1 gives 3, 5, 1, 8. Pass 2 gives 3, 1, 5, 8. Pass 3 gives 1, 3, 5, 8.',
        ],
      },
    ],
    exam: [
      'Trace the algorithm with a trace table when a question asks for an output.',
      'State a precondition for binary search: the list must be sorted.',
      'Count the passes and comparisons carefully when a question asks for them.',
    ],
  },
  {
    file: 'igcse-data-representation',
    eyebrow: 'Cambridge IGCSE Computer Science 0478, Section 1',
    title: 'Data representation',
    syllabus: 'Cambridge IGCSE Computer Science 0478, Section 1: number systems, text, sound and images, and data storage and compression.',
    sections: [
      {
        h: 'Number systems',
        why: 'Each base uses place values that are powers of that base, so a digit’s value depends on its position. Converting between bases uses those place values directly.',
        paras: [
          'Denary is base 10, with digits 0 to 9. Binary is base 2, with digits 0 and 1. Hexadecimal is base 16, with digits 0 to 9 and A to F, where A is 10 and F is 15. Each binary place value doubles from the right: 1, 2, 4, 8, 16, 32, 64, 128.',
          'To convert denary to binary, find the place values that add up to the number and put a 1 under each one used. To convert binary to hexadecimal, split the binary number into groups of four bits from the right, and convert each group to one hexadecimal digit.',
        ],
        examples: [
          'denary 45 to binary: 32 + 8 + 4 + 1 gives 00101101.',
          'binary 00101101 to hexadecimal: split into nibbles 0010 and 1101 to get 2 and D, so 2D.',
          'denary 255 is 11111111 in binary and FF in hexadecimal.',
        ],
      },
      {
        h: 'Binary addition and overflow',
        why: 'Binary carries work as in denary, but the carry happens at 2 instead of 10. Overflow occurs when the result needs more bits than the register can hold.',
        paras: [
          'Add digit by digit from the right, carrying a 1 when the sum reaches 2. Each carry adds to the next column, and a column with 1 + 1 + 1 gives 1 with a carry of 1.',
          'Overflow happens when the result needs more bits than the register holds. The extra bit is lost, so the stored result is wrong. Always check the answer against the register size stated in the question.',
        ],
        examples: [
          '00101101 (45) + 00000101 (5) = 00110010 (50).',
          'in an 8-bit register, 11111111 + 1 produces a ninth bit, so the stored result is 00000000.',
        ],
      },
      {
        h: "Two's complement",
        why: 'Inverting every bit and adding 1 gives the negative of a number. The leftmost bit then signals the sign, and addition works without special rules for negatives.',
        paras: [
          "To store a negative number in two's complement, write the positive value in binary, invert every bit, then add 1. The leftmost bit is 1 for negative numbers and 0 for positive ones. The same method reverses a negative back to its positive value.",
        ],
        examples: [
          'to find −5 in 8 bits: write 5 as 00000101, invert every bit to get 11111010, and add 1 to get 11111011.',
        ],
      },
      {
        h: 'Text, sound and images',
        why: 'Characters, sound samples and pixels are all stored as numbers. More bits give more distinct values, so text, sound and images can be represented more precisely.',
        paras: [
          'Each character is stored as a code. ASCII uses 7 or 8 bits per character and covers the basic English characters. Unicode uses more bits and covers many more languages and symbols.',
          'An image is a grid of pixels, and each pixel stores a colour as a number of bits. File size in bits = width × height × colour depth (bits per pixel).',
          'Sound is sampled at intervals, and each sample is stored as a number. File size in bits = sample rate × bit depth × number of channels × duration in seconds. A higher sample rate and bit depth give better quality and a larger file.',
        ],
        examples: [
          'an 800 × 600 image at 24 bits per pixel needs 800 × 600 × 24 = 11,520,000 bits, which is 1,440,000 bytes.',
          'one minute of stereo sound at 44,100 samples per second with 16 bits per sample: 44,100 × 16 × 2 × 60 = 84,672,000 bits, which is 10,584,000 bytes.',
        ],
      },
      {
        h: 'Data storage and compression',
        why: 'A byte is 8 bits, and storage units must be converted with care. Compression reduces file size by removing redundancy, either without losing data or by discarding some detail.',
        paras: [
          'A byte is 8 bits. Divide the number of bits by 8 to get bytes, and use the units given in the question when converting storage sizes.',
          'Lossless compression reduces file size without losing data, so the original can be restored exactly. Run-length encoding is one method: it stores each run as a count and a value. Lossy compression removes detail that is judged less important, so the original cannot be recovered exactly. It produces much smaller files and suits photographs and music.',
        ],
        examples: [
          'run-length encoding: AAAABBBCCDAA becomes 4A3B2C1D2A.',
        ],
      },
    ],
    exam: [
      'Show each step of a conversion; method marks depend on it.',
      'Check the number of bits in the answer against the register size stated.',
      'When the question asks for file size, state the units you used.',
    ],
  },
  {
    file: 'igcse-forces-motion',
    eyebrow: 'Cambridge IGCSE Physics 0972 (2026-2028), Section 1 Supplement content',
    title: 'Forces and motion',
    syllabus: 'Cambridge IGCSE Physics 0972 (2026-2028), Section 1 Supplement content: motion, mass and weight, forces, and momentum.',
    sections: [
      {
        h: 'Speed, velocity and acceleration',
        why: 'Speed ignores direction, while velocity includes it, so a change of direction changes velocity even at constant speed. Acceleration is the rate of change of velocity, which is why it can come from a change in direction as well as speed.',
        paras: [
          'Speed has magnitude only, while velocity has magnitude and direction. Acceleration is the rate of change of velocity, so an object accelerates when it speeds up, slows down, or changes direction. A negative acceleration is often called deceleration.',
          'Acceleration = change in velocity ÷ time taken, so a = (v − u) ÷ t, where u is the initial velocity and v is the final velocity. Use consistent units, such as metres per second and seconds, which give metres per second squared.',
        ],
        formulas: ['a = (v − u) ÷ t'],
        examples: [
          'a car speeds up from 0 to 20 m/s in 8 s. Acceleration = (20 − 0) ÷ 8 = 2.5 m/s².',
        ],
      },
      {
        h: 'Distance from a velocity–time graph',
        why: 'On a distance–time graph the gradient is speed, and on a velocity–time graph the gradient is acceleration. The area under a velocity–time graph gives the displacement, because it multiplies velocity by time. It equals the distance travelled only while the velocity does not change direction.',
        paras: [
          'On a distance–time graph, a steeper line means a higher speed, and a horizontal line means the object is stopped. On a velocity–time graph, a steeper line means a larger acceleration, and a horizontal line means constant velocity.',
          'The area under a velocity–time graph gives displacement. If the velocity stays on one side of zero, the area is the distance travelled. If the object reverses direction, the area below zero counts negatively, so you must split the area and add the distances instead.',
        ],
        examples: [
          'the car above travels an average speed of (0 + 20) ÷ 2 = 10 m/s for 8 s, so the distance is 10 × 8 = 80 m.',
        ],
      },
      {
        h: 'Mass and weight',
        why: 'Mass measures the amount of matter and does not change with location. Weight is the gravitational pull on that mass, so it changes with the field strength, which is why the two must not be confused.',
        paras: [
          'Mass is the amount of matter, measured in kilograms, and it is measured by a balance. Weight is the gravitational force on a mass, measured in newtons, and it is measured by a newtonmeter. Weight = mass × gravitational field strength: W = mg.',
          'Use the value of g given in the question. A value of g ≈ 10 N/kg is common in calculations, and the value on Earth is about 9.8 N/kg. A mass of 2 kg has the same mass on the Moon, but a much smaller weight, because the field strength there is smaller.',
        ],
        formulas: ['W = mg'],
        examples: [
          'a 2 kg mass has weight 2 × 10 = 20 N on Earth.',
        ],
      },
      {
        h: 'Forces and resultant forces',
        why: 'Forces are vectors, so opposite forces subtract and a resultant of zero means balanced forces. Only the resultant force changes an object’s motion, so the net effect is what the question asks for.',
        paras: [
          'A force is a push or pull, and it is a vector, so combine forces with their directions. Opposite forces subtract to give the resultant. A resultant force of zero means the object is in equilibrium: it is at rest or moving at constant velocity.',
          "Newton's second law links the resultant force to the motion: resultant force = mass × acceleration, F = ma. The resultant force, not any single force, determines how the object accelerates.",
        ],
        formulas: ['F = ma'],
        examples: [
          'a 5 kg object with a resultant force of 15 N accelerates at 15 ÷ 5 = 3 m/s².',
        ],
      },
      {
        h: 'Momentum',
        why: 'Momentum is mass times velocity, and in a collision with no external forces the total momentum before equals the total afterwards. This follows from Newton’s third law, because the forces between the objects are equal and opposite.',
        paras: [
          'Momentum = mass × velocity, p = mv, measured in kilogram metres per second. Momentum is a vector, so direction matters.',
          'Momentum is conserved in a collision when no external force acts on the system. Add the momenta before the collision and set the total equal to the total afterwards. For objects that stick together, the mass after is the sum of the two masses.',
        ],
        formulas: ['p = mv'],
        examples: [
          'a 2 kg trolley moves at 3 m/s and sticks to a stationary 1 kg trolley. The total momentum before is 2 × 3 = 6 kg m/s. The total mass after is 3 kg, so the common velocity is 6 ÷ 3 = 2 m/s.',
        ],
      },
    ],
    exam: [
      'Write the equation, substitute with units, then compute. Units are marked.',
      'In momentum questions, choose a positive direction and keep the signs consistent.',
      'Distinguish mass (kg, no direction) from weight (N, acts downwards).',
    ],
  },
];
