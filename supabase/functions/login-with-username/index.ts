// Sign in with a username OR an email — password verified server-side.
//
// Why this exists: only GoTrue can check a password, but GoTrue needs the
// account's email. An admin can hand a student a username, and the admin panel
// promises "they'll be able to log in with this username or their email", so the
// app must be able to turn a username into a session. Doing that safely means:
//
//   * the email is never returned to the caller — an anonymous attacker who
//     guesses a username learns nothing (no address to phish, no account
//     enumeration oracle: a miss and a hit answer identically);
//   * failures are indistinguishable — same status, same body, same latency
//     floor, and a password grant is always attempted even when the identifier
//     does not exist;
//   * the attempt is throttled twice — per client IP and per identifier — so
//     credential stuffing against a known username is slow.
//
// The email-first `resolve-login-email` function stays admin-only and returns
// the address; this one is the path the login form uses.
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

// Distributed, database-backed caps so they hold across every warm instance.
const MAX_PER_IP = 30; // per IP per window
const MAX_PER_IDENTIFIER = 8; // per username/email per window
const WINDOW_SECONDS = 60;
// GoTrue's own per-IP limit is generous, but a burst from one visitor must not
// spend it for everybody, hence the caps above.
const FLOOR_MS = 400;

const USERNAME_RE = /^[A-Za-z0-9._-]{2,64}$/;

function clientKey(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for") ?? "";
  return (fwd.split(",")[0] || req.headers.get("cf-connecting-ip") || "unknown").trim();
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const startedAt = Date.now();
  // Every answer takes at least FLOOR_MS: an unknown username must not come
  // back measurably faster than a known one with a wrong password.
  const settle = async (body: unknown, status = 200) => {
    const elapsed = Date.now() - startedAt;
    if (elapsed < FLOOR_MS) await new Promise((r) => setTimeout(r, FLOOR_MS - elapsed));
    return json(body, status);
  };
  const reject = () => settle({ error: "invalid_credentials" }, 401);

  try {
    if (req.method !== "POST") return await settle({ error: "method_not_allowed" }, 405);

    const body = await req.json().catch(() => ({}));
    const identifier = typeof body?.identifier === "string" ? body.identifier.trim() : "";
    const password = typeof body?.password === "string" ? body.password : "";

    // Malformed input is answered exactly like a wrong password.
    if (!identifier || identifier.length > 320 || !password || password.length > 512) {
      return await reject();
    }

    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { persistSession: false, autoRefreshToken: false } },
    );

    const limited = async (key: string, max: number) => {
      const { data } = await admin.rpc("register_login_lookup", {
        _client_key: key,
        _max: max,
        _window_seconds: WINDOW_SECONDS,
      });
      return data === true;
    };

    if (await limited(`pw-ip:${clientKey(req)}`, MAX_PER_IP)) {
      return await settle({ error: "too_many_attempts" }, 429);
    }
    const idKey = identifier.toLowerCase();
    if (await limited(`pw-id:${idKey}`, MAX_PER_IDENTIFIER)) {
      return await settle({ error: "too_many_attempts" }, 429);
    }

    // Resolve the identifier to an email. This value never leaves the server.
    let email = "";
    if (identifier.includes("@")) {
      email = identifier.toLowerCase();
    } else {
      if (!USERNAME_RE.test(identifier)) return await reject();
      const { data, error } = await admin
        .from("profiles")
        .select("email, user_id")
        .ilike("username", identifier)
        .maybeSingle();
      if (error) console.error("login-with-username lookup error:", error.message);
      email = (data?.email ?? "").toLowerCase();
      // Older rows can carry a username without a mirrored address the profile
      // sync never backfilled; ask GoTrue for the account instead.
      if (!email && data?.user_id) {
        const { data: byId } = await admin.auth.admin.getUserById(data.user_id as string);
        email = (byId?.user?.email ?? "").toLowerCase();
      }
    }

    // Always attempt a password grant, even for a miss, so the two paths cost
    // the same. An unknown identifier is checked against a throwaway address.
    const attemptEmail = email || `missing-${crypto.randomUUID()}@login.invalid`;
    const anon = Deno.env.get("SUPABASE_ANON_KEY")!;
    const res = await fetch(
      `${Deno.env.get("SUPABASE_URL")}/auth/v1/token?grant_type=password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: anon,
          Authorization: `Bearer ${anon}`,
        },
        body: JSON.stringify({ email: attemptEmail, password }),
      },
    );

    const session = await res.json().catch(() => null);
    if (!res.ok) {
      // Never surface GoTrue's wording (it distinguishes "user not found" from
      // "invalid password" for some providers).
      return await reject();
    }
    if (!email || !session?.access_token || !session?.refresh_token) return await reject();

    return await settle({
      access_token: session.access_token,
      refresh_token: session.refresh_token,
      expires_in: session.expires_in ?? null,
      token_type: session.token_type ?? "bearer",
    });
  } catch (e) {
    console.error("login-with-username error:", e instanceof Error ? e.message : e);
    return await settle({ error: "invalid_credentials" }, 401);
  }
});
