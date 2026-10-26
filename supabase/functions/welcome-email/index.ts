// Welcome email on signup. Fired by the auth trigger via pg_net (fire-and-forget)
// or by an admin dashboard. Gated by a shared secret (x-welcome-secret) stored in
// the private.app_secrets table — NOT deployable with verify_jwt because the
// trigger has no user JWT. Sends via Resend when RESEND_API_KEY is set as a
// function secret; otherwise logs and returns ok so the trigger never fails.
//
// The body is a real onboarding letter rather than a one-line greeting: the three
// steps that get a new account to its first study session, a map of what is on the
// account, and the study method the product is built around. Two constraints are
// load-bearing and are asserted by frontend/src/lib/email-config.test.ts:
//   * reply_to is SUPPORT_EMAIL, because the sending identity is not monitored;
//   * each body carries the contact line (reply, or write to the support address)
//     exactly once, so a student always has a route to a person. The test counts
//     that phrase literally, so do not repeat it in a comment.
// Keep the builders free of Deno APIs and of type annotations: they are pure
// string functions, which is what lets a local script render them for review.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SITE_URL = Deno.env.get("SITE_URL") ?? "https://clutchmarks.study";
const FROM = Deno.env.get("WELCOME_FROM_EMAIL") ?? "Clutch Marks <onboarding@resend.dev>";
// The monitored inbox, the same one SITE.supportEmail publishes in the app.
// Reply-To points here so hitting reply reaches a person rather than the
// sending identity (no-reply@ / onboarding@resend.dev), which nobody reads.
const SUPPORT_EMAIL = Deno.env.get("SUPPORT_EMAIL") ?? "clutchmarks.support@gmail.com";
// The signature. One line to change if the letter should come from "the team".
const SIGNER = "Zaid";

interface Recipient {
  email: string;
  fullName?: string | null;
  role?: string | null;
}

/* ── Shared shell ─────────────────────────────────────────────────────── */

// A table-based 600 px frame with inline styles only: no <style> block (Gmail
// strips parts of it), no external images (they are blocked by default and the
// email then looks broken), no web font (falls back to the system stack).
function shell(preheader, inner) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<title>Clutch Marks</title>
</head>
<body style="margin:0;padding:0;background:#f4f1fa;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:#f4f1fa;">${preheader}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f1fa;">
<tr><td align="center" style="padding:28px 12px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:#ffffff;border:1px solid #e6e1f0;border-radius:14px;">
<tr><td style="padding:30px 32px 8px 32px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <div style="font-size:13px;letter-spacing:2.4px;font-weight:700;color:#5b21b6;">CLUTCH MARKS</div>
  <div style="font-size:11px;letter-spacing:1.2px;color:#6b7280;margin-top:5px;">CAMBRIDGE IGCSE · AS · A2</div>
  <div style="height:1px;background:#ece7f5;margin:20px 0 0 0;"></div>
</td></tr>
<tr><td style="padding:26px 32px 8px 32px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1a1a2e;font-size:16px;line-height:1.62;">
${inner}
</td></tr>
<tr><td style="padding:6px 32px 30px 32px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#6b7280;font-size:12px;line-height:1.65;">
  <div style="height:1px;background:#ece7f5;margin:0 0 16px 0;"></div>
  <p style="margin:0 0 10px 0;">You are receiving this because a Clutch Marks account was created with this address. If that was not you, reply and we will remove it.</p>
  <p style="margin:0 0 10px 0;">Clutch Marks · <a href="${SITE_URL}/privacy" style="color:#5b21b6;text-decoration:underline;">Privacy notice</a> · <a href="${SITE_URL}/terms" style="color:#5b21b6;text-decoration:underline;">Terms</a> · <a href="${SITE_URL}/settings" style="color:#5b21b6;text-decoration:underline;">Email preferences</a></p>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

function cta(label, path) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:26px 0 6px 0;">
<tr><td style="border-radius:10px;background:#5b21b6;">
<a href="${SITE_URL}${path}" style="display:inline-block;padding:14px 26px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:10px;">${label}</a>
</td></tr>
</table>`;
}

function step(n, title, body, link, linkLabel) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 16px 0;">
<tr>
  <td width="34" valign="top" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;font-weight:700;color:#5b21b6;padding-top:2px;">${n}</td>
  <td valign="top" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#1a1a2e;">
    <strong>${title}</strong><br>${body}${link ? `<br><a href="${SITE_URL}${link}" style="color:#5b21b6;text-decoration:underline;">${linkLabel}</a>` : ""}
  </td>
</tr>
</table>`;
}

