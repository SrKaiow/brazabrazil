/* ============================================================
   BRAZABRAZIL — SHARED LOGIC (used by the website AND the payment server)
   No need to edit. Delivery fees are set in js/config.js → deliveryZones.
   ============================================================ */
(function (root) {
  const UK_POSTCODE = /^[A-Z]{1,2}[0-9][A-Z0-9]?\s?[0-9][A-Z]{2}$/;

  function normPostcode(pc) {
    const s = String(pc || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
    return s.length > 3 ? s.slice(0, -3) + " " + s.slice(-3) : s;
  }
  function isValidPostcode(pc) { return UK_POSTCODE.test(normPostcode(pc)); }
  function outward(pc) { return normPostcode(pc).split(" ")[0]; }

  /* Returns { status: "ok" | "tbc" | "out" | "invalid", fee, postcode } */
  function quoteDelivery(pc, site) {
    const postcode = normPostcode(pc);
    if (!isValidPostcode(postcode)) return { status: "invalid", fee: null, postcode };
    const out = outward(postcode);
    for (const zone of (site.deliveryZones || [])) {
      if (zone.prefixes.some(p => out === p.toUpperCase())) {
        return typeof zone.fee === "number"
          ? { status: "ok", fee: zone.fee, postcode }
          : { status: "tbc", fee: null, postcode };
      }
    }
    return { status: "out", fee: null, postcode };
  }

  // quantity step: whole kilos or whole units
  const step = p => p.step || 1;
  // line total with multi-buy offers, e.g. multi: { n: 2, price: 5 } = "2 for £5"
  const lineTotal = (p, q) => {
    const m = p.multi;
    const t = m ? Math.floor(q / m.n) * m.price + (q % m.n) * p.price : p.price * q;
    return Math.round(t * 100) / 100;
  };
  // admin panel price changes: ov = { price, promo, available } (null = keep catalogue value; promo -1 = no promo)
  function applyOverride(p, ov) {
    if (!p.base) p.base = { price: p.price, was: p.was, available: p.available, promo: p.promo, soon: p.soon };
    const normal = p.base.was || p.base.price;
    const catPromo = p.base.was ? p.base.price : null;
    const o = ov || {};
    const n = typeof o.price === "number" ? o.price : normal;
    const pr = typeof o.promo === "number" ? (o.promo > 0 ? o.promo : null) : catPromo;
    if (pr && pr < n) { p.price = pr; p.was = n; p.promo = true; } else { p.price = n; delete p.was; p.promo = !!p.base.promo && !p.base.was; }
    const priced = typeof o.price === "number" && o.price > 0;
    p.soon = !!p.base.soon && !priced;                       // an "em breve" item goes on sale once the panel gives it a price
    p.available = typeof o.available === "number" ? !!o.available : (p.base.soon && priced ? true : p.base.available);
    if (p.available === undefined) p.available = true;
    return p;
  }
  root.BB = { normPostcode, isValidPostcode, quoteDelivery, step, lineTotal, applyOverride };
})(typeof window !== "undefined" ? window : globalThis);
