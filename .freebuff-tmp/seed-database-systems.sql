insert into public.learning_objectives (topic_id, code, statement, teach, sort_order)
values
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'database-systems'), '0478 9a', $st$Distinguish flat-file and relational databases, and explain tables, records, fields and keys.$st$, $teach$### What is being asked
Sort database terms or judge a design. The answer names the structure — flat file or relational — and uses record, field, table and key exactly.

### Method
1. Flat file: everything in one table. Simple, but shared facts repeat in every row.
2. Relational: data split into linked tables (one per entity), joined by keys. Harder to design, safer to keep correct.
3. Vocabulary: a table holds entities of one kind; each row is a record (one entity); each column is a field (one fact type); a key identifies records.
4. Judge scenarios by repetition: repeated facts across rows point to a flat file that should have been relational.

### Worked example
A shop keeps orders, customers and products in one spreadsheet, so each order row repeats the customer's address. That is a flat file, and the repeated address is the giveaway. Check: one fact (the address) stored many times — split customers into their own table and the repetition vanishes.

### Traps
- Calling any spreadsheet a database design. A spreadsheet file is not automatically a flat-file database; the structure (one shared table) is what matters.
- Swapping record and field. Records run across (rows); fields run down (columns).
- Saying relational means "more tables so better". More tables help only if keys link them; unlinked tables are just several flat files.
- Forgetting the key. A table with no way to pick out one record cannot join to anything.

### Timing
Paper 1: 2-3 minutes, 2-3 marks. Definition questions want the contrast — one mark for each side, not two facts about one side.$teach$, 1),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'database-systems'), '0478 9b', $st$Choose primary keys and use foreign keys to link tables in a one-to-many relationship.$st$, $teach$### What is being asked
Pick a key for a table or read a link between tables. The answer names which field is primary, which is foreign, and which relationship they create.

### Method
1. Primary key: the field (or fewest fields) that is different for every record — an ID, never a name, town or age.
2. Foreign key: a copy of another table's primary key, stored where the link is needed. Same values, different job.
3. One-to-many: the "one" table holds the primary key; each "many" row carries it as a foreign key (one author, many books).
4. Test a key choice with duplicates: if two real records could share the value, it cannot be primary.

### Worked example
AUTHORS(AuthorID, Name) and BOOKS(BookID, Title, AuthorID). AuthorID is primary in AUTHORS and foreign in BOOKS — one author links to many books. Check: two authors could share a name, so Name fails the duplicate test; AuthorID cannot repeat, so it passes.

### Traps
- Choosing a name as primary key. Real names duplicate; IDs exist precisely because names fail.
- Calling the foreign key a second primary key. It holds copied values — it identifies nothing in its own table.
- Linking on matching names instead of IDs. Names change and duplicate; keys are stable.
- Reversing the relationship. The foreign key sits on the "many" side (many books carry one AuthorID), not the "one" side.

### Timing
Paper 1: 3-4 minutes, 3-4 marks. Key questions are nearly free marks if the duplicate test is applied before answering.$teach$, 2),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'database-systems'), '0478 9c', $st$Write SQL SELECT queries with FROM and WHERE to retrieve exactly the data asked for.$st$, $teach$### What is being asked
Read or write a SELECT query over one table. The answer returns the right columns from the right table filtered by the right condition — all three.

### Method
1. SELECT names the columns (or * for all columns). Never select columns the question did not ask for.
2. FROM names the one table. A correct query on the wrong table scores nothing.
3. WHERE filters rows: text in quotes ('Lagos'), numbers bare (2024), comparisons with =, >, <.
4. Read the question twice: once for the columns, once for the filter. Each maps to a different clause.

### Worked example
"Names of pupils older than 11" from PUPILS(Name, Age): SELECT Name FROM PUPILS WHERE Age > 11. Check: Name is the column asked for, PUPILS is the table, Age > 11 is the filter — each clause answers one part of the question.

### Traps
- SELECT * when specific columns were asked. Star returns everything and ignores the question.
- Quoting numbers or forgetting quotes on text. WHERE Age > '11' compares text; WHERE Town = Lagos (no quotes) is a syntax error.
- Filtering on the SELECT column instead of the condition column. The filter and the output are usually different fields.
- Using = for ranges. "Older than 11" is >, not = — match the comparison to the words.

