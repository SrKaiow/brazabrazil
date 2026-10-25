/* ============================================================
   BRAZABRAZIL — ADMIN API (Cloudflare Worker + D1 database)
   Everything under /api/admin/* needs a valid login session.
   Database binding: DB (see wrangler.jsonc). Tables are created automatically.
   ============================================================ */

// Default login (change it inside the panel: Configurações → Trocar senha).
// Only a salted PBKDF2 hash of the password is stored here — never the password itself.
const DEFAULT_USER = "brazabrazil@2026";
const DEFAULT_SALT = "c1c91a5aa04fdfd1aee7937b36539a1b";
const DEFAULT_HASH = "f8565d2614bae90a4b5d96268423912f7fe0c90fb7b8858f733e048aa2be510c";
const SESSION_HOURS = 12;

const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS orders (id TEXT PRIMARY KEY, created INTEGER, status TEXT, fulfil TEXT, mode TEXT, name TEXT, phone TEXT,
     address TEXT, postcode TEXT, day TEXT, notes TEXT, items TEXT, subtotal REAL, fee REAL, total REAL, paid_at INTEGER, note TEXT)`,
  `CREATE INDEX IF NOT EXISTS orders_created ON orders(created)`,
  `CREATE TABLE IF NOT EXISTS overrides (id TEXT PRIMARY KEY, price REAL, promo REAL, available INTEGER, updated INTEGER)`,
  `CREATE TABLE IF NOT EXISTS ledger (id TEXT PRIMARY KEY, date TEXT, type TEXT, category TEXT, description TEXT, amount REAL, method TEXT, created INTEGER)`,
  `CREATE TABLE IF NOT EXISTS sessions (token TEXT PRIMARY KEY, created INTEGER, expires INTEGER, ip TEXT)`,
  `CREATE TABLE IF NOT EXISTS audit (id INTEGER PRIMARY KEY AUTOINCREMENT, at INTEGER, action TEXT, detail TEXT, ip TEXT)`,
  `CREATE TABLE IF NOT EXISTS settings (k TEXT PRIMARY KEY, v TEXT)`
];

let schemaReady = false;
export async function ensureSchema(env) {
  if (schemaReady || !env.DB) return !!env.DB;
  await env.DB.batch(SCHEMA.map(s => env.DB.prepare(s)));
  // later additions to the orders table (ignored when the column already exists)
  for (const sql of ["ALTER TABLE orders ADD COLUMN track TEXT", "ALTER TABLE orders ADD COLUMN history TEXT", "ALTER TABLE orders ADD COLUMN email TEXT"]) {
    try { await env.DB.prepare(sql).run(); } catch {}
  }
  try { await env.DB.prepare("CREATE UNIQUE INDEX IF NOT EXISTS orders_track ON orders(track)").run(); } catch {}
  schemaReady = true;
  return true;
}

/* ---------- helpers ---------- */
const enc = new TextEncoder();
const hex = buf => [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
const randHex = n => hex(crypto.getRandomValues(new Uint8Array(n)));
async function pbkdf2(pass, saltHex) {
  const key = await crypto.subtle.importKey("raw", enc.encode(pass), "PBKDF2", false, ["deriveBits"]);
  const salt = new Uint8Array(saltHex.match(/../g).map(h => parseInt(h, 16)));
  return hex(await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt, iterations: 100000 }, key, 256));
}
function safeEq(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
  let r = 0; for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}
const ipOf = req => req.headers.get("cf-connecting-ip") || "?";
const now = () => Date.now();
const num = (v, min = 0, max = 100000) => { const n = Number(v); return Number.isFinite(n) && n >= min && n <= max ? Math.round(n * 100) / 100 : null; };
const txt = (v, n = 200) => String(v ?? "").replace(/[\u0000-\u001f\u007f<>]/g, " ").replace(/\s+/g, " ").trim().slice(0, n);
function cookie(req, name) {
  const m = (req.headers.get("cookie") || "").match(new RegExp("(?:^|;\\s*)" + name + "=([a-f0-9]{64})"));
  return m ? m[1] : null;
}
async function audit(env, req, action, detail) {
  try { await env.DB.prepare("INSERT INTO audit (at, action, detail, ip) VALUES (?,?,?,?)").bind(now(), action, String(detail || "").slice(0, 300), ipOf(req)).run(); } catch {}
}

/* ---------- price overrides (shared with the public site) ---------- */
let ovCache = { at: 0, rows: null };
export async function getOverrides(env, fresh) {
  if (!env.DB) return {};
  if (!fresh && ovCache.rows && now() - ovCache.at < 20000) return ovCache.rows;
  await ensureSchema(env);
  const { results } = await env.DB.prepare("SELECT id, price, promo, available FROM overrides").all();
  const rows = {};
  for (const r of results || []) rows[r.id] = { price: r.price, promo: r.promo, available: r.available };
  ovCache = { at: now(), rows };
  return rows;
}

/* ---------- orders written by the public checkout ---------- */
export async function recordOrder(env, o) {
  if (!env.DB) return;
  try {
    await ensureSchema(env);
    await env.DB.prepare(`INSERT OR REPLACE INTO orders (id, created, status, fulfil, mode, name, phone, address, postcode, day, notes, items, subtotal, fee, total, track, history)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`)
      .bind(o.id, now(), o.status, "novo", o.mode, o.name, o.phone, o.address || "", o.postcode || "", o.day || "", o.notes || "",
        JSON.stringify(o.items), o.subtotal, o.fee, o.total, o.track || null, JSON.stringify([{ s: "novo", at: now() }])).run();
  } catch (e) { console.log("recordOrder", String(e && e.message || e)); }
}
export async function markPaid(env, id, email) {
  if (!env.DB) return;
  try { await ensureSchema(env); await env.DB.prepare("UPDATE orders SET status='paid', paid_at=COALESCE(paid_at, ?), email=COALESCE(?, email) WHERE id=? AND status IN ('pending','paid')").bind(now(), email || null, id).run(); } catch {}
}
export const newTrackToken = () => randHex(12);

/* ---------- public order tracking (/api/track?t=…) ---------- */
export async function trackOrder(env, t, sessionId, stripe) {
  if (!env.DB || !/^[a-f0-9]{24}$/.test(t || "")) return null;
  await ensureSchema(env);
  let o = await env.DB.prepare("SELECT * FROM orders WHERE track=?").bind(t).first();
  if (!o) return null;
  // back from Stripe: confirm the payment straight away
  if (o.status === "pending" && env.STRIPE_SECRET_KEY && (sessionId ? sessionId === o.id : true) && /^cs_/.test(o.id)) {
    try {
      const s = await stripe(env, "GET", "checkout/sessions/" + o.id);
      if (s.payment_status === "paid") { await markPaid(env, o.id, s.customer_details?.email); o = await env.DB.prepare("SELECT * FROM orders WHERE track=?").bind(t).first(); }
      else if (s.status === "expired") { await env.DB.prepare("UPDATE orders SET status='cancelled' WHERE id=?").bind(o.id).run(); o.status = "cancelled"; }
    } catch {}
  }
  let items = [], history = [];
  try { items = JSON.parse(o.items) || []; } catch {}
  try { history = JSON.parse(o.history || "[]") || []; } catch {}
  return {
    ref: o.id.slice(-8).toUpperCase(), created: o.created, paid_at: o.paid_at, status: o.status, fulfil: o.fulfil, history,
    mode: o.mode, day: o.day, postcode: o.postcode, name: String(o.name || "").split(" ")[0],
    items: items.map(i => ({ name: i.name, qty: i.qty, unit: i.unit, total: i.total })), subtotal: o.subtotal, fee: o.fee, total: o.total
  };
}

/* ---------- auth ---------- */
async function credentials(env) {
  const row = await env.DB.prepare("SELECT v FROM settings WHERE k='login'").first();
  if (row) { try { return JSON.parse(row.v); } catch {} }
  return { user: DEFAULT_USER, salt: DEFAULT_SALT, hash: DEFAULT_HASH, isDefault: true };
}
async function session(env, req) {
  const t = cookie(req, "bb_admin");
  if (!t) return null;
  const s = await env.DB.prepare("SELECT token, expires FROM sessions WHERE token=?").bind(t).first();
  if (!s || s.expires < now()) return null;
  return s;
}
const setCookie = (t, maxAge) => `bb_admin=${t}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAge}`;

async function login(req, env, json, body) {
  const ip = ipOf(req);
  const fails = await env.DB.prepare("SELECT COUNT(*) AS n FROM audit WHERE action='login_fail' AND ip=? AND at>?").bind(ip, now() - 15 * 60000).first();
  if ((fails?.n || 0) >= 6) return json({ error: "locked" }, 429, { "retry-after": "900" });
  const c = await credentials(env);
  const user = txt(body.user, 80), pass = String(body.pass || "").slice(0, 200);
  const ok = safeEq(user.toLowerCase(), c.user.toLowerCase()) && safeEq(await pbkdf2(pass, c.salt), c.hash);
  if (!ok) { await audit(env, req, "login_fail", user); return json({ error: "invalid" }, 401); }
  const token = randHex(32);
  await env.DB.batch([
    env.DB.prepare("DELETE FROM sessions WHERE expires<?").bind(now()),
    env.DB.prepare("INSERT INTO sessions (token, created, expires, ip) VALUES (?,?,?,?)").bind(token, now(), now() + SESSION_HOURS * 3600000, ip)
  ]);
  await audit(env, req, "login", user);
  return json({ ok: true, defaultPassword: !!c.isDefault }, 200, { "set-cookie": setCookie(token, SESSION_HOURS * 3600) });
}

/* ---------- Stripe sync ---------- */
async function syncStripe(env, stripe) {
  if (!env.STRIPE_SECRET_KEY) return { synced: 0, configured: false };
  const since = Math.floor((now() - 45 * 86400000) / 1000);
  const list = await stripe(env, "GET", `checkout/sessions?limit=100&created[gte]=${since}`);
  let n = 0;
  for (const s of list.data || []) {
    const status = s.payment_status === "paid" ? "paid" : s.status === "expired" ? "cancelled" : null;
    if (!status) continue;
    const r = await env.DB.prepare("UPDATE orders SET status=?, paid_at=CASE WHEN ?='paid' THEN COALESCE(paid_at, ?) ELSE paid_at END WHERE id=? AND status IN ('pending','paid','cancelled')")
      .bind(status, status, (s.created || 0) * 1000, s.id).run();
    n += r.meta?.changes || 0;
  }
  return { synced: n, configured: true };
}

/* ---------- router ---------- */
const STATUS = ["pending", "paid", "whatsapp", "cancelled", "refunded", "paid_shop"];
const FULFIL = ["novo", "aceito", "preparando", "pronto", "saiu", "atrasado", "entregue"];
const LEDGER_CATS = ["Vendas na loja", "Outras entradas", "Fornecedores", "Aluguel", "Salários", "Energia & água", "Embalagens", "Entregas", "Marketing", "Impostos & taxas", "Manutenção", "Outras saídas"];

export async function handleAdmin(req, env, url, { json, sameOrigin, catalogue, stripe, syncProducts }) {
  if (!env.DB) return json({ error: "db_missing" }, 503);
  await ensureSchema(env);
  const path = url.pathname.replace(/^\/api\/admin\/?/, "");
  const isPost = req.method === "POST";
  if (isPost && !sameOrigin(req)) return json({ error: "forbidden" }, 403);
  let body = {};
  if (isPost) {
    if (!(req.headers.get("content-type") || "").startsWith("application/json")) return json({ error: "bad_request" }, 415);
    const raw = await req.text();
    if (raw.length > 32768) return json({ error: "too_large" }, 413);
    try { body = JSON.parse(raw || "{}") || {}; } catch { return json({ error: "bad_request" }, 400); }
    if (typeof body !== "object" || Array.isArray(body)) return json({ error: "bad_request" }, 400);
  } else if (req.method !== "GET") return json({ error: "method_not_allowed" }, 405);

  if (path === "login" && isPost) return login(req, env, json, body);

  const s = await session(env, req);
  if (!s) return json({ error: "unauthorized" }, 401);

  if (path === "logout" && isPost) {
    await env.DB.prepare("DELETE FROM sessions WHERE token=?").bind(s.token).run();
    return json({ ok: true }, 200, { "set-cookie": setCookie("0".repeat(64), 0) });
  }
  if (path === "me") {
    const c = await credentials(env);
    return json({ user: c.user, defaultPassword: !!c.isDefault, stripe: !!env.STRIPE_SECRET_KEY, expires: s.expires });
  }
  if (path === "password" && isPost) {
    const c = await credentials(env);
    if (!safeEq(await pbkdf2(String(body.current || ""), c.salt), c.hash)) return json({ error: "wrong_password" }, 400);
    const np = String(body.next || "");
    if (np.length < 10 || np.length > 200) return json({ error: "weak_password" }, 400);
    const user = txt(body.user || c.user, 80) || c.user;
    const salt = randHex(16);
    await env.DB.batch([
      env.DB.prepare("INSERT OR REPLACE INTO settings (k, v) VALUES ('login', ?)").bind(JSON.stringify({ user, salt, hash: await pbkdf2(np, salt) })),
      env.DB.prepare("DELETE FROM sessions WHERE token<>?").bind(s.token)
    ]);
    await audit(env, req, "password_change", user);
    return json({ ok: true });
  }

  if (path === "catalog") {
    return json({ products: catalogue(), overrides: await getOverrides(env, true) });
  }
  if (path === "product" && isPost) {
    const ids = new Set(catalogue().map(p => p.id));
    const id = String(body.id || "");
    if (!ids.has(id)) return json({ error: "unknown_item" }, 400);
    if (body.reset === true) {
      await env.DB.prepare("DELETE FROM overrides WHERE id=?").bind(id).run();
    } else {
      const price = body.price === null || body.price === undefined || body.price === "" ? null : num(body.price, 0.01, 5000);
      const promo = body.promo === null || body.promo === undefined || body.promo === "" ? null : (Number(body.promo) === -1 ? -1 : num(body.promo, 0.01, 5000));
      const avail = body.available === null || body.available === undefined ? null : (body.available ? 1 : 0);
      if (body.price !== undefined && body.price !== null && body.price !== "" && price === null) return json({ error: "bad_price" }, 400);
      if (body.promo !== undefined && body.promo !== null && body.promo !== "" && promo === null) return json({ error: "bad_price" }, 400);
      await env.DB.prepare("INSERT OR REPLACE INTO overrides (id, price, promo, available, updated) VALUES (?,?,?,?,?)").bind(id, price, promo, avail, now()).run();
    }
    ovCache.at = 0;
    await audit(env, req, "product", `${id} ${JSON.stringify({ price: body.price, promo: body.promo, available: body.available, reset: body.reset })}`);
    return json({ ok: true, overrides: await getOverrides(env, true) });
  }

  if (path === "orders") {
    // confirm recent online payments automatically (no need to press "Sincronizar")
    if (env.STRIPE_SECRET_KEY) {
      const p = await env.DB.prepare("SELECT COUNT(*) AS n FROM orders WHERE status='pending' AND created>?").bind(now() - 2 * 86400000).first();
      if (p?.n) { try { await syncStripe(env, stripe); } catch {} }
    }
    const from = Number(url.searchParams.get("from")) || now() - 90 * 86400000;
    const to = Number(url.searchParams.get("to")) || now() + 86400000;
    const { results } = await env.DB.prepare("SELECT * FROM orders WHERE created BETWEEN ? AND ? ORDER BY created DESC LIMIT 2000").bind(from, to).all();
    return json({ orders: (results || []).map(o => ({ ...o, items: (() => { try { return JSON.parse(o.items); } catch { return []; } })() })) });
  }
  if (path === "order" && isPost) {
    const id = txt(body.id, 120);
    const sets = [], vals = [];
    if (body.fulfil !== undefined) { if (!FULFIL.includes(body.fulfil)) return json({ error: "bad_request" }, 400); sets.push("fulfil=?"); vals.push(body.fulfil); }
    if (body.status !== undefined) { if (!STATUS.includes(body.status)) return json({ error: "bad_request" }, 400); sets.push("status=?"); vals.push(body.status);
      if (body.status === "paid_shop") { sets.push("paid_at=COALESCE(paid_at, ?)"); vals.push(now()); } }
    if (body.note !== undefined) { sets.push("note=?"); vals.push(txt(body.note, 500)); }
    if (!sets.length) return json({ error: "bad_request" }, 400);
    // timeline shown to the customer on the tracking page
    const step = body.status === "cancelled" ? "cancelado" : body.status === "refunded" ? "reembolsado" : body.fulfil;
    if (step) {
      const cur = await env.DB.prepare("SELECT history FROM orders WHERE id=?").bind(id).first();
      let h = []; try { h = JSON.parse(cur?.history || "[]") || []; } catch {}
      if (!h.length || h[h.length - 1].s !== step) h.push({ s: step, at: now() });
      sets.push("history=?"); vals.push(JSON.stringify(h.slice(-30)));
    }
    const r = await env.DB.prepare(`UPDATE orders SET ${sets.join(", ")} WHERE id=?`).bind(...vals, id).run();
    await audit(env, req, "order", `${id} ${JSON.stringify(body)}`);
    return json({ ok: (r.meta?.changes || 0) > 0 });
  }
  if (path === "stripe-products" && isPost) {
    if (!env.STRIPE_SECRET_KEY) return json({ error: "not_configured" }, 503);
    const off = Math.max(0, Math.floor(Number(body.offset) || 0));
    try { return json(await syncProducts(off)); }
    catch (e) { return json({ error: "stripe_error", message: String(e && e.message || e).slice(0, 200) }, 502); }
  }
  if (path === "sync" && isPost) {
    try { return json(await syncStripe(env, stripe)); }
    catch (e) { console.log("sync", String(e && e.message || e)); return json({ error: "stripe_error" }, 502); }
  }

  if (path === "ledger") {
    const { results } = await env.DB.prepare("SELECT * FROM ledger ORDER BY date DESC, created DESC LIMIT 5000").all();
    return json({ entries: results || [], categories: LEDGER_CATS });
  }
  if (path === "ledger/add" && isPost) {
    const type = body.type === "in" ? "in" : body.type === "out" ? "out" : null;
    const amount = num(body.amount, 0.01, 1000000);
    const date = /^\d{4}-\d{2}-\d{2}$/.test(body.date || "") ? body.date : null;
    if (!type || amount === null || !date) return json({ error: "bad_request" }, 400);
    const id = randHex(8);
    await env.DB.prepare("INSERT INTO ledger (id, date, type, category, description, amount, method, created) VALUES (?,?,?,?,?,?,?,?)")
      .bind(id, date, type, LEDGER_CATS.includes(body.category) ? body.category : (type === "in" ? "Outras entradas" : "Outras saídas"),
        txt(body.description, 200), amount, txt(body.method, 30), now()).run();
    await audit(env, req, "ledger_add", `${type} ${amount} ${body.category || ""}`);
    return json({ ok: true, id });
  }
  if (path === "ledger/delete" && isPost) {
    await env.DB.prepare("DELETE FROM ledger WHERE id=?").bind(txt(body.id, 40)).run();
    await audit(env, req, "ledger_delete", body.id);
    return json({ ok: true });
  }

  if (path === "audit") {
    const { results } = await env.DB.prepare("SELECT at, action, detail, ip FROM audit ORDER BY id DESC LIMIT 200").all();
    return json({ entries: results || [] });
  }
  return json({ error: "not_found" }, 404);
}
