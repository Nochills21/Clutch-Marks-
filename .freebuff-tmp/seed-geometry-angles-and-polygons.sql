insert into public.learning_objectives (topic_id, code, statement, teach, sort_order)
values
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'geometry-angles-and-polygons'), '0580 4.1a', $st$Use geometric vocabulary for lines, angles and polygons up to twelve sides.$st$, $teach$### What is being asked
Name a shape or describe a relationship. The answer counts sides for polygons and checks the angle for line pairs — words with exact meanings.

### Method
1. Polygon sides: pentagon 5, hexagon 6, heptagon 7, octagon 8, nonagon 9, decagon 10, dodecagon 12.
2. Parallel lines never meet; perpendicular lines meet at 90°.
3. Regular means all sides AND all angles equal — irregularity in either breaks it.
4. Check by counting drawn sides yourself — names are claims to verify, not facts to trust.

### Worked example
Name the 9-sided polygon: nona- means nine — nonagon. Check: hexagon 6, heptagon 7, octagon 8, nonagon 9 — the Greek sequence confirms no skip.

### Traps
- Nonagon as 8 or 10. Octagon owns 8, decagon 10 — nonagon sits strictly between.
- "Regular" from equal sides alone. A rhombus has equal sides but unequal angles — both conditions, always.
- Parallel confused with perpendicular. Never-meet versus 90°-meet — opposite relationships.
- Equal-looking lines declared parallel. Appearance deceives; markings or angle evidence decide.

### Timing
Short answers: 1 minute, 1 mark. Count sides, check the angle — vocabulary should be instant.$teach$, 1),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'geometry-angles-and-polygons'), '0580 4.6a', $st$Calculate angles in triangles and polygons using angle sums and exterior angles.$st$, $teach$### What is being asked
Find a missing angle from sums. The answer assembles the total first — 180° for triangles, \((n-2) \times 180°\) for polygons, 360° for exterior rounds.

### Method
1. Triangle total 180°: angles \(x\), \(2x\), \(3x\) give \(6x = 180\), so \(x = 30\).
2. Polygon interior total: \((n - 2) \times 180°\); regular interior divides by \(n\).
3. Exterior shortcut: one exterior turn = \(360° \div n\) (pentagon: 72°); interior = \(180°\) minus exterior.
4. Check: parts sum back to the total — always re-add.

### Worked example
Exterior angle of a regular pentagon: \(360° \div 5 = 72°\). Check: interior \(180 - 72 = 108°\), and \(5 \times 108 = 540 = (5-2) \times 180\) ✓ — both routes converge.

### Traps
- 360° for interiors. The full turn belongs to EXTERIORS — interiors use \((n-2) \times 180°\).
- Interior-exterior unlinked. They are neighbours on a straight line: sum 180°, always.
- Ratio parts mis-totalled. \(x + 2x + 3x = 6x\), not 5x — add coefficients before dividing 180°.
- Regular assumed. Irregular polygons still total \((n-2) \times 180°\), but no single angle follows — check regularity first.

### Timing
Short answers: 2 minutes, 2 marks. Total stated (the method mark), division or subtraction (the answer mark).$teach$, 2),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'geometry-angles-and-polygons'), '0580 4.6b', $st$Use alternate, corresponding and co-interior angles with parallel lines.$st$, $teach$### What is being asked
Find an angle from a parallel-line diagram. The answer names the relationship (F, Z, or C shape) — then applies equal or sum-to-180.

### Method
1. Corresponding (F shape): equal. Alternate (Z shape): equal. Co-interior (C shape): sum to 180°.
2. Confirm parallels FIRST (markings or given) — without them, no rule applies.
3. Alternate with 65° gives 65°; co-interior with 110° gives \(180 - 110 = 70°\).
4. Check by tracing the letter shape with a finger — F, Z or C must be genuinely there.

### Worked example
Parallels cut by a transversal; one angle 110°, find its co-interior partner: same-side interior sums to 180°, so \(180 - 110 = 70°\). Check: the C shape encloses both angles on one side — relationship confirmed before arithmetic.

### Traps
- Equal co-interior. C-shape angles SUPPLEMENT (70°, not 110°) — equality belongs to F and Z only.
- Rules without parallels. Non-parallel lines make equal-looking angles unequal — verify the given first.
- Vertical angles confused in. Opposite angles are equal with NO parallels needed — a different rule entirely.
- Wrong partner picked. The relationship names a SPECIFIC angle — trace the shape to it, don't grab neighbours.

