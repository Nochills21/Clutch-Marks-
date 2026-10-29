import { describe, expect, it } from "vitest";
import { uniqueTopicPrefix } from "./topicLookup";

const topics = [
  { slug: "databases-and-data-definition", name: "Databases and Data Definition" },
  { slug: "data-types-and-file-organisation", name: "Data Types and File Organisation" },
  { slug: "networks-and-the-internet", name: "Networks and the Internet" },
];

describe("uniqueTopicPrefix", () => {
  it("resolves a shortened slug to the one topic it can mean", () => {
    expect(uniqueTopicPrefix(topics, "databases")?.slug).toBe("databases-and-data-definition");
  });

  it("refuses when a prefix is ambiguous", () => {
    // "dat" starts both `databases-…` and `data-types-…`.
    expect(uniqueTopicPrefix(topics, "dat")).toBeNull();
  });

  it("does not match a slug that only starts with the same letters", () => {
    expect(uniqueTopicPrefix(topics, "net")).toBeNull();
    expect(uniqueTopicPrefix(topics, "networks")).not.toBeNull();
  });

  it("returns null for nothing and for a full slug", () => {
    expect(uniqueTopicPrefix(topics, "")).toBeNull();
    expect(uniqueTopicPrefix(topics, "databases-and-data-definition")).toBeNull();
  });

  it("falls back to the name when a row has no slug", () => {
    const legacy = [{ slug: null, name: "Cell Structure" }];
    expect(uniqueTopicPrefix(legacy, "cell")).toBe(legacy[0]);
  });
});
