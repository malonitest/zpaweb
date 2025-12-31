/*
 * POST /api/leads
 *
 * Secure proxy to the upstream leads API.
 *
 * Required env vars:
 * - LEADS_UPSTREAM_URL (e.g. https://api.zpetnypronajemaut.cz/v1/leads)
 * - LEADS_UPSTREAM_BEARER_TOKEN
 */

function json(res, status, body, extraHeaders = {}) {
  res.status = status;
  res.headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    ...extraHeaders
  };
  res.body = JSON.stringify(body);
  return res;
}

function safeTrim(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function isValidEmail(email) {
  // Simple sanity check (not RFC exhaustive).
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

module.exports = async function (context, req) {
  // Basic CORS so the endpoint can be used from browser + tools.
  // (Custom GPT Actions are server-side, but this keeps it flexible.)
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  if (req.method === 'OPTIONS') {
    context.res = {
      status: 204,
      headers: {
        ...corsHeaders,
        'Cache-Control': 'no-store'
      }
    };
    return;
  }

  const upstreamUrl = process.env.LEADS_UPSTREAM_URL;
  const upstreamTokenRaw = process.env.LEADS_UPSTREAM_BEARER_TOKEN;

  if (!upstreamUrl || !upstreamTokenRaw) {
    context.res = json({}, 500, {
      error: {
        message: 'Server configuration missing. Set LEADS_UPSTREAM_URL and LEADS_UPSTREAM_BEARER_TOKEN.'
      }
    }, corsHeaders);
    return;
  }

  const upstreamToken = String(upstreamTokenRaw).trim();
  const authorizationHeader = upstreamToken.toLowerCase().startsWith('bearer ') ? upstreamToken : `Bearer ${upstreamToken}`;

  const body = req.body || {};

  // Minimal required fields (as confirmed): name, phone, email
  const name = safeTrim(body.name);
  const phone = safeTrim(body.phone);
  const email = safeTrim(body.email).toLowerCase();

  const missing = [];
  if (!name) missing.push('name');
  if (!phone) missing.push('phone');
  if (!email) missing.push('email');

  if (missing.length) {
    context.res = json({}, 400, {
      error: {
        message: 'Missing required fields',
        missing
      }
    }, corsHeaders);
    return;
  }

  if (!isValidEmail(email)) {
    context.res = json({}, 400, {
      error: {
        message: 'Invalid email'
      }
    }, corsHeaders);
    return;
  }

  // Forward a clean payload to upstream.
  // We accept optional fields if provided by the web form or future assistants.
  const payload = {
    name,
    email,
    phone
  };

  const model = safeTrim(body.model);
  if (model) payload.model = model;

  const referrer = safeTrim(body.referrer);
  if (referrer) payload.referrer = referrer;

  const notes = safeTrim(body.notes);
  if (notes) payload.notes = notes;

  const carRegistrationYear = Number.isFinite(body.carRegistrationYear)
    ? body.carRegistrationYear
    : parseInt(body.carRegistrationYear, 10);
  if (Number.isFinite(carRegistrationYear)) payload.carRegistrationYear = carRegistrationYear;

  const carMileage = Number.isFinite(body.carMileage) ? body.carMileage : parseInt(body.carMileage, 10);
  if (Number.isFinite(carMileage)) payload.carMileage = carMileage;

  const requestedAmount = Number.isFinite(body.requestedAmount)
    ? body.requestedAmount
    : parseInt(body.requestedAmount, 10);
  if (Number.isFinite(requestedAmount)) payload.requestedAmount = requestedAmount;

  try {
    const upstreamResponse = await fetch(upstreamUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authorizationHeader
      },
      body: JSON.stringify(payload)
    });

    const contentType = upstreamResponse.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');
    const responseBody = isJson ? await upstreamResponse.json() : await upstreamResponse.text();

    if (!upstreamResponse.ok) {
      // Pass through upstream errors (without adding any extra sensitive context).
      context.res = {
        status: upstreamResponse.status,
        headers: {
          ...corsHeaders,
          'Cache-Control': 'no-store',
          'Content-Type': isJson ? 'application/json; charset=utf-8' : 'text/plain; charset=utf-8'
        },
        body: isJson ? JSON.stringify(responseBody) : String(responseBody)
      };
      return;
    }

    context.res = {
      status: upstreamResponse.status,
      headers: {
        ...corsHeaders,
        'Cache-Control': 'no-store',
        'Content-Type': isJson ? 'application/json; charset=utf-8' : 'text/plain; charset=utf-8'
      },
      body: isJson ? JSON.stringify(responseBody) : String(responseBody)
    };
  } catch (err) {
    context.log('Upstream leads request failed');
    context.res = json({}, 502, {
      error: {
        message: 'Upstream service unavailable'
      }
    }, corsHeaders);
  }
};
