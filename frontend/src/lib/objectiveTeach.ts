// Rendering an objective's `teach` micro-lesson.
//
// `public.learning_objectives.teach` is markdown, authored to the standard in
// docs/objectives-authoring.md §3: five `###` sections in a fixed order, a
// numbered method, one worked example, bulleted traps, and maths written as
// `\( ... \)` (plus the symbols the lesson corpus already uses: `x²`, `√`, `±`).
//
// The app has no markdown dependency — the lesson corpus in the database is
// already HTML, written by the pipeline's own converter (.freebuff/seed-content.cjs,
// `mdToHtml`). Rather than pull a library in for one panel, this is a small
// converter limited to exactly the grammar §3 allows, and it *escapes every line
// before it emits any tag*. That is what makes the result safe to hand to
// dangerouslySetInnerHTML: the only tags in the output are the ones written below.
//
// It mirrors the pipeline's output shape (headings, one <p> per source line,
// `**bold**`) so a teach block and a lesson read the same way, with one deliberate
// difference: a numbered method becomes an <ol>, not the <ul> the pipeline emits.
// The method's order is the whole point of it, and the panel is new, so there is
// no older rendering to stay compatible with.
//
// Maths is left exactly as authored, `\( ... \)` included — the same as the 100
// lessons that already ship that way. Inventing a partial LaTeX renderer here
// would make one panel disagree with every other page.

const escapeHtml = (text: string): string =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** `**bold**` — the only inline markup §3 uses. Applied after escaping. */
const inline = (text: string): string =>
  escapeHtml(text).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

type ListKind = "ul" | "ol";

/**
 * The authored markdown, as HTML. Deterministic and total: any input produces
 * escaped text, so a malformed or hand-edited teach block degrades to readable
 * prose rather than breaking the panel.
 */
export function teachToHtml(markdown: string): string {
  const html: string[] = [];
  let list: ListKind | null = null;

  const closeList = () => {
    if (list) {
      html.push(`</${list}>`);
      list = null;
    }
  };
  const openList = (kind: ListKind) => {
    if (list !== kind) {
      closeList();
      html.push(`<${kind}>`);
      list = kind;
    }
  };

  for (const line of String(markdown ?? "").split("\n")) {
    const trimmed = line.trim();

    if (trimmed === "") {
      closeList();
      continue;
    }
    if (line.startsWith("### ")) {
      closeList();
      html.push(`<h3>${inline(line.slice(4))}</h3>`);
      continue;
    }
    if (/^[-*] /.test(trimmed)) {
      openList("ul");
      html.push(`<li>${inline(trimmed.slice(2))}</li>`);
      continue;
    }
    if (/^\d+\. /.test(trimmed)) {
      openList("ol");
      html.push(`<li>${inline(trimmed.replace(/^\d+\.\s*/, ""))}</li>`);
      continue;
    }
    closeList();
    // One <p> per source line, the shape the lesson pipeline produces: the teach
    // blocks put each step of a worked example on its own line on purpose.
    html.push(`<p>${inline(line)}</p>`);
  }
  closeList();

  return html.join("\n");
}

/**
 * The section headings, in order, for a table of contents or a "read the method"
 * summary. Returns the heading text without the `### ` marker.
 */
export function teachHeadings(markdown: string): string[] {
  return String(markdown ?? "")
    .split("\n")
    .filter((line) => line.startsWith("### "))
    .map((line) => line.slice(4).trim());
}

/**
 * The same converter, under a name that is not about objectives.
 *
 * The exam-technique ("extras") materials the topic-bank builder writes use the
 * identical grammar — `###` sections, bullets, paragraphs, `**bold**` — so they
 * are rendered by this rather than by a second converter that could drift from
 * it. The original name is kept because every caller already uses it; this one
 * says what the function does rather than where it was first needed.
 */
export const smallMarkdownToHtml = teachToHtml;
