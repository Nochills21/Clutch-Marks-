// Auth context: Supabase session, role (admin/student/parent), approval state,
// and the admin-only student-preview mode. Every gated component consumes this.
import { createContext, useCallback, useContext, useEffect, useRef, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { retrySupabase, withRetry } from "@/lib/net";
import type { User, Session } from "@supabase/supabase-js";
import { useSyncExternalStore } from "react";

type AppRole = "admin" | "student" | "parent";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  role: AppRole | null;
  isApproved: boolean;
  loading: boolean;
  studentPreview: boolean;
  exitStudentPreview: () => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  role: null,
  isApproved: false,
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
  const [isApproved, setIsApproved] = useState(false);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [roleLoading, setRoleLoading] = useState(false);

  // Both `getSession()` and `onAuthStateChange` report the same signed-in user
  // on boot, which used to fire three identical `user_roles` queries per page
  // load. Coalesce them onto one in-flight request per user.
  const roleRequest = useRef<{ userId: string; promise: Promise<void> } | null>(null);

  const fetchRole = useCallback((userId: string): Promise<void> => {
    if (roleRequest.current?.userId === userId) return roleRequest.current.promise;

    const promise = (async () => {
      setRoleLoading(true);
      try {
        // A transient blip must not silently demote an admin to a student.
        const { data } = await retrySupabase(() =>
          supabase
            .from("user_roles")
            .select("role, is_approved")
            .eq("user_id", userId)
            .maybeSingle(),
        );
        if (data) {
          setRole(data.role as AppRole);
          setIsApproved(data.is_approved ?? false);
        } else {
          setRole(null);
          setIsApproved(false);
        }
      } catch (error) {
        console.error("auth: could not load role", error);
        setRole(null);
        setIsApproved(false);
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
        } else {
          roleRequest.current = null;
          setRole(null);
          setIsApproved(false);
          setRoleLoading(false);
        }
        setSessionLoading(false);
      }
    );

    // Retry the restore: without this, a single dropped packet made the app
    // treat a signed-in student as signed out. The promise ALWAYS settles, so
    // `sessionLoading` can no longer stay true and pin the whole app behind a
    // spinner forever.
    withRetry(() => supabase.auth.getSession(), { attempts: 3 })
      .then(({ data }) => {
        if (!active) return;
        const session = data?.session ?? null;
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) fetchRole(session.user.id);
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
  }, [fetchRole]);

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
    setIsApproved(false);
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
        isApproved: isAdmin && previewOn ? true : isApproved,
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
