// PDPL compliance guard.
//
// A privacy notice is a set of promises about what the code does, and promises
// drift: someone edits the retention table, nobody edits the purge job, and the
// document quietly becomes untrue. Nothing in a normal build notices, because
// prose has no type. So the invariants are asserted here instead — the notice's
// claims, the signup that records consent, the migration that enforces each
// retention period, and the page that lets a reader exercise a right.
//
// These are source scans on purpose: the alternative is a browser test that
// cannot see a missing clause at all. Keep the assertions about *structure and
// wiring*, not wording — a reworded sentence should not fail this file, but a
// deleted promise should.
import { readFileSync } from "fs";
import path from "path";
import { describe, it, expect } from "vitest";

const root = process.cwd();
const read = (rel: string) => readFileSync(path.join(root, rel), "utf8");

const legal = read("src/pages/Legal.tsx");
const auth = read("src/pages/Auth.tsx");
const dataRights = read("src/pages/DataRights.tsx");
const appRoutes = read("src/App.tsx");
const seoRoutes = read("frontend/src/lib/seoRoutes.ts");
const consentMigration = read("supabase/migrations/20261008120000_pdpl_consent_export_and_requests.sql");
const retentionMigration = read("supabase/migrations/20261008130000_pdpl_retention_purge.sql");

describe("the privacy notice says what the PDPL requires it to say", () => {
  it("names a lawful basis for each purpose", () => {
    expect(legal).toMatch(/lawful basis/i);
    // Every basis we actually rely on is spelled out next to a purpose.
    for (const basis of ["Contract", "Consent —", "Legitimate interests"]) {
      expect(legal, `notice is missing the basis: ${basis}`).toContain(basis);
    }
  });

  it("names who else processes the data and where", () => {
    for (const processor of ["Supabase", "Vercel", "Cloudflare", "Resend", "Plausible"]) {
      expect(legal, `notice does not name ${processor}`).toContain(processor);
    }
    expect(legal).toMatch(/Transfers outside the Kingdom/);
  });

  it("lists the data-subject rights and how to exercise them", () => {
    for (const right of ["Access", "Correction", "Destruction", "Portability", "Withdraw consent", "Object"]) {
      expect(legal, `notice never mentions the right: ${right}`).toContain(right);
    }
    expect(legal).toContain("/data-rights");
  });

  it("gives the regulator route, the minors position and the breach undertaking", () => {
    expect(legal).toMatch(/SDAIA/);
    expect(legal).toMatch(/sdaia\.gov\.sa/);
    expect(legal).toMatch(/parent or guardian/i);
    // PDPL: notify SDAIA within 72 hours of becoming aware of a risky breach.
    expect(legal).toMatch(/72 hours/);
  });

  it("takes its contact address and version from the shared constants, not a literal", () => {
    expect(legal).toMatch(/from "@\/lib\/legal"/);
    for (const constant of ["PRIVACY_CONTACT_EMAIL", "PRIVACY_POLICY_VERSION"]) {
      expect(legal, `notice should use ${constant}`).toContain(constant);
    }
    // The old hard-coded address must not reappear as a literal in the notice.
    expect(legal).not.toMatch(/mailto:support@clutchmarks\.study/);
  });
});

describe("every retention period in the notice is enforced somewhere", () => {
  // Period -> the clause that has to exist in the purge job. The notice may add
  // a period without a job (account deletion is admin-driven), but a period that
  // claims a nightly purge must have one.
  const nightly: [string, RegExp][] = [
    ["30 days", /interval '30 days'/],
    ["180 days", /interval '180 days'/],
    ["24 months", /interval '24 months'/],
  ];

  it.each(nightly)("claims %s in the notice and purges it in SQL", (period, clause) => {
    expect(legal).toContain(period);
    expect(retentionMigration, `no SQL enforces the ${period} claim`).toMatch(clause);
  });

  it("schedules the purge, so the claims are not just a function nobody calls", () => {
    expect(retentionMigration).toMatch(/cron\.schedule/);
    expect(retentionMigration).toContain("purge-expired-personal-data");
  });

  it("names the 12-month audit archive the notice promises", () => {
    expect(legal).toContain("12 months");
    expect(read("supabase/migrations/20260922120000_audit_retention.sql")).toMatch(/archive_old_audit_entries/);
  });
});

describe("consent is captured, and the client cannot forge it", () => {
  it("requires the tick before the account is created", () => {
    expect(auth).toMatch(/consentAccepted/);
    expect(auth, "signup must refuse without consent").toMatch(/if \(!consentAccepted\)/);
    expect(auth).toMatch(/buildSignupConsent\(\)/);
    // Bound to the checkbox itself, not just a state variable nobody sets.
    expect(auth).toMatch(/checked=\{consentAccepted\}/);
    expect(auth).toMatch(/onCheckedChange=\{\(value\) => setConsentAccepted\(value === true\)\}/);
  });

  it("records the accepted versions server-side, in handle_new_user", () => {
    expect(consentMigration).toMatch(/consent_records/);
    expect(consentMigration).toMatch(/v_privacy_version/);
    // The insert has to live inside the auth trigger, so an account always has
    // its consent row even if the browser never returns after signup.
    const fn = consentMigration.slice(consentMigration.indexOf("CREATE OR REPLACE FUNCTION public.handle_new_user"));
    expect(fn).toMatch(/INSERT INTO public\.consent_records/);
    expect(fn).toMatch(/RETURN NEW;/);
  });

  it("does not let a browser session write or rewrite its own consent", () => {
    expect(consentMigration).toMatch(/revoke all on public\.consent_records from anon, authenticated/i);
    expect(consentMigration, "a client insert policy would make the table worthless").not.toMatch(
      /on public\.consent_records for insert/i,
    );
  });
});

describe("a reader can exercise the rights without emailing us", () => {
  it("exports the caller's own data through the scoped RPC", () => {
    expect(dataRights).toMatch(/rpc\("export_my_data"\)/);
    // SECURITY DEFINER, but scoped by auth.uid() and given no argument to point
    // elsewhere: that pairing is the whole safety argument for this function.
    expect(consentMigration).toMatch(/auth\.uid\(\)/);
    expect(consentMigration).toMatch(/revoke all on function public\.export_my_data\(\) from public, anon/i);
  });

  it("files a request and shows the reader their own", () => {
    expect(dataRights).toMatch(/from\("data_requests"\)/);
    expect(dataRights).toMatch(/\.insert\(/);
    expect(dataRights).toMatch(/\.eq\("user_id", user\.id\)/);
  });

  it("is reachable, indexable and declared in the route metadata", () => {
    expect(appRoutes).toMatch(/path="\/data-rights"/);
    expect(seoRoutes).toContain('path: "/data-rights"');
    expect(appRoutes).toMatch(/path="\/admin\/data-requests"/);
  });
});

describe("the analytics promise is a switch, not just a paragraph", () => {
  it("discloses analytics and points at the opt-out", () => {
    expect(legal).toMatch(/cookie-free/);
    expect(legal).toMatch(/data rights page/);
  });

  it("honours the choice before the analytics script is fetched", () => {
    const plugin = read("plugins/inject-analytics.ts");
    const choice = read("frontend/src/lib/analyticsOptOut.ts");
    const key = /ANALYTICS_OPT_OUT_KEY = "([^"]+)"/.exec(choice)?.[1];
    expect(key, "the opt-out key has no literal value").toBeTruthy();
    // The gate is build-side and runs before React, so it carries the literal —
    // this assertion is what keeps the two copies from drifting.
    expect(plugin).toContain(key as string);
    expect(plugin).toMatch(/createElement\("script"\)/);
  });
});
