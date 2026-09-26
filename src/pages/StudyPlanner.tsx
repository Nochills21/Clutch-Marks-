// Study planner — AI study plan + deadline view, calendar-free.
// The study planner replaced the old Calendar page for scheduling.
// Generation calls the study-planner edge function directly (not lib/ai.ts)
// so hours/days/question-count tuning reaches the model prompt.
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SEOHead } from "@/components/SEOHead";
import { SubjectPicker } from "@/components/SubjectPicker";
import { useToast } from "@/hooks/useToast";
import { format } from "date-fns";
import { Brain, Plus, Trash2, RefreshCw, XCircle } from "lucide-react";

interface StudyPlan {
  id: string;
  title: string;
  start_date: string | null;
  end_date: string | null;
  content: string;
  updated_at: string;
  user_id: string;
}

interface UpcomingHomework {
  id: string;
  title: string;
  due_date: string | null;
}

// ---- AI plan generation payload (matches the study-planner edge function) -------
interface GeneratePlanInput {
  _subject_level_id?: string | null;
  _hours_per_week?: number;
  _days_per_week?: number;
  _question_count?: number;
  title?: string;
  prompts?: string[];
}

interface GeneratedPlan {
  plan: string;
  model: string;
  cost_cents: number;
}

// ---- Helpers ------------------------------------------------------------------------

function parseISODate(v: string | null | undefined): Date | null {
  if (!v) return null;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
}

function labelPlanPeriod(start: string | null, end: string | null): string {
  if (!start && !end) return "No dates";
  const s = parseISODate(start);
  const e = parseISODate(end);
  if (!s && e) return `From ${format(e, "MMM yyyy")}`;
  if (s && !e) return `To ${format(s, "MMM yyyy")}`;
  if (s && e) return `${format(s, "MMM yyyy")} → ${format(e, "MMM yyyy")}`;
  return "No dates";
}

// ---- Component ------------------------------------------------------------------------

