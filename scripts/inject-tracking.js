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

function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function replaceOrInsert({ content, snippet, startMarker, endMarker, legacyRegex, anchorTag }) {
    if (!snippet) {
        return { content, changed: false };
    }

    const autoRegex = new RegExp(`${escapeRegExp(startMarker)}[\s\S]*?${escapeRegExp(endMarker)}`, 'i');
    if (autoRegex.test(content)) {
        const updated = content.replace(autoRegex, snippet);
        return { content: updated, changed: updated !== content };
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
            legacyRegex: /<!--\s*Microsoft Clarity\s*-->[\s\S]*?<script[\s\S]*?<\/script>/i,
            anchorTag: '</body>'
        });
        content = clarityResult.content;
        if (clarityResult.changed) {
            changed = true;
            summary.clarityUpdated += 1;
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
if (summary.gaUpdated) {
    console.log(`[tracking] Google Analytics snippet updated/inserted in ${summary.gaUpdated} files.`);
}
if (googleTagId && !summary.gaUpdated) {
    console.log('[tracking] Google Analytics snippet already up-to-date.');
}
if (clarityProjectId && !summary.clarityUpdated) {
    console.log('[tracking] Microsoft Clarity snippet already up-to-date.');
}
