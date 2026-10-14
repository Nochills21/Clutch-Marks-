insert into public.learning_objectives (topic_id, code, statement, teach, sort_order)
values
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-inequalities'), '0580 2.6a', $st$Solve linear inequalities, remembering to reverse the sign when dividing by a negative.$st$, $teach$### What is being asked
Find the range of x satisfying an inequality. The answer solves like an equation — except multiplying or dividing by a negative FLIPS the sign.

### Method
1. Expand brackets and collect x on one side, numbers on the other — exactly as for equations.
2. Dividing (or multiplying) by a NEGATIVE number reverses the inequality: \(-2x \le -6\) gives \(x \ge 3\).
3. Dividing by a positive changes nothing: \(3x > 15\) gives \(x > 5\).
4. Check by testing a value inside your answer (\(x = 6\) in \(7 - 2x \le 1\): \(-5 \le 1\) ✓) and one outside.

### Worked example
\(7 - 2x \le 1\): subtract 7 to get \(-2x \le -6\), divide by −2 and FLIP: \(x \ge 3\). Check: \(x = 3\) gives \(1 \le 1\) ✓; \(x = 0\) gives \(7 \le 1\) ✗ — boundary and direction both verified.

### Traps
- Forgetting the flip. Dividing by −2 without reversing is the single most tested slip in the topic.
- Flipping on addition. Adding or subtracting NEVER flips — only × and ÷ by negatives.
- Reading the final sign backwards. \(x \ge 3\) means 3 and up — say it in words to check.
- Equation habits unchecked. Every inequality answer deserves its two test values; equations never needed them.

### Timing
Short answers: 2 minutes, 2 marks. The flip (or its deliberate absence) is the discriminating mark.$teach$, 1),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-inequalities'), '0580 2.6b', $st$Solve double inequalities and list integer solutions within a range.$st$, $teach$### What is being asked
Handle two bounds at once, or pick the whole numbers inside. The answer treats each end separately — strict stays strict, inclusive stays inclusive.

### Method
1. Double inequality: perform the SAME operation on all three parts: \(4 < 2x + 6 \le 14\) → subtract 6 → \(-2 < 2x \le 8\) → halve → \(-1 < x \le 4\).
2. Integer listing: \(-2 < x \le 3\) admits −1, 0, 1, 2, 3 — strict ends exclude, closed ends include.
3. Number-line sketch: open circle for strict (>, <), filled for inclusive (≥, ≤).
4. Check each end independently — most errors corrupt exactly one side.

### Worked example
\(-2 < x \le 3\), integers: −1, 0, 1, 2, 3. Check: −2 fails the strict test (excluded ✓); 3 satisfies ≤ (included ✓); nothing outside the five qualifies.

### Traps
- Including strict ends. −2 is NOT greater than −2 — strict means strictly.
- Operating on two parts only. The middle of a double inequality needs every operation too — all three parts, every step.
- Halving errors. \(-2 < 2x \le 8\) halves to \(-1 < x \le 4\) — each part divides, signs stay (positive divisor).
- Circles swapped. Open for >/<, filled for ≥/≤ — the sketch must match the symbols exactly.

### Timing
Short answers: 2-3 minutes, 2-3 marks. One mark per correct end — verify ends separately.$teach$, 2)
on conflict (topic_id, code) do update set
  statement = excluded.statement,
  teach = excluded.teach,
  sort_order = excluded.sort_order;
delete from public.quizzes
 where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-inequalities') and title = 'Checkpoints — Inequalities';
insert into public.quizzes (id, topic_id, title, description, is_published, exam_type)
values ('00000000-0000-0000-0000-000000000000', (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-inequalities'), 'Checkpoints — Inequalities', $desc$Short checks, one set per objective in this topic. Answer one wrongly and the objective it belongs to is the thing to revisit — not the whole topic.$desc$, true, 'quiz');
insert into public.questions
  (quiz_id, question_text, options, correct_option, explanation, difficulty, sort_order, objective_id, statement_id)
values
('00000000-0000-0000-0000-000000000000', $qt$Solve \(3x + 5 > 20\).$qt$, $opts$["\\(x > 5\\)","\\(x < 5\\)","\\(x > 15\\)","\\(x > 25\\)"]$opts$::jsonb, 0, $ex$\(3x > 15\), divide by positive 3: \(x > 5\). The second flips without cause; the third skips ÷3; the last adds instead.$ex$, 'check', 101, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-inequalities') and code = '0580 2.6a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Solve \(7 - 2x \le 1\).$qt$, $opts$["\\(x \\le 3\\)","\\(x \\le -3\\)","\\(x \\ge 3\\)","\\(x \\ge -3\\)"]$opts$::jsonb, 2, $ex$\(-2x \le -6\); dividing by −2 flips: \(x \ge 3\). Unflipped, sign-slipped and doubly-wrong variants cover the other options.$ex$, 'check', 102, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-inequalities') and code = '0580 2.6a'), null),
('00000000-0000-0000-0000-000000000000', $qt$List the integers satisfying \(-2 < x \le 3\).$qt$, $opts$["-2, -1, 0, 1, 2, 3","-1, 0, 1, 2, 3","0, 1, 2, 3","-1, 0, 1, 2"]$opts$::jsonb, 1, $ex$Strict −2 excludes −2; inclusive 3 keeps 3. The first includes the excluded end; the others drop valid integers.$ex$, 'check', 201, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-inequalities') and code = '0580 2.6b'), null),
('00000000-0000-0000-0000-000000000000', $qt$Solve \(4 < 2x + 6 \le 14\).$qt$, $opts$["\\(-1 \\le x < 4\\)","\\(-2 < x \\le 7\\)","\\(1 < x \\le 4\\)","\\(-1 < x \\le 4\\)"]$opts$::jsonb, 3, $ex$Subtract 6: \(-2 < 2x \le 8\); halve: \(-1 < x \le 4\). The others flip an end's strictness or operate on only two parts.$ex$, 'check', 202, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-inequalities') and code = '0580 2.6b'), null),
('00000000-0000-0000-0000-000000000000', $qt$Solve \(5(x - 2) \ge 3x + 4\).$qt$, $opts$["\\(x \\le 7\\)","\\(x \\ge 14\\)","\\(x \\ge 7\\)","\\(x \\ge 3\\)"]$opts$::jsonb, 2, $ex$Marks as awarded: expanded to 5x − 10 ≥ 3x + 4 [1]; collected to 2x ≥ 14, so x ≥ 7 [1]. The first flips needlessly; the second skips ÷2; the last mis-collects.$ex$, 'exam', 900, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-inequalities') and code = '0580 2.6a'), (select id from public.syllabus_statements where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-inequalities') and code = '2.6')),
('00000000-0000-0000-0000-000000000000', $qt$Find the smallest integer satisfying \(2x - 5 > 11\).$qt$, $opts$["9","8","10","5.5"]$opts$::jsonb, 0, $ex$Marks as awarded: x > 8 derived [1]; smallest integer 9 (8 excluded by strictness) [1]. 8 fails the strict test; 10 overshoots; 5.5 is not an integer.$ex$, 'exam', 901, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-inequalities') and code = '0580 2.6b'), (select id from public.syllabus_statements where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-inequalities') and code = '2.6'));
