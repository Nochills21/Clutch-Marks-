-- Read-only. The guard probe inserts into these tables; it must satisfy every
-- NOT NULL or it would fail with not_null_violation instead of the
-- check_violation it is hunting for.
select c.table_name, c.column_name, c.is_nullable, c.column_default
  from information_schema.columns c
 where c.table_schema = 'public'
   and c.table_name in ('questions', 'announcements', 'admin_audit_log', 'topics', 'quizzes',
                        'lessons', 'study_materials', 'flashcards', 'flashcard_sets', 'past_papers')
   and c.is_nullable = 'NO'
 order by c.table_name, c.column_name;
