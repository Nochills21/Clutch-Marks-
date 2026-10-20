import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import {
  MathText,
  applyMathHtml,
  hasMath,
  maskMath,
  mathToPlainText,
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

describe("mathToPlainText", () => {
  // jsPDF draws strings, so this is what the paper sees: readable Unicode,
  // never the TeX source. Same corpus shapes as the UI tests above.
  it("turns fractions into slash notation", () => {
    expect(mathToPlainText(FRACTION)).toBe("Write 23/10 as a fraction in lowest terms.");
    expect(mathToPlainText(OPTION)).toBe("5/6");
    expect(mathToPlainText("\\(\\frac{-1}{2}\\)")).toBe("(-1)/2");
  });

  it("renders recurring decimals with combining dots", () => {
    expect(mathToPlainText(RECURRING)).toBe("0.2\u03073\u0307");
  });

  it("handles roots, powers, text and symbols", () => {
    expect(mathToPlainText("\\(\\sqrt{2}\\)")).toBe("√2");
    expect(mathToPlainText("\\(x^{2}\\)")).toBe("x²");
    expect(mathToPlainText("\\[E = mc^{2}\\]")).toBe("E = mc²");
    expect(mathToPlainText("\\(3 \\times 4\\)")).toBe("3 × 4");
    expect(mathToPlainText("\\(5 \\text{ cm}\\)")).toBe("5 cm");
    expect(mathToPlainText("\\(a \\le b\\)")).toBe("a ≤ b");
  });

  it("keeps nested fractions readable left to right", () => {
    expect(mathToPlainText("\\(\\frac{\\frac{1}{2}}{3}\\)")).toBe("1/2/3");
  });

  it("leaves plain strings and null untouched", () => {
    expect(mathToPlainText("Just a normal question.")).toBe("Just a normal question.");
    expect(mathToPlainText("plain 23/10")).toBe("plain 23/10");
    expect(mathToPlainText(null)).toBe("");
    expect(mathToPlainText(undefined)).toBe("");
  });

  it("degrades unknown TeX to its letters instead of dropping them", () => {
    const out = mathToPlainText("Bad \\(\\nonsense{x}\\) here");
    expect(out).toContain("nonsense");
    expect(out).toContain("x");
    expect(out).toContain("here");
    expect(out).not.toContain("\\(");
    expect(out).not.toContain("{");
  });

  it("keeps an unmappable exponent as a labelled group", () => {
    expect(mathToPlainText("\\(x^{abc}\\)")).toBe("x^(abc)");
    // Unbraced literal underscores in prose must not grow parentheses.
    expect(mathToPlainText("\\(a\\) of some_var")).toBe("a of some_var");
  });
});
