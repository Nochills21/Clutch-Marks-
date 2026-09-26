// Route guard: only admin role can render children.
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/lib/auth";

export function AdminRoute() {
  const { role, loading } = useAuth();
  if (loading) return null;
  if (role !== "admin") return <Navigate to="/dashboard" replace />;
  return <Outlet />;
}
