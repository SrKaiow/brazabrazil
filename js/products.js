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

window.CATEGORIES = ["all", "beef", "pork", "chicken", "sausages", "boxes", "groceries"];

window.PRODUCTS = [
  // BEEF → real cuts and prices live in js/beef.js

  // ---------- PORK ----------
  { id: "costelinha", name: "Costelinha de Porco", cat: "pork", unit: "kg", price: 11.99, tags: [], image: "", available: true,
    sub: { en: "Pork ribs", pt: "Costela suína", es: "Costillas de cerdo" },
    desc: { en: "Meaty pork ribs, ideal with sal grosso on the barbecue.",
            pt: "Costelinha carnuda, ideal com sal grosso na churrasqueira.",
            es: "Costillas carnosas, ideales con sal gruesa a la parrilla." } },
  { id: "panceta", name: "Panceta", cat: "pork", unit: "kg", price: 10.99, tags: [], image: "", available: true,
    sub: { en: "Pork belly", pt: "Barriga de porco", es: "Panceta de cerdo" },
    desc: { en: "Crispy crackling outside, juicy inside. A churrasco favourite.",
            pt: "Pururuca por fora, suculenta por dentro. Favorita do churrasco.",
            es: "Crujiente por fuera, jugosa por dentro. Favorita del churrasco." } },
  { id: "pernil", name: "Pernil", cat: "pork", unit: "kg", price: 8.99, tags: [], image: "", available: true,
    sub: { en: "Pork leg", pt: "Pernil suíno", es: "Pierna de cerdo" },
    desc: { en: "Marinate overnight and roast for the perfect Sunday lunch.",
            pt: "Tempere na véspera e asse para o almoço de domingo perfeito.",
            es: "Marínalo la noche anterior y ásalo para la comida del domingo." } },

  // ---------- CHICKEN ----------
  { id: "coracao", name: "Coração de Frango", cat: "chicken", unit: "kg", price: 7.99, tags: ["classic"], image: "", available: true,
    sub: { en: "Chicken hearts", pt: "Coraçãozinho", es: "Corazones de pollo" },
    desc: { en: "Skewered and grilled — a must at every Brazilian barbecue.",
            pt: "No espeto e na brasa — não pode faltar no churrasco.",
            es: "En brocheta y a la brasa — imprescindible en el churrasco." } },
  { id: "asinha", name: "Asinha de Frango", cat: "chicken", unit: "kg", price: 6.99, tags: [], image: "", available: true,
    sub: { en: "Chicken wings", pt: "Asinha e coxinha da asa", es: "Alitas de pollo" },
    desc: { en: "Season with garlic and lime, grill until golden.",
            pt: "Tempere com alho e limão e asse até dourar.",
            es: "Adoba con ajo y lima y asa hasta dorar." } },
  { id: "sobrecoxa", name: "Sobrecoxa", cat: "chicken", unit: "kg", price: 7.49, tags: [], image: "", available: true,
    sub: { en: "Chicken thighs", pt: "Sobrecoxa desossada", es: "Contramuslos de pollo" },
    desc: { en: "Boneless and juicy, ready for the grill or the oven.",
            pt: "Desossada e suculenta, pronta para a grelha ou o forno.",
            es: "Deshuesado y jugoso, listo para la parrilla o el horno." } },

  // ---------- SAUSAGES ----------
  { id: "toscana", name: "Linguiça Toscana", cat: "sausages", unit: "kg", price: 9.99, tags: ["best"], image: "", available: true,
    sub: { en: "Fresh Brazilian pork sausage", pt: "Linguiça fresca de porco", es: "Salchicha fresca brasileña" },
    desc: { en: "Lightly seasoned fresh sausage — the opener of every churrasco.",
            pt: "Linguiça fresca levemente temperada — a abertura de todo churrasco.",
            es: "Salchicha fresca suavemente sazonada — la que abre todo churrasco." } },
  { id: "calabresa", name: "Linguiça Calabresa", cat: "sausages", unit: "each", price: 4.49, tags: [], image: "", available: true,
    sub: { en: "Smoked sausage · pack", pt: "Defumada · pacote", es: "Ahumada · paquete" },
    desc: { en: "Smoked and slightly spicy. Fry with onions or add to feijoada.",
            pt: "Defumada e levemente picante. Acebolada ou na feijoada.",
            es: "Ahumada y ligeramente picante. Con cebolla o en la feijoada." } },
  { id: "chourico", name: "Chouriço", cat: "sausages", unit: "each", price: 5.99, tags: ["portuguese"], image: "", available: true,
    sub: { en: "Portuguese chorizo", pt: "Chouriço português", es: "Chorizo portugués" },
    desc: { en: "Traditional Portuguese smoked chouriço, perfect flame-grilled.",
            pt: "Chouriço português tradicional, perfeito assado na chama.",
            es: "Chorizo portugués tradicional, perfecto asado a la llama." } },

  // ---------- BBQ BOXES ----------
  { id: "box4", name: "Churrasco Box · 4", cat: "boxes", unit: "each", price: 59.00, tags: ["easy"], image: "", available: true,
    sub: { en: "Brazilian BBQ box for 4 people", pt: "Kit churrasco para 4 pessoas", "pt-PT": "Caixa de churrasco para 4 pessoas", es: "Caja de churrasco para 4 personas" },
    desc: { en: "Picanha, linguiça, chicken hearts, farofa and sal grosso.",
            pt: "Picanha, linguiça, coraçãozinho, farofa e sal grosso.",
            es: "Picanha, linguiça, corazones de pollo, farofa y sal gruesa." } },
  { id: "box8", name: "Churrasco Box · 8", cat: "boxes", unit: "each", price: 109.00, tags: ["popular"], image: "", available: true,
    sub: { en: "Brazilian BBQ box for 8 people", pt: "Kit churrasco para 8 pessoas", "pt-PT": "Caixa de churrasco para 8 pessoas", es: "Caja de churrasco para 8 personas" },
    desc: { en: "Picanha, fraldinha, linguiça, wings, hearts, farofa and pão de queijo.",
            pt: "Picanha, fraldinha, linguiça, asinhas, coraçãozinho, farofa e pão de queijo.",
            es: "Picanha, fraldinha, linguiça, alitas, corazones, farofa y pão de queijo." } },
  { id: "boxpicanha", name: "Picanha Lovers", cat: "boxes", unit: "each", price: 79.00, tags: [], image: "", available: true,
    sub: { en: "Two whole picanhas + sides", pt: "Duas picanhas inteiras + acompanhamentos", es: "Dos picanhas enteras + guarniciones" },
    desc: { en: "Two premium picanhas, sal grosso, farofa and chimichurri.",
            pt: "Duas picanhas premium, sal grosso, farofa e chimichurri.",
            es: "Dos picanhas premium, sal gruesa, farofa y chimichurri." } },

  // ---------- GROCERIES ----------
  { id: "paodequeijo", name: "Pão de Queijo", cat: "groceries", unit: "each", price: 7.99, tags: ["gf"], image: "", available: true,
    sub: { en: "Cheese bread · frozen 1 kg", pt: "Congelado · 1 kg", es: "Pan de queso · congelado 1 kg" },
    desc: { en: "Warm, chewy Brazilian cheese bread. Naturally gluten-free.",
            pt: "Quentinho e macio, como em Minas. Naturalmente sem glúten.",
            es: "Pan de queso brasileño, tierno y elástico. Naturalmente sin gluten." } },
  { id: "farofa", name: "Farofa Pronta", cat: "groceries", unit: "each", price: 3.49, tags: [], image: "", available: true,
    sub: { en: "Toasted cassava flour", pt: "Farofa temperada", es: "Harina de yuca tostada" },
    desc: { en: "The crunchy side every churrasco needs.",
            pt: "O acompanhamento crocante que todo churrasco precisa.",
            es: "El acompañamiento crujiente que todo churrasco necesita." } },
  { id: "salgrosso", name: "Sal Grosso", cat: "groceries", unit: "each", price: 2.49, tags: [], image: "", available: true,
    sub: { en: "Coarse BBQ salt · 1 kg", pt: "Para churrasco · 1 kg", es: "Sal gruesa · 1 kg" },
    desc: { en: "The only seasoning a good picanha needs.",
            pt: "O único tempero que uma boa picanha precisa.",
            es: "El único condimento que necesita una buena picanha." } },
  { id: "feijao", name: "Feijão Preto", cat: "groceries", unit: "each", price: 3.29, tags: ["vegan"], image: "", available: true,
    sub: { en: "Black beans · 1 kg", pt: "1 kg", es: "Frijoles negros · 1 kg" },
    desc: { en: "For feijoada and everyday rice and beans.",
            pt: "Para a feijoada e o arroz com feijão de todo dia.",
            es: "Para la feijoada y el arroz con frijoles de cada día." } },
  { id: "guarana", name: "Guaraná Antarctica", cat: "groceries", unit: "each", price: 1.29, tags: [], image: "", available: true,
    sub: { en: "Brazilian soft drink · can", pt: "Lata", es: "Refresco brasileño · lata" },
    desc: { en: "Brazil's favourite fizzy drink.",
            pt: "O refrigerante preferido do Brasil.",
            es: "El refresco favorito de Brasil." } },
  { id: "bacalhau", name: "Bacalhau", cat: "groceries", unit: "kg", price: 14.99, tags: ["portuguese"], image: "", available: true,
    sub: { en: "Portuguese salt cod", pt: "Bacalhau salgado português", es: "Bacalao salado portugués" },
    desc: { en: "Premium salted cod for bacalhau à brás and more.",
            pt: "Bacalhau premium para bacalhau à brás, à Gomes de Sá e muito mais.",
            es: "Bacalao premium para bacalhau à brás y mucho más." } },
  { id: "nata", name: "Pastéis de Nata", cat: "groceries", unit: "each", price: 5.49, tags: ["portuguese"], image: "", available: true,
    sub: { en: "Portuguese custard tarts · 4", pt: "Caixa com 4", es: "Pastelitos de nata · 4" },
    desc: { en: "Crisp pastry, creamy custard, a touch of cinnamon.",
            pt: "Massa folhada estaladiça, creme suave e um toque de canela.",
            es: "Hojaldre crujiente, crema suave y un toque de canela." } }
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
