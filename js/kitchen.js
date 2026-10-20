/* ============================================================
   BRAZABRAZIL — KITCHEN & HOMEWARE (real shop prices)
   G(...) = one card with options · S(...) = single product
   ============================================================ */

window.GROUPS = window.GROUPS || {};
window.GROUPS.kitchen = [
  { id: "chimarrao", label: { en: "Chimarrão gourds",      "pt-BR": "Chimarrão",               "pt-PT": "Chimarrão",               es: "Mate y bombillas" } },
  { id: "cozinha",   label: { en: "Cookware & utensils",   "pt-BR": "Panelas & utensílios",    "pt-PT": "Tachos & utensílios",     es: "Menaje y utensilios" } },
  { id: "cafe",      label: { en: "Coffee & water filters","pt-BR": "Café & filtros",          "pt-PT": "Café & filtros",          es: "Café y filtros" } },
  { id: "churrasco", label: { en: "Barbecue grills",       "pt-BR": "Churrasqueiras",          "pt-PT": "Grelhadores",             es: "Parrillas" } },
  { id: "variedades", label: { en: "Gifts & bits",         "pt-BR": "Variedades & presentes",  "pt-PT": "Variedades & presentes",  es: "Variedades y regalos" } }
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
  G("jogo-facas", "Jogo de Facas Tramontina", "cozinha",
    { en: "Kitchen knife set", pt: "Jogo de facas de cozinha", es: "Juego de cuchillos de cocina" },
    { en: "Tramontina knife sets made in Brazil — for meat, vegetables, bread and more.", pt: "Jogos de facas Tramontina feitos no Brasil — para carne, legumes, pão e mais.", es: "Juegos de cuchillos Tramontina hechos en Brasil." },
    [["kit-colorido", "Plenus colorido · 6 pç", 17.60, "kit-colorido"], ["jogo-facas-4", "Plenus preto · 4 pç (com garfo)", 19.00, "jogo-facas-4"]]);
  S("pedra-amolar", "Pedra de Amolar Faca", "cozinha", 3.99, "pedra-amolar",
    { en: "Knife sharpening stone", pt: "Pedra para afiar facas", es: "Piedra de afilar cuchillos" },
    { en: "Double-sided sharpening stone — keep your knives butcher-sharp.", pt: "Pedra dupla face — faca sempre afiada como de açougue.", es: "Piedra de doble cara — cuchillos siempre afilados." });
  G("pilao", "Pilão Socador de Alho", "cozinha",
    { en: "Wooden pestle & mortar", pt: "Pilão de madeira para alho", es: "Mortero de madera" },
    { en: "Crush garlic and salt the Brazilian way for the perfect tempero.", pt: "Soque alho e sal do jeito brasileiro para o tempero perfeito.", es: "Machaca ajo y sal para el aliño perfecto." },
    [["pilao-bambu", "Bamboo", 10.99, "pilao-bambu"], ["pilao-madeira", "Madeira", 10.99, "pilao-madeira"], ["pilao-grande", "Madeira · grande", 18.99, "pilao-grande"]]);
  G("panela-pressao", "Panela de Pressão Tramontina", "cozinha",
    { en: "Non-stick pressure cooker", pt: "Panela de pressão antiaderente", es: "Olla a presión antiadherente" },
    { en: "Cooks feijão, ribs and stews in a fraction of the time — with safety valve.", pt: "Feijão, costela e cozidos em muito menos tempo — com válvula de segurança.", es: "Frijoles, costillas y guisos en mucho menos tiempo." },
    [["pressao-45", "4,5 L", 49.90, "pressao-45"], ["pressao-6", "6 L", 65.00, "pressao-6"]]);

  S("abridor", "Abridor Combinado Art House", "cozinha", 1.75, "abridor",
    { en: "Bottle & can opener", pt: "Abridor de garrafa e lata", es: "Abrebotellas y abrelatas" },
    { en: "Two-in-one stainless opener for bottles and cans.", pt: "Abridor 2 em 1 de inox para garrafa e lata.", es: "Abridor 2 en 1 para botellas y latas." });
  S("borracha-panela", "Borracha de Panela de Pressão Tramontina", "cozinha", 6.00, "borracha-panela",
    { en: "Pressure-cooker sealing ring", pt: "Anel de vedação para panela de pressão", es: "Junta para olla a presión" },
    { en: "Genuine Tramontina replacement sealing ring — keep your pressure cooker safe.", pt: "Anel de vedação original Tramontina — panela de pressão sempre segura.", es: "Junta de repuesto original Tramontina." });

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
  S("torneira-filtro", "Torneira para Filtro de Barro São Pedro", "cafe", 3.50, "torneira-filtro",
    { en: "Replacement tap for clay water filter", pt: "Torneira de reposição para filtro de barro", es: "Grifo de repuesto para filtro de barro" },
    { en: "Spare tap that fits São Pedro and most Brazilian clay filters.", pt: "Torneira de reposição para filtro São Pedro e similares.", es: "Grifo de repuesto para filtros de barro brasileños." });
  G("vela-filtro", "Vela para Filtro de Barro", "cafe",
    { en: "Replacement ceramic filter candle", pt: "Vela de reposição para filtro", es: "Vela cerámica de repuesto" },
    { en: "Replace every 6 months for pure, great-tasting water.", pt: "Troque a cada 6 meses para uma água sempre pura e saborosa.", es: "Cambiar cada 6 meses para un agua pura." },
    [["vela-simples", "Vela simples", 13.97, "vela-filtro"], ["vela-stefani", "Stefani tradicional", 13.99, "vela-stefani"], ["vela-tripla", "Elite São Pedro · tripla ação (carvão + prata)", 14.99, "vela-tripla"]]);
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

  S("espetos-bambu", "Espetos de Bambu Every Chef · 100 un", "churrasco", 2.50, "espetos-bambu",
    { en: "Bamboo skewers · 100 pack", pt: "Palitos de bambu para espetinho · 100 un", es: "Brochetas de bambú · 100 un" },
    { en: "For espetinhos, kebabs and party snacks.", pt: "Para espetinhos de churrasco e petiscos.", es: "Para brochetas y aperitivos." });
  G("kit-churrasco", "Kit Churrasco Tramontina · faca e garfo", "churrasco",
    { en: "Barbecue carving set · knife & fork", pt: "Jogo para churrasco · faca e garfo trinchante", es: "Juego para asado · cuchillo y tenedor" },
    { en: "Carving knife and fork with wooden handles — the churrasqueiro’s essentials.", pt: "Faca e garfo trinchante com cabo de madeira — o essencial do churrasqueiro.", es: "Cuchillo y tenedor trinchante con mango de madera." },
    [["kit-churrasco-2", "Natural wood · 2 pç", 19.00, "kit-churrasco-2"], ["faca-garfo-madeira", "Polywood vermelho · 2 pç", 25.00, "faca-garfo-madeira"]]);

  S("carvao", "Carvão Vegetal · 5 kg", "churrasco", 11.99, "carvao",
    { en: "Lumpwood charcoal · approx. 5 kg", pt: "Carvão para churrasco · aprox. 5 kg", es: "Carbón vegetal · aprox. 5 kg" },
    { en: "Natural lumpwood charcoal — lights fast and burns hot for the perfect churrasco.", pt: "Carvão vegetal que acende rápido e dá brasa forte para o churrasco perfeito.", es: "Carbón vegetal natural para el asado perfecto." });

  /* ---------- GIFTS & BITS ---------- */
  S("baralho-copag", "Baralho Copag 157", "variedades", 5.99, "baralho-copag",
    { en: "Brazilian playing cards", pt: "Baralho Copag", es: "Baraja Copag" },
    { en: "The classic Brazilian deck — for truco, buraco and family nights.", pt: "O baralho clássico — para truco, buraco e a noite em família.", es: "La baraja clásica brasileña — para truco y noches en familia." });
  S("chaveiros", "Chaveiros Ateliê Lírio · 1 por £2.75 · 2 por £5", "variedades", 2.75, "chaveiros",
    { en: "3D-printed keyrings · 2 for £5", pt: "Chaveiros em impressão 3D · 2 por £5", es: "Llaveros impresos en 3D · 2 por £5" },
    { en: "Football clubs, characters and more — handmade by Ateliê Lírio. Buy 2 for £5. Tell us the model you want in the order notes.", pt: "Times de futebol, personagens e muito mais — feitos à mão pelo Ateliê Lírio. Leve 2 por £5. Diga o modelo que quer nas observações do pedido.", es: "Clubes de fútbol, personajes y más — hechos a mano por Ateliê Lírio. 2 por £5." }, { multi: { n: 2, price: 5 } });

  const order = window.GROUPS.kitchen.map(g => g.id);
  out.sort((a, b) => order.indexOf(a.group) - order.indexOf(b.group) || a.price - b.price || a.name.localeCompare(b.name));
  window.PRODUCTS.push(...out);
  if (!window.CATEGORIES.includes("kitchen")) window.CATEGORIES.push("kitchen");
})();
