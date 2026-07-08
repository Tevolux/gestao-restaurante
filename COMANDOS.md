# 🧭 Caminhos e comandos — Massa Certa

## 📁 Estrutura de pastas

```
massa-certa/
├── index.html        → a página (só a estrutura HTML)
├── css/
│   └── style.css     → todo o visual (cores, layout, animações)
├── js/
│   └── app.js        → toda a lógica (cálculos, filtros, gráficos)
├── assets/
│   └── favicon.svg   → o ícone que aparece na aba do navegador
├── README.md         → apresentação do projeto
├── COMANDOS.md       → este arquivo
└── .gitignore        → o que o Git deve ignorar
```

Os caminhos dentro do index.html são **relativos**:
`css/style.css`, `js/app.js`, `assets/favicon.svg`.

---

## 💻 Abrir no VS Code

```bash
# entre na pasta e abra o VS Code nela
cd caminho/para/massa-certa
code .
```

## ▶️ Rodar localmente (ver no navegador antes de subir)

Opção 1 — mais fácil: instale a extensão **Live Server** no VS Code,
clique com o botão direito no `index.html` → **"Open with Live Server"**.
Ele atualiza sozinho a cada vez que você salva.

Opção 2 — pelo terminal (se tiver Python):
```bash
python -m http.server 8000
# depois abra no navegador: http://localhost:8000
```

Opção 3 — só abrir o arquivo `index.html` com dois cliques.

---

## 🔧 Git (salvar versões)

```bash
git status                 # o que mudou
git add .                  # separa tudo para salvar
git commit -m "mensagem"   # salva a versão (mensagem em português)
git log --oneline          # histórico resumido
```

## ☁️ Subir para o GitHub

```bash
# só na primeira vez, conectar o repositório remoto:
git remote add origin https://github.com/SEU-USUARIO/massa-certa.git
git branch -M main
git push -u origin main

# nas próximas vezes, basta:
git push
```

## 🚀 Deploy (Vercel)

A Vercel está ligada ao GitHub. O ciclo é automático:

```
editar → git add . → git commit -m "..." → git push → a Vercel republica sozinha
```

Depois do push, é só atualizar o link de produção e ver no ar.

---

## 🔁 Resumo do dia a dia

```bash
# 1. edite os arquivos (index.html, css/style.css, js/app.js)
# 2. veja localmente (Live Server)
# 3. salve a versão e publique:
git add .
git commit -m "descreva o que mudou"
git push
# 4. a Vercel atualiza o site em segundos
```
