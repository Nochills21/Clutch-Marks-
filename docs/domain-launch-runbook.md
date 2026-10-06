# Domain Launch Runbook — clutchmarks.study

> **Partially superseded (5 October 2026).** The Cloudflare Pages steps here are
> obsolete — the frontend is on Vercel and the API on Render. Steps 3–5
> (Supabase, Resend, verification) are still accurate. Canonical checklist:
> [deploy-vercel-render.md](./deploy-vercel-render.md) §6.

Everything is prepped. Follow in order. Nothing here needs code changes.

## 0. What's already done (no domain needed)

- ✅ Email pipeline **verified** 6 Oct 2026 — welcome email accepted by Resend
  (`HTTP 200`, `{"sent":true}`). It was *not* working before that: until the
  sending domain was verified the sender was still on Resend's test address and
  every send was rejected 403. See `infrastructure.md` §3 for the full state.
- ✅ `RESEND_API_KEY` + `WELCOME_FROM_EMAIL` + `SITE_URL` set as Supabase secrets
- ✅ Resend sending domain `clutchmarks.study` **verified** (record id
  `f4f26552-9d65-4790-ba91-2db911513020`, Tokyo region) — DKIM/SPF/DMARC resolve
  publicly and the `send` subdomain has Resend's SES return-path MX
- ✅ Resend webhook registered → `email-events` (bounce/complaint suppression)
- ✅ Weekly parent digest + feedback error alerts deployed, secret-gated
- ✅ `site_url` = `https://clutchmarks.study` (see step 3)
- ✅ Frontend builds clean (`npm run build` → `dist/`) — verified from the repo root
- ✅ Bounce/complaint suppression pipeline built (waits only for the webhook secret)

## 1. Frontend deploy (10 min, can be done BEFORE the domain arrives)

1. Push the repo (done — `main` is current).
2. dash.cloudflare.com → Workers & Pages → Create → Pages → Connect to Git → pick
   the repo (`Nochills21/top-67`).
3. Build settings: framework `Vite`, build command `npm run build`, output `dist`.
4. Deploy → `clutchmarks.pages.dev` live immediately.
5. Pages project → Custom domains → add `clutchmarks.study` (shows "pending"
   until the DNS record in step 3 exists — that's expected).

## 2. Cloudflare DNS: point `clutchmarks.study` at the Pages project

In Cloudflare (the `clutchmarks.study` zone) add:

| Type | Name | Content | Proxy |
|---|---|---|---|
| CNAME | `@` | `clutchmarks.pages.dev` | Proxied |
| CNAME | `www` | `clutchmarks.pages.dev` | Proxied |

Then in the Pages project Custom domains add `clutchmarks.study` and
`www.clutchmarks.study`. Cloudflare serves the Pages project on the custom
domain once the CNAME resolves.

## 3. Supabase: update site_url + redirect URLs (2 min)

Supabase dashboard → Authentication → URL Configuration → Site URL:
`https://clutchmarks.study`
Also add to **Redirect URLs**: `https://clutchmarks.study/**` and
`https://www.clutchmarks.study/**`.

## 4. Resend webhook (DONE — registered 5 Oct 2026)

Registered in Resend → Webhooks:
`https://zzliiazovezhxbmfeqco.supabase.co/functions/v1/email-events`, subscribed
to `email.bounced` + `email.complained`, signing secret stored as the Supabase
function secret `RESEND_WEBHOOK_SECRET`.

Known-live, not just deployed: a real `email.complained` event has already run
through it and landed in `email_suppressions`. Requests without valid svix
headers are rejected `401` (so a `svix verify failed: Missing required headers`
line in the logs means a probe hit the URL by hand, not that Resend is broken).

## 5. Verify end-to-end (launch checklist)

- [ ] `https://clutchmarks.study` loads the app; `www` resolves to root
- [x] Resend domain shows "Verified"; the test-mode restriction is gone (6 Oct 2026)
- [x] Signup welcome email accepted by Resend from `@clutchmarks.study`
- [x] Resend webhook → `email-events` delivering (a real complaint was suppressed)
- [ ] Sign up a real student → welcome email **arrives in the inbox** (accepted by
      Resend ≠ landed; confirm once in a real mailbox)
- [ ] Forgot-password email arrives with `clutchmarks.study` reset links
- [ ] Weekly digest fires (invoke with `dryRun:false` via secret)
- [ ] Feedback error report emails admins from `@clutchmarks.study`
- [ ] Privacy/Terms/Support links work; SEO meta shows the new domain

## 6. After launch

- Google Search Console: submit `https://clutchmarks.study/sitemap.xml`.
- `VITE_PLAUSIBLE_DOMAIN=clutchmarks.study` in Pages build env → redeploy.
- The blog lives on the same Pages project (see docs/infrastructure.md) — no
  extra infrastructure needed.
