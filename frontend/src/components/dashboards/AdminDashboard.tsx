// Admin home: platform stats, with every content figure scoped to the subject
// chosen in the picker above them. The catalogue is multi-subject, so a single
// "Lessons 100" said nothing about the subject the admin was actually looking
// at; the scope now follows the picker and the tile set spells out questions and
// notes as well as lessons, quizzes and materials.
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSubjectLevelOptions } from "@/hooks/useSubjectLevelOptions";
import { BookOpen, Users, Brain, FileText, Megaphone, ArrowRight, Zap, CreditCard, HelpCircle, ClipboardList, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ALL = "all";

export function AdminDashboard() {
  const [scope, setScope] = useState<string>(ALL);
  const { data: options = [] } = useSubjectLevelOptions();

  const [counts, setCounts] = useState({ topics: 0, lessons: 0, quizzes: 0, questions: 0, notes: 0, materials: 0 });
  const [platform, setPlatform] = useState({ students: 0, pendingPayments: 0 });
  // Content health: how many damaged rows the integrity report finds right now.
  const [integrity, setIntegrity] = useState<number | null>(null);

  useEffect(() => {
    const load = async () => {
      const [countsRes, s, pp, integrityRes] = await Promise.all([
        // NULL means "every subject"; the same RPC backs the student dashboard,
        // so both pages count the catalogue the same way.
        supabase.rpc("get_dashboard_counts", { _level_ids: scope === ALL ? null : [scope] }),
        supabase.from("user_roles").select("id", { count: "exact", head: true }).eq("role", "student"),
        supabase.from("subscriptions").select("id", { count: "exact", head: true }).eq("status", "pending_payment"),
        // Admin-gated on the database side; this dashboard is admin-only.
        supabase.rpc("content_integrity_findings"),
      ]);
      const c = ((countsRes.data ?? []) as any[])[0];
      if (c) {
        setCounts({
          topics: Number(c.topics_total ?? 0),
          lessons: Number(c.lessons_total ?? 0),
          quizzes: Number(c.quizzes_total ?? 0),
          questions: Number(c.questions_total ?? 0),
          notes: Number(c.notes_total ?? 0),
          materials: Number(c.materials_total ?? 0),
        });
      }
      setPlatform({ students: s.count ?? 0, pendingPayments: pp.count ?? 0 });
      // A failed check leaves the tile as an em dash rather than claiming zero.
      if (!integrityRes.error) setIntegrity((integrityRes.data ?? []).length);
    };
    load();
  }, [scope]);

  const scopeLabel = scope === ALL ? "All subjects" : options.find((o) => o.id === scope)?.label ?? "All subjects";

  const cards = [
    { label: "Lessons", value: counts.lessons, icon: FileText, link: "/admin/lessons" },
    { label: "Quizzes", value: counts.quizzes, icon: Brain, link: "/admin/quizzes" },
    { label: "Questions", value: counts.questions, icon: HelpCircle, link: "/admin/quizzes" },
    // Both figures live in study_materials: "Notes & summaries" is what the
    // /notes library lists, "All materials" adds any other type. Today every
    // material is a note or summary, so the two agree — they diverge as soon as
    // another type lands.
    { label: "Notes & summaries", value: counts.notes, icon: ClipboardList, link: "/admin/materials" },
    { label: "All materials", value: counts.materials, icon: FileText, link: "/admin/materials" },
    { label: "Topics", value: counts.topics, icon: BookOpen, link: "/dashboard" },
    { label: "Students", value: platform.students, icon: Users, link: "/admin/accounts" },
    { label: "Pending payments", value: platform.pendingPayments, icon: CreditCard, link: "/admin/payments" },
    // Damage the console cannot show: a replacement character, a 1-based answer
    // index, a material_type students never read. "—" until the check answers.
    { label: "Content issues", value: integrity === null ? "—" : integrity, icon: AlertTriangle, link: "/admin/content-integrity" },
  ];

  const quickActions = [
    { label: "Create Quiz", to: "/admin/quizzes", icon: Brain },
    { label: "Review Payments", to: "/admin/payments", icon: CreditCard },
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

      {/* Scope picker — the content figures below follow it */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="eyebrow">Showing</span>
        <Select value={scope} onValueChange={setScope}>
          <SelectTrigger className="h-9 w-64">
            <SelectValue placeholder="All subjects" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All subjects</SelectItem>
            {options.map((o) => (
              <SelectItem key={o.id} value={o.id}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          Content totals follow <span className="text-foreground">{scopeLabel}</span>; students and payments are always platform-wide.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
