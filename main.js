/* Terrarium Café — interações do site */
(() => {
  "use strict";

  /* ------------------------------------------------------------
     CARDÁPIO
     Edite os itens aqui. "preco" é opcional: deixe null para
     esconder. "foto" aponta para assets/img/cardapio/.
     Itens abaixo foram tirados dos posts do Instagram; descrições
     e preços devem ser confirmados com a casa.
     ------------------------------------------------------------ */
  const CARDAPIO = [
    { cat: "cafes",   nome: "Café autoral",        desc: "Criações exclusivas da casa — pergunte qual é a da vez.", preco: null, foto: "cafe-autoral.jpg" },
    { cat: "cafes",   nome: "Cafés especiais",     desc: "Espresso, coado e bebidas com leite preparados com grãos selecionados.", preco: null, foto: "cafes.jpg" },
    { cat: "toasts",  nome: "Toast de costela",    desc: "Pão tostado, costela desfiada e queijo derretido.", preco: null, foto: "toast-costela.jpg" },
    { cat: "toasts",  nome: "Toast Cartola",       desc: "A clássica combinação da cartola em versão toast.", preco: null, foto: "toast-cartola.jpg" },
    { cat: "lanches", nome: "Choripan",            desc: "Pão, linguiça grelhada e molho da casa.", preco: null, foto: "choripan.jpg" },
    { cat: "doces",   nome: "Mille",               desc: "Camadas de massa e creme, um dos queridinhos da vitrine.", preco: null, foto: "mille.jpg" },
    { cat: "doces",   nome: "Tortinha de chocolate", desc: "Base crocante, chocolate e cobertura cremosa.", preco: null, foto: "tortinha-chocolate.jpg" },
    { cat: "saladas", nome: "Saladas da casa",     desc: "Opções leves e frescas — confira as do dia nos destaques.", preco: null, foto: "saladas.jpg" },
  ];

  const LABEL = { cafes: "Café", toasts: "Toast", lanches: "Lanche", doces: "Doce", saladas: "Salada" };
  const brl = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  /* Placeholder com padrão botânico enquanto a foto não existe */
  function fallback(img) {
    const ph = document.createElement("div");
    ph.className = "ph";
    ph.setAttribute("role", "img");
    ph.setAttribute("aria-label", img.alt || "");
    ph.textContent = img.dataset.fallback || "";
    img.replaceWith(ph);
  }
  function watchImg(img) {
    if (img.complete && img.naturalWidth === 0) fallback(img);
    else img.addEventListener("error", () => fallback(img), { once: true });
  }

  const grid = document.getElementById("menu-grid");
  function renderMenu(filter) {
    const items = filter === "todos" ? CARDAPIO : CARDAPIO.filter((i) => i.cat === filter);
    grid.innerHTML = "";
    items.forEach((item, idx) => {
      const card = document.createElement("article");
      card.className = "dish";
      card.style.animationDelay = `${idx * 40}ms`;
      card.innerHTML = `
        <div class="dish-media">
          <img src="assets/img/cardapio/${item.foto}" alt="${item.nome}" loading="lazy" width="640" height="480" data-fallback="${item.nome}">
        </div>
        <div class="dish-body">
          <span class="dish-tag">${LABEL[item.cat]}</span>
          <h3>${item.nome}</h3>
          <p>${item.desc}</p>
          ${item.preco != null ? `<span class="dish-price">${brl(item.preco)}</span>` : ""}
        </div>`;
      grid.appendChild(card);
      watchImg(card.querySelector("img"));
    });
  }

  const chips = [...document.querySelectorAll(".chip")];
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.setAttribute("aria-selected", String(c === chip)));
      renderMenu(chip.dataset.filter);
    });
  });
  // setas do teclado entre as categorias
  document.querySelector(".chips").addEventListener("keydown", (e) => {
    const i = chips.indexOf(document.activeElement);
    if (i < 0 || !["ArrowRight", "ArrowLeft"].includes(e.key)) return;
    e.preventDefault();
    const next = chips[(i + (e.key === "ArrowRight" ? 1 : chips.length - 1)) % chips.length];
    next.focus(); next.click();
  });
  renderMenu("todos");

  document.querySelectorAll("img[data-fallback]").forEach(watchImg);

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
     HEADER + LINK ATIVO + REVELAR AO ROLAR
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

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce && "IntersectionObserver" in window) {
    const targets = document.querySelectorAll(".section-head, .espaco-copy, .espaco-media, .atelie-grid > *, .gallery figure, .reviews-card, .visite-grid > *");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -10% 0px" });
    targets.forEach((t) => { t.classList.add("reveal"); io.observe(t); });
  }
})();
