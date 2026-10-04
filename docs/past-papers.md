# Past papers: how files get attached

The archive (`past_papers`, ~421 rows across Mathematics, Physics and Computer
Science at OL / AS / A2) holds one file reference per slot: a path inside the
private `past-papers` bucket (`papers/…` / `mark-schemes/…`, UUID filenames),
attached either by an admin through the Past Papers Bank or by the bulk ingest
that downloaded the sourced PDFs (see below).

`openProtectedFile` / `openSignedFile` still recognise an `http(s)://` value and
open it directly in a new tab, as a fallback for a URL pasted into the edit
dialog, but **no archive row uses that path: every populated `paper_url` /
`mark_scheme_url` is a bucket path**, so all reads route through
`serve-material` (per-user watermark + entitlement gate + audit log).

Rows with no file at all carry the board's `source_url` — a link we do not
host, so it cannot be watermarked. Those links do **not** render as a plain
`<a href>`: that let a free account click straight through and read the whole
paper, unwatermarked, with no audit trail. They now go through
`serve-external-paper`, which applies the same entitlement rule as
`serve-material`, records the click (`action = 'external_link_opened`
the audit trail, and only then hands back the URL to navigate to — a normal
navigation, so the source site loads exactly as a direct link would. A free
account gets a 403 and an upgrade prompt, and never learns the destination.

The function redirects only to an **allowlist of exam-board and PMT hosts**, so
it cannot be used as an authenticated open redirect. An admin who pastes an
external URL into a `paper_url` slot still bypasses this gate (`openProtectedFile`
opens external values directly) — that path is admin-only and intended.

## Which rows have a PDF

`20261002120000_past_papers_pmt_urls.sql` fills question-paper URLs on 330 rows
and mark-scheme URLs on 331 (every URL HEAD-checked to return `application/pdf`).
`20261002121000_past_papers_specimens.sql` adds 43 specimen rows.
`20261003120000_past_papers_ingest_external.sql` then downloads every source URL
(331 question papers + 332 mark schemes, deduplicated), uploads it to the private
bucket, and repoints the rows at the storage path — after it runs, no row carries
a public URL. The remaining rows (2020 June sittings were cancelled; 2025 Oct/Nov
is not published yet, and some 2019/2020 Edexcel sittings are not carried by the
source) keep only `source_url`. All three migrations match on exact values, so
re-running them is safe.

## Keeping links healthy (recurring job)

Links rot: a bucket object can be deleted out of band and an external URL can
start 404ing, and the only previous signal was a student clicking into an error.
The **`past-papers-harvest`** edge function runs on a pg_cron schedule (Mondays
06:00 UTC via pg_net, guarded by the `HARVEST_SECRET` shared secret) and does
two things each run:

1. **Re-verifies** every link the archive uses — bucket objects via a storage
   existence check, external URLs via `HEAD` — and upserts the result into
   `public.past_paper_link_checks`, one row per `(slot, url)`. Dead links are
   then a single query:

   ```sql
   select * from public.past_paper_link_checks where not ok order by checked_at desc;
   ```

2. **Re-harvests** the PhysicsAndMathsTutor index pages and flags any sitting
   *newer* than the newest one the archive already sources for that subject
   code (`0625`, `0580`, `0478`, `9618`, the Edexcel IAL WPH/WMA/WME/WST units).
   Those land as `slot = 'candidate'` rows, so a newly published session is
   visible before an admin adds the row. Older unsourced years are a curation
   choice and deliberately stay out of the list.

Each run also writes one `past_paper_link_check` summary row to the admin audit
trail (counts plus up to 20 dead links), so health shows up next to the other
system activity without opening the table. As of the last run PMT offers nothing
past June 2025, so there are no candidates from 2026 yet — candidates are the
forward-looking signal for when the source publishes.

**Candidates are never written into `past_papers` automatically.** A public URL
in `paper_url` would bypass the watermark/entitlement gate, so sourcing stays a
deliberate ingest — this job only observes and reports.

### Reviewing the findings

Both kinds of finding are triaged from **Admin → Past Papers Bank → “Needs
review”**, which lists the pending candidates and any unresolved dead links.
Decisions go through admin-only RPCs that audit-log the choice:

| Action | RPC | Effect |
| --- | --- | --- |
| Approve a new sitting | `approve_paper_candidate` | Creates a **hidden draft** `past_papers` row (no topic/level, `source_url` = the found URL, title from code + filename) and marks the check `approved`. Students never see untagged rows, so nothing unwatermarked is exposed — the admin then attaches the real file and tags it. |
| Dismiss a candidate | `dismiss_paper_candidate` | Marks the check `dismissed` without touching the archive. The job's upsert never writes `review_status`, so it does not reappear. |
| Resolve a dead link | `resolve_paper_link` | Marks the check `resolved`, clearing it from the queue after the file/link is fixed. If the link later comes back healthy the job records `ok = true` and it drops out anyway. |

`past_paper_link_checks.review_status` (`pending` / `approved` / `dismissed` /
`resolved`) is the queue state. The “Needs review” list is the union of
`slot = 'candidate' AND review_status = 'pending'` (new sittings) and
`ok = false AND slot <> 'candidate' AND review_status <> 'resolved'` (dead links).

## Attaching files

Admin → **Past Papers Bank**. The **Archive health** panel shows coverage at a
glance — how many rows have a question paper, how many have a mark scheme, and
how many links the recurring check has found dead (with the last-checked time) —
and the header repeats the counts inline. Two tools sit alongside:

- **Needs a file (N)** — toggles the table down to the rows still missing a PDF,
  which is the worklist to chip away at.
- **Bulk attach** — pick a folder of PDFs straight from the board's site and the
  filenames are matched to rows automatically.

Single rows can also be given a question paper and/or mark scheme through the
edit dialog (Add Paper / pencil icon).

## Filename conventions the matcher understands

`frontend/src/lib/pastPaperFiles.ts` parses both sides — the board code and paper
number baked into the row title (`… (0580/22)`) and the filename — then requires
code **and** paper number to agree before a row is offered.

| Board | Example | Meaning |
| --- | --- | --- |
| Cambridge | `0580_s24_qp_22.pdf` | 0580, May/June 2024, question paper 22 |
| Cambridge | `0478_w23_ms_12.pdf` | 0478, Oct/Nov 2023, mark scheme 12 |
| Edexcel IAL | `WMA12_01_que_20240118.pdf` | WMA12, paper 01, January 2024 sitting |
| Edexcel IAL | `WMA12_01_msc_20240307.pdf` | same paper, mark scheme |

`qp`/`que`/`question` → question paper; `ms`/`msc`/`msd`/`rms` → mark scheme.

The archive keeps one row per year and session, so a filename with no year token
(`0580_qp_22.pdf`) cannot be placed on its own: those files are listed as
"need a paper picked" with a dropdown of the candidate rows, and nothing is
uploaded until the admin chooses. Unmatched files are reported by name and
skipped — the tool never guesses.

## What happens to an attached file

Both slots upload to the private `past-papers` bucket (`papers/…` and
`mark-schemes/…`, UUID filenames) and the row keeps only the storage path — as do
the bulk-ingested sourced papers. Reads go through the `serve-material` edge
function, which watermarks PDFs per user, gates free accounts to a 3-page preview,
and audit-logs the download; a signed URL is the fallback if that function is
unreachable. Admins can preview an attached file from the row's Paper / MS badge.

The gate only exists once `serve-material` is deployed from
`backend/supabase/functions/` (see `docs/deploy.md`). If the deployed copy
predates the entitlement work, the PDF response is missing its CORS header and
the browser silently falls back to the unwatermarked signed URL.

## Browsing & filtering the archive

The **Past Papers** list filters on level, board, paper and session, plus a
year-chip row and a free-text search. The board and paper labels are derived from
the row (see `archiveBoard` / `archivePaperGroup` in
`frontend/src/lib/pastPaperFiles.ts`): most titles lead with the board
("Cambridge IGCSE …", "Edexcel IAL …"), the 9600-series AS/A Level rows fall
back to the source host, and the paper name is the text after the title's em dash
with the board code stripped — "Paper 1: Core (0580/12)" collapses to "Paper 1",
while named Edexcel modules stay whole ("Mechanics M1", "Pure Mathematics P1").
The session list always carries the full board calendar including `Specimen`, so
the sample papers are reachable.

All filters — **search included** — run over the whole subject-scoped archive
*`before`* the free-preview slice (`filterArchivePapers` is applied first, then
`usePreviewSliceWithLimit`). Applying the search to the slice was the bug: a free
account only ever searched the first `FREE_PREVIEW_LIMIT` rows, so searching for
an older year or a specimen returned nothing and looked like the paper did not
exist. Filter options are built from the full scoped set (not the slice), so a
free student can still see every board / paper / session on offer.

## Timed practice on a paper

Every card in the **Past Papers** list has a **Practise** button that opens a
paper-scoped sitting:

- **Exam timer** — pick 15/30/45/60/90 minutes; the countdown reads a wall-clock
  deadline (so a backgrounded tab does not drift) and shows “Time’s up” when it
  expires, while still letting the student submit.
- **AI correction against that paper** — the student writes/pastes their answers
  and submits; the flow reuses the existing `callPaperCorrector` and passes a
  `paperRef` (title, session, year, paper number) so marking is anchored to that
  specific paper. The worker is `ai-correction` (see `docs/deploy.md` — it must be
  deployed, with a provider key, for marking to work).
- **Saved score** — the attempt is written to `past_paper_attempts` (score,
  total, percentage, duration, and the per-question payload). RLS lets a student
  read only their own attempts; admins can read all. Each card then shows the
  best percentage and number of sittings.
- **XP + streak** — saving goes through `record_paper_attempt()` (SECURITY
  DEFINER), which inserts the row and pays 20 XP via `award_xp()` with tool
  `paper` (150 XP/day cap, ref = the attempt id so each sitting pays once), then
  keeps the streak alive with `touch_streak()`. This is the same machinery
  quizzes, practice, lessons and flashcards use — `award_xp`/`touch_streak` are
  revoked from clients, so the client can never mint XP directly.

## Replacing or removing a file

Re-uploading through the edit dialog replaces the path (the old object is left in
storage; remove it with the Storage API if the file was wrong). To take a file
back out, clear the slot in the edit dialog.
