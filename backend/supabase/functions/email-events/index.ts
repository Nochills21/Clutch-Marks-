// Resend webhook receiver: records bounces and spam complaints into the
// email_suppressions table so no sender ever emails a dead/inbox-complaining
// address again. Webhook secret: Resend signs with svix headers using the
// webhook's signing secret stored as RESEND_WEBHOOK_SECRET function env.
// Gate: requests without a valid svix signature are rejected 401.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Webhook } from "https://esm.sh/svix@1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, svix-id, svix-timestamp, svix-signature",
};

type ResendEvent = {
  type: "email.sent" | "email.delivered" | "email.bounced" | "email.complained" | string;
  created_at: string;
  data: {
    email_id: string;
    to: string | string[];
    bounce_type?: string; // 'hard' | 'soft' | 'transient'
    bounce_message?: string;
    [k: string]: unknown;
  };
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    if (req.method !== "POST") return new Response("Method not allowed", { status: 405, headers: corsHeaders });

    const secret = Deno.env.get("RESEND_WEBHOOK_SECRET");
    if (!secret) return new Response(JSON.stringify({ error: "webhook secret not configured" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    // svix signature verification (Resend uses svix).
    const headers = Object.fromEntries(req.headers.entries());
    const payload = await req.text();
    let event: ResendEvent;
    try {
      const wh = new Webhook(secret);
      event = wh.verify(payload, headers) as ResendEvent;
    } catch (e) {
      console.error("svix verify failed:", e instanceof Error ? e.message : e);
      return new Response(JSON.stringify({ error: "invalid signature" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { persistSession: false } },
    );

    const tos = Array.isArray(event.data.to) ? event.data.to : [event.data.to];
    const emails = tos.map((t) => t.toLowerCase().trim()).filter(Boolean);

    if (event.type === "email.bounced") {
      // Hard bounces: permanent suppression. Soft/transient: suppress too but
      // mark the reason so an admin can clear them after fixing the cause.
      for (const email of emails) {
        await admin.from("email_suppressions").upsert({
          email,
          reason: "bounce",
          detail: `${event.data.bounce_type ?? "unknown"}: ${(event.data.bounce_message ?? "").slice(0, 200)}`,
        });
      }
      console.log(`suppressed ${emails.length} bounced recipient(s)`);
    } else if (event.type === "email.complained") {
      // Spam complaint: permanent, never email this person again.
      for (const email of emails) {
        await admin.from("email_suppressions").upsert({
          email,
          reason: "complaint",
          detail: "marked as spam by recipient",
        });
      }
      console.log(`suppressed ${emails.length} complaining recipient(s)`);
    } else {
      // sent/delivered: no-op.
      return new Response(JSON.stringify({ ok: true, ignored: event.type }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({ ok: true, type: event.type, suppressed: emails }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    console.error("email-events error:", e instanceof Error ? e.message : e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "unknown" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
