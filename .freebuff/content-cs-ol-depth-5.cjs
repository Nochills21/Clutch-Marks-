// Computer Science OL batch 4b: official Cambridge IGCSE 0478 (2026-2028)
// Paper 2 statement 9 (Databases) and 10 (Boolean logic). Apply with:
//   node .freebuff/deepen-materials.cjs .freebuff/content-cs-ol-depth-5.cjs > .freebuff-tmp/cs-ol-depth-5.sql
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/cs-ol-depth-5.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/cs-ol-depth-5.sql --apply    (live)
//   node .freebuff/gate-notes-depth.cjs computer-science OL
module.exports = {
  expectType: "notes",
  titles: {
    "e57fcf07-484e-4716-b79e-2e80f4c59824": "IGCSE Computer Science: Databases and SQL",
    "410f9140-4fa3-467e-8cac-852bafc28653": "IGCSE Computer Science: Boolean Logic and Logic Gates",
  },
  rows: {
    "e57fcf07-484e-4716-b79e-2e80f4c59824": `
<h2>IGCSE Computer Science: Databases and SQL</h2>
<p>Cambridge IGCSE Computer Science 0478 (2026–2028), Paper 2 Algorithms, Programming and Logic, statement 9 Databases. Almost every real program stores records — customers, orders, results — and a database is how that is done properly. This note covers the relational model from first principles (tables, keys, relationships), the design rules that stop data going wrong, and the four SQL commands the syllabus examines — SELECT, FROM, WHERE, ORDER BY — with every query parsed clause by clause against a worked dataset.</p>

<h3>Why databases, and what a DBMS is</h3>
<p>Storing records in ordinary files leads to the classic file problems: the same data duplicated in several files (inconsistency when one copy changes), no way to enforce rules (a mark of 700), updates needing code in every program, and no concurrent access. A <strong>database</strong> stores structured data once, under shared rules; a <strong>database management system (DBMS)</strong> is the software that manages it — handling storage, validation rules, security (user accounts and permissions), backup and recovery, and allowing many users to work at once without corrupting data.</p>
<p>The <strong>relational model</strong> organises data into <strong>tables</strong> (relations): rows are records, columns are fields, and each field holds one data type. The factory analogy: instead of every department keeping its own customer list, there is one customer table that every department consults — one version of the truth.</p>

<h3>Fields, records and data types</h3>
<table border="1" cellpadding="6">
<tr><th>Column</th><th>Data type</th><th>Why this type</th></tr>
<tr><td>studentID</td><td>INTEGER / text code</td><td>Identifies each student; used in relationships</td></tr>
<tr><td>surname</td><td>STRING / VARCHAR(30)</td><td>Text of bounded length</td></tr>
<tr><td>dob</td><td>DATE</td><td>Dates need date arithmetic (age checks), not string comparisons</td></tr>
<tr><td>mark</td><td>INTEGER</td><td>Whole numbers; allows range checks 0–100</td></tr>
<tr><td>average</td><td>REAL</td><td>Decimal places needed</td></tr>
<tr><td>isEnrolled</td><td>BOOLEAN</td><td>True/false flag</td></tr>
</table>
<p>Choosing types is a mark: types constrain what can be stored (a DATE field rejects "hello"), save space, and make correct operations possible (you cannot average a string field).</p>

<h3>Keys</h3>
<ul>
<li><strong>Primary key</strong> — the field (or combination) that uniquely identifies each record in a table: no duplicates, never empty. StudentID, not surname (two students may share a surname).</li>
<li><strong>Foreign key</strong> — a field in one table that is the primary key of another, creating a <strong>relationship</strong> between the tables. In a results table, studentID is a foreign key pointing at the students table.</li>
</ul>
<pre><code>Two related tables, worked:

STUDENTS                         RESULTS
studentID  surname   class       resultID  studentID  subject   mark
101        Ali       11A         1         101        Maths     72
102        Banda     11A         2         101        Physics   65
103        Chen      11B         3         102        Maths     58

RESULTS.studentID is a foreign key: every value there must match a STUDENTS.
studentID. That referential rule stops a result existing for a student who does
not - and deleting student 102 must deal with their result row (cascade delete
or refuse), which the exam likes to probe.</code></pre>
<p>Relationships come in three shapes: <strong>one-to-many</strong> (one student, many results — the common case), <strong>one-to-one</strong> (one student, one locker record) and <strong>many-to-many</strong> (students and subjects — resolved in practice with a linking table of pairs).</p>

<h3>Database design: normalisation and its rules</h3>
<p>Normalisation structures tables so that each fact is stored once. First normal form (<strong>1NF</strong>): no repeating groups — every field holds a single value; a "subjects" field listing "Maths, Physics" is split into separate rows. Second normal form (<strong>2NF</strong>): 1NF plus no partial dependency — every non-key field depends on the whole key, not part of it. Third normal form (<strong>3NF</strong>): 2NF plus no transitive dependency — non-key fields must not depend on each other; if a student row holds class and classTeacher, then classTeacher depends on class, not on studentID, so it moves to its own table.</p>
<pre><code>Normalisation worked on one bad table:

Unnormalised:  studentID, name, class, classTeacher, subject, mark
(one row per student with repeating subjects)

1NF - remove repeating groups: one row per student per subject.
  studentID, name, class, classTeacher, subject, mark

2NF - the key is (studentID, subject). name, class and classTeacher depend only
on studentID (part of the key) - split them out:
  STUDENTS: studentID, name, class, classTeacher
  RESULTS:  studentID, subject, mark

3NF - in STUDENTS, classTeacher depends on class, which depends on studentID -
a transitive dependency. Split again:
  STUDENTS: studentID, name, class
  CLASSES:  class, classTeacher
  RESULTS:  studentID, subject, mark

Benefits: no duplicated teacher names to update in fifty rows, no chance of the
same student having two different names, and insertions and deletions no longer
distort unrelated data.</code></pre>
<p>Why it matters earns separate marks: normalisation minimises duplication and therefore the risk of <strong>data inconsistency</strong>, and prevents <strong>update, insertion and deletion anomalies</strong> — e.g. deleting the only result of a student would wipe their name if everything sat in one table.</p>

<h3>Structured Query Language (SQL)</h3>
<p>SQL is the standard language for defining and querying relational databases; it is declarative — you state <em>what</em> you want, and the DBMS works out <em>how</em>. The examined queries have the shape:</p>
<pre><code>SELECT   which columns to show
FROM     which table(s)
WHERE    which rows qualify (a condition)
ORDER BY how to sort the result

Parsing a query against STUDENTS and RESULTS above:

  "List the names of students in class 11A, alphabetically."

  SELECT surname
  FROM STUDENTS
  WHERE class = '11A'
  ORDER BY surname ASC;

  Step 1: FROM - look at the STUDENTS table.
  Step 2: WHERE - keep only rows where class is '11A' (rows 101, 102).
  Step 3: SELECT - from those rows keep just the surname column.
  Step 4: ORDER BY - sort ascending: Ali, Banda.

  Query 2: "List studentID and mark for Maths results, highest mark first."

  SELECT studentID, mark
  FROM RESULTS
  WHERE subject = 'Maths'
  ORDER BY mark DESC;

  Result: (101, 72), (102, 58) - DESC puts the biggest first.</code></pre>
<ul>
<li>Text values go in quotes ('11A'); numbers do not.</li>
<li>Conditions use =, &lt;&gt;, &lt;, &gt;, &lt;=, &gt;=, and combine with AND / OR / NOT.</li>
<li>SELECT * shows every column; naming columns is better practice and often earns the mark.</li>
<li>ORDER BY defaults to ascending; DESC reverses.</li>
<li>Useful extras the syllabus allows: COUNT(*), SUM, AVG/MIN/MAX aggregates, GROUP BY to aggregate per category, and LIKE for pattern matching (WHERE surname LIKE 'B%').</li>
</ul>
<pre><code>Aggregate example: "How many results does each student have, where the count
is at least 2?"

  SELECT studentID, COUNT(*)
  FROM RESULTS
  GROUP BY studentID
  HAVING COUNT(*) &gt;= 2;

  FROM -> rows of RESULTS; GROUP BY -> one group per studentID (101: 2 rows,
  102: 1 row); HAVING filters groups after aggregation (WHERE filters rows
  before it); SELECT outputs (101, 2).</code></pre>

<h3>Data validation and verification at input</h3>
<p>Before a record is stored it is checked — <strong>validation</strong> ensures data is sensible, <strong>verification</strong> ensures it matches what was intended: presence checks (a required field cannot be empty), type checks (digits only in a phone field), length checks (exactly 8 characters), range checks (mark between 0 and 100), check digits (an ISBN-style computed digit catches transcription slips), and list/pick-list checks (a value must come from an allowed set). Verification includes double entry (typing it twice) and visual checks against the source. The exam wants the technique matched to the error: range check for a mark, check digit for an account number.</p>

<h3>Worked example: a complete query set</h3>
<pre><code>Table BOOKS: bookID (PK), title, author, year, price

1. All titles costing less than 10 pounds, cheapest first:
   SELECT title, price FROM BOOKS WHERE price &lt; 10 ORDER BY price ASC;

2. Books published after 2015 by "Lee":
   SELECT title, year FROM BOOKS WHERE year &gt; 2015 AND author = 'Lee';

3. How many books has each author written?
   SELECT author, COUNT(*) FROM BOOKS GROUP BY author;

4. The most expensive book:
   SELECT title, price FROM BOOKS ORDER BY price DESC;  (take the first row)

Each query is executed the same way every time: FROM picks the table, WHERE
filters rows, GROUP BY aggregates, HAVING filters groups, SELECT projects
columns, ORDER BY sorts the finished result.</code></pre>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Confusing WHERE with ORDER BY: WHERE filters rows before sorting; ORDER BY only sorts what survives.</li>
<li>Forgetting quotes around text values (WHERE class = 11A) or wrongly quoting numbers.</li>
<li>Choosing a non-unique field as the primary key (surname); and leaving the primary key empty or duplicated — both are impossible by definition.</li>
<li>Saying a foreign key "links tables" without the referential rule: every foreign key value must exist as a primary key in the referenced table.</li>
<li>Stopping normalisation at "no duplicate rows" — the anomalies language (update/insert/delete anomaly, transitive dependency) is what the mark scheme wants.</li>
<li>Writing SELECT before FROM in analysis answers; the execution order is FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY.</li>
<li>Using WHERE to filter an aggregate (WHERE COUNT(*) &gt; 2 fails); aggregates are filtered with HAVING.</li>
<li>Mixing validation and verification: validation checks sense (range, type), verification checks accuracy against the source (double entry).</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Paper 2, 3 marks).</strong> Explain the difference between a primary key and a foreign key.</p>
<p>Answer: A primary key is the field (or combination) that uniquely identifies each record in its table — it must be unique and never empty. A foreign key is a field in one table whose values are the primary key of another table, creating a link between them and enforcing referential integrity: the database refuses values with no matching record.</p>
<p><strong>Question 2 (Paper 2, 4 marks).</strong> A table holds studentID, name, class, classTeacher, subject, mark. Explain the problems with storing classTeacher in this table.</p>
<p>Answer: classTeacher depends on class rather than on the student — a transitive dependency (2NF/3NF violation). The teacher's name is duplicated across every result row of every student in that class: changing one teacher means many updates (update anomaly) and inconsistent copies if only some are changed; deleting a class's only student deletes the teacher record too. Moving class and classTeacher to their own table stores each fact once.</p>
<p><strong>Question 3 (Paper 2, 4 marks).</strong> Write SQL to list the titles of all books by "Chen" published after 2020, in alphabetical order.</p>
<p>Answer: SELECT title FROM BOOKS WHERE author = 'Chen' AND year &gt; 2020 ORDER BY title ASC;</p>
<p><strong>Question 4 (Paper 2, 4 marks).</strong> State four validation checks and give an example of the data each would reject.</p>
<p>Answer: Presence check — rejects an empty required field. Type check — rejects "abc" in an integer field. Range check — rejects a mark of 150 (outside 0–100). Length check — rejects a 7-character code where 8 are required. (Also acceptable: check digit rejecting a mistyped account number; list check rejecting a subject not offered.)</p>
<p><strong>Question 5 (Paper 2, 3 marks).</strong> Explain why a DBMS is used instead of separate data files for each department.</p>
<p>Answer: A DBMS stores each item of data once, eliminating duplicated and inconsistent copies, and centralises the rules: validation on every update, user permissions and audit trails, and backup/recovery. It also lets several users access and update the data concurrently under lock control, without one department overwriting another's work.</p>
<p><strong>Question 6 (Paper 2, 4 marks).</strong> Describe the output of: SELECT subject, AVG(mark) FROM RESULTS GROUP BY subject;</p>
<p>Answer: The rows of RESULTS are grouped by subject; for each group the average mark is computed; the output has one row per subject showing the subject name and that group's mean mark — for the sample data: Maths 65 (72 and 58), Physics 65.</p>
<p>The final Paper 2 domain puts logic itself into hardware: Boolean algebra and the gates that compute with truth.</p>
`,

    "410f9140-4fa3-467e-8cac-852bafc28653": `
<h2>IGCSE Computer Science: Boolean Logic and Logic Gates</h2>
<p>Cambridge IGCSE Computer Science 0478 (2026–2028), Paper 2 Algorithms, Programming and Logic, statement 10 Boolean logic. Everything a processor does comes down to decisions with two answers — true or false, 1 or 0 — and this note builds Boolean algebra and logic gates from that idea up: the operators and their truth tables, the gates that implement them, combining gates into circuits, and the two theorems used to simplify them. Every truth table below is generated rule by rule, and every simplification shows its law at each line, because the marks sit in the working.</p>

<h3>Boolean values and operators</h3>
<p>A <strong>Boolean</strong> value is one of exactly two states: TRUE or FALSE (1 or 0). A <strong>Boolean expression</strong> combines such values with operators, and its output is itself a truth value. The three operators:</p>
<ul>
<li><strong>NOT</strong> (¬, or an overline) — inverts: NOT TRUE = FALSE.</li>
<li><strong>AND</strong> (∧, or juxtaposition AB) — TRUE only when <em>both</em> inputs are TRUE.</li>
<li><strong>OR</strong> (∨, or +) — TRUE when <em>at least one</em> input is TRUE.</li>
</ul>
<p>Everyday analogies lock these in: AND is two switches in series (the lamp lights only if both close); OR is two switches in parallel (either one lights it); NOT is an inverter relay.</p>

<h3>Truth tables, built row by row</h3>
<p>A <strong>truth table</strong> lists every combination of inputs and the resulting output — the complete behaviour of an expression. With n inputs there are 2ⁿ rows; count in binary to generate them systematically.</p>
<pre><code>Truth tables for the three operators:

NOT A          A AND B               A OR B
A | NOT A      A | B | A AND B       A | B | A OR B
0 |   1        0 | 0 |    0          0 | 0 |   0
1 |   0        0 | 1 |    0          0 | 1 |   1
               1 | 0 |    0          1 | 0 |   1
               1 | 1 |    1          1 | 1 |   1

AND is TRUE only on the last row (both 1); OR is TRUE on all but the first
(at least one 1). AND therefore never makes TRUE "more true" than its inputs,
while OR never makes FALSE "more false".</code></pre>

<h3>The logic gates</h3>
<p>A <strong>logic gate</strong> is the physical circuit (a handful of transistors) that implements one operator; it is drawn with a standard symbol and its behaviour is its truth table.</p>
<table border="1" cellpadding="6">
<tr><th>Gate</th><th>Implements</th><th>Output is 1 when…</th></tr>
<tr><td>NOT (inverter)</td><td>NOT A</td><td>the input is 0</td></tr>
<tr><td>AND</td><td>A AND B</td><td>both inputs are 1</td></tr>
<tr><td>OR</td><td>A OR B</td><td>at least one input is 1</td></tr>
<tr><td>NAND</td><td>NOT (A AND B)</td><td>not both inputs are 1</td></tr>
<tr><td>NOR</td><td>NOT (A OR B)</td><td>neither input is 1</td></tr>
<tr><td>XOR (EOR)</td><td>A OR B but not both</td><td>exactly one input is 1</td></tr>
</table>
<p>NAND and NOR are called <strong>universal gates</strong> because any circuit at all can be built from them alone — worth a mark of its own. XOR is the "different" gate: it answers "are the inputs different?", which is why arithmetic circuits use it.</p>
<pre><code>Truth table for XOR (exactly one input 1):

A | B | A XOR B
0 | 0 |    0
0 | 1 |    1
1 | 0 |    1
1 | 1 |    0       <- the row people forget: both 1 gives 0</code></pre>

<h3>Building and analysing combined circuits</h3>
<p>Real circuits stack gates. The method: label every intermediate wire, then fill a column for each gate working left to right, one row per input combination.</p>
<pre><code>Worked analysis: F = (A AND B) OR (NOT C)

A | B | C | A AND B | NOT C | F
0 | 0 | 0 |    0    |   1   | 1
0 | 0 | 1 |    0    |   0   | 0
0 | 1 | 0 |    0    |   1   | 1
0 | 1 | 1 |    0    |   0   | 0
1 | 0 | 0 |    0    |   1   | 1
1 | 0 | 1 |    0    |   0   | 0
1 | 1 | 0 |    1    |   1   | 1
1 | 1 | 1 |    1    |   0   | 1

Row-by-row for the last row: A=1, B=1 -> A AND B = 1; C=1 -> NOT C = 0;
1 OR 0 = 1, so F = 1. Doing each row the same way is exactly what the exam
rewards - partial marks sit on the intermediate columns.</code></pre>

<h3>Boolean algebra: notation and laws</h3>
<p>Boolean expressions can be written as algebra: AND is multiplication (AB), OR is addition (A + B), NOT is an overline (Ā) or a prime. The laws mirror ordinary algebra where that is valid and differ where it is not (there is no division, and A + A = A).</p>
<table border="1" cellpadding="6">
<tr><th>Law</th><th>Statement</th><th>Reading</th></tr>
<tr><td>Identity</td><td>A + 0 = A; A · 1 = A</td><td>Neutral elements change nothing</td></tr>
<tr><td>Null</td><td>A + 1 = 1; A · 0 = 0</td><td>A dominating value decides alone</td></tr>
<tr><td>Complement</td><td>A + Ā = 1; A · Ā = 0</td><td>A thing OR its opposite is certain; ANDed it is impossible</td></tr>
<tr><td>Idempotent</td><td>A + A = A; A · A = A</td><td>Repeating a condition adds nothing</td></tr>
<tr><td>Commutative</td><td>A + B = B + A; AB = BA</td><td>Order does not matter</td></tr>
<tr><td>Associative</td><td>(A + B) + C = A + (B + C)</td><td>Grouping does not matter</td></tr>
<tr><td>Distributive</td><td>A(B + C) = AB + AC</td><td>Like ordinary multiplication over addition</td></tr>
<tr><td>De Morgan 1</td><td>NOT (A AND B) = Ā OR B̄</td><td>Break the bar and change the sign</td></tr>
<tr><td>De Morgan 2</td><td>NOT (A OR B) = Ā AND B̄</td><td>Same rule for OR</td></tr>
</table>
<pre><code>De Morgan proved by truth table (the exam accepts proof by table):

A | B | A AND B | NOT(A AND B) | NOT A | NOT B | (NOT A) OR (NOT B)
0 | 0 |    0    |      1       |   1   |   1   |         1
0 | 1 |    0    |      1       |   1   |   0   |         1
1 | 0 |    0    |      1       |   0   |   1   |         1
1 | 1 |    1    |      0       |   0   |   0   |         0

The last two columns match on every row, so NOT(A AND B) = (NOT A) OR (NOT B).
Notice the mnemonic in action: the bar splits, AND becomes OR.</code></pre>

<h3>Simplifying expressions, one law per line</h3>
<pre><code>Simplify F = A·B + A·B̄

  F = A·B + A·B̄
    = A·(B + B̄)            [factorise: distributive law]
    = A·1                  [complement law: B + B̄ = 1]
    = A                    [identity law: A·1 = A]

Two gates (AND, AND, OR) collapse to a single wire - the point of the exercise.
The practical reading: "A is required, whatever B is".

Worked again with three variables: F = (A + B)·(A + C)

  F = (A + B)·(A + C)
    = A·A + A·C + B·A + B·C     [expand: distributive law]
    = A + A·C + A·B + B·C       [idempotent: A·A = A]
    = A·(1 + C + B) + B·C       [factorise the A terms]
    = A·1 + B·C                 [null law: 1 + anything = 1]
    = A + B·C                   [identity law]

So (A + B)·(A + C) = A + B·C - a circuit of two gates instead of three.</code></pre>

<h3>Worked example: from a description to a circuit</h3>
<pre><code>Worked design: "A security alarm sounds when the front door is open OR the
window is open, AND the system is armed."

Define: D = door open, W = window open, S = system armed, A = alarm.

  A = (D OR W) AND S

Build it: one OR gate fed by D and W; its output and S feed one AND gate.
Truth table check of the interesting rows:
  D=1, W=0, S=1  -> (1 OR 0)=1, 1 AND 1 = 1  alarm sounds
  D=1, W=0, S=0  -> 1 AND 0 = 0              no alarm (system off)
  D=0, W=0, S=1  -> 0 AND 1 = 0              no alarm (nothing open)

Testing the unarmed row is the one the examiners set - the AND must gate the
whole thing.</code></pre>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Producing truth tables with missing rows (2ⁿ rows for n inputs — one input = 2 rows, three inputs = 8) or rows out of binary order.</li>
<li>Getting XOR wrong on the (1,1) row: exactly one input, so both 1 gives 0.</li>
<li>Confusing NAND with AND (and NOR with OR): the N gates are the negations — their output is 1 precisely when the plain gate would say 0.</li>
<li>Breaking De Morgan wrongly: the bar splits AND turns to OR (and vice versa); NOT A AND B is NOT (A AND B) or (NOT A) AND B depending on the grouping — brackets decide, so keep them explicit.</li>
<li>Applying ordinary-algebra habits that fail: A + A = A (not 2A), A + A·B = A (absorption), and there is no division.</li>
<li>Skipping intermediate columns when analysing stacked gates; partial credit lives there, and one wrong column ruins the rest.</li>
<li>Simplifying without naming the law used at each line; the working is most of the marks.</li>
<li>Drawing a circuit that implements the wrong precedence: AND binds tighter than OR in algebra, so A + B·C is A OR (B AND C) — brackets in the diagram.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Paper 2, 2 marks).</strong> Draw the truth table for F = A AND (NOT B).</p>
<p>Answer: A=0,B=0: NOT B=1, 0 AND 1 = 0. A=0,B=1: NOT B=0 → 0. A=1,B=0: NOT B=1, 1 AND 1 = 1. A=1,B=1: NOT B=0 → 0. So F is 1 only on the row A=1, B=0.</p>
<p><strong>Question 2 (Paper 2, 3 marks).</strong> Name the gate that implements NOT (A OR B) and give its truth table.</p>
<p>Answer: A NOR gate. Rows: (0,0) → 1; (0,1) → 0; (1,0) → 0; (1,1) → 0 — the output is 1 only when neither input is 1.</p>
<p><strong>Question 3 (Paper 2, 4 marks).</strong> Use a truth table to show that NOT (A AND B) = (NOT A) OR (NOT B).</p>
<p>Answer: Build columns for A AND B, its negation, NOT A, NOT B and their OR. Rows: (0,0) → 1 and 1; (0,1) → 1 and 1; (1,0) → 1 and 1; (1,1) → 0 and 0. The two final columns are identical on every row, proving the equality (De Morgan's first law).</p>
<p><strong>Question 4 (Paper 2, 4 marks).</strong> Simplify F = A·Ā + A·B, naming each law used.</p>
<p>Answer: A·Ā = 0 by the complement law, so F = 0 + A·B; 0 + A·B = A·B by the identity law for OR. Therefore F = A·B — one AND gate.</p>
<p><strong>Question 5 (Paper 2, 4 marks).</strong> A lift door opens when the lift is at a floor AND (the button is pressed OR a sensor detects an obstacle). Write the Boolean expression and build its truth table.</p>
<p>Answer: F = L · (B + S), where L = at a floor, B = button, S = sensor. Rows (L,B,S): 000→0, 001→0, 010→0, 011→0, 100→0, 101→1, 110→1, 111→1 — the door opens only when L is 1 and at least one of B, S is 1.</p>
<p><strong>Question 6 (Paper 2, 2 marks).</strong> Explain what is meant by a universal gate and name two.</p>
<p>Answer: A universal gate is one from which any other logic function can be built without any other gate type — NAND and NOR are universal, so entire processors can be constructed from either alone.</p>
<p>With Paper 2's four domains complete — algorithm design, programming constructs, databases and Boolean logic — the IGCSE course is fully covered; the A Level notes build directly on this foundation.</p>
`,
  },
};
