insert into public.learning_objectives (topic_id, code, statement, teach, sort_order)
values
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'mensuration-bearings-and-loci'), '0580 4.2a', $st$Carry out ruler-and-compass constructions: bisectors, perpendiculars and triangles.$st$, $teach$### What is being asked
Build with compasses, or state the arc recipe. The answer keeps the compass FIXED within each stage — radius changes corrupt intersections.

### Method
1. Perpendicular bisector: arcs from each endpoint with radius MORE than half the segment; join the two crossings.
2. Angle bisector: arc centred at the vertex cutting both arms; arcs from those cuts with equal radius; join vertex to crossing.
3. Triangles: longest side as base, arcs of the other two lengths from its ends; apex where arcs cross.
4. Check: bisectors meet their targets at 90° or halve the angle — measure to confirm, never assume.

### Worked example
Bisect segment AB: compass radius clearly over half AB, arcs from A and from B, ruler through both intersections. Check: the join crosses AB at 90° at its midpoint — perpendicular AND bisecting, both verified.

### Traps
- Radius under half. Short arcs never meet — no crossings, no bisector.
- Compass adjusted mid-stage. Changed radii break every intersection — one radius per stage, reset only between.
- Ruler-measured "bisection". Halving by ruler is drawing, not constructing — arcs earn the construction marks.
- Apex from one arc. Triangles need TWO arcs crossing — one arc leaves the apex anywhere on a curve.

### Timing
Practical: 3-5 minutes, 3-5 marks. Arcs visible (marks), correct radius discipline (marks), final join (a mark).$teach$, 1),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'mensuration-bearings-and-loci'), '0580 4.3a', $st$Use three-figure bearings and scale drawings to solve direction and distance problems.$st$, $teach$### What is being asked
Point and measure in bearing space. The answer starts EVERY bearing at north, clockwise, three figures — 060°, never 60°.

### Method
1. Bearings: clockwise from north, always three digits (060°, 150°, 240°).
2. Back bearings differ by 180°: 060° returns as 240° (add 180; subtract 360 if over).
3. Scale drawings: 1 cm : 5 km turns 7 cm into 35 km — multiply by the scale factor.
4. North lines at EVERY measurement point — bearings transfer along parallels, never by eye.

### Worked example
Bearing of B from A is 060°; find bearing of A from B: face back along the line — \(060 + 180 = 240°\). Check: the two bearings differ by exactly 180° on parallel norths ✓ — direction reversed, geometry consistent.

### Traps
- Two-figure bearings. 60° is not a bearing — leading zeros are the convention, and markers deduct.
- Anticlockwise measuring. Bearings run CLOCKWISE — anticlockwise answers mirror wrongly.
- Forgetting +180. Return journeys need the back bearing — the outbound value answers a different question.
- Scale applied once. Map-to-real multiplies every measured length — unscaled answers sit in centimetres, not kilometres.

### Timing
Short answers: 2-3 minutes, 2-3 marks. North-clockwise-three-figures stated (marks), back-bearing or scale applied (marks).$teach$, 2)
on conflict (topic_id, code) do update set
  statement = excluded.statement,
  teach = excluded.teach,
  sort_order = excluded.sort_order;
delete from public.quizzes
 where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'mensuration-bearings-and-loci') and title = 'Checkpoints — Bearings & Loci';
insert into public.quizzes (id, topic_id, title, description, is_published, exam_type)
values ('00000000-0000-0000-0000-000000000000', (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'mensuration-bearings-and-loci'), 'Checkpoints — Bearings & Loci', $desc$Short checks, one set per objective in this topic. Answer one wrongly and the objective it belongs to is the thing to revisit — not the whole topic.$desc$, true, 'quiz');
insert into public.questions
  (quiz_id, question_text, options, correct_option, explanation, difficulty, sort_order, objective_id, statement_id)
values
('00000000-0000-0000-0000-000000000000', $qt$For a perpendicular bisector, what compass radius is needed from each endpoint?$qt$, $opts$["Any tiny radius","Exactly half the segment","Greater than half the segment","Twice the segment"]$opts$::jsonb, 2, $ex$Arcs must reach past the middle to cross — over half. Tiny arcs miss; exact halves touch once unreliably; double works but wastes precision.$ex$, 'check', 101, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'mensuration-bearings-and-loci') and code = '0580 4.2a'), null),
('00000000-0000-0000-0000-000000000000', $qt$In an angle-bisector construction, where are the arcs centred?$qt$, $opts$["At the vertex, then where that arc cuts the arms","At any two random points","Only at the vertex","At the midpoint of the first arc"]$opts$::jsonb, 0, $ex$Vertex arc first, then equal arcs from its two arm-crossings. Random centres, vertex-only, and midpoints construct nothing valid.$ex$, 'check', 102, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'mensuration-bearings-and-loci') and code = '0580 4.2a'), null),
('00000000-0000-0000-0000-000000000000', $qt$The bearing of B from A is 060°. What is the bearing of A from B?$qt$, $opts$["120°","240°","060°","300°"]$opts$::jsonb, 1, $ex$Back bearing adds 180°: 240°. 120° mis-adds; 060° copies the outbound; 300° subtracts wrongly.$ex$, 'check', 201, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'mensuration-bearings-and-loci') and code = '0580 4.3a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Scale 1 cm : 5 km. A map distance of 7 cm represents what real distance?$qt$, $opts$["12 km","1.4 km","7.5 km","35 km"]$opts$::jsonb, 3, $ex$\(7 \times 5 = 35\) km. 12 adds; 1.4 divides (scale inverted); 7.5 adds half.$ex$, 'check', 202, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'mensuration-bearings-and-loci') and code = '0580 4.3a'), null),
('00000000-0000-0000-0000-000000000000', $qt$A plane flies 200 km on bearing 090°, then 150 km on bearing 180°. How far south of the start is it?$qt$, $opts$["350 km","200 km","150 km","50 km"]$opts$::jsonb, 2, $ex$Marks as awarded: east leg contributes no southing [1]; south leg gives 150 km [1]. 350 totals blindly; 200 quotes the east leg; 50 subtracts the legs.$ex$, 'exam', 900, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'mensuration-bearings-and-loci') and code = '0580 4.3a'), (select id from public.syllabus_statements where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'mensuration-bearings-and-loci') and code = '4.3')),
('00000000-0000-0000-0000-000000000000', $qt$Which construction locates points 3 cm from P AND equidistant from A and B?$qt$, $opts$["Circle radius 3 about P with the perpendicular bisector of AB","Two circles of radius 3","An angle bisector on its own","A 3 cm line drawn from P"]$opts$::jsonb, 0, $ex$Marks as awarded: circle locus for the 3 cm condition [1]; bisector locus for equidistance, intersected [1]. The others satisfy one condition at most.$ex$, 'exam', 901, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'mensuration-bearings-and-loci') and code = '0580 4.2a'), (select id from public.syllabus_statements where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'mensuration-bearings-and-loci') and code = '4.2'));
