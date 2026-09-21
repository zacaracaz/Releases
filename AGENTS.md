# Releases Project Instructions

## Scope
Releases is EpicEncore's central static download page. It publishes an accurate, safe catalogue of project release assets without becoming a binary store or application backend.

## EpicEncore policy
Follow the portable policy set at C:\EpicEncore\AI_WORKSPACE.md and C:\EpicEncore\Platform\standards. Those standards govern this project unless a documented approved exception applies.

- Work from C:\EpicEncore only. Keep project-specific decisions here and shared rules in the canonical standards.
- Commit directly to main with focused conventional commits. Every committed update must bump VERSION and CHANGELOG.md.
- This static download catalogue has no user accounts and is an approved exception to the EpicEncore Login default.
- Retain release metadata and historical records as far as practical, subject to privacy, security, legal, and user-deletion requirements.
- Continue all safe, independent work without pausing for routine confirmation. Ask only when an essential answer, credential, unavailable information, or approval for an irreversible external action is needed.

## Project safeguards
- Keep binary files out of Git. Download links must target immutable GitHub Release assets.
- Maintain releases.json as the source of truth. Escape rendered manifest values, preserve CSP, and use rel=noopener for external links.
- Do not add a backend, authentication, analytics, or secrets without documenting the change and its policy impact.

## Validation
For content or presentation changes, serve the page locally and verify release links, escaping, and responsive presentation before committing.