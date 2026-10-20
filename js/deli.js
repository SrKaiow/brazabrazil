/* ============================================================
   BRAZABRAZIL — DELI: sausages, chouriços, cold cuts, smoked & feijoada
   (real shop prices). Same helpers as js/frozen.js:
   G(...) = one card with options · S(...) = single product.
   image "" = no photo yet (card shows the line icon).
   ============================================================ */

window.GROUPS = window.GROUPS || {};
window.GROUPS.deli = [
  { id: "linguicas", label: { en: "Sausages",             "pt-BR": "Linguiças & salsichas",  "pt-PT": "Linguiças & salsichas", es: "Salchichas y longanizas" } },
  { id: "chouricos", label: { en: "Chouriços & farinheiras","pt-BR": "Chouriços & farinheiras","pt-PT": "Chouriços & farinheiras",es: "Chorizos y farinheiras" } },
  { id: "frios",     label: { en: "Mortadella",           "pt-BR": "Mortadelas",             "pt-PT": "Mortadelas",            es: "Mortadelas" } },
  { id: "defumados", label: { en: "Smoked & salted",      "pt-BR": "Defumados & salgados",   "pt-PT": "Fumados & salgados",    es: "Ahumados y salados" } },
  { id: "feijoada",  label: { en: "Feijoada",             "pt-BR": "Feijoada",               "pt-PT": "Feijoada",              es: "Feijoada" } }
];

