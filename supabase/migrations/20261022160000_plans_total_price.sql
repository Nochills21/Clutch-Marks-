-- `plans` stored only a monthly rate, so the amount actually billed had to be
-- recomputed as price_monthly * months — and for the annual plan that arithmetic
-- is wrong: $6.67 x 12 = $80.04, while the plan is billed $80. Every surface
-- (pricing cards, FAQ, JSON-LD, admin console) therefore carried its own copy of
-- the total, which is exactly how the table drifted from the page in the first
-- place (monthly $20 vs $40, annual $60 vs $80).
--
-- The billed total is now a column: it is the money that moves, and the
-- per-month figure is derived from it for display (80 / 12 = 6.67). The
-- generated snapshot the build reads (scripts/generate-plans-manifest.cjs) comes
-- straight from these rows.
alter table public.plans
  add column if not exists price_total numeric(10, 2);

update public.plans set price_total = 0  where id = 'free';
update public.plans set price_total = 40 where id = 'monthly';
update public.plans set price_total = 60 where id = 'quarterly';
update public.plans set price_total = 80 where id = 'annual';

-- The description column also restated the price in prose ("$20/month billed
-- $60 every 3 months"), which is one more copy that could drift. Numbers live
-- only in price_monthly/price_total/months; descriptions say what the plan is,
-- never what it costs.
update public.plans set description = 'IGCSE lessons, quizzes and notes only'      where id = 'free';
update public.plans set description = 'Full access to every level, billed monthly' where id = 'monthly';
update public.plans set description = 'Full access for a 3-month term'             where id = 'quarterly';
update public.plans set description = 'Full access for a full year'                where id = 'annual';

-- Any other row: derive what the old model implied so the column can be NOT NULL.
update public.plans
   set price_total = round(price_monthly * months, 2)
 where price_total is null;

alter table public.plans alter column price_total set not null;
alter table public.plans alter column price_total set default 0;

alter table public.plans drop constraint if exists plans_price_total_non_negative;
alter table public.plans
  add constraint plans_price_total_non_negative check (price_total >= 0);
