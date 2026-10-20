/* ============================================================
   BRAZABRAZIL — SWEETS & SNACKS (real shop prices)
   G(...) = one card with options · S(...) = single product
   ============================================================ */

window.GROUPS = window.GROUPS || {};
window.GROUPS.candy = [
  { id: "brasil",     label: { en: "Brazilian sweets",      "pt-BR": "Doces brasileiros",      "pt-PT": "Doces brasileiros",      es: "Dulces brasileños" } },
  { id: "chocolates", label: { en: "Chocolates",            "pt-BR": "Chocolates",             "pt-PT": "Chocolates",             es: "Chocolates" } },
  { id: "balas",      label: { en: "Gum, mints & lollipops","pt-BR": "Chicletes, balas & pirulitos","pt-PT": "Pastilhas, rebuçados & chupas", es: "Chicles, caramelos y piruletas" } },
  { id: "snacks",     label: { en: "Snacks",                "pt-BR": "Salgadinhos",            "pt-PT": "Aperitivos",             es: "Aperitivos" } }
];

(function () {
  const I = f => f ? "assets/products/candy/" + f + ".webp" : "";
  const out = [];
  const S = (id, name, group, price, image, sub, desc, extra) =>
    out.push(Object.assign({ id, name, cat: "candy", group, unit: "each", price, tags: [], image: I(image), available: true, sub, desc }, extra || {}));
  const G = (id, name, group, sub, desc, variants, extra) => {
    const ids = [], first = (variants.find(v => v[3]) || [])[3] || "";
    variants.forEach(([vid, label, price, image]) => {
      ids.push(vid);
      out.push({ id: vid, name: name + " · " + label, optionLabel: label, parent: id, hidden: true, cat: "candy", group,
                 unit: "each", price, tags: [], image: I(image || first), available: true, sub, desc });
    });
    out.push(Object.assign({ id, name, cat: "candy", group, unit: "each", isGroup: true, variants: ids, tags: [],
                 image: I(first), available: true, sub, desc }, extra || {}));
  };

  /* ---------- BRAZILIAN SWEETS ---------- */
  G("mariola", "Mariola", "brasil",
    { en: "Banana sweet", pt: "Doce de banana", es: "Dulce de plátano" },
    { en: "Traditional Brazilian banana sweet — chewy and naturally fruity.", pt: "O tradicional doce de banana — macio e com sabor de fruta.", es: "Tradicional dulce brasileño de plátano — tierno y afrutado." },
    [["mariola-un", "Unidade", 0.20, "mariola-un"], ["mariola-colonia", "DaColônia · 300 g", 3.36, "mariola-colonia"]], { tags: ["gf"] });
  G("pacoca", "Paçoquita", "brasil",
    { en: "Brazilian peanut sweet", pt: "Paçoca de amendoim", es: "Dulce de cacahuete" },
    { en: "Crumbly peanut sweet — a Brazilian childhood favourite.", pt: "Paçoca de amendoim que derrete na boca — sabor de infância.", es: "Dulce de cacahuete que se deshace — un clásico de la infancia en Brasil." },
    [["pacoca-un", "Unidade", 0.60, "pacoca-un"], ["pacoca-zero", "Zero açúcar · caixa", 5.99, "pacoca-zero"]], { tags: ["gf"] });
  G("goiabada-predilecta", "Goiabada Predilecta", "brasil",
    { en: "Guava paste", pt: "Goiabada", es: "Dulce de guayaba" },
    { en: "Sweet guava paste — try it with cheese for a ‘Romeu e Julieta’.", pt: "Goiabada de verdade — com queijo vira Romeu e Julieta.", es: "Dulce de guayaba — con queso es el clásico ‘Romeu e Julieta’." },
    [["goiabada", "Bloco · 30 g", 0.80, "goiabada"], ["goiabada-cascao", "Cascão · 350 g", 2.99, "goiabada-cascao"], ["goiabada-cremosa", "Cremosa · vidro 230 g", 2.99, "goiabada-cremosa"]], { tags: ["gf", "vegan"] });
  S("pao-de-mel", "Pão de Mel", "brasil", 2.50, "pao-de-mel",
    { en: "Honey cake with chocolate coating", pt: "Pão de mel com cobertura de chocolate", es: "Pastel de miel con chocolate" },
    { en: "Spiced honey cake filled with doce de leite and coated in chocolate.", pt: "Pão de mel recheado com doce de leite e coberto de chocolate.", es: "Bizcocho de miel relleno de dulce de leche y cubierto de chocolate." });
  G("fondant", "Fondant de Leite DaColônia", "brasil",
    { en: "Milk fudge squares · 160 g", pt: "Doce de leite em tabletes · 160 g", es: "Dulce de leche en cuadraditos · 160 g" },
    { en: "Little squares of creamy milk fudge — impossible to eat just one.", pt: "Quadradinhos de doce de leite — impossível comer um só.", es: "Cuadraditos de dulce de leche — imposible comer solo uno." },
    [["fondant-trad", "Tradicional", 2.50, "fondant-trad"], ["fondant-coco", "Com coco", 2.50, "fondant-coco"], ["rapadurinha", "Com chocolate", 2.99, "rapadurinha"]], { tags: ["gf"] });
  S("maria-mole", "Maria Mole Fini", "brasil", 3.50, "maria-mole",
    { en: "Coconut marshmallows · 80 g", pt: "Marshmallow sabor maria-mole · 80 g", es: "Malvaviscos de coco · 80 g" },
    { en: "Soft marshmallow with grated coconut — a nostalgic Brazilian treat.", pt: "Maria-mole fofinha com coco ralado — doce de infância.", es: "Malvavisco suave con coco rallado — un dulce nostálgico." });

  /* ---------- CHOCOLATES ---------- */
  G("tortuguita", "Tortuguita Arcor", "chocolates",
    { en: "Filled chocolate turtle", pt: "Chocolate recheado", es: "Chocolate relleno" },
    { en: "The little chocolate turtle every Brazilian kid loves.", pt: "A tartaruguinha de chocolate que toda criança adora.", es: "La tortuguita de chocolate que encanta a todos los niños." },
    [["tortuguita-brigadeiro", "Brigadeiro", 1.20, "tortuguita-brigadeiro"], ["tortuguita-branco", "Chocolate branco", 1.20, "tortuguita-branco"]]);
  S("prestigio", "Prestígio Nestlé", "chocolates", 1.50, "prestigio",
    { en: "Coconut chocolate bar · 33 g", pt: "Chocolate com coco · 33 g", es: "Chocolate con coco · 33 g" },
    { en: "Creamy coconut covered in milk chocolate — a Brazilian icon.", pt: "Recheio cremoso de coco coberto de chocolate — um clássico.", es: "Coco cremoso cubierto de chocolate — un icono brasileño." });
  S("mms", "M&M’s Chocolate", "chocolates", 1.50, "mms",
    { en: "Milk chocolate candies", pt: "Confeitos de chocolate", es: "Grageas de chocolate" },
    { en: "Colourful candy-coated milk chocolate.", pt: "Chocolate ao leite com cobertura colorida.", es: "Chocolate con leche con cobertura de colores." });
  S("especialidades", "Nestlé Especialidades", "chocolates", 11.99, "especialidades",
    { en: "Assorted chocolates gift box", pt: "Caixa de bombons sortidos", es: "Caja de bombones surtidos" },
    { en: "The classic Brazilian box of bombons — Prestígio, Alpino, Charge and more.", pt: "A clássica caixa de bombons — Prestígio, Alpino, Charge e mais.", es: "La clásica caja de bombones brasileña — Prestígio, Alpino, Charge y más." });

  /* ---------- GUM, MINTS & LOLLIPOPS ---------- */
  S("pastilha-hortela", "Pastilha Garoto Hortelã", "balas", 0.80, "pastilha-hortela",
    { en: "Mint pastilles", pt: "Pastilhas de hortelã", es: "Pastillas de menta" },
    { en: "The classic Garoto mint pastilles.", pt: "As clássicas pastilhas de hortelã da Garoto.", es: "Las clásicas pastillas de menta Garoto." });
  S("lollipop", "Lollipop", "balas", 1.00, "lollipop",
    { en: "Fruit lollipop", pt: "Pirulito de frutas", "pt-PT": "Chupa-chupa de fruta", es: "Piruleta de frutas" },
    { en: "Fruity lollipop — strawberry, cherry, orange and more.", pt: "Pirulito de frutas — morango, cereja, laranja e mais.", es: "Piruleta de frutas — fresa, cereza, naranja y más." });
  G("trident", "Trident", "balas",
    { en: "Sugar-free chewing gum · 8 g", pt: "Chiclete sem açúcar · 8 g", "pt-PT": "Pastilha elástica sem açúcar · 8 g", es: "Chicle sin azúcar · 8 g" },
    { en: "Long-lasting sugar-free gum — pick your flavour.", pt: "Chiclete sem açúcar de sabor duradouro — escolha o seu.", es: "Chicle sin azúcar de sabor duradero — elige tu sabor." },
    [["trident-canela", "Canela", 1.33, "trident-canela"], ["trident-frutas", "Frutas silvestres", 1.50, "trident-frutas"],
     ["trident-melancia", "Melancia", 1.50, "trident-melancia"], ["trident-menta", "Menta verde", 1.50, "trident-menta"],
     ["trident-senses", "Senses variados", 1.50, ""]]);

  /* ---------- batch 2 ---------- */
  S("docinhos", "Docinhos de Festa", "brasil", 2.20, "docinhos",
    { en: "Brazilian party sweets", pt: "Brigadeiro, beijinho e mais", es: "Dulces de fiesta brasileños" },
    { en: "Brigadeiro, beijinho and friends — the sweets of every Brazilian party.", pt: "Brigadeiro, beijinho e companhia — os docinhos de toda festa.", es: "Brigadeiro, beijinho y más — los dulces de toda fiesta brasileña." });
  S("doce-amendoim", "Doce de Amendoim Caseiro DaColônia", "brasil", 2.99, "doce-amendoim",
    { en: "Homemade-style peanut bar · 120 g", pt: "Doce de amendoim tipo caseiro · 120 g", es: "Dulce de cacahuete casero · 120 g" },
    { en: "Traditional peanut sweet with a homemade taste.", pt: "Doce de amendoim tradicional, com gostinho de caseiro.", es: "Dulce de cacahuete tradicional con sabor casero." }, { tags: ["gf"] });
  G("gomets", "Gomets Dori", "balas",
    { en: "Fruit gummies", pt: "Balas de goma", es: "Gominolas de frutas" },
    { en: "Soft sugar-coated fruit gummies.", pt: "Balas de goma macias, sabor frutas sortidas.", es: "Gominolas suaves de frutas surtidas." },
    [["gomets-gomas", "Gomas", 0.90, "gomets"], ["gomets-minhocas", "Minhocas", 1.50, "gomets-minhocas"]]);
  G("halls", "Halls", "balas",
    { en: "Hard candy", pt: "Drops Halls", "pt-PT": "Rebuçados Halls", es: "Caramelos Halls" },
    { en: "Refreshing Halls — choose your flavour.", pt: "Halls refrescante — escolha o sabor.", es: "Halls refrescante — elige tu sabor." },
    [["halls-extra", "Extra forte", 1.00, "halls-extra"], ["halls-melancia", "Melancia", 1.00, "halls-melancia"],
     ["halls-morango", "Morango", 1.00, "halls-morango"], ["halls-uva", "Uva verde", 1.00, "halls-uva"]]);
  G("kinder", "Kinder", "chocolates",
    { en: "Kinder chocolate", pt: "Chocolate Kinder", es: "Chocolate Kinder" },
    { en: "Milk chocolate with a creamy milky filling.", pt: "Chocolate ao leite com recheio cremoso de leite.", es: "Chocolate con leche con relleno cremoso." },
    [["kinder-choc", "Chocolate · barra 21 g", 0.50, "kinder-choc"], ["kinder-bueno", "Bueno", 1.50, "kinder-bueno"], ["kinder-bueno-white", "Bueno White", 1.50, "kinder-bueno-white"]]);
  G("lacta-bombom", "Bombom Lacta", "chocolates",
    { en: "Lacta chocolate bonbon", pt: "Bombom Lacta", es: "Bombón Lacta" },
    { en: "Brazil’s favourite bonbons.", pt: "Os bombons preferidos do Brasil.", es: "Los bombones favoritos de Brasil." },
    [["ouro-branco", "Ouro Branco", 1.20, "ouro-branco"], ["sonho-valsa", "Sonho de Valsa", 1.20, "sonho-valsa"]]);
  G("lacta-barra", "Chocolate Lacta", "chocolates",
    { en: "Lacta chocolate bar", pt: "Chocolate Lacta em barra", es: "Chocolate Lacta" },
    { en: "Creamy Brazilian milk chocolate.", pt: "Chocolate cremoso, o sabor do Brasil.", es: "Chocolate cremoso brasileño." },
    [["lacta-leite", "Ao leite", 1.20, "lacta-leite"], ["diamante-negro", "Diamante Negro", 1.20, "diamante-negro"]]);
  S("guarda-chuva", "Guarda-Chuva de Chocolate", "chocolates", 1.20, "guarda-chuva",
    { en: "Chocolate umbrella", pt: "Guarda-chuvinha de chocolate", es: "Paraguas de chocolate" },
    { en: "The little chocolate umbrella — pure childhood memories.", pt: "O guarda-chuvinha de chocolate — puro sabor de infância.", es: "El paragüitas de chocolate — puros recuerdos de infancia." });
  S("bis", "Bis Lacta", "chocolates", 3.60, "bis",
    { en: "Chocolate-coated wafers", pt: "Wafer coberto de chocolate", es: "Barquillos con chocolate" },
    { en: "Crispy wafers covered in chocolate — impossible to eat just one.", pt: "Wafer crocante coberto de chocolate — impossível comer um só.", es: "Barquillos crujientes con chocolate — imposible comer solo uno." });
  S("ferrero", "Ferrero Rocher · 16 un", "chocolates", 15.00, "ferrero",
    { en: "Hazelnut chocolates gift box · 16", pt: "Caixa com 16 bombons", es: "Caja de 16 bombones" },
    { en: "The perfect gift: crispy hazelnut chocolates.", pt: "O presente perfeito: bombons crocantes de avelã.", es: "El regalo perfecto: bombones crujientes de avellana." });

  /* ---------- batch 3 ---------- */
  S("doce-abobora", "Doce de Abóbora", "brasil", 0.99, "doce-abobora",
    { en: "Pumpkin sweet", pt: "Doce de abóbora em pedaço", es: "Dulce de calabaza" },
    { en: "Traditional Brazilian pumpkin sweet — soft and spiced.", pt: "Doce de abóbora tradicional — macio e perfumado.", es: "Dulce de calabaza tradicional brasileño." }, { tags: ["gf"] });
  S("cocada", "Cocada", "brasil", 2.99, "cocada",
    { en: "Coconut sweet", pt: "Cocada", es: "Cocada" },
    { en: "Chewy coconut sweet — a true taste of Brazil.", pt: "Cocada de coco — o sabor do Brasil.", es: "Dulce de coco — un sabor auténtico de Brasil." }, { tags: ["gf"] });
  S("pe-moleque", "Pé de Moleque DaColônia", "brasil", 2.99, "pe-moleque",
    { en: "Peanut brittle · 170 g", pt: "Pé de moleque · 170 g", es: "Dulce de cacahuete · 170 g" },
    { en: "Crunchy peanuts in caramelised sugar — a festa junina classic.", pt: "Amendoim crocante com açúcar caramelizado — clássico de festa junina.", es: "Cacahuetes crujientes con azúcar caramelizado." }, { tags: ["gf", "vegan"] });
  G("pe-moca", "Pé de Moça DaColônia", "brasil",
    { en: "Milk caramel with peanuts", pt: "Doce de leite com amendoim", es: "Dulce de leche con cacahuetes" },
    { en: "Soft milk caramel packed with peanuts.", pt: "Doce de leite macio com amendoim.", es: "Dulce de leche suave con cacahuetes." },
    [["pe-moca-tab", "Tablete · 130 g", 2.99, "pe-moca-tab"], ["pe-moca-box", "Pote · 190 g", 4.99, "pe-moca-box"]], { tags: ["gf"] });
  G("pacoca-dacolonia", "Paçoca DaColônia", "brasil",
    { en: "Brazilian peanut sweet", pt: "Paçoca de amendoim", es: "Dulce de cacahuete" },
    { en: "Traditional crumbly peanut sweet.", pt: "Paçoca tradicional de amendoim.", es: "Dulce de cacahuete tradicional." },
    [["pacoca-rolha", "Rolha · pote 210 g", 4.50, "pacoca-rolha"], ["pacoca-ret", "Retangular · display", 5.99, "pacoca-ret"]], { tags: ["gf"] });
  G("dadinho-doces", "Dadinho", "brasil",
    { en: "Peanut sweets since 1954", pt: "Doces de amendoim desde 1954", es: "Dulces de cacahuete desde 1954" },
    { en: "The famous Dadinho peanut sweets.", pt: "Os famosos docinhos de amendoim Dadinho.", es: "Los famosos dulces de cacahuete Dadinho." },
    [["dadinho-sortidos", "Doces sortidos · 600 g", 4.99, "dadinho-sortidos"], ["dadinho-pacoca", "Paçoca quadrada · caixa 800 g", 10.80, "dadinho-pacoca"]], { tags: ["gf"] });
  S("chocomoca", "Chocomoca Pistache 25 g", "chocolates", 1.20, "chocomoca",
    { en: "Pistachio-filled chocolate (Dubai style)", pt: "Chocolate com recheio de pistache", es: "Chocolate relleno de pistacho" },
    { en: "Milk chocolate with crunchy pistachio filling — the Dubai chocolate trend.", pt: "Chocolate ao leite com recheio crocante de pistache — o famoso chocolate Dubai.", es: "Chocolate con relleno crujiente de pistacho — estilo Dubái." });
  S("chokito", "Chokito Nestlé 32 g", "chocolates", 1.50, "chokito",
    { en: "Caramel and crispy chocolate bar", pt: "Chocolate com caramelo e flocos crocantes", es: "Chocolate con caramelo crujiente" },
    { en: "Chewy caramel with crispy bits covered in chocolate.", pt: "Caramelo com flocos crocantes coberto de chocolate.", es: "Caramelo con trocitos crujientes cubierto de chocolate." });
  S("caribe", "Caribe Garoto", "chocolates", 2.20, "caribe",
    { en: "Banana & chocolate bar", pt: "Tablete de banana com chocolate", es: "Barrita de plátano y chocolate" },
    { en: "Banana filling covered in chocolate — a Garoto classic.", pt: "Recheio de banana coberto de chocolate — clássico da Garoto.", es: "Relleno de plátano cubierto de chocolate." });
  G("bubbaloo", "Bubbaloo", "balas",
    { en: "Filled bubble gum", pt: "Chiclete recheado", "pt-PT": "Pastilha elástica recheada", es: "Chicle relleno" },
    { en: "The bubble gum with a liquid centre.", pt: "O chiclete com recheio líquido.", es: "El chicle con centro líquido." },
    [["bubbaloo-sortido", "Sortido", 0.25, "bubbaloo"], ["bubbaloo-morango", "Morango", 0.25, "bubbaloo-morango"],
     ["bubbaloo-tutti", "Tutti-frutti", 0.25, "bubbaloo-tutti"], ["bubbaloo-uva", "Uva", 0.25, "bubbaloo-uva"]]);
  S("gorila", "Chiclete Gorila Sortido", "balas", 0.25, "gorila",
    { en: "Chewing gum · assorted", pt: "Chiclete sortido", "pt-PT": "Pastilha elástica sortida", es: "Chicle surtido" },
    { en: "The classic Gorila gum — menta, morango, melancia and more.", pt: "O clássico chiclete Gorila — menta, morango, melancia e mais.", es: "El clásico chicle Gorila — menta, fresa, sandía y más." });
  S("amendoim", "Amendoim Salgado DaColônia", "snacks", 2.99, "amendoim",
    { en: "Roasted salted peanuts · 450 g", pt: "Amendoim torrado salgado · 450 g", es: "Cacahuetes tostados salados · 450 g" },
    { en: "Roasted, not fried — perfect with a cold beer.", pt: "Torrado, não frito — perfeito com uma cerveja gelada.", es: "Tostados, no fritos — perfectos con una cerveza fría." }, { tags: ["gf", "vegan"] });

  /* ---------- SNACKS ---------- */
  S("wotsits", "Wotsits That’s Nuts", "snacks", 2.99, "wotsits",
    { en: "Cheesy coated peanuts · 160 g", pt: "Amendoim com cobertura de queijo · 160 g", es: "Cacahuetes recubiertos de queso · 160 g" },
    { en: "Crunchy peanuts with a really cheesy coating.", pt: "Amendoins crocantes com cobertura sabor queijo.", es: "Cacahuetes crujientes con cobertura de queso." });

  const byId = Object.fromEntries(out.map(p => [p.id, p]));
  out.forEach(p => { if (p.isGroup) p.price = Math.min(...p.variants.map(v => byId[v].price)); });
  const order = window.GROUPS.candy.map(g => g.id);
  out.sort((a, b) => order.indexOf(a.group) - order.indexOf(b.group) || a.price - b.price || a.name.localeCompare(b.name));
  window.PRODUCTS.push(...out);
  if (!window.CATEGORIES.includes("candy")) window.CATEGORIES.push("candy");
  const ORDER = ["all", "beef", "pork", "deli", "frozen", "candy", "drinks"];
  window.CATEGORIES.sort((a, b) => (ORDER.indexOf(a) + 99) % 99 - (ORDER.indexOf(b) + 99) % 99);
})();
