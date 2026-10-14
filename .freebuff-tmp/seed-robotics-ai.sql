insert into public.learning_objectives (topic_id, code, statement, teach, sort_order)
values
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'robotics-ai'), '0478 6.1a', $st$Explain automated systems as sense-process-respond loops, giving examples of each stage.$st$, $teach$### What is being asked
Describe an automated system or name the missing stage. The answer always has three legs — sensor, processor, actuator — with the decision in the middle.

### Method
1. Sense: a sensor measures a physical quantity (temperature, light, pressure) and the reading is digitised.
2. Process: the microprocessor compares the reading with a stored threshold or program.
3. Respond: an actuator acts (heater, motor, valve, buzzer) or an alert fires.
4. Test completeness: remove any leg in your head — a system that cannot act on its data is monitoring, not automation.

### Worked example
Automatic doors: a motion sensor detects approach, the controller checks the signal against its trigger level, and the motor slides the door. Check: approach with no motion signal leaves the door shut (sense fails safe); a working sensor with no motor is just a people-counter.

### Traps
- Calling remote control "automated". A human pressing the button is manual control — automation decides by itself.
- Sensors that act. Sensors measure only; motors and heaters do — never swap the legs.
- No threshold, no decision. Data without a comparison point triggers nothing; the stored value is part of every answer.
- One example for all three legs. Name which part is sensor, which is processor, which is actuator — labels earn marks.

### Timing
Paper 1: 3 minutes, 3-4 marks. System descriptions want the loop closed — sense, decide, respond, all three named.$teach$, 1),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'robotics-ai'), '0478 6.1b', $st$Discuss advantages and disadvantages of automated systems compared with human operation.$st$, $teach$### What is being asked
Judge whether automation suits a job. The answer weighs both sides with the scenario's facts — never automation-always or humans-always.

### Method
1. Advantages: tireless 24-hour operation, consistent precision, work in dangerous places, lower long-run labour cost per unit.
2. Disadvantages: high setup cost, inflexible when conditions change unexpectedly, maintenance needs specialists, failures can run unnoticed.
3. Decide by the job's shape: repetitive, precise, dangerous or remote favours automation; varied, judgement-heavy or rare favours humans.
4. Every point must touch the scenario — "fast" means nothing until it is fast at the stated task.

### Worked example
Welding car bodies: robots win — identical welds all day in sparks and fumes, where humans tire and get hurt. Check the other side honestly: retooling for a new model costs months and engineers, which is exactly when the inflexibility disadvantage bites.

### Traps
- One-sided answers. "Robots are better" without cost, inflexibility or failure scores half at best.
- "Automation never makes mistakes". It repeats setup mistakes perfectly — a miscalibrated robot ruins every unit identically.
- Cheaper always. Setup and maintenance are expensive; automation pays only at volume over time.
- Humans as flawless backup. Tired supervisors miss failing automation — monitoring is itself a weak point.

### Timing
Paper 1: 4 minutes, 4-6 marks. Discussion marks split evenly — give two supported points per side, minimum.$teach$, 2),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'robotics-ai'), '0478 6.2a', $st$Describe robot characteristics and explain roles robots fill in industry and everyday life.$st$, $teach$### What is being asked
Say what makes a machine a robot or place robots in jobs. The answer needs sensing, programmability and movement — plus a job that uses all three.

### Method
1. Characteristics: sensors to perceive, a programmed controller to decide, and actuators (arms, wheels, joints) to act on the world.
2. Industrial roles: assembly, welding, painting, palletising — repetitive precision at scale.
3. Beyond factories: warehouse pickers, surgical assistants, bomb disposal, exploration (space, deep sea), domestic helpers.
4. Place by fit: dangerous, precise, tedious or remote work matches robot strengths; comfort and judgement do not.

### Worked example
Bomb disposal uses tracked robots with cameras and manipulator arms: too dangerous for humans, needing sensing (camera), decision (operator program or autonomy) and action (arm). Check all three characteristics — a remote camera alone senses without acting, so it is not a robot.

### Traps
- Any machine is a robot. Without sensing AND programmed decision AND action, it is automation or a tool, not a robot.
- Robots only in factories. Everyday and extreme roles (surgery, space, oceans) show the range examiners reward.
- "Robots think like humans". They execute programs on sensor data — impressive control, not understanding.
- Listing jobs without fit. Every role needs its reason: danger, precision or remoteness matched to the robot's strengths.

