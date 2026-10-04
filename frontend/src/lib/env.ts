// Build-time configuration, read and validated in one place.
//
// Previously each module read `import.meta.env` itself, so a missing variable
// produced `createClient(undefined, undefined)` and a URL of
// `"undefined/functions/v1/serve-material"` — every request failed with a
// cryptic message and nothing said why. Missing configuration is now collected
// here and surfaced as a blocking, explicit screen (see `src/main.tsx`).
//
// This module must never throw: it is imported by the Supabase client on the
// app's critical path, and a throw here would fail module evaluation before any
// error boundary could render.

function read(name: string, value: unknown): string {
  const text = typeof value === "string" ? value.trim() : "";
  if (!text) ENV_PROBLEMS.push(name);
  return text;
}

export const ENV_PROBLEMS: string[] = [];

export const SUPABASE_URL = read("VITE_SUPABASE_URL", import.meta.env.VITE_SUPABASE_URL);
export const SUPABASE_KEY = read(
  "VITE_SUPABASE_PUBLISHABLE_KEY",
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
);

/** Placeholders keep `createClient` constructible when config is missing. */
export const SUPABASE_URL_SAFE = SUPABASE_URL || "http://127.0.0.1:54321";
export const SUPABASE_KEY_SAFE = SUPABASE_KEY || "missing-anon-key";

/** Public origin, no trailing slash. */
export const SITE_URL = (
  (import.meta.env.VITE_SITE_URL as string | undefined)?.trim() || "https://clutchmarks.study"
).replace(/\/+$/, "");

export const PLAUSIBLE_DOMAIN = (import.meta.env.VITE_PLAUSIBLE_DOMAIN as string | undefined)?.trim() || "";

/** True when every variable the app cannot run without is present. */
export const isConfigured = ENV_PROBLEMS.length === 0;

/** Human-readable summary used by the configuration-error screen. */
export function describeConfigProblems(): string {
  return (
    `This build is missing required configuration: ${ENV_PROBLEMS.join(", ")}. ` +
    "Set these as build environment variables (see .env.example) and redeploy."
  );
}
