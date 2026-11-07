# Contributing to Avsar 🎓

Thank you for your interest in contributing to **Avsar** — the scholarship eligibility platform for students across India!

This document outlines how to contribute to the project effectively.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Scholarship Data Standards](#scholarship-data-standards)
- [Commit Convention](#commit-convention)
- [Pull Request Process](#pull-request-process)

---

## Code of Conduct

This project is built to serve students — please be respectful, constructive, and accurate. Incorrect scholarship data can mislead students making important educational decisions.

---

## How to Contribute

### 🐛 Reporting Bugs

Open a [GitHub Issue](https://github.com/avishrey-beep/AVVSAR/issues) with:
- Description of the problem
- Steps to reproduce
- Expected vs. actual behavior
- Browser + OS details

### 📚 Adding or Updating Scholarships

Before adding a scholarship to `script.js`, verify:
1. **Official source** — link to Ministry/AICTE/UGC portal
2. **Active cycle** — confirm the scheme is active for 2026–27
3. **Income ceiling** — exact figure in INR per annum
4. **Document list** — mandatory documents from official guidelines

### 💬 Improving Saathi Responses

Saathi's rule engine lives in the `SAATHI_RULES` array inside `script.js`. Add rules for common, unanswered questions students ask about the scholarship process.

---

## Development Setup

```bash
# Clone the repository
git clone https://github.com/avishrey-beep/AVVSAR.git
cd AVVSAR

# Start the local development server
node server.js

# Open http://localhost:3000 in your browser
# Run the test suite at http://localhost:3000/test.html
```

---

## Scholarship Data Standards

Each scholarship object in the `SCHOLARSHIPS` array must conform to this schema:

```js
{
  id: "unique-kebab-case-id",          // globally unique, no spaces
  name: "Full Official Scheme Name",   // exact name from government portal
  provider: "Ministry / Body Name",    // issuing ministry or institution
  type: "need" | "merit" | "both",    // classification
  levels: ["ug", "pg", ...],           // education levels
  categories: ["sc", "st", ...],       // eligible categories
  minScore: 0,                          // minimum % (0 = no requirement)
  maxIncome: 250000,                    // INR per year (0 = not applicable)
  gender: "any" | "female" | "male",
  states: "all" | ["UP", "MH", ...],  // ISO state codes
  amount: "Rs. X / year",              // human-readable award amount
  deadline: "DD Mon",                   // display deadline string
  documents: ["Document 1", ...],      // sorted by acquisition difficulty
  steps: ["Step 1...", ...]            // ordered application steps
}
```

---

## Commit Convention

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(catalog): add <scheme name> scholarship
fix(saathi): correct income rule for <scheme>
docs(readme): update deployment architecture
style(nav): improve mobile hamburger animation
test(logic): add boundary check for zero-income
ci(actions): add asset verification step
```

---

## Pull Request Process

1. Fork the repository and create a branch: `git checkout -b feat/scholarship-name`
2. Make your changes and verify syntax: `node --check script.js documents.js`
3. Run the test suite locally at `http://localhost:3000/test.html`
4. Submit a pull request with a clear description of what changed and why

---

<div align="center">

Made with ❤️ for students — every scholarship matters.

</div>