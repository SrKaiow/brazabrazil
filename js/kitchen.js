/* ============================================================
   BRAZABRAZIL — KITCHEN & HOMEWARE (real shop prices)
   G(...) = one card with options · S(...) = single product
   ============================================================ */

window.GROUPS = window.GROUPS || {};
window.GROUPS.kitchen = [
  { id: "chimarrao", label: { en: "Chimarrão gourds",      "pt-BR": "Chimarrão",               "pt-PT": "Chimarrão",               es: "Mate y bombillas" } },
  { id: "cozinha",   label: { en: "Cookware & utensils",   "pt-BR": "Panelas & utensílios",    "pt-PT": "Tachos & utensílios",     es: "Menaje y utensilios" } },
  { id: "cafe",      label: { en: "Coffee & water filters","pt-BR": "Café & filtros",          "pt-PT": "Café & filtros",          es: "Café y filtros" } },
  { id: "churrasco", label: { en: "Barbecue grills",       "pt-BR": "Churrasqueiras",          "pt-PT": "Grelhadores",             es: "Parrillas" } }
];

(function () {
  const I = f => f ? "assets/products/kitchen/" + f + ".webp" : "";
  const out = [];
  const S = (id, name, group, price, image, sub, desc, extra) =>
    out.push(Object.assign({ id, name, cat: "kitchen", group, unit: "each", price, tags: [], image: I(image), available: true, sub, desc }, extra || {}));
  const G = (id, name, group, sub, desc, variants, extra) => {
    variants.sort((a, b) => a[2] - b[2]);
    const ids = [], first = (variants.find(v => v[3]) || [])[3] || "";
    variants.forEach(([vid, label, price, image]) => {
      ids.push(vid);
      out.push({ id: vid, name: name + " · " + label, optionLabel: label, parent: id, hidden: true, cat: "kitchen", group,
                 unit: "each", price, tags: [], image: I(image || first), available: true, sub, desc });
    });
    out.push(Object.assign({ id, name, cat: "kitchen", group, unit: "each", price: Math.min(...variants.map(v => v[2])), isGroup: true, variants: ids, tags: [],
                 image: I(first), available: true, sub, desc }, extra || {}));
  };

  /* ---------- CHIMARRÃO ---------- */
  G("cuia", "Cuia de Chimarrão", "chimarrao",
    { en: "Gourd for chimarrão / yerba mate", pt: "Cuia para chimarrão", es: "Mate para yerba mate" },
    { en: "Traditional gourd for southern Brazil’s chimarrão — choose with or without the bomba (metal straw).", pt: "A cuia tradicional do chimarrão gaúcho — escolha com ou sem bomba.", es: "El mate tradicional del sur de Brasil — con o sin bombilla." },
    [["cuia-222a", "222-A", 10.99, "cuia-222a"],
     ["cuia-bomba-mini", "Cuia e bomba · mini", 16.00, "cuia-bomba-mini"],
     ["cuia-bomba", "Cuia e bomba", 16.99, "cuia-bomba"],
     ["cuia-102", "102", 24.99, "cuia-102"],
     ["cuia-103", "103", 26.99, "cuia-103"]]);

  /* ---------- COOKWARE & UTENSILS ---------- */
  G("cuscuzeira", "Cuscuzeira", "cozinha",
    { en: "Couscous steamer pot · for cuscuz", pt: "Panela para cuscuz", "pt-PT": "Panela para cuscuz", es: "Cuscusera" },
    { en: "Aluminium steamer for the perfect Brazilian cuscuz nordestino.", pt: "Cuscuzeira de alumínio para o cuscuz nordestino perfeito.", es: "Cuscusera de aluminio para el cuscuz brasileño perfecto." },
    [["cuscuzeira-oliveira-14", "Oliveira · Nº 14", 18.98, "cuscuzeira-oliveira-14"],
     ["cuscuzeira-oliveira-16", "Oliveira · Nº 16", 20.50, "cuscuzeira-oliveira-16"],
     ["cuscuzeira-10", "Nº 10", 24.00, "cuscuzeira-10"],
     ["cuscuzeira-14", "Nº 14", 26.00, "cuscuzeira-14"]]);
  S("espremedor-alho", "Espremedor de Alho Tramontina", "cozinha", 6.99, "espremedor-alho",
    { en: "Garlic press", pt: "Espremedor de alho", es: "Prensa de ajos" },
    { en: "Sturdy Tramontina garlic press — fresh garlic in seconds.", pt: "Espremedor Tramontina resistente — alho fresquinho em segundos.", es: "Prensa de ajos Tramontina resistente." });
  S("forma-bolo-20", "Forma de Bolo Big Home · Nº 20", "cozinha", 6.98, "forma-bolo-20",
    { en: "Ring cake tin · 20 cm", pt: "Forma redonda com furo · 20 cm", es: "Molde de bizcocho con agujero · 20 cm" },
    { en: "Aluminium ring tin for bolo de fubá, pudim and classic Brazilian cakes.", pt: "Forma de alumínio com furo para bolo de fubá, pudim e bolos caseiros.", es: "Molde de aluminio para bizcochos y flan." });
  S("sanduicheira", "Forma Bauru · Sanduicheira", "cozinha", 9.99, "sanduicheira",
    { en: "Stovetop toasted-sandwich maker", pt: "Sanduicheira de fogão", es: "Sandwichera para fogón" },
    { en: "The old-school hob sandwich maker — crispy toasties, Brazilian style.", pt: "A sanduicheira raiz de fogão — misto quente crocante como antigamente.", es: "La sandwichera de toda la vida — tostados crujientes." });
  S("faca-tramontina-8", "Faca Tramontina Profissional Branca · 8\"", "cozinha", 18.99, "faca-tramontina-8",
    { en: "Professional chef’s knife · 8 in", pt: "Faca do chef profissional · 8 polegadas", es: "Cuchillo de chef profesional · 8\"" },
    { en: "The butcher’s favourite — stainless steel blade with a white non-slip handle.", pt: "A preferida dos açougueiros — lâmina de aço inox e cabo branco antiderrapante.", es: "El favorito de los carniceros — hoja de acero inoxidable y mango antideslizante." });

  /* ---------- COFFEE & WATER FILTERS ---------- */
  S("filtro-melitta", "Filtro de Papel Melitta 103 · 30 un", "cafe", 3.48, "filtro-melitta",
    { en: "Paper coffee filters · size 103", pt: "Filtro de papel para café · 103", es: "Filtros de papel para café · 103" },
    { en: "Melitta’s original micro-perforated filters for a fresh cafezinho.", pt: "O filtro original Melitta com microfuros, para um cafezinho fresquinho.", es: "Los filtros originales de Melitta, microperforados." });
  S("coador-pano", "Coador de Pano · Médio", "cafe", 3.98, "coador-pano",
    { en: "Cloth coffee strainer · medium", pt: "Coador de café de pano", es: "Colador de tela para café" },
    { en: "The traditional cloth strainer — grandma’s way to make coffee.", pt: "O coador de pano tradicional — o café passado da vó.", es: "El colador de tela tradicional — el café de la abuela." });
  G("filtro-barro", "Filtro de Barro São Pedro", "cafe",
    { en: "Brazilian clay water filter", pt: "Filtro de barro", es: "Filtro de agua de barro" },
    { en: "The famous Brazilian clay water filter — keeps water naturally cool and pure.", pt: "O famoso filtro de barro brasileiro — água sempre fresquinha e filtrada.", es: "El famoso filtro de barro brasileño — agua fresca y filtrada." },
    [["filtro-barro-2", "Nº 2 · 6 L", 75.00, "filtro-barro-2"],
     ["filtro-barro-3", "Nº 3 · 8 L", 85.00, "filtro-barro-3"]]);

  /* ---------- BARBECUE GRILLS ---------- */
  S("churrasqueira-eletrica", "Churrasqueira Elétrica Multilaser", "churrasco", 35.00, "churrasqueira-eletrica",
    { en: "Electric table grill", pt: "Churrasqueira elétrica de mesa", es: "Parrilla eléctrica de mesa" },
    { en: "Churrasco indoors — adjustable thermostat and removable grill.", pt: "Churrasco dentro de casa — termostato regulável e grelha removível.", es: "Churrasco en casa — termostato regulable y parrilla extraíble." });
  S("churrasqueira-barril", "Churrasqueira Barril Tramontina", "churrasco", 80.00, "churrasqueira-barril",
    { en: "Stainless-steel barrel charcoal grill", pt: "Churrasqueira a carvão em aço inox", es: "Parrilla de carbón tipo barril" },
    { en: "Portable charcoal barrel grill — perfect for the garden churrasco.", pt: "Churrasqueira barril a carvão, portátil — perfeita para o churrasco no quintal.", es: "Parrilla de carbón portátil — perfecta para el jardín." });

  const order = window.GROUPS.kitchen.map(g => g.id);
  out.sort((a, b) => order.indexOf(a.group) - order.indexOf(b.group) || a.price - b.price || a.name.localeCompare(b.name));
  window.PRODUCTS.push(...out);
  if (!window.CATEGORIES.includes("kitchen")) window.CATEGORIES.push("kitchen");
})();
