select
  count(*) filter (where material_type='notes') as notes_total,
  count(*) filter (where material_type='notes' and length(content) < 200) as notes_under_200,
  count(*) filter (where material_type='notes' and length(content) < 200 and file_url is not null) as short_with_file,
  count(*) filter (where material_type='notes' and length(content) < 200 and file_url is null) as short_no_file,
  count(*) filter (where material_type='notes' and length(content) >= 200) as notes_with_body
from public.study_materials;
