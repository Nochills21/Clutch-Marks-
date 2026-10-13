import { describe, expect, it, vi, afterEach } from "vitest";
// NOTE: these specs run on react-dom alone (`react-dom/server` for structure,
// `react-dom/client` + `act` for clicks). `@testing-library/react` cannot be
// used here: it requires `@testing-library/dom` at runtime and that package
// is not installed.
import type { ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createRoot, type Root } from "react-dom/client";
import { act } from "react-dom/test-utils";
import {
  ManuscriptHead,
  ManuscriptSection,
  ManuscriptQuestion,
  ManuscriptFlashcard,
} from "./StudyManuscript";

(globalThis as Record<string, unknown>).IS_REACT_ACT_ENVIRONMENT = true;

let root: Root | null = null;
let container: HTMLDivElement | null = null;

afterEach(() => {
  root?.unmount();
  root = null;
  container?.remove();
  container = null;
});

function mount(ui: ReactElement): HTMLDivElement {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  act(() => {
    root!.render(ui);
  });
  return container;
}

describe("StudyManuscript", () => {
  it("renders the header eyebrow, serif title and lede", () => {
    const html = renderToStaticMarkup(
      <ManuscriptHead
        eyebrow="AS Mathematics · WMA11"
        title="Circular Measure"
        lede="Syllabus: radian measure, arc length and sector area."
      />,
    );
    expect(html).toContain("cm-manuscript");
    expect(html).toContain("cm-m-eyebrow");
    expect(html).toContain("AS Mathematics · WMA11");
    expect(html).toContain("cm-m-title");
    expect(html).toContain("Circular Measure");
    expect(html).toContain("radian measure");
  });

  it("renders a section card with its eyebrow", () => {
    const html = renderToStaticMarkup(
      <ManuscriptSection eyebrow="Section 1" title="Radians">
        <p>One radian is…</p>
      </ManuscriptSection>,
    );
    expect(html).toContain("cm-m-section");
    expect(html).toContain("Section 1");
    expect(html).toContain("Radians");
    expect(html).toContain("One radian is…");
  });

  it("renders lettered options and marks selected / correct / wrong states", () => {
    const answering = renderToStaticMarkup(
      <ManuscriptQuestion
        eyebrow="Question 1 · check"
        question="What is π radians in degrees?"
        options={["90°", "180°", "270°", "360°"]}
        selected={0}
        correctOption={null}
        onSelect={() => {}}
      />,
    );
    // Letter chips A–D all render, and the picked option is gold-selected.
    for (const letter of ["A", "B", "C", "D"]) {
      expect(answering).toContain(`>${letter}<`);
    }
    expect(answering).toContain('data-state="selected"');
    expect(answering).not.toContain("Mark scheme");

    // Once revealed, the key goes green, a wrong pick goes red, and the mark
    // scheme appears.
    const revealed = renderToStaticMarkup(
      <ManuscriptQuestion
        eyebrow="Question 1 · check"
        question="What is π radians in degrees?"
        options={["90°", "180°", "270°", "360°"]}
        selected={0}
        correctOption={1}
        explanation="A half turn is 180°."
      />,
    );
    expect(revealed).toContain('data-state="correct"');
    expect(revealed).toContain('data-state="wrong"');
    expect(revealed).toContain("Mark scheme");
    expect(revealed).toContain("A half turn is 180°.");
  });

  it("calls back when an option or the flashcard is clicked", () => {
    const onSelect = vi.fn();
    const q = mount(
      <ManuscriptQuestion
        eyebrow="Question 1 · check"
        question="What is π radians in degrees?"
        options={["90°", "180°", "270°", "360°"]}
        selected={null}
        correctOption={null}
        onSelect={onSelect}
      />,
    );
    const radios = q.querySelectorAll('[role="radio"]');
    expect(radios).toHaveLength(4);
    act(() => {
      (radios[2] as HTMLElement).click();
    });
    expect(onSelect).toHaveBeenCalledWith(2);

    const onFlip = vi.fn();
    const card = mount(
      <ManuscriptFlashcard
        eyebrow="Question"
        face="Define one radian."
        hint="Tap to reveal answer"
        flipped={false}
        onFlip={onFlip}
      />,
    );
    expect(card.textContent).toContain("Define one radian.");
    act(() => {
      (card.querySelector("button") as HTMLElement).click();
    });
    expect(onFlip).toHaveBeenCalled();
  });
});
