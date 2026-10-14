insert into public.learning_objectives (topic_id, code, statement, teach, sort_order)
values
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'data-representation'), '0478 1.1a', $st$Convert between denary, binary and hexadecimal, and explain why hexadecimal is used for memory addresses.$st$, $teach$### What is being asked
Change a number between bases (denary, binary, hexadecimal) or explain a choice of base. The answer is the converted digits — or the one reason the board accepts.

### Method
1. Denary to binary: subtract the largest place value (128, 64, 32, 16, 8, 4, 2, 1) that fits, write 1, and repeat with the remainder; unwritten places are 0.
2. Binary to denary: add the place values under each 1.
3. Hexadecimal: group binary in fours (a nibble) from the right; each group is one hex digit (10-15 become A-F). Denary to hex: divide by 16, the remainder is the last digit.
4. Why hex for addresses: one hex digit stands for exactly four binary digits, so long addresses get shorter and harder to mistype.

### Worked example
Denary 45 to 8-bit binary. Largest fit: 32 (remainder 13), then 8 (remainder 5), then 4 (remainder 1), then 1 (remainder 0). Bits at 32, 8, 4, 1: 00101101. Check: 32 + 8 + 4 + 1 = 45, and 45 in hex is 2D (16 x 2 = 32, remainder 13 = D).

### Traps
- Reading binary left to right as denary digits: 101 is five, not one hundred and one.
- Dropping leading zeros: an 8-bit answer needs all eight digits (00101101, not 101101).
- Hex letters past F: there is no G in hexadecimal; 16 is written 10.
- Saying hex is "faster for the computer". The CPU stores binary; hex is for humans reading addresses.

### Timing
Paper 1: 2-3 minutes, 2-3 marks. Conversions are usually one mark per correct value, so a dropped nibble costs exactly one mark.$teach$, 1),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'data-representation'), '0478 1.1b', $st$Add two binary numbers and explain overflow when the result needs more bits than are available.$st$, $teach$### What is being asked
Add in binary within a fixed width (often 8 bits) and say whether overflow happened. The answer is the stored bits plus the overflow verdict — both, every time.

### Method
1. Line the numbers up on the right and add column by column: 0 + 0 = 0, 1 + 0 = 1, 1 + 1 = 0 carry 1, 1 + 1 + 1 = 1 carry 1.
2. A carry out of the leftmost column is overflow: the true answer needs one more bit than the register holds.
3. The stored result is the true answer minus that top bit (equivalently, minus 256 in 8 bits).
4. State both: the bits kept and whether overflow occurred.

### Worked example
11110000 + 00010100 in 8 bits. 240 + 20 = 260, which needs 9 bits (100000100), so overflow occurs and 00000100 is stored. Check: 260 - 256 = 4, and 00000100 is denary 4.

### Traps
- Reporting the 9-bit true answer as the stored result. Only 8 bits fit; the 9th is the overflow flag, not stored data.
- Calling any carry an overflow. Carries between columns are normal; only a carry out of the register overflows.
- Forgetting the verdict. A correct sum with no overflow statement scores half marks.
- Adding in denary and converting back without showing binary working. The method marks are for the binary addition.

### Timing
Paper 1: 3-4 minutes, 3-4 marks — working, stored result and verdict. Overflow questions pair with conversion, so check the width first.$teach$, 2),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'data-representation'), '0478 1.1c', $st$Convert between bits, bytes, kilobytes, megabytes, gigabytes and terabytes in storage questions.$st$, $teach$### What is being asked
Compare or convert storage sizes across units. The answer is a converted value or an ordering — always with the ×8 step between bits and bytes made explicit.

### Method
1. Bits to bytes: divide by 8. Bytes to bits: multiply by 8. This step is where most marks are lost.
2. Up the ladder (B, KB, MB, GB, TB): each step is roughly ×1000 in exam questions unless the paper says 1024.
3. For ordering questions, convert everything to the same unit — bytes is safest — then compare.
4. Sanity-check the direction: the number must get smaller going up the ladder (bytes to MB) and bigger going down.

### Worked example
Order smallest to largest: 8000 bits, 2 KB, 1 MB, 900 bytes. 8000 bits = 1000 bytes; 2 KB is about 2000 bytes; 1 MB is about a million bytes. Order: 900 bytes, 8000 bits, 2 KB, 1 MB. Check: each step up is bigger, and the bit value was converted before comparing.

