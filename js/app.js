/* ===== dados base ===== */
const PRECOS = {
  'farinha comum':0.90,'farinha de sêmola':1.30,'farinha integral':1.20,'arroz':1.50,
  'arroz arbóreo':3.50,'fubá':1.20,'polenta':1.50,'pão':2.50,
  'massa seca':1.60,'pão ralado':2.00,'amido de milho':2.00,'aveia':2.50,
  'cuscuz':2.00,'ovo':2.50,'leite':1.00,'creme de leite':3.50,
  'manteiga':8.00,'iogurte':2.50,'requeijão':6.00,'parmesão':12.00,
  'pecorino':13.00,'mozzarella':8.00,'mozzarella de búfala':16.00,'burrata':16.00,
  'ricota':6.00,'gorgonzola':12.00,'mascarpone':8.00,'provolone':10.00,
  'grana padano':11.00,'queijo brie':14.00,'coxão mole':9.50,'paleta suína':5.50,
  'vitelo':14.00,'guanciale':12.00,'pancetta':9.00,'bacon':8.00,
  'presunto cru':25.00,'presunto cozido':12.00,'carne moída':8.00,'costela suína':7.00,
  'costela bovina':9.00,'linguiça':8.00,'salame':18.00,'cordeiro':15.00,
  'coelho':11.00,'filé mignon':28.00,'contrafilé':18.00,'frango':4.00,
  'peito de frango':6.50,'coxa de frango':4.00,'peru':7.00,'pato':11.00,
  'salmão':18.00,'bacalhau':15.00,'atum':16.00,'camarão':20.00,
  'lula':12.00,'polvo':18.00,'mexilhão':6.00,'vôngole':13.00,
  'anchova':14.00,'sardinha':6.00,'robalo':16.00,'cebola':0.90,
  'alho':4.00,'tomate':2.00,'tomate pelado':1.20,'cenoura':1.00,
  'batata':1.00,'batata-doce':1.50,'abobrinha':2.00,'berinjela':2.00,
  'pimentão':2.50,'cogumelo':6.00,'cogumelo porcini':40.00,'aspargo':6.00,
  'brócolis':2.50,'couve-flor':2.00,'espinafre':3.00,'rúcula':6.00,
  'alface':2.00,'salsão':1.50,'funcho':2.50,'alho-poró':2.50,
  'ervilha':3.00,'abóbora':1.50,'milho':2.00,'azeitona':6.00,
  'alcaparra':12.00,'pepino':1.80,'repolho':1.20,'beterraba':1.50,
  'manjericão':15.00,'salsinha':8.00,'alecrim':12.00,'tomilho':15.00,
  'sálvia':15.00,'orégano':12.00,'hortelã':12.00,'louro':18.00,
  'coentro':10.00,'cebolinha':8.00,'abacaxi':2.50,'limão':2.00,
  'laranja':1.50,'maçã':2.00,'banana':1.80,'morango':6.00,
  'uva':3.00,'pera':2.20,'pêssego':3.00,'melão':1.50,
  'melancia':1.00,'figo':5.00,'damasco':6.00,'cereja':8.00,
  'kiwi':3.00,'manga':4.00,'framboesa':12.00,'mirtilo':12.00,
  'tâmara':8.00,'sal':0.60,'pimenta do reino':15.00,'pimenta calabresa':18.00,
  'noz-moscada':30.00,'canela':20.00,'cúrcuma':8.00,'páprica':12.00,
  'curry':14.00,'cominho':14.00,'gengibre':4.00,'cravo':22.00,
  'erva-doce':10.00,'azeite':8.00,'azeite extra virgem':12.00,'óleo de girassol':2.00,
  'banha':4.00,'vinagre':2.00,'vinagre balsâmico':8.00,'vinagre de vinho':3.00,
  'pesto':8.00,'molho de tomate':2.00,'molho de tartufo':35.00,'mostarda':5.00,
  'maionese':4.00,'shoyu':6.00,'extrato de tomate':3.00,'grão de bico':2.00,
  'lentilha':2.50,'feijão':2.50,'ervilha seca':2.00,'açúcar':1.00,
  'açúcar de confeiteiro':2.00,'mel':8.00,'chocolate':10.00,'cacau':12.00,
  'chocolate amargo':12.00,'noz':12.00,'amêndoa':10.00,'pinoli':60.00,
  'avelã':12.00,'castanha':8.00,'gergelim':6.00,'pistache':20.00,
  'água':0.00,'vinho tinto':3.00,'vinho branco':3.00,'vinho marsala':7.00,
  'conhaque':15.00,
};
const dl = document.getElementById('ing-list');
function montarDatalist(){ dl.innerHTML = ''; Object.keys(PRECOS).forEach(n => { const o = document.createElement('option'); o.value = n; dl.appendChild(o); }); }
montarDatalist();

const TICKET_MEDIO = 8.5;   /* € médio por prato (dashboard) */
function br(n, casas=2){ return n.toLocaleString('it-IT', {minimumFractionDigits:casas, maximumFractionDigits:casas}); }
function eur(n){ return '€ ' + br(n, 2); }
function compact(n){
  if (n >= 1e6) return '€ ' + br(n/1e6,1) + 'M';
  if (n >= 1e3) return '€ ' + br(n/1e3,0) + 'k';
  return '€ ' + br(n,0);
}

document.getElementById('hoje-data').textContent =
  new Date().toLocaleDateString('pt-BR', { weekday:'long', day:'numeric', month:'long' });

/* ----- toasts (notificações que aparecem) ----- */
function toast(msg, ok){
  const wrap = document.getElementById('toasts');
  const t = document.createElement('div'); t.className = 'toast';
  t.innerHTML = '<span class="tk">'+(ok===false ? '!' : '✓')+'</span>' + msg;
  if (ok===false) t.querySelector('.tk').style.background = 'var(--neg)';
  wrap.appendChild(t);
  setTimeout(() => { t.style.transition='opacity .3s, transform .3s'; t.style.opacity='0'; t.style.transform='translateY(10px)'; setTimeout(()=>t.remove(), 300); }, 3200);
}
/* ----- dropdown de notificações ----- */
function toggleNotif(e){ e.stopPropagation(); document.getElementById('notif').classList.toggle('aberto'); }
document.addEventListener('click', () => document.getElementById('notif').classList.remove('aberto'));
/* ----- contagem animada dos números ----- */
function animateVal(el, target, fmt){
  if (matchMedia('(prefers-reduced-motion: reduce)').matches){ el.textContent = fmt(target); return; }
  const dur = 750, t0 = performance.now();
  function step(now){ const p = Math.min(1, (now - t0)/dur); el.textContent = fmt(Math.round(target * (1 - Math.pow(1-p, 3)))); if (p < 1) requestAnimationFrame(step); }
  requestAnimationFrame(step);
}

