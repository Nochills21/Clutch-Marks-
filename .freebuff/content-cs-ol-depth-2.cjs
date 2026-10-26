// Computer Science OL batch 2: official Cambridge IGCSE 0478 (2026-2028) Paper 1
// Topic 2 Data transmission (2.1 Types and methods of data transmission, 2.2
// Methods of error detection, 2.3 Encryption), Topic 3 statement 3.4 Network
// hardware, Topic 4 statement 4.1 Types of software and interrupts, and Topic 5
// (5.1 The internet and the world wide web, 5.2 Digital currency). Apply with:
//   node .freebuff/deepen-materials.cjs .freebuff/content-cs-ol-depth-2.cjs > .freebuff-tmp/cs-ol-depth-2.sql
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/cs-ol-depth-2.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/cs-ol-depth-2.sql --apply    (live)
//   node .freebuff/gate-notes-depth.cjs computer-science OL
module.exports = {
  expectType: "notes",
  titles: {
    "11594218-4521-43d6-bccd-fb79cda469b4": "IGCSE Computer Science: Networking and Data Transmission",
    "77c32ddd-d720-4973-9b42-3e1600709841": "IGCSE Computer Science: Software and Operating Systems",
    "37c076d2-e903-4a57-8672-96dd9b97fbec": "IGCSE Computer Science: The Internet and Digital Currency",
  },
  rows: {
    "11594218-4521-43d6-bccd-fb79cda469b4": `
<h2>IGCSE Computer Science: Networking and Data Transmission</h2>
<p>Cambridge IGCSE Computer Science 0478 (2026–2028), Paper 1 Computer Systems: statement 2.1 Types and methods of data transmission, 2.2 Methods of error detection, 2.3 Encryption, and 3.4 Network hardware. This note explains how data travels between machines — the modes and media it moves over, how errors in transit are spotted and fixed, how it is kept secret from eavesdroppers, and the hardware that carries it. Every parity bit and checksum below is worked line by line, because Paper 1 asks you to <em>produce</em> the check bits, not just name the method.</p>

<h3>Why network computers at all</h3>
<p>Networking lets machines share resources and communicate: shared files, printers and internet connections; centralised backup and security; email and messaging; and collaboration on the same data. The three sizes you must distinguish: a <strong>LAN</strong> (local area network) covers one site — a school or office — over its own cabling; a <strong>WLAN</strong> is a LAN using wireless links; a <strong>WAN</strong> (wide area network) spans many sites over public infrastructure such as telephone lines and fibre, with the internet the largest WAN of all.</p>
<p>Two ways to organise a LAN. In a <strong>client–server</strong> network, dedicated servers hold shared files, user accounts and backups, and clients request services from them: central control, easy backups, better security, but expensive hardware and an administrator is required — a server failure can stop everyone. In a <strong>peer-to-peer</strong> network every computer is equal and shares its own resources: cheap and simple, but no central control, each machine backed up separately, and security is harder to enforce.</p>

<h3>Serial and parallel transmission</h3>
<p><strong>Serial</strong> sends one bit at a time down a single wire (or channel). It needs fewer wires, so it is cheaper and works over long distances without the signals interfering with each other; modern systems use serial links for almost everything outside the chip (USB, Ethernet, SATA). <strong>Parallel</strong> sends several bits at once — one per wire. It looks faster, and is over very short distances such as the paths inside a computer, but over long cables the wires pick up each other's signals (<strong>crosstalk</strong>) and the pulses arrive at slightly different times (<strong>skew</strong>), so the receiving end misreads them. Memory buses and internal data paths stay parallel; anything long-distance is serial.</p>

<h3>Simplex, half-duplex and full-duplex</h3>
<table border="1" cellpadding="6">
<tr><th>Mode</th><th>Direction</th><th>Example</th></tr>
<tr><td>Simplex</td><td>One direction only</td><td>Keyboard to computer; a TV broadcast</td></tr>
<tr><td>Half-duplex</td><td>Both directions, but one way at a time</td><td>Walkie-talkie; older Ethernet hubs</td></tr>
<tr><td>Full-duplex</td><td>Both directions simultaneously</td><td>Telephone call; modern switched Ethernet</td></tr>
</table>
<p>Two more distinctions the syllabus names. <strong>Synchronous</strong> transmission sends a continuous stream of data with a shared clock signal synchronising sender and receiver — fast and efficient for large transfers. <strong>Asynchronous</strong> transmission sends one character at a time wrapped in a start bit and stop bit (with a parity bit), so no shared clock is needed; it is slower because of the overhead but simple and cheap for bursty traffic such as a keyboard. <strong>Baseband</strong> means the whole medium carries a single digital signal (ordinary Ethernet); <strong>broadband</strong> splits the medium into several frequency channels so different signals travel at once (the cable TV and ADSL line into a house).</p>

<h3>Transmission media</h3>
<table border="1" cellpadding="6">
<tr><th>Medium</th><th>How it carries data</th><th>Strengths</th><th>Weaknesses</th></tr>
<tr><td>Twisted pair (Ethernet cable)</td><td>Electrical pulses in paired copper wires</td><td>Cheap, easy to install, fine for LANs</td><td>Limited distance and speed; electrical interference</td></tr>
<tr><td>Coaxial cable</td><td>Electrical pulses in a shielded copper core</td><td>Better shielding than twisted pair; TV and cable networks</td><td>Thicker, dearer, still limited bandwidth compared with fibre</td></tr>
<tr><td>Fibre optic</td><td>Pulses of laser light down glass fibres</td><td>Huge bandwidth, very long distances, immune to electrical interference, hard to tap</td><td>Expensive; needs specialist skills to join and repair</td></tr>
<tr><td>Wireless (radio, microwave, infrared)</td><td>Electromagnetic waves through the air</td><td>Mobility; no cabling cost</td><td>Interference and obstacles; slower; eavesdropping risk; coverage limits</td></tr>
</table>
<p><strong>Bandwidth</strong> is the maximum data rate of a link, in bits per second (bps, kbps, Mbps, Gbps) — the width of the pipe. <strong>Latency</strong> is the delay before data arrives. High bandwidth with high latency still feels sluggish: size of pipe versus distance the water travels. Time to send a file is roughly file size in bits divided by bandwidth:</p>
<pre><code>Worked example: how long to send a 45 MB file over an 8 Mbps link?

45 MB = 45 x 8 = 360 megabits                [bytes to bits: multiply by 8]
360 / 8 = 45 seconds

Note the two eights doing different jobs: one converts bytes to bits,
the other is the 8 Mbps bandwidth. Confusing them is the classic error.</code></pre>

<h3>Error detection: parity</h3>
<p>Signals degrade in transit — crosstalk, interference, dirty connectors — so receiving systems must check whether what arrived is what was sent. The simplest method, <strong>parity checking</strong>, appends one extra bit (the parity bit) to each byte so that the number of 1-bits in the group is always odd (<strong>odd parity</strong>) or always even (<strong>even parity</strong>). The sender works the bit out; the receiver recounts.</p>
<pre><code>Send 0110 1011 with EVEN parity.

Count the 1-bits: 0+1+1+0+1+0+1+1 = 5 ones (odd).
For the group to have an even number of ones, the parity bit must be 1.
Transmitted byte (with parity bit at the front): 1 0110 1011

Now suppose one bit is flipped in transit: 1 0010 1011.
The receiver counts the ones: 1+0+0+1+0+1+0+1+1 = 5 (odd), but even parity was
agreed, so an error is detected and the byte is retransmitted.

With ODD parity for the same byte, the parity bit would be 0 (already 5 ones),
and the receiver expects an odd total.</code></pre>
<p>Parity catches any <em>single</em> bit flip (the total changes parity), but two flips cancel out and pass unnoticed — a limitation worth a mark on its own.</p>

<h3>Error detection: checksums</h3>
<p>A <strong>checksum</strong> covers a whole block of data rather than one byte. The sender adds the data values together and sends the sum (or its complement) with the block; the receiver repeats the addition and compares. A corrupted value gives a different total.</p>
<pre><code>Send the block 25, 47, 12 with a checksum.

Sender: 25 + 47 + 12 = 84. Transmit 25, 47, 12, 84.
Suppose 47 is corrupted to 48.
Receiver: 25 + 48 + 12 = 85, which does not match the received checksum 84:
error detected, request retransmission.

A plain sum can miss compensating errors (25 up by 1 and 12 down by 1), so real
systems use the one's complement of the sum, which catches more patterns.</code></pre>
<p>Checksums detect most multi-bit errors in a block but not all; they are used together with retransmission (below), not instead of it.</p>

<h3>Error correction and ARQ</h3>
<p><strong>Automatic repeat request (ARQ)</strong> is the protocol that turns detection into recovery. The receiver acknowledges each correctly received packet with an <strong>ACK</strong>; a corrupted packet gets a <strong>NAK</strong> (negative acknowledgement), and the sender resends it. If the packet or its ACK is lost entirely, the sender's <strong>timeout</strong> expires and it resends anyway. <strong>Sequence numbers</strong> on packets let the receiver spot duplicates caused by those resends and discard them. Stop-and-wait ARQ sends one packet and waits for its ACK before the next; continuous ARQ keeps a window of packets flowing and retransmits only the missing ones — faster on long links.</p>
<p><strong>Error-correcting codes</strong> go further: extra bits are added so the receiver can repair a single-bit error without retransmission (vital where no return channel exists, such as on CDs). The trade-off in every method: more check bits means more reliability and less room for data.</p>

<h3>Encryption</h3>
<p>Anything crossing a network can be intercepted, so sensitive data is <strong>encrypted</strong>: the readable <strong>plain text</strong> is scrambled by an algorithm (a cipher) using a <strong>key</strong> into unreadable <strong>cipher text</strong>; the receiver uses a key to decrypt it back. The algorithm is public — the security lives in the key, like a lock whose design everyone knows but whose key you alone hold.</p>
<table border="1" cellpadding="6">
<tr><th></th><th>Symmetric encryption</th><th>Asymmetric encryption</th></tr>
<tr><td>Keys</td><td>One shared secret key for both encrypting and decrypting</td><td>A matched pair: a public key (encrypts) and a private key (decrypts)</td></tr>
<tr><td>Speed</td><td>Fast, suited to bulk data</td><td>Slow, suited to short messages and key exchange</td></tr>
<tr><td>Problem</td><td>Getting the shared key to the other party securely in the first place</td><td>Nothing is secret to distribute, but the private key must be kept safe</td></tr>
<tr><td>Examples</td><td>AES, DES</td><td>RSA</td></tr>
</table>
<p>Real systems combine them: HTTPS uses the asymmetric pair to agree a symmetric session key, then encrypts the whole conversation with the fast cipher. <strong>Hashing</strong> is a third tool — a one-way function producing a fixed-length value (the hash) from any input; it cannot be reversed, so passwords are stored as hashes (with a salt against rainbow tables) and any change to a message changes its hash, proving integrity. Digital certificates issued by certificate authorities bind a public key to a real identity, so a browser knows it is talking to the genuine bank and not an impostor.</p>

<h3>Network hardware (statement 3.4)</h3>
<ul>
<li><strong>Network interface card (NIC)</strong> — gives a device a network connection and a MAC address; it frames data onto the medium.</li>
<li><strong>Switch</strong> — connects devices within a LAN and forwards each frame only to the port holding the destination MAC address; filters traffic and reduces collisions.</li>
<li><strong>Router</strong> — connects different networks (your LAN to the internet) and forwards packets between them by choosing the best path using IP addresses.</li>
<li><strong>Wireless access point</strong> — lets Wi-Fi devices join the wired LAN.</li>
<li><strong>Hub</strong> — an older, simple repeater broadcasting every frame to all ports; largely replaced by switches.</li>
</ul>
<p>Two addresses appear in exam answers and they belong to different layers: the <strong>MAC address</strong> is the permanent hardware identifier of a NIC used within a LAN, while the <strong>IP address</strong> is the logical address of a device on a network, used by routers to deliver packets across networks. Domains and DNS sit on top of that (see the internet note).</p>
<pre><code>Worked example: a school LAN sends a file from room 1 to a server.

The file is split into numbered packets. Each packet is given the server's IP
address. The sending switch looks up the server's MAC address and forwards the
frame within the LAN. Along the way each packet may take a different route;
the server uses the sequence numbers to reassemble the file in order, and ACKs
any packet that fails its checksum so the sender retransmits only that packet.</code></pre>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Saying parity "corrects" errors; parity <em>detects</em> most single-bit errors — correction needs error-correcting codes or retransmission.</li>
<li>Getting the parity bit backwards: count the existing ones first; even parity needs the total to be even, so an odd count means the parity bit is 1.</li>
<li>Claiming two flipped bits are detected by parity; they change the count by two, which parity cannot see.</li>
<li>Confusing bandwidth with latency, or forgetting to convert bytes to bits (×8) before dividing by a bits-per-second rate.</li>
<li>Describing a router's job as "connects computers in a LAN" — that is the switch; the router connects <em>networks</em> and routes packets by IP address.</li>
<li>Swapping MAC and IP: MAC is fixed hardware identity on a LAN; IP is logical and can change, and is what routing uses.</li>
<li>Saying symmetric encryption is more secure than asymmetric (or vice versa); they are secure in different ways — the exam wants the key-distribution and speed trade-off.</li>
<li>Forgetting the timeout case in ARQ questions: a lost packet or lost ACK is recovered by the sender's timer, not by a NAK.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Paper 1, 4 marks).</strong> Describe the difference between serial and parallel transmission and state one use for each.</p>
<p>Answer: Serial transmission sends the bits of a byte one after another down a single channel, so it is cheaper, immune to crosstalk between wires and reliable over long distances — used for USB, Ethernet and all long-distance links. Parallel transmission sends several bits simultaneously down multiple channels, which is faster over short distances but suffers skew and crosstalk over long cables — used for data buses inside a computer.</p>
<p><strong>Question 2 (Paper 1, 3 marks).</strong> The byte 1011 0010 is to be sent using odd parity. State the parity bit and the transmitted group.</p>
<p>Answer: The byte contains five 1-bits (odd). Odd parity requires an odd total, so the parity bit is 0 and the transmitted group is 0 1011 0010 (parity bit shown first).</p>
<p><strong>Question 3 (Paper 1, 4 marks).</strong> Explain how ARQ recovers from (i) a corrupted packet and (ii) a lost packet.</p>
<p>Answer: (i) The receiver's checksum test fails, so it returns a NAK; the sender retransmits that packet. (ii) No packet arrives, so no ACK is returned; the sender's timeout expires and it retransmits. In both cases the packet carries a sequence number so the receiver can discard duplicates and reassemble the data in order.</p>
<p><strong>Question 4 (Paper 1, 4 marks).</strong> Explain why a bank uses asymmetric encryption to start a secure connection but symmetric encryption to transfer the data.</p>
<p>Answer: Asymmetric encryption (a public/private key pair) needs no shared secret to be distributed, so the bank can safely agree a session key with any customer who encrypts with the bank's published public key — only the bank's private key decrypts it. That process is slow, so once the session key is agreed both sides switch to fast symmetric encryption for the bulk of the transaction, which is efficient for large amounts of data.</p>
<p><strong>Question 5 (Paper 1, 2 marks).</strong> Calculate the time to send a 12 MB file over a 4 Mbps link.</p>
<p>Answer: 12 MB = 96 megabits (12 × 8), and 96 ÷ 4 = 24 seconds.</p>
<p><strong>Question 6 (Paper 1, 4 marks).</strong> Compare a switch and a router in a school network.</p>
<p>Answer: A switch connects devices within the LAN and forwards each frame only to the port of the destination MAC address, keeping local traffic off the rest of the network. A router connects the school LAN to other networks such as the internet and forwards packets between them, choosing routes using IP addresses. A switch works within one network; a router works between networks.</p>
<p>With the data safely moved, the next question is what runs on the machines: the software and the operating system that manages everything.</p>
`,

    "77c32ddd-d720-4973-9b42-3e1600709841": `
<h2>IGCSE Computer Science: Software and Operating Systems</h2>
<p>Cambridge IGCSE Computer Science 0478 (2026–2028), Paper 1 Computer Systems, statement 4.1 Types of software and interrupts. Hardware without software is a factory with no orders; this note covers the two great families of software, everything an operating system does behind the scenes, the utility programs that keep a system healthy, and interrupts — the mechanism by which the outside world gets the CPU's attention mid-program. The interrupt trace is worked against the fetch–execute cycle, because that is exactly how Paper 1 examines it.</p>

<h3>System software and application software</h3>
<p>The factory analogy again. <strong>System software</strong> runs and controls the hardware and provides the platform everything else stands on: the operating system, utility programs, device drivers and translators. <strong>Application software</strong> does the user's actual work — word processing, spreadsheets, games, web browsing — on top of that platform.</p>
<table border="1" cellpadding="6">
<tr><th>Family</th><th>Members</th><th>What it does</th></tr>
<tr><td>System software</td><td>Operating system</td><td>Manages hardware, memory, processes, files and security; provides the user interface</td></tr>
<tr><td>System software</td><td>Utility programs</td><td>Maintenance: antivirus, defragmentation, backup, compression, file management</td></tr>
<tr><td>System software</td><td>Device drivers</td><td>Translates OS commands into the hardware-specific signals each device needs</td></tr>
<tr><td>System software</td><td>Translators (compilers, interpreters, assemblers)</td><td>Turn source code into machine code the CPU can execute</td></tr>
<tr><td>Application software</td><td>General purpose</td><td>Word processors, spreadsheets, web browsers — flexible tools for many tasks</td></tr>
<tr><td>Application software</td><td>Bespoke</td><td>Written for one organisation's exact needs (a hospital booking system) — fits perfectly, costs more to develop</td></tr>
</table>
<p>A further pair of labels cross-cuts both families. <strong>Open source</strong> software publishes its source code, so anyone may inspect, modify and share it (Linux, LibreOffice): free or cheap, customisable and transparent, but support may be community-based and the user is responsible for fixing problems. <strong>Proprietary</strong> software keeps its source closed and is licensed (Windows, Microsoft Office): professionally supported and tested, but costs money and cannot be modified. "Free" and "open source" are not the same thing — the test is whether the source is published.</p>
<p>Choose with reasoning marks in mind: bespoke when the workflow is unique and off-the-shelf cannot cope; general purpose when standard tools already do the job; open source when budget and customisation matter; proprietary when guaranteed support matters.</p>

<h3>What the operating system does</h3>
<ul>
<li><strong>User interface</strong> — the way the user works with the machine: a <strong>GUI</strong> (windows, icons, menus, pointer) is friendly and needs training less; a <strong>CLI</strong> (typed commands) is faster for experts, scriptable and uses fewer resources.</li>
<li><strong>Memory management</strong> — allocates RAM to each running program and protects one program's memory from another; when RAM is short it uses virtual memory (swapping pages to secondary storage), which keeps programs running at the cost of speed.</li>
<li><strong>Process management</strong> — creates, schedules and terminates processes; multitasking shares the CPU between them (time slicing), and the scheduler decides which runs when.</li>
<li><strong>File management</strong> — organises files in directories, tracks free space, keeps permissions so only authorised users reach certain files.</li>
<li><strong>Device management</strong> — talks to hardware through drivers, so applications never need device-specific code.</li>
<li><strong>Security and user management</strong> — accounts, passwords, access rights, and guarding against unauthorised access.</li>
<li><strong>Error handling and diagnostics</strong> — reports faults to the user and keeps logs.</li>
</ul>

<h3>Interrupts</h3>
<p>A CPU runs whatever program it is given; without help, nothing could get its attention until that program finished. An <strong>interrupt</strong> is a signal from a device or event that pauses the current program so the CPU can deal with it immediately. Real-world analogy: a doctor seeing a patient (the running program) when the fire alarm sounds (an interrupt) — the doctor saves their notes at a sensible point, deals with the alarm, then returns to exactly where they left off.</p>
<ul>
<li>Interrupts come from hardware (keyboard press, mouse click, disk transfer finished, network packet arrived, timer tick, printer ready) and software (a program requesting a service, or an error such as division by zero).</li>
<li>Each interrupt has an <strong>interrupt service routine (ISR)</strong> — the small program that deals with it, held in memory.</li>
<li>Interrupts have <strong>priorities</strong>: if two arrive together, the higher priority is served first; a higher-priority interrupt can even interrupt a lower-priority ISR.</li>
</ul>
<pre><code>Trace: a program is executing and the user presses a key mid-instruction.

1. The keyboard asserts its interrupt signal on the control bus.
2. The CPU completes the instruction currently in progress (it does not stop
   mid-instruction).
3. The current program counter is saved (pushed onto the stack) so the CPU can
   find its way back.
4. The CPU looks up the keyboard's interrupt service routine and starts
   executing it: read the key from the buffer, store it, acknowledge the
   interrupt.
5. The ISR finishes; the saved program counter is restored (popped from the
   stack).
6. The original program resumes at exactly the instruction it left off at.

Without interrupts the CPU would have to ask every device in turn whether it
needed attention (polling) - wasting cycles on devices that are idle, which is
why interrupts dominate.</code></pre>
<p>Interrupts also drive multitasking: the <strong>timer interrupt</strong> fires at fixed intervals and forces the CPU to switch between running programs in slices, giving the illusion of simultaneous execution and stopping one program hogging the machine.</p>

<h3>The boot process and startup</h3>
<p>When the power button is pressed the machine has no operating system in memory yet — loading it is the <strong>boot process</strong>, named from the idea of the system pulling itself up by its own bootstraps. The CPU cannot fetch an operating system it has not yet found, so the first steps live in <strong>ROM</strong> (firmware, sometimes called the BIOS or UEFI), which survives a power cut precisely so that startup instructions are always present.</p>
<pre><code>Boot sequence, step by step:

1. Power on; the CPU runs the boot program in ROM (POST: power-on self test),
   checking the RAM, keyboard, disk and other hardware are present and working.
2. The boot program looks at the storage devices in priority order for a
   bootable device (usually the main SSD or hard disk).
3. It loads the operating system kernel from that device into RAM.
4. The kernel initialises hardware through drivers, sets up memory management
   and process tables, and starts system services.
5. The user interface loads; the login screen appears and the machine is ready.

If the self test finds a missing keyboard or bad RAM, the boot program reports
the fault before any operating system loads - which is why hardware faults
appear even when the OS never starts.</code></pre>
<p>This is also why ROM is essential rather than convenient: if startup lived in RAM, a powered-off machine could not start at all.</p>

<h3>Utility software</h3>
<table border="1" cellpadding="6">
<tr><th>Utility</th><th>What it does</th><th>Why it matters</th></tr>
<tr><td>Antivirus</td><td>Scans files against known malware signatures; monitors behaviour</td><td>Detects and removes viruses, worms, trojans before they damage data</td></tr>
<tr><td>Defragmentation</td><td>Reassembles scattered file fragments into contiguous blocks</td><td>On magnetic disks, files written over time are scattered, so read heads waste time seeking; defragmenting speeds up access</td></tr>
<tr><td>Backup</td><td>Copies data to another device or off-site on a schedule</td><td>Recovery after hardware failure, theft or deletion; full vs incremental backups trade restore speed against storage</td></tr>
<tr><td>Compression</td><td>Shrinks files for storage or transmission</td><td>Saves space and bandwidth (see data representation)</td></tr>
<tr><td>File management</td><td>Copy, move, rename, delete, organise directories</td><td>Everyday organisation of storage</td></tr>
<tr><td>Firewall</td><td>Filters network traffic against rules</td><td>Blocks unauthorised connections in and out</td></tr>
</table>
<p>Note defragmentation is a magnetic-disk remedy: solid-state drives do not suffer fragmentation seeking (and are harmed by unnecessary writes), a detail examiners reward.</p>

<h3>Worked example: choosing software</h3>
<p>A small engineering firm needs software to (a) write letters and (b) track its unique pipeline-inspection workflow.</p>
<pre><code>(a) Letters are a standard task: general-purpose application software (a word
    processor) already does this. Proprietary with support or open source to
    save cost - either is defensible with a reason.
(b) The inspection workflow is unique to the firm: off-the-shelf software would
    force the firm to change its process. Bespoke software is written to match
    the exact workflow and integrate with its existing systems, though it costs
    more to develop and maintain and needs the firm's own testing.

Everything runs on the operating system, with drivers for the firm's printer
and scanner and utilities (backup, antivirus) protecting the data.</code></pre>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Calling the operating system application software — it is system software; application software runs on top of it.</li>
<li>Saying an interrupt stops the program permanently: it pauses it, saves the PC, runs the ISR, and returns — the program resumes exactly where it stopped.</li>
<li>Confusing polling with interrupts: polling wastes cycles asking idle devices; interrupts let devices signal the CPU.</li>
<li>Describing virtual memory as extra RAM; it is secondary storage used as overflow, and it is slow.</li>
<li>Equating free software with open source; the distinction is access to the source code, not price.</li>
<li>Listing utility programs without saying what each protects against or improves — the function is the mark.</li>
<li>Forgetting drivers in "how does the OS use hardware" questions; the OS talks to hardware through device drivers.</li>
<li>Leaving the trace-table style steps out of interrupt questions: finish current instruction → save PC → run ISR → restore PC → resume.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Paper 1, 4 marks).</strong> Distinguish between system software and application software, giving two examples of each.</p>
<p>Answer: System software controls and maintains the computer itself and provides a platform for other programs — examples: the operating system and utility programs such as antivirus. Application software performs the tasks the user wants to do — examples: a word processor and a spreadsheet.</p>
<p><strong>Question 2 (Paper 1, 5 marks).</strong> Describe what happens when a printer signals that it is ready while a program is running.</p>
<p>Answer: The printer raises an interrupt. The CPU finishes the instruction currently executing, then saves the program counter of the running program. It locates and runs the printer's interrupt service routine, which transfers the output data and acknowledges the interrupt. When the ISR ends, the saved program counter is restored and the original program resumes at the instruction it had reached.</p>
<p><strong>Question 3 (Paper 1, 4 marks).</strong> Explain two advantages of a GUI over a command-line interface, and one situation where a CLI is better.</p>
<p>Answer: A GUI is intuitive — icons, windows and menus need little training and let users discover features by pointing and clicking, so it suits most users and everyday multitasking. A CLI is better for expert administration and automation: commands can be scripted and repeated exactly, and it uses far fewer resources, which suits remote servers.</p>
<p><strong>Question 4 (Paper 1, 4 marks).</strong> Explain why defragmenting a hard disk improves performance and why it is unnecessary on an SSD.</p>
<p>Answer: On a magnetic disk, files are stored in fragments wherever space was free, so reading one file means the read head moves repeatedly between distant platter regions — slow. Defragmentation reassembles fragments contiguously, so each file is read in one sweep. An SSD has no moving parts: access time is the same wherever the data sits, so fragmentation causes no delay, and the extra writes of defragmenting would wear its finite write cycles.</p>
<p><strong>Question 5 (Paper 1, 4 marks).</strong> A company is choosing between open-source and proprietary accounting software. Compare the two.</p>
<p>Answer: Open source is free or cheap, its published source can be audited for security and tailored to the company's processes, and there is no vendor lock-in — but support is community-based and the company bears the cost of any fixes or training. Proprietary software comes with professional support, warranty and regular tested updates, but costs licence fees, cannot be modified, and switching later is hard because data formats are controlled by the vendor.</p>
<p>The next piece is what happens when these machines are joined worldwide: the internet, the web and digital money.</p>
`,

    "37c076d2-e903-4a57-8672-96dd9b97fbec": `
<h2>IGCSE Computer Science: The Internet and Digital Currency</h2>
<p>Cambridge IGCSE Computer Science 0478 (2026–2028), Paper 1 Computer Systems, Topic 5: statement 5.1 The internet and the world wide web, and 5.2 Digital currency. This note explains how a request typed into a browser becomes a page on screen (traced step by step through DNS and HTTP), what the internet's protocols each do, and how digital money — from card payments to cryptocurrency — actually works, including what a blockchain is under the hood.</p>

<h3>The internet and the World Wide Web are not the same thing</h3>
<p>The <strong>internet</strong> is the global infrastructure: the physical network of cables, switches, routers and satellites connecting millions of computers, plus the protocols that let them communicate. The <strong>World Wide Web</strong> is one service that runs over the internet: the collection of web pages and resources, linked by hyperlinks and accessed with a browser through HTTP. Analogy: the internet is the road network; the web is the shops and signs along it. Email, file transfer and online gaming also use the internet without being part of the web — a distinction worth a mark almost every year.</p>
<p>Access is through an <strong>ISP</strong> (internet service provider), which supplies the connection and often email and hosting. The web is a <strong>client–server</strong> system: your browser (client) requests resources from web servers, which return them.</p>

<h3>How a web page loads, step by step</h3>
<pre><code>You type www.example.com/page.html and press Enter.

1. The browser checks its cache for the address; if not found it asks DNS.
2. DNS (domain name system) is the internet's phone book: the browser queries a
   DNS server, which returns the IP address of the domain name
   (www.example.com -> 93.184.216.34).
3. The browser opens a TCP connection to that IP address on port 80 (HTTP) or
   443 (HTTPS). TCP handles reliable, ordered delivery of the data.
4. The browser sends an HTTP request message:
       GET /page.html HTTP/1.1
       Host: www.example.com
5. The web server locates the file and replies with an HTTP response:
   a status line (200 OK), headers (content type, cookies), and the HTML body.
6. The browser parses the HTML and requests any further files it references -
   images, CSS, JavaScript - each time performing steps 2-5 as needed.
7. The page is rendered on screen.

If the server cannot find the page it returns 404 Not Found; a secure site uses
HTTPS, where the exchange is encrypted after a certificate check.</code></pre>
<p>Domain names exist because people cannot memorise IP addresses. Names read from right to left in levels: in <em>www.bbc.co.uk</em>, <em>uk</em> is the top-level country code, <em>co</em> the second level (commercial), <em>bbc</em> the organisation's name, and <em>www</em> the host machine. Generic top-level domains include .com, .org, .edu; registrars sell domain names to organisations, and each domain's records live in DNS.</p>

<h3>Internet protocols</h3>
<p>A <strong>protocol</strong> is an agreed set of rules every device follows so that communication works whoever built the hardware. The TCP/IP model layers the job: application protocols handle the user's task, TCP breaks data into packets and reassembles them reliably in order, IP addresses and routes the packets, and the hardware layer carries the signals.</p>
<table border="1" cellpadding="6">
<tr><th>Protocol</th><th>Job</th><th>Where you meet it</th></tr>
<tr><td>TCP</td><td>Splits data into packets, numbers them, reassembles in order, resends lost ones</td><td>Underneath most internet traffic (with IP: TCP/IP)</td></tr>
<tr><td>IP</td><td>Addresses packets and routes them between networks</td><td>Every internet connection</td></tr>
<tr><td>HTTP</td><td>Requests and delivers web pages (unencrypted)</td><td>Browsing ordinary websites</td></tr>
<tr><td>HTTPS</td><td>HTTP over TLS encryption</td><td>Banking, shopping, logins</td></tr>
<tr><td>FTP</td><td>Transfers whole files between client and server</td><td>Uploading a website to a host</td></tr>
<tr><td>SMTP</td><td>Sends email from a client to a mail server and between servers</td><td>Sending mail</td></tr>
<tr><td>POP3 / IMAP</td><td>Collects email from a mail server (POP3 downloads and usually deletes; IMAP synchronises across devices)</td><td>Reading mail</td></tr>
</table>
<p>When a message is sent it is broken into <strong>packets</strong>, each labelled with its sequence number and the source and destination IP addresses. Packets from one message may travel different routes; the receiving TCP layer reorders them and requests retransmission of any that fail checksums. Packet switching shares the network efficiently among many conversations — the alternative, a dedicated line per conversation, would waste capacity.</p>

<h3>Email in one pass</h3>
<p>The client composes the message and hands it to <strong>SMTP</strong>, which delivers it to the sender's mail server; that server looks up the recipient's domain in DNS and forwards it to the recipient's mail server, where it waits in a mailbox. The recipient's client then fetches it with <strong>POP3</strong> (download and delete from server) or <strong>IMAP</strong> (keep on server, synchronise across phone and laptop). Attachments are encoded into text by MIME and travel inside the message — which is why a 5 MB attachment becomes about 6.7 MB in transit.</p>

<h3>Cookies, caching and search engines</h3>
<ul>
<li><strong>Cookies</strong> are small text files a website stores on the client: they keep you logged in, remember basket contents and preferences, and enable site analytics. They raise privacy concerns (tracking across sites), so laws require consent and browsers offer blocking.</li>
<li><strong>Caching</strong> stores copies of frequently used pages or files on the client or on proxy servers, so repeat visits load faster and network traffic falls — the freshness trade-off is that cached copies can be out of date.</li>
<li><strong>Search engines</strong> use automated <strong>crawlers</strong> (spiders) to fetch pages and build an index; when you search, the engine matches your terms against that index and ranks results by relevance measures such as links pointing at a page. Paying for placement is advertising, not relevance — a distinction exam questions probe.</li>
</ul>

<h3>Digital currency (statement 5.2)</h3>
<p><strong>Digital money</strong> is money that exists only as data. Everyday forms are online card payments, mobile wallets (Apple Pay, Google Pay) and online banking transfers: these move conventional currency through trusted intermediaries — banks and card networks — protected by encryption, two-factor authentication and regulated by law. <strong>Cryptocurrency</strong> (Bitcoin, Ethereum) is different: it is a purely digital currency with no central bank, secured by cryptography and recorded on a distributed ledger.</p>
<p><strong>Blockchain under the hood</strong> — the anatomy of the idea:</p>
<ul>
<li>Transactions are grouped into a <strong>block</strong> and broadcast to a peer-to-peer network of computers (nodes).</li>
<li>Nodes check each transaction against the ledger (has the sender got the funds? is the signature valid?)</li>
<li>Proof-of-work nodes (<strong>miners</strong>) compete to solve a hard computational puzzle; the winner adds the block and earns new coins plus fees — this is mining.</li>
<li>Each block contains the hash of the previous block, chaining them together; altering an old block would change its hash and break every later link, so the history is tamper-evident and practically immutable.</li>
<li>Every node keeps a full copy of the ledger, so there is no single point of failure and no central authority.</li>
</ul>
<p><strong>Wallets and keys</strong>: a wallet holds your keys, not coins. The <strong>public key</strong> is your address (like an account number, safe to publish); the <strong>private key</strong> signs transactions to prove ownership. Lose the private key and the funds are unrecoverable — there is no bank to appeal to.</p>
<table border="1" cellpadding="6">
<tr><th>Advantages</th><th>Disadvantages</th></tr>
<tr><td>Fast, direct transfers anywhere in the world without banks</td><td>Value is extremely volatile — huge gains and losses in days</td></tr>
<tr><td>Lower fees for international transfers</td><td>Used for illegal transactions because identity is pseudonymous</td></tr>
<tr><td>No central authority, so no bank failure or political control affects it</td><td>Mining consumes enormous electricity; environmental concerns</td></tr>
<tr><td>Transparent, tamper-evident ledger</td><td>No consumer protection: lost keys and fraud are irreversible</td></tr>
<tr><td>Financial access for the unbanked</td><td>Legal status varies by country; regulation is uncertain</td></tr>
</table>

<h3>Worked example: one Bitcoin payment</h3>
<pre><code>Amina pays 0.05 BTC to a shop.

1. Amina's wallet creates a transaction record: amount, shop's public key
   (address), and her public key.
2. It signs the transaction with her PRIVATE key - anyone can verify the
   signature against her public key, but nobody can forge it.
3. The transaction is broadcast to the Bitcoin network.
4. Nodes verify she has 0.05 BTC (checking the ledger's history) and that the
   signature is valid.
5. A miner includes the transaction in a new block and races the proof-of-work
   puzzle.
6. The winning block is broadcast; nodes accept it and append it to their copy
   of the chain, referencing the previous block's hash.
7. After further blocks are added (confirmations), the payment is considered
   final; the shop sees the funds and Amina cannot reverse it.

Contrast with a card payment: the card network can reverse or refund; a
blockchain payment cannot, which is both its strength (no chargeback fraud)
and its weakness (no recourse).</code></pre>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Saying "the internet and the web are the same"; the web runs over the internet alongside email, FTP and gaming.</li>
<li>Describing DNS as translating IP addresses into domain names; DNS resolves domain names to IP addresses.</li>
<li>Skipping the TCP layer in "how is a file transferred" answers — packets, sequence numbers, reassembly and checksum retransmission are the marks.</li>
<li>Claiming packets all take the same route or arrive in order; they may not, and reordering at the receiving end is the point of sequence numbers.</li>
<li>Writing that HTTPS encrypts only the password; the whole session is encrypted after the certificate handshake.</li>
<li>Confusing cookies with cache: cookies store user state and preferences; cache stores copies of content for speed.</li>
<li>Saying blockchain is "a database that hackers cannot touch"; it is a distributed, chained ledger that is tamper-<em>evident</em> — precise wording earns marks.</li>
<li>Forgetting the private key in cryptocurrency answers: transactions are signed with it and losing it loses the funds permanently.</li>
<li>Mixing up SMTP and POP3/IMAP: sending versus receiving.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Paper 1, 3 marks).</strong> Explain the difference between the internet and the World Wide Web.</p>
<p>Answer: The internet is the global physical network of cables, routers and computers plus the protocols (TCP/IP) that connect them. The web is a service running over that network: the collection of hyperlinked web pages delivered by HTTP and viewed in a browser. Email and file transfer also use the internet but are not part of the web.</p>
<p><strong>Question 2 (Paper 1, 5 marks).</strong> Describe what happens when a user requests a web page from a server they have not visited before.</p>
<p>Answer: The browser queries a DNS server to resolve the domain name into an IP address. A TCP connection opens to the server at that address. The browser sends an HTTP GET request for the page. The server responds with the HTML (plus a status code such as 200 OK). The browser parses the HTML and requests any linked resources (images, CSS), then renders the page.</p>
<p><strong>Question 3 (Paper 1, 4 marks).</strong> Explain the purpose of TCP and IP in transferring a large file over the internet.</p>
<p>Answer: IP handles addressing and routing: it stamps each packet with the source and destination IP addresses and forwards it between networks. TCP handles reliability: it splits the file into packets, numbers them with sequence numbers, reassembles them in order at the destination, and uses checksums, ACKs and retransmission to ensure nothing is lost or duplicated. Together they make unreliable networks deliver files correctly.</p>
<p><strong>Question 4 (Paper 1, 4 marks).</strong> Explain two privacy concerns with cookies and how users are protected.</p>
<p>Answer: Cookies can track a user's activity across multiple sites, building a profile of their behaviour and interests without their full awareness — used for targeted advertising. They can also store personal details that expose the user if the device is shared. Protection comes from data-protection laws requiring sites to obtain informed consent before setting non-essential cookies, and from browser controls that block or delete them.</p>
<p><strong>Question 5 (Paper 1, 6 marks).</strong> Describe how a cryptocurrency transaction is recorded on a blockchain and state two disadvantages of cryptocurrency.</p>
<p>Answer: The payer's wallet creates and signs the transaction with the payer's private key. It is broadcast to the peer-to-peer network, where nodes verify the signature and that the funds exist. A miner groups it into a block and competes to solve the proof-of-work puzzle; the winning block references the previous block's hash and is appended to every node's copy of the ledger, making the record tamper-evident. Disadvantages: values are extremely volatile, mining uses vast amounts of electricity, transactions are irreversible (lost keys mean lost funds), and the pseudonymous design attracts illegal use.</p>
<p><strong>Question 6 (Paper 1, 2 marks).</strong> Explain why a shop might prefer card payments to cryptocurrency.</p>
<p>Answer: Card payments come with consumer protection, refunds and chargebacks, and prices stay stable because the currency is regulated; cryptocurrency values can swing dramatically between sale and settlement and payments cannot be reversed if something goes wrong.</p>
<p>Paper 1 closes with the systems that act on their own — automated systems, robotics and artificial intelligence.</p>
`,
  },
};
