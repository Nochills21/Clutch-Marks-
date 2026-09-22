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

const algebraTopics = [
  {
    name: 'Algebra — Simplifying and Expanding',
    description: 'Simplifying algebraic expressions, collecting like terms, expanding brackets, and factorising.',
    sort_order: 6,
    lessons: [
      {
        title: 'Simplifying, Expanding and Factorising',
        content: `<h2>Algebra — Simplifying, Expanding and Factorising</h2>
<p><strong>Cambridge IGCSE 0580 Syllabus Reference:</strong> 2.1, 2.2, 2.3</p>

<h3>1. Simplifying Expressions</h3>
<p><strong>Collect like terms:</strong> Group terms with the same variable and power.</p>
<p>3x + 5x = 8x &nbsp;&nbsp;|&nbsp;&nbsp; 2x² + 3x − x² + 5 = x² + 3x + 5</p>
<p><strong>Multiply/divide coefficients:</strong></p>
<p>2x × 3x² = 6x³ &nbsp;&nbsp;|&nbsp;&nbsp; 12x³ ÷ 4x = 3x²</p>

<h3>2. Expanding Brackets</h3>
<p><strong>Single bracket:</strong> Multiply each term inside by the term outside.</p>
<p>3(x + 4) = 3x + 12</p>
<p>(2x − 5)(x + 3) = 2x² + 6x − 5x − 15 = 2x² + x − 15</p>

<p><strong>Square of a binomial — use the formula:</strong></p>
<ul>
<li>(a + b)² = a² + 2ab + b²</li>
<li>(a − b)² = a² − 2ab + b²</li>
</ul>
<p>(x + 3)² = x² + 6x + 9 &nbsp;&nbsp;|&nbsp;&nbsp; (2x − 1)² = 4x² − 4x + 1</p>

<p><strong>Difference of two squares:</strong></p>
<ul>
<li>(a + b)(a − b) = a² − b²</li>
</ul>
<p>(x + 4)(x − 4) = x² − 16</p>

<h3>3. Factorising</h3>
<p><strong>Common factor:</strong> 6x² + 9x = 3x(2x + 3)</p>
<p><strong>Quadratic trinomials:</strong> x² + 5x + 6 = (x + 2)(x + 3)</p>
<p>Find two numbers that multiply to give c and add to give b.</p>
<p><strong>General form:</strong> ax² + bx + c — look for factors of ac that add to b.</p>
<p>2x² + 7x + 3 = (2x + 1)(x + 3) — factors of 6 (2×3) that add to 7: 1 and 6</p>

<h3>4. Substitution</h3>
<p>Replace each variable with its given value.</p>
<p>If f(x) = 2x² − 3x + 1, find f(−2):</p>
<p>f(−2) = 2(−2)² − 3(−2) + 1 = 8 + 6 + 1 = 15</p>`
      }
    ],
    quiz: {
      title: 'Simplifying, Expanding and Factorising',
      description: 'Test your algebra skills',
      time_limit_minutes: 10,
      questions: [
        { question_text: 'Simplify 3x² + 5x − 2x² + 7x', options: ['5x² + 12x', 'x² + 12x', '5x² + 5x', 'x² + 2x'], correct_option: 1, explanation: 'Collect like terms: (3x² − 2x²) + (5x + 7x) = x² + 12x.' },
        { question_text: 'Expand 2(x − 3)', options: ['2x − 3', '2x − 6', '2x + 6', 'x − 6'], correct_option: 1, explanation: '2 × x = 2x, and 2 × (−3) = −6. So 2(x − 3) = 2x − 6.' },
        { question_text: 'Expand (x + 4)(x − 2)', options: ['x² + 2x − 8', 'x² − 2x + 8', 'x² + 6x − 8', 'x² + 2x + 8'], correct_option: 0, explanation: 'x² − 2x + 4x − 8 = x² + 2x − 8.' },
        { question_text: 'Factorise x² + 7x + 12', options: ['(x + 3)(x + 4)', '(x + 6)(x + 1)', '(x + 2)(x + 5)', '(x + 3)(x + 5)'], correct_option: 0, explanation: 'Need two numbers that multiply to 12 and add to 7: 3 and 4.' },
        { question_text: 'What is (x + 5)²?', options: ['x² + 25', 'x² + 10x + 25', 'x² + 5x + 25', '2x + 10'], correct_option: 1, explanation: '(x + 5)² = x² + 2(5)x + 5² = x² + 10x + 25.' },
        { question_text: 'Factorise 6x² + 11x + 3', options: ['(2x + 3)(3x + 1)', '(6x + 1)(x + 3)', '(3x + 2)(2x + 3)', '(6x + 3)(x + 1)'], correct_option: 0, explanation: 'ac = 18. Factors of 18 that add to 11: 9 and 2. Split middle term: 6x² + 9x + 2x + 3 = 3x(2x + 3) + 1(2x + 3) = (3x + 1)(2x + 3).' },
        { question_text: 'Simplify x³ × x⁴', options: ['x⁷', 'x¹²', 'x³⁴', '2x⁷'], correct_option: 0, explanation: 'Add the exponents: 3 + 4 = 7. So x³ × x⁴ = x⁷.' },
        { question_text: 'Expand (3x − 2)²', options: ['9x² − 4', '9x² − 12x + 4', '9x² + 12x + 4', '3x² − 12x + 4'], correct_option: 1, explanation: '(3x − 2)² = (3x)² − 2(3x)(2) + 2² = 9x² − 12x + 4.' },
        { question_text: 'Factorise x² − 9', options: ['(x − 3)(x − 3)', '(x + 3)(x − 3)', '(x − 9)(x + 1)', '(x + 9)(x − 1)'], correct_option: 1, explanation: 'Difference of two squares: a² − b² = (a + b)(a − b). So x² − 9 = (x + 3)(x − 3).' },
        { question_text: 'If f(x) = 3x² − 2x + 4, what is f(−1)?', options: ['9', '5', '7', '3'], correct_option: 0, explanation: 'f(−1) = 3(−1)² − 2(−1) + 4 = 3 + 2 + 4 = 9.' }
      ]
    }
  },
  {
    name: 'Algebra — Equations',
    description: 'Solving linear equations, simultaneous equations (substitution and elimination), and quadratic equations.',
    sort_order: 7,
    lessons: [
      {
        title: 'Solving Equations',
        content: `<h2>Algebra — Equations</h2>
<p><strong>Cambridge IGCSE 0580 Syllabus Reference:</strong> 2.4, 2.5, 2.6, 2.7</p>

<h3>1. Linear Equations</h3>
<p>Goal: Get x on its own. Do the same operation to both sides.</p>
<p><strong>Example:</strong> Solve 3x + 7 = 22</p>
<ol>
<li>3x + 7 = 22</li>
<li>3x = 22 − 7 = 15</li>
<li>x = 15 ÷ 3 = 5</li>
</ol>
<p><strong>With brackets:</strong> 2(x + 5) = 3(x − 1)</p>
<p>2x + 10 = 3x − 3 → 13 = x</p>

<h3>2. Simultaneous Equations</h3>
<p><strong>Method 1 — Substitution:</strong></p>
<p>x + y = 7 and x − y = 3</p>
<p>From eqn 1: x = 7 − y. Substitute into eqn 2: (7 − y) − y = 3 → 7 − 2y = 3 → y = 2, x = 5</p>

<p><strong>Method 2 — Elimination:</strong></p>
<p>2x + 3y = 12 and 4x − 3y = 0</p>
<p>Add both: 6x = 12 → x = 2. Then 3y = 12 − 4 = 8... substitute back: y = 8/3... Wait, 4(2) − 3y = 0 → 8 = 3y → y = 8/3.</p>
<p><strong>Check:</strong> 2(2) + 3(8/3) = 4 + 8 = 12 ✓</p>

<h3>3. Quadratic Equations</h3>
<p><strong>Standard form:</strong> ax² + bx + c = 0</p>

<p><strong>Method 1 — Factorising:</strong></p>
<p>x² + 5x + 6 = 0 → (x + 2)(x + 3) = 0 → x = −2 or x = −3</p>

<p><strong>Method 2 — Quadratic Formula:</strong></p>
<p>x = [−b ± √(b² − 4ac)] / 2a</p>
<p><strong>Example:</strong> 2x² + 3x − 5 = 0</p>
<p>x = [−3 ± √(9 + 40)] / 4 = [−3 ± √49] / 4 = [−3 ± 7] / 4</p>
<p>x = 4/4 = 1 &nbsp; or &nbsp; x = −10/4 = −2.5</p>

<h3>4. Discriminant</h3>
<p>Δ = b² − 4ac tells you the nature of roots:</p>
<ul>
<li>Δ > 0: Two distinct real roots</li>
<li>Δ = 0: One repeated root</li>
<li>Δ < 0: No real roots (two complex roots)</li>
</ul>`
      }
    ],
    quiz: {
      title: 'Solving Equations',
      description: 'Linear, simultaneous, and quadratic equations',
      time_limit_minutes: 15,
      questions: [
        { question_text: 'Solve 4x − 3 = 17', options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'], correct_option: 2, explanation: '4x = 20 → x = 5.' },
        { question_text: 'Solve 3(x + 2) = 2(x + 5)', options: ['x = 2', 'x = 3', 'x = 4', 'x = 6'], correct_option: 3, explanation: '3x + 6 = 2x + 10 → x = 4.' },
        { question_text: 'Solve x + y = 10 and x − y = 4 simultaneously.', options: ['x = 7, y = 3', 'x = 6, y = 4', 'x = 8, y = 2', 'x = 5, y = 5'], correct_option: 0, explanation: 'Add both: 2x = 14 → x = 7. Then y = 10 − 7 = 3.' },
        { question_text: 'Solve x² − 5x + 6 = 0', options: ['x = 1, x = 6', 'x = 2, x = 3', 'x = −2, x = −3', 'x = −1, x = −6'], correct_option: 1, explanation: '(x − 2)(x − 3) = 0 → x = 2 or x = 3.' },
        { question_text: 'What is the discriminant of x² − 4x + 4 = 0?', options: ['0', '8', '−8', '16'], correct_option: 0, explanation: 'Δ = b² − 4ac = (−4)² − 4(1)(4) = 16 − 16 = 0. One repeated root.' },
        { question_text: 'How many real roots does x² + 3x + 5 = 0 have?', options: ['Two', 'One', 'None', 'Three'], correct_option: 2, explanation: 'Δ = 9 − 20 = −11 < 0. No real roots.' },
        { question_text: 'Solve 2x + y = 5 and x − y = 1 simultaneously.', options: ['x = 2, y = 1', 'x = 1, y = 3', 'x = 3, y = −1', 'x = 2, y = 3'], correct_option: 0, explanation: 'Add both: 3x = 6 → x = 2. Then y = 5 − 4 = 1.' },
        { question_text: 'Solve x² − 9 = 0', options: ['x = 3 only', 'x = −3 only', 'x = 3 or x = −3', 'x = 9 or x = −9'], correct_option: 2, explanation: 'x² = 9 → x = ±3. Difference of two squares: (x + 3)(x − 3) = 0.' },
        { question_text: 'Use the quadratic formula on x² + 2x − 8 = 0. What is x?', options: ['x = 2, x = −4', 'x = −2, x = 4', 'x = 4, x = −4', 'x = 2, x = −2'], correct_option: 0, explanation: 'x = [−2 ± √(4 + 32)] / 2 = [−2 ± 6] / 2. x = 2 or x = −4.' },
        { question_text: 'Solve 5x − 7 = 3x + 9', options: ['x = 8', 'x = 4', 'x = −8', 'x = 2'], correct_option: 0, explanation: '2x = 16 → x = 8.' }
      ]
    }
  },
  {
    name: 'Algebra — Inequalities',
    description: 'Solving linear inequalities, representing on number lines, and combined inequalities.',
    sort_order: 8,
    lessons: [
      {
        title: 'Inequalities',
        content: `<h2>Algebra — Inequalities</h2>
<p><strong>Cambridge IGCSE 0580 Syllabus Reference:</strong> 2.8, 2.9</p>

<h3>1. Inequality Symbols</h3>
<table border="1" cellpadding="6">
<tr><th>Symbol</th><th>Meaning</th><th>Example on number line</th></tr>
<tr><td>&lt;</td><td>Less than</td><td>Open circle, shaded left</td></tr>
<tr><td>&gt;</td><td>Greater than</td><td>Open circle, shaded right</td></tr>
<tr><td>≤</td><td>Less than or equal to</td><td>Closed (filled) circle, shaded left</td></tr>
<tr><td>≥</td><td>Greater than or equal to</td><td>Closed (filled) circle, shaded right</td></tr>
</table>

<h3>2. Solving Linear Inequalities</h3>
<p>Solve like equations. The only rule: if you multiply or divide by a <strong>negative number</strong>, reverse the inequality sign.</p>
<p><strong>Example:</strong> 3x − 5 > 7</p>
<ol>
<li>3x > 12</li>
<li>x > 4</li>
</ol>
<p><strong>Example with negative:</strong> −2x + 3 ≥ 11</p>
<ol>
<li>−2x ≥ 8</li>
<li>x ≤ −4 (sign reversed!)</li>
</ol>

<h3>3. Combined (Compound) Inequalities</h3>
<p><strong>Example:</strong> Solve 2 < 3x + 5 ≤ 11</p>
<ol>
<li>Subtract 5: −3 < 3x ≤ 6</li>
<li>Divide by 3: −1 < x ≤ 2</li>
</ol>
<p>On a number line: open circle at −1, closed circle at 2, shaded between.</p>

<h3>4. Representing on Number Lines</h3>
<ul>
<li>x > 3: open circle at 3, arrow to the right</li>
<li>x ≤ −1: filled circle at −1, arrow to the left</li>
<li>−2 ≤ x < 5: filled circle at −2, open circle at 5, line between</li>
</ul>

<h3>5. Integer Solutions</h3>
<p><strong>Example:</strong> Find the integer solutions of −1 < x ≤ 4.</p>
<p>x = 0, 1, 2, 3, 4 (integers strictly greater than −1 and less than or equal to 4)</p>`
      }
    ],
    quiz: {
      title: 'Inequalities',
      description: 'Solving and representing inequalities on number lines',
      time_limit_minutes: 10,
      questions: [
        { question_text: 'Solve 2x + 3 > 11', options: ['x > 4', 'x > 7', 'x < 4', 'x > 5'], correct_option: 0, explanation: '2x > 8 → x > 4.' },
        { question_text: 'Solve −3x + 1 ≥ 10', options: ['x ≤ −3', 'x ≥ −3', 'x ≤ 3', 'x ≥ 3'], correct_option: 0, explanation: '−3x ≥ 9 → x ≤ −3 (dividing by negative reverses the sign).' },
        { question_text: 'Which number line shows x ≥ −2?', options: ['Filled circle at −2, shaded right', 'Open circle at −2, shaded right', 'Filled circle at −2, shaded left', 'Open circle at 2, shaded right'], correct_option: 0, explanation: '≥ means greater than or equal to, so filled circle and shade to the right.' },
        { question_text: 'How many integer values satisfy −3 < x ≤ 2?', options: ['4', '5', '6', '7'], correct_option: 1, explanation: 'Integers: −2, −1, 0, 1, 2. That is 5 values. (x > −3 means x starts at −2, and x ≤ 2 includes 2.)' },
        { question_text: 'Solve 1 < 2x − 3 ≤ 7', options: ['2 < x ≤ 5', '1 < x ≤ 4', '2 ≤ x < 5', '1 < x < 5'], correct_option: 0, explanation: 'Add 3: 4 < 2x ≤ 10. Divide by 2: 2 < x ≤ 5.' },
        { question_text: 'Which inequality is represented by an open circle at 5 with shading to the left?', options: ['x < 5', 'x > 5', 'x ≤ 5', 'x ≥ 5'], correct_option: 0, explanation: 'Open circle = strict inequality, shading left = less than: x < 5.' },
        { question_text: 'Solve 4(x − 1) > 3x + 5', options: ['x > 9', 'x > 1', 'x < 9', 'x > 3'], correct_option: 0, explanation: '4x − 4 > 3x + 5 → x > 9.' },
        { question_text: 'What does x ≤ 3 mean on a number line?', options: ['Open circle at 3, shaded left', 'Filled circle at 3, shaded left', 'Filled circle at 3, shaded right', 'Open circle at 3, shaded right'], correct_option: 1, explanation: '≤ means less than or equal to: filled (closed) circle at 3, shaded to the left.' },
        { question_text: 'Solve 7 − 2x ≥ 1', options: ['x ≤ 3', 'x ≥ 3', 'x ≤ 6', 'x ≥ 6'], correct_option: 0, explanation: '−2x ≥ −6 → x ≤ 3 (divide by −2, reverse sign).' },
        { question_text: 'Which is NOT a solution of −2 ≤ x < 3?', options: ['−2', '0', '3', '−1'], correct_option: 2, explanation: 'x must be strictly less than 3, so x = 3 is NOT included.' }
      ]
    }
  },
  {
    name: 'Algebra — Sequences and Functions',
    description: 'Linear sequences, finding nth term, pattern recognition, and simple functions.',
    sort_order: 9,
    lessons: [
      {
        title: 'Sequences and Functions',
        content: `<h2>Algebra — Sequences and Functions</h2>
<p><strong>Cambridge IGCSE 0580 Syllabus Reference:</strong> 2.10, 2.11, 2.12</p>

<h3>1. Number Patterns</h3>
<p>Look for a rule that generates the next term.</p>
<p><strong>Example:</strong> 3, 7, 11, 15, 19, ... → Add 4 each time (common difference = 4)</p>

<h3>2. Linear (Arithmetic) Sequences</h3>
<p>Each term increases by a fixed amount (common difference d).</p>
<p><strong>nth term formula:</strong> uₙ = an + b</p>
<ul>
<li>a = common difference</li>
<li>b = first term − a</li>
</ul>
<p><strong>Example:</strong> Sequence 5, 8, 11, 14, 17, ...</p>
<p>Common difference = 3, so a = 3. b = 5 − 3 = 2.</p>
<p>nth term = 3n + 2</p>
<p>Check: n=1 → 5 ✓, n=4 → 14 ✓</p>

<h3>3. Generating Terms</h3>
<p>If nth term = 2n + 1:</p>
<ul>
<li>1st term (n=1): 2(1) + 1 = 3</li>
<li>5th term (n=5): 2(5) + 1 = 11</li>
<li>20th term (n=20): 2(20) + 1 = 41</li>
</ul>

<h3>4. Quadratic Sequences (Extended)</h3>
<p>If second differences are constant, the nth term is quadratic: uₙ = an² + bn + c.</p>
<p><strong>Example:</strong> 2, 6, 12, 20, 30, ...</p>
<p>First differences: 4, 6, 8, 10</p>
<p>Second differences: 2, 2, 2 (constant → quadratic)</p>
<p>a = half of second difference = 1. So uₙ = n² + bn + c.</p>
<p>When n=1: 1 + b + c = 2 → b + c = 1</p>
<p>When n=2: 4 + 2b + c = 6 → 2b + c = 2</p>
<p>Solving: b = 1, c = 0. So uₙ = n² + n = n(n + 1).</p>

<h3>5. Functions</h3>
<p>A function maps each input to exactly one output.</p>
<p>f(x) = 2x + 3 means: multiply input by 2, then add 3.</p>
<p><strong>Composite functions:</strong> If f(x) = 2x + 1 and g(x) = x², then:</p>
<ul>
<li>f(g(x)) = f(x²) = 2x² + 1</li>
<li>g(f(x)) = g(2x + 1) = (2x + 1)²</li>
</ul>
<p><strong>Inverse function:</strong> f(x) = 2x + 3. To find f⁻¹(x): let y = 2x + 3, swap x and y: x = 2y + 3, solve: y = (x − 3)/2. So f⁻¹(x) = (x − 3)/2.</p>`
      }
    ],
    quiz: {
      title: 'Sequences and Functions',
      description: 'Linear sequences, nth term, quadratic sequences, and functions',
      time_limit_minutes: 12,
      questions: [
        { question_text: 'What is the nth term of the sequence 3, 7, 11, 15, 19, ...?', options: ['4n − 1', '4n + 3', '3n + 4', '4n + 1'], correct_option: 0, explanation: 'Common difference = 4. b = 3 − 4 = −1. nth term = 4n − 1.' },
        { question_text: 'What is the 10th term of 5, 8, 11, 14, ...?', options: ['32', '29', '35', '38'], correct_option: 0, explanation: 'nth term = 3n + 2. When n = 10: 3(10) + 2 = 32.' },
        { question_text: 'Which term in the sequence 2, 5, 8, 11, ... is 50?', options: ['16th', '17th', '18th', '15th'], correct_option: 1, explanation: 'nth term = 3n − 1. 3n − 1 = 50 → 3n = 51 → n = 17.' },
        { question_text: 'If f(x) = 3x − 2, what is f(4)?', options: ['10', '14', '12', '11'], correct_option: 0, explanation: 'f(4) = 3(4) − 2 = 12 − 2 = 10.' },
        { question_text: 'If f(x) = x + 5 and g(x) = 2x, what is f(g(x))?', options: ['2x + 5', '2x + 10', 'x + 10', '2(x + 5)'], correct_option: 0, explanation: 'f(g(x)) = f(2x) = 2x + 5.' },
        { question_text: 'Find the inverse of f(x) = 5x − 3.', options: ['f⁻¹(x) = (x + 3)/5', 'f⁻¹(x) = (x − 3)/5', 'f⁻¹(x) = 5x + 3', 'f⁻¹(x) = x/5 + 3'], correct_option: 0, explanation: 'Let y = 5x − 3. Swap: x = 5y − 3. Solve: y = (x + 3)/5.' },
        { question_text: 'What are the first differences of the sequence 1, 4, 9, 16, 25?', options: ['3, 5, 7, 9', '3, 4, 5, 6', '3, 5, 7, 11', '2, 5, 7, 9'], correct_option: 0, explanation: '4−1=3, 9−4=5, 16−9=7, 25−16=9. First differences: 3, 5, 7, 9.' },
        { question_text: 'What type of sequence is 3, 6, 12, 24, 48, ...?', options: ['Arithmetic', 'Geometric', 'Quadratic', 'Fibonacci'], correct_option: 1, explanation: 'Each term is multiplied by 2 (common ratio = 2). This is a geometric sequence.' },
        { question_text: 'What is the nth term of the quadratic sequence 1, 4, 9, 16, ...?', options: ['n²', '2n − 1', 'n² + n', 'n + 3'], correct_option: 0, explanation: 'These are perfect squares: 1², 2², 3², 4². nth term = n².' },
        { question_text: 'If f(x) = 2x + 1 and g(x) = x − 3, what is g(f(x))?', options: ['2x − 2', '2x − 1', '2x + 4', '2x − 3'], correct_option: 0, explanation: 'g(f(x)) = g(2x + 1) = (2x + 1) − 3 = 2x − 2.' }
      ]
    }
  },
  {
    name: 'Algebra — Graphs',
    description: 'Plotting linear graphs, finding gradients and intercepts, interpreting real-life graphs.',
    sort_order: 10,
    lessons: [
      {
        title: 'Graphs of Linear Functions',
        content: `<h2>Algebra — Graphs</h2>
<p><strong>Cambridge IGCSE 0580 Syllabus Reference:</strong> 2.13, 2.14, 2.15</p>

<h3>1. The Equation of a Straight Line</h3>
<p><strong>y = mx + c</strong></p>
<ul>
<li>m = gradient (slope)</li>
<li>c = y-intercept (where the line crosses the y-axis)</li>
</ul>

<h3>2. Finding the Gradient</h3>
<p>Gradient = (change in y) / (change in x) = rise / run</p>
<p><strong>Example:</strong> Line passes through (1, 3) and (4, 9):</p>
<p>m = (9 − 3) / (4 − 1) = 6 / 3 = 2</p>

<h3>3. Parallel Lines</h3>
<p>Parallel lines have the <strong>same gradient</strong>.</p>
<p>y = 2x + 1 and y = 2x − 5 are parallel.</p>

<h3>4. Perpendicular Lines</h3>
<p>Gradients multiply to give −1: m₁ × m₂ = −1</p>
<p>If m₁ = 3, then m₂ = −⅓</p>

<h3>5. Forms of Linear Equations</h3>
<ul>
<li><strong>Slope-intercept:</strong> y = mx + c</li>
<li><strong>Point-slope:</strong> y − y₁ = m(x − x₁)</li>
<li><strong>Two-point form:</strong> (y − y₁)/(x − x₁) = (y₂ − y₁)/(x₂ − x₁)</li>
</ul>
<p><strong>Example:</strong> Find the equation of a line through (2, 5) with gradient 3.</p>
<p>y − 5 = 3(x − 2) → y − 5 = 3x − 6 → y = 3x − 1</p>

<h3>6. Interpreting Graphs</h3>
<p><strong>Distance-time graph:</strong> Gradient = speed</p>
<p><strong>Speed-time graph:</strong> Gradient = acceleration, Area = distance travelled</p>
<p><strong>Conversion graphs:</strong> Show the relationship between two units</p>`
      }
    ],
    quiz: {
      title: 'Graphs of Linear Functions',
      description: 'Gradients, equations of lines, and interpreting graphs',
      time_limit_minutes: 12,
      questions: [
        { question_text: 'What is the gradient of the line y = 3x − 7?', options: ['3', '−7', '−3', '7'], correct_option: 0, explanation: 'In y = mx + c, the gradient m = 3.' },
        { question_text: 'What is the y-intercept of y = −2x + 5?', options: ['−2', '2', '5', '−5'], correct_option: 2, explanation: 'In y = mx + c, the y-intercept c = 5.' },
        { question_text: 'Find the gradient of the line through (1, 4) and (3, 10).', options: ['2', '3', '6', '4'], correct_option: 1, explanation: 'm = (10 − 4)/(3 − 1) = 6/2 = 3.' },
        { question_text: 'Which equation is parallel to y = 2x + 1?', options: ['y = 2x − 3', 'y = −2x + 1', 'y = ½x + 1', 'y = 2x² + 1'], correct_option: 0, explanation: 'Parallel lines have the same gradient. Both have m = 2.' },
        { question_text: 'A line has gradient −⅓. What is the gradient of a line perpendicular to it?', options: ['⅓', '3', '−3', '−⅓'], correct_option: 1, explanation: 'Perpendicular gradient: m₁ × m₂ = −1. So m₂ = −1/(-⅓) = 3.' },
        { question_text: 'Find the equation of a line through (0, 3) with gradient −2.', options: ['y = −2x + 3', 'y = 2x + 3', 'y = −2x − 3', 'y = −3x + 2'], correct_option: 0, explanation: 'y = mx + c. m = −2, c = 3. So y = −2x + 3.' },
        { question_text: 'On a distance-time graph, what does the gradient represent?', options: ['Distance', 'Speed', 'Acceleration', 'Time'], correct_option: 1, explanation: 'Gradient = change in distance / change in time = speed.' },
        { question_text: 'A speed-time graph shows a horizontal line at 20 m/s. What does this mean?', options: ['The object is stationary', 'Constant speed of 20 m/s', 'Constant acceleration of 20 m/s²', 'The object is decelerating'], correct_option: 1, explanation: 'A horizontal line on a speed-time graph means speed is not changing: constant speed.' },
        { question_text: 'What is the equation of a line through (2, 1) with gradient 4?', options: ['y = 4x − 7', 'y = 4x + 1', 'y = 4x − 3', 'y = 4x − 9'], correct_option: 0, explanation: 'y − 1 = 4(x − 2) → y = 4x − 8 + 1 = 4x − 7.' },
        { question_text: 'Two lines have equations y = 3x + 2 and y = 3x − 5. What is the relationship?', options: ['They intersect', 'They are parallel', 'They are perpendicular', 'They are the same line'], correct_option: 1, explanation: 'Both have gradient 3 and different y-intercepts, so they are parallel.' }
      ]
    }
  }
];

async function seedAlgebra() {
  let counts = { topics: 0, lessons: 0, quizzes: 0, questions: 0 };

  for (const topic of algebraTopics) {
    const esc = (s) => s.replace(/'/g, "''");
    const topicSql = `INSERT INTO public.topics (name, description, sort_order, subject_level_id) VALUES ('${esc(topic.name)}', '${esc(topic.description)}', ${topic.sort_order}, '${MATH_OL}') RETURNING id`;
    const tr = await query(topicSql);
    if (tr.status !== 201 || !Array.isArray(tr.data) || !tr.data[0]) { console.error('FAILED topic:', topic.name, JSON.stringify(tr)); continue; }
    const tid = tr.data[0].id;
    counts.topics++;
    console.log(`Topic: ${topic.name} (${tid})`);

    for (const lesson of topic.lessons) {
      const lSql = `INSERT INTO public.lessons (topic_id, title, content, sort_order) VALUES ('${tid}', '${esc(lesson.title)}', '${esc(lesson.content)}', 1)`;
      const lr = await query(lSql);
      if (lr.status !== 201) { console.error('FAILED lesson:', lesson.title, JSON.stringify(lr)); continue; }
      counts.lessons++;
    }

    const quiz = topic.quiz;
    const qSql = `INSERT INTO public.quizzes (topic_id, title, description, time_limit_minutes, is_published) VALUES ('${tid}', '${esc(quiz.title)}', '${esc(quiz.description)}', ${quiz.time_limit_minutes}, true) RETURNING id`;
    const qr = await query(qSql);
    if (qr.status !== 201 || !Array.isArray(qr.data)) { console.error('FAILED quiz:', quiz.title, JSON.stringify(qr)); continue; }
    const qid = qr.data[0].id;
    counts.quizzes++;

    for (let i = 0; i < quiz.questions.length; i++) {
      const q = quiz.questions[i];
      const opts = JSON.stringify(q.options).replace(/'/g, "''");
      const qqSql = `INSERT INTO public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order) VALUES ('${qid}', '${esc(q.question_text)}', '${opts}', ${q.correct_option}, '${esc(q.explanation)}', ${i + 1})`;
      const qqr = await query(qqSql);
      if (qqr.status !== 201) { console.error('FAILED q:', q.question_text.substring(0, 40), JSON.stringify(qqr)); continue; }
      counts.questions++;
    }
    console.log(`  + ${quiz.questions.length} questions`);
  }

  console.log(`\n=== ALGEBRA SUMMARY ===`);
  console.log(`Topics: ${counts.topics}, Lessons: ${counts.lessons}, Quizzes: ${counts.quizzes}, Questions: ${counts.questions}`);
}

seedAlgebra().catch(console.error);