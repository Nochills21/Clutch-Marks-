// Dashboard card: "Your week" — the student's own progress, never a ranking.
//
// This replaces the old streak counter, which showed a days-in-a-row number
// that dropped back to zero after any missed day. What is shown instead:
//   * days studied this week against a goal the student sets (1–7), so missing
//     a day is simply a day that is not filled in — nothing resets, nothing is
//     lost, and Monday starts a fresh week;
//   * one focus session at a time (10/20/30 minutes), pausable, with a break
//     suggested when it is done;
//   * occasional, specific encouragement drawn from real data (mistakes
//     corrected, a subject average that actually improved), silent when there
//     is nothing true to say;
//   * a preference panel because every optional surface is the student's call.
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trophy, Sparkles, SlidersHorizontal, CalendarCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePersonalWins, useXP } from "@/hooks/useXP";
import { FocusSession } from "@/components/FocusSession";
import {
  SESSION_CHOICES,
  encouragementLines,
  saveStudyPrefs,
  weekStrip,
  type StudyPrefs,
} from "@/lib/gamification";
import { toast } from "@/hooks/useToast";

export function YourWeekCard() {
  const { summary, loading, refresh } = useXP();
  const { wins, refresh: refreshWins } = usePersonalWins(Boolean(summary?.encouragement_enabled));
  const [showSettings, setShowSettings] = useState(false);
  const [saving, setSaving] = useState(false);
  const [sessionNote, setSessionNote] = useState<string | null>(null);

  if (loading) return <Skeleton className="h-40 w-full" />;
  if (!summary) return null; // admins / signed out

  const goal = summary.weekly_goal_days;
  const days = summary.days_this_week;
  const strip = weekStrip(summary.week_days ?? []);
  const lines = summary.encouragement_enabled ? encouragementLines(wins) : [];
  const recentWin = lines[0] ?? null;

  const patch = async (p: Partial<StudyPrefs>) => {
    setSaving(true);
    try {
      await saveStudyPrefs(p);
      await refresh();
      await refreshWins();
    } catch {
      toast({
        title: "Could not save that preference",
        description: "Your previous setting is still in place.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="surface">
      <CardContent className="space-y-5 p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-1">
            <p className="eyebrow flex items-center gap-2">
              <CalendarCheck className="h-3 w-3 text-primary" />
              Your week
            </p>
            <p className="font-display text-xl tracking-tight">
              <span className="num">{days}</span> of <span className="num">{goal}</span>{" "}
              {goal === 1 ? "day" : "days"} studied
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 text-muted-foreground"
            onClick={() => setShowSettings((v) => !v)}
            aria-expanded={showSettings}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Adjust
          </Button>
        </div>

        {/* Mon–Sun: a filled dot means a day with activity. A day that was not
            studied is left as an outline — no red, no cross, no "missed". */}
        <ol className="flex gap-2" aria-label="Days studied this week">
          {strip.map((d) => (
            <li key={d.iso} className="flex flex-1 flex-col items-center gap-1.5">
              <span
                className={cn(
                  "flex h-9 w-full items-center justify-center rounded-lg border text-[11px] uppercase tracking-[0.08em]",
                  d.studied
                    ? "border-[hsl(var(--gold-deep))]/60 bg-[hsl(var(--gold-deep))]/15 text-foreground"
                    : "border-border/70 text-muted-foreground/70",
                  d.isToday && "ring-1 ring-primary/40",
                )}
                aria-current={d.isToday ? "date" : undefined}
                title={d.studied ? `${d.short}: studied` : `${d.short}`}
              >
                {d.short}
              </span>
            </li>
          ))}
        </ol>

        <p className="text-sm text-muted-foreground">
          {summary.weekly_goal_met
            ? "Weekly goal met — anything else this week is a bonus, not a target."
            : "Ready to pick up where you left off?"}
        </p>

        <div className="rounded-xl border border-border/70 bg-secondary/30 p-4">
          <FocusSession
            activeSession={summary.today_active_session}
            suggestedMinutes={summary.session_minutes}
            animations={summary.animations_enabled}
            onChanged={async (result) => {
              await refresh();
              await refreshWins();
              if (result) {
                setSessionNote(
                  result.today_goal_met
                    ? "That's today's bit done. Take a break — more is optional."
                    : `Session saved — that's ${result.days_this_week} ${result.days_this_week === 1 ? "day" : "days"} this week.`,
                );
              } else {
                setSessionNote(null);
              }
            }}
          />
          {sessionNote && <p className="mt-3 text-sm text-muted-foreground">{sessionNote}</p>}
          {summary.today_goal_met && (
            <p className="mt-3 text-sm text-muted-foreground">
              You've already done your bit for today — a break is a perfectly good answer.
            </p>
          )}
        </div>

        {recentWin && (
          <div className="flex items-start gap-2.5 rounded-xl border border-primary/25 bg-primary/[0.05] p-3.5">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary/80" />
            <p className="text-sm leading-relaxed">{recentWin}</p>
          </div>
        )}

        {showSettings && (
          <div className="space-y-5 rounded-xl border border-border/70 p-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="goal-days" className="text-sm font-medium">
                  Days a week
                </Label>
                <Select
                  value={String(goal)}
                  onValueChange={(v) => patch({ weekly_goal_days: Number(v) })}
                  disabled={saving}
                >
                  <SelectTrigger id="goal-days" className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                      <SelectItem key={n} value={String(n)}>
                        {n} {n === 1 ? "day" : "days"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Change it whenever — picking a smaller goal loses nothing.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="session-minutes" className="text-sm font-medium">
                  Default session length
                </Label>
                <Select
                  value={String(summary.session_minutes)}
                  onValueChange={(v) => patch({ session_minutes: Number(v) })}
                  disabled={saving}
                >
                  <SelectTrigger id="session-minutes" className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SESSION_CHOICES.map((m) => (
                      <SelectItem key={m} value={String(m)}>
                        {m} minutes
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  All lengths are worth the same XP.
                </p>
              </div>
            </div>

            <div className="space-y-3.5">
              <p className="eyebrow">Optional extras</p>
              <ToggleRow
                id="pref-leaderboard"
                label="Show me on the leaderboard"
                hint="Off means your name never appears in the public list."
                checked={summary.leaderboard_visible}
                disabled={saving}
                onChange={(v) => patch({ leaderboard_visible: v })}
              />
              <ToggleRow
                id="pref-encouragement"
                label="Occasional encouragement"
                hint="A specific note when you fix mistakes or improve on a subject."
                checked={summary.encouragement_enabled}
                disabled={saving}
                onChange={(v) => patch({ encouragement_enabled: v })}
              />
              <ToggleRow
                id="pref-reminders"
                label="Study reminders"
                hint="Off means no nudges to come back."
                checked={summary.reminders_enabled}
                disabled={saving}
                onChange={(v) => patch({ reminders_enabled: v })}
              />
              <ToggleRow
                id="pref-animations"
                label="Animations"
                hint="Turn off for a completely still interface."
                checked={summary.animations_enabled}
                disabled={saving}
                onChange={(v) => patch({ animations_enabled: v })}
              />
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-3.5 text-xs text-muted-foreground">
          <span className="num">
            {summary.xp_all_time} XP total · {summary.xp_today} today
            {summary.longest_streak > 0 && <> · best week {summary.longest_streak} days</>}
          </span>
          {summary.leaderboard_visible ? (
            <Link to="/leaderboard" className="flex items-center gap-1 transition-colors hover:text-foreground">
              <Trophy className="h-3.5 w-3.5" />
              Leaderboard (optional)
            </Link>
          ) : (
            <span className="italic">You're hidden from the leaderboard.</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function ToggleRow({
  id,
  label,
  hint,
  checked,
  disabled,
  onChange,
}: {
  id: string;
  label: string;
  hint: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="space-y-0.5">
        <Label htmlFor={id} className="text-sm font-medium">
          {label}
        </Label>
        <p className="text-xs text-muted-foreground">{hint}</p>
      </div>
      <Switch id={id} checked={checked} disabled={disabled} onCheckedChange={onChange} />
    </div>
  );
}
