import { describe, it, expect } from "vitest";
import { teachToHtml, teachHeadings, materialContentToHtml, studyPlanToHtml, inlineMarkdownToHtml } from "./objectiveTeach";

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
    // Maths renders through KaTeX (lib/mathText): the TeX wrapper is gone and
    // the typeset markup is present in its place.
    expect(html).not.toContain("\\(x^2 = 3x\\)");
    expect(html).toContain("katex");
    expect(html).toContain("annotation"); // MathML carries the TeX for readers
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

describe("materialContentToHtml", () => {
  it("passes stored HTML through untouched, so notes render as markup", () => {
    const html = "<h2>Algebra — Equations</h2>\n<p>3(x − 2) = x + 4.</p>";
    expect(materialContentToHtml(html)).toBe(html);
  });

  it("converts markdown rows, so exam-technique notes keep working", () => {
    const html = materialContentToHtml("### Traps\n- Dividing by x loses a root.");
    expect(html).toContain("<h3>Traps</h3>");
    expect(html).toContain("<li>Dividing by x loses a root.</li>");
  });

  it("does not mistake a leading angle bracket in prose for HTML", () => {
    const html = materialContentToHtml("Use x < y and solve.");
    expect(html).toContain("x &lt; y");
    expect(html).not.toContain("<li>");
  });
});

describe("studyPlanToHtml", () => {
  // The shape the planner actually emits (seen live): a `#` title, `##`
  // weeks, a model-doubled `### ##` heading, setext underlines, `*`/`+`
  // bullets with space-indented nesting, and `**bold**`.
  const PLAN = [
    "**Overall Study Plan Overview**",
    "=============================================",
    "",
    "A balanced review schedule covering the syllabus.",
    "",
    "**Week-by-Week Breakdown**",
    "-----------------------",
    "",
    "### ## Week 1: Mathematics Review",
    "",
    "* **Mathematics (0580/9709)**",
    "  + Topics:",
    "    - Quadratic equations (1.1, 1.2)",
    "    - Functions (2.1, 2.2)",
    "  + Recommended activities:",
    "* **Physics (0625)**",
    "",
    "## Tips",
    "1. Do quizzes before reading notes.",
    "2. Review last week's misses every Monday.",
  ].join("\n");

  it("renders headings without printing any marker", () => {
    const html = studyPlanToHtml(PLAN);
    expect(html).toContain("<h3>Week 1: Mathematics Review</h3>");
    expect(html).toContain("<h3>Tips</h3>");
    expect(html).not.toMatch(/#|===|---/);
  });

  it("renders bold overview lines as paragraphs, not headings", () => {
    const html = studyPlanToHtml(PLAN);
    expect(html).toContain("<p><strong>Overall Study Plan Overview</strong></p>");
    expect(html).toContain("<p>A balanced review schedule covering the syllabus.</p>");
  });

  it("nests space-indented bullets inside their parent", () => {
    const html = studyPlanToHtml(PLAN);
    const maths = html.slice(html.indexOf("Mathematics (0580/9709)"), html.indexOf("Physics (0625)"));
    expect(maths).toContain("<li>Topics:</li>");
    expect(maths).toContain("<li>Quadratic equations (1.1, 1.2)</li>");
    expect(maths).toContain("<li>Recommended activities:</li>");
    // Nested lists open inside the parent item's list, not after it.
    expect((maths.match(/<ul>/g) ?? []).length).toBeGreaterThan(1);
    expect((maths.match(/<ul>/g) ?? []).length).toBe((maths.match(/<\/ul>/g) ?? []).length);
  });

  it("keeps numbered steps ordered", () => {
    const html = studyPlanToHtml(PLAN);
    const tips = html.slice(html.indexOf("<h3>Tips</h3>"));
    expect(tips).toContain("<ol>");
    expect(tips).toContain("<li>Do quizzes before reading notes.</li>");
    expect(tips).toContain("<li>Review last week's misses every Monday.</li>");
  });

  it("escapes content, so a plan can never inject markup", () => {
    const html = studyPlanToHtml("## Week 1\n- **Note:** use x < y\nsecond <script>line</script>.");
    expect(html).not.toContain("<script>");
    expect(html).toContain("x &lt; y");
    expect(new Set([...html.matchAll(/<\/?([a-z0-9]+)/g)].map((m) => m[1]))).toEqual(
      new Set(["h3", "ul", "li", "strong", "p"]),
    );
  });

  it("drops Model: leak lines — model ids live in ai_model, never in the page", () => {
    const html = studyPlanToHtml("Model: @cf/meta/llama-3.1-8b-instruct-fp8\n\n## Week 1\n- Focus on quadratics");
    expect(html).not.toContain("@cf/");
    expect(html).not.toContain("Model:");
    expect(html).toContain("<h3>Week 1</h3>");
    expect(studyPlanToHtml("**Model:** @cf/meta/llama-3.1-8b-instruct-fp8\n\n## Week 1")).not.toContain("@cf/");
  });

  it("is total: empty and missing input produce nothing rather than throwing", () => {
    expect(studyPlanToHtml("")).toBe("");
    expect(studyPlanToHtml(undefined as unknown as string)).toBe("");
  });
});

describe("inlineMarkdownToHtml", () => {
  it("renders bold in short model-written strings", () => {
    expect(inlineMarkdownToHtml("Good **method** but wrong final answer.")).toBe(
      "Good <strong>method</strong> but wrong final answer.",
    );
  });

  it("folds newlines so multi-line feedback keeps its breaks", () => {
    expect(inlineMarkdownToHtml("First line.\nSecond line.")).toBe("First line.<br/>Second line.");
  });

  it("escapes content, so feedback can never inject markup", () => {
    const html = inlineMarkdownToHtml("**Note:** use x < y\nsecond <script>line</script>.");
    expect(html).not.toContain("<script>");
    expect(html).toContain("x &lt; y");
    expect(new Set([...html.matchAll(/<\/?([a-z0-9]+)/g)].map((m) => m[1]))).toEqual(
      new Set(["strong", "br"]),
    );
  });

  it("is total: empty and missing input produce nothing rather than throwing", () => {
    expect(inlineMarkdownToHtml("")).toBe("");
    expect(inlineMarkdownToHtml(undefined as unknown as string)).toBe("");
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
