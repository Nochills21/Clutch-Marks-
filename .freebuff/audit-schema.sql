select table_name, string_agg(column_name || ' ' || data_type, ', ' order by ordinal_position) as cols
from information_schema.columns
where table_schema = 'public'
  and table_name in ('questions','study_materials','flashcards','flashcard_sets','topics','learning_objectives')
group by table_name
order by table_name;
