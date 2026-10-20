/* ============================================================
   BRAZABRAZIL — CLEANING & PERSONAL CARE (real shop prices)
   G(...) = one card with options · S(...) = single product
   ============================================================ */

window.GROUPS = window.GROUPS || {};
window.GROUPS.home = [
  { id: "limpeza", label: { en: "Cleaning & laundry", "pt-BR": "Limpeza & lavanderia", "pt-PT": "Limpeza & lavandaria", es: "Limpieza y lavandería" } },
  { id: "higiene", label: { en: "Personal care",      "pt-BR": "Higiene pessoal",      "pt-PT": "Higiene pessoal",      es: "Higiene personal" } },
  { id: "cabelo",  label: { en: "Hair care",          "pt-BR": "Cabelos",              "pt-PT": "Cabelos",              es: "Cabello" } },
  { id: "unhas",   label: { en: "Nails & manicure",   "pt-BR": "Unhas & manicure",     "pt-PT": "Unhas & manicura",     es: "Uñas y manicura" } }
];

(function () {
  const I = f => f ? "assets/products/home/" + f + ".webp" : "";
  const out = [];
  const S = (id, name, group, price, image, sub, desc, extra) =>
    out.push(Object.assign({ id, name, cat: "home", group, unit: "each", price, tags: [], image: I(image), available: true, sub, desc }, extra || {}));
  const G = (id, name, group, sub, desc, variants, extra) => {
    const ids = [], first = (variants.find(v => v[3]) || [])[3] || "";
    variants.forEach(([vid, label, price, image]) => {
      ids.push(vid);
      out.push({ id: vid, name: name + " · " + label, optionLabel: label, parent: id, hidden: true, cat: "home", group,
                 unit: "each", price, tags: [], image: I(image || first), available: true, sub, desc });
    });
    out.push(Object.assign({ id, name, cat: "home", group, unit: "each", isGroup: true, variants: ids, tags: [],
                 image: I(first), available: true, sub, desc }, extra || {}));
  };

  /* ---------- CLEANING & LAUNDRY ---------- */
  G("veja", "Veja Gold Multiuso · 500 ml", "limpeza",
    { en: "Multi-surface cleaner", pt: "Limpador multiuso", es: "Limpiador multiusos" },
    { en: "Brazil’s favourite multi-purpose cleaner — kills 99.9% of germs.", pt: "O multiuso preferido do Brasil — elimina 99,9% dos germes.", es: "El limpiador multiusos favorito de Brasil — elimina el 99,9% de los gérmenes." },
    [["veja-azul", "Original (azul)", 4.00, "veja-azul"], ["veja-lavanda", "Lavanda", 4.00, "veja-lavanda"]]);
  S("pinho-sol", "Pinho Sol Original · 1 L", "limpeza", 4.20, "pinho-sol",
    { en: "Pine disinfectant", pt: "Desinfetante de pinho", es: "Desinfectante de pino" },
    { en: "Cleans, disinfects and leaves that classic pine scent.", pt: "Limpa, desinfeta e deixa aquele cheirinho de pinho.", es: "Limpia, desinfecta y deja el clásico aroma a pino." });
  G("sabao-barra", "Sabão em Barra", "limpeza",
    { en: "Laundry soap bar", pt: "Sabão em pedra", es: "Jabón en barra" },
    { en: "The classic bar soap for hand-washing clothes.", pt: "O clássico sabão em pedra para lavar roupa à mão.", es: "El clásico jabón en barra para lavar ropa a mano." },
    [["alpes", "Alpes de coco · 150 g", 2.60, "alpes"], ["clarim", "Clarim original", 3.99, "clarim"]]);
  G("omo", "Sabão em Pó Omo", "limpeza",
    { en: "Washing powder", pt: "Sabão em pó", "pt-PT": "Detergente em pó", es: "Detergente en polvo" },
    { en: "Powerful stain removal for whiter, fresher clothes.", pt: "Remove manchas difíceis e deixa a roupa perfumada.", es: "Elimina manchas difíciles y deja la ropa fresca." },
    [["omo-540", "Mão · 540 g", 9.40, "omo-540"], ["omo-800", "Lavagem perfeita · 800 g", 9.90, "omo-800"]]);

  /* ---------- PERSONAL CARE ---------- */
  S("phebo", "Sabonete Phebo Odor de Rosas", "higiene", 2.50, "phebo",
    { en: "Classic Brazilian soap bar", pt: "Sabonete clássico desde 1930", es: "Jabón clásico brasileño" },
    { en: "The iconic black rose soap, made in Brazil since 1930.", pt: "O icônico sabonete preto de rosas, desde 1930.", es: "El icónico jabón negro de rosas, desde 1930." });
  S("soro", "Soro Fisiológico AGA · 100 ml", "higiene", 2.50, "soro",
    { en: "Saline solution for nasal rinse", pt: "Soro para lavagem nasal", es: "Suero fisiológico" },
    { en: "Sterile saline solution for cleaning the nose.", pt: "Solução salina para higiene nasal.", es: "Solución salina para la higiene nasal." });
  G("tenys-pe", "Talco Tenys Pé Baruel · 100 g", "higiene",
    { en: "Antiseptic foot powder", pt: "Talco desodorante para os pés", es: "Talco desodorante para pies" },
    { en: "Keeps feet and shoes fresh all day — fights 99% of fungi and bacteria.", pt: "Pés e calçados frescos o dia todo — combate 99% de fungos e bactérias.", es: "Pies y calzado frescos todo el día." },
    [["tenys-original", "Original", 5.99, "tenys-original"], ["tenys-canforado", "Canforado", 5.99, "tenys-canforado"], ["tenys-woman", "Woman", 5.99, "tenys-woman"]]);
  S("oleo-paixao", "Óleo Corporal Paixão · 100 ml", "higiene", 7.99, "oleo-paixao",
    { en: "Body oil with almond oil", pt: "Óleo deo corporal com amêndoas", es: "Aceite corporal con almendras" },
    { en: "24h hydration with a seductive Brazilian fragrance.", pt: "24h de hidratação com o perfume marcante da Paixão.", es: "24 h de hidratación con fragancia brasileña." });

  /* ---------- HAIR CARE ---------- */
  G("kit-cabelo", "Kit para Cabelos", "cabelo",
    { en: "Hair care kit", pt: "Kit de tratamento capilar", es: "Kit capilar" },
    { en: "Everything your hair needs in one kit.", pt: "Tudo o que o seu cabelo precisa num kit.", es: "Todo lo que tu cabello necesita en un kit." },
    [["kit-cacheados", "Cacheados · Olenka", 7.99, "kit-cacheados"], ["kit-liso", "Liso Perfeito · Seda", 7.99, "kit-liso"]]);
  S("seda-creme", "Seda Creme de Pentear Cachos · 300 ml", "cabelo", 9.98, "seda-creme",
    { en: "Leave-in curl cream", pt: "Creme de pentear para cachos", es: "Crema para peinar rizos" },
    { en: "Defined, hydrated curls with anti-frizz for 24h.", pt: "Cachos definidos e hidratados, sem frizz por 24h.", es: "Rizos definidos e hidratados, sin frizz 24 h." });

  /* ---------- NAILS ---------- */
  G("esmalte", "Esmalte", "unhas",
    { en: "Nail polish · assorted colours", pt: "Esmalte · cores variadas", "pt-PT": "Verniz · cores variadas", es: "Esmalte · colores surtidos" },
    { en: "Brazil’s favourite nail polishes — ask us for your colour.", pt: "Os esmaltes preferidos do Brasil — pergunte pela sua cor.", es: "Los esmaltes favoritos de Brasil — pregúntanos por tu color." },
    [["esmalte-risque", "Risqué", 4.00, "esmalte-risque"], ["esmalte-anita", "Anita", 4.60, "esmalte-anita"]]);
  S("pinca", "Pinça Ponta Fina Merheje", "unhas", 5.99, "pinca",
    { en: "Precision tweezers · stainless steel", pt: "Pinça de aço inox", es: "Pinzas de acero inoxidable" },
    { en: "Fine-point stainless steel tweezers.", pt: "Pinça de ponta fina em aço inox.", es: "Pinzas de punta fina de acero inoxidable." });
  S("tesoura", "Tesoura para Unhas Mundial", "unhas", 6.99, "tesoura",
    { en: "Nail scissors · Mundial Classic", pt: "Tesoura reta para unhas", es: "Tijeras para uñas" },
    { en: "Classic Mundial straight nail scissors.", pt: "Clássica tesoura reta da Mundial.", es: "Clásicas tijeras rectas Mundial." });

  const byId = Object.fromEntries(out.map(p => [p.id, p]));
  out.forEach(p => { if (p.isGroup) p.price = Math.min(...p.variants.map(v => byId[v].price)); });
  const order = window.GROUPS.home.map(g => g.id);
  out.sort((a, b) => order.indexOf(a.group) - order.indexOf(b.group) || a.price - b.price || a.name.localeCompare(b.name));
  window.PRODUCTS.push(...out);
  if (!window.CATEGORIES.includes("home")) window.CATEGORIES.push("home");
  const ORDER = ["all", "beef", "pork", "deli", "frozen", "candy", "drinks", "home"];
  window.CATEGORIES.sort((a, b) => (ORDER.indexOf(a) + 99) % 99 - (ORDER.indexOf(b) + 99) % 99);
})();
