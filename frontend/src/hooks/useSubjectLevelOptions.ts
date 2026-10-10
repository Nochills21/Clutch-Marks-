// The list of selectable subject-levels ("Mathematics — IGCSE", ...).
//
// Shared by the picker dialog, the first-run gate, the "showing only your
// subjects" notice and the /subjects catalog. All of them need the same rows,
// so they share one React Query cache entry instead of issuing four identical
// requests.
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LEVEL_LABELS, type SubjectLevelCode } from "@/lib/subjects";

export interface SubjectLevelOption {
  /** subject_levels.id — the value stored in a student's picks. */
  id: string;
  /** "Mathematics — IGCSE", for checkboxes and messages. */
  label: string;
  subjectName: string;
  /** subjects.slug, as used by the /study/:slug/:level route. */
  subjectSlug: string;
  level: SubjectLevelCode;
  levelLabel: string;
}

export function useSubjectLevelOptions(enabled = true) {
  return useQuery({
    queryKey: ["subject-level-options"],
    enabled,
    queryFn: async (): Promise<SubjectLevelOption[]> => {
      const { data, error } = await supabase
        .from("subject_levels")
        .select("id, level, subjects(name, slug), is_active")
        .eq("is_active", true)
        .order("sort_order");
      if (error) throw error;
      return (data ?? []).map((l: any) => {
        const level = l.level as SubjectLevelCode;
        const subjectName = l.subjects?.name ?? "Subject";
        return {
          id: l.id,
          label: `${subjectName} — ${LEVEL_LABELS[level] ?? l.level}`,
          subjectName,
          subjectSlug: l.subjects?.slug ?? "",
          level,
          levelLabel: LEVEL_LABELS[level] ?? l.level,
        };
      });
    },
  });
}
