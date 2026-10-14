-- lessons.content is HTML, so the note reads `x &lt; 4`, not `x < 4`.
with hit as (
  select id, title, content, position('1 ≤ x' in content) as p
  from lessons
  where content like '%1 ≤ x%'
)
select
  id,
  title,
  substring(content from greatest(p - 60, 1) for 140) as around_target
from hit
where p > 0;

-- Same search over the note body of study_materials, which is also HTML.
select id, title, substring(content from greatest(position('1 ≤ x' in content) - 60, 1) for 140) as around_target
from study_materials
where content like '%1 ≤ x%';
