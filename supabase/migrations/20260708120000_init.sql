-- ============================================================
--  Massa Certa — schema inicial (tabelas + RLS)
--  Versiona o banco que hoje vive no Supabase (a partir do
--  supabase-TUDO.sql). Só o schema — os dados de exemplo ficam
--  nos arquivos supabase-*.sql / supabase/seed.
--  Idempotente (create if not exists).
-- ============================================================

create table if not exists ingredientes (
  id             bigint generated always as identity primary key,
  nome           text not null unique,
  preco_kg       numeric not null default 0,
  estoque_atual  numeric default 0,
  estoque_minimo numeric default 0
);

create table if not exists receitas (
  id              bigint generated always as identity primary key,
  nome            text not null,
  rende           int not null default 1,
  itens           jsonb not null default '[]',
  custo_por_prato numeric not null default 0,
  foto            text,
  modo_preparo    text,
  criado_em       timestamptz not null default now(),
  user_id         uuid default auth.uid()
);

create table if not exists colaboradores (
  id         bigint generated always as identity primary key,
  nome       text not null,
  cargo      text,
  documento  text,
  endereco   text,
  telefone   text,
  email      text,
  foto       text,
  documentos jsonb default '[]',
  criado_em  timestamptz default now(),
  user_id    uuid default auth.uid()
);

create table if not exists pagamentos (
  id              bigint generated always as identity primary key,
  colaborador_id  bigint references colaboradores(id) on delete cascade,
  desconto_pct    numeric default 0,
  salario_liquido numeric default 0,
  salario_bruto   numeric default 0,
  horas_dia       numeric default 8,
  contrato        text,
  contrato_nome   text,
  atualizado_em   timestamptz default now(),
  user_id         uuid default auth.uid(),
  unique (colaborador_id)
);

create table if not exists tarefas (
  id        bigint generated always as identity primary key,
  titulo    text not null,
  coluna    text not null default 'afazer',   -- afazer | fazendo | feito
  criado_em timestamptz default now(),
  user_id   uuid default auth.uid()
);

-- Segurança (RLS): só usuário autenticado lê/grava.
do $$
declare t text;
begin
  foreach t in array array['ingredientes','receitas','colaboradores','pagamentos','tarefas'] loop
    execute format('alter table %I enable row level security', t);
    execute format('drop policy if exists "acesso total logado" on %I', t);
    execute format('create policy "acesso total logado" on %I for all to authenticated using (true) with check (true)', t);
  end loop;
end $$;
