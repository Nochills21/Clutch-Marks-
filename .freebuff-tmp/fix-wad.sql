update public.questions
set question_text = 'What is the denary value of the binary number 1011?',
    options = '["9", "10", "11", "13"]'::jsonb,
    correct_option = 2,
    explanation = '1011 in binary is 1×8 + 0×4 + 1×2 + 1×1 = 11. The 9 option is 1001 in binary, which is a different number.'
where id = 'f3574328-ff25-49db-a43c-083505e41a1e'
  and question_text = 'WAD stands for:';
