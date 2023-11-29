import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { cpSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, it } from "node:test";

const CLI = new URL("../src/cli.js", import.meta.url).pathname;

function run(...args) {
  return spawnSync(process.execPath, [CLI, ...args], { encoding: "utf8" });
}

function fixture(name) {
  const dir = mkdtempSync(join(tmpdir(), "metadata-xml-tool-"));
  cpSync(`fixtures/${name}`, dir, { recursive: true });
  return dir;
}

describe("metadata-xml-tool CLI", () => {
  it("prints help with -h", () => {
    const result = run("-h");
    assert.equal(result.status, 0);
    assert.match(result.stdout, /Usage/);
    assert.match(result.stdout, /Options/);
  });

  it("prints help with --help", () => {
    const result = run("--help");
    assert.equal(result.status, 0);
    assert.match(result.stdout, /Usage/);
    assert.match(result.stdout, /Options/);
  });

  it("remove-element", () => {
    const dir = fixture("remove-element");
    const result = run("remove-element", "listViews", join(dir, "actual.xml"));
    assert.equal(result.status, 0);
    execFileSync("diff", ["-u", join(dir, "expected.xml"), join(dir, "actual.xml")]);
  });

  it("remove-element-matching", () => {
    const dir = fixture("remove-element-matching");
    const result = run(
      "remove-element-matching",
      "listViews",
      "<fullName>Ideas_Last_7_Days</fullName>",
      join(dir, "actual.xml"),
    );
    assert.equal(result.status, 0);
    execFileSync("diff", ["-u", join(dir, "expected.xml"), join(dir, "actual.xml")]);
  });

  it("replace-tag-value", () => {
    const dir = fixture("replace-tag-value");
    const result = run(
      "replace-tag-value",
      "runningUser",
      "user@example.com",
      "user2@example.com",
      join(dir, "actual.xml"),
    );
    assert.equal(result.status, 0);
    execFileSync("diff", ["-u", join(dir, "expected.xml"), join(dir, "actual.xml")]);
  });
});
