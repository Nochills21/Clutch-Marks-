// IGCSE notes, batch 1. Worked numbers here were checked by hand.
module.exports = [
  {
    file: 'igcse-scatter-diagrams-and-correlation',
    eyebrow: 'Cambridge IGCSE Mathematics 0580, Statistics',
    title: 'Scatter diagrams and correlation',
    syllabus: 'Cambridge IGCSE Mathematics 0580, Statistics: scatter diagrams, correlation and the line of best fit (Core).',
    sections: [
      {
        h: 'Drawing a scatter diagram',
        why: 'Plotting each pair as a point shows whether the two variables move together, so the pattern in the diagram is the evidence for any claim about them.',
        paras: [
          'A scatter diagram plots two variables against each other. Each pair of values from the table becomes one point: the first value gives the x-coordinate and the second gives the y-coordinate. Put the variable that you think explains or causes the other on the x-axis, and the variable that responds on the y-axis. If the question does not say which is which, choose one and state it.',
          'Choose scales that spread the points across most of the grid. If all the values lie between 40 and 60, the axis does not need to start at zero, and a scale starting at 40 shows the pattern far better. Label both axes with the quantity and its unit, and mark each point clearly, for example with a small cross.',
          'Plot every pair in the table, even one that looks unusual. A point far from the rest is an outlier. It should be shown rather than hidden, because it may be a recording error or a genuine feature that the question asks you to comment on.',
        ],
        examples: [
          'a table gives hours of revision and marks for five students. Plot (2, 40) with x = 2 and y = 40, then plot the other four pairs in the same way. Each axis must carry its label and unit.',
        ],
      },
      {
        h: 'Correlation',
        why: 'Correlation describes the direction and strength of a relationship. A strong correlation does not prove that one variable causes the other, because a third factor can drive both.',
        paras: [
          'Correlation has two parts. The direction is positive when the points rise from left to right, and negative when they fall. The strength depends on how closely the points lie along a line: points close to a line give strong correlation, and widely scattered points give weak correlation. Zero correlation means there is no clear pattern at all.',
          'Describe correlation with both direction and strength, in the context of the question. “Strong positive correlation between hours revised and marks” gains the credit; “positive” alone usually does not, because it leaves out the strength.',
          'Correlation is not causation. Ice-cream sales and the number of sunburn cases often rise together in hot weather, but neither causes the other: the weather drives both. Before you claim that one variable causes another, check whether a third factor could explain the pattern.',
        ],
        list: [
          'Positive correlation: as one quantity increases, the other tends to increase.',
          'Negative correlation: as one quantity increases, the other tends to decrease.',
          'Zero correlation: there is no clear relationship between the quantities.',
        ],
        examples: [
          'hours studied and test score usually show positive correlation, because the points rise from left to right.',
        ],
      },
      {
        h: 'Drawing a line of best fit',
        why: 'A line of best fit should follow the trend with roughly equal numbers of points on each side. It summarises the overall pattern and reduces the effect of any single point.',
        paras: [
          'The line of best fit is a single straight line drawn by eye through the middle of the points, showing the overall trend. Use a ruled line, not a freehand curve. Extend it across the full range of the data, so that it can be used to read off estimates anywhere in that range.',
          'A good line follows the trend, not the individual points. It does not need to pass through any point exactly. Along its whole length there should be roughly the same number of points above it as below it. A single outlier should not pull the line toward it, so place the line for the main cluster of points unless the question says otherwise.',
        ],
        list: [
          'extends across the full range of the data;',
          'does not need to pass through any of the points exactly;',
          'has roughly the same number of points on each side along its whole length.',
        ],
      },
      {
        h: 'Using the line of best fit',
        why: 'Reading across the line gives estimates inside the range of the data. Predictions far beyond the data are less reliable, because the trend may not continue.',
        paras: [
          'To estimate y from a given x, find x on the horizontal axis, go up to the line, and read across to the vertical axis. Show the construction lines on the diagram, because the method marks are awarded for them even when the final reading is slightly off.',
          'The gradient of the line describes the relationship: a gradient of 5 means that y increases by 5 for each extra 1 in x. Calculate it from two points on the line you have drawn, not from two data points, because the data points are unlikely to lie exactly on the line.',
          'Estimating inside the range of the data is called interpolation, and it is more reliable. Estimating beyond the range is extrapolation. It assumes the trend continues, which is often not true, so say so if a question asks you to comment on a prediction.',
        ],
        formulas: ['gradient = (y₂ − y₁) ÷ (x₂ − x₁)'],
        examples: [
          'a line of best fit passes through (1, 35) and (5, 55). Its gradient is (55 − 35) ÷ (5 − 1) = 5. The estimated value at x = 3.5 is 35 + 5 × 2.5 = 47.5.',
        ],
      },
    ],
    exam: [
      'Describe correlation with a reason: “positive correlation, because the points rise from left to right”.',
      'Draw a ruled line, not a freehand curve, and check that it has points on both sides.',
      'When using the line, show the reading on the graph.',
    ],
  },
  {
    file: 'igcse-trigonometry-right-angled-triangles',
    eyebrow: 'Cambridge IGCSE Mathematics 0580, Trigonometry',
    title: 'Right-angled triangles',
    syllabus: "Cambridge IGCSE Mathematics 0580, Trigonometry: Pythagoras' theorem, right-angled triangles, exact values, and combined problems.",
    sections: [
      {
        h: "Pythagoras' theorem",
        why: 'In a right-angled triangle the squares on the two shorter sides add to the square on the hypotenuse. The theorem holds only for right angles, so check for one first.',
        paras: [
          'In a right-angled triangle, the hypotenuse is the longest side, opposite the right angle. The square on the hypotenuse equals the sum of the squares on the other two sides: c² = a² + b², where c is the hypotenuse. Use it to find a missing side when you know the other two.',
          'To find a shorter side, rearrange the formula to a² = c² − b², then take the square root. The answer must be shorter than the hypotenuse. If your result is longer, you have subtracted in the wrong order or used a shorter side as the hypotenuse.',
          'Pythagoras works only for right-angled triangles, so confirm the right angle before you use it. Keep full precision while you work, and round only the final answer to the accuracy the question asks for.',
        ],
        formulas: ['c² = a² + b²', 'a² = c² − b²'],
        examples: [
          'legs 5 and 12 give c² = 25 + 144 = 169, so c = 13. For a shorter side: hypotenuse 10 and one leg 6 give a² = 100 − 36 = 64, so a = 8.',
        ],
      },
      {
        h: 'SOHCAHTOA',
        why: 'Each ratio compares two sides relative to a given angle, so the angle fixes the ratio. The inverse function works backwards from a ratio to the angle.',
        paras: [
          'The three trigonometric ratios compare two sides of a right-angled triangle, relative to one of the acute angles. Label the sides before you calculate. The hypotenuse is opposite the right angle. The opposite side is across from the angle θ. The adjacent side touches θ and is not the hypotenuse.',
          'To find a side, multiply by the ratio: opposite = hypotenuse × sin θ. To find an angle, use the inverse function on a ratio of two known sides: if tan θ = 7/24, then θ = tan⁻¹(7/24) ≈ 16.3°. Do not use the inverse until you have the ratio.',
          'Most wrong answers come from labelling the sides from the wrong angle, not from the arithmetic. Make sure the calculator is in degree mode for angle questions.',
        ],
        formulas: ['sin θ = opposite ÷ hypotenuse', 'cos θ = adjacent ÷ hypotenuse', 'tan θ = opposite ÷ adjacent'],
        examples: [
          'a hypotenuse of 10 cm and an angle of 35°. The opposite side is 10 sin 35° ≈ 5.74 cm.',
          'a triangle with legs 9 and 12 has hypotenuse 15. For the angle opposite the 9, sin θ = 9 ÷ 15 = 0.6, so θ ≈ 36.9°.',
        ],
      },
      {
        h: 'Exact values (Extended)',
        why: 'The 30, 45 and 60 degree triangles have sides in fixed ratios, so their exact trig values come from those triangles. Knowing them avoids calculator rounding.',
        paras: [
          'Some angles give triangles with simple side ratios. The 45° triangle is isosceles, with sides 1, 1 and √2. A 30° and 60° triangle, made by splitting an equilateral triangle in half, has sides 1, √3 and 2. Reading exact values from these lets you give answers as surds rather than decimals.',
          'Give an exact answer when the question asks for one, or when a later step needs it. Keep the surd form until the end, and do not convert to a decimal in the middle of your working.',
          'Learn the table below, and notice its pattern: sin rises as the angle increases, and cos falls. So sin 60° equals cos 30°, and the 60° values are the 30° values with sin and cos swapped.',
        ],
        formulas: [
          'sin 30° = 1/2, cos 30° = √3/2, tan 30° = 1/√3',
          'sin 45° = cos 45° = 1/√2, tan 45° = 1',
          'sin 60° = √3/2, cos 60° = 1/2, tan 60° = √3',
        ],
        examples: [
          'tan 60° = sin 60° ÷ cos 60° = (√3/2) ÷ (1/2) = √3, which agrees with the table.',
        ],
      },
      {
        h: 'Combining Pythagoras and trigonometry (Extended)',
        why: 'Many problems have two steps: Pythagoras finds a missing side, and a trig ratio finds an angle or another side. Work out the missing side first, then use it in the ratio.',
        paras: [
          'Many questions need both. Use Pythagoras to find a missing side, then a trigonometric ratio for an angle, or the reverse. Sketch the figure and mark the known and unknown sides and angles before you start, because two-step problems often hide the right-angled triangle inside a larger shape.',
          'Keep full precision in intermediate steps. If you round a side to one decimal place and then use it, the final answer can be off by more than you intended. Keep the value on your calculator or write the exact surd, and round only the final answer.',
        ],
        examples: [
          'a rectangle 9 cm by 12 cm has a diagonal of 15 cm. The diagonal makes an angle θ with the 12 cm side, where tan θ = 9 ÷ 12 = 0.75, so θ ≈ 36.9°.',
        ],
      },
    ],
    exam: [
      'Label the triangle: hypotenuse, opposite and adjacent relative to the angle you are using.',
      'Choose the ratio from the sides you know and the side you need.',
      'Give the final answer to the accuracy asked for, usually 3 significant figures.',
    ],
  },
  {
    file: 'igcse-operating-systems',
    eyebrow: 'Cambridge IGCSE Computer Science 0478, Section 4',
    title: 'Software and operating systems',
    syllabus: 'Cambridge IGCSE Computer Science 0478, Section 4: types of software, interrupts and the purpose of an operating system.',
    sections: [
      {
        h: 'Types of software',
        why: 'System software manages the hardware, so application software can run without knowing the details of the machine. The operating system is the main example.',
        paras: [
          'Software is divided into two broad types. System software runs the computer and supports the other programs. It includes the operating system, utility programs, and translators such as compilers and interpreters. Application software performs a task for the user, such as a word processor, a spreadsheet, a game or a web browser.',
          'The two types are used differently. The operating system is loaded first and runs for as long as the computer is on, while application software is started by the user when needed. A utility that a user runs directly, such as a backup tool, is still system software, because it works on the machine itself.',
          'When asked to classify a piece of software, decide what it is for. If it controls or maintains the machine, it is system software. If it helps the user do a task, it is application software.',
        ],
        examples: [
          'a spreadsheet that totals a household budget is application software, because it helps the user with a task. A disk defragmenter that tidies the same disk is system software, because it acts on the machine itself.',
        ],
      },
      {
        h: 'Interrupts',
        why: 'An interrupt lets a device signal the processor when it needs attention. The processor then runs a short routine and resumes, so it does not waste time checking every device.',
        paras: [
          'An interrupt is a signal that makes the processor stop its current task and run a short routine called an interrupt service routine (ISR). When the ISR finishes, the processor returns to the task it was doing, from the point where it stopped. Without interrupts, the processor would have to keep checking every device to see whether it needed attention, which wastes time.',
          'Hardware interrupts come from devices, such as a key press, a printer that has run out of paper, or a timer. Software interrupts come from a program, for example when it asks the operating system for a service or hits an error. The distinction is about where the signal starts.',
          'Interrupts can have priorities. A higher-priority interrupt can interrupt the routine for a lower-priority one, but a lower-priority interrupt has to wait. This ensures that urgent events, such as a critical error, are dealt with first.',
        ],
        examples: [
          'while a document is printing, a key press causes an interrupt. The processor stops the printing task, runs the keyboard ISR to store the key, and then resumes printing from where it stopped.',
        ],
      },
      {
        h: 'What an operating system does',
        why: 'The operating system manages memory, processes, files and devices, and it provides the user interface. Each of these tasks lets many programs share one machine safely.',
        paras: [
          'The operating system is the main piece of system software. It sits between the hardware and the application programs and controls how the computer’s resources are shared. Without it, every program would need its own code to drive the disks, the screen and the keyboard, and programs could overwrite each other’s memory.',
          'Its jobs include the items listed below. Memory management allocates RAM to programs and keeps them separate. Multitasking shares the processor between programs, giving each a short time slice. Peripheral management controls devices through drivers. The operating system also manages user accounts and files.',
          'In an exam, give a specific example for each function rather than a general description. “Memory management allocates RAM so that one program cannot read another’s data” says more than “manages memory”.',
        ],
        list: [
          'User interface: a graphical or command-line way for the user to control the computer.',
          'Memory management: allocating RAM to programs and keeping them separate.',
          'Multitasking: sharing the processor between programs by giving each a short time slice.',
          'Peripheral management: controlling input and output devices through drivers.',
          'User account management: controlling who can log in and what they can access.',
          'File management: creating, naming, storing, moving and deleting files.',
        ],
      },
      {
        h: 'Utility software',
        why: 'Utilities keep the computer healthy: defragmentation, backup, anti-malware and compression. They are system software because they act on the machine itself.',
        paras: [
          'Utility software maintains the computer. Disk defragmentation rearranges fragmented files so that they are stored in contiguous blocks. Backup copies data so that it can be restored after loss. Anti-malware detects and removes malicious software. File compression reduces the size of files.',
          'Utilities are system software even though the user runs them directly, because they act on the machine itself rather than helping with a task such as writing or calculating.',
          'When a question asks why a utility is needed, link it to the problem it solves. For example, “backup protects against data loss if the disk fails” is a complete answer.',
        ],
        examples: [
          'a backup utility copies the files to an external drive each night, so that a disk failure does not lose a whole week of work.',
        ],
      },
    ],
    exam: [
      'Distinguish system software from application software by what each one is for.',
      'When asked about interrupts, describe what happens to the current task and then to the ISR.',
      'Give a specific example for each operating system function, not a general description.',
    ],
  },
  {
    file: 'igcse-database-systems',
    eyebrow: 'Cambridge IGCSE Computer Science 0478, Section 9',
    title: 'Databases',
    syllabus: 'Cambridge IGCSE Computer Science 0478, Section 9: database structure, keys and queries.',
    sections: [
      {
        h: 'Structure',
        why: 'A database stores each fact once in a table and links related tables through keys. Splitting data this way avoids repeating the same information in many places.',
        paras: [
          'A database stores data in tables. Each row is a record, one complete item such as a single student. Each column is a field, one attribute such as a name or an age. Every field has a data type, such as text, whole number or date, which controls the values it can hold.',
          'A flat-file database keeps all the data in one table. This is simple, but it repeats information. If a student takes five subjects, their name and address are repeated five times, and a change of address must be made in every copy. A relational database splits the data into several tables linked by keys, so each fact is stored once.',
          'Choosing data types carefully makes the database more reliable, because the software can refuse a value that does not match the field, such as text entered in a date field.',
        ],
        examples: [
          'a Students table holds one row per student, and an Orders table holds one row per order. The student’s address is stored once, in Students, not repeated in every order.',
        ],
      },
      {
        h: 'Keys',
        why: 'A primary key uniquely identifies each record, and a foreign key links one table to another. Without a unique key, records cannot be reliably found or related.',
        paras: [
          'A primary key uniquely identifies each record in its table, so no two records share the same value. Choose a field whose value never repeats, such as a student ID, rather than a name, because two students can have the same name.',
          'A foreign key is a field in one table that refers to the primary key of another table. It links the two tables, so that an order can say which student placed it. It also stops an order from pointing to a student who does not exist.',
          'Read the question to see which key it asks for. A field is a primary key in the table where it uniquely identifies each row, and a foreign key in any other table that refers to it.',
        ],
        examples: [
          'an Orders table has a foreign key StudentID that refers to the primary key StudentID in the Students table.',
        ],
      },
      {
        h: 'Queries',
        why: 'SQL reads, filters and changes data using the structure of the tables, without a program needing to loop through records. The query states what is wanted, not how to find it.',
        paras: [
          'SQL is a language for reading and changing data. A query states which data is wanted, and the database system works out how to find it. You do not write a loop through the records yourself.',
          'SELECT reads data, INSERT adds a new record, UPDATE changes existing records, and DELETE removes records. The last two should almost always use a WHERE clause to choose which records are affected.',
          'Without a WHERE clause, an UPDATE or DELETE affects every record in the table. Always include the condition unless the question asks for every record. Write the keywords in capitals, and write the table and field names exactly as given.',
        ],
        list: [
          'SELECT Name FROM Students WHERE Age > 15 ORDER BY Name; returns the names of matching students in alphabetical order.',
          "INSERT INTO Students (StudentID, Name, Age) VALUES (101, 'Amira', 16); adds a new record.",
          'UPDATE Students SET Age = 17 WHERE StudentID = 101; changes the existing records that match the condition.',
          'DELETE FROM Students WHERE StudentID = 101; removes the matching records.',
        ],
      },
      {
        h: 'Data integrity',
        why: 'Validation rejects bad data as it is entered, and verification checks that data was copied correctly. Each addresses a different kind of error, so both are needed.',
        paras: [
          'Validation checks data as it is entered, so that bad values are refused before they are stored. A range check accepts an age only between 0 and 120. A type check accepts only a whole number for an age. A presence check refuses a blank name.',
          'Verification checks that data has been copied or entered correctly. Double entry, where the same value is typed twice and the two copies are compared, is one method. A visual check against the source document is another. Verification catches mistakes that validation cannot, because a wrong value can still be within range.',
          'Storing each fact once and linking tables with keys also reduces redundancy, which lowers the risk of the same data being updated in one place and not another. When you explain a method, say which error it prevents.',
        ],
        examples: [
          'an age field with a range check accepts 16 but rejects 160. A verification check would still catch 61 typed for 16, because 61 is within the range and validation cannot tell it is wrong.',
        ],
      },
    ],
    exam: [
      'Write the SQL keywords in capitals and the table and field names exactly as given.',
      'When asked to identify a key, say whether it is a primary or a foreign key and which table it belongs to.',
      'Check that WHERE conditions use the right comparison operator.',
    ],
  },
];
