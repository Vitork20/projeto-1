# Terrarium Café — site

Site estático (HTML + CSS + JS puro, sem build). Abra `index.html` no navegador ou publique a pasta em qualquer hospedagem estática (GitHub Pages, Netlify, Vercel).

## Antes de publicar — pendências reais

1. **Logomarca original.** `assets/img/logo.png` foi recortada de um print do Instagram (≈75 px ampliados) e fica borrada em telas retina. Substitua pelo arquivo original (PNG transparente ou SVG, ≥ 512 px) mantendo o mesmo nome.
2. **Fotos.** Enquanto não existirem, o site mostra um placeholder verde com o nome da foto. Coloque os arquivos com estes nomes:
   - `assets/img/fotos/`: `hero.jpg`, `neon.jpg`, `fachada.jpg`, `atelie.jpg`, `galeria-1.jpg` … `galeria-6.jpg`
   - `assets/img/cardapio/`: `cafe-autoral.jpg`, `cafes.jpg`, `toast-costela.jpg`, `toast-cartola.jpg`, `choripan.jpg`, `mille.jpg`, `tortinha-chocolate.jpg`, `saladas.jpg`
   Use JPG/WebP com ~1600 px no maior lado (hero) e ~800 px (demais).
3. **Cardápio e preços.** Itens vieram dos posts do Instagram; descrições são genéricas e **sem preço**. Edite o array `CARDAPIO` no topo de `main.js` (`preco: 24.9` exibe "R$ 24,90").
4. **Horários.** Quarta a domingo, 10h–18h30 (bio + post "Aviso"). Se mudar, atualize a tabela em `index.html` e `OPEN_DAYS/OPEN/CLOSE` em `main.js`.

## Identidade

| Token | Hex | Origem |
|---|---|---|
| `--creme` | `#EBC194` | disco da logomarca |
| `--tinta` | `#4A2C14` | lettering da logo |
| `--cereja` | `#7A3220` | grãos de café da logo |
| `--leaf` | `#5F6E74` | folhas da logo |
| `--floresta` / `--musgo` / `--oliva` | `#2F4410` / `#486018` / `#6C843C` | verdes dos posts |
| `--terracota` | `#9C6024` | capas dos destaques |

Tipografia: Fraunces (títulos), Karla (texto), Caveat (notas manuscritas, como nos posts).
Elemento-assinatura: molduras em arco no formato de redoma de terrário.
