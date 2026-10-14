UPDATE study_materials SET content = content || $n$
<h3>Binary and hexadecimal worked conversion</h3>
<p>To convert the denary number 156 to binary, subtract the place values from the largest downwards: 156 = 128 + 16 + 8 + 4, so the binary value is 10011100. Each binary digit is a bit, and the place values double from right to left: 1, 2, 4, 8, 16, 32, 64, 128.</p>
<p>Hexadecimal groups four bits at a time, so one hexadecimal digit represents a value from 0 to 15. Split 10011100 into 1001 and 1100 to get 9 and 12, which is 9C in hexadecimal. Hexadecimal is used to write memory addresses and colour codes because it is shorter than binary and converts to it directly.</p>
<p><strong>Exam tip:</strong> show the place-value working, not just the answer. Examiners award method marks for the subtraction or the grouping.</p>
$n$
WHERE material_type = 'notes' AND topic_id = '95591ce6-a270-4b09-b12e-bd4ec21ca1a0';

UPDATE study_materials SET content = content || $n$
<h3>Network topologies and hardware</h3>
<p>In a star topology every device connects to a central switch. If one cable or device fails, the others keep working, but if the central switch fails the whole network stops. In a bus topology all devices share one cable, which is cheap but means a break in the cable disables the network.</p>
<p>A switch connects devices within a local area network (LAN) and sends each frame only to the device it is addressed to, using MAC addresses. A router connects separate networks together and forwards packets using IP addresses. A wireless access point lets wireless devices join a wired LAN.</p>
<p><strong>Exam tip:</strong> when comparing topologies, state what happens when one device fails and when the central device fails. Those two cases are the usual differentiators.</p>
$n$
WHERE material_type = 'notes' AND topic_id = 'f5ce9e1c-9c8f-46d2-95bd-ac9687b6ea07';

UPDATE study_materials SET content = content || $n$
<h3>Two-dimensional arrays and records</h3>
<p>A two-dimensional array stores values in rows and columns, and each element is found with two indexes, usually written A[row, column]. A table of marks for five students in three subjects is a 5 by 3 array. Indexes normally start at 0, so the last element of an array with 8 elements has index 7.</p>
<p>A record groups fields of different data types under one name. A student record might hold a name as a string, an age as an integer and a pass flag as a Boolean. An array of records lets a program store a whole list of students, each with several fields, in one structure.</p>
<p><strong>Exam tip:</strong> an array holds one data type throughout, while a record can mix types. Say this when asked to compare them.</p>
$n$
WHERE material_type = 'notes' AND topic_id = '372710b0-fcac-4f55-af62-67b9bec5940c';

UPDATE study_materials SET content = content || $n$
<h3>Primary keys, foreign keys and redundancy</h3>
<p>A primary key is a field, or combination of fields, that uniquely identifies each record in a table. A foreign key is a field in one table that holds the primary key of a record in another table. Foreign keys link the tables together and let the database check referential integrity, so that an order cannot refer to a customer who does not exist.</p>
<p>Storing data in one place rather than repeating it in several tables reduces data redundancy. Less redundancy saves storage, and it reduces the chance that an update is made in one copy but not the others. Normalisation is the process of organising tables to remove this repetition.</p>
<p><strong>Exam tip:</strong> when asked about a foreign key, say which table it sits in and which primary key it refers to.</p>
$n$
WHERE material_type = 'notes' AND topic_id = 'f52cc259-2b6e-4aca-818b-56556bf68950';

UPDATE study_materials SET content = content || $n$
<h3>Ownership, licensing and AI bias</h3>
<p>Copyright gives the creator legal protection over how their software and other original work is copied, distributed and changed. Copying software without permission is a breach of copyright and can be illegal. Open source software is released under licences that allow others to use, study and modify it, often on the condition that changes are shared in the same way.</p>
<p>An AI system learns from its training data. If that data over-represents some groups or reflects past prejudice, the system's outputs can be biased, and it may treat people unfairly without anyone intending it. Developers can reduce this by checking the training data and testing the system on a wide range of cases.</p>
<p><strong>Exam tip:</strong> link each ethical point to a consequence for a real user, such as a person losing a job or a loan being refused unfairly.</p>
$n$
WHERE material_type = 'notes' AND topic_id = '1bdc4fd6-0627-40d3-a8e4-bbe5827c51e0';

UPDATE study_materials SET content = content || $n$
<h3>The fetch-decode-execute cycle and registers</h3>
<p>The program counter (PC) holds the address of the next instruction. During fetch, that address is copied to the memory address register (MAR), the instruction is read into the memory data register (MDR) and then into the current instruction register (CIR), and the PC is incremented. During decode the control unit works out what the instruction means, and during execute the ALU or another part of the CPU carries it out.</p>
<p>The accumulator is a register that holds the results of arithmetic and logic operations. Registers are very fast storage inside the CPU, and the CPU uses them so that it does not have to wait for main memory on every step.</p>
<p><strong>Exam tip:</strong> learn the purpose of each register in one sentence. Examiners often ask which register holds the address, and which holds the instruction.</p>
$n$
WHERE material_type = 'notes' AND topic_id = '3bad18f7-9041-4bd4-a193-e0da6c10b770';

