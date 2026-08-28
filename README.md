# Recruiting Outreach Automation

A privacy-first workflow that turns a target role and a list of professional contacts into ranked networking prospects and personalized outreach drafts.

I built this project to make high-volume recruiting outreach more thoughtful, consistent, and auditable. The system prioritizes contacts using transparent criteria, explains every recommendation, and prepares messages for human review. It never sends outreach automatically.

## What it demonstrates

- Translating an unstructured recruiting process into a repeatable workflow
- Ranking contacts by alumni connection, role similarity, division, and seniority
- Generating personalized email drafts and LinkedIn connection notes
- Enforcing a 300-character limit for LinkedIn notes
- Keeping a human approval step before any external communication
- Protecting personal information with fictional sample data and ignored output files

## Workflow

1. Define the company, role, division, alumni school, and area of interest.
2. Add candidate contacts gathered from approved sources.
3. Score each contact with transparent, explainable rules.
4. Rank the strongest matches.
5. Generate an email draft and LinkedIn note for each contact.
6. Review, personalize, and send manually outside the application.

## Quick start

Requires Node.js 20 or newer. No third-party packages are needed.

```bash
npm test
npm run demo
```

The demo reads `examples/contacts.json` and prints ranked outreach drafts as JSON.

## Project structure

```text
examples/contacts.json    Fictional input data
src/relevance.js          Explainable contact scoring
src/messages.js           Personalized draft generation and safeguards
src/workflow.js           Ranking and draft orchestration
src/index.js              Command-line demo
test/workflow.test.js     Behavioral tests
```

## Design decisions

### Explainability over black-box ranking

Every score includes human-readable reasons. A user can see whether a contact was selected because of a shared school, matching role, relevant division, or leadership experience.

### Human approval by default

Every output is labeled `DRAFT_ONLY`. The project intentionally contains no email or LinkedIn sending function. This keeps the user responsible for the final message and prevents accidental outreach.

### Privacy by design

The repository contains only fictional contacts. Real names, email addresses, profile links, spreadsheets, credentials, resumes, and outreach histories are excluded.

## Potential extensions

- Import approved contact data from a CRM or spreadsheet
- Export reviewed drafts into a structured tracker
- Add duplicate detection and follow-up reminders
- Add configurable scoring weights and role-specific templates
- Add an approval dashboard with audit history

## Author

Krishi Shah

Built as a portfolio demonstration of workflow automation, structured decision-making, and responsible AI-assisted recruiting operations.
