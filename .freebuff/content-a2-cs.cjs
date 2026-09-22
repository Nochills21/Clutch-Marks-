// A2 Computer Science (CAIE 9618) — 8 topics. Questions use 0-based `correct`.
// AUTO-NORMALIZED: options rotated so correct answers spread across 0-3 (0-based).
module.exports = [
  {
    name: 'Data Types and File Organisation',
    description: 'User-defined types, enumerated and pointer types, sets and records, serial/sequential/random file organisation and hashing.',
    lesson: '# Data Types and File Organisation\n\n### User-Defined Types\nA user-defined type is derived from existing types. An **enumerated type** lists named values in order: TYPE Months = (Jan, Feb, Mar ...). Internally each value is an integer index starting at 0. **Pointer types** store a memory address; the dereference operator returns the value at that address, which is how linked structures reference their nodes. **Set types** store unordered collections of distinct values from an ordinal base type, supporting union, intersection and difference.\n\n### Records\nA record groups related fields of different types under one identifier, for example a Student record with name : STRING and mark : INTEGER. Arrays of records are the standard structure for storing a table of items in memory.\n\n### File Organisation\n- **Serial**: records in insertion order; searching checks every record. Simple but slow.\n- **Sequential**: records kept in key order; binary search possible, but insertion needs rewriting.\n- **Random (direct)**: a hashing function converts the key into a storage address, giving near-instant access. A poor hash causes **collisions** — two keys hashing to the same address — resolved by chaining or overflow areas.\n\n### Hashing\nA common method is division hashing: Address = Key MOD TableSize. A good hash distributes keys evenly; load factor above roughly 70 percent degrades performance.\n\n**Exam tips:** state the internal integer representation of enumerated values; define a collision before describing its resolution; compare the three file organisations in terms of search and insert cost.',
    questions: [
      {
        q: 'Internally, the third value of an enumerated type is usually stored as:',
        opts: [
          '2',
          '3',
          '1',
          '0'
        ],
        correct: 0,
        explain: 'Enumeration indices start at 0, so the third value is 2.'
      },
      {
        q: 'A pointer variable stores:',
        opts: [
          'a character code',
          'a set of values',
          'a file position only',
          'a memory address'
        ],
        correct: 0,
        explain: 'A pointer holds an address that references another location; dereferencing reads the value there.'
      },
      {
        q: 'Which operation is NOT defined on sets?',
        opts: [
          'intersection',
          'difference',
          'reordering by key',
          'union'
        ],
        correct: 1,
        explain: 'Sets are unordered, so sorting by key is meaningless; union, intersection and difference are standard.'
      },
      {
        q: 'The fastest average-case lookup of a record by key is achieved with:',
        opts: [
          'tape storage',
          'random organisation with a good hash',
          'serial search',
          'sequential search from the start'
        ],
        correct: 2,
        explain: 'Hashing maps a key directly to an address; serial and sequential need comparative searching.'
      },
      {
        q: 'Address = Key MOD 100 is an example of:',
        opts: [
          'division hashing',
          'binary search',
          'chaining',
          'a checksum'
        ],
        correct: 0,
        explain: 'MOD maps keys into 100 slots; it is the classic division method.'
      },
      {
        q: 'Two keys hashing to the same address is called:',
        opts: [
          'a stack overflow',
          'a memory leak',
          'truncation',
          'a collision'
        ],
        correct: 3,
        explain: 'Collisions are resolved with chaining or overflow areas.'
      },
      {
        q: 'Inserting a record in the middle of a large sequential file requires:',
        opts: [
          'recalculating every hash',
          'nothing — order is irrelevant',
          'rewriting part of the file',
          'only updating the index'
        ],
        correct: 2,
        explain: 'Sequential files keep key order physically, so later records must be shifted.'
      },
      {
        q: 'A record is best described as:',
        opts: [
          'a file stored on disk',
          'a grouped collection of related fields of possibly different types',
          'a list of identical elements',
          'an unordered set of keys'
        ],
        correct: 2,
        explain: 'Records group fields of mixed types under one identifier.'
      },
      {
        q: 'Overflow of a hash table above about 70 percent load causes:',
        opts: [
          'increased collisions and slower access',
          'immediate data corruption',
          'automatic table doubling in all languages',
          'loss of sequential order'
        ],
        correct: 3,
        explain: 'As occupancy rises, collisions become frequent and chains lengthen.'
      },
      {
        q: 'Binary search is possible on a file organised:',
        opts: [
          'serially by arrival',
          'randomly by hash',
          'as a text log',
          'sequentially by key'
        ],
        correct: 3,
        explain: 'Binary search needs ordered data, which only sequential organisation guarantees.'
      }
    ]
  },
  {
    name: 'Abstract Data Types',
    description: 'Linked lists, binary search trees, hash tables and stacks/queues implemented from primitives.',
    lesson: '# Abstract Data Types\n\n### What is an ADT?\nAn abstract data type is a logical description of a collection of data plus the operations on it, independent of implementation. Stacks, queues, linked lists, binary trees and hash tables are all ADTs; in A Level you must show how they are built from arrays or records with pointers.\n\n### Linked Lists\nEach node holds a value and a pointer to the next node; a start pointer marks the head and a null marks the end. Insertion rewires two pointers — no shifting — giving O(1) insertion at a known position, but access requires walking the list, O(n).\n\n### Stacks and Queues\nA stack is LIFO (push and pop at the top); a queue is FIFO (enqueue at the rear, dequeue from the front). Both can be arrays with index pointers or linked lists. Stack uses include call stacks and expression evaluation; queue uses include print buffers and breadth-first search.\n\n### Binary Search Trees\nEach node has up to two children; left subtree keys are smaller, right subtree keys larger. Search, insert and (average-case) delete are O(log n). An **in-order traversal** outputs keys in ascending order. A degenerate (linear) tree from sorted input degrades to O(n).\n\n### Hash Tables\nCovered in file organisation, but as an ADT a hash table pairs a hash function with bucket storage for O(1) average access.\n\n**Exam tips:** be able to draw a tree after a sequence of insertions and write its three traversals; state the pointer changes for a linked-list insertion; compare ADT operations with Big-O.',
    questions: [
      {
        q: 'A stack processes elements in which order?',
        opts: [
          'random',
          'LIFO',
          'FIFO',
          'sorted by key'
        ],
        correct: 1,
        explain: 'Last-in, first-out: the most recently pushed item pops first.'
      },
      {
        q: 'Inserting at the head of a linked list takes:',
        opts: [
          'O(1)',
          'O(log n)',
          'O(n)',
          'O(n²)'
        ],
        correct: 1,
        explain: 'Two pointer assignments regardless of list length — constant time.'
      },
      {
        q: 'In-order traversal of a BST outputs keys:',
        opts: [
          'in insertion order',
          'level by level',
          'in descending order',
          'in ascending order'
        ],
        correct: 3,
        explain: 'Left subtree, node, right subtree yields sorted output.'
      },
      {
        q: 'A queue enqueues at the rear and dequeues from the:',
        opts: [
          'root',
          'middle',
          'front',
          'top'
        ],
        correct: 2,
        explain: 'FIFO discipline: front leaves first.'
      },
      {
        q: 'Inserting sorted data into a plain BST produces:',
        opts: [
          'a hash collision',
          'a degenerate linear tree with O(n) search',
          'a balanced tree',
          'a complete binary tree'
        ],
        correct: 1,
        explain: 'Every node gets one right child, so the tree degenerates.'
      },
      {
        q: 'Popping from an empty stack is an example of:',
        opts: [
          'underflow',
          'overflow',
          'collision',
          'deadlock'
        ],
        correct: 0,
        explain: 'Removing from an empty structure is underflow; adding beyond capacity is overflow.'
      },
      {
        q: 'Which structure suits a breadth-first search frontier?',
        opts: [
          'stack',
          'binary tree',
          'hash table',
          'queue'
        ],
        correct: 3,
        explain: 'BFS explores level by level — FIFO order, so a queue.'
      },
      {
        q: 'A circular queue avoids:',
        opts: [
          'traversal cost',
          'recursion',
          'wasted space after dequeues',
          'collisions'
        ],
        correct: 2,
        explain: 'Wrapping rear/front pointers reuses freed slots at the start of the array.'
      },
      {
        q: 'Deleting a node with two children from a BST replaces it with:',
        opts: [
          'the root',
          'its in-order successor or predecessor',
          'its parent',
          'a random leaf'
        ],
        correct: 1,
        explain: 'The successor (smallest right-subtree key) preserves ordering.'
      },
      {
        q: 'Finding one node in a balanced BST of 1,000,000 nodes takes about:',
        opts: [
          '20 comparisons',
          '1000 comparisons',
          '1,000,000 comparisons',
          '3 comparisons'
        ],
        correct: 1,
        explain: 'log2(1,000,000) is about 20 — halving each step.'
      }
    ]
  },
  {
    name: 'Programming Paradigms and Low-Level',
    description: 'Paradigms compared, assembly language, addressing modes, instruction groups and the fetch-execute cycle.',
    lesson: '# Programming Paradigms and Low-Level\n\n### Paradigms\n- **Procedural**: programs as sequences of instructions in procedures — good for straightforward algorithms.\n- **Object-oriented**: classes encapsulate state (attributes) and behaviour (methods); supports **encapsulation**, **inheritance** and **polymorphism**.\n- **Declarative**: state what is required, not how (SQL queries, logic programming).\n- **Low-level**: assembly maps closely to machine code; used where hardware control or timing precision is needed.\n\n### Assembly Essentials\nThe **opcode** names the operation (LDM load, STR store, ADD, CMP compare, JMP branch, IN/OUT for I/O). The **operand** names the data. The assembler translates mnemonics to machine code one-to-one; two-pass assemblers resolve forward references via the symbol table.\n\n### Addressing Modes\n- **Immediate**: operand is the constant itself, ADD #5.\n- **Direct**: operand is the memory address of the data.\n- **Indirect**: operand is the address OF the address; one extra memory read.\n- **Indexed**: effective address = base + index register; ideal for arrays.\n- **Relative**: address given as an offset from the program counter; enables position-independent code.\n\n### Fetch-Execute\nFetch: PC gives address, instruction loads into the CIR, PC increments. Decode: control unit interprets the opcode. Execute: the operation runs, possibly updating registers or memory. Interrupts are checked at cycle boundaries.\n\n**Exam tips:** trace short assembly programs register by register; compute effective addresses for each addressing mode; state one advantage of OOP for large systems.',
    questions: [
      {
        q: 'Which paradigm encapsulates state and behaviour in classes?',
        opts: [
          'declarative',
          'functional',
          'object-oriented',
          'procedural'
        ],
        correct: 2,
        explain: 'OOP classes bundle attributes with methods.'
      },
      {
        q: 'ADD #10 uses which addressing mode?',
        opts: [
          'indexed',
          'immediate',
          'direct',
          'indirect'
        ],
        correct: 1,
        explain: 'The operand is the literal constant 10 itself.'
      },
      {
        q: 'Indirect addressing requires:',
        opts: [
          'one extra memory access to find the data',
          'no memory access',
          'an index register',
          'an interrupt'
        ],
        correct: 0,
        explain: 'The operand points to the address of the data, so an extra read is needed.'
      },
      {
        q: 'Indexed addressing suits arrays because:',
        opts: [
          'it skips the MAR',
          'it avoids the ALU',
          'it disables caching',
          'effective address = base + index'
        ],
        correct: 3,
        explain: 'Varying the index register walks consecutive elements.'
      },
      {
        q: 'CMP followed by JE is used to:',
        opts: [
          'swap operands',
          'clear a flag',
          'branch if values are equal',
          'add two registers'
        ],
        correct: 2,
        explain: 'CMP sets flags; JE branches when the equal flag is set.'
      },
      {
        q: 'During the fetch stage the PC is:',
        opts: [
          'copied to the MDR only',
          'incremented after the instruction is fetched',
          'cleared to zero',
          'used as the accumulator'
        ],
        correct: 1,
        explain: 'PC points at the next instruction and is incremented during fetch.'
      },
      {
        q: 'A two-pass assembler exists to handle:',
        opts: [
          'forward references to labels',
          'graphics instructions',
          'floating point only',
          'disk buffering'
        ],
        correct: 0,
        explain: 'Pass 1 records symbol addresses; pass 2 fills in forward jumps.'
      },
      {
        q: 'Relative addressing enables:',
        opts: [
          'faster ALUs',
          'larger word sizes',
          'direct I/O',
          'position-independent code'
        ],
        correct: 3,
        explain: 'Offsets from the PC let code run from any base address.'
      },
      {
        q: 'Polymorphism allows:',
        opts: [
          'copying objects',
          'single inheritance only',
          'one method name to behave differently by class',
          'hiding attributes only'
        ],
        correct: 2,
        explain: 'Subclass overrides mean the same call runs different implementations.'
      },
      {
        q: 'The register holding the current instruction is the:',
        opts: [
          'ACC',
          'CIR',
          'PC',
          'MAR'
        ],
        correct: 1,
        explain: 'Current Instruction Register; the PC holds the address of the next instruction.'
      }
    ]
  },
  {
    name: 'Databases and Data Definition',
    description: 'Relational concepts, normalisation to 3NF, DDL and DML, transaction processing and concurrency.',
    lesson: '# Databases and Data Definition\n\n### Relational Concepts\nA table (relation) stores rows (tuples) and columns (attributes). The **primary key** uniquely identifies each row; a **foreign key** references a primary key in another table, creating the relationship. A composite key uses two or more columns together.\n\n### Normalisation\n- **1NF**: atomic values, no repeating groups.\n- **2NF**: 1NF plus every non-key attribute depends on the whole key (kills partial dependency in composite keys).\n- **3NF**: 2NF plus no transitive dependency — non-key attributes must not depend on other non-key attributes.\n\nNormalisation reduces redundancy and prevents update, insert and delete anomalies.\n\n### DDL and DML\nDDL defines structure: CREATE TABLE, ALTER TABLE, DROP. DML manipulates data: SELECT ... FROM ... WHERE, INSERT INTO, UPDATE, DELETE. Joins combine related tables: FROM Student s JOIN Enrolment e ON s.id = e.StudentID. Aggregates: COUNT, SUM, AVG with GROUP BY and HAVING.\n\n### Transactions and Concurrency\nA transaction is a unit of work obeying ACID: Atomicity (all or nothing), Consistency (rules preserved), Isolation (concurrent transactions do not interfere), Durability (committed data survives crashes). **Record locking** blocks conflicting simultaneous edits; a deadlock occurs when two transactions each hold a lock the other needs.\n\n**Exam tips:** normalise a small table through 1NF, 2NF, 3NF naming the dependency removed at each step; write a two-table SELECT with JOIN; state which ACID property a scenario breaks.',
    questions: [
      {
        q: 'A foreign key must reference:',
        opts: [
          'any text column',
          'an index only',
          'a view',
          'a primary or candidate key in another table'
        ],
        correct: 3,
        explain: 'Referential integrity ties a FK to a unique key in the referenced table.'
      },
      {
        q: 'Repeating groups are removed at:',
        opts: [
          '3NF',
          'BCNF only',
          '1NF',
          '2NF'
        ],
        correct: 2,
        explain: 'First normal form requires atomic values and no repeating groups.'
      },
      {
        q: 'Partial dependency is removed at:',
        opts: [
          'no stage',
          '2NF',
          '1NF',
          '3NF'
        ],
        correct: 1,
        explain: '2NF removes dependencies on part of a composite key.'
      },
      {
        q: 'A transitive dependency is removed at:',
        opts: [
          '3NF',
          '1NF',
          '2NF',
          'when indexes are added'
        ],
        correct: 0,
        explain: '3NF forbids non-key attributes depending on other non-key attributes.'
      },
      {
        q: 'ACID isolation means:',
        opts: [
          'data survives crashes',
          'rules are preserved',
          'all or nothing',
          'concurrent transactions do not interfere'
        ],
        correct: 3,
        explain: 'Isolation concerns interleaving of concurrent transactions; durability covers crashes.'
      },
      {
        q: 'JOIN ... ON in a SELECT is used to:',
        opts: [
          'delete duplicates',
          'create an index',
          'combine rows of related tables',
          'rename a column'
        ],
        correct: 2,
        explain: 'Joins pair rows where the ON condition holds, usually a FK to PK match.'
      },
      {
        q: 'Two transactions each waiting for the other’s lock is:',
        opts: [
          'an anomaly',
          'deadlock',
          'underflow',
          'redundancy'
        ],
        correct: 1,
        explain: 'Neither can proceed; databases abort one to break the cycle.'
      },
      {
        q: 'CourseFee depending only on Course inside a table keyed by (StudentID, Course) violates:',
        opts: [
          '2NF',
          '1NF',
          'the foreign key rule',
          'SQL syntax'
        ],
        correct: 0,
        explain: 'It depends on part of the key — a partial dependency.'
      },
      {
        q: 'Which statement is DDL?',
        opts: [
          'UPDATE',
          'SELECT',
          'INSERT',
          'ALTER TABLE'
        ],
        correct: 3,
        explain: 'DDL changes structure; UPDATE/SELECT/INSERT manipulate data (DML).'
      },
      {
        q: 'HAVING differs from WHERE because HAVING:',
        opts: [
          'joins tables',
          'defines columns',
          'filters aggregated groups',
          'runs before aggregation'
        ],
        correct: 2,
        explain: 'WHERE filters rows pre-aggregation; HAVING filters after GROUP BY.'
      }
    ]
  },
  {
    name: 'Simulation, Sensors and Real Data',
    description: 'Modelling and simulation, sensor hardware, ADC/DAC, actuators and monitoring systems.',
    lesson: '# Simulation, Sensors and Real Data\n\n### Simulation and Modelling\nA simulation is a program that models a real system to test scenarios safely and cheaply: weather models, traffic flows, epidemic spread. Models use abstractions — chosen variables and equations — with a time step. Advantages: no real-world risk, repeatable, faster or slower than real time. Limitations: only as good as the model; rare events may be missed.\n\n### Sensors and Signals\nSensors measure physical quantities: temperature (thermistor), light (LDR), pressure, humidity, sound. Most output **analogue** signals varying continuously; computers need **digital** values, so an **ADC (analogue-to-digital converter)** samples the signal. Resolution depends on bits — an 8-bit ADC gives 256 levels. A **DAC** converts digital output back to analogue for actuators or speakers.\n\n### Monitoring vs Control\n- **Monitoring**: sensors feed data to the computer, which only records, displays or raises alarms — no action taken on the environment.\n- **Control**: the computer acts via **actuators** (motors, valves, heaters) based on sensor input — the classic feedback loop.\n\n### Real-Time Considerations\nControl systems are often real-time: late output can be wrong output. Sampling rate must exceed twice the highest signal frequency (Nyquist) to avoid aliasing.\n\n**Exam tips:** distinguish monitoring from control with a named example; describe the role of ADC and DAC in a greenhouse system; explain one limitation of a simulation.',
    questions: [
      {
        q: 'An ADC is required because:',
        opts: [
          'sensors output analogue but computers process digital',
          'actuators need analogue only',
          'it amplifies weak signals',
          'it stores readings long-term'
        ],
        correct: 0,
        explain: 'ADC samples the analogue voltage into binary values the CPU can process.'
      },
      {
        q: 'An 8-bit ADC provides:',
        opts: [
          '255 levels',
          '8 levels',
          '1024 levels',
          '256 discrete levels'
        ],
        correct: 3,
        explain: '2 to the power 8 equals 256.'
      },
      {
        q: 'A greenhouse system that reads temperature and switches the heater is:',
        opts: [
          'simulation',
          'modelling',
          'control',
          'monitoring only'
        ],
        correct: 2,
        explain: 'Acting on the environment via an actuator is control; monitoring only records or alarms.'
      },
      {
        q: 'An actuator is:',
        opts: [
          'a storage device',
          'a device that carries out physical actions',
          'a type of sensor',
          'a bus protocol'
        ],
        correct: 1,
        explain: 'Motors, valves and heaters convert control signals into action.'
      },
      {
        q: 'Sampling below twice the highest frequency causes:',
        opts: [
          'aliasing',
          'overflow',
          'deadlock',
          'quantisation'
        ],
        correct: 0,
        explain: 'Nyquist: undersampled signals fold into false low frequencies.'
      },
      {
        q: 'A key limitation of every simulation is:',
        opts: [
          'it cannot run in real time',
          'it needs no input data',
          'it cannot repeat scenarios',
          'it is only as accurate as its model'
        ],
        correct: 3,
        explain: 'Simplifications and unknown factors limit fidelity.'
      },
      {
        q: 'A thermistor measures:',
        opts: [
          'pressure',
          'humidity',
          'temperature',
          'light intensity'
        ],
        correct: 2,
        explain: 'Its resistance changes with temperature; an LDR responds to light.'
      },
      {
        q: 'A DAC is needed when output must be:',
        opts: [
          'encrypted',
          'analogue, such as sound through a speaker',
          'digital text',
          'compressed'
        ],
        correct: 1,
        explain: 'Digital values convert back to continuous voltage for analogue devices.'
      },
      {
        q: 'A monitoring-only system differs from control because it:',
        opts: [
          'takes no action on the environment',
          'uses no sensors',
          'needs no CPU',
          'cannot raise alarms'
        ],
        correct: 0,
        explain: 'Monitoring records or alerts; control closes the loop with actuators.'
      },
      {
        q: 'Feedback in a control loop means:',
        opts: [
          'users rate the system',
          'errors are logged to disk',
          'output is echoed to input port',
          'sensor readings influence future control actions'
        ],
        correct: 3,
        explain: 'The controller compares measured state against target and adjusts.'
      }
    ]
  },
  {
    name: 'Networks and the Internet',
    description: 'Network models, TCP/IP stack, switching, subnetting with IPv4, client-server vs peer-to-peer and security devices.',
    lesson: '# Networks and the Internet\n\n### The TCP/IP Stack\nFour layers: **Application** (HTTP, FTP, SMTP, DNS), **Transport** (TCP reliable, connection-oriented with sequence numbers and acknowledgements; UDP fast, connectionless), **Internet** (IP addressing and routing), **Link** (physical delivery on the local network). Layering separates concerns so each layer can change independently.\n\n### Switching\n- **Circuit switching**: a dedicated path is held for the call (traditional telephone) — wasteful if idle.\n- **Packet switching**: data split into packets routed independently; each carries source/destination addresses and a sequence number, reassembled at the destination. Efficient and fault-tolerant; packets may arrive out of order (TCP fixes ordering).\n\n### Addressing and Subnetting\nIPv4 addresses are 32 bits, written dotted decimal, split into network + host portions by the subnet mask. ANDing an IP with the mask yields the network ID. 192.168.4.0/26 means the first 26 bits are network, leaving 6 host bits: 64 addresses, 62 usable. NAT maps private addresses to one public IP.\n\n### Models and Protection\nClient-server centralises services (web, email, files); peer-to-peer shares directly (torrents, small LANs). Firewalls filter traffic by rules; proxy servers sit between clients and the internet, caching and filtering; ports identify services (80/443 web, 25 SMTP).\n\n**Exam tips:** compute usable hosts from a given prefix; trace a packet through the four layers naming one protocol per layer; explain one advantage of packet over circuit switching.',
    questions: [
      {
        q: 'TCP differs from UDP because TCP:',
        opts: [
          'avoids the IP layer',
          'guarantees ordered, acknowledged delivery',
          'is always faster',
          'has no header'
        ],
        correct: 1,
        explain: 'TCP is connection-oriented with ACKs and retransmission; UDP trades reliability for speed.'
      },
      {
        q: 'Which layer of TCP/IP does routing of packets between networks?',
        opts: [
          'Internet',
          'Application',
          'Transport',
          'Link'
        ],
        correct: 0,
        explain: 'The Internet layer uses IP addresses to route between networks.'
      },
      {
        q: 'In packet switching, packets of one message:',
        opts: [
          'all follow one reserved path',
          'cannot be lost',
          'bypass routers',
          'may travel different routes and arrive out of order'
        ],
        correct: 3,
        explain: 'Independent routing is the point of packet switching; sequence numbers restore order.'
      },
      {
        q: 'A /26 IPv4 prefix leaves usable host addresses of:',
        opts: [
          '126',
          '30',
          '62',
          '64'
        ],
        correct: 2,
        explain: '6 host bits give 64 addresses minus network and broadcast = 62.'
      },
      {
        q: 'ANDing an IP address with its subnet mask produces:',
        opts: [
          'the broadcast address',
          'the network ID',
          'the host ID',
          'the default gateway'
        ],
        correct: 1,
        explain: 'The mask zeroes host bits, exposing the network portion.'
      },
      {
        q: 'NAT exists to:',
        opts: [
          'map many private IPs onto few public IPs',
          'encrypt packets',
          'resolve domain names',
          'assign MAC addresses'
        ],
        correct: 0,
        explain: 'NAT conserves IPv4 addresses and hides internal structure.'
      },
      {
        q: 'SMTP is the protocol for:',
        opts: [
          'web pages',
          'file transfer',
          'name resolution',
          'sending email'
        ],
        correct: 3,
        explain: 'Simple Mail Transfer Protocol handles mail submission/relay; DNS resolves names.'
      },
      {
        q: 'A proxy server can:',
        opts: [
          'replace a firewall entirely',
          'route between ISPs',
          'cache web content and filter requests',
          'assign IP addresses only'
        ],
        correct: 2,
        explain: 'Proxies sit between client and internet providing caching, filtering and anonymity.'
      },
      {
        q: 'The port commonly used for HTTPS is:',
        opts: [
          '21',
          '443',
          '80',
          '25'
        ],
        correct: 1,
        explain: 'HTTPS = HTTP over TLS on 443; plain HTTP is 80.'
      },
      {
        q: 'A peer-to-peer network differs from client-server because:',
        opts: [
          'every node may act as both client and server',
          'one node holds all files',
          'it needs a DNS server',
          'it cannot share printers'
        ],
        correct: 0,
        explain: 'P2P nodes share resources directly without a central server.'
      }
    ]
  },
  {
    name: 'Web Technologies and Security',
    description: 'HTML/CSS/JS layers, server-side PHP and SQL, encryption, SSL/TLS, and injection attacks.',
    lesson: '# Web Technologies and Security\n\n### The Three Layers\n- **HTML** gives structure and content: elements, attributes, forms for user input.\n- **CSS** gives presentation: selectors, properties, responsive layout.\n- **JavaScript** gives client-side behaviour: validation before submission, DOM updates without reload.\n\nServer-side scripting (PHP) runs on the server: reads form fields ($_POST), queries the database, outputs HTML. The client never sees PHP source.\n\n### SQL Injection\nAn attack where crafted input changes the meaning of a query. If a login query concatenates the username directly, entering X OR 1=1 can match every row. Defences: **parameterised queries** (prepared statements) that separate code from data, validation, and least-privilege database accounts.\n\n### Encryption\n- **Symmetric**: one shared key (AES). Fast, but key distribution is the weak point.\n- **Asymmetric**: public/private key pair (RSA). Anyone encrypts with the public key; only the holder decrypts with the private key. Slower, so used to exchange a symmetric session key.\n- **SSL/TLS** combines both: certificates verify the server, asymmetric key exchange establishes a symmetric session key, then traffic is encrypted. HTTPS = HTTP over TLS on port 443.\n\n### Hashing vs Encryption\nHashing (e.g. SHA-256) is one-way: passwords should be stored hashed with a unique salt, never encrypted reversibly.\n\n**Exam tips:** explain why parameterised queries stop injection; describe the TLS handshake in three steps; distinguish hashing from encryption with password storage as the example.',
    questions: [
      {
        q: 'Which technology is responsible for page presentation?',
        opts: [
          'PHP',
          'SQL',
          'CSS',
          'HTML'
        ],
        correct: 2,
        explain: 'HTML structures content; CSS styles it; JS adds behaviour; PHP is server-side.'
      },
      {
        q: 'Client-side JavaScript validation improves UX but must be repeated server-side because:',
        opts: [
          'forms cannot send data',
          'client code can be bypassed entirely',
          'JS is slower',
          'PHP cannot validate'
        ],
        correct: 1,
        explain: 'Attackers can submit directly to the server, so server checks are the real gate.'
      },
      {
        q: 'The input 1 OR 1=1 in a login field is characteristic of:',
        opts: [
          'SQL injection',
          'phishing',
          'a DDoS',
          'cross-site tracing'
        ],
        correct: 0,
        explain: 'It alters the WHERE clause to match all rows.'
      },
      {
        q: 'The standard defence against SQL injection is:',
        opts: [
          'stronger passwords',
          'HTTPS',
          'CAPTCHA',
          'parameterised queries'
        ],
        correct: 3,
        explain: 'Prepared statements send data separately from SQL text so it is never executed.'
      },
      {
        q: 'In asymmetric encryption, the key used to decrypt is:',
        opts: [
          'the session key',
          'the salt',
          'the private key',
          'the public key'
        ],
        correct: 2,
        explain: 'Public encrypts, private decrypts; the private key never leaves its owner.'
      },
      {
        q: 'TLS uses asymmetric encryption mainly to:',
        opts: [
          'compress headers',
          'exchange a symmetric session key securely',
          'encrypt all traffic',
          'sign cookies'
        ],
        correct: 1,
        explain: 'Asymmetric is slow, so it bootstraps a fast symmetric key for the session.'
      },
      {
        q: 'Passwords should be stored:',
        opts: [
          'salted and hashed',
          'encrypted with the public key',
          'in plain text',
          'base64 encoded'
        ],
        correct: 0,
        explain: 'Hashing is one-way; salts defeat rainbow tables.'
      },
      {
        q: 'HTTPS differs from HTTP by:',
        opts: [
          'using UDP',
          'removing headers',
          'skipping DNS',
          'encrypting traffic with TLS over port 443'
        ],
        correct: 3,
        explain: 'HTTP runs on 80 in clear text; HTTPS wraps it in TLS.'
      },
      {
        q: 'A digital certificate primarily proves:',
        opts: [
          'the site has no cookies',
          'the client’s password',
          'the server’s identity',
          'the page loads faster'
        ],
        correct: 2,
        explain: 'A CA signs the certificate binding the server’s public key to its domain.'
      },
      {
        q: 'PHP differs from JavaScript because PHP:',
        opts: [
          'is a markup language',
          'executes on the server before HTML is sent',
          'runs in the browser',
          'cannot use variables'
        ],
        correct: 1,
        explain: 'PHP generates the page server-side; JS executes after delivery, client-side.'
      }
    ]
  },
  {
    name: 'Computational Thinking and Problem-Solving',
    description: 'Abstraction and decomposition, algorithm design, recursion, searching and sorting with Big-O, and testing.',
    lesson: '# Computational Thinking and Problem-Solving\n\n### Thinking Ahead, Abstractly, Systematically\n- **Abstraction**: keep essential features, drop detail — a metro map ignores street geometry.\n- **Decomposition**: split the problem into sub-problems solved independently.\n- **Thinking ahead**: pre-plan inputs, outputs and reusable components; pre-calculate tables where possible.\n\n### Recursion\nA recursive routine calls itself with a smaller input and a **base case** that stops the recursion. Elegant for trees and divide-and-conquer, but each call consumes stack space — deep recursion can overflow. Any recursion can be rewritten with a loop and explicit stack.\n\n### Searching and Sorting\n- **Linear search**: O(n), works unsorted.\n- **Binary search**: O(log n), needs sorted data.\n- **Bubble sort**: O(n²) average; simple; detects a sorted pass.\n- **Insertion sort**: O(n²) average; fast on nearly-sorted data.\n- **Merge sort**: O(n log n) always; needs extra memory.\n\n### Testing\nWhite-box tests trace internal paths; black-box tests check specification behaviour. Choose normal, boundary and erroneous data. Dry runs use trace tables recording variables line by line; a trace of recursion should log each call and its return.\n\n**Exam tips:** write the base case before the recursive call in pseudocode; give the Big-O with a one-line justification; construct a trace table for a small loop or recursive call.',
    questions: [
      {
        q: 'Replacing a street map with a metro line diagram is an example of:',
        opts: [
          'decomposition',
          'recursion',
          'compilation',
          'abstraction'
        ],
        correct: 3,
        explain: 'Non-essential detail is discarded, keeping what matters for the task.'
      },
      {
        q: 'Every recursive routine must have:',
        opts: [
          'a while loop',
          'a pointer',
          'a base case',
          'a global variable'
        ],
        correct: 2,
        explain: 'Without a terminating base case the calls never stop — stack overflow.'
      },
      {
        q: 'Binary search requires the data to be:',
        opts: [
          'in a tree',
          'sorted',
          'unique',
          'numeric'
        ],
        correct: 1,
        explain: 'Halving logic depends on order; duplicates only matter for which match is found.'
      },
      {
        q: 'Merge sort guarantees:',
        opts: [
          'O(n log n) in all cases',
          'O(n²) in the worst case',
          'O(1) extra memory',
          'in-place swapping'
        ],
        correct: 0,
        explain: 'It always splits and merges in n log n, using auxiliary arrays.'
      },
      {
        q: 'A trace table records:',
        opts: [
          'only the output',
          'compiler errors',
          'memory addresses',
          'variable values at each step of a dry run'
        ],
        correct: 3,
        explain: 'It documents each pass so logic errors become visible.'
      },
      {
        q: 'Insertion sort outperforms bubble sort when the data is:',
        opts: [
          'reverse sorted',
          'numeric',
          'nearly sorted',
          'random'
        ],
        correct: 2,
        explain: 'Nearly-sorted input makes insertion almost linear; bubble still does full passes.'
      },
      {
        q: 'Deep recursion on large inputs risks:',
        opts: [
          'injection',
          'stack overflow',
          'aliasing',
          'deadlock'
        ],
        correct: 1,
        explain: 'Each pending call occupies a stack frame until it returns.'
      },
      {
        q: 'Black-box testing derives cases from:',
        opts: [
          'the specification',
          'the source code',
          'the compiler',
          'the OS'
        ],
        correct: 0,
        explain: 'Behaviour is checked against requirements without seeing internals.'
      },
      {
        q: 'Boundary data for a program accepting 1 to 100 inclusive should test:',
        opts: [
          'only 50',
          'negative numbers only',
          'text input only',
          '0, 1, 100, 101'
        ],
        correct: 3,
        explain: 'Just inside and just outside the limits expose off-by-one errors.'
      },
      {
        q: 'Decomposition means:',
        opts: [
          'repeating steps',
          'ordering data',
          'splitting a problem into solvable sub-problems',
          'removing detail from a model'
        ],
        correct: 2,
        explain: 'Each sub-problem is solved and tested independently, then composed.'
      }
    ]
  }
];
