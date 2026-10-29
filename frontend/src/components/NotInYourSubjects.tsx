// The one card shown when a signed-in student opens a subject-level they have
// not added to their list — a shared link, a bookmark, a search result.
//
// Five surfaces used to spell this out for themselves. Four copied a dead end
// ("Topic not found — you haven't selected this subject yet", with a back button
// and no way to act on it) while the subject hub alone offered to add the
// subject, so following a link from the hub into a topic landed on a page that
// refused to do what the hub had just offered. The card, the copy, the add
// action and the test that decides to show any of it live here, so the five
// cannot drift apart again.
//
// Adding does not reload the page: `savePicks` writes the module-level store
// every page subscribes to, so the gate clears and the content the page has
// already fetched renders underneath.
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/useToast";
import { useMySubjects } from "@/hooks/useMySubjects";
import { LEVEL_LABELS, type SubjectLevelCode } from "@/lib/subjects";
import { isSubjectUnpicked } from "@/lib/subjectPicks";
import { ArrowLeft, Loader2, Plus } from "lucide-react";

/**
 * The question every page asks before rendering the card below. Kept beside it
 * so a caller cannot render the card on a condition the card does not resolve,
 * and so the same inline test is not retyped (and mistyped) on five pages.
 */
export function useSubjectUnpicked(subjectLevelId: string | null | undefined): boolean {
  const { pickedIds, loaded, isAdmin, isTeacher, signedIn } = useMySubjects();
  // A teacher does not maintain a list to add to: their subject is assigned, and
  // every other subject must still open — with its locks and the upgrade card —
  // rather than be replaced by "add it to my subjects".
  if (isTeacher) return false;
  return isSubjectUnpicked({ signedIn, isAdmin, loaded, pickedCount: pickedIds.size }, pickedIds, subjectLevelId);
}

export function NotInYourSubjects({
  subjectLevelId,
  subjectName,
  level,
  backTo = "/subjects",
  backLabel = "Back to subjects",
}: {
  /** The subject-level the reader is trying to open. */
  subjectLevelId: string;
  /** "Mathematics", or null when the page could not resolve it. */
  subjectName?: string | null;
  /** Raw level code from the database, e.g. "AS". */
  level?: string | null;
  backTo?: string;
  backLabel?: string;
}) {
  const { pickedIds, savePicks } = useMySubjects();
  const { toast } = useToast();
  const [adding, setAdding] = useState(false);
  const [failure, setFailure] = useState<string | null>(null);

  const levelLabel = level ? LEVEL_LABELS[level.toUpperCase() as SubjectLevelCode] ?? level : "";

  const add = async () => {
    setAdding(true);
    setFailure(null);
    try {
      await savePicks([...pickedIds, subjectLevelId]);
      toast({
        title: "Added to your subjects",
        description: subjectName ? `${subjectName} is now on your list.` : "This subject is now on your list.",
      });
    } catch (e) {
      const message = e instanceof Error ? e.message : "Could not add this subject";
      setFailure(message);
      toast({ title: "Could not add this subject", description: message, variant: "destructive" });
    } finally {
      setAdding(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Not in your subjects</CardTitle>
        <CardDescription>
          {subjectName ?? "This subject"}
          {levelLabel ? ` · ${levelLabel}` : ""} is not one of the subjects on your list yet. Add it
          to open its topics, notes and past papers.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <Button className="gap-2" onClick={add} disabled={adding}>
            {adding ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            Add it to my subjects
          </Button>
          <Button asChild variant="outline" className="gap-2">
            <Link to={backTo}>
              <ArrowLeft className="h-4 w-4" /> {backLabel}
            </Link>
          </Button>
        </div>
        {failure && <p className="text-sm text-destructive">{failure}</p>}
      </CardContent>
    </Card>
  );
}
