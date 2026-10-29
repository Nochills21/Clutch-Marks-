// The signed-in teacher's subject, cached like the subscription rows are.
//
// A page mounts several gated components (the hub's note list and lesson list,
// the banner, the reader), and each one needs the same answer. One query per
// account, reused for a short window, keeps a teacher's page load at one extra
// request rather than one per component.
import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { retrySupabase } from "@/lib/net";
import {
  TEACHER_ROLE,
  scopeCoversLevel,
  scopeCoversSlug,
  scopeFromGrant,
  type TeacherGrantRow,
  type TeacherScope,
} from "@/lib/teacherAccess";

const TTL_MS = 30_000;

let cache: { userId: string; at: number; scope: TeacherScope | null } | null = null;
let inflight: { userId: string; promise: Promise<TeacherScope | null> } | null = null;

function loadScope(userId: string): Promise<TeacherScope | null> {
  if (cache && cache.userId === userId && Date.now() - cache.at < TTL_MS) {
    return Promise.resolve(cache.scope);
  }
  if (inflight?.userId === userId) return inflight.promise;
  const promise = retrySupabase(() =>
    supabase
      .from("teacher_subjects")
      // `subjects(...)` carries the levels, so "which of this teacher's levels
      // are open" needs no second round trip.
      .select("subject_id, subjects(id, name, slug, subject_levels(id))")
      .eq("user_id", userId)
      .maybeSingle(),
  )
    .then(({ data }) => {
      const scope = scopeFromGrant(data as unknown as TeacherGrantRow | null);
      cache = { userId, at: Date.now(), scope };
      return scope;
    })
    .catch((error) => {
      // Fail to no scope rather than to an unlocked estate: a dropped request
      // must not hand a free account the library. `refresh` (or a remount)
      // retries.
      console.error("Could not load the teacher's subject:", error);
      return null;
    })
    .finally(() => {
      if (inflight?.promise === promise) inflight = null;
    });
  inflight = { userId, promise };
  return promise;
}

export interface TeacherAccess {
  /** False for every non-teacher account, so callers can skip the question. */
  isTeacher: boolean;
  loading: boolean;
  scope: TeacherScope | null;
  subjectId: string | null;
  subjectName: string | null;
  /** Whether this subject-level is open through the grant (not through a plan). */
  coversLevel: (levelId: string | null | undefined) => boolean;
  coversSlug: (slug: string | null | undefined) => boolean;
}

export function useTeacherScope(): TeacherAccess {
  const { user, role } = useAuth();
  const isTeacher = role === TEACHER_ROLE;
  const [scope, setScope] = useState<TeacherScope | null>(null);
  const [loading, setLoading] = useState(isTeacher);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!isTeacher || !user) {
      setScope(null);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    loadScope(user.id).then((next) => {
      if (cancelled) return;
      setScope(next);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [isTeacher, user, tick]);

  // A signed-out tab must not inherit the previous teacher's scope.
  useEffect(() => {
    if (!user) {
      cache = null;
      inflight = null;
    }
  }, [user]);

  // Stable while the scope is: callers put `coversLevel` in effect dependencies,
  // and a fresh closure per render would re-fire their loads on every render.
  const coversLevel = useCallback(
    (levelId: string | null | undefined) => scopeCoversLevel(scope, levelId),
    [scope],
  );
  const coversSlug = useCallback(
    (slug: string | null | undefined) => scopeCoversSlug(scope, slug),
    [scope],
  );

  return useMemo(
    () => ({
      isTeacher,
      loading,
      scope,
      subjectId: scope?.subjectId ?? null,
      subjectName: scope?.subjectName ?? null,
      coversLevel,
      coversSlug,
    }),
    [isTeacher, loading, scope, coversLevel, coversSlug],
  );
}

/** Drop the cache, e.g. after an admin changes the grant. */
export function refreshTeacherScope(): void {
  cache = null;
  inflight = null;
}
