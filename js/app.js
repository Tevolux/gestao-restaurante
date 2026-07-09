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
/* mostra quantidade em kg (o banco guarda em gramas por compatibilidade) */
function kgTxt(g){ return (Number(g)/1000).toLocaleString('it-IT', { maximumFractionDigits:3 }); }
function compact(n){
  if (n >= 1e6) return '€ ' + br(n/1e6,1) + 'M';
  if (n >= 1e3) return '€ ' + br(n/1e3,0) + 'k';
  return '€ ' + br(n,0);
}

/* cores dos gráficos conforme o tema (claro/escuro) */
function temaEscuro(){ return document.documentElement.dataset.theme === 'dark'; }
function cEixo(){ return temaEscuro() ? '#8F887D' : '#9B968C'; }
function cGrade(){ return temaEscuro() ? 'rgba(255,255,255,.07)' : '#EEEBE3'; }
function cRotulo(){ return temaEscuro() ? '#E8E5DE' : '#1D1B15'; }
function cBordaFatia(){ return temaEscuro() ? '#211E18' : '#fff'; }

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
  menu:['Menu','Todas as áreas do sistema em um só lugar'],
  modulos:['Módulos','Operação, projeção e gestão'],
  dashboard:['Dashboard','Visão geral da operação de hoje'],
  receitas:['Receitas','Monte pratos e calcule o custo'],
  ingredientes:['Ingredientes','Cadastro e preços dos insumos'],
  compras:['Compras','Reposição de estoque'],
  vendas:['Vendas','Acompanhe o que mais e menos vende'],
  colaboradores:['Colaboradores','A equipe do restaurante'],
  pagamentos:['Pagamentos','Folha da equipe: salários e horas'],
  operacao:['Operação','Produção, compras e margem'],
  projecao:['Projeção','Crescimento e sazonalidade'],
  gestao:['Gestão','Tarefas e acompanhamento'],
};
let chartFeito = false;
/* quais seções pertencem a cada entrada da barra lateral (para destacar o "pai") */
const SECOES_MENU = ['dashboard','receitas','ingredientes','compras','vendas','colaboradores','pagamentos'];
const SECOES_MODULOS = ['operacao','projecao','gestao'];
function marcarNav(id){
  document.querySelectorAll('.nav-item').forEach(t => t.classList.remove('ativa'));
  let pai = null;
  if (id === 'menu' || SECOES_MENU.includes(id)) pai = 'menu';
  else if (id === 'modulos' || SECOES_MODULOS.includes(id)) pai = 'modulos';
  if (pai){ const b = document.querySelector('.nav-item[data-pg="' + pai + '"]'); if (b) b.classList.add('ativa'); }
}
function navegar(id){
  document.querySelectorAll('.pg').forEach(p => p.hidden = true);
  const pgEl = document.getElementById('pg-' + id);
  pgEl.hidden = false;
  pgEl.classList.remove('anim'); void pgEl.offsetWidth; pgEl.classList.add('anim');
  marcarNav(id);
  document.getElementById('pg-title').textContent = META[id][0];
  document.getElementById('pg-sub').textContent = META[id][1];
  if (id === 'dashboard' && !chartFeito) desenharDashboard();
  if (id === 'vendas') renderVendas();
  if (id === 'pagamentos') carregarPagamentos();
  if (id === 'gestao') carregarTarefas();
  if (id === 'compras') renderCompras();
  if (id === 'operacao') renderOperacao();
  if (id === 'projecao') calcularProjecao();
  window.scrollTo(0,0);
}

/* ===== RECEITAS ===== */
const linhasBody = document.getElementById('rec-linhas');
function precoDe(nome){ const k=(nome||'').trim().toLowerCase(); for(const key in PRECOS){ if(key.toLowerCase()===k) return PRECOS[key]; } return null; }

