/* ============================================================
   MODO DEMO / MOCK — roda o app 100% local, sem Supabase e sem
   login, com dados de exemplo em memória. Ativa com ?mock=1 na URL.
   Serve para demonstração e para os testes automatizados (Playwright).
   O modo real (produção) não é afetado.
   ------------------------------------------------------------
   Dados espelham massa-certa-COMPLETO.sql.
   ============================================================ */
const MOCK_MODE = /[?&]mock=1\b/.test(location.search) || (typeof window !== 'undefined' && window.MOCK_MODE === true);

function criarMockSupabase(){
  /* ---------- dados de exemplo (em memória) ---------- */
  const ESTOQUE_SEED = [
    ['guanciale',12.00,4,12], ['parmesão',12.00,6,15], ['tomate pelado',1.20,15,40],
    ['vitelo',14.00,3,10], ['coxão mole',9.50,5,12], ['azeite',8.00,8,20],
    ['ovo',2.50,10,25], ['pecorino',13.00,2,8], ['manjericão',15.00,1,6],
    ['paleta suína',5.50,4,10], ['pancetta',9.00,3,8], ['mozzarella',8.00,7,15],
    ['farinha comum',0.90,45,30], ['farinha de sêmola',1.30,22,15], ['sal',0.60,20,10],
    ['cebola',0.90,25,15], ['alho',4.00,9,5], ['vinho tinto',3.00,30,20],
    ['azeitona',6.00,12,8], ['salsão',1.50,14,8], ['cenoura',1.00,18,10],
    ['batata',1.00,35,20], ['salame',18.00,9,6], ['ricota',6.00,11,8],
    ['gorgonzola',12.00,8,5], ['salsinha',8.00,6,4], ['alecrim',12.00,5,3],
    ['pimenta do reino',15.00,5,3], ['sardinha',6.00,8,5], ['atum',16.00,9,6],
    ['salmão',18.00,12,8], ['camarão',20.00,8,5], ['limão',2.00,14,8],
    ['molho de tartufo',35.00,5,3], ['pesto',8.00,7,4],
  ];
  const ingredientes = ESTOQUE_SEED.map((r, i) => ({
    id: i + 1, nome: r[0], preco_kg: r[1], estoque_atual: r[2], estoque_minimo: r[3],
  }));

  const colaboradores = [
    ['Marco Rossi','Chef executivo','CF MOCK 0001','Via del Corso 120, Roma','+39 340 111 2233','marco.rossi@pastasciutta.it'],
    ['Giulia Bianchi','Sous chef','CF MOCK 0002','Via Nazionale 45, Roma','+39 340 222 3344','giulia.bianchi@pastasciutta.it'],
    ['Lorenzo Esposito','Cozinheiro','CF MOCK 0003','Viale Trastevere 88, Roma','+39 340 333 4455','lorenzo.esposito@pastasciutta.it'],
    ['Sofia Romano','Cozinheira','CF MOCK 0004','Via Cavour 30, Roma','+39 340 444 5566','sofia.romano@pastasciutta.it'],
    ['Matteo Ferrari','Ajudante de cozinha','CF MOCK 0005','Via Ostiense 210, Roma','+39 340 555 6677','matteo.ferrari@pastasciutta.it'],
    ['Chiara Colombo','Ajudante de cozinha','CF MOCK 0006','Via Appia Nuova 5, Roma','+39 340 666 7788','chiara.colombo@pastasciutta.it'],
    ['Alessandro Greco','Garçom','CF MOCK 0007','Via Tiburtina 150, Roma','+39 340 777 8899','alessandro.greco@pastasciutta.it'],
    ['Francesca Ricci','Maître','CF MOCK 0008','Piazza Navona 12, Roma','+39 340 888 9900','francesca.ricci@pastasciutta.it'],
    ['Davide Marino','Garçom','CF MOCK 0009','Via del Tritone 60, Roma','+39 340 999 0011','davide.marino@pastasciutta.it'],
    ['Elena Costa','Gerente','CF MOCK 0010','Via Veneto 25, Roma','+39 340 000 1122','elena.costa@pastasciutta.it'],
    ['Giovanni Conti','Barman','CF MOCK 0011','Via Merulana 70, Roma','+39 340 121 3141','giovanni.conti@pastasciutta.it'],
    ['Paolo Gallo','Auxiliar de limpeza','CF MOCK 0012','Via Prenestina 300, Roma','+39 340 151 6171','paolo.gallo@pastasciutta.it'],
  ].map((c, i) => ({
    id: i + 1, nome: c[0], cargo: c[1], documento: c[2], endereco: c[3],
    telefone: c[4], email: c[5], foto: null, documentos: [], criado_em: 1000 + i,
  }));

  const pagamentos = [
    [1,30,2400,3428.57,9], [2,29,2000,2816.9,8], [3,28,1700,2361.11,8],
    [4,28,1650,2291.67,6], [5,27,1350,1849.32,8], [6,27,1300,1780.82,7],
    [7,28,1450,2013.89,10], [8,29,1800,2535.21,8], [9,28,1400,1944.44,8],
    [10,30,2600,3714.29,8], [11,28,1500,2083.33,9], [12,26,1250,1689.19,7],
  ].map((p, i) => ({
    id: i + 1, colaborador_id: p[0], desconto_pct: p[1], salario_liquido: p[2],
    salario_bruto: p[3], horas_dia: p[4], contrato: null, contrato_nome: null, atualizado_em: 1000 + i,
  }));

  const receitas = [
    ['Massa fresca',113,[{ing:'ovo',g:5000},{ing:'água',g:2500},{ing:'sal',g:700},{ing:'farinha comum',g:15000},{ing:'farinha de sêmola',g:5000}],0.2913,'Misture as farinhas com o sal. Faça uma cova, junte os ovos e a água aos poucos e incorpore. Sove por ~10 min até a massa ficar lisa e elástica. Cubra e deixe descansar 30 min. Abra e corte no formato desejado.'],
    ['Ragu',100,[{ing:'coxão mole',g:3000},{ing:'paleta suína',g:3000},{ing:'vitelo',g:3000},{ing:'vinho tinto',g:800},{ing:'tomate pelado',g:9000},{ing:'sal',g:800},{ing:'cebola',g:2500},{ing:'salsão',g:2000},{ing:'alho',g:1000},{ing:'pimenta do reino',g:500}],1.1743,'Refogue cebola, salsão e alho. Junte as carnes e doure bem. Deglaceie com o vinho tinto. Acrescente o tomate pelado, o sal e a pimenta. Cozinhe em fogo baixo por 2 a 3 horas até encorpar.'],
    ['Carbonara',68,[{ing:'guanciale',g:5000},{ing:'ovo',g:6000},{ing:'parmesão',g:5000},{ing:'pecorino',g:1000},{ing:'pimenta do reino',g:200}],2.2206,'Doure o guanciale em cubos até ficar crocante. Bata os ovos com o parmesão, o pecorino e bastante pimenta. Cozinhe a massa al dente, misture ao guanciale fora do fogo e junte os ovos, mexendo rápido com um pouco da água da massa.'],
    ['Amatriciana',32,[{ing:'tomate pelado',g:5000},{ing:'guanciale',g:3000}],1.3125,'Doure o guanciale até soltar a gordura. Junte o tomate pelado amassado, tempere e cozinhe por ~15 min. Finalize a massa dentro do molho.'],
    ['Cacio e pepe',1,[{ing:'pimenta do reino',g:7},{ing:'água',g:100},{ing:'parmesão',g:100}],1.305,'Toste a pimenta moída na hora. Cozinhe a massa e reserve a água. Dissolva o queijo com um pouco da água quente até virar um creme. Misture à massa fora do fogo.'],
    ['Gricia',1,[{ing:'pimenta do reino',g:7},{ing:'água',g:100},{ing:'parmesão',g:100},{ing:'guanciale',g:80}],2.265,'É a cacio e pepe com guanciale: doure o guanciale, prepare o creme de queijo e pimenta com a água da massa e finalize a massa juntando o guanciale crocante.'],
    ['Pesto',1,[{ing:'pesto',g:50}],0.4,'Molho pronto. Aqueça levemente (sem ferver) e misture à massa cozida com um fio da água do cozimento para soltar. Sirva na hora.'],
    ['Tartufo',1,[{ing:'molho de tartufo',g:50}],1.75,'Molho pronto de trufas. Aqueça suavemente e envolva a massa, sem ferver, para preservar o aroma.'],
    ['Pomodoro e basilico',22,[{ing:'tomate pelado',g:5000},{ing:'alho',g:200},{ing:'manjericão',g:150},{ing:'azeite',g:300},{ing:'sal',g:50}],0.5218,'Doure o alho no azeite. Junte o tomate pelado amassado e o sal, cozinhe por ~20 min. Finalize com manjericão fresco fora do fogo.'],
    ['Aglio, olio e peperoncino',25,[{ing:'azeite',g:1000},{ing:'alho',g:400},{ing:'pimenta calabresa',g:30},{ing:'salsinha',g:100}],0.4376,'Doure lâminas de alho no azeite com a pimenta calabresa, sem queimar. Misture à massa com um pouco da água do cozimento e finalize com salsinha.'],
    ['Puttanesca',20,[{ing:'tomate pelado',g:4000},{ing:'azeitona',g:800},{ing:'alcaparra',g:300},{ing:'anchova',g:300},{ing:'alho',g:200},{ing:'azeite',g:200}],0.99,'Refogue o alho e a anchova no azeite até desmanchar. Junte tomate, azeitonas e alcaparras. Cozinhe por ~15 min e finalize a massa no molho.'],
    ['Arrabbiata',22,[{ing:'tomate pelado',g:5000},{ing:'alho',g:200},{ing:'pimenta calabresa',g:40},{ing:'azeite',g:200}],0.4145,'Doure o alho e a pimenta calabresa no azeite. Junte o tomate pelado, tempere e cozinhe por ~15 min. Bem picante.'],
  ].map((r, i) => ({
    id: i + 1, nome: r[0], rende: r[1], itens: r[2], custo_por_prato: r[3],
    modo_preparo: r[4], foto: null, criado_em: 1000 + i,
  }));

  const tarefas = [
    ['Comprar guanciale e parmesão','afazer'], ['Revisar preço do tartufo','afazer'],
    ['Contratar garçom para o verão','afazer'], ['Reservar fornecedor de vinho','afazer'],
    ['Fechar a folha do mês','fazendo'], ['Atualizar fotos das receitas','fazendo'],
    ['Treinar novo ajudante','fazendo'], ['Cadastrar a equipe no sistema','feito'],
    ['Definir cardápio de verão','feito'],
  ].map((t, i) => ({ id: i + 1, titulo: t[0], coluna: t[1], criado_em: 1000 + i }));

  const store = { ingredientes, receitas, colaboradores, pagamentos, tarefas };
  const seq = {};
  Object.keys(store).forEach(t => { seq[t] = store[t].reduce((m, r) => Math.max(m, r.id || 0), 0); });
  const nextId = (t) => (seq[t] = (seq[t] || 0) + 1);

  /* ---------- executor das operações ---------- */
  function runOp(q){
    const rows = store[q._table] || (store[q._table] = []);
    const match = (r) => q._filters.every(([c, v]) => r[c] === v);
    try {
      if (q._op === 'select'){
        let data = rows.filter(match).map(r => ({ ...r }));
        if (q._order){
          const { col, ascending } = q._order;
          data.sort((a, b) => { const x = a[col], y = b[col]; if (x < y) return ascending ? -1 : 1; if (x > y) return ascending ? 1 : -1; return 0; });
        }
        return { data, error: null };
      }
      if (q._op === 'insert'){
        const arr = Array.isArray(q._payload) ? q._payload : [q._payload];
        const inseridos = arr.map(p => { const row = { id: nextId(q._table), criado_em: nextId('_ts') + 1e12, ...p }; rows.push(row); return { ...row }; });
        return { data: inseridos, error: null };
      }
      if (q._op === 'update'){
        rows.filter(match).forEach(r => Object.assign(r, q._payload));
        return { data: null, error: null };
      }
      if (q._op === 'upsert'){
        const arr = Array.isArray(q._payload) ? q._payload : [q._payload];
        const key = q._onConflict;
        arr.forEach(p => {
          const existente = key ? rows.find(r => r[key] === p[key]) : null;
          if (existente) Object.assign(existente, p);
          else rows.push({ id: nextId(q._table), ...p });
        });
        return { data: null, error: null };
      }
      if (q._op === 'delete'){
        store[q._table] = rows.filter(r => !match(r));
        return { data: null, error: null };
      }
      return { data: null, error: { message: 'operação mock desconhecida: ' + q._op } };
    } catch (e){
      return { data: null, error: { message: String(e && e.message || e) } };
    }
  }

  /* ---------- query builder (thenable, imita o do supabase-js) ---------- */
  function makeQuery(table){
    return {
      _table: table, _op: null, _payload: null, _filters: [], _order: null, _onConflict: null,
      select(cols){ this._op = 'select'; this._cols = cols; return this; },
      insert(p){ this._op = 'insert'; this._payload = p; return this; },
      update(p){ this._op = 'update'; this._payload = p; return this; },
      upsert(p, opts){ this._op = 'upsert'; this._payload = p; this._onConflict = opts && opts.onConflict; return this; },
      delete(){ this._op = 'delete'; return this; },
      eq(col, val){ this._filters.push([col, val]); return this; },
      order(col, opts){ this._order = { col, ascending: !opts || opts.ascending !== false }; return this; },
      then(onF, onR){ try { return Promise.resolve(runOp(this)).then(onF, onR); } catch (e){ return Promise.resolve({ data: null, error: { message: String(e) } }).then(onF, onR); } },
    };
  }

  /* ---------- auth falso (sessão sempre logada) ---------- */
  const mockSession = { user: { id: 'mock-user', email: 'demo@massacerta.local', user_metadata: { nome: 'Demo · dados de exemplo' } } };
  let authCb = null;
  const auth = {
    async signInWithPassword(){ if (authCb) authCb('SIGNED_IN', mockSession); return { data: { session: mockSession, user: mockSession.user }, error: null }; },
    async signUp(){ if (authCb) authCb('SIGNED_IN', mockSession); return { data: { session: mockSession, user: mockSession.user }, error: null }; },
    async signOut(){ if (authCb) authCb('SIGNED_OUT', null); return { error: null }; },
    getSession(){ return Promise.resolve({ data: { session: mockSession }, error: null }); },
    onAuthStateChange(cb){ authCb = cb; return { data: { subscription: { unsubscribe(){} } } }; },
    async updateUser(attrs){ if (attrs && attrs.data) Object.assign(mockSession.user.user_metadata, attrs.data); if (attrs && attrs.email) mockSession.user.email = attrs.email; return { data: { user: mockSession.user }, error: null }; },
  };

  console.info('%c[Massa Certa] Modo DEMO ativo — dados de exemplo em memória (sem Supabase).', 'color:#b06a1f');
  return { from: (table) => makeQuery(table), auth };
}
