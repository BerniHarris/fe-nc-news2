import { expect } from "vitest";
import { toTitleCase } from "./utils";

describe("toTitleCase()", () => {
  test("returns a lowercase string in title case", () => {
    expect(toTitleCase("lowercase")).toBe("Lowercase");
  });
  test("returns a uppercase string in title case", () => {
    expect(toTitleCase("UPPERCASE")).toBe("Uppercase");
  });
  test("returns a mixed case string in title case", () => {
    expect(toTitleCase("JumBBbbLYcaase")).toBe("Jumbbbblycaase");
  });
});
