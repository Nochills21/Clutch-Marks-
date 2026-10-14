select s.slug as subject_slug, sl.level, count(t.id)::int as topics,
       count(*) filter (where exists (select 1 from lessons l where l.topic_id = t.id))::int as with_lessons,
       count(*) filter (where exists (select 1 from study_materials m where m.topic_id = t.id and m.material_type in ('notes','note')))::int as with_notes,
       count(*) filter (where exists (select 1 from quizzes q where q.topic_id = t.id and q.is_published))::int as with_quiz,
       count(*) filter (where exists (select 1 from past_papers p where p.topic_id = t.id))::int as with_papers
from subjects s
join subject_levels sl on sl.subject_id = s.id
left join topics t on t.subject_level_id = sl.id
group by s.slug, sl.level
order by s.slug, sl.level;
