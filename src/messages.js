function removeEmDashes(value) {
  return value.replaceAll("—", ",").replaceAll("–", "-");
}

function firstName(name) {
  return name.trim().split(/\s+/)[0];
}

function isAlumnus(contact, alumniSchool) {
  return (contact.education ?? []).some((school) =>
    school.toLowerCase().includes(alumniSchool.toLowerCase())
  );
}

export function createEmailDraft(contact, target, sender) {
  const alumni = isAlumnus(contact, target.alumniSchool);
  const sharedContext = alumni
    ? `I also noticed that we both attended ${target.alumniSchool}, which made me especially excited to reach out.`
    : `Your experience as ${contact.title} stood out to me, and I would really value your perspective.`;

  const body = `Hi ${firstName(contact.name)},

I hope you're doing well! My name is ${sender.name}, and I recently applied for the ${target.role} position at ${target.company}. ${sharedContext}

The more I learn about the role and ${target.company}, the more excited I am about the opportunity. I am especially interested in ${target.interest}, and I would love to hear how that shows up in the team's day-to-day work.

I know your schedule can get busy, but if you are open to a quick conversation, I would be very grateful to learn about your path at ${target.company} and any advice you may have for someone early in the recruiting process.

Thank you so much for your time and consideration!${alumni ? " Go Green!" : ""}

Best,
${sender.name}`;

  return {
    subject: `Interested in ${target.company}'s ${target.role} opportunity`,
    body: removeEmDashes(body)
  };
}

export function createLinkedInNote(contact, target) {
  const alumni = isAlumnus(contact, target.alumniSchool);
  const context = alumni
    ? ` and noticed we both attended ${target.alumniSchool}`
    : " and came across your profile";

  const preferred = `Hi ${firstName(contact.name)}, I recently applied for the ${target.role} role at ${target.company}${context}. I'd love to hear about your experience and any advice you may have. Would you be open to a quick chat?`;
  const fallback = `Hi ${firstName(contact.name)}, I applied for the ${target.role} role at ${target.company}${context}. I'd value hearing about your experience. Would you be open to a quick chat?`;
  const note = preferred.length <= 300 ? preferred : fallback;

  if (note.length > 300) {
    throw new Error("LinkedIn note exceeds 300 characters");
  }

  return removeEmDashes(note);
}
