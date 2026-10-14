-- Verified answer-key defect: solving 3(x + 2) = 2(x + 5) gives x = 4,
-- but the live key points at x = 6. Guard the exact current row before correction.
DO $$
DECLARE changed integer;
BEGIN
  UPDATE public.questions
     SET correct_option = 2,
         explanation = 'Expand both sides: 3x+6=2x+10. Subtract 2x to get x+6=10, then subtract 6 to obtain x=4. Substitution confirms 3(4+2)=18=2(4+5); x=6 does not satisfy the equation.'
   WHERE id = '3ab1f0d2-c5fa-4bb6-9e41-cd5ec49eefa4'
     AND question_text = 'Solve 3(x + 2) = 2(x + 5)'
     AND correct_option = 3
     AND options ->> 3 = 'x = 6'
     AND options ->> 2 = 'x = 4'
     AND explanation = '3x + 6 = 2x + 10 → x = 4.';
  GET DIAGNOSTICS changed = ROW_COUNT;
  IF changed <> 1 THEN
    RAISE EXCEPTION 'Equation answer-key guard failed';
  END IF;
END
$$;
