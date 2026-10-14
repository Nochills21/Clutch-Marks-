insert into public.learning_objectives (topic_id, code, statement, teach, sort_order)
values
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-graphs'), '0580 2.9a', $st$Interpret travel and practical graphs, reading distance-time and speed-time correctly.$st$, $teach$### What is being asked
Read a story from a graph. The answer matches each section's SHAPE to motion: slope means speed, flat means stopped, area means distance.

### Method
1. Distance-time: slope = speed (steeper is faster); flat = stationary; downhill toward zero = returning.
2. Speed-time: slope = acceleration; flat = steady speed; AREA under the graph = distance travelled.
3. Never swap the two: area means nothing on distance-time; slope means nothing... slope means speed there — keep each graph's dictionary separate.
4. Check units on both axes before reading a single value.

### Worked example
A distance-time graph climbs, flattens for 20 minutes, then falls to zero: outbound journey, a 20-minute stop, return home. Check: the flat section sits above zero (stopped away from home); the fall ends at zero (home) — position and story agree.

### Traps
- Uphill as faster always. Steeper is faster; gentle still moves — compare slopes, don't admire height.
- Flat speed-time as stopped. Flat speed means STEADY motion (area still accumulates); only zero speed stops.
- Returning misread. Distance-time falling to zero returns; speed-time cannot show return at all — know each graph's limits.
- Axis units ignored. Minutes versus hours rescale every speed — read axes first, values second.

### Timing
Short answers: 2-3 minutes, 2-3 marks. One mark per section described — narrate the whole journey.$teach$, 1),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-graphs'), '0580 2.10a', $st$Plot graphs of linear and quadratic functions from tables of values.$st$, $teach$### What is being asked
Turn a rule into points, then points into a graph. The answer substitutes carefully — brackets around negatives — and joins appropriately (ruler for lines, smooth curve for quadratics).

### Method
1. Build the table: \(x = -2, -1, 0, 1, 2\); compute each \(y\) (\(y = 2x + 1\) gives −3, −1, 1, 3, 5).
2. Plot every point with an ×; lines join with a ruler, quadratics with a smooth curve through ALL points.
3. Quadratics need enough points each side of the turning point — symmetric \(x\) values reveal the U.
4. Check: substitute one plotted point back into the rule — it must satisfy it exactly.

### Worked example
\(y = x^2\), table −2..2: 4, 1, 0, 1, 4 — symmetric U through the origin. Check: \((-2)^2 = 4\) ✓ and the curve bottoms at (0, 0), never below — squaring forbids negatives.

### Traps
- Unbracketed negatives. \((-2)^2 = 4\) but \(-2^2 = -4\) — brackets decide the sign before squaring.
- Ruler through quadratics. Straight segments between U-points corner the turning point — smooth curves only.
- Too few points. Two points define a line but strangle a curve — five or more across the turning point.
- Mis-scaled axes. One square per unit both ways, or the shape distorts and reads wrong.

### Timing
Structured: 4-6 minutes, 4-6 marks. Table (marks), plotting (marks), joining (a mark) — rush none.$teach$, 2),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-graphs'), '0580 2.10b', $st$Solve equations graphically using roots, turning points and intersections.$st$, $teach$### What is being asked
Read solutions OFF a drawn graph. The answer is x-values where the curve meets the target: the x-axis for roots, another line for simultaneous solutions.

### Method
1. Roots of \(f(x) = 0\): x-intercepts of the curve (\(y = x^2 - 4\) crosses at \(x = 2\) and \(x = -2\)).
2. Turning point: the U's bottom (or ∩'s top) — minimum \((0, -4)\) here; read both coordinates.
3. Intersections solve simultaneously: where \(y = x^2 - 4\) meets \(y = 1\), read the x-values.
4. Check by substituting each read-off value back into the equation — graphs read approximately, algebra confirms.

### Worked example
Roots of \(x^2 - 4 = 0\) from \(y = x^2 - 4\): the curve cuts the x-axis at −2 and 2. Check: \((-2)^2 - 4 = 0\) ✓ and \(2^2 - 4 = 0\) ✓ — both intercepts satisfy the equation.