### Timing
Short answers: 2 minutes, 2 marks. Relationship named (the method mark), value (the answer mark).$teach$, 3),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'geometry-angles-and-polygons'), '0580 4.7a', $st$Apply circle theorems: angle at centre, angles in a semicircle and in the same segment.$st$, $teach$### What is being asked
Find an angle from circle facts. The answer quotes the theorem first — centre-double, semicircle-right-angle, same-segment-equal.

### Method
1. Centre angle is TWICE the circumference angle on the same arc: 80° at centre → 40° on the circle.
2. Angle in a semicircle is 90° — any triangle with the diameter as one side is right-angled.
3. Angles in the SAME segment (same chord, same side) are equal.
4. Check the arc: centre and circumference angles must stand on the SAME chord — different arcs, different rules.

### Worked example
Centre angle AOB = 80°, C on the major arc: angle ACB stands on the same chord AB, so \(80 \div 2 = 40°\). Check: C on the minor arc would give the reflex half (\((360-80)/2 = 140°\)) — arc choice verified before halving.

### Traps
- Halving the wrong angle. Only centre-to-circumference on the SAME arc halves — verify the chord first.
- Diameter unrecognised. Any line through the centre meeting the circle twice is a diameter — the semicircle rule hides in plain diagrams.
- Same-segment across sides. Opposite sides of a chord give SUPPLEMENTARY angles, not equal — same side only.
- Radius as tangent. Radii meet tangents at 90° (theorem II) — don't import it into arc questions.

### Timing
Short answers: 2-3 minutes, 2-3 marks. Theorem quoted (the method mark), applied value (the answer mark).$teach$, 4),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'geometry-angles-and-polygons'), '0580 4.8a', $st$Apply advanced circle theorems: tangents, cyclic quadrilaterals and alternate segment (Extended only).$st$, $teach$### What is being asked
Use the Extended-only circle facts. The answer adds three tools: tangent-radius right angles, cyclic opposite-sum, tangent-chord equals opposite arc angle. (Extended only.)

### Method
1. Tangent ⊥ radius at contact: every touch point carries a 90° with its radius.
2. Cyclic quadrilateral: opposite angles sum to 180° (all four vertices on the circle).
3. Alternate segment: tangent-chord angle equals the angle in the opposite arc.
4. Check cyclicity before using (2): all four corners must touch the circle — three won't do.

### Worked example
Cyclic quadrilateral ABCD with angle A = 100°: opposite angle C = \(180 - 100 = 80°\). Check: all four vertices given on the circle (cyclic ✓); adjacent angles need no rule — only opposites supplement.

### Traps
- Tangent angle guessed. Touch-point angles are 90° by theorem, never eyeballed — draw the radius in. (Extended only.)
- Cyclic assumed from three points. Any three non-collinear points define a circle — the FOURTH must lie on it too.
- Alternate segment mis-sided. Tangent-chord equals the FAR arc's angle, not the near one — check which segment opposes.
- Opposite versus adjacent. Cyclic supplements are OPPOSITE pairs — adjacent pairs follow no such rule.

### Timing
Short answers: 2-3 minutes, 2-3 marks. Cyclicity or tangency established (a mark), theorem applied (marks).$teach$, 5)
on conflict (topic_id, code) do update set
  statement = excluded.statement,
  teach = excluded.teach,
  sort_order = excluded.sort_order;
delete from public.quizzes
 where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'geometry-angles-and-polygons') and title = 'Checkpoints — Angles & Polygons';
insert into public.quizzes (id, topic_id, title, description, is_published, exam_type)
values ('00000000-0000-0000-0000-000000000000', (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'geometry-angles-and-polygons'), 'Checkpoints — Angles & Polygons', $desc$Short checks, one set per objective in this topic. Answer one wrongly and the objective it belongs to is the thing to revisit — not the whole topic.$desc$, true, 'quiz');
insert into public.questions
  (quiz_id, question_text, options, correct_option, explanation, difficulty, sort_order, objective_id, statement_id)
