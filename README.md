# Gerenciamento de Tarefas

Este é um projeto de gerenciamento de tarefas com frontend em React (Vite) e backend em Node.js, utilizando o Prisma para conexão com um banco de dados PostgreSQL.

## Tecnologias Utilizadas

- Frontend: React com Vite
- Backend: Node.js com Express
- Banco de Dados: PostgreSQL (usando Prisma ORM)
- Hospedagem: Vercel (para produção)

## Configuração para Rodar Localmente

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- Node.js
- npm ou yarn
- PostgreSQL (se desejar rodar o banco de dados localmente)

### Passo a Passo

1. **Clone o Repositório**

   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```

2. **Instale as Dependências**

   Navegue para as pastas do frontend e backend e instale as dependências:

   ```bash
   # No diretório raiz do projeto
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. **Configuração do Banco de Dados**

   O projeto utiliza o Prisma para gerenciar o banco de dados PostgreSQL. Certifique-se de configurar a conexão do banco de dados:

   - Crie um banco de dados PostgreSQL localmente ou use uma instância remota.
   - Crie um arquivo `.env` na pasta `backend` com a variável de ambiente `DATABASE_URL` apontando para o seu banco de dados.

   Exemplo do arquivo `.env`:

   ```plaintext
   DATABASE_URL=postgresql://usuario:senha@localhost:5432/nome_do_banco
   ```

   **Execute as migrações** para criar as tabelas no banco de dados:

   ```bash
   npx prisma migrate dev
   ```

4. **Configuração do Frontend**

   No diretório `frontend`, crie um arquivo `.env` e defina a URL da API para o backend local:

   ```plaintext
   VITE_API_URL=http://localhost:5000/api/tasks
   ```

5. **Iniciar o Backend**

   No diretório `backend`, execute o seguinte comando para iniciar o servidor:

   ```bash
   node server.js
   ```

   O backend deve rodar em `http://localhost:5000`.

6. **Iniciar o Frontend**

   No diretório `frontend`, execute o seguinte comando para iniciar o projeto React com Vite:

   ```bash
   npm run dev
   ```

   O frontend deve rodar em `http://localhost:5173`.

### Problemas Comuns

- **Erro de CORS**: Certifique-se de que o backend está configurado para permitir requisições de `http://localhost:5173`.
- **Banco de Dados**: Verifique se o arquivo `.env` do backend está configurado corretamente com a URL do banco de dados e que o Prisma está atualizado com as migrações (`npx prisma migrate dev`).

## Comandos Úteis

- **Rodar Migrações do Prisma**: `npx prisma migrate dev`
- **Iniciar o Backend**: `node server.js`
- **Iniciar o Frontend**: `npm run dev`

## Deploy na Vercel

O projeto está configurado para deploy na Vercel para produção. Certifique-se de configurar as variáveis de ambiente `DATABASE_URL` e `VITE_API_URL` no painel da Vercel para o funcionamento correto em produção.

---

Pronto! Agora o projeto deve estar configurado e rodando localmente.

```

Este `README.md` fornece instruções claras sobre como configurar e rodar o projeto localmente. Se houver alguma configuração adicional ou diferente, é só ajustar o conteúdo.
```
