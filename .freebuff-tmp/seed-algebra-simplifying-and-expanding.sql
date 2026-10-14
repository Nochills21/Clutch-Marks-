insert into public.learning_objectives (topic_id, code, statement, teach, sort_order)
values
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-simplifying-and-expanding'), '0580 2.1a', $st$Simplify expressions by collecting like terms, keeping powers separate.$st$, $teach$### What is being asked
Tidy an expression into fewest terms. The answer groups by exact letter-and-power — \(x\), \(x^2\) and constants never merge.

### Method
1. Sort terms into families: \(x\) with \(x\), \(x^2\) with \(x^2\), numbers with numbers.
2. Add each family's coefficients, signs attached: \(4x - 2x = 2x\).
3. Unlike terms stay separate: \(2x + 10y\) is finished, not a sum to force.
4. Check by substituting a value (\(x = 2\)) into both original and answer — they must agree.

### Worked example
\(4x + 3y - 2x + 7y\): \(x\)-family \(4x - 2x = 2x\); \(y\)-family \(3y + 7y = 10y\); answer \(2x + 10y\). Check with \(x = 1\), \(y = 1\): original \(4 + 3 - 2 + 7 = 12\), answer \(2 + 10 = 12\) — families agree.

### Traps
- Merging unlike powers. \(5a^2 + 3a\) cannot combine — the exponent is part of the identity.
- Sign dropped from its term. \(-2x\) carries its minus everywhere; orphaning it flips the total.
- Multiplying where addition rules. \(2x + 10y\) is not \(12xy\) — plus never multiplies.
- Constants absorbed into letters. The lone 4 in \(3a^2 + 3a + 4\) stands alone to the end.

### Timing
Short answers: 1-2 minutes each. Family-sort first, substitute-check to close.$teach$, 1),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-simplifying-and-expanding'), '0580 2.2a', $st$Expand single and double brackets, combining the middle terms correctly.$st$, $teach$### What is being asked
Multiply brackets out. The answer hits every pairing — single brackets touch all inside, double brackets pair each with each.

### Method
1. Single: multiply the outside term by EVERYTHING inside: \(3(x + 4) = 3x + 12\).
2. Double (FOIL): First, Outside, Inside, Last: \((x + 3)(x + 5) = x^2 + 5x + 3x + 15\).
3. Combine the middle pair: \(5x + 3x = 8x\), giving \(x^2 + 8x + 15\).
4. Check by substituting (\(x = 1\): \(4 \times 6 = 24\) and \(1 + 8 + 15 = 24\)).

### Worked example
\((x + 3)(x + 5)\): \(x \cdot x = x^2\), \(x \cdot 5 = 5x\), \(3 \cdot x = 3x\), \(3 \cdot 5 = 15\) — combined: \(x^2 + 8x + 15\). Check at \(x = 2\): \(5 \times 7 = 35\) and \(4 + 16 + 15 = 35\) — all four pairings verified.

### Traps
- Outside term skipping one. \(3(x + 4) = 3x + 4\) leaves the 4 unmultiplied — every inside term gets hit.
- Middle terms uncombined. \(x^2 + 5x + 3x + 15\) is half-done — the \(8x\) is a mark.
- Signs in FOIL. \((x - 3)(x + 5)\) gives \(-3x + 5x\), not \(\pm 8x\) — carry each sign into its product.
- Squaring instead of pairing. \((x + 3)^2 = x^2 + 6x + 9\), not \(x^2 + 9\) — write both brackets out.

### Timing
Short answers: 2 minutes, 2 marks. Four products listed (a mark), combined form (a mark).$teach$, 2),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-simplifying-and-expanding'), '0580 2.2b', $st$Factorise expressions fully, including quadratics of the form x² + bx + c.$st$, $teach$### What is being asked
Reverse the expansion: pull out common factors, or split a quadratic into two brackets. The answer expands back to the question — always re-expand to check.

### Method
1. Common factor first: \(6x^2 + 9x = 3x(2x + 3)\) — the HCF of ALL terms, letters included.
2. Quadratics \(x^2 + bx + c\): find two numbers multiplying to \(c\) and adding to \(b\). For \(x^2 + 7x + 12\): 3 and 4, so \((x + 3)(x + 4)\).
3. Signs decide the pair's signs: \(c\) positive means same signs (both follow \(b\)); \(c\) negative means opposite signs.
4. Re-expand every answer — factorisation that doesn't rebuild is wrong, visibly.

### Worked example
\(x^2 + 7x + 12\): need multiply-to-12, add-to-7 → 3 and 4, both positive: \((x + 3)(x + 4)\). Check: \(x^2 + 4x + 3x + 12 = x^2 + 7x + 12\) — the middle and constant both rebuild.