### Timing
Paper 1: 3 minutes, 3-4 marks. Characteristics first (all three), then roles with reasons — in that order.$teach$, 3),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'robotics-ai'), '0478 6.2b', $st$Discuss the benefits and concerns of increasing robotics, including jobs and safety.$st$, $teach$### What is being asked
Argue about robots in society. The answer balances productivity and safety gains against jobs, dependence and control — with examples, not slogans.

### Method
1. Benefits: higher output and quality, dangerous work delegated, new jobs (design, maintenance, programming), assistance for elderly and disabled.
2. Concerns: displacement of routine jobs, deskilling, dependence on complex systems, safety failures, and accountability when autonomy errs.
3. Structure: one benefit with an example, one concern with an example, then a judged conclusion — never one side alone.
4. Keep it human: every point lands on people (workers, patients, the public), not on the machines.

### Worked example
Warehouse automation: parcels move faster with fewer injuries (benefit), but pickers lose routine jobs and the site halts entirely during system outages (concerns). A judged line follows: adopt with retraining and manual fallbacks. Check: both sides name people affected — speed alone would not be a discussion.

### Traps
- Benefits only. Examiners explicitly ask for discussion — one-sided answers cap at half marks.
- "Robots will take ALL jobs". Judgement-heavy, creative and caring work resists automation — overclaiming weakens the argument.
- Safety as pure benefit. Robots remove humans from danger AND introduce machine hazards (collisions, faults) — both directions count.
- No conclusion. Discussion ends in judgement: adopt, restrict, or condition — state which and why.

### Timing
Paper 1: 4-5 minutes, 4-6 marks. Two points per side plus a conclusion is the reliable full-mark shape.$teach$, 4),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'robotics-ai'), '0478 6.3a', $st$Explain expert systems, including the knowledge base, inference engine and rules.$st$, $teach$### What is being asked
Describe an expert system or trace how it reaches advice. The answer separates stored knowledge from the reasoning that uses it.

### Method
1. Knowledge base: facts and IF-THEN rules from human experts (IF rash AND fever THEN consider measles).
2. Inference engine: applies the rules to the user's answers, chaining toward a conclusion, and can explain its reasoning.
3. User interface: asks questions, takes symptoms or data, presents advice with justification.
4. Uses: medical diagnosis support, fault-finding, financial advice — narrow domains with documented expertise.

### Worked example
A plant-doctor system asks about spots and wilting, matches IF yellow-leaves AND wet-soil THEN overwatering, and advises drying out — showing the rule it used. Check: the rule came from the knowledge base, the matching from the inference engine, the question-and-advice from the interface — three parts, three jobs.

### Traps
- "Expert systems learn". Classic expert systems reason from fixed rules; they do not learn from new cases (that is machine learning).
- Knowledge base equals database. It stores reasoning rules, not just records — rules are the expertise.
- No explanation needed. Showing its working is a defining feature — advice without justification is just a claim.
- Experts replaced. Systems support professionals (especially where experts are scarce); responsibility stays human.

### Timing
Paper 1: 3 minutes, 3-4 marks. Part-and-job answers score: name each component with what it contributes to one consultation.$teach$, 5),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'robotics-ai'), '0478 6.3b', $st$Explain machine learning from training data, and compare it with expert systems.$st$, $teach$### What is being asked
Describe learning from data or judge which AI suits a task. The answer turns on rules-written versus patterns-found.

### Method
1. Machine learning: the system trains on large labelled datasets, adjusts itself to reduce errors, and predicts on new data (spam filters, recommendations, image recognition).
2. Quality in, quality out: biased or thin training data produces biased or brittle predictions.
3. Expert systems: humans write the rules; transparent and explainable, but frozen and narrow.
4. Compare: learning adapts from examples (needs data, hard to explain); expert systems reason from rules (needs experts, easy to explain).

### Worked example
Email spam filtering learns from millions of labelled messages rather than hand-written rules — new spam styles are caught because the patterns shifted, not because a programmer updated rules. Check: the training labels are the teacher; without them the system has nothing to learn from.

