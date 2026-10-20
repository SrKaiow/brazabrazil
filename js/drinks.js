/* ============================================================
   BRAZABRAZIL — DRINKS (real shop prices)
   ------------------------------------------------------------
   Same fields as js/products.js, plus:
   group   wine | beer | cachaca | spirits   (sub-filter inside "Drinks")
   The site sorts each group by price automatically (cheapest first).
   Alcohol: the basket asks the customer to confirm they are 18+.
   ============================================================ */

window.GROUPS = window.GROUPS || {};
window.DRINK_GROUPS = window.GROUPS.drinks = [
  { id: "wine",    label: { en: "Wines",            "pt-BR": "Vinhos",                 "pt-PT": "Vinhos",                  es: "Vinos" } },
  { id: "beer",    label: { en: "Beers",            "pt-BR": "Cervejas",               "pt-PT": "Cervejas",                es: "Cervezas" } },
  { id: "cachaca", label: { en: "Cachaça",          "pt-BR": "Cachaças & aguardentes", "pt-PT": "Cachaças & aguardentes",  es: "Cachaça" } },
  { id: "spirits", label: { en: "Liqueurs & spirits","pt-BR": "Licores & destilados",  "pt-PT": "Licores & destilados",    es: "Licores y destilados" } }
];

(function () {
  const I = f => "assets/products/drinks/" + f + ".webp";
  const D = (id, name, group, price, image, sub, desc, extra) =>
    Object.assign({ id, name, cat: "drinks", group, unit: "each", price, tags: [], image: image ? I(image) : "", available: true, sub, desc }, extra || {});

  const drinks = [
    /* ---------------- WINES ---------------- */
    D("pergola", "Vinho Pérgola Suave", "wine", 19.90, "pergola",
      { en: "Sweet red table wine · Brazil", pt: "Vinho tinto de mesa suave · Brasil", es: "Vino tinto dulce · Brasil" },
      { en: "Brazil’s favourite sweet red from Rio Grande do Sul. Serve chilled.", pt: "O tinto suave queridinho do Brasil, da Serra Gaúcha. Sirva gelado.", es: "El tinto dulce favorito de Brasil, de Rio Grande do Sul. Servir frío." }),
    D("instinto-tinto", "Vinho Instinto Tinto", "wine", 22.00, "instinto-tinto",
      { en: "Portuguese red wine", pt: "Vinho tinto português", es: "Vino tinto portugués" },
      { en: "Full-bodied Portuguese red — perfect with grilled picanha.", pt: "Tinto português encorpado — perfeito com picanha na brasa.", es: "Tinto portugués con cuerpo — perfecto con picanha a la brasa." }),
    D("instinto-branco", "Vinho Instinto Branco", "wine", 22.00, "instinto-branco",
      { en: "Portuguese white wine", pt: "Vinho branco português", es: "Vino blanco portugués" },
      { en: "Fresh, fruity Portuguese white. Great with fish and chicken.", pt: "Branco português fresco e frutado. Ótimo com peixe e frango.", es: "Blanco portugués fresco y afrutado. Ideal con pescado y pollo." }),
    D("sanguedeboi", "Vinho Sangue de Boi", "wine", 37.50, "sanguedeboi",
      { en: "Sweet red wine · Brazil", pt: "Vinho tinto suave · Brasil", es: "Vino tinto dulce · Brasil" },
      { en: "A Brazilian classic sweet red, loved at every family gathering.", pt: "Clássico tinto suave brasileiro, presença garantida nas festas de família.", es: "Clásico tinto dulce brasileño, imprescindible en reuniones familiares." }),
    D("jp", "Vinho Tinto JP Azeitão", "wine", 11.99, "jp",
      { en: "Portuguese red · Syrah, Castelão, Aragonez", pt: "Tinto português · Syrah, Castelão, Aragonez", es: "Tinto portugués · Syrah, Castelão, Aragonez" },
      { en: "Smooth, easy-drinking Portuguese red from Bacalhôa. Great value.", pt: "Tinto português da Bacalhôa, macio e fácil de beber. Ótimo custo-benefício.", es: "Tinto portugués de Bacalhôa, suave y fácil de beber. Gran relación calidad-precio." }),
    D("jurupinga", "Jurupinga", "wine", 25.00, "jurupinga",
      { en: "Brazilian fortified wine aperitif", pt: "Aperitivo de vinho com cachaça", es: "Aperitivo brasileño de vino" },
      { en: "Sweet blend of wine and cachaça. Serve ice-cold.", pt: "Doce, mistura de vinho e cachaça. Sirva bem gelada.", es: "Dulce mezcla de vino y cachaça. Servir muy fría." }),
    D("campo-largo", "Vinho Campo Largo Suave", "wine", 16.96, "campo-largo",
      { en: "Sweet red wine · Brazil", pt: "Vinho tinto suave · Serra Gaúcha", es: "Vino tinto dulce · Brasil" },
      { en: "Soft and fruity Brazilian sweet red from the Serra Gaúcha.", pt: "Tinto suave, macio e frutado, da Serra Gaúcha.", es: "Tinto dulce brasileño, suave y afrutado." }),
    D("casal-sangria", "Casal Garcia Sangria", "wine", 9.99, "casal-sangria",
      { en: "Red sangria · Portugal", pt: "Sangria tinta · Portugal", es: "Sangría tinta · Portugal" },
      { en: "Ready-to-serve red sangria with citrus notes. Just add ice.", pt: "Sangria tinta pronta, com notas cítricas. É só pôr gelo.", es: "Sangría tinta lista para servir, con notas cítricas. Solo añade hielo." }),
    D("casal-verde", "Casal Garcia Vinho Verde", "wine", 12.96, "casal-verde",
      { en: "Vinho Verde white · Portugal", pt: "Vinho Verde branco · Portugal", es: "Vinho Verde blanco · Portugal" },
      { en: "Light, slightly sparkling and refreshing — Portugal’s summer wine.", pt: "Leve, levemente frisante e refrescante — o vinho do verão português.", es: "Ligero, ligeramente espumoso y refrescante — el vino del verano portugués." }),

    /* ---------------- BEERS ---------------- */
    D("skol300", "Skol Pilsen Garrafa", "beer", 3.50, "skol300",
      { en: "Brazilian pilsner · 300 ml bottle", pt: "Garrafa 300 ml", es: "Pilsner brasileña · botella 300 ml" },
      { en: "Light and super refreshing — Brazil’s best-selling beer.", pt: "Leve e refrescante — a cerveja que desce redondo.", es: "Ligera y muy refrescante — la cerveza más vendida de Brasil." }),
    D("superbock", "Super Bock", "beer", 2.50, "superbock",
      { en: "Portuguese lager · bottle", pt: "Cerveja portuguesa · garrafa", es: "Lager portuguesa · botella" },
      { en: "Portugal’s iconic lager. Crisp and balanced.", pt: "A cerveja mais icónica de Portugal. Equilibrada e refrescante.", es: "La lager icónica de Portugal. Equilibrada y refrescante." }),
    D("caracu", "Cerveja Preta Caracu Lata", "beer", 3.50, "caracu",
      { en: "Brazilian dark stout · 350 ml can", pt: "Cerveja escura · lata 350 ml", es: "Cerveza negra brasileña · lata 350 ml" },
      { en: "Rich, slightly sweet Brazilian dark beer.", pt: "Cerveja escura encorpada e levemente adocicada.", es: "Cerveza negra brasileña, intensa y ligeramente dulce." }),
    D("sagres", "Cerveja Sagres", "beer", 2.50, "sagres",
      { en: "Portuguese lager · 330 ml", pt: "Cerveja portuguesa · 330 ml", es: "Lager portuguesa · 330 ml" },
      { en: "Classic Portuguese lager, clean and refreshing.", pt: "Clássica cerveja portuguesa, leve e refrescante.", es: "Clásica lager portuguesa, limpia y refrescante." }),
    D("skol-lata", "Skol Pilsen Lata", "beer", 3.50, "skol-lata",
      { en: "Brazilian pilsner · 350 ml can", pt: "Lata 350 ml", es: "Pilsner brasileña · lata 350 ml" },
      { en: "The Brazilian churrasco favourite, in a can.", pt: "A preferida do churrasco, em lata.", es: "La favorita del churrasco brasileño, en lata." }),
    D("corona", "Corona Extra", "beer", 2.50, "corona",
      { en: "Mexican lager · bottle", pt: "Cerveja mexicana · garrafa", es: "Cerveza mexicana · botella" },
      { en: "Light Mexican lager — best with a slice of lime.", pt: "Cerveja mexicana leve — melhor com uma rodela de limão.", es: "Lager mexicana ligera — mejor con una rodaja de lima." }),
    D("heineken", "Heineken", "beer", 2.50, "heineken",
      { en: "Premium lager · bottle", pt: "Cerveja premium · garrafa", es: "Lager premium · botella" },
      { en: "The world-famous Dutch premium lager.", pt: "A famosa cerveja premium holandesa.", es: "La famosa lager premium holandesa." }),
    D("antarctica-lata", "Antarctica Boa Lata", "beer", 3.50, "antarctica-lata",
      { en: "Brazilian pilsner · 350 ml can", pt: "Lata 350 ml", es: "Pilsner brasileña · lata 350 ml" },
      { en: "The ‘Boa’ from Brazil — light and easy-drinking.", pt: "A Boa — leve e fácil de beber.", es: "La ‘Boa’ de Brasil — ligera y fácil de beber." }),
    D("antarctica-600", "Antarctica Original 600 ml", "beer", 6.99, "antarctica-600",
      { en: "Brazilian pilsner · 600 ml bottle", pt: "Garrafa 600 ml", es: "Pilsner brasileña · botella 600 ml" },
      { en: "The big bottle for sharing, just like a Brazilian boteco.", pt: "A garrafa grande para dividir, como no boteco.", es: "La botella grande para compartir, como en un bar brasileño." }),
    D("brahma-lata", "Brahma Chopp Lata", "beer", 3.50, "brahma-lata",
      { en: "Brazilian pilsner · 350 ml can", pt: "Lata 350 ml", es: "Pilsner brasileña · lata 350 ml" },
      { en: "Brazil’s classic draught-style lager since 1888.", pt: "A clássica Brahma Chopp, desde 1888.", es: "La clásica lager brasileña desde 1888." }),
    D("brahma-duplo-lata", "Brahma Duplo Malte Lata", "beer", 3.50, "brahma-duplo-lata",
      { en: "Pure malt beer · 350 ml can", pt: "Puro malte · lata 350 ml", es: "Cerveza pura malta · lata 350 ml" },
      { en: "Two malts for more flavour, still super refreshing.", pt: "Dois maltes: mais sabor e muito refrescante.", es: "Dos maltas: más sabor y muy refrescante." }),
    D("original-300", "Cerveja Original 300 ml", "beer", 3.50, "original-300",
      { en: "Brazilian pilsner · 300 ml bottle", pt: "Garrafa 300 ml", es: "Pilsner brasileña · botella 300 ml" },
      { en: "Smooth and full-flavoured Brazilian classic.", pt: "Clássico brasileiro, encorpado e saboroso.", es: "Clásico brasileño, suave y con sabor." }),
    D("brahma-300", "Brahma Chopp Garrafa", "beer", 3.50, "brahma-300",
      { en: "Brazilian pilsner · 300 ml bottle", pt: "Garrafa 300 ml", es: "Pilsner brasileña · botella 300 ml" },
      { en: "The Brahma you know, in the classic little bottle.", pt: "A Brahma de sempre, na garrafinha.", es: "La Brahma de siempre, en botellín." }),
    D("brahma-duplo-300", "Brahma Duplo Malte Garrafa", "beer", 3.50, "brahma-duplo-300",
      { en: "Pure malt beer · 300 ml bottle", pt: "Puro malte · garrafa 300 ml", es: "Cerveza pura malta · botella 300 ml" },
      { en: "Pure malt with balanced flavour.", pt: "Puro malte com sabor equilibrado.", es: "Pura malta con sabor equilibrado." }),
    D("malzbier", "Brahma Malzbier Lata", "beer", 3.99, "malzbier",
      { en: "Sweet dark malt beer · can", pt: "Cerveja escura tipo Malzbier · lata", es: "Cerveza negra dulce tipo Malzbier · lata" },
      { en: "Dark, sweet and creamy — a Brazilian favourite.", pt: "Escura, adocicada e cremosa.", es: "Negra, dulce y cremosa — favorita en Brasil." }),

    /* ---------------- CACHAÇA ---------------- */
    D("boazinha", "Cachaça Boazinha", "cachaca", 39.99, "boazinha",
      { en: "Artisanal cachaça · Salinas MG · 700 ml", pt: "Cachaça de alambique · Salinas MG · 700 ml", es: "Cachaça artesanal · Salinas MG · 700 ml" },
      { en: "One of Brazil’s most prized artisanal cachaças, aged in wood.", pt: "Uma das cachaças de alambique mais premiadas do Brasil, envelhecida em madeira.", es: "Una de las cachaças artesanales más premiadas de Brasil, envejecida en madera." }),
    D("pitu", "Cachaça Pitú", "cachaca", 35.00, "pitu",
      { en: "Brazilian cane spirit", pt: "Aguardente de cana", es: "Aguardiente de caña brasileño" },
      { en: "The classic from Pernambuco — perfect for caipirinha.", pt: "A clássica de Pernambuco — perfeita para caipirinha.", es: "La clásica de Pernambuco — perfecta para caipiriña." }),
    D("ypioca-reserva", "Cachaça Ypióca Reserva", "cachaca", 35.00, "ypioca-reserva",
      { en: "Oak-aged cachaça", pt: "Envelhecida em carvalho", es: "Cachaça envejecida en roble" },
      { en: "Smooth oak-aged cachaça in its iconic straw-wrapped bottle.", pt: "Envelhecida em carvalho, na icônica garrafa empalhada.", es: "Envejecida en roble, en su icónica botella de paja." }),
    D("oncinha", "Aguardente Oncinha", "cachaca", 17.99, "oncinha",
      { en: "Brazilian cane spirit", pt: "Aguardente de cana", es: "Aguardiente de caña brasileño" },
      { en: "Traditional sugar-cane spirit, great for caipirinha.", pt: "Aguardente tradicional, ótima para caipirinha.", es: "Aguardiente tradicional, ideal para caipiriña." }),
    D("ypioca-ouro", "Aguardente Ypióca Ouro", "cachaca", 29.86, "ypioca-ouro",
      { en: "Golden aged cachaça", pt: "Cachaça ouro armazenada", es: "Cachaça dorada envejecida" },
      { en: "Golden, smooth and aromatic — sip it or mix it.", pt: "Dourada, suave e aromática — pura ou em drinks.", es: "Dorada, suave y aromática — sola o en cócteles." }),
    D("cachaca51", "Cachaça 51", "cachaca", 35.00, "cachaca51",
      { en: "Brazil’s best-known cachaça", pt: "Uma boa ideia", es: "La cachaça más conocida de Brasil" },
      { en: "The essential cachaça for a proper caipirinha.", pt: "A cachaça essencial para uma boa caipirinha.", es: "La cachaça esencial para una buena caipiriña." }),

    /* ---------------- LIQUEURS & SPIRITS ---------------- */
    D("jurubeba", "Jurubeba Leão do Norte", "spirits", 15.99, "jurubeba",
      { en: "Brazilian herbal wine aperitif", pt: "Vinho composto com jurubeba", es: "Aperitivo brasileño de hierbas" },
      { en: "Traditional bittersweet aperitif from Bahia, since 1920.", pt: "Aperitivo tradicional da Bahia, desde 1920.", es: "Aperitivo agridulce tradicional de Bahía, desde 1920." }),
    D("beirao", "Licor Beirão", "spirits", 21.99, "beirao",
      { en: "Portuguese liqueur", pt: "Licor português", es: "Licor portugués" },
      { en: "Portugal’s favourite liqueur — herbs, spices and a smooth finish.", pt: "O licor de Portugal — ervas, especiarias e final suave.", es: "El licor favorito de Portugal — hierbas, especias y final suave." }),
    D("macieira", "Macieira Cream Five Star", "spirits", 34.99, "macieira",
      { en: "Portuguese cream liqueur · 70 cl", pt: "Licor cremoso português · 70 cl", es: "Licor de crema portugués · 70 cl" },
      { en: "Smooth, creamy liqueur made with Macieira brandy. Serve over ice.", pt: "Licor cremoso e suave feito com brandy Macieira. Sirva com gelo.", es: "Licor cremoso y suave hecho con brandy Macieira. Servir con hielo." }),
    D("paratudo", "Paratudo Raízes Amargas", "spirits", 19.99, "paratudo",
      { en: "Brazilian bitter aperitif", pt: "Aperitivo de raízes amargas", es: "Aperitivo amargo brasileño" },
      { en: "Traditional Brazilian bitter made from roots and herbs.", pt: "Tradicional aperitivo amargo de raízes e ervas.", es: "Aperitivo amargo tradicional de raíces y hierbas." }),
    D("oldparr", "Grand Old Parr 12 Anos", "spirits", 60.00, "oldparr",
      { en: "Blended Scotch whisky · 12 years", pt: "Whisky escocês · 12 anos", es: "Whisky escocés · 12 años" },
      { en: "Rich, smooth 12-year-old Scotch — a Brazilian favourite.", pt: "Whisky 12 anos encorpado e suave — queridinho dos brasileiros.", es: "Whisky de 12 años, intenso y suave — favorito en Brasil." }),
    D("catuaba", "Catuaba Selvagem", "spirits", 19.99, "catuaba",
      { en: "Brazilian herbal wine aperitif", pt: "Vinho composto de catuaba", es: "Aperitivo brasileño de hierbas" },
      { en: "Sweet Brazilian aperitif with catuaba and herbs. Serve cold.", pt: "Aperitivo doce com catuaba e ervas. Sirva gelado.", es: "Aperitivo dulce con catuaba y hierbas. Servir frío." })
  ];

  // Sort each group by price (cheapest first), then name
  const order = window.DRINK_GROUPS.map(g => g.id);
  drinks.sort((a, b) => order.indexOf(a.group) - order.indexOf(b.group) || a.price - b.price || a.name.localeCompare(b.name));
  drinks.forEach(d => { d.tags = (d.tags || []).concat(["adult"]); });
  window.PRODUCTS.push(...drinks);
  if (!window.CATEGORIES.includes("drinks")) window.CATEGORIES.push("drinks");
})();
