insert into public.learning_objectives (topic_id, code, statement, teach, sort_order)
values
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'geometry-congruence-and-similarity'), '0580 4.4a', $st$Solve problems with similar shapes using the length scale factor.$st$, $teach$### What is being asked
Scale lengths between similar shapes. The answer finds ONE multiplier from a matched pair, then applies it to everything asked.

### Method
1. Match corresponding sides (shortest with shortest) — similarity is about correspondence, not size order in the diagram.
2. Scale factor = new ÷ old from the known pair (9 ÷ 3 = 3).
3. Multiply every asked length by it (5 × 3 = 15).
4. Check: angles unchanged, and the factor rebuilds the known pair (\(3 \times 3 = 9\) ✓).

### Worked example
Similar triangles, sides 3-4-5 and shortest side 9: factor \(9 \div 3 = 3\); longest \(5 \times 3 = 15\). Check: middle \(4 \times 3 = 12\), and 9-12-15 is a scaled 3-4-5 (\(9^2 + 12^2 = 225 = 15^2\) ✓).

### Traps
- Unmatched pairs. Longest-with-shortest invents a factor — correspond first (angles match sides).
- Adding the difference. Similar scales MULTIPLY (×3); adding 6 answers a different question.
- Factor upside down. New ÷ old follows the question's direction — enlarging divides small by large never.
- Angles scaled. Angles stay EQUAL in similar shapes — only lengths multiply.

### Timing
Short answers: 2 minutes, 2 marks. Factor from the pair (the method mark), applied length (the answer mark).$teach$, 1),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'geometry-congruence-and-similarity'), '0580 4.4b', $st$Use area and volume scale factors for similar shapes and solids.$st$, $teach$### What is being asked
Scale areas and volumes — NEVER with the length factor directly. The answer squares for area, cubes for volume.

### Method
1. Length factor \(k\) → area factor \(k^2\) → volume factor \(k^3\). For \(k = 3\): 9 and 27.
2. Work backwards with roots: volume factor 8 means length factor \(\sqrt[3]{8} = 2\).
3. Mixed questions convert first: volume via area needs the length factor recovered (\(\sqrt{}\)) before cubing.
4. Check dimensions: area answers carry squares, volumes cubes — flat numbers confess linear thinking.

### Worked example
Similar solids, heights 5 and 15 (\(k = 3\)), smaller volume 40 cm³: volume factor 27, larger \(40 \times 27 = 1080\) cm³. Check: \(1080 \div 40 = 27 = 3^3\) ✓ — cubed, not tripled.

### Traps
- Length factor on areas. ×3 on lengths needs ×9 on areas — flat scaling undercounts squares.
- Square roots for volumes. Volume 8 inverts by CUBE root (2), never square root (which answers area questions).
- Adding factors. ×3 length with +3 area is nonsense — factors multiply through powers, never add.
- Units unconverted. cm³ answers from cm inputs — dimensions track through every power.

### Timing
Short answers: 2-3 minutes, 2-3 marks. Power stated (the method mark), applied value (answer marks).$teach$, 2),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'geometry-congruence-and-similarity'), '0580 4.5a', $st$Identify lines of symmetry and the order of rotational symmetry.$st$, $teach$### What is being asked
Count a shape's symmetries. The answer folds (mirror lines) and spins (rotation order) separately — different counts, different tests.

### Method
1. Lines of symmetry: folds mapping the shape onto itself (square 4, rhombus-non-square 2, regular hexagon 6).
2. Rotational order: distinct positions in one full turn landing identically (square 4, parallelogram 2, scalene 1).
3. Regular \(n\)-gons carry \(n\) of each... lines \(n\), order \(n\) — then verify against the specific shape.
4. Check by tracing: fold mentally for lines, rotate mentally for order — each claimed symmetry demonstrated.

### Worked example
Non-square rhombus: diagonals fold it (2 lines); half-turn repeats it (order 2). Check: fold along a diagonal — halves match ✓; rotate 90° — mismatch ✓ (order is 2, not 4, unlike the square).

### Traps
- Square's counts on rhombi. Equal sides aren't equal angles — rhombus drops to 2 and 2, never 4.
- Diagonals always folding. Rectangle diagonals do NOT mirror (only rhombus/square ones do) — test, don't assume.
- Order 0 claimed. Every shape matches itself after 360° — minimum order is 1, never 0.
- Rotational guessed from lines. Related but distinct — count spins and folds independently.

