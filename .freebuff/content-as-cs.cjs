// AS Computer Science (CAIE 9618) — 8 topics. Questions use 0-based `correct`.
// lesson strings carry REAL newlines (JSON.stringify with escape=false is unsafe; kept as data, seeder writes via dollar-quoting).
module.exports = [
  {
    name: "Information Representation",
    description: "Number systems, binary arithmetic, text/image/sound representation and compression.",
    lesson: `\`# Information Representation

### Number Systems and Ranges
Unsigned binary with n bits stores 0 to 2ⁿ − 1. Two's complement represents negatives: the MSB has value −2ⁿ⁻¹.

**Example:** 8-bit two's complement of −5: 11111011 (−128 + 64 + 32 + 16 + 8 + 2 + 1).

| System | Base | Digits |
|---|---|---|
| Binary | 2 | 0–1 |
| Hexadecimal | 16 | 0–9, A–F |
| BCD | — | 4 bits per decimal digit |

### Binary Arithmetic
Add: 0+0=0, 0+1=1, 1+1=0 carry 1, 1+1+1=1 carry 1. Overflow happens when a result exceeds the word size.

Subtraction uses two's complement addition (A − B = A + (−B)).

### Text
- **ASCII**: 7 bits, 128 characters, English only
- **Unicode**: universal scripts; UTF-8 is variable-width (1–4 bytes)

### Images and Sound
- Bitmap: pixels with colour depth (bits per pixel). File size = width × height × depth.
- Sound: sampling rate (Hz) × bit depth × duration × channels.
- Resolution trade-off: fidelity vs size.

### Compression
- **Lossless** (ZIP, run-length encoding): exact reconstruction — required for text/code
- **Lossy** (JPEG, MP3): discards perceptually minor data — smaller files

**Example:** RLE of AAABBBCC → 3A3B2C.

**Exam tips:** show working for two's complement conversions; state why compression type suits the data (text must be lossless).`,
    questions: [
      { q: "The largest unsigned value in 8 bits is:", opts: ["128","127","255","256"], correct: 2, explain: "2⁸ − 1 = 255." },
      { q: "−5 in 8-bit two's complement is:", opts: ["00000101","11111011","10000101","1111011"], correct: 1, explain: "Invert 00000101 → 11111010, add 1." },
      { q: "Hexadecimal 2F in decimal is:", opts: ["47","27","57","215"], correct: 0, explain: "2×16 + 15 = 47." },
      { q: "One hex digit represents exactly:", opts: ["8 bits","2 bits","16 bits","4 bits"], correct: 3, explain: "16 = 2⁴." },
      { q: "ASCII uses:", opts: ["variable width","16 bits","7 bits per character","8 bytes"], correct: 2, explain: "128 characters." },
      { q: "Text files must use:", opts: ["JPEG","lossless compression","lossy compression","no compression"], correct: 1, explain: "Every character matters." },
      { q: "A 100×100 image at 8-bit colour depth (uncompressed) is:", opts: ["80,000 bits","10,000 bits","8,000,000 bits","800 bits"], correct: 0, explain: "Pixels × depth." },
      { q: "Doubling the sampling rate of audio:", opts: ["halves quality","does nothing to size","quarters size","doubles the file size"], correct: 3, explain: "More samples per second." },
      { q: "RLE of AAABBB is:", opts: ["A3B3","AAABBB","3A3B","6AB"], correct: 2, explain: "Run length + symbol." },
      { q: "Binary addition 1011 + 0110 =", opts: ["10011","10001","1111","10101"], correct: 1, explain: "11 + 6 = 17." },
    ],
  },
  {
    name: "Communication and Networking",
    description: "Serial/parallel transmission, protocols, LANs/WANs, client-server and peer-to-peer models.",
    lesson: `\`# Communication and Networking

### Transmission
- **Serial**: one bit at a time — cheaper, reliable over distance
- **Parallel**: multiple bits simultaneously — fast but suffers skew and crosstalk over long runs
- Direction: simplex (one way), half-duplex (alternating), full-duplex (both ways)

### Packets and Protocols
Data splits into packets with header (addresses, sequence) and trailer (checksum). A **protocol** is an agreed rule set — without one, devices cannot interpret signals.

- **TCP/IP** stack: application → transport → network → link
- **HTTP/HTTPS**: web transfer; HTTPS encrypts with TLS
- **FTP**: file transfer; **SMTP/POP3/IMAP**: email

### Network Types
- **LAN**: small site, privately owned; **WAN**: large geographic scale (the internet)
- Topologies: bus, star, mesh (star is most common — central switch)

### Hardware
Routers join networks by IP; switches forward frames by MAC within a LAN; gateways translate protocols.

### Client-Server vs Peer-to-Peer
Client-server: central services, easy administration, single point of failure. P2P: every node shares files directly — cheap, hard to manage (torrents, blockchain).

**Exam tips:** explain packet switching with header/trailer details; justify protocol choice per application (email vs streaming).`,
    questions: [
      { q: "Parallel transmission fails over long distances because of:", opts: ["low speed","encryption","checksums","skew and crosstalk"], correct: 3, explain: "Bits drift out of alignment." },
      { q: "A packet trailer usually contains:", opts: ["the payload","the protocol version","a checksum","the sender address"], correct: 2, explain: "Error detection data." },
      { q: "HTTPS differs from HTTP by:", opts: ["no headers","TLS encryption","lower speed always","UDP transport"], correct: 1, explain: "Secure sockets layer." },
      { q: "Email is sent with:", opts: ["SMTP","FTP","HTTP","ARP"], correct: 0, explain: "Simple Mail Transfer Protocol." },
      { q: "A switch forwards frames using:", opts: ["IP addresses","URLs","port numbers only","MAC addresses"], correct: 3, explain: "Layer-2 device." },
      { q: "A router forwards packets using:", opts: ["domain names","checksums","IP addresses","MAC addresses"], correct: 2, explain: "Layer-3 device." },
      { q: "A star topology's weakness is:", opts: ["crosstalk","central switch failure","slow speed","no addressing"], correct: 1, explain: "Single point of failure." },
      { q: "P2P networks differ from client-server by:", opts: ["all nodes sharing equally","a dedicated server","central administration","static IPs"], correct: 0, explain: "No central server." },
      { q: "A protocol is best described as:", opts: ["a cable standard","an operating system","a topology","a set of agreed rules"], correct: 3, explain: "Communication rules." },
      { q: "Full-duplex means:", opts: ["alternating directions","encrypted only","both directions simultaneously","one direction only"], correct: 2, explain: "Like a phone call." },
    ],
  },
  {
    name: "Hardware and Logic Gates",
    description: "Logic gates, Boolean algebra, truth tables, flip-flops and the von Neumann model.",
    lesson: `\`# Hardware and Logic Gates

### Logic Gates
| A | B | AND | OR | NAND | NOR | XOR |
|---|---|---|---|---|---|---|
| 0 | 0 | 0 | 0 | 1 | 1 | 0 |
| 0 | 1 | 0 | 1 | 1 | 0 | 1 |
| 1 | 0 | 0 | 1 | 1 | 0 | 1 |
| 1 | 1 | 1 | 1 | 0 | 0 | 0 |

NOT inverts; NAND is \'AND then NOT\'; XOR outputs 1 when inputs differ.

### Boolean Algebra Laws
- De Morgan: (A·B)′ = A′ + B′; (A + B)′ = A′ · B′
- Distribution: A·(B + C) = A·B + A·C
- Absorption: A + A·B = A

**Example:** simplify A + A′B = (A + A′)(A + B) = A + B.

### Constructing Circuits
Truth table → Boolean expression → gates. A half adder: S = A XOR B, C = A AND B.

### Flip-Flops (Bistables)
- **SR latch**: set/reset, invalid state S=R=1
- **JK**: like SR but J=K=1 toggles
- Clock signals synchronise state changes

### Von Neumann Model
CPU (ALU, control unit, registers: PC, MAR, MDR, ACC) + memory + I/O, sharing one bus system; instructions fetched–decoded–executed in cycles.

**Exam tips:** write truth tables fully; simplify before drawing circuits to save gates, and name the law you use.`,
    questions: [
      { q: "XOR outputs 1 when:", opts: ["inputs differ","inputs match","both are 1","both are 0"], correct: 0, explain: "Exclusive or." },
      { q: "(A·B)′ equals:", opts: ["A′ · B′","A + B","A′ · B","A′ + B′"], correct: 3, explain: "De Morgan's law." },
      { q: "A half adder's sum output is:", opts: ["A OR B","NOT A","A XOR B","A AND B"], correct: 2, explain: "Carry is A AND B." },
      { q: "NAND followed by NAND of the same inputs gives:", opts: ["NOT","OR behaviour inverted — i.e. AND","OR","XOR"], correct: 1, explain: "NAND is functionally complete; double-NAND of A,B = AND." },
      { q: "The invalid state in an SR latch is:", opts: ["S = R = 1","S = R = 0","S = 1, R = 0","S = 0, R = 1"], correct: 0, explain: "Both outputs forced low." },
      { q: "In the von Neumann model, the PC holds:", opts: ["the current result","the fetched data","the opcode","the address of the next instruction"], correct: 3, explain: "Program counter." },
      { q: "A + A·B simplifies to:", opts: ["A·B","A′ + B′","A","B"], correct: 2, explain: "Absorption law." },
      { q: "The ALU performs:", opts: ["input","arithmetic and logic","storage","clocking"], correct: 1, explain: "Arithmetic Logic Unit." },
      { q: "A JK flip-flop with J = K = 1:", opts: ["toggles","resets","holds","is invalid"], correct: 0, explain: "Improvement over SR." },
      { q: "NOR of A=0, B=0 is:", opts: ["0","undefined","depends","1"], correct: 3, explain: "OR gives 0, inverted to 1." },
    ],
  },
  {
    name: "Processor Fundamentals",
    description: "The fetch-execute cycle, registers, interrupts, buses and the stored program concept.",
    lesson: `\`# Processor Fundamentals

### The FDE Cycle
1. **Fetch**: PC → MAR; read memory → MDR; instruction → CIR; PC increments
2. **Decode**: control unit interprets the opcode
3. **Execute**: ALU/registers act; results stored; PC may be overwritten (jumps)

### Registers
| Register | Role |
|---|---|
| PC | address of next instruction |
| MAR | address being accessed |
| MDR | data in transit |
| CIR | current instruction |
| ACC | accumulator results |

### Buses
- **Address bus**: one-way, CPU → memory (width sets addressable space)
- **Data bus**: two-way, carries instructions/data
- **Control bus**: timing and command signals

### Interrupts
Signals that pause the current program (I/O complete, timer, errors). The CPU saves context, runs the ISR, then resumes — enabling multitasking.

### Assembly and Addressing
Immediate (#5), direct (address holds value), indirect (address points to address), indexed (base + offset — arrays), relative (PC + offset — jumps).

**Example:** LDD 100 loads from 100 (direct); LDI 100 loads from the address stored at 100 (indirect).

**Exam tips:** trace register contents step by step in trace tables; explain the stored program concept — instructions as data in memory.`,
    questions: [
      { q: "The PC register holds:", opts: ["the opcode","the next instruction's address","the result","the data operand"], correct: 1, explain: "Program counter." },
      { q: "During fetch, the instruction moves:", opts: ["memory → MDR → CIR","CIR → memory","ACC → MDR","MAR → PC"], correct: 0, explain: "Via the data bus." },
      { q: "The address bus is:", opts: ["two-way","one-way to CPU","serial","one-way from CPU"], correct: 3, explain: "CPU drives addresses." },
      { q: "A wider data bus allows:", opts: ["faster clocks only","more registers","more bits per transfer","more memory addressing"], correct: 2, explain: "Throughput per cycle." },
      { q: "An interrupt causes the CPU to:", opts: ["ignore the OS","save context and run an ISR","power off","clear all registers"], correct: 1, explain: "Interrupt service routine." },
      { q: "LDI 100 (indirect) loads from:", opts: ["the address stored at 100","address 100","the value 100","PC + 100"], correct: 0, explain: "Double dereference." },
      { q: "Indexed addressing suits:", opts: ["constants","jumps","stacks","array elements"], correct: 3, explain: "Base + offset." },
      { q: "The stored program concept means:", opts: ["code is compiled to silicon","data lives in the CPU","instructions reside in memory as data","programs run from ROM only"], correct: 2, explain: "Von Neumann's key idea." },
      { q: "Decode happens in the:", opts: ["cache","control unit","ALU","MDR"], correct: 1, explain: "Interprets opcodes." },
      { q: "The accumulator:", opts: ["stores ALU results","counts instructions","points to memory","times the clock"], correct: 0, explain: "Working register." },
    ],
  },
  {
    name: "System Software and Security",
    description: "Operating system roles, translators, IDEs, linkers and malware defences.",
    lesson: `\`# System Software and Security

### Operating System Roles
- Manage memory (paging/segmentation, virtual memory to disk)
- Schedule processes (round robin, priorities)
- Handle I/O via device drivers and spooling
- Provide the UI, file systems, and security (users, permissions)

### Translators
- **Assembler**: assembly → machine code (1:1)
- **Compiler**: whole source → machine code, reports all errors, produces standalone executables
- **Interpreter**: line-by-line execution, stops at first error, needs the interpreter present

**Bytecode + VM** (e.g. Java) combines both: compile once, run anywhere the VM exists.

### Linkers and Loaders
Static linking copies library code into the executable; dynamic linking binds at runtime (smaller files, shared libraries). The loader places the program in memory, relocating addresses.

### IDEs
Editors with syntax highlighting, autocompletion, debugger (breakpoints, stepping, variable watch), and integrated compilation.

### Malware and Defences
Viruses, worms, trojans, spyware, phishing. Defences: antivirus (signature + heuristic scanning), firewalls (packet filtering by port/IP), sandboxing, user education, patches.

**Exam tips:** compare compiler vs interpreter with concrete error-handling differences; explain firewall rules using ports and addresses.`,
    questions: [
      { q: "An interpreter:", opts: ["translates to bytecode only","runs faster always","executes line by line","produces an executable"], correct: 2, explain: "Stops at the first error." },
      { q: "Virtual memory uses:", opts: ["no storage","disk as extra RAM","cache as RAM","ROM for storage"], correct: 1, explain: "Paging to disk." },
      { q: "A compiler reports errors:", opts: ["all at once after scanning","one at a time while running","never","only syntax at runtime"], correct: 0, explain: "Whole-program analysis." },
      { q: "Dynamic linking means libraries:", opts: ["are copied into the binary","cannot be shared","load before OS boot","bind at run time"], correct: 3, explain: "Shared at runtime." },
      { q: "A firewall filters traffic by:", opts: ["screen brightness","RAM usage","ports and IP addresses","file size"], correct: 2, explain: "Packet filtering." },
      { q: "A trojan horse:", opts: ["is hardware","disguises as legitimate software","self-replicates over networks","is a worm variant"], correct: 1, explain: "Deception-based malware." },
      { q: "A breakpoint lets a debugger:", opts: ["pause execution at a line","skip all errors","compile faster","delete variables"], correct: 0, explain: "Core debugging tool." },
      { q: "Spooling applies to:", opts: ["RAM allocation","CPU clocks","compilation","print jobs"], correct: 3, explain: "Queueing slow output." },
      { q: "Assembly is translated by:", opts: ["an interpreter","a linker","an assembler","a compiler"], correct: 2, explain: "One-to-one translation." },
      { q: "Phishing attacks use:", opts: ["power surges","deceptive messages to steal credentials","CPU overloading","packet sniffing only"], correct: 1, explain: "Social engineering." },
    ],
  },
  {
    name: "Data Structures",
    description: "Arrays, lists, stacks, queues, linked lists and hash tables — with Big-O efficiency.",
    lesson: `\`# Data Structures

### Arrays and Lists
Contiguous, indexed, O(1) access; fixed size. 2D arrays: element (i, j) — rows × columns.

### Stack (LIFO)
push/pop/peek at one end. Uses: call stacks, undo, expression evaluation, DFS.

**Example:** evaluating 3 4 + : push 3, push 4, pop both, push 7.

### Queue (FIFO)
enqueue at rear, dequeue at front. Uses: print queues, schedulers, BFS. A **circular queue** reuses vacated slots with head/tail pointers modulo capacity.

### Linked List
Nodes with data + pointer. Insert/delete O(1) at a known node; search O(n). Traversal follows next pointers until null.

### Hash Table
Hash function maps keys → index. Collisions resolved by chaining or open addressing. Average O(1) lookup, worst O(n).

### Complexity
| Operation | Array | Linked List | Hash |
|---|---|---|---|
| Access by index | O(1) | O(n) | — |
| Search | O(n) | O(n) | O(1) avg |
| Insert/delete | O(n) | O(1) | O(1) avg |

**Exam tips:** trace pointers carefully in linked-list diagrams; for circular queues, show head/tail movement and overflow/underflow checks.`,
    questions: [
      { q: "A stack is:", opts: ["FIFO","sorted always","random access","LIFO"], correct: 3, explain: "Last in, first out." },
      { q: "Undo functionality uses a:", opts: ["hash table","binary tree","stack","queue"], correct: 2, explain: "Most recent first." },
      { q: "A circular queue prevents:", opts: ["all errors","wasted space at the front","overflow","underflow"], correct: 1, explain: "Reuses freed slots." },
      { q: "Array access by index is:", opts: ["O(1)","O(n)","O(log n)","O(n²)"], correct: 0, explain: "Direct addressing." },
      { q: "Linked list insert at a known node is:", opts: ["O(n)","O(log n)","O(n²)","O(1)"], correct: 3, explain: "Pointer rewiring only." },
      { q: "Hash collisions are resolved by:", opts: ["doubling memory always","binary search","chaining or open addressing","sorting"], correct: 2, explain: "Two standard strategies." },
      { q: "BFS uses a:", opts: ["linked list only","queue","stack","hash table"], correct: 1, explain: "Level by level." },
      { q: "DFS uses a:", opts: ["stack (or recursion)","queue","graph","heap always"], correct: 0, explain: "Depth first." },
      { q: "A 2D array with 3 rows, 4 columns has:", opts: ["7 elements","34 elements","43 elements","12 elements"], correct: 3, explain: "3 × 4." },
      { q: "Worst-case hash lookup is:", opts: ["O(log n)","O(1) always","O(n)","O(1)"], correct: 2, explain: "All keys collide." },
    ],
  },
  {
    name: "Programming and Algorithms",
    description: "WAD vs top-down design, pseudocode, searching and sorting with Big-O comparison.",
    lesson: `\`# Programming and Algorithms

### Design Approaches
- **Top-down (stepwise refinement)**: decompose into modules — planned structure
- **Object-oriented**: classes encapsulating state + behaviour — reusability
- **WAD (write all down)**: rapid prototyping — evolves during coding

### Pseudocode Conventions
~~~
DECLARE x : INTEGER
IF x > 10 THEN ... ELSE ... ENDIF
WHILE ... ENDWHILE
FOR i ← 1 TO n ... NEXT i
FUNCTION f(a) RETURNS INTEGER
~~~

### Searching
- **Linear**: check each item, O(n), works unsorted
- **Binary**: halve a sorted list each step, O(log n)

**Example:** 1,000,000 items: binary search needs ≤ 20 comparisons.

### Sorting
| Algorithm | Best | Average | Idea |
|---|---|---|---|
| Bubble | O(n) | O(n²) | swap neighbours |
| Insertion | O(n) | O(n²) | insert into sorted prefix |
| Merge | O(n log n) | O(n log n) | divide and merge |

**Merge sort example:** [5,2,9,1] → [5,2][9,1] → [2,5][1,9] → [1,2,5,9].

### Recursion
A function calling itself with a base case. Factorial: f(0)=1, f(n)=n·f(n−1). Stack frames handle state.

**Exam tips:** state the Big-O and justify it; for traces, tabulate variable changes per iteration.`,
    questions: [
      { q: "Binary search requires:", opts: ["sorted data","unique data","linked data","numeric data only"], correct: 0, explain: "Halving depends on order." },
      { q: "Binary search on 1,000,000 items needs at most about:", opts: ["1000 comparisons","500,000 comparisons","1,000,000 comparisons","20 comparisons"], correct: 3, explain: "log₂(10⁶) ≈ 20." },
      { q: "Merge sort average complexity:", opts: ["O(n)","O(log n)","O(n log n)","O(n²)"], correct: 2, explain: "Divide and conquer." },
      { q: "Bubble sort best case (already sorted, with early exit) is:", opts: ["O(1)","O(n)","O(n²)","O(n log n)"], correct: 1, explain: "One pass, no swaps." },
      { q: "Recursion must always include:", opts: ["a base case","a loop","global variables","arrays"], correct: 0, explain: "Otherwise infinite calls." },
      { q: "WAD stands for:", opts: ["wide area data","while all done","weighted average divisor","write all down"], correct: 3, explain: "Improvisational design." },
      { q: "Linear search on n items is:", opts: ["O(1)","O(n log n)","O(n)","O(log n)"], correct: 2, explain: "May check every item." },
      { q: "Stepwise refinement produces:", opts: ["hash tables","hierarchical modules","a single monolith","bytecode"], correct: 1, explain: "Top-down decomposition." },
      { q: "Encapsulation means:", opts: ["bundling data with methods and hiding internals","fast sorting","recursive calls","memory paging"], correct: 0, explain: "OOP principle." },
      { q: "Insertion sort is efficient when:", opts: ["data is random","data is reversed","n is huge","data is nearly sorted"], correct: 3, explain: "Few shifts needed." },
    ],
  },
  {
    name: "Databases",
    description: "Relational concepts, keys, normalisation to 3NF, SQL and transactions.",
    lesson: `\`# Databases

### Relational Basics
Tables (relations) of records with fields. **Keys**:

- Primary key: unique identifier
- Foreign key: references another table's PK — creates relationships
- Candidate/secondary keys: other unique identifiers

### Normalisation
- **1NF**: atomic values, no repeating groups
- **2NF**: 1NF + no partial dependency on a composite key
- **3NF**: 2NF + no transitive dependencies (non-key → non-key)

**Example:** (StudentID, Course, CourseFee) has CourseFee depending on Course, not StudentID — move course data to its own table (3NF).

### SQL
~~~sql
SELECT name, grade FROM students
  WHERE grade >= 'A' ORDER BY name;
INSERT INTO students VALUES (...);
UPDATE students SET grade = 'B' WHERE id = 5;
DELETE FROM students WHERE id = 5;
~~~

Joins combine tables: \`FROM students s JOIN enrolments e ON s.id = e.sid\`.

### Transactions
ACID: **A**tomicity (all or nothing), **C**onsistency (rules hold), **I**solation (no interference), **D**urability (committed = permanent). Record locking prevents conflicting simultaneous edits.

**Exam tips:** justify each normal form step with the dependency removed; write SQL with correct WHERE clauses to avoid accidental full-table updates.`,
    questions: [
      { q: "A primary key must be:", opts: ["a foreign key","unique and non-null","numeric","sorted"], correct: 1, explain: "Uniquely identifies rows." },
      { q: "3NF removes:", opts: ["transitive dependencies","all repeating groups only","primary keys","indexes"], correct: 0, explain: "Non-key → non-key chains." },
      { q: "A foreign key references:", opts: ["any column","an index","a view","another table's primary key"], correct: 3, explain: "Creates the relationship." },
      { q: "1NF requires:", opts: ["no foreign keys","sorted rows","atomic values","composite keys"], correct: 2, explain: "No repeating groups." },
      { q: "ACID's I stands for:", opts: ["Iteration","Isolation","Integrity","Indexing"], correct: 1, explain: "Concurrent transactions do not interfere." },
      { q: "SELECT ... WHERE id = 5 without UPDATE would:", opts: ["just retrieve rows","delete rows","change rows","drop the table"], correct: 0, explain: "SELECT is read-only." },
      { q: "CourseFee in (StudentID, Course, CourseFee) violates:", opts: ["1NF","the PK rule","SQL syntax","3NF"], correct: 3, explain: "Depends on Course, not the full key (2NF/3NF issue)." },
      { q: "JOIN is used to:", opts: ["filter columns","create databases","combine rows from related tables","sort results"], correct: 2, explain: "Relational link in queries." },
      { q: "Record locking prevents:", opts: ["SQL injection","simultaneous conflicting edits","all reads","data loss on disk"], correct: 1, explain: "Concurrency control." },
      { q: "A DBMS view can:", opts: ["restrict which data users see","store data physically","replace backups","increase bandwidth"], correct: 0, explain: "Virtual tables for security." },
    ],
  },
  {
    name: "Ethics and AI",
    description: "Professional codes of conduct, ethics scenarios, AI characteristics and machine learning basics.",
    lesson: `\`# Ethics and AI

### Professional Bodies
**ACM/IEEE-CS** and **BCS** codes: public interest, competence, integrity, avoid harm, respect privacy. Violations cost trust and employment.

### Ethical Scenarios
- Collecting more personal data than needed (privacy)
- Releasing software with known bugs that risks safety (competence/honesty)
- Automated decisions without human review (accountability)

Laws: data protection (GDPR-style), computer misuse (unauthorised access is a crime regardless of intent).

### AI Characteristics
Systems exhibiting: planning, learning, reasoning, problem-solving, perception, knowledge representation.

### Machine Learning
- **Supervised**: learns from labelled data (spam detection)
- **Unsupervised**: finds structure in unlabelled data (clustering)
- **Reinforcement**: learns by reward signals (game agents)

Training/evaluation loop: fit on training data, test on unseen data to avoid overfitting. Neural networks adjust weights via backpropagation.

### Ethics of AI
Bias in training data → unfair outputs; opaque decisions → accountability gaps; job displacement; autonomous weapons.

**Exam tips:** structure ethics answers as: identify the principle → apply to the scenario → give consequences for stakeholders.`,
    questions: [
      { q: "A core principle of the ACM code is:", opts: ["minimise documentation","close source always","avoid harm to the public","maximise profit"], correct: 2, explain: "Public interest first." },
      { q: "Unauthorised access to a system is:", opts: ["a civil matter only","illegal regardless of intent","legal if harmless","legal if you resign after"], correct: 1, explain: "Computer misuse law." },
      { q: "Supervised learning uses:", opts: ["labelled data","unlabelled data","rewards only","no data"], correct: 0, explain: "Inputs paired with answers." },
      { q: "Clustering is an example of:", opts: ["supervised learning","reinforcement learning","compilation","unsupervised learning"], correct: 3, explain: "No labels needed." },
      { q: "Bias in AI usually comes from:", opts: ["small screens","encryption","biased training data","fast CPUs"], correct: 2, explain: "Garbage in, bias out." },
      { q: "GDPR-style laws protect:", opts: ["network speed","personal data","source code","hardware patents"], correct: 1, explain: "Privacy regulation." },
      { q: "A neural network adjusts:", opts: ["weights during training","RAM allocation","its own code","the OS scheduler"], correct: 0, explain: "Backpropagation." },
      { q: "Testing on unseen data checks:", opts: ["compilation","battery life","syntax","generalisation"], correct: 3, explain: "Detects overfitting." },
      { q: "Reinforcement learning learns from:", opts: ["clusters","documentation","reward signals","labels"], correct: 2, explain: "Trial and error." },
      { q: "Releasing software with known safety-critical bugs is:", opts: ["a hardware issue","an ethical breach (competence/honesty)","standard practice","always legal"], correct: 1, explain: "Professional codes require disclosure." },
    ],
  },
];
