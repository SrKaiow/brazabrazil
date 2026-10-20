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
  { id: "salgados",    label: { en: "Brazilian savoury snacks","pt-BR": "Salgados",              "pt-PT": "Salgados",                es: "Aperitivos brasileños" } },
  { id: "snacks",      label: { en: "Pastel & pamonha",      "pt-BR": "Pastel & pamonha",        "pt-PT": "Pastel & pamonha",        es: "Pastel y pamonha" } },
  { id: "sweets",      label: { en: "Sweets",                "pt-BR": "Doces",                   "pt-PT": "Doces",                   es: "Dulces" } },
  { id: "poultry",     label: { en: "Chicken",               "pt-BR": "Frangos",                 "pt-PT": "Frangos",                 es: "Pollo" } },
  { id: "fish",        label: { en: "Fish & seafood",        "pt-BR": "Peixes & frutos do mar",  "pt-PT": "Peixes & marisco",        es: "Pescados y mariscos" } },
  { id: "veg",         label: { en: "Vegetables & roots",    "pt-BR": "Legumes & raízes",        "pt-PT": "Legumes & raízes",        es: "Verduras y raíces" } }
];

(function () {
  const I = f => f ? "assets/products/frozen/" + f + ".webp" : "";
  const out = [];
  const S = (id, name, group, price, image, sub, desc, extra) =>
    out.push(Object.assign({ id, name, cat: "frozen", group, unit: "each", price, tags: ["frozen"], image: I(image), available: true, sub, desc }, extra || {}));
  const G = (id, name, group, sub, desc, variants, extra) => {
    const ids = [], first = (variants.find(v => v[3]) || [])[3] || "";
    variants.forEach(([vid, label, price, image, unit]) => {
      ids.push(vid);
      out.push({ id: vid, name: name + " · " + label, optionLabel: label, parent: id, hidden: true, cat: "frozen", group,
                 unit: unit || "each", price, tags: ["frozen"], image: I(image || first), available: true, sub, desc });
    });
    out.push(Object.assign({ id, name, cat: "frozen", group, unit: "each", isGroup: true, variants: ids, tags: ["frozen"],
                 image: I(first), available: true, sub, desc }, extra || {}));
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
    [["snip-15", "15 unidades", 5.99, "snip-15"], ["snip-50", "50 unidades", 19.99, "snip-50"]],
    { tags: ["frozen", "gf"] });
  S("cheese-yummies", "Pão de Queijo Cheese Yummies", "cheesebread", 5.99, "cheese-yummies",
    { en: "18 units", pt: "18 unidades", es: "18 unidades" },
    { en: "Golden cheese bread bites — perfect for breakfast or a snack.", pt: "Pãezinhos de queijo dourados — perfeitos no café da manhã.", "pt-PT": "Pãezinhos de queijo dourados — perfeitos ao pequeno-almoço.", es: "Bocaditos de pan de queso dorados — perfectos para el desayuno." }, { tags: ["frozen", "gf"] });
  S("rez-chipa", "Chipa Rez", "cheesebread", 12.99, "rez-chipa",
    { en: "Cheese biscuit rings · 20 units", pt: "Biscoito de queijo · 20 unidades", es: "Chipá de queso · 20 unidades" },
    { en: "Crunchy outside, cheesy inside — bake from frozen.", pt: "Crocante por fora, queijo por dentro — direto do freezer.", es: "Crujiente por fuera, con queso por dentro — del congelador al horno." }, { tags: ["frozen", "gf"] });
  G("pao-frances-g", "Pão Francês", "cheesebread",
    { en: "Brazilian bread rolls", pt: "Pãozinho francês", es: "Panecillos brasileños" },
    { en: "Crusty Brazilian rolls — like the padaria back home. Buy by the roll or a part-baked pack to bake at home.", pt: "Pãozinho crocante igual ao da padaria — por unidade ou no pacote pré-assado para assar em casa.", es: "Panecillos crujientes como en la panadería — por unidad o en paquete precocido." },
    [["pao-frances-un", "Unidade", 0.85, "pao-frances-un"], ["pao-frances", "Pacote pré-assado", 5.99, "pao-frances"]]);

  /* ---------- AÇAÍ & FRUIT PULPS ---------- */
  G("acai-polpanorte", "Açaí Polpa Norte com Guaraná", "acai",
    { en: "Frozen açaí sorbet with guaraná", pt: "Açaí cremoso com guaraná", es: "Sorbete de açaí con guaraná" },
    { en: "Thick, creamy açaí straight from the Amazon. Top with banana, granola and condensed milk.", pt: "Açaí grosso e cremoso direto do Pará. Monte com banana, granola e leite condensado.", es: "Açaí espeso y cremoso del Amazonas. Con plátano, granola y leche condensada." },
    [["acai-200g", "200 g", 2.99, "acai-200g"], ["acai-500g", "500 g", 6.99, "acai-500g"], ["acai-1kg", "1,02 kg", 11.99, "acai-1kg"],
     ["acai-12kg", "1,2 kg", 14.99, "acai-12kg"], ["acai-3kg", "3,6 kg", 38.00, "acai-3kg"]],
    { tags: ["frozen", "best"] });
  G("polpas", "Polpa de Fruta Polpa Norte", "acai",
    { en: "Polpa Norte frozen fruit pulp · 100 g", pt: "Polpa congelada Polpa Norte · 100 g", es: "Pulpa de fruta congelada Polpa Norte · 100 g" },
    { en: "100% fruit pulp for juices, smoothies and desserts.", pt: "100% polpa de fruta para sucos, vitaminas e sobremesas.", es: "100% pulpa de fruta para zumos, batidos y postres." },
    [["polpa-maracuja", "Maracujá", 1.99, "polpa-maracuja"], ["polpa-manga", "Manga", 0, "polpa-maracuja"],
     ["polpa-caja", "Cajá", 0, "polpa-maracuja"], ["polpa-acerola", "Acerola", 0, "polpa-maracuja"]],
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

  /* ---------- batch 3 ---------- */
  G("beths-paodequeijo", "Pão de Queijo Beth's", "cheesebread",
    { en: "Brazilian cheese bread · Beth's", pt: "Pão de queijo Beth's", es: "Pan de queso Beth's" },
    { en: "Made with love in the UK — bake from frozen, golden and cheesy.", pt: "Feito com carinho aqui no UK — do freezer ao forno, dourado e cheio de queijo.", es: "Hecho con cariño en UK — del congelador al horno, dorado y con mucho queso." },
    [["beths-pdq-15", "15 unidades", 5.99, "beths-pdq-15"], ["beths-pdq-50", "50 unidades", 19.90, "beths-pdq-50"]], { tags: ["frozen", "gf"] });
  S("duforno", "Biscoito de Queijo Duforno", "cheesebread", 15.99, "duforno",
    { en: "Horseshoe cheese biscuits · 1 kg", pt: "Biscoito ferradura de queijo · 1 kg", es: "Galletas de queso en herradura · 1 kg" },
    { en: "Crunchy cheese biscuits — straight from the freezer to the oven.", pt: "Biscoitos de queijo crocantes — direto do freezer para o forno.", es: "Galletas de queso crujientes — del congelador al horno." }, { tags: ["frozen", "gf"] });
  G("beths-salgados", "Salgados Beth's", "salgados",
    { en: "Party snacks · 12 or 50 units", pt: "Salgadinhos de festa · 12 ou 50 unidades", es: "Aperitivos de fiesta · 12 o 50 unidades" },
    { en: "The real Brazilian party snacks — oven 12 min or air-fryer 6 min.", pt: "Os salgadinhos de festa de verdade — forno 12 min ou air fryer 6 min.", es: "Los auténticos aperitivos de fiesta brasileños — horno 12 min o freidora de aire 6 min." },
    [["beths-coxinha-12", "Coxinha de frango · 12 un", 5.99, "beths-coxinha-12"], ["beths-bolinha-12", "Bolinha 4 queijos · 12 un", 5.99, "beths-bolinha-12"],
     ["beths-enrolado-12", "Enroladinho de salsicha · 12 un", 5.99, "beths-enrolado-12"],
     ["beths-coxinha", "Coxinha de frango · 50 un", 19.90, "beths-coxinha"], ["beths-kibe", "Kibe · 50 un", 19.90, "beths-kibe"],
     ["beths-bolinha", "Bolinha 4 queijos · 50 un", 19.90, "beths-bolinha"], ["beths-enrolado", "Enrolado de salsicha · 50 un", 19.90, "beths-enrolado"]], { tags: ["frozen", "best"] });
  S("croquete", "Croquete de Carne Prosilar · 12 un", "salgados", 3.50, "croquete",
    { en: "Meat croquettes · 12 units", pt: "Croquete de carne · 12 unidades", es: "Croquetas de carne · 12 unidades" },
    { en: "Crispy outside, tasty filling inside — fry or air-fry.", pt: "Crocante por fora, recheio saboroso — frito ou na air fryer.", es: "Crujiente por fuera, sabroso por dentro — frito o en freidora de aire." });
  S("dadinho", "Dadinho de Tapioca Sol", "salgados", 5.99, "dadinho",
    { en: "Tapioca cheesy dice · 300 g", pt: "Dadinho de tapioca · 300 g", es: "Dados de tapioca con queso · 300 g" },
    { en: "Boteco favourite — crispy tapioca and cheese cubes, ready in 5 minutes. Gluten-free.", pt: "Clássico de boteco — dadinhos de tapioca com queijo, prontos em 5 minutos. Sem glúten.", es: "Clásico de bar — dados de tapioca y queso, listos en 5 minutos. Sin gluten." }, { tags: ["frozen", "gf"] });
  G("beths-churros", "Churros Beth's", "sweets",
    { en: "Brazilian churros", pt: "Churros recheados", es: "Churros rellenos" },
    { en: "Filled churros dusted with cinnamon sugar — oven or air-fryer.", pt: "Churros recheados com açúcar e canela — forno ou air fryer.", es: "Churros rellenos con azúcar y canela — horno o freidora de aire." },
    [["beths-churros-15", "15 un · com doce", 5.99, "beths-churros-15"], ["beths-churros-50", "50 un · doce de leite", 19.90, "beths-churros-50"]]);
  S("pitaya", "Creme de Pitaya Frooty", "acai", 10.00, "pitaya",
    { en: "Pitaya (dragon fruit) sorbet · 1 L", pt: "Sorbet de pitaya · 850 g / 1 L", es: "Sorbete de pitahaya · 1 L" },
    { en: "Vibrant pink sorbet — perfect as a bowl, just like açaí.", pt: "Sorbet rosa vibrante — perfeito na tigela, igual açaí.", es: "Sorbete rosa vibrante — perfecto en bol, como el açaí." }, { tags: ["frozen", "vegan"] });
  G("camarao", "Camarão", "fish",
    { en: "Raw king prawns", pt: "Camarão grande cru", es: "Langostinos crudos" },
    { en: "Big raw prawns — grill with garlic or add to moqueca.", pt: "Camarão grande cru — na chapa com alho ou na moqueca.", es: "Langostinos grandes crudos — a la plancha con ajo o en moqueca." },
    [["black-tiger", "Black Tiger · 800 g · 20 un", 15.99, "black-tiger"], ["camarao-cru", "Camarão grande cru", 19.99, "camarao-cru"]]);
  S("mexilhao", "Mexilhão Cozido", "fish", 8.99, "mexilhao",
    { en: "Cooked mussels", pt: "Mexilhão cozido", es: "Mejillones cocidos" },
    { en: "Ready-cooked mussels for rice, pasta or a quick starter.", pt: "Mexilhões já cozidos para arroz, massas ou petisco.", es: "Mejillones cocidos para arroz, pasta o tapa." }, { tags: ["frozen", "portuguese"] });
  S("polvo-tentaculos", "Tentáculos de Polvo Cozidos", "fish", 22.99, "polvo-tentaculos",
    { en: "Cooked octopus tentacles", pt: "Tentáculos de polvo cozidos", es: "Tentáculos de pulpo cocidos" },
    { en: "Tender and ready — just grill with olive oil and garlic.", pt: "Macios e prontos — é só grelhar com azeite e alho.", es: "Tiernos y listos — a la plancha con aceite y ajo." }, { tags: ["frozen", "portuguese"] });
  S("frango-campestre", "Frango Campestre", "poultry", 10.99, "frango-campestre",
    { en: "Free-range style whole chicken · per kg", pt: "Frango caipira · por kg", es: "Pollo de campo · por kg" },
    { en: "Firmer, tastier country chicken — the real frango caipira flavour.", pt: "Frango de carne firme e saborosa — o verdadeiro sabor caipira.", es: "Pollo de campo, carne firme y sabrosa." }, { unit: "kg" });
  S("cornfed", "Cornfed Chicken", "poultry", 10.99, "cornfed",
    { en: "Corn-fed whole chicken", pt: "Frango alimentado com milho", es: "Pollo alimentado con maíz" },
    { en: "Golden-skinned corn-fed chicken — juicy and full of flavour.", pt: "Frango de pele dourada alimentado com milho — suculento e saboroso.", es: "Pollo de piel dorada alimentado con maíz — jugoso y sabroso." });
  S("couve", "Couve", "veg", 2.99, "couve",
    { en: "Shredded collard greens", pt: "Couve fatiada", es: "Col rizada en tiras" },
    { en: "Finely shredded — sauté with garlic to go with feijoada.", pt: "Fatiada fininha — refogue com alho para acompanhar a feijoada.", es: "En tiras finas — saltea con ajo para acompañar la feijoada." }, { tags: ["frozen", "vegan"] });

  /* ---------- batch 4 ---------- */
  S("acai-tube", "Açaí Tube", "acai", 2.50, "acai-tube",
    { en: "Single-serve açaí tube", pt: "Açaí em tubo individual", es: "Açaí en tubo individual" },
    { en: "Açaí on the go — squeeze, eat and enjoy.", pt: "Açaí para levar — é só apertar e saborear.", es: "Açaí para llevar — aprieta y disfruta." }, { tags: ["frozen"] });
  S("alho", "Alho Congelado", "veg", 5.90, "alho",
    { en: "Frozen peeled garlic · 1 kg", pt: "Alho descascado congelado · 1 kg", es: "Ajo pelado congelado · 1 kg" },
    { en: "Peeled cloves ready to use — the base of every Brazilian dish.", pt: "Dentes descascados prontos — a base de todo tempero.", es: "Dientes pelados listos — la base de todo sofrito." }, { tags: ["frozen", "vegan"] });
  G("bacalhau-desfiado", "Bacalhau Desfiado", "fish",
    { en: "Shredded salt cod", pt: "Bacalhau desfiado", es: "Bacalao desmigado" },
    { en: "Ready for bolinhos de bacalhau, bacalhau à brás and pataniscas.", pt: "Pronto para bolinho de bacalhau, bacalhau à brás e pataniscas.", es: "Listo para buñuelos de bacalao y bacalao a la brás." },
    [["bacalhau-migas-brites", "Migas Brites · 400 g", 6.50, "bacalhau-migas-brites"], ["bacalhau-desfiado-lugrade", "Lugrade · 400 g", 6.50, "bacalhau-desfiado-lugrade"],
     ["bacalhau-desfiado-gadus", "Gadus Morhua", 7.99, "bacalhau-desfiado-gadus"]], { tags: ["frozen", "portuguese"] });
  G("bacalhau-postas", "Bacalhau em Postas", "fish",
    { en: "Salt cod loins", pt: "Postas de bacalhau", es: "Lomos de bacalao" },
    { en: "Thick Portuguese cod loins — for bacalhau assado or à lagareiro.", pt: "Postas altas de bacalhau — para assado ou à lagareiro.", es: "Lomos gruesos de bacalao — al horno o a la lagareira." },
    [["bacalhau-postas-lugrade", "Lugrade salgado seco · 1 kg", 25.99, "bacalhau-postas-lugrade"], ["bacalhau-posta-brites", "Brites congelada · kg", 30.00, "bacalhau-posta-brites", "kg"]], { tags: ["frozen", "portuguese"] });

  S("pasteis-bacalhau", "Pastéis de Bacalhau Sr. Bacalhau · 360 g", "salgados", 0, "pasteis-bacalhau",
    { en: "Portuguese codfish cakes", pt: "Pastéis de bacalhau", "pt-PT": "Pastéis de bacalhau", es: "Buñuelos de bacalao" },
    { en: "Traditional recipe — fry from frozen until golden.", pt: "Receita tradicional — frite direto do congelador até dourar.", es: "Receta tradicional — freír desde congelado." }, { tags: ["frozen", "portuguese"] });
  G("geladinho", "Geladinho Gourmet Icy Love", "sweets",
    { en: "Brazilian gourmet ice lollies", pt: "Geladinho gourmet · vários sabores", es: "Helados caseros brasileños" },
    { en: "Creamy Brazilian geladinhos (sacolé / chup-chup) — lots of flavours.", pt: "Geladinho cremoso (sacolé / chup-chup) — vários sabores.", es: "Helados cremosos brasileños — muchos sabores." },
    [["gel-maracuja", "Maracujá", 0, "geladinho"], ["gel-leite-condensado", "Leite condensado", 0, "geladinho"], ["gel-morango-nutella", "Morango com Nutella", 0, "geladinho"],
     ["gel-pudim", "Pudim de leite condensado", 0, "geladinho"], ["gel-coco-queimado", "Coco queimado", 0, "geladinho"], ["gel-acai-ninho", "Açaí com Ninho", 0, "geladinho"],
     ["gel-ninho-morango", "Ninho com morango", 0, "geladinho"], ["gel-abacate", "Abacate", 0, "geladinho"], ["gel-ninho-nutella", "Ninho com Nutella", 0, "geladinho"],
     ["gel-doce-leite", "Doce de leite", 0, "geladinho"]]);
  const SOON = new Set(["polpa-manga", "polpa-caja", "polpa-acerola", "pasteis-bacalhau", "geladinho", "gel-maracuja", "gel-leite-condensado", "gel-morango-nutella", "gel-pudim", "gel-coco-queimado", "gel-acai-ninho", "gel-ninho-morango", "gel-abacate", "gel-ninho-nutella", "gel-doce-leite"]);
  out.forEach(p => { if (SOON.has(p.id)) { p.available = false; p.soon = true; } });
  // sort: by group order, then lowest price (groups use their cheapest option)
  const byId = Object.fromEntries(out.map(p => [p.id, p]));
  out.forEach(p => { if (p.isGroup) { const ps = p.variants.map(v => byId[v].price).filter(x => x > 0); p.price = ps.length ? Math.min(...ps) : 0; } });
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
