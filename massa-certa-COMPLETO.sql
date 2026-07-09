-- ============================================================
--  MASSA CERTA — BANCO COMPLETO + DADOS REALISTAS (um arquivo só)
--  Cole tudo no SQL Editor do Supabase e clique em Run.
--  Idempotente (pode rodar de novo). Também cria as colunas de
--  estoque que faltavam (corrige o erro ao salvar estoque).
-- ============================================================

create table if not exists ingredientes (
  id bigint generated always as identity primary key,
  nome text not null unique, preco_kg numeric not null default 0,
  estoque_atual numeric default 0, estoque_minimo numeric default 0 );
create table if not exists receitas (
  id bigint generated always as identity primary key,
  nome text not null, rende int not null default 1, itens jsonb not null default '[]',
  custo_por_prato numeric not null default 0, foto text, modo_preparo text,
  criado_em timestamptz not null default now(), user_id uuid default auth.uid() );
create table if not exists colaboradores (
  id bigint generated always as identity primary key,
  nome text not null, cargo text, documento text, endereco text, telefone text, email text,
  foto text, documentos jsonb default '[]',
  criado_em timestamptz default now(), user_id uuid default auth.uid() );
create table if not exists pagamentos (
  id bigint generated always as identity primary key,
  colaborador_id bigint references colaboradores(id) on delete cascade,
  desconto_pct numeric default 0, salario_liquido numeric default 0,
  salario_bruto numeric default 0, horas_dia numeric default 8,
  contrato text, contrato_nome text, atualizado_em timestamptz default now(),
  user_id uuid default auth.uid(), unique (colaborador_id) );
create table if not exists tarefas (
  id bigint generated always as identity primary key,
  titulo text not null, coluna text not null default 'afazer',
  criado_em timestamptz default now(), user_id uuid default auth.uid() );
-- garante as colunas de estoque mesmo se a tabela já existia (CORREÇÃO DO BUG)
alter table ingredientes add column if not exists estoque_atual numeric default 0;
alter table ingredientes add column if not exists estoque_minimo numeric default 0;
alter table ingredientes enable row level security;
drop policy if exists "acesso total logado" on ingredientes;
create policy "acesso total logado" on ingredientes for all to authenticated using (true) with check (true);
alter table receitas enable row level security;
drop policy if exists "acesso total logado" on receitas;
create policy "acesso total logado" on receitas for all to authenticated using (true) with check (true);
alter table colaboradores enable row level security;
drop policy if exists "acesso total logado" on colaboradores;
create policy "acesso total logado" on colaboradores for all to authenticated using (true) with check (true);
alter table pagamentos enable row level security;
drop policy if exists "acesso total logado" on pagamentos;
create policy "acesso total logado" on pagamentos for all to authenticated using (true) with check (true);
alter table tarefas enable row level security;
drop policy if exists "acesso total logado" on tarefas;
create policy "acesso total logado" on tarefas for all to authenticated using (true) with check (true);