### Traps
- Reading y-values as answers. Equations in x need X-coordinates — the intercept's y is always 0, never the solution.
- One root only. Quadratics usually cut twice — find both intercepts before finishing.
- Turning point as root. The minimum \((0, -4)\) sits OFF the axis — vertices solve optimisation, not equations.
- Wrong line intersected. \(x^2 - 4 = 1\) meets \(y = 1\), not the x-axis — draw (or imagine) the right target.

### Timing
Short answers: 2-3 minutes, 2 marks. Intercepts for roots, intersections for systems — target first, read second.$teach$, 3),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-graphs'), '0580 2.11a', $st$Sketch cubic, reciprocal and exponential curves, identifying their key features.$st$, $teach$### What is being asked
Recognise or sketch \(x^3\), \(1/x\) and growth curves. The answer captures the SHAPE's signature — sign behaviour, asymptotes, flattening or explosion.

### Method
1. Cubic \(y = x^3\): passes through origin, negative-left stays negative, rises ever steeper right — point symmetry about (0,0).
2. Reciprocal \(y = 1/x\): never touches either axis (asymptotes); positive branch falls toward both axes; negative branch mirrors in the third quadrant.
3. Exponential growth (\(y = 2^x\)): passes (0, 1), flattens toward \(y = 0\) left, explodes right.
4. Check three landmarks per sketch: intercepts, behaviour at extremes, and any asymptote.

### Worked example
Sketch \(y = 1/x\) for \(x > 0\): starts high near \(x = 0^+\) (\(1/0.1 = 10\)), falls through (1, 1), and hugs the x-axis (\(1/100 = 0.01\)) without touching. Check: positive inputs give positive outputs (first quadrant only); both axes are approached, neither met.

### Traps
- Reciprocal touching axes. \(1/x\) never equals 0 and \(x = 0\) is undefined — asymptotes, not crossings.
- Cubic as parabola. \(x^3\) keeps sign (negative stays negative); \(x^2\) folds everything positive — different symmetries entirely.
- Exponential through origin. \(2^0 = 1\), not 0 — growth curves cross the y-axis at 1.
- Straight-line sketches. Curves bend — rulers belong to linear questions only.

### Timing
Short answers: 2-3 minutes, 2-3 marks. Landmarks first (intercepts, asymptotes), curve through them second.$teach$, 4),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-graphs'), '0580 2.12a', $st$Estimate gradients of curves using tangents, and areas under graphs (Extended only).$st$, $teach$### What is being asked
Read a curve's RATE (tangent slope) or TOTAL (area beneath). The answer draws straight helpers on curved questions — tangent lines, trapezia — and measures those. (Extended only.)

### Method
1. Gradient at a point: draw the tangent (touching once), pick two widely spaced points on IT, compute rise ÷ run.
2. Chord between two points gives AVERAGE rate over the interval — different question, different line.
3. Area under speed-time = distance: count squares or split into trapezia/triangles (constant 12 m/s for 5 s: rectangle \(12 \times 5 = 60\) m).
4. Check scale on both axes — tangent slopes and areas inherit every unit both axes carry.

### Worked example
Gradient of \(y = x^2\) at \(x = 2\): tangent touches (2, 4); through (0, -4) and (4, 12): rise 16 over run 4 — gradient 4. The exact rate is \(2x = 4\). Exam tangents drawn carefully give 3.5–4.5; check by bracketing: chord (1,1)-(3,9) gives 4 exactly, confirming the neighbourhood.

### Traps
- Tangent through two curve points. Secants average; tangents touch once — one crossing point, not two.
- Close-together tangent points. Wide spacing dilutes reading error; adjacent squares magnify it.
- Area as slope (or reverse). Under means accumulate (distance); slope means rate (acceleration) — the question's verb decides. (Extended only.)
- Forgetting axes scales. Non-uniform grids rescale rise and run separately — count values, not squares.

