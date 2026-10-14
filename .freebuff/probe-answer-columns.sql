-- Read-only. Is `questions.correct_option` the only stored option index? Any
-- other integer column holding "which option was chosen" would need the same
-- in-range guard.
select c.table_name, c.column_name, c.data_type, c.is_nullable, c.column_default
  from information_schema.columns c
 where c.table_schema = 'public'
   and c.data_type in ('integer', 'smallint', 'bigint')
   and c.table_name in ('questions', 'practice_attempts', 'quiz_attempts', 'question_bookmarks',
                        'past_paper_attempts', 'homework_submissions', 'ai_correction')
 order by c.table_name, c.column_name;
