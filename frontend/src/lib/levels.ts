/**
 * The level vocabulary, with no React (or icon) imports.
 *
 * Split out of subjects.ts because the build-time prerender plugin imports this
 * module through topicSeo.ts: subjects.ts pulls in lucide-react for the subject
 * icons, and dragging an icon library into the Vite config bundle is both slow
 * and pointless — the plugin only needs the words.
 */
export type SubjectLevelCode = "OL" | "AS" | "A2";

export const LEVELS: SubjectLevelCode[] = ["OL", "AS", "A2"];

export const LEVEL_LABELS: Record<SubjectLevelCode, string> = {
  OL: "O Level",
  AS: "AS Level",
  A2: "A2 Level",
};

export const LEVEL_DESCRIPTIONS: Record<SubjectLevelCode, string> = {
  OL: "IGCSE / O Level foundations",
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
