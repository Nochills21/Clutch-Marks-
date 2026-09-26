// XP + streak state for the signed-in student. Reads the server-side summary
// (my_xp_summary RPC) so caps/dedupe stay authoritative in the DB.
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

export type XpSummary = {
  xp_all_time: number;
  xp_today: number;
  xp_30d: number;
  caps_used: Record<string, number> | null;
  streak: number;
  longest_streak: number;
};

export function useXP() {
  const { user, role } = useAuth();
  const [summary, setSummary] = useState<XpSummary | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!user || role === "admin") {
      setSummary(null);
      setLoading(false);
      return;
    }
    try {
      const { data, error } = await supabase.rpc("my_xp_summary");
      if (!error && data) setSummary(data as unknown as XpSummary);
    } catch {
      // Offline: keep the last known summary; never leave `loading` stuck.
    } finally {
      setLoading(false);
    }
  }, [user, role]);

  useEffect(() => {
    setLoading(true);
    refresh();
  }, [refresh]);

  return { summary, loading, refresh };
}
