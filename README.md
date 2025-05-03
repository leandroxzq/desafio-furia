# Furiabot

FuriaBot é uma aplicação web desenvolvida como proposta para o Desafio #1: Experiência Conversacional da FURIA. O projeto combina um chatbot inteligente, chat em tempo real entre fãs e informações atualizadas do time de CS da FURIA.

🔗 **Deploy**: [https://desafio-furia-ten.vercel.app/](https://desafio-furia-ten.vercel.app/)

## 📌 Funcionalidades

- ✅ Cards dos jogadores com nome, nick e idade da line atual

- ✅ Chatbot com IA integrado à API PandaScore e GeminiAPI

- ✅ Informações em tempo real sobre próximos e últimos jogos

- ✅ Chat em tempo real entre fãs com Firebase Firestore

## 🧠 Tecnologias Utilizadas

![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black)
![Gemini API](https://img.shields.io/badge/Gemini_API-4285F4?style=for-the-badge&logo=google&logoColor=white)
![PandaScore API](https://img.shields.io/badge/PandaScore_API-32CD32?style=for-the-badge&logoColor=white)

## 🔑 Pré-requisitos

Antes de executar o projeto, você precisará criar contas e obter chaves nas seguintes plataformas:

### 1. Google Gemini API

🔹 **Passo a passo:**

1. Acesse [Google AI Studio](https://makersuite.google.com/)
2. Faça login com sua conta Google
3. No menu, clique em **"Get API Key"**
4. Clique em **"Criar chave de API"** e nomeie como desejar
5. Copie a chave gerada

---

### 2. PandaScore API

🔹 **Passo a passo:**

1. Acesse [PandaScore](https://pandascore.co/)
2. Cadastre-se com seu e-mail
3. Acesse o [Dashboard de API](https://app.pandascore.co/dashboard/main)
4. Vá até **"Your access token"** e clique em **"copy"**
5. Copie o token gerado

---

### 3. Projeto Firebase

🔹 **Passo a passo:**

1. Acesse o [Console Firebase](https://console.firebase.google.com/)
2. Clique em **"Adicionar projeto"**
3. Siga os passos do assistente:
   - Nomeie seu projeto (ex: `furiabot`)
   - Ative ou não o Google Analytics (opcional)
4. Após a criação, vá em:
   - ⚙️ **Configurações do Projeto** > **Configurações Gerais**
5. Na seção **"Seus apps"**, registre um novo app Web
6. Copie as configurações exibidas (`firebaseConfig`)

---

## 🔧 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/leandroxzq/desafio-furia.git
cd desafio-furia
```

2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo chamado `.env.local` na raiz do projeto e substitua os valores abaixo com as chaves obtidas na etapa de **Pré-requisitos**:

```ini
NEXT_PUBLIC_FIREBASE_API_KEY=xxxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxxx
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxxx
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxxx
NEXT_PUBLIC_FIREBASE_APP_ID=xxxx

PANDA_SCORE_KEY=xxxx

GEMINI_API_KEY=xxxx
```

4. Rode o projeto:

```bash
npm run dev
```