-- ---------- INGREDIENTES (169) ----------
insert into ingredientes (nome, preco_kg) values
  ('farinha comum', 0.90),
  ('farinha de sêmola', 1.30),
  ('farinha integral', 1.20),
  ('arroz', 1.50),
  ('arroz arbóreo', 3.50),
  ('fubá', 1.20),
  ('polenta', 1.50),
  ('pão', 2.50),
  ('massa seca', 1.60),
  ('pão ralado', 2.00),
  ('amido de milho', 2.00),
  ('aveia', 2.50),
  ('cuscuz', 2.00),
  ('ovo', 2.50),
  ('leite', 1.00),
  ('creme de leite', 3.50),
  ('manteiga', 8.00),
  ('iogurte', 2.50),
  ('requeijão', 6.00),
  ('parmesão', 12.00),
  ('pecorino', 13.00),
  ('mozzarella', 8.00),
  ('mozzarella de búfala', 16.00),
  ('burrata', 16.00),
  ('ricota', 6.00),
  ('gorgonzola', 12.00),
  ('mascarpone', 8.00),
  ('provolone', 10.00),
  ('grana padano', 11.00),
  ('queijo brie', 14.00),
  ('coxão mole', 9.50),
  ('paleta suína', 5.50),
  ('vitelo', 14.00),
  ('guanciale', 12.00),
  ('pancetta', 9.00),
  ('bacon', 8.00),
  ('presunto cru', 25.00),
  ('presunto cozido', 12.00),
  ('carne moída', 8.00),
  ('costela suína', 7.00),
  ('costela bovina', 9.00),
  ('linguiça', 8.00),
  ('salame', 18.00),
  ('cordeiro', 15.00),
  ('coelho', 11.00),
  ('filé mignon', 28.00),
  ('contrafilé', 18.00),
  ('frango', 4.00),
  ('peito de frango', 6.50),
  ('coxa de frango', 4.00),
  ('peru', 7.00),
  ('pato', 11.00),
  ('salmão', 18.00),
  ('bacalhau', 15.00),
  ('atum', 16.00),
  ('camarão', 20.00),
  ('lula', 12.00),
  ('polvo', 18.00),
  ('mexilhão', 6.00),
  ('vôngole', 13.00),
  ('anchova', 14.00),
  ('sardinha', 6.00),
  ('robalo', 16.00),
  ('cebola', 0.90),
  ('alho', 4.00),
  ('tomate', 2.00),
  ('tomate pelado', 1.20),
  ('cenoura', 1.00),
  ('batata', 1.00),
  ('batata-doce', 1.50),
  ('abobrinha', 2.00),
  ('berinjela', 2.00),
  ('pimentão', 2.50),
  ('cogumelo', 6.00),
  ('cogumelo porcini', 40.00),
  ('aspargo', 6.00),
  ('brócolis', 2.50),
  ('couve-flor', 2.00),
  ('espinafre', 3.00),
  ('rúcula', 6.00),
  ('alface', 2.00),
  ('salsão', 1.50),
  ('funcho', 2.50),
  ('alho-poró', 2.50),
  ('ervilha', 3.00),
  ('abóbora', 1.50),
  ('milho', 2.00),
  ('azeitona', 6.00),
  ('alcaparra', 12.00),
  ('pepino', 1.80),
  ('repolho', 1.20),
  ('beterraba', 1.50),
  ('manjericão', 15.00),
  ('salsinha', 8.00),
  ('alecrim', 12.00),
  ('tomilho', 15.00),
  ('sálvia', 15.00),
  ('orégano', 12.00),
  ('hortelã', 12.00),
  ('louro', 18.00),
  ('coentro', 10.00),
  ('cebolinha', 8.00),
  ('abacaxi', 2.50),
  ('limão', 2.00),
  ('laranja', 1.50),
  ('maçã', 2.00),
  ('banana', 1.80),
  ('morango', 6.00),
  ('uva', 3.00),
  ('pera', 2.20),
  ('pêssego', 3.00),
  ('melão', 1.50),
  ('melancia', 1.00),
  ('figo', 5.00),
  ('damasco', 6.00),
  ('cereja', 8.00),
  ('kiwi', 3.00),
  ('manga', 4.00),
  ('framboesa', 12.00),
  ('mirtilo', 12.00),
  ('tâmara', 8.00),
  ('sal', 0.60),
  ('pimenta do reino', 15.00),
  ('pimenta calabresa', 18.00),
  ('noz-moscada', 30.00),
  ('canela', 20.00),
  ('cúrcuma', 8.00),
  ('páprica', 12.00),
  ('curry', 14.00),
  ('cominho', 14.00),
  ('gengibre', 4.00),
  ('cravo', 22.00),
  ('erva-doce', 10.00),
  ('azeite', 8.00),
  ('azeite extra virgem', 12.00),
  ('óleo de girassol', 2.00),
  ('banha', 4.00),
  ('vinagre', 2.00),
  ('vinagre balsâmico', 8.00),
  ('vinagre de vinho', 3.00),
  ('pesto', 8.00),
  ('molho de tomate', 2.00),
  ('molho de tartufo', 35.00),
  ('mostarda', 5.00),
  ('maionese', 4.00),
  ('shoyu', 6.00),
  ('extrato de tomate', 3.00),
  ('grão de bico', 2.00),
  ('lentilha', 2.50),
  ('feijão', 2.50),
  ('ervilha seca', 2.00),
  ('açúcar', 1.00),
  ('açúcar de confeiteiro', 2.00),
  ('mel', 8.00),
  ('chocolate', 10.00),
  ('cacau', 12.00),
  ('chocolate amargo', 12.00),
  ('noz', 12.00),
  ('amêndoa', 10.00),
  ('pinoli', 60.00),
  ('avelã', 12.00),
  ('castanha', 8.00),
  ('gergelim', 6.00),
  ('pistache', 20.00),
  ('água', 0.00),
  ('vinho tinto', 3.00),
  ('vinho branco', 3.00),
  ('vinho marsala', 7.00),
  ('conhaque', 15.00)
