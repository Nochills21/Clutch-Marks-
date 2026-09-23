// Subscription state for the signed-in user. Admins always have full access.
// Free plan = O Level content only; any active paid plan unlocks AS/A2.
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

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
    supabase
      .from("subscriptions")
      .select("plan_id, status, ends_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .then(({ data }) => {
        if (cancelled) return;
        const sub = data?.[0];
        const active = !!sub && sub.status === "active" && (!sub.ends_at || new Date(sub.ends_at) > new Date());
        setPlanId(active ? sub!.plan_id : "free");
        setHasPaid(active);
        setLoading(false);
      });
    return () => { cancelled = true; };
  }, [user, role, tick]);

  const refresh = useCallback(() => setTick(t => t + 1), []);
  return { loading, planId, hasPaid, refresh };
}

/** Free plan sees O Level only; paid sees everything. Admins unrestricted. */
export function usePlanAccess() {
  const { role } = useAuth();
  const { loading, hasPaid } = useSubscription();
  return {
    loading,
    /** Whether the given level ("ol" | "as" | "a2") is viewable. */
    canAccessLevel: (level: string) =>
      role === "admin" || hasPaid || level.toUpperCase() === "OL",
    hasPaid,
  };
}
