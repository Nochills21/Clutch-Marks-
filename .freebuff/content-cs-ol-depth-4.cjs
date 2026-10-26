// Computer Science OL batch 4a: official Cambridge IGCSE 0478 (2026-2028)
// Paper 2 statement 7 (Algorithm design and problem-solving) and Paper 1/2
// statement 4.2 (Types of programming language, translators) plus 8.1-8.3
// (Programming concepts, Arrays, File handling). Apply with:
//   node .freebuff/deepen-materials.cjs .freebuff/content-cs-ol-depth-4.cjs > .freebuff-tmp/cs-ol-depth-4.sql
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/cs-ol-depth-4.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/cs-ol-depth-4.sql --apply    (live)
//   node .freebuff/gate-notes-depth.cjs computer-science OL
module.exports = {
  expectType: "notes",
  titles: {
    "f2259878-433e-406d-9dea-7531aff6d69a": "IGCSE Computer Science: Programming Concepts and Constructs",
    "230d770c-b169-4153-b7a0-41297244195b": "IGCSE Computer Science: Algorithm Design and Problem-Solving",
  },
  rows: {
    "f2259878-433e-406d-9dea-7531aff6d69a": `
<h2>IGCSE Computer Science: Programming Concepts and Constructs</h2>
<p>Cambridge IGCSE Computer Science 0478 (2026–2028), Paper 2 Algorithms, Programming and Logic and Paper 1 statement 4.2: types of programming language and translators, 8.1 Programming concepts, 8.2 Arrays, and 8.3 File handling. This note builds a programmer's vocabulary from zero: how code becomes machine instructions, the variables-and-constructs model of every imperative program, and how data is organised in arrays and files. Every trace below steps through memory line by line — showing exactly how each variable changes is the skill Paper 2 examines most.</p>

<h3>From source code to machine code: translators</h3>
<p>A CPU understands only binary machine code — patterns of 0s and 1s unique to its processor family. Humans write <strong>source code</strong> in a language (Python, C++, Java), so something must convert one to the other: a <strong>translator</strong>, and there are three kinds.</p>
<table border="1" cellpadding="6">
<tr><th>Translator</th><th>How it works</th><th>Result</th><th>Trade-off</th></tr>
<tr><td>Compiler</td><td>Translates the whole program in one pass, before running</td><td>A standalone executable machine-code file</td><td>Fast to run afterwards; errors reported before execution (C++, Pascal)</td></tr>
<tr><td>Interpreter</td><td>Translates and runs one line at a time, in sequence</td><td>No saved executable — the translator is needed every run</td><td>Slow to run, but great for testing: errors appear exactly where they occur (Python, BASIC)</td></tr>
<tr><td>Assembler</td><td>Translates assembly (human-readable mnemonics for single machine instructions) into machine code</td><td>Executable for one processor family</td><td>One-to-one with machine code: fast and precise, but tied to the hardware</td></tr>
</table>
<pre><code>Compiler vs interpreter, step by step, on the same three-line program:

Program:  a = 2 * 3        b = a + 1        print(b)

Compiler:
  1. Read the ENTIRE source file first.
  2. Check syntax of every line; if line 2 is wrong, report it and produce
     nothing - fix it before any code runs.
  3. Emit one machine-code executable.
  4. Run that executable: 18 microseconds of work at full machine speed.

Interpreter:
  1. Take line 1: translate AND execute it - a becomes 6 in memory.
  2. Take line 2: translate AND execute it - b becomes 7.
  3. Take line 3: translate AND execute it - output 7.
  4. If line 2 had failed, line 1 would already have run: execution stops at
     the error, and every run pays the translation cost again.

A syntax error is a grammar mistake the translator refuses; a logic error is
grammar-correct code that computes the wrong thing - translators never catch
those, which is why testing exists.</code></pre>

<h3>Levels of programming language</h3>
<ul>
<li><strong>Machine code</strong> — binary, executed directly, fastest, unreadable to humans, and processor-specific.</li>
<li><strong>Assembly language</strong> — mnemonics (MOV, ADD, JMP) one per machine instruction; still low-level and hardware-tied, needing an assembler.</li>
<li><strong>High-level languages</strong> — English-like statements (PRINT, WHILE, INPUT); portable across machines once translated, readable, faster to develop.</li>
</ul>
<p>The trade-off is always the same: low-level code is small and fast and controls the hardware directly (drivers, embedded systems); high-level code is quick to write and easy to maintain and runs anywhere a translator exists. Fourth-generation languages (SQL, report generators) sit even higher, declaring <em>what</em> is wanted rather than <em>how</em>.</p>

<h3>The vocabulary of a program</h3>
<table border="1" cellpadding="6">
<tr><th>Term</th><th>Meaning</th><th>Cambridge pseudocode example</th></tr>
<tr><td>Variable</td><td>A named memory location whose value can change as the program runs</td><td>score &lt;- 0</td></tr>
<tr><td>Constant</td><td>A named value fixed for the whole run — used for values like pi or tax rates so they are defined once and cannot drift</td><td>CONSTANT taxRate &lt;- 0.2</td></tr>
<tr><td>Data type</td><td>What kind of value a variable holds: INTEGER, REAL, CHAR, STRING, BOOLEAN, DATE</td><td>name : STRING</td></tr>
<tr><td>Identifier</td><td>The name chosen for a variable, constant or procedure</td><td>totalPrice, itemCount</td></tr>
<tr><td>Assignment</td><td>Storing a value in a variable — the right side is evaluated first, then stored left</td><td>total &lt;- price * qty</td></tr>
<tr><td>Comment</td><td>Ignored text explaining the code to human readers</td><td>// running total</td></tr>
</table>
<p>Identifiers have rules worth marks: descriptive names preferred (markScheme not ms), no spaces, cannot start with a digit, and reserved words (PRINT, WHILE, IF) cannot be reused as names.</p>

<h3>Sequence: the first construct</h3>
<p>Every imperative program executes statements one after another, top to bottom — that is <strong>sequence</strong>. The trace is the examiner's favourite question type: keep a column per variable and rewrite each row after every statement.</p>
<pre><code>Trace table. Program:

  1  a &lt;- 5
  2  b &lt;- 2 * a
  3  a &lt;- a + b
  4  OUTPUT a, b

Step   statement        a    b    output
start  (nothing)        ?    ?
1      a &lt;- 5           5    ?
2      b &lt;- 2 * a       5    10       [reads a = 5, stores 10]
3      a &lt;- a + b      15    10       [5 + 10 = 15 OVERWRITES the old a]
4      OUTPUT a, b                        15, 10

The trap in line 3: a + b uses the CURRENT values (5 + 10), then the result
replaces a. Assignment destroys the old value - the trace table keeps it honest.</code></pre>

<h3>Selection: IF, ELSE and ELSEIF</h3>
<p>Selection chooses between paths using a <strong>condition</strong> — an expression that evaluates TRUE or FALSE. Comparison operators: =, &lt;&gt; (not equal), &lt;, &gt;, &lt;=, &gt;=; combine them with AND, OR, NOT. Conditions in pseudocode are never assignment: <em>IF mark = 50</em>, not <em>mark &lt;- 50</em>.</p>
<pre><code>Worked trace: grading with ELSEIF.

  IF mark &gt;= 70 THEN
      grade &lt;- "A"
  ELSEIF mark &gt;= 60 THEN
      grade &lt;- "B"
  ELSEIF mark &gt;= 50 THEN
      grade &lt;- "C"
  ELSE
      grade &lt;- "U"
  ENDIF

Run with mark = 64:
  Line 1: is 64 &gt;= 70? FALSE - skip to the next branch.
  Line 3: is 64 &gt;= 60? TRUE - grade &lt;- "B", and the whole structure ends.
  (The remaining branches are not even tested: ELSEIF means "else, if".)

Run with mark = 45:
  70? no. 60? no. 50? no - all conditions FALSE, so the ELSE branch runs:
  grade &lt;- "U". ELSE is the guaranteed fallback; with no ELSE, grade would
  keep whatever it held before (possibly nothing).</code></pre>
<p>Nested IF (an IF inside another's branch) handles layered conditions; the exam often asks you to write one and to test both boundary cases (69 and 70, not just 65).</p>

<h3>Iteration: WHILE, REPEAT and FOR</h3>
<p>Iteration repeats statements. <strong>WHILE</strong> tests first and repeats <em>while</em> a condition is TRUE — zero repeats possible. <strong>REPEAT…UNTIL</strong> runs the body at least once, then repeats <em>until</em> the condition becomes TRUE — note the polarity: WHILE repeats while TRUE, UNTIL repeats until TRUE. <strong>FOR</strong> repeats a counted number of times.</p>
<pre><code>Full memory trace of a WHILE loop: running total of 1 + 2 + 3 + 4 + 5.

  1  total &lt;- 0
  2  count &lt;- 1
  3  WHILE count &lt;= 5
  4      total &lt;- total + count
  5      count &lt;- count + 1
  6  ENDWHILE
  7  OUTPUT total

Step      condition (count &lt;= 5)   total   count
start                            -        -
1                                 0        -
2                                 0        1
3 test 1                          0        1   TRUE -> enter body
4   total &lt;- 0 + 1                1        1
5   count &lt;- 1 + 1                1        2
3 test 2                          1        2   TRUE
4   total &lt;- 1 + 2                3        2
5   count &lt;- 2 + 1                3        3
3 test 3                          3        3   TRUE
4   total &lt;- 3 + 3                6        3
5   count &lt;- 3 + 1                6        4
3 test 4                          6        4   TRUE
4   total &lt;- 6 + 4               10        4
5   count &lt;- 4 + 1               10        5
3 test 5                         10        5   TRUE
4   total &lt;- 10 + 5              15        5
5   count &lt;- 5 + 1               15        6
3 test 6                         15        6   FALSE -> exit to line 7
7   OUTPUT 15

Two classic bugs visible here: forgetting count &lt;- count + 1 loops forever
(count never reaches 6), and starting count at 0 would run six times.</code></pre>
<p>Off-by-one errors (the loop running once too many or too few) and infinite loops (a condition never updated toward FALSE) are the two most common lost marks — always trace at the boundaries.</p>

<h3>Constructing algorithms</h3>
<p>Before code comes design. <strong>Structure charts</strong> break a problem into a main program and subtasks (top-down decomposition); <strong>pseudocode</strong> expresses the logic in structured English-like statements; <strong>flowcharts</strong> picture it: oval = start/stop, parallelogram = input/output, rectangle = process, diamond = decision, arrows = flow. <strong>Trace tables</strong> (as above) dry-run the algorithm to prove it before coding.</p>
<pre><code>Worked example: design then trace. "Read 10 marks and output the highest."

Pseudocode:
  1  highest &lt;- 0
  2  FOR i &lt;- 1 TO 10
  3      INPUT mark
  4      IF mark &gt; highest THEN
  5          highest &lt;- mark
  6      ENDIF
  7  NEXT i
  8  OUTPUT highest

Trace with inputs 45, 72, 61 (first three of ten):

Step   i   mark   highest   comment
1                  0        no mark can be below 0, safe start
2    1
3         45      0
4   45 &gt; 0 TRUE
5                45
2    2
3         72     45
4   72 &gt; 45 TRUE
5                72
2    3
3         61     72
4   61 &gt; 72 FALSE - highest unchanged
5                72        IF protects the winner

After all ten, line 8 outputs 72.</code></pre>
<p>Procedural decomposition matters in the exam: state the subtasks (input routine, find-max routine, output routine) before writing any of them.</p>

<h3>Arrays</h3>
<p>An <strong>array</strong> is one variable holding many values of the same type, each with an index. It replaces dozens of separately named variables (test1, test2, …) and lets loops process the whole collection. In pseudocode an array is declared by type and size; indices in Cambridge pseudocode usually start at 0 (always check the question's convention).</p>
<pre><code>Cambridge pseudocode: declaring and filling an array of 5 marks.

  DECLARE marks : ARRAY[0:4] OF INTEGER       [indices 0, 1, 2, 3, 4]
  FOR i &lt;- 0 TO 4
      INPUT marks[i]
  NEXT i

Memory after entering 12, 47, 33, 58, 21:

  index:   0    1    2    3    4
  value:  12   47   33   58   21

marks[2] means "the value at index 2" = 33. Traps:
  marks[5] is OUT OF RANGE for a 0:4 array - undefined behaviour, and a
  guaranteed lost mark in an exam answer.
  Assigning marks[1] &lt;- 99 overwrites 47 and leaves everything else alone.

Searching an array, step by step (linear search for 58):

  found &lt;- FALSE
  FOR i &lt;- 0 TO 4
      IF marks[i] = 58 THEN
          found &lt;- TRUE
          position &lt;- i
      ENDIF
  NEXT i

  i = 0: marks[0] = 12 - no
  i = 1: marks[1] = 47 - no
  i = 2: marks[2] = 33 - no
  i = 3: marks[3] = 58 - YES: found &lt;- TRUE, position &lt;- 3
  i = 4: still checked (unless the loop is exited early - a fair refinement)</code></pre>
<p>Two-dimensional arrays (ARRAY[0:3, 0:2]) are grids — rows and columns — used for games boards and seating plans; a value is addressed by both indices, e.g. board[2, 1].</p>

<h3>File handling</h3>
<p>Variables vanish when a program ends; files persist on secondary storage. Text files are read and written <strong>sequentially</strong>, a line at a time. The pattern is always open → use → close, and you must know the mode:</p>
<ul>
<li><strong>READ</strong> mode: open an existing file to get data from it.</li>
<li><strong>WRITE</strong> mode: create a new file (or wipe an existing one — a classic destructive bug when APPEND was needed).</li>
<li><strong>APPEND</strong> mode: add to the end of an existing file, keeping what is there.</li>
</ul>
<pre><code>Worked example: totals and appends. File "scores.txt" holds three lines:
  45
  62
  51

Program:
  1  OPENFILE "scores.txt" FOR READ
  2  total &lt;- 0
  3  WHILE NOT EOF("scores.txt")          [EOF = end of file]
  4      READFILE "scores.txt", score
  5      total &lt;- total + score
  6  ENDWHILE
  7  CLOSEFILE "scores.txt"
  8  OPENFILE "scores.txt" FOR APPEND
  9  WRITEFILE "scores.txt", total
 10  CLOSEFILE "scores.txt"

Memory trace:
  step 2: total = 0
  step 5 (1st read): total = 0 + 45 = 45
  step 5 (2nd read): total = 45 + 62 = 107
  step 5 (3rd read): total = 107 + 51 = 158
  next test: EOF TRUE -> exit loop
  line 9 appends 158; the file now holds four lines: 45, 62, 51, 158.

Had line 8 said FOR WRITE, the three scores would be wiped and the file would
hold only 158 - the mode is the whole question.</code></pre>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Using = for comparison inside conditions when the pseudocode expects &lt;- for assignment and = for testing — know which the question's notation uses and be consistent.</li>
<li>Forgetting that assignment overwrites: <em>a &lt;- a + b</em> destroys the old a; trace tables must show values before and after.</li>
<li>WHILE versus UNTIL polarity: WHILE repeats while the condition is TRUE; UNTIL repeats until it becomes TRUE — writing the wrong one inverts the loop.</li>
<li>Infinite loops from a missing or wrongly directed counter update.</li>
<li>Off-by-one errors at array and loop boundaries: a 0:4 array has five slots, and FOR i &lt;- 1 TO 10 runs ten times, not eleven.</li>
<li>Reading past the end of file or using an open file after CLOSEFILE; always close before reopening in another mode.</li>
<li>Opening a data file FOR WRITE when APPEND was required, destroying the data.</li>
<li>Confusing a compiler with an interpreter in a comparison answer: whole-program translation versus line-by-line execution is the substance of the mark.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Paper 2, 4 marks).</strong> Explain the difference between a compiler and an interpreter.</p>
<p>Answer: A compiler translates the whole source program into machine code before execution, producing a standalone executable that runs fast; syntax errors are all reported before anything runs. An interpreter translates and executes one statement at a time, so the program runs more slowly and must be retranslated each time, but errors appear exactly at the failing line and testing is quicker.</p>
<p><strong>Question 2 (Paper 2, 4 marks).</strong> Complete a trace table for: x &lt;- 3; y &lt;- x * 2; x &lt;- x + y; OUTPUT x.</p>
<p>Answer: After line 1, x = 3. After line 2, y = 6 (3 × 2), x = 3. After line 3, x = 3 + 6 = 9. The output is 9.</p>
<p><strong>Question 3 (Paper 2, 6 marks).</strong> Write pseudocode to read 20 numbers and output how many are negative.</p>
<p>Answer: count &lt;- 0; FOR i &lt;- 1 TO 20; INPUT num; IF num &lt; 0 THEN; count &lt;- count + 1; ENDIF; NEXT i; OUTPUT count.</p>
<p><strong>Question 4 (Paper 2, 3 marks).</strong> An array is declared ARRAY[0:9] OF INTEGER. State how many values it holds, the index of the first and last elements, and the meaning of num[4].</p>
<p>Answer: It holds 10 values; the first is at index 0 and the last at index 9; num[4] is the single value stored at the fifth position (index 4) of the array.</p>
<p><strong>Question 5 (Paper 2, 4 marks).</strong> Explain the difference between opening a file FOR WRITE and FOR APPEND, and state one risk of choosing the wrong one.</p>
<p>Answer: FOR WRITE creates a new file and, if the file already exists, erases its previous contents before writing; FOR APPEND keeps the existing contents and adds new data at the end. Choosing WRITE when APPEND was meant destroys all previous records — an unrecoverable data loss unless a backup exists.</p>
<p><strong>Question 6 (Paper 2, 4 marks).</strong> Describe what is wrong with: WHILE count &lt;= 10; OUTPUT count; ENDWHILE.</p>
<p>Answer: count is never initialised (no starting value) and never incremented inside the loop, so the condition never changes — if it starts TRUE the loop repeats forever (an infinite loop), and if it is somehow FALSE the loop never runs. Fix: set count &lt;- 1 before the loop and add count &lt;- count + 1 inside it.</p>
<p>With the constructs in hand, the next note turns to the craft itself: designing, refining and testing algorithms.</p>
`,

    "230d770c-b169-4153-b7a0-41297244195b": `
<h2>IGCSE Computer Science: Algorithm Design and Problem-Solving</h2>
<p>Cambridge IGCSE Computer Science 0478 (2026–2028), Paper 2 Algorithms, Programming and Logic, statement 7 Algorithm design and problem-solving. Writing code is the last 20% of the job; this note is the other 80% — decomposition, abstraction, stepwise refinement, algorithm design and representation, and the testing that proves it works. Every refinement below is shown stage by stage, and the trace tables demonstrate the dry-run technique examiners expect you to produce under time pressure.</p>

<h3>The problem-solving cycle</h3>
<ul>
<li><strong>1. Analyse the problem</strong> — state precisely what is wanted: the inputs, the required outputs, and any constraints (data ranges, time limits, the algorithm's likely size).</li>
<li><strong>2. Design</strong> — decompose into subtasks and design each algorithm (structure charts, pseudocode, flowcharts).</li>
<li><strong>3. Refine</strong> — develop each subtask stepwise until every step is a statement a coder could translate directly.</li>
<li><strong>4. Write the code</strong> — translate the refined design into a programming language.</li>
<li><strong>5. Test</strong> — run normal, boundary, erroneous and extreme data; compare results with expectations.</li>
<li><strong>6. Maintain</strong> — fix discovered bugs, adapt to new requirements, improve performance.</li>
</ul>
<p>Skipping to step 4 is the failure mode this statement exists to cure: code written without a design is where logic errors breed.</p>

<h3>Abstraction and decomposition</h3>
<p><strong>Decomposition</strong> breaks a big problem into smaller, independently solvable subproblems — planning a school trip becomes booking transport, booking accommodation, collecting money, producing a register. Each subtask is solved on its own and recombined. <strong>Abstraction</strong> is deliberately ignoring detail that does not matter to the task: a seat-booking system models seat numbers and states but not the fabric colour of the seats. Together they keep designs comprehensible — the exam wants a structure chart with named subtasks, not just prose.</p>
<pre><code>Decomposition worked example: a school sports-day results system.

Level 0 (whole problem): record events, score house points, print winners.
Level 1 subtasks:
  1. Input event results (validation included)
  2. Convert places to house points
  3. Accumulate house totals
  4. Determine and print the winning house

Each level-1 subtask decomposes again - refinement of subtask 2:
  2.1  read the event's placing (1st, 2nd, 3rd)
  2.2  look up the points for that placing (5, 3, 1)
  2.3  add the points to the correct house total
  2.4  repeat for each event

At the end of refinement every leaf step is a single statement - that is the
stopping rule for stepwise refinement.</code></pre>

<h3>Stepwise refinement</h3>
<p>Refinement turns an outline into detail in stages, keeping each stage reviewable. Start with one line; expand the hardest or vaguest part into steps; expand those; stop when each step is trivially translatable. The trace at each stage catches errors while they are cheap.</p>
<pre><code>Refinement stages: "find the mean of a set of numbers".

Stage 0 (outline):     get the numbers, compute the mean, print it.

Stage 1:
  initialise total and count
  get the numbers, adding each to the total and counting it
  compute mean &lt;- total / count
  print mean

Stage 2 (final pseudocode):
  1  total &lt;- 0
  2  count &lt;- 0
  3  INPUT num
  4  WHILE num &lt;&gt; -1              [-1 as a sentinel value meaning "no more"]
  5      total &lt;- total + num
  6      count &lt;- count + 1
  7      INPUT num
  8  ENDWHILE
  9  IF count &gt; 0 THEN
 10      mean &lt;- total / count
 11      OUTPUT mean
 12  ELSE
 13      OUTPUT "no data entered"
 14  ENDIF

Note what refinement surfaced: the empty-input case (line 9). Division by zero
would have been a runtime failure - refinement finds these before coding.</code></pre>
<p>The sentinel (-1) is one way to end input; alternatives are a known count (read exactly n values) or an end-of-file test. State which you use and make sure the sentinel can never be legitimate data.</p>

<h3>Representing algorithms</h3>
<table border="1" cellpadding="6">
<tr><th>Form</th><th>What it shows</th><th>Best for</th></tr>
<tr><td>Structure chart</td><td>Whole problem decomposed into named subtasks and their data links</td><td>The overview; planning who does what</td></tr>
<tr><td>Pseudocode</td><td>The logic in structured, language-independent statements</td><td>Precise design and exam answers</td></tr>
<tr><td>Flowchart</td><td>Flow of control visually: oval start/stop, parallelogram I/O, rectangle process, diamond decision</td><td>Showing branches and loops at a glance</td></tr>
<tr><td>Trace table</td><td>Variable values statement by statement for given inputs</td><td>Proving correctness before coding</td></tr>
</table>
<pre><code>The same algorithm as a flowchart text sketch: reading marks until -1 and
counting passes (mark &gt;= 40).

  (start) -> [passes &lt;- 0] -> [INPUT mark] -> &lt;mark = -1?&gt;
      | no                         | yes
      v                            v
  &lt;mark &gt;= 40?&gt; --yes--> [passes &lt;- passes + 1] --+
      | no                                       |
      +------------------------------------------+
                                                 v
                                    [INPUT mark] -> loop back to &lt;mark = -1?&gt;
  (stop) <- [OUTPUT passes]

Note the two diamonds in sequence: the loop test runs first on every value,
including the very first, and the sentinel is tested BEFORE the pass test so
-1 is never counted as a fail.</code></pre>

<h3>Trace tables and dry running</h3>
<p>A trace table proves the design with real data before any code runs. One column per variable; one row per statement executed (loops repeat rows); outputs recorded as they happen. Always test at least: normal data, boundary data, and erroneous data.</p>
<pre><code>Trace: count how many of 5 numbers exceed their predecessor.

  1  count &lt;- 0
  2  INPUT previous
  3  FOR i &lt;- 2 TO 5
  4      INPUT current
  5      IF current &gt; previous THEN
  6          count &lt;- count + 1
  7      ENDIF
  8      previous &lt;- current
  9  NEXT i
 10  OUTPUT count

Inputs: 10, 15, 15, 9, 20

Step    i   previous  current  count   comment
1                             0
2             10              0
3       2      10             0
4       2      10      15     0
5       2      10      15     0   15 &gt; 10 TRUE
6       2      10      15     1
8       2      15      15     1   previous tracks the latest
3       3      15             1
4       3      15      15     1
5       3      15      15     1   15 &gt; 15 FALSE (equal is not greater)
8       3      15      15     1
3       4      15             1
4       4      15       9     1
5       4      15       9     1   9 &gt; 15 FALSE
8       4       9       9     1
3       5       9             1
4       5       9      20     1
5       5       9      20     1   20 &gt; 9 TRUE
6       5       9      20     2
8       5      20      20     2
10                        output 2

Boundary check: equal neighbours (15, 15) must NOT count - that row is the one
markers look for.</code></pre>

<h3>Testing</h3>
<ul>
<li><strong>Normal (valid) data</strong> — typical values that should work; checks the happy path.</li>
<li><strong>Boundary (extreme) data</strong> — values at the edges of validity (0 and 100 for marks, exactly at a threshold); most bugs live here.</li>
<li><strong>Erroneous (invalid) data</strong> — values the program should reject (negative marks, letters where numbers are expected); checks validation and error handling.</li>
</ul>
<p>Test data should be chosen deliberately with an expected result stated for each test <em>before</em> running it — otherwise you are checking what the program does, not what it should do. For the mean example above: normal (2, 4, 6 → mean 4), boundary (one value only → the value itself), erroneous (sentinel entered first → "no data entered", not a division by zero).</p>
<p><strong>Iterative (agile) development</strong> is examined here too: develop in small iterations, each designing, coding and testing one subtask, then review with the client before the next. Advantages: working software early, changing requirements absorbed cheaply, frequent feedback and testing built in; disadvantages: unclear final scope and budget, and endless change without discipline. Against waterfall (one linear design→build→test→release pass): clear milestones and documentation, but late testing and expensive changes once built.</p>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Jumping straight to code: marks are for analysis, decomposition and refinement stages — show them.</li>
<li>Decomposition that is too shallow: subtasks must reach single-statement steps ("input the numbers" is a subtask, not a refinement).</li>
<li>Test data without expected outputs; and boundary values are worth as many marks as the normal case.</li>
<li>Forgetting the empty-input and division-by-zero case in averages — the most-missed validation mark in Paper 2.</li>
<li>Sentinel values that collide with real data (using -1 to stop, when -1 is a valid score).</li>
<li>Trace tables that skip loop repetitions or show only the final value; markers want the statement-by-statement rows.</li>
<li>Confusing validation (is the data in range?) with verification (is the data the right data — e.g. double entry).</li>
<li>Listing agile benefits alone; the question usually wants the comparison against a linear model stated explicitly.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Paper 2, 4 marks).</strong> Explain what is meant by decomposition and abstraction, giving an example of each.</p>
<p>Answer: Decomposition splits a problem into smaller subproblems that can be solved separately — an online shop system breaks into stock control, basket, payment and delivery subsystems. Abstraction ignores details irrelevant to the problem — the basket subsystem models items and quantities but not the warehouse's shelf colours, so the design stays manageable.</p>
<p><strong>Question 2 (Paper 2, 4 marks).</strong> Refine the step "process the order" into structured pseudocode.</p>
<p>Answer: READ order lines from the file; FOR each line: check the item is in stock; IF in stock THEN add the line total (price × quantity) to orderTotal and reduce stock; ELSE record the item as out of stock; NEXT; apply any discount to orderTotal; OUTPUT orderTotal and the out-of-stock list.</p>
<p><strong>Question 3 (Paper 2, 3 marks).</strong> State three types of test data and give one example of each for a program accepting a mark between 0 and 100.</p>
<p>Answer: Normal data — a typical in-range value such as 65. Boundary data — the edge values 0 and 100 (and just outside, 101). Erroneous data — an invalid value such as -5 or the letter "A".</p>
<p><strong>Question 4 (Paper 2, 4 marks).</strong> Explain why a trace table is produced before code is written.</p>
<p>Answer: A trace table executes the algorithm step by step on paper, recording each variable's value after every statement, so logic errors — infinite loops, wrong branch conditions, off-by-one errors — are found while the design is still cheap to change. It also provides the expected outputs used later as test data, so the coded program can be checked against a proven result.</p>
<p><strong>Question 5 (Paper 2, 4 marks).</strong> Compare iterative development with a waterfall approach.</p>
<p>Answer: Iterative development builds in small cycles with client review after each, delivering working software early and absorbing requirement changes cheaply, at the cost of a less predictable final scope and budget. Waterfall completes each stage before the next, giving fixed milestones, clear documentation and easy planning, but testing happens late and changes after coding are expensive.</p>
<p><strong>Question 6 (Paper 2, 5 marks).</strong> Write pseudocode that reads numbers until the user enters 0, then outputs the largest number entered (0 not counted).</p>
<p>Answer: largest &lt;- 0; INPUT num; WHILE num &lt;&gt; 0; IF num &gt; largest THEN; largest &lt;- num; ENDIF; INPUT num; ENDWHILE; OUTPUT largest. (Assumes positive input; a full solution might flag if no positive number was entered.)</p>
<p>These design skills now apply to the two remaining Paper 2 domains: databases and Boolean logic.</p>
`,
  },
};
