# Credential rotation runbook — 29 October 2026

Two credentials were exposed. This is the ordered recovery: what leaked, where it lives now,
what you must do, and how to prove afterwards that it worked. Written to be run top to bottom;
each part says what it changes and how far the blast radius reaches.

Findings background: [SECURITY-REVIEW.md](../SECURITY-REVIEW.md).

## Where things actually stand

Measured on 29 Oct 2026 against this checkout and `origin`.

| Credential | Where it lives | Exposure verdict |
|---|---|---|
| Supabase project token (`sbp_…`) | Chat transcript; plaintext in `.freebuff/get-keys.cjs` | **Live and powerful — revoke first.** Account-level: Management API read/write, `service_role` key retrieval, function deploys. |
| Session file — email, password, access token, refresh token | `.freebuff-tmp/palette-session.json` on disk; committed in two commits on the local ref `refs/backups/daily` | Access token **expired 2026-10-24 20:11 UTC**. Refresh token and the password are the live risk. Never pushed to GitHub. |
| Supabase anon JWT | Committed build artifacts (`production/clutchmarks-frontend.html`, `dist-single/…`) and the tracked `.env.production` — all present on `origin/main` | **Verified `role=anon`.** Public by design. No rotation needed; see Part 4. |

Two facts that shape the plan:

- `HEAD` is based on `origin/main`, and the remote holds exactly three heads
  (`main`, two `vercel/…` branches) with no `refs/backups/*`. The session file is **not** on
  GitHub, so no force-push and no GitHub cache purge is required. That is unusual and lucky —
  do not rely on it next time.
- The `production/` pair *is* on `origin/main` (latest remote commit: `Rebuild production pair
  from latest main`), so the anon JWT is public on GitHub. Expected, and harmless.

Order matters: revoke the project token **before** touching git history, because the token is
the more powerful of the two and history cleanup can wait. Production should stay paused until
Part 1 is done.

---

## Part 1 — Revoke the Supabase project token

The token can do anything the owner can do to the database. Assume it is held by someone else.

**1.1 Rotate it.** <https://supabase.com/dashboard/account/tokens> → find the token in use →
**Revoke**. Revocation is immediate for new requests; anything already in flight finishes.

**1.2 Issue a replacement** with a name that says what it is (`local-dev-mgmt-api`) and, where
the form allows it, an expiry. Copy it once.

**1.3 Put it back where the tooling reads it.** `.freebuff/get-keys.cjs` holds the token as a
literal. Replace only that line:

```js
const TOKEN = '<new token>';
```

Confirm the file is ignored and untracked, which it already is:

```bash
git check-ignore -v .freebuff/get-keys.cjs   # expects: .gitignore:38:.freebuff/*
git ls-files .freebuff/get-keys.cjs           # expects: no output
```

**1.4 Verify the new token, and the old one's death,** with a read that changes nothing:

```bash
# new token should answer 200
node .freebuff/probe-security-hardening.cjs    # 17/17 expected

# the old token should now answer 401 — never paste it into a chat or a shell history you keep
curl -s -o /dev/null -w '%{http_code}\n' \
  -H "Authorization: Bearer <old token>" \
  https://api.supabase.com/v1/projects/zzliiazovezhxbmfeqco/api-keys
```

**1.5 Account for what the token could have done.** A project token leaves no per-request audit
trail in this app's `admin_audit_log`, so instead check the artefacts an abuser would touch:

- Database → **Migrations** — anything you did not apply.
- Edge Functions — a deployment you did not make (the `execute` scope can deploy).
- Database → **Roles / Settings → API** — a `service_role` key reissued.
- `admin_audit_log` for rows with a null actor in the window (edge functions legitimately write
  these, so treat it as a review, not a verdict).

**1.6 Stop pasting it anywhere.** The token reached the transcript through a chat message. From
now on it lives only in `.freebuff/get-keys.cjs`, and any *new* token pasted into a chat is
exposed on the spot.

---

## Part 2 — Kill the committed session

The file contains `email`, `password`, `access_token`, `refresh_token`. The access token is dead
(it expired 2026-10-24), but a refresh token outlives it, and the password is plaintext.

**2.1 Change that account's password** — Dashboard → Authentication → Users → the account →
reset. Do this even though you also sign it out: a global sign-out does not stop a *password*
sign-in, and the password is sitting in the file.

**2.2 Force a global sign-out,** which destroys every refresh token for that user:

- From any signed-in client for that account, call `supabase.auth.signOut()` — it defaults to
  `scope: 'global'`.
