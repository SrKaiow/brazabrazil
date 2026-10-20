/* ============================================================
   BRAZABRAZIL — GROCERIES (real shop prices)
   ============================================================ */
window.GROUPS = window.GROUPS || {};
window.GROUPS.groceries = [
  { id: "laticinios", label: { en: "Cheese, milk & butter", "pt-BR": "Queijos, leite & manteiga", "pt-PT": "Queijos, leite & manteiga", es: "Quesos, leche y mantequilla" } },
  { id: "matinais", label: { en: "Breakfast, cereals & chocolate drinks", "pt-BR": "Café da manhã & achocolatados", "pt-PT": "Pequeno-almoço & achocolatados", es: "Desayuno y cacao" } },
  { id: "cafe", label: { en: "Coffee, tea & mate", "pt-BR": "Café, chás & chimarrão", "pt-PT": "Café, chás & chimarrão", es: "Café, té y mate" } },
  { id: "biscoitos", label: { en: "Biscuits & wafers", "pt-BR": "Biscoitos & bolachas", "pt-PT": "Bolachas & biscoitos", es: "Galletas y barquillos" } },
  { id: "massas", label: { en: "Pasta & instant noodles", "pt-BR": "Massas & miojo", "pt-PT": "Massas", es: "Pasta y fideos" } },
  { id: "bolos", label: { en: "Cake & cheese-bread mixes", "pt-BR": "Misturas para bolo & pão de queijo", "pt-PT": "Misturas para bolo & pão de queijo", es: "Mezclas para bizcocho y pan de queso" } },
  { id: "molhos", label: { en: "Sauces, chilli & seasonings", "pt-BR": "Molhos, pimentas & temperos", "pt-PT": "Molhos, piri-piri & temperos", es: "Salsas, picantes y condimentos" } },
  { id: "conservas", label: { en: "Portuguese tinned food", "pt-BR": "Conservas portuguesas", "pt-PT": "Conservas", es: "Conservas portuguesas" } },
  { id: "graos", label: { en: "Rice, beans, flours & farofa", "pt-BR": "Arroz, feijão, farinhas & farofas", "pt-PT": "Arroz, feijão, farinhas & farofas", es: "Arroz, frijoles, harinas y farofa" } },
  { id: "geral", label: { en: "Pantry, tins & jars", "pt-BR": "Mercearia, enlatados & temperos", "pt-PT": "Mercearia, enlatados & temperos", es: "Despensa y conservas" } }
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
    out.push(Object.assign({ id, name, cat: "groceries", group, unit: "each", price: Math.min(...variants.map(v => v[2]).filter(x => x > 0)), isGroup: true, variants: ids, tags: [],
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
  G("requeijao", "Requeijão Cremoso Mabiju", "laticinios",
    { en: "Brazilian cream cheese spread", pt: "Requeijão cremoso tradicional", es: "Queso crema brasileño" },
    { en: "The creamy requeijão Brazilians love on bread and in recipes.", pt: "O requeijão cremoso para o pão e as receitas.", es: "El requeijão cremoso para el pan y recetas." },
    [["requeijao-mabiju", "220 g", 3.49, "requeijao-mabiju"], ["requeijao-500", "500 g", 6.99, "requeijao-500"]]);
  G("tang", "Refresco em Pó Tang · 18 g", "geral",
    { en: "Powdered drink mix · makes 1 L", pt: "Refresco em pó · faz 1 litro", es: "Refresco en polvo · rinde 1 L" },
    { en: "The classic Brazilian powdered juice — just add water. Lots of flavours.", pt: "O clássico suco em pó — é só misturar com água. Vários sabores.", es: "El clásico refresco en polvo — solo añade agua." },
    [["tang-abacaxi", "Abacaxi", 1.50, "tang-abacaxi"], ["tang-goiaba", "Goiaba", 1.50, "tang-goiaba"], ["tang-laranja", "Laranja", 1.50, "tang-laranja"],
     ["tang-limao", "Limão", 1.50, "tang-limao"], ["tang-manga", "Manga", 1.50, "tang-manga"], ["tang-maracuja", "Maracujá", 1.50, "tang-maracuja"],
     ["tang-morango", "Morango", 1.50, "tang-morango"], ["tang-tangerina", "Tangerina", 1.50, "tang-tangerina"], ["tang-uva", "Uva", 1.50, "tang-uva"]]);
  /* ---------- remessa Nestlé / Nissin / molhos / Nobre ---------- */
  S("creme-leite", "Creme de Leite Nestlé · 200 g", "laticinios", 3.69, "creme-leite",
    { en: "Brazilian table cream · UHT", pt: "Creme de leite leve", es: "Nata para cocinar" },
    { en: "For strogonoff, mousse and every Brazilian dessert.", pt: "Para strogonoff, mousse e as sobremesas brasileiras.", es: "Para strogonoff, mousse y postres." });
  G("leite-condensado", "Leite Condensado Nestlé", "laticinios",
    { en: "Sweetened condensed milk", pt: "Leite condensado", es: "Leche condensada" },
    { en: "For brigadeiro, pudim and every Brazilian sweet — or the ready-cooked caramel version.", pt: "Para brigadeiro, pudim e todo doce — ou o cozido, já pronto.", es: "Para brigadeiro, flan y dulces — o la versión ya cocida." },
    [["leite-cond-trad", "Tradicional · 370 g", 3.49, "leite-cond-trad"], ["leite-cond-cozido", "Cozido · 397 g", 3.49, "leite-cond-cozido"]]);
  S("nescau", "Nescau · 350 g", "matinais", 3.80, "nescau",
    { en: "Brazilian chocolate drink powder", pt: "Achocolatado em pó", es: "Cacao en polvo brasileño" },
    { en: "The Brazilian chocolate milk everyone grew up with.", pt: "O achocolatado de toda infância brasileira.", es: "El cacao con el que crecieron todos los brasileños." });
  S("nestum-mel", "Nestum Mel Nestlé", "matinais", 4.99, "nestum-mel",
    { en: "Honey cereal flakes", pt: "Cereal de trigo com mel", es: "Cereal con miel" },
    { en: "Classic Portuguese honey cereal — with milk or yoghurt.", pt: "O clássico Nestum de mel — com leite ou iogurte.", es: "El clásico cereal portugués con miel." }, { tags: ["portuguese"] });
  S("cerelac", "Cerelac Farinha Láctea Nestlé", "matinais", 8.99, "cerelac",
    { en: "Milk cereal · from 6 months", pt: "Farinha láctea · a partir de 6 meses", es: "Papilla de cereales con leche" },
    { en: "The original farinha láctea — for babies and grown-up cravings.", pt: "A farinha láctea original — para os bebês e para a saudade dos grandes.", es: "La papilla original con leche." }, { tags: ["portuguese"] });
  G("nissin", "Nissin Lámen · Miojo", "massas",
    { en: "Brazilian instant noodles · ready in 3 min", pt: "Macarrão instantâneo · pronto em 3 min", es: "Fideos instantáneos · listos en 3 min" },
    { en: "The real Brazilian miojo — pick your flavour.", pt: "O miojo de verdade — escolha o sabor.", es: "El auténtico miojo brasileño — elige el sabor." },
    [["nissin-carne", "Noodle Carne", 1.59, "nissin-carne"], ["nissin-feijao", "Caldinho de Feijão · Chico Bento", 1.59, "nissin-feijao"],
     ["nissin-costela", "Costela", 1.99, "nissin-costela"], ["nissin-galinha", "Galinha Caipira", 1.99, "nissin-galinha"],
     ["nissin-legumes", "Legumes", 1.99, "nissin-legumes"], ["nissin-picanha", "Picanha", 1.99, "nissin-picanha"]]);
  G("gota", "Molho Gota Maratá", "molhos",
    { en: "Brazilian sauces · Gota", pt: "Molhos Gota", es: "Salsas brasileñas Gota" },
    { en: "Maratá’s classic Gota sauces — red chilli, green chilli or garlic.", pt: "Os clássicos molhos Gota da Maratá — inglês, pimenta vermelha, verde ou alho.", es: "Las clásicas salsas Gota de Maratá." },
    [["gota-ingles", "Molho inglês · 150 ml", 2.50, "gota-ingles"], ["gota-vermelha", "Pimenta vermelha", 2.50, "gota-vermelha"], ["gota-verde", "Pimenta verde · 150 ml", 2.50, "gota-verde"], ["gota-alho", "Alho · 150 ml", 0, "gota-alho"]]);
  S("cepera-extra", "Molho de Pimenta Extra Forte Cepêra · 60 ml", "molhos", 2.20, "cepera-extra",
    { en: "Extra-hot chilli sauce", pt: "Pimenta extra forte", es: "Salsa picante extra fuerte" },
    { en: "For those who like it really hot.", pt: "Para quem gosta de pimenta de verdade.", es: "Para los que lo quieren bien picante." });
  S("molho-calabresa", "Molho de Pimenta Calabresa D’Horta · 150 ml", "molhos", 2.50, "molho-calabresa",
    { en: "Creamy calabresa chilli sauce", pt: "Pimenta calabresa cremosa", es: "Salsa cremosa de guindilla" },
    { en: "Creamy and spicy — great on pastel, coxinha and churrasco.", pt: "Cremosa e picante — ótima no pastel, coxinha e churrasco.", es: "Cremosa y picante." });
  S("murupi", "Molho de Pimenta Murupi Campilar · 150 ml", "molhos", 2.50, "murupi",
    { en: "Amazonian murupi chilli sauce", pt: "Pimenta murupi da Amazônia", es: "Salsa de ají murupi" },
    { en: "The aromatic chilli of the Amazon, in a creamy sauce.", pt: "A pimenta aromática da Amazônia, em molho cremoso.", es: "El ají aromático del Amazonas." });
  S("nobre-chispalhada", "Chispalhada Nobre", "conservas", 2.99, "nobre-chispalhada",
    { en: "Portuguese pork & bean stew · tinned", pt: "Chispalhada em lata", es: "Guiso portugués de cerdo y alubias" },
    { en: "Home-style Portuguese stew, ready in 3 minutes.", pt: "Receita caseira portuguesa, pronta em 3 minutos.", es: "Guiso casero portugués, listo en 3 minutos." }, { tags: ["portuguese"] });
  S("nobre-dobrada", "Dobrada com Feijão Branco Nobre", "conservas", 3.50, "nobre-dobrada",
    { en: "Tripe with white beans · tinned", pt: "Dobrada com feijão branco em lata", es: "Callos con alubias blancas" },
    { en: "The Portuguese classic, ready in 3 minutes.", pt: "O clássico português, pronto em 3 minutos.", es: "El clásico portugués, listo en 3 minutos." }, { tags: ["portuguese"] });
  S("nobre-chourico", "Chouriço em Lata Nobre", "conservas", 9.50, "nobre-chourico",
    { en: "Smoked pork sausage in oil · tinned", pt: "Chouriço de porco em óleo", es: "Chorizo ahumado en aceite" },
    { en: "Smoked Portuguese chouriço preserved in oil — slice and serve.", pt: "Chouriço fumado conservado em óleo — é só fatiar.", es: "Chorizo portugués ahumado en aceite." }, { tags: ["portuguese"] });
  /* ---------- remessa misturas / massas / enlatados ---------- */
  G("dona-benta", "Mistura para Bolo Dona Benta · 450 g", "bolos",
    { en: "Brazilian cake mix", pt: "Mistura para bolo caseiro", es: "Mezcla para bizcocho" },
    { en: "Fluffy home-style Brazilian cake — just add eggs, milk and oil.", pt: "Bolo caseiro fofinho — é só juntar ovos, leite e óleo.", es: "Bizcocho casero esponjoso — solo añade huevos, leche y aceite." },
    [["db-aipim", "Aipim / macaxeira", 2.99, "db-aipim"], ["db-fuba", "Fubá", 2.99, "db-fuba"], ["db-coco", "Coco", 2.99, "db-coco"], ["db-laranja", "Laranja", 2.99, "db-laranja"], ["db-milho", "Milho", 2.99, "db-milho"]]);
  S("renata-abacaxi", "Mistura para Bolo Renata Abacaxi · 400 g", "bolos", 2.50, "renata-abacaxi",
    { en: "Pineapple cake mix", pt: "Mistura para bolo sabor abacaxi", es: "Mezcla para bizcocho de piña" },
    { en: "Moist pineapple cake, easy to make.", pt: "Bolo de abacaxi molhadinho e fácil de fazer.", es: "Bizcocho de piña jugoso y fácil." });
  G("mistura-paoqueijo", "Mistura para Pão de Queijo", "bolos",
    { en: "Cheese bread mix · gluten-free", pt: "Mistura para pão de queijo", es: "Mezcla para pan de queso" },
    { en: "Make warm pão de queijo at home — naturally gluten-free.", pt: "Pão de queijo quentinho feito em casa — sem glúten.", es: "Pan de queso casero — sin gluten." },
    [["mix-lopes", "Mix Lopes · polvilho 1 kg", 2.95, "mix-lopes"], ["yoki-paoqueijo", "Yoki", 2.99, "yoki-paoqueijo"]], { tags: ["gf"] });
  S("espaguete", "Macarrão Espaguete Milaneza · 500 g", "massas", 1.50, "espaguete",
    { en: "Spaghetti", pt: "Espaguete", es: "Espaguetis" },
    { en: "Classic spaghetti for the Sunday macarronada.", pt: "Espaguete clássico para a macarronada de domingo.", es: "Espaguetis clásicos." });
  S("fusilli", "Macarrão Fusilli Tricolor Continente · 500 g", "massas", 1.99, "fusilli",
    { en: "Tricolour fusilli · tomato & spinach", pt: "Parafuso tricolor · tomate e espinafre", es: "Fusilli tricolor" },
    { en: "Colourful pasta spirals — kids love them.", pt: "Parafusos coloridos — as crianças adoram.", es: "Espirales de colores." }, { tags: ["portuguese"] });
  S("lacos", "Macarrão Laços Granoro · 500 g", "massas", 2.20, "lacos",
    { en: "Farfalloni bow-tie pasta", pt: "Macarrão gravatinha", "pt-PT": "Massa laços", es: "Pasta lacitos" },
    { en: "Italian bow-tie pasta, great for salads and bakes.", pt: "Gravatinha italiana, ótima para saladas e forno.", es: "Lacitos italianos." });
  S("malagueta", "Pimenta Malagueta Misturada Aroma D’Minas", "molhos", 3.99, "malagueta",
    { en: "Whole mixed chillies in vinegar", pt: "Pimenta malagueta em conserva", es: "Guindillas en vinagre" },
    { en: "Whole malagueta peppers in vinegar — a drop goes a long way.", pt: "Malagueta inteira em conserva — poucas gotas bastam.", es: "Guindillas enteras en vinagre." });
  S("massa-pimentao", "Massa de Pimentão Dom Duarte", "molhos", 2.19, "massa-pimentao",
    { en: "Portuguese red pepper paste", pt: "Massa de pimentão", es: "Pasta de pimiento rojo" },
    { en: "The secret of Portuguese marinades — rub it on pork and chicken.", pt: "O segredo do tempero português — para porco e frango.", es: "El secreto de los adobos portugueses." }, { tags: ["portuguese"] });
  S("vinha-alho", "Massa de Vinha d’Alhos Espiga", "molhos", 2.19, "vinha-alho",
    { en: "Garlic & wine marinade paste", pt: "Tempero vinha d’alhos", es: "Adobo de ajo y vino" },
    { en: "Ready-made vinha d’alhos — marinate pork overnight.", pt: "Vinha d’alhos pronta — tempere o porco de véspera.", es: "Adobo listo para el cerdo." }, { tags: ["portuguese"] });
  S("milho-verde", "Milho Verde Green Giant", "geral", 1.99, "milho-verde",
    { en: "Sweetcorn · tinned", pt: "Milho verde em lata", es: "Maíz dulce en lata" },
    { en: "Naturally sweet corn for salads, pizza and cuscuz.", pt: "Milho docinho para salada, pizza e cuscuz.", es: "Maíz dulce para ensaladas y pizza." });
  S("pickles", "Mix Pickles Bodrum", "geral", 3.99, "pickles",
    { en: "Mixed pickles in vinegar", pt: "Picles misto em conserva", es: "Encurtidos variados" },
    { en: "Crunchy mixed vegetables in vinegar.", pt: "Legumes crocantes em conserva.", es: "Verduras crujientes en vinagre." });
  S("tremocos", "Tremoços Extra Maçarico · 550 g", "geral", 3.69, "tremocos",
    { en: "Lupin beans in brine", pt: "Tremoços em conserva", es: "Altramuces" },
    { en: "The Portuguese snack for a cold beer.", pt: "O petisco português para acompanhar a cerveja.", es: "El aperitivo portugués con una cerveza." }, { tags: ["portuguese", "vegan"] });
  S("canjica", "Milho para Canjica Branca Sinhá · 500 g", "geral", 2.99, "canjica",
    { en: "White hominy corn", pt: "Canjica de milho branca", es: "Maíz blanco para canjica" },
    { en: "For canjica (mungunzá) — the creamy festa junina dessert.", pt: "Para canjica ou mungunzá — o doce da festa junina.", es: "Para canjica, el postre de las fiestas de junio." }, { tags: ["gf"] });
  G("pipoca-g", "Milho para Pipoca", "geral",
    { en: "Popcorn kernels", pt: "Milho de pipoca", es: "Maíz para palomitas" },
    { en: "Selected kernels that pop big and fluffy.", pt: "Grãos selecionados que estouram grandes.", es: "Granos seleccionados." },
    [["pipoca", "Yoki · 400 g", 2.99, "pipoca"], ["pipoca-amafil", "Amafil Premium", 3.29, "pipoca-amafil"]]);
  S("mimosa-natas", "Natas Culinária Mimosa · 200 ml", "laticinios", 2.25, "mimosa-natas",
    { en: "Portuguese cooking cream", pt: "Creme de leite culinário", "pt-PT": "Natas para culinária", es: "Nata para cocinar" },
    { en: "Light cooking cream for sauces and bacalhau com natas.", pt: "Para molhos e bacalhau com natas.", es: "Para salsas y bacalao con nata." }, { tags: ["portuguese"] });
  /* ---------- remessa leites / caldos / temperos / conservas ---------- */
  G("leite-coco", "Leite de Coco · 200 ml", "laticinios",
    { en: "Coconut milk", pt: "Leite de coco", es: "Leche de coco" },
    { en: "For moqueca, bobó, cocada and cakes.", pt: "Para moqueca, bobó, cocada e bolos.", es: "Para moqueca y postres." },
    [["coco-sinha", "Sinhá", 2.99, "coco-sinha"], ["coco-sococo", "Sococo", 2.99, "coco-sococo"]], { tags: ["vegan"] });
  S("nido", "Leite em Pó Nido Nestlé · 900 g", "matinais", 10.99, "nido",
    { en: "Full cream milk powder", pt: "Leite em pó integral", es: "Leche en polvo entera" },
    { en: "Creamy powdered milk — for drinks, brigadeiro and recipes.", pt: "Leite em pó cremoso — para beber, brigadeiro e receitas.", es: "Leche en polvo cremosa." });
  S("mabel-coco", "Rosquinhas de Coco Mabel · 300 g", "biscoitos", 2.99, "mabel-coco",
    { en: "Coconut ring biscuits", pt: "Rosquinha sabor coco", es: "Rosquillas de coco" },
    { en: "The classic rosquinha to dunk in your cafezinho.", pt: "A rosquinha clássica para molhar no cafezinho.", es: "La rosquilla clásica para el café." });
  G("knorr", "Caldo Knorr", "molhos",
    { en: "Stock cubes", pt: "Caldo em cubos", "pt-PT": "Caldo em cubos", es: "Caldo en cubitos" },
    { en: "Stock cubes for rice, beans, soups and stews.", pt: "Caldo para arroz, feijão, sopas e ensopados.", es: "Cubitos para arroz, sopas y guisos." },
    [["knorr-carne", "Carne · 6 cubos", 1.99, "knorr-carne"], ["knorr-galinha", "Galinha · 6 cubos", 1.99, "knorr-galinha"],
     ["knorr-legumes", "Legumes · 6 cubos", 1.99, "knorr-legumes"], ["knorr-marisco", "Marisco · 8 cubos", 1.99, "knorr-marisco"]]);
  G("louro-g", "Louro em Folhas", "molhos",
    { en: "Dried bay leaves", pt: "Folhas de louro", es: "Hojas de laurel" },
    { en: "Essential for feijão, feijoada and stews.", pt: "Indispensável no feijão, na feijoada e nos cozidos.", es: "Imprescindible en frijoles y guisos." },
    [["louro", "Margão", 1.20, "louro"], ["louro-duarte", "Dom Duarte", 1.99, "louro-duarte"]], { tags: ["portuguese"] });
  S("kitano-baiano", "Tempero Baiano Kitano · 40 g", "molhos", 2.20, "kitano-baiano",
    { en: "Bahian spice mix", pt: "Tempero baiano", es: "Condimento bahiano" },
    { en: "Warm Bahian spice blend for meat, chicken and moqueca.", pt: "O tempero baiano para carnes, frango e moqueca.", es: "Mezcla de especias de Bahía." });
  S("kitano-toque", "Toque de Chef Kitano · aves e peixes · 120 g", "molhos", 3.89, "kitano-toque",
    { en: "Seasoning for poultry, fish & veg", pt: "Tempero para aves, peixes e legumes", es: "Condimento para aves y pescado" },
    { en: "Ready seasoning — just sprinkle on chicken, fish and salads.", pt: "Tempero pronto — é só polvilhar em frango, peixe e saladas.", es: "Condimento listo para aves y pescado." });
  S("koala-maracuja", "Polpa de Maracujá Koala · 565 g", "geral", 4.49, "koala-maracuja",
    { en: "Passion fruit pulp with seeds · tinned", pt: "Polpa de maracujá com sementes", es: "Pulpa de maracuyá con semillas" },
    { en: "For mousse de maracujá, juices and cocktails.", pt: "Para mousse de maracujá, sucos e caipirinhas.", es: "Para mousse, zumos y cócteles." }, { tags: ["portuguese"] });
  S("jilo", "Jiló em Conserva Aroma D’Minas · 500 g", "geral", 9.99, "jilo",
    { en: "Pickled jiló (scarlet eggplant)", pt: "Conserva de jiló", es: "Jiló en conserva" },
    { en: "The bittersweet Minas Gerais favourite, ready to serve.", pt: "O clássico mineiro, pronto para servir.", es: "El clásico de Minas Gerais." });
  S("jurubeba-conserva", "Jurubeba em Conserva Nativa", "geral", 7.99, "jurubeba-conserva",
    { en: "Pickled jurubeba berries", pt: "Conserva de jurubeba", es: "Jurubeba en conserva" },
    { en: "Bitter little berries — a classic side for rice and beans.", pt: "O amarguinho clássico para acompanhar arroz e feijão.", es: "Bayas amargas, clásicas con arroz y frijoles." });
  S("granulado", "Granulado Dori · 1 kg", "bolos", 2.50, "granulado",
    { en: "Chocolate sprinkles", pt: "Granulado de chocolate", es: "Fideos de chocolate" },
    { en: "The real sprinkles for brigadeiro and cakes.", pt: "O granulado do brigadeiro e dos bolos.", es: "Para brigadeiros y tartas." });
  /* ---------- remessa geleias / farinhas / azeite ---------- */
  G("geleia", "Geleia", "matinais",
    { en: "Fruit jam", pt: "Geleia de fruta", es: "Mermelada" },
    { en: "Brazilian fruit jams for toast, cakes and cheese.", pt: "Geleias brasileiras para o pão, bolos e queijo.", es: "Mermeladas brasileñas." },
    [["geleia-goiaba", "Goiaba Val · 230 g", 2.99, "geleia-goiaba"], ["geleia-uva", "Uva Val · 230 g", 3.20, "geleia-uva"], ["geleia-jabuticaba", "Jabuticaba Reserva de Minas · 240 g", 3.99, "geleia-jabuticaba"]]);
  S("guarana-po", "Guaraná Ralado Cuiabano · 60 g", "matinais", 12.50, "guarana-po",
    { en: "Pure grated guaraná powder", pt: "Guaraná em pó legítimo", es: "Guaraná rallado en polvo" },
    { en: "Natural energy from the Amazon — stir into juice or water.", pt: "Energia natural da Amazônia — misture no suco ou na água.", es: "Energía natural del Amazonas." }, { tags: ["vegan"] });
  G("flocao", "Flocão de Milho · 500 g", "graos",
    { en: "Corn flakes flour for cuscuz", pt: "Farinha de milho flocada para cuscuz", es: "Harina de maíz en copos para cuscuz" },
    { en: "The base for a proper cuscuz nordestino.", pt: "A base do cuscuz nordestino.", es: "La base del cuscuz nordestino." },
    [["flocao-sinha", "Sinhá Flocão", 1.99, "flocao-sinha"], ["cuscuz-sinha", "Sinhá Cuscuz tradicional", 1.99, "cuscuz-sinha"], ["kimilho", "Kimilho Yoki", 2.99, "kimilho"]], { tags: ["gf"] });
  G("fuba", "Fubá Yoki · 500 g", "graos",
    { en: "Cornmeal", pt: "Fubá", es: "Harina de maíz" },
    { en: "Mimoso for bolo de fubá and angu, pré-cozido for quick polenta.", pt: "Mimoso para bolo de fubá e angu; pré-cozido para polenta rápida.", es: "Para bizcocho de maíz y polenta." },
    [["fuba-yoki", "Mimoso", 2.49, "fuba-yoki"], ["fuba-precozido", "Pré-cozido", 3.99, "fuba-precozido"]], { tags: ["gf"] });
  S("grao-bico", "Grão-de-Bico Fugini · 290 g", "geral", 2.30, "grao-bico",
    { en: "Ready-cooked chickpeas", pt: "Grão-de-bico em conserva", es: "Garbanzos cocidos" },
    { en: "Ready to use in salads, stews and hummus.", pt: "Pronto para saladas, ensopados e homus.", es: "Listos para ensaladas y guisos." }, { tags: ["vegan", "gf"] });
  S("guariroba", "Guariroba Fatiada Aroma D’Minas · 500 g", "geral", 10.99, "guariroba",
    { en: "Sliced bitter palm heart in brine", pt: "Conserva de guariroba", es: "Palmito amargo en conserva" },
    { en: "The bitter palm heart of Goiás — for rice, chicken and empadão.", pt: "O palmito amargo goiano — para arroz, frango e empadão.", es: "Palmito amargo de Goiás." });
  G("azeite", "Azeite", "geral",
    { en: "Olive oil", pt: "Azeite de oliva", es: "Aceite de oliva" },
    { en: "For cooking, salads and bacalhau.", pt: "Para cozinhar, saladas e bacalhau.", es: "Para cocinar, ensaladas y bacalao." },
    [["azeite-ktc", "Extra virgem KTC · 250 ml", 5.50, "azeite-ktc"], ["azeite-oliveira-serra", "Oliveira da Serra Tradicional", 7.50, "azeite-oliveira-serra"],
     ["azeite-gallo", "Gallo Subtil · 750 ml", 13.50, "azeite-gallo"], ["azeite-gallo-classico", "Gallo Clássico", 15.00, "azeite-gallo-classico"],
     ["azeite-gallo-reserva", "Gallo Reserva", 15.00, "azeite-gallo-reserva"], ["azeite-gallo-classico-extra", "Gallo Clássico Extra", 25.00, "azeite-gallo-classico-extra"]]);
  S("vinagre-gallo", "Vinagre de Sidra Gallo · 250 ml", "geral", 1.99, "vinagre-gallo",
    { en: "Apple cider vinegar", pt: "Vinagre de maçã", es: "Vinagre de sidra" },
    { en: "For salads and marinades.", pt: "Para saladas e marinadas.", es: "Para ensaladas y adobos." }, { tags: ["portuguese"] });
  S("gelatina-condi", "Gelatina em Folhas Incolor Condi", "bolos", 1.50, "gelatina-condi",
    { en: "Gelatine leaves · unflavoured", pt: "Gelatina incolor em folhas", es: "Gelatina en hojas neutra" },
    { en: "For mousses, cheesecakes and pavês.", pt: "Para mousses, cheesecakes e pavês.", es: "Para mousses y tartas frías." }, { tags: ["portuguese"] });
  /* ---------- remessa feijões / farinhas / farofas ---------- */
  G("feijao", "Feijão", "graos",
    { en: "Dried beans", pt: "Feijão", es: "Frijoles" },
    { en: "The everyday Brazilian feijão — and white beans for Portuguese dishes.", pt: "O feijão de todo dia — e o branco para os pratos portugueses.", es: "Los frijoles de cada día." },
    [["feijao-branco", "Branco Caçarola", 3.50, "feijao-branco"], ["feijao-carioca", "Carioca Camil · 1 kg", 3.99, "feijao-carioca"], ["feijao-preto", "Preto Camil · 1 kg", 3.99, "feijao-preto"]], { tags: ["vegan", "gf"] });
  G("farofa", "Farofa Pronta", "graos",
    { en: "Ready-to-eat seasoned cassava flour", pt: "Farofa de mandioca temperada, pronta", es: "Farofa lista para servir" },
    { en: "The must-have side for churrasco, feijoada and rice and beans — just open and serve.", pt: "O acompanhamento indispensável do churrasco e da feijoada — é só abrir e servir.", es: "El acompañamiento del churrasco y la feijoada." },
    [["farofa-amafil-baiana", "Amafil Baiana · 250 g", 2.49, "farofa-amafil-baiana"], ["farofa-amafil-carne", "Amafil Carne seca", 2.49, "farofa-amafil-carne"], ["farofa-amafil", "Amafil Tradicional · 500 g", 2.80, "farofa-amafil"],
     ["farofa-zaeli", "Zaeli Calabresa · 500 g", 3.20, "farofa-zaeli"], ["farofa-yoki", "Yoki Tradicional · 400 g", 3.50, "farofa-yoki"],
     ["farofa-bomgosto", "Bom Gosto Tradicional · 300 g", 3.50, "farofa-bomgosto"], ["farofa-bomgosto-bacon", "Bom Gosto Bacon · 300 g", 3.70, "farofa-bomgosto-bacon"],
     ["farofa-yoki-milho", "Yoki de Milho · 400 g", 4.50, "farofa-yoki-milho"]], { tags: ["best"] });
  G("farinha-mandioca", "Farinha de Mandioca · 500 g", "graos",
    { en: "Cassava flour", pt: "Farinha de mandioca", es: "Harina de yuca" },
    { en: "For homemade farofa, pirão and to sprinkle on feijão.", pt: "Para farofa caseira, pirão e para pôr no feijão.", es: "Para farofa casera y pirão." },
    [["farinha-branca", "Yoki branca fina", 2.49, "farinha-branca"], ["farinha-torrada", "Yoki torrada", 2.49, "farinha-torrada"], ["farinha-deusa", "Deusa biju", 3.99, "farinha-deusa"], ["farinha-biju", "Yoki flocada biju", 4.50, "farinha-biju"]], { tags: ["gf"] });
  S("maizena", "Amido de Milho Maizena · 720 g", "bolos", 3.50, "maizena",
    { en: "Cornflour", pt: "Amido de milho", es: "Maicena" },
    { en: "For mingau, cakes, biscuits and thickening sauces.", pt: "Para mingau, bolos, biscoitos e engrossar molhos.", es: "Para natillas, bizcochos y espesar salsas." }, { tags: ["gf"] });
  G("fermento", "Fermento", "bolos",
    { en: "Raising agents", pt: "Fermento", es: "Levadura" },
    { en: "Baking powder for cakes or dried yeast for bread.", pt: "Fermento químico para bolos ou biológico para pães.", es: "Levadura química o de panadero." },
    [["fermento-condi", "Biológico de padeiro Condi · carteira", 2.20, "fermento-condi"], ["royal", "Químico em pó Royal · 100 g", 2.85, "royal"]]);
  S("marmelada", "Marmelada Extra Ferbar · 400 g", "matinais", 2.99, "marmelada",
    { en: "Portuguese quince paste", pt: "Marmelada portuguesa", es: "Dulce de membrillo" },
    { en: "Classic Portuguese quince paste — perfect with cheese.", pt: "A clássica marmelada portuguesa — perfeita com queijo.", es: "Dulce de membrillo portugués, perfecto con queso." }, { tags: ["portuguese", "vegan"] });
  S("feijoada-lata", "Feijoada à Brasileira Sabor a Mundo · 415 g", "conservas", 3.99, "feijoada-lata",
    { en: "Ready-made Brazilian feijoada · tinned", pt: "Feijoada pronta em lata", es: "Feijoada lista en lata" },
    { en: "Heat and serve in minutes — microwave or pan.", pt: "É só aquecer — micro-ondas ou panela.", es: "Calentar y servir." });
  /* ---------- remessa farinhas / especiarias / chás ---------- */
  S("milho-biju", "Farinha de Milho Biju Sinhá · 500 g", "graos", 3.50, "milho-biju",
    { en: "Yellow corn flakes flour", pt: "Farinha de milho amarela flocada", es: "Harina de maíz en copos" },
    { en: "For farofa de milho and cuscuz — crunchy golden flakes.", pt: "Para farofa de milho e cuscuz — flocos crocantes.", es: "Para farofa de maíz." }, { tags: ["gf"] });
  S("puba", "Farinha Puba Líder · 500 g", "graos", 4.99, "puba",
    { en: "Fermented cassava flour (puba)", pt: "Farinha de puba", es: "Harina de yuca fermentada" },
    { en: "For bolo de puba and northern Brazilian recipes.", pt: "Para bolo de puba e receitas nordestinas.", es: "Para el bizcocho de puba." }, { tags: ["gf"] });
  S("pao-ralado", "Pão Ralado Rialto · 1 kg", "graos", 3.80, "pao-ralado",
    { en: "Breadcrumbs", pt: "Farinha de rosca", "pt-PT": "Pão ralado", es: "Pan rallado" },
    { en: "For breaded steaks, coxinhas and croquettes.", pt: "Para empanar bife, coxinha e croquete.", es: "Para empanar." }, { tags: ["portuguese"] });
  G("especiarias", "Especiarias Dom Duarte", "molhos",
    { en: "Herbs & spices", pt: "Especiarias e temperos", es: "Especias" },
    { en: "Portuguese herbs and spices for everyday cooking.", pt: "Especiarias portuguesas para o dia a dia.", es: "Especias portuguesas." },
    [["acafrao", "Açafrão-da-índia (cúrcuma)", 1.99, "acafrao"], ["bicarbonato", "Bicarbonato de sódio", 1.99, "bicarbonato"],
     ["oregano", "Orégano", 1.99, "oregano"], ["pimenta-preta", "Pimenta preta em grão", 2.80, "pimenta-preta"]], { tags: ["portuguese"] });
  S("massa-alho", "Massa de Alho Dom Duarte", "molhos", 2.19, "massa-alho",
    { en: "Garlic paste", pt: "Pasta de alho", "pt-PT": "Massa de alho", es: "Pasta de ajo" },
    { en: "Ready garlic paste — season meat, rice and beans in seconds.", pt: "Alho pronto — tempere carne, arroz e feijão em segundos.", es: "Pasta de ajo lista." }, { tags: ["portuguese"] });
  S("sriracha", "Sriracha Flying Goose · pack 3 sabores", "molhos", 10.99, "sriracha",
    { en: "Sriracha mixed pack · Original, Mayoo & Super Hot", pt: "Kit sriracha · Original, Mayoo e Super Hot", es: "Pack sriracha · 3 sabores" },
    { en: "Three Sriracha sauces in one pack.", pt: "Três molhos sriracha num só pack.", es: "Tres salsas sriracha en un pack." });
  G("erva-mate-g", "Erva-Mate para Chimarrão", "cafe",
    { en: "Yerba mate for chimarrão", pt: "Erva-mate para chimarrão", es: "Yerba mate" },
    { en: "Fresh green yerba mate for chimarrão and tereré.", pt: "Erva-mate verdinha para chimarrão e tereré.", es: "Yerba mate para mate y tereré." },
    [["erva-mate", "Barão de Cotegipe · 1 kg", 3.99, "erva-mate"], ["chimarrao-nativa", "Erva nativa", 4.50, "chimarrao-nativa"], ["chimarrao-trad", "Tradicional", 4.80, "chimarrao-trad"]], { tags: ["vegan"] });
  G("chas-dd", "Chás Dom Duarte · 20 saquetas", "cafe",
    { en: "Herbal teas · 20 bags", pt: "Chás e infusões · 20 saquetas", es: "Infusiones · 20 bolsitas" },
    { en: "Portuguese herbal infusions — pick your blend.", pt: "Infusões portuguesas — escolha a sua.", es: "Infusiones portuguesas." },
    [["cha-camomila", "Camomila", 2.60, "cha-camomila"], ["cha-cidreira", "Cidreira", 2.60, "cha-cidreira"],
     ["cha-detox", "Detox", 2.85, "cha-camomila"], ["cha-emagrecimento", "Emagrecimento", 3.29, "cha-emagrecimento"]], { tags: ["portuguese", "vegan"] });
  /* ---------- remessa chás / molhos / biscoitos ---------- */
  G("molhos-dd", "Molhos Dom Duarte", "molhos",
    { en: "Soy & Worcestershire sauce", pt: "Molho de soja e molho inglês", es: "Salsa de soja e inglesa" },
    { en: "For marinades, stir-fries and steaks.", pt: "Para marinadas, refogados e bifes.", es: "Para adobos y salteados." },
    [["dd-ingles", "Inglês", 2.59, "dd-ingles"], ["dd-soja", "Soja", 3.50, "dd-soja"]], { tags: ["portuguese"] });
  G("cremes-pimenta", "Creme de Pimenta · 200 ml", "molhos",
    { en: "Creamy Brazilian chilli sauces", pt: "Cremes de pimenta", es: "Cremas de ají" },
    { en: "Creamy, spicy and full of flavour — perfect on churrasco, pastel and rice.", pt: "Cremosos e picantes — perfeitos no churrasco, pastel e arroz.", es: "Cremosas y picantes." },
    [["creme-calabresa", "Calabresa Brasileiríssimo", 6.50, "creme-calabresa"], ["creme-pequi", "Pequi Aroma D’Minas", 6.50, "creme-pequi"], ["creme-verde", "Pimenta verde com ervas Aroma D’Minas", 6.50, "creme-verde"]]);
  S("creme-cebola", "Creme de Cebola Zaeli · 60 g", "molhos", 0, "creme-cebola",
    { en: "Onion soup & dip mix", pt: "Creme de cebola", es: "Crema de cebolla" },
    { en: "For dips, soups and strogonoff.", pt: "Para patês, sopas e strogonoff.", es: "Para salsas y sopas." });
  S("mutti", "Concentrado de Tomate Mutti · bisnaga", "geral", 1.50, "mutti",
    { en: "Double tomato concentrate · tube", pt: "Extrato de tomate duplo", "pt-PT": "Concentrado de tomate", es: "Concentrado de tomate" },
    { en: "100% Italian tomatoes for sauces and stews.", pt: "Tomates 100% italianos para molhos e ensopados.", es: "Tomates 100% italianos." }, { tags: ["vegan"] });
  S("pequi-fatiado", "Pequi Fatiado D’Horta · 370 g", "geral", 6.99, "pequi-fatiado",
    { en: "Sliced pequi in brine", pt: "Pequi fatiado em conserva", es: "Pequi en conserva" },
    { en: "For arroz com pequi and frango com pequi.", pt: "Para arroz e frango com pequi.", es: "Para arroz con pequi." });
  G("bolacha-cuetara", "Bolacha Cuétara", "biscoitos",
    { en: "Portuguese biscuits", pt: "Bolacha portuguesa", es: "Galletas Cuétara" },
    { en: "The classic biscuit to dunk in milk or coffee.", pt: "A bolacha clássica para molhar no leite ou no café.", es: "La galleta clásica para mojar." },
    [["bolacha-oro", "Oro", 3.80, "bolacha-maria"], ["bolacha-maria", "Maria", 3.90, "bolacha-maria"]], { tags: ["portuguese"] });
  S("cream-cracker", "Biscoito Cream Cracker Renata · 360 g", "biscoitos", 2.18, "cream-cracker",
    { en: "Cream crackers", pt: "Biscoito água e sal", es: "Galletas saladas" },
    { en: "Crunchy crackers for butter, requeijão and soups.", pt: "Crocantes, para manteiga, requeijão e sopas.", es: "Crujientes, para untar." });
  S("diatosta", "Mini Tostas Diatosta Mini Grill", "biscoitos", 3.49, "diatosta",
    { en: "Mini toasts", pt: "Mini torradas", es: "Mini tostadas" },
    { en: "Crunchy mini toasts for breakfast and snacks.", pt: "Torradinhas crocantes para o café e petiscos.", es: "Tostaditas crujientes." }, { tags: ["portuguese", "vegan"] });
  /* ---------- cadastro do PDV (mercearia) ---------- */
  G("arroz", "Arroz", "graos",
    { en: "Rice", pt: "Arroz", es: "Arroz" },
    { en: "The base of every Brazilian meal — arroz e feijão.", pt: "A base de toda refeição — arroz com feijão.", es: "La base de toda comida brasileña." },
    [["arroz-camil-1", "Camil · 1 kg", 2.49, "arroz-camil-1"], ["arroz-tiojoao-1", "Tio João · 1 kg", 2.80, "arroz-tiojoao-1"], ["arroz-cigala", "Cigala", 3.60, "arroz-cigala"],
     ["arroz-camil-5", "Camil · 5 kg", 11.50, "arroz-camil-5"], ["arroz-tiojoao-5", "Tio João · 5 kg", 12.50, "arroz-tiojoao-5"]], { tags: ["gf", "vegan"] });
  G("canjiquinha", "Canjiquinha / Xerém · 500 g", "graos",
    { en: "Cracked corn grits", pt: "Quirera de milho", es: "Maíz quebrado" },
    { en: "For canjiquinha com costela and angu.", pt: "Para canjiquinha com costela e angu.", es: "Para guisos de maíz." },
    [["xerem-sinha", "Sinhá", 2.99, "xerem-sinha"], ["xerem-yoki", "Yoki", 2.99, "xerem-yoki"]], { tags: ["gf"] });
  G("acucar", "Açúcar", "bolos",
    { en: "Sugar", pt: "Açúcar", es: "Azúcar" },
    { en: "For cakes, coffee and desserts.", pt: "Para bolos, café e sobremesas.", es: "Para bizcochos y café." },
    [["acucar-silver", "Silver Spoon", 1.99, "acucar-silver"], ["acucar-uniao", "União refinado · 1 kg", 2.80, "acucar-uniao"]]);
  S("adocante", "Adoçante Zero Cal Líquido", "bolos", 3.99, "adocante",
    { en: "Liquid sweetener", pt: "Adoçante líquido", es: "Edulcorante líquido" },
    { en: "Zero-calorie sweetener for coffee and juices.", pt: "Adoçante zero caloria para café e sucos.", es: "Edulcorante sin calorías." });
  G("polvilho", "Polvilho Amafil Premium · 500 g", "bolos",
    { en: "Tapioca starch", pt: "Polvilho", es: "Almidón de yuca" },
    { en: "For homemade pão de queijo, biscoito de polvilho and tapioca.", pt: "Para pão de queijo caseiro e biscoito de polvilho.", es: "Para pan de queso casero." },
    [["polvilho-doce", "Doce", 5.99, "polvilho-doce"], ["polvilho-azedo", "Azedo", 5.99, "polvilho-azedo"]], { tags: ["gf"] });
  S("branca-neve", "Farinha de Trigo Branca de Neve", "bolos", 2.50, "branca-neve",
    { en: "Plain wheat flour", pt: "Farinha de trigo", es: "Harina de trigo" },
    { en: "Portuguese flour for cakes, bread and frying.", pt: "Farinha portuguesa para bolos, pães e fritos.", es: "Harina portuguesa." }, { tags: ["portuguese"] });
  G("cafe-pilao", "Café Pilão Tradicional", "cafe",
    { en: "Brazilian ground coffee", pt: "Café torrado e moído", es: "Café molido brasileño" },
    { en: "Brazil’s strong, classic coffee.", pt: "O café forte e clássico do Brasil.", es: "El clásico café brasileño." },
    [["pilao-250", "250 g", 5.99, "pilao-250"], ["pilao-500", "500 g", 9.99, "pilao-500"]], { tags: ["best"] });
  G("cafe-3coracoes", "Café 3 Corações", "cafe",
    { en: "Brazilian ground coffee", pt: "Café torrado e moído", es: "Café molido brasileño" },
    { en: "Smooth Brazilian coffee for the daily cafezinho.", pt: "Café brasileiro para o cafezinho de todo dia.", es: "Café brasileño suave." },
    [["3coracoes-250", "Tradicional · 250 g", 5.99, "3coracoes-250"], ["3coracoes-extraforte", "Extra forte", 9.90, "3coracoes-extraforte"]]);
  G("cafe-outros", "Café Brasileiro", "cafe",
    { en: "Brazilian & Portuguese ground coffee", pt: "Café torrado e moído", es: "Café molido" },
    { en: "More coffees from Brazil and Portugal.", pt: "Mais cafés do Brasil e de Portugal.", es: "Más cafés de Brasil y Portugal." },
    [["cafe-uniao", "União tradicional · 250 g", 4.99, "cafe-uniao"], ["cafe-brasileiro", "Café brasileiro", 5.99, "cafe-brasileiro"],
     ["buondi-robusto", "Buondi Robusto", 6.99, "buondi-robusto"],
     ["cafe-caboclo", "Caboclo", 11.50, "cafe-caboclo"]]);
  G("chas-barao", "Chás Barão", "cafe",
    { en: "Brazilian herbal teas", pt: "Chás e infusões Barão", es: "Infusiones Barão" },
    { en: "Brazilian herbal teas — pick your favourite.", pt: "Chás brasileiros — escolha o seu.", es: "Infusiones brasileñas." },
    [["barao-camomila", "Camomila", 1.99, "barao-camomila"], ["barao-carqueja", "Carqueja", 1.99, "barao-carqueja"], ["barao-cidreira", "Cidreira", 1.99, "barao-cidreira"],
     ["barao-hortela", "Hortelã", 1.99, "barao-hortela"], ["barao-erva-doce", "Erva-doce", 2.18, "barao-erva-doce"], ["barao-hibisco", "Hibisco", 2.20, "barao-hibisco"],
     ["barao-maracuja", "Maracujá", 2.20, "barao-maracuja"], ["barao-melissa", "Melissa", 2.20, "barao-melissa"], ["barao-limao-gengibre", "Misto limão, gengibre e mel", 2.20, "barao-limao-gengibre"]], { tags: ["vegan"] });
  G("chas-outros", "Chás", "cafe",
    { en: "Herbal teas", pt: "Chás", es: "Infusiones" },
    { en: "Traditional Brazilian herbal teas.", pt: "Chás tradicionais.", es: "Infusiones tradicionales." },
    [["cha-cavalinha", "Cavalinha", 1.99, "cha-cavalinha"], ["cha-boldo", "Boldo", 2.50, "cha-boldo"], ["cha-durma", "Durma melhor", 2.89, "cha-durma"], ["cha-hibisco", "Hibisco", 2.89, "cha-hibisco"]], { tags: ["vegan"] });
  G("matte-leao", "Chá Matte Leão", "cafe",
    { en: "Roasted mate tea", pt: "Chá mate tostado", es: "Té mate tostado" },
    { en: "The famous Rio de Janeiro mate tea — hot or iced with lemon.", pt: "O famoso mate carioca — quente ou gelado com limão.", es: "El famoso mate de Río." },
    [["matte-sachets", "Sachês", 3.40, "matte-sachets"], ["matte-granel", "A granel", 5.80, "matte-granel"]], { tags: ["vegan"] });
  G("wafer-bauducco", "Wafer Bauducco", "biscoitos",
    { en: "Wafer biscuits", pt: "Biscoito wafer", es: "Barquillos" },
    { en: "Crispy Bauducco wafers.", pt: "Wafers crocantes Bauducco.", es: "Barquillos crujientes." },
    [["bauducco-chocolate", "Chocolate", 2.20, "bauducco-chocolate"], ["bauducco-morango", "Morango", 2.20, "bauducco-morango"],
     ["bauducco-baunilha", "Baunilha", 2.20, "bauducco-baunilha"], ["bauducco-pistache", "Pistache", 2.20, "bauducco-pistache"]]);
  G("bono", "Biscoito Bono", "biscoitos",
    { en: "Cream-filled biscuits", pt: "Biscoito recheado", es: "Galletas rellenas" },
    { en: "The classic Brazilian filled biscuit.", pt: "O clássico biscoito recheado.", es: "La clásica galleta rellena." },
    [["bono-chocolate", "Chocolate", 2.20, "bono-chocolate"], ["bono-morango", "Morango", 2.20, "bono-morango"]]);
  G("recheados", "Biscoitos Recheados", "biscoitos",
    { en: "Filled biscuits", pt: "Biscoitos recheados", es: "Galletas rellenas" },
    { en: "Brazilian favourites for the lunchbox.", pt: "Os preferidos da lancheira.", es: "Las favoritas de la merienda." },
    [["oreo", "Oreo", 0.99, "oreo"], ["trakinas-morango", "Trakinas morango", 1.99, "trakinas-morango"], ["biscoito-prestigio", "Prestígio", 1.99, "biscoito-prestigio"],
     ["recheado-nescau", "Nescau", 2.50, "recheado-nescau"], ["biscoito-tortuguita", "Tortuguita", 2.80, "biscoito-tortuguita"], ["recheado-moca", "Nestlé Moça", 2.99, "recheado-moca"]]);
  G("biscoito-polvilho", "Biscoito de Polvilho", "biscoitos",
    { en: "Tapioca crisps (polvilho)", pt: "Biscoito de polvilho", es: "Rosquillas de almidón" },
    { en: "Light, crunchy and gluten-free.", pt: "Leve, crocante e sem glúten.", es: "Ligeras y crujientes." },
    [["polvilho-trad", "Tradicional", 2.30, "polvilho-trad"], ["polvilho-queijo", "Queijo", 2.30, "polvilho-queijo"], ["polvilho-parmesao", "Parmesão", 2.35, "polvilho-parmesao"]], { tags: ["gf"] });
  S("maizena-piraque", "Bolacha Maizena Piraquê", "biscoitos", 2.99, "maizena-piraque",
    { en: "Cornflour biscuits", pt: "Biscoito maisena", es: "Galletas maría" },
    { en: "Light, crunchy biscuits for coffee.", pt: "Biscoito leve e crocante para o café.", es: "Galletas ligeras." });
  S("ricanela", "Bolacha Ricanela", "biscoitos", 3.50, "ricanela",
    { en: "Cinnamon biscuits", pt: "Bolacha de canela", es: "Galletas de canela" },
    { en: "Portuguese cinnamon biscuits.", pt: "Bolachas de canela portuguesas.", es: "Galletas portuguesas de canela." }, { tags: ["portuguese"] });
  G("dende", "Azeite de Dendê", "molhos",
    { en: "Red palm oil", pt: "Azeite de dendê", es: "Aceite de palma" },
    { en: "Essential for moqueca, acarajé and vatapá.", pt: "Indispensável na moqueca, acarajé e vatapá.", es: "Para moqueca y vatapá." },
    [["dende-kidende", "Kidendê · 200 ml", 3.50, "dende-kidende"], ["dende-cepera", "Cepêra", 3.79, "dende-cepera"]], { tags: ["vegan"] });
  G("chimichurri", "Chimichurri", "molhos",
    { en: "Chimichurri", pt: "Chimichurri", es: "Chimichurri" },
    { en: "The herby sauce for churrasco.", pt: "O molho de ervas do churrasco.", es: "La salsa del asado." },
    [["chimichurri-essenciati", "Essenciati", 6.99, "chimichurri-essenciati"], ["chimichurri-sauce", "Sauce", 6.99, "chimichurri-sauce"]]);
  S("colorifico", "Colorífico Sinhá · 100 g", "molhos", 1.49, "colorifico",
    { en: "Annatto seasoning (colorau)", pt: "Colorau", es: "Achiote en polvo" },
    { en: "Gives rice, chicken and stews that golden colour.", pt: "Dá cor ao arroz, frango e ensopados.", es: "Da color a arroz y guisos." }, { tags: ["vegan"] });
  S("aji-sal", "Aji-Sal Churrasco", "molhos", 6.99, "aji-sal",
    { en: "Barbecue seasoning salt", pt: "Sal temperado para churrasco", es: "Sal sazonada para asado" },
    { en: "Seasoned salt for churrasco.", pt: "Sal temperado para o churrasco.", es: "Sal sazonada para el asado." });
  S("caseirinho", "Molho de Pimenta Caseirinho", "molhos", 2.20, "caseirinho",
    { en: "Chilli sauce", pt: "Molho de pimenta", es: "Salsa picante" },
    { en: "Classic Brazilian chilli sauce.", pt: "Molho de pimenta clássico.", es: "Salsa picante brasileña." });
  S("carolina-reaper", "Molho Carolina Reaper · 90 g", "molhos", 6.99, "carolina-reaper",
    { en: "Extremely hot chilli sauce", pt: "Molho de pimenta extremamente forte", es: "Salsa extremadamente picante" },
    { en: "Made with one of the hottest chillies in the world — use with care!", pt: "Feito com uma das pimentas mais fortes do mundo — use com cuidado!", es: "¡Una de las más picantes del mundo!" });
  S("canja-maggi", "Canja de Galinha Maggi · 82 g", "molhos", 2.50, "canja-maggi",
    { en: "Chicken & rice soup mix", pt: "Sopa canja de galinha", es: "Sopa de pollo con arroz" },
    { en: "Comforting canja in minutes.", pt: "Canja quentinha em minutos.", es: "Sopa reconfortante en minutos." });
  G("feijao-compal", "Feijão Cozido Compal", "geral",
    { en: "Cooked beans · tinned", pt: "Feijão cozido em lata", "pt-PT": "Feijão cozido", es: "Alubias cocidas" },
    { en: "Ready-cooked Portuguese beans — just heat.", pt: "Feijão português já cozido — é só aquecer.", es: "Alubias ya cocidas." },
    [["compal-amanteigado", "Amanteigado", 2.30, "compal-amanteigado"], ["compal-branco", "Branco", 2.30, "compal-branco"], ["compal-encarnado", "Encarnado", 2.30, "compal-encarnado"],
     ["compal-frade", "Frade", 2.30, "compal-frade"], ["compal-preto", "Preto", 2.30, "compal-preto"]], { tags: ["portuguese", "vegan"] });
  S("cogumelos-compal", "Cogumelos Cortados Compal", "geral", 2.50, "cogumelos-compal",
    { en: "Sliced mushrooms · tinned", pt: "Cogumelos fatiados", es: "Champiñones laminados" },
    { en: "For strogonoff, pizza and sauces.", pt: "Para strogonoff, pizza e molhos.", es: "Para salsas y pizza." }, { tags: ["portuguese", "vegan"] });
  G("azeitonas", "Azeitonas", "geral",
    { en: "Olives", pt: "Azeitonas", es: "Aceitunas" },
    { en: "For petiscos, pizza and salads.", pt: "Para petiscos, pizza e saladas.", es: "Para aperitivos y ensaladas." },
    [["azeitona-crespo", "Crespo", 1.49, "azeitona-crespo"], ["azeitona-preta", "Preta com caroço", 2.99, "azeitona-preta"], ["azeitona-manzanilla", "Manzanilla", 4.99, "azeitona-manzanilla"]], { tags: ["vegan"] });
  S("pequi-caroco", "Pequi com Caroço Aroma D’Minas", "geral", 7.99, "pequi-caroco",
    { en: "Whole pequi in brine", pt: "Pequi inteiro em conserva", es: "Pequi entero en conserva" },
    { en: "For arroz com pequi and frango com pequi.", pt: "Para arroz e frango com pequi.", es: "Para arroz con pequi." });
  G("batata-palha", "Batata Palha", "geral",
    { en: "Potato sticks", pt: "Batata palha", es: "Patatas paja" },
    { en: "The crunchy topping for strogonoff and hot dogs.", pt: "A crocância do strogonoff e do cachorro-quente.", es: "Para strogonoff y perritos." },
    [["batata-palha-yoki", "Yoki tradicional", 2.99, "batata-palha-yoki"], ["batata-palha-yoki-extrafina", "Yoki extrafina", 2.99, "batata-palha-yoki-extrafina"],
     ["batata-palha-barrosa", "Barrosa", 4.99, "batata-palha-barrosa"]]);
  S("amendoim-pinduca", "Amendoim Vermelho Pinduca · 400 g", "geral", 1.99, "amendoim-pinduca",
    { en: "Raw red-skin peanuts", pt: "Amendoim cru com pele", es: "Cacahuetes crudos" },
    { en: "For paçoca, pé-de-moleque and roasting.", pt: "Para paçoca, pé-de-moleque e torrar.", es: "Para dulces y tostar." }, { tags: ["vegan", "gf"] });
  const SOON = new Set(["muenster", "llanero", "gota-alho", "creme-cebola"]);
  out.forEach(p => { if (SOON.has(p.id)) { p.available = false; p.soon = true; } });
  const order = window.GROUPS.groceries.map(g => g.id);
  out.sort((a, b) => order.indexOf(a.group) - order.indexOf(b.group) || a.price - b.price || a.name.localeCompare(b.name));
  window.PRODUCTS.push(...out);
  if (!window.CATEGORIES.includes("groceries")) window.CATEGORIES.push("groceries");
  const ORDER = ["all", "beef", "pork", "chicken", "deli", "frozen", "groceries", "candy", "drinks", "kitchen", "home"];
  window.CATEGORIES.sort((a, b) => (ORDER.indexOf(a) + 99) % 99 - (ORDER.indexOf(b) + 99) % 99);
})();
