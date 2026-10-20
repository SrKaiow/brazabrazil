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

  G("forma-pudim", "Forma de Pudim", "cozinha",
    { en: "Flan / pudim ring tin", pt: "Forma para pudim com furo", es: "Molde para flan" },
    { en: "Aluminium ring tin for the classic Brazilian pudim de leite.", pt: "Forma de alumínio com furo para o clássico pudim de leite.", es: "Molde de aluminio para el clásico flan brasileño." },
    [["forma-pudim-22", "Nº 22", 13.99, "forma-pudim-22"], ["forma-pudim-26", "Nº 26", 14.99, "forma-pudim-26"]]);
  S("forminhas", "Forminhas para Docinhos de Festa", "cozinha", 2.14, "forminhas",
    { en: "Paper cases for party sweets", pt: "Forminhas de papel para brigadeiro", es: "Cápsulas de papel para dulces" },
    { en: "Colourful paper cases for brigadeiros, beijinhos and party sweets.", pt: "Forminhas coloridas para brigadeiro, beijinho e docinhos de festa.", es: "Cápsulas de colores para brigadeiros y dulces de fiesta." });
  S("copo-americano", "Copo Americano Nadir", "cozinha", 1.80, "copo-americano",
    { en: "The classic Brazilian bar glass · 190 ml", pt: "O clássico copo americano · 190 ml", es: "El clásico vaso americano brasileño" },
    { en: "The iconic Nadir glass found in every Brazilian bar and kitchen.", pt: "O icônico copo Nadir de todo boteco e cozinha brasileira.", es: "El icónico vaso Nadir de todos los bares brasileños." });
  S("acendedor-jacks", "Acendedor Jacks", "cozinha", 1.99, "acendedor-jacks",
    { en: "Long gas lighter for hob & barbecue", pt: "Acendedor para fogão e churrasqueira", es: "Encendedor largo para cocina y barbacoa" },
    { en: "Long-reach lighter — safe for lighting hobs, ovens and the grill.", pt: "Acendedor de cabo longo — seguro para fogão, forno e churrasqueira.", es: "Encendedor de cuello largo — para fogones, hornos y parrilla." });
  G("mini-cuscuzeira", "Mini Cuscuzeira · 250 ml", "cozinha",
    { en: "Mini non-stick couscous steamer", pt: "Mini cuscuzeira antiaderente", es: "Mini cuscusera antiadherente" },
    { en: "Non-stick mini steamer with glass lid — the perfect cuscuz for one or two.", pt: "Mini cuscuzeira antiaderente com tampa de vidro — cuscuz na medida para 1 ou 2.", es: "Mini cuscusera antiadherente con tapa de vidrio." },
    [["mini-cuscuzeira-preta", "Preta", 18.99, "mini-cuscuzeira-preta"], ["mini-cuscuzeira-vermelha", "Vermelha", 18.99, "mini-cuscuzeira-vermelha"]]);
  S("jogo-facas-4", "Jogo de Facas Tramontina Plenus · 4 pç", "cozinha", 19.00, "jogo-facas-4",
    { en: "Knife & fork set · 4 pieces", pt: "Jogo de faca e garfo · 4 peças", es: "Juego de cuchillos y tenedor · 4 piezas" },
    { en: "Chef, boning and vegetable knives plus carving fork — made in Brazil.", pt: "Faca do chef, desossa, legumes e garfo trinchante — feito no Brasil.", es: "Cuchillo de chef, deshuesador, verduras y tenedor trinchante." });

  /* ---------- COFFEE & WATER FILTERS ---------- */
  G("melitta-filtro", "Filtro de Papel Melitta · 30 un", "cafe",
    { en: "Paper coffee filters", pt: "Filtro de papel para café", es: "Filtros de papel para café" },
    { en: "Melitta’s original micro-perforated filters for a fresh cafezinho.", pt: "O filtro original Melitta com microfuros, para um cafezinho fresquinho.", es: "Los filtros originales de Melitta, microperforados." },
    [["melitta-102", "102", 2.99, "melitta-102"], ["filtro-melitta", "103", 3.48, "filtro-melitta"]]);
  S("melitta-suporte", "Suporte para Filtro Melitta 102", "cafe", 7.99, "melitta-suporte",
    { en: "Coffee filter holder · size 102", pt: "Porta-filtro para café · 102", es: "Portafiltro para café · 102" },
    { en: "Melitta’s classic cone holder — brew coffee straight into the cup or pot.", pt: "O clássico porta-filtro Melitta — café passado direto na xícara ou na garrafa.", es: "El clásico portafiltro Melitta." });
  G("coador", "Coador de Café de Pano", "cafe",
    { en: "Cloth coffee strainer", pt: "Coador de café de pano", es: "Colador de tela para café" },
    { en: "The traditional cloth strainer — grandma’s way to make coffee.", pt: "O coador de pano tradicional — o café passado da vó.", es: "El colador de tela tradicional — el café de la abuela." },
    [["coador-michelon", "Mini de mesa Michelon · pequeno", 2.99, "coador-michelon"], ["coador-pano", "Médio", 3.98, "coador-pano"]]);
  G("garrafa-termica", "Garrafa Térmica", "cafe",
    { en: "Vacuum flask for coffee", pt: "Garrafa térmica para café", es: "Termo para café" },
    { en: "Keeps the cafezinho hot for hours.", pt: "Mantém o cafezinho quente por horas.", es: "Mantiene el café caliente durante horas." },
    [["garrafa-bege", "Bege", 19.90, "garrafa-bege"], ["garrafa-preta", "Preta", 19.90, "garrafa-preta"], ["garrafa-preta-1l", "Preta de pressão · 1 L", 32.50, "garrafa-preta-1l"]]);
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
