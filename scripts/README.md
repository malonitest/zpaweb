# Automatic Sitemap Generator

This script automatically generates `sitemap.xml` by scanning all HTML files in the project.

## Features

- 🔄 **Automatic discovery** - Finds all blog articles and author pages
- 📅 **Smart lastmod dates** - Uses file modification times
- 🏷️ **Category detection** - Automatically categorizes blog articles
- ⚙️ **Priority assignment** - Sets appropriate priorities based on content type
- 📊 **Organized output** - Groups URLs by category with comments

## Usage

### Generate sitemap manually:
```bash
npm run generate:sitemap
```

### Automatic generation during build:
```bash
npm run build
```
This runs CSS compilation AND sitemap generation.

## How it works

1. **Scans directories**: Looks through `/blog/` and `/autor/` folders
2. **Reads file dates**: Gets last modified date from file system
3. **Categorizes content**: Auto-detects blog categories (Průvodce, Srovnání, etc.)
4. **Assigns priorities**: 
   - Homepage: 1.0
   - Blog hub: 0.9
   - Blog articles: 0.8-0.9
   - Author pages: 0.7
   - Legal pages: 0.3-0.4
5. **Generates XML**: Creates properly formatted sitemap.xml

## Configuration

Edit `scripts/generate-sitemap.js` to customize:

- `BASE_URL` - Your domain
- `pageConfig` - Static page settings
- `blogCategories` - Article categorization rules

## Output

Generates `sitemap.xml` with:
- 19+ URLs (automatically grows with new content)
- Proper XML namespaces
- Category grouping
- Czech language hreflang tags
- XSL stylesheet reference

## When to regenerate

Run `npm run generate:sitemap` after:
- ✅ Adding new blog articles
- ✅ Creating new author pages
- ✅ Adding new static pages
- ✅ Updating content significantly

Or just run `npm run build` before deploying!

## Example output

```
✅ Sitemap generated successfully!
📄 Total URLs: 19
📍 Location: /workspaces/zpaweb/sitemap.xml

Breakdown:
  Homepage: 1
  Blog Hub: 1
  Author Pages: 1
  Průvodce: 3
  Srovnání: 3
  Vozidla: 3
  Finanční Rady: 2
  Legal Pages: 4
```
