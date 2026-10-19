/* ============================================================
   BRAZABRAZIL — SHOP LOGIC (no need to edit for normal changes)
   Products: js/products.js · Settings: js/config.js · Texts: js/i18n.js
   ============================================================ */
(function () {
  const S = window.SITE, P = window.PRODUCTS, CATS = window.CATEGORIES;
  const T = window.I18N, LANGS = window.LANGS;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const money = n => S.currency + n.toFixed(2);
  const byId = Object.fromEntries(P.map(p => [p.id, p]));
  const KG_STEP = 0.5;
  const store = {
    get: k => { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  /* ============================================================
     LANGUAGE
     1) ?lang=xx in the URL  2) choice saved before  3) browser language
     ============================================================ */
  const codes = LANGS.map(l => l.code);
  function detectLang() {
    const q = new URLSearchParams(location.search).get("lang");
    if (q && codes.includes(q)) return q;
    const saved = store.get("bb_lang");
    if (saved && codes.includes(saved)) return saved;
    for (const raw of (navigator.languages || [navigator.language || ""])) {
      const l = raw.toLowerCase();
      if (l === "pt-br") return "pt-BR";
      if (l.startsWith("pt")) return "pt-PT";
      if (l.startsWith("es")) return "es";
      if (l.startsWith("en")) return "en";
    }
    return S.defaultLang || "en";
  }
  let lang = detectLang();

  // text for current language (falls back pt-PT -> pt-BR -> en)
  const t = key => {
    const e = T[key]; if (!e) return key;
    return e[lang] ?? (lang === "pt-PT" ? e["pt-BR"] : undefined) ?? e.en;
  };
  // product/guide fields: { en, pt, es, "pt-PT"? }
  const pick = obj => {
    if (!obj || typeof obj === "string") return obj || "";
    if (obj[lang]) return obj[lang];
    if (lang.startsWith("pt")) return obj.pt || obj.en;
    return obj.en;
  };

  /* ---------- State ---------- */
  let cart = {};
  let picks = {};
  let activeCat = "all", query = "", activeGroup = "all";
  const groupsFor = cat => (window.GROUPS || {})[cat] || [];
  const hasAlcohol = () => Object.keys(cart).some(id => byId[id] && byId[id].cat === "drinks");
  try { cart = JSON.parse(store.get("bb_cart") || "{}"); } catch (e) { cart = {}; }
  const droppedOos = [];
  Object.keys(cart).forEach(id => {
    if (!byId[id]) delete cart[id];
    else if (byId[id].available === false) { droppedOos.push(byId[id].name); delete cart[id]; }
  });
  const save = () => store.set("bb_cart", JSON.stringify(cart));

  const step = p => (p.unit === "kg" ? KG_STEP : 1);
  const fmtQty = (p, q) => (p.unit === "kg" ? (q % 1 ? q.toFixed(1) : q) + " kg" : "× " + q);
  const unitLabel = p => (p.unit === "kg" ? "/kg" : "");
  const icon = cat => `<svg viewBox="0 0 120 90" aria-hidden="true"><use href="#i-${cat}"/></svg>`;
  const tagHtml = k => `<span class="tag${["gf", "vegan", "portuguese"].includes(k) ? " tag--green" : k === "adult" ? " tag--adult" : ""}">${t("tag_" + k)}</span>`;
  const wa = text => `https://wa.me/${S.whatsapp}?text=${encodeURIComponent(text ?? t("wa_hi"))}`;

  /* ---------- Static config content ---------- */
  $("#year").textContent = new Date().getFullYear();
  $("#addr").innerHTML = `${S.address.line1}<br>${S.address.line2}`;
  $("#insta").href = S.instagram;
  $("#phone").textContent = S.phoneDisplay;
  $("#phone").href = "tel:+" + S.whatsapp;
  $("#mapFrame").src = S.address.mapEmbed;
  $("#mapsLink").href = S.address.mapsUrl;
  ["#vipTab", "#vipBanner", "#vipTop"].forEach(s => { const el = $(s); if (el) el.href = S.vipGroup; });
  if (!S.delivery.enabled) document.querySelector('input[value="delivery"]').closest("label").remove();

  /* ---------- Language picker ---------- */
  const langMenu = $("#langMenu"), langBtn = $("#langBtn");
  langMenu.innerHTML = LANGS.map(l => `
    <li role="option" data-lang="${l.code}" tabindex="0">
      <svg viewBox="0 0 30 20"><use href="#f-${l.flag}"/></svg><span>${l.label}</span>
    </li>`).join("");
  const toggleMenu = open => {
    langMenu.hidden = !open; langBtn.setAttribute("aria-expanded", open);
  };
  langBtn.addEventListener("click", e => { e.stopPropagation(); toggleMenu(langMenu.hidden); });
  document.addEventListener("click", () => toggleMenu(false));
  langMenu.addEventListener("click", e => {
    const li = e.target.closest("li[data-lang]"); if (!li) return;
    setLang(li.dataset.lang, true); toggleMenu(false);
  });
  langMenu.addEventListener("keydown", e => { if (e.key === "Enter") e.target.click(); });

  function setLang(code, remember) {
    lang = code;
    if (remember) store.set("bb_lang", code);
    applyLang();
  }

  function applyLang() {
    const L = LANGS.find(l => l.code === lang);
    document.documentElement.lang = lang === "en" ? "en-GB" : lang;
    document.title = t("meta_title");
    $('meta[name="description"]').setAttribute("content", t("meta_desc"));
    $("#langFlag use").setAttribute("href", "#f-" + L.flag);
    $("#langShort").textContent = L.short;
    $$("#langMenu li").forEach(li => li.setAttribute("aria-selected", li.dataset.lang === lang));

    $$("[data-i18n]").forEach(el => { el.innerHTML = t(el.dataset.i18n); });
    $$("[data-i18n-ph]").forEach(el => { el.placeholder = t(el.dataset.i18nPh); });

    $("#hours").innerHTML = S.hours.map(h =>
      `<span class="hours-row"><span>${h.days[lang] || h.days["pt-BR"] || h.days.en}</span><span>${h.time}</span></span>`).join("");
    $("#waLink").href = wa(t("wa_q"));
    $("#waFloat").href = wa();

    renderTabs(); renderGrid(); renderBoxes(); renderCuts(); renderCart();
    if (bz.calc && !bz.calc.hidden) renderCalc();
  }

  /* ---------- Tabs & search ---------- */
  const tabs = $("#tabs");
  function renderTabs() {
    tabs.innerHTML = CATS.map(c =>
      `<button class="tab${c === "drinks" ? " tab--drinks" : ""}" role="tab" data-cat="${c}" aria-selected="${c === activeCat}">${t("cat_" + c)}</button>`).join("");
    const st = $("#subtabs");
    const gs = groupsFor(activeCat);
    st.hidden = !gs.length;
    st.innerHTML = [{ id: "all", label: null }, ...gs].map(g =>
      `<button class="subtab" data-group="${g.id}" aria-pressed="${g.id === activeGroup}">${g.label ? pick(g.label) : t("cat_all")}</button>`).join("");
  }
  $("#subtabs").addEventListener("click", e => {
    const b = e.target.closest(".subtab"); if (!b) return;
    activeGroup = b.dataset.group; renderTabs(); renderGrid();
  });
  tabs.addEventListener("click", e => {
    const b = e.target.closest(".tab"); if (!b) return;
    activeCat = b.dataset.cat; activeGroup = "all"; renderTabs(); renderGrid();
  });
  $("#search").addEventListener("input", e => { query = e.target.value.trim().toLowerCase(); renderGrid(); });

  /* ---------- Product grid ---------- */
  function card(p) {
    const q = picks[p.id] ?? step(p);
    const out = p.available === false;
    const media = p.image ? `<img src="${p.image}" alt="${p.name} — ${pick(p.sub)}" loading="lazy">` : icon(p.cat);
    return `
      <article class="card${out ? " card--out" : ""}${p.image && p.image.includes("assets/products/") ? " card--framed" : ""}" id="p-${p.id}">
        <div class="card__media">
          ${media}
          <div class="card__tags">${(p.tags || []).map(tagHtml).join("")}${out ? `<span class="tag">${t("out")}</span>` : ""}</div>
          <span class="cat">${t("cat_" + p.cat)}</span>
        </div>
        <div class="card__body">
          <h3 class="card__name">${p.name}</h3>
          <p class="card__en">${pick(p.sub)}</p>
          <p class="card__desc">${pick(p.desc)}</p>
          <div class="card__row">
            <span class="price">${money(p.price)}<small>${unitLabel(p)}</small></span>
            ${out ? `
            <button class="btn btn--similar" data-act="similar" data-id="${p.id}">${t("similar_btn")}</button>` : `
            <div class="card__buy">
              <div class="qty">
                <button data-act="dec" data-id="${p.id}" aria-label="−">−</button>
                <span>${fmtQty(p, q)}</span>
                <button data-act="inc" data-id="${p.id}" aria-label="+">+</button>
              </div>
              <button class="add" data-act="add" data-id="${p.id}" aria-label="${t("add")}: ${p.name}">
                <svg viewBox="0 0 24 24"><use href="#i-cart"/></svg>
              </button>
            </div>`}
          </div>
        </div>
      </article>`;
  }

  function renderGrid() {
    const gLabel = p => { const g = groupsFor(p.cat).find(x => x.id === p.group); return g ? pick(g.label) : ""; };
    const list = P.filter(p =>
      (activeCat === "all" || p.cat === activeCat) &&
      (activeCat === "all" || activeGroup === "all" || p.group === activeGroup) &&
      (!query || [p.name, p.sub.en, pick(p.sub), pick(p.desc), p.group ? gLabel(p) : ""].join(" ").toLowerCase().includes(query)));
    if (!list.length) { $("#grid").innerHTML = `<p class="empty-state">${t("none")}</p>`; return; }
    let html = "", lastHead = null;
    list.forEach(p => {
      if (p.group) {
        const head = p.cat + ":" + p.group;
        if (head !== lastHead) {
          const n = list.filter(x => x.cat === p.cat && x.group === p.group).length;
          const pre = activeCat === "all" ? `${t("cat_" + p.cat)} · ` : "";
          html += `<h3 class="grid__head"><span>${pre}${gLabel(p)}</span><small>${n} · ${t("sorted_price")}</small></h3>`;
          lastHead = head;
        }
      } else if (lastHead !== null && lastHead !== "cat:" + p.cat) {
        html += `<h3 class="grid__head"><span>${t("cat_" + p.cat)}</span></h3>`;
        lastHead = "cat:" + p.cat;
      }
      html += card(p);
    });
    $("#grid").innerHTML = html;
  }

  $("#grid").addEventListener("click", e => {
    const b = e.target.closest("button[data-act]"); if (!b) return;
    const p = byId[b.dataset.id], s = step(p);
    const cur = picks[p.id] ?? s;
    if (b.dataset.act === "inc") picks[p.id] = +(cur + s).toFixed(2);
    if (b.dataset.act === "dec") picks[p.id] = Math.max(s, +(cur - s).toFixed(2));
    if (b.dataset.act === "similar") { openSimilar(p.id); return; }
    if (b.dataset.act === "add") { addToCart(p.id, cur); return; }
    b.parentElement.querySelector("span").textContent = fmtQty(p, picks[p.id]);
  });

  /* ---------- BBQ boxes ---------- */
  function renderBoxes() {
    $("#boxesGrid").innerHTML = P.filter(p => p.cat === "boxes").map((p, i) => `
      <article class="box${i === 1 ? " box--featured" : ""}">
        ${(p.tags || [])[0] ? `<span class="box__badge">${tagHtml(p.tags[0])}</span>` : ""}
        <svg class="box__icon" viewBox="0 0 120 90" aria-hidden="true"><use href="#i-boxes"/></svg>
        <h3>${p.name}</h3>
        <p class="box__en">${pick(p.sub)}</p>
        <p>${pick(p.desc)}</p>
        <div class="box__row">
          <span class="box__price">${money(p.price)}</span>
          ${p.available === false
            ? `<button class="btn btn--line" data-similar="${p.id}">${t("similar_btn")}</button>`
            : `<button class="btn btn--gold" data-box="${p.id}">${t("add")}</button>`}
        </div>
      </article>`).join("");
  }
  $("#boxesGrid").addEventListener("click", e => {
    const s = e.target.closest("[data-similar]"); if (s) return openSimilar(s.dataset.similar);
    const b = e.target.closest("[data-box]"); if (b) addToCart(b.dataset.box, 1);
  });

  /* ---------- Cuts guide ---------- */
  function renderCuts() {
    $("#cutsRows").innerHTML = window.CUTS_GUIDE.map(c =>
      `<div class="cuts__row" role="row"><b role="cell">${c.br}</b><span class="uk" role="cell">${c.uk}</span><span class="best" role="cell">${pick(c.best)}</span></div>`).join("");
  }

  /* ---------- Chart → shop ---------- */
  $$(".cow .cut").forEach(g => {
    g.setAttribute("tabindex", "0");
    g.setAttribute("role", "button");
    const go = () => {
      const key = { contrafile: "contra", picanha: "picanha", costela: "costela" }[g.dataset.cut] || g.dataset.cut;
      activeCat = "beef"; activeGroup = "all";
      const hit = P.filter(p => p.cat === "beef" && p.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(key));
      query = hit.length > 1 ? key : ""; $("#search").value = query;
      renderTabs(); renderGrid();
      if (!hit.length) toast(t("cut_ask").replace("{cut}", g.querySelector("text").textContent));
      const el = hit.length ? document.getElementById("p-" + hit[0].id) : $("#grid");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.classList.add("flash"); setTimeout(() => el.classList.remove("flash"), 1600);
      }
    };
    g.addEventListener("click", go);
    g.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
  });

  /* ---------- Cart ---------- */
  let silentAdd = false;
  function addToCart(id, q) {
    const p = byId[id];
    if (!p || p.available === false) return;
    cart[id] = +((cart[id] || 0) + q).toFixed(2);
    save(); renderCart();
    const c = $("#cartCount"); c.classList.remove("bump"); void c.offsetWidth; c.classList.add("bump");
    toast(`${p.name} ${t("added")} — ${fmtQty(p, q)}`);
    if (!silentAdd) brazaReact(p);
  }
  const total = () => Object.entries(cart).reduce((s, [id, q]) => s + byId[id].price * q, 0);

  function renderCart() {
    const ids = Object.keys(cart);
    $("#cartCount").textContent = ids.length;
    $("#cartEmpty").hidden = ids.length > 0;
    $("#checkout").hidden = $("#drawerFoot").hidden = ids.length === 0;
    $("#cartItems").innerHTML = ids.map(id => {
      const p = byId[id], q = cart[id];
      return `<div class="line">
        <div><div class="line__name">${p.name}</div><div class="line__en">${pick(p.sub)} · ${money(p.price)}${unitLabel(p)}</div></div>
        <div class="line__price">${money(p.price * q)}</div>
        <div class="line__ctrl">
          <div class="qty"><button data-c="dec" data-id="${id}" aria-label="−">−</button><span>${fmtQty(p, q)}</span><button data-c="inc" data-id="${id}" aria-label="+">+</button></div>
          <button class="remove" data-c="rm" data-id="${id}">${t("remove")}</button>
        </div>
      </div>`;
    }).join("");
    const ac = $("#ageCheck");
    if (ac) { ac.hidden = !hasAlcohol(); form.adult.required = hasAlcohol(); }
    updateTotals();
  }

  /* ---------- Delivery fee & totals ---------- */
  const form = $("#checkout");
  const isDelivery = () => form.mode && form.mode.value === "delivery";
  function currentQuote() {
    if (!isDelivery()) return null;
    const pc = form.postcode.value.trim();
    if (!pc) return { status: "empty" };
    const q = window.BB.quoteDelivery(pc, S);
    const f = S.delivery.freeOver;
    if (q.status === "ok" && f && total() >= f) q.fee = 0;
    return q;
  }
  function updateTotals() {
    const sub = total(), q = currentQuote();
    const fee = q && q.status === "ok" ? q.fee : 0;
    $("#cartSubtotal").textContent = money(sub);
    $("#feeRow").hidden = !isDelivery();
    $("#cartFee").textContent = !q || q.status === "empty" || q.status === "invalid" ? "—"
      : q.status === "ok" ? (q.fee === 0 ? "£0.00" : money(q.fee))
      : q.status === "tbc" ? t("tbc") : "—";
    $("#cartTotal").textContent = money(sub + fee);
    const msg = $("#feeMsg");
    if (msg) {
      const pc = q && q.postcode ? `<b>${q.postcode}</b>` : "";
      msg.className = "fee-msg" + (q && (q.status === "out" || q.status === "invalid") ? " fee-msg--bad" : q && q.status === "ok" ? " fee-msg--ok" : "");
      msg.innerHTML = !q ? "" : q.status === "empty" ? t("fee_enter")
        : q.status === "invalid" ? t("fee_bad")
        : q.status === "out" ? t("fee_out").replace("{pc}", pc)
        : q.status === "tbc" ? t("fee_tbc").replace("{pc}", pc)
        : (q.fee === 0 ? t("fee_free") : t("fee_ok")).replace("{pc}", pc).replace("{fee}", money(q.fee));
    }
    const f = S.delivery.freeOver;
    $("#freeNote").textContent = f && isDelivery() ? (sub >= f ? t("free_ok") : t("free_more").replace("{x}", money(f - sub))) : "";
    $("#sendLabel").innerHTML = t(S.onlinePayment ? "d_pay" : "d_send");
    $("#secureNote").innerHTML = t(S.onlinePayment ? "secure" : "secure_manual");
  }

  $("#cartItems").addEventListener("click", e => {
    const b = e.target.closest("button[data-c]"); if (!b) return;
    const id = b.dataset.id, s = step(byId[id]);
    if (b.dataset.c === "inc") cart[id] = +(cart[id] + s).toFixed(2);
    if (b.dataset.c === "dec") cart[id] = +(cart[id] - s).toFixed(2);
    if (b.dataset.c === "rm" || cart[id] <= 0) delete cart[id];
    save(); renderCart();
  });

  /* ---------- Drawer ---------- */
  const drawer = $("#drawer"), overlay = $("#overlay");
  const openCart = () => { drawer.classList.add("open"); drawer.setAttribute("aria-hidden", "false"); overlay.hidden = false; document.body.style.overflow = "hidden"; };
  const closeCart = () => { drawer.classList.remove("open"); drawer.setAttribute("aria-hidden", "true"); overlay.hidden = true; document.body.style.overflow = ""; };
  $("#openCart").addEventListener("click", openCart);
  $("#closeCart").addEventListener("click", closeCart);
  overlay.addEventListener("click", closeCart);
  document.addEventListener("keydown", e => { if (e.key === "Escape") { closeCart(); toggleMenu(false); } });
  drawer.addEventListener("click", e => { if (e.target.closest("[data-close]")) closeCart(); });

  form.addEventListener("change", () => {
    const delivery = isDelivery();
    $(".field--delivery").hidden = !delivery;
    form.address.required = delivery;
    form.postcode.required = delivery;
    updateTotals();
  });
  form.postcode.addEventListener("input", updateTotals);
  form.adult.addEventListener("change", () => $("#ageCheck").classList.remove("age-check--err"));
  form.postcode.addEventListener("blur", () => { if (form.postcode.value.trim()) form.postcode.value = window.BB.normPostcode(form.postcode.value); });

  /* ---------- Checkout: pay online, then send details on WhatsApp ---------- */
  const plain = k => t(k).replace(/<[^>]+>/g, "").replace(/&amp;/g, "&");

  function snapshot() {
    const d = new FormData(form), q = currentQuote();
    return {
      items: { ...cart },
      mode: isDelivery() ? "delivery" : "collect",
      name: d.get("name"), phone: d.get("phone"),
      address: d.get("address") || "", postcode: q && q.postcode ? q.postcode : "",
      fee: q && q.status === "ok" ? q.fee : (q && q.status === "tbc" ? "tbc" : 0),
      day: d.get("day") || "", notes: d.get("notes") || "",
      adult: hasAlcohol() ? !!form.adult.checked : undefined
    };
  }

  function orderMessage(o, paidRef) {
    const lines = Object.entries(o.items).filter(([id]) => byId[id]).map(([id, q]) => {
      const p = byId[id];
      return `• ${p.name} (${pick(p.sub)}) — ${fmtQty(p, q)} — ${money(p.price * q)}`;
    });
    const sub = Object.entries(o.items).reduce((s, [id, q]) => s + (byId[id] ? byId[id].price * q : 0), 0);
    const del = o.mode === "delivery";
    const fee = typeof o.fee === "number" ? o.fee : 0;
    return [
      `*${plain("o_title")}*`, "",
      ...lines, "",
      `*${plain("d_subtotal")}:* ${money(sub)}`,
      del ? `*${plain("d_fee")}:* ${o.fee === "tbc" ? plain("tbc") : money(fee)}` : "",
      `*${plain("d_total")}:* ${money(sub + fee)}`,
      `*${plain("o_payment")}:* ${paidRef ? plain("o_paid") + " · Ref " + paidRef : plain("o_unpaid")}`, "",
      `*${plain("o_option")}:* ${plain(del ? "d_delivery" : "d_collect")}`,
      `*${plain("d_name")}:* ${o.name}`,
      `*${plain("d_phone")}:* ${o.phone}`,
      del ? `*${plain("o_address")}:* ${o.address}` : "",
      del ? `*${plain("o_postcode")}:* ${o.postcode}` : "",
      o.day ? `*${plain("d_day")}:* ${o.day}` : "",
      o.notes ? `*${plain("d_notes")}:* ${o.notes}` : "",
      o.adult ? `*18+:* ✅ ${plain("age_short")}` : ""
    ].filter((l, i, arr) => l !== "" || arr[i - 1] !== "").join("\n");
  }

  function sendManual(o) {
    window.open(wa(orderMessage(o, null)), "_blank", "noopener");
  }

  let paying = false;
  form.addEventListener("submit", async e => {
    e.preventDefault();
    if (!Object.keys(cart).length || paying) return;
    const q = currentQuote();
    if (q && (q.status === "invalid" || q.status === "out" || q.status === "empty")) {
      updateTotals(); form.postcode.focus(); return;
    }
    if (hasAlcohol() && !form.adult.checked) {
      $("#ageCheck").classList.add("age-check--err"); form.adult.focus(); toast(t("age_needed")); return;
    }
    const o = snapshot();
    if (!S.onlinePayment) { sendManual(o); toast(t("opening")); return; }

    paying = true;
    const btn = $("#sendOrder"); btn.disabled = true; btn.classList.add("is-loading");
    toast(t("pay_redirect"));
    try {
      const res = await fetch("/api/checkout", {
        method: "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...o, lang })
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.url) {
        store.set("bb_pending", JSON.stringify(o));
        location.href = data.url;
        return;
      }
      if (res.status === 409) { toast(t("err_oos")); }
      else if (data.error === "age_required") { toast(t("age_needed")); }
      else if (res.status === 503 || res.status === 404 || res.status === 405) { toast(t("pay_fallback")); sendManual(o); }
      else { toast(t("err_generic")); }
    } catch (err) {
      toast(t("pay_fallback")); sendManual(o);
    }
    paying = false; btn.disabled = false; btn.classList.remove("is-loading");
  });

  /* ---------- Return from payment ---------- */
  async function handleReturn() {
    const params = new URLSearchParams(location.search);
    const status = params.get("order");
    if (!status) return;
    const clean = () => history.replaceState(null, "", location.pathname + location.hash);
    if (status === "cancelled") { clean(); toast(t("cancelled")); return; }
    if (status !== "success") return;
    const id = params.get("session_id") || "";
    let pending = null;
    try { pending = JSON.parse(store.get("bb_pending") || "null"); } catch (e) {}
    let ref = null;
    try {
      const r = await fetch("/api/session?id=" + encodeURIComponent(id));
      const d = await r.json();
      if (d.paid) ref = d.ref;
    } catch (e) {}
    clean();
    if (!ref) { toast(t("err_generic")); return; }
    cart = {}; save(); renderCart();
    $("#okRef").innerHTML = `${t("ok_ref")}: <b>${ref}</b>`;
    $("#okWa").href = wa(pending ? orderMessage(pending, ref) : `${plain("o_title")} — ${plain("o_paid")} · Ref ${ref}`);
    store.set("bb_pending", "");
    openModal("#okModal");
    setTimeout(() => brazaSay(t("bz_r_paid")), 800);
  }

  /* ---------- Out of stock → similar products ---------- */
  function similarTo(p) {
    const chosen = (p.similar || []).map(id => byId[id]).filter(x => x && x.available !== false);
    const ok = x => x.id !== p.id && x.available !== false && !chosen.includes(x);
    const sameCat = [...P.filter(x => ok(x) && x.cat === p.cat && x.group && x.group === p.group),
                     ...P.filter(x => ok(x) && x.cat === p.cat && (!x.group || x.group !== p.group))];
    return [...chosen, ...sameCat].slice(0, 3);
  }
  function openSimilar(id) {
    const p = byId[id], list = similarTo(p);
    $("#similarTitle").textContent = t("similar_title").replace("{name}", p.name);
    $("#similarSub").textContent = list.length ? t("similar_sub") : t("similar_none");
    $("#similarList").innerHTML = list.map(s => `
      <div class="similar__item">
        <div class="similar__icon">${s.image ? `<img src="${s.image}" alt="">` : icon(s.cat)}</div>
        <div class="similar__info"><b>${s.name}</b><span>${pick(s.sub)}</span><em>${money(s.price)}${unitLabel(s)}</em></div>
        <button class="btn btn--primary" data-add-similar="${s.id}">${t("add")}</button>
      </div>`).join("") || `<a class="btn btn--wa" href="${wa(t("wa_q") + p.name)}" target="_blank" rel="noopener"><svg><use href="#i-wa"/></svg>${t("v_msg")}</a>`;
    openModal("#similarModal");
    brazaSay(t("bz_r_oos"));
  }
  $("#similarList").addEventListener("click", e => {
    const b = e.target.closest("[data-add-similar]"); if (!b) return;
    const p = byId[b.dataset.addSimilar];
    addToCart(p.id, step(p)); closeModals();
  });

  /* ---------- Modals ---------- */
  function openModal(sel) { $(sel).hidden = false; document.body.style.overflow = "hidden"; }
  function closeModals() { $$(".modal").forEach(m => m.hidden = true); if (!drawer.classList.contains("open")) document.body.style.overflow = ""; }
  $$(".modal").forEach(m => m.addEventListener("click", e => {
    if (e.target === m || e.target.closest("[data-modal-close]")) closeModals();
  }));
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeModals(); });

  /* ---------- Mobile menu ---------- */
  const nav = $("#nav"), menuBtn = $("#menuBtn");
  menuBtn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open);
  });
  nav.addEventListener("click", e => { if (e.target.closest("a")) { nav.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false"); } });

  /* ---------- Toast ---------- */
  let tt;
  function toast(text) {
    const el = $("#toast"); el.textContent = text; el.classList.add("show");
    clearTimeout(tt); tt = setTimeout(() => el.classList.remove("show"), 2200);
  }


  /* ============================================================
     SEU BRAZA — mascot assistant
     ============================================================ */
  const bz = {
    root: $("#braza"), btn: $("#brazaBtn"), panel: $("#brazaPanel"),
    bubble: $("#brazaBubble"), say: $("#brazaSay"),
    menu: $("#brazaMenu"), calc: $("#brazaCalc"), people: 8, timer: null
  };
  const ssGet = k => { try { return sessionStorage.getItem(k); } catch (e) { return null; } };
  const ssSet = (k, v) => { try { sessionStorage.setItem(k, v); } catch (e) {} };

  function brazaSay(html, ms = 5200) {
    if (!bz.root || !bz.panel.hidden) return;
    bz.say.innerHTML = html;
    bz.bubble.hidden = false;
    bz.bubble.classList.remove("pop"); void bz.bubble.offsetWidth; bz.bubble.classList.add("pop");
    bz.btn.classList.remove("wave"); void bz.btn.offsetWidth; bz.btn.classList.add("wave");
    clearTimeout(bz.timer);
    if (ms) bz.timer = setTimeout(() => { bz.bubble.hidden = true; }, ms);
  }
  function brazaReact(p) {
    if (p.id.startsWith("picanha")) return brazaSay(t("bz_r_picanha"));
    if (p.cat === "boxes") return brazaSay(t("bz_r_box"));
    if (p.cat === "drinks") {
      const k = p.group === "beer" ? "bz_r_beer" : p.group === "cachaca" ? "bz_r_cachaca" : p.group === "wine" ? "bz_r_wine" : "bz_r_cheers";
      return brazaSay(t(k), 3800);
    }
    const hasFarofa = cart.farofa;
    const pool = ["bz_r1", "bz_r2"].concat(hasFarofa || p.cat === "groceries" ? [] : ["bz_r3"]);
    brazaSay(t(pool[Math.floor(Math.random() * pool.length)]), 3800);
  }
  function brazaOpen(open) {
    bz.panel.hidden = !open;
    bz.btn.setAttribute("aria-expanded", open);
    bz.root.classList.toggle("is-open", open);
    if (open) { bz.bubble.hidden = true; bz.btn.querySelector(".braza__dot").hidden = true; showView("menu"); ssSet("bz_seen", "1"); }
  }
  function showView(v) {
    bz.menu.hidden = v !== "menu";
    bz.calc.hidden = v !== "calc";
    if (v === "calc") renderCalc();
  }

  /* --- Churrasco calculator --- */
  const MIX = [ ["picanha-angus", .30], ["fraldinha", .20], ["toscana", .20], ["coracao", .10], ["asinha", .10], ["panceta", .10] ];
  function churrascoPlan() {
    const hungry = (document.querySelector('input[name="bzApp"]:checked') || {}).value === "hungry";
    const n = bz.people, totalKg = n * (hungry ? .55 : .4);
    const avail = MIX.filter(([id]) => byId[id] && byId[id].available !== false);
    const share = avail.reduce((s, [, f]) => s + f, 0) || 1;
    const items = avail.map(([id, f]) => [id, Math.max(.5, Math.round((totalKg * f / share) * 2) / 2)]);
    const extra = [["farofa", Math.ceil(n / 6)], ["salgrosso", Math.ceil(n / 15)], ["paodequeijo", Math.ceil(n / 8)]]
      .filter(([id]) => byId[id] && byId[id].available !== false);
    return { n, totalKg, items: items.concat(extra) };
  }
  function renderCalc() {
    $("#bzPeople").textContent = bz.people;
    const plan = churrascoPlan();
    const total = plan.items.reduce((s, [id, q]) => s + byId[id].price * q, 0);
    const box = bz.people <= 4 ? byId.box4 : bz.people <= 8 ? byId.box8 : null;
    const kg = (Math.round(plan.totalKg * 10) / 10).toString();
    $("#bzResult").innerHTML = `
      <p>${t("bz_result").replace("{n}", plan.n).replace("{kg}", kg)}</p>
      <ul class="braza__list">${plan.items.map(([id, q]) => {
        const p = byId[id];
        return `<li><span>${p.name}</span><em>${fmtQty(p, q)}</em><b>${money(p.price * q)}</b></li>`;
      }).join("")}</ul>
      <div class="braza__total"><span>${plain("d_total")}</span><strong>${money(total)}</strong></div>
      <button class="btn btn--pay btn--block" data-bz="addall">${t("bz_add_all")}</button>
      ${box && box.available !== false ? `<button class="braza__box" data-bz="box" data-id="${box.id}">${t("bz_or_box").replace("{box}", box.name).replace("{price}", money(box.price))} →</button>` : ""}`;
  }

  bz.btn.addEventListener("click", () => brazaOpen(bz.panel.hidden));
  $("#brazaClose").addEventListener("click", () => brazaOpen(false));
  $("#brazaBubbleX").addEventListener("click", e => { e.stopPropagation(); bz.bubble.hidden = true; });
  bz.bubble.addEventListener("click", e => { if (e.target.id !== "brazaBubbleX") brazaOpen(true); });
  bz.calc.addEventListener("change", e => { if (e.target.name === "bzApp") renderCalc(); });
  bz.panel.addEventListener("click", e => {
    const b = e.target.closest("[data-bz]"); if (!b) return;
    const act = b.dataset.bz;
    if (act === "menu") showView("menu");
    if (act === "calc") showView("calc");
    if (act === "plus") { bz.people = Math.min(60, bz.people + 1); renderCalc(); }
    if (act === "minus") { bz.people = Math.max(1, bz.people - 1); renderCalc(); }
    if (act === "cuts") { brazaOpen(false); document.getElementById("cuts").scrollIntoView({ behavior: "smooth" }); setTimeout(() => brazaSay(t("bz_cuts")), 900); }
    if (act === "vip") window.open(S.vipGroup, "_blank", "noopener");
    if (act === "wa") window.open(wa(), "_blank", "noopener");
    if (act === "box") { addToCart(b.dataset.id, 1); brazaOpen(false); openCart(); }
    if (act === "addall") {
      silentAdd = true;
      churrascoPlan().items.forEach(([id, q]) => addToCart(id, q));
      silentAdd = false;
      brazaOpen(false); openCart();
      toast(t("bz_added_all"));
    }
  });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !bz.panel.hidden) brazaOpen(false); });

  // Greeting once per visit
  if (!ssGet("bz_seen")) setTimeout(() => { brazaSay(t("bz_greet"), 9000); ssSet("bz_seen", "1"); }, 2600);
  else bz.btn.querySelector(".braza__dot").hidden = true;

  /* Header shrinks on scroll */
  const header = $(".header");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  applyLang();
  if (droppedOos.length) setTimeout(() => toast(`${droppedOos.join(", ")} ${t("removed_oos")}`), 600);
  handleReturn();
})();
