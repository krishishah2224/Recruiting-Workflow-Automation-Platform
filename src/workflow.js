import { rankContacts } from "./relevance.js";
import { createEmailDraft, createLinkedInNote } from "./messages.js";

export function prepareOutreach({ contacts, target, sender, limit = 10 }) {
  return rankContacts(contacts, target)
    .slice(0, limit)
    .map((contact) => ({
      contact: {
        name: contact.name,
        title: contact.title,
        company: target.company
      },
      relevance: {
        score: contact.score,
        reasons: contact.reasons
      },
      emailDraft: createEmailDraft(contact, target, sender),
      linkedInNote: createLinkedInNote(contact, target),
      status: "DRAFT_ONLY"
    }));
}
