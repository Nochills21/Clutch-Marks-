// GENERATED FILE — do not hand-edit.
//
// The published price list, as the live `plans` table had it when this was last
// generated. The pricing page, its FAQ, the Course/Offer JSON-LD, the admin
// console and the preview upsell all read these rows, so they cannot drift
// apart — and because the build reads this file instead of querying Supabase, a
// prerender can never advertise a price the network failed to fetch.
//
// Regenerate after changing a price:
//   node scripts/generate-plans-manifest.cjs
//
// Generated: 2026-10-22 · 4 plans
export interface PlanRow {
  id: string;
  name: string;
  /** Billed amount for one term, in USD — the money that actually moves. */
  priceTotal: number;
  /** Term length in calendar months. */
  months: number;
  /** priceTotal / months, stored so the two can be checked against each other. */
  priceMonthly: number;
  description: string | null;
}

export const PLAN_ROWS: PlanRow[] = [
  { id: "free", name: "Free", priceMonthly: 0, priceTotal: 0, months: 1, description: "IGCSE lessons, quizzes and notes only" },
  { id: "monthly", name: "Monthly", priceMonthly: 40, priceTotal: 40, months: 1, description: "Full access to every level, billed monthly" },
  { id: "quarterly", name: "3 Months", priceMonthly: 20, priceTotal: 60, months: 3, description: "Full access for a 3-month term" },
  { id: "annual", name: "Annual", priceMonthly: 6.67, priceTotal: 80, months: 12, description: "Full access for a full year" },
];
