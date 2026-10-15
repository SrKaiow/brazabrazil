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

  root.BB = { normPostcode, isValidPostcode, quoteDelivery };
})(typeof window !== "undefined" ? window : globalThis);
