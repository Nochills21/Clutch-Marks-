select column_name, data_type
from information_schema.columns
where table_schema = 'public' and table_name = 'syllabus_statements'
order by ordinal_position;