// Stacked rather than two-column: on a 360 px phone the card is about 296 px
// wide, and a 150 px label column leaves the detail in a 146 px ribbon that wraps
// to five lines. Name on its own line, detail beneath it, reads at any width.
function feature(name, detail) {
  return `<div style="border-top:1px solid #ece7f5;padding:12px 0 0 0;margin:0 0 12px 0;">
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.4;color:#1a1a2e;font-weight:600;">${name}</div>
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:14px;line-height:1.6;color:#3f4350;margin-top:3px;">${detail}</div>
</div>`;
}

function signOff() {
  return `<p style="margin:26px 0 0 0;color:#1a1a2e;">${SIGNER}<br><span style="color:#6b7280;font-size:14px;">Clutch Marks</span></p>`;
}

/* ── Student ──────────────────────────────────────────────────────────── */

function studentHtml(first) {
  const inner = `
  <h1 style="margin:0 0 14px 0;font-size:26px;line-height:1.3;color:#1a1a2e;">You're in, ${first}.</h1>

  <p style="margin:0 0 14px 0;">Your Clutch Marks account is live, and nothing is on a waiting list. Six subjects, at Cambridge IGCSE, AS and A2 — Mathematics, Physics, Chemistry, Biology, Computer Science, and English (Cambridge First Language and OxfordAQA ESL) — are now one click away.</p>

  <p style="margin:0 0 22px 0;">This email is short on purpose: three things to do now, a map of what you have, and the one study habit that makes the rest of it work.</p>

  <h2 style="margin:0 0 16px 0;font-size:18px;line-height:1.4;color:#1a1a2e;">Start with these three — about twenty minutes</h2>

  ${step(
    "1.",
    "Pick your subjects and your level.",
    "Choose only what you actually sit. A shorter list makes every later screen faster to use, and you can change it at any time.",
    "/subjects",
    "Choose subjects →",
  )}
  ${step(
    "2.",
    "Read one topic's notes end to end.",
    "Not a skim. Each note is written from the specification: the explanation, a worked example with every line of working, the exam traps, and questions with model answers at the end.",
    "/notes",
    "Browse the notes →",
  )}
  ${step(
    "3.",
    "Take that topic's quiz, then practise what it gets wrong.",
    "The quiz is not a scoreboard. It finds the specific things you cannot yet do, and puts them into a review queue that comes back to them later.",
    "/quizzes",
    "Open a quiz →",
  )}

  <h2 style="margin:26px 0 4px 0;font-size:18px;line-height:1.4;color:#1a1a2e;">Everything now on your account</h2>
  <div style="margin:10px 0 4px 0;">
    ${feature("Revision notes", "One page per topic: the specification's own wording, worked examples, examiner traps, and marked exam questions.")}
    ${feature("Past papers", "Filter by subject, by topic, or by year — so you can revise one topic across ten years in a single sitting.")}
    ${feature("Quizzes", "Per objective rather than per topic, so a mark tells you which specific skill is missing, not just that the topic is 'weak'.")}
    ${feature("Review queue", "Anything you get wrong comes back at 1, 3, 7, 16 and 35 days. It is the single highest-value thing on the site.")}
    ${feature("Flashcards", "Quick recall for definitions, formulae, and the vocabulary the mark schemes insist on.")}
    ${feature("AI Marker", "Upload a photo or a PDF of a handwritten script and get it marked against the mark scheme, with the marks you dropped and why.")}
    ${feature("Study planner", "Works backwards from your exam dates and tells you what to do today.")}
    ${feature("Progress", "Which topics are genuinely secure, and which only feel secure.")}
  </div>

  <h2 style="margin:26px 0 10px 0;font-size:18px;line-height:1.4;color:#1a1a2e;">The habit that makes it work</h2>
  <p style="margin:0 0 12px 0;">Reading notes feels like progress and is not, on its own. The loop that moves grades is this one, per topic:</p>
  <p style="margin:0 0 12px 0;padding:14px 16px;background:#faf8fd;border-left:3px solid #5b21b6;border-radius:0 8px 8px 0;">
    <strong>Read</strong> the note once → <strong>answer</strong> the quiz without notes → <strong>mark</strong> what you got wrong → <strong>re-read only that part</strong> → come back to it when the review queue asks.
  </p>
  <p style="margin:0 0 6px 0;">One topic per sitting beats four topics skimmed. If you do only one thing with this account in the first week, let it be the review queue: it is the difference between revising and re-reading.</p>

  ${cta("Open Clutch Marks", "/dashboard")}

  <p style="margin:18px 0 0 0;font-size:14px;color:#3f4350;">Two small things worth doing now: set a username in <a href="${SITE_URL}/settings" style="color:#5b21b6;text-decoration:underline;">Settings</a> so you can sign in with a handle instead of typing your email, and add the site to your phone's home screen so a five-minute session is actually five minutes.</p>

  <p style="margin:16px 0 0 0;font-size:14px;color:#3f4350;">The free plan covers IGCSE lessons, notes and quizzes, which is enough to start today. A paid plan opens every level, AS and A2 included, together with the AI Marker — <a href="${SITE_URL}/pricing" style="color:#5b21b6;text-decoration:underline;">the pricing page</a> lists exactly what is in each, so upgrade only when you actually need it.</p>

  <p style="margin:20px 0 0 0;font-size:14px;color:#3f4350;">If a note is wrong, a question is unfair, or something simply does not work, tell us — corrections are the fastest way this gets better. Reply to this email or write to ${SUPPORT_EMAIL} and a person will read it.</p>

  ${signOff()}`;
  return shell("You're in. Three things to do first, and a map of everything on your account.", inner);
}

