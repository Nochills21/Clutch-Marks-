// Auth context: Supabase session, role (admin/student/parent), approval state,
// and the admin-only student-preview mode. Every gated component consumes this.
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
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

  const fetchRole = async (userId: string) => {
    setRoleLoading(true);
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role, is_approved")
        .eq("user_id", userId)
        .maybeSingle();
      if (error) throw error;
      if (data) {
        setRole(data.role as AppRole);
        setIsApproved(data.is_approved ?? false);
      } else {
        setRole(null);
        setIsApproved(false);
      }
    } catch {
      // Offline / network failure: keep any previously-known role instead of
      // downgrading a signed-in user to "no role" (which would lock the UI).
      // The role refreshes on the next auth event or reload.
    } finally {
      setRoleLoading(false);
    }
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          setRoleLoading(true);
          setTimeout(() => fetchRole(session.user.id), 0);
        } else {
          setRole(null);
          setIsApproved(false);
          setRoleLoading(false);
        }
        setSessionLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        setRoleLoading(true);
        fetchRole(session.user.id);
      }
      setSessionLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

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
