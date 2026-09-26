// Shared student subject-picker state. Returns the set of subject_level ids
// the student picked. Students with nothing picked see nothing in Lessons /
// Practice — pages show a prompt to pick subjects instead. Admins always see
// everything and never get the picker.
//
// State is module-level (single source of truth) so the picker dialog, the
// gate, and the filtered pages all observe the same picks.
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

const EMPTY = new Set<string>();
let picks: Set<string> = EMPTY; // stable reference; replaced only on change
const listeners = new Set<() => void>();

function setPicks(next: Set<string>) {
  if (next === picks) return;
  picks = next;
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => { listeners.delete(l); };
}

export function useMySubjects() {
  const { user, role } = useAuth();
  const isAdmin = role === "admin";
  const [loaded, setLoaded] = useState(picks !== EMPTY);

  useEffect(() => {
    if (!user || isAdmin) { setLoaded(true); return; }
    if (picks !== EMPTY) { setLoaded(true); return; }
    let cancelled = false;
    (async () => {
      try {
        const { data, error } = await supabase
          .from("student_subject_prefs")
          .select("subject_level_id")
          .eq("user_id", user.id);
        if (!cancelled) {
          if (!error) setPicks(new Set((data ?? []).map((r: any) => r.subject_level_id)));
          // On error (offline), keep whatever picks were known and still resolve.
          setLoaded(true);
        }
      } catch {
        // Offline / network failure: resolve so pages render instead of hanging.
        if (!cancelled) setLoaded(true);
      }
    })();
    return () => { cancelled = true; };
  }, [user, isAdmin]);

  const savePicks = async (ids: string[]) => {
    if (!user) return;
    const prev = picks;
    setPicks(new Set(ids)); // optimistic
    const del = await supabase.from("student_subject_prefs").delete().eq("user_id", user.id);
    if (del.error) { setPicks(prev); throw del.error; }
    if (ids.length) {
      const ins = await supabase.from("student_subject_prefs").insert(ids.map(id => ({ user_id: user.id, subject_level_id: id })));
      if (ins.error) { setPicks(prev); throw ins.error; }
    }
  };

  return { pickedIds: picks, loaded, isAdmin, savePicks };
}
