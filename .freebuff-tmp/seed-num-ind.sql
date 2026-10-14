insert into public.learning_objectives (topic_id, code, statement, teach, sort_order)
values
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-indices-and-standard-form'), '0580 1.3a', $st$Evaluate powers and roots of numbers, and estimate square roots between integers.$st$, $teach$### What is being asked
Compute a power or trap a root between whole numbers. The answer is exact for perfect powers, bracketed for the rest.

### Method
1. Powers multiply out: \(7^3 = 343\). Roots invert: \(\sqrt{81} = 9\), \(\sqrt[3]{125} = 5\).
2. Non-exact roots sit between consecutive integers: \(49 < 50 < 64\) forces \(7 < \sqrt{50} < 8\).
3. Estimate first (\(29^2 \approx 30^2 = 900\)), compute second — the estimate polices the exact answer.
4. Check perfect powers by rebuilding: \(9^2 = 81\) confirms \(\sqrt{81} = 9\).

### Worked example
\(\sqrt{50}\) lies between which integers? 50 falls between \(7^2 = 49\) and \(8^2 = 64\), so \(7 < \sqrt{50} < 8\). Check: \(7.07^2 \approx 50\) — inside the bracket, as required.

### Traps
- Powers as multiplication. \(7^3 = 343\), not \(7 \times 3 = 21\) — the base repeats, the power counts.
- Roots of sums split up. \(\sqrt{49 + 16} = \sqrt{65}\), not 7 + 4 — combine first, root last.
- Estimation abandoned. An "estimate 881" for \(29^2\) is computation, not estimation — round the base first.
- Brackets reversed. \(\sqrt{50}\) is between 7 and 8, never "between 8 and 7" — smaller first.

### Timing
Short answers: 1-2 minutes each. Neighbouring squares (49, 64, 81, 100) place every root instantly.$teach$, 1),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-indices-and-standard-form'), '0580 1.7a', $st$Apply the index laws for multiplication, division and brackets with number bases.$st$, $teach$### What is being asked
Combine powers of the same base. The answer changes the powers, never the base — add, subtract, or multiply them as the law demands.

### Method
1. Multiply: add powers — \(3^4 \times 3^2 = 3^6\).
2. Divide: subtract powers — \(5^7 \div 5^3 = 5^4\).
3. Brackets: multiply powers — \((2^3)^2 = 2^6\).
4. Same base required: \(3^4 \times 2^2\) cannot combine — different bases never merge.

### Worked example
\((2^3)^2 \div 2^4\): brackets give \(2^6\), division gives \(2^{6-4} = 2^2 = 4\). Check by expansion: \(8^2 = 64\), \(64 \div 16 = 4\) — the laws agree with the arithmetic.

### Traps
- Multiplying powers when multiplying terms. \(3^4 \times 3^2 = 3^6\), not \(3^8\) — multiply means add.
- Merging different bases. \(9^6\) from \(3^4 \times 3^2\) multiplies bases that were already shared — the base stays 3.
- Brackets distributed as addition. \((2^3)^2\) multiplies (\(2^6\)), never adds (\(2^5\)).
- Laws applied across + and −. \(3^4 + 3^2\) cannot combine — laws govern multiplication and division only.

### Timing
Short answers: 1-2 minutes each. Name the law before applying it — multiply-add, divide-subtract, bracket-multiply.$teach$, 2),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-indices-and-standard-form'), '0580 1.7b', $st$Evaluate zero, negative and fractional indices, including reciprocals and roots.$st$, $teach$### What is being asked
Interpret unusual powers. The answer translates each one: zero means 1, negative means flip, fraction means root.

### Method
1. Anything to power 0 is 1: \(7^0 = 1\).
2. Negative flips into a reciprocal: \(5^{-2} = \frac{1}{5^2} = \frac{1}{25}\).
3. Unit fractions root: \(27^{\frac{1}{3}} = \sqrt[3]{27} = 3\); \(16^{\frac{1}{2}} = 4\).
4. Combined \(8^{\frac{2}{3}}\): root first (\(\sqrt[3]{8} = 2\)), then power (\(2^2 = 4\)) — root-then-power stays small.

### Worked example
\(27^{\frac{1}{3}}\): the denominator 3 means cube root, and \(3^3 = 27\), so the value is 3. Check: \(3^3\) rebuilds 27 — the root inverts the power exactly.

