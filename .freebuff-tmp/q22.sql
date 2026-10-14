select json_agg(t) from (
  select bucket_id, count(*) files, pg_size_pretty(sum((metadata->>'size')::bigint)) bytes
    from storage.objects group by bucket_id order by sum((metadata->>'size')::bigint) desc) t;
