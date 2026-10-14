insert into public.learning_objectives (topic_id, code, statement, teach, sort_order)
values
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'networking-communication'), '0478 2.1a', $st$Compare simplex, half-duplex and full-duplex transmission, giving an example of each.$st$, $teach$### What is being asked
Classify a transmission by direction rules or pick the mode a scenario needs. The answer is the direction pattern — who can send, and when.

### Method
1. Simplex: one direction only, always (TV broadcast, sensor to controller). Nothing ever replies on the same channel.
2. Half-duplex: both directions, but one at a time (walkie-talkie, with "over" marking the turn). Taking turns is the rule.
3. Full-duplex: both directions simultaneously (phone call). Neither side waits for a turn.
4. Classify by asking two questions: can B reply at all (rules out simplex)? Can both talk at once (rules out half)?

### Worked example
A baby monitor streams audio to the parents' unit with no reply channel: simplex — sound travels one way only. Check: no reply is possible (not half), and nothing travels back ever (not full) — both tests agree.

### Traps
- "Two-way" always means full. Walkie-talkies are two-way but half-duplex — simultaneity, not direction count, decides.
- Confusing the device with the mode. A phone call is full-duplex; the phone itself can do many modes.
- Simplex as "broken duplex". One-way is a design (broadcasts, sensors), not a failure.
- Forgetting the example must match. A correct name with a wrong-direction example still loses the mark.

### Timing
Paper 1: 2 minutes, 2-3 marks. The two-question test classifies anything in seconds — apply it, don't recall lists.$teach$, 1),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'networking-communication'), '0478 2.1b', $st$Compare serial, parallel and USB transmission, and choose between them for a scenario.$st$, $teach$### What is being asked
Pick how bits travel between devices. The answer trades distance, speed, cost and reliability — the cable length usually decides.

### Method
1. Serial: bits one at a time down one wire. Cheap, reliable over long distances, slower per second at the same clock — but modern serial (USB) clocks very fast.
2. Parallel: many bits at once down many wires. Fast over short runs, but wires interfere (skew) over distance, and cables cost more.
3. USB: universal serial bus — serial, hot-swappable, powers small devices, one connector for most peripherals.
4. Choose by distance first (long means serial), then by convenience (many devices means USB), then by legacy (old printers expected parallel).

### Worked example
A 15-metre link from office PCs to a plotter: serial/USB, because parallel skew corrupts multi-wire data over that distance. Check: speed tempts parallel, but bits arriving at different times is not speed — reliability rules beyond a few metres.

### Traps
- "Parallel is always faster". Only over short cables; beyond metres, skew destroys the advantage serial keeps.
- USB as a duplex mode. USB is a serial connection standard, not a direction rule — a different axis entirely.
- More wires means more reliable. Each extra wire is another victim of interference, not another backup.
- Forgetting power and swapping. USB's hot-swap and device powering often decide peripheral questions, not raw speed.

### Timing
Paper 1: 2-3 minutes, 2-3 marks. Distance decides most questions — state the length, then the method it forces.$teach$, 2),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'networking-communication'), '0478 2.2a', $st$Explain even and odd parity checks, and use a parity bit to detect transmission errors.$st$, $teach$### What is being asked
Set or check a parity bit, or judge whether an error occurred. The answer is a count of 1s — even or odd as agreed — including the parity bit itself.

### Method
1. Agree the system first: even parity means the total number of 1s (data plus parity bit) must be even; odd means odd.
2. Setting: count the 1s in the data; choose the parity bit to make the total match the system.
3. Checking: count all 1s received including the parity bit; a mismatch with the system proves corruption.
4. Limits: parity detects single-bit (or any odd-count) errors only — even numbers of flipped bits pass silently, and nothing is corrected.

### Worked example
Even parity, data 1011: three 1s (odd), so the parity bit is 1, making four — even. Received as 1111 with parity 1: five 1s (odd) against even parity, so an error is proven. Check: the check counts every bit on the wire, parity bit included — excluding it breaks the count.

### Traps
- Counting zeros. Parity counts ONES — zeros never enter the total.
- Setting the bit to match the data's parity instead of fixing it. Three 1s under even parity needs a 1 (making four), not a 0.
- Claiming correction. Parity detects; it cannot say which bit flipped, so retransmission (ARQ) follows.
- "Two errors cancel safely". They cancel the count, not the damage — the data is still wrong, just undetectably so.

