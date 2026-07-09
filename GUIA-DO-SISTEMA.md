# 📘 Guia do Sistema — Massa Certa

Um guia pra você, Tevux, entender **tudo** sobre o sistema que construímos:
o que é, como funciona, como rodar, como manter e como crescer.

---

## 1. O que é o Massa Certa

É um **sistema de gestão** para o restaurante Pastasciutta (Roma). Ele roda no
navegador, tem **login**, um **banco de dados na nuvem** e 10 áreas de trabalho
(as "abas"). Os dados de exemplo são fictícios (mockados) — trocando pelos dados
reais, vira a operação de verdade.

> **Em uma frase:** é um site que funciona como um programa, com dados guardados
> na nuvem e acessível por qualquer navegador (computador ou celular).

---

## 2. As tecnologias (e por que cada uma)

| Tecnologia | Para que serve |
|---|---|
| **HTML** | a estrutura das telas (`index.html`) |
| **CSS** | o visual — cores, layout, animações (`css/style.css`) |
| **JavaScript** | a lógica — cálculos, filtros, gráficos (`js/app.js`) |
| **Supabase** | o "cérebro": banco de dados + login, tudo pronto na nuvem |
| **Chart.js** | desenha os gráficos |
| **Vercel** | coloca o site no ar (hospedagem) |
| **Git / GitHub** | guarda o histórico do código e conecta com a Vercel |

Não há framework nem etapa de "build" — é HTML/CSS/JS puro. Simples de manter.

---

## 3. A estrutura de pastas

```
massa-certa/
├── index.html          → as telas (estrutura)
├── css/style.css       → o visual
├── js/app.js           → a lógica
├── js/config.js        → suas chaves do Supabase (URL + anon key)
├── assets/favicon.svg  → o ícone da aba do navegador
├── README.md           → apresentação do projeto
├── GUIA-DO-SISTEMA.md  → este guia
├── SEGURANCA-FUTURO.md → o plano de segurança
└── *.sql               → os scripts do banco de dados
```

---

## 4. As 10 abas (o que cada uma faz)

1. **Dashboard** — visão geral do dia: faturamento, pratos, gráfico e ranking.
2. **Receitas** — cria receitas (nome, foto, ingredientes, modo de preparo). O
   custo por prato é calculado automaticamente pela base de ingredientes.
3. **Ingredientes** — a base de 169 insumos, com preço, **estoque atual** e
   **mínimo** (editáveis). Itens abaixo do mínimo ficam destacados.
4. **Compras** — monta sozinha a lista do que está abaixo do mínimo, com a
   quantidade sugerida (editável) e o custo total.
5. **Vendas** — análises com filtros (região, nacionalidade, prato, estação) e a
   sazonalidade de Roma.
6. **Colaboradores** — cadastro da equipe (foto, dados, documentos).
7. **Pagamentos** — folha da equipe: digita o líquido e calcula o bruto (e
   vice-versa), com horas extras (acima de 6h a € 15/h) e total a pagar.
8. **Operação** — quantos pratos produzir hoje → custo, margem e lista de compras.
9. **Projeção** — gráficos de 4 anos com crescimento e sazonalidade.
10. **Gestão** — quadro de tarefas estilo Jira (A fazer / Fazendo / Feito).

**Extras:** paleta de comandos (Ctrl+K), notificações de estoque baixo (somem ao
clicar; voltam se o problema persistir), barra de status e busca.

---

## 5. Como rodar no seu computador

1. Abra a pasta no **VS Code** (`Arquivo → Abrir Pasta`).
2. Instale a extensão **Live Server**.
3. Botão direito no `index.html` → **"Open with Live Server"**.
4. O site abre no navegador e atualiza sozinho quando você salva.

---

## 6. O banco de dados (Supabase)

O sistema guarda os dados no **Supabase**. As chaves de conexão ficam no
`js/config.js` (a chave **anon** é pública e pode ficar aí; a **service_role**
NUNCA deve aparecer no código).

### Os scripts SQL
Você roda os scripts no Supabase → **SQL Editor** → colar → **Run**.

- **`massa-certa-COMPLETO.sql`** → **o principal**. Cria todas as tabelas e já
  preenche tudo (ingredientes, estoque, receitas, equipe, folha e tarefas). É só
  rodar este que o banco fica pronto. Pode rodar de novo sem medo.

> Se algum dia o estoque der "erro ao salvar", é sinal de que faltam as colunas
> `estoque_atual`/`estoque_minimo` — rodar o `COMPLETO.sql` resolve (ele as cria).

---

## 7. Como colocar no ar (deploy)

O ciclo é automático: a Vercel está ligada ao GitHub.

```bash
git add .
git commit -m "descreva o que mudou"
git push
```

Depois do `push`, a Vercel republica o site sozinha em segundos.

---

## 8. Como adicionar ou editar dados

- **Ingredientes / preços / estoque:** aba Ingredientes (edita direto na lista).
- **Receitas:** aba Receitas → "Criar receita".
- **Equipe:** aba Colaboradores → "Adicionar colaborador".
- **Salários e horas:** aba Pagamentos.
- **Tarefas:** aba Gestão (digita e aperte Enter).

Tudo salva no banco na hora.

---

## 9. Manutenção — dicas

- **Sempre teste local** (Live Server) antes de dar `push`.
- **Mensagens de commit curtas e claras**, em português.
- Se algo quebrar, abra o **Console** do navegador (tecla **F12** → aba Console)
  e veja a mensagem em vermelho — ela quase sempre diz onde está o problema.
- O `.gitignore` já protege segredos (`.env*`); não desligue isso.

---

## 10. Lembrete sobre os dados

Os dados atuais são **de demonstração** (fictícios), feitos pra mostrar todas as
funções trabalhando. Ao conectar os dados reais do Pastasciutta (preços, equipe,
salários de verdade), o sistema passa a refletir a operação real.

---

Feito com carinho na sua primeira jornada de programação. 🍝🚀