### Timing
Paper 2: 3-4 minutes, 3-4 marks — one per correct clause. Write the three clauses on sight before checking the options.$teach$, 3),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'database-systems'), '0478 9d', $st$Explain redundancy and inconsistency in flat files, and how relational design removes them.$st$, $teach$### What is being asked
Diagnose a data problem or justify splitting tables. The answer names the disease (redundancy, inconsistency) and the cure (store once, link by key).

### Method
1. Redundancy: the same fact stored many times (an address on every order row). Wastes space and invites error.
2. Inconsistency: redundant copies that no longer agree, because an update reached some but not all (half the rows say the old address).
3. The cure: store each fact once in its own table and reference it everywhere else with a foreign key — one copy, so one update fixes all.
4. Argue with the scenario's own facts: quote which field repeats and which update would break it.

### Worked example
Thirty order rows carry the customer's address; the customer moves and ten rows are updated. The address is redundant (stored thirty times) and now inconsistent (two versions). Check: one CUSTOMERS table holding the address once, linked by CustomerID, would have needed exactly one edit.

### Traps
- Calling inconsistency a virus or hack. It is an update that missed some copies — an integrity failure, not an attack.
- Saying relational databases delete data. They store each fact once; nothing the business needs is lost.
- Blaming the user for typos. The design invited the error by demanding thirty identical entries; good design removes the invitation.
- Recommending "be more careful". Procedures help, but the structural fix is storing the fact once.

### Timing
Paper 1: 2-3 minutes, 2-3 marks. Diagnosis questions want both terms used correctly — redundancy for the repetition, inconsistency for the disagreement.$teach$, 4)
on conflict (topic_id, code) do update set
  statement = excluded.statement,
  teach = excluded.teach,
  sort_order = excluded.sort_order;
delete from public.quizzes
 where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'database-systems') and title = 'Checkpoints — Database Systems';
insert into public.quizzes (id, topic_id, title, description, is_published, exam_type)
values ('00000000-0000-0000-0000-000000000000', (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'database-systems'), 'Checkpoints — Database Systems', $desc$Short checks, one set per objective in this topic. Answer one wrongly and the objective it belongs to is the thing to revisit — not the whole topic.$desc$, true, 'quiz');
insert into public.questions
  (quiz_id, question_text, options, correct_option, explanation, difficulty, sort_order, objective_id, statement_id)
