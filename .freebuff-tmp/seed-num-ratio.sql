insert into public.learning_objectives (topic_id, code, statement, teach, sort_order)
values
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-ratio-rate-and-proportion'), '0580 1.11a', $st$Simplify ratios fully, and divide quantities in a given ratio.$st$, $teach$### What is being asked
Share an amount by a ratio or reduce a ratio to simplest form. The answer finds one part's value first — everything follows from it.

### Method
1. Total the parts: 3:5 means 8 parts.
2. One part = amount ÷ total parts (£240 ÷ 8 = £30).
3. Multiply out: \(3 \times 30 = 90\), \(5 \times 30 = 150\).
4. Simplify by dividing all terms by their HCF (18:24:30 ÷ 6 = 3:4:5). Check shares add back to the total.

### Worked example
Share £240 in ratio 3:5: 8 parts, one part £30, shares £90 and £150. Check: \(90 + 150 = 240\) and \(90:150\) cancels by 30 back to 3:5 — both directions verified.

### Traps
- Dividing by one term. £240 ÷ 3 ignores the 5 — always total the parts first.
- Simplifying one term only. 18:24:30 needs ÷6 on ALL three — partial cancelling is unfinished.
- Decimal parts left standing. Ratios use whole numbers — \(2.5:5\) doubles to 5:10, then cancels to 1:2.
- Shares that don't total. Any split not summing to £240 confesses its own error — add back, always.

### Timing
Short answers: 2 minutes, 2 marks. One-part value first (the method mark), shares second.$teach$, 1),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-ratio-rate-and-proportion'), '0580 1.11b', $st$Solve harder ratio problems where a difference, not a total, is given.$st$, $teach$### What is being asked
Find amounts when the gap (not the sum) is known. The answer converts the gap into parts first — the difference in parts is the key.

### Method
1. Subtract the ratio terms: 5:3 differs by 2 parts.
2. Gap ÷ part-difference = one part (\(12 \div 2 = 6\)).
3. Multiply out both terms (30 and 18).
4. Check: the answers differ by the given gap AND sit in the given ratio.

### Worked example
Two numbers in ratio 5:3 differ by 12: parts differ by 2, so one part is 6, giving 30 and 18. Check: \(30 - 18 = 12\) and \(30:18\) cancels to 5:3 — gap and ratio both satisfied.

### Traps
- Dividing the gap by the total parts. 12 ÷ 8 answers a sharing question nobody asked — differences use part-differences.
- One answer only. The ratio names two quantities — both must be stated.
- Checking ratio but not gap (or reverse). Both conditions bind; verify both.
- Recipe scaling by addition. Adding 500 g flour needs proportional sugar (÷4), not equal sugar — ratios scale, never add flat.

### Timing
Short answers: 2-3 minutes, 2-3 marks. Part-difference first (the insight mark), values second.$teach$, 2),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-ratio-rate-and-proportion'), '0580 1.12a', $st$Solve speed, distance and time problems, converting minutes to hours correctly.$st$, $teach$### What is being asked
Link speed, distance and time. The answer keeps hours with hours — minutes convert to fractions of 60 before any division.

### Method
1. Triangle: distance = speed × time; speed = distance ÷ time; time = distance ÷ speed.
2. Minutes become hours by ÷60: 20 min = \(\frac{1}{3}\) h (never 0.2 h).
3. Units follow the inputs: km and hours give km/h — mixed units convert first.
4. Check magnitude: motorway speeds sit near 100 km/h; answers of 1200 or 3 betray unit slips.

### Worked example
180 km in 2.5 hours: speed = \(180 \div 2.5 = 72\) km/h. Check: 2.5 h at 72 km/h rebuilds \(72 \times 2.5 = 180\) km — the triangle reads both ways.

### Traps
- Decimal hours for minutes. 20 min is \(\frac{1}{3}\) h, not 0.2 h — minutes divide by 60, never 100.
- Multiplying when the triangle divides. Cover the wanted quantity: hidden means divide, visible row means multiply.
- Seconds mixed with hours. Convert everything to one time unit before touching the triangle.
- Average versus top speed. Total distance over total time averages — peak readings never enter it.

### Timing
Short answers: 2 minutes, 2 marks. Unit conversion first (the hidden mark), triangle second.$teach$, 3),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-ratio-rate-and-proportion'), '0580 1.12b', $st$Solve other rate problems including density and flow, and convert rate units.$st$, $teach$### What is being asked
Handle per-unit quantities beyond speed, or convert their units. The answer reads the "per" as division — and converts top and bottom separately.

### Method
1. Density = mass ÷ volume; flow = volume ÷ time; unit price = cost ÷ quantity — "per" always divides.
2. Unit conversion scales both parts: m/s to km/h multiplies by 3.6 (×3600 ÷ 1000).
3. Keep track of which unit is wanted: g/cm³ answers want grams over cubic centimetres, not kilograms.
4. Check by rebuilding the rate from your answer — mass ÷ your volume must return the density.

