-- Is the homepage FAQ answer true for every subject?
--
-- The answer the site publishes (and emits as FAQPage structured data) says
-- every subject has topic notes, exam-style questions and a past-paper archive.
-- Read-only: counts what each subject/level actually has.
select
  s.slug as subject,
  sl.level::text as level,
  (select count(*) from public.topics t where t.subject_level_id = sl.id) as topics,
  (select count(*) from public.study_materials m
     join public.topics t on t.id = m.topic_id
    where t.subject_level_id = sl.id
      and coalesce(m.material_type, '') in ('notes', 'note', 'summary')) as note_rows,
  (select count(*) from public.questions q
     join public.quizzes z on z.id = q.quiz_id
     join public.topics t on t.id = z.topic_id
    where t.subject_level_id = sl.id) as questions,
  (select count(*) from public.past_papers p
    where p.subject_slug = s.slug and p.level::text = sl.level::text) as paper_files
from public.subjects s
join public.subject_levels sl on sl.subject_id = s.id
where sl.is_active
order by s.slug, sl.level;
