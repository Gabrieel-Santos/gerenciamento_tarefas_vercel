# Projeto de Gerenciamento de Tarefas

Este é um projeto simples de gerenciamento de tarefas que utiliza as seguintes tecnologias:

- **Frontend**: React com Vite
- **Backend**: Node.js com Express e Prisma para gerenciamento do banco de dados
- **Banco de Dados**: PostgreSQL

## Como Rodar o Projeto Localmente

1. **Pré-requisitos**: Certifique-se de ter o Node.js e npm instalados.

2. **Instalar Dependências**:

   - Navegue até a pasta do frontend e backend e instale as dependências com o comando:
     ```bash
     npm install
     ```

3. **Arquivo `.env`**:

   - Enviei o arquivo `.env` para facilitar rodar localmente

4. **Iniciar o Frontend e Backend**:

   Abra **dois terminais**:

   - No primeiro terminal, navegue até a pasta do frontend e execute:

     ```bash
     npm run dev
     ```

     Isso irá iniciar o frontend no endereço `http://localhost:5173`.

   - No segundo terminal, navegue até a pasta do backend e execute:
     ```bash
     node server.js
     ```
     Isso irá iniciar o backend no endereço `http://localhost:5000`.

Agora o frontend e o backend estarão rodando localmente e conectados.

---
