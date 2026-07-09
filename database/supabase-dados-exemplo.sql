-- ============================================================
--  DADOS DE EXEMPLO — verificado contra o app em 08/07/2026
--  Executado por Estêvão direto no SQL Editor do Supabase.
--  Salvo aqui só para DOCUMENTAÇÃO/versionamento (idempotente:
--  pode rodar de novo sem duplicar — usa delete-antes-insert e
--  on conflict). Não altera a tabela `ingredientes` de propósito.
--
--  Confere com o código:
--   • receitas.itens usa chaves {"ing","g"} = js/app.js (x.ing/x.g)
--   • custo_por_prato bate com os preços padrão de PRECOS
--     (ex.: Massa fresca 0,2914 · Carbonara 2,2206)
--   • pagamentos.salario_bruto = liquido / (1 - desconto%)
--     (ex.: Marco 2400/0,70 = 3428,57), igual ao calcPay()
-- ============================================================

-- ============================================================
--  MASSA CERTA — Receitas + Equipe + Folha (pula ingredientes)
--  Cole no SQL Editor do Supabase e clique em Run.
-- ============================================================

-- ---------- RECEITAS (8 do Pastasciutta + 4 extras) ----------
delete from receitas where nome in ('Massa fresca','Ragu','Carbonara','Amatriciana','Cacio e pepe','Gricia','Pesto','Tartufo','Pomodoro e basilico','Aglio, olio e peperoncino','Puttanesca','Arrabbiata');
insert into receitas (nome, rende, itens, custo_por_prato, modo_preparo, foto) values
('Massa fresca',113,'[{"ing":"ovo","g":5000},{"ing":"água","g":2500},{"ing":"sal","g":700},{"ing":"farinha comum","g":15000},{"ing":"farinha de sêmola","g":5000}]'::jsonb,0.2914,'Misture as farinhas com o sal. Faça uma cova, junte os ovos e a água aos poucos. Sove ~10 min até ficar lisa. Descanse 30 min, abra e corte.',null),
('Ragu',100,'[{"ing":"coxão mole","g":3000},{"ing":"paleta suína","g":3000},{"ing":"vitelo","g":3000},{"ing":"vinho tinto","g":800},{"ing":"tomate pelado","g":9000},{"ing":"sal","g":800},{"ing":"cebola","g":2500},{"ing":"salsão","g":2000},{"ing":"alho","g":1000},{"ing":"pimenta do reino","g":500}]'::jsonb,1.1743,'Refogue cebola, salsão e alho. Doure as carnes. Deglaceie com vinho. Junte tomate, sal e pimenta. Cozinhe 2 a 3h até encorpar.',null),
('Carbonara',68,'[{"ing":"guanciale","g":5000},{"ing":"ovo","g":6000},{"ing":"parmesão","g":5000},{"ing":"pecorino","g":1000},{"ing":"pimenta do reino","g":200}]'::jsonb,2.2206,'Doure o guanciale. Bata ovos com os queijos e pimenta. Misture à massa fora do fogo com a água do cozimento, mexendo para criar o creme.',null),
('Amatriciana',32,'[{"ing":"tomate pelado","g":5000},{"ing":"guanciale","g":3000}]'::jsonb,1.3125,'Doure o guanciale. Junte o tomate amassado, tempere e cozinhe ~15 min. Finalize a massa no molho.',null),
('Cacio e pepe',1,'[{"ing":"pimenta do reino","g":7},{"ing":"água","g":100},{"ing":"parmesão","g":100}]'::jsonb,1.305,'Toste a pimenta. Dissolva o queijo com a água quente da massa até virar creme. Misture à massa fora do fogo.',null),
('Gricia',1,'[{"ing":"pimenta do reino","g":7},{"ing":"água","g":100},{"ing":"parmesão","g":100},{"ing":"guanciale","g":80}]'::jsonb,2.265,'Cacio e pepe com guanciale: doure o guanciale, faça o creme de queijo e pimenta e finalize a massa.',null),
('Pesto',1,'[{"ing":"pesto","g":50}]'::jsonb,0.4,'Molho pronto. Aqueça levemente e misture à massa com um fio da água do cozimento.',null),
('Tartufo',1,'[{"ing":"molho de tartufo","g":50}]'::jsonb,1.75,'Molho pronto de trufas. Aqueça suave e envolva a massa, sem ferver.',null),
('Pomodoro e basilico',22,'[{"ing":"tomate pelado","g":5000},{"ing":"alho","g":200},{"ing":"manjericão","g":150},{"ing":"azeite","g":300},{"ing":"sal","g":50}]'::jsonb,0.4287,'Doure o alho no azeite. Junte tomate e sal, cozinhe ~20 min. Finalize com manjericão.',null),
('Aglio, olio e peperoncino',25,'[{"ing":"azeite","g":1000},{"ing":"alho","g":400},{"ing":"pimenta calabresa","g":30},{"ing":"salsinha","g":100}]'::jsonb,0.4136,'Doure lâminas de alho no azeite com a pimenta. Misture à massa com a água do cozimento e a salsinha.',null),
('Puttanesca',20,'[{"ing":"tomate pelado","g":4000},{"ing":"azeitona","g":800},{"ing":"alcaparra","g":300},{"ing":"anchova","g":300},{"ing":"alho","g":200},{"ing":"azeite","g":200}]'::jsonb,0.83,'Refogue alho e anchova no azeite. Junte tomate, azeitonas e alcaparras. Cozinhe ~15 min e finalize a massa.',null),
('Arrabbiata',22,'[{"ing":"tomate pelado","g":5000},{"ing":"alho","g":200},{"ing":"pimenta calabresa","g":40},{"ing":"azeite","g":200}]'::jsonb,0.3305,'Doure alho e pimenta no azeite. Junte tomate, tempere e cozinhe ~15 min. Bem picante.',null);

