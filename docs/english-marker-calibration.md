# Calibrating the English band marker (phase 3.3)

The marker's claim is that a piece of English writing is placed the way a real
examiner would place it. Until this was measured, that claim rested on the
prompt's own instructions — "most scripts sit in the middle of the grid", "a
25-mark composition an examiner would place at 15–19 must not come back at 23" —
which are the marker's opinion about itself, not evidence.

This is the measurement. Both English papers were marked against the boards' own
examiner-marked exemplars, through the live function, and the result compared
with the mark the examiner actually gave.

- Harness: `node .freebuff/calibrate-english-marker.cjs [--tag <label>] [--only 9280|0500|<id>] [--keep]`
- Result files: `.freebuff-tmp/calibration/calibration-<label>.json`
- Verified: 2026-10-30, `ai-correction` v49

## What was marked

Ground truth is the boards' own published exemplar responses, with the
examiner's per-criterion mark stated beside each script.

| Source | Scripts | Criteria and marks |
|---|---|---|
| OxfordAQA **9280/W** Paper 1 Writing, example responses with commentary | 8 (two per question) | Content and Communication + Language, split per question: 6+3 (Q1 photograph), 6+6 (Q2 letter), 8+8 (Q3 four bullets), 8+15 (Q4 two bullets) |
| Cambridge **0500/22** Example Candidate Responses Paper 2 | 5 compositions | Content and Structure (16) + Style and Accuracy (24), out of 40 |

The 9280 scripts are submitted as typed answers (they are printed text in the
booklet); the 0500 scripts are submitted as **page photographs**, which is what a
student submits and what the marker has to read. The examiner's commentary and
the commentary's marks are never sent to the marker — it sees the task and the
script only.

The 0500 answer pages are scanned images inside the booklet. `pdftotext` cannot
read them and no rasteriser ships with this repo, so
`.freebuff-tmp/calibration/extract-pages.cjs` lifts the image XObjects straight
out of the PDF (resolving indirect colour spaces, applying the PNG row predictor
from `/DecodeParms`, honouring `/Decode`), and the page numbers are mapped to
each script by walking the page tree (`map-pages.cjs`).

### The task briefs

- **0500/22** task wording is exact: the booklet contains the question paper
  pages, and the chosen question number is handwritten on each script.
- **9280** question wording is not recoverable — its question pages are images
  and the scheme prints no question text. Each brief is reconstructed from the
  examiner's own commentary (what the task required, the number of bullet points,
  the scheme's per-question theme). Content judgements on 9280 are therefore
  measured against a brief that is faithful but not verbatim; the Language
  judgement does not depend on the brief at all.

## Result: the criteria were wrong, and are now the boards'

The first run (`--tag before`, marker v48) never used the boards' criteria on
9280 at all. It returned a three-way split of its own invention —
**Content / Organisation / Accuracy** — so **16 of 16** criterion placements were
unmatched, and there was no `Language` criterion for the model's language marks
to land in. With the total fixed by the paper, the invented split pushed the
marks down: the two best 9280 scripts came back at **5/16** (board 16) and
**15/23** (board 23).

That grid does not exist on either paper. The published schemes say:

- **9280/W** — `Content and Communication (W1, W2)` and `Language (W3, W4)`.
- **0500/22** — Question 1: `Writing` (25) + `Reading` (15); Questions 2–5:
  `Content and Structure` (16) + `Style and Accuracy` (24). Organisation is
  assessed inside Content and Structure; accuracy inside Style and Accuracy.

The prompt now states both grids, their per-question splits, and that a third
criterion is always wrong (`englishMarker.ts`), with the rubric repeating it and
`englishMarker.test.ts` pinning it so a future edit cannot quietly reintroduce
the invented names.

## Result: how far the placement is from the board's mark

Two full runs after the fix (16 markings for 9280 across 8 scripts, 10 for 0500
across 5). Δ is the marker's total minus the examiner's.

