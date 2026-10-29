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
  `manage-accounts`, `quiz-feedback`, `generate-questions`,
  `study-planner`, `past-papers-harvest`, `billing`, `stripe-webhook`.
- **pg_cron + pg_net** — nightly audit-log archiving; weekly parent digest
  (Mondays 07:00 UTC); weekly past-paper link check / harvest (Mondays 06:00 UTC).

## 3. Stripe — subscriptions, the 3-day trial and refunds

**Status: code and catalog in place, two secrets pending.** Billing replaced the
manual bank-transfer / UrPay flow on 2026-10-28. There is no receipt upload, no
verification queue and **no browser write path to `subscriptions`** — the
webhook is the only writer.

- **Catalog (live mode):** one product per plan, each with its default recurring
  Price. The Price id lives in `plans.stripe_price_id`:

  | Plan | Amount | Recurs | Price id |
  |---|---|---|---|
  | Monthly | $20.00 | every month | `price_1UVmz5Q3xk2ovSDMNtZxMoz6` |
  | 3 Months | $45.00 | every 3 months | `price_1UVUmDQ3xk2ovSDMiGo3YCK9` |
  | Annual | $100.00 | every year | `price_1UVmz6Q3xk2ovSDMjndzjLiV` |

  The 2026-10-29 price change replaced the $30 monthly and $80 annual Prices
  (`price_1UVUmDQ3xk2ovSDM0vaSML20`, `price_1UVUmDQ3xk2ovSDM80b8taAE`); those two
  are archived and the new Prices are each product's default.

  `billing` re-reads the Price before every Checkout and refuses to charge when
  its amount, currency or interval disagrees with `price_total`/`months`
  (`409 price_mismatch`). A price change is therefore three steps: update
  `plans`, create a new Stripe Price, update `stripe_price_id`.
- **Adaptive Pricing: on** (account setting; `billing` sends no `adaptive_pricing`).
  Checkout presents the student's local currency — a Saudi visitor is shown the
  $20 plan as **SAR 78.06**, i.e. the SAR peg (3.75/USD) plus Stripe's 2–4%
  conversion fee, which the customer pays. Session `currency`/`amount_total`
  remain USD, so a Stripe API read looks unchanged; only the hosted page shows
  the local amount. This is a deliberate trade for local payment methods
  (Klarna, Amazon Pay and Link need local presentment). Disabling it is
  `adaptive_pricing[enabled]=false` on the Checkout Session — verified to render
  `$20.00` — and would have to be paired with copy that no longer promises
  local-currency flexibility.
- **Payment methods:** Stripe's dynamic set, configured in the Dashboard
  (Settings → Payments). The Checkout Session API now **rejects**
  `payment_method_types` (`parameter is no longer supported`), so `billing`
  sends none; card is enabled on the account and **Apple Pay** appears
  automatically as a wallet inside card on supported devices. No domain
  registration is needed because Stripe hosts the Checkout page. The account
  already has `card_payments: active`. If Checkout ever offers more methods than
  card/Apple Pay, restrict them with a payment method configuration in the
  Dashboard rather than reintroducing the rejected parameter.
- **Trial:** `subscription_data[trial_period_days]=3` in `billing`
  (`export const TRIAL_DAYS`). The card is collected up front on purpose —
  `payment_method_collection` stays at its default so the conversion can charge.
- **Functions:** `billing` (`verify_jwt: true`) starts Checkout / opens the
  customer portal; `stripe-webhook` is deployed **`--public`** because Stripe
  cannot present a Supabase token, and authenticates with the
  `Stripe-Signature` HMAC instead. An unsigned or stale (>5 min) request is 400;
  a missing secret is a fail-closed 500, never an open door.
- **Function secrets (installed 2026-10-28, live):** `STRIPE_SECRET_KEY` and
  `STRIPE_WEBHOOK_SECRET`. The key in place is a **live restricted key**
  (`rk_live_…`), not a full secret key: it carries exactly the permissions the
  flow uses — Prices read, Checkout Sessions write, Customers write,
  Subscriptions read, Billing Portal write, Webhook Endpoints write. Stripe
  answers a subscription **update** made with this key with a human-approval
  request (403) rather than applying it, which is harmless here because the app
  only ever *reads* subscriptions; cancelling is the customer portal's job. If
  the key is ever rotated, keep those permissions or Checkout and Manage
  billing stop working. A `sk_test_…` key must not be installed: it cannot
  charge the live Prices, and the webhook would write a real access row for a
  test subscription.
- **Stay on live keys.** Test mode was tried and removed on 2026-10-28: Prices
  are mode-specific, so test prices would have to sit beside the live ids, and a
  test subscription written by the webhook would grant real access in this
  production database. This project's `subscriptions` table has no mode column,
  so a test key must not be installed here.
- **Customer portal:** `Manage billing` on /pricing opens
  `billing_portal/sessions`. The account has a saved default configuration
  (`bpc_1UValVQ3xk2ovSDMpl7nJlgH`, created 2026-10-28; cancel mode
  `at_period_end`), so sessions open. Without one, `billing` answers 503
  `portal_not_configured` rather than a raw Stripe error — and cancellation,
  which the refund policy relies on, needs that configuration to exist.
- **Webhook endpoint:** `https://zzliiazovezhxbmfeqco.supabase.co/functions/v1/stripe-webhook`
  (live endpoint `we_1UValWQ3xk2ovSDMesUBWbny`, enabled 2026-10-28), subscribed to
  `checkout.session.completed`,
  `customer.subscription.created` / `.updated` / `.deleted` / `.paused` / `.resumed`.
  Every event only carries a subscription id; the function re-reads it from
  Stripe and stores what Stripe says, so a forged body cannot grant access and a
  replay is idempotent.
- **Status mapping** (`stripe_status` keeps the raw value): `trialing`, `active`,
  and anything paid, grant access; `past_due`/`unpaid` do not; `canceled` →
  `cancelled`. `has_active_plan()` and `has_active_subscription()` accept
  `('active','trialing')` — the trial is the product, not a preview.
- **Refunds:** the policy is `/refunds`, versioned in `frontend/src/lib/legal.ts`
  as `REFUND_POLICY_VERSION`. It promises a full refund of the first payment
  when asked for within the 3-day window, and no charge at all when the trial is
  cancelled. Cancelling is Stripe's customer portal (`Manage billing` on
  /pricing) — there is no in-app cancel endpoint to keep in sync.

## 4. Resend — transactional email

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
  and it isn't.) The address the site publishes is
  `clutchmarks.support@gmail.com` (`SITE.supportEmail`); the domain inbox is a
  relay, not the contact a student is told to write to.
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
  `DIGEST_SECRET`, `FEEDBACK_ALERT_SECRET`, `WELCOME_SECRET`, `HARVEST_SECRET`,
  `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
  (Supabase function secrets / `private.app_secrets`); `VITE_PLAUSIBLE_DOMAIN`
  (Pages build env).
- Deploy checklist: push to `main` → Pages auto-deploys → apply Supabase
  migrations manually via the apply-migration script → verify preview.
