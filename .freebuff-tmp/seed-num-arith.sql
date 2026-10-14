insert into public.learning_objectives (topic_id, code, statement, teach, sort_order)
values
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-arithmetic-and-place-value'), '0580 1.1a', $st$Identify natural numbers, integers, rational and irrational numbers, and place a value correctly.$st$, $teach$### What is being asked
Sort a number into its set or spot the odd one out. The answer is the smallest set that still holds it — or the one member that breaks the pattern.

### Method
1. Natural numbers: 1, 2, 3, ... Integers add zero and negatives. Rationals are fractions (including terminates and recurrers).
2. Irrationals cannot be written as fractions: \(\pi\), non-exact roots like \(\sqrt{2}\).
3. Test riff: can it be written \(\frac{a}{b}\)? Recurring \(0.\dot{3} = \frac{1}{3}\) — rational. Exact roots (\(\sqrt{9} = 3\)) collapse to rational.
4. Place each value once, in its tightest set: 5 is natural first, integer and rational by inheritance.

### Worked example
Sort \(\sqrt{9}\), \(\pi\), \(0.\dot{3}\), \(\frac{5}{8}\): \(\sqrt{9} = 3\) (natural), \(\frac{5}{8}\) and \(0.\dot{3}\) (rational), \(\pi\) (irrational). Check: only \(\pi\) resists fraction form — every other value converts exactly.

### Traps
- Calling every root irrational. Exact roots (\(\sqrt{9}\), \(\sqrt[3]{27}\)) are integers in disguise.
- Recurring means irrational. Recurrers are fractions (\(0.\dot{3} = \frac{1}{3}\)) — repetition is rationality's signature, not its failure.
- 1 is prime. Primality needs exactly two factors; 1 has one — it belongs nowhere in prime questions.
- Biggest set as the answer. "Real number" is true but earns nothing when the question asks for the tightest fit.

### Timing
Short answers: 1-2 minutes, 1-2 marks. Classification should be instant — fraction-test every value.$teach$, 1),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-arithmetic-and-place-value'), '0580 1.1b', $st$Find the HCF and LCM of two numbers using prime factorisation.$st$, $teach$### What is being asked
Split numbers into primes, then build the highest common factor or lowest common multiple. The answer is one number — with the factor trees or lists that earn the method marks.

### Method
1. Factorise each number into primes (factor tree or division): \(12 = 2^2 \times 3\), \(18 = 2 \times 3^2\).
2. HCF: take the LOWEST shared powers — \(2 \times 3 = 6\). It divides both.
3. LCM: take the HIGHEST powers seen anywhere — \(2^2 \times 3^2 = 36\). Both divide into it.
4. Check: HCF divides both numbers; both numbers divide the LCM. If either test fails, rebuild.

### Worked example
HCF and LCM of 12 and 18: primes give \(2^2 \times 3\) and \(2 \times 3^2\). HCF = \(2 \times 3 = 6\) (6 divides 12 and 18). LCM = \(2^2 \times 3^2 = 36\) (12 and 18 both divide 36). Check: 6 is the largest shared divisor; 36 is the smallest shared multiple.

### Traps
- Multiplying the numbers for the LCM. The product is a common multiple, rarely the lowest (12 × 18 = 216, not 36).
- Taking highest powers for HCF. Highest builds the LCM; lowest builds the HCF — swapping them swaps the answers.
- Stopping factorisation early. \(12 = 4 \times 3\) is unfinished — 4 splits further, and composite "primes" corrupt both results.
- Listing multiples from 1 each time. Listing works for tiny numbers but collapses under exam sizes — factorise instead.

### Timing
Short answers: 2-3 minutes, 2-3 marks. Factor trees are the method marks — never give just the final number.$teach$, 2),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-arithmetic-and-place-value'), '0580 1.1c', $st$Evaluate squares, cubes, square roots, cube roots and reciprocals of numbers.$st$, $teach$### What is being asked
Compute a power, root or reciprocal exactly. The answer is a single value — roots of perfect powers come out clean, which is how you check.

