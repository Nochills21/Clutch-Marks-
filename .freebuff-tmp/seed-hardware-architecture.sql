insert into public.learning_objectives (topic_id, code, statement, teach, sort_order)
values
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'hardware-architecture'), '0478 3.1a', $st$Describe the fetch-decode-execute cycle and the roles of the CU, ALU, registers and buses.$st$, $teach$### What is being asked
Trace how the CPU runs one instruction or name what a part does. The answer follows the address first, then the data — never the reverse.

### Method
1. Fetch: the Program Counter's address is copied to the MAR, sent along the address bus, and the instruction returns along the data bus into the MDR, then to the CIR. The PC increments.
2. Decode: the Control Unit interprets the CIR's instruction and sets up control signals.
3. Execute: the ALU computes (or data moves), results land in the ACC/MDR, and the cycle repeats.
4. Buses: address bus carries addresses (CPU to memory); data bus carries data both ways; control bus carries timing and command signals.

### Worked example
Fetching the instruction at address 40: PC holds 40, MAR takes 40, address bus carries 40 to memory, the instruction travels the data bus to the MDR, then to the CIR, and PC becomes 41. Check: the address went out before any data came back — memory cannot return what it was never asked for.

### Traps
- Sending data down the address bus. Addresses travel out on the address bus; instructions and data return on the data bus.
- Forgetting the PC increments during fetch. Without it the CPU would re-fetch the same instruction forever.
- Giving the ALU the CU's job. The CU commands and decodes; the ALU only calculates and compares.
- Skipping the registers. PC, MAR, MDR and CIR each hold the value for exactly one step — name the holder, not just the movement.

### Timing
Paper 1: 4-5 minutes, 4-6 marks. Cycle questions are ordered-mark magnets: one mark per correct step in sequence.$teach$, 1),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'hardware-architecture'), '0478 3.1b', $st$Explain how clock speed, number of cores, cache size and bus width affect CPU performance.$st$, $teach$### What is being asked
Judge which machine runs faster or explain an upgrade. The answer links each factor to what the CPU spends its time doing — waiting or working.

### Method
1. Clock speed: more cycles per second means more instructions started per second — but the CPU still waits on slow memory between them.
2. Cores: independent processors running truly in parallel; more cores help multitasking and parallel work, not single-threaded speed.
3. Cache: small, fast memory holding recently used data; bigger cache means fewer slow trips to RAM.
4. Bus width: more bits per transfer move more data per cycle; wider data bus, faster feeding of the CPU.

### Worked example
Two PCs run one single-threaded game: PC A has 8 cores at 2 GHz, PC B has 4 cores at 4 GHz with double the cache. PC B wins: the game uses essentially one core, where clock speed rules, and the larger cache starves RAM waits. Check: counting cores would pick A — but unused cores contribute nothing to a single thread.

### Traps
- "More cores always means faster". Only parallel or multi-tasking work uses extra cores; one thread runs on one core.
- Treating clock speed as the whole story. A fast clock starved by tiny cache and narrow buses waits more than it works.
- Calling cache "extra RAM". Cache is faster, smaller, and sits beside the CPU — it hides RAM's slowness rather than adding capacity.
- Forgetting software. An upgrade helps only work that can use it; the bottleneck decides, not the biggest number.

### Timing
Paper 1: 3-4 minutes, 3-4 marks. Comparison questions want the link (factor to waiting-vs-working), not just the bigger specification.$teach$, 2),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'hardware-architecture'), '0478 3.2a', $st$Choose input devices including keyboards, mice, scanners and microphones for a scenario.$st$, $teach$### What is being asked
Pick the input device a situation needs. The answer matches the data type (text, sound, image, position) to the device built to capture it.

### Method
1. Text and commands: keyboard, plus pointing devices (mouse, touchscreen) for selection.
2. Sound: microphone. Images: scanner for documents, digital camera for scenes.
3. Choice rule: the device must capture the scenario's data in usable form — a microphone cannot capture a signature, a scanner cannot capture speech.
4. Justify with the data: name what goes in, then the device that takes exactly that.

### Worked example
A library digitises fragile newspapers: a flatbed scanner, because the data is printed pages needed as images, captured without bending the binding. Check: a camera would add glare and skew; a keyboard would take years — the scanner matches data type and condition.

### Traps
- Recommending a keyboard for everything. Typing a thousand pages is possible but absurd; direct capture beats retyping.
- Confusing input with output. A monitor shows; a scanner takes — direction decides, not the desk they share.
- Ignoring conditions. Fragile, outdoor, dirty or moving sources rule out delicate devices whatever the data type.
- One device for mixed data. Speech plus signatures need a microphone AND a scanner; no single device captures both well.

