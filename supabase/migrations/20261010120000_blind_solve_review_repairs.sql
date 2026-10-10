-- Blind-solve review repairs (2026-10-10).
--
-- The topic-bank builder's blind-solve pass flagged 15 questions across 8
-- drafts; a human read of each flag found 11 genuinely broken rows live
-- (wrong answer key, correct answer missing from the options, or an
-- unanswerable stem) and 4 cases where the model was wrong and the key
-- stands (MOD even/odd, hex of 1101, NIC, packet header -- untouched here).
-- Each repair is one UPDATE by primary key, so a re-run is a no-op.

-- 1. Car rental: $40 + $0.25 x 120 miles = $70, which was not among the
-- options (the key pointed at $60 with a "closest match" explanation).
-- 80 miles makes $60 the true answer.
update public.questions
set question_text = 'A car rental company has a fleet of cars that can be rented for a day. The cost of renting a car is $40 per day plus an additional $0.25 per mile driven. If a customer rents a car for a day and drives 80 miles, how much will they be charged?',
    explanation = 'The cost is $40 + $0.25 x 80 = $40 + $20 = $60.'
where id = '23e472cc-1f6c-4275-8512-3235b8da147e';

-- 2. Ratio 2:3:5 of $120 is $24, $36, $60 -- none of the options. $100
-- makes option 1 ($20, $30, $50) exactly right.
update public.questions
set question_text = 'A group of friends want to share some money in a ratio of 2:3:5. If the total amount of money is $100, how much will each person get?',
    correct_option = 1,
    explanation = 'The ratio has 2 + 3 + 5 = 10 parts, so each part is $100 / 10 = $10: $20, $30 and $50.'
where id = 'b613906c-01b2-496d-ae95-8e32c0ad70be';

-- 3. Test-data ordering had no canonical answer (every option was a
-- plausible order). Replaced with a boundary-data question that does.
update public.questions
set question_text = 'A program accepts integers from 1 to 100. Which values are boundary test data?',
    options = to_jsonb(array['50 and 60', '0, 1, 100 and 101', '-500 and 9999', 'abc and !!']),
    correct_option = 1,
    explanation = 'Boundary data sits on and just outside the limits 1 and 100: 1 and 100 are the limits themselves, 0 and 101 just outside them. The rest are normal data, extreme abnormal data, or invalid input.'
where id = '2d0b0444-05eb-45ac-a008-ac35c8d1c52e';

-- 4. "What type of compression is used for images?" had two defensible
-- answers (JPEG and Lossy). Narrowed to JPEG so only one option fits.
update public.questions
set question_text = 'JPEG images use which type of compression?',
    options = to_jsonb(array['Lossy', 'Lossless', 'Run-length encoding', 'No compression']),
    correct_option = 0,
    explanation = 'JPEG discards perceptually minor data to shrink the file, which is lossy compression. Lossless keeps every bit (PNG); run-length encoding suits flat graphics, not photos.'
where id = 'b25df1d8-e083-40a6-b980-046eb965f3d4';

-- 5. Two's complement of -3: 3 = 00000011, invert to 11111100, add 1 =
-- 11111101 (option 3), not option 1.
update public.questions
set correct_option = 3,
    explanation = '3 is 00000011 in 8-bit binary. Invert every bit to get 11111100, then add 1: 11111101.'
where id = '7c84ae5d-0e5e-49b5-9872-f5e948263167';

-- 6. RLE of 'AAAAABBBB' is five As then four Bs = 5A4B (option 3),
-- not 5A3B.
update public.questions
set correct_option = 3,
    explanation = 'Run-length encoding writes the count followed by the character: five As then four Bs gives 5A4B.'
where id = 'a3a6aa64-e408-43d6-ad3f-4cfb87fd07de';

-- 7. 800 x 600 x 24 bits = 11,520,000 bits / 8 = 1,440,000 bytes, about
-- 1.4 MB (option 1), not 1.8 MB.
update public.questions
set correct_option = 1,
    explanation = '800 x 600 x 24 = 11,520,000 bits. Divide by 8 to get 1,440,000 bytes, which is about 1.4 MB.'
where id = 'f6c15212-67ae-4483-bc64-b0b50b2321d5';

-- 8. The truth-table stem pointed at tables ("See table 1") that do not
-- exist in the question. Replaced with concrete inputs, same key slot.
update public.questions
set question_text = 'X = (A OR B) AND C. For which inputs is the output X = 1?',
    options = to_jsonb(array['A=0, B=0, C=1', 'A=1, B=0, C=1', 'A=1, B=1, C=0', 'A=0, B=1, C=0']),
    correct_option = 1,
    explanation = 'Only option 1 works: (1 OR 0) = 1, then 1 AND 1 = 1. The others fail because C = 0, or because A and B are both 0.'
where id = '28a9fd94-a103-4c31-be64-34cb2af70dcc';

-- 9. "Move programs in and out of memory" also described option 0
-- (virtual memory). Named paging explicitly so one option fits.
update public.questions
set question_text = 'A computer is running low on memory. Which memory-management technique moves pages between RAM and disk?',
    options = to_jsonb(array['Spooling print jobs to disk', 'Paging and segmentation', 'Multitasking with a scheduler and time slices', 'Context switching with a single CPU']),
    correct_option = 1,
    explanation = 'Paging moves fixed-size pages between RAM and disk (virtual memory), freeing RAM. Spooling queues print jobs; scheduling and context switching share CPU time, not memory.'
where id = '72112315-6815-48f8-a80f-f07f8eb8f7f2';

-- 10. Option 2 ("changes its text property") muddied the DOM question --
-- no such property exists on elements, but it reads like the precise
-- answer next to innerHTML. Replaced with a clearly wrong option.
update public.questions
set options = to_jsonb(array['JavaScript uses the DOM to change the text of the element, then parses HTML', 'JavaScript uses the DOM to parse HTML, then changes the text of the element', 'JavaScript edits the saved HTML file and reloads the page', 'JavaScript uses the DOM to find the element, then changes its innerHTML property']),
    correct_option = 3,
    explanation = 'JavaScript finds the element through the DOM and sets its content (innerHTML). It does not rewrite the HTML file, and parsing happens before any change.'
where id = '8257d79a-c882-44b2-bf93-74341768afec';

-- 11. The strong tag marks importance (semantic emphasis); bold is how
-- browsers render it. The key pointed at the rendering, not the purpose.
update public.questions
set correct_option = 0,
    explanation = 'The strong tag marks text as important -- semantic emphasis. Browsers render that as bold by default, but bold is the appearance, not the purpose.'
where id = '26cccdd1-f368-4aac-9750-45f91bbbb752';