### Timing
Structured: 3-4 minutes, 3-4 marks. Tangent drawn (a mark), wide points read (a mark), division (a mark).$teach$, 5),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-graphs'), '0580 3.1a', $st$Plot and identify coordinates in all four quadrants, including points on the axes.$st$, $teach$### What is being asked
Place or name a point \((x, y)\). The answer walks ALONG first (x), then UP (y) — order is the whole skill.

### Method
1. x first (right positive, left negative), then y (up positive, down negative): (−3, 2) walks left 3, up 2 — top-left, Quadrant II.
2. Quadrants: top-right I (+,+), top-left II (−,+), bottom-left III (−,−), bottom-right IV (+,−).
3. Axis points carry a zero: (0, 5) sits ON the y-axis; (5, 0) ON the x-axis.
4. Check by reversing wrongly on purpose: (2, −3) is NOT (−3, 2) — order changes everything.

### Worked example
(−3, 2): x = −3 (left), y = 2 (up) — top-left, Quadrant II. Check: flipping to (2, −3) lands bottom-right (IV) — the same digits, a different continent.

### Traps
- y-first plotting. Up-then-along mirrors every point across \(y = x\) — x always leads.
- Quadrant numbering guessed. I, II, III, IV run anticlockwise from top-right — counting clockwise inverts II and IV.
- Axis points in quadrants. (0, 5) belongs to NO quadrant — axes are boundaries, not regions.
- Sign of zero. Zero is neither positive nor negative — (0, −5) is still y-axis, full stop.

### Timing
Short answers: 1 minute, 1 mark. Along-then-up, said aloud, every time.$teach$, 6),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-graphs'), '0580 3.2a', $st$Draw straight-line graphs from equations and read intercepts and gradients from them.$st$, $teach$### What is being asked
Convert \(y = mx + c\) into a line (or back). The answer anchors at the y-intercept, then steps by the gradient — three points minimum.

### Method
1. Mark \(c\) on the y-axis: \(y = -x + 2\) starts at (0, 2).
2. Step by gradient: −1 means down 1 per 1 across — (1, 1), (2, 0) follow.
3. Table-check a third point before ruling the line through.
4. Read back: intercept where it cuts \(y\); gradient as rise ÷ run between two grid points.

### Worked example
\(y = -x + 2\): intercept (0, 2); gradient −1 steps to (2, 0). Check via table: \(x = 0 → 2\), \(x = 1 → 1\), \(x = 2 → 0\) — three collinear agreements before the ruler.

### Traps
- Starting at the gradient. The intercept anchors; the gradient steps — reversed roles tilt every line.
- One step only. Two points define a line but hide arithmetic slips — three points expose them.
- Reading gradient off one square. Rise ÷ run needs two definite points — single-square eyeballing drifts.
- Joining beyond the data. Extend with the ruler's edge, but mark only the asked segment boldly.

### Timing
Short answers: 2-3 minutes, 2-3 marks. Intercept (a mark), gradient steps with check point (marks).$teach$, 7),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-graphs'), '0580 3.3a', $st$Calculate the gradient of a line from two points or from its graph.$st$, $teach$### What is being asked
Find steepness as rise ÷ run. The answer subtracts consistently — y-difference over x-difference, same point order top and bottom.

### Method
1. Formula: \(m = \frac{y_2 - y_1}{x_2 - x_1}\). For (1, 2) and (5, 10): \(\frac{10-2}{5-1} = \frac{8}{4} = 2\).
2. Keep subtraction order identical above and below — mixed orders flip the sign.
3. From graphs: pick two grid-exact points, count rise over run (3 up per 2 across gives \(\frac{3}{2}\)).
4. Check sign against the picture: climbing left-to-right means positive — downhill answers on uphill lines confess error.

### Worked example
(1, 2) to (5, 10): rise 8, run 4, gradient 2. Check: line through (1, 2) with slope 2 reaches \(2 + 2(4) = 10\) at \(x = 5\) ✓ — the formula rebuilds the second point.

