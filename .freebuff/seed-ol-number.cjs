const https = require('https');
const fs = require('fs');
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
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, data: JSON.parse(data) }); }
        catch { resolve({ status: res.statusCode, data }); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// ========== O LEVEL TOPICS ==========
const olTopics = [
  {
    name: 'Number — Arithmetic and Place Value',
    description: 'Whole number operations, ordering, rounding, significant figures, estimation, and the four operations with integers.',
    sort_order: 1,
    lessons: [
      {
        title: 'Arithmetic, Place Value and Estimation',
        content: `<h2>Number — Arithmetic and Place Value</h2>
<p><strong>Cambridge IGCSE 0580 Syllabus Reference:</strong> 1.1, 1.2, 1.3</p>

<h3>1. Place Value and Ordering</h3>
<p>Each digit in a number has a <strong>place value</strong>. For example, in the number 47,382:</p>
<table border="1" cellpadding="6"><tr><th>4</th><th>7</th><th>3</th><th>8</th><th>2</th></tr><tr><td>10 000s</td><td>1000s</td><td>100s</td><td>10s</td><td>Units</td></tr></table>
<p>We write numbers in <strong>standard form</strong> (scientific notation) as a × 10ⁿ where 1 ≤ a < 10 and n is an integer.</p>
<ul>
<li>47 382 = 4.7382 × 10⁴</li>
<li>0.0056 = 5.6 × 10⁻³</li>
</ul>

<h3>2. Operations with Whole Numbers</h3>
<p><strong>Order of operations (BIDMAS/BODMAS):</strong></p>
<ol>
<li><strong>B</strong>rackets</li>
<li><strong>I</strong>ndices (powers/roots)</li>
<li><strong>D</strong>ivision and <strong>M</strong>ultiplication (left to right)</li>
<li><strong>A</strong>ddition and <strong>S</strong>ubtraction (left to right)</li>
</ol>
<p><strong>Example:</strong> 3 + 4 × 2² = 3 + 4 × 4 = 3 + 16 = 19 (NOT 56!)</p>

<h3>3. Rounding and Estimation</h3>
<ul>
<li><strong>To n significant figures:</strong> Look at the (n+1)th digit. If ≥ 5, round up; if < 5, round down.</li>
<li><strong>To n decimal places:</strong> Look at the (n+1)th decimal place. Apply the same rule.</li>
<li><strong>Estimation:</strong> Round each number to 1 significant figure, then calculate.</li>
</ul>
<p><strong>Example:</strong> Estimate 47.8 × 3.2 → round to 50 × 3 = 150</p>

<h3>4. Negative Numbers</h3>
<p>On a number line, numbers to the left of zero are negative.</p>
<ul>
<li>(−3) + (−5) = −8</li>
<li>(−3) − (−5) = −3 + 5 = 2</li>
<li>(−3) × (−5) = 15 (negative × negative = positive)</li>
<li>(−3) × 5 = −15 (negative × positive = negative)</li>
</ul>

<h3>5. Upper and Lower Bounds</h3>
<p>When a number is rounded, the <strong>upper bound</strong> is the largest possible value and the <strong>lower bound</strong> is the smallest.</p>
<p><strong>Example:</strong> If x = 3.4 rounded to 1 d.p., then 3.35 ≤ x < 3.45</p>
<ul>
<li>Lower bound = 3.35</li>
<li>Upper bound = 3.45 (but not equal to 3.45)</li>
</ul>
<p>For calculations with bounds, use the worst case: to find the upper bound of a sum, add the upper bounds. To find the lower bound of a product of positive numbers, multiply the lower bounds.</p>

<h3>Key Formulae</h3>
<ul>
<li>Standard form: a × 10ⁿ where 1 ≤ a < 10</li>
<li>Average estimation: round each value to 1 s.f. before calculating</li>
</ul>`
      }
    ],
    quiz: {
      title: 'Number — Arithmetic and Place Value',
      description: 'Test your knowledge of arithmetic, place value, rounding, and estimation',
      time_limit_minutes: 10,
      questions: [
        { question_text: 'What is 47,382 written in standard form?', options: ['47.382 × 10³', '4.7382 × 10⁴', '0.47382 × 10⁵', '4738.2 × 10¹'], correct_option: 1, explanation: 'Move the decimal point 4 places to the left: 4.7382. So 47,382 = 4.7382 × 10⁴.' },
        { question_text: 'Calculate 3 + 4 × 2²', options: ['56', '19', '64', '11'], correct_option: 1, explanation: 'BIDMAS: Indices first → 2² = 4. Then multiply → 4 × 4 = 16. Then add → 3 + 16 = 19.' },
        { question_text: 'What is 0.0056 in standard form?', options: ['5.6 × 10²', '5.6 × 10⁻²', '5.6 × 10⁻³', '0.56 × 10⁻²'], correct_option: 2, explanation: 'Move the decimal 3 places to the right: 5.6. So 0.0056 = 5.6 × 10⁻³.' },
        { question_text: 'Round 47.83 to 3 significant figures.', options: ['47.8', '47.9', '48.0', '47.83'], correct_option: 0, explanation: 'The 4th significant figure is 3, which is less than 5, so we round down: 47.8.' },
        { question_text: 'Estimate 47.8 × 3.21', options: ['150', '160', '153', '155'], correct_option: 1, explanation: 'Round to 1 s.f.: 47.8 ≈ 50 and 3.21 ≈ 3. So 50 × 3 = 150. However, 3.21 is closer to 3. A better estimate rounds to 50 × 3 = 150. The answer 150 is closest. But 50 × 3 = 150, and the actual answer is ≈153. 150 is the best 1 s.f. estimate.' },
        { question_text: 'What is (−3) + (−7)?', options: ['4', '10', '−10', '−4'], correct_option: 2, explanation: 'Adding two negative numbers: (−3) + (−7) = −10.' },
        { question_text: 'What is (−4) × (−6)?', options: ['−24', '24', '−10', '10'], correct_option: 1, explanation: 'Negative × negative = positive. So (−4) × (−6) = 24.' },
        { question_text: 'A number x is rounded to 1 decimal place and gives 5.3. What is the lower bound of x?', options: ['5.25', '5.30', '5.35', '5.20'], correct_option: 0, explanation: 'When rounding to 1 d.p., the lower bound is halfway between: 5.25.' },
        { question_text: 'Calculate (2 + 3)² × 4', options: ['100', '68', '52', '20'], correct_option: 0, explanation: 'Brackets first: (2+3) = 5. Indices: 5² = 25. Then multiply: 25 × 4 = 100.' },
        { question_text: 'Write 3 400 000 in standard form.', options: ['34 × 10⁵', '3.4 × 10⁶', '0.34 × 10⁷', '3.4 × 10⁷'], correct_option: 1, explanation: 'Move decimal 6 places left: 3.4. So 3 400 000 = 3.4 × 10⁶.' }
      ]
    }
  },
  {
    name: 'Number — Fractions, Decimals and Percentages',
    description: 'Converting between fractions, decimals and percentages. Adding, subtracting, multiplying and dividing fractions. Percentage increase/decrease.',
    sort_order: 2,
    lessons: [
      {
        title: 'Fractions, Decimals and Percentages',
        content: `<h2>Fractions, Decimals and Percentages</h2>
<p><strong>Cambridge IGCSE 0580 Syllabus Reference:</strong> 1.4, 1.5, 1.6</p>

<h3>1. Converting Between Forms</h3>
<table border="1" cellpadding="6">
<tr><th>Fraction → Decimal</th><th>Decimal → Fraction</th><th>Fraction → Percentage</th></tr>
<tr><td>Divide numerator by denominator</td><td>Write as fraction over power of 10, simplify</td><td>Divide, multiply by 100</td></tr>
</table>
<p><strong>Key conversions:</strong></p>
<ul>
<li>½ = 0.5 = 50%</li>
<li>¼ = 0.25 = 25%</li>
<li>¾ = 0.75 = 75%</li>
<li>⅓ = 0.333... = 33⅓%</li>
<li>⅕ = 0.2 = 20%</li>
</ul>

<h3>2. Operations with Fractions</h3>
<p><strong>Addition/Subtraction:</strong> Make denominators the same (find LCD), then add/subtract numerators.</p>
<p>¾ + ⅔ = 9/12 + 8/12 = 17/12 = 1 5/12</p>
<p><strong>Multiplication:</strong> Multiply numerators, multiply denominators, simplify.</p>
<p>⅔ × ¾ = 6/12 = ½</p>
<p><strong>Division:</strong> Multiply by the reciprocal (flip the second fraction).</p>
<p>⅔ ÷ ¾ = ⅔ × ¾⁻¹ = ⅔ × 4/3 = 8/9</p>

<h3>3. Mixed Numbers and Improper Fractions</h3>
<ul>
<li>Mixed → Improper: 2 ¾ = (2 × 3 + 4)/3 = 10/3</li>
<li>Improper → Mixed: 17/5 = 3 ⅖</li>
</ul>

<h3>4. Percentage Problems</h3>
<p><strong>Finding a percentage of an amount:</strong></p>
<p>Find 35% of £240: 35/100 × 240 = £84</p>
<p><strong>Percentage increase/decrease:</strong></p>
<p>Formula: (change / original) × 100%</p>
<p><strong>Example:</strong> Price goes from £80 to £96. Increase = (96−80)/80 × 100% = 20%</p>

<h3>5. Reverse Percentage</h3>
<p><strong>Example:</strong> After a 20% discount, a shirt costs £48. What was the original price?</p>
<p>If discount is 20%, the sale price is 80% of the original.</p>
<p>80% of x = 48 → x = 48 ÷ 0.80 = £60</p>

<h3>6. Repeated Percentage Change</h3>
<p><strong>Compound decrease:</strong> A car worth £12 000 depreciates by 15% per year. After 2 years:</p>
<p>£12 000 × (0.85)² = £12 000 × 0.7225 = £8 670</p>
<p>General formula: Final = Original × (multiplier)ⁿ</p>`
      }
    ],
    quiz: {
      title: 'Fractions, Decimals and Percentages',
      description: 'Converting, operating, and solving with fractions, decimals and percentages',
      time_limit_minutes: 12,
      questions: [
        { question_text: 'What is ¾ + ⅔ as a mixed number?', options: ['1 5/12', '1 ¼', '1 ⅚', '2 ⅙'], correct_option: 0, explanation: 'LCD = 12. 9/12 + 8/12 = 17/12 = 1 5/12.' },
        { question_text: 'What is ⅔ × ¾?', options: ['12/6', '½', '5/6', '6/12'], correct_option: 1, explanation: '⅔ × ¾ = 6/12 = ½.' },
        { question_text: 'What is ⅔ ÷ ⅖?', options: ['15/6', '4/15', '5/3', '4/6'], correct_option: 2, explanation: '⅔ ÷ ⅖ = ⅔ × 5/2 = 10/6 = 5/3.' },
        { question_text: 'Convert 7/8 to a percentage.', options: ['78%', '87.5%', '75%', '80%'], correct_option: 1, explanation: '7/8 = 0.875 = 87.5%.' },
        { question_text: 'Find 35% of £240.', options: ['£72', '£84', '£96', '£35'], correct_option: 1, explanation: '35/100 × 240 = 0.35 × 240 = £84.' },
        { question_text: 'A shirt costs £80 and is reduced by 25%. What is the sale price?', options: ['£20', '£55', '£60', '£75'], correct_option: 2, explanation: '25% of £80 = £20. Sale price = £80 − £20 = £60. Or: 75% of £80 = £60.' },
        { question_text: 'A price increases from £50 to £60. What is the percentage increase?', options: ['10%', '20%', '50%', '83%'], correct_option: 1, explanation: 'Change = £10. Percentage = (10/50) × 100% = 20%.' },
        { question_text: 'After a 10% discount, a jacket costs £63. What was the original price?', options: ['£56.70', '£69.30', '£70', '£73'], correct_option: 2, explanation: '£63 is 90% of the original. Original = £63 ÷ 0.90 = £70.' },
        { question_text: 'What is 3 ½ as an improper fraction?', options: ['7/2', '8/3', '3/2', '6/2'], correct_option: 0, explanation: '3 ½ = (3 × 2 + 1)/2 = 7/2.' },
        { question_text: 'A car worth £10 000 depreciates by 20% each year. What is its value after 1 year?', options: ['£8 000', '£9 000', '£7 500', '£8 500'], correct_option: 0, explanation: '20% of £10 000 = £2 000. Value = £10 000 − £2 000 = £8 000. Or: 80% of £10 000 = £8 000.' }
      ]
    }
  },
  {
    name: 'Number — Ratio, Rate and Proportion',
    description: 'Ratio notation, simplifying ratios, sharing in a given ratio, direct and inverse proportion.',
    sort_order: 3,
    lessons: [
      {
        title: 'Ratio, Rate and Proportion',
        content: `<h2>Ratio, Rate and Proportion</h2>
<p><strong>Cambridge IGCSE 0580 Syllabus Reference:</strong> 1.7, 1.8, 1.9</p>

<h3>1. Ratio Basics</h3>
<p>A <strong>ratio</strong> compares two or more quantities of the same type.</p>
<ul>
<li>Simplify by dividing all parts by the highest common factor (HCF).</li>
<li>12 : 18 = 2 : 3 (divide both by 6)</li>
<li>Ratios can include different units — convert first: £3 : 45p = 300p : 45p = 20 : 3</li>
</ul>

<h3>2. Sharing in a Ratio</h3>
<p><strong>Example:</strong> Share £120 in the ratio 2 : 3.</p>
<ol>
<li>Total parts = 2 + 3 = 5</li>
<li>One part = £120 ÷ 5 = £24</li>
<li>First share = 2 × £24 = £48</li>
<li>Second share = 3 × £24 = £72</li>
</ol>
<p><strong>Check:</strong> £48 + £72 = £120 ✓</p>

<h3>3. Unitary Method</h3>
<p>Find the value of ONE unit first, then multiply.</p>
<p><strong>Example:</strong> 5 notebooks cost £3.75. Find the cost of 8 notebooks.</p>
<p>1 notebook = £3.75 ÷ 5 = £0.75</p>
<p>8 notebooks = 8 × £0.75 = £6.00</p>

<h3>4. Direct Proportion</h3>
<p>Two quantities are in <strong>direct proportion</strong> when the ratio y/x is constant.</p>
<p>If y = kx, then y₁/x₁ = y₂/x₂</p>
<p><strong>Example:</strong> 3 shirts cost £45. How much do 7 shirts cost?</p>
<p>£45/3 = £15 per shirt. So 7 shirts = £105</p>

<h3>5. Inverse Proportion</h3>
<p>Two quantities are in <strong>inverse proportion</strong> when xy = constant.</p>
<p>If x increases, y decreases by the same factor.</p>
<p><strong>Example:</strong> 6 workers take 10 days to complete a job. How long would 15 workers take?</p>
<p>Workers × Days = constant: 6 × 10 = 60</p>
<p>15 workers: 60 ÷ 15 = 4 days</p>

<h3>6. Speed, Distance, Time</h3>
<p><strong>Formula:</strong> Speed = Distance ÷ Time</p>
<p><strong>Speed converter:</strong> 72 km/h = 72 000 m ÷ 3600 s = 20 m/s</p>
<p><strong>Example:</strong> A car travels 150 km in 2 hours. Speed = 150 ÷ 2 = 75 km/h</p>`
      }
    ],
    quiz: {
      title: 'Ratio, Rate and Proportion',
      description: 'Ratios, sharing, direct and inverse proportion, speed/distance/time',
      time_limit_minutes: 10,
      questions: [
        { question_text: 'Simplify the ratio 18 : 24.', options: ['3 : 4', '6 : 8', '9 : 12', '2 : 3'], correct_option: 0, explanation: 'HCF of 18 and 24 is 6. 18÷6 : 24÷6 = 3 : 4.' },
        { question_text: 'Share £140 in the ratio 3 : 4.', options: ['£60 and £80', '£40 and £100', '£50 and £90', '£70 and £70'], correct_option: 0, explanation: 'Total parts = 7. One part = £20. 3 parts = £60, 4 parts = £80.' },
        { question_text: 'If 4 notebooks cost £2.80, what do 10 notebooks cost?', options: ['£5.00', '£7.00', '£6.50', '£8.40'], correct_option: 1, explanation: '1 notebook = £0.70. 10 notebooks = £7.00.' },
        { question_text: 'y is directly proportional to x. When x = 5, y = 20. Find y when x = 8.', options: ['30', '32', '25', '35'], correct_option: 1, explanation: 'k = y/x = 20/5 = 4. So y = 4x. When x = 8, y = 32.' },
        { question_text: 'y is inversely proportional to x. When x = 3, y = 12. Find y when x = 4.', options: ['9', '16', '8', '15'], correct_option: 0, explanation: 'xy = constant = 3 × 12 = 36. When x = 4, y = 36/4 = 9.' },
        { question_text: 'A car travels 240 km in 3 hours. What is its speed in km/h?', options: ['60', '80', '70', '720'], correct_option: 1, explanation: 'Speed = Distance ÷ Time = 240 ÷ 3 = 80 km/h.' },
        { question_text: 'Convert 72 km/h to m/s.', options: ['20 m/s', '25 m/s', '36 m/s', '18 m/s'], correct_option: 0, explanation: '72 km/h = 72 000 m ÷ 3600 s = 20 m/s.' },
        { question_text: '5 painters take 12 days to paint a house. How long would 15 painters take?', options: ['4 days', '36 days', '6 days', '3 days'], correct_option: 0, explanation: 'Inverse proportion: 5 × 12 = 60. 15 painters: 60 ÷ 15 = 4 days.' },
        { question_text: '£3.60 is shared in the ratio 1 : 2. How much does the larger share get?', options: ['£2.40', '£1.20', '£1.80', '£3.00'], correct_option: 0, explanation: 'Total parts = 3. One part = £1.20. Larger share = 2 × £1.20 = £2.40.' },
        { question_text: 'What is 60p : £4.20 in its simplest form?', options: ['1 : 7', '6 : 42', '2 : 14', '60 : 420'], correct_option: 0, explanation: '£4.20 = 420p. 60 : 420 = 1 : 7.' }
      ]
    }
  },
  {
    name: 'Number — Indices and Standard Form',
    description: 'Laws of indices (powers), zero and negative indices, fractional indices, and standard form calculations.',
    sort_order: 4,
    lessons: [
      {
        title: 'Indices and Standard Form',
        content: `<h2>Indices (Powers) and Standard Form</h2>
<p><strong>Cambridge IGCSE 0580 Syllabus Reference:</strong> 1.10, 1.11, 1.12</p>

<h3>1. Laws of Indices</h3>
<table border="1" cellpadding="8">
<tr><th>Law</th><th>Rule</th><th>Example</th></tr>
<tr><td>Multiplication</td><td>aᵐ × aⁿ = aᵐ⁺ⁿ</td><td>x³ × x⁵ = x⁸</td></tr>
<tr><td>Division</td><td>aᵐ ÷ aⁿ = aᵐ⁻ⁿ</td><td>y⁷ ÷ y⁴ = y³</td></tr>
<tr><td>Power of a power</td><td>(aᵐ)ⁿ = aᵐⁿ</td><td>(a³)⁴ = a¹²</td></tr>
<tr><td>Power of a product</td><td>(ab)ⁿ = aⁿbⁿ</td><td>(2x)³ = 8x³</td></tr>
<tr><td>Power of a fraction</td><td>(a/b)ⁿ = aⁿ/bⁿ</td><td>(⅔)² = 4/9</td></tr>
</table>

<h3>2. Special Indices</h3>
<ul>
<li><strong>Zero index:</strong> a⁰ = 1 (any non-zero number to the power 0 is 1)</li>
<li><strong>Negative index:</strong> a⁻ⁿ = 1/aⁿ (move to denominator)</li>
<li><strong>Fractional index:</strong> a^(1/n) = ⁿ√a (the nth root)</li>
<li><strong>Combined:</strong> a^(m/n) = (ⁿ√a)ᵐ</li>
</ul>
<p><strong>Examples:</strong></p>
<ul>
<li>5⁰ = 1</li>
<li>2⁻³ = 1/2³ = 1/8</li>
<li>9^(1/2) = √9 = 3</li>
<li>8^(2/3) = (³√8)² = 2² = 4</li>
<li>27^(4/3) = (³√27)⁴ = 3⁴ = 81</li>
</ul>

<h3>3. Standard Form Calculations</h3>
<p><strong>Multiplying:</strong> (a × 10ᵐ) × (b × 10ⁿ) = (a × b) × 10ᵐ⁺ⁿ</p>
<p><strong>Example:</strong> (3 × 10⁴) × (4 × 10⁻²) = 12 × 10² = 1.2 × 10³</p>
<p><strong>Dividing:</strong> (a × 10ᵐ) ÷ (b × 10ⁿ) = (a ÷ b) × 10ᵐ⁻ⁿ</p>
<p><strong>Example:</strong> (6 × 10⁸) ÷ (3 × 10³) = 2 × 10⁵</p>
<p><strong>Adding/Subtracting:</strong> Convert to the same power of 10 first.</p>
<p><strong>Example:</strong> (3 × 10⁴) + (5 × 10³) = (30 × 10³) + (5 × 10³) = 35 × 10³ = 3.5 × 10⁴</p>`
      }
    ],
    quiz: {
      title: 'Indices and Standard Form',
      description: 'Laws of indices, zero/negative/fractional powers, and standard form calculations',
      time_limit_minutes: 12,
      questions: [
        { question_text: 'Simplify x³ × x⁵.', options: ['x⁸', 'x¹⁵', 'x²', 'x³⁵'], correct_option: 0, explanation: 'Add the powers: 3 + 5 = 8. So x³ × x⁵ = x⁸.' },
        { question_text: 'Simplify y⁷ ÷ y².', options: ['y⁵', 'y⁹', 'y³·⁵', 'y¹⁴'], correct_option: 0, explanation: 'Subtract the powers: 7 − 2 = 5. So y⁷ ÷ y² = y⁵.' },
        { question_text: 'What is (a³)⁴?', options: ['a⁷', 'a⁸¹', 'a¹²', 'a⁶⁴'], correct_option: 2, explanation: 'Multiply the powers: 3 × 4 = 12. So (a³)⁴ = a¹².' },
        { question_text: 'What is 5⁰?', options: ['0', '1', '5', 'Undefined'], correct_option: 1, explanation: 'Any non-zero number to the power 0 equals 1.' },
        { question_text: 'What is 2⁻⁴?', options: ['−16', '1/16', '−8', '1/8'], correct_option: 1, explanation: '2⁻⁴ = 1/2⁴ = 1/16.' },
        { question_text: 'What is 16^(3/4)?', options: ['8', '48', '64', '12'], correct_option: 0, explanation: '16^(3/4) = (⁴√16)³ = 2³ = 8.' },
        { question_text: 'Calculate (2 × 10³) × (3 × 10⁴).', options: ['6 × 10⁷', '6 × 10¹²', '5 × 10⁷', '60 × 10⁷'], correct_option: 0, explanation: 'Multiply: 2 × 3 = 6. Add powers: 3 + 4 = 7. Answer: 6 × 10⁷.' },
        { question_text: 'What is 25^(1/2)?', options: ['12.5', '5', '625', '2'], correct_option: 1, explanation: '25^(1/2) = √25 = 5.' },
        { question_text: 'Simplify (3x)².', options: ['3x²', '9x²', '6x', '9x'], correct_option: 1, explanation: '(3x)² = 3² × x² = 9x².' },
        { question_text: 'Calculate (4 × 10⁶) ÷ (2 × 10²).', options: ['2 × 10⁴', '2 × 10³', '20 × 10⁴', '2 × 10⁸'], correct_option: 0, explanation: 'Divide: 4/2 = 2. Subtract powers: 6 − 2 = 4. Answer: 2 × 10⁴.' }
      ]
    }
  },
  {
    name: 'Number — Sets',
    description: 'Set notation, Venn diagrams, intersection, union, complement, subsets, and the number system.',
    sort_order: 5,
    lessons: [
      {
        title: 'Sets and Venn Diagrams',
        content: `<h2>Sets and Venn Diagrams</h2>
<p><strong>Cambridge IGCSE 0580 Syllabus Reference:</strong> 1.13, 1.14, 1.15</p>

<h3>1. Set Notation</h3>
<table border="1" cellpadding="6">
<tr><th>Symbol</th><th>Meaning</th><th>Example</th></tr>
<tr><td>{ }</td><td>A set (list of elements)</td><td>A = {1, 2, 3, 4, 5}</td></tr>
<tr><td>n(A)</td><td>Number of elements in A</td><td>n(A) = 5</td></tr>
<tr><td>∈</td><td>Is an element of</td><td>3 ∈ A</td></tr>
<tr><td>∉</td><td>Is NOT an element of</td><td>6 ∉ A</td></tr>
<tr><td>⊂</td><td>Is a subset of</td><td>{1, 2} ⊂ A</td></tr>
<tr><td>∪</td><td>Union (OR)</td><td>A ∪ B = elements in A OR B (or both)</td></tr>
<tr><td>∩</td><td>Intersection (AND)</td><td>A ∩ B = elements in BOTH A and B</td></tr>
<tr><td>A'</td><td>Complement (NOT)</td><td>A' = elements NOT in A</td></tr>
</table>

<h3>2. Universal Set and Complement</h3>
<p>The <strong>universal set</strong> (ξ or U) contains ALL elements under consideration.</p>
<p>A' (complement of A) = everything in U that is NOT in A.</p>
<p>If U = {1, 2, 3, 4, 5, 6} and A = {2, 4, 6}, then A' = {1, 3, 5}</p>

<h3>3. Union and Intersection</h3>
<p>If A = {1, 2, 3, 4} and B = {3, 4, 5, 6}:</p>
<ul>
<li>A ∪ B = {1, 2, 3, 4, 5, 6}</li>
<li>A ∩ B = {3, 4}</li>
</ul>

<h3>4. Venn Diagrams</h3>
<p>A visual way to show sets. Each set is a circle. Overlapping areas show elements in both sets.</p>
<p><strong>Key formula:</strong> n(A ∪ B) = n(A) + n(B) − n(A ∩ B)</p>
<p><strong>Example:</strong> In a class of 40 students: 25 study Physics, 20 study Chemistry, 8 study both.</p>
<ul>
<li>n(P ∪ C) = 25 + 20 − 8 = 37 study at least one</li>
<li>Neither = 40 − 37 = 3</li>
</ul>

<h3>5. Number System Sets</h3>
<p>ℕ = Natural numbers = {1, 2, 3, ...}<br>
ℤ = Integers = {..., −2, −1, 0, 1, 2, ...}<br>
ℚ = Rational numbers (fractions/terminating/repeating decimals)<br>
ℝ = Real numbers</p>`
      }
    ],
    quiz: {
      title: 'Sets and Venn Diagrams',
      description: 'Set notation, Venn diagrams, union, intersection, complement',
      time_limit_minutes: 10,
      questions: [
        { question_text: 'If A = {2, 4, 6, 8} and B = {4, 5, 6, 7}, what is A ∩ B?', options: ['{4, 6}', '{2, 4, 5, 6, 7, 8}', '{2, 8}', '{4, 5, 6, 7}'], correct_option: 0, explanation: 'A ∩ B contains elements in BOTH A and B: {4, 6}.' },
        { question_text: 'If A = {1, 2, 3} and B = {3, 4, 5}, what is A ∪ B?', options: ['{3}', '{1, 2, 3, 4, 5}', '{1, 2, 4, 5}', '{1, 2}'], correct_option: 1, explanation: 'A ∪ B contains elements in A OR B: {1, 2, 3, 4, 5}.' },
        { question_text: 'If U = {1, 2, 3, 4, 5} and A = {1, 3, 5}, what is A\'?', options: ['{1, 3, 5}', '{2, 4}', '{1, 2, 3, 4, 5}', '{}'], correct_option: 1, explanation: 'A\' contains elements in U but NOT in A: {2, 4}.' },
        { question_text: 'n(A) = 15, n(B) = 12, n(A ∩ B) = 4. What is n(A ∪ B)?', options: ['31', '27', '23', '19'], correct_option: 2, explanation: 'n(A ∪ B) = n(A) + n(B) − n(A ∩ B) = 15 + 12 − 4 = 23.' },
        { question_text: 'Which symbol means "is a subset of"?', options: ['∪', '∈', '⊂', '∩'], correct_option: 2, explanation: '⊂ means "is a subset of" — every element of one set is in another.' },
        { question_text: 'If A = {1, 2, 3, 4}, which of the following is a subset of A?', options: ['{1, 2, 5}', '{1, 3, 4}', '{1, 2, 3, 4, 5}', '{5}'], correct_option: 1, explanation: '{1, 3, 4} ⊂ A because every element of {1, 3, 4} is in A.' },
        { question_text: 'In a survey of 50 people, 30 like tea and 25 like coffee. 15 like both. How many like neither?', options: ['10', '5', '15', '20'], correct_option: 0, explanation: 'n(T ∪ C) = 30 + 25 − 15 = 40. Neither = 50 − 40 = 10.' },
        { question_text: 'What does n(A\'∩ B) represent?', options: ['Elements in both A and B', 'Elements NOT in A but in B', 'Elements in A or B', 'Elements in neither A nor B'], correct_option: 1, explanation: 'A\'∩ B = elements NOT in A AND in B.' },
        { question_text: 'If ξ = {1, 2, ..., 10} and A = {2, 3, 5, 7}, what is n(A\')?', options: ['4', '6', '10', '8'], correct_option: 1, explanation: 'A\' = {1, 4, 6, 8, 9, 10}. n(A\') = 6.' },
        { question_text: 'What is 3.14 classified as?', options: ['Natural number', 'Integer', 'Rational number', 'Irrational number'], correct_option: 2, explanation: '3.14 = 314/100 is a rational number (can be expressed as a fraction).' }
      ]
    }
  }
];

async function seedTopics() {
  let topicsCreated = 0;
  let lessonsCreated = 0;
  let quizzesCreated = 0;
  let questionsCreated = 0;

  for (const topic of olTopics) {
    // Insert topic
    const topicSql = `INSERT INTO public.topics (name, description, sort_order, subject_level_id) VALUES ('${topic.name.replace(/'/g, "''")}', '${topic.description.replace(/'/g, "''")}', ${topic.sort_order}, '${MATH_OL}') RETURNING id`;
    const topicResult = await query(topicSql);
    if (topicResult.status !== 201 || !Array.isArray(topicResult.data) || !topicResult.data[0]) {
      console.error('FAILED topic:', topic.name, JSON.stringify(topicResult));
      continue;
    }
    const topicId = topicResult.data[0].id;
    topicsCreated++;
    console.log(`Created topic: ${topic.name} (${topicId})`);

    // Insert lesson
    for (const lesson of topic.lessons) {
      const lessonSql = `INSERT INTO public.lessons (topic_id, title, content, sort_order) VALUES ('${topicId}', '${lesson.title.replace(/'/g, "''")}', '${lesson.content.replace(/'/g, "''")}', 1) RETURNING id`;
      const lessonResult = await query(lessonSql);
      if (lessonResult.status !== 201 || !Array.isArray(lessonResult.data)) {
        console.error('FAILED lesson:', lesson.title, JSON.stringify(lessonResult));
        continue;
      }
      lessonsCreated++;
      console.log(`  Created lesson: ${lesson.title}`);
    }

    // Insert quiz
    const quiz = topic.quiz;
    const quizSql = `INSERT INTO public.quizzes (topic_id, title, description, time_limit_minutes, is_published) VALUES ('${topicId}', '${quiz.title.replace(/'/g, "''")}', '${quiz.description.replace(/'/g, "''")}', ${quiz.time_limit_minutes}, true) RETURNING id`;
    const quizResult = await query(quizSql);
    if (quizResult.status !== 201 || !Array.isArray(quizResult.data)) {
      console.error('FAILED quiz:', quiz.title, JSON.stringify(quizResult));
      continue;
    }
    const quizId = quizResult.data[0].id;
    quizzesCreated++;
    console.log(`  Created quiz: ${quiz.title}`);

    // Insert questions
    for (let i = 0; i < quiz.questions.length; i++) {
      const q = quiz.questions[i];
      const optionsJson = JSON.stringify(q.options).replace(/'/g, "''");
      const qSql = `INSERT INTO public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order) VALUES ('${quizId}', '${q.question_text.replace(/'/g, "''")}', '${optionsJson}', ${q.correct_option}, '${q.explanation.replace(/'/g, "''")}', ${i + 1})`;
      const qResult = await query(qSql);
      if (qResult.status !== 201) {
        console.error('FAILED question:', q.question_text.substring(0, 40), JSON.stringify(qResult));
        continue;
      }
      questionsCreated++;
    }
    console.log(`  Created ${quiz.questions.length} questions`);
  }

  console.log(`\n=== SUMMARY ===`);
  console.log(`Topics: ${topicsCreated}`);
  console.log(`Lessons: ${lessonsCreated}`);
  console.log(`Quizzes: ${quizzesCreated}`);
  console.log(`Questions: ${questionsCreated}`);
}

seedTopics().catch(console.error);
