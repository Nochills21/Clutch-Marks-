// serve-external-paper: the gate for past papers we link to but do not host.
//
// Some archive rows have no file in our private bucket — the paper lives on an
// external host (PhysicsAndMathsTutor, or the exam board's own page). Those
// links used to render as a plain <a href>, so a free account could click
// straight through and read the whole paper, unwatermarked, with no audit
// trail. We cannot watermark a third party's bytes, but we can decide *who* is
// allowed to reach them.
//
// So the external link now points here. This function authenticates the caller,
// applies the same entitlement rule as serve-material, records the click in the
// audit trail, and — only for an entitled account — hands back the real URL to
// navigate to. A free account gets a 403 the app turns into an upgrade prompt.
//
// Why JSON and not a 302: the SPA calls this with `fetch`, and a cross-origin
// redirect fetched programmatically is an *opaque redirect* — the browser
// follows it but hides the Location header, so the client cannot open the
// target in a tab. Returning the URL in the body keeps the direct-link flow
// (a normal navigation for the paying user) while still withholding the
// destination from anyone the entitlement check rejects.
//
// Request:  POST { url, label? }
// Auth:     signed-in user with an approved role (student or admin).
// Response: 200 { url } (entitled), or 403 { error, upgrade: true } (free).
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.97.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

/**
 * Hosts we are willing to redirect to.
 *
 * An allowlist, not a denylist: this endpoint takes a URL from the request and
 * redirects to it, so an open version would be an authenticated open redirect —
 * a credible phishing vector. Only the two sources the archive actually uses
 * are accepted.
 */
const ALLOWED_HOSTS = [
  "physicsandmathstutor.com",
  "cambridgeinternational.org",
  "qualifications.pearson.com",
  "pearson.com",
  "edexcel.com",
  "ocr.org.uk",
  "aqa.org.uk",
  "wjec.co.uk",
  "ccea.org.uk",
];

/** Exact host match or a subdomain of an allowed host. */
function hostAllowed(hostname: string): boolean {
  const host = hostname.toLowerCase();
  return ALLOWED_HOSTS.some((allowed) => host === allowed || host.endsWith(`.${allowed}`));
}

function json(body: object, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // ── Auth: caller must hold a valid session JWT ─────────────────────────
    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: req.headers.get("Authorization") ?? "" } },
    });
    const { data: { user }, error: authError } = await userClient.auth.getUser();
    if (authError || !user) return json({ error: "Not authenticated" }, 401);

    const adminClient = createClient(supabaseUrl, serviceKey);

    // ── Gate: approved student or admin only ───────────────────────────────
    const { data: roleRow } = await adminClient
      .from("user_roles")
      .select("role, is_approved")
      .eq("user_id", user.id)
      .maybeSingle();
    if (!roleRow || !roleRow.is_approved) {
      return json({ error: "Your account is awaiting approval" }, 403);
    }

    // ── Entitlement: same rule as serve-material ───────────────────────────
    let hasFullAccess = roleRow.role === "admin";
    if (!hasFullAccess) {
      const { data: sub } = await adminClient
        .from("subscriptions")
        .select("status, ends_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      hasFullAccess =
        !!sub && sub.status === "active" && (!sub.ends_at || new Date(sub.ends_at) > new Date());
    }

    // ── Request validation ─────────────────────────────────────────────────
    const { url, label } = await req.json().catch(() => ({ url: null, label: null }));
    if (typeof url !== "string" || !url.trim()) return json({ error: "Invalid url" }, 400);

    let parsed: URL;
    try {
      parsed = new URL(url.trim());
    } catch {
      return json({ error: "Invalid url" }, 400);
    }
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
      return json({ error: "Invalid url" }, 400);
    }
    if (!hostAllowed(parsed.hostname)) {
      return json({ error: "Host not allowed" }, 400);
    }

    const cleanLabel =
      typeof label === "string" && label.trim() ? label.trim().slice(0, 200) : parsed.hostname;

    // ── Audit: attribute the click either way ──────────────────────────────
    // A blocked attempt is as interesting as a successful one — it is the
    // signal that someone hit the paywall on an external paper.
    await adminClient.rpc("audit_admin_action", {
      p_action: "external_link_opened",
      p_entity: "external-paper",
      p_entity_id: null,
      p_entity_label: cleanLabel,
      p_details: {
        url: parsed.toString(),
        host: parsed.hostname,
        user_id: user.id,
        granted: hasFullAccess,
      },
      p_actor_id: user.id,
      p_actor_username: user.email ?? user.id,
    });

    if (!hasFullAccess) {
      // 403 (not a redirect): the app shows an upgrade prompt and never reveals
      // the destination to an unentitled client.
      return json(
        {
          error: "This paper is on the full plan",
          upgrade: true,
          message: "External past papers are part of the full plan. Upgrade to open it on the source site.",
        },
        403,
      );
    }

    // ── Entitled: hand back the real direct link ───────────────────────────
    // The client navigates to it in a new tab — a plain navigation, so the
    // third party's page loads exactly as it would from an <a href>.
    return json({ url: parsed.toString(), host: parsed.hostname }, 200);
  } catch (e) {
    return json({ error: (e as Error).message || "Unexpected error" }, 500);
  }
});
