/* ===== dados base ===== */
const PRECOS = {
  'ovo':2.50,'sal':0.60,'farinha comum':0.90,'farinha de sêmola':1.30,'água':0.00,
  'coxão mole':9.50,'paleta suína':5.50,'vitelo':14.00,'guanciale':12.00,
  'parmesão':12.00,'pecorino':13.00,'tomate pelado':1.20,'cebola':0.90,
  'salsão':1.50,'alho':4.00,'vinho tinto':3.00,'pimenta do reino':15.00,
  'pesto':8.00,'molho de tartufo':35.00,
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
  vendas:['Vendas','Acompanhe o que mais e menos vende'],
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
  recalcularEscala();
}
function setEscala(n, botao){
  document.getElementById('rec-escala').value = n;
  if (botao){ botao.parentElement.querySelectorAll('button').forEach(b => b.classList.remove('on')); botao.classList.add('on'); }
  recalcularEscala();
}
function recalcularEscala(){
  const rende = Math.max(1, parseInt(document.getElementById('rec-rende').value,10)||1);
  const alvo  = Math.max(1, parseInt(document.getElementById('rec-escala').value,10)||1);
  const fator = alvo/rende;
  let html='', totalCusto=0, tem=false;
  linhasBody.querySelectorAll('tr').forEach(tr => {
    const nome = tr.querySelector('.ing-nome').value.trim();
    const qtd = parseFloat(tr.querySelector('.ing-qtd').value)||0;
    if (!nome || qtd<=0) return;
    tem = true;
    const preco = precoDe(nome);
    const q = qtd*fator;
    totalCusto += preco!==null ? (q/1000)*preco : 0;
    const mostra = q>=1000 ? (br(q/1000,2)+' kg') : (br(q,0)+' g');
    html += '<div style="display:flex;justify-content:space-between;padding:9px 0;border-bottom:1px solid var(--border)"><span>'+nome+'</span><span class="mono" style="font-weight:500">'+mostra+'</span></div>';
  });
  const saida = document.getElementById('rec-escala-saida');
  if (!tem){ saida.innerHTML = '<p class="hint">Adicione ingredientes acima para ver a escala.</p>'; return; }
  saida.innerHTML = '<p class="hint" style="margin:0 0 8px">Para <b>'+br(alvo,0)+' pratos</b> você precisa de:</p>'+html+
    '<div class="callout" style="margin-top:14px"><div><div class="lbl">Custo total ('+br(alvo,0)+' pratos)</div><div class="v">'+eur(totalCusto)+'</div></div>'+
    '<div><div class="lbl">Custo por prato</div><div class="v">'+eur(totalCusto/alvo)+'</div></div></div>';
}
document.getElementById('rec-rende').addEventListener('input', recalcularReceita);
document.getElementById('rec-escala').addEventListener('input', recalcularEscala);

let receitasSalvas = [];
async function salvarReceita(){
  const nome = document.getElementById('rec-nome').value.trim() || 'Receita sem nome';
  const rende = Math.max(1, parseInt(document.getElementById('rec-rende').value,10)||1);
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
  const { error } = await sb.from('receitas').insert({ nome, rende, itens, custo_por_prato: total/rende });
  if (error){ console.error(error); toast('Erro ao salvar. Tente de novo.', false); return; }
  toast('Receita salva no banco');
  carregarReceitas();
}
function renderSalvas(){
  document.getElementById('rec-contador').textContent = receitasSalvas.length;
  document.getElementById('rec-salvas').innerHTML = receitasSalvas.map(r => {
    const itensTxt = (r.itens||[]).map(x => x.ing+' ('+br(x.g,0)+' g)').join(' · ');
    return '<div class="saved"><div><b>'+r.nome+'</b> <span class="hint">· rende '+r.rende+' prato(s)</span>'+
      '<div class="hint" style="margin-top:4px">'+itensTxt+'</div></div>'+
      '<div style="text-align:right;white-space:nowrap"><div class="mono" style="font-weight:600;font-size:16px">'+eur(r.custo_por_prato)+'</div>'+
      '<div class="hint">por prato</div><button class="btn ghost" style="margin-top:6px;padding:5px 11px" onclick="removerReceita('+r.id+')">remover</button></div></div>';
  }).join('') || '<p class="hint">Nenhuma receita salva ainda.</p>';
}
async function removerReceita(id){
  if (!sb) return;
  const { error } = await sb.from('receitas').delete().eq('id', id);
  if (error){ console.error(error); toast('Erro ao remover.', false); return; }
  toast('Receita removida');
  carregarReceitas();
}
addLinha('coxão mole',300); addLinha('tomate pelado',400); addLinha('cebola',100); renderSalvas();

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

function mostrarErroLogin(msg){ const el = document.getElementById('lg-erro'); if (el) el.textContent = msg || ''; }
function traduzErro(m){
  m = (m || '').toLowerCase();
  if (m.includes('invalid login'))      return 'Email ou senha incorretos.';
  if (m.includes('already registered')) return 'Este email já tem conta. É só entrar.';
  if (m.includes('password'))           return 'A senha precisa ter ao menos 6 caracteres.';
  if (m.includes('email'))              return 'Confira o email digitado.';
  return 'Não deu certo. Confira os dados e tente de novo.';
}

async function fazerLogin(){
  if (!sb){ mostrarErroLogin('Configure suas chaves em js/config.js.'); return; }
  mostrarErroLogin('');
  const email = document.getElementById('lg-email').value.trim();
  const senha = document.getElementById('lg-senha').value;
  const { error } = await sb.auth.signInWithPassword({ email, password: senha });
  if (error) mostrarErroLogin(traduzErro(error.message));
}
async function criarConta(){
  if (!sb){ mostrarErroLogin('Configure suas chaves em js/config.js.'); return; }
  mostrarErroLogin('');
  const email = document.getElementById('lg-email').value.trim();
  const senha = document.getElementById('lg-senha').value;
  const { error } = await sb.auth.signUp({ email, password: senha });
  if (error) mostrarErroLogin(traduzErro(error.message));
  else toast('Conta criada! Entrando…');
}
async function sair(){ if (sb) await sb.auth.signOut(); }

async function entrarApp(session){
  document.getElementById('login').style.display = 'none';
  const email = (session && session.user) ? session.user.email : '';
  const elEmail = document.getElementById('user-email'); if (elEmail) elEmail.textContent = email || 'Usuário';
  const elAv = document.getElementById('user-av'); if (elAv) elAv.textContent = (email[0] || 'U').toUpperCase();
  await carregarPrecos();
  await carregarReceitas();
}
function sairApp(){ document.getElementById('login').style.display = 'flex'; }

async function carregarPrecos(){
  if (!sb) return;
  try {
    const { data, error } = await sb.from('ingredientes').select('nome, preco_kg');
    if (!error && data){ data.forEach(r => { PRECOS[r.nome] = Number(r.preco_kg); }); montarDatalist(); recalcularReceita(); }
  } catch (e){ console.error(e); }
}
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
