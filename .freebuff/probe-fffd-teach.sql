select o.code, position(chr(65533) in o.teach) as in_teach, position(chr(65533) in o.statement) as in_statement
from public.learning_objectives o
where o.teach like '%' || chr(65533) || '%' or o.statement like '%' || chr(65533) || '%';
