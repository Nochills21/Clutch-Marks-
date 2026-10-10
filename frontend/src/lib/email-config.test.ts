// Verification: verify the email configuration changes behave correctly.
// Headless test that drives the actual source code and asserts expected state.
import { existsSync, readdirSync, readFileSync } from "fs";
import path from "path";
import { describe, it, expect } from "vitest";

// The test runs from the repo root — use process.cwd() as the base.
const root = process.cwd();

const read = (p: string) => readFileSync(root + p, "utf8");

/**
 * Locate the built Legal chunk.
 *
 * Vite names chunks by content hash, so pinning the filename (the test used to
 * read `Legal-0_rAszy6.js`) made this fail the moment Legal.tsx — or anything it
 * imports — changed, even though the behaviour under test was fine. Find
 * whichever `Legal-*.js` the current build emitted instead.
 */
const legalChunkPath = () => {
  const dir = root + "/dist/assets";
  if (!existsSync(dir)) throw new Error("dist/assets is missing — run `npm run build` before the test suite");
  const file = readdirSync(dir).find((f) => /^Legal-.*\.js$/.test(f));
  if (!file) throw new Error("no Legal-*.js chunk in dist/assets — run `npm run build` before the test suite");
  return `${dir}/${file}`;
};

describe("Email configuration changes", () => {
  it("site.ts SITE.supportEmail is support@clutchmarks.study", () => {
    const siteContent = read("/frontend/src/lib/site.ts");
    expect(siteContent).toContain("supportEmail: \"support@clutchmarks.study\"");
  });

  // This used to count the literal address in Legal.tsx (three times). The PDPL
  // notice now takes it from @/lib/legal, which takes it from SITE.supportEmail,
  // because a compliance document that repeats its own contact address is how
  // one of them ends up wrong. The invariant is therefore the wiring: the page
  // must use the shared constant, and the shared constant must resolve to the
  // address asserted at the top of this file.
  it("the legal pages and the data-rights page use the shared support address", () => {
    const legalContent = read("/src/pages/Legal.tsx");
    expect(legalContent).toContain('from "@/lib/legal"');
    expect(legalContent).toContain("PRIVACY_CONTACT_HREF");
    expect(legalContent).toContain("PRIVACY_CONTACT_EMAIL");

    const shared = read("/frontend/src/lib/legal.ts");
    expect(shared).toContain("SITE.supportEmail");

    const rightsContent = read("/src/pages/DataRights.tsx");
    expect(rightsContent).toMatch(/PRIVACY_CONTACT_(EMAIL|HREF)/);
  });

  it("AppSidebar.tsx has mailto:support@clutchmarks.study", () => {
    const sidebarContent = read("/frontend/src/components/AppSidebar.tsx");
    const mailtoMatches = sidebarContent.match(
      /href="mailto:support@clutchmarks\.study"/g
    );
    expect(mailtoMatches).not.toBeNull();
    expect(mailtoMatches!.length).toBe(1);
  });

  it("No clutchmarks.com support email in frontend", () => {
    const siteContent = read("/frontend/src/lib/site.ts");
    expect(siteContent).not.toMatch(/support@clutchmarks\.com/);

    const legalContent = read("/src/pages/Legal.tsx");
    expect(legalContent).not.toMatch(/href="mailto:support@clutchmarks\.com"/);
  });

  it("welcome-email function reads WELCOME_FROM_EMAIL env var", () => {
    const welcomeContent = read("/backend/supabase/functions/welcome-email/index.ts");
    expect(welcomeContent).toContain("WELCOME_FROM_EMAIL");
    expect(welcomeContent).toMatch(
      /const FROM = Deno\.env\.get\("WELCOME_FROM_EMAIL"\)/
    );
  });

  it("email-events function reads RESEND_WEBHOOK_SECRET env var", () => {
    const eventsContent = read("/backend/supabase/functions/email-events/index.ts");
    expect(eventsContent).toContain("RESEND_WEBHOOK_SECRET");
    expect(eventsContent).toMatch(
      /const secret = Deno\.env\.get\("RESEND_WEBHOOK_SECRET"\)/
    );
  });

  it("the built Legal chunk can reach support@clutchmarks.study", () => {
    // The notice no longer carries the address inline: it imports it from
    // @/lib/legal → SITE.supportEmail, so the literal ships in whichever shared
    // chunk the entry also pulls in. What matters for a reader is that the page
    // actually gets an address, so walk the Legal chunk's own imports and assert
    // it is reachable — this still fails if the address is dropped entirely.
    const seen = new Set<string>();
    const queue = [legalChunkPath()];
    let reachable = false;
    while (queue.length && !reachable) {
      const file = queue.pop() as string;
      if (seen.has(file)) continue;
      seen.add(file);
      const code = readFileSync(file, "utf8");
      if (code.includes("support@clutchmarks.study")) {
        reachable = true;
        break;
      }
      for (const match of code.matchAll(/from"\.\/([\w.@-]+\.js)"/g)) {
        queue.push(path.join(path.dirname(file), match[1]));
      }
    }
    expect(reachable, "no support address is reachable from the built Legal chunk").toBe(true);
  });
});
