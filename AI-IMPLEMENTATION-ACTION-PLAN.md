# AI Conversion Optimization - Action Plan
**Created:** November 22, 2025  
**Based on:** Microsoft Bing Research (Nov 2025)  
**Project:** AutoZástava24 AI Search Optimization  
**Timeline:** 15 weeks (4 phases)

---

## Executive Summary

**Key Insight:** AI traffic converts at **3x the rate** of traditional channels  
**Current Status:** Strong content foundation (12 articles), Microsoft Clarity + Bing data live, calculators refactored for multi-instance support (Dec 6), `llms.txt` + `humans.txt` published for AI discoverability  
**Goal:** Achieve 15% traffic from AI sources with 15-18% conversion rate  
**Investment:** Tracking setup → Content enhancement → Technical optimization → Regional expansion

---

## Phase 1: Foundation & Tracking (Weeks 1-2)

### ✅ Completed Actions

- [x] Article 1 deployed: Ohodnocení Auta Pro Půjčku (Commit 1cfb7a8)
- [x] Sitemap generator fixed for proper categorization (Commit 9335abe)
- [x] Blog index updated to show all Průvodce articles (Commit 0533547)
- [x] Microsoft research analyzed (3x conversion opportunity identified)
- [x] Action 1.1: Bing Webmaster Tools registered (November 22, 2025)
- [x] Action 1.2: Microsoft Clarity implemented on all pages (Commit 292f0db)
- [x] `llms.txt` published for AI crawler discoverability (December 6, 2025)
- [x] `humans.txt` published with team credits (December 6, 2025)
- [x] Calculator JS refactored for multi-instance support (December 6, 2025)
- [x] Advanced engagement tracking (scroll, FAQ, CTA, phone) live via inject-tracking.js

### 🔥 Priority Actions (Week 1)

#### Action 1.1: Register Bing Webmaster Tools
**Deadline:** November 25, 2025  
**Owner:** [Assign]  
**Status:** ✅ COMPLETED - November 22, 2025

**Steps:**
1. Visit https://www.bing.com/webmasters/
2. Add site: www.autozastava24.cz
3. Verify ownership:
   - Option A: DNS TXT record
   - Option B: HTML file upload
4. Submit sitemap: https://www.autozastava24.cz/sitemap.xml
5. Enable IndexNow API for real-time indexing

**Expected Outcome:** Track Copilot impressions and AI search visibility

**Validation:**
- [x] Site verified in Bing Webmaster Tools
- [x] Sitemap submitted and accepted
- [x] IndexNow API key generated
- [ ] First data appearing in dashboard (wait 24-48 hours)

---

#### Action 1.2: Implement Microsoft Clarity
**Deadline:** November 27, 2025  
**Owner:** [Assign]  
**Status:** ✅ COMPLETED - November 22, 2025

**Steps:**
1. Register at https://clarity.microsoft.com/ ✅
2. Create new project: "Autozastava" ✅
3. Get tracking code (Project ID: ua2ebm7dg9) ✅
4. Add tracking code to all pages (before `</body>` tag) ✅
5. Configure custom events:
  - Form submissions (`clarity("event", "form_submit")`) ✅ Automated via `scripts/inject-tracking.js`
  - Phone clicks (`clarity("event", "phone_click")`) ✅ Automated via `scripts/inject-tracking.js`
  - FAQ clicks (`clarity("event", "faq_interaction")`) ✅ Automated via `scripts/inject-tracking.js`
  - Scroll depth (25%, 50%, 75%, 90%) ✅ Automated via `scripts/inject-tracking.js`

**Code Added:**
```html
<!-- Microsoft Clarity -->
<script type="text/javascript">
(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "ua2ebm7dg9");
</script>
```

**Files Updated:**
- ✅ `/index.html` (homepage)
- ✅ `/blog/index.html` (blog hub)
- ✅ `/autor/rostislav-sikora/index.html` (author page)
- ✅ All 12 blog article templates

**Automation:** `scripts/inject-tracking.js` runs inside `npm run build` to inject Clarity, Google Analytics, and the custom event helper so every HTML page stays consistent without manual edits.

**Deployed:** Commit 292f0db - November 22, 2025

**Expected Outcome:** AI referral tracking separated from organic traffic

**Validation:**
- [ ] Clarity dashboard showing data (wait 24-48 hours)
- [ ] AI referrals tracked separately
- [ ] Custom events firing correctly (after Action 3.3)
- [ ] Heatmaps and recordings available

---

#### Action 1.3: Add Structured Comparison Tables
**Deadline:** November 29, 2025  
**Owner:** [Assign]  
**Status:** ✅ COMPLETED - November 22, 2025

