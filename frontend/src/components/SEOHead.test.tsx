import { describe, expect, it, afterEach } from "vitest";
// react-dom alone, like StudyManuscript.test.tsx: @testing-library/react needs
// @testing-library/dom at runtime and that package is not installed.
import { createRoot, type Root } from "react-dom/client";
import { act } from "react-dom/test-utils";
import { SEOHead } from "./SEOHead";
import { SITE_URL } from "@/lib/seoRoutes";

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
    root!.render(element);
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
  // The regression that mattered most: with Helmet inert, the cleanup deleted
  // the prerendered description/canonical/robots and nothing replaced them.
  it("writes title, description, canonical and robots itself", () => {
    mount(<SEOHead path="/pricing" />);
    expect(document.title).toBe("Plans & Pricing — Clutch Marks");
    expect(document.querySelector('meta[name="description"]')?.getAttribute("content")).toContain(
      "Unlock every subject",
    );
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe(
      `${SITE_URL}/pricing`,
    );
    expect(document.querySelector('meta[name="robots"]')?.getAttribute("content")).toContain(
      "index",
    );
    expect(document.querySelector('meta[property="og:title"]')?.getAttribute("content")).toBe(
      "Plans & Pricing — Clutch Marks",
    );
  });

  it("keeps exactly one copy of each tag when a page re-renders", () => {
    mount(<SEOHead path="/pricing" />);
    act(() => {
      root!.render(<SEOHead path="/pricing" title="Plans & Pricing — Clutch Marks" />);
    });
    expect(document.querySelectorAll('meta[name="description"]')).toHaveLength(1);
    expect(document.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
    expect(document.querySelectorAll('meta[name="robots"]')).toHaveLength(1);
  });

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
      root!.render(<SEOHead path="/pricing" jsonLd={{ "@type": "Second", name: "b" }} />);
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
