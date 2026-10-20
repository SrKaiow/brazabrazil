/* ============================================================
   BRAZABRAZIL — SOFT DRINKS & JUICES (real shop prices, no alcohol)
   ============================================================ */
window.GROUPS = window.GROUPS || {};
window.GROUPS.drinks = [
  { id: "refri",   label: { en: "Soft drinks",           "pt-BR": "Refrigerantes",           "pt-PT": "Refrigerantes",          es: "Refrescos" } },
  { id: "sucos",   label: { en: "Juices & nectars",      "pt-BR": "Sucos & néctares",        "pt-PT": "Sumos & néctares",       es: "Zumos y néctares" } },
  { id: "aguas",   label: { en: "Water & coconut water", "pt-BR": "Águas & água de coco",    "pt-PT": "Águas & água de coco",   es: "Agua y agua de coco" } },
  { id: "energy",  label: { en: "Energy & chocolate drinks", "pt-BR": "Energéticos & achocolatados", "pt-PT": "Energéticas & achocolatados", es: "Energéticas y batidos" } }
].concat((window.GROUPS.drinks || []));
(function () {
  const I = f => "assets/products/drinks/" + f + ".webp";
  const out = [];
  const S = (id, name, group, price, sub, desc, extra) =>
    out.push(Object.assign({ id, name, cat: "drinks", group, unit: "each", price, tags: [], image: I(id), available: true, sub, desc }, extra || {}));
  const G = (id, name, group, sub, desc, variants, extra) => {
    const ids = [];
    variants.forEach(([vid, label, price]) => {
      ids.push(vid);
      out.push({ id: vid, name: name + " · " + label, optionLabel: label, parent: id, hidden: true, cat: "drinks", group, unit: "each", price, tags: [], image: I(vid), available: true, sub, desc });
    });
    out.push(Object.assign({ id, name, cat: "drinks", group, unit: "each", price: Math.min(...variants.map(v => v[2])), isGroup: true, variants: ids, tags: [], image: I(variants[0][0]), available: true, sub, desc }, extra || {}));
  };
  const L = (en, pt, es) => ({ en, pt, es });

  /* ---------- SOFT DRINKS ---------- */
  G("coca-cola", "Coca-Cola", "refri", L("Coca-Cola", "Coca-Cola", "Coca-Cola"), L("The classic, ice cold.", "A clássica, bem gelada.", "La clásica, bien fría."),
    [["coca-lata", "Lata · original ou zero", 1.10], ["coca-ks", "Garrafa de vidro KS", 1.75], ["coca-original", "Original · garrafa", 2.49]]);
  G("guarana-antarctica", "Guaraná Antarctica", "refri", L("Brazil’s favourite soda", "O refrigerante do Brasil", "El refresco de Brasil"),
    L("The original Brazilian guaraná soda — made with real guaraná from the Amazon.", "O guaraná original, feito com guaraná da Amazônia.", "El guaraná original brasileño."),
    [["guarana-lata", "Lata 330 ml", 1.20], ["guarana-zero", "Lata zero 330 ml", 1.50], ["guarana-15", "Garrafa 1,5 L", 2.99]], { tags: ["best"] });
  G("sumol", "Sumol", "refri", L("Portuguese fizzy fruit drink", "Refrigerante português de fruta", "Refresco portugués de fruta"),
    L("Portugal’s favourite fruity fizz.", "O refrigerante de fruta preferido de Portugal.", "El refresco de fruta favorito de Portugal."),
    [["sumol-ananas-lata", "Ananás (abacaxi) · lata", 1.20], ["sumol-maracuja-lata", "Maracujá · lata 330 ml", 1.20], ["sumol-ananas-15", "Ananás (abacaxi) · 1,5 L", 2.99],
     ["sumol-laranja-15", "Laranja · 1,5 L", 2.99], ["sumol-maracuja-15", "Maracujá · 1,5 L", 2.99]], { tags: ["portuguese"] });
  G("fanta-sukita", "Fanta & Sukita", "refri", L("Orange & grape sodas", "Refrigerantes de laranja e uva", "Refrescos de naranja y uva"),
    L("The Brazilian flavours of childhood.", "Os sabores de infância.", "Los sabores de la infancia."),
    [["fanta-laranja", "Fanta laranja", 2.99], ["fanta-uva", "Fanta uva · lata 350 ml", 2.99], ["sukita-laranja", "Sukita laranja · lata 350 ml", 2.99], ["sukita-uva", "Sukita uva · lata 350 ml", 2.99]]);
  G("tubaina", "Tubaína", "refri", L("Brazilian tutti-frutti soda", "Refrigerante de tubaína", "Refresco tubaína"),
    L("The nostalgic Brazilian soda.", "O refrigerante da nostalgia.", "El refresco nostálgico brasileño."),
    [["tubaina-funada", "Funada · lata 350 ml", 2.99], ["tubaina-garrafa", "Garrafa", 3.99]]);
  G("refri-lata", "Sprite & 7UP", "refri", L("Lemon-lime soda", "Refrigerante de limão", "Refresco de lima-limón"), L("Crisp and refreshing.", "Refrescante.", "Refrescante."),
    [["sprite-lata", "Sprite · lata", 1.00], ["sete-up", "7UP", 1.50]]);

  /* ---------- JUICES ---------- */
  G("compal-1l", "Néctar Compal · 1 L", "sucos", L("Portuguese fruit nectar", "Néctar português", "Néctar portugués"),
    L("Portugal’s favourite fruit nectars.", "Os néctares preferidos de Portugal.", "Los néctares favoritos de Portugal."),
    [["compal-abacaxi-1l", "Abacaxi", 2.99], ["compal-goiaba-1l", "Goiaba", 2.99], ["compal-manga-1l", "Manga", 2.99], ["compal-pera-1l", "Pera", 2.99],
     ["compal-pessego-1l", "Pêssego", 2.99], ["compal-maracuja-1l", "Maracujá", 3.50]], { tags: ["portuguese"] });
  G("compal-mini", "Néctar Compal · garrafinha", "sucos", L("Portuguese nectar · small bottle", "Néctar em garrafinha", "Néctar · botellita"),
    L("Perfect for the lunchbox.", "Perfeito para a lancheira.", "Perfecto para la merienda."),
    [["compal-laranja-200", "Laranja · 200 ml", 1.20], ["compal-maracuja-200", "Maracujá · 200 ml", 1.20], ["compal-maracuja-300", "Maracujá · 300 ml", 1.99]], { tags: ["portuguese"] });
  G("marata-200", "Suco Maratá · 200 ml", "sucos", L("Brazilian juice box", "Suco de caixinha", "Zumo en brik"), L("Ready to drink.", "Pronto para beber.", "Listo para beber."),
    [["marata-manga-200", "Manga", 1.50], ["marata-maracuja-200", "Maracujá", 1.50], ["marata-pessego-200", "Pêssego", 1.50], ["marata-uva-200", "Uva", 1.50]]);
  G("concentrado", "Suco Concentrado", "sucos", L("Concentrated juice · makes several litres", "Suco concentrado · rende vários litros", "Zumo concentrado"),
    L("Mix with water — the taste of Brazilian fruit.", "É só misturar com água — sabor de fruta brasileira.", "Mezclar con agua."),
    [["maguary-caju", "Maguary caju", 2.99], ["marata-acerola", "Maratá acerola", 3.50], ["marata-caju", "Maratá caju", 3.50], ["marata-goiaba", "Maratá goiaba", 3.50], ["maguary-concentrado", "Maguary · outros sabores", 4.80]]);
  G("maguary-nectar", "Néctar Maguary · 1 L", "sucos", L("Brazilian fruit nectar", "Néctar de fruta", "Néctar de fruta"), L("Ready to drink.", "Pronto para beber.", "Listo para beber."),
    [["maguary-uva", "Uva", 2.89], ["maguary-manga", "Manga", 2.99]]);
  G("sucos-lata", "Sucos em Lata", "sucos", L("Exotic juices · can", "Sucos exóticos em lata", "Zumos exóticos en lata"), L("Exotic fruit flavours.", "Sabores de frutas exóticas.", "Sabores exóticos."),
    [["j2o", "J2O", 1.80], ["mangostao", "Mangostão · 330 ml", 1.99], ["tamarindo", "Tamarindo · 350 ml", 1.99]]);
  S("caldo-cana", "Caldo de Cana Vale Verde · 300 ml", "sucos", 3.50, L("Sugarcane juice", "Caldo de cana", "Jugo de caña"), L("Sweet, refreshing sugarcane juice — serve cold with lemon.", "Garapa geladinha — com limão fica perfeita.", "Jugo de caña refrescante."));
  S("uva-casa-bento", "Suco de Uva Integral Casa de Bento", "sucos", 6.96, L("100% grape juice", "Suco de uva integral", "Zumo de uva 100%"), L("Whole grape juice from southern Brazil, no added sugar.", "Suco de uva integral da Serra Gaúcha, sem açúcar.", "Zumo de uva integral."));

  /* ---------- WATER & COCONUT ---------- */
  S("agua", "Água", "aguas", 1.00, L("Still water", "Água mineral", "Agua mineral"), L("Still mineral water.", "Água mineral sem gás.", "Agua mineral."));
  G("agua-pedras", "Água das Pedras", "aguas", L("Portuguese sparkling mineral water", "Água mineral com gás portuguesa", "Agua con gas portuguesa"),
    L("Naturally sparkling Portuguese water.", "Água portuguesa naturalmente gaseificada.", "Agua portuguesa con gas natural."),
    [["pedras-salgada", "Salgada", 1.50], ["pedras-limao", "Limão · 250 ml", 1.50], ["pedras-acai", "Açaí", 1.50]], { tags: ["portuguese"] });
  G("agua-coco", "Água de Coco", "aguas", L("Coconut water", "Água de coco", "Agua de coco"), L("Natural hydration.", "Hidratação natural.", "Hidratación natural."),
    [["kirkland-coco", "Kirkland", 1.50], ["coco-pera-manga", "Pera e manga", 1.89], ["coco-grapefruit", "Grapefruit", 1.89], ["coco-pineapple", "Abacaxi", 1.89], ["vita-coco", "Vita Coco", 1.99]], { tags: ["vegan"] });

  /* ---------- ENERGY & CHOCOLATE ---------- */
  G("red-bull", "Red Bull", "energy", L("Energy drink", "Energético", "Bebida energética"), L("Gives you wings.", "Te dá asas.", "Te da alas."),
    [["redbull", "Original", 1.99], ["redbull-sugarfree", "Sugarfree", 1.99], ["redbull-zero", "Zero", 1.99], ["redbull-acai", "Açaí", 2.50], ["redbull-coconut", "Coconut", 2.50]]);
  S("monster-juice", "Monster Energy Juice", "energy", 1.99, L("Energy drink", "Energético", "Bebida energética"), L("Energy with fruit juice.", "Energético com suco de fruta.", "Energética con zumo."));
  G("achocolatado", "Achocolatado", "energy", L("Chocolate milk drink", "Bebida achocolatada", "Batido de chocolate"), L("The lunchbox favourite.", "O preferido da lancheira.", "El favorito de la merienda."),
    [["agro-achocolatado", "Agro", 1.00], ["ucal", "Ucal", 1.50], ["toddynho", "Toddynho", 2.20]]);

  window.PRODUCTS.push(...out);
  // soft drinks first, alcohol after — each group cheapest first
  const order = window.GROUPS.drinks.map(g => g.id);
  const dr = window.PRODUCTS.filter(p => p.cat === "drinks");
  const rest = window.PRODUCTS.filter(p => p.cat !== "drinks");
  dr.sort((a, b) => order.indexOf(a.group) - order.indexOf(b.group) || a.price - b.price || a.name.localeCompare(b.name));
  window.PRODUCTS.length = 0; window.PRODUCTS.push(...rest, ...dr);
})();
