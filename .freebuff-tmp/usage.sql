select json_agg(t) from (
  select bucket_id, count(*) as objects,
         pg_size_pretty(sum((metadata->>'size')::bigint)) as total,
         pg_size_pretty(avg((metadata->>'size')::bigint)::bigint) as avg_size
  from storage.objects group by 1 order by sum((metadata->>'size')::bigint) desc
) t;
