// A focus session the student owns.
//
// Deliberate design choices, because the timer is the easiest thing to turn
// into pressure:
//   * the three lengths are presented as equal choices — 10, 20 and 30 minutes
//     pay the same 20 XP, so picking the short one is never "the easy option";
//   * there is no countdown, alarm or "time's up" — elapsed time only ever
//     counts *up*, and reaching the planned length is phrased as having done
//     the session, not as running out;
//   * "set aside" is a first-class action: pausing keeps the session and loses
//     nothing, and it is never described as quitting;
//   * animations (the progress fill) can be switched off entirely.
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Coffee, Pause, Play, Timer } from "lucide-react";
import {
  SESSION_CHOICES,
  type FinishSessionResult,
  type SessionMinutes,
  finishFocusSession,
  startFocusSession,
} from "@/lib/gamification";

type ActiveSession = { id: string; planned_minutes: number; started_at: string };

interface Props {
  activeSession: ActiveSession | null;
  suggestedMinutes: number;
  animations: boolean;
  /** Called after any change so the dashboard can refresh its numbers. */
  onChanged: (result: FinishSessionResult | null) => void;
}

const minutesSince = (iso: string) => Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 60000));

export function FocusSession({ activeSession, suggestedMinutes, animations, onChanged }: Props) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(() => (activeSession ? minutesSince(activeSession.started_at) : 0));
  const [chosen, setChosen] = useState<SessionMinutes>(() => {
    const n = [10, 20, 30].includes(suggestedMinutes) ? suggestedMinutes : 20;
    return n as SessionMinutes;
  });

  // Tick gently (15s) — a per-second clock is the thing that turns a timer into
  // a source of pressure, and nothing here needs second precision.
  useEffect(() => {
    if (!activeSession) return;
    setElapsed(minutesSince(activeSession.started_at));
    const id = window.setInterval(() => setElapsed(minutesSince(activeSession.started_at)), 15_000);
    return () => window.clearInterval(id);
  }, [activeSession]);

  const planned = activeSession?.planned_minutes ?? chosen;
  const reached = activeSession ? elapsed >= planned : false;
  const pct = activeSession ? Math.min(100, Math.round((elapsed / planned) * 100)) : 0;

  const run = async (fn: () => Promise<FinishSessionResult | null>) => {
    setBusy(true);
    setError(null);
    try {
      onChanged(await fn());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong — nothing was lost.");
    } finally {
      setBusy(false);
    }
  };

  const start = () => run(async () => {
    await startFocusSession(chosen);
    return null;
  });

  const finish = () => run(() => finishFocusSession(activeSession!.id, true));

  const setAside = () => run(async () => {
    await finishFocusSession(activeSession!.id, false);
    return null;
  });

  if (!activeSession) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Pick a length and start when you're ready. All three are worth the same — a shorter
          session is a real session.
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {SESSION_CHOICES.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setChosen(m)}
              aria-pressed={chosen === m}
              className={cn(
                "num rounded-xl border px-3 py-2 text-sm transition-colors",
                chosen === m
                  ? "border-primary/60 bg-primary/10 text-foreground"
                  : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground",
              )}
            >
              {m} min
            </button>
          ))}
          <Button size="sm" onClick={start} disabled={busy} className="ml-auto gap-1.5">
            <Play className="h-3.5 w-3.5" />
            Start {chosen} min
          </Button>
        </div>
        {error && <p className="text-xs text-muted-foreground">{error}</p>}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <Timer className="h-4 w-4 text-primary/80" />
        <span className="num text-sm">
          {reached
            ? `You've done your ${planned} minutes.`
            : `${elapsed} of ${planned} minutes — about ${Math.max(planned - elapsed, 0)} to go.`}
        </span>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="ghost" className="gap-1.5 text-muted-foreground" onClick={setAside} disabled={busy}>
            <Pause className="h-3.5 w-3.5" />
            Pause for now
          </Button>
          <Button size="sm" onClick={finish} disabled={busy} className="gap-1.5">
            <Coffee className="h-3.5 w-3.5" />
            {reached ? "Finish and take a break" : "Finish session"}
          </Button>
        </div>
      </div>
      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-border/70"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Session progress"
      >
        <div
          className={cn(
            "h-full rounded-full bg-gradient-to-r from-[hsl(var(--gold-deep))] to-[hsl(var(--gold-bright))]",
            animations && "transition-[width] duration-1000 ease-out",
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground">
        Pausing keeps this session — you can pick it up later, and nothing is lost.
      </p>
      {error && <p className="text-xs text-muted-foreground">{error}</p>}
    </div>
  );
}