### Traps
- Negative as negation. \(5^{-2} = \frac{1}{25}\), not −25 — the minus flips, it never negates.
- Fractional as division. \(27^{\frac{1}{3}} = 3\), not \(27 \div 3 = 9\) — fractions root, they never divide.
- Powering before rooting. \(8^{\frac{2}{3}}\) via \(8^2 = 64\) then cube-rooting works but balloons — root first.
- Zero power as zero. \(7^0 = 1\) always (for non-zero bases) — the commonest one-mark slip.

### Timing
Short answers: 1-2 minutes each. Translate first (flip? root?), compute second — never both at once.$teach$, 3),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-indices-and-standard-form'), '0580 1.8a', $st$Convert between ordinary numbers and standard form, and order numbers in standard form.$st$, $teach$### What is being asked
Write \(a \times 10^n\) with \(1 \le a < 10\) or compare such numbers. The answer fixes the mantissa first — the power follows the decimal's journey.

### Method
1. Mantissa between 1 and 10: 0.00042 becomes 4.2, and the point travelled 4 places left, so \(4.2 \times 10^{-4}\).
2. Small numbers take negative powers; large numbers take positive ones.
3. Ordering: compare powers first (\(10^6\) beats any \(10^5\)), mantissas only break ties.
4. Check: expanding your answer must rebuild the original — count the places twice.

### Worked example
0.00042 in standard form: mantissa 4.2, point moved 4 places (smaller number, negative power): \(4.2 \times 10^{-4}\). Check: \(4.2 \times 10^{-4} = 0.00042\) — the digits and the place value both return.

### Traps
- Mantissa outside [1, 10). \(42 \times 10^{-5}\) and \(0.42 \times 10^{-3}\) are not standard form, however correct the value.
- Sign of the power flipped. Small is negative, large is positive — 0.00042 needs \(10^{-4}\), not \(10^4\).
- Ordering by mantissa. \(2.9 \times 10^6\) dwarfs \(4 \times 10^5\) — powers decide before mantissas speak.
- Miscounted places. The exponent counts the point's whole journey — recount it rather than trusting the first count.

### Timing
Short answers: 1-2 minutes each. Mantissa-range check first, power-direction second, place-count third.$teach$, 4),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-indices-and-standard-form'), '0580 1.8b', $st$Multiply and divide numbers in standard form, giving answers in standard form.$st$, $teach$### What is being asked
Combine standard-form numbers without a calculator's full help. The answer splits the work: mantissas together, powers together, then repair.

### Method
1. Multiply/divide the mantissas normally: \(4 \times 2 = 8\), \(9 \div 3 = 3\).
2. Add powers when multiplying, subtract when dividing: \(10^5 \times 10^{-3} = 10^2\).
3. Repair the mantissa into [1, 10): \(24 \times 10^3\) becomes \(2.4 \times 10^4\).
4. Check by rough ordinary values — the magnitude must match a quick estimate.

### Worked example
\((4 \times 10^5) \times (2 \times 10^{-3})\): mantissas give 8, powers give \(10^{5 + (-3)} = 10^2\), so \(8 \times 10^2\). Check: roughly \(400{,}000 \times 0.002 = 800\) — and \(8 \times 10^2 = 800\) agrees.

### Traps
- Adding mantissas. 4 × 2 = 8, never 6 — mantissas multiply and divide like ordinary numbers.
- Powers combined backwards. Multiply adds, divide subtracts — swapped operations corrupt the magnitude by powers of ten.
- Unrepaired mantissas. \(24 \times 10^3\) is unfinished — shift to \(2.4 \times 10^4\) for the final mark.
- Signs in power arithmetic. \(5 + (-3) = 2\), not 8 — negative powers add like any integers.

### Timing
Short answers: 2-3 minutes, 2 marks. Mantissa line and power line separately — then the repair check.$teach$, 5),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-indices-and-standard-form'), '0580 1.18a', $st$Simplify surds and rationalise denominators (Extended only).$st$, $teach$### What is being asked
Tidy roots into simplest surd form or clear them from denominators. The answer hunts square factors — the biggest one wins. (Extended only.)

