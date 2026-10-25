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
import "../js/beef.js";
import "../js/pork.js";
import "../js/frozen.js";
import "../js/deli.js";
import "../js/candy.js";
import "../js/home.js";
import "../js/chicken.js";
import "../js/kitchen.js";
import "../js/groceries.js";
import "../js/ready.js";
import "../js/promo.js";
import "../js/departments.js";
import "../js/drinks.js";
import "../js/softdrinks.js";
import "../js/shared.js";
import { handleAdmin, getOverrides, recordOrder, markPaid, newTrackToken, trackOrder } from "./admin.js";

const S = globalThis.SITE;
const P = globalThis.PRODUCTS;
const BB = globalThis.BB;
const byId = Object.fromEntries(P.map(p => [p.id, p]));
// catalogue for the admin panel: every sellable product with its catalogue prices
const groupLabel = p => ((globalThis.GROUPS || {})[p.cat] || []).find(g => g.id === p.group)?.label?.["pt-BR"] || "";
const CATALOGUE = P.filter(p => !p.isGroup).map(p => ({ id: p.id, name: p.name, cat: p.cat, group: groupLabel(p), unit: p.unit,
  price: p.was || p.price, promo: p.was ? p.price : null, available: p.available !== false, soon: !!p.soon, image: p.image || "" }));
// product as it is right now (catalogue + admin changes)
const live = (p, ov) => p ? BB.applyOverride({ ...p, base: undefined }, ov[p.id]) : null;
const STRIPE_LOCALE = { en: "en-GB", "pt-BR": "pt-BR", "pt-PT": "pt", es: "es" };

/* ---------- security ---------- */
const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob:",
  "frame-src https://maps.google.com https://www.google.com",
  "connect-src 'self'",
  "form-action 'self' https://checkout.stripe.com",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests"
].join("; ");
const SEC_HEADERS = {
  "content-security-policy": CSP,
  "strict-transport-security": "max-age=31536000; includeSubDomains",
  "x-content-type-options": "nosniff",
  "x-frame-options": "DENY",
  "referrer-policy": "strict-origin-when-cross-origin",
  "permissions-policy": "camera=(), microphone=(), geolocation=(), payment=(self), usb=()",
  "cross-origin-opener-policy": "same-origin"
};
function secure(res, extra) {
  const r = new Response(res.body, res);
  for (const [k, v] of Object.entries({ ...SEC_HEADERS, ...(extra || {}) })) r.headers.set(k, v);
  r.headers.delete("x-powered-by");
  return r;
}
const json = (data, status = 200, extra) =>
  secure(new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } }), extra);

// simple per-IP rate limit (per Worker instance) — stops scripted abuse of the API
const HITS = new Map();
function limited(request, key, max, windowMs) {
  const ip = request.headers.get("cf-connecting-ip") || "?";
  const k = key + ":" + ip, now = Date.now();
  const arr = (HITS.get(k) || []).filter(t => now - t < windowMs);
  arr.push(now); HITS.set(k, arr);
  if (HITS.size > 5000) HITS.clear();
  return arr.length > max;
}
// request must come from our own site (blocks other sites / tools posting on a customer's behalf)
function sameOrigin(request) {
  const host = new URL(request.url).host;
  const o = request.headers.get("origin");
  if (o) { try { return new URL(o).host === host; } catch { return false; } }
  const sfs = request.headers.get("sec-fetch-site");
  return sfs === "same-origin";
}

// strip control characters / markup and limit length of any customer text
const clip = (v, n = 450) => String(v ?? "").replace(/[\u0000-\u001f\u007f<>]/g, " ").replace(/\s+/g, " ").trim().slice(0, n);
const MAX_BODY = 16 * 1024;
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
      "content-type": "application/x-www-form-urlencoded",
      "stripe-version": "2025-09-30.clover"
    },
    body: body ? form(body) : undefined
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error?.message || "Stripe error");
  return data;
}

