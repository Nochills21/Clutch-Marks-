// Admin home: platform-wide stats.
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Brain, ClipboardList, FileText, Megaphone, ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function AdminDashboard() {
  const [stats, setStats] = useState({ topics: 0, lessons: 0, quizzes: 0, homework: 0, students: 0, materials: 0 });

  useEffect(() => {
    const load = async () => {
      const [t, l, q, h, s, m] = await Promise.all([
        supabase.from("topics").select("id", { count: "exact", head: true }),
        supabase.from("lessons").select("id", { count: "exact", head: true }),
        supabase.from("quizzes").select("id", { count: "exact", head: true }),
        supabase.from("homework").select("id", { count: "exact", head: true }),
        supabase.from("user_roles").select("id", { count: "exact", head: true }).eq("role", "student"),
        supabase.from("study_materials").select("id", { count: "exact", head: true }),
      ]);
      setStats({ topics: t.count ?? 0, lessons: l.count ?? 0, quizzes: q.count ?? 0, homework: h.count ?? 0, students: s.count ?? 0, materials: m.count ?? 0 });
    };
    load();
  }, []);

  const cards = [
    { label: "Lessons", value: stats.lessons, icon: FileText, link: "/admin/lessons" },
    { label: "Quizzes", value: stats.quizzes, icon: Brain, link: "/admin/quizzes" },
    { label: "Homework", value: stats.homework, icon: ClipboardList, link: "/admin/homework" },
    { label: "Students", value: stats.students, icon: Users, link: "/admin/accounts" },
    { label: "Materials", value: stats.materials, icon: FileText, link: "/admin/materials" },
    { label: "Topics", value: stats.topics, icon: BookOpen, link: "/dashboard" },
  ];

  const quickActions = [
    { label: "Create Quiz", to: "/admin/quizzes", icon: Brain },
    { label: "Assign Homework", to: "/admin/homework", icon: ClipboardList },
    { label: "Post Announcement", to: "/admin/announcements", icon: Megaphone },
    { label: "Add Materials", to: "/admin/materials", icon: FileText },
  ];

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/15 via-card to-[hsl(var(--neon-purple))]/10 p-8 text-foreground neon-border">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full -translate-y-1/2 translate-x-1/4 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-[hsl(var(--neon-purple))]/15 rounded-full translate-y-1/2 -translate-x-1/4 blur-[80px]" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-medium mb-4 text-primary">
            <Zap className="h-3 w-3" /> Admin Panel
          </div>
          <h1 className="text-3xl font-bold mb-2 text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground text-sm">Manage your course content and students.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.label} to={c.link}>
            <div className="stat-card group cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                    <c.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{c.label}</p>
                    <p className="text-2xl font-bold mt-0.5">{c.value}</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary transition-colors" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="neon-border bg-card">
        <CardHeader className="pb-3"><CardTitle className="text-lg">Quick Actions</CardTitle></CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((a) => (
              <Button key={a.label} asChild variant="outline" className="justify-start gap-2 h-12 rounded-xl border-border/60 hover:border-primary/30 hover:bg-primary/5">
                <Link to={a.to}>
                  <a.icon className="h-4 w-4 text-primary" />
                  {a.label}
                </Link>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
