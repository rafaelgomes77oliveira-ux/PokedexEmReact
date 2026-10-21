# Pokédex

Aplicação web desenvolvida em **React + JavaScript** com **Vite** que simula uma Pokédex com os 151 Pokémon da primeira geração.

![Pokédex](../docs/pokedex.png)

## Funcionalidades

- **Navegação** entre os 151 Pokémon pelos botões *Anterior* / *Próximo* ou pelas setas ← → do teclado
- **Busca** por nome ou número, com mensagem de erro quando nada é encontrado
- **Sortear** um Pokémon aleatório
- **Detalhes de cada Pokémon**: arte oficial, sprites de frente e de costas, número, nome e tipos (traduzidos para o português)
- **Atributos base** (HP, Ataque, Defesa, Atq. Esp., Def. Esp., Velocidade) em barras coloridas pelo tipo, com o total
- **Versão shiny**, ativada no menu de configurações (⚙)
- **Tema claro/escuro**
- **Treinadores**: lista com 12 treinadores (Ash, Brock, Misty, Lt. Surge, Erika, Koga, Sabrina, Blaine, Giovanni, Gary, Team Rocket e Lance), com insígnias e seus Pokémon
  - Busca por treinador ou Pokémon e ordenação por nome ou insígnias
  - Na tela do Pokémon aparecem os treinadores que o possuem; clicar em um deles abre o seu card
- **Tela de tamanho fixo**: as informações rolam dentro da Pokédex, sem precisar rolar a página

## Tecnologias

- [React 19](https://react.dev/)
- [Vite](https://vite.dev/)
- [React Icons](https://react-icons.github.io/react-icons/)
- Sprites e artes do repositório [PokeAPI/sprites](https://github.com/PokeAPI/sprites)

## Como executar

Pré-requisito: [Node.js](https://nodejs.org/) instalado.

Nesta pasta (`Pokedex`):

```bash
npm install
npm run dev
```

Depois, abra o endereço exibido no terminal (por padrão `http://localhost:5173`).

Outros scripts:

| Comando           | Descrição                           |
| ----------------- | ----------------------------------- |
| `npm run build`   | Gera a versão de produção em `dist` |
| `npm run preview` | Serve a versão de produção gerada   |
| `npm run lint`    | Executa o ESLint                    |

## Estrutura

```
Pokedex/
├── public/
├── src/
│   ├── components/
│   │   ├── TrainerCard.jsx    # Card de um treinador
│   │   ├── TrainerList.jsx    # Lista, busca e ordenação de treinadores
│   │   └── Trainers.css
│   ├── data/
│   │   ├── pokedex-data.json  # Dados dos 151 Pokémon (tipos e atributos)
│   │   └── trainers.json      # Treinadores e seus Pokémon
│   ├── App.jsx                # Tela principal da Pokédex
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
└── vite.config.js
```
