/**
 * The level vocabulary, with no React (or icon) imports.
 *
 * Split out of subjects.ts because the build-time prerender plugin imports this
 * module through topicSeo.ts: subjects.ts pulls in lucide-react for the subject
 * icons, and dragging an icon library into the Vite config bundle is both slow
 * and pointless — the plugin only needs the words.
 */
export type SubjectLevelCode = "OL" | "AS" | "A2" | "IGCSE";

export const LEVELS: SubjectLevelCode[] = ["OL", "IGCSE", "AS", "A2"];

/**
 * The levels a newly created subject gets rows for. IGCSE is opt-in: only
 * subjects that actually teach it (English) should carry an IGCSE row.
 */
export const DEFAULT_SUBJECT_LEVELS: SubjectLevelCode[] = ["OL", "AS", "A2"];

/**
 * What a student sees. "OL" is kept as a code (it is in every URL, in the DB
 * enum and in the topic manifest) and is relabelled "O Level" so it no longer
 * reads the same as IGCSE. IGCSE is its own code and label. Change the label,
 * not the code — topicUrl/topicSeo/topicSeo tests all key off it.
 */
export const LEVEL_LABELS: Record<SubjectLevelCode, string> = {
  OL: "O Level",
  IGCSE: "IGCSE",
  AS: "AS Level",
  A2: "A2 Level",
};

export const LEVEL_DESCRIPTIONS: Record<SubjectLevelCode, string> = {
  OL: "O Level foundations",
  IGCSE: "IGCSE foundations",
  AS: "First year of A Level",
  A2: "Second year of A Level",
};

/**
 * Display label for a level coming from a URL or a DB row, where the value is
 * only typed as `string`. Falls back to the raw value so an unexpected level
 * shows as itself instead of "undefined".
 */
export function levelLabel(level: string): string {
  return LEVEL_LABELS[level.toUpperCase() as SubjectLevelCode] ?? level;
}
