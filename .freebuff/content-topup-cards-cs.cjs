// Top-up module: Computer Science — flashcard top-ups (5 fresh cards per topic).
// Covers OL (11), AS (8) and A2 (8) topics currently holding 10 cards each.
module.exports = {
  groups: [
  {
    subject: "computer-science",
    level: "OL",
    topics: [
    { slug: "data-representation", cards: [
      ["Bit", "A single binary digit, 0 or 1."],
      ["Byte", "Eight bits; can represent 256 different values (0-255)."],
      ["Binary addition", "1 + 1 = 10 (carry 1); work column by column from the right."],
      ["Overflow", "Result too large for the available bits; e.g. adding two 8-bit numbers over 255."],
      ["Sound sampling", "Recording amplitude at fixed intervals; sample rate and bit depth set quality and file size."],
    ]},
    { slug: "algorithms-programming", cards: [
      ["Algorithm", "A precise, ordered set of steps solving a problem."],
      ["Pseudocode", "Language-independent description of an algorithm using structured English."],
      ["Dry run", "Tracing an algorithm by hand with test values to check logic."],
      ["Trace table", "Table recording variable values step by step during a dry run."],
      ["Flow line", "Arrow in a flowchart showing the direction of the algorithm's flow."],
    ]},
    { slug: "hardware-architecture", cards: [
      ["CPU", "Fetches, decodes and executes instructions; made of ALU, control unit and registers."],
      ["ALU", "Arithmetic and logic unit: performs calculations and comparisons."],
      ["Fetch-decode-execute", "The instruction cycle the CPU repeats constantly."],
      ["RAM", "Volatile main memory holding programs and data currently in use."],
      ["Embedded system", "Dedicated computer inside a device (washing machine, car ABS)."],
    ]},
    { slug: "networking-communication", cards: [
      ["LAN vs WAN", "LAN covers a small area (one building); WAN spans cities or countries."],
      ["IP address", "Unique numeric identifier assigned to each device on a network."],
      ["MAC address", "Hardware identifier burned into the network interface card."],
      ["Packet switching", "Data split into packets that take independent routes and are reassembled."],
      ["DNS", "Domain Name System translates human-readable names into IP addresses."],
    ]},
    { slug: "operating-systems", cards: [
      ["OS roles", "Memory management, processor scheduling, peripheral control, user interface."],
      ["Multitasking", "Running several programs at once by rapidly switching CPU time slices."],
      ["Interrupt", "Signal from hardware or software demanding immediate CPU attention."],
      ["Device driver", "Software letting the OS communicate with a specific peripheral."],
      ["Utility software", "Tools for maintenance: backup, defragmentation, antivirus."],
    ]},
    { slug: "database-systems", cards: [
      ["Database", "Organised collection of structured data designed for easy access and updating."],
      ["Primary key", "Field that uniquely identifies each record in a table."],
      ["Foreign key", "Field linking a record to a primary key in another table."],
      ["Query", "A search request that extracts records matching given criteria."],
      ["Report", "Formatted presentation of query results, often for printing."],
    ]},
    { slug: "programming-concepts", cards: [
      ["Variable", "Named memory location whose value can change during execution."],
      ["Constant", "Named value fixed for the whole program run."],
      ["Selection", "Choosing between code paths using conditions (if/elif/else)."],
      ["Iteration", "Repeating code: count-controlled (for) or condition-controlled (while)."],
      ["Modular programming", "Splitting programs into named procedures/functions for reuse and clarity."],
    ]},
    { slug: "ethics-security-impact", cards: [
      ["Privacy", "Right to control personal data; legislation (e.g. GDPR) enforces it."],
      ["Phishing", "Fraudulent messages tricking users into revealing credentials."],
      ["Encryption", "Scrambling data so only holders of the key can read it."],
      ["Digital divide", "Gap between those with and without access to modern technology."],
      ["E-waste", "Discarded electronics; recycling reduces environmental harm."],
    ]},
    { slug: "logic-gates-boolean-logic", cards: [
      ["AND gate", "Output 1 only when both inputs are 1."],
      ["OR gate", "Output 1 when at least one input is 1."],
      ["NOT gate", "Inverts the input (1 becomes 0 and vice versa)."],
      ["NAND", "NOT-AND: output 0 only when both inputs are 1; universal gate."],
      ["Truth table", "Table listing every input combination and the resulting output."],
    ]},
    { slug: "web-technologies", cards: [
      ["HTML", "HyperText Markup Language structures web page content."],
      ["CSS", "Cascading Style Sheets control presentation and layout."],
      ["HTTP vs HTTPS", "HTTPS encrypts the HTTP traffic using TLS."],
      ["URL", "Uniform Resource Locator: the address of a resource on the web."],
      ["Client-side vs server-side", "Client-side runs in the browser; server-side runs on the web server."],
    ]},
    { slug: "robotics-ai", cards: [
      ["Robot", "Programmable machine able to carry out physical tasks automatically."],
      ["Sensor", "Device measuring physical quantities (light, temperature, distance) for feedback."],
      ["Actuator", "Component producing motion (motors, servos, pistons)."],
      ["Artificial intelligence", "Systems performing tasks that normally need human intelligence."],
      ["Machine learning", "Systems improving their performance by learning from data."],
    ]},
    ]
  },
  {
    subject: "computer-science",
    level: "AS",
    topics: [
    { slug: "information-representation", cards: [
      ["Character encoding", "Mapping binary codes to characters (ASCII 7-bit, Unicode 16/32-bit)."],
      ["Bitmap image", "Grid of pixels; file size = width x height x colour depth."],
      ["Vector image", "Defined by coordinates and shapes; scales without loss of quality."],
      ["Metadata", "Data about data: file size, format, author, resolution."],
      ["Compression", "Lossless keeps every bit; lossy discards detail for smaller files."],
    ]},
    { slug: "communication-and-networking", cards: [
      ["Protocol", "Agreed rules governing data transmission (TCP/IP, HTTP)."],
      ["Bandwidth", "Maximum data transfer rate of a channel, in bits per second."],
      ["Latency", "Delay between sending and receiving data."],
      ["Circuit switching", "Dedicated path reserved for a call (traditional telephony)."],
      ["Firewall", "Filter controlling incoming and outgoing network traffic by rules."],
    ]},
    { slug: "processor-fundamentals", cards: [
      ["Von Neumann architecture", "Program and data stored in the same memory; CPU fetches instructions from it."],
      ["Register", "Small, very fast CPU storage (ACC, PC, MAR, MDR, CIR)."],
      ["Clock speed", "Rate the CPU executes cycles, in GHz; higher = faster per cycle."],
      ["Cache", "Small fast memory between CPU and RAM holding recent instructions/data."],
      ["Bus", "Data, address and control lines connecting CPU, memory and peripherals."],
    ]},
    { slug: "system-software-and-security", cards: [
      ["Compiler vs interpreter", "Compiler translates the whole program first; interpreter translates line by line."],
      ["Linker", "Combines compiled object files into a single executable."],
      ["Access control", "Usernames, passwords and permissions restricting system use."],
      ["Malware collective term", "Viruses, worms, trojans, spyware, ransomware."],
      ["Backup strategy", "Full and incremental copies stored off-site against data loss."],
    ]},
    { slug: "data-structures", cards: [
      ["Array", "Fixed-size indexed collection of elements of one type."],
      ["Stack", "LIFO structure: push and pop from the same end."],
      ["Queue", "FIFO structure: enqueue at the back, dequeue at the front."],
      ["Linked list", "Nodes with data and a pointer to the next node; dynamic size."],
      ["Record", "Collection of related fields of different types (a struct)."],
    ]},
    { slug: "programming-and-algorithms", cards: [
      ["Bubble sort", "Repeatedly swaps adjacent out-of-order pairs until sorted."],
      ["Binary search", "Halves a sorted list each step; O(log n)."],
      ["Linear search", "Checks each item in turn; works on unsorted data."],
      ["Merge sort", "Divide and conquer: split, sort halves, merge; O(n log n)."],
      ["Big-O", "Describes how an algorithm's cost grows with input size."],
    ]},
    { slug: "databases", cards: [
      ["Flat file vs relational", "Flat file: single table with redundancy; relational: related tables without it."],
      ["Normalization", "Organising tables to remove duplication and anomalies."],
      ["SQL", "Structured Query Language: SELECT, INSERT, UPDATE, DELETE."],
      ["Referential integrity", "Foreign keys must match existing primary keys (or be null)."],
      ["Index", "Structure speeding up searches on a field at the cost of space."],
    ]},
    { slug: "ethics-and-ai", cards: [
      ["Algorithmic bias", "Prejudiced outputs reflecting skewed training data."],
      ["Transparency", "Users should be able to understand how automated decisions are made."],
      ["Autonomous weapons", "Lethal systems selecting targets without human control — major ethical concern."],
      ["Job displacement", "Automation replacing roles; reskilling mitigates the impact."],
      ["Deepfake", "AI-synthesised media that convincingly depicts real people."],
    ]},
    ]
  },
  {
    subject: "computer-science",
    level: "A2",
    topics: [
    { slug: "data-types-and-file-organisation", cards: [
      ["Data type", "Defines the values a variable can hold and the operations allowed."],
      ["Static vs dynamic structures", "Static: fixed size at creation. Dynamic: grow/shrink in memory."],
      ["File organisation", "Serial, sequential or direct access, chosen for the access pattern."],
      ["Fixed-length vs variable-length records", "Fixed: same fields/length every record. Variable: optional/repeating fields."],
      ["Hashing", "Key mapped directly to an address for near-instant retrieval."],
    ]},
    { slug: "abstract-data-types", cards: [
      ["Abstract data type", "Data structure defined by its operations, not its implementation."],
      ["Encapsulation", "Hiding internal representation behind a clean interface."],
      ["Push/pop", "Stack operations adding and removing the top element."],
      ["Enqueue/dequeue", "Queue operations adding to the back and removing from the front."],
      ["Priority queue", "Dequeues the highest-priority item first, not the oldest."],
    ]},
    { slug: "programming-paradigms-and-low-level", cards: [
      ["Imperative paradigm", "Programs as ordered statements changing state (procedural, OOP)."],
      ["Declarative paradigm", "Programs state the desired result (functional, logic programming)."],
      ["Object-oriented programming", "Objects bundle state and behaviour; classes, inheritance, polymorphism."],
      ["Assembly language", "Mnemonic low-level language translated one-to-one into machine code."],
      ["Two's complement", "Binary representation allowing negative integers and simple addition."],
    ]},
    { slug: "databases-and-data-definition", cards: [
      ["DDL", "Data Definition Language: CREATE, ALTER, DROP tables and schemas."],
      ["DML", "Data Manipulation Language: SELECT, INSERT, UPDATE, DELETE rows."],
      ["Composite key", "Two or more fields together uniquely identifying a record."],
      ["View", "Virtual table built by a stored query; restricts access to columns."],
      ["Stored procedure", "Precompiled SQL routine executed on demand."],
    ]},
    { slug: "simulation-sensors-and-real-data", cards: [
      ["Simulation", "Model of a real system used to predict behaviour without real-world risk."],
      ["Sensor", "Converts a physical quantity into an electrical signal for processing."],
      ["Sampling interval", "Time between readings; shorter intervals capture faster change."],
      ["Data logging", "Automatic collection and storage of sensor measurements over time."],
      ["Model validity", "How faithfully a simulation represents the real system."],
    ]},
    { slug: "networks-and-the-internet", cards: [
      ["TCP/IP", "The protocol suite of the internet: TCP handles reliability, IP handles addressing."],
      ["Router", "Forwards packets between networks using IP addresses."],
      ["Switch", "Directs frames within a LAN using MAC addresses."],
      ["DNS resolution", "Recursive lookup from root servers to the authoritative name server."],
      ["Cloud computing", "On-demand computing resources delivered over the internet."],
    ]},
    { slug: "web-technologies-and-security", cards: [
      ["TLS", "Cryptographic protocol securing HTTP as HTTPS."],
      ["SQL injection", "Attack inserting malicious SQL through user input fields."],
      ["Cross-site scripting (XSS)", "Injecting scripts into web pages viewed by other users."],
      ["Responsive design", "Layouts that adapt to different screen sizes using flexible grids."],
      ["Cookies", "Small stored values remembering sessions and preferences."],
    ]},
    { slug: "computational-thinking-and-problem-solving", cards: [
      ["Decomposition", "Breaking a problem into smaller manageable sub-problems."],
      ["Abstraction", "Ignoring irrelevant detail to focus on essentials."],
      ["Pattern recognition", "Spotting similarities that suggest reusable solutions."],
      ["Algorithm design", "Forming precise step-by-step solutions from the analysis."],
      ["Testing", "Normal, boundary and erroneous data verify correctness."],
    ]},
    ]
  }
  ]
};
