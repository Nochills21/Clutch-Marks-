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

const geometryTopics = [
  {
    name: 'Geometry — Angles and Polygons',
    description: 'Angles on a line, at a point, in triangles, quadrilaterals, and polygons. Parallel line angles.',
    sort_order: 11,
    lessons: [
      {
        title: 'Angles and Polygons',
        content: `<h2>Geometry — Angles and Polygons</h2>
<p><strong>Cambridge IGCSE 0580 Syllabus Reference:</strong> 3.1, 3.2, 3.3</p>

<h3>1. Angle Types</h3>
<table border="1" cellpadding="6">
<tr><th>Type</th><th>Size</th></tr>
<tr><td>Acute</td><td>Less than 90°</td></tr>
<tr><td>Right angle</td><td>Exactly 90°</td></tr>
<tr><td>Obtuse</td><td>Between 90° and 180°</td></tr>
<tr><td>Reflex</td><td>Between 180° and 360°</td></tr>
<tr><td>Straight line</td><td>180°</td></tr>
<tr><td>Full turn</td><td>360°</td></tr>
</table>

<h3>2. Angles at a Point and on a Line</h3>
<ul>
<li>Angles at a point sum to <strong>360°</strong></li>
<li>Angles on a straight line sum to <strong>180°</strong></li>
</ul>

<h3>3. Vertically Opposite Angles</h3>
<p>When two lines cross, opposite angles are <strong>equal</strong>.</p>

<h3>4. Angles in Triangles</h3>
<ul>
<li>Angles in a triangle sum to <strong>180°</strong></li>
<li>Exterior angle = sum of two opposite interior angles</li>
</ul>

<h3>5. Angles in Quadrilaterals</h3>
<p>Angles in a quadrilateral sum to <strong>360°</strong></p>

<h3>6. Angles in Polygons</h3>
<p><strong>Sum of interior angles</strong> of an n-sided polygon = (n − 2) × 180°</p>
<ul><li>Triangle: 180°, Quadrilateral: 360°, Pentagon: 540°, Hexagon: 720°</li></ul>
<p><strong>Each interior angle</strong> of a regular n-gon = (n − 2) × 180° ÷ n</p>
<p><strong>Each exterior angle</strong> of a regular n-gon = 360° ÷ n</p>
<p><strong>Example:</strong> Regular hexagon: each exterior angle = 360° ÷ 6 = 60°. Each interior angle = 180° − 60° = 120°.</p>

<h3>7. Parallel Lines and Transversals</h3>
<ul>
<li><strong>Alternate angles</strong> (Z-angles) are equal</li>
<li><strong>Corresponding angles</strong> (F-angles) are equal</li>
<li><strong>Co-interior angles</strong> (C-angles or allied angles) sum to 180°</li>
</ul>`
      }
    ],
    quiz: {
      title: 'Angles and Polygons',
      description: 'Angle types, polygon angles, parallel lines',
      time_limit_minutes: 12,
      questions: [
        { question_text: 'What is the sum of angles in a triangle?', options: ['90°', '180°', '270°', '360°'], correct_option: 1, explanation: 'The interior angles of any triangle always sum to 180°.' },
        { question_text: 'What is the sum of interior angles of a hexagon?', options: ['540°', '720°', '900°', '1080°'], correct_option: 1, explanation: '(6 − 2) × 180° = 4 × 180° = 720°.' },
        { question_text: 'What is each interior angle of a regular octagon?', options: ['135°', '120°', '140°', '144°'], correct_option: 0, explanation: 'Each exterior angle = 360°/8 = 45°. Each interior angle = 180° − 45° = 135°.' },
        { question_text: 'Two parallel lines are cut by a transversal. If one angle is 65°, what is the alternate angle?', options: ['115°', '65°', '25°', '130°'], correct_option: 1, explanation: 'Alternate angles (Z-angles) are equal when lines are parallel: 65°.' },
        { question_text: 'Two parallel lines are cut by a transversal. If one angle is 120°, what is the co-interior angle on the same side?', options: ['120°', '60°', '30°', '240°'], correct_option: 1, explanation: 'Co-interior angles sum to 180°: 180° − 120° = 60°.' },
        { question_text: 'The angles in a quadrilateral are 80°, 110°, and 95°. What is the fourth angle?', options: ['75°', '85°', '65°', '90°'], correct_option: 0, explanation: '360° − (80° + 110° + 95°) = 360° − 285° = 75°.' },
        { question_text: 'Two angles at a point are 200° and x°. What is x?', options: ['160°', '200°', '180°', '150°'], correct_option: 0, explanation: 'Angles at a point = 360°. x = 360° − 200° = 160°.' },
        { question_text: 'What is the exterior angle of a regular pentagon?', options: ['72°', '108°', '60°', '90°'], correct_option: 0, explanation: 'Exterior angle = 360° ÷ 5 = 72°.' },
        { question_text: 'In triangle ABC, angle A = 50° and angle B = 65°. What is angle C?', options: ['65°', '55°', '75°', '85°'], correct_option: 0, explanation: '180° − 50° − 65° = 65°.' },
        { question_text: 'Which type of angle is 270°?', options: ['Acute', 'Obtuse', 'Reflex', 'Straight'], correct_option: 2, explanation: 'A reflex angle is between 180° and 360°. 270° is reflex.' }
      ]
    }
  },
  {
    name: 'Geometry — Congruence and Similarity',
    description: 'Conditions for congruence (SSS, SAS, ASA, RHS), similar triangles, and scale factors.',
    sort_order: 12,
    lessons: [
      {
        title: 'Congruence and Similarity',
        content: `<h2>Geometry — Congruence and Similarity</h2>
<p><strong>Cambridge IGCSE 0580 Syllabus Reference:</strong> 3.4, 3.5, 3.6</p>

<h3>1. Congruent Triangles</h3>
<p>Two triangles are <strong>congruent</strong> if they are exactly the same size and shape.</p>
<p><strong>Conditions for congruence:</strong></p>
<table border="1" cellpadding="6">
<tr><th>Condition</th><th>Meaning</th></tr>
<tr><td>SSS</td><td>Three sides are equal</td></tr>
<tr><td>SAS</td><td>Two sides and the included angle are equal</td></tr>
<tr><td>ASA</td><td>Two angles and the included side are equal</td></tr>
<tr><td>RHS</td><td>Right angle, hypotenuse, and one side are equal</td></tr>
</table>

<h3>2. Similar Triangles</h3>
<p>Two triangles are <strong>similar</strong> if they have the same shape but different sizes.</p>
<p>Their corresponding angles are equal, and their sides are in the same ratio.</p>
<p><strong>Conditions:</strong> AAA (all angles equal), or two sides in the same ratio with equal included angle.</p>
<p><strong>Scale factor:</strong> If side AB = 6 in triangle 1 and A'B' = 9 in triangle 2, scale factor = 9/6 = 1.5</p>
<p><strong>Area ratio:</strong> If scale factor = k, then area ratio = k²</p>
<p><strong>Volume ratio:</strong> If scale factor = k, then volume ratio = k³</p>

<h3>3. Using Similarity to Find Missing Lengths</h3>
<p><strong>Example:</strong> Two similar triangles. Triangle 1 has sides 3, 4, 5. Triangle 2 has a corresponding side of 9. What are the other sides?</p>
<p>Scale factor = 9/3 = 3. Other sides: 4 × 3 = 12, 5 × 3 = 15.</p>

<h3>4. Enlargement</h3>
<p>An enlargement transforms a shape by a scale factor k from a centre.</p>
<ul>
<li>k > 1: shape gets bigger</li>
<li>0 < k < 1: shape gets smaller</li>
<li>k < 0: shape is on the opposite side of the centre</li>
</ul>`
      }
    ],
    quiz: {
      title: 'Congruence and Similarity',
      description: 'Triangle congruence conditions, similar triangles, scale factors',
      time_limit_minutes: 10,
      questions: [
        { question_text: 'Which condition proves two triangles are congruent?', options: ['AAA', 'SSS', 'SSA', 'AAA with same area'], correct_option: 1, explanation: 'SSS (Side-Side-Side) is a valid congruence condition. AAA proves similarity, not congruence.' },
        { question_text: 'Two similar triangles have a scale factor of 2. What is the ratio of their areas?', options: ['2:1', '4:1', '8:1', '16:1'], correct_option: 1, explanation: 'Area ratio = k² = 2² = 4. So area ratio is 4:1.' },
        { question_text: 'Triangle ABC ~ Triangle DEF. AB = 5, DE = 15, BC = 8. What is EF?', options: ['24', '48', '12', '20'], correct_option: 0, explanation: 'Scale factor = 15/5 = 3. EF = 8 × 3 = 24.' },
        { question_text: 'Which combination proves congruence of two right-angled triangles?', options: ['AAA', 'SSA', 'RHS', 'ASA with no right angle'], correct_option: 2, explanation: 'RHS (Right angle, Hypotenuse, Side) is a valid congruence condition for right-angled triangles.' },
        { question_text: 'If the scale factor of two similar shapes is 3, what is the ratio of their volumes?', options: ['3:1', '9:1', '27:1', '6:1'], correct_option: 2, explanation: 'Volume ratio = k³ = 3³ = 27. Volume ratio is 27:1.' },
        { question_text: 'Two triangles have angles 40°, 70°, 70° and sides 6, 9, 9. Are they congruent or similar to a triangle with angles 40°, 70°, 70° and sides 4, 6, 6?', options: ['Congruent', 'Similar', 'Neither', 'Both congruent and similar'], correct_option: 1, explanation: 'Same angles (AAA) = similar. Sides are in ratio 6:4 = 3:2, so not congruent but similar.' },
        { question_text: 'What does RHS stand for in triangle congruence?', options: ['Right angle-Hypotenuse-Side', 'Right angle-Hypotenuse-Slope', 'Right angle-Horizontal-Vertical', 'Regular-Hypotenuse-Side'], correct_option: 0, explanation: 'RHS = Right angle, Hypotenuse, Side. All three conditions must match.' },
        { question_text: 'Triangle ABC has AB = 6, BC = 8, AC = 10. Triangle PQR has PQ = 3, QR = 4, PR = 5. What is the scale factor from ABC to PQR?', options: ['3', '2', '½', '⅓'], correct_option: 2, explanation: 'Each side of PQR is half the corresponding side of ABC. Scale factor = ½.' },
        { question_text: 'Two similar rectangles have a scale factor of 4. If the smaller has area 15 cm², what is the area of the larger?', options: ['60 cm²', '240 cm²', '45 cm²', '90 cm²'], correct_option: 1, explanation: 'Area ratio = k² = 16. Larger area = 15 × 16 = 240 cm².' },
        { question_text: 'Under an enlargement of scale factor −2, where does a point go?', options: ['Twice as far, same side of centre', 'Twice as far, opposite side of centre', 'Half as far, same side', 'Half as far, opposite side'], correct_option: 1, explanation: 'Negative scale factor: point goes to the opposite side of the centre, twice as far away.' }
      ]
    }
  },
  {
    name: 'Mensuration — Area and Volume',
    description: 'Area of triangles, rectangles, circles, sectors, composite shapes. Volume of prisms, cylinders, spheres, cones.',
    sort_order: 13,
    lessons: [
      {
        title: 'Mensuration — Area and Volume',
        content: `<h2>Mensuration — Area and Volume</h2>
<p><strong>Cambridge IGCSE 0580 Syllabus Reference:</strong> 3.7, 3.8, 3.9</p>

<h3>1. Area Formulae</h3>
<table border="1" cellpadding="6">
<tr><th>Shape</th><th>Formula</th></tr>
<tr><td>Rectangle</td><td>A = length × width</td></tr>
<tr><td>Triangle</td><td>A = ½ × base × height</td></tr>
<tr><td>Parallelogram</td><td>A = base × perpendicular height</td></tr>
<tr><td>Trapezium</td><td>A = ½ × (a + b) × h</td></tr>
<tr><td>Circle</td><td>A = πr²</td></tr>
<tr><td>Sector</td><td>A = (θ/360) × πr²</td></tr>
<tr><td>Cross-section / Composite</td><td>Split into simpler shapes</td></tr>
</table>

<h3>2. Perimeter and Circumference</h3>
<ul>
<li>Circumference of circle = 2πr = πd</li>
<li>Arc length = (θ/360) × 2πr</li>
</ul>

<h3>3. Volume Formulae</h3>
<table border="1" cellpadding="6">
<tr><th>Solid</th><th>Formula</th></tr>
<tr><td>Cuboid</td><td>V = l × w × h</td></tr>
<tr><td>Cylinder</td><td>V = πr²h</td></tr>
<tr><td>Prism</td><td>V = cross-sectional area × length</td></tr>
<tr><td>Sphere</td><td>V = (4/3)πr³</td></tr>
<tr><td>Cone</td><td>V = (1/3)πr²h</td></tr>
<tr><td>Pyramid</td><td>V = (1/3) × base area × height</td></tr>
</table>

<h3>4. Surface Area</h3>
<ul>
<li>Cylinder: SA = 2πr² + 2πrh</li>
<li>Sphere: SA = 4πr²</li>
<li>Cone: SA = πr² + πrl (where l = slant height)</li>
</ul>

<h3>5. Sectors and Arcs</h3>
<p><strong>Area of sector</strong> = (θ/360) × πr²</p>
<p><strong>Arc length</strong> = (θ/360) × 2πr</p>
<p><strong>Example:</strong> Sector with r = 10 cm and θ = 60°:</p>
<p>Area = (60/360) × π × 10² = (1/6) × 100π ≈ 52.4 cm²</p>
<p>Arc = (60/360) × 2 × π × 10 = (1/6) × 20π ≈ 10.5 cm</p>

<h3>6. Composite Areas</h3>
<p>Split the shape into simpler shapes. Calculate each area, then add or subtract.</p>`
      }
    ],
    quiz: {
      title: 'Mensuration — Area and Volume',
      description: 'Area, perimeter, volume, surface area calculations',
      time_limit_minutes: 15,
      questions: [
        { question_text: 'What is the area of a triangle with base 12 cm and height 8 cm?', options: ['96 cm²', '48 cm²', '20 cm²', '24 cm²'], correct_option: 1, explanation: 'A = ½ × 12 × 8 = 48 cm².' },
        { question_text: 'What is the area of a circle with radius 7 cm? (Take π = 22/7)', options: ['154 cm²', '44 cm²', '153.94 cm²', '49 cm²'], correct_option: 0, explanation: 'A = πr² = (22/7) × 49 = 154 cm².' },
        { question_text: 'What is the volume of a cylinder with radius 3 cm and height 10 cm?', options: ['90π cm³', '30π cm³', '60π cm³', '270π cm³'], correct_option: 0, explanation: 'V = πr²h = π × 9 × 10 = 90π cm³.' },
        { question_text: 'What is the circumference of a circle with diameter 14 cm? (Take π = 22/7)', options: ['44 cm', '22 cm', '154 cm', '28 cm'], correct_option: 0, explanation: 'C = πd = (22/7) × 14 = 44 cm.' },
        { question_text: 'What is the volume of a sphere with radius 6 cm? (Use π ≈ 3.14)', options: ['904.32 cm³', '226.08 cm³', '452.16 cm³', '753.98 cm³'], correct_option: 0, explanation: 'V = (4/3)πr³ = (4/3) × 3.14 × 216 ≈ 904.32 cm³.' },
        { question_text: 'What is the area of a trapezium with parallel sides 8 cm and 12 cm, and height 5 cm?', options: ['50 cm²', '40 cm²', '100 cm²', '25 cm²'], correct_option: 0, explanation: 'A = ½ × (8 + 12) × 5 = ½ × 20 × 5 = 50 cm².' },
        { question_text: 'What is the surface area of a cylinder with radius 5 cm and height 10 cm? (Use π = 3.14)', options: ['471 cm²', '157 cm²', '314 cm²', '785 cm²'], correct_option: 0, explanation: 'SA = 2πr² + 2πrh = 2(3.14)(25) + 2(3.14)(5)(10) = 157 + 314 = 471 cm².' },
        { question_text: 'What is the volume of a cone with radius 3 cm and height 14 cm? (Use π = 22/7)', options: ['132 cm³', '396 cm³', '66 cm³', '198 cm³'], correct_option: 0, explanation: 'V = (1/3)πr²h = (1/3) × (22/7) × 9 × 14 = 132 cm³.' },
        { question_text: 'What is the arc length of a sector with radius 10 cm and angle 72°?', options: ['4π cm', '12.57 cm', '20π cm', '72 cm'], correct_option: 0, explanation: 'Arc = (72/360) × 2π(10) = (1/5) × 20π = 4π cm ≈ 12.57 cm.' },
        { question_text: 'A rectangular prism is 5 cm × 4 cm × 3 cm. What is its volume?', options: ['60 cm³', '12 cm³', '47 cm³', '20 cm³'], correct_option: 0, explanation: 'V = 5 × 4 × 3 = 60 cm³.' }
      ]
    }
  },
  {
    name: 'Mensuration — Bearings and Loci',
    description: 'Three-figure bearings, drawing and interpreting loci, and construction using compasses.',
    sort_order: 14,
    lessons: [
      {
        title: 'Bearings and Loci',
        content: `<h2>Bearings and Loci</h2>
<p><strong>Cambridge IGCSE 0580 Syllabus Reference:</strong> 3.10, 3.11, 3.12</p>

<h3>1. Bearings</h3>
<p>Bearings measure direction from North, measured <strong>clockwise</strong>.</p>
<ul>
<li>Always use <strong>three figures</strong>: 045° not 45°</li>
<li>North = 000° (or 360°), East = 090°, South = 180°, West = 270°</li>
</ul>
<p><strong>Back bearing:</strong> Add or subtract 180°.</p>
<p>If bearing from A to B is 045°, back bearing (B to A) = 045° + 180° = 225°</p>

<h3>2. Constructing Bearings</h3>
<ol>
<li>Draw a North line at the starting point</li>
<li>Measure the angle clockwise from North using a protractor</li>
<li>Draw the line in that direction</li>
</ol>

<h3>3. Loci</h3>
<p>A <strong>locus</strong> (plural: loci) is a set of all points satisfying a condition.</p>

<p><strong>Common loci:</strong></p>
<ul>
<li>Points at a fixed distance r from a point P: <strong>circle</strong> of radius r</li>
<li>Points equidistant from two points A and B: <strong>perpendicular bisector</strong> of AB</li>
<li>Points equidistant from two lines: <strong>angle bisector</strong></li>
<li>Points at a fixed distance from a line: two lines <strong>parallel</strong> to it</li>
</ul>

<h3>4. Using Loci in Problems</h3>
<p><strong>Example:</strong> A goat is tied to a post with a 5 m rope. The goat cannot go through a wall 4 m away.</p>
<p>The locus is a <strong>semicircle</strong> of radius 5 m on the accessible side.</p>

<h3>5. Construction with Compasses</h3>
<ul>
<li><strong>Perpendicular bisector:</strong> From A and B, draw arcs of the same radius (greater than half AB) above and below the line. Join the two intersection points.</li>
<li><strong>Angle bisector:</strong> From the vertex, draw an arc cutting both arms. From each intersection, draw equal arcs inside the angle. Join vertex to the intersection.</li>
<li><strong>60° angle:</strong> Draw an arc from the vertex. Without changing the compass width, draw another arc from where the first arc cuts the arm. Join the intersection.</li>
</ul>`
      }
    ],
    quiz: {
      title: 'Bearings and Loci',
      description: 'Three-figure bearings, loci, and compass constructions',
      time_limit_minutes: 10,
      questions: [
        { question_text: 'What is the three-figure bearing of North-East?', options: ['045°', '090°', '135°', '000°'], correct_option: 0, explanation: 'NE is exactly between North (000°) and East (090°): 045°.' },
        { question_text: 'The bearing from A to B is 130°. What is the bearing from B to A?', options: ['310°', '050°', '220°', '130°'], correct_option: 0, explanation: 'Back bearing = 130° + 180° = 310°.' },
        { question_text: 'What is the locus of points 3 cm from a fixed point?', options: ['A line', 'A circle', 'A semicircle', 'A square'], correct_option: 1, explanation: 'All points at a fixed distance from a point form a circle.' },
        { question_text: 'The locus of points equidistant from two points A and B is:', options: ['A circle', 'An angle bisector', 'The perpendicular bisector of AB', 'A parallel line'], correct_option: 2, explanation: 'The perpendicular bisector contains all points equidistant from A and B.' },
        { question_text: 'The bearing from P to Q is 200°. What is the bearing from Q to P?', options: ['020°', '380°', '160°', '200°'], correct_option: 0, explanation: 'Back bearing: 200° − 180° = 020°.' },
        { question_text: 'What bearing is due West in three-figure form?', options: ['270°', '090°', '180°', '000°'], correct_option: 0, explanation: 'West = 270° in three-figure bearing.' },
        { question_text: 'Two straight roads cross at right angles. If one road runs N-S and the other E-W, what is the bearing of the east road from the north road?', options: ['090°', '180°', '270°', '000°'], correct_option: 0, explanation: 'East is at 090° from North.' },
        { question_text: 'The locus of points equidistant from two intersecting lines is:', options: ['A circle', 'Two parallel lines', 'The angle bisector', 'A straight line'], correct_option: 2, explanation: 'Points equidistant from two intersecting lines lie on the angle bisector(s).' },
        { question_text: 'A ship sails on a bearing of 060° for 10 km, then due south for 8 km. What bearing has it covered overall from its starting point?', options: ['090°', '120°', '045°', '060°'], correct_option: 0, explanation: 'After sailing 060° for 10 km and then due south, the overall bearing from start is approximately 090° (due East), depending on exact calculations.' },
        { question_text: 'To construct a perpendicular bisector of a line segment, you need:', options: ['A ruler only', 'A protractor', 'A compass', 'A set square'], correct_option: 2, explanation: 'A compass is used to draw arcs from each endpoint to find the bisector.' }
      ]
    }
  },
  {
    name: 'Transformations and Vectors',
    description: 'Reflections, rotations, translations, enlargements. Vector notation, addition, subtraction, and geometric problems.',
    sort_order: 15,
    lessons: [
      {
        title: 'Transformations and Vectors',
        content: `<h2>Transformations and Vectors</h2>
<p><strong>Cambridge IGCSE 0580 Syllabus Reference:</strong> 3.13, 3.14, 3.15, 3.16</p>

<h3>1. Four Transformations</h3>
<table border="1" cellpadding="6">
<tr><th>Transformation</th><th>Description</th><th>Precise definition</th></tr>
<tr><td>Reflection</td><td>Flip over a mirror line</td><td>Each point is the same distance from the line on the opposite side</td></tr>
<tr><td>Rotation</td><td>Turn about a centre</td><td>Specify: centre, angle, direction (clockwise/anticlockwise)</td></tr>
<tr><td>Translation</td><td>Slide</td><td>Move by vector (a, b): a units right, b units up</td></tr>
<tr><td>Enlargement</td><td>Scale from a centre</td><td>Specify: centre, scale factor. Negative = opposite side of centre</td></tr>
</table>

<h3>2. Describing Transformations</h3>
<p>Always state: type of transformation, the invariant element (line/centre), and the parameters.</p>
<p><strong>Example:</strong> "Reflection in the line y = 0" or "Rotation 90° clockwise about the origin"</p>

<h3>3. Combining Transformations</h3>
<p>Apply in order from right to left (or follow the sequence as given).</p>

<h3>4. Vectors</h3>
<p>A <strong>vector</strong> is a quantity with direction and magnitude, written as:</p>
<p>⃗a = <em>a</em>⃗i + <em>b</em>⃗j, or as a column: (a, b) or a⃗ = ⎛⎝a⎞⎠<br>⎝b⎠</p>

<p><strong>Addition:</strong></p>
<p>⎛⎝3⎞⎠ + ⎛⎝1⎞⎠ = ⎛⎝4⎞⎠</p>
<p>⎝2⎠&nbsp;&nbsp;&nbsp;⎝4⎠&nbsp;&nbsp;&nbsp;⎝6⎠</p>

<p><strong>Subtraction:</strong></p>
<p>⎛⎝5⎞⎠ − ⎛⎝2⎞⎠ = ⎛⎝3⎞⎠</p>
<p>⎝7⎠&nbsp;&nbsp;&nbsp;⎝3⎠&nbsp;&nbsp;&nbsp;⎝4⎠</p>

<p><strong>Magnitude:</strong></p>
<p>|⃗a| = √(a² + b²)</p>
<p>⃗a = ⎛⎝3⎞⎠: |⃗a| = √(9 + 16) = √25 = 5</p>
<p>⎝4⎠</p>

<h3>5. Position Vectors</h3>
<p>Position vector of A relative to O (origin): ⃗OA</p>
<p>If A = (3, 2), then ⎛⎝3⎞⎠</p>
<p>⎝2⎠</p>

<h3>6. Vector Geometry Problems</h3>
<p><strong>Midpoint:</strong> ⃗OM = ½(⃗OA + ⃗OB)</p>
<p><strong>Parallel vectors:</strong> ⃗a is parallel to ⃗b if ⃗a = k⃗b for some scalar k.</p>`
      }
    ],
    quiz: {
      title: 'Transformations and Vectors',
      description: 'Reflection, rotation, translation, enlargement, and vector operations',
      time_limit_minutes: 12,
      questions: [
        { question_text: 'A shape is reflected in the x-axis. The point (3, 5) maps to:', options: ['(3, −5)', '(−3, 5)', '(5, 3)', '(−3, −5)'], correct_option: 0, explanation: 'Reflection in x-axis: (x, y) → (x, −y). So (3, 5) → (3, −5).' },
        { question_text: 'A shape is rotated 90° clockwise about the origin. The point (1, 0) maps to:', options: ['(0, 1)', '(0, −1)', '(−1, 0)', '(1, 0)'], correct_option: 1, explanation: '90° clockwise: (x, y) → (y, −x). (1, 0) → (0, −1).' },
        { question_text: 'What is ⎛⎝2⎞⎠ + ⎛⎝−1⎞⎠ ?', options: ['⎛⎝3⎞⎠', '⎛⎝1⎞⎠', '⎛⎝3⎞⎠', '⎛⎝1⎞⎠'], correct_option: 2, explanation: 'Add components: (2 + (−1), 5 + 3) = (1, 8).', },
        { question_text: 'Calculate the magnitude of vector ⎛⎝6⎞⎠.', options: ['10', '13', '15', '8'], correct_option: 0, explanation: '|⃗a| = √(6² + 8²) = √(36 + 64) = √100 = 10.' },
        { question_text: 'A translation is given by the vector ⎛⎝−3⎞⎠. What does this mean?', options: ['3 units right, 2 units up', '3 units left, 2 units down', '3 units left, 2 units up', '3 units right, 2 units down'], correct_option: 1, explanation: 'Vector ⎛⎝−3⎞⎠ means −3 (left) and −2 (down).' },
        { question_text: 'An enlargement has scale factor 3 and centre the origin. Where does (2, 1) go?', options: ['(5, 4)', '(6, 3)', '(8, 4)', '(6, 2)'], correct_option: 1, explanation: 'Multiply each coordinate by 3: (2 × 3, 1 × 3) = (6, 3).' },
        { question_text: 'Which transformation is a rotation of 180° about the origin?', options: ['(x, y) → (y, x)', '(x, y) → (−x, −y)', '(x, y) → (x, −y)', '(x, y) → (−y, x)'], correct_option: 1, explanation: '180° rotation about origin: (x, y) → (−x, −y).' },
        { question_text: 'Two vectors are parallel if:', options: ['Their magnitudes are equal', 'One is a scalar multiple of the other', 'Their dot product is zero', 'They point in the same direction'], correct_option: 1, explanation: '⃗a ∥ ⃗b if ⃗a = k⃗b for some scalar k (k ≠ 0).' },
        { question_text: 'A reflection in the line x = 0 maps (4, 7) to:', options: ['(−4, 7)', '(4, −7)', '(7, 4)', '(−4, −7)'], correct_option: 0, explanation: 'x = 0 is the y-axis. Reflection in y-axis: (x, y) → (−x, y). So (4, 7) → (−4, 7).' },
        { question_text: 'If OA = ⎛⎝2⎞⎠ and OB = ⎛⎝4⎞⎠, what is ⎛⎝−2⎞⎠ ?', options: ['AB', 'BA', 'OA + OB', '2OA'], correct_option: 0, explanation: '⃗AB = ⃗OB − ⃗OA = (4−2, 1−3) = (2, −2).' }
      ]
    }
  }
];

async function seedGeometry() {
  let c = { topics: 0, lessons: 0, quizzes: 0, questions: 0 };
  const esc = (s) => s.replace(/'/g, "''");

  for (const topic of geometryTopics) {
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

  console.log(`\n=== GEOMETRY/MENSURATION SUMMARY ===`);
  console.log(`Topics: ${c.topics}, Lessons: ${c.lessons}, Quizzes: ${c.quizzes}, Questions: ${c.questions}`);
}

seedGeometry().catch(console.error);
