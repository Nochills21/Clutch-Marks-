// Billing: start a Stripe Checkout session, or open the Stripe customer portal.
//
//   POST /billing  { action: "checkout", planId: "monthly" | "quarterly" | "annual" }
//                  -> { url }  (Stripe-hosted Checkout, card + Apple Pay, 3-day trial)
//   POST /billing  { action: "portal" }
//                  -> { url }  (cancel, change card, see invoices)
//
// Two things are deliberate:
//
// * The client never sends an amount, a currency, a price or a user id. It sends
//   a plan *id*; this function reads that row from `plans` with the service role
//   and takes the money and the term from there. A caller therefore cannot ask
//   for a $1 subscription.
// * The Stripe Price is checked against the plan row before it is billed. `plans`
//   is the one place a price is written, so if somebody edits the table (or the
//   Stripe Price) and not the other, the checkout refuses with `price_mismatch`
//   instead of charging the wrong money silently.
//
// `verify_jwt` is on for this function: the user comes from the verified token,
// never from the request body. The trial length lives here and in the refund
// policy page — keep them saying the same thing.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const STRIPE_API = "https://api.stripe.com/v1";

/** The free trial every paid plan starts with. Lower it here only with the policy. */
export const TRIAL_DAYS = 3;

const SITE_URL = (Deno.env.get("SITE_URL") ?? "https://clutchmarks.study").replace(/\/+$/, "");

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

class BillingError extends Error {
  constructor(readonly status: number, readonly code: string, message: string) {
    super(message);
  }
}

function secretKey(): string {
  const key = Deno.env.get("STRIPE_SECRET_KEY");
  if (!key) {
    // Fail with a shape the client can name, instead of a generic non-2xx.
    throw new BillingError(503, "billing_not_configured", "Stripe is not configured on the server yet.");
  }
  return key;
}

/** Minimal Stripe client: form-encoded, JSON out, errors as BillingError. */
async function stripe(
  path: string,
  init: { method?: string; form?: Record<string, string> } = {},
): Promise<Record<string, unknown>> {
  const method = init.method ?? (init.form ? "POST" : "GET");
  const body = init.form ? new URLSearchParams(init.form).toString() : undefined;
  const res = await fetch(`${STRIPE_API}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${secretKey()}`,
      ...(body ? { "Content-Type": "application/x-www-form-urlencoded" } : {}),
    },
    body,
  });
  const payload = (await res.json().catch(() => ({}))) as {
    error?: { message?: string; code?: string };
  } & Record<string, unknown>;
  if (!res.ok) {
    console.error(`stripe ${method} ${path} -> ${res.status}`, payload.error?.message);
    throw new BillingError(
      502,
      payload.error?.code ?? "stripe_error",
      payload.error?.message ?? `Stripe rejected the request (${res.status}).`,
    );
  }
  return payload;
}

/** Calendar months -> the Stripe recurring interval that bills them. */
function recurringFor(months: number): { interval: string; intervalCount: number } {
  return months > 0 && months % 12 === 0
    ? { interval: "year", intervalCount: months / 12 }
    : { interval: "month", intervalCount: months };
}

type PlanRow = {
  id: string;
  name: string;
  price_total: number | string;
  months: number;
  stripe_price_id: string | null;
};

