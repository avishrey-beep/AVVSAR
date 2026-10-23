<div align="center">

# 🎓 Avsar <span style="font-weight:normal">(अवसर)</span>

### *Find the scholarship that's already looking for you*

**एक अवसर, हज़ार संभावनाएं** — *one opportunity, a thousand possibilities*

[![Live Demo](https://img.shields.io/badge/🔗_Live_Demo-avishrey--beep.github.io-6C5CE7?style=for-the-badge)](https://avishrey-beep.github.io/AVVSAR/)
[![Deploy to GitHub Pages](https://github.com/avishrey-beep/AVVSAR/actions/workflows/deploy.yml/badge.svg)](https://github.com/avishrey-beep/AVVSAR/actions/workflows/deploy.yml)
[![GitHub Pages](https://img.shields.io/badge/Hosted_on-GitHub_Pages-222222?style=for-the-badge&logo=github)](https://pages.github.com/)
[![Status](https://img.shields.io/badge/Status-Active_Prototype-2ECC71?style=for-the-badge)]()
[![Privacy](https://img.shields.io/badge/Privacy-100%25_Client--Side-blue?style=for-the-badge)]()

</div>

---

## ✨ What is Avsar?

> Every year, thousands of scholarships across India go **unclaimed** — not because students aren't eligible, but because they **never hear about them**.

**Avsar** is a front-end platform that flips the script: instead of making students hunt through endless generic PDFs or confusing portals, it checks their *exact* profile — education stage, category, academic score, family income bracket, and state of domicile — against real eligibility rules and instantly delivers a personalized **Opportunity Passbook**.

Alongside the passbook sits **Saathi**, a bilingual (Hindi/English) conversational companion that resolves real-world application dilemmas in plain language.

---

## 🧭 Core Architectural Pillars

```
┌────────────────────────────────────────────────────────────────────────┐
│                          AVSAR CLIENT ENGINE                           │
├──────────────────┬───────────────────┬─────────────────────────────────┤
│  1. AUTH GATE    │ 2. MATCH ENGINE   │ 3. RADAR & ROADMAP              │
│  - Passbook login│ - Stage & Category│ - Real-time deadline sorting    │
│  - Guest fallback│ - Income & Score  │ - Required document checklist   │
│  - Local storage │ - Need vs Merit   │ - Opportunity Graph (SVG)       │
└──────────────────┴───────────────────┴─────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   SAATHI CONVERSATIONAL ADVISOR                        │
│   - Bilingual rule-based reasoning engine                              │
│   - Step-by-step guidance on certificates, portals, & deadlines        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Key Features

### 📱 Mobile-First Navigation & Document Visibility
- **Upward-Direction Quick Navigation Bar**: Positioned immediately adjacent to the Avsar brand header on desktop, and rendered as a sticky horizontal quick-pill bar directly under the header on phones for instant one-tap access to the Document Centre and Scholarship Finder.
- **Scrollspy Dynamic Indicator**: Active pills update in real-time as users scroll through the eligibility checker, how it works, and Saathi sections.
- **Accessible Hamburger Drawer**: Seamlessly reveals Documents Guide, Saathi Assistant, and Scholarship Checker on mobile screens.
- **Touch & Keyboard Compliant**: Supports escape key dismiss, ARIA states, and viewport auto-reset.
### 1. 🔐 Interactive Student Opportunity Passbook
- Instant browser-based session initialization with personalized passbook UI.
- Fast guest mode fallback without requiring registration.
- Local state persistence ensures data remains private and confidential.

### 2. 🎯 Precision Eligibility Engine
- Evaluates scholarships across **6 education levels** (*Class 10 through PhD*).
- Supports all demographic reservations (*General, OBC, SC, ST, EWS, Minority*).
- Dynamic filtering across merit requirements, household income ceilings, gender, and state/UT quotas.
- Balanced 3-column ledger layout grouping stage, category, and state with eligibility criteria without grid gaps.

### 3. ⏱️ Deadline Radar
- Real-time urgency calculation for active application cycles.
- Categorized badges for immediate action (*Closing soon, Next 30 days, Open*).

### 4. 📂 Document Intelligence & Locker
- Deduplicates document requirements across all matched scholarships.
- Dynamic progress tracker calculating preparation completion percentage.
- Interactive checkboxes to mark arranged documents in real time.

### 5. 🌐 Interactive Opportunity Graph
- Vector-rendered SVG visualizer connecting each scholarship to high-impact future milestones.
- Maps pathways into summer internships, industry jobs, or research fellowships.

### 6. 💬 Saathi Bilingual Advisor
- Quick-response intelligence addressing common document and verification hurdles:
  - *Income certificate rules for agricultural households*
  - *School/College verification protocols on the National Scholarship Portal (NSP)*
  - *What to do when missing a state portal cutoff*

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Structure** | Semantic HTML5 with accessibility attributes |
| **Styling** | Modern CSS3 (CSS Variables, Flexbox, Grid, Glassmorphism) |
| **Logic** | Vanilla ES6+ JavaScript (Zero external framework dependencies) |
| **Graphics** | Dynamic SVG (Vector network diagrams & passbook stamps) |
| **Storage** | Browser `localStorage` (No server-side telemetry or tracking) |
| **Deployment** | GitHub Pages static continuous delivery |

---


---

## 🌐 Production Deployment Architecture

Avsar is deployed as a high-reliability, zero-latency static single-page application and document intelligence vault on **GitHub Pages**:

- **Continuous Deployment Pipeline**: Triggered on every push to `main` using GitHub Actions (`.github/workflows/deploy.yml`).
- **Asset Isolation & Build Staging**: The workflow stages production-verified frontend assets (`index.html`, `documents.html`, `404.html`, `styles.css`, `script.js`, `documents.js`, `manifest.json`, `icon.svg`, `favicon.ico`, `robots.txt`, `sitemap.xml`, `.nojekyll`) into a sanitized `_site/` distribution bundle before artifact upload.
- **Backend & Database Protection**: The staging workflow guarantees that SQLite databases (`avsar.db`), spreadsheets, and development server files remain strictly internal and are never exposed over the public Pages CDN.
- **Sub-Route Resilience**: Custom `404.html` handles invalid paths and deep links with graceful countdown redirects and branded recovery navigation.
- **Crawler & Indexing Support**: Configured with production `robots.txt` and XML `sitemap.xml` referencing canonical URLs.
- **Favicon Integrity**: Multi-resolution `favicon.ico` and high-res vector `icon.svg` linked with standard alternate and touch-icon meta tags across all pages.

## 🏁 Quick Start & Local Development

```bash
# Clone the repository
git clone https://github.com/avishrey-beep/AVVSAR.git

# Navigate into the project directory
cd AVVSAR

# Open directly in any modern browser
# On Windows:
start index.html

# ...or run with a local static web server
npx serve .
```

---

## 📜 Disclaimer

Scholarship information presented within this prototype is illustrative and curated for educational and testing purposes. Always verify final application dates, quota criteria, and documentation on the respective official government and institutional scholarship portals before submitting applications.

---

<div align="center">

Made with ❤️ by [Shreyansh Srivastava (@avishrey-beep)](https://github.com/avishrey-beep)

</div>
