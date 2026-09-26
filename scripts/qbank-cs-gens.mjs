// Per-sub-section MCQ generator families for Cambridge IGCSE Computer Science
// (0478). Mostly concept pools per syllabus sub-section; number-system and
// logic families compute their answers.
import { numericMcq, fmt } from "./qbank-lib.mjs";

const toBin = (n, w = 8) => n.toString(2).padStart(w, "0");
const toHex = (n) => n.toString(16).toUpperCase();

function poolQ(r, entries) {
  const e = r.pick(entries);
  const opts = r.shuffle([e.correct, ...e.wrong]);
  return { question_text: e.q, options: opts, correct_option: opts.indexOf(e.correct), explanation: e.ex };
}

export const CS_GENS = {
  // 1. Data representation
  "1.1": [
    (r) => {
      const n = r.int(20, 250);
      const wrong = [toBin(n + 1), toBin(n - 1), toBin(n ^ 3)];
      return numericMcq(r, `Convert the denary number ${n} to binary (8 bits).`, toBin(n), wrong,
        `${n} = ${toBin(n)} (place values 128 64 32 16 8 4 2 1).`);
    },
    (r) => {
      const n = r.int(10, 250);
      const wrong = [String(n), toHex(n + 16), toHex(n * 2)];
      return numericMcq(r, `Convert the denary number ${n} to hexadecimal.`, toHex(n), wrong,
        `${n} = ${toBin(n)}₂ = ${toBin(n).slice(0, 4)} ${toBin(n).slice(4)} → ${toHex(n)}₁₆.`);
    },
    (r) => {
      const bin = toBin(r.int(40, 255));
      const val = parseInt(bin, 2);
      return numericMcq(r, `Convert the binary number ${bin} to denary.`, val, [val + 1, val - 2, val * 2],
        `Sum the set place values: ${bin}₂ = ${val}₁₀.`);
    },
  ],
  "1.2": [],
  "1.3": [],
  "1": [
    (r) => {
      const A = r.int(0, 1), B = r.int(0, 1);
      const out = A && B ? 1 : 0;
      return numericMcq(r, `An AND gate has inputs A = ${A} and B = ${B}. Its output is:`, out, [out ? 0 : 1, 2, `${A}${B}`],
        `AND outputs 1 only when both inputs are 1.`);
    },
    (r) => {
      const A = r.int(0, 1), B = r.int(0, 1);
      const out = A || B ? 1 : 0;
      return numericMcq(r, `An OR gate has inputs A = ${A} and B = ${B}. Its output is:`, out, [out ? 0 : 1, 2, "undefined"],
        `OR outputs 1 when at least one input is 1.`);
    },
    (r) => {
      const A = r.int(0, 1);
      return numericMcq(r, `A NOT gate has input A = ${A}. Its output is:`, A ? 0 : 1, [A, 2, "undefined"],
        `NOT inverts: ${A} → ${A ? 0 : 1}.`);
    },
    () => poolQ(null, [
      { q: "Which is an advantage of hexadecimal over binary for humans?", correct: "Shorter to write and easier to read/debug (1 hex digit = 4 bits)", wrong: ["Computers process hex faster", "Hex uses less memory than binary", "Hex can represent negative numbers natively"], ex: "Hex is a human-friendly shorthand: each digit maps exactly to 4 bits." },
      { q: "A character set is:", correct: "The list of characters a computer can represent, each mapped to a code", wrong: ["A font stored on disk", "A compression method", "A type of register"], ex: "ASCII/Unicode map characters to binary codes so text is stored consistently." },
      { q: "Overflows occurs in binary addition when:", correct: "The result needs more bits than the register holds", wrong: ["Two zeros are added", "Carry bits vanish into the sign bit by design", "The sum equals zero"], ex: "If the true result exceeds the word size, the stored value is wrong — an overflow." },
      { q: "Two's complement represents negative numbers by:", correct: "Flipping all bits of the positive value and adding 1", wrong: ["Adding a sign digit 1 in front", "Subtracting 128", "Reversing the bit order"], ex: "Invert then add 1: e.g. 5 = 00000101 → −5 = 11111011 (8-bit)." },
    ]),
  ],
  // 2. Data transmission
  "2": [
    () => poolQ(null, [
      { q: "Serial transmission sends data:", correct: "One bit at a time down a single wire", wrong: ["Several bits at once down parallel wires", "Only in one direction ever", "Without any start or stop bits"], ex: "Serial = bit-by-bit over one channel; reliable over distance and cheaper to wire." },
      { q: "Parity checks can detect:", correct: "Some transmission errors (an odd number of flipped bits)", wrong: ["Every possible error", "Which bit was flipped, always", "Viruses in the data"], ex: "Parity spots single-bit flips; multi-bit errors can cancel and pass undetected." },
      { q: "USB is:", correct: "A standard for wired serial connections between devices", wrong: ["A wireless protocol", "A compression algorithm", "An error-checking method"], ex: "Universal Serial Bus: plug-and-play serial standard for peripherals." },
    ]),
  ],
  // 3. Hardware
  "3": [
    () => poolQ(null, [
      { q: "RAM is described as volatile because:", correct: "Its contents are lost when power is removed", wrong: ["It can never be changed", "It is slower than a hard disk", "It stores files permanently"], ex: "RAM holds running programs/workspace and empties on power-off; ROM is non-volatile." },
      { q: "Which storage is non-volatile and randomly addressable in blocks?", correct: "SSD (flash)", wrong: ["RAM", "CPU cache", "Optical disc being written"], ex: "Flash SSDs keep data unpowered and give fast block access." },
      { q: "The ALU's job is to:", correct: "Perform arithmetic and logic operations", wrong: ["Store all files", "Manage the system clock", "Render graphics only"], ex: "Arithmetic Logic Unit executes calculations and bitwise logic under control-unit direction." },
      { q: "An interrupt is:", correct: "A signal telling the CPU to pause and handle an event", wrong: ["A type of register", "A storage medium", "A compiler error"], ex: "Interrupts let devices/timers grab CPU attention between instructions." },
      { q: "Buffering helps because:", correct: "It smooths speed differences between devices by holding data temporarily", wrong: ["It permanently stores large files", "It increases CPU clock speed", "It compresses data"], ex: "A buffer absorbs bursts between a fast CPU and slower peripherals." },
    ]),
  ],
  // 4. Software
  "4": [
    () => poolQ(null, [
      { q: "System software includes:", correct: "Operating systems and utility programs", wrong: ["Spreadsheets and browsers", "Games and editors only", "Programming languages only"], ex: "System software runs the platform; applications do user tasks on top of it." },
      { q: "An interpreter differs from a compiler because it:", correct: "Translates and runs source code line by line", wrong: ["Produces a standalone executable", "Only works on assembly", "Optimises the whole program before running"], ex: "Interpreters execute as they translate; compilers translate the whole program first." },
      { q: "The purpose of an operating system is to:", correct: "Manage hardware resources and provide the interface for applications", wrong: ["Edit photographs", "Compile programs only", "Replace the need for hardware"], ex: "OS handles memory, processes, I/O, files, security and the UI." },
    ]),
  ],
  // 5. The internet and its uses
  "5": [
    () => poolQ(null, [
      { q: "An IP address is:", correct: "A unique address identifying a device on a network", wrong: ["A password for websites", "A type of cable", "An encryption key"], ex: "IP addresses route packets between devices across networks." },
      { q: "HTTPS differs from HTTP because it:", correct: "Encrypts traffic (typically with TLS)", wrong: ["Is faster always", "Works only on wireless", "Sends data in plaintext"], ex: "HTTPS = HTTP over TLS, protecting data from eavesdropping/tampering." },
      { q: "A firewall's role is to:", correct: "Monitor and filter traffic against security rules", wrong: ["Store backups", "Cool the CPU", "Register domain names"], ex: "Firewalls permit/block packets by rule-set at the network boundary." },
    ]),
  ],
  // 6. Automated and emerging technologies
  "6": [
    () => poolQ(null, [
      { q: "A sensor in an automated system:", correct: "Measures a physical quantity and feeds it to the microprocessor", wrong: ["Stores the whole program", "Prints the output", "Replaces the power supply"], ex: "Sensors are the input side; ADC converts analogue readings for the processor." },
      { q: "An ADC (analogue-to-digital converter) is needed because:", correct: "Sensors output analogue signals but processors work with digital data", wrong: ["Digital signals are analogue", "Sensors output digital only", "ADCs store the readings"], ex: "Continuous sensor voltages must be sampled into binary for processing." },
      { q: "Machine learning models are typically:", correct: "Trained on data to improve their predictions", wrong: ["Hard-coded with every possible answer", "Unable to process images", "The same as rule-based lookups"], ex: "ML infers patterns from training data rather than following fixed rules." },
    ]),
  ],
  // 7. Algorithm design and problem-solving
  "7": [
    (r) => {
      const vals = r.shuffle([3, 7, 11, 15, 19, 23]);
      const target = r.pick(vals);
      const sorted = [...vals].sort((a, b) => a - b);
      const idx = sorted.indexOf(target);
      let lo = 0, hi = sorted.length - 1, steps = 0;
      while (lo <= hi) { steps++; const mid = Math.floor((lo + hi) / 2); if (sorted[mid] === target) break; if (sorted[mid] < target) lo = mid + 1; else hi = mid - 1; }
      return numericMcq(r, `A binary search on the ordered list ${sorted.join(", ")} looks for ${target}. How many steps (probe comparisons) are needed in the worst case for this list?`,
        steps, [steps + 2, 1, sorted.length],
        `Halving: probe ${sorted[Math.floor((0 + sorted.length - 1) / 2)]}, then narrow → ${steps} comparison${steps > 1 ? "s" : ""}.`);
    },
    () => poolQ(null, [
      { q: "A flowchart decision symbol is:", correct: "A diamond", wrong: ["A rectangle", "An oval", "A parallelogram"], ex: "Diamonds test Yes/No conditions; ovals start/stop; rectangles are processes." },
      { q: "Pseudocode is:", correct: "Structured plain-language used to plan algorithms before coding", wrong: ["A programming language that runs directly", "Machine code", "A type of flowchart"], ex: "Pseudocode sketches logic precisely without language syntax." },
      { q: "Linear search differs from binary search because linear search:", correct: "Works on unordered data but checks items one by one", wrong: ["Is always faster", "Requires sorted data", "Cannot find a missing item"], ex: "Linear = any order, O(n); binary = sorted only, O(log n)." },
    ]),
  ],
  // 8. Programming
  "8": [
    (r) => {
      const a = r.int(3, 9), b = r.int(2, 6);
      return numericMcq(r, `Pseudocode: x ← ${a}; y ← ${b}; x ← x + y; y ← x − y. What is y at the end?`, a, [b, a + b, a - b],
        `x becomes ${a + b}; y = (${a + b}) − ${b} = ${a}.`);
    },
    (r) => {
      const n = r.pick([3, 4, 5]);
      let s = 0;
      for (let i = 1; i <= n; i++) s += i;
      return numericMcq(r, `Pseudocode: total ← 0; FOR i ← 1 TO ${n}: total ← total + i. What is total?`, s, [s + n, n * n, n],
        `Adds 1+2+…+${n} = ${s}.`);
    },
    () => poolQ(null, [
      { q: "A WHILE loop is best when:", correct: "The number of repetitions is not known in advance", wrong: ["The loop must run exactly 10 times", "No condition is needed", "Speed matters more than correctness"], ex: "WHILE repeats until a condition changes — count unknown up front." },
      { q: "A variable's data type determines:", correct: "What values it can hold and the operations allowed on it", wrong: ["Only its name", "How fast the CPU runs", "The screen resolution"], ex: "Types (INTEGER, STRING, BOOLEAN…) define the value domain and valid operations." },
      { q: "Validation checks:", correct: "Whether input is sensible/allowed (range, type, length)", wrong: ["That the user is who they claim", "That the program compiles", "That data is encrypted"], ex: "Validation screens input format/reasonableness; verification checks data matches the source." },
    ]),
  ],
  // 9. Databases
  "9": [
    () => poolQ(null, [
      { q: "A primary key is:", correct: "A field that uniquely identifies each record in a table", wrong: ["Any numeric field", "The first field alphabetically", "A field storing passwords"], ex: "Primary keys must be unique and non-null per record." },
      { q: "In SQL, the statement to fetch data is:", correct: "SELECT", wrong: ["GET", "SHOW", "PRINT"], ex: "SELECT retrieves rows matching FROM/WHERE clauses." },
      { q: "A foreign key:", correct: "Links a field in one table to the primary key of another", wrong: ["Uniquely identifies records in its own table", "Is always encrypted", "Stores files"], ex: "Foreign keys express relationships between tables." },
    ]),
  ],
  // 10. Boolean logic
  "10": [
    (r) => {
      const A = r.int(0, 1), B = r.int(0, 1);
      return numericMcq(r, `For the expression NOT (A AND B) with A = ${A}, B = ${B}, the output is:`,
        A && B ? 0 : 1, [A && B, 2, "undefined"],
        `A AND B = ${A && B}; NOT gives ${A && B ? 0 : 1}.`);
    },
    (r) => {
      const A = r.int(0, 1), B = r.int(0, 1);
      return numericMcq(r, `For the expression A XOR B with A = ${A}, B = ${B}, the output is:`,
        A !== B ? 1 : 0, [A && B, A || B, 2],
        `XOR is 1 only when inputs differ: ${A} vs ${B} → ${A !== B ? 1 : 0}.`);
    },
    () => poolQ(null, [
      { q: "Which gate is the equivalent of NOT (A AND B)?", correct: "NAND", wrong: ["NOR", "XOR", "AND"], ex: "NAND = NOT(AND) by definition — De Morgan's first gate identity." },
      { q: "The truth table of OR has how many output 1s (2 inputs)?", correct: "3", wrong: ["1", "2", "4"], ex: "00→0, 01→1, 10→1, 11→1: three 1s." },
    ]),
  ],
};

// Map CS sub-section numbers to parent topic sections for quiz grouping.
export const CS_PARENT = {
  "1.1": "1", "1.2": "1", "1.3": "1",
  "2.1": "2", "2.2": "2",
  "3.1": "3", "3.2": "3",
  "4.1": "4", "4.2": "4",
  "5.1": "5", "5.2": "5",
  "6.1": "6", "6.2": "6",
  "7.1": "7", "7.2": "7",
  "8.1": "8", "8.2": "8",
  "9.1": "9", "9.2": "9",
  "10.1": "10", "10.2": "10",
};