### Traps
- Run over rise. \(\frac{4}{8} = \frac{1}{2}\) inverts steepness — rise ALWAYS crowns the fraction.
- Rise-only answers. 8 counts the climb but ignores the 4-across — gradients are rates, not distances.
- Mixed subtraction order. \(\frac{10-2}{1-5}\) negates correctly-computed values into −2.
- Sign unchecked. A falling line with a computed +2 means the subtraction slipped — look at the picture.

### Timing
Short answers: 2 minutes, 2 marks. Ordered subtraction (the method mark), simplified value (the answer mark).$teach$, 8),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-graphs'), '0580 3.4a', $st$Find the midpoint and length of a line segment from its endpoints (Extended only).$st$, $teach$### What is being asked
Average the endpoints for the middle, or Pythagoras the gaps for the size. The answer treats x and y as separate one-dimensional problems. (Extended only.)

### Method
1. Midpoint: average each coordinate: (2, 4) and (6, 10) give \(\left(\frac{2+6}{2}, \frac{4+10}{2}\right) = (4, 7)\).
2. Length: differences become legs: (6, 8) from origin spans legs 6 and 8, so \(\sqrt{36 + 64} = 10\).
3. General length: \(\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}\) — square each gap BEFORE adding.
4. Check midpoint by symmetry (equal gaps each side); check length against a rough ruler estimate.

### Worked example
Segment (0, 0) to (6, 8): midpoint \((3, 4)\); length \(\sqrt{6^2 + 8^2} = \sqrt{100} = 10\). Check: (3, 4) sits 5 from each end (\(\sqrt{9+16} = 5\)), and \(5 + 5 = 10\) — halves consistent with the whole.

### Traps
- Adding endpoints for midpoints. (8, 14) doubles instead of averaging — midpoints divide by 2, always.
- Rooting before adding. \(\sqrt{36} + \sqrt{64} = 14\) is NOT \(\sqrt{100}\) — add first, root last. (Extended only.)
- Coordinates averaged together. x-average uses x's only — mixing axes answers a different question.
- Unsigned gaps. Squaring erases direction anyway, but subtracting in consistent order keeps working readable.

### Timing
Short answers: 2-3 minutes, 2-3 marks. Midpoint averaging (a mark), Pythagoras structure (marks).$teach$, 9),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-graphs'), '0580 3.5a', $st$Find the equation y = mx + c of a line from its graph or two points.$st$, $teach$### What is being asked
Name a line as \(y = mx + c\). The answer finds slope first (differences), then anchors with one point to fix \(c\).

### Method
1. Gradient from two points: (0, 1) and (2, 7) give \(m = \frac{7-1}{2-0} = 3\).
2. Intercept read directly if (0, c) is known (\(c = 1\) here) — else substitute one point: \(5 = 3(1) + c\) gives \(c = 2\).
3. Assemble: \(y = 3x + 1\). Every equation gets both numbers from evidence, never memory.
4. Check: BOTH points satisfy the equation — test the unused one (\(3(2)+1 = 7\) ✓).

### Worked example
Through (1, 5) and (3, 11): \(m = \frac{11-5}{3-1} = 3\); using (1, 5): \(5 = 3 + c\), so \(c = 2\): \(y = 3x + 2\). Check: \(3(3) + 2 = 11\) ✓ — the second point confirms intercept and slope together.

### Traps
- Intercept eyeballed at non-zero x. Only (0, c) reads \(c\) directly — other points need substitution.
- Gradient sign flipped. Falling lines carry negative \(m\) — check against the picture before assembling.
- One-point equations. Slope plus ONE point still needs the substitution step — never guess \(c\).
- Untested assembly. The second point exists to verify — skipping it leaves sign slips hiding.

### Timing
Short answers: 2-3 minutes, 2-3 marks. Gradient (a mark), intercept via substitution (a mark).$teach$, 10),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-graphs'), '0580 3.6a', $st$Identify parallel lines by equal gradients and use them in problems.$st$, $teach$### What is being asked
Spot or build lines that never meet. The answer checks ONE number: equal gradients (intercepts must differ).

