// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { buildCramSheet, describeCramSheet } from "./cramSheet";

const note = `
<h2>Newton's second law</h2>
<p>This paragraph is the long explanatory body of the note and it says a great deal about how
forces combine, why the acceleration points along the resultant, and what happens to the
constant of proportionality when the units are chosen well.</p>
<p>F = m a</p>
<p><em>Key:</em> F = resultant force (N); m = mass (kg); a = acceleration (m s⁻²)</p>
<p><strong>Newton</strong> — the SI unit of force, equal to one kilogram metre per second squared.</p>
<h3>Worked example</h3>
<pre><code>F = m a = 4 × 3 = 12 N</code></pre>
<table border="1"><tr><td>quantity</td><td>unit</td></tr></table>
<figure><svg viewBox="0 0 10 10"><text>arrow</text></svg></figure>
<h2>Empty section</h2>
<p>Just prose here, nothing worth cramming, and it carries no equation or definition at all.</p>
`;

describe("buildCramSheet", () => {
  it("keeps equations, keys and definitions and drops the prose", () => {
    const sheet = buildCramSheet(note)!;
    expect(sheet).not.toBeNull();
    expect(sheet.html).toContain("F = m a");
    expect(sheet.html).toContain("Key:");
    expect(sheet.html).toContain("SI unit of force");
    expect(sheet.html).toContain("4 × 3 = 12");
    expect(sheet.html).not.toContain("constant of proportionality");
    expect(sheet.html).not.toContain("Just prose here");
  });

  it("counts tables and figures it left behind", () => {
    const sheet = buildCramSheet(note)!;
    expect(sheet.tables).toBe(1);
    expect(sheet.figures).toBe(1);
    expect(describeCramSheet(sheet)).toContain("1 table");
    expect(describeCramSheet(sheet)).toContain("1 figure");
  });

  it("does not open a heading with nothing under it", () => {
    const sheet = buildCramSheet(note)!;
    expect(sheet.html).toContain("Newton's second law");
    // "Empty section" survives only if one of its items does, and none do.
    expect(sheet.html).not.toContain("Empty section");
  });

  it("has no sheet for a note that is all prose", () => {
    expect(buildCramSheet("<p>One sentence.</p><p>Another sentence.</p>")).toBeNull();
    expect(buildCramSheet("")).toBeNull();
  });

  it("strips attributes from the source rather than copying them", () => {
    const sheet = buildCramSheet(
      '<h2>Recap</h2><p><span onclick="steal()">x = 1</span></p><p>y = 2</p><p>z = 3</p>',
    )!;
    expect(sheet.html).not.toContain("onclick");
    expect(sheet.html).toContain("x = 1");
  });
});
