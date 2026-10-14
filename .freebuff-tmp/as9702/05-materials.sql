UPDATE study_materials SET content = $n$<h2>Materials: deformation</h2>
<h3>Stress and strain</h3>
<ul>
<li>Stress = F ÷ A, where A is the cross-sectional area perpendicular to the force. Unit: pascal (Pa), where 1 Pa = 1 N m⁻².</li>
<li>Strain = extension ÷ original length. It has no unit.</li>
</ul>
<h3>Young modulus</h3>
<p>Young modulus E = stress ÷ strain, measured in the region where stress is proportional to strain. Unit: Pa.</p>
<h3>Force–extension behaviour</h3>
<ul>
<li>Up to the limit of proportionality, extension is proportional to force (Hooke's law), and the graph is a straight line through the origin.</li>
<li>Up to the elastic limit, the material returns to its original length when unloaded. This is elastic deformation.</li>
<li>Beyond the elastic limit, the material is plastically deformed and does not return to its original length. The graph curves, and the energy in the extension is not recovered.</li>
</ul>
<h3>Energy stored</h3>
<p>The elastic energy stored in a stretched material equals the area under its force–extension graph up to the point of interest. For a spring obeying Hooke's law, E = ½Fx = ½kx².</p>
<p><strong>Worked example:</strong> a wire of cross-sectional area 2.0 × 10⁻⁴ m² is pulled by 500 N. Stress = 500 ÷ (2.0 × 10⁻⁴) = 2.5 × 10⁶ Pa. If it extends by 1.0 mm from an original length of 2.0 m, strain = 0.001 ÷ 2.0 = 5.0 × 10⁻⁴, so E = 2.5 × 10⁶ ÷ 5.0 × 10⁻⁴ = 5.0 × 10⁹ Pa.</p>
<p><strong>Exam tips:</strong> convert the area to m² and the extension to m before calculating. Strain has no unit, so do not write a unit for it. Say "the limit of proportionality" and "the elastic limit" as separate ideas.</p>$n$
WHERE material_type = 'notes' AND topic_id = (SELECT id FROM topics WHERE slug = 'materials-deformation');

WITH tp AS (SELECT id FROM topics WHERE slug = 'materials-deformation'),
qz AS (SELECT z.id FROM quizzes z, tp WHERE z.topic_id = tp.id AND z.exam_type = 'quiz' ORDER BY z.created_at LIMIT 1),
st AS (SELECT ss.id, ss.code FROM syllabus_statements ss, tp WHERE ss.topic_id = tp.id)
INSERT INTO questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
SELECT qz.id, v.qt, v.opts::jsonb, v.ci, v.ex, v.so, 'exam', st.id
FROM qz, (VALUES
 ($q1$A force of 500 N acts on a wire of cross-sectional area 2.0 × 10⁻⁴ m². What is the stress in the wire?$q1$, $o1$["2.5 × 10⁶ Pa","2.5 × 10⁻⁶ Pa","4.0 × 10⁻⁷ Pa","1.0 × 10⁵ Pa"]$o1$, 0, $e1$Stress = F ÷ A = 500 ÷ (2.0 × 10⁻⁴) = 2.5 × 10⁶ Pa.$e1$, 100, '6.1'),
 ($q2$A wire of original length 2.0 m extends by 1.0 mm. What is its strain?$q2$, $o2$["2.0 × 10⁻³","5.0 × 10⁻⁴","5.0 × 10⁻¹","2.0 × 10⁻⁶"]$o2$, 1, $e2$Strain = extension ÷ original length = 0.0010 ÷ 2.0 = 5.0 × 10⁻⁴. Strain has no unit.$e2$, 101, '6.1'),
 ($q3$A material has a stress of 2.5 × 10⁶ Pa and a strain of 5.0 × 10⁻⁴ in the region where Hooke's law applies. What is its Young modulus?$q3$, $o3$["5.0 × 10⁹ Pa","5.0 × 10⁻⁴ Pa","1.25 × 10³ Pa","2.5 × 10¹⁰ Pa"]$o3$, 0, $e3$Young modulus E = stress ÷ strain = 2.5 × 10⁶ ÷ 5.0 × 10⁻⁴ = 5.0 × 10⁹ Pa.$e3$, 102, '6.1'),
 ($q4$Which statement about the elastic limit of a material is correct?$q4$, $o4$["Beyond the elastic limit the material does not return to its original length when unloaded","Strain is proportional to stress up to the breaking point","Elastic deformation is permanent","Plastic deformation is fully reversible"]$o4$, 0, $e4$Within the elastic limit, a material returns to its original length on unloading. Beyond it, plastic deformation occurs and the extension is permanent. Stress and strain may stop being proportional before the elastic limit.$e4$, 103, '6.2'),
 ($q5$A spring obeying Hooke's law has spring constant 200 N m⁻¹. It is stretched by 0.10 m. How much elastic potential energy is stored?$q5$, $o5$["0.5 J","1.0 J","2.0 J","20 J"]$o5$, 1, $e5$E = ½kx² = ½ × 200 × 0.10² = 1.0 J.$e5$, 104, '6.2'),
 ($q6$A wire is stretched beyond its elastic limit. Which statement about its force–extension graph is correct?$q6$, $o6$["Extension is directly proportional to force","The graph is a straight line through the origin","The wire does not return to its original length when the force is removed","Young modulus is constant throughout"]$o6$, 2, $e6$In the plastic region the graph is no longer a straight line, and the material is permanently deformed. The extension is not directly proportional to force there, so the other options are wrong.$e6$, 105, '6.2')
) v(qt, opts, ci, ex, so, code)
JOIN st ON st.code = v.code;

WITH tp AS (SELECT id FROM topics WHERE slug = 'materials-deformation'),
ins AS (INSERT INTO flashcard_sets (topic_id, title, description) SELECT id, 'Key terms: Materials, deformation', 'Recall stress, strain, Young modulus and elastic behaviour.' FROM tp RETURNING id)
INSERT INTO flashcards (set_id, front, back, sort_order)
SELECT ins.id, v.f, v.b, v.so FROM ins, (VALUES
 ($f1$Stress$f1$, $b1$Force ÷ cross-sectional area; unit Pa (N m⁻²)$b1$, 0),
 ($f2$Strain$f2$, $b2$Extension ÷ original length; no unit$b2$, 1),
 ($f3$Young modulus$f3$, $b3$Stress ÷ strain, in the region where Hooke's law applies; unit Pa$b3$, 2),
 ($f4$Limit of proportionality$f4$, $b4$The point up to which stress and strain are proportional (Hooke's law holds)$b4$, 3),
 ($f5$Elastic deformation$f5$, $b5$The material returns to its original length when the load is removed$b5$, 4),
 ($f6$Plastic deformation$f6$, $b6$Permanent deformation; the material does not return to its original length$b6$, 5)
) v(f, b, so);
