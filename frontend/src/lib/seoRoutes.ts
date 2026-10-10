/**
 * Shared SEO metadata for public routes.
 *
 * Used by:
 *  - the build-time prerender plugin (writes static per-route HTML so
 *    non-JavaScript crawlers get correct OpenGraph/Twitter tags)
 *  - page components via <SEOHead />
 */

// Read Vite's env defensively: this module is imported by the build-time
// prerender plugin, and inside the bundled vite.config the `import.meta.env`
// define is not applied — so the bare property access used to throw at config
// load time and take the whole dev server down with it.
const viteEnv = ((import.meta as { env?: Record<string, string | undefined> }).env) ?? {};

export const SITE_URL = viteEnv.VITE_SITE_URL || "https://clutchmarks.study";
export const SITE_NAME = "Clutch Marks";

/**
 * Robots directives, written out instead of left to Google's defaults.
 *
 * With no `robots` meta at all, Google chooses its own snippet/image limits,
 * and a stale result title can sit there through many recrawls.
 * `max-image-preview:large` is what lets the preview artwork show in results.
 */
export const ROBOTS_INDEX =
  "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

/** Auth/private pages: keep them out of the index, but keep following links. */
export const ROBOTS_NOINDEX = "noindex, follow";

/**
 * A host that must never represent the site (Vercel preview/branch aliases,
 * any non-canonical origin). Those deployments sit behind Vercel Deployment
 * Protection, so a crawler that lands on one is served Vercel's own SSO page —
 * which is how "Login – Vercel" gets attached to the brand in search results.
 */
export const ROBOTS_NOINDEX_NOFOLLOW = "noindex, nofollow";

export interface RouteMeta {
  path: string;
  title: string;
  description: string;
  /** Social card for this route, as a path under /public (see scripts/make-og-image.mjs). */
  ogImage?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  /** Keep this route out of the index (auth, sign-in, account pages). */
  noindex?: boolean;
}

