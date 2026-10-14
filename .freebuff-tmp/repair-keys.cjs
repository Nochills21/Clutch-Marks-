// Hand-solved repairs for flagged accepted questions in .freebuff/drafts.
// Each patch matches exactly one accepted question, records the previous key,
// unescapes literal \uXXXX sequences, and writes only with --apply.
const fs = require('fs');
const path = require('path');
const APPLY = process.argv.includes('--apply');
const DIR = '.freebuff/drafts';
const REVIEW = { reviewer: 'hand-solved (Buffy)', date: '2026-10-11' };

const P = [
  // coordinate-geometry
  { slug: 'coordinate-geometry', match: 'What is the gradient of the line passing through points', set: { correct_option: 1, explanation: 'Gradient is (y2 - y1)/(x2 - x1) = (5 - 3)/(4 - 2) = 2/2 = 1. The other options are incorrect calculations.' } },
  { slug: 'coordinate-geometry', match: 'Find the equation of the line perpendicular to 2x + 3y = 5', set: { correct_option: 3, explanation: 'The gradient of 2x + 3y = 5 is -2/3, so the perpendicular gradient is 3/2. Point-slope form through (2, 1) gives y - 1 = 3/2(x - 2).' } },
  { slug: 'coordinate-geometry', match: 'What is the gradient of the line 4x - 2y = 5?', set: { correct_option: 1, explanation: 'Rearranging gives y = 2x - 5/2, so the gradient is 2. Equivalently, for ax + by + c = 0 the gradient is -a/b = -4/(-2) = 2.' } },
  { slug: 'coordinate-geometry', exact: true, match: 'Find the intersection point of lines 2x + 3y = 5 and x - 2y = -3.', set: { question_text: 'Find the intersection point of lines 2x + 3y = 5 and x - 2y = -1.', options: ['(1, -1)', '(1, 1)', '(-1, 2)', '(2, 1)'], correct_option: 1, explanation: 'From x - 2y = -1, x = 2y - 1. Substituting into 2x + 3y = 5 gives 2(2y - 1) + 3y = 5, so 7y = 7, y = 1 and x = 1. Check: 2(1) + 3(1) = 5 and 1 - 2(1) = -1.' } },
  { slug: 'coordinate-geometry', exact: true, match: 'Find the intersection point of lines 2x + 3y = 5 and x - 2y = -3. Show your working.', set: { question_text: 'Find the intersection point of lines 2x + 3y = 5 and x - 2y = -1. Show your working.', options: ['(2, -1)', '(-2, 1)', '(1, 1)', '(-1, -1)'], correct_option: 2, explanation: 'Substitute x = 2y - 1 into 2x + 3y = 5 to get 7y = 7, so y = 1 and x = 1. Check: 2(1) + 3(1) = 5 and 1 - 2(1) = -1.' } },
  // differentiation
  { slug: 'differentiation', match: 'Find the coordinates of the stationary points of y = x^3 - 6x^2 + 9x + 2', set: { question_text: 'Find the coordinates of the stationary point of y = x^3 - 6x^2 + 9x + 2 with x-coordinate greater than 2', options: ['(0, 2)', '(1, 4)', '(2, 0)', '(3, 2)'], correct_option: 3, explanation: 'dy/dx = 3x^2 - 12x + 9 = 3(x - 1)(x - 3), so the stationary points are at x = 1 and x = 3. Only x = 3 is greater than 2; y = 27 - 54 + 27 + 2 = 2, giving (3, 2).' } },
  { slug: 'differentiation', match: 'Find the equation of the normal to y = x^2 at (1, 1)', set: { options: ['2x - y - 1 = 0', 'x + 2y - 3 = 0', 'x - y - 1 = 0', 'x + y + 1 = 0'], correct_option: 1, explanation: 'dy/dx = 2x, so the tangent gradient at (1, 1) is 2 and the normal gradient is -1/2. Then y - 1 = -1/2(x - 1), which gives x + 2y - 3 = 0.' } },
  { slug: 'differentiation', match: 'Find the gradient of the normal to y = x^2 - 2x + 1 at x = 1', set: { question_text: 'Find the gradient of the normal to y = x^2 - 2x + 1 at x = 2', options: ['-2', '-1/2', '1', '2'], correct_option: 1, explanation: 'dy/dx = 2x - 2, which is 2 at x = 2. The normal gradient is -1/2.' } },
  { slug: 'differentiation', match: 'A curve is given by y = x^3 - 2x^2 - 5x + 1', set: { question_text: 'A curve is given by y = x^3 - 3x^2 - 9x + 1. Find the coordinates of the stationary point with a positive x-coordinate', options: ['(3, -26)', '(-1, 6)', '(1, -10)', '(-3, 10)'], correct_option: 0, explanation: 'dy/dx = 3x^2 - 6x - 9 = 3(x - 3)(x + 1), so x = 3 or x = -1. Only x = 3 is positive; y = 27 - 27 - 27 + 1 = -26, giving (3, -26).' } },
  // integration (the \u escapes in the stem and explanation are unescaped below)
  { slug: 'integration', match: 'Evaluate the definite integral', set: {} },
  { slug: 'integration', match: 'Find the area under the curve y = 3x^2', set: { options: ['4', '6', '8', '10'], correct_option: 1, explanation: 'The area is the definite integral of 3x^2 - 2x + 1 from 0 to 2: [x^3 - x^2 + x] from 0 to 2 = (8 - 4 + 2) - 0 = 6.' } },
  // quadratics
  { slug: 'quadratics', match: 'Find the equation of the tangent to the curve y = x^2 - 3x + 2', set: { options: ['y = 2x + 1', 'y = x + 1', 'y = 2x - 4', 'y = x - 2'], correct_option: 3, explanation: 'dy/dx = 2x - 3, which is 1 at x = 2. The tangent through (2, 0) is y - 0 = 1(x - 2), so y = x - 2.' } },
  // sequences-and-series
  { slug: 'sequences-and-series', match: 'A geometric series has first term 16', set: { options: ['sum of first 4 terms is 30 and sum to infinity is 32', 'sum of first 4 terms is 21.33 and sum to infinity is 22.67', 'sum of first 4 terms is 23.67 and sum to infinity is 32', 'sum of first 4 terms is 31.67 and sum to infinity is 32'], correct_option: 0, explanation: 'The first four terms are 16 + 8 + 4 + 2 = 30, using a(1 - r^4)/(1 - r) = 16(15/16)/(1/2) = 30. The sum to infinity is a/(1 - r) = 16/(1/2) = 32.' } },
  // trigonometry
  { slug: 'trigonometry', match: 'What is the value of tan 30', set: { explanation: 'tan 30° = opposite/adjacent = 1/√3 in a 30-60-90 triangle. The other options are incorrect ratios.' } },
  { slug: 'trigonometry', match: 'Find the period of the function y = cos(3x)', set: { options: ['π/3', '4π/3', '2π', '2π/3'], correct_option: 3, explanation: 'The period of cos(kx) is 2π/k, so for k = 3 the period is 2π/3. The other options are not the period.' } },
  // algebra-graphs
  { slug: 'algebra-graphs', match: 'The distance-time graph of a particle', set: { question_text: "A particle's displacement s metres at time t seconds is given by s = 2t^2 + 3t. Find its velocity at t = 2 seconds.", options: ['10 m/s', '4 m/s', '11 m/s', '8 m/s'], correct_option: 2, explanation: 'Velocity is the derivative ds/dt = 4t + 3. At t = 2, v = 4(2) + 3 = 11 m/s.' } },
  { slug: 'algebra-graphs', match: 'What is the x-coordinate of the vertex of the parabola y = x^2 + 4x + 3?', set: { correct_option: 0 } },
  // algebra-sequences-and-functions
  { slug: 'algebra-sequences-and-functions', match: 'Find the 8th term of the sequence 1, 4, 7, 10', set: { correct_option: 3, explanation: 'This is linear with a = 1 and d = 3. The 8th term is 1 + (8 - 1)(3) = 22.' } },
  // algebra-simplifying-and-expanding
  { slug: 'algebra-simplifying-and-expanding', match: 'If a = 2 and b = -3, what is 2a^2 - b?', set: { options: ['13', '17', '7', '11'], correct_option: 3, explanation: '2(2)^2 - (-3) = 2(4) + 3 = 8 + 3 = 11.' } },
  // geometry-angles-and-polygons
  { slug: 'geometry-angles-and-polygons', match: 'What is the sum of the angles at a point on a straight line', set: { question_text: 'What is the sum of the angles at a point on a straight line?', options: ['360', '180', '90', '270'], correct_option: 1, explanation: 'Angles on a straight line sum to 180°.' } },
  { slug: 'geometry-angles-and-polygons', match: 'What is the angle at the centre of a circle', set: { question_text: 'What is the angle at the centre of a circle if the angle at the circumference is 30°?', options: ['15', '45', '60', '30'], correct_option: 2, explanation: 'The angle at the centre is twice the angle at the circumference, so it is 2 × 30° = 60°.' } },
  { slug: 'geometry-angles-and-polygons', match: 'In a cyclic quadrilateral, one angle is 2x + 10', set: { question_text: 'In a cyclic quadrilateral, two opposite angles are 2x + 10 and 3x - 5 degrees. What is x?', options: ['35', '25', '20', '30'], correct_option: 0, explanation: 'Opposite angles of a cyclic quadrilateral sum to 180°, so (2x + 10) + (3x - 5) = 180. Then 5x = 175 and x = 35.' } },
  { slug: 'geometry-angles-and-polygons', match: 'In the diagram, angle A = 40', set: { question_text: 'In a quadrilateral, three of the angles are 40°, 50° and 70°. What is the fourth angle?', options: ['110', '200', '290', '160'], correct_option: 1, explanation: 'The angles of a quadrilateral sum to 360°, so the fourth angle is 360 - (40 + 50 + 70) = 200°.' } },
  // geometry-congruence-and-similarity
  { slug: 'geometry-congruence-and-similarity', match: 'Two similar cubes have volumes', set: { options: ['6', '2', '3', '4'], correct_option: 1, explanation: 'Volume scales with the cube of the length scale factor: 216/27 = 8 = k^3, so k = 2.' } },
  { slug: 'geometry-congruence-and-similarity', match: 'What is the scale factor between two similar shapes if their areas', set: { options: ['1:3', '2:3', '3:4', '1:2'], correct_option: 1, explanation: 'Areas scale with the square of the length scale factor, so the length ratio is √4 : √9 = 2:3.' } },
  // networking-communication
  { slug: 'networking-communication', match: 'What is the purpose of a header in a packet?', set: { question_text: 'Which statement describes the full purpose of a packet header?', options: ['To provide packet sequencing only', 'To provide routing information, packet sequencing and error detection', 'To provide error detection only', 'To provide routing information only'], correct_option: 1, explanation: 'A header carries routing information, packet sequencing and error detection data, so the second option describes its full purpose. The others give only part of it.' } },
  // web-technologies
];

