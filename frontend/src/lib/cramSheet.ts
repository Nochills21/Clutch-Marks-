// "Five-minute cram" — the same note, condensed to what to hold in your head.
//
// The blueprint asks for a Standard-Learn / 5-Minute-Cram toggle on every note
// route. The rule that makes it honest is that it never writes anything: a cram
// sheet is *selected from* the note's own markup, so it cannot disagree with the
// note it came from, and a note with nothing extractable has no toggle at all.
//
// What survives the selection:
//   * section headings (h2/h3) — the skeleton of the topic, kept only when
//     something under them survived;
//   * equations: any paragraph or list item carrying `=`, `→`, `⇌` or `∝`,
//     together with the `<em>Key:</em>` symbol line inside that same paragraph;
//   * `<pre>` blocks, which hold the worked relations;
//   * definitions and traps — a bolded lead-in, or a sentence starting
//     "Definition", "Key point", "Remember", "Exam tip", "Common mistake".
//
// What is dropped, and counted so the page can say so: prose bodies, tables and
// figures. A cram sheet is a revision aid, not a second copy of the library.
import DOMPurify from "dompurify";

/** How much reading text a cram sheet may hold before it stops being a cram. */
const TEXT_BUDGET = 3_600;
/** Hard item cap, so a very long note cannot produce a 200-point "summary". */
const POINT_BUDGET = 40;

const EQUATION = /[=→⇌∝]/;
const DEFINITION_LEAD =
  /^(definition|key point|key idea|remember|note that|trap|common mistake|exam tip|watch out|memorise)/i;

export interface CramSheet {
  html: string;
  /** Items kept (equations, definitions, list items). */
  points: number;
  /** Items dropped because the budget ran out. */
  omitted: number;
  tables: number;
  figures: number;
}

const textOf = (el: Element) => (el.textContent ?? "").replace(/\s+/g, " ").trim();

const isEquationBlock = (text: string) => text.length > 0 && text.length <= 320 && EQUATION.test(text);

/** A paragraph earns its place by an equation, a bolding, or a named rule. */
function keepParagraph(el: Element): boolean {
  const text = textOf(el);
  if (!text) return false;
  if (isEquationBlock(text)) return true;
  if (/<em>\s*Key:/i.test(el.innerHTML)) return true;
  if (DEFINITION_LEAD.test(text)) return true;
  // A bolded lead-in ("**Insulator** — a material …") is a definition in this
  // corpus, and the convention is consistent enough to use as a signal.
  const first = el.firstElementChild;
  return first?.tagName === "STRONG" && text.length <= 400;
}

function keepListItem(el: Element): boolean {
  const text = textOf(el);
  if (!text) return false;
  return isEquationBlock(text) || DEFINITION_LEAD.test(text) || text.length <= 180;
}

/**
 * Build the cram sheet, or null when there is not enough to cram.
 *
 * The input is the note's stored HTML (unsanitised by this module's contract —
 * the reader sanitises the result before rendering, exactly as it does the full
 * note). Only text nodes are copied, so no attribute from the source survives.
 */
export function buildCramSheet(contentHtml: string): CramSheet | null {
  if (!contentHtml || typeof DOMParser === "undefined") return null;

  const doc = new DOMParser().parseFromString(`<body><div id="cram-root">${contentHtml}</div></body>`, "text/html");
  const root = doc.getElementById("cram-root");
  if (!root) return null;

  const out: string[] = [];
  let points = 0;
  let omitted = 0;
  let used = 0;
  let tables = 0;
  let figures = 0;
  // Headings wait in the buffer until something survives beneath them, so the
  // sheet never opens a section it then says nothing about.
  let pendingHeading: string | null = null;

  const budgetLeft = () => points < POINT_BUDGET && used < TEXT_BUDGET;

  const push = (html: string, text: string, block = 1) => {
    if (!budgetLeft()) {
      omitted += block;
      return;
    }
    if (pendingHeading) {
      out.push(pendingHeading);
      pendingHeading = null;
    }
    out.push(html);
    points += block;
    used += text.length;
  };

  for (const el of Array.from(root.children)) {
    const tag = el.tagName.toLowerCase();
    if (tag === "h2" || tag === "h3") {
      const heading = textOf(el);
      if (heading) pendingHeading = `<${tag}>${esc(heading)}</${tag}>`;
      continue;
    }
    if (tag === "table") {
      tables += 1;
      continue;
    }
    if (tag === "figure" || tag === "svg") {
      figures += 1;
      continue;
    }
    if (tag === "pre") {
      const text = textOf(el);
      if (text) push(`<pre><code>${esc(el.textContent ?? "")}</code></pre>`, text);
      continue;
    }
    if (tag === "p") {
      if (keepParagraph(el)) push(`<p>${cleanInline(el)}</p>`, textOf(el));
      continue;
    }
    if (tag === "ul" || tag === "ol") {
      const items = Array.from(el.children).filter((li) => li.tagName.toLowerCase() === "li" && keepListItem(li));
      if (items.length === 0) continue;
      const kept = items.filter((li) => budgetLeft() || points === 0);
      const lost = items.length - kept.length;
      push(
        `<${tag}>${kept.map((li) => `<li>${cleanInline(li)}</li>`).join("")}</${tag}>`,
        kept.map(textOf).join(" "),
        Math.max(1, kept.length),
      );
      omitted += lost;
      continue;
    }
    if (tag === "blockquote") {
      const text = textOf(el);
      if (text && (isEquationBlock(text) || DEFINITION_LEAD.test(text))) {
        push(`<blockquote><p>${cleanInline(el)}</p></blockquote>`, text);
      }
      continue;
    }
    // Anything else (div wrappers, hr, script/style leftovers) is dropped
    // rather than copied: the sheet is generated from known shape, not echoed.
  }

  if (points < 3) return null;
  return { html: out.join("\n"), points, omitted, tables, figures };
}

/** Inline copy: tags kept, attributes dropped, text escaped by DOMPurify. */
function cleanInline(el: Element): string {
  return DOMPurify.sanitize(el.innerHTML, {
    ALLOWED_TAGS: ["strong", "em", "b", "i", "sub", "sup", "br", "span", "code"],
    ALLOWED_ATTR: [],
  });
}

function esc(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** "9 headings · 24 equations · 2 tables in the full note" — the sheet's footer. */
export function describeCramSheet(sheet: CramSheet): string {
  const parts = [`${sheet.points} key point${sheet.points === 1 ? "" : "s"}`];
  if (sheet.tables) parts.push(`${sheet.tables} table${sheet.tables === 1 ? "" : "s"}`);
  if (sheet.figures) parts.push(`${sheet.figures} figure${sheet.figures === 1 ? "" : "s"}`);
  if (sheet.omitted) parts.push(`${sheet.omitted} more in the full note`);
  return parts.join(" · ");
}
