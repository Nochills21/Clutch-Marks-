ALTER TABLE public.homework_submissions ADD COLUMN IF NOT EXISTS correction_file_url text;

ALTER TABLE public.quiz_attempts ADD COLUMN IF NOT EXISTS submission_file_url text;
ALTER TABLE public.quiz_attempts ADD COLUMN IF NOT EXISTS correction_file_url text;