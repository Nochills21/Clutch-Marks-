// Computer Science A2 batch 9: Pearson Edexcel IAL Computer Science (YCP11),
// Unit 3/Unit 4 - files, user-defined data types and floating point; database
// DDL/DML with normalisation depth; protocols and circuit/packet switching.
// Apply:
//   node .freebuff/deepen-materials.cjs .freebuff/content-cs-a2-depth-2.cjs > .freebuff-tmp/cs-a2-depth-2.sql
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/cs-a2-depth-2.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/cs-a2-depth-2.sql --apply    (live)
//   node .freebuff/gate-notes-depth.cjs computer-science A2
module.exports = {
  expectType: "notes",
  titles: {
    "c83dc258-43cf-451c-88d2-6f7dfb525681": "Edexcel IAL Computer Science: File Organisation, Data Types and Floating Point",
    "4e59efe4-7386-4b2f-92cf-1c627eb63269": "Edexcel IAL Computer Science: Database Definition, DDL/DML and Normalisation",
    "17e42a4c-18d8-47cd-b02f-f5b78b6bc7e5": "Edexcel IAL Computer Science: Protocols, Circuit and Packet Switching",
  },
  rows: {
    "c83dc258-43cf-451c-88d2-6f7dfb525681": `
<h2>Edexcel IAL Computer Science: File Organisation, Data Types and Floating Point</h2>
<p>Pearson Edexcel International Advanced Level in Computer Science, Unit 3 Advanced Computer Science: files and their organisation and access, user-defined data types, and floating-point representation and manipulation. This note goes beneath the arrays and records of AS into how data physically lives on backing storage and how real numbers are stored and computed — the two topics where exam questions demand mechanism, not definitions. Every pointer movement and every normalisation step is traced on a diagram.</p>

<h3>File concepts and access methods</h3>
<p>A <strong>file</strong> is a named collection of records on secondary storage; a <strong>record</strong> is a collection of fields describing one entity; records may be <strong>fixed-length</strong> (each record the same size — simple addressing, wasted space for short records) or <strong>variable-length</strong> (space-efficient, but locating records needs length markers or delimiters). A <strong>key field</strong> identifies each record uniquely and drives access.</p>
<table border="1" cellpadding="6">
<tr><th>Access method</th><th>Mechanism</th><th>Strengths</th><th>Weaknesses</th></tr>
<tr><td>Sequential</td><td>Records read/written in key order, one after another</td><td>Efficient for batch processing and tape/streamed media; simple</td><td>Slow for random queries (average half the file scanned); updates need rewriting</td></tr>
<tr><td>Direct (random)</td><td>Record located by key → address (hashing or an index)</td><td>Immediate single-record retrieval regardless of file size</td><td>Needs hashing/index infrastructure; may leave unused slots</td></tr>
<tr><td>Indexed sequential (ISAM)</td><td>Sequential file plus an index of keys → addresses</td><td>Both fast random lookup and ordered sequential processing</td><td>Index maintenance cost; index itself can fragment</td></tr>
</table>
<pre><code>Sequential access worked: pay run over a 1000-record file.

  Open file; read record 1, process, write to output; read record 2...;
  one pass, one read per record - O(n) with tiny constants: ideal for batch.

Direct access worked: find one customer account.

  Hash the account number to a slot: address = hash(key); read once at that
  address - O(1). But finding "all accounts in London" needs scanning or a
  secondary index - the query pattern decides the method.

Record address arithmetic (fixed-length):
  record i's byte address = start + i x recordSize
  With 32-byte records starting at byte 100: record 5 = 100 + 5x32 = 260.
  Variable-length records break this arithmetic - a pointer table or length
  prefix is needed instead.</code></pre>
<p>File organisation in commercial systems: <strong>heap files</strong> (unordered, append anywhere), <strong>sorted files</strong> (binary-searchable, expensive insertion), <strong>hashed files</strong> (O(1) by key, poor at ranges), <strong>clustered files</strong> (records grouped by a related key — e.g. all of a customer's orders physically together). The exam wants the choice justified by the workload: point lookup, range scan, or ordered processing.</p>
<p>File maintenance operations: serial update (new transaction file + old master → new master, one pass), random update (locate and rewrite one record), and the failure handling around them (transaction logs keep a recovery trail — the link to the DBMS recovery work in the database note).</p>

<h3>File organisation in database systems</h3>
<p>Relational tables are files underneath, and the same organisation choices appear as storage-engine decisions. Heap storage appends rows cheaply (good for bulk loads, poor for key lookup); sorted storage supports binary search but rewrites on insertion; hashed storage gives O(1) key access but no ordering; clustered storage groups rows by a related key (all a customer's orders together), making that join a sequential read. Secondary indexes are files of (key, pointer) pairs that restore fast lookup on non-key fields, at the cost of maintaining them on every write. The exam's design question wants the workload named first — point lookup, range scan, ordered report — and the organisation chosen for it.</p>

<h3>Worked example: index selection for a query workload</h3>
<pre><code>A library table book(ISBN [PK], title, author, year, copies) serves three queries:

  Q1 find by ISBN           -> the primary key index already answers this
  Q2 find by author         -> secondary index on author (point lookup by name)
  Q3 list all books of a year, in title order -> composite index (year, title)
                                so the range scan returns rows already sorted

Writing cost: each additional index slows INSERT/UPDATE/DELETE (every index
must be maintained) and costs storage - so index the read paths the workload
actually uses, not every column. The rule of thumb earns the mark: indexes
serve queries, constraints serve correctness.</code></pre>

<h3>User-defined data types</h3>
<p>Primitive types cannot express domain structure, so languages offer composition. A <strong>record (struct)</strong> groups named fields of differing types; <strong>enumerated types</strong> name a finite set of legal values (DAY = {Mon…Sun}); <strong>arrays/sequences</strong> group like values; <strong>union/variant</strong> types hold one of several shapes; and <strong>classes</strong> bundle records with behaviour (see the OOP note).</p>
<pre><code>Worked: a payroll record type and its use.

  TYPE Employee = RECORD
      empID     : STRING
      name      : STRING
      payGrade  : (A, B, C)          // enumerated: illegal values impossible
      hours     : REAL
      rate      : REAL
  END RECORD

  VAR e : Employee
  e.empID <- "E104"; e.rate <- 12.50; e.hours <- 37.5

  pay <- e.hours * e.rate   // 37.5 x 12.50 = 468.75

Benefits visible here: typed fields prevent "hours = "Tues"" at the type
level; the enum prevents payGrade = "Z"; and grouping means one array element
holds the whole employee - ARRAY[1:500] OF Employee is a payroll file in
memory. Records of records (nested) express containment: a Department record
holds an array of Employee sub-records.</code></pre>
<p>Static versus dynamic typing is the exam's comparison: static types (Pascal, Java) check at compile time, catching whole classes of errors before run and enabling optimisation; dynamic types (Python) defer checks to run time, gaining flexibility at the cost of late error discovery. User-defined types sit on the static side: they make invalid states unrepresentable.</p>

<h3>Floating point: representation and manipulation</h3>
<p>Recalling the AS construction (value = mantissa × 2^(exponent−bias), normalised with a hidden leading 1), this note adds the manipulation rules and their pitfalls.</p>
<pre><code>Addition in floating point, step by step with rounding:

  x = 1.1011 x 2^2   (mantissa 1011, exponent 2)
  y = 1.0110 x 2^0   (mantissa 0110, exponent 0)

  1. ALIGN: shift the smaller mantissa right by the exponent difference (2),
     truncating bits shifted off the end (this is where precision is lost):
     y' = 0.0101(10...) x 2^2   (dropped bits rounded: 10 -> round up here)
  2. ADD the mantissas:
     1.1011 + 0.0101 = 10.0000 x 2^2
  3. RENORMALISE: 10.0000 x 2^2 = 1.0000 x 2^3
  4. ROUND to the available mantissa bits (here exact), check exponent range.

Multiplication differs: multiply mantissas, ADD exponents, normalise once -
no alignment step, so no alignment truncation:
  (1.1011 x 2^2) x (1.0110 x 2^0):
  mantissas: 1.1011 x 1.0110 = 10.0110(01...) -> 1.0011(0) x 2^1 after
  normalise; exponents: 2 + 0 = 1. Result ≈ 1.0011 x 2^1 = 2.375.

Division: divide mantissas, subtract exponents, normalise.</code></pre>
<p><strong>Errors and their names:</strong> <strong>rounding error</strong> (values between representable numbers are rounded — 0.1 is not exactly representable), <strong>absorption/cancellation</strong> (adding a large and small float loses the small one's digits; subtracting nearly equal values loses significant figures), <strong>underflow</strong> (result too small for the exponent field → zero or denormal), <strong>overflow</strong> (too large → infinity). Standards: IEEE 754 defines single (32-bit: 1+8+23) and double (64-bit: 1+11+52) formats, special values (±0, ±∞, NaN), and rounding modes.</p>
<pre><code>Cancellation worked:

  x = 1.0000001 x 2^7 = 128.000128
  y = 1.0000000 x 2^7 = 128.000000
  x - y = 0.000128 - exact in this case, but if the mantissa held only 6
  significant bits, x and y would round to the SAME stored value and the
  difference would be 0.000000. "Why is (x + y) - x not always y?" is
  exactly this: the alignment step of x + y may have rounded y away.

Money in floats (again, now with the mechanism): 0.1 + 0.2 in IEEE 754
double = 0.30000000000000004, because 0.1 is stored as 0.1000000000000000055...
and 0.2 as 0.2000000000000000111...; the sum's alignment and rounding leave
the residue. Integer pence avoid the whole class of error.</code></pre>

<h3>Worked example: choosing storage for three problems</h3>
<pre><code>1. Payroll processed every Friday for 800 employees (all records, in ID
   order): sequential access over a sorted file - one pass, O(n), no index
   maintenance needed.

2. A cashier pulling one account by number on demand: direct access - hash
   the key to an address, O(1) retrieval; the query is always by unique key.

3. A clinic system that takes appointments by patient and occasionally
   lists all patients alphabetically: indexed sequential - the index makes
   the point lookup fast while the ordered scan serves the listing; or a
   database (with the same indexing ideas) if concurrent updates matter.</code></pre>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Saying direct access "reads the record directly from the key" — the key is hashed or looked up in an index to get an address; something must translate one to the other.</li>
<li>Quoting record-address arithmetic on variable-length files; it needs a pointer table or length prefix.</li>
<li>Forgetting alignment in floating-point addition questions — the exponent difference dictates the right shift, and shifted-off bits are where error enters.</li>
<li>Confusing overflow/underflow with rounding error: range failures versus precision loss.</li>
<li>Claiming (x + y) − x = y always; cancellation and absorption make float algebra non-associative.</li>
<li>Choosing variable-length records when the exam's workload is fixed-size batch processing (or vice versa) without reasoning.</li>
<li>Describing enums as "shorthand for numbers"; their point is restricting a field to legal values.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Unit 3, 4 marks).</strong> Compare sequential and direct file access.</p>
<p>Answer: Sequential access reads records in order from the start — one pass, efficient for batch processing of whole files (payroll), but finding one record scans on average half the file. Direct access computes a record's location from its key (hashing or index) and reads it immediately — O(1) retrieval for single-record queries (cashier lookups), but it needs the hashing/index infrastructure and suits random rather than ordered workloads.</p>
<p><strong>Question 2 (Unit 3, 4 marks).</strong> Explain two differences between fixed-length and variable-length records.</p>
<p>Answer: Fixed-length records reserve the same space for each record, so any record's address is arithmetic (start + i × size) and access is fast, but short records waste space and field sizes are capped. Variable-length records store only what each needs, saving space and allowing long fields, but locating records requires length prefixes or a pointer table and processing is more complex.</p>
<p><strong>Question 3 (Unit 3, 4 marks).</strong> Describe how two floating-point numbers are added and where precision can be lost.</p>
<p>Answer: Align the exponents by shifting the smaller mantissa right by their difference (bits shifted off are truncated/rounded), add the mantissas, renormalise the result, and round to the available mantissa bits. Precision is lost during alignment (truncated bits) and the final rounding; if the exponent difference is large, the small number's contribution may vanish entirely (absorption).</p>
<p><strong>Question 4 (Unit 3, 3 marks).</strong> Explain why floating-point arithmetic can give (0.1 + 0.2) ≠ 0.3.</p>
<p>Answer: 0.1 and 0.2 have no exact binary representation, so each is stored as the nearest representable mantissa × power of two; their tiny errors propagate through the alignment and addition, and the sum rounds to a value slightly above 0.3 (0.30000000000000004). Float algebra is approximate — a reason to use integer minor units or decimal types for money.</p>
<p><strong>Question 5 (Unit 3, 4 marks).</strong> Explain the purpose of user-defined data types and give two examples.</p>
<p>Answer: User-defined types express domain structure that primitives cannot, making invalid data impossible to represent. A record (struct) groups named fields of different types describing one entity (employee: string ID, real rate); an enumerated type names the complete legal value set (payGrade ∈ {A, B, C}), so any other value is rejected at compile time. Both improve readability and safety over loose collections of primitives.</p>
<p><strong>Question 6 (Unit 3, 3 marks).</strong> State what overflow and underflow mean in floating-point arithmetic.</p>
<p>Answer: Overflow is a result too large in magnitude for the exponent field to represent — it becomes infinity (or an error). Underflow is a result too small in magnitude for the smallest normal exponent — it becomes zero or a denormal number. Both are range failures of the format, distinct from rounding error, which affects precision within the representable range.</p>
<p>Files store data; databases govern it — the next note is the design and language layer on top.</p>
`,

    "4e59efe4-7386-4b2f-92cf-1c627eb63269": `
<h2>Edexcel IAL Computer Science: Database Definition, DDL/DML and Normalisation</h2>
<p>Pearson Edexcel International Advanced Level in Computer Science, Unit 4 The Computing Practical Project (with Unit 2/3 foundations): data definition and data manipulation languages, and the normalisation that produces a defensible schema. The AS database note built the concepts; this one builds the artefacts a project needs — a schema written in DDL, queries written in DML, and a normalisation walk-through of the kind a project's design chapter must contain. Every statement is parsed clause by clause.</p>

<h3>DDL: defining the structure</h3>
<p><strong>Data definition language (DDL)</strong> creates and alters the database's structure — tables, keys, constraints — while <strong>data manipulation language (DML)</strong> operates on the data inside (SELECT, INSERT, UPDATE, DELETE). The DBMS stores the resulting schema in its data dictionary and enforces every declared rule on all clients — the reason DDL is written once but protects the data forever.</p>
<pre><code>DDL worked: the clinic schema, each statement's effect named.

  CREATE TABLE patient (
      patientID   CHAR(5)      PRIMARY KEY,      -- unique, not null by rule
      name        VARCHAR(60)  NOT NULL,
      dob         DATE         NOT NULL,
      phone       VARCHAR(15),
      postcode    VARCHAR(8)
  );
  -- effect: table created; patientID is the entity key; name and dob may not
  -- be empty; phone may be unknown (nullable) - a design decision.

  CREATE TABLE appointment (
      apptID      INTEGER      PRIMARY KEY,
      patientID   CHAR(5)      NOT NULL,
      doctorID    CHAR(5)      NOT NULL,
      apptDate    DATE         NOT NULL,
      slot        TIME         NOT NULL,
      CONSTRAINT fk_appt_patient FOREIGN KEY (patientID)
          REFERENCES patient(patientID),
      CONSTRAINT uq_doctor_slot UNIQUE (doctorID, apptDate, slot)
  );
  -- effect: referential integrity (no appointment without a real patient),
  -- and a composite UNIQUE that makes double-booking impossible.

  ALTER TABLE patient ADD email VARCHAR(80);
  DROP TABLE old_backup;                        -- destructive; guarded
  CREATE INDEX idx_patient_name ON patient(name); -- speeds name lookups

Constraints the DBMS now enforces regardless of application code: PRIMARY KEY
(uniqueness + non-null), FOREIGN KEY (referential integrity, with ON DELETE
CASCADE / RESTRICT / SET NULL choices), UNIQUE, NOT NULL, CHECK (range):

  ALTER TABLE appointment ADD CONSTRAINT chk_slot
      CHECK (slot BETWEEN '08:00' AND '18:00');</code></pre>

<h3>DDL and DML command summary</h3>
<table border="1" cellpadding="6">
<tr><th>Command</th><th>Family</th><th>Effect</th></tr>
<tr><td>CREATE TABLE / INDEX / VIEW</td><td>DDL</td><td>Adds a structure the DBMS will enforce</td></tr>
<tr><td>ALTER TABLE</td><td>DDL</td><td>Adds, drops or modifies columns and constraints</td></tr>
<tr><td>DROP TABLE</td><td>DDL</td><td>Removes a structure and its data — destructive</td></tr>
<tr><td>SELECT</td><td>DML (query)</td><td>Reads rows, filtered, grouped and sorted</td></tr>
<tr><td>INSERT</td><td>DML</td><td>Adds a row; refused if any constraint would break</td></tr>
<tr><td>UPDATE</td><td>DML</td><td>Modifies rows matching a WHERE predicate</td></tr>
<tr><td>DELETE</td><td>DML</td><td>Removes rows matching a WHERE predicate</td></tr>
<tr><td>GRANT / REVOKE</td><td>DCL</td><td>Assigns or removes role permissions (least privilege)</td></tr>
</table>
<p>A third family completes the picture: <strong>transaction control (TCL)</strong> — BEGIN, COMMIT and ROLLBACK group DML into atomic units, so a failure mid-transaction leaves the database exactly as it was. Every batch job and multi-step update in a project should be wrapped in one.</p>

<h3>DML: manipulating the data</h3>
<pre><code>DML worked on the clinic tables, each query's execution order stated:

  INSERT INTO patient (patientID, name, dob, phone)
  VALUES ('P010', 'Chen', '2008-04-12', '07700 900123');
  -- the row must satisfy every constraint or the insert fails atomically.

  UPDATE patient SET phone = '07700 900456' WHERE patientID = 'P010';
  -- without WHERE this would touch every row - the classic destructive slip.

  DELETE FROM appointment WHERE apptDate < '2026-01-01';
  -- a FK referencing patient would RESTRICT or CASCADE here - state which.

  SELECT p.name, COUNT(a.apptID) AS visits
  FROM patient p
  LEFT JOIN appointment a ON p.patientID = a.patientID
  GROUP BY p.patientID, p.name
  HAVING COUNT(a.apptID) = 0
  ORDER BY p.name;
  -- Execution: FROM -> JOIN -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER
  -- BY. LEFT JOIN keeps patients with no appointments (count 0); HAVING
  -- filters the GROUPS (WHERE could not - it runs before aggregation).

JOIN types to name: INNER (matching rows only), LEFT (all left rows, nulls
where unmatched), RIGHT (mirror), FULL (all rows both sides), and self-join
(table related to itself - staff/supervisor).</code></pre>

<h3>Normalisation, end to end</h3>
<p><strong>Normalisation</strong> restructures data to remove redundancy and the anomalies it causes. Full procedure with the reason each step matters:</p>
<pre><code>Unnormalised: one row per (student, subject) with a repeating group:

  StudentID | Name  | Class | ClassTeacher | Subjects (repeating)
  S1        | Chen  | 11A   | Mr Hall      | Maths, Physics

1NF - eliminate repeating groups (each field single-valued):
  StudentID | Name | Class | ClassTeacher | Subject
  S1 | Chen | 11A | Mr Hall | Maths
  S1 | Chen | 11A | Mr Hall | Physics      <- duplication begins

2NF - 1NF and no partial dependency on a composite key
  (key here is (StudentID, Subject); Name, Class, ClassTeacher depend only
  on StudentID - part of the key):
  STUDENT(StudentID [PK], Name, Class, ClassTeacher)
  RESULT(StudentID [PK, FK], Subject [PK], Mark)

3NF - 2NF and no transitive dependency
  (in STUDENT, ClassTeacher depends on Class, not directly on StudentID):
  STUDENT(StudentID [PK], Name, Class [FK])
  CLASS(Class [PK], ClassTeacher)
  RESULT(StudentID [PK, FK], Subject [PK], Mark)

Anomalies removed at each step:
  1NF removes the multi-valued field (searching "who takes Physics" became
  impossible); 2NF removes the teacher's name repeating per subject;
  3NF means one class has ONE teacher stored ONCE - change Mr Hall in one row
  and every student of 11A sees it.</code></pre>
<p>Denormalisation exists as a deliberate counter-move: merging tables back for read-heavy reporting trades integrity risk for fewer joins — valid when the project's non-functional requirements demand it and the trade is documented.</p>

<h3>The design artefacts a project needs</h3>
<ul>
<li><strong>Entity-relationship diagram</strong> — entities, attributes, cardinality (1:1, 1:M, M:N resolved with junction tables).</li>
<li><strong>Data dictionary</strong> — every field: type, length, range, key role, validation rules.</li>
<li><strong>Normalisation narrative</strong> — the unnormalised table and each step to 3NF with the dependency named at each split (the trace above is the model).</li>
<li><strong>DDL script</strong> — the schema with all constraints, version-controlled.</li>
<li><strong>Validation and security plan</strong> — input checks at the application plus DBMS-level constraints; roles and least-privilege grants.</li>
</ul>
<pre><code>Worked: GRANT statements for the clinic's two roles.

  CREATE ROLE reception;
  GRANT SELECT, INSERT ON appointment TO reception;
  GRANT SELECT ON patient TO reception;
  CREATE ROLE doctor;
  GRANT SELECT ON appointment, patient, prescription TO doctor;

  -- reception cannot read prescriptions; doctors cannot delete appointments.
  Least privilege means each role receives exactly what its work needs - and
  the project's security section records these decisions.</code></pre>

<h3>Normalisation worked example: the dependency proof</h3>
<p>The one question format that catches people out is proving <em>which</em> normal form a table violates. The method: write the functional dependencies, then test each in turn.</p>
<pre><code>Table: ENROLMENT(studentID, studentName, courseID, courseFee, lecturerID, lecturerName)
Dependencies: studentID -> studentName; courseID -> courseFee, lecturerID;
              lecturerID -> lecturerName. Key: (studentID, courseID).

1NF? Every field single-valued - yes (assume no repeating groups).
2NF? studentName depends on only part of the key (studentID) - partial
     dependency - VIOLATED.
3NF? lecturerName depends on lecturerID which is not a key - transitive
     dependency - VIOLATED (and 2NF must hold first anyway).

Split for 2NF (remove partials):
  STUDENT(studentID, studentName)
  ENROL(studentID, courseID, courseFee, lecturerID, lecturerName)
Split for 3NF (remove transitives):
  COURSE(courseID, courseFee, lecturerID)
  LECTURER(lecturerID, lecturerName)

Every non-key attribute now depends on the key, the whole key, and nothing
but the key - the sentence markers look for.</code></pre>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Writing DML when DDL is asked: CREATE/ALTER/DROP define; SELECT/INSERT/UPDATE/DELETE manipulate.</li>
<li>UPDATE or DELETE without a WHERE clause — the answer must state the predicate.</li>
<li>Stopping normalisation at "no repeating groups"; 2NF needs the partial-dependency split and 3NF the transitive one.</li>
<li>Declaring a foreign key without an ON DELETE choice in a design answer; cascade/restrict/set-null is a decision with consequences.</li>
<li>Using WHERE on aggregate results (needs HAVING), or grouping by fewer columns than selected (SQL strictness).</li>
<li>Confusing LEFT JOIN with INNER JOIN in "list all X even if no Y" questions — the unmatched rows are the point.</li>
<li>Denormalising without recording the trade-off; the exam rewards the conscious reversal, not the accident.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Unit 4, 4 marks).</strong> Explain the difference between DDL and DML with examples.</p>
<p>Answer: DDL defines and alters the database structure and is executed rarely by administrators — CREATE TABLE patient, ALTER TABLE add a column, CREATE INDEX. DML operates on the data within that structure and runs constantly — SELECT lists, INSERT adds, UPDATE modifies, DELETE removes. DDL changes the schema the DBMS enforces; DML changes rows subject to those constraints.</p>
<p><strong>Question 2 (Unit 4, 5 marks).</strong> Normalise the table ORDER(orderID, customerName, customerPhone, productID, productName, quantity) to 3NF, naming the dependencies.</p>
<p>Answer: Key is orderID (assume one product per order row). customerName and customerPhone depend on the customer (transitive via a customerID that is missing) and productName on productID — non-key determinants. 2NF: none partial (single-column key), so split the transitive dependencies: ORDER(orderID, customerID, productID, quantity), CUSTOMER(customerID, customerName, customerPhone), PRODUCT(productID, productName). 3NF holds: every non-key field depends on its key, the whole key, and nothing but the key. Each customer and product is stored once.</p>
<p><strong>Question 3 (Unit 4, 4 marks).</strong> Write DDL to create a student table with a primary key and a marks range constraint.</p>
<p>Answer: CREATE TABLE student (studentID CHAR(5) PRIMARY KEY, name VARCHAR(60) NOT NULL, mark INTEGER CHECK (mark BETWEEN 0 AND 100)); — the PRIMARY KEY enforces unique identity, NOT NULL rejects empty names, and the CHECK makes out-of-range marks impossible at the database level.</p>
<p><strong>Question 4 (Unit 4, 4 marks).</strong> Explain what happens when a row is deleted from a table referenced by foreign keys.</p>
<p>Answer: The DBMS enforces referential integrity according to the declared rule: ON DELETE RESTRICT refuses the delete while child rows exist (protective default); ON DELETE CASCADE deletes the dependent rows too (fast, but destructive); ON DELETE SET NULL keeps child rows with the key nulled (only if nullable). The choice is documented in the design because each has different consequences for data retention.</p>
<p><strong>Question 5 (Unit 4, 4 marks).</strong> Write a query listing customers with no orders, and explain why HAVING is used.</p>
<p>Answer: SELECT c.customerID, c.name FROM customer c LEFT JOIN orders o ON c.customerID = o.customerID GROUP BY c.customerID, c.name HAVING COUNT(o.orderID) = 0. The LEFT JOIN keeps all customers, the count measures their orders per group, and HAVING filters groups after aggregation — WHERE cannot, because it runs before the groups exist.</p>
<p><strong>Question 6 (Unit 4, 3 marks).</strong> Explain when denormalisation is justified.</p>
<p>Answer: In read-heavy reporting where join costs dominate query time, merging tables (e.g. storing the product name on the order row) removes joins and speeds reads. It is justified only when the redundancy is controlled (updated through one path, or refreshed from the normalised source) and the gain is documented — otherwise it reintroduces the update anomalies normalisation removed.</p>
<p>Data definitions shape the project's core; the network layer shapes how its users reach it.</p>
`,

    "17e42a4c-18d8-47cd-b02f-f5b78b6bc7e5": `
<h2>Edexcel IAL Computer Science: Protocols, Circuit and Packet Switching</h2>
<p>Pearson Edexcel International Advanced Level in Computer Science, Unit 3 Advanced Computer Science: protocols, and circuit switching versus packet switching. The AS networking note traced data across a LAN and the internet; this note goes deeper into the rules themselves — what a protocol specification contains, how the layers compose, and why the telephone model and the packet model make opposite trades. The switching comparison is traced end to end on both models.</p>

<h3>What a protocol is</h3>
<p>A <strong>protocol</strong> is an agreed specification governing communication between systems: message format and syntax, semantics (what each field means), timing and sequencing (who speaks when, timeouts, rate), and error handling (detection, correction, retransmission). Without a shared protocol, hardware interoperation is impossible — the exam's "why protocols are needed" question wants those four components, not just "so devices understand each other".</p>
<p>Layering exists so each level can evolve independently and vendors can implement one layer against a stable interface. The <strong>TCP/IP</strong> model: application (HTTP, SMTP, FTP, DNS), transport (TCP, UDP), internet (IP, ICMP, ARP), network access (Ethernet, Wi-Fi, PPP). The <strong>OSI</strong> reference model's seven layers (Physical, Data Link, Network, Transport, Session, Presentation, Application) are the vocabulary examiners use when asking for names — know both, map TCP/IP onto OSI, and explain <strong>encapsulation</strong>: each layer wraps the one above's data in its own header (and trailer at the data-link layer), and the receiver unwraps in reverse.</p>
<pre><code>Encapsulation traced for sending "Hi" over HTTP:

  Application   : HTTP request headers + "Hi"
  Transport     : TCP header (ports, sequence no.) + HTTP data  = segment
  Internet      : IP header (src/dst addresses) + segment       = packet
  Network access: Ethernet header + trailer (FCS) + packet      = frame

  Receiver unwraps in order: frame -> packet -> segment -> HTTP data.
  Each layer reads only ITS header - the modularity is the point.

ARP bridging the layers: an IP packet needs the destination MAC address on
the LAN; ARP broadcasts "who has 192.168.1.5?" and the owner replies with its
MAC - the address-resolution seam between internet and network-access layers.</code></pre>

<h3>The protocol families in depth</h3>
<table border="1" cellpadding="6">
<tr><th>Protocol</th><th>Layer</th><th>Guarantees</th><th>Cost</th><th>Used for</th></tr>
<tr><td>TCP</td><td>Transport</td><td>Reliable, ordered, flow-controlled, connection-oriented (3-way handshake)</td><td>Round-trips and header overhead</td><td>HTTP, email, file transfer</td></tr>
<tr><td>UDP</td><td>Transport</td><td>None — best-effort, connectionless</td><td>Minimal delay</td><td>DNS, streaming, gaming, VoIP</td></tr>
<tr><td>IP (v4/v6)</td><td>Internet</td><td>Best-effort addressing and routing; fragmentation</td><td>No delivery guarantee (IP alone)</td><td>Everything routed</td></tr>
<tr><td>ICMP</td><td>Internet</td><td>Error/query messages (ping, TTL exceeded)</td><td>—</td><td>Diagnostics</td></tr>
<tr><td>TLS</td><td>Session/Presentation</td><td>Encryption, integrity, authentication (certificates)</td><td>Handshake latency, CPU</td><td>HTTPS, secure email</td></tr>
</table>
<pre><code>The TCP three-way handshake, packet by packet:

  Client                          Server
    | ---- SYN (seq=x) ------------->|    "I want to connect"
    | <--- SYN-ACK (seq=y, ack=x+1) -|    "acknowledged; my sequence is y"
    | ---- ACK (ack=y+1) ----------->|    "confirmed"
  connection ESTABLISHED; data flows with sequence/ack numbers.

Why three steps: each side learns the other's initial sequence number and
both agree the connection exists - a two-way exchange could leave the server
believing in a connection the client never confirmed. Teardown mirrors it
(FIN/ACK), and timeouts recover lost packets - the reliability story.</code></pre>

<h3>Circuit switching</h3>
<p>In <strong>circuit switching</strong>, a dedicated physical path is established end to end for the whole conversation and released at the end — the telephone network model. Three phases: circuit establishment (signalling reserves each link), data transfer (the path is exclusive), circuit teardown.</p>
<ul>
<li><strong>Strengths:</strong> guaranteed constant bandwidth and latency for the call's duration; no congestion mid-call once established; simple in-call ordering (one path).</li>
<li><strong>Weaknesses:</strong> the reserved path is wasted during silence (speech is ~40% silence); setup delay before any data flows; a failed link breaks the call with no rerouting; capacity is fixed per circuit.</li>
</ul>

<h3>Packet switching</h3>
<p>In <strong>packet switching</strong>, messages are split into packets, each carrying source/destination addresses and a sequence number; packets travel independently (possibly different routes — datagram approach) or along a pre-agreed virtual circuit, sharing links with other conversations' packets. The receiving end reassembles by sequence number.</p>
<pre><code>One message, both models, traced:

  Message: 1.2 Mbit, links of 1.2 Mbps each.

  CIRCUIT: establish path (say 200 ms signalling), then the message flows on
  its exclusive path: 1.2 Mbit / 1.2 Mbps = 1 s, then teardown. Total ≈ 1.2 s.
  During the transfer no other call can use those links.

  PACKET (1500-byte packets, ~800 packets): packets interleave with other
  traffic. Each hop queues and forwards (store-and-forward: each router
  receives the whole packet, checks it, sends on). If a link is busy, packets
  queue (variable latency - jitter); if a router drops one, only THAT packet
  is retransmitted (TCP). No setup delay; total time depends on congestion.
  A failed route just changes the next hop for later packets.

  Store-and-forward delay per hop = packetSize / linkRate; the end-to-end sum
  plus queueing is the latency - the number a "why is video call laggy?"
  answer quotes.</code></pre>
<table border="1" cellpadding="6">
<tr><th></th><th>Circuit switching</th><th>Packet switching</th></tr>
<tr><td>Path</td><td>Dedicated, reserved per call</td><td>Shared, per-packet routes</td></tr>
<tr><td>Setup</td><td>Required before data</td><td>None (datagram) / light (virtual circuit)</td></tr>
<tr><td>Bandwidth</td><td>Guaranteed constant</td><td>Statistical; can vary (jitter)</td></tr>
<tr><td>Failure handling</td><td>Call drops; no rerouting</td><td>Packets reroute; lost packets retransmitted</td></tr>
<tr><td>Efficiency</td><td>Low during silence/idle</td><td>High — links shared statistically</td></tr>
<tr><td>Fits</td><td>Voice telephony, constant-rate streams</td><td>Data networks, the internet, bursty traffic</td></tr>
</table>
<p>Modern note the exam appreciates: voice over the internet (VoIP) is packet switching engineered to imitate circuit guarantees — priority queues and reserved capacity give latency-sensitive packets the reserved feel of a circuit.</p>

<h3>Worked example: designing a link for a school</h3>
<pre><code>Requirement: 40 classrooms, each streaming 2 Mbps video lessons at peak, plus
email/web traffic.

  Peak video demand: 40 x 2 = 80 Mbps, before overheads (add ~20% for
  headers/retransmission): ≈ 96 Mbps.
  Packet switching with a 100 Mbps backbone just fits; a 1 Gbps link gives
  headroom. Circuit switching would reserve 2 Mbps per room regardless of use
  (40 x 2 = 80 Mbps permanently committed) and no room could burst above its
  allocation - wasteful for bursty web traffic.

Choice: packet switching with QoS priority for the video VLAN; the answer
names the burstiness argument (statistical multiplexing) and the QoS trade.</code></pre>

<h3>Quality of service on packet networks</h3>
<p>Because packet switching offers no inherent guarantee, engineered guarantees are added on top: <strong>QoS</strong> marks latency-sensitive packets (voice, video) for priority queuing; <strong>traffic shaping</strong> smooths bursts so links are not overwhelmed; <strong>reservation</strong> (RSVP-style) holds capacity for a flow; and <strong>MPLS</strong> gives labelled paths that behave like fast virtual circuits. Each mechanism trades simplicity for predictability — the exam's "how does VoIP work reliably?" answer is exactly this list with priority queuing first.</p>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Describing circuit switching as "faster" universally; it is predictable (guaranteed rate), while packet switching is efficient and burst-friendly — match the claim to the traffic.</li>
<li>Forgetting store-and-forward when computing latency: each hop holds the packet, and links serialise it.</li>
<li>Saying packets arrive in order; the sequence numbers and reassembly exist because they may not.</li>
<li>Listing OSI layers without their function or mis-ordering them (Physical, Data Link, Network, Transport, Session, Presentation, Application).</li>
<li>Confusing IP (best-effort delivery) with TCP (reliability); neither alone is "the internet" — the pairing is.</li>
<li>Claiming UDP is unreliable so it is useless; its speed is exactly why real-time services choose it.</li>
<li>Leaving handshake/timing out of protocol answers; sequencing and synchronisation are part of what a protocol defines.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Unit 3, 4 marks).</strong> Describe the features a protocol must specify.</p>
<p>Answer: Message format/syntax (bit patterns, header fields); semantics (what each field and code means, what actions follow); timing and sequencing (who transmits when, synchronisation, timeouts, rate control); and error handling (detection via checksums, correction or retransmission rules). These four allow independent implementations to interoperate exactly.</p>
<p><strong>Question 2 (Unit 3, 5 marks).</strong> Explain encapsulation using the TCP/IP layers.</p>
<p>Answer: Each layer adds its own header to the data from the layer above: the application data gets a TCP header (ports, sequence numbers) forming a segment; the segment gets an IP header (addresses) forming a packet; the packet gets a network-access header and trailer (MAC addresses, checksum) forming a frame. The receiver reverses the process, each layer reading only its own header and passing the payload upward — layering isolates responsibilities so protocols can change independently.</p>
<p><strong>Question 3 (Unit 3, 5 marks).</strong> Compare circuit switching and packet switching for a national voice network.</p>
<p>Answer: Circuit switching reserves an exclusive path per call: guaranteed constant bandwidth and latency once established and simple ordering, but setup delay before speech, wasted capacity during silence, and a failed link drops the call. Packet switching shares links statistically: no setup, high efficiency and rerouting around failures, but variable latency (jitter) that voice dislikes unless QoS prioritises it. Traditional telephony chose circuits; modern VoIP chooses packets with engineered priority — the efficiency of sharing wins once jitter can be controlled.</p>
<p><strong>Question 4 (Unit 3, 4 marks).</strong> Describe the TCP three-way handshake and explain its purpose.</p>
<p>Answer: The client sends SYN with its initial sequence number; the server replies SYN-ACK acknowledging it and supplying its own sequence number; the client confirms with ACK. Purpose: both sides learn each other's sequence numbers (needed for ordered reassembly), agree the connection exists, and agree parameters — avoiding the half-open connections a two-message exchange would permit.</p>
<p><strong>Question 5 (Unit 3, 4 marks).</strong> Explain why the internet uses packet switching rather than circuit switching.</p>
<p>Answer: Internet traffic is bursty — web pages, email and files arrive in irregular bursts with idle gaps. Packet switching shares links statistically, so all conversations use whatever capacity is free at each instant (high utilisation), packets reroute around failures (resilience), and each packet need not hold capacity when silent. Circuit switching would reserve bandwidth through idle periods and block bursts above the reservation. Real-time needs are met with QoS on top rather than dedicated circuits.</p>
<p><strong>Question 6 (Unit 3, 3 marks).</strong> Calculate the store-and-forward delay for a 1500-byte packet over three 10 Mbps hops.</p>
<p>Answer: Packet = 1500 × 8 = 12 000 bits. Per hop: 12 000 ÷ 10⁷ = 1.2 ms. Three hops store-and-forward the packet serially (each waits for the whole packet before sending): 3 × 1.2 = 3.6 ms transmission delay, plus any propagation and queueing delay at each router.</p>
<p>The protocols above carry encrypted traffic as often as plain; the security layer on top is the next note's subject.</p>
`,
  },
};
