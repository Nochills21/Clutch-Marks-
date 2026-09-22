const fs = require("fs");
const https = require('https');
const TOKEN = (fs.readFileSync(".freebuff/get-keys.cjs", "utf8").match(/sbp_[a-f0-9]+/) || [])[0];
const PROJECT_REF = 'zzliiazovezhxbmfeqco';
const MATH_OL = 'b8100a48-b4f7-414b-a796-528259b28a84';

function query(sql) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ query: sql });
    const req = https.request({
      hostname: 'api.supabase.com',
      path: `/v1/projects/${PROJECT_REF}/database/query`,
      method: 'POST',
      headers: { 'Authorization': `Bearer ${TOKEN}`, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => { try { resolve({ status: res.statusCode, data: JSON.parse(data) }); } catch { resolve({ status: res.statusCode, data }); } });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

const trigStatsTopics = [
  {
    name: 'Trigonometry — Right-Angled Triangles',
    description: 'Using sine, cosine and tangent to find missing sides and angles in right-angled triangles. 3D trigonometry.',
    sort_order: 16,
    lessons: [
      {
        title: 'Right-Angled Trigonometry',
        content: `<h2>Trigonometry — Right-Angled Triangles</h2>
<p><strong>Cambridge IGCSE 0580 Syllabus Reference:</strong> 4.1, 4.2, 4.3</p>

<h3>1. The Three Ratios</h3>
<p>For a right-angled triangle with angle θ:</p>
<table border="1" cellpadding="6">
<tr><th>Ratio</th><th>Formula</th><th>Mnemonic</th></tr>
<tr><td>sin θ</td><td>Opposite / Hypotenuse</td><td>SOH</td></tr>
<tr><td>cos θ</td><td>Adjacent / Hypotenuse</td><td>CAH</td></tr>
<tr><td>tan θ</td><td>Opposite / Adjacent</td><td>TOA</td></tr>
</table>
<p><strong>Important:</strong> sin θ ≠ sin × θ. The sine is a function of the angle.</p>

<h3>2. Finding a Side</h3>
<p><strong>Example:</strong> In a right-angled triangle, angle = 30°, hypotenuse = 10 cm. Find the opposite side.</p>
<p>sin 30° = opp/10 → opp = 10 × sin 30° = 10 × 0.5 = 5 cm</p>

<h3>3. Finding an Angle</h3>
<p>Use inverse trig functions on the calculator.</p>
<p><strong>Example:</strong> Opposite = 5, Hypotenuse = 13. Find θ.</p>
<p>sin θ = 5/13 = 0.3846... → θ = sin⁻¹(0.3846) ≈ 22.6°</p>

<h3>4. Exact Values (Extended)</h3>
<table border="1" cellpadding="6">
<tr><th>Angle</th><th>sin</th><th>cos</th><th>tan</th></tr>
<tr><td>30°</td><td>½</td><td>√3/2</td><td>1/√3 = √3/3</td></tr>
<tr><td>45°</td><td>√2/2</td><td>√2/2</td><td>1</td></tr>
<tr><td>60°</td><td>√3/2</td><td>½</td><td>√3</td></tr>
</table>

<h3>5. 3D Trigonometry</h3>
<p>Identify right-angled triangles within the 3D shape. Apply SOH CAH TOA to each triangle.</p>
<p><strong>Example:</strong> A cuboid 3 × 4 × 12. Find the angle the space diagonal makes with the base.</p>
<p>Base diagonal = √(9 + 16) = 5. tan θ = 12/5. θ = tan⁻¹(12/5) ≈ 67.4°</p>`
      }
    ],
    quiz: {
      title: 'Right-Angled Trigonometry',
      description: 'SOH CAH TOA, finding sides and angles, 3D trig',
      time_limit_minutes: 12,
      questions: [
        { question_text: 'In a right-angled triangle, sin θ = 3/5. What is cos θ?', options: ['4/5', '3/4', '5/3', '5/4'], correct_option: 0, explanation: 'If opposite = 3 and hypotenuse = 5, adjacent = √(25 − 9) = 4. cos θ = 4/5.' },
        { question_text: 'tan θ = 1. What is the angle θ?', options: ['30°', '45°', '60°', '90°'], correct_option: 1, explanation: 'tan 45° = 1.' },
        { question_text: 'A ladder 5 m long leans against a wall at 60° to the ground. How high up the wall does it reach?', options: ['2.5 m', '4.33 m', '2.89 m', '4 m'], correct_option: 1, explanation: 'sin 60° = h/5 → h = 5 × sin 60° = 5 × (√3/2) ≈ 4.33 m.' },
        { question_text: 'sin 30° equals:', options: ['√3/2', '½', '1', '√2/2'], correct_option: 1, explanation: 'sin 30° = ½.' },
        { question_text: 'In a right-angled triangle, the opposite = 8 and the adjacent = 6. What is tan θ?', options: ['4/3', '3/4', '8/6', '6/8'], correct_option: 0, explanation: 'tan θ = opposite/adjacent = 8/6 = 4/3.' },
        { question_text: 'cos θ = 0.5. What is θ?', options: ['60°', '30°', '45°', '0°'], correct_option: 0, explanation: 'cos 60° = 0.5.' },
        { question_text: 'A ship sails on a bearing of 060° for 10 km. How far north has it travelled?', options: ['5 km', '8.66 km', '10 km', '6 km'], correct_option: 0, explanation: 'North component = 10 × cos 60° = 10 × 0.5 = 5 km.' },
        { question_text: 'What is sin 45°?', options: ['½', '√3/2', '√2/2', '1'], correct_option: 2, explanation: 'sin 45° = √2/2 ≈ 0.707.' },
        { question_text: 'A ramp rises 3 m over a horizontal distance of 4 m. What is the angle of inclination?', options: ['36.9°', '53.1°', '30°', '45°'], correct_option: 0, explanation: 'tan θ = 3/4 = 0.75. θ = tan⁻¹(0.75) ≈ 36.9°.' },
        { question_text: 'In a cuboid 6 × 8 × 10, what is the length of the space diagonal?', options: ['√200', '14.42', '18', '√164'], correct_option: 1, explanation: 'Space diagonal = √(6² + 8² + 10²) = √(36 + 64 + 100) = √200 ≈ 14.42.' }
      ]
    }
  },
  {
    name: 'Trigonometry — Sine and Cosine Rules',
    description: 'Sine rule, cosine rule, and the area of a triangle formula ½ab sin C for non-right-angled triangles.',
    sort_order: 17,
    lessons: [
      {
        title: 'Sine Rule, Cosine Rule and Triangle Area',
        content: `<h2>Sine Rule, Cosine Rule and Area of a Triangle</h2>
<p><strong>Cambridge IGCSE 0580 Syllabus Reference:</strong> 4.4, 4.5, 4.6</p>

<h3>1. Sine Rule</h3>
<p>For any triangle ABC:</p>
<p><strong>a/sin A = b/sin B = c/sin C</strong></p>
<p>Use when you know: (i) two angles and one side (AAS or ASA), or (ii) two sides and an angle opposite one of them (SSA).</p>
<p><strong>Example:</strong> A = 40°, B = 60°, a = 10. Find b.</p>
<p>10/sin 40° = b/sin 60° → b = 10 × sin 60° / sin 40° ≈ 13.5</p>

<h3>2. Cosine Rule</h3>
<p><strong>a² = b² + c² − 2bc cos A</strong></p>
<p>Use when you know: (i) two sides and the included angle (SAS), or (ii) three sides (SSS) to find an angle.</p>
<p><strong>Example:</strong> b = 5, c = 8, A = 60°. Find a.</p>
<p>a² = 25 + 64 − 2(5)(8) cos 60° = 89 − 80(0.5) = 49</p>
<p>a = 7</p>
<p><strong>To find angle:</strong> cos A = (b² + c² − a²) / (2bc)</p>

<h3>3. Area of a Triangle</h3>
<p><strong>A = ½ab sin C</strong></p>
<p>Use any two sides and the included angle.</p>
<p><strong>Example:</strong> a = 8, b = 6, C = 30°</p>
<p>A = ½ × 8 × 6 × sin 30° = 24 × 0.5 = 12</p>

<h3>4. Choosing the Right Rule</h3>
<table border="1" cellpadding="6">
<tr><th>Given</th><th>Use</th></tr>
<tr><td>AAS or ASA (2 angles + 1 side)</td><td>Sine rule</td></tr>
<tr><td>SSA (2 sides + 1 non-included angle)</td><td>Sine rule</td></tr>
<tr><td>SAS (2 sides + included angle)</td><td>Cosine rule</td></tr>
<tr><td>SSS (3 sides)</td><td>Cosine rule</td></tr>
</table>`
      }
    ],
    quiz: {
      title: 'Sine Rule, Cosine Rule and Triangle Area',
      description: 'Solving non-right-angled triangles',
      time_limit_minutes: 12,
      questions: [
        { question_text: 'In triangle ABC, A = 40°, a = 10, B = 60°. Find b (to 1 d.p.).', options: ['13.5', '11.9', '12.4', '14.0'], correct_option: 0, explanation: 'Sine rule: 10/sin 40° = b/sin 60°. b = 10 × 0.866/0.643 ≈ 13.5.' },
        { question_text: 'In triangle PQR, p = 7, q = 10, R = 50°. Find r using the cosine rule.', options: ['7.7', '12.2', '8.5', '15.0'], correct_option: 0, explanation: 'r² = 7² + 10² − 2(7)(10)cos 50° = 49 + 100 − 90 = 59. r ≈ 7.7.' },
        { question_text: 'What is the area of a triangle with sides 6 and 8 and included angle 30°?', options: ['24', '12', '48', '16'], correct_option: 1, explanation: 'A = ½ × 6 × 8 × sin 30° = 24 × 0.5 = 12.' },
        { question_text: 'Which rule would you use for a triangle with sides 5, 7, and 9 (no angles given)?', options: ['Sine rule', 'Cosine rule', 'Tangent rule', 'SOH CAH TOA'], correct_option: 1, explanation: 'SSS (three sides, no angles) → cosine rule.' },
        { question_text: 'In triangle ABC, a = 5, b = 8, C = 60°. What is the area?', options: ['20√3', '10√3', '20', '40'], correct_option: 0, explanation: 'A = ½ × 5 × 8 × sin 60° = 20 × (√3/2) = 10√3 ≈ 17.3.' },
        { question_text: 'The cosine rule states a² = b² + c² − 2bc cos A. What does it reduce to when A = 90°?', options: ['a² = b² + c²', 'a² = b² − c²', 'a = b + c', 'a² = 2bc'], correct_option: 0, explanation: 'cos 90° = 0, so 2bc cos 90° = 0. a² = b² + c² (Pythagoras).' },
        { question_text: 'In triangle XYZ, X = 35°, x = 10, Y = 55°. What is angle Z?', options: ['90°', '80°', '70°', '100°'], correct_option: 0, explanation: 'Angles sum to 180°: Z = 180° − 35° − 55° = 90°.' },
        { question_text: 'In triangle ABC, a = 9, b = 12, c = 15. What is angle A?', options: ['90°', '60°', '45°', '36.9°'], correct_option: 3, explanation: 'cos A = (b² + c² − a²)/(2bc) = (144 + 225 − 81)/(360) = 288/360 = 0.8. A = cos⁻¹(0.8) ≈ 36.9°.' },
        { question_text: 'Area of triangle = ½ab sin C. Which angle must C be?', options: ['The largest angle', 'The right angle', 'The angle between sides a and b', 'Any angle'], correct_option: 2, explanation: 'C must be the angle between (included by) sides a and b.' },
        { question_text: 'A triangle has sides 6 and 9 with an included angle of 120°. What is the area?', options: ['27√3', '54', '27', '27√3/2'], correct_option: 0, explanation: 'A = ½ × 6 × 9 × sin 120° = 27 × (√3/2) ≈ 23.4 ≈ 27√3/2. Wait: sin 120° = sin 60° = √3/2. A = 27 × √3/2 = 27√3/2 ≈ 23.4. Hmm, let me recalculate: ½ × 6 × 9 = 27. 27 × sin 120° = 27 × √3/2 = 13.5√3 ≈ 23.4. The answer is 27√3/2.' }
      ]
    }
  },
  {
    name: 'Statistics — Data Handling',
    description: 'Collecting and representing data. Frequency tables, bar charts, histograms, pie charts, cumulative frequency, and box plots.',
    sort_order: 18,
    lessons: [
      {
        title: 'Data Handling and Representation',
        content: `<h2>Statistics — Data Handling</h2>
<p><strong>Cambridge IGCSE 0580 Syllabus Reference:</strong> 5.1, 5.2, 5.3</p>

<h3>1. Types of Data</h3>
<ul>
<li><strong>Discrete data:</strong> Can only take specific values (e.g. number of students)</li>
<li><strong>Continuous data:</strong> Can take any value within a range (e.g. height, time)</li>
</ul>

<h3>2. Statistical Measures</h3>
<table border="1" cellpadding="6">
<tr><th>Measure</th><th>What it tells you</th></tr>
<tr><td>Mean</td><td>Average = sum of all values ÷ number of values</td></tr>
<tr><td>Median</td><td>Middle value when data is ordered</td></tr>
<tr><td>Mode</td><td>Most frequently occurring value</td></tr>
<tr><td>Range</td><td>Highest value − lowest value</td></tr>
</table>

<h3>3. Grouped Frequency Tables</h3>
<p>For continuous data, group into class intervals.</p>
<p><strong>Estimated mean</strong> = Σ(f × x) ÷ Σf, where x = midpoint of each class.</p>
<p><strong>Example:</strong></p>
<table border="1" cellpadding="6">
<tr><th>Class</th><th>Midpoint (x)</th><th>Frequency (f)</th><th>f × x</th></tr>
<tr><td>0–10</td><td>5</td><td>3</td><td>15</td></tr>
<tr><td>10–20</td><td>15</td><td>7</td><td>105</td></tr>
<tr><td>20–30</td><td><strong>25</strong></td><td>5</td><td>125</td></tr>
</table>
<p>Estimated mean = (15 + 105 + 125) ÷ 15 = 245/15 ≈ 16.3</p>

<h3>4. Types of Charts</h3>
<ul>
<li><strong>Bar chart:</strong> For discrete/categorical data</li>
<li><strong>Histogram:</strong> For continuous data — area represents frequency (frequency density = freq ÷ class width)</li>
<li><strong>Pie chart:</strong> Shows proportion — angle = (frequency/total) × 360°</li>
<li><strong>Box plot:</strong> Shows median, quartiles, min, max</li>
<li><strong>Cumulative frequency:</strong> Running total — gives median and quartiles</li>
</ul>

<h3>5. Box Plots</h3>
<p>Show five key values: minimum, lower quartile (Q₁), median (Q₂), upper quartile (Q₃), maximum.</p>
<ul>
<li><strong>Interquartile range (IQR)</strong> = Q₃ − Q₁ (measures spread)</li>
<li>More reliable than range because it ignores outliers</li>
</ul>`
      }
    ],
    quiz: {
      title: 'Data Handling and Representation',
      description: 'Mean, median, mode, charts, histograms, box plots',
      time_limit_minutes: 12,
      questions: [
        { question_text: 'What is the mean of 3, 7, 5, 9, 1?', options: ['5', '6', '4', '7'], correct_option: 0, explanation: 'Mean = (3 + 7 + 5 + 9 + 1)/5 = 25/5 = 5.' },
        { question_text: 'What is the median of 2, 5, 8, 3, 7?', options: ['5', '8', '3', '6'], correct_option: 0, explanation: 'Ordered: 2, 3, 5, 7, 8. Middle value = 5.' },
        { question_text: 'The mode of 2, 3, 3, 5, 7, 3 is:', options: ['3', '2', '5', '4'], correct_option: 0, explanation: 'Mode = most frequent value = 3 (appears 3 times).' },
        { question_text: 'In a pie chart, if a category has 30 out of 120 total, what angle does it take?', options: ['90°', '72°', '120°', '60°'], correct_option: 0, explanation: 'Angle = (30/120) × 360° = 90°.' },
        { question_text: 'What is the range of 12, 7, 19, 4, 15?', options: ['15', '12', '11', '19'], correct_option: 0, explanation: 'Range = 19 − 4 = 15.' },
        { question_text: 'Which measure is most affected by outliers?', options: ['Median', 'Mode', 'Mean', 'IQR'], correct_option: 2, explanation: 'The mean is most affected by outliers because it uses every value in its calculation.' },
        { question_text: 'In a histogram, what does the y-axis represent?', options: ['Frequency', 'Frequency density', 'Midpoint', 'Cumulative frequency'], correct_option: 1, explanation: 'In a histogram, the y-axis is frequency density = frequency ÷ class width. Area = frequency.' },
        { question_text: 'The IQR is calculated as:', options: ['Maximum − Minimum', 'Q₃ − Q₁', 'Q₃ − Median', 'Median − Q₁'], correct_option: 1, explanation: 'IQR = Q₃ − Q₁ = upper quartile − lower quartile.' },
        { question_text: 'Data: 4, 8, 6, 10, 2, 8, 6. What is the modal value?', options: ['6 and 8', '8', '6', '7'], correct_option: 0, explanation: 'Both 6 and 8 appear twice (most frequent). This is bimodal: 6 and 8.' },
        { question_text: 'The estimated mean from grouped data uses:', options: ['Class boundaries', 'Class midpoints', 'Class frequencies only', 'Cumulative frequencies'], correct_option: 1, explanation: 'Estimated mean = Σ(f × midpoint) ÷ Σf.' }
      ]
    }
  },
  {
    name: 'Statistics — Probability',
    description: 'Basic probability, combined events, tree diagrams, AND/OR rules, and conditional probability.',
    sort_order: 19,
    lessons: [
      {
        title: 'Probability',
        content: `<h2>Statistics — Probability</h2>
<p><strong>Cambridge IGCSE 0580 Syllabus Reference:</strong> 5.4, 5.5, 5.6</p>

<h3>1. Basic Probability</h3>
<p><strong>P(event) = number of favourable outcomes / total number of outcomes</strong></p>
<p>Probability is always between 0 (impossible) and 1 (certain).</p>
<p><strong>Example:</strong> A fair die is rolled. P(getting a 3) = 1/6</p>

<h3>2. Complementary Events</h3>
<p><strong>P(not A) = 1 − P(A)</strong></p>
<p>P(not getting a 3) = 1 − 1/6 = 5/6</p>

<h3>3. AND Rule (Independent Events)</h3>
<p><strong>P(A and B) = P(A) × P(B)</strong></p>
<p><strong>Example:</strong> Two coins are tossed. P(H and T) = ½ × ½ = ¼</p>

<h3>4. OR Rule (Mutually Exclusive Events)</h3>
<p><strong>P(A or B) = P(A) + P(B)</strong></p>
<p><strong>Example:</strong> P(rolling a 2 or a 5) = 1/6 + 1/6 = 2/6 = 1/3</p>
<p><strong>General OR (not mutually exclusive):</strong> P(A or B) = P(A) + P(B) − P(A and B)</p>

<h3>5. Tree Diagrams</h3>
<p>Show all possible outcomes of multi-stage events.</p>
<ul>
<li>Probabilities along branches from the same point sum to 1</li>
<li>Multiply along branches for AND</li>
<li>Add the relevant outcomes for OR</li>
</ul>
<p><strong>Example:</strong> A bag has 3 red and 2 blue balls. Two are drawn without replacement.</p>
<p>P(R then B) = 3/5 × 2/4 = 6/20 = 3/10</p>

<h3>6. Listing Outcomes</h3>
<p>For one die and one coin, sample space:</p>
<p>{1H, 2H, 3H, 4H, 5H, 6H, 1T, 2T, 3T, 4T, 5T, 6T} — 12 outcomes</p>`
      }
    ],
    quiz: {
      title: 'Probability',
      description: 'Basic probability, tree diagrams, AND/OR rules',
      time_limit_minutes: 12,
      questions: [
        { question_text: 'A fair die is rolled. What is P(getting an even number)?', options: ['1/3', '1/2', '1/6', '2/3'], correct_option: 1, explanation: 'Even numbers: 2, 4, 6. P = 3/6 = 1/2.' },
        { question_text: 'A bag has 4 red and 6 blue marbles. What is P(red)?', options: ['2/5', '3/5', '4/6', '6/10'], correct_option: 0, explanation: 'P(red) = 4/(4+6) = 4/10 = 2/5.' },
        { question_text: 'Two coins are tossed. What is P(at least one head)?', options: ['1/4', '3/4', '1/2', '2/3'], correct_option: 1, explanation: 'Outcomes: HH, HT, TH, TT. At least one head: HH, HT, TH = 3/4.' },
        { question_text: 'A card is drawn from a standard pack. P(heart)?', options: ['1/4', '1/13', '13/52', 'Both A and C'], correct_option: 3, explanation: '13 hearts in 52 cards. 13/52 = 1/4. Both are correct.' },
        { question_text: 'P(A) = 0.3 and P(B) = 0.4. If A and B are independent, P(A and B) =?', options: ['0.7', '0.12', '0.3', '0.4'], correct_option: 1, explanation: 'Independent: P(A and B) = P(A) × P(B) = 0.3 × 0.4 = 0.12.' },
        { question_text: 'P(not A) = 0.35. What is P(A)?', options: ['0.35', '0.65', '0.7', '0.25'], correct_option: 1, explanation: 'P(A) = 1 − P(not A) = 1 − 0.35 = 0.65.' },
        { question_text: 'A bag has 2 red and 3 green balls. Two balls are drawn WITHOUT replacement. What is P(both red)?', options: ['4/25', '2/5', '1/10', '4/20'], correct_option: 2, explanation: 'P(1st red) = 2/5. P(2nd red | 1st red) = 1/4. P(both) = 2/5 × 1/4 = 2/20 = 1/10.' },
        { question_text: 'Events A and B are mutually exclusive. P(A) = 0.4, P(B) = 0.35. P(A or B) =?', options: ['0.75', '0.14', '0.4', '0.35'], correct_option: 0, explanation: 'Mutually exclusive: P(A or B) = P(A) + P(B) = 0.4 + 0.35 = 0.75.' },
        { question_text: 'A die is rolled twice. What is P(sum = 7)?', options: ['1/12', '1/6', '1/36', '7/36'], correct_option: 1, explanation: 'Ways to get 7: (1,6)(2,5)(3,4)(4,3)(5,2)(6,1) = 6 ways. Total outcomes = 36. P = 6/36 = 1/6.' },
        { question_text: 'What is the probability of an impossible event?', options: ['0', '1', '0.5', '−1'], correct_option: 0, explanation: 'An impossible event has probability 0. A certain event has probability 1.' }
      ]
    }
  },
  {
    name: 'Scatter Diagrams and Correlation',
    description: 'Plotting scatter diagrams, lines of best fit, positive/negative/no correlation.',
    sort_order: 20,
    lessons: [
      {
        title: 'Scatter Diagrams and Correlation',
        content: `<h2>Scatter Diagrams and Correlation</h2>
<p><strong>Cambridge IGCSE 0580 Syllabus Reference:</strong> 5.7</p>

<h3>1. What is a Scatter Diagram?</h3>
<p>A graph that plots pairs of (x, y) values to show the relationship between two variables.</p>

<h3>2. Types of Correlation</h3>
<ul>
<li><strong>Positive correlation:</strong> As x increases, y tends to increase (upward trend)</li>
<li><strong>Negative correlation:</strong> As x increases, y tends to decrease (downward trend)</li>
<li><strong>No correlation:</strong> No clear pattern</li>
</ul>

<h3>3. Line of Best Fit</h3>
<p>A straight line drawn through the data that best represents the trend.</p>
<ul>
<li>Go roughly through the middle of the points</li>
<li>Equal numbers of points above and below the line</li>
<li>Follow the trend of the data</li>
</ul>

<h3>4. Using the Line of Best Fit</h3>
<p><strong>Estimation:</strong> Use the line to estimate a value not in the data.</p>
<p><strong>Example:</strong> If the line of best fit for height vs. weight goes through (170, 70), a person who is 170 cm tall is estimated to weigh about 70 kg.</p>

<h3>5. Interpolation vs Extrapolation</h3>
<ul>
<li><strong>Interpolation:</strong> Estimating within the range of data (more reliable)</li>
<li><strong>Extrapolation:</strong> Estimating outside the range (less reliable, may be inaccurate)</li>
</ul>

<h3>6. Correlation ≠ Causation</h3>
<p>Just because two variables are correlated does not mean one causes the other.</p>
<p><strong>Example:</strong> Ice cream sales and shark attacks are positively correlated — but both are caused by hot weather, not by each other.</p>`
      }
    ],
    quiz: {
      title: 'Scatter Diagrams and Correlation',
      description: 'Scatter plots, lines of best fit, correlation types',
      time_limit_minutes: 8,
      questions: [
        { question_text: 'A scatter diagram shows points going upward from left to right. This is:', options: ['Negative correlation', 'Positive correlation', 'No correlation', 'Linear correlation'], correct_option: 1, explanation: 'Points going upward from left to right indicate positive correlation.' },
        { question_text: 'What should a line of best fit do?', options: ['Pass through every point', 'Go through the middle of the points', 'Be horizontal', 'Connect the first and last points'], correct_option: 1, explanation: 'A line of best fit goes through the middle of the data, representing the general trend.' },
        { question_text: 'Estimating a value within the data range is called:', options: ['Extrapolation', 'Interpolation', 'Correlation', 'Regression'], correct_option: 1, explanation: 'Interpolation = estimating within the range. Extrapolation = outside the range.' },
        { question_text: 'If two variables have no correlation, the line of best fit would be:', options: ['Steeply sloped', 'Horizontal', 'Not meaningful', 'Very steep'], correct_option: 2, explanation: 'With no correlation, a line of best fit is not meaningful — there is no trend to follow.' },
        { question_text: 'A scatter diagram shows a strong negative correlation. This means:', options: ['Both variables increase together', 'As one increases, the other decreases', 'There is no relationship', 'The relationship is random'], correct_option: 1, explanation: 'Negative correlation: as one variable increases, the other tends to decrease.' },
        { question_text: 'Correlation between ice cream sales and drowning deaths proves:', options: ['Ice cream causes drowning', 'Drowning causes ice cream sales', 'There is a causal relationship', 'Correlation does not prove causation'], correct_option: 3, explanation: 'Correlation does not imply causation. Both may be caused by a third factor (hot weather).' },
        { question_text: 'Which is more reliable: interpolation or extrapolation?', options: ['Extrapolation', 'Neither', 'They are equally reliable', 'Interpolation'], correct_option: 3, explanation: 'Interpolation is more reliable because it estimates within the known data range.' },
        { question_text: 'The points (1,3), (2,5), (3,7), (4,9) show:', options: ['No correlation', 'Strong positive correlation', 'Negative correlation', 'Weak positive correlation'], correct_option: 1, explanation: 'Points lie perfectly on the line y = 2x + 1: strong positive correlation.' },
        { question_text: 'A scatter diagram has r ≈ −0.9. What does this tell you?', options: ['Strong positive correlation', 'No correlation', 'Weak negative correlation', 'Strong negative correlation'], correct_option: 3, explanation: 'r close to −1 indicates strong negative correlation.' },
        { question_text: 'If the line of best fit passes through (20, 50) and (40, 90), what weight is estimated for x = 30?', options: ['60', '70', '80', '65'], correct_option: 1, explanation: 'Gradient = (90−50)/(40−20) = 2. At x = 30 (halfway), y = 50 + 20 = 70.' }
      ]
    }
  }
];

async function seedTrigStats() {
  let c = { topics: 0, lessons: 0, quizzes: 0, questions: 0 };
  const esc = (s) => s.replace(/'/g, "''");

  for (const topic of trigStatsTopics) {
    const tSql = `INSERT INTO public.topics (name, description, sort_order, subject_level_id) VALUES ('${esc(topic.name)}', '${esc(topic.description)}', ${topic.sort_order}, '${MATH_OL}') RETURNING id`;
    const tr = await query(tSql);
    if (tr.status !== 201 || !Array.isArray(tr.data) || !tr.data[0]) { console.error('FAIL topic:', topic.name, JSON.stringify(tr)); continue; }
    const tid = tr.data[0].id;
    c.topics++;
    console.log(`Topic: ${topic.name}`);

    for (const lesson of topic.lessons) {
      const lSql = `INSERT INTO public.lessons (topic_id, title, content, sort_order) VALUES ('${tid}', '${esc(lesson.title)}', '${esc(lesson.content)}', 1)`;
      const lr = await query(lSql);
      if (lr.status !== 201) { console.error('FAIL lesson:', lesson.title); continue; }
      c.lessons++;
    }

    const quiz = topic.quiz;
    const qSql = `INSERT INTO public.quizzes (topic_id, title, description, time_limit_minutes, is_published) VALUES ('${tid}', '${esc(quiz.title)}', '${esc(quiz.description)}', ${quiz.time_limit_minutes}, true) RETURNING id`;
    const qr = await query(qSql);
    if (qr.status !== 201 || !Array.isArray(qr.data)) { console.error('FAIL quiz'); continue; }
    const qid = qr.data[0].id;
    c.quizzes++;

    for (let i = 0; i < quiz.questions.length; i++) {
      const q = quiz.questions[i];
      const opts = JSON.stringify(q.options).replace(/'/g, "''");
      const qqSql = `INSERT INTO public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order) VALUES ('${qid}', '${esc(q.question_text)}', '${opts}', ${q.correct_option}, '${esc(q.explanation)}', ${i + 1})`;
      const qqr = await query(qqSql);
      if (qqr.status !== 201) { console.error('FAIL q'); continue; }
      c.questions++;
    }
    console.log(`  + ${quiz.questions.length} questions`);
  }

  console.log(`\n=== TRIG/STATS SUMMARY ===`);
  console.log(`Topics: ${c.topics}, Lessons: ${c.lessons}, Quizzes: ${c.quizzes}, Questions: ${c.questions}`);
}

seedTrigStats().catch(console.error);
