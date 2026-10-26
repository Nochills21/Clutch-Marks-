-- Recount with a plain '^<' test (the earlier \s version matched nothing).
select material_type,
       count(*) as total,
       count(*) filter (where content ~ '^\s*<') as html_shaped,
       count(*) filter (where content ~ '^\s*<' and content ~ '(^|\n)### ') as html_with_md_heading,
       count(*) filter (where content ~ '###') as any_hash_at_all
from study_materials
where content is not null
group by material_type
order by total desc;
