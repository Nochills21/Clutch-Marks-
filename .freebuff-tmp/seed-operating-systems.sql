insert into public.learning_objectives (topic_id, code, statement, teach, sort_order)
values
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'operating-systems'), '0478 4.1a', $st$Describe how the operating system manages memory, files, hardware, security and users.$st$, $teach$### What is being asked
Name the OS job in a scenario or explain what breaks without one. The answer is management — the OS runs the machine so programs do not have to.

### Method
1. Memory management: allocates RAM to programs, moves data between RAM and virtual memory, protects programs from each other.
2. File management: organises storage into files and folders, controls access rights, handles open, save and delete.
3. Hardware management: drivers let the OS talk to devices; scheduling shares the CPU fairly between tasks.
4. Security and users: accounts with passwords and permissions, plus logging — every action traces to somebody.

### Worked example
Two programs open and neither crashes the other: the OS gave each its own memory area and stops either touching the other's. Check: without memory management the second program would overwrite the first — protection, not capacity, is the demonstrated job.

### Traps
- "The OS makes the computer faster". It manages fairly; speed comes from hardware. A busy OS managing badly slows everything.
- Confusing the OS with applications. Word processors and browsers run ON the OS; deleting one leaves the machine running.
- One job answers everything. Memory, files, hardware and users are different managements — match the scenario's symptom to the right one.
- Forgetting multi-tasking. Sharing one CPU between many programs fairly is scheduling, the OS's most visible daily job.

### Timing
Paper 1: 3 minutes, 3-4 marks. Management questions want the mechanism (allocate, protect, schedule), not just the area name.$teach$, 1),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'operating-systems'), '0478 4.1b', $st$Explain interrupts, their causes, and how the CPU responds to and prioritises them.$st$, $teach$### What is being asked
Trace what happens when an interrupt fires or rank which is handled first. The answer is suspend, save, serve, resume — with priority deciding the order.

### Method
1. Causes: hardware signals (key pressed, disk finished, printer ready), software errors (divide by zero), timers and power warnings.
2. Response: the CPU finishes the current instruction, saves its state (registers, PC), and jumps to the interrupt handler routine.
3. After serving, the saved state is restored and the original program resumes exactly where it left off.
4. Priority: a higher-priority interrupt can pre-empt a lower one (power failure beats a keypress); equal ones queue.

### Worked example
A key is pressed mid-calculation: the CPU completes the current instruction, stores PC and registers, runs the keyboard handler to collect the keystroke, restores the saved state and continues the sum. Check: the sum's answer is unchanged — suspension plus restoration is what makes interrupts invisible to programs.

### Traps
- "The CPU drops its work". State is saved precisely so nothing is lost — dropping would corrupt every interrupted program.
- Handling before finishing the instruction. The current instruction completes first; only then does the CPU divert.
- All interrupts equal. Priorities exist because a power warning cannot wait behind a mouse click.
- Confusing interrupts with errors. Errors can cause interrupts, but most interrupts are routine signals (keys, disks, timers).

### Timing
Paper 1: 3-4 minutes, 3-5 marks. Order matters: finish, save, serve, restore — a scrambled sequence loses the method marks.$teach$, 2),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'operating-systems'), '0478 4.1c', $st$Distinguish system, application and utility software, giving examples of each.$st$, $teach$### What is being asked
Sort software into its class or explain why a program belongs where it does. The answer uses the user test: who asked for it and what does it manage.

### Method
1. System software: runs the machine itself — operating systems and drivers. Needed before anything else works.
2. Application software: does the user's task — word processors, browsers, games, apps. Installed by choice, removed freely.
3. Utility software: small maintenance tools — antivirus, backup, compression, disk repair. Serves the system or the user in a narrow job.
4. Sort by dependence: remove it and if the machine cannot run, it was system; if one task stops, application; if maintenance stops, utility.

### Worked example
Sort: Windows, a printer driver, Photoshop, an antivirus scanner. Windows and the driver are system (the machine needs them); Photoshop is application (one user's task); the scanner is utility (narrow maintenance). Check with removal: deleting Photoshop loses editing only; deleting the OS loses everything.

### Traps
- "Antivirus is system software". It maintains rather than runs the machine — utility, even when preinstalled.
- Compilers as applications. Translators serve programmers, not end tasks — they sit with system software, not beside games.
- Bigger means system. Size never decides; dependence does — a tiny driver is system, a huge game is application.
- Utilities doing user tasks. Backup and compression serve maintenance; the moment software does the user's actual job it is application.

### Timing
Paper 1: 2 minutes, 2-3 marks. Classification is quick if the removal test is applied instead of memorised lists.$teach$, 3)
on conflict (topic_id, code) do update set
  statement = excluded.statement,
  teach = excluded.teach,
  sort_order = excluded.sort_order;
delete from public.quizzes
 where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'operating-systems') and title = 'Checkpoints — Operating Systems';
