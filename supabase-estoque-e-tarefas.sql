-- ============================================================
--  Massa Certa — adições de schema: ESTOQUE + TAREFAS
--  O app passou a usar estas colunas/tabela (aba Ingredientes
--  ganhou estoque/alerta; a aba Gestão virou quadro de tarefas).
--  Idempotente. Cole no SQL Editor do Supabase e clique em Run.
--  (Já está contido no supabase-TUDO.sql; este arquivo é só o delta.)
-- ============================================================

-- ---------- ESTOQUE nos ingredientes ----------
alter table ingredientes add column if not exists estoque_atual  numeric default 0;
alter table ingredientes add column if not exists estoque_minimo numeric default 0;

-- ---------- QUADRO DE TAREFAS (aba Gestão) ----------
create table if not exists tarefas (
  id         bigint generated always as identity primary key,
  titulo     text not null,
  coluna     text not null default 'afazer',   -- afazer | fazendo | feito
  criado_em  timestamptz default now(),
  user_id    uuid default auth.uid()
);

-- Segurança: só usuário logado lê/grava
alter table tarefas enable row level security;
drop policy if exists "acesso total logado" on tarefas;
create policy "acesso total logado" on tarefas for all to authenticated using (true) with check (true);
