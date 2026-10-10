// The reader's analytics choice, in one place.
//
// Analytics here is aggregate and cookie-free, but it is still processing
// personal data, so the privacy notice promises an opt-out and this is it. The
// key below is read by the build-time gate in plugins/inject-analytics.ts
// *before* the analytics script is fetched — opting out has to stop the script
// load, not just silence our own events, or the page view is still reported.
//
// Because the gate runs in <head> before React exists, a change made here takes
// effect on the next page load; the caller reloads (see /data-rights).
import { useCallback, useEffect, useState } from "react";

/**
 * localStorage key. The gate in plugins/inject-analytics.ts carries the same
 * literal, and analyticsOptOut.test.ts fails if the two ever drift apart.
 */
export const ANALYTICS_OPT_OUT_KEY = "cm-analytics-optout";

function readChoice(): boolean {
  try {
    return localStorage.getItem(ANALYTICS_OPT_OUT_KEY) === "1";
  } catch {
    // Private mode, or storage blocked: nothing can be remembered, so nothing is
    // opted out of either. Report "not opted out" rather than claim a choice we
    // would not be able to honour on the next load.
    return false;
  }
}

export function isAnalyticsOptedOut(): boolean {
  if (typeof window === "undefined") return false;
  return readChoice();
}

export function setAnalyticsOptedOut(optedOut: boolean): void {
  if (typeof window === "undefined") return;
  try {
    if (optedOut) localStorage.setItem(ANALYTICS_OPT_OUT_KEY, "1");
    else localStorage.removeItem(ANALYTICS_OPT_OUT_KEY);
  } catch {
    // Not fatal: the run continues, the choice simply will not survive the reload.
  }
}

/**
 * The choice as React state, for the page that offers it. `setOptedOut` writes
 * through to storage immediately so the next load picks it up.
 */
export function useAnalyticsOptOut(): {
  optedOut: boolean;
  setOptedOut: (value: boolean) => void;
} {
  const [optedOut, setState] = useState<boolean>(readChoice);

  // Re-read after mount: another tab may have changed it, and the first render
  // happened before the reader could have clicked anything.
  useEffect(() => {
    setState(readChoice());
  }, []);

  const setOptedOut = useCallback((value: boolean) => {
    setAnalyticsOptedOut(value);
    setState(value);
  }, []);

  return { optedOut, setOptedOut };
}
