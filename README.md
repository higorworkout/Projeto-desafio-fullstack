# Projeto-desafio-fullstack

# TaskManager - Desafio Técnico Fullstack Júnior

Aplicação completa para gerenciamento de tarefas com autenticação, colaboração entre usuários e relatórios simples. Desenvolvida utilizando uma arquitetura distribuída, com deploy em ambiente **Serverless (AWS Lambda)**.

---

## 🚀 Tecnologias Utilizadas

### Backend
- **Node.js**, **Express**
- **PostgreSQL** (via AWS RDS)
- **JWT** para autenticação (Access e Refresh Tokens)
- **TypeORM** para ORM
- **AWS Lambda + API Gateway** com **AWS CDK**
- **Swagger (OpenAPI)** para documentação
- **Docker** (dev)
- **Jest** para teste

### Frontend
- **React Js**
- **Tailwind CSS** (com ShadCN-Vue)
- **Vite**

---

## 📁 Estrutura de Pastas

<pre lang="markdown"> ``` . ├── backend │ ├── docker-compose.yaml │ ├── Dockerfile │ ├── jest.config.ts │ ├── package.json │ ├── package-lock.json │ ├── src │ │ ├── app.ts │ │ ├── config │ │ ├── database │ │ ├── errors │ │ ├── express │ │ ├── index.ts │ │ ├── lambda.ts │ │ ├── middlewares │ │ ├── modules │ │ ├── swagger │ │ ├── test │ │ └── utils │ └── tsconfig.json ├── cdk │ ├── bin │ │ └── task-manager-backend.ts │ ├── cdk.json │ ├── jest.config.js │ ├── lib │ │ ├── database-stack.ts │ │ └── task-manager-backend-stack.ts │ ├── package.json │ ├── package-lock.json │ ├── README.md │ ├── test │ │ └── task-manager-backend.test.ts │ └── tsconfig.json ├── frontend │ ├── eslint.config.js │ ├── index.html │ ├── package.json │ ├── package-lock.json │ ├── postcss.config.js │ ├── public │ │ └── vite.svg │ ├── README.md │ ├── src │ │ ├── App.css │ │ ├── App.tsx │ │ ├── assets │ │ ├── components │ │ ├── context │ │ ├── hooks │ │ ├── index.css │ │ ├── main.tsx │ │ ├── pages │ │ ├── services │ │ ├── types │ │ └── vite-env.d.ts │ ├── tailwind.config.js │ ├── tsconfig.app.json │ ├── tsconfig.json │ ├── tsconfig.node.json │ └── vite.config.ts └── README.md ``` </pre>


## 📦 Instalação e Execução

- Node.js, Docker, CDK

### Execução do Backend local

```bash
cd backend
docker compose up --build 

### Execução Frontend

cd frontend
npm install
npm run dev

#### ☁️ **1.4. Deploy na AWS com CDK**

```md
## Pré-requisitos

- AWS CLI configurado
- Node.js, CDK e AWS CDK CLI instalados

## Deploy

```bash
cd cdk
npm install
cdk deploy

#### 🔒 **1.5. Autenticação**

```md
- Utiliza JWT com Access e Refresh Token
- Endpoints protegidos com middleware de autenticação

#### testes**
- Cobertura de testes com Jest (unitários)
- Comando para rodar os testes:
```bash
cd backend
npm run test

- Necessario subir o BD de test com docker compose up





