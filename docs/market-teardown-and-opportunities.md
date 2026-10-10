# Market teardown and where Clutch Marks can be better

Researched 8 October 2026. Every competitor price/feature below was read from a
primary source this session (their own pricing/product page) where possible;
marked ⚠️ where it comes from a third-party comparison and should be re-checked
before it appears in marketing. Our own numbers were read from the **live
database** and the **live production site**, not from repo claims.

Supersedes the market sections of
[competitor-analysis-and-roadmap.md](./competitor-analysis-and-roadmap.md)
(2026-10-07), which contains two claims this session disproved — see §9.

---

## 1. What we actually have, measured

Live database (`public` schema, exact counts):

| Thing | Count |
| --- | --- |
| Subjects / subject-levels | 3 / 9 |
| Topics | 100 |
| Lessons | 100 |
| Practice-bank questions | 1,940 (across 200 quizzes) |
| Study materials | 239 |
| Past papers | 444 rows — 396 with a question paper file, 397 with a mark scheme |
| Flashcards | 516 (100 sets) |
| Accounts | 18 total: 13 students, 4 parents, 1 admin |
| Active subscriptions | 3 |
| Past-paper sittings recorded | **0** |
| AI corrections persisted | **0** |

That last pair is the headline. The product is built; **it has never been used
for its two core actions by a real student.** 1,940 questions over 100 topics is
~19 per topic — roughly one sitting's worth, where a topic needs 30–60 to be a
real drill surface.

Shipped and working (verified live this session or in the prior session's
acceptance probe): topic notes and topic quizzes per level, per-topic SEO routes
with `LearningResource`/`BreadcrumbList` JSON-LD, past papers with mark schemes
behind a watermarking gate, AI marking of uploaded photos/PDFs gated on
`has_active_plan`, study planner, flashcards (SM-2), progress heatmap, parent
accounts, XP/mistakes-fixed gamification, bank-transfer + Urpay payment with
admin verification, 319-URL sitemap, and a robots file with correct
Disallow-vs-noindex reasoning.

Three **verified defects** in the public surface (all cheap to fix, all found
this session by fetching production):

1. **Topic pages ship no content to a crawler.** All 309 `/study/.../notes|quiz|papers`
   pages are prerendered as **head-only shells**: a unique `<title>`, a good meta
   description, and `LearningResource` + `BreadcrumbList` + `Course` JSON-LD —
   then zero body. `/study/mathematics/ol/algebra-equations/notes` returns 6,844
   bytes containing **no `<h1>`, no "simultaneous", no "substitut"**; the visible
   text is the title and the JSON-LD script bodies. Google does render JS, so
   these can still index, but they are thin and near-duplicate across the three
   variants, and we are competing against sites whose topic pages are full of
   server-rendered text.
2. **Unknown URLs return `200` + the homepage.** `/this-url-does-not-exist-12345`
   → `status=200`, `<title>Clutch Marks — Revision Notes, Topic Questions & Past
   Papers</title>`. Classic soft 404: every typo, dead topic slug and legacy link
   a crawler finds is a 200 duplicate of `/`.
3. **Free tier is 2 items per list** (`FREE_PREVIEW_LIMIT = 2`) plus a 3-page
   preview inside gated PDFs. Compared with the market (§3) that is unusually
   stingy — Seneca is free unlimited, PMT/ZNotes/PapaCambridge are entirely
   free, and Tutopiya has a large free portal. Our page says "No card required ·
   Start with a free preview of every level", and an SEO visitor's reward for
   landing is a two-item list and a wall.

Smaller honesty problems: the landing page advertises "Past papers **378**"
(live: 444), "Seven years of papers" and "Exams covered 0580 · 0625 · 0478 ·
9618" while the archive also carries Edexcel IAL units; the hero shows a cover
image with a leftover "SM Study Mode" badge that says nothing about what the
product does; and **the pricing page's plan features do not mention AI marking**
("AI study planner" is listed, marking is not) even though marking is the paid
hook.

---

## 2. The field, by segment

### 2a. General revision platforms (GCSE + IGCSE + A Level)

