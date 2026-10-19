/* ============================================================
   BRAZABRAZIL — PAYMENT SERVER (Cloudflare Worker)
   Serves the website and creates Stripe Checkout payments.
   Prices are always recalculated here from js/products.js and
   js/config.js — never trusted from the browser.

   Secret required (Cloudflare → brazabrazil → Settings → Variables and Secrets):
     STRIPE_SECRET_KEY   sk_live_... (or sk_test_... for testing)
   ============================================================ */
import "./shim.js";
import "../js/config.js";
import "../js/products.js";
import "../js/drinks.js";
import "../js/shared.js";

const S = globalThis.SITE;
const P = globalThis.PRODUCTS;
const BB = globalThis.BB;
const byId = Object.fromEntries(P.map(p => [p.id, p]));
const STRIPE_LOCALE = { en: "en-GB", "pt-BR": "pt-BR", "pt-PT": "pt", es: "es" };

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json", "cache-control": "no-store" } });

const clip = (v, n = 450) => String(v ?? "").slice(0, n);
const pence = n => Math.round(n * 100);

// Stripe API expects form encoding with bracket notation
function form(obj, prefix = "", out = new URLSearchParams()) {
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null) continue;
    const key = prefix ? `${prefix}[${k}]` : k;
    if (typeof v === "object") form(v, key, out);
    else out.append(key, String(v));
  }
  return out;
}

async function stripe(env, method, path, body) {
  const res = await fetch("https://api.stripe.com/v1/" + path, {
    method,
    headers: {
      authorization: "Bearer " + env.STRIPE_SECRET_KEY,
      "content-type": "application/x-www-form-urlencoded"
    },
    body: body ? form(body) : undefined
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error?.message || "Stripe error");
  return data;
}

async function createCheckout(request, env) {
  if (!env.STRIPE_SECRET_KEY) return json({ error: "not_configured" }, 503);

  let b;
  try { b = await request.json(); } catch { return json({ error: "bad_request" }, 400); }

  // ---- Rebuild the order from the catalogue ----
  const items = [];
  for (const [id, rawQty] of Object.entries(b.items || {})) {
    const p = byId[id];
    const qty = Number(rawQty);
    if (!p) return json({ error: "unknown_item", id }, 400);
    if (p.available === false) return json({ error: "out_of_stock", id }, 409);
    const step = p.unit === "kg" ? 0.5 : 1;
    if (!(qty > 0) || qty > 50 || Math.abs(qty / step - Math.round(qty / step)) > 1e-9)
      return json({ error: "bad_quantity", id }, 400);
    items.push({ p, qty });
  }
  if (!items.length) return json({ error: "empty" }, 400);
  if (!b.name || !b.phone) return json({ error: "missing_contact" }, 400);
  if (items.some(({ p }) => p.cat === "drinks") && b.adult !== true) return json({ error: "age_required" }, 400);

  const isDelivery = b.mode === "delivery";
  let quote = null;
  if (isDelivery) {
    if (!S.delivery?.enabled) return json({ error: "no_delivery" }, 400);
    if (!b.address) return json({ error: "missing_address" }, 400);
    quote = BB.quoteDelivery(b.postcode, S);
    if (quote.status === "invalid" || quote.status === "out") return json({ error: "postcode_" + quote.status }, 400);
  }

  const line_items = items.map(({ p, qty }) => {
    const label = p.unit === "kg" ? `${qty} kg` : `x${qty}`;
    return {
      quantity: 1,
      price_data: {
        currency: "gbp",
        unit_amount: pence(p.price * qty),
        product_data: { name: `${p.name} — ${label}`, description: p.sub?.en || undefined }
      }
    };
  });
  const subtotal = items.reduce((s, { p, qty }) => s + p.price * qty, 0);
  const freeOver = S.delivery?.freeOver;
  let fee = quote?.status === "ok" ? quote.fee : 0;
  if (isDelivery && freeOver && subtotal >= freeOver) fee = 0;
  if (isDelivery && fee > 0) {
    line_items.push({ quantity: 1, price_data: { currency: "gbp", unit_amount: pence(fee), product_data: { name: `Delivery — ${quote.postcode}` } } });
  }

  const summary = items.map(({ p, qty }) => `${p.name} ${p.unit === "kg" ? qty + "kg" : "x" + qty}`).join(", ");
  const origin = new URL(request.url).origin;
  const lang = STRIPE_LOCALE[b.lang] ? b.lang : "en";

  const session = await stripe(env, "POST", "checkout/sessions", {
    mode: "payment",
    locale: STRIPE_LOCALE[lang],
    line_items,
    success_url: `${origin}/?order=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/?order=cancelled`,
    phone_number_collection: { enabled: "false" },
    metadata: {
      order_type: isDelivery ? "delivery" : "collection",
      customer_name: clip(b.name, 100),
      customer_phone: clip(b.phone, 40),
      address: isDelivery ? clip(b.address) : "",
      postcode: isDelivery ? quote.postcode : "",
      delivery_fee: isDelivery ? (quote.status === "tbc" ? "TBC" : fee.toFixed(2)) : "",
      preferred_day: clip(b.day, 20),
      notes: clip(b.notes),
      age_18_confirmed: items.some(({ p }) => p.cat === "drinks") ? "yes" : "n/a",
      items: clip(summary)
    },
    payment_intent_data: {
      description: clip(`${isDelivery ? "DELIVERY" : "COLLECTION"} — ${b.name} — ${summary}`, 900)
    }
  });

  return json({ url: session.url });
}

async function checkSession(url, env) {
  const id = url.searchParams.get("id") || "";
  if (!env.STRIPE_SECRET_KEY || !/^cs_[A-Za-z0-9_]+$/.test(id)) return json({ paid: false }, 400);
  try {
    const s = await stripe(env, "GET", "checkout/sessions/" + id);
    return json({ paid: s.payment_status === "paid", ref: id.slice(-8).toUpperCase(), amount: (s.amount_total || 0) / 100 });
  } catch {
    return json({ paid: false }, 404);
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    try {
      if (url.pathname === "/api/checkout" && request.method === "POST") return await createCheckout(request, env);
      if (url.pathname === "/api/session" && request.method === "GET") return await checkSession(url, env);
      if (url.pathname.startsWith("/api/")) return json({ error: "not_found" }, 404);
    } catch (e) {
      return json({ error: "server_error", message: String(e.message || e) }, 500);
    }
    return env.ASSETS.fetch(request);
  }
};