### Timing
Paper 1: 3 minutes, 3-4 marks. Counts are the method marks — show the 1s counted, not just the verdict.$teach$, 3),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'networking-communication'), '0478 2.2b', $st$Explain checksums, echo checks and ARQ, and compare error-detection methods.$st$, $teach$### What is being asked
Name the method in a scenario or judge which fits. The answer matches who checks what: the receiver recomputes, the sender compares, or the receiver demands repeats.

### Method
1. Checksum: the sender transmits data plus a value computed from it (e.g. a sum); the receiver recomputes and compares — mismatch means corruption.
2. Echo check: the receiver returns everything to the sender, who compares the echo with the original.
3. ARQ (automatic repeat request): blocks carry checks; the receiver acknowledges good blocks and demands damaged ones again (with timeouts).
4. Compare by cost and power: parity is cheap but weak; checksums catch more; echo doubles traffic; ARQ alone actually fixes delivery by resending.

### Worked example
A file downloads with per-block checks and the receiver keeps asking for block 7 until it arrives intact: ARQ — detection plus retransmission. Check: a checksum alone would only report the damage; the repeated requests are ARQ's signature mechanism.

### Traps
- "Checksum corrects errors". It detects (recompute, compare); only resending corrects.
- Echo as receiver-side checking. The receiver returns, the SENDER compares — direction matters.
- ARQ without detection. ARQ decides what to repeat using block checks — it rides on detection, not instead of it.
- Strongest method always wins. Echo doubles traffic and ARQ adds delay — parity still suits tiny fast streams like keyboards.

### Timing
Paper 1: 3 minutes, 3-4 marks. Mechanism questions want the actors: who computes, who compares, who resends.$teach$, 4),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'networking-communication'), '0478 2.3a', $st$Explain symmetric encryption and the key-distribution problem it creates.$st$, $teach$### What is being asked
Explain how one shared key protects data — and where the scheme breaks down. The answer has two halves: the speed, and the delivery problem.

### Method
1. One secret key encrypts and decrypts (e.g. AES). Anyone holding it reads everything; anyone without it sees noise.
2. It is fast and suits bulk data — whole disks and streams.
3. The catch is distribution: the key must reach the other party without interception, but every channel needs protecting by... another key.
4. Conclusion: symmetric encryption is excellent between parties who already share a key, and stuck at the first exchange between strangers.

### Worked example
Two friends encrypt chat with a shared password they agreed in person: fast, private messages. Check: the in-person meeting solved distribution — had they emailed the password, anyone intercepting it would read everything after.

### Traps
- "Shared keys are unbreakable". Strength depends on length and secrecy — a short or leaked key fails whatever the algorithm.
- Sending the key with the data. The locked box arriving with its key attached protects nothing.
- Symmetric means "simple, therefore weak". AES with a long secret key is strong; the weakness is distribution, not the cipher.
- Forgetting the use case. Bulk speed is the reason symmetric survives — judge it where volume matters.

### Timing
Paper 1: 2-3 minutes, 2-3 marks. Distribution is the implict second half of every symmetric question — always state it.$teach$, 5),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'networking-communication'), '0478 2.3b', $st$Explain asymmetric encryption with public and private keys, and compare it with symmetric.$st$, $teach$### What is being asked
Trace who encrypts with what, or judge which scheme fits. The answer keeps the two keys' jobs separate — public locks, private unlocks, never the reverse in transit.

### Method
1. Each party holds a linked pair: a public key shared openly and a private key never shared.
2. Anyone encrypts with the recipient's PUBLIC key; only the recipient's PRIVATE key decrypts. Interception is harmless — the public key was public anyway.
3. It is slow (heavy mathematics), so real systems use it to exchange a symmetric session key, then switch to symmetric for bulk data.
4. Compare on three axes: key sharing (safe vs hard), speed (slow vs fast), use (exchange vs bulk).

### Worked example
A customer encrypts card details with the shop's public key: only the shop's private key opens them, though the public key sat on the website for all to see. Check: a stolen public key encrypts just as well — it cannot decrypt, which is exactly why publishing it is safe.

### Traps
- Encrypting with the private key for secrecy. Private-key use proves identity (signing), it does not hide — secrecy needs the recipient's public key.
- "Asymmetric replaces symmetric". Slowness keeps symmetric for bulk; the pair cooperate (asymmetric opens, symmetric carries).
- Publishing the private key "for convenience". Exposure ends all security — private means private, permanently.
- Two key pairs needed per message. One recipient pair suffices: sender uses the recipient's public key, recipient uses their private one.

