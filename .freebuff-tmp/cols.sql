select table_name, string_agg(column_name || ':' || data_type || case when is_nullable='NO' then ' not null' else '' end, ', ' order by ordinal_position) as cols
from information_schema.columns
where table_schema='public' and table_name in ('subjects','subject_levels','topics','study_materials','quizzes','questions','flashcard_sets','flashcards','topic_objectives','learning_objectives','syllabus_statements')
group by table_name;
