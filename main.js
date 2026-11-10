/* Terrarium Café — interações do site */
(() => {
  "use strict";

  /* ------------------------------------------------------------
     CARDÁPIO (dados em cardapio.js)
     ------------------------------------------------------------ */
  const brl = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const esc = (t) => t.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const DATA = window.CARDAPIO || [];
  const tabs = document.getElementById("menu-tabs");
  const panel = document.getElementById("menu-panel");

  function renderSecao(sec) {
    panel.setAttribute("aria-labelledby", `tab-${sec.id}`);
    panel.innerHTML = (sec.nota ? `<p class="menu-sec-note">${esc(sec.nota)}</p>` : "") +
      `<div class="menu-cols">` +
      sec.grupos.map((g) => `
        <section class="menu-group${g.destaque ? " is-featured" : ""}">
          <h3>${esc(g.titulo)}</h3>
          <ul>
            ${g.itens.map(([nome, desc, preco]) => `
              <li>
                <div class="mi-line"><span class="mi-name">${esc(nome)}</span><span class="mi-dots" aria-hidden="true"></span>${preco == null ? `<span class="mi-price mi-ask">Consultar com o atendente</span>` : `<span class="mi-price">${brl(preco)}</span>`}</div>
                ${desc ? `<p class="mi-desc">${esc(desc)}</p>` : ""}
              </li>`).join("")}
          </ul>
        </section>`).join("") +
      `</div>`;
  }

  DATA.forEach((sec, i) => {
    const b = document.createElement("button");
    b.className = "chip"; b.type = "button";
    b.id = `tab-${sec.id}`;
    b.setAttribute("role", "tab");
    b.setAttribute("aria-controls", "menu-panel");
    b.setAttribute("aria-selected", String(i === 0));
    b.tabIndex = i === 0 ? 0 : -1;
    b.textContent = sec.aba;
    b.addEventListener("click", () => select(i));
    tabs.appendChild(b);
  });
  const chips = [...tabs.children];
  function select(i, focus) {
    chips.forEach((c, j) => { c.setAttribute("aria-selected", String(i === j)); c.tabIndex = i === j ? 0 : -1; });
    if (focus) chips[i].focus();
    renderSecao(DATA[i]);
  }
  tabs.addEventListener("keydown", (e) => {
    const i = chips.indexOf(document.activeElement);
    if (i < 0) return;
    const map = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: chips.length - 1 };
    if (!(e.key in map)) return;
    e.preventDefault();
    select((map[e.key] + chips.length) % chips.length, true);
  });
  if (DATA.length) select(0);

  /* ------------------------------------------------------------
     ABERTO AGORA? (Qua–Dom, 10h–18h30, horário de São Paulo)
     ------------------------------------------------------------ */
  const OPEN_DAYS = [0, 3, 4, 5, 6];
  const OPEN = 10 * 60, CLOSE = 18 * 60 + 30;
  function spNow() {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Sao_Paulo", weekday: "short", hour: "numeric", minute: "numeric", hourCycle: "h23",
    }).formatToParts(new Date());
    const get = (t) => parts.find((p) => p.type === t).value;
    const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
    return { day, min: Number(get("hour")) * 60 + Number(get("minute")) };
  }
  function updateStatus() {
    const { day, min } = spNow();
    const el = document.querySelector("[data-status]");
    const txt = document.querySelector("[data-status-text]");
    const isOpen = OPEN_DAYS.includes(day) && min >= OPEN && min < CLOSE;
    el.classList.toggle("is-open", isOpen);
    el.classList.toggle("is-closed", !isOpen);
    if (isOpen) {
      txt.textContent = "Aberto agora · até 18h30";
    } else if (OPEN_DAYS.includes(day) && min < OPEN) {
      txt.textContent = "Fechado · abre hoje às 10h";
    } else {
      let d = (day + 1) % 7;
      while (!OPEN_DAYS.includes(d)) d = (d + 1) % 7;
      const nome = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"][d];
      txt.textContent = d === (day + 1) % 7 ? "Fechado · abre amanhã às 10h" : `Fechado · abre ${nome} às 10h`;
    }
    document.querySelectorAll(".hours tr").forEach((tr) => tr.classList.toggle("today", Number(tr.dataset.day) === day));
  }
  updateStatus();
  setInterval(updateStatus, 60_000);

  /* ------------------------------------------------------------
     MENU MOBILE
     ------------------------------------------------------------ */
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  function setMenu(open) {
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  }
  toggle.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
  nav.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("open")) { setMenu(false); toggle.focus(); }
  });

  /* ------------------------------------------------------------
     HEADER + LINK ATIVO (animações em natureza.js)
     ------------------------------------------------------------ */
  const header = document.querySelector(".site-header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const links = [...document.querySelectorAll(".nav a")];
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      links.forEach((a) => a.toggleAttribute("aria-current", a.hash === `#${en.target.id}`));
      links.forEach((a) => a.hasAttribute("aria-current") && a.setAttribute("aria-current", "true"));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  document.querySelectorAll("main section[id]").forEach((s) => spy.observe(s));
})();
