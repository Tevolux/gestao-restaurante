# 🔒 Plano de Segurança — para implementar no futuro

Um roteiro **leve** e **sem urgência**. O sistema hoje já tem uma base segura
(login, RLS ligado, chave secreta fora do código, HTTPS pela Vercel). Isto aqui
é o mapa dos próximos reforços, do mais importante ao menos — para quando o
sistema começar a usar **dados reais**.

> Nada aqui precisa ser feito agora. É a lista para evoluir com calma.

---

## 🟢 Já temos (base atual)
- **Login** obrigatório (Supabase Auth) para acessar o sistema.
- **RLS ligado** em todas as tabelas (sem estar logado, ninguém acessa os dados).
- A chave **secreta** (`service_role`) **não** está no código — só a pública.
- **HTTPS** automático (cadeado) pela Vercel.
- `.gitignore` protege segredos (`.env*`) de irem pro GitHub.

---

## 🔴 Prioridade alta (quando entrarem dados reais)

### 1. Proteger os dados dos colaboradores (LGPD / GDPR)
Documentos, CPF/Codice Fiscale, endereços e contratos são **dados pessoais
sensíveis**. É Roma, então vale a **GDPR** (e a LGPD, se houver ligação com o
Brasil). Passos: coletar só o necessário, pedir **consentimento**, restringir
quem acessa, e definir por quanto tempo os dados ficam guardados.

### 2. Guardar documentos e contratos no lugar certo
Hoje as imagens/PDFs ficam dentro do banco (base64). O ideal é o **Supabase
Storage** com **acesso restrito** (só quem está logado e autorizado baixa).

### 3. RLS por papel (não "todo mundo logado vê tudo")
Hoje qualquer pessoa logada vê tudo — inclusive a **folha de pagamento**. O
próximo passo é ter **papéis** (ex.: gerente vê salários; cozinheiro não) e
políticas de RLS por papel.

---

## 🟡 Prioridade média

### 4. Autenticação mais forte
- Ligar **confirmação de e-mail** em produção.
- Exigir **senhas fortes**.
- **2FA** (segundo fator) para o administrador.

### 5. Backups do banco
Ativar **backups automáticos** no Supabase, para nunca perder dados.

### 6. Registro de acesso (auditoria)
Guardar **quem** alterou o quê e quando (ex.: quem mexeu na folha). Ajuda a
investigar problemas e dá transparência.

---

## 🟢 Prioridade baixa (bom ter)

### 7. Validação de entradas no servidor
O front já escapa textos (evita código malicioso na tela). Some a isso a
**validação no servidor** (Supabase) para os dados sempre entrarem corretos.

### 8. Proteção contra abuso (rate limiting)
Limitar tentativas de login e requisições, para evitar ataques de força bruta.

### 9. Revisão de dependências
De tempos em tempos, conferir se as bibliotecas (Chart.js, Supabase) estão
atualizadas, sem falhas conhecidas.

---

## 🗺️ Por onde começar
1. Definir **papéis** (quem vê a folha?) → item 3.
2. Ligar **backups** → item 5.
3. Mover **documentos** para o Storage → item 2.

O resto entra aos poucos, conforme o sistema crescer.

---

*Este é um plano de intenção, não uma implementação. Quando quiser executar
qualquer item, a gente detalha o passo a passo junto.*
