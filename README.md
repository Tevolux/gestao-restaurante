# Massa Certa — Sistema de Gestao

Sistema de gestao para a operacao do Pastasciutta (Roma). Roda no
navegador, com login e banco de dados na nuvem. Areas: dashboard,
receitas com custo automatico, ingredientes, estoque, compras,
vendas, colaboradores, folha de pagamento, tarefas (kanban) e
projecoes. Valores em euro (EUR).

🔗 **App em producao:** https://massa-certa.vercel.app

## Tecnologia
HTML, CSS e JavaScript puro + Chart.js. Sem framework, sem build.
Banco de dados e login pelo **Supabase**. Publicacao pela **Vercel**.

## Dois modos de uso
- **Normal (producao):** pede login e usa o banco real (Supabase).
  E o modo que o restaurante usa.
- **Demo (mock):** abra o app com `?mock=1` no final do endereco.
  Nao pede login e usa dados de exemplo na memoria — bom para
  demonstrar ou testar sem tocar no banco. Ex.: `index.html?mock=1`

## Rodar localmente
Como o app usa login e Supabase, sirva a pasta por um servidor local
(nao abra o arquivo direto). Exemplos:

```
# Python
python -m http.server 8000
# depois acesse http://127.0.0.1:8000/index.html

# ou a extensao "Live Server" do VS Code (botao direito no index.html)
```

Para o **modo demo** (sem login), acesse `http://127.0.0.1:8000/index.html?mock=1`.

## Banco de dados (Supabase)
As chaves de acesso ficam em `js/config.js` (apenas a chave publica —
a segura nunca vai no codigo). O banco e criado/populado pelos
arquivos SQL (na pasta `database/`), colados no **SQL Editor** do Supabase:
- `database/massa-certa-COMPLETO.sql` — cria tudo (tabelas + colunas de
  estoque) e insere dados de exemplo. Idempotente (pode rodar de novo).

## Estrutura
```
massa-certa/
├── index.html                  -> a pagina (estrutura)
├── README.md
│
├── css/
│   └── style.css               -> todo o visual
├── js/
│   ├── app.js                  -> toda a logica
│   ├── config.js               -> chaves de acesso ao Supabase
│   └── mock.js                 -> modo demo (dados de exemplo, sem banco)
├── assets/
│   └── favicon.svg             -> icone da aba do navegador
│
├── supabase/                   -> config e migrations (integracao do banco)
├── database/                   -> scripts SQL para rodar no Supabase
│   ├── massa-certa-COMPLETO.sql    -> banco completo + dados de exemplo
│   └── supabase-*.sql              -> scripts auxiliares
│
└── docs/                       -> documentacao
    ├── GUIA-DO-SISTEMA.md      -> guia completo do sistema
    ├── COMANDOS.md             -> caminhos e comandos uteis
    ├── SEGURANCA-FUTURO.md     -> plano de seguranca futuro
    ├── TESTE.md                -> guia de testes
    └── RESUMO-DO-PROJETO.md    -> resumo geral (git/github/vercel/supabase)
```

## Documentacao
Tudo na pasta [`docs/`](docs/):
- **[GUIA-DO-SISTEMA.md](docs/GUIA-DO-SISTEMA.md)** — explicacao completa e didatica do sistema.
- **[COMANDOS.md](docs/COMANDOS.md)** — caminhos e comandos do dia a dia.
- **[SEGURANCA-FUTURO.md](docs/SEGURANCA-FUTURO.md)** — proximos reforcos de seguranca.
- **[TESTE.md](docs/TESTE.md)** — como testar.
- **[RESUMO-DO-PROJETO.md](docs/RESUMO-DO-PROJETO.md)** — visao geral do projeto e do que ja foi feito.