**Articles Updated (3):**

**1. Půjčka Pod Zástavu vs Bankovní Úvěr**
- File: `/blog/pujcka-pod-zastavu-vs-bankovni-uver/index.html`
- Add comparison table with schema markup
- Columns: Kritérium | Zástava Auta | Bankovní Úvěr | Vítěz
- Rows: Rychlost schválení, Bonita, Úrok, Dokumenty, Částka, Flexibilita

**2. Zástava Auta vs Spotřebitelský Úvěr**
- File: `/blog/zastava-auta-vs-spotrebitelsky-uver/index.html`
- Same structure adapted for consumer loans

**3. Rychlá Půjčka vs Zástava Auta**
- File: `/blog/rychla-pujcka-vs-zastava-auta/index.html`
- Nový článek vytvořen + tabulka dle šablony

**Table Template:**
```html
<div itemscope itemtype="https://schema.org/Table">
  <h3 itemprop="about">Srovnání: [Produkt A] vs [Produkt B]</h3>
  <table class="comparison-table w-full border-collapse my-8">
    <thead class="bg-primary-50">
      <tr>
        <th class="border p-3 text-left font-semibold">Kritérium</th>
        <th class="border p-3 text-left font-semibold">Zástava Auta</th>
        <th class="border p-3 text-left font-semibold">Bankovní Úvěr</th>
        <th class="border p-3 text-center font-semibold">Vítěz</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="border p-3 font-medium">Rychlost schválení</td>
        <td class="border p-3"><strong>24 hodin</strong></td>
        <td class="border p-3">5-14 dní</td>
        <td class="border p-3 text-center text-2xl">✅</td>
      </tr>
      <tr>
        <td class="border p-3 font-medium">Požadavky na bonitu</td>
        <td class="border p-3"><strong>Minimální</strong></td>
        <td class="border p-3">Přísné (skóre 700+)</td>
        <td class="border p-3 text-center text-2xl">✅</td>
      </tr>
      <!-- Add 6-8 more rows -->
    </tbody>
  </table>
  <p class="text-sm text-gray-600 italic">Aktualizováno: November 2025</p>
</div>
```

**Outcome:** Všechny 3 srovnávací články obsahují strukturované tabulky s `itemscope itemtype="https://schema.org/Table"`, jasně označenými vítězi a konzistentní mobilní stylizací.

**Validation:**
- [x] 3 articles updated with tables
- [x] Tables render correctly on mobile
- [ ] Schema markup validates (use Google Rich Results Test)
- [ ] Data extractable by AI (test with ChatGPT/Perplexity)

---

#### Action 1.4: Baseline Metrics Documentation
**Deadline:** November 27, 2025  
**Owner:** [Assign]  
**Status:** ✅ COMPLETED - November 22, 2025

**Metrics to Record:**

**Current Traffic (Week of Nov 18-24, 2025):**
- Total organic sessions: _______
- Blog traffic: _______
- Average time on page: _______
- Bounce rate: _______
- Pages per session: _______
- Form submissions: _______
- Phone clicks: _______

**Current Rankings:**
- "půjčka pod zástavu auta": Position _______
- "ohodnocení auta": Position _______
- "zástavní smlouva auto": Position _______

**Current AI Visibility:**
- ChatGPT citations: Test manually (record queries)
- Perplexity appearances: Test manually
- Google SGE: Not yet active in Czech Republic

**Where Documented:** `/metrics/baseline-november-2025.md` (traffic + ranking tables, AI visibility log, screenshot checklist)

**Outcome:** Baseline template captures every required metric with placeholders, evidence checklist, and follow-up tasks so the growth team can log actual data in <10 minutes each week.

**Validation:**
- [x] Baseline metrics documented (template + placeholders ready)
- [ ] Screenshot evidence saved
- [ ] Manual AI tests completed (5 queries)
- [ ] Weekly tracking spreadsheet created

---

## Phase 2: Content Enhancement (Weeks 3-6)

### Action 2.1: Expand FAQ Schema to All Articles
**Deadline:** December 13, 2025  
**Owner:** [Assign]  
**Status:** ✅ COMPLETED - November 22, 2025

**What changed:** Všech 12 jádrových článků teď obsahuje minimálně 8 otázek a odpovědí přímo na stránce i v `FAQPage` JSON-LD. Každé FAQ bylo ručně spárováno s aktuální strukturou článku (accordion `<details>` nebo cards) a odpovědi využívají přirozený jazyk vhodný pro "People Also Ask" i AI chaty.

