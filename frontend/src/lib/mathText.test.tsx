import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import {
  MathText,
  applyMathHtml,
  hasMath,
  maskMath,
  splitMath,
  unmaskMath,
} from "./mathText";
import { flashcardFaceHtml } from "@/components/StudyManuscript";

// The corpus's own shapes, straight from the live question bank.
const FRACTION = "Write \\(\\frac{23}{10}\\) as a fraction in lowest terms.";
const RECURRING = "\\(0.\\dot{2}\\dot{3}\\)";
const OPTION = "\\(\\frac{5}{6}\\)";

describe("hasMath", () => {
  it("detects inline and display delimiters, and nothing else", () => {
    expect(hasMath(FRACTION)).toBe(true);
    expect(hasMath("\\[x = 4\\]")).toBe(true);
    expect(hasMath("plain text 23/10")).toBe(false);
    expect(hasMath("")).toBe(false);
    expect(hasMath(null)).toBe(false);
    expect(hasMath(undefined)).toBe(false);
  });
});

describe("MathText", () => {
  it("renders the LaTeX source as KaTeX, keeping the prose", () => {
    const html = renderToStaticMarkup(<MathText text={FRACTION} />);
    expect(html).toContain("katex");
    expect(html).toContain("Write");
    expect(html).toContain("as a fraction in lowest terms.");
    // The raw TeX wrapper must not reach the student.
    expect(html).not.toContain("\\(\\frac{23}{10}\\)");
  });

  it("renders recurring-decimal dot notation", () => {
    const html = renderToStaticMarkup(<MathText text={RECURRING} />);
    expect(html).toContain("katex");
    // The TeX survives only inside KaTeX's MathML annotation (for screen
    // readers); the student-visible wrapper is gone.
    expect(html).not.toContain("\\(");
  });

  it("renders option strings", () => {
    const html = renderToStaticMarkup(<MathText text={OPTION} />);
    expect(html).toContain("katex");
  });

  it("passes math-free text through unchanged", () => {
    expect(renderToStaticMarkup(<MathText text="Just a normal question." />)).toContain(
      "Just a normal question.",
    );
    expect(splitMath("no math here")).toEqual([{ kind: "text", text: "no math here" }]);
  });

  it("treats null and undefined as empty", () => {
    expect(renderToStaticMarkup(<MathText text={null} />)).toBe("");
    expect(renderToStaticMarkup(<MathText />)).toBe("");
  });

  it("degrades to the raw source when the TeX itself is broken, never blanks", () => {
    // Valid delimiter but invalid command: KaTeX throws, the fallback keeps the
    // source readable instead of hiding the question.
    const html = renderToStaticMarkup(<MathText text="Bad \\(\\nonsense{}\\) here" />);
    expect(html).toContain("Bad");
    expect(html).toContain("here");
  });

  it("splits the maths on one line with the prose between", () => {
    const parts = splitMath("Solve \\(x^2\\), giving \\(x = 0\\) or \\(x = 3\\).");
    expect(parts.filter((p) => p.kind === "math")).toHaveLength(3);
    expect(parts[0]).toMatchObject({ kind: "text", text: "Solve " });
    expect(parts[1]).toMatchObject({ kind: "math" });
    expect(parts[2]).toMatchObject({ kind: "text", text: ", giving " });
  });
});

describe("maskMath / unmaskMath", () => {
  it("hides TeX from an HTML pipeline and restores KaTeX after it", () => {
    const { masked, tokens } = maskMath(FRACTION);
    expect(masked).not.toContain("\\frac");
    expect(masked).toContain("Write");
    // Simulate the pipeline doing its worst to the masked text…
    const processed = masked.replace(/Write/g, "Write");
    const html = unmaskMath(processed, tokens);
    expect(html).toContain("katex");
    expect(html).toContain("as a fraction in lowest terms.");
  });

  it("is a no-op on text without maths", () => {
    const { masked, tokens } = maskMath("plain");
    expect(masked).toBe("plain");
    expect(unmaskMath(masked, tokens)).toBe("plain");
  });
});

describe("applyMathHtml", () => {
  it("types maths inside an already-safe HTML string", () => {
    const html = applyMathHtml("<p>Find \\(\\frac{3}{5}\\) of 240.</p>");
    expect(html).toContain("<p>Find ");
    expect(html).toContain("katex");
    expect(html).not.toContain("\\(");
  });
});

describe("flashcardFaceHtml", () => {
  it("keeps the face pipeline and now also types maths", () => {
    const html = flashcardFaceHtml("p = h&rho;g, \\(v = \\frac{s}{t}\\)");
    // Entity handling is the browser DOM's job (jsdom keeps the entity text);
    // what this module adds is the maths: KaTeX in, no TeX wrapper out.
    expect(html).toContain("h&rho;g");
    expect(html).toContain("katex");
    expect(html).not.toContain("\\(");
  });
});
