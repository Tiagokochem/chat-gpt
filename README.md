# 💬 ChatGPT Integrado com React + NestJS

Este projeto é uma plataforma de chat em tempo real que se comunica com a API da OpenAI (ChatGPT), armazenando usuários, mensagens e histórico de conversas. Desenvolvido como desafio técnico com foco em boas práticas e arquitetura escalável.

---

## 🚀 Tecnologias Utilizadas

### 🔧 Backend
- NestJS
- TypeORM
- MySQL
- OpenAI SDK
- Docker

### 🎨 Frontend
- React + Vite
- TypeScript
- TailwindCSS
- Axios

---

## 📦 Como rodar o projeto localmente

### 🔄 Pré-requisitos
- Docker + Docker Compose
- Node.js (v18+ recomendado)
- NPM ou Yarn
- Conta e chave da OpenAI (caso deseje usar a IA real)

---

### 🧱 Backend

```bash
# 1. Suba o banco de dados
docker-compose up -d mysql adminer

# 2. Instale dependências do backend
cd backend
npm install

# 3. Configure variáveis
cp .env.example .env
# Preencha sua chave OPENAI_API_KEY e dados do banco

# 4. Rode o backend
npm run start:dev
```

---

### 💻 Frontend

```bash
# 1. Instale as dependências
cd frontend
npm install

# 2. Rode o Vite
npm run dev

# Acesse: http://localhost:5173/
```

---

## ✅ Funcionalidades atuais

- CRD de chats
- Visualização de mensagens por chat
- Envio de mensagem com resposta automática do ChatGPT (via API)
- Interface responsiva com Tailwind
- Scroll automático e UX fluida

---

## 🧠 Melhorias futuras (backlog pessoal)

- Enviar com Enter
- Avatares (GPT / Usuário)
- Edição e exclusão de mensagens
- Tela de login (usuário fictício)
- Tema escuro / claro
- Testes automatizados no frontend (React Testing Library)

---

## 📸 Demonstrações (em breve)

- Demonstração do projeto: 🔗 Em Breve
- Execução dos testes: 🔗 Em Breve
- Explicação técnica: 🔗 Em Breve

---

## 📄 Licença

MIT © [Tiago Kochem](https://github.com/Tiagokochem)