// Subscription state for the signed-in user. Admins always have full access.
// Free plan = a small preview of EVERY level (not the whole of IGCSE); paid unlocks
// everything. Free previews are enforced client-side on non-premium content
// surfaces (Subject page lists) and server-side by RLS on premium tables.
//
// The rules themselves live in `lib/subscriptionState.ts`: this hook only loads
// the rows and hands them over, so "can this account open the portal?" has one
// answer rather than one per page.
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { retrySupabase } from "@/lib/net";
import {
  ACTIVE_SUB_STATUSES,
  deriveSubscriptionState,
  type SubscriptionRow,
  type SubscriptionState,
} from "@/lib/subscriptionState";

/** How many items per list a free (non-paying) user may open, per subject-level. */
export const FREE_PREVIEW_LIMIT = 2;

export type PlanState = SubscriptionState & {
  loading: boolean;
  refresh: () => void;
};

export { ACTIVE_SUB_STATUSES };

type SubRow = SubscriptionRow;

// A page easily mounts half a dozen gated components (lists, banners, dialogs),
// and each one used to fire its own identical `subscriptions` query on mount.
// Share one in-flight request per user and reuse a fresh result for 30s, so a
// page load costs one round trip instead of N. Single-user app: one slot is
// enough, keyed by user id.
const SUB_TTL_MS = 30_000;
let subCache: { userId: string; at: number; rows: SubRow[] } | null = null;
let subInflight: { userId: string; promise: Promise<SubRow[]> } | null = null;

function loadSubscriptionRows(userId: string): Promise<SubRow[]> {
  if (subCache && subCache.userId === userId && Date.now() - subCache.at < SUB_TTL_MS) {
    return Promise.resolve(subCache.rows);
  }
  if (subInflight && subInflight.userId === userId) return subInflight.promise;
  const promise = retrySupabase(() =>
    supabase
      .from("subscriptions")
      // `stripe_customer_id` / `stripe_subscription_id` are what tell a grant
      // apart from a real subscription; without them the UI cannot know whether
      // the portal would answer at all. They are the caller's own row, so the
      // existing own-row select policy covers them.
      .select("plan_id, status, ends_at, trial_ends_at, cancel_at_period_end, stripe_customer_id, stripe_subscription_id")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(20),
  ).then(({ data }) => {
    // Newest first: a live row is picked out of the whole set, so a newer
    // cancelled row cannot hide an older grant that still runs.
    const rows = (data ?? []) as SubRow[];
    subCache = { userId, at: Date.now(), rows };
    if (subInflight?.promise === promise) subInflight = null;
    return rows;
  }).catch((error) => {
    // Fail to the free plan rather than to an endless spinner; `refresh()`
    // (and any remount) retries.
    console.error("Could not load subscription:", error);
    if (subInflight?.promise === promise) subInflight = null;
    return [];
  });
  subInflight = { userId, promise };
  return promise;
}

export function useSubscription(): PlanState {
  const { user, role } = useAuth();
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState<SubscriptionState>(() => deriveSubscriptionState([]));
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!user || role === "admin") {
      setState(deriveSubscriptionState([]));
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    // As with subject picks, `loading` must settle either way or a single
    // dropped request pins the plan gate open forever.
    loadSubscriptionRows(user.id)
      .then((rows) => {
        if (!cancelled) setState(deriveSubscriptionState(rows));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [user, role, tick]);

  const refresh = useCallback(() => {
    // Bypass the shared cache so a just-completed checkout is picked up.
    subCache = null;
    subInflight = null;
    setTick(t => t + 1);
  }, []);
  return { loading, ...state, refresh };
}

/**
 * Access rules:
 *  - admins: everything.
 *  - paid: everything.
 *  - free: can browse every level, but a list shows only the first
 *    FREE_PREVIEW_LIMIT items per subject-level; the rest shows the upgrade
 *    prompt (see PreviewLimit / PlanGate components).
 */
export function usePlanAccess() {
  const { role } = useAuth();
  const { loading, hasPaid } = useSubscription();
  const fullAccess = role === "admin" || hasPaid;
  return {
    loading,
    /** Whether the given level ("ol" | "as" | "a2") is fully viewable. */
    canAccessLevel: (_level: string) => fullAccess,
    /** Whether a list at any level should show only the free preview slice. */
    isPreview: !fullAccess,
    /** How many items of a list the current user may see. */
    previewLimit: fullAccess ? Number.MAX_SAFE_INTEGER : FREE_PREVIEW_LIMIT,
    hasPaid,
  };
}
