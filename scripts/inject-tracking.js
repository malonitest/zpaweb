#!/usr/bin/env node
/**
 * Auto-inject Microsoft Clarity and analytics tracking snippets
 * into every HTML file before deployment/build.
 *
 * The script is idempotent – running it multiple times will not
 * duplicate snippets. Existing snippets will be upgraded to the
 * managed version that includes explicit start/end markers.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const CONFIG_PATH = path.join(__dirname, 'tracking-config.json');
const IGNORED_DIRS = new Set([
    'node_modules',
    '.git',
    '.github',
    '.claude'
]);

if (!fs.existsSync(CONFIG_PATH)) {
    console.error('[tracking] Missing scripts/tracking-config.json.');
    process.exit(1);
}

const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
const clarityProjectId = process.env.CLARITY_PROJECT_ID || config.clarityProjectId || '';
const googleTagId = process.env.GA_MEASUREMENT_ID || config.googleTagId || '';

const CLARITY_MARKER_START = '<!-- Tracking: Microsoft Clarity (auto) -->';
const CLARITY_MARKER_END = '<!-- /Tracking: Microsoft Clarity (auto) -->';
const CLARITY_EVENTS_MARKER_START = '<!-- Tracking: Microsoft Clarity Events (auto) -->';
const CLARITY_EVENTS_MARKER_END = '<!-- /Tracking: Microsoft Clarity Events (auto) -->';
const GA_MARKER_START = '<!-- Tracking: Google Analytics (auto) -->';
const GA_MARKER_END = '<!-- /Tracking: Google Analytics (auto) -->';

if (!clarityProjectId && !googleTagId) {
    console.warn('[tracking] No tracking IDs configured. Nothing to inject.');
    process.exit(0);
}

const summary = {
    processed: 0,
    updated: 0,
    clarityUpdated: 0,
    clarityEventsUpdated: 0,
    gaUpdated: 0
};

const claritySnippet = clarityProjectId
    ? `${CLARITY_MARKER_START}\n` +
      '    <script type="text/javascript">\n' +
      '        (function(c,l,a,r,i,t,y){\n' +
      '            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};\n' +
      '            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;\n' +
      '            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);\n' +
      `        })(window, document, "clarity", "script", "${clarityProjectId}");\n` +
      '    </script>\n' +
      `${CLARITY_MARKER_END}`
    : '';

const gaSnippet = googleTagId
    ? `${GA_MARKER_START}\n` +
      `    <script async src="https://www.googletagmanager.com/gtag/js?id=${googleTagId}"></script>\n` +
      '    <script>\n' +
      '        window.dataLayer = window.dataLayer || [];\n' +
      '        function gtag(){dataLayer.push(arguments);}\n' +
      '        gtag("js", new Date());\n' +
      `        gtag("config", "${googleTagId}");\n` +
      '    </script>\n' +
      `${GA_MARKER_END}`
    : '';

const clarityEventsSnippet = clarityProjectId
        ? `${CLARITY_EVENTS_MARKER_START}\n` +
            '    <script>\n' +
            '        (function () {\n' +
            '            const fireClarityEvent = (name, data) => {\n' +
            '                if (typeof clarity === "function") {\n' +
            '                    clarity("event", name, Object.assign({ page: window.location.pathname }, data));\n' +
            '                }\n' +
            '            };\n' +
            '            const onReady = (callback) => {\n' +
            '                if (document.readyState === "complete" || document.readyState === "interactive") {\n' +
            '                    callback();\n' +
            '                    return;\n' +
            '                }\n' +
            '                document.addEventListener("DOMContentLoaded", callback);\n' +
            '            };\n' +
            '            onReady(() => {\n' +
            '                const leadForm = document.getElementById("leadForm");\n' +
            '                if (leadForm) {\n' +
            '                    leadForm.addEventListener("submit", () => fireClarityEvent("form_submit"));\n' +
            '                }\n' +
            '                document.querySelectorAll(\'a[href^="tel:"]\').forEach((link) => {\n' +
            '                    link.addEventListener("click", () => {\n' +
            '                        fireClarityEvent("phone_click", { phone: link.getAttribute("href").replace("tel:", "") });\n' +
            '                    });\n' +
            '                });\n' +
            '                document.querySelectorAll("a[data-cta]").forEach((ctaLink) => {\n' +
            '                    ctaLink.addEventListener("click", () => {\n' +
            '                        const ctaType = ctaLink.getAttribute("data-cta") || "unknown";\n' +
            '                        const label = (ctaLink.textContent || "").trim().substring(0, 120);\n' +
            '                        fireClarityEvent(`cta_${ctaType}_click`, {\n' +
            '                            ctaType,\n' +
            '                            href: ctaLink.getAttribute("href"),\n' +
            '                            label\n' +
            '                        });\n' +
            '                    });\n' +
            '                });\n' +
            '                document.querySelectorAll("details summary").forEach((summaryEl) => {\n' +
            '                    summaryEl.addEventListener("click", () => {\n' +
            '                        const text = (summaryEl.textContent || "").trim().substring(0, 120);\n' +
            '                        fireClarityEvent("faq_interaction", { question: text });\n' +
            '                    });\n' +
            '                });\n' +
            '                const thresholds = [25, 50, 75, 90];\n' +
            '                const firedDepths = new Set();\n' +
            '                window.addEventListener("scroll", () => {\n' +
            '                    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;\n' +
            '                    if (maxScroll <= 0) {\n' +
            '                        return;\n' +
            '                    }\n' +
            '                    const percent = Math.round((window.scrollY / maxScroll) * 100);\n' +
            '                    thresholds.forEach((depth) => {\n' +
            '                        if (!firedDepths.has(depth) && percent >= depth) {\n' +
            '                            firedDepths.add(depth);\n' +
            '                            fireClarityEvent(`scroll_${depth}`, { depth });\n' +
            '                        }\n' +
            '                    });\n' +
            '                }, { passive: true });\n' +
            '            });\n' +
            '        })();\n' +
            '    </script>\n' +
            `${CLARITY_EVENTS_MARKER_END}`
        : '';

function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function replaceOrInsert({ content, snippet, startMarker, endMarker, legacyRegex, anchorTag }) {
    if (!snippet) {
        return { content, changed: false };
    }

    const autoRegex = new RegExp(`${escapeRegExp(startMarker)}[\\s\\S]*?${escapeRegExp(endMarker)}`, 'gi');
    let autoCount = 0;
    let autoChanged = false;
    const updatedWithAuto = content.replace(autoRegex, (match) => {
        autoCount += 1;
        if (autoCount === 1) {
            if (match !== snippet) {
                autoChanged = true;
            }
            return snippet;
        }
        autoChanged = true;
        return '';
    });
    if (autoCount > 0) {
        return { content: updatedWithAuto, changed: autoChanged };
    }

    if (legacyRegex && legacyRegex.test(content)) {
        const updated = content.replace(legacyRegex, snippet);
        return { content: updated, changed: true };
    }

    if (!anchorTag || !content.includes(anchorTag)) {
        return { content, changed: false };
    }

    const updated = content.replace(anchorTag, `${snippet}\n${anchorTag}`);
    return { content: updated, changed: true };
}

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    if (claritySnippet) {
        const clarityResult = replaceOrInsert({
            content,
            snippet: claritySnippet,
            startMarker: CLARITY_MARKER_START,
            endMarker: CLARITY_MARKER_END,
            legacyRegex: /<!--\s*Microsoft Clarity\s*-->[\s\S]*?<script[\s\S]*?<\/script>/gi,
            anchorTag: '</body>'
        });
        content = clarityResult.content;
        if (clarityResult.changed) {
            changed = true;
            summary.clarityUpdated += 1;
        }
    }

    if (clarityEventsSnippet) {
        const clarityEventsResult = replaceOrInsert({
            content,
            snippet: clarityEventsSnippet,
            startMarker: CLARITY_EVENTS_MARKER_START,
            endMarker: CLARITY_EVENTS_MARKER_END,
            legacyRegex: null,
            anchorTag: '</body>'
        });
        content = clarityEventsResult.content;
        if (clarityEventsResult.changed) {
            changed = true;
            summary.clarityEventsUpdated += 1;
        }
    }

    if (gaSnippet) {
        const gaResult = replaceOrInsert({
            content,
            snippet: gaSnippet,
            startMarker: GA_MARKER_START,
            endMarker: GA_MARKER_END,
            legacyRegex: null,
            anchorTag: '</head>'
        });
        content = gaResult.content;
        if (gaResult.changed) {
            changed = true;
            summary.gaUpdated += 1;
        }
    }

    summary.processed += 1;

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        summary.updated += 1;
    }
}

function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    entries.forEach((entry) => {
        if (IGNORED_DIRS.has(entry.name)) {
            return;
        }

        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            walk(fullPath);
            return;
        }

        if (entry.isFile() && entry.name.endsWith('.html')) {
            processFile(fullPath);
        }
    });
}

walk(ROOT);

console.log(`[tracking] Processed ${summary.processed} HTML files. Updated ${summary.updated}.`);
if (summary.clarityUpdated) {
    console.log(`[tracking] Microsoft Clarity snippet updated/inserted in ${summary.clarityUpdated} files.`);
}
if (summary.clarityEventsUpdated) {
    console.log(`[tracking] Microsoft Clarity event helpers updated/inserted in ${summary.clarityEventsUpdated} files.`);
}
if (summary.gaUpdated) {
    console.log(`[tracking] Google Analytics snippet updated/inserted in ${summary.gaUpdated} files.`);
}
if (googleTagId && !summary.gaUpdated) {
    console.log('[tracking] Google Analytics snippet already up-to-date.');
}
if (clarityProjectId && !summary.clarityUpdated) {
    console.log('[tracking] Microsoft Clarity snippet already up-to-date.');
}