const unescapeU = s => typeof s === 'string' ? s.replace(/\\u([0-9a-fA-F]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16))) : s;
const byFile = {};
for (const p of P) (byFile[p.slug] ||= []).push(p);

let problems = 0, patched = 0;
for (const [slug, patches] of Object.entries(byFile)) {
  const file = path.join(DIR, slug + '.json');
  const d = JSON.parse(fs.readFileSync(file, 'utf8'));
  for (const p of patches) {
    const hits = d.accepted.filter(q => p.exact ? q.question_text === p.match : q.question_text.includes(p.match));
    if (hits.length !== 1) { console.log(`!! ${slug}: "${p.match.slice(0, 50)}" matched ${hits.length}`); problems++; continue; }
    const q = hits[0];
    const before = { key: q.correct_option, stem: q.question_text };
    for (const k of ['question_text', 'options', 'correct_option', 'explanation']) if (p.set[k] !== undefined) q[k] = p.set[k];
    q.question_text = unescapeU(q.question_text);
    q.options = q.options.map(unescapeU);
    q.explanation = unescapeU(q.explanation);
    if (Object.keys(p.set).length) {
      q.key_review = { previous_correct_option: before.key, ...REVIEW };
      if (q.correct_option !== before.key) patched++;
    }
    console.log(`${slug} [${q.statement_code}] key ${before.key} -> ${q.correct_option}: ${q.question_text.slice(0, 70)}`);
  }
  if (APPLY) fs.writeFileSync(file, JSON.stringify(d, null, 2) + '\n', 'utf8');
}
console.log(`\n${APPLY ? 'APPLIED' : 'DRY RUN'}  patches=${P.length}  key-changes=${patched}  problems=${problems}`);
process.exit(problems ? 1 : 0);
