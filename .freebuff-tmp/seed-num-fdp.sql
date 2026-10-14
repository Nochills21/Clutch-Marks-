insert into public.learning_objectives (topic_id, code, statement, teach, sort_order)
values
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-fractions-decimals-and-percentages'), '0580 1.4a', $st$Convert between fractions, decimals and percentages, including recurring decimals.$st$, $teach$### What is being asked
Change a value's form without changing its size. The answer is exact — recurring digits need fraction form, never chopped decimals.

### Method
1. Fraction to decimal: divide (\(\frac{5}{6} = 0.8\dot{3}\)).
2. Decimal to percentage: multiply by 100 (0.35 = 35%).
3. Recurring to fraction: one recurring digit means ninths (\(0.\dot{3} = \frac{1}{3}\)); two recurring digits means ninety-ninths (\(0.\dot{2}\dot{3} = \frac{23}{99}\)).
4. Check by converting back — the round trip must return the start exactly.

### Worked example
\(0.\dot{2}\dot{3}\) to a fraction: two digits recur, so \(\frac{23}{99}\). Check: \(23 \div 99 = 0.2323...\) — the cycle matches, and \(\frac{23}{99}\) cannot simplify further.

### Traps
- Chopping recurrers. 0.333 is not \(\frac{1}{3}\) — only the fraction (or the dot) is exact.
- Ninths versus ninety-ninths. One recurring digit divides by 9; two divide by 99 — count the cycle length first.
- Percentage as decimal directly. 35% is 0.35, not 3.5 or 0.035 — the two-place shift is the whole conversion.
- Simplifying skipped. \(\frac{23}{99}\) is finished, but \(\frac{18}{48}\) must fall to \(\frac{3}{8}\) — always cancel fully.

### Timing
Short answers: 1-2 minutes each. Cycle length first, conversion second, round trip always.$teach$, 1),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-fractions-decimals-and-percentages'), '0580 1.4b', $st$Calculate fractions of quantities, and express one quantity as a fraction of another.$st$, $teach$### What is being asked
Take a share or write a comparison as a fraction. The answer divides by the bottom, multiplies by the top — and simplifies comparisons fully.

### Method
1. Fraction OF a quantity: divide by the denominator, multiply by the numerator: \(\frac{3}{5}\) of 240 = \(240 \div 5 \times 3 = 144\).
2. One quantity AS a fraction of another: part over whole, then cancel: 18 of 48 = \(\frac{18}{48} = \frac{3}{8}\).
3. Units must match before comparing (cm with cm, never cm with m).
4. Check: a proper fraction of a quantity is smaller than the whole; unsimplified answers are unfinished.

### Worked example
\(\frac{3}{5}\) of 240 kg: \(240 \div 5 = 48\), \(48 \times 3 = 144\) kg. Check: \(\frac{3}{5}\) is over half, and 144 sits just over half of 240 — proportion and answer agree.

### Traps
- Multiplying by the fraction's face value. \(\frac{3}{5}\) of 240 is not \(240 \times 35\) — divide then multiply, in that order.
- Part and whole swapped. 18 as a fraction of 48 is \(\frac{18}{48}\), not \(\frac{48}{18}\) — the "of" quantity goes underneath.
- Stopping at \(\frac{18}{48}\). Comparison fractions must cancel to lowest terms — divide by 6 to reach \(\frac{3}{8}\).
- Mixed units unconverted. 30 cm of 2 m needs 200 cm first — compare like with like.

### Timing
Short answers: 2 minutes, 2 marks. Divide-then-multiply is the method line; simplification is the second mark.$teach$, 2),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-fractions-decimals-and-percentages'), '0580 1.13a', $st$Calculate percentage increases and decreases, including reverse percentages.$st$, $teach$### What is being asked
Move a price or amount by a percentage — forwards or backwards. The answer multiplies by \(1 \pm\) rate; reversing divides by it.

### Method
1. Increase by 15%: multiply by 1.15 (240 → 276). Decrease by 30%: multiply by 0.70.
2. Never add the percentage itself: +15% of 240 is ×1.15, not +15.
3. Reverse: a £64 sale price after 20% off means 64 = 0.80 × original, so original = \(64 \div 0.8 = 80\).
4. Check direction: increases exceed the start, decreases fall short, reverses exceed the given price.

### Worked example
£64 after 20% off: original = \(64 \div 0.80 = 80\). Check: 20% of £80 is £16, and \(80 - 16 = 64\) — the forward trip rebuilds the given price exactly.

### Traps
- Adding/subtracting the rate number. 15% of 240 is 36, not 15 — percentages scale, they never add flat.
- Reversing by the same operation. Undoing −20% needs ÷0.8, not +20% (\(64 \times 1.2 = 76.80\), wrong).
- Multiplier slips: decrease by 30% is ×0.70, not ×0.30 (that keeps 30%, losing 70%).
- Percentage points versus percent. A rise from 20% to 25% is +5 points but +25% relatively — read which the question means.

