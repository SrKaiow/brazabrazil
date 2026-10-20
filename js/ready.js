/* ============================================================
   BRAZABRAZIL — READY TO COOK (marinated & stuffed) + HOT PASTRY COUNTER
   ============================================================ */
window.GROUPS = window.GROUPS || {};
window.GROUPS.ready = [
  { id: "temperados", label: { en: "Marinated", "pt-BR": "Temperados", "pt-PT": "Temperados", es: "Marinados" } },
  { id: "recheados",  label: { en: "Stuffed",   "pt-BR": "Recheados",  "pt-PT": "Recheados",  es: "Rellenos" } }
];
window.GROUPS.estufa = [
  { id: "salgados", label: { en: "Hot savoury pastries", "pt-BR": "Salgados", "pt-PT": "Salgados", es: "Salados" } },
  { id: "doces",    label: { en: "Sweet pastries",       "pt-BR": "Doces",    "pt-PT": "Doces",    es: "Dulces" } }
];
(function () {
  const out = [];
  const L = (en, pt, es) => ({ en, pt, es });
  const K = (id, name, group, price, sub, desc, tags) =>
    out.push({ id, name, cat: "ready", group, unit: "kg", price, tags: tags || [], image: "assets/products/ready/" + id + ".webp", available: true, sub, desc });
  K("costela-marinada", "Costela Marinada", "temperados", 12.99, L("Marinated beef ribs · per kg", "Costela temperada · por kg", "Costilla marinada · por kg"), L("Seasoned and ready for the oven or the grill.", "Temperada e pronta para o forno ou a brasa.", "Sazonada y lista para el horno o la parrilla."));
  K("fraldinha-marinada", "Fraldinha Marinada", "temperados", 15.99, L("Marinated flank steak · per kg", "Fraldinha temperada · por kg", "Vacío marinado · por kg"), L("Our house marinade — straight onto the churrasco.", "Tempero da casa — direto para o churrasco.", "Marinada de la casa."), ["best"]);
  K("cupim-temperado", "Cupim Temperado", "temperados", 19.90, L("Seasoned cupim (zebu hump) · per kg", "Cupim temperado · por kg", "Cupim sazonado · por kg"), L("Slow-roast for hours until it melts.", "Asse devagar até desmanchar.", "Asar lento hasta deshacerse."));
  K("frango-recheado", "Frango Recheado", "recheados", 10.99, L("Stuffed chicken · per kg", "Frango recheado · por kg", "Pollo relleno · por kg"), L("Boneless stuffed chicken, ready to roast.", "Frango desossado e recheado, pronto para assar.", "Pollo deshuesado relleno, listo para asar."));
  K("lombo-recheado", "Lombo de Porco Recheado", "recheados", 11.99, L("Stuffed pork loin · per kg", "Lombo suíno recheado · por kg", "Lomo de cerdo relleno · por kg"), L("A Sunday-lunch showstopper.", "O destaque do almoço de domingo.", "La estrella del almuerzo del domingo."));
  K("costela-recheada", "Costela Recheada", "recheados", 13.99, L("Stuffed beef ribs · per kg", "Costela recheada · por kg", "Costilla rellena · por kg"), L("Ribs filled and seasoned, ready for the oven.", "Costela recheada e temperada, pronta para o forno.", "Costilla rellena lista para el horno."));
  K("fraldinha-recheada", "Fraldinha Recheada", "recheados", 15.99, L("Stuffed flank steak · per kg", "Fraldinha recheada · por kg", "Vacío relleno · por kg"), L("Rolled and stuffed — a churrasco favourite.", "Enrolada e recheada — sucesso no churrasco.", "Enrollado y relleno."), ["best"]);

  const E = "assets/products/estufa/";
  const ids = [];
  [["coxinha-estufa", "Coxinha de frango"], ["coxinha-catupiry-estufa", "Coxinha de frango com catupiry"], ["enroladinho-estufa", "Enroladinho de salsicha"],
   ["kibe-queijo-estufa", "Kibe com queijo"], ["kibe-estufa", "Kibe sem queijo"], ["risoles-carne", "Risoles de carne"], ["risoles-presunto", "Risoles de presunto e queijo"]].forEach(([vid, label]) => {
    ids.push(vid);
    out.push({ id: vid, name: "Salgado da Estufa · " + label, optionLabel: label, parent: "salgado-estufa", hidden: true, cat: "estufa", group: "salgados", unit: "each", price: 3.00, tags: [], image: E + vid + ".webp", available: true,
      sub: L("Freshly fried, from our hot counter", "Fritinho na hora, da nossa estufa", "Recién frito"), desc: L("Brazilian savoury snacks, made by Beth’s and served hot.", "Salgados Beth’s, servidos quentinhos.", "Salados brasileños servidos calientes.") });
  });
  out.push({ id: "salgado-estufa", name: "Salgado da Estufa", cat: "estufa", group: "salgados", unit: "each", price: 3.00, isGroup: true, variants: ids, tags: ["best"], image: E + "coxinha-estufa.webp", available: true,
    sub: L("Freshly fried, from our hot counter", "Fritinho na hora, da nossa estufa", "Recién frito"), desc: L("Coxinha, kibe, risoles and more — served hot.", "Coxinha, kibe, risoles e mais — servidos quentinhos.", "Coxinha, kibe y más.") });
  out.push({ id: "pao-queijo-assado", name: "Pão de Queijo Assado", cat: "estufa", group: "salgados", unit: "each", price: 2.50, tags: ["gf"], image: E + "pao-queijo-assado.webp", available: true,
    sub: L("Freshly baked cheese bread", "Pão de queijo quentinho", "Pan de queso recién horneado"), desc: L("Warm from the oven.", "Saído do forno.", "Recién salido del horno.") });
  out.push({ id: "salgados-assados", name: "Salgados Assados", cat: "estufa", group: "salgados", unit: "each", price: 3.30, tags: [], image: E + "salgados-assados.webp", available: true,
    sub: L("Baked savoury pastries", "Salgados assados", "Salados horneados"), desc: L("Baked, not fried.", "Assados, não fritos.", "Horneados, no fritos.") });
  out.push({ id: "pastel-nata", name: "Pastel de Nata", cat: "estufa", group: "doces", unit: "each", price: 1.10, tags: ["portuguese"], image: E + "pastel-nata.webp", available: true,
    sub: L("Portuguese custard tart", "Pastel de nata", "Pastel de nata"), desc: L("Crispy pastry, creamy custard — finish with cinnamon.", "Massa folhada estaladiça e creme — com canela.", "Hojaldre crujiente y crema.") });

  const order = { temperados: 0, recheados: 1, salgados: 0, doces: 1 };
  out.sort((a, b) => a.cat.localeCompare(b.cat) || order[a.group] - order[b.group] || a.price - b.price);
  window.PRODUCTS.push(...out);
  ["ready", "estufa"].forEach(c => { if (!window.CATEGORIES.includes(c)) window.CATEGORIES.push(c); });
})();
