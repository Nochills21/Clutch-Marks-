// The rule that decides whether a page load may fetch the Supabase client.
//
// It is worth its own suite because it is the whole "the landing page must not
// download 173 kB to show a headline" guarantee: the provider, the picker and
// the auth bootstrap all defer on this one answer, and a careless `true` here
// silently puts the client back on the critical path.
import { beforeEach, describe, expect, it } from "vitest";
import {
  hasStoredSession,
  isPublicContentPath,
  isSignedOutOkPath,
  shouldBootstrapAuth,
} from "./authBootstrap";

// The shape @supabase/supabase-js writes: `sb-<project-ref>-auth-token`.
const SESSION_KEY = "sb-zzliiazovezhxbmfeqco-auth-token";

beforeEach(() => localStorage.clear());

describe("hasStoredSession", () => {
  it("is false on a clean browser", () => {
    expect(hasStoredSession()).toBe(false);
  });

  it("recognises the key the client actually writes", () => {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ access_token: "x" }));
    expect(hasStoredSession()).toBe(true);
  });

  it("ignores unrelated storage, including the app's own keys", () => {
    localStorage.setItem("clutchmarks.formula-unlock", "a@b.com");
    localStorage.setItem("theme", "dark");
    expect(hasStoredSession()).toBe(false);
  });

  it("tolerates storage that is missing or throws", () => {
    // Safari in private mode throws on access, not just on write.
    expect(hasStoredSession(null)).toBe(false);
    const hostile = {
      get length(): number {
        throw new Error("SecurityError");
      },
      key: () => null,
    } as unknown as Storage;
    expect(hasStoredSession(hostile)).toBe(false);
  });
});

describe("public routes", () => {
  it("knows the pages whose content is readable without an account", () => {
    for (const path of [
      "/subjects",
      "/lessons",
      "/notes",
      "/notes/8b1c",
      "/quizzes",
      "/past-papers",
      "/study/mathematics",
      "/study/chemistry/as/titration/notes",
    ]) {
      expect(isPublicContentPath(path), path).toBe(true);
      expect(isSignedOutOkPath(path), path).toBe(true);
    }
  });

  it("does not treat account pages as public", () => {
    for (const path of ["/dashboard", "/practice", "/settings", "/admin/users", "/auth", "/mastery"]) {
      expect(isPublicContentPath(path), path).toBe(false);
      expect(isSignedOutOkPath(path), path).toBe(false);
    }
  });

  it("covers the marketing pages, which render their own signed-out chrome", () => {
    for (const path of ["/", "/pricing", "/privacy", "/terms", "/data-rights", "/downloads", "/pricing/"]) {
      expect(isSignedOutOkPath(path), path).toBe(true);
    }
  });

  it("does not let a prefix match a sibling route", () => {
    // "/study/" must not make "/studying" public, and "/notes" must not make
    // "/noteworthy" public.
    expect(isPublicContentPath("/studying")).toBe(false);
    expect(isPublicContentPath("/noteworthy")).toBe(false);
    expect(isPublicContentPath("/past-papers-archive")).toBe(false);
  });
});

describe("shouldBootstrapAuth", () => {
  it("stays off for an anonymous visitor on the landing page", () => {
    // The whole point: `/` renders the same signed in or out.
    expect(shouldBootstrapAuth("/")).toBe(false);
    expect(shouldBootstrapAuth("/pricing")).toBe(false);
    expect(shouldBootstrapAuth("/study/mathematics/ol")).toBe(false);
  });

  it("boots when the page needs to know who is signed in", () => {
    expect(shouldBootstrapAuth("/dashboard")).toBe(true);
    expect(shouldBootstrapAuth("/auth")).toBe(true);
    expect(shouldBootstrapAuth("/admin/content-integrity")).toBe(true);
  });

  it("boots for an unknown route rather than guessing", () => {
    // A 404 is not worth optimising, and the router may yet send it somewhere
    // that does need a session.
    expect(shouldBootstrapAuth("/no-such-page")).toBe(true);
  });

  it("boots on a public page when a session is already stored", () => {
    // The landing page's subject picker reads the signed-in student's picks, so
    // a returning student must still get their session there.
    localStorage.setItem(SESSION_KEY, JSON.stringify({ access_token: "x" }));
    expect(shouldBootstrapAuth("/")).toBe(true);
    expect(shouldBootstrapAuth("/notes")).toBe(true);
  });
});