### Traps
- "Learning needs no data". Data is the whole method — no dataset, no learning.
- Explainable by default. Learned models are notoriously hard to interrogate — opacity is the price of adaptation.
- More data always helps. Biased data at scale teaches bias at scale; quality beats quantity.
- One AI for everything. Sparse-expert domains suit rules; pattern-rich data suits learning — match the method to the material.

### Timing
Paper 1: 3-4 minutes, 3-5 marks. Comparison questions want the mechanism contrast (rules vs training), not just two descriptions.$teach$, 6)
on conflict (topic_id, code) do update set
  statement = excluded.statement,
  teach = excluded.teach,
  sort_order = excluded.sort_order;
delete from public.quizzes
 where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'robotics-ai') and title = 'Checkpoints — Robotics & AI';
insert into public.quizzes (id, topic_id, title, description, is_published, exam_type)
values ('00000000-0000-0000-0000-000000000000', (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'robotics-ai'), 'Checkpoints — Robotics & AI', $desc$Short checks, one set per objective in this topic. Answer one wrongly and the objective it belongs to is the thing to revisit — not the whole topic.$desc$, true, 'quiz');
insert into public.questions
  (quiz_id, question_text, options, correct_option, explanation, difficulty, sort_order, objective_id, statement_id)
values
('00000000-0000-0000-0000-000000000000', $qt$A greenhouse opens vents when it gets too hot. Which mapping is correct?$qt$, $opts$["Vents sense heat, the sensor opens them","Temperature sensor, controller comparing with a threshold, motor opening vents","Motor senses heat and decides to open","Controller heats the air directly"]$opts$::jsonb, 1, $ex$Sensor measures, controller decides against the threshold, motor acts. Vents and motors sense nothing; controllers command, they do not heat.$ex$, 'check', 101, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'robotics-ai') and code = '0478 6.1a'), null),
('00000000-0000-0000-0000-000000000000', $qt$A TV turned on by remote control is NOT an automated system. Why?$qt$, $opts$["It uses electricity","A human makes the decision, not the system","It has no microprocessor","Remote controls are analogue"]$opts$::jsonb, 3, $ex$Automation decides alone; here the human decides and the TV obeys — manual control. Power, chips and signal type are irrelevant to the definition.$ex$, 'check', 102, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'robotics-ai') and code = '0478 6.1a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Why do car factories weld with robots rather than people?$qt$, $opts$["Robots work tirelessly with consistent precision in dangerous conditions","Robots need no electricity or maintenance","Robots redesign the cars themselves","Robots never need programming"]$opts$::jsonb, 0, $ex$Tireless consistency in sparks and fumes is the genuine triple advantage. Robots consume power, need maintenance and programming, and design nothing.$ex$, 'check', 201, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'robotics-ai') and code = '0478 6.1b'), null),
('00000000-0000-0000-0000-000000000000', $qt$What is a real disadvantage of automating a small bakery's decorating?$qt$, $opts$["Decorated cakes taste worse","High setup cost and inflexibility for varied daily designs","Robots cannot work in kitchens","Customers prefer darkness"]$opts$::jsonb, 2, $ex$Small varied batches cannot repay setup costs or fit rigid programming. Taste is unaffected; kitchen robots exist; the last option is nonsense.$ex$, 'check', 202, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'robotics-ai') and code = '0478 6.1b'), null),
('00000000-0000-0000-0000-000000000000', $qt$Which of these is a robot?$qt$, $opts$["A CCTV camera watching a car park","A warehouse picker that senses parcels, decides grips and moves them","An electric drill","A printed timetable"]$opts$::jsonb, 2, $ex$Sensing plus programmed decision plus movement is the full trio. The camera only watches; drills and timetables lack sensing and decision entirely.$ex$, 'check', 301, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'robotics-ai') and code = '0478 6.2a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Why are robots used to explore the deep ocean?$qt$, $opts$["The ocean is too remote and hostile for divers","Robots enjoy swimming","Divers are too precise","Robots do not need programming underwater"]$opts$::jsonb, 0, $ex$Crushing pressure and remoteness bar humans while robots endure — the danger-and-distance fit. The other options are jokes or backwards.$ex$, 'check', 302, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'robotics-ai') and code = '0478 6.2a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Which is a genuine concern about delivery robots on pavements?$qt$, $opts$["They deliver parcels too quickly","Collisions with pedestrians and unclear accountability in accidents","They use too little electricity","They never break down"]$opts$::jsonb, 3, $ex$Shared-space safety plus who-pays-when-it-fails is the real issue. Speed and efficiency are benefits; breakdown immunity is false.$ex$, 'check', 401, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'robotics-ai') and code = '0478 6.2b'), null),
('00000000-0000-0000-0000-000000000000', $qt$Which benefit do surgical-assistant robots offer?$qt$, $opts$["Operations with no human surgeon involved","Steadier precision beyond shaking hands, under surgeon control","Free operations for everyone","Diagnosis without any tests"]$opts$::jsonb, 1, $ex$Precision beyond human tremor, still directed by the surgeon — assistance, not replacement. Unsupervised surgery, free care and test-free diagnosis are fantasies.$ex$, 'check', 402, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'robotics-ai') and code = '0478 6.2b'), null),
('00000000-0000-0000-0000-000000000000', $qt$In an expert system, what does the inference engine do?$qt$, $opts$["Stores the expert's facts and rules","Applies rules to the user's answers to reach advice","Displays adverts to fund the system","Types the expert's books"]$opts$::jsonb, 1, $ex$Reasoning with the rules is the engine's job; storage is the knowledge base. Adverts and typing are not components at all.$ex$, 'check', 501, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'robotics-ai') and code = '0478 6.3a'), null),
('00000000-0000-0000-0000-000000000000', $qt$A fault-finding system explains each question it asks. Which feature is this?$qt$, $opts$["Machine learning","The explanation facility justifying its reasoning","A virus scan","Random question selection"]$opts$::jsonb, 2, $ex$Showing its working is the explanation facility — a hallmark of expert systems. Learning adapts from data; scans and randomness are unrelated.$ex$, 'check', 502, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'robotics-ai') and code = '0478 6.3a'), null),
('00000000-0000-0000-0000-000000000000', $qt$A photo app sorts pictures of cats after training on labelled examples. What kind of AI is this?$qt$, $opts$["Machine learning trained on data","An expert system with hand-written cat rules","A spreadsheet macro","A logic gate circuit"]$opts$::jsonb, 0, $ex$Learning patterns from labelled examples is machine learning. Hand-written rules would be expert-system style; macros and gates do not learn from data.$ex$, 'check', 601, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'robotics-ai') and code = '0478 6.3b'), null),
('00000000-0000-0000-0000-000000000000', $qt$A loan-approval model trained only on past approvals keeps rejecting one group unfairly. What is the cause?$qt$, $opts$["The computer is too slow","Expert systems always discriminate","Loans are too complex for computers","Biased training data taught the bias"]$opts$::jsonb, 3, $ex$Models inherit their training data's patterns, including its prejudices — garbage in, gospel out. Speed, expert systems and complexity miss the mechanism entirely.$ex$, 'check', 602, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'robotics-ai') and code = '0478 6.3b'), null),
('00000000-0000-0000-0000-000000000000', $qt$A tunnel glazing system sprays water when dust sensors report low visibility. Identify the sensor, processor and actuator.$qt$, $opts$["Spray nozzles sense dust; water decides; sensors spray","Dust sensors sense; controller compares with a threshold; spray valves actuate","The tunnel senses; drivers decide; headlights spray","Water senses dust and sprays itself"]$opts$::jsonb, 1, $ex$Marks as awarded: dust sensors as the sensing leg [1]; controller-with-threshold deciding and valves acting [1]. The other mappings assign sensing to nozzles, decisions to drivers, or intelligence to water.$ex$, 'exam', 900, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'robotics-ai') and code = '0478 6.1a'), (select id from public.syllabus_statements where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'robotics-ai') and code = '6.1')),
('00000000-0000-0000-0000-000000000000', $qt$A car-fault expert system asks about noises, then advises checking the alternator belt, citing its rule. Which two components acted, and how?$qt$, $opts$["The user interface asked; the knowledge base answered directly","Machine learning retrained itself on the car","The inference engine matched the noise answers against knowledge-base rules","The sensors replaced the alternator"]$opts$::jsonb, 2, $ex$Marks as awarded: answers matched against stored IF-THEN rules [1]; matching done by the inference engine with the cited rule as evidence [1]. The base never answers alone; no learning occurred; nothing physical was replaced.$ex$, 'exam', 901, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'robotics-ai') and code = '0478 6.3a'), (select id from public.syllabus_statements where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'robotics-ai') and code = '6.3'));
