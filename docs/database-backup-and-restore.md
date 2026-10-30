# Database backup and restore

The production Supabase project has **`pitr_enabled: false` and zero physical backups**
(verified 2026-10-30 via the Management API). Until that changes, this is the only copy of the
database that survives a bad migration, a mistaken `DELETE`, or a successful attack.

```bash
npm run backup:db      # dump -> encrypt -> upload -> prune
npm run restore:db -- backups/db/<file>.cmbackup.enc --verify
```

Related: `scripts/backup-content.cjs` (`npm run backup:content`) snapshots the curriculum tables
only, and `scripts/daily-backup.cjs` snapshots uncommitted *source* into `refs/backups/daily`.
Neither is a database backup.

## What a backup contains

One file, `backups/db/<timestamp>.cmbackup.enc`:

| Part | Contents |
|---|---|
| `schema` | `supabase/base.sql` — the full public-schema structure (tables, FKs, indexes, triggers, RLS policies) |
| `tables` | **every table in `public`**, discovered from the catalog at run time (57 on 2026-10-30), so a new table is covered without editing the script |
| `manifest` | per-table row count + SHA-256, so a restore can be proved rather than hoped |
| encryption | AES-256-GCM, key derived from `BACKUP_PASSPHRASE` with scrypt (N=16384, r=8, p=1) |

Measured on 2026-10-30: **50,883 rows across 57 tables → 22.5 MB encrypted**, 150 s.

### What it does NOT contain — read this before relying on it

- **`auth.users` (the accounts themselves).** GoTrue owns that schema and restoring it by hand is
  fragile. This matters:
  - *Same project, damaged/lost rows* — the common case — this bundle restores everything, because
    the accounts never left. **This is the scenario it is built for.**
  - *Whole project deleted* — you get content and profile rows but no logins. Students would have
    to re-register, or you restore accounts from a Supabase-side export. For that case the real
    answer is enabling PITR on the project.
- **Storage objects.** The six buckets (`past-papers`, `study-materials`, `homework-uploads`, …)
  are not in the bundle. `past-papers` is 2,107 objects; the papers are board links, not our data.
- **Edge functions, secrets, auth config.** These live in the repo and the dashboard.

## One-time setup

### 1. Passphrase

The dump holds student names, emails, answer scripts and audit rows. It is **encrypted because a
plaintext `.json` in a bucket is a GDPR incident waiting for one misconfigured ACL**.

```bash
openssl rand -base64 32
```

Store it in a password manager — **not** in this repository, **not** in the bucket, and not on the
same disk as the backups. Losing it means the backups are unreadable; that is the point.

### 2. Off-site storage

Any S3-compatible store works (Cloudflare R2, Backblaze B2, AWS S3, MinIO). A **private** bucket —
never public-read. Create an access key scoped to that bucket only.

```
BACKUP_PASSPHRASE=<32-byte passphrase>
BACKUP_S3_ENDPOINT=https://<account-id>.r2.cloudflarestorage.com
BACKUP_S3_BUCKET=clutchmarks-backups
BACKUP_S3_REGION=auto
BACKUP_S3_KEY_ID=<access key id>
BACKUP_S3_SECRET=<secret access key>
BACKUP_S3_PREFIX=clutchmarks-db        # optional, default shown
```

Without these the script writes a **local** copy and exits **2** — it will not report success for
a backup that never left the machine. `--local-only` accepts that explicitly.

### 3. Schedule it nightly

The script is idempotent and self-pruning (`--keep`, default 14 files). It does not need a database
password: it dumps through the Management API with the token in `.freebuff/get-keys.cjs`.

**Windows (this machine)** — Task Scheduler, 02:00 daily:

```powershell
$envFile = "C:\path\to\backup-env.ps1"   # sets BACKUP_PASSPHRASE + BACKUP_S3_*
schtasks /create /tn "ClutchMarks DB backup" /sc daily /st 02:00 /f /tr ^
  "powershell -NoProfile -Command \". $envFile; cd 'C:\path\to\repo'; node scripts\db-backup.cjs\""
```

Verify it really ran, rather than trusting the scheduler:

```powershell
schtasks /query /tn "ClutchMarks DB backup" /v /fo LIST | Select-String "Last Result"
```

`Last Result: 0` is success. **`2`** means the off-site destination is not configured — the backup
is on that disk only. **`1`** means the dump itself failed; the log names the table.

**Linux/macOS** — cron:

```cron
0 2 * * * cd /srv/clutchmarks && set -a && . ./backup.env && set +a && node scripts/db-backup.cjs >> /var/log/db-backup.log 2>&1
```

The machine must be awake. If it is not reliably on at 02:00, run the same command from a
scheduled CI job instead — but then `BACKUP_PASSPHRASE` and the S3 keys become CI secrets, which
is a deliberate trade, not a free win.

### 4. Prune is automatic, off-site is not