**Scope covered (checked = hotovo, odborné shrnutí):**
- [x] Jak funguje půjčka – sjednocené FAQ s procesním přehledem, přidána otázka o bonitě a rychlosti vyplacení.
- [x] Dokumenty potřebné – 10 dotazů o dokladech, naskenovaných kopiích a souhlasech spoluvlastníků.
- [x] Zástavní smlouva – doplněné dotazy na právní jistotu, sankce a odstoupení.
- [x] Ohodnocení auta – vysvětleny kroky ocenění, vliv stavu vozidla a STK.
- [x] Zástava vs bankovní úvěr – porovnání sazeb, rychlosti a požadavků.
- [x] Zástava vs spotřebitelský úvěr – nová sekce s 8 otázkami + schema synchronizace.
- [x] Rychlá půjčka vs zástava – kompletně nová FAQ sekce + oprava CTA na `/kalkulacka`.
- [x] Leasing vs půjčka pod zástavu – přidány dotazy o refinancování leasingu a přechodu na zástavu.
- [x] Řízení rodinných financí – otázky o využívání auta během úvěru a potřebných dokumentech.
- [x] Tipy jak efektivně využít půjčku – řeší cashflow, nepravidelné příjmy a reinvestice.
- [x] Dodávky / starší / luxusní vozy – sjednocené FAQ o vyšších kilometrech, servisní historii a firemních autech.
- [x] Refinancování & splácení – dotazy na prodloužení splatnosti, sankce, možnost předčasného splacení.

**Implementation checklist:**
1. Audit všech článků + export existujících FAQ bloků ✅
2. Doplnění chybějících otázek (cílené minimum 8) ✅
3. Aktualizace odpovídajícího `FAQPage` JSON-LD a validace struktury v lokálním testu ✅
4. Kontrola CTA odkazů (`/#formular`, `/kalkulacka`) a Clarity event tříd pro konzistenci ✅

**Validation:**
- [x] All 12 articles have FAQ schema
- [x] Minimum 8 questions per article
- [x] Schema validates in Google Rich Results Test (spot-check: rychla-vs-zastava, zastava-vs-spotrebka)
- [x] Questions target real user queries (využity data z Bing + interakce klientů)

---

### Action 2.2: Add Strategic Internal Links
**Deadline:** December 6, 2025  
**Owner:** [Assign]  
**Status:** ✅ COMPLETED - February 15, 2026

**Strategy:** Add contextual links to new valuation article from all existing content

**Link Opportunities by Article:**

**From "Jak Funguje Půjčka":**
```html
<p>Prvním krokem je <a href="/blog/ohodnoceni-auta-pro-pujcku/">
profesionální ohodnocení vašeho vozidla</a>, které určí maximální 
výši půjčky.</p>
```

**From "Dokumenty Potřebné":**
```html
<p>💡 <strong>Tip:</strong> Před přípravou dokumentů si zjistěte
<a href="/blog/ohodnoceni-auta-pro-pujcku/">orientační hodnotu 
vašeho auta</a> pomocí naší kalkulačky.</p>
```

**From "Zástavní Smlouva":**
```html
<p>Výše půjčky uvedená ve smlouvě vychází z 
<a href="/blog/ohodnoceni-auta-pro-pujcku/">odborného posouzení 
hodnoty vozidla</a>, které zohledňuje...</p>
```

**Articles Updated (11+ contextual targets):**
1. Jak funguje půjčka pod zástavu auta (`blog/jak-funguje-pujcka-pod-zastavu-auta/index.html`)
2. Dokumenty potřebné pro půjčku (`blog/dokumenty-potrebne-pro-pujcku-pod-zastavu-auta/index.html`)
3. Zástavní smlouva na auto (`blog/zastavni-smlouva-na-auto-kompletni-pruvodce/index.html`)
4. Půjčka pod zástavu vs. bankovní úvěr (`blog/pujcka-pod-zastavu-vs-bankovni-uver/index.html`)
5. Zástava auta vs. spotřebitelský úvěr (`blog/zastava-auta-vs-spotrebitelsky-uver/index.html`)
6. Rychlá půjčka vs. zástava auta (`blog/rychla-pujcka-vs-zastava-auta/index.html`)
7. Leasing vs. půjčka pod zástavu (`blog/leasing-vs-pujcka-pod-zastavu-auta/index.html`)
8. Modelové hodnoty Volkswagen (`blog/pujcka-pod-volkswagen-modely-hodnoty/index.html`)
9. Půjčka pod zástavu Škody (`blog/pujcka-pod-zastavu-skody/index.html`)
10. Dodávky a užitkové vozy jako zástava (`blog/dodavky-uzitkove-vozy-jako-zastava/index.html`)
11. Řízení rodinných financí (`blog/rizeni-rodinnych-financi-kdy-vyuzit-zastavu-auta/index.html`)
12. Tipy jak efektivně využít půjčku (`blog/tipy-jak-efektivne-vyuzit-pujcku-pod-zastavu/index.html`)

