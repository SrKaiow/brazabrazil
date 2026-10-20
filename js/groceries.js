/* ============================================================
   BRAZABRAZIL — GROCERIES (real shop prices)
   ============================================================ */
window.GROUPS = window.GROUPS || {};
window.GROUPS.groceries = [
  { id: "laticinios", label: { en: "Cheese, milk & butter", "pt-BR": "Queijos, leite & manteiga", "pt-PT": "Queijos, leite & manteiga", es: "Quesos, leche y mantequilla" } },
  { id: "geral", label: { en: "Pantry", "pt-BR": "Mercearia", "pt-PT": "Mercearia", es: "Despensa" } }
];
(function () {
  const I = f => "assets/products/groceries/" + f + ".webp";
  const out = [
    { id: "leite-aveia", name: "Leite de Aveia Alpro · 1 L", cat: "groceries", group: "laticinios", unit: "each", price: 7.10, tags: ["vegan"],
      image: I("leite-aveia"), available: true,
      sub: { en: "Oat drink · with calcium and vitamins", pt: "Bebida de aveia · com cálcio e vitaminas", es: "Bebida de avena · con calcio y vitaminas" },
      desc: { en: "Smooth and creamy oat drink, 100% plant-based.", pt: "Bebida de aveia suave e cremosa, 100% vegetal.", es: "Bebida de avena suave y cremosa, 100% vegetal." } }
  ];
  const G = (id, name, group, sub, desc, variants, extra) => {
    const ids = [], first = variants[0][3];
    variants.forEach(([vid, label, price, image, unit]) => {
      ids.push(vid);
      out.push({ id: vid, name: name + " · " + label, optionLabel: label, parent: id, hidden: true, cat: "groceries", group,
                 unit: unit || "each", price, tags: (extra && extra.tags) || [], image: I(image), available: true, sub, desc });
    });
    out.push(Object.assign({ id, name, cat: "groceries", group, unit: "each", price: Math.min(...variants.map(v => v[2])), isGroup: true, variants: ids, tags: [],
                 image: I(first), available: true, sub, desc }, extra || {}));
  };
  const S = (id, name, group, price, image, sub, desc, extra) =>
    out.push(Object.assign({ id, name, cat: "groceries", group, unit: "each", price, tags: [], image: I(image), available: true, sub, desc }, extra || {}));
  G("queijo-minas", "Queijo Minas", "laticinios",
    { en: "Brazilian Minas cheese", pt: "Queijo minas", es: "Queso Minas brasileño" },
    { en: "The classic cheese from Minas Gerais — fresh and mild (frescal) or firmer and matured (padrão).", pt: "O clássico queijo mineiro — frescal, suave e macio, ou padrão, mais firme e curado.", es: "El clásico queso de Minas Gerais — fresco o curado." },
    [["minas-frescal", "Frescal", 9.50, "minas-frescal"], ["minas-padrao", "Padrão Muai", 9.50, "minas-padrao"]]);
  S("queijo-coalho", "Queijo Coalho · por kg", "laticinios", 22.00, "queijo-coalho",
    { en: "Brazilian grilling cheese · sold by weight", pt: "Queijo coalho para churrasco · a peso", es: "Queso para asar · al peso" },
    { en: "Squeaky grilling cheese that browns without melting — a churrasco must, great with honey or oregano.", pt: "O queijo que doura na brasa sem derreter — indispensável no churrasco, com mel ou orégano.", es: "Queso que se dora a la brasa sin derretirse." }, { unit: "kg", tags: ["best"] });
  G("queijo-fresco", "Queijo Fresco", "laticinios",
    { en: "Portuguese fresh cheese", pt: "Queijo fresco português", es: "Queso fresco portugués" },
    { en: "Soft, mild fresh cheese — lovely with bread, honey or a little salt and pepper.", pt: "Queijo fresco suave e macio — com pão, mel ou um pouco de sal e pimenta.", es: "Queso fresco suave — con pan, miel o sal y pimienta." },
    [["fresco-paiva", "Paiva meio-gordo", 3.99, "fresco-paiva"], ["fresco-matinal", "Matinal · 3 × 72 g", 5.99, "fresco-matinal"]], { tags: ["portuguese"] });
  S("leite-mimosa", "Leite Mimosa Meio-Gordo · 1 L", "laticinios", 2.99, "leite-mimosa",
    { en: "Portuguese semi-skimmed milk · UHT", pt: "Leite semidesnatado · UHT", "pt-PT": "Leite meio-gordo · UHT", es: "Leche semidesnatada portuguesa" },
    { en: "Portugal’s favourite milk, long-life.", pt: "O leite preferido de Portugal, longa vida.", es: "La leche favorita de Portugal." }, { tags: ["portuguese"] });
  G("manteiga", "Manteiga · 250 g", "laticinios",
    { en: "Portuguese butter", pt: "Manteiga portuguesa", es: "Mantequilla portuguesa" },
    { en: "Creamy Portuguese butter for bread, pão na chapa and cooking.", pt: "Manteiga portuguesa cremosa para o pão, pão na chapa e cozinhar.", es: "Mantequilla portuguesa cremosa." },
    [["manteiga-mimosa", "Mimosa tradicional com sal", 4.20, "manteiga-mimosa"], ["manteiga-matinal", "Matinal magra · −45% gordura", 4.99, "manteiga-matinal"]], { tags: ["portuguese"] });
  S("muenster", "Queijo Muenster Paisa · 283 g", "laticinios", 0, "muenster",
    { en: "Muenster cheese", pt: "Queijo muenster", es: "Queso Muenster" },
    { en: "Mild, creamy and great for melting.", pt: "Suave, cremoso e ótimo para derreter.", es: "Suave, cremoso e ideal para fundir." });
  S("llanero", "Queso Llanero Paisa · 283 g", "laticinios", 0, "llanero",
    { en: "Venezuelan-style hard cheese", pt: "Queijo duro estilo venezuelano", es: "Queso duro estilo venezolano" },
    { en: "Salty and firm — for arepas, cachapas and grating.", pt: "Salgado e firme — para arepas e para ralar.", es: "Salado y firme — para arepas y cachapas." });
  S("requeijao-mabiju", "Requeijão Cremoso Mabiju · 220 g", "laticinios", 0, "requeijao-mabiju",
    { en: "Brazilian cream cheese spread", pt: "Requeijão cremoso", es: "Queso crema brasileño" },
    { en: "The creamy requeijão Brazilians love on bread and in recipes.", pt: "O requeijão cremoso para o pão e as receitas.", es: "El requeijão cremoso para el pan y recetas." });
  G("tang", "Refresco em Pó Tang · 18 g", "geral",
    { en: "Powdered drink mix · makes 1 L", pt: "Refresco em pó · faz 1 litro", es: "Refresco en polvo · rinde 1 L" },
    { en: "The classic Brazilian powdered juice — just add water. Lots of flavours.", pt: "O clássico suco em pó — é só misturar com água. Vários sabores.", es: "El clásico refresco en polvo — solo añade agua." },
    [["tang-abacaxi", "Abacaxi", 1.50, "tang-abacaxi"], ["tang-goiaba", "Goiaba", 1.50, "tang-goiaba"], ["tang-laranja", "Laranja", 1.50, "tang-laranja"],
     ["tang-limao", "Limão", 1.50, "tang-limao"], ["tang-manga", "Manga", 1.50, "tang-manga"], ["tang-maracuja", "Maracujá", 1.50, "tang-maracuja"],
     ["tang-morango", "Morango", 1.50, "tang-morango"], ["tang-tangerina", "Tangerina", 1.50, "tang-tangerina"], ["tang-uva", "Uva", 1.50, "tang-uva"]]);
  const SOON = new Set(["muenster", "llanero", "requeijao-mabiju"]);
  out.forEach(p => { if (SOON.has(p.id)) { p.available = false; p.soon = true; } });
  const order = window.GROUPS.groceries.map(g => g.id);
  out.sort((a, b) => order.indexOf(a.group) - order.indexOf(b.group) || a.price - b.price || a.name.localeCompare(b.name));
  window.PRODUCTS.push(...out);
  if (!window.CATEGORIES.includes("groceries")) window.CATEGORIES.push("groceries");
  const ORDER = ["all", "beef", "pork", "chicken", "deli", "frozen", "groceries", "candy", "drinks", "kitchen", "home"];
  window.CATEGORIES.sort((a, b) => (ORDER.indexOf(a) + 99) % 99 - (ORDER.indexOf(b) + 99) % 99);
})();
