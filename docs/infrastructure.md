# Infrastructure — what lives where

Clutch Marks uses a three-way split. Each piece does the one job it's best at.
**Do not "migrate the site" onto the Namecheap server — it cannot run there.**

```
┌────────────────┐   DNS + mailboxes   ┌──────────────────┐
│   NAMECHEAP    │◄───────────────────►│      RESEND      │
│ clutchmarks.com│                     │ transactional    │
│ + Stellar Plus │                     │ email (sending)  │
│ (mail, blog later)                   └──────────────────┘
└───────┬────────┘
        │ A/CNAME records point the domain at…
        ▼
┌────────────────┐   REST/RPC/Edge     ┌──────────────────┐
│ CLOUDFLARE etc │◄───────────────────►│     SUPABASE     │
│ Pages (CDN)    │                     │ Postgres + RLS   │
│ static React   │                     │ Auth (GoTrue)    │
│ frontend       │                     │ Edge Functions   │
└────────────────┘                     │ pg_cron / pg_net │
                                       └──────────────────┘
```

## 1. Namecheap — domain, DNS, mailboxes

- **Domain registrar** for `clutchmarks.com` (free with the Stellar Plus plan, year 1).
- **DNS authority** — all records (A/CNAME → frontend host, Resend DKIM/SPF/DMARC TXT records) are managed in the Namecheap dashboard → Domain List → Advanced DNS.
- **Mailboxes** — `support@clutchmarks.com`, `zaid@clutchmarks.com`, etc. via the Stellar plan's email accounts (webmail or forwarding to a personal Gmail). This is the plan's real value; the hosting space is not used by the app.
- **Stellar Plus hosting is reserved for one future job only:** a WordPress **marketing blog** at `clutchmarks.com/blog` (see routing below). Don't point the root A record at the shared server.

## 2. Frontend — free static CDN host (Cloudflare Pages / Netlify / Vercel)

- The app is a **Vite React SPA** — `npm run build` outputs a static `dist/` folder. No server-side code exists, so shared PHP hosting is useless to it.
- The host connects to GitHub (`Nochills21/top-67`): **every push to `main` auto-deploys** (~60s), with instant rollbacks and preview URLs for testing branches.
- Global CDN → students in EU/MENA get served from nearby edge nodes.
- Custom domain: add `clutchmarks.com` + `www.clutchmarks.com` in the host's dashboard; it provisions HTTPS automatically. Namecheap A/CNAME records point at the host (each host shows the exact values).
- SPA routing requires the host's default SPA fallback (redirect all routes to `/index.html`) — built into Cloudflare Pages/Netlify/Vercel automatically.

## 3. Supabase — all backend logic (stays put, always)

- **Postgres + Row Level Security** — every table's security is RLS policies in Postgres; the data layer is Postgres-specific (not MySQL-portable).
- **Auth (GoTrue)** — email/password login, JWTs, leaked-password protection, admin/parent/student roles, password resets.
- **Edge Functions** (Deno) — `resolve-login-email`, `welcome-email`, `weekly-digest`, `feedback-alert`, `manage-accounts`, `promote-admin`, `quiz-feedback`, `generate-questions`, `study-planner`. Secrets are set via the Supabase dashboard (RESEND_API_KEY, per-function shared secrets).
- **pg_cron + pg_net** — nightly audit-log archiving; weekly parent digest (Mondays 07:00 UTC).
- **Resend** sends all transactional email (welcome, reset-related digests, error alerts, parent digests) from `@clutchmarks.com` once the domain is verified.

## Future: marketing blog without breaking the app

When you want `clutchmarks.com/blog` on WordPress (Namecheap hosting):

1. **Keep the root domain on the CDN.** In Namecheap Advanced DNS, the A/CNAME for the root and `www` keeps pointing at the frontend host — never change those.
2. **Subdomain the hosting server:** create `blog.clutchmarks.com` (CNAME → the Namecheap server) in Advanced DNS, and install WordPress under that. Link to it from the app's footer.
   - *Alternative:* Cloudflare (free, in front of Namecheap DNS) can path-route `/blog/*` to the server and everything else to the CDN — cleaner URLs, slightly more setup.
3. `support@` mailboxes and Resend records are unaffected.

## Reference

- Production URL: `https://clutchmarks.com` (update `site_url` in Supabase Auth config when live — reset emails and OAuth redirects must match).
- Local dev: `npm run dev` (Vite, port 8080).
- Secrets inventory: `RESEND_API_KEY`, `WELCOME_FROM_EMAIL`, `DIGEST_SECRET`, `FEEDBACK_ALERT_SECRET`, `WELCOME_SECRET` (all in Supabase function secrets / `private.app_secrets`).
- Deploy checklist for a new release: push to `main` → CDN auto-deploys → Supabase migrations are applied manually via the apply-migration script → verify preview.
