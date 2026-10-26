select id, title
from study_materials
where material_type = 'summary'
  and content ~ '^\s*<'
  and content ~ '(^|\n)### '
order by title
limit 3;
