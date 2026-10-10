# Launch-Week Checklist

> **Superseded (5 October 2026).** This page describes an older plan
> (`clutchmarks.study` on Vercel). The live setup is Vercel + Render +
> Cloudflare DNS. See [deploy-vercel-render.md](./deploy-vercel-render.md) §0 for
> the current wiring and §6 for the consolidated launch checklist.

Live status audit: 24 September 2026. ✅ = done and verified · ⏳ = blocked on
you (or the domain) · 🔧 = I can do it on your word (~time estimate).

## 1. Domain & hosting (the critical path)

- ⏳ **Claim `clutchmarks.study` in Cloudflare Registrar** — the single blocker for everything
  below. (Registry checked today: still unregistered. ~$10/yr at-cost; DNS and
  Pages hosting are already on Cloudflare, so nothing else to buy.)
- 🔧 Add the 4 Resend DNS records + site CNAME records (runbook §3, ~10 min
  after purchase)
- 🔧 Deploy frontend to Cloudflare Pages connected to GitHub (`Nochills21/top-67`,
  build `npm run build`, output `dist`) → live `clutchmarks.pages.dev` immediately,
  custom domain attaches once the domain exists (runbook §1, ~10 min — **can be
  done before the domain arrives**)
- ✅ **Resend domain `clutchmarks.study` verified** (6 Oct 2026) — sender is
  `no-reply@clutchmarks.study` via `WELCOME_FROM_EMAIL`; the test-mode
  restriction is gone and `welcome-email` now returns `{"sent":true}`. Details:
  `infrastructure.md` §3
- 🔧 Update Supabase `site_url` → `https://clutchmarks.study` + redirect URLs
  (runbook §5, ~2 min)
- ⏳ Set `VITE_PLAUSIBLE_DOMAIN=clutchmarks.study` in the Vercel build env → next
  deploy activates analytics (~2 min in the Cloudflare dashboard)
- ✅ **Resend webhook registered** (5 Oct 2026) → `.../functions/v1/email-events`,
  events `email.bounced` + `email.complained`, signing secret in
  `RESEND_WEBHOOK_SECRET`. Verified live — a real complaint was suppressed.
- ✅ **Inbound `support@clutchmarks.study` is live via Resend Inbound** (apex MX
  `inbound-smtp.ap-northeast-1.amazonaws.com`) — no Cloudflare Email Routing
  needed; it cannot work while the Cloudflare zone is inactive. Set the
  forwarding destination in the Resend dashboard if it isn't already.

## 2. Pre-launch verification (I run these once the domain is live)

- 🔧 Full email sweep: signup → welcome from `@clutchmarks.study`; forgot-password
  link lands on `/reset-password`; weekly digest dry-run `dryRun:false`; feedback
  error alert reaches both admins; suppressed address stays skipped
- 🔧 E2E student flow on production: signup → subject pick → lesson → quiz →
  XP + streak → leaderboard → parent link → parent dashboard
- 🔧 E2E admin flow: create/edit content, payments tab, feedback console,
  audit log + CSV export, suppression list check
- 🔧 SEO check: `SEOHead` metas, sitemap, robots, canonical → submit to Google
  Search Console (runbook §8)

## 3. Legal & trust (mostly done)

- ✅ Privacy Policy + Terms live at `/privacy` and `/terms` (student-appropriate)
- ✅ Watermark + anti-copy protection layer active for non-admins
- ✅ Audit log with retention + owner alerts; feedback error emails
- ⏳ **Custom SMTP in Supabase** (Authentication → SMTP, Resend credentials) so
  password-reset emails are branded and reliable — currently on Supabase's
  built-in sender with a tiny quota (~10 min, only you can access the dashboard)
- ⏳ Review the placeholder prices/payment instructions on `/pricing` — the
  manual bank-transfer flow works, but IBAN/details are yours to fill in

## 4. Content (done, spot-check recommended)

- ✅ All subjects/levels: IGCSE + AS + A2 for Maths/Physics/CS — topics, notes,
  quizzes, past-paper metadata (2019–2025)
- ✅ Quiz answer-index bug fixed; AI study planner live
- ⏳ Paste papers: 210 papers are metadata-only — either attach PDFs or the
  archive shows "coming soon" (decide before students hit empty buttons)
- ⏳ Skim 2–3 lessons per subject for typos — feedback system will catch the rest

## 5. Day-of-launch sequence (on your word)

1. Confirm purchase → I run the domain chain end-to-end (~45 min total)
2. Verify one real signup + one real password-reset on production
3. Submit sitemap to Search Console; Plausible dashboard check
4. Announce

## The two things only you can do this week

1. **Buy the domain** — everything in section 1 unblocks the moment you do.
2. **Supabase dashboard SMTP setup** — 10 minutes, makes reset emails reliable.
