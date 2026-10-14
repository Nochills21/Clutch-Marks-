select count(*) filter (where length(coalesce(explanation,'')) < 40) as under40,
       count(*) filter (where length(coalesce(explanation,'')) < 80) as under80,
       count(*) as total
from public.questions;
