// Cambridge IGCSE Computer Science 0478 (2023–2025 exams) — exam-grade lesson HTML
// for the 11 existing DB topics (exact names). Used by upgrade-notes.cjs.
module.exports = [
  {
    topic: "Data Representation",
    spec: "1 (2023–2025)",
    html: `<h2>Data Representation</h2>
<p><strong>Cambridge IGCSE 0478 (2023–2025):</strong> binary/hex, two's complement, BCD, text/image/sound encoding, file sizes, compression.</p>

<h3>1. Number systems</h3>
<ul>
<li>Binary place values 128…1; hex digits 0–9, A–F; one hex digit = one nibble (4 bits).</li>
<li>Conversions: binary ↔ decimal ↔ hex. 0101 1010 → 5A; FF = 255.</li>
<li><strong>BCD</strong>: 4 bits per decimal digit — 0029 → 0000 0000 0010 1001. Used in clocks/calculators; easier digit conversions, more bits than pure binary.</li>
</ul>

<h3>2. Two's complement (signed)</h3>
<p>MSB is negative: −128 64 32 16 8 4 2 1. −5 = 1111 1011. Range 8-bit: −128…+127.</p>
<p>Negating: invert bits, add 1. Subtraction: add the negated number — 7 − 5 = 7 + (−5) = 0000 0111 + 1111 1011 = 0000 0010.</p>

<h3>3. Text</h3>
<p>ASCII 7-bit (128 chars) → extended sets; Unicode for all scripts (UTF-8 variable width). Character sets map codes to glyphs; uppercase/lowercase codes differ by one bit.</p>

<h3>4. Images and sound</h3>
<ul>
<li>Bitmap: pixels; colour depth = bits per pixel. File size (bits) = W × H × depth. Metadata (width, height, depth) stores dimensions.</li>
<li>Sound: sample rate (Hz), resolution (bits per sample), track duration × channels. Higher rate/depth = better fidelity, larger files.</li>
</ul>

<h3>5. Compression</h3>
<ul>
<li><strong>Lossless</strong> (RLE, ZIP): exact restore — text/code must use it. RLE example: AAABBBCC → 3A3B2C; effective with runs.</li>
<li><strong>Lossy</strong> (JPEG, MP3): discards perceptually minor data — photos/music OK, text never.</li>
</ul>

<p><strong>Exam tips:</strong> show full working in conversions; for size questions write the formula first with units; state the <em>reason</em> a compression type suits the file.</p>`,
  },
  {
    topic: "Algorithms & Programming",
    spec: "7 (2023–2025)",
    html: `<h2>Algorithms &amp; Programming</h2>
<p><strong>Cambridge IGCSE 0478 (2023–2025):</strong> pseudocode, flowcharts, standard algorithms (linear/bubble), trace tables, validation &amp; verification.</p>

<h3>1. Pseudocode</h3>
<pre>OUTPUT "Enter n"
INPUT n
IF n MOD 2 = 0 THEN
  OUTPUT "even"
ELSE
  OUTPUT "odd"
ENDIF

FOR i ← 1 TO 10
  total ← total + i
NEXT i

WHILE total < 100
  total ← total + n
ENDWHILE

FUNCTION square(x : INTEGER) RETURNS INTEGER
  RETURN x * x
ENDFUNCTION</pre>
<p>Assignment ←, comparison =, MOD/DIV for remainders/quotients.</p>

<h3>2. Flowchart symbols</h3>
<p>Terminator (oval), process (rectangle), decision (diamond), input/output (parallelogram), flow lines with arrows.</p>

<h3>3. Standard algorithms</h3>
<ul>
<li>Linear search: check each item until found/end — works unsorted.</li>
<li>Bubble sort: repeated adjacent swaps; largest bubbles to the end each pass; n−1 passes max; early exit when no swaps.</li>
<li>Counting/totaling patterns; max/min with a running best value.</li>
</ul>

<h3>4. Trace tables</h3>
<p>One column per variable; log every assignment in order; watch loop counters and reassignments.</p>
<pre>x ← 1; total ← 0
WHILE x <= 4
  total ← total + x * 2
  x ← x + 1
ENDWHILE  // total = 20</pre>

<h3>5. Validation vs verification</h3>
<ul>
<li><strong>Validation</strong>: automatic checks on data — range (exam mark 0–100), length (password ≥ 8), type, format (postcode pattern), presence (field not empty), check digit (barcode).</li>
<li><strong>Verification</strong>: data matches the source — double entry, visual/proof reading.</li>
</ul>

<h3>6. Testing</h3>
<p>Normal (typical), abnormal (rejects invalid), boundary (extremes just inside/outside). Test data tables list input → expected output.</p>

<p><strong>Exam tips:</strong> write pseudocode with ENDIF/NEXT/ENDWHILE terminators; in trace tables record the condition result too; boundary choices need "just above/below/at" values.</p>`,
  },
  {
    topic: "Hardware & Architecture",
    spec: "3 (2023–2025)",
    html: `<h2>Hardware &amp; Architecture</h2>
<p><strong>Cambridge IGCSE 0478 (2023–2025):</strong> von Neumann model, FDE cycle, registers, buses, RAM/ROM, secondary storage, embedded systems.</p>

<h3>1. Von Neumann model</h3>
<p>CPU (ALU, control unit, registers) + memory + I/O on shared buses; instructions stored as data (stored program concept).</p>

<h3>2. Registers</h3>
<table border="1" cellpadding="6"><tr><th>Register</th><th>Role</th></tr>
<tr><td>PC</td><td>address of next instruction</td></tr>
<tr><td>MAR</td><td>address being read/written</td></tr>
<tr><td>MDR</td><td>data/instruction in transit</td></tr>
<tr><td>ACC</td><td>ALU results accumulator</td></tr></table>

<h3>3. FDE cycle</h3>
<p>Fetch: PC → MAR; memory → MDR → CIR; PC + 1. Decode: control unit interprets opcode. Execute: ALU/registers act. Interrupts can pause between cycles.</p>

<h3>4. Buses and performance</h3>
<p>Address bus (one-way, width ⇒ addressable memory), data bus (two-way, width ⇒ bits per transfer), control bus. Performance factors: clock speed, cache size, core count — explain the effect, not just the name.</p>

<h3>5. RAM vs ROM</h3>
<p>RAM: volatile, read/write, holds running programs + data. ROM: non-volatile, read-only, bootstrap/firmware. Embedded systems: dedicated microprocessors inside devices (washing machines, engines) — one function, low cost, hard to update.</p>

<h3>6. Secondary storage</h3>
<ul>
<li><strong>Magnetic (HDD)</strong>: platters, read/write heads; high capacity, cheap per GB, moving parts (shock-sensitive).</li>
<li><strong>Optical (CD/DVD/Blu-ray)</strong>: laser pits/lands; cheap, portable, slow, small capacity.</li>
<li><strong>Solid state (SSD/flash)</strong>: NAND cells; fast, silent, robust, no moving parts, more expensive per GB, finite write cycles.</li>
</ul>
<p>Choose by use case: video editing (SSD), archive (optical/magnetic), tablets (flash).</p>

<p><strong>Exam tips:</strong> trace FDE with register values; compare storage on capacity, speed, cost, durability, portability; always tie a performance factor to its <em>effect</em>.</p>`,
  },
  {
    topic: "Networking & Communication",
    spec: "2 (2023–2025)",
    html: `<h2>Networking &amp; Communication</h2>
<p><strong>Cambridge IGCSE 0478 (2023–2025):</strong> transmission modes, serial/parallel, packet switching, protocols, LAN/WAN, hardware, security layers.</p>

<h3>1. Transmission basics</h3>
<ul>
<li>Serial: one bit at a time — reliable over distance, cheaper cable.</li>
<li>Parallel: several bits at once — faster over short runs; skew/crosstalk limit distance.</li>
<li>Simplex / half-duplex / full-duplex direction; bandwidth (bits/s) vs bit rate.</li>
</ul>

<h3>2. Packets</h3>
<p>Header (sender/receiver addresses, sequence number) + payload + trailer (checksum). Packet switching: routes vary, packets reassembled at destination; checksum failure → re-request. Benefits: robustness, shared lines; delays/reassembly overhead.</p>

<h3>3. Protocols</h3>
<p>TCP/IP stack layers (application, transport, network, link). HTTP/HTTPS (TLS encryption), FTP (with login + commands), email: SMTP send, POP3/IMAP retrieve. Bluetooth/Wi-Fi for WPAN/WLAN.</p>

<h3>4. Network types &amp; hardware</h3>
<p>LAN (site) vs WAN (internet). Router (joins networks, IP), switch (MAC frames within LAN), gateway (protocol translation), NIC, WAP. MAC address (burned-in, layer 2) vs IP address (assigned, layer 3).</p>

<h3>5. Security in transmission</h3>
<p>Encryption scrambles plaintext → ciphertext (key needed); HTTPS = HTTP over TLS; firewall packet filtering by port/IP; authentication (user+pass, 2FA); access levels.</p>

<p><strong>Exam tips:</strong> explain <em>why</em> skew limits parallel over distance; compare MAC vs IP in a table; protocol questions want "rules for communication", not acronyms alone.</p>`,
  },
  {
    topic: "Operating Systems",
    spec: "4 (2023–2025)",
    html: `<h2>Operating Systems</h2>
<p><strong>Cambridge IGCSE 0478 (2023–2025):</strong> OS roles, memory/process management, hardware–software layer, interrupts, buffers, utility software.</p>

<h3>1. What an OS does</h3>
<p>Manages memory, processes/files, I/O via drivers, security (users, permissions), and provides the UI (CLI/GUI) between user, applications and hardware.</p>

<h3>2. Memory and process management</h3>
<ul>
<li>Paging/segmentation move programs in/out; virtual memory extends RAM to disk when RAM is full.</li>
<li>Multitasking: scheduler gives each process time slices; context switching saves/restores state.</li>
</ul>

<h3>3. Interrupts and buffers</h3>
<p>Interrupts signal events (I/O complete, timer); CPU saves context, services via ISR, resumes. Buffers hold data in transit (printing) so slow devices don't block the CPU; spooling queues jobs.</p>

<h3>4. Utility software</h3>
<p>Disk formatter, defragmenter (reduces head movement on HDDs; unnecessary for SSD), backup scheduler, compression, antivirus, file compression.</p>

<h3>5. UI and drivers</h3>
<p>CLI: precise, scriptable, low overhead. GUI: icons/windows, discoverable, more resources. Device drivers translate OS calls to hardware specifics — each device needs its own.</p>

<p><strong>Exam tips:</strong> "manage" verbs earn marks: manages memory, manages processes, manages peripherals; explain virtual memory by RAM-full scenario, not definition alone.</p>`,
  },
  {
    topic: "Database Systems",
    spec: "8 (2023–2025)",
    html: `<h2>Database Systems</h2>
<p><strong>Cambridge IGCSE 0478 (2023–2025):</strong> limitations of file-based systems; relational concepts; SQL (SELECT, FROM, WHERE, ORDER BY, GROUP BY, INNER JOIN, SUM, COUNT); DBMS features.</p>

<h3>1. File-based problems</h3>
<p>Data repetition (wasted space, inconsistency), fixed queries, no concurrent access control — solved by a DBMS with shared, structured tables.</p>

<h3>2. Relational concepts</h3>
<ul>
<li>Table, record, field; primary key (unique); secondary key (indexed search field); foreign key links tables.</li>
<li>One-to-many relationships via foreign keys; no repeating groups (1NF mindset).</li>
</ul>

<h3>3. SQL</h3>
<pre>SELECT Title, Year FROM Films
WHERE Genre = 'Sci-Fi' AND Year > 2015
ORDER BY Year DESC;

SELECT Genre, COUNT(*) AS NumFilms, SUM(Rating) AS TotalRating
FROM Films
GROUP BY Genre;

SELECT s.Name, f.Title
FROM Students s INNER JOIN Loans l ON s.StudentID = l.StudentID
INNER JOIN Films f ON l.FilmID = f.FilmID;</pre>
<p>WHERE filters rows; GROUP BY aggregates; JOIN combines on matching keys.</p>

<h3>4. DBMS features</h3>
<p>Data dictionary (schema, types, constraints), query processor, forms/reports, access rights (read/write per user), data integrity (validation rules), backup/recovery.</p>

<p><strong>Exam tips:</strong> write SQL keywords uppercase; alias joined tables (s, l, f); when asked "why relational", cite reduced redundancy + flexible queries.</p>`,
  },
  {
    topic: "Programming Concepts",
    spec: "7.1–7.4 (2023–2025)",
    html: `<h2>Programming Concepts</h2>
<p><strong>Cambridge IGCSE 0478 (2023–2025):</strong> variables/constants, data types, selection/iteration, arrays, file handling, subroutines, scope, IDE tools.</p>

<h3>1. Basics</h3>
<p>Constants vs variables; types: INTEGER, REAL, CHAR, STRING, BOOLEAN, DATE; casting between them. Declaration with meaningful names.</p>

<h3>2. Selection and iteration</h3>
<pre>IF score >= 50 THEN
  grade ← "pass"
ELSE
  grade ← "fail"
ENDIF

CASE OF grade
  "A" : OUTPUT "excellent"
  OTHERWISE : OUTPUT "keep going"
ENDCASE

REPEAT
  INPUT pin
UNTIL pin = storedPin

FOR i ← 1 TO 10 STEP 2 ... NEXT i</pre>
<p>WHILE: condition first (may not run); REPEAT: runs at least once.</p>

<h3>3. Arrays</h3>
<p>Fixed size, indexed (0- or 1-based per spec); 2D arrays: row, column. Bounds errors when index leaves range. Traversal with FOR loops.</p>

<h3>4. Files</h3>
<pre>OPENFILE "data.txt" FOR READ
READFILE "data.txt", line
CLOSEFILE "data.txt"

OPENFILE "log.txt" FOR APPEND
WRITEFILE "log.txt", record</pre>
<p>Modes: READ, WRITE (overwrites), APPEND (adds).</p>

<h3>5. Subroutines</h3>
<p>Procedure (no return) vs function (returns value). Parameters by value (copy) vs reference (original). Local scope inside; global shared — declare deliberately, avoid overuse.</p>

<h3>6. IDE tools</h3>
<p>Syntax highlighting, autocompletion, breakpoints, single stepping, variable watch — name the tool <em>and</em> its debugging benefit.</p>

<p><strong>Exam tips:</strong> use the exam pseudocode style exactly; for 2D arrays, loop rows outer/columns inner; choose WHILE vs REPEAT by "must it run once?"</p>`,
  },
  {
    topic: "Ethics, Security & Impact",
    spec: "5 (2023–2025)",
    html: `<h2>Ethics, Security &amp; Impact</h2>
<p><strong>Cambridge IGCSE 0478 (2023–2025):</strong> ethics &amp; professional codes, security threats, malware, online safety, environmental/employment impact.</p>

<h3>1. Ethics and codes</h3>
<p>ACM/IEEE-CS/BCS codes: public interest, competence, integrity, privacy. Applying: identify the principle → apply to scenario → stakeholders affected → consequences.</p>

<h3>2. Threats</h3>
<ul>
<li><strong>Malware</strong>: virus (attaches, replicates via host), worm (self-spreads), trojan (disguised), spyware, ransomware.</li>
<li><strong>Social</strong>: phishing (fake emails/sites), pharming (DNS/hosts redirect), shoulder surfing, brute force.</li>
<li><strong>Technical</strong>: interception (packet sniffing), SQL injection (malicious input into queries), DoS (flooding services).</li>
</ul>

<h3>3. Defences</h3>
<p>Antivirus/antispyware (scan, quarantine), firewalls (port/IP filtering), 2FA + biometrics, strong passwords + managers, encryption (HTTPS, VPN), access levels, patches/updates, user training.</p>

<h3>4. Online behaviour</h3>
<p>Digital footprint, cyberbullying, fake news, privacy settings, verification of sources.</p>

<h3>5. Wider impact</h3>
<p>Employment: automation displaces roles but creates IT jobs. Environment: e-waste, energy use vs paperless efficiency. Monitoring: workplace tracking, CCTV — balance with privacy laws (GDPR-style).</p>

<p><strong>Exam tips:</strong> name the threat precisely (pharming ≠ phishing), then the <em>matched</em> defence; ethics answers need principle + application, not opinion.</p>`,
  },
  {
    topic: "Logic Gates & Boolean Logic",
    spec: "3.4? logic (2023–2025)",
    html: `<h2>Logic Gates &amp; Boolean Logic</h2>
<p><strong>Cambridge IGCSE 0478 (2023–2025):</strong> six gates, truth tables, building/describing circuits, problem-to-logic mapping.</p>

<h3>1. The six gates</h3>
<table border="1" cellpadding="6"><tr><th>A</th><th>B</th><th>AND</th><th>OR</th><th>NAND</th><th>NOR</th><th>XOR</th></tr>
<tr><td>0</td><td>0</td><td>0</td><td>0</td><td>1</td><td>1</td><td>0</td></tr>
<tr><td>0</td><td>1</td><td>0</td><td>1</td><td>1</td><td>0</td><td>1</td></tr>
<tr><td>1</td><td>0</td><td>0</td><td>1</td><td>1</td><td>0</td><td>1</td></tr>
<tr><td>1</td><td>1</td><td>1</td><td>1</td><td>0</td><td>0</td><td>0</td></tr></table>
<p>NOT inverts. NAND = AND + invert; NOR = OR + invert; XOR = 1 when inputs differ.</p>

<h3>2. Truth tables</h3>
<p>2 inputs → 4 rows; 3 inputs → 8 rows. Work gate by gate, adding intermediate columns for sub-circuit outputs.</p>

<h3>3. Problem → logic</h3>
<p>Define inputs/outputs first. Alarm rings (X=1) if sensor P triggered AND (door D OR window W): X = P AND (D OR W). Then draw the circuit: OR first, then AND.</p>

<h3>4. Describing circuits</h3>
<p>Write the expression from a diagram gate by gate; annotate output of each gate (X, Y) before combining.</p>

<p><strong>Exam tips:</strong> check your truth table row count before writing; in problem questions, state "input P = 1 means sensor triggered" — definitions earn marks.</p>`,
  },
  {
    topic: "Web Technologies",
    spec: "6 (2023–2025)",
    html: `<h2>Web Technologies</h2>
<p><strong>Cambridge IGCSE 0478 (2023–2025):</strong> HTML structure/tags, CSS styling, JS interactivity, the DOM, microprocessors/controllers in web context.</p>

<h3>1. HTML</h3>
<pre>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;&lt;title&gt;Page&lt;/title&gt;&lt;/head&gt;
&lt;body&gt;
  &lt;h1&gt;Heading&lt;/h1&gt;
  &lt;p&gt;Paragraph with &lt;strong&gt;bold&lt;/strong&gt; text&lt;/p&gt;
  &lt;img src="pic.jpg" alt="description"&gt;
  &lt;a href="https://example.com"&gt;Link&lt;/a&gt;
  &lt;table&gt;&lt;tr&gt;&lt;td&gt;cell&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>
<p>Head holds metadata/title; body holds visible content; hypertext links via &lt;a href&gt;.</p>

<h3>2. CSS</h3>
<pre>p { color: red; font-size: 14px; }
.highlight { background-color: yellow; }
#header { text-align: center; }</pre>
<p>Element, class (.) and id (#) selectors; inline vs external stylesheets; separation of content (HTML) from presentation (CSS).</p>

<h3>3. JavaScript and the DOM</h3>
<pre>document.getElementById("demo").innerHTML = "Hello";
document.getElementsByClassName("item")[0].style.color = "blue";</pre>
<p>DOM = the browser's object model of the page; JS reads/changes it for interactivity (validation, sliders, dynamic text). Events (click, submit) trigger functions.</p>

<h3>4. How pages load</h3>
<p>URL → DNS lookup → server request → HTML parsed → assets fetched → DOM built → render. Layers: structure (HTML) → presentation (CSS) → behaviour (JS).</p>

<p><strong>Exam tips:</strong> write tags with correct closing pairs; explain DOM operations as "find element by id … then change property"; separate structure/presentation/behaviour in answers.</p>`,
  },
  {
    topic: "Robotics & AI",
    spec: "5.4? AI/simulation context (2023–2025) — cross-check",
    html: `<h2>Robotics &amp; AI</h2>
<p><strong>Cambridge IGCSE 0478 (2023–2025):</strong> AI characteristics, machine learning basics, robotics/simulation contexts, automated systems.</p>

<h3>1. AI characteristics</h3>
<p>Systems exhibiting: planning, learning, reasoning, problem-solving, perception, knowledge representation. Narrow (task-specific) vs general AI distinction for discussion answers.</p>

<h3>2. Machine learning</h3>
<p>Supervised (labelled data — spam filters), unsupervised (clusters — segmentation), reinforcement (rewards — game agents). Training/evaluation loop: train on a set, test on unseen data; overfitting = memorising rather than generalising.</p>

<h3>3. Robotics</h3>
<p>Components: sensors (input), processors (decision), actuators/motors (output), power. Examples: manufacturing arms, delivery drones, autonomous vehicles (LIDAR + vision). Benefits: precision, 24/7 operation, dangerous jobs; concerns: job displacement, safety, cost.</p>

<h3>4. Automated systems &amp; simulation</h3>
<p>Sensors → processor → actuators loops (greenhouses, traffic lights, self-checkouts). Simulation models real systems cheaply and safely (flight training, weather, crash tests) — limitations: model quality, missing variables.</p>

<h3>5. Ethics of AI</h3>
<p>Bias from unrepresentative training data; opacity of decisions; accountability for errors; privacy of training data; effect on employment.</p>

<p><strong>Exam tips:</strong> for "describe how AI could be used in X" — tie each AI characteristic to a concrete step in the scenario; for evaluations, give both sides then a justified conclusion.</p>`,
  },
];
