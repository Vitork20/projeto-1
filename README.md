# Terrarium Café — site

Site estático (HTML + CSS + JS puro, sem build). Abra `index.html` no navegador ou publique a pasta em qualquer hospedagem estática (GitHub Pages, Netlify, Vercel).

| Arquivo | O que é |
|---|---|
| `index.html` | Estrutura e textos |
| `styles.css` | Visual (tokens de cor no topo) |
| `cardapio.js` | **Cardápio completo** — edite preços e itens aqui |
| `main.js` | Abas do cardápio, status aberto/fechado, menu mobile, animações |
| `assets/img/logo.png` | Logomarca (480 px, recortada da arte oficial) |
| `assets/img/fotos/` | Fotos do salão, ateliê e pratos |

## Pendências antes de publicar

1. **Direitos das fotos.** As fotos foram recortadas de prints do Google Maps e do Instagram. Várias são de clientes (ex.: "Rosa Mon", jul/2024), não da casa. Para uso comercial, substitua por fotos próprias do Terrarium ou obtenha autorização.
2. **Resolução.** Exceto `atelie-estante.jpg` (985 px), as fotos têm ~280 px de largura e ficam levemente suaves em telas retina. Fotos originais com ≥ 1200 px resolvem; mantenha os mesmos nomes de arquivo.
3. **Logo vetorial.** `logo.png` está boa até ~240 px de exibição. Um SVG/PNG original é melhor.
4. **Divergências no cardápio** entre o cardápio impresso e o online (usei o impresso):
   - Pão de Campanha Chapeado: adicional "requeijão R$ 2,00" (impresso) × "azeitonada ou salada R$ 2,00" (online)
   - Quiche: 18 min (impresso) × 20 min (online)
   - Parma Crocante: impresso inclui requeijão cremoso, mussarela ralada e tomate cereja
   - Os cafés vieram só do cardápio online — conferir.

## Identidade

| Token | Hex | Origem |
|---|---|---|
| `--creme` | `#DEC68A` | disco da logomarca |
| `--tinta` | `#4E2A1E` | lettering da logo |
| `--cereja` | `#BA5430` | grãos de café da logo / títulos do cardápio impresso |
| `--leaf` | `#90AE9C` | folhas da logo |
| `--floresta` / `--musgo` / `--oliva` | `#2F4410` / `#486018` / `#6C843C` | verdes dos posts |
| `--terracota` | `#9A4222` | grão escurecido para texto pequeno (contraste AA) |

Tipografia: Fraunces (títulos), Karla (texto), Caveat (notas manuscritas, como nos posts).
Elemento-assinatura: molduras em arco no formato de redoma de terrário. Fundo de folhagem no cardápio, ecoando a arte impressa.