- If you cannot sign in as that account, deleting the account is the nuclear option and is not
  needed here; the password change plus Part 3 is sufficient, because the refresh token cannot
  be used once its session is gone.

Caveat worth knowing: access tokens already issued keep working until their own `exp` — 30
minutes here (`jwt_exp=1800`) — so revocation is not instantaneous, just bounded.

**2.3 Delete the file from disk.** It is disposable scratch and should not sit around:

```bash
rm -f .freebuff-tmp/palette-session.json .freebuff-tmp/palette-session.err
```

`.freebuff-tmp/` is already ignored at `.gitignore:137`, so it cannot come back by accident —
only by being force-added, which is exactly what happened (Part 3).

---

## Part 3 — Purge it from git history

**Read this before running anything.** The two commits that carry the file
(`923557f` and `c3e80a5`, both "daily-backup … auto — uncommitted work snapshot") are on
**`refs/backups/daily` only** — not on `main`, not on `origin/main`, not on the recovery branch,
not on either Vercel branch. They are reachable only through that custom ref.

Only **`git push --mirror`** (or an explicit refspec naming it) would publish it.
`git push --all` sends just `refs/heads/*`, so it is safe here — verified against this
repository, where `refs/backups/daily` is the single ref living outside `refs/heads/` and
`refs/remotes/`.

So you have a choice, and route A is the cheap one.

### Route A — drop the ref and let the objects go (recommended if you do not need old backups)

The daily backups are regenerated automatically from live content, so history you lose here is
history you can rebuild. **This deletes the backup lineage** — that is the trade.

```bash
# 1. keep a bundle first, so this is reversible
git bundle create ../clutch-marks-pre-purge-$(date +%F).bundle --all

# 2. drop the only ref that holds the leak
git update-ref -d refs/backups/daily

# 3. let the objects and reflogs expire, then prune
git reflog expire --expire=now --expire-unreachable=now --all
git gc --prune=now
```

### Route B — rewrite history and keep the backup chain

Use this only if you need the daily-backup commits. `git filter-repo` is a separate install
(`pip install git-filter-repo`); the run below rewrites **every** ref, so it changes `main`'s
SHAs and would need a force-push — which is why it belongs in a throwaway clone, not here.

```bash
git clone --mirror . ../cm-filter
cd ../cm-filter
git filter-repo --invert-paths \
  --path .freebuff-tmp/palette-session.json \
  --path .freebuff-tmp/palette-session.err \
  --force
git log --all --oneline -- '*palette-session*'   # must print nothing
```

Keep the result local. Do **not** force-push it over `origin/main`: the leak is not there, and
rewriting published history to remove something that was never published buys nothing and
breaks every existing clone.

### Route C — nothing, if the file stays private

Legitimate only while all of these hold: the backup ref is never pushed, the repo stays private,
and the session is genuinely revoked by Part 2. The commit then holds a dead credential, which
is a nuisance rather than a risk. The reason to prefer A anyway is that "we remembered not to
push that ref" fails exactly once.

---

## Part 4 — The anon JWT in the build artifacts

61 of the 64 findings from the full-history scan (`gitleaks git`) are the Supabase **anon** key,
and I decoded the payload of each distinct copy to confirm it: every one carries `role=anon`,
never `service_role`. They sit in `production/clutchmarks-frontend.html` (43),
`dist-single/assets/index-CiNaddSj.js` (6), the tracked `.env.production` (2, under
`VITE_SUPABASE_PUBLISHABLE_KEY`, `role=anon ref=zzliiazovezhxbmfeqco`), a `vercel.json` from
commit `3077807` that no longer contains it, and a handful of scratch `live-*.js` files. All of
it is on `origin/main` or in its history.

**Do not rotate it.** That key is served to every visitor by design; RLS is what protects the
data, and rotating it would break the deployed site without improving security.

What to fix instead is the habit that commits build output:

- Regenerate `production/` from source rather than editing or committing it by hand.
- Prefer a local `dist/` build over a committed `production/` pair, or add the pair to
  `.gitignore` and publish it as a deploy artifact only.

---

## Part 5 — Prove it worked

Run all of these after Parts 1–3.

