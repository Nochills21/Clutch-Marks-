// Dashboard widget: today's suggested tasks from the student's latest study plan.
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { loadFailureMessage } from "@/lib/net";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles, CalendarClock } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

interface PlanItem { line: string; }

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
  const [planItems, setPlanItems] = useState<PlanItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [failure, setFailure] = useState<string | null>(null);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setFailure(null);
      const { data: planRes, error } = await supabase
        .from("study_plans")
        .select("content, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1);
      if (cancelled) return;
      // A failed read used to fall through to "Nothing scheduled", which sent
      // the student off to generate a plan they may already have.
      if (error) {
        setFailure(loadFailureMessage("today's tasks", error));
        setPlanItems([]);
        setLoading(false);
        return;
      }
      const planContent = planRes?.[0]?.content ?? "";
      setPlanItems(extractTodayLines(planContent).map((l) => ({ line: l })));
      setLoading(false);
    };
    load();
    return () => { cancelled = true; };
  }, [user, reload]);

  return (
    <Card className="surface">
      <CardHeader className="pb-3">
        <p className="eyebrow flex items-center gap-2">
          <CalendarClock className="h-3 w-3 text-primary" />
          {format(new Date(), "EEEE, MMM d")}
        </p>
        <CardTitle className="font-display pt-2 text-2xl font-normal tracking-tight">
          Today's tasks
        </CardTitle>
        <CardDescription className="sr-only">Today's suggested tasks from your latest study plan</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : failure ? (
          <p className="text-sm text-destructive">
            {failure}{" "}
            <button
              onClick={() => setReload((n) => n + 1)}
              className="text-primary/90 underline decoration-primary/30 underline-offset-4 transition-colors hover:text-primary"
            >
              Try again
            </button>
          </p>
        ) : planItems.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Nothing scheduled.{" "}
            <Link to="/study-planner" className="text-primary/90 underline decoration-primary/30 underline-offset-4 transition-colors hover:text-primary">
              Generate a study plan
            </Link>{" "}
            to see daily tasks here.
          </p>
        ) : (
          <div className="space-y-2">
            <div className="eyebrow flex items-center gap-2">
              <Sparkles className="h-3 w-3 text-primary" /> From your study plan
            </div>
            <ol className="divide-y divide-border/60">
              {planItems.map((p, i) => (
                <li key={i} className="flex gap-3 py-2.5 text-sm">
                  <span className="num mt-0.5 text-[11px] text-primary/80">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1 leading-relaxed">{p.line}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
