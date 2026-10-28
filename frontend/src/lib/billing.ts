// The browser's one handle on billing: `checkoutUrl` / `portalUrl` call the
// `billing` edge function, and `billingFailure` turns a failed invoke into the
// function's own words.
//
// supabase-js throws the function's JSON away on a non-2xx and surfaces only
// "Edge Function returned a non-2xx status code", so the message a student
// needs — "billing is not set up yet", "you already have a subscription" —
// lives in `error.context` (the Response). Without unwrapping it every
// rejection reads the same.
//
// Nothing here writes a subscription row: `stripe-webhook` is the only writer,
// after Stripe confirms. These calls only ever carry a plan id.
import { supabase } from "@/integrations/supabase/client";

export type BillingFailure = { message: string; code?: string };

export async function billingFailure(error: unknown): Promise<BillingFailure> {
  const context = (error as { context?: Response } | null)?.context;
  if (context && typeof context.clone === "function") {
    try {
      const body = (await context.clone().json()) as { error?: string; code?: string };
      if (body?.error) return { message: body.error, code: body.code };
    } catch {
      // Not JSON — fall through to the generic message.
    }
  }
  return { message: error instanceof Error ? error.message : "Something went wrong. Please try again." };
}

/**
 * Toast title for a failure code, so every surface explains the same failure
 * the same way. `fallback` is what the page says for an unknown code.
 */
export function billingFailureTitle(code: string | undefined, fallback: string): string {
  switch (code) {
    case "billing_not_configured":
    case "price_missing":
      return "Billing is not set up yet";
    case "price_mismatch":
      return "This plan is temporarily unavailable";
    case "already_subscribed":
      return "You already have a subscription";
    case "no_customer":
      return "No billing account yet";
    case "portal_not_configured":
      return "Billing page not set up yet";
    default:
      return fallback;
  }
}

/** Start Stripe Checkout for a plan id; resolves with the URL to visit. */
export async function checkoutUrl(planId: string): Promise<string> {
  const { data, error } = await supabase.functions.invoke("billing", {
    body: { action: "checkout", planId },
  });
  if (error) throw error;
  const url = (data as { url?: string } | null)?.url;
  if (url) return url;
  throw new Error("Stripe did not return a checkout page.");
}

/** Open the Stripe customer portal (cancel, change card); resolves with its URL. */
export async function portalUrl(): Promise<string> {
  const { data, error } = await supabase.functions.invoke("billing", { body: { action: "portal" } });
  if (error) throw error;
  const url = (data as { url?: string } | null)?.url;
  if (url) return url;
  throw new Error("Stripe did not return a billing page.");
}
