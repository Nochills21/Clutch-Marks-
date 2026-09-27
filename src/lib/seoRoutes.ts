/**
 * Shared SEO metadata for public routes.
 *
 * Used by:
 *  - the build-time prerender plugin (writes static per-route HTML so
 *    non-JavaScript crawlers get correct OpenGraph/Twitter tags)
 *  - page components via <SEOHead />
 */

export const SITE_URL = (import.meta.env.VITE_SITE_URL as string) || "https://clutemark.s.study";
export const SITE_NAME = "Clutch Marks";

export interface RouteMeta {
  path: string;
  title: string;
  description: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const organization = {
  "@type": "EducationalOrganization",
  name: SITE_NAME,
  url: `${SITE_URL}/`,
};

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
  },
  {
    path: "/subjects",
    title: "Subjects & Levels — Clutch Marks",
    description:
      "Choose Maths, Physics or Computer Science at OL, AS or A2 and jump straight into lessons, materials, exams and the AI question bank.",
  },
  {
    path: "/lessons",
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
    title: "Quizzes — Clutch Marks",
    description:
      "Test your understanding with timed quizzes and instant AI feedback across every topic and level.",
  },
  {
    path: "/past-papers",
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
    title: "Flashcards — Clutch Marks",
    description:
      "Study key terms and concepts with spaced-repetition flashcards built for exam recall.",
  },
  {
    path: "/practice",
    title: "Practice — Clutch Marks",
    description:
      "Topic questions, smart drills on your weakest areas, and every question you got wrong or saved — one practice hub.",
  },
  {
    path: "/study-planner",
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
];

export function getRouteMeta(path: string): RouteMeta | undefined {
  return ROUTE_META.find((r) => r.path === path);
}