on conflict (nome) do nothing;

-- ---------- ESTOQUE (realista) ----------
update ingredientes set estoque_minimo=12, estoque_atual=4 where nome='guanciale';
update ingredientes set estoque_minimo=15, estoque_atual=6 where nome='parmesão';
update ingredientes set estoque_minimo=40, estoque_atual=15 where nome='tomate pelado';
update ingredientes set estoque_minimo=10, estoque_atual=3 where nome='vitelo';
update ingredientes set estoque_minimo=12, estoque_atual=5 where nome='coxão mole';
update ingredientes set estoque_minimo=20, estoque_atual=8 where nome='azeite';
update ingredientes set estoque_minimo=25, estoque_atual=10 where nome='ovo';
update ingredientes set estoque_minimo=8, estoque_atual=2 where nome='pecorino';
update ingredientes set estoque_minimo=6, estoque_atual=1 where nome='manjericão';
update ingredientes set estoque_minimo=10, estoque_atual=4 where nome='paleta suína';
update ingredientes set estoque_minimo=8, estoque_atual=3 where nome='pancetta';
update ingredientes set estoque_minimo=15, estoque_atual=7 where nome='mozzarella';
update ingredientes set estoque_minimo=30, estoque_atual=45 where nome='farinha comum';
update ingredientes set estoque_minimo=15, estoque_atual=22 where nome='farinha de sêmola';
update ingredientes set estoque_minimo=10, estoque_atual=20 where nome='sal';
update ingredientes set estoque_minimo=15, estoque_atual=25 where nome='cebola';
update ingredientes set estoque_minimo=5, estoque_atual=9 where nome='alho';
update ingredientes set estoque_minimo=20, estoque_atual=30 where nome='vinho tinto';
update ingredientes set estoque_minimo=8, estoque_atual=12 where nome='azeitona';
update ingredientes set estoque_minimo=8, estoque_atual=14 where nome='salsão';
update ingredientes set estoque_minimo=10, estoque_atual=18 where nome='cenoura';
update ingredientes set estoque_minimo=20, estoque_atual=35 where nome='batata';
update ingredientes set estoque_minimo=6, estoque_atual=9 where nome='salame';
update ingredientes set estoque_minimo=8, estoque_atual=11 where nome='ricota';
update ingredientes set estoque_minimo=5, estoque_atual=8 where nome='gorgonzola';
update ingredientes set estoque_minimo=4, estoque_atual=6 where nome='salsinha';
update ingredientes set estoque_minimo=3, estoque_atual=5 where nome='alecrim';
update ingredientes set estoque_minimo=3, estoque_atual=5 where nome='pimenta do reino';
update ingredientes set estoque_minimo=5, estoque_atual=8 where nome='sardinha';
update ingredientes set estoque_minimo=6, estoque_atual=9 where nome='atum';
update ingredientes set estoque_minimo=8, estoque_atual=12 where nome='salmão';
update ingredientes set estoque_minimo=5, estoque_atual=8 where nome='camarão';
update ingredientes set estoque_minimo=8, estoque_atual=14 where nome='limão';
update ingredientes set estoque_minimo=3, estoque_atual=5 where nome='molho de tartufo';
update ingredientes set estoque_minimo=4, estoque_atual=7 where nome='pesto';

