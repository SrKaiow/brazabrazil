/* ============================================================
   BRAZABRAZIL — BEEF (real shop prices, per kg)
   ------------------------------------------------------------
   group   picanha | steak | bbq | slow   (sub-filter inside "Beef")
   Each group is sorted by price automatically (cheapest first).
   ============================================================ */

window.GROUPS = window.GROUPS || {};
window.GROUPS.beef = [
  { id: "picanha", label: { en: "Picanhas",              "pt-BR": "Picanhas",            "pt-PT": "Picanhas",            es: "Picanhas" } },
  { id: "steak",   label: { en: "Steaks",                "pt-BR": "Bifes & steaks",      "pt-PT": "Bifes & steaks",      es: "Filetes y steaks" } },
  { id: "bbq",     label: { en: "Churrasco cuts",        "pt-BR": "Cortes para churrasco","pt-PT": "Cortes para churrasco",es: "Cortes para churrasco" } },
  { id: "slow",    label: { en: "Everyday & slow cook",  "pt-BR": "Dia a dia & cozidos", "pt-PT": "Dia a dia & cozidos", es: "Diario y guisos" } }
];

(function () {
  const I = f => "assets/products/beef/" + f + ".webp";
  const B = (id, name, group, price, image, tags, sub, desc) =>
    ({ id, name, cat: "beef", group, unit: "kg", price, tags: tags || [], image: I(image), available: true, sub, desc });

  const beef = [
    /* ---------------- PICANHAS ---------------- */
    B("picanha-wagyu", "Picanha Wagyu", "picanha", 35.00, "picanha-wagyu", ["wagyu"],
      { en: "Wagyu rump cap", pt: "Wagyu · no UK: rump cap", es: "Tapa de cuadril Wagyu" },
      { en: "Intensely marbled and buttery — the ultimate picanha for a special churrasco.", pt: "Marmoreio intenso e sabor amanteigado — a picanha definitiva para um churrasco especial.", es: "Marmoleo intenso y sabor mantecoso — la picanha definitiva para un churrasco especial." }),
    B("picanha-argentina", "Picanha Argentina", "picanha", 26.99, "picanha-argentina", ["ar"],
      { en: "Argentinian rump cap", pt: "Argentina · no UK: rump cap", es: "Tapa de cuadril argentina" },
      { en: "Grass-fed Argentinian beef with a thick fat cap. Salt and fire, nothing else.", pt: "Gado argentino criado a pasto, com capa de gordura generosa. Só sal grosso e brasa.", es: "Res argentina de pasto con gruesa capa de grasa. Sal gruesa y brasa, nada más." }),
    B("picanha-angus", "Picanha Angus", "picanha", 19.99, "picanha-angus", ["angus", "best"],
      { en: "Angus rump cap", pt: "Angus · no UK: rump cap", es: "Tapa de cuadril Angus" },
      { en: "Tender, juicy Angus picanha — our churrasco favourite.", pt: "Picanha Angus macia e suculenta — a favorita do nosso churrasco.", es: "Picanha Angus tierna y jugosa — la favorita de nuestro churrasco." }),
    B("picanha-irish-lifey", "Picanha Irish Liffey", "picanha", 18.99, "picanha-irish-lifey", ["ie"],
      { en: "Irish rump cap · Liffey", pt: "Irlanda (Liffey) · no UK: rump cap", es: "Tapa de cuadril irlandesa · Liffey" },
      { en: "Premium Irish grass-fed beef, cut the Brazilian way.", pt: "Carne irlandesa premium criada a pasto, no corte brasileiro.", es: "Res irlandesa premium de pasto, con corte brasileño." }),
    B("picanha-irlandesa", "Picanha Irlandesa", "picanha", 17.99, "picanha-irlandesa", ["ie"],
      { en: "Irish rump cap", pt: "Irlanda · no UK: rump cap", es: "Tapa de cuadril irlandesa" },
      { en: "Great-value Irish picanha with a lovely fat cap.", pt: "Picanha irlandesa com ótimo custo-benefício e boa capa de gordura.", es: "Picanha irlandesa con gran relación calidad-precio y buena capa de grasa." }),

    /* ---------------- STEAKS ---------------- */
    B("ribeye", "Ribeye Steak", "steak", 19.99, "ribeye", [],
      { en: "Ribeye · bife ancho", pt: "Bife ancho · ribeye", es: "Ojo de bife · ribeye" },
      { en: "Rich marbling, big flavour. Sear hot and rest before slicing.", pt: "Bem marmorizado e muito saboroso. Sele em fogo alto e deixe descansar.", es: "Buen marmoleo y mucho sabor. Sella a fuego fuerte y deja reposar." }),
    B("tomahawk", "Tomahawk", "steak", 19.99, "tomahawk", ["special"],
      { en: "Bone-in ribeye with long bone", pt: "Bife ancho com osso longo", es: "Ojo de bife con hueso largo" },
      { en: "The showstopper of any barbecue — slow on the grill, then a hot finish.", pt: "A estrela de qualquer churrasco — devagar na grelha e finalize em fogo alto.", es: "La estrella de cualquier parrillada — despacio en la parrilla y final a fuego fuerte." }),
    B("contrafile", "Contrafilé Aberdeen", "steak", 19.99, "contrafile", ["aberdeen"],
      { en: "Sirloin · Aberdeen Angus", pt: "Contrafilé · Aberdeen Angus", es: "Bife de chorizo · Aberdeen Angus" },
      { en: "Classic sirloin with its ribbon of fat — perfect steaks for the grill or pan.", pt: "Contrafilé clássico com a faixa de gordura — bifes perfeitos na grelha ou frigideira.", es: "Bife de chorizo clásico con su franja de grasa — perfecto a la parrilla o sartén." }),
    B("tbone", "T-Bone", "steak", 21.90, "tbone", [],
      { en: "T-bone · beef loin", pt: "T-bone · contrafilé e filé com osso", es: "T-bone · lomo con hueso" },
      { en: "Two steaks in one: sirloin and fillet on the bone.", pt: "Dois cortes em um: contrafilé e filé mignon no osso.", es: "Dos cortes en uno: lomo bajo y solomillo con hueso." }),
    B("file-mignon", "Filé Mignon", "steak", 29.99, "file-mignon", [],
      { en: "Beef fillet · tenderloin", pt: "Filé mignon inteiro ou em medalhões", es: "Solomillo de res" },
      { en: "The most tender cut of all. Medallions, stroganoff or a whole roast.", pt: "O corte mais macio de todos. Medalhões, strogonoff ou assado inteiro.", es: "El corte más tierno. Medallones, strogonoff o asado entero." }),

    /* ---------------- CHURRASCO CUTS ---------------- */
    B("costela-janela", "Costela Janela", "bbq", 12.99, "costela-janela", ["slow"],
      { en: "Jacob’s ladder · bone-in short ribs", pt: "Costela com osso · Jacob’s ladder", es: "Costilla de res con hueso" },
      { en: "Brazilian-style ribs — hours over low fire until it falls off the bone.", pt: "Costela no estilo brasileiro — horas no fogo baixo até desmanchar.", es: "Costilla al estilo brasileño — horas a fuego lento hasta deshacerse." }),
    B("ponta-peito", "Ponta de Peito", "bbq", 14.50, "ponta-peito", ["slow"],
      { en: "Brisket", pt: "Brisket", es: "Pecho de res · brisket" },
      { en: "Perfect for smoking or slow-roasting. Juicy and full of flavour.", pt: "Perfeita para defumar ou assar devagar. Suculenta e saborosa.", es: "Perfecto para ahumar o asar lentamente. Jugoso y sabroso." }),
    B("fraldinha", "Fraldinha / Fraldão", "bbq", 16.99, "fraldinha", [],
      { en: "Bavette / flank", pt: "Fraldinha · bavette", es: "Vacío · bavette" },
      { en: "Juicy and loose-grained. Grill hot and slice against the grain.", pt: "Suculenta e de fibras soltas. Grelhe em fogo alto e corte contra a fibra.", es: "Jugoso y de fibra suelta. A la parrilla fuerte y cortar contra la fibra." }),
    B("maminha", "Maminha", "bbq", 16.99, "maminha", ["pl"],
      { en: "Rump tail · tri-tip · Polish", pt: "Maminha polonesa · tri-tip", "pt-PT": "Maminha polaca · tri-tip", es: "Colita de cuadril · polaca" },
      { en: "Tender and lean, ideal for slow grilling then thin slices.", pt: "Macia e magra, ideal para assar devagar e fatiar fino.", es: "Tierna y magra, ideal para asar despacio y cortar fino." }),

    /* ---------------- EVERYDAY & SLOW COOK ---------------- */
    B("mocoto", "Mocotó", "slow", 5.99, "mocoto", [],
      { en: "Ox foot / cow heel", pt: "Mocotó · pé de boi", es: "Pata de res" },
      { en: "For the famous caldo de mocotó — rich, gelatinous and comforting.", pt: "Para o famoso caldo de mocotó — encorpado e reconfortante.", es: "Para el famoso caldo de mocotó — sustancioso y reconfortante." }),
    B("osso-buco", "Osso Buco", "slow", 10.99, "osso-buco", [],
      { en: "Beef shin with marrow bone", pt: "Músculo com tutano", es: "Ossobuco de res" },
      { en: "Braise slowly — the marrow melts into a rich sauce.", pt: "Cozinhe devagar — o tutano derrete e engrossa o molho.", es: "Guisar despacio — el tuétano se funde en una salsa rica." }),
    B("paleta", "Paleta", "slow", 13.99, "paleta", [],
      { en: "Beef shoulder", pt: "Paleta bovina", es: "Paleta de res" },
      { en: "Versatile cut for stews, pot roast and shredded beef.", pt: "Corte versátil para ensopados, carne de panela e desfiados.", es: "Corte versátil para guisos, asados y carne deshebrada." }),
    B("musculo", "Músculo", "slow", 13.99, "musculo", [],
      { en: "Beef heel / shin", pt: "Músculo bovino", es: "Morcillo de res" },
      { en: "Ideal for soups and stews — tender after slow cooking.", pt: "Ideal para sopas e cozidos — fica macio no cozimento lento.", es: "Ideal para sopas y guisos — tierno tras cocción lenta." }),
    B("rabo-boi", "Rabo de Boi", "slow", 14.99, "rabo-boi", [],
      { en: "Oxtail", pt: "Rabada", es: "Rabo de toro" },
      { en: "For a proper rabada with watercress and polenta.", pt: "Para uma boa rabada com agrião e polenta.", es: "Para un buen guiso de rabo con berros y polenta." }),
    B("patinho", "Patinho Australiano", "slow", 14.99, "patinho", ["au"],
      { en: "Knuckle · Australian", pt: "Patinho australiano", es: "Babilla australiana" },
      { en: "Lean and tender — great for steaks, mince and milanesa.", pt: "Magro e macio — ótimo para bifes, carne moída e à milanesa.", es: "Magra y tierna — ideal para filetes, picada y milanesa." }),
    /* ---- batch 2 ---- */
    B("costela-osso", "Costela com Osso", "bbq", 9.99, "costela-osso", ["slow"],
      { en: "Plate on the bone · beef ribs", pt: "Costela bovina com osso", es: "Costilla de res con hueso" },
      { en: "The classic Brazilian costela — slow over the fire for hours, falls off the bone.", pt: "A costela clássica do churrasco — horas no fogo baixo até soltar do osso.", es: "La costilla clásica del churrasco — horas a fuego lento hasta soltarse del hueso." }),
    B("costela-sem-osso", "Costela sem Osso", "bbq", 12.99, "costela-sem-osso", ["slow"],
      { en: "Boneless beef ribs", pt: "Costela bovina desossada", es: "Costilla de res sin hueso" },
      { en: "All the flavour of costela, no bone. Great slow-roasted or in the pressure cooker.", pt: "Todo o sabor da costela, sem osso. Ótima assada devagar ou na pressão.", es: "Todo el sabor de la costilla, sin hueso. Ideal asada lenta o en olla a presión." }),
    B("cupim", "Cupim Brasileiro", "bbq", 18.99, "cupim", ["br", "special"],
      { en: "Beef hump · Brazilian", pt: "Cupim brasileiro", es: "Giba de res · brasileña" },
      { en: "A true Brazilian speciality — marbled hump that melts after hours of slow cooking.", pt: "Especialidade brasileira — marmorizado, derrete depois de horas no fogo baixo.", es: "Auténtica especialidad brasileña — marmoleado, se deshace tras horas a fuego lento." }),
    B("alcatra", "Alcatra Australiana", "bbq", 16.99, "alcatra", ["au"],
      { en: "Rump · Australian", pt: "Alcatra australiana", es: "Cuadril · australiano" },
      { en: "Versatile and full of flavour — steaks, skewers or roasting.", pt: "Versátil e saborosa — bifes, espetinhos ou assados.", es: "Versátil y sabrosa — filetes, brochetas o al horno." }),
    B("contrafile-br", "Contrafilé Brasileiro", "steak", 16.99, "contrafile-br", ["br"],
      { en: "Sirloin · Brazilian", pt: "Contrafilé brasileiro", es: "Bife de chorizo · brasileño" },
      { en: "Brazilian sirloin with its fat ribbon — juicy steaks with real churrasco flavour.", pt: "Contrafilé brasileiro com a faixa de gordura — bifes suculentos com sabor de churrasco.", es: "Bife de chorizo brasileño con su franja de grasa — jugoso y con sabor a churrasco." }),
    B("figado", "Fígado de Boi", "slow", 4.99, "figado", [],
      { en: "Ox liver", pt: "Fígado bovino", es: "Hígado de res" },
      { en: "Rich in iron — classic fígado acebolado with onions.", pt: "Rico em ferro — perfeito para o clássico fígado acebolado.", es: "Rico en hierro — clásico hígado encebollado." }),
    B("bucho", "Bucho", "slow", 8.90, "bucho", [],
      { en: "Beef tripe", pt: "Bucho bovino", es: "Mondongo · callos" },
      { en: "Cleaned honeycomb tripe for dobradinha and traditional stews.", pt: "Bucho limpo para dobradinha e cozidos tradicionais.", es: "Mondongo limpio para callos y guisos tradicionales." }),
    B("acem", "Acém Australiano", "slow", 13.99, "acem", ["au"],
      { en: "Chuck roll · Australian", pt: "Acém australiano", es: "Aguja de res · australiana" },
      { en: "Perfect for carne de panela, stews and homemade mince.", pt: "Perfeito para carne de panela, ensopados e carne moída.", es: "Perfecto para carne en olla, guisos y carne picada." }),
    B("cha-de-fora", "Chã de Fora", "slow", 14.50, "cha-de-fora", [],
      { en: "Silverside", pt: "Coxão duro · chã de fora", es: "Contra de res" },
      { en: "Lean cut for pot roasts, carne louca and slow braising.", pt: "Corte magro para carne assada de panela, carne louca e cozidos.", es: "Corte magro para asados en olla y estofados lentos." }),
    B("colchao-mole", "Colchão Mole", "slow", 14.99, "colchao-mole", [],
      { en: "Topside", pt: "Coxão mole", es: "Tapa de res" },
      { en: "Tender and lean — ideal for bife à milanesa, steaks and stroganoff.", pt: "Macio e magro — ideal para bife à milanesa, bifes e strogonoff.", es: "Tierno y magro — ideal para milanesa, filetes y strogonoff." })
  ];


  const order = window.GROUPS.beef.map(g => g.id);
  beef.sort((a, b) => order.indexOf(a.group) - order.indexOf(b.group) || a.price - b.price || a.name.localeCompare(b.name));
  // replace any example beef in products.js
  window.PRODUCTS = window.PRODUCTS.filter(p => p.cat !== "beef");
  window.PRODUCTS.unshift(...beef);
})();