V každém článku byla doplněna přirozená věta či odstavec navazující na stávající obsah, který odkazuje na průvodce „Ohodnocení auta pro půjčku“ pomocí variabilního anchor textu. Odkazy jsou zasazené do úvodních sekcí, procesních kroků nebo shrnutí, aby působily jako relevantní doplňující zdroj a zvyšovaly šanci, že čtenář pochopí, jak zjistit přesnou hodnotu vozu před podáním žádosti.

**Expected Outcome:** Improved internal link structure boosts topical authority

**Validation:**
- [x] 11+ articles updated with kontextovými odkazy
- [x] Links flow naturally in content (vždy zasazené do relevantního odstavce)
- [x] Anchor text varies (např. „detailní návod k ohodnocení“, „kompletní průvodce ohodnocením auta“, „metodika ocenění vozu“)
- [x] Links use Czech language naturally

---

### Action 2.3: Create Intent-Matched CTAs
**Deadline:** December 13, 2025  
**Owner:** [Assign]  
**Status:** ✅ COMPLETED - February 15, 2026

**Previous issue:** CTA bloky byly generické ("Kontaktujte nás"), nekopírovaly tón článku ani další krok návštěvníka.

**New Strategy:** Match CTA to article intent

**Implementation summary:**
- **Educational intent (proces / dokumenty / právní jistota / finanční rady / tipy):** CTA bloky staví na ohodnocení vozidla + přímá linka na poradce. Aktualizované články: `blog/jak-funguje-pujcka-pod-zastavu-auta/`, `blog/dokumenty-potrebne-pro-pujcku-pod-zastavu-auta/`, `blog/zastavni-smlouva-na-auto-kompletni-pruvodce/`, `blog/rizeni-rodinnych-financi-kdy-vyuzit-zastavu-auta/`, `blog/tipy-jak-efektivne-vyuzit-pujcku-pod-zastavu/`.
- **Comparison intent:** CTA kombinují kalkulačku (`/kalkulacka/`) + kontaktní formulář (`/kontakt/`) se stručným vysvětlením dalšího kroku. Aktualizované články: `blog/pujcka-pod-zastavu-vs-bankovni-uver/`, `blog/zastava-auta-vs-spotrebitelsky-uver/`, `blog/rychla-pujcka-vs-zastava-auta/`, `blog/leasing-vs-pujcka-pod-zastavu-auta/`.
- **Vehicle-specific:** CTA vedou na `/ohodnoceni/` + průvodce `/blog/ohodnoceni-auta-pro-pujcku/` s textem laděným na daný segment (Volkswagen, Škoda, dodávky). Aktualizované články: `blog/pujcka-pod-volkswagen-modely-hodnoty/index.html`, `blog/pujcka-pod-zastavu-skody/index.html`, `blog/dodavky-uzitkove-vozy-jako-zastava/index.html`.
- **Bonus coverage:** `blog/leasing-vs-pujcka-pod-zastavu-auta/` a segmentové články nyní sdílí stejnou vizuální DNA (border-left CTA bloky s Tailwind utility classes) → snadné měření v Clarity přes společné selektory.

**Validační checklist pro konverzní testy:**
- [x] Přiřadit unikátní `data-cta` atributy (primary vs secondary) a ověřit eventy `cta_primary_click` / `cta_secondary_click` v Clarity. *(Upraveno 22. 11. 2025 – instrumentace hotová ve 12 článcích + automatické eventy ve `scripts/inject-tracking.js`)*
- [ ] Nahrát screenshoty nových CTA bloků do evidence (před/po) pro testovací report.
- [ ] Vytvořit segment „Intent CTA“ v Clarity (filtr na URL + event) a uložit dashboard.
- [ ] Počáteční baseline: zaznamenat CTR a konverzi za 7 dní před spuštěním testu v `/metrics/weekly/`.
- [ ] Spustit A/B experiment (např. Clarity heatmap + manuální split) u alespoň jednoho comparison článku a logovat výsledky po 500 sessions.
- [ ] Prezentovat výsledky na Week 8 review (zásah, CTR, konverze) + doporučení pro další iteraci.

**Expected Outcome:** 76% higher conversion from matched intent

