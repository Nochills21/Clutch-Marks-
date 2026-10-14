insert into public.learning_objectives (topic_id, code, statement, teach, sort_order)
values
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'programming-concepts'), '0478 4.2a', $st$Compare high-level and low-level languages, and explain assemblers, compilers and interpreters.$st$, $teach$### What is being asked
Sort a language or translator, or judge which translation suits a situation. The answer turns on closeness to hardware versus closeness to humans.

### Method
1. Low-level (machine code, assembly): hardware-close, fast, hardware-specific; assembly needs an assembler to become machine code.
2. High-level (Python, VB, Java): human-readable, portable, needs translation — compiler (whole program first, then fast execution) or interpreter (line by line, slower, easier to debug).
3. Choose by need: finished products ship compiled; learners debug interpreted; drivers and firmware stay low-level.
4. Justify with the trade: every choice swaps speed and control against ease and portability.

### Worked example
A student learning to program picks an interpreted high-level language: readable code with errors reported line by line as they test. Check: the priority is debugging ease, not execution speed — interpreted translation matches a learner's need, compiled speed would serve a shipped game instead.

### Traps
- "Compilers find more errors". Both report errors; compilers report after full translation, interpreters stop at the first failing line.
- Assembly is portable. Assembly targets one processor family — move chips and it breaks, unlike high-level code.
- Interpreted means broken. Interpretation is a translation strategy (slower runs, faster debugging), not a quality judgement.
- One translator for every language. Assemblers serve assembly only; high-level languages choose compiler or interpreter per implementation.

### Timing
Paper 1: 2-3 minutes, 2-4 marks. Translation questions want the timing difference (before vs during execution) stated explicitly.$teach$, 1),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'programming-concepts'), '0478 4.2b', $st$Describe IDE features and explain how each one helps program development.$st$, $teach$### What is being asked
Name the tool in a scenario or explain what a feature does. The answer links the feature to the development pain it removes.

### Method
1. Editor with syntax highlighting and auto-completion: writes code faster with fewer typos.
2. Compiler/interpreter built in: builds and runs without leaving the environment.
3. Debugger: breakpoints pause execution, stepping runs line by line, watches show variable values — finds logic errors testing cannot.
4. Error diagnostics, auto-save and project tools: flag mistakes early, survive crashes, organise multi-file work.

### Worked example
A loop misbehaves only on the 50th pass: set a breakpoint inside the loop with a watch on the counter, run to the break, and step — the variables at each pass reveal the fault. Check: print statements would flood fifty lines; the debugger inspects exactly the failing pass.

### Traps
- "The debugger fixes errors". It reveals them (values, flow); the programmer still repairs.
- Listing features without uses. Every feature answers "which pain" — highlighting prevents typos, breakpoints isolate passes.
- IDE equals language. One IDE hosts many languages; the tools serve development, not one syntax.
- Testing replaces debugging. Tests prove failure exists; the debugger shows where and why.

### Timing
Paper 1: 2 minutes, 2-3 marks. Feature questions want the pairing — tool plus the job it does.$teach$, 2),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'programming-concepts'), '0478 8.1a', $st$Use variables, constants and data types correctly, including assignment and meaningful names.$st$, $teach$### What is being asked
Declare, assign or judge data handling in pseudocode. The answer picks the right container (variable vs constant) and the right type for the data.

### Method
1. Variable: named storage whose value changes (Score, Total). Constant: fixed at declaration (PI = 3.14, VAT = 0.2) — safer and self-documenting.
2. Types: INTEGER (whole), REAL (decimal), CHAR (one character), STRING (text), BOOLEAN (TRUE/FALSE). Match the data, not the feeling.
3. Assignment uses left-arrow (Score <- 0); comparison uses = inside conditions. Different symbols, different jobs.
4. Names describe contents (ExamMark, not X) — the examiner reads them as documentation of intent.

### Worked example
Storing a pupil's test percentage: Mark <- 0 declared REAL, because percentages take decimals and change per pupil. Check: INTEGER would truncate 87.5; a constant would forbid the next pupil's score; X would hide the meaning.

### Traps
- = for assignment. In 0478 pseudocode, <- assigns and = compares — swapping them breaks every statement.
- Constants that change. A "constant" reassigned later is a variable with a misleading name — examiners penalise the confusion.
- STRING for numbers to calculate with. "87" + "5" concatenates; 87 + 5 adds — arithmetic needs numeric types.
- Declaring everything as the program runs. Declare first with types; undeclared variables score nothing in structured answers.