### Method
1. Split out the largest square factor: \(\sqrt{50} = \sqrt{25 \times 2} = 5\sqrt{2}\).
2. Rationalise by multiplying top and bottom by the surd: \(\frac{6}{\sqrt{3}} = \frac{6\sqrt{3}}{3} = 2\sqrt{3}\).
3. Simplify the resulting fraction fully — rationalising often leaves a cancelling step.
4. Check by squaring back: \((5\sqrt{2})^2 = 25 \times 2 = 50\) rebuilds the original.

### Worked example
\(\frac{6}{\sqrt{3}}\): multiply by \(\frac{\sqrt{3}}{\sqrt{3}}\) to get \(\frac{6\sqrt{3}}{3}\), which cancels to \(2\sqrt{3}\). Check: \((2\sqrt{3})^2 = 4 \times 3 = 12\), and \((\frac{6}{\sqrt{3}})^2 = \frac{36}{3} = 12\) — both routes agree.

### Traps
- Smallest square factor. \(\sqrt{50} = \sqrt{4 \times 12.5}\) goes nowhere — the LARGEST square (25) finishes in one step.
- Rationalising without cancelling. \(\frac{6\sqrt{3}}{3}\) is half-done — divide to \(2\sqrt{3}\).
- Adding under one root wrongly. \(\sqrt{2} + \sqrt{3}\) cannot merge — only multiplied surds combine (\(\sqrt{2} \times \sqrt{3} = \sqrt{6}\)).
- Decimal answers. Surd questions demand exact form — 7.07 for \(5\sqrt{2}\) scores nothing. (Extended only.)

### Timing
Short answers: 2-3 minutes, 2-3 marks. Square-factor hunt first, cancel last, square-back always.$teach$, 6),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-indices-and-standard-form'), '0580 2.4a', $st$Simplify algebraic expressions using the index laws, and solve simple exponential equations.$st$, $teach$### What is being asked
Apply index laws to letters, or find the power that hits a target. The answer treats \(x\) exactly like 3 — laws never check the base.

### Method
1. Same laws, letter bases: \(x^5 \div x^2 \times x = x^{5-2+1} = x^4\) (bare \(x\) means \(x^1\)).
2. Brackets multiply: \((x^2)^3 = x^6\).
3. Exponential equations: express both sides with one base (\(32 = 2^5\)), then equate powers: \(2^x = 32\) gives \(x = 5\).
4. Check by substitution — powers rebuild fast enough to verify every answer.

### Worked example
\(x^5 \div x^2 \times x\): subtract then add, \(x^{5-2+1} = x^4\). Check with \(x = 2\): \(32 \div 4 \times 2 = 16\), and \(2^4 = 16\) — the numeric trial confirms the law work.

### Traps
- Bare letters ignored. The lone \(x\) carries power 1 — dropping it turns \(x^4\) into \(x^3\).
- Coefficients merged with powers. \(3x^2 \times 2x^3 = 6x^5\) — numbers multiply separately from powers.
- Addition under index laws. \(x^2 + x^3\) never combines — laws serve multiplication and division only.
- Equating bases instead of powers. \(2^x = 32\) needs 32 as \(2^5\) first — compare powers, not bases.

### Timing
Short answers: 2 minutes, 2 marks. One law per step, substitution check to close.$teach$, 7)
on conflict (topic_id, code) do update set
  statement = excluded.statement,
  teach = excluded.teach,
  sort_order = excluded.sort_order;
delete from public.quizzes
 where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-indices-and-standard-form') and title = 'Checkpoints — Indices & Standard Form';
