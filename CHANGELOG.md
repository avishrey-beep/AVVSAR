# Changelog

All notable changes to **Avsar** are documented in this file.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) conventions.

---

## [Unreleased]

### Planned
- Light/dark theme toggle persistence via `localStorage`
- Scholarship comparison table (side-by-side view)
- Share-to-WhatsApp deeplink for matched scholarship cards

---

## [2.1.0] — 2026-11-07

### Added
- **AICTE Saksham Scholarship** for specially-abled students (PWD ≥40%) in the catalog
- **NSP Minority Post-Matric Scholarship** (Muslim, Christian, Sikh, Buddhist, Jain, Zoroastrian communities)
- **PM-YASASVI Scheme** for OBC/EBC/Nomadic Tribes students at Class 10 & 12 level
- Saathi conversational rules for disability certificates, UDID portal guidance, and minority scholarship queries
- Automated verification test suite (`test.html`) with 10 assertion checks covering schema, uniqueness, and boundary edge cases
- `CONTRIBUTING.md` with scholarship data schema standards and PR process
- GitHub Issue Templates for Bug Reports and Feature Requests
- Referrer-Policy and X-Frame-Options security headers on all HTML pages

### Changed
- `server.js` upgraded with environment-aware PORT, complete MIME-type table, security headers, and graceful `SIGINT`/`SIGTERM` shutdown
- `manifest.json` now includes Saathi quick-launch PWA shortcut and `finance` app category
- Sitemap `lastmod` refreshed to current production release date
- `robots.txt` expanded with explicit allow/disallow rules and `Crawl-delay: 2`
- GitHub Actions workflow now includes pre-deployment asset integrity verification step

### Fixed
- Missing `theme-color`, `X-Content-Type-Options`, and `X-Frame-Options` headers on `404.html` and `documents.html`
- Code-fence formatting in README testing section

---

## [2.0.0] — 2026-10-26

### Added
- Dedicated **Document Intelligence & Vault** page (`documents.html` + `documents.js`)
- Custom `404.html` branded error page with auto-redirect countdown
- GitHub Actions continuous deployment pipeline (`.github/workflows/deploy.yml`)
- Production `robots.txt` and `sitemap.xml` for search engine indexing
- `favicon.ico` multi-resolution icon and `.nojekyll` for GitHub Pages
- `SECURITY.md` responsible disclosure policy
- JSON-LD structured data schema for WebApplication rich search results
- DNS-prefetch hint for Google Fonts performance
- Noscript fallback message
- Print media stylesheet for navigation/chat suppression

### Changed
- Mobile hamburger menu drawer with slide-in animation
- Quick-pill scrollspy navigation bar on mobile
- Full ARIA landmark and live-region pass across `index.html`
- Scholarship catalog expanded with INSPIRE, KVPY, PM-USP, DBT-JRF, and state schemes

---

## [1.0.0] — 2026-10-16

### Added
- Initial public release of Avsar scholarship eligibility engine
- 10+ verified scholarship entries covering SC, ST, OBC, EWS, Minority, and Merit categories
- Saathi bilingual conversational advisor (Hindi + English)
- Deadline Radar with real-time urgency classification
- Opportunity Graph (SVG-rendered career pathway visualization)
- Document Intelligence checklist with progress tracking
- Passbook-style login UI with guest mode
- Progressive Web App (`manifest.json`, `icon.svg`)
- OpenGraph and Twitter Card social metadata