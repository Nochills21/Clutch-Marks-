# Domain Launch Runbook — clutchmarks.com

Everything is prepped. When the domain is bought (Cloudflare Registrar is the
plan), this runbook takes the site live end-to-end. Follow in order. Nothing
here needs code changes.

## 0. What's already done (no domain needed)

- ✅ Email pipeline works (welcome email sent + verified via Resend)
- ✅ `RESEND_API_KEY` + `WELCOME_FROM_EMAIL` set as Supabase secrets
- ✅ Weekly parent digest + feedback error alerts deployed, secret-gated
- ✅ Resend domain record created (id `f4f26552-9d65-4790-ba91-2db911513020`, Tokyo region)
- ✅ `site_url` = `https://clutch-marks.lovable.app` (temporary — update in step 5)
- ✅ Frontend builds clean (`npm run build` → `dist/`)
- ✅ Bounce/complaint suppression pipeline built (waits only for the webhook secret)

## 1. Frontend deploy (10 min, can be done BEFORE the domain arrives)

1. Push repo (done — `main` is current).
2. dash.cloudflare.com → Workers & Pages → Create → Pages → Connect to Git →
   pick `Nochills21/top-67`.
3. Build settings: framework `Vite`, build command `npm run build`, output `dist`.
4. Deploy → `clutchmarks.pages.dev` live immediately.
5. Pages project → Custom domains → add `clutchmarks.com` and
   `www.clutchmarks.com` (shows "pending" until step 3 — expected).

## 2. Buy the domain in Cloudflare

dash.cloudflare.com → Domain Registration → Register Domain → `clutchmarks.com`
(~$10/yr, at-cost). Because DNS is already on Cloudflare, no nameserver changes
are needed — records go straight into the zone.

## 3. Cloudflare DNS: add records (10 min after purchase)

**Resend (copy exact values from resend.com/domains/clutchmarks.com):**

| Type | Name | Content | TTL |
|---|---|---|---|
| TXT | `resend._domainkey` | `p=MIGfMA0GCSqGSIb3…` (long DKIM key) | Auto |
| CNAME | `rsend` | `rsend-apne1.forge.rmta.net` | Auto |
| CNAME | `send` | `send.forge.rmta.net` | Auto |
| TXT | `_dmarc` | `v=DMARC1; p=none;` | Auto |

**Site → Pages (usually auto-added by the custom-domain step, verify):**

| Type | Name | Content | Proxy |
|---|---|---|---|
| CNAME | `@` (root) | `clutchmarks.pages.dev` | Proxied |
| CNAME | `www` | `clutchmarks.pages.dev` | Proxied |

Leave "Enable Receiving" off in Resend (we only send).

## 4. Resend: verify + flip sender (after records propagate, ~5–60 min)

1. resend.com/domains/clutchmarks.com → **Verify DNS Records**.
2. Once verified: Supabase dashboard → Edge Functions → Secrets → change
   `WELCOME_FROM_EMAIL` to `Clutch Marks <hello@clutchmarks.com>`.
3. Resend test-mode restriction lifts — emails reach ANY address.

## 5. Supabase: update site_url (2 min)

Supabase dashboard → Authentication → URL Configuration → Site URL:
`https://clutchmarks.com`
Also add to **Redirect URLs**: `https://clutchmarks.com/**` and
`https://www.clutchmarks.com/**`.

## 6. Resend webhook (5 min — activates bounce protection)

Resend → Webhooks → Add endpoint → `https://zzliiazovezhxbmfeqco.supabase.co/functions/v1/email-events`,
subscribe to `email.bounced` + `email.complained`, copy the signing secret →
Supabase function secrets → `RESEND_WEBHOOK_SECRET`.

## 7. Verify end-to-end (launch checklist)

- [ ] `https://clutchmarks.com` loads the app; `www` redirects to root
- [ ] Sign up a real student → welcome email arrives from `@clutchmarks.com`
- [ ] Forgot-password email arrives with `clutchmarks.com` reset links
- [ ] Resend domain shows "Verified"; test-mode warning gone
- [ ] Weekly digest fires (invoke with `dryRun:false` via secret)
- [ ] Feedback error report emails admins from `@clutchmarks.com`
- [ ] Privacy/Terms/Support links work; SEO meta shows the new domain

## 8. support@clutchmarks.com → Gmail forwarding (10 min, free)

Use **Cloudflare Email Routing** (free, built into the dashboard):

1. Cloudflare → `clutchmarks.com` → **Email** → Email Routing → enable
   (Cloudflare adds the needed MX + SPF records automatically).
2. Create address: `support@clutchmarks.com` → destination
   `zaidthaersaadeh@gmail.com` → verify the destination via the confirmation
   email Gmail receives.
3. Reply-as: Gmail → Settings → Accounts → "Send mail as" → add
   `support@clutchmarks.com`. For SMTP credentials use Gmail's own SMTP
   (`smtp.gmail.com`, port 587, an **App Password** — requires 2FA on your
   Google account), so replies go out as support@ without any paid mailbox.
4. Test: email support@ from another account → arrives in Gmail; reply →
   arrives as from support@ and not in spam.

After setup, the contact references are already in place: the sidebar footer
"Support" link and the Privacy Policy contact lines point at this address.

## 9. After launch

- Google Search Console: submit `https://clutchmarks.com/sitemap.xml`.
- `VITE_PLAUSIBLE_DOMAIN=clutchmarks.com` in Pages build env → redeploy.
- The blog lives on the same Pages project (see docs/infrastructure.md) — no
  extra infrastructure needed.
