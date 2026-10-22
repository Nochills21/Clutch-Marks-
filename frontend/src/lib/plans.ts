// The one place prices are turned into text.
//
// The numbers come from `plans.generated.ts` — a snapshot of the live `plans`
// table, regenerated with `node scripts/generate-plans-manifest.cjs` — so the
// pricing cards, the FAQ, the Course/Offer JSON-LD, the admin console and the
// preview upsell all quote the same money. Before this, five files each carried
// their own hardcoded copy and they disagreed ($40/month on the page, $20 in the
// table, $60/year vs $80/year).
//
// `priceTotal` is the amount billed for the whole term, so it is the number to
// show as "billed $X"; the per-month figure is derived from it and rounds back
// to the cents (80 / 12 = 6.67), which is why the total is stored rather than
// multiplied out.
import { PLAN_ROWS, type PlanRow } from "./plans.generated";

export { PLAN_ROWS };
export type { PlanRow };

/** Plans that actually charge money, in escalation order. */
export const PAID_PLAN_IDS = ["monthly", "quarterly", "annual"] as const;

/** "$60", "$6.67" — never "$40.00". Rounds float noise away first. */
export function money(amount: number): string {
  const rounded = Math.round(amount * 100) / 100;
  return `$${Number.isInteger(rounded) ? rounded : rounded.toFixed(2)}`;
}

export function planById(id: string): PlanRow | null {
  return PLAN_ROWS.find((p) => p.id === id) ?? null;
}

/** Billed amount for the term. */
export function totalOf(plan: PlanRow): string {
  return money(plan.priceTotal);
}

/** The effective monthly rate. */
export function perMonthOf(plan: PlanRow): string {
  return money(plan.priceTotal / plan.months);
}

/** "/month" for a one-month plan, "/month · billed $60" for a term. */
export function billedLabel(plan: PlanRow): string {
  return plan.months > 1 ? `/month · billed ${totalOf(plan)}` : "/month";
}

/**
 * What a longer term saves against the monthly plan, per month and as a whole
 * percentage. Null for the monthly plan itself (nothing to compare) and when
 * there is no monthly plan to compare against.
 */
export function savingsVsMonthly(plan: PlanRow): { amount: number; label: string; percent: number } | null {
  const monthly = planById("monthly");
  if (!monthly || monthly.priceMonthly <= 0 || plan.id === monthly.id) return null;
  const perMonth = plan.priceTotal / plan.months;
  const amount = Math.round((monthly.priceMonthly - perMonth) * 100) / 100;
  if (amount <= 0) return null;
  return {
    amount,
    label: money(amount),
    percent: Math.round((amount / monthly.priceMonthly) * 100),
  };
}

/** The cheapest per-month rate on offer — "from $6.67/month" in the upsell. */
export function cheapestPerMonth(ids: readonly string[] = PAID_PLAN_IDS): { plan: PlanRow; label: string } | null {
  const candidates = ids
    .map((id) => planById(id))
    .filter((p): p is PlanRow => Boolean(p) && (p as PlanRow).priceTotal > 0);
  if (candidates.length === 0) return null;
  const cheapest = candidates.reduce((best, p) =>
    p.priceTotal / p.months < best.priceTotal / best.months ? p : best,
  );
  return { plan: cheapest, label: perMonthOf(cheapest) };
}
