select t.slug, t.name, t.sort_order, sl.level::text as level, s.name as subject,
 (select count(*) from syllabus_statements st where st.topic_id = t.id) as statements,
 (select count(*) from flashcards f join flashcard_sets fs on fs.id = f.set_id where fs.topic_id = t.id) as flashcards
from topics t
join subject_levels sl on sl.id = t.subject_level_id
join subjects s on s.id = sl.subject_id
where s.name ilike '%physics%' and sl.level::text ilike '%as%'
order by t.sort_order nulls last, t.slug;
