insert into public.learning_objectives (topic_id, code, statement, teach, sort_order)
values
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'algorithms-programming'), '0478 7a', $st$Write algorithms in pseudocode using sequence, selection and iteration, and read what an algorithm outputs.$st$, $teach$### What is being asked
Read or write an algorithm that takes inputs, processes them and produces outputs. The answer is what the algorithm **outputs** for the given inputs — a value, not a description of the steps.

### Method
1. List the inputs and their starting values.
2. Work line by line from the top; never skip ahead to what you expect.
3. At a selection (IF), test the condition with the **actual** values, then follow only the true branch or only the false branch.
4. At a loop, repeat the body and update the counter each pass until the exit condition holds.
5. State the OUTPUT values in the order they are produced.

### Worked example
INPUT A, INPUT B, IF A > B THEN OUTPUT A ELSE OUTPUT B, with A = 3 and B = 7.
Test 3 > 7: false, so the ELSE branch runs and the algorithm outputs 7. Check: 7 is the larger of the two inputs, which is what the algorithm is for.

### Traps
- Following both branches of an IF. Only one branch ever runs.
- Reading the condition backwards: A > B with A = 3 is false, not true.
- Forgetting inputs have values: an algorithm with no stated inputs cannot be traced, so the first mark is listing them.
- Answering with the steps instead of the output. The question asks what is produced.

### Timing
Paper 2: 4-5 minutes, 4-5 marks. Reading questions come before writing ones, so a slip here usually costs the method marks that follow.$teach$, 1),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'algorithms-programming'), '0478 7b', $st$Trace an algorithm with a trace table to predict its output and to locate logic errors.$st$, $teach$### What is being asked
Fill a table with one column per variable (plus output) and one row per pass through the algorithm, then read off what happens. The answer is the traced values — or the line where they go wrong.

### Method
1. Make a column for every variable that changes, in the order they first appear.
2. Enter the starting values before the first row.
3. Work through the algorithm exactly as written, writing a new row each time a value changes — including loop exits.
4. Read the OUTPUT column for the answer, or compare a column against what was expected to find the faulty line.
5. For a logic error, name the line: the variable, the pass, and what it should have been.

### Worked example
X = 0, WHILE X < 3 DO X = X + 1, OUTPUT X, ENDWHILE.
Rows: X = 0 (start); test 0 < 3 true, X = 1, output 1; test 1 < 3 true, X = 2, output 2; test 2 < 3 true, X = 3, output 3; test 3 < 3 false, stop. Outputs: 1, 2, 3. Check: three passes, three outputs, exit when X reaches 3.

### Traps
- Tracing what the algorithm *should* do instead of what it *says*. Trace the text, not the intention.
- Missing the final condition test: the loop always tests once more than it runs.
- Forgetting the loop variable update, which is exactly the infinite-loop error the table is meant to catch.
- No OUTPUT column. Without it the table cannot answer what is produced.

### Timing
Paper 2: 5-6 minutes, 4-6 marks. Trace tables are often the whole question, so a dropped column costs the accuracy marks directly.$teach$, 2),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'algorithms-programming'), '0478 7c', $st$Choose normal, abnormal, extreme and boundary test data, and state how each validates an input.$st$, $teach$### What is being asked
Given an input rule (for example a mark from 0 to 100), supply one value of each test kind and say what each one proves. The answer is four values with four jobs, not four random numbers.

### Method
1. Read the allowed range from the question.
2. Normal: an ordinary value inside the range — proves valid data is accepted.
3. Abnormal: the wrong **kind** of data (text for a number) — proves type checks work.
4. Extreme: a valid kind far outside the range — proves out-of-range values are rejected.
5. Boundary: the exact edge values — proves the limit sits in the right place.

### Worked example
Marks 0 to 100. Normal: 56 (accepted). Abnormal: eighty (rejected by the type check). Extreme: -5 (rejected by the range check). Boundary: 0 and 100 (both accepted). Check: each value tests a different check, and the pair 0/100 pins both edges.

