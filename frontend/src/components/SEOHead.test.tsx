import { describe, expect, it, afterEach } from "vitest";
// react-dom alone, like StudyManuscript.test.tsx: @testing-library/react needs
// @testing-library/dom at runtime and that package is not installed.
import { HelmetProvider } from "react-helmet-async";
import { createRoot, type Root } from "react-dom/client";
import { act } from "react-dom/test-utils";
import { SEOHead } from "./SEOHead";

(globalThis as Record<string, unknown>).IS_REACT_ACT_ENVIRONMENT = true;

let root: Root | null = null;
let container: HTMLDivElement | null = null;

const ldJson = () => [...document.querySelectorAll('script[type="application/ld+json"]')];

/** /pricing ships an array (Course + FAQPage), so read the types either way. */
const typesOf = (block: Element | undefined) => {
  const parsed = JSON.parse(block?.textContent ?? "{}");
  return (Array.isArray(parsed) ? parsed : [parsed]).map(
    (entry: Record<string, unknown>) => entry["@type"],
  );
};

function mount(element: React.ReactElement) {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  act(() => {
    root!.render(<HelmetProvider>{element}</HelmetProvider>);
  });
}

afterEach(() => {
  act(() => {
    root?.unmount();
  });
  root = null;
  container?.remove();
  container = null;
  document.head.querySelectorAll('script[type="application/ld+json"]').forEach((el) => el.remove());
});

describe("SEOHead structured data", () => {
  // The regression this covers: the JSON-LD used to be a <script> child of
  // <Helmet>, which react-helmet-async reconciles away, so a hydrated page kept
  // the prerendered block only until the first render — and then had none. The
  // live /pricing showed exactly that, and Googlebot reads the DOM after
  // rendering.
  it("leaves exactly one JSON-LD block in the DOM after hydration", () => {
    mount(<SEOHead path="/pricing" />);
    const blocks = ldJson();
    expect(blocks).toHaveLength(1);
    expect(typesOf(blocks[0])).toContain("FAQPage");
  });

  it("replaces the prerendered block instead of duplicating it", () => {
    const stale = document.createElement("script");
    stale.type = "application/ld+json";
    stale.setAttribute("data-seo", "prerender");
    stale.textContent = '{"@type":"Stale"}';
    document.head.appendChild(stale);

    mount(<SEOHead path="/pricing" />);

    expect(document.head.querySelector('[data-seo="prerender"]')).toBeNull();
    expect(ldJson()).toHaveLength(1);
    expect(typesOf(ldJson()[0])).toContain("FAQPage");
  });

  it("updates the block in place when a page swaps its structured data", () => {
    mount(<SEOHead path="/pricing" jsonLd={{ "@type": "First", name: "a" }} />);
    expect(typesOf(ldJson()[0])).toEqual(["First"]);

    act(() => {
      root!.render(
        <HelmetProvider>
          <SEOHead path="/pricing" jsonLd={{ "@type": "Second", name: "b" }} />
        </HelmetProvider>,
      );
    });

    const blocks = ldJson();
    expect(blocks).toHaveLength(1);
    const parsed = JSON.parse(blocks[0].textContent ?? "{}");
    expect(parsed["@type"]).toBe("Second");
    expect(parsed.name).toBe("b");
  });

  it("removes the block on unmount so a noindex page inherits nothing", () => {
    mount(<SEOHead path="/pricing" jsonLd={{ "@type": "Temporary" }} />);
    expect(ldJson()).toHaveLength(1);
    act(() => {
      root?.unmount();
    });
    root = null;
    expect(ldJson()).toHaveLength(0);
  });
});
