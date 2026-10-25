/* ============================================================
   BRAZABRAZIL — ADMIN PANEL (browser side)
   All data comes from /api/admin/* and needs a login session.
   Every text that comes from customers is escaped before showing.
   ============================================================ */
(function () {
  "use strict";
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const esc = v => String(v ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const money = n => { const v = Number(n) || 0; return (v < 0 ? "−" : "") + "£" + Math.abs(v).toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); };
  const money0 = n => { const v = Math.round(Number(n) || 0); return (v < 0 ? "−" : "") + "£" + Math.abs(v).toLocaleString("en-GB"); };
  const DAY = 86400000;
  const fmtDate = t => new Date(t).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "2-digit" });
  const fmtDT = t => new Date(t).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
  const isoDay = t => { const d = new Date(t); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); };
  const CAT = { beef: "Bovinos", pork: "Suínos", chicken: "Frango", ready: "Temperados & recheados", deli: "Embutidos & defumados", dairy: "Laticínios & frios",
    fish: "Peixes & bacalhau", frozen: "Congelados", estufa: "Salgados da estufa", groceries: "Mercearia", sauces: "Temperos & molhos", breakfast: "Café, chás & biscoitos",
    candy: "Doces & chocolates", snacks: "Salgadinhos", drinks: "Bebidas", kitchen: "Utensílios & casa", home: "Limpeza & higiene", boxes: "Kits" };
  const STATUS = { paid: "Pago online", paid_shop: "Pago na loja", pending: "Aguardando pagamento", whatsapp: "WhatsApp · a pagar", cancelled: "Cancelado", refunded: "Reembolsado" };
  const FULFIL = { novo: "Recebido", aceito: "Aceito", preparando: "Preparando", pronto: "Pronto p/ retirada", saiu: "Saiu para entrega", atrasado: "Atrasado", entregue: "Entregue / retirado" };
  const PAID = new Set(["paid", "paid_shop"]);
  const OPEN = new Set(["pending", "whatsapp"]);

  const st = { me: null, products: [], ov: {}, orders: [], ledger: [], cats: [], audit: [], view: "overview", open: null,
               pf: { q: "", cat: "", chip: "all" }, of: { q: "", status: "", fulfil: "" }, cq: "" };

  /* ---------- API ---------- */
  async function api(path, body) {
    const opt = body === undefined ? { credentials: "same-origin" }
      : { method: "POST", credentials: "same-origin", headers: { "content-type": "application/json" }, body: JSON.stringify(body) };
    const r = await fetch("/api/admin/" + path, opt);
    const d = await r.json().catch(() => ({}));
    if (r.status === 401 && path !== "login") { showLogin(); throw new Error("unauthorized"); }
    if (!r.ok) { const e = new Error(d.error || "error"); e.status = r.status; e.data = d; throw e; }
    return d;
  }
  let tt; const toast = m => { const t = $("#toast"); t.textContent = m; t.classList.add("show"); clearTimeout(tt); tt = setTimeout(() => t.classList.remove("show"), 2400); };

  /* ---------- auth ---------- */
  function showLogin() { $("#app").hidden = true; $("#setup").hidden = true; $("#login").hidden = false; $("#lgUser").focus(); }
  $("#loginForm").addEventListener("submit", async e => {
    e.preventDefault(); $("#lgErr").textContent = ""; $("#lgBtn").disabled = true;
    try { await api("login", { user: $("#lgUser").value, pass: $("#lgPass").value }); $("#lgPass").value = ""; await boot(); }
    catch (err) { $("#lgErr").textContent = err.message === "locked" ? "Muitas tentativas. Aguarde 15 minutos." : err.status === 503 ? "Banco de dados não conectado." : "Usuário ou senha incorretos."; }
    $("#lgBtn").disabled = false;
  });
  $("#logout").addEventListener("click", async () => { try { await api("logout", {}); } catch {} showLogin(); });

  /* ---------- period ---------- */
  function range() {
    const v = $("#period").value, n = new Date(), start = new Date(n.getFullYear(), n.getMonth(), n.getDate()).getTime(), end = start + DAY;
    if (v === "today") return [start, end, "hoje"];
    if (v === "month") return [new Date(n.getFullYear(), n.getMonth(), 1).getTime(), end, "este mês"];
    if (v === "lastmonth") return [new Date(n.getFullYear(), n.getMonth() - 1, 1).getTime(), new Date(n.getFullYear(), n.getMonth(), 1).getTime(), "mês passado"];
    if (v === "all") return [0, end, "todo o período"];
    return [end - Number(v) * DAY, end, `últimos ${v} dias`];
  }
  const inRange = (t, [a, b]) => t >= a && t < b;
  const ordersIn = r => st.orders.filter(o => inRange(o.created, r));
  const paidIn = r => st.orders.filter(o => PAID.has(o.status) && inRange(o.paid_at || o.created, r));
  const ledgerIn = r => st.ledger.filter(l => { const t = new Date(l.date + "T12:00:00").getTime(); return inRange(t, r); });

  /* ---------- load ---------- */
  async function loadAll() {
    const [c, o, l] = await Promise.all([api("catalog"), api("orders?from=0"), api("ledger")]);
    st.products = c.products; st.ov = c.overrides || {}; st.orders = o.orders; st.ledger = l.entries; st.cats = l.categories;
    const open = st.orders.filter(x => (PAID.has(x.status) || OPEN.has(x.status)) && x.fulfil !== "entregue" && x.status !== "cancelled").length;
    $("#badgeOrders").hidden = !open; $("#badgeOrders").textContent = open;
  }
  async function boot() {
    try { st.me = await api("me"); }
    catch (e) { if (e.status === 503) { $("#login").hidden = true; $("#setup").hidden = false; } return; }
    $("#login").hidden = true; $("#setup").hidden = true; $("#app").hidden = false;
    $("#meUser").textContent = st.me.user;
    $("#pwAlert").hidden = !st.me.defaultPassword;
    $("#stripeAlert").hidden = !!st.me.stripe;
    await loadAll();
    go(location.hash.slice(1) || "overview");
  }

  /* ---------- navigation ---------- */
  const TITLES = { overview: "Visão geral", orders: "Pedidos", products: "Produtos & preços", finance: "Financeiro", customers: "Clientes", reports: "Relatórios", activity: "Atividade", settings: "Configurações" };
  function go(v) {
    if (!TITLES[v]) v = "overview";
    st.view = v; history.replaceState(null, "", "#" + v);
    $$("#nav button").forEach(b => b.dataset.view === v ? b.setAttribute("aria-current", "page") : b.removeAttribute("aria-current"));
    $$(".view").forEach(s => s.hidden = s.id !== "v-" + v);
    $("#viewTitle").textContent = TITLES[v];
    $("#period").parentElement.style.visibility = ["products", "activity", "settings"].includes(v) ? "hidden" : "";
    render();
  }
  $("#nav").addEventListener("click", e => { const b = e.target.closest("button[data-view]"); if (b) go(b.dataset.view); });
  document.addEventListener("click", e => { const g = e.target.closest("[data-goto]"); if (g) go(g.dataset.goto); });
  $("#period").addEventListener("change", render);
  $("#refresh").addEventListener("click", async () => { await loadAll(); render(); toast("Dados atualizados"); });
  const R = { overview, orders, products, finance, customers, reports, activity, settings };
  function render() { R[st.view](); }

  /* ---------- charts (plain SVG, theme-aware) ---------- */
  function barChart(series, opts = {}) {
    // series: [{label, values:[...]}] where values align with opts.colors
    const W = 760, H = opts.h || 220, padL = 46, padB = 26, padT = 10, colors = opts.colors || ["var(--navy)"];
    const max = Math.max(1, ...series.flatMap(s => s.values));
    const nice = (() => { const p = Math.pow(10, Math.floor(Math.log10(max))); for (const m of [1, 2, 2.5, 5, 10]) if (m * p >= max) return m * p; return 10 * p; })();
    const n = series.length, gw = (W - padL - 6) / Math.max(n, 1), k = series[0] ? series[0].values.length : 1;
    const bw = Math.max(2, Math.min(28, gw * 0.75 / k));
    let g = '<g class="grid">';
    for (let i = 0; i <= 4; i++) { const y = padT + (H - padT - padB) * (1 - i / 4); g += `<line x1="${padL}" x2="${W}" y1="${y}" y2="${y}"/><text x="${padL - 6}" y="${y + 4}" text-anchor="end">${money0(nice * i / 4)}</text>`; }
    g += "</g>";
    const step = Math.ceil(n / (opts.maxLabels || 12));
    series.forEach((s, i) => {
      const x0 = padL + gw * i + (gw - bw * k) / 2;
      s.values.forEach((v, j) => {
        const h = (H - padT - padB) * v / nice;
        g += `<rect x="${x0 + j * bw}" y="${H - padB - h}" width="${bw - (k > 1 ? 2 : 1)}" height="${Math.max(h, v > 0 ? 1 : 0)}" rx="2" fill="${colors[j]}"><title>${esc(s.label)}: ${money(v)}</title></rect>`;
      });
      if (i % step === 0) g += `<text x="${padL + gw * i + gw / 2}" y="${H - 8}" text-anchor="middle">${esc(s.label)}</text>`;
    });
    return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(opts.aria || "gráfico")}">${g}</svg>`;
  }
  function hbars(rows, fmt = money) {
    if (!rows.length) return '<p class="empty">Sem dados no período.</p>';
    const max = Math.max(...rows.map(r => r[1]), 1);
    return rows.map(([l, v, extra]) => `<div class="hbar"><span>${esc(l)}</span><span class="hbar__t"><i style="width:${(v / max * 100).toFixed(1)}%"></i></span><b>${fmt(v)}${extra ? ` <small class="muted">${esc(extra)}</small>` : ""}</b></div>`).join("");
  }
  function dailySeries(list, r, valueFn) {
    const [a, b] = r; const days = Math.min(Math.max(1, Math.round((b - Math.max(a, firstOrderDay())) / DAY)), 400);
    const startT = b - days * DAY; const map = {};
    list.forEach(o => { const k = isoDay(o.paid_at || o.created); map[k] = (map[k] || 0) + valueFn(o); });
    const out = [];
    if (days > 62) { // group by month
      const m = {}; list.forEach(o => { const d = new Date(o.paid_at || o.created); const k = d.getFullYear() + "-" + (d.getMonth() + 1); m[k] = (m[k] || 0) + valueFn(o); });
      const s = new Date(startT); for (let d = new Date(s.getFullYear(), s.getMonth(), 1); d.getTime() < b; d.setMonth(d.getMonth() + 1)) {
        const k = d.getFullYear() + "-" + (d.getMonth() + 1); out.push({ label: d.toLocaleDateString("pt-BR", { month: "short" }), values: [m[k] || 0] }); }
      return out;
    }
    for (let t = startT; t < b; t += DAY) { const k = isoDay(t); out.push({ label: new Date(t).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }), values: [map[k] || 0] }); }
    return out;
  }
  const firstOrderDay = () => st.orders.length ? Math.min(...st.orders.map(o => o.created)) - DAY : Date.now() - 30 * DAY;

  /* ---------- aggregates ---------- */
  function productTotals(list) {
    const m = {};
    list.forEach(o => (o.items || []).forEach(it => { const x = m[it.id] || (m[it.id] = { id: it.id, name: it.name, cat: it.cat, unit: it.unit, qty: 0, total: 0, orders: 0 }); x.qty += it.qty; x.total += it.total; x.orders++; }));
    return Object.values(m).sort((a, b) => b.total - a.total);
  }
  function catTotals(list) {
    const m = {}; list.forEach(o => (o.items || []).forEach(it => { m[it.cat] = (m[it.cat] || 0) + it.total; }));
    return Object.entries(m).map(([c, v]) => [CAT[c] || c, v]).sort((a, b) => b[1] - a[1]);
  }
  const sum = (a, f) => a.reduce((s, x) => s + (f ? f(x) : x), 0);

  /* ---------- VISÃO GERAL ---------- */
  function overview() {
    const r = range(), paid = paidIn(r), all = ordersIn(r), led = ledgerIn(r);
    const rev = sum(paid, o => o.total), n = paid.length, avg = n ? rev / n : 0;
    const otherIn = sum(led.filter(l => l.type === "in"), l => l.amount), out = sum(led.filter(l => l.type === "out"), l => l.amount);
    const open = all.filter(o => OPEN.has(o.status));
    const toPrep = st.orders.filter(o => (PAID.has(o.status) || o.status === "whatsapp") && o.fulfil !== "entregue").sort((a, b) => a.created - b.created);
    const deliv = paid.filter(o => o.mode === "delivery").length;
    const top = productTotals(paid).slice(0, 8);
    $("#v-overview").innerHTML = `
      <div class="kpis">
        <div class="kpi"><span>Faturamento · ${r[2]}</span><b>${money(rev)}</b><small>${n} pedido(s) pago(s)</small></div>
        <div class="kpi"><span>Ticket médio</span><b>${money(avg)}</b><small>por pedido pago</small></div>
        <div class="kpi"><span>A receber</span><b>${money(sum(open, o => o.total))}</b><small>${open.length} aguardando pagamento</small></div>
        <div class="kpi"><span>Saídas</span><b>${money(out)}</b><small>despesas lançadas</small></div>
        <div class="kpi ${rev + otherIn - out >= 0 ? "kpi--good" : "kpi--bad"}"><span>Saldo do período</span><b>${money(rev + otherIn - out)}</b><small>entradas − saídas</small></div>
      </div>
      <div class="two">
        <div class="card"><h2>Vendas pagas <small>${r[2]}</small></h2>${paid.length ? barChart(dailySeries(paid, r, o => o.total), { aria: "vendas por dia" }) : '<p class="empty">Nenhuma venda paga neste período ainda.</p>'}</div>
        <div class="card"><h2>Para preparar agora <small>${toPrep.length} pedido(s)</small></h2>
          ${toPrep.length ? `<div class="tbl"><table><tbody>${toPrep.slice(0, 8).map(o => `<tr class="click" data-open="${esc(o.id)}"><td>${fmtDT(o.created)}<br><b>${esc(o.name)}</b></td><td>${o.mode === "delivery" ? "Entrega" : "Retirada"}${o.day ? "<br><small class='muted'>" + esc(o.day) + "</small>" : ""}</td><td class="n">${money(o.total)}<br><span class="pill">${FULFIL[o.fulfil] || o.fulfil}</span></td></tr>`).join("")}</tbody></table></div>`
            : '<p class="empty">Nada pendente. 🎉</p>'}</div>
      </div>
      <div class="half">
        <div class="card"><h2>Mais vendidos <small>${r[2]}</small></h2>${hbars(top.map(p => [p.name, p.total, p.unit === "kg" ? p.qty.toFixed(1) + " kg" : p.qty + " un"]))}</div>
        <div class="card"><h2>Vendas por departamento</h2>${hbars(catTotals(paid))}
          <h2 style="margin-top:16px">Retirada × entrega</h2>${hbars([["Retirada na loja", n - deliv], ["Entrega", deliv]], v => v + " pedidos")}</div>
      </div>`;
    bindOpen("#v-overview");
  }
  function bindOpen(root) { $(root).querySelectorAll("[data-open]").forEach(tr => tr.addEventListener("click", () => { st.open = tr.dataset.open; go("orders"); })); }

  /* ---------- PEDIDOS ---------- */
  function orders() {
    const r = range(), f = st.of;
    let list = ordersIn(r);
    if (st.open && !list.some(o => o.id === st.open)) list = st.orders;
    if (f.status) list = list.filter(o => f.status === "paid" ? PAID.has(o.status) : f.status === "open" ? OPEN.has(o.status) : o.status === f.status);
    if (f.fulfil) list = list.filter(o => o.fulfil === f.fulfil);
    if (f.q) { const q = f.q.toLowerCase(); list = list.filter(o => [o.name, o.phone, o.postcode, o.id, ...(o.items || []).map(i => i.name)].join(" ").toLowerCase().includes(q)); }
    $("#v-orders").innerHTML = `
      <div class="toolbar">
        <input type="search" id="oq" placeholder="Buscar cliente, telefone, produto…" value="${esc(f.q)}" aria-label="Buscar pedidos">
        <select id="ost" aria-label="Pagamento"><option value="">Todos os pagamentos</option><option value="paid">Pagos</option><option value="open">A pagar</option><option value="cancelled">Cancelados</option></select>
        <select id="ofu" aria-label="Preparo"><option value="">Todo preparo</option>${Object.entries(FULFIL).map(([k, v]) => `<option value="${k}">${v}</option>`).join("")}</select>
        <button class="btn" id="osync">Sincronizar Stripe</button>
        <button class="btn" id="ocsv">Exportar CSV</button>
      </div>
      ${list.length ? `<div class="tbl"><table><thead><tr><th>Data</th><th>Cliente</th><th>Tipo</th><th>Itens</th><th class="n">Total</th><th>Pagamento</th><th>Preparo</th></tr></thead><tbody>
        ${list.map(o => `<tr class="click" data-id="${esc(o.id)}"><td>${fmtDT(o.created)}<br><small class="muted">#${esc(o.id.slice(-8).toUpperCase())}</small></td>
          <td><b>${esc(o.name)}</b><br><small class="muted">${esc(o.phone)}</small></td><td>${o.mode === "delivery" ? "Entrega" + (o.postcode ? "<br><small class='muted'>" + esc(o.postcode) + "</small>" : "") : "Retirada"}</td>
          <td>${(o.items || []).length}</td><td class="n">${money(o.total)}</td><td><span class="pill pill--${o.status === "paid_shop" ? "paid" : esc(o.status)}">${STATUS[o.status] || esc(o.status)}</span></td>
          <td><select data-fulfil="${esc(o.id)}" aria-label="Preparo">${Object.entries(FULFIL).map(([k, v]) => `<option value="${k}"${o.fulfil === k ? " selected" : ""}>${v}</option>`).join("")}</select></td></tr>
          ${st.open === o.id ? detailRow(o) : ""}`).join("")}
      </tbody></table></div>` : '<div class="card empty">Nenhum pedido encontrado neste período. Os pedidos feitos no site aparecem aqui automaticamente.</div>'}`;
    $("#ost").value = f.status; $("#ofu").value = f.fulfil;
    $("#oq").addEventListener("input", e => { f.q = e.target.value; orders(); $("#oq").focus(); $("#oq").setSelectionRange(f.q.length, f.q.length); });
    $("#ost").addEventListener("change", e => { f.status = e.target.value; orders(); });
    $("#ofu").addEventListener("change", e => { f.fulfil = e.target.value; orders(); });
    $("#ocsv").addEventListener("click", () => csv("pedidos", ["Data", "Pedido", "Cliente", "Telefone", "Tipo", "Endereço", "Código postal", "Itens", "Subtotal", "Entrega", "Total", "Pagamento", "Preparo"],
      list.map(o => [fmtDT(o.created), o.id, o.name, o.phone, o.mode === "delivery" ? "Entrega" : "Retirada", o.address, o.postcode, (o.items || []).map(i => `${i.name} ${i.unit === "kg" ? i.qty + "kg" : "x" + i.qty}`).join("; "), o.subtotal, o.fee, o.total, STATUS[o.status] || o.status, FULFIL[o.fulfil] || o.fulfil])));
    $("#osync").addEventListener("click", async () => {
      try { const d = await api("sync", {}); if (!d.configured) return toast("Stripe ainda não configurado"); await loadAll(); orders(); toast(`${d.synced} pedido(s) atualizado(s)`); }
      catch { toast("Não foi possível falar com o Stripe"); }
    });
    $$("#v-orders tr[data-id]").forEach(tr => tr.addEventListener("click", e => { if (e.target.closest("select,button,input,textarea,a")) return; st.open = st.open === tr.dataset.id ? null : tr.dataset.id; orders(); }));
    $$("#v-orders [data-fulfil]").forEach(s => s.addEventListener("change", async () => { await updOrder(s.dataset.fulfil, { fulfil: s.value }); toast("Preparo: " + FULFIL[s.value]); }));
    $$("#v-orders [data-status]").forEach(b => b.addEventListener("click", async () => { await updOrder(b.dataset.id, { status: b.dataset.status }); orders(); toast(STATUS[b.dataset.status]); }));
    $$("#v-orders [data-copy]").forEach(b => b.addEventListener("click", async () => { try { await navigator.clipboard.writeText(b.dataset.copy); toast("Link copiado"); } catch { prompt("Link de acompanhamento", b.dataset.copy); } }));
    const nb = $("#onote"); if (nb) $("#onoteSave").addEventListener("click", async () => { await updOrder(nb.dataset.id, { note: nb.value }); toast("Observação salva"); });
  }
  function detailRow(o) {
    const wa = String(o.phone || "").replace(/\D/g, "").replace(/^0/, "44");
    return `<tr class="detail"><td colspan="7"><div class="half" style="margin:4px 0">
      <div><ul class="items">${(o.items || []).map(i => `<li>${esc(i.name)} — ${i.unit === "kg" ? esc(i.qty) + " kg" : "x" + esc(i.qty)} · <b>${money(i.total)}</b></li>`).join("")}</ul>
        <p>Subtotal ${money(o.subtotal)}${o.fee ? ` · Entrega ${money(o.fee)}` : ""} · <b>Total ${money(o.total)}</b></p></div>
      <div><dl class="dl"><dt>Telefone</dt><dd>${esc(o.phone)}${wa ? ` · <a href="https://wa.me/${esc(wa)}" target="_blank" rel="noopener">WhatsApp</a>` : ""}</dd>
        ${o.mode === "delivery" ? `<dt>Endereço</dt><dd>${esc(o.address)} ${esc(o.postcode)}</dd>` : ""}${o.day ? `<dt>Dia</dt><dd>${esc(o.day)}</dd>` : ""}${o.notes ? `<dt>Obs. cliente</dt><dd>${esc(o.notes)}</dd>` : ""}
        <dt>Pedido</dt><dd>${esc(o.id)}</dd>${o.email ? `<dt>E-mail</dt><dd>${esc(o.email)}</dd>` : ""}
        ${o.track ? `<dt>Acompanhamento</dt><dd><a href="/pedido/?t=${esc(o.track)}" target="_blank" rel="noopener">abrir</a> · <button class="link" data-copy="${esc(location.origin + "/pedido/?t=" + o.track)}">copiar link</button>${wa ? ` · <a href="https://wa.me/${esc(wa)}?text=${encodeURIComponent("Olá " + String(o.name || "").split(" ")[0] + "! Acompanhe seu pedido BrazaBrazil aqui: " + location.origin + "/pedido/?t=" + o.track)}" target="_blank" rel="noopener">enviar no WhatsApp</a>` : ""}</dd>` : ""}</dl>
        <div class="toolbar" style="margin-top:10px">
          ${OPEN.has(o.status) ? `<button class="btn btn--gold btn--sm" data-status="paid_shop" data-id="${esc(o.id)}">Marcar como pago na loja</button>` : ""}
          ${o.status !== "cancelled" ? `<button class="btn btn--sm btn--danger" data-status="cancelled" data-id="${esc(o.id)}">Cancelar</button>` : `<button class="btn btn--sm" data-status="whatsapp" data-id="${esc(o.id)}">Reabrir</button>`}
          ${PAID.has(o.status) ? `<button class="btn btn--sm" data-status="refunded" data-id="${esc(o.id)}">Marcar reembolsado</button>` : ""}
        </div>
        <label class="fld"><span>Observação interna</span><textarea id="onote" data-id="${esc(o.id)}" rows="2">${esc(o.note || "")}</textarea></label>
        <button class="btn btn--sm" id="onoteSave" style="margin-top:6px">Salvar observação</button></div></div></td></tr>`;
  }
  async function updOrder(id, ch) { await api("order", { id, ...ch }); const o = st.orders.find(x => x.id === id); if (o) Object.assign(o, ch, ch.status === "paid_shop" ? { paid_at: Date.now() } : {}); }

  /* ---------- PRODUTOS ---------- */
  function eff(p) {
    const o = st.ov[p.id] || {};
    const normal = typeof o.price === "number" ? o.price : p.price;
    const promo = typeof o.promo === "number" ? (o.promo > 0 ? o.promo : null) : p.promo;
    const avail = typeof o.available === "number" ? !!o.available : (p.soon && typeof o.price === "number" ? true : p.available);
    return { normal, promo: promo && promo < normal ? promo : null, avail, soon: p.soon && typeof o.price !== "number", edited: !!st.ov[p.id] };
  }
  function products() {
    const f = st.pf, sold = Object.fromEntries(productTotals(paidIn(range())).map(x => [x.id, x]));
    let list = st.products.slice();
    if (f.cat) list = list.filter(p => p.cat === f.cat);
    if (f.q) { const q = f.q.toLowerCase(); list = list.filter(p => (p.name + " " + p.group + " " + p.id).toLowerCase().includes(q)); }
    const E = Object.fromEntries(list.map(p => [p.id, eff(p)]));
    if (f.chip === "out") list = list.filter(p => !E[p.id].avail && !E[p.id].soon);
    if (f.chip === "promo") list = list.filter(p => E[p.id].promo);
    if (f.chip === "edited") list = list.filter(p => E[p.id].edited);
    if (f.chip === "soon") list = list.filter(p => E[p.id].soon);
    const all = st.products.map(eff);
    const shown = list.slice(0, 400);
    $("#v-products").innerHTML = `
      <div class="kpis">
        <div class="kpi"><span>Produtos</span><b>${st.products.length}</b></div>
        <div class="kpi"><span>Esgotados</span><b>${all.filter(e => !e.avail && !e.soon).length}</b></div>
        <div class="kpi"><span>Em promoção</span><b>${all.filter(e => e.promo).length}</b></div>
        <div class="kpi"><span>Sem preço (em breve)</span><b>${all.filter(e => e.soon).length}</b></div>
      </div>
      <div class="toolbar">
        <input type="search" id="pq" placeholder="Buscar produto…" value="${esc(f.q)}" aria-label="Buscar produto">
        <select id="pcat" aria-label="Departamento"><option value="">Todos os departamentos</option>${Object.entries(CAT).filter(([k]) => st.products.some(p => p.cat === k)).map(([k, v]) => `<option value="${k}">${v}</option>`).join("")}</select>
        <div class="chips">${[["all", "Todos"], ["out", "Esgotados"], ["promo", "Promoção"], ["soon", "Em breve"], ["edited", "Alterados aqui"]].map(([k, v]) => `<button class="chip" data-chip="${k}" aria-pressed="${f.chip === k}">${v}</button>`).join("")}</div>
        <button class="btn" id="pcsv">Exportar CSV</button>
      </div>
      <p class="muted" style="margin:0 0 10px">Mudanças valem no site em até 1 minuto. “Promoção” vazio usa o padrão; digite <b>0</b> para tirar a promoção.</p>
      <div class="tbl"><table><thead><tr><th></th><th>Produto</th><th>Departamento</th><th class="n">Preço</th><th class="n">Promoção</th><th>À venda</th><th class="n">Vendido</th><th></th></tr></thead><tbody>
      ${shown.map(p => { const e = E[p.id], o = st.ov[p.id] || {}, s = sold[p.id];
        return `<tr data-pid="${esc(p.id)}"><td>${p.image ? `<img class="thumb" src="/${esc(p.image)}" alt="" loading="lazy">` : ""}</td>
          <td><b>${esc(p.name)}</b> ${e.soon ? '<span class="pill pill--soon">Em breve</span>' : ""}${e.promo ? '<span class="pill pill--promo">Promo</span>' : ""}${e.edited ? '<span class="pill pill--edit">Alterado</span>' : ""}<br><small class="muted">${esc(p.group)} · ${p.unit === "kg" ? "por kg" : "unidade"}</small></td>
          <td>${CAT[p.cat] || esc(p.cat)}</td>
          <td class="n"><input class="pin" inputmode="decimal" data-f="price" value="${typeof o.price === "number" ? o.price.toFixed(2) : (p.price ? p.price.toFixed(2) : "")}" aria-label="Preço"></td>
          <td class="n"><input class="pin" inputmode="decimal" data-f="promo" placeholder="${p.promo ? p.promo.toFixed(2) : "—"}" value="${typeof o.promo === "number" ? (o.promo > 0 ? o.promo.toFixed(2) : "0") : ""}" aria-label="Preço promocional"></td>
          <td><label class="switch"><input type="checkbox" data-f="available"${e.avail ? " checked" : ""} aria-label="À venda"><i></i></label></td>
          <td class="n">${s ? (p.unit === "kg" ? s.qty.toFixed(1) + " kg" : s.qty + " un") + "<br><small class='muted'>" + money(s.total) + "</small>" : "—"}</td>
          <td>${e.edited ? `<button class="btn btn--sm" data-reset>Voltar ao padrão</button>` : ""}</td></tr>`; }).join("")}
      </tbody></table></div>${list.length > shown.length ? `<p class="muted">Mostrando ${shown.length} de ${list.length}. Use a busca para achar os outros.</p>` : ""}`;
    $("#pcat").value = f.cat;
    $("#pq").addEventListener("input", e => { f.q = e.target.value; products(); const i = $("#pq"); i.focus(); i.setSelectionRange(f.q.length, f.q.length); });
    $("#pcat").addEventListener("change", e => { f.cat = e.target.value; products(); });
    $$("#v-products [data-chip]").forEach(b => b.addEventListener("click", () => { f.chip = b.dataset.chip; products(); }));
    $("#pcsv").addEventListener("click", () => csv("produtos", ["Código", "Produto", "Departamento", "Unidade", "Preço", "Promoção", "À venda"],
      list.map(p => { const e = E[p.id]; return [p.id, p.name, CAT[p.cat] || p.cat, p.unit, e.soon ? "" : e.normal, e.promo || "", e.soon ? "Em breve" : e.avail ? "Sim" : "Não"]; })));
    $$("#v-products tr[data-pid]").forEach(tr => {
      const id = tr.dataset.pid, p = st.products.find(x => x.id === id);
      const save = async patch => {
        const cur = st.ov[id] || {};
        const body = { id, price: cur.price ?? null, promo: cur.promo ?? null, available: cur.available ?? null, ...patch };
        try { const d = await api("product", body); st.ov = d.overrides; products(); toast("Salvo · " + p.name); }
        catch (e) { toast(e.message === "bad_price" ? "Preço inválido" : "Não foi possível salvar"); products(); }
      };
      tr.querySelector('[data-f="price"]').addEventListener("change", e => {
        const v = e.target.value.replace(",", ".").trim(); save({ price: v === "" || Number(v) === p.price ? null : Number(v) }); });
      tr.querySelector('[data-f="promo"]').addEventListener("change", e => {
        const v = e.target.value.replace(",", ".").trim(); save({ promo: v === "" ? null : Number(v) === 0 ? -1 : Number(v) }); });
      tr.querySelector('[data-f="available"]').addEventListener("change", e => save({ available: e.target.checked === p.available && !p.soon ? null : e.target.checked }));
      const rs = tr.querySelector("[data-reset]"); if (rs) rs.addEventListener("click", async () => { const d = await api("product", { id, reset: true }); st.ov = d.overrides; products(); toast("Voltou ao padrão"); });
    });
  }

  /* ---------- FINANCEIRO ---------- */
  function finance() {
    const r = range(), paid = paidIn(r), led = ledgerIn(r);
    const site = sum(paid.filter(o => o.status === "paid"), o => o.total), shop = sum(paid.filter(o => o.status === "paid_shop"), o => o.total);
    const ins = led.filter(l => l.type === "in"), outs = led.filter(l => l.type === "out");
    const tin = site + shop + sum(ins, l => l.amount), tout = sum(outs, l => l.amount);
    // last 12 months in vs out
    const n = new Date(), months = [];
    for (let i = 11; i >= 0; i--) {
      const a = new Date(n.getFullYear(), n.getMonth() - i, 1).getTime(), b = new Date(n.getFullYear(), n.getMonth() - i + 1, 1).getTime();
      const inV = sum(paidIn([a, b]), o => o.total) + sum(ledgerIn([a, b]).filter(l => l.type === "in"), l => l.amount);
      const outV = sum(ledgerIn([a, b]).filter(l => l.type === "out"), l => l.amount);
      months.push({ label: new Date(a).toLocaleDateString("pt-BR", { month: "short" }), values: [inV, outV] });
    }
    const byCat = {}; outs.forEach(l => byCat[l.category] = (byCat[l.category] || 0) + l.amount);
    const today = isoDay(Date.now());
    $("#v-finance").innerHTML = `
      <div class="kpis">
        <div class="kpi kpi--good"><span>Entradas · ${r[2]}</span><b>${money(tin)}</b><small>site ${money0(site)} · loja ${money0(shop)} · outras ${money0(sum(ins, l => l.amount))}</small></div>
        <div class="kpi kpi--bad"><span>Saídas</span><b>${money(tout)}</b><small>${outs.length} lançamento(s)</small></div>
        <div class="kpi ${tin - tout >= 0 ? "kpi--good" : "kpi--bad"}"><span>Saldo</span><b>${money(tin - tout)}</b><small>margem ${tin ? Math.round((tin - tout) / tin * 100) : 0}%</small></div>
      </div>
      <div class="two">
        <div class="card"><h2>Entradas × saídas <small>últimos 12 meses</small></h2>
          <div class="legend"><span><i style="background:var(--green)"></i>Entradas</span><span><i style="background:var(--red)"></i>Saídas</span></div>
          ${barChart(months, { colors: ["var(--green)", "var(--red)"], aria: "entradas e saídas por mês" })}</div>
        <div class="card"><h2>Saídas por categoria <small>${r[2]}</small></h2>${hbars(Object.entries(byCat).sort((a, b) => b[1] - a[1]))}</div>
      </div>
      <div class="card" style="margin-bottom:14px"><h2>Novo lançamento</h2>
        <form class="form" id="lform">
          <label class="fld"><span>Tipo</span><select id="ltype"><option value="out">Saída (despesa)</option><option value="in">Entrada</option></select></label>
          <label class="fld"><span>Data</span><input type="date" id="ldate" value="${today}" required></label>
          <label class="fld"><span>Categoria</span><select id="lcat"></select></label>
          <label class="fld"><span>Descrição</span><input id="ldesc" maxlength="200" placeholder="ex.: Fornecedor de carnes"></label>
          <label class="fld"><span>Valor (£)</span><input id="lamt" inputmode="decimal" required placeholder="0.00"></label>
          <label class="fld"><span>Forma</span><select id="lmeth"><option>Cartão</option><option>Dinheiro</option><option>Transferência</option><option>Débito direto</option><option>Outro</option></select></label>
          <button class="btn btn--primary" type="submit">Lançar</button>
        </form></div>
      <div class="toolbar"><button class="btn" id="lcsv">Exportar CSV</button></div>
      ${led.length ? `<div class="tbl"><table><thead><tr><th>Data</th><th>Tipo</th><th>Categoria</th><th>Descrição</th><th>Forma</th><th class="n">Valor</th><th></th></tr></thead><tbody>
        ${led.map(l => `<tr><td>${esc(l.date.split("-").reverse().join("/"))}</td><td><span class="pill ${l.type === "in" ? "pill--paid" : "pill--cancelled"}">${l.type === "in" ? "Entrada" : "Saída"}</span></td><td>${esc(l.category)}</td><td>${esc(l.description)}</td><td>${esc(l.method)}</td>
          <td class="n">${l.type === "out" ? "−" : ""}${money(l.amount)}</td><td><button class="btn btn--sm btn--danger" data-del="${esc(l.id)}">Apagar</button></td></tr>`).join("")}
      </tbody></table></div>` : '<div class="card empty">Nenhum lançamento neste período. As vendas do site entram sozinhas; aqui você lança despesas e vendas feitas fora do site.</div>'}`;
    const fillCats = () => { const t = $("#ltype").value; $("#lcat").innerHTML = st.cats.filter(c => (t === "in") === ["Vendas na loja", "Outras entradas"].includes(c)).map(c => `<option>${esc(c)}</option>`).join(""); };
    $("#ltype").addEventListener("change", fillCats); fillCats();
    $("#lform").addEventListener("submit", async e => {
      e.preventDefault();
      const amount = Number($("#lamt").value.replace(",", "."));
      if (!(amount > 0)) return toast("Digite um valor válido");
      try { await api("ledger/add", { type: $("#ltype").value, date: $("#ldate").value, category: $("#lcat").value, description: $("#ldesc").value, amount, method: $("#lmeth").value });
        st.ledger = (await api("ledger")).entries; finance(); toast("Lançamento salvo"); } catch { toast("Não foi possível salvar"); }
    });
    $$("#v-finance [data-del]").forEach(b => b.addEventListener("click", async () => {
      if (b.dataset.sure !== "1") { b.dataset.sure = "1"; b.textContent = "Confirmar"; return; }
      await api("ledger/delete", { id: b.dataset.del }); st.ledger = st.ledger.filter(l => l.id !== b.dataset.del); finance(); toast("Lançamento apagado");
    }));
    $("#lcsv").addEventListener("click", () => csv("financeiro", ["Data", "Tipo", "Categoria", "Descrição", "Forma", "Valor"],
      [...paid.map(o => [isoDay(o.paid_at || o.created), "Entrada", o.status === "paid" ? "Vendas no site" : "Vendas do site pagas na loja", `Pedido ${o.id.slice(-8).toUpperCase()} — ${o.name}`, o.status === "paid" ? "Stripe" : "Loja", o.total]),
       ...led.map(l => [l.date, l.type === "in" ? "Entrada" : "Saída", l.category, l.description, l.method, l.type === "out" ? -l.amount : l.amount])]));
  }

  /* ---------- CLIENTES ---------- */
  function customers() {
    const r = range(), m = {};
    ordersIn(r).filter(o => o.status !== "cancelled").forEach(o => {
      const k = String(o.phone || "").replace(/\D/g, "") || o.name;
      const c = m[k] || (m[k] = { name: o.name, phone: o.phone, orders: 0, paid: 0, total: 0, last: 0, postcode: o.postcode, delivery: 0 });
      c.orders++; if (PAID.has(o.status)) { c.paid++; c.total += o.total; } c.last = Math.max(c.last, o.created); if (o.mode === "delivery") c.delivery++; if (o.postcode) c.postcode = o.postcode;
    });
    let list = Object.values(m).sort((a, b) => b.total - a.total);
    if (st.cq) { const q = st.cq.toLowerCase(); list = list.filter(c => (c.name + " " + c.phone + " " + c.postcode).toLowerCase().includes(q)); }
    const back = list.filter(c => c.orders > 1).length;
    $("#v-customers").innerHTML = `
      <div class="kpis">
        <div class="kpi"><span>Clientes · ${r[2]}</span><b>${list.length}</b></div>
        <div class="kpi"><span>Voltaram a comprar</span><b>${back}</b><small>${list.length ? Math.round(back / list.length * 100) : 0}% dos clientes</small></div>
        <div class="kpi"><span>Gasto médio por cliente</span><b>${money(list.length ? sum(list, c => c.total) / list.length : 0)}</b></div>
      </div>
      <div class="toolbar"><input type="search" id="cq" placeholder="Buscar nome, telefone, código postal…" value="${esc(st.cq)}" aria-label="Buscar clientes"><button class="btn" id="ccsv">Exportar CSV</button></div>
      ${list.length ? `<div class="tbl"><table><thead><tr><th>Cliente</th><th>Telefone</th><th>Código postal</th><th class="n">Pedidos</th><th class="n">Total pago</th><th>Último pedido</th></tr></thead><tbody>
        ${list.map(c => `<tr><td><b>${esc(c.name)}</b>${c.orders > 1 ? ' <span class="pill pill--paid">Recorrente</span>' : ""}</td><td>${esc(c.phone)}</td><td>${esc(c.postcode || "—")}</td><td class="n">${c.orders}</td><td class="n">${money(c.total)}</td><td>${fmtDate(c.last)}</td></tr>`).join("")}
      </tbody></table></div>` : '<div class="card empty">Os clientes aparecem aqui a partir dos pedidos do site.</div>'}`;
    $("#cq").addEventListener("input", e => { st.cq = e.target.value; customers(); const i = $("#cq"); i.focus(); i.setSelectionRange(st.cq.length, st.cq.length); });
    $("#ccsv").addEventListener("click", () => csv("clientes", ["Cliente", "Telefone", "Código postal", "Pedidos", "Total pago", "Último pedido"], list.map(c => [c.name, c.phone, c.postcode, c.orders, c.total, fmtDate(c.last)])));
  }

  /* ---------- RELATÓRIOS ---------- */
  function reports() {
    const r = range(), paid = paidIn(r), led = ledgerIn(r), prods = productTotals(paid);
    const rev = sum(paid, o => o.total), fees = sum(paid, o => o.fee || 0), otherIn = sum(led.filter(l => l.type === "in"), l => l.amount);
    const outs = {}; led.filter(l => l.type === "out").forEach(l => outs[l.category] = (outs[l.category] || 0) + l.amount);
    const tout = sum(Object.values(outs));
    const byDay = {}; paid.forEach(o => { const k = isoDay(o.paid_at || o.created); const d = byDay[k] || (byDay[k] = { n: 0, v: 0 }); d.n++; d.v += o.total; });
    const days = Object.entries(byDay).sort((a, b) => b[0].localeCompare(a[0]));
    const wd = [0, 0, 0, 0, 0, 0, 0]; paid.forEach(o => wd[new Date(o.paid_at || o.created).getDay()] += o.total);
    const WD = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    $("#v-reports").innerHTML = `
      <div class="toolbar"><button class="btn" id="rprint">Imprimir / salvar PDF</button><button class="btn" id="rcsv1">CSV · produtos vendidos</button><button class="btn" id="rcsv2">CSV · vendas por dia</button></div>
      <div class="half">
        <div class="card"><h2>Resultado do período <small>${r[2]}</small></h2>
          <div class="tbl"><table><tbody>
            <tr><td>Vendas do site (produtos)</td><td class="n">${money(rev - fees)}</td></tr>
            <tr><td>Taxas de entrega recebidas</td><td class="n">${money(fees)}</td></tr>
            <tr><td>Outras entradas</td><td class="n">${money(otherIn)}</td></tr>
            <tr><td><b>Total de entradas</b></td><td class="n"><b>${money(rev + otherIn)}</b></td></tr>
            ${Object.entries(outs).sort((a, b) => b[1] - a[1]).map(([c, v]) => `<tr><td class="muted">− ${esc(c)}</td><td class="n">−${money(v)}</td></tr>`).join("")}
            <tr><td><b>Total de saídas</b></td><td class="n"><b>−${money(tout)}</b></td></tr>
            <tr><td><b>Resultado</b></td><td class="n"><b style="color:${rev + otherIn - tout >= 0 ? "var(--green)" : "var(--red)"}">${money(rev + otherIn - tout)}</b></td></tr>
          </tbody></table></div></div>
        <div class="card"><h2>Vendas por dia da semana</h2>${hbars(WD.map((l, i) => [l, wd[i]]))}</div>
      </div>
      <div class="half">
        <div class="card"><h2>Produtos vendidos <small>${prods.length} produto(s)</small></h2>
          ${prods.length ? `<div class="tbl"><table><thead><tr><th>Produto</th><th class="n">Qtd.</th><th class="n">Pedidos</th><th class="n">Receita</th></tr></thead><tbody>
            ${prods.map(p => `<tr><td>${esc(p.name)}</td><td class="n">${p.unit === "kg" ? p.qty.toFixed(1) + " kg" : p.qty}</td><td class="n">${p.orders}</td><td class="n">${money(p.total)}</td></tr>`).join("")}</tbody></table></div>` : '<p class="empty">Sem vendas no período.</p>'}</div>
        <div class="card"><h2>Vendas por dia</h2>
          ${days.length ? `<div class="tbl"><table><thead><tr><th>Dia</th><th class="n">Pedidos</th><th class="n">Total</th></tr></thead><tbody>
            ${days.map(([d, x]) => `<tr><td>${d.split("-").reverse().join("/")}</td><td class="n">${x.n}</td><td class="n">${money(x.v)}</td></tr>`).join("")}</tbody></table></div>` : '<p class="empty">Sem vendas no período.</p>'}</div>
      </div>`;
    $("#rprint").addEventListener("click", () => window.print());
    $("#rcsv1").addEventListener("click", () => csv("produtos-vendidos", ["Produto", "Departamento", "Quantidade", "Unidade", "Pedidos", "Receita"], prods.map(p => [p.name, CAT[p.cat] || p.cat, p.qty, p.unit, p.orders, p.total])));
    $("#rcsv2").addEventListener("click", () => csv("vendas-por-dia", ["Dia", "Pedidos", "Total"], days.map(([d, x]) => [d, x.n, x.v])));
  }

  /* ---------- ATIVIDADE ---------- */
  const ACT = { login: "Entrou no painel", login_fail: "Tentativa de login falhou", product: "Alterou produto", order: "Atualizou pedido", ledger_add: "Novo lançamento", ledger_delete: "Apagou lançamento", password_change: "Trocou a senha" };
  async function activity() {
    $("#v-activity").innerHTML = '<p class="muted">Carregando…</p>';
    const d = await api("audit");
    $("#v-activity").innerHTML = d.entries.length ? `<div class="tbl"><table><thead><tr><th>Quando</th><th>Ação</th><th>Detalhe</th><th>IP</th></tr></thead><tbody>
      ${d.entries.map(a => `<tr><td>${fmtDT(a.at)}</td><td>${a.action === "login_fail" ? '<span class="pill pill--cancelled">' + ACT[a.action] + "</span>" : esc(ACT[a.action] || a.action)}</td><td><small>${esc(a.detail)}</small></td><td><small class="muted">${esc(a.ip)}</small></td></tr>`).join("")}
    </tbody></table></div>` : '<div class="card empty">Sem atividade ainda.</div>';
  }

  /* ---------- CONFIGURAÇÕES ---------- */
  function settings() {
    $("#v-settings").innerHTML = `
      <div class="half">
        <div class="card"><h2>Trocar usuário e senha</h2>
          <form class="grid" id="pwform">
            <label class="fld"><span>Usuário</span><input id="pwuser" value="${esc(st.me.user)}" autocomplete="username" required></label>
            <label class="fld"><span>Senha atual</span><input id="pwcur" type="password" autocomplete="current-password" required></label>
            <label class="fld"><span>Nova senha (mínimo 10 caracteres)</span><input id="pwnew" type="password" autocomplete="new-password" minlength="10" required></label>
            <label class="fld"><span>Repita a nova senha</span><input id="pwnew2" type="password" autocomplete="new-password" minlength="10" required></label>
            <button class="btn btn--primary" type="submit">Salvar nova senha</button>
            <p class="err" id="pwerr"></p>
          </form></div>
        <div class="card"><h2>Situação</h2>
          <dl class="dl">
            <dt>Pagamento online</dt><dd>${st.me.stripe ? '<span class="pill pill--paid">Stripe ativo</span>' : '<span class="pill pill--pending">Falta a chave do Stripe</span>'}</dd>
            <dt>Sessão expira</dt><dd>${fmtDT(st.me.expires)}</dd>
            <dt>Produtos</dt><dd>${st.products.length} no catálogo · ${Object.keys(st.ov).length} alterado(s) aqui</dd>
            <dt>Pedidos guardados</dt><dd>${st.orders.length}</dd>
            <dt>Site</dt><dd><a href="/" target="_blank" rel="noopener">Abrir a loja</a></dd>
          </dl>
          <div style="margin-top:14px"><button class="btn btn--primary" id="spSync" ${st.me.stripe ? "" : "disabled"}>Criar / atualizar produtos na Stripe</button>${st.me.stripe ? "" : `<p class="err" style="margin-top:8px">Botão bloqueado: este site ainda não recebeu a chave STRIPE_SECRET_KEY na Cloudflare.</p>`}
            <p class="muted" id="spMsg" style="margin-top:8px">Cria um card na Stripe para cada produto à venda (nome, foto e preço). Rode de novo depois de adicionar produtos ou trocar fotos. Produtos novos também são criados sozinhos na primeira venda.</p></div>
          <p class="muted" style="margin-top:12px">Segurança: senha guardada só como código (hash), sessão expira em 12 horas, bloqueio de 15 minutos após 6 tentativas erradas e registro de toda ação na aba Atividade.</p>
        </div>
      </div>`;
    $("#spSync").addEventListener("click", async e => {
      const btn = e.currentTarget; btn.disabled = true; let off = 0, c = 0, u = 0, errs = [];
      try {
        do {
          const r = await api("stripe-products", { offset: off });
          c += r.created; u += r.updated; errs = errs.concat(r.errors);
          $("#spMsg").textContent = `Enviando… ${Math.min(r.total, (r.next ?? r.total))} de ${r.total} produtos`;
          off = r.next;
        } while (off != null);
        $("#spMsg").textContent = `Pronto: ${c} criado(s), ${u} atualizado(s)` + (errs.length ? ` · ${errs.length} com erro (${errs.slice(0, 3).join("; ")})` : "") + ".";
        toast("Produtos enviados para a Stripe");
      } catch (err) { $("#spMsg").textContent = "Erro na Stripe: " + (err.data?.message || err.message); }
      btn.disabled = false;
    });
    $("#pwform").addEventListener("submit", async e => {
      e.preventDefault(); $("#pwerr").textContent = "";
      if ($("#pwnew").value !== $("#pwnew2").value) return $("#pwerr").textContent = "As senhas novas não são iguais.";
      try { await api("password", { user: $("#pwuser").value, current: $("#pwcur").value, next: $("#pwnew").value });
        st.me = await api("me"); $("#meUser").textContent = st.me.user; $("#pwAlert").hidden = true; settings(); toast("Senha trocada"); }
      catch (err) { $("#pwerr").textContent = err.message === "wrong_password" ? "Senha atual incorreta." : err.message === "weak_password" ? "A nova senha precisa ter pelo menos 10 caracteres." : "Não foi possível salvar."; }
    });
  }

  /* ---------- CSV export ---------- */
  function csv(name, head, rows) {
    const cell = v => { let s = String(v ?? ""); if (/^[=+\-@]/.test(s)) s = "'" + s; return /[",;\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
    const text = "﻿" + [head, ...rows].map(r => r.map(cell).join(",")).join("\r\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([text], { type: "text/csv;charset=utf-8" }));
    a.download = `brazabrazil-${name}-${isoDay(Date.now())}.csv`; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }

  // refresh orders every 60 s while the panel is open
  setInterval(async () => { if (!$("#app").hidden && !document.hidden && ["overview", "orders"].includes(st.view) && !document.activeElement.matches("input,textarea,select")) { try { await loadAll(); render(); } catch {} } }, 60000);
  boot();
})();
