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

## Fotos

As fotos têm autorização dos responsáveis. Foram recortadas dos prints do Google Maps/Instagram e ampliadas com **Real-ESRGAN x4plus** (IA de super-resolução). A IA reconstrói nitidez, mas não recupera detalhe real: para as fotos principais (hero e ateliê), fotos originais em alta continuam sendo a melhor opção. Mantenha os mesmos nomes de arquivo ao trocar.

## Cardápio — regras

- Em caso de dúvida de preço, use `preco: null` em `cardapio.js`: o site exibe **"Consultar com o atendente"**.
- Hoje isso vale para o adicional do Pão de Campanha (o cardápio impresso diz "requeijão R$ 2,00"; o online, "azeitonada ou salada R$ 2,00").
- Diferenças de descrição (não de preço) entre impresso e online — usei o impresso: Quiche (18 × 20 min de preparo) e ingredientes do Parma Crocante.
- Os cafés vieram só do cardápio online.

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