const organization = {
  "@type": "EducationalOrganization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  description:
    "Online revision platform for Maths, Physics and Computer Science at IGCSE, AS and A2 — notes, exam-style topic questions with instant marking, and a past-paper archive.",
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/icon-512.png`,
    width: 512,
    height: 512,
  },
};

/** Fallback social card, used by any route without its own ogImage. */
export const DEFAULT_OG_IMAGE = "/og.png";

/** Absolute social-card URL for a route (og:image / twitter:image). */
export function ogImageUrl(meta: Pick<RouteMeta, "ogImage">): string {
  return `${SITE_URL}${meta.ogImage ?? DEFAULT_OG_IMAGE}`;
}

/** Shared FAQ copy — also rendered on /pricing. Keep answers factual. */
export const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: "What subjects and levels does Clutch Marks cover?",
    a: "Maths, Physics and Computer Science at IGCSE, AS and A2. Every subject has topic notes, exam-style questions with instant marking, and a past-paper archive with mark schemes.",
  },
  {
    q: "How much does Clutch Marks cost?",
    a: "You can preview every level for free. Full access is $20/month, $12/month when billed quarterly ($36), or $5/month when billed annually ($60).",
  },
  {
    q: "How do I pay?",
    a: "Pay by bank transfer or with the Urpay e-wallet. Choose your plan and method, send the total, then upload your receipt so we can match the payment — plans activate within 24 hours.",
  },
  {
    q: "Is my payment receipt private?",
    a: "Yes. Receipts are stored privately and only the admins verifying your payment can view them.",
  },
  {
    q: "Do I need a credit card to start?",
    a: "No. You can start with the free preview of every level and upgrade only when you are ready.",
  },
];

/** FAQPage node for any route that renders the FAQ. */
const faqPage = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
});

/** Course + offers node for the pricing page. Prices mirror the plan cards. */
const course = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Clutch Marks — Maths, Physics & Computer Science Revision",
  description:
    "Self-paced Maths, Physics and Computer Science revision for IGCSE, AS and A2: topic notes, exam-style questions with instant AI marking, flashcards and past papers with mark schemes.",
  url: `${SITE_URL}/pricing`,
  inLanguage: "en",
  educationalLevel: ["IGCSE", "AS Level", "A2 Level"],
  provider: organization,
  offers: [
    { "@type": "Offer", name: "Monthly", price: "20", priceCurrency: "USD" },
    { "@type": "Offer", name: "3 Months", price: "36", priceCurrency: "USD" },
    { "@type": "Offer", name: "Annual", price: "60", priceCurrency: "USD" },
  ],
};

/** Pricing-page structured data. Keep in sync with the visible FAQ on /pricing
 *  and the plan cards — Google ignores FAQ markup whose Q&A is not on the page. */
export const PRICING_JSON_LD = [course, faqPage()];

/**
 * BreadcrumbList for a topic page, mirroring the visible <TopicBreadcrumb>.
 *
 * Google renders breadcrumb rich results from this markup, and it is the only
 * structured data that tells a crawler the topic page sits under a subject and
 * level rather than floating on its own. Markup must match the on-page trail:
 * a crumb that is not a real, reachable URL is ignored (or penalised), so every
 * item here is one of the app's actual routes.
 */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

/**
 * Head fields for a route: the shared table's values, unless the page supplies
 * its own.
 *
 * Only parameterised pages (the /study/:slug/:level/:topic/... trio) should
 * supply their own — the table cannot know which topic is being rendered. Every
 * literal route reads its title and description from ROUTE_META so the static
 * (prerendered) and runtime (React) heads cannot disagree. They used to: pages
 * carried their own literals, and /practice alone shipped four different
 * descriptions depending on which render branch ran, so the same URL described
 * itself differently to Googlebot-with-JS and Googlebot-without.
 */
export function headFor(
  path: string,
  own?: { title?: string; description?: string },
): { title: string; description: string; noindex: boolean } {
  const meta = getRouteMeta(path);
  return {
    title: own?.title ?? meta?.title ?? SITE_NAME,
    description: own?.description ?? meta?.description ?? "",
    // OR, not override: a page can add noindex but never remove it from a route
    // the table already marked private.
    noindex: Boolean(meta?.noindex),
  };
}

export const ROUTE_META: RouteMeta[] = [
  {
    path: "/",
    // Must stay identical to the <SEOHead> on src/pages/Index.tsx. This entry is
    // what the prerenderer writes into the static HTML; the component is what
    // runs in the browser. When the two disagreed, the same URL carried two
    // different titles depending on whether Google executed JavaScript — the
    // kind of inconsistency that leaves a stale title in the index for weeks.
    title: "Clutch Marks — Revision Notes, Topic Questions & Past Papers",
    description:
      "Revision notes, exam-style topic questions with instant marking, and past papers with mark schemes for Maths, Physics and Computer Science at IGCSE, AS and A2.",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_NAME,
        // Helps Google's Site Names feature pick "Clutch Marks" for the domain
        // instead of whatever title a stale/odd crawl left behind.
        alternateName: ["ClutchMarks", "clutchmarks.study"],
        url: `${SITE_URL}/`,
        description:
          "Study Maths, Physics and Computer Science at IGCSE, AS and A2 with interactive lessons, practice quizzes and revision tools.",
      },
      { "@context": "https://schema.org", ...organization },
    ],
  },
  {
    path: "/auth",
    title: "Log In or Sign Up — Clutch Marks",
    description:
      "Log in to Clutch Marks or create an account to access lessons, topic notes, quizzes and past papers for Maths, Physics and Computer Science.",
    // A sign-in page must never be what Google shows for the domain.
    noindex: true,
  },
  {
    // Where Google hands the session back. A redirect endpoint has nothing to
    // index, and a crawl would only ever see a spinner.
    path: "/auth/callback",
    title: "Signing in — Clutch Marks",
    description: "Completing sign-in.",
    noindex: true,
  },
  {
    path: "/subjects",
    ogImage: "/og/subjects.png",
    title: "Subjects & Levels — Clutch Marks",
    description:
      "Choose Maths, Physics or Computer Science at IGCSE, AS or A2 and jump straight into lessons, materials, exams and the AI question bank.",
  },
  {
    path: "/lessons",
    ogImage: "/og/lessons.png",
    title: "Lessons — Clutch Marks",
    description:
      "Browse structured lessons covering the full syllabus with video and text content for Maths, Physics and Computer Science.",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Lessons",
      url: `${SITE_URL}/lessons`,
      description:
        "Structured lessons covering the full syllabus with video and text content.",
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: `${SITE_URL}/` },
      publisher: organization,
    },
  },
  {
    path: "/notes",
    ogImage: "/og/notes.png",
    title: "Topic Notes — Clutch Marks",
    description:
      "Search and filter uploaded topic notes by subject, level and keyword, then open, download and track what you've studied.",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Topic Notes",
      url: `${SITE_URL}/notes`,
      description:
        "Downloadable topic notes for Maths, Physics and Computer Science at IGCSE, AS and A2.",
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: `${SITE_URL}/` },
      publisher: organization,
    },
  },
  {
    path: "/quizzes",
    ogImage: "/og/quizzes.png",
    title: "Quizzes — Clutch Marks",
    description:
      "Test your understanding with timed quizzes and instant AI feedback across every topic and level.",
  },
  {
    path: "/past-papers",
    ogImage: "/og/past-papers.png",
    title: "Past Papers & Mark Schemes — Clutch Marks",
    description:
      "Download past exam papers and mark schemes by year, session and paper number to practise under exam conditions.",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Past Papers & Mark Schemes",
      url: `${SITE_URL}/past-papers`,
      description:
        "Past exam papers and mark schemes organised by year, session and paper number.",
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: `${SITE_URL}/` },
      publisher: organization,
    },
  },
  {
    path: "/flashcards",
    ogImage: "/og/flashcards.png",
    title: "Flashcards — Clutch Marks",
    description:
      "Study key terms and concepts with spaced-repetition flashcards built for exam recall.",
    // Behind <ApprovalGate>, which redirects a signed-out visitor to /auth. A
    // crawler can only ever see that redirect, so the page must not be
    // advertised as indexable (and stays out of the sitemap).
    noindex: true,
  },
  {
    path: "/practice",
    ogImage: "/og/practice.png",
    title: "Practice — Clutch Marks",
    description:
      "Topic questions, smart drills on your weakest areas, and every question you got wrong or saved — one practice hub.",
    noindex: true,
  },
  {
    path: "/study-planner",
    ogImage: "/og/study-planner.png",
    title: "Study Planner — Clutch Marks",
    description:
      "Create personalised study plans and organise your exam preparation schedule week by week.",
    noindex: true,
  },
  // ---- Parameterised study pages -----------------------------------------
  // Templates, not copy: the real value of a placeholder depends on which topic
  // is in the URL, so these entries exist to declare the route shape and the
  // wording pattern. `topicSeo.ts` fills them in for the pages, the prerenderer
  // and the sitemap, and seoConsistency.test.ts substitutes the same placeholders
  // here and asserts the two still agree — keeping this table from quietly
  // becoming fiction. Because the wording does not live here, these entries carry
  // no jsonLd: the LearningResource + BreadcrumbList for a topic page is built
  // only in topicSeo.ts.
  {
    path: "/study/:slug/:level",
    title: ":subject :levelLabel — Clutch Marks",
    description: "Lessons, revision materials, exams and a question bank for :subject :levelLabel.",
  },
  {
    path: "/study/:slug/:level/:topic/notes",
    title: ":topic — Notes | :subject :level | Clutch Marks",
    description: "Revision notes, topic questions and past papers for :topic in :subject :levelLabel.",
  },
  {
    path: "/study/:slug/:level/:topic/quiz",
    title: ":topic — Quiz | :subject :level | Clutch Marks",
    description:
      "Exam-style topic questions for :topic in :subject :levelLabel. Instant marking, worked answers and AI feedback.",
  },
  {
    path: "/study/:slug/:level/:topic/papers",
    title: ":topic — Papers | :subject :level | Clutch Marks",
    description:
      "Past papers and mark schemes for :topic in :subject :levelLabel. Practise under real exam conditions with papers sorted by year.",
  },
  {
    path: "/announcements",
    title: "Announcements — Clutch Marks",
    description:
      "Read the latest Clutch Marks announcements about lessons, exams and platform updates.",
    // Behind the approval gate; a crawler sees the sign-in redirect.
    noindex: true,
  },
  {
    path: "/progress",
    title: "Progress — Clutch Marks",
    description:
      "Track per-subject aggregates and per-topic mastery in one colour-coded view of your strengths and weaknesses.",
    // Personal to the signed-in student: a crawler only ever sees the sign-in
    // redirect, so there is nothing here for the index to hold.
    noindex: true,
  },
  {
    path: "/pricing",
    title: "Plans & Pricing — Clutch Marks",
    description:
      "Unlock every subject and level from $5/month — preview any level free. Pay by bank transfer or Urpay; plans activate within 24 hours.",
    ogImage: "/og/pricing.png",
    jsonLd: PRICING_JSON_LD,
  },
  {
    path: "/downloads",
    title: "Downloads — Clutch Marks",
    // Names the actual qualifications and syllabus codes — this is what a
    // student searching "IGCSE 0580 formula sheet" matches against.
    description:
      "Download formula sheets and reference sheets for every subject and level: Cambridge IGCSE 0580/0625/0478, Edexcel IAL AS/A2 Maths and Physics, Cambridge 9618 Computer Science."
  },
  {
    path: "/privacy",
    title: "Privacy Policy — Clutch Marks",
    description:
      "How Clutch Marks collects, uses and protects student and parent data — in plain language."
  },
  {
    path: "/terms",
    title: "Terms of Service — Clutch Marks",
    description:
      "The rules for using Clutch Marks — fair use, content ownership, and account policies in plain language."
  },
  {
    path: "/data-rights",
    title: "Your data rights — Clutch Marks",
    description:
      "Download everything Clutch Marks holds about your account, or ask us to correct, export or delete it. How we answer data requests, and how to complain to SDAIA."
  },

  // ---- Utility and account routes ----------------------------------------
  // Crawlable but never indexable. Deliberately NOT disallowed in
  // public/robots.txt: a Disallow would block the fetch, and a blocked fetch
  // means this noindex is never read (that is how /auth stayed indexed).
  // Deliberately absent from public/sitemap.xml, which only lists indexable
  // routes — seoConsistency.test.ts enforces both of those rules.
  {
    path: "/dashboard",
    title: "Dashboard — Clutch Marks",
    description:
      "Your Clutch Marks console: today's tasks, this week's progress and the subjects you study.",
    noindex: true,
  },
  {
    path: "/mastery",
    title: "Mastery — Clutch Marks",
    description:
      "Your objective-level mastery: what you can already do, what you are getting wrong, and what is due to come back.",
    noindex: true,
  },
  {
    path: "/leaderboard",
    title: "Leaderboard — Clutch Marks",
    description:
      "An optional leaderboard for students who choose to be listed. Nobody is ranked unless they opt in.",
    noindex: true,
  },
  {
    path: "/feedback",
    title: "Feedback — Clutch Marks",
    description: "Send the Clutch Marks team a bug report or a suggestion.",
    noindex: true,
  },
  {
    path: "/reset-password",
    title: "Reset Password — Clutch Marks",
    description: "Set a new password for your Clutch Marks account.",
    noindex: true,
  },
];


export function getRouteMeta(path: string): RouteMeta | undefined {
  return ROUTE_META.find((r) => r.path === path);
}