-- ---------- EQUIPE (mockada) ----------
delete from colaboradores where nome in ('Marco Rossi','Giulia Bianchi','Lorenzo Esposito','Sofia Romano','Matteo Ferrari','Chiara Colombo','Alessandro Greco','Francesca Ricci','Davide Marino','Elena Costa');
insert into colaboradores (nome, cargo, documento, endereco, telefone, email) values
('Marco Rossi','Chef executivo','CF MOCK 0001','Via del Corso 120, Roma','+39 340 111 2233','marco.rossi@pastasciutta.it'),
('Giulia Bianchi','Sous chef','CF MOCK 0002','Via Nazionale 45, Roma','+39 340 222 3344','giulia.bianchi@pastasciutta.it'),
('Lorenzo Esposito','Cozinheiro','CF MOCK 0003','Viale Trastevere 88, Roma','+39 340 333 4455','lorenzo.esposito@pastasciutta.it'),
('Sofia Romano','Cozinheira','CF MOCK 0004','Via Cavour 30, Roma','+39 340 444 5566','sofia.romano@pastasciutta.it'),
('Matteo Ferrari','Ajudante de cozinha','CF MOCK 0005','Via Ostiense 210, Roma','+39 340 555 6677','matteo.ferrari@pastasciutta.it'),
('Chiara Colombo','Ajudante de cozinha','CF MOCK 0006','Via Appia Nuova 5, Roma','+39 340 666 7788','chiara.colombo@pastasciutta.it'),
('Alessandro Greco','Garçom','CF MOCK 0007','Via Tiburtina 150, Roma','+39 340 777 8899','alessandro.greco@pastasciutta.it'),
('Francesca Ricci','Maître','CF MOCK 0008','Piazza Navona 12, Roma','+39 340 888 9900','francesca.ricci@pastasciutta.it'),
('Davide Marino','Garçom','CF MOCK 0009','Via del Tritone 60, Roma','+39 340 999 0011','davide.marino@pastasciutta.it'),
('Elena Costa','Gerente','CF MOCK 0010','Via Veneto 25, Roma','+39 340 000 1122','elena.costa@pastasciutta.it');

-- ---------- FOLHA DE PAGAMENTO (mockada) ----------
insert into pagamentos (colaborador_id, desconto_pct, salario_liquido, salario_bruto, horas_dia)
  select id, 30, 2400, 3428.57, 9  from colaboradores where nome = 'Marco Rossi'
  union all select id, 29, 2000, 2816.90, 8  from colaboradores where nome = 'Giulia Bianchi'
  union all select id, 28, 1700, 2361.11, 8  from colaboradores where nome = 'Lorenzo Esposito'
  union all select id, 28, 1650, 2291.67, 6  from colaboradores where nome = 'Sofia Romano'
  union all select id, 27, 1350, 1849.32, 8  from colaboradores where nome = 'Matteo Ferrari'
  union all select id, 27, 1300, 1780.82, 7  from colaboradores where nome = 'Chiara Colombo'
  union all select id, 28, 1450, 2013.89, 10 from colaboradores where nome = 'Alessandro Greco'
  union all select id, 29, 1800, 2535.21, 8  from colaboradores where nome = 'Francesca Ricci'
  union all select id, 28, 1400, 1944.44, 8  from colaboradores where nome = 'Davide Marino'
  union all select id, 30, 2600, 3714.29, 8  from colaboradores where nome = 'Elena Costa'
on conflict (colaborador_id) do update set
  desconto_pct = excluded.desconto_pct,
  salario_liquido = excluded.salario_liquido,
  salario_bruto = excluded.salario_bruto,
  horas_dia = excluded.horas_dia;
