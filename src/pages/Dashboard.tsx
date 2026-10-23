// Role router: renders the student/admin/parent dashboard.
import { useAuth } from "@/lib/auth";
import { SEOHead } from "@/components/SEOHead";
import { StudentDashboard } from "@/components/dashboards/StudentDashboard";
import { AdminDashboard } from "@/components/dashboards/AdminDashboard";
import { ParentDashboard } from "@/components/dashboards/ParentDashboard";

export default function Dashboard() {
  const { role, aal } = useAuth();

  // The admin home reads platform-wide figures, and the database refuses those at
  // AAL1 — so render the student view there rather than a wall of zeros. An admin
  // who is one code away from the console gets a working dashboard, and the
  // console itself explains what to do (see AdminRoute / TwoFactor MfaGate).
  if (role === "admin" && aal === "aal2") {
    return <><SEOHead path="/dashboard" /><AdminDashboard /></>;
  }
  if (role === "parent") return <><SEOHead path="/dashboard" /><ParentDashboard /></>;
  return <><SEOHead path="/dashboard" /><StudentDashboard /></>;
}
