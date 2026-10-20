/* ============================================================
   BRAZABRAZIL — PORK (real shop prices)
   group  cuts | feijoada | extras  (each sorted by price)
   ============================================================ */

window.GROUPS = window.GROUPS || {};
window.GROUPS.pork = [
  { id: "cuts",     label: { en: "Pork cuts",                "pt-BR": "Cortes suínos",            "pt-PT": "Cortes de porco",          es: "Cortes de cerdo" } },
  { id: "feijoada", label: { en: "For feijoada & stews",     "pt-BR": "Para feijoada & cozidos",  "pt-PT": "Para feijoada & cozidos",  es: "Para feijoada y guisos" } },
  { id: "extras",   label: { en: "Lard & crackling",         "pt-BR": "Banha & torresmo",         "pt-PT": "Banha & torresmo",         es: "Manteca y chicharrón" } }
];

(function () {
  const I = f => "assets/products/pork/" + f + ".webp";
  const K = (id, name, group, price, unit, image, sub, desc, tags) =>
    ({ id, name, cat: "pork", group, unit, price, tags: tags || [], image: I(image), available: true, sub, desc });

  const pork = [
    /* ---------- CUTS ---------- */
    K("barriga", "Barriga de Porco", "cuts", 6.99, "kg", "barriga",
      { en: "Pork belly", pt: "Panceta · pork belly", es: "Panceta de cerdo" },
      { en: "Slow-roast for crispy crackling, or cube it for the churrasco.", pt: "Asse devagar para a pele pururucar, ou corte em cubos para o churrasco.", es: "Asar despacio para piel crujiente, o en dados para el churrasco." }),
    K("costela-porco", "Costela de Porco", "cuts", 6.99, "kg", "costela-porco",
      { en: "Pork ribs", pt: "Costela suína", es: "Costillas de cerdo" },
      { en: "Meaty ribs — great with coarse salt on the grill or slow-baked.", pt: "Costela carnuda — ótima com sal grosso na brasa ou assada devagar.", es: "Costillas carnosas — con sal gruesa a la brasa o al horno." }),
    K("pernil-sem-osso", "Pernil sem Osso", "cuts", 6.99, "kg", "pernil-sem-osso",
      { en: "Boneless pork leg", pt: "Pernil suíno desossado", es: "Pierna de cerdo deshuesada" },
      { en: "Marinate overnight and roast — the classic Brazilian pernil.", pt: "Tempere na véspera e asse — o clássico pernil assado.", es: "Marinar la víspera y asar — el clásico pernil brasileño." }),
    K("bisteca", "Bisteca de Porco", "cuts", 7.50, "kg", "bisteca",
      { en: "Pork striploin chops", pt: "Bisteca suína", "pt-PT": "Costeletas de porco", es: "Chuletas de cerdo" },
      { en: "Juicy chops for the frying pan or grill.", pt: "Bistecas suculentas para frigideira ou grelha.", es: "Chuletas jugosas para la sartén o la parrilla." }),

    /* ---------- FEIJOADA & STEWS ---------- */
    K("joelho", "Joelho de Porco", "feijoada", 6.99, "kg", "joelho",
      { en: "Pork hock", pt: "Joelho suíno · eisbein", es: "Codillo de cerdo" },
      { en: "Slow-cook until tender, or roast for a crispy joelho à pururuca.", pt: "Cozinhe até amaciar ou asse para um joelho à pururuca.", es: "Cocinar lento hasta que esté tierno, o asar hasta que cruja." }),
    K("orelha", "Orelha de Porco", "feijoada", 6.99, "kg", "orelha",
      { en: "Pork ears", pt: "Orelha suína", es: "Oreja de cerdo" },
      { en: "An essential for a proper feijoada completa.", pt: "Indispensável numa feijoada completa.", es: "Imprescindible en una feijoada completa." }),
    K("pe-porco", "Pé de Porco", "feijoada", 6.99, "kg", "pe-porco",
      { en: "Pork feet / trotters", pt: "Pé suíno", es: "Manitas de cerdo" },
      { en: "Adds body and flavour to feijoada and stews.", pt: "Dá corpo e sabor à feijoada e aos cozidos.", es: "Da cuerpo y sabor a la feijoada y los guisos." }),
    K("rabo-porco", "Rabo de Porco", "feijoada", 6.99, "kg", "rabo-porco",
      { en: "Pork tail", pt: "Rabo suíno", es: "Rabo de cerdo" },
      { en: "Rich and gelatinous — a feijoada classic.", pt: "Saboroso e gelatinoso — clássico da feijoada.", es: "Sabroso y gelatinoso — un clásico de la feijoada." }),

    /* ---------- LARD & CRACKLING ---------- */
    K("banha", "Banha de Porco Porminho", "extras", 3.20, "each", "banha",
      { en: "Pork lard for cooking · 230 g", pt: "Banha para culinária · 230 g", es: "Manteca de cerdo · 230 g" },
      { en: "For frying, farofa and the real taste of grandma’s cooking.", pt: "Para fritar, fazer farofa e ter o sabor da comida de vó.", es: "Para freír, hacer farofa y el sabor de la cocina de la abuela." }, ["portuguese"]),
    K("torresmo", "Torresmo", "extras", 3.99, "each", "torresmo",
      { en: "Pork scratchings · 200 g", pt: "Torresmo · 200 g", es: "Chicharrón · 200 g" },
      { en: "Crunchy Brazilian torresmo — the perfect snack with a cold beer.", pt: "Torresmo crocante — o petisco perfeito com uma cerveja gelada.", es: "Chicharrón crujiente — el aperitivo perfecto con una cerveza fría." })
  ];

  const order = window.GROUPS.pork.map(g => g.id);
  pork.sort((a, b) => order.indexOf(a.group) - order.indexOf(b.group) || a.price - b.price || a.name.localeCompare(b.name));
  window.PRODUCTS.push(...pork);
  if (!window.CATEGORIES.includes("pork")) window.CATEGORIES.push("pork");
})();
