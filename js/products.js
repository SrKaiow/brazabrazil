/* ============================================================
   BRAZABRAZIL — PRODUCT CATALOGUE
   ------------------------------------------------------------
   To add / edit a product, copy one block and change the fields:

   id        unique short code (no spaces)
   name      product name (same in every language)
   cat       beef | pork | chicken | sausages | boxes | groceries
   unit      "kg"   -> sold by weight (customer picks 0.5 kg steps)
             "each" -> sold per item / pack
   price     price in £ (per kg if unit is "kg")
   sub       small line under the name, per language
   desc      short description, per language
             (en = English, pt = Portuguese Brazil + Portugal, es = Spanish;
              add "pt-PT" if Portugal needs a different text)
   tags      badges: best, slow, special, classic, gf, vegan, portuguese, easy, popular
   image     optional real photo, e.g. "assets/products/picanha.jpg"
   available false = shows "Out of stock"

   NOTE: prices below are EXAMPLES — replace with the shop's real prices.
   ============================================================ */

window.CATEGORIES = ["all", "beef"];

window.PRODUCTS = [
  // Real products live in js/beef.js, js/deli.js, js/frozen.js and js/drinks.js.
  // (The example products used during the build were removed so no invented price appears on the site.)
];

/* "Know your cuts" guide */
window.CUTS_GUIDE = [
  { br: "Picanha",    uk: "Rump cap",        best: { en: "Whole on skewers or thick steaks, salt only", pt: "Inteira no espeto ou em bifes grossos, só com sal", es: "Entera en espeto o en filetes gruesos, solo con sal" } },
  { br: "Fraldinha",  uk: "Bavette / flank", best: { en: "Fast, hot grill — slice against the grain", pt: "Fogo alto e rápido — corte contra a fibra", es: "Parrilla fuerte y rápida — corta contra la fibra" } },
  { br: "Maminha",    uk: "Tri-tip",         best: { en: "Slow grilling, then thin slices", pt: "Assar devagar e fatiar fino", es: "Asar despacio y cortar en lonchas finas" } },
  { br: "Contrafilé", uk: "Sirloin",         best: { en: "Steaks on the grill or in the pan", pt: "Bifes na grelha ou na frigideira", es: "Filetes a la parrilla o a la sartén" } },
  { br: "Alcatra",    uk: "Top rump",        best: { en: "Skewers, steaks and roasting", pt: "Espetinhos, bifes e assados", es: "Brochetas, filetes y asados" } },
  { br: "Cupim",      uk: "Beef hump",       best: { en: "Low and slow for 4–6 hours", pt: "Fogo baixo por 4 a 6 horas", es: "Fuego lento de 4 a 6 horas" } },
  { br: "Costela",    uk: "Beef short ribs", best: { en: "Slow smoked or braised", pt: "Defumada ou assada lentamente", es: "Ahumada o cocinada lentamente" } }
];
