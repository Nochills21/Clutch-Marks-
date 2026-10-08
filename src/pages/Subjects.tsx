// Subject/level catalog.
//
// This page used to render a heading and the "My subjects" button and nothing
// else — for an admin it rendered no interactive content at all — so the
// sidebar's "Subjects" entry led to a blank page. It now lists every
// subject-level, linking into /study/:slug/:level.
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { SubjectPicker } from "@/components/SubjectPicker";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { subjectIcon } from "@/lib/subjects";
import { useAuth } from "@/lib/auth";
import { useMySubjects } from "@/hooks/useMySubjects";
import { useSubjectLevelOptions } from "@/hooks/useSubjectLevelOptions";
import { useToast } from "@/hooks/useToast";
import { ChevronRight, Info, Loader2, Plus } from "lucide-react";

export default function Subjects() {
  const { user } = useAuth();
  const { pickedIds, loaded, isAdmin, savePicks } = useMySubjects();
  const { data: options = [], isLoading } = useSubjectLevelOptions();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [adding, setAdding] = useState<string | null>(null);

  // Subject pages only open subjects the student has picked, so opening one
  // they haven't chosen has to add it first. Without this the catalog offers
  // links that land on "You haven't selected this subject yet".
  const openSubject = async (id: string, href: string) => {
    // Signed-out visitors have no account to save to, so every subject is simply
    // openable — attempting the save would only raise a sign-in error.
    if (!user) {
      navigate(href);
      return;
    }
    setAdding(id);
    try {
      await savePicks([...pickedIds, id]);
      navigate(href);
    } catch (e: any) {
      toast({
        title: "Could not add that subject",
        description: e?.message ?? "Check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setAdding(null);
    }
  };

  // Students see their own subjects first; everything else stays reachable.
  // A signed-out visitor is not on a plan, so nothing is "added" for them: every
  // card opens straight away instead of showing an Add step that cannot save.
  const isPicked = (id: string) => isAdmin || !user || pickedIds.has(id);
  const ordered = [...options].sort((a, b) => Number(isPicked(b.id)) - Number(isPicked(a.id)));
  const pickedCount = options.filter((o) => pickedIds.has(o.id)).length;

  return (
    <div className="space-y-6">
      <SEOHead path="/subjects" />
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Choose a subject</h1>
          <p className="text-muted-foreground">
            Open any subject and level below. Your own subjects are listed first.
          </p>
        </div>
        <SubjectPicker />
      </div>

      {!isAdmin && loaded && pickedCount > 0 && pickedCount < options.length && (
        <div className="flex items-start gap-2 rounded-lg border border-border/60 bg-secondary/40 px-3 py-2 text-xs text-muted-foreground">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
          <span>
            Lessons, practice and past papers only show your {pickedCount} selected
            subject{pickedCount === 1 ? "" : "s"}. Opening another subject below adds it to
            your subjects, and you can change the selection with "My subjects".
          </span>
        </div>
      )}

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-xl" />
          ))}
        </div>
      ) : options.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center text-sm text-muted-foreground">
            No subjects are available yet. Please check back shortly.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ordered.map((o) => {
            const isYours = !isAdmin && !!user && pickedIds.has(o.id);
            const Icon = subjectIcon(o.subjectName);
            const href = `/study/${o.subjectSlug}/${o.level}`;

            const inner = (
              <CardContent className="flex items-center gap-3 py-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <p className="truncate font-medium">{o.subjectName}</p>
                  <p className="text-xs text-muted-foreground">{o.levelLabel}</p>
                </div>
                {isYours ? (
                  <Badge variant="secondary" className="shrink-0 text-[10px]">
                    Yours
                  </Badge>
                ) : isAdmin || !user ? null : (
                  <span className="flex shrink-0 items-center gap-1 text-xs text-primary">
                    {adding === o.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                    Add
                  </span>
                )}
                {isAdmin || isYours || !user ? (
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                ) : null}
              </CardContent>
            );

            // Dimming means "on the plan but not picked yet" — it is meaningless
            // for a signed-out visitor, whose cards below are plain links.
            const cardClass = `h-full transition-colors ${
              isYours || isAdmin || !user ? "hover:border-primary/50" : "opacity-80 hover:opacity-100"
            }`;

            // Admins, signed-out visitors and already-picked subjects open
            // straight away; a signed-in student without this subject has to
            // join it on the way through.
            return isAdmin || isYours || !user ? (
              <Link key={o.id} to={href} className="group">
                <Card className={cardClass}>{inner}</Card>
              </Link>
            ) : (
              <button
                key={o.id}
                type="button"
                className="group text-left"
                disabled={adding !== null}
                onClick={() => openSubject(o.id, href)}
              >
                <Card className={cardClass}>{inner}</Card>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
