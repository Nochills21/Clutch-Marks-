-- Every `summary` material next to the notes for the same topic (read-only).
--
-- A summary is a map of the topic, not a second set of notes. The A2 Biology
-- coordination summary shipped at 33,366 characters against 39,731 of notes —
-- 84% — so the two cards on the topic page opened nearly the same document; it
-- was rewritten to 8,378 (21%, one <h3> per specification statement 8.1–8.22).
--
-- The verdict is about size, not only ratio: a 1,300-character summary of a
-- 3,500-character note is a third of it and perfectly fine, while a 26,000-
-- character "summary" is a second note however the ratio reads. So anything
-- over 10,000 characters is flagged, as is anything longer than its own notes.
select
  s.slug as subject,
  sl.level::text as level,
  t.slug as topic,
  m.material_type,
  length(n.content) as notes_len,
  length(m.content) as summary_len,
  round(100.0 * length(m.content) / nullif(length(n.content), 0)) as pct_of_notes,
  case
    when n.content is null then 'no notes row'
    when length(m.content) > length(n.content) then 'longer than its notes'
    when length(m.content) > 10000 then 'second note'
    else 'summary'
  end as verdict,
  length(m.title) as title_len,
  left(m.title, 80) as title
from public.study_materials m
join public.topics t on t.id = m.topic_id
join public.subject_levels sl on sl.id = t.subject_level_id
join public.subjects s on s.id = sl.subject_id
left join public.study_materials n
  on n.topic_id = m.topic_id
 and n.material_type = 'notes'
where m.material_type in ('summary', 'summary_notes')
order by pct_of_notes desc nulls last, s.slug, sl.level;
