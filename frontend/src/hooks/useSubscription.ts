// Subscription state for the signed-in user. Admins always have full access.
// Free plan = a small preview of EVERY level (not all of O Level); paid unlocks
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
    retrySupabase(() =>
      supabase
        .from("subscriptions")
        .select("plan_id, status, ends_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1),
    )
      .then(({ data }) => {
        if (cancelled) return;
        const sub = data?.[0];
        const active = !!sub && sub.status === "active" && (!sub.ends_at || new Date(sub.ends_at) > new Date());
        setPlanId(active ? sub!.plan_id : "free");
        setHasPaid(active);
      })
      .catch((error) => {
        // Fail to the free plan rather than to an endless spinner; `refresh()`
        // (and any remount) retries.
        console.error("Could not load subscription:", error);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [user, role, tick]);

  const refresh = useCallback(() => setTick(t => t + 1), []);
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
