insert into public.learning_objectives (topic_id, code, statement, teach, sort_order)
values
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-sequences-and-functions'), '0580 2.7a', $st$Continue sequences by finding term-to-term rules, including quadratic patterns.$st$, $teach$### What is being asked
Find what comes next. The answer names the rule first — differences once, and differences-again for quadratics — then applies it.

### Method
1. First differences constant (4, 4, 4) means linear: keep adding (5, 9, 13, 17 → 21, 25).
2. Second differences constant (2, 2) means quadratic: extend the FIRST differences (3, 5, 7 → 9, 11), then the terms (3, 6, 11, 18 → 27, 38).
3. Check backwards: your rule must also generate the GIVEN terms from the start.
4. Non-difference patterns (multiplying, alternating) need stating explicitly — never force addition.

### Worked example
3, 6, 11, 18: differences 3, 5, 7; second differences 2, 2 — quadratic. Next first-difference 9: term \(18 + 9 = 27\). Check: rebuilding with +3, +5, +7, +9 from 3 gives 6, 11, 18, 27 ✓.

### Traps
- Repeating the last difference. After +7 comes +9 (quadratic), not +7 again — second differences rule.
- Linear formula forced on quadratics. Constant second difference kills any single-difference rule.
- Continuing without naming the rule. Unstated rules cannot be checked — write "+4 each" before 21, 25.
- Off-by-one positioning. The 5th term follows the 4th by the 4th gap — count gaps, not terms.

### Timing
Short answers: 2 minutes, 2 marks. Difference table (a mark), next terms (a mark).$teach$, 1),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-sequences-and-functions'), '0580 2.7b', $st$Find the nth term of a linear sequence and use it to find terms and positions.$st$, $teach$### What is being asked
Generalise a linear sequence as \(an + b\), then use it both ways: term from position, position from term value.

### Method
1. \(a\) is the common difference: 4, 7, 10, 13 rises by 3, so \(a = 3\).
2. \(b\) fixes the start: \(3 \times 1 = 3\), but term 1 is 4, so \(b = +1\): nth term \(3n + 1\).
3. Test at \(n = 1\) (and \(n = 2\)) — the formula must reproduce the given start.
4. Position problems solve \(an + b = value\): \(3n + 1 = 40\) gives \(3n = 39\), \(n = 13\) — the 13th term.

### Worked example
4, 7, 10, 13: difference 3, so \(3n + b\); \(n = 1\) gives \(3 + b = 4\), so \(b = 1\): nth term \(3n + 1\). Which term is 40? \(3n = 39\), \(n = 13\). Check: \(3 \times 13 + 1 = 40\) ✓ and \(n = 2\) gives 7 ✓.

### Traps
- \(b\) as the first term. \(3n + 4\) fails at \(n = 1\) (gives 7) — \(b\) adjusts \(a \times 1\), it never copies term 1.
- Difference misread. 4, 7, 10 rises by 3, not 4 — subtract consecutive terms, don't eyeball.
- Position answers unrounded... positions are whole: \(n = 13\) exactly, or the value never appears — state which.
- Formula untested. Every nth term gets the \(n = 1\) test before use — thirty seconds that save the question.

### Timing
Short answers: 2-3 minutes, 2-3 marks. Difference (a mark), adjustment with test (a mark), use (a mark).$teach$, 2),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-sequences-and-functions'), '0580 2.13a', $st$Use function notation f(x), evaluating composite functions (Extended only).$st$, $teach$### What is being asked
Apply named functions, including inside each other. The answer substitutes carefully — brackets around every input, inner function first. (Extended only.)

### Method
1. \(f(5)\) replaces every \(x\) with 5: \(f(x) = 2x + 3\) gives \(2(5) + 3 = 13\).
2. Composite \(fg(x)\) means \(f\) AFTER \(g\): compute \(g\) first, feed its output to \(f\).
3. Powers apply before the function rule completes: \(g(5) = 25\) for \(g(x) = x^2\), then \(f(25)\) if asked.
4. Check by re-substituting the final answer into the outer function alone.

### Worked example
\(f(x) = 3x - 1\), \(g(x) = x^2\): \(gf(2)\). Inner: \(f(2) = 5\). Outer: \(g(5) = 25\). Check: order matters — \(fg(2) = f(4) = 11\) differs, proving inner-first was load-bearing.

### Traps
- Outside-first evaluation. \(gf(2)\) starts with \(f(2) = 5\), never \(g(2)\) — rightmost applies first.
- Brackets dropped on negatives. \(f(-2) = 2(-2) + 3 = -1\) — unbracketed substitution corrupts signs. (Extended only.)
- Composition as multiplication. \(fg\) never means \(f \times g\) — it is feeding, not timesing.
- Stopping halfway. Composite answers need BOTH stages — the inner output alone is working, not the answer.

