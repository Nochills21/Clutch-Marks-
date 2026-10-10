import { describe, it, expect } from "vitest";
import { teachToHtml, teachHeadings } from "./objectiveTeach";

/**
 * The shape docs/objectives-authoring.md §3 mandates: five `###` sections, a
 * numbered method, a worked example with the maths in `\( ... \)`, bulleted
 * traps. This is the grammar the converter is allowed to understand — and nothing
 * beyond it.
 */
const TEACH = `### What is being asked
Solve a quadratic equation by factorising it. A quadratic has **two** roots, so expect two answers.

### Method
1. Rearrange so that one side is exactly zero.
2. Factorise into two brackets.
3. Set each bracket to zero and solve.

### Worked example
Solve \\(x^2 = 3x\\).
Rearrange: \\(x(x - 3) = 0\\), giving \\(x = 0\\) or \\(x = 3\\).

### Traps
- Dividing by x instead of factorising — the missing root is a lost mark.
- Writing \\((x - 2)\\) as the root \\(x = -2\\).

### Timing
Paper 2: 2-3 minutes, 3 marks.`;

const texts = (html: string) => html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

describe("teachToHtml", () => {
  it("turns each section heading into an h3, in order", () => {
    const html = teachToHtml(TEACH);
    expect([...html.matchAll(/<h3>(.*?)<\/h3>/g)].map((m) => m[1])).toEqual([
      "What is being asked",
      "Method",
      "Worked example",
      "Traps",
      "Timing",
    ]);
  });

  it("keeps a numbered method as an ordered list, one item per step", () => {
    const html = teachToHtml(TEACH);
    const method = html.slice(html.indexOf("<h3>Method</h3>"), html.indexOf("<h3>Worked example</h3>"));
    expect(method).toContain("<ol>");
    expect(method).toContain("</ol>");
    expect([...method.matchAll(/<li>(.*?)<\/li>/g)].map((m) => texts(m[1]))).toEqual([
      "Rearrange so that one side is exactly zero.",
      "Factorise into two brackets.",
      "Set each bracket to zero and solve.",
    ]);
    // Ordered stays ordered: the step order is the point of it.
    expect(method).not.toContain("<ul>");
  });

  it("keeps the traps as an unordered list with one item per trap", () => {
    const html = teachToHtml(TEACH);
    const traps = html.slice(html.indexOf("<h3>Traps</h3>"), html.indexOf("<h3>Timing</h3>"));
    expect(traps).toContain("<ul>");
    expect([...traps.matchAll(/<li>/g)]).toHaveLength(2);
    expect(traps).toContain("the missing root is a lost mark");
  });

  it("renders bold and leaves the maths exactly as authored", () => {
    const html = teachToHtml(TEACH);
    expect(html).toContain("<strong>two</strong>");
    // No maths renderer exists in the app; the 100 lessons ship the same way.
    expect(html).toContain("\\(x^2 = 3x\\)");
    expect(html).toContain("\\(x(x - 3) = 0\\)");
  });

  it("gives every non-heading line its own paragraph, the lesson pipeline's shape", () => {
    const html = teachToHtml(TEACH);
    // The worked example is three source lines and nothing else.
    const example = html.slice(html.indexOf("<h3>Worked example</h3>"), html.indexOf("<h3>Traps</h3>"));
    expect([...example.matchAll(/<p>/g)]).toHaveLength(2);
  });

  it("escapes content, so a teach block can never inject markup", () => {
    const html = teachToHtml("### Traps\n- Use x < y and <script>alert(1)</script>.\n- a & b\nRead the method.");
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
    expect(html).toContain("x &lt; y");
    expect(html).toContain("a &amp; b");
    // The only tags in the output are the ones the converter writes.
    expect(new Set([...html.matchAll(/<\/?([a-z0-9]+)/g)].map((m) => m[1]))).toEqual(new Set(["h3", "p", "ul", "li"]));
  });

  it("closes a list before the next heading, whichever list it was", () => {
    const html = teachToHtml("### Traps\n- one\n\n### Timing\nPaper 2: 2 minutes.");
    expect(html).toBe(
      "<h3>Traps</h3>\n<ul>\n<li>one</li>\n</ul>\n<h3>Timing</h3>\n<p>Paper 2: 2 minutes.</p>",
    );
  });

  it("never emits an unclosed list, even with no trailing newline", () => {
    for (const md of ["- one", "1. one", "- one\n1. two", "text\n- one"]) {
      const html = teachToHtml(md);
      expect((html.match(/<ul>/g) ?? []).length).toBe((html.match(/<\/ul>/g) ?? []).length);
      expect((html.match(/<ol>/g) ?? []).length).toBe((html.match(/<\/ol>/g) ?? []).length);
    }
  });

  it("is total: empty and missing input produce nothing rather than throwing", () => {
    expect(teachToHtml("")).toBe("");
    expect(teachToHtml(undefined as unknown as string)).toBe("");
  });
});

describe("teachHeadings", () => {
  it("lists the five section headings and anything else the block carries", () => {
    expect(teachHeadings(TEACH)).toEqual([
      "What is being asked",
      "Method",
      "Worked example",
      "Traps",
      "Timing",
    ]);
    expect(teachHeadings("")).toEqual([]);
  });
});
