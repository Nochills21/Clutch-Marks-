insert into public.learning_objectives (topic_id, code, statement, teach, sort_order)
values
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'mensuration-area-and-volume'), '0580 5.1a', $st$Convert between metric units of length, area and volume, squaring and cubing factors.$st$, $teach$### What is being asked
Change units with the dimension's power. The answer scales the conversion: ×100 for length, ×100² for area, ×100³ for volume — never the same factor twice.

### Method
1. Length: 1 m = 100 cm. Area squares it: 1 m² = 10,000 cm². Volume cubes it: 1 m³ = 1,000,000 cm³.
2. Direction: bigger-to-smaller multiplies; smaller-to-bigger divides.
3. Count the zeros by dimension: area needs 4 (100²), volume needs 6 (100³).
4. Check: cm² answers for room floors are thousands; m² answers for floors are tens — magnitude polices the power.

### Worked example
2.5 m² in cm²: \(2.5 \times 10{,}000 = 25{,}000\) cm². Check: a room floor in cm² must be ten-thousands — 250 (length factor) or 25 (no factor) would both confess the dimension error.

### Traps
- Length factor for area. ×100 instead of ×10,000 undercounts a hundredfold — the classic dimension slip.
- Area factor for volume. ×10,000 instead of ×1,000,000 — each dimension multiplies the factor once more.
- Dividing the wrong way. m² to cm² multiplies (smaller units, more of them) — direction follows unit size.
- Zeros miscounted. 1 m³ = 1,000,000 cm³ (six zeros) — write the power out rather than trusting zero-counting.

### Timing
Short answers: 1-2 minutes, 1-2 marks. Dimension stated (the method mark), zeros correct (the answer mark).$teach$, 1),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'mensuration-area-and-volume'), '0580 5.2a', $st$Find areas and perimeters of triangles, parallelograms and trapezia.$st$, $teach$### What is being asked
Apply the right area formula to straight-sided shapes. The answer halves triangles and trapezia — the half is the most dropped factor in mensuration.

### Method
1. Triangle: \(\frac{1}{2} \times\) base × vertical height (9 × 7 halves to 31.5).
2. Parallelogram: base × vertical height (no halving). Trapezium: \(\frac{1}{2} \times\) (sum of parallel sides) × height.
3. Heights must be PERPENDICULAR to the base — slant lengths never enter area.
4. Check by bounding: the answer sits below base × height for halved shapes — above means the half was skipped.

### Worked example
Trapezium with parallel sides 6 and 10, height 4: \(\frac{1}{2} \times 16 \times 4 = 32\). Check: the enclosing 10 × 4 rectangle is 40, and 32 sits sensibly below it — halving verified by containment.

### Traps
- Unhalved triangles. 9 × 7 = 63 doubles the true 31.5 — the half is half the marks.
- Slant height used. Only perpendicular height counts — slant sides flatter the answer falsely.
- Wrong pair averaged. Trapezium averages the PARALLEL pair (6, 10), never adjacent sides.
- Perimeter-area swap. Adding sides answers perimeter — area needs multiplication, stated in the question.

### Timing
Short answers: 2 minutes, 2 marks. Formula with numbers (the method mark), halving honoured (the answer mark).$teach$, 2),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'mensuration-area-and-volume'), '0580 5.3a', $st$Find circumferences, arc lengths, and areas of circles, sectors and segments.$st$, $teach$### What is being asked
Work with round shapes whole or fractional. The answer scales full-circle results by the angle fraction — \(\theta/360\) multiplies everything curved.

### Method
1. Full circle: circumference \(2\pi r\), area \(\pi r^2\) (radius 5: 31.4 and 78.5).
2. Sector/arc: multiply by \(\frac{\theta}{360}\) — 90° gives quarters (arc \(\frac{1}{4} \times 2\pi \times 6\), area \(\frac{1}{4} \times \pi \times 36 ≈ 28.3\)).
3. Diameter doubled first: formulas want \(r\) — halve any given diameter before substituting.
4. Check: sector answers sit below full-circle values by the visible fraction — above means unscaled.

### Worked example
Sector, radius 6, angle 90°: fraction \(\frac{1}{4}\); area \(\frac{1}{4} \times \pi \times 36 = 9\pi ≈ 28.3\). Check against the full circle (113.1): a quarter-angle gives a quarter-area ✓.

### Traps
- Circumference-area swap. \(2\pi r\) measures round; \(\pi r^2\) fills — the question's noun decides.
- Diameter as radius. Halve diameters first — full-diameter substitution quadruples areas silently.
- Unscaled sectors. Full-circle answers for fractional angles ignore the \(\theta/360\) — the sector's whole point.
- π rounded early. Keep π (or 3+ figures) until the final answer — early 3.14s drift.

### Timing
Short answers: 2-3 minutes, 2-3 marks. Fraction stated (a mark), radius halved if needed (a mark), evaluated (a mark).$teach$, 3),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'mensuration-area-and-volume'), '0580 5.4a', $st$Find surface areas and volumes of prisms, cylinders, pyramids, cones and spheres.$st$, $teach$### What is being asked
Fill or wrap 3D shapes. The answer picks cross-section × length for prisms (volume) and memorised forms for pointed/round solids — with thirds where they belong.