```bash
# 1. the file is gone from every ref, including the backup ref
git for-each-ref --format='%(refname)' | while read r; do
  git log "$r" --oneline -- '*palette-session*'
done | sort -u                      # expects: no output after the purge
#    (run it BEFORE the purge and it must print exactly three commits —
#     923557f and c3e80a5, which ADDED the file, and 198a9d2, which removed it —
#     which is how you know the check is live rather than trivially empty)

# 2. the leaked blob itself is gone from the object store
#    (this is the specific blob both commits carried; after `gc --prune=now` the
#     lookup must fail. Do NOT use an unreachable-object count as the test: this
#     repo already has 114 unreachable commits from ordinary work, so that number
#     proves nothing either way.)
git cat-file -e 5ea47c14188220976a0de14fe93ed1c6b5547321 2>/dev/null \
  && echo 'STILL PRESENT — gc did not run' || echo 'purged'

# 3. the remote still never had it
git ls-remote origin                # expects only main + the two vercel heads

# 4. a full secret sweep: history + tree
#    the local binary is ./.freebuff/gitleaks.exe (v8.30.1); put it on PATH or use the path.
#    Note the v8.30 subcommands: `git` scans history, `dir` scans files. `detect` and
#    `protect` from older guides do not exist any more and will just error.
./.freebuff/gitleaks.exe git --redact -v .        # history, all refs
./.freebuff/gitleaks.exe dir --redact -v .        # working tree

# 5. and the database hardening is still in place
node .freebuff/probe-security-hardening.cjs   # 17/17
```

Step 4 should report only the anon-JWT-in-`production/` hits from Part 4. Any `sbp_…`, any
`palette-session`, or any `sb_secret_…` is a failure — go back a step.

---

## Part 6 — Stop the next one

- **The ignore rules already cover both files** (`.gitignore:38` for `.freebuff/*`, `:137` for
  `.freebuff-tmp/`). The leak came from an older `.freebuff/auto-sync.cjs` that snapshotted
  uncommitted work wholesale. The current version stages an explicit `SYNC_PATHS` allow-list and
  says why in a comment — **keep it that way**; a `git add -A` in that script re-opens this
  exact hole on the next cron run.
- **Put a scanner in front of the commit,** not behind it:

  ```bash
  # .git/hooks/pre-commit   (chmod +x it)
  ./.freebuff/gitleaks.exe git --staged --redact . || {
    echo "gitleaks: staged secret. Commit refused."; exit 1;
  }
  ```

  `git --staged` is the staging-area scan (`git --pre-commit` scans the diff instead); the
  full-history scan used in Part 5 is `git` without it, and `dir` scans files. Verified
  against `.freebuff/gitleaks.exe` 8.30.1 — the `protect` and `detect` commands in older
  write-ups no longer exist.
- **Rotate on a schedule, not after a scare,** and give each token one owner so revoking one
  does not break three things.

---

## Rollback

- **Token.** Reissue from the same dashboard page; the old one cannot be un-revoked. If tooling
  breaks after rotation, it is reading a stale copy — grep for `sbp_` outside the env file.
- **History.** Route A is reversible from the bundle: `git fetch ../clutch-marks-pre-purge-*.bundle 'refs/*:refs/*'`.
  Route B is reversible by re-cloning from `origin` and re-fetching the bundle.
- **Database hardening.** The two migrations are additive grants and one policy swap; reverting
  means restoring the wide `i_am_parent()` policy, which is not advisable.

  There is a trap here worth knowing before you ever restore from the golden snapshot.
  `supabase/base.sql` has been regenerated with these changes (the stale copy still *recreated*
  the wide parent policy), and `node .freebuff/smoke-base.cjs` passes — but
  `.freebuff/golden-dump.cjs` records tables, FKs, indexes, triggers and RLS policies, and **no
  function `EXECUTE` grants at all** (`grep -cE '^(grant|revoke).*(execute|function)' supabase/base.sql`
  returns 0). Restoring from it therefore rebuilds every function with Postgres's default
  `PUBLIC` grant, re-opening H-1 and M-1. After any restore, re-apply
  `20261029210000_security_hardening_anon_rpcs.sql` and run
  `node .freebuff/probe-security-hardening.cjs` before trusting the database.

## Checklist

- [ ] Project token revoked in the dashboard
- [ ] Replacement token installed in `.freebuff/get-keys.cjs`, file still untracked
- [ ] `probe-security-hardening.cjs` 17/17 with the new token
- [ ] Old token answers 401
- [ ] Migrations and function deploys reviewed for anything you did not do
- [ ] Session account: password changed
- [ ] Session account: global sign-out
- [ ] `palette-session.json` deleted from disk
- [ ] Backup ref dropped (Route A) or history rewritten in a clone (Route B)
- [ ] Part 5 verification re-run clean
- [ ] Pre-commit Gitleaks hook installed
- [ ] Production unpaused only after every box above is ticked