### Timing
Paper 2: 2-3 minutes, 2-3 marks. Type questions are decided by what happens next — calculated, compared or concatenated.$teach$, 3),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'programming-concepts'), '0478 8.1b', $st$Choose between IF, CASE, FOR, WHILE and REPEAT loops, and trace what each construct does.$st$, $teach$### What is being asked
Pick the construct for a job or predict how many times a loop runs. The answer counts certainties: known repetitions, possible zero, guaranteed one.

### Method
1. IF handles two-way branches; CASE handles three or more fixed choices cleanly (grades, menu options).
2. FOR repeats a known number of times with a counter (1 TO 10). WHILE checks first, so zero runs are possible (unknown repetitions, may never run).
3. REPEAT...UNTIL checks last, so it always runs at least once (menus, validation needing one attempt first).
4. Decide by asking: known count (FOR)? Must run once (REPEAT)? Otherwise WHILE. Branches: two (IF), many fixed (CASE).

### Worked example
Rejecting invalid ages until 0-120 arrives: REPEAT INPUT Age UNTIL Age >= 0 AND Age <= 120 — the user must be asked at least once. Check: WHILE could skip asking entirely if wrongly initialised; FOR cannot loop an unknown count; IF branches once instead of repeating.

### Traps
- WHILE where REPEAT belongs. "Ask until valid" needs the first attempt guaranteed — WHILE with a bad initial value skips everything.
- FOR for unknown counts. Counters need known bounds; file reading and validation are WHILE/REPEAT territory.
- CASE for ranges. CASE matches fixed values; ranges (0-39, 40-69) belong to nested IF.
- Conditions that never change inside. A loop whose exit test no statement updates is an infinite loop — check the body moves toward exit.

### Timing
Paper 2: 3-5 minutes, 3-5 marks. Construct choice is one mark; the trace that follows is the rest — choose, then prove by tracing.$teach$, 4),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'programming-concepts'), '0478 8.1c', $st$Write procedures and functions with parameters, and explain how values are returned.$st$, $teach$### What is being asked
Split code into subroutines or trace a call with parameters. The answer separates the reusable block from its inputs — and procedures from functions.

### Method
1. Procedure: a named block called with CALL; takes parameters, returns nothing (does something — prints, saves, sorts in place).
2. Function: takes parameters and RETURNS one value (calculates something — Square(N) returns N * N). Call it inside an expression.
3. Parameters carry values in: CALL Greet("Ama") passes "Ama" to Name. Match count and order at every call.
4. Reuse rule: three uses (or one complex block) earns a subroutine; single straight-line code stays inline.

### Worked example
FUNCTION Cube(N) RETURNS N * N * N; OUTPUT Cube(4) prints 64. Check: Cube returns into the OUTPUT statement — a procedure could not sit inside an expression, which is exactly the function/procedure test.

### Traps
- CALLing a function and discarding the return. Unused returns waste the function — assign or output the value.
- OUTPUT inside a function instead of RETURN. Printing is not returning; the caller receives nothing.
- Mismatched parameters. Two declared, one passed — the call fails whatever each line does alone.
- One mega-procedure. Subroutines aid reuse and testing; a single 200-line block gains neither.

### Timing
Paper 2: 3-4 minutes, 3-4 marks. Call-and-return traces are common — track parameter values into the block and the return value out.$teach$, 5),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'programming-concepts'), '0478 8.2a', $st$Declare and use one-dimensional arrays, including looping through every element.$st$, $teach$### What is being asked
Store a list or process every item. The answer indexes from 1 (0478 arrays start at 1) and loops the full range — first to last, none skipped.

### Method
1. Declare with bounds and type: DECLARE Marks : ARRAY[1:30] OF INTEGER — thirty slots, numbered 1 to 30.
2. Index to reach one element: Marks[7] is the seventh pupil's mark. Bounds are 1 and 30 — 0 and 31 do not exist.
3. Loop the whole array with FOR I ← 1 TO 30 (totals, searches, maxima). The loop bounds must equal the array bounds.
4. Search by checking each element against the target inside the loop; track found positions or counts as asked.

### Worked example
Total of Marks[1:30]: Total ← 0, FOR I ← 1 TO 30 DO Total ← Total + Marks[I] NEXT I. Check: I visits every index once (1 to 30 inclusive is 30 passes), and starting Total at 0 keeps the first addition honest.

