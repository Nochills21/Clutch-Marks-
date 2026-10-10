// Renders the branded 1200x630 social cards used for og:image / twitter:image.
// Run with: node scripts/make-og-image.mjs
//
// Emits public/og.png (the default card) plus one card per public route under
// public/og/. Each route's card is named in frontend/src/lib/seoRoutes.ts
// (`ogImage`) and baked into the prerendered HTML by plugins/prerender-seo.ts.
//
// These are committed assets: the previous og:image was a signed Google Storage
// URL with an expiry, so every social preview broke once it lapsed.
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const logo = path.join(root, "public", "icon-512.png");

const W = 1200;
const H = 630;
const BRAND = "MATHS · PHYSICS · COMPUTER SCIENCE";

/** SVG text is XML — ampersands and angle brackets must be escaped. */
const esc = (t) =>
  String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function card({ kicker = BRAND, title, lines, titleSize }) {
  const t = esc(title);
  const size = titleSize ?? (t.length > 24 ? 56 : t.length > 17 ? 72 : 92);
  const bodyStart = lines.length > 1 ? 424 : 452;
  const body = lines
    .map(
      (l, i) =>
        `<text x="88" y="${bodyStart + i * 48}" fill="#B9B4AC" font-family="Inter, Helvetica, Arial, sans-serif" font-size="32" font-weight="400">${esc(l)}</text>`,
    )
    .join("\n  ");

  return `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#F5B301"/>
      <stop offset="1" stop-color="#E8862E"/>
    </linearGradient>
    <radialGradient id="bloom" cx="50%" cy="0%" r="70%">
      <stop offset="0" stop-color="#E8B01E" stop-opacity="0.20"/>
      <stop offset="1" stop-color="#E8B01E" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse">
      <path d="M56 0H0V56" fill="none" stroke="#E8B01E" stroke-opacity="0.06" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="${W}" height="${H}" fill="#0B0B0D"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  <rect width="${W}" height="${H}" fill="url(#bloom)"/>
  <rect x="0" y="0" width="${W}" height="3" fill="url(#gold)"/>

  <text x="88" y="150" fill="#8A8A93" font-family="Inter, Helvetica, Arial, sans-serif"
        font-size="21" font-weight="600" letter-spacing="5">${esc(kicker)}</text>

  <text x="86" y="288" fill="#F2EFE9" font-family="Georgia, 'Times New Roman', serif"
        font-size="${size}" font-weight="600" letter-spacing="-2">${t}</text>

  <rect x="88" y="332" width="120" height="3" fill="url(#gold)"/>

  ${body}

  <text x="88" y="556" fill="#E8B01E" font-family="Inter, Helvetica, Arial, sans-serif"
        font-size="26" font-weight="600" letter-spacing="1">clutchmarks.study</text>
</svg>
`;
}

const CARDS = [
  {
    out: "og.png",
    title: "Clutch Marks",
    titleSize: 94,
    lines: ["Revision notes, topic questions with instant", "marking, and a full past-paper archive."],
  },
  { out: "og/subjects.png", title: "Subjects & Levels", lines: ["Maths, Physics and Computer Science at", "IGCSE, AS and A2."] },
  { out: "og/lessons.png", title: "Lessons", lines: ["Structured lessons covering the full syllabus,", "with video and text content."] },
  { out: "og/notes.png", title: "Topic Notes", lines: ["Search, filter and download topic notes for", "every subject, level and topic."] },
  { out: "og/quizzes.png", title: "Quizzes", lines: ["Timed topic quizzes with instant AI feedback", "on every answer."] },
  { out: "og/past-papers.png", title: "Past Papers & Mark Schemes", lines: ["Past exam papers with mark schemes, by year,", "session and paper number."] },
  { out: "og/flashcards.png", title: "Flashcards", lines: ["Spaced-repetition flashcards for the terms", "and formulas you keep forgetting."] },
  { out: "og/practice.png", title: "Practice", lines: ["Topic questions, weak-area drills and every", "mistake you have saved — one hub."] },
  { out: "og/study-planner.png", title: "AI Study Planner", lines: ["A personalised revision schedule built from", "your quiz results and deadlines."] },
  { out: "og/pricing.png", title: "Plans & Pricing", lines: ["Preview every level free — full access", "from $5/month."] },
];

const logoBuffer = await sharp(logo).resize(150, 150).png().toBuffer();

for (const c of CARDS) {
  const out = path.join(root, "public", c.out);
  mkdirSync(path.dirname(out), { recursive: true });
  await sharp(Buffer.from(card(c)))
    .composite([{ input: logoBuffer, top: 60, left: W - 210 }])
    .png()
    .toFile(out);
  console.log("wrote " + path.relative(root, out) + " (" + W + "x" + H + ")");
}