| Platform | Price (primary source, 8 Oct 2026) | What they have that students pay for |
| --- | --- | --- |
| **Save My Exams** | Free plan + Essential **$8/mo** ($96/yr) + Premium **$16/mo** ($192/yr), 7-day trial, card/GooglePay, auto-renew | Examiner-written notes, topic questions, past papers, mock exams, **Smart Mark AI marking**, Strengths & Weaknesses, Target Test, Study Planner, teacher-only Test Builder; ~100,000 members, 15,000+ reviews, Trustpilot 4.6 from 2,009 reviews |
| **Tutopiya** | Free portal + subscription (same model as SME) | Self-described "world's largest IGCSE & A-Level resources portal" for Cambridge/Edexcel: topical past-paper questions by difficulty, **Mark Scheme Decoder**, **Command Words Trainer**, **Grade Boundary Tracker**, Common Mistakes lists, Flashcard Maker, examiner tips — plus live 1-to-1 tutors |
| **Seneca** | Free, unlimited | Gamified short-answer courses with mastery score; 600+ exam-board courses; large school footprint |
| **PMT Education** | Free (non-profit) | Notes, questions by topic, past papers, **free predicted papers and mock papers**, revision courses, tutoring from £20/hr, bursary places |
| **ZNotes** | Free | Community-written notes, 50K+ Discord for live study sessions |
| **PapaCambridge / MamaCambridge / ExamPaperZone / xtrapapers** | Free | Raw archives at impossible scale (one claims 36,000+ papers, 2002–2025, 57 subjects) |
| **Cognito** | ⚠️ ~£9.99/mo individual | Video lessons, notes, questions, flashcards |
| **Smart Exam Resources / Exam-Mate** | Free / one-off packs | Topic-sorted Cambridge questions with mark schemes |

### 2b. AI marking and adaptive practice — our direct frontier

| Platform | Price | Capability |
| --- | --- | --- |
| **Save My Exams — Smart Mark** | inside $8/$16 | AI marking "aligned to your exam board's mark scheme", **accepts typed *or handwritten* responses**, hints, step-by-step breakdown, "Explain my feedback", "Improve my answer"; claims 69% more accurate than ChatGPT, validated by teachers/examiners; supports **CIE IGCSE Maths, Physics, Computer Science** |
| **Ilmino** | **£19.99/mo**, majority of practice mode free | Working-step and method-mark analysis on typed *and* handwritten answers, misconception naming, Bayesian next-topic/next-question recommendations, parent + teacher dashboards, institution product, STEM simulations |
| **Aimarking.ai** | not stated | AI marking of **handwritten GCSE Maths past papers** with step-by-step logic analysis |
| **GradeLab / marking.ai / LearninGaide / CoGrader / GradeOrbit / GradeDrive** | per-school | Teacher-side handwritten/scan marking against an uploaded mark scheme |

### 2c. Free AI tutors — the commoditisation layer

ChatGPT **Study Mode** (free for all accounts), Gemini **Guided Learning** (free
tier; Google re-offered **a year of the paid student plan free on 19 Aug 2026**),
Claude Learning Mode, NotebookLM, Knowt (5M+ students), Quizlet, StudyFetch,
Photomath/Gauth. Nobody will pay us for "an AI that explains a topic" — that is
now free, unlimited, and better-resourced than we can be.

### 2d. The competitor for the wallet: tutoring in our own market

Our payments are Urpay + Saudi bank transfer, so the buyer is Gulf-based, and
what those parents already pay for is tutoring:

| Provider | Price |
| --- | --- |
| Unitors (IGCSE/A-Level, KSA) | packages from **AED 799/month ≈ SAR 780/month** |
| OxfordEdexcel / STO Education / ibgram / Chem-Bio | per-hour 1-to-1 for IGCSE in Riyadh/Jeddah/Dammam; "timed practice, mark schemes and mock feedback" |
| **AlGooru** | KSA's first *licensed* tutoring marketplace, 4.8★ (249 ratings), in-person + online |
| PMT (UK) | £20/hr, plus bursary places |

**One month of local tutoring costs ~20× our annual plan ($120).** That is the
comparison a Gulf parent can act on, and it is not one our competitors' pages
make.

### 2e. School/teacher channel (how Seneca and Cognito actually grew)

Seneca for Schools: free 12-month trial, then **£646/yr** ex-VAT for 600+ pupils.
SME ships a teacher-only Test Builder and a Schools product; Ilmino sells an
"institution" tier with teacher marking review. We have nothing here yet.

---

## 3. Where they beat us — honestly

1. **Content volume and granularity.** SME and Tutopiya have thousands of
   syllabus-point pages with server-rendered text; we have 100 topics whose pages
   ship no body content. We cannot win a breadth race and should stop implying we
   are in one.
