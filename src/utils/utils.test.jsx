import { expect } from "vitest";
import { formattedDate, toTitleCase, isoStringToDDMMYYYY } from "./utils";

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

describe("formattedDate()", () => {
  test("returns a full date when passed an isoString", () => {
    expect(formattedDate("2020-05-26T19:06:00.000Z")).toBe(
      "Tuesday, 26 May 2020",
    );
  });
  test("returns a full date when passed an isoString without the time", () => {
    expect(formattedDate("2020-05-26")).toBe("Tuesday, 26 May 2020");
  });
  test("returns a full date when passed an isoString without the time and divided by slashes", () => {
    expect(formattedDate("2020/05/26")).toBe("Tuesday, 26 May 2020");
  });
  test("returns 'Invalid Date' when iso string is invalid", () => {
    expect(formattedDate("26/05/2020")).toBe("Invalid Date");
  });
});

describe("isoStringToDDMMYYYY()", () => {
  test("returns correct date formmatted DD/MM/YYYY when passed an isoString", () => {
    expect(isoStringToDDMMYYYY("2020-05-26T19:06:00.000Z")).toBe("26/05/2020");
  });
  test("returns correct date formmatted DD/MM/YYYY when passed isoString without the time", () => {
    expect(isoStringToDDMMYYYY("2020-05-26")).toBe("26/05/2020");
  });
  test("returns 'Invalid time value' when iso string is invalid", () => {
    expect(() => isoStringToDDMMYYYY("26/05/2020")).toThrow(
      "Invalid time value",
    );
  });
});
