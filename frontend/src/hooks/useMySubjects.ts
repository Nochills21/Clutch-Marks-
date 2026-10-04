// Shared student subject-picker state. Returns the set of subject_level ids
// the student picked. Students with nothing picked see nothing in Lessons /
// Practice — pages show a prompt to pick subjects instead. Admins always see
// everything and never get the picker.
//
// State is module-level (single source of truth) so the picker dialog, the
// gate, and the filtered pages all observe the same picks.
import { useEffect, useState, useSyncExternalStore } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { retrySupabase } from "@/lib/net";
import { diffPicks } from "@/lib/subjectPicks";

const EMPTY = new Set<string>();
let picks: Set<string> = EMPTY; // stable reference; replaced only on change
const listeners = new Set<() => void>();

// Which account the module-level `picks` belong to. Module state outlives a
// sign-out, so without this a second student signing in on the same tab kept
// the first student's filters — and a student who had picked nothing would see
// the previous account's content.
let picksOwner: string | null = null;

function setPicks(next: Set<string>) {
  if (next === picks) return;
  picks = next;
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => { listeners.delete(l); };
}

/** Drop cached picks when the signed-in account changes. Returns true if reset. */
function claimFor(userId: string | null): boolean {
  if (picksOwner === userId) return false;
  picksOwner = userId;
  setPicks(EMPTY);
  return true;
}

export function useMySubjects() {
  const { user, role } = useAuth();
  const isAdmin = role === "admin";

  // Subscribe to the module store instead of reading `picks` during render.
  // `setPicks` already notified `listeners`, but nothing ever registered one,
  // so a component that had already mounted kept rendering the selection it
  // first saw. That is how the filter notice could claim "7 hidden" while the
  // page beside it had just accepted a new subject: different components
  // disagreed about the same state.
  const picked = useSyncExternalStore(subscribe, () => picks, () => EMPTY);
  const [loaded, setLoaded] = useState(picked !== EMPTY);

  useEffect(() => {
    const switchedAccount = claimFor(user?.id ?? null);
    if (switchedAccount) setLoaded(false);

    if (!user || isAdmin) { setLoaded(true); return; }
    if (!switchedAccount && picked !== EMPTY) { setLoaded(true); return; }
    let cancelled = false;
    // `loaded` MUST settle on every path. Every gated page (Lessons, Practice,
    // Flashcards, Past Papers) renders a spinner while it is false, so before
    // this the lack of a `.catch` meant one dropped request left the student on
    // a spinner permanently, with no error and no way to retry.
    retrySupabase(() =>
      supabase
        .from("student_subject_prefs")
        .select("subject_level_id")
        .eq("user_id", user.id),
    )
      .then(({ data }) => {
        if (cancelled) return;
        setPicks(new Set((data ?? []).map((r: any) => r.subject_level_id)));
      })
      .catch((error) => {
        // Recoverable: leaving `picks` empty shows the subject picker, and
        // navigating anywhere refetches because `picks` is still EMPTY.
        console.error("Could not load subject picks:", error);
      })
      .finally(() => {
        if (!cancelled) setLoaded(true);
      });
    return () => { cancelled = true; };
  }, [user, isAdmin, picked]);

  /**
   * Replace this student's picks.
   *
   * Previously this deleted every row and then inserted the new set. If the
   * insert failed — a dropped request was enough — the delete had already
   * committed, so the student's picks were wiped and every page fell back to
   * "pick your subjects". Now only the deselected rows are removed and the
   * selected ones are upserted, so a failure leaves the previous state intact
   * and never widens or narrows what they can see.
   */
  const savePicks = async (ids: string[]) => {
    if (!user) return;
    // Read the live module value, not this render's snapshot, so a rapid
    // second call diffs against the first call's optimistic result.
    const prev = picks;
    const next = new Set(ids);
    setPicks(next); // optimistic — every page re-filters immediately
    const { add, remove } = diffPicks(prev, next);
    try {
      // Additions first: if the write is interrupted, the student has extra
      // subjects visible rather than losing the ones they already had.
      if (add.length) {
        const { error } = await supabase
          .from("student_subject_prefs")
          .upsert(
            add.map((id) => ({ user_id: user.id, subject_level_id: id })),
            { onConflict: "user_id,subject_level_id", ignoreDuplicates: true },
          );
        if (error) throw error;
      }
      if (remove.length) {
        const { error } = await supabase
          .from("student_subject_prefs")
          .delete()
          .eq("user_id", user.id)
          .in("subject_level_id", remove);
        if (error) throw error;
      }
    } catch (error) {
      setPicks(prev); // roll the optimistic update back
      throw error;
    }
  };

  return { pickedIds: picked, loaded, isAdmin, savePicks };
}
