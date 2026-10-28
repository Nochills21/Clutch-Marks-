// Stripe webhook — the only writer of subscription state.
//
// Deployed with `verify_jwt: false` (`--public`), because Stripe cannot present a
// Supabase token. The request is authenticated the way Stripe authenticates
// webhooks instead: an HMAC-SHA256 signature over `${timestamp}.${rawBody}` with
// STRIPE_WEBHOOK_SECRET, compared in constant time, plus a 5-minute tolerance so
// a captured request cannot be replayed forever.
//
// Nothing is written from the event body alone. Every event only supplies a
// subscription id; `syncSubscription` re-reads that subscription from Stripe and
// stores what Stripe says. A forged body therefore cannot grant access even if
// it somehow got past the signature, and a replay is idempotent.
//
// `user_id` and `plan_id` come from the subscription metadata that the
// `billing` function sets at Checkout time. A subscription without that metadata
// was not created by this app: log it and store nothing.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const STRIPE_API = "https://api.stripe.com/v1";
const SIGNATURE_TOLERANCE_SECONDS = 300;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

/** App vocabulary for a Stripe subscription status. */
function dbStatus(stripeStatus: string): string {
  switch (stripeStatus) {
    case "trialing":
      return "trialing";
    case "active":
      return "active";
    case "past_due":
    case "unpaid":
      return "past_due";
    case "canceled":
    case "incomplete_expired":
    case "paused":
      return "cancelled";
    case "incomplete":
    default:
      return "pending_payment";
  }
}

const unixToIso = (seconds: unknown): string | null =>
  typeof seconds === "number" && Number.isFinite(seconds) ? new Date(seconds * 1000).toISOString() : null;

function hex(bytes: ArrayBuffer): string {
  return [...new Uint8Array(bytes)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** Length-independent equality: compare the accumulated difference. */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function verifySignature(payload: string, header: string, secret: string): Promise<boolean> {
  let timestamp: string | null = null;
  const signatures: string[] = [];
  for (const part of header.split(",")) {
    const [key, value] = part.split("=", 2);
    if (key === "t") timestamp = value;
    else if (key === "v1" && value) signatures.push(value);
  }
  if (!timestamp || signatures.length === 0) return false;

  const age = Math.abs(Date.now() / 1000 - Number(timestamp));
  if (!Number.isFinite(age) || age > SIGNATURE_TOLERANCE_SECONDS) return false;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const expected = hex(
    await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${timestamp}.${payload}`)),
  );
  return signatures.some((candidate) => timingSafeEqual(expected, candidate));
}

type StripeSubscription = {
  id: string;
  status: string;
  customer?: string | { id?: string };
  start_date?: number;
  current_period_start?: number;
  current_period_end?: number;
  trial_end?: number | null;
  cancel_at_period_end?: boolean;
  metadata?: Record<string, string>;
  items?: { data?: Array<{ current_period_start?: number; current_period_end?: number }> };
};

async function getSubscription(id: string): Promise<StripeSubscription> {
  const res = await fetch(`${STRIPE_API}/subscriptions/${encodeURIComponent(id)}`, {
    headers: { Authorization: `Bearer ${Deno.env.get("STRIPE_SECRET_KEY")}` },
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`Stripe GET /subscriptions/${id} -> ${res.status}: ${body?.error?.message ?? ""}`);
  }
  return body as StripeSubscription;
}

async function syncSubscription(
  admin: ReturnType<typeof createClient>,
  subscriptionId: string,
): Promise<"stored" | "ignored"> {
  const sub = await getSubscription(subscriptionId);

  const userId = sub.metadata?.user_id;
  const planId = sub.metadata?.plan_id;

  const { data: existing, error: existingError } = await admin
    .from("subscriptions")
    .select("id, user_id, plan_id")
    .eq("stripe_subscription_id", sub.id)
    .maybeSingle();
  if (existingError) throw existingError;

  // The row's own values win when metadata is absent (a subscription edited in
  // the dashboard), so an existing subscriber is not silently locked out.
  const resolvedPlan = planId || existing?.plan_id;
  const resolvedUser = userId || existing?.user_id;
  if (!resolvedPlan || !resolvedUser) {
    console.error(
      `stripe-webhook: subscription ${sub.id} has no user_id/plan_id metadata and no stored row — ignored`,
    );
    return "ignored";
  }

  // `current_period_end` lives on the subscription item in newer API versions.
  const item = sub.items?.data?.[0];
  const periodStart = sub.current_period_start ?? item?.current_period_start;
  const periodEnd = sub.current_period_end ?? item?.current_period_end;

  const row = {
    user_id: resolvedUser,
    plan_id: resolvedPlan,
    status: dbStatus(sub.status),
    stripe_status: sub.status,
    stripe_customer_id: typeof sub.customer === "string" ? sub.customer : sub.customer?.id ?? null,
    stripe_subscription_id: sub.id,
    starts_at: unixToIso(sub.start_date ?? periodStart),
    // While trialing this is the trial end; after conversion, the paid period.
    ends_at: unixToIso(periodEnd),
    trial_ends_at: unixToIso(sub.trial_end ?? null),
    cancel_at_period_end: Boolean(sub.cancel_at_period_end),
    updated_at: new Date().toISOString(),
  };

  if (existing) {
    const { error } = await admin.from("subscriptions").update(row).eq("id", existing.id);
    if (error) throw error;
  } else {
    const { error } = await admin.from("subscriptions").insert(row);
    if (error) throw error;
  }
  return "stored";
}

/** Subscription id carried by an event, if any. */
function subscriptionIdOf(event: { type: string; data: { object: Record<string, unknown> } }): string | null {
  const object = event.data.object ?? {};
  switch (event.type) {
    case "checkout.session.completed":
      return typeof object.subscription === "string" ? object.subscription : null;
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted":
    case "customer.subscription.paused":
    case "customer.subscription.resumed":
      return typeof object.id === "string" ? object.id : null;
    default:
      return null;
  }
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const secret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
  const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
  if (!secret || !stripeKey) {
    // Fail closed and loudly: a webhook that accepts unsigned requests would be
    // a public "grant yourself a plan" endpoint.
    console.error("stripe-webhook: STRIPE_WEBHOOK_SECRET / STRIPE_SECRET_KEY not set");
    return json({ error: "Webhook is not configured." }, 500);
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) return json({ error: "Missing Stripe-Signature" }, 400);

  const payload = await req.text();
  const valid = await verifySignature(payload, signature, secret);
  if (!valid) return json({ error: "Invalid signature" }, 400);

  let event: { id?: string; type: string; data: { object: Record<string, unknown> } };
  try {
    event = JSON.parse(payload);
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  try {
    const subscriptionId = subscriptionIdOf(event);
    if (!subscriptionId) {
      // Acknowledged so Stripe stops retrying; not an error in this integration.
      return json({ received: true, ignored: event.type });
    }

    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
    const outcome = await syncSubscription(admin, subscriptionId);
    console.log(`stripe-webhook: ${event.type} ${subscriptionId} -> ${outcome}`);
    return json({ received: true, outcome });
  } catch (e) {
    // 500 asks Stripe to retry with backoff — the right answer for a transient
    // Stripe/PostgREST failure, and the write is idempotent when it does.
    console.error("stripe-webhook error:", e instanceof Error ? e.message : e);
    return json({ error: "Could not sync subscription." }, 500);
  }
});
