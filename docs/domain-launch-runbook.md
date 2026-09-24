# Domain Launch Runbook — clutchmarks.com

Everything is prepped. When the domain is bought at Namecheap, this runbook takes
the site live end-to-end. Follow in order. Nothing here needs code changes.

## 0. What's already done (no domain needed)

- ✅ Email pipeline works (welcome email sent + verified via Resend)
- ✅ `RESEND_API_KEY` + `WELCOME_FROM_EMAIL` set as Supabase secrets
- ✅ Weekly parent digest + feedback error alerts deployed, secret-gated
- ✅ Resend domain record created (id `f4f26552-9d65-4790-ba91-2db911513020`, Tokyo region)
- ✅ `site_url` = `https://clutch-marks.lovable.app` (temporary — update in step 4)
- ✅ Frontend builds clean (`npm run build` → `dist/`)

## 1. Namecheap: add DNS records (15 min after purchase)

In Namecheap → Domain List → `clutchmarks.com` → **Advanced DNS** → add all 4 Resend
records (copy exact values from resend.com/domains/clutchmarks.com):

| Type | Host | Value | TTL |
|---|---|---|---|
| TXT | `resend._domainkey` | `p=MIGfMA0GCSqGSIb3…` (long key from Resend) | Automatic |
| CNAME | `rsend` | `rsend-apne1.forge.rmta.net` | Automatic |
| CNAME | `send` | `send.forge.rmta.net` | Automatic |
| TXT | `_dmarc` | `v=DMARC1; p=none;` | Automatic |

Leave "Enable Receiving" off in Resend (we only send).

## 2. Namecheap: point the domain at the frontend host

Create the Cloudflare Pages (or Netlify) project first — see step 3 — then:

| Type | Host | Value | TTL |
|---|---|---|---|
| A | `@` | `192.0.2.1` → (use the exact IP the host shows) | Automatic |
| CNAME | `www` | `clutchmarks.pages.dev` → (host's target) | Automatic |

Or simpler: change nameservers to the host's assigned NS (each host shows two NS
values in its custom-domain setup) and manage records there instead.

## 3. Frontend deploy (10 min, can be done BEFORE domain arrives)

1. Push repo (done — `main` is current).
2. dash.cloudflare.com → Workers & Pages → Create → Pages → Connect to Git →
   pick `Nochills21/top-67`.
3. Build settings: framework `Vite`, build command `npm run build`, output `dist`.
4. Deploy → you get `clutchmarks.pages.dev` live immediately.
5. Pages project → Custom domains → add `clutchmarks.com` and `www.clutchmarks.com`
   (it will show "pending" until step 2's records exist — that's expected).

## 4. Resend: verify + flip sender (after step 1 records propagate, ~5–60 min)

1. resend.com/domains/clutchmarks.com → **Verify DNS Records**.
2. Once verified: Supabase dashboard → Edge Functions → Secrets → change
   `WELCOME_FROM_EMAIL` to `Clutch Marks <hello@clutchmarks.com>`.
3. Resend test-mode restriction lifts — emails can reach ANY address, not just
   zaidthaersaadeh@gmail.com.

## 5. Supabase: update site_url (2 min)

Supabase dashboard → Authentication → URL Configuration → Site URL:
`https://clutchmarks.com`
Also add to **Redirect URLs**: `https://clutchmarks.com/**` and `https://www.clutchmarks.com/**`.
(Via API: PATCH `/v1/projects/{ref}/config/auth` with `{ site_url }`.)

## 6. Verify end-to-end (the launch checklist)

- [ ] `https://clutchmarks.com` loads the app; `www` redirects to root
- [ ] Sign up a real student → welcome email arrives from `@clutchmarks.com`
- [ ] Forgot-password email arrives with `clutchmarks.com` reset links
- [ ] Resend domain shows "Verified" and test-mode warning is gone
- [ ] Weekly digest fires (invoke with `dryRun:false` via secret)
- [ ] Feedback error report emails the admin from `@clutchmarks.com`
- [ ] Privacy/Terms pages reachable at `/privacy` and `/terms`
- [ ] SEO meta shows the new domain (`view-source:` → `og:url`)

## 7. support@clutchmarks.com → Gmail forwarding (15 min, after purchase)

**Two options — pick one:**

**Option A — Namecheap free Email Forwarding (recommended to start; £0):**
1. Namecheap → Domain List → `clutchmarks.com` → **Email** tab → *Email Forwarding* →
   Add: `support` → `zaidthaersaadeh@gmail.com`. (Free forwarding allows up to 100
   forwarders; no mailbox needed.)
2. **Reply-as problem:** Gmail can't send *from* support@ on a forwarder alone. Two fixes:
   - *Simple:* reply from your Gmail but set a Gmail "Send mail as" alias
     (Gmail → Settings → Accounts → Send mail as → add support@clutchmarks.com).
     Gmail asks for SMTP credentials — use Namecheap Private Email SMTP
     (mail.privateemail.com, port 587, a Private Email mailbox login) OR
     simply reply from your normal address at first (students don't mind).
   - *Clean:* activate Private Email (included in Stellar) and use its webmail.
3. **Deliverability records (add in Namecheap Advanced DNS):**
   - SPF (TXT @): `v=spf1 include:spf.privateemail.com ~all` (Private Email) —
     merge with the Resend SPF by using both `include:` terms in ONE TXT record.
   - DKIM: Private Email shows two CNAMEs (default._domainkey etc.) in its
     dashboard — add exactly as displayed.
4. Test: email support@clutchmarks.com from another address → arrives in Gmail.
5. Reply from Gmail via the Send-as alias → confirm it doesn't land in spam.

**Option B — Private Email mailbox (if you want a real inbox instead of forwarding):**
Activate the Stellar-included Private Email, create support@, add its MX records
(mx1.privateemail.com, priority 10; mx2, priority 20 — dashboard shows exact values),
then either use webmail or forward to Gmail from inside Private Email settings.

Either way, update the "Contact" references after setup: footer of the blog, the
feedback page confirmation, and the Privacy Policy contact line.

## 8. After launch

- Google Search Console: submit `https://clutchmarks.com/sitemap.xml` + the blog
  subdomain when it exists.
- Add Plausible/PostHog before the first blog post (see docs/blog-strategy.md).
- Point `blog.clutchmarks.com` CNAME at the Namecheap hosting server when the
  WordPress blog is set up.