### Timing
Short answers: 2-3 minutes, 2 marks. Inner value (a mark), outer application (a mark).$teach$, 3)
on conflict (topic_id, code) do update set
  statement = excluded.statement,
  teach = excluded.teach,
  sort_order = excluded.sort_order;
delete from public.quizzes
 where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-sequences-and-functions') and title = 'Checkpoints — Sequences & Functions';
insert into public.quizzes (id, topic_id, title, description, is_published, exam_type)
values ('00000000-0000-0000-0000-000000000000', (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-sequences-and-functions'), 'Checkpoints — Sequences & Functions', $desc$Short checks, one set per objective in this topic. Answer one wrongly and the objective it belongs to is the thing to revisit — not the whole topic.$desc$, true, 'quiz');
insert into public.questions
  (quiz_id, question_text, options, correct_option, explanation, difficulty, sort_order, objective_id, statement_id)
values
('00000000-0000-0000-0000-000000000000', $qt$Find the next two terms: 5, 9, 13, 17, ...$qt$, $opts$["20, 23","21, 24","22, 26","21, 25"]$opts$::jsonb, 3, $ex$First differences constant at 4: 21, then 25. The others break the +4 rule immediately.$ex$, 'check', 101, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-sequences-and-functions') and code = '0580 2.7a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Find the next term: 3, 6, 11, 18, ...$qt$, $opts$["25","27","29","23"]$opts$::jsonb, 1, $ex$Differences 3, 5, 7 (second differences 2): next gap 9, so 27. 25 repeats +7; the others skip the quadratic structure.$ex$, 'check', 102, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-sequences-and-functions') and code = '0580 2.7a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Find the nth term of 4, 7, 10, 13, ...$qt$, $opts$["\\(3n + 1\\)","\\(3n + 4\\)","\\(n + 3\\)","\\(4n - 1\\)"]$opts$::jsonb, 0, $ex$Difference 3 with \(3 \times 1 + b = 4\), so \(b = 1\). The second copies term 1 as b; the third uses difference 1; the last fails at n = 2.$ex$, 'check', 201, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-sequences-and-functions') and code = '0580 2.7b'), null),
('00000000-0000-0000-0000-000000000000', $qt$The nth term is \(3n + 1\). Which term equals 40?$qt$, $opts$["12th","14th","13th","39th"]$opts$::jsonb, 2, $ex$\(3n + 1 = 40\) gives \(n = 13\). 12th is 37; 14th is 43; 39th confuses the working (3n = 39) with the answer.$ex$, 'check', 202, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-sequences-and-functions') and code = '0580 2.7b'), null),
('00000000-0000-0000-0000-000000000000', $qt$If \(f(x) = 2x + 3\), find \(f(5)\).$qt$, $opts$["10","8","13","\\(2x + 8\\)"]$opts$::jsonb, 2, $ex$\(2(5) + 3 = 13\). 10 drops the +3; 8 mis-computes; the last substitutes nothing.$ex$, 'check', 301, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-sequences-and-functions') and code = '0580 2.13a'), null),
('00000000-0000-0000-0000-000000000000', $qt$If \(f(x) = x^2 - 1\), find \(ff(2)\).$qt$, $opts$["8","3","15","5"]$opts$::jsonb, 0, $ex$Inner: \(f(2) = 3\). Outer: \(f(3) = 8\). 3 stops halfway; the others mis-square.$ex$, 'check', 302, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-sequences-and-functions') and code = '0580 2.13a'), null),
('00000000-0000-0000-0000-000000000000', $qt$A sequence has nth term \(5n - 2\). Which term is the first to exceed 100?$qt$, $opts$["20th","21st","22nd","102nd"]$opts$::jsonb, 1, $ex$Marks as awarded: \(5n - 2 > 100\), so \(n > 20.4\) [1]; first whole position 21st [1]. 20th gives 98; 22nd overshoots; 102nd misuses the difference.$ex$, 'exam', 900, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-sequences-and-functions') and code = '0580 2.7b'), (select id from public.syllabus_statements where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-sequences-and-functions') and code = '2.7')),
('00000000-0000-0000-0000-000000000000', $qt$Given \(f(x) = 3x - 1\) and \(g(x) = x^2\), find \(gf(2)\).$qt$, $opts$["11","36","10","25"]$opts$::jsonb, 3, $ex$Marks as awarded: inner \(f(2) = 5\) [1]; outer \(g(5) = 25\) [1]. 11 reverses the order (fg); 36 squares the wrong input; 10 doubles instead.$ex$, 'exam', 901, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-sequences-and-functions') and code = '0580 2.13a'), (select id from public.syllabus_statements where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-sequences-and-functions') and code = '2.13'));
