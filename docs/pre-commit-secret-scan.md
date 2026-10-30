# Pre-commit secret scan

A commit hook that refuses to commit a credential. It runs
[gitleaks](https://github.com/gitleaks/gitleaks) over the **staged** diff before every commit and
blocks the commit when it finds a secret.

Why it exists: this repository's history already contains a live session token (an email, a
password, an access token and a refresh token) in `.freebuff-tmp/palette-session.json`, and the
anon JWT in committed build output. Both were committed before anyone was watching. The hook is
the point at which that stops happening; it is not a replacement for scanning history.

## Install (once per clone)

```bash
git config core.hooksPath .githooks
```

That is the whole install. `.githooks/pre-commit` is committed, so the hook is shared rather
than living in one developer's `.git/hooks`; this line tells Git to use it. To confirm:

```bash
git config --get core.hooksPath    # → .githooks
```

No `chmod` step: the executable bit is recorded in the index (`100755`), and `.gitattributes`
pins `.githooks/**` to LF so a macOS or Linux checkout does not get a CRLF shebang and fail with
`bad interpreter`. (This repo sets `core.filemode=false` on Windows, which is why the mode had to
be set on the index rather than left to the filesystem.) If a checkout still reports the hook as
not executable, `chmod +x .githooks/pre-commit` fixes it.

### The scanner

The hook uses, in order:

1. `gitleaks` on your `PATH` (macOS, Linux, CI), or
2. `.freebuff/gitleaks.exe` (the bundled copy this repo uses on Windows).

`.freebuff/` is gitignored, so a fresh clone will not have the bundled binary. Install one:

```bash
winget install gitleaks                                   # Windows
brew install gitleaks                                     # macOS / Linux
go install github.com/gitleaks/gitleaks/v8@latest         # anywhere with Go
```

## What it scans, and what it deliberately does not

| | |
|---|---|
| **Scans** | `gitleaks git --staged --pre-commit` — the index, i.e. exactly what the commit would contain |
| **Does not scan** | the working tree, and **git history** |
| **Speed** | ~0.3 s on a one-file commit in this repo |

Staged-only is what makes it fast enough to leave on. It also means an unstaged secret cannot
block your commit, and a staged secret cannot hide behind a dirty working tree.

History is the other half of the job and cannot be done in a hook — it needs a scheduled or
CI pass (`gitleaks git` over all refs). Run it when you touch credentials:

```bash
./.freebuff/gitleaks.exe git --report-format json --report-path /tmp/history.json
```

## When it blocks you

```
pre-commit: a secret looks like it is being committed.
```

1. **Unstage and remove it:** `git restore --staged <file>`, then delete the value.
2. **Rotate it.** A value that reached a staged file may already be in a reflog, a backup ref
   (`refs/backups/*` exists in this repo) or a colleague's clone. Deleting the line is not
   enough — this is exactly how the session token above is still in the history.
3. **Re-commit.**

### Intentional bypasses

- **False positive** — a test fixture or a documented example key. Get its fingerprint from the
  hook output (`Fingerprint: path:rule:line`) and add it to a committed `.gitleaksignore`:

  ```
  secret-hook-test.txt:aws-access-token:1
  ```

  This keeps the exception reviewable in a diff instead of invisible in someone's config. Note
  the repo already carries ~61 genuine **anon** JWT hits in build artifacts (`production/`,
  `dist-single/`, `.env.production`); those are the public publishable key, but they will show up
  in a history scan and are best fixed by regenerating those artifacts rather than ignoring
  them.
- **Deliberate, reviewed bypass** — `git commit --no-verify`. The hook is a guard rail, not a
  boundary: anyone can skip it, and it cannot see a secret pasted into a chat, a screenshot or a
  `.env` that is never staged. Use it knowingly, and rotate afterwards.

## Exit codes

| Code | Meaning |
|---|---|
| `0` | No secrets staged; commit proceeds |
| `1` | Secret found; commit blocked |
| `2` | gitleaks is not installed — **commit blocked anyway** |

`2` is the important one. A scanner that silently turns itself off when it is missing is worse
than no scanner, because it reads as green. If you hit `2`, install gitleaks (above) rather than
reaching for `--no-verify`.

Note `git commit` reports any hook failure as exit code `1`; the hook's own status is visible
when you run it directly (`sh .githooks/pre-commit`).

## Verification

Tested on 30 October 2026 against this repo, using a fake key of the form `AKIA` followed by 16
uppercase characters. The literal is deliberately **not** written here: it matches the same rule
the hook enforces, so committing this page would have blocked on its own example.

| Test | Result |
|---|---|
| Fake AWS key staged, real `git commit` attempted | **Blocked.** `RuleID: aws-access-token`, secret printed as `REDACTED`, exit 1, `HEAD` unchanged, no commit created |
| Clean file staged, hook run | **Passes.** Exit 0 |
| Hook run in a scratch repo with no gitleaks and no `.freebuff/` | **Fails closed.** Exit 2, install instructions printed, 0 commits created, file still staged |

Re-run the first two at any time; the harness lives at `.freebuff-tmp/audit/hook-test.sh` (gitignored).

## The one allowlist entry

Since the client moved to the modern Supabase key, `.env.production` carries a
`sb_publishable_…` value. That file is **tracked on purpose** and the value is served to every
browser, so `generic-api-key`'s entropy heuristic flags a public key on every commit. `.gitleaks.toml`
(committed, `[extend] useDefault = true`) suppresses exactly one line — a line that assigns
`VITE_SUPABASE_PUBLISHABLE_KEY` to an `sb_publishable_` value — and nothing else.

Verified not to weaken the control: staging a canary with a realistic `sb_secret_…`, a live-form
Stripe key and a service-role JWT still produced **three** findings (`generic-api-key`, `jwt`,
`stripe-access-token`) and exit 1, while `.env.production` alone scanned clean. Re-run that canary
after editing `.gitleaks.toml`.

Note that a low-entropy dummy (`sb_secret_fakefakefake…`) is **not** a valid canary: the rule ignores
it, which reads as "the scanner is broken" when the scanner is behaving correctly.

## Limitations

- It sees only what is staged in a Git repository. Anything committed with `--no-verify`, added
  through the GitHub web UI, or pasted anywhere else is invisible to it.
- It does not scan **history**, so it cannot help with anything already committed. The open items
  in [SECURITY-REVIEW.md](../SECURITY-REVIEW.md) — the unrotated `sbp_` project token (H-3) and
  the session token in `refs/backups/daily` (M-3) — are rotation tasks, not hook tasks.
- It is not a CI gate. If you want a hard boundary, run the same command on a pre-receive hook or
  in CI, where `--no-verify` is not available.
