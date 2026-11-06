/* =========================================================
   Cardápio do Terrarium Café
   Fonte: cardápio impresso + cardápio online (cafés).
   Para editar: altere nome / desc / preco. Grupos viram
   subtítulos dentro de cada aba.
   preco: null  → exibe "Consultar com o atendente" (use em
   caso de dúvida de preço).
   ========================================================= */
window.CARDAPIO = [
  {
    id: "cafes", aba: "Cafés",
    grupos: [
      { titulo: "Quentes", itens: [
        ["Espresso", "", 7],
        ["Espresso Duplo", "", 10],
        ["Café c/ Leite P", "", 9],
        ["Café c/ Leite G", "", 12],
        ["Macchiato", "espresso com espuma de leite", 8.5],
        ["Latte Macchiato P", "leite, 1 dose de espresso e espuma de leite", 10],
        ["Latte Macchiato G", "leite, 1 dose de espresso e espuma de leite", 13],
        ["Cappuccino Italiano", "1/3 leite, 1/3 café espresso, 1/3 espuma", 14],
        ["Mocaccino", "calda de chocolate ou caramelo, 1 dose de espresso, leite vaporizado", 15],
        ["Chocolate Quente", "", 16],
        ["Chai Latte", "bebida à base de leite, chá preto e especiarias", 15],
      ]},
      { titulo: "Gelados", itens: [
        ["Iced Coffee", "2 doses de espresso em um copo com gelo", 13],
        ["Iced Latte", "latte macchiato gelado", 14],
        ["Iced Mocha", "mocaccino gelado", 17],
        ["Iced Chai Latte", "bebida à base de leite, chá preto e especiarias", 16],
        ["Sweet Iced Coffee", "leite condensado, 1 dose de espresso e leite cremoso gelado", 17],
        ["Espresso Tônica", "água tônica, gelo e uma dose de espresso", 17],
        ["Espresso Tônica Flavour", "com xarope — consultar sabores", 19],
        ["Orange Coffee 400ml", "mel, suco de laranja e 1 dose de espresso", 19],
        ["Affogato", "2 bolas de sorvete de creme com 1 dose de espresso", 22],
        ["Chocolate Gelado", "", 16],
      ]},
      { titulo: "Autorais da casa", destaque: true, itens: [
        ["Café Terrarium", "calda de caramelo, licor de doce de leite, leite, gelo, espuma de café, finalizado com canela em pó", 25],
        ["Café Millennium", "calda de chocolate, licor de whisky, leite, gelo, espuma de café, finalizado com chocolate em pó", 27],
      ]},
    ],
  },
  {
    id: "brunch", aba: "Brunch",
    grupos: [
      { titulo: "Menu de Brunch", itens: [
        ["Porção de Mini Pão de Queijo", "8 unidades (tempo de preparo 18 minutos)", 12],
        ["Pão de Campanha Chapeado", "", 10],
        ["Adicional p/ Pão de Campanha", "requeijão, azeitonada ou salada", null],
        ["Torta Salgada – Frango ou Palmito", "tempo de preparo 20 minutos", 16],
        ["Quiche", "espinafre, alho poró ou quatro queijos (tempo de preparo 18 minutos)", 19],
        ["Waffles", "+2 acompanhamentos: mel, doce de leite, creme de avelã, banana, manteiga e geleia de morango ou damasco", 22],
        ["Ovos Mexidos", "c/ pão de campanha chapeado (adicionais: chips de parma R$ 7,00 / ovo mexido R$ 5,00)", 19],
        ["Queijo Quente no Pão de Campanha", "queijo muçarela e tomate cereja temperado", 25],
        ["Bauru no Pão de Campanha", "presunto, muçarela e tomate cereja temperado", 28],
      ]},
    ],
  },
  {
    id: "toasts", aba: "Toasts",
    grupos: [
      { titulo: "Toasts", itens: [
        ["Brie c/ Damasco", "fatias de brie, geleia de damasco, mix de castanhas e damasco", 38],
        ["Caponata", "requeijão cremoso, caponata de berinjela, mozzarela de búfala, mix de castanhas e broto comestível", 38],
        ["Veggie", "guacamole, shimeji e broto comestível", 35],
        ["Caprese", "requeijão, tomate cereja temperado, mozzarela de búfala, molho de manjericão, folhas frescas de manjericão", 35],
      ]},
      { titulo: "Toasts Especiais", destaque: true, itens: [
        ["Parma", "requeijão, fatias de presunto parma, mozzarela de búfala, tomate confit e broto comestível", 42],
        ["Salmone", "sour cream de salmão, picles de cebola roxa, carpaccio de salmão defumado e broto comestível", 42],
        ["Parma Crocante", "requeijão cremoso, mussarela ralada, tomate cereja temperado, molho de manjericão, mozzarela de búfala, chips de presunto parma e broto comestível", 42],
        ["Pera c/ Gorgonzola", "creme de gorgonzola, peras cozidas, cubos de gorgonzola, nozes e um toque de mel", 42],
      ]},
      { titulo: "Menu Degustação", itens: [
        ["Menu Um", "4 opções de mini toast (brie com damasco, caponata, veggie e caprese)", 90],
        ["Menu Dois", "4 opções de mini toast especiais (parma, salmone, parma crocante e pera com gorgonzola)", 120],
      ]},
    ],
  },
  {
    id: "lanches", aba: "Lanches",
    grupos: [
      { titulo: "Lanches Especiais", itens: [
        ["Pastrami", "fatias de pastrami, creme de três queijos, rúcula, picles e mostarda dijon", 50],
        ["Brisket", "peito bovino assado e desfiado, creme de três queijos, rúcula, picles de cebola roxa e mostarda dijon", 47],
        ["Frango", "peito de frango filetado, creme de três queijos, rúcula e tomate confit", 43],
      ]},
    ],
  },
  {
    id: "saladas", aba: "Saladas",
    grupos: [
      { titulo: "Saladas", itens: [
        ["Salada Veggie", "mix de folhas, picles de cebola roxa, croutons, azeitonas, mix de cogumelos e molho da casa", 30],
        ["Salada Caesar", "alface americana, iscas de filé de frango grelhado, croutons, parmesão e molho Caesar", 35],
        ["Salada Pastrami", "mix de folhas, picles de cebola roxa, pastrami, mozzarela de búfala, azeitona e molho da casa", 40],
      ]},
    ],
  },
  {
    id: "doces", aba: "Doces",
    nota: "Consultar a disponibilidade na vitrine.",
    grupos: [
      { titulo: "Doces Terrarium", itens: [
        ["Palha Italiana", "", 15],
        ["Cookie", "", 13],
        ["Cookie Especial", "", 15],
        ["Pão de Mel", "", 12],
        ["Pão de Mel de Colher", "", 18],
        ["Brigadeiro", "", 10],
        ["Brigadeiro de Pistache", "", 12],
        ["Trufa Tradicional", "", 15],
        ["Brownie ou Blondie", "adicional de sorvete e calda R$ 10,00", 16],
        ["Cocada Cremosa", "adicional de sorvete e calda R$ 10,00", 15],
      ]},
      { titulo: "Doces Especiais", destaque: true, itens: [
        ["Devil's Cake", "massa de cacau black, umedecido com licor de whisky, recheio e cobertura de trufa meio amargo", 35],
        ["Red Velvet", "", 35],
        ["Torta Cookie", "base de cookie de baunilha com recheio de creme de avelã e brigadeiro", 26],
        ["Cheesecake de Pistache", "", 26],
        ["Torta Mousse", "base de brownie com mousse", 26],
      ]},
      { titulo: "Doces do Dia", itens: [
        ["Bolo de Cenoura Individual", "com calda de brigadeiro cremoso e flakes de Callebaut", 15],
        ["Fatia de Bolo Simples", "", 8],
        ["Fatia de Bolo Recheado", "", 22],
        ["Banoffe, Morangoffe ou Surpresa de Uva", "", 20],
        ["Bolo Gelado", "", 15],
        ["Cheesecake", "sabores diversos", 24],
        ["Tiramissu", "", 22],
        ["Pavê da Vó", "pavê de paçoca", 18],
      ]},
    ],
  },
  {
    id: "bebidas", aba: "Bebidas",
    grupos: [
      { titulo: "Bebidas", itens: [
        ["Água em Lata", "com ou sem gás", 6.5],
        ["Água Tônica", "", 7],
        ["Refrigerante", "", 8.5],
        ["Suco Natural de Laranja 400ml", "", 14],
        ["Suco Detox 400ml", "abacaxi, couve, gengibre e limão", 16],
        ["Chá Matte Gelado 400ml", "com ou sem limão", 13],
        ["Chá Matte Saborizado 400ml", "sabores: morango, pêssego e cranberry (água com ou sem gás)", 18],
        ["Soda Italiana", "consultar sabores", 16],
        ["Suco de Açaí", "com leite ou água (adicionais: leite condensado, banana ou laranja: R$ 2,00 cada)", 18],
        ["Limonada Suíça", "", 16],
      ]},
      { titulo: "Drinks e Licores", itens: [
        ["Gin Tônica", "gin importado, água tônica e especiarias", 35],
        ["Carajillo", "Licor 43 no copo com gelo e 1 dose de espresso", 38],
        ["Licor 43", "dose", 35],
        ["Licor de Doce de Leite", "dose", 20],
        ["Licor de Whiskey", "dose", 24],
      ]},
    ],
  },
  {
    id: "togo", aba: "Para levar",
    grupos: [
      { titulo: "To Go", itens: [
        ["Pote de Petit Four", "", 35],
        ["Pão de Campanha Inteiro", "", 45],
        ["Café da Casa Torrado e Moído 250g", "", 40],
      ]},
    ],
  },
];
