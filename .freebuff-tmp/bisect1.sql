insert into public.questions
  (quiz_id, question_text, options, correct_option, explanation, difficulty, sort_order, objective_id, statement_id)
values
('7f4d06f0-65ba-431f-9e1d-fb3d7e80757f', $qt$In a flowchart, which shape represents a decision?$qt$, $opts$["A","B","C","D"]$opts$::jsonb, 3, $ex$Explanation text here for length testing purposes only.$ex$, 'check', 102, (select id from public.learning_objectives where code = '0478 7a'), null);