/* ===== navegação ===== */
const META = {
  dashboard:['Dashboard','Visão geral da operação de hoje'],
  receitas:['Receitas','Monte pratos e calcule o custo'],
  ingredientes:['Ingredientes','Cadastro e preços dos insumos'],
  vendas:['Vendas','Acompanhe o que mais e menos vende'],
  colaboradores:['Colaboradores','A equipe do restaurante'],
  pagamentos:['Pagamentos','Folha da equipe: salários e horas'],
  operacao:['Operação','Produção, compras e margem'],
  projecao:['Projeção','Crescimento e sazonalidade'],
  gestao:['Gestão','Tarefas e acompanhamento'],
};
let chartFeito = false;
function navegar(id){
  document.querySelectorAll('.pg').forEach(p => p.hidden = true);
  document.querySelectorAll('.nav-item').forEach(t => t.classList.remove('ativa'));
  const pgEl = document.getElementById('pg-' + id);
  pgEl.hidden = false;
  pgEl.classList.remove('anim'); void pgEl.offsetWidth; pgEl.classList.add('anim');
  document.querySelector('.nav-item[data-pg="' + id + '"]').classList.add('ativa');
  document.getElementById('pg-title').textContent = META[id][0];
  document.getElementById('pg-sub').textContent = META[id][1];
  if (id === 'dashboard' && !chartFeito) desenharDashboard();
  if (id === 'vendas') renderVendas();
  if (id === 'pagamentos') carregarPagamentos();
  window.scrollTo(0,0);
}

/* ===== RECEITAS ===== */
const linhasBody = document.getElementById('rec-linhas');
function precoDe(nome){ const k=(nome||'').trim().toLowerCase(); for(const key in PRECOS){ if(key.toLowerCase()===k) return PRECOS[key]; } return null; }

function addLinha(nome, qtd){
  const tr = document.createElement('tr');
  tr.innerHTML =
    '<td><div class="inp"><input class="ing-nome" list="ing-list" placeholder="ex.: guanciale" value="'+(nome||'')+'"></div></td>' +
    '<td><div class="inp"><input class="ing-qtd" type="number" min="0" step="10" value="'+(qtd||0)+'"></div></td>' +
    '<td class="ing-preco num">—</td><td class="ing-custo num">€ 0,00</td>' +
    '<td><button class="rm" title="remover" aria-label="remover">&times;</button></td>';
  tr.querySelector('.rm').addEventListener('click', () => { tr.remove(); recalcularReceita(); });
  tr.querySelectorAll('input').forEach(i => i.addEventListener('input', recalcularReceita));
  linhasBody.appendChild(tr);
  recalcularReceita();
}
function recalcularReceita(){
  let total = 0;
  linhasBody.querySelectorAll('tr').forEach(tr => {
    const nome = tr.querySelector('.ing-nome').value;
    const qtd = parseFloat(tr.querySelector('.ing-qtd').value) || 0;
    const preco = precoDe(nome);
    const custo = preco !== null ? (qtd/1000)*preco : 0;
    tr.querySelector('.ing-preco').textContent = preco !== null ? eur(preco) : '—';
    tr.querySelector('.ing-custo').textContent = eur(custo);
    total += custo;
  });
  const rende = Math.max(1, parseInt(document.getElementById('rec-rende').value,10)||1);
  document.getElementById('rec-custo-total').textContent = eur(total);
  document.getElementById('rec-custo-prato').textContent = eur(total/rende);
}
document.getElementById('rec-rende').addEventListener('input', recalcularReceita);

