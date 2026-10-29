// What a set of `subscriptions` rows means for the account — and, separately,
// what the student can actually *do* about it.
//
// The UI used to decide from `status` alone, which produced two dead ends:
//
//  * a manually granted (comped / legacy) row is `active` but has no Stripe
//    customer, so "Manage billing" opened the portal and got 404 "No billing
//    account yet";
//  * a granted row whose period has ended keeps `status = 'active'`, so the
//    checkout function refused with "You already have a live subscription"
//    while the page still offered "Start free trial".
//
// Both are decided here, once, from what the row actually carries: a
// subscription Stripe knows about (`stripe_subscription_id`) can be managed and
// can block a second Checkout; access with no Stripe subscription behind it is a
// grant, and the only way forward is to subscribe.
//
// `status` is Stripe's vocabulary translated by `stripe-webhook` (`cancelled`
// with a double l, never `canceled`) — but rows written by hand over the years
// carry either spelling, so both are accepted as "ended".

/** Statuses that grant full access. Keep in step with `public.has_active_plan()`. */
export const ACTIVE_SUB_STATUSES = ["active", "trialing"] as const;

/** Statuses that mean the plan ended. */
export const ENDED_SUB_STATUSES = ["cancelled", "canceled", "expired"] as const;

/** Statuses of a Stripe subscription that is still running (and blocks a new Checkout). */
const LIVE_STRIPE_STATUSES = ["active", "trialing", "past_due"] as const;

export type SubscriptionRow = {
  plan_id: string;
  status: string;
  ends_at: string | null;
  trial_ends_at: string | null;
  cancel_at_period_end: boolean;
  stripe_customer_id?: string | null;
  stripe_subscription_id?: string | null;
};

export type SubscriptionState = {
  planId: string;
  hasPaid: boolean;
  status: string | null;
  trialEndsAt: string | null;
  endsAt: string | null;
  cancelAtPeriodEnd: boolean;
  /** Stripe knows this person, so the customer portal can open. */
  hasStripeCustomer: boolean;
  /** A Stripe subscription is running — cancel/change card belongs in the portal. */
  liveStripeSubscription: boolean;
  /** Full access with no Stripe subscription behind it: granted by hand. */
  comped: boolean;
  /** Nothing live, but this account once had a plan: offer a renew path. */
  lapsed: boolean;
  /** The row the settings card describes: a live one if any, else the newest. */
  row: SubscriptionRow | null;
};

const isActive = (status: string) => (ACTIVE_SUB_STATUSES as readonly string[]).includes(status);
const isEnded = (status: string) => (ENDED_SUB_STATUSES as readonly string[]).includes(status);

/** `ends_at` is optional in Stripe's model; no date means "runs until told otherwise". */
const unexpired = (row: SubscriptionRow, now: number) =>
  !row.ends_at || Date.parse(row.ends_at) > now;

/**
 * Derive everything the billing UI reads. `rows` must be newest first, as
 * `useSubscription` queries them.
 */
export function deriveSubscriptionState(
  rows: SubscriptionRow[],
  now: number = Date.now(),
): SubscriptionState {
  const live = rows.find((row) => isActive(row.status) && unexpired(row, now)) ?? null;
  const row = live ?? rows[0] ?? null;

  // A row that once had access and no longer does — including one still marked
  // `active` whose period ran out, which is the shape a manually granted plan
  // takes when nobody renews it. `pending_payment` (an abandoned Checkout) is
  // deliberately excluded: that person never had access, so "renew" would be a
  // lie.
  const lapsed = !live && rows.some(
    (r) =>
      isEnded(r.status) ||
      ((ACTIVE_SUB_STATUSES as readonly string[]).includes(r.status) || r.status === "past_due") &&
        !unexpired(r, now),
  );

  return {
    planId: live?.plan_id ?? "free",
    hasPaid: Boolean(live),
    status: row?.status ?? null,
    trialEndsAt: row?.trial_ends_at ?? null,
    endsAt: row?.ends_at ?? null,
    cancelAtPeriodEnd: Boolean(row?.cancel_at_period_end),
    hasStripeCustomer: rows.some((r) => Boolean(r.stripe_customer_id)),
    liveStripeSubscription: rows.some(
      (r) =>
        Boolean(r.stripe_subscription_id) &&
        (LIVE_STRIPE_STATUSES as readonly string[]).includes(r.status) &&
        unexpired(r, now),
    ),
    comped: Boolean(live && !live.stripe_subscription_id),
    lapsed,
    row,
  };
}