`--keep` prunes **local** files only. Set a lifecycle rule on the bucket (e.g. expire after 30
days) so off-site copies do not accumulate forever.

## Restore runbook

Work top to bottom. Do not skip step 2.

**1. Get the file** (newest is fine; use an older one if the damage predates today's backup):

```bash
node scripts/db-backup.cjs --local-only --out ./tmp-bk   # if you need to fetch from the bucket first
```

**2. Verify before restoring.** This decrypts, checks the GCM tag, and compares every table
against its recorded hash. It touches no database.

```bash
BACKUP_PASSPHRASE=… npm run restore:db -- backups/db/2026-10-30T02-00-00.cmbackup.enc --verify
```

Expect `integrity: OK — every table matches its recorded hash`. A **non-zero exit means stop**:
either the passphrase is wrong or the file is damaged/tampered, and restoring it would give you a
database that looks healthy and is missing data.

**3. Produce the SQL.**

```bash
BACKUP_PASSPHRASE=… npm run restore:db -- backups/db/<file> --to-sql restore.sql
# or a subset, e.g. content only after a bad bulk edit:
BACKUP_PASSPHRASE=… npm run restore:db -- backups/db/<file> --to-sql content.sql \
  --tables subjects,subject_levels,topics,lessons,quizzes,questions,study_materials
```

The SQL is `begin; <schema> set local session_replication_role = replica; <one INSERT per table> commit;`.
FK checks are deferred for the transaction so tables load in name order rather than FK order.

**4. Run it** against the target with a real Postgres client:

```bash
psql "$TARGET_DATABASE_URL" -v ON_ERROR_STOP=1 -f restore.sql
```

- `ON_ERROR_STOP=1` is not optional: without it psql reports success after failures.
- Restoring into a **fresh Supabase project**: run it against that project's connection string.
  `base.sql` targets Supabase (it references `auth.users` and the `storage` schema).
- Restoring into a **plain Postgres** (not Supabase): create stubs first, or the schema section
  fails — `create schema auth; create table auth.users (id uuid primary key);` plus a `storage`
  schema and `storage.foldername()`.
- `INSERT`s do not truncate. A table with existing rows will fail on the primary key; truncate the
  target tables first if you mean to replace rather than fill.

**5. Confirm the restore actually landed.**

```sql
select relname, n_live_tup from pg_stat_user_tables
where schemaname = 'public' order by n_live_tup desc limit 15;

select count(*) from public.questions;   -- compare with the manifest's number
```

`npm run restore:db -- <file> --verify` prints the manifest counts; the two must agree.

**6. Re-check the security posture after any restore.** `base.sql` covers tables, FKs, indexes,
triggers and RLS policies, but **not function `EXECUTE` grants** (see `AGENTS.md`). After a
restore, re-apply the grant migrations and run:

```bash
node .freebuff/probe-security-hardening.cjs   # 24 checks
```

## Verification performed (2026-10-30)

Proven against the live project, not asserted:

| Test | Result |
|---|---|
| Full dump of production | 50,883 rows / 57 tables → 22.5 MB encrypted, 150 s |
| Decrypt + manifest hashes, correct passphrase | `integrity: OK — every table matches its recorded hash` |
| Same, **wrong** passphrase | Refused, **exit 1**, message names passphrase/corruption |
| Restore round-trip into a scratch schema (`like public.<t>`), 7 tables incl. `questions` (4,223 rows, `jsonb` options) | Every table's restored row count **equalled the manifest**; scratch schema dropped afterwards — `node .freebuff/probe-db-restore.cjs` |
| SigV4 upload against a local S3 stub, independent signature recomputation | `signatureValid: true`, payload hash matched, correct object path, 23 MB body |
| Off-site not configured | **exit 2** with instructions (a local-only copy must not read as success) |
| Interrupted write | written to `.partial` then renamed, so a half-file can never look like a backup |
| Failed table during dump | backup marked **INCOMPLETE** and **not uploaded**, exit 1 |

Two bugs were found and fixed by that testing: `URL.host` includes the port, which
`https.request` rejects as a hostname (any endpoint on a non-default port failed), and the
`--upload-only` retry path did not exist, so a failed upload forced another 2.5-minute dump.

## Limitations

- **Accounts are not in the bundle** (see above). This is the biggest gap, and PITR is the fix.
- Storage objects, edge-function source, and auth config are out of scope by design.
- The dump path is the Management API, which returns JSON. A restored database is logically
  identical but physically rebuilt (no byte-identical `pg_dump`). If you later add the database
  password and the client binaries, `pg_dump -Fc` is the better tool for a like-for-like restore:
  `pg_dump "$DATABASE_URL" -Fc -f db.dump && pg_restore -d "$TARGET" db.dump`.
- A backup nobody proves is not a backup. Re-run
  `node .freebuff/probe-db-restore.cjs <file>` after changing the dump or restore code, and restore
  one file into a scratch project once a quarter.
