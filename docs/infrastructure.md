# Infrastructure — what lives where

Clutch Marks runs on **two platforms plus a sender**. Everything is free-tier
friendly: Cloudflare (domain + DNS + Pages) and Supabase are the only platforms;
Resend sends email. **No shared hosting anywhere.**

```
┌────────────────────┐   DNS records          ┌──────────────────┐
│    CLOUDFLARE      │───────────────────────►│      RESEND      │
│  Registrar:        │   DKIM/SPF/DMARC       │ transactional    │
│  clutchmarks.com   │                        │ email (sending)  │
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

- **Registrar** for `clutchmarks.com` (at-cost pricing, ~$10/yr, no upsells).
- **DNS authority** — all records live here: site A/CNAME → Pages, Resend
  DKIM/SPF/DMARC TXT records, and any future blog records.
- **Pages** hosts the static React app free: connects to GitHub
  (`Nochills21/top-67`), auto-deploys on every push to `main`, instant rollbacks,
  preview URLs for branches, HTTPS automatic. SPA fallback is built in.
- Custom domain: add `clutchmarks.com` + `www` in the Pages project; Cloudflare
  provisions certificates automatically since DNS is already on-platform.

## 2. Supabase — all backend logic

- **Postgres + Row Level Security** — every table's security is RLS in Postgres.
- **Auth (GoTrue)** — email/password, JWTs, leaked-password protection, roles,
  password resets.
- **Edge Functions** (Deno) — `resolve-login-email`, `welcome-email`,
  `weekly-digest`, `feedback-alert`, `email-events` (Resend webhooks),
  `manage-accounts`, `promote-admin`, `quiz-feedback`, `generate-questions`,
  `study-planner`.
- **pg_cron + pg_net** — nightly audit-log archiving; weekly parent digest
  (Mondays 07:00 UTC).

## 3. Resend — transactional email

- Sends all app email (welcome, digests, error alerts) from `@clutchmarks.com`
  once the domain is verified in Resend (DNS records live in Cloudflare).
- Webhooks (`email.bounced`, `email.complained`) post back to the `email-events`
  function, feeding the suppression list that protects deliverability.
- `support@clutchmarks.com` (inbound mail) is handled separately — see the
  runbook's forwarding section (Cloudflare Email Routing, free).

## Future: marketing blog

The blog lives on **Cloudflare Pages too** — no WordPress needed. Two options:

1. **Same Pages project** (recommended): add a `/blog` section to the repo with
   static/SSG posts (Astro, or plain markdown rendered at build). Deploys with
   the app, shares the domain, zero extra infra.
2. **Second Pages project** on `blog.clutchmarks.com` if content tooling should
   stay decoupled from app releases.

Cloudflare Email Routing can also provide `support@clutchmarks.com` forwarding
without any hosting plan at all.

## Reference

- Production URL: `https://clutchmarks.com` (update Supabase Auth `site_url` when live).
- Local dev: `npm run dev` (Vite, port 8080).
- Secrets inventory: `RESEND_API_KEY`, `WELCOME_FROM_EMAIL`, `RESEND_WEBHOOK_SECRET`,
  `DIGEST_SECRET`, `FEEDBACK_ALERT_SECRET`, `WELCOME_SECRET` (Supabase function
  secrets / `private.app_secrets`); `VITE_PLAUSIBLE_DOMAIN` (Pages build env).
- Deploy checklist: push to `main` → Pages auto-deploys → apply Supabase
  migrations manually via the apply-migration script → verify preview.
