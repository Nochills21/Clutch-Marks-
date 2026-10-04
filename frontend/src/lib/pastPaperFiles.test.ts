import { describe, expect, it } from "vitest";
import {
  archiveBoard,
  archivePaperGroup,
  archivePaperKeys,
  boardLabel,
  filterArchivePapers,
  matchPaperFiles,
  parsePaperFileName,
  paperSortKey,
  sortSessions,
  type ArchivePaper,
} from "./pastPaperFiles";

const maths = (id: string, year: number, session: string): ArchivePaper => ({
  id,
  title: "Cambridge IGCSE Maths 0580 — Paper 2: Extended (0580/22)",
  year,
  session,
  paper_number: "Paper 2 (22)",
});

const cs = (id: string, year: number, session: string): ArchivePaper => ({
  id,
  title: "Cambridge IGCSE Computer Science 0478 — Paper 1: Computer Systems (0478/12)",
  year,
  session,
  paper_number: "Paper 1 (12)",
});

const edexcel = (id: string, year: number, session: string): ArchivePaper => ({
  id,
  title: "Edexcel IAL Maths — Pure Mathematics P2 (WMA12/01)",
  year,
  session,
  paper_number: "Paper 2 (21)",
});

describe("parsePaperFileName", () => {
  it("reads a Cambridge question paper", () => {
    const parsed = parsePaperFileName("0580_s24_qp_22.pdf");
    expect(parsed).toMatchObject({
      code: "0580",
      paperToken: "22",
      year: 2024,
      session: "May/June",
      kind: "paper",
    });
  });

  it("reads a Cambridge mark scheme in the October session", () => {
    const parsed = parsePaperFileName("0478_w23_ms_12.pdf");
    expect(parsed).toMatchObject({ code: "0478", paperToken: "12", year: 2023, session: "Oct/Nov", kind: "mark_scheme" });
  });

  it("reads an Edexcel IAL question paper dated by day", () => {
    const parsed = parsePaperFileName("WMA12_01_que_20240118.pdf");
    expect(parsed).toMatchObject({ code: "WMA12", paperToken: "01", year: 2024, session: "Feb/Mar", kind: "paper" });
  });

  it("reads an Edexcel mark scheme", () => {
    const parsed = parsePaperFileName("WMA12_01_msc_20240307.pdf");
    expect(parsed).toMatchObject({ code: "WMA12", paperToken: "01", year: 2024, kind: "mark_scheme" });
  });

  it("tolerates noisy names (spaces, version suffixes, capitals)", () => {
    const parsed = parsePaperFileName("0580 S24 QP 22 v2.pdf");
    expect(parsed).toMatchObject({ code: "0580", paperToken: "22", year: 2024, session: "May/June", kind: "paper" });
  });

  it("does not mistake the year for the syllabus code", () => {
    const parsed = parsePaperFileName("0625_s21_qp_42.pdf");
    expect(parsed.code).toBe("0625");
    expect(parsed.year).toBe(2021);
  });
});

describe("archivePaperKeys", () => {
  it("takes the code and paper from the title parenthetical", () => {
    expect(archivePaperKeys(maths("a", 2024, "May/June"))).toEqual({ code: "0580", paperToken: "22" });
  });

  it("falls back to the digits in paper_number", () => {
    const row: ArchivePaper = {
      id: "b", title: "Cambridge IGCSE Physics 0625 — Paper 4", year: 2024, session: "May/June", paper_number: "Paper 4 (42)",
    };
    expect(archivePaperKeys(row)).toEqual({ code: "0625", paperToken: "42" });
  });
});

describe("matchPaperFiles", () => {
  const rows = [
    maths("m2023", 2023, "May/June"),
    maths("m2024", 2024, "May/June"),
    cs("cs2023", 2023, "Oct/Nov"),
    edexcel("edx2024", 2024, "Feb/Mar"),
  ];

  it("picks the exact year when the archive holds several", () => {
    const [match] = matchPaperFiles(["0580_s24_qp_22.pdf"], rows);
    expect(match.status).toBe("ready");
    expect(match.row?.id).toBe("m2024");
  });

  it("marks a file with no year as ambiguous instead of guessing", () => {
    const [match] = matchPaperFiles(["0580_qp_22.pdf"], rows);
    expect(match.status).toBe("ambiguous");
    expect(match.row).toBeNull();
    expect(match.candidates.map((c) => c.id).sort()).toEqual(["m2023", "m2024"]);
  });

  it("matches mark schemes to the same paper row", () => {
    const [match] = matchPaperFiles(["0478_w23_ms_12.pdf"], rows);
    expect(match.row?.id).toBe("cs2023");
    expect(match.file.kind).toBe("mark_scheme");
  });

  it("refuses a paper whose number disagrees with the row", () => {
    const [match] = matchPaperFiles(["0580_s24_qp_12.pdf"], rows);
    expect(match.status).toBe("unmatched");
  });

  it("reports files with no recognisable code", () => {
    const [match] = matchPaperFiles(["scan-2024-notes.pdf"], rows);
    expect(match.status).toBe("unmatched");
    expect(match.reason).toMatch(/code/i);
  });

  it("matches Edexcel code + paper", () => {
    const [match] = matchPaperFiles(["WMA12_01_que_20240118.pdf"], rows);
    expect(match.status).toBe("ready");
    expect(match.row?.id).toBe("edx2024");
  });

  it("keeps each file independent", () => {
    const results = matchPaperFiles(["0580_s24_qp_22.pdf", "0478_w23_qp_12.pdf"], rows);
    expect(results.map((r) => r.row?.id)).toEqual(["m2024", "cs2023"]);
  });
});

