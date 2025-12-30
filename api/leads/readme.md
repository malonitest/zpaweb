This Azure Functions endpoint is deployed by Azure Static Web Apps.

- Route: `POST /api/leads`
- Purpose: secure proxy to the upstream leads API (keeps the Bearer token off the client).

Required app settings in Azure Static Web Apps:
- `LEADS_UPSTREAM_URL`
- `LEADS_UPSTREAM_BEARER_TOKEN`
