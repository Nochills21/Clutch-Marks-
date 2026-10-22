// Auth context: Supabase session, role (admin/student/parent), approval state,
// and the admin-only student-preview mode. Every gated component consumes this.
import { createContext, useCallback, useContext, useEffect, useRef, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { retrySupabase } from "@/lib/net";
import { readAssurance, type AssuranceLevel } from "@/lib/mfa";
import type { User, Session } from "@supabase/supabase-js";
import { useSyncExternalStore } from "react";

type AppRole = "admin" | "student" | "parent";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  role: AppRole | null;
  /**
   * What this session has proved: "aal2" only after a verified second factor.
   * The dashboard and student pages do not care; the admin console and every
   * admin write do — the database refuses them at AAL1 (public.is_admin).
   */
  aal: AssuranceLevel | null;
  /** Re-read the assurance level, e.g. after a TOTP code was accepted. */
  refreshAssurance: () => Promise<void>;
  loading: boolean;
  studentPreview: boolean;
  exitStudentPreview: () => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  role: null,
  aal: null,
  refreshAssurance: async () => {},
  loading: true,
  studentPreview: false,
  exitStudentPreview: () => {},
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

// Student preview is admin-only; keep a module-level guard so it can never
// leak into non-admin sessions (e.g. after sign-out on the same tab).
let previewActive = false;
const previewListeners = new Set<() => void>();

function setPreviewActive(next: boolean) {
  if (previewActive === next) return;
  previewActive = next;
  previewListeners.forEach((l) => l());
}

function subscribePreview(listener: () => void) {
  previewListeners.add(listener);
  return () => {
    previewListeners.delete(listener);
  };
}

export function useStudentPreviewActive(): boolean {
  return useSyncExternalStore(subscribePreview, () => previewActive, () => false);
}

export function enterStudentPreview() {
  setPreviewActive(true);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<AppRole | null>(null);
  const [aal, setAal] = useState<AssuranceLevel | null>(null);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [roleLoading, setRoleLoading] = useState(false);

  // Both `getSession()` and `onAuthStateChange` report the same signed-in user
  // on boot, which used to fire three identical `user_roles` queries per page
  // load. Coalesce them onto one in-flight request per user.
  const roleRequest = useRef<{ userId: string; promise: Promise<void> } | null>(null);

  // AAL comes from the access token's own claim, so reading it is a local decode
  // rather than a round trip; it changes on sign-in and when a code is verified.
  const refreshAssurance = useCallback(async () => {
    const { currentLevel } = await readAssurance();
    setAal(currentLevel);
  }, []);

  const fetchRole = useCallback((userId: string): Promise<void> => {
    if (roleRequest.current?.userId === userId) return roleRequest.current.promise;

    const promise = (async () => {
      setRoleLoading(true);
      try {
        // A transient blip must not silently demote an admin to a student.
        //
        // Read every row rather than one: `user_roles`' primary key is `id`, not
        // `user_id`, so an account granted admin by SQL still carries the student
        // row the signup trigger wrote. `maybeSingle()` answers that with 406 and
        // null data, which hid the console from exactly the account that owns it.
        // Admin wins, then parent, then student.
        const { data } = await retrySupabase(() =>
          supabase.from("user_roles").select("role").eq("user_id", userId),
        );
        const roles = (data ?? []).map((row) => row.role as AppRole);
        setRole(
          roles.includes("admin")
            ? "admin"
            : roles.includes("parent")
              ? "parent"
              : roles.includes("student")
                ? "student"
                : null,
        );
      } catch (error) {
        console.error("auth: could not load role", error);
        setRole(null);
        // Drop the cache so a later auth event can retry instead of inheriting
        // this failed lookup for the rest of the session.
        roleRequest.current = null;
      } finally {
        setRoleLoading(false);
      }
    })();

    roleRequest.current = { userId, promise };
    return promise;
  }, []);

  useEffect(() => {
    let active = true;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!active) return;
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          // Deferred: awaiting a query inside the auth callback can deadlock the
          // GoTrue client while it still holds its lock.
          //
          // Only raise the loading flag when this call will actually run a
          // query. `getSession()` normally resolves first and already looked the
          // role up, so `fetchRole` below returns the cached promise and clears
          // nothing — raising the flag here left `roleLoading` true forever and
          // pinned every AppLayout route behind the "Loading..." spinner. That
          // hang was race-dependent, so it only hit some loads.
          setTimeout(() => {
            if (!active) return;
            if (roleRequest.current?.userId !== session.user!.id) setRoleLoading(true);
            fetchRole(session.user!.id);
          }, 0);
          void refreshAssurance();
        } else {
          roleRequest.current = null;
          setRole(null);
          setAal(null);
          setRoleLoading(false);
        }
        setSessionLoading(false);
      }
    );

    // Retry the restore: without this, a single dropped packet made the app
    // treat a signed-in student as signed out. The promise ALWAYS settles, so
    // `sessionLoading` can no longer stay true and pin the whole app behind a
    // spinner forever.
    // `retrySupabase` retries a transient failure (which resolves with `error`)
    // and passes a definitive one through, so only a rejected token reaches the
    // branch below.
    retrySupabase(() => supabase.auth.getSession(), { attempts: 3 })
      .then(async ({ data, error }) => {
        if (!active) return;
        // A refresh token the server rejects (revoked, expired, or left over from
        // an old project) comes back as `error`. Keeping it means every visit
        // replays the same failing refresh, so clear the local copy.
        if (error) {
          await supabase.auth.signOut({ scope: "local" }).catch(() => {});
          if (!active) return;
        }
        const session = error ? null : data?.session ?? null;
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchRole(session.user.id);
          void refreshAssurance();
        }
      })
      .catch((error) => {
        console.error("auth: could not restore session", error);
      })
      .finally(() => {
        if (active) setSessionLoading(false);
      });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [fetchRole, refreshAssurance]);

  // Kill preview mode whenever the signed-in user changes or signs out.
  useEffect(() => {
    setPreviewActive(false);
  }, [user?.id]);

  const signOut = async () => {
    setPreviewActive(false);
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setRole(null);
    setAal(null);
  };

  const loading = sessionLoading || (!!user && roleLoading);
  const isAdmin = role === "admin";
  // Subscribe so the provider re-renders when the module-level flag flips.
  const previewOn = useSyncExternalStore(subscribePreview, () => previewActive, () => false);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        // Student preview: an admin can browse exactly what a student sees.
        // RLS still runs as the admin behind the scenes — this is UI-only,
        // so nothing privileged is ever exposed.
        role: isAdmin && previewOn ? "student" : role,
        aal,
        refreshAssurance,
        studentPreview: isAdmin && previewOn,
        exitStudentPreview: () => setPreviewActive(false),
        loading,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
