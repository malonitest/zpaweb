# AutoZástava24 - Statická webová stránka

Moderní webová stránka pro společnost AutoZástava24, poskytující rychlé půjčky pod zástavu auta.

## 🚀 Hlavní slogan
**"Jezdíte dál. Peníze máte do 24 hodin."**

> **Pro vývojáře:** Detailní dokumentace architektury, konvencí a workflow je v [`.github/copilot-instructions.md`](.github/copilot-instructions.md)

## ✨ Funkce

### SEO & AI Search Optimalizace
- ✅ 11 Schema.org typů na homepage (FinancialService, Article, FAQPage, HowTo, etc.)
- ✅ Konverzační optimalizace pro AI vyhledávače (ChatGPT, Perplexity)
- ✅ E-E-A-T signály (autor profily s certifikacemi)
- ✅ BlogPosting schema se strukturovaným autorem
- ✅ Automaticky generovaná sitemap.xml
- ✅ Open Graph + Twitter Card meta tagy
- ✅ 13+ SEO-optimalizovaných blog článků (2000+ slov)

### Analytics & Tracking
- ✅ Google Analytics (G-S2R8P5WZG3)
- ✅ Microsoft Clarity (ua2ebm7dg9) - heatmapy, session recordings
- ✅ Automatická injekce tracking kódů (idempotentní)
- ✅ Custom event tracking (formuláře, telefon, FAQ, scroll depth)

### PWA (Progressive Web App)
- ✅ app.webmanifest pro instalaci aplikace
- ✅ Service Worker pro offline funkcionalitu
- ✅ Cachování statických zdrojů

### Content Features
- ✅ Blog systém (13+ článků)
- ✅ Autor profily s bio a credentials
- ✅ Interaktivní kalkulačky (splátka, hodnota auta, RPSN)
- ✅ FAQ sekce s plným Schema.org markup
- ✅ Responzivní design (mobile-first)
- ✅ Tailwind CSS (kompilovaný + CDN)

## 📁 Struktura projektu

```
zpaweb/
├── index.html              # Homepage (2000+ lines, 11 schema typů)
├── blog/                   # 13+ článků o půjčkách pod zástavu
│   ├── index.html         # Blog hub
│   └── [slug]/index.html  # Jednotlivé články
├── autor/                  # Autor profily (E-E-A-T)
│   └── rostislav-sikora/
├── scripts/                # Build & tracking skripty
│   ├── inject-tracking.js      # Auto-inject analytics
│   ├── generate-sitemap.js     # Auto-generate sitemap
│   ├── calculators.js          # Loan kalkulačky
│   └── tracking-config.json    # Analytics konfigurace
├── styles.css             # Kompilovaný Tailwind (homepage)
├── src/input.css          # Tailwind source
├── sitemap.xml            # Auto-generated (19+ URLs)
└── service-worker.js      # PWA offline support
```

## 🛠️ Technologie

- **HTML5** - Sémantická struktura, 100% statické
- **Tailwind CSS 4.x** - Kompilovaný (homepage) + CDN (blog)
- **Vanilla JavaScript** - Kalkulačky, tracking events
- **Schema.org** - 11 typů structured data
- **Azure Static Web Apps** - Auto-deploy na push to main
- **Node.js scripts** - Build automation

## 🚀 Quick Start

### Development
```bash
# Install dependencies
npm install

# Watch Tailwind changes (optional - only for homepage)
npm run watch:css

# Full build (CSS + tracking + sitemap)
npm run build
```

### Deployment
Stránka se **automaticky** nasazuje na Azure Static Web Apps při každém push na `main`:

```bash
npm run build           # Compile CSS, inject tracking, update sitemap
git add .
git commit -m "Update content"
git push origin main    # Triggers Azure deployment
```

**Azure Static Web Apps workflow:** `.github/workflows/azure-static-web-apps-*.yml`

### Build Commands
```bash
npm run build:css          # Compile Tailwind → styles.css
npm run inject:tracking    # Inject GA + Clarity (idempotent)
npm run generate:sitemap   # Auto-discover pages → sitemap.xml
npm run build              # All above in sequence
```

## 📝 Konfigurace

### Analytics Setup
Edit `scripts/tracking-config.json`:
```json
{
  "clarityProjectId": "ua2ebm7dg9",
  "googleTagId": "G-S2R8P5WZG3"
}
```

Tracking je **automaticky injektován** do všech HTML souborů pomocí `npm run inject:tracking`. Skript:
- ✅ Je idempotentní (safe to run multiple times)
- ✅ Přidává custom events: `form_submit`, `phone_click`, `faq_interaction`, `scroll_depth`
- ✅ Používá `<!-- Tracking: ... (auto) -->` markery - **neupravujte manuálně**