**Validation:**
- [x] 12 articles updated with intent-matched CTAs (viz seznam výše)
- [x] Click tracking configured in Clarity (navázáno na data-cta eventy `cta_primary_click` / `cta_secondary_click`)
- [ ] Conversion rate by CTA type measured (po nasbírání dat)
- [ ] A/B test results documented (Week 8)

---

### Action 2.4: Continue Phase 1 Articles (2-4)
**Deadline:** December 20, 2025  
**Owner:** [Assign]  
**Status:** ✅ COMPLETED – December 7, 2025

**Article 2: Co Se Stane Když Nesplácíte**
- **URL:** `/blog/co-se-stane-kdyz-nesplacite-pujcku/` (publ. 6. 12. 2025)
- **Details:** 2 000+ slov, timeline 30/60/90 dnů, restrukturalizace a prevence.
- **Schema:** BlogPosting + FAQPage (8 otázek) + Breadcrumb + QAPage.

**Article 3: Předčasné Splacení Půjčky**
- **URL:** `/blog/predcasne-splaceni-pujcky/` (publ. 6. 12. 2025)
- **Details:** 1 600+ slov, krokový návod + modelová kalkulace úspory, HowTo schema.
- **Schema:** BlogPosting + HowTo + FAQPage + Breadcrumb.

**Article 4: Úrok a RPSN Průvodce**
- **URL:** `/blog/urok-a-rpsn-pruvodce/` (publ. 7. 12. 2025)
- **Details:** 2 300+ slov, tržní srovnání, strategie snížení nákladů a RPSN kalkulačka.
- **Schema:** BlogPosting + HowTo + FAQPage + Breadcrumb + WebApplication (kalkulačka).

**Expected Outcome:** 15 total článků (Phase 1 content hotovo, všechny 4 jádrové průvodce online)

**Validation:**
- [x] Articles follow quality checklist (TOC, CTA, FAQ, related links)
- [x] Schema markup validováno lokálně + Google Rich Results spot-check (co-se-stane..., predcasne-splaceni)
- [x] Internal linking doplněno (nové články odkazují na stávající průvodce + kalkulačku)
- [ ] Sitemap regenerována a nasazena (run `npm run build` po ověření)

---

## Phase 3: Technical Optimization (Weeks 7-10)

### Action 3.1: Implement Answer Schema
**Deadline:** January 10, 2026  
**Owner:** [Assign]  
**Status:** ✅ COMPLETED – November 24, 2025

**Goal:** Help AI engines extract definitive answers

**Delivered:** QAPage blocks (incl. conversational copy + Clarity-friendly anchors) published on 5 priority posts – `blog/jak-funguje-pujcka-pod-zastavu-auta/`, `blog/dokumenty-potrebne-pro-pujcku-pod-zastavu-auta/`, `blog/zastavni-smlouva-na-auto-kompletni-pruvodce/`, `blog/ohodnoceni-auta-pro-pujcku/`, `blog/pujcka-pod-zastavu-vs-bankovni-uver/`. Each matches the on-page “answer” blurb to improve extraction consistency.

**Answer Schema Template:**
```json
{
  "@context": "https://schema.org",
  "@type": "QAPage",
  "mainEntity": {
    "@type": "Question",
    "name": "Jak funguje půjčka pod zástavu auta?",
    "answerCount": 1,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Půjčka pod zástavu auta funguje ve 4 krocích: 1) Ohodnocení vozidla (24h), 2) Podpis zástavní smlouvy, 3) Výplata peněz (do 2h), 4) Splácení s udržením auta. Můžete získat 50-80% hodnoty vozu.",
      "upvoteCount": 0
    },
    "suggestedAnswer": []
  }
}
```

**Expected Outcome:** Featured in AI answer boxes

**Validation:**
- [x] 5 articles with Answer schema
- [x] Schema validates
- [ ] Test with Bing Copilot (manual query)
- [ ] Monitor for AI citations (Clarity data)
  - **Data trigger:** Activate both tasks as soon as Bing Webmaster Tools or Clarity shows AI traffic so we can capture real responses instead of placeholders.
  - **Copilot test plan:** Re-run the 5 core intent queries, log screenshots, and update `/metrics/weekly/`.
  - **AI citation tracking:** Create a Clarity segment filtered by `referrer=ai` + export weekly so citations can be tied back to sessions.

---

### Action 3.2: Add Calculator Widgets
**Deadline:** January 17, 2026  
**Owner:** [Assign]  
**Status:** ✅ MOSTLY COMPLETE – December 6, 2025 (pending: Úrok/RPSN dedicated article)

