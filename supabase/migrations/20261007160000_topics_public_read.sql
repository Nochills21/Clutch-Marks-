-- The topic catalogue is site navigation data, not student data: name, slug,
-- description, sort order and the subject level it belongs to.
--
-- `subjects` and `subject_levels` are already readable by `public`, but `topics`
-- was restricted to authenticated users. That blocked the static-site build from
-- enumerating topics at all, which is why the sitemap could only ever list the
-- hand-written routes and why no per-topic page could be prerendered.
--
-- Added as a separate policy for `anon` rather than widening the existing
-- authenticated policy, so nothing that was previously restricted to signed-in
-- users becomes reachable by anyone else. No student, progress, attempt or
-- account table is touched.
create policy "Anyone can view topics" on public.topics
  for select to anon using (true);