function addLinha(nome, qtd){
  const tr = document.createElement('tr');
  tr.innerHTML =
    '<td><div class="inp"><input class="ing-nome" list="ing-list" placeholder="ex.: guanciale" value="'+(nome||'')+'"></div></td>' +
    '<td><div class="inp"><input class="ing-qtd" type="number" min="0" step="0.001" value="'+(qtd||0)+'"></div></td>' +
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
    const custo = preco !== null ? qtd*preco : 0;
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
let recEditId = null;   // id da receita sendo editada (null = nova)
async function salvarReceita(){
  const nome = document.getElementById('rec-nome').value.trim() || 'Receita sem nome';
  const rende = Math.max(1, parseInt(document.getElementById('rec-rende').value,10)||1);
  const modo_preparo = document.getElementById('rec-preparo').value.trim();
  let total=0; const itens=[];
  linhasBody.querySelectorAll('tr').forEach(tr => {
    const n = tr.querySelector('.ing-nome').value.trim();
    const q = parseFloat(tr.querySelector('.ing-qtd').value)||0;
    if (!n||q<=0) return;
    const p = precoDe(n); total += p!==null ? q*p : 0;
    itens.push({ ing:n, g: Math.round(q*1000) });
  });
  if (!itens.length){ toast('Adicione ao menos um ingrediente.', false); return; }
  if (!sb){ toast('Configure o Supabase (js/config.js) para salvar.', false); return; }
  const reg = { nome, rende, itens, custo_por_prato: total/rende, modo_preparo, foto: fotoAtual };
  const resp = recEditId
    ? await sb.from('receitas').update(reg).eq('id', recEditId)
    : await sb.from('receitas').insert(reg);
  if (resp.error){ console.error(resp.error); toast('Erro ao salvar. Tente de novo.', false); return; }
  toast(recEditId ? 'Receita atualizada' : 'Receita salva no banco');
  fecharCriarReceita();
  carregarReceitas();
}
function escapeHtml(s){ return (s||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
/* quebra o modo de preparo em passos (um por linha; se vier tudo numa linha, separa por frase)
   e remove qualquer numeração que o usuário já tenha digitado — a lista <ol> numera do 1. */
function stepsPreparo(txt){
  txt = (txt || '').trim(); if (!txt) return [];
  let linhas = txt.split(/\r?\n+/).map(s => s.trim()).filter(Boolean);
  if (linhas.length === 1) linhas = linhas[0].split(/(?<=[.!?])\s+(?=[A-Za-zÀ-Ú0-9])/).map(s => s.trim()).filter(Boolean);
  return linhas.map(s => s.replace(/^\s*\d+[.)\-–]\s*/, '').trim()).filter(Boolean);
}

function renderSalvas(){
  document.getElementById('rec-contador').textContent = receitasSalvas.length;
  document.getElementById('rec-salvas').innerHTML = receitasSalvas.map(r => {
    const itensLista = (r.itens||[]).map(x => '<li>'+escapeHtml(x.ing)+'<span>'+kgTxt(x.g)+' kg</span></li>').join('');
    const itensBloco = itensLista ? '<div class="rc-ings-tit">Ingredientes</div><ul class="rc-ings">'+itensLista+'</ul>' : '';
    const foto = r.foto
      ? '<div class="rc-foto" style="background-image:url(\''+r.foto+'\')" onclick="trocarFoto('+r.id+')" title="Trocar foto"></div>'
      : '<div class="rc-foto rc-sem" onclick="trocarFoto('+r.id+')">+ adicionar foto</div>';
    const passos = stepsPreparo(r.modo_preparo);
    const prep = passos.length ? '<div class="rc-ings-tit">Modo de preparo</div><ol class="rc-passos">'+passos.map(s => '<li>'+escapeHtml(s)+'</li>').join('')+'</ol>' : '';
    return '<div class="rc">'+foto+
      '<div class="rc-corpo">'+
        '<div class="rc-top"><b>'+escapeHtml(r.nome)+'</b><span class="mono rc-custo">'+eur(r.custo_por_prato)+'</span></div>'+
        '<div class="hint">rende '+r.rende+' prato(s) · '+eur(r.custo_por_prato)+' por prato</div>'+
        itensBloco+
        prep+
        '<div style="display:flex;gap:8px;margin-top:10px">'+
          '<button class="btn ghost" style="padding:5px 12px" onclick="editarReceita('+r.id+')">editar</button>'+
          '<button class="btn ghost" style="padding:5px 12px" onclick="removerReceita('+r.id+')">remover</button>'+
        '</div>'+
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
  recEditId = null;
  const _t = document.getElementById('rec-modal-titulo'); if (_t) _t.textContent = 'Criar receita';
  const _b = document.getElementById('rec-modal-btn'); if (_b) _b.textContent = 'Salvar receita';
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
function editarReceita(id){
  const r = receitasSalvas.find(x => x.id === id); if (!r) return;
  recEditId = id;
  document.getElementById('rec-nome').value = r.nome || '';
  document.getElementById('rec-rende').value = r.rende || 1;
  document.getElementById('rec-preparo').value = r.modo_preparo || '';
  fotoAtual = r.foto || null;
  const prev = document.getElementById('rec-foto-preview');
  if (fotoAtual){ prev.style.backgroundImage = "url('" + fotoAtual + "')"; prev.classList.add('tem'); }
  else { prev.style.backgroundImage = ''; prev.classList.remove('tem'); }
  const inp = document.getElementById('rec-foto-input'); if (inp) inp.value = '';
  linhasBody.innerHTML = '';
  const itens = r.itens || [];
  if (itens.length) itens.forEach(x => addLinha(x.ing, Number(x.g)/1000));   // grama → kg no editor
  else { addLinha(); addLinha(); }
  recalcularReceita();
  const t = document.getElementById('rec-modal-titulo'); if (t) t.textContent = 'Editar receita';
  const b = document.getElementById('rec-modal-btn'); if (b) b.textContent = 'Salvar alterações';
  document.getElementById('modal-receita').classList.add('aberto');
}
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

let pieChart, barChart, dashChart = null;
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
      data:{ labels:PRATOS, datasets:[{ data:dishCounts, offset:offsets, backgroundColor:CORES_PIZZA, borderColor:cBordaFatia(), borderWidth:2 }] },
      options:{ responsive:true, maintainAspectRatio:false, cutout:'58%',
        plugins:{ legend:{ position:'right', labels:{ color:cRotulo(), font:{family:'Plus Jakarta Sans', size:12}, usePointStyle:true, pointStyleWidth:10, padding:9 } },
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
        scales:{ x:{ grid:{display:false}, ticks:{ color:cEixo(), font:{family:'Plus Jakarta Sans', size:11} } },
          y:{ grid:{color:cGrade()}, ticks:{ color:cEixo(), font:{family:'Plus Jakarta Sans', size:11}, callback:(v)=> (v>=1000?(v/1000)+'k':v) }, beginAtZero:true } } },
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
  dashChart = new Chart(document.getElementById('dash-chart'), {
    type:'line',
    data:{ labels: ult14.map(d => d.data.slice(8,10)+'/'+d.data.slice(5,7)),
      datasets:[{ label:'Pratos/dia', data: ult14.map(d=>d.qtd), borderColor:'#2E6B52',
        backgroundColor:'rgba(46,107,82,.10)', fill:true, tension:.35, borderWidth:2.5, pointRadius:0, pointHoverRadius:5 }] },
    options:{ responsive:true, maintainAspectRatio:false,
      plugins:{ legend:{display:false}, tooltip:{ callbacks:{ label:(c)=>br(c.parsed.y,0)+' pratos' } } },
      scales:{ x:{ grid:{display:false}, ticks:{ color:cEixo(), font:{family:'Plus Jakarta Sans', size:11} } },
        y:{ grid:{ color:cGrade() }, ticks:{ color:cEixo(), font:{family:'Plus Jakarta Sans', size:11} }, beginAtZero:true } } },
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
  { label:'Compras',                hint:'Ir para', run:()=>navegar('compras') },
  { label:'Operação',               hint:'Ir para', run:()=>navegar('operacao') },
  { label:'Projeção',               hint:'Ir para', run:()=>navegar('projecao') },
  { label:'Colaboradores',          hint:'Ir para', run:()=>navegar('colaboradores') },
  { label:'Adicionar colaborador',  hint:'Ação',    run:()=>{ navegar('colaboradores'); abrirCadastroColab(); } },
  { label:'Pagamentos',             hint:'Ir para', run:()=>navegar('pagamentos') },
  { label:'Analisar vendas por país', hint:'Ação',  run:()=>navegar('vendas') },
  { label:'Menu',                     hint:'Ir para', run:()=>navegar('menu') },
  { label:'Módulos',                  hint:'Ir para', run:()=>navegar('modulos') },
  { label:'Configurações da conta',   hint:'Conta',   run:()=>abrirSettings() },
  { label:'Mudar tema (claro/escuro)',hint:'Ação',    run:()=>aplicarTema(temaEscuro() ? 'light' : 'dark') },
  { label:'Sair da conta',            hint:'Ação',    run:()=>sair() },
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
  if (typeof MOCK_MODE !== 'undefined' && MOCK_MODE) {
    sb = criarMockSupabase();   // modo demo: dados de exemplo em memória, sem Supabase e sem login
  } else if (typeof SUPABASE_URL !== 'undefined' && SUPABASE_URL.indexOf('COLE_') !== 0) {
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
async function sair(){ fecharSettings(); if (sb) await sb.auth.signOut(); }

/* Enter em qualquer campo do login dispara "Entrar" */
['lg-email','lg-senha'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('keydown', e => { if (e.key === 'Enter'){ e.preventDefault(); fazerLogin(); } });
});

let usuarioAtual = null;   // id do usuário logado — evita recarregar tudo a cada evento de auth (refresh de token, foco na aba)
let usuarioMeta = {}, emailAtual = '', perfilFoto = null;
async function entrarApp(session){
  document.getElementById('login').style.display = 'none';
  const email = (session && session.user) ? session.user.email : '';
  emailAtual = email;
  usuarioMeta = (session && session.user && session.user.user_metadata) ? session.user.user_metadata : {};
  const elEmail = document.getElementById('user-email'); if (elEmail) elEmail.textContent = (usuarioMeta.nome || email || 'Usuário');
  aplicarAvatar();
  const uid = (session && session.user) ? session.user.id : null;
  if (uid && uid === usuarioAtual) return;   // já carregado para este usuário → não recarrega à toa
  usuarioAtual = uid;
  await carregarPrecos();
  await carregarReceitas();
  await carregarColaboradores();
  carregarPagamentos();
  carregarTarefas();
}
function sairApp(){ usuarioAtual = null; document.getElementById('login').style.display = 'flex'; }

const ESTOQUE = {};   // nome -> { atual, minimo } (valores em kg)
async function carregarPrecos(){
  if (!sb) return;
  try {
    let { data, error } = await sb.from('ingredientes').select('nome, preco_kg, estoque_atual, estoque_minimo');
    if (error){ ({ data, error } = await sb.from('ingredientes').select('nome, preco_kg')); }  // fallback: banco sem colunas de estoque
    if (!error && data){ data.forEach(r => {
      PRECOS[r.nome] = Number(r.preco_kg);
      if (r.estoque_atual !== undefined) ESTOQUE[r.nome] = { atual: Number(r.estoque_atual)||0, minimo: Number(r.estoque_minimo)||0 };
    }); }
  } catch (e){ console.error(e); }
  atualizarListaIngredientes(); montarDatalist(); recalcularReceita(); renderIngredientes(); renderEstoqueBaixo(); atualizarNotificacoes(); renderCompras();
}

/* ---- gerenciar ingredientes (aba Ingredientes) ---- */
let listaIngredientes = [];
function atualizarListaIngredientes(){
  listaIngredientes = Object.keys(PRECOS).map(n => ({
    nome:n, preco_kg:PRECOS[n],
    estoque_atual: (ESTOQUE[n] ? ESTOQUE[n].atual : 0),
    estoque_minimo: (ESTOQUE[n] ? ESTOQUE[n].minimo : 0)
  })).sort((a,b) => a.nome.localeCompare(b.nome, 'pt'));
}
function renderIngredientes(){
  const cont = document.getElementById('ing-contador'); if (cont) cont.textContent = listaIngredientes.length;
  const alvo = document.getElementById('ing-lista'); if (!alvo) return;
  const busca = (document.getElementById('ing-busca')?.value || '').trim().toLowerCase();
  const filtrados = listaIngredientes.filter(x => x.nome.toLowerCase().includes(busca));
  alvo.innerHTML = filtrados.map(x => {
    const baixo = x.estoque_minimo > 0 && x.estoque_atual < x.estoque_minimo;
    return '<tr data-nome="'+escapeHtml(x.nome)+'"'+(baixo?' class="ing-baixo"':'')+'>'+
      '<td>'+escapeHtml(x.nome)+(baixo?' <span class="badge-baixo">baixo</span>':'')+'</td>'+
      '<td class="num"><div class="inp inp-preco"><span class="pre">€</span><input class="ing-preco-inp" type="number" min="0" step="0.1" value="'+x.preco_kg.toFixed(2)+'"></div></td>'+
      '<td class="num"><div class="inp inp-mini"><input class="ing-atual-inp" type="number" min="0" step="0.5" value="'+x.estoque_atual+'"></div></td>'+
      '<td class="num"><div class="inp inp-mini"><input class="ing-min-inp" type="number" min="0" step="0.5" value="'+x.estoque_minimo+'"></div></td>'+
      '<td style="width:44px"><button class="rm ing-rm" title="remover" aria-label="remover">&times;</button></td></tr>';
  }).join('') || '<tr><td colspan="5" class="hint">Nenhum ingrediente encontrado.</td></tr>';
  alvo.querySelectorAll('tr[data-nome]').forEach(tr => {
    const nome = tr.getAttribute('data-nome');
    const inp = tr.querySelector('.ing-preco-inp'); if (inp) inp.addEventListener('change', () => atualizarPreco(nome, inp.value));
    const ia = tr.querySelector('.ing-atual-inp'); if (ia) ia.addEventListener('change', () => atualizarEstoque(nome, 'atual', ia.value));
    const im = tr.querySelector('.ing-min-inp'); if (im) im.addEventListener('change', () => atualizarEstoque(nome, 'minimo', im.value));
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
  delete PRECOS[nome]; delete ESTOQUE[nome];
  atualizarListaIngredientes(); montarDatalist(); renderIngredientes(); renderEstoqueBaixo(); atualizarNotificacoes();
  toast('Ingrediente removido');
}
/* ---- estoque (valores em kg) ---- */
function numKg(n){ return Number(n).toLocaleString('it-IT', { maximumFractionDigits:1 }); }
async function atualizarEstoque(nome, campo, valor){
  const v = parseFloat(valor); if (isNaN(v) || v < 0 || !sb) return;
  const col = (campo === 'atual') ? 'estoque_atual' : 'estoque_minimo';
  const patch = {}; patch[col] = v;
  const { error } = await sb.from('ingredientes').update(patch).eq('nome', nome);
  if (error){ console.error(error); toast('Erro ao atualizar estoque.', false); return; }
  if (!ESTOQUE[nome]) ESTOQUE[nome] = { atual:0, minimo:0 };
  ESTOQUE[nome][campo] = v;
  const it = listaIngredientes.find(x => x.nome === nome);
  if (it){ if (campo === 'atual') it.estoque_atual = v; else it.estoque_minimo = v; }
  renderIngredientes(); renderEstoqueBaixo(); atualizarNotificacoes();
  toast('Estoque atualizado');
}
function estoqueBaixos(){ return listaIngredientes.filter(x => x.estoque_minimo > 0 && x.estoque_atual < x.estoque_minimo); }
function renderEstoqueBaixo(){
  const card = document.getElementById('card-estoque-baixo');
  const alvo = document.getElementById('estoque-baixo-lista');
  if (!card || !alvo) return;
  const baixos = estoqueBaixos();
  if (!baixos.length){ card.style.display = 'none'; return; }
  card.style.display = '';
  alvo.innerHTML = baixos.map(x =>
    '<div class="eb-row"><span class="eb-nome">'+escapeHtml(x.nome)+'</span>'+
    '<span class="eb-val">'+numKg(x.estoque_atual)+' kg · mín '+numKg(x.estoque_minimo)+' kg</span></div>'
  ).join('');
}
function atualizarNotificacoes(){
  const baixos = estoqueBaixos();
  const badge = document.getElementById('notif-badge');
  if (badge){ badge.textContent = baixos.length; badge.style.display = baixos.length ? '' : 'none'; }
  const lista = document.getElementById('notif-lista'); if (!lista) return;
  lista.innerHTML = baixos.length
    ? baixos.map(x => '<div class="n" onclick="dispensarNotif(this, event)" title="clique para dispensar"><span class="nd" style="background:var(--neg)"></span><div><div class="nt">Estoque baixo: '+escapeHtml(x.nome)+'</div><div class="ns">'+numKg(x.estoque_atual)+' kg · mínimo '+numKg(x.estoque_minimo)+' kg</div></div></div>').join('')
    : '<p class="hint" style="padding:10px">Tudo em dia. Estoque acima do mínimo. ✓</p>';
}
/* dispensa a notificação clicada; ela reaparece no próximo carregamento se o estoque seguir baixo */
function dispensarNotif(el, e){
  if (e) e.stopPropagation();
  el.remove();
  const rest = document.querySelectorAll('#notif-lista .n').length;
  const badge = document.getElementById('notif-badge');
  if (badge){ if (rest > 0){ badge.textContent = rest; badge.style.display = ''; } else { badge.style.display = 'none'; } }
  if (rest === 0){ document.getElementById('notif-lista').innerHTML = '<p class="hint" style="padding:10px">Tudo em dia. Estoque acima do mínimo. ✓</p>'; }
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
let colabEditId = null; // id do colaborador sendo editado (null = novo cadastro)

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
        '<div style="display:flex;gap:8px;margin-top:10px">'+
          '<button class="btn ghost" style="padding:5px 12px" onclick="editarColaborador('+c.id+')">editar</button>'+
          '<button class="btn ghost" style="padding:5px 12px" onclick="removerColaborador('+c.id+')">remover</button>'+
        '</div>'+
      '</div></div>';
  }).join('') || '<p class="hint">Nenhum colaborador ainda. Clique em <b>Adicionar colaborador</b>.</p>';
}
function abrirCadastroColab(){
  ['colab-nome','colab-cargo','colab-doc','colab-endereco','colab-tel','colab-email'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  colabFoto = null; colabDocs = []; colabEditId = null;
  const t = document.getElementById('colab-modal-titulo'); if (t) t.textContent = 'Adicionar colaborador';
  const btn = document.getElementById('colab-modal-btn'); if (btn) btn.textContent = 'Salvar colaborador';
  const prev = document.getElementById('colab-foto-preview'); if (prev){ prev.style.backgroundImage = ''; prev.classList.remove('tem'); }
  renderDocsPreview();
  document.getElementById('modal-colab').classList.add('aberto');
}
function fecharCadastroColab(){ document.getElementById('modal-colab').classList.remove('aberto'); }
function editarColaborador(id){
  const c = listaColab.find(x => x.id === id); if (!c) return;
  colabEditId = id;
  const set = (elId, v) => { const el = document.getElementById(elId); if (el) el.value = v || ''; };
  set('colab-nome', c.nome); set('colab-cargo', c.cargo); set('colab-doc', c.documento);
  set('colab-endereco', c.endereco); set('colab-tel', c.telefone); set('colab-email', c.email);
  colabFoto = c.foto || null;
  colabDocs = Array.isArray(c.documentos) ? c.documentos.slice() : [];
  const prev = document.getElementById('colab-foto-preview');
  if (prev){
    if (colabFoto){ prev.style.backgroundImage = "url('" + colabFoto + "')"; prev.classList.add('tem'); }
    else { prev.style.backgroundImage = ''; prev.classList.remove('tem'); }
  }
  renderDocsPreview();
  const t = document.getElementById('colab-modal-titulo'); if (t) t.textContent = 'Editar colaborador';
  const btn = document.getElementById('colab-modal-btn'); if (btn) btn.textContent = 'Salvar alterações';
  document.getElementById('modal-colab').classList.add('aberto');
}
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
  const resp = colabEditId
    ? await sb.from('colaboradores').update(reg).eq('id', colabEditId)
    : await sb.from('colaboradores').insert(reg);
  if (resp.error){ console.error(resp.error); toast('Erro ao salvar.', false); return; }
  toast(colabEditId ? 'Colaborador atualizado' : 'Colaborador cadastrado');
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

/* ================= GESTÃO — quadro de tarefas (kanban) ================= */
let listaTarefas = [];
const KB_COLS = [['afazer','A fazer'],['fazendo','Fazendo'],['feito','Feito']];
async function carregarTarefas(){
  if (!sb) return;
  try {
    const { data, error } = await sb.from('tarefas').select('*').order('criado_em');
    if (!error && data){ listaTarefas = data; renderTarefas(); }
  } catch (e){ console.error(e); }
}
function renderTarefas(){
  KB_COLS.forEach(([col], i) => {
    const alvo = document.getElementById('kb-' + col); if (!alvo) return;
    const itens = listaTarefas.filter(t => t.coluna === col);
    const cont = document.getElementById('kb-c-' + col); if (cont) cont.textContent = itens.length;
    alvo.innerHTML = itens.map(t => {
      const esq = i > 0 ? '<button class="kb-mv" title="voltar" onclick="moverTarefa('+t.id+',\''+KB_COLS[i-1][0]+'\')">&larr;</button>' : '';
      const dir = i < KB_COLS.length-1 ? '<button class="kb-mv" title="avançar" onclick="moverTarefa('+t.id+',\''+KB_COLS[i+1][0]+'\')">&rarr;</button>' : '';
      return '<div class="kb-card"><div class="kb-txt">'+escapeHtml(t.titulo)+'</div>'+
        '<div class="kb-acts">'+esq+dir+'<button class="kb-rm" title="remover" onclick="removerTarefa('+t.id+')">&times;</button></div></div>';
    }).join('') || '<div class="kb-vazio">—</div>';
  });
}
async function adicionarTarefa(){
  const el = document.getElementById('tarefa-nova'); const titulo = (el.value || '').trim();
  if (!titulo){ toast('Digite a tarefa.', false); return; }
  if (!sb){ toast('Configure o Supabase para salvar.', false); return; }
  const { error } = await sb.from('tarefas').insert({ titulo, coluna:'afazer' });
  if (error){ console.error(error); toast('Erro ao salvar.', false); return; }
  el.value = ''; carregarTarefas(); toast('Tarefa adicionada');
}
async function moverTarefa(id, col){
  if (!sb) return;
  const { error } = await sb.from('tarefas').update({ coluna: col }).eq('id', id);
  if (error){ console.error(error); toast('Erro ao mover.', false); return; }
  carregarTarefas();
}
async function removerTarefa(id){
  if (!sb) return;
  const { error } = await sb.from('tarefas').delete().eq('id', id);
  if (error){ console.error(error); toast('Erro ao remover.', false); return; }
  carregarTarefas();
}
(function(){ const el = document.getElementById('tarefa-nova'); if (el) el.addEventListener('keydown', e => { if (e.key === 'Enter'){ e.preventDefault(); adicionarTarefa(); } }); })();

/* ================= COMPRAS (reposição de estoque) ================= */
function renderCompras(){
  const alvo = document.getElementById('compras-lista'); if (!alvo) return;
  const itens = listaIngredientes.map(x => {
    const falta = (x.estoque_minimo||0) - (x.estoque_atual||0);
    return { nome:x.nome, preco:x.preco_kg, atual:x.estoque_atual, minimo:x.estoque_minimo, comprar: falta > 0 ? falta : 0 };
  }).filter(i => i.comprar > 0).sort((a,b) => a.nome.localeCompare(b.nome, 'pt'));
  const cont = document.getElementById('compras-contador'); if (cont) cont.textContent = itens.length;
  if (!itens.length){
    alvo.innerHTML = '<p class="hint">✓ Estoque em dia — nenhum item abaixo do mínimo.</p>';
    const t = document.getElementById('compras-total'); if (t) t.textContent = eur(0);
    return;
  }
  alvo.innerHTML = '<div class="tbl-scroll"><table><thead><tr><th>Ingrediente</th><th class="num">Estoque</th><th class="num">Mínimo</th><th class="num" style="width:150px">Comprar (kg)</th><th class="num" style="width:110px">Custo</th></tr></thead><tbody>' +
    itens.map(i => '<tr data-nome="'+escapeHtml(i.nome)+'" data-preco="'+i.preco+'"><td>'+escapeHtml(i.nome)+'</td>'+
      '<td class="num">'+numKg(i.atual)+' kg</td><td class="num">'+numKg(i.minimo)+' kg</td>'+
      '<td class="num"><div class="inp inp-mini"><input class="cp-qtd" type="number" min="0" step="0.5" value="'+i.comprar+'"></div></td>'+
      '<td class="num cp-custo">'+eur(i.comprar*i.preco)+'</td></tr>').join('') +
    '</tbody></table></div>';
  alvo.querySelectorAll('tr[data-nome]').forEach(tr => {
    const preco = num(tr.getAttribute('data-preco'));
    const q = tr.querySelector('.cp-qtd');
    q.addEventListener('input', () => { tr.querySelector('.cp-custo').textContent = eur(num(q.value)*preco); totalCompras(); });
  });
  totalCompras();
}
function totalCompras(){
  let t = 0;
  document.querySelectorAll('#compras-lista tr[data-nome]').forEach(tr => { t += num(tr.querySelector('.cp-qtd').value) * num(tr.getAttribute('data-preco')); });
  const el = document.getElementById('compras-total'); if (el) el.textContent = eur(t);
}

/* ================= OPERAÇÃO (produção do dia) ================= */
function renderOperacao(){
  const alvo = document.getElementById('op-receitas'); if (!alvo) return;
  if (!receitasSalvas.length){ alvo.innerHTML = '<tr><td colspan="3" class="hint">Cadastre receitas na aba Receitas primeiro.</td></tr>'; calcularOperacao(); return; }
  alvo.innerHTML = receitasSalvas.map(r =>
    '<tr data-id="'+r.id+'"><td>'+escapeHtml(r.nome)+'</td>'+
    '<td><div class="inp"><input class="op-pratos" type="number" min="0" step="1" value="0"></div></td>'+
    '<td class="num op-custo">€ 0,00</td></tr>').join('');
  alvo.querySelectorAll('.op-pratos').forEach(inp => inp.addEventListener('input', calcularOperacao));
  calcularOperacao();
}
function calcularOperacao(){
  const tk = document.getElementById('op-ticket'); if (!tk) return;
  const ticket = num(tk.value);
  const folga = 1 + num(document.getElementById('op-folga').value) / 100;
  let custoTotal = 0, pratosTotal = 0; const compras = {};
  document.querySelectorAll('#op-receitas tr[data-id]').forEach(tr => {
    const id = +tr.getAttribute('data-id');
    const r = receitasSalvas.find(x => x.id === id); if (!r) return;
    const pratos = num(tr.querySelector('.op-pratos').value);
    const custo = (r.custo_por_prato || 0) * pratos;
    tr.querySelector('.op-custo').textContent = eur(custo);
    custoTotal += custo; pratosTotal += pratos;
    const fator = r.rende > 0 ? pratos / r.rende : 0;
    (r.itens || []).forEach(it => { compras[it.ing] = (compras[it.ing] || 0) + it.g * fator; });
  });
  const receita = pratosTotal * ticket;
  const lucro = receita - custoTotal;
  const margem = receita > 0 ? lucro / receita * 100 : 0;
  document.getElementById('op-receita').textContent = eur(receita);
  document.getElementById('op-custo-total').textContent = eur(custoTotal);
  document.getElementById('op-lucro').textContent = eur(lucro);
  document.getElementById('op-margem').textContent = br(margem, 1) + '%';
  const nomes = Object.keys(compras).filter(n => compras[n] > 0).sort((a,b) => a.localeCompare(b, 'pt'));
  document.getElementById('op-compras').innerHTML = nomes.map(n => {
    const g = compras[n] * folga;   /* g = gramas somadas das receitas */
    const mostra = g >= 1000 ? br(g/1000, 2) + ' kg' : br(g, 0) + ' g';
    return '<div class="op-item"><span>'+escapeHtml(n)+'</span><span class="mono">'+mostra+'</span></div>';
  }).join('') || '<p class="hint">Informe os pratos para ver a lista de compras.</p>';
}
['op-ticket','op-folga'].forEach(id => { const el = document.getElementById(id); if (el) el.addEventListener('input', calcularOperacao); });

/* ================= PROJEÇÃO (4 anos) ================= */
let projChart;
function calcularProjecao(){
  const base = num(document.getElementById('pj-base').value);
  const cresc = num(document.getElementById('pj-cresc').value) / 100;
  const inten = num(document.getElementById('pj-inten').value) / 100;
  const margem = num(document.getElementById('pj-margem').value) / 100;
  const receitas = [], lucros = [], labels = [];
  for (let m = 0; m < 48; m++){
    const cf = Math.pow(1 + cresc, m/12);
    const saz = 1 + inten * SAZ[m % 12];
    const r = base * cf * saz;
    receitas.push(r); lucros.push(r * margem);
    labels.push(MESES[m % 12] + '/' + (Math.floor(m/12) + 1));
  }
  const totalF = receitas.reduce((a,b)=>a+b, 0), totalL = lucros.reduce((a,b)=>a+b, 0);
  const ano4 = receitas.slice(36,48).reduce((a,b)=>a+b, 0);
  document.getElementById('pj-k-fat').textContent = compact(totalF);
  document.getElementById('pj-k-lucro').textContent = compact(totalL);
  document.getElementById('pj-k-ano4').textContent = compact(ano4);
  document.getElementById('pj-k-pico').textContent = MESES[SAZ.indexOf(Math.max(...SAZ))];
  if (!projChart){
    projChart = new Chart(document.getElementById('pj-chart'), {
      type:'line',
      data:{ labels, datasets:[
        { label:'Receita', data:receitas, borderColor:'#2E6B52', backgroundColor:'rgba(46,107,82,.10)', fill:true, tension:.35, borderWidth:2.5, pointRadius:0, pointHoverRadius:5 },
        { label:'Lucro', data:lucros, borderColor:'#D98A2B', backgroundColor:'rgba(217,138,43,.10)', fill:true, tension:.35, borderWidth:2.5, pointRadius:0, pointHoverRadius:5 },
      ]},
      options:{ responsive:true, maintainAspectRatio:false, interaction:{ mode:'index', intersect:false },
        plugins:{ legend:{ labels:{ color:cRotulo(), font:{family:'Plus Jakarta Sans', size:13}, usePointStyle:true, pointStyleWidth:10 } },
          tooltip:{ callbacks:{ label:(c)=> c.dataset.label + ': ' + euros(c.parsed.y) } } },
        scales:{ x:{ grid:{display:false}, ticks:{ color:cEixo(), font:{family:'Plus Jakarta Sans', size:11}, autoSkip:false, callback:(v,i)=> (i%12===0)?('Ano '+(i/12+1)):'' } },
          y:{ grid:{color:cGrade()}, ticks:{ color:cEixo(), font:{family:'Plus Jakarta Sans', size:11}, callback:(v)=> compact(v) }, beginAtZero:true } } },
    });
  } else {
    projChart.data.labels = labels;
    projChart.data.datasets[0].data = receitas;
    projChart.data.datasets[1].data = lucros;
    projChart.update();
  }
}
['pj-base','pj-cresc','pj-inten','pj-margem'].forEach(id => { const el = document.getElementById(id); if (el) el.addEventListener('input', calcularProjecao); });

/* ================= TEMA (claro / escuro) ================= */
function marcarTema(t){
  const c = document.getElementById('tema-claro'), e = document.getElementById('tema-escuro');
  if (c) c.classList.toggle('on', t !== 'dark');
  if (e) e.classList.toggle('on', t === 'dark');
}
function aplicarTema(t){
  document.documentElement.dataset.theme = t;
  try { localStorage.setItem('tema', t); } catch (e) {}
  marcarTema(t);
  redesenharGraficos();                 // atualiza as cores dos gráficos na hora
}
function redesenharGraficos(){
  if (dashChart){ dashChart.destroy(); dashChart = null; chartFeito = false; desenharDashboard(); }
  if (pieChart || barChart){
    if (pieChart){ pieChart.destroy(); pieChart = null; }
    if (barChart){ barChart.destroy(); barChart = null; }
    renderVendas();
  }
  if (projChart){ projChart.destroy(); projChart = null; const pg = document.getElementById('pg-projecao'); if (pg && !pg.hidden) calcularProjecao(); }
}
/* aplica o tema salvo já na carga (o <head> também faz; aqui sincroniza o botão) */
(function(){ let t = 'light'; try { t = localStorage.getItem('tema') || 'light'; } catch (e) {} document.documentElement.dataset.theme = t; marcarTema(t); })();

/* ================= CONFIGURAÇÕES DA CONTA ================= */
function aplicarAvatar(){
  const foto = usuarioMeta && usuarioMeta.foto;
  const inicial = ((emailAtual && emailAtual[0]) || 'U').toUpperCase();
  ['user-av','topbar-av'].forEach(id => {
    const el = document.getElementById(id); if (!el) return;
    if (foto){ el.style.backgroundImage = "url('" + foto + "')"; el.textContent = ''; }
    else { el.style.backgroundImage = ''; el.textContent = inicial; }
  });
}
function abrirSettings(){ carregarSettings(); document.getElementById('modal-settings').classList.add('aberto'); }
function fecharSettings(){ document.getElementById('modal-settings').classList.remove('aberto'); }
function carregarSettings(){
  marcarTema(temaEscuro() ? 'dark' : 'light');
  const m = usuarioMeta || {};
  const g = (id, v) => { const el = document.getElementById(id); if (el) el.value = v || ''; };
  g('set-nome', m.nome); g('set-tel', m.telefone); g('set-email', emailAtual);
  g('set-senha', ''); g('set-senha2', '');
  perfilFoto = m.foto || null;
  const prev = document.getElementById('set-foto-preview');
  if (prev){
    if (perfilFoto){ prev.style.backgroundImage = "url('" + perfilFoto + "')"; prev.classList.add('tem'); }
    else { prev.style.backgroundImage = ''; prev.classList.remove('tem'); }
  }
}
function onSettingsFoto(input){
  const f = input.files && input.files[0]; if (!f) return;
  redimensionarImagem(f, url => {
    perfilFoto = url;
    const p = document.getElementById('set-foto-preview');
    p.style.backgroundImage = "url('" + url + "')"; p.classList.add('tem');
  });
}
async function salvarPerfil(){
  if (!sb){ toast('Configure o Supabase para salvar.', false); return; }
  const nome = document.getElementById('set-nome').value.trim();
  const telefone = document.getElementById('set-tel').value.trim();
  const { error } = await sb.auth.updateUser({ data: { nome, telefone, foto: perfilFoto } });
  if (error){ console.error(error); toast('Erro ao salvar os dados.', false); return; }
  usuarioMeta = Object.assign({}, usuarioMeta, { nome, telefone, foto: perfilFoto });
  aplicarAvatar();
  const elEmail = document.getElementById('user-email'); if (elEmail) elEmail.textContent = nome || emailAtual || 'Usuário';
  toast('Dados atualizados');
}
async function alterarEmail(){
  if (!sb){ toast('Configure o Supabase.', false); return; }
  const email = document.getElementById('set-email').value.trim();
  if (!email){ toast('Digite o novo email.', false); return; }
  if (email === emailAtual){ toast('Este já é o seu email.', false); return; }
  const { error } = await sb.auth.updateUser({ email });
  if (error){ console.error(error); toast(traduzErro(error.message), false); return; }
  toast('Confirme o link enviado ao novo email.');
}
async function alterarSenha(){
  if (!sb){ toast('Configure o Supabase.', false); return; }
  const s1 = document.getElementById('set-senha').value, s2 = document.getElementById('set-senha2').value;
  if (s1.length < 6){ toast('A senha precisa de ao menos 6 caracteres.', false); return; }
  if (s1 !== s2){ toast('As senhas não conferem.', false); return; }
  const { error } = await sb.auth.updateUser({ password: s1 });
  if (error){ console.error(error); toast(traduzErro(error.message), false); return; }
  document.getElementById('set-senha').value = ''; document.getElementById('set-senha2').value = '';
  toast('Senha alterada');
}

/* ================= ESTADO INICIAL DA NAVEGAÇÃO ================= */
/* no celular abre direto no hub Menu (navega pelos ícones); no desktop
   fica no Dashboard, mas já destaca "Menu" na barra lateral (seção pai). */
if (window.innerWidth <= 820) navegar('menu');
else marcarNav('dashboard');
