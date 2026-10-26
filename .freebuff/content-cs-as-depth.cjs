// Computer Science AS batch 5: Pearson Edexcel IAL Computer Science (YCP11),
// Unit 1 Principles of Computer Science - data representation and data types,
// structure of computer systems (CPU, assembly, bit manipulation, parallel
// processing, virtual machines), and hardware, logic gates and Boolean algebra.
// Written from the spec's unit content, line-by-line traces throughout. Apply:
//   node .freebuff/deepen-materials.cjs .freebuff/content-cs-as-depth.cjs > .freebuff-tmp/cs-as-depth-1.sql
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/cs-as-depth-1.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/cs-as-depth-1.sql --apply    (live)
//   node .freebuff/gate-notes-depth.cjs computer-science AS
module.exports = {
  expectType: "notes",
  titles: {
    "38530bbf-b762-49dc-9a91-707b477f6a0c": "Edexcel IAL Computer Science: Data Representation and Data Types",
    "a836a83d-d4a7-469e-8654-2518686bb60e": "Edexcel IAL Computer Science: Processor Fundamentals and Architecture",
    "a5a4ad94-c42a-4993-87dc-62e555d836b9": "Edexcel IAL Computer Science: Hardware, Logic Gates and Boolean Algebra",
  },
  rows: {
    "38530bbf-b762-49dc-9a91-707b477f6a0c": `
<h2>Edexcel IAL Computer Science: Data Representation and Data Types</h2>
<p>Pearson Edexcel International Advanced Level in Computer Science, Unit 1 Principles of Computer Science: data representation — number systems, binary arithmetic, fixed- and floating-point numbers, text, images, sound and compression — together with the data types that programs declare over that raw binary. Everything below is derived or traced digit by digit: every conversion, every normalisation step and every rounding is shown in full, because at A Level the examiner asks not just for the result but for the mechanism. If the IGCSE course taught you that computers store bits, this note explains exactly how those bits stand for every value a program can hold.</p>

<h3>Place value and number systems</h3>
<p>Any number system is a place-value system: a digit's value depends on where it sits, and each column is a power of the base. Denary uses base 10 (columns 1, 10, 100…); binary uses base 2 (columns 1, 2, 4, 8…); hexadecimal uses base 16 (columns 1, 16, 256…, with digits 0–9 and A–F for 10–15). The only thing that changes between bases is which powers the columns represent.</p>
<pre><code>Denary 347, read as place value:
  3 x 10^2 + 4 x 10^1 + 7 x 10^0 = 300 + 40 + 7 = 347

Binary 1010 1101, read the same way:
  1x128 + 0x64 + 1x32 + 0x16 + 1x8 + 1x4 + 0x2 + 1x1
  = 128 + 32 + 8 + 4 + 1 = 173

Hex AD, read as place value:
  A x 16 + D x 1 = 10 x 16 + 13 x 1 = 173        [same value, three notations]</code></pre>
<pre><code>Denary to binary by repeated division (the general method for any base):

  173 / 2 = 86  remainder 1   <- least significant bit (bottom of the column)
   86 / 2 = 43  remainder 0
   43 / 2 = 21  remainder 1
   21 / 2 = 10  remainder 1
   10 / 2 =  5  remainder 0
    5 / 2 =  2  remainder 1
    2 / 2 =  1  remainder 0
    1 / 2 =  0  remainder 1   <- most significant bit

  Read the remainders bottom to top: 1010 1101 = 173.

Denary to hex uses base 16 the same way:
  173 / 16 = 10 remainder 13   (10 = A, 13 = D)
  10 / 16 =  0 remainder 10
  Read bottom to top: AD.</code></pre>
<p>Hexadecimal matters for humans, not machines: one hex digit maps exactly to four bits (a nibble), so memory dumps, error codes and colour values (#FF8800) can be transcribed without bit-counting errors.</p>

<h3>Binary arithmetic</h3>
<pre><code>Addition - the four rules of a single column:
  0 + 0 = 0
  0 + 1 = 1
  1 + 1 = 10   (write 0, carry 1)
  1 + 1 + 1 (with carry) = 11   (write 1, carry 1)

Worked: 1011 0110 (= 182) + 0110 1001 (= 105), column by column:

  bit 0: 0 + 1       = 1
  bit 1: 1 + 0       = 1
  bit 2: 1 + 0       = 1
  bit 3: 0 + 1       = 1
  bit 4: 1 + 0       = 1
  bit 5: 0 + 1       = 1
  bit 6: 1 + 1       = 0, carry 1
  bit 7: 1 + 0 + 1(c)= 0, carry 1

  Result with the final carry: 1 0011 1111 = 287.
  Check: 182 + 105 = 287 ✓

  The carry out of bit 7 is a 9th bit that 8 bits cannot hold: in 8-bit
  storage the answer would read 0011 1111 = 63, which is wrong - that is
  overflow, and exam questions deliberately set it.</code></pre>
<p>Two's complement subtraction uses addition with a negated operand, so one adder circuit does both jobs — see below. Multiplication is repeated addition (or shift-and-add: multiplying by 2 is a left shift); division is repeated subtraction or a right shift.</p>

<h3>Two's complement: signed integers</h3>
<p>Storing negative numbers needs a convention. In <strong>two's complement</strong> the most significant bit carries a negative weight (for 8 bits: −128, 64, 32, …, 1), giving a range of −128 to +127. The construction rule (invert all bits, then add 1) comes from the requirement that negation must be its own inverse and that zero must have exactly one representation.</p>
<pre><code>Write -53 in 8-bit two's complement, every step:

  +53 in binary:        0 0 1 1 0 1 0 1
  invert every bit:     1 1 0 0 1 0 1 0
  add 1:                1 1 0 0 1 0 1 1   = -53

Check with the column weights:
  -128 + 64 + 0 + 0 + 8 + 0 + 2 + 1 = -53 ✓

Subtraction as addition: 37 - 53
  37  = 0 0 1 0 0 1 0 1
 -53  = 1 1 0 0 1 0 1 1
 add:  (1) 1 1 1 1 0 0 0 0
  The carry out of bit 7 is DISCARDED in two's complement arithmetic.
  1111 0000 = -128 + 64 + 32 + 16 = -16. And 37 - 53 = -16 ✓</code></pre>
<ul>
<li><strong>Range of n-bit two's complement:</strong> −2ⁿ⁻¹ to 2ⁿ⁻¹ − 1. The asymmetry (no +128) exists because zero takes the pattern that would otherwise be "negative zero".</li>
<li><strong>Overflow test:</strong> signed overflow occurs when adding two positives gives a negative, or two negatives gives a positive — the sign bit is the witness. Unsigned overflow is a carry out of the MSB.</li>
<li><strong>Arithmetic shift right</strong> preserves the sign bit (copies it into the vacated position), dividing a negative number by 2 correctly; a logical shift fills with zeros and would corrupt negatives.</li>
</ul>

<h3>Fixed-point and floating-point numbers</h3>
<p>Real numbers cannot all be stored exactly in finite bits, so a convention is needed. <strong>Fixed point</strong> reserves a fixed number of bits for the integer part and the fraction (a hidden binary point, like writing money as pence). It is fast and exact within its range but rigid: 8.4 fixed point cannot represent very large and very small numbers at once.</p>
<p><strong>Floating point</strong> is binary scientific notation: value = mantissa × 2^(exponent − bias), stored in three fields — sign, exponent (biased), mantissa (normalised).</p>
<pre><code>Store 5.75 in an 8-bit float with 4-bit exponent (bias 7) and 4-bit mantissa.

1. Convert to binary:  5.75 = 101.11   [4 + 1 + 0.5 + 0.25]
2. Normalise: 101.11 = 1.0111 x 2^2   [leading digit before the point is 1]
3. Mantissa: store the fraction after the point: 0111 (the leading 1 is
   implicit - "hidden bit" - saving one bit).
4. Exponent: 2 + bias 7 = 9 = 1001.
5. Sign: 0 (positive).

  0 | 1001 | 0111
  s   exp    mantissa

Decode the same way: exponent 1001 = 9 - 7 = 2; mantissa 1.0111;
1.0111 x 2^2 = 101.11 = 5.75 ✓</code></pre>
<p><strong>Normalisation</strong> maximises precision by forcing the leading mantissa bit to be 1 (for two's-complement mantissas, 0.1… for positives, 1.0… for negatives — the pattern chosen so no precision is wasted). An unnormalised float wastes mantissa bits on leading zeros.</p>
<p><strong>Denormalisation / underflow and overflow:</strong> a number too small for the exponent field underflows to zero (or a denormal); too large overflows to "infinity". <strong>Rounding errors</strong> are inherent: 0.1 has no finite binary expansion, so (0.1 + 0.2 = 0.30000000000000004 in most languages). Quantisation error (rounding to the nearest representable value) is why money is stored in integer pence, not floats — an exam favourite.</p>
<pre><code>Arithmetic with the 5.75 float encoding: add 2.5.

  2.5 = 10.1 = 1.01 x 2^1 -> exponent 1 + 7 = 8 = 1000, mantissa 0100
  To add, align exponents: shift the smaller mantissa right by (2-1)=1.
      1.0111 x 2^2
    + 0.1010 x 2^2      (1.010 x 2^1 shifted)
    ----------------
      10.0001 x 2^2
  Renormalise: 1.00001 x 2^3 -> mantissa 0000 (only 4 bits kept!), exponent 10.
  Answer: 1000.0 = 8. The true sum 5.75 + 2.5 = 8.25 - the lost fractional
  bits are precision loss, and questions ask you to name it.</code></pre>

<h3>Text, characters and codes</h3>
<p>Characters are stored as agreed numeric codes. <strong>ASCII</strong> (7-bit, 128 codes: A = 65, a = 97, 0 = 48) covers Latin text and control codes; <strong>extended ASCII</strong> adds 128 more with 8 bits. <strong>Unicode</strong> (up to 21 bits per code point, over 140 000 characters) covers world scripts and emoji; UTF-8 stores common characters in 1 byte and rare ones in up to 4 — variable width, backwards compatible with ASCII, dominant on the web. <strong>Errors</strong> in text data are detected with parity bits or checksums at transmission level.</p>

<h3>Images and sound at A Level depth</h3>
<p>Multimedia data — graphics, images, sound and video — is where the representation choices become visible trade-offs between quality and size. Every format below is a different answer to the same question: which parts of the signal are worth keeping?</p>
<table border="1" cellpadding="6">
<tr><th>Media</th><th>Representation</th><th>Key size factors</th><th>Formats</th></tr>
<tr><td>Graphics (bitmap)</td><td>Grid of pixels</td><td>Width × height × colour depth</td><td>BMP, PNG, JPEG</td></tr>
<tr><td>Graphics (vector)</td><td>Shape equations and coordinates</td><td>Number of shapes and curves</td><td>SVG, PDF, CAD files</td></tr>
<tr><td>Sound</td><td>Samples of amplitude</td><td>Sample rate × bit depth × duration × channels</td><td>WAV, FLAC, MP3</td></tr>
<tr><td>Video</td><td>Frames of images plus sampled audio</td><td>Frame size × colour depth × frame rate × duration</td><td>MP4, MKV</td></tr>
</table>
<p><strong>Bitmap images</strong>: file size in bits = width × height × colour depth, plus metadata (dimensions, depth, DPI). 24-bit colour stores 8 bits each of red, green and blue (0–255 per channel); 1-bit is monochrome; palette modes (4-bit, 8-bit) index a colour table. Resolution (pixels) versus DPI (print density) are different ideas — the classic confusion. <strong>Vector graphics</strong> store shape equations (points, lines, Bézier curves, fills) and render at any resolution — smaller for logos and CAD, resolution-independent, but expensive for photorealistic images.</p>
<p><strong>Sound</strong> is sampled: sample rate (Hz) × bit depth × duration × channels. Quantisation error (rounding each sample to the nearest level) and aliasing (insufficient sample rate; fixed by sampling at more than twice the highest frequency — Nyquist) are the A Level additions over IGCSE.</p>
<pre><code>Worked: 60 seconds of stereo, 44.1 kHz, 16-bit, then compressed 4:1.

  bits = 60 x 44 100 x 16 x 2 = 84 672 000 bits
  bytes = 84 672 000 / 8 = 10 584 000 bytes
  MB (binary) = 10 584 000 / 1 048 576 = 10.09 MB
  compressed = 10.09 / 4 = 2.52 MB</code></pre>

<h3>Compression</h3>
<p><strong>Lossless</strong> methods remove statistical redundancy and restore the original exactly: <strong>run-length encoding</strong> (store runs as counts — great for large flat areas), <strong>dictionary compression</strong> (LZW-style: replace repeated strings with references to a dictionary — ZIP, PNG, GIF), and Huffman-style frequency coding (short codes for frequent symbols). <strong>Lossy</strong> methods discard perceptually minor detail: JPEG (frequency-domain discard), MP3 (psychoacoustic masking), used where the eye or ear cannot detect the loss. Choosing: documents and code demand lossless; photographs and music accept lossy.</p>

<h3>Data types and abstraction</h3>
<p>A <strong>data type</strong> defines a set of values and the valid operations on them: INTEGER (whole numbers, arithmetic), REAL (decimals, arithmetic with rounding), CHAR (single symbol), STRING (sequences of chars), BOOLEAN (true/false), DATE/TIME, plus user-defined types. <strong>Abstract data types</strong> (covered fully in the A2 notes) separate what a structure does from how it is stored. Casting between types has rules: integer to real is exact; real to integer truncates or rounds — 7.9 becomes 7 (truncate) or 8 (round); char to int gives its character code ('A' → 65).</p>

<h3>Worked example: one value, three representations</h3>
<pre><code>The character 'K', the number -20, and the fraction 0.125 in the same memory:

'K'  : ASCII 75 = 0100 1011 (1 byte)
-20  : two's complement 8-bit: invert 0001 0100 -> 1110 1011, add 1 ->
       1110 1100. Check: -128 + 64 + 32 + 8 + 4 = -20 ✓
0.125: 0.001 binary exactly (2^-3). In the 4-bit-mantissa float: 1.0 x 2^-3;
       exponent -3 + 7 = 4 = 0100; mantissa 0000; value 0 | 0100 | 0000.
       Decode: 1.0000 x 2^-3 = 0.125 ✓

Same bytes, three meanings - the type system decides the interpretation.</code></pre>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Reading division remainders top-down instead of bottom-up in base conversion.</li>
<li>Grouping bits from the wrong end when converting binary to hex.</li>
<li>Treating the MSB of two's complement as +128 instead of −128, and applying unsigned overflow rules to signed arithmetic (or vice versa).</li>
<li>Forgetting the "+1" when negating, or negating twice without checking.</li>
<li>Omitting the normalisation step in floating-point questions (value = 1.mantissa × 2^(exp−bias)), or dropping the hidden bit when decoding.</li>
<li>Confusing resolution with DPI, or bits with bytes in size calculations (×8 / ÷8).</li>
<li>Claiming floats store money safely: quantisation error makes integer minor units the correct choice.</li>
<li>Choosing lossy compression for data that must restore exactly (text, executables, medical images).</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Unit 1, 4 marks).</strong> Convert 0.375 to 8-bit binary fixed point (4 integer, 4 fraction bits) and to normalised floating-point form.</p>
<p>Answer: 0.375 = 0.011₂ (0.25 + 0.125). Fixed point 4.4: 0000.0110. Floating point: 1.1 × 2⁻² (normalised), mantissa 1000 (after the hidden 1), exponent −2 + bias.</p>
<p><strong>Question 2 (Unit 1, 4 marks).</strong> Show how −29 is stored in 8-bit two's complement and verify it.</p>
<p>Answer: +29 = 0001 1101; invert = 1110 0010; add 1 = 1110 0011. Verification: −128 + 64 + 32 + 2 + 1 = −29 ✓.</p>
<p><strong>Question 3 (Unit 1, 5 marks).</strong> Explain normalisation and why a floating-point number is stored normalised.</p>
<p>Answer: Normalisation rewrites the mantissa so the first significant bit is directly before the binary point (1.m × 2^e), by shifting the point and adjusting the exponent. This maximises the precision of the stored mantissa: with a fixed number of mantissa bits, leading zeros would waste bits carrying no information. The leading 1 can then be implied (hidden bit), extending precision by one bit, and every value has exactly one encoding, so equality comparisons work.</p>
<p><strong>Question 4 (Unit 1, 4 marks).</strong> Calculate the size in MB of an uncompressed 1600 × 1200 image at 8-bit colour, and state its size after 5:1 lossless compression.</p>
<p>Answer: 1600 × 1200 × 8 = 15 360 000 bits; ÷ 8 = 1 920 000 bytes; ÷ 1 048 576 = 1.83 MB. At 5:1 compression: 1.83 ÷ 5 = 0.366 MB, with the original exactly recoverable.</p>
<p><strong>Question 5 (Unit 1, 3 marks).</strong> Explain why (0.1 + 0.2) ≠ 0.3 in floating-point arithmetic.</p>
<p>Answer: 0.1 and 0.2 have no finite binary expansions, so each is rounded to the nearest representable floating-point value when stored; the tiny rounding errors carry into the sum, giving 0.30000000000000004. Floating-point arithmetic is therefore approximate — which is why financial calculations use integer pence.</p>
<p><strong>Question 6 (Unit 1, 4 marks).</strong> Compare vector and bitmap graphics for a company logo.</p>
<p>Answer: A logo must scale from a favicon to a billboard. Vector graphics store shape definitions (points, curves, fills), so they scale without pixelation, have small file sizes for simple art and are easily recoloured. Bitmaps store a fixed pixel grid: enlarging one pixelates and inflates the file. Vector is therefore correct for logos; bitmap suits photographs.</p>
<p>From the raw bits, the next step up is the machine that manipulates them: the processor.</p>
`,

    "a836a83d-d4a7-469e-8654-2518686bb60e": `
<h2>Edexcel IAL Computer Science: Processor Fundamentals and Architecture</h2>
<p>Pearson Edexcel International Advanced Level in Computer Science, Unit 1 Principles of Computer Science (with Unit 3 systems architecture depth): CPU architecture and the fetch–decode–execute cycle, assembly language and bit manipulation, and processors, parallel processing and virtual machines. Every cycle below is traced register by register, and every assembly instruction is annotated with its effect on memory and the accumulator — because the exam hands you a memory dump and asks for the cycle's exact state at each step.</p>

<h3>The stored-program machine</h3>
<p>The <strong>Von Neumann architecture</strong> stores program instructions and data in the same memory, fetched by the CPU over shared buses: CPU (control unit, ALU, registers), main memory, backing storage, and input/output, joined by the address, data and control buses. Its weakness, the <strong>Von Neumann bottleneck</strong>, is that instruction and data traffic contend for one path — the motivation for caches, pipelines and Harvard-style split paths (separate instruction and data caches) in modern designs.</p>

<h3>CPU components and registers</h3>
<table border="1" cellpadding="6">
<tr><th>Register</th><th>Role in the cycle</th></tr>
<tr><td>Program counter (PC)</td><td>Holds the address of the next instruction; incremented after the fetch</td></tr>
<tr><td>Memory address register (MAR)</td><td>Holds the address being accessed on this bus transfer</td></tr>
<tr><td>Memory data register (MDR/MBR)</td><td>Holds the instruction or data just fetched or about to be written</td></tr>
<tr><td>Current instruction register (CIR)</td><td>Holds the instruction being decoded and executed</td></tr>
<tr><td>Accumulator (ACC)</td><td>Holds the running result of ALU operations</td></tr>
</table>
<p>The <strong>control unit</strong> fetches, decodes and orchestrates; the <strong>ALU</strong> performs arithmetic and logic; the <strong>clock</strong> paces each micro-step; the <strong>address bus</strong> is one-way (CPU → memory/devices), the <strong>data bus</strong> two-way, the <strong>control bus</strong> carries read/write/interrupt/clock signals.</p>

<h3>The fetch–decode–execute cycle, traced</h3>
<pre><code>Memory (opcode / operand; opcode 01 = LOAD, 10 = ADD, 11 = STORE):

  5: 01 001000   LOAD 8
  6: 10 001001   ADD 9
  7: 11 001010   STORE 10
  8: 0000 0101   (5)
  9: 0000 0011   (3)
 10: 0000 0000   (empty)

Cycle 1 - LOAD 8:
  FETCH:   PC = 5 -> MAR = 5; control bus READ; MDR = 01 001000;
           CIR = 01 001000; PC = PC + 1 = 6.
  DECODE:  opcode 01 = LOAD: copy memory[operand] to ACC.
  EXECUTE: operand 001000 = 8; MAR = 8; READ; MDR = 5; ACC = 5.

Cycle 2 - ADD 9:
  FETCH:   PC = 6 -> MAR = 6; READ; MDR = 10 001001; CIR = same; PC = 7.
  DECODE:  opcode 10 = ADD: ACC = ACC + memory[operand].
  EXECUTE: MAR = 9; READ; MDR = 3; ALU: ACC + MDR = 5 + 3 = 8; ACC = 8.

Cycle 3 - STORE 10:
  FETCH:   PC = 7 -> MAR = 7; READ; MDR = 11 001010; CIR = same; PC = 8.
  DECODE:  opcode 11 = STORE: memory[operand] = ACC.
  EXECUTE: MAR = 10; MDR = 8 (from ACC); WRITE; memory[10] = 0000 1000.

Interrupts fit between cycles: complete the current instruction, save the PC,
run the interrupt service routine, restore the PC, resume.</code></pre>
<p>The examiner's checklist: PC → MAR for the fetch; MDR → CIR; PC incremented at fetch (not execute); execute behaviour depends entirely on the opcode; the MAR is reused in execute to address the operand.</p>

<h3>Assembly language</h3>
<p><strong>Assembly</strong> is a thin, human-readable veneer over machine code: one mnemonic per instruction (LOAD, ADD, STORE, JMP, CMP), assembled to binary by an assembler. It is low-level (tied to the processor's instruction set), fast, and used where direct hardware control matters — embedded firmware, drivers, performance-critical inner loops. <strong>Instruction sets</strong>: CISC (many complex instructions, variable length, microcoded — x86) versus RISC (few simple instructions, one cycle each, hardwired — ARM). Mobile devices favour RISC for power efficiency; the trade-off is instructions-per-task versus cycles-per-instruction.</p>
<pre><code>Assembly concepts with a small program (accumulator machine):

  START:  LOAD  X      ; ACC = value at X
          ADD   Y      ; ACC = ACC + value at Y
          STORE Z      ; Z = ACC
          CMP   K      ; compare ACC with K (sets flags)
          JMPLE DONE   ; jump to DONE if ACC <= K (flag-driven)
          LOAD  Z      ; otherwise adjust
          SUB   K
          STORE Z
  DONE:   HALT

Key ideas the exam tests: labels are addresses (START, DONE are memory
locations); operands address memory; jumps make selection and loops; flags
(Z for zero, C for carry, N for negative, V for overflow) are set by CMP and
tested by conditional jumps - the mechanism behind every IF and WHILE once
compiled.</code></pre>
<p><strong>Bit manipulation</strong> (statement 4.3) is done with logical shifts and masks: AND with a mask to extract bits (flags, packed fields), OR to set a bit, XOR to toggle, NOT to invert, shift left/right to multiply/divide by powers of two. Extracting the third byte of a packed word: shift right 16, then AND 0xFF — each step traced in binary in exam answers.</p>

<h3>Performance and parallelism</h3>
<ul>
<li><strong>Factors:</strong> clock speed (ticks per second), cores (independent instruction streams), cache size and levels (L1 fastest/smallest, L3 slowest/largest), bus width (bits per transfer), word length (bits the CPU processes at once), instruction set (CISC/RISC trade-off), and pipelining (overlapping fetch/decode/execute of consecutive instructions — stalls occur on branches).</li>
<li><strong>Parallel processing:</strong> <strong>bit-level</strong> (wider words process more bits at once), <strong>instruction-level</strong> (pipelines and superscalar execution), <strong>data-level</strong> (SIMD — same operation on many data items: GPU rendering), <strong>task-level</strong> (different programs or subtasks on different cores). Amdahl's law bounds the gain: the sequential fraction limits speed-up regardless of core count.</li>
<li><strong>Virtual machines:</strong> a software emulation of another machine. <strong>Hardware VMs</strong> (hypervisors like VMware/KVM) run several OS instances on one physical host — server consolidation, isolation, easy backup and migration. <strong>Language VMs</strong> (the JVM, the CLR) execute bytecode portably: compile once to bytecode, run anywhere the VM exists — platform independence at the cost of a translation overhead versus native code.</li>
</ul>
<pre><code>Worked: a program is 25% sequential. Speed-up with 8 cores (Amdahl):

  speed-up = 1 / (0.25 + 0.75 / 8) = 1 / (0.25 + 0.09375) = 1 / 0.34375 = 2.91

Eight cores give under a threefold gain - the parallel hardware cannot help
the sequential quarter, which is the whole point of the question.</code></pre>

<h3>Worked example: one program through the whole stack</h3>
<pre><code>Source (high level):     z = x + y
Assembly (low level):    LOAD X / ADD Y / STORE Z
Machine code:            01 001000 / 10 001001 / 11 001010  (as above)

The assembler resolves labels to addresses; the CPU executes each instruction
through fetch-decode-execute; the compiler that produced the assembly chose the
register usage and the instruction order. Three representations, one behaviour -
and the exam question naming "which stage produced which artefact" targets
exactly these three columns.</code></pre>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Saying the PC increments during execute; it increments after the fetch.</li>
<li>Confusing MAR (address) with MDR (data) — the most-marked pair in Unit 1.</li>
<li>Claiming assembly is "almost high level"; it is one-to-one with machine instructions and hardware-specific.</li>
<li>Forgetting that CMP sets flags and conditional jumps read them — without that link, selection and loops have no mechanism.</li>
<li>Answering parallelism questions with "more cores = faster" only; Amdahl's law and the type of parallelism (bit/instruction/data/task) are the marks.</li>
<li>Describing a language VM as an emulator of hardware only; the JVM executes bytecode — portability is its purpose.</li>
<li>Using a logical shift to halve a negative two's-complement number (must be arithmetic shift, preserving the sign bit).</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Unit 1, 5 marks).</strong> Describe the fetch–decode–execute cycle of an instruction that adds the contents of address 200 to the accumulator.</p>
<p>Answer: Fetch: the PC's value is copied to the MAR; a READ signal fetches the instruction from memory into the MDR; it is copied to the CIR; the PC increments. Decode: the control unit interprets the opcode as ADD with operand 200. Execute: MAR ← 200; READ fetches the data into the MDR; the ALU adds MDR to the accumulator and stores the result in it.</p>
<p><strong>Question 2 (Unit 1, 3 marks).</strong> Explain the purpose of the MAR and the MDR.</p>
<p>Answer: The MAR holds the memory address currently being read from or written to, driving the address bus. The MDR holds the data or instruction transferred in that access — fetched values arrive there and outgoing values are placed there before a write.</p>
<p><strong>Question 3 (Unit 1, 4 marks).</strong> Explain two differences between CISC and RISC processors and state one use for each.</p>
<p>Answer: CISC has many complex instructions, often multi-cycle and microcoded, so programs need fewer instructions — suiting desktops (x86). RISC has few simple instructions, each executed in one clock cycle with hardwired control and heavy pipelining — suiting power-sensitive mobile/embedded devices (ARM). The trade-off: fewer instructions per task versus fewer cycles per instruction.</p>
<p><strong>Question 4 (Unit 1, 4 marks).</strong> Explain how 8 cores can fail to give 8× speed-up.</p>
<p>Answer: Amdahl's law: the speed-up is limited by the sequential fraction of the program, which no extra core can accelerate — only the parallel fraction divides among cores. Coordination overhead (thread synchronisation, communication) and memory-bus contention further reduce gains, so real speed-up depends on how much of the work is genuinely parallel.</p>
<p><strong>Question 5 (Unit 1, 4 marks).</strong> Describe what a hypervisor provides and one benefit and one drawback of virtualisation.</p>
<p>Answer: A hypervisor runs multiple virtual machines, each with its own OS, on one physical machine by arbitrating CPU, memory and storage. Benefit: server consolidation and isolation — one hardware outlay, VMs start, migrate and snapshot independently. Drawback: each VM competes for shared physical resources, so performance is lower than bare metal, and the hypervisor itself consumes resources and expands the trusted computing base.</p>
<p><strong>Question 6 (Unit 1, 3 marks).</strong> Explain how a conditional jump implements IF mark ≥ 50 in assembly.</p>
<p>Answer: CMP compares the accumulator with 50 by subtraction, setting flags (zero, negative, carry, overflow) without storing the result. The test mark ≥ 50 becomes a jump-if-greater-or-equal (reading N and V or C flags) to the "pass" label; if the condition fails, execution falls through to the "fail" code. Flags are the bridge between comparison and branching.</p>
<p>Below the assembly sits the digital logic every instruction is built from: hardware components, gates and Boolean algebra.</p>
`,

    "a5a4ad94-c42a-4993-87dc-62e555d836b9": `
<h2>Edexcel IAL Computer Science: Hardware, Logic Gates and Boolean Algebra</h2>
<p>Pearson Edexcel International Advanced Level in Computer Science, Unit 1 Principles of Computer Science: computer components and their interconnection, plus Unit 3's logic gates and Boolean algebra with circuit simplification. This note treats Boolean algebra as the mathematics beneath all digital hardware: the gates are its physical form, and simplification is how engineers make circuits cheap. Every truth table is generated row by row and every simplification names its law at each line.</p>

<h3>The computer's components</h3>
<p>A complete computer system is built from a small set of components, each with a defined role and a defined place on the buses. The exam expects the function of each component and the consequence of its specification — not just a list.</p>
<p>The components are: the <strong>CPU</strong> (control unit, ALU, registers, cache) executing instructions; <strong>main memory</strong> (RAM — volatile read/write working store; ROM — non-volatile firmware/bootstrap) holding what is in use; <strong>secondary storage</strong> (magnetic, optical, solid state) holding everything permanently; <strong>input/output devices</strong> connected via ports and buses; and the <strong>motherboard</strong> carrying the chipset and expansion slots. Communication is by <strong>buses</strong>: address (one-way, widths set addressable memory: n lines → 2ⁿ locations), data (two-way; width sets transfer size), control (read/write, clock, interrupt, reset). Ports (USB, HDMI, SATA, PCIe, Ethernet) attach peripherals; PCIe is the high-bandwidth internal interconnect for GPUs and NVMe storage. When a question asks how computers have changed, the answer runs across these components: more cores and wider buses, caches instead of ever-faster RAM, solid state replacing magnetic storage, and integration (system-on-chip designs putting CPU, GPU and memory controller on one die).</p>
<table border="1" cellpadding="6">
<tr><th>Memory/storage</th><th>Volatility</th><th>Speed</th><th>Role</th></tr>
<tr><td>Registers</td><td>Volatile</td><td>Fastest</td><td>Current instruction and operands inside the CPU</td></tr>
<tr><td>Cache (L1/L2/L3)</td><td>Volatile</td><td>Very fast</td><td>Recently used data/instructions, hiding RAM latency</td></tr>
<tr><td>RAM</td><td>Volatile</td><td>Fast</td><td>Running programs and their data</td></tr>
<tr><td>SSD/flash</td><td>Non-volatile</td><td>Medium</td><td>Fast secondary storage, mobile storage</td></tr>
<tr><td>HDD</td><td>Non-volatile</td><td>Slow (moving parts)</td><td>Bulk storage, archives</td></tr>
<tr><td>ROM</td><td>Non-volatile</td><td>Fast</td><td>Bootstrap/firmware — the boot program</td></tr>
</table>
<p>The memory hierarchy is a speed/cost pyramid: each level faster and smaller than the one below, with caches bridging the CPU–RAM gap. <strong>Fetch bandwidth</strong>, not capacity, is often the real constraint — a fact behind modern multi-level caches and wide memory buses.</p>

<h3>Boolean algebra: the notation</h3>
<p>Boolean variables take values 0 and 1 (FALSE/TRUE). Operators: NOT (Ā), AND (AB or A·B), OR (A + B). The laws:</p>
<table border="1" cellpadding="6">
<tr><th>Law</th><th>Statement</th></tr>
<tr><td>Identity</td><td>A + 0 = A; A · 1 = A</td></tr>
<tr><td>Null</td><td>A + 1 = 1; A · 0 = 0</td></tr>
<tr><td>Complement</td><td>A + Ā = 1; A · Ā = 0</td></tr>
<tr><td>Idempotent</td><td>A + A = A; A · A = A</td></tr>
<tr><td>Commutative / Associative</td><td>A + B = B + A; (A + B) + C = A + (B + C); same for ·</td></tr>
<tr><td>Distributive</td><td>A(B + C) = AB + AC; A + BC = (A + B)(A + C)</td></tr>
<tr><td>Absorption</td><td>A + AB = A; A(A + B) = A</td></tr>
<tr><td>De Morgan</td><td>(A + B)‾ = Ā · B̄; (AB)‾ = Ā + B̄</td></tr>
<tr><td>Double negation</td><td>(Ā)‾ = A</td></tr>
</table>

<h3>The logic gates</h3>
<p>NOT (inverter): output 1 when input 0. AND: 1 only when both 1. OR: 1 when at least one 1. NAND: NOT of AND (universal). NOR: NOT of OR (universal). XOR: 1 when inputs differ. Each gate's identity is its truth table — with n inputs the table has 2ⁿ rows, counted in binary.</p>
<pre><code>XOR truth table (the row most often mis-remembered is the last):

A | B | A XOR B
0 | 0 |    0
0 | 1 |    1
1 | 0 |    1
1 | 1 |    0        <- both 1 gives 0: XOR is "different", not "or"

XOR as a sum modulo 2: A ⊕ B = A·B̄ + Ā·B. Prove by expanding the truth
table: rows 01 and 10 give 1 - exactly the two terms.</code></pre>

<h3>Building and analysing circuits</h3>
<pre><code>Worked analysis: F = (A + B) · (B + C)

A | B | C | A+B | B+C | F
0 | 0 | 0 |  0  |  0  | 0
0 | 0 | 1 |  0  |  1  | 0
0 | 1 | 0 |  1  |  1  | 1
0 | 1 | 1 |  1  |  1  | 1
1 | 0 | 0 |  1  |  0  | 0
1 | 0 | 1 |  1  |  1  | 1
1 | 1 | 0 |  1  |  1  | 1
1 | 1 | 1 |  1  |  1  | 1

Row 5 is the trap: A = 1 makes A + B = 1, but B + C = 0, so F = 0.
Column-by-column working is where partial marks live.</code></pre>

<h3>Simplification with reasons</h3>
<pre><code>Simplify F = A·B + A·B̄ + Ā·B

  F = A·B + A·B̄ + Ā·B
    = A·(B + B̄) + Ā·B        [factorise: distributive]
    = A·1 + Ā·B              [complement: B + B̄ = 1]
    = A + Ā·B                [identity: A·1 = A]
    = A + B                  [a standard reduction: A + Ā·B = A + B;
                               proof: A + Ā·B = (A + Ā)(A + B) = 1·(A + B)]

Three AND terms and an OR collapse to one OR gate.

Simplify G = (A + B)(A + B̄):
  = A·A + A·B̄ + B·A + B·B̄     [expand]
  = A + A·B̄ + A·B + 0         [idempotent; complement]
  = A·(1 + B̄ + B)             [factorise]
  = A                          [null: 1 + anything = 1]

Circuit economy is the reason: fewer gates, fewer transistors, less heat,
lower cost, higher speed.</code></pre>

<h3>From a problem to a circuit, and back</h3>
<pre><code>Worked design: "A machine runs when (the guard is down AND the start button is
pressed) OR the maintenance override key is turned."

Let G = guard down, S = start pressed, M = maintenance key, R = run.

  R = (G · S) + M

Circuit: AND(G, S) -> OR with M -> R.
Check the boundary rows:
  G=1, S=0, M=0 -> (0) + 0 = 0  (button alone is not enough)
  G=0, S=1, M=1 -> (0) + 1 = 1  (override bypasses the guard - by design)

Converting a truth table to an expression: take each row with output 1, write
its minterm (A·B·C̄ for row 1,1,0), and OR them: sum of products. Simplify the
resulting expression with the laws before building.</code></pre>
<p><strong>Half adder</strong> (adds two bits: sum = A ⊕ B, carry = A·B) and <strong>full adder</strong> (adds two bits plus a carry-in: sum = A ⊕ B ⊕ Cin, carry = A·B + Cin·(A ⊕ B)) are the standard circuit questions — build the truth table first, then the expression, then the gates.</p>

<h3>Worked example: full adder truth table</h3>
<pre><code>A | B | Cin | Sum | Carry
0 | 0 |  0  |  0  |  0
0 | 0 |  1  |  1  |  0
0 | 1 |  0  |  1  |  0
0 | 1 |  1  |  0  |  1
1 | 0 |  0  |  1  |  0
1 | 0 |  1  |  0  |  1
1 | 1 |  0  |  0  |  1
1 | 1 |  1  |  1  |  1

Sum = A ⊕ B ⊕ Cin  (odd number of 1s -> sum 1)
Carry = A·B + Cin·(A ⊕ B)   (two or more 1s -> carry 1)

Chain four full adders to add two 4-bit numbers - ripple carry, the basis of
the ALU's adder.</code></pre>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Truth tables with 2ⁿ⁻¹ rows or rows not in binary order; always count up 0…2ⁿ−1.</li>
<li>XOR on the (1,1) row: it is 0, not 1 — "exactly one input".</li>
<li>De Morgan applied to the wrong operator: break the bar and flip the sign (OR becomes AND); keep brackets explicit to avoid NOT A AND B ambiguity.</li>
<li>Ordinary-algebra habits: A + A = A, and the second distributive law A + BC = (A + B)(A + C) has no arithmetic analogue.</li>
<li>Skipping intermediate columns in multi-gate analysis; one wrong column cascades.</li>
<li>Simplifying without citing laws — the justification is most of the marks.</li>
<li>Building the minterm sum of products without simplifying (correct but un-economical — usually a separate mark for simplification).</li>
<li>Calling NAND "the AND gate": the inversion is precisely what makes it universal.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Unit 1, 3 marks).</strong> State the difference between RAM and ROM and the role of each at boot.</p>
<p>Answer: RAM is volatile read/write memory holding the running OS, programs and data — lost at power-off. ROM is non-volatile read-only memory holding the bootstrap/firmware: at boot the CPU executes the ROM's POST and loader, which loads the OS into RAM. Without ROM, a powered-off machine could not start.</p>
<p><strong>Question 2 (Unit 1, 3 marks).</strong> Explain how the width of the address bus affects a processor.</p>
<p>Answer: The address bus carries memory addresses one-way from the CPU; n address lines can specify 2ⁿ distinct locations. A 16-bit address bus addresses 64 KiB; 32-bit addresses 4 GiB. Narrower buses cap the memory a system can use regardless of how much is fitted.</p>
<p><strong>Question 3 (Unit 1, 4 marks).</strong> Construct the truth table for F = (A ⊕ B) · C̄.</p>
<p>Answer: Columns A, B, C, A⊕B, C̄, F. Rows: 000→0; 001→0; 010→1 (A⊕B=1, C̄=1); 011→0; 100→1; 101→0; 110→0 (A⊕B=0); 111→0. F = 1 only on rows 010 and 100.</p>
<p><strong>Question 4 (Unit 1, 4 marks).</strong> Simplify F = Ā·B·C + Ā·B·C̄ + A·B·C, naming each law.</p>
<p>Answer: F = Ā·B·(C + C̄) + A·B·C (distributive) = Ā·B·1 + A·B·C (complement) = Ā·B + A·B·C (identity) = B·(Ā + A·C) (distributive) = B·(Ā + C) (reduction Ā + A·C = Ā + C). Final: B·Ā + B·C — one AND, one OR.</p>
<p><strong>Question 5 (Unit 1, 4 marks).</strong> Design a circuit for "the alarm sounds when the safe is open and the system is armed, unless the night key is used".</p>
<p>Answer: Let O = safe open, A = armed, K = night key, X = alarm. X = O·A·K̄. Circuit: AND(O, A) feeding an AND with NOT(K). Truth-table check: O=1, A=1, K=0 → 1 (alarm); K=1 → 0 (key suppresses it) — the NOT on K is the suppression, easy to miss.</p>
<p><strong>Question 6 (Unit 1, 2 marks).</strong> Explain why NAND is described as a universal gate.</p>
<p>Answer: Any Boolean function — and therefore any digital circuit, including NOT, AND, OR and entire processors — can be built from NAND gates alone, since NOT A = NAND(A,A), A·B = NAND(NAND(A,B), NAND(A,B)), and A + B follows by De Morgan. Manufacture can then use one gate design.</p>
<p>The hardware is only half of Unit 1: the software that runs on it and the security that protects its data come next.</p>
`,
  },
};