2. **Exam-technique teaching, not just answers.** Command Words Trainer, Mark
   Scheme Decoder, Grade Boundary Tracker, Common Mistakes. These are cheap
   features with high perceived value, and we have none of them.
3. **Brand trust and social proof.** 100k members, 15,000+ reviews, Trustpilot
   4.6 — for a parent choosing where to spend money, that beats a 16-year-old
   founder's note. (Keep the note; add proof beside it.)
4. **Parent and teacher tooling is no longer our differentiator.** SME has
   strengths/progress tools, Ilmino ships parent dashboards *and* teacher
   dashboards *and* an institution tier.
5. **Handwriting AI marking is no longer unique.** Smart Mark takes handwritten
   answers; Ilmino and Aimarking do method-level handwritten marking. Our edge
   must move to *depth and honesty of marking* (per-mark-scheme-point breakdown
   anchored to the exact paper sat), not the mere ability to read a photo.
6. **Video and mobile apps.** Cognito/YouTube own the "I'm stuck now" moment;
   mobile apps are the default surface for students and we have a web app.
7. **Freshness and archive scale.** Free mirrors publish a new session within
   days at 36,000-paper scale. Our harvest job is good but we cannot out-archive
   them, and (§7) we should not try.

---

## 4. Where we can genuinely win

1. **The paper the student actually sat.** Our marking anchors to a specific
   archived paper (`paperRef`) and to the caller's own uploaded script. SME marks
   *their* questions; Ilmino marks *their* canvas. Many of our students sit a
   paper the school handed out on paper — we take a photo of *that*. Keep this
   as the headline, and make it one tap from every archive row.
2. **Local payment and local price.** Bank transfer + Urpay, no card, in USD,
   against a tutoring market at SAR ~780/month. Structural advantage: it is
   economics and payment rails, not a feature they can ship next sprint.
3. **Igcse-only depth in three hard subjects.** SME/Tutopiya spread across 40–60
   subjects; our promise is Maths, Physics and CS at OL/AS/A2 with nothing
   missing. That claim only becomes real when every syllabus statement is
   referenced (§6.9) — and it is a trust wedge against community-written notes.
4. **Parents as buyers in a place where nothing else is local.** Parent accounts,
   parent dashboard, weekly digest, and (new) WhatsApp delivery.
5. **No pressure mechanics.** Our schema cannot express a lost streak. Marketing
   that contrast is free reach with parents and teachers — but say it carefully,
   because we have not verified every competitor's streak mechanics this session.
6. **The loop in one place** — notes → topic questions → timed paper → marked
   script → mistakes queue → parent visibility. Each competitor owns one or two
   steps; nobody in the laptop-table above owns all six for Cambridge IGCSE.
7. **A teacher already inside a school.** The founder is a student at an
   international school. That is the cheapest distribution in this entire
   document: teachers are our channel (§5 P1.5), and their students are the first
   20 real users.

---

## 5. Recommendations, prioritised

Each item: what, why (evidence), and how we'd know it worked.

### P0 — next 2–4 weeks

**1. Get to first real usage before building anything else.**
0 recorded sittings and 0 persisted corrections means we have no idea whether
the loop works. Pick the founder's school: one teacher, one class, one subject,
free class code, and watch `signup → first marked answer`. Everything else below
is unverifiable until ~20 students have used the product.
*Success: 20 students, ≥1 marked script each.*

**2. Prerender the topic body, not just the head.**
Inject the notes text (and the quiz question set) into the 309 topic pages at
build time — the prerenderer already walks a topic manifest, so the content
fetch is the missing step. Canonicalise the three variants onto `/notes` (or give
each a genuinely different body) so we stop shipping three near-duplicate empty
pages per topic.
*Success: `/study/mathematics/ol/algebra-equations/notes` contains its notes prose with a real `<h1>`; 3 variants no longer byte-comparable shells.*

**3. Stop serving 200 for unknown URLs.**
Route unmatched paths to a real 404 status (static-host 404 for the SPA shell)
while `/admin` keeps its Disallow. Right now every typo is a 200 homepage.
*Success: a bogus URL returns 404 with the branded not-found page.*

**4. Make the free tier genuinely generous, and put the price on the expensive thing.**
Give one full subject-level free (unlimited notes + topic questions), gate: AI
marking (real marginal cost), study planner, cross-level access, and unlimited
archive downloads. Free is the market norm; our cost is in marking and storage,
not in page views — and a two-item wall cannot create a habit or a Google-ranked
page.
*Success: free signups reach a completed quiz without hitting a paywall; paid
conversion attributable to the marking gate.*

