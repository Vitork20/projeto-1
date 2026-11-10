# Terrarium Café — site

Site estático (HTML + CSS + JS puro, sem build). Abra `index.html` no navegador ou publique a pasta em qualquer hospedagem estática (GitHub Pages, Netlify, Vercel).

| Arquivo | O que é |
|---|---|
| `index.html` | Estrutura e textos |
| `styles.css` | Visual (tokens de cor no topo) |
| `cardapio.js` | **Cardápio completo** — edite preços e itens aqui |
| `novidades.js` | **Novidades** (promoções, sorteios, avisos) — edite aqui |
| `main.js` | Abas do cardápio, status aberto/fechado, menu mobile |
| `natureza.js` | Vegetação (trepadeiras, samambaias) gerada em SVG e animações de rolagem |
| `assets/img/logo.png` | Logomarca (480 px, recortada da arte oficial) |
| `assets/img/fotos/` | Fotos do salão, ateliê e pratos |

## Fotos

As fotos têm autorização dos responsáveis. Foram recortadas dos prints do Google Maps/Instagram e ampliadas com **Real-ESRGAN x4plus** (IA de super-resolução). A IA reconstrói nitidez, mas não recupera detalhe real: para as fotos principais (hero e ateliê), fotos originais em alta continuam sendo a melhor opção. Mantenha os mesmos nomes de arquivo ao trocar.

## Cardápio — regras

- Em caso de dúvida de preço, use `preco: null` em `cardapio.js`: o site exibe **"Consultar com o atendente"**.
- Hoje isso vale para o adicional do Pão de Campanha (o cardápio impresso diz "requeijão R$ 2,00"; o online, "azeitonada ou salada R$ 2,00").
- Diferenças de descrição (não de preço) entre impresso e online — usei o impresso: Quiche (18 × 20 min de preparo) e ingredientes do Parma Crocante.
- Os cafés vieram só do cardápio online.

## Identidade

Tema "dentro do terrário": fundo verde profundo, superfícies de vidro e folhagem viva. A logomarca e a tipografia não mudaram.

| Token | Hex | Uso |
|---|---|---|
| `--noite` / `--noite-2` / `--noite-3` | `#0C1D13` / `#12291B` / `#081510` | fundos |
| `--musgo` / `--oliva` / `--folha` / `--folha-clara` | `#2C7434` / `#58A63E` / `#7CC653` / `#A9DB7C` | folhagem, botões, destaques |
| `--creme` | `#DEC68A` | disco da logo; "latão" das molduras de vidro e títulos do cardápio |
| `--cereja` / `--leaf` | `#BA5430` / `#90AE9C` | grãos e folhas da logo (detalhes) |
| `--tinta` | `#F2F0E6` | texto |

Tipografia: Fraunces (títulos), Karla (texto), Caveat (notas manuscritas).
Elementos-assinatura: moldura de vidro fixa em volta da tela (`.glass-frame`), folhagem desfocada em primeiro plano (`.depth`, só ≥ 1340 px), molduras em arco, e o "chão" do terrário (musgo, pedras, cascalho e terra) antes do rodapé.

Plantas geradas em `natureza.js`: `<div class="plant" data-plant="ficus|palmeira|laminas" data-seed="3"></div>`, além de `.vine`, `.fern` e `.monstera`.

**Fotos de terrários** (`assets/img/terrarios/`): são imagens de referência, não terrários do café. Confirme os direitos de uso ou troque por fotos dos terrários da casa.

## Vegetação e movimento

- Trepadeiras e samambaias são desenhadas por código (`natureza.js`), sem imagens extras. Para adicionar uma: `<div class="vine" data-len="260" data-seed="7"></div>` ou `<div class="fern" data-seed="3" data-fronds="5"></div>` e posicione via CSS. `data-seed` muda o desenho.
- Em telas ≥ 1340 px, uma trepadeira na lateral esquerda cresce conforme a página é rolada.
- Só `transform`/`opacity`/`clip-path` são animados; um único listener de scroll com `requestAnimationFrame`; balanço das plantas pausa fora da tela; parallax desligado no mobile.
- Com "reduzir movimento" ativo no sistema (ou sem JavaScript), tudo aparece estático e visível.

## Topo (primeira imagem)

A primeira imagem é o salão (`assets/img/fotos/hero-ambiente.jpg`), não um prato: o diferencial da casa é comer dentro de um terrário. Movimento aplicado sobre a foto estática: zoom sincronizado com a rolagem (`main.js`), deriva lenta contínua, lâmpadas e LEDs "respirando" (`.glow`, posicionados em % sobre os pontos de luz reais) e partículas de luz (`.motes`). Ao trocar a foto, ajuste as posições `--x/--y` dos `.glow` e `--focus` do `.hero-stage` em `styles.css`.

## Novidades

A seção "Novidades" fica logo abaixo do topo e é alimentada por `novidades.js`. Cada item pode ter selo, título, texto, passos, datas, foto e link. Com `ate: "AAAA-MM-DD"`, o item sai do site sozinho depois desse dia; sem itens ativos, a seção e o link do menu somem. Menções como `@perfil` viram link para o Instagram.
