# AutoZástava24 - Copilot Instructions

## Project Overview
Static Czech financial services website for car collateral loans. **100% static HTML** - no backend, no build output directory. Deployed to Azure Static Web Apps on every push to `main`.

**Core Business:** Loan provider (50-300k CZK) secured by car collateral - customers keep their vehicles.  
**Target:** Czech market, Prague-focused, SEO/AI search optimized.

## Architecture

### Static Site Structure
```
/ (root)                  # Production files - HTML served directly
├── index.html           # Homepage (2000+ lines, heavily optimized)
├── blog/                # Blog articles (13+ posts)
│   └── [slug]/index.html
├── autor/               # Author profile pages
├── scripts/             # Client-side JS + build scripts
│   ├── calculators.js   # Loan calculators (data-* attributes)
│   ├── inject-tracking.js      # Auto-inject analytics (idempotent)
│   └── generate-sitemap.js     # Auto-generate sitemap.xml
├── styles.css           # Compiled Tailwind (minified)
└── src/input.css        # Tailwind source
```

**Critical:** All HTML lives in root/subdirectories. No `dist/` or `build/` folder. What you edit is what deploys.

## Build System

### Standard Workflow
```bash
npm run build           # Full pipeline: CSS + tracking + sitemap
npm run build:css       # Compile Tailwind to styles.css (minified)
npm run inject:tracking # Inject Google Analytics + Clarity snippets
npm run generate:sitemap # Auto-discover HTML files → sitemap.xml
```

**Before deployment:** Always run `npm run build` to ensure:
1. Tailwind changes compiled to `styles.css`
2. Analytics tracking injected in all HTML files
3. Sitemap updated with new blog articles/pages

### Tracking Injection (Idempotent)
- Config: `scripts/tracking-config.json` (Clarity ID, GA ID)
- Wraps snippets in `<!-- Tracking: ... (auto) -->` markers
- Safe to run repeatedly - won't duplicate
- Auto-adds event tracking: form submits, phone clicks, FAQ interactions, scroll depth

## SEO & Schema.org Patterns

### Essential Schema Types (Per Page)
**Homepage:** FinancialService + Article + FAQPage + HowTo + BreadcrumbList (11 total schemas)  
**Blog Posts:** BlogPosting + BreadcrumbList + FAQPage + Person (author)  
**Author Pages:** ProfilePage + Person

### Schema Best Practices
```javascript
// Always include author attribution
{
  "@type": "Person",
  "name": "Rostislav Sikora",
  "jobTitle": "Garant projektu AutoZástava24",
  "description": "25 let zkušeností v bankovnictví"
}

// Blog articles require minimum:
"@type": "BlogPosting",
"headline": "...",
"author": { Person schema },
"datePublished": "2025-11-15",
"wordCount": 2500
```

### Meta Tags Template
Every page needs: `description` (140-160 chars), `keywords` (5-10), `author`, `robots`, `canonical`, Open Graph (5+ tags), Twitter Card. **AI Search optimized:** conversational tone in descriptions.

## Content Patterns

### Blog Article Structure
1. **Quick summary box** (Čas čtení: X min, Autor, Datum)
2. **Table of contents** (clickable anchor links)
3. **H1** (one only) → **H2** sections → **H3** subsections
4. **Comparison tables** with `itemscope itemtype="https://schema.org/Table"`
5. **FAQ section** (always FAQPage schema)
6. **CTA back to main site** (Button: "Chci půjčku pod zástavu →")
7. **Related articles** (3-4 links)

### Calculator System
Uses data attributes for declarative setup:
```html
<div data-calculator="payment">
  <input data-field="loanAmount">
  <input data-field="loanTerm">
  <span data-result="paymentMonthly"></span>
</div>
```
Available calculators: `payment`, `value`, `rpsn`. Script: `scripts/calculators.js` (auto-tracks via Clarity).

## Development Workflow

### Adding Blog Articles
1. Create `/blog/article-slug/index.html`
2. Copy structure from existing article (e.g., `jak-funguje-pujcka-pod-zastavu-auta/`)
3. Include required schemas: BlogPosting + BreadcrumbList + FAQPage
4. Add author attribution (currently "Martin Pražák" or "Rostislav Sikora")
5. **Run `npm run generate:sitemap`** - auto-discovers new article
6. Update `blog/index.html` with new article card

### Editing HTML Pages
- **Don't touch** `<!-- Tracking: ... (auto) -->` blocks - managed by script
- Edit content outside tracking markers freely
- **Tailwind:** All pages use CDN (`cdn.tailwindcss.com`) EXCEPT homepage uses compiled `styles.css`
- **Homepage:** If editing Tailwind classes, run `npm run build:css` after

### Deployment Checklist
```bash
npm run build                    # ← Critical step
git add .
git commit -m "..."
git push origin main             # Auto-deploys via GitHub Actions
```

## Key Conventions

### Czech Language
- All content in Czech (cs-CZ)
- Date format: `DD.MM.YYYY`
- Currency: `CZK` (formatted via `Intl.NumberFormat`)
- Phone format: `+420 XXX XXX XXX`

### File Naming
- Blog slugs: lowercase, hyphens (e.g., `pujcka-pod-zastavu-skody`)
- URLs: Clean paths with trailing slash (`/blog/article-slug/`)
- No `.html` in public URLs (handled by server)

### CSS/Styling
- Primary blue: `#1e40af` (Tailwind `blue-800`)
- Secondary: `#3b82f6` (Tailwind `blue-500`)
- **Don't** inline Tailwind CDN in new pages - reference compiled `styles.css` or use CDN if one-off page
- Mobile-first: Test at 375px width minimum

## External Dependencies

- **Tailwind CSS:** CDN (most pages) or compiled (homepage)
- **Google Analytics:** `G-S2R8P5WZG3` (config: `tracking-config.json`)
- **Microsoft Clarity:** `ua2ebm7dg9` (heatmaps, session recordings)
- **Azure Static Web Apps:** Deployed via `.github/workflows/azure-static-web-apps-*.yml`

## AI Search Optimization

### Critical for Ranking
- **Conversational titles:** "Potřebujete rychle peníze? Půjčka pod zástavu auta..."
- **Natural language:** FAQ answers in full sentences (50-200 words)
- **Structured Q&A:** Every article has FAQPage schema
- **Author E-E-A-T:** Always attribute content to credentialed author
- **Word count:** Blog articles minimum 1000 words (target: 2000+)
- **Internal linking:** 3-5 links per article to related content

### Voice Search Targeting
Articles structured to answer: "Jak funguje...", "Kdy potřebuji...", "Kolik stojí...", "Můžu získat půjčku pokud..."

## Common Tasks

**Add tracking to new page:** Just run `npm run inject:tracking` - it scans all HTML files.  
**Update sitemap:** `npm run generate:sitemap` - auto-discovers new pages.  
**Test schema markup:** Use Google Rich Results Test or schema.org validator.  
**Preview locally:** Open `index.html` in browser (static files, no server needed) or `python3 -m http.server 8000`.

## Anti-Patterns
❌ Don't create build output directories  
❌ Don't edit `sitemap.xml` manually  
❌ Don't duplicate tracking snippets (script handles it)  
❌ Don't skip `npm run build` before deployment  
❌ Don't use relative paths without `/` prefix in links  
❌ Don't add blog articles without updating sitemap  
❌ Don't omit Schema.org markup (critical for AI search)
