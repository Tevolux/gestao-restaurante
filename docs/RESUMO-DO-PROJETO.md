# 📘 Massa Certa — Resumo do Projeto

> Documento simples e didático. Explica o que é o projeto, como ele está
> organizado, e o que já foi feito — incluindo **Git, GitHub, Vercel e
> Supabase**. Não precisa ser programador para entender.

**Última atualização:** 09/07/2026

---

## 1. O que é o projeto

**Massa Certa** é um sistema de gestão para um restaurante (a Pastasciutta,
em Roma). Ele funciona no navegador (como um site) e tem várias áreas:
dashboard, receitas, ingredientes, estoque, compras, vendas, colaboradores,
folha de pagamento, tarefas (kanban), projeções, etc.

> **Em uma frase:** é um site que funciona como um programa, com login e
> dados guardados na nuvem.

---

## 2. As 4 "peças" que fazem o sistema funcionar

Pense em 4 caixas, cada uma com um papel:

| Peça | Papel | Endereço |
|------|-------|----------|
| **Git** | O "histórico" do código no seu computador. Guarda todas as versões e mudanças. | (local, no seu PC) |
| **GitHub** | A "nuvem do código". Uma cópia do projeto na internet, para guardar e compartilhar. | github.com/Tevolux/gestao-restaurante |
| **Vercel** | Onde o site fica **publicado** para o mundo acessar. Toda vez que o código sobe pro GitHub (no `main`), ela publica a nova versão sozinha. | massa-certa.vercel.app |
| **Supabase** | O "banco de dados" + o "login". Guarda ingredientes, receitas, equipe, estoque, etc., e cuida do cadastro dos usuários. | ctgelvortcggdykesxmh.supabase.co |

**Como elas conversam:**

```
Você edita o código  ->  salva no GIT  ->  envia pro GITHUB
   ->  a VERCEL publica o site  ->  o site conversa com o SUPABASE
   para mostrar/salvar os dados.
```

---

## 3. Como os arquivos estão organizados

```
massa-certa/
│
├── index.html .............. a página (a estrutura da tela)
├── README.md ............... apresentação do projeto
│
├── css/
│   └── style.css ........... todo o visual (cores, layout)
│
├── js/
│   ├── app.js .............. o "cérebro": toda a lógica
│   ├── config.js .......... as chaves de acesso ao Supabase
│   └── mock.js ............ o MODO DEMO (explicado no item 6)
│
├── assets/
│   └── favicon.svg ........ o iconezinho da aba do navegador
│
├── supabase/ ............. configuração do banco e "migrations"
│   └── migrations/ ....... arquivos que alteram o banco (integração)
│
├── database/ ............ scripts SQL para rodar no Supabase
│   ├── massa-certa-COMPLETO.sql .. cria tudo + dados de exemplo
│   ├── supabase-tabelas.sql
│   ├── supabase-dados-exemplo.sql
│   ├── supabase-estoque-e-tarefas.sql
│   └── supabase-corrige-receitas.sql
│
└── docs/ ................ documentação (textos para ler)
    ├── GUIA-DO-SISTEMA.md ........ guia completo do sistema
    ├── COMANDOS.md ............... caminhos e comandos
    ├── SEGURANCA-FUTURO.md ....... plano de segurança futuro
    ├── TESTE.md .................. guia de testes
    ├── RESUMO-DO-PROJETO.md ...... este documento
    └── RESUMO-DO-PROJETO.txt ..... versão em texto puro
```

> **Observação:** o app (`index.html`, `css/`, `js/`, `assets/`), a pasta
> `supabase/` e o `README.md` ficam na raiz de propósito — é o que a Vercel
> publica e o que a integração do Supabase usa. Só os SQL e as documentações
> foram agrupados em `database/` e `docs/`.

---

## 4. Como funcionam as "branches" (ramos) no Git

Uma **branch** é como uma cópia paralela do projeto onde você faz mudanças
**sem bagunçar** a versão principal. A versão principal (estável) se chama
`main`.

> **Regra usada neste projeto:** toda mudança nasce em uma branch nova, é
> testada, e só depois é levada (*merge*) para o `main`.

Branches que já existiram (cada uma foi um passo do projeto):

- `feat/login-cadastro-funcional` — login e cadastro
- `feat/layout-responsivo` — layout para celular/PC
- `feat/menu-configuracoes-conta` — menu e conta do usuário
- `feat/colaboradores-receitas-pagamentos` — equipe / receitas / folha
- `feat/estoque-e-gestao` — estoque e quadro de tarefas
- `fix/estoque-colunas` — conserto das colunas de estoque
- `feat/notificacoes-dispensar` — **esta sessão** (ver item 5)

---

## 5. O que fizemos nesta sessão (as mudanças mais recentes)

Tudo foi feito na branch **`feat/notificacoes-dispensar`** e depois levado
para o `main` e enviado ao GitHub. Foram **3 objetivos**:

### (A) Notificações de estoque clicáveis
- **O quê:** agora dá para clicar em uma notificação de "estoque baixo" para
  dispensá-la (ela some da lista).
- **Onde:** `js/app.js` (função nova `dispensarNotif`) e `css/style.css`
  (efeito ao passar o mouse).
