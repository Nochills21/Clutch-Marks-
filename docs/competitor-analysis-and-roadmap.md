# Competitors, and where Clutch Marks can beat them

Written 2026-10-07. Grounded in what the product actually ships today (this repo)
plus a review of the live competitor landscape. Prices and feature lists for
third parties move — re-check before quoting them publicly.

---

## 1. What Clutch Marks has right now

| Capability | Status |
| --- | --- |
| Syllabus-mapped notes (Maths 0580/9709, Physics 0625/9702, CS 0478/9618) | Shipped, markdown, in DB |
| Topic quizzes with instant marking + explanations | Shipped |
| Practice bank: per-topic browse, "questions you missed", bookmarked, saved progress | Shipped |
| Past papers + mark schemes archive | 444 rows / 793 file pointers, all verified |
| AI marking of *uploaded* paper answers (`ai-correction`) | Shipped |
| AI study planner with a deterministic offline fallback | Shipped |
| Flashcards (spaced-repetition) | Shipped |
| Progress heatmap + per-subject aggregates | Shipped |
| Parent accounts with linked students | Shipped |
| Per-topic SEO pages (`/study/:subject/:level/:topic/notes|quiz|papers`) | Shipped |
| Local payment: bank transfer + Urpay, receipt verification | Shipped |
| Welfare-first gamification (weekly goals, focus sessions, opt-in leaderboard) | Shipped 2026-10-07 |

## 2. The field

| Platform | What they are | Rough price | Strength to respect | Structural weakness |
| --- | --- | --- | --- | --- |
| **Save My Exams** | Examiner-written notes, topic questions, past papers; "Smart Mark" AI marking of long written answers; flashcards | Paid subscription, mid/high (well above us) | Brand trust, academic-authority content, breadth across boards, polished question bank | Card-only billing in USD/GBP, price is a barrier for exactly our students, marking is text-entry only (no photograph of a real handwritten answer), and their growth model leans on free-tier squeeze |
| **Physics & Maths Tutor (PMT)** | Free, volunteer-run notes + a huge past-paper/question archive by topic | Free (ad-supported) | Enormous free archive, strong SEO, maths/physics depth | No accounts, no marking, no tracking, no progress of any kind — no feedback loop |
| **Exam-Mate** | Topical + yearly past papers, sorted by topic, one-off purchase per subject set | One-off packs (~yearly equivalent in the tens of USD) | Topical sorting is exactly what students search for; harder questions than PMT | Documents, not a learning system; nothing adapts, nothing is marked |
| **ZNotes** | Free community-written revision notes (PDF) | Free | Fast, cheap to produce, very shareable | Notes only; no practice, no marking, quality varies |
| **Seneca** | Gamified short-answer courses with a mastery score, heavy schools push | Free tier + paid | Genuinely good loop, enormous school distribution | Generic courses rather than CAIE past-paper practice; gamification leans on pressure-style streaks and timers |
| **Cognito** | Free video lessons, notes, questions, flashcards; claims ~2 grades improvement | Free + paid | Video, strong free funnel, marketing that speaks to parents | Video-first does not match how students actually revise for CAIE papers |
| **Papacambridge / other paper mirrors** | Raw past-paper PDF dumps | Free | Complete archive | Ugly, no value added beyond the PDF |

## 3. Where they beat us, honestly

1. **Archive depth and freshness.** PMT and Exam-Mate carry more sessions and
   more variants than we do, and new papers appear there within days. We have
   the pipeline (`.freebuff/pp-*` ingest scripts) but no scheduled run.
2. **Brand and trust.** Save My Exams is what a teacher or parent puts in a
   search box first. Our notes are good; nobody knows that yet.
3. **Content volume on the notes side.** Their notes are per-syllabus-point with
   examiner commentary on every sub-topic. Ours are per-topic; the granularity
   gap shows up in search results.
4. **Video.** Cognito and YouTube channels own the "I don't get this" moment
   that text cannot answer fast enough.

## 4. Where we beat them, and should shout about it

1. **We mark real work.** Save My Exams' Smart Mark takes typed answers. We take
   an uploaded photograph of a handwritten answer and mark it against a mark
   scheme. **Nothing else in this market does that**, and it is the single
   feature that maps to how CAIE papers actually work.
2. **Local payment.** Bank transfer + Urpay + receipt verification at $5–20/month
   versus card-only international subscriptions. For our students this is the
   difference between buying and not buying. This is a real moat, not a nice-to-have.
3. **The whole loop in one place.** Notes → topic questions → past papers with
   mark schemes → mistakes queue → AI marking → parent visibility. Competitors
   own one or two of those steps.
4. **Parents are first-class.** PMT/Exam-Mate/ZNotes have no parent view at all.
   Parents are the buyer.
5. **No dark patterns.** Every competitor above uses pressure mechanics — streak
   loss, timers, "don't lose your progress". We now deliberately do not (see §6),
   and can say so in marketing. Independent schools, and many parents, actively
   look for a platform that does not manipulate their child.

## 5. Recommended improvements, in priority order

### P0 — do these next (high impact, mostly already half-built)

1. **Make AI marking the headline, and put it on the past-paper archive.**
   Every archived paper should have one prominent "Mark my answers" action that
   accepts photos/PDFs, returns per-question mark-scheme points awarded/lost, and
   writes the weak topics back into the practice bank. Right now the capability
   exists but is not the front door.