UPDATE study_materials SET content = content || $n$
<h3>Testing with normal, boundary and erroneous data</h3>
<p>Normal test data is typical valid input that the program should accept and process correctly. Boundary (extreme) test data sits at the edges of the valid range, such as the lowest and highest permitted values, because errors often occur there. Erroneous test data is invalid input that the program should reject, such as text entered where a number is required.</p>
<p>A trace table records the value of each variable at each step of an algorithm. Tracing a algorithm by hand with test data shows where it departs from the intended result, and it is a common exam task.</p>
<p><strong>Exam tip:</strong> a complete test plan includes all three kinds of data, with the expected output written beside each test value.</p>
$n$
WHERE material_type = 'notes' AND topic_id = 'ced121cb-433c-4a2a-bc15-d33098a610eb';

UPDATE study_materials SET content = content || $n$
<h3>Malware types and prevention</h3>
<p>A virus attaches itself to a file or program and needs a host to spread. A worm spreads across a network without a host file. A trojan looks like useful software but carries a hidden harmful payload. Phishing uses fake emails or websites to trick a user into revealing login details or other personal data.</p>
<p>A firewall monitors incoming and outgoing network traffic and blocks traffic that does not meet its rules. Anti-malware software scans for and removes known threats. Regular software updates close security weaknesses, and regular backups allow data to be restored after an attack.</p>
<p><strong>Exam tip:</strong> match each threat to how it spreads, and each prevention method to the threat it stops. Do not confuse a virus with a worm.</p>
$n$
WHERE material_type = 'notes' AND topic_id = 'f0bd23ea-3593-4a9c-a1a3-9a080043db6e';

WITH tp AS (SELECT id FROM topics WHERE id IN ('95591ce6-a270-4b09-b12e-bd4ec21ca1a0','f5ce9e1c-9c8f-46d2-95bd-ac9687b6ea07','372710b0-fcac-4f55-af62-67b9bec5940c','f52cc259-2b6e-4aca-818b-56556bf68950','1bdc4fd6-0627-40d3-a8e4-bbe5827c51e0','3bad18f7-9041-4bd4-a193-e0da6c10b770','ced121cb-433c-4a2a-bc15-d33098a610eb','f0bd23ea-3593-4a9c-a1a3-9a080043db6e'))
INSERT INTO questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
SELECT (SELECT z.id FROM quizzes z WHERE z.topic_id = v.tid::uuid AND z.exam_type = 'quiz' ORDER BY z.created_at LIMIT 1), v.qt, v.opts::jsonb, v.ci, v.ex, v.so, 'exam', (SELECT ss.id FROM syllabus_statements ss WHERE ss.topic_id = v.tid::uuid AND ss.code = v.code)
FROM (VALUES
 ('95591ce6-a270-4b09-b12e-bd4ec21ca1a0', '1.1', $q1$What is the denary value of the binary number 1011?$q1$, $o1$["11","9","13","5"]$o1$, 0, $e1$1011 = 8 + 0 + 2 + 1 = 11.$e1$, 100),
 ('f5ce9e1c-9c8f-46d2-95bd-ac9687b6ea07', '2.1', $q2$Which device connects a local area network to the internet?$q2$, $o2$["A keyboard","A printer","A monitor","A router"]$o2$, 3, $e2$A router forwards packets between networks, so it links the LAN to the internet. The other devices are not network connection devices.$e2$, 100),
 ('372710b0-fcac-4f55-af62-67b9bec5940c', '10.2', $q3$An array has 8 elements, indexed from 0. What is the index of the last element?$q3$, $o3$["8","1","7","0"]$o3$, 2, $e3$With indexes from 0 to 7, the last element has index 7.$e3$, 100),
 ('f52cc259-2b6e-4aca-818b-56556bf68950', '8.2', $q4$Which term describes software that allows users to create, store and query a database?$q4$, $o4$["A compiler","A network protocol","An operating system kernel","A database management system (DBMS)"]$o4$, 3, $e4$A DBMS provides the tools to define, store, update and query data in a database.$e4$, 100),
 ('1bdc4fd6-0627-40d3-a8e4-bbe5827c51e0', '7.1', $q5$Which term describes the legal right that protects a creator's original software from being copied without permission?$q5$, $o5$["Encryption","Copyright","Phishing","Hashing"]$o5$, 1, $e5$Copyright gives the creator legal control over copying and distribution of their original work.$e5$, 100),
 ('3bad18f7-9041-4bd4-a193-e0da6c10b770', '4.1', $q6$In the fetch-decode-execute cycle, which register holds the address of the next instruction?$q6$, $o6$["Accumulator","Program counter","Memory data register","Current instruction register"]$o6$, 1, $e6$The program counter holds the address of the next instruction to be fetched.$e6$, 100),
 ('ced121cb-433c-4a2a-bc15-d33098a610eb', '12.3', $q7$A program accepts values from 1 to 100. Which test value is the best boundary (extreme) test?$q7$, $o7$["50","101","-1","100"]$o7$, 3, $e7$Boundary test data uses the edge of the valid range. 100 is the highest valid value.$e7$, 100),
 ('f0bd23ea-3593-4a9c-a1a3-9a080043db6e', '6.1', $q8$Which security measure monitors network traffic and blocks traffic that breaks its rules?$q8$, $o8$["A firewall","A backup","Data compression","Hexadecimal conversion"]$o8$, 0, $e8$A firewall filters network traffic against a set of rules and blocks what is not allowed.$e8$, 100)
) v(tid, code, qt, opts, ci, ex, so);
