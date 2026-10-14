-- Replace one verified flawed IGCSE OL algebra exam item.
-- The old stem used differentiation, which is outside 0580, and named a minimum
-- at x=-3/4 even though units produced must be non-negative. This version tests
-- completing the square, a valid 0580 method; its minimum on x>=0 is at x=0.
-- Prepared against live row 5d32db73-aaff-4a61-a870-2e1b4437e921; dry-run first.
BEGIN;
UPDATE public.questions
   SET question_text = 'For x >= 0, a company models its cost by C(x) = 2x^2 + 3x + 4. What is the minimum possible value of C(x)?',
       options = to_jsonb(ARRAY['$4, at x = 0', '$23/8, at x = -3/4', '$3, at x = 0', '$2, at x = 0']::text[]),
       correct_option = 0,
       explanation = 'Complete the square: C(x) = 2(x + 3/4)^2 + 23/8. Since x >= 0, x + 3/4 >= 3/4, so C(x) >= 2(3/4)^2 + 23/8 = 4. Equality occurs at x = 0. The vertex x = -3/4 lies outside the allowed domain, so 23/8 is not an attainable minimum.'
 WHERE id = '5d32db73-aaff-4a61-a870-2e1b4437e921'
   AND question_text = 'A company has a cost function C(x) = 2x^2 + 3x + 4, where x is the number of units produced. Find the minimum cost'
RETURNING id;
-- Rollback dry-run default: apply-sql-file.cjs wraps this file in a transaction.
COMMIT;
