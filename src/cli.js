#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { removeElements, removeElementsMatching, replaceTagValue } from "./index.js";

const help = `metadata-xml-tool.

Usage:
	metadata-xml-tool [options] <command>

Commands:
	remove-element <element> [file]...
	remove-element-matching <element> <expression> [file]...
	replace-tag-value <tag> <expression> <new_value> [file]...

Options:
	-h --help	Show help`;

const args = process.argv.slice(2);

if (args.length === 0 || args[0] === "-h" || args[0] === "--help") {
  console.log(help);
  process.exit(args.length === 0 ? 1 : 0);
}

const [command, ...rest] = args;

function processFiles(files, transform) {
  for (const file of files) {
    const content = readFileSync(file, "utf8");
    writeFileSync(file, transform(content));
  }
}

if (command === "remove-element") {
  const [element, ...files] = rest;
  if (!element || files.length === 0) {
    console.log(help);
    process.exit(1);
  }
  processFiles(files, (xml) => removeElements(xml, [element]));
} else if (command === "remove-element-matching") {
  const [element, expression, ...files] = rest;
  if (!element || !expression || files.length === 0) {
    console.log(help);
    process.exit(1);
  }
  processFiles(files, (xml) => removeElementsMatching(xml, element, expression));
} else if (command === "replace-tag-value") {
  const [tag, oldValue, newValue, ...files] = rest;
  if (!tag || !oldValue || !newValue || files.length === 0) {
    console.log(help);
    process.exit(1);
  }
  processFiles(files, (xml) => replaceTagValue(xml, tag, oldValue, newValue));
} else {
  console.log(help);
  process.exit(1);
}