### Method
1. Squares and cubes multiply out: \(11^2 = 121\), \(4^3 = 64\).
2. Square roots ask "which number squared gives this": \(\sqrt{144} = 12\). Cube roots similarly: \(\sqrt[3]{8} = 2\).
3. Reciprocal flips the fraction: reciprocal of \(\frac{2}{5}\) is \(\frac{5}{2}\); of 4 is \(\frac{1}{4}\).
4. Combine carefully: \(\sqrt{144} - \sqrt[3]{8} = 12 - 2 = 10\) — finish each root before combining.

### Worked example
Evaluate \(\sqrt{144} - \sqrt[3]{8}\): \(\sqrt{144} = 12\) (since \(12^2 = 144\)) and \(\sqrt[3]{8} = 2\) (since \(2^3 = 8\)), so \(12 - 2 = 10\). Check: \(12^2\) and \(2^3\) rebuild the originals exactly.

### Traps
- Rooting term by term: \(\sqrt{9 + 16} = 5\), not 3 + 4. Combine first, root last.
- Reciprocal as negation. Flipping is not negating: reciprocal of \(\frac{2}{5}\) is \(\frac{5}{2}\), not \(-\frac{2}{5}\).
- Cube root as divide-by-3. \(\sqrt[3]{8} = 2\), not \(8 \div 3\) — roots invert powers, not division.
- Decimal drift on exact values. Perfect powers give integers — a decimal answer signals a wrong key press.

### Timing
Short answers: 1-2 minutes each. Exact roots are integer checks — non-integers mean re-press, not round.$teach$, 3),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-arithmetic-and-place-value'), '0580 1.5a', $st$Order quantities that mix fractions, decimals and percentages by converting to one form.$st$, $teach$### What is being asked
Sort values given in different forms. The answer is an ordering — every value converted first, compared second.

### Method
1. Pick one form (decimals usually): \(\frac{1}{3} \approx 0.333\), \(35\% = 0.35\).
2. Convert everything, keeping 3+ figures so close values stay separated.
3. Order the decimals, then write the answer in the ORIGINAL forms.
4. Check endpoints: the smallest and largest should survive a rough eyeball of the originals.

### Worked example
Order smallest first: 0.4, \(\frac{1}{3}\), 35%. Decimals: 0.4, 0.333..., 0.35. Order: \(\frac{1}{3}\), 35%, 0.4. Check: a third is below 0.35, which is below 0.4 — each gap is real, not rounding noise.

### Traps
- Ordering the unconverted forms. 35% "looks bigger" than 0.4 to the eye — convert before comparing, always.
- Rounding conversions too early. 2-figure conversions merge close values (0.333 vs 0.35 need three figures to separate).
- Answering in decimals. The question gave fractions and percentages — return their forms, not yours.
- Ascending versus descending. Read the direction twice; a perfect order backwards scores nothing.

### Timing
Short answers: 2 minutes, 2 marks. Conversion lines are the method mark — show them even when the order feels obvious.$teach$, 4),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-arithmetic-and-place-value'), '0580 1.6a', $st$Calculate with directed numbers in all four operations, tracking signs correctly.$st$, $teach$### What is being asked
Compute with negatives. The answer's sign is half the battle — decide it first, magnitude second.

### Method
1. Adding/subtracting: subtracting a negative adds: \(-15 - (-3) = -15 + 3 = -12\).
2. Multiplying/dividing: same signs give positive, different signs give negative: \((-6) \times (-4) = +24\), \(24 \div (-3) = -8\).
3. Work left to right in stages, writing each intermediate sign — never two operations per line.
4. Check by rough magnitude with the sign reasoned separately: 24-ish and negative.

### Worked example
\((-6) \times (-4) \div (-3)\): same signs multiply to \(+24\), then different signs divide to \(-8\). Check: magnitude \(6 \times 4 \div 3 = 8\); two negatives then a third flip leave one minus — \(-8\) agrees on both counts.

### Traps
- Minus-negative stays minus. \(-(-3) = +3\) — the double negative adds, the most tested slip in the topic.
- Sign of the product from the last operation only. Decide each stage's sign as you go; carrying one plus through two flips corrupts.
- Division direction. \(24 \div (-3) = -8\), but \((-3) \div 24\) differs — order still matters with signs.
- Dropping the sign in the answer line. Correct magnitude with no minus scores half — write the sign deliberately.