### Timing
Short answers: 1-2 minutes, 1-2 marks. Fold-test and spin-test stated, counts given.$teach$, 3)
on conflict (topic_id, code) do update set
  statement = excluded.statement,
  teach = excluded.teach,
  sort_order = excluded.sort_order;
delete from public.quizzes
 where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'geometry-congruence-and-similarity') and title = 'Checkpoints — Congruence & Similarity';
insert into public.quizzes (id, topic_id, title, description, is_published, exam_type)
values ('00000000-0000-0000-0000-000000000000', (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'geometry-congruence-and-similarity'), 'Checkpoints — Congruence & Similarity', $desc$Short checks, one set per objective in this topic. Answer one wrongly and the objective it belongs to is the thing to revisit — not the whole topic.$desc$, true, 'quiz');
insert into public.questions
  (quiz_id, question_text, options, correct_option, explanation, difficulty, sort_order, objective_id, statement_id)
values
('00000000-0000-0000-0000-000000000000', $qt$Similar triangles: sides 3, 4, 5 and shortest side 9. Find the longest side.$qt$, $opts$["12","15","18","27"]$opts$::jsonb, 1, $ex$Factor 3: longest \(5 \times 3 = 15\). 12 is the middle side; 18 and 27 mis-multiply.$ex$, 'check', 101, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'geometry-congruence-and-similarity') and code = '0580 4.4a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Similar rectangles: 4 by 6, and width 10. Find the matching length.$qt$, $opts$["12","24","8","15"]$opts$::jsonb, 3, $ex$Factor \(10 \div 4 = 2.5\): length \(6 \times 2.5 = 15\). The others pair wrong sides or wrong factors.$ex$, 'check', 102, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'geometry-congruence-and-similarity') and code = '0580 4.4a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Length scale factor is 3. What is the area scale factor?$qt$, $opts$["9","3","27","6"]$opts$::jsonb, 0, $ex$Square it: \(3^2 = 9\). 3 reuses linear; 27 cubes (volume's job); 6 adds.$ex$, 'check', 201, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'geometry-congruence-and-similarity') and code = '0580 4.4b'), null),
('00000000-0000-0000-0000-000000000000', $qt$Volume scale factor is 8. What is the length scale factor?$qt$, $opts$["8","4","2","24"]$opts$::jsonb, 2, $ex$Cube root: \(\sqrt[3]{8} = 2\). 8 copies; 4 square-roots (area's inverse); 24 triples.$ex$, 'check', 202, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'geometry-congruence-and-similarity') and code = '0580 4.4b'), null),
('00000000-0000-0000-0000-000000000000', $qt$What is the order of rotational symmetry of a square?$qt$, $opts$["2","1","0","4"]$opts$::jsonb, 3, $ex$Four quarter-turns land identically. 2 is rectangle/rhombus level; 1 is asymmetric; 0 is impossible.$ex$, 'check', 301, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'geometry-congruence-and-similarity') and code = '0580 4.5a'), null),
('00000000-0000-0000-0000-000000000000', $qt$How many lines of symmetry does a regular hexagon have?$qt$, $opts$["3","6","12","0"]$opts$::jsonb, 1, $ex$Regular n-gon: n lines — 6. 3 counts vertices-only folds; 12 doubles; 0 denies regularity.$ex$, 'check', 302, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'geometry-congruence-and-similarity') and code = '0580 4.5a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Similar solids have heights 5 cm and 15 cm. The smaller volume is 40 cm³. Find the larger volume.$qt$, $opts$["120 cm³","360 cm³","1080 cm³","200 cm³"]$opts$::jsonb, 2, $ex$Marks as awarded: volume factor \(3^3 = 27\) [1]; \(40 \times 27 = 1080\) [1]. 120 uses the length factor; 360 uses area factor 9; 200 mis-multiplies.$ex$, 'exam', 900, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'geometry-congruence-and-similarity') and code = '0580 4.4b'), (select id from public.syllabus_statements where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'geometry-congruence-and-similarity') and code = '4.4')),
('00000000-0000-0000-0000-000000000000', $qt$How many lines of symmetry does a rhombus (not a square) have?$qt$, $opts$["2","4","0","1"]$opts$::jsonb, 0, $ex$Marks as awarded: diagonals identified as the folds [1]; exactly 2 [1]. 4 belongs to the square; 0 to the general parallelogram; 1 to the kite.$ex$, 'exam', 901, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'geometry-congruence-and-similarity') and code = '0580 4.5a'), (select id from public.syllabus_statements where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'geometry-congruence-and-similarity') and code = '4.5'));