### Worked example
20 m/s in km/h: \(20 \times 3.6 = 72\). Check: 20 m each second is 72,000 m per 3600 s = 72 km/h — seconds-to-hours (×3600) dominates metres-to-km (÷1000), exactly as 3.6 encodes.

### Traps
- Dividing by 3.6 backwards. m/s to km/h multiplies (bigger number, bigger units per hour); km/h to m/s divides.
- Adding instead of dividing. Density 2.5 with volume 400 adds nothing — mass = 2.5 × 400 = 1000 g.
- Unit of the answer assumed. 1000 g is 1 kg — convert to the asked unit, not the convenient one.
- Flow direction ignored. Filling versus emptying flips the sign of change — read whether the quantity grows or shrinks.

### Timing
Short answers: 2-3 minutes, 2 marks. The 3.6 factor (or the per-division) is the method mark — write it.$teach$, 4),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-ratio-rate-and-proportion'), '0580 2.8a', $st$Solve direct and inverse proportion problems (Extended only).$st$, $teach$### What is being asked
Scale with a relationship — together or opposite. The answer first names the type: both up (direct) or one up, other down (inverse). (Extended only.)

### Method
1. Direct (\(y = kx\)): find \(k\) from the given pair (\(y = 20\), \(x = 4\) gives \(k = 5\)), then scale: \(x = 7\) gives 35.
2. Inverse (\(y = k/x\), or men-days style): the PRODUCT is constant — 6 workers × 10 days = 60 worker-days, so 15 workers take \(60 \div 15 = 4\) days.
3. Type test: "more means more" (direct) versus "more means fewer" (inverse) — decide before computing.
4. Check by pushing further: doubling workers must halve the days under inverse — verify the direction holds.

### Worked example
6 workers take 10 days; 15 workers take \(6 \times 10 \div 15 = 4\) days. Check: more workers, fewer days (inverse confirmed), and 15 × 4 = 60 worker-days matches 6 × 10 — the constant product verifies.

### Traps
- Direct method on inverse data. Scaling 6→15 workers directly gives 25 days — more workers taking longer is the absurdity detector.
- Forgetting \(k\). Direct proportion needs the constant from the known pair — scaling ratios blindly skips it.
- Inverse as division by the wrong total. Worker-days = workers × days; dividing days by workers alone answers nothing. (Extended only.)
- Assuming linearity. Proportion passes through the origin — flat fees and thresholds break it (taxi flag-fall is not proportion).

### Timing
Structured: 3 minutes, 3 marks. Type named (a mark), constant found (a mark), scaled answer (a mark).$teach$, 5)
on conflict (topic_id, code) do update set
  statement = excluded.statement,
  teach = excluded.teach,
  sort_order = excluded.sort_order;
delete from public.quizzes
 where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-ratio-rate-and-proportion') and title = 'Checkpoints — Ratio, Rate & Proportion';
