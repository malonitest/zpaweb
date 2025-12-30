# Custom GPT – Actions setup

1) V GPT Builderu otevři **Actions**.
2) Importuj OpenAPI schéma z [openapi-actions-leads.yaml](openapi-actions-leads.yaml).
3) Ověř, že je k dispozici operace `createLead` na `POST /api/leads`.
4) Autentizace: žádná (endpoint je public).

## Doporučené testy
- Pošli test request:
  - `name`: "Jan Novák"
  - `phone`: "+420 777 123 456"
  - `email`: "jan.novak@example.com"

## Poznámka k Azure SWA
V Azure Static Web Apps nastav app settings:
- `LEADS_UPSTREAM_URL`
- `LEADS_UPSTREAM_BEARER_TOKEN`