### Traps
- Comparing bits with bytes directly. 8000 of anything sounds big, but 8000 bits is only 1000 bytes.
- Multiplying when you should divide. Bytes are bigger than bits, so bits-to-bytes divides.
- Mixing 1000 and 1024 mid-question. Pick the paper's convention and use it throughout.
- Answering in the wrong unit. Convert, then convert again into the unit asked for.

### Timing
Paper 1: 1-2 minutes, 1-2 marks. These are quick marks — write the ×8 step even when it feels obvious.$teach$, 3),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'data-representation'), '0478 1.2a', $st$Explain how characters are stored with ASCII and Unicode, and compare the two codes.$st$, $teach$### What is being asked
Say how text becomes numbers and back, or judge ASCII against Unicode. The answer names the code, its width, and what that width allows.

### Method
1. A character code assigns every character a number; the computer stores the number in binary.
2. ASCII: 7 or 8 bits per character — enough for English letters, digits and control codes (128 or 256 characters).
3. Unicode: 16+ bits per character — over 65,000 code points, covering the world's scripts, and its first 128 codes match ASCII exactly.
4. Compare on three axes only: range of characters, bits per character (so file size), and compatibility.

### Worked example
Storing "Café" in ASCII fails: ASCII has no é, so it stores as "Caf?" or similar damage; in Unicode each character (including é) has its own code point and survives. Check: the failure is the code's range, not the computer — ASCII's 128 codes simply stop before accented characters.

### Traps
- Saying ASCII uses 8 bits for 256 characters without qualification. Classic ASCII is 7-bit (128); extended ASCII reaches 256.
- Claiming Unicode files are smaller. More characters cost more bits per character.
- Saying Unicode replaced ASCII incompatibly. Unicode deliberately keeps ASCII's first 128 codes, which is why English text survived the changeover.
- Confusing the code with the font. The code picks the number; the font draws the shape.

### Timing
Paper 1: 2-3 minutes, 2-4 marks. Comparison questions want both sides — one mark for ASCII's limit, one for Unicode's cost.$teach$, 4),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'data-representation'), '0478 1.2b', $st$Describe how sound is sampled, and explain how sample rate and resolution change file size and quality.$st$, $teach$### What is being asked
Explain digital sound capture or predict what changing a recording setting does. The answer links each setting to quality AND to file size — one without the other is half marks.

### Method
1. Sampling measures the sound wave's height at regular intervals (the sample rate, e.g. 44,100 per second) and stores each height as a binary number.
2. Sample rate controls accuracy across time: more samples per second follows the wave more closely but stores more numbers.
3. Bit resolution (sample size, e.g. 16-bit) controls accuracy of each measurement: more bits per sample records quieter detail but widens every sample.
4. File size = sample rate × bits per sample × seconds (× channels). Raising either setting raises size and quality together.

### Worked example
A 10-second mono clip at 44,100 samples/sec and 16 bits/sample: 44,100 × 16 × 10 = 7,056,000 bits, ÷ 8 = 882,000 bytes (about 882 KB). Check: units cancel to bytes, and halving the rate would halve this number — the size formula scales linearly in every setting.

### Traps
- Swapping the two settings. Rate is samples per second; resolution is bits per sample. Saying "higher resolution means more samples" loses the mark.
- Claiming better quality with a smaller file. Both settings trade size for quality; there is no free improvement.
- Forgetting channels. Stereo stores two streams — double the mono size.
- Dividing by 8 at the wrong end. Multiply rate × bits × time first (bits), then convert to bytes once.

### Timing
Paper 1: 3-4 minutes, 3-4 marks. Size calculations are one mark per correct substitution, so write the formula with the numbers in.$teach$, 5),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'data-representation'), '0478 1.2c', $st$Describe how bitmap images are stored, and explain how resolution and colour depth change file size and quality.$st$, $teach$### What is being asked
Explain bitmap storage or predict what changing an image setting does. The answer links each setting to quality AND file size, with the size formula shown.

### Method
1. A bitmap stores every pixel in turn: each pixel's colour as a binary number, row by row from the top-left.
2. Resolution (width × height in pixels) controls detail: more pixels capture finer edges but every extra pixel is stored.
3. Colour depth (bits per pixel) controls the palette: 1-bit is two colours, 24-bit is about 16.7 million — deeper colour, wider pixels.
4. File size = pixels × bits per pixel (÷ 8 for bytes). Raising either setting raises size and quality together.

### Worked example
A 100 × 100 image at 24-bit colour: 10,000 pixels × 24 = 240,000 bits, ÷ 8 = 30,000 bytes. Check: 24-bit means 3 bytes per pixel, and 10,000 × 3 = 30,000 — the per-pixel view agrees with the formula.

