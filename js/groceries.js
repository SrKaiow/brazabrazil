/* ============================================================
   BRAZABRAZIL — GROCERIES (real shop prices)
   ============================================================ */
window.GROUPS = window.GROUPS || {};
window.GROUPS.groceries = [
  { id: "geral", label: { en: "Pantry", "pt-BR": "Mercearia", "pt-PT": "Mercearia", es: "Despensa" } }
];
(function () {
  const I = f => "assets/products/groceries/" + f + ".webp";
  const out = [
    { id: "leite-aveia", name: "Leite de Aveia Alpro · 1 L", cat: "groceries", group: "geral", unit: "each", price: 7.10, tags: ["vegan"],
      image: I("leite-aveia"), available: true,
      sub: { en: "Oat drink · with calcium and vitamins", pt: "Bebida de aveia · com cálcio e vitaminas", es: "Bebida de avena · con calcio y vitaminas" },
      desc: { en: "Smooth and creamy oat drink, 100% plant-based.", pt: "Bebida de aveia suave e cremosa, 100% vegetal.", es: "Bebida de avena suave y cremosa, 100% vegetal." } }
  ];
  out.sort((a, b) => a.price - b.price);
  window.PRODUCTS.push(...out);
  if (!window.CATEGORIES.includes("groceries")) window.CATEGORIES.push("groceries");
  const ORDER = ["all", "beef", "pork", "chicken", "deli", "frozen", "groceries", "candy", "drinks", "kitchen", "home"];
  window.CATEGORIES.sort((a, b) => (ORDER.indexOf(a) + 99) % 99 - (ORDER.indexOf(b) + 99) % 99);
})();
