# Releases — Project Instructions

## 📌 Project Overview
- **Name:** Releases
- **Description:** Central EpicEncore download page for all projects, hosted on GitHub Pages.
- **Repository:** https://github.com/zacaracaz/Releases
- **Hosting:** GitHub Pages (branch: `main`, root: `/`)
- **Live URL:** https://zacaracaz.github.io/Releases/
- **Release State:** Alpha (Alpha Testing)
- **Path:** `C:\EpicEncore\Projects\Releases`

## 🌐 EpicEncore Context
This project is part of the **EpicEncore** governance system.
- **Root Entry Point:** `C:\EpicEncore\AGENTS.md`
- **Workspace Index:** `C:\EpicEncore\AI_WORKSPACE.md`
- **Shared Standards:** `C:\EpicEncore\Platform\standards\`
- **Secrets Store:** None — this is a static page with no backend or auth.

## 🛠️ Development Guidelines
1. **No binary files in git.** Download links point to GitHub Releases asset URLs.
2. **Data-driven.** Add/edit projects via `releases.json`. The page renders from that manifest.
3. **Security.** All manifest values are HTML-escaped before rendering. CSP restricts to self. External links use `rel="noopener"`.
4. **Verification.** After changes, run `python -m http.server 8080` and verify locally before pushing.
5. **Atomic Commits.** Follow semantic commit messages (`feat:`, `fix:`, `chore:`).
