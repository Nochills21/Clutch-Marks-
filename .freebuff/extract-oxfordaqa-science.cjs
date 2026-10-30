// Parse the subject-content section of an OxfordAQA International GCSE science
// specification into sections, subsections and each section's introduction.
//
//   node .freebuff-tmp/oxfordaqa/extract-science.cjs biology
//   node .freebuff-tmp/oxfordaqa/extract-science.cjs physics
//
// Same shape as extract-9202.cjs, generalised so the three science specs share
// one parser: all three write "3.N Title" for a section and "3.N.M Title" for a
// subsection, then lettered statements. Two things differ and are handled here
// rather than by a second script:
//
//  - the qualification-only marker is a letter, not always C — Biology writes B,
//    Physics writes P — and it sits after the heading text;
//  - a long section title wraps onto the next line ("3.6 Generating and
//    distributing electricity and household" / "use"), so the unwrapped half is
//    joined before the marker is stripped.
//
// Everything is read from the PDF text. Nothing is typed by hand, so a heading
// cannot drift from the specification.
const fs = require("node:fs");
const path = require("node:path");

const SPECS = {
  biology: {
    file: "biology-spec.txt",
    code: "9201",
    title: "Biology",
    markers: ["B", "P", "C"],
  },
  physics: {
    file: "physics-spec.txt",
    code: "9203",
    title: "Physics",
    markers: ["P", "B", "C"],
  },
};

const which = process.argv[2];
const spec = SPECS[which];
if (!spec) {
  console.error(`usage: extract-science.cjs ${Object.keys(SPECS).join("|")}`);
  process.exit(1);
}

const txt = fs.readFileSync(path.join(__dirname, "..", ".freebuff-tmp", "oxfordaqa", spec.file), "utf8").replace(/\r/g, "");
const lines = txt.split("\n").map((l) => l.replace(/\u00a0/g, " ").replace(/\uFFFD/g, "-").trimEnd());

// The contents page prints the same headings with a page number, so the bare
// heading is unique to the body.
const start = lines.findIndex((l) => l.trim() === "3 Subject content");
if (start < 0) {
  console.error("could not find '3 Subject content'");
  process.exit(1);
}
const body = lines.slice(start + 1);
const stop = body.findIndex((l) => /^\s*4\s+Scheme of assessment/i.test(l));
const section = stop > 0 ? body.slice(0, stop) : body;

const clean = (s) => s.replace(/\s+/g, " ").trim();
const isStatement = (l) => /^[a-z]\.\s/.test(l.trim()) || /^\s*Students should/.test(l);
const isHeading = (l) => /^3\.\d+(\.\d+)?\s+\S/.test(l.trim());

// A trailing qualification marker ("... plant tissues B") is metadata about a
// combined-science route this site does not publish: recorded, not displayed.
function stripMarker(title) {
  for (const marker of spec.markers) {
    const re = new RegExp(`^(.*?)\\s+${marker}$`);
    const m = title.match(re);
    if (m && m[1].trim().length > 12) return { title: m[1].trim(), marker };
  }
  return { title, marker: "none" };
}

const sections = [];
let currentSection = null;
let currentSub = null;
let intro = [];

for (let i = 0; i < section.length; i += 1) {
  const line = section[i];
  const trimmed = line.trim();
  if (!trimmed) continue;
  // Running header and footer.
  if (new RegExp(`^\\s*OxfordAQA International GCSE ${spec.title} \\(${spec.code}\\)`).test(trimmed)) continue;
  if (/^Visit oxfordaqa\.com\/\d{4}/.test(trimmed)) continue;
  if (/^\d{1,3}$/.test(trimmed)) continue;
  // Bullet glyphs come out of pdftotext as U+FFFD or a stray character.
  if (/^[\uFFFD\u2022\u25CF\uF0B7\u00b7●○]$/.test(trimmed)) continue;

  const m = trimmed.match(/^3\.(\d+)(?:\.(\d+))?\s+(.+)$/);
  if (m) {
    let title = m[3];
    // A wrapped heading continues on the next line when that line is prose-cased
    // and the title looks unfinished.
    const next = (section[i + 1] ?? "").trim();
    if (
      next &&
      !isHeading(next) &&
      !isStatement(next) &&
      /^[a-z(]/.test(next) &&
      next.length < 40 &&
      title.length < 70
    ) {
      title = `${title} ${next}`;
      i += 1;
    }
    const marked = stripMarker(clean(title));
    if (!m[2]) {
      currentSection = { area: m[1], title: marked.title, marker: marked.marker, intro: "", subs: [] };
      sections.push(currentSection);
      currentSub = null;
      intro = [];
    } else {
      currentSub = { code: `3.${m[1]}.${m[2]}`, title: marked.title, marker: marked.marker };
      if (currentSection) currentSection.subs.push(currentSub);
    }
    continue;
  }

  if (currentSub) continue;
  // Section prose before its first subsection is that section's introduction.
  if (currentSection && !isStatement(trimmed) && trimmed.length > 40) {
    intro.push(trimmed);
    currentSection.intro = clean(intro.join(" "));
  }
}

const subs = sections.reduce((n, s) => n + s.subs.length, 0);
console.log(`${spec.title} ${spec.code}: ${sections.length} sections, ${subs} subsections`);
for (const s of sections) {
  console.log(`\n3.${s.area} ${s.title}${s.marker !== "none" ? `  [${s.marker}]` : ""}  (${s.subs.length})`);
  console.log(`    intro: ${s.intro.slice(0, 120) || "(none)"}`);
  for (const sub of s.subs) console.log(`    ${sub.code}  ${sub.title}${sub.marker !== "none" ? `  [${sub.marker}]` : ""}`);
}

fs.writeFileSync(path.join(__dirname, `oxfordaqa-${which}-structure.json`), JSON.stringify(sections, null, 2));
console.log(`\nwrote oxfordaqa-${which}-structure.json`);
