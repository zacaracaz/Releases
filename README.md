# Releases

Central EpicEncore download page for all projects. Hosted on GitHub Pages.

**Live site:** https://zacaracaz.github.io/Releases/

## How it works

1. `index.html` is a static page that fetches `releases.json` and renders project cards with download buttons.
2. Download links point to **GitHub Releases asset URLs** — no binary files are stored in this repo.
3. To add or update a project, edit `releases.json` and push. The page updates automatically on next load.

## `releases.json` format

```json
{
  "updated": "2026-08-29",
  "projects": [
    {
      "name": "ProjectName",
      "description": "One-line description.",
      "version": "MAJOR.MINOR.PATCH",
      "releaseState": "Alpha | Beta | Released | Development",
      "repo": "zacaracaz/RepoName",
      "downloads": [
        {
          "platform": "Android",
          "label": "APK",
          "url": "https://github.com/zacaracaz/RepoName/releases/download/v1.0.0/app-release.apk",
          "size": "24.3 MB",
          "sha256": "abcdef1234567890...",
          "note": null
        }
      ]
    }
  ]
}
```

- `size` and `sha256` are optional — include them when you have the exact values.
- If a download isn't published yet, use the releases page URL (`.../releases/latest`) and set `note`.

## Security

- Static page only — no backend, no forms, no user input collection.
- CSP header restricts scripts/styles to self.
- All external links use `rel="noopener"`.
- All manifest values are HTML-escaped before rendering.
- A security notice reminds users to only download from this page or official EE GitHub Releases.

## Local preview

Open `index.html` in a browser, or serve the directory:

```bash
python -m http.server 8080
```

Then visit http://localhost:8080.

## Governance

- **Repository:** `zacaracaz/Releases` on GitHub
- **Path:** `C:\EpicEncore\Projects\Releases`
- **Hosting:** GitHub Pages (branch: `main`, root: `/`)
- **Standards:** `C:\EpicEncore\Platform\standards\`
- **Secrets:** None — this is a static page with no backend or auth.