### Timing
Short answers: 1-2 minutes each. One line per operation keeps signs visible and checkable.$teach$, 5),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-arithmetic-and-place-value'), '0580 1.6b', $st$Apply the order of operations (BIDMAS) including brackets, powers and fractions.$st$, $teach$### What is being asked
Evaluate a multi-operation expression. The answer follows Brackets, Indices, Division/Multiplication, Addition/Subtraction — strictly, visibly.

### Method
1. Brackets first — including fraction bars and nested pairs, inside out.
2. Indices (powers and roots) next: \(4^2 = 16\) before anything multiplies it.
3. Division and multiplication together, left to right. Addition and subtraction together, left to right.
4. Show one precedence level per line so a slip costs one mark, not all.

### Worked example
\(20 - 3 \times 4^2\): indices give 16, multiplication gives 48, subtraction gives \(20 - 48 = -28\). Check by alternate route: \(3 \times 16\) dominates 20, so the answer must be negative — \(-28\) passes where any positive fails.

### Traps
- Left-to-right through everything. \((20 - 3) \times 16 = 272\) is the classic BIDMAS failure — multiplication outranks subtraction.
- Powers as multiplication by the base. \(4^2 = 16\), not \(4 \times 2\); indices are their own level.
- Fraction bars ignored. \(\frac{18+2}{7-2}\) brackets top and bottom separately before dividing.
- One-line answers. Examiners award per level — a single line gambles all marks on zero slips.

### Timing
Short answers: 2 minutes, 2 marks. Level-by-level working is the whole method mark.$teach$, 6),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-arithmetic-and-place-value'), '0580 1.9a', $st$Round to decimal places and significant figures, and estimate calculations to 1 significant figure.$st$, $teach$### What is being asked
Round a value or estimate a whole calculation. The answer respects the asked form — places count from the point, figures from the first non-zero digit.

### Method
1. Decimal places: count after the point (0.04682 to 2 d.p. is 0.05). Significant figures: count from the first non-zero digit (0.04682 to 2 s.f. is 0.047).
2. The deciding digit rounds the last kept digit up if 5 or more.
3. Estimates: round every number to 1 s.f. FIRST, then compute: \(48.6 \times 19.3 \div 5.1 \approx 50 \times 20 \div 5 = 200\).
4. Never estimate from unrounded numbers — that is just the answer with fewer digits written down.

### Worked example
Estimate \(48.6 \times 19.3 \div 5.1\): 1 s.f. gives \(50 \times 20 \div 5 = 200\). Check against the true value (≈184): same magnitude, rougher edges — an estimate's job is plausibility, not precision.

### Traps
- Zeros after the point in small decimals. In 0.04682 the 0s place-hold; the first significant figure is 4.
- 5-or-more ignored. 0.045 to 1 s.f. is 0.05, not 0.04 — the boundary digit rounds up.
- Estimating with exact numbers. Computing 48.6 × 19.3 exactly then chopping digits scores nothing for the estimate mark.
- Trailing zeros dropped in s.f. answers. 200 to 1 s.f. keeps its zeros as place-holders — 2 alone claims one unit, not two hundred.

### Timing
Short answers: 1-2 minutes each. State the rounded inputs before computing — the estimate mark lives there.$teach$, 7),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-arithmetic-and-place-value'), '0580 1.10a', $st$State the upper and lower bounds for a measurement given to a stated accuracy.$st$, $teach$### What is being asked
Turn a rounded value into the interval it came from. The answer is a range — half the precision below, half above (lower inclusive, upper exclusive).

### Method
1. Halve the precision: 1 d.p. means ±0.05; nearest integer means ±0.5; 2 s.f. on 4.3... precision 0.1, so ±0.05.
2. Lower bound = value minus half (inclusive): 4.3 → 4.25.
3. Upper bound = value plus half (exclusive): 4.3 → 4.35. Write \(4.25 \le x < 4.35\).
4. Check: rounding anything in the interval to the stated accuracy must return the value — test both edges.

### Worked example
4.3 m to 1 d.p.: precision 0.1, half is 0.05, so \(4.25 \le x < 4.35\). Check: 4.25 rounds up to 4.3 and 4.3499... rounds to 4.3, but 4.35 rounds to 4.4 — the exclusive upper edge is load-bearing.

