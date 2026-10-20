// Route guard: personal pages require a signed-in account; a signed-out
// visitor is redirected to /auth. There is no approval wait — accounts are
// approved automatically at signup (handle_new_user), and paid features are
// gated server-side by has_active_plan, not here.
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";

export function ApprovalGate() {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/auth" replace />;

  return <Outlet />;
}