### Method
1. Prisms/cylinders: volume = cross-section area × length (cylinder \(r = 3\), \(h = 10\): \(\pi \times 9 \times 10 ≈ 282.7\)).
2. Pyramids/cones: ONE THIRD of the matching prism (cone: \(\frac{1}{3}\pi r^2 h\)).
3. Spheres: volume \(\frac{4}{3}\pi r^3\) (\(r = 3\): \(36\pi ≈ 113.1\)); surface \(4\pi r^2\).
4. Check: pointed < matching prism (third!), spheres beat their boxes — compare against the enclosing shape.

### Worked example
Sphere radius 3: \(\frac{4}{3} \times \pi \times 27 = 36\pi ≈ 113.1\). Check against the 6×6×6 box (216): the sphere fills just over half ✓ — plausible occupation, verified.

### Traps
- Missing thirds. Cones and pyramids without \(\frac{1}{3}\) triple the truth — pointed means thirded.
- Radius-diameter swaps. Halve diameters before cubing — errors cube too (×8 for a doubled radius).
- Curved-only surfaces. Total surface ADDS the base(s) — lateral alone answers a different question.
- \(r^2\) for \(r^3\). Spheres cube — squaring answers a circle's area, not a ball's volume.

### Timing
Short answers: 2-4 minutes, 2-4 marks. Formula with numbers (marks), third/power honoured (the answer mark).$teach$, 4),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'mensuration-area-and-volume'), '0580 5.5a', $st$Solve compound-shape problems by splitting into parts or subtracting cut-outs.$st$, $teach$### What is being asked
Measure shapes made of shapes. The answer draws the split lines (or the minus): add parts, or subtract holes — every region counted exactly once.

### Method
1. Add shapes sharing edges: rectangle + semicircle (\(32 + 8\pi ≈ 57.1\)).
2. Subtract cut-outs from wholes: 10×8 minus 4×3 gives \(80 - 12 = 68\).
3. Halves and quarters of circles need their fraction stated (semicircle = \(\frac{1}{2}\pi r^2\)).
4. Check by rough total: parts sum near the enclosing rectangle — wild overshoots confess double-counting.

### Worked example
8×4 rectangle topped with a semicircle of radius 4: \(32 + \frac{1}{2}\pi(16) = 32 + 25.1 = 57.1\). Check: the shape fits in 8×8 = 64 and exceeds 32 ✓ — bounded both sides, verified.

### Traps
- Full circles added. Semicircles halve — whole-circle addition doubles the round part.
- Cut-outs added. Holes SUBTRACT — adding them double-counts the missing region.
- Shared edges double-counted. Splits share boundaries — perimeters of parts are NOT the compound perimeter.
- Radius from diameter unhalved. The semicircle's radius is half the rectangle's width — halve before squaring.

### Timing
Structured: 3-4 minutes, 3-4 marks. Split/subtract stated (a mark), each part (marks), total (a mark).$teach$, 5)
on conflict (topic_id, code) do update set
  statement = excluded.statement,
  teach = excluded.teach,
  sort_order = excluded.sort_order;
delete from public.quizzes
 where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'mensuration-area-and-volume') and title = 'Checkpoints — Area & Volume';
insert into public.quizzes (id, topic_id, title, description, is_published, exam_type)
values ('00000000-0000-0000-0000-000000000000', (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'mensuration-area-and-volume'), 'Checkpoints — Area & Volume', $desc$Short checks, one set per objective in this topic. Answer one wrongly and the objective it belongs to is the thing to revisit — not the whole topic.$desc$, true, 'quiz');
insert into public.questions
  (quiz_id, question_text, options, correct_option, explanation, difficulty, sort_order, objective_id, statement_id)
