/* ============================================================
   BRAZABRAZIL — FROZEN (real shop prices)
   ------------------------------------------------------------
   Products that "go together" are one card with options (variants).
   Each option is its own product id (used by the basket and payment
   server); the card shows a selector and the price changes with it.

   G(id, name, group, sub, desc, [ [variantId, optionLabel, price, image], ... ])
   S(id, name, group, price, image, sub, desc, extra)  -> single product
   ============================================================ */

window.GROUPS = window.GROUPS || {};
window.GROUPS.frozen = [
  { id: "cheesebread", label: { en: "Cheese bread & bakery", "pt-BR": "Pão de queijo & padaria", "pt-PT": "Pão de queijo & padaria", es: "Pan de queso y panadería" } },
  { id: "acai",        label: { en: "Açaí & fruit pulps",    "pt-BR": "Açaí & polpas",           "pt-PT": "Açaí & polpas",           es: "Açaí y pulpas" } },
  { id: "snacks",      label: { en: "Pastel & pamonha",      "pt-BR": "Pastel & pamonha",        "pt-PT": "Pastel & pamonha",        es: "Pastel y pamonha" } },
  { id: "fish",        label: { en: "Fish & seafood",        "pt-BR": "Peixes & frutos do mar",  "pt-PT": "Peixes & marisco",        es: "Pescados y mariscos" } },
  { id: "veg",         label: { en: "Vegetables & roots",    "pt-BR": "Legumes & raízes",        "pt-PT": "Legumes & raízes",        es: "Verduras y raíces" } }
];