### Domain & Contact Info
Při změně domény aktualizujte:
- `index.html` - Open Graph, Schema.org, canonical URL
- `scripts/generate-sitemap.js` - BASE_URL
- `robots.txt` - sitemap URL

### Images
Vytvořte následující soubory:
- `favicon.png` (32x32)
- `apple-touch-icon.png` (180x180)
- `og-image.jpg` (1200x630 pro social media)
- `icon-*.png` (72x72 až 512x512 pro PWA)

## 📝 Content Management

### Adding Blog Articles
1. Create `/blog/article-slug/index.html`
2. Copy structure from existing article (e.g., `jak-funguje-pujcka-pod-zastavu-auta/`)
3. Include required schemas: **BlogPosting** + **BreadcrumbList** + **FAQPage**
4. Add author attribution (Rostislav Sikora nebo Martin Pražák)
5. Run `npm run generate:sitemap` to auto-discover
6. Update `blog/index.html` with article card

**Required elements:**
- Meta tags (description 140-160 chars, keywords, author, robots, canonical)
- Open Graph + Twitter Card
- H1 (one only) → H2 sections → H3 subsections
- Table of contents with anchor links
- FAQ section (minimum 5 questions)
- Related articles (3-4 links)
- CTA button back to main site

### Calculators
Use declarative data-* attributes:
```html
<div data-calculator="payment">
  <input data-field="loanAmount">
  <input data-field="loanTerm">
  <span data-result="paymentMonthly"></span>
</div>
```
Available: `payment`, `value`, `rpsn` (see `scripts/calculators.js`)

## 🎨 Styling

### Tailwind Configuration
```javascript
// tailwind.config.js
colors: {
  primary: '#1e40af',    // blue-800
  secondary: '#3b82f6',  // blue-500
}
```

**Important:**
- Homepage uses **compiled** `styles.css` (run `npm run build:css` after changes)
- Blog pages use **Tailwind CDN** (no build needed)
- Mobile-first: Test at 375px minimum width

## ✅ SEO & AI Search Optimization

### Implemented
- [x] **11 Schema.org types** na homepage (FinancialService, Article, FAQPage, HowTo, BreadcrumbList, etc.)
- [x] **E-E-A-T signals** - autor profily s credentials (25 let zkušeností)
- [x] **Conversational optimization** - titles/descriptions pro voice search
- [x] **BlogPosting schema** - všechny články s author attribution
- [x] **Auto-generated sitemap** (19+ URLs, auto-discovers new content)
- [x] **Structured Q&A** - každý článek má FAQPage schema
- [x] **Internal linking** - 3-5 links per article
- [x] **Word count** - články 1000-2500+ slov
- [x] **Mobile-responsive** - mobile-first design
- [x] **Fast loading** - compiled CSS, optimized assets

### Critical for AI Search Rankings
1. **Conversational titles:** "Potřebujete rychle peníze? Půjčka pod zástavu auta..."
2. **Natural language FAQs:** Answers in full sentences (50-200 words)
3. **Author credentials:** Always attribute to Rostislav Sikora (garant, 25 let v bankovnictví)
4. **Structured data:** BlogPosting + BreadcrumbList + FAQPage minimum

## 🔍 Testing & Validation

### Schema Validation
```bash
# Test structured data
curl https://www.autozastava24.cz/ | grep 'application/ld+json'
```

**Tools:**
- Schema.org: https://validator.schema.org/
- Google Rich Results: https://search.google.com/test/rich-results
- Open Graph: https://www.opengraph.xyz/

### Performance
- Google PageSpeed Insights
- Chrome DevTools > Lighthouse
- webhint: `npx hint https://www.autozastava24.cz`

## 📚 Documentation

- **Developer Guide:** [`.github/copilot-instructions.md`](.github/copilot-instructions.md)
- **Scripts README:** [`scripts/README.md`](scripts/README.md)
- **SEO Strategy:** `SEO-AI-SEARCH-STRATEGY.md`
- **Implementation Summary:** `IMPLEMENTATION-SUMMARY.md`

### Mobilní test
- Google Mobile-Friendly Test
- BrowserStack
- Responzivní režim v Chrome DevTools

## 📄 Licence

© 2024 AutoZástava24. Všechna práva vyhrazena.

## 🤝 Podpora

Pro technickou podporu kontaktujte:
- Email: info@autozastava24.cz
- Telefon: +420 XXX XXX XXX