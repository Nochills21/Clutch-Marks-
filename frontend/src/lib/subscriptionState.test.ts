// The two dead ends these tests pin down were both live in the database:
// a granted row whose period had ended (status still `active`, no Stripe
// subscription) and granted rows with no Stripe customer at all. The first made
// Checkout answer 409 forever, the second made "Manage billing" answer 404.
import { describe, expect, it } from "vitest";
import { deriveSubscriptionState, type SubscriptionRow } from "./subscriptionState";

const NOW = Date.parse("2026-10-29T12:00:00Z");
const FUTURE = "2026-11-19T19:07:48Z";
const PAST = "2026-10-25T11:59:22Z";

const row = (over: Partial<SubscriptionRow> = {}): SubscriptionRow => ({
  plan_id: "monthly",
  status: "active",
  ends_at: FUTURE,
  trial_ends_at: null,
  cancel_at_period_end: false,
  stripe_customer_id: null,
  stripe_subscription_id: null,
  ...over,
});

describe("deriveSubscriptionState", () => {
  it("never offers the portal for a granted plan", () => {
    const state = deriveSubscriptionState([row()], NOW);
    expect(state.hasPaid).toBe(true);
    expect(state.comped).toBe(true);
    expect(state.hasStripeCustomer).toBe(false);
    expect(state.liveStripeSubscription).toBe(false);
    expect(state.lapsed).toBe(false);
    expect(state.planId).toBe("monthly");
  });

  it("treats a granted plan whose period ended as lapsed, not live", () => {
    // The row that stalled a real customer: status 'active', ends_at in the past.
    const state = deriveSubscriptionState([row({ ends_at: PAST })], NOW);
    expect(state.hasPaid).toBe(false);
    expect(state.lapsed).toBe(true);
    expect(state.comped).toBe(false);
  });

  it("reads a running Stripe trial as manageable", () => {
    const state = deriveSubscriptionState(
      [
        row({
          status: "trialing",
          trial_ends_at: FUTURE,
          stripe_customer_id: "cus_1",
          stripe_subscription_id: "sub_1",
        }),
      ],
      NOW,
    );
    expect(state.hasPaid).toBe(true);
    expect(state.hasStripeCustomer).toBe(true);
    expect(state.liveStripeSubscription).toBe(true);
    expect(state.comped).toBe(false);
    expect(state.status).toBe("trialing");
  });

  it("keeps a failed payment manageable while its period runs", () => {
    const state = deriveSubscriptionState(
      [row({ status: "past_due", stripe_customer_id: "cus_1", stripe_subscription_id: "sub_1" })],
      NOW,
    );
    expect(state.hasPaid).toBe(false);
    expect(state.liveStripeSubscription).toBe(true);
    expect(state.hasStripeCustomer).toBe(true);
    expect(state.lapsed).toBe(false);
  });

  it("accepts both spellings of an ended subscription", () => {
    for (const status of ["cancelled", "canceled", "expired"]) {
      const state = deriveSubscriptionState(
        [row({ status, ends_at: PAST, stripe_customer_id: "cus_1", stripe_subscription_id: "sub_1" })],
        NOW,
      );
      expect(state.hasPaid).toBe(false);
      expect(state.lapsed).toBe(true);
      expect(state.liveStripeSubscription).toBe(false);
      // The customer still exists, so invoices stay reachable.
      expect(state.hasStripeCustomer).toBe(true);
    }
  });

  it("does not call an abandoned checkout a lapsed plan", () => {
    const state = deriveSubscriptionState(
      [row({ status: "pending_payment", ends_at: PAST, stripe_customer_id: "cus_1" })],
      NOW,
    );
    expect(state.hasPaid).toBe(false);
    expect(state.lapsed).toBe(false);
  });

  it("picks the live row even when a newer row is dead", () => {
    const state = deriveSubscriptionState(
      [
        row({ status: "cancelled", plan_id: "annual", ends_at: PAST, stripe_subscription_id: "sub_old" }),
        row({ plan_id: "monthly", ends_at: FUTURE }),
      ],
      NOW,
    );
    expect(state.planId).toBe("monthly");
    expect(state.hasPaid).toBe(true);
    expect(state.status).toBe("active");
    // The customer is found on the history, not just on the live row.
    const withCustomer = deriveSubscriptionState(
      [
        row({ status: "cancelled", ends_at: PAST, stripe_customer_id: "cus_9" }),
        row(),
      ],
      NOW,
    );
    expect(withCustomer.hasStripeCustomer).toBe(true);
  });

  it("is the free plan with no rows at all", () => {
    const state = deriveSubscriptionState([], NOW);
    expect(state.planId).toBe("free");
    expect(state.hasPaid).toBe(false);
    expect(state.lapsed).toBe(false);
    expect(state.comped).toBe(false);
    expect(state.row).toBeNull();
  });
});