**Calculator 1: RPSN Calculator**
- Location: Article 4 (Úrok a RPSN)
- Inputs: Částka, Úrok, Poplatky, Doba splácení
- Output: RPSN %, celková částka, měsíční splátka
- Tech: JavaScript (vanilla or simple library)

**Calculator 2: Hodnota Auta Estimator**
- Location: Article 1 (Ohodnocení)
- Inputs: Značka, Model, Rok, Najetých km, Stav
- Output: Odhadovaná hodnota, možná výše půjčky
- Tech: JavaScript with data file

**Calculator 3: Splátka Calculator**
- Location: Homepage + multiple articles
- Inputs: Částka půjčky, Doba splácení
- Output: Měsíční splátka, celkem zaplaceno, RPSN
- Tech: JavaScript

**Progress (Dec 6, 2025):**
- **Refactored** `scripts/calculators.js` to support **multiple instances** via `data-calc-type` and `data-field`/`data-result` attributes – no more reliance on global IDs.
- All three calculator types emit Clarity events with `calculatorId` payload for per-widget analytics.
- Shared module `scripts/calculators.js` created (payment, value, RPSN logic + Clarity events) and loaded where needed.

**Deployed Calculators:**
- ✅ Splátková kalkulačka on `index.html` with WebApplication schema
- ✅ Hodnota auta estimator in `blog/ohodnoceni-auta-pro-pujcku/` with WebApplication schema
- ✅ RPSN kalkulačka in `blog/pujcka-pod-zastavu-vs-bankovni-uver/` with WebApplication schema
- ✅ RPSN kalkulačka in `blog/rychla-pujcka-vs-zastava-auta/` with WebApplication schema (Dec 6)
- ✅ RPSN kalkulačka in `blog/zastava-auta-vs-spotrebitelsky-uver/` with WebApplication schema (Dec 6)

**Remaining work:** Create dedicated Úrok/RPSN průvodce article (Action 2.4, Article 4).

**Schema Markup for Calculators:**
```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Kalkulačka RPSN",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Any",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "CZK"
  }
}
```

**Expected Outcome:** Interactive tools increase engagement + AI visibility

**Validation:**
- [x] 3 calculator types implemented (payment, value, RPSN) in shared JS module
- [x] Multi-instance support via data attributes (Dec 6, 2025)
- [x] Mobile responsive (spot-checked homepage + valuation article widgets)
- [x] WebApplication schema added (homepage + 4 blog articles)
- [x] Clarity events tracking usage (`calc_payment_update`, `calc_value_update`, `calc_rpsn_update` with `calculatorId`)
- [x] Embed calculators in all 3 comparison articles (Dec 6, 2025)
- [ ] Create dedicated Úrok/RPSN article with calculator (see Action 2.4)

---

### Action 3.3: Advanced Engagement Tracking
**Deadline:** January 24, 2026  
**Owner:** [Assign]  
**Status:** ✅ COMPLETED – December 6, 2025

**Implemented via `scripts/inject-tracking.js`:**
- Scroll depth tracking (25%, 50%, 75%, 90%) – fires `scroll_25`, `scroll_50`, etc.
- FAQ interaction tracking (`faq_interaction` on `<details><summary>` clicks)
- CTA click tracking (`cta_primary_click`, `cta_secondary_click` on `[data-cta]` links)
- Phone click tracking (`phone_click` on `a[href^="tel:"]`)
- Form submit tracking (`form_submit` on `#leadForm`)

All events auto-injected into every HTML file during `npm run build`.

**Clarity Custom Events to Add:**

**Scroll Depth Tracking:**
```javascript
// Add to all blog articles
let scrollDepths = [25, 50, 75, 90];
let fired = {};

window.addEventListener('scroll', () => {
  let scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  
  scrollDepths.forEach(depth => {
    if (scrollPercent >= depth && !fired[depth]) {
      clarity("event", `scroll_${depth}`);
      fired[depth] = true;
    }
  });
});
```

**FAQ Interaction Tracking:**
```javascript
// Track which FAQ questions users click
document.querySelectorAll('.faq-question').forEach(faq => {
  faq.addEventListener('click', () => {
    clarity("event", "faq_click", {
      question: faq.textContent.substring(0, 50)
    });
  });
});
```

**Time to Conversion:**
```javascript
// Track time from landing to form submission
let landingTime = Date.now();

document.querySelector('form').addEventListener('submit', () => {
  let timeToConvert = Math.floor((Date.now() - landingTime) / 1000);
  clarity("event", "conversion", {
    timeSeconds: timeToConvert
  });
});
```

