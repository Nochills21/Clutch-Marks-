# Infrastructure — what lives where

Clutch Marks runs on **two platforms plus a sender**. Everything is free-tier
friendly: Cloudflare (domain + DNS) and Supabase are the only platforms;
Resend sends email. **No shared hosting anywhere.**

```
┌────────────────────┐   DNS records          ┌──────────────────┐
│    CLOUDFLARE      │───────────────────────►│      RESEND      │
│  Registrar:        │   DKIM/SPF/DMARC       │ transactional    │
│  clutchmarks.study │                        │ email (sending)  │
│  DNS authority     │                        └──────────────────┘
│  Pages (CDN host)  │
│  static React app  │                        ┌──────────────────┐
│                    │◄──────────────────────►│     SUPABASE     │
│                    │   REST/RPC/Edge        │ Postgres + RLS   │
│                    │                        │ Auth (GoTrue)    │
└────────────────────┘                        │ Edge Functions   │
                                              │ pg_cron / pg_net │
                                              └──────────────────┘
```

## 1. Cloudflare — domain, DNS, frontend hosting

- **Registrar** for `clutchmarks.study` (at-cost pricing, ~$10/yr, no upsells).
- **DNS authority** — ⚠️ still **Vercel DNS** today (`clutchmarks.study` delegates
  to `ns1/ns2.vercel-dns.com`): site A/CNAME *and* the Resend DKIM/SPF/DMARC
  records live there. The Cloudflare zone exists but the nameserver cutover is
  outstanding — see `deploy-vercel-render.md` §B before assuming anything is in
  Cloudflare.
- **Pages** hosts the static React app free: connects to GitHub
  (`Nochills21/top-67`), auto-deploys on every push to `main`, instant rollbacks,
  preview URLs for branches, HTTPS automatic. SPA fallback is built in.
- Custom domain: add `clutchmarks.study` + `www` in the Pages project; Cloudflare
  provisions certificates automatically since DNS is already on-platform.

## 2. Supabase — all backend logic

- **Postgres + Row Level Security** — every table's security is RLS in Postgres.
- **Auth (GoTrue)** — email/password, JWTs, leaked-password protection, roles,
  password resets.
- **Edge Functions** (Deno) — `resolve-login-email`, `welcome-email`,
  `weekly-digest`, `feedback-alert`, `email-events` (Resend webhooks),
  `manage-accounts`, `promote-admin`, `quiz-feedback`, `generate-questions`,
  `study-planner`, `past-papers-harvest`.
- **pg_cron + pg_net** — nightly audit-log archiving; weekly parent digest
  (Mondays 07:00 UTC); weekly past-paper link check / harvest (Mondays 06:00 UTC).

## 3. Resend — transactional email

**Status: verified end-to-end, 6 October 2026.** The sending domain
`clutchmarks.study` is verified in Resend (domain record
`f4f26552-9d65-4790-ba91-2db911513020`, Tokyo region) and every app email —
welcome, weekly digests, error alerts — leaves from it. The Resend test sender
(`onboarding@resend.dev`) is gone.

- **Sender:** `no-reply@clutchmarks.study`, set through the `WELCOME_FROM_EMAIL`
  function secret (so the `from` address can change without a redeploy).
- **Inbound:** `support@clutchmarks.study` is inbound-only, routed by **Resend
  Inbound** — the apex MX is `10 inbound-smtp.ap-northeast-1.amazonaws.com`.
  (Not Cloudflare Email Routing: that needs the Cloudflare zone to be active,
  and it isn't.)
- **DNS records live in Vercel DNS**, not Cloudflare — `clutchmarks.study` still
  delegates to `ns1/ns2.vercel-dns.com` and the Cloudflare zone cutover
  (`deploy-vercel-render.md` §B) has not happened. Verified live,
  6 October 2026:

  | Record | Value (verified) |
  |---|---|
  | `resend._domainkey` TXT | `p=MIGf…` (DKIM public key) |
  | `send` TXT | `v=spf1 include:amazonses.com ~all` |
  | `send` MX | `10 feedback-smtp.us-east-1.amazonses.com` (Resend return path) |
  | `_dmarc` TXT | `v=DMARC1; p=none;` (monitor only — tighten to `quarantine` once confident) |

  The `send`/`resend._domainkey` names are Resend's own convention (it sends via
  Amazon SES underneath), so don't “tidy” them onto the apex.