insert into public.quizzes (id, topic_id, title, description, is_published, exam_type)
values ('00000000-0000-0000-0000-000000000000', (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'operating-systems'), 'Checkpoints — Operating Systems', $desc$Short checks, one set per objective in this topic. Answer one wrongly and the objective it belongs to is the thing to revisit — not the whole topic.$desc$, true, 'quiz');
insert into public.questions
  (quiz_id, question_text, options, correct_option, explanation, difficulty, sort_order, objective_id, statement_id)
values
('00000000-0000-0000-0000-000000000000', $qt$Two programs run together without corrupting each other's data. Which OS job is demonstrated?$qt$, $opts$["File compression","Memory management and protection","Virus scanning","Screen resolution control"]$opts$::jsonb, 1, $ex$Separate protected memory areas stop programs overwriting each other. Compression shrinks files; scanning hunts malware; resolution is display hardware — none isolate programs.$ex$, 'check', 101, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'operating-systems') and code = '0478 4.1a'), null),
('00000000-0000-0000-0000-000000000000', $qt$A student can open the class folder but cannot delete from it. Which OS mechanism applies?$qt$, $opts$["Memory paging","Device drivers","File access rights","CPU scheduling"]$opts$::jsonb, 2, $ex$Read-but-not-delete is a permission on the file — access rights. Paging manages RAM; drivers talk to hardware; scheduling shares CPU time.$ex$, 'check', 102, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'operating-systems') and code = '0478 4.1a'), null),
('00000000-0000-0000-0000-000000000000', $qt$What does the CPU do first when an interrupt signal arrives?$qt$, $opts$["Abandons the current program immediately","Finishes the current instruction, then saves its state","Restarts the whole computer","Ignores it until the program ends"]$opts$::jsonb, 1, $ex$The current instruction completes, then registers and PC are saved before the handler runs. Abandoning corrupts work; restarting and ignoring defeat the mechanism's purpose.$ex$, 'check', 201, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'operating-systems') and code = '0478 4.1b'), null),
('00000000-0000-0000-0000-000000000000', $qt$A power-failure warning and a mouse click arrive together. Which is served first, and why?$qt$, $opts$["The mouse click, because it arrived in the same cycle","Whichever the programmer prefers","The power warning, because interrupts carry priorities","Neither — simultaneous interrupts cancel out"]$opts$::jsonb, 2, $ex$Priority decides, not arrival order: losing power threatens everything, so its interrupt pre-empts routine input. Simultaneous interrupts queue by priority; they never cancel.$ex$, 'check', 202, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'operating-systems') and code = '0478 4.1b'), null),
('00000000-0000-0000-0000-000000000000', $qt$Which of these is system software?$qt$, $opts$["A web browser","A printer driver","A backup tool","A spreadsheet"]$opts$::jsonb, 1, $ex$The driver lets the OS operate hardware — the machine needs it. Browsers and spreadsheets do user tasks (application); backup is narrow maintenance (utility).$ex$, 'check', 301, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'operating-systems') and code = '0478 4.1c'), null),
('00000000-0000-0000-0000-000000000000', $qt$A disk defragmenter reorganises files for speed. How is it classified?$qt$, $opts$["Application software","System software","Firmware","Utility software"]$opts$::jsonb, 3, $ex$Single-purpose maintenance of storage is the utility definition. It does no user task (not application), the machine runs without it (not system), and it is not burned into hardware (not firmware).$ex$, 'check', 302, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'operating-systems') and code = '0478 4.1c'), null),
('00000000-0000-0000-0000-000000000000', $qt$A printer signals it has finished while a program runs. Describe exactly how the CPU handles this interrupt.$qt$, $opts$["Stops instantly, runs the printer routine, then restarts the program from the beginning","Finishes the current instruction, saves registers and PC, runs the handler, restores state and resumes","Pauses the program permanently and waits for the user","Ignores the printer until the program finishes"]$opts$::jsonb, 1, $ex$Marks as awarded: current instruction finished and state saved [1]; handler served then state restored with exact resume [1]. Restarting loses work; permanent pausing and ignoring both break the device contract.$ex$, 'exam', 900, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'operating-systems') and code = '0478 4.1b'), (select id from public.syllabus_statements where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'operating-systems') and code = '4.1')),
('00000000-0000-0000-0000-000000000000', $qt$A school PC is used by 200 students. Which two OS features keep work private and the machine stable?$qt$, $opts$["Larger icons and brighter wallpaper","Faster internet and more games","User accounts with passwords plus memory protection between programs","A bigger monitor and louder speakers"]$opts$::jsonb, 2, $ex$Marks as awarded: accounts with authentication give each student private storage [1]; protected memory stops one student's program crashing another's [1]. Decoration, entertainment and peripherals solve neither privacy nor stability.$ex$, 'exam', 901, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'operating-systems') and code = '0478 4.1a'), (select id from public.syllabus_statements where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'operating-systems') and code = '4.1'));
