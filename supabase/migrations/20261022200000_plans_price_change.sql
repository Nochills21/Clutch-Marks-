-- Price change, 2026-10-22.
--
--   monthly     $40  ->  $30   (1 month,  billed $30)
--   3 months    $60  ->  $45   (3 months, $15/month)
--   annual      $80  unchanged ($6.67/month)
--
-- `public.plans` is the only place a price is written (AGENTS.md): the snapshot
-- frontend/src/lib/plans.generated.ts is regenerated from this table with
-- `node scripts/generate-plans-manifest.cjs`, and the pricing cards, FAQ,
-- Course/Offer JSON-LD, admin console and preview upsell all read it. So this
-- file changes the money and nothing else — do not restate a price in
-- `description`, which is how the page once said $40 while the table said $20.
--
-- The guard is the point of writing this as a migration rather than a one-off
-- update: price_monthly must equal price_total / months, or the generator
-- refuses to write a snapshot and `npm run verify` (which runs
-- `--check`) fails. If any row would break that, the whole change rolls back.
--
-- No BEGIN/COMMIT here: .freebuff/apply-sql-file.cjs wraps the file in
-- BEGIN … ROLLBACK for the dry run, and an inner COMMIT would make that dry run
-- permanent. Every statement is idempotent.

update public.plans
   set price_total = 30.00,
       price_monthly = 30.00
 where id = 'monthly';

update public.plans
   set price_total = 45.00,
       price_monthly = 15.00
 where id = 'quarterly';

do $$
declare
  bad text;
begin
  select string_agg(id || ' (' || price_total || '/' || months || ' vs ' || price_monthly || '/month)', ', ' order by id)
    into bad
    from public.plans
   where months < 1
      or abs(price_monthly - round(price_total / months, 2)) > 0.01;

  if bad is not null then
    raise exception 'plans rows disagree with their own term: %', bad;
  end if;
end
$$;
