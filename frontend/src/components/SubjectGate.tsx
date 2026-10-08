// Full-page gate for students who haven't picked any subjects yet. Lessons and
// Practice render this instead of content until the student makes a pick —
// so "opening Lessons" always means first choosing what you study.
//
// In Clutch Marks some study-content pages are now publicly viewable (notes,
// lessons, quizzes, past papers and the per-topic pages). Those pages render
// this gate only for a signed-in student who has not yet chosen subjects — an
// anonymous visitor sees the content straight away, with a prompt to sign in
// if they want a personalised (filtered) view.
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/useToast";
import { useAuth } from "@/lib/auth";
import { useMySubjects } from "@/hooks/useMySubjects";
import { useSubjectLevelOptions } from "@/hooks/useSubjectLevelOptions";
import { BookOpen, Loader2, GraduationCap, LogIn, ArrowRight } from "lucide-react";

export function SubjectGate() {
  const { user } = useAuth();
  const signedIn = user != null;
  const { savePicks } = useMySubjects();
  const { toast } = useToast();
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [saving, setSaving] = useState(false);

  const { data: options = [], isLoading } = useSubjectLevelOptions();

  // Nothing to pick when the subject list is still loading — render the same
  // screen; the caller already waits on its own loading state before showing us.
  if (isLoading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // Anonymous visitors are not students in the platform yet, so they are never
  // "missing a pick". Show them the content prompt instead of the picker.
  if (!signedIn) {
    return (
      <Card className="mx-auto max-w-xl">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20">
            <GraduationCap className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-xl">Pick your subjects to personalise this page</CardTitle>
          <CardDescription className="text-sm">
            This content is open to everyone, but signing in and picking your subjects hides
            the rest and focuses lessons, quizzes and past papers on what you study.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="w-full max-h-[320px] overflow-y-auto space-y-2 pr-1">
            {options.map((o: any) => (
              <label key={o.id} className="flex items-center gap-3 rounded-lg border p-3 cursor-pointer hover:bg-accent/50 text-left">
                <Checkbox
                  checked={picked.has(o.id)}
                  onCheckedChange={() => setPicked(p => { const next = new Set(p); next.has(o.id) ? next.delete(o.id) : next.add(o.id); return next; })}
                  id={`anon-gate-${o.id}`}
                />
                <Label htmlFor={`anon-gate-${o.id}`} className="text-sm font-normal cursor-pointer flex-1">{o.label}</Label>
              </label>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button asChild className="gap-2">
              <Link to="/auth"><LogIn className="h-4 w-4" /> Sign in to personalise</Link>
            </Button>
            <Button onClick={() => setPicked(new Set(options.map((o: any) => o.id)))} className="gap-2">
              Pick for now<ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Picking a subset here hides every other subject everywhere, which is easy
  // to do by accident on first run. Offer the escape hatch up front.
  const selectAll = () => setPicked(new Set(options.map((o: any) => o.id)));

  const toggle = (id: string) =>
    setPicked(p => {
      const next = new Set(p);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const confirm = async () => {
    if (picked.size === 0) return;
    setSaving(true);
    try {
      await savePicks([...picked]);
      toast({ title: "You're set!", description: "Your subjects are ready below." });
    } catch (e: any) {
      toast({ title: "Save failed", description: e?.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="mx-auto max-w-xl">
      <CardContent className="flex flex-col items-center py-10 px-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 mb-5">
          <GraduationCap className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Pick your subjects to personalise this page</h2>
        <p className="text-sm text-muted-foreground mb-6 max-w-sm leading-relaxed">
          Choose what you study so we only show you lessons, quizzes and past papers for
          your subjects. You can change this anytime with "My subjects".
        </p>
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        ) : (
          <>
            <div className="mb-2 flex w-full justify-end">
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" onClick={selectAll}>
                Select all subjects
              </Button>
            </div>
            <div className="w-full max-h-[320px] overflow-y-auto space-y-2 mb-6 pr-1">
              {options.map(o => (
                <label key={o.id} className="flex items-center gap-3 rounded-lg border p-3 cursor-pointer hover:bg-accent/50 text-left">
                  <Checkbox
                    checked={picked.has(o.id)}
                    onCheckedChange={() => toggle(o.id)}
                    id={`gate-${o.id}`}
                  />
                  <Label htmlFor={`gate-${o.id}`} className="text-sm font-normal cursor-pointer flex-1">{o.label}</Label>
                </label>
              ))}
            </div>
            <Button onClick={confirm} disabled={saving || picked.size === 0} size="lg" className="gap-2 w-full sm:w-auto">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <BookOpen className="h-4 w-4" />}
              {picked.size === 0 ? "Select at least one subject" : `Start with ${picked.size} subject${picked.size > 1 ? "s" : ""}`}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
