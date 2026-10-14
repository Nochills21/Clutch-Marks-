UPDATE study_materials SET content = content || $n$
<h3>Binary addition and overflow</h3>
<p>Binary addition follows the same carry rule as denary, except that 1 + 1 = 10 (0 carry 1). For example, 0110 + 0111 = 1101. A register or storage location has a fixed number of bits, so a result that needs more bits than are available overflows and gives a wrong answer. Programmers and examiners look for an overflow error when the carry out of the leftmost bit is set.</p>
<p><strong>Exam tip:</strong> state the number of bits used. Overflow depends on that width, not on the value of the numbers alone.</p>
$n$
WHERE material_type = 'notes' AND topic_id IN (SELECT id FROM topics WHERE slug = 'data-representation');

UPDATE study_materials SET content = content || $n$
<h3>Primary keys, foreign keys and relationships</h3>
<p>A primary key uniquely identifies each record in a table, so no two records can share its value. A foreign key is a field in one table that holds the primary key of a related table, and it creates a relationship between the tables. Relationships can be one-to-one, one-to-many or many-to-many. A many-to-many relationship is usually split into two one-to-many relationships through a linking table.</p>
<p>Foreign keys stop a record being added that points to a row which does not exist, which keeps the data consistent. Storing each fact once in the correct table also reduces redundancy, so an update is made in one place only.</p>
<p><strong>Exam tip:</strong> when designing a table, name the primary key and say which field links it to another table.</p>
$n$
WHERE material_type = 'notes' AND topic_id IN (SELECT id FROM topics WHERE slug = 'database-systems');

UPDATE study_materials SET content = content || $n$
<h3>Interrupts and scheduling</h3>
<p>An interrupt is a signal that tells the processor to stop its current task and deal with an event, such as a key press, a timer ending or an error. The processor saves the state of the current task, runs the interrupt service routine, and then resumes the task it was doing. Interrupts let the processor respond to devices without checking them constantly.</p>
<p>The operating system manages several programs at once through scheduling. Each program receives processor time in turn, which gives the impression that they run at the same time. Memory management keeps each program's data separate, and the operating system provides a user interface and manages files and devices.</p>
<p><strong>Exam tip:</strong> describe the steps of an interrupt in order: save state, run the routine, restore state.</p>
$n$
WHERE material_type = 'notes' AND topic_id IN (SELECT id FROM topics WHERE slug = 'operating-systems');

UPDATE study_materials SET content = content || $n$
<h3>Selection and iteration in practice</h3>
<p>Selection uses IF and CASE structures to choose between paths, and a branch runs only when its condition is true. Iteration repeats a block of code. A count-controlled loop, such as FOR, runs a known number of times. A condition-controlled loop, such as WHILE or REPEAT, runs until a condition changes. A WHILE loop may run zero times, but a REPEAT loop always runs at least once.</p>
<p>A well-written program uses meaningful identifiers, indents its code to show structure, and includes comments that explain why a piece of code exists. Subroutines split a large problem into smaller tasks that can be tested separately.</p>
<p><strong>Exam tip:</strong> choose the loop type from whether the number of repetitions is known in advance.</p>
$n$
WHERE material_type = 'notes' AND topic_id IN (SELECT id FROM topics WHERE slug = 'programming-concepts');

UPDATE study_materials SET content = content || $n$
<h3>Algorithm design in practice</h3>
<p>A good algorithm is correct, efficient and easy to follow. Designers begin by breaking the problem into smaller parts, a method called decomposition. Each part is then written as a step, and the steps are tested with sample data, including data at the limits of the input range.</p>
<p>Pseudocode is a way of writing an algorithm in plain structured English before it is coded in a specific language. It makes the logic clear, so it can be checked and changed without worrying about syntax. Flowcharts show the same logic with symbols for input, process, decision and output.</p>
<p><strong>Exam tip:</strong> trace the algorithm step by step with a table of values to show that it produces the expected output.</p>
$n$
WHERE material_type = 'notes' AND topic_id IN (SELECT id FROM topics WHERE slug = 'algorithms-programming');

