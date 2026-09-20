import {
  Sigma, Atom, Cpu, BookOpen, FlaskConical, Globe, Landmark, Calculator,
  Microscope, PenTool, Languages, Music, Palette, Dna, LineChart, Code,
  type LucideIcon,
} from "lucide-react";

export const SUBJECT_ICONS: Record<string, LucideIcon> = {
  Sigma, Atom, Cpu, BookOpen, FlaskConical, Globe, Landmark, Calculator,
  Microscope, PenTool, Languages, Music, Palette, Dna, LineChart, Code,
};

export const SUBJECT_ICON_NAMES = Object.keys(SUBJECT_ICONS);

export function subjectIcon(name?: string | null): LucideIcon {
  return (name && SUBJECT_ICONS[name]) || BookOpen;
}

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

export const SUBJECT_COLORS = ["primary", "purple", "cyan", "green", "amber", "pink"] as const;

export function subjectAccent(color?: string | null) {
  switch (color) {
    case "purple":
      return { text: "text-[hsl(var(--neon-purple))]", border: "border-[hsl(var(--neon-purple)/0.25)]", bg: "bg-[hsl(var(--neon-purple)/0.08)]" };
    case "cyan":
      return { text: "text-[hsl(var(--neon-cyan))]", border: "border-[hsl(var(--neon-cyan)/0.25)]", bg: "bg-[hsl(var(--neon-cyan)/0.08)]" };
    case "green":
      return { text: "text-emerald-500", border: "border-emerald-500/25", bg: "bg-emerald-500/10" };
    case "amber":
      return { text: "text-amber-500", border: "border-amber-500/25", bg: "bg-amber-500/10" };
    case "pink":
      return { text: "text-pink-500", border: "border-pink-500/25", bg: "bg-pink-500/10" };
    default:
      return { text: "text-primary", border: "border-primary/25", bg: "bg-primary/10" };
  }
}
