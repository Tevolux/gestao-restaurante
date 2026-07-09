-- ============================================================
--  CORREÇÃO DA TABELA receitas
--  Adiciona as colunas que o app usa mas que faltavam
--  (era por isso que "salvar receita" dava erro para todos).
--  Rode no Supabase → SQL Editor → New query → cole → Run.
-- ============================================================

-- 1) Colunas que faltavam (não apaga nada existente)
alter table public.receitas add column if not exists modo_preparo text;
alter table public.receitas add column if not exists foto         text;

-- 2) Garante a segurança correta: só usuário logado lê/grava
alter table public.receitas enable row level security;

drop policy if exists "receitas_auth_all" on public.receitas;
create policy "receitas_auth_all" on public.receitas
  for all to authenticated using (true) with check (true);