export default function StudyPlanner() {
  const { user } = useAuth();
  const { toast } = useToast();

  // ---- State ----
  const [plans, setPlans] = useState<StudyPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // form
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subjectLevelId, setSubjectLevelId] = useState("");

  // ---- Subject/level picklist (name resolved through the subjects join) ----
  const [subjectLevels, setSubjectLevels] = useState<{ id: string; level: string; subject_name: string }[]>([]);
  const loadSubjectLevels = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("subject_levels")
      .select("id, level, subjects(name)")
      .eq("is_active", true)
      .order("sort_order");
    setSubjectLevels(
      (data ?? []).map((sl) => ({
        id: sl.id,
        level: sl.level,
        subject_name: sl.subjects?.name ?? "Subject",
      })),
    );
  };
  useEffect(() => {
    if (!user) return;
    loadSubjectLevels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const [hoursPerWeek, setHoursPerWeek] = useState(2);
  const [daysPerWeek, setDaysPerWeek] = useState(3);
  const [questionCount, setQuestionCount] = useState(10);
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedPlan | null>(null);
  const [generating, setGenerating] = useState(false);

  // upcoming homework (from the DB, no date math churn)
  const [homework, setHomework] = useState<UpcomingHomework[]>([]);
  const [homeworkLoading, setHomeworkLoading] = useState(true);

  // ---- Load saved plans ----
  const loadPlans = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { data } = await supabase
        .from("study_plans")
        .select("*")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false })
        .limit(20);
      setPlans((data ?? []) as StudyPlan[]);
    } catch {
      setPlans([]);
    } finally {
      setLoading(false);
    }
  };

  // ---- Upcoming homework: any due within 7 days (no date math, no manual sort) ----
  const loadHomework = async () => {
    if (!user) return;
    setHomeworkLoading(true);
    try {
      // `as any`: the homework query-builder generic instantiates excessively
      // deep against the generated types (TS2589); rows are cast explicitly.
      const { data } = await (supabase
        .from("homework") as any)
        .select("id, title, due_date")
        .eq("user_id", user.id)
        .gte("due_date", new Date().toISOString())
        .order("due_date", { ascending: true })
        .limit(20);
      setHomework((data ?? []) as UpcomingHomework[]);
    } catch {
      setHomework([]);
    } finally {
      setHomeworkLoading(false);
    }
  };

  const refresh = async () => {
    await Promise.all([loadPlans(), loadHomework()]);
  };

  useEffect(() => {
    if (!user) return;
    loadPlans();
    loadHomework();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const generatePlan = async () => {
    if (!user) {
      toast({ title: "Sign in first", description: "Create an account to generate a plan." });
      return;
    }
    if (!subjectLevelId) {
      toast({ title: "Pick a subject & level", description: "A plan needs a subject and level." });
      return;
    }
    setGenerating(true);
    setGeneratedPlan(null);
    try {
      // `as any`: supabase-js resolves the Functions generic exponentially deep
      // against the generated Database types (TS2589); the payload is validated
      // by the edge function anyway.
      const invoke = supabase.functions.invoke as unknown as (
        name: string, options?: { body: GeneratePlanInput },
      ) => Promise<{ data: unknown; error: { message: string } | null }>;
      const { data, error } = await invoke("study-planner", {
        body: {
          _subject_level_id: subjectLevelId,
          _hours_per_week: hoursPerWeek,
          _days_per_week: daysPerWeek,
          _question_count: questionCount,
          title: title.trim() || undefined,
          prompts: description.trim() ? [description.trim()] : undefined,
        },
      });
      if (error) throw new Error(error.message);
      setGeneratedPlan(data as GeneratedPlan);
      toast({ title: "Plan generated" });
    } catch (e: unknown) {
      toast({ title: "Generation failed", description: (e as Error).message, variant: "destructive" });
    } finally {
      setGenerating(false);
    }
  };

  const savePlan = async () => {
    if (!user) {
      toast({ title: "Sign in first", description: "Create an account to save a plan." });
      return;
    }
    if (!title.trim()) {
      toast({ title: "Title required", description: "Give your plan a name before saving." });
      return;
    }
    setSaving(true);
    try {
      const { error } = await supabase.from("study_plans").insert({
        user_id: user.id,
        title: title.trim(),
        content: generatedPlan?.plan ?? description.trim(),
        start_date: new Date().toISOString().slice(0, 10),
        end_date: null,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      setTitle("");
      setDescription("");
      setGeneratedPlan(null);
      toast({ title: "Plan saved" });
      refresh();
    } catch (e: unknown) {
      toast({ title: "Save failed", description: (e as Error).message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const deletePlan = async (id: string) => {
    if (!user) return;
    if (!confirm("Delete this plan?")) return;
    const { error } = await supabase.from("study_plans").delete().eq("id", id).eq("user_id", user.id);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Plan deleted" });
      refresh();
    }
  };

  // ---- Derived ----
  const upcoming = homework.filter((h) => {
    if (!h.due_date) return false;
    const due = parseISODate(h.due_date);
    return due !== null && due <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  });

  return (
    <div className="space-y-6">
      <SEOHead
        title="Study Planner — Clutch Marks"
        description="Generate your personal 90-day study plan from quiz results, deadlines, and weak topics."
        path="/study-planner"
      />

      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" /> Study Planner
          </h1>
          <p className="text-muted-foreground">
            Generate a personalised revision schedule from your quiz results, deadlines and
            weak topics — or write your own.
          </p>
        </div>
        <SubjectPicker />
      </div>

      {/* ---- Form ---- */}
      <Card>
        <CardHeader>
          <CardTitle>Generate a plan</CardTitle>
          <CardDescription>
            Answer a few questions and we'll build a 90-day schedule tailored to your levels.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="plan-title">Plan title (optional)</Label>
              <Input id="plan-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. IGCSE Maths — Quarter 1" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plan-desc">Topics to cover (optional)</Label>
              <Textarea
                id="plan-desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Focus on algebra and geometry; skip calculus."
                rows={3}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="hours">Hours / week</Label>
              <Input id="hours" type="number" min={1} max={40} value={hoursPerWeek} onChange={(e) => setHoursPerWeek(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="days">Days / week</Label>
              <Input id="days" type="number" min={1} max={7} value={daysPerWeek} onChange={(e) => setDaysPerWeek(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="count">Questions per session</Label>
              <Input id="count" type="number" min={5} max={50} value={questionCount} onChange={(e) => setQuestionCount(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slSelect">Subject & level</Label>
              <Select value={subjectLevelId} onValueChange={setSubjectLevelId}>
                <SelectTrigger id="slSelect">
                  <SelectValue placeholder="Choose a subject and level" />
                </SelectTrigger>
                <SelectContent>
                  {subjectLevels.map((sl) => (
                    <SelectItem key={sl.id} value={sl.id}>{sl.subject_name} — {sl.level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={generatePlan} disabled={generating} className="gap-2">
            {generating ? <><RefreshCw className="h-4 w-4 animate-spin" /> Generating…</> : <><Brain className="h-4 w-4" /> Generate</>}
          </Button>
        </CardContent>
      </Card>

      {/* ---- Generated plan ---- */}
      {generatedPlan && (
        <Card>
          <CardHeader>
            <CardTitle>Your AI plan</CardTitle>
            <CardDescription>Generated by the study planner.</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="text-sm bg-muted p-4 rounded-lg whitespace-pre-wrap">{generatedPlan.plan}</pre>
            <div className="mt-4 flex gap-2">
              <Button onClick={savePlan} disabled={saving} className="gap-2"><Plus className="h-4 w-4" /> Save to my plans</Button>
              <Button variant="outline" onClick={() => setGeneratedPlan(null)}><XCircle className="h-4 w-4" /> Dismiss</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ---- Saved plans ---- */}
      <Card>
        <CardHeader>
          <CardTitle>Your saved plans</CardTitle>
          <CardDescription>{plans.length} plan{plans.length === 1 ? "" : "s"} saved.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">{[0, 1, 2].map((i) => <div key={i} className="h-10 rounded bg-muted animate-pulse" />)}</div>
          ) : plans.length === 0 ? (
            <p className="text-sm text-muted-foreground">No saved plans yet. Generate one above.</p>
          ) : (
            <div className="space-y-2">
              {plans.map((p) => (
                <div key={p.id} className="flex items-start justify-between gap-3 rounded-lg border p-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-sm truncate">{p.title}</p>
                    <p className="text-xs text-muted-foreground">{labelPlanPeriod(p.start_date, p.end_date)}</p>
                    <p className="text-xs text-muted-foreground">
                      Updated {format(parseISODate(p.updated_at) ?? new Date(), "MMM d, yyyy 'at' HH:mm")}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <Button size="sm" variant="ghost" onClick={() => deletePlan(p.id)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* ---- Upcoming homework ---- */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming homework</CardTitle>
          <CardDescription>
            Due within a week. Mark off work as you go.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {homeworkLoading ? (
            <div className="space-y-2">{[0, 1, 2].map((i) => <div key={i} className="h-10 rounded bg-muted animate-pulse" />)}</div>
          ) : upcoming.length === 0 ? (
            <p className="text-sm text-muted-foreground">No homework due in the next 7 days.</p>
          ) : (
            <div className="space-y-2">
              {upcoming.map((h) => {
                const due = parseISODate(h.due_date);
                return (
                  <div key={h.id} className="flex items-center justify-between gap-3 rounded-lg border p-3">
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate">{h.title}</p>
                      {due && <p className="text-xs text-muted-foreground">Due {format(due, "EEE, MMM d, yyyy")}</p>}
                    </div>
                    <Badge variant="outline">{format(due ?? new Date(), "d")}d</Badge>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