values
('00000000-0000-0000-0000-000000000000', $qt$Convert 2.5 m² to cm².$qt$, $opts$["250 cm²","25,000 cm²","2,500 cm²","25 cm²"]$opts$::jsonb, 1, $ex$\(2.5 \times 10{,}000 = 25{,}000\). 250 uses the length factor; 2,500 halves a power; 25 converts nothing.$ex$, 'check', 101, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'mensuration-area-and-volume') and code = '0580 5.1a'), null),
('00000000-0000-0000-0000-000000000000', $qt$How many cm³ are in 3 m³?$qt$, $opts$["300","30,000","300,000","3,000,000"]$opts$::jsonb, 3, $ex$\(3 \times 100^3 = 3{,}000{,}000\). The others apply length, area, or partial factors to a volume.$ex$, 'check', 102, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'mensuration-area-and-volume') and code = '0580 5.1a'), null),
('00000000-0000-0000-0000-000000000000', $qt$A trapezium has parallel sides 6 cm and 10 cm, height 4 cm. Find its area.$qt$, $opts$["32 cm²","64 cm²","40 cm²","16 cm²"]$opts$::jsonb, 0, $ex$\(\frac{1}{2} \times 16 \times 4 = 32\). 64 skips the half; 40 averages wrongly; 16 halves twice.$ex$, 'check', 201, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'mensuration-area-and-volume') and code = '0580 5.2a'), null),
('00000000-0000-0000-0000-000000000000', $qt$A triangle has base 9 cm and vertical height 7 cm. Find its area.$qt$, $opts$["63 cm²","16 cm²","31.5 cm²","30 cm²"]$opts$::jsonb, 2, $ex$\(\frac{1}{2} \times 9 \times 7 = 31.5\). 63 is the unhalved rectangle; 16 adds; 30 rounds wrongly.$ex$, 'check', 202, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'mensuration-area-and-volume') and code = '0580 5.2a'), null),
('00000000-0000-0000-0000-000000000000', $qt$A circle has radius 5 cm. Find its circumference.$qt$, $opts$["15.7 cm","78.5 cm","31.4 cm","62.8 cm"]$opts$::jsonb, 2, $ex$\(2\pi(5) ≈ 31.4\). 15.7 is \(\pi r\) (half); 78.5 is the area; 62.8 doubles.$ex$, 'check', 301, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'mensuration-area-and-volume') and code = '0580 5.3a'), null),
('00000000-0000-0000-0000-000000000000', $qt$A sector has radius 6 cm and angle 90°. Find its area.$qt$, $opts$["28.3 cm²","113.1 cm²","9.4 cm²","56.5 cm²"]$opts$::jsonb, 0, $ex$Quarter of \(\pi(36)\): 28.3. 113.1 is the whole circle; 56.5 is half; 9.4 mis-divides.$ex$, 'check', 302, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'mensuration-area-and-volume') and code = '0580 5.3a'), null),
('00000000-0000-0000-0000-000000000000', $qt$A cylinder has radius 3 cm and height 10 cm. Find its volume.$qt$, $opts$["94.2 cm³","188.5 cm³","60 cm³","282.7 cm³"]$opts$::jsonb, 3, $ex$\(\pi \times 9 \times 10 ≈ 282.7\). 94.2 forgets to square r; 188.5 is the curved surface area; 60 drops π and powers.$ex$, 'check', 401, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'mensuration-area-and-volume') and code = '0580 5.4a'), null),
('00000000-0000-0000-0000-000000000000', $qt$A sphere has radius 3 cm. Find its volume.$qt$, $opts$["37.7 cm³","113.1 cm³","339.3 cm³","150.8 cm³"]$opts$::jsonb, 1, $ex$\(\frac{4}{3}\pi(27) ≈ 113.1\). 37.7 uses \(r^2\); 339.3 cubes twice; 150.8 squares the diameter instead.$ex$, 'check', 402, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'mensuration-area-and-volume') and code = '0580 5.4a'), null),
('00000000-0000-0000-0000-000000000000', $qt$An L-shape is a 10 by 8 rectangle with a 4 by 3 corner cut out. Find its area.$qt$, $opts$["92","68","80","56"]$opts$::jsonb, 1, $ex$\(80 - 12 = 68\). 92 adds the hole; 80 ignores it; 56 subtracts it twice.$ex$, 'check', 501, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'mensuration-area-and-volume') and code = '0580 5.5a'), null),
('00000000-0000-0000-0000-000000000000', $qt$An 8 by 4 rectangle has a semicircle of radius 4 on one 8-side. Find the total area.$qt$, $opts$["32","82.3","57.1","44.6"]$opts$::jsonb, 2, $ex$\(32 + \frac{1}{2}\pi(16) ≈ 57.1\). 32 drops the semicircle; 82.3 adds a whole circle; 44.6 quarters it.$ex$, 'check', 502, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'mensuration-area-and-volume') and code = '0580 5.5a'), null),
('00000000-0000-0000-0000-000000000000', $qt$A cone has radius 6 cm and height 8 cm. Find its volume.$qt$, $opts$["301.6 cm³","904.8 cm³","150.8 cm³","100.5 cm³"]$opts$::jsonb, 0, $ex$Marks as awarded: \(\frac{1}{3}\pi(36)(8)\) set up [1]; 301.6 stated [1]. 904.8 skips the third; 150.8 halves; 100.5 thirds twice.$ex$, 'exam', 900, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'mensuration-area-and-volume') and code = '0580 5.4a'), (select id from public.syllabus_statements where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'mensuration-area-and-volume') and code = '5.4')),
('00000000-0000-0000-0000-000000000000', $qt$Find the arc length with radius 10 cm and sector angle 72°.$qt$, $opts$["62.8 cm","125.6 cm","6.3 cm","12.6 cm"]$opts$::jsonb, 3, $ex$Marks as awarded: fraction \(\frac{72}{360} = \frac{1}{5}\) of \(20\pi\) [1]; 12.6 stated [1]. 62.8 is the whole circumference; 125.6 doubles; 6.3 halves.$ex$, 'exam', 901, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'mensuration-area-and-volume') and code = '0580 5.3a'), (select id from public.syllabus_statements where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'mensuration-area-and-volume') and code = '5.3'));
