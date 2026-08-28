import test from "node:test";
import assert from "node:assert/strict";
import { scoreContact } from "../src/relevance.js";
import { createEmailDraft, createLinkedInNote } from "../src/messages.js";
import { prepareOutreach } from "../src/workflow.js";

const target = {
  company: "Northstar Consulting",
  role: "Entry Level Strategy Consultant",
  division: "Strategy",
  alumniSchool: "Michigan State University",
  interest: "data-driven problem solving"
};

const contact = {
  name: "Jordan Lee",
  title: "Strategy Consultant",
  division: "Strategy",
  education: ["Michigan State University"]
};

test("scores alumni and role relevance transparently", () => {
  const result = scoreContact(contact, target);
  assert.ok(result.score >= 65);
  assert.ok(result.reasons.includes("Michigan State University alumni"));
});

test("keeps LinkedIn notes under 300 characters and removes em dashes", () => {
  const note = createLinkedInNote(contact, target);
  assert.ok(note.length <= 300);
  assert.equal(note.includes("—"), false);
});

test("creates a personalized email draft without an em dash", () => {
  const draft = createEmailDraft(contact, target, { name: "Krishi Shah" });
  assert.match(draft.body, /Go Green!/);
  assert.equal(draft.body.includes("—"), false);
});

test("workflow only returns drafts and never sends outreach", () => {
  const [result] = prepareOutreach({
    contacts: [contact],
    target,
    sender: { name: "Krishi Shah" }
  });
  assert.equal(result.status, "DRAFT_ONLY");
});
