// Plan gate: wraps premium (AS/A2) content. Free users see an upgrade prompt
// instead of the content. Renders children when allowed.
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Sparkles } from "lucide-react";
import { usePlanAccess } from "@/hooks/useSubscription";

export function PlanGate({ level, children }: { level: string; children: ReactNode }) {
  const { loading, canAccessLevel } = usePlanAccess();

  if (loading) return null;
  if (canAccessLevel(level)) return <>{children}</>;

  const isA2 = level.toUpperCase() === "A2";
  const levelName = isA2 ? "A2" : "AS";

  return (
    <Card className="neon-border">
      <CardContent className="flex flex-col items-center py-14 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 mb-5">
          <Lock className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-lg font-semibold mb-2">{levelName} is part of the full plan</h2>
        <p className="text-sm text-muted-foreground max-w-md leading-relaxed mb-6">
          The free plan includes everything for O Level. Upgrade to unlock AS and A2 lessons,
          notes, question sets and past papers — from $5/month on the annual plan.
        </p>
        <Button asChild className="gap-2 bg-gradient-to-r from-primary to-[hsl(var(--neon-purple))] text-primary-foreground">
          <Link to="/pricing"><Sparkles className="h-4 w-4" /> View plans</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
