// Full-page gate for students who haven't picked any subjects yet. Lessons and
// Practice render this instead of content until the student makes a pick —
// so "opening Lessons" always means first choosing what you study.
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/useToast";
import { LEVEL_LABELS, type SubjectLevelCode } from "@/lib/subjects";
import { useMySubjects } from "@/hooks/useMySubjects";
import { BookOpen, Loader2, GraduationCap } from "lucide-react";

export function SubjectGate() {
  const { savePicks } = useMySubjects();
  const { toast } = useToast();
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [saving, setSaving] = useState(false);

  const { data: options = [], isLoading } = useQuery({
    queryKey: ["subject-level-options"],
    queryFn: async () => {
      const { data } = await supabase
        .from("subject_levels")
        .select("id, level, subjects(name), is_active")
        .eq("is_active", true)
        .order("sort_order");
      return (data ?? []).map((l: any) => ({
        id: l.id,
        label: `${l.subjects?.name ?? "Subject"} — ${LEVEL_LABELS[l.level as SubjectLevelCode] ?? l.level}`,
      }));
    },
  });

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
        <h2 className="text-xl font-semibold mb-2">Pick your subjects to continue</h2>
        <p className="text-sm text-muted-foreground mb-6 max-w-sm leading-relaxed">
          Choose what you study so we only show you lessons and practice for your subjects.
          You can change this anytime with "My subjects".
        </p>
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        ) : (
          <>
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
