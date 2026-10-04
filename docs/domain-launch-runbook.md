# Domain Launch Runbook — clutchmarks.study

Everything is prepped. Follow in order. Nothing here needs code changes.

## 0. What's already done (no domain needed)

- ✅ Email pipeline works (welcome email sent + verified via Resend)
- ✅ `RESEND_API_KEY` + `WELCOME_FROM_EMAIL` set as Supabase secrets
- ✅ Weekly parent digest + feedback error alerts deployed, secret-gated
- ✅ Resend domain record created (id `f4f26552-9d65-4790-ba91-2db911513020`, Tokyo region)
- ✅ `site_url` = `https://clutchmarks.study` (see step 5)
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

## 4. Resend webhook (5 min — activates bounce protection)

Resend → Webhooks → Add endpoint →
`https://zzliiazovezhxbmfeqco.supabase.co/functions/v1/email-events`,
subscribe to `email.bounced` + `email.complained`, copy the signing secret →
Supabase function secrets → `RESEND_WEBHOOK_SECRET`.

## 5. Verify end-to-end (launch checklist)

- [ ] `https://clutchmarks.study` loads the app; `www` resolves to root
- [ ] Sign up a real student → welcome email arrives from `@clutchmarks.com`
- [ ] Forgot-password email arrives with `clutchmarks.study` reset links
- [ ] Resend domain shows "Verified"; test-mode warning gone
- [ ] Weekly digest fires (invoke with `dryRun:false` via secret)
- [ ] Feedback error report emails admins from `@clutchmarks.com`
- [ ] Privacy/Terms/Support links work; SEO meta shows the new domain

## 6. After launch

- Google Search Console: submit `https://clutchmarks.study/sitemap.xml`.
- `VITE_PLAUSIBLE_DOMAIN=clutchmarks.study` in Pages build env → redeploy.
- The blog lives on the same Pages project (see docs/infrastructure.md) — no
  extra infrastructure needed.
