/* BrazaBrazil — customer order tracking page (/pedido/?t=…) */
(function () {
  "use strict";
  const $ = s => document.querySelector(s);
  const esc = v => String(v ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const money = n => "£" + (Number(n) || 0).toFixed(2);
  const q = new URLSearchParams(location.search);
  const token = q.get("t") || "", session = q.get("s") || "";
  let lang = "en";
  try { const s = localStorage.getItem("bb_lang"); if (s) lang = s; else if (/^pt/i.test(navigator.language)) lang = /PT$/i.test(navigator.language) ? "pt-PT" : "pt-BR"; else if (/^es/i.test(navigator.language)) lang = "es"; } catch {}
  const T = {
    en: { title: "Your order", hi: "Thank you", ref: "Order", paid: "Payment confirmed — thank you!", wait: "Confirming your payment…", unpaid: "Awaiting payment — the shop will confirm it with you.",
      cancelled: "This order was cancelled. If you were charged, the shop will refund you.", refunded: "This order was refunded.", late: "Running a little late — sorry! We are on it.",
      steps: "Order status", items: "Your items", subtotal: "Subtotal", delivery: "Delivery", total: "Total", collect: "Collection at 31 South Street, Epsom", deliver: "Delivery",
      novo: "Order received", aceito: "Accepted by the shop", preparando: "Being prepared", pronto: "Ready for collection", saiu: "Out for delivery", entregue_c: "Collected", entregue_d: "Delivered",
      shop: "Back to the shop", wa: "Message the shop", save: "Keep this link to follow your order. This page updates on its own.", notfound: "We couldn't find this order. Please check the link or message the shop.", day: "Preferred day" },
    "pt-BR": { title: "Seu pedido", hi: "Obrigado", ref: "Pedido", paid: "Pagamento confirmado — obrigado!", wait: "Confirmando seu pagamento…", unpaid: "Aguardando pagamento — a loja vai confirmar com você.",
      cancelled: "Este pedido foi cancelado. Se houve cobrança, a loja faz o reembolso.", refunded: "Este pedido foi reembolsado.", late: "Seu pedido está um pouco atrasado — desculpe! Já estamos cuidando.",
      steps: "Andamento do pedido", items: "Seus itens", subtotal: "Subtotal", delivery: "Entrega", total: "Total", collect: "Retirada na 31 South Street, Epsom", deliver: "Entrega",
      novo: "Pedido recebido", aceito: "Aceito pela loja", preparando: "Em preparo", pronto: "Pronto para retirada", saiu: "Saiu para entrega", entregue_c: "Retirado", entregue_d: "Entregue",
      shop: "Voltar à loja", wa: "Falar com a loja", save: "Guarde este link para acompanhar seu pedido. A página se atualiza sozinha.", notfound: "Não encontramos este pedido. Confira o link ou fale com a loja.", day: "Dia preferido" },
    "pt-PT": { title: "A sua encomenda", hi: "Obrigado", ref: "Encomenda", paid: "Pagamento confirmado — obrigado!", wait: "A confirmar o seu pagamento…", unpaid: "A aguardar pagamento — a loja vai confirmar consigo.",
      cancelled: "Esta encomenda foi cancelada. Se houve cobrança, a loja faz o reembolso.", refunded: "Esta encomenda foi reembolsada.", late: "A sua encomenda está um pouco atrasada — desculpe! Já estamos a tratar.",
      steps: "Estado da encomenda", items: "Os seus artigos", subtotal: "Subtotal", delivery: "Entrega", total: "Total", collect: "Levantamento na 31 South Street, Epsom", deliver: "Entrega",
      novo: "Encomenda recebida", aceito: "Aceite pela loja", preparando: "Em preparação", pronto: "Pronta para levantar", saiu: "Saiu para entrega", entregue_c: "Levantada", entregue_d: "Entregue",
      shop: "Voltar à loja", wa: "Falar com a loja", save: "Guarde este link para acompanhar a encomenda. A página atualiza-se sozinha.", notfound: "Não encontrámos esta encomenda. Verifique o link ou fale com a loja.", day: "Dia preferido" },
    es: { title: "Tu pedido", hi: "Gracias", ref: "Pedido", paid: "Pago confirmado — ¡gracias!", wait: "Confirmando tu pago…", unpaid: "Pendiente de pago — la tienda lo confirmará contigo.",
      cancelled: "Este pedido fue cancelado. Si hubo cobro, la tienda lo reembolsará.", refunded: "Este pedido fue reembolsado.", late: "Tu pedido va con un poco de retraso — ¡lo sentimos!",
      steps: "Estado del pedido", items: "Tus productos", subtotal: "Subtotal", delivery: "Envío", total: "Total", collect: "Recogida en 31 South Street, Epsom", deliver: "Envío",
      novo: "Pedido recibido", aceito: "Aceptado por la tienda", preparando: "En preparación", pronto: "Listo para recoger", saiu: "En reparto", entregue_c: "Recogido", entregue_d: "Entregado",
      shop: "Volver a la tienda", wa: "Escribir a la tienda", save: "Guarda este enlace para seguir tu pedido. La página se actualiza sola.", notfound: "No encontramos este pedido. Revisa el enlace o escribe a la tienda.", day: "Día preferido" }
  };
  const L = T[lang] || T.en;
  document.documentElement.lang = lang === "en" ? "en-GB" : lang;
  $("#backLink").textContent = L.shop;
  const WA = "447766343534";
  const fmt = t => new Date(t).toLocaleString(lang === "en" ? "en-GB" : lang, { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

  function render(o) {
    const del = o.mode === "delivery";
    const flow = del ? ["novo", "aceito", "preparando", "saiu", "entregue"] : ["novo", "aceito", "preparando", "pronto", "entregue"];
    const when = {}; (o.history || []).forEach(h => { if (!when[h.s]) when[h.s] = h.at; });
    const cur = o.fulfil === "atrasado" ? ((o.history || []).filter(h => flow.includes(h.s)).pop() || { s: "novo" }).s : o.fulfil;
    const idx = Math.max(0, flow.indexOf(cur));
    const stopped = o.status === "cancelled" || o.status === "refunded";
    const banner = stopped ? `<div class="banner banner--bad">${L[o.status]}</div>`
      : o.status === "pending" ? `<div class="banner banner--wait">${L.wait}</div>`
      : o.status === "whatsapp" ? `<div class="banner banner--wait">${L.unpaid}</div>`
      : `<div class="banner banner--ok">${L.paid}</div>`;
    const steps = flow.map((s, i) => {
      const label = s === "entregue" ? (del ? L.entregue_d : L.entregue_c) : L[s];
      const cls = stopped ? "" : i < idx || (i === idx && s === "entregue") ? "done" : i === idx ? "now" : "";
      const t = when[s] || (s === "novo" ? o.created : null);
      return `<li class="${cls}"><span class="dot">${cls === "done" ? "✓" : i + 1}</span><span><b>${esc(label)}</b>${t && (cls || s === "novo") ? `<small>${esc(fmt(t))}</small>` : ""}</span></li>`;
    }).join("");
    $("#app").innerHTML = `
      <div><h1>${esc(L.hi)}${o.name ? ", " + esc(o.name) : ""}!</h1><p class="ref">${esc(L.ref)} #${esc(o.ref)} · ${esc(fmt(o.created))}</p></div>
      ${banner}
      ${o.fulfil === "atrasado" && !stopped ? `<div class="banner banner--wait">${L.late}</div>` : ""}
      <section class="card"><h2>${L.steps}</h2><ol class="steps">${steps}</ol>
        <p class="muted" style="margin:14px 0 0">${del ? esc(L.deliver) + (o.postcode ? " · " + esc(o.postcode) : "") : esc(L.collect)}${o.day ? " · " + esc(L.day) + ": " + esc(o.day) : ""}</p></section>
      <section class="card"><h2>${L.items}</h2><ul class="items">${(o.items || []).map(i => `<li><span>${esc(i.name)} <span class="muted">× ${esc(i.unit === "kg" ? i.qty + " kg" : i.qty)}</span></span><span>${money(i.total)}</span></li>`).join("")}</ul>
        ${o.fee ? `<div class="sub" style="margin-top:8px"><span>${L.subtotal}</span><span>${money(o.subtotal)}</span></div><div class="sub"><span>${L.delivery}</span><span>${money(o.fee)}</span></div>` : ""}
        <div class="tot"><span>${L.total}</span><span>${money(o.total)}</span></div></section>
      <div class="row"><a class="btn btn--wa" href="https://wa.me/${WA}?text=${encodeURIComponent(L.ref + " #" + o.ref + " — " + location.href)}" target="_blank" rel="noopener">${L.wa}</a><a class="btn" href="/">${L.shop}</a></div>
      <p class="muted">${L.save}</p>`;
    // paid: the basket on the shop is now empty
    if (o.status === "paid" || o.status === "paid_shop") { try { localStorage.removeItem("bb_cart"); localStorage.removeItem("bb_pending"); } catch {} }
    return o.fulfil !== "entregue" && !stopped;
  }

  let timer;
  async function load(first) {
    try {
      const r = await fetch("/api/track?t=" + encodeURIComponent(token) + (session && first ? "&s=" + encodeURIComponent(session) : ""), { cache: "no-store" });
      if (!r.ok) throw new Error(r.status);
      const { order } = await r.json();
      const live = render(order);
      // remove the payment session from the address so the link is clean to share
      if (session) history.replaceState(null, "", location.pathname + "?t=" + token);
      clearTimeout(timer);
      if (live) timer = setTimeout(load, order.status === "pending" ? 4000 : 30000);
    } catch (e) {
      if (first) $("#app").innerHTML = `<div class="card"><h1>${L.title}</h1><p>${L.notfound}</p><a class="btn btn--fill" href="/">${L.shop}</a></div>`;
      else timer = setTimeout(load, 30000);
    }
  }
  $("#foot").textContent = "BrazaBrazil · 31 South Street, Epsom KT18 7PJ · 07766 343534";
  if (!/^[a-f0-9]{24}$/.test(token)) $("#app").innerHTML = `<div class="card"><h1>${L.title}</h1><p>${L.notfound}</p><a class="btn btn--fill" href="/">${L.shop}</a></div>`;
  else load(true);
})();
