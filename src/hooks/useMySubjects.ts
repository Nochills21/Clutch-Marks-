// Shared student subject-picker state. Returns the set of subject_level ids the
// student picked. loaded=true + empty set means "actively picked nothing" —
// callers may then decide to show everything (first-visit) or hide all.
// Admins always see everything.
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

export function useMySubjects() {
  const { user, role } = useAuth();
  const [pickedIds, setPickedIds] = useState<Set<string>>(new Set());
  const [loaded, setLoaded] = useState(false);
  const isAdmin = role === "admin";

  useEffect(() => {
    if (!user || isAdmin) { setLoaded(true); return; }
    let cancelled = false;
    supabase
      .from("student_subject_prefs")
      .select("subject_level_id")
      .eq("user_id", user.id)
      .then(({ data }) => {
        if (!cancelled) {
          setPickedIds(new Set((data ?? []).map((r: any) => r.subject_level_id)));
          setLoaded(true);
        }
      });
    return () => { cancelled = true; };
  }, [user, isAdmin]);

  const savePicks = async (ids: string[]) => {
    if (!user) return;
    setPickedIds(new Set(ids));
    const del = await supabase.from("student_subject_prefs").delete().eq("user_id", user.id);
    if (del.error) throw del.error;
    if (ids.length) {
      const ins = await supabase.from("student_subject_prefs").insert(ids.map(id => ({ user_id: user.id, subject_level_id: id })));
      if (ins.error) throw ins.error;
    }
  };

  return { pickedIds, loaded, isAdmin, savePicks };
}
