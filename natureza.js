/* =========================================================
   Terrarium Café — vegetação e animações de rolagem
   - Trepadeiras e samambaias são geradas por código (SVG),
     então não há imagens extras para baixar.
   - Só anima transform/opacity; um único listener de scroll
     com requestAnimationFrame; tudo pausa fora da tela.
   - prefers-reduced-motion: tudo aparece estático.
   ========================================================= */
(() => {
  "use strict";
  const NS = "http://www.w3.org/2000/svg";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const small = window.matchMedia("(max-width: 820px)").matches;
  const el = (tag, attrs, parent) => {
    const n = document.createElementNS(NS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  };
  const rng = (seed) => () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
  const f = (n) => n.toFixed(1);

  /* ---------- Trepadeira pendente ---------- */
  const LEAF = "M0 0C13 2 17 19 0 34C-17 19-13 2 0 0Z";
  function buildVine(host) {
    const len = Number(host.dataset.len) || 320;
    const r = rng(Number(host.dataset.seed) || 7);
    const W = 90, seg = 38;
    const svg = el("svg", { viewBox: `0 0 ${W} ${len + 40}`, width: W, height: len + 40, "aria-hidden": "true", focusable: "false" });
    const sway = el("g", { class: "sway" }, svg);
    let x = W / 2, d = `M${x} 0`;
    const nodes = [];
    for (let y = seg; y <= len; y += seg) {
      const nx = W / 2 + (r() - 0.5) * 34;
      d += `Q${f(x + (r() - 0.5) * 26)} ${f(y - seg / 2)} ${f(nx)} ${y}`;
      nodes.push([nx, y]); x = nx;
    }
    el("path", { d, class: "stem", pathLength: 1 }, sway);
    nodes.forEach(([nx, ny], i) => {
      const side = i % 2 ? 1 : -1;
      const t = i / nodes.length;
      const ang = -side * (48 + r() * 34);
      const sc = (1.12 - t * 0.45) * (0.8 + r() * 0.35);
      const g = el("g", { class: "lf", transform: `translate(${f(nx)} ${f(ny)}) rotate(${f(ang)}) scale(${sc.toFixed(2)})`, style: `--i:${i}` }, sway);
      const inner = el("g", { class: `lfi c${1 + Math.floor(r() * 3)}` }, g);
      el("path", { d: LEAF }, inner);
      el("path", { d: "M0 2V30", class: "rib" }, inner);
      if (i === nodes.length - 1) { // folha na ponta
        const g2 = el("g", { class: "lf", transform: `translate(${f(nx)} ${f(ny)}) rotate(${f(side * 12)}) scale(${(sc * 0.85).toFixed(2)})`, style: `--i:${i + 1}` }, sway);
        const in2 = el("g", { class: "lfi c2" }, g2);
        el("path", { d: LEAF }, in2); el("path", { d: "M0 2V30", class: "rib" }, in2);
      }
    });
    host.style.setProperty("--s", `${(6 + r() * 4).toFixed(1)}s`);
    host.appendChild(svg);
  }

  /* ---------- Samambaia (tufo de frondes) ---------- */
  function frond(L, n, bend) {
    let d = "";
    for (let i = 1; i <= n; i++) {
      const t = i / (n + 1), px = bend * t * t, py = -L * t;
      const l = L * 0.3 * Math.pow(Math.sin(Math.PI * (0.1 + 0.9 * t)), 0.8) * (1 - t * 0.3);
      for (const s of [-1, 1]) {
        const tx = px + s * l * 0.92, ty = py - l * 0.45;
        const mx = (px + tx) / 2, my = (py + ty) / 2;
        const dx = tx - px, dy = ty - py, m = Math.hypot(dx, dy) || 1;
        const nx = (-dy / m) * l * 0.2, ny = (dx / m) * l * 0.2;
        d += `M${f(px)} ${f(py)}Q${f(mx + nx)} ${f(my + ny)} ${f(tx)} ${f(ty)}Q${f(mx - nx)} ${f(my - ny)} ${f(px)} ${f(py)}Z`;
      }
    }
    return d;
  }
  function buildFern(host) {
    const r = rng(Number(host.dataset.seed) || 11);
    const k = Number(host.dataset.fronds) || 5;
    const R = 200;
    const svg = el("svg", { viewBox: `${-R} ${-R * 1.05} ${R * 2} ${R * 1.1}`, "aria-hidden": "true", focusable: "false" });
    for (let i = 0; i < k; i++) {
      const spread = k === 1 ? 0 : -58 + (116 * i) / (k - 1);
      const ang = spread + (r() - 0.5) * 14;
      const L = R * (0.62 + r() * 0.36) * (1 - Math.abs(spread) / 260);
      const bend = (spread >= 0 ? 1 : -1) * L * (0.16 + r() * 0.2);
      const g = el("g", { class: "fr", transform: `rotate(${f(ang)})`, style: `--i:${i}` }, svg);
      const inner = el("g", { class: `fri c${1 + (i % 3)}` }, g);
      el("path", { d: frond(L, 13, bend) }, inner);
      el("path", { d: `M0 0Q0 ${f(-L / 2)} ${f(bend)} ${f(-L)}`, class: "rib" }, inner);
    }
    host.appendChild(svg);
  }

  document.querySelectorAll(".vine").forEach(buildVine);
  document.querySelectorAll(".fern").forEach(buildFern);

  /* ---------- Trepadeira lateral que cresce com a rolagem ---------- */
  const side = document.querySelector(".scroll-vine");
  let sideLeaves = [], sideStem = null, sideShown = -1;
  if (side) {
    const r = rng(23), H = 1000, W = 70;
    const svg = el("svg", { viewBox: `0 0 ${W} ${H}`, "aria-hidden": "true", focusable: "false" }, side);
    let x = 26, d = `M${x} -10`;
    for (let y = 46; y <= H + 10; y += 46) {
      const nx = 26 + (r() - 0.5) * 22;
      d += `Q${f(x + (r() - 0.5) * 20)} ${y - 23} ${f(nx)} ${y}`;
      const sd = (y / 46) % 2 ? 1 : -1;
      const g = el("g", { class: "lf", transform: `translate(${f(nx)} ${y}) rotate(${f(-sd * (55 + r() * 30))}) scale(${(0.6 + r() * 0.35).toFixed(2)})` }, svg);
      const inner = el("g", { class: `lfi c${1 + Math.floor(r() * 3)}` }, g);
      el("path", { d: LEAF }, inner); el("path", { d: "M0 2V30", class: "rib" }, inner);
      if (r() > 0.72) { // grãos de café
        const b = el("g", { class: "lf", transform: `translate(${f(nx + sd * 7)} ${y + 8})` }, svg);
        const bi = el("g", { class: "lfi berry" }, b);
        el("circle", { r: 3.6 }, bi); el("circle", { cx: 5.5, cy: 3, r: 3.1 }, bi); el("circle", { cx: 1, cy: 6.4, r: 2.8 }, bi);
        sideLeaves.push([y / H, b]);
      }
      sideLeaves.push([y / H, g]);
      x = nx;
    }
    sideStem = el("path", { d, class: "stem", pathLength: 1 });
    svg.insertBefore(sideStem, svg.firstChild);
    sideLeaves.sort((a, b) => a[0] - b[0]);
  }

  /* ---------- Revelar ao rolar ---------- */
  const groups = [
    [".section-head", "up"], [".hero-copy > *", "up"],
    [".news-photo", "arch"], [".news-body > *", "up"], [".favs .fav", "up"], [".menu-board", "up"],
    [".espaco-copy > *", "left"], [".features li", "up"], [".espaco-media .cloche", "arch"], [".polaroid", "pop"],
    [".atelie-photo", "arch"], [".atelie-card", "right"],
    [".gallery figure", "zoom"], [".reviews-card", "up"],
    [".visite-info > *", "left"], [".hours tr", "left"], [".map", "right"],
    [".footer-inner > *", "up"], [".wave", "wave"],
  ];
  const revealables = [];
  groups.forEach(([sel, kind]) => {
    const byParent = new Map();
    document.querySelectorAll(sel).forEach((n) => {
      if (n.dataset.reveal) return;
      n.dataset.reveal = kind;
      const i = byParent.get(n.parentNode) || 0;
      byParent.set(n.parentNode, i + 1);
      n.style.setProperty("--d", `${Math.min(i, 8) * 70}ms`);
      revealables.push(n);
    });
  });
  const decor = [...document.querySelectorAll(".vine, .fern, .monstera")];

  if (reduce || !("IntersectionObserver" in window)) {
    revealables.concat(decor).forEach((n) => n.classList.add("in"));
    if (sideStem) { sideStem.style.strokeDashoffset = 0; sideLeaves.forEach(([, g]) => g.classList.add("on")); }
    return;
  }
  document.documentElement.classList.add("motion");

  // Elementos com clip-path zerado não "intersectam": observa-se o pai e libera o filho.
  const proxy = new Map();
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      (proxy.get(en.target) || [en.target]).forEach((n) => n.classList.add("in"));
      io.unobserve(en.target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  revealables.concat(decor).forEach((n) => {
    if (n.dataset.reveal === "arch" || n.dataset.reveal === "wave") {
      const host = n.parentElement;
      proxy.set(host, (proxy.get(host) || []).concat(n));
      io.observe(host);
    } else io.observe(n);
  });

  /* ---------- Parallax + pausa fora da tela ---------- */
  const px = small ? [] : [...document.querySelectorAll("[data-px]")];
  const visible = new Set();
  const vis = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      en.target.classList.toggle("live", en.isIntersecting);
      if (en.target.dataset.px) en.isIntersecting ? visible.add(en.target) : visible.delete(en.target);
    });
  }, { rootMargin: "15% 0px 15% 0px" });
  new Set([...px, ...decor]).forEach((n) => vis.observe(n));

  let ticking = false;
  function frame() {
    ticking = false;
    const vh = window.innerHeight;
    visible.forEach((n) => {
      const b = n.getBoundingClientRect();
      const off = (b.top + b.height / 2 - vh / 2) * Number(n.dataset.px);
      n.style.setProperty("--py", `${off.toFixed(1)}px`);
    });
    if (sideStem) {
      const max = document.documentElement.scrollHeight - vh;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 1;
      const grow = 0.06 + p * 0.94;
      sideStem.style.strokeDashoffset = (1 - grow).toFixed(4);
      let n = 0;
      while (n < sideLeaves.length && sideLeaves[n][0] <= grow - 0.01) n++;
      if (n !== sideShown) {
        sideLeaves.forEach(([, g], i) => g.classList.toggle("on", i < n));
        sideShown = n;
      }
    }
  }
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  frame();
})();