### Traps
- Swapping resolution and colour depth. Resolution is pixel count; depth is bits per pixel.
- Stopping at bits. File sizes are asked in bytes — the ÷8 is a mark.
- Saying more pixels make colours better. Pixels sharpen edges; only depth widens the palette.
- Forgetting headers/metadata exist. The formula gives the bitmap data; real files add a small header on top.

### Timing
Paper 1: 3-4 minutes, 3-4 marks. Write pixels × depth ÷ 8 with the numbers substituted — examiners award method marks per step.$teach$, 6),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'data-representation'), '0478 1.3a', $st$Calculate the size of text, sound and image files from their storage parameters.$st$, $teach$### What is being asked
Work out a file size from its parameters (characters, sample rate, dimensions). The answer is a size in sensible units with the working that earns method marks.

### Method
1. Text: characters × bits per character (usually 8), then ÷ 8 for bytes.
2. Sound: sample rate × bits per sample × seconds (× 2 for stereo), then ÷ 8.
3. Image: width × height × colour depth, then ÷ 8.
4. Convert once at the end into KB or MB — and state the unit.

### Worked example
500 ASCII characters: 500 × 8 = 4000 bits, ÷ 8 = 500 bytes. Check: one 8-bit character is one byte, so 500 characters should be about half a kilobyte — 500 bytes agrees.

### Traps
- Mixing formulas across media. Characters for text, samples × time for sound, pixels for images — using pixels for a sound file scores nothing.
- Two conversions instead of one. Convert bits to bytes once, at the end.
- Dropping the stereo ×2 or the ÷8. Each is a predictable lost mark — write every factor in the formula line.
- A silly-big or silly-small answer with no check. A 10-second voice note is kilobytes, not gigabytes; check the magnitude.

### Timing
Paper 1: 3-4 minutes, 3-4 marks. One mark per correct substitution is the norm — never give just the answer.$teach$, 7),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'data-representation'), '0478 1.3b', $st$Compare lossy and lossless compression, and explain how run-length encoding reduces file size.$st$, $teach$### What is being asked
Choose or justify a compression type, or trace run-length encoding (RLE). The answer matches the data to the method — exact data gets lossless, tolerant data gets lossy.

### Method
1. Lossless: the file rebuilds bit-for-bit (RLE, dictionary methods). Use for text, programs, legal records — anything where one changed bit matters.
2. Lossy: detail is discarded permanently (JPEG, MP3) for much smaller files. Use for photos, music, video — where ears and eyes tolerate loss.
3. RLE replaces each run of identical values with (count, value): AAAAABBB becomes 5A3B. It wins on data with long runs.
4. Justify by reversibility: if the question needs the original back exactly, lossy is wrong whatever the size saving.

### Worked example
AAAAABBBCCDAA encodes as 5A3B2C1D2A (11 characters from 12 — small win; longer runs win bigger). Check: expand it back — five As, three Bs, two Cs, one D, two As — the original returns exactly, proving lossless.

### Traps
- Recommending lossy for text or programs. A "close enough" program does not run.
- Saying lossless makes files smaller than lossy. Lossless is safer and bigger; the trade is size against fidelity.
- RLE on data with no runs. ABCDEF encodes longer, not shorter — RLE needs repetition to work.
- Forgetting RLE counts are stored too. The count characters are part of the file, which is why short runs barely compress.

### Timing
Paper 1: 2-3 minutes, 2-3 marks. Choice questions want the reason, not just the name — "lossless because the text must be exact".$teach$, 8)
on conflict (topic_id, code) do update set
  statement = excluded.statement,
  teach = excluded.teach,
  sort_order = excluded.sort_order;
delete from public.quizzes
 where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'data-representation') and title = 'Checkpoints — Data Representation';
insert into public.quizzes (id, topic_id, title, description, is_published, exam_type)
values ('00000000-0000-0000-0000-000000000000', (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'data-representation'), 'Checkpoints — Data Representation', $desc$Short checks, one set per objective in this topic. Answer one wrongly and the objective it belongs to is the thing to revisit — not the whole topic.$desc$, true, 'quiz');
insert into public.questions
  (quiz_id, question_text, options, correct_option, explanation, difficulty, sort_order, objective_id, statement_id)
