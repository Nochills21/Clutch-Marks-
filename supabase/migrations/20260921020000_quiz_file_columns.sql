-- quizzes.exam_file_url / correction_file_url existed in the app migrations and the
-- client writes them (AdminQuizzes.tsx, Quizzes.tsx) but were missing from the live DB,
-- so every exam-file attachment silently failed with a 400 on save.
alter table public.quizzes add column if not exists exam_file_url text;
alter table public.quizzes add column if not exists correction_file_url text;
