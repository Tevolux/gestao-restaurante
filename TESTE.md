# ✅ Guia de testes — Massa Certa

Roteiro para validar as funcionalidades. Rode localmente ou use o preview da Vercel.

## Como abrir
- **Local:** na pasta do projeto → `python -m http.server 8000` → abra http://localhost:8000
  (depois de mudar arquivos, recarregue com **Ctrl+Shift+R**)
- **Online:** produção em https://massa-certa.vercel.app · previews aparecem no painel da Vercel por branch.
- **Login:** use sua conta do Supabase. Sem login, os dados do banco não carregam.

## Dados de exemplo
Se o banco estiver vazio, rode [supabase-dados-exemplo.sql](supabase-dados-exemplo.sql) no SQL Editor do
Supabase (idempotente — pode rodar de novo). Popula 12 receitas, 10 colaboradores e a folha.

---

## 1. Navegação (Menu / Módulos)
- [ ] **Desktop:** a barra lateral mostra só **Menu** e **Módulos**.
- [ ] **Menu** abre o hub com Dashboard, Receitas, Ingredientes, Vendas, Colaboradores, Pagamentos, Módulos, Configurações e Sair.
- [ ] **Módulos** abre o hub com Operação, Projeção e Gestão.
- [ ] **Celular** (F12 → Ctrl+Shift+M): a lateral some; navega pelos ícones em tela; o botão **⊞** no topo volta ao Menu.

## 2. Conta e aparência
- [ ] Clicar no **avatar** (canto superior direito) abre **Configurações**.
- [ ] Alternar **tema claro/escuro** muda o app e os gráficos na hora (persiste ao recarregar).
- [ ] Trocar **foto**, salvar **nome/telefone** (reflete no avatar).
- [ ] **Alterar email** (envia link de confirmação) e **Alterar senha** (mín. 6, com repetição).
- [ ] **Sair** pela aba Menu, pelo modal ou pela lateral.

## 3. Responsivo
- [ ] Retrato e **paisagem** no celular (girar no modo dispositivo) — layout se adapta.

## 4. Receitas
- [ ] **Criar receita**: quantidades agora em **kg** (coluna "Qtd (kg)"); custo por prato calcula certo.
- [ ] Na receita salva, os **ingredientes aparecem em lista** (kg) e o **preparo numerado a partir de 1**.
- [ ] **Editar** uma receita: abre preenchida (nome, rende, foto, ingredientes em kg, preparo), salva por cima.
- [ ] **Remover** uma receita.

## 5. Ingredientes + Estoque
- [ ] Adicionar insumo, editar preço na lista, buscar, remover.
- [ ] Editar **Estoque** e **Mínimo** (kg) direto na lista — salva no banco.
- [ ] Itens abaixo do mínimo ficam **destacados** (badge "baixo") e aparecem no card **⚠ Estoque baixo**.
- [ ] O **sino de notificações** (topo) mostra os itens de estoque baixo com contador.

## 9. Gestão — Quadro de tarefas (kanban)
- [ ] Abrir **Módulos → Gestão**: 3 colunas (A fazer, Fazendo, Feito).
- [ ] **Adicionar** tarefa (entra em "A fazer"); Enter também adiciona.
- [ ] Mover com **← / →** entre colunas e **remover** (×) — tudo salva no banco.

## 6. Colaboradores
- [ ] Cadastrar com foto e documentos.
- [ ] **Editar** um colaborador (abre preenchido, salva alterações).
- [ ] Remover.

## 7. Pagamentos
- [ ] Digitar líquido/bruto/horas → total e horas extras calculam; salvar; anexar contrato PDF.

## 8. Vendas & Dashboard
- [ ] Filtros (região, país, prato, estação) atualizam os gráficos.
- [ ] Dashboard: KPIs, gráfico de 14 dias e ranking.

---

Achou algo errado? Anote a **tela**, o **passo** e a mensagem do **Console (F12)**.