(function () {
  const I = f => "assets/products/frozen/" + f + ".webp";
  const out = [];
  const S = (id, name, group, price, image, sub, desc, extra) =>
    out.push(Object.assign({ id, name, cat: "frozen", group, unit: "each", price, tags: ["frozen"], image: I(image), available: true, sub, desc }, extra || {}));
  const G = (id, name, group, sub, desc, variants, extra) => {
    const ids = [];
    variants.forEach(([vid, label, price, image]) => {
      ids.push(vid);
      out.push({ id: vid, name: name + " · " + label, optionLabel: label, parent: id, hidden: true, cat: "frozen", group,
                 unit: "each", price, tags: ["frozen"], image: I(image), available: true, sub, desc });
    });
    out.push(Object.assign({ id, name, cat: "frozen", group, unit: "each", isGroup: true, variants: ids, tags: ["frozen"],
                 image: I(variants[0][3]), available: true, sub, desc }, extra || {}));
  };

  /* ---------- CHEESE BREAD & BAKERY ---------- */
  G("rez-paodequeijo", "Pão de Queijo Rez", "cheesebread",
    { en: "Frozen Brazilian cheese bread", pt: "Pão de queijo congelado", es: "Pan de queso congelado" },
    { en: "Bake from frozen in 20 minutes — warm, chewy and naturally gluten-free.", pt: "Do freezer ao forno em 20 minutos — quentinho, macio e sem glúten.", es: "Del congelador al horno en 20 minutos — tierno y sin gluten." },
    [["rez-18", "18 un · 450 g", 5.99, "rez-18"], ["rez-40", "40 un · 1 kg", 15.99, "rez-40"], ["rez-100", "100 un · 1,8 kg", 20.99, "rez-100"]],
    { tags: ["frozen", "gf"] });
  G("snip-paodequeijo", "Pão de Queijo Snip", "cheesebread",
    { en: "Frozen Brazilian cheese bread", pt: "Pão de queijo congelado", es: "Pan de queso congelado" },
    { en: "Classic Minas-style cheese bread, ready to bake.", pt: "Pão de queijo mineiro clássico, pronto para assar.", es: "Pan de queso clásico estilo Minas, listo para hornear." },
    [["snip-15", "15 unidades", 5.99, "snip-50"], ["snip-50", "50 unidades", 19.99, "snip-50"]],
    { tags: ["frozen", "gf"] });
  S("cheese-yummies", "Pão de Queijo Cheese Yummies", "cheesebread", 5.99, "cheese-yummies",
    { en: "18 units", pt: "18 unidades", es: "18 unidades" },
    { en: "Golden cheese bread bites — perfect for breakfast or a snack.", pt: "Pãezinhos de queijo dourados — perfeitos no café da manhã.", "pt-PT": "Pãezinhos de queijo dourados — perfeitos ao pequeno-almoço.", es: "Bocaditos de pan de queso dorados — perfectos para el desayuno." }, { tags: ["frozen", "gf"] });
  S("rez-chipa", "Chipa Rez", "cheesebread", 12.99, "rez-chipa",
    { en: "Cheese biscuit rings · 20 units", pt: "Biscoito de queijo · 20 unidades", es: "Chipá de queso · 20 unidades" },
    { en: "Crunchy outside, cheesy inside — bake from frozen.", pt: "Crocante por fora, queijo por dentro — direto do freezer.", es: "Crujiente por fuera, con queso por dentro — del congelador al horno." }, { tags: ["frozen", "gf"] });
  S("pao-frances", "Pão Francês", "cheesebread", 5.99, "pao-frances",
    { en: "Brazilian bread rolls · part-baked pack", pt: "Pacote · pré-assado", es: "Panecillos brasileños · precocidos" },
    { en: "Crusty Brazilian rolls, from freezer to oven — like the padaria back home.", pt: "Pãozinho crocante do freezer direto para o forno — igual ao da padaria.", es: "Panecillos crujientes del congelador al horno — como en la panadería." });

  /* ---------- AÇAÍ & FRUIT PULPS ---------- */
  G("acai-polpanorte", "Açaí Polpa Norte com Guaraná", "acai",
    { en: "Frozen açaí sorbet with guaraná", pt: "Açaí cremoso com guaraná", es: "Sorbete de açaí con guaraná" },
    { en: "Thick, creamy açaí straight from the Amazon. Top with banana, granola and condensed milk.", pt: "Açaí grosso e cremoso direto do Pará. Monte com banana, granola e leite condensado.", es: "Açaí espeso y cremoso del Amazonas. Con plátano, granola y leche condensada." },
    [["acai-200g", "200 g", 2.99, "acai-200g"], ["acai-500g", "500 g", 6.99, "acai-500g"], ["acai-1kg", "1,02 kg", 11.99, "acai-1kg"],
     ["acai-12kg", "1,2 kg", 14.99, "acai-12kg"], ["acai-3kg", "3,6 kg", 38.00, "acai-3kg"]],
    { tags: ["frozen", "best"] });
  G("polpas", "Polpa de Fruta", "acai",
    { en: "Frozen fruit pulp · 100 g", pt: "Polpa congelada · 100 g", es: "Pulpa de fruta congelada · 100 g" },
    { en: "100% fruit pulp for juices, smoothies and desserts.", pt: "100% polpa de fruta para sucos, vitaminas e sobremesas.", es: "100% pulpa de fruta para zumos, batidos y postres." },
    [["polpa-acai", "Açaí", 1.99, "polpa-acai"], ["polpa-maracuja", "Maracujá", 1.99, "polpa-maracuja"], ["polpa-cupuacu", "Cupuaçu Polpa Norte", 13.99, "polpa-cupuacu"]],
    { tags: ["frozen", "vegan"] });
  S("cupuacu", "Creme de Cupuaçu Polpa Norte", "acai", 9.99, "cupuacu",
    { en: "Cupuaçu cream · 1.02 kg", pt: "Creme de cupuaçu · 1,02 kg", es: "Crema de cupuaçu · 1,02 kg" },
    { en: "Tangy-sweet Amazonian fruit cream — a taste of the north of Brazil.", pt: "Creme da fruta amazônica, doce e azedinho.", es: "Crema de fruta amazónica, dulce y ácida." });

  /* ---------- PASTEL & PAMONHA ---------- */
  G("massa-pastel", "Massa de Pastel", "snacks",
    { en: "Pastel pastry", pt: "Massa para pastel", es: "Masa para pastel" },
    { en: "Make crispy Brazilian pastéis at home — fill, fold and fry.", pt: "Faça pastel de feira em casa — recheie, feche e frite.", es: "Haz pasteles brasileños crujientes en casa — rellena, cierra y fríe." },
    [["massa-jaboque", "Jaboque · rolo", 10.99, "massa-jaboque"], ["massa-redonda", "Redonda Jaboque", 10.99, "massa-redonda"], ["massa-bertioga", "Rolo Bertioga", 10.99, "massa-bertioga"]]);
  G("pamonha", "Pamonha Pura", "snacks",
    { en: "Brazilian corn tamale", pt: "Pamonha congelada", es: "Tamal brasileño de maíz" },
    { en: "Fresh sweetcorn pamonha — just heat and enjoy. Gluten-free.", pt: "Pamonha de milho verde — é só aquecer. Sem glúten.", es: "Pamonha de maíz tierno — solo calentar. Sin gluten." },
    [["pamonha-salgada", "Salgada", 5.99, "pamonha"], ["pamonha-doce", "Doce com queijo", 5.99, "pamonha-doce"]],
    { tags: ["frozen", "gf"] });

  /* ---------- FISH & SEAFOOD ---------- */
  S("sardinha", "Sardinha Ocean Pearl", "fish", 7.99, "sardinha",
    { en: "Whole sardines · 900 g", pt: "Sardinha inteira · 900 g", es: "Sardinas enteras · 900 g" },
    { en: "Perfect grilled the Portuguese way, with coarse salt.", pt: "Perfeita na brasa à moda portuguesa, com sal grosso.", es: "Perfectas a la brasa al estilo portugués, con sal gruesa." });
  S("tilapia", "Tilápia Península", "fish", 9.99, "tilapia",
    { en: "Tilapia fillets · 800 g", pt: "Filé de tilápia · 800 g", es: "Filetes de tilapia · 800 g" },
    { en: "Mild white fish fillets — fry, bake or grill.", pt: "Filés de peixe branco e suave — frito, assado ou grelhado.", es: "Filetes de pescado blanco suave — fritos, al horno o a la plancha." });
  S("sr-bacalhau", "Sr. Bacalhau Posta", "fish", 18.99, "sr-bacalhau",
    { en: "Portuguese salt cod loin · desalted", pt: "Posta tradicional · demolhado", es: "Lomo de bacalao · desalado" },
    { en: "Desalted and ready to cook — the easiest way to make bacalhau.", pt: "Já demolhado e pronto a cozinhar — o jeito mais fácil de fazer bacalhau.", es: "Desalado y listo para cocinar — la forma más fácil de hacer bacalao." }, { tags: ["frozen", "portuguese"] });
  S("polvo", "Polvo Brasmar", "fish", 19.99, "polvo",
    { en: "Cleaned octopus · per kg", pt: "Polvo limpo · por kg", es: "Pulpo limpio · por kg" },
    { en: "For polvo à lagareiro or a seafood rice.", pt: "Para polvo à lagareiro ou arroz de marisco.", es: "Para pulpo a la lagareira o arroz con marisco." }, { unit: "kg", tags: ["frozen", "portuguese"] });

  /* ---------- VEGETABLES & ROOTS ---------- */
  G("quiabo", "Quiabo", "veg",
    { en: "Frozen okra", pt: "Quiabo congelado", es: "Okra congelada" },
    { en: "For frango com quiabo, caruru and stews.", pt: "Para frango com quiabo, caruru e refogados.", es: "Para pollo con okra, caruru y guisos." },
    [["quiabo-cofresh", "Cofresh", 2.49, "quiabo-cofresh"], ["quiabo-taj", "Taj", 4.99, "quiabo-taj"]], { tags: ["frozen", "vegan"] });
  S("mandioca", "Mandioca Top Brazil", "veg", 3.99, "mandioca",
    { en: "Frozen cassava chunks · 1 kg", pt: "Mandioca inteira · 1 kg", es: "Yuca en trozos · 1 kg" },
    { en: "Boil then fry for the best crispy cassava chips.", pt: "Cozinhe e frite para a melhor mandioca frita.", es: "Hiérvela y fríela para la mejor yuca frita." }, { tags: ["frozen", "vegan", "gf"] });
  S("banana", "Banana-da-Terra Top Brazil", "veg", 4.99, "banana",
    { en: "Ripe plantain slices · 1 kg", pt: "Banana-da-terra fatiada · 1 kg", es: "Plátano macho en rodajas · 1 kg" },
    { en: "Fry until golden — sweet and caramelised.", pt: "Frite até dourar — doce e caramelizada.", es: "Fríelo hasta dorar — dulce y caramelizado." }, { tags: ["frozen", "vegan"] });
  S("pequi", "Pequi Top Brazil", "veg", 8.99, "pequi",
    { en: "Frozen pequi fruit", pt: "Pequi congelado", es: "Pequi congelado" },
    { en: "The soul of Goiás cooking — arroz com pequi and frango com pequi.", pt: "A alma da cozinha goiana — arroz e frango com pequi.", es: "El alma de la cocina de Goiás — arroz y pollo con pequi." }, { tags: ["frozen", "vegan"] });

  // sort: by group order, then lowest price (groups use their cheapest option)
  const byId = Object.fromEntries(out.map(p => [p.id, p]));
  out.forEach(p => { if (p.isGroup) p.price = Math.min(...p.variants.map(v => byId[v].price)); });
  const order = window.GROUPS.frozen.map(g => g.id);
  out.sort((a, b) => order.indexOf(a.group) - order.indexOf(b.group) || a.price - b.price || a.name.localeCompare(b.name));

  // the example "pão de queijo" in products.js is replaced by the real ones
  window.PRODUCTS = window.PRODUCTS.filter(p => p.id !== "paodequeijo");
  window.PRODUCTS.push(...out);
  if (!window.CATEGORIES.includes("frozen")) {
    const i = window.CATEGORIES.indexOf("groceries");
    window.CATEGORIES.splice(i < 0 ? window.CATEGORIES.length : i, 0, "frozen");
  }
})();