### Timing
Paper 1: 2 minutes, 2 marks. Device questions are quick — name the device and the data that justifies it.$teach$, 3),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'hardware-architecture'), '0478 3.2b', $st$Explain how sensors capture data in automated systems, with examples of sensor types and uses.$st$, $teach$### What is being asked
Choose a sensor or trace sense-process-respond. The answer names the physical quantity, the sensor that measures it, and what the system does with the reading.

### Method
1. Match quantity to sensor: temperature, pressure, humidity, light level, motion (PIR), gas, pH, sound.
2. The pattern is always sense, compare with a stored threshold, then respond through an actuator or alert.
3. Analogue readings are converted to digital (ADC) before the processor compares them.
4. Justify with the loop: sensor, threshold, action — a sensor with no response is just a thermometer.

### Worked example
A greenhouse keeps nights above 12°C: a temperature sensor feeds readings to the controller, which switches the heater on below 12 and off above 14. Check: the sensor measures heat, the threshold decides, the heater acts — remove any leg and frost wins.

### Traps
- Naming the actuator as the sensor. Heaters and motors respond; they measure nothing.
- A sensor with no threshold. Data without a decision point triggers nothing.
- Wrong quantity. A light sensor cannot guard temperature, however sensitive it is.
- Forgetting conversion. Processors compare numbers; raw analogue signals must be digitised first.

### Timing
Paper 1: 3 minutes, 3-4 marks. System questions want all three legs — sense, decide, respond — not just the sensor's name.$teach$, 4),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'hardware-architecture'), '0478 3.2c', $st$Choose output devices including monitors, printers, speakers and actuators for a scenario.$st$, $teach$### What is being asked
Pick the output device a situation needs. The answer matches the result type (image, document, sound, motion) to the device built to produce it.

### Method
1. Screen output: monitors (and projectors) for temporary visual display.
2. Paper: laser printers for fast high-volume text, inkjet for low-volume colour; 3D printers for objects.
3. Sound: speakers (or headphones). Physical action: actuators — motors, valves, buzzers, heaters.
4. Choice rule: volume, permanence and form decide — a thousand invoices need laser speed; a warning siren needs a buzzer, not a monitor.

### Worked example
A school prints 2000 exam timetables overnight: a laser printer, because the output is high-volume black-and-white text where speed and cost per page dominate. Check: inkjet would cost more per page and crawl; a monitor leaves nothing to hand out; speakers cannot print.

### Traps
- Inkjet for bulk text. Cartridges cost per page what lasers spread thin — volume flips the choice.
- A screen for permanent records. Monitors show temporarily; anything to keep needs printing.
- Speakers for alerts in noisy halls. Sound output fails where it cannot be heard — match the environment too.
- Calling actuators sensors. Actuators do (motors move); they display nothing and measure nothing.

### Timing
Paper 1: 2 minutes, 2 marks. Name the device and the output property (volume, permanence, form) that picks it.$teach$, 5),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'hardware-architecture'), '0478 3.3a', $st$Compare RAM and ROM, and explain the role of primary storage.$st$, $teach$### What is being asked
Separate the two primary memories or trace booting. The answer turns on volatility and contents — what survives power-off and what each chip holds.

### Method
1. RAM: volatile working memory holding the running OS, open programs and data. Wiped at power-off; more RAM means more open at once.
2. ROM: non-volatile memory holding firmware (e.g. the bootstrap loader). Kept at power-off; never used for running programs.
3. Primary storage means directly accessed by the CPU (RAM and ROM); everything else is secondary.
4. Booting: ROM's loader runs first, finds the OS on disk, and copies it into RAM for execution.

### Worked example
A PC loses an unsaved essay in a blackout but boots fine the next day. The essay lived in volatile RAM (gone with power); the boot loader lived in non-volatile ROM (survived). Check: each symptom matches one property — loss proves volatility, booting proves the firmware survived.

### Traps
- "ROM is backup storage". ROM is tiny firmware memory, not a second hard disk — nothing the user makes is stored there.
- More RAM speeds every task. RAM helps capacity (more open); a single task limited by the CPU gains nothing from empty extra RAM.
- Saving to ROM. Users save to secondary storage; ROM is written at manufacture (or flashed rarely).
- Calling the hard disk primary storage. The CPU cannot execute from disk; programs must be copied to RAM first.

