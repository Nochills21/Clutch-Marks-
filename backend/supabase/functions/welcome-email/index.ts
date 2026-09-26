// Welcome email on signup. Fired by the auth trigger via pg_net (fire-and-forget)
// or by an admin dashboard. Gated by a shared secret (x-welcome-secret) stored in
// the private.app_secrets table — NOT deployable with verify_jwt because the
// trigger has no user JWT. Sends via Resend when RESEND_API_KEY is set as a
// function secret; otherwise logs and returns ok so the trigger never fails.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SITE_URL = Deno.env.get("SITE_URL") ?? "https://clutch-marks.lovable.app";
const FROM = Deno.env.get("WELCOME_FROM_EMAIL") ?? "Clutch Marks <onboarding@resend.dev>";

interface Recipient {
  email: string;
  fullName?: string | null;
  role?: string | null;
}

function welcomeHtml(name: string, isParent: boolean): string {
  const first = (name || "").split(" ")[0] || "there";
  if (isParent) {
    return `
    <div style="font-family:Segoe UI,Arial,sans-serif;max-width:520px;margin:0 auto;padding:24px;color:#1a1a2e">
      <h2 style="color:#5b21b6">Welcome to Clutch Marks, ${first} 👋</h2>
      <p>Your parent account is ready. Students who signed up with your email are already linked to your dashboard.</p>
      <p>You'll see their quiz scores, completed lessons, and recent activity at a glance.</p>
      <p style="margin:28px 0">
        <a href="${SITE_URL}/dashboard" style="background:#5b21b6;color:#fff;padding:12px 24px;border-radius:10px;text-decoration:none;font-weight:600">Open your dashboard</a>
      </p>
      <p style="color:#6b7280;font-size:13px">You can link more children anytime from the dashboard using their sign-up email.</p>
    </div>`;
  }
  return `
  <div style="font-family:Segoe UI,Arial,sans-serif;max-width:520px;margin:0 auto;padding:24px;color:#1a1a2e">
    <h2 style="color:#5b21b6">Welcome to Clutch Marks, ${first} 🎉</h2>
    <p>Your account is active — you can preview every subject at every level right now.</p>
    <ul>
      <li>Pick your subjects and start with the first lesson</li>
      <li>Take a quiz — we'll spot your weak topics and build practice from them</li>
      <li>Ready for everything? The full plan unlocks all notes, past papers and practice</li>
    </ul>
    <p style="margin:28px 0">
      <a href="${SITE_URL}/lessons" style="background:#5b21b6;color:#fff;padding:12px 24px;border-radius:10px;text-decoration:none;font-weight:600">Start learning</a>
    </p>
    <p style="color:#6b7280;font-size:13px">Aiming for A/A*? The full plan unlocks every lesson, note and past paper — see Pricing anytime.</p>
  </div>`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    if (req.method !== "POST") return new Response("Method not allowed", { status: 405, headers: corsHeaders });

    // Shared-secret gate: the signup trigger (and only it) knows this value.
    const expected = Deno.env.get("WELCOME_SECRET");
    const provided = req.headers.get("x-welcome-secret");
    if (!expected || provided !== expected) {
      return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const { recipient } = await req.json().catch(() => ({ recipient: null })) as { recipient?: Recipient };
    if (!recipient?.email) {
      return new Response(JSON.stringify({ error: "recipient email required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const apiKey = Deno.env.get("RESEND_API_KEY");
    if (!apiKey) {
      // No provider configured yet: succeed without sending so callers (the
      // signup trigger) never surface an error to the student.
      console.log("welcome-email skipped (no RESEND_API_KEY):", recipient.email);
      return new Response(JSON.stringify({ sent: false, skipped: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Reputation guard: never send to a bounced/complained address.
    const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { auth: { persistSession: false } });
    const { data: suppressed } = await admin.from("email_suppressions").select("email").eq("email", recipient.email.toLowerCase()).maybeSingle();
    if (suppressed) {
      console.log("welcome-email skipped (suppressed):", recipient.email);
      return new Response(JSON.stringify({ sent: false, skipped: true, reason: "suppressed" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const isParent = recipient.role === "parent";
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: FROM,
        to: [recipient.email],
        subject: isParent ? "Your Clutch Marks parent account is ready" : "Welcome to Clutch Marks 🎉",
        html: welcomeHtml(recipient.fullName, isParent),
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("resend error:", res.status, body.slice(0, 300));
      return new Response(JSON.stringify({ sent: false, error: body.slice(0, 200) }), { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({ sent: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    console.error("welcome-email error:", e instanceof Error ? e.message : e);
    return new Response(JSON.stringify({ sent: false }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