-- ---------- RECEITAS (Pastasciutta) ----------
delete from receitas where nome in ('Massa fresca', 'Ragu', 'Carbonara', 'Amatriciana', 'Cacio e pepe', 'Gricia', 'Pesto', 'Tartufo');

insert into receitas (nome, rende, itens, custo_por_prato, modo_preparo, foto) values
  ('Massa fresca', 113, '[{"ing": "ovo", "g": 5000}, {"ing": "água", "g": 2500}, {"ing": "sal", "g": 700}, {"ing": "farinha comum", "g": 15000}, {"ing": "farinha de sêmola", "g": 5000}]'::jsonb, 0.2913, 'Misture as farinhas com o sal. Faça uma cova, junte os ovos e a água aos poucos e incorpore. Sove por ~10 min até a massa ficar lisa e elástica. Cubra e deixe descansar 30 min. Abra e corte no formato desejado.', null),
  ('Ragu', 100, '[{"ing": "coxão mole", "g": 3000}, {"ing": "paleta suína", "g": 3000}, {"ing": "vitelo", "g": 3000}, {"ing": "vinho tinto", "g": 800}, {"ing": "tomate pelado", "g": 9000}, {"ing": "sal", "g": 800}, {"ing": "cebola", "g": 2500}, {"ing": "salsão", "g": 2000}, {"ing": "alho", "g": 1000}, {"ing": "pimenta do reino", "g": 500}]'::jsonb, 1.1743, 'Refogue cebola, salsão e alho. Junte as carnes (vaca, suíno e vitelo) e doure bem. Deglaceie com o vinho tinto. Acrescente o tomate pelado, o sal e a pimenta. Cozinhe em fogo baixo por 2 a 3 horas, mexendo de vez em quando, até encorpar.', null),
  ('Carbonara', 68, '[{"ing": "guanciale", "g": 5000}, {"ing": "ovo", "g": 6000}, {"ing": "parmesão", "g": 5000}, {"ing": "pecorino", "g": 1000}, {"ing": "pimenta do reino", "g": 200}]'::jsonb, 2.2206, 'Doure o guanciale em cubos até ficar crocante. Bata os ovos com o parmesão, o pecorino e bastante pimenta. Cozinhe a massa al dente, misture ao guanciale fora do fogo e junte os ovos, mexendo rápido com um pouco da água da massa para criar o creme, sem talhar.', null),
  ('Amatriciana', 32, '[{"ing": "tomate pelado", "g": 5000}, {"ing": "guanciale", "g": 3000}]'::jsonb, 1.3125, 'Doure o guanciale até soltar a gordura. Junte o tomate pelado amassado, tempere e cozinhe por ~15 min. Finalize a massa dentro do molho. Tradicionalmente leva pecorino por cima.', null),
  ('Cacio e pepe', 1, '[{"ing": "pimenta do reino", "g": 7}, {"ing": "água", "g": 100}, {"ing": "parmesão", "g": 100}]'::jsonb, 1.305, 'Toste a pimenta moída na hora. Cozinhe a massa e reserve a água. Dissolva o queijo com um pouco da água quente da massa até virar um creme. Misture à massa fora do fogo, mexendo até ligar.', null),
  ('Gricia', 1, '[{"ing": "pimenta do reino", "g": 7}, {"ing": "água", "g": 100}, {"ing": "parmesão", "g": 100}, {"ing": "guanciale", "g": 80}]'::jsonb, 2.265, 'É a cacio e pepe com guanciale: doure o guanciale, prepare o creme de queijo e pimenta com a água da massa e finalize a massa juntando o guanciale crocante.', null),
  ('Pesto', 1, '[{"ing": "pesto", "g": 50}]'::jsonb, 0.4, 'Molho pronto. Aqueça levemente (sem ferver) e misture à massa cozida com um fio da água do cozimento para soltar. Sirva na hora.', null),
  ('Tartufo', 1, '[{"ing": "molho de tartufo", "g": 50}]'::jsonb, 1.75, 'Molho pronto de trufas. Aqueça suavemente e envolva a massa, sem ferver, para preservar o aroma. Finalize com queijo se desejar.', null);

