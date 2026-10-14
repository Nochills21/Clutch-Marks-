select q.id,
       position(chr(65533) in q.question_text) as in_text,
       position(chr(65533) in q.options::text) as in_options,
       position(chr(65533) in coalesce(q.explanation, '')) as in_explanation,
       left(q.question_text, 60) as qtext,
       q.options::text as opts
from public.questions q
where q.objective_id is not null
  and (q.question_text like '%' || chr(65533) || '%'
       or q.options::text like '%' || chr(65533) || '%'
       or coalesce(q.explanation,'') like '%' || chr(65533) || '%');