### Method
1. Parallel means same \(m\): \(y = 2x + 1\) runs parallel to \(y = 2x - 5\) (intercepts 1 and −5 differ, so distinct lines).
2. Same gradient AND same intercept means the SAME line, not parallel lines.
3. Build through a point: keep \(m\), substitute the point for \(c\) (parallel to \(y = 4x - 3\) through (0, 2): \(y = 4x + 2\)).
4. Check: different \(c\) confirmed, \(m\) identical — both conditions, every time.

### Worked example
Parallel to \(y = 4x - 3\) through (0, 2): keep 4, anchor: \(2 = 4(0) + c\) gives \(c = 2\): \(y = 4x + 2\). Check: slopes match (4 = 4 ✓), intercepts differ (−3 ≠ 2 ✓) — parallel and distinct.

### Traps
- Same intercept claimed parallel. \(y = 2x + 1\) and \(y = 5x + 1\) MEET at (0, 1) — shared points are intersections, not parallelism.
- Identical lines called parallel. Same \(m\) and same \(c\) is one line twice — parallelism needs distinct lines.
- Keeping \(c\) instead of \(m\). Through-point construction preserves SLOPE; the intercept must move to the point.
- Sign slips in \(m\). \(-2x\) never parallels \(2x\) — compare signed gradients exactly.

### Timing
Short answers: 1-2 minutes, 1-2 marks. Gradient equality stated (the mark), distinctness checked.$teach$, 11),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-graphs'), '0580 3.7a', $st$Identify perpendicular lines using gradients that multiply to −1 (Extended only).$st$, $teach$### What is being asked
Spot or build lines meeting at right angles. The answer flips AND negates: perpendicular gradients are negative reciprocals (product −1). (Extended only.)

### Method
1. Test: \(m_1 \times m_2 = -1\)? \(2 \times (-\frac{1}{2}) = -1\) — perpendicular confirmed.
2. Build: flip the fraction and change the sign (\(2 → -\frac{1}{2}\); \(-3 → \frac{1}{3}\)); horizontal meets vertical as the extreme case.
3. Halves most missed: reciprocal alone (\(\frac{1}{2}\)) is NOT enough — the minus is half the condition.
4. Check with axes intuition: steep-up meets gentle-down — same-sign slopes never qualify.

### Worked example
Perpendicular to \(y = 2x + 1\): need \(m = -\frac{1}{2}\), e.g. \(y = -\frac{1}{2}x + 4\). Check: \(2 \times (-\frac{1}{2}) = -1\) ✓ — flipped, negated, product verified.

### Traps
- Reciprocal without negation. \(y = \frac{1}{2}x - 1\) meets \(y = 2x + 1\) at an acute angle — the missing minus costs everything.
- Negation without reciprocal. \(y = -2x + 1\) mirrors steepness wrongly — both operations, always. (Extended only.)
- Parallel confused in. Equal slopes never multiply to −1 (except \(\pm i\), never examined) — different tests, different answers.
- Vertical/horizontal forgotten. \(x = 3\) meets \(y = 1\) squarely with no gradients to multiply — the edge case that still counts.

### Timing
Short answers: 2 minutes, 2 marks. Negative reciprocal stated (the mark), applied (the mark).$teach$, 12)
on conflict (topic_id, code) do update set
  statement = excluded.statement,
  teach = excluded.teach,
  sort_order = excluded.sort_order;
delete from public.quizzes
 where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-graphs') and title = 'Checkpoints — Graphs';