2. **A "Mistakes to fix" queue.** Derive it from `practice_attempts` where
   `last_correct = false`, auto-build a 10-question drill, and celebrate the flip
   (`corrected_mistake` already pays the XP). This is the loop that makes revision
   *feel* like progress, and it is cheap because the data already exists.
3. **Per-topic "exam ready" signal.** For each topic: notes read, questions
   attempted, mistakes fixed → three states (Not started / Working on it /
   Exam-ready). SaveMyExams-style, syllabus-referenced, and the thing a student
   checks the night before a paper. Powers the dashboard's next-action button.
4. **Scale the per-topic SEO surface.** We already have route templates. Add
   per-topic *paper question* pages (the highest-intent IGCSE query shape:
   "0580 vectors questions and answers"), `Quiz`/`LearningResource` JSON-LD, and
   every topic URL in the sitemap. This is the cheapest growth channel we have.
5. **Automate the paper ingest.** A scheduled run of the existing
   `.freebuff/pp-candidates-*` scripts with an admin review queue keeps the
   archive the freshest one on the market, which is the whole reason students
   return each session.

### P1 — next quarter

6. **Parent weekly digest.** One quiet, non-shaming email a week: two specific
   wins, one topic to revisit, the week's days studied. Parents are the buyers
   and this is the highest-leverage retention feature available to us. (Needs a
   transactional email provider — evaluate one rather than assuming.)
7. **Offline/PWA mode for notes.** Our students study on phones, often on metered
   or unreliable data. Cache the notes and the topic question sets; queue answers
   and sync when back online.
8. **Worked solutions, not just mark schemes.** Every topical question should have
   a model answer written the way examiners award marks. Then AI marking is
   *checking* against something the student can also read when they get it wrong.
9. **Syllabus checklist granularity.** Break topic notes down to syllabus
   sub-points so we can honestly say "every 0625 statement is covered and
   referenced" — that claim is the trust wedge against community-written notes.
10. **Short video/worked-example slots per topic,** even if only for the top 20
    hardest topics. Not a video platform — a fix for the "I'm stuck now" moment.

### P2 — bets worth making

11. **Cooperative, private challenges.** The welfare rules allow challenges if
    they are private, optional and cooperative: e.g. a self-chosen "fix 10
    mistakes this week" or a study group where members jointly unlock a topic
    pack. Do not copy competitive class leaderboards.
12. **Teacher/class accounts.** The school channel is how Seneca and Cognito grew.
    Our parent view plus assignment-free content makes a light version cheap:
    a teacher code that groups students and shows cohort topic mastery.
13. **Voice/Arabic support.** The student base is bilingual; an Arabic UI toggle
    and Arabic explanation text for the hardest topics is a differentiator none
    of the above offer.
14. **Exam-countdown personalisation.** Explicitly *not* a pressure countdown —
    instead a "what to do with the time you have" plan (2 weeks / 2 months)
    generated from current topic mastery.

## 6. Positioning: the platform that doesn't use streaks against you

Every competitor's retention model relies on loss aversion: streak counters that
reset, timers, "you're falling behind". Marketing that contrast is free reach
with parents and teachers, and it is defensible because it is structural — our
schema literally cannot express a lost streak any more:

* the number on the dashboard is `days studied this week`, recomputed from the XP
  ledger, against a goal the student sets (1–7 days) and can change any time;
* `touch_streak()` never decrements — the worst possible outcome of a quiet week
  is that the week's count is small;
* all three focus-session lengths (10/20/30 min) pay the same 20 XP, so the timer
  can never become the game;
* the leaderboard is opt-out and the view excludes anyone who opted out;
* encouragement is generated from real data and stays silent when there is
  nothing true to say.

Suggested copy angles: "Progress, not pressure." / "We count the mistakes you
fix, not the minutes you sit there." / "No streak guilt. Ever."

## 7. How we will know it worked

Measure learning and retention, never time-on-site:

| Metric | Why |
| --- | --- |
| % of active students who hit their self-set weekly goal | Does the loop work at all |
| Mistakes fixed per student per week | The core learning action |
| Time from signup → first marked answer | Activation |
| % of accounts returning in week 2 and week 4 | Retention without guilt mechanics |
| Past papers marked per account | Whether the headline feature is used |
| Paid conversion by plan, with bank-transfer share | Pricing and payment fit |
| Organic sessions on per-topic pages | SEO surface working |
| Parent digest open/click rate | Whether the buyer sees value |

## 8. Things already fixed this session (context, not a wishlist)

* The leaderboard returned **zero rows for every student** — `leaderboard_public`
  was `security_invoker` over an `xp_events` table with RLS enabled and no
  policies, so every row summed to 0 XP and the `HAVING` clause dropped it. Fixed,
  verified live.
* `display_name` fell back to the email local part, publishing half of every
  student's email address on a public page. Now `full_name`/`username` only.
* The dashboard's XP bar implied a 610-point daily grind target. Removed.
* A missed day reset a visible counter to zero. Replaced with a weekly goal.
* Copy that framed ordinary progress as failure ("weak areas", "0/0 · 0%",
  red "wrong" badges on progress) reworded.
