const STOP_WORDS = new Set([
  "and", "associate", "consultant", "entry", "english", "level", "program",
  "sales", "the", "with"
]);

function tokens(value = "") {
  return new Set(
    value
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, " ")
      .split(/\s+/)
      .filter((token) => token.length > 2 && !STOP_WORDS.has(token))
  );
}

function overlap(left, right) {
  return [...left].filter((token) => right.has(token));
}

export function scoreContact(contact, target) {
  const reasons = [];
  let score = 0;

  const schools = (contact.education ?? []).map((school) => school.toLowerCase());
  if (schools.some((school) => school.includes(target.alumniSchool.toLowerCase()))) {
    score += 40;
    reasons.push(`${target.alumniSchool} alumni`);
  }

  const roleOverlap = overlap(tokens(contact.title), tokens(target.role));
  if (roleOverlap.length) {
    score += Math.min(35, roleOverlap.length * 12);
    reasons.push(`role overlap: ${roleOverlap.join(", ")}`);
  }

  if (
    target.division &&
    (contact.division ?? "").toLowerCase().includes(target.division.toLowerCase())
  ) {
    score += 25;
    reasons.push(`${target.division} division`);
  }

  if (["manager", "director", "partner", "lead"].some((level) =>
    (contact.title ?? "").toLowerCase().includes(level)
  )) {
    score += 10;
    reasons.push("experienced team leader");
  }

  return { score, reasons };
}

export function rankContacts(contacts, target) {
  return contacts
    .map((contact) => ({ ...contact, ...scoreContact(contact, target) }))
    .filter((contact) => contact.score > 0)
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
}
