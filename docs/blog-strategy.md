# Clutch Marks — Marketing Blog & SEO Plan

The blog lives on the **same Cloudflare Pages project** as the app (a `/blog`
section built with a static site generator — Astro or markdown-at-build), or on
a separate `blog.clutchmarks.study` Pages project if content releases should stay
decoupled from app deploys. The blog's single job:
capture students searching for exam help and funnel them into the app.

## Why a blog (the honest math)

Students don't search for "study platform" — they search their exact pain:
- "how to get an A* in A level maths"
- "IGCSE physics paper 6 tips"
- "9709 past paper questions by topic"
- "is grade 7 in IGCSE good"

That's tens of thousands of monthly searches with proven intent. One ranking post =
free signups forever. SaveMyExams, Physics & Maths Tutor, and Revision Science built
entire businesses on this traffic.

---

## Site structure

```
blog.clutchmarks.study/
├── /                            ← homepage: latest posts + free-tool CTA
├── /category/igcse/             ← IGCSE (O Level) posts
├── /category/as-level/          ← AS posts
├── /category/a2-level/          ← A2 posts
├── /category/study-technique/   ← exam strategy, revision methods
│
├── /topic-guides/               ← pillar pages (see below)
│   ├── /igcse-maths/
│   ├── /igcse-physics/
│   ├── /igcse-computer-science/
│   ├── /a-level-maths/
│   ├── /a-level-physics/
│   └── /a-level-computer-science/
│
└── /[individual posts]
```

### Pillar pages = the funnel's top

Each subject guide is a long, definitive page ("IGCSE Maths: complete 0580 guide —
syllabus, topics, grading, past papers, how to get an A*") targeting the big-volume
keyword. It links to every supporting post on that subject AND to the app's
matching subject page (`clutchmarks.study/study/maths/ol`).

Supporting posts target long-tail keywords and all link back to their pillar
(internal linking = SEO authority flows to where the signup CTA lives).

---

## Content plan: first 12 posts (launch quarter)

Each post = exam-style value, not "10 reasons to study hard" fluff. Students save
and share genuinely useful content — that's what earns links and rankings.

### IGCSE Maths (0580)
1. **"IGCSE Maths 0580: every formula you need on one page"** — the single most
   searched maths resource. One-page formula sheet + PDF download (email gate:
   download requires signup → direct funnel into app).
2. **"How to get an A* in IGCSE Maths (0580): the 90-day plan"** — week-by-week
   study plan; each week links to the matching topics in the app.
3. **"The 10 most common IGCSE Maths mistakes (marked by examiners)"** — mistakes
   with worked corrections; natural CTA: "practice these exact topics in Clutch Marks".

### IGCSE Physics (0625)
4. **"IGCSE Physics 0625: the complete formula list by topic"** — same formula-sheet
   play, email-gated PDF.
5. **"Paper 6 (alternative to practical): what examiners actually want"** — almost
   no competition for this keyword, high anxiety topic.
6. **"Why your Physics definitions score zero (and the exact wording that works)"**

### IGCSE CS (0478)
7. **"IGCSE Computer Science 0478: pseudocode guide with worked examples"** — the
   most-feared topic, evergreen search.
8. **"Binary/hex conversion: the 60-second method"**

### AS/A2 (the paid-plan funnel)
9. **"AS Maths P1: trigonometry identities you MUST memorise"** — every AS maths
   student searches this.
10. **"A2 Physics: how to structure Paper 4 answers for full marks"** — CTA is
    stronger here: "practice Paper 4-style questions free" → paid plan upsell.
11. **"9709 vs 9231: which maths route is right for you"** — zero competition,
    parents search this.
12. **"How to revise for A levels: spaced repetition, past papers, and the 80/20
    of revision"** — broad study-technique pillar targeting parents AND students.

### Ongoing cadence
2 posts/week is the minimum for meaningful SEO traction. Every post follows the
same template: exam-style intro, worked examples with mark-scheme wording, embedded
sample questions from the actual app, CTA block at 30%/60%/end of the post.

---

## The funnel mechanics (how a reader becomes a user)

### CTA ladder — match the ask to their intent
| Reader stage | CTA | Link |
|---|---|---|
| Just browsing | "Try a topic quiz free" | app topic quiz page (no signup needed to preview) |
| Downloading a resource | Email gate: "Get the PDF + track your progress free" | signup with parent email field |
| Comparing options | "See how our practice compares" | subject page |
| Parent (bounced from student content) | "Get weekly progress emails" | parent-signup page |

Every post ends with a full-width CTA: "Practice this exact topic on Clutch Marks
— free for IGCSE." UTM-tagged (`?utm_source=blog&utm_medium=post&utm_campaign=[slug]`)
so signups are traceable to their post.

### Email capture
The PDF downloads are the killer funnel: formula sheets are the most-downloaded
resource in exam season. Email gate → the welcome email (already built) → student
starts using the app. The infrastructure for this is done: signup → welcome email →
parent auto-linking → weekly digest.

### Retargeting loop
Students who read but don't sign up get captured by the weekly digest promise and
the streak/XP hooks once they do sign up. The blog's job ends at signup; the app's
built-in retention (streaks, XP, weak-topic practice, parent emails) does the rest.

---

## SEO technical setup (do once, at blog launch)

- **SEO tooling:** pretty permalinks (`/post-name/`), meta/schema via the SSG's
  SEO plugin (Astro: `@astrojs/sitemap` + head components), submit the sitemap
  to Google Search Console the day the blog goes live.
- **Schema markup:** `Article` on every post, `FAQPage` where relevant (rich results
  for "how to" queries), `Organization` linking the blog and app as one entity.
- **Speed:** Cloudflare Pages serves the blog from the same global CDN as the
  app — nothing extra needed.
- **Cross-linking rules:** every post links to (a) its pillar page, (b) 2–3 sibling
  posts, (c) exactly one deep app link (a specific subject/topic page, never the
  homepage). The app links are dofollow — that's the point.
- **Canonical clarity:** blog lives on the same domain (`clutchmarks.study/blog`)
  or a subdomain — either way no canonical conflicts with the app. Set
  `Organization` schema referencing both.
- **E-E-A-T signals:** author bio "written by Cambridge examiners" (only if true —
  otherwise "aligned to the Cambridge/Edexcel 2025–2027 syllabus"), updated dates
  on posts, syllabus references in every post.

## Measurement (from day one)

- **Search Console** — which queries bring traffic (submit the day the blog is live;
  data takes 2–4 weeks to appear).
- **UTM + analytics** — the app already has no analytics; add Plausible (or PostHog)
  before the blog launches so `utm_source=blog` signups are visible. This is the
  number that tells you whether the blog is working: signups per post.
- **The one KPI that matters:** signups attributed to blog UTM links per month.
  If a post brings 0 signups after 3 months, rewrite its CTA or kill the topic.

## Launch sequence

1. Buy domain in Cloudflare → DNS setup (see domain-launch-runbook) → app live on `clutchmarks.study`
2. Add the blog to the Pages project (Astro `/blog` section) or a second Pages project on `blog.`
3. Build the blog template + pillar-page structure (fast static theme)
4. Publish 3 posts before announcing anything (sites with 1 post don't rank)
5. Google Search Console + sitemap + analytics
6. 2 posts/week cadence — first review of what's working at the 3-month mark
