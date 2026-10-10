import { describe, expect, it } from "vitest";
import { paperGroupsOf, relatedTopicPapers } from "./topicPapers";

const row = (id: string, title: string, paper_number: string | null, topic_id: string | null = null) => ({
  id,
  title,
  year: 2024,
  session: "May/June",
  paper_number,
  topic_id,
});

describe("paperGroupsOf", () => {
  it("collapses variants to Paper 1 / Paper 2 in calendar order", () => {
    const groups = paperGroupsOf([
      row("a", "Cambridge IGCSE Maths 0580 — Paper 2: Extended (0580/22)", "Paper 2 (22)"),
      row("b", "Cambridge IGCSE Maths 0580 — Paper 1: Core (0580/12)", "Paper 1 (12)"),
    ]);
    expect(groups).toEqual(["Paper 1", "Paper 2"]);
  });
});

describe("relatedTopicPapers", () => {
  const levelPapers = [
    row("p1a", "Maths 0580 — Paper 1: Core (0580/12)", "Paper 1 (12)", "t-paper1"),
    row("p1b", "Maths 0580 — Paper 1: Core (0580/12)", "Paper 1 (12)", "t-other"),
    row("p2a", "Maths 0580 — Paper 2: Extended (0580/22)", "Paper 2 (22)", "t-paper2"),
  ];

  it("returns the topic's paper group across the whole level (Paper 1 lesson sees all Paper 1 papers)", () => {
    const { papers, groups, filtered } = relatedTopicPapers("t-paper1", levelPapers, levelPapers);
    expect(filtered).toBe(true);
    expect(groups).toEqual(["Paper 1"]);
    expect(papers.map((p) => p.id).sort()).toEqual(["p1a", "p1b"]);
    // The Paper 2 row must not leak into a Paper 1 lesson.
    expect(papers.some((p) => p.id === "p2a")).toBe(false);
  });

  it("falls back to the full level set when the topic has no tagged papers", () => {
    const { papers, filtered } = relatedTopicPapers("t-unknown", levelPapers, levelPapers);
    expect(filtered).toBe(false);
    expect(papers).toHaveLength(3);
  });

  it("keeps mechanics-style named groups separate from numbered papers", () => {
    const papers = [
      row("m1", "Maths WME01 — Mechanics M1 (WME01/01)", "Paper 1 (01)", "t-mech"),
      row("p1", "Maths 0580 — Paper 1: Core (0580/12)", "Paper 1 (12)", "t-other"),
    ];
    const { papers: rel } = relatedTopicPapers("t-mech", papers, papers);
    expect(rel.map((p) => p.id)).toEqual(["m1"]);
  });
});