let receitasSalvas = [];
async function salvarReceita(){
  const nome = document.getElementById('rec-nome').value.trim() || 'Receita sem nome';
  const rende = Math.max(1, parseInt(document.getElementById('rec-rende').value,10)||1);
  const modo_preparo = document.getElementById('rec-preparo').value.trim();
  let total=0; const itens=[];
  linhasBody.querySelectorAll('tr').forEach(tr => {
    const n = tr.querySelector('.ing-nome').value.trim();
    const q = parseFloat(tr.querySelector('.ing-qtd').value)||0;
    if (!n||q<=0) return;
    const p = precoDe(n); total += p!==null ? (q/1000)*p : 0;
    itens.push({ ing:n, g:q });
  });
  if (!itens.length){ toast('Adicione ao menos um ingrediente.', false); return; }
  if (!sb){ toast('Configure o Supabase (js/config.js) para salvar.', false); return; }
  const { error } = await sb.from('receitas').insert({ nome, rende, itens, custo_por_prato: total/rende, modo_preparo, foto: fotoAtual });
  if (error){ console.error(error); toast('Erro ao salvar. Tente de novo.', false); return; }
  toast('Receita salva no banco');
  fecharCriarReceita();
  carregarReceitas();
}
function escapeHtml(s){ return (s||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

function renderSalvas(){
  document.getElementById('rec-contador').textContent = receitasSalvas.length;
  document.getElementById('rec-salvas').innerHTML = receitasSalvas.map(r => {
    const itensTxt = (r.itens||[]).map(x => escapeHtml(x.ing)+' ('+br(x.g,0)+' g)').join(', ');
    const foto = r.foto
      ? '<div class="rc-foto" style="background-image:url(\''+r.foto+'\')" onclick="trocarFoto('+r.id+')" title="Trocar foto"></div>'
      : '<div class="rc-foto rc-sem" onclick="trocarFoto('+r.id+')">+ adicionar foto</div>';
    const prep = r.modo_preparo ? '<div class="rc-prep"><b>Preparo:</b> '+escapeHtml(r.modo_preparo)+'</div>' : '';
    return '<div class="rc">'+foto+
      '<div class="rc-corpo">'+
        '<div class="rc-top"><b>'+escapeHtml(r.nome)+'</b><span class="mono rc-custo">'+eur(r.custo_por_prato)+'</span></div>'+
        '<div class="hint">rende '+r.rende+' prato(s) · '+eur(r.custo_por_prato)+' por prato</div>'+
        '<div class="hint" style="margin-top:6px"><b>Ingredientes:</b> '+itensTxt+'</div>'+
        prep+
        '<button class="btn ghost" style="margin-top:10px;padding:5px 12px" onclick="removerReceita('+r.id+')">remover</button>'+
      '</div></div>';
  }).join('') || '<p class="hint">Nenhuma receita ainda. Clique em <b>Criar receita</b> para começar.</p>';
}

/* ---- foto do prato (redimensiona antes de salvar, pra não pesar) ---- */
let fotoAtual = null;
function onFotoSelecionada(input){
  const file = input.files && input.files[0];
  if (!file) return;
  redimensionarImagem(file, function(dataUrl){
    fotoAtual = dataUrl;
    const prev = document.getElementById('rec-foto-preview');
    prev.style.backgroundImage = 'url(\''+dataUrl+'\')';
    prev.classList.add('tem');
  });
}
function redimensionarImagem(file, cb){
  const reader = new FileReader();
  reader.onload = e => {
    const img = new Image();
    img.onload = () => {
      const max = 700; let w = img.width, h = img.height;
      if (w > h && w > max){ h = Math.round(h*max/w); w = max; }
      else if (h > max){ w = Math.round(w*max/h); h = max; }
      const cv = document.createElement('canvas'); cv.width = w; cv.height = h;
      cv.getContext('2d').drawImage(img, 0, 0, w, h);
      cb(cv.toDataURL('image/jpeg', 0.72));
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

/* ---- abrir / fechar a tela de criar receita ---- */
function abrirCriarReceita(){
  document.getElementById('rec-nome').value = '';
  document.getElementById('rec-rende').value = 1;
  document.getElementById('rec-preparo').value = '';
  fotoAtual = null;
  const prev = document.getElementById('rec-foto-preview'); prev.style.backgroundImage = ''; prev.classList.remove('tem');
  const inp = document.getElementById('rec-foto-input'); if (inp) inp.value = '';
  linhasBody.innerHTML = ''; addLinha(); addLinha(); recalcularReceita();
  document.getElementById('modal-receita').classList.add('aberto');
}
function fecharCriarReceita(){ document.getElementById('modal-receita').classList.remove('aberto'); }
async function removerReceita(id){
  if (!sb) return;
  const { error } = await sb.from('receitas').delete().eq('id', id);
  if (error){ console.error(error); toast('Erro ao remover.', false); return; }
  toast('Receita removida');
  carregarReceitas();
}
renderSalvas();

/* ===== VENDAS (dados mockados, fixos) ===== */
const PRATOS = ['Ragu','Carbonara','Amatriciana','Cacio e pepe','Gricia','Pesto','Tartufo'];
const POP = { 'Ragu':1.0,'Carbonara':0.8,'Amatriciana':0.6,'Cacio e pepe':0.5,'Gricia':0.35,'Pesto':0.45,'Tartufo':0.2 };
const VENDAS = [];
(function(){
  const hoje = new Date();
  for (let d=44; d>=0; d--){
    const dia = new Date(hoje); dia.setDate(hoje.getDate()-d);
    const iso = dia.toISOString().slice(0,10);
    PRATOS.forEach((p,i) => {
      const s = d*13 + i*7; const ruido = Math.sin(s)*0.5+0.5;
      VENDAS.push({ data:iso, prato:p, qtd: Math.round((80 + POP[p]*220)*(0.7+0.6*ruido)) });
    });
  }
})();
/* ===== ANÁLISES (Roma · dados mockados, super filtrável) ===== */
const MESES = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
/* Sazonalidade de ROMA (turismo europeu): baixa no inverno, pico no
   verão (jul forte; ago mais fraco pelo Ferragosto), 2º pico no outono. */
const ROMA = [-0.35,-0.30,-0.05,0.15,0.30,0.38,0.42,0.28,0.36,0.20,-0.12,-0.05];
const mediaRoma = ROMA.reduce((a,b)=>a+b,0)/12;
const SAZ = ROMA.map(x => x - mediaRoma);
const BASE_CLIENTES = 18000;
const TICKET = 8.5;
const clientesBaseMes = SAZ.map(f => Math.round(BASE_CLIENTES * (1 + f)));
const somaPop = Object.values(POP).reduce((a,b)=>a+b,0);

/* "calor" de cada mês (-1 inverno … +1 verão) e preferência de cada
   prato (pratos fortes preferem o frio; leves preferem o calor).
   Isso faz o PRATO CAMPEÃO mudar com a estação. */
const WARM = [-0.8,-0.7,-0.3,0.1,0.5,0.8,0.9,0.85,0.5,0.1,-0.4,-0.7];
const BIAS = { 'Ragu':-0.6,'Carbonara':-0.1,'Amatriciana':-0.4,'Cacio e pepe':0.4,'Gricia':-0.3,'Pesto':0.7,'Tartufo':0.3 };
/* participação de cada prato em cada mês (normalizada) */
const shareMes = MESES.map((_,m) => {
  const raw = {}; let soma = 0;
  PRATOS.forEach(p => { const v = Math.max(0.02, (POP[p]/somaPop) * (1 + BIAS[p]*WARM[m])); raw[p]=v; soma+=v; });
  const o = {}; PRATOS.forEach(p => o[p] = raw[p]/soma);
  return o;
});

/* nacionalidades (com continente, para o filtro de região) */
const PAISES = [
  {nome:'Itália',share:0.22,cont:'Europa'},{nome:'EUA',share:0.16,cont:'América'},
  {nome:'Alemanha',share:0.11,cont:'Europa'},{nome:'França',share:0.09,cont:'Europa'},
  {nome:'Reino Unido',share:0.08,cont:'Europa'},{nome:'Espanha',share:0.07,cont:'Europa'},
  {nome:'Japão',share:0.05,cont:'Ásia'},{nome:'Brasil',share:0.04,cont:'América'},
  {nome:'Austrália',share:0.03,cont:'Oceania'},{nome:'Outros',share:0.15,cont:'Outros'},
];
const CONTINENTES = ['Europa','América','Ásia','Oceania','Outros'];
const ESTACOES = { inverno:[11,0,1], primavera:[2,3,4], verao:[5,6,7], outono:[8,9,10] };
const CORES_PIZZA = ['#2E6B52','#37805F','#D98A2B','#B8472C','#6E6A61','#8A5A12','#9BB89F'];

function euros(n){ return '€ ' + Math.round(n).toLocaleString('it-IT'); }
function itNum(n){ return Math.round(n).toLocaleString('it-IT'); }

/* ---- popular os filtros ---- */
function popularPaises(reg){
  const lista = (reg === 'todas') ? PAISES : PAISES.filter(p => p.cont === reg);
  document.getElementById('f-pais').innerHTML =
    '<option value="todas">Todas</option>' + lista.map(p => '<option value="'+p.nome+'">'+p.nome+'</option>').join('');
}
document.getElementById('f-regiao').innerHTML =
  '<option value="todas">Todas</option>' + CONTINENTES.map(c => '<option value="'+c+'">'+c+'</option>').join('');
document.getElementById('f-prato').innerHTML =
  '<option value="todos">Todos</option>' + PRATOS.map(p => '<option value="'+p+'">'+p+'</option>').join('');
document.getElementById('f-estacao').innerHTML =
  '<option value="ano">Ano todo</option><option value="inverno">Inverno</option><option value="primavera">Primavera</option><option value="verao">Verão</option><option value="outono">Outono</option>';
popularPaises('todas');

let pieChart, barChart;
function renderVendas(){
  const reg = document.getElementById('f-regiao').value;
  const paisSel = document.getElementById('f-pais').value;
  const pratoSel = document.getElementById('f-prato').value;
  const est = document.getElementById('f-estacao').value;

  /* fator geográfico (nacionalidade tem prioridade sobre região) */
  let geo = 1;
  if (paisSel !== 'todas'){ const p = PAISES.find(x => x.nome === paisSel); geo = p ? p.share : 1; }
  else if (reg !== 'todas'){ geo = PAISES.filter(p => p.cont === reg).reduce((s,p)=>s+p.share, 0); }

  const meses = (est === 'ano') ? [0,1,2,3,4,5,6,7,8,9,10,11] : ESTACOES[est];
  const clientesMes = clientesBaseMes.map(c => c * geo);
  const dishMes = MESES.map((_,m) => { const o = {}; PRATOS.forEach(p => o[p] = clientesMes[m] * shareMes[m][p]); return o; });

  const dishTotais = {}; PRATOS.forEach(p => dishTotais[p] = meses.reduce((s,m)=>s+dishMes[m][p], 0));
  const campeaoAno = PRATOS.slice().sort((a,b)=>dishTotais[b]-dishTotais[a])[0];
  const clientesAtivos = meses.reduce((s,m)=>s+clientesMes[m], 0);

  /* callout */
  if (pratoSel !== 'todos'){
    document.getElementById('an-clientes').textContent = itNum(dishTotais[pratoSel]);
    document.getElementById('an-receita').textContent  = euros(dishTotais[pratoSel]*TICKET);
    document.getElementById('an-top').textContent      = pratoSel;
  } else {
    document.getElementById('an-clientes').textContent = itNum(clientesAtivos);
    document.getElementById('an-receita').textContent  = euros(clientesAtivos*TICKET);
    document.getElementById('an-top').textContent      = campeaoAno;
  }

  /* pizza (destaca o prato filtrado com offset) */
  const dishCounts = PRATOS.map(p => Math.round(dishTotais[p]));
  const offsets = PRATOS.map(p => p === pratoSel ? 18 : 0);
  if (!pieChart){
    pieChart = new Chart(document.getElementById('pie-pratos'), {
      type:'doughnut',
      data:{ labels:PRATOS, datasets:[{ data:dishCounts, offset:offsets, backgroundColor:CORES_PIZZA, borderColor:'#fff', borderWidth:2 }] },
      options:{ responsive:true, maintainAspectRatio:false, cutout:'58%',
        plugins:{ legend:{ position:'right', labels:{ color:'#1D1B15', font:{family:'Plus Jakarta Sans', size:12}, usePointStyle:true, pointStyleWidth:10, padding:9 } },
          tooltip:{ callbacks:{ label:(c)=> c.label + ': ' + itNum(c.parsed) + ' pratos' } } } },
    });
  } else { pieChart.data.datasets[0].data = dishCounts; pieChart.data.datasets[0].offset = offsets; pieChart.update(); }

  /* origem dos clientes (respeita a região; marca a nacionalidade) */
  const baseAtivos = meses.reduce((s,m)=>s+clientesBaseMes[m], 0);
  const listaPaises = (reg === 'todas') ? PAISES : PAISES.filter(p => p.cont === reg);
  const rankP = listaPaises.map(p => ({ nome:p.nome, q:Math.round(baseAtivos*p.share) })).sort((a,b)=>b.q-a.q);
  const maxP = rankP[0] ? rankP[0].q : 1;
  document.getElementById('rank-paises').innerHTML = rankP.map(r =>
    '<div class="rank-row"><div><div class="rank-name">' + r.nome + (r.nome===paisSel ? ' ●' : '') +
    '</div><div class="rank-bar"><i style="width:'+(r.q/maxP*100)+'%"></i></div></div><div class="rank-val">'+itNum(r.q)+'</div></div>'
  ).join('');

  /* PRATO CAMPEÃO POR MÊS (a sazonalidade dos pratos) */
  const camp = MESES.map((_,m) => { const c = PRATOS.slice().sort((a,b)=>dishMes[m][b]-dishMes[m][a])[0]; return { m, c, q:dishMes[m][c] }; });
  const maxCamp = Math.max(...camp.map(x=>x.q), 1);
  let campHtml = '<table><thead><tr><th>Mês</th><th>Prato campeão</th><th class="num">Vendidos</th><th style="width:26%">Movimento</th></tr></thead><tbody>';
  camp.forEach(x => {
    const cor = CORES_PIZZA[PRATOS.indexOf(x.c)];
    const off = meses.includes(x.m) ? '' : ' style="opacity:.38"';
    campHtml += '<tr'+off+'><td>'+MESES[x.m]+'</td><td><span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:'+cor+';margin-right:8px;vertical-align:middle"></span>'+x.c+'</td>'+
      '<td class="num">'+itNum(x.q)+'</td><td><div class="rank-bar"><i style="width:'+(x.q/maxCamp*100)+'%;background:'+cor+'"></i></div></td></tr>';
  });
  document.getElementById('tab-campeoes').innerHTML = campHtml + '</tbody></table>';

  /* movimento por mês (barras) — dispensa fora da estação escolhida */
  const serieBar = (pratoSel !== 'todos') ? MESES.map((_,m)=>Math.round(dishMes[m][pratoSel])) : clientesMes.map(c=>Math.round(c));
  const coresBar = MESES.map((_,m) => !meses.includes(m) ? '#E7E3DA' : (est==='ano' ? (SAZ[m]>=0?'#2E6B52':'#CDC7BB') : '#2E6B52'));
  if (!barChart){
    barChart = new Chart(document.getElementById('bar-sazon'), {
      type:'bar',
      data:{ labels:MESES, datasets:[{ data:serieBar, backgroundColor:coresBar, borderRadius:6, maxBarThickness:36 }] },
      options:{ responsive:true, maintainAspectRatio:false,
        plugins:{ legend:{display:false}, tooltip:{ callbacks:{ label:(c)=> itNum(c.parsed.y) + (pratoSel!=='todos' ? ' pratos' : ' clientes') } } },
        scales:{ x:{ grid:{display:false}, ticks:{ color:'#9B968C', font:{family:'Plus Jakarta Sans', size:11} } },
          y:{ grid:{color:'#EEEBE3'}, ticks:{ color:'#9B968C', font:{family:'Plus Jakarta Sans', size:11}, callback:(v)=> (v>=1000?(v/1000)+'k':v) }, beginAtZero:true } } },
    });
  } else { barChart.data.datasets[0].data = serieBar; barChart.data.datasets[0].backgroundColor = coresBar; barChart.update(); }

  /* meses com maior faturamento (respeita prato e estação) */
  const linhas = meses.map(m => {
    const base = (pratoSel !== 'todos') ? dishMes[m][pratoSel] : clientesMes[m];
    return { m, cli:base, rec:base*TICKET };
  }).sort((a,b)=>b.rec-a.rec);
  const maxRec = linhas[0] ? linhas[0].rec : 1;
  document.getElementById('tab-meses').innerHTML = linhas.map((x,idx) =>
    '<tr><td class="num">'+(idx+1)+'</td><td>'+MESES[x.m]+'</td><td class="num">'+itNum(x.cli)+'</td><td class="num">'+euros(x.rec)+'</td>'+
    '<td><div class="rank-bar"><i style="width:'+(x.rec/maxRec*100)+'%"></i></div></td></tr>'
  ).join('');
}
document.getElementById('f-regiao').addEventListener('change', function(){ popularPaises(this.value); renderVendas(); });
document.getElementById('f-pais').addEventListener('change', renderVendas);
document.getElementById('f-prato').addEventListener('change', renderVendas);
document.getElementById('f-estacao').addEventListener('change', renderVendas);

/* ===== DASHBOARD ===== */
function porDia(){
  const mapa = {};
  VENDAS.forEach(v => { mapa[v.data] = (mapa[v.data]||0) + v.qtd; });
  const dias = Object.keys(mapa).sort();
  return dias.map(d => ({ data:d, qtd:mapa[d] }));
}
function desenharDashboard(){
  const serie = porDia();
  const ult14 = serie.slice(-14);
  const hoje = serie[serie.length-1].qtd;
  const ontem = serie[serie.length-2].qtd;
  const deltaP = ontem>0 ? ((hoje-ontem)/ontem*100) : 0;

  /* KPIs */
  animateVal(document.getElementById('k-fat'), Math.round(hoje*TICKET_MEDIO), compact);
  animateVal(document.getElementById('k-pratos'), hoje, function(v){ return br(v,0); });
  const setDelta = (id,val)=>{ const el=document.getElementById(id); el.textContent=(val>=0?'▲ +':'▼ ')+br(Math.abs(val),1)+'% vs ontem'; el.className='delta '+(val>=0?'up':'down'); };
  setDelta('k-fat-d', deltaP); setDelta('k-pratos-d', deltaP);

  /* ranking (período todo) */
  const tot={}; PRATOS.forEach(p=>tot[p]=0);
  VENDAS.forEach(v=>tot[v.prato]+=v.qtd);
  const rank = PRATOS.map(p=>({p,q:tot[p]})).sort((a,b)=>b.q-a.q);
  const maxR = rank[0].q;
  document.getElementById('k-top').textContent = rank[0].p;
  document.getElementById('k-top-d').textContent = br(rank[0].q,0)+' vendidos';
  document.getElementById('dash-rank').innerHTML = rank.map(r =>
    '<div class="rank-row"><div><div class="rank-name">'+r.p+'</div><div class="rank-bar"><i style="width:'+(r.q/maxR*100)+'%"></i></div></div><div class="rank-val">'+br(r.q,0)+'</div></div>'
  ).join('');

  /* gráfico */
  new Chart(document.getElementById('dash-chart'), {
    type:'line',
    data:{ labels: ult14.map(d => d.data.slice(8,10)+'/'+d.data.slice(5,7)),
      datasets:[{ label:'Pratos/dia', data: ult14.map(d=>d.qtd), borderColor:'#2E6B52',
        backgroundColor:'rgba(46,107,82,.10)', fill:true, tension:.35, borderWidth:2.5, pointRadius:0, pointHoverRadius:5 }] },
    options:{ responsive:true, maintainAspectRatio:false,
      plugins:{ legend:{display:false}, tooltip:{ callbacks:{ label:(c)=>br(c.parsed.y,0)+' pratos' } } },
      scales:{ x:{ grid:{display:false}, ticks:{ color:'#9B968C', font:{family:'Plus Jakarta Sans', size:11} } },
        y:{ grid:{ color:'#EEEBE3' }, ticks:{ color:'#9B968C', font:{family:'Plus Jakarta Sans', size:11} }, beginAtZero:true } } },
  });
  chartFeito = true;
}
if (window.Chart) desenharDashboard();
else window.addEventListener('load', desenharDashboard);

/* ===== relógio ao vivo (barra de status) ===== */
function tickRelogio(){
  const d = new Date(), p = n => String(n).padStart(2,'0');
  const el = document.getElementById('sb-clock');
  if (el) el.textContent = p(d.getHours())+':'+p(d.getMinutes())+':'+p(d.getSeconds());
}
setInterval(tickRelogio, 1000); tickRelogio();

/* ===== paleta de comandos (⌘K / Ctrl+K) ===== */
const CMDS = [
  { label:'Dashboard',              hint:'Ir para', run:()=>navegar('dashboard') },
  { label:'Receitas',               hint:'Ir para', run:()=>navegar('receitas') },
  { label:'Vendas & análises',      hint:'Ir para', run:()=>navegar('vendas') },
  { label:'Operação',               hint:'Ir para', run:()=>navegar('operacao') },
  { label:'Projeção',               hint:'Ir para', run:()=>navegar('projecao') },
  { label:'Gestão',                 hint:'Ir para', run:()=>navegar('gestao') },
  { label:'Nova receita',           hint:'Ação',    run:()=>navegar('receitas') },
  { label:'Ingredientes',           hint:'Ir para', run:()=>navegar('ingredientes') },
  { label:'Adicionar ingrediente',  hint:'Ação',    run:()=>navegar('ingredientes') },
  { label:'Colaboradores',          hint:'Ir para', run:()=>navegar('colaboradores') },
  { label:'Adicionar colaborador',  hint:'Ação',    run:()=>{ navegar('colaboradores'); abrirCadastroColab(); } },
  { label:'Pagamentos',             hint:'Ir para', run:()=>navegar('pagamentos') },
  { label:'Analisar vendas por país', hint:'Ação',  run:()=>navegar('vendas') },
];
let cmdSel = 0, cmdFiltrados = CMDS.slice();
function openCmd(){
  document.getElementById('cmdk').classList.add('aberto');
  const inp = document.getElementById('cmdk-input');
  inp.value = ''; cmdSel = 0; renderCmd('');
  setTimeout(() => inp.focus(), 30);
}
function closeCmd(){ document.getElementById('cmdk').classList.remove('aberto'); }
function renderCmd(q){
  q = q.toLowerCase();
  cmdFiltrados = CMDS.filter(c => c.label.toLowerCase().includes(q));
  if (cmdSel >= cmdFiltrados.length) cmdSel = 0;
  document.getElementById('cmdk-list').innerHTML = cmdFiltrados.length
    ? cmdFiltrados.map((c,i) => '<div class="cmdk-item'+(i===cmdSel?' sel':'')+'" data-i="'+i+'"><span>'+c.label+'</span><span class="cmdk-hint">'+c.hint+'</span></div>').join('')
    : '<div class="cmdk-empty">Nada encontrado</div>';
  document.querySelectorAll('.cmdk-item').forEach(el => {
    el.addEventListener('mouseenter', () => { cmdSel = +el.dataset.i; marcarCmd(); });
    el.addEventListener('click', () => execCmd(+el.dataset.i));
  });
}
function marcarCmd(){ document.querySelectorAll('.cmdk-item').forEach((el,i) => el.classList.toggle('sel', i===cmdSel)); }
function execCmd(i){ const c = cmdFiltrados[i]; if (c){ closeCmd(); c.run(); } }
document.getElementById('cmdk-input').addEventListener('input', function(){ renderCmd(this.value); });
document.getElementById('cmdk').addEventListener('click', function(e){ if (e.target === this) closeCmd(); });
document.addEventListener('keydown', function(e){
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k'){ e.preventDefault(); openCmd(); return; }
  if (!document.getElementById('cmdk').classList.contains('aberto')) return;
  if (e.key === 'Escape') closeCmd();
  else if (e.key === 'ArrowDown'){ e.preventDefault(); cmdSel = Math.min(cmdSel+1, cmdFiltrados.length-1); marcarCmd(); }
  else if (e.key === 'ArrowUp'){ e.preventDefault(); cmdSel = Math.max(cmdSel-1, 0); marcarCmd(); }
  else if (e.key === 'Enter'){ e.preventDefault(); execCmd(cmdSel); }
});

/* ================= SUPABASE — banco de dados + login ================= */
let sb = null;
try {
  if (typeof SUPABASE_URL !== 'undefined' && SUPABASE_URL.indexOf('COLE_') !== 0) {
    sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
} catch (e) { console.error('Supabase não configurado:', e); }

function mostrarErroLogin(msg, ok){
  const el = document.getElementById('lg-erro');
  if (!el) return;
  el.textContent = msg || '';
  el.style.color = ok ? 'var(--pos, #2E6B52)' : '';   /* verde no sucesso, vermelho (padrão) no erro */
}
function traduzErro(m){
  m = (m || '').toLowerCase();
  if (m.includes('invalid login'))      return 'Email ou senha incorretos.';
  if (m.includes('already registered') || m.includes('already been registered')) return 'Este email já tem conta. É só entrar.';
  if (m.includes('at least') || m.includes('password')) return 'A senha precisa ter ao menos 6 caracteres.';
  if (m.includes('email'))              return 'Confira o email digitado.';
  return 'Não deu certo. Confira os dados e tente de novo.';
}
/* valida os campos antes de chamar o Supabase; retorna null se inválido */
function lerCredenciais(){
  const email = document.getElementById('lg-email').value.trim();
  const senha = document.getElementById('lg-senha').value;
  if (!email || !senha){ mostrarErroLogin('Preencha email e senha.'); return null; }
  if (senha.length < 6){ mostrarErroLogin('A senha precisa ter ao menos 6 caracteres.'); return null; }
  return { email, senha };
}
/* trava os dois botões enquanto a requisição roda (evita clique duplo) */
function travarLogin(travar, textoEntrar){
  const bEntrar = document.getElementById('lg-btn-entrar');
  const bCriar  = document.getElementById('lg-btn-criar');
  [bEntrar, bCriar].forEach(b => { if (b) b.disabled = travar; });
  if (bEntrar) bEntrar.textContent = travar ? (textoEntrar || 'Aguarde…') : 'Entrar';
}

async function fazerLogin(){
  if (!sb){ mostrarErroLogin('Configure suas chaves em js/config.js.'); return; }
  mostrarErroLogin('');
  const cred = lerCredenciais(); if (!cred) return;
  travarLogin(true, 'Entrando…');
  const { error } = await sb.auth.signInWithPassword({ email: cred.email, password: cred.senha });
  travarLogin(false);
  if (error) mostrarErroLogin(traduzErro(error.message));
  /* sucesso: onAuthStateChange chama entrarApp() automaticamente */
}
async function criarConta(){
  if (!sb){ mostrarErroLogin('Configure suas chaves em js/config.js.'); return; }
  mostrarErroLogin('');
  const cred = lerCredenciais(); if (!cred) return;
  travarLogin(true, 'Criando…');
  const { data, error } = await sb.auth.signUp({ email: cred.email, password: cred.senha });
  travarLogin(false);
  if (error){ mostrarErroLogin(traduzErro(error.message)); return; }
  if (data && data.session){
    toast('Conta criada! Entrando…');                 /* auto-confirm ligado → já entra */
  } else {
    mostrarErroLogin('Conta criada! Confirme o link enviado ao seu email para entrar.', true);
  }
}
async function sair(){ if (sb) await sb.auth.signOut(); }

/* Enter em qualquer campo do login dispara "Entrar" */
['lg-email','lg-senha'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('keydown', e => { if (e.key === 'Enter'){ e.preventDefault(); fazerLogin(); } });
});

let usuarioAtual = null;   // id do usuário logado — evita recarregar tudo a cada evento de auth (refresh de token, foco na aba)
async function entrarApp(session){
  document.getElementById('login').style.display = 'none';
  const email = (session && session.user) ? session.user.email : '';
  const elEmail = document.getElementById('user-email'); if (elEmail) elEmail.textContent = email || 'Usuário';
  const elAv = document.getElementById('user-av'); if (elAv) elAv.textContent = ((email && email[0]) || 'U').toUpperCase();
  const uid = (session && session.user) ? session.user.id : null;
  if (uid && uid === usuarioAtual) return;   // já carregado para este usuário → não recarrega à toa
  usuarioAtual = uid;
  await carregarPrecos();
  await carregarReceitas();
  await carregarColaboradores();
  carregarPagamentos();
}
function sairApp(){ usuarioAtual = null; document.getElementById('login').style.display = 'flex'; }

async function carregarPrecos(){
  if (!sb) return;
  try {
    const { data, error } = await sb.from('ingredientes').select('nome, preco_kg');
    if (!error && data){ data.forEach(r => { PRECOS[r.nome] = Number(r.preco_kg); }); }
  } catch (e){ console.error(e); }
  atualizarListaIngredientes(); montarDatalist(); recalcularReceita(); renderIngredientes();
}

/* ---- gerenciar ingredientes (aba Ingredientes) ---- */
let listaIngredientes = [];
function atualizarListaIngredientes(){
  listaIngredientes = Object.keys(PRECOS).map(n => ({ nome:n, preco_kg:PRECOS[n] }))
    .sort((a,b) => a.nome.localeCompare(b.nome, 'pt'));
}
function renderIngredientes(){
  const cont = document.getElementById('ing-contador'); if (cont) cont.textContent = listaIngredientes.length;
  const alvo = document.getElementById('ing-lista'); if (!alvo) return;
  const busca = (document.getElementById('ing-busca')?.value || '').trim().toLowerCase();
  const filtrados = listaIngredientes.filter(x => x.nome.toLowerCase().includes(busca));
  alvo.innerHTML = filtrados.map(x =>
    '<tr data-nome="'+escapeHtml(x.nome)+'"><td>'+escapeHtml(x.nome)+'</td>'+
    '<td class="num"><div class="inp inp-preco"><span class="pre">€</span><input class="ing-preco-inp" type="number" min="0" step="0.1" value="'+x.preco_kg.toFixed(2)+'"></div></td>'+
    '<td style="width:44px"><button class="rm ing-rm" title="remover" aria-label="remover">&times;</button></td></tr>'
  ).join('') || '<tr><td colspan="3" class="hint">Nenhum ingrediente encontrado.</td></tr>';
  alvo.querySelectorAll('tr[data-nome]').forEach(tr => {
    const nome = tr.getAttribute('data-nome');
    const inp = tr.querySelector('.ing-preco-inp'); if (inp) inp.addEventListener('change', () => atualizarPreco(nome, inp.value));
    const rm = tr.querySelector('.ing-rm'); if (rm) rm.addEventListener('click', () => removerIngrediente(nome));
  });
}
async function adicionarIngrediente(){
  const nome = document.getElementById('ing-novo-nome').value.trim().toLowerCase();
  const preco = parseFloat(document.getElementById('ing-novo-preco').value);
  if (!nome){ toast('Digite o nome do ingrediente.', false); return; }
  if (isNaN(preco) || preco < 0){ toast('Digite um preço válido.', false); return; }
  if (!sb){ toast('Configure o Supabase para salvar.', false); return; }
  const { error } = await sb.from('ingredientes').upsert({ nome, preco_kg: preco }, { onConflict: 'nome' });
  if (error){ console.error(error); toast('Erro ao salvar.', false); return; }
  PRECOS[nome] = preco;
  document.getElementById('ing-novo-nome').value = '';
  document.getElementById('ing-novo-preco').value = '';
  atualizarListaIngredientes(); montarDatalist(); renderIngredientes();
  toast('Ingrediente salvo');
}
async function atualizarPreco(nome, valor){
  const preco = parseFloat(valor);
  if (isNaN(preco) || preco < 0 || !sb) return;
  const { error } = await sb.from('ingredientes').upsert({ nome, preco_kg: preco }, { onConflict: 'nome' });
  if (error){ console.error(error); toast('Erro ao atualizar.', false); return; }
  PRECOS[nome] = preco;
  const it = listaIngredientes.find(x => x.nome === nome); if (it) it.preco_kg = preco;
  recalcularReceita();
  toast('Preço atualizado');
}
async function removerIngrediente(nome){
  if (!sb) return;
  const { error } = await sb.from('ingredientes').delete().eq('nome', nome);
  if (error){ console.error(error); toast('Erro ao remover.', false); return; }
  delete PRECOS[nome];
  atualizarListaIngredientes(); montarDatalist(); renderIngredientes();
  toast('Ingrediente removido');
}
atualizarListaIngredientes(); renderIngredientes();
const buscaIng = document.getElementById('ing-busca'); if (buscaIng) buscaIng.addEventListener('input', renderIngredientes);
async function carregarReceitas(){
  if (!sb) return;
  try {
    const { data, error } = await sb.from('receitas').select('*').order('criado_em', { ascending: false });
    if (!error && data){ receitasSalvas = data; renderSalvas(); }
  } catch (e){ console.error(e); }
}

/* início: verifica sessão e reage a login/logout */
if (sb){
  sb.auth.getSession().then(({ data }) => { if (data && data.session) entrarApp(data.session); });
  sb.auth.onAuthStateChange((_event, session) => { if (session) entrarApp(session); else sairApp(); });
} else {
  mostrarErroLogin('Configure suas chaves em js/config.js para ativar o login.');
}

/* ---- trocar a foto de uma receita já salva (clicando no cartão) ---- */
let fotoTrocaId = null;
function trocarFoto(id){ fotoTrocaId = id; const inp = document.getElementById('rec-foto-troca'); inp.value = ''; inp.click(); }
const inpTroca = document.getElementById('rec-foto-troca');
if (inpTroca) inpTroca.addEventListener('change', function(){
  const file = this.files && this.files[0];
  if (!file || !fotoTrocaId) return;
  redimensionarImagem(file, async function(dataUrl){
    if (!sb) return;
    const { error } = await sb.from('receitas').update({ foto: dataUrl }).eq('id', fotoTrocaId);
    if (error){ console.error(error); toast('Erro ao salvar a foto.', false); return; }
    toast('Foto atualizada'); carregarReceitas();
  });
});

/* ================= COLABORADORES ================= */
let listaColab = [];
let colabFoto = null;   // foto do colaborador (base64)
let colabDocs = [];     // documentos/comprovantes (base64[])

async function carregarColaboradores(){
  if (!sb) return;
  try {
    const { data, error } = await sb.from('colaboradores').select('*').order('nome');
    if (!error && data){ listaColab = data; renderColaboradores(); }
  } catch (e){ console.error(e); }
}
function renderColaboradores(){
  const cont = document.getElementById('colab-contador'); if (cont) cont.textContent = listaColab.length;
  const alvo = document.getElementById('colab-lista'); if (!alvo) return;
  alvo.innerHTML = listaColab.map(c => {
    const foto = c.foto
      ? '<div class="colab-foto" style="background-image:url(\''+c.foto+'\')"></div>'
      : '<div class="colab-foto colab-sem">'+escapeHtml((c.nome||'?')[0].toUpperCase())+'</div>';
    const ndocs = (c.documentos||[]).length;
    return '<div class="colab-card">'+foto+
      '<div class="colab-info">'+
        '<div class="colab-nome">'+escapeHtml(c.nome)+'</div>'+
        '<div class="colab-cargo">'+escapeHtml(c.cargo||'—')+'</div>'+
        '<div class="colab-linha">📞 '+escapeHtml(c.telefone||'—')+'</div>'+
        '<div class="colab-linha">✉️ '+escapeHtml(c.email||'—')+'</div>'+
        '<div class="colab-linha">📍 '+escapeHtml(c.endereco||'—')+'</div>'+
        (ndocs ? '<div class="colab-linha hint">📎 '+ndocs+' documento(s) anexado(s)</div>' : '')+
        '<button class="btn ghost" style="margin-top:10px;padding:5px 12px" onclick="removerColaborador('+c.id+')">remover</button>'+
      '</div></div>';
  }).join('') || '<p class="hint">Nenhum colaborador ainda. Clique em <b>Adicionar colaborador</b>.</p>';
}
function abrirCadastroColab(){
  ['colab-nome','colab-cargo','colab-doc','colab-endereco','colab-tel','colab-email'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  colabFoto = null; colabDocs = [];
  const prev = document.getElementById('colab-foto-preview'); if (prev){ prev.style.backgroundImage = ''; prev.classList.remove('tem'); }
  renderDocsPreview();
  document.getElementById('modal-colab').classList.add('aberto');
}
function fecharCadastroColab(){ document.getElementById('modal-colab').classList.remove('aberto'); }
function onColabFoto(input){
  const file = input.files && input.files[0]; if (!file) return;
  redimensionarImagem(file, dataUrl => {
    colabFoto = dataUrl;
    const p = document.getElementById('colab-foto-preview'); p.style.backgroundImage = 'url(\''+dataUrl+'\')'; p.classList.add('tem');
  });
}
function onColabDocs(input){
  Array.from(input.files || []).forEach(f => redimensionarImagem(f, dataUrl => { colabDocs.push(dataUrl); renderDocsPreview(); }));
  input.value = '';
}
function renderDocsPreview(){
  const alvo = document.getElementById('colab-docs-preview'); if (!alvo) return;
  alvo.innerHTML = colabDocs.map((d,i) => '<div class="doc-thumb" style="background-image:url(\''+d+'\')"><button type="button" onclick="removerDoc('+i+')" title="remover">&times;</button></div>').join('');
}
function removerDoc(i){ colabDocs.splice(i,1); renderDocsPreview(); }
async function salvarColaborador(){
  const nome = document.getElementById('colab-nome').value.trim();
  if (!nome){ toast('Digite o nome do colaborador.', false); return; }
  if (!sb){ toast('Configure o Supabase para salvar.', false); return; }
  const reg = {
    nome,
    cargo:     document.getElementById('colab-cargo').value.trim(),
    documento: document.getElementById('colab-doc').value.trim(),
    endereco:  document.getElementById('colab-endereco').value.trim(),
    telefone:  document.getElementById('colab-tel').value.trim(),
    email:     document.getElementById('colab-email').value.trim(),
    foto:      colabFoto,
    documentos: colabDocs,
  };
  const { error } = await sb.from('colaboradores').insert(reg);
  if (error){ console.error(error); toast('Erro ao salvar.', false); return; }
  toast('Colaborador cadastrado');
  fecharCadastroColab();
  carregarColaboradores();
}
async function removerColaborador(id){
  if (!sb) return;
  const { error } = await sb.from('colaboradores').delete().eq('id', id);
  if (error){ console.error(error); toast('Erro ao remover.', false); return; }
  toast('Colaborador removido');
  carregarColaboradores();
}
renderColaboradores();

/* ================= PAGAMENTOS DA EQUIPE ================= */
let mapaPagamentos = {};   // colaborador_id -> registro salvo
let contratos = {};        // colaborador_id -> { base64, nome } (anexo novo)

function num(v){ const n = parseFloat(String(v).replace(',', '.')); return isNaN(n) ? 0 : n; }

async function carregarPagamentos(){
  if (!sb) return;
  try {
    const { data, error } = await sb.from('pagamentos').select('*');
    mapaPagamentos = {};
    if (!error && data) data.forEach(p => { mapaPagamentos[p.colaborador_id] = p; });
  } catch (e){ console.error(e); }
  renderPagamentos();
}
function renderPagamentos(){
  const alvo = document.getElementById('pay-lista'); if (!alvo) return;
  if (!listaColab.length){
    alvo.innerHTML = '<p class="hint">Cadastre a equipe na aba <b>Colaboradores</b> primeiro.</p>';
    const tg = document.getElementById('pay-total-geral'); if (tg) tg.textContent = eur(0);
    return;
  }
  alvo.innerHTML = listaColab.map(c => {
    const p = mapaPagamentos[c.id] || {};
    const temContrato = !!p.contrato;
    return '<div class="pay-card" data-id="'+c.id+'">'+
      '<div class="pay-head">'+
        '<div class="pay-quem">'+escapeHtml(c.nome)+' <span class="hint">· '+escapeHtml(c.cargo||'')+'</span></div>'+
        '<div class="pay-contrato">'+
          '<input type="file" accept="application/pdf" class="pay-pdf-input" hidden>'+
          '<button class="btn ghost pay-pdf-btn" type="button">📄 '+(temContrato?'Trocar contrato':'Anexar contrato (PDF)')+'</button>'+
          (temContrato?'<button class="pay-baixar" type="button" onclick="baixarContrato('+c.id+')">baixar</button>':'')+
          '<span class="pay-pdf-nome hint">'+(temContrato?escapeHtml(p.contrato_nome||'contrato.pdf'):'')+'</span>'+
        '</div>'+
      '</div>'+
      '<div class="pay-grid">'+
        '<div class="pay-campo"><label>Desconto (%)</label><div class="inp"><input class="pay-desc" type="number" min="0" max="100" step="0.5" value="'+(p.desconto_pct??0)+'"></div></div>'+
        '<div class="pay-campo"><label>Salário líquido</label><div class="inp"><span class="pre">€</span><input class="pay-liq" type="number" min="0" step="1" value="'+(p.salario_liquido??0)+'"></div></div>'+
        '<div class="pay-campo"><label>Salário bruto</label><div class="inp"><span class="pre">€</span><input class="pay-bru" type="number" min="0" step="1" value="'+(p.salario_bruto??0)+'"></div></div>'+
        '<div class="pay-campo"><label>Horas/dia</label><div class="inp"><input class="pay-horas" type="number" min="0" step="0.5" value="'+(p.horas_dia??8)+'"></div></div>'+
      '</div>'+
      '<div class="pay-resumo">'+
        '<div>Horas extras: <b class="pay-extra-h">0</b> h → <b class="pay-extra-v">€ 0</b> <span class="hint">(€ 15/h acima de 6h)</span></div>'+
        '<div class="pay-total">Total a pagar: <b class="pay-total-v">€ 0</b></div>'+
      '</div>'+
      '<div style="text-align:right;margin-top:12px"><button class="btn pay-salvar" type="button">Salvar</button></div>'+
    '</div>';
  }).join('');

  alvo.querySelectorAll('.pay-card').forEach(card => {
    const cid = +card.getAttribute('data-id');
    card.querySelector('.pay-liq').addEventListener('input', () => calcPay(card, 'liq'));
    card.querySelector('.pay-bru').addEventListener('input', () => calcPay(card, 'bru'));
    card.querySelector('.pay-desc').addEventListener('input', () => calcPay(card, 'desc'));
    card.querySelector('.pay-horas').addEventListener('input', () => calcPay(card, 'horas'));
    const pdf = card.querySelector('.pay-pdf-input');
    card.querySelector('.pay-pdf-btn').addEventListener('click', () => pdf.click());
    pdf.addEventListener('change', () => onContratoPdf(cid, pdf, card));
    card.querySelector('.pay-salvar').addEventListener('click', () => salvarPagamento(cid, card));
    calcPay(card, 'init');
  });
}
function calcPay(card, origem){
  const d = num(card.querySelector('.pay-desc').value) / 100;
  const fator = 1 - d;
  const liqEl = card.querySelector('.pay-liq'), bruEl = card.querySelector('.pay-bru');
  let liq = num(liqEl.value), bru = num(bruEl.value);
  if (origem === 'bru'){ liq = bru * fator; liqEl.value = liq.toFixed(2); }
  else if (origem === 'liq' || origem === 'desc'){ bru = fator > 0 ? liq / fator : 0; bruEl.value = bru.toFixed(2); }
  else if (!bru && liq && fator > 0){ bru = liq / fator; bruEl.value = bru.toFixed(2); }
  const horas = num(card.querySelector('.pay-horas').value);
  const extraH = Math.max(0, horas - 6);
  card.querySelector('.pay-extra-h').textContent = extraH.toLocaleString('it-IT', { maximumFractionDigits: 1 });
  card.querySelector('.pay-extra-v').textContent = eur(extraH * 15);
  card.querySelector('.pay-total-v').textContent = eur(liq + extraH * 15);
  atualizarTotalGeral();
}
function atualizarTotalGeral(){
  let total = 0;
  document.querySelectorAll('.pay-card').forEach(card => {
    const liq = num(card.querySelector('.pay-liq').value);
    const horas = num(card.querySelector('.pay-horas').value);
    total += liq + Math.max(0, horas - 6) * 15;
  });
  const el = document.getElementById('pay-total-geral'); if (el) el.textContent = eur(total);
}
function onContratoPdf(cid, input, card){
  const file = input.files && input.files[0]; if (!file) return;
  if (file.size > 4 * 1024 * 1024){ toast('PDF muito grande (máx 4 MB).', false); input.value = ''; return; }
  const reader = new FileReader();
  reader.onload = e => {
    contratos[cid] = { base64: e.target.result, nome: file.name };
    card.querySelector('.pay-pdf-nome').textContent = file.name;
    card.querySelector('.pay-pdf-btn').textContent = '📄 Trocar contrato';
    toast('Contrato anexado (clique em Salvar para gravar)');
  };
  reader.readAsDataURL(file);
}
function baixarContrato(cid){
  const p = mapaPagamentos[cid]; if (!p || !p.contrato) return;
  const a = document.createElement('a'); a.href = p.contrato; a.download = p.contrato_nome || 'contrato.pdf';
  document.body.appendChild(a); a.click(); a.remove();
}
async function salvarPagamento(cid, card){
  if (!sb){ toast('Configure o Supabase para salvar.', false); return; }
  const reg = {
    colaborador_id:  cid,
    desconto_pct:    num(card.querySelector('.pay-desc').value),
    salario_liquido: num(card.querySelector('.pay-liq').value),
    salario_bruto:   num(card.querySelector('.pay-bru').value),
    horas_dia:       num(card.querySelector('.pay-horas').value),
    atualizado_em:   new Date().toISOString(),
  };
  if (contratos[cid]){ reg.contrato = contratos[cid].base64; reg.contrato_nome = contratos[cid].nome; }
  const { error } = await sb.from('pagamentos').upsert(reg, { onConflict: 'colaborador_id' });
  if (error){ console.error(error); toast('Erro ao salvar.', false); return; }
  toast('Pagamento salvo');
  carregarPagamentos();
}