(function () {
  const I = f => f ? "assets/products/deli/" + f + ".webp" : "";
  const out = [];
  const S = (id, name, group, price, image, sub, desc, extra) =>
    out.push(Object.assign({ id, name, cat: "deli", group, unit: "each", price, tags: [], image: I(image), available: true, sub, desc }, extra || {}));
  const G = (id, name, group, sub, desc, variants, extra) => {
    const ids = [], first = (variants.find(v => v[3]) || [])[3] || "";
    variants.forEach(([vid, label, price, image, unit]) => {
      ids.push(vid);
      out.push({ id: vid, name: name + " · " + label, optionLabel: label, parent: id, hidden: true, cat: "deli", group,
                 unit: unit || "each", price, tags: [], image: I(image || first), available: true, sub, desc });
    });
    out.push(Object.assign({ id, name, cat: "deli", group, unit: "each", isGroup: true, variants: ids, tags: [],
                 image: I(first), available: true, sub, desc }, extra || {}));
  };

  /* ---------- LINGUIÇAS & SALSICHAS ---------- */
  G("salsicha-prisca", "Salsicha Prisca", "linguicas",
    { en: "Brazilian BBQ sausage · Prisca", pt: "Salsicha para churrasco · Prisca", es: "Salchicha para barbacoa · Prisca" },
    { en: "Juicy Brazilian-style sausages made for the grill.", pt: "Salsichas suculentas no estilo brasileiro, feitas para a brasa.", es: "Salchichas jugosas estilo brasileño, hechas para la brasa." },
    [["salsicha-calabresa", "Calabresa", 3.99, "salsicha-calabresa"], ["salsicha-crioula", "Crioula", 3.99, "salsicha-crioula"]], { tags: ["best"] });
  S("linguica-calabresa-prisca", "Linguiça Calabresa Prisca", "linguicas", 5.50, "linguica-calabresa-prisca",
    { en: "Smoked calabresa sausage", pt: "Calabresa defumada", es: "Longaniza calabresa ahumada" },
    { en: "Smoked and lightly spicy — fry with onions or add to feijoada.", pt: "Defumada e levemente picante — acebolada ou na feijoada.", es: "Ahumada y ligeramente picante — con cebolla o en feijoada." });
  G("linguica-fresca", "Linguiça Fresca · por kg", "linguicas",
    { en: "Fresh Brazilian sausages · sold by weight", pt: "Linguiças frescas · vendidas a peso", es: "Longanizas frescas · al peso" },
    { en: "Fresh Brazilian-style sausages for the churrasco — choose your flavour and the weight you need.", pt: "Linguiças frescas para o churrasco — escolha o sabor e o peso que precisa.", es: "Longanizas frescas para el churrasco — elige sabor y peso." },
    [["lf-fina", "Tradicional fina", 10.99, "lf-fina", "kg"],
     ["lf-toscana", "Tradicional toscana", 10.99, "lf-toscana", "kg"],
     ["lf-frango", "Frango", 10.99, "lf-frango", "kg"],
     ["lf-frango-cs", "Frango (chicken sausage)", 11.99, "lf-frango-cs", "kg"],
     ["lf-porco-jlp", "Porco JLP", 11.99, "lf-porco-jlp", "kg"],
     ["lf-apimentada", "Porco apimentada", 11.99, "lf-apimentada", "kg"],
     ["lf-porco-queijo", "Porco e queijo", 12.99, "lf-porco-queijo", "kg"],
     ["lf-costela-bacon", "Costela e bacon", 12.99, "lf-costela-bacon", "kg"]], { unit: "kg", tags: ["best"] });
  G("linguica-topking-g", "Linguiça Top King Gourmet · 1 kg", "linguicas",
    { en: "Premium gourmet sausages · 1 kg pack", pt: "Linguiça gourmet premium · pacote 1 kg", es: "Longaniza gourmet premium · paquete 1 kg" },
    { en: "Top King premium Brazilian-style sausages — six flavours made for the grill.", pt: "Linguiças premium Top King no estilo brasileiro — vários sabores feitos para a brasa.", es: "Longanizas premium Top King — varios sabores para la brasa." },
    [["linguica-topking", "Porco pura", 12.96, "linguica-topking"],
     ["tk-alho", "Alho", 12.97, "tk-alho"],
     ["tk-apimentada", "Apimentada (fininha)", 12.99, "tk-apimentada"],
     ["tk-bacon", "Bacon", 12.99, "tk-bacon"],
     ["tk-frango", "Frango", 12.99, "tk-frango"],
     ["tk-queijo", "Queijo", 12.99, "tk-queijo"],
     ["tk-toscana", "Toscana", 12.99, "tk-toscana"]]);
  S("calabresa-jlp", "Calabresa JLP", "linguicas", 14.90, "calabresa-jlp",
    { en: "Smoked sausage · per kg", pt: "Calabresa defumada · por kg", es: "Salchicha ahumada · por kg" },
    { en: "The classic smoked calabresa, sold by weight.", pt: "A clássica calabresa defumada, vendida a peso.", es: "La clásica calabresa ahumada, al peso." }, { unit: "kg" });

  /* ---------- CHOURIÇOS & FARINHEIRAS ---------- */
  S("chourica-lavrador", "Chouriça Lavrador Terras do Demo", "chouricos", 2.99, "chourica-lavrador",
    { en: "Portuguese farmhouse chouriço", pt: "Chouriça do lavrador", es: "Chorizo portugués de campo" },
    { en: "Rustic smoked chouriça — perfect flame-grilled.", pt: "Chouriça rústica fumada — perfeita assada na chama.", es: "Chorizo rústico ahumado — perfecto a la llama." }, { tags: ["portuguese"] });
  G("farinheira", "Farinheira", "chouricos",
    { en: "Portuguese smoked sausage with flour", pt: "Enchido português com farinha", es: "Embutido portugués con harina" },
    { en: "Soft and smoky — grill it or serve with scrambled eggs.", pt: "Macia e fumada — grelhada ou com ovos mexidos.", es: "Suave y ahumada — a la parrilla o con huevos revueltos." },
    [["farinheira-prisca", "Prisca", 2.99, "farinheira-prisca"], ["farinheira-porco-preto", "Porco Preto", 3.50, "farinheira-porco-preto"]], { tags: ["portuguese"] });
  S("moira", "Chouriço Moira Prisca", "chouricos", 3.50, "moira",
    { en: "Portuguese blood sausage", pt: "Moira · enchido de sangue", es: "Morcilla portuguesa" },
    { en: "Traditional dark chouriço from Trancoso — for cozido à portuguesa.", pt: "Tradicional de Trancoso — para o cozido à portuguesa.", es: "Tradicional de Trancoso — para el cocido portugués." }, { tags: ["portuguese"] });
  S("chourica-bisaro", "Chouriça Bísaro", "chouricos", 3.99, "chourica-bisaro",
    { en: "Bísaro pork chouriço · 160 g", pt: "Chouriça de porco bísaro · 160 g", es: "Chorizo de cerdo bísaro · 160 g" },
    { en: "Made from the prized Bísaro breed of Trás-os-Montes.", pt: "Feita com o premiado porco bísaro de Trás-os-Montes.", es: "Hecho con el apreciado cerdo bísaro de Trás-os-Montes." }, { tags: ["portuguese"] });
  S("chourica-prisca", "Chouriça Tradicional Prisca", "chouricos", 3.99, "chourica-prisca",
    { en: "Traditional Portuguese chouriço", pt: "Chouriça tradicional", es: "Chorizo tradicional portugués" },
    { en: "Smoky and well seasoned — slice it or grill it.", pt: "Fumada e bem temperada — fatiada ou assada.", es: "Ahumado y bien sazonado — en lonchas o a la brasa." }, { tags: ["portuguese"] });
  S("chourico-alentejano", "Chouriço Alentejano SEL", "chouricos", 5.50, "chourico-alentejano",
    { en: "Alentejo chouriço · 250 g", pt: "Chouriço alentejano · 250 g", es: "Chorizo alentejano · 250 g" },
    { en: "Authentic flavour of the Alentejo, made to roast.", pt: "O sabor autêntico do Alentejo, ideal para assar.", es: "El auténtico sabor del Alentejo, ideal para asar." }, { tags: ["portuguese"] });
  S("barrancos", "Chouriço Barrancos", "chouricos", 6.97, "barrancos",
    { en: "Black pork chouriço · Barrancos", pt: "Chouriço de porco preto · Barrancos", es: "Chorizo de cerdo negro · Barrancos" },
    { en: "Premium black pork chouriço from Barrancos.", pt: "Chouriço premium de porco preto de Barrancos.", es: "Chorizo premium de cerdo negro de Barrancos." }, { tags: ["portuguese"] });

  /* ---------- MORTADELAS ---------- */
  G("mortadela", "Mortadela", "frios",
    { en: "Mortadella", pt: "Mortadela", es: "Mortadela" },
    { en: "For the classic mortadela sandwich — sliced thin, piled high.", pt: "Para o clássico sanduíche de mortadela — fatiada fininha.", es: "Para el clásico bocadillo de mortadela — en lonchas finas." },
    [["mortadela-porminho", "Porminho", 3.50, "mortadela-porminho"], ["mortadela-beretta", "Bologna IGP F. Beretta", 3.99, "mortadela-beretta"],
     ["mortadela-porminho-extra", "Porminho Extra · kg", 12.99, "mortadela-porminho-extra", "kg"]]);

  /* ---------- DEFUMADOS & SALGADOS ---------- */
  S("entremeada", "Porco Salgado Entremeada Tiras", "defumados", 13.50, "entremeada",
    { en: "Salted pork belly strips · per kg", pt: "Entremeada salgada em tiras · por kg", es: "Panceta salada en tiras · por kg" },
    { en: "Grill until crispy or add to beans and stews.", pt: "Na brasa até ficar crocante ou no feijão.", es: "A la brasa hasta que cruja o en guisos." }, { unit: "kg" });
  S("costela-defumada", "Costela de Porco Defumada", "defumados", 13.99, "costela-defumada",
    { en: "Smoked pork ribs · per kg", pt: "Costela suína defumada · por kg", es: "Costillas de cerdo ahumadas · por kg" },
    { en: "Essential for feijoada and feijão tropeiro.", pt: "Essencial na feijoada e no feijão tropeiro.", es: "Imprescindible en la feijoada." }, { unit: "kg" });
  S("bacon", "Bacon Defumado", "defumados", 14.90, "bacon",
    { en: "Smoked bacon slab · per kg", pt: "Bacon defumado em manta · por kg", es: "Panceta ahumada · por kg" },
    { en: "Smoky bacon for farofa, feijão and everything else.", pt: "Bacon defumado para farofa, feijão e tudo mais.", es: "Panceta ahumada para farofa, frijoles y más." }, { unit: "kg" });
  S("carne-salgada", "Carne Salgada", "defumados", 14.99, "carne-salgada",
    { en: "Salted beef (carne seca) · per kg", pt: "Carne seca · por kg", es: "Carne salada · por kg" },
    { en: "Desalt overnight — for feijoada, escondidinho and paçoca.", pt: "Dessalgue de véspera — para feijoada, escondidinho e paçoca.", es: "Desalar la víspera — para feijoada y escondidinho." }, { unit: "kg" });

  /* ---------- FEIJOADA ---------- */
  G("kit-feijoada", "Kit Feijoada", "feijoada",
    { en: "All the meats for a feijoada", pt: "Todas as carnes da feijoada", es: "Todas las carnes para la feijoada" },
    { en: "Smoked and salted cuts ready to go — just add black beans.", pt: "Carnes defumadas e salgadas prontas — é só juntar o feijão preto.", es: "Cortes ahumados y salados listos — solo añade frijoles negros." },
    [["kit-feijoada-kg", "Kit da casa · por kg", 14.99, "kit-feijoada", "kg"], ["kit-feijoada-1kg", "Kit Granum · 1 kg", 19.99, "kit-feijoada-1kg"]], { tags: ["best"] });

  // the example Toscana sausage joins this category (still example price)
  const tosc = window.PRODUCTS.find(p => p.id === "toscana");
  if (tosc) { tosc.cat = "deli"; tosc.group = "linguicas"; out.push(tosc); window.PRODUCTS = window.PRODUCTS.filter(p => p !== tosc); }

  // sort by group then price (groups use cheapest option)
  const byId = Object.fromEntries(out.map(p => [p.id, p]));
  out.forEach(p => { if (p.isGroup) p.price = Math.min(...p.variants.map(v => byId[v].price)); });
  const order = window.GROUPS.deli.map(g => g.id);
  out.sort((a, b) => order.indexOf(a.group) - order.indexOf(b.group) || a.price - b.price || a.name.localeCompare(b.name));

  // example items replaced by real ones
  window.PRODUCTS = window.PRODUCTS.filter(p => !["calabresa", "chourico", "bacalhau"].includes(p.id));
  window.PRODUCTS.push(...out);
  window.CATEGORIES = window.CATEGORIES.filter(c => c !== "sausages");
  if (!window.CATEGORIES.includes("deli")) window.CATEGORIES.push("deli");
  const ORDER = ["all", "beef", "pork", "deli", "frozen", "candy", "drinks"];
  window.CATEGORIES.sort((a, b) => (ORDER.indexOf(a) + 99) % 99 - (ORDER.indexOf(b) + 99) % 99);
})();
