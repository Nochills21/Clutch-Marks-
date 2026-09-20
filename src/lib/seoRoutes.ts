/**
 * Shared SEO metadata for public routes.
 *
 * Used by:
 *  - the build-time prerender plugin (writes static per-route HTML so
 *    non-JavaScript crawlers get correct OpenGraph/Twitter tags)
 *  - page components via <SEOHead />
 */

export const SITE_URL = "https://clutch-marks.lovable.app";
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
    path: "/question-bank",
    title: "Question Bank — Clutch Marks",
    description:
      "Practise thousands of exam-style questions by topic and difficulty, with instant feedback and saved progress.",
  },
  {
    path: "/flashcards",
    title: "Flashcards — Clutch Marks",
    description:
      "Study key terms and concepts with spaced-repetition flashcards built for exam recall.",
  },
  {
    path: "/revision",
    title: "Revision Materials — Clutch Marks",
    description:
      "Access revision notes, summaries and study materials to prepare efficiently for your exams.",
  },
  {
    path: "/smart-revision",
    title: "Smart Revision — Clutch Marks",
    description:
      "AI-powered revision sessions that target your weakest areas for faster, more efficient exam prep.",
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
    path: "/homework",
    title: "Homework — Clutch Marks",
    description:
      "View assigned homework tasks, submit answers and track your submission and grading status.",
  },
  {
    path: "/progress",
    title: "Progress — Clutch Marks",
    description:
      "Track completed lessons, notes studied and quiz scores per subject and level.",
  },
  {
    path: "/calendar",
    title: "Calendar — Clutch Marks",
    description:
      "See every deadline, quiz and live lesson for your subjects in one calendar view.",
  },
  {
    path: "/announcements",
    title: "Announcements — Clutch Marks",
    description:
      "Read the latest Clutch Marks announcements about lessons, exams and platform updates.",
  },
  {
    path: "/heatmap",
    title: "Topic Heatmap — Clutch Marks",
    description:
      "Visualise your strengths and weaknesses across every topic with a colour-coded mastery heatmap.",
  },
];

export function getRouteMeta(path: string): RouteMeta | undefined {
  return ROUTE_META.find((r) => r.path === path);
}
