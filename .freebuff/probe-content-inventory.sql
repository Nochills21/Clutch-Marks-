select
  sub.slug                                  as subject,
  lvl.level::text                           as level,
  count(distinct t.id)                      as topics,
  sum(coalesce(q.n, 0))                     as questions,
  min(coalesce(q.n, 0))                     as q_min,
  round(avg(coalesce(q.n, 0)))              as q_avg,
  max(coalesce(q.n, 0))                     as q_max,
  sum(coalesce(q.exam, 0))                  as exam_tier,
  sum(coalesce(q.drill, 0))                 as drill_tier,
  sum(case when m.notes then 1 else 0 end)  as with_notes,
  sum(case when m.technique then 1 else 0 end) as with_technique,
  sum(coalesce(ss.n, 0))                    as statements,
  sum(coalesce(ss.mapped, 0))               as statements_mapped
from public.topics t
join public.subject_levels lvl on lvl.id = t.subject_level_id
join public.subjects sub on sub.id = lvl.subject_id
left join lateral (
  select count(*)::int as n,
         count(*) filter (where q2.difficulty = 'exam')::int as exam,
         count(*) filter (where q2.difficulty = 'drill')::int as drill
    from public.questions q2
    join public.quizzes z2 on z2.id = q2.quiz_id
   where z2.topic_id = t.id
) q on true
left join lateral (
  select bool_or(m2.material_type = 'notes' and length(coalesce(m2.content,'')) >= 1000) as notes,
         bool_or(lower(replace(coalesce(m2.material_type,''),'_','-')) = 'exam-technique') as technique
    from public.study_materials m2
   where m2.topic_id = t.id
) m on true
left join lateral (
  select count(*)::int as n, count(*) filter (where s2.topic_id is not null)::int as mapped
    from public.syllabus_statements s2
   where s2.subject_level_id = lvl.id
) ss on true
group by sub.slug, lvl.level
order by sub.slug, lvl.level;
