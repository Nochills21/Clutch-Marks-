import { useAuth } from "@/lib/auth";
import { SEOHead } from "@/components/SEOHead";
import { StudentDashboard } from "@/components/dashboards/StudentDashboard";
import { AdminDashboard } from "@/components/dashboards/AdminDashboard";
import { ParentDashboard } from "@/components/dashboards/ParentDashboard";

export default function Dashboard() {
  const { role } = useAuth();

  if (role === "admin") return <><SEOHead title="Dashboard — Clutch Marks" description="View your learning progress, upcoming tasks, and performance analytics at a glance." path="/dashboard" /><AdminDashboard /></>;
  if (role === "parent") return <><SEOHead title="Dashboard — Clutch Marks" description="View your learning progress, upcoming tasks, and performance analytics at a glance." path="/dashboard" /><ParentDashboard /></>;
  return <><SEOHead title="Dashboard — Clutch Marks" description="View your learning progress, upcoming tasks, and performance analytics at a glance." path="/dashboard" /><StudentDashboard /></>;
}
