-- What the crawler-facing catalogue actually looks like.
select 'subjects' as what, count(*)::text as n from subjects
union all select 'subject_levels', count(*)::text from subject_levels
union all select 'topics', count(*)::text from topics
union all select 'topics_without_slug', count(*)::text from topics where coalesce(trim(slug),'') = ''
union all select 'lessons', count(*)::text from lessons
union all select 'quizzes_published', count(*)::text from quizzes where is_published
union all select 'past_papers', count(*)::text from past_papers
union all select 'study_materials_notes', count(*)::text from study_materials where material_type in ('notes','note');

-- Per subject-level topic counts (this is the size of the real sitemap).
select s.slug as subject_slug, sl.level, count(t.id) as topics
from subjects s
join subject_levels sl on sl.subject_id = s.id
left join topics t on t.subject_level_id = sl.id
group by s.slug, sl.level
order by s.slug, sl.level;

-- RLS: can anon read the catalogue tables that the topic pages join?
select tablename, rowsecurity from pg_tables
where schemaname = 'public' and tablename in ('subjects','subject_levels','topics','lessons','quizzes','past_papers','study_materials')
order by tablename;

select tablename, policyname, roles::text, cmd
from pg_policies
where schemaname = 'public'
  and tablename in ('subjects','subject_levels','topics','lessons','quizzes','past_papers','study_materials')
order by tablename, policyname;
