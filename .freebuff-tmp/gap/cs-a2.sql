UPDATE study_materials SET content = content || $n$
<h3>Recursion</h3>
<p>A recursive routine calls itself on a smaller version of the problem. It needs a base case that stops the calls and a recursive case that moves towards the base case. Without a base case the routine never terminates and the call stack overflows.</p>
<p><strong>Example:</strong> factorial(n) = 1 if n = 0, otherwise n × factorial(n − 1).</p>
<p>Recursion and iteration can solve the same problems. Recursion is often clearer for tree-shaped problems; iteration uses less memory because it does not build up stack frames.</p>$n$
WHERE material_type = 'notes' AND topic_id = '965f1ced-091e-4f23-8f27-57fdb3db0b24';

UPDATE study_materials SET content = content || $n$
<h3>Abstract data types in practice</h3>
<p>An abstract data type is defined by the operations it supports and their behaviour, not by how it is stored. A stack is defined by push, pop and isEmpty; the programmer using it does not need to know whether it is built from an array or a linked list.</p>
<p>Separating the interface from the implementation lets the implementation change without breaking the code that uses it, and makes each part easier to test.</p>
<p><strong>Exam tip:</strong> when asked to define an ADT, name the operations and say what each does, not how it is stored.</p>$n$
WHERE material_type = 'notes' AND topic_id = 'd731e71c-1bcb-47b4-8837-644b3fd97e29';

UPDATE study_materials SET content = content || $n$
<h3>File organisation and access</h3>
<p>Serial files store records in the order they are written and suit sequential processing. Sequential files store records in key order, so a search can stop early. Random (direct) access files calculate a record's address from its key, using a hashing function, so any record can be reached quickly.</p>
<p><strong>Exam tip:</strong> state the trade-off: sequential access is simple but slow for searching; direct access is fast but needs a hashing function and can produce collisions.</p>$n$
WHERE material_type = 'notes' AND topic_id = 'ec102c32-7550-40e8-91ec-985ec72ff83c';

UPDATE study_materials SET content = content || $n$
<h3>DDL and DML</h3>
<p>Data Definition Language (DDL) creates and changes the structure of a database: CREATE TABLE, ALTER TABLE and DROP TABLE. Data Manipulation Language (DML) works with the data inside the structure: SELECT, INSERT, UPDATE and DELETE.</p>
<p><strong>Example:</strong> CREATE TABLE Student (ID INTEGER PRIMARY KEY, Name VARCHAR(30)); is DDL; INSERT INTO Student VALUES (1, 'Ana'); is DML.</p>
<p><strong>Exam tip:</strong> classify each statement by whether it changes structure or changes data.</p>$n$
WHERE material_type = 'notes' AND topic_id = '76639184-3968-4dca-92f4-c5b52f558d8e';

UPDATE study_materials SET content = content || $n$
<h3>Protocols and switching</h3>
<p>A protocol is a set of rules that devices follow to communicate. TCP/IP is the suite used on the internet, and protocols define how data is addressed, formatted and checked for errors.</p>
<p>In circuit switching a dedicated path is set up for the whole call, as in the traditional telephone network. In packet switching the message is split into packets, each carrying a header with source and destination addresses and a sequence number. Packets can take different routes and are reassembled at the destination.</p>
<p><strong>Exam tip:</strong> packet switching uses the network efficiently because no path is reserved, but packets can arrive out of order.</p>$n$
WHERE material_type = 'notes' AND topic_id = '346acb48-363d-495f-bf45-5170082e4abb';

UPDATE study_materials SET content = content || $n$
<h3>Programming paradigms</h3>
<p>An imperative paradigm describes how to do a task as a sequence of statements that change state. An object-oriented paradigm groups data and the methods that act on it into classes. A declarative paradigm states the result wanted and leaves the method to the system, as in SQL.</p>
<h3>Exception handling</h3>
<p>An exception is a run-time error such as a missing file or a division by zero. A try block runs the risky code, and a catch (or except) block handles the exception so the program can recover rather than crash.</p>
<p><strong>Exam tip:</strong> name the paradigm and give one feature that shows it, such as classes for object-oriented programming.</p>$n$
WHERE material_type = 'notes' AND topic_id = '580136d1-5758-460e-8f79-7a04e39b9899';

