UPDATE study_materials SET content = $n$<h2>Kinematics</h2>
<h3>Definitions</h3>
<ul>
<li><strong>Distance</strong> and <strong>speed</strong> are scalars; <strong>displacement</strong> s and <strong>velocity</strong> v are vectors (magnitude and direction).</li>
<li><strong>Velocity</strong> v = ds/dt: rate of change of displacement.</li>
<li><strong>Acceleration</strong> a = dv/dt: rate of change of velocity. A change of direction at constant speed is still an acceleration.</li>
</ul>
<h3>Graphs</h3>
<ul>
<li>Gradient of a displacement–time graph = velocity. A horizontal line means the object is at rest.</li>
<li>Gradient of a velocity–time graph = acceleration. A straight line with constant gradient means uniform acceleration.</li>
<li><strong>Area under a velocity–time graph = displacement</strong>. Area below the time axis counts as negative (a return journey).</li>
<li>Area under an acceleration–time graph = change in velocity.</li>
</ul>
<h3>SUVAT equations (uniform acceleration only)</h3>
<table border="1" cellpadding="6">
<tr><th>Equation</th><th>Quantity not involved</th></tr>
<tr><td>v = u + at</td><td>s</td></tr>
<tr><td>s = ut + ½at²</td><td>v</td></tr>
<tr><td>v² = u² + 2as</td><td>t</td></tr>
<tr><td>s = ½(u + v)t</td><td>a</td></tr>
</table>
<p>Choose the equation that leaves out the quantity you were not given or do not need. Sign convention matters: take up (or the direction of motion) as positive. For objects falling freely, take g = −9.81 m s⁻² if up is positive.</p>
<h3>Non-uniform motion</h3>
<ul>
<li>When acceleration is not constant, SUVAT cannot be used. Work from the graphs instead.</li>
<li>Average speed = total distance ÷ total time. Average velocity = total displacement ÷ total time. These are not the same when the object changes direction.</li>
<li>Read the gradient at a point on a curved s–t or v–t graph from the tangent at that point.</li>
</ul>
<h3>Projectiles</h3>
<p>Resolve the launch velocity into independent components. Horizontal: uₓ = u cos θ, constant velocity, s = uₓt. Vertical: u_y = u sin θ, uniform acceleration g downwards, so SUVAT applies. At the highest point v_y = 0. For a launch and landing at the same level, time of flight = 2u_y/g.</p>
<p><strong>Worked example:</strong> a ball is launched at 20 m s⁻¹ at 30° above the horizontal. uₓ = 20 cos 30° ≈ 17.3 m s⁻¹ and u_y = 20 sin 30° = 10 m s⁻¹. Time of flight = 2 × 10 / 9.81 ≈ 2.04 s. Range = 17.3 × 2.04 ≈ 35 m.</p>
<p><strong>Exam tips:</strong> write the sign convention at the top of the answer. Treat the horizontal and vertical motions as two separate one-dimensional problems linked only by time. Check whether the question asks for speed or velocity, and distance or displacement.</p>$n$
WHERE material_type = 'notes' AND topic_id = (SELECT id FROM topics WHERE slug = 'kinematics');

