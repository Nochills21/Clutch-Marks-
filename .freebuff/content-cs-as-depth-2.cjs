// Computer Science AS batch 6: Pearson Edexcel IAL Computer Science (YCP11),
// Unit 1 Principles of Computer Science - networks including the internet,
// operating systems and language translators with data security and integrity,
// and ethics, ownership and artificial intelligence. Full rewrites of rows that
// were stored as raw markdown. Apply:
//   node .freebuff/deepen-materials.cjs .freebuff/content-cs-as-depth-2.cjs > .freebuff-tmp/cs-as-depth-2.sql
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/cs-as-depth-2.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/cs-as-depth-2.sql --apply    (live)
//   node .freebuff/gate-notes-depth.cjs computer-science AS
module.exports = {
  expectType: "notes",
  titles: {
    "c1d1652f-cd1f-4ce5-b824-a753d5fc6db0": "Edexcel IAL Computer Science: Networks Including the Internet",
    "6a16eae8-e107-4e78-bbf3-f9767aa67e18": "Edexcel IAL Computer Science: Operating Systems, Translators and Data Security",
    "676e85b2-92ba-4147-a226-ffb7f1a011a0": "Edexcel IAL Computer Science: Ethics, Ownership and Artificial Intelligence",
  },
  rows: {
    "c1d1652f-cd1f-4ce5-b824-a753d5fc6db0": `
<h2>Edexcel IAL Computer Science: Networks Including the Internet</h2>
<p>Pearson Edexcel International Advanced Level in Computer Science, Unit 1 Principles of Computer Science: networks including the internet. This note covers networking from the physical layer up — why networks exist, how bits travel over media and through hardware, how protocols layer to make communication reliable, and how the internet's addressing and routing deliver a packet across the world. Every packet flow is traced hop by hop, because the exam rewards answers that follow data's actual path rather than naming components.</p>

<h3>Why build networks</h3>
<p>Networking exists to share: files and data, peripherals such as printers and scanners, internet connections, and services such as email and cloud storage. Beyond sharing, networks enable communication and collaboration, centralised administration (accounts, security policies, backups) and remote working. The trade-offs are administration overhead, the security exposure of every connected machine, and dependence on connectivity.</p>
<p>Network classifications by scale: a <strong>LAN</strong> covers one site over privately owned cabling; a <strong>WLAN</strong> is a LAN using radio links; a <strong>WAN</strong> spans sites over leased or public infrastructure (the internet is the largest WAN). Architectures: <strong>client–server</strong> (dedicated servers manage accounts, files and security; centralised control and backup, but costly and a single point of failure) versus <strong>peer-to-peer</strong> (equal machines sharing resources; cheap and simple, but no central control or easy backup). Cloud computing extends client–server to on-demand rented infrastructure, trading capital cost and elasticity against data-privacy and connectivity dependence.</p>

<h3>Transmission: modes and media</h3>
<table border="1" cellpadding="6">
<tr><th>Medium</th><th>Carries</th><th>Best points</th><th>Weaknesses</th></tr>
<tr><td>Twisted pair (Cat5e/6)</td><td>Electrical pulses</td><td>Cheap, easy to install; up to ~100 m per run</td><td>Interference, distance limited</td></tr>
<tr><td>Coaxial</td><td>Electrical pulses, shielded</td><td>Better shielding; TV/cable broadband</td><td>Bulkier, lower bandwidth than fibre</td></tr>
<tr><td>Fibre optic</td><td>Light pulses</td><td>Enormous bandwidth, very long runs, immune to electromagnetic interference, hard to tap</td><td>Expensive; specialist installation</td></tr>
<tr><td>Wireless (Wi-Fi, microwave, satellite)</td><td>Radio waves</td><td>Mobility; no cabling</td><td>Interference, obstacles, security risk, shared medium</td></tr>
</table>
<p><strong>Serial</strong> transmission (bits one after another down one channel) dominates long-distance and modern links — cheap cabling, no skew; <strong>parallel</strong> (bits simultaneously down several channels) is confined to short internal buses where skew and crosstalk are manageable. Direction modes: <strong>simplex</strong> (one way — broadcast), <strong>half-duplex</strong> (both ways, one at a time — walkie-talkie), <strong>full-duplex</strong> (both ways at once — switched Ethernet, phone). Synchronous transmission sends a clock-synchronised stream; asynchronous wraps each character in start/stop bits.</p>
<p>Performance vocabulary: <strong>bandwidth</strong> is the maximum data rate (bps); <strong>latency</strong> is delay. Transfer time ≈ file size in bits ÷ bandwidth — and converting bytes to bits (×8) is the classic slip.</p>

<h3>Network hardware and addressing</h3>
<ul>
<li><strong>NIC</strong> — the interface giving a device a connection and its hardware MAC address.</li>
<li><strong>Switch</strong> — forwards frames within a LAN, learning which MAC address sits on which port; reduces collisions versus a hub (which broadcasts blindly).</li>
<li><strong>Router</strong> — joins networks and forwards packets between them using IP addresses and a routing table; the boundary between LAN and internet.</li>
<li><strong>Access point</strong> — bridges wireless clients to the wired LAN.</li>
<li><strong>Modem / ONT</strong> — converts signals for transmission over the line (fibre, cable, phone) to the ISP.</li>
<li><strong>Firewall</strong> — filters traffic by rules; often built into routers or hosts.</li>
</ul>
<p>Addresses at different layers: <strong>MAC</strong> addresses identify the NIC within the local network (flat, hardware-assigned); <strong>IP</strong> addresses identify a device on internetworks (hierarchical, assigned by the network, enabling routing). IPv4's 32-bit addresses (dotted decimal, e.g. 192.168.1.10) are exhausted; IPv6's 128-bit addresses restore abundance and add built-in security and auto-configuration. A subnet mask separates the network portion of an address from the host portion.</p>

<h3>Protocols and layering</h3>
<p>A <strong>protocol</strong> is an agreed set of rules — message format, order, error handling — so any vendor's devices interoperate. Layering splits the job: the <strong>TCP/IP</strong> model has application (HTTP, SMTP, FTP), transport (TCP or UDP), internet (IP) and network-access (Ethernet, Wi-Fi) layers. <strong>TCP</strong> is connection-oriented and reliable: it numbers segments, acknowledges receipt, retransmits losses and reassembles in order. <strong>UDP</strong> is connectionless and fast, tolerating loss (streaming, gaming, DNS). <strong>IP</strong> handles addressing and routing. Encapsulation wraps each layer's data with that layer's header as the message descends the stack.</p>
<table border="1" cellpadding="6">
<tr><th>Protocol</th><th>Layer role</th></tr>
<tr><td>HTTP / HTTPS</td><td>Web page request and delivery (HTTPS adds TLS encryption)</td></tr>
<tr><td>FTP / SFTP</td><td>File transfer</td></tr>
<tr><td>SMTP, POP3, IMAP</td><td>Send email / collect email (POP3 downloads-and-deletes; IMAP synchronises)</td></tr>
<tr><td>DNS</td><td>Resolves domain names to IP addresses</td></tr>
<tr><td>DHCP</td><td>Assigns IP configuration to devices automatically</td></tr>
<tr><td>TCP / UDP / IP</td><td>Transport and internetwork delivery</td></tr>
</table>

<h3>Worked example: the internet, end to end</h3>
<pre><code>Trace: a browser requests https://example.com/page.html from a home network.

1. The browser checks its cache and the OS DNS cache; not found, so a DNS
   query is needed.
2. DHCP gave this machine its IP, gateway and DNS server at boot; the DNS
   query goes to that server (possibly through several resolvers) and returns
   the IP address of example.com.
3. A TCP connection opens to the server's IP on port 443 (three-way SYN,
   SYN-ACK, ACK). For HTTPS, a TLS handshake follows: the server presents a
   certificate, the client verifies it with a trusted CA and derives a
   symmetric session key.
4. The client sends GET /page.html (over the encrypted channel).
5. The request is encapsulated: TCP segment -> IP packet (source and
   destination addresses) -> Ethernet frames on the LAN.
6. The home router performs NAT (its public IP stands in for private
   addresses) and routes the packet toward the server - possibly a dozen hops,
   each router reading the IP header and forwarding on its routing table.
   Packets of one message may take different routes.
7. The server responds 200 OK with the HTML; the client reassembles segments
   in order (TCP sequence numbers), decrypts (TLS), parses the HTML and
   requests its images and CSS the same way.
8. If any segment is corrupted (checksum) or lost, TCP retransmits; the
   browser renders progressively.</code></pre>
<p>Public versus private addressing: private ranges (10.x, 192.168.x) are not routable on the internet and are mapped through <strong>NAT</strong>; <strong>firewalls</strong> and network security appliances guard the boundary; proxy servers cache content to save bandwidth.</p>

<h3>Network performance and reliability</h3>
<p>Explanations of slow networks combine the vocabulary: contention on shared media, insufficient bandwidth for the load, high latency on long or satellite links, and collision domains (shrunk by switches). Redundancy — extra links, multiple servers — improves availability; the cost is complexity. Fault tolerance and load balancing are the reliability side of the same story.</p>
<pre><code>Worked: a 250 MB database backup goes over a 50 Mbps link.

  250 MB = 250 x 8 = 2000 megabits
  2000 / 50 = 40 seconds (ideal; protocol overheads add a little)

Same file over an 11 Mbps Wi-Fi link at 60% of rated throughput:
  effective rate = 6.6 Mbps -> 2000 / 6.6 = 303 seconds = about 5 minutes.
Bandwidth of the weakest segment and contention from other users dominate
real transfer times.</code></pre>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Calling the switch a router: switches forward within a LAN by MAC address; routers forward between networks by IP address.</li>
<li>Saying DNS "converts IPs into names"; it resolves names to IP addresses (the reverse lookup is a special case).</li>
<li>Forgetting NAT when explaining how many private-addressed devices share one public IP.</li>
<li>Describing TCP as fast and UDP as reliable — it is the other way round: TCP reliable/connection-oriented, UDP fast/connectionless.</li>
<li>Ignoring the ×8 byte-to-bit conversion in transfer-time calculations.</li>
<li>Claiming packets always take the same route or arrive in order; TCP's sequence numbers exist precisely because they may not.</li>
<li>Listing cable types without their trade-off pairs (bandwidth/distance/cost/interference) — the comparison is the mark.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Unit 1, 4 marks).</strong> Describe the function of a router and a switch in a school network.</p>
<p>Answer: A switch connects devices within the LAN and forwards each frame only to the port where the destination MAC address was learned, keeping local traffic contained and reducing collisions. A router connects the school LAN to the internet and other networks, reading each packet's IP address and consulting its routing table to forward packets between networks, performing NAT for the school's private addresses.</p>
<p><strong>Question 2 (Unit 1, 4 marks).</strong> Explain the purpose of TCP and IP in downloading a file.</p>
<p>Answer: IP addresses and routes packets: it stamps source and destination IP addresses on each packet and forwards them hop by hop between networks. TCP guarantees delivery: it splits the file into segments, numbers them, reassembles them in order at the destination, acknowledges receipt, retransmits lost or corrupt segments, and controls flow so the receiver is not overwhelmed.</p>
<p><strong>Question 3 (Unit 1, 4 marks).</strong> Compare fibre optic and twisted-pair cabling for a campus backbone.</p>
<p>Answer: Fibre carries light, giving far higher bandwidth over much longer distances and immunity to electromagnetic interference and eavesdropping — ideal for a backbone linking buildings. Twisted pair is much cheaper and easier to install but limited to roughly 100 m per run and lower speeds, suiting horizontal runs to desks. A backbone carrying traffic for many buildings needs fibre's bandwidth and distance; twisted pair serves the final connection.</p>
<p><strong>Question 4 (Unit 1, 5 marks).</strong> Describe what happens when a user types a URL into a browser.</p>
<p>Answer: The domain name is resolved to an IP address via DNS. A TCP connection opens to the web server at that address (port 80 or 443). For HTTPS, a TLS handshake authenticates the server with its certificate and negotiates a session key. The browser sends an HTTP GET request for the page; the server replies with the HTML and status code; the browser parses the HTML, fetches linked resources, and renders the page.</p>
<p><strong>Question 5 (Unit 1, 3 marks).</strong> Explain two advantages of using DHCP.</p>
<p>Answer: Devices receive IP addresses, subnet mask, gateway and DNS automatically — so configuration is error-free and fast for every new device, addresses are reused when devices leave rather than wasted, and a change of network settings is made centrally rather than on every machine.</p>
<p><strong>Question 6 (Unit 1, 3 marks).</strong> Explain why UDP might be chosen for video conferencing.</p>
<p>Answer: Real-time conversation prioritises low delay over perfect reliability: a lost packet is skipped rather than retransmitted, because a retransmitted late frame is worse than a missing one. UDP's minimal overhead and absence of acknowledgement round-trips keep latency low and support smooth playback.</p>
<p>Networks carry data between machines; the next note covers the software layer that manages each machine and protects that data.</p>
`,

    "6a16eae8-e107-4e78-bbf3-f9767aa67e18": `
<h2>Edexcel IAL Computer Science: Operating Systems, Translators and Data Security</h2>
<p>Pearson Edexcel International Advanced Level in Computer Science, Unit 1 Principles of Computer Science: operating systems and their purposes, language translators, and data security and integrity. This note goes below the GUI: what an operating system actually allocates and protects, how source code becomes machine instructions, and how data is kept correct and confidential — with the security section structured as threat → mechanism → defence, the shape examiners mark against.</p>

<h3>The operating system as resource manager</h3>
<p>An <strong>operating system</strong> is the system software that manages the hardware and provides services to applications. Two complementary views: the <strong>resource manager</strong> (allocating CPU time, memory, storage and peripherals fairly and efficiently) and the <strong>extended machine</strong> (hiding hardware complexity behind clean interfaces so applications never program the disk controller directly).</p>
<ul>
<li><strong>Processor management</strong> — scheduling processes onto the CPU; time slicing and priorities give multitasking; a process moves between ready, running and blocked states.</li>
<li><strong>Memory management</strong> — allocating RAM to processes, protecting one process's space from another, and using virtual memory (paging to backing store) when RAM is exhausted.</li>
<li><strong>File management</strong> — directories, file naming, access permissions, and tracking free space.</li>
<li><strong>Device management</strong> — device drivers translate OS requests into device-specific commands; a buffer smooths speed differences between CPU and peripherals; interrupts and spooling coordinate them.</li>
<li><strong>User interface</strong> — GUI (intuitive, direct manipulation) or CLI (scriptable, low overhead, precise).</li>
<li><strong>Security</strong> — authentication, access rights, audit logs.</li>
</ul>
<p><strong>Interrupts</strong> underpin responsiveness: a device raises an interrupt; the CPU completes its current instruction, saves state, runs the interrupt service routine (ISR), restores state and resumes. Priorities arbitrate simultaneous interrupts. <strong>Polling</strong> (asking devices in turn) wastes cycles; interrupts let devices signal need.</p>

<h3>Utility software</h3>
<p>Utilities maintain and protect the system: antivirus (signature and heuristic scanning), defragmentation (recontiguating scattered files on magnetic disks — pointless on SSDs), backup (full vs incremental; the 3-2-1 rule: three copies, two media, one off-site), compression, file management, firewalls and disk partitioning tools. The exam wants each utility's function stated as an effect on performance, security or reliability.</p>

<h3>Language translators</h3>
<table border="1" cellpadding="6">
<tr><th>Translator</th><th>Mechanism</th><th>Output</th><th>Consequence</th></tr>
<tr><td>Compiler</td><td>Whole-program translation before execution</td><td>Standalone machine-code executable</td><td>Fast execution; errors reported across the whole program at compile time; recompilation needed per change</td></tr>
<tr><td>Interpreter</td><td>Line-by-line translation and immediate execution</td><td>None saved (translator needed each run)</td><td>Slower; errors surface exactly at the failing line; ideal for development and portability</td></tr>
<tr><td>Assembler</td><td>One mnemonic to one machine instruction</td><td>Machine code for that processor</td><td>Full hardware control; tied to the instruction set</td></tr>
</table>
<pre><code>Same program, two translation paths:

  source:  total = 0
           for i in 1..5: total = total + i
           print(total)

Compiler:  scans the whole file -> syntax check all lines -> optimises ->
           emits executable -> the executable runs at machine speed. The
           compiled file runs again and again with no translator present.

Interpreter: takes line 1, translates and runs it (total = 0 in memory);
           takes line 2's loop, translating and running each iteration; then
           line 3 prints 15. Every rerun repeats the translation.

Intermediate languages (bytecode for the JVM) sit between: compiled once,
interpreted or JIT-compiled at run time - portable without source exposure.</code></pre>

<h3>Choosing a translator: worked factors</h3>
<p>Exam questions ask which translation approach suits a given project; the answer weighs four factors. <strong>Execution speed:</strong> compiled code runs at machine speed — pick it for number-crunching or embedded targets. <strong>Development cycle:</strong> interpreters give immediate feedback and pinpointed errors — pick them for prototyping and teaching. <strong>Portability:</strong> an interpreter or bytecode VM runs anywhere the runtime exists; native executables need rebuilding per platform. <strong>Intellectual property:</strong> distributing an executable or bytecode keeps source private; distributing interpreted source exposes it. Hybrid systems (Java's compile-to-bytecode then JIT, or Python's compiled .pyc cache) mix the trade-offs — mention them when the question allows.</p>

<h3>Data security and integrity</h3>
<p><strong>Security</strong> protects confidentiality, integrity and availability of data; <strong>integrity</strong> means data is accurate, complete and unaltered — maintained by validation at input, verification, access control and transaction controls. The two ideas interlock: a security breach often destroys integrity (tampering), and integrity measures (checksums, audit trails) also reveal breaches.</p>
<table border="1" cellpadding="6">
<tr><th>Threat</th><th>Mechanism</th><th>Defence</th></tr>
<tr><td>Malware (virus/worm/trojan/ransomware)</td><td>Malicious code: attaches and replicates / spreads over networks / disguises itself / encrypts for ransom</td><td>Antivirus, patching, firewalls, least privilege, offline backups</td></tr>
<tr><td>Phishing / social engineering</td><td>Manipulating people into revealing credentials</td><td>Training, verification procedures, spam filters, 2FA</td></tr>
<tr><td>Brute force / dictionary attacks</td><td>Automated password guessing</td><td>Long complex passwords, lockouts, rate limiting, hashing with salt</td></tr>
<tr><td>Interception / sniffing</td><td>Eavesdropping on traffic</td><td>Encryption (TLS, VPNs), secure protocols</td></tr>
<tr><td>DoS / DDoS</td><td>Overwhelming a service with traffic</td><td>Traffic filtering, rate limiting, redundancy</td></tr>
<tr><td>SQL injection</td><td>Hostile input executed as code</td><td>Parameterised queries, input validation</td></tr>
<tr><td>Insider misuse</td><td>Authorised users exceeding need</td><td>Least privilege, auditing, separation of duties</td></tr>
</table>
<p>Access-control mechanisms: <strong>authentication</strong> (knowledge, possession, inherence — and two-factor combinations), <strong>authorisation</strong> (rights matrices and role-based access), <strong>encryption</strong> (symmetric AES for bulk; asymmetric RSA for key exchange and signatures; hashing for password storage and integrity), and <strong>physical security</strong>. Passwords are stored as salted hashes so a database leak does not yield usable passwords.</p>
<pre><code>Worked: protecting a payroll database, defence in depth.

Layer 1 physical: locked server room, encrypted backups off-site.
Layer 2 network: firewall rules; payroll VLAN; TLS for all access.
Layer 3 host: patched OS; antivirus; full-disk encryption.
Layer 4 application: parameterised queries (SQL injection), session timeouts.
Layer 5 data: least-privilege roles (clerk sees one department; only the
              payroll officer sees salaries); all changes audit-logged.
Layer 6 people: security training, two-factor admin logins, separation of
              duties (the person who adds employees is not the one who
              approves pay changes).

An attacker must beat every layer; a defender must hold each one - asymmetry
the answer should name.</code></pre>
<p>Integrity in databases: validation (type, range, length, presence, check digits), verification (double entry, visual checks), and access-controlled updates. Recovery: backups, transaction logs, journaling — restoring to the last consistent state after failure.</p>

<h3>Worked example: analysing a breach</h3>
<pre><code>Incident: an admin's credentials are phished; an attacker copies the customer
table overnight; data appears on a leak site.

Analysis against the layers:
  phishing succeeded -> no 2FA on admin accounts (authentication gap);
  overnight copy unnoticed -> no anomaly alerting on bulk reads (monitoring);
  full table visible -> excessive rights; data not encrypted at rest;
  customer impact -> notification obligations triggered.

Remediation: enforce 2FA on all admin access; alert on bulk export; encrypt
the table at rest; reduce each account to least privilege; staff refresher on
phishing; restore confidence with a published incident report.</code></pre>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Describing the OS as "the software you click on"; frame it as resource management and services — scheduling, memory, files, devices.</li>
<li>Saying virtual memory makes a computer faster; it prevents crashes when RAM is full at the cost of speed.</li>
<li>Confusing compilation with interpretation in a comparison; the deliverable (executable versus nothing saved) is the decisive point.</li>
<li>Claiming compiled code can never be interpreted or vice versa — hybrid systems (JVM) exist; the question wants the primary mechanism.</li>
<li>Answering security questions with antivirus alone; map each threat to its mechanism and defence.</li>
<li>Storing passwords encrypted rather than hashed (reversible storage is a vulnerability), or hashing without a salt (rainbow tables).</li>
<li>Conflating validation with verification: validation checks plausibility of the value; verification checks it matches the source.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Unit 1, 4 marks).</strong> Describe two operating system functions and why each matters.</p>
<p>Answer: Memory management allocates RAM to each running process and protects one process's memory from another, so programs cannot corrupt each other and available RAM is used fully; virtual memory lets processes exceed physical RAM. Processor scheduling allocates CPU time among processes (time slicing, priorities), so several programs appear to run at once and urgent tasks are not starved.</p>
<p><strong>Question 2 (Unit 1, 4 marks).</strong> Explain how an interrupt improves the efficiency of I/O.</p>
<p>Answer: Instead of the CPU repeatedly polling each device (wasting cycles on idle devices), a device raises an interrupt when it needs service. The CPU finishes its current instruction, saves the program counter, runs the device's ISR, and resumes exactly where it left off — so the CPU does useful work until attention is genuinely required.</p>
<p><strong>Question 3 (Unit 1, 4 marks).</strong> Compare compiled and interpreted approaches for a cross-platform scientific application.</p>
<p>Answer: A compiled version runs at full machine speed — critical for heavy computation — but needs a separate build per platform and a recompile for each change. An interpreter runs unchanged anywhere the interpreter exists, simplifying distribution and debugging, but executes more slowly because translation repeats at run time. For number-crunching, compile; for portability and rapid iteration, interpret — or compile to portable bytecode.</p>
<p><strong>Question 4 (Unit 1, 4 marks).</strong> Explain how hashing protects stored passwords.</p>
<p>Answer: Passwords are never stored in plain text; a one-way hash function maps each password to a fixed-length digest that cannot be reversed. A random salt per user defeats rainbow-table and precomputed-dictionary attacks, and equal passwords then hash differently. At login the submitted password is hashed with the stored salt and compared. Even a database leak yields only digests, which must be cracked one guess at a time.</p>
<p><strong>Question 5 (Unit 1, 5 marks).</strong> Describe how a company can protect data against both external attack and internal misuse.</p>
<p>Answer: External: firewalls and patched systems block and contain attacks; TLS/VPNs stop interception; 2FA and strong password policies defeat credential theft; tested off-site backups defeat ransomware. Internal: least-privilege roles ensure staff access only what their job needs; audit logs and anomaly alerts deter and detect misuse; separation of duties prevents any one person completing a sensitive action alone; training builds a reporting culture. Together these give defence in depth across technology and people.</p>
<p><strong>Question 6 (Unit 1, 3 marks).</strong> Explain the difference between validation and verification with examples.</p>
<p>Answer: Validation checks that data is plausible before storage — a range check rejects a mark of 250, a type check rejects "abc" as an integer. Verification checks the data captured matches the source — double-entering a new bank account number, or visually checking a scanned form against the record. Validation enforces integrity of values; verification enforces accuracy of capture.</p>
<p>The last Unit 1 domain steps back from mechanisms to consequences: who owns data, what is fair use, and what AI changes.</p>
`,

    "676e85b2-92ba-4147-a226-ffb7f1a011a0": `
<h2>Edexcel IAL Computer Science: Ethics, Ownership and Artificial Intelligence</h2>
<p>Pearson Edexcel International Advanced Level in Computer Science, Unit 1 Principles of Computer Science: ethical, legal, environmental and cultural impacts of computing, ownership of data and software, and artificial intelligence. Exam answers in this domain win marks by applying named frameworks and legislation to a scenario — not by expressing opinions. Every section below therefore pairs the concept with the specific clause, law or metric that makes it examinable.</p>

<h3>Ethical frameworks applied to computing</h3>
<p>Ethics asks what <em>should</em> be done where law alone does not settle it. Useful stances to name: <strong>utilitarianism</strong> (the greatest good for the greatest number — cost–benefit analyses of surveillance systems), <strong>deontology</strong> (duties and rules — a rule against reading users' messages regardless of benefit), <strong>virtue ethics</strong> (what a responsible professional would do), and <strong>fairness/accountability/transparency</strong> (the modern data-ethics triad). Scenario work applies one explicitly: "a utilitarian would support the tracking programme because…, but a deontologist objects to the means…".</p>
<table border="1" cellpadding="6">
<tr><th>Ethical issue</th><th>Core tension</th><th>Classic case</th></tr>
<tr><td>Privacy vs security</td><td>Protection through surveillance against personal autonomy</td><td>Contact tracing; CCTV; encryption backdoors</td></tr>
<tr><td>Autonomy vs automation</td><td>Machine decisions replacing human judgement</td><td>Automated hiring; self-driving car dilemmas</td></tr>
<tr><td>Access and the digital divide</td><td>Equal opportunity in an online society</td><td>Remote exams without devices; rural connectivity</td></tr>
<tr><td>AI bias and fairness</td><td>Decisions reflecting historical discrimination</td><td>Credit scoring; facial recognition error rates</td></tr>
<tr><td>Environmental cost</td><td>Capability against energy and e-waste</td><td>Data-centre power; model training carbon</td></tr>
</table>

<h3>Legal frameworks: ownership, IP and data protection</h3>
<ul>
<li><strong>Copyright</strong> — automatically protects original creative work (code, text, images, music); the creator owns it unless assigned (employment: usually the employer). It protects expression, not ideas.</li>
<li><strong>Licences</strong> — the terms of use: <strong>open-source</strong> licences (GPL, MIT) permit use, modification and redistribution under conditions; <strong>proprietary/EULA</strong> licences restrict copying and reverse engineering; <strong>Creative Commons</strong> licenses content sharing with conditions (attribution, non-commercial, share-alike).</li>
<li><strong>Patents</strong> — protect inventions (a novel algorithm or process) for a fixed term in exchange for public disclosure; <strong>trademarks</strong> protect identifiers (names, logos).</li>
<li><strong>Plagiarism and citation</strong> — presenting others' work as one's own breaches academic and professional rules; proper attribution is both ethical and often a licence condition.</li>
<li><strong>Data protection</strong> (e.g. UK/EU GDPR): lawful basis for processing, purpose limitation, data minimisation, accuracy, storage limitation, security, accountability; individual rights (access, rectification, erasure, portability); penalties for breaches; special protection for children's data.</li>
<li><strong>Computer misuse law</strong> (e.g. the UK Computer Misuse Act): unauthorised access, unauthorised access with intent to commit further offences, and unauthorised modification of data are criminal offences.</li>
</ul>
<pre><code>Worked: applying the law to a scenario.

A student builds a revision app. Considerations in order:
  1. Copyright: the past-paper questions scanned into the app belong to the
     board - reproduction needs a licence, regardless of good intentions.
  2. Data protection: user accounts store emails and performance data -
     a privacy notice, lawful basis (consent/contract), minimisation (don't
     collect birthdates if unused) and the right to erasure are required.
  3. Licensing: if the app links a GPL library, the licence's conditions may
     extend to the app's distribution - check before shipping closed source.
  4. Employment/ownership: built as a school project? The school may own the
     code under its IP policy - check before commercialising.
  5. Computer misuse: scraping the board's site against its terms, or testing
     security on systems without permission, is a criminal matter, not a
     technicality.</code></pre>

<h3>Professional practice and codes of conduct</h3>
<p>Professional bodies publish codes of conduct (BCS, ACM, IEEE) binding members to standards beyond the law: acting in the public interest, maintaining competence, avoiding conflicts of interest, respecting confidentiality, and reporting problems honestly. Scenario questions test conflicts directly: a manager demands shipping known-flawed software — the code requires refusing or escalating, because competence and public interest outrank the deadline. Whistleblowing provisions exist for serious wrongdoing, and professional liability grows with safety-critical systems (medical, automotive, financial): rigour, documentation and testing are ethical duties there, not just good practice.</p>

<h3>Environmental and cultural impacts</h3>
<p>Environmental: the energy footprint of data centres and training runs (large models consume megawatt-hours), <strong>e-waste</strong> from rapid device replacement (with toxic components and planned obsolescence), and resource extraction for hardware — against the gains from smart grids, dematerialisation (digital services replacing physical goods) and remote work. Mitigation: renewable-powered data centres, efficient cooling and hardware, device longevity, repairability and recycling programmes; <strong>WEEE</strong>-style regulation mandates disposal and recycling.</p>
<p>Cultural: global communication and access to knowledge versus the <strong>digital divide</strong> (age, income, geography), the spread of misinformation and filter bubbles, effects on attention and social interaction, automation's impact on work and the skills it rewards, and AI's effect on creativity and authorship. Well-structured answers name both sides and weigh them for the specific stakeholder.</p>

<h3>Artificial intelligence</h3>
<p><strong>AI</strong> is software performing tasks that would appear intelligent if done by humans. <strong>Machine learning</strong> derives behaviour from data rather than explicit rules; <strong>neural networks</strong> are layered weighted structures trained by adjusting weights from errors (deep learning adds layers); <strong>expert systems</strong> apply a knowledge base of rules via an inference engine; <strong>natural language processing</strong> covers understanding and generation (translation, chatbots, sentiment); <strong>robotics</strong> couples perception and actuation with decision-making.</p>
<pre><code>Training a neural network, step by step:

1. Gather labelled data (e.g. images labelled "cat"/"not cat").
2. Initialise the network's weights to small random values.
3. Forward pass: input flows through the layers to a predicted label.
4. Loss: measure the difference between prediction and truth.
5. Backpropagation: compute how each weight contributed to the error and
   nudge it in the direction that reduces the loss (gradient descent).
6. Repeat over many examples and epochs until validation accuracy plateaus.
7. Evaluate on held-out data; deploy; monitor for drift as the world changes.

The trained weights are the program - no human wrote the rules it uses.</code></pre>
<p>Applications: medical imaging diagnosis, recommendation, fraud detection, autonomous vehicles, translation. Strengths: consistency, speed over huge datasets, tireless operation, improvement with data. Limits: data hunger and cost, opacity of deep models, brittleness outside training distribution, bias replication, no genuine understanding or common sense.</p>
<table border="1" cellpadding="6">
<tr><th>Ethical issue in AI</th><th>Detail</th><th>Response</th></tr>
<tr><td>Bias</td><td>Training data encodes historical discrimination; error rates differ across groups</td><td>Audited datasets, fairness metrics, diverse teams, human review</td></tr>
<tr><td>Opacity</td><td>Deep models cannot explain a decision</td><td>Explainable-AI methods; right to explanation in law; appeal paths</td></tr>
<tr><td>Accountability</td><td>Who is responsible for an autonomous decision?</td><td>Clear liability chains; human-in-the-loop for high-stakes decisions</td></tr>
<tr><td>Employment</td><td>Automation displaces some tasks and creates others</td><td>Retraining, transition policy, augmentation rather than replacement</td></tr>
<tr><td>Generative AI and IP</td><td>Trained on others' work; outputs may reproduce it</td><td>Licence terms, attribution, disclosure of AI assistance</td></tr>
</table>

<h3>Worked example: an ethics case study in full</h3>
<pre><code>Scenario: a school adopts AI proctoring software for online exams. Evaluate.

Stakeholders: students, teachers, the vendor, parents.
Arguments for: deters cheating (integrity of qualifications); scalable;
consistent flagging.
Arguments against: face recognition error rates are higher for some groups
(fairness/bias); continuous video of students' homes is intrusive (privacy -
GDPR requires lawful basis, minimisation and impact assessment); automated
flags without appeal deny due process (autonomy, accountability); screen and
camera monitoring raises the school's data-security burden.
Cultural angle: normalises surveillance; may disadvantage students without
quiet rooms or stable connections (digital divide).
Weighed conclusion: a utilitarian case exists only if errors are rare and
appeals exist; the deontological objection to home surveillance is strong.
Mitigations: DPIA first, minimal data, human review of every flag, opt-out
alternatives, transparent retention limits.</code></pre>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Opinion without framework: "I think it's wrong" scores nothing; "a deontological view objects because…" scores.</li>
<li>Quoting legislation vaguely ("the data protection act"); name the law and the specific provision type (lawful basis, right to erasure, unauthorised access offence).</li>
<li>Claiming copyright protects ideas; it protects their expression — patents protect ideas/inventions.</li>
<li>Equating open source with free of charge; the distinction is licence freedoms, not price.</li>
<li>One-sided ethics answers; every evaluation wants both sides weighed for named stakeholders.</li>
<li>Describing machine learning as programmed rules; the defining feature is learning from data.</li>
<li>Ignoring the environment in "impacts of computing" questions: energy, e-waste and mitigation are marks.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Unit 1, 6 marks).</strong> Discuss the ethical issues of a city deploying facial recognition in public spaces.</p>
<p>Answer: Security benefit: faster suspect identification and deterrence. Against: pervasive surveillance erodes privacy and autonomy (a deontological objection — treating citizens as suspects); accuracy varies across demographic groups, risking discriminatory stops (fairness); function creep extends use beyond the original purpose; data breaches would expose biometrics that cannot be changed (irreversible harm). A utilitarian balance depends on demonstrable effectiveness and strict safeguards — purpose limitation, independent oversight and deletion limits.</p>
<p><strong>Question 2 (Unit 1, 4 marks).</strong> Explain the difference between copyright and open-source licensing for a software developer.</p>
<p>Answer: Copyright automatically gives the developer exclusive rights to copy, modify and distribute their code, protected against unauthorised use. An open-source licence is the copyright holder's chosen set of permissions: others may use, study, modify and share the code provided they meet conditions (attribution under MIT; sharing derivative source under GPL). The developer retains copyright but grants defined freedoms — open source is a licensing choice, not the absence of rights.</p>
<p><strong>Question 3 (Unit 1, 5 marks).</strong> A company wants to store customer data indefinitely "for analytics". Explain its obligations under data protection principles.</p>
<p>Answer: It must identify a lawful basis and state purposes (purpose limitation); collect only what those purposes need (data minimisation); keep data accurate; retain it no longer than necessary (storage limitation — indefinite retention is non-compliant without justification); secure it (integrity and confidentiality); and demonstrate compliance (records, impact assessments). Individuals hold rights of access, rectification and erasure. Breaches attract notification duties and fines.</p>
<p><strong>Question 4 (Unit 1, 4 marks).</strong> Describe two environmental impacts of computing and one mitigation for each.</p>
<p>Answer: Data centres and AI training consume enormous electricity with associated carbon emissions — mitigated by renewable energy sourcing, efficient cooling and right-sized workloads. Rapid hardware replacement creates toxic e-waste — mitigated by extended producer responsibility, repairability design, refurbishment and certified recycling.</p>
<p><strong>Question 5 (Unit 1, 5 marks).</strong> Explain how machine learning systems can exhibit bias and how organisations can reduce it.</p>
<p>Answer: Models learn patterns from historical data; if hiring or lending data reflects past discrimination, the model reproduces and can amplify it — and uneven error rates across groups cause disparate impact even without intent. Reduction: curate and audit training data for representation; measure performance per subgroup with fairness metrics; test before deployment and monitor afterwards; keep humans accountable for high-stakes decisions; build diverse development teams; document data and model limitations.</p>
<p><strong>Question 6 (Unit 1, 3 marks).</strong> Explain the difference between an expert system and a machine learning system.</p>
<p>Answer: An expert system encodes human expertise as explicit IF–THEN rules over a knowledge base, applied by an inference engine — transparent but limited to encoded knowledge and costly to build. A machine learning system derives its behaviour from data by adjusting internal parameters during training — capable of pattern recognition at scale, but opaque and dependent on data quality.</p>
<p>Unit 1 is complete. Unit 2 turns from what computing is to the craft of producing working software: computational thinking, algorithm design and disciplined programming.</p>
`,
  },
};
