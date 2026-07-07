# 🍝 Massa Certa — Sistema de Gestão

Sistema de gestão e análise para a operação do **Pastasciutta** (Roma).
Reúne, num único painel, a operação do dia a dia e a inteligência de vendas.

> **Nota:** os dados exibidos são **de exemplo (mockados)** para demonstração.
> Na versão conectada ao banco (Supabase), o sistema usa os dados reais.

É um app web de página única (`index.html`) — abre no navegador e roda em
qualquer lugar, ideal para publicar na **Vercel**.

---

## ▶️ Como usar

Abra o `index.html` no navegador (ou acesse o link publicado na Vercel).

---

## ⚙️ Funcionalidades

- **Dashboard** — visão geral: faturamento, pratos vendidos, prato campeão,
  gráfico dos últimos dias e ranking de pratos.
- **Receitas** — monte pratos digitando o ingrediente (o custo aparece
  sozinho) e veja o custo de 1 prato até a produção do dia.
- **Análises de vendas** — pizza de participação por prato, origem dos
  clientes e movimento por mês, com filtros combináveis de **região**,
  **nacionalidade**, **prato** e **estação**. Inclui o **prato campeão por
  mês**, que muda com a **sazonalidade de Roma** (turismo europeu).
- Valores em **euro (€)**, com preços de referência de fornecedor.

Módulos em construção: Operação, Projeção e Gestão (estilo Jira).

---

## 🧱 Tecnologia

- HTML, CSS e JavaScript (sem framework) — leve e fácil de publicar.
- Chart.js para os gráficos.
- Tipografia: Plus Jakarta Sans + IBM Plex Mono.

## 📁 Estrutura

```
massa-certa/
├── index.html    -> o sistema inteiro
├── README.md     -> este arquivo
└── .gitignore    -> o que o Git deve ignorar
```

---

Feito com dedicacao para o Pastasciutta.

<!-- Teste de deploy automatico via GitHub + Vercel -->