### Traps
- Index 0. Many languages start at 0; 0478 pseudocode starts at 1 — Marks[0] is out of bounds here.
- Loops that stop one short. 1 TO 29 on a 1:30 array silently drops the last pupil — match loop bounds to array bounds.
- Forgetting the accumulator's start. Totals, counts and maxima need initialising before the loop, not inside it.
- Reading past the end in searches. Check bounds inside WHILE searches or the loop runs off the array's edge.

### Timing
Paper 2: 4-5 minutes, 4-6 marks. Array questions are loop questions in disguise — the index handling is where the marks live.$teach$, 6),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'programming-concepts'), '0478 8.2b', $st$Declare and use two-dimensional arrays with nested loops for rows and columns.$st$, $teach$### What is being asked
Handle tables of data (grids, matrices, seating plans). The answer nests correctly: outer loop rows, inner loop columns, both bounds exact.

### Method
1. Declare both dimensions: DECLARE Grid : ARRAY[1:5, 1:5] OF INTEGER — rows 1-5, columns 1-5.
2. Index with both: Grid[3, 4] is row 3, column 4. Order matters — row first, then column.
3. Nest loops: FOR Row ← 1 TO 5 DO FOR Col ← 1 TO 5 DO ... process Grid[Row, Col] ... NEXT Col NEXT I. Inner completes fully for each outer pass.
4. Totals and searches work as in 1D, but every access names both indexes.

### Worked example
Counting over-18s in Seats[1:10, 1:20] (ages): Count ← 0, rows 1-10 outer, columns 1-20 inner, IF Seats[R, C] > 18 THEN Count ← Count + 1. Check: 200 cells visited exactly once — the inner loop's 20 passes times the outer's 10.

### Traps
- Swapped indexes. Grid[4, 3] and Grid[3, 4] are different cells — keep row-column order at every access.
- One loop for two dimensions. A single loop visits a line, not a grid — both dimensions need their own loop.
- Inner and outer bounds swapped. Columns running to the row bound (or reverse) walks off the grid's edges.
- Reinitialising inside. Accumulators start once before both loops; resetting per row counts one row only.

### Timing
Paper 2: 4-5 minutes, 4-6 marks. Nesting order and index order are the two classic slips — state both before writing.$teach$, 7),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'programming-concepts'), '0478 8.3a', $st$Open, read and close text files in READ mode, detecting end-of-file correctly.$st$, $teach$### What is being asked
Read data from a file without crashing at the end. The answer opens before reading, tests EOF inside the loop, and closes after.

### Method
1. OPENFILE "Names.txt" FOR READ — nothing can be read before opening.
2. Loop WHILE NOT EOF("Names.txt") DO ... READFILE "Names.txt", Line ... ENDWHILE — the EOF test guards every read.
3. READFILE takes the next line (or value) into a variable each pass.
4. CLOSEFILE "Names.txt" when done — always, even in short answers; examiners check for it.

### Worked example
Counting lines: OPENFILE FOR READ, Count ← 0, WHILE NOT EOF DO READFILE F, L : Count ← Count + 1 ENDWHILE, CLOSEFILE. Check: the count increments once per successful read, the loop exits exactly at end-of-file, and the file is released.

### Traps
- Reading without opening. The file handle does not exist until OPENFILE — reads before it fail.
- WHILE TRUE with reads inside and no EOF test. The final read past the end crashes — the EOF test is the loop's condition, not decoration.
- Forgetting CLOSEFILE. Locked files and lost marks — closing is part of every file answer.
- READ mode for writing. Modes are strict: READ files cannot be written to; reopen FOR WRITE/APPEND to output.

### Timing
Paper 2: 3-4 minutes, 3-4 marks. Open, guarded loop, close — miss one leg and the file answer falls over.$teach$, 8),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'programming-concepts'), '0478 8.3b', $st$Open text files in WRITE and APPEND modes, and explain how each mode treats existing data.$st$, $teach$### What is being asked
Choose the output mode or predict a file's contents after writing. The answer turns on one difference: WRITE destroys, APPEND preserves.

### Method
1. WRITE mode creates the file (or WIPES existing contents) then writes from the start. Yesterday's data is gone.
2. APPEND mode keeps existing contents and adds new lines at the end. Yesterday's data survives.
3. Both need OPENFILE ... CLOSEFILE around WRITEFILE statements, exactly like reading.
4. Choose by asking: should old contents survive (APPEND — logs, records) or be replaced (WRITE — fresh reports, saves)?

