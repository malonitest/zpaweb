# Webhint Audit - 24 Nov 2025

## Run Context
- **Command**: `npx hint .`
- **Environment**: Dev container (Ubuntu 24.04.2 LTS), repo `malonitest/zpaweb`, branch `main`
- **Report artifact**: `hint-report/file--workspaces-zpaweb.html`
- **Summary**: 8 errors · 4 warnings · 29 hints (exit code 1)

## High-Level Findings
| # | Rule | Severity | Occurrences | Impacted Areas | Notes |
|---|------|----------|-------------|----------------|-------|
| 1 | `disown-opener` | High | 8 | `o-nas.html`, other external links that open in a new tab | Security regression: external links using `target="_blank"` omit `rel="noopener"`, allowing tab-nabbing.
| 2 | `button-type` | Medium | 22 | FAQ accordions across multiple blog posts | Buttons default to `type="submit"`, which can break nested forms and creates inconsistent keyboard behavior.
| 3 | `no-inline-styles` | Medium | 3 | `o-nas.html` hero timeline divider | Inline `style="transform..."` blocks Tailwind purging, hurts caching, and is repeated thrice.
| 4 | `detect-css-reflows/(composite|paint)` | Medium | 6 | `index.html` entry animation `@keyframes fadeInUp` | Opacity/transform animations trigger extra paint/composite work; should move to `will-change` or reduce keyframes on load-critical views.
| 5 | `manifest-file-extension` | Low | 1 | `index.html` linking `manifest.json` | Rename to `.webmanifest` per spec for better PWA install hints.
| 6 | `compat-api/html` | Low | 1 | `index.html` theme color meta | `meta[name="theme-color"]` unsupported in Firefox/Opera; add fallbacks instead of removing.

## Detailed Action Plan
1. **Harden outgoing links (High, ETA 1h)**
   - Add `rel="noopener"` (and `noreferrer` when analytics allow) to every `target="_blank"` anchor, starting with `o-nas.html` and shared components.
   - Regression test: verify CTA tracking still fires via `clarity("event", ...)`.

2. **Normalize FAQ buttons (Medium, ETA 2h)**
   - Audit all accordions rendered as `<button>` and set `type="button"` explicitly.
   - While editing, ensure aria-expanded / aria-controls attributes are present to prep for future accessibility audit.
   - Smoke-test each article to confirm accordions still toggle as expected.

3. **Extract inline styles (Medium, ETA 45m)**
   - Move the repeated `style="transform: translateX(50%); width: calc(100% - 40px);"` into Tailwind utility classes or a SCSS helper.
   - Re-run Tailwind build to guarantee the new utility isn't purged; lint with `npx hint .` to confirm removal.

4. **Triage hero animations (Medium, ETA 1.5h)**
   - Evaluate whether the `fadeInUp` keyframes are necessary above the fold. Consider switching to CSS transitions or adding `will-change: transform, opacity` with reduced duration/delay.
   - Validate with Chrome DevTools Performance panel and re-run `npx hint .` to ensure reflow hints drop.

5. **Modernize manifest linkage (Low, ETA 30m)**
   - Rename `manifest.json` -> `app.webmanifest`, update `<link rel="manifest">`, and adjust any build scripts/service worker references.
   - Run Lighthouse PWA audit to confirm the manifest is detected.

6. **Add cross-browser theme color fallbacks (Low, ETA 15m)**
   - Keep the existing `meta[name="theme-color"]` for Chromium but add Mozilla's `meta[name="theme-color" media="(prefers-color-scheme: light)"]` pattern and ensure the feature detection is acceptable.
   - Verify via Firefox responsive design mode.

## Next Steps & Owners
| Owner | Task | Due |
|-------|------|-----|
| Dev | Items 1-4 (security, accessibility, CSS cleanup, animation tuning) | **Nov 27** |
| SEO/Content | Verify CTA/form analytics after button/type changes | **Nov 28** |
| DevOps | Re-run `npx hint .` + `npm audit` after fixes, attach updated report | **Nov 29** |

## Tracking & Validation
- Capture before/after screenshots of CTA blocks once `type="button"` is added to document in `AI-IMPLEMENTATION-ACTION-PLAN.md`.
- Store the updated webhint HTML in `hint-report/` with a timestamped filename after remediation.
- Include `npm audit` status in the next weekly report to address the 70 vulnerabilities flagged during the tool install.