### Traps
- Full precision each side. Bounds are ±HALF the last unit (0.05, not 0.1) — the commonest lost mark.
- Both bounds inclusive. The upper edge rounds up and away, so it is strictly less-than.
- Bounds of the wrong precision. 2 s.f. on 4600 means ±50, not ±0.5 — halve the LAST KEPT unit, wherever it sits.
- Exact values bounded. Counted or exact quantities (30 pupils) have no bounds — only rounded measurements do.

### Timing
Short answers: 2 minutes, 2 marks — one per bound. The half-precision step is the method mark.$teach$, 8),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-arithmetic-and-place-value'), '0580 1.10b', $st$Find the maximum and minimum possible values of a calculation from measurement bounds.$st$, $teach$### What is being asked
Push rounded inputs through a formula to its extremes. The answer pairs extremes correctly — max with max is only sometimes right.

### Method
1. Write every input's interval first (upper exclusive, but use the edge value in calculations).
2. Addition/subtraction: max = uppers added (for minus: upper minus lower); min mirrors.
3. Multiplication/division of positives: max = uppers combined; min = lowers combined.
4. Subtraction and division cross over: to MINIMISE \(x - y\), take x low and y HIGH — check each operation's direction.

### Worked example
\(x = 3.4\) (1 d.p.: 3.35–3.45), \(y = 2\) (nearest integer: 1.5–2.5). Max of \(x + y = 3.45 + 2.5 = 5.95\); min of \(x - y = 3.35 - 2.5 = 0.85\). Check: addition takes both uppers; subtraction takes y's upper against x — the crossover is the tested skill.

### Traps
- Max-minus-max. Minimising a difference needs the subtrahend LARGE — upper-minus-upper maximises instead.
- Using rounded values, not edges. \(3.4 + 2 = 5.4\) answers a different question — extremes come from edges.
- Inclusive uppers treated as attainable... they are used in calculations (5.95 stands) even though the bound is strict — follow the convention, don't philosophise.
- One bound for all inputs. Each measurement brings its own interval — list them all before combining.

### Timing
Structured: 3-4 minutes, 3-4 marks. Interval table first (a mark), correct pairing (a mark), arithmetic (a mark).$teach$, 9),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-arithmetic-and-place-value'), '0580 1.14a', $st$Use a calculator efficiently for multi-step calculations, and judge whether answers are plausible.$st$, $teach$### What is being asked
Compute reliably with the machine doing the arithmetic. The answer types structure (brackets) once and checks sense after — never digits alone.

### Method
1. Type brackets as written: \((38.4 - 12.6) \div (4.2 + 1.8)\) goes in with both pairs — the calculator then honours the order.
2. Use memory or ANS for reused intermediates instead of retyping rounded values.
3. Do NOT round mid-calculation — rounding happens once, on the final answer, to the asked accuracy.
4. Plausibility check: estimate to 1 s.f. alongside; a wildly different display means a keying slip, not a math error.

### Worked example
\((38.4 - 12.6) \div (4.2 + 1.8)\): bracketed entry gives \(25.8 \div 6 = 4.3\). Check by estimate: \(40 - 10 = 30\), \(4 + 2 = 6\), \(30 \div 6 = 5\) — 4.3 sits plausibly near 5; 43 or 0.43 would betray a bracket slip.

### Traps
- Left-to-right keying without brackets. The display follows its own precedence on your flat input — brackets impose yours.
- Retyping rounded intermediates. Each retyped rounding compounds; ANS and memory preserve full precision.
- Final answers with 10 digits. The question's accuracy (3 s.f., 2 d.p.) trims the display — untrimmed digits are not an answer.
- Trusting the display absolutely. Transposed digits and missed brackets are keying errors — the estimate is the safety net.

### Timing
Short answers: minutes, not seconds — keying carefully beats re-keying. Estimate first, compute second, compare always.$teach$, 10),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-arithmetic-and-place-value'), '0580 1.15a', $st$Calculate with 12-hour and 24-hour times, timetables and time intervals.$st$, $teach$### What is being asked
Move between clock formats or across midnight and timetables. The answer carries minutes at 60 — every time error is a base-60 slip.

### Method
1. Convert: pm adds 12 (3:20 pm = 15:20); am keeps morning hours; 12 am is 00, 12 pm is 12.
2. Add durations in parts (hours, then minutes), carrying 60 minutes to an hour.
3. Intervals: from start to the next hour, then hours, then to arrival — three chunks, one total.
4. Timetables: read the correct row AND column (day, direction) before computing anything.