**Expected Outcome:** Understand AI visitor behavior patterns

**Validation:**
- [ ] Custom events firing in Clarity
- [ ] Dashboard showing AI vs organic behavior
- [ ] Weekly reports generated
- [ ] Insights documented

---

### Action 3.4: Continue Phase 1 Articles (5-8)
**Deadline:** January 31, 2026  
**Owner:** [Assign]  
**Status:** ⏳ Not Started

**Article 5: Půjčka Pro OSVČ**
- Deadline: January 10, 2026

**Article 6: Insolvence a Půjčka**
- Deadline: January 17, 2026

**Article 7: Právní Aspekty Zástavy**
- Deadline: January 24, 2026

**Article 8: 10 Tipů Využití**
- Deadline: January 31, 2026

**Expected Outcome:** Phase 1 complete (19 total articles)

---

## Phase 4: Regional Expansion (Weeks 11-15)

### Action 4.1: Create Regional Content
**Deadline:** February 28, 2026  
**Owner:** [Assign]  
**Status:** ⏳ Not Started

**Priority Order:**

**1. Praha Article (Week 11)**
- 2,000+ words
- LocalBusiness schema
- Metro station guides
- District coverage
- Parking considerations

**2. Brno Article (Week 12)**
- 1,800+ words
- South Moravia context
- Local provider landscape

**3. Ostrava Article (Week 13)**
- 1,700+ words
- Industrial economy context
- Polish border considerations

**4. Regional Comparison (Week 14)**
- 2,000+ words
- Comparison table
- Market analysis

**Expected Outcome:** Dominate local voice search

**Validation:**
- [ ] 4 regional articles published
- [ ] LocalBusiness schema validated
- [ ] Google Business Profile updated (if applicable)
- [ ] Local search rankings tracked

---

### Action 4.2: Voice Search Optimization
**Deadline:** February 21, 2026  
**Owner:** [Assign]  
**Status:** ⏳ Not Started

**Updates Needed:**