function studentText(first) {
  return `You're in, ${first}.

Your Clutch Marks account is live. Six subjects at Cambridge IGCSE, AS and A2 — Mathematics, Physics, Chemistry, Biology, Computer Science, and English (Cambridge First Language and OxfordAQA ESL).

START WITH THESE THREE (about twenty minutes)

1. Pick your subjects and level: ${SITE_URL}/subjects
   Choose only what you actually sit; you can change it later.

2. Read one topic's notes end to end: ${SITE_URL}/notes
   Explanation, a worked example with every line, exam traps, and marked questions.

3. Take that topic's quiz, then practise what it gets wrong: ${SITE_URL}/quizzes
   The quiz finds the specific skills you cannot yet do.

WHAT IS ON YOUR ACCOUNT

- Revision notes: one page per topic, written from the specification.
- Past papers: filter by subject, topic or year.
- Quizzes: per objective, so a mark tells you which skill is missing.
- Review queue: wrong answers come back at 1, 3, 7, 16 and 35 days.
- Flashcards: definitions, formulae and mark-scheme vocabulary.
- AI Marker: upload a photo or PDF of a handwritten script and get it marked.
- Study planner: works backwards from your exam dates.
- Progress: which topics are genuinely secure.

THE HABIT THAT MAKES IT WORK

Read the note once, answer the quiz without notes, mark what you got wrong, re-read only that part, and come back when the review queue asks. One topic per sitting beats four skimmed.

Open Clutch Marks: ${SITE_URL}/dashboard

Set a username in Settings so you can sign in with a handle: ${SITE_URL}/settings

The free plan covers IGCSE lessons, notes and quizzes. A paid plan opens every level, AS and A2 included, plus the AI Marker; the pricing page lists what is in each: ${SITE_URL}/pricing

If a note is wrong or something does not work, email ${SUPPORT_EMAIL} and a person will read it.

${SIGNER}
Clutch Marks

You are receiving this because a Clutch Marks account was created with this address. If that was not you, reply and we will remove it.`;
}

/* ── Parent ───────────────────────────────────────────────────────────── */

