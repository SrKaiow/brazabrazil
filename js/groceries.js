/* ============================================================
   BRAZABRAZIL — GROCERIES (real shop prices)
   ============================================================ */
window.GROUPS = window.GROUPS || {};
window.GROUPS.groceries = [
  { id: "laticinios", label: { en: "Cheese, milk & butter", "pt-BR": "Queijos, leite & manteiga", "pt-PT": "Queijos, leite & manteiga", es: "Quesos, leche y mantequilla" } },
  { id: "matinais", label: { en: "Breakfast, cereals & chocolate drinks", "pt-BR": "Café da manhã & achocolatados", "pt-PT": "Pequeno-almoço & achocolatados", es: "Desayuno y cacao" } },
  { id: "massas", label: { en: "Pasta & instant noodles", "pt-BR": "Massas & miojo", "pt-PT": "Massas", es: "Pasta y fideos" } },
  { id: "bolos", label: { en: "Cake & cheese-bread mixes", "pt-BR": "Misturas para bolo & pão de queijo", "pt-PT": "Misturas para bolo & pão de queijo", es: "Mezclas para bizcocho y pan de queso" } },
  { id: "molhos", label: { en: "Hot sauces & sauces", "pt-BR": "Molhos & pimentas", "pt-PT": "Molhos & piri-piri", es: "Salsas y picantes" } },
  { id: "conservas", label: { en: "Portuguese tinned food", "pt-BR": "Conservas portuguesas", "pt-PT": "Conservas", es: "Conservas portuguesas" } },
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
  S("requeijao-mabiju", "Requeijão Cremoso Mabiju · 220 g", "laticinios", 3.49, "requeijao-mabiju",
    { en: "Brazilian cream cheese spread", pt: "Requeijão cremoso", es: "Queso crema brasileño" },
    { en: "The creamy requeijão Brazilians love on bread and in recipes.", pt: "O requeijão cremoso para o pão e as receitas.", es: "El requeijão cremoso para el pan y recetas." });
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
  S("leite-cond-cozido", "Leite Condensado Cozido Nestlé · 397 g", "laticinios", 3.49, "leite-cond-cozido",
    { en: "Ready-made caramel (dulce de leche)", pt: "Leite condensado cozido · doce de leite", es: "Dulce de leche listo" },
    { en: "Already cooked and creamy — for banoffee, cakes and straight from the spoon.", pt: "Já cozido e cremoso — para banoffee, bolos ou de colher.", es: "Ya cocido y cremoso — para tartas o a cucharadas." }, { tags: ["portuguese"] });
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
    { en: "Maratá’s classic Gota sauces — red chilli, green chilli or garlic.", pt: "Os clássicos molhos Gota da Maratá — pimenta vermelha, verde ou alho.", es: "Las clásicas salsas Gota de Maratá." },
    [["gota-vermelha", "Pimenta vermelha", 2.50, "gota-vermelha"], ["gota-verde", "Pimenta verde · 150 ml", 2.50, "gota-verde"], ["gota-alho", "Alho · 150 ml", 0, "gota-alho"]]);
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
    [["db-aipim", "Aipim / macaxeira", 2.99, "db-aipim"], ["db-fuba", "Fubá", 2.99, "db-fuba"], ["db-laranja", "Laranja", 2.99, "db-laranja"], ["db-milho", "Milho", 2.99, "db-milho"]]);
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
  S("pipoca", "Milho para Pipoca Yoki · 400 g", "geral", 2.99, "pipoca",
    { en: "Popcorn kernels", pt: "Milho de pipoca", es: "Maíz para palomitas" },
    { en: "Selected kernels that pop big and fluffy.", pt: "Grãos selecionados que estouram grandes.", es: "Granos seleccionados." });
  S("mimosa-natas", "Natas Culinária Mimosa · 200 ml", "laticinios", 2.25, "mimosa-natas",
    { en: "Portuguese cooking cream", pt: "Creme de leite culinário", "pt-PT": "Natas para culinária", es: "Nata para cocinar" },
    { en: "Light cooking cream for sauces and bacalhau com natas.", pt: "Para molhos e bacalhau com natas.", es: "Para salsas y bacalao con nata." }, { tags: ["portuguese"] });
  const SOON = new Set(["muenster", "llanero", "gota-alho"]);
  out.forEach(p => { if (SOON.has(p.id)) { p.available = false; p.soon = true; } });
  const order = window.GROUPS.groceries.map(g => g.id);
  out.sort((a, b) => order.indexOf(a.group) - order.indexOf(b.group) || a.price - b.price || a.name.localeCompare(b.name));
  window.PRODUCTS.push(...out);
  if (!window.CATEGORIES.includes("groceries")) window.CATEGORIES.push("groceries");
  const ORDER = ["all", "beef", "pork", "chicken", "deli", "frozen", "groceries", "candy", "drinks", "kitchen", "home"];
  window.CATEGORIES.sort((a, b) => (ORDER.indexOf(a) + 99) % 99 - (ORDER.indexOf(b) + 99) % 99);
})();
