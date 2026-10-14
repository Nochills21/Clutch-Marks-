select spec_code, tier, count(*) as statements from public.syllabus_statements group by 1,2 order by 1,2;
