// Verification: verify the email configuration changes behave correctly.
// Headless test that drives the actual source code and asserts expected state.
import { existsSync, readdirSync, readFileSync } from "fs";
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

  it("Legal.tsx has mailto:support@clutchmarks.study links", () => {
    const legalContent = read("/src/pages/Legal.tsx");
    const mailtoMatches = legalContent.match(/mailto:support@clutchmarks\.study/g);
    expect(mailtoMatches).not.toBeNull();
    expect(mailtoMatches!.length).toBeGreaterThanOrEqual(3);
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

  it("built JS contains support@clutchmarks.study in Legal component", () => {
    const legalBuild = readFileSync(legalChunkPath(), "utf8");
    expect(legalBuild).toContain("support@clutchmarks.study");
  });
});