insert into public.quizzes (id, topic_id, title, description, is_published, exam_type)
values ('00000000-0000-0000-0000-000000000000', (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-ratio-rate-and-proportion'), 'Checkpoints — Ratio, Rate & Proportion', $desc$Short checks, one set per objective in this topic. Answer one wrongly and the objective it belongs to is the thing to revisit — not the whole topic.$desc$, true, 'quiz');
insert into public.questions
  (quiz_id, question_text, options, correct_option, explanation, difficulty, sort_order, objective_id, statement_id)
values
('00000000-0000-0000-0000-000000000000', $qt$Share £240 in the ratio 3:5.$qt$, $opts$["£90 and £150","£80 and £160","£100 and £140","£72 and £168"]$opts$::jsonb, 0, $ex$8 parts give £30 each: 90 and 150. 80:160 is 1:2; 100:140 keeps a £40 gap wrongly; 72:168 is 3:7.$ex$, 'check', 101, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-ratio-rate-and-proportion') and code = '0580 1.11a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Simplify 18:24:30.$qt$, $opts$["9:12:15","6:8:10","3:4:5","2:3:4"]$opts$::jsonb, 2, $ex$Divide all three by 6: 3:4:5. The first two stop cancelling early; 2:3:4 is not even equivalent.$ex$, 'check', 102, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-ratio-rate-and-proportion') and code = '0580 1.11a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Two numbers in ratio 5:3 differ by 12. Find the numbers.$qt$, $opts$["20 and 8","30 and 18","15 and 3","24 and 12"]$opts$::jsonb, 1, $ex$Parts differ by 2, so one part is 6: 30 and 18. 20:8 is 5:2; 15:3 is 5:1; 24:12 is 2:1.$ex$, 'check', 201, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-ratio-rate-and-proportion') and code = '0580 1.11b'), null),
('00000000-0000-0000-0000-000000000000', $qt$A recipe uses flour and sugar in ratio 4:1. With 500 g of flour, how much sugar?$qt$, $opts$["2000 g","400 g","250 g","125 g"]$opts$::jsonb, 3, $ex$One part is \(500 \div 4 = 125\) g. 2000 multiplies; 400 misdivides; 250 halves instead of quartering.$ex$, 'check', 202, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-ratio-rate-and-proportion') and code = '0580 1.11b'), null),
('00000000-0000-0000-0000-000000000000', $qt$A car travels 180 km in 2.5 hours. Find its average speed.$qt$, $opts$["75 km/h","45 km/h","72 km/h","70 km/h"]$opts$::jsonb, 2, $ex$\(180 \div 2.5 = 72\) km/h. The others mis-divide or round the 2.5 hours.$ex$, 'check', 301, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-ratio-rate-and-proportion') and code = '0580 1.12a'), null),
('00000000-0000-0000-0000-000000000000', $qt$How far does a car travel at 60 km/h for 20 minutes?$qt$, $opts$["20 km","1200 km","3 km","12 km"]$opts$::jsonb, 0, $ex$20 min = \(\frac{1}{3}\) h, so \(60 \times \frac{1}{3} = 20\) km. 1200 skips the conversion; 3 divides backwards; 12 treats 20 min as 0.2 h.$ex$, 'check', 302, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-ratio-rate-and-proportion') and code = '0580 1.12a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Convert 20 m/s to km/h.$qt$, $opts$["36 km/h","5.6 km/h","200 km/h","72 km/h"]$opts$::jsonb, 3, $ex$\(20 \times 3.6 = 72\). 5.6 divides (the reverse conversion); 36 and 200 use wrong factors.$ex$, 'check', 401, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-ratio-rate-and-proportion') and code = '0580 1.12b'), null),
('00000000-0000-0000-0000-000000000000', $qt$A material has density 2.5 g/cm³. What is the mass of 400 cm³?$qt$, $opts$["160 g","1000 g","402.5 g","1 g"]$opts$::jsonb, 1, $ex$\(2.5 \times 400 = 1000\) g. 160 divides; 402.5 adds; 1 g answers in kilograms numerically but labels grams.$ex$, 'check', 402, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-ratio-rate-and-proportion') and code = '0580 1.12b'), null),
('00000000-0000-0000-0000-000000000000', $qt$y is directly proportional to x. y = 20 when x = 4. Find y when x = 7.$qt$, $opts$["35","28","23","11"]$opts$::jsonb, 0, $ex$\(k = 20 \div 4 = 5\), so \(y = 5 \times 7 = 35\). 28 swaps in x = 4 twice; 23 adds the difference; 11 inverts the ratio.$ex$, 'check', 501, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-ratio-rate-and-proportion') and code = '0580 2.8a'), null),
('00000000-0000-0000-0000-000000000000', $qt$6 workers take 10 days to finish a job. How long would 15 workers take?$qt$, $opts$["25 days","15 days","4 days","1 day"]$opts$::jsonb, 2, $ex$Inverse: 60 worker-days ÷ 15 = 4 days. 25 scales directly (absurd — more workers, longer); 15 changes nothing; 1 divides twice.$ex$, 'check', 502, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-ratio-rate-and-proportion') and code = '0580 2.8a'), null),
('00000000-0000-0000-0000-000000000000', $qt$12 identical taps fill a tank in 40 minutes. How long would 8 taps take?$qt$, $opts$["26.7 min","60 min","48 min","30 min"]$opts$::jsonb, 1, $ex$Marks as awarded: inverse recognised with 480 tap-minutes total [1]; \(480 \div 8 = 60\) min [1]. 26.7 scales directly; 48 mis-partitions; 30 halves.$ex$, 'exam', 900, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-ratio-rate-and-proportion') and code = '0580 2.8a'), (select id from public.syllabus_statements where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-ratio-rate-and-proportion') and code = '2.8')),
('00000000-0000-0000-0000-000000000000', $qt$Concrete mixes cement and sand in ratio 1:4. How much cement is needed for 2.5 m³ of concrete?$qt$, $opts$["2 m³","0.625 m³","10 m³","0.5 m³"]$opts$::jsonb, 3, $ex$Marks as awarded: 5 parts identified [1]; one part \(2.5 \div 5 = 0.5\) m³ of cement [1]. 2 m³ takes 4 parts; 0.625 divides by 4 only; 10 multiplies.$ex$, 'exam', 901, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-ratio-rate-and-proportion') and code = '0580 1.11b'), (select id from public.syllabus_statements where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-ratio-rate-and-proportion') and code = '1.11'));
