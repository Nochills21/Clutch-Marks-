-- Repair 4 broken questions in "Practice — Algebra — Equations" (maths OL).
-- Found by manual review 2026-10-12: keys pointing at wrong answers,
-- correct answers absent from the options, and an explanation describing
-- working for a different system of equations.
update public.questions
   set explanation = 'Halve the second equation to get x - y = 1, then add it to x + y = 7: 2x = 8, so x = 4; substituting back gives y = 3. The other options fail one or both equations.'
 where id = '350784cc-e3bd-4655-9fc1-0195c97e1405';
update public.questions
   set options = '["$425", "$445", "$450", "$462.5"]',
       explanation = 'Let x be the number of white bread loaves, then x + 30 is the number of whole wheat loaves, so x + (x + 30) = 250, giving 2x = 220, so x = 110, then the profit is 110*$1.5 + 140*$2 = $165 + $280 = $445, the other options have incorrect calculations or assumptions.'
 where id = '5cfd130c-eb20-4055-88fc-d955d311ddd4';
update public.questions
   set options = '["x = 1 + √7 or x = 1 - √7", "x = -1 + √5 or x = -1 - √5", "x = -1 + √7 or x = -1 - √7", "x = -2 + √7 or x = -2 - √7"]',
       explanation = 'Completing the square: x^2 + 2x + 1 = 7, so (x + 1)^2 = 7 and x = -1 ± √7. The other options use the wrong constant or the wrong sign.'
 where id = 'b43c1eec-140e-4f84-96d6-5929c6274eb3';
update public.questions
   set options = '["$20, $30, $50", "$30, $40, $50", "$40, $60, $80", "$20, $40, $60"]',
       correct_option = 0
 where id = 'b613906c-01b2-496d-ae95-8e32c0ad70be';
