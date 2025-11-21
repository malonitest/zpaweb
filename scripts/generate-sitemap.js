#!/usr/bin/env node

/**
 * Automatic Sitemap Generator for AutoZástava24
 * Scans HTML files and generates sitemap.xml
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.autozastava24.cz';
const OUTPUT_FILE = path.join(__dirname, '../sitemap.xml');

// Configuration for different page types
const pageConfig = {
  '/': { priority: 1.0, changefreq: 'weekly' },
  '/o-nas.html': { priority: 0.9, changefreq: 'monthly', url: '/o-nas' },
  '/blog/': { priority: 0.9, changefreq: 'weekly' },
  '/autor/': { priority: 0.7, changefreq: 'monthly' },
  '/obchodni-podminky.html': { priority: 0.3, changefreq: 'yearly', url: '/obchodni-podminky' },
  '/ochrana-osobnich-udaju.html': { priority: 0.3, changefreq: 'yearly', url: '/ochrana-osobnich-udaju' },
  '/informace-o-spolecnosti.html': { priority: 0.4, changefreq: 'monthly', url: '/informace-o-spolecnosti' },
  '/mapa-stranek.html': { priority: 0.3, changefreq: 'monthly', url: '/mapa-stranek' }
};

// Blog article categories
const blogCategories = {
  'jak-funguje': { priority: 0.9, category: 'Průvodce' },
  'dokumenty': { priority: 0.8, category: 'Průvodce' },
  'zastavni-smlouva': { priority: 0.8, category: 'Průvodce' },
  'ohodnoceni': { priority: 0.9, category: 'Průvodce' },
  'pujcka-pod-zastavu-vs': { priority: 0.8, category: 'Srovnání' },
  'zastava-auta-vs': { priority: 0.8, category: 'Srovnání' },
  'leasing-vs': { priority: 0.8, category: 'Srovnání' },
  'pujcka-pod-zastavu-skody': { priority: 0.8, category: 'Vozidla' },
  'pujcka-pod-volkswagen': { priority: 0.8, category: 'Vozidla' },
  'dodavky-uzitkove': { priority: 0.8, category: 'Vozidla' },
  'tipy-jak': { priority: 0.8, category: 'Finanční Rady' },
  'rizeni-rodinnych': { priority: 0.8, category: 'Finanční Rady' }
};

function getLastModified(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.mtime.toISOString().split('T')[0];
  } catch (e) {
    return new Date().toISOString().split('T')[0];
  }
}

function scanBlogArticles(baseDir) {
  const blogDir = path.join(baseDir, 'blog');
  const articles = [];

  if (!fs.existsSync(blogDir)) return articles;

  const entries = fs.readdirSync(blogDir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const indexPath = path.join(blogDir, entry.name, 'index.html');
      if (fs.existsSync(indexPath)) {
        const url = `/blog/${entry.name}/`;
        const lastmod = getLastModified(indexPath);
        
        // Determine category and priority
        let priority = 0.8;
        let category = 'Ostatní';
        
        for (const [key, config] of Object.entries(blogCategories)) {
          if (entry.name.includes(key)) {
            priority = config.priority;
            category = config.category;
            break;
          }
        }

        articles.push({
          url,
          lastmod,
          changefreq: 'monthly',
          priority,
          category
        });
      }
    }
  }

  return articles;
}

function scanAuthorPages(baseDir) {
  const autorDir = path.join(baseDir, 'autor');
  const pages = [];

  if (!fs.existsSync(autorDir)) return pages;

  const entries = fs.readdirSync(autorDir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const indexPath = path.join(autorDir, entry.name, 'index.html');
      if (fs.existsSync(indexPath)) {
        pages.push({
          url: `/autor/${entry.name}/`,
          lastmod: getLastModified(indexPath),
          changefreq: 'monthly',
          priority: 0.7
        });
      }
    }
  }

  return pages;
}

function generateSitemap() {
  const baseDir = path.join(__dirname, '..');
  const urls = [];

  // Add homepage
  urls.push({
    url: '/',
    lastmod: getLastModified(path.join(baseDir, 'index.html')),
    changefreq: 'weekly',
    priority: 1.0,
    hreflang: true
  });

  // Add static pages
  for (const [file, config] of Object.entries(pageConfig)) {
    if (file === '/' || file === '/blog/' || file === '/autor/') continue;
    
    const filePath = path.join(baseDir, file);
    if (fs.existsSync(filePath)) {
      urls.push({
        url: config.url || file.replace('.html', ''),
        lastmod: getLastModified(filePath),
        changefreq: config.changefreq,
        priority: config.priority
      });
    }
  }

  // Add blog hub
  const blogIndexPath = path.join(baseDir, 'blog', 'index.html');
  if (fs.existsSync(blogIndexPath)) {
    urls.push({
      url: '/blog/',
      lastmod: getLastModified(blogIndexPath),
      changefreq: 'weekly',
      priority: 0.9
    });
  }

  // Add author pages
  const authorPages = scanAuthorPages(baseDir);
  urls.push(...authorPages);

  // Add blog articles
  const articles = scanBlogArticles(baseDir);
  urls.push(...articles);

  // Sort by priority (highest first)
  urls.sort((a, b) => b.priority - a.priority);

  // Generate XML
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

`;

  // Group by category for comments
  const grouped = {
    'Homepage': [],
    'Static Pages': [],
    'Blog Hub': [],
    'Author Pages': [],
    'Průvodce': [],
    'Srovnání': [],
    'Vozidla': [],
    'Finanční Rady': [],
    'Legal Pages': []
  };

  urls.forEach(page => {
    if (page.url === '/') {
      grouped['Homepage'].push(page);
    } else if (page.url === '/blog/') {
      grouped['Blog Hub'].push(page);
    } else if (page.url.startsWith('/autor/')) {
      grouped['Author Pages'].push(page);
    } else if (page.url.startsWith('/blog/')) {
      const category = page.category || 'Ostatní';
      if (!grouped[category]) grouped[category] = [];
      grouped[category].push(page);
    } else if (page.priority <= 0.4) {
      grouped['Legal Pages'].push(page);
    } else {
      grouped['Static Pages'].push(page);
    }
  });

  // Add URLs with comments
  for (const [category, pages] of Object.entries(grouped)) {
    if (pages.length === 0) continue;

    xml += `  <!-- ${category} -->\n`;
    
    pages.forEach(page => {
      xml += `  <url>\n`;
      xml += `    <loc>${BASE_URL}${page.url}</loc>\n`;
      xml += `    <lastmod>${page.lastmod}</lastmod>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `    <priority>${page.priority.toFixed(1)}</priority>\n`;
      
      if (page.hreflang) {
        xml += `    <xhtml:link rel="alternate" hreflang="cs" href="${BASE_URL}${page.url}"/>\n`;
      }
      
      xml += `  </url>\n\n`;
    });
  }

  xml += `</urlset>\n`;

  // Write file
  fs.writeFileSync(OUTPUT_FILE, xml, 'utf8');
  
  console.log('✅ Sitemap generated successfully!');
  console.log(`📄 Total URLs: ${urls.length}`);
  console.log(`📍 Location: ${OUTPUT_FILE}`);
  console.log('\nBreakdown:');
  for (const [category, pages] of Object.entries(grouped)) {
    if (pages.length > 0) {
      console.log(`  ${category}: ${pages.length}`);
    }
  }
}

// Run generator
try {
  generateSitemap();
} catch (error) {
  console.error('❌ Error generating sitemap:', error);
  process.exit(1);
}
