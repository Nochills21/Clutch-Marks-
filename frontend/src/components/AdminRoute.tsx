// Route guard for /admin: admin role *and* a second factor.
//
// The role check is the same as it always was. The AAL check is new, and it is the
// client half of a database rule: every admin policy and admin RPC now asks
// `public.is_admin()`, which is false without a verified factor. Redirecting to
// /dashboard here would hide that from the owner — they would look like a student
// with fewer pages rather than like someone one code away from the console. So the
// AAL1 case gets the gate that explains itself and offers both paths (set up, or
// enter the code).
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { MfaGate } from "@/components/TwoFactor";

export function AdminRoute() {
  const { role, aal, loading } = useAuth();
  if (loading) return null;
  if (role !== "admin") return <Navigate to="/dashboard" replace />;
  // `null` means the level could not be read; treat that as "not verified" rather
  // than as permission, so a failed call cannot open the console.
  if (aal !== "aal2") return <MfaGate />;
  return <Outlet />;
}