UPDATE study_materials SET content = content || $n$
<h3>Sensors, actuators and feedback</h3>
<p>A sensor converts a physical quantity, such as light, temperature or pressure, into an electrical signal. An actuator does the opposite: it converts an electrical signal into physical movement, for example by turning a motor. A robot or automated system uses sensors to read its environment, a processor to decide what to do, and actuators to act.</p>
<p>A feedback loop compares the measured value with the required value and adjusts the output to close the gap. A thermostat is a simple example: it switches the heater off when the room reaches the set temperature. Feedback allows a system to correct itself, but a poorly set loop can overshoot or oscillate.</p>
<p><strong>Exam tip:</strong> name a sensor and an actuator in any automated system you describe, and explain what the feedback corrects.</p>
$n$
WHERE material_type = 'notes' AND topic_id IN (SELECT id FROM topics WHERE slug = 'robotics-ai');

UPDATE study_materials SET content = content || $n$
<h3>HTML, CSS and the client-server model</h3>
<p>HTML defines the structure and content of a web page using tags, such as headings and paragraphs. CSS controls how that content looks, including colour, layout and font size. Keeping structure and style separate means one stylesheet can change the appearance of many pages.</p>
<p>In the client-server model, a client such as a browser sends a request, and a server returns the requested resources. When a web page is requested, the browser uses the domain name to look up the server's IP address through the Domain Name System (DNS), then sends the request over HTTP or HTTPS.</p>
<p><strong>Exam tip:</strong> describe a web request as a sequence: DNS lookup, request, server response, rendering in the browser.</p>
$n$
WHERE material_type = 'notes' AND topic_id IN (SELECT id FROM topics WHERE slug = 'web-technologies');

UPDATE study_materials SET content = content || $n$
<h3>Packet switching and protocols</h3>
<p>In packet switching, a message is divided into packets. Each packet carries a header with its source and destination addresses and a sequence number, so it can travel by any available route. The packets are reassembled in the correct order at the destination. Packet switching makes efficient use of the network, because no dedicated connection is held open for the whole transmission.</p>
<p>A protocol is an agreed set of rules that devices follow to communicate. TCP/IP is the set of protocols used on the internet. TCP splits data into packets and checks that they arrive, while IP handles addressing and routing between networks.</p>
<p><strong>Exam tip:</strong> explain a protocol as a set of rules, and give one example of what it governs, such as addressing or error checking.</p>
$n$
WHERE material_type = 'notes' AND topic_id IN (SELECT id FROM topics WHERE slug = 'networking-communication');

INSERT INTO questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
SELECT (SELECT z.id FROM quizzes z WHERE z.topic_id = t.id AND z.exam_type = 'quiz' ORDER BY z.created_at LIMIT 1), v.qt, v.opts::jsonb, v.ci, v.ex, v.so, 'exam', (SELECT ss.id FROM syllabus_statements ss WHERE ss.topic_id = t.id AND ss.code = v.code)
FROM (VALUES
 ('ethics-security-impact', '5.3', $q1$Which measure best protects a computer system against a hacker entering through an unsecured network connection?$q1$, $o1$["Deleting old files","A firewall","Using a larger monitor","Defragmenting the hard drive"]$o1$, 1, $e1$A firewall monitors and blocks unauthorised network traffic. The other options do not protect against network intrusion.$e1$, 200),
 ('operating-systems', '4.1', $q2$What is the purpose of an interrupt?$q2$, $o2$["To stop the processor completely","To delete data from memory","To signal the processor to deal with an event","To increase the clock speed"]$o2$, 2, $e2$An interrupt is a signal that makes the processor pause its current task and deal with an event such as a key press.$e2$, 201),
 ('operating-systems', '4.1', $q3$Which task is the operating system responsible for?$q3$, $o3$["Writing application source code","Designing the hardware circuits","Managing memory and scheduling programs","Compiling every program before it runs"]$o3$, 2, $e3$The operating system manages memory, processor time, files and devices. It does not write application code or design hardware.$e3$, 202),
 ('operating-systems', '4.1', $q4$Which type of software manages the computer's hardware and provides a base for other programs to run?$q4$, $o4$["Application software","Utility software","An operating system","A translator"]$o4$, 2, $e4$The operating system is system software that controls the hardware and supports application software.$e4$, 203)
) v(slug, code, qt, opts, ci, ex, so)
JOIN topics t ON t.slug = v.slug;
