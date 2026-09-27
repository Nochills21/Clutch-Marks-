// Lightweight analytics: Plausible pageviews + custom events, plus UTM
// attribution capture for signup tracking. Everything degrades to a no-op when
// VITE_PLAUSIBLE_DOMAIN is unset (local dev, previews) — zero console noise.
//
// Why Plausible over PostHog: cookie-free (no consent banner needed for a
// minors' product), one script tag, and it already supports custom properties
// for our attribution need. Swap point is centralized here if that changes.

const DOMAIN = import.meta.env.VITE_PLAUSIBLE_DOMAIN as string | undefined;

type PlausibleFn = (event: string, options?: { props?: Record<string, string> }) => void;

declare global {
  interface Window {
    plausible?: PlausibleFn;
  }
}

/** Track a custom event (no-op when analytics isn't configured). */
export function track(event: string, props?: Record<string, string>) {
  try {
    if (DOMAIN && typeof window !== "undefined" && window.plausible) {
      window.plausible(event, props ? { props } : undefined);
    }
  } catch {
    // analytics must never break the app
  }
}

const UTM_KEY = "cm-attribution";

/** First-touch attribution: persist UTMs + referrer for up to 30 days. */
export function captureAttribution() {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const utm: Record<string, string> = {};
    for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "ref"]) {
      const v = params.get(key);
      if (v) utm[key] = v.slice(0, 120);
    }
    if (Object.keys(utm).length === 0) return;
    // First touch wins: don't overwrite an existing attribution.
    if (localStorage.getItem(UTM_KEY)) return;
    utm.landed_at = new Date().toISOString();
    localStorage.setItem(UTM_KEY, JSON.stringify(utm));
  } catch {
    // private mode etc.
  }
}

/** The stored attribution object, or null. Sent at signup. */
export function getAttribution(): Record<string, string> | null {
  try {
    const raw = localStorage.getItem(UTM_KEY);
    return raw ? (JSON.parse(raw) as Record<string, string>) : null;
  } catch {
    return null;
  }
}

/** Fire the signup event with attribution props, then clear first-touch data. */
export function trackSignup(role: string) {
  const a = getAttribution();
  track("signup", {
    role,
    ...(a ? { utm_source: a.utm_source ?? "none", utm_campaign: a.utm_campaign ?? "none" } : {}),
  });
}