**5. Put AI marking on the storefront.**
Add it to the landing hero and to the `PLANS` feature lists on `/pricing` (it is
currently absent), replace the "SM Study Mode" cover badge with a screenshot of a
real marked script, and correct the counts (444 papers, not 378; state the
Edexcel IAL rows). Feature parity with the storefront is free conversion.
*Success: marking visible above the fold and in every plan; landing numbers match the DB.*

**6. Grade boundaries and an "exam-ready" signal.**
Show the grade a mark corresponds to (CAIE publishes grade thresholds per
session) and a three-state per-topic signal (Not started / Working on it /
Exam-ready from notes read + attempts + mistakes fixed). Both are cheap, both are
things Tutopiya/SME already sell, and both answer "am I going to be OK?".
*Success: every marked paper shows an indicative grade; the dashboard's next action comes from the weakest topic.*

**7. Command-word trainer + mark-scheme decoder.**
We already write command-word tables inside the Maths and Physics notes; the CAIE
list is public. Turn it into drills: what does *describe* vs *explain* vs
*calculate* earn, then mark the student's answer against that expectation. This
is Tutopiya's strongest differentiator against SME and it is cheap for us because
our marking worker already returns per-point feedback.
*Success: a student can practise one command word and see the mark change.*

**8. Mistakes-to-fix drill.**
Derive from attempts where the last answer was wrong, auto-build a 10-question
drill, celebrate the flip (`corrected_mistake` already pays XP). The data exists;
the loop is what makes revision feel like progress.
*Success: mistakes fixed per student per week.*

**9. Price for the exam season, and say the tutoring comparison out loud.**
Add a one-off "until your last paper" pass (bank transfer is naturally one-off)
beside the subscriptions, and frame the plan as *"a fraction of one tutoring
hour"* — SAR 780/month is what the parent is already being quoted.
*Success: paid mix includes the season pass; parent-facing copy names the tutoring comparison.*

**10. WhatsApp-first parent digest.**
Gulf parents do not read email; they read WhatsApp. Our weekly digest is
email-only. If we add SMS/WhatsApp orchestration, prefer a messaging layer that
manages templates and channel preferences rather than hand-rolling another
sender — Gravity's pick for this stack is **Knock** ($0 developer tier, 10k
messages/month; connect your own email/SMS provider, e.g. Twilio for local
numbers). Treat a WhatsApp Business number and template approval as the real
work item.
*Success: digest open/response rate on WhatsApp vs the email baseline.*

### P1 — next quarter

11. **Depth per topic:** 1,940 questions is ~19/topic; target 40–60 with the
    existing `generate-questions` worker plus examiner-style review, and add a
    written model answer ("worked solution") to every question — marking then
    *checks* against something the student can also read.
12. **Marking accuracy as a published claim.** SME says "69% more accurate than
    ChatGPT"; Aimarking and Ilmino advertise method-mark analysis. Build a
    repeatable accuracy harness (N real scripts per paper, examiner-agreed marks)
    and publish the number on the pricing page. Trust in AI marking is the
    product.
13. **Arabic + RTL.** Bilingual students, no competitor above offers it. Start
    with UI chrome and the hardest-topic explanations, not the whole corpus.
14. **PWA/offline, low-data mode.** Students study on phones on metered data;
    there is no service worker in the repo today.
15. **Teacher channel:** a free class code, cohort topic mastery, and printable
    topical worksheets with answer keys (the branded PDF pipeline already
    exists). Teachers are the distribution Seneca bought with money; the founder
    can get it with a conversation.
16. **Tutors as a partner channel, not a rival.** A tutor who can upload a
    student's script and get a marked, brandable PDF serves more students. That
    is B2B2C distribution into exactly the households already paying SAR 780/mo.

### P2 — bets worth making

17. **Adaptive next-question engine** (Ilmino's Bayesian personalisation is the
    credible competitor to our loop; our attempt data is the raw material).
