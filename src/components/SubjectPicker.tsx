import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight } from "lucide-react";
import { subjectIcon, subjectAccent, LEVEL_LABELS, LEVEL_DESCRIPTIONS, type SubjectLevelCode } from "@/lib/subjects";

type Level = { id: string; level: SubjectLevelCode; sort_order: number };
type Subject = {
  id: string; name: string; slug: string; description: string | null;
  icon: string; color: string; sort_order: number;
  subject_levels: Level[];
};

export function SubjectPicker({ compact = false }: { compact?: boolean }) {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    supabase
      .from("subjects")
      .select("id, name, slug, description, icon, color, sort_order, subject_levels(id, level, sort_order, is_active)")
      .eq("is_active", true)
      .order("sort_order")
      .then(({ data, error }) => {
        if (!active) return;
        if (error) setError(true);
        setSubjects(
          (data ?? []).map((s: any) => ({
            ...s,
            subject_levels: (s.subject_levels ?? [])
              .filter((l: any) => l.is_active)
              .sort((a: any, b: any) => a.sort_order - b.sort_order),
          })),
        );
        setLoading(false);
      });
    return () => { active = false; };
  }, []);

  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => <Skeleton key={i} className="h-56 rounded-2xl" />)}
      </div>
    );
  }

  if (error || subjects.length === 0) {
    return (
      <div className="rounded-2xl neon-border bg-card p-10 text-center text-muted-foreground">
        {error ? "We couldn't load the subjects right now. Please refresh." : "No subjects have been published yet."}
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {subjects.map((s) => {
        const Icon = subjectIcon(s.icon);
        const accent = subjectAccent(s.color);
        return (
          <div key={s.id} className={`glass-card p-6 flex flex-col ${accent.border}`}>
            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${accent.border} ${accent.bg} ${accent.text} mb-4`}>
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold">{s.name}</h3>
            {s.description && !compact && (
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed line-clamp-3">{s.description}</p>
            )}
            <div className="mt-5 space-y-2">
              {s.subject_levels.length === 0 && (
                <p className="text-xs text-muted-foreground">Levels coming soon.</p>
              )}
              {s.subject_levels.map((l) => (
                <Link
                  key={l.id}
                  to={`/study/${s.slug}/${l.level.toLowerCase()}`}
                  className="group flex items-center justify-between rounded-xl border border-border/60 bg-background/40 px-4 py-2.5 transition-colors hover:bg-muted/60"
                >
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">{LEVEL_LABELS[l.level]}</span>
                    <span className="block text-[11px] text-muted-foreground">{LEVEL_DESCRIPTIONS[l.level]}</span>
                  </span>
                  <ArrowRight className={`h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 ${accent.text}`} />
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