### Timing
Short answers: 2 minutes, 2 marks. The multiplier line (×1.15, ÷0.8) is the method mark — write it.$teach$, 3),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-fractions-decimals-and-percentages'), '0580 1.13b', $st$Solve simple and compound interest problems, distinguishing the two methods.$st$, $teach$### What is being asked
Grow money over time. The answer picks flat growth (simple) or growth-on-growth (compound) — the question's wording decides, never habit.

### Method
1. Simple: interest = \(P \times r \times t\) yearly on the ORIGINAL principal only (£2000 at 4% for 3 years → £240 interest).
2. Compound: multiply by \((1+r)^t\) — each year's interest joins the principal (£2000 × 1.04³ = £2249.73 total).
3. Keyword test: "simple" (or "per year on the original") versus "compound" (or "added yearly", "total amount").
4. Check: compound always exceeds simple for the same rate and time — if it doesn't, the methods were swapped.

### Worked example
£2000 at 4% compound for 3 years: \(2000 \times 1.04^3 = 2249.73\). Check against simple (\(2000 + 240 = 2240\)): compound stands £9.73 higher — growth-on-growth verified in the right direction.

### Traps
- Simple formula for compound questions. \(P(1 + rt)\) understates every compound answer — read the interest type first.
- Quoting interest as the total. £240 is the interest; £2240 is the amount — answer the asked one.
- Rate as whole number. 4% is 0.04 in every formula — 4 compounds into fantasy billions.
- Yearly steps skipped. Compound applies per period: 3 years means cubing, not tripling the rate.

### Timing
Short answers: 2-3 minutes, 2-3 marks. The power \((1.04^3)\) versus the product (0.04×3) is the discriminating line.$teach$, 4),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-fractions-decimals-and-percentages'), '0580 1.17a', $st$Solve exponential growth and decay problems (Extended only), including half-life.$st$, $teach$### What is being asked
Project repeated proportional change. The answer multiplies by the growth (or decay) factor once per period — powers count the periods. (Extended only.)

### Method
1. Find the per-period factor: doubling means ×2; 15% depreciation means ×0.85; half-life means ×0.5.
2. Raise to the number of periods: 4 doublings from 5 is \(5 \times 2^4 = 80\).
3. Half-life chains halve repeatedly: 120 g over 3 half-lives → 60 → 30 → 15 g.
4. Check the direction and scale: growth explodes (factors above 1 compound fast); decay never quite reaches zero.

### Worked example
120 g with a 3-year half-life, after 9 years: 9 ÷ 3 = 3 halvings, so \(120 \div 2^3 = 15\) g. Check: 120 → 60 → 30 → 15 — three visible halvings, each exactly half the last.

### Traps
- Linear instead of exponential. Adding a fixed amount per period answers a different (and wrong) question — proportional change compounds.
- Periods miscounted. 9 years at 3-year half-life is 3 periods, not 9 — divide time by period first.
- Growth factor as the rate. 15% depreciation multiplies by 0.85, not 0.15 — the survivor fraction, not the loss.
- Decay to exactly zero. Halving never reaches zero in finite steps — 15 g remains, not 0. (Extended only.)

### Timing
Structured: 3 minutes, 3 marks. Factor line, power line, arithmetic — one mark each.$teach$, 5)
on conflict (topic_id, code) do update set
  statement = excluded.statement,
  teach = excluded.teach,
  sort_order = excluded.sort_order;
delete from public.quizzes
 where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-fractions-decimals-and-percentages') and title = 'Checkpoints — Fractions, Decimals & Percentages';