async function createCheckout(request, env) {
  if (!sameOrigin(request)) return json({ error: "forbidden" }, 403);
  if (limited(request, "co", 8, 60_000)) return json({ error: "too_many_requests" }, 429, { "retry-after": "60" });
  if (!(request.headers.get("content-type") || "").toLowerCase().startsWith("application/json")) return json({ error: "bad_request" }, 415);
  if (Number(request.headers.get("content-length") || 0) > MAX_BODY) return json({ error: "too_large" }, 413);

  let b;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY) return json({ error: "too_large" }, 413);
    b = JSON.parse(raw);
  } catch { return json({ error: "bad_request" }, 400); }
  if (!b || typeof b !== "object" || Array.isArray(b) || !b.items || typeof b.items !== "object" || Array.isArray(b.items))
    return json({ error: "bad_request" }, 400);
  if (Object.keys(b.items).length > 80) return json({ error: "too_many_items" }, 400);
  // any price, total or fee sent by the browser is ignored — everything below comes from the catalogue
  b.name = clip(b.name, 80); b.phone = clip(b.phone, 30); b.address = clip(b.address, 200);
  b.day = clip(b.day, 20); b.notes = clip(b.notes, 400); b.postcode = clip(b.postcode, 10);
  if (b.phone && !/^[+()\d\s-]{7,30}$/.test(b.phone)) return json({ error: "bad_phone" }, 400);

  // ---- Rebuild the order from the catalogue (+ admin price/stock changes) ----
  const ov = await getOverrides(env).catch(() => ({}));
  const items = [];
  for (const [id, rawQty] of Object.entries(b.items || {})) {
    const p = Object.prototype.hasOwnProperty.call(byId, id) ? live(byId[id], ov) : null;
    const qty = typeof rawQty === "number" ? rawQty : Number(rawQty);
    if (!p || p.isGroup) return json({ error: "unknown_item" }, 400);
    if (p.available === false || !(p.price > 0)) return json({ error: "out_of_stock", id: p.id }, 409);
    const step = BB.step(p);
    if (!(qty > 0) || qty > 50 || Math.abs(qty / step - Math.round(qty / step)) > 1e-9)
      return json({ error: "bad_quantity", id: p.id }, 400);
    items.push({ p, qty });
  }
  if (!items.length) return json({ error: "empty" }, 400);
  if (!b.name || !b.phone) return json({ error: "missing_contact" }, 400);
  if (items.some(({ p }) => (p.tags || []).includes("adult")) && b.adult !== true) return json({ error: "age_required" }, 400);

  if (b.mode !== "delivery" && b.mode !== "collect") return json({ error: "bad_request" }, 400);
  const isDelivery = b.mode === "delivery";
  let quote = null;
  if (isDelivery) {
    if (!S.delivery?.enabled) return json({ error: "no_delivery" }, 400);
    if (!b.address) return json({ error: "missing_address" }, 400);
    quote = BB.quoteDelivery(b.postcode, S);
    if (quote.status === "invalid" || quote.status === "out") return json({ error: "postcode_" + quote.status }, 400);
  }

  const line_items = items.map(({ p, qty }) => {
    const label = (p.unit === "kg" ? `${qty} kg` : `x${qty}`) + (p.multi && qty >= p.multi.n ? ` (${p.multi.n} for £${p.multi.price.toFixed(2)})` : "");
    return {
      quantity: 1,
      price_data: {
        currency: "gbp",
        unit_amount: pence(BB.lineTotal(p, qty)),
        product_data: { name: `${p.name} — ${label}`, description: p.sub?.en || undefined }
      }
    };
  });
  const subtotal = items.reduce((s, { p, qty }) => s + BB.lineTotal(p, qty), 0);
  const freeOver = S.delivery?.freeOver;
  let fee = quote?.status === "ok" ? quote.fee : 0;
  if (isDelivery && freeOver && subtotal >= freeOver) fee = 0;
  if (isDelivery && fee > 0) {
    line_items.push({ quantity: 1, price_data: { currency: "gbp", unit_amount: pence(fee), product_data: { name: `Delivery — ${quote.postcode}` } } });
  }

  const summary = items.map(({ p, qty }) => `${p.name} ${p.unit === "kg" ? qty + "kg" : "x" + qty}`).join(", ");
  const origin = new URL(request.url).origin;
  const lang = STRIPE_LOCALE[b.lang] ? b.lang : "en";

  const orderRow = { mode: isDelivery ? "delivery" : "collect", name: b.name, phone: b.phone, address: isDelivery ? b.address : "",
    postcode: isDelivery ? quote.postcode : "", day: b.day, notes: b.notes, subtotal: Math.round(subtotal * 100) / 100, fee,
    total: Math.round((subtotal + fee) * 100) / 100,
    items: items.map(({ p, qty }) => ({ id: p.id, name: p.name, cat: p.cat, unit: p.unit, qty, price: p.price, total: BB.lineTotal(p, qty) })) };
  const track = newTrackToken();
  const trackUrl = `${new URL(request.url).origin}/pedido/?t=${track}`;
  if (!env.STRIPE_SECRET_KEY) {
    // payment comes first: without Stripe no order is placed
    return json({ error: "not_configured" }, 503);
  }
  const session = await stripe(env, "POST", "checkout/sessions", {
    mode: "payment",
    locale: "en-GB",
    line_items,
    adaptive_pricing: { enabled: "false" }, // always charge in GBP
    // after paying, the customer lands on their own order-tracking page
    success_url: env.DB ? `${trackUrl}&s={CHECKOUT_SESSION_ID}` : `${origin}/?order=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/?order=cancelled`,
    phone_number_collection: { enabled: "false" },
    branding_settings: {
      display_name: "BrazaBrazil",
      ...(origin.startsWith("https://") ? { logo: { type: "url", url: `${origin}/assets/logo.png` }, icon: { type: "url", url: `${origin}/assets/stripe-icon.png` } } : {}),
      background_color: "#ffffff", button_color: "#14204a", border_style: "rounded", font_family: "inter"
    },
    custom_text: {
      submit: { message: isDelivery
        ? "Your order is cut and packed fresh by our butchers in Epsom, then delivered to your door. You will get a link to follow it live."
        : "Your order is cut and packed fresh by our butchers in Epsom and kept ready for collection at 31 South Street. You will get a link to follow it live." },
      after_submit: { message: "Payments are processed securely by Stripe. BrazaBrazil never sees or stores your card details." }
    },
    metadata: {
      order_type: isDelivery ? "delivery" : "collection",
      customer_name: clip(b.name, 100),
      customer_phone: clip(b.phone, 40),
      address: isDelivery ? clip(b.address) : "",
      postcode: isDelivery ? quote.postcode : "",
      delivery_fee: isDelivery ? (quote.status === "tbc" ? "TBC" : fee.toFixed(2)) : "",
      preferred_day: clip(b.day, 20),
      notes: clip(b.notes),
      age_18_confirmed: items.some(({ p }) => (p.tags || []).includes("adult")) ? "yes" : "n/a",
      items: clip(summary),
      track
    },
    payment_intent_data: {
      description: clip(`${isDelivery ? "DELIVERY" : "COLLECTION"} — ${b.name} — ${summary}`, 900)
    }
  });

  await recordOrder(env, { ...orderRow, id: session.id, status: "pending", track });
  return json({ url: session.url });
}

