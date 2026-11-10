/* =========================================================
   Novidades do Terrarium Café
   Para publicar uma novidade, adicione um bloco em NOVIDADES.
   - ate: "AAAA-MM-DD" (opcional) → some do site sozinha depois
     desse dia (horário de São Paulo). Sem itens ativos, a seção
     inteira e o link do menu desaparecem.
   - passos, detalhes e link são opcionais.
   ========================================================= */
window.NOVIDADES = [
  {
    selo: "Sorteio de aniversário",
    titulo: "O aniversário é nosso, o presente é seu",
    texto: "Tem sorteio rolando! A cada R$ 100 em compras aqui no Terrarium você ganha um cupom para concorrer a um Devil's Cake inteiro. Vale também para cada R$ 100 em compras na @quemamacultiva. Traga os amigos e a família e aumente as suas chances.",
    passos: ["Compre R$ 100 no Terrarium ou na @quemamacultiva", "Ganhe 1 cupom a cada R$ 100", "Concorra a um Devil's Cake inteiro"],
    detalhes: [["Participe até", "29/11"], ["Entrega do bolo", "5/12"]],
    ate: "2026-11-29",
    foto: "assets/img/novidades/devils-cake.jpg",
    alt: "Devil's Cake inteiro, coberto de ganache de chocolate, sendo colocado sobre a mesa",
    link: { texto: "Ver no Instagram", url: "https://www.instagram.com/terrariumcafescs/" },
  },
];

(() => {
  "use strict";
  const sec = document.getElementById("novidades");
  if (!sec) return;
  const hoje = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo" }).format(new Date()); // AAAA-MM-DD
  const ativos = (window.NOVIDADES || []).filter((n) => !n.ate || n.ate >= hoje);
  if (!ativos.length) {
    sec.hidden = true;
    document.querySelectorAll('a[href="#novidades"]').forEach((a) => (a.closest("li") || a).remove());
    return;
  }
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  // @perfil vira link para o Instagram
  const rico = (t) => esc(t).replace(/@([a-z0-9._]+)/gi, '<a href="https://www.instagram.com/$1/" target="_blank" rel="noopener">@$1</a>');
  sec.querySelector(".news-list").innerHTML = ativos.map((n) => `
    <article class="news-card">
      ${n.foto ? `<figure class="news-photo"><img src="${esc(n.foto)}" alt="${esc(n.alt || "")}" width="820" height="844" loading="lazy"></figure>` : ""}
      <div class="news-body">
        ${n.selo ? `<p class="news-tag">${esc(n.selo)}</p>` : ""}
        <h3>${esc(n.titulo)}</h3>
        <p>${rico(n.texto)}</p>
        ${n.passos ? `<ol class="news-steps">${n.passos.map((p) => `<li><span>${rico(p)}</span></li>`).join("")}</ol>` : ""}
        ${n.detalhes ? `<dl class="news-facts">${n.detalhes.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>` : ""}
        ${n.link ? `<a class="btn btn-primary" href="${esc(n.link.url)}" target="_blank" rel="noopener">${esc(n.link.texto)}</a>` : ""}
      </div>
    </article>`).join("");
})();
