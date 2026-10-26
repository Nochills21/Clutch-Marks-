-- Read-only inventory of the live content estate.
select
  (select count(*) from public.topics)                                   as topics,
  (select count(*) from public.questions)                                as questions,
  (select count(*) from public.quizzes)                                 as quizzes,
  (select count(*) from public.study_materials)                         as materials,
  (select count(*) from public.flashcards)                              as flashcards,
  (select count(*) from public.flashcard_sets)                          as flashcard_sets,
  (select count(*) from public.learning_objectives)                     as objectives,
  (select count(*) from public.syllabus_statements)                     as statements,
  (select count(*) from public.past_papers)                             as past_papers;
