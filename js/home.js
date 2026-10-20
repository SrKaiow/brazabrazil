/* ============================================================
   BRAZABRAZIL — CLEANING & PERSONAL CARE (real shop prices)
   G(...) = one card with options · S(...) = single product
   ============================================================ */

window.GROUPS = window.GROUPS || {};
window.GROUPS.home = [
  { id: "limpeza", label: { en: "Cleaning & laundry", "pt-BR": "Limpeza & lavanderia", "pt-PT": "Limpeza & lavandaria", es: "Limpieza y lavandería" } },
  { id: "higiene", label: { en: "Personal care",      "pt-BR": "Higiene pessoal",      "pt-PT": "Higiene pessoal",      es: "Higiene personal" } },
  { id: "farmacia", label: { en: "Pharmacy & first aid", "pt-BR": "Farmácia & primeiros socorros", "pt-PT": "Farmácia & primeiros socorros", es: "Farmacia y primeros auxilios" } },
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
  S("soro", "Soro Fisiológico AGA · 100 ml", "farmacia", 2.50, "soro",
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

  /* ---------- batch 2 ---------- */
  S("bombril", "Bombril · 8 un", "limpeza", 2.20, "bombril",
    { en: "Steel wool scourers · 60 g", pt: "Esponja de aço · 60 g", es: "Estropajo de acero · 60 g" },
    { en: "The original ‘1001 utilidades’ steel wool for pans and grills.", pt: "A original esponja de aço de 1001 utilidades.", es: "El estropajo original de las 1001 utilidades." });
  S("bucha", "Bucha para Banho Natural", "higiene", 3.50, "bucha",
    { en: "Natural loofah sponge", pt: "Bucha vegetal natural", es: "Esponja de lufa natural" },
    { en: "100% natural loofah for gentle exfoliation.", pt: "Bucha vegetal 100% natural para esfoliar.", es: "Lufa 100% natural para exfoliar." }, { tags: ["vegan"] });
  S("leite-rosas", "Leite de Rosas Tradicional · 310 ml", "higiene", 4.80, "leite-rosas",
    { en: "Classic Brazilian deodorant lotion", pt: "Desodorante clássico desde 1929", es: "Loción desodorante clásica" },
    { en: "The iconic pink bottle every Brazilian grandmother had — since 1929.", pt: "O frasco cor-de-rosa que toda avó tinha — desde 1929.", es: "El icónico frasco rosa de todas las abuelas brasileñas." });
  G("agua-oxigenada-g", "Água Oxigenada 10 vol.", "farmacia",
    { en: "Hydrogen peroxide · antiseptic", pt: "Antisséptico", es: "Agua oxigenada · antiséptico" },
    { en: "Antiseptic for cleaning small cuts and grazes.", pt: "Antisséptico para limpar pequenos cortes e arranhões.", es: "Antiséptico para pequeños cortes." },
    [["agua-oxigenada", "ADV Farma · 100 ml", 1.99, "agua-oxigenada"], ["agua-oxigenada-hidro", "Hidro · 250 ml", 2.50, "agua-oxigenada-hidro"]]);
  S("alcool", "Álcool Etílico 96%", "farmacia", 2.99, "alcool",
    { en: "Ethyl alcohol 96%", pt: "Álcool etílico 96%", es: "Alcohol etílico 96%" },
    { en: "Multipurpose ethyl alcohol for cleaning and disinfecting.", pt: "Álcool para limpeza e desinfecção.", es: "Alcohol para limpieza y desinfección." });
  S("eno", "Sal de Fruta Eno Tradicional", "farmacia", 8.99, "eno",
    { en: "Antacid fruit salts", pt: "Sal de fruta · azia e má digestão", es: "Sal de frutas · antiácido" },
    { en: "Fast relief from heartburn and indigestion.", pt: "Alívio rápido da azia e má digestão.", es: "Alivio rápido de la acidez." });
  S("acetona", "Removedor de Esmalte Be Beauty", "unhas", 3.20, "acetona",
    { en: "Acetone-free nail polish remover", pt: "Acetona sem acetona · removedor", es: "Quitaesmalte sin acetona" },
    { en: "Gentle, acetone-free remover with pump dispenser.", pt: "Removedor suave, sem acetona, com dosador.", es: "Quitaesmalte suave sin acetona con dosificador." });
  G("cortador", "Cortador de Unhas", "unhas",
    { en: "Nail clipper", pt: "Cortador de unhas", es: "Cortaúñas" },
    { en: "Chrome-plated nail clipper for a precise cut.", pt: "Cortador cromado para um corte preciso.", es: "Cortaúñas cromado de corte preciso." },
    [["cortador-p", "Pequeno · Mundial", 3.99, "cortador-p"], ["cortador-g", "Grande · Lanossi", 4.50, "cortador-g"]]);
  G("alicate", "Alicate de Cutícula Mundial", "unhas",
    { en: "Cuticle nipper", pt: "Alicate para cutículas", es: "Alicate para cutículas" },
    { en: "Professional Brazilian cuticle nippers — sharp and precise.", pt: "Alicate profissional — afiado e preciso.", es: "Alicate profesional — afilado y preciso." },
    [["alicate-vermelho", "Ponto Vermelho", 14.00, "alicate-vermelho"], ["alicate-preto", "Professional 722 (preto)", 16.00, "alicate-preto"]]);

  S("mistolin", "Mistolin Tira-Gorduras Original · 545 ml", "limpeza", 7.50, "mistolin",
    { en: "Kitchen degreaser spray", pt: "Desengordurante em spray", "pt-PT": "Tira-gorduras", es: "Desengrasante en spray" },
    { en: "Portugal’s No.1 degreaser — cuts through grease on hobs, ovens and extractor hoods.", pt: "O tira-gorduras nº 1 de Portugal — limpa fogão, forno e exaustor.", es: "El desengrasante nº 1 de Portugal." }, { tags: ["portuguese"] });
  G("kolene", "Kolene", "cabelo",
    { en: "Brazilian hair care", pt: "Cuidados para os cabelos", es: "Cuidado capilar brasileño" },
    { en: "Kolene — Brazilian hair care since forever. Choose your treatment.", pt: "Kolene, desde sempre — escolha o tratamento ideal para o seu cabelo.", es: "Kolene — cuidado capilar brasileño. Elige tu tratamiento." },
    [["kolene-danos", "Danos Extremos · óleo em creme 200 ml", 9.40, "kolene-danos"],
     ["kolene-cronograma", "Creme de pentear Cronograma · 500 ml", 9.49, "kolene-cronograma"],
     ["kolene-original", "Creme de pentear Original · 500 ml", 9.50, "kolene-original"],
     ["kolene-curvaturas", "Creme de tratamento Curvaturas · 1 kg", 14.50, "kolene-curvaturas"]]);
  S("kolene-kids", "Kolene Cachinhos · Kit Kids", "cabelo", 14.99, "kolene-kids",
    { en: "Kids’ curly hair kit", pt: "Kit infantil para cachinhos", es: "Kit infantil para rizos" },
    { en: "Gentle hydrating line for children’s curls — coconut oil, aloe vera and vitamins.", pt: "Linha suave para cachinhos — óleo de coco, aloe vera e vitaminas.", es: "Línea suave para rizos infantiles." });

  S("sos-cachos", "Salon Line S.O.S Cachos Óleo de Manga · 500 g", "cabelo", 14.99, "sos-cachos",
    { en: "Curl activator · mango oil", pt: "Ativador de cachos · óleo de manga", es: "Activador de rizos · aceite de mango" },
    { en: "Ultra-hydrating curl activator for defined, frizz-free curls.", pt: "Ativador de cachos ultra-hidratante — definição, brilho e antifrizz.", es: "Activador de rizos ultrahidratante, sin frizz." });

  const byId = Object.fromEntries(out.map(p => [p.id, p]));
  out.forEach(p => { if (p.isGroup) { const ps = p.variants.map(v => byId[v].price).filter(x => x > 0); p.price = ps.length ? Math.min(...ps) : 0; } });
  const order = window.GROUPS.home.map(g => g.id);
  out.sort((a, b) => order.indexOf(a.group) - order.indexOf(b.group) || a.price - b.price || a.name.localeCompare(b.name));
  window.PRODUCTS.push(...out);
  if (!window.CATEGORIES.includes("home")) window.CATEGORIES.push("home");
  const ORDER = ["all", "beef", "pork", "deli", "frozen", "candy", "drinks", "home"];
  window.CATEGORIES.sort((a, b) => (ORDER.indexOf(a) + 99) % 99 - (ORDER.indexOf(b) + 99) % 99);
})();
