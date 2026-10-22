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
// Maths is rendered through the shared KaTeX module (lib/mathText): the teach
// blocks author `\( ... \)`, and masking it before the escape pass keeps the
// TeX out of the emitted HTML while every other character stays escaped — the
// same equations the questions, options and flashcards now render.

import { maskMath, unmaskMath } from "./mathText";

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

  // A heading marker glued to the end of the previous sentence (`…finish.###
  // Worked example`, in 11 live exam-technique materials) is a lost line break
  // from an earlier repair pass, not prose: without this it prints the hashes.
  const normalised = String(markdown ?? "").replace(/([.!?])(#{2,6})\s+/g, "$1\n$2 ");

  for (const line of normalised.split("\n")) {
    const trimmed = line.trim();

    if (trimmed === "") {
      closeList();
      continue;
    }

    // Math spans are masked before escaping so the TeX never meets the HTML
    // escaper (a stray `&` inside TeX would survive as `&amp;` and break KaTeX),
    // then swapped for KaTeX HTML after the surrounding tag is written.
    const { masked, tokens } = maskMath(line);
    const mTrimmed = masked.trim();
    const fmt = (text: string) => unmaskMath(inline(text), tokens);

    if (line.startsWith("### ")) {
      closeList();
      html.push(`<h3>${fmt(masked.slice(4))}</h3>`);
      continue;
    }
    if (/^[-*] /.test(mTrimmed)) {
      openList("ul");
      html.push(`<li>${fmt(mTrimmed.slice(2))}</li>`);
      continue;
    }
    if (/^\d+\. /.test(mTrimmed)) {
      openList("ol");
      html.push(`<li>${fmt(mTrimmed.replace(/^\d+\.\s*/, ""))}</li>`);
      continue;
    }
    closeList();
    // One <p> per source line, the shape the lesson pipeline produces: the teach
    // blocks put each step of a worked example on its own line on purpose.
    html.push(`<p>${fmt(masked)}</p>`);
  }
  closeList();

  return html.join("\n");
}

/**
 * The section headings, in order, for a table of contents or a "read the method"
 * summary. Returns the heading text without the `### ` marker.
 */
/**
 * Study-plan markdown to HTML.
 *
 * The study planner's output is model-written, so its grammar is messier than
 * the authored blocks above: `#`/`##`/`###` headings (sometimes doubled by
 * the model, e.g. `### ## Week 1`), setext underlines (`===`, `---`), `-`/`*`/`+`
 * bullets with space-indented nesting, numbered steps, and `**bold**`.
 *
 * Same safety contract as teachToHtml: every line is escaped before any tag is
 * emitted, so the only tags in the output are the ones written below and the
 * result is safe for dangerouslySetInnerHTML (callers still sanitize).
 *
 * Heading levels sit under the page's own h1: `#` becomes h2, `##` h3, deeper
 * runs h4. When markers are stacked, the last run wins, so `### ## Week 1`
 * reads as a week heading rather than printing literal hashes.
 */
/**
 * Short model-written strings (marker feedback, mark-scheme lines) to inline
 * HTML: escaped, `**bold**` rendered, newlines folded to <br/>. For values
 * inside text elements, via dangerouslySetInnerHTML (callers still sanitize).
 * Not a block renderer — multi-line markdown goes through studyPlanToHtml.
 */
export function inlineMarkdownToHtml(text: string): string {
  return inline(String(text ?? "").replace(/\r\n?/g, "\n")).replace(/\n/g, "<br/>");
}

export function studyPlanToHtml(markdown: string): string {
  const html: string[] = [];
  const stack: { kind: ListKind; indent: number }[] = [];

  const closeAll = () => {
    while (stack.length > 0) html.push(`</${stack.pop()!.kind}>`);
  };

  const listItem = (kind: ListKind, indent: number, text: string) => {
    while (stack.length > 0) {
      const top = stack[stack.length - 1];
      if (top.indent > indent || (top.indent === indent && top.kind !== kind)) {
        html.push(`</${stack.pop()!.kind}>`);
      } else break;
    }
    const top = stack[stack.length - 1];
    if (!top || top.indent < indent) {
      html.push(`<${kind}>`);
      stack.push({ kind, indent });
    }
    html.push(`<li>${inline(text)}</li>`);
  };

  for (const raw of String(markdown ?? "").split("\n")) {
    const line = raw.replace(/\t/g, "    ");
    const trimmed = line.trim();
    if (trimmed === "") continue;

    const hashes = trimmed.match(/^(?:#+\s*)+/);
    if (hashes) {
      const runs = hashes[0].match(/#+/g)!;
      const depth = runs[runs.length - 1].length;
      const text = trimmed.slice(hashes[0].length).trim();
      if (!text) continue;
      closeAll();
      const tag = depth <= 1 ? "h2" : depth === 2 ? "h3" : "h4";
      html.push(`<${tag}>${inline(text)}</${tag}>`);
      continue;
    }
    // Setext underlines (===, ---) add nothing once the heading above renders.
    if (/^(=+|-{3,})$/.test(trimmed)) continue;
    // The model is told never to reveal model names, but a `Model: ...` line
    // still slipped into one live plan (seen in a screenshot as
    // `Model: @cf/meta/...`). Model ids live in the study_plans.ai_model
    // column only — never render them, so drop such lines here as well.
    if (/^(\*\*)?model(\*\*)?\s*:/i.test(trimmed)) continue;

    const indent = Math.floor((line.length - line.trimStart().length) / 2);
    const bullet = trimmed.match(/^([-*+])\s+(.*)$/);
    if (bullet) {
      listItem("ul", indent, bullet[2]);
      continue;
    }
    const numbered = trimmed.match(/^\d+[.)]\s+(.*)$/);
    if (numbered) {
      listItem("ol", indent, numbered[1]);
      continue;
    }
    closeAll();
    html.push(`<p>${inline(trimmed)}</p>`);
  }
  closeAll();

  return html.join("\n");
}

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

/**
 * Study materials come in two shapes: notes/summary rows store HTML from the
 * content pipeline, while exam-technique rows store the small-markdown grammar
 * above. The converter escapes every line, so HTML rows must bypass it —
 * otherwise their tags render as literal text on the page (seen live on the
 * per-topic notes page). The caller still sanitizes the result: this returns
 * stored HTML as-is, exactly as the lessons/notes pages already do.
 */
export function materialContentToHtml(content: string): string {
  const text = String(content ?? "");
  if (/^\s*<(h[1-6]|p|ul|ol|div|table|pre|blockquote|hr|img)\b/i.test(text)) {
    return markdownHeadingsInHtml(text);
  }
  return teachToHtml(text);
}

/**
 * HTML-shaped material content with markdown headings appended to it.
 *
 * The content pipeline wrote notes/summary bodies as HTML, then a later pass
 * appended `### Worked example` sections to 23 of them. `materialContentToHtml`
 * must not run the escaping converter over HTML, so those headings used to reach
 * the page as literal `### Worked example` text. This converts only whole lines
 * that are markdown headings and leaves every other line — real HTML — alone.
 * The heading text goes through the same escape pass as `teachToHtml`, so the
 * result stays safe for dangerouslySetInnerHTML.
 */
function markdownHeadingsInHtml(html: string): string {
  return html
    .split("\n")
    .map((line) => {
      const match = line.match(/^\s*(#{1,6})\s+(.+?)\s*$/);
      if (!match) return line;
      const depth = match[1].length;
      const tag = depth <= 2 ? "h2" : depth === 3 ? "h3" : "h4";
      return `<${tag}>${inline(match[2])}</${tag}>`;
    })
    .join("\n");
}