- **Function secrets:** `RESEND_API_KEY` (sending), `WELCOME_FROM_EMAIL` (from
  address), `RESEND_WEBHOOK_SECRET` (svix signing secret) and `SITE_URL` (origin
  for links inside emails) are all set. Supabase's Management API now returns
  only a SHA-256 digest per secret, so you can confirm a secret *exists* from
  the API but must read its value in the dashboard.
- **Webhook → suppression pipeline (live):** Resend posts `email.bounced` +
  `email.complained` to `POST /functions/v1/email-events`, svix-signed;
  the function upserts into `email_suppressions`, and `welcome-email` refuses a
  suppressed address (returns `{"sent":false,"skipped":true,"reason":"suppressed"}`).
  A real complaint has already travelled this path, so it is known-working
  rather than merely deployed.
- **Acceptance test:** `POST /functions/v1/welcome-email` with the
  `x-welcome-secret` header returns `HTTP 200` **and** `{"sent":true}` when
  Resend accepts the message. Anything else is a real delivery failure: the
  response is kept in `net._http_response` and the same error is echoed to the
  `function_logs` stream (`resend error: <status> <body>`).

### Failure modes seen in production — check these first

| Resend reply | What it means | Fix |
|---|---|---|
| `403 … You can only send testing emails to your own email address (…)` | the from address is still the test sender `onboarding@resend.dev` | verify the domain, then set `WELCOME_FROM_EMAIL` to an `@clutchmarks.study` address |
| `403 … The clutchmarks.study domain is not verified` | the Resend domain record exists but verification never completed | finish/repair verification under Resend → Domains |
| `401 … API key is invalid` | `RESEND_API_KEY` was rotated or truncated | re-copy the key into function secrets |

All three are surfaced by `welcome-email` as `502 {"sent":false,"error":…}` so
signups never silently lose their welcome mail.

**Incident history.** 5 Oct 2026: two signups (~12:17 and ~12:42 UTC) received
no welcome email — the function returned 502 because the sender was still on the
Resend test domain. Both were re-sent successfully on 6 Oct 2026 (`HTTP 200`,
`{"sent":true}`) after verification completed. Open follow-ups: delete the
stale `.com` entry still sitting in Resend → Domains, and swap
`RESEND_API_KEY` for a sending-only (least-privilege) key.

## Future: marketing blog

The blog lives on **Cloudflare Pages too** — no WordPress needed. Two options:

1. **Same Pages project** (recommended): add a `/blog` section to the repo with
   static/SSG posts (Astro, or plain markdown rendered at build). Deploys with
   the app, shares the domain, zero extra infra.
2. **Second Pages project** on `blog.clutchmarks.study` if content tooling should
   stay decoupled from app releases.

Cloudflare Email Routing can also provide `support@clutchmarks.study` forwarding
without any hosting plan at all.

## Reference

- Production URL: `https://clutchmarks.study` (Supabase Auth `site_url` already set).
- Local dev: `npm run dev` (Vite, port 8080).
- Secrets inventory: `RESEND_API_KEY`, `WELCOME_FROM_EMAIL`, `RESEND_WEBHOOK_SECRET`,
  `DIGEST_SECRET`, `FEEDBACK_ALERT_SECRET`, `WELCOME_SECRET`, `HARVEST_SECRET`
  (Supabase function secrets / `private.app_secrets`); `VITE_PLAUSIBLE_DOMAIN`
  (Pages build env).
- Deploy checklist: push to `main` → Pages auto-deploys → apply Supabase
  migrations manually via the apply-migration script → verify preview.
