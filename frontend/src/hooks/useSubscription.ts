// Subscription state for the signed-in user. Admins always have full access.
// Free plan = a small preview of EVERY level (not the whole of IGCSE); paid unlocks
// everything. Free previews are enforced client-side on non-premium content
// surfaces (Subject page lists) and server-side by RLS on premium tables.
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { retrySupabase } from "@/lib/net";

/** How many items per list a free (non-paying) user may open, per subject-level. */
export const FREE_PREVIEW_LIMIT = 2;

export type PlanState = {
  loading: boolean;
  planId: string; // "free" | "monthly" | "quarterly" | "annual"
  hasPaid: boolean; // true when an active paid subscription exists
  refresh: () => void;
};

type SubRow = { plan_id: string; status: string; ends_at: string | null };

// A page easily mounts half a dozen gated components (lists, banners, dialogs),
// and each one used to fire its own identical `subscriptions` query on mount.
// Share one in-flight request per user and reuse a fresh result for 30s, so a
// page load costs one round trip instead of N. Single-user app: one slot is
// enough, keyed by user id.
const SUB_TTL_MS = 30_000;
let subCache: { userId: string; at: number; row: SubRow | null } | null = null;
let subInflight: { userId: string; promise: Promise<SubRow | null> } | null = null;

function loadSubscriptionRow(userId: string): Promise<SubRow | null> {
  if (subCache && subCache.userId === userId && Date.now() - subCache.at < SUB_TTL_MS) {
    return Promise.resolve(subCache.row);
  }
  if (subInflight && subInflight.userId === userId) return subInflight.promise;
  const promise = retrySupabase(() =>
    supabase
      .from("subscriptions")
      .select("plan_id, status, ends_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(1),
  ).then(({ data }) => {
    const row = (data?.[0] ?? null) as SubRow | null;
    subCache = { userId, at: Date.now(), row };
    if (subInflight?.promise === promise) subInflight = null;
    return row;
  }).catch((error) => {
    // Fail to the free plan rather than to an endless spinner; `refresh()`
    // (and any remount) retries.
    console.error("Could not load subscription:", error);
    if (subInflight?.promise === promise) subInflight = null;
    return null;
  });
  subInflight = { userId, promise };
  return promise;
}

export function useSubscription(): PlanState {
  const { user, role } = useAuth();
  const [loading, setLoading] = useState(true);
  const [planId, setPlanId] = useState("free");
  const [hasPaid, setHasPaid] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!user || role === "admin") { setLoading(false); return; }
    let cancelled = false;
    setLoading(true);
    // As with subject picks, `loading` must settle either way or a single
    // dropped request pins the plan gate open forever.
    loadSubscriptionRow(user.id)
      .then((sub) => {
        if (cancelled) return;
        const active = !!sub && sub.status === "active" && (!sub.ends_at || new Date(sub.ends_at) > new Date());
        setPlanId(active ? sub!.plan_id : "free");
        setHasPaid(active);
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
  return { loading, planId, hasPaid, refresh };
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
