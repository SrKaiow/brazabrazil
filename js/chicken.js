/* ============================================================
   BRAZABRAZIL — CHICKEN (real shop prices)
   ============================================================ */
window.GROUPS = window.GROUPS || {};
window.GROUPS.chicken = [
  { id: "cortes", label: { en: "Chicken cuts & giblets", "pt-BR": "Cortes & miúdos", "pt-PT": "Cortes & miudezas", es: "Cortes y menudencias" } },
  { id: "ovos",   label: { en: "Eggs",                   "pt-BR": "Ovos",            "pt-PT": "Ovos",               es: "Huevos" } }
];
(function () {
  const I = f => "assets/products/chicken/" + f + ".webp";
  const out = [];
  const S = (id, name, group, price, unit, image, sub, desc, extra) =>
    out.push(Object.assign({ id, name, cat: "chicken", group, unit, price, tags: [], image: I(image), available: true, sub, desc }, extra || {}));
  const G = (id, name, group, sub, desc, variants, extra) => {
    const ids = [];
    variants.forEach(([vid, label, price, image, unit]) => {
      ids.push(vid);
      out.push({ id: vid, name: name + " · " + label, optionLabel: label, parent: id, hidden: true, cat: "chicken", group,
                 unit: unit || "kg", price, tags: [], image: I(image), available: true, sub, desc });
    });
    out.push(Object.assign({ id, name, cat: "chicken", group, unit: "kg", isGroup: true, variants: ids, tags: [],
                 image: I(variants[0][3]), available: true, sub, desc }, extra || {}));
  };
  G("asinha", "Asinha de Frango", "cortes",
    { en: "Chicken wings · per kg", pt: "Asa de frango · por kg", es: "Alitas de pollo · por kg" },
    { en: "Season with garlic and lime and grill until golden — a churrasco must.", pt: "Tempere com alho e limão e asse até dourar — não pode faltar no churrasco.", es: "Adoba con ajo y lima y asa hasta dorar." },
    [["asinha-promo", "Promoção", 4.99, "asinha-promo"], ["asinha-caipira", "Caipira (corn fed)", 6.99, "asinha-caipira"]], { tags: ["best"] });
  S("pe-galinha", "Pé de Galinha", "cortes", 4.99, "kg", "pe-galinha",
    { en: "Chicken feet · per kg", pt: "Pé de frango · por kg", es: "Patas de pollo · por kg" },
    { en: "Full of collagen — perfect for broths and canja.", pt: "Rico em colágeno — perfeito para caldos e canja.", es: "Rico en colágeno — ideal para caldos." });
  S("coracao-galinha", "Coração de Galinha", "cortes", 5.99, "kg", "coracao-galinha",
    { en: "Chicken hearts · per kg", pt: "Coraçãozinho · por kg", es: "Corazones de pollo · por kg" },
    { en: "Skewered and grilled — a must at every Brazilian barbecue.", pt: "No espeto e na brasa — não pode faltar no churrasco.", es: "En brocheta y a la brasa — imprescindible en el churrasco." }, { tags: ["classic"] });
  S("moela", "Moela", "cortes", 5.99, "kg", "moela",
    { en: "Chicken gizzards · per kg", pt: "Moela de frango · por kg", es: "Mollejas de pollo · por kg" },
    { en: "Slow-cooked in tomato sauce, the classic boteco snack.", pt: "Moela ao molho, o petisco clássico de boteco.", es: "Mollejas guisadas, el aperitivo clásico de bar." });
  S("ovo-codorna", "Ovo de Codorna · dúzia", "ovos", 2.99, "each", "ovo-codorna",
    { en: "Quail eggs · 12", pt: "Ovos de codorna · 12 un", es: "Huevos de codorniz · 12" },
    { en: "Boil, peel and serve as a snack or in salads.", pt: "Cozinhe, descasque e sirva como petisco ou na salada.", es: "Cocer, pelar y servir como aperitivo o en ensaladas." });
  const byId = Object.fromEntries(out.map(p => [p.id, p]));
  out.forEach(p => { if (p.isGroup) p.price = Math.min(...p.variants.map(v => byId[v].price)); });
  const order = window.GROUPS.chicken.map(g => g.id);
  out.sort((a, b) => order.indexOf(a.group) - order.indexOf(b.group) || a.price - b.price || a.name.localeCompare(b.name));
  window.PRODUCTS.push(...out);
  if (!window.CATEGORIES.includes("chicken")) window.CATEGORIES.push("chicken");
})();
