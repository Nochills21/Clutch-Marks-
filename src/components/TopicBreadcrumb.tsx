import { Link } from "react-router-dom";

/** Lightweight breadcrumb for topic-level pages:
 *  Subjects › {Subject} {Level} › {Topic} › Current page */
export function TopicBreadcrumb({
  subjectName,
  levelLabel,
  topicName,
  currentLabel,
  subjectSlug,
  level,
  topicSlug,
}: {
  subjectName: string;
  levelLabel: string;
  topicName: string;
  currentLabel: string;
  subjectSlug: string;
  level: string;
  topicSlug: string;
}) {
  return (
    <nav className="flex items-center gap-1 text-sm text-muted-foreground flex-wrap" aria-label="Topic breadcrumb">
      <Link to="/subjects" className="hover:text-foreground underline underline-offset-2">
        Subjects
      </Link>
      <span className="mx-1 opacity-50">›</span>
      <Link to={`/study/${subjectSlug}/${level}/`} className="hover:text-foreground underline underline-offset-2">
        {subjectName} {levelLabel}
      </Link>
      <span className="mx-1 opacity-50">›</span>
      <Link to={`/study/${subjectSlug}/${level}/${topicSlug}/notes`} className="hover:text-foreground underline underline-offset-2">
        {topicName}
      </Link>
      <span className="mx-1 opacity-50">›</span>
      <span className="text-foreground font-medium">{currentLabel}</span>
    </nav>
  );
}
