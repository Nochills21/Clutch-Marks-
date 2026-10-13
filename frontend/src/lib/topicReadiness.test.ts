import { describe, expect, it } from "vitest";
import { topicReadiness, READINESS_LABEL } from "./topicReadiness";

describe("topicReadiness", () => {
  it("is not_started when nothing has been answered", () => {
    expect(topicReadiness({ total_questions: 10, answered: 0, correct: 0 })).toBe("not_started");
  });

  it("is working_on_it when coverage is below 80%, even with perfect accuracy", () => {
    expect(topicReadiness({ total_questions: 10, answered: 7, correct: 7 })).toBe("working_on_it");
  });

  it("is working_on_it when coverage is high but accuracy is below 80%", () => {
    expect(topicReadiness({ total_questions: 10, answered: 10, correct: 7 })).toBe("working_on_it");
  });

  it("is exam_ready at exactly 80% coverage and 80% accuracy", () => {
    expect(topicReadiness({ total_questions: 10, answered: 8, correct: 7 })).toBe("exam_ready");
  });

  it("is exam_ready when the whole bank is answered at high accuracy", () => {
    expect(topicReadiness({ total_questions: 12, answered: 12, correct: 11 })).toBe("exam_ready");
  });

  it("does not divide by zero for an empty bank", () => {
    expect(topicReadiness({ total_questions: 0, answered: 0, correct: 0 })).toBe("not_started");
  });

  it("has a label for every state", () => {
    expect(READINESS_LABEL.not_started).toBe("Not started");
    expect(READINESS_LABEL.working_on_it).toBe("Working on it");
    expect(READINESS_LABEL.exam_ready).toBe("Exam-ready");
  });
});