### Worked example
Film starts 19:45, lasts 2 h 35 min: +2 h gives 21:45, +35 min gives 22:20. Check: 45 + 35 = 80 minutes = 1 h 20 — the carry is the whole calculation, and 22:80 would confess forgetting it.

### Traps
- Decimal hours. 1 h 30 min is 1.5 h, but 1 h 45 min is 1.75 h — minutes divide by 60, never by 100.
- Midnight crossings uncounted. 23:40 plus 50 min is 00:30 next day — the date changes even when the question only asks the time.
- am/pm swapped. 12:30 am is night, 12:30 pm is day — twelve is the trap hour in both directions.
- Wrong timetable cell. Correct arithmetic on the wrong row's times answers a journey nobody takes.

### Timing
Short answers: 2 minutes, 2 marks. Chunk the interval (to the hour, across, from the hour) — never one leap.$teach$, 11),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-arithmetic-and-place-value'), '0580 1.16a', $st$Solve money problems including currency conversion, bills and change.$st$, $teach$### What is being asked
Handle cash: totals, change, conversions. The answer converts in the right direction and keeps pence exact — money has no "roughly".

### Method
1. Totals first: quantity × unit price (3 × £18.99 = £56.97), then change = paid − total.
2. Currency: multiply by the rate quoted as foreign-per-local (£350 × 1.27 = $444.50); divide when the quote runs the other way.
3. Direction test: converting pounds to a weaker currency gives MORE units — fewer means you divided wrongly.
4. Work in pence/cents for additions, convert back for the answer — decimals drift otherwise.

### Worked example
£1 = $1.27, convert £350: \(350 \times 1.27 = 444.50\) dollars. Check: dollars are worth less than pounds, so $444.50 for £350 points the right way — $275.59 would mean dollars worth more, an absurdity detector for direction slips.

### Traps
- Dividing by the rate. The direction test catches it: weaker foreign money must come in larger numbers.
- Change from the wrong total. Discounts, quantities and tax apply BEFORE subtracting payment — order matters.
- Rounding money mid-stream. Keep exact pence until the final answer; money questions punish early rounding.
- Rate applied twice. Convert once — converting the converted amount compounds the rate into nonsense.

### Timing
Short answers: 2 minutes, 2 marks. Totals, then payment arithmetic, then the direction sanity check.$teach$, 12)
on conflict (topic_id, code) do update set
  statement = excluded.statement,
  teach = excluded.teach,
  sort_order = excluded.sort_order;
delete from public.quizzes
 where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-arithmetic-and-place-value') and title = 'Checkpoints — Arithmetic & Place Value';
