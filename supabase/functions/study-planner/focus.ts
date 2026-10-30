// Merging the review queue into what the plan says needs focus (phase 3.4).
//
// The planner is told "Topics needing focus:" as text, and every product of a
// marking run — the cards queued at interval 0 — sits in that queue. So a topic
// the student just lost marks on earns weight in the next plan without a new
// table: the cards are the signal, and this turns them into the sentence the
// planner reads.
//
// Pure, so the frontend suite can test it. The queries that collect the topic
// names stay in index.ts.

/** How many extra topics a plan will take before the focus list becomes noise. */
const MAX_ADDED = 3;
const MAX_INPUT = 600;

/** Split the existing focus text exactly as the planner's offline fallback does. */
function tokens(value: string): string[] {
  return value.split(/[;\n]/).map((s) => s.trim()).filter(Boolean);
}

/**
 * Existing focus text + topics with cards due now, deduplicated case-insensitively.
 *
 * Existing entries keep their order and win a name clash, because a teacher or
 * student may have written "Vectors" where the queue says "vectors" — the point
 * is not to repeat it twice in the same paragraph.
 */
export function mergeFocusTopics(existing: string, dueTopics: string[]): string {
  const base = typeof existing === "string" ? existing.slice(0, MAX_INPUT) : "";
  const kept = tokens(base);
  const seen = new Set(kept.map((t) => t.toLowerCase()));

  const added: string[] = [];
  for (const raw of dueTopics ?? []) {
    const topic = typeof raw === "string" ? raw.trim() : "";
    if (!topic) continue;
    const key = topic.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    added.push(topic);
    if (added.length >= MAX_ADDED) break;
  }

  const merged = [...kept, ...added].join("; ");
  return merged.slice(0, MAX_INPUT);
}
