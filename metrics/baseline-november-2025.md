# Baseline Metrics — Week of 18–24 November 2025

_Last updated: 22 November 2025_

Use this template to capture the "before" snapshot for all KPIs referenced in Action 1.4. Update the placeholder values once data is gathered from GA, Clarity, Bing Webmaster Tools, and manual AI tests.

---

## 1. Traffic Overview (GA / Clarity)

| Metric | Value | Source | Notes |
| --- | --- | --- | --- |
| Total organic sessions | `3` | Clarity (Channel report) | 3 / 6 sessions tagged as OrganicSearch (Google) |
| Blog traffic (sessions) | `TBD` | GA4 | Include % of total |
| Average time on page | `2.7 min active / 5.7 min total` | Clarity dashboard | Averages from 6 sessions (Active 162s, Total 339s) |
| Bounce rate | `TBD` | GA4 |  | 
| Pages per session | `2` | Clarity dashboard | Bots excluded (2 flagged) |
| Form submissions | `TBD` | Clarity / CRM | Count w/ source if possible |
| Phone clicks | `TBD` | Clarity custom event |  |

**Clarity snapshot (22–24 Nov):** 6 sessions (4 unique users, 2 bot sessions excluded), average scroll depth 53.25%, quick back rate 16.67%, `calc_payment_update` fired in 1 session. Top pages: homepage (4 sessions) and blog hub (2 sessions).

### Screenshot Checklist
- [ ] GA4 Traffic overview (18–24 Nov)
- [ ] Blog segment report
- [ ] Clarity conversions view

Attach screenshots inside `metrics/screenshots/2025-11/` and note filenames here:
```
- traffic-overview.png
- blog-segment.png
- clarity-conversions.png
```

---

## 2. Ranking Benchmarks (Search Console / manual SERP)

| Keyword | SERP Position | Source | Notes |
| --- | --- | --- | --- |
| půjčka pod zástavu auta | `TBD` | GSC Avg position |  |
| ohodnocení auta | `TBD` | GSC Avg position |  |
| zástavní smlouva auto | `TBD` | GSC Avg position |  |
| (extra) půjčka se zástavou vozidla | `Optional` |  |  |

### Evidence
- [ ] Export GSC position report (CSV)
- [ ] Screenshot SERP examples (desktop / mobile)

---

## 3. AI Visibility (Manual tests)

Perform 5 queries per platform and record whether autozastava24.cz is cited/mentioned.

| Platform | Query | Result | Evidence |
| --- | --- | --- | --- |
| ChatGPT | `TBD` | `Mention / No` | `link to screenshot` |
| ChatGPT | `TBD` | ` ` |  |
| Perplexity | `TBD` | ` ` |  |
| Perplexity | `TBD` | ` ` |  |
| Bing Copilot | `TBD` | ` ` |  |

Notes:
- Use neutral language (CZ) similar to target keywords.
- Capture screenshot or copy citation when site is referenced.

---

## 4. IndexNow / Technical Status

| Item | Status | Date Verified |
| --- | --- | --- |
| Sitemap submitted to Bing | ✅ 22 Nov 2025 |
| IndexNow key active | ✅ 22 Nov 2025 |
| Clarity tracking live | ✅ 22 Nov 2025 |
| GA4 property connected | `TBD` | `TBD` |

---

## 5. Weekly Tracking Setup

- [ ] Create `/metrics/weekly/2025-week-48.md`
- [ ] Define columns for traffic, conversions, AI visibility
- [ ] Schedule Monday reminder to update metrics

---

### Action Items
1. Fill in all `TBD` values with actual data.
2. Upload supporting screenshots and link them above.
3. Update `AI-IMPLEMENTATION-ACTION-PLAN.md` validation checklist once all boxes are complete.
