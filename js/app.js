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
  let activeCat = "all", query = "";
  try { cart = JSON.parse(store.get("bb_cart") || "{}"); } catch (e) { cart = {}; }
  Object.keys(cart).forEach(id => { if (!byId[id]) delete cart[id]; });
  const save = () => store.set("bb_cart", JSON.stringify(cart));

  const step = p => (p.unit === "kg" ? KG_STEP : 1);
  const fmtQty = (p, q) => (p.unit === "kg" ? (q % 1 ? q.toFixed(1) : q) + " kg" : "× " + q);
  const unitLabel = p => (p.unit === "kg" ? "/kg" : "");
  const icon = cat => `<svg viewBox="0 0 120 90" aria-hidden="true"><use href="#i-${cat}"/></svg>`;
  const tagHtml = k => `<span class="tag${["gf", "vegan", "portuguese"].includes(k) ? " tag--green" : ""}">${t("tag_" + k)}</span>`;
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
  }

  /* ---------- Tabs & search ---------- */
  const tabs = $("#tabs");
  function renderTabs() {
    tabs.innerHTML = CATS.map(c =>
      `<button class="tab" role="tab" data-cat="${c}" aria-selected="${c === activeCat}">${t("cat_" + c)}</button>`).join("");
  }
  tabs.addEventListener("click", e => {
    const b = e.target.closest(".tab"); if (!b) return;
    activeCat = b.dataset.cat; renderTabs(); renderGrid();
  });
  $("#search").addEventListener("input", e => { query = e.target.value.trim().toLowerCase(); renderGrid(); });

  /* ---------- Product grid ---------- */
  function card(p) {
    const q = picks[p.id] ?? step(p);
    const out = p.available === false;
    const media = p.image ? `<img src="${p.image}" alt="${p.name} — ${pick(p.sub)}" loading="lazy">` : icon(p.cat);
    return `
      <article class="card${out ? " card--out" : ""}" id="p-${p.id}">
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
            <div class="card__buy">
              <div class="qty">
                <button data-act="dec" data-id="${p.id}" aria-label="−">−</button>
                <span>${fmtQty(p, q)}</span>
                <button data-act="inc" data-id="${p.id}" aria-label="+">+</button>
              </div>
              <button class="add" data-act="add" data-id="${p.id}" aria-label="${t("add")}: ${p.name}" ${out ? "disabled" : ""}>
                <svg viewBox="0 0 24 24"><use href="#i-cart"/></svg>
              </button>
            </div>
          </div>
        </div>
      </article>`;
  }

  function renderGrid() {
    const list = P.filter(p =>
      (activeCat === "all" || p.cat === activeCat) &&
      (!query || [p.name, p.sub.en, pick(p.sub), pick(p.desc)].join(" ").toLowerCase().includes(query)));
    $("#grid").innerHTML = list.length ? list.map(card).join("") : `<p class="empty-state">${t("none")}</p>`;
  }

  $("#grid").addEventListener("click", e => {
    const b = e.target.closest("button[data-act]"); if (!b) return;
    const p = byId[b.dataset.id], s = step(p);
    const cur = picks[p.id] ?? s;
    if (b.dataset.act === "inc") picks[p.id] = +(cur + s).toFixed(2);
    if (b.dataset.act === "dec") picks[p.id] = Math.max(s, +(cur - s).toFixed(2));
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
          <button class="btn btn--gold" data-box="${p.id}">${t("add")}</button>
        </div>
      </article>`).join("");
  }
  $("#boxesGrid").addEventListener("click", e => {
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
      activeCat = "beef"; query = ""; $("#search").value = "";
      renderTabs(); renderGrid();
      const el = document.getElementById("p-" + g.dataset.cut);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.classList.add("flash"); setTimeout(() => el.classList.remove("flash"), 1600);
      }
    };
    g.addEventListener("click", go);
    g.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
  });

  /* ---------- Cart ---------- */
  function addToCart(id, q) {
    const p = byId[id];
    if (!p || p.available === false) return;
    cart[id] = +((cart[id] || 0) + q).toFixed(2);
    save(); renderCart();
    const c = $("#cartCount"); c.classList.remove("bump"); void c.offsetWidth; c.classList.add("bump");
    toast(`${p.name} ${t("added")} — ${fmtQty(p, q)}`);
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
    const tot = total(), f = S.delivery.freeOver;
    $("#cartTotal").textContent = money(tot);
    $("#freeNote").textContent = f ? (tot >= f ? t("free_ok") : t("free_more").replace("{x}", money(f - tot))) : "";
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

  const form = $("#checkout");
  form.addEventListener("change", () => {
    const delivery = form.mode.value === "delivery";
    $(".field--delivery").hidden = !delivery;
    form.address.required = delivery;
  });

  /* ---------- Send order on WhatsApp ---------- */
  form.addEventListener("submit", e => {
    e.preventDefault();
    if (!Object.keys(cart).length) return;
    const d = new FormData(form);
    const plain = k => t(k).replace(/<[^>]+>/g, "").replace(/&amp;/g, "&");
    const lines = Object.entries(cart).map(([id, q]) => {
      const p = byId[id];
      return `• ${p.name} (${pick(p.sub)}) — ${fmtQty(p, q)} — ${money(p.price * q)}`;
    });
    const isDel = d.get("mode") === "delivery";
    const msg = [
      `*${plain("o_title")}*`, "",
      ...lines, "",
      `*${plain("d_total")}:* ${money(total())}`,
      `*${plain("o_option")}:* ${plain(isDel ? "d_delivery" : "d_collect")}`,
      `*${plain("d_name")}:* ${d.get("name")}`,
      `*${plain("d_phone")}:* ${d.get("phone")}`,
      isDel ? `*${plain("o_address")}:* ${d.get("address")}` : "",
      d.get("day") ? `*${plain("d_day")}:* ${d.get("day")}` : "",
      d.get("notes") ? `*${plain("d_notes")}:* ${d.get("notes")}` : ""
    ].filter((l, i, a) => l !== "" || a[i - 1] !== "").join("\n");
    window.open(wa(msg), "_blank", "noopener");
    toast(t("opening"));
  });

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

  applyLang();
})();
