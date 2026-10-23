// Route guard for /admin: admin role *and* a second factor.
//
// The role check is the same as it always was. The AAL check is new, and it is the
// client half of a database rule: every admin policy and admin RPC now asks
// `public.is_admin()`, which is false without a verified factor. Redirecting to
// /dashboard here would hide that from the owner — they would look like a student
// with fewer pages rather than like someone one code away from the console. So the
// AAL1 case gets the gate that explains itself and offers both paths (set up, or
// enter the code).
import { Suspense, lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/lib/auth";

// The gate is lazy because it drags in the TOTP client (`@/lib/mfa` → the
// Supabase client) and a second-factor UI that only an admin at AAL1 ever sees.
// Imported eagerly it sat in the entry's module graph, so the landing page paid
// for it. Only renders below when the role and the missing factor are known.
const MfaGate = lazy(() =>
  import("@/components/TwoFactor").then((m) => ({ default: m.MfaGate })),
);

export function AdminRoute() {
  const { role, aal, loading, roleResolved } = useAuth();
  // `loading` covers the session; `roleResolved` covers the role lookup itself,
  // which starts a tick later. Without the second check a hard reload of
  // /admin/anything bounced to /dashboard before the admin row was read.
  if (loading || !roleResolved) return null;
  if (role !== "admin") return <Navigate to="/dashboard" replace />;
  // `null` means the level could not be read; treat that as "not verified" rather
  // than as permission, so a failed call cannot open the console.
  if (aal !== "aal2") {
    return (
      <Suspense fallback={null}>
        <MfaGate />
      </Suspense>
    );
  }
  return <Outlet />;
}
