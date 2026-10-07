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
    "Online revision platform for Maths, Physics and Computer Science at O Level (IGCSE), AS and A2 — notes, exam-style topic questions with instant marking, and a past-paper archive.",
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
    a: "Maths, Physics and Computer Science at O Level (IGCSE), AS and A2. Every subject has topic notes, exam-style questions with instant marking, and a past-paper archive with mark schemes.",
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
    "Self-paced Maths, Physics and Computer Science revision for O Level (IGCSE), AS and A2: topic notes, exam-style questions with instant AI marking, flashcards and past papers with mark schemes.",
  url: `${SITE_URL}/pricing`,
  inLanguage: "en",
  educationalLevel: ["O Level (IGCSE)", "AS Level", "A2 Level"],
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

export const ROUTE_META: RouteMeta[] = [
  {
    path: "/",
    title: "Clutch Marks — Maths, Physics & Computer Science Revision",
    description:
      "Study Maths, Physics and Computer Science at OL, AS and A2 with interactive lessons, practice quizzes and revision tools.",
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
          "Study Maths, Physics and Computer Science at OL, AS and A2 with interactive lessons, practice quizzes and revision tools.",
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
      "Choose Maths, Physics or Computer Science at OL, AS or A2 and jump straight into lessons, materials, exams and the AI question bank.",
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
        "Downloadable topic notes for Maths, Physics and Computer Science at OL, AS and A2.",
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
  },
  {
    path: "/practice",
    ogImage: "/og/practice.png",
    title: "Practice — Clutch Marks",
    description:
      "Topic questions, smart drills on your weakest areas, and every question you got wrong or saved — one practice hub.",
  },
  {
    path: "/study-planner",
    ogImage: "/og/study-planner.png",
    title: "Study Planner — Clutch Marks",
    description:
      "Create personalised study plans and organise your exam preparation schedule week by week.",
  },
  {
    path: "/study/:slug/:level/:topic/notes",
    title: ":topic — Revision Notes | :subject :level | Clutch Marks",
    description:
      ":topic revision notes and study materials in :subject :level at Clutch Marks.",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "LearningResource",
      name: ":topic — Revision Notes",
      educationalLevel: ":level",
      about: { "@type": "Thing", name: ":topic" },
      isPartOf: {
        "@type": "Course",
        name: ":subject :level",
        url: `${SITE_URL}/study/:slug/:level`,
      },
      provider: organization,
    },
  },
  {
    path: "/study/:slug/:level/:topic/quiz",
    title: ":topic — Topic Questions | :subject :level | Clutch Marks",
    description:
      "Exam-style topic questions for :topic in :subject :level with instant marking and explanations.",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "LearningResource",
      name: ":topic — Topic Questions",
      educationalLevel: ":level",
      about: { "@type": "Thing", name: ":topic" },
      isPartOf: {
        "@type": "Course",
        name: ":subject :level",
        url: `${SITE_URL}/study/:slug/:level`,
      },
      provider: organization,
    },
  },
  {
    path: "/study/:slug/:level/:topic/papers",
    title: ":topic — Past Papers & Mark Schemes | :subject :level | Clutch Marks",
    description:
      "Past papers and mark schemes for :topic in :subject :level, organised by year and session.",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "LearningResource",
      name: ":topic — Past Papers & Mark Schemes",
      educationalLevel: ":level",
      about: { "@type": "Thing", name: ":topic" },
      isPartOf: {
        "@type": "Course",
        name: ":subject :level",
        url: `${SITE_URL}/study/:slug/:level`,
      },
      provider: organization,
    },
  },
  {
    path: "/announcements",
    title: "Announcements — Clutch Marks",
    description:
      "Read the latest Clutch Marks announcements about lessons, exams and platform updates.",
  },
  {
    path: "/progress",
    title: "Progress — Clutch Marks",
    description:
      "Track per-subject aggregates and per-topic mastery in one colour-coded view of your strengths and weaknesses.",
  },
  {
    path: "/pricing",
    title: "Plans & Pricing — Clutch Marks",
    description:
      "Unlock every subject and level from $5/month. Pay by bank transfer or Urpay — plans activate within 24 hours.",
    ogImage: "/og/pricing.png",
    jsonLd: PRICING_JSON_LD,
  },
  {
    path: "/downloads",
    title: "Downloads — Clutch Marks",
    description:
      "Download revision notes, formula sheets and past papers for Maths, Physics and Computer Science."
  },
  {
    path: "/privacy",
    title: "Privacy Policy — Clutch Marks",
    description:
      "How Clutch Marks collects, uses and protects student data, written to be readable by students and parents."
  },
  {
    path: "/terms",
    title: "Terms of Service — Clutch Marks",
    description:
      "The terms you agree to when you use Clutch Marks."
  },
];


export function getRouteMeta(path: string): RouteMeta | undefined {
  return ROUTE_META.find((r) => r.path === path);
}
