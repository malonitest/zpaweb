# AutoZástava24 - Statická webová stránka

Moderní webová stránka pro společnost AutoZástava24, poskytující rychlé půjčky pod zástavu auta.

## 🚀 Hlavní slogan
**"Jezdíte dál. Peníze máte do 24 hodin."**

## ✨ Funkce

### SEO & Optimalizace
- ✅ Sémantické HTML5 značky pro lepší indexaci
- ✅ Meta tagy (description, keywords, author, robots)
- ✅ Open Graph protokol pro sociální sítě
- ✅ Twitter Card meta tagy
- ✅ Schema.org strukturovaná data (FinancialService)
- ✅ Optimalizace pro AI vyhledávání
- ✅ Sitemap.xml pro vyhledávače
- ✅ Robots.txt pro správné indexování

### PWA (Progressive Web App)
- ✅ Manifest.json pro instalaci aplikace
- ✅ Service Worker pro offline funkcionalitu
- ✅ Cachování statických zdrojů
- ✅ Ikony ve všech velikostech
- ✅ Podpora notifikací (připraveno)

### Design & UX
- ✅ Moderní design inspirovaný cashndrive.cz
- ✅ Tailwind CSS pro responzivní layout
- ✅ Mobilní optimalizace (Mobile-first)
- ✅ Plynulé animace a přechody
- ✅ Přístupnost (ARIA labels)

### Obsah
- ✅ Hero sekce s hlavním sloganem
- ✅ Funkční kontaktní formulář s validací
- ✅ Sekce výhod (6 hlavních benefit bodů)
- ✅ Jak to funguje (4 kroky)
- ✅ FAQ sekce
- ✅ Kontaktní informace
- ✅ Footer s odkazy

## 📁 Struktura souborů

```
zpaweb/
├── index.html           # Hlavní HTML stránka
├── manifest.json        # PWA manifest
├── service-worker.js    # Service Worker pro PWA
├── sitemap.xml         # Sitemap pro vyhledávače
├── robots.txt          # Robots.txt pro SEO
└── README.md           # Tento soubor
```

## 🛠️ Technologie

- **HTML5** - Sémantická struktura
- **Tailwind CSS** - Moderní CSS framework (CDN)
- **Vanilla JavaScript** - Bez závislostí
- **PWA** - Progressive Web App
- **Schema.org** - Strukturovaná data

## 🚀 Nasazení

### Statický hosting (doporučeno)

Stránka je 100% statická a lze ji nasadit na libovolný statický hosting:

#### Netlify
```bash
# Nainstalujte Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

#### Vercel
```bash
# Nainstalujte Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

#### GitHub Pages
1. Push do GitHub repository
2. Aktivujte GitHub Pages v nastavení
3. Vyberte main branch jako source

#### Cloudflare Pages
1. Připojte GitHub repository
2. Nastavte build command: (none)
3. Output directory: /

### Klasický web hosting
Nahrajte všechny soubory do kořenového adresáře webu pomocí FTP nebo cPanel.

## 📝 Konfigurace

### 1. Doména
Upravte všechny instance `https://www.autozastava24.cz` na vaši skutečnou doménu v:
- `index.html` (Open Graph, Schema.org, canonical URL)
- `sitemap.xml` (všechny URL)
- `robots.txt` (sitemap URL)

### 2. Kontaktní informace
Aktualizujte v `index.html`:
- Telefonní číslo
- Email
- Adresa

### 3. Ikony a obrázky
Vytvořte následující soubory:
- `favicon.png` (32x32)
- `apple-touch-icon.png` (180x180)
- `og-image.jpg` (1200x630 pro social media)
- `icon-*.png` (72x72 až 512x512 pro PWA)

### 4. Analytics
Přidejte Google Analytics nebo jiný tracking kód do `<head>` sekce.

## 🔧 Formulář

Formulář je připraven pro integraci s backend API. Pro funkční zpracování:

1. Vytvořte backend API endpoint
2. Upravte `fetch()` volání v JavaScript sekci
3. Nebo použijte služby jako:
   - Formspree
   - Basin
   - Netlify Forms
   - Google Forms API

Příklad integrace s Netlify Forms:
```html
<form name="leadForm" method="POST" data-netlify="true">
  <!-- form fields -->
</form>
```

## 🎨 Přizpůsobení

### Barvy
Upravte v `tailwind.config`:
```javascript
colors: {
    primary: '#1e40af',    // Hlavní modrá
    secondary: '#3b82f6',  // Světlejší modrá
}
```

### Obsah
- Texty jsou v češtině
- Logo SVG lze nahradit vlastním
- Všechny sekce jsou snadno upravitelné

## ✅ SEO Checklist

- [x] Sémantické HTML5 značky
- [x] Meta description a keywords
- [x] Open Graph tags
- [x] Schema.org strukturovaná data
- [x] Sitemap.xml
- [x] Robots.txt
- [x] Responzivní design
- [x] Rychlé načítání
- [x] Přístupnost (Alt texty, ARIA)
- [x] HTTPS ready
- [x] PWA funkce

## 📱 PWA Instalace

Uživatelé mohou nainstalovat web jako aplikaci:
- **Android**: Chrome nabídne "Přidat na plochu"
- **iOS**: Safari > Sdílet > Přidat na plochu
- **Desktop**: Chrome > Menu > Nainstalovat AutoZástava24

## 🔍 Testování

### Validace
- HTML: https://validator.w3.org/
- Schema.org: https://validator.schema.org/
- Open Graph: https://www.opengraph.xyz/
- PWA: Chrome DevTools > Lighthouse

### SEO nástroje
- Google Search Console
- Google PageSpeed Insights
- GTmetrix
- SEMrush

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