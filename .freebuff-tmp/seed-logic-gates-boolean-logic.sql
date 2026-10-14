insert into public.learning_objectives (topic_id, code, statement, teach, sort_order)
values
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'logic-gates-boolean-logic'), '0478 10a', $st$Draw the truth tables for NOT, AND, OR, NAND, NOR and XOR gates from memory.$st$, $teach$### What is being asked
Give the output of a single gate for given inputs. The answer is the gate's pattern — memorised, not derived, under time pressure.

### Method
1. NOT inverts one input: 0 becomes 1, 1 becomes 0.
2. AND is 1 only when both inputs are 1. OR is 1 when at least one input is 1.
3. NAND is AND inverted (only 0 when both are 1). NOR is OR inverted (only 1 when both are 0).
4. XOR is 1 when the inputs differ. Learn it as "one or the other, but not both".

### Worked example
NAND with A = 1, B = 1: AND would give 1, NAND inverts it to 0. Check against the rule — NAND is 0 only for (1, 1) — and the other three input pairs all give 1.

### Traps
- XOR means "different", not "either". (1, 1) gives 0 for XOR but 1 for OR — the pair that separates them.
- NAND/NOR are not "broken AND/OR". They are complete gates in their own right (any circuit can be built from NAND alone).
- Writing the AND table for NAND. The final inversion is a whole mark — apply it last, visibly.
- Guessing from the symbol. The shape hints (the N-circle means invert), but the table is what scores.

### Timing
Paper 1 and 2: 1-2 minutes, 1-2 marks each. Single-gate recall should be instant — drill until no gate takes thought.$teach$, 1),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'logic-gates-boolean-logic'), '0478 10b', $st$Build truth tables for logic circuits that combine two or more gates.$st$, $teach$### What is being asked
Work out a circuit's output column for all input combinations. The answer is a full correct column — intermediate columns earn method marks even with a slipped final.

### Method
1. List all input combinations (two inputs: 00, 01, 10, 11 — fixed order, never shuffled).
2. Add one column per gate, working left to right from the inputs toward the output.
3. Evaluate each gate's column using the single-gate tables — one gate, one rule, one column.
4. The last gate's column is the answer. Check it against an expectation (e.g. AND-heavy circuits are mostly 0).

### Worked example
(A AND B) OR (NOT A): rows 00, 01, 10, 11. AND gives 0,0,0,1. NOT A gives 1,1,0,0. OR combines: 1,1,0,1. Check: row 11 gives 1 (AND side true), row 00 gives 1 (NOT side true), rows 01 and 10 split — each row justified by one side.

### Traps
- Reordering input rows mid-table. Keep 00, 01, 10, 11 throughout or columns stop lining up.
- Evaluating right to left. Gates feed forward — an output column needs its input columns finished first.
- Merging two gates into one step. One column per gate makes errors findable; combined steps hide them.
- No intermediate columns. A correct final column with no working still risks everything on one slip.

### Timing
Paper 2: 4-6 minutes, 4-6 marks. Columns are the method marks — write every gate's column even when the final looks obvious.$teach$, 2),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'logic-gates-boolean-logic'), '0478 10c', $st$Design a logic circuit from a problem statement, choosing gates and wiring them correctly.$st$, $teach$### What is being asked
Turn words ("the alarm sounds when...") into gates wired together. The answer is a circuit whose output column matches the specification for every row.

### Method
1. Extract the condition as a sentence with AND, OR, NOT: "sounds when (armed AND door open) OR (armed AND window open)".
2. Build each bracket with its gate first (two ANDs), then combine brackets with the outer gate (OR).
3. NOT applies to single signals before they enter gates — wire the inversion first, then the combination.
4. Verify with the extreme rows: all inputs 0 and all inputs 1 must give the specified outputs.

### Worked example
"An alarm sounds when the system is armed AND (the door OR the window is open)". Gates: door OR window first, then AND with armed. Check extremes: unarmed with everything open gives 0 (AND blocks); armed with all closed gives 0 (OR blocks); armed with door open gives 1.

### Traps
- ANDing when the words say OR. "Either sensor" is OR; "both together" is AND — translate the words, not the feeling.
- One gate for a two-level condition. Nested conditions need nested gates; a single AND cannot express "(A OR B) AND C".
- Forgetting shared signals. "Armed" feeds the final AND in every bracket — draw the wire splitting, not a new input.
- No verification row. One tested row catches most wiring slips before they cost the design marks.

### Timing
Paper 2: 5-6 minutes, 4-6 marks. Design marks split between correct gates and correct wiring — label every gate and every input.$teach$, 3)
on conflict (topic_id, code) do update set
  statement = excluded.statement,
  teach = excluded.teach,
  sort_order = excluded.sort_order;
delete from public.quizzes
 where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'logic-gates-boolean-logic') and title = 'Checkpoints — Logic Gates & Boolean Logic';