| Script | Board | Δ run 1 | Δ run 2 |
|---|---|---|---|
| 9280 Q1 (photograph) A | 6/9 | −1 | 0 |
| 9280 Q1 (photograph) B | 9/9 | −1 | −1 |
| 9280 Q2 (letter) A | 8/12 | −2 | 0 |
| 9280 Q2 (letter) B | 12/12 | 0 | −1 |
| 9280 Q3 (bullets) A | 9/16 | +1 | +1 |
| 9280 Q3 (bullets) B | 16/16 | −2 | −2 |
| 9280 Q4 (article) A | 10/23 | −2 | −2 |
| 9280 Q4 (article) B | 23/23 | −5 | −5 |
| 0500 Q4 low | 17/40 | +3 | −1 |
| 0500 Q5 middle | 20/40 | 0 | +1 |
| 0500 Q2 middle | 24/40 | +4 | 0 |
| 0500 Q3 high | 34/40 | −2 | −2 |
| 0500 Q5 high | 35/40 | −7 | −3 |

| | 9280 | 0500 |
|---|---|---|
| Markings | 16 | 10 |
| Mean absolute error | **1.63 marks** | **2.30 marks** |
| As a share of the script's own total | 9.8% (median 11.1%) | 5.8% (median 5.0%) |
| Signed bias | −1.38 (harsh) | −0.70 (slightly harsh) |
| Within 2 marks | 14/16 | 6/10 |
| Worst case | 5 marks (23/23 → 18/23) | 7 marks (35/40 → 28/40) |
| Repeatability, mean \|run 1 − run 2\| | 0.50 (max 2) | 2.60 (max 4) |

Against the examiner, the marker before the fix was **2.3× further out on 9280**
(mean absolute error 3.25, worst 11) than after it (1.63, worst 5).

## What this says, including what it does not

1. **The structure is now deterministic; the marks are not.** Criterion names,
   count and split match the board on every 9280 script after the fix (0 of 16
   unmatched, against 16 of 16 before). That part is not a matter of luck.
2. **The marker is not generous against a real examiner — if anything it is
   harsh.** The previous note in `AGENTS.md` ("runs generous … the same mid-band
   sample came back 23/25 and 21/25") was a guess about what an examiner would
   say, not a measured mark. The measured result is bias −1.38 on 9280 and −0.70
   on 0500. The one place the old warning was right is the **top band**: both
   9280 scripts the examiner placed at full marks lost 2 and 5 marks.
3. **0500 wobbles more than it errs.** Its bias is small (−0.70) but two runs on
   the same script can differ by 4 marks, and its worst case (−7) shares a script
   with a +3. A single marking of a 0500 composition is worth ±4 marks; the
   average of two is worth about ±1.5.
4. **The 0500 error is inside the noise of the top script's own band boundary.**
   35/40 and 28/40 are both "high" writing, and the examiner's own commentary on
   that script notes accuracy slipping — the marker's harsher reading is
   defensible, which is why this is reported rather than tuned away. With 13
   scripts, tuning the prompt until every number closed would fit the fixture,
   not the exam.
5. **Nothing here changes the sales gate.** The marker remains provisional by
   design: a withheld point or a placed band can be claimed, and
   `/admin/mark-disputes` decides. That flow is what makes a ±2-mark reading
   acceptable, and it is why the panel says "Assessment criteria — <band>"
   rather than asserting a fact.

## Known limits

- **Small sample.** 13 scripts, 26 markings, one session. Enough to pin the
  criteria and to bound the error to single digits; not enough to describe a
  distribution.
- **One model, one temperature** (Gemini, 0.2). A different model may be
  differently biased.
- **The 9280 briefs are reconstructions** (above). A script whose content misses
  the real prompt would be treated more kindly than it deserves.
- **The exemplar booklets are board copyright** and are not committed. Only this
  document, the harness and the extractor are; reproduce the run by downloading
  the two booklets into `.freebuff-tmp/calibration/` and running the harness.
- **Transient 502s are real.** On one pass 3 of 13 markings failed with the
  marker's generic `ai_failed`, having succeeded minutes earlier; the harness
  retries once, which is why the harness retries and the results above are from
  complete passes. A student hitting one of those sees "please try again" and
  their script is not lost — but the function itself has no retry, which is a
  separate improvement worth making.