- **Por quê:** deixar a tela mais limpa; a pessoa tira da frente os avisos
  que já viu. *(Se o estoque continuar baixo, o aviso volta quando a página
  recarrega.)*

### (B) Correção do erro "Erro ao atualizar estoque"
- **O quê:** ao mudar o estoque de um ingrediente, aparecia um erro vermelho
  e não salvava.
- **Motivo:** faltavam duas colunas no banco (Supabase): `estoque_atual` e
  `estoque_minimo`.
- **Como corrigimos:** rodamos um comando (SQL) no Supabase que cria essas
  colunas e preenche dados de exemplo. Está no arquivo
  **`database/massa-certa-COMPLETO.sql`** (é seguro rodar de novo — não duplica nada).
- **Resultado:** o estoque passou a salvar normalmente, com a mensagem verde
  "Estoque atualizado".

### (C) Modo demo (mock) — rodar o sistema sem login e sem banco
- **O quê:** um modo de demonstração que roda o sistema 100% no navegador,
  com dados de exemplo, sem precisar de internet, login ou Supabase.
- **Onde:** `js/mock.js` (arquivo novo); `js/app.js` e `index.html` ligam
  esse modo.
- **Como usar:** basta abrir o site com `?mock=1` no final do endereço.
  Ex.: `.../index.html?mock=1`
- **Por quê:** serve para demonstrar o sistema e para os testes automáticos
  rodarem sozinhos. O modo normal (produção, com login e Supabase) **não
  muda em nada**.

Também foram adicionados dois textos de documentação:
**`GUIA-DO-SISTEMA.md`** e **`SEGURANCA-FUTURO.md`**.

### (D) Novas ferramentas do dia a dia
Trazidas de uma versão mais nova do projeto (o pacote `massa-certa 2`):

- **Filtro de receitas** — na aba Receitas, um campo busca por **nome** ou por
  **ingrediente** (ex.: digitar "guanciale" mostra só receitas que o usam).
- **Exportar planilha (CSV)** — botões nas abas **Compras** e **Pagamentos**
  geram uma planilha (abre no Excel) com a lista de compras / a folha.
- **Registrar produção (dar baixa no estoque)** — na aba Operação, depois de
  informar os pratos do dia, um botão **desconta do estoque** os ingredientes
  usados, automaticamente.
- **Busca ⌘K ampliada** — a busca rápida (Ctrl/⌘ + K) agora encontra também
  **receitas, ingredientes e colaboradores**, não só as áreas do sistema.

Tudo isso foi testado com o Playwright (11 verificações, todas passaram) e não
exigiu nenhuma mudança no banco (usa as colunas de estoque que já existem).

---

## 6. Os dois modos de usar o sistema

| Modo | Como acessar | Login? | Dados |
|------|--------------|--------|-------|
| **Normal (produção)** | endereço normal (sem `?mock=1`) | Sim | banco real (Supabase) — o que o restaurante usa |
| **Demo (mock)** | endereço com `?mock=1` no final | Não | dados de exemplo na memória — para mostrar/testar sem risco |

---

## 7. Como conferimos que está tudo funcionando (testes)

Usamos uma ferramenta chamada **Playwright**, que abre o site sozinha e
"clica" nas coisas como um usuário faria, conferindo se cada parte funciona.

- **Testes no modo demo:** 15 verificações, todas passaram. ✅
- **Testes no modo real** (logado no Supabase de verdade): 14 verificações,
  todas passaram. ✅ *(Inclui: login, carregar os dados reais, atualizar o
  estoque sem erro, e dispensar notificação.)*

> Durante o teste real, um valor de estoque foi alterado só para testar e
> depois **revertido** ao original, para não bagunçar o banco. Também foi
> criado um usuário de teste no Supabase
> (`playwright.teste+massacerta@gmail.com`) — inofensivo; pode ser apagado
> em **Supabase → Authentication → Users**, se desejar.

---

## 8. Situação atual (onde tudo parou)

- **Código:** atualizado e salvo no Git.
- **`main`:** recebeu todas as mudanças (commit `054e75f`).
- **GitHub:** atualizado (*push* feito).
- **Vercel:** ao subir pro GitHub, publica sozinha a nova versão em
  massa-certa.vercel.app.
- **Supabase:** corrigido (colunas de estoque criadas) e com dados de exemplo.
- **Login:** **ligado** e funcionando normalmente.

> **Resumo em uma frase:** o erro de estoque foi resolvido, as notificações
> ficaram clicáveis, criamos um modo de demonstração, testamos tudo, e
> publicamos.

---

## 9. Pequeno glossário (palavras difíceis, em português simples)

| Palavra | O que significa |
|---------|-----------------|
| **Branch (ramo)** | cópia paralela do projeto para trabalhar sem estragar a versão principal |
| **Commit** | uma "foto" salva de uma mudança no código |
| **Merge** | juntar uma branch na versão principal (`main`) |
| **Push** | enviar o que está no seu PC para o GitHub |
| **Deploy** | publicar o site para o público (a Vercel faz) |
| **SQL** | a "linguagem" para conversar com o banco |
| **Migration** | um arquivo que altera a estrutura do banco |
| **RLS** | regra de segurança do banco: só quem está logado vê/altera os dados |
| **Mock (demo)** | dados falsos de exemplo, para testar/demonstrar |

---

*Fim do resumo.*
