-- ============================================================
--  TABELAS DO SISTEMA — rode isto no Supabase
--  (Supabase → SQL Editor → New query → cole tudo → Run)
--  Cria as tabelas que faltavam: colaboradores e pagamentos.
--  As tabelas receitas e ingredientes já existem.
-- ============================================================

-- ---------- COLABORADORES ----------
create table if not exists public.colaboradores (
  id          bigint generated always as identity primary key,
  nome        text not null,
  cargo       text,
  documento   text,
  endereco    text,
  telefone    text,
  email       text,
  foto        text,                        -- foto em base64 (data URL)
  documentos  jsonb default '[]'::jsonb,   -- lista de imagens em base64
  criado_em   timestamptz default now()
);

-- ---------- PAGAMENTOS ----------
create table if not exists public.pagamentos (
  id               bigint generated always as identity primary key,
  colaborador_id   bigint not null unique references public.colaboradores(id) on delete cascade,
  desconto_pct     numeric default 0,
  salario_liquido  numeric default 0,
  salario_bruto    numeric default 0,
  horas_dia        numeric default 8,
  contrato         text,                   -- PDF do contrato em base64
  contrato_nome    text,
  atualizado_em    timestamptz default now()
);

-- ============================================================
--  SEGURANÇA (RLS): só usuários logados podem ler/gravar.
--  Quem não está autenticado (chave anon pura) não acessa nada.
-- ============================================================
alter table public.colaboradores enable row level security;
alter table public.pagamentos    enable row level security;

drop policy if exists "colaboradores_auth_all" on public.colaboradores;
create policy "colaboradores_auth_all" on public.colaboradores
  for all to authenticated using (true) with check (true);

drop policy if exists "pagamentos_auth_all" on public.pagamentos;
create policy "pagamentos_auth_all" on public.pagamentos
  for all to authenticated using (true) with check (true);