insert into public.quizzes (id, topic_id, title, description, is_published, exam_type)
values ('00000000-0000-0000-0000-000000000000', (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-graphs'), 'Checkpoints — Graphs', $desc$Short checks, one set per objective in this topic. Answer one wrongly and the objective it belongs to is the thing to revisit — not the whole topic.$desc$, true, 'quiz');
insert into public.questions
  (quiz_id, question_text, options, correct_option, explanation, difficulty, sort_order, objective_id, statement_id)
values
('00000000-0000-0000-0000-000000000000', $qt$On a distance-time graph, a flat (horizontal) section means what?$qt$, $opts$["Stopped","Moving faster","Returning to the start","Speeding up"]$opts$::jsonb, 0, $ex$Flat means no distance change — stationary. Steeper slope means faster; falling toward zero means returning; neither describes flat.$ex$, 'check', 101, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-graphs') and code = '0580 2.9a'), null),
('00000000-0000-0000-0000-000000000000', $qt$What does the area under a speed-time graph give?$qt$, $opts$["Acceleration","Time taken","Distance travelled","Top speed"]$opts$::jsonb, 2, $ex$Area accumulates speed over time into distance. Acceleration is the slope; time and speed read off the axes directly.$ex$, 'check', 102, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-graphs') and code = '0580 2.9a'), null),
('00000000-0000-0000-0000-000000000000', $qt$If \(y = 2x + 1\), what is \(y\) when \(x = 4\)?$qt$, $opts$["6","9","7","12"]$opts$::jsonb, 1, $ex$\(2(4) + 1 = 9\). 6 doubles wrongly; 7 adds instead; 12 mis-combines the operations.$ex$, 'check', 201, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-graphs') and code = '0580 2.10a'), null),
('00000000-0000-0000-0000-000000000000', $qt$The graph of \(y = x^2\) passes through which point?$qt$, $opts$["\\((-2, -4)\\)","\\((3, 6)\\)","\\((1, 2)\\)","\\((-3, 9)\\)"]$opts$::jsonb, 3, $ex$\((-3)^2 = 9\). Squares are never negative (kills the first); 3² = 9 not 6; 1² = 1 not 2.$ex$, 'check', 202, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-graphs') and code = '0580 2.10a'), null),
('00000000-0000-0000-0000-000000000000', $qt$The graph of \(y = x^2 - 4\) crosses the x-axis at which x-values?$qt$, $opts$["\\(x = 4\\) only","\\(x = -4\\) only","\\(x = 2\\) and \\(x = -2\\)","\\(x = 0\\) only"]$opts$::jsonb, 2, $ex$\(x^2 = 4\) gives \(x = \pm 2\). ±4 squares to 16, not 4; 0 gives −4, not zero.$ex$, 'check', 301, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-graphs') and code = '0580 2.10b'), null),
('00000000-0000-0000-0000-000000000000', $qt$What is the turning point of \(y = x^2 - 4\), and what type?$qt$, $opts$["\\((0, -4)\\), minimum","\\((0, 4)\\), maximum","\\((2, 0)\\), minimum","\\((-2, 0)\\), maximum"]$opts$::jsonb, 0, $ex$Vertex at (0, −4), and \(x^2\) opens upward — minimum. The axis points are roots, not the vertex; maxima belong to ∩ shapes.$ex$, 'check', 302, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-graphs') and code = '0580 2.10b'), null),
('00000000-0000-0000-0000-000000000000', $qt$Which best describes \(y = 1/x\) for \(x > 0\)?$qt$, $opts$["A straight line","A U-shaped parabola","A V-shape through the origin","A curve falling toward both axes"]$opts$::jsonb, 3, $ex$Positive-branch hyperbola: high near zero, hugging the x-axis rightward, touching neither axis. Lines, parabolas and V-shapes miss the asymptotes.$ex$, 'check', 401, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-graphs') and code = '0580 2.11a'), null),
('00000000-0000-0000-0000-000000000000', $qt$As x increases, \(y = x^3\) always does what?$qt$, $opts$["Decreases","Increases","Stays at zero","Oscillates"]$opts$::jsonb, 1, $ex$Cubing preserves order: bigger x means bigger \(x^3\), through negatives, zero and positives alike. Decrease, flatness and oscillation contradict monotonic growth.$ex$, 'check', 402, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-graphs') and code = '0580 2.11a'), null),
('00000000-0000-0000-0000-000000000000', $qt$The tangent to \(y = x^2\) at \(x = 2\) has gradient nearest to what?$qt$, $opts$["2","4","8","1"]$opts$::jsonb, 1, $ex$Rate \(2x = 4\) at \(x = 2\). 2 reads the x-value; 8 cubes; 1 guesses flat.$ex$, 'check', 501, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-graphs') and code = '0580 2.12a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Speed rises steadily from 0 to 20 m/s over 10 s. How far is travelled?$qt$, $opts$["200 m","20 m","100 m","10 m"]$opts$::jsonb, 2, $ex$Triangle area: \(\frac{1}{2} \times 10 \times 20 = 100\) m. 200 assumes constant top speed; the others misplace factors of ten.$ex$, 'check', 502, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-graphs') and code = '0580 2.12a'), null),
('00000000-0000-0000-0000-000000000000', $qt$The point (−3, 2) lies in which quadrant?$qt$, $opts$["Top-left (Quadrant II)","Top-right (Quadrant I)","Bottom-left (Quadrant III)","Bottom-right (Quadrant IV)"]$opts$::jsonb, 0, $ex$x negative, y positive — top-left, II. The other three mismatch at least one sign.$ex$, 'check', 601, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-graphs') and code = '0580 3.1a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Which point lies on the y-axis?$qt$, $opts$["\\((5, 0)\\)","\\((5, 5)\\)","\\((-5, 0)\\)","\\((0, 5)\\)"]$opts$::jsonb, 3, $ex$y-axis means x = 0: (0, 5). (5, 0) and (−5, 0) sit on the x-axis; (5, 5) sits in Quadrant I.$ex$, 'check', 602, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-graphs') and code = '0580 3.1a'), null),
('00000000-0000-0000-0000-000000000000', $qt$The line \(y = -x + 2\) crosses the y-axis at what value?$qt$, $opts$["-1","0","2","-2"]$opts$::jsonb, 2, $ex$y-intercept is c = 2. −1 is the gradient; 0 is the x-intercept; −2 flips the sign.$ex$, 'check', 701, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-graphs') and code = '0580 3.2a'), null),
('00000000-0000-0000-0000-000000000000', $qt$What is the gradient of \(y = -x + 2\)?$qt$, $opts$["2","-1","1","0"]$opts$::jsonb, 1, $ex$Coefficient of x: −1 (falls 1 per step). 2 is the intercept; 1 drops the minus; 0 claims flatness.$ex$, 'check', 702, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-graphs') and code = '0580 3.2a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Find the gradient of the line through (1, 2) and (5, 10).$qt$, $opts$["\\(\\frac{1}{2}\\)","8","4","2"]$opts$::jsonb, 3, $ex$\(\frac{10-2}{5-1} = \frac{8}{4} = 2\). \(\frac{1}{2}\) inverts; 8 is rise-only; 4 mis-divides.$ex$, 'check', 801, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-graphs') and code = '0580 3.3a'), null),
('00000000-0000-0000-0000-000000000000', $qt$A line rises 3 units for every 2 units across. What is its gradient?$qt$, $opts$["\\(\\frac{3}{2}\\)","\\(\\frac{2}{3}\\)","5","1"]$opts$::jsonb, 0, $ex$Rise over run: \(\frac{3}{2}\). \(\frac{2}{3}\) inverts; 5 adds; 1 assumes 45 degrees.$ex$, 'check', 802, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-graphs') and code = '0580 3.3a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Find the midpoint of (2, 4) and (6, 10).$qt$, $opts$["\\((4, 6)\\)","\\((4, 7)\\)","\\((8, 14)\\)","\\((3, 5)\\)"]$opts$::jsonb, 1, $ex$\(\left(\frac{2+6}{2}, \frac{4+10}{2}\right) = (4, 7)\). (8, 14) adds without halving; the others mis-average one coordinate.$ex$, 'check', 901, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-graphs') and code = '0580 3.4a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Find the length of the segment from (0, 0) to (6, 8).$qt$, $opts$["14","48","10","7"]$opts$::jsonb, 2, $ex$\(\sqrt{6^2 + 8^2} = \sqrt{100} = 10\). 14 roots before adding; 48 squares wrongly; 7 halves the answer.$ex$, 'check', 902, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-graphs') and code = '0580 3.4a'), null),
('00000000-0000-0000-0000-000000000000', $qt$A line has gradient 3 and passes through (0, −2). What is its equation?$qt$, $opts$["\\(y = 3x - 2\\)","\\(y = -3x - 2\\)","\\(y = -2x + 3\\)","\\(y = 2x - 3\\)"]$opts$::jsonb, 0, $ex$\(m = 3\), \(c = -2\): \(y = 3x - 2\). The others flip the slope, swap the roles, or invent numbers.$ex$, 'check', 1001, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-graphs') and code = '0580 3.5a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Find the equation of the line through (0, 1) and (2, 7).$qt$, $opts$["\\(y = 4x + 1\\)","\\(y = 3x + 7\\)","\\(y = 2x + 1\\)","\\(y = 3x + 1\\)"]$opts$::jsonb, 3, $ex$\(m = \frac{7-1}{2} = 3\), \(c = 1\): \(y = 3x + 1\). The first mis-divides; the second anchors at the wrong point; the third halves the slope.$ex$, 'check', 1002, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-graphs') and code = '0580 3.5a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Which line is parallel to \(y = 2x + 1\)?$qt$, $opts$["\\(y = -2x + 1\\)","\\(y = 5x + 2\\)","\\(y = 2x - 5\\)","\\(y = x + 1\\)"]$opts$::jsonb, 2, $ex$Same gradient 2 with a different intercept. The first negates; the second steepens; the last flattens.$ex$, 'check', 1101, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-graphs') and code = '0580 3.6a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Find the line parallel to \(y = 4x - 3\) passing through (0, 2).$qt$, $opts$["\\(y = -4x + 2\\)","\\(y = 4x + 2\\)","\\(y = 4x - 3\\)","\\(y = 2x + 4\\)"]$opts$::jsonb, 1, $ex$Keep 4, anchor at (0, 2): \(c = 2\). The first flips slope; the third ignores the point; the last swaps both numbers.$ex$, 'check', 1102, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-graphs') and code = '0580 3.6a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Which line is perpendicular to \(y = 2x + 1\)?$qt$, $opts$["\\(y = 2x + 4\\)","\\(y = -2x + 1\\)","\\(y = \\frac{1}{2}x - 1\\)","\\(y = -\\frac{1}{2}x + 4\\)"]$opts$::jsonb, 3, $ex$\(2 \times (-\frac{1}{2}) = -1\). The first is parallel; the second negates without flipping; the third flips without negating.$ex$, 'check', 1201, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-graphs') and code = '0580 3.7a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Gradients −3 and k are perpendicular. Find k.$qt$, $opts$["\\(\\frac{1}{3}\\)","3","\\(-\\frac{1}{3}\\)","-3"]$opts$::jsonb, 0, $ex$\(-3k = -1\), so \(k = \frac{1}{3}\). 3 inverts wrongly; negatives repeat or mirror the given slope.$ex$, 'check', 1202, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-graphs') and code = '0580 3.7a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Find the equation of the line through (1, 5) and (3, 11).$qt$, $opts$["\\(y = 2x + 3\\)","\\(y = 3x + 2\\)","\\(y = 6x - 1\\)","\\(y = 3x + 5\\)"]$opts$::jsonb, 1, $ex$Marks as awarded: gradient \(\frac{11-5}{3-1} = 3\) [1]; intercept \(c = 2\) via (1, 5) [1]. The others mis-derive slope or anchor.$ex$, 'exam', 900, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-graphs') and code = '0580 3.5a'), (select id from public.syllabus_statements where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-graphs') and code = '3.5')),
('00000000-0000-0000-0000-000000000000', $qt$A car travels at a constant 12 m/s for 5 s. What distance is covered, and what does it equal on the graph?$qt$, $opts$["30 m","17 m","60 m","120 m"]$opts$::jsonb, 2, $ex$Marks as awarded: rectangle area \(12 \times 5\) identified [1]; 60 m stated [1]. 30 halves (triangle error on constant speed); 17 adds the axes; 120 doubles.$ex$, 'exam', 901, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-graphs') and code = '0580 2.12a'), (select id from public.syllabus_statements where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-graphs') and code = '2.12'));
