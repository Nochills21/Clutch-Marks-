// XP + weekly-goal state for the signed-in student. Reads the server-side
// summary (my_xp_summary RPC) so caps/dedupe/week maths stay authoritative in
// the DB. `streak` is now "days studied this week" — it can never reset to zero
// and miss a day, which is why nothing here is phrased as a loss.
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { DEFAULT_PREFS, fetchPersonalWins, type PersonalWins } from "@/lib/gamification";

export type XpSummary = {
  xp_all_time: number;
  xp_today: number;
  xp_30d: number;
  caps_used: Record<string, number> | null;
  /** Days studied this ISO week. */
  streak: number;
  /** Best number of days studied in a single week, ever. */
  longest_streak: number;
  days_this_week: number;
  /** ISO weekday numbers (1 = Mon … 7 = Sun) studied this week. */
  week_days: number[];
  weekly_goal_days: number;
  weekly_goal_met: boolean;
  session_minutes: number;
  leaderboard_visible: boolean;
  reminders_enabled: boolean;
  animations_enabled: boolean;
  encouragement_enabled: boolean;
  today_goal_met: boolean;
  today_active_session: { id: string; planned_minutes: number; started_at: string } | null;
  sessions_this_week: number;
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
    const { data, error } = await supabase.rpc("my_xp_summary");
    if (!error && data) setSummary(data as unknown as XpSummary);
    setLoading(false);
  }, [user, role]);

  useEffect(() => {
    setLoading(true);
    refresh();
  }, [refresh]);

  return { summary, loading, refresh };
}

/**
 * Recent personal wins, used only for the occasional specific line of
 * encouragement on the dashboard. Loaded once and refreshed on demand; a
 * failure is silent because it is decoration, not data the page depends on.
 */
export function usePersonalWins(enabled: boolean, days = 7) {
  const { user, role } = useAuth();
  const [wins, setWins] = useState<PersonalWins | null>(null);

  const refresh = useCallback(async () => {
    if (!enabled || !user || role === "admin") {
      setWins(null);
      return;
    }
    setWins(await fetchPersonalWins(days));
  }, [enabled, user, role, days]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { wins, refresh };
}

export { DEFAULT_PREFS };