### Traps
- Partial factorising. \(3(2x^2 + 3x)\) still shares \(x\) — fully means nothing common remains.
- Pair adding to \(c\). The pair ADDS to \(b\) and MULTIPLIES to \(c\) — swapping the targets picks wrong numbers.
- Signs guessed. \(x^2 - 5x + 6\) needs \((x - 2)(x - 3)\), not plus-brackets — negative \(b\) with positive \(c\) means both minus.
- Stopping at one bracket. Quadratics need two — a single bracket answers a different question.

### Timing
Short answers: 2-3 minutes, 2-3 marks. Common factor (a mark), correct pair (a mark), re-expansion habit free.$teach$, 3),
((select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-simplifying-and-expanding'), '0580 2.3a', $st$Simplify algebraic fractions by factorising and cancelling common factors (Extended only).$st$, $teach$### What is being asked
Reduce a fraction with algebra top and bottom. The answer factorises FIRST, then cancels whole bracket-factors — never terms. (Extended only.)

### Method
1. Factorise numerator and denominator separately: \(x^2 - 9 = (x + 3)(x - 3)\).
2. Cancel factors appearing top AND bottom: \(\frac{(x+3)(x-3)}{x+3} = x - 3\).
3. Adding fractions needs a common denominator first: \(\frac{2x}{3} + \frac{x}{4} = \frac{8x + 3x}{12} = \frac{11x}{12}\).
4. Check by substituting (\(x = 1\)) into original and answer — both must agree.

### Worked example
\(\frac{x^2 - 9}{x + 3}\): factor to \(\frac{(x+3)(x-3)}{x+3}\), cancel \((x + 3)\), leaving \(x - 3\). Check at \(x = 1\): original \(\frac{-8}{4} = -2\), answer \(1 - 3 = -2\) — cancellation verified.

### Traps
- Cancelling terms. \(\frac{x+3}{x}\) cannot drop the x's — only FACTORS cancel, never added terms.
- Skipping factorisation. \(x^2 - 9\) hides \((x+3)(x-3)\) — cancelling before factoring misses it entirely.
- Adding denominators. \(\frac{2x}{3} + \frac{x}{4}\) needs twelfths — denominators never add. (Extended only.)
- Sign errors in subtraction. \(\frac{8x - 3x}{12} = \frac{5x}{12}\) — the minus distributes to the whole second numerator.

### Timing
Short answers: 2-3 minutes, 2-3 marks. Factorised form (a mark), cancelled form (a mark).$teach$, 4)
on conflict (topic_id, code) do update set
  statement = excluded.statement,
  teach = excluded.teach,
  sort_order = excluded.sort_order;
delete from public.quizzes
 where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-simplifying-and-expanding') and title = 'Checkpoints — Simplifying & Expanding';
insert into public.quizzes (id, topic_id, title, description, is_published, exam_type)
values ('00000000-0000-0000-0000-000000000000', (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-simplifying-and-expanding'), 'Checkpoints — Simplifying & Expanding', $desc$Short checks, one set per objective in this topic. Answer one wrongly and the objective it belongs to is the thing to revisit — not the whole topic.$desc$, true, 'quiz');
insert into public.questions
  (quiz_id, question_text, options, correct_option, explanation, difficulty, sort_order, objective_id, statement_id)
values
('00000000-0000-0000-0000-000000000000', $qt$Simplify \(4x + 3y - 2x + 7y\).$qt$, $opts$["\\(6x + 10y\\)","\\(2x + 10y\\)","\\(2x + 4y\\)","\\(12xy\\)"]$opts$::jsonb, 1, $ex$\(x\): \(4 - 2 = 2\); \(y\): \(3 + 7 = 10\). The first keeps all four x's; the third mis-adds y's; the last multiplies across a plus.$ex$, 'check', 101, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-simplifying-and-expanding') and code = '0580 2.1a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Simplify \(5a^2 + 3a - 2a^2 + 4\).$qt$, $opts$["\\(3a^2 + 7a + 4\\)","\\(3a^2 - a + 4\\)","\\(8a^2 + 4\\)","\\(3a^2 + 3a + 4\\)"]$opts$::jsonb, 3, $ex$\(a^2\): \(5 - 2 = 3\); \(a\): +3; constant 4. The first mis-adds the a terms; the second flips a sign; the third merges unlike powers.$ex$, 'check', 102, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-simplifying-and-expanding') and code = '0580 2.1a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Expand \(3(x + 4)\).$qt$, $opts$["\\(3x + 12\\)","\\(3x + 4\\)","\\(x + 12\\)","\\(3x + 7\\)"]$opts$::jsonb, 0, $ex$3 multiplies both terms: \(3x + 12\). The second skips the 4; the third skips the x; the last adds instead of multiplying.$ex$, 'check', 201, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-simplifying-and-expanding') and code = '0580 2.2a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Expand \((x + 3)(x + 5)\).$qt$, $opts$["\\(x^2 + 15\\)","\\(x^2 + 8\\)","\\(x^2 + 8x + 15\\)","\\(x^2 + 6x + 8\\)"]$opts$::jsonb, 2, $ex$FOIL gives \(x^2 + 5x + 3x + 15 = x^2 + 8x + 15\). The first two drop the middle terms; the last mis-pairs the constants.$ex$, 'check', 202, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-simplifying-and-expanding') and code = '0580 2.2a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Factorise \(x^2 + 7x + 12\).$qt$, $opts$["\\((x + 6)(x + 2)\\)","\\((x + 12)(x + 1)\\)","\\((x + 3)(x + 4)\\)","\\((x - 3)(x - 4)\\)"]$opts$::jsonb, 2, $ex$3 × 4 = 12 and 3 + 4 = 7. The first gives +8x; the second +13x; the last gives −7x.$ex$, 'check', 301, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-simplifying-and-expanding') and code = '0580 2.2b'), null),
('00000000-0000-0000-0000-000000000000', $qt$Factorise \(6x^2 + 9x\) fully.$qt$, $opts$["\\(3(2x^2 + 3x)\\)","\\(3x(2x + 3)\\)","\\(x(6x + 9)\\)","\\(3x(x + 3)\\)"]$opts$::jsonb, 1, $ex$HCF is 3x: \(3x(2x + 3)\). The first leaves x common; the third leaves 3; the last expands to \(3x^2 + 9x\).$ex$, 'check', 302, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-simplifying-and-expanding') and code = '0580 2.2b'), null),
('00000000-0000-0000-0000-000000000000', $qt$Simplify \(\frac{x^2 - 9}{x + 3}\).$qt$, $opts$["\\(x + 3\\)","\\(x^2 - 3\\)","\\(x - 6\\)","\\(x - 3\\)"]$opts$::jsonb, 3, $ex$Factor: \(\frac{(x+3)(x-3)}{x+3}\); cancel: \(x - 3\). The first inverts the cancellation; the others skip factorising.$ex$, 'check', 401, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-simplifying-and-expanding') and code = '0580 2.3a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Simplify \(\frac{2x}{3} + \frac{x}{4}\).$qt$, $opts$["\\(\\frac{11x}{12}\\)","\\(\\frac{3x}{7}\\)","\\(\\frac{11x}{7}\\)","\\(\\frac{5x}{12}\\)"]$opts$::jsonb, 0, $ex$Common denominator 12: \(\frac{8x + 3x}{12} = \frac{11x}{12}\). The middle options add denominators; the last mis-adds numerators.$ex$, 'check', 402, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-simplifying-and-expanding') and code = '0580 2.3a'), null),
('00000000-0000-0000-0000-000000000000', $qt$Solve \(x^2 - 5x + 6 = 0\).$qt$, $opts$["\\(x = -2\\) or \\(x = -3\\)","\\(x = 2\\) or \\(x = 3\\)","\\(x = 1\\) or \\(x = 6\\)","\\(x = 5\\) or \\(x = 6\\)"]$opts$::jsonb, 1, $ex$Marks as awarded: factorised to (x − 2)(x − 3) [1]; roots 2 and 3 [1]. Negatives flip both signs; 1 and 6 multiply to 6 but add to 7; 5 and 6 mis-read the coefficients.$ex$, 'exam', 900, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-simplifying-and-expanding') and code = '0580 2.2b'), (select id from public.syllabus_statements where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-simplifying-and-expanding') and code = '2.2')),
('00000000-0000-0000-0000-000000000000', $qt$Simplify \(\frac{x^2 + 2x}{x^2 - 4}\).$qt$, $opts$["\\(x + 2\\)","\\(\\frac{x}{4}\\)","\\(\\frac{x}{x - 2}\\)","\\(\\frac{2}{x - 2}\\)"]$opts$::jsonb, 2, $ex$Marks as awarded: factored to \(\frac{x(x+2)}{(x+2)(x-2)}\) [1]; cancelled to \(\frac{x}{x-2}\) [1]. The first cancels terms illegally; the second drops factors; the last loses the x.$ex$, 'exam', 901, (select id from public.learning_objectives where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-simplifying-and-expanding') and code = '0580 2.3a'), (select id from public.syllabus_statements where topic_id = (select t.id from public.topics t
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where s.slug = 'mathematics' and sl.level = 'OL' and t.slug = 'algebra-simplifying-and-expanding') and code = '2.3'));
