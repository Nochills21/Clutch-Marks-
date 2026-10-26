// Computer Science OL batch 1: written directly from the official Cambridge
// IGCSE Computer Science 0478 (2026-2028) subject content list.
// Paper 1 Topic 1 Data representation (1.1 Number systems, 1.2 Text sound and
// images, 1.3 Data storage and compression) and Topic 3 Hardware (3.1 Computer
// architecture, 3.2 Input and output devices, 3.3 Data storage). Every trace is
// shown line by line. BCD (present in the replaced note) is NOT in the current
// syllabus and has been removed. Apply with:
//   node .freebuff/deepen-materials.cjs .freebuff/content-cs-ol-depth.cjs > .freebuff-tmp/cs-ol-depth-1.sql
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/cs-ol-depth-1.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/cs-ol-depth-1.sql --apply    (live)
//   node .freebuff/gate-notes-depth.cjs computer-science OL
module.exports = {
  expectType: "notes",
  titles: {
    "fc1ffd6d-f913-4c5a-9336-ec908c9223ec": "IGCSE Computer Science: Hardware and Architecture",
    "3dd6d5c0-35ea-44c6-8f24-ad74aad0d101": "IGCSE Computer Science: Data Representation",
  },
  rows: {
    "fc1ffd6d-f913-4c5a-9336-ec908c9223ec": `
<h2>IGCSE Computer Science: Hardware and Architecture</h2>
<p>Cambridge IGCSE Computer Science 0478 (2026–2028), Paper 1 Computer Systems, Topic 3 Hardware: statement 3.1 Computer architecture, 3.2 Input and output devices, and 3.3 Data storage. This is where the physical machine is opened up: what a CPU actually does with machine code, how instructions and data travel around the system, and how storage technologies differ. Every fetch–execute cycle below is traced register by register, because Paper 1 routinely asks you to follow the cycle through a memory dump — and that question is free marks once you have traced it a dozen times.</p>

<h3>Hardware, firmware and software: the layers</h3>
<p>Before the parts, the big picture — and the analogy that makes the whole topic click. A computer system is a factory. The <strong>hardware</strong> is the building and machines (physical, touchable). The <strong>software</strong> is the list of orders the factory must carry out (instructions, intangible). <strong>Firmware</strong> is software permanently etched into a chip — like the safety rules bolted to the wall: it survives a power cut and tells the hardware how to start. The operating system is the factory manager, deciding which order runs when and which machine each order may use.</p>

<h3>The stored-program concept and Von Neumann architecture</h3>
<p>Early machines had to be rewired for every new task. The breakthrough of the <strong>stored-program concept</strong> is that both the instructions and the data they work on live in the same memory, and the CPU reads instructions from memory and obeys them — no rewiring. In the chef analogy: the recipe (program) and the ingredients (data) sit on the same kitchen shelf; the chef fetches a recipe line, does what it says to the ingredients, and moves to the next line.</p>
<p><strong>Von Neumann architecture</strong> is the standard layout built on that idea:</p>
<ul>
<li><strong>CPU</strong> — the processor, containing the control unit (CU), the arithmetic logic unit (ALU) and registers.</li>
<li><strong>Main memory</strong> — RAM (and ROM), holding both program instructions and data.</li>
<li><strong>Input and output devices</strong> — the system's contact with the outside world.</li>
<li><strong>Buses</strong> — the cables connecting them: address, data and control.</li>
</ul>
<p>Its famous weakness is the <strong>Von Neumann bottleneck</strong>: instructions and data share one memory and one set of buses, so the CPU can fetch only one thing at a time and spends much of its cycle waiting. Caches, pipelining and multiple cores exist largely to hide that bottleneck.</p>

<h3>Inside the CPU</h3>
<p>The <strong>control unit</strong> fetches and decodes instructions and orchestrates the rest of the machine; it is the foreman. The <strong>ALU</strong> performs arithmetic (add, subtract, multiply, divide) and logic (comparisons, AND/OR/NOT); it is the workbench. <strong>Registers</strong> are tiny, extremely fast storage locations inside the CPU — the foreman's desk, where the handful of items being worked on right now are kept.</p>
<table border="1" cellpadding="6">
<tr><th>Register</th><th>Full name</th><th>What it holds</th></tr>
<tr><td>PC</td><td>Program counter</td><td>The memory address of the next instruction to fetch</td></tr>
<tr><td>MAR</td><td>Memory address register</td><td>The address currently being read from or written to</td></tr>
<tr><td>MDR</td><td>Memory data register (also called MBR)</td><td>The data or instruction just fetched, or about to be written</td></tr>
<tr><td>CIR</td><td>Current instruction register</td><td>The instruction being decoded and executed</td></tr>
<tr><td>ACC</td><td>Accumulator</td><td>The result of the last ALU calculation</td></tr>
</table>
<p>The <strong>clock</strong> paces the CPU: each tick synchronises one step, and the clock speed (measured in GHz) is the number of ticks per second. <strong>Cache</strong> is small, very fast memory inside or beside the CPU holding copies of recently used data and instructions — a cache hit saves a slow trip to RAM. <strong>Cores</strong> are independent processing units; more cores mean more instructions can be completed simultaneously, provided the software is written to use them.</p>

<h3>The buses</h3>
<table border="1" cellpadding="6">
<tr><th>Bus</th><th>Direction</th><th>Carries</th><th>Width matters because</th></tr>
<tr><td>Address bus</td><td>CPU to memory/peripherals (one-way)</td><td>Memory addresses</td><td>More address lines mean more memory can be addressed (n lines address 2ⁿ locations)</td></tr>
<tr><td>Data bus</td><td>Both ways</td><td>Instructions and data</td><td>More lines mean more bits per transfer, so wider = faster</td></tr>
<tr><td>Control bus</td><td>Both ways</td><td>Signals: read, write, clock, interrupt, reset</td><td>Coordinates who does what and when</td></tr>
</table>

<h3>The fetch–decode–execute cycle</h3>
<p>Every program is a list of instructions in memory, and the CPU runs them one at a time in a repeating three-stage cycle. Fetch: get the instruction. Decode: work out what it means. Execute: do it. Then the cycle repeats — millions of times per second.</p>
<p>Memory holds addresses like a street of numbered houses. Suppose memory looks like this before the program runs:</p>
<pre><code>Address   Contents   Meaning
  5       0010 1000  LOAD 8        (copy the value at address 8 into the ACC)
  6       0011 1001  ADD 9         (add the value at address 9 to the ACC)
  7       0100 1010  STORE 10      (copy the ACC into address 10)
  8       0000 0101  the value 5
  9       0000 0011  the value 3
 10       0000 0000  (empty)</code></pre>
<p>Trace the whole run, register by register. The first two bits of each instruction are the opcode (the operation) and the remaining six bits are the operand (the address to work on).</p>
<pre><code>Cycle 1 - FETCH of LOAD 8:
  PC = 5. The PC's value is copied to the MAR: MAR = 5.
  The control bus sends a READ signal; memory returns the contents of address 5.
  The instruction arrives in the MDR: MDR = 0010 1000.
  The MDR's value is copied to the CIR: CIR = 0010 1000. PC is incremented: PC = 6.
Cycle 1 - DECODE:
  The control unit reads the opcode 00 = LOAD: copy the value at the operand address to the ACC.
Cycle 1 - EXECUTE:
  The operand is 01 1000 = address 8. MAR = 8; READ; MDR = 0000 0101 (the value 5).
  ACC = 5.

Cycle 2 - FETCH of ADD 9:
  PC = 6 -> MAR = 6; READ; MDR = 0011 1001; CIR = 0011 1001; PC = 7.
Cycle 2 - DECODE:
  Opcode 01 = ADD: add the value at the operand address to the ACC.
Cycle 2 - EXECUTE:
  Operand 01 1001 = address 9. MAR = 9; READ; MDR = 0000 0011 (the value 3).
  ALU computes ACC + MDR = 5 + 3 = 8. ACC = 8.

Cycle 3 - FETCH of STORE 10:
  PC = 7 -> MAR = 7; READ; MDR = 0100 1010; CIR = 0100 1010; PC = 8.
Cycle 3 - DECODE:
  Opcode 10 = STORE: copy the ACC into the operand address.
Cycle 3 - EXECUTE:
  Operand 01 1010 = address 10. MAR = 10; MDR = 8 (from the ACC); a WRITE signal
  stores it. Address 10 now holds 0000 1000. The program stops (STOP instruction).</code></pre>
<p>Notice the pattern examiners look for: <strong>PC → MAR → (READ) → MDR → CIR</strong> for the fetch, PC incremented after the fetch, and the execute stage differing per opcode. An <strong>interrupt</strong> (a signal from a device demanding attention, like a keypress or timer) pauses the cycle between instructions: the CPU finishes the current instruction, saves the PC, jumps to an interrupt service routine, then returns.</p>

<h3>What makes a processor faster</h3>
<ul>
<li><strong>More clock cycles per second (GHz)</strong> — each instruction is paced by the clock; more ticks per second means more instructions per second, other things equal.</li>
<li><strong>More cores</strong> — several CPUs on one chip work on different tasks simultaneously.</li>
<li><strong>Larger cache</strong> — more of the working data sits close to the CPU, so fewer slow RAM accesses.</li>
<li><strong>Wider data bus</strong> — more bits move per transfer.</li>
<li><strong>Instruction set</strong> — the set of operations a CPU understands. RISC processors use few simple instructions, each executed in one clock cycle; CISC processors have many complex instructions, each taking several cycles but needing fewer instructions per task. Say what the difference <em>does</em>: fewer cycles per instruction versus fewer instructions per task.</li>
</ul>
<pre><code>Worked example: a processor runs at 2.0 GHz and each instruction takes 4 cycles.

2.0 GHz = 2.0 x 10^9 cycles per second
instructions per second = 2.0 x 10^9 / 4 = 5.0 x 10^8

So 500 million instructions per second. Clock speed alone is not the whole story:
a 2.0 GHz CPU needing 4 cycles per instruction matches a 4.0 GHz CPU needing 8.</code></pre>

<h3>Embedded systems</h3>
<p>An <strong>embedded system</strong> is a processor built into a device to run one dedicated task — the microcontroller in a washing machine, engine management unit, microwave, traffic light or digital camera. Characteristics: single function, small and cheap, low power, often real-time (must respond within a deadline), and rarely updated. Advantages: low cost, compact, reliable, energy-efficient. Disadvantages: inflexible, hard to upgrade or repair, and a bug affects the whole appliance. The exam wants the trade-off stated, not just a list of examples.</p>

<h3>Input and output devices</h3>
<table border="1" cellpadding="6">
<tr><th>Device</th><th>Type</th><th>Typical use and why it suits it</th></tr>
<tr><td>Keyboard</td><td>Input</td><td>Entering text and commands quickly and accurately</td></tr>
<tr><td>Mouse / touchscreen</td><td>Input</td><td>Direct graphical manipulation; touchscreens suit kiosks where space or hygiene matters</td></tr>
<tr><td>Scanner / camera</td><td>Input</td><td>Digitising documents and images; OCR software then reads the text</td></tr>
<tr><td>Sensors (temperature, light, pressure, moisture)</td><td>Input</td><td>Automatic measurement in control systems — greenhouses, weather stations, car engines</td></tr>
<tr><td>Microphone</td><td>Input</td><td>Sound capture for recording and voice input</td></tr>
<tr><td>Monitor / projector</td><td>Output</td><td>Visual display; projectors for audiences, monitors for detail</td></tr>
<tr><td>Printer / plotter</td><td>Output</td><td>Hard copy; plotters for large-scale technical drawings</td></tr>
<tr><td>Speakers / headphones</td><td>Output</td><td>Sound reproduction</td></tr>
<tr><td>Actuators (motors, heaters, valves, robotic arms)</td><td>Output</td><td>Physical action in control systems — the hands of an automated system</td></tr>
</table>
<p>The sensor–processor–actuator loop is the heart of every automated system: a sensor measures the world, the microprocessor compares the reading with a target, and the actuator changes the world. Choosing a device is always justified by accuracy, speed, cost and environment.</p>

<h3>Primary storage: RAM and ROM</h3>
<table border="1" cellpadding="6">
<tr><th></th><th>RAM</th><th>ROM</th></tr>
<tr><td>Volatility</td><td>Volatile — contents lost on power off</td><td>Non-volatile — contents survive power off</td></tr>
<tr><td>Read/write</td><td>Both, constantly</td><td>Read only (written at manufacture or by special processes)</td></tr>
<tr><td>Holds</td><td>The running OS, open programs and their data</td><td>Bootstrap/firmware: the start-up instructions that load the OS</td></tr>
<tr><td>Speed/size</td><td>Fast, measured in GB</td><td>Fast, but small (MB)</td></tr>
</table>
<p><strong>Virtual memory</strong> extends RAM by reserving space on the secondary storage device: when RAM fills, less-active pages are swapped to disk. It prevents crashes but is slow, because secondary storage is far slower than RAM — thrashing (constant swapping) can make a machine crawl.</p>

<h3>Secondary storage: magnetic, optical and solid state</h3>
<table border="1" cellpadding="6">
<tr><th>Medium</th><th>How it stores</th><th>Strengths</th><th>Weaknesses</th></tr>
<tr><td>Magnetic (HDD, tape)</td><td>Magnetised regions on spinning platters or tape, read by heads</td><td>Very cheap per GB, huge capacity</td><td>Moving parts: slower, noisy, shock-sensitive; tape is sequential access only</td></tr>
<tr><td>Optical (CD, DVD, Blu-ray)</td><td>Pits and lands burned by laser, read by reflected light</td><td>Cheap, portable, long shelf life, good for archiving and distribution</td><td>Low capacity, slower write speeds, easily scratched</td></tr>
<tr><td>Solid state (SSD, USB flash, memory cards)</td><td>Electrical charges in NAND flash cells</td><td>Very fast, silent, robust (no moving parts), low power</td><td>More expensive per GB, finite number of write cycles</td></tr>
</table>
<p>Compare on the four axes examiners name: capacity, speed (access and transfer), cost per GB, durability and portability. Choose by use case — an SSD for video editing, an HDD for a media archive, flash for a phone, optical for distributing software.</p>
<p><strong>Cloud storage</strong> keeps data on remote servers reached over a network: accessible anywhere, easy to back up and share, with storage that scales without new hardware. Against that: it needs a connection, costs ongoing fees, gives slower access than local storage, and raises privacy and security concerns because data leaves your control. Local storage is fast and offline but vulnerable to loss or theft and limited by device capacity — most systems use both.</p>

<h3>Worked example: choosing storage and reading a memory dump</h3>
<p>A school records 200 hours of video per year at 1 GB per hour and wants 5 years of archive with daily access, plus backups.</p>
<pre><code>Capacity needed: 200 x 1 x 5 = 1000 GB (about 1 TB), plus backup = 2 TB.

HDD: about £45 per TB, random access for daily retrieval, but a mechanical drive
     is the weak point - keep the backup on a second drive or in the cloud.
SSD: faster and more robust but roughly three times the cost per TB.
Optical: about 25 GB per disc - 80 discs for the archive, sequential retrieval
     only - impractical for daily access.
Cloud: no hardware to fail and off-site backup included, but 2 TB of storage
     for 5 years is an ongoing subscription and every retrieval needs the network.

Choice: working copies on an SSD, archive on one or two HDDs, plus cloud backup.</code></pre>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Saying the fetch stage "executes" the instruction. Fetch retrieves; decode interprets; execute acts — and the PC is incremented during the fetch stage, not the execute stage.</li>
<li>Confusing the MAR and the MDR: the MAR holds the address being accessed; the MDR holds the data travelling to or from it.</li>
<li>Claiming RAM is permanent because the computer "remembers" files; files live on secondary storage — RAM is volatile.</li>
<li>Describing the address bus as two-way; only the data bus is two-way.</li>
<li>Listing performance factors without effects: "it has cache" earns nothing; "a larger cache means more data is found without slow RAM access" earns the mark.</li>
<li>Calling a sensor an output device; sensors input data, actuators output action.</li>
<li>Writing that virtual memory "increases RAM"; it borrows secondary storage and is slower — it prevents out-of-memory failures, not slowness.</li>
<li>Forgetting units in capacity calculations (GB vs TB) or mixing up bytes and bits — the classic file-size question trap.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Paper 1, 3 marks).</strong> State the purpose of the program counter and the memory address register in the fetch–execute cycle.</p>
<p>Answer: The program counter holds the address of the next instruction to be fetched, so the CPU knows where to look in memory; it is incremented after the fetch. The memory address register holds the address currently being accessed (read from or written to) during the cycle.</p>
<p><strong>Question 2 (Paper 1, 4 marks).</strong> Describe what happens to the MDR and CIR during the fetch stage.</p>
<p>Answer: The address in the MAR is sent down the address bus with a READ control signal; memory returns the instruction or data at that address into the memory data register (MDR). The MDR's contents are then copied into the current instruction register (CIR), where the control unit decodes them.</p>
<p><strong>Question 3 (Paper 1, 6 marks).</strong> Compare magnetic and solid-state secondary storage for a laptop used for field research.</p>
<p>Answer: Solid state has no moving parts, so it is far more resistant to shock and drops (vital in the field), silent, lighter and much faster, and uses less battery. Against that it costs more per gigabyte and wears out after many write cycles. Magnetic drives offer far more capacity per pound but their spinning platters and heads are damaged by knocks, they are slower and heavier. For field research, robustness and battery life dominate, so solid state is the better choice.</p>
<p><strong>Question 4 (Paper 1, 4 marks).</strong> Explain what an embedded system is and give two advantages of using one in a washing machine.</p>
<p>Answer: An embedded system is a processor built into a device to perform one dedicated task, running firmware rather than a general-purpose OS. In a washing machine it is cheap to mass-produce, small enough to fit inside the appliance, low-power, and reliable because there is no general-purpose software to fail — the machine does its one job well and quickly boots each time.</p>
<p><strong>Question 5 (Paper 1, 5 marks).</strong> A CPU runs at 3.0 GHz and averages 5 cycles per instruction. Calculate its instruction rate and explain why a 2.0 GHz CPU with 2 cycles per instruction could be faster.</p>
<p>Answer: 3.0 × 10⁹ cycles/second ÷ 5 = 6.0 × 10⁸ instructions per second. The 2.0 GHz CPU gives 2.0 × 10⁹ ÷ 2 = 1.0 × 10⁹ instructions per second — higher despite the lower clock, because instructions per second depends on both clock speed and cycles per instruction, not clock speed alone.</p>
<p><strong>Question 6 (Paper 1, 3 marks).</strong> Explain the purpose of virtual memory and one disadvantage of using it.</p>
<p>Answer: When RAM is full, the operating system moves less-active programs and data to a reserved area of secondary storage (the swap file), freeing RAM so programs keep running instead of crashing. Disadvantage: secondary storage is far slower than RAM, so swapping causes noticeable slowdowns — especially thrashing, where the system spends its time swapping rather than working.</p>
<p>With the machine understood at the hardware level, the next question is how it represents everything it knows: data representation.</p>
`,

    "3dd6d5c0-35ea-44c6-8f24-ad74aad0d101": `
<h2>IGCSE Computer Science: Data Representation</h2>
<p>Cambridge IGCSE Computer Science 0478 (2026–2028), Paper 1 Computer Systems, Topic 1 Data representation: statement 1.1 Number systems, 1.2 Text, sound and images, and 1.3 Data storage and compression. Everything inside a computer — numbers, letters, photographs, music — is stored as patterns of bits, and this note explains exactly how each kind of value becomes binary and how much space it takes. Every conversion and calculation is shown step by step, because in the exam the working carries most of the marks.</p>

<h3>Why binary, and how place value works</h3>
<p>Computers are built from billions of tiny switches. A switch is either off or on, and those two states are the only thing hardware can reliably store and detect — so all information is encoded with two symbols, 0 and 1. Denary (base 10) has ten digits because we have ten fingers; binary (base 2) has two digits because a switch has two states. The rules of arithmetic are identical — only the number of digits differs.</p>
<pre><code>Place values in binary:   128  64  32  16  8  4  2  1
Example: 1 0 1 1 0 1 1 0
= 128 + 32 + 16 + 4 + 2 = 182 in denary        [add the values of the 1-bits]</code></pre>
<p><strong>Denary to binary, step by step</strong> (the subtract-powers method, ideal without a calculator):</p>
<pre><code>Convert 149 to binary:

149 is bigger than 128 -> put a 1 in the 128 column, remainder 149 - 128 = 21
21 is smaller than 64  -> 0
21 is smaller than 32  -> 0
21 is bigger than 16   -> 1, remainder 21 - 16 = 5
5 is smaller than 8    -> 0
5 is bigger than 4     -> 1, remainder 5 - 4 = 1
1 is smaller than 2    -> 0
1 is bigger than 1     -> 1, remainder 0

Reading the columns: 149 = 1001 0101</code></pre>
<p>The reverse direction simply adds the column values, as above. A quick check always exists: convert back.</p>

<h3>Hexadecimal</h3>
<p>Hexadecimal (base 16) uses sixteen digits: 0–9 then A–F (A = 10 … F = 15). It exists for a practical reason: one hex digit represents exactly four bits (a nibble), so long binary strings become short and readable — memory dumps, error codes, web colours (#FF8800) and MAC addresses are all written in hex because humans can transcribe them without bit-counting errors.</p>
<pre><code>Binary to hex: 1011 0110
Split into nibbles:   1011 = 11 = B    and    0110 = 6
So 1011 0110 = B6 in hex.

Hex to denary: B6
= 11 x 16 + 6 x 1 = 176 + 6 = 182        [16s column and 1s column]

Denary to hex (via binary): 182 = 1011 0110 = B6.
Or directly by division: 182 ÷ 16 = 11 remainder 6 -> digits 11, 6 -> B6.</code></pre>

<h3>Binary addition and overflow</h3>
<p>Binary addition follows the denary carry rule with one extra fact: 1 + 1 = 10 (write 0, carry 1).</p>
<pre><code>Add 0110 0111 (= 103) and 0011 1010 (= 58), 8-bit, column by column:

bit 0:  1 + 0        = 1                 (write 1, carry 0)
bit 1:  1 + 1        = 0, carry 1        (1 + 1 = 10 in binary)
bit 2:  1 + 0 + 1(c) = 0, carry 1
bit 3:  0 + 1 + 1(c) = 0, carry 1
bit 4:  0 + 1 + 1(c) = 0, carry 1
bit 5:  1 + 1 + 1(c) = 1, carry 1        (three 1s sum to 11: write 1, carry 1)
bit 6:  1 + 0 + 1(c) = 0, carry 1
bit 7:  0 + 0 + 1(c) = 1, carry 0

Result: 1 0 1 0 0 0 0 1 = 1010 0001 = 161. Check: 103 + 58 = 161 ✓
No carry escapes bit 7, so the 8-bit answer is exact and there is no overflow.</code></pre>
<p><strong>Overflow</strong> happens when the result needs more bits than the register holds. If the two numbers are added in 8 bits and a carry comes out of the leftmost column, the answer is wrong for that word length:</p>
<pre><code>Unsigned example: 200 + 100 = 300, which is beyond the 8-bit maximum of 255.

  1100 1000 (= 200) + 0110 0100 (= 100) = 1 0010 1100
  The 9th bit is lost, so the 8-bit answer reads 0010 1100 = 44 - wrong.
  A carry out of the most significant bit reveals the overflow.

Signed example (different rule): 127 + 1 = 128, which is outside the signed
range -128 to +127, so even though no carry leaves bit 7 the result overflows:

  0111 1111 (= 127) + 0000 0001 (= 1) = 1000 0000, which reads as -128.
  Two positives summed to a negative: the sign bits reveal the overflow.</code></pre>
<p>Overflow rules differ for signed (two's complement) numbers: there the sign bit is the tell-tale, and adding two negatives that gives a positive (or vice versa) is overflow.</p>

<h3>Logical binary shifts</h3>
<p>Shifting moves every bit left or right, filling with zeros. Left shift by one multiplies by 2; right shift by one divides by 2 (integer division, discarding the remainder).</p>
<pre><code>0010 1101 (= 45) shifted left one place:  0101 1010 (= 90)      45 x 2 = 90
0010 1101 (= 45) shifted right one place: 0001 0110 (= 22)      45 / 2 = 22 (remainder 1 lost)</code></pre>
<p>Each place shifted doubles or halves the value, so shifting left by n multiplies by 2ⁿ. Bits shifted off the end are lost — which is how quick multiplication can silently overflow.</p>

<h3>Two's complement: negative numbers</h3>
<p>Hardware needs to store negative integers too. In <strong>two's complement</strong> the most significant (leftmost) bit is a sign bit and has a negative place value: for 8 bits the columns are −128, 64, 32, 16, 8, 4, 2, 1. Think of it as odometer arithmetic: a clock with 8 wheels that wraps around, where the top half of the wheel positions are read as negatives.</p>
<pre><code>Write -5 as an 8-bit two's complement number:

Method: write +5, invert every bit, add 1.

+5      = 0000 0101
invert  = 1111 1010        (each 0 becomes 1 and each 1 becomes 0)
add 1   = 1111 1011        = -5

Check with the column values: -128 + 64 + 32 + 16 + 8 + 2 + 1 = -5 ✓</code></pre>
<ul>
<li><strong>Range of 8-bit two's complement:</strong> −128 to +127. (One pattern, 1000 0000, is −128 and there is no positive counterpart — the asymmetry examiners like to test.)</li>
<li><strong>Negating</strong> (turning x into −x): invert all the bits, then add 1. Negating twice returns the original.</li>
<li><strong>Reading a negative directly:</strong> 1111 1011 has sign bit 1, so it is negative; the remaining columns sum to 123; the value is −(128 − 123) = −5.</li>
</ul>
<p><strong>Subtraction becomes addition.</strong> Computers do not subtract; they add the negative, which lets one circuit (the adder) do both jobs:</p>
<pre><code>Calculate 7 - 5 in 8-bit two's complement:

7 = 0000 0111
-5 = 1111 1011        (as above)
Add:  0000 0111 + 1111 1011 = (1) 0000 0010
The carry beyond bit 7 is discarded in two's complement addition.
0000 0010 = 2, and 7 - 5 = 2 ✓</code></pre>
<p><strong>Overflow in signed arithmetic:</strong> the sign bit is the guide. Adding two positives must not give a negative: 0111 1111 (127) + 0000 0001 = 1000 0000, which reads as −128 — overflow, even though no carry escapes the byte. Two negatives giving a positive is overflow the same way.</p>

<h3>Text: character sets</h3>
<p>Text is stored as numbers, and a <strong>character set</strong> is the agreed table mapping numbers to printed symbols. <strong>ASCII</strong> uses 7 bits per character — 128 codes — covering upper- and lower-case Latin letters, digits, punctuation and control codes (like newline). The code for 'A' is 65, 'a' is 97 and '0' is 48; note that upper- and lower-case letters differ by exactly one bit (32), a fact often examined. Extended ASCII adds a further 128 symbols with 8 bits.</p>
<p><strong>Unicode</strong> solves the limitation that 128 symbols cannot cover the world's scripts: it assigns a unique code to well over 100 000 characters from every writing system plus symbols and emoji. UTF-8 stores common characters in 1 byte and rare ones in up to 4 — efficient for web pages, which is why it dominates the internet. More characters per code needs more bits per character, and file size grows accordingly.</p>
<pre><code>Worked example: storing the word "CAT" in ASCII:
C = 67 = 0100 0011
A = 65 = 0100 0001
T = 84 = 0101 0100
Total: 3 characters x 8 bits (stored as bytes) = 24 bits = 3 bytes.</code></pre>

<h3>Sound: sampling</h3>
<p>Sound is a continuous pressure wave — an analogue signal. To store it, the wave is <strong>sampled</strong>: measured at regular intervals, and each measurement is rounded to the nearest available level. Two settings decide the quality:</p>
<ul>
<li><strong>Sample rate</strong> — how many measurements per second (Hz). Higher rate captures higher frequencies and sounds closer to the original.</li>
<li><strong>Sample resolution (bit depth)</strong> — how many bits per measurement. More bits means finer rounding of the amplitude, so less distortion.</li>
</ul>
<pre><code>File size (bits) = sample rate x bit depth x duration in seconds x number of channels

Worked example: 10 seconds of mono CD-quality sound (44 100 Hz, 16 bits):

= 44 100 x 16 x 10 x 1 = 7 056 000 bits
In bytes: 7 056 000 / 8 = 882 000 bytes
In kilobytes: 882 000 / 1024 = 861.3 KB (or /1000 = 882 kB by decimal convention)

Double the sample rate or the bit depth and the file doubles in size.</code></pre>
<p>Raising either setting improves fidelity at the cost of size — the trade-off every sound question turns on.</p>

<h3>Images: bitmaps</h3>
<p>A <strong>bitmap</strong> image is a grid of pixels. Two properties set its size and quality: the <strong>resolution</strong> (pixels across × pixels down) and the <strong>colour depth</strong> (bits per pixel). With 1 bit per pixel you get black and white; 8 bits give 256 greys or colours; 24 bits (8 per RGB channel) give about 16.7 million colours.</p>
<pre><code>File size (bits) = width in pixels x height in pixels x colour depth

Worked example: 800 x 600 pixels at 24-bit colour:

= 800 x 600 x 24 = 11 520 000 bits
In bytes: 11 520 000 / 8 = 1 440 000 bytes = 1.37 MB (or 1.44 MB decimal)

At 8-bit colour the same image is 800 x 600 x 8 = 3 840 000 bits = 480 000 bytes.</code></pre>
<p>The file also stores <strong>metadata</strong>: width, height, colour depth and format information, without which the pixels cannot be interpreted. Higher resolution and colour depth improve quality and raise the file size in direct proportion — the same trade-off as sound.</p>

<h3>Units of data</h3>
<table border="1" cellpadding="6">
<tr><th>Unit</th><th>Symbol</th><th>Size</th></tr>
<tr><td>Bit</td><td>b</td><td>A single 0 or 1</td></tr>
<tr><td>Byte</td><td>B</td><td>8 bits</td></tr>
<tr><td>Kilobyte</td><td>KB</td><td>1024 bytes (binary convention) or 1000 bytes (decimal convention)</td></tr>
<tr><td>Megabyte</td><td>MB</td><td>1024 KB</td></tr>
<tr><td>Gigabyte</td><td>GB</td><td>1024 MB</td></tr>
<tr><td>Terabyte</td><td>TB</td><td>1024 GB</td></tr>
</table>
<p>The bit/byte distinction is the single most common lost mark in size questions: transmission speeds are quoted in bits per second (Mbps), storage in bytes (MB), and confusing the two is a factor-of-eight error. State which convention you use when the question gives sizes.</p>

<h3>Compression</h3>
<p>Compression shrinks data for storage or transmission: faster transfer, less bandwidth, lower storage cost. Two families:</p>
<table border="1" cellpadding="6">
<tr><th></th><th>Lossless</th><th>Lossy</th></tr>
<tr><td>What it does</td><td>Recovers the exact original — redundancy is removed reversibly</td><td>Discards data the human senses are unlikely to miss</td></tr>
<tr><td>Methods</td><td>Run-length encoding (RLE), dictionary methods (ZIP, PNG, FLAC)</td><td>Transform methods throwing away detail (JPEG, MP3)</td></tr>
<tr><td>Used for</td><td>Text, programs, spreadsheets, medical/legal images, archives</td><td>Photographs, music, video, where small losses are acceptable</td></tr>
<tr><td>Quality</td><td>Identical to the original after decompression</td><td>Degrades with each save; repeated compression compounds the loss</td></tr>
</table>
<pre><code>Run-length encoding worked line by line:

Row of pixels: AAAAABBCCCCCCCCDD
Scan for runs:     AAAAA      BB      CCCCCCCC      DD
Count and write:    5A        2B          8C         2D
Compressed: 5A2B8C2D  (9 characters instead of 17)

RLE works when data has long runs; on busy photographs it can even expand the
data, which is why it is used inside other methods rather than alone.</code></pre>
<p>Choosing the method is a reasoning mark: a text document must be lossless (a single wrong character changes its meaning), while a holiday photograph compresses lossily because the eye cannot detect the discarded detail.</p>

<h3>Worked example: a complete size calculation</h3>
<p>A scanner captures a 1024 × 768 image at 24-bit colour and saves it uncompressed, then compressed 6:1. Find both file sizes in MB.</p>
<pre><code>Uncompressed bits = 1024 x 768 x 24 = 18 874 368 bits
Bytes = 18 874 368 / 8 = 2 359 296 bytes
MB = 2 359 296 / 1 048 576 = 2.25 MB

Compressed at 6:1 = 2.25 / 6 = 0.375 MB

Checks: the ratio of widths (1024 = 2^10) suggests round numbers are expected;
a 6:1 lossy reduction keeps the image visually similar for on-screen use.</code></pre>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Confusing bits and bytes: file sizes are bytes; transmission rates are bits per second. Divide bits by 8 to reach bytes, and state the unit in the answer.</li>
<li>Starting binary groupings from the wrong end when converting to hex — always group from the right.</li>
<li>Forgetting the sign bit in two's complement: the leftmost bit has value −128, not +128, and the 8-bit range is −128 to +127.</li>
<li>Negating by inverting bits alone; the "+1" is essential — invert, then add 1.</li>
<li>Leaving a carry in two's complement addition: beyond the 8th bit the carry is discarded, and overflow is judged from the sign bits instead.</li>
<li>Applying the overflow rule of unsigned arithmetic to signed numbers (or vice versa) — unsigned overflow is a carry out of the leftmost bit; signed overflow is two positives summing negative.</li>
<li>Writing the sound or image size formula without all the factors: sound needs rate, depth, duration and channels; images need width, height and colour depth.</li>
<li>Choosing lossy compression for text or program files; those must be restored exactly, so lossless is mandatory.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Paper 1, 3 marks).</strong> Convert 0110 1001 to denary.</p>
<p>Answer: 64 + 32 + 8 + 1 = 105.</p>
<p><strong>Question 2 (Paper 1, 3 marks).</strong> Convert 211 to hexadecimal, showing your working.</p>
<p>Answer: 211 = 1101 0011 in binary (128 + 64 + 16 + 2 + 1). Grouping 1101 = 13 = D and 0011 = 3 gives D3.</p>
<p><strong>Question 3 (Paper 1, 4 marks).</strong> Show how −12 is represented in 8-bit two's complement.</p>
<p>Answer: +12 = 0000 1100. Invert: 1111 0011. Add 1: 1111 0100 = −12. Column check: −128 + 16 + 4 = −12 ✓.</p>
<p><strong>Question 4 (Paper 1, 4 marks).</strong> Calculate the size in MB of 30 seconds of stereo sound sampled at 22 050 Hz with a bit depth of 8.</p>
<p>Answer: 22 050 × 8 × 30 × 2 = 10 584 000 bits. ÷ 8 = 1 323 000 bytes. ÷ 1 048 576 = 1.26 MB.</p>
<p><strong>Question 5 (Paper 1, 3 marks).</strong> A 4 × 4 pixel row reads AAAAAABBCCCCCC. Give its RLE form and state one limitation of RLE.</p>
<p>Answer: 6A2B6C. Limitation: RLE only helps data with long runs; on random or noisy data it saves nothing and can make the file larger, so it is often combined with other methods.</p>
<p><strong>Question 6 (Paper 1, 4 marks).</strong> Explain why a hospital would store X-ray images using lossless compression while a music app uses lossy compression.</p>
<p>Answer: Medical images are diagnostic data: any discarded pixel could hide a detail the radiologist needs, and legal/clinical records must be exact, so lossless methods (which restore the original perfectly) are required even though the files stay large. Music is perceptual: MP3-style compression discards sounds beyond human hearing or masked by louder sounds, and listeners cannot tell the difference, so the far smaller files are worth the imperceptible loss.</p>
<p>Numbers are only one kind of data; the next topic covers how the same bits carry data between machines — data transmission.</p>
`,
  },
};
