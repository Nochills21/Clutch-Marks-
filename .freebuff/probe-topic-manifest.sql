select json_agg(x order by x.subject_name, x.level, x.sort_order)::text as manifest
from (
  select s.slug as subject_slug, s.name as subject_name, sl.level as level,
         t.slug as topic_slug, t.name as topic_name, t.sort_order
  from topics t
  join subject_levels sl on sl.id = t.subject_level_id
  join subjects s on s.id = sl.subject_id
  where coalesce(t.slug,'') <> '' and coalesce(s.slug,'') <> ''
) x;
