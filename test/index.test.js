import { expect } from "chai";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { removeElements } from "../index.js";

describe("removeElements", function () {
  it("should remove elements", function () {
    const input = readFileSync(
      join("fixtures", "remove-element", "actual.xml")
    ).toString();
    const expected = readFileSync(
      join("fixtures", "remove-element", "expected.xml")
    ).toString();
    expect(removeElements(input, ["listViews"])).to.deep.equal(expected);
  it("should remove elements for Profiles", function () {
    const input = readFileSync(
      join("fixtures", "remove-element2", "actual.xml"),
      "utf8"
    ).toString();
    const expected = readFileSync(
      join("fixtures", "remove-element2", "expected.xml"),
      "utf8"
    ).toString();
    expect(
      removeElements(input, [
        "classAccesses",
        "fieldPermissions",
        "objectPermissions",
        "pageAccesses",
        "tabVisibilities",
        "userPermissions",
      ])
    ).to.deep.equal(expected);
  });
});
