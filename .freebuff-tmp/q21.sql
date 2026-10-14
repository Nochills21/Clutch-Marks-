select json_build_object(
 'bucket_bytes', (select pg_size_pretty(sum((metadata->>'size')::bigint)) from storage.objects where bucket_id='past-papers'),
 'bucket_files', (select count(*) from storage.objects where bucket_id='past-papers'),
 'other_buckets', (select string_agg(b.bucket_id||'='||pg_size_pretty(sum((b.metadata->>'size')::bigint)), ' ') from storage.objects b group by b.bucket_id)
) as report;
