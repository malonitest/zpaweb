# SEO, AI Search, and Technical Audit - 24 Nov 2025

## 1. Executive Summary
- **Strengths:** Solid base of semantic HTML, Tailwind-driven responsive layouts, rich FAQ schema across 12 blog posts, Microsoft Clarity + custom CTA tracking already deployed, and PWA fundamentals (service worker, manifest, offline cache).
- **Gaps:** Missing rel="noopener" on outbound links, FAQ accordions rendered as submit buttons, inline hero styles, manifest naming, and animation-related paint/composite costs flagged by webhint. AI-specific enhancements (Answer schema, calculator WebApplication schema, speakable markup) are scoped but not started. SEO instrumentation lacks regional/local pages, Answer schema, and structured calculator widgets referenced in the action plan.
- **Priorities:** Harden security/accessibility issues first, then ship AI/SEO schema enhancements, followed by advanced calculators and regional content to unlock the 15% AI traffic target.

## 2. SEO Audit
### 2.1 Metadata & Indexation
- ✅ `index.html` includes meta description, Open Graph, Twitter Card, canonical reference, and schema `FinancialService` per README.
- ⚠️ Need to confirm each blog article has unique `<title>` and `<meta name="description">`; current automation status is unclear.
- ⚠️ `sitemap.xml` and `robots.txt` exist but were not re-generated after internal-link pushes; run `npm run build` + `npm run sitemap` if available, or update manually to include new links.

### 2.2 Structured Data
- ✅ FAQ schema deployed site-wide (per Action 2.1) and validated previously.
- ⚠️ Comparison tables use `Table` schema but not `Product` or `HowTo` markup; consider augmenting top-of-funnel posts with `HowTo` or `QAPage` for quick answers.
- ⚠️ No `BreadcrumbList` markup on blog posts; adding breadcrumbs improves sitelinks and AI snippet context.

### 2.3 Content & Internal Linking
- ✅ Action 2.2 added >11 contextual links back to the valuation guide; anchor diversity confirmed in plan.
- ⚠️ Remaining Phase 1 long-form articles (e.g., `co-se-stane-kdyz-nesplacite-pujcku`) are still drafts. Without this coverage, topical authority is capped.
- ⚠️ Regional expansion (Praha/Brno/Ostrava) and calculator pages (Action 3.2) are not produced; these are key for long-tail/voice search.

### 2.4 Performance & UX
- ⚠️ `@keyframes fadeInUp` triggers paint/composite reflow warnings. Add `prefers-reduced-motion` guards and limit animation on initial load for LCP stability.
- ⚠️ Inline width/transform styles on `o-nas.html` defeat caching and hamper maintainability; move to Tailwind utilities or a custom CSS class.

## 3. AI Search Readiness Audit
### 3.1 Answer Depth & Schema
- ✅ FAQ + intent-matched CTAs align with AI snippet expectations.
- ⚠️ Phase 3.1 Answer schema (QAPage) not implemented; top 5 posts still lack explicit answer blocks for Bing Copilot or Perplexity ingestion.
- ⚠️ Speakable schema (Action 4.2) missing. Without `speakable` selectors and question-style headings, voice assistants cannot elevate short answers.
- ⚠️ Calculators (WebApplication schema) missing; these are specifically referenced for AI search experiences (Action 3.2) but not yet delivered.

### 3.2 Tracking & Experimentation
- ✅ `scripts/inject-tracking.js` fires Clarity events (`cta_primary_click`, `faq_interaction`, scroll depth) with `data-cta` instrumentation across 12 posts.
- ⚠️ No report yet proving CTA event baselines; need `/metrics/weekly/` pipeline to log AI vs organic conversions (Action 2.3 validation still open).
- ⚠️ Clarity segment "Intent CTA" not created; dashboards required for Week 8 review.

### 3.3 Content Footprint
- ⚠️ Only 12 articles live (Phase 2 partially complete). AI target requires 30 articles + calculators by Phase 4.
- ⚠️ No AI citation monitoring; tasks to manually test Bing/ChatGPT queries remain unchecked in Action 1.4.

