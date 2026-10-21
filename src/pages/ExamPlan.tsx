// Exam plan: the student's sittings, each with a revision schedule paced backwards
// from the sitting date. The schedule itself is pure (lib/examPlan.ts); this page
// only stores the dates (public.exam_dates, owned by RLS) and renders the plan.
import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { CalendarDays, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/useToast";
import { useSubjectLevelOptions } from "@/hooks/useSubjectLevelOptions";
import { SEOHead } from "@/components/SEOHead";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  buildExamPlan,
  toCalendarDate,
  type ExamPlan as Plan,
  type PlanKind,
} from "@/lib/examPlan";

const PAPER_LABEL_MAX = 120;

interface ExamRow {
  id: string;
  paper_label: string;
  exam_at: string;
  subject_level_id: string | null;
}

interface TopicRow {
  subject_level_id: string | null;
  name: string;
  sort_order: number;
}

const KIND_LABEL: Record<PlanKind, string> = {
  learn: "Learn",
  review: "Review",
  "past-paper": "Past paper",
  light: "Light review",
  exam: "Sitting",
};

const KIND_VARIANT: Record<PlanKind, "default" | "secondary" | "outline" | "destructive"> = {
  learn: "default",
  review: "secondary",
  "past-paper": "secondary",
  light: "outline",
  exam: "destructive",
};

// The sitting is stored at noon local time so the calendar day survives any time
// zone the page is read in.
function sittingToIso(date: string): string {
  return new Date(`${date}T12:00:00`).toISOString();
}

function dayCountLabel(daysUntil: number): string {
  if (daysUntil < 0) return "Passed";
  if (daysUntil === 0) return "Today";
  if (daysUntil === 1) return "Tomorrow";
  return `${daysUntil} days to go`;
}

