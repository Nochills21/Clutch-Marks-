// Paper-aware related-papers helper.
//
// A past paper is a WHOLE paper (it covers many topics), but the archive links
// each row to a single representative `topic_id`. The per-topic pages used to
// show only rows tagged with that exact topic — so most topics showed nothing,
// and there was no notion of "this lesson is Paper 1, show Paper 1 papers".
//
// `relatedTopicPapers` fixes that without a schema change: it reads the paper
// group(s) of the topic's own tagged papers ("Paper 1", "Paper 2", …,
// "Mechanics M1", "Unit 3", … via `archivePaperGroup`) and returns every paper
// in the same subject-level sitting in those groups — question paper AND mark
// scheme travel together because they live on the same row. A topic with no
// tagged papers of its own falls back to the whole subject-level set, so no
// lesson page is ever empty while the archive keeps growing.

import {
  archivePaperGroup,
  paperSortKey,
  type ArchiveFilterablePaper,
} from "@/lib/pastPaperFiles";

export interface RelatedPaperInput extends ArchiveFilterablePaper {
  id: string;
  topic_id?: string | null;
}

/** Distinct paper groups in calendar order (Paper 1, Paper 2, …, Unit 3, …). */
export function paperGroupsOf<T extends ArchiveFilterablePaper>(papers: T[]): string[] {
  const set = new Set<string>();
  papers.forEach((p) => set.add(archivePaperGroup(p)));
  return [...set].sort((a, b) => paperSortKey(a).localeCompare(paperSortKey(b)));
}

/**
 * Papers relevant to `topicId`: the topic's own tagged rows plus every other
 * row in `levelPapers` (all papers of the subject-level) sitting in the same
 * paper group(s). Falls back to the full level set when the topic has no
 * tagged rows, so Paper-1 lessons still list Paper-1 papers once ANY topic in
 * the level maps that group.
 */
export function relatedTopicPapers<T extends RelatedPaperInput>(
  topicId: string,
  topicPapers: T[],
  levelPapers: T[],
): { papers: T[]; groups: string[]; filtered: boolean } {
  const own = topicPapers.filter((p) => p.topic_id === topicId);
  const groups = paperGroupsOf(own.length > 0 ? own : levelPapers);
  if (own.length === 0) {
    return { papers: levelPapers, groups, filtered: false };
  }
  const wanted = new Set(groups);
  const seen = new Set<string>();
  const papers = [...own, ...levelPapers].filter((p) => {
    if (seen.has(p.id)) return false;
    seen.add(p.id);
    return wanted.has(archivePaperGroup(p));
  });
  return { papers, groups, filtered: true };
}