-- ---------- RECEITAS EXTRAS ----------
delete from receitas where nome in ('Pomodoro e basilico', 'Aglio, olio e peperoncino', 'Puttanesca', 'Arrabbiata');
insert into receitas (nome, rende, itens, custo_por_prato, modo_preparo, foto) values
  ('Pomodoro e basilico', 22, '[{"ing": "tomate pelado", "g": 5000}, {"ing": "alho", "g": 200}, {"ing": "manjericão", "g": 150}, {"ing": "azeite", "g": 300}, {"ing": "sal", "g": 50}]'::jsonb, 0.5218, 'Doure o alho no azeite. Junte o tomate pelado amassado e o sal, cozinhe por ~20 min. Finalize com manjericão fresco fora do fogo.', null),
  ('Aglio, olio e peperoncino', 25, '[{"ing": "azeite", "g": 1000}, {"ing": "alho", "g": 400}, {"ing": "pimenta calabresa", "g": 30}, {"ing": "salsinha", "g": 100}]'::jsonb, 0.4376, 'Doure lâminas de alho no azeite com a pimenta calabresa, sem queimar. Misture à massa com um pouco da água do cozimento e finalize com salsinha.', null),
  ('Puttanesca', 20, '[{"ing": "tomate pelado", "g": 4000}, {"ing": "azeitona", "g": 800}, {"ing": "alcaparra", "g": 300}, {"ing": "anchova", "g": 300}, {"ing": "alho", "g": 200}, {"ing": "azeite", "g": 200}]'::jsonb, 0.99, 'Refogue o alho e a anchova no azeite até desmanchar. Junte tomate, azeitonas e alcaparras. Cozinhe por ~15 min e finalize a massa no molho.', null),
  ('Arrabbiata', 22, '[{"ing": "tomate pelado", "g": 5000}, {"ing": "alho", "g": 200}, {"ing": "pimenta calabresa", "g": 40}, {"ing": "azeite", "g": 200}]'::jsonb, 0.4145, 'Doure o alho e a pimenta calabresa no azeite. Junte o tomate pelado, tempere e cozinhe por ~15 min. Bem picante.', null);

