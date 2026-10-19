// Batch 08: deepens eight thin notes toward 3000+ characters.
// Consumed by .freebuff/extend-materials.cjs. No backticks and no dollar-brace sequences.
module.exports = {
  expectType: "notes",
  rows: {
    "e1a3c834-71a5-46c5-87e6-4700be5beeb8": `
<h3>Worked example: a binomial probability</h3>
<p>A biased coin lands on heads with probability 0.3. Let X be the number of heads in 10 throws, so X ~ B(10, 0.3). The probability of exactly 3 heads is P(X = 3) = C(10, 3) × 0.3³ × 0.7⁷ = 120 × 0.027 × 0.08235 = 0.2668 (to 4 decimal places). The coefficient 120 counts the arrangements of the 3 heads among 10 throws, and it is needed because the heads may fall in any of those positions.</p>
<h3>At least one success</h3>
<p>For P(X ≥ 1), use the complement: P(X ≥ 1) = 1 − P(X = 0) = 1 − 0.7¹⁰ = 1 − 0.02825 = 0.9718. Examiners look for this shortcut, and writing the full sum from X = 1 to X = 10 is both slower and more error-prone.</p>
<h3>Checking the mean and variance</h3>
<ul>
<li>Mean: E(X) = np = 10 × 0.3 = 3.</li>
<li>Variance: Var(X) = np(1 − p) = 10 × 0.3 × 0.7 = 2.1, so the standard deviation is √2.1 = 1.45 (to 2 decimal places).</li>
</ul>
<p>Use these values to judge whether a stated answer is sensible: a mean of 3 with a standard deviation of 1.45 means most results fall between 1 and 5.</p>
<p>Exam point: a binomial model needs a fixed number of trials, independence, and the same probability of success on each trial. If the items are drawn without replacement from a small group, the probability changes after each draw and the binomial model is not valid.</p>
`,
    "77c32ddd-d720-4973-9b42-3e1600709841": `
<h3>Worked example: round-robin scheduling</h3>
<p>Three processes arrive together at time 0: A needs 5 ms, B needs 3 ms and C needs 1 ms. The time quantum is 2 ms. The timeline is A (0 to 2), B (2 to 4), C (4 to 5, finished), A (5 to 7), B (7 to 8, finished), A (8 to 9, finished). The completion times are A = 9 ms, B = 8 ms and C = 5 ms. The processor is shared fairly, but a short job such as C still waits for the earlier turns of the others.</p>
<h3>Virtual memory and paging</h3>
<p>The operating system divides a program into fixed-size pages and keeps only the pages in use in main memory. When a page that is needed is not in RAM, a page fault occurs and the operating system loads it from secondary storage. This allows programs larger than the physical memory to run, at the cost of slower access when faults are frequent.</p>
<h3>Batch processing and multiprogramming</h3>
<ul>
<li>Batch processing runs a set of jobs one after another with no user interaction, which suits payroll runs.</li>
<li>Multiprogramming keeps several jobs in memory at once and switches between them, so the processor is not idle while one job waits for input or output.</li>
<li>Real-time systems guarantee a response within a fixed deadline, which matters in control systems such as a car's braking system.</li>
</ul>
<p>Exam point: when a question asks why an operating system is needed, link each function to the hardware problem it solves, for example scheduling because there is one processor and many processes.</p>
`,
    "6a16eae8-e107-4e78-bbf3-f9767aa67e18": `
<h3>Worked example: tracing a program through the toolchain</h3>
<p>A programmer writes the source code for a calculator in a high-level language. A compiler translates the whole program into machine code before it runs, and reports syntax errors as a list. A linker then joins this object code with the library routines it calls, producing one executable file. A loader copies that executable into main memory and starts it. If the same program were run by an interpreter, each statement would be translated and executed in turn, so an error in line 40 would only appear when the program reached line 40.</p>
<h3>Comparing translators</h3>
<ul>
<li>Compiler: translates everything first, produces a fast executable and a separate file for the output, and is harder to debug while running.</li>
<li>Interpreter: translates line by line, starts quickly and eases debugging, but runs more slowly because it translates again each time.</li>
<li>Assembler: converts assembly language, which uses mnemonics such as ADD and MOV, into machine code, with a one-to-one correspondence between each instruction and its binary form.</li>
</ul>
<h3>Why the operating system loads the program</h3>
<p>The loader is part of the operating system's work of managing memory. It reserves space, places the instructions and data in that space and sets the starting address. Without this step the processor would not know where the program begins or which memory it may use.</p>
<p>Exam point: name the translator for each stage in the question, and state one advantage and one disadvantage of the translator the question describes.</p>
`,
    "c83dc258-43cf-451c-88d2-6f7dfb525681": `
<h3>Worked example: a record definition</h3>
<p>A record groups fields of different data types under one name. A record called Book might have Title (string), Pages (integer), Price (real) and InStock (Boolean). Each field is then referred to by the record name and the field name, for example Book.Pages. Records let a program keep related data together and pass it to a procedure as one item.</p>
<h3>Worked example: hashing with linear probing</h3>
<p>A hash table has 5 slots numbered 0 to 4, and the hash function is h(k) = k mod 5. Insert the keys 12, 27 and 8 in that order. The key 12 gives 12 mod 5 = 2, so it is stored in slot 2. The key 27 also gives 2, which is already occupied, so the next slot 3 is used. The key 8 gives 3, which is occupied, so it moves on to slot 4. A collision happens whenever two keys hash to the same slot, and the probing method determines where the second key is placed.</p>
<h3>Comparing file access methods</h3>
<ul>
<li>Serial files store records one after another in the order they arrive, so finding one record means reading from the start.</li>
<li>Sequential files store records in key order, so a search can stop once it passes the place where the record should be.</li>
<li>Random (direct) files use a hash function to calculate the address of a record directly, which gives the fastest access for a single record.</li>
</ul>
<p>Exam point: when asked to choose a file organisation, state the access pattern the question describes, such as frequent single-record look-ups or regular batch reads in order, and justify the choice from that pattern.</p>
`,
    "45b10674-ff18-4672-8046-5a67a308f50a": `
<h3>Worked example: tracing a binary search</h3>
<p>Search for 23 in the sorted list 2, 5, 8, 12, 16, 23, 38, 56, 72, 91. The first middle position is (0 + 9) ÷ 2 = 4 (rounded down), which holds 16. Since 23 is greater than 16, the lower bound becomes 5. The next middle is (5 + 9) ÷ 2 = 7, which holds 56. Since 23 is less than 56, the upper bound becomes 6. The next middle is (5 + 6) ÷ 2 = 5, which holds 23, so the item is found after 3 comparisons. A linear search of the same list would need 6 comparisons.</p>
<h3>Worked example: bubble sort passes</h3>
<p>Sort 5, 1, 4, 2, 8 into ascending order. In the first pass the algorithm compares adjacent pairs and swaps them when they are out of order, giving 1, 4, 2, 5, 8. The second pass gives 1, 2, 4, 5, 8. A third pass makes no swaps, which shows the list is sorted. Stopping early when a pass has no swaps is a common improvement and is worth stating in an answer.</p>
<h3>Worked example: recursion</h3>
<p>The factorial function is defined as factorial(n) = n × factorial(n − 1), with the base case factorial(0) = 1. Then factorial(4) = 4 × factorial(3) = 4 × 3 × factorial(2) and so on until the base case is reached, giving 24. A recursive routine must always have a base case, otherwise it never stops and the stack overflows.</p>
<p>Exam point: a trace table with one column per variable is the clearest way to show an algorithm's steps, and it earns method marks even when the final answer is wrong.</p>
`,
    "53568d22-201e-404e-83d9-0e61912f2c1b": `
<h3>Worked example: force on a current-carrying conductor</h3>
<p>A wire of length 0.5 m carries a current of 3 A at right angles to a magnetic field of flux density 0.2 T. The force is F = B × I × L = 0.2 × 3 × 0.5 = 0.3 N. The force is at right angles to both the field and the current, and the direction can be found with Fleming's left-hand rule: the first finger is the field, the second finger is the current and the thumb is the motion.</p>
<h3>Worked example: a transformer</h3>
<p>An ideal step-down transformer has 1000 turns on the primary and 100 turns on the secondary. A primary voltage of 230 V gives a secondary voltage of Vs = Vp × Ns ÷ Np = 230 × 100 ÷ 1000 = 23 V. If the primary current is 0.5 A, the secondary current is Is = Ip × Vp ÷ Vs = 0.5 × 230 ÷ 23 = 5 A. The input power is 230 × 0.5 = 115 W and the output power is 23 × 5 = 115 W, so the ideal transformer loses no power. A step-down transformer lowers the voltage and raises the current.</p>
<h3>Why a transformer needs alternating current</h3>
<p>A transformer works by electromagnetic induction. The changing flux in the iron core induces a voltage in the secondary coil only while the flux is changing. A steady direct current produces a steady flux, so no voltage is induced and the transformer does not work with direct current.</p>
<p>Exam point: quote the transformer equation in the form Vp ÷ Vs = Np ÷ Ns, and check whether the question assumes an ideal transformer, where input and output power are equal.</p>
`,
    "985e5e58-2c70-4482-a993-72769a2c63d1": `
<h3>Worked example: using a line of best fit</h3>
<p>A line of best fit for the data is y = 2x + 1. To predict y when x = 6, substitute to get y = 2 × 6 + 1 = 13. The value x = 6 lies inside the range of the data, so this is interpolation and is usually reliable. If the data only covered x from 0 to 10, predicting y when x = 30 would be extrapolation, which assumes the trend continues beyond the data and is unreliable.</p>
<h3>Strength of the relationship</h3>
<ul>
<li>Strong positive correlation: the points lie close to a rising line, so the line of best fit is a good model.</li>
<li>Weak correlation: the points are scattered widely, so any prediction from the line is of little value.</li>
<li>No correlation: the points show no pattern, and a line of best fit should not be used for prediction.</li>
</ul>
<h3>Interpreting the gradient</h3>
<p>In a question about height and arm span, the gradient of the line shows how much the second quantity changes for each unit increase in the first. Always include units in the interpretation, for example "each extra centimetre of height is associated with about 1.1 cm of arm span", and avoid saying that height causes arm span.</p>
<p>Exam point: a line of best fit should pass through the mean point (x̄, ȳ) and should have about as many points above it as below it. Reading the value from a graph should be done with a dotted line drawn from the axis to the line and then to the other axis.</p>
`,
    "3dd6d5c0-35ea-44c6-8f24-ad74aad0d101": `
<h3>Worked example: converting between number systems</h3>
<p>The binary number 1011 0110 can be written as the hexadecimal number B6. Split the binary digits into groups of four from the right, then convert each group: 1011 is B (11) and 0110 is 6. The decimal value is 128 + 32 + 16 + 4 + 2 = 182, and B6 in hexadecimal is 11 × 16 + 6 = 182, which confirms the conversion.</p>
<h3>Worked example: two's complement</h3>
<p>To represent −45 in 8-bit two's complement, start with 45 = 0010 1101. Invert every bit to get 1101 0010, then add 1 to get 1101 0011. As an unsigned number this is 211, and 211 − 256 = −45, which confirms the value. The leading bit is 1, so the number is negative, as expected.</p>
<h3>Worked example: file size of an image</h3>
<p>An image of 800 × 600 pixels with 24-bit colour needs 800 × 600 × 24 = 11 520 000 bits. Dividing by 8 gives 1 440 000 bytes, which is about 1.44 MB. Halving the colour depth to 12 bits halves the file size, which shows the trade-off between quality and storage.</p>
<h3>Run-length encoding</h3>
<p>Run-length encoding replaces each run of the same symbol by the count and the symbol. The string AAAABBBCCD is encoded as 4A3B2C1D, which is shorter. The method works best on data with long runs, and it can make a file larger if the data has few repeats, so it is a lossless method suited to simple graphics.</p>
<p>Exam point: state the number of bits used and show the working when calculating file sizes, because method marks are awarded for the calculation even if the arithmetic slips.</p>
`,
  },
};
