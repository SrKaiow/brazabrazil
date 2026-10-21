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
    ["candy", ["snacks"], "snacks"]
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

/* Mercearia: the Brazilian basics (rice, beans, farofa) open the department */
(function () {
  const L = (en, pt, es) => ({ en, "pt-BR": pt, "pt-PT": pt, es });
  const BASICS = ["arroz", "feijao", "farofa", "farinha-mandioca", "feijao-compal"];
  const gs = window.GROUPS.groceries || [];
  window.GROUPS.groceries = [{ id: "basicos", label: L("Rice, beans & farofa", "Arroz, feijão & farofa", "Arroz, frijoles y farofa") }]
    .concat(gs.map(g => g.id === "graos" ? { id: "graos", label: L("Flours, cornmeal & grains", "Farinhas, fubá & grãos", "Harinas y granos") } : g));
  const order = window.GROUPS.groceries.map(g => g.id);
  window.PRODUCTS.forEach(p => {
    const root = p.parent || p.id;
    if (p.cat === "groceries" && BASICS.includes(root)) { p.group = "basicos"; if (!p.parent) p.tags = [...new Set([...(p.tags || []), "best"])]; }
  });
  // keep each department sorted by sub-group, then cheapest first
  const gro = window.PRODUCTS.filter(p => p.cat === "groceries"), rest = window.PRODUCTS.filter(p => p.cat !== "groceries");
  const rank = p => p.group === "basicos" ? BASICS.indexOf(p.parent || p.id) : 0;
  gro.sort((a, b) => order.indexOf(a.group) - order.indexOf(b.group) || rank(a) - rank(b) || a.price - b.price || a.name.localeCompare(b.name));
  window.PRODUCTS.length = 0; window.PRODUCTS.push(...rest, ...gro);
})();
