// Parent dashboard: link to a child by username, then see their quiz scores,
// lesson progress and homework submissions. Links live in parent_student_links
// (policies restrict parents to managing their own links).
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/useToast";
import { format } from "date-fns";
import { Heart, Link2, Unlink, RefreshCw, BookOpen, Brain, ClipboardList } from "lucide-react";

type Child = { user_id: string; username: string; full_name: string };

export function ParentDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [children, setChildren] = useState<Child[]>([]);
  const [username, setUsername] = useState("");
  const [linking, setLinking] = useState(false);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<Child | null>(null);
  const [stats, setStats] = useState<{ attempts: any[]; lessons: any[]; homework: any[] }>({ attempts: [], lessons: [], homework: [] });
  const [statsLoading, setStatsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const loadLinks = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    // Plain select + per-link profile lookup: the embed hint is ambiguous in
    // PostgREST (table has FKs to both auth.users and profiles).
    const { data: links } = await supabase
      .from("parent_student_links")
      .select("student_id")
      .eq("parent_id", user.id);
    const kids: Child[] = [];
    for (const l of links ?? []) {
      const { data: p } = await supabase
        .from("profiles")
        .select("username, full_name, user_id")
        .eq("user_id", l.student_id)
        .maybeSingle();
      if (p) kids.push({ user_id: p.user_id, username: p.username, full_name: p.full_name });
    }
    setChildren(kids);
    setActive(prev => kids.find(k => k.user_id === prev?.user_id) ?? kids[0] ?? null);
    setLoading(false);
  }, [user]);

  useEffect(() => { loadLinks(); }, [loadLinks]);

  useEffect(() => {
    if (!active) { setStats({ attempts: [], lessons: [], homework: [] }); return; }
    let cancelled = false;
    setStatsLoading(true);
    (async () => {
      const [attempts, lessons, homework] = await Promise.all([
        supabase.from("quiz_attempts")
          .select("quiz_id, score, total_questions, completed_at")
          .eq("user_id", active.user_id)
          .not("completed_at", "is", null)
          .order("completed_at", { ascending: false })
          .limit(10),
        supabase.from("lesson_progress")
          .select("lesson_id, completed_at")
          .eq("user_id", active.user_id)
          .eq("completed", true)
          .order("completed_at", { ascending: false })
          .limit(10),
        supabase.from("homework_submissions")
          .select("homework_id, status, submitted_at")
          .eq("user_id", active.user_id)
          .order("submitted_at", { ascending: false })
          .limit(10),
      ]);
      if (cancelled) return;
      // Resolve display titles with plain lookups (embeds are ambiguous on these
      // tables because of dual FKs to auth.users and public tables).
      const titleMap = new Map<string, string>();
      const quizIds = [...new Set((attempts.data ?? []).map((a: any) => a.quiz_id).filter(Boolean))];
      const hwIds = [...new Set((homework.data ?? []).map((h: any) => h.homework_id).filter(Boolean))];
      const lessonIds = [...new Set((lessons.data ?? []).map((l: any) => l.lesson_id).filter(Boolean))];
      if (quizIds.length) {
        const { data } = await supabase.from("quizzes").select("id, title").in("id", quizIds);
        (data ?? []).forEach((q: any) => titleMap.set(`q:${q.id}`, q.title));
      }
      if (hwIds.length) {
        const { data } = await supabase.from("homework").select("id, title").in("id", hwIds);
        (data ?? []).forEach((h: any) => titleMap.set(`h:${h.id}`, h.title));
      }
      if (lessonIds.length) {
        const { data } = await supabase.from("lessons").select("id, title").in("id", lessonIds);
        (data ?? []).forEach((l: any) => titleMap.set(`l:${l.id}`, l.title));
      }
      if (cancelled) return;
      setStats({
        attempts: (attempts.data ?? []).map((a: any) => ({ ...a, quiz_title: titleMap.get(`q:${a.quiz_id}`) ?? "Quiz" })),
        lessons: (lessons.data ?? []).map((l: any) => ({ ...l, lesson_title: titleMap.get(`l:${l.lesson_id}`) ?? "Lesson" })),
        homework: (homework.data ?? []).map((h: any) => ({ ...h, hw_title: titleMap.get(`h:${h.homework_id}`) ?? "Task" })),
      });
      setStatsLoading(false);
    })();
    return () => { cancelled = true; };
  }, [active]);

  const linkChild = async () => {
    const uname = username.trim();
    if (!user || !uname) return;
    setLinking(true);
    setNotFound(false);
    try {
      const { data: profile, error: pErr } = await supabase
        .from("profiles")
        .select("user_id, username")
        .eq("username", uname)
        .maybeSingle();
      if (pErr) throw pErr;
      if (!profile) { setNotFound(true); return; }
      if (children.some(c => c.user_id === profile.user_id)) {
        toast({ title: "Already linked", description: `@${uname} is on your dashboard.` });
        return;
      }
      // Verify the target really is a student before linking.
      const { data: roleRow } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", profile.user_id)
        .maybeSingle();
      if (roleRow?.role !== "student") {
        toast({ title: "Cannot link", description: "Only student accounts can be linked.", variant: "destructive" });
        return;
      }
      const { error } = await supabase
        .from("parent_student_links")
        .insert({ parent_id: user.id, student_id: profile.user_id });
      if (error) throw error;
      toast({ title: "Linked", description: `You now see @${uname}'s progress.` });
      setUsername("");
      await loadLinks();
    } catch (e: any) {
      toast({ title: "Link failed", description: e?.message, variant: "destructive" });
    } finally { setLinking(false); }
  };

  const unlink = async (childId: string) => {
    const { error } = await supabase
      .from("parent_student_links")
      .delete()
      .eq("parent_id", user!.id)
      .eq("student_id", childId);
    if (error) { toast({ title: "Unlink failed", description: error.message, variant: "destructive" }); return; }
    await loadLinks();
  };

  const avg = (xs: any[]) =>
    xs.length
      ? Math.round(xs.reduce((s, a) => s + ((a.score ?? 0) / (a.total_questions || 1)) * 100, 0) / xs.length)
      : null;

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[hsl(var(--neon-cyan))] to-[hsl(185_80%_35%)] p-8 text-white neon-border">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm px-3 py-1 text-xs font-medium mb-4">
            <Heart className="h-3 w-3" /> Parent View
          </div>
          <h1 className="text-3xl font-bold mb-2">Parent Dashboard</h1>
          <p className="text-white/70 text-sm">Follow your child's scores, lessons and homework at a glance.</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-4 space-y-3">
          <p className="text-sm font-medium">Link a student by username</p>
          <div className="flex gap-2">
            <Input
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="e.g. zaid3mk"
              onKeyDown={e => e.key === "Enter" && linkChild()}
            />
            <Button onClick={linkChild} disabled={linking || !username.trim()} className="gap-2">
              {linking ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Link2 className="h-4 w-4" />} Link
            </Button>
          </div>
          {notFound && <p className="text-xs text-destructive">No student found with that username. Check the spelling with your child.</p>}
          {children.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {children.map(c => (
                <span key={c.user_id} className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs">
                  <button className={`font-medium ${active?.user_id === c.user_id ? "text-primary" : ""}`} onClick={() => setActive(c)}>
                    @{c.username}
                  </button>
                  <button aria-label={`Unlink ${c.username}`} onClick={() => unlink(c.user_id)} className="text-muted-foreground hover:text-destructive">
                    <Unlink className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {!active ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-14 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 mb-5">
              <Link2 className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-lg font-semibold mb-2">{loading ? "Loading…" : "No Student Linked"}</h2>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              {loading ? "Checking your linked students…" : "Enter your child's Clutch Marks username above to see their progress."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            <Card><CardContent className="p-4 flex items-center gap-3">
              <Brain className="h-8 w-8 text-primary" />
              <div><p className="text-2xl font-bold">{avg(stats.attempts) ?? "—"}{avg(stats.attempts) !== null && "%"}</p><p className="text-xs text-muted-foreground">Quiz average (last 10)</p></div>
            </CardContent></Card>
            <Card><CardContent className="p-4 flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-primary" />
              <div><p className="text-2xl font-bold">{stats.lessons.length}</p><p className="text-xs text-muted-foreground">Recent lessons completed</p></div>
            </CardContent></Card>
            <Card><CardContent className="p-4 flex items-center gap-3">
              <ClipboardList className="h-8 w-8 text-primary" />
              <div><p className="text-2xl font-bold">{stats.homework.filter(h => h.status === "submitted" || h.status === "graded").length}</p><p className="text-xs text-muted-foreground">Homework submitted</p></div>
            </CardContent></Card>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardContent className="p-0">
                <div className="p-4 pb-2"><p className="text-sm font-semibold flex items-center gap-2"><Brain className="h-4 w-4 text-primary" /> Recent quiz attempts{statsLoading && " …"}</p></div>
                <Table>
                  <TableHeader><TableRow><TableHead>Quiz</TableHead><TableHead>Score</TableHead><TableHead>When</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {stats.attempts.length === 0 ? (
                      <TableRow><TableCell colSpan={3} className="py-6 text-center text-muted-foreground text-sm">No quiz attempts yet.</TableCell></TableRow>
                    ) : stats.attempts.map((a, i) => {
                      const pct = Math.round(((a.score ?? 0) / (a.total_questions || 1)) * 100);
                      return (
                        <TableRow key={i}>
                          <TableCell className="text-sm max-w-40 truncate">{a.quiz_title}</TableCell>
                          <TableCell><Badge variant="secondary" className={pct >= 80 ? "bg-emerald-500/15 text-emerald-600" : pct >= 50 ? "bg-amber-500/15 text-amber-600" : "bg-red-500/15 text-red-600"}>{a.score}/{a.total_questions} · {pct}%</Badge></TableCell>
                          <TableCell className="text-xs text-muted-foreground">{a.completed_at ? format(new Date(a.completed_at), "MMM d") : "—"}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-0">
                <div className="p-4 pb-2"><p className="text-sm font-semibold flex items-center gap-2"><ClipboardList className="h-4 w-4 text-primary" /> Homework</p></div>
                <Table>
                  <TableHeader><TableRow><TableHead>Task</TableHead><TableHead>Status</TableHead><TableHead>When</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {stats.homework.length === 0 ? (
                      <TableRow><TableCell colSpan={3} className="py-6 text-center text-muted-foreground text-sm">No homework submissions yet.</TableCell></TableRow>
                    ) : stats.homework.map((h, i) => (
                      <TableRow key={i}>
                        <TableCell className="text-sm max-w-40 truncate">{h.hw_title}</TableCell>
                        <TableCell><Badge variant="secondary" className="capitalize">{h.status}</Badge></TableCell>
                        <TableCell className="text-xs text-muted-foreground">{h.submitted_at ? format(new Date(h.submitted_at), "MMM d") : "—"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