18. **Exam-countdown plans** (not a countdown timer — "what to do with the four
    weeks you have" generated from current topic state).
19. **Cooperative private goals** (never competitive class leaderboards).
20. **Mock/predicted papers** — high demand (PMT gives them away free), but they
    carry a real accuracy/compliance cost; only if we can ground them in mark
    schemes and label them honestly as practice.
21. **Voice answers** for students who can explain better than they can type.

---

## 6. Measurement

Learning and retention, never time-on-site. What we can already compute:
`xp_events`, `past_paper_attempts`, `ai_correction`, `subscriptions`,
`quiz_attempts`. What is missing: a funnel (landing → signup → first marking) and
attribution, so add product analytics *before* the SEO/content push, or the push
is unmeasurable.

| Metric | Why |
| --- | --- |
| Signup → first marked answer (hours) | Activation; currently unmeasurable end-to-end |
| Mistakes fixed per student per week | The core learning action |
| Past papers marked per account | Whether the headline feature is used |
| % of active students hitting their self-set weekly goal | Does the loop work |
| Week-2 / week-4 return | Retention without guilt mechanics |
| Paid conversion by plan, with bank-transfer share | Pricing fit |
| Organic sessions and signups on per-topic pages | Whether the SEO surface earns |
| Parent digest open/click by channel (email vs WhatsApp) | Whether the buyer sees value |

---

## 7. Legal and platform risk (read this before growing the archive)

Cambridge International's own help centre states plainly: *"We are unable to give
permission to publish past examination papers on any website or school
intranet… There have been several incidents of misuse of our material (including
its sale online)."* There is a separate route for classroom reproduction and a
permissions process for other material.

Meanwhile: we store **396 question papers and 397 mark schemes** in a private
Supabase bucket, serve them through a watermarking function, and **sell access to
them**. "Its sale online" is precisely the harm CAIE names. Our landing footer
currently says "Past paper links point to the official exam board sites", which
is not true of the bucket-hosted files — that line should be corrected whatever
else we decide.

This is a deliberate, documented risk decision for the owner, not an oversight to
leave implicit. The options, cheapest first:

1. **Correct the footer copy** and keep an internal note of the exposure (days).
2. **Shift weight to what is unambiguously ours or the student's:** AI marking of
   *student-uploaded* scripts (defensible), our own exam-style questions and
   worked solutions, and per-topic notes.
3. **Link out instead of hosting** for board PDFs — the
   `serve-external-paper` allowlist path already exists and audit-logs the click;
   redistributing fewer files lowers the blast radius of a takedown.
4. **Ask for permission/licence** for the specific use, so the archive can grow
   intentionally rather than by accretion.
5. Consider `noindex`/download limits on the gated PDFs to reduce the impression
   of publishing an archive.

A takedown at launch would remove the archive overnight; that is worth more
thought than any feature in §5.

---

## 8. 30/60/90

- **30 days:** items 1–5 (first real users, prerendered bodies, real 404s,
  generous free tier, marking on the storefront). Fix the landing numbers and
  footer copy. Stand up analytics + the activation funnel.
- **60 days:** items 6–10 (grade bands, exam-ready, command words, mistakes
  drill, season pass, WhatsApp digest) + item 12's accuracy harness.
- **90 days:** item 11 (question depth), item 13 (Arabic/RTL), item 14
  (offline), item 15 (teacher channel), item 16 (tutors), and a written decision
  on §7.

---

## 9. Corrections to the previous competitor doc

| Previous claim | Reality (verified this session) |
| --- | --- |
| "Save My Exams' Smart Mark takes typed answers… **Nothing else in this market does that**" | Smart Mark's own page: "submit your typed **or handwritten** response". Ilmino and Aimarking also mark handwriting (method-level). Our differentiator is the *specific paper sat* + per-point breakdown, not handwriting. |
| "PMT/Exam-Mate/ZNotes have **no parent view at all**. Parents are the first-class differentiator" | Ilmino ships parent progress visibility *and* teacher/institution tools; SME ships strengths/progress tooling and a Schools product. Parent tooling is a feature to match, not a moat; local language + WhatsApp + local payment are the moat. |
| "We already have route templates… add every topic URL in the sitemap" | Sitemap is done (319 URLs live). The gap is that those pages ship **no body content**, and unknown URLs return 200. |
| Landing "Past papers 378" | Live: 444 rows (396 with a paper file). |

## 10. Sources checked (8 Oct 2026)

savemyexams.com/join, savemyexams.com/study-tools/smart-mark, pmt.education,
znotes.org, cognito.org comparison page, tutopiya.com IGCSE portal pages,
ilmino.com comparison, aimarking.ai, senecalearning.com + Seneca schools pricing
help article, Cambridge International help centre (past-paper reproduction),
Gemini for Students / Google blog (student offer, 19 Aug 2026), unitors.com
(Saudi packages), AlGooru, plus our live database and live production site.
