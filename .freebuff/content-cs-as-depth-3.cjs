// Computer Science AS batch 7: Pearson Edexcel IAL Computer Science (YCP11),
// Unit 2 Practical Programming and Problem Solving - computational thinking and
// algorithms with the full programming lifecycle, data types, records and
// arrays, and database concepts with DBMS functions and SQL. Apply:
//   node .freebuff/deepen-materials.cjs .freebuff/content-cs-as-depth-3.cjs > .freebuff-tmp/cs-as-depth-3.sql
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/cs-as-depth-3.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/cs-as-depth-3.sql --apply    (live)
//   node .freebuff/gate-notes-depth.cjs computer-science AS
module.exports = {
  expectType: "notes",
  titles: {
    "45b10674-ff18-4672-8046-5a67a308f50a": "Edexcel IAL Computer Science: Computational Thinking and Programming",
    "eb9deec8-1112-4fa5-aaff-c4302c1ed6ad": "Edexcel IAL Computer Science: Data Types, Records and Arrays",
    "ab443e7e-11f0-4286-966f-b5ff4edc5835": "Edexcel IAL Computer Science: Database Concepts and DBMS",
  },
  rows: {
    "45b10674-ff18-4672-8046-5a67a308f50a": `
<h2>Edexcel IAL Computer Science: Computational Thinking and Programming</h2>
<p>Pearson Edexcel International Advanced Level in Computer Science, Unit 2 Practical Programming and Problem Solving: computational thinking skills, algorithm design, programming basics and constructs, structured programming, and the program development life cycle with design and testing. This is the unit where knowledge becomes craft — so every algorithm here is refined stage by stage, every trace runs statement by statement, and every test case is chosen with its expected output stated before execution. The Python shown is version 3, as the unit requires.</p>

<h3>Computational thinking</h3>
<ul>
<li><strong>Abstraction</strong> — discard irrelevant detail, model what matters (a timetable models rooms and slots, not paint colours).</li>
<li><strong>Decomposition</strong> — break a problem into independently solvable parts (an ordering system: stock, basket, payment, delivery).</li>
<li><strong>Pattern recognition</strong> — spot repetition that generalises (three near-identical report routines become one parameterised function).</li>
<li><strong>Algorithmic thinking</strong> — express solutions as precise, ordered, unambiguous steps.</li>
</ul>
<p>These four run through everything below: decomposition yields the module structure, abstraction the data model, patterns the loops and functions, and algorithmic thinking the pseudocode.</p>

<h3>Algorithm design and representation</h3>
<p>Representations: <strong>pseudocode</strong> (structured language-independent statements), <strong>flowcharts</strong> (oval start/end, parallelogram I/O, rectangle process, diamond decision), <strong>structure charts</strong> (module hierarchy with data couples). Stepwise refinement expands one outline line into steps until each is trivially implementable.</p>
<pre><code>Refinement worked end to end: "process a batch of orders".

Stage 0:   for each order: validate, price, update stock, report.

Stage 1:
  open the order file and the stock file
  for each order in the file:
      validate the order (product exists, quantity positive, credit ok)
      if valid: price it (quantity x unit price, apply discounts)
                update stock (decrement, flag reorders)
                append to the invoice file
      else: append to the error report
  print summary totals

Stage 2 (final pseudocode for one leaf - pricing):

  FUNCTION priceOrder(qty, unitPrice, customerDiscount)
      subtotal <- qty * unitPrice
      IF qty >= 100 THEN
          bulkDiscount <- subtotal * 0.05
      ELSE
          bulkDiscount <- 0
      ENDIF
      total <- subtotal - bulkDiscount
      total <- total * (1 - customerDiscount)
      RETURN total
  ENDFUNCTION

Notice what refinement exposed: two discounts stack - the order of application
must be specified, and the boundary (exactly 100) tested both sides.</code></pre>

<h3>Programming basics and constructs</h3>
<p>Variables hold typed values; assignment stores the evaluated right-hand side. The three constructs: <strong>sequence</strong> (statements in order), <strong>selection</strong> (IF / ELIF / ELSE on boolean conditions; nested selection for layered cases), <strong>iteration</strong> (FOR over a known count, WHILE while a condition holds — plus the off-by-one and infinite-loop traps). Subprograms: <strong>procedures</strong> (named actions, no return) and <strong>functions</strong> (named calculations, return a value); parameters pass data in, return passes results out, and scope keeps locals local.</p>
<pre><code>Python 3 - constructs with line-by-line memory commentary:

  1  def classify(mark):            # function definition; mark is a parameter
  2      if mark >= 70:             # selection: evaluates mark >= 70
  3          return "Distinction"
  4      elif mark >= 50:           # only reached when mark < 70
  5          return "Pass"
  6      else:
  7          return "Fail"
  8
  9  results = []                   # an empty list
 10  for mark in [65, 72, 41]:      # iteration: mark takes each value in turn
 11      results.append(classify(mark))   # call; return value appended
 12  print(results)

Trace:
  line 9:  results = []
  line 10: mark = 65 -> classify: 65>=70 false, 65>=50 true -> "Pass"
  line 11: results = ["Pass"]
  line 10: mark = 72 -> 72>=70 true -> "Distinction"
  line 11: results = ["Pass", "Distinction"]
  line 10: mark = 41 -> both tests false -> "Fail"
  line 11: results = ["Pass", "Distinction", "Fail"]
  line 12: prints ['Pass', 'Distinction', 'Fail']

Definite iteration (FOR) over a list; indefinite iteration (WHILE) for
"read until a sentinel" patterns.</code></pre>
<p><strong>Structured programming</strong> discipline: one entry/exit per structure, no wild jumps (goto), top-down design with clear module interfaces, and named constants for magic numbers. Benefits: readability, testability and maintainability — and the exam expects those words attached to the technique.</p>

<h3>Program design tools</h3>
<p>Before code, the design is expressed in forms the team can review. <strong>Structure charts</strong> show the module hierarchy: the main program at the top, subtasks beneath, with data couples marking what passes between them — a chart with three levels proves the decomposition. <strong>Pseudocode</strong> gives each leaf module's exact logic; <strong>flowcharts</strong> show branch and loop shape at a glance; a <strong>data dictionary</strong> lists every variable and file field with its type, range and purpose, so modules agree on interfaces before they are coded. Naming conventions, indentation standards and comment discipline are part of the same stage: code is read far more often than written, and the exam gives method marks for showing these artefacts rather than jumping straight to Python.</p>

<h3>File handling, validation and data persistence</h3>
<pre><code>Python 3 - writing then reading a data file, with validation:

  # write
  with open("temps.txt", "w") as f:        # "w" creates or TRUNCATES
      for reading in [21.5, 19.0, -999]:
          if reading < -50 or reading > 60:      # range validation
              continue                            # skip invalid sensor value
          f.write(str(reading) + "\\n")

  # read
  total = 0.0
  count = 0
  with open("temps.txt", "r") as f:        # with closes the file automatically
      for line in f:
          value = float(line)              # type conversion; may raise ValueError
          total += value
          count += 1
  if count > 0:                            # guard the division
      print("mean =", total / count)
  else:
      print("no valid data")

Traps the examiner sets: "w" wiping an existing file where "a" (append) was
meant; reading without closing (the with statement prevents it); averaging
without the empty-file guard; and validating after conversion rather than
before.</code></pre>
<p>Validation techniques: presence, type, range, length, check digit, list/pick-list, and format (regular expression) checks. Verification: double entry, visual checking, read-back. Input/output at this level is routine-level discipline: every value entering the system passes a check at the boundary.</p>

<h3>Program development life cycle</h3>
<table border="1" cellpadding="6">
<tr><th>Stage</th><th>Activities</th><th>Artifacts</th></tr>
<tr><td>Analysis</td><td>Gather requirements; define inputs, outputs, constraints</td><td>Requirements specification</td></tr>
<tr><td>Design</td><td>Decompose; design data structures and algorithms</td><td>Structure charts, pseudocode, data dictionary</td></tr>
<tr><td>Implementation</td><td>Code, follow standards, review</td><td>Source code, comments</td></tr>
<tr><td>Testing</td><td>Normal, boundary, erroneous, edge cases; debug</td><td>Test plans, test results, bug reports</td></tr>
<tr><td>Maintenance</td><td>Corrective, adaptive, perfective changes</td><td>Revised code and docs</td></tr>
</table>
<p><strong>Iterative (agile)</strong> development cycles through these stages in small increments with frequent client review; <strong>waterfall</strong> completes each stage once in order. Agile absorbs change cheaply and shows working software early; waterfall suits fixed-scope contracts with heavy documentation. The exam wants the comparison, not a preference.</p>
<pre><code>Testing worked example: priceOrder above (5% bulk discount at 100+ units).

Test plan rows - each states expected output BEFORE running:

  normal:    qty 50, unit 10.0, disc 0    -> 500.00      (no bulk discount)
  boundary:  qty 99, unit 10.0, disc 0    -> 990.00      (just below)
  boundary:  qty 100, unit 10.0, disc 0   -> 950.00      (bulk fires: 1000*0.95)
  boundary:  qty 101, unit 10.0, disc 0   -> 959.50      (just above)
  erroneous: qty -5, unit 10.0, disc 0    -> should be rejected by validation
  edge:      qty 100, unit 0, disc 0.1    -> 0.00        (zero price)

Unit testing checks the function in isolation; integration testing checks it
with the stock and invoice modules; acceptance testing checks the customer's
requirements. Black-box testing uses specifications only; white-box testing
uses code structure (statement, branch coverage).</code></pre>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Design jumps: no decomposition or refinement shown before code loses method marks.</li>
<li>WHILE loops with uninitialised or never-updated conditions (infinite loops); FOR loop boundary errors (range(1, n+1) versus range(1, n)).</li>
<li>Testing only normal data; boundary and erroneous data carry equal marks.</li>
<li>Test results without pre-stated expectations — that is checking, not testing.</li>
<li>Confusing procedures with functions (return value) or parameters with arguments at the call site.</li>
<li>"w" versus "a" file modes destroying data; and no empty-input guard before division.</li>
<li>Stating agile is "better" without the trade-off comparison the question asks for.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Unit 2, 4 marks).</strong> Explain abstraction and decomposition with examples from a library system.</p>
<p>Answer: Abstraction models only relevant features — the system tracks loans, members and due dates while ignoring irrelevant details like book cover designs. Decomposition splits the problem into solvable parts — catalogue search, loans/returns, fines, member accounts — each designed and tested independently before integration.</p>
<p><strong>Question 2 (Unit 2, 6 marks).</strong> Write pseudocode for a function that returns the median of three numbers.</p>
<p>Answer: FUNCTION median3(a, b, c): IF (a >= b AND a <= c) OR (a <= b AND a >= c) THEN RETURN a; ELSEIF (b >= a AND b <= c) OR (b <= a AND b >= c) THEN RETURN b; ELSE RETURN c; ENDIF. (Alternative: sort the three values and return the middle.)</p>
<p><strong>Question 3 (Unit 2, 4 marks).</strong> Describe a test plan for a program calculating exam grades from marks 0–100.</p>
<p>Answer: Normal: 55 → Pass. Boundary: 0, 100, and the grade thresholds 49/50 and 69/70 tested both sides. Erroneous: -1 and 101 rejected by range validation; "abc" rejected by type check. Each test records expected output before execution; failures are logged and retested after fixes.</p>
<p><strong>Question 4 (Unit 2, 4 marks).</strong> Compare iterative and waterfall development.</p>
<p>Answer: Iterative development delivers in small cycles with client review after each, so working software appears early and requirement changes are absorbed cheaply — at the cost of less predictable final scope and budget. Waterfall completes analysis, design, implementation and testing in sequence, giving clear milestones and documentation, but testing comes late and changes after design are expensive.</p>
<p><strong>Question 5 (Unit 2, 4 marks).</strong> Explain the difference between validation and verification, and give two validation techniques.</p>
<p>Answer: Validation checks data is plausible before storage (range check rejects a mark of 300); verification checks captured data matches the source (double entry of a password). Two further validation techniques: type checks (reject letters in a numeric field) and length checks (reject an 8-digit account number where 10 are required).</p>
<p><strong>Question 6 (Unit 2, 5 marks).</strong> Write Python 3 that reads numbers from a file and outputs the largest, handling an empty file.</p>
<p>Answer: largest = None; with open("nums.txt") as f: for line in f: v = float(line); if largest is None or v > largest: largest = v; if largest is None: print("file is empty"); else: print("largest =", largest).</p>
<p>With the craft established, the next note organises what programs manipulate: data types, records and arrays.</p>
`,

    "eb9deec8-1112-4fa5-aaff-c4302c1ed6ad": `
<h2>Edexcel IAL Computer Science: Data Types, Records and Arrays</h2>
<p>Pearson Edexcel International Advanced Level in Computer Science, Unit 2 Practical Programming and Problem Solving: data types and records, and arrays. Choosing how data is represented decides what code can do with it — so this note follows each structure from declaration through memory layout to the algorithms that use it, with every index and pointer traced on a drawn memory diagram.</p>

<h3>Primitive data types</h3>
<table border="1" cellpadding="6">
<tr><th>Type</th><th>Values</th><th>Operations</th><th>Watch for</th></tr>
<tr><td>INTEGER</td><td>Whole numbers in a fixed range</td><td>Arithmetic, comparison</td><td>Overflow at range limits</td></tr>
<tr><td>REAL/FLOAT</td><td>Approximate decimals</td><td>Arithmetic</td><td>Rounding error; equality tests unreliable</td></tr>
<tr><td>CHAR</td><td>One symbol</td><td>Comparison by code</td><td>'A' ≠ 'a' in ASCII</td></tr>
<tr><td>STRING</td><td>Sequences of characters</td><td>Concatenation, slicing, length, search</td><td>Immutable in Python; indexing from 0</td></tr>
<tr><td>BOOLEAN</td><td>TRUE / FALSE</td><td>AND, OR, NOT</td><td>Truthiness of 0 and ""</td></tr>
<tr><td>DATE/TIME</td><td>Calendar values</td><td>Comparison, difference</td><td>Time zones and formats</td></tr>
</table>
<p><strong>Type casting</strong>: int→float widening is exact; float→int truncates (7.9 → 7) unless rounded; string→number raises errors on bad input (hence validation first); char→int yields the character code. Python's dynamic typing assigns without declaration, but the underlying values still have types — the difference between language convenience and data semantics is examinable.</p>

<h3>Records</h3>
<p>An <strong>array</strong> groups values of <em>one</em> type; a <strong>record</strong> groups values of <em>different</em> types describing one entity. A student record: {studentID: STRING, name: STRING, mark: INTEGER, isEnrolled: BOOLEAN}. Records give structure and meaning; fields are accessed by name, eliminating the "which index was the mark?" problem.</p>
<pre><code>Memory view of one student record:

  +-----------+--------+------+------------+
  | studentID | name   | mark | isEnrolled |
  +-----------+--------+------+------------+
  | "S1024"   | "Chen" |  72  |    TRUE    |
  +-----------+--------+------+------------+

A file of records is the same shape repeated: each line/record one student -
the bridge between in-memory structures and file organisation (covered in
depth at A2).

Python dictionaries play the record role:
  student = {"studentID": "S1024", "name": "Chen", "mark": 72}
  student["mark"] = 75         # field update by name
  if student["mark"] >= 70: ...</code></pre>

<h3>Strings as character arrays</h3>
<p>A string is conceptually an array of characters, so every array operation has a string analogue: indexing (name[0] is the first character), traversal (examining each character), searching (finding a substring), and length. String-specific operations the exam expects: concatenation, slicing, case conversion, and comparison by character code. Python immutability matters here — methods like upper() return new strings rather than modifying the original — and off-by-one errors appear in slicing (s[2:5] gives characters at indices 2, 3 and 4, not 5). Converting between characters and their codes (ord('A') = 65, chr(66) = 'B') links this note back to the representation work in Unit 1.</p>

<h3>Array algorithms in full</h3>
<p>Four operations cover most exam questions, and each has a cost worth stating. <strong>Traverse</strong>: visit every slot once — O(n), one loop. <strong>Search</strong>: linear search compares each slot until a match (O(n)); on sorted arrays, <strong>binary search</strong> halves the remaining range each comparison (O(log n)) — examined fully at A2. <strong>Sort</strong>: ordering an array (bubble, insertion, selection) so search and output are possible. <strong>Aggregate</strong>: count, sum, min, max, mean — one pass with a running value. Each pattern is a loop with a purpose; the trace table is the proof.</p>

<h3>Arrays: declaration, indexing and processing</h3>
<p>An array reserves a contiguous block, one slot per index, accessed in constant time. Declaration fixes the size and element type; index conventions matter (pseudocode often 0..n−1 or 1..n — always state which). Standard patterns: traverse, search, insert, delete, and compute aggregates.</p>
<pre><code>Array of 6 marks, 0-based, after filling:

  index:  0    1    2    3    4    5
  value: 55   72   41   68   90   55

Linear search for 68 - every step:
  i=0: marks[0]=55, not 68
  i=1: marks[1]=72, not 68
  i=2: marks[2]=41, not 68
  i=3: marks[3]=68 - found; return index 3 (and stop)

  Worst case: searching for a value not present walks all 6 slots - n
  comparisons for n items: O(n). (Complexity is examined fully at A2.)

Counting above the pass mark - aggregate pattern:
  count = 0
  for i in range(6):
      if marks[i] >= 50:
          count += 1
  # trace: i=0:55 yes (1); i=1:72 yes (2); i=2:41 no; i=3:68 yes (3);
  #        i=4:90 yes (4); i=5:55 yes (5) -> count = 5

Insert shifting (insert 60 at position 2): shift elements right from the end -
  [55, 72, 41, 68, 90] -> [55, 72, 60, 41, 68] with 90 dropped if full.
  Deleting at position 1 shifts left: [55, 60, 41, 68] - O(n) moves either way.</code></pre>
<p><strong>Bounds and traps</strong>: marks[6] on the array above is out of range (undefined behaviour in many languages; Python raises IndexError); an array is fixed size in classic languages (overflow/underflow on insert/delete), while Python lists are dynamic. <strong>Two-dimensional arrays</strong> are grids: declaration ARRAY[0:3, 0:2] gives 4 rows × 3 columns; a value needs both indices — board[row][col] — and traversal nests a loop within a loop.</p>
<pre><code>2D array worked: seating plan 3 rows x 4 columns, mark every empty seat.

  seats = [[0, 1, 0, 0],
           [1, 1, 0, 1],
           [0, 0, 0, 0]]

  empty = 0
  for row in range(3):
      for col in range(4):
          if seats[row][col] == 0:
              empty += 1
  # row 0: 3 empty; row 1: 1 empty; row 2: 4 empty -> empty = 8

Memory is linear (row-major: row 0's four cells, then row 1's...), which is
why nested loops traverse row by row.</code></pre>

<h3>Static versus dynamic structures</h3>
<p>Static arrays: fixed size set at declaration, contiguous, fast indexed access, wasted or insufficient space decided in advance. Dynamic structures (Python lists, linked lists at A2) grow as needed with allocation overhead. Choosing: known fixed bounds and heavy indexing → static array; unpredictable growth and frequent inserts → dynamic. The exam wants the reason in terms of allocation and access cost.</p>
<pre><code>Worked example: choosing a structure for three jobs.

1. Storing 30 daily temperatures with heavy day-by-day access:
   static array of 30 REALs - known size, constant-time indexed reads.

2. A task queue where items arrive and leave unpredictably:
   a dynamic structure (list or queue) - a fixed array would overflow.

3. Storing 200 employee records keyed by staff number:
   an array/FILE of records, or a dictionary - records give typed fields,
   a dictionary gives name-based access; sequential arrays suit batch
   processing, dictionaries suit lookups.</code></pre>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Off-by-one indices: an array declared [0:5] has six slots; a loop for i in range(6) covers exactly those.</li>
<li>Assuming the language's array bounds are checked; pseudocode questions want you to state the guard, not assume one.</li>
<li>Using float for money (rounding error) or equality tests on floats (use a tolerance).</li>
<li>Confusing records with arrays: uniform typed slots versus named mixed fields of one entity.</li>
<li>2D indexing order: seats[row][col], and nested loops must match that order.</li>
<li>Forgetting that insertion/deletion in arrays shifts elements (O(n)) — cost statements earn marks.</li>
<li>Declaring a fixed array for data of unpredictable size without discussing the overflow risk.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Unit 2, 3 marks).</strong> Explain the difference between a record and an array.</p>
<p>Answer: An array stores multiple values of the same data type under one name, accessed by index — suited to lists of like values. A record groups fields of different types describing one entity (a student: string name, integer mark, boolean status), accessed by field name. Arrays suit collections; records suit entities.</p>
<p><strong>Question 2 (Unit 2, 4 marks).</strong> An array holds 5 values at indices 1–5. Describe what happens when a value is inserted at index 2.</p>
<p>Answer: To make room, elements at indices 5 down to 2 are each shifted one position up (5→6 slot if space, else the last is lost in fixed arrays); the new value is written at index 2. The operation takes O(n) moves, and a bounds check must confirm the array is not full before shifting.</p>
<p><strong>Question 3 (Unit 2, 4 marks).</strong> Write pseudocode to find the smallest value in an array of 100 numbers and explain the role of the first element.</p>
<p>Answer: smallest &lt;- numbers[1]; FOR i &lt;- 2 TO 100; IF numbers[i] &lt; smallest THEN; smallest &lt;- numbers[i]; ENDIF; NEXT i; OUTPUT smallest. Initialising smallest with the first element guarantees a real value from the array is the starting benchmark (initialising with 0 would fail for all-negative data).</p>
<p><strong>Question 4 (Unit 2, 3 marks).</strong> Explain two differences between static and dynamic data structures.</p>
<p>Answer: A static structure's size is fixed at declaration — memory is reserved once, giving fast indexed access but overflow risk or wasted space. A dynamic structure grows and shrinks during execution by allocating memory as needed — flexible for unpredictable data volumes, at the cost of allocation overhead and (for linked structures) slower indexed access.</p>
<p><strong>Question 5 (Unit 2, 4 marks).</strong> Describe how a 2D array could represent a noughts-and-crosses board and how a win is checked.</p>
<p>Answer: A 3×3 array stores each cell's state (empty, X, O), addressed board[row][col]. A win check tests the eight lines: three rows (board[0][0]=board[0][1]=board[0][2], etc.), three columns, and two diagonals — each test comparing three cells for equality and not-empty.</p>
<p><strong>Question 6 (Unit 2, 3 marks).</strong> Explain why money should not be stored in a float variable.</p>
<p>Answer: Binary floating point cannot represent many decimal fractions exactly (0.1 has no finite binary expansion), so repeated arithmetic accumulates rounding error and balance checks drift out. Money is stored as integer minor units (pence) or a decimal type, with rounding rules applied explicitly at defined points.</p>
<p>Records in files are the raw material of information systems; the next note shows how databases organise them at scale.</p>
`,

    "ab443e7e-11f0-4286-966f-b5ff4edc5835": `
<h2>Edexcel IAL Computer Science: Database Concepts and DBMS</h2>
<p>Pearson Edexcel International Advanced Level in Computer Science, Unit 2 Practical Programming and Problem Solving (with Unit 4 design depth): database concepts — the relational model, keys and relationships — and the functions of a database management system. SQL querying and normalisation appear at Unit 4 depth; this note builds the conceptual foundation every later question assumes. Each design rule is demonstrated on a worked table where breaking it visibly corrupts the data.</p>

<h3>From files to databases</h3>
<p>Flat files per department lead to classic failures: duplication (the same customer stored in sales and delivery files), inconsistency (one copy updated, one stale), no cross-file querying without bespoke code, weak security (each file its own controls), and concurrent-update hazards (two users editing copies that later overwrite each other). A <strong>database</strong> stores integrated data once under shared rules; a <strong>DBMS</strong> manages it — and the comparison question wants those failure modes named.</p>

<h3>The relational model</h3>
<p>Data lives in <strong>tables</strong> (relations): rows are records (tuples), columns are fields (attributes) of one type. The model's rules: each field holds one value (no repeating groups), each row is unique, and rows have no order (a table is a set — ordering comes from queries). The design vocabulary: a <strong>primary key</strong> uniquely identifies each row (never null, never duplicated); a <strong>foreign key</strong> is a field whose values must match a primary key in another table, creating the relationship and enforcing referential integrity.</p>
<pre><code>Worked tables and their keys:

STUDENT (studentID [PK], name, class)
  S1  Chen   11A
  S2  Ali    11B
  S3  Banda  11A

GRADE (resultID [PK], studentID [FK -> STUDENT], subject, mark)
  R1  S1  Maths    72
  R2  S1  Physics  65
  R3  S2  Maths    58

Relationships: STUDENT to GRADE is one-to-many (one student, many grades).
Referential integrity: a GRADE row with studentID S9 would be rejected -
no such student. Deleting S2 must handle their grade R3 (restrict, cascade
or set null) - the delete rule is a design decision the exam probes.</code></pre>
<p>Relationship types: <strong>one-to-one</strong> (student ↔ locker), <strong>one-to-many</strong> (student ↔ grades), <strong>many-to-many</strong> (students ↔ subjects) — resolved with a linking/junction table (ENROLMENT: studentID, subject) so every relationship is physically one-to-many.</p>

<h3>DBMS functions</h3>
<ul>
<li><strong>Data dictionary / metadata management</strong> — stores the schema (tables, types, keys, constraints) that defines valid data.</li>
<li><strong>Storage and retrieval</strong> — efficient physical management and indexing.</li>
<li><strong>Security</strong> — accounts, authentication, permissions per user/role, and audit trails.</li>
<li><strong>Integrity</strong> — enforcing constraints: type, range (CHECK), entity (primary key uniqueness), referential (foreign keys), so bad data cannot be stored regardless of the client.</li>
<li><strong>Concurrency control</strong> — locking and transaction isolation so simultaneous users cannot corrupt data (lost updates prevented).</li>
<li><strong>Recovery / backup</strong> — transaction logs and restore after failure.</li>
<li><strong>Query facilities</strong> — a query language (SQL) and report generation.</li>
</ul>
<pre><code>Concurrency worked: two clerks updating the same stock level (100).

Without control:                          With locking:
  Clerk A reads 100                        Clerk A reads 100 (row locked)
  Clerk B reads 100                        Clerk B's update WAITS
  Clerk A writes 100 - 10 = 90             Clerk A writes 90 (lock released)
  Clerk B writes 100 - 25 = 75             Clerk B reads 90, writes 65
  Result 75: A's sale LOST - wrong.        Result 65: both sales counted.

Transactions are ACID: Atomic (all-or-nothing), Consistent (rules hold
afterwards), Isolated (concurrent transactions do not interfere), Durable
(committed data survives failure) - the four initials are directly
examinable.</code></pre>

<h3>Schema design and normalisation (foundation)</h3>
<p>Normalisation removes duplication and the anomalies it causes. <strong>1NF</strong>: no repeating groups; every field single-valued. <strong>2NF</strong>: 1NF and no partial dependency on part of a composite key. <strong>3NF</strong>: 2NF and no transitive dependency (non-key fields must not determine each other). Full treatment with worked conversions sits in the A2 database-design note; the foundation idea here is single fact, single place.</p>
<pre><code>Anomaly worked on an unnormalised order table:
  (orderID, customerName, customerPhone, product, price)

Update anomaly:  customer changes phone - every order row must be updated.
Insert anomaly:  a new customer with no orders cannot be stored.
Delete anomaly:  deleting their only order deletes the customer's details.

Normalised:
  CUSTOMER (customerID [PK], name, phone)
  PRODUCT  (productID [PK], price)
  ORDER    (orderID [PK], customerID [FK], productID [FK], quantity)

Each fact now lives once; the anomalies vanish.</code></pre>

<h3>Reading and writing data: the SQL shape</h3>
<p>Though examined formally at Unit 4, the query shape appears already at Unit 2: SELECT (columns) FROM (table) WHERE (row filter) ORDER BY (sort), with aggregates COUNT/SUM/AVG/MIN/MAX and GROUP BY. Declarative: state the result wanted, not the procedure. The DBMS's query optimiser chooses the access path — an index turns a table scan into a lookup.</p>
<pre><code>Worked queries on GRADE above:

  "Average mark per subject, highest first":
    SELECT subject, AVG(mark)
    FROM GRADE
    GROUP BY subject
    ORDER BY AVG(mark) DESC;
    -> Maths 65, Physics 65   [(72+58)/2 = 65; 65]

  "Students with a mark above 60":
    SELECT studentID, subject, mark
    FROM GRADE
    WHERE mark > 60
    ORDER BY mark DESC;
    -> (S1, Maths, 72), (S1, Physics, 65)

Execution order to remember: FROM -> WHERE -> GROUP BY -> HAVING ->
SELECT -> ORDER BY.</code></pre>

<table border="1" cellpadding="6">
<tr><th>Concept</th><th>Definition</th><th>Worked check on the clinic database</th></tr>
<tr><td>Entity</td><td>A thing about which data is held</td><td>PATIENT, DOCTOR, APPOINTMENT</td></tr>
<tr><td>Attribute</td><td>A property of an entity</td><td>patient name, appointment date</td></tr>
<tr><td>Primary key</td><td>Unique, non-null identifier of a row</td><td>patientID — no two patients share it</td></tr>
<tr><td>Foreign key</td><td>Reference to another table's primary key</td><td>APPOINTMENT.patientID must exist in PATIENT</td></tr>
<tr><td>Relationship</td><td>Association between entities</td><td>PATIENT -< APPOINTMENT >- DOCTOR</td></tr>
<tr><td>Constraint</td><td>Rule the DBMS enforces</td><td>doctorID + slot UNIQUE stops double booking</td></tr>
</table>

<h3>Worked example: a database for a small clinic</h3>
<pre><code>Requirements: patients, doctors, appointments; one patient sees one doctor
per appointment; track prescriptions.

Design steps:
1. Entities: PATIENT, DOCTOR, APPOINTMENT, PRESCRIPTION.
2. Keys: each gets a surrogate primary key (patientID, doctorID...);
   APPOINTMENT carries patientID and doctorID as foreign keys;
   PRESCRIPTION carries appointmentID.
3. Relationships: PATIENT -< APPOINTMENT >- DOCTOR (many-to-many resolved by
   APPOINTMENT); APPOINTMENT -< PRESCRIPTION (one-to-many).
4. Constraints: appointment date not null; time slot unique per doctor
   (composite unique: doctorID + slot) - double booking becomes impossible at
   the schema level.
5. Security: receptionists insert/read appointments; only doctors read
   prescriptions; audit log for access.

Testing the design: try the three anomalies above on it - each is now
impossible, which is the design's proof.</code></pre>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Calling any column with an ID a "primary key"; the key must be unique and non-null — and chosen deliberately (surrogate vs natural).</li>
<li>Explaining foreign keys as "links" without referential integrity: every FK value must exist in the referenced PK.</li>
<li>Missing the many-to-many linking table answer; junction tables are the standard resolution.</li>
<li>Listing DBMS features without effect — "security" means accounts, permissions and audit; "integrity" means constraints the DBMS enforces.</li>
<li>Confusing a database with a DBMS (the data versus the software managing it).</li>
<li>Assuming tables have an order; ORDER BY exists precisely because rows are unordered sets.</li>
<li>Skipping the delete rule (cascade/restrict/set null) in relationship questions.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Unit 2, 4 marks).</strong> Explain two problems of storing the same data in separate department files.</p>
<p>Answer: Duplication leads to inconsistency — when a customer's address changes, each file must be updated separately and stale copies persist, so different departments act on different data. Updates and deletions create anomalies — deleting the last order record may erase the only copy of a customer's details (deletion anomaly), and a new customer cannot be recorded before they order (insertion anomaly).</p>
<p><strong>Question 2 (Unit 2, 4 marks).</strong> Explain the roles of primary keys and foreign keys in a relational database.</p>
<p>Answer: A primary key uniquely and non-null identifies each record in its table, enabling reliable retrieval and preventing duplicates. A foreign key in another table references that primary key, creating a relationship and enforcing referential integrity — the DBMS rejects any value with no matching record, and can cascade or restrict deletions so relationships never dangle.</p>
<p><strong>Question 3 (Unit 2, 4 marks).</strong> Describe how a DBMS handles two users updating the same record simultaneously.</p>
<p>Answer: Concurrency control locks the record (or uses versioning) when the first transaction begins, so the second waits or operates on a prior version. Isolation ensures one transaction's uncommitted changes are invisible to the other; commit releases the lock and logs the change, so the update is atomic and durable. Without this, interleaved updates produce lost updates.</p>
<p><strong>Question 4 (Unit 2, 3 marks).</strong> State what ACID stands for and why it matters.</p>
<p>Answer: Atomic — a transaction completes fully or not at all; Consistent — it leaves the database satisfying all constraints; Isolated — concurrent transactions do not interfere; Durable — committed changes survive failure. Together they guarantee correctness of shared data despite crashes and concurrent users.</p>
<p><strong>Question 5 (Unit 2, 4 marks).</strong> A library stores (loanID, memberName, memberPhone, bookTitle, dueDate). Explain one anomaly and how normalisation fixes it.</p>
<p>Answer: MemberPhone depends on the member, not the loan — so a member's phone is duplicated across every loan row; changing it requires many updates and one miss leaves it inconsistent (update anomaly). Splitting into MEMBER(memberID, name, phone) and LOAN(loanID, memberID, bookTitle, dueDate) stores the phone once, with the loan referencing it by key.</p>
<p><strong>Question 6 (Unit 2, 3 marks).</strong> Explain the difference between a database and a DBMS.</p>
<p>Answer: The database is the organised collection of integrated data itself — tables of records and their relationships. The DBMS is the software that manages it: creating and enforcing schema rules, handling security, concurrency, backup and query processing. Application programs request data through the DBMS rather than reading files directly.</p>
<p>Unit 2 is complete. A2 builds directly on these foundations — starting with the advanced data structures that generalise arrays and records.</p>
`,
  },
};
