-- Remove the personal attribution "Mr Seif's ..." / "seif atef" from the
-- history tables. Live notes and questions were already clean; this
-- scrubs the audit trail snapshots and the one student feedback line.
-- Dry run first: node .freebuff/apply-sql-file.cjs <this file>  (then --apply)

update admin_audit_log
   set details = regexp_replace(
                   regexp_replace(details::text, 'Mr\.? Seif''?s', 'Clutch Marks', 'gi'),
                   'seif atef', 'Clutch Marks', 'gi')::jsonb
 where details::text ~* 'seif|attef';

update content_revisions
   set content = regexp_replace(
                   regexp_replace(content, 'Mr\.? Seif''?s', 'Clutch Marks', 'gi'),
                   'seif atef', 'Clutch Marks', 'gi')
 where content ~* 'seif|attef';

update content_feedback
   set message = regexp_replace(message, 'seif atef', 'Clutch Marks', 'gi')
 where message ~* 'seif|attef';
