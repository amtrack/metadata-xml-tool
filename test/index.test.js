import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { removeElements } from "../src/index.js";

describe("removeElements", () => {
  it("should remove elements", () => {
    const input = readFileSync(join("fixtures", "remove-element", "actual.xml")).toString();
    const expected = readFileSync(join("fixtures", "remove-element", "expected.xml")).toString();
    assert.equal(removeElements(input, ["listViews"]), expected);
  });

  it("should remove elements for Profiles", () => {
    const input = readFileSync(join("fixtures", "remove-element2", "actual.xml"), "utf8");
    const expected = readFileSync(join("fixtures", "remove-element2", "expected.xml"), "utf8");
    assert.equal(
      removeElements(input, [
        "classAccesses",
        "fieldPermissions",
        "objectPermissions",
        "pageAccesses",
        "tabVisibilities",
        "userPermissions",
      ]),
      expected,
    );
  });
});
