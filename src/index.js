import { readFile } from "node:fs/promises";
import { prepareOutreach } from "./workflow.js";

const inputPath = process.argv[2] ?? "examples/contacts.json";
const input = JSON.parse(await readFile(inputPath, "utf8"));
const drafts = prepareOutreach(input);

console.log(JSON.stringify(drafts, null, 2));
