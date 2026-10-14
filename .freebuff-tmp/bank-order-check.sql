with ranked as (
  select z.title, z.is_ai_generated, q.id,
         row_number() over (order by z.title, q.sort_order) as rn
  from public.questions q join public.quizzes z on z.id = q.quiz_id
  join public.topics t on t.id = z.topic_id
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = 'mathematics' and sl.level = 'OL' and z.is_published
)
select count(*) as total, count(*) filter (where is_ai_generated) as ai_total,
  min(rn) filter (where is_ai_generated) as first_ai_row,
  max(rn) filter (where not is_ai_generated) as last_plain_row from ranked;
