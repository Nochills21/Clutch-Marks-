insert into public.learning_objectives (topic_id, code, statement, teach, sort_order)
values
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-sets'), '0580 1.2a', $st$Use set notation including elements, subsets, unions, intersections and complements.$st$, $teach$### What is being asked
Read or write set language, or shade the matching Venn region. The answer treats each symbol as an instruction — element, part, overlap, or outside.

### Method
1. \(3 \in A\) means 3 is an element of A; \(5 \notin A\) means it is not. Braces list elements: \(A = \{1, 2, 3, 4\}\).
2. \(B \subseteq A\) means every element of B sits in A (a subset); \(\{2\} \subseteq A\) but \(\{2\} \notin A\) — sets contain elements, not sets.
3. \(A \cup B\) gathers elements in EITHER (or both); \(A \cap B\) keeps only elements in BOTH.
4. \(A'\) (complement) means everything in the universal set \(\xi\) that is NOT in A.

### Worked example
\(A = \{2, 4, 6, 8\}\), \(B = \{3, 6, 9\}\): \(A \cap B = \{6\}\) (the only shared element), \(A \cup B = \{2, 3, 4, 6, 8, 9\}\). Check: 6 appears in both lists (intersection), and the union lists six distinct elements with no repeats.

### Traps
- Element versus subset. \(2 \in A\) is true but \(\{2\} \in A\) is false — braces make a set, and A holds numbers here, not sets.
- Union as overlap. Union gathers (OR); intersection overlaps (AND) — swapping them swaps every answer.
- Order and repeats in listings. \(\{4, 3, 2, 1\}\) equals \(\{1, 2, 3, 4\}\) — sets ignore order and duplicates.
- Complement without a universal set. \(A'\) means nothing until \(\xi\) is named — always read it first.

### Timing
Short answers: 1-2 minutes each. Symbol first (what it asks), elements second (which qualify).$teach$, 1),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-sets'), '0580 1.2b', $st$Find numbers of elements with Venn diagrams, including neither-nor and overlap regions.$st$, $teach$### What is being asked
Count who sits where across overlapping groups. The answer fills the Venn regions inside-out: overlap first, only-regions next, neither last.

### Method
1. Start with the overlap (BOTH) in the centre — it belongs to both circles at once.
2. Subtract to find only-regions: only-F = F total minus both (\(18 - 7 = 11\)).
3. Add all inside regions, then subtract from the class total for NEITHER: \(30 - (11 + 7 + 8) = 4\).
4. Formula check: \(n(A \cup B) = n(A) + n(B) - n(A \cap B)\) — the overlap was counted twice, so remove it once.

### Worked example
30 pupils: 18 football, 15 tennis, 7 both. Centre 7; only-football \(18 - 7 = 11\); only-tennis \(15 - 7 = 8\); neither \(30 - 26 = 4\). Check by formula: \(18 + 15 - 7 = 26\) play something, leaving 4 — regions and formula agree.

### Traps
- Overlap counted twice. Adding 18 + 15 = 33 pupils from 30 confesses the double-count — subtract the overlap once.
- Only-regions skipped. "18 football" includes the 7 both — only-football is 11, never 18.
- Neither forgotten. Inside-regions total 26 of 30 — the 4 outside both circles still need stating.
- Three-set panic. Pairwise overlaps still fill first; the centre triple-overlap belongs to all three subtractions.

### Timing
Short answers: 2-3 minutes, 2 marks. Centre first (the anchor mark), subtraction chain second.$teach$, 2)
on conflict (topic_id, code) do update set
  statement = excluded.statement,
  teach = excluded.teach,
  sort_order = excluded.sort_order;
delete from public.quizzes
 where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-sets') and title = 'Checkpoints — Sets';
insert into public.quizzes (id, topic_id, title, description, is_published, exam_type)
values ('00000000-0000-0000-0000-000000000000', (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-sets'), 'Checkpoints — Sets', $desc$Short checks, one set per objective in this topic. Answer one wrongly and the objective it belongs to is the thing to revisit — not the whole topic.$desc$, true, 'quiz');
insert into public.questions
  (quiz_id, question_text, options, correct_option, explanation, difficulty, sort_order, objective_id, statement_id)
values
('00000000-0000-0000-0000-000000000000', $qt$If \(A = \{1, 2, 3, 4\}\), which statement is true?$qt$, $opts$["\\(3 \\in A\\)","\\(5 \\in A\\)","\\(\\{2\\} \\in A\\)","\\(0 \\in A\\)"]$opts$::jsonb, 0, $ex$3 is listed, so \(3 \in A\). 5 and 0 are absent; \(\{2\}\) is a subset (\(\subseteq\)), not an element — braces change the meaning.$ex$, 'check', 101, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-sets') and code = '0580 1.2a'), null),
('00000000-0000-0000-0000-000000000000', $qt$What does \(A \cup B\) contain?$qt$, $opts$["Elements in both A and B","Elements in A but not in B","Elements in A or B or both","Everything outside A and B"]$opts$::jsonb, 2, $ex$Union gathers either-or-and-both. Both-only is intersection; A-not-B is difference; outside-everything is the complement of the union.$ex$, 'check', 102, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-sets') and code = '0580 1.2a'), null),
('00000000-0000-0000-0000-000000000000', $qt$30 pupils: 18 like football, 15 like tennis, 7 like both. How many like neither?$qt$, $opts$["0","4","11","10"]$opts$::jsonb, 1, $ex$Only-F 11, both 7, only-T 8 — inside totals 26, so neither is 4. 0 double-counts the overlap; 11 is only-football; 10 subtracts the overlap twice.$ex$, 'check', 201, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-sets') and code = '0580 1.2b'), null),
('00000000-0000-0000-0000-000000000000', $qt$n(A) = 12, n(B) = 9 and n(A ∩ B) = 4. Find n(A ∪ B).$qt$, $opts$["25","21","16","17"]$opts$::jsonb, 3, $ex$\(12 + 9 - 4 = 17\) — add both, remove the double-counted overlap once. 25 never subtracts; 21 and 16 mis-handle the overlap.$ex$, 'check', 202, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-sets') and code = '0580 1.2b'), null),
('00000000-0000-0000-0000-000000000000', $qt$A = {2, 4, 6, 8} and B = {3, 6, 9}. Find A ∩ B.$qt$, $opts$["{6}","{2, 3, 4, 6, 8, 9}","{2, 4, 8}","∅ (empty set)"]$opts$::jsonb, 0, $ex$Marks as awarded: common elements identified [1]; {6} only [1]. The second option is the union; the third is A-only; the set is not empty since 6 is shared.$ex$, 'exam', 900, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-sets') and code = '0580 1.2a'), (select id from public.syllabus_statements where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-sets') and code = '1.2')),
('00000000-0000-0000-0000-000000000000', $qt$50 students: 28 take French, 22 take German, 10 take both. How many take neither?$qt$, $opts$["0","8","10","40"]$opts$::jsonb, 2, $ex$Marks as awarded: only-regions 18 and 12 with both 10 [1]; 50 − 40 = 10 neither [1]. 0 ignores the overlap arithmetic; 8 mis-subtracts; 40 is the inside total, not the outside.$ex$, 'exam', 901, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-sets') and code = '0580 1.2b'), (select id from public.syllabus_statements where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-sets') and code = '1.2'));
