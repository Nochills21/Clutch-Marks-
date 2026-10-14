-- Server-side bytes, no client decode: what does the source lesson actually
-- contain immediately before the '1 ≤ x' that the question options quote?
select
  'lesson:' || title as src,
  encode(substring(content from position('1 ≤ x' in content) - 4 for 5)::bytea, 'hex') as bytes,
  substring(content from position('1 ≤ x' in content) - 4 for 5) as as_text
from lessons
where content like '%1 ≤ x%';