values
('00000000-0000-0000-0000-000000000000', $qt$A school keeps every student, class and teacher fact in one big spreadsheet. What problem follows?$qt$, $opts$["The file opens too slowly to use","Repeated facts that disagree when only some copies are updated","Spreadsheets cannot store text","Only one teacher can open the file"]$opts$::jsonb, 1, $ex$One shared table repeats facts (a flat file), so editing some copies leaves the rest stale — inconsistency. Speed, text storage and sharing are tool issues, not structure issues.$ex$, 'check', 101, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'database-systems') and code = '0478 9a'), null),
('00000000-0000-0000-0000-000000000000', $qt$In a PATIENTS table, what is one patient's whole row called?$qt$, $opts$["A field","A key","A query","A record"]$opts$::jsonb, 3, $ex$A row is a record — all the facts about one entity. A field is one column; a key identifies records; a query asks questions of the table.$ex$, 'check', 102, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'database-systems') and code = '0478 9a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Which field makes the best primary key for a MEMBERS table?$qt$, $opts$["MemberID","Surname","Town","Age"]$opts$::jsonb, 0, $ex$MemberID is unique by design. Surnames, towns and ages all repeat across real members, so each fails the duplicate test.$ex$, 'check', 201, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'database-systems') and code = '0478 9b'), null),
('00000000-0000-0000-0000-000000000000', $qt$BOOKS holds AuthorID values matching AUTHORS.AuthorID. What is AuthorID in BOOKS?$qt$, $opts$["A flat-file marker","A query","A foreign key","A second primary key"]$opts$::jsonb, 2, $ex$It is a copy of AUTHORS' primary key used to link the tables — a foreign key. It identifies nothing in BOOKS itself, it is not a query, and flat file is a structure, not a field role.$ex$, 'check', 202, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'database-systems') and code = '0478 9b'), null),
('00000000-0000-0000-0000-000000000000', $qt$What does SELECT Name FROM Pupils WHERE Age > 11 return?$qt$, $opts$["The ages of all pupils","Every field of pupils older than 11","The names of pupils older than 11","The names of pupils aged exactly 11"]$opts$::jsonb, 2, $ex$SELECT Name outputs names only; WHERE Age > 11 keeps strictly older pupils. Ages would need SELECT Age; every field would need *; exactly 11 would need =.$ex$, 'check', 301, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'database-systems') and code = '0478 9c'), null),
('00000000-0000-0000-0000-000000000000', $qt$Which query returns all fields of Borrowers who joined in 2024?$qt$, $opts$["SELECT Name FROM Borrowers WHERE JoinYear = 2024","SELECT * FROM Borrowers WHERE JoinYear = 2024","SELECT * FROM Books WHERE JoinYear = 2024","SELECT * FROM Borrowers WHERE Name = 2024"]$opts$::jsonb, 1, $ex$All fields needs *, the table is Borrowers, and the filter is JoinYear = 2024 (a bare number). The others select one column, query the wrong table, or filter text against a number.$ex$, 'check', 302, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'database-systems') and code = '0478 9c'), null),
('00000000-0000-0000-0000-000000000000', $qt$One customer address appears on 30 order rows. The customer moves; 10 rows are updated. What is the result?$qt$, $opts$["A virus in the orders table","Redundant storage that is now inconsistent","A broken primary key","Faster queries from cached addresses"]$opts$::jsonb, 3, $ex$Thirty copies is redundancy; two surviving versions is inconsistency. No malware is involved, keys are untouched, and duplicated text slows nothing — it corrupts.$ex$, 'check', 401, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'database-systems') and code = '0478 9d'), null),
('00000000-0000-0000-0000-000000000000', $qt$How does a relational design remove this redundancy?$qt$, $opts$["By deleting old orders regularly","By storing the address once in CUSTOMERS and linking orders with CustomerID","By locking the address field against edits","By keeping the spreadsheet but sorting it"]$opts$::jsonb, 1, $ex$One copy plus a foreign-key link means one edit fixes every order. Deleting orders loses business data; locking blocks legitimate moves; sorting rearranges the same thirty copies.$ex$, 'check', 402, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'database-systems') and code = '0478 9d'), null),
('00000000-0000-0000-0000-000000000000', $qt$BOOKS holds (Title, Author, Price). Write the SQL to show the title and price of every book costing more than 20.$qt$, $opts$["SELECT * FROM BOOKS WHERE Title > 20","SELECT Title, Price FROM BOOKS WHERE Price > 20","SELECT Title + Price FROM BOOKS WHERE Price > 20","SELECT Title, Price FROM BOOKS WHERE Price < 20"]$opts$::jsonb, 1, $ex$Marks as awarded: correct columns Title, Price [1]; correct table and filter Price > 20 [1]. Answer as shown. Star returns unasked columns; Title > 20 filters text as a number; + is not a column separator; < reverses the range.$ex$, 'exam', 900, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'database-systems') and code = '0478 9c'), (select id from public.syllabus_statements where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'database-systems') and code = '9')),
('00000000-0000-0000-0000-000000000000', $qt$LOANS(MemberID, BookID, DateOut) records one row per loan. How do MemberID and BookID link each loan correctly?$qt$, $opts$["MemberID and BookID are both primary keys of LOANS","DateOut is the foreign key to a calendar table","MemberID references MEMBERS and BookID references BOOKS","LOANS needs no keys because every row differs"]$opts$::jsonb, 2, $ex$Marks as awarded: each ID copies its home table's primary key [1]; the pair therefore points at exactly one member and one book [1]. A table cannot have two primary keys; DateOut is data, not a link; differing rows still need keys to join on.$ex$, 'exam', 901, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'database-systems') and code = '0478 9b'), (select id from public.syllabus_statements where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'database-systems') and code = '9'));
