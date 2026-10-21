/* ============================================================
   BRAZABRAZIL — DEPARTMENTS (how the shop is split into tabs)
   Loaded last. Moves product groups into clearer departments so
   customers find things fast. Products keep their ids and prices.
   ============================================================ */
(function () {
  const L = (en, pt, es, ptPT) => ({ en, "pt-BR": pt, "pt-PT": ptPT || pt, es });
  // [from department, group ids, to department, (optional) new group labels]
  const MOVES = [
    ["groceries", ["laticinios"], "dairy"],
    ["deli", ["frios"], "dairy"],
    ["frozen", ["fish"], "fish"],
    ["frozen", ["poultry"], "chicken"],
    ["groceries", ["molhos"], "sauces"],
    ["groceries", ["matinais", "cafe", "biscoitos"], "breakfast"],
    ["candy", ["snacks"], "snacks"],
    ["drinks", ["wine", "beer", "cachaca", "spirits"], "alcohol"]
  ];
  const G = window.GROUPS;
  for (const [from, ids, to] of MOVES) {
    const take = (G[from] || []).filter(g => ids.includes(g.id));
    G[from] = (G[from] || []).filter(g => !ids.includes(g.id));
    G[to] = (G[to] || []).concat(take);
    window.PRODUCTS.forEach(p => { if (p.cat === from && ids.includes(p.group)) p.cat = to; });
  }
  // nicer sub-filter names where a department now has a single theme
  const rename = (cat, id, label) => { const g = (G[cat] || []).find(x => x.id === id); if (g) g.label = label; };
  rename("chicken", "poultry", L("Whole chicken", "Frango inteiro", "Pollo entero"));
  rename("breakfast", "matinais", L("Breakfast & jams", "Café da manhã & geleias", "Desayuno y mermeladas", "Pequeno-almoço & doces de fruta"));
  rename("snacks", "snacks", L("Crisps & snacks", "Salgadinhos & petiscos", "Aperitivos", "Aperitivos & batatas"));
  rename("dairy", "frios", L("Mortadella", "Mortadelas", "Mortadelas"));

  window.CATEGORIES = ["all", "promo", "beef", "pork", "chicken", "ready", "deli", "dairy", "fish", "frozen", "estufa",
    "groceries", "sauces", "breakfast", "candy", "snacks", "drinks", "alcohol", "kitchen", "home"]
    .filter(c => c === "all" || c === "promo" || window.PRODUCTS.some(p => p.cat === c));
})();