values
('00000000-0000-0000-0000-000000000000', $qt$What is denary 45 in 8-bit binary?$qt$, $opts$["00101100","00101101","10110100","00011101"]$opts$::jsonb, 1, $ex$45 = 32 + 8 + 4 + 1, giving bits at 32, 8, 4 and 1: 00101101. 00101100 is 44 (the 1-bit missing); 10110100 is 180 (read backwards); 00011101 is 29.$ex$, 'check', 101, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'data-representation') and code = '0478 1.1a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Why do programmers write memory addresses in hexadecimal instead of binary?$qt$, $opts$["Hexadecimal numbers calculate faster than binary","Hexadecimal is encrypted so addresses stay secret","CPUs store all data in base 16","One hex digit replaces four binary digits"]$opts$::jsonb, 3, $ex$Each hex digit maps to exactly one nibble, so addresses are shorter and less error-prone to copy. Hex gives no speed, no encryption, and the CPU still stores binary.$ex$, 'check', 102, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'data-representation') and code = '0478 1.1a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Add 1011 + 0110 in 4-bit binary. What is stored, and did overflow occur?$qt$, $opts$["0001 is stored and overflow occurred","10001 is stored with no overflow","0001 is stored with no overflow","1111 is stored and overflow occurred"]$opts$::jsonb, 0, $ex$11 + 6 = 17, which is 10001 in binary — five bits, so in 4 bits only 0001 is stored and overflow occurred. 10001 cannot fit; 0001 without the flag hides the lost bit; 1111 is 15, the wrong sum.$ex$, 'check', 201, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'data-representation') and code = '0478 1.1b'), null),
('00000000-0000-0000-0000-000000000000', $qt$Which addition definitely causes overflow in 8-bit unsigned binary?$qt$, $opts$["01010101 + 00110011","01111111 + 00000001","10000000 + 10000000","00001111 + 00001111"]$opts$::jsonb, 2, $ex$128 + 128 = 256 needs a 9th bit, so it overflows. The others total 136, 128 and 30 — all fit in 8 bits (maximum 255).$ex$, 'check', 202, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'data-representation') and code = '0478 1.1b'), null),
('00000000-0000-0000-0000-000000000000', $qt$How many bits are in 3 bytes?$qt$, $opts$["12","30","24","300"]$opts$::jsonb, 2, $ex$One byte holds 8 bits, so 3 bytes hold 24 bits. 12 halves the rate; 30 and 300 confuse bits with tens.$ex$, 'check', 301, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'data-representation') and code = '0478 1.1c'), null),
('00000000-0000-0000-0000-000000000000', $qt$Which is the largest: 1 MB, 2 KB, 8000 bits or 900 bytes?$qt$, $opts$["1 MB","2 KB","8000 bits","900 bytes"]$opts$::jsonb, 0, $ex$1 MB is about a million bytes — far above 2 KB (about 2000 bytes), 8000 bits (1000 bytes) and 900 bytes. Convert the bits to bytes before comparing.$ex$, 'check', 302, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'data-representation') and code = '0478 1.1c'), null),
('00000000-0000-0000-0000-000000000000', $qt$How many different characters can 8-bit ASCII represent?$qt$, $opts$["128","65536","255","256"]$opts$::jsonb, 3, $ex$8 bits give 2^8 = 256 codes (0-255). 128 is 7-bit ASCII; 65536 is 16-bit Unicode; 255 is the highest code, not the count of codes.$ex$, 'check', 401, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'data-representation') and code = '0478 1.2a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Which statement correctly compares Unicode and ASCII?$qt$, $opts$["Unicode uses fewer bits so text files are smaller","Unicode extends ASCII: the first 128 codes match","ASCII can represent every world language","Unicode and ASCII share no character codes"]$opts$::jsonb, 1, $ex$Unicode keeps ASCII's first 128 code points by design, then adds the world's scripts. ASCII is English-only; Unicode costs more bits per character, not fewer.$ex$, 'check', 402, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'data-representation') and code = '0478 1.2a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Increasing the sample rate of a sound recording does what?$qt$, $opts$["Reduces the file size","Takes more samples each second, so the file grows and quality improves","Adds more bits to each sample","Removes background noise from the recording"]$opts$::jsonb, 1, $ex$Sample rate is samples per second: more of them follows the wave better and stores more data. Bits per sample is the separate resolution setting; noise removal is filtering, not sampling.$ex$, 'check', 501, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'data-representation') and code = '0478 1.2b'), null),
('00000000-0000-0000-0000-000000000000', $qt$A 10-second mono clip uses 44,100 samples/sec and 16 bits/sample. What is its size?$qt$, $opts$["8820 KB","441 KB","882 KB","88 KB"]$opts$::jsonb, 2, $ex$44,100 × 16 × 10 = 7,056,000 bits, ÷ 8 = 882,000 bytes (about 882 KB). 8820 KB skips the ÷8; 441 KB halves the time; 88 KB drops a zero.$ex$, 'check', 502, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'data-representation') and code = '0478 1.2b'), null),
('00000000-0000-0000-0000-000000000000', $qt$What does colour depth control in a bitmap image?$qt$, $opts$["The number of colours each pixel can show","The number of pixels in each row","The physical size of the printed image","The file format the image is saved in"]$opts$::jsonb, 0, $ex$Colour depth is bits per pixel, fixing the palette size (24-bit gives about 16.7 million colours). Pixels per row is resolution; print size depends on dimensions and DPI; the format is the container, not a setting.$ex$, 'check', 601, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'data-representation') and code = '0478 1.2c'), null),
('00000000-0000-0000-0000-000000000000', $qt$A 100 × 100 pixel image uses 24-bit colour. What is its uncompressed bitmap size?$qt$, $opts$["2400 bytes","240 KB","30 000 bits","30 000 bytes"]$opts$::jsonb, 3, $ex$10,000 pixels × 24 bits = 240,000 bits, ÷ 8 = 30,000 bytes. 2400 drops a zero; 240 KB confuses bits with bytes; 30,000 bits forgets the ÷8.$ex$, 'check', 602, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'data-representation') and code = '0478 1.2c'), null),
('00000000-0000-0000-0000-000000000000', $qt$A text file holds 500 characters stored as 8-bit ASCII. What is its size?$qt$, $opts$["500 bits","4000 bits","4000 bytes","500 bytes"]$opts$::jsonb, 3, $ex$500 × 8 = 4000 bits, ÷ 8 = 500 bytes (one byte per character). 4000 bits stops before converting; 4000 bytes skips the ÷8; 500 bits divides instead of multiplying.$ex$, 'check', 701, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'data-representation') and code = '0478 1.3a'), null),
('00000000-0000-0000-0000-000000000000', $qt$A song compresses to about 1 MB per minute. Which estimate is closest for a 3-minute song?$qt$, $opts$["300 KB","3 MB","30 MB","3 GB"]$opts$::jsonb, 1, $ex$3 minutes × 1 MB gives about 3 MB. 300 KB is seconds of audio; 30 MB is uncompressed CD quality; 3 GB is video-scale storage.$ex$, 'check', 702, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'data-representation') and code = '0478 1.3a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Which file should be compressed with a lossless method?$qt$, $opts$["A streaming video preview","A phone photo for social media","A scanned legal contract","Background music for a game"]$opts$::jsonb, 2, $ex$A contract must reproduce exactly — one altered figure changes its meaning. Photos, previews and game music all tolerate discarded detail, which is what lossy is for.$ex$, 'check', 801, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'data-representation') and code = '0478 1.3b'), null),
('00000000-0000-0000-0000-000000000000', $qt$Run-length encoding compresses AAAAABBBCCDAA to what?$qt$, $opts$["5A3B2C1D2A","ABCDA","5A3B2CDA","AAAABBBCCDA"]$opts$::jsonb, 0, $ex$Each run becomes count + value: five As, three Bs, two Cs, one D, two As. ABCDA drops the counts; 5A3B2CDA misses the final run's count; the last option barely compresses at all.$ex$, 'check', 802, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'data-representation') and code = '0478 1.3b'), null),
('00000000-0000-0000-0000-000000000000', $qt$Convert denary 200 into hexadecimal. Show your working.$qt$, $opts$["B8","C8","128","C6"]$opts$::jsonb, 1, $ex$Marks as awarded: 200 ÷ 16 = 12 remainder 8 [1]; digits C and 8 [1]. Answer C8. B8 is 184 (11 × 16 + 8); 128 confuses the denary value with digits; C6 is 198.$ex$, 'exam', 900, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'data-representation') and code = '0478 1.1a'), (select id from public.syllabus_statements where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'data-representation') and code = '1.1')),
('00000000-0000-0000-0000-000000000000', $qt$A 640 × 480 bitmap image uses 16-bit colour. Estimate its uncompressed file size in bytes.$qt$, $opts$["307 200 bytes","4 915 200 bytes","614 400 bytes","614 400 KB"]$opts$::jsonb, 2, $ex$Marks as awarded: 640 × 480 = 307,200 pixels [1]; × 16 = 4,915,200 bits ÷ 8 = 614,400 bytes [1]. Answer 614,400 bytes. The first option counts pixels only; the second forgets ÷8; the last confuses bytes with kilobytes.$ex$, 'exam', 901, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'data-representation') and code = '0478 1.3a'), (select id from public.syllabus_statements where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'computer-science' and sl.level = 'OL' and t.slug = 'data-representation') and code = '1.3'));
