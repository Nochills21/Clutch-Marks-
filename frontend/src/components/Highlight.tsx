// On-page highlighting for search results.
//
// One component, so every surface marks matches the same way: the archive card
// titles, the topic line and the per-topic paper list all render through here.
// Segmentation lives in `pastPaperSearch` — a row that survives the filter must
// be the row whose matches are visible, and two implementations of "what counts
// as a match" would eventually disagree.
import { highlightSegments } from "@/lib/pastPaperSearch";

export function Highlight({
  text,
  query,
  className,
}: {
  text: string | null | undefined;
  query: string | null | undefined;
  className?: string;
}) {
  const value = String(text ?? "");
  const segments = highlightSegments(value, query);
  // Fast path: no query, or nothing matched — render the plain string so this
  // cannot change layout or text selection for an ordinary list.
  if (segments.length === 1 && !segments[0].match) return <>{value}</>;
  return (
    <>
      {segments.map((segment, i) =>
        segment.match ? (
          // `mark` is the semantic element for a highlighted run, and it is
          // announced as such by screen readers; the colours come from the
          // theme's primary so it reads in both light and dark.
          <mark
            key={i}
            className={
              className ??
              "rounded-[2px] bg-primary/20 px-0.5 text-inherit"
            }
          >
            {segment.text}
          </mark>
        ) : (
          <span key={i}>{segment.text}</span>
        ),
      )}
    </>
  );
}