function parentHtml(first) {
  const inner = `
  <h1 style="margin:0 0 14px 0;font-size:26px;line-height:1.3;color:#1a1a2e;">Your parent dashboard is ready, ${first}.</h1>

  <p style="margin:0 0 14px 0;">Your Clutch Marks parent account is active. A student who signed up with this email address is already linked to it, so there is nothing to set up before you can look.</p>

  <p style="margin:0 0 22px 0;">The dashboard is deliberately about evidence rather than encouragement: which topics have been studied, which quizzes were taken, what was scored, and where the marks were lost. The weekly digest email carries the same summary so you do not have to remember to check.</p>

  <h2 style="margin:0 0 4px 0;font-size:18px;line-height:1.4;color:#1a1a2e;">What you can see</h2>
  <div style="margin:10px 0 4px 0;">
    ${feature("Quiz results", "Every quiz attempt, the score, and which questions were answered wrongly — with the topic each one tests.")}
    ${feature("Study activity", "Lessons and notes opened, and when. Silence for a fortnight is visible at a glance.")}
    ${feature("Topic security", "Not just '%' correct: which topics are secure, which are shaky, and which have never been attempted.")}
    ${feature("Weekly digest", "One email a week with the same summary, so progress can be followed without logging in.")}
  </div>

  <h2 style="margin:26px 0 10px 0;font-size:18px;line-height:1.4;color:#1a1a2e;">Adding another child</h2>
  <p style="margin:0 0 12px 0;">If a second student signs up using this email address, they are linked automatically. If they used a different address, add it from the dashboard: <em>Dashboard → Add a child → their sign-up email</em>. A student can be linked to more than one parent account, and a parent account can hold more than one student.</p>

  <h2 style="margin:26px 0 10px 0;font-size:18px;line-height:1.4;color:#1a1a2e;">What you do not get</h2>
  <p style="margin:0 0 12px 0;">You see progress and scores, not passwords, and you cannot sign in as your child. We think that boundary matters: a study account works only if the student is willing to get things wrong in it, and a dashboard that reads like surveillance stops that happening.</p>

  <h2 style="margin:26px 0 10px 0;font-size:18px;line-height:1.4;color:#1a1a2e;">If a score looks wrong</h2>
  <p style="margin:0 0 12px 0;">Every question on the site shows its working and its answer, and any of them can be reported from the page it appears on. Corrections are reviewed and, where a question is unfair or a mark scheme is misread, fixed — so a disagreement about a score is worth raising rather than enduring.</p>

  ${cta("Open your dashboard", "/dashboard")}

  <p style="margin:18px 0 0 0;font-size:14px;color:#3f4350;">The digest arrives weekly; if it does not, check that this address is not in a spam folder, then reply and we will look at the delivery records.</p>

  <p style="margin:16px 0 0 0;font-size:14px;color:#3f4350;">Something not working, or a question about the account? Reply to this email or write to ${SUPPORT_EMAIL} — a person reads it.</p>

  ${signOff()}`;
  return shell("Your parent account is live. Here is what the dashboard shows, and how to add another child.", inner);
}

function parentText(first) {
  return `Your parent dashboard is ready, ${first}.

Your Clutch Marks parent account is active. A student who signed up with this email address is already linked to it.

WHAT YOU CAN SEE

- Quiz results: every attempt, the score, and which questions were answered wrongly.
- Study activity: lessons and notes opened, and when.
- Topic security: which topics are secure, shaky, or never attempted.
- Weekly digest: the same summary by email once a week.

ADDING ANOTHER CHILD

A second student who signs up with this email is linked automatically. Otherwise add their sign-up email from Dashboard -> Add a child.

WHAT YOU DO NOT GET

You see progress and scores, not passwords, and you cannot sign in as your child.

Open your dashboard: ${SITE_URL}/dashboard

If a score looks wrong, every question shows its working and can be reported from its page.

Something not working, or a question about the account? Email ${SUPPORT_EMAIL} and a person will read it.

${SIGNER}
Clutch Marks

You are receiving this because a Clutch Marks account was created with this address. If that was not you, reply and we will remove it.`;
}

function welcomeHtml(name, isParent) {
  const first = (name || "").split(" ")[0] || "there";
  return isParent ? parentHtml(first) : studentHtml(first);
}

function welcomeText(name, isParent) {
  const first = (name || "").split(" ")[0] || "there";
  return isParent ? parentText(first) : studentText(first);
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
        reply_to: SUPPORT_EMAIL,
        subject: isParent
          ? "Your Clutch Marks parent dashboard is ready"
          : "Welcome to Clutch Marks — start with these three",
        html: welcomeHtml(recipient.fullName, isParent),
        text: welcomeText(recipient.fullName, isParent),
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
