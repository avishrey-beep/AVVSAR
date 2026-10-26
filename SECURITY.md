# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| main (latest) | :white_check_mark: |

## Privacy Architecture

Avsar is designed as a **100% client-side application**. No user data — names, emails, passwords, eligibility inputs, or document uploads — is transmitted to any server. All information remains in the user's browser via `localStorage` and in-memory state.

## Reporting a Vulnerability

If you discover a security vulnerability in Avsar, please report it responsibly:

1. **Email**: avi.17092007@gmail.com
2. **Subject line**: `[SECURITY] Avsar vulnerability report`
3. **Include**: Steps to reproduce, impact assessment, and any suggested fix.

Please do **not** open a public GitHub issue for security vulnerabilities.

## Security Measures

- No backend API calls from the deployed static site
- Database and spreadsheet files are excluded from public deployment via `.gitignore` and workflow asset isolation
- GitHub Actions deployment pipeline stages only verified frontend assets
- `robots.txt` blocks crawling of internal test pages
- Security meta headers (`X-Content-Type-Options`, `X-Frame-Options`) configured