WITH tp AS (SELECT id FROM topics WHERE slug = 'kinematics'),
qz AS (SELECT z.id FROM quizzes z, tp WHERE z.topic_id = tp.id AND z.exam_type = 'quiz' ORDER BY z.created_at LIMIT 1),
st AS (SELECT ss.id, ss.code FROM syllabus_statements ss, tp WHERE ss.topic_id = tp.id)
INSERT INTO questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
SELECT qz.id, v.qt, v.opts::jsonb, v.ci, v.ex, v.so, 'exam', st.id
FROM qz, (VALUES
 ($q1$A car accelerates uniformly from 5 m s⁻¹ to 25 m s⁻¹ in 8 s. What is its displacement during this time?$q1$, $o1$["120 m","160 m","200 m","30 m"]$o1$, 0, $e1$Use s = ½(u + v)t = ½(5 + 25) × 8 = 120 m. The average velocity of uniform acceleration is the mean of the initial and final velocities.$e1$, 100, '2.1'),
 ($q2$A ball is thrown vertically upwards at 12 m s⁻¹. Taking g = 9.81 m s⁻², what maximum height does it reach above the release point?$q2$, $o2$["1.2 m","14.7 m","7.3 m","11.8 m"]$o2$, 2, $e2$At the top v = 0. Using v² = u² + 2as: 0 = 12² + 2(−9.81)s, so s = 144 / 19.62 ≈ 7.3 m. The equation without t avoids finding the time.$e2$, 101, '2.1'),
 ($q3$Which SUVAT equation does NOT contain the displacement s?$q3$, $o3$["s = ut + ½at²","v² = u² + 2as","s = ½(u + v)t","v = u + at"]$o3$, 3, $e3$v = u + at contains only v, u, a and t. The other three each include s.$e3$, 102, '2.1'),
 ($q4$The velocity–time graph of a train rises in a straight line from 0 to 12 m s⁻¹ over the first 4 s, then stays at 12 m s⁻¹ until t = 6 s. What is the displacement at t = 6 s?$q4$, $o4$["24 m","36 m","48 m","72 m"]$o4$, 2, $e4$Area under a v–t graph = displacement. The triangle gives ½ × 4 × 12 = 24 m and the rectangle gives 2 × 12 = 24 m. Total 48 m.$e4$, 103, '3.2'),
 ($q5$A displacement–time graph is a straight line with gradient 4 m s⁻¹. What are the velocity and the acceleration?$q5$, $o5$["0 m s⁻¹ and 4 m s⁻²","4 m s⁻¹ and 0 m s⁻²","4 m s⁻¹ and 4 m s⁻²","16 m s⁻¹ and 0 m s⁻²"]$o5$, 1, $e5$The gradient of an s–t graph is the velocity, so v = 4 m s⁻¹. A constant gradient means the velocity does not change, so a = 0.$e5$, 104, '3.2'),
 ($q6$An acceleration–time graph shows a = 3 m s⁻² from t = 0 to t = 2 s, then a = −1 m s⁻² from t = 2 s to t = 6 s. What is the change in velocity over the 6 s?$q6$, $o6$["6 m s⁻¹","−2 m s⁻¹","8 m s⁻¹","2 m s⁻¹"]$o6$, 3, $e6$The area under an a–t graph is the change in velocity. First section: 3 × 2 = +6 m s⁻¹. Second section: −1 × 4 = −4 m s⁻¹. Net change = +2 m s⁻¹.$e6$, 105, '3.2')
) v(qt, opts, ci, ex, so, code)
JOIN st ON st.code = v.code;

WITH tp AS (SELECT id FROM topics WHERE slug = 'kinematics'),
ins AS (INSERT INTO flashcard_sets (topic_id, title, description) SELECT id, 'Key terms: Kinematics', 'Recall the core definitions, graph rules and SUVAT choices.' FROM tp RETURNING id)
INSERT INTO flashcards (set_id, front, back, sort_order)
SELECT ins.id, v.f, v.b, v.so FROM ins, (VALUES
 ($f1$Gradient of a displacement–time graph$f1$, $b1$Velocity$b1$, 0),
 ($f2$Area under a velocity–time graph$f2$, $b2$Displacement (area below the time axis is negative)$b2$, 1),
 ($f3$Area under an acceleration–time graph$f3$, $b3$Change in velocity$b3$, 2),
 ($f4$SUVAT equation that does not contain s$f4$, $b4$v = u + at$b4$, 3),
 ($f5$SUVAT equation that does not contain v$f5$, $b5$s = ut + ½at²$b5$, 4),
 ($f6$Time of flight of a projectile landing at its launch height$f6$, $b6$t = 2u_y / g$b6$, 5)
) v(f, b, so);
