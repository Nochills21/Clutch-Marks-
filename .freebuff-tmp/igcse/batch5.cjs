// IGCSE notes, batch 5. Worked answers here were checked by hand and in code.
module.exports = [
  {
    file: 'igcse-number-indices-and-standard-form',
    eyebrow: 'Cambridge IGCSE Mathematics 0580, Number',
    title: 'Number: indices and standard form',
    syllabus: 'Cambridge IGCSE Mathematics 0580, Number: powers and roots, indices, standard form and surds.',
    sections: [
      {
        h: 'Powers and roots',
        why: 'A square root undoes squaring and a cube root undoes cubing. Knowing the small values by heart saves calculator time in exam questions and lets you check a result quickly.',
        paras: [
          'Recall the squares and square roots from 1 to 15, and the cubes and cube roots of 1, 2, 3, 4, 5 and 10. Use these to check results quickly, and use a calculator for other powers and roots.',
          'Every positive number has a positive square root, and the square root of 169 is 13. Note that the square root symbol gives only the positive root, so when solving x² = 169 you need both 13 and −13.',
        ],
        examples: [
          '√169 = 13, and 5³ = 125.',
        ],
      },
      {
        h: 'Rules of indices',
        why: 'The index laws follow from what a power means: multiplying the same base adds the powers, a negative power is a reciprocal, and a power of a power multiplies them. Each law is the same counting idea applied to a different case.',
        paras: [
          'When the bases are the same, the index laws let you combine powers without expanding them. Multiplying adds the powers, dividing subtracts them, and raising a power to another power multiplies them.',
          'Any non-zero number to the power 0 is 1. A negative power means the reciprocal of the positive power, so a⁻ⁿ = 1 ÷ aⁿ. A negative power never makes the number itself negative.',
        ],
        formulas: ['aᵐ × aⁿ = aᵐ⁺ⁿ', 'aᵐ ÷ aⁿ = aᵐ⁻ⁿ', '(aᵐ)ⁿ = aᵐⁿ', 'a⁰ = 1 (for a ≠ 0)', 'a⁻ⁿ = 1 ÷ aⁿ'],
        examples: [
          '7⁻² = 1/49. 2⁻³ × 2⁴ = 2¹ = 2. (2³)² = 2⁶ = 64.',
        ],
      },
      {
        h: 'Standard form',
        why: 'Keeping one digit before the decimal point means the power of ten shows the size of the number directly. The range 1 ≤ A < 10 makes every number have exactly one standard form.',
        paras: [
          'Write a number as A × 10ⁿ, where n is a positive or negative integer and 1 ≤ A < 10. A large number has a positive power, because the decimal point moves to the left. A small number, between 0 and 1, has a negative power.',
          'To multiply two numbers in standard form, multiply the A values and add the powers. If the new A value is 10 or more, or below 1, adjust it and change the power to match.',
        ],
        examples: [
          '352,000 = 3.52 × 10⁵. 0.00047 = 4.7 × 10⁻⁴.',
          '(3 × 10⁴) × (2 × 10⁵) = 6 × 10⁹.',
        ],
      },
      {
        h: 'Indices II: solving equations',
        why: 'If both sides have the same base, the exponents must be equal, because a power with a fixed base is one-to-one. Writing both sides with the same base turns the equation into a simple one.',
        paras: [
          'Solve equations where the unknown is an index by writing both sides with the same base. Once the bases match, equate the indices and solve the resulting linear equation.',
        ],
        examples: [
          '2ˣ = 32 = 2⁵, so x = 5. Also 2ⁿ = 1/16 = 2⁻⁴, so n = −4.',
        ],
      },
      {
        h: 'Surds (Extended only)',
        why: 'A surd such as √2 has a decimal that never ends or repeats, so it is kept exact. Simplifying uses square factors, for example √12 = 2√3, because √4 = 2 is a whole number.',
        paras: [
          'A surd is a root that cannot be written as a whole number or a simple fraction, so it is kept in exact form. To simplify, find a square factor inside the root, take its root outside, and leave the rest inside.',
          'Only like surds can be added or subtracted, and they combine like algebraic terms. To rationalise a denominator that contains a surd, multiply the top and bottom by the conjugate, which is the same expression with the sign between the terms reversed.',
        ],
        examples: [
          '√20 = √4 × √5 = 2√5.',
          '√200 − √32 = 10√2 − 4√2 = 6√2.',
          '1/(√3 − 1) = (√3 + 1)/((√3 − 1)(√3 + 1)) = (√3 + 1)/2, since the denominator becomes 3 − 1 = 2.',
        ],
      },
    ],
    exam: [
      'Write the standard form answer with A between 1 and 10 and state the power of 10.',
      'Check the sign of the index: a negative power gives a small number.',
      'When rationalising, multiply top and bottom by the same conjugate.',
    ],
  },
  {
    file: 'igcse-number-ratio-rate-and-proportion',
    eyebrow: 'Cambridge IGCSE Mathematics 0580, Number',
    title: 'Number: ratio, rate and proportion',
    syllabus: 'Cambridge IGCSE Mathematics 0580, Number: ratio, rates and proportion (Core), with direct and inverse proportion (Extended).',
    sections: [
      {
        h: 'Ratio in its simplest form',
        why: 'A ratio compares sizes, so dividing every part by the highest common factor keeps the comparison true while reducing the numbers.',
        paras: [
          'A ratio compares two or more quantities of the same kind. Before simplifying, make sure every part is in the same units. Then divide each part by the highest common factor of all the parts, so that the ratio cannot be simplified further.',
        ],
        examples: [
          '20 : 30 : 40 = 2 : 3 : 4, dividing every part by 10.',
        ],
      },
      {
        h: 'Dividing a quantity in a ratio',
        why: 'The total number of parts is the sum of the ratio numbers. Finding the value of one part and then multiplying gives each share its correct size.',
        paras: [
          'Add the parts of the ratio to find the total number of parts. Divide the total quantity by that number to find the value of one part, then multiply the value of one part by each ratio number to find each share.',
          'Check that the shares add back to the original total. This catches the common error of dividing by only one of the parts rather than by the sum.',
        ],
        examples: [
          'divide £60 in the ratio 2 : 3. There are 5 parts, so one part is £12. The shares are £24 and £36, which add to £60.',
        ],
      },
      {
        h: 'Rates',
        why: 'A rate divides two quantities of different kinds, so its units say what it means. Speed as distance divided by time is the standard example.',
        paras: [
          'A rate compares two different quantities. Common examples are speed (distance ÷ time), hourly pay, exchange rates, flow rates, fuel consumption, pressure, density and population density. The units of the answer come from the units of the two quantities.',
          'Average speed is total distance divided by total time, not the average of the separate speeds. Convert the time to a decimal number of hours before you divide.',
        ],
        formulas: ['speed = distance ÷ time'],
        examples: [
          'a cyclist travels 45 km in 3 hours 45 minutes. Convert 3 hours 45 minutes to 3.75 hours. Average speed = 45 ÷ 3.75 = 12 km/h.',
        ],
      },
      {
        h: 'Using proportional reasoning',
        why: 'When a quantity scales up or down, every part scales by the same factor, so the ratio between parts stays the same. This is what makes recipes and map scales work.',
        paras: [
          'Use ratios in context: adapt a recipe for a different number of people, use a map scale, or decide which option is better value. In each case, find the scale factor first, then apply it to every quantity.',
          'For a better-value question, compare the unit price: divide the cost by the amount for each option, and choose the smaller result.',
        ],
      },
      {
        h: 'Direct and inverse proportion (Extended)',
        why: 'Direct proportion means y = kx, so y divided by x is constant. Inverse proportion means y = k divided by x, so the product xy is constant. Finding k first from the given values makes the rest of the question a single calculation.',
        paras: [
          'Express the relationship with a constant of proportionality k, then use the given values to find k. Once k is known, substitute the new value of the variable to find the answer.',
          'Direct proportion: y ∝ x means y = kx. Inverse proportion: y ∝ 1/x means y = k/x. Square and square-root proportion follow the same pattern: y ∝ x² means y = kx², and y ∝ √x means y = k√x.',
        ],
        formulas: ['direct: y = kx', 'inverse: y = k/x', 'square: y = kx²'],
        examples: [
          'y is proportional to x². When x = 2, y = 12, so k = 3 and y = 3x². When x = 4, y = 48.',
          'y is inversely proportional to x. When x = 4, y = 6, so k = 24. When x = 8, y = 3.',
        ],
      },
    ],
    exam: [
      'Write the ratio with the same units before simplifying.',
      'Check that each share adds back to the original total.',
      'For proportion, write the equation with k first, then find k before using it.',
    ],
  },
  {
    file: 'igcse-geometry-angles-and-polygons',
    eyebrow: 'Cambridge IGCSE Mathematics 0580, Geometry',
    title: 'Geometry: angles and polygons',
    syllabus: 'Cambridge IGCSE Mathematics 0580, Geometry: geometrical terms, angles, circle theorems.',
    sections: [
      {
        h: 'Angle facts',
        why: 'Angles on a straight line sum to 180 degrees, angles at a point sum to 360, vertically opposite angles are equal, and a triangle’s angles sum to 180. Each fact is a reason you can quote in a proof-style answer.',
        paras: [
          'Angles on a straight line add to 180°, and angles at a point add to 360°. Vertically opposite angles are equal, because they are formed by the same two lines crossing.',
          'The angles in a triangle add to 180°. The exterior angle of a triangle equals the sum of the two opposite interior angles, which gives a quick way to find an angle without first finding the third interior angle.',
        ],
      },
      {
        h: 'Parallel lines',
        why: 'Alternate, corresponding and co-interior angles come from a transversal crossing parallel lines. Co-interior angles lie on the same side, so they add to 180 degrees.',
        paras: [
          'Alternate angles are equal, and they form a Z shape. Corresponding angles are equal, and they form an F shape. Co-interior angles add to 180°, and they form a C shape. Identify the shape before applying the rule, since the same pair of angles can be described by more than one rule only if the lines are parallel.',
        ],
      },
      {
        h: 'Polygons',
        why: 'Splitting an n-sided polygon into triangles from one vertex gives n − 2 triangles, so the interior angles add to (n − 2) × 180. A regular polygon shares this equally, and each exterior angle is 360 divided by n.',
        paras: [
          'The interior angles of an n-sided polygon add to (n − 2) × 180°. For a regular polygon, each interior angle is (n − 2) × 180 ÷ n, and each exterior angle is 360 ÷ n.',
          'The exterior angles of any polygon add to 360°, whatever the number of sides. A useful check is that an interior angle and its exterior angle add to 180°.',
        ],
        formulas: ['interior angles total = (n − 2) × 180°', 'exterior angle of a regular polygon = 360 ÷ n'],
        examples: [
          'a regular octagon has n = 8. Interior angle = 6 × 180 ÷ 8 = 135°. Exterior angle = 360 ÷ 8 = 45°. Check: 135 + 45 = 180.',
        ],
      },
      {
        h: 'Circle theorems',
        why: 'The angle at the centre is twice the angle at the circumference on the same arc. An angle in a semicircle is always 90 degrees, a result that follows from this rule.',
        paras: [
          'The angle at the centre is twice the angle at the circumference subtending the same arc. From this rule, an angle in a semicircle is 90°, because the arc is a half-turn.',
          'Angles in the same segment are equal. Opposite angles of a cyclic quadrilateral, which is one with all four vertices on the circle, add to 180°. A tangent is perpendicular to the radius at the point of contact.',
        ],
        examples: [
          'the angle at the centre is 140°, so the angle at the circumference on the same arc is 70°.',
        ],
      },
      {
        h: 'Circle theorems II (Extended)',
        why: 'The alternate segment theorem links a tangent to a chord: the angle between them equals the angle in the segment on the other side. Quoting the theorem by name is what earns the mark.',
        paras: [
          'The alternate segment theorem says that the angle between a tangent and a chord equals the angle in the alternate segment. Two tangents drawn from the same external point are equal in length, so they form an isosceles triangle with the centre.',
        ],
      },
    ],
    exam: [
      'Give a reason for every step, naming the theorem or angle fact; reasons earn marks.',
      'Mark known angles on the diagram as you find them.',
      'Do not assume a shape is regular, or a line is a tangent, unless the question states it.',
    ],
  },
  {
    file: 'igcse-robotics-ai',
    eyebrow: 'Cambridge IGCSE Computer Science 0478, Section 6',
    title: 'Automated and emerging technologies',
    syllabus: 'Cambridge IGCSE Computer Science 0478, Section 6: automated systems, robotics and artificial intelligence.',
    sections: [
      {
        h: 'Automated systems',
        why: 'An automated system runs a loop: sensors gather data, a processor decides, and actuators act. Each part depends on the one before, so a fault in any part affects the whole system.',
        paras: [
          'An automated system carries out a task without human intervention. It uses sensors to gather data, a processor to decide what to do, and actuators such as motors, valves or lights to act on the environment.',
          'A control loop repeats this sequence and uses feedback to correct the system. Feedback means the output is measured and compared with the target, so the system can adjust itself on the next cycle.',
        ],
        examples: [
          'a greenhouse heater turns on when a temperature sensor reads below the set point, and turns off when the reading reaches it.',
        ],
      },
      {
        h: 'Robotics',
        why: 'Robots respond to their environment through sensors and a control system, rather than following a fixed sequence. This adaptability is what separates a robot from a simple machine.',
        paras: [
          'A robot is an automated machine that can move and act. Robots use sensors such as light, distance or touch sensors, a control system, and actuators to move. The degrees of freedom describe how many independent movements a robot arm can make; more degrees of freedom give it more flexibility.',
          'Robots are used where tasks are dangerous, repetitive or need high precision, such as assembling cars or handling hazardous materials.',
        ],
      },
      {
        h: 'Artificial intelligence',
        why: 'AI learns patterns from data, so biased data gives biased decisions. Responsibility for an AI decision still rests with the people who design and use the system.',
        paras: [
          'An expert system holds a knowledge base of rules provided by experts, and an inference engine applies those rules to answer questions. It can explain its reasoning, but only within the rules it was given.',
          'Machine learning trains a system on data so that it improves at a task without being given every rule. Training data must be large and representative, or the system will learn the gaps in it.',
          'AI can make errors, and its decisions can reflect bias in its training data. Responsibility for those decisions and for privacy must be considered when an AI system is used.',
        ],
      },
      {
        h: 'Advantages and disadvantages of automation',
        why: 'Automation increases speed and accuracy and can work in dangerous places, but it can displace workers and depends on reliable systems. Weighing both sides is what the question asks for.',
        paras: [
          'Advantages include higher speed and accuracy, work in dangerous places, and continuous operation. Disadvantages include job losses, high initial cost, dependence on technology, and the difficulty of handling unexpected situations that were not programmed.',
        ],
      },
    ],
    exam: [
      'Name the three parts of an automated system (sensor, processor, actuator) when asked to describe one.',
      'Distinguish an expert system from machine learning by where the rules come from.',
      'Give both an advantage and a disadvantage when asked to evaluate automation.',
    ],
  },
];