## 4. Technical Audit
### 4.1 Webhint Regression (24 Nov Run)
| Category | Rule | Occurrences | Notes |
|----------|------|-------------|-------|
| Security | `disown-opener` | 8 | Missing `rel="noopener"` on `_blank` links (e.g., `o-nas.html`).
| Accessibility/UX | `button-type` | 22 | FAQ accordions default to `type="submit"`.
| CSS Hygiene | `no-inline-styles` | 3 | Inline transforms on timeline divider.
| Performance | `detect-css-reflows/*` | 6 | `fadeInUp` animation triggers paint/composite warnings.
| PWA | `manifest-file-extension` | 1 | Link references `manifest.json` instead of `.webmanifest`.
| Compatibility | `compat-api/html` | 1 | `meta[name="theme-color"]` unsupported in Firefox/Opera.

### 4.2 PWA & Infra
- ✅ Service worker + offline cache exist.
- ⚠️ Manifest rename required to satisfy Lighthouse and avoid future install issues.
- ⚠️ No automated tests or CI pipeline; manual `npx hint` runs only.

### 4.3 Tooling & Dependencies
- `npm install --save-dev hint` introduced 70 vulnerabilities (per npm output); `npm audit fix` pending.
- No linting/formatting config; consider adding `prettier` or `eslint` for consistency.

## 5. Action Plan (Prioritized)
| Priority | Area | Action | Owner | ETA | Success Criteria |
|----------|------|--------|-------|-----|------------------|
| P0 | Security | Add `rel="noopener noreferrer"` to every `_blank` link (`o-nas.html`, shared components). | Dev | Nov 25 | Webhint `disown-opener` = 0.
| P0 | Accessibility | Set `type="button"` on FAQ accordions and ensure aria attributes exist across 12 posts. | Dev | Nov 25 | Webhint `button-type` = 0; manual accordion QA.
| P1 | CSS Hygiene | Replace inline timeline transforms with utility classes/custom CSS. | Dev | Nov 26 | `no-inline-styles` hints resolved; design unchanged.
| P1 | Performance | Wrap hero animations with `prefers-reduced-motion`, limit initial run, or swap to CSS transitions; re-run `npx hint .`. | Dev | Nov 26 | `detect-css-reflows/*` = 0; Lighthouse CLS unchanged or better.
| P1 | PWA | Rename `manifest.json` -> `app.webmanifest`, update references, revalidate service worker. | DevOps | Nov 27 | Lighthouse PWA audit passes manifest step.
| P1 | Tracking | Create Clarity "Intent CTA" segment; document baseline CTR in `/metrics/weekly/`. | Growth | Nov 28 | Dashboard screenshot + log entry.
| P2 | Answer Schema | Implement QAPage/Answer schema on top 5 posts (`jak-funguje`, `dokumenty`, `zastavni-smlouva`, etc.). | SEO | Dec 2 | Rich results test passes; manual Bing Copilot spot-check.
| P2 | Speakable Schema | Add `speakable` selectors + conversational headings to at least 5 posts. | SEO | Dec 5 | Google speakable test passes.
| P2 | Calculators | Build RPSN, vehicle value, and payment calculators with WebApplication schema + Clarity events (Action 3.2). | Dev | Dec 12 | Each calculator live, schema validated, events firing.
| P3 | Regional Content | Produce Praha/Brno/Ostrava landing pages with LocalBusiness schema + internal links. | Content | Jan 15 | 3 pages published, added to sitemap.
| P3 | Monitoring | Automate `npx hint .` + `npm audit` via CI, fail builds on regressions. | DevOps | Jan 20 | CI badge + zero outstanding critical vulnerabilities.

## 6. Deliverables & Tracking
- Update `AI-IMPLEMENTATION-ACTION-PLAN.md` checklist with security/performance fixes once merged.
- Store future hint outputs under `hint-report/hint-report-YYYYMMDD.html` for history.
- Capture metrics (CTR, conversions) post-FAQ button fix to prove impact for Week 8 review.
