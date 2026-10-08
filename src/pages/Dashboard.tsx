// Role router: renders the student/admin/parent dashboard.
import { useAuth } from "@/lib/auth";
import { SEOHead } from "@/components/SEOHead";
import { StudentDashboard } from "@/components/dashboards/StudentDashboard";
import { AdminDashboard } from "@/components/dashboards/AdminDashboard";
import { ParentDashboard } from "@/components/dashboards/ParentDashboard";

export default function Dashboard() {
  const { role } = useAuth();

  if (role === "admin") return <><SEOHead path="/dashboard" /><AdminDashboard /></>;
  if (role === "parent") return <><SEOHead path="/dashboard" /><ParentDashboard /></>;
  return <><SEOHead path="/dashboard" /><StudentDashboard /></>;
}