insert into public.quizzes (id, topic_id, title, description, is_published, exam_type)
values ('00000000-0000-0000-0000-000000000000', (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-arithmetic-and-place-value'), 'Checkpoints — Arithmetic & Place Value', $desc$Short checks, one set per objective in this topic. Answer one wrongly and the objective it belongs to is the thing to revisit — not the whole topic.$desc$, true, 'quiz');
insert into public.questions
  (quiz_id, question_text, options, correct_option, explanation, difficulty, sort_order, objective_id, statement_id)
values
('00000000-0000-0000-0000-000000000000', $qt$Which number is irrational?$qt$, $opts$["\\(\\sqrt{9}\\)","\\(0.\\dot{3}\\)","\\(\\pi\\)","\\(\\frac{5}{8}\\)"]$opts$::jsonb, 2, $ex$\(\pi\) cannot be written as a fraction. \(\sqrt{9} = 3\), \(0.\dot{3} = \frac{1}{3}\), and \(\frac{5}{8}\) are all fractions by definition.$ex$, 'check', 101, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-arithmetic-and-place-value') and code = '0580 1.1a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Which list contains only prime numbers?$qt$, $opts$["2, 3, 5, 7","1, 2, 3, 5","2, 4, 6, 8","9, 15, 21, 25"]$opts$::jsonb, 0, $ex$2, 3, 5 and 7 each have exactly two factors. 1 is not prime; the evens (except 2) and the last list are all composite.$ex$, 'check', 102, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-arithmetic-and-place-value') and code = '0580 1.1a'), null),
('00000000-0000-0000-0000-000000000000', $qt$What is the HCF of 12 and 18?$qt$, $opts$["3","6","9","36"]$opts$::jsonb, 1, $ex$Prime factors give \(2^2 \times 3\) and \(2 \times 3^2\); lowest shared powers give \(2 \times 3 = 6\). 3 misses a factor of 2; 9 and 36 do not divide 12.$ex$, 'check', 201, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-arithmetic-and-place-value') and code = '0580 1.1b'), null),
('00000000-0000-0000-0000-000000000000', $qt$What is the LCM of 6 and 8?$qt$, $opts$["14","16","48","24"]$opts$::jsonb, 3, $ex$\(6 = 2 \times 3\) and \(8 = 2^3\), so LCM = \(2^3 \times 3 = 24\). 14 is the sum; 48 is the product (a multiple, not the lowest); 16 is not a multiple of 6.$ex$, 'check', 202, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-arithmetic-and-place-value') and code = '0580 1.1b'), null),
('00000000-0000-0000-0000-000000000000', $qt$Evaluate \(\sqrt{144} - \sqrt[3]{8}\).$qt$, $opts$["10","12","14","4"]$opts$::jsonb, 0, $ex$\(\sqrt{144} = 12\) and \(\sqrt[3]{8} = 2\), so \(12 - 2 = 10\). 12 ignores the cube root; 14 adds the roots; 4 subtracts 8 instead of 2.$ex$, 'check', 301, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-arithmetic-and-place-value') and code = '0580 1.1c'), null),
('00000000-0000-0000-0000-000000000000', $qt$What is the reciprocal of \(\frac{2}{5}\)?$qt$, $opts$["\\(-\\frac{2}{5}\\)","\\(\\frac{2}{5}\\)","\\(\\frac{5}{2}\\)","\\(-\\frac{5}{2}\\)"]$opts$::jsonb, 2, $ex$Reciprocal flips the fraction to \(\frac{5}{2}\). Negating gives \(-\frac{2}{5}\); keeping it unchanged or flipping with a sign both fail.$ex$, 'check', 302, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-arithmetic-and-place-value') and code = '0580 1.1c'), null),
('00000000-0000-0000-0000-000000000000', $qt$Put in order, smallest first: 0.4, \(\frac{1}{3}\), 35%.$qt$, $opts$["0.4, 35%, \\(\\frac{1}{3}\\)","35%, \\(\\frac{1}{3}\\), 0.4","\\(\\frac{1}{3}\\), 0.4, 35%","\\(\\frac{1}{3}\\), 35%, 0.4"]$opts$::jsonb, 3, $ex$As decimals: 0.333..., 0.35, 0.4 — so \(\frac{1}{3}\), 35%, 0.4. The others misplace 35% against 0.4 or promote \(\frac{1}{3}\) above both.$ex$, 'check', 401, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-arithmetic-and-place-value') and code = '0580 1.5a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Which is largest: 0.6, \(\frac{3}{5}\), 58%, \(\frac{2}{3}\)?$qt$, $opts$["0.6","\\(\\frac{2}{3}\\)","58%","\\(\\frac{3}{5}\\)"]$opts$::jsonb, 1, $ex$\(\frac{2}{3} \approx 0.667\) beats 0.6 (= \(\frac{3}{5}\)) and 0.58. The equal pair 0.6 and \(\frac{3}{5}\) split votes but neither is largest.$ex$, 'check', 402, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-arithmetic-and-place-value') and code = '0580 1.5a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Evaluate \((-6) \times (-4) \div (-3)\).$qt$, $opts$["8","-8","72","-72"]$opts$::jsonb, 1, $ex$\((-6) \times (-4) = +24\), then \(24 \div (-3) = -8\). 8 drops the final sign; 72 multiplies all three magnitudes; -72 multiplies without dividing.$ex$, 'check', 501, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-arithmetic-and-place-value') and code = '0580 1.6a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Evaluate \(-15 + 7 - (-3)\).$qt$, $opts$["-25","-11","-5","5"]$opts$::jsonb, 2, $ex$Minus-negative adds: \(-15 + 7 + 3 = -5\). -25 compounds the signs; -11 keeps the minus (\(-15 + 7 - 3\)); 5 flips the final sign.$ex$, 'check', 502, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-arithmetic-and-place-value') and code = '0580 1.6a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Evaluate \(20 - 3 \times 4^2\).$qt$, $opts$["-28","272","68","8"]$opts$::jsonb, 0, $ex$Indices: 16. Multiplication: 48. Subtraction: \(20 - 48 = -28\). 272 computes \((20-3) \times 16\); 68 drops the square; 8 drops it differently (\(20 - 12\)).$ex$, 'check', 601, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-arithmetic-and-place-value') and code = '0580 1.6b'), null),
('00000000-0000-0000-0000-000000000000', $qt$Evaluate \(\frac{18+2}{7-2}\).$qt$, $opts$["5","10","20","4"]$opts$::jsonb, 3, $ex$Brackets first: \(\frac{20}{5}\), then \(20 \div 5 = 4\). 5 flips the division; 10 halves the numerator; 20 forgets to divide.$ex$, 'check', 602, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-arithmetic-and-place-value') and code = '0580 1.6b'), null),
('00000000-0000-0000-0000-000000000000', $qt$Round 0.04682 to 2 significant figures.$qt$, $opts$["0.05","0.04","0.047","0.046"]$opts$::jsonb, 2, $ex$First s.f. is 4; keep 4, 6, and 8 rounds 6 up: 0.047. 0.05 is 1 s.f.; 0.04 truncates; 0.046 is 2 decimal places, not 2 s.f.$ex$, 'check', 701, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-arithmetic-and-place-value') and code = '0580 1.9a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Estimate \(48.6 \times 19.3 \div 5.1\) to 1 significant figure.$qt$, $opts$["20","200","2000","180"]$opts$::jsonb, 1, $ex$\(50 \times 20 \div 5 = 200\). 20 and 2000 misplace by a factor of ten; 180 claims exact-computation precision instead of estimating.$ex$, 'check', 702, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-arithmetic-and-place-value') and code = '0580 1.9a'), null),
('00000000-0000-0000-0000-000000000000', $qt$A length is 4.3 m to 1 decimal place. What are its bounds?$qt$, $opts$["4.2 to 4.4","4.3 to 4.4","4.25 to 4.34","4.25 < or = x < 4.35"]$opts$::jsonb, 3, $ex$Half of 0.1 is 0.05: \(4.25 \le x < 4.35\). Full-unit ranges double the error; 4.34 undershoots the exclusive upper edge.$ex$, 'check', 801, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-arithmetic-and-place-value') and code = '0580 1.10a'), null),
('00000000-0000-0000-0000-000000000000', $qt$A mass is 70 kg to the nearest kilogram. What is its lower bound?$qt$, $opts$["69.5","69","70.5","69.9"]$opts$::jsonb, 0, $ex$Half of 1 kg below: 69.5 kg. 69 doubles the error; 70.5 is above the value; 69.9 invents a tighter precision.$ex$, 'check', 802, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-arithmetic-and-place-value') and code = '0580 1.10a'), null),
('00000000-0000-0000-0000-000000000000', $qt$x is 3.4 to 1 d.p. and y is 2 to the nearest integer. What is the maximum of x + y?$qt$, $opts$["4.85","5.95","5.9","4.95"]$opts$::jsonb, 1, $ex$Uppers add: \(3.45 + 2.5 = 5.95\). 4.85 adds the lowers (the minimum); 5.9 truncates the edge; 4.95 mixes upper with lower.$ex$, 'check', 901, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-arithmetic-and-place-value') and code = '0580 1.10b'), null),
('00000000-0000-0000-0000-000000000000', $qt$With the same bounds, what is the minimum of x − y?$qt$, $opts$["0.95","1.85","0.85","-0.15"]$opts$::jsonb, 2, $ex$Minimise by subtracting y's upper: \(3.35 - 2.5 = 0.85\). 0.95 uses x's upper; 1.85 subtracts y's lower; the negative reverses the inputs.$ex$, 'check', 902, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-arithmetic-and-place-value') and code = '0580 1.10b'), null),
('00000000-0000-0000-0000-000000000000', $qt$What is the best calculator route for \((38.4 - 12.6) \div (4.2 + 1.8)\)?$qt$, $opts$["Type both bracket pairs exactly as written","Key left to right, ignoring brackets","Work each bracket mentally, then divide by hand","Round every number to an integer first"]$opts$::jsonb, 0, $ex$Brackets typed as written preserve the order. Flat keying breaks precedence; mental working wastes the tool; early rounding corrupts the result.$ex$, 'check', 1001, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-arithmetic-and-place-value') and code = '0580 1.14a'), null),
('00000000-0000-0000-0000-000000000000', $qt$A calculator shows 3.14159265 for a length. Give it to 3 significant figures.$qt$, $opts$["3.142","3.14","3.141","3"]$opts$::jsonb, 1, $ex$3 s.f.: 3, 1, 4 (next digit 1, no round-up) — 3.14. 3.142 is 4 s.f.; 3.141 truncates at 4 s.f.; 3 is 1 s.f.$ex$, 'check', 1002, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-arithmetic-and-place-value') and code = '0580 1.14a'), null),
('00000000-0000-0000-0000-000000000000', $qt$A film starts at 19:45 and lasts 2 h 35 min. When does it end?$qt$, $opts$["21:20","22:15","22:20","22:80"]$opts$::jsonb, 2, $ex$19:45 + 2 h = 21:45, + 35 min = 22:20. 21:20 mis-adds; 22:15 slips five minutes; 22:80 forgets the base-60 carry.$ex$, 'check', 1101, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-arithmetic-and-place-value') and code = '0580 1.15a'), null),
('00000000-0000-0000-0000-000000000000', $qt$A bus leaves at 07:50 and arrives at 09:05. How long is the journey?$qt$, $opts$["1 h 45 min","2 h 15 min","1 h 55 min","1 h 15 min"]$opts$::jsonb, 3, $ex$07:50 to 09:05 is 10 min + 1 h + 5 min = 1 h 15 min. The others mis-subtract the minutes across the hour.$ex$, 'check', 1102, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-arithmetic-and-place-value') and code = '0580 1.15a'), null),
('00000000-0000-0000-0000-000000000000', $qt$£1 = $1.27. How many dollars is £350?$qt$, $opts$["$275.59","$350.00","$127.00","$444.50"]$opts$::jsonb, 3, $ex$\(350 \times 1.27 = 444.50\). $275.59 divides (wrong direction); the others ignore the rate or the amount.$ex$, 'check', 1201, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-arithmetic-and-place-value') and code = '0580 1.16a'), null),
('00000000-0000-0000-0000-000000000000', $qt$3 shirts at £18.99 each are bought with £60. What change is given?$qt$, $opts$["£3.03","£3.97","£4.03","£3.30"]$opts$::jsonb, 0, $ex$Total \(3 \times 18.99 = 56.97\); change \(60 - 56.97 = 3.03\). The others mis-multiply or mis-subtract the pence.$ex$, 'check', 1202, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-arithmetic-and-place-value') and code = '0580 1.16a'), null),
('00000000-0000-0000-0000-000000000000', $qt$A rectangle measures 12.4 cm by 7.6 cm, both to 1 d.p. Find the maximum possible area.$qt$, $opts$["94.24","95.2425","93.2425","95.25"]$opts$::jsonb, 1, $ex$Marks as awarded: upper bounds 12.45 and 7.65 identified [1]; multiplied to 95.2425 [1]. 94.24 ignores bounds; 93.2425 is the minimum; 95.25 rounds an edge prematurely.$ex$, 'exam', 900, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-arithmetic-and-place-value') and code = '0580 1.10b'), (select id from public.syllabus_statements where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-arithmetic-and-place-value') and code = '1.10')),
('00000000-0000-0000-0000-000000000000', $qt$Two lights flash every 12 s and 18 s, together at noon. When do they next flash together?$qt$, $opts$["12:00:30","12:03:36","12:00:36","12:01:06"]$opts$::jsonb, 2, $ex$Marks as awarded: LCM from \(2^2 \times 3\) and \(2 \times 3^2\) is 36 [1]; 36 seconds after noon [1]. 30 fits neither cycle; 216 s is the product (not lowest); 66 s fits nothing.$ex$, 'exam', 901, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-arithmetic-and-place-value') and code = '0580 1.1b'), (select id from public.syllabus_statements where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'number-arithmetic-and-place-value') and code = '1.1'));