async function checkSession(request, url, env) {
  const id = url.searchParams.get("id") || "";
  if (limited(request, "se", 20, 60_000)) return json({ paid: false }, 429, { "retry-after": "60" });
  if (!env.STRIPE_SECRET_KEY || !/^cs_(test|live)_[A-Za-z0-9]{10,200}$/.test(id)) return json({ paid: false }, 400);
  try {
    const s = await stripe(env, "GET", "checkout/sessions/" + id);
    if (s.payment_status === "paid") await markPaid(env, id, s.customer_details?.email);
    return json({ paid: s.payment_status === "paid", ref: id.slice(-8).toUpperCase(), amount: (s.amount_total || 0) / 100 });
  } catch {
    return json({ paid: false }, 404);
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api/")) {
      try {
        if (url.pathname === "/api/checkout") {
          if (request.method !== "POST") return json({ error: "method_not_allowed" }, 405, { allow: "POST" });
          return await createCheckout(request, env);
        }
        if (url.pathname === "/api/session") {
          if (request.method !== "GET") return json({ error: "method_not_allowed" }, 405, { allow: "GET" });
          return await checkSession(request, url, env);
        }
        if (url.pathname === "/api/track") {
          if (request.method !== "GET") return json({ error: "method_not_allowed" }, 405, { allow: "GET" });
          if (limited(request, "tr", 60, 60_000)) return json({ error: "too_many_requests" }, 429, { "retry-after": "60" });
          const o = await trackOrder(env, url.searchParams.get("t"), url.searchParams.get("s"), stripe);
          return o ? json({ order: o }) : json({ error: "not_found" }, 404);
        }
        if (url.pathname === "/api/overrides") {
          if (request.method !== "GET") return json({ error: "method_not_allowed" }, 405, { allow: "GET" });
          return json({ overrides: await getOverrides(env).catch(() => ({})) }, 200, { "cache-control": "public, max-age=20" });
        }
        if (url.pathname === "/api/admin" || url.pathname.startsWith("/api/admin/")) {
          if (limited(request, "adm", 240, 60_000)) return json({ error: "too_many_requests" }, 429, { "retry-after": "60" });
          return await handleAdmin(request, env, url, { json, sameOrigin, catalogue: () => CATALOGUE, stripe });
        }
        return json({ error: "not_found" }, 404);
      } catch (e) {
        console.log("api error", String(e && e.message || e));   // details stay in Cloudflare logs, never sent to the browser
        return json({ error: "server_error" }, 500);
      }
    }
    // the website itself: only read requests
    if (request.method !== "GET" && request.method !== "HEAD") return secure(new Response("Method not allowed", { status: 405, headers: { allow: "GET, HEAD" } }));
    if (/(^|\/)\.|\.(md|jsonc|map|py|sh|env|bak)$/i.test(url.pathname)) return secure(new Response("Not found", { status: 404 }));
    const res = await env.ASSETS.fetch(request);
    const extra = {};
    if (/\.(webp|png|jpe?g|svg|woff2?)$/i.test(url.pathname)) extra["cache-control"] = "public, max-age=86400";
    else if (/\.(js|css)$/i.test(url.pathname)) extra["cache-control"] = "no-cache";
    return secure(res, res.status === 200 ? extra : {});
  }
};
