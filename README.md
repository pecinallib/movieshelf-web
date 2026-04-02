# 🎬 MovieShelf Web

Frontend do MovieShelf — catálogo pessoal de filmes e séries com integração TMDB.

## 🚀 Stack

- **Framework:** React 19 + TypeScript
- **Build:** Vite 8
- **Estilização:** Tailwind CSS 4
- **Animações:** Framer Motion
- **Ícones:** Lucide React
- **HTTP Client:** Axios
- **Roteamento:** React Router DOM

## ✨ Features

- **Autenticação** — Login e registro com JWT
- **Home** — Trending + filtros por tipo (filme/série) e gênero
- **Busca** — Pesquisa de filmes e séries via TMDB
- **Detalhes** — Sinopse, elenco, trailer do YouTube, nota TMDB
- **Favoritos** — Favoritar filmes e séries com filtro por tipo
- **Listas** — Criar listas personalizadas e adicionar títulos
- **Reviews** — Avaliar com nota (1-5 estrelas) e comentário
- **Perfil** — Dados do usuário com contagem de favoritos/reviews/listas
- **Dark/Light mode** — Toggle com persistência em localStorage
- **Paleta preto & dourado** — Design premium com efeito metálico
- **Animações** — Fade in, slide up escalonado, scale no poster
- **Skeletons** — Loading states em cards e detalhes
- **Responsivo** — Mobile sidebar modal, layout adaptativo
- **Dropdown "Adicionar à lista"** — Com click outside dismiss

## 📁 Estrutura

```
src/
├── components/
│   ├── layout/
│   │   └── Header.tsx          # Header + sidebar mobile
│   └── ui/
│       ├── AddToList.tsx        # Dropdown para adicionar à lista
│       ├── AnimatedPage.tsx     # Wrappers Framer Motion
│       ├── MediaCard.tsx        # Card de filme/série
│       ├── ReviewForm.tsx       # Formulário de review com estrelas
│       ├── SearchBar.tsx        # Barra de busca
│       ├── Skeleton.tsx         # Loading skeletons
│       └── ThemeToggle.tsx      # Toggle dark/light mode
├── contexts/
│   ├── AuthContext.tsx          # Autenticação + localStorage
│   └── ThemeContext.tsx         # Tema dark/light
├── lib/
│   └── api.ts                  # Axios com interceptor JWT
├── pages/
│   ├── Auth/
│   │   ├── Login.tsx
│   │   └── Register.tsx
│   ├── Favorites/
│   │   └── Favorites.tsx       # Lista de favoritos com filtro
│   ├── Home/
│   │   ├── Home.tsx            # Trending + filtros tipo/gênero
│   │   └── Search.tsx          # Resultados de busca
│   ├── Lists/
│   │   ├── ListDetails.tsx     # Itens da lista
│   │   └── Lists.tsx           # CRUD de listas
│   ├── Movie/
│   │   └── MovieDetails.tsx    # Detalhes + favoritar + review
│   ├── Profile/
│   │   └── Profile.tsx         # Perfil do usuário + stats
│   ├── Reviews/
│   │   └── Reviews.tsx         # Minhas reviews
│   └── TV/
│       └── TVDetails.tsx       # Detalhes série + favoritar + review
├── services/
│   ├── favorites.ts
│   ├── lists.ts
│   ├── profile.ts
│   ├── reviews.ts
│   └── tmdb.ts                 # Busca, trending, gêneros, discover, detalhes
├── types/
│   ├── auth.ts
│   ├── models.ts
│   ├── tmdb.ts
│   └── index.ts
├── App.tsx                     # Rotas + providers
├── index.css                   # Tailwind + paleta dourada + efeitos
└── main.tsx                    # Entry point
```

## 🎨 Design

### Paleta — Preto & Dourado Metálico

| Elemento       | Cor       |
| -------------- | --------- |
| Body           | `#09090b` |
| Cards          | `#0f0f14` |
| Inputs         | `#18181f` |
| Borders        | `#27272f` |
| Gold principal | `#d4a843` |
| Gold claro     | `#e8c36a` |
| Gold escuro    | `#b08a2e` |

### Efeitos CSS

- `text-gold-metallic` — Gradiente metálico em textos
- `gold-shimmer` — Animação shimmer no logo
- `btn-gold` — Botão com gradiente dourado
- `badge-gold` — Tags com fundo dourado sutil

## ⚙️ Instalação

### Pré-requisitos

- Node.js 18+
- [MovieShelf API](https://github.com/pecinallib/movieshelf-api) rodando

### Setup

```bash
# Clonar repositório
git clone https://github.com/pecinallib/movieshelf-web.git
cd movieshelf-web

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com URL da API

# Iniciar aplicação
npm run dev
```

### Variáveis de Ambiente

```
VITE_API_URL=http://localhost:3333
```

## 📜 Scripts

| Script            | Comando                     |
| ----------------- | --------------------------- |
| `npm run dev`     | Servidor de desenvolvimento |
| `npm run build`   | Build de produção           |
| `npm run preview` | Preview do build            |

## 📸 Screenshots

### Home — Filtros por tipo e gênero

_Em breve_

### Detalhes do filme

_Em breve_

### Favoritos

_Em breve_

## 🔗 Projeto Relacionado

- [MovieShelf API](https://github.com/pecinallib/movieshelf-api) — Backend Express

## 👤 Autor

**Matheus Pecinalli** — [GitHub](https://github.com/pecinallib) · [LinkedIn](https://linkedin.com/in/dev-pecinalli) · [Portfólio](https://pecinalli-dev.vercel.app)

## 📄 Licença

Este projeto está sob a licença MIT.