### Traps
- Calling an extreme value a boundary value. Boundary sits exactly on the edge (0, 100); extreme sits far past it (-5, 200).
- Supplying four normal values. One kind proves one thing; four of a kind proves it four times.
- Testing the program's arithmetic instead of its input checks. Test data judges acceptance and rejection, not calculation.
- Abnormal data of the right kind: 200 is extreme, not abnormal — abnormal means the wrong data type.

### Timing
Paper 2: 3-4 minutes, 3-4 marks, usually one mark per kind. Missing a kind is a whole lost mark, so count to four before moving on.$teach$, 3),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'algorithms-programming'), '0478 7d', $st$Explain verification checks including visual checks and double entry, and state when each is used.$st$, $teach$### What is being asked
Say how data is checked **during transfer** (typing, copying, uploading) — not whether the values are sensible. The answer names the check and the situation it suits.

### Method
1. Decide what is being protected: accuracy of copying (verification) or sensibleness of values (validation — a different objective).
2. Visual check: compare the entered data on screen against the original source, line by line. Suits small batches typed from paper.
3. Double entry: type the data twice (ideally two people) and let the computer compare. Suits large volumes where proofreading everything twice is impractical.
4. Match the check to the situation: volume and error cost decide, not habit.

### Worked example
Two hundred survey forms are typed in by two operators; the system flags every mismatch for re-entry. That is double entry: the computer compares the two copies, so a slip by either operator is caught. A visual check of all two hundred forms would take far longer and tire the checker — which is itself a source of error.

### Traps
- Saying verification checks the data is reasonable. That is validation; verification checks it was copied correctly.
- Describing double entry as typing carefully once. It is two independent entries compared by the computer.
- Recommending a visual check for thousands of records. Proofreading scales badly; that is when double entry wins.
- Claiming any check removes all errors. Checks reduce errors; transposed digits can still slip through both.

### Timing
Paper 1: 2-3 minutes, 2-3 marks, usually paired with a validation question — the pair is worth full marks only if the two are kept distinct.$teach$, 4)
on conflict (topic_id, code) do update set
  statement = excluded.statement,
  teach = excluded.teach,
  sort_order = excluded.sort_order;
delete from public.quizzes
 where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'algorithms-programming') and title = 'Checkpoints — Algorithms & Programming';
insert into public.quizzes (topic_id, title, description, is_published, exam_type)
values ((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'algorithms-programming'), 'Checkpoints — Algorithms & Programming', $desc$Short checks, one set per objective in this topic. Answer one wrongly and the objective it belongs to is the thing to revisit — not the whole topic.$desc$, true, 'quiz')
returning id;
insert into public.questions
  (quiz_id, question_text, options, correct_option, explanation, difficulty, sort_order, objective_id, statement_id)
