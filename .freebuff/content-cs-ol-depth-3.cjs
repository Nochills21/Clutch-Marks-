// Computer Science OL batch 3: official Cambridge IGCSE 0478 (2026-2028)
// Paper 1 Topic 6 (6.1 Automated systems, 6.2 Robotics, 6.3 Artificial
// intelligence) and Topic 5 statement 5.3 Cyber security. Apply with:
//   node .freebuff/deepen-materials.cjs .freebuff/content-cs-ol-depth-3.cjs > .freebuff-tmp/cs-ol-depth-3.sql
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/cs-ol-depth-3.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/cs-ol-depth-3.sql --apply    (live)
//   node .freebuff/gate-notes-depth.cjs computer-science OL
module.exports = {
  expectType: "notes",
  titles: {
    "f4ec1c0b-4462-46b9-98fe-457d9fbd7e90": "IGCSE Computer Science: Automated Systems, Robotics and AI",
    "1ad7eb98-7831-4f23-85f8-9790a66e4ca4": "IGCSE Computer Science: Cyber Security and Threats",
  },
  rows: {
    "f4ec1c0b-4462-46b9-98fe-457d9fbd7e90": `
<h2>IGCSE Computer Science: Automated Systems, Robotics and AI</h2>
<p>Cambridge IGCSE Computer Science 0478 (2026–2028), Paper 1 Computer Systems, Topic 6 Automated and emerging technologies: statement 6.1 Automated systems, 6.2 Robotics, and 6.3 Artificial intelligence. This is where the machine stops waiting for instructions and acts on its own — sensing, deciding and moving. Every feedback loop below is traced step by step, and the AI section separates what the syllabus actually expects (machine learning, natural language processing, robotics) from the hype, because examiners reward precise terminology over vague claims.</p>

<h3>What makes a system automated</h3>
<p>An <strong>automated system</strong> measures and controls a process with little or no human intervention. The architecture is always the same loop, and once you see it you can analyse any example the exam gives:</p>
<ul>
<li><strong>Input (sensors)</strong> — measure the real world: temperature, light, pressure, humidity, proximity, pH.</li>
<li><strong>Processing</strong> — a microprocessor compares each measurement against a target (the set point) and decides what to do.</li>
<li><strong>Output (actuators)</strong> — change the real world: motors, heaters, pumps, valves, lights, robotic arms.</li>
<li><strong>Feedback</strong> — the sensors keep measuring the effect of the actuators, closing the loop so the system corrects itself.</li>
</ul>
<pre><code>Worked trace: a greenhouse temperature control system.

Set point: 22 degrees C. The sensor reads the air every 10 seconds.

1. 09:00:00  reading 18 C - below the set point.
   Processing: heating required. Actuators: heater ON, roof vent CLOSED.
2. 09:00:30  reading 21 C - still below (within the 2 C dead zone margin).
   Processing: continue heating.
3. 09:01:10  reading 23 C - above the set point.
   Processing: heater OFF (switching now, not at 22, avoids rapid cycling),
   roof vent OPEN to cool.
4. 09:03:00  reading 22 C - within the dead zone between 21 and 23.
   Processing: change nothing - the dead zone prevents constant switching,
   which would wear the heater out.

The loop repeats indefinitely. The set point is the target, the dead zone is
the tolerance band that stops the actuators chattering, and the feedback is the
sensor readings that drive each decision.</code></pre>
<p><strong>Closed-loop</strong> systems use feedback (as above); <strong>open-loop</strong> systems act without measuring the result — a toaster runs for a fixed time regardless of how brown the bread is. The exam asks you to say which a system is and justify it: if the output feeds back into the next decision, it is closed-loop.</p>

<h3>Transducers: where physical change becomes data</h3>
<p>Sensors and actuators are both <strong>transducers</strong> — devices that convert one form of energy into another — and knowing which way the conversion runs is the cleanest way to keep them straight. A sensor converts a physical quantity into an electrical signal the processor can read (temperature into resistance, light into voltage, sound into a varying current). An actuator does the reverse: it converts the processor's electrical signal into physical action (voltage into motion in a motor, into heat in a heater, into light in an LED).</p>
<pre><code>Conversion direction, always:

  physical quantity --> electrical signal     SENSOR (input)
  electrical signal --> physical action       ACTUATOR (output)

Examples worked through:
  A thermistor in a greenhouse: temperature rises -> resistance falls -> the
  analogue voltage changes -> an analogue-to-digital converter (ADC) turns it
  into a binary number the processor compares with the set point.

  A motor on a roof vent: the processor outputs a digital command -> a digital-
  to-analogue converter (DAC) and driver circuit produce a varying current ->
  the motor turns the vent.

Many real devices are both at once in different roles: a microphone is a sensor
(sound -> electricity) and a speaker is an actuator (electricity -> sound).</code></pre>

<h3>Where automation is used</h3>
<table border="1" cellpadding="6">
<tr><th>Domain</th><th>Example</th><th>Sensors</th><th>Actuators</th></tr>
<tr><td>Manufacturing</td><td>Robotic assembly line</td><td>Position, proximity, vision</td><td>Robot arms, conveyors, welders</td></tr>
<tr><td>Agriculture</td><td>Automatic irrigation</td><td>Soil moisture, rain, temperature</td><td>Pumps, valves</td></tr>
<tr><td>Home</td><td>Central heating</td><td>Thermostat, timer</td><td>Boiler, radiator valves</td></tr>
<tr><td>Traffic</td><td>Adaptive traffic lights</td><td>Inductive loop detectors, cameras</td><td>Signal lamps</td></tr>
<tr><td>Medicine</td><td>Insulin pump</td><td>Glucose sensor</td><td>Pump actuator</td></tr>
</table>
<p>Benefits: consistent quality, output in dangerous or monotonous conditions, 24-hour working, long-run cost per unit falls, and precise control improves yield. Costs: high capital outlay, jobs lost or changed, expensive and disruptive breakdowns, and loss of human judgement when the unexpected happens — a self-driving vehicle's edge cases are the modern form of that risk.</p>

<h3>Robotics</h3>
<p>A <strong>robot</strong> is a programmable machine that can sense, process and act on its environment to carry out tasks, often autonomously. The syllabus separates the types: <strong>fixed</strong> robots (a welding arm bolted to a factory floor — precise and strong, one workspace), <strong>mobile</strong> robots (warehouse robots, rovers — move themselves, need navigation), and <strong>autonomous</strong> robots (self-driving cars, drones — make decisions without continuous human control).</p>
<p>Inside any robot, the same loop as any automated system: sensors (cameras, LiDAR, ultrasonic, gyroscopes, encoders on the motors), a processor running control software, and actuators (motors, servos, grippers) — plus a power supply (battery) and a communication link for supervision.</p>
<ul>
<li><strong>Industrial uses:</strong> welding, painting and assembly (consistent quality, no fatigue, hazardous-environment work); picking and packing; bomb disposal and deep-sea or space exploration where humans cannot go.</li>
<li><strong>Domestic and service uses:</strong> vacuum cleaners, lawn mowers, surgical robots, warehouse logistics, companionship and care.</li>
<li><strong>Advantages:</strong> repeatable precision, tireless, work in danger, cheaper than labour at volume.</li>
<li><strong>Disadvantages:</strong> very expensive to design and install, rigid when the task changes, maintenance needs skilled engineers, and they displace workers — the social consequence earns its own marks.</li>
</ul>

<h3>Artificial intelligence and machine learning</h3>
<p><strong>Artificial intelligence (AI)</strong> is software that appears to make intelligent decisions — solving problems and carrying out tasks in ways we would call clever if a human did them. <strong>Machine learning (ML)</strong> is the subset the syllabus emphasises: instead of being explicitly programmed with rules, the system is given data and <em>learns</em> patterns from it, improving with experience.</p>
<p>An analogy before the mechanics: teaching a child to recognise cats does not mean listing ear shapes and whisker counts. Show the child thousands of labelled pictures and the rules form themselves inside their head. Machine learning does exactly that with numbers.</p>
<pre><code>How a machine learning model is trained, step by step:

1. Collect data: thousands of emails labelled "spam" or "not spam" by humans.
2. Choose features: word frequencies, sender reputation, link count, subject
   line patterns - measurable properties of each email.
3. Split the data: most for training, some held back for testing.
4. TRAINING: the algorithm adjusts its internal weights to fit the training
   data. It predicts each email's label; each wrong prediction nudges the
   weights; repeat over the dataset many times. The weights ARE the learned
   model - no human wrote the rules.
5. TESTING: run the trained model on the held-back data it has never seen and
   measure accuracy (correct predictions / total predictions). High training
   accuracy but low test accuracy means overfitting - it memorised the
   examples rather than learning the pattern.
6. DEPLOYMENT: new emails are classified by the model; correct and incorrect
   feedback can be fed back in so it keeps improving.</code></pre>
<p>The three kinds of learning the syllabus names: <strong>supervised</strong> learning trains on labelled data (the spam example; predicting house prices from past sales); <strong>unsupervised</strong> learning finds structure in unlabelled data (customer segmentation — "these shoppers behave alike"); <strong>reinforcement</strong> learning learns by trial and reward (a game-playing program gets points for winning and adjusts its strategy).</p>
<p>Other AI applications in the syllabus: <strong>natural language processing (NLP)</strong> — understanding and generating human language: translation, voice assistants, chatbots, spam filtering; <strong>speech recognition</strong> — turning spoken audio into text (dictation, voice control); <strong>expert systems</strong> — a knowledge base of facts plus an inference engine applying rules to reach a conclusion (medical diagnosis support, fault finding); <strong>computer vision</strong> — interpreting images (face recognition, self-driving perception, medical imaging); <strong>autonomous vehicles</strong> — combining sensors, vision and decision-making to navigate.</p>
<table border="1" cellpadding="6">
<tr><th>Advantages of AI systems</th><th>Disadvantages of AI systems</th></tr>
<tr><td>Fast decisions over huge data volumes</td><td>Training needs vast data and computing power</td></tr>
<tr><td>Consistent, no fatigue or emotion</td><td>No common sense; fails on cases unlike its training data</td></tr>
<tr><td>Handles dangerous or dull work</td><td>Job displacement across many industries</td></tr>
<tr><td>Improves with more data</td><td>Biased training data produces biased decisions — and they are hard to challenge</td></tr>
<tr><td>Available 24/7</td><td>Cannot explain its reasoning well; accountability is unclear</td></tr>
</table>

<h3>Worked example: applying the loop to an autonomous vehicle</h3>
<pre><code>Approaching a pedestrian crossing:

1. SENSORS: cameras, radar and LiDAR continuously measure distance to the
   crossing, the pedestrian's position and speed, and the car's own speed.
2. PROCESSING: the AI classifies the objects (camera vision: "pedestrian at
   kerb"), predicts likely movement from the training data, and compares this
   with safety rules - minimum stopping distance for current speed and grip.
3. DECISION: predicted conflict - begin braking now, at 4 m/s^2, and warn.
4. ACTUATORS: brake and steering systems carry out the decision.
5. FEEDBACK: sensors keep measuring; if the pedestrian steps back, the plan
   updates; if the road is wet, the sensors' distance readings lengthen the
   braking margin.

Every one of these five stages can be a separate exam answer.</code></pre>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Calling any machine with a motor a "robot"; the syllabus sense is a programmable machine that senses, processes and acts — and "autonomous" requires decisions without continuous human control.</li>
<li>Describing open-loop systems as using feedback; if the output is not measured to adjust the next action, the loop is open (a toaster), regardless of how clever it looks.</li>
<li>Confusing the sensor and the actuator in a scenario: sensors measure (input), actuators move or heat (output) — thermostats sense, heaters act.</li>
<li>Saying machine learning "is programmed with rules"; the whole point is that the rules are learned from data — the trained weights are the program.</li>
<li>Skipping the training/testing split when explaining ML; measuring on unseen data is what distinguishes learning from memorising.</li>
<li>Equating AI with robots (or robots with AI): AI is software that can run without a robot, and many robots run purely on fixed programs with no learning.</li>
<li>Listing advantages only; the disadvantages (job losses, bias, data hunger, no common sense) carry equal marks.</li>
<li>Forgetting the feedback loop when describing any control system — "the sensor keeps measuring the effect" is the sentence examiners look for.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Paper 1, 4 marks).</strong> Describe the input, process and output stages of an automatic door.</p>
<p>Answer: Input: a motion or proximity sensor detects a person approaching (and a pressure sensor may detect someone standing on the mat). Processing: the microprocessor compares the sensor reading with its trigger condition and checks safety sensors before acting. Output: an actuator (an electric motor) slides the door open; a timer or sensor then closes it. Feedback: the sensors keep monitoring so the door stays open while the beam is broken.</p>
<p><strong>Question 2 (Paper 1, 3 marks).</strong> Explain the difference between a closed-loop and an open-loop system, giving one example of each.</p>
<p>Answer: A closed-loop system measures its output and feeds that back to adjust its actions — a central heating system measures room temperature and switches the boiler accordingly. An open-loop system acts without measuring the result — a toaster runs for a fixed time regardless of how brown the toast is.</p>
<p><strong>Question 3 (Paper 1, 4 marks).</strong> Describe how a machine learning system is trained to detect fraudulent bank transactions.</p>
<p>Answer: Collect a large dataset of past transactions each labelled fraudulent or genuine by humans. Choose features such as amount, location, time and spending pattern. The algorithm trains on most of the data, adjusting its internal weights each time its prediction is wrong, until the predictions fit. The model is then tested on held-back transactions it has never seen to measure accuracy, before being used to score new transactions — with feedback from confirmed cases improving it over time.</p>
<p><strong>Question 4 (Paper 1, 4 marks).</strong> Discuss the impact of introducing robots into a car factory.</p>
<p>Answer: For the firm: consistent weld quality, output day and night without fatigue, safer handling of painting fumes and heavy parts, and lower unit costs at volume — offset by very high installation costs, expensive breakdowns and rigidity when the product changes. For workers: dangerous and repetitive jobs are replaced, but assembly jobs are lost and remaining roles demand higher skills, so retraining is needed and communities dependent on the plant can suffer.</p>
<p><strong>Question 5 (Paper 1, 3 marks).</strong> State three differences between a robot and an AI system.</p>
<p>Answer: A robot is hardware that physically senses and acts in the world; AI is software that makes decisions and may never have a physical form. Robots follow explicit programs; AI systems (especially machine learning) derive behaviour from data. A robot can run with no AI at all (a fixed assembly arm), and AI can exist with no robot (a spam filter).</p>
<p>The counterpart to systems that act on their own is the people who attack them: cyber security.</p>
`,

    "1ad7eb98-7831-4f23-85f8-9790a66e4ca4": `
<h2>IGCSE Computer Science: Cyber Security and Threats</h2>
<p>Cambridge IGCSE Computer Science 0478 (2026–2028), Paper 1 Computer Systems, statement 5.3 Cyber security. Every system this course has built — networks, web applications, operating systems — has something worth stealing or breaking, and this note covers who attacks, how, and what stops them. The threat table maps each attack to its mechanism and its specific defence, because the exam wants matching reasoning ("this defence works against this attack because…"), not a memorised list.</p>

<h3>What is at stake: the goals of security</h3>
<p>Security protects three properties of data and systems, and most answers can be structured around them. <strong>Confidentiality</strong>: only authorised people can read the data. <strong>Integrity</strong>: data is accurate and unaltered — nobody has tampered with it. <strong>Availability</strong>: systems and data are accessible when needed. An attack on one is not an attack on all: stealing a password breaks confidentiality; altering a grade in a database breaks integrity; flooding a server with traffic breaks availability.</p>

<h3>The threats, one by one</h3>
<table border="1" cellpadding="6">
<tr><th>Threat</th><th>How it works</th><th>Typical defence</th></tr>
<tr><td>Malware (virus)</td><td>Code attached to a host file; replicates when the host runs; may corrupt or delete data</td><td>Antivirus with signature scanning; don't run unknown files</td></tr>
<tr><td>Malware (worm)</td><td>Self-contained; spreads across networks with no host file or user action</td><td>Firewalls, patching the vulnerability it exploits</td></tr>
<tr><td>Malware (trojan)</td><td>Disguised as legitimate software; installs a backdoor when run</td><td>User education; only install from trusted sources</td></tr>
<tr><td>Malware (ransomware)</td><td>Encrypts the victim's files and demands payment for the key</td><td>Offline backups; patching; antivirus</td></tr>
<tr><td>Phishing</td><td>Fake emails or sites lure users into revealing credentials or card details</td><td>Training to spot suspicious links; spam filters; two-factor authentication</td></tr>
<tr><td>Brute-force attack</td><td>Trying every possible password/key until one works</td><td>Long complex passwords, account lockout after failed attempts, rate limiting</td></tr>
<tr><td>Dictionary attack</td><td>Trying likely passwords from word lists (with common substitutions)</td><td>Same as brute force, plus password policy and checking against breached lists</td></tr>
<tr><td>Denial of service (DoS/DDoS)</td><td>Flooding a server with requests so legitimate users cannot get through (from many machines: distributed)</td><td>Traffic filtering, rate limiting, redundant servers, ISP-level scrubbing</td></tr>
<tr><td>SQL injection</td><td>Malicious SQL typed into a form field is executed by the database</td><td>Parameterised queries, input validation</td></tr>
<tr><td>Interception / sniffing</td><td>Eavesdropping on network traffic to read data or credentials</td><td>Encryption (HTTPS, VPNs); secure wireless</td></tr>
<tr><td>Social engineering</td><td>Manipulating people into giving access (impersonating IT support, urgency tactics)</td><td>Training, verification procedures, clear policies</td></tr>
</table>
<p>Also examined: <strong>people</strong> as a threat source — not only external hackers but disgruntled or careless staff, the single most common cause of breaches. <strong>Insider threats</strong> are countered by access rights, logging and separation of duties.</p>

<h3>Defence in depth</h3>
<p>No single measure is enough, so security is layered — an attacker who beats one still meets the next:</p>
<ul>
<li><strong>Authentication</strong> — proving identity: something you know (password), something you have (smart card, phone token), something you are (biometrics: fingerprint, face). Combining factors is <strong>two-factor authentication (2FA)</strong>, which beats any single stolen factor.</li>
<li><strong>Access control</strong> — rights management: each account gets the minimum permissions it needs (<strong>least privilege</strong>), and admin rights are reserved for administrators.</li>
<li><strong>Firewalls</strong> — filter incoming and outgoing network traffic against rules (block unused ports, restrict by address).</li>
<li><strong>Encryption</strong> — protects confidentiality in transit (HTTPS, VPN) and at rest (encrypted disks), so stolen data is unreadable.</li>
<li><strong>Patching and updates</strong> — vendors fix discovered vulnerabilities; unpatched systems are the easiest targets (worms spread through old flaws).</li>
<li><strong>Physical security</strong> — locks, locked server rooms, device policies; a stolen laptop bypasses every software defence unless its disk is encrypted.</li>
<li><strong>Backups</strong> — regular, tested, off-site copies turn ransomware and hardware failure from disaster into inconvenience.</li>
<li><strong>Monitoring and auditing</strong> — logs of access and failed logins reveal attacks early; intrusion detection systems alert on suspicious patterns.</li>
</ul>
<pre><code>Worked example: hardening a small company network, in order of effect.

1. Patch everything and turn on automatic updates - removes the known holes
   worms spread through.
2. Firewall at the router, blocking every port the company does not use.
3. Replace shared logins with individual accounts; give staff least privilege;
   reserve admin rights for the IT administrator.
4. Enforce long passphrases plus 2FA on email and remote access - phishing
   then yields credentials that are useless alone.
5. HTTPS across the site and a VPN for remote workers - sniffed traffic is
   unreadable.
6. Nightly backups to off-site storage, with a monthly restore test - a
   ransomware infection becomes a restore job rather than a ransom.
7. Staff training: how to spot phishing, and a reporting procedure.

Cost is modest; each step attacks a different part of the threat table.</code></pre>

<h3>Passwords, biometrics and 2FA</h3>
<p>Strong passwords are long (length beats complexity for resisting brute force), unpredictable, unique per account, and stored as salted hashes by the system. <strong>Biometrics</strong> are convenient and hard to steal but cannot be changed if compromised — a password can be reset, your fingerprint cannot — so they suit device unlocking more than sole remote authentication. <strong>2FA</strong> combines factors so a stolen password alone (from phishing) is not enough: the attacker also needs the phone token or fingerprint.</p>

<h3>Encryption and interception</h3>
<p>Public Wi-Fi invites <strong>interception</strong>: traffic crossing an unencrypted link is readable by anyone in range with packet-sniffing software. HTTPS encrypts the browser session end to end; a <strong>VPN</strong> encrypts all a device's traffic through a tunnel to a trusted server, protecting remote workers on any network. For stored data, full-disk encryption means a stolen laptop yields ciphertext — which is why stolen encrypted drives rarely make breach headlines.</p>

<h3>Legal and organisational context (brief)</h3>
<p>Data protection law (such as the UK/EU GDPR) obliges organisations to keep personal data secure, use it only for stated purposes, and report breaches. Internal <strong>policies</strong> — acceptable use, password rules, remote working, incident response — turn technical measures into everyday practice, and staff training is what makes them bite. Penalties for breaches and the reputational cost are the stick; the reduced incident rate is the carrot.</p>

<h3>Worked example: analysing an attack</h3>
<pre><code>Scenario: staff receive an email "from the IT department" asking them to log in
at a lookalike URL. Three staff enter their credentials. One account is an
administrator's, and the attacker uses it overnight to copy a customer table.

Attack chain:
  1. Phishing (social engineering) harvested credentials at a fake site.
  2. No 2FA meant each password alone granted access.
  3. Excessive privilege (an admin account used for daily email) widened the
     damage from one mailbox to the whole database.
  4. No monitoring meant the overnight copy went unnoticed.

Defences that would each have broken the chain:
  spam filtering and training (stop the email), 2FA (useless credentials),
  least privilege (admin rights only when needed), login alerts and auditing
  (overnight access flagged), and access-rights limits on the customer table.</code></pre>

<h3>Common mistakes and exam traps</h3>
<ul>
<li>Writing "install antivirus" as the answer to every security question; match the defence to the named threat — antivirus stops malware, it does not stop phishing or DoS.</li>
<li>Confusing a virus with a worm (needs a host versus spreads alone) or a trojan (disguised software); the mechanism is the mark.</li>
<li>Describing a brute-force attack as "guessing manually"; it is automated trial of keys — which is why length and lockout matter.</li>
<li>Saying a firewall prevents all hacking or that encryption stops data being stolen; encryption makes stolen data unreadable — the theft can still happen.</li>
<li>Forgetting availability when asked what security protects; DoS is an availability attack.</li>
<li>Claiming biometrics are the strongest authentication because they cannot be forgotten; they cannot be revoked either — state both sides.</li>
<li>Writing "the user should choose a strong password" without the system side: hash storage, lockouts, rate limiting and 2FA are server responsibilities.</li>
<li>Neglecting the human factor: training and policies earn marks alongside technical measures.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<p><strong>Question 1 (Paper 1, 4 marks).</strong> Describe how a computer virus spreads and how it can be prevented.</p>
<p>Answer: A virus is malicious code attached to a host file; when the user runs that file, the code executes, copies itself into other programs or documents, and may corrupt or delete data or spread by email to the victim's contacts. Prevention: antivirus software scanning files on arrival and on access, keeping signatures updated, avoiding unknown attachments and untrusted downloads.</p>
<p><strong>Question 2 (Paper 1, 4 marks).</strong> Explain what a brute-force attack is and describe two methods of defending against it.</p>
<p>Answer: A brute-force attack uses software to try every possible key or password combination until the correct one is found — effective against short or simple secrets. Defences: require long, complex passwords (greatly increasing the combinations to try); lock the account or add a delay after a number of failed attempts, so attempts per second fall to useless levels; and use 2FA so the cracked password alone grants nothing.</p>
<p><strong>Question 3 (Paper 1, 4 marks).</strong> A company stores customer card details. State the three goals of information security and explain one measure that protects each.</p>
<p>Answer: Confidentiality — only authorised staff can read the data: encrypt the database so stolen files are unreadable. Integrity — the data is unaltered: use access controls and auditing so unauthorised changes are impossible or detected. Availability — the data can be reached when needed: keep regular off-site backups and redundancy so a ransomware attack or hardware failure does not stop the service.</p>
<p><strong>Question 4 (Paper 1, 4 marks).</strong> Explain why a company should use two-factor authentication for remote access.</p>
<p>Answer: 2FA requires two different factors — for example a password plus a one-time code from the user's phone. If a password is stolen through phishing or a database leak, the attacker still cannot authenticate without the second factor, which is in the employee's physical possession. This defeats the most common credential-theft attacks and secures remote access where physical checks are impossible.</p>
<p><strong>Question 5 (Paper 1, 4 marks).</strong> Describe how a denial-of-service attack works and one method of mitigating it.</p>
<p>Answer: The attacker floods the target server with enormous numbers of requests — often from many compromised machines at once (DDoS) — consuming its processing and bandwidth so legitimate users' requests go unanswered. Mitigation: traffic filtering and rate limiting at the network edge (or an ISP scrubbing service) drops the flood traffic before it reaches the server, and redundant servers keep services running while the attack is absorbed.</p>
<p><strong>Question 6 (Paper 1, 2 marks).</strong> Explain why an unencrypted public Wi-Fi network is a risk and how a user can protect themselves.</p>
<p>Answer: Traffic on the open network can be intercepted and read by anyone nearby with sniffing software, exposing logins and personal data. The user should connect through a VPN (or use HTTPS-only sites), which encrypts the traffic end to end so intercepted packets are unreadable.</p>
<p>Paper 1 is complete; Paper 2 turns from the machine to the craft of programming it — algorithm design, programming constructs, databases and Boolean logic.</p>
`,
  },
};