### Timing
Paper 1: 2-3 minutes, 2-4 marks. Comparison tables (volatile, contents, purpose) collect both sides' marks cleanly.$teach$, 6),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'hardware-architecture'), '0478 3.3b', $st$Compare magnetic, optical and solid-state backing storage and choose for a scenario.$st$, $teach$### What is being asked
Pick backing storage for stated needs. The answer trades capacity, speed, durability and portability — the scenario tells you which dominates.

### Method
1. Magnetic (HDD): huge and cheap per GB, but slow to seek and fragile (moving parts, magnets).
2. Solid-state (SSD, flash, memory cards): fast, silent, shock-proof, but pricier per GB.
3. Optical (CD, DVD, Blu-ray): cheap, portable, removable — good for distribution; small capacity and slow writes.
4. Choose by the scarcest need: archives want cheap capacity (HDD), laptops in bags want durability and speed (SSD), handouts want removable cheap copies (optical).

### Worked example
A photographer backs up 500 GB on location with rough handling: a portable SSD — fast enough to finish between shoots and with no heads to crash on bumpy roads. Check: an HDD risks its moving parts in transit; optical cannot hold 500 GB; capacity alone would have picked the HDD and broken it.

### Traps
- Biggest number wins. Capacity without durability or speed fails the scenario's real constraint.
- "SSD lasts forever". Flash cells wear with writes — durable against knocks, not immortal.
- Optical for frequent rewrites. Slow burning and limited cycles suit distribution, not daily backup.
- Forgetting removability. Off-site and handout needs demand media that leaves the drive.

### Timing
Paper 1: 3 minutes, 3-4 marks. State the need, the technology, and the property that connects them.$teach$, 7),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'hardware-architecture'), '0478 3.3c', $st$Distinguish primary, secondary and off-line storage, and place each device in its level.$st$, $teach$### What is being asked
Sort devices into the storage hierarchy or explain why a level exists. The answer uses access (direct by CPU or not) and connection (online or shelved).

### Method
1. Primary: RAM and ROM — directly accessed by the CPU, fastest, smallest, volatile (RAM).
2. Secondary: HDDs, SSDs, optical drives inside or attached to the system — holds everything, survives power-off, CPU reaches it only via RAM.
3. Off-line: media shelved away from the computer (tapes, archived discs, rotated backup drives) — slowest to reach, safest from attacks and disasters.
4. Sort by two questions: can the CPU use it directly (primary)? Is it connected now (secondary) or shelved (off-line)?

### Worked example
Sort: RAM, internal SSD, tape in a fire safe. RAM is primary (CPU-direct); the SSD is secondary (connected, not CPU-direct); the tape is off-line (shelved). Check: the tape survives ransomware precisely because it fails the connected test — disconnection is its feature.

### Traps
- Calling the SSD primary because it is fast. Speed does not promote a level; only CPU-direct access makes primary.
- "Off-line means no internet". Off-line storage is disconnected media, not an unplugged router.
- Putting backups on secondary and stopping. Connected backups share the system's fate — off-line copies survive what secondary does not.
- Cache as a storage level. Cache is a speed layer inside primary access, not a place files live.

### Timing
Paper 1: 2 minutes, 2-3 marks. Two-question sorting (CPU-direct? connected?) places every device without memorised lists.$teach$, 8)
on conflict (topic_id, code) do update set
  statement = excluded.statement,
  teach = excluded.teach,
  sort_order = excluded.sort_order;
delete from public.quizzes
 where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'hardware-architecture') and title = 'Checkpoints — Hardware Architecture';
insert into public.quizzes (id, topic_id, title, description, is_published, exam_type)
values ('00000000-0000-0000-0000-000000000000', (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'hardware-architecture'), 'Checkpoints — Hardware Architecture', $desc$Short checks, one set per objective in this topic. Answer one wrongly and the objective it belongs to is the thing to revisit — not the whole topic.$desc$, true, 'quiz');
insert into public.questions
  (quiz_id, question_text, options, correct_option, explanation, difficulty, sort_order, objective_id, statement_id)
