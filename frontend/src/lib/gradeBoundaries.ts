// Indicative grade boundaries for marked work.
//
// CAIE publishes exact thresholds per paper per session and they move every
// sitting, so a marked script cannot state a real grade — but a student asking
// "am I going to be OK?" deserves more than a bare percent. These are the
// long-run IGCSE-grade landmarks, labelled indicative everywhere they appear.

export type IndicativeGrade = "A*" | "A" | "B" | "C" | "D" | "E" | "U";

const THRESHOLDS: { grade: IndicativeGrade; min: number }[] = [
  { grade: "A*", min: 90 },
  { grade: "A", min: 80 },
  { grade: "B", min: 70 },
  { grade: "C", min: 60 },
  { grade: "D", min: 50 },
  { grade: "E", min: 40 },
];

/** Indicative IGCSE grade for a 0–100 percent. Below 40 is unclassified. */
export function gradeForPercent(percent: number): IndicativeGrade {
  for (const t of THRESHOLDS) {
    if (percent >= t.min) return t.grade;
  }
  return "U";
}

/** "A* (indicative)" — the qualifier travels with the grade, never alone. */
export function indicativeGradeLabel(percent: number): string {
  return `${gradeForPercent(percent)} (indicative)`;
}
