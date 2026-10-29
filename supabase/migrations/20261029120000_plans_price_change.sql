-- Price change, 2026-10-29.
--
--   monthly     $30  ->  $20   (1 month,  billed $20)
--   3 months    $45  unchanged (3 months, $15/month)
--   annual      $80  ->  $100  ($8.33/month)
--
-- `public.plans` is the only place a price is written (AGENTS.md): the snapshot
-- frontend/src/lib/plans.generated.ts is regenerated from this table with
-- `node scripts/generate-plans-manifest.cjs`, and the pricing cards, FAQ,
-- Course/Offer JSON-LD, admin console and preview upsell all read it. So this
-- file changes the money and nothing else — do not restate a price in
-- `description`, which is how the page once said $40 while the table said $20.
--
-- `stripe_price_id` moves with the amount because a Stripe Price is immutable:
-- the old $30/month and $80/year Prices are archived and these rows point at new
-- live Prices (`price_1UVmz5…` at 2000 US cents monthly, `price_1UVmz6…` at
-- 10000 yearly). `billing` refuses to check out when a plan row and its Price
-- disagree, so the two must land together or sales stop — deliberately, rather
-- than charging the wrong money.
--
-- No BEGIN/COMMIT here: .freebuff/apply-sql-file.cjs wraps the file in
-- BEGIN … ROLLBACK for the dry run, and an inner COMMIT would make that dry run
-- permanent. Every statement is idempotent.

update public.plans
   set price_total = 20.00,
       price_monthly = 20.00,
       stripe_price_id = 'price_1UVmz5Q3xk2ovSDMNtZxMoz6'
 where id = 'monthly';

update public.plans
   set price_total = 45.00,
       price_monthly = 15.00
 where id = 'quarterly';

update public.plans
   set price_total = 100.00,
       price_monthly = 8.33,
       stripe_price_id = 'price_1UVmz6Q3xk2ovSDMjndzjLiV'
 where id = 'annual';

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
