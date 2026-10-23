/**
 * The subject list the public copy is built from.
 *
 * Derived from the committed topic manifest (itself generated from the live
 * `subjects`/`topics` tables) instead of hand-written, because the hand-written
 * version went stale: the homepage title, its social card, the JSON-LD and
 * llms.txt all still described a three-subject site — Maths, Physics and
 * Computer Science — long after Chemistry, Biology and English had real pages.
 * Copy that enumerates subjects now comes from here, so a subject with topics
 * appears by construction and `seoConsistency.test.ts` fails if a surface
 * forgets one.
 *
 * No React (or lucide) imports: `seoRoutes.ts` is loaded by the build-time
 * prerender plugin, and the Vite config has no business bundling an icon
 * library (the same reason `levels.ts` exists).
 */
import { TOPIC_MANIFEST } from "./topicManifest.generated";

/** Reading order for the enumerations; anything unlisted follows alphabetically. */
const SUBJECT_ORDER = ["Maths", "Physics", "Chemistry", "Biology", "Computer Science", "English"];

/** Level codes in the order a student meets them. OL and IGCSE read the same. */
const LEVEL_ORDER = ["OL", "IGCSE", "AS", "A2"];

/** How a level code is spoken in copy ("IGCSE, AS and A2", not "AS Level and A2 Level"). */
const LEVEL_WORDS: Record<string, string> = { OL: "IGCSE", IGCSE: "IGCSE", AS: "AS", A2: "A2" };

/**
 * Copy names, where the database's own name is not what a student searches for.
 *
 * English is the awkward one: it ships as two `subjects` rows (First Language,
 * Second Language) and one word in a list, so the family below collapses them
 * and this map supplies the single name.
 */
const LABELS: Record<string, string> = { mathematics: "Maths", english: "English" };

/**
 * The bucket a slug belongs to. One family per thing a student chooses to
 * study — otherwise copy would offer "English" three times and count the two
 * syllabi twice.
 */
const familyOf = (slug: string) => (slug.startsWith("english-") ? "english" : slug);

/** `computer-science` → `Computer Science`: no database name can leak odd casing into copy. */
const titleCaseSlug = (slug: string) =>
  slug.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

export interface PublishedSubject {
  /** Family key, e.g. `mathematics` or `english`. */
  family: string;
  /** The name used in copy, e.g. `Maths`. */
  label: string;
  /** Every `subjects.slug` in this family. */
  slugs: string[];
  /** Level codes that have topics, in `LEVEL_ORDER`. */
  levels: string[];
}

function build(): PublishedSubject[] {
  const families = new Map<string, { slugs: Set<string>; levels: Set<string> }>();
  for (const topic of TOPIC_MANIFEST) {
    const key = familyOf(topic.subjectSlug);
    const family = families.get(key) ?? { slugs: new Set<string>(), levels: new Set<string>() };
    family.slugs.add(topic.subjectSlug);
    family.levels.add(topic.level);
    families.set(key, family);
  }

  return [...families]
    .map(([family, row]) => ({
      family,
      label: LABELS[family] ?? titleCaseSlug(family),
      slugs: [...row.slugs].sort(),
      levels: LEVEL_ORDER.filter((level) => row.levels.has(level)),
    }))
    .sort((a, b) => {
      const rank = (s: PublishedSubject) => {
        const index = SUBJECT_ORDER.indexOf(s.label);
        return index === -1 ? SUBJECT_ORDER.length : index;
      };
      return rank(a) - rank(b) || a.label.localeCompare(b.label);
    });
}

/** Every subject that currently has at least one public topic page. */
export const PUBLISHED_SUBJECTS: PublishedSubject[] = build();

/** "A, B and C" — the house list style (no Oxford comma, "and" before the last). */
function joinAnd(items: string[]): string {
  if (items.length <= 1) return items[0] ?? "";
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

/** "IGCSE, AS and A2" for the given level codes. */
export function levelPhrase(levels: string[]): string {
  const present = LEVEL_ORDER.filter((level) => levels.includes(level)).map((level) => LEVEL_WORDS[level]);
  const unique = present.filter((word, index) => present.indexOf(word) === index);
  return joinAnd(unique.length ? unique : ["IGCSE", "AS", "A2"]);
}

/** "Maths, Physics, Chemistry, Biology, Computer Science and English". */
export function subjectList(): string {
  const labels = PUBLISHED_SUBJECTS.map((subject) => subject.label);
  return labels.length ? joinAnd(labels) : "every subject";
}

/**
 * The full claim, with the levels each subject is actually taught at:
 * "Maths, Physics, Chemistry, Biology and Computer Science at IGCSE, AS and A2,
 * and English at IGCSE".
 *
 * The grouping is the point. English has no AS or A2 course, and saying
 * "English at IGCSE, AS and A2" is a claim a visitor can disprove in one click
 * — the kind of inaccuracy that costs trust (and, in a FAQ answer Google reads
 * as structured data, is just wrong).
 */
export function subjectCoverage(): string {
  const groups: { levels: string[]; labels: string[] }[] = [];
  for (const subject of PUBLISHED_SUBJECTS) {
    const signature = subject.levels.join(",");
    const group = groups.find((g) => g.levels.join(",") === signature);
    if (group) group.labels.push(subject.label);
    else groups.push({ levels: subject.levels, labels: [subject.label] });
  }
  if (!groups.length) return "every subject at IGCSE, AS and A2";

  // Widest coverage first, so the broad clause leads and the narrower one
  // ("… and English at IGCSE") closes the sentence.
  groups.sort((a, b) => b.levels.length - a.levels.length);

  const clauses = groups.map((group) => `${joinAnd(group.labels)} at ${levelPhrase(group.levels)}`);
  if (clauses.length === 1) return clauses[0];
  return `${clauses.slice(0, -1).join(", ")}, and ${clauses[clauses.length - 1]}`;
}