### Worked example
A temperature log gains one line hourly: OPENFILE "Log.txt" FOR APPEND, WRITEFILE the reading, CLOSEFILE. Check: a week later the file holds every reading — WRITE mode would have kept only the latest hour.

### Traps
- WRITE to add a line. The classic data-loss answer — one WRITE wipes the log it meant to extend.
- APPEND for a fresh report. Old figures linger below the new ones, corrupting totals and printouts.
- Writing without opening in the right mode. The mode is set at OPENFILE, not at WRITEFILE — declare intent first.
- Forgetting CLOSEFILE after writing. Buffered output may never reach the disk — closing flushes it.

### Timing
Paper 2: 2-3 minutes, 2-3 marks. Mode questions are decided by the old data's fate — state what survives.$teach$, 9)
on conflict (topic_id, code) do update set
  statement = excluded.statement,
  teach = excluded.teach,
  sort_order = excluded.sort_order;
delete from public.quizzes
 where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'programming-concepts') and title = 'Checkpoints — Programming Concepts';
insert into public.quizzes (id, topic_id, title, description, is_published, exam_type)
values ('00000000-0000-0000-0000-000000000000', (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'programming-concepts'), 'Checkpoints — Programming Concepts', $desc$Short checks, one set per objective in this topic. Answer one wrongly and the objective it belongs to is the thing to revisit — not the whole topic.$desc$, true, 'quiz');
insert into public.questions
  (quiz_id, question_text, options, correct_option, explanation, difficulty, sort_order, objective_id, statement_id)