### Timing
Paper 1: 3 minutes, 3-4 marks. Key-direction questions are the classic trap — state which key does what before judging.$teach$, 6),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'networking-communication'), '0478 3.4a', $st$Explain how NICs, switches and cables connect devices into a working LAN.$st$, $teach$### What is being asked
Name the hardware a local network needs or trace a message across it. The answer follows the frame: NIC out, cable along, switch across, NIC in.

### Method
1. NIC (network interface card): gives each device a unique MAC address and puts frames onto the network.
2. Cable/media: twisted pair for offices, fibre for speed and distance, wireless access points where cables cannot go.
3. Switch: reads destination MAC addresses and forwards each frame only to the right port — unlike a hub, which shouts to all.
4. Trace messages device to device: sender NIC, cable, switch decision, cable, receiver NIC.

### Worked example
PC A sends a file to PC B through a switch: A's NIC frames it with B's MAC, the cable carries it, the switch reads the address and forwards to B's port only. Check: PC C never sees the frame — selective forwarding, not broadcast, is what makes it a switch and not a hub.

### Traps
- Hub equals switch. Hubs repeat to every port (collisions, snooping); switches learn addresses and forward selectively.
- MAC versus IP. The switch uses MAC (hardware) addresses; routing between networks uses IP — different layers, different devices.
- Wireless needs no hardware. Access points, NICs and backhaul cabling still exist — wireless removes the last cable, not the network.
- Cable choice by price alone. Distance, interference and speed pick the medium; fibre for the backbone, twisted pair for desks.

### Timing
Paper 1: 3 minutes, 3 marks. Trace questions award the path — name each hop the frame touches.$teach$, 7),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'networking-communication'), '0478 3.4b', $st$Explain how routers and modems connect a LAN to the internet.$st$, $teach$### What is being asked
Place the boundary devices or trace a packet leaving for the internet. The answer crosses two borders: LAN to ISP (modem), network to network (router).

### Method
1. Router: joins networks, reads destination IP addresses, and forwards packets toward them — the traffic director between your LAN and the ISP.
2. Modem: converts digital signals to the ISP line's form and back (modulate/demodulate) — the translator at the boundary.
3. Home routers usually bundle both plus a switch, Wi-Fi and firewall — one box, four jobs.
4. Trace outward: LAN switch, router's IP decision, modem conversion, ISP line — each device acts on a different property.

### Worked example
A laptop reaches a website: the home router reads the packet's public IP and sends it WAN-ward; the modem converts it for the fibre/copper line. Check: the router decided by address, the modem translated the signal — addressing versus conversion, never mixed.

### Traps
- Router equals modem. Routing picks paths by IP; modulating converts signals — bundled boxes hide two different jobs.
- The switch reaches the internet. Switches stay inside the LAN on MAC addresses; only the router crosses networks.
- IP addresses on the LAN side facing out. Home routers translate private LAN addresses to the public one (NAT) — the inside addresses never leave.
- "The ISP provides the router's decisions". ISPs carry; the router in your building decides its own forwarding.

### Timing
Paper 1: 2-3 minutes, 2-3 marks. Boundary questions want each device's border — LAN/ISP for the modem, network/network for the router.$teach$, 8)
on conflict (topic_id, code) do update set
  statement = excluded.statement,
  teach = excluded.teach,
  sort_order = excluded.sort_order;
delete from public.quizzes
 where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'networking-communication') and title = 'Checkpoints — Networking & Communication';
insert into public.quizzes (id, topic_id, title, description, is_published, exam_type)
values ('00000000-0000-0000-0000-000000000000', (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'networking-communication'), 'Checkpoints — Networking & Communication', $desc$Short checks, one set per objective in this topic. Answer one wrongly and the objective it belongs to is the thing to revisit — not the whole topic.$desc$, true, 'quiz');
insert into public.questions
  (quiz_id, question_text, options, correct_option, explanation, difficulty, sort_order, objective_id, statement_id)
