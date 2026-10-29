// "What this account covers", said the same way everywhere a teacher might look.
//
// A teacher account has no plan, so every plan-shaped surface is truthful but
// unhelpful: "You're on the free preview" does not explain why Physics is wide
// open and Chemistry is locked. This card names the grant and the upgrade in one
// sentence, and it is only ever rendered for `role === 'teacher'`.
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Sparkles } from "lucide-react";
import { useTeacherScope } from "@/hooks/useTeacherScope";
import { describeTeacherScope } from "@/lib/teacherAccess";

export function TeacherScopeNotice({
  /** The subject being viewed, if this notice sits on a subject page. */
  viewingSlug,
  className,
}: {
  viewingSlug?: string;
  className?: string;
}) {
  const teacher = useTeacherScope();
  if (!teacher.isTeacher) return null;

  const covers = viewingSlug ? teacher.coversSlug(viewingSlug) : true;
  const subject = teacher.subjectName ?? "your subject";

  // On the subject the grant covers, the notice is a quiet label; on any other
  // subject it is the upgrade pitch, because that is the moment the account is
  // being asked to pay.
  return (
    <Card className={`neon-border bg-card ${className ?? ""}`}>
      <CardContent className="flex flex-wrap items-center gap-3 py-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
          <GraduationCap className="h-4 w-4 text-primary" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="flex flex-wrap items-center gap-2 text-sm font-medium">
            {covers ? "Teacher access" : "This subject is outside your teacher access"}
            {teacher.subjectName && (
              <Badge variant="outline" className="border-primary/30 text-primary">
                {teacher.subjectName}
              </Badge>
            )}
          </p>
          <p className="text-xs text-muted-foreground">
            {covers
              ? describeTeacherScope(teacher.scope)
              : `${subject} is fully open on this account. Other subjects — this one included — need a paid plan, which also unlocks the AI marker.`}
          </p>
        </div>
        {!covers && (
          <Button asChild size="sm" className="gap-2 bg-gradient-to-r from-primary to-[hsl(var(--neon-purple))] text-primary-foreground">
            <Link to="/pricing">
              <Sparkles className="h-4 w-4" /> Upgrade
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
