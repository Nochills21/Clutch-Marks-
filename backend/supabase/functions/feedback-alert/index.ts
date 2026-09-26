// Admin alert when a student reports an error via the feedback system. Fired
// by the content_feedback insert trigger via pg_net (fire-and-forget — the
// student's submission never waits on mail). Gated by a shared secret
// (x-feedback-secret, stored in private.app_secrets). Sends via Resend when
// RESEND_API_KEY is set; otherwise logs and returns ok so the trigger never
// fails. Also accepts { feedbackId } replay for manual re-notification.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SITE_URL = Deno.env.get("SITE_URL") ?? "https://clutch-marks.lovable.app";
const FROM = Deno.env.get("WELCOME_FROM_EMAIL") ?? "Clutch Marks <onboarding@resend.dev>";

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

type FeedbackRow = {
  id: string;
  tool: string;
  tool_label: string | null;
  rating: string;
  message: string | null;
  created_at: string;
  reporter_name: string | null;
  reporter_email: string | null;
};

function alertHtml(f: FeedbackRow): string {
  const ratingEmoji: Record<string, string> = { error: "❌", confusing: "🤔", suggestion: "💡", helpful: "👍" };
  const emoji = ratingEmoji[f.rating] ?? "📝";
  return `
  <div style="font-family:Segoe UI,Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#1a1a2e">
    <h2 style="color:#b91c1c">${emoji} ${f.rating === "error" ? "Content error reported" : "New feedback reported"}</h2>
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      <tr><td style="color:#6b7280;padding:6px 0;width:110px">Tool</td><td><strong>${f.tool_label || f.tool}</strong></td></tr>
      <tr><td style="color:#6b7280;padding:6px 0">Rating</td><td>${f.rating}</td></tr>
      <tr><td style="color:#6b7280;padding:6px 0">Reported by</td><td>${f.reporter_name || "Unknown"} (${f.reporter_email || "no email"})</td></tr>
      <tr><td style="color:#6b7280;padding:6px 0">Message</td><td>${(f.message || "(no details)").replace(/</g, "&lt;")}</td></tr>
    </table>
    <p style="margin:24px 0">
      <a href="${SITE_URL}/admin/feedback" style="background:#5b21b6;color:#fff;padding:12px 24px;border-radius:10px;text-decoration:none;font-weight:600">Open feedback console</a>
    </p>
    <p style="color:#6b7280;font-size:13px">Error reports deserve a same-day look — fast fixes build trust during launch week.</p>
  </div>`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    if (req.method !== "POST") return new Response("Method not allowed", { status: 405, headers: corsHeaders });

    const expected = Deno.env.get("FEEDBACK_ALERT_SECRET");
    const provided = req.headers.get("x-feedback-secret");
    if (!expected || provided !== expected) {
      return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const payload = await req.json().catch(() => ({})) as { feedbackId?: string };

    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { persistSession: false } },
    );

    // Load the feedback row: by id (replay) or newest matching the trigger payload.
    // NOTE: content_feedback.user_id and user_roles.user_id reference auth.users,
    // not profiles, so profile info is fetched in separate queries.
    let fb: FeedbackRow | null = null;
    if (payload.feedbackId) {
      const { data, error } = await admin
        .from("content_feedback")
        .select("id, tool, tool_label, rating, message, created_at, user_id")
        .eq("id", payload.feedbackId)
        .maybeSingle();
      if (error) throw new Error(`feedback query: ${error.message}`);
      if (data) {
        const { data: prof } = await admin
          .from("profiles")
          .select("full_name, email")
          .eq("user_id", data.user_id)
          .maybeSingle();
        fb = { ...data, reporter_name: prof?.full_name ?? null, reporter_email: prof?.email ?? null };
      }
    }
    if (!fb) return new Response(JSON.stringify({ ok: false, reason: "feedback row not found" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });

    // Only error reports page admins (helpful/suggestion stay in the console).
    if (fb.rating !== "error") {
      return new Response(JSON.stringify({ ok: true, sent: 0, reason: `rating=${fb.rating} skipped` }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const { data: admins, error: adminsErr } = await admin
      .from("user_roles")
      .select("user_id")
      .eq("role", "admin");
    if (adminsErr) throw new Error(`admins query: ${adminsErr.message}`);
    const adminIds = (admins ?? []).map((a) => a.user_id);
    const emails: string[] = [];
    if (adminIds.length > 0) {
      const { data: profs } = await admin
        .from("profiles")
        .select("email")
        .in("user_id", adminIds);
      // Reputation guard: skip suppressed (bounced/complained) admins.
      const { data: suppressedRows } = await admin.from("email_suppressions").select("email");
      const suppressed = new Set((suppressedRows ?? []).map((s) => s.email.toLowerCase()));
      for (const p of profs ?? []) if (p.email && !suppressed.has(p.email.toLowerCase())) emails.push(p.email);
    }
    if (emails.length === 0) return new Response(JSON.stringify({ ok: true, sent: 0, reason: "no admins" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const apiKey = Deno.env.get("RESEND_API_KEY");
    if (!apiKey) {
      console.log("feedback-alert: RESEND_API_KEY not set; would have notified", emails.join(", "));
      return new Response(JSON.stringify({ ok: true, sent: 0, reason: "no RESEND_API_KEY", wouldNotify: emails }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const html = alertHtml(fb);
    const results = await Promise.all(emails.map((to) =>
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from: FROM, to: [to], subject: `❌ Error reported: ${fb!.tool_label || fb!.tool}`, html }),
      }).then((r) => ({ to, ok: r.ok, err: r.ok ? undefined : r.status }))
    ));

    return new Response(JSON.stringify({ ok: true, sent: results.filter((r) => r.ok).length, results }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    console.error("feedback-alert error:", e instanceof Error ? e.message : e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "unknown" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