describe("archiveBoard / archivePaperGroup", () => {
  it("reads the board from the title prefix", () => {
    expect(archiveBoard(maths("a", 2024, "May/June"))).toBe("Cambridge International");
    expect(archiveBoard(edexcel("b", 2024, "Feb/Mar"))).toBe("Pearson Edexcel");
  });

  it("falls back to the source link for board-less titles", () => {
    const row = { title: "Computer Science 9618 — Paper 1: Theory Fundamentals", source_url: "https://qualifications.pearson.com/x" };
    expect(archiveBoard(row)).toBe("Pearson Edexcel");
    expect(archiveBoard({ title: "Computer Science 9618 — Paper 1" })).toBe("Cambridge International");
  });

  it("collapses numbered papers and keeps named modules", () => {
    expect(archivePaperGroup(maths("a", 2024, "May/June"))).toBe("Paper 2");
    expect(archivePaperGroup({ title: "Edexcel IAL Physics — Unit 3: Practical Skills in Physics I (WPH13/01)" })).toBe("Unit 3");
    expect(archivePaperGroup({ title: "Edexcel IAL Maths — Mechanics M1 (WME01/01)" })).toBe("Mechanics M1");
    expect(archivePaperGroup({ title: "Edexcel IAL Maths — Pure Mathematics P1 (WMA11/01)" })).toBe("Pure Mathematics P1");
  });
});

describe("paperSortKey / sortSessions", () => {
  it("orders papers, then units, then named modules", () => {
    const labels = ["Unit 2", "Mechanics M1", "Paper 10", "Paper 2", "Unit 1", "Pure Mathematics P1"];
    expect([...labels].sort((a, b) => paperSortKey(a).localeCompare(paperSortKey(b))))
      .toEqual(["Paper 2", "Paper 10", "Unit 1", "Unit 2", "Mechanics M1", "Pure Mathematics P1"]);
  });

  it("orders sessions by the board calendar with specimens last", () => {
    const sessions = ["Specimen", "Oct/Nov", "May/June", "Feb/Mar", "Other"];
    expect([...sessions].sort(sortSessions)).toEqual(["Feb/Mar", "May/June", "Oct/Nov", "Specimen", "Other"]);
  });
});

describe("filterArchivePapers", () => {
  const rows = [
    maths("m2024", 2024, "May/June"),
    maths("m2023", 2023, "Oct/Nov"),
    cs("cs2023", 2023, "Oct/Nov"),
    edexcel("edx2024", 2024, "Feb/Mar"),
    { id: "spec", title: "Cambridge IGCSE Maths 0580 — Paper 1: Core (0580/12)", year: 2024, session: "Specimen", paper_number: "Paper 1 (12)" },
  ];

  it("filters by board, paper and session", () => {
    expect(filterArchivePapers(rows, { board: "Pearson Edexcel" }).map((r) => r.id)).toEqual(["edx2024"]);
    expect(filterArchivePapers(rows, { paper: "Paper 1" }).map((r) => r.id)).toEqual(["cs2023", "spec"]);
    expect(filterArchivePapers(rows, { session: "Oct/Nov" }).map((r) => r.id)).toEqual(["m2023", "cs2023"]);
  });

  it("matches the free-text query across title, paper, session and year", () => {
    expect(filterArchivePapers(rows, { search: "Specimen" }).map((r) => r.id)).toEqual(["spec"]);
    expect(filterArchivePapers(rows, { search: "2023" }).map((r) => r.id)).toEqual(["m2023", "cs2023"]);
    expect(filterArchivePapers(rows, { search: "wma12" }).map((r) => r.id)).toEqual(["edx2024"]);
  });

  it("combines filters without leaking rows", () => {
    expect(filterArchivePapers(rows, { board: "Cambridge International", session: "Oct/Nov" }).map((r) => r.id))
      .toEqual(["m2023", "cs2023"]);
    expect(filterArchivePapers(rows, { paper: "Paper 2", year: 2023 }).map((r) => r.id)).toEqual(["m2023"]);
  });

  it("finds an old/specimen row that sits past the free-preview slice", () => {
    // The bug: search used to run on the first FREE_PREVIEW_LIMIT rows only.
    // Filtering the whole list first must still surface a row far down it.
    const target = "Cambridge IGCSE Maths 0580 — Paper 1: Core (0580/12)";
    const manyRows = [
      ...Array.from({ length: 20 }, (_, i) => maths(`new${i}`, 2025, "May/June")),
      { id: "old-spec", title: target, year: 2019, session: "Specimen", paper_number: "Paper 1 (12)" },
    ];
    const firstTwo = manyRows.slice(0, 2);
    expect(firstTwo.some((r) => r.title === target)).toBe(false); // invisible to the old pipeline
    expect(filterArchivePapers(manyRows, { search: "specimen" }).map((r) => r.id)).toEqual(["old-spec"]);
  });
});

describe("boardLabel", () => {
  it("names the boards we link to", () => {
    expect(boardLabel("https://www.cambridgeinternational.org/programmes-and-qualifications/x/past-papers/")).toBe("Cambridge International");
    expect(boardLabel("https://qualifications.pearson.com/en/qualifications/x.html")).toBe("Pearson Edexcel");
  });

  it("falls back to the host and tolerates junk", () => {
    expect(boardLabel("https://example.com/x")).toBe("example.com");
    expect(boardLabel(null)).toBeNull();
    expect(boardLabel("not a url")).toBeNull();
  });
});
