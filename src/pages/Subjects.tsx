// Subject/level catalog.
//
// This page used to render a heading and the "My subjects" button and nothing
// else — for an admin it rendered no interactive content at all — so the
// sidebar's "Subjects" entry led to a blank page. It now lists every
// subject-level, linking into /study/:slug/:level.
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { SubjectPicker } from "@/components/SubjectPicker";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { subjectIcon } from "@/lib/subjects";
import { STATIC_HUB_INDEX_ID, SUBJECT_HUB_GROUPS } from "@/lib/subjectHubs";
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
    } catch (e) {
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

  // The same rule the cards use to decide link-or-button: a signed-out visitor
  // and an admin open any subject straight away, a student may have to add it
  // first, so they get the cards' behaviour rather than a bare list.
  const showHubIndex = isAdmin || !user;

  // The prerendered /subjects document carries a static copy of this index (real
  // links, for crawlers and for anyone whose JS has not run). This page renders
  // the same list below, so the copy leaves as soon as React owns the page —
  // otherwise every visitor would read it twice.
  useEffect(() => {
    document.getElementById(STATIC_HUB_INDEX_ID)?.remove();
  }, []);

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
            // Lowercase, as topicUrls/levelSeo build every other study URL: the
            // catalog used to send people to /study/…/IGCSE while the canonical
            // (and prerendered) page is /study/…/igcse.
            const href = `/study/${o.subjectSlug}/${o.level.toLowerCase()}`;

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

      {/* Every subject+level hub, as real links. The prerendered document carries
          an identical list (frontend/src/lib/subjectHubs.ts) so a crawler, and
          anyone whose JS has not run, reaches the study pages without going
          through the sitemap; the copy is removed on mount, leaving this one. */}
      {showHubIndex && (
        <section aria-labelledby="hub-index-heading" className="space-y-5 pt-2">
          <div className="space-y-1">
            <h2 id="hub-index-heading" className="text-lg font-semibold">
              Browse by subject and level
            </h2>
            <p className="text-sm text-muted-foreground">
              Each subject and level has its own hub with the topic list, notes, quizzes and past papers.
            </p>
          </div>
          <div className="space-y-4">
            {SUBJECT_HUB_GROUPS.map((group) => (
              <div key={group.subjectSlug} className="space-y-2">
                <h3 className="text-sm font-semibold">{group.subjectName}</h3>
                <ul className="flex flex-wrap gap-2">
                  {group.hubs.map((hub) => (
                    <li key={hub.path}>
                      <Link
                        to={hub.path}
                        aria-label={`${group.subjectName} ${hub.levelLabel}`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm transition-colors hover:border-primary/50 hover:text-primary"
                      >
                        {hub.levelLabel}
                        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
