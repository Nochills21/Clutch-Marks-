select s.slug as subject, sl.level::text as level, t.slug as topic, count(st.id) as statements
from public.topics t
join public.subject_levels sl on sl.id = t.subject_level_id
join public.subjects s on s.id = sl.subject_id
left join public.syllabus_statements st on st.topic_id = t.id
where (s.slug, sl.level::text) in (('computer-science','OL'),('physics','OL'),('biology','OL'),('mathematics','OL'),('mathematics','AS'),('physics','AS'))
group by s.slug, sl.level, t.slug
order by s.slug, sl.level, t.slug;