values
('00000000-0000-0000-0000-000000000000', $qt$A program must run as fast as possible on customers' machines. Which translation suits it?$qt$, $opts$["Interpretation, for easy debugging","Assembly written fresh for every chip","Compilation before distribution","No translation — ship the pseudocode"]$opts$::jsonb, 2, $ex$Compiling once produces fast machine code for every run. Interpretation re-translates each time (slower); rewriting assembly per chip wastes effort; pseudocode does not execute.$ex$, 'check', 101, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'programming-concepts') and code = '0478 4.2a'), null),
('00000000-0000-0000-0000-000000000000', $qt$How does an interpreter differ from a compiler?$qt$, $opts$["An interpreter translates and runs line by line; a compiler translates the whole program first","An interpreter only handles assembly language","A compiler runs programs without machine code","There is no difference in practice"]$opts$::jsonb, 0, $ex$Timing is the difference: interpreters translate during execution (errors stop the run early); compilers translate everything first (then it runs fast). Interpreters serve high-level code; all execution ends as machine code.$ex$, 'check', 102, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'programming-concepts') and code = '0478 4.2a'), null),
('00000000-0000-0000-0000-000000000000', $qt$A variable holds the wrong value deep inside a long loop. Which IDE feature finds it fastest?$qt$, $opts$["Auto-completion","Syntax highlighting","Auto-save","Breakpoints with variable watches"]$opts$::jsonb, 3, $ex$Breakpoints pause at the failing pass while watches show live values. Completion and highlighting prevent typos; auto-save prevents loss — none inspect running values.$ex$, 'check', 201, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'programming-concepts') and code = '0478 4.2b'), null),
('00000000-0000-0000-0000-000000000000', $qt$What does stepping through code in a debugger do?$qt$, $opts$["Runs the program one line at a time so values can be checked","Deletes each line after running it","Rewrites the program automatically","Speeds up execution tenfold"]$opts$::jsonb, 0, $ex$Stepping executes line by line under inspection — the definition of the technique. It deletes, rewrites and accelerates nothing.$ex$, 'check', 202, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'programming-concepts') and code = '0478 4.2b'), null),
('00000000-0000-0000-0000-000000000000', $qt$A shop's discount rate is fixed at 10% for the whole program. How should it be stored?$qt$, $opts$["As a variable updated on every sale","As user input asked each time","As a constant declared once","As a comment in the code"]$opts$::jsonb, 2, $ex$Fixed forever means constant: protected from accidental change and named once. Variables invite overwrites; re-inputting wastes time; comments store nothing.$ex$, 'check', 301, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'programming-concepts') and code = '0478 8.1a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Which declaration suits a pupil's exam percentage?$qt$, $opts$["Mark : INTEGER","Mark : BOOLEAN","Mark : CHAR","Mark : REAL"]$opts$::jsonb, 3, $ex$Percentages take decimals, so REAL. INTEGER truncates 87.5; BOOLEAN holds only TRUE/FALSE; CHAR holds one character.$ex$, 'check', 302, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'programming-concepts') and code = '0478 8.1a'), null),
('00000000-0000-0000-0000-000000000000', $qt$A menu must display at least once before the user chooses to quit. Which loop?$qt$, $opts$["FOR Choice ← 1 TO 5","WHILE Choice <> 9 DO","REPEAT ... UNTIL Choice = 9","Nested IF statements"]$opts$::jsonb, 2, $ex$REPEAT checks after the body, guaranteeing the first display. FOR fixes the count wrongly; WHILE may skip; IFs branch once instead of looping.$ex$, 'check', 401, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'programming-concepts') and code = '0478 8.1b'), null),
('00000000-0000-0000-0000-000000000000', $qt$How many times does this run? X ← 5, WHILE X > 10 DO OUTPUT X, X ← X + 1, ENDWHILE.$qt$, $opts$["Zero times","Once","Five times","Infinitely"]$opts$::jsonb, 0, $ex$5 > 10 is false before the first pass, so the body never runs. Once needs a true first test; five miscounts; infinite needs a true test that never changes.$ex$, 'check', 402, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'programming-concepts') and code = '0478 8.1b'), null),
('00000000-0000-0000-0000-000000000000', $qt$Which task belongs in a function rather than a procedure?$qt$, $opts$["Printing a report header","Saving a file to disk","Sorting an array in place","Calculating a square root to use in a formula"]$opts$::jsonb, 3, $ex$A computed value used onward needs RETURN — a function. Printing, saving and in-place sorting do things without yielding a value: procedures.$ex$, 'check', 501, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'programming-concepts') and code = '0478 8.1c'), null),
('00000000-0000-0000-0000-000000000000', $qt$PROCEDURE AddBonus(Salary) adds 100 to Salary and prints it. CALL AddBonus(500) outputs what?$qt$, $opts$["500","600","0","Nothing — procedures cannot output"]$opts$::jsonb, 1, $ex$500 arrives as Salary, 100 is added, 600 prints. Procedures output freely (they just return nothing); 500 ignores the addition; 0 invents a value.$ex$, 'check', 502, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'programming-concepts') and code = '0478 8.1c'), null),
('00000000-0000-0000-0000-000000000000', $qt$DECLARE Team : ARRAY[1:11] OF STRING holds footballers. Which index holds the last player?$qt$, $opts$["Team[11]","Team[0]","Team[10]","Team[12]"]$opts$::jsonb, 0, $ex$Bounds 1:11 make Team[11] the last slot. 0478 arrays start at 1 (no Team[0]); 10 is second-last; 12 is out of bounds.$ex$, 'check', 601, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'programming-concepts') and code = '0478 8.2a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Which loop correctly totals Score[1:20]?$qt$, $opts$["FOR I ← 0 TO 20 DO Total ← Total + Score[I]","FOR I ← 1 TO 19 DO Total ← Total + Score[I]","FOR I ← 1 TO 20 DO Total ← Score[I]","FOR I ← 1 TO 20 DO Total ← Total + Score[I]"]$opts$::jsonb, 3, $ex$Full range 1 to 20 with accumulation. 0 starts out of bounds; 19 drops the last; the final option overwrites instead of accumulating.$ex$, 'check', 602, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'programming-concepts') and code = '0478 8.2a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Grid : ARRAY[1:4, 1:6] OF INTEGER. How many elements does it hold?$qt$, $opts$["10","24","46","12"]$opts$::jsonb, 1, $ex$4 rows × 6 columns = 24 elements. 10 adds the bounds; 46 invents; 12 halves one dimension.$ex$, 'check', 701, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'programming-concepts') and code = '0478 8.2b'), null),
('00000000-0000-0000-0000-000000000000', $qt$Which nested loops visit every cell of Grid[1:4, 1:6] exactly once?$qt$, $opts$["FOR R ← 1 TO 6 DO FOR C ← 1 TO 4","FOR R ← 1 TO 4 DO (no inner loop)","FOR R ← 1 TO 4 DO FOR C ← 1 TO 6","FOR C ← 0 TO 6 DO FOR R ← 0 TO 4"]$opts$::jsonb, 2, $ex$Rows run 1-4 outer, columns 1-6 inner — bounds matching the declaration. Swapped bounds walk off edges; one loop visits a line; zeros are out of bounds.$ex$, 'check', 702, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'programming-concepts') and code = '0478 8.2b'), null),
('00000000-0000-0000-0000-000000000000', $qt$Which loop correctly reads every line of Data.txt?$qt$, $opts$["OPENFILE FOR READ then WHILE NOT EOF DO READFILE ... ENDWHILE then CLOSEFILE","READFILE in a FOR loop with no OPENFILE","WHILE TRUE DO READFILE ... with no EOF test","OPENFILE FOR WRITE then READFILE repeatedly"]$opts$::jsonb, 0, $ex$Open, EOF-guarded reads, close — the complete pattern. No-open reads fail; unguarded loops crash at end-of-file; WRITE mode forbids reading.$ex$, 'check', 801, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'programming-concepts') and code = '0478 8.3a'), null),
('00000000-0000-0000-0000-000000000000', $qt$What happens if a program keeps reading after the last line with no EOF test?$qt$, $opts$["It loops back to the first line","It automatically closes the file","Nothing — extra reads return blanks safely","It reads past the end and crashes"]$opts$::jsonb, 3, $ex$Reads past end-of-file fail — the crash EOF testing prevents. Files never rewind, close or pad themselves on over-read.$ex$, 'check', 802, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'programming-concepts') and code = '0478 8.3a'), null),
('00000000-0000-0000-0000-000000000000', $qt$A diary program adds each day's entry to Entries.txt, keeping all previous days. Which mode?$qt$, $opts$["READ","WRITE","APPEND","EXECUTE"]$opts$::jsonb, 2, $ex$APPEND preserves old entries and adds at the end. READ forbids writing; WRITE would wipe previous days; EXECUTE is not a file mode.$ex$, 'check', 901, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'programming-concepts') and code = '0478 8.3b'), null),
('00000000-0000-0000-0000-000000000000', $qt$Results.txt holds last term's scores. OPENFILE FOR WRITE is used for this term's list. What happens to last term's scores?$qt$, $opts$["They are kept above the new scores","They are erased when the file is opened","They are moved to a backup automatically","They are merged with the new scores"]$opts$::jsonb, 1, $ex$WRITE mode wipes existing contents on opening — last term vanishes. Keeping, backing up and merging are APPEND fantasies or wishful features that do not exist.$ex$, 'check', 902, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'programming-concepts') and code = '0478 8.3b'), null),
('00000000-0000-0000-0000-000000000000', $qt$Ages[1:15] holds pupil ages. Write pseudocode to output how many pupils are aged over 16.$qt$, $opts$["Count ← 0. FOR I ← 0 TO 15. IF Ages[I] > 16 THEN Count ← Count + 1. NEXT I. OUTPUT Count.","Count ← 0. FOR I ← 1 TO 15. IF Ages[I] > 16 THEN Count ← Count + 1. NEXT I. OUTPUT Count.","FOR I ← 1 TO 15. IF Ages[I] > 16 THEN Count ← Count + 1. NEXT I.","Count ← 0. FOR I ← 1 TO 14. IF Ages[I] > 16 THEN Count ← Ages[I]. NEXT I. OUTPUT Count."]$opts$::jsonb, 1, $ex$Marks as awarded: full-range loop 1 TO 15 with correct comparison [1]; initialised counter with OUTPUT [1]. Index 0 is out of bounds; a missing initialisation and OUTPUT lose the method marks; 1 TO 14 drops a pupil and assignment replaces counting.$ex$, 'exam', 900, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'programming-concepts') and code = '0478 8.2a'), (select id from public.syllabus_statements where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'programming-concepts') and code = '8.2')),
('00000000-0000-0000-0000-000000000000', $qt$A games studio ships a finished game and keeps its engine secret. Why is compilation the right translation?$qt$, $opts$["Compiled code runs fast and ships as machine code without source","Compilation lets players debug the game easily","Interpreters cannot run games at all","Compilation removes the need for testing"]$opts$::jsonb, 0, $ex$Marks as awarded: speed of the shipped machine code [1]; source stays hidden since only machine code ships [1]. Player debugging is unwanted; interpreters run games slowly, not never; no translation removes testing.$ex$, 'exam', 901, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'programming-concepts') and code = '0478 4.2a'), (select id from public.syllabus_statements where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'programming-concepts') and code = '4.2'));
