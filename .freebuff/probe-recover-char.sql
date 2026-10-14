-- Recover the intended character: the live lesson text is the source these
-- practice options were quoted from, and lessons.content is free of U+FFFD.
select
  id,
  title,
  substring(content from greatest(position('1 ≤ x < 4' in content) - 40, 1) for 120) as around_target,
  encode(substring(content from greatest(position('1 ≤ x < 4' in content) - 6, 1) for 6)::bytea, 'escape') as raw_prefix
from lessons
where content like '%1 ≤ x < 4%';
