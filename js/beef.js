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
      { en: "Lean and tender — great for steaks, mince and milanesa.", pt: "Magro e macio — ótimo para bifes, carne moída e à milanesa.", es: "Magra y tierna — ideal para filetes, picada y milanesa." })
  ];

  const order = window.GROUPS.beef.map(g => g.id);
  beef.sort((a, b) => order.indexOf(a.group) - order.indexOf(b.group) || a.price - b.price || a.name.localeCompare(b.name));
  // replace any example beef in products.js
  window.PRODUCTS = window.PRODUCTS.filter(p => p.cat !== "beef");
  window.PRODUCTS.unshift(...beef);
})();
