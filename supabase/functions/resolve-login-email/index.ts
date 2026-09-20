import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

// Distributed rate limit backed by the database, so the cap holds across all
// warm instances of this function (not just one).
const MAX_PER_WINDOW = 30;
const WINDOW_SECONDS = 60;

function clientKey(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for") ?? "";
  return (fwd.split(",")[0] || req.headers.get("cf-connecting-ip") || "unknown").trim();
}

const USERNAME_RE = /^[A-Za-z0-9._-]{2,64}$/;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  // Uniform floor on response time so timing differences between "found",
  // "not found" and "invalid" cannot be used to enumerate accounts.
  const startedAt = Date.now();
  const settle = async (body: unknown, status = 200) => {
    const elapsed = Date.now() - startedAt;
    if (elapsed < 250) await new Promise((r) => setTimeout(r, 250 - elapsed));
    return json(body, status);
  };

  try {
    if (req.method !== "POST") return await settle({ email: null }, 405);

    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: limited } = await admin.rpc("register_login_lookup", {
      _client_key: clientKey(req),
      _max: MAX_PER_WINDOW,
      _window_seconds: WINDOW_SECONDS,
    });

    if (limited === true) {
      // Same body shape as every other response so throttling never reveals
      // whether the identifier exists.
      return await settle({ email: null }, 429);
    }

    const body = await req.json().catch(() => ({}));
    const identifier = typeof body?.identifier === "string" ? body.identifier.trim() : "";

    // Emails are used as-is by the client; anything malformed resolves to null
    // with the exact same shape as a genuine miss.
    if (!identifier || identifier.includes("@") || !USERNAME_RE.test(identifier)) {
      return await settle({ email: null });
    }

    const { data, error } = await admin
      .from("profiles")
      .select("email")
      .ilike("username", identifier)
      .maybeSingle();

    if (error) {
      console.error("resolve-login-email lookup error:", error.message);
      return await settle({ email: null });
    }

    return await settle({ email: data?.email ?? null });
  } catch (e) {
    console.error("resolve-login-email error:", e instanceof Error ? e.message : e);
    return await settle({ email: null });
  }
});