insert into public.quizzes (id, topic_id, title, description, is_published, exam_type)
values ('00000000-0000-0000-0000-000000000000', (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'logic-gates-boolean-logic'), 'Checkpoints — Logic Gates & Boolean Logic', $desc$Short checks, one set per objective in this topic. Answer one wrongly and the objective it belongs to is the thing to revisit — not the whole topic.$desc$, true, 'quiz');
insert into public.questions
  (quiz_id, question_text, options, correct_option, explanation, difficulty, sort_order, objective_id, statement_id)
values
('00000000-0000-0000-0000-000000000000', $qt$A NAND gate has inputs A = 1 and B = 0. What is the output?$qt$, $opts$["0","1","2","It depends on the circuit"]$opts$::jsonb, 1, $ex$NAND is 0 only when both inputs are 1; here AND gives 0, inverted to 1. 0 is the AND answer (inversion forgotten); a gate output is always 0 or 1, never 2.$ex$, 'check', 101, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'logic-gates-boolean-logic') and code = '0478 10a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Which input pair makes an XOR gate output 1?$qt$, $opts$["A = 0, B = 0","A = 1, B = 1","A = 1, B = 0","XOR never outputs 1"]$opts$::jsonb, 2, $ex$XOR is 1 exactly when inputs differ, so (1, 0) — and (0, 1) — give 1. Equal inputs give 0; the last option denies the gate's whole purpose.$ex$, 'check', 102, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'logic-gates-boolean-logic') and code = '0478 10a'), null),
('00000000-0000-0000-0000-000000000000', $qt$A circuit outputs (A AND B) OR (NOT A). What is the output when A = 0, B = 1?$qt$, $opts$["0","1","Cannot be determined","It oscillates"]$opts$::jsonb, 1, $ex$A AND B = 0 AND 1 = 0; NOT A = 1; 0 OR 1 = 1. Combinational circuits always determine (no oscillation); 0 ignores the NOT branch.$ex$, 'check', 201, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'logic-gates-boolean-logic') and code = '0478 10b'), null),
('00000000-0000-0000-0000-000000000000', $qt$A circuit outputs (A NOR B) AND (A XOR B). What is the full output column for rows 00, 01, 10, 11?$qt$, $opts$["0, 0, 0, 0","1, 0, 0, 1","0, 1, 1, 0","1, 1, 1, 1"]$opts$::jsonb, 0, $ex$NOR gives 1,0,0,0 and XOR gives 0,1,1,0; ANDing them gives 0,0,0,0 — the two can never be 1 together. The middle options each copy one gate's column instead of combining.$ex$, 'check', 202, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'logic-gates-boolean-logic') and code = '0478 10b'), null),
('00000000-0000-0000-0000-000000000000', $qt$An alarm sounds when armed (S = 1) AND movement is detected (M = 1). Which circuit?$qt$, $opts$["S OR M driving the alarm","S AND M driving the alarm","NOT S AND NOT M driving the alarm","S XOR M driving the alarm"]$opts$::jsonb, 1, $ex$Both conditions together is AND. OR would sound when disarmed; double NOT sounds only when calm and unarmed; XOR fails exactly when both hold.$ex$, 'check', 301, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'logic-gates-boolean-logic') and code = '0478 10c'), null),
('00000000-0000-0000-0000-000000000000', $qt$A light comes on when it is dark (D = 1) OR motion is sensed (M = 1), but never during a power cut (P = 1). Which output expression?$qt$, $opts$["(D OR M) AND (NOT P)","(D AND M) OR P","D OR M OR P","(NOT D) AND (NOT M)"]$opts$::jsonb, 0, $ex$Dark-or-motion enables the light, and NOT P vetoes everything during a cut. The others sound the light during cuts, demand both triggers, or invert the whole behaviour.$ex$, 'check', 302, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'logic-gates-boolean-logic') and code = '0478 10c'), null),
('00000000-0000-0000-0000-000000000000', $qt$A circuit outputs (A NOR B) OR (A AND B). Give the output column for input rows 00, 01, 10, 11.$qt$, $opts$["1, 0, 0, 1","0, 1, 1, 0","1, 1, 1, 1","0, 0, 0, 0"]$opts$::jsonb, 0, $ex$Marks as awarded: NOR column 1,0,0,0 and AND column 0,0,0,1 [1]; OR of the two gives 1,0,0,1 [1]. The second option inverts every row; the third is stuck at 1; the last copies neither gate.$ex$, 'exam', 900, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'logic-gates-boolean-logic') and code = '0478 10b'), (select id from public.syllabus_statements where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'logic-gates-boolean-logic') and code = '10')),
('00000000-0000-0000-0000-000000000000', $qt$A motor runs when the guard is closed (G = 1) AND the operator presses start (S = 1), unless the overheat sensor trips (H = 1). Which circuit runs it correctly?$qt$, $opts$["(G AND S) OR H","G AND S AND H","(G AND S) AND (NOT H)","(G OR S) AND H"]$opts$::jsonb, 2, $ex$Marks as awarded: guard-and-start combined with AND [1]; overheat vetoed with NOT H ANDed in [1]. OR H runs the motor during overheating; AND H demands overheating; the last option miswires every condition.$ex$, 'exam', 901, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'logic-gates-boolean-logic') and code = '0478 10c'), (select id from public.syllabus_statements where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'logic-gates-boolean-logic') and code = '10'));