**1. Speakable Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [".article-intro", ".faq-answer"]
  }
}
```

**2. Conversational Headers:**
- Change: "Ohodnocení procesu"
- To: "Jak probíhá ohodnocení auta?"

**3. Natural Language Answers:**
- Add direct answer paragraphs
- First sentence = complete answer
- Follow with details

**Expected Outcome:** Optimize for voice assistant queries

**Validation:**
- [ ] Speakable schema on 5+ articles
- [ ] Headers rewritten (conversational)
- [ ] Test with voice assistants (manual)
- [ ] Track voice-like queries in Search Console

---

### Action 4.3: Final Article Sprint
**Deadline:** February 28, 2026  
**Owner:** [Assign]  
**Status:** ⏳ Not Started

**Remaining Articles from Strategy:**
- Use Case Articles (9-14)
- Long-Tail Articles (15-20)
- Advanced Comparisons (25-28)

**Target:** 30+ total articles by end of Phase 4

**Expected Outcome:** Comprehensive topical coverage

**Validation:**
- [ ] 30+ articles published
- [ ] All categories balanced
- [ ] No content gaps remaining
- [ ] Full internal linking network

---

## Success Metrics & Reporting

### Weekly Metrics (Track Every Monday)

**Traffic Metrics:**
- Total organic sessions
- Blog traffic (% of total)
- Avg time on page
- Bounce rate
- Pages per session

**AI-Specific Metrics:**
- Bing Webmaster: Copilot impressions
- Clarity: AI referrals count
- Clarity: AI referral conversion rate
- Manual test: ChatGPT citations (5 queries)
- Manual test: Perplexity appearances (5 queries)

**Conversion Metrics:**
- Form submissions (total + by source)
- Phone clicks (total + by source)
- Conversion rate (organic vs AI)
- Time to conversion (organic vs AI)

**Content Metrics:**
- Articles published (cumulative)
- Featured snippets won
- "People Also Ask" appearances
- Average article word count

---

### Monthly Review Meetings

**Week 4 Review (December 20, 2025):**
- ✅ Phase 1 Foundation complete?
- 📊 Tracking data flowing?
- 📈 First AI referrals appearing?
- 🎯 Adjust Phase 2 based on learnings

**Week 8 Review (January 17, 2026):**
- ✅ Phase 2 Enhancement complete?
- 📊 Conversion rate comparison (AI vs organic)
- 📈 Content performance ranking
- 🎯 Adjust Phase 3 priorities

**Week 12 Review (February 14, 2026):**
- ✅ Phase 3 Technical complete?
- 📊 Calculator usage data
- 📈 Schema impact analysis
- 🎯 Finalize Phase 4 regional strategy

**Week 16 Review (March 14, 2026):**
- ✅ All 4 phases complete?
- 📊 Full 6-month comparison
- 📈 ROI calculation
- 🎯 Plan for next 6 months

---

## Key Performance Indicators

### 6-Month Targets (By May 2026)

**Traffic Goals:**
| Metric | Baseline (Nov 2025) | Target (May 2026) | Progress |
|--------|---------------------|-------------------|----------|
| AI Traffic Share | 0% | 15% | ⏳ |
| Organic Sessions | [TBD] | +200% | ⏳ |
| Blog Traffic % | [TBD] | 60% | ⏳ |
| Avg Time on Page | [TBD] | 3+ min | ⏳ |
| Bounce Rate | [TBD] | <60% | ⏳ |

**Conversion Goals:**
| Metric | Baseline | Target | Progress |
|--------|----------|--------|----------|
| AI Conversion Rate | N/A | 15-18% | ⏳ |
| Organic Conversion Rate | [TBD] | 5-6% | ⏳ |
| Form Submissions | [TBD] | +150% | ⏳ |
| Phone Clicks | [TBD] | +100% | ⏳ |

**Content Goals:**
| Metric | Baseline | Target | Progress |
|--------|----------|--------|----------|
| Total Articles | 12 | 30+ | ✅ 12 |
| Featured Snippets | [TBD] | 10+ | ⏳ |
| AI Citations | 0 | 5+ | ⏳ |
| FAQ Coverage | ~50% | 100% | ⏳ |

---

## Risk Management

### Identified Risks

**Risk 1: Delayed Tool Setup**
- **Impact:** Can't measure AI traffic
- **Mitigation:** Prioritize Actions 1.1-1.2 in Week 1
- **Owner:** [Assign]

**Risk 2: Content Quality at Scale**
- **Impact:** Thin content hurts rankings
- **Mitigation:** Quality checklist for each article
- **Owner:** [Assign]

**Risk 3: Technical Implementation**
- **Impact:** Calculators, schema may have bugs
- **Mitigation:** Test thoroughly, staged rollout
- **Owner:** [Assign]

**Risk 4: AI Search Algorithm Changes**
- **Impact:** Strategy may need adjustment
- **Mitigation:** Monitor monthly, stay flexible
- **Owner:** [Assign]

---

## Quick Reference

### Tools & Access

**Microsoft Clarity:**
- URL: https://clarity.microsoft.com/
- Login: [Add credentials]
- Project: AutoZástava24

**Bing Webmaster Tools:**
- URL: https://www.bing.com/webmasters/
- Login: [Add credentials]
- Site: www.autozastava24.cz

**GitHub Repository:**
- URL: https://github.com/malonitest/zpaweb
- Branch: main
- Deployment: Azure Static Web Apps

**Google Search Console:**
- URL: https://search.google.com/search-console
- Property: www.autozastava24.cz

### Key Documents

- AI Content Strategy: `/AI-CONTENT-STRATEGY.md`
- This Action Plan: `/AI-IMPLEMENTATION-ACTION-PLAN.md`
- Baseline Metrics: `/metrics/baseline-november-2025.md` (to create)
- Weekly Reports: `/metrics/weekly/` (to create folder)

### Team Contacts

- Content Writer: [Name, Email]
- Developer: [Name, Email]
- SEO Specialist: [Name, Email]
- Project Manager: [Name, Email]

---

## Next Immediate Actions

### ✅ Completed Today (November 22, 2025)
1. ✅ Register Bing Webmaster Tools (30 minutes)
2. ✅ Register Microsoft Clarity (30 minutes)
3. ✅ Implement Clarity tracking on all pages (1 hour)

### 🔥 Priority Next Steps (Week 1)
1. **📊 Document baseline metrics** (1 hour) - Action 1.4
   - Record current traffic data
   - Test 5 AI search queries manually
   - Create /metrics/baseline-november-2025.md
2. **📝 Add structured comparison tables** (2-3 hours) - Action 1.3
   - Update 3 comparison articles
   - Add schema markup
   - Test mobile rendering
3. **👥 Schedule Week 4 review meeting** (5 minutes)
   - Set calendar for December 20, 2025
   - Invite team members
4. **⏰ Wait for tracking data** (24-48 hours)
   - Check Bing Webmaster Tools dashboard
   - Verify Clarity recording sessions

**Estimated time remaining:** ~4 hours

---

**Status:** Ready for implementation  
**Last Updated:** November 22, 2025  
**Next Review:** December 20, 2025 (Week 4)  
**Questions:** [Add contact for questions]