values
('00000000-0000-0000-0000-000000000000', $qt$During fetch, the PC holds address 40. What happens first?$qt$, $opts$["The ALU adds 1 to the contents of address 40","Address 40 is copied to the MAR and sent on the address bus","The instruction in the CIR is decoded","The MDR sends data to the printer"]$opts$::jsonb, 1, $ex$Fetch starts by moving the address PC to MAR and out on the address bus. The ALU does not add to memory contents; decode comes after fetch; the MDR talks to memory, not printers.$ex$, 'check', 101, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'hardware-architecture') and code = '0478 3.1a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Which pair correctly matches each bus to its job?$qt$, $opts$["Address bus carries data; data bus carries addresses","All three buses carry control signals only","Control bus carries addresses; address bus carries commands","Address bus carries addresses; data bus carries data both ways"]$opts$::jsonb, 3, $ex$Addresses go out on the address bus; data travels both ways on the data bus; the control bus carries signals. The other pairings swap every job.$ex$, 'check', 102, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'hardware-architecture') and code = '0478 3.1a'), null),
('00000000-0000-0000-0000-000000000000', $qt$A single-threaded program runs faster on which upgrade?$qt$, $opts$["Doubling the cores at the same clock speed","Higher clock speed with a larger cache","A bigger hard disk","A higher-resolution monitor"]$opts$::jsonb, 1, $ex$One thread uses one core, so clock speed (plus cache to feed it) decides. Extra cores sit idle; disk and monitor do not execute instructions.$ex$, 'check', 201, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'hardware-architecture') and code = '0478 3.1b'), null),
('00000000-0000-0000-0000-000000000000', $qt$What does a larger CPU cache directly reduce?$qt$, $opts$["The price of the processor","The number of slow fetches from RAM","The clock speed needed","The size of installed programs"]$opts$::jsonb, 1, $ex$Cache holds recently used data beside the CPU, so fewer requests travel to slow RAM. It neither cuts price nor shrinks programs, and the clock runs as set.$ex$, 'check', 202, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'hardware-architecture') and code = '0478 3.1b'), null),
('00000000-0000-0000-0000-000000000000', $qt$A podcast studio needs to capture voices for editing. Which input device?$qt$, $opts$["A flatbed scanner","A laser printer","A microphone","A barcode reader"]$opts$::jsonb, 2, $ex$Voices are sound, and the microphone is the sound-capture device. A scanner takes images, a printer outputs, and barcodes carry no audio.$ex$, 'check', 301, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'hardware-architecture') and code = '0478 3.2a'), null),
('00000000-0000-0000-0000-000000000000', $qt$A warehouse tracks parcels by their printed labels. Which input device?$qt$, $opts$["A microphone","A barcode reader","A speaker","A plotter"]$opts$::jsonb, 1, $ex$Labels carry barcodes, read fastest by a barcode reader. A microphone hears nothing useful; speakers and plotters are output devices.$ex$, 'check', 302, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'hardware-architecture') and code = '0478 3.2a'), null),
('00000000-0000-0000-0000-000000000000', $qt$A street light switches on at dusk. Which sensor and pattern?$qt$, $opts$["Motion sensor triggering on movement","Light sensor whose reading falls below a threshold","Temperature sensor detecting the cold night","A timer with no sensor at all"]$opts$::jsonb, 3, $ex$Dusk is falling light: a light sensor reading below the threshold switches the lamp on. Motion, temperature and timers react to the wrong quantity or none.$ex$, 'check', 401, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'hardware-architecture') and code = '0478 3.2b'), null),
('00000000-0000-0000-0000-000000000000', $qt$In a burglar alarm, what does the PIR sensor actually detect?$qt$, $opts$["Broken glass vibrations","Movement of warm bodies across its zones","The sound of a door opening","Cuts in the window foil"]$opts$::jsonb, 1, $ex$PIR senses infrared (body heat) moving across zones. Glass, sound and foil are different sensors' jobs — vibration, microphone and continuity respectively.$ex$, 'check', 402, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'hardware-architecture') and code = '0478 3.2b'), null),
('00000000-0000-0000-0000-000000000000', $qt$An office prints 5000 invoices a month in black and white. Which printer?$qt$, $opts$["A 3D printer","A laser printer","An inkjet printer","A plotter"]$opts$::jsonb, 1, $ex$High-volume mono text is the laser printer's exact job: fast with low cost per page. Inkjet costs more per page; 3D printers and plotters make objects and drawings, not invoices.$ex$, 'check', 501, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'hardware-architecture') and code = '0478 3.2c'), null),
('00000000-0000-0000-0000-000000000000', $qt$A fire alarm must alert a noisy factory floor. Which output?$qt$, $opts$["An on-screen warning message","A printed evacuation notice","A high-volume siren and flashing beacons","Headphones at each workstation"]$opts$::jsonb, 2, $ex$Alerts must override the environment: loud sirens plus beacons. Screens go unseen, paper goes unread in a fire, and headphones isolate workers from each other.$ex$, 'check', 502, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'hardware-architecture') and code = '0478 3.2c'), null),
('00000000-0000-0000-0000-000000000000', $qt$Why is unsaved work lost when the power fails?$qt$, $opts$["It was held in volatile RAM","It was held in ROM","The hard disk spins down","The CPU cache is too small"]$opts$::jsonb, 0, $ex$RAM needs power to hold data, so unsaved work dies with it. ROM survives (firmware); the disk was never involved until saving; cache size is irrelevant.$ex$, 'check', 601, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'hardware-architecture') and code = '0478 3.3a'), null),
('00000000-0000-0000-0000-000000000000', $qt$What does the bootstrap loader in ROM do at switch-on?$qt$, $opts$["Loads the operating system from disk into RAM","Opens the user's documents","Connects to the internet","Tests the printer queue"]$opts$::jsonb, 1, $ex$The ROM loader's one job is finding the OS on secondary storage and copying it to RAM for execution. Documents, networks and printers all come later, under the OS.$ex$, 'check', 602, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'hardware-architecture') and code = '0478 3.3a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Which storage suits a laptop carried daily on rough buses?$qt$, $opts$["An internal hard disk drive","A solid-state drive","A DVD-RW left in the drive","Magnetic tape cartridges"]$opts$::jsonb, 1, $ex$SSDs have no moving parts to crash on bumpy rides and are fast. HDD heads hate shocks; a DVD in the drive is slow and tiny; tape is archival, not daily working storage.$ex$, 'check', 701, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'hardware-architecture') and code = '0478 3.3b'), null),
('00000000-0000-0000-0000-000000000000', $qt$A company distributes a 4 GB training video to 200 branches by post. Which medium?$qt$, $opts$["Hard disk drives","Blu-ray or DVD discs","RAM upgrades","CPU cache"]$opts$::jsonb, 1, $ex$Cheap removable optical discs fit a 4 GB video and post easily. HDDs cost far too much per copy; RAM and cache are not storage media at all.$ex$, 'check', 702, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'hardware-architecture') and code = '0478 3.3b'), null),
('00000000-0000-0000-0000-000000000000', $qt$A backup tape is kept in a fire safe across town. What kind of storage is it?$qt$, $opts$["Primary storage","Cache memory","Secondary storage","Off-line storage"]$opts$::jsonb, 3, $ex$Shelved, disconnected media is off-line storage — unreachable by attackers and local disasters. Primary is CPU-direct RAM/ROM; cache is a speed layer; secondary stays connected.$ex$, 'check', 801, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'hardware-architecture') and code = '0478 3.3c'), null),
('00000000-0000-0000-0000-000000000000', $qt$Why must programs be copied from SSD to RAM before running?$qt$, $opts$["The SSD is too slow to hold programs","The CPU can only execute instructions held in primary storage","RAM is cheaper per gigabyte","Programs are too big for any SSD"]$opts$::jsonb, 1, $ex$Execution happens from CPU-direct primary storage; the SSD is secondary and must stage code through RAM. SSDs are fast and capacious; RAM costs more per gigabyte, not less.$ex$, 'check', 802, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'hardware-architecture') and code = '0478 3.3c'), null),
('00000000-0000-0000-0000-000000000000', $qt$Describe the fetch stage of the fetch-decode-execute cycle, naming the registers and buses used.$qt$, $opts$["The ALU decodes the CIR and sends the result to the printer","PC to MAR, address bus to memory, instruction back on the data bus to MDR then CIR, PC increments","MDR writes directly to the hard disk while the PC resets to zero","The control bus carries the instruction into the accumulator"]$opts$::jsonb, 1, $ex$Marks as awarded: address moved PC to MAR and out on the address bus [1]; instruction returned via MDR to CIR with PC incremented [1]. The ALU never decodes; nothing is written to disk during fetch; the control bus carries signals, not instructions.$ex$, 'exam', 900, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'hardware-architecture') and code = '0478 3.1a'), (select id from public.syllabus_statements where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'hardware-architecture') and code = '3.1')),
('00000000-0000-0000-0000-000000000000', $qt$A video editor works with 2 TB of footage on a desktop that never moves. Which backing storage, and why?$qt$, $opts$["A 2 TB SSD because flash never wears out","Blu-ray discs because optical is fastest","A high-capacity HDD because cheap bulk capacity dominates a fixed desk","Extra RAM because memory is non-volatile"]$opts$::jsonb, 2, $ex$Marks as awarded: HDD chosen [1]; justification matches the scenario — bulk capacity per cost on a machine that never moves [1]. Flash cells wear; optical is small and slow per disc; RAM is volatile working memory, not bulk storage.$ex$, 'exam', 901, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'hardware-architecture') and code = '0478 3.3b'), (select id from public.syllabus_statements where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'hardware-architecture') and code = '3.3'));
