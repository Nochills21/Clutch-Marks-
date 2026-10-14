insert into public.questions
  (quiz_id, question_text, options, correct_option, explanation, difficulty, sort_order, objective_id, statement_id)
values
('7f4d06f0-65ba-431f-9e1d-fb3d7e80757f', $qt$Sample exam question text here?$qt$, $opts$["A","B","C","D"]$opts$::jsonb, 1, $ex$Explanation text here for length testing purposes only and longer.$ex$, 'exam', 900, (select id from public.learning_objectives where code = '0478 7b'), (select id from public.syllabus_statements where code = '7'));
