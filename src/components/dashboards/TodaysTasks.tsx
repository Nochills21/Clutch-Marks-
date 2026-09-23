// Dashboard widget: due homework and suggested study items.
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ClipboardList, Sparkles, CalendarClock } from "lucide-react";
import { Link } from "react-router-dom";
import { format, isToday, isTomorrow, differenceInDays } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface HomeworkItem { id: string; title: string; due_date: string | null; }
interface PlanItem { line: string; }

function formatDue(d: string) {
  const date = new Date(d);
  if (isToday(date)) return "Today";
  if (isTomorrow(date)) return "Tomorrow";
  const diff = differenceInDays(date, new Date());
  if (diff > 0 && diff < 7) return format(date, "EEEE");
  return format(date, "MMM d");
}

function extractTodayLines(content: string): string[] {
  if (!content) return [];
  const lines = content.split(/\r?\n/);
  const today = new Date();
  const dayName = format(today, "EEEE").toLowerCase();
  const dateStr = format(today, "MMM d").toLowerCase();

  // Look for a section heading mentioning today / day name / week 1 day 1
  const out: string[] = [];
  let capturing = false;
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) { if (capturing && out.length) break; continue; }
    const lower = line.toLowerCase();
    const isHeading = /^(#+\s|day\s*\d|week\s*\d|monday|tuesday|wednesday|thursday|friday|saturday|sunday|\*\*)/i.test(line);
    if (isHeading) {
      if (capturing) break;
      if (lower.includes(dayName) || lower.includes(dateStr) || lower.includes("today")) {
        capturing = true;
        continue;
      }
    } else if (capturing && /^[-*\d]/.test(line)) {
      out.push(line.replace(/^[-*\d.)\s]+/, "").trim());
      if (out.length >= 5) break;
    }
  }
  // Fallback: first 3 bullet points
  if (out.length === 0) {
    for (const raw of lines) {
      const line = raw.trim();
      if (/^[-*]\s+/.test(line) || /^\d+[.)]\s+/.test(line)) {
        out.push(line.replace(/^[-*\d.)\s]+/, "").trim());
        if (out.length >= 3) break;
      }
    }
  }
  return out;
}

export function TodaysTasks() {
  const { user } = useAuth();
  const [homework, setHomework] = useState<HomeworkItem[]>([]);
  const [planItems, setPlanItems] = useState<PlanItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      setLoading(true);
      const now = new Date();
      const horizon = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

      const [hwRes, planRes, submittedRes] = await Promise.all([
        supabase
          .from("homework")
          .select("id, title, due_date")
          .gte("due_date", now.toISOString())
          .lte("due_date", horizon.toISOString())
          .order("due_date", { ascending: true })
          .limit(5),
        supabase
          .from("study_plans")
          .select("content, created_at")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(1),
        supabase
          .from("homework_submissions")
          .select("homework_id")
          .eq("user_id", user.id),
      ]);

      const submittedIds = new Set((submittedRes.data ?? []).map((s: any) => s.homework_id));
      setHomework((hwRes.data ?? []).filter((h: any) => !submittedIds.has(h.id)));
      const planContent = planRes.data?.[0]?.content ?? "";
      setPlanItems(extractTodayLines(planContent).map((l) => ({ line: l })));
      setLoading(false);
    };
    load();
  }, [user]);

  const hasAnything = homework.length > 0 || planItems.length > 0;

  return (
    <Card className="neon-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <CalendarClock className="h-4 w-4 text-primary" />
          Today's Tasks
        </CardTitle>
        <CardDescription className="text-xs">{format(new Date(), "EEEE, MMM d")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : !hasAnything ? (
          <p className="text-sm text-muted-foreground">
            Nothing scheduled. <Link to="/study-planner" className="text-primary hover:underline">Generate a study plan</Link> to see daily tasks here.
          </p>
        ) : (
          <>
            {planItems.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <Sparkles className="h-3 w-3 text-primary" /> From your study plan
                </div>
                <ul className="space-y-1.5">
                  {planItems.map((p, i) => (
                    <li key={i} className="text-sm flex gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="flex-1">{p.line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {homework.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <ClipboardList className="h-3 w-3 text-primary" /> Upcoming homework
                </div>
                <ul className="space-y-2">
                  {homework.map((h) => (
                    <li key={h.id}>
                      <Link
                        to="/homework"
                        className="flex items-center justify-between gap-2 rounded-lg border border-border/40 px-3 py-2 hover:bg-accent/40 transition-colors"
                      >
                        <span className="text-sm font-medium truncate">{h.title}</span>
                        {h.due_date && (
                          <Badge variant="secondary" className="shrink-0 text-xs">
                            {formatDue(h.due_date)}
                          </Badge>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
