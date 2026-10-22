-- The published price list is $40/month, $60 per 3 months ($20/month), and
-- $80/year ($6.67/month) — what the pricing page, the FAQ/JSON-LD, the preview
-- upsell and the admin console all show. The plans rows still carried the
-- launch-time figures (monthly $20, annual $5/month billed $60), so the table
-- advertised the same money for a year as for a quarter.
--
-- price_monthly only ever appears inside descriptions and admin embeds, but it
-- was numeric(10,0), which cannot hold the annual row's real monthly rate
-- ($80/12 = $6.67). Widen the precision rather than rounding the price down.
alter table public.plans
  alter column price_monthly type numeric(10, 2);

update public.plans set price_monthly = 40, months = 1,
  description = 'Full access to every level, billed monthly'
where id = 'monthly';

update public.plans set price_monthly = 20, months = 3,
  description = 'Full access, $20/month billed $60 every 3 months'
where id = 'quarterly';

update public.plans set price_monthly = 6.67, months = 12,
  description = 'Full access, $6.67/month billed $80 yearly'
where id = 'annual';