-- ---------- EQUIPE (12) ----------
delete from colaboradores where nome in ('Marco Rossi', 'Giulia Bianchi', 'Lorenzo Esposito', 'Sofia Romano', 'Matteo Ferrari', 'Chiara Colombo', 'Alessandro Greco', 'Francesca Ricci', 'Davide Marino', 'Elena Costa', 'Giovanni Conti', 'Paolo Gallo');
insert into colaboradores (nome,cargo,documento,endereco,telefone,email) values
  ('Marco Rossi','Chef executivo','CF MOCK 0001','Via del Corso 120, Roma','+39 340 111 2233','marco.rossi@pastasciutta.it'),
  ('Giulia Bianchi','Sous chef','CF MOCK 0002','Via Nazionale 45, Roma','+39 340 222 3344','giulia.bianchi@pastasciutta.it'),
  ('Lorenzo Esposito','Cozinheiro','CF MOCK 0003','Viale Trastevere 88, Roma','+39 340 333 4455','lorenzo.esposito@pastasciutta.it'),
  ('Sofia Romano','Cozinheira','CF MOCK 0004','Via Cavour 30, Roma','+39 340 444 5566','sofia.romano@pastasciutta.it'),
  ('Matteo Ferrari','Ajudante de cozinha','CF MOCK 0005','Via Ostiense 210, Roma','+39 340 555 6677','matteo.ferrari@pastasciutta.it'),
  ('Chiara Colombo','Ajudante de cozinha','CF MOCK 0006','Via Appia Nuova 5, Roma','+39 340 666 7788','chiara.colombo@pastasciutta.it'),
  ('Alessandro Greco','Garçom','CF MOCK 0007','Via Tiburtina 150, Roma','+39 340 777 8899','alessandro.greco@pastasciutta.it'),
  ('Francesca Ricci','Maître','CF MOCK 0008','Piazza Navona 12, Roma','+39 340 888 9900','francesca.ricci@pastasciutta.it'),
  ('Davide Marino','Garçom','CF MOCK 0009','Via del Tritone 60, Roma','+39 340 999 0011','davide.marino@pastasciutta.it'),
  ('Elena Costa','Gerente','CF MOCK 0010','Via Veneto 25, Roma','+39 340 000 1122','elena.costa@pastasciutta.it'),
  ('Giovanni Conti','Barman','CF MOCK 0011','Via Merulana 70, Roma','+39 340 121 3141','giovanni.conti@pastasciutta.it'),
  ('Paolo Gallo','Auxiliar de limpeza','CF MOCK 0012','Via Prenestina 300, Roma','+39 340 151 6171','paolo.gallo@pastasciutta.it');

-- ---------- FOLHA DE PAGAMENTO ----------
insert into pagamentos (colaborador_id,desconto_pct,salario_liquido,salario_bruto,horas_dia)
  select id,30,2400,3428.57,9 from colaboradores where nome='Marco Rossi'
  union all select id,29,2000,2816.9,8 from colaboradores where nome='Giulia Bianchi'
  union all select id,28,1700,2361.11,8 from colaboradores where nome='Lorenzo Esposito'
  union all select id,28,1650,2291.67,6 from colaboradores where nome='Sofia Romano'
  union all select id,27,1350,1849.32,8 from colaboradores where nome='Matteo Ferrari'
  union all select id,27,1300,1780.82,7 from colaboradores where nome='Chiara Colombo'
  union all select id,28,1450,2013.89,10 from colaboradores where nome='Alessandro Greco'
  union all select id,29,1800,2535.21,8 from colaboradores where nome='Francesca Ricci'
  union all select id,28,1400,1944.44,8 from colaboradores where nome='Davide Marino'
  union all select id,30,2600,3714.29,8 from colaboradores where nome='Elena Costa'
  union all select id,28,1500,2083.33,9 from colaboradores where nome='Giovanni Conti'
  union all select id,26,1250,1689.19,7 from colaboradores where nome='Paolo Gallo'
on conflict (colaborador_id) do update set desconto_pct=excluded.desconto_pct, salario_liquido=excluded.salario_liquido, salario_bruto=excluded.salario_bruto, horas_dia=excluded.horas_dia;

-- ---------- GESTÃO (tarefas) ----------
delete from tarefas where titulo in ('Comprar guanciale e parmesão', 'Revisar preço do tartufo', 'Contratar garçom para o verão', 'Reservar fornecedor de vinho', 'Fechar a folha do mês', 'Atualizar fotos das receitas', 'Treinar novo ajudante', 'Cadastrar a equipe no sistema', 'Definir cardápio de verão');
insert into tarefas (titulo,coluna) values
  ('Comprar guanciale e parmesão','afazer'),
  ('Revisar preço do tartufo','afazer'),
  ('Contratar garçom para o verão','afazer'),
  ('Reservar fornecedor de vinho','afazer'),
  ('Fechar a folha do mês','fazendo'),
  ('Atualizar fotos das receitas','fazendo'),
  ('Treinar novo ajudante','fazendo'),
  ('Cadastrar a equipe no sistema','feito'),
  ('Definir cardápio de verão','feito');
