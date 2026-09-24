# Launch-Week Checklist

Live status audit: 24 September 2026. ✅ = done and verified · ⏳ = blocked on
you (or the domain) · 🔧 = I can do it on your word (~time estimate).

## 1. Domain & hosting (the critical path)

- ⏳ **Buy `clutchmarks.com` in Cloudflare Registrar** — the single blocker for everything
  below. (Registry checked today: still unregistered. ~$10/yr at-cost; DNS and
  Pages hosting are already on Cloudflare, so nothing else to buy.)
- 🔧 Add the 4 Resend DNS records + site CNAME records (runbook §3, ~10 min
  after purchase)
- 🔧 Deploy frontend to Cloudflare Pages connected to GitHub (`Nochills21/top-67`,
  build `npm run build`, output `dist`) → live `clutchmarks.pages.dev` immediately,
  custom domain attaches once the domain exists (runbook §1, ~10 min — **can be
  done before the domain arrives**)
- 🔧 Verify Resend domain → flip sender to `hello@clutchmarks.com` → test-mode
  restriction lifts (runbook §4, ~5 min + DNS propagation wait)
- 🔧 Update Supabase `site_url` → `https://clutchmarks.com` + redirect URLs
  (runbook §5, ~2 min)
- ⏳ Set `VITE_PLAUSIBLE_DOMAIN=clutchmarks.com` in the Pages build env → next
  deploy activates analytics (~2 min in the Cloudflare dashboard)
- ⏳ Register the Resend webhook → `.../functions/v1/email-events`, events
  `email.bounced` + `email.complained`, signing secret → Supabase function secret
  `RESEND_WEBHOOK_SECRET` (~5 min; suppression pipeline is built and waiting)
- 🔧 `support@clutchmarks.com` forwarding via Cloudflare Email Routing (runbook §8,
  ~10 min, free)

## 2. Pre-launch verification (I run these once the domain is live)

- 🔧 Full email sweep: signup → welcome from `@clutchmarks.com`; forgot-password
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

- ✅ All subjects/levels: O Level + AS + A2 for Maths/Physics/CS — topics, notes,
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
