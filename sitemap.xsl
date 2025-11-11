<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
<xsl:template match="/">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>XML Sitemap - AutoZástava24</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <style type="text/css">
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            font-size: 14px;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
        }
        #header {
            background-color: #1e40af;
            color: #fff;
            padding: 30px 20px;
            text-align: center;
        }
        #header h1 {
            margin: 0;
            font-size: 32px;
            font-weight: 600;
        }
        #header p {
            margin: 10px 0 0 0;
            font-size: 16px;
            opacity: 0.9;
        }
        #content {
            max-width: 1200px;
            margin: 30px auto;
            padding: 0 20px;
        }
        .info-box {
            background: #fff;
            border-left: 4px solid #1e40af;
            padding: 20px;
            margin-bottom: 30px;
            border-radius: 4px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .info-box h2 {
            margin: 0 0 15px 0;
            font-size: 20px;
            color: #1e40af;
        }
        .info-box p {
            margin: 0 0 10px 0;
            line-height: 1.6;
        }
        .info-box ul {
            margin: 10px 0;
            padding-left: 20px;
        }
        .info-box li {
            margin: 5px 0;
        }
        table {
            width: 100%;
            background: #fff;
            border-collapse: collapse;
            border-radius: 4px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        thead {
            background-color: #1e40af;
            color: #fff;
        }
        th {
            padding: 15px;
            text-align: left;
            font-weight: 600;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        tr {
            border-bottom: 1px solid #e5e7eb;
        }
        tr:last-child {
            border-bottom: none;
        }
        tbody tr:hover {
            background-color: #f9fafb;
        }
        td {
            padding: 12px 15px;
            vertical-align: top;
        }
        td.url {
            max-width: 500px;
            word-break: break-all;
        }
        td.url a {
            color: #1e40af;
            text-decoration: none;
            font-weight: 500;
        }
        td.url a:hover {
            text-decoration: underline;
        }
        td.priority, td.changefreq {
            text-align: center;
        }
        .priority-high {
            color: #059669;
            font-weight: 600;
        }
        .priority-medium {
            color: #d97706;
            font-weight: 600;
        }
        .priority-low {
            color: #6b7280;
        }
        #footer {
            text-align: center;
            padding: 30px 20px;
            color: #6b7280;
            font-size: 13px;
        }
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .stat-card {
            background: #fff;
            padding: 20px;
            border-radius: 4px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            text-align: center;
        }
        .stat-card .number {
            font-size: 32px;
            font-weight: 700;
            color: #1e40af;
            margin-bottom: 5px;
        }
        .stat-card .label {
            font-size: 14px;
            color: #6b7280;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
    </style>
</head>
<body>
    <div id="header">
        <h1>🗺️ XML Sitemap</h1>
        <p>AutoZástava24 - Mapa stránek pro vyhledávače</p>
    </div>

    <div id="content">
        <div class="stats">
            <div class="stat-card">
                <div class="number"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></div>
                <div class="label">Celkem URL</div>
            </div>
            <div class="stat-card">
                <div class="number"><xsl:value-of select="count(sitemap:urlset/sitemap:url[sitemap:priority = '1.0'])"/></div>
                <div class="label">Vysoká priorita</div>
            </div>
            <div class="stat-card">
                <div class="number"><xsl:value-of select="count(sitemap:urlset/sitemap:url[sitemap:priority &gt; '0.7'])"/></div>
                <div class="label">Důležité stránky</div>
            </div>
        </div>

        <div class="info-box">
            <h2>ℹ️ Co je XML Sitemap?</h2>
            <p>Tato sitemap pomáhá vyhledávačům (Google, Bing, Seznam) lépe indexovat stránky našeho webu. Obsahuje seznam všech důležitých URL, jejich prioritu a frekvenci aktualizací.</p>
            <ul>
                <li><strong>URL:</strong> Adresa stránky</li>
                <li><strong>Poslední změna:</strong> Datum poslední aktualizace obsahu</li>
                <li><strong>Frekvence změn:</strong> Jak často se obsah mění</li>
                <li><strong>Priorita:</strong> Relativní důležitost stránky (0.0 - 1.0)</li>
            </ul>
        </div>

        <table>
            <thead>
                <tr>
                    <th style="width: 50%;">URL</th>
                    <th style="width: 15%;">Poslední změna</th>
                    <th style="width: 15%;">Frekvence</th>
                    <th style="width: 10%;">Priorita</th>
                </tr>
            </thead>
            <tbody>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                    <td class="url">
                        <a>
                            <xsl:attribute name="href">
                                <xsl:value-of select="sitemap:loc"/>
                            </xsl:attribute>
                            <xsl:value-of select="sitemap:loc"/>
                        </a>
                    </td>
                    <td>
                        <xsl:value-of select="sitemap:lastmod"/>
                    </td>
                    <td class="changefreq">
                        <xsl:value-of select="sitemap:changefreq"/>
                    </td>
                    <td class="priority">
                        <xsl:choose>
                            <xsl:when test="sitemap:priority &gt;= 0.8">
                                <span class="priority-high"><xsl:value-of select="sitemap:priority"/></span>
                            </xsl:when>
                            <xsl:when test="sitemap:priority &gt;= 0.5">
                                <span class="priority-medium"><xsl:value-of select="sitemap:priority"/></span>
                            </xsl:when>
                            <xsl:otherwise>
                                <span class="priority-low"><xsl:value-of select="sitemap:priority"/></span>
                            </xsl:otherwise>
                        </xsl:choose>
                    </td>
                </tr>
                </xsl:for-each>
            </tbody>
        </table>
    </div>

    <div id="footer">
        <p>© 2025 AutoZástava24 | Tato sitemap je určena pro vyhledávače</p>
        <p>Poslední aktualizace: <xsl:value-of select="sitemap:urlset/sitemap:url[1]/sitemap:lastmod"/></p>
    </div>
</body>
</html>
</xsl:template>
</xsl:stylesheet>