export default function ExamPlanPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const today = toCalendarDate(new Date());

  const [label, setLabel] = useState("");
  const [date, setDate] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [saving, setSaving] = useState(false);

  const exams = useQuery({
    queryKey: ["exam-dates", user?.id],
    enabled: !!user,
    queryFn: async (): Promise<ExamRow[]> => {
      const { data, error } = await supabase
        .from("exam_dates")
        .select("id, paper_label, exam_at, subject_level_id")
        .order("exam_at", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });

  const subjects = useSubjectLevelOptions();

  const subjectIds = useMemo(
    () => Array.from(new Set((exams.data ?? []).map((e) => e.subject_level_id).filter((v): v is string => !!v))),
    [exams.data],
  );

  const topics = useQuery({
    queryKey: ["exam-plan-topics", subjectIds.join(",")],
    enabled: subjectIds.length > 0,
    queryFn: async (): Promise<TopicRow[]> => {
      const { data, error } = await supabase
        .from("topics")
        .select("subject_level_id, name, sort_order")
        .in("subject_level_id", subjectIds)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });

  const topicsBySubject = useMemo(() => {
    const map = new Map<string, string[]>();
    for (const t of topics.data ?? []) {
      if (!t.subject_level_id) continue;
      const list = map.get(t.subject_level_id) ?? [];
      list.push(t.name);
      map.set(t.subject_level_id, list);
    }
    return map;
  }, [topics.data]);

  const subjectLabel = useMemo(() => {
    const map = new Map((subjects.data ?? []).map((s) => [s.id, s.label]));
    return (id: string | null) => (id ? map.get(id) ?? "Subject" : null);
  }, [subjects.data]);

  const plans = useMemo(() => {
    return (exams.data ?? []).map((exam) => {
      const examDate = toCalendarDate(new Date(exam.exam_at));
      const plan: Plan = buildExamPlan({
        examDate,
        today,
        topics: exam.subject_level_id ? topicsBySubject.get(exam.subject_level_id) ?? [] : [],
      });
      return { exam, examDate, plan };
    });
  }, [exams.data, topicsBySubject, today]);

  const trimmed = label.trim();
  const canAdd =
    !!user && trimmed.length > 0 && trimmed.length <= PAPER_LABEL_MAX && date !== "" && date >= today && !saving;

  const addExam = async () => {
    if (!user || !canAdd) return;
    setSaving(true);
    const { error } = await supabase.from("exam_dates").insert({
      user_id: user.id,
      paper_label: trimmed,
      exam_at: sittingToIso(date),
      subject_level_id: subjectId || null,
    });
    setSaving(false);
    if (error) {
      toast({ title: "Could not save that sitting", description: error.message, variant: "destructive" });
      return;
    }
    setLabel("");
    setDate("");
    setSubjectId("");
    toast({ title: "Sitting added", description: "Your revision plan is ready below." });
    void queryClient.invalidateQueries({ queryKey: ["exam-dates"] });
  };

  const removeExam = async (id: string) => {
    const { error } = await supabase.from("exam_dates").delete().eq("id", id);
    if (error) {
      toast({ title: "Could not remove that sitting", description: error.message, variant: "destructive" });
      return;
    }
    void queryClient.invalidateQueries({ queryKey: ["exam-dates"] });
  };

  return (
    <div className="space-y-6">
      <SEOHead path="/exam-plan" title="Exam plan — Clutch Marks" noindex />
      <div>
        <h1 className="flex items-center gap-2 text-3xl font-bold">
          <CalendarDays className="h-7 w-7 text-primary" /> Exam plan
        </h1>
        <p className="text-muted-foreground">
          Add the papers you sit. Each plan is paced backwards from its date: learning first, timed papers
          in the final fortnight, light review the day before.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Add a sitting</CardTitle>
          <CardDescription>Only dates from today onwards can be added.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-[2fr_1fr_1.5fr_auto] md:items-end">
          <div className="space-y-1.5">
            <Label htmlFor="exam-label">Paper</Label>
            <Input
              id="exam-label"
              placeholder="e.g. Paper 2: Physics"
              value={label}
              maxLength={PAPER_LABEL_MAX}
              onChange={(e) => setLabel(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="exam-date">Date</Label>
            <Input
              id="exam-date"
              type="date"
              min={today}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="exam-subject">Subject (for topics)</Label>
            <select
              id="exam-subject"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
            >
              <option value="">No subject yet</option>
              {(subjects.data ?? []).map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
          <Button onClick={addExam} disabled={!canAdd}>
            {saving ? "Saving…" : "Add sitting"}
          </Button>
        </CardContent>
      </Card>

      {exams.isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-40 w-full" />
        </div>
      ) : exams.isError ? (
        <Card>
          <CardContent className="py-8 text-center text-sm text-muted-foreground">
            Could not load your sittings. {exams.error instanceof Error ? exams.error.message : ""}
          </CardContent>
        </Card>
      ) : plans.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center py-12 text-center">
            <CalendarDays className="mb-4 h-12 w-12 text-muted-foreground/50" />
            <p className="text-muted-foreground">No sittings yet. Add one above to see its plan.</p>
          </CardContent>
        </Card>
      ) : (
        plans.map(({ exam, examDate, plan }) => (
          <Card key={exam.id}>
            <CardHeader className="pb-3">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <CardTitle className="text-xl">{exam.paper_label}</CardTitle>
                  <CardDescription>
                    {format(parseISO(examDate), "EEEE d MMMM yyyy")}
                    {subjectLabel(exam.subject_level_id) ? ` · ${subjectLabel(exam.subject_level_id)}` : ""}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{dayCountLabel(plan.daysUntil)}</Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Remove ${exam.paper_label}`}
                    onClick={() => void removeExam(exam.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {plan.note && <p className="text-sm text-muted-foreground">{plan.note}</p>}

              {plan.phases.length > 0 && (
                <ol className="grid gap-2 md:grid-cols-4">
                  {plan.phases.map((ph) => (
                    <li key={`${ph.kind}-${ph.from}`} className="rounded-lg border border-border/60 p-3">
                      <p className="text-sm font-medium">{ph.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {format(parseISO(ph.from), "d MMM")}
                        {ph.to !== ph.from ? ` – ${format(parseISO(ph.to), "d MMM")}` : ""}
                      </p>
                    </li>
                  ))}
                </ol>
              )}

              {plan.items.length > 0 && (
                <ul className="max-h-[480px] divide-y divide-border/60 overflow-y-auto rounded-lg border border-border/60">
                  {plan.items.map((item) => (
                    <li key={`${item.date}-${item.kind}-${item.daysBefore}`} className="flex gap-3 p-3">
                      <span className="w-20 shrink-0 text-xs tabular-nums text-muted-foreground">
                        {format(parseISO(item.date), "EEE d MMM")}
                      </span>
                      <div className="min-w-0 space-y-1">
                        <Badge variant={KIND_VARIANT[item.kind]}>{KIND_LABEL[item.kind]}</Badge>
                        <p className="text-sm">{item.title}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
