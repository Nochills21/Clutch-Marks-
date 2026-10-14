// IGCSE notes, batch 6. Worked answers were checked by hand and in code.
module.exports = [
  {
    file: 'igcse-algebra-graphs',
    eyebrow: 'Cambridge IGCSE Mathematics 0580, Algebra and graphs',
    title: 'Algebra and coordinate geometry: graphs',
    syllabus: 'Cambridge IGCSE Mathematics 0580, Algebra and graphs, and Coordinate geometry.',
    sections: [
      {
        h: 'Graphs in practical situations',
        why: 'On a distance–time graph the gradient is speed because speed is distance per unit time. A conversion graph works the same way: its gradient is the rate that converts one unit into the other.',
        paras: [
          'A graph shows how one quantity changes with another. Before reading values, check the labels and units on both axes, because a graph in metres against seconds and one in kilometres against hours look similar but give different gradients.',
          'To draw a graph from a table of data, plot each pair of values as a point, then join the points with a straight line or a smooth curve, depending on what the data show. Points that do not fit a clear pattern should be checked before you join them.',
          'A distance–time graph shows speed through its steepness: a steeper line is faster, and a horizontal line means the object is stopped. A conversion graph between two units, such as pounds and dollars, is a straight line through the origin, and its gradient is the conversion rate.',
        ],
      },
      {
        h: 'Graphs of functions',
        why: 'Each table row gives one point on the curve, and joining enough points shows the shape. The restriction x ≠ 0 for y = a/x is needed because division by zero is undefined.',
        paras: [
          'Draw graphs of y = ax + b, y = x² + ax + b and y = a/x (x ≠ 0), where a and b are integers. Make a table of values first, choosing x values that cover the range asked for, then plot the points and join them.',
          'Solve an equation graphically by finding where the graph of the function crosses a horizontal line or another graph. Read the x-values of those points as the solutions. The answers are approximate when read from a drawn graph, so give them to the accuracy the question asks for.',
        ],
      },
      {
        h: 'Sketching linear and quadratic graphs',
        why: 'A quadratic is symmetrical about a vertical line through its turning point, so the intercepts on either side of that line match. Marking the intercepts and the symmetry fixes the shape of the sketch.',
        paras: [
          'A sketch shows the important features without accurate plotting. For a linear graph, mark the two axis intercepts and join them. For a quadratic, mark the points where the curve crosses the axes and use the symmetry about the vertical line through the turning point to place the rest of the curve.',
        ],
      },
      {
        h: 'Coordinates and gradient',
        why: 'Gradient is rise over run, the change in y per unit change in x. It is the same between any two points on a straight line.',
        paras: [
          'The gradient of a straight line is the change in y divided by the change in x, written as (y₂ − y₁) ÷ (x₂ − x₁). A line that rises from left to right has a positive gradient, and one that falls has a negative gradient. Any two points on the line give the same gradient, so choose points that are easy to read.',
        ],
        formulas: ['gradient = (y₂ − y₁) ÷ (x₂ − x₁)'],
        examples: [
          'between (0, 1) and (4, 9), the gradient is (9 − 1) ÷ (4 − 0) = 2.',
        ],
      },
      {
        h: 'Equations of straight lines',
        why: 'In y = mx + c, m sets how steeply the line rises and c sets where it crosses the y-axis. Two lines with the same m and different c never meet, which is why they are parallel.',
        paras: [
          'Write a line as y = mx + c, where m is the gradient and c is the y-intercept. Parallel lines have the same gradient. Two lines with the same gradient and the same intercept are the same line, so the intercept is what makes a parallel line distinct.',
          'To find the equation of a line through a given point with a given gradient, substitute the point into y = mx + c and solve for c.',
        ],
        formulas: ['y = mx + c'],
        examples: [
          'a line parallel to y = 4x − 1 through (1, −3) has equation y = 4x − 7, since −3 = 4(1) − 7.',
        ],
      },
      {
        h: 'Perpendicular lines (Extended)',
        why: 'A 90-degree turn swaps the rise and the run and changes the sign of one of them, so perpendicular gradients multiply to −1. Rewriting the line as y = mx + c makes its gradient easy to read.',
        paras: [
          'Perpendicular lines have gradients whose product is −1, so the gradient of a perpendicular line is the negative reciprocal of the original. Rewrite the given line as y = mx + c first, so that its gradient is clear.',
          'A perpendicular bisector of a segment passes through the midpoint and is perpendicular to the segment, so find the midpoint, then the gradient of the segment, then the perpendicular gradient.',
        ],
        examples: [
          '2y = 3x + 1 has gradient 3/2, so a perpendicular line has gradient −2/3.',
          'the perpendicular bisector of (−3, 8) and (9, −2) passes through the midpoint (3, 3). The segment has gradient −10/12 = −5/6, so the bisector has gradient 6/5, and its equation is y − 3 = (6/5)(x − 3).',
        ],
      },
      {
        h: 'Length and midpoint (Extended)',
        why: 'The length formula is Pythagoras on the horizontal and vertical differences. The midpoint averages the coordinates, so it lies halfway along the line.',
        paras: [
          'The length of a line joining two points is found by Pythagoras on the horizontal and vertical differences between them. The midpoint is found by averaging the x-coordinates and the y-coordinates separately.',
        ],
        formulas: ['length = √((x₂ − x₁)² + (y₂ − y₁)²)', 'midpoint = ((x₁ + x₂) ÷ 2, (y₁ + y₂) ÷ 2)'],
        examples: [
          'A(1, 2) and B(5, 10). Length AB = √(16 + 64) = √80 = 4√5. Midpoint = (3, 6).',
        ],
      },
      {
        h: 'Differentiation (Extended)',
        why: 'The power rule gives the gradient of the curve at each x. At a stationary point the gradient is zero, so solving dy/dx = 0 finds the turning points.',
        paras: [
          'For y = axⁿ, dy/dx = naxⁿ⁻¹. Differentiate each term of a polynomial with up to three such terms, then substitute a value of x to find the gradient at that point.',
          'Stationary points occur where dy/dx = 0. The second derivative tells you the type: if it is positive the point is a minimum, and if it is negative the point is a maximum. Check the syllabus for whether this topic is examinable in your course before revising it in depth.',
        ],
        examples: [
          'y = 3x² gives dy/dx = 6x, so the gradient at x = 2 is 12.',
          'y = x² − 4x has dy/dx = 2x − 4 = 0 at x = 2, where y = −4. The second derivative is 2, which is positive, so this is a minimum.',
        ],
      },
    ],
    exam: [
      'Label the axes and their units before reading values from a graph.',
      'Rearrange to y = mx + c before reading the gradient.',
      'Check the length and midpoint by substituting the coordinates.',
    ],
  },
  {
    file: 'igcse-mensuration-area-and-volume',
    eyebrow: 'Cambridge IGCSE Mathematics 0580, Mensuration',
    title: 'Mensuration: area and volume',
    syllabus: 'Cambridge IGCSE Mathematics 0580, Mensuration: units, area and perimeter, circles, surface area and volume, and compound shapes.',
    sections: [
      {
        h: 'Units',
        why: 'A square metre is a square of side 1 m, which is 100 cm by 100 cm, so 1 m² = 10,000 cm². Volume uses cubes, so 1 m³ = 1,000,000 cm³. Units must be squared or cubed with the length conversion, not just multiplied by it.',
        paras: [
          'Convert between metric units of length, area, volume and capacity. The most common error is converting the length but not the area or volume. Converting 1 m to 100 cm is correct for length, but 1 m² is 100 × 100 cm², not 100 cm².',
          'Capacity and volume are linked: one litre is the same as 1000 cm³, and one millilitre is the same as 1 cm³.',
        ],
        formulas: ['1 m² = 10,000 cm²', '1 m³ = 1,000,000 cm³', '1 litre = 1,000 cm³'],
      },
      {
        h: 'Perimeter and area',
        why: 'Perimeter is a length measured around the outside, so it uses ordinary units. Area counts squares inside the shape, so its units are squared.',
        paras: [
          'Calculate the perimeter and area of a rectangle, triangle, parallelogram and trapezium. Perimeter is the sum of the lengths of the sides, and area uses the correct formula for the shape. For a triangle, the height must be perpendicular to the base, not a slanted side.',
        ],
        formulas: ['trapezium: area = ½(a + b)h', 'parallelogram: area = base × perpendicular height'],
        examples: [
          'a trapezium with parallel sides 3 cm and 7 cm and height 4 cm has area ½ × (3 + 7) × 4 = 20 cm².',
        ],
      },
      {
        h: 'Circles, arcs and sectors',
        why: 'An arc is the same fraction of the circumference as the sector angle is of 360 degrees, and a sector is the same fraction of the whole circle’s area. Both formulas come from that proportion.',
        paras: [
          'Circumference = 2πr. Area = πr². For an arc or sector, the sector angle is a fraction of 360°, so the arc length is that fraction of the circumference, and the sector area is the same fraction of the circle area.',
          'Leave the answer in terms of π when the question asks for it, and give a decimal to the required accuracy otherwise.',
        ],
        formulas: ['circumference = 2πr', 'area = πr²', 'arc length = (θ ÷ 360) × 2πr', 'sector area = (θ ÷ 360) × πr²'],
        examples: [
          'a sector of radius 6 cm and angle 60°. Arc length = (60 ÷ 360) × 2π × 6 = 2π cm. Area = (60 ÷ 360) × π × 36 = 6π cm².',
        ],
      },
      {
        h: 'Surface area and volume',
        why: 'A prism has the same cross-section along its length, so its volume is the cross-section area times the length. Surface area adds up every face, and the formulas for the other solids follow from the same reasoning.',
        paras: [
          'Calculate the surface area and volume of a cuboid, prism, cylinder, pyramid, cone and sphere. Learn the formulas for the volumes and the curved surface areas, and check that every face is included in the total surface area.',
        ],
        formulas: ['cylinder volume = πr²h', 'cylinder curved surface area = 2πrh', 'sphere volume = (4/3)πr³'],
        examples: [
          'a cylinder with radius 3 cm and height 10 cm. Volume = π × 3² × 10 = 90π ≈ 282.7 cm³. Curved surface area = 2π × 3 × 10 = 60π cm². Total surface area = 60π + 2π × 3² = 78π ≈ 245.0 cm².',
          'a sphere of radius 3 cm has volume (4/3)π × 27 = 36π ≈ 113.1 cm³.',
        ],
      },
      {
        h: 'Compound shapes and parts of shapes',
        why: 'A compound shape is a combination of simple shapes, so its area or volume is the sum or difference of the parts. Splitting it into known shapes avoids needing a new formula.',
        paras: [
          'Split a compound shape into simpler shapes, find each area or volume, then add or subtract as needed. For part of a solid, calculate the whole and take the fraction.',
          'A shape with a hole, such as a washer or a tube, is a larger shape minus a smaller one. Find the outer part, then subtract the inner part.',
        ],
        examples: [
          'half of the sphere above has volume ½ × 36π = 18π ≈ 56.5 cm³.',
        ],
      },
    ],
    exam: [
      'Convert units before calculating, not after.',
      'Leave answers in terms of π when asked, and give decimals to the accuracy requested otherwise.',
      'Draw a sketch of compound shapes and label each part.',
    ],
  },
  {
    file: 'igcse-mensuration-bearings-and-loci',
    eyebrow: 'Cambridge IGCSE Mathematics 0580, Geometry',
    title: 'Geometry: constructions, scale drawings and bearings',
    syllabus: 'Cambridge IGCSE Mathematics 0580, Geometry: geometrical constructions, nets, scale drawings and three-figure bearings (Core).',
    sections: [
      {
        h: 'Measuring and drawing',
        why: 'Accurate drawing depends on a straight edge and a sharp pencil, because small errors in a drawing become large errors when you scale them up.',
        paras: [
          'Measure and draw lines and angles accurately. Use a ruler for all straight edges, and measure from the same end each time. Mark the points clearly, because a drawing with a fuzzy vertex loses marks even when the lengths are right.',
        ],
      },
      {
        h: 'Constructing a triangle',
        why: 'Two arcs drawn from the ends of a side meet at the third vertex, because every point on each arc is the correct distance from one end. Keeping the compass setting fixed keeps the arcs correct.',
        paras: [
          'Construct a triangle given the lengths of all three sides, using a ruler and a pair of compasses only. Draw the longest side first as a base, then draw one arc from each end with the length of the other two sides as the radius. The arcs meet at the third vertex.',
          'Show the construction arcs, and do not erase them, because they are the evidence of the method.',
        ],
        examples: [
          'to construct a triangle with sides 6 cm, 5 cm and 4 cm, draw the 6 cm base, then draw an arc of radius 5 cm from one end and an arc of radius 4 cm from the other. The arcs meet at the third vertex.',
        ],
      },
      {
        h: 'Nets',
        why: 'A net is a flat pattern that folds into a solid. Its shapes and lengths give the surface area, since each face of the solid appears once in the net.',
        paras: [
          'Draw and interpret nets of cubes, cuboids, prisms and pyramids. Use measurements from a net to calculate surface areas and volumes. Each face of the solid appears exactly once in the net, so the surface area is the sum of the areas of the faces in the net.',
        ],
        examples: [
          'a net of a cube with edge 2 cm has six squares of area 4 cm², so the surface area is 24 cm².',
        ],
      },
      {
        h: 'Scale drawings',
        why: 'A scale such as 1:50 means one unit on the drawing stands for 50 units in reality. Lengths are multiplied or divided by the scale, while angles do not change.',
        paras: [
          'A scale gives the relationship between a length on the drawing and the actual length. Write the scale as a ratio or in words, and use it both ways: to find the real length from a drawn length, and to find the drawn length from a real one.',
          'Angles on a scale drawing are the same as the real angles. Only lengths change.',
        ],
        examples: [
          'a scale of 1 cm to 2 m. A wall 6 m long is drawn as 3 cm. A 5 cm line on the drawing represents 10 m.',
        ],
      },
      {
        h: 'Three-figure bearings',
        why: 'A bearing is measured clockwise from north, and three figures make every direction unambiguous, so 045 and 45 cannot be confused. The angle is taken from the north line at the starting point.',
        paras: [
          'A bearing is measured clockwise from north, and written with three figures from 000° to 360°. Always draw the north line at the point where the bearing is measured from, and measure the angle clockwise from it.',
          'The bearing of A from B is the bearing of B from A plus or minus 180°, because the two directions are opposite. Add 180° if the result is less than 180°, and subtract 180° otherwise.',
        ],
        examples: [
          'if the bearing of B from A is 025°, the bearing of A from B is 025° + 180° = 205°.',
          'point D is due east of point C if the bearing of D from C is 090°.',
        ],
      },
      {
        h: 'Loci',
        why: 'A locus is the set of all points that satisfy a rule. Drawing it shows where those points lie, which is why the construction is the answer rather than a calculation.',
        paras: [
          'A locus question asks for the set of points that satisfy a rule, drawn as a line or a region. Before you revise the constructions for loci in depth, check the current Cambridge 0580 specification for which constructions are examinable, because the syllabus wording changes between years.',
        ],
      },
    ],
    exam: [
      'Show all construction arcs and leave your compass marks visible.',
      'Draw bearings from north, and always write three figures.',
      'Write the scale as a ratio or in words, and use it both ways when converting lengths.',
    ],
  },
  {
    file: 'igcse-number-arithmetic-and-place-value',
    eyebrow: 'Cambridge IGCSE Mathematics 0580, Number',
    title: 'Number: arithmetic and place value',
    syllabus: 'Cambridge IGCSE Mathematics 0580, Number: types of number, ordering, the four operations, estimation, limits of accuracy, calculator use, time and money.',
    sections: [
      {
        h: 'Types of number',
        why: 'Each number type follows from a definition: primes have exactly two factors, and square numbers are whole numbers multiplied by themselves. Recognising the type tells you which method applies.',
        paras: [
          'Know and use natural numbers, integers, prime numbers, square and cube numbers, common factors and multiples, rational and irrational numbers, and reciprocals. A rational number can be written as a fraction of two integers, and an irrational number cannot, for example π or √2.',
          'Write a number as a product of prime factors, then use them to find the highest common factor (HCF) and lowest common multiple (LCM). The HCF takes the lowest power of each shared prime, and the LCM takes the highest power of every prime that appears.',
        ],
        examples: [
          '72 = 2³ × 3² and 84 = 2² × 3 × 7. So HCF = 2² × 3 = 12 and LCM = 2³ × 3² × 7 = 504. Check: 72 × 84 = 6048, and 12 × 504 = 6048.',
        ],
      },
      {
        h: 'Ordering and place value',
        why: 'Place value gives each digit a value by its position, so the digits of 10007 mean ten thousand plus seven. Comparing numbers starts from the leading digit.',
        paras: [
          'Order quantities using the symbols =, ≠, >, <, ≥ and ≤. To compare two numbers, look first at the number of digits before the decimal point, then at the leading digit, and move right only if the digits are equal.',
          'Convert between numbers and words: 10007 is ten thousand and seven. A zero in the middle of a number still holds a place, so 10007 has no hundreds and no tens.',
        ],
      },
      {
        h: 'The four operations',
        why: 'Order of operations (BIDMAS) fixes the result of a calculation with several steps. Fractions and negative numbers follow the same rules, with extra care for signs.',
        paras: [
          'Use the four operations with integers, fractions and decimals, including negative numbers and improper or mixed fractions. Follow the order of operations: brackets first, then powers, multiplication and division, then addition and subtraction.',
          'Multiplying or dividing two negative numbers gives a positive result, while one negative and one positive gives a negative result. Keep track of the sign at each step.',
        ],
        examples: [
          '3 + 4 × (2 − 5) = 3 + 4 × (−3) = 3 − 12 = −9.',
        ],
      },
      {
        h: 'Estimation',
        why: 'Rounding each number to one significant figure gives a quick estimate that shows whether a full calculation is reasonable. It checks for a misplaced decimal point or a wrong key press.',
        paras: [
          'Round to a given number of decimal places or significant figures. Estimate by rounding each number to one significant figure. Round answers to a reasonable degree of accuracy in the context of the problem.',
          'Do not round within a calculation, because each rounding adds error. Round only the final answer, and keep the full value on the calculator while working.',
        ],
        examples: [
          '9.79 × 0.765 ≈ 10 × 0.8 = 8. The exact value is 7.49, so the estimate is a sensible check.',
        ],
      },
      {
        h: 'Limits of accuracy',
        why: 'A value rounded to a given accuracy lies within half a unit either side. The lower bound is included and the upper bound is not, so the true value can be anywhere in that interval.',
        paras: [
          'A value rounded to a given accuracy lies between a lower bound and an upper bound. The lower bound is included, and the upper bound is not. To find the bounds, subtract and add half of the accuracy unit.',
        ],
        examples: [
          'a length of 12 m, measured to the nearest metre, has bounds 11.5 m ≤ length < 12.5 m.',
        ],
      },
      {
        h: 'Using a calculator',
        why: 'On a calculator, the decimal point position matters: 4.8 in money means $4.80, and 3.25 hours means three hours and fifteen minutes, not three hours and twenty-five minutes. Reading the context prevents that error.',
        paras: [
          'Enter values carefully. In money, 4.8 means $4.80. In time, 3.25 hours means 3 hours 15 minutes, and 2 hours 30 minutes is entered as 2.5 hours. Read the display carefully, and use the memory or brackets to keep full accuracy through a multi-step calculation.',
        ],
      },
      {
        h: 'Time',
        why: 'The 24-hour clock removes the need for a.m. and p.m., so each time has one form. Times are added in hours and minutes, carrying 60 minutes into the hour.',
        paras: [
          'Use the 24-hour clock, where 3.15 a.m. is written 0315 and 3.15 p.m. is written 1515. Read clocks and timetables, and work out time differences across time zones. When adding times, carry 60 minutes into the hour, so 1 h 45 min + 1 h 30 min = 3 h 15 min.',
        ],
      },
      {
        h: 'Money',
        why: 'Money questions use the exchange rate by multiplying or dividing, depending on the direction. Checking the answer is sensible because a foreign amount usually comes out larger or smaller than the original by the rate.',
        paras: [
          'Calculate with money and convert between currencies using a given exchange rate. Multiply when converting into the other currency if the rate is given in that direction, and divide when the rate is given the other way round. Check that the size of the answer is sensible.',
        ],
      },
    ],
    exam: [
      'Write out the order of operations before calculating when a question has more than one step.',
      'For limits of accuracy, write both bounds with inequality signs.',
      'State the units when converting time or money.',
    ],
  },
  {
    file: 'igcse-number-fractions-decimals-and-percentages',
    eyebrow: 'Cambridge IGCSE Mathematics 0580, Number',
    title: 'Fractions, decimals and percentages',
    syllabus: 'Cambridge IGCSE Mathematics 0580, Number: fractions, decimals and percentages, percentages, and exponential growth and decay (Extended).',
    sections: [
      {
        h: 'Converting between fractions, decimals and percentages',
        why: 'The fraction, decimal and percentage are three forms of one number. A fraction becomes a decimal by division, and a percentage is that decimal times 100 because percent means out of one hundred.',
        paras: [
          'The three forms describe the same number. Learn the route: fraction to decimal by dividing the numerator by the denominator; decimal to percentage by multiplying by 100; percentage to fraction by writing it over 100 and simplifying.',
          'Recurring decimals need care: 1/3 = 0.333…, written 0.3̇. A fraction in lowest terms gives a terminating decimal only when its denominator has prime factors 2 and 5 alone.',
        ],
        examples: [
          '3/8 = 3 ÷ 8 = 0.375 = 37.5%.',
          '0.07 = 7/100 = 7%.',
          '65% = 65/100 = 13/20.',
        ],
      },
      {
        h: 'Fractions of amounts',
        why: 'Dividing by the denominator finds one equal share, and multiplying by the numerator takes the required number of shares. Dividing by the numerator instead would give the wrong size of share.',
        paras: [
          'To find a fraction of an amount, divide by the denominator and multiply by the numerator. Do not divide by the numerator first unless it simplifies the working.',
        ],
        examples: [
          '3/5 of 240 = 240 ÷ 5 × 3 = 48 × 3 = 144.',
        ],
      },
      {
        h: 'Adding, subtracting, multiplying and dividing fractions',
        why: 'A mixed number holds whole parts, so converting it to an improper fraction lets the ordinary multiplication and division rules apply. Dividing is the same as multiplying by the reciprocal.',
        paras: [
          'Add or subtract by writing both fractions over a common denominator. Multiply by multiplying the numerators and the denominators, then simplify. Divide by multiplying by the reciprocal of the second fraction.',
          'Convert mixed numbers to improper fractions before multiplying or dividing, and convert back if the question asks for a mixed number.',
        ],
        examples: [
          'add: 2/3 + 5/8 = 16/24 + 15/24 = 31/24 = 1 7/24.',
          'multiply: 2/3 × 9/10 = 18/30 = 3/5.',
          'divide: 3/4 ÷ 2/5 = 3/4 × 5/2 = 15/8 = 1 7/8.',
        ],
      },
      {
        h: 'Percentage change',
        why: 'Percentage change is measured against the original value, so that value is the divisor. The sign of the result shows whether the quantity went up or down.',
        paras: [
          'Percentage change = (new value − original value) ÷ original value × 100. A positive result is an increase and a negative result is a decrease.',
          'A multiplier gives the new value directly. An increase of 15% is multiplied by 1.15; a decrease of 15% is multiplied by 0.85.',
        ],
        formulas: ['percentage change = (new − original) ÷ original × 100'],
        examples: [
          'a price rises from 80 to 92. Change = (92 − 80) ÷ 80 × 100 = 15%.',
        ],
      },
      {
        h: 'Reverse percentages',
        why: 'The new value equals the original times a multiplier, so working back divides by the multiplier. Dividing by the percentage instead is a common error.',
        paras: [
          'When the new value is known, divide by the multiplier, not by the percentage. Working back from a price after a 20% increase divides by 1.2, not by 0.2 or subtracts 20%.',
        ],
        examples: [
          'working back from a price of 96 after a 20% increase: 96 ÷ 1.2 = 80, so the original price was 80. Subtracting 20% from 96 gives 76.8, which is wrong.',
        ],
      },
      {
        h: 'Repeated percentage change',
        why: 'Each change applies to the value left by the previous one, so the multipliers multiply. A 10% fall followed by a 10% rise gives 0.9 × 1.1 = 0.99, not the original value.',
        paras: [
          'Successive percentage changes multiply. The overall change is not the sum of the separate percentages, so a 10% fall followed by a 10% rise does not return to the start.',
        ],
        examples: [
          'a 10% decrease followed by a 10% increase: 100 × 0.9 × 1.1 = 99, not 100.',
        ],
      },
      {
        h: 'Compound growth and decay (Extended)',
        why: 'A fixed percentage growth multiplies the amount by the same factor each period, so after n periods the factor is raised to the power n. This is why compound growth is exponential, not linear.',
        paras: [
          'An amount growing by a fixed percentage each period uses the formula: final amount = original × (multiplier) to the power of the number of periods.',
          'For decay, use a multiplier below 1. A car losing 15% of its value each year is multiplied by 0.85 each year.',
        ],
        formulas: ['final amount = original × multiplier^(number of periods)'],
        examples: [
          '£5000 invested at 3% per year compound interest for 4 years: 5000 × 1.03⁴ = 5000 × 1.1255 ≈ £5627.54.',
        ],
      },
    ],
    exam: [
      'When the question asks for an exact answer, keep it as a fraction and simplify fully.',
      'Do not confuse finding 15% of 80 (0.15 × 80 = 12) with the reverse calculation.',
      'Check every percentage answer by reversing the calculation.',
    ],
  },
];