values
('00000000-0000-0000-0000-000000000000', $qt$A walkie-talkie conversation uses over to hand over speaking turns. What mode is this?$qt$, $opts$["Simplex","Full-duplex","Half-duplex","Serial"]$opts$::jsonb, 2, $ex$Both sides send, but one at a time with turns — half-duplex. Simplex allows no reply; full-duplex needs no turns; serial is a wiring method, not a direction mode.$ex$, 'check', 101, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'networking-communication') and code = '0478 2.1a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Which of these is a simplex transmission?$qt$, $opts$["A phone call between two people","A video call with screen sharing","Two walkie-talkies taking turns","A temperature sensor reporting to a controller"]$opts$::jsonb, 3, $ex$The sensor sends one way with no reply path — simplex. Calls are full-duplex; walkie-talkies are half-duplex.$ex$, 'check', 102, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'networking-communication') and code = '0478 2.1a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Why is parallel transmission unreliable over long cables?$qt$, $opts$["The bits arrive at different times on different wires","Long cables cannot carry electricity","Parallel cables have only one wire","Serial interference increases with wire count"]$opts$::jsonb, 0, $ex$Skew: signals on parallel wires drift apart with distance, corrupting the byte. Cables conduct fine; parallel means many wires; serial uses one wire and avoids skew.$ex$, 'check', 201, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'networking-communication') and code = '0478 2.1b'), null),
('00000000-0000-0000-0000-000000000000', $qt$A keyboard is unplugged and replaced without restarting the PC. Which feature allows this?$qt$, $opts$["Parallel handshaking","USB hot-swapping","Full-duplex mode","Even parity"]$opts$::jsonb, 1, $ex$USB is hot-swappable by design. Handshaking coordinates parallel transfers; duplex is direction; parity detects errors — none permit live replacement.$ex$, 'check', 202, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'networking-communication') and code = '0478 2.1b'), null),
('00000000-0000-0000-0000-000000000000', $qt$Even parity is used. Data 1011 is transmitted. What is the parity bit?$qt$, $opts$["1","0","Cannot be determined","No bit is needed"]$opts$::jsonb, 0, $ex$1011 has three 1s (odd), so the parity bit is 1 to reach four — even. 0 would leave the total odd; the bit is always needed; nothing here is undetermined.$ex$, 'check', 301, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'networking-communication') and code = '0478 2.2a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Even parity is used. 1011 arrives with parity bit 0. What follows?$qt$, $opts$["The data is correct","The error is corrected automatically","An error is proven — three 1s is odd against even parity","A second parity bit must be added"]$opts$::jsonb, 2, $ex$Three 1s total is odd, contradicting even parity, so corruption is certain. Correct data would total even; parity never corrects; adding bits cannot fix received ones.$ex$, 'check', 302, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'networking-communication') and code = '0478 2.2a'), null),
('00000000-0000-0000-0000-000000000000', $qt$A receiver computes a sum from incoming data and compares it with a transmitted value. Which method?$qt$, $opts$["Checksum","Echo check","ARQ","Parity bit"]$opts$::jsonb, 0, $ex$Recompute-and-compare of a transmitted sum is the checksum. Echo returns data to the sender; ARQ adds retransmission; parity counts 1s — none compare a computed sum.$ex$, 'check', 401, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'networking-communication') and code = '0478 2.2b'), null),
('00000000-0000-0000-0000-000000000000', $qt$Which method actually gets the correct data delivered, not just detected as faulty?$qt$, $opts$["Even parity","Checksum alone","Echo check alone","ARQ with retransmission"]$opts$::jsonb, 3, $ex$ARQ demands damaged blocks again until intact — detection plus repair. Parity, checksums and echo only reveal damage; none resend anything.$ex$, 'check', 402, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'networking-communication') and code = '0478 2.2b'), null),
('00000000-0000-0000-0000-000000000000', $qt$What is the main weakness of symmetric encryption?$qt$, $opts$["It encrypts too slowly for large files","It cannot encrypt text, only images","The single key must be shared without interception","It needs a different key for every file"]$opts$::jsonb, 2, $ex$Sharing the secret safely is the whole problem — intercept the exchange and all security dies. Symmetric is fast (its strength), handles any data, and reuses one key.$ex$, 'check', 501, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'networking-communication') and code = '0478 2.3a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Two colleagues agree an encryption password face to face, then email encrypted files. Why is this sound?$qt$, $opts$["The key never travelled on an interceptable channel","Email cannot be intercepted","Passwords cannot be guessed","Encryption works only between colleagues"]$opts$::jsonb, 0, $ex$In-person agreement kept the key off the wire, so intercepted emails stay noise. Email is interceptable; passwords guessable; the method works for anyone with a shared secret.$ex$, 'check', 502, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'networking-communication') and code = '0478 2.3a'), null),
('00000000-0000-0000-0000-000000000000', $qt$You send secret plans to Priya using asymmetric encryption. Which key encrypts them?$qt$, $opts$["Your private key","Priya's public key","Priya's private key","A key you both invented by email"]$opts$::jsonb, 1, $ex$Encrypt with the recipient's public key so only her private key opens it. Your private key signs, not hides; her private key never leaves her; emailed inventions are symmetric-style sharing.$ex$, 'check', 601, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'networking-communication') and code = '0478 2.3b'), null),
('00000000-0000-0000-0000-000000000000', $qt$Why do secure websites use asymmetric encryption only to start a session?$qt$, $opts$["Asymmetric encryption is too slow for the whole session","Asymmetric keys expire within seconds","Browsers cannot do symmetric encryption","Public keys cannot travel over the internet"]$opts$::jsonb, 0, $ex$Heavy mathematics makes asymmetric slow, so it safely delivers a symmetric session key and steps aside. Keys do not expire that fast; browsers do both; public keys are published by design.$ex$, 'check', 602, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'networking-communication') and code = '0478 2.3b'), null),
('00000000-0000-0000-0000-000000000000', $qt$How does a switch differ from a hub?$qt$, $opts$["A switch is wireless; a hub is wired","A hub is faster than any switch","They are different names for a router","A switch forwards each frame only to its addressed port"]$opts$::jsonb, 3, $ex$Selective MAC-based forwarding is the switch's definition; hubs broadcast everything everywhere. Both are wired devices; neither routes between networks.$ex$, 'check', 701, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'networking-communication') and code = '0478 3.4a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Every device on a LAN has a MAC address provided by what?$qt$, $opts$["The router's setup page","The internet provider","The operating system license","Its network interface card"]$opts$::jsonb, 3, $ex$The NIC carries the burned-in MAC address onto the network. Routers and ISPs deal in IP addresses; licences have nothing to do with hardware identity.$ex$, 'check', 702, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'networking-communication') and code = '0478 3.4a'), null),
('00000000-0000-0000-0000-000000000000', $qt$What does a router base its forwarding decision on?$qt$, $opts$["The destination IP address","The sender's password","The size of the packet","The brand of the receiving computer"]$opts$::jsonb, 0, $ex$Routers forward by destination IP toward the right network. Passwords authenticate users; size may fragment but never routes; brands are invisible to forwarding.$ex$, 'check', 801, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'networking-communication') and code = '0478 3.4b'), null),
('00000000-0000-0000-0000-000000000000', $qt$A home box combines router, modem, switch and Wi-Fi. Which job does the modem part do?$qt$, $opts$["Forwards frames by MAC address","Assigns IP addresses to websites","Converts signals between digital and line form","Filters viruses from downloads"]$opts$::jsonb, 2, $ex$Modulation/demodulation at the ISP boundary is the modem's one job. MAC forwarding is the switch; addressing is routing/DNS; virus filtering is security software.$ex$, 'check', 802, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'networking-communication') and code = '0478 3.4b'), null),
('00000000-0000-0000-0000-000000000000', $qt$Odd parity is used. The byte 1101 arrives with parity bit 1. Has an error occurred? Justify your answer.$qt$, $opts$["No — the parity bit matches the data","Yes — four 1s is even against odd parity","No — five bits cannot carry errors","Yes — parity bits are always 0"]$opts$::jsonb, 1, $ex$Marks as awarded: count of 1s is four (even) including the parity bit [1]; even contradicts odd parity, so corruption is proven [1]. Matching means nothing without the count; bit-count never blocks errors; parity bits are 0 or 1 as needed.$ex$, 'exam', 900, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'networking-communication') and code = '0478 2.2a'), (select id from public.syllabus_statements where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'networking-communication') and code = '2.2')),
('00000000-0000-0000-0000-000000000000', $qt$A bank's app encrypts login details with the bank's public key. Explain why an attacker recording the transmission cannot read the details.$qt$, $opts$["Public keys self-destruct after one use","Only the bank's private key decrypts, and it never travels","Recorded data is automatically deleted","Attackers cannot record encrypted traffic"]$opts$::jsonb, 2, $ex$Marks as awarded: encryption used the public key, which cannot decrypt [1]; the private key stays with the bank, so interception yields nothing readable [1]. Keys do not self-destruct; recordings persist; attackers record freely — and uselessly.$ex$, 'exam', 901, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'networking-communication') and code = '0478 2.3b'), (select id from public.syllabus_statements where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'networking-communication') and code = '2.3'));
