// Batch r2: deepens seven thin computer science notes past 3000 characters.
// Consumed by .freebuff/extend-materials.cjs. No backticks and no dollar-brace sequences.
module.exports = {
  expectType: "notes",
  rows: {
    "17e42a4c-18d8-47cd-b02f-f5b78b6bc7e5": `
<h3>Exam method: dividing a network into subnets</h3>
<p>Take 192.168.1.0/24 and split it into four equal subnets. A /24 prefix leaves 8 host bits, so borrowing 2 bits gives a /26 prefix and 6 host bits, which means 64 addresses per subnet. The four networks are 192.168.1.0, 192.168.1.64, 192.168.1.128 and 192.168.1.192. In each subnet the first address is the network address and the last is the broadcast address, so the usable hosts are 62 per subnet.</p>
<p>Always work out the block size first: 256 minus the last octet of the subnet mask gives the step between subnet addresses. For a mask ending in 192, the step is 64.</p>
<h3>Common errors in networking questions</h3>
<ul>
<li>Forgetting that the network and broadcast addresses cannot be assigned to hosts, so the usable count is 2 to the power of the host bits, minus 2.</li>
<li>Confusing packet switching with circuit switching. Packet switching splits data into packets that may take different routes; circuit switching reserves a fixed path for the whole call.</li>
<li>Stating that a router works at the data link layer. Routers forward packets using IP addresses, so they operate at the network layer.</li>
</ul>
`,
    "c015774f-319c-423f-94e2-c1b6a3505c70": `
<h3>Exam method: tracing a stack and a queue</h3>
<p>Write the contents after every operation. Start with an empty stack. Push 5, push 9, pop, then push 2. After the pop the stack holds 5 only, so the final push leaves 5 at the bottom and 2 at the top. The value returned by the pop is 9, because a stack returns the most recently added item.</p>
<p>A queue works in the opposite order. Enqueue 5, enqueue 9, then dequeue. The dequeue returns 5, the item that entered first, and 9 remains at the front. Marks are given for the returned value and for the final state, so show both.</p>
<h3>Common errors</h3>
<ul>
<li>Describing a stack as first in, first out. That describes a queue; a stack is last in, first out.</li>
<li>Forgetting to check for an empty structure before a pop or dequeue. Good answers say what the program should do when the structure is empty.</li>
<li>Saying an array-based queue never needs wrapping. A fixed-size array queue can waste space at the front unless its pointers wrap round to the start.</li>
</ul>
`,
    "10ed5d54-2c62-4360-a2d0-483a39f500af": `
<h3>Worked example: comparing simulation output with real data</h3>
<p>A simulation predicts a mean room temperature of 24.0 °C. Sensors in the real room record a mean of 25.3 °C. The difference is 25.3 minus 24.0, which is 1.3 °C. The percentage error is the difference divided by the real value, so 1.3 divided by 25.3 gives about 5.1 per cent. State the direction of the error as well as its size: the model underestimates the real temperature.</p>
<p>Then suggest a cause that the model could plausibly miss, such as heat from windows, occupants or equipment. A good evaluation names one assumption in the simulation and says how changing it would move the output closer to the real data.</p>
<h3>Why real-time systems differ from batch simulations</h3>
<ul>
<li>A real-time system must respond within a fixed deadline, so a late result is a failure even when it is correct.</li>
<li>A batch simulation can run to completion and be checked afterwards, whereas a control system acts on each reading as it arrives.</li>
<li>Sampling rate matters: sample too slowly and fast changes are missed entirely, which is an aliasing risk.</li>
</ul>
`,
    "b85187cd-a73d-45af-9ae1-f1616a80a393": `
<h3>Exam method: choosing a defence</h3>
<p>Match each threat to the control that stops it. Parameterised queries stop SQL injection because user input is passed as data and never run as part of the command. Input validation rejects unexpected characters before they reach the database. HTTPS uses encryption to protect data in transit, so an eavesdropper on the network sees only ciphertext. Passwords should be stored as salted hashes, so a stolen database does not reveal the original passwords.</p>
<p>Answer the question that is asked. If the question is about protecting data sent over a network, encryption is the answer. If it is about checking a password without storing it, a hash is the answer. Giving the wrong defence for the threat loses the marks even when the explanation is accurate.</p>
<h3>Common errors</h3>
<ul>
<li>Describing a hash as reversible. A hash is one-way, so the original value cannot be recovered from it.</li>
<li>Calling a web page secure simply because it uses a padlock. The padlock shows encryption, not that the site is free of flaws.</li>
</ul>
`,
    "676e85b2-92ba-4147-a226-ffb7f1a011a0": `
<h3>Worked example: a bias scenario</h3>
<p>A facial recognition system is trained mostly on photographs of one group of people. When it is tested on a different group it misidentifies people far more often. The cause is sampling bias: the training data did not represent the people the system would be used on. The fix is to collect a training set that reflects the full user population, to test the system on each group separately, and to report the error rate for each group rather than one overall figure.</p>
<p>Bias can also come from the people who label the data. If labellers apply their own assumptions, those assumptions are learned by the model. Name the source of bias in your answer, because marks are given for identifying where the bias enters, not just for saying that it exists.</p>
<h3>Ownership and licensing questions</h3>
<ul>
<li>Software written by an employee in the course of their job is normally owned by the employer, while software written by a freelancer is usually owned by the freelancer unless a contract says otherwise.</li>
<li>An open-source licence sets the conditions for using, changing and sharing code. Using open-source code in a commercial product still requires following its licence terms.</li>
</ul>
`,
    "38530bbf-b762-49dc-9a91-707b477f6a0c": `
<h3>Worked example: sound file size</h3>
<p>A mono recording lasts 60 seconds, is sampled at 8000 samples per second and uses 16 bits per sample. The file size in bits is 8000 multiplied by 16 multiplied by 60, which is 7,680,000 bits. Dividing by 8 gives 960,000 bytes, or about 960 kB. Doubling the sample rate or recording in stereo doubles the file size, so check each factor separately.</p>
<h3>Worked example: image file size</h3>
<p>An image is 800 pixels wide and 600 pixels high, with 24 bits of colour per pixel. The total is 800 multiplied by 600 multiplied by 24, which is 11,520,000 bits, or 1,440,000 bytes. Reducing the colour depth to 8 bits cuts the file to one third of that size, but the image can then show fewer distinct colours.</p>
<h3>Lossy and lossless compression compared</h3>
<ul>
<li>Lossless compression finds repeated patterns and can rebuild the original exactly, so it suits text and program files.</li>
<li>Lossy compression discards detail the eye or ear is least likely to notice, so it produces much smaller files for photographs and music.</li>
</ul>
`,
    "a836a83d-d4a7-469e-8654-2518686bb60e": `
<h3>Exam method: tracing the fetch-decode-execute cycle</h3>
<p>Write the register contents after each stage. In the fetch stage the address in the program counter is copied to the memory address register, the instruction at that address is copied to the memory data register and then to the current instruction register, and the program counter is incremented so that it points to the next instruction. In the decode stage the control unit works out what the instruction means. In the execute stage the instruction is carried out, which may change the accumulator or write a value back to memory.</p>
<p>The program counter is incremented before execution. A jump instruction then overwrites it, which is why a jump changes the order of execution without any special fetch step.</p>
<h3>Common errors</h3>
<ul>
<li>Saying the program counter holds the instruction. It holds the address of the next instruction, while the current instruction register holds the instruction itself.</li>
<li>Describing the buses as storing data. Buses only carry data, addresses and control signals between components.</li>
</ul>
`
  }
};