values
('00000000-0000-0000-0000-000000000000', $qt$How many sides does a nonagon have?$qt$, $opts$["7","8","9","10"]$opts$::jsonb, 2, $ex$Nona- means nine. 7 is heptagon, 8 octagon, 10 decagon — the sequence leaves no gap.$ex$, 'check', 101, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'geometry-angles-and-polygons') and code = '0580 4.1a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Which describes perpendicular lines?$qt$, $opts$["They meet at 90 degrees","They never meet","They are the same line","They meet at 45 degrees"]$opts$::jsonb, 0, $ex$Perpendicular means a right-angle meeting. Never-meeting is parallel; coincidence is identity; 45° is just an angle.$ex$, 'check', 102, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'geometry-angles-and-polygons') and code = '0580 4.1a'), null),
('00000000-0000-0000-0000-000000000000', $qt$A triangle's angles are \(x\), \(2x\) and \(3x\). Find \(x\).$qt$, $opts$["20","30","36","45"]$opts$::jsonb, 1, $ex$\(6x = 180\), so \(x = 30\). 20 totals 120; 36 and 45 mis-divide the 180°.$ex$, 'check', 201, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'geometry-angles-and-polygons') and code = '0580 4.6a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Find one exterior angle of a regular pentagon.$qt$, $opts$["108°","54°","36°","72°"]$opts$::jsonb, 3, $ex$\(360° \div 5 = 72°\). 108° is the interior; the others mis-divide the full turn.$ex$, 'check', 202, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'geometry-angles-and-polygons') and code = '0580 4.6a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Parallel lines cut by a transversal; one angle is 65°. What is its alternate angle?$qt$, $opts$["65°","115°","25°","90°"]$opts$::jsonb, 0, $ex$Alternate (Z) angles are equal: 65°. 115° suits co-interior; the others invent complements.$ex$, 'check', 301, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'geometry-angles-and-polygons') and code = '0580 4.6b'), null),
('00000000-0000-0000-0000-000000000000', $qt$With parallel lines, one co-interior angle is 110°. What is the other?$qt$, $opts$["110°","55°","70°","90°"]$opts$::jsonb, 2, $ex$Co-interior (C) angles sum to 180°: \(180 - 110 = 70°\). 110° equalises wrongly; 55° halves; 90° assumes perpendicular.$ex$, 'check', 302, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'geometry-angles-and-polygons') and code = '0580 4.6b'), null),
('00000000-0000-0000-0000-000000000000', $qt$The angle at the centre is 80°. What is the angle at the circumference on the same arc?$qt$, $opts$["160°","80°","20°","40°"]$opts$::jsonb, 3, $ex$Circumference is half the centre: 40°. 160° doubles wrongly; 80° copies; 20° quarters.$ex$, 'check', 401, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'geometry-angles-and-polygons') and code = '0580 4.7a'), null),
('00000000-0000-0000-0000-000000000000', $qt$What is the angle in a semicircle?$qt$, $opts$["180°","90°","45°","60°"]$opts$::jsonb, 1, $ex$The diameter subtends a right angle: 90°. 180° is the straight diameter itself; the others halve or guess.$ex$, 'check', 402, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'geometry-angles-and-polygons') and code = '0580 4.7a'), null),
('00000000-0000-0000-0000-000000000000', $qt$A tangent touches a circle at T. What is the angle between the tangent and radius OT?$qt$, $opts$["45°","60°","90°","180°"]$opts$::jsonb, 2, $ex$Tangent meets radius at 90° — always, by theorem. The others guess at the diagram.$ex$, 'check', 501, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'geometry-angles-and-polygons') and code = '0580 4.8a'), null),
('00000000-0000-0000-0000-000000000000', $qt$ABCD is cyclic with angle A = 100°. What is opposite angle C?$qt$, $opts$["180°","90°","360°","80°"]$opts$::jsonb, 3, $ex$Cyclic opposites sum to 180°: C = 80°. 180° is the sum, not the angle; the others ignore the theorem.$ex$, 'check', 502, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'geometry-angles-and-polygons') and code = '0580 4.8a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Find one interior angle of a regular octagon.$qt$, $opts$["120°","135°","140°","1080°"]$opts$::jsonb, 1, $ex$Marks as awarded: total \((8-2) \times 180 = 1080°\) [1]; one angle \(1080 \div 8 = 135°\) [1]. 120° is hexagon; 140° is nonagon; 1080° is the total, undivided.$ex$, 'exam', 900, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'geometry-angles-and-polygons') and code = '0580 4.6a'), (select id from public.syllabus_statements where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'geometry-angles-and-polygons') and code = '4.6')),
('00000000-0000-0000-0000-000000000000', $qt$Centre O, A and B on a circle with angle AOB = 100°. C sits on the major arc. Find angle ACB.$qt$, $opts$["200°","100°","25°","50°"]$opts$::jsonb, 3, $ex$Marks as awarded: same-arc theorem quoted [1]; half of 100° is 50° [1]. 200° doubles; 100° copies the centre; 25° quarters.$ex$, 'exam', 901, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'geometry-angles-and-polygons') and code = '0580 4.7a'), (select id from public.syllabus_statements where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'geometry-angles-and-polygons') and code = '4.7'));
