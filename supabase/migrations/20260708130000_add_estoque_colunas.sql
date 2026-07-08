-- Corrige o "erro ao atualizar estoque": cria as colunas que faltam.
-- A migration inicial usa `create table if not exists`, que NÃO altera a
-- tabela `ingredientes` já existente — então estas colunas não tinham sido
-- adicionadas em produção. `add column if not exists` é idempotente.
alter table ingredientes add column if not exists estoque_atual  numeric default 0;
alter table ingredientes add column if not exists estoque_minimo numeric default 0;
