/* ============================================================
   BRAZABRAZIL — SPECIAL OFFERS (from the shop till)
   PROMO: id → offer price. The normal price is kept as "was" and shown crossed out.
   To end an offer just delete its line. NEW_PROMO: products that only exist as offers.
   ============================================================ */
(function () {
  const PROMO = {
    // empty: no special offers right now (offers are set in the admin panel)
  };
  const L = (en, pt, es) => ({ en, pt, es });
  const N = (id, name, cat, group, unit, price, sub, desc, img) => window.PRODUCTS.push({ id, name, cat, group, unit, price, tags: [],
    image: "assets/products/" + (img || cat + "/" + id) + ".webp", available: true, sub, desc });
  N("miolo-paleta", "Miolo da Paleta Australiano", "beef", "slow", "kg", 12.99, L("Australian chuck tender · per kg", "Miolo da paleta · por kg", "Centro de paleta · por kg"), L("Tender cut for roasts and stews.", "Corte macio para assados e ensopados.", "Corte tierno para asados."));
  N("bisteca-bovina", "Bisteca Bovina", "beef", "steak", "kg", 13.99, L("Beef T-bone style steak · per kg", "Bisteca de boi · por kg", "Chuleta de ternera · por kg"), L("Great on the grill or the frying pan.", "Ótima na brasa ou na frigideira.", "Ideal a la parrilla."));
  window.PRODUCTS[window.PRODUCTS.length - 1].step = 1;
  N("costela-prime", "Costela Bovina Prime", "beef", "bbq", "kg", 8.99, L("Prime beef ribs · per kg", "Costela bovina prime · por kg", "Costilla prime · por kg"), L("Slow-cook on the grill for hours.", "Na brasa, devagar, por horas.", "A la brasa lentamente."));
  N("sobrecoxa", "Sobrecoxa de Frango", "chicken", "cortes", "kg", 4.50, L("Chicken thighs · per kg", "Sobrecoxa · por kg", "Contramuslo de pollo · por kg"), L("Juicy and cheap — perfect for the churrasco.", "Suculenta — perfeita para o churrasco.", "Jugosa y económica."));
  N("tilapia-kg", "Tilápia Congelada · por kg", "frozen", "fish", "kg", 7.50, L("Frozen tilapia · per kg", "Tilápia congelada · por kg", "Tilapia congelada · por kg"), L("Mild white fish — fry, grill or bake.", "Peixe branco suave — frito, grelhado ou assado.", "Pescado blanco suave."), "frozen/tilapia");
  N("wafer-baunilha", "Wafer Baunilha", "groceries", "biscoitos", "each", 1.50, L("Vanilla wafer", "Wafer de baunilha", "Barquillo de vainilla"), L("Crispy vanilla wafers.", "Wafer crocante de baunilha.", "Barquillos crujientes."));
  N("polvilho-cebola", "Biscoito de Polvilho Cebola e Salsa", "groceries", "biscoitos", "each", 1.50, L("Onion & parsley tapioca crisps", "Biscoito de polvilho cebola e salsa", "Rosquillas de almidón cebolla y perejil"), L("Light and crunchy.", "Leve e crocante.", "Ligeras y crujientes."));

  const byId = Object.fromEntries(window.PRODUCTS.map(p => [p.id, p]));
  for (const [id, price] of Object.entries(PROMO)) {
    const p = byId[id]; if (!p) continue;
    p.was = p.price; p.price = price; p.promo = true;
    if (p.parent && byId[p.parent]) byId[p.parent].promo = true;
  }
  window.PRODUCTS.forEach(g => { if (g.isGroup) { const ps = g.variants.map(v => byId[v] && byId[v].price).filter(x => x > 0); if (ps.length) g.price = Math.min(...ps); } });
  if (!window.CATEGORIES.includes("promo")) window.CATEGORIES.push("promo");
  const ORDER = ["all", "promo", "beef", "pork", "chicken", "ready", "deli", "frozen", "estufa", "groceries", "candy", "drinks", "kitchen", "home"];
  window.CATEGORIES.sort((a, b) => (ORDER.indexOf(a) + 99) % 99 - (ORDER.indexOf(b) + 99) % 99);
})();
