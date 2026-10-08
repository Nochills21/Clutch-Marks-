// Google sign-in.
//
// The provider itself is configured in Supabase (Authentication → Providers →
// Google), which needs a Google Cloud OAuth client ID/secret. Rather than render
// a button that fails when that config is missing, we ask the auth server which
// external providers are actually enabled (GET /auth/v1/settings is public) and
// only offer Google when it is live.
import { supabase } from "@/integrations/supabase/client";
import { SUPABASE_KEY_SAFE, SUPABASE_URL_SAFE } from "@/lib/env";

export type EnabledProviders = {
  google: boolean;
};

export const NO_PROVIDERS: EnabledProviders = { google: false };

/** Which social providers this deployment can actually use right now. */
export async function fetchEnabledProviders(): Promise<EnabledProviders> {
  try {
    const res = await fetch(`${SUPABASE_URL_SAFE}/auth/v1/settings`, {
      headers: { apikey: SUPABASE_KEY_SAFE },
    });
    if (!res.ok) return NO_PROVIDERS;
    const data = (await res.json()) as { external?: Record<string, boolean | undefined> };
    return { google: Boolean(data?.external?.google) };
  } catch {
    // Offline or blocked: fall back to the email/password form, which needs no
    // provider config and is always present.
    return NO_PROVIDERS;
  }
}

/**
 * Hands off to Google and comes back to /auth/callback with a session.
 * `prompt: select_account` so a shared school computer cannot silently reuse
 * whoever signed in last.
 */
export async function signInWithGoogle(returnPath = "/auth/callback") {
  const redirectTo = `${window.location.origin}${returnPath}`;
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo,
      queryParams: { prompt: "select_account" },
    },
  });
  return error;
}