values
('00000000-0000-0000-0000-000000000000', $qt$INPUT N, TOTAL = 0, FOR I = 1 TO 3, TOTAL = TOTAL + I, NEXT I, OUTPUT TOTAL. What is output?$qt$, $opts$["3","6","5","0"]$opts$::jsonb, 1, $ex$Trace the loop: I = 1 gives TOTAL = 1, I = 2 gives TOTAL = 3, I = 3 gives TOTAL = 6. Output is 6. Stopping the loop early gives 3; adding the counter instead of accumulating gives 5.$ex$, 'check', 101, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'algorithms-programming') and code = '0478 7a'), null),
('00000000-0000-0000-0000-000000000000', $qt$In a flowchart, which shape represents a decision?$qt$, $opts$["Parallelogram","Rectangle","Rounded rectangle","Diamond"]$opts$::jsonb, 3, $ex$The diamond tests a condition and has two exits (yes/no). The parallelogram is input/output, the rectangle is a process, and the rounded rectangle starts or stops the chart.$ex$, 'check', 102, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'algorithms-programming') and code = '0478 7a'), null),
('00000000-0000-0000-0000-000000000000', $qt$X = 0, WHILE X < 3 DO X = X + 1, OUTPUT X, ENDWHILE. What is the full output?$qt$, $opts$["1 2 3","0 1 2 3","1 2","3 2 1"]$opts$::jsonb, 0, $ex$Three passes give outputs 1, 2, then 3, and the fourth test (3 < 3) is false so the loop stops. Including the starting 0 confuses the initial value with an output; stopping a pass early drops the 3.$ex$, 'check', 201, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'algorithms-programming') and code = '0478 7b'), null),
('00000000-0000-0000-0000-000000000000', $qt$X = 1, WHILE X < 5 DO OUTPUT X, ENDWHILE. The loop never ends. Which change fixes it?$qt$, $opts$["Change OUTPUT X to OUTPUT X + 1","Change X = 1 to X = 0","Add X = X + 1 before ENDWHILE","Change < to > in the condition"]$opts$::jsonb, 2, $ex$X never changes, so X < 5 stays true forever; incrementing X inside the loop lets it reach 5 and exit. Changing the OUTPUT line leaves X untouched; starting at 0 is still infinite; flipping the test to 1 > 5 ends the loop by producing nothing at all.$ex$, 'check', 202, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'algorithms-programming') and code = '0478 7b'), null),
('00000000-0000-0000-0000-000000000000', $qt$A program accepts marks from 0 to 100. Which value is boundary test data?$qt$, $opts$["56","-3","100","eighty"]$opts$::jsonb, 2, $ex$100 sits exactly on the allowed edge, so it tests where the limit lies. 56 is normal, -3 is extreme (valid kind, far outside), and eighty is abnormal (wrong data type).$ex$, 'check', 301, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'algorithms-programming') and code = '0478 7c'), null),
('00000000-0000-0000-0000-000000000000', $qt$Which validation check rejects the value 12A entered as an age?$qt$, $opts$["Type check","Range check","Presence check","Length check"]$opts$::jsonb, 0, $ex$Age must be numeric and 12A is not, so the type check rejects it. A range check tests value bounds, a presence check tests for empty input, and a length check counts characters.$ex$, 'check', 302, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'algorithms-programming') and code = '0478 7c'), null),
('00000000-0000-0000-0000-000000000000', $qt$Which of these describes double entry verification?$qt$, $opts$["Reading data back from disk after saving","Checking the data type as it is entered","Entering the data once, very carefully","Typing the data twice and comparing the copies"]$opts$::jsonb, 3, $ex$Double entry means two independent entries that the computer compares, catching slips by either typist. Reading back from disk checks storage, a type check is validation, and careful single entry is just hope.$ex$, 'check', 401, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'algorithms-programming') and code = '0478 7d'), null),
('00000000-0000-0000-0000-000000000000', $qt$A student copies numbers from paper to computer, then reads the screen back against the paper. This is an example of what?$qt$, $opts$["Validation","Visual check","Range check","Boundary test"]$opts$::jsonb, 1, $ex$Comparing entered data against its source is verification by visual check. Validation would judge whether the numbers are sensible; range and boundary belong to validation, not verification.$ex$, 'check', 402, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'algorithms-programming') and code = '0478 7d'), null),
('00000000-0000-0000-0000-000000000000', $qt$Trace this algorithm with A = 4: INPUT A, B = 0, FOR I = 1 TO A, B = B + I, NEXT I, OUTPUT B. What is output?$qt$, $opts$["7","10","14","4"]$opts$::jsonb, 1, $ex$Marks as awarded: I running 1 to 4 with B accumulating 1, 3, 6, 10 [1]; B = 10 [1]. Answer 10. Stopping at I = 3 gives 6 and loses the method mark; adding I itself instead of accumulating gives 4.$ex$, 'exam', 900, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'algorithms-programming') and code = '0478 7b'), (select id from public.syllabus_statements where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'algorithms-programming') and code = '7')),
('00000000-0000-0000-0000-000000000000', $qt$INPUT N, IF N MOD 2 = 0 THEN OUTPUT N / 2 ELSE OUTPUT N * 3 + 1, ENDIF, with N = 6. What is output?$qt$, $opts$["13","9","3","19"]$opts$::jsonb, 2, $ex$Marks as awarded: 6 MOD 2 = 0, so the IF branch runs [1]; 6 / 2 = 3 [1]. Answer 3. Taking the ELSE branch gives 19 and scores 0; halving without testing gives 3 for the wrong reason and loses the method mark.$ex$, 'exam', 901, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'algorithms-programming') and code = '0478 7a'), (select id from public.syllabus_statements where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'algorithms-programming') and code = '7'));