insert into public.quizzes (id, topic_id, title, description, is_published, exam_type)
values ('00000000-0000-0000-0000-000000000000', (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-indices-and-standard-form'), 'Checkpoints — Indices & Standard Form', $desc$Short checks, one set per objective in this topic. Answer one wrongly and the objective it belongs to is the thing to revisit — not the whole topic.$desc$, true, 'quiz');
insert into public.questions
  (quiz_id, question_text, options, correct_option, explanation, difficulty, sort_order, objective_id, statement_id)
values
('00000000-0000-0000-0000-000000000000', $qt$Estimate \(29^2\) without a calculator.$qt$, $opts$["900","60","881","90"]$opts$::jsonb, 0, $ex$\(30^2 = 900\) estimates it. 60 multiplies by 2; 881 computes exactly (not an estimate); 90 drops a zero.$ex$, 'check', 101, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-indices-and-standard-form') and code = '0580 1.3a'), null),
('00000000-0000-0000-0000-000000000000', $qt$\(\sqrt{50}\) lies between which consecutive integers?$qt$, $opts$["6 and 7","5 and 6","7 and 8","8 and 9"]$opts$::jsonb, 2, $ex$\(49 < 50 < 64\), so \(7 < \sqrt{50} < 8\). The other pairs bracket different numbers entirely.$ex$, 'check', 102, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-indices-and-standard-form') and code = '0580 1.3a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Simplify \(3^4 \times 3^2\).$qt$, $opts$["\\(3^8\\)","\\(3^6\\)","\\(3^2\\)","\\(9^6\\)"]$opts$::jsonb, 1, $ex$Multiply means add powers: \(3^6\). \(3^8\) multiplies the powers; \(3^2\) subtracts; \(9^6\) wrongly merges the bases.$ex$, 'check', 201, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-indices-and-standard-form') and code = '0580 1.7a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Evaluate \((2^3)^2 \div 2^4\).$qt$, $opts$["\\(2^9\\)","\\(2^5\\)","2","4"]$opts$::jsonb, 3, $ex$Brackets: \(2^6\). Division: \(2^{6-4} = 2^2 = 4\). \(2^9\) adds every power; \(2^5\) adds the bracket; 2 over-subtracts.$ex$, 'check', 202, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-indices-and-standard-form') and code = '0580 1.7a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Evaluate \(5^{-2}\).$qt$, $opts$["-25","-10","\\(\\frac{1}{25}\\)","25"]$opts$::jsonb, 2, $ex$Negative flips: \(\frac{1}{5^2} = \frac{1}{25}\). Negations (-25, -10) confuse flipping with sign; 25 ignores the minus entirely.$ex$, 'check', 301, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-indices-and-standard-form') and code = '0580 1.7b'), null),
('00000000-0000-0000-0000-000000000000', $qt$Evaluate \(27^{\frac{1}{3}}\).$qt$, $opts$["3","9","\\(\\frac{1}{27}\\)","81"]$opts$::jsonb, 0, $ex$Denominator 3 means cube root, and \(3^3 = 27\). 9 divides by 3; \(\frac{1}{27}\) inverts wrongly; 81 multiplies by 3.$ex$, 'check', 302, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-indices-and-standard-form') and code = '0580 1.7b'), null),
('00000000-0000-0000-0000-000000000000', $qt$Write 0.00042 in standard form.$qt$, $opts$["\\(42 \\times 10^{-5}\\)","\\(0.42 \\times 10^{-3}\\)","\\(4.2 \\times 10^{3}\\)","\\(4.2 \\times 10^{-4}\\)"]$opts$::jsonb, 3, $ex$Mantissa 4.2 with 4 places left: \(4.2 \times 10^{-4}\). The first two break the mantissa rule; the third flips the power's sign.$ex$, 'check', 401, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-indices-and-standard-form') and code = '0580 1.8a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Which is largest: \(3.1 \times 10^{5}\), \(2.9 \times 10^{6}\), \(4 \times 10^{5}\)?$qt$, $opts$["\\(3.1 \\times 10^{5}\\)","\\(2.9 \\times 10^{6}\\)","\\(4 \\times 10^{5}\\)","They are equal"]$opts$::jsonb, 1, $ex$\(10^6\) outranks every \(10^5\) regardless of mantissa. Among the \(10^5\) pair, 4 beats 3.1 — but neither touches millions.$ex$, 'check', 402, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-indices-and-standard-form') and code = '0580 1.8a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Evaluate \((4 \times 10^5) \times (2 \times 10^{-3})\).$qt$, $opts$["\\(8 \\times 10^{8}\\)","\\(8 \\times 10^{2}\\)","\\(6 \\times 10^{2}\\)","\\(8 \\times 10^{-8}\\)"]$opts$::jsonb, 1, $ex$Mantissas: 8. Powers: \(10^{5-3} = 10^2\). \(10^8\) adds wrongly; 6 adds mantissas; \(10^{-8}\) subtracts where it should add.$ex$, 'check', 501, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-indices-and-standard-form') and code = '0580 1.8b'), null),
('00000000-0000-0000-0000-000000000000', $qt$Evaluate \((9 \times 10^7) \div (3 \times 10^4)\).$qt$, $opts$["\\(3 \\times 10^{11}\\)","\\(6 \\times 10^{3}\\)","\\(3 \\times 10^{3}\\)","\\(3 \\times 10^{2}\\)"]$opts$::jsonb, 2, $ex$Mantissas: 3. Powers: \(10^{7-4} = 10^3\). \(10^{11}\) adds instead of subtracting; 6 adds mantissas; \(10^2\) over-subtracts.$ex$, 'check', 502, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-indices-and-standard-form') and code = '0580 1.8b'), null),
('00000000-0000-0000-0000-000000000000', $qt$Simplify \(\sqrt{50}\).$qt$, $opts$["\\(5\\sqrt{2}\\)","\\(25\\sqrt{2}\\)","\\(10\\sqrt{2}\\)","Leave it — it is already simplest"]$opts$::jsonb, 0, $ex$\(50 = 25 \times 2\), so \(5\sqrt{2}\). \(25\sqrt{2}\) squares the 5 back in wrongly; \(10\sqrt{2} = \sqrt{200}\); 25 is a square factor, so it simplifies.$ex$, 'check', 601, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-indices-and-standard-form') and code = '0580 1.18a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Rationalise the denominator of \(\frac{6}{\sqrt{3}}\).$qt$, $opts$["\\(6\\sqrt{3}\\)","\\(\\sqrt{18}\\)","\\(2\\sqrt{18}\\)","\\(2\\sqrt{3}\\)"]$opts$::jsonb, 3, $ex$Multiply by \(\frac{\sqrt{3}}{\sqrt{3}}\): \(\frac{6\sqrt{3}}{3} = 2\sqrt{3}\). \(6\sqrt{3}\) skips the division; the middle options mis-simplify.$ex$, 'check', 602, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-indices-and-standard-form') and code = '0580 1.18a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Simplify \(x^5 \div x^2 \times x\).$qt$, $opts$["\\(x^{10}\\)","\\(x^7\\)","\\(x^4\\)","\\(x^3\\)"]$opts$::jsonb, 2, $ex$\(5 - 2 + 1 = 4\). \(x^{10}\) multiplies powers; \(x^7\) adds all three; \(x^3\) drops the final \(x^1\).$ex$, 'check', 701, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-indices-and-standard-form') and code = '0580 2.4a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Solve \(2^x = 32\).$qt$, $opts$["\\(x = 4\\)","\\(x = 5\\)","\\(x = 16\\)","\\(x = 6\\)"]$opts$::jsonb, 1, $ex$\(32 = 2^5\), so \(x = 5\). 4 gives 16; 16 inverts the equation; 6 gives 64.$ex$, 'check', 702, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-indices-and-standard-form') and code = '0580 2.4a'), null),
('00000000-0000-0000-0000-000000000000', $qt$A drive holds \(2.5 \times 10^{11}\) bytes. How many \(5 \times 10^9\)-byte files fit on it?$qt$, $opts$["5","50","500","0.5"]$opts$::jsonb, 1, $ex$Marks as awarded: mantissas \(2.5 \div 5 = 0.5\) with powers \(10^{11-9} = 10^2\) [1]; \(0.5 \times 10^2 = 50\) [1]. 5 mis-combines powers; 500 multiplies; 0.5 forgets the powers.$ex$, 'exam', 900, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-indices-and-standard-form') and code = '0580 1.8b'), (select id from public.syllabus_statements where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-indices-and-standard-form') and code = '1.8')),
('00000000-0000-0000-0000-000000000000', $qt$Write \((\sqrt{3} + 1)(\sqrt{3} - 1)\) in its simplest exact form.$qt$, $opts$["\\(2\\sqrt{3}\\)","4","2","\\(\\sqrt{8}\\)"]$opts$::jsonb, 2, $ex$Marks as awarded: difference of two squares recognised [1]; \(3 - 1 = 2\) [1]. \(2\sqrt{3}\) adds instead; 4 adds the squares; \(\sqrt{8}\) mis-combines.$ex$, 'exam', 901, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-indices-and-standard-form') and code = '0580 1.18a'), (select id from public.syllabus_statements where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-indices-and-standard-form') and code = '1.18'));