insert into public.quizzes (id, topic_id, title, description, is_published, exam_type)
values ('00000000-0000-0000-0000-000000000000', (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-fractions-decimals-and-percentages'), 'Checkpoints — Fractions, Decimals & Percentages', $desc$Short checks, one set per objective in this topic. Answer one wrongly and the objective it belongs to is the thing to revisit — not the whole topic.$desc$, true, 'quiz');
insert into public.questions
  (quiz_id, question_text, options, correct_option, explanation, difficulty, sort_order, objective_id, statement_id)
values
('00000000-0000-0000-0000-000000000000', $qt$Write \(0.\dot{2}\dot{3}\) as a fraction in lowest terms.$qt$, $opts$["\\(\\frac{23}{10}\\)","\\(\\frac{2}{3}\\)","\\(\\frac{23}{99}\\)","\\(\\frac{23}{9}\\)"]$opts$::jsonb, 2, $ex$Two recurring digits divide by 99: \(\frac{23}{99}\). Tenths terminate; \(\frac{2}{3} = 0.\dot{6}\); ninths suit one recurring digit.$ex$, 'check', 101, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-fractions-decimals-and-percentages') and code = '0580 1.4a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Write \(\frac{5}{6}\) as a decimal.$qt$, $opts$["\\(0.8\\dot{3}\\)","0.83","\\(0.\\dot{8}3\\)","0.56"]$opts$::jsonb, 0, $ex$\(5 \div 6 = 0.8333...\) — only the 3 recurs. 0.83 terminates (\(\frac{83}{100}\)); the dot must sit on the recurring digit alone.$ex$, 'check', 102, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-fractions-decimals-and-percentages') and code = '0580 1.4a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Find \(\frac{3}{5}\) of 240.$qt$, $opts$["120","144","148","400"]$opts$::jsonb, 1, $ex$\(240 \div 5 \times 3 = 144\). 120 is \(\frac{1}{2}\); 148 mis-adds; 400 multiplies by 5 instead of dividing.$ex$, 'check', 201, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-fractions-decimals-and-percentages') and code = '0580 1.4b'), null),
('00000000-0000-0000-0000-000000000000', $qt$Express 18 as a fraction of 48 in lowest terms.$qt$, $opts$["\\(\\frac{18}{48}\\)","\\(\\frac{6}{16}\\)","\\(\\frac{8}{3}\\)","\\(\\frac{3}{8}\\)"]$opts$::jsonb, 3, $ex$\(\frac{18}{48}\) cancels by 6 to \(\frac{3}{8}\). The first two stop early; \(\frac{8}{3}\) inverts part and whole.$ex$, 'check', 202, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-fractions-decimals-and-percentages') and code = '0580 1.4b'), null),
('00000000-0000-0000-0000-000000000000', $qt$Increase 240 by 15%.$qt$, $opts$["276","255","264","204"]$opts$::jsonb, 0, $ex$\(240 \times 1.15 = 276\). 255 adds 15 flat; 264 adds 10%; 204 decreases instead.$ex$, 'check', 301, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-fractions-decimals-and-percentages') and code = '0580 1.13a'), null),
('00000000-0000-0000-0000-000000000000', $qt$A £64 sale price is 20% off the original. What was the original?$qt$, $opts$["£76.80","£51.20","£80","£84"]$opts$::jsonb, 2, $ex$\(64 \div 0.8 = 80\). £76.80 adds 20% on; £51.20 takes 20% off the sale price; £84 adds £20 flat.$ex$, 'check', 302, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-fractions-decimals-and-percentages') and code = '0580 1.13a'), null),
('00000000-0000-0000-0000-000000000000', $qt$£2000 at 4% simple interest for 3 years. How much interest is earned?$qt$, $opts$["£80","£2400","£2249.73","£240"]$opts$::jsonb, 3, $ex$\(2000 \times 0.04 \times 3 = 240\). £80 is one year; £2400 adds the principal; £2249.73 compounds instead.$ex$, 'check', 401, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-fractions-decimals-and-percentages') and code = '0580 1.13b'), null),
('00000000-0000-0000-0000-000000000000', $qt$£2000 at 4% compound interest for 3 years. What is the total amount?$qt$, $opts$["£2240","£2249.73","£2480","£2000"]$opts$::jsonb, 1, $ex$\(2000 \times 1.04^3 = 2249.73\). £2240 is the simple total; £2480 doubles the rate effect; £2000 ignores interest.$ex$, 'check', 402, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-fractions-decimals-and-percentages') and code = '0580 1.13b'), null),
('00000000-0000-0000-0000-000000000000', $qt$Bacteria double every hour from 5 cells. How many after 4 hours?$qt$, $opts$["40","25","80","160"]$opts$::jsonb, 2, $ex$\(5 \times 2^4 = 80\). 40 adds per hour; 25 squares wrongly; 160 doubles once too often.$ex$, 'check', 501, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-fractions-decimals-and-percentages') and code = '0580 1.17a'), null),
('00000000-0000-0000-0000-000000000000', $qt$120 g decays with a 3-year half-life. What mass remains after 9 years?$qt$, $opts$["15 g","40 g","13.3 g","30 g"]$opts$::jsonb, 0, $ex$Three halvings: 120 → 60 → 30 → 15 g. 40 divides by 3 (linear thinking); 13.3 mis-divides; 30 stops a halving early.$ex$, 'check', 502, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-fractions-decimals-and-percentages') and code = '0580 1.17a'), null),
('00000000-0000-0000-0000-000000000000', $qt$A shopkeeper buys an item for £45 and sells it at a 60% profit. Find the selling price.$qt$, $opts$["£27","£72","£105","£70.20"]$opts$::jsonb, 1, $ex$Marks as awarded: multiplier 1.6 identified [1]; \(45 \times 1.6 = 72\) [1]. £27 is the profit alone; £105 adds 60 flat; £70.20 mis-keys the multiplier.$ex$, 'exam', 900, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-fractions-decimals-and-percentages') and code = '0580 1.13a'), (select id from public.syllabus_statements where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-fractions-decimals-and-percentages') and code = '1.13')),
('00000000-0000-0000-0000-000000000000', $qt$A car worth £12,000 depreciates by 15% each year. Find its value after 2 years.$qt$, $opts$["£8,400","£10,200","£9,000","£8,670"]$opts$::jsonb, 3, $ex$Marks as awarded: decay factor 0.85 squared [1]; \(12000 \times 0.85^2 = 8670\) [1]. £8,400 uses simple depreciation; £10,200 is one year only; £9,000 mis-reads the rate.$ex$, 'exam', 901, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-fractions-decimals-and-percentages') and code = '0580 1.17a'), (select id from public.syllabus_statements where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-fractions-decimals-and-percentages') and code = '1.17'));
