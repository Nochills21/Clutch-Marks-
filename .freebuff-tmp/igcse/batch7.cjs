// IGCSE notes, batch 7. Worked answers were checked by hand and in code.
module.exports = [
  {
    file: 'igcse-hardware-architecture',
    eyebrow: 'Cambridge IGCSE Computer Science 0478, Section 3',
    title: 'Hardware and architecture',
    syllabus: 'Cambridge IGCSE Computer Science 0478, Section 3: computer architecture, input and output devices, and data storage.',
    sections: [
      {
        h: 'The Von Neumann architecture',
        why: 'Storing programs and data in one memory means both travel on the same buses. The CPU fetches each instruction from memory, which is why the fetch-decode-execute cycle is central.',
        paras: [
          'Most computers store programs and data in the same memory and fetch instructions from it one at a time. The main parts are the central processing unit (CPU), memory, and input and output devices, connected by buses.',
          'There are three buses. The address bus carries the memory location to be accessed, the data bus carries the value being read or written, and the control bus carries signals such as read and write. Because instructions and data share the same memory and buses, a larger bus width lets more memory be addressed.',
        ],
      },
      {
        h: 'The CPU',
        why: 'The program counter holds the address of the next instruction, so the CPU always knows where to fetch from. Decoding then identifies the operation, and execution carries it out.',
        paras: [
          'The arithmetic logic unit (ALU) performs arithmetic and logical operations. The control unit (CU) directs the other components and decodes instructions. Registers are small, very fast storage locations inside the CPU, such as the program counter and the accumulator.',
          'The fetch-decode-execute cycle works as follows: the address in the program counter is fetched, the instruction is decoded, and it is executed. The program counter then moves on to the next instruction.',
          'Clock speed is the number of cycles per second, measured in hertz (GHz). A higher clock speed does not always mean faster work, because the number of cores and the size of the cache also matter. Cache is a small, fast memory between the CPU and RAM that holds frequently used data.',
        ],
      },
      {
        h: 'Memory',
        why: 'RAM is volatile because its contents depend on power. It is fast working memory, which is why it holds only the programs and data in use.',
        paras: [
          'RAM is volatile: its contents are lost when power is removed. It holds the programs and data currently in use. ROM is non-volatile and holds the instructions a computer needs to start, such as the boot firmware.',
          'Adding more RAM allows more programs to run at once without slowing down through swapping, which is when the system moves data between RAM and the much slower secondary storage.',
        ],
      },
      {
        h: 'Input and output devices',
        why: 'Input devices turn real-world signals into digital data, and output devices turn digital data back into something a person can perceive. Sensors are input devices that measure physical quantities.',
        paras: [
          'Input devices send data into the computer: keyboard, mouse, scanner, microphone, touchscreen and sensors. Output devices send data out: monitor, printer, speakers and actuators. Some devices do both, such as a touchscreen or a headset.',
        ],
      },
      {
        h: 'Data storage',
        why: 'Secondary storage keeps data without power but is slower than RAM. The CPU accesses RAM directly, which is why RAM counts as primary storage.',
        paras: [
          'Magnetic storage (hard disk drive) uses magnetised areas on spinning platters. It holds a lot of data cheaply but is slower and more fragile. Solid-state storage (solid-state drive, flash memory) has no moving parts, so it is faster and more durable.',
          'Optical storage (CD, DVD, Blu-ray) uses a laser to read pits and lands on a disc. It is portable but has limited capacity compared with modern drives. All of these are secondary storage, while RAM is primary storage.',
        ],
      },
    ],
    exam: [
      'When asked why a component is used, link it to the fetch-decode-execute cycle.',
      'Name the type of memory precisely: volatile RAM or non-volatile ROM.',
      'Compare storage devices using the same criteria: capacity, speed, cost, durability and portability.',
    ],
  },
  {
    file: 'igcse-programming-concepts',
    eyebrow: 'Cambridge IGCSE Computer Science 0478, Section 4 (translators and IDEs) and Section 8 (programming)',
    title: 'Programming concepts',
    syllabus: 'Cambridge IGCSE Computer Science 0478, Section 4 (translators and IDEs) and Section 8 (programming: concepts, arrays and file handling).',
    sections: [
      {
        h: 'Variables, constants and data types',
        why: 'A variable can change during a program, while a constant protects a value that must stay fixed. The data type decides what values are allowed and what operations make sense.',
        paras: [
          'A variable holds a value that can change; a constant holds a value that does not change. Declare each variable with a data type. Common data types are integer (whole numbers), real (numbers with a decimal part), char (one character), string (text) and Boolean (TRUE or FALSE).',
          'Operators are arithmetic (+, −, *, /), integer division (DIV), remainder (MOD) and comparison (=, <>, <, >, <=, >=). Integer division keeps only the whole part of the result, and MOD gives what is left over.',
        ],
        examples: [
          '17 DIV 5 = 3 and 17 MOD 5 = 2, since 5 × 3 = 15 and 17 − 15 = 2.',
        ],
      },
      {
        h: 'Selection and iteration',
        why: 'A WHILE loop tests before each pass, so it can run zero times. A REPEAT loop tests after each pass, so it always runs at least once. Choosing the right one depends on whether the body must run first.',
        paras: [
          'Selection chooses between paths with IF or CASE. Iteration repeats steps: a FOR loop runs a fixed number of times, a WHILE loop tests before each pass, and a REPEAT loop tests after each pass. Write the loop’s variable and range clearly, so the number of passes is obvious.',
        ],
        examples: [
          'IF score >= 50 THEN result ← "Pass" ELSE result ← "Fail" ENDIF.',
          'FOR i ← 1 TO 5, total ← total + i, NEXT i. With total starting at 0, the result is 15.',
        ],
      },
      {
        h: 'Arrays',
        why: 'An array groups related values under one name, and an index picks out each one. A loop can then process every element by changing the index.',
        paras: [
          'An array stores several values of the same type under one name, with an index for each position. A one-dimensional array has one index; a two-dimensional array has two, usually row and column. Check whether the array starts at index 0 or 1 in the question before you write an index.',
          'Use a loop with the index to process every element, and check the index stays within the array bounds, because reading outside the array is a common runtime error.',
        ],
        examples: [
          'names[1] holds the first name when the array starts at 1.',
        ],
      },
      {
        h: 'File handling',
        why: 'A file must be opened before use and closed afterwards, so the data is read or written reliably and the resources are released. Opening for reading or writing controls what the program may do.',
        paras: [
          'A file must be opened before it is read or written and closed afterwards. Open a file for reading or for writing, read or write one line or record at a time, then close it so that the data is saved.',
        ],
      },
      {
        h: 'Translators and development environments',
        why: 'A compiler translates the whole program before it runs, while an interpreter translates and runs it line by line. Development environments support both by helping with editing and debugging.',
        paras: [
          'A compiler translates the whole program into machine code before it runs, producing an executable file. An interpreter translates and runs the program one line at a time. An assembler translates assembly language into machine code.',
          'An integrated development environment (IDE) combines an editor, a translator, a debugger and tools for testing in one program. Explain a translator choice by naming when the translation happens.',
        ],
      },
    ],
    exam: [
      'Write a loop’s variable and range explicitly, so the number of passes is clear.',
      'When an array index is asked for, check whether the array starts at 0 or 1 in the question.',
      'Explain a translator choice by naming when the translation happens.',
    ],
  },
  {
    file: 'igcse-statistics-data-handling',
    eyebrow: 'Cambridge IGCSE Mathematics 0580, Statistics',
    title: 'Data handling',
    syllabus: 'Cambridge IGCSE Mathematics 0580, Statistics: classifying and interpreting data, averages and range, charts and diagrams.',
    sections: [
      {
        h: 'Classifying data',
        why: 'Discrete data are counted and take exact values, while continuous data are measured and fall in ranges. The type decides how the data should be grouped and which chart fits.',
        paras: [
          'Quantitative data are numbers. Discrete data are counted and take whole-number values, such as shoe sizes or the number of pupils. Continuous data are measured and can take any value in a range, such as height or time.',
          'Qualitative data are categories with no numerical value, such as eye colour or a favourite subject. The type of data decides which average and which chart you can use.',
        ],
      },
      {
        h: 'Averages and range',
        why: 'In a frequency table each value counts as often as it occurs, so the mean multiplies each value by its frequency before dividing by the total frequency. Grouped data use the midpoints as estimates.',
        paras: [
          'Mean is the sum of the values divided by the number of values. Median is the middle value after ordering; with an even count, average the two middle values. Mode is the most frequent value, and a data set can have no mode, one mode or several. Range is the largest value minus the smallest, and it measures spread.',
          'For a frequency table, the mean is the sum of (value × frequency) divided by the total frequency. For grouped data, use the class midpoints and state that the mean is an estimate.',
        ],
        formulas: ['mean = sum of values ÷ number of values', 'mean from a table = Σ(value × frequency) ÷ Σfrequency'],
        examples: [
          '3, 5, 8, 9 gives a sum of 25 and a mean of 25 ÷ 4 = 6.25.',
          '2, 4, 6, 9, 11 gives a median of 6.',
        ],
      },
      {
        h: 'Pie charts and bar charts',
        why: 'A pie chart uses the whole circle for the total, so each item’s angle is 360 divided by the total, times its frequency. The angles must add to 360 degrees.',
        paras: [
          'In a pie chart each item represents 360 ÷ total degrees per item, so multiply each frequency by that value to find its sector angle. A bar chart uses equal widths and gaps between the bars; a histogram does not, as described below.',
        ],
        examples: [
          '40 pupils give 9 degrees per pupil, so 12 pupils give 108°.',
        ],
      },
      {
        h: 'Cumulative frequency (Extended)',
        why: 'A running total shows how many values fall at or below each point, so the median and quartiles can be read from the curve. Plotting against the upper class boundary matches the cumulative count to the right place.',
        paras: [
          'Add the frequencies progressively to get the running total. Plot the upper class boundary against cumulative frequency. The median is at n/2, the lower quartile at n/4 and the upper quartile at 3n/4, where n is the total frequency. The interquartile range is the upper quartile minus the lower quartile.',
        ],
      },
      {
        h: 'Histograms (Extended)',
        why: 'In a histogram the area of each bar represents frequency, so bars of unequal width can be compared fairly. The height is frequency density, which is frequency divided by class width.',
        paras: [
          'In a histogram the area of each bar, not its height, is proportional to the frequency. Frequency density = frequency ÷ class width. Read the scale on the vertical axis, which shows frequency density, not the frequency itself.',
        ],
        formulas: ['frequency density = frequency ÷ class width'],
        examples: [
          'the class 10 to 20 has frequency 12 and width 10. Frequency density = 12 ÷ 10 = 1.2.',
        ],
      },
      {
        h: 'Interpreting data',
        why: 'A trend claim should quote a value from the data, not just say increasing, so the reader can check it. The conclusion should also answer the question that was asked.',
        paras: [
          'When describing a trend, compare with a number from the data, not just “increasing”. Say whether the conclusion is reliable, and what extra data would help. A correlation is not proof of cause.',
        ],
      },
    ],
    exam: [
      'Always state the units and whether a mean is an estimate.',
      'Check the total frequency before dividing.',
      'For a histogram question, read the scale on the vertical axis (frequency density), not the height of the bar.',
    ],
  },
  {
    file: 'igcse-trigonometry-sine-and-cosine-rules',
    eyebrow: 'Cambridge IGCSE Mathematics 0580, Trigonometry',
    title: 'Trigonometry: sine and cosine rules',
    syllabus: 'Cambridge IGCSE Mathematics 0580, Trigonometry: non-right-angled triangles, including obtuse angles and the ambiguous case (Extended).',
    sections: [
      {
        h: 'The sine rule',
        why: 'In any triangle, each side divided by the sine of its opposite angle is the same, which equals the diameter of the circumscribed circle. The rule therefore works for non-right triangles, and it needs a pair of opposite side and angle.',
        paras: [
          'In any triangle with sides a, b, c opposite the angles A, B, C, the ratio of each side to the sine of its opposite angle is the same. Use the rule when you know a side and its opposite angle, plus one more side or angle.',
        ],
        formulas: ['a ÷ sin A = b ÷ sin B = c ÷ sin C'],
        examples: [
          'a = 7 cm, A = 40°, B = 60°. Then b = 7 × sin 60° ÷ sin 40° ≈ 9.43 cm.',
        ],
      },
      {
        h: 'The cosine rule',
        why: 'The cosine rule generalises Pythagoras. The cos term corrects for the angle between the two known sides, so the rule needs the included angle or all three sides.',
        paras: [
          'Use the cosine rule when you know all three sides, or two sides and the included angle. To find an angle, rearrange the formula. For an obtuse angle, cos A is negative, so the angle is greater than 90°.',
        ],
        formulas: ['a² = b² + c² − 2bc cos A', 'cos A = (b² + c² − a²) ÷ (2bc)'],
        examples: [
          'b = 5 cm, c = 7 cm and A = 60°. Then a² = 25 + 49 − 70 × ½ = 39, so a ≈ 6.24 cm.',
        ],
      },
      {
        h: 'Area of a triangle',
        why: 'The height of a triangle is b sin C, so the area is ½ab sin C. This gives the area without needing the perpendicular height.',
        paras: [
          'Area = ½ab sin C, where C is the angle between sides a and b. Use it when you know two sides and the included angle, and the perpendicular height is not given.',
        ],
        formulas: ['area = ½ab sin C'],
        examples: [
          'sides 5 cm and 7 cm with included angle 60°. Area = ½ × 5 × 7 × sin 60° ≈ 15.2 cm².',
        ],
      },
      {
        h: 'The ambiguous case',
        why: 'Since sin θ = sin (180° − θ), the calculator’s acute answer has a second possible angle. The second answer is valid only if the angles still add to less than 180 degrees.',
        paras: [
          'When you use the sine rule to find an angle, there can be two answers, because sin θ = sin (180° − θ). Check whether the second answer fits: the angles of the triangle must add up to less than 180°.',
        ],
        examples: [
          'a = 8, b = 10, A = 40°. Then sin B = 10 × sin 40° ÷ 8 ≈ 0.804, so B ≈ 53.5° or B ≈ 126.5°. Both fit, since 40° + 126.5° < 180°.',
        ],
      },
      {
        h: 'Choosing the rule',
        why: 'Choose the rule from the information given: two angles and a side, or a pair of opposite side and angle, suggests the sine rule; three sides, or two sides and the included angle, suggests the cosine rule.',
        paras: [
          'Two angles and a side: use the sine rule. Two sides and the included angle: use the cosine rule for the third side, then the sine rule or the area formula. Three sides: use the cosine rule to find an angle.',
        ],
      },
    ],
    exam: [
      'Label the triangle before choosing the rule.',
      'Keep full accuracy in the calculator, and round only the final answer.',
      'Check the ambiguous case by testing whether both angles add up to less than 180°.',
    ],
  },
  {
    file: 'igcse-web-technologies',
    eyebrow: 'Cambridge IGCSE Computer Science 0478, Section 5',
    title: 'The internet, the web and digital currency',
    syllabus: 'Cambridge IGCSE Computer Science 0478, Section 5: the internet and the world wide web, and digital currency.',
    sections: [
      {
        h: 'The internet and the web',
        why: 'The internet is the network that carries data between devices, and the World Wide Web is a service that runs on it. Confusing the two is a common error in exam answers.',
        paras: [
          'The internet is the worldwide network of networks that carries data between devices. The World Wide Web is a collection of web pages and resources that are accessed over the internet using a web browser. The web is one service that runs on the internet, alongside email and streaming.',
        ],
      },
      {
        h: 'Addresses and protocols',
        why: 'The URL tells the browser which protocol to use, which server to contact and which page to request. Each part is needed to reach the right resource.',
        paras: [
          'A uniform resource locator (URL) gives the address of a web page, including the protocol, the domain name and the path. The domain name is translated into an IP address by the Domain Name System (DNS).',
          'HTTP is the protocol used to request and send web pages. HTTPS is the secure version, which encrypts the data between the browser and the server, so that anyone intercepting the traffic cannot read it.',
        ],
      },
      {
        h: 'Web pages and browsing',
        why: 'A browser requests a page from a server, then renders the HTML, CSS and scripts it receives. The layers of the page are separate, so each can be changed independently.',
        paras: [
          'HTML defines the structure and content of a web page using tags. CSS defines how the page looks. Keeping structure and style separate makes pages easier to maintain.',
          'A web server stores the pages and responds to requests from clients. The browser on the user’s device is the client. A cookie is a small text file a website stores on the user’s device to remember information, such as login status or preferences.',
        ],
      },
      {
        h: 'Search engines',
        why: 'Web crawlers visit pages and collect their content, and the search engine indexes that content. The index is what makes a search return results quickly.',
        paras: [
          'A search engine uses web crawlers to visit pages and collect information, then indexes the pages so they can be searched quickly. Results are ranked by relevance. The index is updated as pages change.',
        ],
      },
      {
        h: 'Digital currency',
        why: 'A digital currency exists only in electronic form, and a cryptocurrency uses cryptography and a distributed ledger to record transactions. This allows transfers without a central authority.',
        paras: [
          'A digital currency exists only in electronic form. A cryptocurrency is a digital currency secured by cryptography. Transactions are recorded in a blockchain: a distributed ledger in which each block is linked to the previous one by a hash, so changing an earlier record would change every later block.',
          'Advantages: transactions can be fast and can cross borders without many bank fees, and the record is hard to alter. Disadvantages: prices can change very quickly, it can be used for illegal activity, and it may have little legal protection if a wallet is lost or stolen.',
        ],
      },
    ],
    exam: [
      'Distinguish the internet (the network) from the web (the pages and resources).',
      'When asked why HTTPS is used, give the reason: the data is encrypted.',
      'Name both an advantage and a disadvantage when asked to evaluate digital currency.',
    ],
  },
];
