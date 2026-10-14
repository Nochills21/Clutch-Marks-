select count(*)::int as still_short from public.questions where length(coalesce(explanation,''))<40;
