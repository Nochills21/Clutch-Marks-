select column_name, data_type, is_nullable, coalesce(column_default, '-') as dflt
from information_schema.columns
where table_schema = 'public' and table_name = 'study_materials'
order by ordinal_position;
