select 'q' as kind, t.slug, sl.level::text as lvl, q.created_at::text as created, left(q.question_text,70) as info
from questions q join quizzes z on z.id=q.quiz_id join topics t on t.id=z.topic_id join subject_levels sl on sl.id=t.subject_level_id
where t.id in ('9c985dc8-bbb0-4506-9dfc-2f49b774fc24','52889198-3121-4be7-8cd7-e3bd37e97430') and q.created_at > now() - interval '3 hours'
union all
select 'fs', t.slug, sl.level::text, fs.created_at::text, coalesce(fs.title,'') || ' | ' || coalesce(fs.description,'')
from flashcard_sets fs join topics t on t.id=fs.topic_id join subject_levels sl on sl.id=t.subject_level_id
where t.id in ('9c985dc8-bbb0-4506-9dfc-2f49b774fc24','52889198-3121-4be7-8cd7-e3bd37e97430') and fs.created_at > now() - interval '3 hours'
order by 1, 4;
