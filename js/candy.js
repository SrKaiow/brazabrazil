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
  G("goiabada-val-g", "Goiabada Val", "brasil",
    { en: "Guava paste", pt: "Goiabada", es: "Dulce de guayaba" },
    { en: "Sweet guava paste — with cheese it’s a Romeu e Julieta.", pt: "Goiabada — com queijo vira Romeu e Julieta.", es: "Dulce de guayaba — con queso, un clásico." },
    [["goiabada-val", "Pote · 250 g", 2.50, "goiabada-val"], ["val-cascao", "Cascão · 400 g", 2.99, "val-cascao"]], { tags: ["gf", "vegan"] });
  G("goiabada-reserva", "Goiabada Cascão Reserva de Minas", "brasil",
    { en: "Farmhouse guava paste with peel", pt: "Goiabada cascão caseira", es: "Dulce de guayaba casero" },
    { en: "Rustic, chunky guava paste straight from Minas Gerais.", pt: "Goiabada cascão rústica, direto de Minas.", es: "Dulce de guayaba rústico de Minas Gerais." },
    [["reserva-caseira", "Caseira · 500 g", 3.99, "reserva-caseira"], ["reserva-colher", "De colher · vidro 650 g", 7.50, "reserva-colher"]], { tags: ["gf"] });
  S("figo-calda", "Figo em Calda Bom Princípio · 600 g", "brasil", 7.99, "figo-calda",
    { en: "Figs in syrup", pt: "Figo em calda", es: "Higos en almíbar" },
    { en: "Whole green figs in syrup — a traditional Brazilian dessert.", pt: "Figos inteiros em calda — sobremesa tradicional.", es: "Higos enteros en almíbar." }, { tags: ["gf", "vegan"] });
  G("doce-leite", "Doce de Leite", "brasil",
    { en: "Milk caramel spread (dulce de leche)", pt: "Doce de leite cremoso", es: "Dulce de leche" },
    { en: "Creamy doce de leite — on toast, in cakes or straight from the spoon.", pt: "Doce de leite cremoso — no pão, no bolo ou de colher.", es: "Dulce de leche cremoso." },
    [["dl-ipanema", "Ipanema", 4.99, "dl-ipanema"], ["dl-uai", "Uai Delícias · 300 g", 6.75, "dl-uai"], ["dl-gaucho", "Don Gaucho", 7.99, "dl-gaucho"]], { tags: ["gf"] });
  S("doce-amendoim", "Doce de Amendoim DaColônia · 120 g", "brasil", 1.50, "doce-amendoim",
    { en: "Peanut fudge bar", pt: "Doce de amendoim caseiro", es: "Dulce de cacahuete" },
    { en: "Homestyle peanut sweet bar.", pt: "Doce de amendoim tipo caseiro.", es: "Dulce de cacahuete casero." }, { tags: ["gf"] });
  S("doce-abobora-coco", "Doce de Abóbora com Coco Duas Irmãs · 400 g", "brasil", 7.50, "doce-abobora-coco",
    { en: "Pumpkin & coconut sweet", pt: "Doce de abóbora cremoso com coco", es: "Dulce de calabaza con coco" },
    { en: "Creamy pumpkin and coconut — a grandma’s classic.", pt: "Cremoso, de abóbora com coco — clássico da vó.", es: "Dulce cremoso de calabaza." }, { tags: ["gf"] });
  G("goiabada-predilecta", "Goiabada Predilecta", "brasil",
    { en: "Guava paste", pt: "Goiabada", es: "Dulce de guayaba" },
    { en: "Sweet guava paste — try it with cheese for a ‘Romeu e Julieta’.", pt: "Goiabada de verdade — com queijo vira Romeu e Julieta.", es: "Dulce de guayaba — con queso es el clásico ‘Romeu e Julieta’." },
    [["goiabada", "Bloco · 30 g", 0.80, "goiabada"], ["goiabada-cascao", "Cascão · 350 g", 2.99, "goiabada-cascao"], ["goiabada-cremosa", "Cremosa · vidro 230 g", 2.99, "goiabada-cremosa"], ["predilecta-600", "Lata · 600 g", 4.50, "predilecta-600"]], { tags: ["gf", "vegan"] });
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
  G("panetone-bauducco", "Panettone Bauducco", "chocolates",
    { en: "Brazilian panettone", pt: "Panetone", es: "Panettone" },
    { en: "Bauducco’s famous naturally fermented panettone — classic with fruits or the chocolate Chocottone with truffle filling.", pt: "O famoso panetone Bauducco de fermentação natural — tradicional com frutas ou o Chocottone recheado sabor trufa.", es: "El famoso panettone Bauducco — clásico con frutas o Chocottone relleno de trufa." },
    [["panettone", "Tradicional com frutas · 400 g", 9.99, "panettone"], ["chocottone", "Chocottone recheio trufa · 450 g", 9.99, "chocottone"]]);

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

  /* ---------- batch 4 ---------- */
  G("bombom", "Bombom", "chocolates",
    { en: "Brazilian chocolate bonbon", pt: "Bombom unidade", es: "Bombón brasileño" },
    { en: "Brazil’s favourite bonbons — pick yours.", pt: "Os bombons preferidos do Brasil — escolha o seu.", es: "Los bombones favoritos de Brasil — elige el tuyo." },
    [["ouro-branco", "Ouro Branco Lacta", 1.20, "ouro-branco"], ["sonho-valsa", "Sonho de Valsa Lacta", 1.20, "sonho-valsa"], ["serenata", "Serenata de Amor Garoto", 1.20, "serenata"]]);
  G("caixa-bombons", "Caixa de Bombons", "chocolates",
    { en: "Assorted chocolates gift box", pt: "Caixa de bombons sortidos", es: "Caja de bombones surtidos" },
    { en: "The classic Brazilian box of bombons — perfect as a gift.", pt: "A clássica caixa de bombons — perfeita para presentear.", es: "La clásica caja de bombones brasileña — ideal para regalar." },
    [["lacta-favoritos", "Lacta Favoritos · 250 g", 9.90, "lacta-favoritos"], ["bombom-garoto", "Garoto · 250 g", 9.98, "bombom-garoto"],
     ["especialidades", "Nestlé Especialidades", 11.99, "especialidades"], ["crocribe", "Garoto Crocribe", 11.99, "crocribe"]]);
  G("barra-recheada", "Barra Lacta Recheada · 98 g", "chocolates",
    { en: "Filled chocolate bar · 98 g", pt: "Chocolate recheado · 98 g", es: "Chocolate relleno · 98 g" },
    { en: "Your favourite bonbon, now as a big bar.", pt: "O seu bombom preferido em versão barra.", es: "Tu bombón favorito, en tableta." },
    [["barra-ouro-branco", "Ouro Branco", 3.99, "barra-ouro-branco"], ["barra-sonho-valsa", "Sonho de Valsa", 3.99, "barra-sonho-valsa"]]);
  G("baton", "Baton Garoto", "chocolates",
    { en: "Chocolate stick", pt: "Chocolate em bastão", es: "Barrita de chocolate" },
    { en: "The classic Baton — a Brazilian childhood favourite.", pt: "O clássico Baton — sabor de infância.", es: "El clásico Baton — un favorito de la infancia." },
    [["baton-black", "Black", 1.20, "baton-black"], ["baton-branco", "Branco", 1.20, "baton-branco"]]);
  S("surpresa", "Chocolate Surpresa Nestlé", "chocolates", 1.50, "surpresa",
    { en: "Milk chocolate · 20 g", pt: "Chocolate ao leite · 20 g", es: "Chocolate con leche · 20 g" },
    { en: "The return of a Brazilian classic, with Brazilian animals on the pack.", pt: "A volta de um clássico, com os animais brasileiros na embalagem.", es: "El regreso de un clásico brasileño." });
  S("bolo-pote", "Bolo de Pote", "brasil", 3.99, "bolo-pote",
    { en: "Cake in a jar", pt: "Bolo de pote", es: "Pastel en vaso" },
    { en: "Layers of soft cake and creamy filling — eat it with a spoon.", pt: "Camadas de bolo fofinho e recheio cremoso — é só pegar a colher.", es: "Capas de bizcocho y relleno cremoso — a cucharadas." });
  S("beliscao", "Beliscão de Goiabada", "brasil", 2.50, "beliscao",
    { en: "Guava-filled butter biscuits", pt: "Biscoito amanteigado com goiabada", es: "Galletas rellenas de guayaba" },
    { en: "Buttery biscuits pinched around a piece of guava paste.", pt: "Biscoitinhos amanteigados com goiabada no meio.", es: "Galletas de mantequilla con un trocito de guayaba." });
  G("bananinha", "Bananinha", "brasil",
    { en: "Banana sweet", pt: "Doce de banana", es: "Dulce de plátano" },
    { en: "Made from real bananas — soft, sweet and naturally fruity.", pt: "Feita com banana de verdade — macia e docinha.", es: "Hecho con plátano de verdad — suave y dulce." },
    [["bananinha-paraibuna", "Paraibuna · unidade 36 g", 1.50, "bananinha-paraibuna"], ["bananinha-monica", "Turma da Mônica mini · 70 g", 3.69, "bananinha-monica"],
     ["bananinha-13", "Pacote 13 unidades", 6.50, "bananinha-paraibuna"], ["bananinha-200g", "Guimarães cristalizada · 200 g", 6.99, "bananinha-200g"]], { tags: ["gf", "vegan"] });
  G("sete-belo", "Bala 7 Belo", "balas",
    { en: "Chewy candy", pt: "Bala mastigável", es: "Caramelo masticable" },
    { en: "The chewy candy of every Brazilian childhood.", pt: "A bala de toda infância brasileira.", es: "El caramelo masticable de la infancia brasileña." },
    [["sete-belo-pacote", "Framboesa · pacote", 2.99, "sete-belo-pacote"], ["sete-belo-framboesa", "Framboesa · 90 g", 3.50, "sete-belo-framboesa"], ["sete-belo-iogurte", "Iogurte · 90 g", 3.50, "sete-belo-iogurte"]]);
  S("bala-yogurte", "Bala de Yogurte 100 Dori", "balas", 2.59, "bala-yogurte",
    { en: "Strawberry yoghurt chewy candy", pt: "Bala mastigável de iogurte", es: "Caramelo masticable de yogur" },
    { en: "Creamy strawberry-yoghurt chews.", pt: "Bala cremosa sabor iogurte de morango.", es: "Caramelos cremosos de yogur de fresa." });
  S("bolete", "Bala Chicle Bolete 100 g", "balas", 2.99, "bolete",
    { en: "Candy with bubble-gum centre", pt: "Bala recheada com chiclete", es: "Caramelo con chicle" },
    { en: "Hard candy with a bubble-gum centre.", pt: "Bala com chiclete dentro.", es: "Caramelo con centro de chicle." });
  S("bala-banana", "Bala de Banana DaColônia", "balas", 2.99, "bala-banana",
    { en: "Banana candy · 160 g", pt: "Bala de banana · 160 g", es: "Caramelo de plátano · 160 g" },
    { en: "Real-fruit banana candies.", pt: "Balas feitas com banana de verdade.", es: "Caramelos de plátano de verdad." }, { tags: ["gf", "vegan"] });

  /* ---------- batch 5 ---------- */
  S("bala-canela", "Bala de Canela Florestal", "balas", 0.20, "bala-canela",
    { en: "Cinnamon hard candy · unit", pt: "Bala de canela · unidade", es: "Caramelo de canela · unidad" },
    { en: "The classic cinnamon candy.", pt: "A clássica bala de canela.", es: "El clásico caramelo de canela." });
  S("algodao-doce", "Bala Algodão Doce Junco", "balas", 1.80, "algodao-doce",
    { en: "Cotton-candy flavour melt-in-the-mouth sweets", pt: "Bala de aniversário sabor algodão doce", es: "Caramelos sabor algodón de azúcar" },
    { en: "The melt-in-your-mouth party sweets of every Brazilian birthday.", pt: "As balinhas que derretem na boca, de toda festa de aniversário.", es: "Los caramelos que se deshacen en la boca de todo cumpleaños." });
  S("bala-coco", "Bala de Coco Guimarães 100 g", "brasil", 2.99, "bala-coco",
    { en: "Melt-in-the-mouth coconut sweets", pt: "Bala de coco receita da vovó", es: "Caramelos de coco" },
    { en: "Grandma’s recipe — soft coconut sweets that melt in your mouth.", pt: "Receita da vovó — bala de coco que derrete na boca.", es: "Receta de la abuela — caramelos de coco que se deshacen." }, { tags: ["gf"] });
  G("amendoas", "Amêndoas de Chocolate", "chocolates",
    { en: "Chocolate almonds · Portuguese football clubs", pt: "Amêndoas de chocolate · clubes portugueses", es: "Almendras de chocolate · clubes portugueses" },
    { en: "Chocolate-coated almonds in your club’s colours — the perfect gift.", pt: "Amêndoas cobertas de chocolate nas cores do seu clube — o presente perfeito.", es: "Almendras con chocolate con los colores de tu club." },
    [["amendoas-benfica", "Benfica", 4.99, "amendoas-benfica"], ["amendoas-porto", "Porto", 4.99, "amendoas-porto"],
     ["amendoas-sporting", "Sporting", 4.99, "amendoas-sporting"], ["amendoas-portugal", "Portugal", 4.99, "amendoas-portugal"]], { tags: ["portuguese"] });

  G("filipinos", "Filipinos Artiach", "chocolates",
    { en: "Chocolate-coated biscuit rings", pt: "Rosquinhas cobertas de chocolate", es: "Galletas bañadas en chocolate" },
    { en: "Crunchy biscuit rings coated in real chocolate.", pt: "Rosquinhas crocantes cobertas de chocolate.", es: "Rosquillas crujientes bañadas en chocolate." },
    [["filipinos-leite", "Chocolate ao leite", 2.50, "filipinos-leite"], ["filipinos-branco", "Chocolate branco", 2.50, "filipinos-branco"]]);
  /* ---------- SNACKS ---------- */
  S("fandangos", "Fandangos Elma Chips", "snacks", 2.50, "fandangos",
    { en: "Baked corn snack", pt: "Salgadinho de milho assado", es: "Aperitivo de maíz" },
    { en: "The classic Brazilian corn snack.", pt: "O clássico salgadinho de milho.", es: "El clásico aperitivo de maíz." });
  S("gulozitos", "Gulozitos", "snacks", 1.99, "gulozitos",
    { en: "Portuguese corn puffs", pt: "Salgadinho de milho", "pt-PT": "Aperitivo de milho", es: "Aperitivo de maíz" },
    { en: "The Portuguese childhood snack — crunchy corn puffs.", pt: "O salgadinho de infância português — crocante.", es: "El aperitivo de la infancia portuguesa." }, { tags: ["portuguese"] });
  S("wotsits", "Wotsits That’s Nuts", "snacks", 2.99, "wotsits",
    { en: "Cheesy coated peanuts · 160 g", pt: "Amendoim com cobertura de queijo · 160 g", es: "Cacahuetes recubiertos de queso · 160 g" },
    { en: "Crunchy peanuts with a really cheesy coating.", pt: "Amendoins crocantes com cobertura sabor queijo.", es: "Cacahuetes crujientes con cobertura de queso." });

  const byId = Object.fromEntries(out.map(p => [p.id, p]));
  out.forEach(p => { if (p.isGroup) { const ps = p.variants.map(v => byId[v].price).filter(x => x > 0); p.price = ps.length ? Math.min(...ps) : 0; } });
  const order = window.GROUPS.candy.map(g => g.id);
  out.sort((a, b) => order.indexOf(a.group) - order.indexOf(b.group) || a.price - b.price || a.name.localeCompare(b.name));
  window.PRODUCTS.push(...out);
  if (!window.CATEGORIES.includes("candy")) window.CATEGORIES.push("candy");
  const ORDER = ["all", "beef", "pork", "deli", "frozen", "candy", "drinks"];
  window.CATEGORIES.sort((a, b) => (ORDER.indexOf(a) + 99) % 99 - (ORDER.indexOf(b) + 99) % 99);
})();