UPDATE study_materials SET content = content || $n$
<h3>Symmetric and asymmetric encryption</h3>
<p>Symmetric encryption uses one shared key to encrypt and decrypt. It is fast, but the key must be shared securely. Asymmetric encryption uses a public key to encrypt and a private key to decrypt. TLS uses asymmetric encryption to agree a shared symmetric key at the start of a session.</p>
<p>A digital certificate binds a public key to an organisation. A trusted certificate authority signs it so that a browser can check the site's identity.</p>
<p><strong>Exam tip:</strong> explain the hybrid approach: asymmetric for the key exchange, symmetric for the bulk data.</p>$n$
WHERE material_type = 'notes' AND topic_id = '1323a228-279d-4364-a21f-b07cff9db871';

WITH qz AS (SELECT z.id, z.topic_id FROM quizzes z WHERE z.exam_type = 'quiz' AND z.topic_id IN ('d731e71c-1bcb-47b4-8837-644b3fd97e29','965f1ced-091e-4f23-8f27-57fdb3db0b24','ec102c32-7550-40e8-91ec-985ec72ff83c','76639184-3968-4dca-92f4-c5b52f558d8e','346acb48-363d-495f-bf45-5170082e4abb','580136d1-5758-460e-8f79-7a04e39b9899','1323a228-279d-4364-a21f-b07cff9db871')),
st AS (SELECT ss.id, ss.code, ss.topic_id FROM syllabus_statements ss WHERE ss.topic_id IN (SELECT topic_id FROM qz))
INSERT INTO questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
SELECT qz.id, v.qt, v.opts::jsonb, v.ci, v.ex, v.so, 'exam', st.id
FROM (VALUES
 ('d731e71c-1bcb-47b4-8837-644b3fd97e29', '10.4', $q1$Which statement best describes an abstract data type?$q1$, $o1$["A data structure whose operations are defined independently of how the data is stored","A data type that can only hold integers","An array with a fixed length","A pointer to a memory address"]$o1$, 0, $e1$An ADT is defined by its operations and their behaviour. How the data is stored is hidden from the user of the type.$e1$, 100),
 ('965f1ced-091e-4f23-8f27-57fdb3db0b24', '19.2', $q2$What must a recursive algorithm always include so that it stops?$q2$, $o2$["A base case","A global variable","A second copy of the algorithm running in parallel","A GOTO statement"]$o2$, 0, $e2$A base case returns without a further recursive call. Without it the calls never end and the stack overflows.$e2$, 100),
 ('ec102c32-7550-40e8-91ec-985ec72ff83c', '13.3', $q3$A floating-point number is stored as a mantissa and an exponent. What is the main reason floating-point arithmetic can give rounding errors?$q3$, $o3$["The mantissa has a finite number of binary digits","The exponent is always negative","Floating-point numbers use no bits for the sign","Floating-point numbers cannot be added"]$o3$, 0, $e3$Many decimal values cannot be stored exactly in a fixed number of binary digits, so the stored value is rounded.$e3$, 100),
 ('76639184-3968-4dca-92f4-c5b52f558d8e', '8.3', $q4$Which of these is a Data Definition Language (DDL) statement?$q4$, $o4$["SELECT","INSERT","CREATE TABLE","UPDATE"]$o4$, 2, $e4$DDL changes the structure of the database. CREATE TABLE defines a new table; the other three work with the data.$e4$, 100),
 ('346acb48-363d-495f-bf45-5170082e4abb', '14.2', $q5$In packet switching, what happens to a message before it is sent?$q5$, $o5$["It is split into packets, each with a header containing addressing information","It is converted into a single continuous circuit","It is compressed into one bit","It is sent with no addressing information"]$o5$, 0, $e5$Packet switching splits the message into addressed packets that can take different routes and be reassembled at the destination.$e5$, 100),
 ('580136d1-5758-460e-8f79-7a04e39b9899', '20.2', $q6$What is the purpose of an exception handler?$q6$, $o6$["To stop the program from compiling","To catch a run-time error and deal with it so the program does not crash","To store data in a file","To convert source code into machine code"]$o6$, 1, $e6$An exception handler catches a run-time error such as a missing file, so the program can recover.$e6$, 100),
 ('1323a228-279d-4364-a21f-b07cff9db871', '17.1', $q7$Which type of encryption uses the same key to encrypt and decrypt the data?$q7$, $o7$["Asymmetric encryption","Hashing","Symmetric encryption","A digital signature"]$o7$, 2, $e7$Symmetric encryption uses one shared key. Asymmetric encryption uses a public and a private key.$e7$, 100)
) v(tid, code, qt, opts, ci, ex, so)
JOIN qz ON qz.topic_id = v.tid::uuid
JOIN st ON st.topic_id = v.tid::uuid AND st.code = v.code;