/** Refuse to bill a Price that disagrees with the plan row. */
async function verifyPrice(plan: PlanRow): Promise<string> {
  if (!plan.stripe_price_id) {
    throw new BillingError(
      503,
      "price_missing",
      `The ${plan.id} plan has no Stripe Price configured.`,
    );
  }
  const price = (await stripe(`/prices/${encodeURIComponent(plan.stripe_price_id)}`)) as {
    unit_amount?: number | null;
    currency?: string;
    recurring?: { interval?: string; interval_count?: number } | null;
    active?: boolean;
  };

  const expectedAmount = Math.round(Number(plan.price_total) * 100);
  const expected = recurringFor(Number(plan.months));
  const problems: string[] = [];
  if (!price.active) problems.push("price is archived");
  if (price.unit_amount !== expectedAmount) {
    problems.push(`amount ${price.unit_amount ?? "none"} != ${expectedAmount}`);
  }
  if (price.currency !== "usd") problems.push(`currency ${price.currency ?? "none"} != usd`);
  if (price.recurring?.interval !== expected.interval) {
    problems.push(`interval ${price.recurring?.interval ?? "none"} != ${expected.interval}`);
  }
  if (price.recurring?.interval_count !== expected.intervalCount) {
    problems.push(
      `interval_count ${price.recurring?.interval_count ?? "none"} != ${expected.intervalCount}`,
    );
  }
  if (problems.length > 0) {
    console.error(`price mismatch for ${plan.id} (${plan.stripe_price_id}):`, problems.join("; "));
    throw new BillingError(
      409,
      "price_mismatch",
      `The ${plan.name} plan and its Stripe Price disagree (${problems.join("; ")}). Billing is paused until they match.`,
    );
  }
  return plan.stripe_price_id;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed", code: "method" }, 405);

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return json({ error: "Unauthorized", code: "unauthorized" }, 401);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } },
    );
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return json({ error: "Unauthorized", code: "unauthorized" }, 401);

    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const body = await req.json().catch(() => ({})) as { action?: string; planId?: string };
    const action = body.action === "portal" ? "portal" : "checkout";

    // A live subscription owns the account's billing state. Starting a second
    // Checkout on top of one would bill twice, so the portal is the way through
    // (cancel, then subscribe again — or change plan there).
    const { data: live, error: liveError } = await admin
      .from("subscriptions")
      .select("id, status, plan_id, stripe_customer_id, trial_ends_at, ends_at")
      .eq("user_id", user.id)
      .in("status", ["active", "trialing", "past_due"])
      .order("created_at", { ascending: false })
      .limit(1);
    if (liveError) throw liveError;
    const current = live?.[0] ?? null;

    // Any customer id on the user's history, so a returning subscriber reuses
    // their Stripe customer instead of starting a second one.
    let customerId = current?.stripe_customer_id ?? null;
    if (!customerId) {
      const { data: previous } = await admin
        .from("subscriptions")
        .select("stripe_customer_id")
        .eq("user_id", user.id)
        .not("stripe_customer_id", "is", null)
        .order("created_at", { ascending: false })
        .limit(1);
      customerId = previous?.[0]?.stripe_customer_id ?? null;
    }

    if (action === "portal") {
      if (!customerId) {
        return json(
          { error: "No Stripe customer on this account yet.", code: "no_customer" },
          404,
        );
      }
      try {
        const portal = await stripe("/billing_portal/sessions", {
          form: { customer: customerId, return_url: `${SITE_URL}/pricing` },
        });
        return json({ url: portal.url });
      } catch (e) {
        // A Stripe account with no saved portal configuration rejects the
        // session. That is a one-time dashboard step, not a broken customer, so
        // name it rather than passing Stripe's wording through.
        if (e instanceof BillingError && /configuration/i.test(e.message)) {
          throw new BillingError(
            503,
            "portal_not_configured",
            "The Stripe billing portal has no default configuration yet — save it once in the Stripe dashboard (Settings → Billing → Customer portal).",
          );
        }
        throw e;
      }
    }

    // ---- checkout ---------------------------------------------------------
    if (!body.planId) return json({ error: "planId is required", code: "plan_required" }, 400);
    if (current) {
      return json(
        {
          error: "You already have a live subscription — manage it instead of starting a second one.",
          code: "already_subscribed",
        },
        409,
      );
    }

    const { data: planRow, error: planError } = await admin
      .from("plans")
      .select("id, name, price_total, months, stripe_price_id")
      .eq("id", body.planId)
      .maybeSingle();
    if (planError) throw planError;
    const plan = planRow as PlanRow | null;
    if (!plan || Number(plan.price_total) <= 0 || Number(plan.months) < 1) {
      return json({ error: "That plan cannot be purchased.", code: "invalid_plan" }, 400);
    }

    const priceId = await verifyPrice(plan);
    const expected = recurringFor(Number(plan.months));

    const form: Record<string, string> = {
      mode: "subscription",
      // Card covers Apple Pay: Stripe presents the Apple Pay button on supported
      // devices inside the card payment method. Restricting the list to card is
      // what makes the Checkout page show exactly those two options.
      "payment_method_types[0]": "card",
      "line_items[0][price]": priceId,
      "line_items[0][quantity]": "1",
      // 3-day free trial. `payment_method_collection` stays at its default
      // ("always"), so a card is on file when the trial converts — otherwise the
      // conversion would fail for everyone who did not add one.
      "subscription_data[trial_period_days]": String(TRIAL_DAYS),
      "subscription_data[metadata][user_id]": user.id,
      "subscription_data[metadata][plan_id]": plan.id,
      "metadata[user_id]": user.id,
      "metadata[plan_id]": plan.id,
      client_reference_id: user.id,
      billing_address_collection: "auto",
      success_url: `${SITE_URL}/pricing?checkout=success`,
      cancel_url: `${SITE_URL}/pricing?checkout=cancelled`,
    };
    if (customerId) form.customer = customerId;
    else if (user.email) form.customer_email = user.email;

    const session = await stripe("/checkout/sessions", { form });
    if (!session.url) {
      throw new BillingError(502, "stripe_error", "Stripe did not return a checkout URL.");
    }
    console.log(
      `checkout ${session.id} user=${user.id} plan=${plan.id} interval=${expected.interval}/${expected.intervalCount} trial=${TRIAL_DAYS}d`,
    );
    return json({ url: session.url });
  } catch (e) {
    if (e instanceof BillingError) {
      return json({ error: e.message, code: e.code }, e.status);
    }
    console.error("billing error:", e instanceof Error ? e.message : e);
    return json({ error: "Could not start billing.", code: "internal" }, 500);
  }
});
