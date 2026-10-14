select 1 as ord, 'subjects' as what, count(*)::int as n from subjects
union all select 2, 'subject_levels', count(*)::int from subject_levels
union all select 3, 'topics', count(*)::int from topics
union all select 4, 'topics_without_slug', count(*)::int from topics where coalesce(trim(slug),'') = ''
union all select 5, 'lessons', count(*)::int from lessons
union all select 6, 'quizzes_published', count(*)::int from quizzes where is_published
union all select 7, 'past_papers', count(*)::int from past_papers
union all select 8, 'notes_materials', count(*)::int from study_materials where material_type in ('notes','note')
order by ord;
